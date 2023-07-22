// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import axiod from "https://deno.land/x/axiod/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


//  cors
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Expose-Headers": "Content-Length, X-JSON",
  "Access-Control-Allow-Headers": "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
}

serve(async (req: Request) => {
  try {

      // This is needed if you're planning to invoke your function from a browser.
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: headers })
    }
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? 'https://cejmnhihtbftrrelxhwu.supabase.co',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlam1uaGlodGJmdHJyZWx4aHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MjY2MzAsImV4cCI6MjAwNTEwMjYzMH0.ns2RkFSKQNcXdd_CtgYYXMGFBGsG7-TP8u07q2lQRrI',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    let data = await req.json()
    let { paper, workspace_id } = data

    let pdf_url = paper.openAccessPdf.url

    // Download pdf
    let pdf = await axiod.get(pdf_url, { responseType: "arraybuffer" })

    // // Now we can get the session or user object
    // const {
    //   data: { user },
    // } = await supabaseClient.auth.getUser()

    // random hash
    let random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Upload to supabase storage
    let { data: pdf_data, error: pdf_error } = await supabaseClient.storage.from('papers').upload(`${paper.paperId + "_" + random}.pdf`, pdf.data, { cacheControl: '3600' })

    if (pdf_error) {
      throw pdf_error
    }

    // Add paper to workspace
    let { data: paper_data, error: paper_error } = await supabaseClient
      .from('paper')
      .insert({
        workspace_id: workspace_id,
        title: paper.title,
        abstract: paper.abstract,
        authors: paper.authors,
        published_at: paper.publicationDate,
        paper_url: pdf_url,
        pdf_path: paper.paperId + "_" + random + ".pdf" ,
      }).select().single()

    if (paper_error) {
      throw paper_error
    }


    // And we can run queries in the context of our authenticated user

    return new Response(JSON.stringify({ paper: paper_data }), {
      headers: headers,
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      headers: headers,
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'