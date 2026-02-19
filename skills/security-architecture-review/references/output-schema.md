# Output Schema: Security Architecture Review

This document defines the exact structure of the Security Architecture Review skill output. Every required section must be populated. Findings must be linked to threat model entries where a threat model is available.

## Data Contracts

**Consumes:**
- `context.architecture.system_context` — external actors, dependencies, boundaries
- `context.architecture.containers` — all containers with technology choices, responsibilities, interfaces
- `context.architecture.data_flows` — data flow diagrams with trust boundaries and sensitivity classification
- `context.architecture.auth_design` — auth approach, roles, permissions, API security
- `context.architecture.storage` — databases, file storage, caching, data classification per store
- `context.architecture.tech_stack` — per-container technology choices with rationale
- `context.architecture.decisions` — architecture decision record with deferred items and risks
- `context.threat_model.stride_analysis` — per-component STRIDE threat identification (if available)
- `context.threat_model.risk_register` — identified risks with likelihood and impact ratings (if available)
- `context.threat_model.mitigations` — planned or implemented mitigations for each threat (if available)

**Produces (consumed by downstream skills):**
- `context.security_review.component_assessments` — per-container security findings with severity and domain classification
- `context.security_review.auth_review` — end-to-end auth flow analysis for each user type with findings
- `context.security_review.api_review` — endpoint categorization with security evaluation per category
- `context.security_review.dependency_assessment` — third-party risk analysis with security posture and blast radius
- `context.security_review.remediation_plan` — all findings prioritized with tech-stack-specific actions
- `context.security_review.review_summary` — severity counts, posture assessment, critical findings, handoff notes

---

## Section 1: Review Scope (required)

### 1a. Architecture Summary
- **Product name** (required): Name of the product under review
- **Architecture source** (required): "Architecture Design skill output" or "User-provided architecture"
- **Architecture pattern** (required): Modular Monolith, Microservices, Serverless, etc.
- **Container count** (required): Number of containers reviewed
- **Tech stack summary** (required): One-line summary of key technologies (e.g., "Next.js + Supabase (PostgreSQL) + Clerk + Stripe + Inngest")

### 1b. Threat Model Summary
- **Threat model source** (required): "Threat Model skill output," "Inferred from architecture," or "Not available"
- **STRIDE threats identified** (conditional, required if threat model available): Count per category
- **Risk register entries** (conditional, required if threat model available): Count with severity distribution
- **Threat model gaps** (required): What the threat model does not cover that this review will note

### 1c. Scope Boundaries
- **Components reviewed** (required): List of every container, data store, and external dependency included
- **User flows reviewed** (required): List of data flow journeys traced during the review
- **Excluded from review** (required): Any components or flows not reviewed, with reason (e.g., "Infrastructure sizing — deferred decision, not yet concrete enough to review")

---

## Section 2: Per-Component Security Assessment (required)

For each container in the architecture (required, one subsection per container):

### Container: [Container Name]

**Technology:** (required) Specific technology and version
**Responsibility:** (required) One-sentence description from architecture design

**Findings:**

| # | Domain | Finding | Severity | CWE | Related Threat | Remediation |
|---|--------|---------|----------|-----|----------------|-------------|
| (required) | Auth/API/Data/Dependencies/Infrastructure/Error Handling | (required) Specific finding | Critical/High/Medium/Low | CWE-XXX | Threat model entry or STRIDE category | (required) Tech-stack-specific fix |

**Assessment:** (required) One-paragraph summary of this container's security posture — strengths, weaknesses, and overall risk level.

---

## Section 3: Authentication Flow Review (required)

### 3a. User Types and Auth Methods
For each user type (required):
| User Type | Auth Method | Auth Provider | Session Type | Token Lifetime |
|-----------|------------|---------------|-------------|----------------|
| (required) | (required) | (required) | (required) | (required) |

### 3b. Auth Flow Analysis
For each user type (required), trace the complete flow:

**User Type: [name]**

```
Step 1: [Action] → [Component] | Security control: [what protects this step]
Step 2: [Action] → [Component] | Security control: [what protects this step]
...
```

**Failure paths reviewed:**
- (required) What happens when [failure scenario]? Finding: [finding or "Adequately handled"]
- (required, minimum 3 failure paths per user type)

### 3c. Session Management Assessment
- **Session creation** (required): How sessions are created and what data they contain
- **Session storage** (required): Where sessions are stored (httpOnly cookie, local storage, server-side)
- **Session refresh** (required): How tokens are refreshed and whether refresh tokens are rotated
- **Session invalidation** (required): How logout works (server-side invalidation or client-side only)
- **Cross-device behavior** (required): Whether multiple sessions are allowed and how they are managed

### 3d. Auth Findings Summary
| # | Finding | Severity | Related Threat | Remediation |
|---|---------|----------|----------------|-------------|
| (required) | (required) | Critical/High/Medium/Low | (required) | (required) |

---

## Section 4: API Security Review (required)

### 4a. Endpoint Categorization
| Category | Endpoints | Auth Required | Example |
|----------|-----------|--------------|---------|
| Public | (required) | None | (required) |
| Authenticated | (required) | User-level | (required) |
| Privileged | (required or "None at MVP") | Admin-level | (required or N/A) |

### 4b. Per-Category Security Assessment

For each category (required):

