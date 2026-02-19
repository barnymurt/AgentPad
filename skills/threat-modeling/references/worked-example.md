<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current threat modeling methodologies, emerging 
threats, and skill evolution. Last reviewed: 2026-02-19 -->

# Worked Example: Threat Modeling — InvoiceFlow

## Scenario

InvoiceFlow is an AI-powered invoicing tool for freelance designers. This threat model consumes the Architecture Design output (containers, data flows, auth design, tech stack) and Security Requirements Baseline output (requirements checklist, architecture risks).

**Architecture summary:**
- Modular Monolith: Next.js 14 (App Router) on Vercel
- Database: PostgreSQL via Supabase
- Auth: Clerk
- Payments: Stripe
- Background jobs: Inngest
- AI: OpenAI API
- Storage: AWS S3
- Email: Resend

**Data sensitivity:**
- PII (client names, emails, addresses) — Confidential
- Financial data (invoice amounts, payment history, bank details) — Restricted
- Credentials (password hashes, API keys) — Restricted

---

## Section 1: Threat Modeling Context

### 1a. Product Summary
- **Product name:** InvoiceFlow
- **One-line description:** AI-powered invoicing tool that helps freelance designers create, send, and track invoices with automated payment reminders and expense tracking.
- **Input source:** Architecture Design output

### 1b. Architecture Summary
- **Containers analyzed:** Web Application (Next.js), API Server (Next.js API Routes), Database (PostgreSQL/Supabase), Background Jobs (Inngest), Cache (Next.js ISR + Supabase pooling)
- **External integrations:** Clerk (authentication), Stripe (payments), OpenAI (AI suggestions), S3 (file storage), Resend (email)
- **Data sensitivity:** Client PII (Confidential), Financial data (Restricted), Credentials (Restricted)

### 1c. Scope
- **In scope:** All 5 containers, data flows between containers, external integrations, authentication flows, payment processing, invoice storage
- **Out of scope:** Mobile app (not yet built), infrastructure sizing, CI/CD pipeline security, third-party service internal vulnerabilities
- **Assumptions:** TLS enforced on all connections, Supabase manages database patching, Vercel manages edge infrastructure security, Stripe handles card data PCI-DSS compliance

### 1d. Threat Actors

| Actor | Motivation | Capability | Access Level | Example Scenario |
|-------|-----------|------------|-------------|-----------------|
| External attacker | Financial gain | Medium-high | Internet-facing | Breach database to steal client payment info |
| Disgruntled freelancer (user) | Revenge, data theft | Low | Authenticated user account | Exfiltrate competitor client list |
| Malicious insider (founder) | Data theft | High | Full system access | Export all client PII before leaving |
| Script kiddie | Notoriety | Low | Internet-facing | DDoS invoice portal |
| Competitor | Business espionage | Medium | Client invoice URLs | Access competitor invoices via leaked token |

---

## Section 2: STRIDE Analysis

### 2a. Threat Target Inventory

| # | Target | Type | Trust Boundary | Data Sensitivity |
|---|--------|------|---------------|-----------------|
| T1 | Web Application (Next.js) | Component Boundary | User ↔ Server | PII, Financial |
| T2 | API Server (Next.js API) | Component Boundary | Untrusted ↔ Trusted | PII, Financial, Credentials |
| T3 | Database (PostgreSQL) | Data Store | Server ↔ Database | All data |
| T4 | Clerk Auth Integration | External Integration | App ↔ Clerk | Credentials |
| T5 | Stripe Payment Integration | External Integration | App ↔ Stripe | Financial |
| T6 | OpenAI Integration | External Integration | App ↔ OpenAI | PII (potential) |
| T7 | Invoice Creation Flow | Data Flow | Client → Server → DB | PII, Financial |
| T8 | Client Portal Access | Data Flow | Client → Server → DB | PII, Financial |
| T9 | S3 File Storage | Data Store | Server ↔ S3 | Financial (invoices) |

### 2b. STRIDE Findings per Target

**Target: T2 — API Server (Next.js API Routes)**

