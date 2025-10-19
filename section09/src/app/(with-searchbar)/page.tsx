import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
// import { Suspense } from "react";
// import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 X
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페에지를 강제로 Static 페이지로 설정
// 4. error : 페에지를 강제로 Static 페이지 설정 (설정하면 안되는 이유 -> 빌드 오류)
// => Next가 자동으로 Dynamic, Static을 판별해주기 때문에 꼭 필요한 경우에만 사용
// export const dynamic = "auto";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
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
}
async function RecoBooks() {
  // cache의 아무 속성이 없으면 no-store가 기본 (Next.js v.15 ~ )
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
    // next: { revalidate: 3 } : 3초 간격으로 fecth (ISR과 유사)
    // { next: { revalidate: 3 } }
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

// 강제로 Dynamic Render -> Dynamic Route Segment
// export const dynamic = "force-dynamic";

// 약속된 이름의 변수 metadata : 변수에 저장된 값이 현재 페이지의 메타 데이터로 설정 -> 앱라우터에서의 메타 데이터
export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
