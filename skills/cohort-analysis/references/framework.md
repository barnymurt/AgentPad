# Framework: Cohort Analysis

This file provides detailed methodology for conducting cohort analysis.

## 1. Cohort Window Selection

### Daily Cohorts

**Best for:**
- Consumer apps with daily usage
- High-volume products (1000+ signups/day)
- Products with frequent engagement (daily is normal)

**Pros:**
- Maximum granularity
- Catches short-term trends
- Early signal of changes

**Cons:**
- High noise (random variation)
- Large data volume
- Cohort sizes may be small

**Minimum threshold:** 50 users per cohort

### Weekly Cohorts

**Best for:**
- Most SaaS products
- Moderate volume (100-1000 signups/week)
- Weekly usage patterns

**Pros:**
- Good balance of signal and noise
- Manageable number of cohorts
- Catches weekly patterns

**Cons:**
- May miss short-term trends
- Still some noise

**Minimum threshold:** 20 users per cohort

### Monthly Cohorts

**Best for:**
- B2B SaaS products
- Lower volume products (<100 signups/month)
- Products with monthly usage cycles

**Pros:**
- Clearest patterns
- Largest cohort sizes
- Easy to compare

**Cons:**
- May miss short-term trends
- Coarse granularity

**Minimum threshold:** 10 users per cohort

---

## 2. Cohort Type Deep Dive

### Acquisition Cohorts

Group users by when they signed up or first became active.

**Use when:**
- Tracking overall business health
- Understanding if acquisition quality is changing
- Comparing time periods

**Example:**
| Cohort | Users | Month 1 Retention | Month 3 Retention |
|--------|-------|-------------------|-------------------|
| Jan 2026 | 500 | 60% | 35% |
| Feb 2026 | 550 | 65% | 38% |
| Mar 2026 | 600 | 58% | N/A |

### Plan-Based Cohorts

Group users by their subscription tier or plan.

**Use when:**
- Analyzing impact of plan on behavior
- Understanding premium vs free user patterns
- Evaluating pricing strategy

**Example:**
| Plan | Users | Month 1 Retention | Month 3 Retention |
|------|-------|-------------------|-------------------|
| Free | 10,000 | 25% | 10% |
| Starter | 2,000 | 45% | 30% |
| Pro | 500 | 75% | 60% |
| Enterprise | 50 | 95% | 90% |

### Source-Based Cohorts

Group users by how they acquired (marketing channel, referral, organic).

**Use when:**
- Evaluating marketing channel quality
- Understanding acquisition efficiency
- Optimizing spend

**Example:**
| Source | Users | Month 1 Retention | CAC |
|--------|-------|-------------------|-----|
| Organic Search | 2,000 | 50% | $0 |
| Paid Social | 1,500 | 35% | $45 |
| Referral | 500 | 65% | $25 |
| Paid Search | 1,000 | 30% | $80 |

### Behavioral Cohorts

Group users by their first action or behavior.

**Use when:**
- Understanding onboarding effectiveness
- Identifying product-led growth signals
- Predicting future engagement

**Example:**
| First Action | Users | Week 1 Retention |
|--------------|-------|-----------------|
| Created Project | 1,000 | 70% |
| Invited Team | 500 | 80% |
| Used Template | 300 | 60% |
| Just Browsed | 2,000 | 20% |

---

## 3. Retention Metrics Explained

### Types of Retention

**Classic Retention:**
User is considered "retained" if they perform any activity in the period.

| Cohort | Month 0 | Month 1 | Month 2 |
|--------|---------|---------|---------|
| Jan | 100% | 50% | 35% |
| Feb | 100% | 55% | 38% |

**Expanded Retention:**
User is considered "retained" if they reach a minimum activity threshold.

| Cohort | Month 0 | Month 1 | Month 2 |
|--------|---------|---------|---------|
| Jan | 100% | 40% | 25% |
| Feb | 100% | 42% | 27% |

**Rolling Retention:**
User is considered "retained" if they've been active "in the last X days" — measures "ever retained" rather than "retained in specific period."

