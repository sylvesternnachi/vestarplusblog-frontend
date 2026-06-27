import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="vp-footer pt-5">
      <div className="container container-vp">
        <div className="row gy-4 pb-5">
          <div className="col-6 col-lg-3">
            <Image
              src="/img/logo.png"
              alt="Vestarplus"
              width={160}
              height={28}
              style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <div className="col-6 col-lg-3">
            <h6>Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="https://vestarplus.com/our-works">Our work</a></li>
              <li className="mb-2"><a href="https://vestarplus.com/services">What we do </a></li>
              <li className="mb-2"><a href="https://vestarplus.com/about">About us</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h6>Product</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="https://www.onewaytemplate.com/">OneWayTemplate</a></li>
              <li className="mb-2"><a href="https://www.vplusacademy.com/">vPlusAcademy</a></li>
              <li className="mb-2"><Link href="https://www.uxdesignmaster.com/">UXDesignMaster</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h6> Media</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="https://vestarplus.com/contact">Contact</a></li>
              <li className="mb-2"><Link href="/">Blog</Link></li>
              <li className="mb-2"><a href="#">Career</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center py-3 gap-2">
          <small>© 2026 Vestarplus. All rights reserved.</small>
          <div className="d-flex gap-3">
            <a href="https://web.facebook.com/vestarplusng" target='_blank' aria-label="Twitter"><i className="bi bi-facebook fs-5"></i></a>
            <a href="https://www.instagram.com/vestarplus/" target='_blank' aria-label="Instagram"><i className="bi bi-instagram fs-5"></i></a>
            <a href="https://www.linkedin.com/company/vestarplus" target='_blank' aria-label="LinkedIn"><i className="bi bi-linkedin fs-5"></i></a>
          </div>
        </div>
      </div>

      <div className="overflow-hidden text-center pt-3">
        <p className="wordmark">vestarplus</p>
      </div>
    </footer>
  );
}
