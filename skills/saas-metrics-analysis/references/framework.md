# Framework: SaaS Metrics Analysis

This framework provides the diagnostic methodology, scoring rubrics, benchmark tables, metric relationship maps, and decision trees for analyzing SaaS business health.

## Methodology Overview

SaaS metrics analysis is not reporting — it is diagnosis. Reporting tells you what happened; diagnosis tells you why and what to do about it. This framework treats metrics as symptoms in a connected system: a lagging indicator (like churn) is the visible symptom of an upstream leading indicator (like activation rate or time-to-value). The goal is to trace symptoms to root causes, benchmark against the correct peer set, and produce actions that fix the root cause rather than the symptom.

## Critical Metrics Minimum Set

Before analysis can proceed, these metrics must be available or estimated:

| Metric | Why Critical | Estimate If Missing |
|--------|-------------|---------------------|
| MRR (or ARR) | Baseline revenue health | Cannot estimate — must be provided |
| Monthly churn rate (customer or revenue) | Retention health | Use stage/segment benchmark |
| Number of active customers | Denominator for per-customer metrics | Cannot estimate — must be provided |
| ARPU | Revenue efficiency | MRR / active customers |
| CAC | Growth efficiency | Estimate from marketing spend / new customers |
| Monthly new customers | Growth rate | Cannot estimate — must be provided |
| Activation rate | Onboarding health | Estimate at 20-40% if unknown [L] |
| Net Revenue Retention (NRR) | Expansion vs. contraction | Estimate at 90-100% for early SMB [L] |

If 3+ metrics from this set are missing and cannot be estimated, the analysis shifts to a "gap identification" mode: identify what the user needs to measure before a meaningful diagnosis is possible.

## AARRR Funnel Framework (Pirate Metrics)

Classify every metric into one of five funnel stages:

### Acquisition
How users find the product.

| Metric | Definition | Healthy Range (Early Stage) |
|--------|-----------|---------------------------|
| Website visitors | Unique monthly visitors | Trending up month-over-month |
| Signup rate | Visitors → free trial/signup | 2-5% for B2B SaaS |
| CAC | Cost to acquire one paying customer | <1/3 of LTV |
| Channel mix | % from organic, paid, referral | No single channel >60% |
| Trial starts | New trials per month | Sufficient to hit growth targets |

### Activation
How users experience the "aha moment."

| Metric | Definition | Healthy Range |
|--------|-----------|--------------|
| Activation rate | % of signups who reach value milestone | 20-40% (early), 40-60% (growth) |
| Time-to-value | Days from signup to first value event | <1 day (self-serve), <7 days (assisted) |
| Onboarding completion | % completing onboarding flow | >60% |
| Feature adoption (core) | % using the primary feature in first 7 days | >50% |
| Day 1 retention | % returning day after signup | >40% |

### Retention
How users continue to get value.

| Metric | Definition | Healthy Range |
|--------|-----------|--------------|
| Monthly customer churn | % customers lost per month | 3-7% (SMB), 1-2% (mid-market), <1% (enterprise) |
| Monthly revenue churn | % MRR lost per month | 1-3% (SMB), <1% (mid-market/enterprise) |
| Net revenue retention | (Start MRR + expansion - contraction - churn) / Start MRR | >100% (good), >110% (strong), >130% (best-in-class) |
| DAU/MAU ratio | Daily active / monthly active | 15-25% (B2B SaaS) |
| Feature stickiness | % users engaging core feature weekly | >60% |

### Revenue
How users pay and expand.

| Metric | Definition | Healthy Range |
|--------|-----------|--------------|
| MRR | Monthly recurring revenue | Growing month-over-month |
| ARR | Annual recurring revenue (MRR × 12) | Stage-dependent |
| ARPU | Average revenue per user per month | Stable or growing |
| LTV | Lifetime value per customer | >3× CAC |
| LTV:CAC ratio | Return on acquisition investment | 3:1–5:1 (healthy) |
| Payback period | Months to recover CAC | <12 (SMB), <18 (mid-market) |
| Gross margin | (Revenue - COGS) / Revenue | >70% for SaaS |
| Expansion revenue % | % of new MRR from existing customers | >30% at growth stage |

### Referral
How users bring other users.

| Metric | Definition | Healthy Range |
|--------|-----------|--------------|
| NPS | Net Promoter Score | >30 (good), >50 (excellent) |
| Viral coefficient | Invites per user × conversion rate | >0.3 for organic, >1.0 for viral |
| Referral revenue % | % of new customers from referrals | >15% |
| Review/rating volume | Public reviews on G2, Capterra, etc. | Growing quarter-over-quarter |

## SaaS Health Scorecard

### Scoring Rubric

Score each metric Green / Yellow / Red based on the user's company stage:

**Stage Definitions:**
- **Pre-revenue / MVP:** <$1K MRR, <50 customers, <6 months since launch
- **Early stage:** $1K–$50K MRR, 50–500 customers, product-market fit being validated
- **Growth stage:** $50K–$500K MRR, 500–5,000 customers, scaling go-to-market
- **Scale:** >$500K MRR, >5,000 customers, optimizing efficiency

