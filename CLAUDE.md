# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (starts Vite on localhost:8080)
- **Build**: `npm run build`
- **Build (dev mode)**: `npm run build:dev`
- **Lint**: `npm run lint`
- **Preview prod build**: `npm run preview`
- **No test framework is configured.**

## Architecture

This is a React SPA for VirtusCo, a robotics company building autonomous porter robots for airports. The app serves as a product showcase, employee marketplace, e-commerce cart, and AI chatbot portal.

### Provider hierarchy (App.tsx)

```
QueryClientProvider → AuthProvider → TooltipProvider → BrowserRouter → Routes
```

`VirtueChat` (the AI chatbot widget) renders globally outside of Routes and appears on every page.

### Backend: Supabase

All data lives in Supabase (PostgreSQL). The client is initialized in `src/integrations/supabase/client.ts` with hardcoded project URL and anon key. Database types are auto-generated in `src/integrations/supabase/types.ts` — do not edit that file manually.

Three Supabase Edge Functions (Deno) live under `supabase/functions/`:
- `generate-with-gemini` — proxies chat messages to Google Gemini API (requires `GEMINI_API_KEY` env var in Supabase)
- `auth-email` — email auth handler
- `send-email` — email sending via Resend

### Service layer (`src/services/`)

All Supabase database operations go through service files, not directly from components:
- `authService.ts` — email signup/login, OAuth (Google, GitHub, Facebook)
- `cartService.ts` — cart CRUD, handles both "employee" and "company" product types
- `productService.ts` — product queries
- `pressKitService.ts` — press kit resource queries
- `types.ts` — shared TypeScript interfaces (CartItem, Product, SimplifiedProduct, PressKitItem)

### State management

- **Auth**: React Context (`src/context/AuthContext.tsx`). Access via `useAuth()` hook.
- **Server data**: TanStack React Query. The QueryClient is configured with `retry: 1` and `refetchOnWindowFocus: false`.
- **No global client-side state store** (no Redux/Zustand).

### AI Chat system

`VirtueChatClient` (`src/lib/VirtueChatClient.ts`) manages conversations in-memory and persists to Supabase for authenticated users. It calls the `generate-with-gemini` edge function with retry logic and exponential backoff.

### Cart system

Cart items have a `product_type` discriminator ("employee" | "company") that determines which table to join against (`employee_products` vs `products`). The Supabase type for `product_type` is `string`, so it is cast to the union type in service code.

### User roles

The database has a `user_roles` table with an enum: `"admin" | "editor" | "user"`. A `has_role` database function exists for permission checks.

## Key conventions

- **Path alias**: `@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)
- **UI components**: shadcn/ui in `src/components/ui/`. Add new ones via the shadcn CLI, don't write from scratch.
- **Styling**: Tailwind CSS with custom brand colors defined in `tailwind.config.ts`. Font families: SF Pro Display, Inter.
- **Forms**: React Hook Form + Zod for validation
- **Toasts**: Two toast systems coexist — Radix UI Toaster (`@/components/ui/toaster`) and Sonner (`@/components/ui/sonner`)
- **Routing**: All routes defined in `App.tsx`. Add new routes above the `*` catch-all. The Blog route is commented out.
- **Founder pages**: Individual static pages under `src/pages/founders/`, one per founder with hardcoded routes.
