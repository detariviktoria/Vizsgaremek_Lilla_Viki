const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const db = require("./config/db");
const app = express();

// CORS és JSON parser middleware
app.use(cors({
  origin: (origin, callback) => {
    // Fejlesztés során engedélyezzük a localhost portokat
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // sendBeacon támogatása

// app.use(express.static(path.join(__dirname, "../Web")));

app.use(express.static(path.join(__dirname, "../my-react-app/dist")));



// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Route-ok importálása
const userRoutes = require("./api/routes/userRoutes");
const alkalomRoutes = require("./api/routes/alkalomRoutes");
const stilusRoutes = require("./api/routes/stilusRoutes");
const celcsoportRoutes = require("./api/routes/celcsoportRoutes");
const gyujtemenyRoutes = require("./api/routes/gyujtemenyRoutes");
const kategoriaRoutes = require("./api/routes/kategoriaRoutes");
const kuponRoutes = require("./api/routes/kuponRoutes");
const ajandekRoutes = require("./api/routes/ajandekRoutes");

// Route-ok regisztrálása
app.use("/users", userRoutes);
app.use("/alkalmak", alkalomRoutes);
app.use("/stilusok", stilusRoutes);
app.use("/celcsoportok", celcsoportRoutes);
app.use("/gyujtemenyek", gyujtemenyRoutes);
app.use("/kategoriak", kategoriaRoutes);
app.use("/kuponok", kuponRoutes);
app.use("/ajandekok", ajandekRoutes);

// Minden egyéb kérést irányítsunk az index.html-re (SPA támogatás)

// A path-to-regexp újabb verziói miatt a '*' helyett regexet vagy '/*' formátumot érdemes használni

app.get(/.*/, (req, res) => {

  res.sendFile(path.join(__dirname, "../my-react-app/dist/index.html"));

});



// Hiba kezelő middleware

const errorHandler = require("./api/middlewares/errorHandler");

app.use(errorHandler);



module.exports = app;