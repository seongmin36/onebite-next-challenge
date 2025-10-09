// client 컴포넌트로 생성 지시자
"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  console.log("홈 컴포넌트 실행");

  // app router에서는 기본적으로 서버 컴포넌트를 사용하기 때문에 보안성
  const secretKey = "qwer123";

  // client 컴포넌트는 서버 컴포넌트로 실행 불가 (React hooks)
  useEffect(() => {});

  return <div className={styles.page}>인덱스 페이지</div>;
}
