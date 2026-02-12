# Framework: Business Case Modeling

This framework provides the financial formulas, benchmark ranges, and modeling methodology for SaaS and digital product business case analysis.

## Methodology Overview

SaaS business case modeling is not traditional financial forecasting — it's driver-based modeling. Instead of projecting revenue directly, you model the drivers (acquisition rate, churn, expansion) and let the math produce the revenue number. This makes assumptions explicit and testable, which is the entire point: a business case is only as good as its assumptions.

## Core SaaS Financial Formulas

### Revenue Metrics

**Monthly Recurring Revenue (MRR):**
```
MRR = Σ (active_customers × their_monthly_price)

Net New MRR = New MRR + Expansion MRR - Churned MRR

New MRR = new_customers_this_month × ARPU
Expansion MRR = existing_customers × expansion_rate × ARPU
Churned MRR = existing_customers × churn_rate × ARPU
```

**Annual Recurring Revenue (ARR):**
```
ARR = MRR × 12
```

**Average Revenue Per User (ARPU):**
```
ARPU = MRR / active_customers
```

**Net Revenue Retention (NRR):**
```
NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100%

Healthy: >100% (expansion outpaces churn)
Good: >110%
Best-in-class: >130%
```

### Unit Economics

**Customer Acquisition Cost (CAC):**
```
CAC = (Sales + Marketing spend in period) / New customers in period
```

Include: ad spend, sales salaries, marketing tools, content creation costs.
Exclude: product development, general admin.

**Lifetime Value (LTV):**
```
LTV = ARPU × Gross Margin % / Monthly Churn Rate

Alternative (if you know average customer lifespan):
LTV = ARPU × Gross Margin % × Average Customer Lifespan (months)
```

**LTV:CAC Ratio:**
```
LTV:CAC = LTV / CAC
```

| Ratio | Interpretation |
|-------|---------------|
| <1:1 | Losing money on every customer — unsustainable |
| 1:1 - 2:1 | Marginally viable — likely burning cash |
| 3:1 | Healthy benchmark for SaaS |
| 5:1+ | Very healthy, or possibly under-investing in growth |

**Payback Period:**
```
Payback = CAC / (ARPU × Gross Margin %)
```

| Months | Interpretation |
|--------|---------------|
| <6 | Excellent — fast capital recovery |
| 6-12 | Good — standard for SMB SaaS |
| 12-18 | Acceptable for mid-market |
| 18-24 | Typical for enterprise |
| >24 | Risky — need strong retention to justify |

### Cost Metrics

**Gross Margin:**
```
Gross Margin = (Revenue - COGS) / Revenue × 100%

SaaS COGS includes:
- Hosting / infrastructure
- LLM API costs (for AI products)
- Payment processing fees (typically 2.9% + $0.30)
- Customer support (direct support staff)
- Third-party API/data costs
```

| Margin | Interpretation |
|--------|---------------|
| <50% | Low for SaaS — cost structure problem (often LLM costs) |
| 50-70% | Acceptable for AI-heavy or infrastructure-heavy SaaS |
| 70-80% | Good — standard SaaS target |
| >80% | Excellent — typical for established SaaS |

**Burn Rate and Runway:**
```
Monthly Burn = Monthly Expenses - Monthly Revenue
Runway (months) = Cash Balance / Monthly Burn
```

### Churn

**Monthly Churn Rate:**
```
Monthly Churn = Customers lost in month / Customers at start of month × 100%
```

**Annual Churn (from monthly):**
```
Annual Churn = 1 - (1 - Monthly Churn)^12
```

| Monthly Churn | Annual Churn | Typical Segment |
|---------------|-------------|-----------------|
| 2-3% | 22-31% | Consumer / micro-SMB |
| 3-5% | 31-46% | SMB SaaS (typical) |
| 5-7% | 46-59% | High-churn SMB (price-sensitive markets) |
| 1-2% | 11-22% | Mid-market SaaS |
| <1% | <11% | Enterprise SaaS |

## Market Sizing Methodology

### Top-Down Approach

Start with the total market and narrow:

```
TAM = Total number of potential customers × average annual spend
SAM = TAM × % reachable given geography/segment/distribution
SOM = SAM × realistic market share (typically 1-5% in first 3 years)
```

**Data sources for top-down:** Industry reports (Gartner, IDC, Statista), census data, market research reports, competitor revenue disclosures.

### Bottom-Up Approach

Start with unit economics and scale:

```
Year 1 customers = monthly_acquisition_rate × 12 × (1 - annual_churn)
Year 1 revenue = average_customers × ARPU × 12
Scale to SOM = Year 1 revenue × growth_multiplier over time horizon
```

