# Output Schema: Architecture Design

This document defines the exact structure of the Architecture Design skill output. Every required section must be populated. Confidence levels are assigned where data sources vary in reliability.

## Data Contracts

**Consumes:**
- `context.requirements` — problem statement, functional requirements, constraints, assumptions (from Requirements Elicitation)
- `context.personas` — primary persona, JTBD, pain points, SaaS attributes (from User Persona Creation)
- `context.feature_priority` — Tier 1 features, dependencies, build sequence (from Feature Prioritization)
- `context.business_case` — revenue model, pricing, TAM/SAM/SOM, unit economics (from Business Case Modeling)
- `context.journey` — user journeys, touchpoints, moments of truth (from User Journey Mapping)
- Or: standalone user input if no Validation Pack exists

**Produces (consumed by downstream skills):**
- `context.architecture.system_context` — external actors, dependencies, boundaries
- `context.architecture.containers` — all containers with technology choices, responsibilities, interfaces
- `context.architecture.data_flows` — data flow diagrams with trust boundaries and sensitivity classification
- `context.architecture.auth_design` — auth approach, roles, permissions, API security
- `context.architecture.storage` — databases, file storage, caching, data classification per store
- `context.architecture.tech_stack` — per-container technology choices with rationale
- `context.architecture.decisions` — architecture decision record with deferred items and risks

---

## Section 1: Architectural Context (required)

### 1a. Product Summary
- **Product name** (required): Name of the product
- **One-line description** (required): What it does in one sentence
- **Input source** (required): "Validation Pack" or "Standalone input"

### 1b. Architectural Drivers
- **Functional requirements** (required): Top 5-10 requirements driving architecture decisions, each as a one-line statement
- **Quality attributes** (required): Performance, availability, scalability expectations with specific numbers where available
- **Constraints** (required): Budget, team size, timeline, existing technology commitments
- **Data sensitivity summary** (required): What types of sensitive data the system handles (PII, financial, health, etc.)

### 1c. Scale Parameters
| Parameter | Current Estimate | Confidence |
|-----------|-----------------|------------|
| Users at launch | (required) | H/M/L |
| Concurrent users | (required) | H/M/L |
| Transactions/day | (required) | H/M/L |
| Data growth/month | (required) | H/M/L |
| Geographic reach | (required) | H/M/L |

**Confidence criteria:**
- **High:** Based on comparable products, user research, or Validation Pack business case
- **Medium:** Reasonable estimate from market data or persona analysis
- **Low:** Assumption with no direct supporting evidence

---

## Section 2: System Context Diagram (required)

### 2a. Diagram
Mermaid or text-based diagram showing:
- The system as a single box (required)
- All human actors with their roles (required)
- All external systems with interaction description (required)
- Data flow direction and type for each relationship (required)

### 2b. Actor Descriptions
For each actor (required):
| Actor | Type | Interaction | Data Exchanged |
|-------|------|------------|----------------|
| (name) | Human/System | What they do | What data flows |

### 2c. External Dependency Register
For each external dependency (required):
| Dependency | Purpose | Criticality | Fallback |
|------------|---------|-------------|----------|
| (name) | Why it's needed | Critical/Important/Nice-to-have | What happens if unavailable |

---

## Section 3: Container Architecture (required)

### 3a. Container Diagram
Mermaid or text-based diagram showing:
- All containers (deployable units) with technology labels (required)
- Container-to-container communication with protocol (required)
- Data stores with type labels (required)
- External system connections from Section 2 (required)

### 3b. Container Specifications
For each container (required):

| Field | Value |
|-------|-------|
| **Name** | (required) |
| **Responsibility** | One sentence: what this container does (required) |
| **Technology** | Specific technology choice (required) |
| **Technology rationale** | Why this technology for this container (required) |
| **Data owned** | What data this container is responsible for (required) |
| **Interfaces exposed** | Named API surfaces or UI entry points (required) |
| **Communication** | How it talks to other containers: protocol, format, auth (required) |

### 3c. Architecture Pattern Decision
- **Pattern chosen** (required): Modular Monolith, API + SPA, Serverless, Microservices, or hybrid
- **Rationale** (required): Why this pattern for this product at this stage
- **Distribution triggers** (required): What conditions would justify moving to a more distributed architecture

---

## Section 4: Data Flow Diagrams (required)

### 4a. User Journey Coverage
List which user journeys are mapped (minimum 3, required):
| # | Journey | Source |
|---|---------|--------|
| 1 | (journey name) | Validation Pack / User input |

### 4b. Data Flow per Journey (required, minimum 3 journeys)
For each journey:

**Journey: [name]**
```
Step 1: [Actor] → [Container] | Data: [fields] | Sensitivity: [level]
Step 2: [Container] → [Container] | Data: [fields] | Sensitivity: [level]
...
```

