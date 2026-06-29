import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Markdown from '@/components/Markdown';
import {
  getArticleBySlug,
  getAllSlugs,
  formatDate,
} from '@/lib/strapi';

// Pre-render every article at build time; fall back to on-demand for new ones.
export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) return { title: 'Article not found — Vestarplus' };

  return {
    title: `${article.seo?.metaTitle || article.title} — Vestarplus`,
    description: article.seo?.metaDescription || article.excerpt,
  };
}

function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  let article = null;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    article = null;
  }

  if (!article) notFound();

  return (
    <>
      <Navbar />

      <main>
        <article className="py-5">
          <div className="container container-vp">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <Link href="/" className="read-more mb-3 d-inline-flex">
                  <i className="bi bi-arrow-left"></i> Back to blog
                </Link>

                <p className="article-eyebrow mb-2">{article.category}</p>
                <h1 className="article-title mb-3">{article.title}</h1>

                <div className="author-row d-flex align-items-center gap-2 mb-4 flex-wrap">
                  <span className="author-avatar">{initials(article.author)}</span>
                  <span>By {article.author}</span>
                  <span className="mx-1">·</span>
                  <span>{formatDate(article.publishedDate)}</span>
                  <span className="mx-1">·</span>
                  <span>{article.readTime} min read</span>
                 
                </div>

                {article.cover && (
                  <div className="article-hero mb-4">
                    <Image
                      src={article.cover}
                      alt={article.coverAlt}
                      width={1200}
                      height={675}
                      style={{ width: '100%', height: 'auto' }}
                      priority
                    />
                  </div>
                )}

                <div className="article-body">
                  <Markdown>{article.body}</Markdown>

                  <hr />

                   <ShareButtons slug={article.slug} title={article.title} />

                  {/* In-article promo card from the design */}
                  <div className="promo-card my-5">
                    <p className="tag mb-2">Vestarplus</p>
                    <h3 className="mb-2">Grow your product with our design speed</h3>
                    <p className="mb-3">
                     Let’s help you review your product and grow your product/website
                    </p>
                    <a href="https://vestarplus.com/contact" className="btn-pink">Get Started</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
