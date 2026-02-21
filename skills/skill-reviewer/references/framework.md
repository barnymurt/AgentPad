# Framework: Skill Reviewer

This document provides the detailed methodology for the Skill Reviewer skill.

## Methodology Overview

The Skill Reviewer applies systematic quality assessment to skills. It's like a code review, but for skills. The goal is to ensure skills meet quality standards before use in production.

## Review Dimensions

### 1. Structure Review

**What to check:**
- Required files present (SKILL.md, references/*)
- Internal links resolve
- No placeholder text
- Proper frontmatter

**Common issues:**
- Missing references/ folder
- Broken links to non-existent files
- [TODO] or [TBD] remaining
- Missing or malformed frontmatter

### 2. Clarity Assessment

**What to evaluate:**
- Description specificity
- Trigger conditions
- Step instructions
- Output format definitions

**Good clarity indicators:**
- Trigger conditions tell exactly when to use
- Steps are actionable (imperative, specific)
- Output format leaves no ambiguity

**Poor clarity indicators:**
- Vague triggers ("help with X")
- Descriptive steps instead of actionable ("analyze thoroughly")
- Output format unclear

### 3. Completeness Check

**Required elements:**
- Frontmatter (name, description)
- Core Workflow (steps)
- Output Format reference
- Quality Criteria
- References section
- Common Mistakes (can be empty initially)

**For output schemas:**
- All sections defined
- Required vs optional fields
- Validation rules
- Confidence tagging guidelines

### 4. Methodology Evaluation

**What makes a strong methodology:**
- Encodes proven framework (RICE, SWOT, etc.)
- Provides scoring rubrics
- Includes decision trees
- Addresses edge cases
- Produces better output than unguided LLM

**What indicates weak methodology:**
- Generic advice ("analyze carefully")
- No framework or methodology
- No scoring or criteria
- Would produce same output as unguided

## Scoring Rubric

### Clarity Score (1-5)

| Score | Criteria |
|-------|----------|
| 5 | Trigger conditions specific, steps actionable, output clear |
| 4 | Mostly clear with minor ambiguity |
| 3 | Understandable but some vagueness |
| 2 | Significant vagueness, interpretation needed |
| 1 | Confusing or unusable |

### Completeness Score (1-5)

| Score | Criteria |
|-------|----------|
| 5 | All elements present, output schema complete, edge cases handled |
| 4 | Most elements present, minor gaps |
| 3 | Some gaps, needs work |
| 2 | Significant gaps |
| 1 | Major sections missing |

### Methodology Score (1-5)

| Score | Criteria |
|-------|----------|
| 5 | Proven framework, scoring rubrics, better than unguided |
| 4 | Solid methodology, minor improvements possible |
| 3 | Basic methodology |
| 2 | Weak or generic methodology |
| 1 | No real methodology |

## Gap Severity

### Critical

- Missing required files
- Output schema completely missing or unusable
- No quality criteria
- Would fundamentally break usage

**Examples:**
- No output-schema.md file
- SKILL.md missing frontmatter
- No quality criteria section

### Major

- Missing important sections
- Incomplete output schema
- Vague trigger conditions
- Would significantly impact effectiveness

**Examples:**
- No edge cases section
- Output schema missing validation rules
- Trigger is "help with..." (too vague)

### Minor

- Formatting issues
- Incomplete examples
- Minor ambiguities
- Doesn't fundamentally break skill

**Examples:**
- Broken internal links
- Minor formatting inconsistencies
- "could" instead of "should" in quality criteria

## Review Process

### Pre-Review

1. Clone or access skill directory
2. List all files
3. Check file structure matches template

### During Review

1. Read SKILL.md fully
2. Check frontmatter completeness
3. Evaluate trigger conditions
4. Assess core workflow steps
5. Verify output format reference
6. Review quality criteria specificity
7. Check references section

### Output Schema Deep Dive

1. Verify all sections defined
2. Check required vs optional
3. Look for validation rules
4. Assess confidence tagging

### Framework Check

1. Verify framework exists (unless lightweight)
2. Assess methodology strength
3. Look for scoring rubrics
4. Check edge cases

### Worked Example Review

1. Verify example exists
2. Check completeness (all fields populated)
3. Assess realism
4. Verify methodology application

### Post-Review

1. Compile gap register
2. Assign severity
3. Generate recommendations
4. Calculate overall score

## Common Review Patterns

### Pattern 1: New Skill (Rushing)

**Symptoms:**
- Missing worked example
- Vague descriptions
- Placeholder text remaining

**Fix:** Complete all required elements before use

### Pattern 2: Copied from Template

**Symptoms:**
- Generic content
- Wrong examples
- Doesn't match actual skill

**Fix:** Customize all sections to skill

### Pattern 3: Incomplete Schema

**Symptoms:**
- Missing validation rules
- No confidence tagging
- Undefined required fields

**Fix:** Complete output schema

### Pattern 4: Weak Methodology

**Symptoms:**
- Generic advice
- No scoring
- "analyze thoroughly"

**Fix:** Add real framework/methodology

## Edge Cases

### Edge Case 1: Partial Skill

**Situation:** Skill is lightweight, doesn't need all files

**Resolution:** Distinguish required vs optional. Output schema always required. Framework optional for simple skills.

### Edge Case 2: Skill Has External Dependencies

**Situation:** Skill requires external tools or data

**Resolution:** Document dependencies clearly. Note in review if dependencies are unrealistic.

### Edge Case 3: Skill Overlap

**Situation:** Reviewed skill overlaps significantly with another

**Resolution:** Flag overlap. Recommend either merging or clarifying boundaries.

### Edge Case 4: New or Evolving Skill

**Situation:** Skill is new and still being refined

**Resolution:** Note this in review. Give provisional pass if core elements present.

## Sources and Rationale

This methodology draws from:
- **Code Review:** Structured quality assessment
- **Technical Writing:** Clarity and completeness standards
- **Skill Quality Checklist:** Existing quality standards in skills/
- **TDD Principles:** Test-driven skill building

The key insight: Skills need the same quality rigor as code. A bad skill can waste more time than no skill.
