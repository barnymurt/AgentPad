# Worked Example: Security Architecture Review — InvoiceFlow

## Scenario

InvoiceFlow is an AI-powered invoicing tool for freelance designers. This security architecture review consumes the Architecture Design output (containers, data flows, auth design, tech stack) and a threat model (STRIDE analysis, risk register). The architecture uses Next.js 14 (App Router) + Supabase (PostgreSQL) + Clerk (auth) + Stripe (payments) + Inngest (background jobs) + OpenAI (AI suggestions) + AWS S3 (file storage) + Resend (email).

**Key data handled:** PII (client names, emails, addresses), financial data (invoice amounts, payment history, bank account details for payouts), credentials (password hashes via Clerk, OAuth tokens, Stripe customer IDs).

**Architecture pattern:** Modular Monolith deployed on Vercel.

**Threat model summary (assumed):** STRIDE analysis identified 18 threats across 6 STRIDE categories. Risk register has 12 entries rated Critical (2), High (4), Medium (4), Low (2). Mitigations defined for 9 of 12 risks.

---

## Section 1: Review Scope

### 1a. Architecture Summary
- **Product name:** InvoiceFlow
- **Architecture source:** Architecture Design skill output
- **Architecture pattern:** Modular Monolith (Next.js full-stack on Vercel)
- **Container count:** 5 (Web Application, API Server, Database, Background Jobs, Cache)
- **Tech stack summary:** Next.js 14 + Supabase (PostgreSQL) + Clerk + Stripe + Inngest + OpenAI + S3 + Resend

### 1b. Threat Model Summary
- **Threat model source:** Threat Model skill output
- **STRIDE threats identified:** Spoofing (4), Tampering (3), Repudiation (2), Information Disclosure (4), Denial of Service (3), Elevation of Privilege (2) — 18 total
- **Risk register entries:** 12 total — Critical (2), High (4), Medium (4), Low (2)
- **Threat model gaps:** AI prompt injection not modeled in STRIDE (emerging threat category). Supply chain attacks on npm dependencies not explicitly addressed. Insider threat (compromised founder credentials) not modeled.

### 1c. Scope Boundaries
- **Components reviewed:** Web Application (Next.js), API Server (Next.js API Routes), Database (PostgreSQL via Supabase), Background Jobs (Inngest), Cache (Next.js ISR + Supabase pooling), AWS S3, Clerk, Stripe, OpenAI API, Resend
- **User flows reviewed:** Invoice creation and send, Client invoice view and payment, Recurring invoice auto-generation
- **Excluded from review:** Infrastructure sizing (deferred decision), detailed database schema (Batch 6 scope), mobile application (not yet planned), CI/CD pipeline (not specified in architecture)

---

## Section 2: Per-Component Security Assessment

### Container: Web Application (Next.js 14)

**Technology:** Next.js 14 (App Router) with React, TypeScript, Tailwind CSS on Vercel
**Responsibility:** Serve the freelancer dashboard and client invoice portal as a web UI

**Findings:**

| # | Domain | Finding | Severity | CWE | Related Threat | Remediation |
|---|--------|---------|----------|-----|----------------|-------------|
| W1 | Auth | Client portal invoice URLs use UUID v4 tokens with no expiration — tokens are permanent and cannot be revoked without database changes | High | CWE-613 | TM-S1: Spoofing client identity on invoice portal | Add `expires_at` timestamp column to invoice tokens in Supabase; generate new tokens with 30-day expiry; add Inngest cron job to rotate expired tokens |
| W2 | Data | Sensitive invoice data (amounts, client names) may be cached in Vercel's CDN edge cache for ISR pages if cache headers are misconfigured | Medium | CWE-524 | TM-ID2: Information disclosure via cached financial data | Set `Cache-Control: private, no-store` on all API responses containing financial data; configure ISR to exclude invoice detail pages |
| W3 | Infrastructure | No Content Security Policy (CSP) header configured — allows potential XSS execution and data exfiltration | Medium | CWE-693 | TM-T2: Tampering via injected scripts | Add CSP header in `next.config.js`: `default-src 'self'; script-src 'self' https://clerk.com; connect-src 'self' https://*.supabase.co https://api.stripe.com` |
| W4 | Error Handling | Next.js default error page in development mode shows stack traces — must verify production build strips these | Low | CWE-209 | TM-ID1: Information disclosure via error messages | Verify `NODE_ENV=production` on Vercel (default); add custom error boundary in `app/error.tsx` that shows user-friendly message |

**Assessment:** The Web Application benefits from Next.js's built-in CSRF protection and Vercel's HTTPS enforcement. The main weaknesses are around the client portal's permanent token scheme (High severity) and missing security headers. The ISR caching concern is Medium because misconfiguration is possible but not certain — needs verification during implementation.

---

