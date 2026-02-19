# Security Architecture Review Framework

This framework defines the systematic review methodology used by the Security Architecture Review skill. It is derived from the OWASP Top 10, CWE Top 25, and OWASP ASVS, adapted for early-stage SaaS products at the architecture (Container) level.

---

## Review Methodology

The review follows a **checklist-based, domain-by-domain** approach. For each review domain, apply the corresponding checklist against every relevant architectural component. The methodology is:

1. **Scope** — identify which containers, data flows, and dependencies are subject to this domain
2. **Question** — ask the review questions for the domain against each component
3. **Assess** — classify findings by severity
4. **Link** — connect each finding to a threat model entry (STRIDE category + risk register item)
5. **Recommend** — produce a tech-stack-specific remediation action

This is not a penetration test. It is a design-level review that identifies architectural security weaknesses before code is written or deployed.

---

## Review Domains

### Domain 1: Authentication & Session Management

**Scope:** Auth provider integration, login flows, session/token lifecycle, account recovery

**Review questions:**
- How are user credentials validated? Is the auth provider handling password hashing and storage, or is it custom?
- What login methods are supported (email/password, social OAuth, magic link, SSO)? Are all methods equally secure?
- How are sessions created? What token type (JWT, opaque session token, cookie)?
- What is the token lifetime? Are refresh tokens used? Are they rotated on use?
- How is session invalidation handled? Can an admin revoke all sessions for a user?
- What happens after N failed login attempts? Is there lockout or progressive delay?
- How does account recovery work? Can it be used to take over accounts?
- For multi-device sessions, is there visibility and control?

**What to look for:**
- Long-lived JWTs without refresh rotation (CWE-613: Insufficient Session Expiration)
- Auth provider misconfiguration (overly permissive OAuth scopes, missing state parameter)
- Session tokens in URL parameters or local storage (CWE-598, CWE-922)
- No server-side session invalidation (logout is cosmetic)
- Account enumeration through login/registration error messages (CWE-204)
- Missing MFA for sensitive operations

**Common vulnerabilities:**
- OWASP A07:2021 — Identification and Authentication Failures
- CWE-287 — Improper Authentication
- CWE-384 — Session Fixation
- CWE-613 — Insufficient Session Expiration

**SaaS-specific concerns:**
- Multi-tenancy: Can a user in Tenant A authenticate as a user in Tenant B?
- Subscription tier enforcement: Is auth tied to feature access? Can a free-tier user access paid features by manipulating tokens?
- Shared link / client portal auth: Are unauthenticated access tokens sufficiently random and time-limited?

---

### Domain 2: Authorization & Access Control

**Scope:** Role-based access, resource-level permissions, tenant isolation, privilege escalation paths

**Review questions:**
- What authorization model is used (RBAC, ABAC, simple role check)?
- Is authorization enforced at the API layer (server-side), not just the UI layer?
- Can a user access resources belonging to another user by manipulating IDs (IDOR)?
- Are all state-changing operations checked for authorization, or only read operations?
- Is there a default-deny policy, or are new endpoints open by default?
- How is multi-tenant isolation enforced (application logic, database RLS, separate schemas)?

**What to look for:**
- Authorization checks only in frontend code (CWE-602: Client-Side Enforcement of Server-Side Security)
- Direct object reference without ownership validation (CWE-639: IDOR)
- Missing authorization on new API endpoints (default-open pattern)
- Horizontal privilege escalation between tenants
- Vertical privilege escalation from user to admin

**Common vulnerabilities:**
- OWASP A01:2021 — Broken Access Control
- CWE-639 — Authorization Bypass Through User-Controlled Key (IDOR)
- CWE-862 — Missing Authorization
- CWE-863 — Incorrect Authorization

**SaaS-specific concerns:**
- Tenant data isolation in shared database (row-level security enforcement)
- API key scoping (are API keys scoped to tenant, or global?)
- Subscription-tier feature gating at the API level (not just UI hiding)

---

