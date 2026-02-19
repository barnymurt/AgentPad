# Output Schema: Security Requirements Baseline

This file defines the exact structure of the Security Requirements Baseline skill output. Every output must conform to this schema. Fields marked (required) must be populated; fields marked (conditional) are included when relevant data exists.

## Data Contracts

**Consumes:**
- `context.architecture.containers` — all containers with technology choices, responsibilities, interfaces
- `context.architecture.data_flows` — data flow diagrams with trust boundaries and sensitivity classification
- `context.architecture.auth_design` — auth approach, roles, permissions, API security
- `context.architecture.storage` — databases, file storage, caching, data classification per store
- `context.architecture.tech_stack` — per-container technology choices with rationale
- Or: standalone user input if no Architecture Design exists (product description, tech stack, data types handled)

**Produces (consumed by downstream skills):**
- `context.security_baseline.requirements_checklist` — categorized, prioritized requirements with implementation guidance and verification methods
- `context.security_baseline.priority_summary` — P0/P1/P2 counts and security posture score
- `context.security_baseline.architecture_risks` — architecture-specific risks with severity and mitigation
- `context.security_baseline.handoff_notes` — items for Threat Modeling and Security Architecture Review to investigate further

---

## Output Structure

```
# Security Requirements Baseline: [Product Name]

## 1. Security Context Assessment

### 1a. Product Summary
- Product name (required): Name of the product
- One-line description (required): What it does in one sentence
- Input source (required): "Architecture Design output" or "Standalone input"
- Tech stack summary (required): Key technologies in 1-2 sentences (e.g., "Next.js on Vercel, PostgreSQL via Supabase, Clerk auth, Stripe payments")

### 1b. Data Sensitivity Classification
Table covering all data stores and data types (required):

| Data Store | Technology | Data Types | Classification | Justification |
|-----------|-----------|-----------|----------------|---------------|
| (name) | (tech) | What's stored | Public/Internal/Confidential/Restricted | Why this classification |

Classification must be applied to every data store identified in the architecture.
The store's classification is the highest tier of any data type it contains.

### 1c. Threat Profile
- Likely attackers (required): Which attacker types are relevant and why (minimum 2)
- Highest-value target (required): What an attacker would most want to access or compromise
- Blast radius of worst-case breach (required): Embarrassment / Financial loss / Regulatory action / Physical harm — with specific scenario
- Applicable compliance regimes (required): List any that apply (GDPR, PCI-DSS, HIPAA, SOC 2, etc.) or state "None identified — flag for Privacy Regulation Assessment"

### 1d. Team Capability Assessment
- Team size and security expertise (required): Solo founder / small team / dedicated security
- Security budget (required): Time and money available for security implementation
- Timeline to launch (required): How soon requirements must be implemented
- Implication for prioritization (required): How team capability affects P0/P1/P2 classification

## 2. Requirements Checklist

Organized by ASVS category. Minimum 25 requirements total. At least 8 must be P0.

### [Category Name] (e.g., Authentication)

| ID | Requirement | Priority | Implementation Guidance | Verification Method | Effort |
|----|------------|----------|------------------------|--------------------:|--------|
| (required) | Testable assertion (required) | P0/P1/P2 (required) | Tech-stack-specific how-to (required) | How to confirm it works (required) | S/M/L (required) |

Requirements per category:
- Authentication (required): 3-6 requirements
- Session Management (required): 3-5 requirements
- Access Control (required): 3-6 requirements
- Input Validation (required): 3-6 requirements
- Cryptography (required): 3-5 requirements
- Error Handling & Logging (required): 3-5 requirements
- Data Protection (required): 3-5 requirements
- Communication Security (required): 3-5 requirements
- Configuration (required): 3-6 requirements

Each requirement must have:
- ID (required): Category prefix + sequential number (e.g., AUTH-01, INPUT-03)
- Requirement statement (required): Written as a testable assertion — "All API endpoints enforce authorization checks" not "Use access control"
- Priority (required): P0, P1, or P2 with implied justification from the decision tree
- Implementation guidance (required): Specific to the actual tech stack — "Configure Clerk's session management to use httpOnly cookies with SameSite=Strict" not "Use secure cookies"
- Verification method (required): How to confirm the requirement is met — "Attempt API call without auth token; verify 401 response" not "Test it"
- Effort (required): S (< 1 hour), M (1-4 hours), or L (4-16 hours)

## 3. Architecture-Specific Risks

Risks unique to this tech stack and design that generic checklists miss. Minimum 4 risks.

### 3a. Third-Party Dependency Risks
For each third-party service handling sensitive data (required, minimum 1):

| Service | Data Handled | Risk | Severity | Mitigation |
|---------|-------------|------|----------|------------|
| (name) | What sensitive data it accesses | Specific risk scenario | Critical/High/Medium/Low | Specific mitigation action |

### 3b. Default Configuration Risks
For each framework/service with insecure or surprising defaults (required, minimum 1):

| Technology | Default Behavior | Risk | Mitigation |
|-----------|-----------------|------|------------|
| (name) | What the default does | Why it's a problem | How to fix it |

### 3c. Deployment Pipeline Risks
For each risk in the deployment and infrastructure setup (required, minimum 1):

| Risk | Description | Severity | Mitigation |
|------|-------------|----------|------------|
| (name) | Specific risk scenario | Critical/High/Medium/Low | Specific mitigation action |

### 3d. Data Flow Risks
For each point where sensitive data crosses trust boundaries without adequate protection (required, minimum 1):

| Data Flow | Trust Boundary | Risk | Severity | Mitigation |
|----------|---------------|------|----------|------------|
| What data moves where | Which boundary it crosses | Specific risk scenario | Critical/High/Medium/Low | Specific mitigation action |

## 4. Security Baseline Summary

### 4a. Security Posture Score
- P0 requirements met / total P0 (required): [X] of [Y] P0 requirements currently addressed by the architecture
- P0 gap list (required): Specific P0 requirements NOT yet addressed, as a numbered list
- Overall posture assessment (required): One-sentence summary of security readiness

### 4b. Top 5 Actions
Ranked by risk-reduction-per-effort (required):

| Rank | Action | Requirements Addressed | Effort | Risk Reduction |
|------|--------|----------------------|--------|---------------|
| 1 | (specific action) | (requirement IDs) | S/M/L | What risk this eliminates or reduces |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... |

### 4c. Deferred Items Register
P1 and P2 items with trigger conditions for when they become P0 (required):

| Requirement ID | Description | Current Priority | Trigger to Promote to P0 | Trigger Timeline |
|---------------|-------------|-----------------|-------------------------|-----------------|
| (ID) | What it is | P1 or P2 | Specific condition that makes this urgent | When this condition is likely |

### 4d. Handoff Notes for Threat Modeling
Specific areas that Threat Modeling and Security Architecture Review should investigate further (required, minimum 3):

| Area | What to Investigate | Why It Matters | Priority |
|------|-------------------|---------------|----------|
| (component or flow) | Specific question to answer | What could go wrong | High/Medium/Low |
```

