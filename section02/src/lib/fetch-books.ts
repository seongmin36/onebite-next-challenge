import { Book } from "@/types/book";

export default async function fetchBooks(q?: string): Promise<Book[]> {
  let url = `https://onebite-book-server-three.vercel.app/book`;

  // /book/search url만 추가
  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
