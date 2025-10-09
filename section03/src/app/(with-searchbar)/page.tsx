import styles from "./page.module.css";

export default function Home() {
  console.log("홈 컴포넌트 실행");
  return <div className={styles.page}>인덱스 페이지</div>;
}