### Container: API Server (Next.js API Routes)

**Technology:** Next.js API Routes (co-located with Web Application), serverless on Vercel
**Responsibility:** Handle business logic, data validation, orchestrate external service calls

**Findings:**

| # | Domain | Finding | Severity | CWE | Related Threat | Remediation |
|---|--------|---------|----------|-----|----------------|-------------|
| A1 | API | No input validation schema defined for API routes — architecture specifies endpoints but not validation approach | High | CWE-20 | TM-T1: Tampering with invoice data via malformed API requests | Add Zod schema validation to every API route using `zod` + Next.js middleware; validate all request bodies, query params, and path params at the API boundary |
| A2 | Auth | Rate limiting specified as "100 req/min per user" but no implementation approach defined — Vercel's built-in rate limiting is per-IP, not per-user | High | CWE-307 | TM-DoS1: Denial of service via brute force on API endpoints | Implement per-Clerk-user-ID rate limiting using `@upstash/ratelimit` with Redis (Upstash free tier); set 100 req/min for authenticated, 10 req/min for unauthenticated endpoints |
| A3 | API | Stripe webhook endpoint (`/api/webhooks/stripe`) — architecture mentions webhook processing but does not specify signature validation | Critical | CWE-345 | TM-S2: Spoofing Stripe webhook events to mark invoices as paid | Implement Stripe webhook signature verification using `stripe.webhooks.constructEvent()` with the webhook signing secret from environment variables; reject requests with invalid signatures with 400 status |
| A4 | API | AI suggestion endpoint (`/api/ai/suggest`) sends invoice context to OpenAI — no specification of what data is included or excluded | Medium | CWE-359 | TM-ID3: Information disclosure of PII to third-party AI | Define an allowlist of fields sent to OpenAI: line item descriptions, quantities, and rates only. Exclude client names, emails, addresses, and financial identifiers. Implement a `sanitizeForAI()` function in the AI module |
| A5 | Auth | Clerk middleware validation approach not specified — if middleware is not applied to all API routes, some routes may be unprotected | High | CWE-862 | TM-EP1: Elevation of privilege via unprotected API route | Configure Clerk middleware in `middleware.ts` with a default-deny pattern: all `/api/*` routes require authentication except explicitly listed public routes (`/api/webhooks/*`, `/api/invoices/[token]`) |
| A6 | API | No mass assignment protection specified — API routes may accept and persist unexpected fields | Medium | CWE-915 | TM-T1: Tampering with invoice data | Use Zod schemas (from A1) to strip unknown fields; only pick validated fields when writing to Supabase |

**Assessment:** The API Server has the highest concentration of findings because it is the primary trust boundary between untrusted client input and backend systems. The missing Stripe webhook signature validation (Critical) is the most urgent finding — without it, an attacker can forge payment confirmation events. Input validation and rate limiting gaps (both High) are the next priorities. The co-located architecture means these fixes apply to a single codebase, reducing implementation effort.

---

### Container: Database (PostgreSQL via Supabase)

**Technology:** PostgreSQL 15 via Supabase (managed)
**Responsibility:** Persist all application data — users, invoices, clients, payments, expenses

**Findings:**

| # | Domain | Finding | Severity | CWE | Related Threat | Remediation |
|---|--------|---------|----------|-----|----------------|-------------|
| D1 | Auth | Row-Level Security (RLS) is available in Supabase but opt-in per table — architecture mentions RLS but does not confirm it is enabled on all tables containing user data | High | CWE-639 | TM-EP2: Elevation of privilege via cross-tenant data access | Enable RLS on all tables: `ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;` Create policies: `CREATE POLICY "Users see own data" ON invoices FOR ALL USING (user_id = auth.uid());` Apply to: invoices, clients, payments, expenses, recurring_templates |
| D2 | Data | Bank account details for payouts stored in PostgreSQL — architecture classifies as Confidential but no column-level encryption specified | High | CWE-312 | TM-ID4: Information disclosure of bank account data via database breach | Encrypt `bank_account_number` and `routing_number` columns using Supabase Vault (pgcrypto extension) or application-level encryption with a KMS-managed key stored in environment variable |
| D3 | Data | Supabase free tier uses shared infrastructure — financial data on shared database server | Medium | CWE-311 | TM-ID4: Information disclosure via shared infrastructure | Upgrade to Supabase Pro ($25/mo) before accepting paying users; Pro provides dedicated compute and SOC 2 compliance. Architecture already flags this in risk register |
| D4 | Infrastructure | Supabase `service_role` key bypasses RLS — if exposed client-side, all tenant isolation is void | Critical | CWE-798 | TM-EP2: Elevation of privilege via leaked service role key | Verify `service_role` key is ONLY used in server-side code (API routes, Inngest functions). Use `anon` key for client-side Supabase client. Add `.env` validation to reject builds where service_role key appears in client bundles |

