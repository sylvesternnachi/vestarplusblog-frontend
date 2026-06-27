import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_IMG = '/img/post-alarm.png';

export default function PostCard({ article }) {
  const img = article.cover || FALLBACK_IMG;

  return (
    <Link href={`/blog/${article.slug}`} className="post-card">
      <div className="thumb mb-3">
        <Image
          src={img}
          alt={article.coverAlt || article.title}
          width={640}
          height={400}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <p className="post-meta mb-1">
        {article.category} · {article.readTime} min read
      </p>
      <h2>{article.title}</h2>
      <span className="read-more">
        Read article <i className="bi bi-arrow-right"></i>
      </span>
    </Link>
  );
}