### Domain 3: API Security

**Scope:** All API endpoints (REST, GraphQL, webhooks), input validation, output filtering, rate limiting

**Review questions:**
- Are all API inputs validated at the boundary (type, length, format, range)?
- Is there protection against mass assignment (sending extra fields to update unintended properties)?
- Are webhook endpoints validating signatures from the sending service?
- Is there replay protection for webhooks (idempotency keys, timestamp validation)?
- Does the API return only the fields the client needs, or entire database records?
- Are error responses consistent (no information leakage through different error codes)?
- Is there rate limiting per user, per IP, and per endpoint?
- Are file uploads validated (type, size, content scanning)?

**What to look for:**
- No input validation on API routes (CWE-20: Improper Input Validation)
- Mass assignment vulnerabilities (CWE-915)
- SQL injection through unparameterized queries (CWE-89)
- Missing webhook signature verification (accepting forged webhook events)
- Verbose error messages in production (CWE-209)
- No rate limiting on authentication endpoints (CWE-307: Brute Force)
- Unrestricted file upload (CWE-434)

**Common vulnerabilities:**
- OWASP A03:2021 — Injection
- OWASP A04:2021 — Insecure Design
- CWE-20 — Improper Input Validation
- CWE-89 — SQL Injection
- CWE-352 — Cross-Site Request Forgery

**SaaS-specific concerns:**
- API versioning and deprecation security (are old, less-secure API versions still accessible?)
- Public API rate limiting for integrations vs. internal API limits
- Webhook retry storms from payment providers (can they overwhelm the system?)

---

### Domain 4: Data Protection (At Rest, In Transit, In Use)

**Scope:** Encryption, key management, data minimization, logging hygiene, data lifecycle

**Review questions:**
- Is data encrypted at rest in the primary database? What level (disk, column, application)?
- Are database backups encrypted?
- Is TLS enforced on all connections (client-to-server, server-to-database, server-to-external)?
- What TLS version is minimum (1.2+)?
- Are secrets (API keys, database credentials) stored in environment variables or a secrets manager, not in code?
- Is sensitive data appearing in application logs?
- Is PII sent to analytics services or AI providers?
- Are presigned URLs and temporary tokens time-limited?
- Is there a data retention policy? Is deletion actually deleting data?

**What to look for:**
- Sensitive data in application logs (CWE-532: Insertion of Sensitive Information into Log File)
- Secrets hardcoded in source code (CWE-798: Use of Hard-coded Credentials)
- Missing TLS on internal connections (assuming internal network is trusted)
- Unencrypted backups stored in accessible locations
- PII in AI/ML training data without anonymization
- Soft-delete that leaves sensitive data accessible

**Common vulnerabilities:**
- OWASP A02:2021 — Cryptographic Failures
- CWE-311 — Missing Encryption of Sensitive Data
- CWE-312 — Cleartext Storage of Sensitive Information
- CWE-319 — Cleartext Transmission of Sensitive Information
- CWE-532 — Sensitive Information in Log Files

**SaaS-specific concerns:**
- Multi-tenant encryption key management (shared keys vs. per-tenant keys)
- Data residency requirements (where is encrypted data stored geographically?)
- Third-party SaaS vendor data handling (does Clerk/Stripe/Supabase encrypt your data with their keys or yours?)

---

### Domain 5: Third-Party Dependencies

**Scope:** External services (APIs, SaaS providers), code libraries, supply chain

**Review questions:**
- For each external service: what data do they access? What is their security certification status?
- Is there a Data Processing Agreement (DPA) with each provider that handles user data?
- What happens to system functionality if this dependency is compromised or goes down?
- For code dependencies: are known vulnerabilities tracked (npm audit, Dependabot, Snyk)?
- Is there a lockfile committed? Are dependencies pinned to specific versions?
- Are development dependencies separated from production dependencies?
- Is there a process for updating dependencies when vulnerabilities are disclosed?

