///////----------- 旧API----------- ///////

// SupabaseAPIコード（全件取得）

// import { supabase } from "@/utils/supabaseClient";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//     req: NextApiRequest, // 型は公式ドキュメントに書いてある．
//     res: NextApiResponse // https://nextjs.org/docs/pages/building-your-application/routing/api-routes
// ) {
//     const {data, error} = await supabase.from('posts').select('*')

//     // console.log(data);

//     if(error) {
//         return res.status(500).json({error: error.message})
//     }

//     return res.status(200).json(data)
// }