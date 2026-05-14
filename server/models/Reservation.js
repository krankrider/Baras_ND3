// Reservation modelis - Mongoose schema staliuko rezervacijai
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    vardas:    { type: String, required: true, trim: true },
    elPastas:  { type: String, required: true, trim: true, lowercase: true },
    data:      { type: Date,   required: true },
    zmoniuSk:  { type: Number, required: true, min: 1, max: 20 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
