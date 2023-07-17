import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cejmnhihtbftrrelxhwu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlam1uaGlodGJmdHJyZWx4aHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MjY2MzAsImV4cCI6MjAwNTEwMjYzMH0.ns2RkFSKQNcXdd_CtgYYXMGFBGsG7-TP8u07q2lQRrI"


// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase