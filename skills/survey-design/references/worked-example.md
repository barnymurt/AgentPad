# Worked Example: Survey Design

This file shows the Survey Design skill applied to a complete scenario.

---

## Scenario: InvoiceFlow - Customer Satisfaction Survey

**Context:** InvoiceFlow wants to measure customer satisfaction and identify areas for improvement. They have an active customer base of 2,000 users and want to launch a survey to gather quantitative feedback.

---

## Output: Survey Design

# Survey: InvoiceFlow Customer Satisfaction

## 1. Survey Objectives

### Research Purpose
- [x] Measure satisfaction
- [ ] Validate assumptions
- [x] Gather feedback
- [x] Segment users
- [ ] Other: __________

### Key Questions to Answer
1. How satisfied are customers with InvoiceFlow?
2. What features are most valued?
3. What improvements would customers want?
4. How likely are customers to recommend?

### Target Audience
- Current InvoiceFlow users (active in last 30 days)
- Mix of free trial and paid customers
- Various company sizes

---

## 2. Survey Flow

### Structure

| Section | Questions | Time |
|---------|-----------|------|
| Warm-up | Q1-Q2 | 1 min |
| Core | Q3-Q8 | 3 min |
| Deep-dive | Q9-Q10 | 1.5 min |
| Wrap-up | Q11-Q12 | 1 min |

**Total:** 12 questions, ~6 minutes

---

## 3. Questions

### Screener (included in Q1)

### Core Questions

| # | Question | Type | Options | Bias Check |
|---|----------|------|---------|------------|
| Q1 | How satisfied are you with InvoiceFlow? | NPS | 0-10 | ✓ Pass |
| Q2 | How satisfied are you with the following? (List features) | Likert 1-5 | 5-point scale | ✓ Pass |
| Q3 | How often do you use InvoiceFlow? | Multiple choice | Daily/Weekly/Monthly | ✓ Pass |
| Q4 | What do you use InvoiceFlow primarily for? | Multiple choice | [Options] | ✓ Pass |
| Q5 | How easy is it to send your first invoice? | Likert 1-5 | Very difficult → Very easy | ✓ Pass |
| Q6 | How satisfied are you with customer support? | Likert 1-5 | [5-point] | ✓ Pass |
| Q7 | Have you recommended InvoiceFlow to others? | Multiple choice | Yes/No | ✓ Pass |
| Q8 | What is the main reason for your satisfaction rating? | Open | Text | ✓ Pass |

### Deep-dive Questions

| # | Question | Type | Options |
|---|----------|------|---------|
| Q9 | What feature would you most like us to add? | Multiple choice | [Options] |
| Q10 | What is the biggest pain point in your invoicing process? | Open | Text |

### Wrap-up

| # | Question | Type |
|---|----------|------|
| Q11 | What other feedback do you have? | Open text |
| Q12 | Would you like to participate in future research? | Multiple choice |

---

## 4. Question Detail

### Q1: Overall Satisfaction (NPS)

**Type:** NPS (0-10)
**Purpose:** Measure loyalty and likelihood to recommend

**Question:**
"How likely are you to recommend InvoiceFlow to a friend or colleague?"

**Options:**
- 0 - Not at all likely
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- 10 - Extremely likely

**Analysis:**
- Calculate NPS = % Promoters (9-10) - % Detractors (0-6)
- Target: NPS > 50

---

### Q2: Feature Satisfaction

**Type:** Likert scale
**Purpose:** Identify which features customers value

**Question:**
"How satisfied are you with each feature?"

**Options:**
- Very dissatisfied
- Dissatisfied
- Neutral
- Satisfied
- Very satisfied

**Features:**
- Invoice creation
- Payment tracking
- Client management
- Recurring invoices
- Reporting

**Analysis:** Average satisfaction per feature

---

### Q3: Usage Frequency

**Type:** Multiple choice
**Purpose:** Segment users by engagement

**Question:**
"How often do you use InvoiceFlow?"

**Options:**
- Daily
- Several times a week
- Weekly
- Several times a month
- Monthly or less

---

### Q8: Reason for Satisfaction

**Type:** Open-ended
**Purpose:** Get qualitative context for quantitative scores

**Question:**
"What is the main reason for your satisfaction rating?"

---

## 5. Bias Check

### Question Review

| # | Question | Issue | Fix |
|---|----------|-------|-----|
| Q1 | "How likely are you to recommend..." | None | Pass |
| Q2 | "How satisfied are you with..." | None | Pass |
| Q3 | "How often do you use InvoiceFlow?" | None | Pass - no assumption |
| Q4 | "What do you use InvoiceFlow primarily for?" | None | Pass |
| Q5 | "How easy is it to send your first invoice?" | None | Pass - neutral |
| Q6 | "How satisfied are you with customer support?" | None | Pass |
| Q7 | "Have you recommended InvoiceFlow..." | Could imply they should | Changed to open |

### Checklist
- [x] No leading words (love, hate, amazing)
- [x] No assumptions about behavior
- [x] No double-barreled questions
- [x] Balanced answer options
- [x] Clear, simple language

---

## 6. Sample Size

### Calculation

| Factor | Value |
|--------|-------|
| Target population | 2,000 active users |
| Margin of error | 5% |
| Confidence level | 95% |
| Expected response | 25% |

### Required Sample
- **Minimum:** 322 respondents
- **Target:** 400 respondents (for subgroup analysis)
- **With subgroups:** 200 per segment

### Response Rate Estimate
- Expected rate: 25%
- Invites needed: 1,600

---

## 7. Analysis Plan

### Quantitative Analysis
| Question | Metric | Interpretation |
|----------|--------|----------------|
| Q1 (NPS) | Score | >50 = excellent, >70 = world-class |
| Q2 (Features) | Mean per feature | Higher = more valued |
| Q3 (Usage) | Distribution | Segment by engagement |
| Q5-Q6 (Satisfaction) | Mean | >4.0 = good |

### Segmentation
- By plan type (free/paid)
- By usage frequency
- By NPS score

### Reporting
- Overall NPS score
- Feature satisfaction rankings
- Segment comparisons
- Key themes from open-ended

---

## 8. Launch Plan

### Platform
- Tool: Typeform
- Why: Beautiful mobile experience, good analytics, integrates with email

### Distribution
- Channel: Email to customer list
- Timing: Tuesday morning, second week of month
- Follow-up: Reminder email after 3 days

### Incentives
- Entry into prize draw for $100 credit
- Increases response rate ~20%

---

**End of Worked Example**
