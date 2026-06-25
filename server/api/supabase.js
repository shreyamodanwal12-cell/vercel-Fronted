import { createClient } from '@supabase/supabase-js'
<<<<<<< HEAD

export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
=======
console.log('URL =', process.env.SUPABASE_URL)
console.log('SERVICE KEY EXISTS =', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
>>>>>>> b0927ac (updated project changes)
)