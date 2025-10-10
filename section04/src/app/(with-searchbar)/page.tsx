import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { cache } from "react";

async function AllBooks() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return <div>오류가 발생했습니다...</div>;
    }
    const allBooks: BookData[] = await response.json();

    return (
      <div>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
async function RecoBooks() {
  // cache의 아무 속성이 없으면 no-store가 기본 (Next.js v.15 ~ )
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    // next: { revalidate: 3 } : 3초 간격으로 fecth (ISR과 유사)
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
