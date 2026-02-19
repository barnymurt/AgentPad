# Framework: Threat Modeling (STRIDE)

This framework provides the systematic methodology for STRIDE-based threat modeling of SaaS and digital product architectures. It combines Microsoft's STRIDE classification with structured risk rating, attack tree construction, and mitigation prioritization — adapted for early-stage SaaS products designed at the C4 Container level.

## Methodology Overview

Traditional threat modeling either applies STRIDE mechanically to every element (producing overwhelming, undifferentiated lists) or skips methodology entirely (producing ad-hoc security opinions). This framework balances rigor with pragmatism: apply STRIDE exhaustively to component boundaries and trust boundary crossings, but invest depth proportionally — attack trees for the top threats, quick ratings for the rest. The output is a prioritized risk register with actionable, tech-stack-specific mitigations.

## STRIDE Categories

STRIDE is a mnemonic for six categories of security threats. Each category maps to a security property that can be violated.

### Spoofing (violates Authentication)

**Definition:** An attacker pretends to be someone or something they are not — a user, a service, or a system component.

**What to look for:**
- Can an unauthenticated user access authenticated endpoints?
- Can one user impersonate another user?
- Can an external service be spoofed (fake webhook sender, DNS hijacking)?
- Are API keys or tokens transmitted insecurely?
- Can session tokens be stolen or forged?

**SaaS-specific examples:**
- Forging a Stripe webhook to mark an invoice as paid without actual payment
- Stealing a JWT from localStorage and impersonating a user
- Spoofing the sender of an OAuth callback to hijack account linking
- Accessing a client portal link intended for a different client by guessing the token

### Tampering (violates Integrity)

**Definition:** An attacker modifies data they shouldn't be able to — in transit, at rest, or in processing.

**What to look for:**
- Can request parameters be modified to change behavior (price, quantity, user ID)?
- Can data in transit be intercepted and altered (man-in-the-middle)?
- Can database records be modified directly (SQL injection)?
- Can file uploads contain malicious content that's processed unsafely?
- Can client-side state be manipulated (hidden form fields, localStorage)?

**SaaS-specific examples:**
- Modifying the invoice amount in a client-side request before it reaches the API
- Tampering with a webhook payload to change payment amounts
- SQL injection through a search field that modifies invoice records
- Uploading a malicious SVG as a company logo that executes scripts when rendered
- Manipulating client-side feature flags to access premium features on a free plan

### Repudiation (violates Non-repudiation)

**Definition:** A user performs an action and the system cannot prove it happened — either because actions aren't logged, or logs can be tampered with.

**What to look for:**
- Are sensitive operations logged with user identity and timestamp?
- Can users deny sending an invoice, approving a payment, or deleting data?
- Are logs stored separately from the application (tamper-resistant)?
- Is there an audit trail for administrative actions?
- Can log entries be deleted or modified by the application itself?

**SaaS-specific examples:**
- A freelancer claims they never sent an invoice that a client disputes
- No audit trail for who changed invoice amounts or payment terms
- Admin actions (user deletion, data export) not logged
- Payment reconciliation disputes with no server-side event log
- Background job failures silently swallowed without trace

### Information Disclosure (violates Confidentiality)

**Definition:** Sensitive data is exposed to unauthorized parties — through leaks, misconfigurations, side channels, or excessive permissions.

**What to look for:**
- Do API responses include more data than the client needs?
- Are error messages revealing internal details (stack traces, database schema, file paths)?
- Is sensitive data logged (passwords, tokens, PII in application logs)?
- Can one tenant access another tenant's data (broken access control)?
- Is data encrypted at rest and in transit?
- Do third-party integrations receive more data than they need?

**SaaS-specific examples:**
- An API endpoint returning all invoices without filtering by user_id
- Supabase RLS policies missing on a table, exposing all rows via the REST API
- Sending full client PII to an AI service for line-item suggestions when only anonymized context is needed
- Error responses revealing database column names or Supabase connection strings
- PDF invoice URLs that are guessable or don't expire
- Analytics events containing PII (client email in PostHog event properties)

### Denial of Service (violates Availability)

**Definition:** An attacker prevents legitimate users from accessing the system by exhausting resources, exploiting bottlenecks, or triggering failures.

