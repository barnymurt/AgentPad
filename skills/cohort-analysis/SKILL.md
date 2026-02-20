---
name: cohort-analysis
description: Analyze user behavior over time by grouping users into cohorts based on acquisition date or characteristics. Use when the user needs to understand "how users behave over time," "retention analysis," "user engagement patterns," "cohort comparison," or "track user lifecycle." Groups users by signup date, plan, or source and tracks key metrics over time to identify trends and patterns.
---

# Cohort Analysis

Analyze user behavior by grouping users into meaningful cohorts and tracking their behavior over time. Unlike simple aggregation that hides time-based patterns, cohort analysis reveals how user acquisition timing, source, or plan affects engagement, retention, and revenue.

**Note**: This skill requires user data with timestamps. See Step 1.

## Core Workflow

### Step 1: Validate and Prepare Data

**Data Requirements - Critical:**

This skill requires user data with timestamps. Before proceeding:

**Required Data Fields:**
- User identifier
- Acquisition/signup date (or first activity date)
- Activity/event timestamps

**Optional but Recommended:**
- Plan/tier information
- Acquisition source (organic, paid, referral)
- Revenue data (for paid cohorts)

**If Data is Insufficient:**
- Request at minimum 30 days of user data
- Flag if user count < 100 (cohorts will have limited statistical power)
- Note: Cohort analysis requires historical data - cannot work with current-state-only data

### Step 2: Define Cohort Grouping

**Choose the Right Cohort Window:**

| Window | Best For | Considerations |
|--------|----------|----------------|
| **Daily** | High-volume consumer apps, B2C with daily usage | High granularity, more noise, larger data volume |
| **Weekly** | Most SaaS products, moderate volume | Good balance of signal and noise |
| **Monthly** | B2B SaaS, lower volume products | Clearest patterns, may miss short-term trends |

**Choose Cohort Type:**

| Type | Grouping Criteria | Best Answer |
|------|-------------------|-------------|
| **Acquisition** | Signup/first activity date | "When did users start?" |
| **Plan-based** | Subscription tier | "Do higher tiers retain better?" |
| **Source-based** | Acquisition channel | "Which channels have best retention?" |
| **Behavioral** | First action taken | "Does initial action predict future engagement?" |

**Decision Framework:**
1. Start with acquisition cohorts (default, most common)
2. Add plan-based if subscription tiers exist
3. Add source-based if acquisition data available
4. Avoid creating more than 3 cohort types initially

### Step 3: Calculate Retention Curves

**Retention vs Engagement - Critical Distinction:**

These are different metrics that answer different questions:

**Retention:** "Is the user still a customer/active?"
- Binary: Has user logged in/used product?
- Timeframe: Typically measured monthly
- Question: "What % of users who signed up in Jan are still active in March?"

**Engagement:** "How much is the user using the product?"
- Continuous: Number of sessions, actions, time spent
- Timeframe: Measured daily/weekly
- Question: "How many sessions do users have per week?"

**Do NOT Confuse Them:**
- High engagement from small user base ≠ healthy retention
- Users who retained but barely engage are "zombies"

### Step 4: Identify Engagement Patterns

**Key Metrics to Track:**

| Metric | Calculation | What It Tells You |
|--------|-------------|-------------------|
| **Retention Rate** | Active users at period N / Original cohort size | Are users still customers? |
| **Engagement Rate** | Active users / Total users in period | How active is the cohort? |
| **N-Day Retention** | Users active on day N / Original cohort | Early engagement |
| **Churn Rate** | Users no longer active / Original cohort | Velocity of loss |

**Pattern Recognition:**

| Pattern | Description | Action Needed |
|---------|-------------|---------------|
| **Classic Decay** | Steep initial drop, then flattens | Investigate onboarding |
| **L-Shaped** | Very low after day 1, flat | Product-market fit issue |
| **Smile Curve** | Decline then recovery | Re-engagement working |
| **Plateau** | Stable long-term | Healthy product |
| **Boomerang** | Churn then return | Win-back working |

### Step 5: Handle Small Cohort Sizes

**Minimum Sample Sizes:**

| Cohort Window | Minimum Users per Cohort | Below This? |
|---------------|-------------------------|-------------|
| Daily | 50 users | Aggregate to weekly |
| Weekly | 20 users | Aggregate to monthly |
| Monthly | 10 users | Flag as low confidence |

**When Cohort Sizes are Small:**

1. **Aggregate time windows:** Combine daily → weekly → monthly
2. **Extend lookback period:** More data = larger cohorts
3. **Use rolling windows:** Instead of calendar months, use "last 30 days"
4. **Add confidence intervals:** Show statistical uncertainty
5. **Flag findings:** Mark small-cohort insights as "indicative only"

**Warning:** Never compare cohorts of vastly different sizes without normalization.

### Step 6: Generate Insights and Recommendations

**Insight Categories:**

1. **Acquisition Quality:** Are newer cohorts performing differently?
2. **Seasonality:** Do cohorts acquired in certain periods perform better?
3. **Channel Quality:** Which sources produce the best-retaining users?
4. **Plan Health:** Are premium users retaining better?

**Recommendation Structure:**
- Observation: What the data shows
- Implication: Why it matters
- Action: What to do about it
- Priority: High/Medium/Low based on impact

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — Key findings and recommendations
- **Cohort Definition** — Window, type, and rationale
- **Retention Curves** — Visual representation of retention over time
- **Pattern Analysis** — Identified patterns with interpretation
- **Segment Comparison** — How different cohorts perform
- **Recommendations** — Prioritized actions with expected impact

Expected length: 1,000-2,000 words

## Quality Criteria

- [ ] Data requirements validated (timestamps, minimum volume)
- [ ] Cohort window justified (daily/weekly/monthly)
- [ ] Cohort type defined and rationalized
- [ ] Retention vs engagement clearly distinguished
- [ ] Small cohort sizes flagged with confidence warnings
- [ ] At least 3 cohort segments analyzed
- [ ] Patterns identified with interpretation
- [ ] Recommendations prioritized by impact
- [ ] Visualization of retention curves included
- [ ] Confidence levels applied to findings

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS product):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Wrong cohort window:** Using daily for B2B (too noisy) or monthly for consumer apps (too coarse). Match window to product usage frequency.

2. **Confusing retention with engagement:** "Users who retained" doesn't mean "users who are engaged." Track both.

3. **Ignoring cohort size:** Drawing conclusions from 5-user cohorts. Always check sample sizes.

4. **Comparing incompatible cohorts:** Comparing Jan cohort (12 months of data) with Dec cohort (1 month of data). Use same age for comparison.

5. **Cherry-picking timeframes:** Selecting ranges that show favorable results. Show full picture.

6. **No baseline:** Not establishing what "good" looks like. Compare to industry benchmarks or historical performance.

7. **Analysis paralysis:** Creating too many cohort types initially. Start simple, add complexity as needed.

8. **Missing the "why":** Not investigating root causes. Retention curves show "what" — need additional analysis for "why."
