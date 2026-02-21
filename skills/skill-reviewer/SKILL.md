---
name: Skill Reviewer
description: Use when validating or auditing existing skills. Use when reviewing a skill's quality, completeness, and effectiveness. Use when identifying gaps in a skill's outputs. Use when comparing skills to ensure consistency. This is a meta-skill that reviews other skills, not a skill that does domain work.
---

# Skill Reviewer

The Skill Reviewer is a meta-skill that validates, audits, and improves other skills. Similar to how Devils Advocate challenges business assumptions, this skill challenges skills themselves — checking quality, identifying gaps, and ensuring skills meet standards.

## Core Workflow

### Step 1: Select Skill to Review

- Identify which skill(s) to review
- Gather the skill's files: SKILL.md + references/
- Understand the skill's purpose and scope
- Note what the skill is supposed to deliver

### Step 2: Structure Review

Verify the skill has proper structure:

- **SKILL.md:** Exists, has frontmatter, has all required sections
- **references/output-schema.md:** Exists, defines output structure
- **references/framework.md:** Exists (unless lightweight skill)
- **references/worked-example.md:** Exists, shows complete example

Check for:
- All required files present
- Internal links resolve
- No placeholder text ([TODO], [TBD])
- Proper formatting

### Step 3: Quality Assessment

Evaluate the skill's quality across dimensions:

**Clarity:**
- Is the description specific and actionable?
- Are trigger conditions clear?
- Would another AI know when to use this skill?

**Completeness:**
- Are all required output fields defined?
- Are edge cases handled?
- Are quality criteria specific?

**Methodology:**
- Does the skill encode a real methodology?
- Is it more than just "do X better"?
- Would output be demonstrably better than unguided?

### Step 4: Output Schema Validation

For skills with output schemas:

- Are all sections defined?
- Are required vs optional fields clear?
- Are validation rules specified?
- Is confidence tagging included?

### Step 5: Gap Analysis

Identify gaps and issues:

**Critical Gaps:**
- Missing required files
- Incomplete output schema
- No quality criteria

**Major Gaps:**
- Vague descriptions
- Missing edge cases
- Weak methodology

**Minor Gaps:**
- Formatting issues
- Incomplete examples
- Minor inconsistencies

### Step 6: Recommendations

Generate specific, actionable recommendations:

**Fix Now:**
- Critical issues that must be resolved

**Improve Later:**
- Major issues worth addressing

**Consider:**
- Nice-to-haves for future enhancement

### Step 7: Review Report

Output a structured review report with:
- Skill being reviewed
- Overall assessment (pass/needswork/fail)
- Detailed findings
- Prioritized recommendations

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Skill Reviewed:** Name and purpose
- **Overall Assessment:** Pass / Needs Work / Fail
- **Structure Check:** File presence and link integrity
- **Quality Scores:** Clarity, Completeness, Methodology ratings
- **Gap Register:** All identified issues by severity
- **Recommendations:** Prioritized fixes

## Quality Criteria

- [ ] All skill files are present and accessible
- [ ] Internal links resolve correctly
- [ ] No placeholder text remains
- [ ] Trigger conditions are specific
- [ ] Output schema is complete
- [ ] Quality criteria are specific and measurable
- [ ] Methodology is real and substantive
- [ ] Edge cases are addressed

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Reviewing without all files:** Always get full skill directory before reviewing
2. **Confusing domain review with meta-review:** This reviews skill quality, not domain accuracy
3. **Vague recommendations:** Be specific about what to fix
4. **Not checking links:** Broken links are common issues
5. **Ignoring the worked example:** The example reveals real quality issues
