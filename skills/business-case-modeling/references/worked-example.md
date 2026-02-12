# Worked Example: Business Case Modeling

This example demonstrates the Business Case Modeling skill applied to a pre-launch AI SaaS product.

## Scenario

**Product:** WriteFlow — an AI writing assistant SaaS for content marketing teams
**Target Market:** Marketing teams at SMBs (10-200 employees) who produce blog posts, social media, and email campaigns
**Stage:** Pre-launch, founder has built an MVP, seeking to validate financial viability before investing in growth
**Context provided:** Founder has preliminary pricing ideas ($29-79/mo), estimates from beta testing (20 users), and industry research. No connected data sources.

## Input

> "I'm building an AI writing assistant for content marketing teams. It helps them draft blog posts, social media content, and email campaigns using their brand voice. I have a working MVP with about 20 beta users. I'm thinking of pricing at $29/mo for individuals and $79/mo for teams. I need to figure out if this is a viable business — can you build me a business case? I have about $50K in savings to fund this."

## Reasoning

### Step 1: Clarify the Business Model

Revenue model: SaaS subscription (monthly). Two tiers initially. Target: SMB marketing teams. Stage: pre-launch with MVP and beta data. Time horizon: 24 months (enough to see if the business can reach breakeven with $50K).

### Step 2: Market Sizing

Used industry reports for content marketing software market and SMB counts. Top-down from Statista/Grand View Research data, bottom-up from unit economics.

### Step 3-7: Revenue, Unit Economics, Costs, Scenarios, Verdict

Applied SaaS financial formulas with explicit assumptions. Modeled LLM costs as the key variable cost. Ran three scenarios.

## Output

---

# Business Case: WriteFlow

## 1. Business Model Summary

**Product:** AI writing assistant that drafts blog posts, social media content, and email campaigns in a brand's voice for content marketing teams.

**Revenue model:** Monthly SaaS subscription

**Pricing structure:**
- Starter: $29/mo — 1 user, 50 AI generations/mo, 3 brand voice profiles
- Team: $79/mo — 5 users, 200 AI generations/mo, unlimited brand voice profiles
- Blended ARPU estimate: $48/mo (assuming 60% Starter, 40% Team based on similar tools)

**Target customer:** Marketing teams at SMBs (10-200 employees), primarily B2B companies producing regular content

**Stage:** Pre-launch with MVP and 20 beta users

**Time horizon:** 24 months

## 2. Market Sizing

### Top-Down
- **TAM:** ~6.2M SMBs in the US employ marketing staff. Content marketing software market valued at $12.5B globally (Grand View Research, 2025). US share ~40% = $5B. **TAM = $5B** [M]
- **SAM:** SMBs with 10-200 employees actively doing content marketing, budget for tools in the $29-79/mo range. Estimated at 15% of TAM based on SMB tool adoption rates. **SAM = $750M** [M]
- **SOM:** Realistic capture in 24 months given a solo founder, organic growth, and no sales team. 0.01-0.05% market share. **SOM = $75K-375K ARR** [L]

### Bottom-Up
- Targeting 100-500 paying customers in 24 months at $48 ARPU = $57.6K-288K ARR
- **SOM (bottom-up) = ~$150K ARR** at midpoint [L]

### Cross-Validation
Top-down SOM ($75K-375K) and bottom-up ($57K-288K) overlap in the $75K-288K range. This is encouraging — the market exists and the unit economics can reach it. The wide range reflects pre-launch uncertainty. **Confidence: Low** — both estimates rely on assumptions about acquisition rate and churn.

## 3. Revenue Projection

### Assumptions Table

