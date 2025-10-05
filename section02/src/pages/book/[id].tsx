// url 파라미터에 사용하는 동적경로 페이지
// [id].tsx : url 뒤에 id 하나만

// [...id].tsx : url 뒤에 id가 여러개 올 수 있다 => Catch All Segment(구간)
// /123/123/123/123 는 각각의 Id가 배열 형태로 저장됨.

// [[...id]] : id가 없는 url의 경우에도 가능하도록 => Optional Catch All Segement
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

// 동적 페이지 [id].tsx에서 SSG 렌더링 방식을 사용하기 위해 동적 경로 함수 getStaticPaths 함수를 생성해줘야 한다.
// 브라우저 : book/1, 2, 3, ... -> 서버 : book/1, 2, 3, ... .html 파일을준다
export const getStaticPaths = () => {
  return {
    // id는 배열 형태로 저장되기 떄문에 []로 받는다.
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // .next/server/pages/book/1.html 이런식으로 SSG로 저장이 되고, blocking 일떄는 브라우저에서 렌더링시에 저장됨.
    // fallback : 대체, 대비책, 보험 => "(id: 1, 2, 3)이 아니면"의 대비책
    // false : 404 Not Found 페이지 반환, blocking : 즉시 생성 (SSR), true : 즉시 생성 + 페이지 미리 반환
    // true : params에 등록되지 않은 url에 대해 일단 html을 먼저 보내주고(Page컴포넌트) + 필요 부분만 서버에서 불러와서 렌더링. (SSR)
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const bookId = context.params!.id;

  const book = await fetchOneBook(Number(bookId));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  // fallback 상태일 떄 router.isFallback을 사용
  if (router.isFallback) return "로딩중입니다.";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
        className={style.cover_img_container}
      >
        <img src={coverImgUrl} alt="" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
