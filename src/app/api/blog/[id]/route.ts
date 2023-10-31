// SupabaseAPIコード（1件取得）
// SupabaseAPIコード（1件削除）

import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

// req, resの型はこのように省略された↓。旧APIのようにNextApiRequest、NextApiResponseを使っても良い．
export async function GET(req: Request, { params }: { params: { id: string } }, res: Response){

    const id = params.id // 上記のように { params }: { params: { id: string } }引数を付ければ、paramsからも取ってこれる。
    //const id = req.url.split('/blog/')[1]; // 旧APIでは次のようにidを取得していた→const { id } = req.query

    console.log('◆')
    console.log({ params })
    // console.log(req.url.split('/blog/')[1])
    // req.urlはhttp://localhost.3000/api/blog/supabase-table-test
    // req.url.split('/blog/')[1]で'/blog/'で分割されて2番目の値supabase-table-testを取る

    
    const {data, error} = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

    // console.log(data);

    if(error) {
        return NextResponse.json(error)
    }

    if(!data) {
        notFound()
    }

    // console.log('■');
    // console.log(data);

    // 旧APIではreturn res.status(200).json(data)
    return NextResponse.json(data, {status: 200})
}

export async function DELETE(req: Request, { params }: { params: { id: string } }, res: Response){

    const id = params.id // 上記のように { params }: { params: { id: string } }引数を付ければ、paramsからも取ってこれる。
   // const id = req.url.split('/blog/')[1]; // 旧APIでは次のようにidを取得していた→const { id } = req.query

    // console.log('◆')
    // console.log(params)
    // console.log(req.url.split('/blog/')[1])
    // req.urlはhttp://localhost.3000/api/blog/supabase-table-test
    // req.url.split('/blog/')[1]で'/blog/'で分割されて2番目の値supabase-table-testを取る

    
    const {error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq('id', id);

    // console.log(data);

    if (deleteError) {
        return NextResponse.json(deleteError)
    }

    // console.log('■');
    // console.log(data);

    // 旧APIではreturn res.status(200).json(data)
    return NextResponse.json({message: '削除成功'})
}