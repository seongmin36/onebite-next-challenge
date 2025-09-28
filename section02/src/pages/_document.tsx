import { Html, Head, Main, NextScript } from "next/document";

// Document컴포넌트는 모든 페이지에 다 적용이 돼야하는 메타 태그나 폰트, 캐릭터셋, 서드파티 스크립트 등
// 페이지 전체를 관리하는 html의 태그를 관리한다.
export default function Document() {
  return (
    // html의 언어
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
