// Writes api/context.json (served by api/context.ts) from the chatbot's single source of truth,
// so the debug endpoint and the chatbot always describe the same profile.
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { PROFILE_CONTEXT } from "../shared/profile-context";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildContext() {
  const outputPath = path.join(__dirname, "..", "api", "context.json");
  try {
    await fs.writeFile(outputPath, JSON.stringify({ context: PROFILE_CONTEXT }, null, 2), "utf-8");
    console.log("Context built:", outputPath);
  } catch (error) {
    console.error("Error building context:", error);
    process.exit(1);
  }
}

buildContext();
