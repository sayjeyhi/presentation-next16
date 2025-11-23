import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Suspense } from "react";
import { CountSkeleton, PostsSkeleton } from "./_components/Skeleton";
import { cacheLife, cacheTag, unstable_noStore } from "next/cache";

async function BlogPostsList() {
  unstable_noStore();
  
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {blogPosts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
        >
          {post.imageUrl && (
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <CardHeader>
            <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function TotalPosts() {
  "use cache";

  cacheLife("hours");
  cacheTag("total-posts");

  const count = await prisma.blogPost.count();
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-foreground">{count}</div>
      <div className="text-sm text-muted-foreground mt-1">
        {count === 1 ? "Blog Post" : "Blog Posts"}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* STATIC: Hero Section */}
        <div className="mb-12 p-8 rounded-2xl bg-white dark:bg-zinc-950 border-4 border-pink-400/50 dark:border-purple-500/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-3 py-1 bg-pink-100 dark:bg-purple-900/30 text-pink-700 dark:text-purple-300 text-xs font-semibold rounded-full">
              STATIC
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            My Awesome Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Welcome to my blog where I share my thoughts, ideas, and
            experiences. This content is statically generated at build time for
            optimal performance.
          </p>
          <div className="mt-6">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-background font-medium transition-colors hover:bg-foreground/90"
            >
              Create New Post
            </Link>
          </div>
        </div>

        {/* STATIC: Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border-4 border-pink-400/50 dark:border-purple-500/50 shadow-sm">
            <div className="px-3 py-1 bg-pink-100 dark:bg-purple-900/30 text-pink-700 dark:text-purple-300 text-xs font-semibold rounded-full inline-block mb-3">
              STATIC
            </div>
            <h3 className="text-lg font-semibold mb-2">⚡ Fast Performance</h3>
            <p className="text-sm text-muted-foreground">
              Static content loads instantly with no database queries needed.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border-4 border-pink-400/50 dark:border-purple-500/50 shadow-sm">
            <div className="px-3 py-1 bg-pink-100 dark:bg-purple-900/30 text-pink-700 dark:text-purple-300 text-xs font-semibold rounded-full inline-block mb-3">
              STATIC
            </div>
            <h3 className="text-lg font-semibold mb-2">🎨 Beautiful Design</h3>
            <p className="text-sm text-muted-foreground">
              Clean and modern interface built with shadcn/ui components.
            </p>
          </div>

          {/* DYNAMIC: Stats Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border-4 border-blue-400/50 dark:border-blue-500/50 shadow-sm">
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full inline-block mb-3">
              DYNAMIC
            </div>
            <h3 className="text-lg font-semibold mb-4">📊 Total Posts</h3>
            <div className="text-center">
              <Suspense fallback={<CountSkeleton />}>
                <TotalPosts />
              </Suspense>
            </div>
          </div>
        </div>

        {/* DYNAMIC: Blog Posts Section */}
        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border-4 border-blue-400/50 dark:border-blue-500/50 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full inline-block mb-2">
                DYNAMIC
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Latest Posts
              </h2>
              <p className="text-muted-foreground mt-1">
                Fresh content loaded from the database in real-time
              </p>
            </div>
          </div>

          <Suspense fallback={<PostsSkeleton />}>
            <BlogPostsList />
          </Suspense>
        </div>

        {/* STATIC: Footer */}
        <div className="mt-12 p-6 rounded-xl bg-white dark:bg-zinc-950 border-4 border-pink-400/50 dark:border-purple-500/50 shadow-sm text-center">
          <div className="px-3 py-1 bg-pink-100 dark:bg-purple-900/30 text-pink-700 dark:text-purple-300 text-xs font-semibold rounded-full inline-block mb-3">
            STATIC
          </div>
          <p className="text-sm text-muted-foreground">
            Built with Next.js 16+ • Showcasing Cache Components & PPR • Static
            and Dynamic Content
          </p>
        </div>
      </div>
    </div>
  );
}
