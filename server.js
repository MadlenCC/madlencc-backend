const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bannerRoutes = require('./routes/bannerRoutes');

const contentRoutes = require('./routes/contentRoutes'); // bez .js na kraju kada koristimo require

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Konekcija na MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  // ⏳ Pokreni automatski ping svakih 5 minuta da baza ne zaspi
  setInterval(async () => {
    try {
      await mongoose.connection.db.admin().ping();
      console.log('MongoDB ping successful');
    } catch (error) {
      console.error('MongoDB ping failed', error);
    }
  }, 5 * 60 * 1000); // 5 minuta
})
.catch((err) => console.error('MongoDB connection error:', err));

// Admin korisnik (dummy primer)
const adminUser = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2a$10$/b7PjSwdI6GmV9mYJYvYFe6gy8OKbW.KkPldB.F0lRqW8qJ4D3p1W', // Primer hash
};

// LOGIN ruta
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== adminUser.username) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  try {
    const match = await bcrypt.compare(password, adminUser.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware za proveru tokena
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// CONTENT ROUTES
app.use('/api/contents', contentRoutes);

// Test ruta (nije obavezno, ali korisno)
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/banner', bannerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
