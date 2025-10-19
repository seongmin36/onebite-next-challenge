// Slot(슬롯) : 병렬로 렌더링 될 페이지 컴포넌트를 보관하는 폴더 (@sidebar)
export default function Page() {
  // 자신의 부모 컴포넌트인 Layout에 Props로 자동으로 전달 (슬롯 이름은 sidebar)
  return <div>@sidebar</div>;
}
