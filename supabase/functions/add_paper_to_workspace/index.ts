// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import axiod from "https://deno.land/x/axiod/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {Buffer} from "https://deno.land/std/io/buffer.ts";

// const https = require('https')

//  cors
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Expose-Headers": "Content-Length, X-JSON",
  "Access-Control-Allow-Headers": "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
}


const downloadFileAsArrayBuffer = async (url) => {
  try {
    const response = await axiod({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
      maxRedirects: 5, // Maximum number of redirects to follow
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to download the file. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error during file download: ${error.message}`);
  }
};

function isPDF(buf: Uint8Array): boolean {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const pdfHeader = encoder.encode("%PDF-");
  const pdfFooter = encoder.encode("%%EOF");

  return (
    buf instanceof Uint8Array &&
    buf.subarray(0, pdfHeader.length).toString() === decoder.decode(pdfHeader) &&
    buf.lastIndexOf(pdfFooter) > -1
  );
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
    let pdf = await downloadFileAsArrayBuffer(pdf_url);

    console.log("pdf", pdf)
    console.log("is pdf", isPDF(pdf))
    // Check if pdf
    // if (!isPDF(pdf)) {
    //   throw new Error(`File is not a PDF`);
    // }

    // // Now we can get the session or user object
    // const {
    //   data: { user },
    // } = await supabaseClient.auth.getUser()

    let reference_api = `https://api.semanticscholar.org/graph/v1/paper/${paper.paperId}/references?fields=title,url,authors,publicationDate,publicationVenue,publicationTypes,publicationDate,fieldsOfStudy,openAccessPdf,isOpenAccess&offset=0&limit=500`
    let references = [];
    let { data: references_data, error: references_error } = await axiod.get(reference_api)

    if (references_error) {
      throw references_error
    }

    // random hash
    let random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Upload to supabase storage
    let { data: pdf_data, error: pdf_error } = await supabaseClient.storage.from('papers').upload(`${paper.paperId + "_" + random}.pdf`, pdf, { cacheControl: '3600' })

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
        publication_venue: "",
        semantic_id: paper.paperId,
        references: references_data.data,
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
    return new Response(JSON.stringify({ error: error.message }), {
      headers: headers,
      status: 400,
    })
  }
})


// Deploy Command
// npx supabase functions deploy add_paper_to_workspace --project-ref cejmnhihtbftrrelxhwu