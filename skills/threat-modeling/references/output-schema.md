# Output Schema: Threat Modeling

This document defines the exact structure of the Threat Modeling skill output. Every required section must be populated. Risk ratings use the Likelihood x Impact matrix defined in framework.md.

## Data Contracts

**Consumes:**
- `context.architecture.containers` -- all containers with technology choices, responsibilities, interfaces (from Architecture Design)
- `context.architecture.data_flows` -- data flow diagrams with trust boundaries and sensitivity classification (from Architecture Design)
- `context.architecture.auth_design` -- auth approach, roles, permissions, API security (from Architecture Design)
- `context.architecture.storage` -- databases, file storage, caching, data classification per store (from Architecture Design)
- `context.architecture.system_context` -- external actors, dependencies, boundaries (from Architecture Design)
- `context.architecture.decisions` -- architecture decision record with deferred items and risks (from Architecture Design)
- `context.security_baseline.requirements_checklist` -- security requirements with priority (from Security Requirements Baseline, if available)
- `context.security_baseline.priority_summary` -- critical security requirements summary (from Security Requirements Baseline, if available)
- Or: standalone user input if no Architecture Design exists (must include components, data flows, auth approach, integrations)

**Produces (consumed by downstream skills):**
- `context.threat_model.stride_analysis` -- per-component STRIDE findings with threat descriptions and attack vectors
- `context.threat_model.attack_trees` -- top 3 threat trees with sub-goals, methods, and required capabilities
- `context.threat_model.risk_register` -- all threats ranked by risk level (Likelihood x Impact) with severity classification
- `context.threat_model.mitigations` -- per-threat mitigations with effort estimates, implementation guidance, and residual risk
- `context.threat_model.threat_summary` -- severity counts, top risks, security posture assessment, handoff notes

---

## Section 1: Threat Modeling Context (required)

### 1a. Product Summary
- **Product name** (required): Name of the product
- **One-line description** (required): What it does in one sentence
- **Input source** (required): "Architecture Design output" or "Standalone input"

### 1b. Architecture Summary
- **Containers analyzed** (required): List of all containers from the architecture with their technologies
- **External integrations** (required): List of all third-party services and what data flows to/from them
- **Data sensitivity** (required): Summary of data classifications from the architecture (PII, financial, restricted)

### 1c. Scope
- **In scope** (required): Which components, flows, and boundaries are analyzed
- **Out of scope** (required): What is explicitly excluded and why (e.g., third-party internals, cloud provider infrastructure)
- **Assumptions** (required): Security assumptions made during analysis (e.g., "TLS is enforced on all HTTPS connections," "Supabase manages database patching")

### 1d. Threat Actors
For each identified threat actor (minimum 3, required):

| Actor | Motivation | Capability | Access Level | Example Scenario |
|-------|-----------|------------|-------------|-----------------|
| (required) | Why they attack | Skill and resources | What they can reach | Concrete scenario |

---

## Section 2: STRIDE Analysis (required)

### 2a. Threat Target Inventory
List all analyzed targets (required):

| # | Target | Type | Trust Boundary | Data Sensitivity |
|---|--------|------|---------------|-----------------|
| (required) | Component or flow name | Component Boundary / Data Flow / External Integration / Data Store | Which boundary it crosses | Public / Internal / Confidential / Restricted |

### 2b. STRIDE Findings per Target

For each target, document applicable STRIDE threats (required for every target in inventory):

**Target: [Component/Flow Name]**

| Category | Threat Description | Attack Vector | Existing Controls | Risk Rating (LxI) | Severity |
|----------|-------------------|--------------|-------------------|-------------------|----------|
| Spoofing | (description or "N/A — [reason]") | (specific technique) | (what currently mitigates, or "None") | (e.g., 3x4=12) | (Critical/High/Medium/Low) |
| Tampering | (description or "N/A — [reason]") | ... | ... | ... | ... |
| Repudiation | (description or "N/A — [reason]") | ... | ... | ... | ... |
| Info Disclosure | (description or "N/A — [reason]") | ... | ... | ... | ... |
| Denial of Service | (description or "N/A — [reason]") | ... | ... | ... | ... |
| Elevation of Privilege | (description or "N/A — [reason]") | ... | ... | ... | ... |

**Requirements:**
- Every target in the inventory must have a STRIDE table
- Every STRIDE category must be addressed (threat description or explicit "N/A" with reason)
- Risk ratings use the 1-5 Likelihood x 1-5 Impact scale from framework.md
- Severity classification follows the Risk Level table from framework.md

---

## Section 3: Attack Trees (required)

### 3a. Threat Selection
Identify the top 3 threats by risk rating for attack tree analysis (required):

| # | Threat | Risk Rating | Why Selected |
|---|--------|------------|-------------|
| 1 | (required) | (LxI score) | (required) |
| 2 | (required) | (LxI score) | (required) |
| 3 | (required) | (LxI score) | (required) |

### 3b. Attack Trees (required, one per selected threat)

For each selected threat:

