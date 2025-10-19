"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  // useSearchParams : 현재 페이지에 적용된 query string의 값을 꺼내오는 역할
  // PageRouter에서 썼던 useRouter와 다르기 때문에 router.query.q로 꺼내오지 못함.
  // useSearchParams()는 빌드타임에는 쿼리 스트링 값을 알 수 없음. -> 빌드 중에 오류 발생
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  // "q"라는 query string을 Get으로 가져옴
  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
