
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(process.env.REACT_APP_URL_SUPABASE as string, 
  process.env.REACT_APP_ANON_KEY as string )

export default supabase;