**Data sources for bottom-up:** Current/projected acquisition rates, ARPU, churn, conversion rates from similar products or own data.

### Cross-Validation

Both approaches should produce SOM estimates within 2x of each other. If they don't:
- Top-down much larger → market is big but your reach is limited (distribution problem)
- Bottom-up much larger → your unit economics are strong but the market may be smaller than reports suggest (niche opportunity)

## LLM Cost Modeling (for AI-Powered SaaS)

AI products have a unique cost structure. LLM API costs are variable COGS that scale with usage.

### Cost Calculation

```
Monthly LLM Cost = active_users × avg_requests_per_user × avg_tokens_per_request × cost_per_token
```

### Cost Optimization Levers

| Strategy | Estimated Savings | Complexity |
|----------|------------------|------------|
| Model routing (cheap model for simple tasks) | 60-80% | Medium |
| Semantic caching (cache similar queries) | 30-50% | Medium |
| Prompt optimization (fewer tokens) | 20-40% | Low |
| Output length limits | 10-30% | Low |
| Batch processing where possible | 20-40% | Medium |

### Impact on Gross Margin

```
Without optimization: LLM cost might be 30-50% of revenue → Gross Margin 50-70%
With optimization: LLM cost drops to 5-15% of revenue → Gross Margin 70-85%
```

Model both scenarios. LLM cost management is a key lever for AI SaaS viability.

## Scenario Analysis Framework

### Three Scenarios

| Parameter | Pessimistic | Base | Optimistic |
|-----------|-------------|------|------------|
| Monthly acquisition | Base × 0.5 | Estimated from drivers | Base × 1.5 |
| Monthly churn | Base × 1.5 | Industry benchmark | Base × 0.5 |
| ARPU | Base × 0.8 | Current/planned pricing | Base × 1.2 |
| Expansion rate | 0% | Industry benchmark | Base × 2.0 |
| Time to first customer | Base × 2 | Estimated | Base × 0.5 |

### Sensitivity Analysis

Identify the top 3 variables that change the outcome most. Typically:

1. **Churn rate** — small changes compound dramatically over 12+ months
2. **CAC** — determines how fast you can grow without burning cash
3. **ARPU / pricing** — directly affects LTV:CAC and breakeven timeline

For each, show: "If [variable] changes from [base] to [pessimistic], the outcome changes from [X] to [Y]."

## Decision Framework

### Go/No-Go Criteria

| Metric | Go | Caution | No-Go |
|--------|-----|---------|-------|
| LTV:CAC | >3:1 | 2:1 - 3:1 | <2:1 |
| Payback period | <12 months | 12-18 months | >18 months (SMB) |
| Gross margin | >70% | 50-70% | <50% |
| SOM / Revenue needed | SOM > 3x revenue target | SOM = 1-3x | SOM < revenue target |
| Runway to breakeven | Within available capital | Needs 1 fundraise | Needs 2+ fundraises |

### Milestone-Based Decision Points

Instead of a single go/no-go, define checkpoints:

```
Checkpoint 1 (Month 3): Do we have 50+ users? If no, revisit acquisition strategy.
Checkpoint 2 (Month 6): Is monthly churn <X%? If no, revisit product-market fit.
Checkpoint 3 (Month 12): Is LTV:CAC >2:1? If no, revisit pricing or CAC.
```

## Edge Cases

- **Pre-revenue product:** All numbers are projections. Tag everything as Low confidence. Focus on the assumptions register and sensitivity analysis — the model's value is identifying what to validate, not predicting revenue.
- **Marketplace / two-sided model:** Model both sides separately. The "chicken and egg" problem means early acquisition costs on one side subsidize the other. Model the subsidy explicitly.
- **Usage-based pricing:** Revenue is variable, not predictable. Model average usage per customer with a range, and use scenarios to bound the revenue projection.
- **Hybrid model (subscription + usage):** Split the revenue model into base MRR (predictable) and usage-based revenue (variable). Model each separately and sum.

## Sources and Rationale

- **SaaS metrics framework:** Based on David Skok's SaaS metrics work (forEntrepreneurs.com) and the a16z SaaS playbook
- **LTV/CAC benchmarks:** SaaS Capital, OpenView Partners, and Bessemer Cloud Index data
- **Churn benchmarks:** Recurly Research, ProfitWell benchmarks, Baremetrics Open Startups
- **LLM cost modeling:** Based on published pricing from Anthropic, OpenAI, and industry cost analyses
