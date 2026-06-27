/**
 * Strapi data layer.
 *
 * All communication with the CMS goes through these helpers so the rest of
 * the app never has to know about Strapi's response shape or query syntax.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Low-level fetch against the Strapi REST API.
 * Revalidates every 60s so new posts show up without a redeploy.
 */
async function fetchFromStrapi(path) {
  const url = `${STRAPI_URL}/api${path}`;
  const res = await fetch(url, {
    headers: STRAPI_TOKEN
      ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
      : {},
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Strapi request failed (${res.status} ${res.statusText}) for ${path}`
    );
  }
  return res.json();
}

/**
 * Turn a relative Strapi media path into an absolute URL.
 * Returns null when there is no image.
 */
export function mediaUrl(media) {
  if (!media) return null;
  const url = media.url || media?.data?.attributes?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

/**
 * Normalise a Strapi v5 article entry into a flat object the UI can use.
 */
function shapeArticle(entry) {
  if (!entry) return null;
  // Strapi v5 returns flat fields; v4 nests under `attributes`.
  const a = entry.attributes ? { id: entry.id, ...entry.attributes } : entry;

  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    excerpt: a.excerpt,
    body: a.body,
    author: a.author,
    readTime: a.readTime,
    featured: a.featured,
    publishedDate: a.publishedDate,
    cover: mediaUrl(a.cover),
    coverAlt: a.cover?.alternativeText || a.title,
    seo: a.seo || null,
  };
}

/** Fetch every published article, newest first. */
export async function getArticles() {
  const json = await fetchFromStrapi(
    '/articles?populate=cover&sort=publishedDate:desc&pagination[pageSize]=100'
  );
  return (json.data || []).map(shapeArticle);
}

/** Fetch a single article by its slug, or null if none matches. */
export async function getArticleBySlug(slug) {
  const json = await fetchFromStrapi(
    `/articles?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=cover`
  );
  const entry = (json.data || [])[0];
  return entry ? shapeArticle(entry) : null;
}

/** Slugs only — used to pre-render article pages at build time. */
export async function getAllSlugs() {
  const json = await fetchFromStrapi(
    '/articles?fields[0]=slug&pagination[pageSize]=100'
  );
  return (json.data || []).map((e) => (e.attributes ? e.attributes.slug : e.slug));
}

/** Format an ISO date as e.g. "Mar 14, 2026". */
export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}
