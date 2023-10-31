//"use client"; //ブラウザでコンソールログを表示させたい場合の呪文．

import Image from "next/image";
import ArticleList from "./components/ArticleList";
import { getAllArticles } from "@/blogAPI";
import { Server } from "http";
import { supabase } from "@/utils/supabaseClient";

export default async function Home() {
  {
    /* ↓ Json Serverから呼び出すAPI,blogAPI.tsから呼び出す関数 */
  }
  // const articles = await getAllArticles();
  {
    /* ↑ ここまで */
  }
  //console.log(articles);
  //SSRなのでサーバーサイドレンダリングなのでブラウザのコンソールには表示されない．
  //VS Codeのターミナル(json-server --watchを打ったターミナル）に表示される。

  {
    /* ↓ supabaseから呼び出すAPI,pages/api/index.tsから呼び出す関数 */
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/blog`, { cache: "no-store" });
  const articles = await res.json();

  {
    /* ↑ ここまで */
  }

  console.log(supabase);

  return (
    <div className="md:flex">
      <section className="w-full md:w-2/3 flex-col items-center px-3">
        <ArticleList articles={articles} />
      </section>

      <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6">
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4">
          <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
          <h3 className="font-bold text-gray-900 mb-2">Category</h3>
          <ul className="text-gray-600 mt-2">
            <li>
              <a href="#">Technology</a>
            </li>
            <li>
              <a href="#">Automotive</a>
            </li>
            <li>
              <a href="#">Finance</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}