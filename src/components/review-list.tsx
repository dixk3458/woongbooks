import { Review } from '@/types/review';
import ReviewItem from './review-item';

export default async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: { tags: [`review-${bookId}`] },
    }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: Review[] = await response.json();

  return (
    <section>
      {reviews.map(review => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}
