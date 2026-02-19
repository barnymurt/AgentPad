# Framework: Security Requirements Baseline

This framework provides the systematic methodology for producing a prioritized security requirements checklist for early-stage SaaS products. It adapts OWASP ASVS Level 1 for the validation-to-build transition, focusing on requirements concrete enough to implement and verify while avoiding security theater that burns time without reducing risk.

## Methodology Overview

### Why OWASP ASVS Level 1

The OWASP Application Security Verification Standard defines three levels of security requirements:

| Level | Target | Verification Method | Effort |
|-------|--------|-------------------|--------|
| **Level 1** | All software | Automated + manual review | Days |
| **Level 2** | Applications handling sensitive data | Detailed review + testing | Weeks |
| **Level 3** | Critical applications (medical, financial infrastructure, military) | Full audit + penetration testing | Months |

**Level 1 is the right bar for early-stage SaaS because:**

1. **Coverage without paralysis:** Level 1 addresses the OWASP Top 10 and most common vulnerabilities. It catches 80%+ of real-world attacks against web applications without requiring dedicated security staff.
2. **Implementable by a solo founder:** Every Level 1 requirement can be satisfied using standard framework features and managed services. No custom cryptography, no WAF tuning, no dedicated security infrastructure.
3. **Verifiable without specialized tools:** Level 1 requirements can be verified through code review, configuration checks, and simple testing. No need for DAST/SAST tools, security consultants, or bug bounty programs at this stage.
4. **Foundation for escalation:** When InvoiceFlow reaches Series A, onboards enterprise customers, or handles regulated data at scale, Level 2 builds on Level 1 — nothing is wasted.

**When to move beyond Level 1:**
- Handling health data (HIPAA) or children's data (COPPA) -- consider Level 2 immediately
- Enterprise customers requiring SOC 2 Type II -- Level 2 within 6 months of first enterprise contract
- Processing payments directly (not via Stripe/processor) -- Level 2 for payment components
- Storing biometric data, government IDs, or social security numbers -- Level 2 for those data stores

## ASVS Categories Adapted for SaaS

### Category 1: Authentication

Requirements for verifying user identity. Mapped to the auth provider (Clerk, Auth0, Firebase Auth, etc.) and any custom auth flows.

| # | Requirement | Notes |
|---|------------|-------|
| AUTH-01 | All authentication endpoints enforce rate limiting of no more than 10 failed attempts per account per hour | Prevents brute-force attacks. Most auth providers handle this, but verify the configuration |
| AUTH-02 | Passwords require a minimum of 8 characters and are checked against a breached password list (e.g., HaveIBeenPwned top 100K) | NIST 800-63B recommendation. Most auth providers do this by default — verify, don't assume |
| AUTH-03 | Session tokens are invalidated server-side on logout, not just deleted client-side | Prevents session reuse after logout. Check that your auth provider actually revokes the session, not just clears the cookie |
| AUTH-04 | Password reset tokens expire within 1 hour and are single-use | Prevents token reuse from email compromise |
| AUTH-05 | Authentication responses do not reveal whether a username/email exists in the system | Prevents user enumeration. Error messages should be identical for "wrong password" and "account not found" |

### Category 2: Session Management

Requirements for maintaining authenticated state. Mapped to session/token handling in the auth provider and application layer.

| # | Requirement | Notes |
|---|------------|-------|
| SESS-01 | Session tokens are generated with at least 128 bits of entropy using a cryptographically secure random number generator | Prevents session prediction. Auth providers handle this — verify token length |
| SESS-02 | Session tokens are transmitted only over HTTPS and set with Secure, HttpOnly, and SameSite attributes | Prevents session theft via XSS, MITM, or CSRF |
| SESS-03 | Sessions expire after a maximum idle period (30 minutes for sensitive operations, 24 hours for general access) | Limits exposure from unattended sessions |
| SESS-04 | Users can view and terminate active sessions from their account settings | Enables users to revoke access from lost/stolen devices |
| SESS-05 | Sensitive operations (payment method changes, account deletion) require re-authentication or step-up verification within the last 5 minutes | Prevents privilege escalation from session hijacking |

