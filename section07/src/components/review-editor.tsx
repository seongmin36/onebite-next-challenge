import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

// 서버 액션으로 간단하게 API를 대체할 수 있는 코드 : 서버측에서만 실행, 브라우저에는 전달만 -> 보안성
export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={style.form_container}>
        {/* hidden attribute : 브라우저가 안보이는 인풋태그 -> 서버 액션에게 bookId라는 이름의 태그 제공. (id는 입/출력 필요 없기 때문) */}
        {/* 서버 액션에 전달할 id값 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
