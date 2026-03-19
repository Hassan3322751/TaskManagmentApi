require('dotenv').config();   // ← must be first line

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const seedRoutes = require('./routes/seed');

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:3000", "https://effulgent-cocada-0c0313.netlify.app/"],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/seed', seedRoutes)

app.get('/', (req, res) => res.json({ message: 'Task Manager API' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = 8080;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
