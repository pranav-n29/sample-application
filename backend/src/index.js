import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");
const hasFrontendBuild = fs.existsSync(frontendIndexPath);

app.use(helmet());
app.use(express.json({ limit: "256kb" }));
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  })
);

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));
}

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/message", (_req, res) => {
  res.status(200).json({
    message: "Backend is live and optimized.",
  });
});

app.get("/", (_req, res) => {
  if (hasFrontendBuild) {
    res.sendFile(frontendIndexPath);
    return;
  }

  res.status(200).send(
    "<main style=\"font-family:sans-serif;padding:2rem\"><h1>Lab13 API</h1><p>The frontend has not been built yet.</p><p>Try <a href=\"/api/health\">/api/health</a></p></main>"
  );
});

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    next();
    return;
  }

  if (hasFrontendBuild) {
    res.sendFile(frontendIndexPath);
    return;
  }

  next();
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(env.PORT, () => {
  console.log(`API listening on port ${env.PORT}`);
});