**What to look for:**
- Are there rate limits on all public endpoints?
- Can a single user consume disproportionate resources (large file uploads, expensive queries)?
- Can external service failures cascade into system-wide outage?
- Are background jobs protected against infinite loops or retry storms?
- Is there resource isolation between tenants?

**SaaS-specific examples:**
- No rate limiting on the invoice creation endpoint, allowing a bot to create millions of invoices
- A single user uploading massive files that exhaust S3 storage budget
- Recursive AI calls triggered by a crafted invoice description that causes infinite retries
- Stripe webhook replay flooding the background job queue
- A single expensive dashboard query locking the database for all users

### Elevation of Privilege (violates Authorization)

**Definition:** An attacker gains higher permissions than they should have — accessing admin functions, other users' data, or bypassing payment tiers.

**What to look for:**
- Can a regular user access admin endpoints?
- Can a user modify their role or permissions client-side?
- Can a free-tier user access paid features by manipulating requests?
- Are there IDOR (Insecure Direct Object Reference) vulnerabilities in resource access?
- Can a client (invoice recipient) access freelancer-level functionality?

**SaaS-specific examples:**
- Changing `user_id` in an API request to access another user's invoices (IDOR)
- A client portal user accessing the freelancer dashboard by navigating to `/dashboard`
- Bypassing subscription tier checks by directly calling premium API endpoints
- Exploiting a missing authorization check on the bulk-delete endpoint
- Escalating from a team member role to owner by manipulating the Clerk organization settings

## Applying STRIDE to C4 Container-Level Architectures

### What to Analyze

STRIDE is applied to **boundaries** and **flows**, not just components in isolation. For a C4 Container diagram, analyze:

1. **Each container's exposed interfaces:** Every API surface, UI entry point, or webhook endpoint a container exposes is a threat target
2. **Each data flow between containers:** Every arrow on the container diagram represents data crossing a boundary — analyze what could go wrong in transit
3. **Each trust boundary crossing:** Where data moves from a less-trusted to a more-trusted zone (or vice versa), apply STRIDE with extra scrutiny
4. **Each external integration:** Third-party services are outside your trust boundary — analyze the integration points, not the third-party's internal security

### Analysis Order

For systematic coverage, analyze in this order:

1. **External-facing boundaries first:** Browser-to-server, public API endpoints, webhook receivers — these are the highest-exposure targets
2. **Inter-container boundaries second:** API-to-database, API-to-queue, API-to-cache — these are internal but still cross trust boundaries
3. **External integration boundaries third:** Server-to-Stripe, server-to-AI-provider, server-to-email-service — you control one side
4. **Data stores last:** Databases, file storage, caches — analyze access controls and data-at-rest protections

### Trust Boundary Identification

Trust boundaries exist where:
- **Authentication is enforced:** The line between unauthenticated and authenticated access
- **Authorization changes:** The line between user roles (regular user vs. admin, freelancer vs. client)
- **Network zones change:** The line between public internet and private network, between your infrastructure and third-party services
- **Data sensitivity changes:** The line where data classification shifts (public content vs. PII vs. financial data)

Map each trust boundary explicitly. Label it with what changes across the boundary (auth level, network zone, data sensitivity). STRIDE analysis is most critical at these crossings.

## Risk Rating Matrix

### Likelihood Scale (1-5)

| Score | Level | Criteria |
|-------|-------|----------|
| 1 | Rare | Requires nation-state resources, zero-day exploits, or physical access. No known instances in similar products |
| 2 | Unlikely | Requires significant technical skill and insider knowledge. Possible but requires dedicated effort |
| 3 | Possible | Exploitable with moderate skill using known techniques. Common attack pattern exists. Requires some reconnaissance |
| 4 | Likely | Exploitable with basic tools and publicly available techniques. Similar attacks regularly seen in SaaS products |
| 5 | Almost Certain | Trivially exploitable. No authentication required, or vulnerability is exposed by default. Script-kiddie level |

**Factors that increase likelihood:**
- Internet-facing endpoint (vs. internal-only)
- No authentication required
- Handles financial or identity data (higher attacker motivation)
- Known CVEs in the technology stack
- Common misconfiguration in the platform (e.g., Supabase RLS disabled by default on new tables)

**Factors that decrease likelihood:**
- Behind authentication + authorization
- Managed service handles the security (e.g., Stripe handles PCI)
- Limited attack surface (no public API, no file uploads)
- Existing controls in place (rate limiting, input validation)

### Impact Scale (1-5)

