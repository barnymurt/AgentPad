# Batch 2 Design Document: Architecture & Foundation Skills

**Date:** 2026-02-21
**Status:** Ready for Build (DA Review Complete)
**Author:** AI-assisted documentation

---

## 1a. Getting Started: Start Here

**Not sure which skill to use? Answer these questions:**

### If your goal is to validate an idea...

1. Do you have structured requirements? → No → Start with **requirements-elicitation**
2. Do you have target users defined? → No → Next → **user-persona-creation**
3. Do you know if it's financially viable? → No → Next → **business-case-modeling**
4. Do you need to challenge your assumptions? → Yes → Consult **devils-advocate**

### If your goal is to plan what to build...

1. Do you have a feature list? → No → Start with **requirements-elicitation**
2. Need to prioritize? → Next → **feature-prioritization**
3. Need to sequence into a roadmap? → Next → **roadmap-planning** (Batch 4)

### If your goal is to understand your users...

1. Need to define who your users are? → Start with **user-persona-creation**
2. Need to understand their experience? → Next → **user-journey-mapping**
3. Have user feedback to synthesize? → Use **feedback-synthesis**

### If your goal is to design technical architecture...

1. Have requirements defined? → No → Start with **requirements-elicitation**
2. Yes → Start with **architecture-design**

---

## 1b. Partial Input Handling

**What if you don't have all inputs?**

| If You Have | You Can Skip | With Confirmation |
|-------------|--------------|------------------|
| Existing personas | user-persona-creation | Confirm personas are current |
| Existing requirements | requirements-elicitation | Confirm no new requirements |
| Existing journey | user-journey-mapping | Confirm journey is accurate |
| Existing feature list | requirements-elicitation | Confirm list is complete |

**Protocol for skipping:**
1. Confirm with user: "You have existing [X]. Should I use that or start fresh?"
2. Validate input meets quality threshold
3. If quality insufficient, request improvement before proceeding

Batch 2 contains the **core foundational skills** for product development — the essential capabilities that every product team needs regardless of methodology. These 9 skills produce the structured artifacts that feed into Validation Pack (Batch 1) and Research Squad (Batch 4).

### 1.1 What This Batch Enables

| Downstream | How Batch 2 Feeds It |
|------------|---------------------|
| Validation Pack (Batch 1) | Requirements → Personas → Competitors → Business Case → Devil's Advocate → Feature Priority → Journey Map |
| Technical Readiness (Batch 1) | Architecture → Security Requirements → Threat Model → Data Protection → Privacy → Compliance |
| Research Squad (Batch 4) | Requirements → User Stories; Personas → Interviews; Journey → Wireframes; Metrics → Cohort Analysis |

---

## 2. Skill Inventory

### Batch 2 Skills (9 total)

| # | Skill | Role | Purpose |
|---|-------|------|---------|
| 1 | requirements-elicitation | Business Analyst | Gather structured requirements from stakeholders |
| 2 | user-persona-creation | UX Researcher | Define behavior-driven user personas |
| 3 | user-journey-mapping | UX Researcher | Map user experiences across stages |
| 4 | feature-prioritization | Product Manager | Score and rank features using RICE |
| 5 | devils-advocate | Devil's Advocate | Challenge assumptions and identify blind spots |
| 6 | business-case-modeling | Business Analyst | Financial modeling and viability analysis |
| 7 | architecture-design | Systems Architect | Technical architecture and tech stack |
| 8 | saas-metrics-analysis | Data Analyst | Define and calculate SaaS metrics |
| 9 | feedback-synthesis | User Researcher | Consolidate feedback into insights |

### Skill Status

All 9 skills have:
- ✅ SKILL.md
- ✅ output-schema.md
- ✅ framework.md
- ✅ worked-example.md

---

## 3. Skill Relationships

### 3.1 Primary Chain (Validation Pack flow)

```
requirements-elicitation
    ↓
user-persona-creation
    ↓
(user-journey-mapping ← optional, later)
    ↓
feature-prioritization
```

### 3.2 Analysis Chain

```
user-persona-creation
    ↓
user-journey-mapping
    ↓
feedback-synthesis (loop back to improve)
```

### 3.3 Financial Chain

```
requirements-elicitation
    ↓
user-persona-creation
    ↓
business-case-modeling
    ↓
saas-metrics-analysis
```

### 3.4 Technical Chain

```
requirements-elicitation
    ↓
architecture-design
    ↓
(feeds into Technical Readiness Pack)
```

