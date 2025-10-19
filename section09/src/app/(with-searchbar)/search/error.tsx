"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useEffect } from "react";

// 클라이언트에서도 실행 화면을 보여주기 위해 client 컴포넌트로 설정
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div>
      <h3>검색 과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          // 하나의 콜백함수를 인수로 받아서 내부의 refresh() 함수, reset()들을 일괄적으로 처리
          // error.tsx도 동일한 경로의 하위에 모두 적용
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
