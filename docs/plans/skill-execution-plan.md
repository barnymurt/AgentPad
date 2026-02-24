# Implementation Plan: Skill Execution System

## Overview

Build the execution layer connecting LaunchpadPM UI to agentpad skills, with user tier access control and email capture for lead generation.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Next.js UI    │────▶│  Next.js API     │────▶│  Railway        │
│  (Frontend)    │     │  (Orchestration) │     │  (Python Exec)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  SQLite          │
                        │  (Users/Jobs)    │
                        └──────────────────┘
```

## User Tiers

| Tier | Browse | Run Skills | Validation Pack |
|------|--------|------------|-----------------|
| Anonymous | ✓ | ✗ (paywall) | ✓ (email gate) |
| Lead (email provided) | ✓ | ✗ (paywall) | ✓ (3 per 24hr, countdown shown) |
| Paid ($29/mo) | ✓ | ✓ (unlimited) | ✓ (instant, unlimited) |

## Access Control Logic

### Validation Pack Limits (Lead Tier)
- 3 Validation Packs per 24-hour window
- 24-hour timer resets from last pack generation
- Countdown timer displayed in UI
- After 24hr: reset to 3 fresh packs
- Paid tier: unlimited

### Rate Limits Summary
| Tier | Validation Pack | Other Skills |
|------|-----------------|--------------|
| Anonymous | 1 (email gate) | 0 |
| Lead (email provided) | 3 per 24hr | 0 (paywall) |
| Paid | Unlimited | Unlimited |

## Tech Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Auth | NextAuth.js | Email provider for simplicity |
| Database | SQLite | Users, jobs, emails |
| API | Next.js API Routes | /api/run-skill, /api/jobs |
| Execution | Railway | Python runtime, pay-per-use |
| Rate Limiting | In-memory + SQLite | Per-user, per-day |

## MVP Skills (7 from Validation Pack)

1. requirements-elicitation
2. user-persona-creation
3. competitor-research
4. business-case-modeling
5. devils-advocate
6. feature-prioritization
7. user-journey-mapping

## Phase 1: Foundation

### 1.1 NextAuth Setup
- Install: `npm install next-auth`
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Provider: Email (via sendEmail callback - for MVP, just store leads)
- Adapter: Prisma with SQLite or direct SQLite

### 1.2 Database Schema (SQLite)
```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  tier TEXT DEFAULT 'lead',
  validation_packs_generated INTEGER DEFAULT 0,
  last_validation_pack_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  skill_id TEXT,
  status TEXT DEFAULT 'pending',
  input TEXT,
  output TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);
```

### 1.3 API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | * | NextAuth handlers |
| `/api/skills` | GET | List all skills |
| `/api/skills/[id]` | GET | Get skill details |
| `/api/run-skill` | POST | Start execution (tier check) |
| `/api/jobs/[id]` | GET | Poll status |
| `/api/download/[jobId]` | GET | Download results (email check) |
| `/api/capture-email` | POST | Store email, upgrade to lead |

### 1.4 Skill Execution Bridge
- Create `execution/run_skill.py`
- Input: skill_id, user_input
- Output: JSON result
- Timeout: 30 seconds
- Spawned via subprocess from API route

### 1.5 Validation Pack Limit Logic
```typescript
function canGenerateValidationPack(user: User): boolean {
  if (user.tier === 'paid') return true;
  
  const hoursSinceLastPack = user.last_validation_pack_date 
    ? (Date.now() - user.last_validation_pack_date) / (1000 * 60 * 60) 
    : 999;
  
  // Reset after 24 hours
  if (hoursSinceLastPack >= 24) {
    return true;
  }
  
  return user.validation_packs_generated < 3;
}

function getRemainingPacks(user: User): number {
  if (user.tier === 'paid') return 'unlimited';
  
  const hoursSinceLastPack = user.last_validation_pack_date 
    ? (Date.now() - user.last_validation_pack_date) / (1000 * 60 * 60) 
    : 999;
  
  if (hoursSinceLastPack >= 24) {
    return 3;
  }
  
  return Math.max(0, 3 - user.validation_packs_generated);
}

