// Greitas testas: tikrina, kad routes ir model įsikrauna be klaidų,
// ir kad visi penki CRUD endpointai (POST, GET all, GET one, PUT, DELETE) užregistruoti.
// Paleidimas: npm test  (nereikia MongoDB)
const express = require('express');
const router = require('./routes/reservations');
const Reservation = require('./models/Reservation');

// Surenkam visus užregistruotus maršrutus
const routes = router.stack
  .filter((l) => l.route)
  .map((l) => ({ path: l.route.path, methods: Object.keys(l.route.methods) }));

console.log('Užregistruoti maršrutai:');
routes.forEach((r) => console.log('  ', r.methods.join(',').toUpperCase(), r.path));

const wanted = [
  { path: '/',    method: 'post' },
  { path: '/',    method: 'get'  },
  { path: '/:id', method: 'get'  },
  { path: '/:id', method: 'put'  },
  { path: '/:id', method: 'delete' },
];

const missing = wanted.filter(
  (w) => !routes.some((r) => r.path === w.path && r.methods.includes(w.method))
);

if (missing.length) {
  console.error('❌ Trūksta maršrutų:', missing);
  process.exit(1);
}

console.log('\nReservation modelio laukai:', Object.keys(Reservation.schema.paths).join(', '));
console.log('\n✅ Visi 5 CRUD maršrutai užregistruoti, modelis krautas teisingai.');
