require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'asmara-store-dev-secret';

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

const users = [];
const listings = [
  {
    id: uuid(),
    title: 'Toyota Corolla 2010',
    description: 'Clean Toyota Corolla, good condition, ready to drive.',
    price: 5200,
    category: 'Vehicles',
    city: 'Asmara',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
    sellerId: 'demo-seller',
    sellerName: 'Asmara Motors',
    promoted: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    title: 'Apartment for Rent',
    description: 'Two bedroom apartment near city center.',
    price: 450,
    category: 'Real Estate',
    city: 'Asmara',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
    sellerId: 'demo-seller-2',
    sellerName: 'Red Sea Homes',
    promoted: false,
    createdAt: new Date().toISOString(),
  },
];
const messages = [];
const notifications = [];
const ratings = [];

function authRequired(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Asmara Store API' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
  if (users.some((user) => user.email === email)) return res.status(409).json({ message: 'Email already exists' });

  const user = {
    id: uuid(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/auth/me', authRequired, (req, res) => {
  res.json(req.user);
});

app.get('/api/listings', (req, res) => {
  const { category, city, q } = req.query;
  let results = [...listings];

  if (category && category !== 'All') results = results.filter((item) => item.category === category);
  if (city && city !== 'All') results = results.filter((item) => item.city === city);
  if (q) {
    const keyword = q.toLowerCase();
    results = results.filter((item) => `${item.title} ${item.description} ${item.city}`.toLowerCase().includes(keyword));
  }

  results.sort((a, b) => Number(b.promoted) - Number(a.promoted) || new Date(b.createdAt) - new Date(a.createdAt));
  res.json(results);
});

app.get('/api/listings/:id', (req, res) => {
  const listing = listings.find((item) => item.id === req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  res.json(listing);
});

app.post('/api/listings', authRequired, (req, res) => {
  const { title, description, price, category, city, image } = req.body;
  if (!title || !description || !price || !category || !city) return res.status(400).json({ message: 'Missing listing fields' });

  const listing = {
    id: uuid(),
    title,
    description,
    price: Number(price),
    category,
    city,
    image: image || '',
    sellerId: req.user.id,
    sellerName: req.user.name,
    promoted: false,
    createdAt: new Date().toISOString(),
  };

  listings.unshift(listing);
  res.status(201).json(listing);
});

app.post('/api/ratings', authRequired, (req, res) => {
  const { sellerId, listingId, stars, comment } = req.body;
  const rating = { id: uuid(), sellerId, listingId, stars: Number(stars), comment, userId: req.user.id, createdAt: new Date().toISOString() };
  ratings.push(rating);
  res.status(201).json(rating);
});

app.get('/api/messages/conversations', authRequired, (req, res) => {
  const related = messages.filter((msg) => msg.from === req.user.id || msg.to === req.user.id);
  res.json(related);
});

app.post('/api/messages/send', authRequired, (req, res) => {
  const { to, listingId, text } = req.body;
  if (!to || !text) return res.status(400).json({ message: 'Recipient and text are required' });

  const message = { id: uuid(), from: req.user.id, to, listingId, text, read: false, createdAt: new Date().toISOString() };
  messages.push(message);
  notifications.push({ id: uuid(), userId: to, type: 'message', text: 'New message received', read: false, createdAt: new Date().toISOString() });
  res.status(201).json(message);
});

app.get('/api/notifications', authRequired, (req, res) => {
  res.json(notifications.filter((item) => item.userId === req.user.id));
});

app.get('/api/notifications/unread-count', authRequired, (req, res) => {
  const count = notifications.filter((item) => item.userId === req.user.id && !item.read).length;
  res.json({ count });
});

app.post('/api/payments/stripe/checkout', authRequired, (req, res) => {
  const { listingId } = req.body;
  res.json({
    provider: 'stripe',
    mode: 'demo',
    listingId,
    message: 'Stripe checkout endpoint is ready. Add STRIPE_SECRET_KEY to enable real payments.',
  });
});

app.post('/api/payments/paypal/order', authRequired, (req, res) => {
  const { listingId } = req.body;
  res.json({
    provider: 'paypal',
    mode: 'demo',
    listingId,
    message: 'PayPal order endpoint is ready. Add PayPal credentials to enable real payments.',
  });
});

app.listen(PORT, () => {
  console.log(`Asmara Store API running on http://localhost:${PORT}`);
});
