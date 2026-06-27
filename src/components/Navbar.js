import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="vp-navbar sticky-top">
      <div className="container container-vp">
        <nav className="navbar navbar-expand-lg p-0">
          <Link className="navbar-brand" href="/">
            <Image
              src="/img/logo.png"
              alt="Vestarplus"
              width={170}
              height={30}
              style={{ height: 30, width: 'auto' }}
              priority
            />
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="https://vestarplus.com">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://vestarplus.com/services">What we do</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://vestarplus.com/our-works">Our work</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/">Blog</Link>
              </li>
            </ul>
            <div className="d-flex gap-2">
              <a href="https://vestarplus.com/contact" className="btn-vp">Schedule a meeting</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