### 3.5 Cross-Cutting

```
devils-advocate ← consults all skills
```

---

## 4. Data Contracts

### 4.1 Requirements → Persona

| From: requirements-elicitation | To: user-persona-creation |
|-------------------------------|-------------------------|
| target_users (roles) | Persona seed |
| problem statement | JTBD context |
| current_solution | Current workflow baseline |
| constraints | Technical proficiency assumptions |

### 4.2 Requirements → Feature Priority

| From: requirements-elicitation | To: feature-prioritization |
|-------------------------------|--------------------------|
| functional_requirements | Feature list to score |
| constraints | Effort estimates |
| scope (MoSCoW) | Initial priority |

### 4.3 Persona → Journey

| From: user-persona-creation | To: user-journey-mapping |
|----------------------------|--------------------------|
| primary_persona | Journey subject |
| pain_points | Moment of Truth triggers |
| decision_criteria | Success metrics |

### 4.4 Persona → Business Case

| From: user-persona-creation | To: business-case-modeling |
|----------------------------|---------------------------|
| target_market_segments | TAM/SAM sizing input |
| willingness_to_pay | Pricing model input |
| switching_costs | CAC assumptions |

### 4.5 Competitor Research → Business Case

*Used when Validation Pack runs competitor-research first*

| From: competitor-research | To: business-case-modeling |
|-------------------------|---------------------------|
| competitive_arena | Market segment definition |
| pricing_data | Revenue model benchmarks |
| gap_analysis | SOM assumptions |
| competitive_risks | Risk scenarios |

### 4.6 Feature Priority → Journey

| From: feature-prioritization | To: user-journey-mapping |
|-----------------------------|-------------------------|
| tier_1_features | Features to map |
| dependencies | Journey sequence constraints |
| regret_test | Essential value validation |

### 4.7 Architecture → All

| From: architecture-design | To Downstream Skills |
|--------------------------|---------------------|
| tech_stack | Requirements for implementation |
| data_flows | Security review input |
| components | Integration points |

---

## 5. Devil's Advocate Integration

The `devils-advocate` skill is available as a **consultable expert** at any point:

### 5.1 Where to Invoke

| Stage | When to Consult |
|-------|----------------|
| After Requirements | "What assumptions am I making about user needs?" |
| After Personas | "Who am I missing? What edge cases exist?" |
| After Business Case | "What would make this business model fail?" |
| After Feature Priority | "What features am I over-indexing on?" |
| Before Final Output | "What gaps exist in this analysis?" |

### 5.2 Devil's Advocate Output Consumption

When consulted, DA outputs feed back into the source skill:
- Challenge findings → Add to assumptions register
- Blind spots → Add as risks
- Objections → Address in output

---

## 6. Squad Configurations

Batch 2 skills form these standard squads:

### Discovery Squad
```
requirements-elicitation + user-persona-creation + feedback-synthesis
```
**Purpose:** Early exploration, market understanding

### Roadmap Squad
```
requirements-elicitation + feature-prioritization + user-persona-creation + architecture-design
```
**Purpose:** Planning what to build

### Business Analysis Squad
```
business-case-modeling + saas-metrics-analysis + user-persona-creation
```
**Purpose:** Financial viability and metrics

### Design Squad
```
user-persona-creation + user-journey-mapping + architecture-design
```
**Purpose:** User experience and technical feasibility

---

## 7. Quality Gates

### Gate 1: Requirements Quality

**Before:** user-persona-creation, feature-prioritization, business-case-modeling

**Criteria:**
- Minimum 3 functional requirements documented (configurable)
- Clear problem statement with target users
- Scope defined (MoSCoW or similar)

**If fails:** Request more detail before proceeding
**Override:** User can override with "proceed anyway" if scope is intentionally small

---

### Gate 2: Persona Quality

**Before:** user-journey-mapping, business-case-modeling

**Criteria:**
- Minimum 1 persona defined (configurable for simple products)
- Each persona has: role, JTBD, pain points, decision criteria
- Pain points rated by severity (1-5)

**If fails:** Refine personas before proceeding
**Override:** User can override with "proceed anyway" for MVP validation

---

### Gate 3: Financial Viability

**Before:** Architecture Design (optional check)

**Criteria:**
- Business case shows path to viability OR
- Clear conditions that would make it viable

**If fails:** Flag as risk, continue with warning

---

### Gate 4: Architecture Completeness

