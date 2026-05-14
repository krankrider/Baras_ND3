// CRUD maršrutai rezervacijoms
const express = require('express');
const Reservation = require('../models/Reservation');

const router = express.Router();

// CREATE - sukurti naują rezervaciją
router.post('/', async (req, res) => {
  try {
    const r = await Reservation.create(req.body);
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL - gauti visas rezervacijas
router.get('/', async (_req, res) => {
  try {
    const list = await Reservation.find().sort({ data: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE - gauti vieną rezervaciją pagal ID
router.get('/:id', async (req, res) => {
  try {
    const r = await Reservation.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Rezervacija nerasta' });
    res.json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE - atnaujinti esamą rezervaciją
router.put('/:id', async (req, res) => {
  try {
    const r = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!r) return res.status(404).json({ error: 'Rezervacija nerasta' });
    res.json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - ištrinti rezervaciją
router.delete('/:id', async (req, res) => {
  try {
    const r = await Reservation.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: 'Rezervacija nerasta' });
    res.json({ message: 'Ištrinta', id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