**Assessment:** The Database container's security depends heavily on Supabase RLS being correctly configured. The Supabase `service_role` key exposure risk (Critical) and the RLS enablement gap (High) are the two most important findings. Bank account encryption (High) is essential given the financial data sensitivity. Supabase's managed infrastructure provides solid baseline security (automated backups, TLS, connection pooling), but these benefits are undermined if RLS is not enabled or if the service_role key leaks to the client.

---

### Container: Background Jobs (Inngest)

**Technology:** Inngest (serverless event-driven functions)
**Responsibility:** Handle async work — send invoice emails, generate PDFs, process Stripe webhooks, trigger recurring invoices

**Findings:**

| # | Domain | Finding | Severity | CWE | Related Threat | Remediation |
|---|--------|---------|----------|-----|----------------|-------------|
| B1 | Auth | Inngest function invocations are not authenticated by default — if the Inngest endpoint URL is discovered, events could be injected | Medium | CWE-306 | TM-S3: Spoofing background job events | Configure Inngest signing key verification in the serve handler; use `INNGEST_SIGNING_KEY` environment variable. Inngest SDK v3+ validates signatures by default when the key is configured |
| B2 | Data | PDF invoices generated by background jobs contain full client PII and financial amounts — PDFs stored in S3 must have correct access controls | Medium | CWE-732 | TM-ID2: Information disclosure via improperly secured PDF files | Verify S3 bucket policy is private; generate presigned URLs with 1-hour expiry for PDF access; never serve PDFs through a public URL pattern |
| B3 | Error Handling | Failed background jobs (email send failures, PDF generation errors) may log full invoice data including client PII | Medium | CWE-532 | TM-ID1: Information disclosure via log files | Implement log sanitization in Inngest function error handlers; log invoice_id and error type only, not invoice contents. Configure Inngest to redact event payloads in the dashboard |

**Assessment:** Background Jobs have a moderate risk profile. The Inngest signing key configuration (Medium) is straightforward to implement. The main concerns are about data handling in logs and generated artifacts (PDFs) rather than the job execution platform itself. Inngest's durable execution and retry mechanism adds reliability but also means sensitive data may be reprocessed and re-logged on retries.

---

### Container: Cache (Next.js ISR + Supabase Pooling)

**Technology:** Next.js ISR (Incremental Static Regeneration) + Supabase connection pooling
**Responsibility:** Cache dashboard aggregations and frequently-read data

**Findings:**

| # | Domain | Finding | Severity | CWE | Related Threat | Remediation |
|---|--------|---------|----------|-----|----------------|-------------|
| C1 | Data | ISR-cached pages could serve stale financial data if cache invalidation fails after a payment webhook | Low | CWE-524 | TM-ID2: Information disclosure of outdated financial state | Implement on-demand ISR revalidation triggered by Stripe webhook handler; call `revalidatePath('/dashboard')` after payment status update. Set ISR `revalidate` to 60 seconds as fallback |

**Assessment:** The Cache layer is low risk because it is ephemeral and does not persist sensitive data. The main concern is correctness (stale financial data) rather than security. The finding is Low severity because stale data in this context is a UX issue — the source of truth (database) remains accurate.

---

## Section 3: Authentication Flow Review

### 3a. User Types and Auth Methods
| User Type | Auth Method | Auth Provider | Session Type | Token Lifetime |
|-----------|------------|---------------|-------------|----------------|
| Freelancer | Email/password + Google OAuth | Clerk | JWT in httpOnly cookie | 5 min access / automatic refresh |
| Client (invoice recipient) | Unauthenticated — token-based access | Custom (UUID v4 in URL) | None (stateless) | No expiration (current) |

### 3b. Auth Flow Analysis

**User Type: Freelancer**

```
Step 1: Freelancer navigates to /login → Web App | Security control: HTTPS enforced by Vercel
Step 2: Clerk login widget renders → Clerk SDK | Security control: Clerk handles credential validation, rate limiting, brute force protection
Step 3: Successful auth → Clerk issues JWT → stored in httpOnly cookie | Security control: httpOnly prevents XSS token theft; Secure flag prevents HTTP transmission
Step 4: Freelancer navigates to /dashboard → Web App | Security control: Clerk middleware validates JWT on every request
Step 5: Web App calls /api/invoices → API Server | Security control: Clerk middleware extracts user_id from JWT; Supabase RLS filters to user's data
Step 6: API Server queries Supabase → Database | Security control: RLS policy enforces user_id = auth.uid()
```

