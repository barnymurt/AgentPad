# Worked Example: Skill Reviewer

This document shows a complete example of applying the Skill Reviewer to a realistic skill review.

## Scenario

**Context:** A new skill "api-design" has been added to the skills directory. The Skill Reviewer is asked to validate it before using in production.

**Skill Path:** skills/api-design/

---

## Step-by-Step Review

### Step 1: Select Skill to Review

**Skill identified:** api-design
**Purpose:** Design REST APIs following best practices
**Files to review:**
- SKILL.md
- references/output-schema.md
- references/framework.md
- references/worked-example.md

### Step 2: Structure Check

**File inventory:**

| File | Present | Notes |
|------|---------|-------|
| SKILL.md | ✅ | |
| references/output-schema.md | ✅ | |
| references/framework.md | ✅ | |
| references/worked-example.md | ✅ | |

**Link check:**
- All [links](references/*.md) resolve: Yes ✅
- All internal references valid: Yes ✅

**Placeholder check:**
- [TODO] found: 0 ✅
- [TBD] found: 1 ⚠️ (in Step 4)
- Placeholder examples: 0 ✅

### Step 3: Quality Assessment

**Clarity (4/5):**
- Description: "Design REST APIs following best practices" — clear
- Trigger: "design an API" — could be more specific
- Steps: Actionable, imperative form ✅
- Minor: Some steps could be more specific

**Completeness (3/5):**
- Core sections present ✅
- Edge cases section: Missing ❌
- Output schema: Present but incomplete ❌
- Worked example: Present ✅

**Methodology (4/5):**
- Uses REST API design principles ✅
- Scoring rubric for quality ✅
- Decision tree for HTTP methods ✅
- Could include more edge cases

### Step 4: Output Schema Validation

**Review of output-schema.md:**

| Element | Present | Notes |
|---------|---------|-------|
| Required sections | ✅ | All 5 sections defined |
| Required vs optional | ✅ | Clearly marked |
| Validation rules | ✅ | 3 rules defined |
| Confidence tagging | ❌ | Missing |
| Format examples | ✅ | Good examples |

**Gap found:** No confidence tagging guidelines. Output quality cannot be assessed without it.

### Step 5: Gap Analysis

| ID | Severity | Category | Location | Description | Impact |
|----|----------|----------|----------|-------------|--------|
| G-1 | critical | completeness | output-schema.md | No confidence tagging | Can't assess output quality |
| G-2 | major | completeness | SKILL.md | No edge cases section | Won't handle edge cases |
| G-3 | minor | clarity | SKILL.md | Trigger "design an API" vague | Could be misused |

### Step 6: Recommendations

**Fix Now:**
1. [G-1] Add confidence tagging to output-schema.md
   - Add High/Medium/Low criteria based on: completeness of spec, adherence to standards, security considerations

2. [G-2] Add edge cases section to SKILL.md
   - Include: versioning strategy, rate limiting, error handling edge cases

**Improve Later:**
3. [G-3] Make trigger more specific
   - "design a REST API" → "design a REST API for a web or mobile application"

### Step 7: Review Report

---

# Skill Review Report: api-design

## Skill Reviewed

```
skill_name: api-design
skill_path: skills/api-design/
purpose: Design REST APIs following best practices
review_date: 2025-02-21
```

## Overall Assessment

```
verdict: needs_work
score: 3.7
summary: Solid skill with good methodology. Missing confidence tagging 
and edge cases. Fix critical gaps before production use.
```

## Structure Check

| File | Present | Notes |
|------|---------|-------|
| SKILL.md | ✅ | |
| references/output-schema.md | ✅ | |
| references/framework.md | ✅ | |
| references/worked-example.md | ✅ | |

**Link Status:** All links resolve ✅
**Placeholder Check:** 1 [TBD] in Step 4 ⚠️

## Quality Scores

```
clarity_score: 4
clarity_rationale: Clear description and steps. Trigger could be 
more specific.

completeness_score: 3
completeness_rationale: Missing edge cases section. Output schema 
needs confidence tagging.

methodology_score: 4
methodology_rationale: Good REST methodology with scoring rubrics. 
Decision trees present.
```

## Gap Register

| ID | Severity | Category | Location | Description | Impact |
|----|----------|----------|----------|-------------|--------|
| G-1 | critical | completeness | output-schema.md | No confidence tagging | Can't assess output quality |
| G-2 | major | completeness | SKILL.md | No edge cases section | Won't handle edge cases |
| G-3 | minor | clarity | SKILL.md | Trigger vague | Could be misused |

## Recommendations

### Fix Now

1. **[G-1] Add confidence tagging to output-schema.md**
   
   Add section on confidence tagging:
   
   ```
   ## Confidence Tagging
   
   Assign confidence based on:
   - **High:** Complete spec, all fields, follows standards
   - **Medium:** Partial spec, some gaps
   - **Low:** Minimal input, major assumptions
   ```

2. **[G-2] Add edge cases section to SKILL.md**
   
   Add after Quality Criteria:
   
   ```
   ## Edge Cases
   
   - Versioning: What if multiple API versions needed?
   - Rate limiting: How to handle client limits?
   - Error handling: What errors to handle explicitly?
   ```

### Improve Later

3. **[G-3] Make trigger more specific**
   
   Change description from "design an API" to "design a REST API for a web or mobile application"

### Consider

4. Add [TBD] placeholder removal in Step 4
5. Consider adding security considerations to framework

---

## Summary

**Overall:** Needs Work (3.7/5)

**Strengths:**
- Good REST methodology with clear steps
- Comprehensive output schema (except confidence)
- Good worked example
- Clear quality criteria

**Issues:**
- Missing confidence tagging (critical)
- No edge cases section (major)
- Minor trigger vagueness

**Recommendation:** Fix G-1 and G-2 before using in production. After fixes, skill will be production-ready.
