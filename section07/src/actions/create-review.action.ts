"use server";

import { revalidatePath } from "next/cache";

// 서버 액션으로 간단하게 API를 대체할 수 있는 코드 : 서버측에서만 실행, 브라우저에는 전달만 -> 보안성
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  console.log(bookId, content, author);

  if (!bookId || !content || !author) {
    return;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    // 서버에서 넥스트 페이지에 bookId의 경로를 다시 생성할 것을 요청 (서버측에서) -> 재검증 로직
    // 1. 서버측에서만 호출할 수 있는 메서드이다.
    // 2. 이 페이지(/book/[id])의 모든 캐시를 전부 재검증하여 데이터 캐시마저도 무효화한다. (cache: "force-cache" 무효화)
    // 3. 정적 사이트 재생성(SSG)에서 생성되는 풀라우트 캐시도 삭제. 없데이트 X
    revalidatePath(`/book/${bookId}`);
  } catch (e) {
    console.error(e);
    return;
  }
}
