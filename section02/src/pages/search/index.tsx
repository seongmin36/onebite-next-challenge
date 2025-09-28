import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { q } = router.query;
  console.log(q);

  return <h1>search {q}</h1>;
}
