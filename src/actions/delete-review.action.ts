'use server';

import { revalidateTag } from 'next/cache';

export default async function deleteReviewAction(
  _: { status: boolean; error: string } | null,
  formData: FormData
) {
  const reviewId = formData.get('reviewId')?.toString();
  const bookId = formData.get('bookId')?.toString();

  if (!reviewId || !bookId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('리뷰를 삭제하지 못했습니다.');
    }

    console.log('리뷰 삭제 성공');
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    console.error(error);

    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${error}`,
    };
  }
}
