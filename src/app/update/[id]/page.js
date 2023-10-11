"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update({ params }) {
  const router = useRouter();
  const id = params.id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function refresh() {
    const resp = await fetch(`http://localhost:9999/topics/${id}`, {
      cache: "no-store",
    });
    const topic = await resp.json();
    setTitle(topic.title);
    setBody(topic.body);
  }
  useEffect(() => {
    refresh();
  }, [id]);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;

        const resp = await fetch("http://localhost:9999/topics/" + id, {
          method: "PATCH",
          body: JSON.stringify({ title, body }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const topic = await resp.json();
        const lastId = topic.id;
        const url = `/read/${lastId}`;
        router.push(url);
        router.refresh();
      }}
    >
      <h2>Update</h2>
      <p>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="create"></input>
      </p>
    </form>
  );
}
