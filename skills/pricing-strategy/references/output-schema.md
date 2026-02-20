# Output Schema: Pricing Strategy

This file defines the exact structure of the Pricing Strategy skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **competitor-research:** `context.competitors[].pricing` (pricing data for comparison)
- **business-case-modeling:** `context.projections.costs`, `context.projections.margins`
- **saas-metrics-analysis:** `context.metrics.churn_rate`, `context.metrics.ltv_benchmarks`

### Produces

This skill produces:
- `context.pricing.recommendation` — Primary pricing recommendation
- `context.pricing.scenarios[]` — Array of pricing scenarios evaluated
- `context.pricing.unit_economics` — LTV, CAC, payback calculations
- `context.pricing.validation` — Recommended validation approach

---

## Output Structure

```
# Pricing Strategy: [Product Name]

## 1. Executive Summary (required)

- Recommended pricing model: [model name]
- Primary price point: $[X]/month
- Key rationale: [2-3 sentences]

## 2. Prerequisites Confirmed (required)

| Input | Status | Source |
|-------|--------|--------|
| Value proposition | ✓ Confirmed | User provided |
| Target market | ✓ Confirmed | B2B/SMB/Enterprise |
| Competitor data | ✓ Confirmed | competitor-research |
| Cost estimates | ✓ Confirmed / ⚠ Missing | User provided |

## 3. Value Analysis (required)

### Core Value Metric
- Metric: [per-user / per-transaction / etc.]
- Rationale: Why this metric aligns price with value

### Value Quantification (if available)
| Value Type | Estimated Value | Notes |
|------------|------------------|-------|
| Time saved | $[X]/month | [Calculation basis] |
| Revenue enabled | $[X]/month | [Calculation basis] |
| Cost reduced | $[X]/month | [Calculation basis] |

### Value-to-Price Ratio
- Estimated monthly value: $[X]
- Proposed price: $[Y]
- Price as % of value: [Z]%
- Assessment: [Appropriate / High / Low]

## 4. Competitive Positioning (required)

### Price Ladder

```
                    Price Point
Low                 ↑                  High
  |-----------------|-------------------|
Free    Basic      Pro      Business   Enterprise
 [Comp A]  [You]  [Comp B]    [Comp C]
```

### Positioning Statement
- Recommended position: [Budget / Mid-market / Premium / Whitespace]
- Rationale: [Why this position fits product and market]

### Competitive Gap Opportunities
| Gap | Opportunity | Rationale |
|-----|-------------|-----------|
| [Gap 1] | [Opportunity] | [Why exploit] |
| [Gap 2] | [Opportunity] | [Why exploit] |

## 5. Pricing Scenarios (required, minimum 3)

### Scenario A: [Model Name]

**Structure:**
- Free tier: [What's included] @ $[0]
- Basic tier: [What's included] @ $[X]/month
- Pro tier: [What's included] @ $[Y]/month
- Enterprise: [What's included] @ Custom

**Expected Distribution:**
- Free: [X]%
- Basic: [X]%
- Pro: [X]%
- Enterprise: [X]%

**Rationale:** [Why this model fits]

**Pros:** [List]
**Cons:** [List]

### Scenario B: [Model Name]
[Same structure]

### Scenario C: [Model Name]
[Same structure]

## 6. Unit Economics (required)

### Customer Economics

| Metric | Value | Calculation |
|--------|-------|-------------|
| ARPU | $[X]/month | Average across tiers |
| Gross Margin | [X]% | (Revenue - COGS) / Revenue |
| Monthly Churn | [X]% | Customer churn rate |
| LTV | $[X] | (ARPU × Margin) / Churn |

### Acquisition Economics

| Metric | Value | Notes |
|--------|-------|-------|
| Marketing CAC | $[X] | [Per customer] |
| Sales CAC | $[X] | [Per customer] |
| Total CAC | $[X] | [Combined] |
| Onboarding Cost | $[X] | [Per customer] |

### Ratios

| Metric | Value | Target | Assessment |
|--------|-------|--------|------------|
| LTV:CAC | [X]:1 | 3:1 min | [Healthy/Struggling/Excellent] |
| Payback Period | [X] months | <12 | [Assessment] |
| Margin | [X]% | 70%+ | [Assessment] |

## 7. Recommendation (required)

### Primary Recommendation

**Pricing Model:** [Model name]

**Tier Structure:**
| Tier | Price | Target Customer | Key Features |
|------|-------|-----------------|--------------|
| Free | $0 | [Segment] | [Features] |
| Starter | $[X] | [Segment] | [Features] |
| Pro | $[Y] | [Segment] | [Features] |
| Enterprise | Custom | [Segment] | [Features] |

### Rationale
[2-3 paragraphs explaining why this pricing fits the product, market, and competitive landscape]

### Alternative Considered
[1 alternative with why it was not selected]

## 8. Free Tier Strategy (conditional)

### Free Tier Definition
- What's included: [Features]
- What's NOT included: [Features]
- Usage limits: [Limits if any]

### Conversion Expectations
- Expected conversion rate: [X]%
- Time to conversion: [X] days/months
- Conversion triggers: [What drives upgrade]

### Why Free Tier Makes Sense / Doesn't Make Sense
[Explanation]

## 9. Validation Plan (required)

### Recommended Validation Approach
- Method: [Wizard of Oz / Pilot / A/B Test / Survey]
- Timeline: [X weeks]
- Sample size: [X customers]
- Success criteria: [What determines pricing works]

### Fallback if Validation Fails
- If [condition]: Consider [alternative]
- If [condition]: Consider [alternative]

## 10. Enterprise Pricing (required)

### Enterprise Strategy
- Approach: [Published / Custom / Band]
- Typical discount range: [X-Y]%
- Key negotiation factors: [Factors]

### Enterprise Features
- SSO/SAML
- Dedicated support
- Custom integrations
- SLA
- Data residency

## 11. Launch Strategy (required)

### Launch Pricing
- Initial price: $[X]
- Launch discount: [X]% for first [Y] months
- When to raise: [Timeline]

### Price Increase History (conditional)
| Date | Old Price | New Price | Reason |
|------|-----------|-----------|--------|
| [Date] | $[X] | $[Y] | [Reason] |

---

## Validation Rules

1. Minimum 3 pricing scenarios evaluated
2. Each scenario has specific price points (not ranges)
3. Unit economics calculated with LTV, CAC, payback period
4. LTV:CAC ratio stated with target comparison
5. Competitive positioning mapped visually or in table
6. Free tier addressed if applicable
7. Validation approach recommended
8. B2B/B2C context explicitly considered
9. Recommendations grounded in value, not just competition
10. Prerequisites confirmed before generating output

## Confidence Tagging

- **High:** Specific data from competitor research, known costs, actual metrics
- **Medium:** Benchmarks from similar products, estimated costs, industry averages
- **Low:** Unvalidated assumptions, novel market, no comparable data

Apply confidence to pricing recommendations, LTV calculations, and conversion estimates.