| Score | Level | Criteria |
|-------|-------|----------|
| 1 | Negligible | No data exposure, no financial loss, minor UX disruption. Affects a single user session |
| 2 | Minor | Limited data exposure (non-sensitive), minor financial impact, brief service disruption. Affects a small number of users |
| 3 | Moderate | PII exposure for limited users, moderate financial loss, service degradation for hours. Regulatory notification may be required |
| 4 | Significant | Broad PII or financial data exposure, significant financial loss, extended service outage. Regulatory notification required, customer churn likely |
| 5 | Severe | Full database breach, payment data compromised, complete service destruction. Legal liability, regulatory penalties, existential business risk |

**Impact dimensions to evaluate:**
- **Data breach scope:** How many users affected, what data types exposed
- **Financial loss:** Direct monetary loss (fraud, theft) and indirect (legal, remediation, lost revenue)
- **Reputational damage:** Customer trust erosion, press coverage, social media exposure
- **Regulatory consequences:** GDPR fines, PCI-DSS violations, mandatory breach notifications
- **Operational impact:** Service downtime, recovery effort, business continuity

### Risk Level Classification

Calculate Risk Level = Likelihood x Impact, then classify:

| Risk Score | Classification | Response |
|------------|---------------|----------|
| 20-25 | **Critical** | Mitigate immediately before launch. Block deployment if unresolved. Escalate to stakeholders |
| 12-19 | **High** | Mitigate before launch or within Sprint 1. Accept only with explicit stakeholder sign-off |
| 6-11 | **Medium** | Mitigate within first 3 months. Acceptable for MVP with monitoring in place |
| 1-5 | **Low** | Accept or defer. Document the accepted risk. Review quarterly |

### Risk Matrix (Quick Reference)

```
Impact →        1          2          3          4          5
Likelihood ↓
5              5(M)      10(M)      15(H)      20(C)      25(C)
4              4(L)       8(M)      12(H)      16(H)      20(C)
3              3(L)       6(M)       9(M)      12(H)      15(H)
2              2(L)       4(L)       6(M)       8(M)      10(M)
1              1(L)       2(L)       3(L)       4(L)       5(M)
```

## Attack Tree Construction Methodology

Attack trees decompose a high-level threat goal into a hierarchy of sub-goals and specific attack methods. Build them for the top 3 threats by risk rating.

### Structure

```
Root: [Attacker's Goal]
├── Sub-goal A: [Intermediate objective]
│   ├── Method A1: [Specific attack technique]
│   │   ├── Required: [Skills, access, tools needed]
│   │   └── Control: [Existing mitigation, if any]
│   └── Method A2: [Alternative attack technique]
│       ├── Required: [Skills, access, tools needed]
│       └── Control: [Existing mitigation, if any]
├── Sub-goal B: [Alternative intermediate objective]
│   └── Method B1: [Specific attack technique]
│       ├── Required: [Skills, access, tools needed]
│       └── Control: [None — unmitigated path]
└── Sub-goal C: [Another path]
    └── ...
```

### Node Types

- **OR nodes (default):** Attacker needs to achieve ANY child node to achieve the parent (indicated by separate branches)
- **AND nodes:** Attacker needs to achieve ALL child nodes to achieve the parent (explicitly labeled `[AND]`)

### Construction Process

1. **Define the root:** State the attacker's ultimate goal in concrete terms (not "compromise the system" but "exfiltrate all user invoice data")
2. **Decompose into sub-goals:** What must the attacker achieve first? List all paths (OR nodes) and any compound requirements (AND nodes)
3. **Identify attack methods:** For each sub-goal, list the specific techniques. Reference OWASP Top 10 and the STRIDE findings
4. **Assess required capabilities:** For each leaf node, state what the attacker needs (skill level, tools, access, time)
5. **Map existing controls:** For each method, note what already blocks it (if anything)
6. **Identify unmitigated paths:** Highlight attack methods with no existing control — these drive the mitigation recommendations

### Attack Tree Quality Checks

- Does the tree have at least 3 sub-goals?
- Are all leaves specific attack methods (not abstract concepts)?
- Does every leaf include required capabilities?
- Are existing controls mapped where they exist?
- Are unmitigated paths explicitly called out?

## Mitigation Prioritization

### Risk-Reduction-per-Effort Scoring

For each mitigation, calculate its priority score:

