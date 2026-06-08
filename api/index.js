import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

const ADMIN_TOKEN = 'ibid-admin-token-2026';
const ADMIN_EMAIL = 'admin@ibid.com';
const ADMIN_PASSWORD = 'admin123';

// In-Memory Database (no file operations for Vercel)
let db = {
  books: [
    {
      id: 1,
      title: 'The Great Gatsby',
      slug: 'the-great-gatsby',
      author: 'F. Scott Fitzgerald',
      authorId: 1,
      category: 'Fiction',
      price: 12.99,
      oldPrice: 15.99,
      rating: 4.5,
      reviews: 128,
      badge: 'Bestseller',
      cover: 'https://via.placeholder.com/300x400?text=The+Great+Gatsby',
      description: 'A classic American novel set in the Jazz Age.',
      info: { pages: 180, language: 'English', publisher: 'Scribner', isbn: '978-0-7432-7356-5' },
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      slug: 'to-kill-a-mockingbird',
      author: 'Harper Lee',
      authorId: 2,
      category: 'Fiction',
      price: 14.99,
      oldPrice: 18.99,
      rating: 4.8,
      reviews: 256,
      badge: 'Award Winner',
      cover: 'https://via.placeholder.com/300x400?text=To+Kill+a+Mockingbird',
      description: 'A gripping tale of racial injustice and childhood innocence.',
      info: { pages: 281, language: 'English', publisher: 'Lippincott', isbn: '978-0-06-112008-4' },
    },
  ],
  categories: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Self-Help'],
  users: [],
  orders: [],
};

app.use(cors());
app.use(express.json());

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Admin authorization required' });
  }
  next();
}

// Books endpoints
app.get('/api/books', (req, res) => {
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

app.get('/api/books/:id', (req, res) => {
  const book = db.books.find((item) => item.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

app.post('/api/books', requireAdmin, (req, res) => {
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
  res.status(201).json(newBook);
});

app.put('/api/books/:id', requireAdmin, (req, res) => {
  const bookId = Number(req.params.id);
  const index = db.books.findIndex((item) => item.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const updatedBook = { ...db.books[index], ...req.body, id: bookId };
  db.books[index] = updatedBook;
  res.json(updatedBook);
});

app.delete('/api/books/:id', requireAdmin, (req, res) => {
  const bookId = Number(req.params.id);
  db.books = db.books.filter((item) => item.id !== bookId);
  res.json({ success: true });
});

// Categories endpoint
app.get('/api/categories', (req, res) => {
  res.json(db.categories);
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json(db.users);
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
  res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
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
  res.status(201).json(newOrder);
});

// Dashboard endpoint
app.get('/api/dashboard', (req, res) => {
  const orders = db.orders;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orders.slice(-3).reverse();
  const totalUsers = db.users.length;
  const totalBooks = db.books.length;
  res.json({ totalOrders, totalRevenue, totalUsers, totalBooks, recentOrders });
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN, user: { email: ADMIN_EMAIL, role: 'admin' } });
  }
  res.status(401).json({ error: 'Invalid admin credentials' });
});

// User registration endpoint
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

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

  return res.status(201).json({ 
    token: `ibid-user-token-${newUser.id}`, 
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } 
  });
});

// User login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  return res.json({ 
    token: `ibid-user-token-${user.id}`, 
    user: { id: user.id, name: user.name, email: user.email, role: user.role } 
  });
});

export default serverless(app);
