# Framework: Architecture Design

This framework provides the systematic methodology for producing early-stage SaaS system architectures. It adapts the C4 model for the validation-to-build transition, focusing on producing artifacts concrete enough for security review while avoiding premature infrastructure commitments.

## Methodology Overview

Traditional system architecture either produces high-level diagrams too vague for security review or detailed specifications too premature for early-stage products. This framework hits the middle ground: Container-level C4 architecture with classified data flows, explicit auth design, and technology choices grounded in actual requirements — exactly what Security Officer and Compliance Expert skills need as input, without over-investing in details that will change during build.

## The C4 Model (Adapted for Early-Stage SaaS)

### C4 Levels and When to Use Them

| Level | What It Shows | When to Use | Batch 3 Scope? |
|-------|--------------|-------------|-----------------|
| **1. Context** | System as a black box + external relationships | Always — establishes boundaries | Yes |
| **2. Container** | Deployable units (apps, databases, queues) | Always — the core deliverable | Yes |
| **3. Component** | Internal modules within a container | During build — too detailed for validation-to-build | No (Batch 6) |
| **4. Code** | Class/function level | During implementation | No (Batch 6) |

### Why Container Level Is Right for This Stage

At the validation-to-build transition, the founder needs to know:
- What systems they need to build/buy/configure
- How data flows between them (for security and compliance)
- What technology choices to make (for hiring, cost, and timeline)
- What authentication approach to implement

They do NOT need:
- Internal module structure (depends on implementation decisions not yet made)
- API endpoint specifications (depends on feature details not yet finalized)
- Database column definitions (depends on exact data model not yet designed)
- Infrastructure sizing (depends on actual load patterns not yet observed)

## Architectural Driver Analysis

### Driver Categories

| Category | Examples | Impact on Architecture |
|----------|----------|----------------------|
| **Functional** | Feature list, user journeys, integrations | Determines containers and data flows |
| **Quality Attributes** | Performance, availability, scalability | Influences technology choices and topology |
| **Constraints** | Budget, team size, timeline, existing tech | Limits technology options and complexity |
| **Data Sensitivity** | PII, financial, health data | Drives storage, encryption, and auth decisions |

### Scale Parameter Assessment

| Parameter | Small (default for early-stage) | Medium | Large |
|-----------|-------------------------------|--------|-------|
| Users at launch | < 1,000 | 1,000-50,000 | > 50,000 |
| Concurrent users | < 100 | 100-5,000 | > 5,000 |
| Transactions/day | < 10,000 | 10K-1M | > 1M |
| Data growth/month | < 1 GB | 1-100 GB | > 100 GB |
| Geographic reach | Single region | Multi-region | Global |

**Default assumption:** Unless the Validation Pack or user indicates otherwise, assume Small scale. Early-stage SaaS should optimize for development speed and simplicity, not theoretical scale. Flag where the architecture would need to change at Medium/Large scale.

## Technology Selection Framework

### Decision Criteria (weighted)

| Criterion | Weight | What to Evaluate |
|-----------|--------|-----------------|
| **Requirement fit** | 1.5 | Does it solve the specific requirement well? |
| **Team capability** | 1.25 | Can the team (or solo founder) use it effectively? |
| **Ecosystem maturity** | 1.0 | Libraries, tools, hosting options, documentation quality |
| **Hiring market** | 1.0 | Can you hire developers who know it? |
| **Operational complexity** | 1.25 | How much infrastructure overhead does it add? |
| **Cost at expected scale** | 0.75 | What does it cost at the expected user/data volume? |
| **Migration cost** | 0.75 | How hard is it to switch if this choice proves wrong? |

### Scoring Scale

| Score | Meaning |
|-------|---------|
| 1 | Poor fit — significant friction or risk |
| 2 | Adequate — works but has notable downsides |
| 3 | Good — solid choice with manageable trade-offs |
| 4 | Strong — well-suited with minor trade-offs |
| 5 | Excellent — ideal match for requirements and constraints |

### Common SaaS Architecture Patterns

| Pattern | When to Use | When NOT to Use |
|---------|------------|-----------------|
| **Modular Monolith** | Default for early-stage. < 5 engineers, single deployment, rapid iteration needed | Team > 15 engineers, components with fundamentally different scaling needs |
| **API + SPA** | Web-first product, interactive UI, mobile app planned | Content sites, SEO-critical pages (use SSR instead) |
| **Serverless Functions** | Event-driven workflows, variable/spiky traffic, minimal ops team | Latency-sensitive (cold starts), complex state management, cost-sensitive at scale |
| **Microservices** | Clear bounded contexts, independent scaling needs, large team | < 5 engineers, pre-product-market-fit, shared database needs |

### Build vs. Buy Decision Matrix

| Capability | Build When | Buy When | Common Options |
|-----------|-----------|----------|----------------|
| **Authentication** | Core competency (identity product) | Almost always | Clerk, Auth0, Firebase Auth, Supabase Auth |
| **Payments** | Never (regulatory burden) | Always | Stripe, Paddle, LemonSqueezy |
| **Email** | Transactional email at scale | Almost always | SendGrid, Postmark, Resend, AWS SES |
| **File storage** | Compliance requires on-premises | Almost always | S3, Cloudflare R2, Supabase Storage |
| **Database** | Requires custom query engine | Almost always (managed) | Supabase, PlanetScale, Neon, Railway |
| **Search** | Core product feature | Adjacent feature | Algolia, Typesense, Meilisearch |
| **Analytics** | Product analytics is the product | Almost always | PostHog, Mixpanel, Amplitude |
| **Monitoring** | Never | Always | Sentry, Datadog, BetterStack |

