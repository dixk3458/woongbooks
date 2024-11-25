import './globals.css';
import Link from 'next/link';

import style from './layout.module.css';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
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
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
