import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
// import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Book } from "@/types/book";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   console.log(context);
//   const q = context.q;

//   const [books] = await Promise.all([fetchBooks(q as string)]);

//   return {
//     props: {
//       // books,
//     },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);

    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
