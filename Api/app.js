const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const db = require("./config/db");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vizsgaremek API dokumentáció',
      version: '1.0.3',
      description: 'Ajándék ötletelő alkalmazás API dokumentációja',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Viktória' },
            email: { type: 'string', example: 'viktoria@mail.com' },
            is_admin: { type: 'boolean', example: false }
          }
        },
        Ajandek: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nev: { type: 'string', example: 'Vidám bögre' },
            leiras: { type: 'string', example: 'Vidám bögre leírása' },
            ar: { type: 'integer', example: 1500 },
            kategoria: { type: 'string', example: 'tárgy' },
            image_url: { type: 'string', example: 'vidambogre.jpg' },
            link_url: { type: 'string', example: 'https://bogrevaros.hu/Vidam-napot-bogre' }
          }
        },
        Meghivo: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            kuldo_id: { type: 'integer', example: 1 },
            meghivott_id: { type: 'integer', example: 2 },
            email: { type: 'string', example: 'barat@mail.com' },
            kupon_kod: { type: 'string', example: 'GIFT-ABC123' },
            elfogadva: { type: 'boolean', example: true }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// CORS és JSON parser middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Képek mappa statikus kiszolgálása
app.use('/images', express.static(path.join(__dirname, "../Képek")));
app.use('/Képek', express.static(path.join(__dirname, "../Képek")));

// Route-ok importálása
const userRoutes = require("./api/routes/userRoutes");
const alkalomRoutes = require("./api/routes/alkalomRoutes");
const stilusRoutes = require("./api/routes/stilusRoutes");
const celcsoportRoutes = require("./api/routes/celcsoportRoutes");
const kategoriaRoutes = require("./api/routes/kategoriaRoutes");
const elozmenyekRoutes = require("./api/routes/elozmenyekRoutes");
const kedvencekRoutes = require("./api/routes/kedvencekRoutes");
const ajandekRoutes = require("./api/routes/ajandekRoutes");
const uploadRoutes = require("./api/routes/uploadRoutes");
const inviteRoutes = require("./api/routes/inviteRoutes");
const chatRoutes = require('./api/routes/chat');
const notificationRoutes = require('./api/routes/notificationRoutes');
const couponRoutes = require('./api/routes/couponRoutes');

// Route-ok regisztrálása
app.use("/users", userRoutes);
app.use("/invite", inviteRoutes);
app.use("/alkalmak", alkalomRoutes);
app.use("/stilusok", stilusRoutes);
app.use("/celcsoportok", celcsoportRoutes);
app.use("/kategoriak", kategoriaRoutes);
app.use("/elozmenyek", elozmenyekRoutes);
app.use("/kedvencek", kedvencekRoutes);
app.use("/ajandekok", ajandekRoutes);
app.use("/upload", uploadRoutes);
app.use("/chat", chatRoutes);
app.use("/notifications", notificationRoutes);
app.use("/coupons", couponRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Fut a szerver</h1><p>API dokumentáció: <a href='/api-docs'>/api-docs</a></p>");
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/users') || req.path.startsWith('/ajandekok') || req.path.startsWith('/chat')) {
    return next();
  }
  res.status(404).json({ error: "Not Found", message: "Az API végpont nem található." });
});

const errorHandler = require("./api/middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
