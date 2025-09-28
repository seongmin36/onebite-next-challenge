import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // CSR 방식으로 이동
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
    // 뒤로가기 금지
    // router.replace("/test")
    // 뒤로가기
    // router.back();
  };

  // 프로그래매틱 라우팅을 prefecth 하는 방법
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        {/* Link 태그는 자동 Pre-fectching */}
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* Link 태그 prefetch 명시적 해제 */}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
