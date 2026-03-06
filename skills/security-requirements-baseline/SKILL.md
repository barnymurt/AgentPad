---
name: security-requirements-baseline
description: Define the minimum security posture for a SaaS product at launch. Use when the user asks what security measures they need, what security requirements to implement before launching, what the minimum security bar is, or how to secure their application for production. Covers authentication standards, encryption requirements, input validation, logging, dependency management, and infrastructure hardening — prioritized as "must have at launch" vs "add within 6 months."
lifecycle: build
category: engineering
outputSummary: Security requirements document with compliance checklist
relatedAfter: security-architecture-review,threat-modeling
nextSteps: Implement security requirements
specialization: fullstack
---

# Security Requirements Baseline

Produce a prioritized security requirements checklist for SaaS products transitioning from validated idea to first production deployment. Unlike raw LLM output that lists generic security best practices, this skill analyzes the specific architecture, data sensitivity, and customer segment to determine which security controls are essential at launch vs. which can be deferred — preventing both under-investment (shipping with critical gaps) and over-investment (spending weeks on enterprise security for an MVP with 50 users).

## Core Workflow

### Step 1: Assess Security Context

**Framework Selection Decision Tree:**

Choose the appropriate framework based on your context:

| If... | Use... | Rationale |
|-------|--------|-----------|
| General SaaS, web app | OWASP ASVS Level 1 | Industry standard for web apps |
| Healthcare data | OWASP ASVS + HIPAA | Healthcare-specific requirements |
| Financial data | OWASP ASVS + PCI-DSS | Payment card industry requirements |
| Enterprise/corporate | NIST CSF | Comprehensive enterprise framework |
| Government/critical | NIST SP 800-53 + ISO 27001 | Highest assurance requirements |
| UK/EU focused | ISO 27001 + GDPR | International standards |

**Product-Type Templates:**

Use the appropriate template for your product type:

| Product Type | Key Focus Areas |
|--------------|----------------|
| **SaaS (B2B)** | Multi-tenancy, role-based access, API security, subscription enforcement |
| **SaaS (B2C)** | Consumer data protection, social auth, high-volume auth |
| **E-commerce** | Payment handling, PCI-DSS, cart security, order data protection |
| **Healthcare** | HIPAA, PHI handling, audit logging, data encryption |
| **Fintech** | PCI-DSS, transaction security, fraud prevention, SOC 2 |
| **Startup MVP** | Core essentials: auth, encryption, input validation |

lifecycle: build
category: engineering
outputSummary: Security requirements document with compliance checklist
relatedAfter: security-architecture-review,threat-modeling
nextSteps: Implement security requirements
specialization: fullstack
---

Before defining requirements, understand what you're securing:

1. **Gather architecture inputs:**
   - Load Architecture Design output (`context.architecture`) if available
   - Extract: containers, data flows, auth approach, data stores, tech stack, trust boundaries
   - If no Architecture Design: ask user for product description, tech stack, and what data they handle

