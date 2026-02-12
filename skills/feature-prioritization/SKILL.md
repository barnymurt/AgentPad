---
name: feature-prioritization
description: Score and rank product features or ideas using structured prioritization frameworks. Use when the user asks to prioritize a feature backlog, decide what to build next, rank features by impact, compare feature ideas, or apply RICE/ICE/weighted scoring to a list of features or product ideas. Covers framework selection, multi-criteria scoring, ranking, and actionable build recommendations for SaaS and digital products.
---

# Feature Prioritization

Score and rank product features using proven prioritization frameworks (RICE, ICE, weighted scoring) adapted for SaaS and digital products. Unlike raw LLM output that gives subjective opinions on what to build, this skill applies structured scoring across multiple dimensions, makes trade-offs explicit, and produces a ranked backlog with clear rationale for every position.

## Core Workflow

### Step 1: Gather the Feature List

Collect the features or ideas to be prioritized:

1. **Get the list from the user.** Ask for: feature name, brief description, and any context (who requested it, why it matters). Accept whatever format the user provides — bullet list, spreadsheet paste, conversational dump.
2. **Normalize each item.** Ensure every feature has: a clear name, a one-sentence description, and the target user segment. If missing, ask.
3. **Check for duplicates and overlaps.** Flag features that might be different expressions of the same thing. Merge or separate with user confirmation.
4. **Establish scope.** Confirm: are we prioritizing for the next sprint, quarter, or year? This affects how "effort" and "reach" are evaluated.

If the user provides fewer than 3 features, suggest adding more for a meaningful comparison. If more than 15, recommend grouping into themes first and prioritizing themes, then features within the top themes.

### Step 2: Select the Framework

Choose the scoring framework based on context. Refer to [references/framework.md](references/framework.md) for full detail on each.

| Context | Recommended Framework |
|---------|-----------------------|
| Early-stage, limited data, need speed | **ICE** (Impact, Confidence, Ease) |
| Growth-stage, have usage data, need rigor | **RICE** (Reach, Impact, Confidence, Effort) |
| Complex trade-offs, stakeholder alignment needed | **Weighted Scoring** (custom dimensions) |
| Quick gut-check, informal decision | **2x2 Matrix** (effort vs. impact) |

If the user specifies a framework, use it. If not, recommend one based on their situation and explain why. Always state which framework is being used and why.

### Step 3: Define Scoring Criteria

For the selected framework, establish how each dimension will be scored:

1. **Define the scale** for each dimension (per framework — see [references/framework.md](references/framework.md))
2. **Calibrate with the user.** Pick one feature the user knows well and score it together. This establishes shared understanding of what "high impact" or "low effort" means in their context.
3. **Identify any custom dimensions.** For weighted scoring, ask if there are business-specific factors to include (e.g., "strategic alignment with enterprise pivot," "reduces churn," "unlocks a new segment").

### Step 4: Score Every Feature

Score each feature across all dimensions:

1. Apply the scoring rubric from [references/framework.md](references/framework.md)
2. For each score, provide a brief rationale (1 sentence) — not just a number
3. Tag confidence: **High** (based on data — usage metrics, customer requests), **Medium** (informed estimate), **Low** (assumption — flag for validation)
4. Calculate the composite score per the framework formula

Present scores in a comparison table. Flag any feature where confidence is Low on 2+ dimensions — these need validation before committing resources.

### Step 5: Rank and Analyze

Produce the prioritized ranking and extract insights:

1. **Rank by composite score** (highest = build first)
2. **Identify clusters:** Are there natural tiers (must-do, should-do, nice-to-have, park)?
3. **Check for surprises:** Any feature ranked much higher or lower than intuition suggests? Call these out — they're where the framework adds the most value.
4. **Assess dependencies:** Does any high-ranked feature depend on a lower-ranked one? If so, flag the dependency and recommend sequencing.
5. **Apply the "regret test":** For the top 3 features — if you DON'T build this, what's the consequence? For the bottom 3 — if you never build this, does it matter?

### Step 6: Recommend and Caveat

Deliver actionable recommendations:

1. **"Build now" tier:** Top-ranked features with high confidence. Recommend starting immediately.
2. **"Validate first" tier:** High-scoring but low-confidence features. Recommend specific validation steps before committing.
3. **"Park" tier:** Low-scoring features. Explain why and what would change the ranking.
4. **Revisit triggers:** Define what signals should trigger re-prioritization (new data, market shift, customer feedback).

Ground every recommendation in the scoring. No unsupported "I think you should build X."

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Feature List** — normalized features with descriptions
- **Framework Selection** — which framework, why, and scoring criteria
- **Scoring Table** — every feature scored on every dimension with rationale
- **Ranked Backlog** — ordered list with tiers and dependency notes
- **Recommendations** — build now, validate first, park, revisit triggers
- **Methodology Notes** — confidence levels, data sources, limitations

Expected length: 1,500-3,000 words depending on the number of features.

## Quality Criteria

- [ ] At least 3 features scored across all framework dimensions
- [ ] Every score has a 1-sentence rationale (not just a number)
- [ ] Confidence levels tagged on each score (High/Medium/Low)
- [ ] Framework selection is justified (not just "we'll use RICE")
- [ ] Dependencies between features are identified
- [ ] Recommendations are tiered (build now / validate first / park)
- [ ] Scoring formula is stated and correctly applied
- [ ] SaaS-specific factors considered (churn reduction, expansion revenue, activation)

## References

- **Scoring frameworks and rubrics:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (project management SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Scoring without calibration:** Jumping straight to scoring without establishing what "high" and "low" mean in the user's context. A "3" for impact at a pre-revenue startup means something completely different than at a $10M ARR company. Always calibrate with one known feature first.

2. **Treating all dimensions as equal when they're not:** In RICE, reach and impact matter more than confidence and effort for most SaaS products. In weighted scoring, not asking the user which dimensions matter most. Default weights are a starting point, not a final answer.

3. **Ignoring dependencies:** Ranking features independently when they have sequential dependencies. A high-scoring feature that requires a lower-scoring one to be built first changes the effective priority of both. Always check for and flag dependencies.

4. **Confusing effort with complexity:** A feature can be high-effort but simple (lots of UI screens) or low-effort but complex (algorithm design). Effort should estimate calendar time and resources, not intellectual difficulty.

5. **Not challenging the list itself:** Accepting the user's feature list at face value without asking whether these are the right features to be comparing. Sometimes the most valuable output is identifying that a critical feature is missing from the list entirely.