**Before:** Technical Readiness Pack

**Criteria:**
- All containers defined with tech choices
- Data flows mapped with trust boundaries
- Auth approach specified

**If fails:** Return for refinement

---

## 7a. Source of Truth

At the start of any session, declare a **single source of truth** for key entities:

| Entity | Source of Truth |
|--------|-----------------|
| Target Users | requirements-elicitation or user input |
| Problem Statement | requirements-elicitation or user input |
| Personas | user-persona-creation (unless user provides existing) |
| Features | requirements-elicitation or user input |
| Tech Stack | architecture-design |

**Protocol:**
1. At session start, ask: "What do you already have?"
2. Mark that input as the source of truth
3. All downstream skills reference the declared source
4. If new information conflicts, flag for user decision

**Note:** Gate criteria are configurable. For MVP validation/testing, thresholds can be lowered or overridden. The goal is structured thinking, not bureaucracy.

---

## 8. Integration with Other Batches

### Batch 1: Validation Pack

Batch 2 skills are **chained** into Validation Pack:

| Validation Pack Step | Batch 2 Skill |
|---------------------|---------------|
| 1 | requirements-elicitation |
| 2 | user-persona-creation |
| 3 | *(competitor-research is Batch 1)* |
| 4 | business-case-modeling |
| 5 | devils-advocate |
| 6 | feature-prioritization |
| 7 | user-journey-mapping |

### Batch 4: Research Squad

Batch 2 skills **consult** Batch 4 skills:

| Batch 2 Consults | Batch 4 Provides |
|-----------------|-----------------|
| requirements-elicitation | user-story-generation |
| user-persona-creation | interview-guide-creation, survey-design |
| user-journey-mapping | wireframing, heuristic-evaluation |
| saas-metrics-analysis | cohort-analysis, funnel-analysis |
| business-case-modeling | ab-test-design |

### Batch 3: Technical Readiness

Batch 2 feeds into Technical Readiness Pack:

| Technical Readiness Step | Batch 2 Input |
|------------------------|---------------|
| 1 | architecture-design |
| 2 | *(security requirements)* |
| 3 | architecture-design → threat-modeling |
| 4 | architecture-design → security-review |
| 5 | architecture-design → data-protection |

---

## 9. Known Gaps & Issues

### 9.1 Missing References

*Inventory indicated missing references, but all skills verified complete:*
- feature-prioritization: ✅ framework.md, worked-example.md exist
- feedback-synthesis: ✅ all references exist
- saas-metrics-analysis: ✅ all references exist

### 9.2 Cross-Skill Consistency

**Issue:** No automated consistency check between skills

**Impact:** Persona used in Journey might differ from Persona used in Business Case

**Mitigation:** Document "single source of truth" for each session

### 9.3 No Batch-Level Orchestration

**Issue:** Unlike Validation Pack (Batch 1), Batch 2 skills don't have a defined orchestration flow

**Impact:** Users must manually sequence skills

**Mitigation:** This design doc serves as the orchestration reference

---

## 10. Recommendations

### 10.1 Immediate Actions

1. **Update inventory** — Remove "missing references" flags for Batch 2
2. **Mark batch complete** — All skills have full documentation

### 10.2 Future Enhancements

1. **Create orchestration directive** — Similar to Validation Pack directive, define when to use which skills
2. **Add skill consistency validator** — Check that outputs reference the same entities
3. **Build squad selector** — UI/flow to auto-configure squad based on goal

---

## 11. Open Questions

1. **Should Batch 2 have a "pack" like Batch 1?** — Could create "Foundation Pack" chaining key skills
2. **How do we handle partial inputs?** — What if user only has requirements, not personas?
3. **What's the credit cost?** — Each skill has token cost; should we estimate total for common flows?

---

## 12. Batch 1-3 MVP Context

**This is an MVP batch for user testing.** Batches 1-3 form the core validation-to-build pipeline:

```
Validation Pack (Batch 1) → Technical Readiness (Batch 1) → Architecture (Batch 2) → Research Squad (Batch 4)
```

**Testing goals:**
- Can users complete a validation flow?
- Are the outputs actionable?
- Do the skills chain correctly?
- What's missing for real-world use?

**Future enhancements** (after testing):
- Better orchestration directives
- Skill consistency validators
- Squad selector UI

---

**Document Status:** ✅ DA Review Complete - Ready for Build
**Note:** All 9 skills already have complete documentation (SKILL.md + references)