2. **Classify data sensitivity:**
   - What data types does the system handle? (PII, financial, health, children's data, credentials)
   - Use the Data Sensitivity Classification from Architecture Design (Public/Internal/Confidential/Restricted)
   - If not classified yet, classify now using the framework in [references/framework.md](references/framework.md)

3. **Determine threat profile:**
   - Who are the likely attackers? (opportunistic scanners, targeted attackers, insider threats)
   - What's the blast radius of a breach? (embarrassment, financial loss, regulatory action, physical harm)
   - What compliance regimes apply? (flag for Privacy Regulation Assessment — don't deep-dive here)

4. **Assess team capability:**
   - Solo founder or team? Security expertise level?
   - What's the security budget (time and money)?
   - What's the timeline to launch?

If the user provides no architecture context, ask: "What does your product do, what data does it handle, and what tech stack are you using?" Do not proceed without understanding data sensitivity.

### Step 2: Map OWASP ASVS Level 1 Requirements

Apply the OWASP Application Security Verification Standard Level 1 requirements to the specific architecture:

1. **Authentication requirements** — mapped to the auth approach from Architecture Design
2. **Session management** — mapped to session/token handling
3. **Access control** — mapped to authorization model
4. **Input validation** — mapped to API endpoints and data flows
5. **Cryptography** — mapped to data stores and data-in-transit
6. **Error handling and logging** — mapped to containers and external dependencies
7. **Data protection** — mapped to data sensitivity classification
8. **Communication security** — mapped to container-to-container and external communications
9. **Configuration** — mapped to hosting, deployment, and dependency management

For each category, produce specific, actionable requirements (not "use encryption" — instead "enable TLS 1.2+ on all API endpoints and database connections").

### Step 3: Prioritize by Launch Criticality

**Business Tier Templates:**

| Tier | Description | P0 (Must Have) | P1 (3 Months) | P2 (6 Months) |
|------|-------------|----------------|----------------|----------------|
| **Startup** | < 100 users, solo/founders | Auth, encryption, input validation | Logging, rate limiting | WAF, monitoring |
| **Growth** | 100-10K users, small team | All P0 + audit logging, 2FA | All P1 + monitoring, penetration test | All P2 + SOC 2 prep |
| **Enterprise** | 10K+ users, dedicated team | All growth + compliance | All compliance prep | Continuous pen testing |

**Minimum Requirements by Tier:**

**Startup (P0 only):**
- Secure authentication (hashed passwords or trusted provider)
- HTTPS everywhere
- Input validation on all endpoints
- Parameterized queries (no SQL injection)
- Environment variables for secrets (no hardcoded)
- Basic logging (errors, auth failures)

**Growth (P0 + P1):**
- All Startup requirements
- Multi-factor authentication
- Role-based access control
- Audit logging for sensitive actions
- Rate limiting on auth endpoints
- API key management

**Enterprise (All tiers):**
- All Growth requirements
- SOC 2 compliance controls
- Advanced monitoring/SIEM
- Regular penetration testing
- Incident response plan
- Vendor security assessments

lifecycle: build
category: engineering
outputSummary: Security requirements document with compliance checklist
relatedAfter: security-architecture-review,threat-modeling
nextSteps: Implement security requirements
specialization: fullstack
---

Classify each requirement into one of three tiers:

1. **Must Have at Launch (P0):**
   - Prevents catastrophic security failures (data breaches, auth bypass, injection attacks)
   - Required by the data sensitivity level (e.g., encryption for financial data)
   - Minimal effort relative to risk (e.g., parameterized queries, HTTPS)
   - Would cause immediate trust loss if missing (e.g., passwords stored in plaintext)

2. **Add Within 3 Months (P1):**
   - Important but not catastrophic if deferred briefly
   - Requires more effort to implement properly
   - May depend on usage patterns not yet known
   - Examples: rate limiting tuning, detailed audit logging, CSP headers

3. **Add Within 6 Months (P2):**
   - Defense-in-depth measures that matter at scale
   - Require infrastructure investment
   - Relevant when user count or data volume grows
   - Examples: WAF, DDoS protection, security monitoring dashboard, penetration testing

### Step 4: Generate Implementation Checklist

For each requirement, produce:

1. **Requirement statement** — what must be true (testable assertion)
2. **Priority tier** — P0/P1/P2
3. **Category** — which ASVS domain
4. **Implementation guidance** — how to achieve it with the chosen tech stack
5. **Verification method** — how to confirm it's implemented correctly
6. **Effort estimate** — S/M/L relative to implementation time

Group requirements by category, sorted by priority within each category.

### Step 5: Identify Architecture-Specific Risks

Based on the specific architecture and tech stack, flag risks that generic checklists miss:

1. **Third-party dependency risks** — which external services handle sensitive data? What are their security postures?
2. **Default configuration risks** — which tech stack defaults are insecure? (e.g., debug mode, verbose errors, permissive CORS)
3. **Deployment pipeline risks** — are secrets in environment variables? Is the deployment pipeline secured?
4. **Data flow risks** — where does sensitive data cross trust boundaries without adequate protection?

### Step 6: Produce Security Baseline Summary

Synthesize findings into:

1. **Security posture score** — Current state vs. target state at launch (percentage of P0 requirements met)
2. **Top 5 actions** — The 5 highest-impact security improvements ranked by risk-reduction-per-effort
3. **Deferred items register** — P1/P2 items with specific trigger conditions for when they become P0
4. **Handoff notes** — What Threat Modeling and Security Architecture Review should investigate further

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Security Context Assessment** — data sensitivity, threat profile, team capability
- **Requirements Checklist** — categorized, prioritized, with implementation guidance
- **Architecture-Specific Risks** — risks unique to this tech stack and design
- **Security Baseline Summary** — score, top 5 actions, deferred items, handoff notes

Expected length: 2,500-4,000 words depending on architecture complexity.

## Quality Criteria

- [ ] Data sensitivity classification applied to all data stores (not assumed)
- [ ] Every P0 requirement has implementation guidance specific to the tech stack (not generic)
- [ ] Requirements are testable assertions (not vague guidance like "use strong encryption")
- [ ] Priority tiers have clear justification (why P0 vs P1 for this specific product)
- [ ] Third-party dependency security postures assessed
- [ ] Default configuration risks identified for chosen frameworks/services
- [ ] Effort estimates provided for all P0 requirements
- [ ] Verification methods defined (how to check each requirement is met)
- [ ] Handoff notes identify specific areas for Threat Modeling to investigate
- [ ] SaaS-specific controls included (multi-tenancy isolation, subscription tier enforcement, API key management)

## References

- **OWASP ASVS framework and prioritization methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Generic checklists that ignore the architecture:** Producing a list of "security best practices" that could apply to any application. Every requirement must reference a specific component, data flow, or technology from the architecture. "Enable HTTPS" is generic. "Configure Vercel to enforce HTTPS on all routes including the /api/webhooks/stripe endpoint" is specific.

2. **Over-investing at MVP stage:** Recommending WAF, SIEM, bug bounty programs, and penetration testing for a product with 50 users. The P0/P1/P2 tiers exist precisely to prevent this. P0 should be achievable by a solo founder in 1-2 days of focused work.

3. **Ignoring third-party security posture:** Treating Stripe, Clerk, Supabase etc. as inherently secure without examining what data they handle and what their security guarantees are. Third-party services are part of the attack surface — their breach is your breach.

4. **Confusing compliance with security:** Listing GDPR or SOC 2 requirements as security requirements. Compliance is handled by Privacy Regulation Assessment and Security & Compliance Roadmap. This skill focuses on technical security controls that protect the system, not regulatory obligations.

5. **Missing the defaults:** Not checking what the chosen frameworks and services do by default. Next.js has CSRF protection built in. Supabase has RLS but it's opt-in per table. Clerk handles password hashing. Knowing what's already handled vs. what needs explicit implementation prevents both gaps and redundant work.
