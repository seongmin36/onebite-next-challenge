import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
      { cache: "force-cache" } // cache를 강제함으로써 Dynamic 페이지로 바뀌는 것을 막음
    );

    if (!response.ok) {
      return <div>제작 @krong</div>;
    }

    const books: BookData[] = await response.json();

    return (
      <footer>
        <div>제작 @krong</div>
        <div>{books.length}개의 책이 등록되어있습니다.</div>
      </footer>
    );
  } catch (e) {
    console.error(e);
    return <div>Error</div>;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