| Category | Threat Description | Attack Vector | Existing Controls | Risk Rating (LxI) | Severity |
|----------|-------------------|--------------|-------------------|-------------------|----------|
| Spoofing | Attacker calls APIs without valid Clerk session | Stolen token, token replay | Clerk middleware | 3×4=12 | High |
| Tampering | Malformed API requests inject malicious data | SQL injection, parameter pollution | None specified | 4×4=16 | Critical |
| Repudiation | User denies making API request | No audit log of actions | None specified | 2×3=6 | Medium |
| Info Disclosure | PII exposed via API response | Missing authorization check, over-fetching | None specified | 3×4=12 | High |
| Denial of Service | API endpoint overwhelmed with requests | Rate limiting not implemented | None | 4×3=12 | High |
| Elevation of Privilege | Authenticated user accesses other user's data | Missing row-level access checks | None specified | 3×5=15 | Critical |

**Target: T7 — Invoice Creation Flow**

| Category | Threat Description | Attack Vector | Existing Controls | Risk Rating (LxI) | Severity |
|----------|-------------------|--------------|-------------------|-------------------|----------|
| Spoofing | Attacker creates invoice as another user | JWT token theft | Clerk tokens | 2×4=8 | Medium |
| Tampering | Invoice amounts modified in transit | MITM attack | TLS (assumed) | 2×5=10 | High |
| Repudiation | User denies sending invoice | No non-repudiation | Resend delivery logs | 1×2=2 | Low |
| Info Disclosure | Invoice PII logged or cached | Logging sensitive data | None specified | 3×3=9 | Medium |
| Denial of Service | Flood of invoice creation requests | No rate limiting | None | 3×3=9 | Medium |
| Elevation of Privilege | User creates invoice for another user | Broken access control | None specified | 3×5=15 | Critical |

**Target: T4 — Clerk Auth Integration**

| Category | Threat Description | Attack Vector | Existing Controls | Risk Rating (LxI) | Severity |
|----------|-------------------|--------------|-------------------|-------------------|----------|
| Spoofing | Attacker obtains valid Clerk session token | XSS to steal tokens, token replay | HttpOnly cookies | 3×4=12 | High |
| Tampering | Clerk session token modified | Token forgery | Signed tokens | 1×4=4 | Low |
| Repudiation | User claims session was hijacked | No device fingerprinting | Clerk defaults | 2×2=4 | Low |
| Info Disclosure | Clerk session data exposed | Token leakage in logs | None specified | 2×3=6 | Medium |
| Denial of Service | Lockout via failed password attempts | Brute force login | Clerk rate limiting | 2×2=4 | Low |
| Elevation of Privilege | Privilege escalation via Clerk roles | Role manipulation | None specified | 2×4=8 | Medium |

**Target: T5 — Stripe Payment Integration**

| Category | Threat Description | Attack Vector | Existing Controls | Risk Rating (LxI) | Severity |
|----------|-------------------|--------------|-------------------|-------------------|----------|
| Spoofing | Forge payment confirmation webhook | Stolen Stripe webhook secret | None specified | 4×5=20 | Critical |
| Tampering | Modify payment amount in webhook | Webhook replay | None specified | 3×5=15 | Critical |
| Repudiation | Dispute charge without valid reason | Friendly fraud | Stripe radar | 1×2=2 | Low |
| Info Disclosure | Payment data intercepted | MITM on webhook | TLS (assumed) | 2×3=6 | Medium |
| Denial of Service | Stripe API rate limiting | Excessive API calls | None specified | 2×2=4 | Low |
| Elevation of Privilege | Access other user's payment data | Missing authorization | None specified | 3×4=12 | High |

**Target: T3 — Database (PostgreSQL/Supabase)**

