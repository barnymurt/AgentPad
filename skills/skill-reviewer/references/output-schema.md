# Output Schema: Skill Reviewer

This document defines the exact structure of the Skill Reviewer output.

## Required Sections

### 1. Skill Reviewed

**Purpose:** Identify which skill was reviewed.

**Fields:**
- `skill_name`: Name of the skill
- `skill_path`: Path to skill directory
- `purpose`: What the skill is supposed to do
- `review_date`: When review was conducted

**Format:** Markdown with fields

**Example:**
```
skill_name: competitor-research
skill_path: skills/competitor-research/
purpose: Analyzes competitive landscape for a product idea
review_date: 2025-02-21
```

### 2. Overall Assessment

**Purpose:** Summary judgment on skill quality.

**Fields:**
- `verdict`: pass | needs_work | fail
- `score`: 1-5 rating
- `summary`: One-paragraph summary

**Decision Criteria:**

| Verdict | Criteria |
|---------|----------|
| Pass | No critical gaps, few major gaps |
| Needs Work | Some critical or major gaps, fixable |
| Fail | Critical gaps that fundamentally break the skill |

**Format:** Markdown with fields

**Example:**
```
verdict: needs_work
score: 3.5
summary: Skill has solid methodology but missing critical edge cases 
in output schema. Recommend fixes before use.
```

### 3. Structure Check

**Purpose:** Verify file presence and integrity.

**Fields:**
- `files_checked`: List of expected files
- `files_present`: Which files exist
- `files_missing`: Which files are missing
- `link_status`: Links work / broken links found
- `placeholder_check`: Clean / placeholders found

**Format:** Markdown table

**Example:**
| File | Present | Notes |
|------|---------|-------|
| SKILL.md | ✅ | |
| references/output-schema.md | ✅ | |
| references/framework.md | ✅ | |
| references/worked-example.md | ❌ | Missing |
| quality-checklist.md | ✅ | In parent |

**Link Check:**
- All internal links resolve: Yes
- External references valid: N/A

**Placeholder Check:**
- [TODO] found: 0
- [TBD] found: 1 (in Common Mistakes section)
```

### 4. Quality Scores

**Purpose:** Rate skill on key dimensions.

**Fields:**
- `clarity_score`: 1-5
- `completeness_score`: 1-5
- `methodology_score`: 1-5
- `overall_score`: Calculated average

**Scoring Rubric:**

| Score | Clarity | Completeness | Methodology |
|-------|---------|--------------|-------------|
| 5 | Crystal clear, can't be misinterpreted | All sections complete, edge cases handled | Proven framework, better than unguided |
| 4 | Clear with minor ambiguity | Most complete, minor gaps | Solid methodology |
| 3 | Understandable but could be clearer | Some gaps, needs work | Basic methodology |
| 2 | Vague in places | Significant gaps | Weak methodology |
| 1 | Confusing or unusable | Major sections missing | No real methodology |

**Format:** Markdown with scores + rationale

**Example:**
```
clarity_score: 4
clarity_rationale: Description is clear, trigger conditions specific. 
Minor ambiguity in Step 3.

completeness_score: 3
completeness_rationale: Missing edge cases section. Output schema 
lacks confidence tagging guidelines.

methodology_score: 4
methodology_rationale: Uses RICE framework correctly. Scoring 
rubrics defined. Could add more edge cases.
```

### 5. Gap Register

**Purpose:** Document all identified issues.

**Fields:**
- `gap_id`: Unique identifier
- `severity`: critical | major | minor
- `category`: structure | clarity | completeness | methodology
- `location`: File and section
- `description`: What the issue is
- `impact`: How it affects the skill

**Format:** Markdown table

**Example:**
| ID | Severity | Category | Location | Description | Impact |
|----|----------|----------|----------|-------------|--------|
| G-1 | critical | completeness | output-schema.md | No confidence tagging guidelines | Can't assess output quality |
| G-2 | major | completeness | SKILL.md | No edge cases section | Won't handle edge cases |
| G-3 | minor | clarity | SKILL.md Step 3 | "analyze thoroughly" is vague | Could be misinterpreted |

### 6. Recommendations

**Purpose:** Actionable fixes for identified issues.

**Fields:**
- `priority`: fix_now | improve_later | consider
- `gap_id`: Related gap (if applicable)
- `recommendation`: What to do
- `rationale`: Why this matters

**Format:** Markdown with priority list

**Example:**
```
## Fix Now

1. [G-1] Add confidence tagging guidelines to output-schema.md
   - Output quality can't be assessed without it
   - Add: High/Medium/Low criteria based on data sources

2. [G-2] Add edge cases section to SKILL.md
   - Skill will fail on unusual inputs
   - Include: no competitors found, vague input, etc.

## Improve Later

3. [G-3] Make Step 3 more specific in SKILL.md
   - "analyze thoroughly" → "score each competitor on 5 dimensions"

## Consider

4. Add visual output (charts/maps) to worked example
5. Consider adding comparison matrix template
```

### 7. Summary Statement

**Purpose:** Quick overview for consumption.

**Format:** Single paragraph

**Example:**
```
Skill Review: competitor-research

Overall: Needs Work (3.5/5)

Strengths: Clear methodology, good framework reference, solid 
output structure.

Issues: Missing edge cases, no confidence tagging, some vague 
instructions.

Recommendation: Fix critical gaps before using in production. 
Priority: Add confidence guidelines and edge cases to output schema.
```

## Validation Rules

1. All files in skill directory must be checked
2. Every gap must have severity and category
3. Recommendations must map to identified gaps
4. Overall verdict must match gap severity
5. Score must be consistent with verdict

## Confidence Tagging

- **High:** Full skill reviewed, all files present
- **Medium:** Partial review, some files missing
- **Low:** Unable to complete full review