```
Priority Score = (Risk Before - Risk After) / Effort
```

Where:
- **Risk Before:** Current risk score (Likelihood x Impact)
- **Risk After:** Risk score after implementing the mitigation (re-rated Likelihood x Impact)
- **Effort:** Numeric scale: Low = 1, Medium = 2, High = 3, Very High = 4

Higher priority scores indicate better return on security investment.

**Example:**
- Threat: Missing rate limiting on invoice creation (Risk: 4 x 3 = 12, High)
- Mitigation: Add Vercel middleware rate limiting (Effort: Low = 1)
- Risk After: Likelihood drops to 2 (Risk: 2 x 3 = 6, Medium)
- Priority Score: (12 - 6) / 1 = 6.0 (high-priority quick win)

### Effort Estimates

| Level | Duration | Examples |
|-------|----------|---------|
| Low | < 1 day | Add a configuration setting, enable an existing feature, add an RLS policy, set a header |
| Medium | 1-3 days | Implement input validation middleware, add webhook signature verification, set up audit logging |
| High | 1-2 weeks | Implement CSRF protection across all forms, add end-to-end encryption for sensitive fields, build admin audit dashboard |
| Very High | > 2 weeks | Implement field-level encryption with key management, build a comprehensive SIEM integration, add mTLS between all services |

### Mitigation Categories

1. **Preventive:** Stop the attack from succeeding (input validation, authentication, encryption)
2. **Detective:** Identify when an attack occurs (logging, monitoring, alerting)
3. **Corrective:** Reduce impact after an attack succeeds (backups, incident response, kill switches)

A complete mitigation plan includes controls from all three categories for Critical and High risks.

## Edge Cases

### No Architecture Diagram Available

If the user requests threat modeling without a defined architecture:
1. Ask for at minimum: system components, data flows, authentication approach, and external integrations
2. If the user provides a high-level description, sketch a minimal architecture (web app, API, database, external services) and confirm before proceeding
3. Flag in the output that the threat model is based on an assumed architecture and should be re-run once the Architecture Design is finalized

### API-Only Product (No Frontend)

For headless API products:
- Focus STRIDE analysis on API endpoints, authentication mechanisms, and data serialization
- Spoofing analysis emphasizes API key management, OAuth flows, and service-to-service auth
- Information Disclosure analysis emphasizes API response filtering, error message content, and documentation exposure
- Skip browser-specific threats (XSS, CSRF) unless the API serves a frontend you don't control
- Add threats specific to API consumers: rate abuse, credential sharing, unauthorized redistribution

### Serverless Architecture

For serverless (Lambda, Edge Functions, Vercel Functions):
- Cold start timing attacks are generally Low severity but document them
- Focus on function permission scoping (IAM roles per function, not a shared admin role)
- Analyze event source injection (can an attacker trigger a function with crafted events?)
- Shared state between invocations is a threat if using global variables for caching
- Third-party dependency supply chain risks are amplified (each function may have its own dependencies)

### Monolithic Application

For monoliths (as recommended by Architecture Design for early-stage SaaS):
- Internal component boundaries still matter — analyze module-to-module data flow
- A single compromised endpoint can access all data (vs. service isolation in microservices)
- Focus on database access controls (RLS, query parameterization) as the primary data isolation mechanism
- Background job security is critical — jobs often run with elevated permissions

### Third-Party Heavy Architecture

When the system relies heavily on managed services (Supabase, Clerk, Stripe):
- Focus on integration point security, not internal service security (Stripe's internals are Stripe's problem)
- Analyze the configuration of managed services (Supabase RLS policies, Clerk session settings, Stripe webhook verification)
- Identify what happens when a third-party is compromised (blast radius analysis)
- Document shared responsibility boundaries explicitly

## Sources and Rationale

This framework draws from:
- **Microsoft STRIDE** (Shostack, 2014) for threat categorization
- **OWASP Threat Modeling** for web application-specific threats and attack patterns
- **OWASP Top 10** (2021) for common web vulnerability categories
- **Attack Tree methodology** (Schneier, 1999) for hierarchical threat decomposition
- **NIST SP 800-30** for risk assessment methodology adapted to SaaS context
- **CWE/CAPEC** for specific attack pattern enumeration

Adapted specifically for AI-assisted analysis of early-stage SaaS architectures where the system is designed at the C4 Container level and the security team may be the same person as the developer.
