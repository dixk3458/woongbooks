'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import styles from './searchbar.module.css';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!search || search === q) {
      return;
    }

    router.push(`/search?q=${search}`);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
