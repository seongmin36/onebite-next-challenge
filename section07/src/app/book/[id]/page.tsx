import { BookData } from "@/types";
import style from "./page.module.css";
import NotFound from "@/app/not-found";
import { createReviewAction } from "@/actions/create-review.action";

// Next에서 약속된 변수(dynamicParams = false) : generateStaticParams에서 정의된 URL외의 나머지를 dynamic하게 처리 X -> 렌더링 안됨(404)
// export const dynamicParams = true;

// static 페이지로서 빌드 타임에 미리 생성함. (미리 정적 URL의 정보를 빌드타임에 넘겨주는 느낌) -> 서버 측에 Pull Route Cache
// 주의 : generateStaticParams에서 URL 파라미터는 항상 string으로 넣어줘야함
// 주의 : 페이지 컴포넌트 내부에 데이터 캐싱이 설정되지 않은 페이지도 강제로 static페이지로 설정됨
// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      NotFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const {
    coverImgUrl,
    title,
    subTitle,
    author,
    publisher,
    description,
  }: BookData = await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

// 서버 액션으로 간단하게 API를 대체할 수 있는 코드 : 서버측에서만 실행, 브라우저에는 전달만 -> 보안성
function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        {/* hidden attribute : 브라우저가 안보이는 인풋태그 -> 서버 액션에게 bookId라는 이름의 태그 제공. (id는 입/출력 필요 없기 때문) */}
        {/* 서버 액션에 전달할 id값 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
    </div>
  );
}
