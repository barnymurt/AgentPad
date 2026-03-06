---
name: security-architecture-review
description: Evaluate a proposed system architecture for security weaknesses and produce a prioritized remediation plan. Use when the user asks to review architecture security, evaluate auth flows, assess API security, check for security weaknesses in a design, audit a system's security posture, or identify vulnerabilities in their architecture. Covers per-component security assessment, authentication flow review, API security evaluation, data handling analysis, third-party dependency risk assessment, and threat-model-linked remediation planning.
outputSummary: Security architecture review with threat assessment
relatedAfter: threat-modeling,security-compliance-roadmap
nextSteps: Implement security measures
specialization: fullstack
---

# Security Architecture Review

Produce a structured, threat-model-aware security assessment of a SaaS system architecture. Unlike raw LLM output that lists generic security advice or repeats OWASP headlines, this skill systematically walks each architectural component against a checklist derived from OWASP Top 10 and CWE Top 25, traces auth flows end-to-end to find gaps, evaluates API security per endpoint category, assesses third-party dependency risk posture, and produces a remediation plan where every finding is linked to a specific threat model entry and prioritized by severity and effort.

## Core Workflow

### Step 1: Load Architecture and Threat Model

Before reviewing anything, establish the complete security context:

1. **Load architecture inputs:**
   - Load Architecture Design output (`context.architecture`) — containers, data flows, auth design, storage, tech stack, trust boundaries
   - If no Architecture Design exists: ask the user for system components, tech stack, data flows, and auth approach. Do not review in a vacuum

2. **Load threat model inputs:**
   - Load Threat Model output (`context.threat_model`) — STRIDE analysis, risk register, mitigations
   - If no threat model exists: note this as a limitation and use the architecture's data sensitivity classification and trust boundaries to infer likely threats. Flag that findings cannot be linked to specific threat entries

3. **Define review scope:**
   - List every container, data store, and external dependency to review
   - Identify which user journeys and data flows will be traced
   - Note any components or flows explicitly excluded (and why)

### Step 2: Review Authentication Flows End-to-End

**Cloud-Specific Authentication Controls:**

| Control | AWS | Azure | GCP |
|---------|-----|-------|-----|
| MFA | IAM MFA, Cognito | Conditional Access, MFA | 2SV, IAM |
| Secrets | Secrets Manager, Parameter Store | Key Vault | Secret Manager |
| SSO | IAM Identity Center | Azure AD | Identity-Aware Proxy |
| WAF | WAF, Shield | WAF, Application Gateway | Cloud Armor |

For the identified cloud provider, verify the following controls are properly configured:

**AWS:**
- IAM: Least privilege roles, no inline policies, MFA on root
- Cognito: User pool MFA required, advanced security enabled
- Secrets Manager: All secrets rotated, not in code
- VPC: Private subnets for DBs, security groups restrictive

**Azure:**
- Conditional Access: MFA policies enabled
- Key Vault: Soft delete enabled, RBAC configured
- Azure AD: Privileged Identity Management, identity protection

**GCP:**
- IAM: Principle of least privilege, no broad permissions
- Secret Manager: Not in code, rotation enabled
- VPC: Private Google Access, firewall rules restrictive

outputSummary: Security architecture review with threat assessment
relatedAfter: threat-modeling,security-compliance-roadmap
nextSteps: Implement security measures
specialization: fullstack
---

For each user type defined in the architecture, trace the complete auth lifecycle:

1. **Registration/onboarding flow:** How are accounts created? What verification exists? Can an attacker create fraudulent accounts at scale?
2. **Login flow:** What credentials are accepted? How are they validated? What happens on failure (lockout, rate limiting, error messages)?
3. **Session management:** How are sessions created, stored, refreshed, and invalidated? What is the token lifetime? Are refresh tokens rotated?
4. **Privilege escalation paths:** Can a user reach admin functions? Can one tenant access another's data? Trace every role transition
5. **Unauthenticated access paths:** For public-facing features (client portals, shared links), what prevents enumeration, brute force, or unauthorized access expansion?
6. **Logout and session termination:** Is logout real (server-side invalidation) or cosmetic (client-side token deletion)?

