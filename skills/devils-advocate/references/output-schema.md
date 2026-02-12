# Output Schema: Devil's Advocate

This file defines the exact structure of the Devil's Advocate skill output.

## Output Structure

```
# Devil's Advocate Analysis: [Product/Idea Name]

## 1. Claim Set

### Core Thesis (required)
- Statement (required): The central bet this idea makes, in one sentence
- Confidence (required): How validated is this thesis? (Validated / Partially validated / Unvalidated)

### Decomposed Assumptions (required, minimum 5)

| # | Assumption | Category | Certainty | Impact if Wrong | Risk Priority |
|---|-----------|----------|-----------|----------------|---------------|
| 1 | [assumption] | Problem/Customer/Solution/Market/Business Model/Timing | H/M/L | Fatal/Major/Minor | Challenge First / Challenge Second / Monitor / Skip |

## 2. Assumption Challenges (required, top 3-5 by risk priority)

### Challenge 1: [Assumption being challenged]

- Assumption stated (required): "You are assuming that [X]"
- Counter-argument (required): The strongest case for why this might NOT be true (2-3 sentences, specific, not generic)
- Evidence (required): Supporting or undermining data — analogies, market data, competitor outcomes, customer behavior patterns
- Damage assessment (required): If wrong — Fatal / Major redesign / Minor adjustment
- Validation test (required): How to test this assumption quickly and cheaply (specific action, expected timeline, decision criteria)

[Repeat for each challenged assumption]

## 3. Value Proposition Assessment

### The Switchover Test
- Current solution (required): What customers use today
- Switching costs (required): Monetary, time, learning, data migration, habit
- Benefit magnitude (required): How much better is the new solution?
- Verdict (required): Pass / Conditional / Fail
- Reasoning (required): 2-3 sentences

### The "10x Better" Test
- Improvement table (required):
  | Dimension | Current | This Product | Factor |
  |-----------|---------|-------------|--------|
- Best dimension (required): Where the improvement is largest
- Verdict (required): Pass / Conditional / Fail
- Reasoning (required)

### The "Would You Pay?" Test
- Strongest demand signal (required): What evidence exists for willingness to pay?
- Signal strength (required): Polite interest / Would try free / Would pay / Pre-ordering / Already hacking alternatives
- Verdict (required): Pass / Conditional / Fail
- Reasoning (required)

### The "Explain It" Test
- One-sentence value prop (required): Attempt to state it clearly
- Verdict (required): Pass / Conditional / Fail
- What's unclear or weak (conditional): If not pass, what needs sharpening

### Overall Value Prop Score (required)
- Tests passed: X/4
- Assessment: Strong / Promising / Needs Work / Weak

## 4. Customer Objection Model (required, minimum 5 objections)

For each objection:

### Objection [#]: "[Objection in customer's voice]"
- Category (required): Price / Trust / Switching / Need / Timing
- Prevalence (required): Est. % of target market that would raise this
- Strength (required): 1-Easy / 2-Moderate / 3-Significant / 4-Deal-breaker
- Rebuttal strategy (required): How to address this objection (acknowledge, reframe, evidence, action)
- Unresolved risk (conditional): If the objection can't be fully rebutted, state what remains

## 5. Blind Spots (required, minimum 2)

### Blind Spot [#]: [Title]
- Description (required): What the user hasn't considered
- Why it matters (required): Potential impact on the idea
- Recommendation (required): What to do about it

Categories to check (at least 2 must be addressed):
- The "do nothing" competitor
- Adjacent player / platform threat
- Edge cases that break the model
- Unsexy dependencies

## 6. Verdict

### Overall Strength (required)
- Rating (required): Strong / Promising / Needs Work / Fundamental Concerns
- Rationale (required): 2-3 sentences grounding the rating

### Top 3 Strengths (required)
- What's genuinely strong about this idea, with evidence

### Top 3 Risks (required)
- The most dangerous weaknesses, with severity

### Recommended Actions (required, ordered by priority)
| Priority | Action | Purpose | Effort |
|----------|--------|---------|--------|
| 1 | [specific action] | [what it validates] | [time/cost estimate] |
| 2 | [specific action] | [what it validates] | [time/cost estimate] |
| 3 | [specific action] | [what it validates] | [time/cost estimate] |

### Kill Condition (required)
- Statement (required): "If [specific evidence] is found, abandon or fundamentally pivot this idea."
- How to test (required): What to measure and what threshold indicates failure
```

## Validation Rules

1. At least 5 assumptions decomposed from the idea
2. Top 3-5 assumptions challenged with specific counter-arguments (not generic)
3. All 4 value proposition tests applied with verdicts
4. At least 5 customer objections modeled in the customer's voice
5. Each objection has a strength rating (1-4 scale) and rebuttal
6. Blind spots section contains at least 2 items the user didn't raise
7. Verdict includes BOTH strengths and risks (not just criticism)
8. Every challenge includes a validation test with decision criteria
9. Kill condition is specific and testable
10. Tone is constructive throughout — every criticism has a path forward

## Confidence Tagging

- **High:** Challenge based on direct evidence — competitor data, market research, published case studies, customer behavior patterns
- **Medium:** Challenge based on analogies — similar products in other markets, general industry patterns, expert opinion
- **Low:** Challenge based on logic — theoretical risk, unverified concern, worst-case scenario

Avoid presenting Low-confidence challenges with the same certainty as High-confidence ones. Flag when a challenge is speculative.
