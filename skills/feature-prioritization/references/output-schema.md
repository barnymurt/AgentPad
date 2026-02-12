# Output Schema: Feature Prioritization

This file defines the exact structure of the Feature Prioritization skill output. Every output must conform to this schema.

## Output Structure

```
# Feature Prioritization: [Product Name]

## 1. Feature List
For each feature (required, minimum 3):
- Name (required): Clear, concise name
- Description (required): One sentence explaining what it does
- Requested by (conditional): Who asked for it (customer segment, internal team, etc.)
- Target user (required): Which user segment benefits

## 2. Framework Selection
- Framework chosen (required): RICE, ICE, Weighted Scoring, or 2x2 Matrix
- Rationale (required): Why this framework suits this context (2-3 sentences)
- Scoring dimensions (required): List each dimension with its definition and scale
- Dimension weights (conditional, required for Weighted Scoring): Weight per dimension with justification
- Calibration note (required): How the scoring scale was calibrated to this product's context

## 3. Scoring Table

### [Framework] Scoring

| Feature | [Dim 1] | [Dim 2] | ... | Composite Score |
|---------|---------|---------|-----|----------------|
| Feature A | Score (rationale) | Score (rationale) | ... | Calculated |
| Feature B | Score (rationale) | Score (rationale) | ... | Calculated |

For each cell (required):
- Numeric score per the framework's scale
- 1-sentence rationale in parentheses
- Confidence tag: [H], [M], or [L]

Composite score (required): Calculated per the framework formula

## 4. Ranked Backlog

### Tier 1: Build Now
For each feature in this tier (required, at least 1):
- Rank (required): Position in overall ranking
- Feature name (required): With composite score
- Rationale (required): Why this is top priority (2-3 sentences referencing scores)
- Dependencies (conditional): Other features that must be built first or alongside

### Tier 2: Validate First
For each feature (conditional — include if any features have Low confidence on 2+ dimensions):
- Feature name (required): With composite score
- What's uncertain (required): Which scores are Low confidence
- Validation step (required): Specific action to increase confidence

### Tier 3: Park
For each feature (conditional — include if any features scored in bottom third):
- Feature name (required): With composite score
- Why it's parked (required): Specific reasons from the scoring
- Revisit trigger (required): What would change the ranking

## 5. Analysis

### Surprises (conditional)
- Features ranked higher or lower than intuition suggests, with explanation

### Dependencies (required if any exist)
- Dependency map showing which features require others
- Recommended build sequence accounting for dependencies

### Regret Test (required for top 3 and bottom 3)
- Top 3: "If we don't build this, the consequence is..."
- Bottom 3: "If we never build this, the impact is..."

## 6. Recommendations
- Recommended next action (required): Specific, actionable (e.g., "Start building Feature A this sprint")
- Revisit cadence (required): When to re-run prioritization (and what triggers an early re-run)
- Missing features (conditional): Any capabilities noticeably absent from the list

## 7. Methodology Notes
- Framework used (required): With formula
- Data sources (required): What informed the scores
- Confidence distribution (required): % of scores at High/Medium/Low
- Limitations (required): What could change the ranking
```

## Validation Rules

1. At least 3 features scored across all framework dimensions
2. Every score has a rationale (not just a number)
3. Composite scores are arithmetically correct per the stated formula
4. Ranking order matches composite scores (unless dependencies override — if so, noted)
5. At least one feature in the "Build Now" tier
6. Regret test applied to top 3 and bottom 3
7. Confidence tags present on every individual score

## Confidence Tagging

- **High [H]:** Based on data — usage analytics, customer interviews, A/B test results, revenue data
- **Medium [M]:** Based on informed estimates — customer feedback themes, competitor analysis, team expertise
- **Low [L]:** Based on assumptions — gut feeling, unvalidated hypothesis, single data point

Features with Low confidence on 2+ dimensions must be placed in the "Validate First" tier regardless of composite score.
