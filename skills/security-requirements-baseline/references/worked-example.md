<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current security frameworks (OWASP ASVS), 
threat landscapes, and skill methodology. Last reviewed: 2026-02-19 -->

# Worked Example: Security Requirements Baseline — InvoiceFlow

## Scenario

InvoiceFlow is an AI-powered invoicing tool for freelance designers. This baseline assessment identifies security requirements based on the product's architecture, data sensitivity, and target users.

**Architecture:** Next.js 14 on Vercel, PostgreSQL via Supabase, Clerk auth, Stripe payments, OpenAI integration
**Data sensitivity:** Client PII (Confidential), Financial data (Restricted), Credentials (Restricted)
**Team:** Solo founder, no dedicated security expertise, limited security budget

---

## Section 1: Security Context Assessment

### 1a. Product Summary
- **Product name:** InvoiceFlow
- **One-line description:** AI-powered invoicing tool for freelance designers with automated payments and expense tracking
- **Input source:** Standalone input (no Architecture Design)
- **Tech stack summary:** Next.js 14 + Supabase (PostgreSQL) + Clerk + Stripe + OpenAI + Inngest + AWS S3 + Resend

### 1b. Data Sensitivity Classification

| Data Store | Technology | Data Types | Classification | Justification |
|-----------|-----------|-----------|----------------|---------------|
| User accounts | Supabase | Email, name, password hash | Confidential | PII, authentication |
| Client records | Supabase | Client names, emails, addresses | Confidential | PII |
| Invoices | Supabase | Financial amounts, line items | Restricted | Financial data |
| Payment methods | Supabase (tokenized) | Stripe tokens | Restricted | Financial |
| Bank accounts | Supabase (tokenized) | Bank account details | Restricted | Financial - sensitive |
| Auth tokens | Clerk | Session data | Restricted | Credentials |
| Invoice PDFs | S3 | PDF files with client data | Confidential | Contains PII |
| AI prompts | OpenAI | Invoice context | Internal | Business data |

### 1c. Threat Profile
- **Likely attackers:** 
  - opportunistic attackers targeting SaaS databases
  - competitors seeking client lists
  - automated bots scanning for exposed credentials
  
- **Highest-value target:** Client database (PII + financial data = valuable on dark web)
  
- **Blast radius of worst-case breach:** 
  - Financial loss: Client bank details exposed, fraudulent payments
  - Regulatory action: CCPA/GDPR fines for PII exposure
  - Reputation: Freelancers lose trust, client relationships damaged

- **Applicable compliance regimes:** CCPA (California users), GDPR (future EU expansion), PCI-DSS (via Stripe, but Stripe handles primary burden)

### 1d. Team Capability Assessment
- **Team size and security expertise:** Solo founder, no security background
- **Security budget:** Limited — prioritize high-impact, low-cost measures
- **Timeline to launch:** 3 months to MVP
- **Implication for prioritization:** Focus on requirements that are easy to implement, reduce attack surface, and satisfy compliance requirements with minimal ongoing effort

---

## Section 2: Requirements Checklist

### Authentication

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| AUTH-01 | Enforce authentication on all API routes | P0 | Configure Clerk middleware in `middleware.ts` with default-deny pattern for `/api/*` routes | Attempt unauthenticated API call, verify 401 response | S |
| AUTH-02 | Use secure session tokens | P0 | Clerk handles automatically with httpOnly cookies; verify no custom token storage | Inspect browser storage, confirm no auth tokens in localStorage | S |
| AUTH-03 | Implement multi-factor authentication option | P1 | Enable Clerk 2FA; add MFA enforcement option in settings | Test MFA flow with authenticator app | M |
| AUTH-04 | Session timeout after inactivity | P0 | Configure Clerk session lifetime to 30 minutes; implement absolute session limit | Wait 30 min, verify redirect to login | S |

