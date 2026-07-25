# Graph Report - .  (2026-07-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 163 nodes · 200 edges · 16 communities (10 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e575070`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/page.tsx
- sales.ts
- devDependencies
- package.json
- products.ts
- compilerOptions
- include
- extends
- app/layout.tsx
- seed.ts
- admin/page.tsx
- next.config.mjs
- postcss.config.mjs
- tailwind.config.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `scripts` - 5 edges
3. `getCustomers()` - 5 edges
4. `OrdersPageClient()` - 5 edges
5. `ProductsPageClient()` - 5 edges
6. `include` - 5 edges
7. `uploadProductImage()` - 4 edges
8. `CustomersPageClient()` - 4 edges
9. `AdminOrdersPage()` - 4 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `AdminCustomersPage()` --calls--> `getCustomers()`  [EXTRACTED]
  src/app/admin/customers/page.tsx → src/app/actions/sales.ts
- `ProductsPageClient()` --calls--> `uploadProductImage()`  [EXTRACTED]
  src/app/admin/products/ProductsPageClient.tsx → src/app/actions/products.ts
- `AdminProductsPage()` --calls--> `getProductsAdmin()`  [EXTRACTED]
  src/app/admin/products/page.tsx → src/app/actions/products.ts
- `ProductsPageClient()` --calls--> `createProductAdmin()`  [EXTRACTED]
  src/app/admin/products/ProductsPageClient.tsx → src/app/actions/products.ts
- `ProductsPageClient()` --calls--> `updateProductAdmin()`  [EXTRACTED]
  src/app/admin/products/ProductsPageClient.tsx → src/app/actions/products.ts

## Import Cycles
- None detected.

## Communities (16 total, 6 thin omitted)

### Community 0 - "app/page.tsx"
Cohesion: 0.08
Nodes (7): getLandingStats(), Home(), B2BFocus(), Footer(), ProductDetail(), StatsProps, TrustBadges()

### Community 1 - "sales.ts"
Cohesion: 0.19
Nodes (16): addPayment(), addShipment(), createCustomer(), createOrder(), getCustomers(), getOrders(), getProducts(), updateCustomer() (+8 more)

### Community 2 - "devDependencies"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, postcss, prisma, tailwindcss (+13 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (19): lucide-react, next, dependencies, lucide-react, next, @prisma/client, react, react-dom (+11 more)

### Community 4 - "products.ts"
Cohesion: 0.19
Nodes (14): globalForPrisma, createProductAdmin(), deleteProductAdmin(), getProductsAdmin(), getSiteStatsSettings(), updateProductAdmin(), updateSiteStats(), uploadProductImage() (+6 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+10 more)

### Community 6 - "include"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 7 - "extends"
Cohesion: 0.29
Nodes (6): extends, rules, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, next/core-web-vitals, next/typescript

## Knowledge Gaps
- **59 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-unused-vars`, `nextConfig` (+54 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `@typescript-eslint/no-explicit-any` to the rest of the system?**
  _59 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._