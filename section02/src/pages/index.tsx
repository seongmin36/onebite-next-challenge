// CSS Module
// unique한 className으로 작성
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import books from "@/mock/books.json";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수

  // 서버에서만 실행되는 코드이기 때문에 브라우저에서 출력 X
  console.log("서버사이드 프롭스에요");

  const data = "hello";

  return {
    props: {
      data,
    },
  };
};

// Home 컴포넌트도 서버에서 한 번 실행되기 때문에 (사전 렌더링) window.loaction 같은 브라우저 메서드를 사용할 수 없다.
export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  useEffect(() => {
    console.log(window);
  });

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
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
