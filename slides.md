---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Next.js 16 - What's New?
drawings:
  persist: false
css: unocss
---

# Next.js 16 and React 19

What's New? What's Changed?


<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="avtar mt-36 rounded-full flex w-full align-center justify-center ">
  <img class="w-18 h-18 rounded-full grayscale" src="https://avatars.githubusercontent.com/u/6254009?v=4" />

  <a class="text-left ml-4 mt-2" href="https://github.com/sayjeyhi">
    <strong class="text-xl">Jafar Rezaei</strong> <br/>
    <span class="text-gray-400 text-sm">May 2025</span>
  </a>
</div>

---

# Overview

Next.js 16 brings significant improvements across performance, developer experience, and caching

<div>

- Turbopack now stable and default
- New caching model with `"use cache"`
- Middleware renamed to `proxy.ts`
- React 19.2 support
- Enhanced developer tools
- Breaking changes and requirements

</div>

---

# Minimum Requirements

Important version updates required for Next.js 16

```bash
# Node.js version
Node.js 20.9+ (previously 18.18+)

# TypeScript version
TypeScript 5.0+ (if using TypeScript)

# React version
React 19.2+
```

<div>

- AMP support has been removed
- Several APIs now require async access
- `next/legacy/image` is deprecated

</div>

---

# Upgrade Your Project

Two ways to upgrade to Next.js 16

### Automated Upgrade (Recommended)

```bash
npx @next/codemod@canary upgrade latest
```

<v-click>

### Manual Upgrade

```bash
npm install next@latest react@latest react-dom@latest
```

</v-click>

<v-click>

The codemod will automatically:
- Update dependencies
- Migrate deprecated APIs
- Fix common breaking changes

</v-click>

---

# Feature 1: Turbopack is Now Stable

The new default bundler for development and production

<div grid="~ cols-2 gap-4">
<div>

**Before (Webpack)**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

</div>
<div>

**Now (Turbopack - Default)**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

</div>
</div>

<div>

- Up to 76% faster local server startup
- Up to 96% faster code updates with Fast Refresh
- File system caching for faster compile times
- Now the default for both `next dev` and `next build`

</div>

---

# Feature 2: New Caching Model

Explicit caching with the `"use cache"` directive

### Before Next.js 16

```tsx
// Implicit caching behavior
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

<v-click>

### After Next.js 16

```tsx
"use cache"

// Explicit caching with clear semantics
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

</v-click>

---

# Caching Functions

You can also cache individual functions

```tsx
import { unstable_cache } from 'next/cache'

// Cache at the function level
export const getProducts = unstable_cache(
  async () => {
    const res = await fetch('https://api.example.com/products')
    return res.json()
  },
  ['products'],
  { revalidate: 3600 }
)
```

<v-click>

```tsx
// Use in your component
export default async function ProductList() {
  const products = await getProducts()
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

</v-click>

---

# Enhanced Caching APIs

New functions for better cache control

```tsx
import { updateTag, revalidateTag } from 'next/cache'

// Update cache tags programmatically
async function updateProduct(id: string) {
  await database.products.update(id, {...})

  // Update specific cache tags
  updateTag(`product-${id}`)
}
```

<v-click>

```tsx
// Revalidate cache on-demand
async function revalidateProducts() {
  // Force revalidation of specific tags
  revalidateTag('products')
}
```

</v-click>

---

# Feature 3: Middleware → proxy.ts

Clarifying the network boundary

### Before

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}
```

<v-click>

### After

```ts
// proxy.ts
export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}
```

</v-click>

---

# Why proxy.ts?

Better semantics for what this code actually does

<div>

- Runs on Node.js runtime (not Edge by default)
- Acts as a proxy between client and server
- Clearer mental model of where code executes
- Middleware term was often confusing
- Better separation of concerns

</div>

<v-click>

```bash
# The codemod handles this automatically
npx @next/codemod@canary upgrade latest
```

</v-click>

---

# Feature 4: Async Request APIs

Request APIs now require async access

### Before

```tsx
import { cookies, headers } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const headersList = headers()

  return <div>...</div>
}
```

---

# Async Request APIs (continued)

### After

```tsx
import { cookies, headers } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()

  return <div>...</div>
}
```

<div>

- `cookies()` must be awaited
- `headers()` must be awaited
- `params` in pages must be awaited
- `searchParams` in pages must be awaited
- Better aligns with React Server Components model

</div>

---

# Async Params Example

Route parameters are now async

```tsx
// app/product/[id]/page.tsx

// Before
export default function ProductPage({ params }: { params: { id: string } }) {
  return <div>Product: {params.id}</div>
}
```

