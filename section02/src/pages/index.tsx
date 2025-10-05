// CSS Module
// unique한 className으로 작성
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 서버사이드 렌더링 (getServerSideProps() : Next.js에서 약속된 SSR 함수)
export const getStaticProps = async () => {
  console.log("인덱스 페이지");

  // 병렬 연결 -> 동시에 실행돼서 실제로 network 탭에서 2ms(직렬) => 1ms(병렬)로 렌더링 속도가 빨라짐
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // ISR 렌더ㅇ
    revalidate: 3,
  };
};

// Home 컴포넌트도 서버에서 한 번 실행되기 때문에 (사전 렌더링) window.loaction 같은 브라우저 메서드를 사용할 수 없다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
