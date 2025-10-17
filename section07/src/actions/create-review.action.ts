"use server";

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
  } catch (e) {
    console.error(e);
    return;
  }
}
