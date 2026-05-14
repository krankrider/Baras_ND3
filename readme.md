# ND3 — Kokteilių Maišykla (MERN)

Trečiojo namų darbo projektas. Išplečia ND2 statinį tinklapį pilna MERN aplikacija:
**MongoDB + Express + React + Node.js** su CRUD operacijomis staliuko rezervacijoms.

## Peržiūra

| Dalis | URL |
|-------|-----|
| Statinis tinklapis (ND2) | `https://<jūsų-vercel-projektas>.vercel.app` |
| React admin panelė (CRUD) | `https://<jūsų-vercel-projektas>.vercel.app` |
| Backend API | `https://<jūsų-render-servisas>.onrender.com/api/health` |

> Pakeiskite nuorodas į tikras po pirmojo deploy.

## Aplankų struktūra

```
ND3_RokasB/
├── site/        # ND2 statinis tinklapis (HTML/CSS/JS)
├── server/      # Express + Mongoose backend
│   ├── server.js
│   ├── models/Reservation.js
│   └── routes/reservations.js
├── client/      # React + Vite admin panelė (CRUD)
│   └── src/{App.jsx, api.js, components/}
├── readme.md
└── isivertinimas.md
```

---

## Deployment (GitHub → Render + Vercel)

Visi trys žingsniai atliekami vieną kartą. Po to pakeitimai pasklinda automatiškai per `git push`.

### 1. MongoDB Atlas (duomenų bazė)

1. Sukurkite nemokamą paskyrą: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sukurkite **Free (M0)** klasterį bet kuriame regione.
3. **Database Access** → pridėkite vartotoją su slaptažodžiu.
4. **Network Access** → pridėkite `0.0.0.0/0` (leidžia prisijungti iš Render).
5. **Connect → Drivers** → nukopijuokite connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/kokteiliu_maisykla
   ```

### 2. GitHub

```bash
# Repo šaknyje (ND3_RokasB/)
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<jūsų-vartotojas>/<repo-pavadinimas>.git
git push -u origin main
```

> Jei `node_modules` dar yra aplankuose — ištrinkite prieš push:
> ```bash
> rm -rf server/node_modules client/node_modules
> ```

### 3. Render (backend API)

1. Eikite į [render.com](https://render.com) → **New → Web Service**.
2. Prijunkite GitHub repo.
3. Nustatymai:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Environment Variables** → pridėkite:
   | Kintamasis | Reikšmė |
   |------------|---------|
   | `MONGO_URI` | jūsų Atlas connection string |
   | `PORT` | `5050` |
5. Spauskite **Deploy**. Kai bus žalia — nukopijuokite Render URL (pvz. `https://kokteiliu-api.onrender.com`).

### 4. Vercel (React klientas)

1. Eikite į [vercel.com](https://vercel.com) → **New Project** → importuokite GitHub repo.
2. Nustatymai:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (aptinkama automatiškai)
3. **Environment Variables** → pridėkite:
   | Kintamasis | Reikšmė |
   |------------|---------|
   | `VITE_API_URL` | Render URL iš 3 žingsnio (pvz. `https://kokteiliu-api.onrender.com`) |
4. Spauskite **Deploy**.

### 5. Atnaujinkite URL statiniame tinklapyje

`site/js/script.js` faile pakeiskite:
```js
// Buvo:
const API_URL = 'http://localhost:5050/api/reservations';

// Pakeiskite į:
const API_URL = 'https://<jūsų-render-servisas>.onrender.com/api/reservations';
```

Taip pat `site/kontaktai.html` atnaujinkite admin panelės nuorodą į Vercel URL.

Po pakeitimo:
```bash
git add .
git commit -m "update production URLs"
git push
```

---

## API maršrutai

| Metodas  | Maršrutas                  | Aprašymas                    |
|----------|----------------------------|------------------------------|
| `POST`   | `/api/reservations`        | Sukurti rezervaciją (Create) |
| `GET`    | `/api/reservations`        | Gauti visas (Read)           |
| `GET`    | `/api/reservations/:id`    | Gauti vieną (Read)           |
| `PUT`    | `/api/reservations/:id`    | Atnaujinti (Update)          |
| `DELETE` | `/api/reservations/:id`    | Ištrinti (Delete)            |

## Duomenų modelis

`Reservation` kolekcija (MongoDB):

| Laukas    | Tipas   | Privalomas | Pastabos           |
|-----------|---------|------------|--------------------|
| vardas    | String  | taip       | Apkarpomas (trim)  |
| elPastas  | String  | taip       | Mažosios raidės    |
| data      | Date    | taip       | Rezervacijos diena |
| zmoniuSk  | Number  | taip       | 1–20               |
| createdAt | Date    | auto       | timestamps         |
| updatedAt | Date    | auto       | timestamps         |

---

## Lokalus paleidimas

Jei norite paleisti lokaliai:

### Reikalavimai
- Node.js, MongoDB (arba Atlas connection string)

### Backend
```bash
cd server
npm install
cp .env.example .env   # įrašykite MONGO_URI
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Admin panelė: `http://localhost:5173` | API: `http://localhost:5050`

### Maršrutų testas (be MongoDB)
```bash
cd server
npm test
```

---

## Autorius
Rokas Bubinas — 2026
