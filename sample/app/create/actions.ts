"use server";

import prisma from "@/lib/db";
import { formSchema } from "../schemas/form-schema";
import z from "zod";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export async function createBlogPost(values: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(values);

  if (!result.success) {
    return { error: result.error.message };
  }

  const { title, content, imageUrl } = result.data;

  await prisma.blogPost.create({
    data: {
      title,
      content,
      imageUrl,
    },
  });

  updateTag("blog-posts");

  return redirect("/");
}
