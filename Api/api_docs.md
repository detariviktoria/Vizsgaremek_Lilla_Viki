# API Dokumentáció - AjándékAjánló

A backend a `http://localhost:3000` címen érhető el.

## Hitelesítés (Authentication)
A legtöbb végpont JWT-alapú hitelesítést igényel, amely HTTP-only cookie-ban (`token`) tárolódik.

---

## Felhasználók (Users)

### Regisztráció
`POST /api/users`
- Body: `{ name, email, password, ajanlo_id? }`
- Response: `201 Created`

### Bejelentkezés
`POST /api/users/login`
- Body: `{ username, password }`
- Response: `200 OK` (beállítja a cookie-t)

### Session ellenőrzés
`GET /api/users/check/session`
- Response: `200 OK` + felhasználói adatok

---

## Ajándékok (Gifts)

### Összes lekérése
`GET /api/ajandekok`
- Response: Ajándékok listája

### Szűrés alkalom szerint
`GET /api/ajandekok/alkalom/:alkalomNev`

### Szűrés stílus szerint
`GET /api/ajandekok/stilus/:stilusNev`

### Új ajándék (Admin csak!)
`POST /api/ajandekok`
- Auth: Bejelentkezve + Admin szerepkör

---

## Kedvencek (Favorites)

### Lekérés
`GET /api/kedvencek/:userId`
- Auth: Bejelentkezve

### Hozzáadás
`POST /api/kedvencek/:userId`
- Body: `{ ajandek_id }`

---

## Meghívók és Kuponok

### Meghívó küldése
`POST /api/invite`
- Body: `{ email, userId }`

---

## Chat

### Üzenetküldés
`POST /api/chat/send`
- Body: `{ from_user_id, to_user_id, message }`
