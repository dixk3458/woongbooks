import './globals.css';
import Link from 'next/link';

import style from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>WOONGBOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>@WOONGBOOKS</footer>
        </div>
      </body>
    </html>
  );
}
