// 폼 제출 (리뷰 작성 버튼)에 있어서 중복 요청 방지 및 로딩 처리
"use client";

import { useActionState } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useEffect } from "react";

// 서버 액션으로 간단하게 API를 대체할 수 있는 코드 : 서버측에서만 실행, 브라우저에는 전달만 -> 보안성
export default function ReviewEditor({ bookId }: { bookId: string }) {
  // useActionState를 적극 활용!
  // 1. state : server-action에서 bookId or content or author 중 하나라도 없으면 state에 보관
  // 2. formAction : 클라이언트에서 호출 가능한 서버 함수 프록시
  // 3. state : 서버 액션이 반환한 결과를 저장
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form action={formAction} className={style.form_container}>
        {/* hidden attribute : 브라우저가 안보이는 인풋태그 -> 서버 액션에게 bookId라는 이름의 태그 제공. (id는 입/출력 필요 없기 때문) */}
        {/* 서버 액션에 전달할 id값 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending}>{isPending ? "..." : "작성하기"}</button>
        </div>
      </form>
    </section>
  );
}
