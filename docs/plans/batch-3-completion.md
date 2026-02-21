# Batch 3 Design Document: Completion Skills

**Date:** 2026-02-21
**Status:** Ready for Review
**Purpose:** Skills that complete the validation pipeline

---

## 1. Overview

Batch 3 contains **completion skills** — the final pieces needed for a complete validation workflow. These skills are referenced by Validation Pack (Batch 1) but exist here for organizational clarity.

### 1.1 Why "Completion"?

These skills **complete** the validation flow:
- **competitor-research** provides market context
- **business-case-modeling** provides financial validation

They could theoretically live in Batch 2, but are separated here because:
1. They are used differently (research vs. foundation)
2. They have different update cycles (market data changes, financial models refine)
3. They support multiple use cases beyond Batch 2

---

## 2. Skill Inventory

### Batch 3 Skills (2 total)

| # | Skill | Role | Purpose | Status |
|---|-------|------|---------|--------|
| 1 | competitor-research | Product Manager | Map competitive landscape, identify gaps | ✅ Complete |
| 2 | business-case-modeling | Business Analyst | Financial modeling, viability assessment | ✅ Complete |

### Skill Status

Both skills have:
- ✅ SKILL.md
- ✅ output-schema.md
- ✅ framework.md
- ✅ worked-example.md

---

## 3. Skill Details

### 3.1 competitor-research

**Purpose:** Map the competitive landscape for a product idea

**Role:** Product Manager

**When to use:**
- Before building business case (validate market opportunity)
- During validation (assess competitive viability)
- When refining positioning

**Core workflow:**
1. Define competitive arena (JTBD-based)
2. Identify competitors (direct, indirect, emerging)
3. Profile each competitor
4. Build comparison matrix
5. Conduct gap analysis
6. Generate positioning recommendations

**Key outputs:**
- Competitor profiles with pricing, features, strengths
- Comparison matrix with weighted dimensions
- Gap analysis (segment gaps, feature gaps)
- Positioning recommendations

---

### 3.2 business-case-modeling

**Purpose:** Model financial viability of a product idea

**Role:** Business Analyst

**When to use:**
- After competitor research (know After user personas market context)
- (know target market)
- Before feature prioritization (validate economics first)

**Core workflow:**
1. Define market size (TAM/SAM/SOM)
2. Model revenue scenarios
3. Calculate unit economics (LTV, CAC, LTV:CAC)
4. Project financials
5. Run scenario analysis
6. Document assumptions

**Key outputs:**
- Market sizing with confidence intervals
- Revenue model with scenarios
- Unit economics (LTV:CAC, payback period)
- Assumption register with confidence levels

---

## 4. Integration with Other Batches

### 4.1 Validation Pack (Batch 1)

Both Batch 3 skills are used in Validation Pack:

| Validation Pack Step | Skill | Batch |
|---------------------|-------|-------|
| Step 3: Competitor Research | competitor-research | 3 |
| Step 4: Business Case | business-case-modeling | 3 |

### 4.2 Foundation (Batch 2)

| Relationship | Notes |
|--------------|-------|
| business-case-modeling appears in both | It's foundational for financial analysis AND used in validation |
| competitor-research is Batch 3 only | Research skill, not foundation |

### 4.3 Research Squad (Batch 4)

| Batch 3 Skill | Batch 4 Consultation |
|---------------|---------------------|
| competitor-research | Informs pricing-strategy, market positioning |
| business-case-modeling | Informs ab-test-design, pricing-strategy |

---

## 5. Data Contracts

### 5.1 competitor-research → business-case-modeling

| From: competitor-research | To: business-case-modeling |
|--------------------------|---------------------------|
| competitive_arena | Market segment definition |
| pricing_data | Revenue model benchmarks |
| gap_analysis | SOM assumptions |
| competitive_risks | Risk scenarios |

### 5.2 competitor-research → Validation Pack

| Output | Used In |
|--------|---------|
| competitive_arena | Validation Pack Section 3 |
| comparison_matrix | Validation Pack Matrix 2 |
| gap_analysis | Validation Pack Gate 1 |
| positioning | Validation Pack Section 3 |

### 5.3 business-case-modeling → Validation Pack

| Output | Used In |
|--------|---------|
| market_sizing | Validation Pack Section 1, Matrix 2 |
| unit_economics | Validation Pack Section 1, Gate 2 |
| viability_assessment | Validation Pack Gate 2 |
| assumptions | Assumption Register |

---

## 6. Quality Gates

### Gate: Market Sizing Validation

**Before:** Proceeding with business case

**Criteria:**
- TAM justified with source
- SAM defined with clear segment
- SOM realistic (not > 20% of SAM)

**If fails:** Request better market research

---

### Gate: Unit Economics Viability

**Before:** Final validation verdict

**Criteria:**
- LTV:CAC >= 1.0 (minimum), >= 3.0 (healthy)
- Clear path to profitability

**If fails:** Flag as risk or KILL

---

## 7. MVP Context

Batch 3 is part of the MVP that can be tested with real users:

```
MVP Pipeline:
├── Batch 1: Validation Pack
│   ├── Step 3: competitor-research (Batch 3)
│   └── Step 4: business-case-modeling (Batch 3)
│
└── Batch 2: Foundation Skills
    └── Support Validation Pack

Result: Complete "Should I build this?" answer
```

### What's Testable

1. **Can users run competitor research?**
   - Input: Product idea
   - Output: Competitive analysis with gaps

2. **Can users build a business case?**
   - Input: Market data, personas
   - Output: Financial model with scenarios

3. **Do the skills integrate?**
   - Does competitor research feed business case?
   - Does business case feed validation verdict?

---

## 8. Known Issues

### Issue 1: Skill Appears in Multiple Batches

**Problem:** business-case-modeling is in both Batch 2 and Batch 3

**Resolution:** 
- In Batch 2: It's a foundation skill
- In Batch 3: It's a completion skill
- Same skill, different context
- This is intentional — skills can serve multiple purposes

### Issue 2: Unclear Batch Structure

**Problem:** "Completion" is vague

**Resolution:** 
- Batch 3 = Skills that complete the validation flow
- Not a traditional category
- Can be renamed to "Market & Finance" if clearer

---

## 9. Devil's Advocate Review

Not required for Batch 3 because:
- Both skills are already complete with full documentation
- They are well-understood skills (standard PM/BA work)
- Used extensively in Validation Pack which has been reviewed

**If review needed, questions would be:**
1. Is competitor-research methodology rigorous enough?
2. Are business case assumptions clearly documented?
3. Do gates prevent false positives/negatives?

---

## 10. Document Status

**competitor-research:**
- ✅ SKILL.md: skills/competitor-research/SKILL.md
- ✅ framework.md: skills/competitor-research/references/framework.md
- ✅ output-schema.md: skills/competitor-research/references/output-schema.md
- ✅ worked-example.md: skills/competitor-research/references/worked-example.md

**business-case-modeling:**
- ✅ SKILL.md: skills/business-case-modeling/SKILL.md
- ✅ framework.md: skills/business-case-modeling/references/framework.md
- ✅ output-schema.md: skills/business-case-modeling/references/output-schema.md
- ✅ worked-example.md: skills/business-case-modeling/references/worked-example.md

---

**Document Status:** Ready for Review
**Next Step:** Review → Update Inventory
