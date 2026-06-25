import { createClient } from '@supabase/supabase-js'
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea

export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
<<<<<<< HEAD
=======
console.log('URL =', process.env.SUPABASE_URL)
console.log('SERVICE KEY EXISTS =', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
>>>>>>> b0927ac (updated project changes)
=======
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea
)