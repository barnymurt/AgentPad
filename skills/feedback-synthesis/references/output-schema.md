# Output Schema: Feedback Synthesis

This file defines the exact structure of the Feedback Synthesis skill output. Every output must conform to this schema.

## Output Structure

```
# Feedback Synthesis: [Product Name]

## 1. Executive Summary
- Finding 1 (required): Top-level insight in one sentence
- Finding 2 (required): Second most important insight
- Finding 3 (required): Third most important insight
- Finding 4-5 (conditional): Additional critical findings if warranted
- Overall sentiment snapshot (required): Distribution across themes (not a single score)
- Biggest gap (required): What the feedback does NOT tell you

## 2. Source Inventory

| Source | Type | Tier | Sample Size | Time Period | Segment | Known Bias |
|--------|------|------|-------------|-------------|---------|------------|
(required: at least 2 sources; each row fully populated)

- Total feedback items analyzed (required): Count
- Source diversity assessment (required): 1-2 sentences on coverage quality

## 3. Theme Analysis

### Theme: [Descriptive Theme Name]
For each theme (required, minimum 3):
- Summary (required): 2-3 sentence description of the theme
- Signal strength (required): High / Medium / Low with score breakdown
- Evidence count (required): X items from Y unique users across Z sources
- Weighted frequency (required): Calculated per framework
- Severity (required): Blocker / High friction / Moderate friction / Minor inconvenience
- Sentiment (required): Distribution (e.g., "85% negative, 15% mixed")
- Segments affected (required): Which user segments
- Representative quotes (required): 2-3 verbatim quotes with source attribution
- Product area (required): Which part of the product this maps to

## 4. Contradiction Analysis
For each contradiction (conditional — include if any themes have conflicting feedback):
- Contradiction (required): What conflicts
- Side A (required): Position, evidence count, segments
- Side B (required): Position, evidence count, segments
- Explanation (required): Why the contradiction exists
- Resolution (required): Recommended approach

## 5. Impact Map

| Priority | Theme | Product Change | Target Metric | Expected Impact | Confidence |
|----------|-------|---------------|---------------|-----------------|------------|
(required: at least 3 rows, sorted by priority)

For each row:
- Priority (required): Rank order (1 = highest)
- Theme (required): Theme name from Section 3
- Product change (required): Specific action, not vague direction
- Target metric (required): SaaS metric that moves (churn, activation, NPS, etc.)
- Expected impact (required): Small / Medium / Large with brief rationale
- Confidence (required): High / Medium / Low

## 6. Prioritized Recommendations

### Act Now (High confidence, High/Medium signal)
For each (required, at least 1):
- Recommendation (required): Specific action
- Supporting themes (required): Which themes drive this
- Expected outcome (required): Metric impact
- Validation needed (required): None / minimal / specific step

### Investigate Further (Medium confidence or single-source)
For each (conditional):
- Recommendation (required): What to research
- Why uncertain (required): What's missing
- Suggested method (required): Interview, survey, A/B test, analytics check

### Monitor (Low signal, emerging)
For each (conditional):
- Signal (required): What was observed
- Threshold (required): When to act (e.g., "if mentions increase 3x next quarter")

## 7. Gaps and Limitations
- Underrepresented segments (required): Which user segments have insufficient feedback
- Missing journey stages (required): Which parts of the user experience have no coverage
- Source limitations (required): Biases, small samples, single-source themes
- Recommended next research (required): What to collect next and how
```

## Field Definitions

### Executive Summary Findings
- **What:** The 3-5 most important insights distilled to one sentence each. These are findings, not observations — they include implication.
- **Format:** One sentence per finding, written as "[Subject] [insight] [implication]."
- **Good example:** "New users consistently abandon onboarding at the team invitation step, suggesting the collaborative value proposition isn't landing during setup."
- **Bad example:** "Users have problems with onboarding." (Too vague, no implication, not an insight.)

### Signal Strength
- **What:** A composite assessment of how reliable and important a theme is, based on the 5-dimension scoring rubric in framework.md.
- **Format:** High / Medium / Low with the 5-dimension score breakdown (e.g., "High signal — Frequency: 4, Severity: 5, Segment: 4, Source: 3, Trend: 4 = 20/25")
- **Good example:** "High signal (20/25) — Frequency: 4 (mentioned 18 times), Severity: 5 (causes churn), Segment: 4 (affects paying users), Source: 3 (Tier 2-3 mix), Trend: 4 (increasing)"
- **Bad example:** "High signal" (No breakdown, no rationale — unverifiable.)

### Weighted Frequency
- **What:** The source-reliability-adjusted count of feedback items supporting a theme.
- **Format:** Numeric value with calculation shown.
- **Good example:** "Weighted frequency: 18.5 (8 interview mentions × 1.5 + 6 survey mentions × 1.0 + 4 review mentions × 0.75)"
- **Bad example:** "18 mentions" (Raw count without weighting.)

### Representative Quotes
- **What:** Verbatim user words that illustrate the theme. Selected for specificity and emotional clarity, not just frequency.
- **Format:** Direct quote with source type and segment attribution.
- **Good example:** "'I spent 20 minutes trying to figure out how to invite my team and eventually gave up and used email instead.' — Tier 2, Survey, New user (Week 1), Free plan"
- **Bad example:** "'Not great' — User" (Vague, no attribution, no context.)

### Product Change (Impact Map)
- **What:** A specific, actionable change the product team could make to address the theme.
- **Format:** Concrete action, not a direction. Should be scoped enough that a PM could write a ticket.
- **Good example:** "Add a guided team invitation flow during onboarding with a skip option and email reminder after 24 hours."
- **Bad example:** "Improve onboarding." (Too vague to act on.)

### Expected Impact
- **What:** The estimated magnitude of metric movement if the product change is implemented.
- **Format:** Small / Medium / Large with 1-sentence rationale referencing the feedback evidence.
- **Good example:** "Medium — 12 of 18 mentions are from users in their first week, suggesting fixing this could improve 14-day activation by 5-10%."
- **Bad example:** "High impact" (No rationale, no evidence connection.)

## Validation Rules

1. All (required) fields must be populated with non-placeholder content
2. At least 3 themes extracted and fully analyzed
3. At least 2 feedback sources classified with reliability tiers
4. Signal strength scores are calculated using the 5-dimension rubric (not ad-hoc)
5. Weighted frequency uses source reliability multipliers (not raw counts)
6. Every recommendation ties back to at least one analyzed theme
7. Contradictions are surfaced (not averaged away) when present in the data
8. Impact map connects to specific SaaS metrics (not generic "improvement")
9. Gaps section identifies at least one underrepresented segment or journey stage
10. Representative quotes are verbatim with source attribution (not paraphrased)

## Confidence Tagging

- **High:** Theme supported by Tier 1-2 sources, 5+ unique users, corroborated across 2+ source types. Impact estimate based on strong evidence.
- **Medium:** Theme supported by Tier 2-3 sources, 3-4 unique users, or strong signal from a single source type. Impact estimate based on reasonable inference.
- **Low:** Theme based on Tier 3-4 sources, <3 unique users, or single source type. Impact estimate is a hypothesis requiring validation.

Tag every theme's signal strength and every recommendation's confidence level. Features with Low confidence must appear in "Investigate Further," not "Act Now."
