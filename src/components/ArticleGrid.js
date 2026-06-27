'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';

const PAGE_SIZE = 6;

export default function ArticleGrid({ articles }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [query, setQuery] = useState('');

  // Filter by title, excerpt, or category — case-insensitive.
  const q = query.trim().toLowerCase();
  const filtered = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
          (a.category && a.category.toLowerCase().includes(q))
      )
    : articles;

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      {/* Search */}
      <div
        className="vp-search d-flex align-items-center mb-5"
        style={{ maxWidth: 460 }}
      >
        <i className="bi bi-search text-secondary me-2"></i>
        <input
          type="search"
          className="form-control"
          placeholder="Search articles"
          aria-label="Search articles"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE); // reset the list when the search changes
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <p className="section-sub mx-auto">
            No articles match &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : (
        <>
          <div className="row g-4 g-lg-5">
            {shown.map((article) => (
              <div className="col-12 col-md-6" key={article.id}>
                <PostCard article={article} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-5">
              <button
                type="button"
                className="btn-vp-outline"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                View more articles
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}