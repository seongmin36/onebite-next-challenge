"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useEffect } from "react";
import { useActionState } from "react";
import { useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  // 이 부분 많이 중요..!
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      {/* name을 설정해줘야 서버 컴포넌트에서 가져올 수 있음 */}
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>..</div>
      ) : (
        // 🔥 삭제하기 버튼의 태그가 button인 경우에 onclick=submit이 가능하기 때문에 useRef를 사용한 좀 더 범용적인 코드 방식
        // requestSubmit() : 강제로 form을 제출하는 Submit() 함수와는 달리 requestSubmit()함수는 사용자가 정의한 Submit과 똑같이 동작 -> 안전하게 동작
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