Map each finding to the relevant STRIDE threat (Spoofing, Elevation of Privilege) and CWE entry.

### Step 3: Review API Security

Categorize every API surface by access level, then evaluate each category:

1. **Categorize endpoints:**
   - Public (no auth required) — webhooks, health checks, public content
   - Authenticated (user-level) — CRUD operations, user data access
   - Privileged (admin-level) — user management, system configuration, bulk operations

2. **For each category, evaluate:**
   - **Input validation:** Are inputs validated at the API boundary? What about nested objects, file uploads, query parameters?
   - **Output filtering:** Does the API return more data than the client needs? Are internal IDs, stack traces, or other users' data exposed?
   - **Rate limiting:** Are thresholds appropriate per category? Is rate limiting per-user, per-IP, or per-API-key? Can it be bypassed?
   - **Error handling:** Do error responses leak implementation details? Are error codes consistent or do they reveal valid/invalid states?

3. **Webhook security:** For inbound webhooks (Stripe, payment providers), verify signature validation, replay protection, and idempotency handling

4. **CORS and request origin:** Are CORS policies restrictive enough? Can cross-origin requests access sensitive endpoints?

Map each finding to the relevant STRIDE threat (Tampering, Information Disclosure) and CWE entry.

### Step 4: Review Data Handling

Trace sensitive data through its complete lifecycle:

1. **Data at rest:**
   - Is sensitive data encrypted in the primary database? What encryption (column-level, disk-level, application-level)?
   - Are backups encrypted? Who has access to backup data?
   - Are credentials, API keys, and secrets stored securely (not in code, not in plaintext config)?
   - Is PII minimized — does the system store only what it needs?

2. **Data in transit:**
   - Is TLS enforced on all connections (API, database, external services)?
   - Are internal service-to-service communications encrypted?
   - Are presigned URLs and temporary access tokens time-limited and scoped?

3. **Data in use:**
   - Is sensitive data exposed in logs, error messages, or analytics?
   - Are AI/ML services receiving minimized data (no PII in prompts unless required)?
   - Is sensitive data visible in browser developer tools, local storage, or URL parameters?

4. **Data retention and deletion:**
   - Is there a data retention policy? Can users request data deletion?
   - Are soft-deletes actually removing sensitive data, or just flagging records?

Map each finding to the relevant STRIDE threat (Information Disclosure) and CWE entry.

### Step 5: Assess Third-Party Dependency Risks

For each external service and dependency in the architecture:

1. **Data exposure assessment:** What data does this service access or store? What is the sensitivity level?
2. **Security posture evaluation:** What certifications do they hold (SOC 2, ISO 27001, PCI DSS)? What is their breach history? Do they publish a security page?
3. **Blast radius analysis:** If this service is compromised, what data is exposed? What system functions are affected? Can the compromise propagate?
4. **Contractual protections:** Is there a DPA (Data Processing Agreement)? What are their breach notification obligations?
5. **Supply chain risk:** For code dependencies (npm packages, Python libraries), are known vulnerabilities tracked? Is there a lockfile? Are updates monitored?

### Step 6: Produce Per-Component Assessment and Remediation Plan

Synthesize all findings into actionable output:

1. **Per-component assessment:** For each container in the architecture, list all findings grouped by review domain (auth, API, data, dependencies), with severity and linked threat model entries

2. **Prioritize remediation:** For each finding, calculate priority using:
   - **Threat model severity** — how severe is the linked threat? (Critical/High/Medium/Low)
   - **Effort to fix** — how much work is the remediation? (S/M/L)
   - **Priority = severity x inverse effort** — fix high-severity, low-effort issues first

3. **Produce tech-stack-specific remediation actions:** Every recommendation must reference the actual technology stack. Not "implement rate limiting" but "add `@upstash/ratelimit` middleware to Next.js API routes with 100 req/min per Clerk user ID"

**Severity Rating with Business Impact:**