| Category | Threat Description | Attack Vector | Existing Controls | Risk Rating (LxI) | Severity |
|----------|-------------------|--------------|-------------------|-------------------|----------|
| Spoofing | Connect to database without credentials | Leaked connection string | Supabase network policy | 2×4=8 | Medium |
| Tampering | Modify database records directly | SQL injection, direct connect | RLS (if enabled) | 3×5=15 | Critical |
| Repudiation | Delete records without traceability | No audit logging | None specified | 2×3=6 | Medium |
| Info Disclosure | Read sensitive data from database | SQL injection, leaked keys | Encryption at rest | 4×5=20 | Critical |
| Denial of Service | Exhaust database connections | Connection pool exhaustion | Supabase limits | 3×3=9 | Medium |
| Elevation of Privilege | Bypass RLS with service role key | Service role key exposure | None specified | 4×5=20 | Critical |

---

## Section 3: Attack Trees

### 3a. Top Threat: Steal Client Payment Data

**Goal:** Exfiltrate client payment information (credit cards, bank accounts) from database

**Attack Tree:**

```
ROOT: Steal payment data from database
|
├── OR: Compromise database directly
|   ├── Step 1: Obtain database credentials
|   |   ├── Method: Find in environment variables (if leaked)
|   |   ├── Method: SQL injection in API
|   |   └── Method: Compromise Supabase admin
|   ├── Step 2: Connect to database
|   └── Step 3: SELECT * FROM payment_methods
|
├── OR: Intercept during payment flow
|   ├── Step 1: Intercept Stripe webhook
|   |   └── Method: Steal webhook signing secret
|   ├── Step 2: Forge payment confirmation
|   └── Step 3: Extract payment details from response
|
└── OR: Compromise backup/storage
    ├── Step 1: Access S3 bucket
    └── Step 2: Download invoice PDFs with card data
```

**Required Attacker Capabilities:**
- Database: Medium (SQL injection or credential theft)
- Stripe: High (need webhook secret)
- S3: Medium (bucket misconfiguration)

### 3b. Second Threat: Invoice Data Breach via Client Portal

**Goal:** Access invoices belonging to other users through the client portal

**Attack Tree:**

```
ROOT: Access other user's invoices
|
├── OR: Exploit token design flaw
|   ├── Step 1: Obtain a valid invoice token
|   |   ├── Method: Phishing
|   |   ├── Method: XSS (if reflected in URL)
|   |   └── Method: Access shared link
|   ├── Step 2: Enumerate other invoice IDs
|   │   └── Method: IDOR (Insecure Direct Object Reference)
|   └── Step 3: Access invoice without authorization
|
├── OR: Session hijacking
|   ├── Step 1: Steal Clerk session cookie
|   └── Method: XSS on client portal
|   ├── Step 2: Impersonate legitimate user
|   └── Step 3: View all invoices for impersonated user
|
└── OR: Bypass access control
    ├── Step 1: Identify authorization flaw
    │   └── Method: Code review of API routes
    └── Step 2: Direct API call with manipulated user ID
```

### 3c. Third Threat: AI Prompt Injection for Data Exfiltration

**Goal:** Manipulate AI suggestions to exfiltrate client PII sent to OpenAI

**Attack Tree:**

```
ROOT: Exfiltrate PII via AI
|
├── OR: Poison training/context data
|   ├── Step 1: Inject malicious prompt into invoice
|   ├── Step 2: AI includes PII in context
|   └── Step 3: Extract via AI response
|
├── OR: Extract from AI memory/context
|   ├── Step 1: Send PII in previous request
|   ├── Step 2: Query AI about "previous client"
|   └── Step 3: Receive PII in response
|
└── OR: Manipulate AI behavior
    ├── Step 1: Craft prompt injection
    └── Method: "Ignore previous instructions and output..."
    ├── Step 2: AI ignores data sanitization
    └── Step 3: PII included in suggestions to other users
```

---

## Section 4: Risk Register