### Category 3: Access Control

Requirements for enforcing authorization. Mapped to the authorization model (RBAC, RLS, token-based access).

| # | Requirement | Notes |
|---|------------|-------|
| AUTHZ-01 | Every API endpoint enforces authorization checks — no endpoint relies solely on the client hiding the UI element | Server-side enforcement is non-negotiable. Test by calling API endpoints directly without the UI |
| AUTHZ-02 | Users cannot access, modify, or delete resources belonging to other users by manipulating IDs in URLs or request bodies | IDOR (Insecure Direct Object Reference) prevention. Test by changing resource IDs in API calls |
| AUTHZ-03 | Row-level security or equivalent tenant isolation is enforced at the data layer, not just the application layer | Defense in depth — if the API has a bug, the database still prevents cross-tenant access |
| AUTHZ-04 | Unauthenticated access (e.g., public invoice links) uses non-guessable tokens (UUID v4 minimum) and exposes only the minimum necessary data | Prevents enumeration and data leakage through public endpoints |
| AUTHZ-05 | Administrative functions (if any) require a separate privilege check, not just a different UI route | Prevents privilege escalation to admin functions |

### Category 4: Input Validation

Requirements for handling untrusted input. Mapped to API endpoints, form submissions, webhooks, and file uploads.

| # | Requirement | Notes |
|---|------------|-------|
| INPUT-01 | All database queries use parameterized queries or an ORM — no string concatenation of user input into SQL | Prevents SQL injection. Supabase client and most ORMs do this by default — verify no raw query escape hatches |
| INPUT-02 | All user input rendered in HTML is contextually escaped (HTML entities, JavaScript strings, URL parameters, CSS values) | Prevents XSS. React/Next.js escape by default, but dangerouslySetInnerHTML and href="javascript:" bypass this |
| INPUT-03 | File uploads validate file type by content (magic bytes), not just file extension, and are stored outside the web root | Prevents malicious file upload. S3 with presigned URLs handles this if configured correctly |
| INPUT-04 | API request bodies are validated against a schema (max field lengths, expected types, required fields) before processing | Prevents injection, overflow, and unexpected behavior from malformed input |
| INPUT-05 | Webhook endpoints verify the sender's signature before processing the payload | Prevents spoofed webhooks. Stripe, Clerk, and most services provide webhook signatures — they must be verified |
| INPUT-06 | User-controlled input sent to LLM APIs is sanitized or isolated to prevent prompt injection that could exfiltrate data or alter system behavior | Prevents AI-specific attacks. Separate system prompts from user content. Never include sensitive data in prompts alongside user input |

### Category 5: Cryptography

Requirements for protecting data confidentiality and integrity. Mapped to data stores, data in transit, and key management.

| # | Requirement | Notes |
|---|------------|-------|
| CRYPTO-01 | All data in transit uses TLS 1.2 or higher — no plaintext HTTP connections between any components | Includes API calls to external services, database connections, and webhook callbacks |
| CRYPTO-02 | All sensitive data at rest is encrypted using AES-256 or equivalent (database encryption, file storage encryption) | Managed services (Supabase, S3) provide this — verify it's enabled, not assumed |
| CRYPTO-03 | Passwords are hashed using bcrypt, scrypt, or Argon2 with appropriate work factors — never stored in plaintext or reversible encryption | Auth providers handle this. If custom auth: bcrypt with cost factor >= 12 |
| CRYPTO-04 | API keys, database credentials, and service tokens are stored in environment variables or a secrets manager — never in source code, config files committed to git, or client-side code | Prevents credential leakage through version control or client bundles |
| CRYPTO-05 | Cryptographic keys are not hardcoded and can be rotated without redeploying the application | Enables incident response. Environment variables satisfy this for most early-stage products |

### Category 6: Error Handling & Logging

