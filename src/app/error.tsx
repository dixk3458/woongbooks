'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  const onClickResetButton = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div>
      에러...
      <button onClick={onClickResetButton}>다시 시도</button>
    </div>
  );
}
