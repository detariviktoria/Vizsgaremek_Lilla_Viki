# AjándékAjánló - Vizsgaremek

Ez a projekt egy komplex ajándékajánló rendszer, amely segít a felhasználóknak megtalálni a tökéletes ajándékot különböző alkalmakra, stílusok és célcsoportok alapján.

## Projekt felépítése

- **Api/**: Node.js/Express alapú REST API, Sequelize ORM-mel és MySQL adatbázissal.
- **my-react-app/**: Modern React (Vite + TypeScript) frontend alkalmazás.
- **Project/VizsgaAdminWpf/**: C# .NET WPF alapú asztali adminisztrációs felület.
- **Képek/**: A projekthez használt médiaforrások.

## Főbb funkciók

- Felhasználói regisztráció és bejelentkezés (JWT + Cookie auth).
- Ajándékok böngészése és szűrése (ár, alkalom, stílus, célcsoport).
- Kedvencek és böngészési előzmények mentése.
- Meghívó rendszer: hívj meg barátokat és szerezz kuponokat!
- Valós idejű Chat (Socket.io) a felhasználók között.
- Admin felület (WPF) az ajándékok és felhasználók kezeléséhez.

## Telepítés és beállítás

### Előfeltételek
- Node.js (v18+)
- MySQL szerver

### Backend beállítása (Api)
1. Lépj be az `Api` mappába: `cd Api`
2. Telepítsd a függőségeket: `npm install`
3. Hozz létre egy `.env` fájlt az alábbi tartalommal:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=ajandekajanlo
   JWT_SECRET=titkos_kulcs
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:5173
   ```
4. Indítsd el a szervert: `npm run dev` (vagy `npm start`)

### Frontend beállítása (React)
1. Lépj be a `my-react-app` mappába: `cd my-react-app`
2. Telepítsd a függőségeket: `npm install`
3. Indítsd el a fejlesztői szervert: `npm run dev`
4. Nyisd meg a böngészőben: `http://localhost:5173`

### Asztali alkalmazás (WPF)
1. Nyisd meg a `Project/VizsgaAdminWpf/VizsgaAdminWpf.sln` fájlt Visual Studio-ban.
2. Győződj meg róla, hogy a Backend fut.
3. Indítsd el a projektet (F5).

## Tesztelés
- Backend tesztek: `cd Api && npm test`
- WPF tesztek: Futtasd a teszteket a Visual Studio Test Explorer-ben.

## Felhasznált technológiák
- **Backend**: Node.js, Express, Sequelize, MySQL, JWT, Nodemailer, Socket.io, Jest.
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router.
- **Desktop**: C# .NET, WPF, HttpClient.

---
🤖 Készült a vizsgaremek követelményei alapján.