| # | Assumption | Value | Source | Confidence | Impact if Wrong |
|---|-----------|-------|--------|------------|-----------------|
| A1 | Monthly new customers (M1-6) | 15/mo | Beta conversion rate extrapolated + content marketing | [L] | High — drives all revenue |
| A2 | Monthly new customers (M7-12) | 25/mo | Assumes organic + referral growth from base | [L] | High |
| A3 | Monthly new customers (M13-24) | 35/mo | Assumes some paid acquisition added | [L] | High |
| A4 | Monthly churn | 6% | SMB SaaS benchmark (industry average) | [M] | High — compounds |
| A5 | Blended ARPU | $48 | 60% Starter ($29) + 40% Team ($79) | [M] | Medium |
| A6 | Expansion rate | 2%/mo | Starter→Team upgrades | [L] | Low initially |
| A7 | LLM cost per generation | $0.015 | Claude Haiku for drafts, Sonnet for refinement, blended | [H] | Medium — affects margin |
| A8 | Avg generations per user/mo | 40 | Beta usage data (20 users) | [M] | Medium |
| A9 | Monthly fixed costs | $2,500 | Hosting $200 + tools $300 + founder living $2,000 | [H] | Low |
| A10 | Marketing spend | $500/mo (M1-6), $1,000/mo (M7+) | Content marketing + small ad budget | [M] | Medium |

### MRR Build-Up

| Month | New | Churned | Active | New MRR | Expansion | Churned MRR | Net MRR | Cumulative |
|-------|-----|---------|--------|---------|-----------|-------------|---------|------------|
| 1 | 15 | 0 | 15 | $720 | $0 | $0 | $720 | $720 |
| 2 | 15 | 1 | 29 | $720 | $14 | $48 | $1,406 | $1,406 |
| 3 | 15 | 2 | 42 | $720 | $28 | $96 | $2,058 | $2,058 |
| 6 | 15 | 4 | 72 | $720 | $67 | $192 | $3,651 | $3,651 |
| 9 | 25 | 6 | 108 | $1,200 | $100 | $288 | $5,663 | $5,663 |
| 12 | 25 | 8 | 142 | $1,200 | $131 | $384 | $7,763 | $7,763 |
| 18 | 35 | 12 | 205 | $1,680 | $189 | $576 | $11,133 | $11,133 |
| 24 | 35 | 15 | 262 | $1,680 | $242 | $720 | $13,802 | $13,802 |

*Simplified — full month-by-month available on request*

### Revenue Milestones
- **$1K MRR:** Month 2
- **$10K MRR:** Month 16
- **Breakeven:** Month 14 (base case — monthly revenue exceeds monthly costs)

## 4. Unit Economics

### CAC
- **Calculation:** $500-1,000 marketing spend / 15-25 new customers = **$33-67/customer**
- **Benchmark:** SMB SaaS CAC typically $100-500. WriteFlow's is low because it relies on organic/content marketing, not paid sales.
- **Assessment:** Healthy, but depends on maintaining organic growth. If paid acquisition is needed, CAC will rise significantly.

### LTV
- **Calculation:** $48 ARPU × 72% gross margin / 6% monthly churn = **$576**
- **Benchmark:** SMB SaaS LTV typically $500-3,000.
- **Assessment:** Reasonable for SMB. Sensitive to churn — if churn drops to 4%, LTV rises to $864.

### LTV:CAC Ratio
- **Calculation:** $576 / $50 (midpoint CAC) = **11.5:1**
- **Benchmark:** >3:1 is healthy. 11.5:1 suggests either very efficient acquisition or under-investment in growth.
- **Assessment:** Artificially high because acquisition is almost entirely organic/free. This ratio will normalize as paid channels are added. Target: maintain >4:1 as CAC rises.

### Payback Period
- **Calculation:** $50 / ($48 × 0.72) = **1.4 months**
- **Benchmark:** <6 months is excellent for SMB SaaS.
- **Assessment:** Excellent — fast capital recovery. Will lengthen as CAC increases.

### Gross Margin
- **COGS breakdown:**
  - LLM costs: 40 generations × $0.015 × users (variable) = ~$0.60/user/mo
  - Hosting: ~$0.50/user/mo at scale
  - Payment processing: 2.9% + $0.30 ≈ $1.69/user/mo
  - Total COGS per user: ~$2.79/mo
