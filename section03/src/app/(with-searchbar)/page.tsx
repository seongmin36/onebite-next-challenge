import ClientComponent from "../../components/client-component";
import styles from "./page.module.css";
import ServerComponent from "../../components/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        {/* children으로 불러오면 서버 컴포넌트로 유지 */}
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
