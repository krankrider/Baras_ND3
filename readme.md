# ND3 - Kokteilių Maišykla (MERN)

**Autorius:** Rokas Bubinas
**Modulis:** Interneto technologijos
**Tema:** Web aplikacija su CRUD operacijomis.

Išplečiamas ND2 statinis tinklapis su MERN: statiniame puslapyje galima sukurti staliuko rezervaciją. Atskira React administratoriaus panelė leidžia atlikti CRUD operacijas.

---

## Nuorodos (vertinimui)

| Dalis | Technologija | Nuoroda |
|-------|--------------|---------|
| Statinis tinklapis (ND2) | HTML/CSS/JS (Vercel) | <https://baras-nd-3-qz9t.vercel.app/> |
| Administratoriaus panelė (CRUD) | React + Vite (Vercel) | <https://baras-nd-3.vercel.app/> |
| Backend API | Node.js + Express (Render) | <https://baras-nd3.onrender.com/api/health> |
| Duomenų bazė | MongoDB Atlas (cloud) | privati |

> Visi trys deploymentai aktyvūs ir sujungti. Statiniame puslapyje (`kontaktai.html`) galima sukurti rezervaciją, ji atsiranda administratoriaus panelėje.

---

## Aplankų struktūra

```
ND3_RokasB/
├── site/                 # ND2 statinis tinklapis (HTML/CSS/JS)
│   ├── index.html, meniu.html, galerija.html, kontaktai.html, apie.html
│   ├── css/  js/  img/
│
├── server/               # Backend (Express + Mongoose)
│   ├── server.js                  # Express + Mongo prisijungimas
│   ├── models/Reservation.js      # Mongoose schema
│   ├── routes/reservations.js     # CRUD maršrutai
│   └── test-routes.js             # maršrutų testas iki database
│
├── client/               # Frontend (React + Vite)
│   └── src/
│       ├── App.jsx                # Pagrindinis komponentas
│       ├── api.js                 # fetch API klientas
│       └── components/
│           ├── ReservationForm.jsx   # Create + Update forma
│           └── ReservationList.jsx   # Sąrašas + Delete
│
├── isivertinimas.md
└── readme.md
```

---

## Įgyvendintos užduoties dalys

**1. MongoDB duomenų bazė** - Atlas klasteryje sukurta `kokteiliu_maisykla` DB, `reservations` kolekcija. Schema apibrėžta per Mongoose (`server/models/Reservation.js`).

**2. Backend (Node.js + Express)** - `server/server.js` jungiasi prie MongoDB per `mongoose.connect()`, paleidžia Express serverį, registruoja `/api/reservations` maršrutus.

**3. CRUD operacijos** - visos keturios atskirose funkcijose, faile `server/routes/reservations.js`.

**4. React frontend** - `client/src/App.jsx` valdo būseną, naudoja `fetch` (`client/src/api.js`) duomenų užklausoms. Yra atskira forma (kūrimui ir redagavimui), sąrašas, ištrynimo mygtukas.
---

## API maršrutai

Base URL: `https://baras-nd3.onrender.com`

| Metodas  | Maršrutas                  | Operacija | Aprašymas                  |
|----------|----------------------------|-----------|----------------------------|
| `POST`   | `/api/reservations`        | Create    | Sukurti naują rezervaciją  |
| `GET`    | `/api/reservations`        | Read all  | Gauti visas rezervacijas   |
| `GET`    | `/api/reservations/:id`    | Read one  | Gauti vieną pagal ID       |
| `PUT`    | `/api/reservations/:id`    | Update    | Atnaujinti rezervaciją     |
| `DELETE` | `/api/reservations/:id`    | Delete    | Ištrinti rezervaciją       |
| `GET`    | `/api/health`              | -         | Serverio būsenos patikrinimas |

---

## Duomenų modelis (`Reservation`)

| Laukas    | Tipas   | Privalomas | Validacija            |
|-----------|---------|------------|-----------------------|
| vardas    | String  | taip       | trim                  |
| elPastas  | String  | taip       | trim, lowercase       |
| data      | Date    | taip       | -                     |
| zmoniuSk  | Number  | taip       | 1–20                  |
| createdAt | Date    | auto       | Mongoose timestamps   |
| updatedAt | Date    | auto       | Mongoose timestamps   |

---

## Testavimui

1. Atidaryti statinį puslapį <https://baras-nd-3-qz9t.vercel.app/> → eiti į **Rezervacija** → užpildyti rezervacijos formą → **Rezervuoti**.
2. Atidaryti administratoriaus panelę <https://baras-nd-3.vercel.app/> → naujas įrašas turi būti sąraše.
3. Panelėje galima:
   - sukurti rezervaciją per formą (Create);
   - peržiūrėti visas (Read);
   - paspausti **Redaguoti** ir išsaugoti pakeitimus (Update);
   - paspausti **Ištrinti** (Delete).

> Pirmasis API užklausimas gali užtrukti 30–60 s.

---

## Stack'as

- **MongoDB Atlas** - dokumentinė DB cloud'e
- **Mongoose** - schemos ir validacija
- **Express** - REST API
- **Node.js** - runtime
- **React 18 + Vite** - frontend
- **Fetch API** - klientas → serveris

Deployment: Render (backendui), Vercel (du atskiri projektai - statinis ir React).
