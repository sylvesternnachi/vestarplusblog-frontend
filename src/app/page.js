import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import PostCard from '@/components/PostCard';
import { getArticles } from '@/lib/strapi';
import ArticleGrid from '@/components/ArticleGrid';

export const metadata = {
  title: 'Blog — Vestarplus',
  description:
    'Money guides, product updates and the occasional deep dive from the Vestarplus team.',
};

export default async function HomePage() {
  let articles = [];
  let loadError = false;

  try {
    articles = await getArticles();
  } catch (e) {
    loadError = true;
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="py-5">
          <div className="container container-vp">
            <div className="mb-4">
              <p className="section-eyebrow mb-1">The Vestarplus Blog</p>
              <h1 className="section-title mb-2">New &amp; Noteworthy</h1>
              <p className="section-sub mb-0">
               Latest Design, Business Growth & Tech Trend You Should Know
              </p>
            </div>
           

            {loadError ? (
              <div className="text-center py-5">
                <p className="section-sub mx-auto">
                  We couldn&apos;t reach the content server. Make sure Strapi is
                  running at your <code>NEXT_PUBLIC_STRAPI_URL</code>, then
                  refresh.
                </p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-5">
                <p className="section-sub mx-auto">
                  No articles yet. Add one in the Strapi admin (or run{' '}
                  <code>npm run seed</code> in the backend) and it will appear
                  here.
                </p>
              </div>
            ) : (
              <>
               <ArticleGrid articles={articles} />
              </>
            )}
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