### Monthly Customer Churn

| Stage | Green | Yellow | Red |
|-------|-------|--------|-----|
| Pre-revenue | <8% | 8-12% | >12% |
| Early (SMB) | <5% | 5-8% | >8% |
| Early (mid-market) | <3% | 3-5% | >5% |
| Growth (SMB) | <4% | 4-6% | >6% |
| Growth (mid-market) | <2% | 2-3% | >3% |
| Scale | <2% | 2-4% | >4% |

### LTV:CAC Ratio

| Stage | Green | Yellow | Red |
|-------|-------|--------|-----|
| Pre-revenue | >2:1 | 1:1–2:1 | <1:1 |
| Early | >3:1 | 2:1–3:1 | <2:1 |
| Growth | >3:1 | 2:1–3:1 | <2:1 |
| Scale | >4:1 | 3:1–4:1 | <3:1 |

Note: LTV:CAC >8:1 at growth/scale stages is Yellow — it signals under-investment in growth.

### Net Revenue Retention

| Stage | Green | Yellow | Red |
|-------|-------|--------|-----|
| Pre-revenue | N/A | N/A | N/A |
| Early | >95% | 85-95% | <85% |
| Growth | >110% | 100-110% | <100% |
| Scale | >120% | 110-120% | <110% |

### MRR Growth Rate (Month-over-Month)

| Stage | Green | Yellow | Red |
|-------|-------|--------|-----|
| Pre-revenue | >20% | 10-20% | <10% |
| Early | >15% | 8-15% | <8% |
| Growth | >10% | 5-10% | <5% |
| Scale | >5% | 2-5% | <2% |

### Gross Margin

| Stage | Green | Yellow | Red |
|-------|-------|--------|-----|
| All stages (standard SaaS) | >75% | 60-75% | <60% |
| AI-heavy SaaS | >65% | 50-65% | <50% |

### Payback Period

| Stage | Green | Yellow | Red |
|-------|-------|--------|-----|
| Early (SMB) | <8 mo | 8-14 mo | >14 mo |
| Early (mid-market) | <14 mo | 14-20 mo | >20 mo |
| Growth (SMB) | <6 mo | 6-12 mo | >12 mo |
| Growth (enterprise) | <18 mo | 18-24 mo | >24 mo |

### Composite Health Score

Weight metrics by stage to compute an overall score:

| Metric | Pre-Revenue Weight | Early Weight | Growth Weight | Scale Weight |
|--------|-------------------|-------------|--------------|-------------|
| Monthly churn | 15% | 25% | 20% | 20% |
| LTV:CAC | 10% | 20% | 20% | 15% |
| NRR | 0% | 10% | 20% | 25% |
| MRR growth rate | 25% | 20% | 15% | 10% |
| Gross margin | 10% | 10% | 10% | 15% |
| Payback period | 5% | 10% | 10% | 10% |
| Activation rate | 35% | 5% | 5% | 5% |

Assign: Green = 3 points, Yellow = 2 points, Red = 1 point. Weighted composite:
- **2.5–3.0:** Healthy — maintain and optimize
- **2.0–2.4:** Watch — address Yellow/Red areas proactively
- **1.5–1.9:** Concerning — structural issues need immediate attention
- **1.0–1.4:** Critical — business sustainability at risk

## Metric Relationship Map

Use these causal chains to trace symptoms to root causes. Walk upstream from lagging indicators to leading indicators.

### Chain 1: Churn → Activation → Onboarding
```
High monthly churn
  ← Low weekly active usage (users not getting ongoing value)
    ← Low activation rate (users never reached "aha moment")
      ← Poor onboarding completion
        ← Complex or unclear onboarding flow
        ← No guided first-run experience
        ← Mismatched expectations from marketing
```

### Chain 2: Low MRR Growth → Acquisition + Churn
```
Stagnant MRR growth
  ← Net new MRR near zero
    ← New MRR ≈ Churned MRR (leaky bucket)
      Branch A: Low new MRR
        ← Low customer acquisition
          ← Low traffic / low conversion / high CAC
      Branch B: High churned MRR
        ← High churn rate (see Chain 1)
        ← Losing high-value customers disproportionately
```

### Chain 3: Poor Unit Economics → Pricing/Cost Structure
```
LTV:CAC < 3:1
  Branch A: LTV too low
    ← Low ARPU (underpriced)
    ← High churn (short customer lifespan)
    ← Low gross margin (high COGS eating into value)
  Branch B: CAC too high
    ← Expensive acquisition channels
    ← Low conversion rate (spend is high, yield is low)
    ← Long sales cycle (high touch-cost per deal)
```

### Chain 4: Declining NRR → Contraction/No Expansion
```
NRR < 100%
  ← Expansion revenue not offsetting churn
    Branch A: No expansion revenue
      ← No upsell path in product
      ← Pricing not usage- or seat-based
      ← Customers not growing in their usage
    Branch B: Revenue contraction
      ← Customers downgrading plans
      ← Seat count shrinking (customer layoffs)
      ← Discount-driven acquisition (discounts expire, customers leave)
```

