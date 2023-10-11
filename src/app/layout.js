import Link from "next/link";
import "./globals.css";
import { useRouter } from "next/navigation";
import { Control } from "./Control";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const resp = await fetch("http://localhost:9999/topics", {
    cache: "no-store",
  });
  const topics = await resp.json();
  // console.log(topics);

  return (
    <html lang="en">
      <body>
        <div>
          <input type="text" placeholder="search" />
          <h1>
            <Link href="/">WEB!</Link>
          </h1>
          <ol>
            {/* <li>
              <Link href="/read/1">html!</Link>
            </li>
            <li>
              <Link href="/read/2">css!</Link>
            </li> */}
            {topics.map((t) => {
              return (
                <li key={t.id}>
                  <Link href={`/read/${t.id}`}>{t.title}</Link>
                </li>
              );
            })}
          </ol>
          {children}
          <Control />
        </div>
      </body>
    </html>
  );
}
