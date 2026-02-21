# Batch 1 Design Document: Validation Packs

**Date:** 2026-02-21
**Status:** Ready for Review
**Purpose:** MVP testable pipeline - validation to technical readiness

---

## 1. Overview

Batch 1 contains the **validation-to-technical-readiness pipeline** — the core workflow for taking a product idea from "should I build this?" to "is it ready to build?"

### 1.1 The Two Packs

| Pack | Question Answered | Output |
|------|-------------------|--------|
| **Validation Pack** | "Is this idea worth building?" | GO / PAUSE / KILL recommendation |
| **Technical Readiness Pack** | "Is the design secure and ready?" | READY / NEEDS WORK / REDESIGN |

### 1.2 Why Two Packs?

| Validation Pack | Technical Readiness Pack |
|----------------|------------------------|
| Product viability | Technical viability |
| Market validation | Security & compliance |
| Financial viability | Architecture quality |
| User-centered | Technical-centered |

**Together:** They form a complete "should we build this?" → "are we ready?" pipeline.

---

## 2. Skill Inventory

### Batch 1 Skills (2 orchestration skills + 7 underlying skills)

#### Validation Pack (orchestrates 7 skills)

| Step | Skill | Role | Purpose |
|------|-------|------|---------|
| 1 | requirements-elicitation | Business Analyst | Extract structured context |
| 2 | user-persona-creation | UX Researcher | Build behavior-driven personas |
| 3 | competitor-research | Product Manager | Map competitive landscape |
| 4 | business-case-modeling | Business Analyst | Financial modeling |
| 5 | devils-advocate | Devil's Advocate | Stress-test assumptions |
| 6 | feature-prioritization | Product Manager | Score and rank features |
| 7 | user-journey-mapping | UX Researcher | Map MVP through journey |

#### Technical Readiness Pack (orchestrates 7 skills)

| Step | Skill | Role | Purpose |
|------|-------|------|---------|
| 1 | architecture-design | Systems Architect | System architecture |
| 2 | security-requirements-baseline | Security Officer | Security requirements |
| 3 | threat-modeling | Security Officer | STRIDE analysis |
| 4 | security-architecture-review | Security Officer | Security evaluation |
| 5 | data-protection-assessment | Security Officer | Data lifecycle mapping |
| 6 | privacy-regulation-assessment | Compliance Expert | Regulation triage |
| 7 | security-compliance-roadmap | Compliance Expert | Timeline & roadmap |

---

## 3. The Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BATCH 1 PIPELINE                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐         ┌──────────────────────────────┐    │
│  │  USER IDEA      │         │   VALIDATION PACK             │    │
│  │  "I have an     │────────▶│   1. Requirements            │    │
│  │   idea for..."  │         │   2. Personas               │    │
│  │                 │         │   3. Competitors             │    │
│  │                 │         │   4. Business Case          │    │
│  │                 │         │   5. Devil's Advocate       │    │
│  │                 │         │   6. Feature Priority       │    │
│  │                 │         │   7. Journey Map            │    │
│  │                 │         │                              │    │
│  │                 │         │   → GO / PAUSE / KILL        │    │
│  └─────────────────┘         └──────────────┬───────────────┘    │
│                                             │                     │
│                                    if GO    │                     │
│                                             ▼                     │
│  ┌─────────────────┐         ┌──────────────────────────────┐    │
│  │  VALIDATION     │         │   TECHNICAL READINESS PACK   │    │
│  │  PACK OUTPUT    │────────▶│   1. Architecture            │    │
│  │                 │         │   2. Security Requirements   │    │
│  │  - Requirements │         │   3. Threat Model            │    │
│  │  - Personas     │         │   4. Security Review         │    │
│  │  - Business Case│         │   5. Data Protection         │    │
│  │  - Feature List │         │   6. Privacy Regulation      │    │
│  │  - Journey      │         │   7. Compliance Roadmap      │    │
│  │                 │         │                              │    │
│  │                 │         │   → READY / NEEDS WORK /     │    │
│  │                 │         │      REDESIGN                 │    │
│  └─────────────────┘         └──────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Decision Gates

### Validation Pack Gates

| Gate | Trigger | Output |
|------|---------|--------|
| **Gate 1: Competitive Viability** | 5+ competitors, no gaps identified | PAUSE → Pivot recommendation |
| **Gate 2: Financial Viability** | LTV:CAC < 1.0, no path to breakeven | KILL → Economics broken |
| **Gate 3: Assumption Integrity** | 2+ fatal unvalidated assumptions | KILL → Validation needed |

### Technical Readiness Gates

| Gate | Trigger | Output |
|------|---------|--------|
| **Gate 1: Architecture Completeness** | >2 undefined components | PAUSE → More detail needed |
| **Gate 2: Security Risk Threshold** | 2+ critical unmitigated threats | PAUSE → Address security first |

---

## 5. User Flow Options