**Category: [Public/Authenticated/Privileged]**

| Control | Status | Details |
|---------|--------|---------|
| Input validation | (required) Implemented/Partial/Missing | (required) Specifics |
| Output filtering | (required) Implemented/Partial/Missing | (required) Specifics |
| Rate limiting | (required) Implemented/Partial/Missing | (required) Specifics |
| Error handling | (required) Implemented/Partial/Missing | (required) Specifics |
| CORS policy | (required) Implemented/Partial/Missing | (required) Specifics |

### 4c. Webhook Security Assessment (conditional, required if webhooks exist)
For each webhook endpoint:
| Endpoint | Source | Signature Validation | Replay Protection | Idempotency |
|----------|--------|---------------------|-------------------|-------------|
| (required) | (required) | Yes/No/Unknown | Yes/No/Unknown | Yes/No/Unknown |

### 4d. API Findings Summary
| # | Finding | Severity | Related Threat | Remediation |
|---|---------|----------|----------------|-------------|
| (required) | (required) | Critical/High/Medium/Low | (required) | (required) |

---

## Section 5: Third-Party Dependency Assessment (required)

For each external service (required, one subsection per service):

### Service: [Service Name]

| Field | Value |
|-------|-------|
| **Purpose** | (required) What this service does for the product |
| **Data accessed** | (required) What data this service receives, stores, or processes |
| **Data sensitivity** | (required) Public/Internal/Confidential/Restricted |
| **Security certifications** | (required) SOC 2, ISO 27001, PCI DSS, or "None known" |
| **Breach history** | (required) Known breaches or "No known breaches" |
| **DPA in place** | (required) Yes/No/Not applicable |
| **Blast radius if compromised** | (required) What data is exposed, what functions are affected |
| **Contractual protections** | (required) Breach notification, data deletion, liability terms |
| **Risk level** | (required) Critical/High/Medium/Low with justification |

### Supply Chain Assessment (required)
- **Dependency management** (required): Lockfile committed? Versions pinned?
- **Vulnerability scanning** (required): Automated scanning in place? (npm audit, Dependabot, Snyk)
- **Update cadence** (required): How often are dependencies updated?

---

## Section 6: Remediation Plan (required)

### 6a. All Findings Prioritized

| Rank | Finding | Severity | Component | Related Threat | Remediation Action | Effort | Priority Score |
|------|---------|----------|-----------|----------------|-------------------|--------|---------------|
| (required, all findings from Sections 2-5) | (required) | Critical/High/Medium/Low | (required) | Threat entry or STRIDE category | (required) Tech-stack-specific action | S/M/L | (required) Calculated per framework |

Sort by Priority Score descending (highest priority first).

### 6b. Remediation Phases
- **Phase 1: Fix Before Launch** (required): Findings with Priority Score 9-12
- **Phase 2: Fix Within 1 Month** (required): Findings with Priority Score 5-8
- **Phase 3: Fix Within 3 Months** (required): Findings with Priority Score 3-4
- **Phase 4: Fix When Convenient** (required): Findings with Priority Score 1-2

For each phase, list the specific findings and their remediation actions.

---

## Section 7: Review Summary (required)

### 7a. Findings by Severity
| Severity | Count |
|----------|-------|
| Critical | (required) |
| High | (required) |
| Medium | (required) |
| Low | (required) |
| **Total** | (required) |

### 7b. Top 3 Critical Findings
For each (required, exactly 3 — if fewer than 3 Critical findings, include highest-severity findings):
1. **[Finding title]:** One-sentence description. Component: [name]. Remediation: [action]. Why it matters: [impact].
2. **[Finding title]:** ...
3. **[Finding title]:** ...

### 7c. Overall Security Architecture Assessment
- **Posture rating** (required): One of: **Strong** (no Critical, <=2 High) / **Adequate** (no Critical, 3+ High) / **Weak** (1-2 Critical) / **Critical** (3+ Critical)
- **Posture justification** (required): 2-3 sentences explaining the rating with reference to specific findings
- **Strengths** (required): What the architecture does well from a security perspective (minimum 2)
- **Key weaknesses** (required): The most impactful security gaps (minimum 2)

### 7d. Handoff Notes
- **For Data Protection Assessment** (required): Specific data handling findings that need deeper investigation (encryption gaps, data residency, retention policies)
- **For implementation team** (required): Guidance on which findings require code changes vs. configuration changes vs. architectural changes
- **For threat model update** (required): Any new threats identified during the review that should be added to the threat model

---

## Validation Rules

1. All 7 sections must be present and populated
2. Every container from the architecture must appear in Section 2 (no containers skipped)
3. Every user type must have an auth flow traced in Section 3
4. API endpoints must be categorized into at least Public and Authenticated categories
5. Every external service from the architecture must appear in Section 5
6. Every finding from Sections 2-4 must appear in the Remediation Plan (Section 6)
7. Severity classification must use the framework rubric (Critical/High/Medium/Low with consistent criteria)
8. Priority scores must be calculated using the formula from framework.md (severity x inverse effort)
9. Remediation actions must reference specific technologies from the architecture (not generic advice)
10. If a threat model is available, every finding must reference a specific threat entry or STRIDE category
11. Top 3 Critical Findings must be the highest-priority items from the Remediation Plan
12. No placeholder content — all fields populated with scenario-specific content
