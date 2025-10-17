"use server";

import { revalidateTag } from "next/cache";

export async function deleteReviewAction(_: any, formDate: FormData) {
  const reviewId = formDate.get("reviewId")?.toString();
  const bookId = formDate.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰가 없습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // bookId를 재검증
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${e}`,
    };
  }
}
