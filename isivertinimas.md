# Rokas Bubinas

## TREČIOJO NAMŲ DARBO (ND3) TEMA: Web aplikacija

### Įsivertinimas

| DB | Prijungimas | Naudotojo aplikacija | CRUD operacijos |   |   |   | MERN modelio įgyvendinimas | Kodo kokybė | Aprašymas |
|----|-------------|----------------------|------|------|------|------|----------------------------|-------------|-----------|
| 3  | 2           | 3                    | 2    | 2    | 2    | 2    | 2                          | 2           | 2         |

**Grupavimas:** 6 + 7–8 + 9–10 = **22 / 22**

---

### Komentarai

- **Duomenų bazė (3 t.):** Sukurta MongoDB dokumentinė duomenų bazė `kokteiliu_maisykla` su `reservations` kolekcija. Schema apibrėžta Mongoose pagalba (`server/models/Reservation.js`).

- **Prijungimas (2 t.):** Express backend (`server/server.js`) jungiasi prie MongoDB per `mongoose.connect()`. Prisijungimo eilutė konfigūruojama per `.env` failą (`MONGO_URI`).

- **Naudotojo aplikacija (3 t.):** Dvi naudotojo sąsajos:
  - Statinė svetainė `site/kontaktai.html` — viešas rezervacijos formos puslapis (Create operacija).
  - React admin panelė `client/src/App.jsx` — pilna CRUD valdymo sąsaja.

- **CRUD operacijos (2+2+2+2 t.):**
  - **Create:** `POST /api/reservations`, `routes/reservations.js` eil. 8–14. Forma `site/kontaktai.html` ir `client/src/components/ReservationForm.jsx`.
  - **Read:** `GET /api/reservations` (visi) ir `GET /api/reservations/:id` (vienas), `routes/reservations.js` eil. 17–33. Atvaizduojama `client/src/components/ReservationList.jsx`.
  - **Update:** `PUT /api/reservations/:id`, `routes/reservations.js` eil. 36–46. Naudojama redagavimo režime `App.jsx`.
  - **Delete:** `DELETE /api/reservations/:id`, `routes/reservations.js` eil. 49–57. Mygtukas `ReservationList.jsx`.

- **MERN modelio įgyvendinimas (2 t.):** Naudojami visi keturi komponentai — MongoDB (DB), Express (backend), React (frontend), Node.js (runtime). Frontend per Vite proxy komunikuoja su backend per `/api/*` maršrutus.

- **Kodo kokybė (2 t.):** Aiškus aplankų atskyrimas (server/client/site), MVC-tipo struktūra serverio pusėje (models/routes), komponentų atskyrimas frontend'e (ReservationForm, ReservationList), klaidų valdymas su try/catch, validacija Mongoose schemoje.

- **Aprašymas (2 t.):** `readme.md` faile pateiktos paleidimo instrukcijos, aplankų struktūra, API maršrutų lentelė, duomenų modelis ir testavimo pavyzdžiai su `curl`.

**Viso surinkta taškų: 22 iš 22.**
