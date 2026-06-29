'use client';

import { useState } from 'react';

export default function ShareButtons({ slug, title }) {
  const [copied, setCopied] = useState(false);

  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const url = `${base}/blog/${slug}`;
  const text = title;

  const enc = encodeURIComponent;
  const links = {
    x: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    whatsapp: `https://wa.me/?text=${enc(text + ' ' + url)}`,
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
      <span className="post-meta me-1">Share:</span>

      <a className="share-btn" href={links.x} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <i className="bi bi-twitter-x"></i>
      </a>
      <a className="share-btn" href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <i className="bi bi-facebook"></i>
      </a>
      <a className="share-btn" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <i className="bi bi-linkedin"></i>
      </a>
      <a className="share-btn" href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
        <i className="bi bi-whatsapp"></i>
      </a>
      <button type="button" className="share-btn" onClick={copyLink} aria-label="Copy link">
        <i className={copied ? 'bi bi-check-lg' : 'bi bi-link-45deg'}></i>
      </button>
      {copied && <span className="post-meta">Copied</span>}
    </div>
  );
}