**What to look for:**
- External service with access to sensitive data but no SOC 2 / ISO 27001 certification
- Missing DPA for services handling PII or financial data
- Unmonitored code dependencies with known CVEs (CWE-1104)
- Unpinned dependencies that could be compromised via supply chain attack
- Over-permissive API keys (full access when read-only would suffice)

**Common vulnerabilities:**
- OWASP A06:2021 — Vulnerable and Outdated Components
- CWE-1104 — Use of Unmaintained Third Party Components
- CWE-829 — Inclusion of Functionality from Untrusted Control Sphere

**SaaS-specific concerns:**
- SaaS provider acquisition or policy changes affecting data handling
- Vendor lock-in where migration would require re-implementing security controls
- Shared responsibility model clarity (what does the vendor secure vs. what do you secure?)

---

### Domain 6: Infrastructure & Deployment

**Scope:** Hosting configuration, deployment pipeline, environment management, secrets handling

**Review questions:**
- Is the deployment pipeline secure (no secrets in CI/CD logs, branch protections)?
- Are environment variables used for all secrets (not hardcoded)?
- Is there a staging environment that mirrors production security controls?
- Are production admin interfaces restricted by IP or VPN?
- Is debug mode disabled in production?
- Are CORS policies restrictive (not `*`)?
- Are security headers configured (CSP, HSTS, X-Frame-Options)?
- Is there a process for rotating secrets and API keys?

**What to look for:**
- Debug mode enabled in production (CWE-489: Active Debug Code)
- Permissive CORS allowing any origin (CWE-942)
- Missing security headers (CWE-693: Protection Mechanism Failure)
- Secrets visible in CI/CD logs or deployment artifacts
- No branch protection on main/production branches
- Missing HTTPS enforcement (redirect from HTTP)

**Common vulnerabilities:**
- OWASP A05:2021 — Security Misconfiguration
- CWE-489 — Active Debug Code
- CWE-942 — Permissive Cross-domain Policy with Untrusted Domains

**SaaS-specific concerns:**
- Serverless function permissions (are Lambda/Vercel functions over-privileged?)
- Edge/CDN caching of authenticated content
- Preview deployment URLs exposing pre-release features with production data access

---

### Domain 7: Error Handling & Information Leakage

**Scope:** Error responses, logging, monitoring, information exposure

**Review questions:**
- Do error responses include stack traces, database queries, or internal paths?
- Are error codes consistent across endpoints (no information leakage through varying error formats)?
- Can failed requests reveal whether a resource exists (user enumeration, invoice enumeration)?
- Are logs sanitized to exclude PII, tokens, and passwords?
- Is there monitoring for security-relevant events (failed logins, permission denials, rate limit triggers)?
- Are client-side errors (JavaScript) captured without exposing sensitive state?

**What to look for:**
- Stack traces in production error responses (CWE-209)
- Different error messages for "user not found" vs "wrong password" (CWE-204)
- Unsanitized user input reflected in error pages (XSS vector)
- Sensitive data in monitoring/analytics dashboards
- No alerting on security-relevant events

**Common vulnerabilities:**
- OWASP A09:2021 — Security Logging and Monitoring Failures
- CWE-209 — Generation of Error Message Containing Sensitive Information
- CWE-204 — Observable Response Discrepancy
- CWE-117 — Improper Output Neutralization for Logs

**SaaS-specific concerns:**
- Multi-tenant log isolation (can one tenant's support request reveal another's data?)
- Error pages that reveal subscription tier or feature flag state
- Customer support tools that expose more data than intended

---

## Severity Classification

Apply these severity levels consistently across all findings:

### Critical
- **Definition:** Exploitable vulnerability with immediate risk of data breach, authentication bypass, or system compromise
- **Examples:** SQL injection in production, unauthenticated admin access, plaintext password storage, missing webhook signature validation on payment endpoints
- **Response:** Must be fixed before launch or immediately if already live
- **CVSS equivalent:** 9.0-10.0

