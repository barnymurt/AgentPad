---
name: architecture-design
description: Produce a system architecture for an early-stage SaaS or digital product. Use when the user asks to design an architecture, plan the technical structure, define system components, choose a tech stack, or map data flows for a product transitioning from validation to build. Covers component design, data flow mapping, auth approach, storage decisions, integration points, and tech stack recommendation at the Container level of the C4 model.
---

# Architecture Design

Produce a structured, Container-level system architecture for SaaS and digital products transitioning from idea validation to implementation. Unlike raw LLM output that jumps to specific technology choices or produces generic diagrams, this skill starts from validated product requirements and personas, maps the system at the right level of abstraction for early-stage decisions, and produces artifacts concrete enough for security review and threat modeling while avoiding premature infrastructure commitments.

## Core Workflow

### Step 1: Gather Architectural Context

Before designing anything, establish what you're architecting:

1. **Identify the input source:** Is there Validation Pack output available (requirements, feature backlog, personas, business case)? Or is this a standalone request?
   - If Validation Pack exists: extract requirements, Tier 1 features, personas, and business case constraints
   - If standalone: ask the user for product description, target users, key features, and revenue model

2. **Extract architectural drivers:**
   - **Functional requirements:** What must the system do? (from requirements elicitation or user input)
   - **Quality attributes:** What non-functional requirements matter? (performance, availability, scalability expectations)
   - **Constraints:** Budget, team size, timeline, existing technology commitments
   - **Data sensitivity:** What data does the system handle? (PII, financial, health — drives storage and security decisions)

3. **Determine scale parameters:**
   - Expected user count at launch, 6 months, 12 months
   - Concurrent user expectations
   - Data volume expectations (transactions/day, storage growth)
   - Geographic distribution of users

If the user provides vague input (e.g., "design my architecture" with no context), ask these questions before proceeding. Do not guess at scale or data sensitivity.

### Step 2: Define System Context (C4 Level 1)

Map the system's external relationships:

1. **Identify actors:** Who interacts with the system? (end users, admins, external systems, third-party services)
2. **Identify external dependencies:** Payment processors, email services, analytics, auth providers, external APIs
3. **Draw boundaries:** What's inside your system vs. what's external?
4. **Map interactions:** For each actor and external system, define: what data flows, which direction, what protocol

Produce a **System Context Diagram** in text/mermaid format showing the system as a single box with all external relationships.

### Step 3: Design Container Architecture (C4 Level 2)

Decompose the system into containers (deployable units):

1. **Identify containers:**
   - Web application (frontend)
   - API server(s) / backend service(s)
   - Database(s)
   - Background job processor (if async work needed)
   - File/blob storage (if user uploads or document generation)
   - Cache layer (if performance-sensitive)
   - Message queue (if event-driven patterns needed)

