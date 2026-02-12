# Framework: Feature Prioritization

This framework provides four scoring methodologies for feature prioritization, each suited to different contexts. All are adapted for SaaS and digital products with specific scoring guidance for subscription-business metrics.

## Methodology Overview

Feature prioritization replaces subjective "I think we should build X" with structured multi-criteria scoring. The key insight is that prioritization is not about finding the "best" feature — it's about making trade-offs explicit so the team can make informed decisions. Different frameworks suit different contexts; the right choice depends on data availability, team stage, and decision complexity.

## Framework 1: RICE

**Best for:** Growth-stage SaaS with usage data. Provides the most rigorous quantitative scoring.

**Formula:** RICE Score = (Reach x Impact x Confidence) / Effort

### Scoring Rubrics

#### Reach (how many users/customers affected in a defined time period)

| Score | Criteria (per quarter) |
|-------|----------------------|
| 1 | <100 users or <5% of active users |
| 2 | 100-500 users or 5-15% of active users |
| 3 | 500-2,000 users or 15-40% of active users |
| 4 | 2,000-10,000 users or 40-70% of active users |
| 5 | >10,000 users or >70% of active users |

For pre-launch products, estimate based on target user base and expected adoption. Tag as Low confidence.

#### Impact (how much it moves the needle per user)

| Score | Criteria |
|-------|----------|
| 0.5 | Minimal — nice to have, no behavior change expected |
| 1 | Low — slight improvement to existing workflow |
| 2 | Medium — meaningful improvement, some users cite it as a reason to stay/upgrade |
| 3 | High — significant improvement, directly drives conversion, retention, or expansion revenue |
| 5 | Massive — transformative, creates a new capability or removes a critical blocker |

**SaaS impact indicators:**
- Reduces churn → Impact 3+
- Drives upgrade from free to paid → Impact 3+
- Enables a new pricing tier → Impact 5
- Quality-of-life improvement → Impact 1-2
- Table stakes feature (competitors have it) → Impact 2-3

#### Confidence (how sure are we about reach and impact estimates?)

| Score | Criteria |
|-------|----------|
| 0.5 | Gut feeling — no data, no customer validation |
| 0.8 | Some signal — a few customer requests, indirect data |
| 1.0 | Strong signal — multiple customer requests, usage data supports it, or validated through research |

#### Effort (person-months to build, including design, dev, and QA)

| Score | Criteria |
|-------|----------|
| 0.5 | Trivial — <1 week, config change or minor tweak |
| 1 | Small — 1-2 weeks, single developer |
| 2 | Medium — 2-4 weeks, 1-2 developers |
| 3 | Large — 1-2 months, small team |
| 5 | Massive — 3+ months, cross-team coordination |

### RICE Calculation

```
RICE = (Reach × Impact × Confidence) / Effort
```

Higher score = higher priority. The division by Effort means low-effort features get a natural boost.

## Framework 2: ICE

**Best for:** Early-stage startups with limited data. Fast, lightweight, good for quick decisions.

**Formula:** ICE Score = (Impact + Confidence + Ease) / 3

### Scoring Rubrics (all 1-10 scale)

#### Impact
| Score Range | Criteria |
|-------------|----------|
| 1-3 | Low impact — incremental improvement, no behavior change |
| 4-6 | Medium impact — meaningful improvement for a segment of users |
| 7-9 | High impact — significant business metric improvement (conversion, retention, revenue) |
| 10 | Transformative — unlocks a new market or capability |

#### Confidence
| Score Range | Criteria |
|-------------|----------|
| 1-3 | Assumption-based — no data, no validation |
| 4-6 | Some evidence — customer feedback, competitor analysis, early signals |
| 7-9 | Strong evidence — user research, analytics data, prototype testing |
| 10 | Validated — tested in production, A/B test results, committed customer demand |

#### Ease (inverse of effort)
| Score Range | Criteria |
|-------------|----------|
| 1-3 | Hard — months of work, complex dependencies, new infrastructure |
| 4-6 | Moderate — weeks of work, manageable complexity |
| 7-9 | Easy — days of work, well-understood implementation |
| 10 | Trivial — hours of work, config change or minor update |

## Framework 3: Weighted Scoring