---

## Validation Rules

1. All four top-level sections (Security Context Assessment, Requirements Checklist, Architecture-Specific Risks, Security Baseline Summary) must be present and populated
2. Requirements Checklist contains at least 25 requirements across all categories
3. At least 8 requirements are classified as P0
4. Every requirement has implementation guidance specific to the product's tech stack — no generic advice
5. Data sensitivity classification is applied to all data stores identified in the architecture
6. Every data store in the architecture has a corresponding classification row
7. Architecture-Specific Risks contains at least 4 risks across the subsections
8. Top 5 Actions are ranked and reference specific requirement IDs
9. Deferred Items Register includes trigger conditions — not just "do it later"
10. Handoff Notes identify at least 3 specific areas for further investigation
11. No placeholder content — all fields populated with scenario-specific content
12. Effort estimates are calibrated to the specific tech stack (not generic)
13. Verification methods are actionable — describe a specific test, not "verify it works"

## Confidence Tagging

Apply confidence tags to Architecture-Specific Risks and Threat Profile:

- **High:** Based on documented architecture, known technology defaults, published security advisories
- **Medium:** Based on common patterns for the tech stack, likely but not confirmed configurations
- **Low:** Based on inference from product description when detailed architecture is unavailable

When architecture input is unavailable, mark all architecture-specific items as Low confidence and note: "Verify against actual implementation."
