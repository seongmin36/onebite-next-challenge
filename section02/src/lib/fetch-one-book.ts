import { Book } from "@/types/book";

export default async function fetchOneBook(id: number): Promise<Book | null> {
  const url = `https://onebite-book-server-three.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