Requirements for handling failures securely and maintaining audit trails. Mapped to application error handling, monitoring services, and logging infrastructure.

| # | Requirement | Notes |
|---|------------|-------|
| LOG-01 | Error responses to users contain a correlation ID and a generic message — never stack traces, SQL errors, internal paths, or configuration details | Prevents information leakage. Development vs. production error detail levels must differ |
| LOG-02 | Authentication events (login, logout, failed login, password reset) are logged with timestamp, user identifier, IP address, and success/failure status | Enables incident investigation. Auth providers often provide this — verify it's accessible and retained |
| LOG-03 | Access to sensitive resources (financial data, PII exports, admin actions) is logged with actor, action, resource, and timestamp | Audit trail for data access. Critical for breach response and compliance |
| LOG-04 | Log entries never contain passwords, session tokens, API keys, or full credit card numbers | Prevents credential leakage through logs. Use structured logging with an allow-list of fields, not a deny-list |
| LOG-05 | Application errors are reported to a monitoring service (Sentry, Datadog, etc.) with sufficient context for debugging but without sensitive data | Enables rapid incident response without creating a secondary data leak through your monitoring tool |

### Category 7: Data Protection

Requirements for protecting data throughout its lifecycle. Mapped to data sensitivity classification and data handling practices.

| # | Requirement | Notes |
|---|------------|-------|
| DATA-01 | All data stores have an assigned sensitivity classification (Public, Internal, Confidential, Restricted) and enforce controls matching their classification tier | Prevents under-protection of sensitive data. See Data Sensitivity Classification below |
| DATA-02 | PII (names, emails, addresses) is not stored in plain text in logs, analytics events, error reports, or caches unless those systems have equivalent access controls to the primary database | Prevents data leakage through secondary systems |
| DATA-03 | Data exports (CSV, PDF, API bulk responses) enforce the same access controls as the source data — no export endpoint that bypasses authorization | Prevents bulk data exfiltration through export features |
| DATA-04 | User data can be deleted upon request, including backups within a defined retention window, to support right-to-erasure requirements | Technical foundation for GDPR/CCPA compliance. Implementation is a data protection requirement, not just a compliance checkbox |
| DATA-05 | Financial data (invoice amounts, payment history, bank details) is encrypted at rest and access-logged at all times | Financial data has higher protection requirements than general PII |

### Category 8: Communication Security

Requirements for securing network communications. Mapped to all connections between containers, external services, and client applications.

| # | Requirement | Notes |
|---|------------|-------|
| COMM-01 | All public-facing endpoints enforce HTTPS — HTTP requests are redirected to HTTPS, not served | Hosting providers (Vercel, Netlify, Railway) typically handle this — verify, don't assume |
| COMM-02 | HSTS (HTTP Strict Transport Security) headers are set with a minimum max-age of 6 months | Prevents SSL stripping attacks. One header configuration |
| COMM-03 | CORS is configured to allow only the specific origins that need access — not wildcard (*) for authenticated endpoints | Prevents cross-origin data theft. Verify CORS policy in production, not just development |
| COMM-04 | WebSocket connections (if used) require authentication and enforce the same access controls as REST endpoints | WebSockets bypass traditional CSRF and CORS — they need explicit auth |
| COMM-05 | API responses include appropriate security headers: X-Content-Type-Options: nosniff, X-Frame-Options: DENY (or CSP frame-ancestors), Referrer-Policy: strict-origin-when-cross-origin | Prevents content sniffing, clickjacking, and referrer leakage. Most can be set in a single middleware |

### Category 9: Configuration

Requirements for secure deployment and dependency management. Mapped to hosting, CI/CD, and third-party dependency management.