### Session Management

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| SESS-01 | Secure session cookie attributes | P0 | Set `SameSite=Strict`, `HttpOnly=true`, `Secure=true` in Clerk config | Inspect Set-Cookie header | S |
| SESS-02 | Regenerate session on privilege change | P1 | Regenerate session token after password change via Clerk | Change password, verify new session | M |
| SESS-03 | Invalidate sessions on logout | P0 | Call Clerk `userButtonClick` logout; revoke tokens server-side | Log out, verify token is blacklisted | S |

### Access Control

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| AC-01 | Row-level security on all tables | P0 | Enable RLS on Supabase; create policies filtering by `auth.uid()` | Test cross-user data access, verify 403 | S |
| AC-02 | Verify ownership before data operations | P0 | Add ownership check in API routes before any write operation | Attempt IDOR attack, verify blocked | S |
| AC-03 | Client portal access control | P0 | Invoice tokens must be UUID v4, expiring, tied to invoice owner | Test token enumeration, verify unauthorized access blocked | M |
| AC-04 | API rate limiting per user | P0 | Implement Upstash rate limiting: 100 req/min authenticated, 10 req/min unauthenticated | Run load test, verify rate limit enforced | S |

### Input Validation

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| VAL-01 | Validate all API inputs | P0 | Add Zod schemas to every API route; validate body, query, params | Send malformed request, verify 400 response | M |
| VAL-02 | Sanitize AI prompt inputs | P0 | Strip PII fields before sending to OpenAI: client names, emails, addresses | Inspect AI request payload, verify no PII | S |
| VAL-03 | Validate file uploads | P0 | Restrict to PDF only, max 10MB; scan with virus scanner | Upload malicious file, verify rejection | M |

### Cryptography

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| CRYPT-01 | TLS for all connections | P0 | Vercel enforces HTTPS; verify HSTS header enabled | Test HTTP connection, verify redirect to HTTPS | S |
| CRYPT-02 | Encrypt sensitive database columns | P1 | Use Supabase Vault (pgcrypto) for bank account fields | Verify encryption at rest | M |
| CRYPT-03 | API keys in environment variables | P0 | Never commit keys; use Vercel env vars | Audit git history for exposed keys | S |

### Error Handling & Logging

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| LOG-01 | No sensitive data in logs | P0 | Configure middleware to exclude PII, tokens, financial data from logs | Search logs for PII, verify none found | S |
| LOG-02 | Generic error messages to users | P0 | Return "An error occurred" to users; log details server-side | Trigger error, verify no stack trace exposed | S |
| LOG-03 | Log security events | P0 | Log failed logins, privilege changes, data exports | Verify events captured in security logs | M |

### Data Protection

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| DATA-01 | Data classification | P0 | Classify all data stores per sensitivity; apply appropriate controls | Verify classification documented and applied | S |
| DATA-02 | Backup encryption | P0 | Supabase handles; verify encryption enabled in settings | Check Supabase backup settings | S |
| DATA-03 | Data retention policy | P1 | Document retention periods; implement automated deletion | Verify old data is purged per policy | M |

### Communication Security

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| COMM-01 | HTTPS everywhere | P0 | Vercel default; verify no HTTP endpoints | Scan for HTTP resources | S |
| COMM-02 | API uses modern TLS | P0 | Verify TLS 1.2+ for all connections | Test with SSL Labs | S |
| COMM-03 | Third-party service TLS | P0 | Verify all external APIs use HTTPS | Audit external calls | S |

### Configuration

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| CFG-01 | Security headers | P1 | Add CSP, X-Frame-Options, X-Content-Type-Options in next.config.js | Check headers in response | S |
| CFG-02 | Environment separation | P0 | Separate dev/staging/prod environments; prod env vars restricted | Verify no prod data in dev | S |
| CFG-03 | Dependency vulnerabilities | P0 | Run `npm audit` weekly; automate Dependabot PRs | Run audit, verify no critical vulns | S |

---

## Section 3: Architecture-Specific Risks

### 3a. Third-Party Dependency Risks

