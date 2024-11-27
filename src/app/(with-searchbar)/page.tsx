import { BookData } from '../../types/book';
import styles from './page.module.css';
import BookItem from '@/components/book-item';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '웅 북스',
  description: '웅 북스에 등록된 도서를 만나보세요.',
  openGraph: {
    title: '웅 북스',
    description: '웅 북스에 등록된 도서를 만나보세요.',
    images: ['/thumbnail.png'],
  },
};

// export const dynamic = 'force-dynamic';

async function AllBooks() {
  // await delay(5).then(() => console.log('All 5초 걸림'));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: 'force-cache',
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map(book => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  // await delay(10).then(() => console.log('Reco 10초 걸림'));
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: { revalidate: 3 },
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map(book => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