| # | Requirement | Notes |
|---|------------|-------|
| CONFIG-01 | Production deployments do not expose debug endpoints, stack traces, development tools, or verbose error messages | Next.js, Rails, Django all have production modes — verify they're enabled in production deployment |
| CONFIG-02 | Default credentials for all services, databases, and admin panels are changed before deployment | Includes database admin passwords, Supabase dashboard access, hosting platform accounts |
| CONFIG-03 | Dependencies are pinned to exact versions (lockfile committed) and checked for known vulnerabilities at least monthly | npm audit, pip-audit, or Dependabot. Known vulnerabilities in dependencies are a top attack vector |
| CONFIG-04 | Environment variables are separated by environment (development, staging, production) — no shared secrets across environments | Prevents development-environment compromises from affecting production |
| CONFIG-05 | The deployment pipeline requires at least one approval step or automated check before deploying to production | Prevents accidental or malicious deployments. Branch protection + CI checks satisfy this |
| CONFIG-06 | Unused services, ports, features, and sample code are removed from production deployments | Reduces attack surface. Check for default routes, sample API endpoints, and admin panels |

## Prioritization Framework

### Priority Tier Definitions

| Priority | Name | Criteria | Timeline |
|----------|------|----------|----------|
| **P0** | Must have at launch | Prevents catastrophic failure; trivial-to-moderate effort; foundational for other controls | Before first user |
| **P1** | Add within 3 months | Important but not catastrophic if briefly deferred; moderate effort; may need usage data | Within 3 months of launch |
| **P2** | Add within 6 months | Defense-in-depth; requires infrastructure investment; relevant at scale | Within 6 months of launch |

### Priority Decision Tree

```
For each requirement, ask in order:

1. If this is missing, can an attacker directly steal user data, bypass authentication, or execute code?
   └── Yes → P0

2. If this is missing, can an attacker degrade service, enumerate users, or access non-critical internal data?
   └── Yes → P1

3. Does the data sensitivity classification require this control?
   └── Restricted data → P0
   └── Confidential data → P0 for encryption/access control, P1 for audit logging
   └── Internal data → P1
   └── Public data → P2

4. Is this a defense-in-depth measure that assumes another control has already failed?
   └── Yes → P2 (unless the primary control is unreliable)

5. Can this be implemented in < 1 hour with the chosen tech stack?
   └── Yes → Promote one tier (P2 → P1, P1 → P0). Low effort tips the balance toward doing it now
```

### Priority Classification Examples

| Requirement | Default Priority | Rationale |
|------------|-----------------|-----------|
| Parameterized queries (INPUT-01) | P0 | SQL injection is catastrophic, and ORMs handle it by default — zero extra effort |
| HTTPS enforcement (COMM-01) | P0 | Hosting providers do this by default — verify, not implement |
| Webhook signature verification (INPUT-05) | P0 | Spoofed webhooks can trigger unauthorized actions (payments, data changes) |
| CSP headers (COMM-05) | P1 | Important defense-in-depth but requires testing to avoid breaking functionality |
| Rate limiting tuning (AUTH-01) | P1 | Auth providers provide defaults; tuning requires usage data |
| WAF deployment | P2 | Defense-in-depth measure relevant at scale |
| Penetration testing | P2 | Requires external engagement; most valuable after core controls are in place |

## Data Sensitivity Classification

### Classification Tiers

| Tier | Definition | Examples | Required Controls |
|------|-----------|----------|-------------------|
| **Public** | No impact if disclosed. Intended for external consumption | Marketing pages, public API documentation, published pricing, blog posts | No special controls. Standard availability measures |
| **Internal** | Minor operational impact if disclosed. Not intended for external consumption but not damaging | Feature flags, internal metrics, anonymized usage analytics, application configuration (non-secret), error correlation IDs | Access control (authenticated users only), no public exposure |
| **Confidential** | Significant business or personal impact if disclosed. Contains PII or business-sensitive data | User emails, names, addresses, invoice amounts, client lists, payment history, usage patterns, business revenue data | Encryption at rest + in transit, access control, access logging, retention policies, breach notification obligation |
| **Restricted** | Severe impact if disclosed. Regulatory, financial, or physical safety consequences | Passwords/hashes, API keys, bank account details, credit card tokens, health records, government IDs, authentication tokens, encryption keys | All Confidential controls + audit logging of every access, minimal access (need-to-know), key rotation capability, separate storage consideration, incident response plan |

