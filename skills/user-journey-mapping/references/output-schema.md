# Output Schema: User Journey Mapping

This file defines the exact structure of the User Journey Mapping skill output. Every output must conform to this schema. Fields marked (required) must be populated; fields marked (conditional) are included when relevant data exists.

## Output Structure

```
# User Journey Map: [Product Name]

## 1. Journey Context
- Persona (required): Name, role, goals, technical sophistication
- Product (required): Name, category, pricing model, primary value proposition
- Journey scope (required): Full lifecycle / single stage / task-specific
- Data sources (required): What informed the map (analytics, interviews, assumptions)
- Key assumptions (conditional): Any significant assumptions made due to missing data

## 2. Journey Stages

### Stage [N]: [Stage Name]

#### Actions
For each action (required, minimum 2 per stage):
- Action description (required): Specific user action (verb + object)
- Touchpoint (required): Where this happens (in-app, email, website, etc.)
- Channel (required): Specific channel (e.g., "welcome email," "pricing page," "dashboard")

#### User Thoughts
For each thought (required, minimum 1 per stage):
- Thought (required): Verbatim-style internal monologue in quotes

#### Emotions
- Emotion rating (required): -2 to +2 scale
- Emotion label (required): One word (e.g., "excited," "confused," "frustrated")
- Emotion driver (required): What's causing this emotion (1 sentence)

#### Pain Points
For each pain point (conditional — include all identified):
- Description (required): What the pain point is
- Severity score (required): Frequency / Impact / Breadth scores and average
- Classification (required): Critical / Major / Minor / Trivial
- Confidence (required): [H] / [M] / [L]

#### Moment of Truth (conditional — include if one occurs at this stage)
- Type (required): Aha Moment / Activation Moment / Habit Moment
- Trigger action (required): The specific action that constitutes this moment
- Current conversion (conditional): % of users reaching this moment
- Blockers (required): What prevents users from reaching it

[Repeat for all 5 stages]

## 3. Moments of Truth Summary
For each moment (required, minimum 2, ideally 3):
- Moment type (required): Aha / Activation / Habit
- Stage (required): Which journey stage it occurs in
- Trigger action (required): Specific, measurable action
- Current conversion rate (conditional): % of users who reach it (with confidence tag)
- Top blocker (required): The #1 barrier
- Business impact (required): What improving conversion here means for the business (1-2 sentences)

## 4. Pain Point Register

### Summary Table
| # | Pain Point | Stage | Freq | Impact | Breadth | Severity | Class | Confidence |
|---|-----------|-------|------|--------|---------|----------|-------|------------|
(required: all identified pain points, minimum 5 across the journey)

### Critical Pain Points (conditional — detail any scoring 4.0+)
For each:
- Full description (required): Context and specifics
- Root cause (required): Why this pain point exists
- User impact (required): What happens to the user experience
- Business impact (required): Effect on conversion, retention, or revenue

## 5. Emotion Curve
- Curve shape (required): Overall pattern name (The Dip, The Cliff, etc.) with description
- Touchpoint-by-touchpoint ratings (required): Sequential list of key touchpoints with emotion ratings

  Format:
  [Stage] Touchpoint → Emotion Rating (label): Driver

- Emotional peaks (required): Best moments in the journey (minimum 1)
- Emotional valleys (required): Worst moments in the journey (minimum 1)
- Overall trend (required): 1-2 sentences on the emotional trajectory

## 6. Opportunity Register

### Summary Table
| # | Opportunity | Stage | Pain Severity | Biz Impact | Feasibility | Opp Score | Tier |
|---|------------|-------|--------------|------------|-------------|-----------|------|
(required: minimum 5 opportunities, ranked by Opportunity Score)

### Top 3 Opportunities (required)
For each:
- Opportunity name (required): Clear, action-oriented name
- What to do (required): Specific fix or improvement (2-3 sentences)
- Expected outcome (required): What changes for the user and the business
- Success metric (required): Measurable KPI to track
- Estimated effort (required): T-shirt size (S/M/L/XL) with brief justification
- Confidence (required): [H] / [M] / [L]

## 7. Recommendations
- Recommended action plan (required): Sequenced list of what to do first, second, third
- Quick wins (required): Changes that can ship in <1 week
- Validation needed (conditional): Areas where the map is assumption-heavy and needs data
- Revisit triggers (required): When to re-map the journey
- Missing touchpoints (conditional): Gaps in the journey where no interaction exists

## 8. Methodology Notes
- Framework used (required): "SaaS 5-Stage Journey Mapping with Pain Point Severity Scoring"
- Data sources (required): What informed each score
- Confidence distribution (required): % of data points at High / Medium / Low confidence
- Limitations (required): What could change the map
- Persona coverage (conditional): If multiple personas exist, note which was mapped and which are pending
```

