"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  let contextUi = null;
  if (id) {
    contextUi = (
      <>
        <li>
          <Link href={`/update/${id}`}>update</Link>
        </li>
        <li>
          <button
            style={{ cursor: "pointer" }}
            onClick={async () => {
              await fetch("http://localhost:9999/topics/" + id, {
                method: "DELETE",
              }).then(() => {
                alert("deleted !");
                router.push("/");
                router.refresh();
              });
            }}
          >
            delete
          </button>
        </li>
      </>
    );
  }
  return (
    <ul>
      <li>
        <Link href="/create">create</Link>
      </li>
      {contextUi}
    </ul>
  );
}