<v-click>

```tsx
// After
export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <div>Product: {id}</div>
}
```

</v-click>

---

# Feature 5: React 19.2 Support

Full support for the latest React features

<div>

- React Compiler support
- View Transitions API
- Enhanced Suspense
- Better Server Components
- Improved hydration
- Performance optimizations

</div>

---

# React Compiler

Automatic optimization of your React code

```tsx
// No need for manual memoization
export default function ProductList({ products }) {
  // React Compiler automatically optimizes this
  const filteredProducts = products.filter(p => p.inStock)

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

<v-click>

Previously you would need:
```tsx
const filteredProducts = useMemo(
  () => products.filter(p => p.inStock),
  [products]
)
```

</v-click>

---

# Feature 6: Enhanced Routing

Improved routing performance and behavior

<div>

- Layout deduplication prevents unnecessary re-renders
- Better prefetching strategies
- Parallel routes now require explicit `default.js`
- Improved route groups
- Faster navigation

</div>

---

# Parallel Routes Changes

Explicit defaults required

```bash
app/
├── @modal/
│   ├── login/
│   │   └── page.tsx
│   └── default.tsx      # Now required!
├── @sidebar/
│   ├── profile/
│   │   └── page.tsx
│   └── default.tsx      # Now required!
└── layout.tsx
```

<v-click>

```tsx
// @modal/default.tsx
export default function Default() {
  return null
}
```

</v-click>

---

# Feature 7: Image Component Updates

Changes to `next/image` defaults

```tsx
// next.config.js
module.exports = {
  images: {
    minimumCacheTTL: 31536000, // Changed from 60
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}
```

<div>

- `minimumCacheTTL` increased to 1 year
- New default device sizes
- Local images with query strings need configuration
- `next/legacy/image` is deprecated

</div>

---

# Feature 8: Build Adapters API

Alpha feature for custom deployment targets

```js
// next.config.js
module.exports = {
  experimental: {
    buildAdapter: {
      name: 'custom-adapter',
      config: {
        // Adapter-specific configuration
      }
    }
  }
}
```

<div>

- Deploy to custom platforms
- Optimize for specific runtimes
- Still in alpha, expect changes
- Enables better platform integration

</div>

---

# Feature 9: Next.js Devtools MCP

AI-assisted debugging with Model Context Protocol

<div>

- Integrates with AI tools
- Provides contextual debugging info
- Unified logs across client and server
- Better error messages
- Suggested fixes for common issues
- Enhanced developer experience

</div>

---

# Breaking Changes Summary

What you need to watch out for

<div>

1. Node.js 20.9+ required
2. TypeScript 5+ required
3. Request APIs are now async
4. Middleware renamed to proxy
5. AMP support removed
6. Image component defaults changed
7. Parallel routes need default.js
8. React 19.2 required

</div>

---

# Migration Strategy

Recommended approach for upgrading

<div>

1. Update Node.js to 20.9+
2. Run the automated codemod
3. Update TypeScript if needed
4. Test async request APIs
5. Rename middleware to proxy
6. Review image configurations
7. Add default.js to parallel routes
8. Run your test suite
9. Test thoroughly before deploying

</div>

---

# Performance Improvements

Real-world performance gains

<div grid="~ cols-2 gap-4">
<div>

**Development**
- 76% faster startup
- 96% faster Fast Refresh
- Better HMR reliability
- Reduced memory usage

</div>
<div>

**Production**
- Faster builds with Turbopack
- Smaller bundle sizes
- Improved caching
- Better prefetching

</div>
</div>

---

# Before You Upgrade

Checklist for a smooth migration

- [ ] Backup your project
- [ ] Update Node.js to 20.9+
- [ ] Review breaking changes
- [ ] Run the codemod
- [ ] Update tests
- [ ] Test locally thoroughly
- [ ] Update CI/CD configs
- [ ] Deploy to staging first
- [ ] Monitor production after deploy

---

# Resources

Essential links for learning more

- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)
- [Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Next.js Discord](https://nextjs.org/discord)

---


<div class="flex align-center flex-col items-center mt-12">
<img class="w-32 mb-12" src="https://em-content.zobj.net/source/microsoft-teams/363/cowboy-hat-face_1f920.png" />

# Thank You!

<span class="text-xs -mt-4">

Slides: <a href="https://i18n.catshoulder.dev" class="text-blue-400">i18n.catshoulder.dev</a>

</span>

[GitHub](https://github.com/sayjeyhi) · [My Website](https://sayjeyhi.com)

</div>