2. **For each container, define:**
   - Responsibility (what it does, single-sentence)
   - Technology choice with rationale (why this technology for this container)
   - Data it owns or accesses
   - Interfaces it exposes (API endpoints are named but not specified in detail — that's Batch 6)

3. **Map container-to-container communication:**
   - Synchronous (HTTP/REST, gRPC) vs. asynchronous (message queue, events)
   - Data format (JSON, protobuf, etc.)
   - Authentication between services (API keys, JWT, mTLS)

4. **Apply the monolith-first principle:** For early-stage SaaS, default to a modular monolith unless specific requirements demand distribution. Document the decision and what would trigger a move to microservices.

Produce a **Container Diagram** in text/mermaid format.

### Step 4: Map Data Flows

For each major user journey (derived from Validation Pack journey mapping or user input):

1. **Trace the data path:** From user action → frontend → API → database → response
2. **Identify data at each hop:** What fields, what sensitivity level
3. **Mark trust boundaries:** Where does data cross from untrusted to trusted (and vice versa)?
4. **Identify data stores:** For each data store, document: what's stored, sensitivity classification, retention requirements, access patterns

Produce a **Data Flow Diagram** covering the top 3-5 user journeys. This diagram is the primary input for Threat Modeling (STRIDE) and Data Protection Assessment.

### Step 5: Define Authentication and Authorization

1. **Auth approach:** Select and justify (session-based, JWT, OAuth 2.0, third-party provider like Clerk/Auth0/Firebase Auth)
2. **User roles and permissions:** Define roles, what each can access, and the authorization model (RBAC, ABAC, simple role check)
3. **API security:** How are API endpoints protected? (Bearer tokens, API keys, rate limiting)
4. **Sensitive operations:** Which operations require additional verification? (password change, payment, data export)

### Step 6: Define Storage Architecture

1. **Primary database:** Selection with rationale (PostgreSQL, MySQL, MongoDB, etc.)
2. **Data model overview:** Key entities and relationships (ERD-level, not column-level — detailed schema is Batch 6)
3. **File storage:** Where user uploads or generated files live (S3, local, CDN)
4. **Caching strategy:** What's cached, where, and invalidation approach
5. **Backup and recovery:** High-level approach (automated backups, point-in-time recovery availability)

### Step 7: Recommend Tech Stack

1. **For each container, recommend specific technologies** with rationale tied to:
   - Team capabilities (if known)
   - Hiring market depth
   - Community/ecosystem maturity
   - Fit with identified requirements
   - Cost at expected scale

2. **Flag trade-offs:** Every technology choice involves trade-offs. State them explicitly:
   - What you gain vs. what you give up
   - What would make you reconsider this choice
   - Migration cost if the choice proves wrong

3. **Identify build-vs-buy decisions:** For each capability, recommend build (custom), buy (SaaS), or open-source with rationale.

### Step 8: Synthesize Architecture Decision Record

Produce a summary of key architectural decisions:

1. **Decision log:** For each major decision (monolith vs. microservices, database choice, auth approach, hosting model), record: decision, rationale, alternatives considered, trade-offs accepted
2. **Deferred decisions:** What was explicitly NOT decided and why (detailed API design, infrastructure sizing, database schema — Batch 6 scope)
3. **Risk flags:** Architectural risks identified during design (single points of failure, scaling bottlenecks, vendor lock-in)
4. **Readiness for security review:** Confirm the architecture is concrete enough for Threat Modeling and Security Architecture Review to consume

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Architectural Context** — drivers, constraints, scale parameters
- **System Context Diagram** — C4 Level 1, external relationships
- **Container Architecture** — C4 Level 2, all containers with tech choices
- **Data Flow Diagrams** — top 3-5 user journeys with trust boundaries
- **Auth & Authorization Design** — approach, roles, API security
- **Storage Architecture** — databases, file storage, caching, backup
- **Tech Stack Recommendation** — per-container choices with trade-offs
- **Architecture Decision Record** — decisions, rationale, deferred items, risks

Expected length: 3,000-5,000 words depending on system complexity.

## Quality Criteria

- [ ] System Context Diagram identifies all external actors and dependencies
- [ ] Container Diagram shows all deployable units with technology choices
- [ ] Data Flow Diagrams cover at least 3 major user journeys with trust boundaries marked
- [ ] Auth approach is specified with justification (not just "use JWT")
- [ ] Every technology choice has a rationale tied to requirements (not just preference)
- [ ] Monolith-first principle applied or deviation explicitly justified
- [ ] Data sensitivity levels classified for all data stores
- [ ] Architecture is concrete enough for STRIDE threat modeling (named components, defined flows)
- [ ] Deferred decisions are explicitly listed (not silently omitted)
- [ ] Trade-offs stated for every major technology choice
- [ ] SaaS-specific patterns used (multi-tenancy approach, subscription billing integration, usage metering)

## References

- **C4 model framework and evaluation criteria:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Jumping to microservices:** Proposing distributed architectures for products that haven't launched. Early-stage SaaS should default to a modular monolith. Microservices add operational complexity that costs more than the scaling they enable at <10K users. Apply the monolith-first principle and document what triggers would justify distribution.

2. **Technology choices without rationale:** Recommending "use React and Node.js" without connecting the choice to specific requirements, team constraints, or trade-offs. Every technology must have a "why this, not that" justification. If the real reason is "it's popular," say so — that's a valid rationale (hiring, community support), but be explicit.

3. **Missing data sensitivity classification:** Designing storage and data flows without classifying what data is sensitive. A system handling financial data (PII, payment info) has fundamentally different architecture requirements than one handling public content. Classify data BEFORE making storage decisions.

4. **Over-specifying for the stage:** Producing detailed API specs, database schemas with column types, or infrastructure sizing for a product that hasn't been built. Container-level architecture is the right abstraction for validation-to-build. Detailed design is Batch 6 scope.

5. **Ignoring the "do nothing" path:** Not considering what happens if the user does nothing (no authentication, no encryption, default database settings). The architecture should explicitly state what the defaults are and why they're insufficient — this feeds directly into Security Requirements Baseline.