function getResetTime(user: User): Date | null {
  if (user.tier === 'paid') return null;
  if (!user.last_validation_pack_date) return null;
  
  const resetTime = new Date(user.last_validation_pack_date);
  resetTime.setHours(resetTime.getHours() + 24);
  
  return resetTime > new Date() ? resetTime : null;
}
```

## Phase 2: Access Control

### 2.1 Tier Middleware
```typescript
function canExecuteSkill(userTier: string, skillId: string): boolean {
  const mvpSkills = ['requirements-elicitation', 'user-persona-creation', ...];
  const isMvp = mvpSkills.includes(skillId);
  
  if (userTier === 'paid') return true;
  if (userTier === 'lead' && isMvp) return false;
  return false;
}
```

### 2.2 Rate Limiting
- Track daily executions per user in SQLite
- Free tier: 10/day limit
- Paid: unlimited
- Increment on job creation, reset daily

### 2.3 Email Capture Flow
1. User clicks "Run Skill" (non-paid)
2. Show paywall modal: "Enter email to unlock"
3. User enters email → stored in SQLite
4. For Validation Pack: show download button after email
5. For other skills: show "Upgrade to Pro" prompt

## Phase 3: UI Integration

### 3.1 Fix Existing UI
- Remove `onSubmit={(e) => e.preventDefault()}` from main input
- Connect to `/api/run-skill`
- Add loading spinner during execution
- Display results in modal/panel

### 3.2 Paywall Components
- `PaywallModal` - shown when non-paid user clicks Run
- `EmailCaptureForm` - simple email input
- `UpgradePrompt` - "Upgrade to Pro" CTA

### 3.3 Results Display
- Job status polling (every 2s)
- Loading state with progress indicator
- Results rendered as markdown/JSON
- Download button for Validation Pack

### 3.4 Validation Pack Countdown
- Display remaining packs: "X Validation Packs remaining"
- Display reset timer: "Resets in HH:MM:SS"
- Show upgrade prompt after limit reached

## Phase 4: Validation Pack Download

### 4.1 Email Gate Flow
```
User clicks "Get Validation Pack"
    ↓
[Anonymous?] → Yes → Show email form
    ↓
User enters email → Submit
    ↓
Email stored → Status = "lead"
    ↓
[Check pack limit]
    ├── Under limit → Show download button + remaining count
    └── Over limit → Show "Upgrade to Pro" + countdown
```

### 4.2 Download Endpoint
- Verify email exists in database
- Check pack limit (3 per 24hr)
- Generate file from job output (or template)
- Return file stream

## File Changes Required

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts     # NEW
│   │   ├── run-skill/route.ts              # NEW
│   │   ├── jobs/[id]/route.ts              # NEW
│   │   ├── download/[jobId]/route.ts      # NEW
│   │   └── capture-email/route.ts          # NEW
│   └── (existing pages)
├── components/
│   ├── PaywallModal.tsx                    # NEW
│   ├── EmailCaptureForm.tsx                # NEW
│   ├── JobStatus.tsx                       # NEW
│   └── (existing components)
├── lib/
│   ├── auth.ts                             # NEW - NextAuth config
│   ├── db.ts                               # NEW - SQLite connection
│   ├── skills.ts                           # UPDATE - add tier checking
│   └── (existing libs)
└── (existing files)

execution/
└── run_skill.py                            # NEW - skill execution bridge

data-sources/
└── mvp-skills.json                         # NEW - MVP skill list
```

## Cost Estimate

| Component | MVP Cost |
|-----------|----------|
| Next.js (Vercel Free) | $0 |
| Railway (Python) | $0-5/mo |
| SQLite (local) | $0 |
| NextAuth (free) | $0 |
| **Total** | **$0-5/mo** |

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-24 | Hosting: Railway | Cheapest option, native Python support |
| 2026-02-24 | Pricing: $29/mo Pro | Market standard for SaaS tools |
| 2026-02-24 | Rate Limits: 3 packs/24hr (leads) | Prevents abuse, encourages upgrade |
| 2026-02-24 | Timeout: 30s | Catches most executions |
| 2026-02-24 | User Flow: Anonymous → Lead (email) → Paid | Clear funnel with upgrade path |