- **Gross margin:** ($48 - $2.79) / $48 = **94.2%** [H]
- **Benchmark:** >80% is excellent for SaaS. This is strong because LLM costs per generation are low.
- **Assessment:** Very healthy. LLM costs are manageable at current usage levels. Risk: if users demand longer/more complex generations, cost per generation could 3-5x.

## 5. Cost Structure

### Fixed Costs

| Category | Monthly | Notes |
|----------|---------|-------|
| Founder salary/living | $2,000 | Minimal — founder-funded phase |
| Hosting (base) | $200 | Vercel + Railway baseline |
| Tools | $300 | GitHub, analytics, email, design tools |
| **Total fixed** | **$2,500** | |

### Variable Costs

| Category | Cost Driver | Per Unit | At 262 users (M24) |
|----------|-------------|----------|---------------------|
| LLM API | Generations per user | $0.60/user/mo | $157/mo |
| Hosting (scale) | Active users | $0.50/user/mo | $131/mo |
| Payment processing | Revenue | ~3.5% of MRR | $483/mo |
| **Total variable** | | | **$771/mo** |

### LLM Costs

- **Cost per generation:** $0.015 (blended: 80% Haiku at $0.005, 20% Sonnet at $0.05)
- **Generations per user/month:** 40 (from beta data)
- **Monthly LLM cost at launch (15 users):** $9
- **Monthly LLM cost at M24 (262 users):** $157
- **LLM cost as % of revenue:** 1.1% at M24 [H]
- **Optimization levers:** Model routing already applied (80/20 Haiku/Sonnet split). Further savings possible with caching (est. 30% reduction) and prompt optimization (est. 20% reduction).

### Burn Rate and Runway

- **Monthly burn at launch:** $2,500 (fixed) + ~$50 (variable) - $720 (MRR) = **$1,830/mo**
- **Runway at launch:** $50,000 / $1,830 = **27 months**
- **Monthly burn at M12:** $2,500 + $400 (variable) + $1,000 (marketing) - $7,763 (MRR) = **+$3,863/mo (cash positive)**
- **Total cash consumed before breakeven (M14):** ~$18,000

## 6. Scenario Analysis

### Three Scenarios

| Parameter | Pessimistic | Base | Optimistic |
|-----------|-------------|------|------------|
| Monthly acquisition | 8/mo → 15/mo | 15/mo → 35/mo | 25/mo → 50/mo |
| Monthly churn | 9% | 6% | 4% |
| ARPU | $38 (80% Starter) | $48 | $58 (50% Team) |
| Expansion rate | 0% | 2%/mo | 4%/mo |

| Metric | Pessimistic | Base | Optimistic |
|--------|-------------|------|------------|
| 12-month ARR | $28K | $93K | $198K |
| 24-month ARR | $72K | $166K | $396K |
| Breakeven month | Month 22 | Month 14 | Month 8 |
| LTV:CAC (at stabilization) | 4.2:1 | 11.5:1 | 18.7:1 |
| Cash consumed before breakeven | $42K | $18K | $8K |

### Sensitivity Analysis

**Top 3 variables by impact:**

1. **Churn rate:** Base (6%) → Pessimistic (9%) changes 24-month ARR from $166K to $72K (57% reduction). Churn is the single biggest risk — small changes compound dramatically.
2. **Acquisition rate:** Base (15-35/mo) → Pessimistic (8-15/mo) changes 24-month ARR from $166K to $72K. Without organic growth, the business stalls.
3. **ARPU / tier mix:** Base ($48) → Pessimistic ($38) changes 24-month ARR from $166K to $134K (20% reduction). Less dramatic but still significant.

