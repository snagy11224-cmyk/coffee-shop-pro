import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, json, errors } = winston.format;

const transportConsole = new winston.transports.Console({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

const transportFile = new winston.transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxFiles: "14d",
  level: "info",
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json() // structured JSON (سهل للبحث والتجميع)
  ),
  transports: [transportConsole, transportFile],
});

export default logger;
