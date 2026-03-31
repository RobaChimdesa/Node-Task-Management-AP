"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/sentry"); // Initialize Sentry first
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = require("./config/logger");
const swagger_1 = require("./config/swagger");
const Sentry = __importStar(require("@sentry/node"));
const app = (0, express_1.default)();
const auth_routes_1 = require("./routes/auth.routes");
const category_routes_1 = require("./routes/category.routes");
const task_routes_1 = require("./routes/task.routes");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, pino_http_1.default)({ logger: logger_1.logger }));
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Task Management API',
        version: '1.0.0',
        documentation: '/api-docs',
        health: '/health'
    });
});
app.get('/debug-sentry', (req, res) => {
    throw new Error('Sentry Debug Error');
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Mount routes
app.use('/api/v1/auth', auth_routes_1.authRoutes);
app.use('/api/v1/tasks', task_routes_1.taskRoutes);
app.use('/api/v1/categories', category_routes_1.categoryRoutes);
const notFound_1 = require("./middleware/notFound");
const errorHandler_1 = require("./middleware/errorHandler");
app.use(notFound_1.notFoundHandler);
// The Sentry error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler_1.errorHandler);
exports.default = app;