| Severity | Definition | Business Impact | Examples |
|----------|------------|----------------|----------|
| **Critical** | Immediate data breach or system compromise | Regulatory fines, major reputational damage, legal liability | Unencrypted PII, SQL injection, auth bypass |
| **High** | Significant security weakness | Data exposure risk, service disruption potential | Missing MFA, weak encryption, no rate limiting |
| **Medium** | Security weakness that could be exploited | Limited impact, requires specific conditions | Verbose errors, weak session tokens |
| **Low** | Minor security improvement | Minimal business impact | Missing security headers, outdated dependencies |

**Priority Calculation:**

| | Low Effort | Medium Effort | High Effort |
|---|---|---|---|
| **Critical** | P1 - Immediate | P2 - This Sprint | P3 - This Month |
| **High** | P2 - This Sprint | P3 - This Month | P4 - Backlog |
| **Medium** | P3 - This Month | P4 - Backlog | P5 - Consider |
| **Low** | P4 - Backlog | P5 - Consider | P5 - Consider |

4. **Generate review summary:** Total findings by severity, top 3 critical findings, overall security posture assessment, and handoff notes for downstream skills

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Review Scope** — what's reviewed, what's excluded, architecture and threat model summary
- **Per-Component Security Assessment** — findings by container, organized by domain
- **Authentication Flow Review** — end-to-end auth analysis for each user type
- **API Security Review** — endpoint categorization and per-category evaluation
- **Third-Party Dependency Assessment** — risk analysis for each external service
- **Remediation Plan** — all findings prioritized with tech-stack-specific actions
- **Review Summary** — severity counts, critical findings, overall posture, handoff notes

Expected length: 3,000-5,000 words depending on architecture complexity.

## Quality Criteria

- [ ] Every container in the architecture has a security assessment (none skipped)
- [ ] Auth flow reviewed end-to-end for each user type, including failure paths and edge cases
- [ ] API security evaluated per endpoint category (public, authenticated, privileged)
- [ ] Data handling reviewed across all three states (at rest, in transit, in use)
- [ ] Third-party dependencies assessed with security posture and blast radius analysis
- [ ] Every finding linked to a specific threat model entry (or noted as unlinked if no threat model)
- [ ] Remediation recommendations are tech-stack-specific (not generic security advice)
- [ ] Remediation prioritized by threat model severity x effort (not arbitrary ordering)
- [ ] Severity classification applied consistently using the framework rubric
- [ ] SaaS-specific concerns addressed (multi-tenancy isolation, subscription tier enforcement, webhook security)
- [ ] Output follows the schema in references/output-schema.md

## References

- **Review methodology and domain checklists:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Reviewing only the "happy path" auth flow:** Tracing how a legitimate user logs in and accesses their data, without testing failure paths — what happens when a token expires mid-request, when a user tries another tenant's resource ID, when a session is invalidated on one device but active on another. Auth reviews must cover the adversarial paths, not just the intended ones.

2. **Ignoring third-party dependency security posture:** Treating Stripe, Clerk, Supabase, and other services as inherently secure black boxes. Every third-party service is an extension of the attack surface. A SOC 2 certification is a starting point, not a conclusion. Assess what data they hold, what happens if they are breached, and whether contractual protections exist.

3. **Recommending enterprise-grade controls for MVP:** Suggesting WAF, SIEM, zero-trust networking, and hardware security modules for a product with 50 users and a solo founder. Remediation must be proportional to the product's stage, team size, and threat profile. Over-prescribing security erodes trust in the review — founders will ignore all recommendations if half are impractical.

4. **Not connecting findings to specific threat model entries:** Listing security weaknesses in isolation without mapping them to the threats they enable or the risks they amplify. Every finding should answer: "This weakness enables or worsens [specific threat from the threat model], which has [severity level] impact." Without this connection, the review is a checklist, not an analysis.

5. **Reviewing in isolation without architecture context:** Producing generic security recommendations without referencing specific containers, data flows, or technology choices from the architecture. "Encrypt sensitive data" is meaningless. "Enable Supabase column-level encryption for the `bank_account_number` field in the `users` table" is actionable. Every finding must point to a specific component.
