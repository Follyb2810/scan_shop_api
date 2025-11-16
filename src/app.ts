import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import loadRoute from "./module";
import { allowedOrigins } from "./config/allowedOrigins";
import { errorHandler } from "./errors/errorHandler";
import path from "path";
const app = express();

console.log(process.env.DATABASE_URL);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
app.use(helmet());
// app.use(morgan("combined"));
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express.json());

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
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// loadRoute(app);

app.use(errorHandler);

// const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
