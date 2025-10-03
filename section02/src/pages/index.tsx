// CSS Module
// unique한 className으로 작성
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 서버사이드 렌더링 (getServerSideProps() : Next.js에서 약속된 SSR 함수)
export const getServerSideProps = async () => {
  // SSR 직렬 연결 1개 실행 후 나머지 실행(단점)
  const allBooks = await fetchBooks();
  const recoBooks = await fetchRandomBooks();

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

// Home 컴포넌트도 서버에서 한 번 실행되기 때문에 (사전 렌더링) window.loaction 같은 브라우저 메서드를 사용할 수 없다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(allBooks);
  console.log(recoBooks);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// ReactNode : React 컴포넌트로 쓰이는 타입
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