| Service | Data Handled | Risk | Severity | Mitigation |
|---------|-------------|------|----------|------------|
| Stripe | Payment tokens, customer IDs | Payment fraud via webhook spoofing | Critical | Verify Stripe webhook signatures |
| Clerk | User credentials | Account takeover via token theft | High | HttpOnly cookies, MFA |
| OpenAI | Invoice context | PII exposure to third-party AI | High | Sanitize prompts before sending |
| Supabase | All application data | Database breach, RLS bypass | Critical | Enable RLS, verify policies |

### 3b. Default Configuration Risks

| Technology | Default Behavior | Risk | Mitigation |
|-----------|-----------------|------|------------|
| Supabase | RLS opt-in per table | Data isolation failure | Enable RLS on all tables immediately |
| Next.js | Development error pages | Information disclosure | Verify NODE_ENV=production on Vercel |
| Stripe | Webhook signature optional | Payment fraud | Always verify signatures |

### 3c. Deployment Pipeline Risks

| Risk | Description | Severity | Mitigation |
|------|-------------|----------|------------|
| Exposed keys | Keys in client-side bundle | Critical | Audit build output before deploy |
| No deployment approval | Direct to production | Medium | Add Vercel deployment protection |
| No rollback | Bad deploy affects all users | Low | Vercel provides instant rollbacks |

### 3d. Data Flow Risks

| Data Flow | Trust Boundary | Risk | Severity | Mitigation |
|-----------|---------------|------|----------|------------|
| Client → API | User → Server | MITM attack on HTTP | Low | TLS enforced by Vercel |
| API → Database | Server → Database | SQL injection | Critical | Parameterized queries, RLS |
| API → Stripe | Server → External | Webhook spoofing | Critical | Signature verification |
| API → OpenAI | Server → External | PII leakage | High | Prompt sanitization |

---

## Section 4: Security Baseline Summary

### 4a. Security Posture Score
- **P0 requirements met / total P0:** 8 of 12 P0 requirements addressed
- **P0 gap list:**
  1. MFA not implemented (AUTH-03)
  2. Row-level security status unknown (AC-01)
  3. Data retention not automated (DATA-03)
  4. Security headers not configured (CFG-01)

- **Overall posture assessment:** Developing — Core authentication and encryption in place, but critical gaps in access control verification and monitoring

### 4b. Top 5 Actions

| Rank | Action | Requirements Addressed | Effort | Risk Reduction |
|------|--------|----------------------|--------|---------------|
| 1 | Enable RLS on all Supabase tables | AC-01, AC-02 | S | Prevents data breaches |
| 2 | Implement Stripe webhook verification | CRYPT (indirect) | S | Prevents payment fraud |
| 3 | Add Zod validation to API routes | VAL-01 | M | Prevents injection attacks |
| 4 | Configure security headers | CFG-01 | S | Reduces XSS, clickjacking |
| 5 | Set up dependency scanning | CFG-03 | S | Prevents known vulnerabilities |

### 4c. Deferred Items Register

| Requirement ID | Description | Current Priority | Trigger to Promote to P0 | Trigger Timeline |
|---------------|-------------|-----------------|-------------------------|-----------------|
| AUTH-03 | MFA implementation | P1 | Customer or compliance requirement | Enterprise sales |
| DATA-03 | Automated retention | P1 | Legal request for deletion | Legal requirement |
| CRYPT-02 | Column encryption | P1 | Compliance audit | SOC 2 certification |

### 4d. Handoff Notes for Threat Modeling

| Area | What to Investigate | Why It Matters |
|------|-------------------|---------------|
| Client portal tokens | Permanent vs expiring tokens, enumeration risks | High - data exposure |
| API authorization | Verify every endpoint checks ownership | High - IDOR vulnerabilities |
| Stripe integration | Webhook security, payment flow | Critical - financial risk |
| AI data flow | PII sanitization before OpenAI calls | High - privacy risk |