**Failure paths reviewed:**
- What happens when the JWT expires mid-request? Clerk SDK automatically refreshes tokens using a refresh token stored in a separate httpOnly cookie. If refresh fails, user is redirected to login. **Adequately handled** by Clerk's default behavior.
- What happens when a freelancer tries to access another user's invoice via `/api/invoices/[id]`? Supabase RLS filters results to the authenticated user's data. However, **if RLS is not enabled on all tables (Finding D1), this protection is absent.** The API route must ALSO validate ownership (`WHERE user_id = currentUser.id`) as defense-in-depth.
- What happens after N failed login attempts? Clerk implements progressive rate limiting and CAPTCHA after 5 failed attempts. **Adequately handled** by Clerk.
- What happens if a freelancer's Clerk account is deleted/suspended? Active sessions continue until JWT expires (5 min). **Finding: No real-time session revocation mechanism.** Severity: Low — 5-minute window is acceptable for this threat profile.

**User Type: Client (Invoice Recipient)**

```
Step 1: Client clicks invoice link in email → /i/[invoiceToken] → Web App | Security control: HTTPS enforced
Step 2: Web App calls /api/invoices/[token] → API Server | Security control: Token is UUID v4 (non-guessable)
Step 3: API Server queries Supabase for invoice matching token → Database | Security control: Token lookup only (no user auth required)
Step 4: Invoice rendered read-only → Client | Security control: No edit capabilities exposed
Step 5: Client clicks "Pay" → redirected to Stripe Checkout | Security control: Payment handled entirely by Stripe (PCI DSS Level 1)
```

**Failure paths reviewed:**
- What happens if an attacker brute-forces invoice tokens? UUID v4 has 122 bits of entropy — brute force is computationally infeasible. However, **rate limiting on the token lookup endpoint is essential (Finding A2)** to prevent enumeration attempts from generating excessive database load.
- What happens if an invoice token is shared or leaked? The token grants read-only access to that single invoice and a Stripe Checkout redirect. **No mechanism to revoke the token (Finding W1).** If a token is compromised, the invoice details (amounts, client info) are exposed indefinitely.
- What happens if a client modifies the Stripe Checkout amount? Stripe Checkout sessions are created server-side with the correct amount. Client cannot modify the amount on the Stripe-hosted page. **Adequately handled** by Stripe's architecture.

