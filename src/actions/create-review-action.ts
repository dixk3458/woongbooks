'use server';

import { revalidateTag } from 'next/cache';

export default async function createReviewAction(
  _: { status: boolean; error: string } | null,
  formData: FormData
) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 재검증
    // revalidatePath(`/book/${bookId}`);
    // revalidatePath는 해당 경로를 서버측에서 새로 생성하여 보내주는것이다. 즉 하위 컴포넌트까지 리렌더링
    // 서버측에서만 호출할 수 있는 메서드
    // 해당 경로의 모든 캐시를 무효화시킨다.
    // 풀 라우트 캐시까지 무효화된다. 무효화 하기만 할 뿐 새롭게 생성된 페이지를 다시 풀 라우트 캐시에 저장해주지 않는다.
    // 이후 새로고침을 통해 다시 요청하게 되면, 캐시된 데이터를 사용할 수 없으니, Dynamic Page처럼 새롭게 페이지를 생성한 후 풀라우트 캐시에 저장

    // 2. 특정 경로의 모든 동적 페이지 재검증
    // 모든 도서 페이지 재검증
    // revalidatePath(`/book/[id]`, 'page');

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // with-searchbar layout을 기준으로 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 4. 모든 데이터 재검증
    // 3번째 방법과 동일하게, 루트 레이아웃을 갖는 페이지 즉 모든 페이지들이 재검증
    // revalidatePath('/', 'layout');

    // 5. 태그 기준 데이터 캐시 재검증
    // 그 태그값을 기준으로 데이터 페칭을 하는 부분만 재검증해주기에 불필요한 데이터 페치를 해결해준다.
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. : ${error} `,
    };
  }
}