### Chain 5: High CAC → Channel/Conversion Problems
```
CAC exceeding benchmarks
  ← Low channel efficiency
    ← Paid acquisition costs rising (auction competition)
    ← Content/SEO not producing pipeline
    ← Sales cycle too long (high touch-cost)
  ← Low conversion rate
    ← Weak landing pages or messaging
    ← Product-market fit issues (wrong audience being targeted)
    ← Trial-to-paid friction (no payment nudge, unclear value prop)
```

## Decision Trees

### Selecting Diagnostic Priority

```
IF composite health score < 1.5 THEN
  → Focus on the single Red metric with highest stage weight — this is existential
ELSE IF any revenue metric is Red (MRR growth, NRR, gross margin) THEN
  → Prioritize revenue diagnosis — revenue problems compound fastest
ELSE IF churn is Red or Yellow AND activation is Red or Yellow THEN
  → Prioritize activation diagnosis — fixing activation is the highest-leverage churn fix
ELSE IF LTV:CAC is Yellow or Red THEN
  → Determine whether the problem is LTV-side or CAC-side and prioritize accordingly
ELSE
  → Focus on the highest-weight Yellow metric for the company's stage
```

### Selecting Recommendation Type

```
IF root cause is a leading indicator the user can control (e.g., onboarding flow) THEN
  → Recommend a product/process change with expected metric impact
ELSE IF root cause is structural (e.g., market segment has inherently high churn) THEN
  → Recommend a strategic pivot (move upmarket, change pricing model, add expansion levers)
ELSE IF root cause is data quality (not enough data to diagnose) THEN
  → Recommend instrumentation: what to measure, how, and review in 30-60 days
```

## Action Prioritization Matrix

Rate each potential action on two dimensions:

| | Low Effort (1-2 weeks) | Medium Effort (1-2 months) | High Effort (3+ months) |
|---|---|---|---|
| **High Impact (>20% metric improvement)** | **Quick Win — do first** | **Strategic — plan and execute** | **Major initiative — validate first** |
| **Medium Impact (10-20%)** | **Easy win — do soon** | **Evaluate ROI** | **Deprioritize unless blocking** |
| **Low Impact (<10%)** | **Only if trivial** | **Skip** | **Skip** |

## Cohort Analysis Methodology

When cohort data is available:

1. **Define cohorts** by signup month (or activation month if available).
2. **Plot retention curves** for each cohort — % retained at month 1, 2, 3, ..., N.
3. **Compare curves.** Look for:
   - **Improving cohorts:** Newer cohorts retain better → product improvements working
   - **Degrading cohorts:** Newer cohorts retain worse → product-market fit eroding or lower-quality acquisition
   - **Flattening point:** Month at which the curve stabilizes → this is your "natural retention floor"
4. **Calculate cohort-level LTV** to see if customer quality is improving or declining over time.
5. **Segment by acquisition channel** if possible — different channels often produce different retention profiles.

## Edge Cases

- **Pre-revenue / very early stage:** Most metrics are unavailable. Shift focus to activation metrics (signups, activation rate, time-to-value) and qualitative signals (user feedback, NPS). Score only available metrics; for others, define what to measure first.

- **Usage-based pricing:** ARPU varies month-to-month per customer. Use trailing 3-month average ARPU and flag volatility. Revenue churn is more meaningful than customer churn in this model.

- **Freemium model:** Separate free-tier metrics from paid-tier metrics entirely. Free-tier churn is irrelevant to revenue health. Analyze the free→paid conversion funnel as its own micro-AARRR.

- **Marketplace / two-sided:** Analyze supply-side and demand-side metrics separately. A healthy demand side with declining supply side (or vice versa) produces misleading aggregate metrics.

- **Seasonal business:** Compare metrics year-over-year rather than month-over-month to avoid false alarms. Flag seasonality explicitly so it is not confused with structural trends.

- **Single large customer dominance:** If one customer is >20% of MRR, flag concentration risk. That customer's behavior dominates aggregate metrics and masks the health of the rest of the base. Analyze with and without the dominant customer.

- **Negative churn (NRR > 100%):** This is healthy but can mask customer count churn. A business losing 10% of customers monthly but expanding remaining accounts enough to offset is still fragile — any expansion slowdown triggers rapid MRR decline. Always report both customer churn and revenue churn.

## Sources and Rationale

- **AARRR framework:** Dave McClure's Pirate Metrics, adapted for B2B SaaS with segment-specific benchmarks
- **Health scorecard methodology:** Synthesized from SaaS Capital Index, OpenView SaaS Benchmarks, Bessemer Cloud Index, and KeyBanc SaaS Survey
- **Churn benchmarks:** Recurly Research, ProfitWell/Paddle benchmarks, Baremetrics Open Startups data
- **NRR and expansion benchmarks:** Bessemer Cloud Index, SaaStr annual survey data
- **Metric relationship mapping:** Based on Reforge growth frameworks and Brian Balfour's growth system model
- **Cohort methodology:** Standard product analytics practice per Amplitude and Mixpanel documentation
