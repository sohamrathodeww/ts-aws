import app from "./app";
import { env } from "./config/env";
import { pool } from "./config/db";

const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
});

const shutdown = async () => {
  console.log("Shutting down...");
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);