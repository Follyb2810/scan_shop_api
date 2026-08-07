import dotenv from "dotenv";

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.DATABASE_PROVIDER = process.env.DATABASE_PROVIDER || "sqlite";
process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
process.env.REDIS_ENABLED = process.env.REDIS_ENABLED || "false";
process.env.LOG_LEVEL = process.env.LOG_LEVEL || "silent";
