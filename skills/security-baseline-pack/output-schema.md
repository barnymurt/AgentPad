# Output Schema: Security Baseline Pack

This file defines the structure for the lightweight Security Baseline Pack — a 3-skill chain that adapts to user's actual product context. The output is reactive: it reflects the specific data, architecture, and threats from the user's input.

## Dynamic Adaptation

This schema is designed to adapt based on what the user provides:

- **If user provides full architecture:** Full output with component-specific analysis
- **If user provides product description only:** Slightly generalized output with assumptions noted
- **If user provides limited context:** Output emphasizes what can be assessed with available data

---

## Data Contracts

**Consumes:**
- User's product description
- Tech stack (frameworks, services, cloud provider)
- Data types handled (categories: PII, financial, health, etc.)
- Target market geography
- Existing security measures (if any)

**Produces:**
- `context.security_baseline_pack.full_output` — Complete outputs from all 3 skills
- `context.security_baseline_pack.summary` — Personalized summary document
- `context.security_baseline_pack.risk_score` — Overall security posture rating
- `context.security_baseline_pack.recommendations` — Prioritized action items

---

## Output Structure

```
# Security Baseline Pack: [Product Name]

## Document Metadata
- Generated: [Date]
- Product: [Name]
- Tech Stack: [Summary]
- Assessment Type: Lightweight (3-skill chain)

---

## Section 1: Security Requirements Baseline

### 1.1 Product Context Summary
- What the product does (as provided by user)
- Target users (as provided by user)
- Data types handled (as provided by user)
- Tech stack (as provided by user)

### 1.2 Data Sensitivity Classification
Table populated based on user's data types:

| Data Category | Sensitivity | Classification | Notes |
|--------------|-------------|----------------|-------|
| (from user input) | (assessed) | Public/Internal/Confidential/Restricted | (rationale) |

### 1.3 Security Requirements
Prioritized based on user's tech stack and data:

| ID | Requirement | Priority | Tech-Specific Guidance |
|----|------------|----------|------------------------|
| (auto) | (based on data) | P0/P1/P2 | (specific to user's stack) |

### 1.4 Security Posture Score
- P0 requirements: [X] of [Y] addressed
- P1 requirements: [X] of [Y] addressed
- Overall: [Strong/Moderate/Needs Work]

---

## Section 2: Threat Model

### 2.1 Threat Context
Based on user's product and target market:

| Threat Vector | Relevance | Risk Level |
|---------------|-----------|------------|
| (auto-assessed) | (why applicable) | Critical/High/Medium/Low |

### 2.2 Key Threats
Top 3-5 threats for this product:

| Threat | Attack Vector | Likelihood | Impact | Mitigation |
|--------|---------------|------------|--------|------------|
| (specific to user product) | (how it would happen) | (1-5) | (1-5) | (specific action) |

### 2.3 Risk Register
All identified risks with ratings:

| Risk ID | Description | Likelihood | Impact | Risk Score | Status |
|---------|-------------|------------|--------|------------|--------|
| (auto) | (what could go wrong) | (1-5) | (1-5) | (L×I) | Mitigated/Open |

---

## Section 3: Data Protection Assessment

### 3.1 Data Inventory
Based on user's stated data types:

| Data Type | Storage | Sensitivity | Protection Measures |
|-----------|---------|-------------|---------------------|
| (from user) | (where stored) | (level) | (what's in place) |

### 3.2 Data Flow Summary
Key flows based on user's product description:

| Flow | From | To | Sensitivity | Protection |
|------|------|-----|-------------|------------|
| (key flow) | (component) | (component) | (level) | (in place) |

### 3.3 Protection Recommendations
Prioritized based on user's data and tech stack:

| Recommendation | Priority | Effort | Impact |
|---------------|----------|--------|--------|
| (specific action) | P0/P1/P2 | S/M/L | High/Medium/Low |

---

## Section 4: Personalized Summary

### 4.1 Executive Summary
[Generated from actual outputs — not a template. Reflects user's specific results.]

### 4.2 Top 3 Actions
Ranked by risk reduction per effort:

1. [Most critical action based on actual threat model]
2. [Second priority based on requirements]
3. [Third priority based on data protection]

### 4.3 What's Working Well
[Based on requirements that are already satisfied by user's tech stack]

### 4.4 Gaps to Address
[Based on P0 requirements not yet addressed]

### 4.5 Upgrade Path
Recommendations for next steps:
- Full Technical Readiness Pack (7 skills) if deeper compliance needed
- Specific skills based on results (e.g., Privacy Regulation if handling significant PII)
- Re-assessment after implementing changes

---

## Validation Rules

1. All sections must be populated with user's specific data — no generic placeholder content
2. Tech-specific guidance must reference the actual technologies the user mentioned
3. Threat model must be relevant to user's product type and target market
4. Summary must reflect actual results, not pre-written text
5. Recommendations must be actionable and specific to user's context

---

## Confidence Tagging

Apply confidence tags based on how much context the user provided:

- **High:** User provided full architecture with tech stack details
- **Medium:** User provided product description and tech stack categories
- **Low:** User provided only high-level product description

When confidence is Low, note: "This assessment is based on limited information. For more accurate results, provide more detail about your architecture and data handling."

---

## Dynamic Elements

This schema supports dynamic generation:

| Element | How It's Dynamic |
|---------|------------------|
| Requirements | Selected and prioritized based on user's tech stack |
| Threats | Derived from user's product type and target market |
| Recommendations | Specific to user's stated data types and existing measures |
| Summary | Generated from actual outputs, not pre-written |

The pack produces personalized output — each user's result should look different based on their specific context.