### 3c. Session Management Assessment
- **Session creation:** Clerk creates a JWT session upon successful authentication. JWT contains user_id, organization_id (if applicable), and session metadata. No sensitive data in JWT payload.
- **Session storage:** JWT stored in httpOnly, Secure, SameSite=Lax cookie. Refresh token in a separate httpOnly cookie. Not accessible via JavaScript (XSS-resistant).
- **Session refresh:** Clerk SDK automatically refreshes access tokens using the refresh token before expiry. Refresh tokens are rotated on each use (Clerk's default behavior).
- **Session invalidation:** Clerk supports server-side session revocation via the Clerk API. However, the architecture does not specify a "revoke all sessions" flow for the user (settings page) or admin (user management). Invalidation relies on JWT expiry (5 min) plus Clerk's revocation API.
- **Cross-device behavior:** Clerk allows multiple active sessions across devices. No limit on concurrent sessions specified in the architecture. Users can view active sessions via Clerk's UserProfile component.

### 3d. Auth Findings Summary
| # | Finding | Severity | Related Threat | Remediation |
|---|---------|----------|----------------|-------------|
| AUTH-1 | Client portal tokens have no expiration — leaked tokens provide permanent access | High | TM-S1: Spoofing client identity | Add `expires_at` to invoice tokens (30-day expiry); add token regeneration endpoint for freelancers |
| AUTH-2 | No rate limiting on client portal token lookup endpoint | High | TM-DoS1: Denial of service via enumeration | Implement per-IP rate limiting (10 req/min) on `/api/invoices/[token]` using `@upstash/ratelimit` |
| AUTH-3 | Clerk middleware default-deny not confirmed for all API routes | High | TM-EP1: Unprotected API routes | Configure `authMiddleware` in `middleware.ts` with explicit public routes whitelist |
| AUTH-4 | No "revoke all sessions" UI exposed to freelancers | Low | TM-S1: Persistence after account compromise | Add "Sign out all devices" button to /settings using `clerk.user.sessions` API |

---

## Section 4: API Security Review

### 4a. Endpoint Categorization
| Category | Endpoints | Auth Required | Example |
|----------|-----------|--------------|---------|
| Public | `/api/webhooks/stripe`, `/api/invoices/[token]` (read-only), `/api/health` | None | Client viewing an invoice via shared link |
| Authenticated | `/api/invoices`, `/api/clients`, `/api/payments`, `/api/ai/suggest`, `/api/expenses` | Clerk JWT (user-level) | Freelancer creating an invoice |
| Privileged | None at MVP | N/A | N/A — solo user, no admin panel. Revisit when team features are added |

### 4b. Per-Category Security Assessment

**Category: Public**

| Control | Status | Details |
|---------|--------|---------|
| Input validation | Partial | Stripe webhook body is parsed but validation depends on signature check (Finding A3). Invoice token endpoint accepts only a UUID path parameter — minimal input surface |
| Output filtering | Partial | Invoice token endpoint returns full invoice details to unauthenticated users. Verify only necessary fields are returned (no internal IDs, user settings, or other invoices) |
| Rate limiting | Missing | No per-IP rate limiting specified for public endpoints. Webhook endpoints should limit to Stripe's known IP ranges or rely on signature validation |
| Error handling | Unknown | Must verify that invalid token lookups return consistent 404 (not different errors for "token not found" vs "invoice deleted") |
| CORS policy | Partial | Webhook endpoints should not need CORS. Invoice portal pages should have restrictive CORS |

**Category: Authenticated**

| Control | Status | Details |
|---------|--------|---------|
| Input validation | Missing | No input validation schema defined for any authenticated endpoint (Finding A1). Zod schemas needed for all request bodies |
| Output filtering | Partial | Supabase RLS prevents cross-tenant data in queries, but API routes may return full database rows including internal fields (created_at, internal_status, supabase metadata) |
| Rate limiting | Missing | Per-user rate limiting not implemented (Finding A2). Architecture specifies 100 req/min but no implementation |
| Error handling | Unknown | Must verify API routes return consistent error format. Next.js API routes default to returning stack traces in development |
| CORS policy | Implemented | Next.js same-origin by default for API routes. Vercel deployment enforces this |

### 4c. Webhook Security Assessment
| Endpoint | Source | Signature Validation | Replay Protection | Idempotency |
|----------|--------|---------------------|-------------------|-------------|
| `/api/webhooks/stripe` | Stripe | Not specified (Finding A3) | Not specified — Stripe includes timestamp in signature; must verify within tolerance | Not specified — must implement idempotency key tracking to prevent duplicate payment processing |

### 4d. API Findings Summary
| # | Finding | Severity | Related Threat | Remediation |
|---|---------|----------|----------------|-------------|
| API-1 | Stripe webhook signature validation not specified | Critical | TM-S2: Forged payment events | Implement `stripe.webhooks.constructEvent()` with signing secret |
| API-2 | No input validation framework for API routes | High | TM-T1: Malformed API requests | Add Zod schema validation to all API routes |
| API-3 | Per-user rate limiting not implemented | High | TM-DoS1: API abuse | Implement `@upstash/ratelimit` per Clerk user ID |
| API-4 | PII potentially sent to OpenAI in AI suggestion requests | Medium | TM-ID3: PII disclosure to third party | Implement `sanitizeForAI()` allowlist function |
| API-5 | No idempotency handling for Stripe webhooks | Medium | TM-T3: Duplicate payment processing | Track processed webhook event IDs in Supabase; skip duplicates |
| API-6 | Mass assignment not prevented on API routes | Medium | TM-T1: Unexpected field injection | Use Zod `.pick()` or `.strip()` to filter request bodies |

---

## Section 5: Third-Party Dependency Assessment

### Service: Clerk (Authentication)

| Field | Value |
|-------|-------|
| **Purpose** | User authentication, session management, user profile management for freelancers |
| **Data accessed** | Email addresses, password hashes, OAuth tokens, session tokens, user profile metadata |
| **Data sensitivity** | Restricted (credentials and session tokens) |
| **Security certifications** | SOC 2 Type II |
| **Breach history** | No known breaches |
| **DPA in place** | Available on request (Clerk Pro plan); must be signed before launch |
| **Blast radius if compromised** | All freelancer accounts compromised. Attacker could impersonate any user, access all invoices and financial data. Complete system compromise. |
| **Contractual protections** | 72-hour breach notification (SOC 2 requirement). Data export available for migration. |
| **Risk level** | Critical — single point of failure for all authentication. Mitigated by SOC 2 compliance and standard OIDC, which enables migration to Auth0 if needed. |

### Service: Stripe (Payments)

| Field | Value |
|-------|-------|
| **Purpose** | Payment processing, subscription billing, webhook delivery for payment events |
| **Data accessed** | Payment amounts, customer IDs, invoice metadata, payment method tokens (card data handled by Stripe, never touches InvoiceFlow) |
| **Data sensitivity** | Restricted (payment data) |
| **Security certifications** | PCI DSS Level 1 (highest level), SOC 2 Type II, ISO 27001 |
| **Breach history** | No known breaches of payment data |
| **DPA in place** | Included in Stripe's standard terms of service |
| **Blast radius if compromised** | Payment data exposed (amounts, customer IDs). InvoiceFlow does not store card numbers — those remain in Stripe. Fraudulent payment confirmations possible if webhook secret is also leaked. |
| **Contractual protections** | PCI DSS compliance mandates breach notification, incident response, and annual audits. |
| **Risk level** | Medium — industry-leading security posture. Risk is primarily in InvoiceFlow's integration (webhook validation, API key management), not Stripe itself. |

### Service: Supabase (Database + Infrastructure)

| Field | Value |
|-------|-------|
| **Purpose** | Managed PostgreSQL database, row-level security, real-time subscriptions, connection pooling |
| **Data accessed** | All application data: user profiles, client PII, invoice details, payment records, bank account details, expense data |
| **Data sensitivity** | Restricted (contains most sensitive data across all categories) |
| **Security certifications** | SOC 2 Type II (Pro plan and above) |
| **Breach history** | No known breaches |
| **DPA in place** | Available on Pro plan; must be signed before launch given PII and financial data |
| **Blast radius if compromised** | Complete data breach — all user data, client PII, financial records, bank account details exposed. Most severe blast radius of any dependency. |
| **Contractual protections** | SOC 2 breach notification. Data export and deletion available. |
| **Risk level** | Critical — holds all sensitive data. Mitigated by PostgreSQL portability (can migrate to self-hosted or AWS RDS). Risk elevated on free tier (shared infrastructure); must upgrade to Pro before accepting paying users. |

### Service: OpenAI (AI Line-Item Suggestions)

| Field | Value |
|-------|-------|
| **Purpose** | Generate AI-powered line-item suggestions for invoices based on context |
| **Data accessed** | Invoice context sent via API — currently unspecified what fields are included (Finding A4) |
| **Data sensitivity** | Potentially Confidential if PII is included; should be Internal after sanitization |
| **Security certifications** | SOC 2 Type II |
| **Breach history** | No known breaches of API customer data. Data usage policies updated in 2023 — API data not used for training by default. |
| **DPA in place** | Available; must be signed given potential PII exposure |
| **Blast radius if compromised** | Limited if data sanitization is implemented (Finding A4) — only line item descriptions and amounts exposed. If PII is included, client names and contact details exposed. |
| **Contractual protections** | API data not used for training (opt-out by default for API customers). Data retention: 30 days for abuse monitoring, then deleted. |
| **Risk level** | Medium — low blast radius IF data sanitization is implemented. Elevated to High if PII is sent in prompts without sanitization. |

### Service: AWS S3 (File Storage)

| Field | Value |
|-------|-------|
| **Purpose** | Store generated PDF invoices and user-uploaded logos |
| **Data accessed** | PDF invoices (contain client PII + financial data), user logo images |
| **Data sensitivity** | Confidential (PDF invoices contain PII and financial amounts) |
| **Security certifications** | SOC 2 Type II, ISO 27001, FedRAMP (AWS overall) |
| **Breach history** | No S3 service-level breaches. Numerous customer misconfigurations leading to public bucket exposure (not AWS's fault). |
| **DPA in place** | Included in AWS Data Processing Addendum (standard) |
| **Blast radius if compromised** | All generated PDF invoices exposed — contains client names, addresses, invoice amounts. User logos exposed (low sensitivity). |
| **Contractual protections** | AWS shared responsibility model. S3 provides server-side encryption (AES-256). Customer responsible for bucket policies and access management. |
| **Risk level** | Medium — robust service with strong security posture. Risk is in misconfiguration (public buckets, overly permissive presigned URLs), not S3 itself. Architecture specifies private bucket + presigned URLs, which is correct. |

### Supply Chain Assessment
- **Dependency management:** Architecture uses Next.js (npm ecosystem). Lockfile (`package-lock.json`) should be committed. Versions not specified as pinned or ranged.
- **Vulnerability scanning:** Not specified in architecture. Must configure `npm audit` in CI/CD and add Dependabot or Snyk to the GitHub repository.
- **Update cadence:** Not specified. Recommend automated PRs for security patches (Dependabot) with manual review for major version updates.

---

## Section 6: Remediation Plan

### 6a. All Findings Prioritized

| Rank | Finding | Severity | Component | Related Threat | Remediation Action | Effort | Priority Score |
|------|---------|----------|-----------|----------------|-------------------|--------|---------------|
| 1 | A3: Stripe webhook signature validation missing | Critical | API Server | TM-S2 | Implement `stripe.webhooks.constructEvent()` with `STRIPE_WEBHOOK_SECRET` env var; reject invalid signatures with 400 | S | 12 |
| 2 | D4: Supabase service_role key may leak to client | Critical | Database | TM-EP2 | Audit all Supabase client instantiations; use `anon` key in client components, `service_role` only in API routes and Inngest; add build-time env validation | S | 12 |
| 3 | D1: RLS not confirmed enabled on all tables | High | Database | TM-EP2 | Enable RLS on all tables with user data; create `user_id = auth.uid()` policies on invoices, clients, payments, expenses, recurring_templates | S | 9 |
| 4 | A5: Clerk middleware default-deny not confirmed | High | API Server | TM-EP1 | Configure `authMiddleware()` in `middleware.ts` with `publicRoutes: ['/api/webhooks/(.*)', '/api/invoices/[token]', '/api/health']`; all other routes require auth | S | 9 |
| 5 | A1: No input validation on API routes | High | API Server | TM-T1 | Add `zod` dependency; create validation schemas for each API route; validate in route handler before any database operation | M | 6 |
| 6 | A2: Per-user rate limiting not implemented | High | API Server | TM-DoS1 | Add `@upstash/ratelimit` with Upstash Redis (free tier); wrap API routes with rate limit middleware; 100 req/min authenticated, 10 req/min unauthenticated | M | 6 |
| 7 | W1/AUTH-1: Client portal tokens never expire | High | Web App | TM-S1 | Add `expires_at` column to invoices table; set 30-day expiry on new tokens; add token regeneration API endpoint; add Inngest job to notify before expiry | M | 6 |
| 8 | D2: Bank account details not encrypted at column level | High | Database | TM-ID4 | Enable pgcrypto extension in Supabase; encrypt `bank_account_number` and `routing_number` using `pgp_sym_encrypt()` with KMS-managed key | M | 6 |
| 9 | A4: PII potentially sent to OpenAI | Medium | API Server | TM-ID3 | Create `sanitizeForAI(invoice)` function that returns only `{lineItems: [{description, quantity, rate}]}` — no client PII, no financial identifiers | S | 6 |
| 10 | API-5: No webhook idempotency handling | Medium | API Server | TM-T3 | Track processed Stripe event IDs in a `webhook_events` table; check before processing; skip duplicates | S | 6 |
| 11 | A6: Mass assignment not prevented | Medium | API Server | TM-T1 | Use Zod `.pick()` in route handlers to select only expected fields; discard extra fields before database write | S | 6 |
| 12 | W3: No CSP header configured | Medium | Web App | TM-T2 | Add `Content-Security-Policy` header in `next.config.js` `headers()` config with restrictive policy | S | 6 |
| 13 | B1: Inngest signing key not confirmed | Medium | Background Jobs | TM-S3 | Set `INNGEST_SIGNING_KEY` environment variable in Vercel; Inngest SDK v3 validates automatically | S | 6 |
| 14 | D3: Supabase free tier shared infrastructure | Medium | Database | TM-ID4 | Upgrade to Supabase Pro ($25/mo) before onboarding paying users; provides dedicated compute + SOC 2 | S | 6 |
| 15 | B2: PDF storage access controls unverified | Medium | Background Jobs | TM-ID2 | Verify S3 bucket Block Public Access is enabled; confirm presigned URL generation uses 1-hour expiry; never generate public URLs | S | 6 |
| 16 | B3: PII in background job logs | Medium | Background Jobs | TM-ID1 | Add log sanitization middleware to Inngest functions; log only `{invoiceId, eventType, error.message}`, not invoice payload | S | 6 |
| 17 | W2: ISR caching of financial data | Medium | Web App | TM-ID2 | Set `Cache-Control: private, no-store` on API responses with financial data; configure ISR to exclude `/invoices/[id]` detail pages | S | 6 |
| 18 | W4: Production error page verification | Low | Web App | TM-ID1 | Add custom `app/error.tsx` boundary; verify `NODE_ENV=production` in Vercel deployment | S | 3 |
| 19 | C1: ISR cache invalidation on payment | Low | Cache | TM-ID2 | Add `revalidatePath('/dashboard')` call in Stripe webhook handler after payment status update | S | 3 |
| 20 | AUTH-4: No "revoke all sessions" UI | Low | Web App | TM-S1 | Add "Sign out all devices" button to /settings using Clerk's `user.sessions` API | S | 3 |

### 6b. Remediation Phases

**Phase 1: Fix Before Launch (Priority Score 9-12)**
1. Implement Stripe webhook signature validation (A3) — 1 hour
2. Audit and secure Supabase service_role key usage (D4) — 2 hours
3. Enable RLS on all user-data tables (D1) — 2 hours
4. Configure Clerk middleware default-deny (A5) — 1 hour

**Phase 2: Fix Within 1 Month (Priority Score 5-8)**
5. Add Zod input validation to all API routes (A1) — 1-2 days
6. Implement per-user rate limiting with Upstash (A2) — 3 hours
7. Add token expiration to client portal (W1/AUTH-1) — 4 hours
8. Encrypt bank account fields in database (D2) — 4 hours
9. Implement AI data sanitization (A4) — 2 hours
10. Add webhook idempotency tracking (API-5) — 2 hours
11. Prevent mass assignment via Zod (A6) — included in A1
12. Add CSP header (W3) — 1 hour
13. Configure Inngest signing key (B1) — 30 minutes
14. Upgrade Supabase to Pro (D3) — 30 minutes
15. Verify S3 bucket access controls (B2) — 1 hour
16. Sanitize background job logs (B3) — 2 hours
17. Configure ISR cache controls for financial data (W2) — 1 hour

**Phase 3: Fix Within 3 Months (Priority Score 3-4)**
18. Add custom error boundary (W4) — 30 minutes
19. Add ISR revalidation on payment webhook (C1) — 30 minutes
20. Add "revoke all sessions" UI (AUTH-4) — 2 hours

**Phase 4: Fix When Convenient (Priority Score 1-2)**
No findings in this phase.

---

## Section 7: Review Summary

### 7a. Findings by Severity
| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 6 |
| Medium | 10 |
| Low | 3 |
| **Total** | **21** |

### 7b. Top 3 Critical Findings

1. **Missing Stripe webhook signature validation (A3):** The `/api/webhooks/stripe` endpoint does not validate Stripe's webhook signature, allowing an attacker to forge payment confirmation events and mark invoices as paid without actual payment. Component: API Server. Remediation: Implement `stripe.webhooks.constructEvent()` with the webhook signing secret. Why it matters: Direct financial loss — freelancers would believe they've been paid when they haven't.

2. **Supabase service_role key exposure risk (D4):** The Supabase `service_role` key bypasses all Row-Level Security policies. If this key is accidentally included in client-side code (Next.js client components), any user can access all data for all tenants. Component: Database. Remediation: Audit all Supabase client instantiations; use `anon` key client-side, `service_role` only in server-side code; add build-time validation. Why it matters: Complete tenant isolation bypass — one user can access every other user's invoices, clients, and financial data.

3. **Row-Level Security not confirmed on all tables (D1):** The architecture mentions Supabase RLS but does not confirm it is enabled on every table containing user data. RLS is opt-in per table in Supabase — if any table is missed, that table's data is accessible to any authenticated user. Component: Database. Remediation: Enable RLS on all tables and create user_id-based policies. Why it matters: Cross-tenant data access — a freelancer could query another freelancer's clients and invoices.

### 7c. Overall Security Architecture Assessment

- **Posture rating:** **Weak** (2 Critical findings)
- **Posture justification:** The architecture has 2 Critical findings (Stripe webhook validation and Supabase service_role key exposure) that could be exploited to cause direct financial harm or complete data breach. However, both Critical findings are low-effort fixes (< 2 hours each), and the architecture makes fundamentally sound decisions — delegating auth to Clerk, payments to Stripe, and using Supabase RLS for tenant isolation. The "Weak" rating reflects the current unmitigated state, not the architecture's design quality. After Phase 1 remediation (approximately 6 hours of work), the posture would upgrade to Adequate.
- **Strengths:**
  - Authentication delegated to Clerk (SOC 2, best-practice session management, no custom auth vulnerabilities)
  - Payment processing handled entirely by Stripe (PCI DSS Level 1) — InvoiceFlow never touches card data
  - Supabase RLS provides database-level tenant isolation (when enabled)
  - Modular monolith architecture reduces attack surface compared to distributed microservices (fewer network interfaces, simpler auth propagation)
- **Key weaknesses:**
  - Critical integration points (webhooks, service keys) lack validation in the architecture specification
  - No input validation framework defined — every API endpoint is potentially vulnerable to injection and mass assignment
  - Client portal token scheme has no expiration or revocation, creating persistent access risk
  - Third-party data handling not specified for OpenAI integration (potential PII leakage)

### 7d. Handoff Notes

- **For Data Protection Assessment:** Bank account data encryption approach needs detailed specification (column-level vs. application-level, key management strategy, key rotation). Supabase data residency must be evaluated for EU freelancers (GDPR). PDF invoice retention policy needs definition (currently indefinite — regulatory minimum is 7 years for tax records, but maximum should also be defined). Log data retention and sanitization across all containers needs a unified policy.

- **For implementation team:** Phase 1 findings (A3, D4, D1, A5) are all configuration and integration fixes — no architectural changes required. Phase 2 findings are primarily additive (adding validation, rate limiting, encryption) and can be implemented incrementally per API route. The input validation work (A1) should be done first as it establishes patterns that other fixes (A6, A4) build upon. Estimated total effort for Phase 1 + Phase 2: 3-5 developer days for a solo founder.

- **For threat model update:** Three new threats to add: (1) AI prompt injection via malicious invoice descriptions manipulating line-item suggestions (Tampering + Information Disclosure), (2) Supply chain attack via compromised npm dependency in the Next.js build (Tampering), (3) Insider threat via compromised founder credentials granting access to all services simultaneously (Spoofing + Elevation of Privilege). Additionally, the threat model should add Inngest endpoint injection (Spoofing, Medium severity) as a new entry.