**Attack Tree: [Attacker's Goal]**

```
Root: [Goal statement]
├── Sub-goal A: [Intermediate objective] [OR]
│   ├── Method A1: [Specific technique]
│   │   ├── Required: [Skills, access, tools]
│   │   ├── Control: [Existing mitigation or "None"]
│   │   └── Viable: [Yes/No — is this path open?]
│   └── Method A2: [Alternative technique]
│       ├── Required: [Skills, access, tools]
│       ├── Control: [Existing mitigation or "None"]
│       └── Viable: [Yes/No]
├── Sub-goal B: [Alternative path] [OR]
│   └── ...
└── Sub-goal C: [Compound requirement] [AND]
    ├── Step C1: [First requirement]
    └── Step C2: [Second requirement]
```

**Summary:**
- **Viable paths:** (required) Count of unmitigated attack paths
- **Highest-leverage mitigation:** (required) Which control would block the most paths
- **Required attacker capability:** (required) Minimum skill level to exploit any viable path

---

## Section 4: Risk Register (required)

### 4a. Full Risk Register

All identified threats, sorted by risk score descending (required):

| # | Threat | STRIDE Category | Component | Likelihood (1-5) | Impact (1-5) | Risk Score | Severity | Existing Controls |
|---|--------|----------------|-----------|------------------|-------------|------------|----------|------------------|
| (required) | (required) | S/T/R/I/D/E | (required) | (required) | (required) | (required, LxI) | (required) | (required) |

**Minimum: 15 threats rated.**

### 4b. Severity Distribution
| Severity | Count | Percentage |
|----------|-------|-----------|
| Critical | (required) | (required) |
| High | (required) | (required) |
| Medium | (required) | (required) |
| Low | (required) | (required) |
| **Total** | (required) | 100% |

---

## Section 5: Recommended Mitigations (required)

### 5a. Mitigation Plan

For each threat rated High or Critical (required), and optionally for Medium threats:

| # | Threat | Current Severity | Mitigation | Effort | Implementation Guidance | Risk After | Residual Severity | Priority Score |
|---|--------|-----------------|-----------|--------|------------------------|-----------|------------------|---------------|
| (required) | (required) | (required) | Specific action (required) | Low/Med/High/Very High (required) | Tech-stack-specific steps (required) | Re-rated LxI (required) | (required) | (Risk Before - Risk After) / Effort (required) |

**Requirements:**
- All Critical and High threats must have mitigations
- Implementation guidance must reference the actual tech stack (specific libraries, configs, services)
- Effort estimates must be realistic for the team size and stage described in the architecture
- Residual risk must be re-scored, not just "reduced"
- Priority score calculated per framework.md methodology

### 5b. Quick Wins
List 3-5 mitigations with Low effort that address High or Critical risks (required):

| # | Mitigation | Threat Addressed | Effort | Risk Reduction |
|---|-----------|-----------------|--------|---------------|
| (required, minimum 3) | (required) | (required) | Low | From X to Y |

---

## Section 6: Threat Model Summary (required)

### 6a. Threat Counts
- **Total threats identified** (required): Count
- **Critical** (required): Count and brief description of each
- **High** (required): Count
- **Medium** (required): Count
- **Low** (required): Count

### 6b. Top 3 Risks
For each (required):
| # | Risk | Score | One-line Description |
|---|------|-------|---------------------|
| 1 | (required) | (required) | (required) |
| 2 | (required) | (required) | (required) |
| 3 | (required) | (required) | (required) |

### 6c. Security Posture Assessment
- **Overall assessment** (required): Strong / Adequate / Needs Improvement / Weak
- **Justification** (required): 2-3 sentences explaining the assessment based on the risk register and existing controls
- **Strengths** (required): What the architecture already does well for security
- **Gaps** (required): What the architecture is missing

### 6d. Handoff Notes for Security Architecture Review
- **Areas requiring deeper investigation** (required): What this threat model surfaced that needs specialized review
- **Assumptions to validate** (required): Security assumptions made that should be verified
- **Compliance considerations** (conditional): Regulatory requirements identified during analysis (GDPR, PCI-DSS, SOC 2)
- **Recommended next steps** (required): Prioritized list of actions after this threat model

---

## Validation Rules

1. All 6 sections must be present and populated
2. STRIDE analysis covers every target in the threat target inventory
3. Every STRIDE category addressed per target (finding or explicit "N/A" with reason)
4. Attack trees provided for exactly 3 threats, each with at least 3 sub-goals
5. Risk Register contains at least 15 rated threats
6. All Critical and High threats have mitigations with implementation guidance
7. Risk ratings use the 1-5 x 1-5 scale consistently (no scores outside 1-25 range)
8. Implementation guidance references the actual tech stack, not generic advice
9. Severity distribution totals match the Risk Register count
10. No placeholder content -- all fields populated with scenario-specific content
11. Threat actors are specific to the product (not generic "hacker" descriptions)
12. Trust boundaries from the Architecture Design are all accounted for in the threat target inventory
