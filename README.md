# Dhooma Creative CRM

A production-ready Next.js CRM built with **Clean Architecture** for Dhooma Creative (Digital Marketing Company).

---

## Folder Structure

```
my-nextjs-app/
├── app/                          # Presentation layer (Next.js App Router)
│   ├── _components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Top nav + user dropdown
│   │   │   └── Sidebar.tsx       # Fixed left nav + Quick Status widget
│   │   └── ui/
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx         # StatusBadge + SourceBadge
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── hooks/
│   │   ├── useAuth.ts            # Login/logout + auth state
│   │   ├── useFeedback.ts        # Lead-scoped feedback
│   │   ├── useLeads.ts           # Lead CRUD + stats
│   │   └── useTeamMembers.ts     # Team member CRUD
│   ├── pages/
│   │   ├── AdminPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LeadDetailPage.tsx
│   │   ├── LeadsPage.tsx
│   │   └── LoginPage.tsx
│   ├── services/                 # Bridges DI container ↔ Zustand store
│   │   ├── authService.ts
│   │   ├── feedbackService.ts
│   │   ├── leadService.ts
│   │   └── teamMemberService.ts
│   ├── store/
│   │   └── useAppStore.ts        # Zustand global UI state
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── helpers.ts            # cn(), formatDate(), buildInitials()
│   ├── layout.tsx
│   └── page.tsx                  # App shell + client-side routing
│
├── di/                           # Composition root
│   ├── modules/
│   │   ├── auth.module.ts        # Auth + Feedback bindings
│   │   ├── lead.module.ts        # Lead repo → use-cases → controller
│   │   └── team-member.module.ts
│   ├── container.ts              # Re-exports all modules
│   └── types.ts                  # DI symbol tokens
│
├── prisma/
│   ├── index.ts                  # PrismaClient singleton
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│
├── src/
│   ├── application/
│   │   ├── repositories/         # Repository interfaces (contracts)
│   │   │   ├── IFeedbackRepository.ts
│   │   │   ├── ILeadRepository.ts
│   │   │   ├── ITeamMemberRepository.ts
│   │   │   └── IUserRepository.ts
│   │   ├── services/
│   │   │   └── IAuthService.ts
│   │   └── use-cases/
│   │       ├── auth/
│   │       │   ├── LoginUseCase.ts
│   │       │   └── LogoutUseCase.ts
│   │       ├── feedback/
│   │       │   ├── AddFeedbackUseCase.ts
│   │       │   └── GetFeedbackByLeadUseCase.ts
│   │       ├── lead/
│   │       │   ├── CreateLeadUseCase.ts
│   │       │   ├── DeleteLeadUseCase.ts
│   │       │   ├── GetLeadByIdUseCase.ts
│   │       │   ├── GetLeadStatsUseCase.ts
│   │       │   ├── GetLeadsUseCase.ts
│   │       │   └── UpdateLeadUseCase.ts
│   │       └── team-member/
│   │           ├── CreateTeamMemberUseCase.ts
│   │           ├── DeleteTeamMemberUseCase.ts
│   │           └── GetTeamMembersUseCase.ts
│   │
│   ├── entities/                 # Core domain — zero external dependencies
│   │   ├── errors/
│   │   │   └── DomainErrors.ts
│   │   ├── models/
│   │   │   ├── Company.ts
│   │   │   ├── Feedback.ts
│   │   │   ├── Lead.ts
│   │   │   ├── TeamMember.ts
│   │   │   └── User.ts
│   │   └── index.ts
│   │
│   ├── infrastructure/           # Concrete implementations
│   │   ├── repositories/
│   │   │   ├── InMemoryFeedbackRepository.ts
│   │   │   ├── InMemoryLeadRepository.ts
│   │   │   └── InMemoryTeamMemberRepository.ts
│   │   └── services/
│   │       └── MockAuthService.ts
│   │
│   └── interface-adapters/
│       └── controllers/
│           ├── FeedbackController.ts
│           ├── LeadController.ts
│           └── TeamMemberController.ts
│
├── tests/
│   └── unit/
│       ├── controllers/
│       │   └── LeadController.test.ts
│       └── use-cases/
│           ├── CreateLeadUseCase.test.ts
│           ├── GetLeadsUseCase.test.ts
│           └── InMemoryLeadRepository.test.ts
│
├── .env.local
├── codecov.yml
├── config.ts
├── instrumentation.ts
├── next.config.mjs
├── sentry.client.config.ts
├── sentry.edge.config.ts
├── sentry.server.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

---

## Architecture Layers

```
┌────────────────────────────────────────────────────────┐
│  app/  — Presentation (React pages, hooks, Zustand)    │
├────────────────────────────────────────────────────────┤
│  di/   — Composition Root (wires all dependencies)     │
├────────────────────────────────────────────────────────┤
│  src/interface-adapters/ — Controllers                 │
├────────────────────────────────────────────────────────┤
│  src/application/ — Use Cases + Repository Interfaces  │
├────────────────────────────────────────────────────────┤
│  src/entities/ — Domain Models + Errors (pure TS)      │
├────────────────────────────────────────────────────────┤
│  src/infrastructure/ — InMemory / Prisma repos         │
└────────────────────────────────────────────────────────┘
```

**Dependency Rule:** All arrows point inward. `infrastructure/` implements interfaces defined in `application/`. The `di/` layer is the only place that knows about both sides.

---

## Quick Start

```bash
npm install
npm run dev     # http://localhost:3000
```

**Credentials:** `sneha@dhooma.com` / `password123`

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:coverage` | Coverage report |
| `npm run db:seed` | Seed Prisma database |
| `npm run db:studio` | Prisma Studio |

---

## Swapping to Prisma

Only touch one file per domain:

```ts
// di/modules/lead.module.ts — change this one import:
import { PrismaLeadRepository } from "@/src/infrastructure/repositories/PrismaLeadRepository";
// Everything else stays the same.
```
