import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildContext() {
    const publicDir = path.join(__dirname, "..", "client", "public");
    let context = "# Hans Gunawan - Portfolio Data\n\n";

    try {
        // Read project descriptions
        const projectsDir = path.join(publicDir, "DataSet", "projects");
        const projectFiles = await fs.readdir(projectsDir);

        context += "## Projects\n\n";
        for (const file of projectFiles) {
            if (file.endsWith(".md")) {
                const content = await fs.readFile(
                    path.join(projectsDir, file),
                    "utf-8"
                );
                context += `### ${file.replace(".md", "").replace("Readme - ", "")}\n${content}\n\n`;
            }
        }

        // List achievements (PDFs)
        const achievementsDir = path.join(publicDir, "DataSet", "achievements");
        try {
            const achievementFiles = await fs.readdir(achievementsDir);
            context += "## Achievements\n\n";
            context += `Total achievements: ${achievementFiles.filter(f => f.endsWith('.pdf')).length}\n`;
            context += "Available certificates:\n";
            achievementFiles.forEach(file => {
                if (file.endsWith('.pdf')) {
                    context += `- ${file.replace('.pdf', '')}\n`;
                }
            });
            context += "\n";
        } catch (err) {
            console.warn("Could not read achievements directory");
        }

        // List publications
        const pubDir = path.join(publicDir, "Publication");
        try {
            const pubFiles = await fs.readdir(pubDir);
            context += "## Publications\n\n";
            pubFiles.forEach(file => {
                if (file.endsWith('.pdf')) {
                    context += `- ${file.replace('.pdf', '').replace('Publikasi Jurnal ', '').replace('_Hans Gunawan', '')}\n`;
                }
            });
            context += "\n";
        } catch (err) {
            console.warn("Could not read publications directory");
        }

        // Add basic info about Hans
        context += `## Personal Information\n\n`;
        context += `- Name: Hans Gunawan\n`;
        context += `- Education: Mahasiswa Sistem Informasi, Universitas Kristen Duta Wacana (UKDW)\n`;
        context += `- Focus: Full-stack Development, AI Integration, Data Management\n`;
        context += `- Tech Stack: Laravel, React, .NET MAUI, PostgreSQL, Express.js\n`;
        context += `- AI-native mindset: Mengintegrasikan AI (Gemini, IBM Granite) dalam solusi bisnis\n`;
        context += `- Principles: 1L + 5C (Leadership, Competence, Compassion, Consistency, Conscience, Commitment)\n`;
        context += `- Experience: 2+ years in web development and data management\n`;
        context += `- Notable Projects: FITAI (AI Fitness), SmartDev Academic, and more\n\n`;

        // Write to api/context.json
        const outputPath = path.join(__dirname, "..", "api", "context.json");
        await fs.writeFile(
            outputPath,
            JSON.stringify({ context }, null, 2),
            "utf-8"
        );

        console.log("✅ Context built successfully:", outputPath);
    } catch (error) {
        console.error("❌ Error building context:", error);
        process.exit(1);
    }
}

buildContext();
