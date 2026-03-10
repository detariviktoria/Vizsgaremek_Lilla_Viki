const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const db = require("./config/db");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Vizsgaremek API',
      version: '1.0.0',
      description: 'Ajándék ötletelő alkalmazás API dokumentációja',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "../Web")));

// Képek mappa statikus kiszolgálása

app.use('/images', express.static(path.join(__dirname, "../Képek")));

app.use('/Képek', express.static(path.join(__dirname, "../Képek")));







// Route-ok importálása
const userRoutes = require("./api/routes/userRoutes");
const alkalomRoutes = require("./api/routes/alkalomRoutes");
const stilusRoutes = require("./api/routes/stilusRoutes");
const celcsoportRoutes = require("./api/routes/celcsoportRoutes");

// const gyujtemenyRoutes = require("./api/routes/gyujtemenyRoutes");

const kategoriaRoutes = require("./api/routes/kategoriaRoutes");


const elozmenyekRoutes = require("./api/routes/elozmenyekRoutes");

const kedvencekRoutes = require("./api/routes/kedvencekRoutes");



const ajandekRoutes = require("./api/routes/ajandekRoutes");



const uploadRoutes = require("./api/routes/uploadRoutes");

const inviteRoutes = require("./api/routes/inviteRoutes");

const chatRoutes = require('./api/routes/chat');

const notificationRoutes = require("./api/routes/notificationRoutes");



// Route-ok regisztrálása

app.use("/users", userRoutes);

app.use("/invite", inviteRoutes);

app.use("/alkalmak", alkalomRoutes);

app.use("/stilusok", stilusRoutes);

app.use("/celcsoportok", celcsoportRoutes);



// app.use("/gyujtemenyek", gyujtemenyRoutes);



app.use("/kategoriak", kategoriaRoutes);




app.use("/elozmenyek", elozmenyekRoutes);

app.use("/kedvencek", kedvencekRoutes);



app.use("/ajandekok", ajandekRoutes);

app.use("/upload", uploadRoutes);

app.use("/chat", chatRoutes);

app.use("/notifications", notificationRoutes);

// Minden egyéb kérést irányítsunk egy egyszerű üzenetre (mivel a frontend külön fut)

app.get("/", (req, res) => {
  res.send("<h1>Fut a szerver</h1>");
});

// SPA támogatás törölve, ha nem API hívás, akkor 404
app.use((req, res, next) => {
  const allowedPaths = [
    '/api', '/users', '/ajandekok', '/chat', '/invite', '/alkalmak', 
    '/stilusok', '/celcsoportok', '/kategoriak', '/elozmenyek', 
    '/kedvencek', '/upload', '/images', '/Képek', '/notifications'
  ];
  
  if (allowedPaths.some(path => req.path.startsWith(path))) {
    return next();
  }
  res.status(404).json({ error: "Not Found", message: "Az API végpont nem található." });
});



// Hiba kezelő middleware

const errorHandler = require("./api/middlewares/errorHandler");

app.use(errorHandler);



module.exports = app;