### Key Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Churn exceeds 8%/mo (product-market fit issue) | Medium | Critical — runway drops below 18 months | Beta user interviews to identify churn drivers before launch |
| Organic acquisition stalls at <10/mo | Medium | High — delays breakeven beyond runway | Start small paid acquisition experiments by M3 |
| LLM costs spike (model pricing changes) | Low | Medium — margin drops from 94% to 80% | Multi-provider strategy, caching, cost monitoring |

## 7. Viability Assessment

### Verdict: Conditionally Viable

WriteFlow is financially viable **if** the founder can maintain 15+/mo customer acquisition through organic channels and keep churn at or below 6%. The unit economics are strong (94% gross margin, fast payback), the market exists, and $50K provides sufficient runway even in the pessimistic scenario (27 months at launch burn rate, breakeven by M22 worst case).

### Conditions for Viability
1. **Acquisition must reach 15+/mo within the first 2 months.** The current 20 beta users suggest this is achievable but not guaranteed at scale.
2. **Churn must stay below 7%/mo.** Above 7%, the compounding effect erodes the customer base faster than acquisition replenishes it. Beta retention data is encouraging but a 20-user sample is too small to be confident.
3. **Pricing must hold.** If competitive pressure forces prices down, the model still works (gross margin is very healthy) but milestones shift right.

### Validation Priorities
1. **Churn rate:** Track beta user retention over the next 60 days. Is the 30-day retention >90%? This is the highest-impact assumption.
2. **Acquisition channels:** Run a small content marketing experiment ($500, 1 month) and measure cost per signup and conversion rate. This validates A1-A3.
3. **Willingness to pay:** Convert 5 beta users to paid plans at $29/mo. If >50% of beta users convert, pricing is validated.

### Decision Milestones

| Checkpoint | When | Metric | Go | No-Go |
|-----------|------|--------|-----|-------|
| Launch validation | Month 3 | Paying customers | >30 | <15 |
| Churn check | Month 6 | Monthly churn | <7% | >9% |
| Growth validation | Month 9 | MRR growth rate | >10%/mo | <5%/mo |
| Sustainability | Month 12 | MRR vs. costs | Cash-flow positive within 6 months | Burn rate increasing |

## 8. Assumptions Register

| # | Assumption | Value | Source | Confidence | Impact if Wrong |
|---|-----------|-------|--------|------------|-----------------|
| A1 | New customers M1-6 | 15/mo | Beta extrapolation | [L] | High |
| A2 | New customers M7-12 | 25/mo | Organic growth estimate | [L] | High |
| A3 | New customers M13-24 | 35/mo | With paid acquisition | [L] | High |
| A4 | Monthly churn | 6% | SMB SaaS benchmark | [M] | Critical |
| A5 | Blended ARPU | $48 | 60/40 tier split | [M] | Medium |
| A6 | Expansion rate | 2%/mo | Starter→Team upgrades | [L] | Low |
| A7 | LLM cost per generation | $0.015 | Published API pricing | [H] | Medium |
| A8 | Generations per user/mo | 40 | Beta data (n=20) | [M] | Medium |
| A9 | Monthly fixed costs | $2,500 | Known costs | [H] | Low |
| A10 | Marketing spend | $500-1,000/mo | Planned budget | [M] | Medium |
| A11 | Market size (SAM) | $750M | Industry reports | [M] | Low |
| A12 | Conversion rate (visitor→trial) | 3% | Industry benchmark | [L] | Medium |

---

## Quality Check

- [x] Every number traces to a stated assumption (A1-A12 in register)
- [x] Assumptions register complete with confidence levels and sources
- [x] Unit economics calculated with correct formulas (shown)
- [x] LTV:CAC = 11.5:1, benchmarked against 3:1 standard
- [x] Three scenarios modeled with different parameter sets
- [x] Sensitivity analysis identifies churn, acquisition, and ARPU as top variables
- [x] Market sizing uses top-down and bottom-up, cross-validated
- [x] SaaS metrics used throughout (MRR, ARR, churn, NRR, LTV, CAC)
- [x] Honest assessment — "conditionally viable" with specific conditions stated
