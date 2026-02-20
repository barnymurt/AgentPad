# Output Schema: Survey Design

This file defines the exact structure of the Survey Design skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **interview-guide-creation:** `context.interview.insights` (topics to quantify)
- **research-objectives:** `context.objectives`

### Produces

This skill produces:
- `context.survey.objectives` — Research goals
- `context.survey.questions[]` — All questions with types
- `context.survey.sample_size` — Target respondents
- `context.survey.analysis` — How to interpret results

---

## Output Structure

```
# Survey: [Survey Title]

## 1. Survey Objectives (required)

### Research Purpose
- [ ] Measure satisfaction
- [ ] Validate assumptions
- [ ] Gather feedback
- [ ] Segment users
- [ ] Other: __________

### Key Questions to Answer
1. [Question 1]
2. [Question 2]
3. [Question 3]

### Target Audience
- [Description of who should respond]

## 2. Survey Flow (required)

### Structure

| Section | Questions | Time |
|---------|-----------|------|
| Warm-up | Q1-Q2 | 1 min |
| Core | Q3-Q[X] | 3-4 min |
| Deep-dive | Q[X]-Q[Y] | 2 min |
| Wrap-up | Q[Z]-Q[End] | 1 min |

**Total:** [X] questions, ~[Y] minutes

## 3. Questions (required)

### Screener (if needed)

| # | Question | Type | Options |
|---|----------|------|---------|
| S1 | [Screener question] | Multiple choice | [Options] |

### Core Questions

| # | Question | Type | Options | Bias Check |
|---|----------|------|---------|------------|
| Q1 | [Question] | [Type] | [Options] | ✓ Pass |

### Deep-dive Questions

| # | Question | Type | Options |
|---|----------|------|---------|
| Q[X] | [Question] | [Type] | [Options] |

### Wrap-up

| # | Question | Type |
|---|----------|------|
| Q[Z] | [Open-ended question] | Open text |

## 4. Question Detail (required)

### Q1: [Question]

**Type:** [Likert/NPS/Rating/Multiple choice]
**Purpose:** [What this measures]
**Options:**
- [Option 1]
- [Option 2]
- [Option 3]
- [Option 4]
- [Option 5]

**Analysis:** [How to interpret]

[Repeat for each question]

## 5. Bias Check (required)

### Question Review

| # | Question | Issue | Fix |
|---|----------|-------|-----|
| Q1 | [Question] | [None/Leading/Assumption] | [Fix if needed] |

### Checklist
- [ ] No leading words (love, hate, amazing)
- [ ] No assumptions about behavior
- [ ] No double-barreled questions
- [ ] Balanced answer options
- [ ] Clear, simple language

## 6. Sample Size (required)

### Calculation

| Factor | Value |
|--------|-------|
| Target population | [X] |
| Margin of error | [Y]% |
| Confidence level | [Z]% |
| Expected response | [P]% |

### Required Sample
- **Minimum:** [X] respondents
- **Target:** [Y] respondents
- **With subgroups:** [Z] per group

### Response Rate Estimate
- Expected rate: [X]%
- Invite needed: [Y]

## 7. Analysis Plan (required)

### Quantitative Analysis
| Question | Metric | Interpretation |
|----------|--------|----------------|
| Q1 | Mean / Top-box | Higher = more positive |
| NPS | Score | >50 = excellent |

### Segmentation
- Analyze by: [Segments]

### Reporting
- Overall scores
- Segment differences
- Key themes

## 8. Launch Plan (required)

### Platform
- Tool: [Typeform/SurveyMonkey/etc.]
- Why: [Rationale]

### Distribution
- Channel: [Email/In-product/etc.]
- Timing: [When]

### Incentives
- [None / Gift card / Discount / Entry to prize draw]
- Amount: [Amount]

---

## Validation Rules

1. Survey objectives clearly defined
2. Question types appropriate for data needed
3. Bias check completed
4. Questions flow logically
5. Survey length reasonable (5-7 min)
6. Sample size calculated
7. Response rate estimated
8. Analysis plan defined
9. Platform selected
10. Incentives considered

## Confidence Tagging

- **High:** Clear objectives, known audience
- **Medium:** Some assumptions
- **Low:** Unclear objectives, unknown sample

Apply confidence to sample size feasibility.