### High
- **Definition:** Exploitable vulnerability requiring moderate effort or specific conditions, but with significant impact
- **Examples:** IDOR allowing cross-tenant data access, long-lived JWT without refresh rotation, missing rate limiting on auth endpoints, unencrypted database backups
- **Response:** Must be fixed before launch or within 1 week if live
- **CVSS equivalent:** 7.0-8.9

### Medium
- **Definition:** Defense-in-depth gap that does not directly enable exploitation but weakens the security posture
- **Examples:** Missing CSP headers, verbose error messages in production, no audit logging for sensitive operations, soft-delete not removing PII
- **Response:** Fix within 1-3 months
- **CVSS equivalent:** 4.0-6.9

### Low
- **Definition:** Hardening opportunity that improves security posture but is not a vulnerability
- **Examples:** Missing X-Frame-Options header, development dependencies in production bundle, no automated dependency vulnerability scanning, suboptimal TLS cipher suite order
- **Response:** Fix within 3-6 months or when convenient
- **CVSS equivalent:** 0.1-3.9

---

## Remediation Prioritization

Use this formula to rank remediation actions:

```
Priority Score = Threat Model Severity x Inverse Effort

Where:
- Severity: Critical=4, High=3, Medium=2, Low=1
- Effort: Small=3 (inverse), Medium=2 (inverse), Large=1 (inverse)

Priority Score range: 1 (Low severity, Large effort) to 12 (Critical severity, Small effort)
```

**Priority ranking:**
- Score 9-12: Fix immediately (high impact, low effort)
- Score 5-8: Fix before launch
- Score 3-4: Fix within 3 months
- Score 1-2: Fix when convenient

When multiple findings have the same priority score, break ties by:
1. Threat model severity (higher severity wins)
2. Attack surface exposure (internet-facing wins over internal)
3. Data sensitivity of affected component (Restricted > Confidential > Internal > Public)

---

## Edge Cases

### No Threat Model Available

When no threat model exists to link findings against:

1. Use the architecture's data sensitivity classification as a proxy for severity
2. Apply STRIDE categories to each finding (which threat category does this weakness fall under?)
3. Note in the review summary that findings are not linked to specific threat entries
4. Recommend Threat Modeling as a prerequisite for prioritization confidence
5. Default severity classification based on data sensitivity: Restricted data = High minimum, Confidential = Medium minimum

### Serverless Architecture

When the architecture uses serverless (Lambda, Vercel Functions, Cloudflare Workers):

1. Function-level permissions replace container-level network security
2. Cold start behavior may affect auth token validation timing
3. Shared runtime environments introduce function isolation concerns
4. Deployment permissions and IAM roles become the primary infrastructure review focus
5. Ephemeral execution means no persistent compromise, but also no persistent monitoring

### Third-Party Handles Most Security

When the architecture delegates heavily to managed services (Clerk for auth, Supabase for database + RLS, Vercel for hosting):

1. Review focuses on the **integration points** — how the application connects to and configures these services
2. Assess the **shared responsibility boundary** — what does each vendor secure vs. what must the application handle?
3. Check for **misconfiguration** — managed services are secure when configured correctly; defaults are often insufficient
4. Evaluate **vendor concentration risk** — if one vendor is compromised, how much of the system is affected?
5. Verify that the application is not **undermining** vendor security (e.g., passing Supabase service_role key to the client)

---

## Sources

This framework draws from:

- **OWASP Top 10 (2021):** The 10 most critical web application security risks. Used to structure review domains and map findings. [https://owasp.org/Top10/](https://owasp.org/Top10/)
- **CWE Top 25 (2023):** The 25 most dangerous software weaknesses. Used for specific vulnerability classification and CWE ID mapping. [https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html](https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html)
- **OWASP ASVS v4.0:** Application Security Verification Standard. Used to derive the review checklist questions and categorization. [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
- **STRIDE Threat Model:** Microsoft's threat classification model. Used to link findings to threat categories. Referenced from the upstream Threat Modeling skill.
