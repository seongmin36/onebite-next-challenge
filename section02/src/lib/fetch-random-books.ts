import { Book } from "@/types/book";

export default async function fetchRandomBooks(): Promise<Book[]> {
  const url = `https://onebite-book-server-three.vercel.app/book/random`;

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
