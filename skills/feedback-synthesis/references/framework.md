# Framework: Feedback Synthesis

This framework encodes the analytical methodology for synthesizing user feedback across multiple sources. It provides source reliability weighting, thematic analysis procedures, signal vs. noise filtering criteria, sentiment scoring, impact estimation, and contradiction resolution — all adapted for SaaS and digital products.

## Methodology Overview

Feedback synthesis applies structured thematic analysis to turn raw qualitative and quantitative user feedback into prioritized, actionable insights. The core insight: raw feedback is biased by who speaks loudest, which channels are easiest to use, and what users can articulate. This framework corrects for those biases by weighting sources, coding systematically, filtering signal from noise, and mapping findings to measurable product outcomes.

## Component 1: Source Reliability Weighting

Not all feedback sources carry the same evidentiary weight. Reliability depends on depth, directness, and representativeness.

### Reliability Tiers

| Tier | Sources | Weight Multiplier | Rationale |
|------|---------|-------------------|-----------|
| **Tier 1** | User interviews, usability tests, contextual inquiry, diary studies | 1.5x | Direct observation of behavior + stated reasoning. Highest signal-to-noise. Interviewer can probe, clarify, and observe what users do vs. what they say. |
| **Tier 2** | Surveys (structured), NPS with open comments, support tickets, churn exit surveys | 1.0x | Solicited, structured, but lack depth. Users self-report without probing. Good for frequency; weak on causation. |
| **Tier 3** | App store reviews, G2/Capterra reviews, in-app feedback widgets, feature request boards | 0.75x | Self-selected respondents (extremes of satisfaction). Useful for theme identification but overrepresent strong opinions. |
| **Tier 4** | Social media mentions, Reddit/community posts, secondhand reports (sales team says...), competitor comparison comments | 0.5x | Lowest reliability. Context is unknown, user segment unclear, motivations mixed. Treat as directional signals only. |

### How to Apply Weights

When quantifying theme strength, multiply the count of supporting feedback items by the source weight:

```
Weighted frequency = Σ (items_from_source × source_weight_multiplier)
```

Example: A theme supported by 5 interview mentions (5 × 1.5 = 7.5) + 10 review mentions (10 × 0.75 = 7.5) has a weighted frequency of 15.0. A theme with 20 review mentions (20 × 0.75 = 15.0) has the same weighted frequency — despite having more raw mentions. The interview-backed theme has equal standing because interviews are higher-reliability.

### Source Bias Adjustments

| Source Type | Known Bias | Adjustment |
|-------------|-----------|------------|
| App store reviews | Skew negative (frustrated users more likely to write) | Discount negative sentiment by 20% unless corroborated |
| NPS promoters (9-10) | Tend to be vague ("love it!") | Weight comments from detractors (0-6) 1.5x vs. promoters for theme extraction |
| Support tickets | Skew toward bugs and confusion, miss strategic needs | Supplement with interview or survey data for feature-level insights |
| Sales call notes | Filtered through sales rep interpretation | Treat as Tier 4 unless verbatim user quotes are available |
| In-app feedback | Captures in-the-moment frustration, misses big-picture | Good for UX and performance themes; weak for strategic direction |

## Component 2: Thematic Analysis Procedure

### Phase 1: Open Coding

Read each feedback item and assign 1-3 descriptive codes:

**Coding rules:**
1. Use the user's own language when it's specific (in-vivo coding). "Can't figure out how to add teammates" is better than "onboarding friction."
2. Each code should be 2-6 words.
3. One item can have multiple codes (e.g., a review that mentions slow performance AND confusing pricing gets both codes).
4. Separate codes for the *problem* and the *requested solution* — "search is broken" and "want better search" are different codes. The problem is the signal; the solution is the user's hypothesis (which may be wrong).

**Code taxonomy (starter set for SaaS):**

| Product Area | Example Codes |
|-------------|---------------|
| Onboarding | "confusing setup," "too many steps," "no guidance," "great first experience" |
| Core workflow | "saves time," "missing feature X," "workflow is clunky," "love the automation" |
| Performance | "slow load times," "app crashes," "mobile is laggy," "fast and reliable" |
| Integrations | "need Slack integration," "API is limited," "Zapier works great" |
| Pricing/billing | "too expensive," "pricing is confusing," "good value," "hidden fees" |
| UI/UX | "clean design," "hard to find things," "too many clicks," "intuitive" |
| Support | "slow response," "helpful support team," "documentation is lacking" |
| Reliability | "data loss," "sync issues," "downtime," "trust issues" |
| Admin/permissions | "can't manage team," "role confusion," "need SSO" |

