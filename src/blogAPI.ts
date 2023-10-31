import { resolve } from "path";
import { Article } from "./types";
import { notFound } from "next/navigation";

//すべての記事を呼び出し
export const getAllArticles = async (): Promise<Article[]> => {
    const res = await fetch(`http://localhost:3001/posts`, {cache: "no-store"})
            //no-storeだとSSR, force-cacheだとSSG, {next:{revalidate:10}}だとISR

    if (!res.ok){
        // error.tsxの動作を確認するためわざとエラーを発生させた↓
        throw new Error('エラーが発生しました')
    }
        // loading.tsxの動作を確認するためわざと遅延を発生させた↓
    await new Promise((resolve) => setTimeout(resolve, 1000));
        //Promise オブジェクトは Promise コンストラクタ関数を使って作成することができる．
        //const promise = new Promise((resolve, reject) => {})
        //Promise コンストラクタ関数は resolve と reject の 2 つの引数に取る.


    const articles = await res.json(); //resをarticlesにシリアライズしている（JSON形式に文字列化）.
    return articles;
}

                                    //記事ひとつだけだからPromiseの型はArticle[]でなくArticle
export const getDetailArticle = async (id: string): Promise<Article> => { // idを引数にして
                            // http://localhost:3001/posts/${id}からデータを取得。
                            // 例：http://localhost:3001/posts/next.js13-udemy
    const res = await fetch(`http://localhost:3001/posts/${id}`, {next:{revalidate:60}}) //ISR

    if(res.status === 404 ) {
        notFound();
    }

    if (!res.ok){
        throw new Error('エラーが発生しました')
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const article = await res.json(); //resをarticlesにシリアライズしている（JSON形式に文字列化）.
    return article;
}

// 記事追加
export const createArticle = async (id: string, title: string, content: string, ): Promise<Article> => {
    const currentDatetime = new Date().toISOString();
    
    const res = await fetch(`http://localhost:3001/posts`, {method: 'POST', headers: { //書き込みなのでPOST
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, title, content, createdAt: currentDatetime}),
    }) 

    if (!res.ok){
        throw new Error('エラーが発生しました')
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newArticle = await res.json(); //resをarticlesにシリアライズしている（JSON形式に文字列化）.
    return newArticle;
}


// 記事削除
export const deleteArticle = async (id: string): Promise<Article> => {
    
    const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: 'DELETE'
    }) 

    if (!res.ok){
        throw new Error('エラーが発生しました')
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const deleteArticle = await res.json(); //resをarticlesにシリアライズしている（JSON形式に文字列化）.
    return deleteArticle;
}