// 新規投稿ページ

"use client";
// FormでonSubmit()使う場合は"use client";が必須．

import { createArticle } from "@/blogAPI";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const CreateBlogPage = () => {
  const router = useRouter();

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ここはもう暗記。ただし(e)だけでマウスオーバーすると"FormEvent<HTMLFormElement>"と表示されると思う．
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ローディング
    setLoading(true);

    {
      /* ↓ Json Serverから呼び出すAPI,blogAPI.tsから呼び出す関数 */
    }
    // await createArticle(id, title, content);
    {
      /* ↑ ここまで */
    }

    {
      /* ↓ supabaseから呼び出すAPI,pages/api/index.tsから呼び出す関数 */
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${API_URL}/api/blog`, {
      // pages/api/create.jsというファイル名でAPIを作ったのでこのURL（http://localhost:3000/api/create）になる．
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content }), //このbodyがpages/api/create.ts APIに渡される
    });
    {
      /* ↑ ここまで */
    }

    setLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    // "min-h-screen: height100vhのこと
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ新規作成</h2>

      <form
        className="bg-slate-200 p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">URL</label>
          <input
            type="text"
            // leading-tight:リーディング（行の高さ）
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">本文</label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <button
          type="submit"
          // 実際にローディングを発火させてるのはblogAPI.tsで、下記のコードとsetLoading(true)フックは
          // ボタン表示をローディングに合わせて変えてるだけ．
          className={`py-2 px-4 border rounded-md ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-500"
          } `}
          disabled={loading}
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
