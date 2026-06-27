import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-5">
          <div className="container container-vp text-center py-5">
            <p className="section-eyebrow mb-1">404</p>
            <h1 className="section-title mb-2">We couldn&apos;t find that page</h1>
            <p className="section-sub mx-auto mb-4">
              The article may have been moved or unpublished.
            </p>
            <Link href="/" className="btn-vp">Back to the blog</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
