import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
<<<<<<< HEAD
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
=======
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea
)