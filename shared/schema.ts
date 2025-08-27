import { z } from "zod";

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export interface ContactMessage extends InsertContactMessage {
  id: string;
  createdAt: Date;
}
