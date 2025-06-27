const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'REST API for user authentication using JWT',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // scan this folder for documentation comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
