import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 넥스트 서버 측에서 사전 렌더링을 진행할 때 Suspense로 묶여있는 컴포넌트들은 미완성 상태로 남겨짐 */}
      {/* -> 곧바로 렌더링 X -> fallback으로 대체 UI 생성 (비동기작업이 종료될 때까지)*/}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
