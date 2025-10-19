import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

// (.)~ 인터셉팅 라우터 : 동일한 페이지에서의 동작은 인터셉터가 가로챔. (모달 띄우기에 좋고, 새로고침 시에는 인터셉팅이 중단되고 원래 페이지로 감)
export default function Page(props: any) {
  return (
    <div>
      가로채기 성공!
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
