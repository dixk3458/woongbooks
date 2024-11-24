import BookItemSkeleton from './book-item-skeleton';

export default function BookListSkeleton({ count = 5 }: { count: number }) {
  return (
    <div>
      {new Array(count).fill(0).map((_, index) => (
        <BookItemSkeleton key={`book-item-skeleton-${index}`} />
      ))}
    </div>
  );
}
