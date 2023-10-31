// // SupabaseAPIコード（新規投稿）

// import { supabase } from "@/utils/supabaseClient";
// import { NextApiRequest, NextApiResponse } from "next";
// import { notFound } from "next/navigation";

// export default async function handler(
//     req: NextApiRequest, // 型は公式ドキュメントに書いてある．
//     res: NextApiResponse // https://nextjs.org/docs/pages/building-your-application/routing/api-routes
// ) {
//     const { id, title, content } = req.body // このreq.bodyはapp/articles/new/page.tsxの
//                                             // fetch文のbody: JSON.stringify({ id, title, content }
//                                             // から渡される．
//     const {data, error} = await supabase
//     .from('posts')
//     .insert({id, title, content, createdAt: new Date().toISOString() })

//     // console.log(data);

//     if(error) {
//         return res.status(500).json({error: error.message})
//     }

//     return res.status(200).json(data)
// }