const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Real-Time Chat API',
        version: '1.0.0',
        description: 'API documentation for the real-time chat application',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    servers: [
        {
            url: 'https://real-time-chat-7ki1.onrender.com/api'
        }, {
            url: 'http://localhost:5000/api',
        },
    ],
    security: [
        {
            bearerAuth: [],
        },
    ],
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./docs/**.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
