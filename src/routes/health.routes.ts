import { Router, Request, Response } from "express";
import { pool } from "../config/db";

const router = Router();

// Liveness: app chalu che ke nahi
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Readiness: DB connection pan check kare
router.get("/health/db", async (_req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

export default router;