## Data Flow Mapping Methodology

### Trust Boundary Identification

Every data flow crosses trust boundaries. Identify where:

| Boundary | Description | Security Implication |
|----------|-------------|---------------------|
| **Browser → Server** | User input enters the system | Input validation, CSRF protection, rate limiting |
| **Server → Database** | Application accesses persistent data | Query parameterization, connection security, access control |
| **Server → External API** | System calls third-party services | API key management, response validation, timeout handling |
| **Server → Server** | Internal service communication | Authentication between services, network isolation |
| **Database → Backup** | Data at rest is copied | Encryption at rest, backup access control |

### Data Sensitivity Classification

| Level | Definition | Examples | Storage Requirements |
|-------|-----------|----------|---------------------|
| **Public** | No impact if disclosed | Marketing copy, public product info | No special requirements |
| **Internal** | Minor impact if disclosed | Feature flags, internal metrics | Access control |
| **Confidential** | Significant impact if disclosed | User emails, usage data, business data | Encryption at rest + access control |
| **Restricted** | Severe impact if disclosed | Passwords, payment data, health records, PII | Encryption at rest + in transit, audit logging, minimal access |

## Authentication Architecture Decision Tree

```
Start: Does the product need user accounts?
├── No → API key authentication only
│   └── Consider: Rate limiting, key rotation, usage tracking
└── Yes → What type of users?
    ├── B2C (individual users)
    │   ├── Email/password + social login → Recommended: Third-party auth (Clerk, Auth0)
    │   └── Passwordless (magic link, OTP) → Recommended: Third-party auth with passwordless flow
    ├── B2B (team/organization accounts)
    │   ├── Need SSO/SAML? → Yes → Recommended: WorkOS or Auth0 Enterprise
    │   └── No SSO needed → Recommended: Third-party auth with organization model
    └── Marketplace (multiple user types)
        └── Recommended: Third-party auth + custom role/permission layer
```

### Authorization Model Selection

| Model | Best For | Complexity |
|-------|---------|-----------|
| **Simple role check** | < 5 roles, no resource-level permissions | Low |
| **RBAC** | Multiple roles, resource-level permissions needed | Medium |
| **ABAC** | Complex policies based on multiple attributes | High |
| **ReBAC** | Social/collaborative apps, relationship-driven access | High |

**Default for early-stage SaaS:** Simple role check (admin, member, viewer) or basic RBAC. More complex models are premature until actual permission requirements emerge from usage.

## Monolith-First Decision Framework

### Default: Start with Modular Monolith

A modular monolith means:
- Single deployable unit
- Internal module boundaries (by domain — billing, users, core product)
- Shared database with schema ownership per module
- Clear interfaces between modules (even though they're in-process)
- Ready to extract into services IF needed

### Triggers to Consider Distribution

| Trigger | What Changed | Response |
|---------|-------------|----------|
| Independent scaling needed | One module needs 10x the compute of others | Extract that module to a separate service |
| Independent deployment needed | One module deploys 10x more frequently | Extract with separate CI/CD |
| Technology mismatch | One module needs Python ML, rest is TypeScript | Extract with appropriate runtime |
| Team independence needed | > 15 engineers, teams stepping on each other | Extract bounded contexts per team |
| Regulatory isolation | One module handles regulated data | Extract to isolated, audited service |

If none of these triggers are present, the monolith is correct.

## Edge Cases

1. **User provides no technology preferences:** Use the Technology Selection Framework defaults. For solo founders or small teams, bias toward the most popular/hiring-friendly options in each category. State this assumption.

2. **Validation Pack output is incomplete:** If missing features or personas, design the architecture around what IS known. Flag gaps in the Architecture Decision Record as "deferred pending [missing input]."

3. **Product has real-time requirements:** (chat, collaboration, live updates) Flag this as a major architectural driver. Consider WebSocket support, event-driven patterns, and whether the primary database supports real-time subscriptions.

4. **Multi-tenant SaaS:** Address tenancy model early — shared database (row-level isolation), schema-per-tenant, or database-per-tenant. Default to shared database with row-level isolation for early-stage.

5. **Mobile-first product:** The architecture needs an API-first design even if web is the first client. Consider: offline support requirements, push notifications, app store deployment pipeline.

## Sources and Rationale

This framework draws from:
- **C4 Model** (Simon Brown) — structured diagram levels for software architecture
- **Monolith First** (Martin Fowler) — start simple, extract services when justified
- **The Twelve-Factor App** (Heroku) — methodology for building SaaS applications
- **OWASP Application Security Verification Standard** — security requirements that architecture must support
- **AWS/GCP Well-Architected Frameworks** — cloud architecture best practices adapted for early stage

Adapted specifically for early-stage SaaS where the architect has validated product requirements but no deployed system, and where security review readiness is a primary output goal.
