// url 파라미터에 사용하는 동적경로 페이지
// [id].tsx : url 뒤에 id 하나만

// [...id].tsx : url 뒤에 id가 여러개 올 수 있다 => Catch All Segment(구간)
// /123/123/123/123 는 각각의 Id가 배열 형태로 저장됨.

// [[...id]] : id가 없는 url의 경우에도 가능하도록 => Optional Catch All Segement
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const bookId = context.params!.id;

  const book = await fetchOneBook(Number(bookId));

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";

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