### Option A: Full Pipeline (Recommended)

1. User enters idea
2. Run Validation Pack → GO
3. Run Technical Readiness Pack → READY
4. ✅ Ready for build

### Option B: Validation Only

1. User enters idea
2. Run Validation Pack → GO/PAUSE/KILL
3. If GO → can proceed to architecture design separately
4. If PAUSE/KILL → address issues first

### Option C: Technical Only (Standalone)

1. User provides product description
2. Run Technical Readiness Pack
3. Note: Does not consume Validation Pack output

---

## 6. Integration with Other Batches

| Batch | Relationship |
|-------|-------------|
| Batch 2 (Foundation) | Skills used in packs are from Batch 2 |
| Batch 3 (Completion) | competitor-research is here (used in Validation Pack) |
| Batch 4 (Research) | Post-validation, users proceed to research |
| Batch 5 (GTM) | Post-readiness, users proceed to marketing |
| Batch 6 (Technical) | Detailed technical design (beyond architecture) |

---

## 7. Output Artifacts

### Validation Pack Deliverable

1. **Validation Scorecard** — GO/PAUSE/KILL with 7 metrics
2. **Three Matrices** — Importance vs. Proof, Risk-Value, Impact-Effort
3. **Competitive Positioning Map** — 2x2 with gaps
4. **Assumption Register** — Consolidated assumptions with validation tests
5. **Objection Bank** — Customer objections with rebuttals
6. **MVP Scope** — Tier 1 features with RICE scores
7. **Risk Register** — Top 5 consolidated risks

### Technical Readiness Pack Deliverable

1. **Architecture Summary** — Components, tech choices, decisions
2. **Security Posture** — Requirements status, threats
3. **Data Protection** — Data inventory, PII map
4. **Regulatory Compliance** — Applicable regulations, gaps
5. **Certification Roadmap** — Phased timeline
6. **Risk Register** — Top 10 risks
7. **Verdict** — READY / NEEDS WORK / REDESIGN

---

## 8. Quality Criteria

### For Both Packs

- [ ] All required sections populated
- [ ] Decision gates explicitly evaluated
- [ ] User can override gate decisions
- [ ] Outputs are specific, not generic
- [ ] Clear next steps in recommendations

### Validation Pack Specific

- [ ] GO/PAUSE/KILL recommendation is clear
- [ ] Three matrices have 8-15 data points each
- [ ] Assumption register has specific validation tests
- [ ] MVP scope includes effort estimation

### Technical Readiness Pack Specific

- [ ] READY/NEEDS WORK/REDESIGN verdict is clear
- [ ] STRIDE analysis covers all components
- [ ] Regulations triaged by jurisdiction
- [ ] Certification timeline is realistic

---

## 9. Known Issues (from DA Review)

| Issue | Status |
|-------|--------|
| Checkpoint/resume for long chains | Not implemented - warn user of token limits |
| User override at all gates | ✅ Implemented |
| TBD handling in architecture | ✅ Distinguish intentional vs. forgotten |
| Credit/token cost display | Not implemented |
| Partial input handling | ✅ Protocol defined |

---

## 10. MVP Testing Plan

### What to Test

1. **Can users complete the full pipeline?**
   - Start with idea → complete Validation → complete Technical Readiness
   
2. **Are outputs actionable?**
   - Can user show Validation Pack to cofounder?
   - Can developer use Technical Readiness output?
   
3. **Do gates work correctly?**
   - Can PAUSE/KILL be triggered?
   - Can user override?
   
4. **What's missing?**
   - User feedback on gaps

### Test Scenarios

| Scenario | Input | Expected Output |
|----------|-------|-----------------|
| Clear GO | Strong idea, gaps exist, viable economics | GO → READY |
| PAUSE at Gate 1 | Saturated market | PAUSE with pivot suggestions |
| KILL at Gate 2 | Bad unit economics | KILL with conditions |
| NEEDS WORK | Architecture has gaps | NEEDS WORK with fixes |

---

## 11. Document Status

**Validation Pack:**
- ✅ Design Spec: docs/plans/validation-pack-design.md
- ✅ SKILL.md: skills/validation-pack/SKILL.md
- ✅ output-schema.md: skills/validation-pack/output-schema.md
- ✅ framework.md: skills/validation-pack/references/framework.md
- ✅ worked-example.md: skills/validation-pack/references/worked-example.md

**Technical Readiness Pack:**
- ✅ Design Spec: docs/plans/technical-readiness-pack-design.md
- ✅ SKILL.md: skills/technical-readiness-pack/SKILL.md
- ✅ output-schema.md: skills/technical-readiness-pack/output-schema.md
- ✅ framework.md: skills/technical-readiness-pack/references/framework.md
- ✅ worked-example.md: skills/technical-readiness-pack/references/worked-example.md

---

**Document Status:** Ready for Devil's Advocate Review
**Next Step:** DA Review of Batch 1 design
