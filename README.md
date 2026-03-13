# Vizsgaremek – AjándékAjánló

Valós problémára készült web + backend + admin kliens alkalmazás: ajándék ötletek böngészése/szűrése, kedvencek, előzmények, meghívásos rendszer (kupon), chat és értesítések.

## Tech stack
- **Backend**: Node.js + Express + Sequelize + MySQL, Swagger (`/api-docs`), Socket.IO
- **Web kliens**: React + TypeScript + Vite
- **Asztali admin**: WPF (.NET 8)
- **Tesztek**: Jest + Supertest (backend), MSTest/NUnit jellegű teszt projekt (WPF)

## Gyors indítás (fejlesztői)

### 1) Backend (.env)
1. Másold le az env mintát:
   - `Api/.env.example` → `Api/.env`
2. Töltsd ki az értékeket (MySQL + email).

Fontos: **valós jelszót nem commitolunk**. A repóban csak `.env.example` van.

### 2) Adatbázis
MySQL-ben hozz létre egy adatbázist (pl. `vizsgaremek`), majd:

```bash
cd Api
npm install
npm run db:migrate
npm run db:seed
```

Ha mindent újra akarsz húzni:

```bash
cd Api
npm run db:reset
```

### 3) Backend indítás

```bash
cd Api
npm run start
```

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

### 4) Web kliens indítás

```bash
cd my-react-app
npm install
npm run dev
```

Web: `http://localhost:5173`

### 5) WPF Admin indítás
Nyisd meg a megoldást:
- `Project/VizsgaAdminWpf/VizsgaAdminWpf.sln`

Indítsd a `VizsgaAdminWpf` projektet Visual Studio-ból (Target: `net8.0-windows`).

## Fő funkciók (How-To)
- **Regisztráció / bejelentkezés**: a web kliensből (a backend JWT tokent ad és httpOnly cookie-t is beállít a védett végpontokhoz).
- **Jelszó visszaállítás**: “Elfelejtett jelszó” → email link → új jelszó.
- **Meghívás**: barát meghívása emailben → regisztráció `?ref=<id>` paraméterrel → kupon/értesítés létrejön.
- **Kedvencek / előzmények**: bejelentkezés után elérhető.
- **Chat / értesítések**: Socket.IO + REST.

## Tesztek futtatása
Backend:

```bash
cd Api
npm test
```

WPF tesztek:
- `Project/VizsgaAdminWpf/VizsgaAdminWpf.Test` projektből futtatható Visual Studio Test Explorerrel.

