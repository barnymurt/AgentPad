# Output Schema: Funnel Analysis

This file defines the exact structure of the Funnel Analysis skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **user-journey-mapping:** `context.flows[]` (for funnel stage definitions)
- **cohort-analysis:** `context.cohorts[]` (for segment analysis)
- **saas-metrics-analysis:** `context.benchmarks` (for comparison)

### Produces

This skill produces:
- `context.funnel` — Funnel definition and metrics
- `context.conversion[]` — Stage-by-stage conversion data
- `context.drop_offs[]` — Identified drop-off points
- `context.paths[]` — Alternative paths (if multi-path)
- `context.recommendations[]` — Prioritized optimizations

---

## Output Structure

```
# Funnel Analysis: [Funnel Name]

## 1. Executive Summary (required)

**Funnel Scope:**
- Funnel type: [Linear/Branching/Time-based]
- Stages: [N]
- Data period: [Start] to [End]
- Total users in funnel: [X]

**Key Findings:**
1. [Primary finding - conversion rate, drop-off]
2. [Secondary finding - segment differences]
3. [Tertiary finding - time/pattern insights]

**Top Recommendation:**
[2-3 sentences on highest-impact optimization]

## 2. Funnel Definition (required)

### Funnel Type

| Type | Justification |
|------|---------------|
| [Selected] | [Why this type is appropriate] |
| Alternative considered | [Why not chosen] |

### Stage Definitions

| Stage | Trigger Event | Completion Criteria | Time Window |
|-------|---------------|---------------------|--------------|
| 1: [Name] | [Event] | [Criteria] | [Window] |
| 2: [Name] | [Event] | [Criteria] | [Window] |
| 3: [Name] | [Event] | [Criteria] | [Window] |
| 4: [Name] | [Event] | [Criteria] | [Window] |
| [N]: [Name] | [Event] | [Criteria] | [Window] |

### User Segment

| Segment | Definition | Included? |
|---------|------------|-----------|
| First-time users | [Definition] | [Yes/No] |
| Returning users | [Definition] | [Yes/No] |
| [Other] | [Definition] | [Yes/No] |

### Data Quality

| Metric | Value | Assessment |
|--------|-------|------------|
| Total events | [X] | [Sufficient/Limited] |
| Unique users | [X] | [Sufficient/Limited] |
| Data completeness | [X]% | [Assessment] |

## 3. Conversion Analysis (required)

### Overall Metrics

| Metric | Value | Benchmark | Assessment |
|--------|-------|-----------|------------|
| Total funnel conversion | [X]% | [Y]% | [Above/Below] |
| Stage 1 volume | [X] users | - | - |
| Final stage volume | [X] users | - | - |
| Median time to convert | [X] days | - | - |

### Stage-by-Stage Conversion

| Stage | Users | % of Start | Step Conversion | Drop-off Rate |
|-------|-------|------------|------------------|---------------|
| 1: [Name] | [X] | 100% | - | - |
| 2: [Name] | [X] | [X]% | [X]% | [X]% |
| 3: [Name] | [X] | [X]% | [X]% | [X]% |
| 4: [Name] | [X] | [X]% | [X]% | [X]% |
| [Final] | [X] | [X]% | [X]% | [X]% |

### Visualization

```
[Funnel visualization - ASCII or description]
Stage 1: [██████] [X] users (100%)
   ↓ [X]%                 
Stage 2: [████] [X] users ([X]%)
   ↓ [X]%                 
Stage 3: [██] [X] users ([X]%)
   ↓ [X]%                 
Stage 4: [█] [X] users ([X]%)
```

## 4. Drop-off Analysis (required)

### Drop-off by Stage

| Stage | Drop-off Users | Drop-off Rate | Priority |
|-------|----------------|---------------|----------|
| 1→2 | [X] | [X]% | [H/M/L] |
| 2→3 | [X] | [X]% | [H/M/L] |
| 3→4 | [X] | [X]% | [H/M/L] |

### Priority Matrix

| | Easy Fix | Hard Fix |
|---|---|---|
| **High Impact** | **[Priority 1]** | **[Priority 2]** |
| **Low Impact** | **[Priority 3]** | **[Priority 4]** |

### Drop-off Analysis: [Stage with highest priority]

**Where users go:**
- [ ] Leave site/app entirely
- [ ] Go to other section
- [ ] Drop then return later
- [ ] Switch to alternative path

**Possible reasons:**
- [Reason 1 with evidence]
- [Reason 2 with evidence]

## 5. Multi-Path Analysis (required, if applicable)

### Paths Identified

| Path | Users | Conversion | % of Converted |
|------|-------|------------|----------------|
| [Path A] | [X] | [X]% | [X]% |
| [Path B] | [X] | [X]% | [X]% |
| [Path C] | [X] | [X]% | [X]% |

### Path Efficiency

**Most efficient:** [Path] - [X]% conversion
**Least efficient:** [Path] - [X]% conversion
**Most common:** [Path] - [X] users

### Recommendations for Paths

- [Recommendation based on path analysis]

## 6. Segment Analysis (if applicable)

### Conversion by Segment

| Segment | Stage 1 | Final Stage | Conversion |
|---------|----------|-------------|------------|
| [Segment 1] | [X] | [X] | [X]% |
| [Segment 2] | [X] | [X] | [X]% |

### Key Differences

- [Segment] converts [higher/lower] than [Segment]
- Likely reason: [Analysis]

## 7. Returning User Analysis (if applicable)

### First-Time vs Returning

| User Type | Users | Conversion |
|-----------|-------|------------|
| First-time | [X] | [X]% |
| Returning | [X] | [X]% |

### Insights

- Returning users convert [X]x higher than first-time
- [Implication for optimization]

## 8. Recommendations (required)

### Priority 1: [Highest Impact, Easiest Fix]

**Observation:**
[What the data shows]

**Diagnosis:**
[Why users drop here]

**Solution:**
[Specific recommendation]

**Expected Impact:**
[Estimated improvement, e.g., +5% conversion = +$X revenue]

**Effort:** [High/Medium/Low]

### Priority 2: [High Impact, Harder Fix]

[Same structure]

### Priority 3: [Lower Impact, Easy Fix]

[Same structure]

### Prioritized Action Items

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 1 | [Action] | [Impact] | [Effort] |
| 2 | [Action] | [Impact] | [Effort] |
| 3 | [Action] | [Impact] | [Effort] |

## 9. Confidence Summary (required)

| Finding | Confidence | Rationale |
|---------|------------|-----------|
| [Finding] | [H/M/L] | [Rationale] |

**Overall Confidence:** [High/Medium/Low]

---

## Validation Rules

1. Funnel type defined with justification
2. Minimum 4 stages defined
3. Stage criteria clearly specified
4. Step-by-step AND overall conversion calculated
5. Drop-off rates calculated for each stage
6. Multi-path analysis included (if applicable)
7. User segment handling defined
8. Returning user analysis included (if applicable)
9. Recommendations prioritized by impact and effort
10. Funnel visualization included

## Confidence Tagging

- **High:** Sufficient data, clear patterns, validated segments
- **Medium:** Moderate data, some assumptions, limited segmentation
- **Low:** Limited data, significant assumptions, unclear patterns

Apply confidence to all findings and recommendations.
