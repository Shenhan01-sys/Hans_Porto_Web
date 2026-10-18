import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { z } from "zod";
import { chatWithGroq, getProfileContext } from "./groq-service";
import { handleMcpHttp } from "../client/src/content/portfolio-mcp";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);

      // In a real application, you would:
      // 1. Save to database
      // 2. Send email notification
      // 3. Maybe use a service like SendGrid or Nodemailer

      console.log("Contact form submission:", validatedData);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      res.json({
        success: true,
        message: "Thank you for your message! I'll get back to you soon."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors,
        });
      }

      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  });

  // Read-only MCP endpoint (same logic as the Vercel functions)
  app.all("/api/mcp", (req, res) => {
    const out = handleMcpHttp(req.method, req.body);
    res.set(out.headers).status(out.status);
    if (out.body) res.send(out.body);
    else res.end();
  });

  // Gemini Chat Endpoint with SSE streaming
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Set headers for Server-Sent Events
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Get streaming response from Gemini
      const stream = await chatWithGroq(message, history);

      // Stream chunks to client
      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }

      // Send done signal
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error: any) {
      console.error("Chat error:", error);
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  });

  // Debug endpoint to view loaded context
  app.get("/api/chat/context", async (req, res) => {
    if (process.env.NODE_ENV !== "development") return res.status(404).end();
    try {
      const context = await getProfileContext();
      res.json({ context });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