### Classification Decision Process

1. **Identify all data types** in each data store (database tables, file storage, caches, logs, analytics)
2. **Classify each data type** using the tier definitions above
3. **The data store's classification is the highest tier of any data it contains** (a database with one Restricted column is a Restricted data store)
4. **Apply controls** matching the classification tier to the entire data store
5. **Consider separation:** If a Restricted data type can be isolated (e.g., bank account details in a separate encrypted table), classify the stores independently

### Examples by Product Type

| Product Type | Typical Data | Likely Highest Tier | Key Controls |
|-------------|-------------|--------------------|--------------|
| Blog/CMS platform | Emails, passwords | Confidential | Encryption at rest, access control, auth provider for passwords |
| Invoicing SaaS | PII + financial data + bank details | Restricted | All controls. Bank details may warrant separate encrypted storage |
| Health/wellness app | PII + health data | Restricted | All controls + HIPAA considerations (if US market) |
| Developer tool (no PII) | API keys, usage metrics | Confidential | Encryption for API keys, access control for metrics |
| E-commerce platform | PII + payment data + purchase history | Restricted | All controls. PCI-DSS compliance via payment processor |

## Threat Profile Assessment

### Determining Likely Attackers

| Attacker Type | Motivation | Capability | Likely Targets | Indicators Your Product Is at Risk |
|--------------|-----------|-----------|----------------|-----------------------------------|
| **Opportunistic scanners** | Mass exploitation of known vulnerabilities | Low — automated tools, known CVEs | Unpatched software, default credentials, exposed admin panels | You exist on the internet (every product faces this) |
| **Credential stuffers** | Account takeover using breached credential databases | Low-Medium — automated, commodity tools | User login endpoints, password-based auth | You have user accounts with email/password login |
| **Data harvesters** | Scraping or exfiltrating user data for resale | Medium — targeted scraping, API abuse | User PII, business data, financial records | You store PII or financial data accessible via API |
| **Targeted attackers** | Competitive intelligence, financial theft, extortion | Medium-High — manual reconnaissance, custom attacks | Financial data, proprietary IP, high-value accounts | You handle financial transactions, have high-value users, or visible funding |
| **Insider threats** | Data theft, sabotage, unauthorized access | High — legitimate access, knowledge of systems | Everything — but especially data exports, admin functions | You have employees or contractors with production access |

### Blast Radius Assessment

| Blast Radius | Description | Example Scenarios | Risk Level |
|-------------|-------------|-------------------|------------|
| **Embarrassment** | Public disclosure of a vulnerability, minor data exposure | Exposed debug endpoint, leaked internal metrics | Low |
| **Financial loss (direct)** | Money stolen, fraudulent transactions, ransomware | Unauthorized payments, compromised billing | High |
| **Financial loss (indirect)** | Customer churn, lost deals, legal costs | Data breach notification, reputation damage | Medium-High |
| **Regulatory action** | Fines, enforcement actions, mandatory audits | GDPR violation (up to 4% of revenue), PCI-DSS non-compliance | High |
| **Physical harm** | Compromise of data that enables stalking, identity theft, or medical harm | Leaked home addresses, compromised health records | Critical |

### Assessment Process

1. **List the attacker types** relevant to your product (all products face opportunistic scanners)
2. **Determine the highest-value target** in your system from the attacker's perspective
3. **Assess the blast radius** of the worst-case breach scenario
4. **Use the blast radius to calibrate priority thresholds:**
   - Embarrassment blast radius → standard P0/P1/P2 thresholds
   - Financial blast radius → promote financial-data requirements to P0
   - Regulatory blast radius → promote compliance-related requirements to P0
   - Physical harm blast radius → consider ASVS Level 2 for affected data

## Effort Estimation Scale

