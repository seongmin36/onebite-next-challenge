import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import delay from "@/utils/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  // 무조건 동적 페이지를 생성해야하는 페이지에서는 캐싱(데이터 캐시)만 되도록 설정
  // 해당 요청이 늦어지면, 전체 페이지 렌더링이 느려짐 -> 페이지 컴포넌트 스트리밍
  await delay(3000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// export const dynamic = "error";

// useCallback(), memoization과 같은 처리에서 비동기 X (client component)
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    // 자동 스트리밍 설정
    <Suspense key={q || ""} fallback={<div>Loading...</div>}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
