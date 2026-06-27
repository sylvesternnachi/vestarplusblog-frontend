'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Newsletter() {
  return (
    <section className="vp-cta py-5">
      <Image
        src="/img/rings-gold.png"
        className="rings"
        alt=""
        aria-hidden="true"
        width={620}
        height={620}
        style={{ width: '620px', height: 'auto' }}
      />
      <div
        className="container container-vp position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="row justify-content-center text-center py-4">
          <div className="col-lg-7">
            <h2 className="mb-2">Let&apos;s slide this to your inbox</h2>
            <p className="lead-sub mb-4">
              Get the best of the Vestarplus blog — fresh guides and product
              news, no more than twice a month.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Split out so the form's interactivity stays client-side only.
// Mailchimp-connected subscribe form.


function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Mailchimp JSONP endpoint: note "post-json" and the trailing &c=?
    const url =
      'https://vestarplus.us20.list-manage.com/subscribe/post-json' +
      '?u=810ab727312020f66c0e7dc41&id=a68ffe4c60&f_id=006e02eef0' +
      '&EMAIL=' +
      encodeURIComponent(email) +
      '&c=?';

    try {
      const data = await jsonp(url);
      if (data.result === 'success') {
        setStatus('success');
        setMessage("You're in. Thanks for subscribing!");
        setEmail('');
      } else {
        setStatus('error');
        // Mailchimp returns HTML in msg (e.g. "already subscribed"); strip tags.
        setMessage(stripHtml(data.msg) || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again.');
    }
  }

  // Success state replaces the form with a message, same section.
  if (status === 'success') {
    return (
      <div className="text-center" style={{ maxWidth: 460, margin: '0 auto' }}>
        <p className="mb-0" style={{ color: '#fff', fontWeight: 600 }}>
          <i className="bi bi-check-circle-fill me-2"></i>
          {message}
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        className="news-form d-flex align-items-center gap-2 mx-auto"
        style={{ maxWidth: 460 }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="EMAIL"
          className="form-control"
          placeholder="Enter your email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn-vp flex-shrink-0"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p
          className="mt-2 mb-0 text-center"
          style={{ color: '#ffd2d2', fontSize: '0.875rem', maxWidth: 460, margin: '0 auto' }}
        >
          {message}
        </p>
      )}
    </>
  );
}

// Loads a Mailchimp JSONP URL by injecting a <script> tag and awaiting the callback.
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = 'mcjsonp_' + Date.now();
    const script = document.createElement('script');

    window[cb] = (data) => {
      resolve(data);
      delete window[cb];
      script.remove();
    };

    script.src = url.replace('c=?', 'c=' + cb);
    script.onerror = () => {
      reject(new Error('JSONP failed'));
      delete window[cb];
      script.remove();
    };
    document.body.appendChild(script);
  });
}

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim();
}
