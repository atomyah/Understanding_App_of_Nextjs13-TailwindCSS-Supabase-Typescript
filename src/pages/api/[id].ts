// // SupabaseAPIコード（詳細ページ取得）および（削除）

// import { supabase } from "@/utils/supabaseClient";
// import { NextApiRequest, NextApiResponse } from "next";
// import { notFound } from "next/navigation";

// export default async function handler(
//     req: NextApiRequest, // 型は公式ドキュメントに書いてある．
//     res: NextApiResponse // https://nextjs.org/docs/pages/building-your-application/routing/api-routes
// ) {
//     const { id } = req.query

//     switch(req.method) {
//         case "GET":
//             const {data, error} = await supabase
//             .from('posts')
//             .select('*')
//             .eq('id', id)
//             .single()
        
//             // console.log(data);
        
//             if(error) {
//                 return res.status(500).json({error: error.message})
//             }
        
//             if(!data) {
//                 notFound()
//             }
        
//             return res.status(200).json(data)
        
//         case "PUT":
//             // 編集したい場合、ここに更新の処理を記述
//             break;

//         case "DELETE":
//             const {error: deleteError } = await supabase
//             .from("posts")
//             .delete()
//             .eq('id', id);

//             if (deleteError) {
//                 return res.status(500).json({ error: deleteError.message })
//             }
//             return res.status(200).json({ message: '削除成功'})
//     }


// }