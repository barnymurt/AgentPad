# Output Schema: Cohort Analysis

This file defines the exact structure of the Cohort Analysis skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **saas-metrics-analysis:** `context.retention_benchmarks`, `context.industry_metrics`
- **user-persona-creation:** `context.personas[]` (for segment-specific cohorts)

### Produces

This skill produces:
- `context.cohorts[]` — Cohort definitions and metrics
- `context.retention_curves` — Visual representation of retention over time
- `context.patterns[]` — Identified patterns with interpretation
- `context.insights[]` — Key findings with recommendations
- `context.confidence` — Confidence level for findings

---

## Output Structure

```
# Cohort Analysis: [Product/Time Period]

## 1. Executive Summary (required)

**Analysis Scope:**
- Data period: [Start] to [End]
- Total users analyzed: [X]
- Cohort window: [Daily/Weekly/Monthly]
- Cohort type: [Acquisition/Plan/Source/Behavioral]

**Key Findings:**
1. [Primary finding - 1 sentence]
2. [Secondary finding - 1 sentence]
3. [Tertiary finding - 1 sentence]

**Top Recommendation:**
[2-3 sentences on most important action]

## 2. Cohort Definition (required)

### Cohort Window Selection

| Window | Rationale |
|--------|------------|
| [Selected] | [Why this window is appropriate] |
| Alternative considered | [Why not chosen] |

### Cohort Type

| Type | Grouping | Rationale |
|------|----------|-----------|
| [Primary] | [e.g., Signup date] | [Why this reveals meaningful differences] |

### Data Quality Assessment

| Metric | Value | Assessment |
|--------|-------|------------|
| Total users | [X] | [Sufficient/Limited] |
| Cohort window size | [X] users | [Above/Below] minimum |
| Data quality | [X]% complete | [Assessment] |

**Warning:** [Any data quality issues that affect confidence]

## 3. Cohort Retention Analysis (required)

### Retention Heatmap

| Cohort | Size | Period 0 | Period 1 | Period 2 | Period 3 | Period 4 |
|--------|------|----------|----------|----------|----------|----------|
| [Date] | [N] | 100% | [X]% | [X]% | [X]% | [X]% |
| [Date] | [N] | 100% | [X]% | [X]% | [X]% | - |
| [Date] | [N] | 100% | [X]% | [X]% | - | - |

### Retention Curves

**Visualization:**
[Include retention curve chart showing multiple cohorts]

**Key Observations:**
- [Observation 1]
- [Observation 2]

### Segment Comparison

#### By Cohort Type: [Plan/Source/Behavior]

| Segment | Users | Early Retention | Mid Retention | Long-term Retention |
|---------|-------|-----------------|---------------|---------------------|
| [Segment 1] | [N] | [X]% | [X]% | [X]% |
| [Segment 2] | [N] | [X]% | [X]% | [X]% |
| [Segment 3] | [N] | [X]% | [X]% | [X]% |

## 4. Pattern Analysis (required)

### Identified Pattern: [Pattern Name]

**Description:**
[What the pattern looks like]

**Evidence:**
[Data points supporting this pattern]

**Interpretation:**
[Why this pattern exists]

**Confidence:** [High/Medium/Low]
- Rationale: [Why this confidence level]

### [Repeat for each pattern identified]

### Pattern Summary Table

| Pattern | Prevalence | Severity | Recommended Action |
|---------|------------|----------|---------------------|
| [Pattern 1] | [Major/Minor] | [High/Medium/Low] | [Action] |
| [Pattern 2] | [Major/Minor] | [High/Medium/Low] | [Action] |

## 5. Engagement vs Retention Analysis (required)

**Critical Distinction Applied:**

| Metric | Calculation | Cohort Performance |
|--------|-------------|-------------------|
| **Retention Rate** | Active users / Original cohort | [X]% |
| **Engagement Rate** | Users with 5+ sessions / Active users | [X]% |

**Analysis:**
[Interpretation - are retained users actually engaged?]

**Warning:** [If retention is high but engagement is low - "zombie" users]

## 6. Small Cohort Handling (required, if applicable)

### Cohort Size Warnings

| Cohort | Size | Threshold | Status |
|--------|------|-----------|--------|
| [Cohort] | [N] | [Min] | [OK/Low confidence] |

### Confidence Adjustments

[How findings are adjusted for small cohort sizes]

### Aggregated Analysis

[If cohorts were aggregated, show comparison]

## 7. Insights and Recommendations (required)

### Insight #1: [Title]

**Observation:**
[What the data shows]

**Implication:**
[Why this matters]

**Recommendation:**
[What to do]

**Priority:** [High/Medium/Low]
**Expected Impact:** [Quantified if possible]
**Effort:** [High/Medium/Low]

### [Repeat for each insight]

### Prioritized Action Items

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 1 | [Action] | [Impact] | [Effort] |
| 2 | [Action] | [Impact] | [Effort] |
| 3 | [Action] | [Impact] | [Effort] |

## 8. Confidence Summary (required)

| Finding | Confidence | Rationale |
|---------|------------|-----------|
| [Finding 1] | [H/M/L] | [Rationale] |
| [Finding 2] | [H/M/L] | [Rationale] |

**Overall Confidence:** [High/Medium/Low]

**Limitation Statement:**
[Any caveats or limitations that affect reliability]

---

## Validation Rules

1. Cohort window justified with rationale
2. Cohort type defined and rationalized
3. Data quality assessed with warnings
4. Minimum cohort sizes met OR flagged with confidence warnings
5. Retention vs engagement both analyzed
6. Patterns identified with interpretation
7. At least 3 cohort segments analyzed
8. Recommendations prioritized by impact
9. Confidence levels applied to all findings
10. Small cohort handling documented

## Confidence Tagging

- **High:** Large cohorts (>100), clear patterns, multiple data sources
- **Medium:** Moderate cohorts (50-100), some patterns, reasonable assumptions
- **Low:** Small cohorts (<50), noisy data, significant assumptions

Apply confidence to all findings and recommendations.
