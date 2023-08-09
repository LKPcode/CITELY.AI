// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import axiod from "https://deno.land/x/axiod/mod.ts";

//  cors
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Expose-Headers": "Content-Length, X-JSON",
  "Access-Control-Allow-Headers": "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
}

serve(async (req: Request) => {

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: headers })
  }

  if (req.method === 'POST') {
    const { query, page_num } = await req.json()
    // Replace query spaces with + for API
    let search_term = query.replace(" ", "+")

    let papers_per_page = 20
    let offset = papers_per_page*page_num

    try{
    //  axiod.defaults.headers.common['x-api-key'] = 'pSiTPLX8Sp4TxEcNyRwta44ySUY7Ymy8rT543fC5'
     let {data, error} =  await axiod.get(`https://api.semanticscholar.org/graph/v1/paper/search?query=${search_term}&offset=${offset}&limit=20&fields=title,url,abstract,authors,publicationVenue,publicationTypes,publicationDate,fieldsOfStudy,openAccessPdf,isOpenAccess&isOpenAccess=true&openAccessPdf`,
      { headers: {
        "x-api-key": "pSiTPLX8Sp4TxEcNyRwta44ySUY7Ymy8rT543fC5"
      } })

      if (error) {
        throw error
      }

     return new Response(
        JSON.stringify(data),
        { 
          headers: headers,
          status: 200 
        },
     )

    } catch (error) {
      console.log(error)
      return new Response(
        JSON.stringify({ error }),
        { headers: headers,
          status: 400
        }
      )
    }


    
  }

  return new Response(
    JSON.stringify({ message: "You need to use POST request type" }),
    { headers: headers }
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
