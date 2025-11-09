import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";
import logger from "./logger.js";

logger.info({ msg: "Server started" });
logger.debug({ msg: "Something happened", meta: { x: 1 } });


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// (1) Request ID middleware عشان تربط كل لوجات الريكوست ببعض
app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || uuidv4();
  res.setHeader("X-Request-Id", req.id);
  next();
});

// (2) morgan → يكتب ملخص كل ريكوست جوه winston
morgan.token("id", (req) => req.id);
app.use(
  morgan(
    (tokens, req, res) =>
      JSON.stringify({
        level: "http",
        reqId: tokens.id(req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number(tokens.status(req, res)),
        contentLength: tokens.res(req, res, "content-length"),
        responseTimeMs: Number(tokens["response-time"](req, res)),
        userAgent: tokens.req(req, res, "user-agent"),
      }),
    {
      stream: {
        write: (message) => {
          try {
            const data = JSON.parse(message);
            logger.info(data); // يطلع JSON مرتب
          } catch {
            logger.info({ message: message.trim() });
          }
        },
      },
    }
  )
);

// ====== اتصال DB + Routes (نفس بتاعك) ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info({ msg: "MongoDB Connected" }))
  .catch((err) => logger.error({ msg: "Mongo Error", err }));

app.post("/api/contact", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ ok: false, msg: "Missing fields" });

    // مثال حفظ … (لو عامل موديل Contact)
    // const contact = new Contact({ name, email, message });
    // await contact.save();

    logger.info({
      msg: "Contact received",
      reqId: req.id,
      payloadPreview: { name, emailLength: email.length, messageLen: message.length },
    });

    return res.json({ ok: true });
  } catch (err) {
    next(err); // يروح لميدلوير الأخطاء
  }
});

// (3) Error handler — يسجل الأخطاء بمستوى error ويُخفي التفاصيل عن العميل
app.use((err, req, res, next) => {
  logger.error({
    msg: err.message,
    reqId: req.id,
    stack: err.stack,
    path: req.path,
  });
  res.status(500).json({ ok: false, msg: "Internal Server Error", reqId: req.id });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info({ msg: `API running on http://localhost:${PORT}` }));
