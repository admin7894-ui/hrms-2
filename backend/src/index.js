require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Updated CORS (allow all localhost ports)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (origin.startsWith('http://localhost')) {
      return callback(null, true);
    }

    if (origin === process.env.CLIENT_URL) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.get('/', (req, res) => {
  res.send('HRMS Backend is running 🚀');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 HRMS API running on http://localhost:${PORT}`);
});

module.exports = app;