Trust boundaries marked with `---[TRUST BOUNDARY: description]---`

### 4c. Data Store Summary (required)
| Data Store | Technology | Data Types | Sensitivity | Access Pattern | Retention |
|-----------|-----------|-----------|-------------|---------------|-----------|
| (name) | (tech) | What's stored | Public/Internal/Confidential/Restricted | Read-heavy/Write-heavy/Balanced | Duration |

---

## Section 5: Authentication & Authorization Design (required)

### 5a. Authentication
- **Approach** (required): Session-based, JWT, OAuth 2.0, third-party provider, etc.
- **Provider** (required if third-party): Specific service and why
- **User types** (required): Each type of user that authenticates
- **Login methods** (required): Email/password, social, SSO, magic link, etc.
- **Token/session management** (required): How sessions are created, stored, refreshed, invalidated

### 5b. Authorization
- **Model** (required): Simple role check, RBAC, ABAC, ReBAC
- **Roles defined** (required): Each role with description and permission summary
- **Resource-level permissions** (conditional, required if RBAC/ABAC): Which resources have per-resource access control

### 5c. API Security
- **Authentication method** (required): Bearer token, API key, session cookie, etc.
- **Rate limiting** (required): Approach and thresholds
- **Sensitive operations** (required): Operations requiring additional verification, and what verification

---

## Section 6: Storage Architecture (required)

### 6a. Primary Database
- **Technology** (required): Specific database with version
- **Rationale** (required): Why this database for this product
- **Hosting** (required): Managed service, self-hosted, embedded
- **Key entities** (required): Top 5-10 entities with relationships (ERD-level, not column-level)

### 6b. File/Blob Storage (conditional — required if the product handles file uploads or generates documents)
- **Technology** (required): S3, R2, local, etc.
- **Access pattern** (required): Direct upload, presigned URLs, API proxy
- **Security** (required): Access control approach, encryption

### 6c. Caching (conditional — required if product has performance-sensitive read paths)
- **Technology** (required): Redis, Memcached, in-memory, CDN
- **What's cached** (required): Specific data and why
- **Invalidation strategy** (required): TTL, event-based, manual

### 6d. Backup & Recovery
- **Approach** (required): Automated daily, point-in-time recovery, etc.
- **RPO/RTO targets** (required): How much data loss and downtime is acceptable

---

## Section 7: Tech Stack Recommendation (required)

### 7a. Stack Summary Table
| Layer | Technology | Score | Rationale | Trade-offs |
|-------|-----------|-------|-----------|------------|
| Frontend | (required) | 1-5 | (required) | (required) |
| Backend | (required) | 1-5 | (required) | (required) |
| Database | (required) | 1-5 | (required) | (required) |
| Auth | (required) | 1-5 | (required) | (required) |
| Hosting | (required) | 1-5 | (required) | (required) |
| (additional as needed) | | | | |

Scores use the Technology Selection Framework from framework.md (weighted criteria).

### 7b. Build vs. Buy Decisions
| Capability | Decision | Option Chosen | Rationale |
|-----------|----------|--------------|-----------|
| (required for each capability identified) | Build/Buy/Open-source | (specific name) | (required) |

---

## Section 8: Architecture Decision Record (required)

### 8a. Key Decisions
For each major decision (minimum 5, required):

| # | Decision | Rationale | Alternatives Considered | Trade-offs Accepted |
|---|----------|-----------|------------------------|-------------------|
| 1 | (required) | (required) | (required) | (required) |

### 8b. Deferred Decisions
| Decision | Why Deferred | When to Revisit |
|----------|-------------|----------------|
| (required, minimum 3) | (required) | (required) |

### 8c. Risk Flags
| Risk | Severity | Mitigation | Related Decision |
|------|----------|-----------|-----------------|
| (required, minimum 3) | Critical/High/Medium/Low | (required) | ADR # |

### 8d. Security Review Readiness
- **Components named and bounded:** Yes/No (must be Yes)
- **Data flows mapped with sensitivity:** Yes/No (must be Yes)
- **Auth approach specified:** Yes/No (must be Yes)
- **Trust boundaries identified:** Yes/No (must be Yes)
- **Gaps for security team:** List any known gaps that Threat Modeling should investigate

---

## Validation Rules

1. All 8 sections must be present and populated
2. Container Diagram must show at least 3 containers (frontend, backend, database minimum)
3. At least 3 data flow journeys mapped with trust boundaries
4. Every technology choice must have a rationale (no "use X" without "because Y")
5. Data sensitivity classification applied to every data store
6. Architecture Decision Record has at least 5 decisions and 3 deferred decisions
7. Security Review Readiness section must have all four checkboxes as Yes
8. Scale parameters must have confidence levels assigned
9. No placeholder content — all fields populated with scenario-specific content
