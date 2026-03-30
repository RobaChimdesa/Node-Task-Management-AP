// // src/config/swagger.ts
// import swaggerJsdoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Task Management API',
//       version: '1.0.0',
//       description: 'A production-grade Task Management REST API built with Node.js, Express, TypeScript, and Prisma.',
//       contact: {
//         name: 'Roba',
//         email: 'your.email@example.com',
//       },
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//         description: 'Development server',
//       },
//       {
//         url: 'https://your-app-name.up.railway.app',
//         description: 'Production server',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         BearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//           description: 'Enter your JWT token (without "Bearer " prefix)',
//         },
//       },
//     },
//     security: [{ BearerAuth: [] }],
//   },
//   apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to files with JSDoc comments
// };

// const specs = swaggerJsdoc(options);

// export default specs;

import swaggerJsdoc from 'swagger-jsdoc';
// import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Capstone REST API',
      version: '1.0.0',
      description: 'API documentation for the Task Management Capstone Project',
    },
    servers: [
      {
        url: '/',
        description: 'Auto-detected server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);