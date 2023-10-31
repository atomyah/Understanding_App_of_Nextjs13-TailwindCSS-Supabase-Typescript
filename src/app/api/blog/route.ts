// SupabaseAPIコード（全件取得）-> function GET
// SupabaseAPIコード（新規投稿）-> function POST

import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// req, resの型はこのように省略された．旧APIのようにNextApiRequest、NextApiResponseを使っても良い．
export async function GET(req: Request, res: Response){
    const {data, error} = await supabase
    .from('posts')
    .select('*')

    // console.log('■');
    // console.log(data);

    if(error) {
        // 旧APIではreturn res.status(500).json({error: error.message})
        return NextResponse.json(error)
    }
    // 旧APIではreturn res.status(200).json(data)
    return NextResponse.json(data, {status: 200})
}

export async function POST(req: Request, res: Response){
    // 旧APIのコード
    // const { id, title, content } = req.body // このreq.bodyはapp/articles/new/page.tsxの
    //                                         // fetch文のbody: JSON.stringify({ id, title, content }
    //                                         // から渡される．

    const { id, title, content } = await req.json();


    const {data, error} = await supabase
    .from('posts')
    .insert({id, title, content, createdAt: new Date().toISOString() })

    // console.log(data);

    if(error) {
        // 旧APIではreturn res.status(500).json({error: error.message})
        return NextResponse.json(error)
    }
    // 旧APIではreturn res.status(200).json(data)
    return NextResponse.json(data, {status: 201})
}