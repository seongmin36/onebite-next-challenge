import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

// useCallback(), memoization과 같은 처리에서 비동기 X (client component)
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