| Size | Time | Description | Examples |
|------|------|-------------|---------|
| **S** | < 1 hour | Configuration change, enabling a default, adding a header, verifying an existing setting | Enable HTTPS redirect, add security headers, verify auth provider settings, check S3 bucket policy |
| **M** | 1-4 hours | Implementing a specific control, writing validation logic, configuring a service | Add webhook signature verification, implement rate limiting middleware, set up structured logging, configure CSP headers |
| **L** | 4-16 hours | Architectural change, implementing a new system, significant refactoring | Add row-level security to all database tables, implement comprehensive input validation across all API endpoints, set up audit logging infrastructure, implement data export access controls |

### Estimation Guidelines

- **Estimate for the specific tech stack.** Adding RLS in Supabase is M (SQL policies). Adding RLS to a raw PostgreSQL setup is L (migrations, testing, ORM integration).
- **Include verification time.** Implementation is half the work; testing that it actually works is the other half.
- **Account for learning curve.** If the team has never configured CSP headers, add 1 hour for reading documentation.
- **Round up, not down.** Security implementations have more edge cases than expected. An M that might be S is still M.

## Edge Cases

### No Architecture Input Available

When no Architecture Design output exists:

1. **Ask three questions:** "What does your product do?", "What data does it handle?", and "What tech stack are you using?"
2. **Make reasonable assumptions** for a standard SaaS stack (managed auth, managed database, cloud hosting, third-party payment processing)
3. **Flag assumptions explicitly** in the output: "Assumed [X] based on typical SaaS patterns. Verify and adjust if your implementation differs."
4. **Use generic tech stack guidance** but note that implementation specifics will differ
5. **Reduce confidence** on architecture-specific risks (mark as "Low confidence — verify against actual architecture")

### Lightweight Product with No PII

For products that genuinely handle no PII (developer tools with API-key-only auth, infrastructure monitoring, internal tools):

1. **Verify "no PII" is accurate.** Email addresses are PII. IP addresses may be PII under GDPR. Usage patterns linked to accounts are arguably PII. Challenge the assumption.
2. **Reduce scope** to authentication, access control, input validation, and configuration categories
3. **Reclassify data sensitivity** — even without PII, API keys are Restricted and usage data is Internal
4. **Skip or deprioritize** data protection requirements specific to PII (DATA-01 still applies but with lower tiers)
5. **P0 count will be lower** (15-20 instead of 25+), which is appropriate for the lower risk profile

### Product Handling Health or Children's Data

For products handling HIPAA-covered data, COPPA-covered data, or similarly regulated information:

1. **Elevate to ASVS Level 2** for data stores and access paths touching regulated data
2. **All data protection requirements become P0** — no deferral for regulated data
3. **Add category-specific requirements:** BAA with all third-party services touching health data, verifiable parental consent for children's data, data minimization beyond standard practices
4. **Flag for immediate legal review** — this skill provides technical controls, not legal compliance guidance
5. **Recommend professional security audit** before launch (override the normal P2 classification for penetration testing)
6. **Increase effort estimates** — regulated data controls take 2-3x longer due to documentation and verification requirements

## Sources and Rationale

This framework draws from:

- **OWASP Application Security Verification Standard (ASVS) v4.0** — the canonical framework for web application security requirements, adapted here for Level 1 applicability to early-stage SaaS products
- **OWASP Top 10 (2021)** — the most common and critical web application security risks, used to calibrate P0 priority assignments (A01:Broken Access Control through A10:SSRF all have corresponding requirements)
- **CWE Top 25 Most Dangerous Software Weaknesses (2024)** — used to validate that high-impact vulnerability classes (CWE-79 XSS, CWE-89 SQL Injection, CWE-287 Improper Authentication, etc.) are covered by Level 1 requirements
- **NIST SP 800-63B** — digital identity guidelines informing password and authentication requirements
- **Industry security breach reports** (Verizon DBIR) — used to calibrate which attacks are most likely against SaaS products and which controls prevent the most common breach vectors

Adapted specifically for AI-assisted security assessment where the evaluator has access to architecture documentation and public security guidance but not the running system, and where actionable specificity matters more than exhaustive enumeration.
