import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

const app = express()

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://vercel-fronted-eight.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))
app.use(express.json())

const PORT = process.env.PORT || 4000

// ---------------- SUPABASE ----------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ---------------- CATEGORIES ----------------
app.post('/api/categories', async (req, res) => {
  try {
    console.log('CATEGORY BODY =', req.body);

    const { data, error } = await supabase
      .from('categories')
      .insert([req.body])
      .select();

    console.log('CATEGORY DATA =', data);
    console.log('CATEGORY ERROR =', error);

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data[0]);
  } catch (err) {
    console.log('SERVER CATEGORY ERROR =', err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});


// ---------------- HEALTH CHECK ----------------
app.get('/', (req, res) => {
  res.send('iBid backend running with Supabase 🚀')
})

// ---------------- TEST SUPABASE ----------------
app.get('/api/test-supabase', async (req, res) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .limit(5)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ success: true, data })
})

// ---------------- BOOKS (READ ALL + SEARCH) ----------------
app.get('/api/books', async (req, res) => {
  const { q } = req.query

  let query = supabase.from('books').select('*')

  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  const { data, error } = await query

  
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// ---------------- SINGLE BOOK ----------------
app.get('/api/books/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) {
    return res.status(404).json({ error: error.message })
  }

  res.json(data)
})

// ---------------- CREATE BOOK ----------------
app.post('/api/books', async (req, res) => {
    console.log('BOOK DATA =', req.body)
  const book = req.body
if (!book.slug || book.slug.trim() === '') {
  book.slug = book.title
    .toLowerCase()
    .replace(/\s+/g, '-');
}
  const { data, error } = await supabase
    .from('books')
    console.log("BOOK SLUG =", book.slug)
    .insert([book])
    .select()
 console.log('SUPABASE ERROR =', error)
  console.log('SUPABASE DATA =', data)
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data[0])
})

// ---------------- UPDATE BOOK ----------------
app.put('/api/books/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('books')
    .update(req.body)
    .eq('id', req.params.id)
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data[0])
})

// ---------------- DELETE BOOK ----------------
app.delete('/api/books/:id', async (req, res) => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', req.params.id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ success: true, message: 'Book deleted' })
})
//api supabase.js
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email, and password are required'
      })
    }

    // check user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password,
          role: 'Shopper'
        }
      ])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    const newUser = data[0]

    res.status(201).json({
      token: `ibid-user-token-${newUser.id}`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (error || !data) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    res.json({
      token: `ibid-user-token-${data.id}`,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      }
    })

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

//user api
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }

    res.json(data)

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})
// VENDORS API
app.get('/api/vendors', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'Vendor');

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.put('/api/vendors/:id', async (req, res) => {
  console.log("VENDOR ID =", req.params.id);
  console.log("BODY =", req.body);

  const { data, error } = await supabase
    .from('users')
    .update(req.body)
    .eq('id', req.params.id)
    .select();

  console.log("DATA =", data);
  console.log("ERROR =", error);

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

 res.json(data?.[0] || null);
});
app.put('/api/vendors/:id/approve', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      is_approved: true
    })
    .eq('id', req.params.id)
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data[0]);
});
// categories api4
app.post('/api/categories', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([req.body])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data[0]);
});

app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.put('/api/categories/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .update(req.body)
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data[0]);
});


app.delete('/api/categories/:id', async (req, res) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true });
});
//order api
app.post('/api/orders', async (req, res) => {
  console.log('BODY =', req.body)

  try {
   const { user_id, total, items } = req.body;
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
           user_id: user_id || null,
          total,
          items,
          status: 'Pending'
          
        }
      ])
      .select()

    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }

    res.status(201).json(data[0])

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})
// GET ALL ORDERS
app.get('/api/orders', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});


// GET SINGLE ORDER
app.get('/api/orders/:id', async (req, res) => {
  const id = Number(req.params.id);

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });

  if (!data) return res.status(404).json({ error: "Order not found" });

  res.json(data);
});
//dashboard
app.get('/api/dashboard', async (req, res) => {
  const { data: books } = await supabase.from('books').select('*')
  const { data: users } = await supabase.from('users').select('*')
  const { data: orders } = await supabase.from('orders').select('*')

  const totalRevenue =
    orders?.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    ) || 0

  const recentOrders =
    orders?.slice(-5).reverse() || []

  res.json({
    totalBooks: books?.length || 0,
    totalUsers: users?.length || 0,
    totalOrders: orders?.length || 0,
    totalRevenue,
    recentOrders
  })
})

app.post('/api/admin/login', async (req, res) => {
  try {
    console.log('ADMIN LOGIN BODY =', req.body)

    const { email, password } = req.body

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .eq('role', 'Admin')
      .single()

    console.log('ADMIN FOUND =', data)
    console.log('ADMIN ERROR =', error)

    if (error || !data) {
      return res.status(401).json({
        error: 'Invalid admin credentials'
      })
    }

    res.json({
      token: `admin-token-${data.id}`,
      user: data
    })
  } catch (err) {
    console.log('SERVER ERROR =', err)
    res.status(500).json({
      error: err.message
    })
  }
}) 
// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`iBid backend running on http://localhost:${PORT}`)
})