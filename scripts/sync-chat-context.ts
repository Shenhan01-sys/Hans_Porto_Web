// Copies shared/profile-context.ts next to each Vercel function, because a function may not be
// able to import files outside its deploy root. Runs in `prebuild`; run it by hand after editing:
//   npx tsx scripts/sync-chat-context.ts
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "shared", "profile-context.ts");
const targets = [path.join(root, "api", "_profile-context.ts"), path.join(root, "client", "api", "_profile-context.ts")];

const body = await fs.readFile(source, "utf-8");
const header = "// GENERATED from shared/profile-context.ts by scripts/sync-chat-context.ts. Do not edit here.\n";

for (const target of targets) {
  await fs.writeFile(target, header + body, "utf-8");
  console.log("synced", path.relative(root, target));
}
