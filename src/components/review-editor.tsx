'use client';

import createReviewAction from '@/actions/create-review-action';

import styles from './review-editor.module.css';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );
  const [formData, setFormData] = useState({
    author: '',
    content: '',
  });

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const onChangeFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section>
      <form className={styles.form_container} action={formAction}>
        <input
          required
          type="text"
          name="bookId"
          value={bookId}
          hidden
          readOnly
        />
        <textarea
          required
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
          onChange={onChangeFormData}
          value={formData.content}
        />
        <div className={styles.submit_container}>
          <input
            required
            disabled={isPending}
            type="text"
            name="author"
            placeholder="작성자"
            value={formData.author}
            onChange={onChangeFormData}
          />
          <button disabled={isPending} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
