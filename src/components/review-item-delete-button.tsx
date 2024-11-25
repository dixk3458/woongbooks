'use client';

import deleteReviewAction from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const onSubmit = () => {
    // submit은 유효성 검사를 무시한다.
    // requestSubmit이 사용자가 submit 버튼을 클릭한 것과 똑같이 안전하게
    formRef.current?.requestSubmit();
  };
  return (
    <form action={formAction} ref={formRef}>
      <input type="text" name="reviewId" value={reviewId} readOnly hidden />
      <input type="text" name="bookId" value={bookId} readOnly hidden />
      {isPending ? <div>...</div> : <div onClick={onSubmit}>삭제하기</div>}
    </form>
  );
}
