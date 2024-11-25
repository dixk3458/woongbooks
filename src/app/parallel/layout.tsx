import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({
  children,
  feed,
  sidebar,
}: {
  children: ReactNode;
  feed: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={'/parallel'}>/parallel</Link>
      </div>
      <div>
        <Link href={'/parallel/second/'}>/parallel/sidebar/second/third</Link>
      </div>
      <div>
        <Link href={'/parallel/second/third'}>/parallel/sidebar/second</Link>
      </div>
      {children}
      <br />
      {feed}
      <br />
      {sidebar}
    </div>
  );
}
