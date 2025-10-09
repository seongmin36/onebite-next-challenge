"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useState } from "react";

// static한 페이지는 js와 rsc 모두 pre fetching하지만, dynamic한 페이지는 rsc만 불러온다.
export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} type="text" />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
