import z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  imageUrl: z.url("Must be a valid URL"),
});