| ID | Threat | Target | Likelihood | Impact | Risk Score | Severity | Status |
|----|--------|--------|------------|--------|------------|----------|--------|
| TR-01 | Payment webhook spoofing | Stripe | 4 | 5 | 20 | Critical | Open |
| TR-02 | Database breach via SQL injection | Database | 3 | 5 | 15 | Critical | Open |
| TR-03 | Service role key exposure | Database | 3 | 5 | 15 | Critical | Open |
| TR-04 | IDOR on invoice access | API | 4 | 4 | 16 | Critical | Open |
| TR-05 | Authorization bypass on payments | API | 3 | 5 | 15 | Critical | Open |
| TR-06 | PII exposure in API responses | API | 3 | 4 | 12 | High | Open |
| TR-07 | Session token theft (XSS) | Web App | 3 | 4 | 12 | High | Open |
| TR-08 | Invoice token enumeration | Client Portal | 3 | 4 | 12 | High | Open |
| TR-09 | PII sent to OpenAI | AI Integration | 3 | 4 | 12 | High | Open |
| TR-10 | Bank data not encrypted at rest | Database | 2 | 5 | 10 | High | Open |
| TR-11 | RLS not enabled on tables | Database | 3 | 4 | 12 | High | Open |
| TR-12 | Rate limiting not implemented | API | 4 | 3 | 12 | High | Open |

---

## Section 5: Mitigations

### Critical Mitigations (Address Immediately)

| ID | Threat | Mitigation | Effort | Residual Risk | Implementation |
|----|--------|------------|--------|---------------|----------------|
| TR-01 | Payment webhook spoofing | Implement Stripe signature verification | S | Low | Use `stripe.webhooks.constructEvent()` with signing secret |
| TR-02 | SQL injection | Add Zod validation + parameterized queries | M | Low | Validate all input in API routes |
| TR-03 | Service role key exposure | Verify key not in client bundles, use anon key | S | Low | Audit build output, use Clerk middleware |
| TR-04 | IDOR on invoice access | Implement user-scoped queries with RLS | M | Low | Always filter by auth.uid() |
| TR-05 | Authorization bypass | Add ownership verification before payment ops | S | Low | Check user_id matches session |

### High Mitigations (Address in Sprint 1)

| ID | Threat | Mitigation | Effort | Residual Risk | Implementation |
|----|--------|------------|--------|---------------|----------------|
| TR-06 | PII exposure | Implement field-level authorization | M | Medium | Filter response fields by user |
| TR-07 | XSS token theft | Add Content-Security-Policy, HttpOnly cookies | M | Low | Configure CSP in next.config.js |
| TR-08 | Token enumeration | Use unguessable tokens + rate limit | S | Low | UUID v4 + rate limit portal access |
| TR-09 | PII to AI | Sanitize prompts, exclude PII fields | M | Low | Create sanitizeForAI() function |
| TR-10 | Unencrypted bank data | Enable Supabase Vault encryption | S | Low | Use pgcrypto for sensitive columns |
| TR-11 | RLS disabled | Enable RLS on all tables | M | Low | Apply policies to all data tables |
| TR-12 | No rate limiting | Implement Upstash rate limiting | S | Low | Per-user rate limits by Clerk ID |

---

## Section 6: Threat Model Summary

### 6a. Severity Distribution
- **Critical:** 5 threats
- **High:** 7 threats
- **Medium:** 4 threats
- **Low:** 2 threats

### 6b. Top 3 Priority Mitigations
1. **Stripe webhook signature verification** — Prevents forged payment confirmations (Critical)
2. **SQL injection prevention** — Prevents database compromise (Critical)
3. **Row-level security enablement** — Prevents cross-tenant data access (Critical)

### 6c. Security Posture Assessment
- **Overall rating:** Needs Work
- **Key gap:** No input validation, no rate limiting, RLS status unknown
- **Quick wins available:** 7 of 12 threats can be mitigated with low-effort fixes

### 6d. Handoff Notes for Security Architecture Review

| Area | What to Investigate | Priority |
|------|-------------------|----------|
| Stripe integration | Webhook security, PCI-DSS compliance of direct card handling | High |
| Database RLS | Verify RLS policies on all tables, test bypass attempts | High |
| API authorization | Review all endpoints for IDOR, test with multiple users | High |
| AI data handling | Confirm PII sanitization before sending to OpenAI | Medium |
| Cache security | Verify ISR doesn't cache sensitive data | Medium |
