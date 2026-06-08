import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import serverless from 'serverless-http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const ADMIN_TOKEN = 'ibid-admin-token-2026';
const ADMIN_EMAIL = 'admin@ibid.com';
const ADMIN_PASSWORD = 'admin123';

// Fix: Use correct path for Vercel
const DB_FILE = path.join(__dirname, '..', 'server', 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Error handler for file operations
async function readDb() {
  try {
    const raw = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading database:', error);
    // Return default structure if file doesn't exist
    return {
      books: [],
      categories: [],
      users: [],
      orders: [],
    };
  }
}

async function writeDb(data) {
  try {
    // Ensure directory exists
    await fs.mkdir(path.dirname(DB_FILE), { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Admin authorization required' });
  }
  next();
}

app.get('/api/books', async (req, res) => {
  const db = await readDb();
  const { q } = req.query;
  if (q) {
    const normalized = q.toLowerCase();
    const results = db.books.filter((book) =>
      book.title.toLowerCase().includes(normalized) ||
      book.category.toLowerCase().includes(normalized) ||
      book.author.toLowerCase().includes(normalized)
    );
    return res.json(results);
  }
  res.json(db.books);
});

app.get('/api/books/:id', async (req, res) => {
  const db = await readDb();
  const book = db.books.find((item) => item.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

app.get('/api/categories', async (req, res) => {
  const db = await readDb();
  res.json(db.categories);
});

app.get('/api/users', async (req, res) => {
  const db = await readDb();
  res.json(db.users);
});

app.get('/api/orders', async (req, res) => {
  const db = await readDb();
  res.json(db.orders);
});

app.get('/api/dashboard', async (req, res) => {
  const db = await readDb();
  const orders = db.orders;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orders.slice(-3).reverse();
  const totalUsers = db.users.length;
  const totalBooks = db.books.length;
  res.json({ totalOrders, totalRevenue, totalUsers, totalBooks, recentOrders });
});

app.post('/api/orders', async (req, res) => {
  const db = await readDb();
  const order = req.body;
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    return res.status(400).json({ error: 'Order must include items' });
  }
  const nextId = Math.max(0, ...db.orders.map((item) => item.id)) + 1;
  const newOrder = {
    id: nextId,
    userId: order.userId || 1,
    items: order.items,
    total: order.total || order.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    status: order.status || 'Pending',
    createdAt: new Date().toISOString(),
  };
  db.orders.push(newOrder);
  await writeDb(db);
  res.status(201).json(newOrder);
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN, user: { email: ADMIN_EMAIL, role: 'admin' } });
  }
  res.status(401).json({ error: 'Invalid admin credentials' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const db = await readDb();
  const existingUser = db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const nextId = Math.max(0, ...db.users.map((user) => user.id)) + 1;
  const newUser = {
    id: nextId,
    name,
    email,
    password,
    role: 'Shopper',
  };
  db.users.push(newUser);
  await writeDb(db);

  return res.status(201).json({ token: `ibid-user-token-${newUser.id}`, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  return res.json({ token: `ibid-user-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/books', requireAdmin, async (req, res) => {
  const db = await readDb();
  const book = req.body;
  if (!book || !book.title || !book.price) {
    return res.status(400).json({ error: 'Book title and price are required' });
  }
  const nextId = Math.max(0, ...db.books.map((item) => item.id)) + 1;
  const newBook = {
    id: nextId,
    slug: book.slug || book.title.toLowerCase().replace(/\s+/g, '-'),
    author: book.author || 'Unknown Author',
    authorId: book.authorId || 0,
    category: book.category || 'Books',
    price: Number(book.price),
    oldPrice: Number(book.oldPrice || book.price),
    rating: Number(book.rating || 4.0),
    reviews: Number(book.reviews || 0),
    badge: book.badge || '',
    cover: book.cover || '',
    description: book.description || '',
    info: book.info || { pages: 0, language: 'English', publisher: '', isbn: '' },
  };
  db.books.push(newBook);
  await writeDb(db);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', requireAdmin, async (req, res) => {
  const db = await readDb();
  const bookId = Number(req.params.id);
  const index = db.books.findIndex((item) => item.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const updatedBook = { ...db.books[index], ...req.body, id: bookId };
  db.books[index] = updatedBook;
  await writeDb(db);
  res.json(updatedBook);
});

app.delete('/api/books/:id', requireAdmin, async (req, res) => {
  const db = await readDb();
  const bookId = Number(req.params.id);
  db.books = db.books.filter((item) => item.id !== bookId);
  await writeDb(db);
  res.json({ success: true });
});

export default serverless(app);
