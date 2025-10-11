import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// export const dynamic = "error";

// useCallback(), memoization과 같은 처리에서 비동기 X (client component)
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  // 무조건 동적 페이지를 생성해야하는 페이지에서는 캐싱(데이터 캐시)만 되도록 설정
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
