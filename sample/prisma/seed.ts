import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (optional - comment out if you want to keep existing data)
  await prisma.blogPost.deleteMany();
  console.log("🗑️  Cleared existing blog posts");

  // Create sample blog posts
  const blogPosts = [
    {
      title: "Getting Started with Next.js 16",
      content: "Next.js 16 introduces exciting new features including improved server components, better performance optimizations, and enhanced developer experience. In this post, we'll explore the key improvements and how to get started with your first Next.js 16 project.",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    },
    {
      title: "Understanding React Server Components",
      content: "React Server Components revolutionize how we build React applications. They allow us to render components on the server, reducing client-side JavaScript and improving performance. Learn how to leverage server components in your Next.js applications.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    },
    {
      title: "Prisma Best Practices",
      content: "Prisma is a powerful ORM that makes database access simple and type-safe. In this article, we'll cover best practices for schema design, query optimization, and handling migrations. Discover how to make the most of Prisma in your projects.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    },
    {
      title: "Building Modern Web Applications",
      content: "Modern web development requires understanding of various technologies and patterns. From server-side rendering to client-side interactivity, we'll explore the tools and techniques that make building scalable web applications possible.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    },
    {
      title: "TypeScript Tips and Tricks",
      content: "TypeScript brings type safety to JavaScript, making our code more maintainable and less error-prone. Learn advanced TypeScript patterns, utility types, and how to write better type definitions for your projects.",
      imageUrl: "https://images.unsplash.com/photo-1516116216624-53e6971beab6?w=800",
    },
  ];

  for (const post of blogPosts) {
    const created = await prisma.blogPost.create({
      data: post,
    });
    console.log(`✅ Created blog post: ${created.title}`);
  }

  console.log(`\n🎉 Successfully seeded ${blogPosts.length} blog posts!`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