**Best for:** Complex decisions with multiple stakeholders or custom business-specific criteria.

### Default Dimensions for SaaS

| Dimension | Default Weight | Description |
|-----------|---------------|-------------|
| Revenue impact | 25% | Will this directly increase MRR/ARR? |
| User value | 25% | How much does this improve the user experience? |
| Strategic alignment | 20% | Does this support the company's stated direction? |
| Effort (inverse) | 15% | How much does it cost to build? (lower effort = higher score) |
| Competitive necessity | 15% | Do competitors have this? Will we lose deals without it? |

Users can add, remove, or re-weight dimensions. The total must equal 100%.

### Scoring (1-5 per dimension)

Each dimension uses a 1-5 scale. Multiply each score by its weight, sum for total.

```
Weighted Score = Σ (dimension_score × dimension_weight)
```

### Custom Dimensions (suggest when relevant)

| Business Context | Suggested Dimension |
|-----------------|-------------------|
| High churn rate | "Churn reduction potential" |
| Fundraising soon | "Demo-ability / investor appeal" |
| Platform play | "Ecosystem / integration value" |
| Entering new market | "New segment unlock" |
| Technical debt concerns | "Architecture improvement" |

## Framework 4: 2x2 Matrix (Effort vs. Impact)

**Best for:** Quick gut-check, team alignment workshops, informal decisions.

### Quadrants

```
                    HIGH IMPACT
                        |
    Quick Wins     |    Big Bets
    (Do first)     |    (Plan carefully)
                        |
 ───────────────────────┼───────────────────
                        |
    Fill-ins       |    Money Pits
    (Do if spare   |    (Avoid or
     capacity)     |     redesign)
                        |
                    LOW IMPACT
    LOW EFFORT ─────────────── HIGH EFFORT
```

Score effort and impact each 1-5 and plot. No formula — the quadrant placement is the output. Useful as a first pass before applying a more rigorous framework.

## Framework Selection Decision Tree

```
Do you have usage data (analytics, customer metrics)?
├── YES → Do you need stakeholder alignment on criteria?
│         ├── YES → Weighted Scoring
│         └── NO → RICE
└── NO → Do you need a quick decision or a rigorous one?
          ├── Quick → ICE or 2x2 Matrix
          └── Rigorous → ICE (with a note to revisit with RICE when data is available)
```

## SaaS-Specific Scoring Adjustments

When prioritizing for SaaS products, apply these modifiers to any framework:

| Feature Type | Scoring Adjustment |
|-------------|-------------------|
| Reduces churn | +1 to Impact (churn is the silent killer in SaaS) |
| Drives free→paid conversion | +1 to Impact (directly affects unit economics) |
| Enables per-seat expansion | +1 to Reach (more seats = more revenue per account) |
| Table stakes (competitors all have it) | Set Confidence to 1.0/10 (validated need, not optional) |
| "Cool but unasked for" | Set Confidence to 0.5/3 (until validated) |
| Requires infrastructure change | +1 to Effort (hidden complexity in SaaS — migration, backward compatibility) |

## Edge Cases

- **All features score similarly:** The framework isn't differentiating. Add a custom dimension specific to the business context, or increase weight on the dimension that matters most to the user right now.
- **One feature dominates all others:** Sanity-check the scoring. Is it genuinely that important, or is the scorer biased? Try scoring it from the perspective of a skeptical customer.
- **Feature has uncertain scope:** Score the MVP version, not the full vision. If scope changes the score significantly, note both versions.
- **Stakeholders disagree on scores:** Use Weighted Scoring with each stakeholder scoring independently, then average. Discuss only the dimensions where scores diverge by more than 2 points.

## Sources and Rationale

- **RICE:** Originated at Intercom, widely adopted in product management. Well-suited for SaaS because Reach maps to user segments and Effort maps to sprint planning.
- **ICE:** Popularized by Sean Ellis (GrowthHackers). Lighter than RICE, better for teams without data infrastructure.
- **Weighted Scoring:** Standard multi-criteria decision analysis (MCDA). Adapted here with SaaS-specific default dimensions.
- **2x2 Matrix:** Classic consulting framework (BCG, McKinsey variants). Useful for alignment, not for precision.