### Phase 2: Axial Coding (Grouping)

Cluster open codes into candidate themes:

1. Group codes that describe the same underlying issue, need, or experience.
2. A theme needs codes from at least 2 different feedback items (preferably from different sources) to be considered valid.
3. Name the theme as a finding, not a label: "New users abandon onboarding at team setup step" not "Onboarding."
4. Preserve sub-themes when a theme has distinct facets: "Performance" might split into "Dashboard load time" and "Report generation timeout."

### Phase 3: Theme Validation

For each candidate theme, verify:

| Check | Criteria | Action if Failed |
|-------|----------|-----------------|
| Frequency | Supported by 3+ coded items | Merge with related theme or flag as emerging |
| Source diversity | Evidence from 2+ different source types | Flag as single-source theme (lower confidence) |
| User diversity | Mentioned by 2+ different users | Check for vocal minority; lower confidence |
| Coherence | All codes in the theme genuinely relate | Split into separate themes if forced grouping |
| Distinctness | Theme is meaningfully different from others | Merge overlapping themes |

## Component 3: Signal vs. Noise Filtering

### Signal Scoring Rubric

Score each theme on five dimensions (1-5 scale each). Total determines signal strength.

| Dimension | 1 (Weak) | 3 (Moderate) | 5 (Strong) |
|-----------|----------|--------------|------------|
| **Frequency** | Mentioned 1-2 times | Mentioned 5-10 times | Mentioned 15+ times |
| **Severity** | Minor inconvenience, workaround exists | Meaningful friction, impacts productivity | Blocker, causes churn or data loss |
| **Segment alignment** | From non-target users or unknown segment | From a mix of segments | From target/high-value segment |
| **Source reliability** | Only Tier 3-4 sources | Mix of Tier 2-3 sources | Tier 1-2 sources with corroboration |
| **Trend direction** | Declining or stable over time | Consistent mentions | Increasing over time (emerging problem) |

### Signal Strength Classification

| Total Score | Classification | Action |
|-------------|---------------|--------|
| 20-25 | **High signal** | Include in recommendations with high confidence |
| 13-19 | **Medium signal** | Include in recommendations; flag for validation |
| 7-12 | **Low signal** | Note in findings; do not recommend action yet |
| 5-6 | **Noise** | Exclude from recommendations; archive for future monitoring |

### Automatic Elevators (override low frequency)

Regardless of frequency score, elevate to at least Medium signal if:

- **Data loss or security concern** — any mention escalates (severity override)
- **Churned user feedback** — users who already left carry disproportionate signal
- **Compliance or legal risk** — even one mention requires action
- **Enterprise blocker** — if the product is pursuing enterprise, a single enterprise blocker is high signal

### Automatic Demoters (override high frequency)

Regardless of frequency, demote to Low signal if:

- **From non-target segment only** — frequent requests from users outside the ICP
- **Solution requests, not problem statements** — "add dark mode" without any underlying problem articulated
- **Already addressed** — feedback about issues that have been fixed (check recency)
- **Competitor comparison without context** — "Competitor X has feature Y" without explaining why it matters

## Component 4: Sentiment Analysis

### Sentiment Categories

| Category | Definition | Indicators |
|----------|-----------|------------|
| **Strong positive** | Enthusiastic advocacy, emotional attachment | "Love," "amazing," "game-changer," "can't live without," recommends to others |
| **Mild positive** | Satisfied, functional appreciation | "Works well," "good enough," "helpful," "does the job" |
| **Neutral** | Factual observation, no emotional valence | Feature descriptions, questions, objective statements |
| **Mild negative** | Frustrated but still engaged, fixable complaints | "Wish it could," "annoying," "would be nice if," "confusing" |
| **Strong negative** | Anger, considering alternatives, churn risk | "Terrible," "broken," "switching to," "waste of money," "unacceptable" |
| **Mixed** | Contains both positive and negative | "Love the product but [specific complaint]" — code both halves separately |

### Sentiment Analysis Rules

1. **Code the sentiment of each item, not the overall source.** A single survey response may contain positive sentiments about onboarding and negative sentiments about pricing. Code each independently.
2. **Watch for false positives.** Sarcasm, hedging ("it's fine, I guess"), and politeness bias ("it's okay" may mean "it's bad") should be tagged as uncertain and interpreted conservatively.
3. **Don't aggregate sentiment into a single score.** "60% positive, 40% negative" destroys the signal. Report sentiment distribution per theme, not overall.
4. **Sentiment trend matters more than snapshot.** A shift from positive to negative over time is more important than the absolute level.

## Component 5: Impact Estimation

