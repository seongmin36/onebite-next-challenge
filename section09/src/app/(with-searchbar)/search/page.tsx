import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  // 무조건 동적 페이지를 생성해야하는 페이지에서는 캐싱(데이터 캐시)만 되도록 설정
  // 해당 요청이 늦어지면, 전체 페이지 렌더링이 느려짐 -> 페이지 컴포넌트 스트리밍

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

// 동적인 값을 메타데이터로 설정해야 하는 경우에 어려움이 있음
// export const metadata: Metadata = {
//   title: "한입북스 : 검색어",
//   description: "한입 북스에 등록된 도서를 만나보세요",
//   openGraph: {
//     title: "한입 북스",
//     description: "한입 북스에 등록된 도서를 만나보세요",
//     images: ["/thumbnail.png"],
//   },
// };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  // -> 현재 페이지의 메타 데이터를 동적으로 생성
  return {
    title: `${q}: 한입북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q}: 한입북스 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
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
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
