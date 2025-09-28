import { useRouter } from "next/router";

// url 파라미터에 사용하는 동적경로 페이지
// [id].tsx : url 뒤에 id 하나만

// [...id].tsx : url 뒤에 id가 여러개 올 수 있다 => Catch All Segment(구간)
// /123/123/123/123 는 각각의 Id가 배열 형태로 저장됨.

// [[...id]] : id가 없는 url의 경우에도 가능하도록 => Optional Catch All Segement
export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Book: {id}</h1>;
}
