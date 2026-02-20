---
name: survey-design
description: Create structured quantitative surveys for customer validation, feedback collection, or market research. Use when the user needs to measure attitudes, gather feedback, validate assumptions, or collect data at scale. Use when the user says "create a survey," "write survey questions," "measure customer satisfaction," "collect feedback at scale," or "what questions should I ask in my survey." Produces research-quality surveys with proper question types, bias prevention, and analysis planning.
---

# Survey Design

Create structured quantitative surveys that produce reliable, actionable data. Unlike generic question lists, this skill produces research-quality surveys with properly scaled question types, bias prevention, logical flow, and analysis planning.

**Note**: This skill requires clear survey objectives. See Step 1.

## Core Workflow

### Step 1: Define Survey Objectives

**Before writing questions, establish:**

1. **What to measure:**
   - Attitudes (satisfaction, preference)
   - Behaviors (usage, frequency)
   - Demographics (role, company size)
   - Opinions (agreement, importance)

2. **What decisions will this inform:**
   - Product priorities
   - Feature decisions
   - Satisfaction improvements
   - Market sizing

3. **Target audience:**
   - Current customers
   - Potential customers
   - Specific user segments

**If objectives unclear:**
- Ask user to define goals before proceeding
- Don't create survey without clear purpose

### Step 2: Choose Question Types

**Question type selection:**

| Type | Use For | Example |
|------|---------|---------|
| **Multiple choice** | Categorical answers | Which features do you use? |
| **Likert scale** | Agreement/importance | Strongly disagree → Strongly agree |
| **NPS** | Net Promoter Score | 0-10 likelihood to recommend |
| **Rating** | Satisfaction/quality | 1-5 stars |
| **Open-ended** | Qualitative feedback | Any other thoughts? |
| **Demographic** | Segment data | Role, company size |

**Selection guidelines:**
- Use Likert for attitudes
- Use NPS for loyalty
- Use multiple choice for categories
- Limit open-ended questions (harder to analyze)

### Step 3: Write Questions (Bias Prevention)

**Critical: Prevent biased questions**

**Leading question (bad):**
"How much do you love our amazing product?"

**Neutral question (good):**
"How would you rate our product?"

**Bias Checklist:**

- [ ] No leading words (love, hate, amazing, terrible)
- [ ] No assumptions (you already use X)
- [ ] No double-barreled questions (two things in one)
- [ ] No double negatives
- [ ] Balanced answer options
- [ ] Clear, simple language

**Question guidelines:**
- One idea per question
- Use neutral language
- Make options mutually exclusive
- Include "other" or "N/A" when appropriate

### Step 4: Structure Survey Flow

**Logical ordering:**

1. **Warm-up (1-2 questions)**
   - Easy, engaging
   - Demographics or screening first (if needed)

2. **Core questions (5-15)**
   - Most important questions
   - Group by topic
   - Flow easy → hard

3. **Deep-dive (2-3)**
   - Most sensitive or detailed
   - After rapport established

4. **Wrap-up (1-2)**
   - Open-ended for additional feedback
   - Thank you

**Length guidelines:**
- 5-7 minutes max for completion
- 10-15 questions max
- Longer surveys = lower completion rates

### Step 5: Calculate Sample Size

**Sample size factors:**

| Factor | Impact |
|--------|--------|
| Population size | Larger = more precision needed |
| Margin of error | 5% is standard |
| Confidence level | 95% is standard |
| Response distribution | 50% = most conservative |

**Simple formula:**
```
Sample size = (Z² × p × (1-p)) / e²

Where:
- Z = 1.96 (for 95% confidence)
- p = 0.5 (most conservative)
- e = 0.05 (5% margin of error)

Result: 384 respondents for general population
```

**Adjust for:**
- Subgroups: Need more per group
- Expected response rate: Higher if low
- Data quality: Exclude incomplete responses

### Step 6: Plan Analysis

**Before launching:**

1. **How to analyze:**
   - Quantify Likert scales (averages)
   - Calculate NPS (% promoters - % detractors)
   - Cross-tabulate by segments
   - Code open-ended responses

2. **What to report:**
   - Overall scores
   - Segment differences
   - Key themes from open-ended
   - Statistical significance

### Step 7: Add Incentives and Platform

**Incentive guidance:**

| Audience | Incentive | Notes |
|----------|----------|-------|
| Customers | Discount, early access | Works well |
| General | Prize draw | Lower response |
| B2B | Gift card, donation | Higher response |
| None | - | Only if highly engaged |

**Platform recommendations:**

| Tool | Best For |
|------|----------|
| Typeform | Beautiful, mobile-first |
| SurveyMonkey | Robust analytics |
| Google Forms | Free, simple |
| Qualtrics | Enterprise research |
| Hotjar | In-app surveys |

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Survey Objectives** — Purpose and goals
- **Question List** — All questions with types
- **Bias Check** — Validation of neutral language
- **Flow** — Logical ordering and timing
- **Sample Size** — Target respondents
- **Analysis Plan** — How to interpret results

Expected length: 1,000-2,000 words

## Quality Criteria

- [ ] Survey objectives clearly defined
- [ ] Question types appropriate for data needed
- [ ] Bias check completed (no leading/loaded questions)
- [ ] Questions flow logically
- [ ] Survey length reasonable (5-7 min, 10-15 questions)
- [ ] Sample size calculated
- [ ] Response rate estimated
- [ ] Analysis plan defined
- [ ] Platform selected
- [ ] Incentives considered

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Leading questions:** "How much do you love our great service?" biases responses. Use neutral language.

2. **Too long:** 30-question surveys have low completion rates. Keep to 10-15 max.

3. **Wrong question type:** Using open-ended for everything when you need quantification. Match type to analysis need.

4. **No bias check:** Questions that assume behavior ("How often do you use our product?") exclude non-users. Use screener first.

5. **Skipping sample size:** Surveying 20 people and claiming statistical significance. Calculate proper sample.

6. **No pretesting:** Launching without testing. Always pilot with 5-10 people.

7. **Ignoring completion rate:** Not accounting for drop-offs. Target more responses than needed.

8. **Analysis afterthought:** Designing questions without knowing how to analyze. Plan analysis first.