| Cohort | Day 7 | Day 14 | Day 30 |
|--------|-------|--------|--------|
| Jan | 55% | 45% | 40% |

### N-Day Retention

Specific point-in-time measurement:

- **Day 1 Retention:** Did they come back the next day?
- **Day 7 Retention:** Did they come back after a week?
- **Day 30 Retention:** Did they come back after a month?

These are leading indicators — strong Day 1 often predicts strong long-term retention.

---

## 4. Pattern Recognition Guide

### Classic Decay Pattern

**What it looks like:**
- Steep drop in period 0-1
- Continued decline but slowing
- Eventually flattens

**What it means:**
- Normal for most products
- Initial drop = users who didn't find value

**Action:**
- Focus on onboarding improvement
- Investigate what first-time users experience

### L-Shaped Pattern

**What it looks like:**
- Very high initial drop (60-80%)
- Flat after that

**What it means:**
- Significant product-market fit issues
- Only a small % find value immediately

**Action:**
- Major product re-evaluation
- Investigate core value proposition

### Smile Curve Pattern

**What it looks like:**
- Initial decline
- Recovery in later periods
- May exceed initial

**What it means:**
- Users leave, then return (seasonal? re-engagement?)
- Or: users who stick long-term become more engaged

**Action:**
- Understand why users return
- Leverage what's bringing them back

### Plateau Pattern

**What it looks like:**
- Initial drop
- Flattens at 20-30%

**What it means:**
- Product has found market
- Core users stick around

**Action:**
- Optimize for the 20-30%
- Consider upsell strategies

### Boomerang Pattern

**What it looks like:**
- Users appear to churn
- Then return in later periods

**What it means:**
- Seasonal usage patterns
- Win-back campaigns working

**Action:**
- Validate if these are real users
- Consider re-activation campaigns

---

## 5. Statistical Considerations

### Sample Size Guidelines

| Metric | Minimum for "Reliable" | Minimum for "Indicative" |
|--------|----------------------|------------------------|
| Cohort comparison | 100 per cohort | 30 per cohort |
| Trend analysis | 6+ cohorts | 3+ cohorts |
| Retention percentage | 50 users | 20 users |

### Confidence Intervals

When cohort sizes are small, calculate confidence intervals:

```
95% CI = p ± 1.96 * sqrt(p * (1-p) / n)

Where p = observed retention rate
      n = cohort size
```

**Example:**
- Observed: 50% retention (50/100)
- 95% CI: 40% - 60%

Report: "50% (±10%)"

### Normalization for Comparison

When comparing cohorts of different sizes:

1. **Percentage comparison:** Compare rates, not absolute numbers
2. **Index to baseline:** Express as index (e.g., "120% of baseline")
3. **Weighted analysis:** Weight by cohort size when calculating averages

---

## 6. Visualization Best Practices

### Cohort Retention Heatmap

Classic表格 showing retention by cohort over time:

| Cohort | Size | M0 | M1 | M2 | M3 | M4 |
|--------|------|----|----|----|----|---|
| Jan | 500 | 100% | 60% | 45% | 38% | 35% |
| Feb | 550 | 100% | 65% | 48% | 40% | - |
| Mar | 600 | 100% | 58% | 42% | - | - |

### Retention Curves

Line chart showing retention over time:
- X-axis: Time periods (days/weeks/months)
- Y-axis: Retention percentage
- Lines: Different cohorts (color-coded)

### Cohort Comparison Bar Chart

Compare specific periods across cohorts:
- X-axis: Cohort
- Y-axis: Retention at period N
- Grouped bars for multiple periods

---

## 7. Integration with Other Skills

### Inputs (Consults)

- **saas-metrics-analysis:** For baseline metrics and benchmarks
- **user-persona-creation:** For cohort segmentation by user type

### Outputs (Feeds)

- **product-strategy:** Cohort insights for product decisions
- **churn-reduction:** Identify at-risk cohorts for retention efforts
- **funnel-analysis:** Combine with funnel for full funnel view
- **ab-test-design:** Identify cohorts to target for experiments
