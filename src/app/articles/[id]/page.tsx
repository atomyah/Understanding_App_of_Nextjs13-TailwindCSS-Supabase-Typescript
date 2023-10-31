//各詳細ページ

import React from "react";
import Image from "next/image";
import { getDetailArticle } from "@/blogAPI";
import DeleteButton from "@/app/components/DeleteButton";

// {params}でクリックした記事ID（を含むオブジェクト）にアクセスできる．
// Typescriptなので: { params: { id: string } }と型指定．
const Article = async ({ params }: { params: { id: string } }) => {
  {
    /* ↓ Json Serverから呼び出すAPI,blogAPI.tsから呼び出す関数 */
  }
  // const detailArticle = await getDetailArticle(params.id);
  {
    /* ↑ ここまで */
  }

  {
    /* ↓ supabaseから呼び出すAPI,pages/api/index.tsから呼び出す関数 */
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/blog/${params.id}`, {
    next: { revalidate: 10 },
  });
  const detailArticle = await res.json();
  {
    /* ↑ ここまで */
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Image
        src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${detailArticle.id}`}
        alt=""
        width={1280}
        height={300}
      />
      <h1 className="text-4xl text-center mb-10 mt-10">
        {detailArticle.title}
      </h1>
      <div className="text-lg leading-relaxed text-justify">
        <p>{detailArticle.content}</p>
      </div>
      <div className="text-right mt-3">
        {/* ここに<button onClick={handleDelete}などとするとエラーになる．
        onSubmitやonClickを使いたい場合は"use client"宣言が必要．しかしこのページはSSRさせたいので
        このページに"use client"宣言したくない。．
        従って削除ボタン<DeleteButton>コンポーネントを別に作り、ここに埋め込んでいる． */}
        <DeleteButton id={detailArticle.id} />
      </div>
    </div>
  );
};

export default Article;