### Impact Mapping Framework

For each High/Medium signal theme, estimate the product impact:

| Impact Level | Definition | SaaS Metric Indicators |
|-------------|-----------|----------------------|
| **Large** | Addressing this could create a step-change in a key metric | Churn reduction >2 points, activation improvement >15%, NPS increase >10 points, expansion revenue >20% |
| **Medium** | Measurable improvement expected but not transformative | Churn reduction 0.5-2 points, activation improvement 5-15%, NPS increase 3-10 points, support ticket reduction >30% |
| **Small** | Incremental improvement, quality-of-life enhancement | Minor UX improvement, slight satisfaction increase, <5% metric movement |

### SaaS Metric Mapping

| Theme Type | Primary Metric | Secondary Metrics |
|-----------|---------------|-------------------|
| Onboarding friction | Activation rate | Time-to-value, trial-to-paid conversion |
| Core workflow complaints | Retention / churn | DAU/MAU, feature adoption |
| Performance issues | Retention / NPS | Support ticket volume, session duration |
| Missing integrations | Expansion revenue | Churn (if integration is a dealbreaker) |
| Pricing complaints | Conversion rate | Churn, expansion revenue |
| Reliability concerns | Churn | NPS, trust, enterprise readiness |
| Admin/permissions gaps | Enterprise conversion | Seat expansion, admin satisfaction |

## Component 6: Contradiction Resolution

When feedback contradicts across users or segments:

### Contradiction Decision Tree

```
Feedback on topic X is contradictory
├── Are the contradicting users from DIFFERENT segments?
│   ├── YES → Segment-based split. Report both views with segment labels.
│   │         Recommendation: different approaches per segment (or pick
│   │         the segment that matters more to current strategy)
│   └── NO → Same segment, different opinions
│            ├── Is the split roughly even (40-60)?
│            │   ├── YES → Genuine preference diversity. Recommend making
│            │   │         the feature configurable or conducting deeper
│            │   │         research to understand the split.
│            │   └── NO → Majority opinion is likely the signal.
│            │            Flag the minority view but prioritize majority.
│            └── Is one side based on higher-reliability sources?
│                ├── YES → Weight toward the higher-reliability side.
│                └── NO → Inconclusive. Flag for targeted follow-up research.
```

### Common Contradiction Patterns in SaaS

| Pattern | Explanation | Resolution |
|---------|------------|------------|
| "Too simple" vs. "Too complex" | Power users vs. new users | Segment-based: progressive disclosure, advanced mode |
| "Need more features" vs. "Love the simplicity" | Feature-seekers vs. simplicity-lovers | Protect core simplicity; add features as opt-in |
| "Too expensive" vs. "Great value" | Non-converting prospects vs. active users | Pricing is likely correct for ICP; address messaging for prospects |
| "Mobile is critical" vs. "Desktop only" | Different workflow contexts | Validate with usage data (actual mobile vs. desktop sessions) |

## Edge Cases

- **Single-source feedback:** If all feedback comes from one source (e.g., only support tickets), flag the analysis as having low source diversity. Recommend collecting feedback from at least one additional source type before making major product decisions.
- **Very small sample size (<10 items):** Apply the framework but tag all findings as Low confidence. Note that themes from small samples are hypotheses, not conclusions.
- **Extremely large dataset (500+ items):** Sample strategically — analyze all Tier 1 sources in full, then sample 30% from each lower tier. Verify that sampled themes appear in the unsampled remainder.
- **Feedback in multiple languages:** Code in the original language where possible. Note any translation-related uncertainty in confidence tags.
- **Feedback about competitors, not the product:** Separate into a distinct "competitive context" theme. Useful for positioning but not for direct product action.
- **Feedback from internal stakeholders (not users):** Classify as Tier 4. Internal opinions about what users want are hypotheses, not evidence.

## Sources and Rationale

- **Thematic analysis:** Based on Braun & Clarke's reflexive thematic analysis approach, adapted from academic research to applied product contexts. The six-phase model (familiarization, coding, theme generation, review, definition, reporting) is compressed into the four-phase workflow above for practitioner efficiency.
- **Source reliability weighting:** Inspired by evidence hierarchies in systematic reviews, adapted for UX research. Direct observation outranks self-report; structured methods outrank unstructured.
- **Signal vs. noise filtering:** Combines frequency analysis with severity weighting, drawn from customer success methodologies and support ticket triage frameworks.
- **Impact mapping:** Based on the Jobs-to-be-Done outcome mapping approach, connecting user needs to measurable business metrics specific to SaaS economics (MRR, churn, expansion, NPS).
