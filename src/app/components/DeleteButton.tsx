// 削除ボタンとその発火関数だけのコンポーネント．articles/[id]/page.tsxに埋め込む
"use client";

import { deleteArticle } from "@/blogAPI";
import { useRouter } from "next/navigation";
import React from "react";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    {
      /* ↓ Json Serverから呼び出すAPI,blogAPI.tsから呼び出す関数 */
    }
    // await deleteArticle(id);
    {
      /* ↑ ここまで */
    }

    {
      /* ↓ supabaseから呼び出すAPI,pages/api/index.tsから呼び出す関数 */
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${API_URL}/api/blog/${id}`, {
      method: "DELETE",
    });
    {
      /* ↑ ここまで */
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-5 inline couser-pointer"
        onClick={handleDelete}
      >
        削除する
      </div>
    </div>
  );
};

export default DeleteButton;
