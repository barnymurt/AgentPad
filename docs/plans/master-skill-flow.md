# Master Skill Flow

**Date:** 2026-02-20
**Status:** Phase 1 - Lightweight (will be updated after Batch 5/6 design)

---

## Overview

This document shows the complete skill architecture for AgentPad, organized into 7 batches. It defines dependencies, team configurations, and data flows.

---

## Batch Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        AGENTPAD SKILLS                          │
├─────────┬─────────┬─────────┬─────────┬─────────┬─────────────┤
│ Batch 0 │ Batch 1 │ Batch 2 │ Batch 3 │ Batch 4 │ Batch 5-6   │
│ Security│Validation│ Arch.   │Complete │Research │ Not Designed│
│   7    │    2    │   9+    │   2+    │   16    │    27       │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────────┘
     ↓         ↓         ↓         ↓         ↓
   Founda-   →  Ready  →  Ready  →  Ready  → Research &
     tion              for Dev    for       Analysis
                                  Launch
```

---

## Batch 0: Security Foundation

**Purpose:** Core security skills required before any product development

| Skill | Role | Purpose |
|-------|------|---------|
| security-baseline-pack | Security Engineer | Define baseline security requirements |
| security-requirements-baseline | Security Engineer | Security requirements for projects |
| security-architecture-review | Security Architect | Review technical architecture |
| security-compliance-roadmap | Compliance Officer | Compliance mapping |
| threat-modeling | Security Architect | Identify threats |
| data-protection-assessment | Privacy Officer | Data handling assessment |
| privacy-regulation-assessment | Privacy Officer | Privacy compliance |

**Feeds into:** All other batches (security is foundational)

---

## Batch 1: Validation Pack

**Purpose:** Ensure product is ready for development

| Skill | Role | Purpose |
|-------|------|---------|
| validation-pack | QA Engineer | Validation testing |
| technical-readiness-pack | Technical Lead | Technical readiness |

**Consults:** security-baseline-pack (Batch 0)
**Feeds into:** Batch 2 (Architecture)

---

## Batch 2: Architecture & Foundation

**Purpose:** Define product requirements and technical approach

| Skill | Role | Purpose |
|-------|------|---------|
| architecture-design | Systems Architect | Technical architecture |
| requirements-elicitation | Business Analyst | Gather requirements |
| feature-prioritization | Product Manager | Prioritize features |
| user-persona-creation | UX Researcher | Define user types |
| user-journey-mapping | UX Researcher | Map user journeys |
| feedback-synthesis | UX Researcher | Synthesize feedback |
| saas-metrics-analysis | Data Analyst | Define SaaS metrics |
| devils-advocate | Devil's Advocate | Challenge assumptions |
| business-case-modeling | Business Analyst | Financial modeling |

**Consults:** validation-pack (Batch 1), security skills (Batch 0)
**Feeds into:** Batch 3, Batch 4

---

## Batch 3: Completion

**Purpose:** Final validation and market context

| Skill | Role | Purpose |
|-------|------|---------|
| competitor-research | Product Manager | Market analysis |
| business-case-modeling | Business Analyst | Financial case |

**Consults:** Batch 2 skills
**Feeds into:** Batch 4 (Research Squad)

---

## Batch 4: Research Squad

**Purpose:** Deep research and analysis skills (PM, BA, UX, Data)

### Phase 4.1: PM + BA Core
| Skill | Role |
|-------|------|
| user-story-generation | Product Manager |
| pricing-strategy | Product Manager |
| roadmap-planning | Product Manager |
| gap-analysis | Business Analyst |

### Phase 4.2: BA + UX Core
| Skill | Role |
|-------|------|
| process-mapping | Business Analyst |
| stakeholder-analysis | Business Analyst |
| information-architecture | UI/UX Designer |
| wireframing | UI/UX Designer |

### Phase 4.3: UX + Research Core
| Skill | Role |
|-------|------|
| heuristic-evaluation | UI/UX Designer |
| interview-guide-creation | User Researcher |
| survey-design | User Researcher |
| usability-test-planning | User Researcher |

### Phase 4.4: Data Analysis Core
| Skill | Role |
|-------|------|
| cohort-analysis | Data Analyst |
| funnel-analysis | Data Analyst |
| ab-test-design | Data Analyst |
| data-visualization | Data Analyst |

---

## Batch 5: Go-to-Market (NOT DESIGNED YET)

**Planned Categories:**
- Marketing Expert (4 skills)
- Product Marketing Expert (4 skills)
- SEO Expert (4 skills)
- Devil's Advocate (2 skills)

**Consults:** Batch 4 (Research Squad)
**Feeds into:** Deployment/Release

---

## Batch 6: Technical (NOT DESIGNED YET)

**Planned Categories:**
- Systems Architect (remaining skills)
- Database Expert (3 skills)
- Frontend Expert (4 skills)
- QA/Testing (3 skills)
- 3 Amigos Squad (PM + Dev + QA)

**Consults:** Batch 2 (Architecture)
**Feeds into:** Implementation

---

## Standard Squads

| Squad | Members | Purpose |
|-------|---------|---------|
| Discovery Squad | PM (Competitor Research) + BA (Requirements) + User Researcher | Early exploration |
| Design Squad | UX Designer (IA) + UX Designer (Wireframe) + User Researcher | Design decisions |
| Analysis Squad | BA (Gap Analysis) + Data Analyst (Cohort, Funnel) + PM (Prioritization) | Metrics & gaps |
| Research Squad | User Researcher (Interview, Survey, Feedback) | Research |
| Roadmap Squad | PM (User Story) + PM (Roadmap) + BA (Stakeholder) | Planning |
| Pricing Squad | PM (Pricing) + BA (Business Case) + Data Analyst (A/B) | Pricing decisions |
| 3 Amigos Squad | PM + Dev + QA | Ticket refinement |

---

## Known Dependencies

### Critical Path
```
security-baseline-pack (0) 
  → validation-pack (1) 
    → architecture-design (2)
      → requirements-elicitation (2)
        → user-story-generation (4)
          → roadmap-planning (4)
```

### Research Path
```
user-persona-creation (2) + user-journey-mapping (2)
  → interview-guide-creation (4)
    → survey-design (4)
      → cohort-analysis (4)
        → ab-test-design (4)
```

---

## Data Flow Examples

### Example 1: New Feature Request
```
1. requirements-elicitation (Batch 2)
2. user-persona-creation (Batch 2) [consulted]
3. user-story-generation (Batch 4)
4. gap-analysis (Batch 4)
5. roadmap-planning (Batch 4)
```

### Example 2: UX Improvement
```
1. user-journey-mapping (Batch 2)
2. wireframing (Batch 4)
3. heuristic-evaluation (Batch 4)
4. ab-test-design (Batch 4)
5. data-visualization (Batch 4) [for results]
```

### Example 3: Security Review
```
1. threat-modeling (Batch 0)
2. security-architecture-review (Batch 0)
3. security-requirements-baseline (Batch 0)
4. security-compliance-roadmap (Batch 0)
```

---

## Notes

- This is Phase 1 - lightweight version
- Batches 5-6 need design documents
- Batch 0 needs redesign (currently incomplete)
- Batches 1-3 need audit to determine if rebuild needed

---

*This document will be updated after Batches 5-6 are designed and Batches 0-3 are audited.*
