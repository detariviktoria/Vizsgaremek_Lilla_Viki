const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AjándékAjánló API',
      version: '1.0.0',
      description: 'Ajándékajánló rendszer vizsgaremek API dokumentációja',
      contact: {
        name: 'Viktória és Lilla',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Fejlesztői szerver',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      }
    }
  },
  // Hol keresse a JSDoc kommenteket (az összes útvonal és modell fájlban)
  apis: ['./api/routes/*.js', './api/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
