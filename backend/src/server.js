// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { PORT = 5000, MONGO_URI, CLIENT_ORIGIN } = process.env;

const app = express();

// CORS configuration – allow requests from your frontend
app.use(cors({
  origin: CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // for legacy browsers that fail on 204
}));

// Parse JSON requests
app.use(express.json({ limit: '1mb' }));

// Health check endpoint
app.get('/health', (_req, res) => res.json({ ok: true }));

// Authentication and invoice routes
app.use('/auth', require('./routes/auth'));
app.use('/invoices', require('./routes/invoices'));

// Connect to database and start the server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('API listening on port', PORT));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
