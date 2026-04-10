"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const allowedOrigins_1 = require("./config/allowedOrigins");
const errorHandler_1 = require("./errors/errorHandler");
const module_1 = __importDefault(require("./module"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
console.log(process.env.DATABASE_URL);
app.use((0, cors_1.default)({
    origin: allowedOrigins_1.allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
// app.use(morgan("combined"));
app.use((0, morgan_1.default)("tiny"));
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express_1.default.json());
app.get("/", (req, res) => res.redirect("/api-docs"));
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
(0, swagger_1.setupSwagger)(app);
(0, module_1.default)(app);
app.use(errorHandler_1.errorHandler);
// const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map