## Field Definitions

### Persona
- **What:** The user archetype whose journey is being mapped
- **Format:** Name (can be fictional archetype like "Marketing Mary"), role, company context, goals, and tech comfort level in 2-4 sentences
- **Good example:** "Sarah, Marketing Manager at a 15-person B2B startup. Manages email campaigns and social media. Goal: grow subscriber list from 500 to 5,000 in 6 months. Comfortable with marketing tools but not technical — no coding, no API knowledge."
- **Bad example:** "A marketer who uses email tools." (Too vague — no goals, no context, no constraints)

### Emotion Rating
- **What:** Numerical score representing the user's emotional state at a touchpoint
- **Format:** Integer from -2 to +2
- **Good example:** "+1 (confident): User sees pre-built templates and feels supported"
- **Bad example:** "Happy" (No score, no driver, not actionable)

### Pain Point Severity Score
- **What:** Average of Frequency, Impact, and Breadth scores
- **Format:** Three individual scores (1-5) and their average rounded to 1 decimal place
- **Good example:** "Freq: 4 / Impact: 5 / Breadth: 3 → Severity: 4.0 (Critical) [M]"
- **Bad example:** "High severity" (No scores, no classification, no basis for comparison)

### Opportunity Score
- **What:** Composite prioritization score for improvement opportunities
- **Format:** Pain Severity × Business Impact × Feasibility, each 1-5, product shown
- **Good example:** "Pain: 4.0 × Biz Impact: 4 × Feasibility: 5 = 80.0"
- **Bad example:** "High priority" (No formula, no comparability)

### Success Metric
- **What:** The KPI that indicates whether an opportunity fix worked
- **Format:** Specific metric name + direction + magnitude estimate
- **Good example:** "Trial-to-paid conversion rate increases from ~8% to 12-15%"
- **Bad example:** "Improved conversion" (No baseline, no target, unmeasurable)

### Moment of Truth Trigger Action
- **What:** The specific user action that constitutes a moment of truth
- **Format:** Verb + object + qualifier
- **Good example:** "Sends first email campaign to a real subscriber list (not a test)"
- **Bad example:** "Uses the product" (Not specific, not measurable)

## Validation Rules

1. All five journey stages are mapped (unless scope is explicitly single-stage or task-specific)
2. Every stage has at least 2 actions, 1 thought, and 1 emotion rating
3. At least 5 pain points identified across the full journey
4. Every pain point has Frequency, Impact, and Breadth scores with rationale
5. Severity classifications match the scoring thresholds (4.0+ = Critical, 3.0-3.9 = Major, etc.)
6. At least 2 moments of truth identified with specific trigger actions
7. Emotion curve covers all mapped stages with sequential touchpoint ratings
8. At least 5 opportunities in the register, ranked by Opportunity Score
9. Top 3 opportunities each have a measurable success metric
10. Confidence tags present on all pain point scores, moments of truth, and top opportunities
11. SaaS-specific context maintained — trial conversion, activation, churn, and expansion are referenced where relevant

## Confidence Tagging

- **High [H]:** Based on quantitative data — analytics, conversion rates, churn data, A/B test results, support ticket counts
- **Medium [M]:** Based on qualitative evidence — user interviews, customer feedback themes, support conversation patterns, competitor analysis
- **Low [L]:** Based on assumptions — industry benchmarks applied without validation, hypothesized user behavior, inferred emotions

Stages or pain points with all-Low confidence should include a recommendation to collect data before acting on the findings.
