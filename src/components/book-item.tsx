import { BookData } from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';

import styles from './book-item.module.css';

export default function BookItem({ book }: { book: BookData }) {
  const { id, title, subTitle, author, coverImgUrl, publisher } = book;

  return (
    <Link className={styles.container} href={`/book/${id}`}>
      <Image
        src={coverImgUrl}
        alt={`${title}의 표지 이미지`}
        width={80}
        height={105}
      />
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
        <br />
        <div className={styles.author}>{`${author} | ${publisher}`}</div>
      </div>
    </Link>
  );
}
