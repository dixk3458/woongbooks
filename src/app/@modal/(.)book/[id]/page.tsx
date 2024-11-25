import Modal from '@/components/modal/modal';
import BookDetail from '@/app/book/[id]/page';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log('실행 되냐?');
  return (
    <Modal>
      <BookDetail params={params} />
    </Modal>
  );
}
