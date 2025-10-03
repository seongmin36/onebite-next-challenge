import { Book } from "@/types/book";

export default async function fetchBooks(): Promise<Book[]> {
  const url = `http://localhost:12345/book`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
