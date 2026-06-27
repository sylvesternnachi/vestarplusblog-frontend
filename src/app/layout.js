import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/vestarplus.css';

import { Inter } from 'next/font/google';
import BootstrapClient from '@/components/BootstrapClient';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Blog — Vestarplus',
  description:
    'New & noteworthy stories, guides and updates from the Vestarplus team.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
