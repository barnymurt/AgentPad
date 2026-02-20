# Output Schema: A/B Test Design

This file defines the exact structure of the A/B Test Design skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **funnel-analysis:** `context.drop_offs[]` (for test hypotheses)
- **cohort-analysis:** `context.cohorts[]` (for segment understanding)
- **research-objectives:** `context.goals` (for test alignment)

### Produces

This skill produces:
- `context.hypothesis` — Validated hypothesis with rationale
- `context.metrics` — Primary, guardrail, and segment metrics
- `context.statistics` — Sample size, power, significance
- `context.design` — Test variants and implementation details
- `context.analysis_plan` — Decision criteria and action thresholds

---

## Output Structure

```
# A/B Test Design: [Test Name]

## 1. Executive Summary (required)

**Test Overview:**
- Test name: [Descriptive name]
- Hypothesis: [IF/THEN/BECAUSE]
- Primary metric: [Metric and expected change]
- Estimated sample: [N users per variant]
- Estimated duration: [N weeks/days]

**Design Decision:**
[One sentence on whether to proceed and why]

**Key Risks:**
1. [Risk 1]
2. [Risk 2]

## 2. Hypothesis (required)

### Validated Hypothesis

**IF** [specific change], **THEN** [expected outcome], **BECAUSE** [rationale]:

```
[Complete hypothesis statement]
```

**Hypothesis Validation:**

| Criterion | Met? | Notes |
|-----------|------|-------|
| Specific | [Y/N] | [What changes] |
| Measurable | [Y/N] | [How measured] |
| Testable | [Y/N] | [Implementation notes] |
| Actionable | [Y/N] | [What action on result] |
| Rationale | [Y/N] | [Theory/evidence] |

### Baseline Metrics

| Metric | Current Value | Source | Date |
|--------|---------------|--------|------|
| [Primary] | [X]% | [Analytics] | [Date] |
| [Guardrail 1] | [X] | [Data] | [Date] |
| [Guardrail 2] | [X] | [Data] | [Date] |

## 3. Metric Definitions (required)

### Primary Metric (North Star)

| Component | Value |
|-----------|-------|
| Metric | [Name and calculation] |
| Definition | [What counts] |
| Current value | [X]% |
| Expected change | [X]% absolute / [Y]% relative |
| Business justification | [Why this matters] |

### Guardrail Metrics

| Metric | Current | Max Degradation | Why It Matters |
|--------|---------|-----------------|----------------|
| [Metric 1] | [X] | [X]% | [Rationale] |
| [Metric 2] | [X] | [X]% | [Rationale] |
| [Metric 3] | [X] | [X]% | [Rationale] |

**Guardrail Rule:** Test fails if ANY guardrail exceeds max degradation, regardless of primary metric result.

### Segment Metrics (Optional)

| Segment | Primary Metric | Expected Difference |
|---------|---------------|---------------------|
| [Segment 1] | [X]% | [Note] |
| [Segment 2] | [X]% | [Note] |

## 4. Statistical Design (required)

### Sample Size Calculation

| Parameter | Value | Notes |
|-----------|-------|-------|
| Baseline rate | [X]% | Current [metric] value |
| Minimum detectable effect | [X]% (relative) | [Y]% absolute change |
| Significance level (α) | [0.05] | [Justification] |
| Power (1-β) | [0.80] | [Justification] |
| Sample per variant | [N] | [Calculation] |
| Total sample needed | [N] | [N * variants] |

### Sample Size Justification

| MDE Option | Sample | Feasible? | Recommendation |
|------------|--------|------------|---------------|
| [Option 1] | [N] | [Y/N] | [Note] |
| [Option 2] | [N] | [Y/N] | [Note] |
| [Selected] | [N] | [Y/N] | **Selected** |

### Test Parameters

| Parameter | Value | Rationale |
|-----------|-------|----------|
| Variants | [A/B or A/B/C] | [Why this number] |
| Allocation | [50/50] | [Equal split notes] |
| One-tailed/two-tailed | [Two] | [Standard] |

## 5. Test Design (required)

### Control (Variant A)

**Description:**
[Exact description of current experience]

**Implementation:**
- URL/pages: [What to change]
- Elements: [What's different]
- Copy: [Any text changes]

**History:**
[When implemented, any recent changes]

### Treatment (Variant B)

**Description:**
[Exact description of new experience]

**Implementation:**
- URL/pages: [What to change]
- Elements: [What's different]
- Copy: [Any text changes]

**Design rationale:**
[Why this approach]

### [Variant C if applicable]

[Same structure]

### Traffic Allocation

| Variant | Allocation | Expected users |
|---------|------------|----------------|
| A (Control) | 50% | [N] |
| B (Treatment) | 50% | [N] |

## 6. Duration and Timing (required)

### Duration Calculation

| Input | Value |
|-------|-------|
| Sample needed | [N] users |
| Daily traffic | [N] users/day |
| Calculated duration | [N] days |

### Recommended Duration

| Duration | Rationale |
|----------|-----------|
| [N] weeks | [Justification] |

### Timing Considerations

| Factor | Assessment | Mitigation |
|--------|------------|------------|
| Day of week | [Notes] | [None/Run full week] |
| Month cycle | [Notes] | [Avoid/Account for] |
| Seasonal | [Notes] | [Document impact] |
| Marketing events | [Notes] | [Avoid/Note] |

### Novelty Effect

**Assessment:** [High/Medium/Low] risk

**Mitigation:**
- Run for minimum [N] weeks
- Analyze by user tenure segment post-test
- [Other mitigations]

## 7. Analysis Plan (required)

### Decision Framework

**Primary Metric:**
| Result | p-value | Decision |
|--------|---------|----------|
| Win | < 0.05 AND MDE met | Implement variant |
| Inconclusive | < 0.05 OR MDE not met | Continue or declare inconclusive |
| Lose | > 0.05 | Keep control |

**Guardrail Rule:**
If ANY guardrail metric exceeds max degradation → Test fails regardless of primary.

### Pre-Registration

**To document BEFORE test starts:**
- [ ] Hypothesis
- [ ] Primary and guardrail metrics
- [ ] Sample size
- [ ] Duration
- [ ] Decision criteria

### Monitoring Plan

| Check | Frequency | Alert Threshold |
|-------|-----------|-----------------|
| Primary metric | Daily | ±20% from expected |
| Guardrails | Daily | Any breach |
| Technical | Daily | Errors > 1% |

### Post-Test Analysis

| Analysis | What to Check |
|----------|---------------|
| Overall | Primary metric with confidence interval |
| Guardrails | All within acceptable range |
| Segments | [Segment 1], [Segment 2] |
| Time | First half vs second half |

## 8. Implementation Checklist (required)

### Pre-Test

| Item | Owner | Status |
|------|-------|--------|
| Hypothesis documented | [Name] | [ ] |
| Metrics defined in analytics | [Name] | [ ] |
| Sample size calculated | [Name] | [ ] |
| Test duration set | [Name] | [ ] |
| Engineering ticket created | [Name] | [ ] |
| QA plan reviewed | [Name] | [ ] |

### During Test

| Item | Frequency | Owner |
|------|-----------|-------|
| Monitor primary metric | Daily | [Name] |
| Monitor guardrails | Daily | [Name] |
| Check for technical issues | Daily | [Name] |
| Document external factors | Ongoing | [Name] |

### Post-Test

| Item | Owner | Status |
|------|-------|--------|
| Pull complete data | [Name] | [ ] |
| Calculate results | [Name] | [ ] |
| Document learnings | [Name] | [ ] |
| Share with stakeholders | [Name] | [ ] |
| Update run book | [Name] | [ ] |

## 9. Confidence Assessment (required)

| Area | Confidence | Notes |
|------|------------|-------|
| Hypothesis | [H/M/L] | [Rationale] |
| Sample size | [H/M/L] | [Power achieved] |
| Duration | [H/M/L] | [Novelty risk] |
| Metrics | [H/M/L] | [Data quality] |

**Overall:** [High/Medium/Low]

---

## Validation Rules

1. Hypothesis follows IF/THEN/BECAUSE format
2. Primary metric has business justification
3. At least 2 guardrail metrics defined
4. Sample size calculated with power analysis
5. MDE justified and realistic
6. Control and variant clearly defined
7. Duration calculated and justified
8. Novelty and seasonality considered
9. Decision criteria documented
10. Pre-registration checklist complete

## Confidence Tagging

- **High:** Clear hypothesis, sufficient power, full cycle duration
- **Medium:** Some assumptions, partial duration
- **Low:** Unclear hypothesis, underpowered, short duration
