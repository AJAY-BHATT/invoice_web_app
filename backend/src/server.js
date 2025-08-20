// // server.js

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config();

// const { PORT = 5000, MONGO_URI, CLIENT_ORIGIN } = process.env;

// const app = express();

// // CORS configuration – allow requests from your frontend
// app.use(cors({
//   origin: CLIENT_ORIGIN || 'http://localhost:5173',
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200 // for legacy browsers that fail on 204
// }));

// // Parse JSON requests
// app.use(express.json({ limit: '1mb' }));

// // Health check endpoint
// app.get('/health', (_req, res) => res.json({ ok: true }));

// // Authentication and invoice routes
// app.use('/auth', require('./routes/auth'));
// app.use('/invoices', require('./routes/invoices'));

// // Connect to database and start the server
// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log('Mongo connected');
//     app.listen(PORT, () => console.log('API listening on port', PORT));
//   })
//   .catch(err => {
//     console.error('Failed to connect to MongoDB:', err);
//     process.exit(1);
//   });
// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { PORT = 5000, MONGO_URI } = process.env;

const app = express();

// CORS configuration – allow localhost + deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://invoice-project-xdua.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / non-browser
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 200
}));

// Parse JSON
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth routes
const authRouter = express.Router();

// Example /register route
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // For testing, just echo back the data
  res.json({ message: 'Register success', data: { name, email } });
});

app.use('/auth', authRouter);

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('API listening on port', PORT));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
