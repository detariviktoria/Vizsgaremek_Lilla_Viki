# Vizsgaremek – AjándékAjánló

Valós problémára készült web + backend + admin kliens alkalmazás: ajándék ötletek böngészése/szűrése, kedvencek, előzmények, meghívásos rendszer (kupon), chat és értesítések.

## Technológiai stack
- **Backend**: Node.js + Express + Sequelize (ORM) + MySQL
- **API Dokumentáció**: Swagger / OpenAPI 3.0 (`/api-docs`)
- **Valós idejű kommunikáció**: Socket.IO (Chat és értesítések)
- **Web kliens**: React 18 + TypeScript + Vite + Tailwind CSS
- **Asztali admin**: WPF (.NET 8) + MVVM minta
- **Tesztek**: Jest + Supertest (Backend), MSTest (WPF)

## Előfeltételek
- Node.js (v18+)
- MySQL szerver
- .NET 8 SDK (a WPF alkalmazáshoz)

## Telepítés és indítás

### 1. Backend beállítása
1. Lépj be az `Api` mappába: `cd Api`
2. Telepítsd a függőségeket: `npm install`
3. Másold le az env mintát: `cp .env.example .env` (Windows-on: `copy .env.example .env`)
4. Szerkeszd a `.env` fájlt: add meg a MySQL hozzáférést és a JWT titkot.
5. Adatbázis inicializálása:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
6. Indítás: `npm run start` (vagy `npm run dev` fejlesztéshez)
   - API elérhető: `http://localhost:3000`
   - Swagger dokumentáció: `http://localhost:3000/api-docs`

### 2. Webes kliens indítása
1. Lépj be a `my-react-app` mappába: `cd my-react-app`
2. Telepítsd a függőségeket: `npm install`
3. Indítás: `npm run dev`
   - Elérhető: `http://localhost:5173`

### 3. WPF Admin kliens indítása
1. Nyisd meg a `Project/VizsgaAdminWpf/VizsgaAdminWpf.sln` fájlt Visual Studio-ban.
2. Állítsd be a `VizsgaAdminWpf` projektet indító projektnek.
3. Futtatás (F5).

## Fő funkciók (How-To)
- **Regisztráció**: Új fiók létrehozása. Ha meghívó linkkel érkezel (`?ref=ID`), automatikusan kupont kapsz.
- **Ajándékkereső**: Szűrés alkalom (pl. Karácsony), stílus (pl. Modern) vagy célcsoport (pl. Férfiak) szerint.
- **Admin felület**: Az asztali alkalmazásban az adminok kezelhetik az ajándékokat (CRUD) és a felhasználókat.
- **Chat**: Bejelentkezett felhasználók valós időben beszélgethetnek.

## Tesztelés
- **Backend**: `cd Api && npm test`
- **WPF**: Visual Studio -> Test Explorer -> Run All Tests

