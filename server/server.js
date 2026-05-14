// Express serveris - prijungia MongoDB ir paleidžia API
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const reservationsRouter = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kokteiliu_maisykla';

app.use(cors());
app.use(express.json());

// API maršrutai
app.use('/api/reservations', reservationsRouter);

// Sveikatos patikrinimas
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// MongoDB prijungimas + serverio paleidimas
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Prijungta prie MongoDB:', MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Serveris paleistas: http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB klaida:', err.message);
    process.exit(1);
  });
