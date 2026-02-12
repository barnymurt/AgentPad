---
name: business-case-modeling
description: Build revenue projections, unit economics, and financial viability models for SaaS and digital products. Use when the user asks to model revenue, calculate unit economics (LTV, CAC, payback period), estimate market size (TAM/SAM/SOM), build a business case for a feature or product, project MRR/ARR growth, or evaluate whether a SaaS idea is financially viable. Covers revenue modeling, cost structure, unit economics, market sizing, and scenario analysis.
---

# Business Case Modeling

Build structured financial models and viability assessments for SaaS and digital products. Unlike raw LLM output that gives vague revenue estimates, this skill applies SaaS-specific financial frameworks, makes every assumption explicit, calculates unit economics with real formulas, and stress-tests projections through scenario analysis. The output is a model a founder could present to an investor or use to make a go/no-go decision.

## Core Workflow

### Step 1: Clarify the Business Model

Before any numbers, establish the commercial fundamentals:

1. **Revenue model:** How does the product make money? (Subscription, usage-based, freemium + paid, one-time purchase, marketplace commission)
2. **Pricing structure:** What are the tiers and price points? If not defined, help the user establish preliminary pricing using competitor benchmarks.
3. **Target customer:** Who pays? (Individual, SMB, mid-market, enterprise) This determines average deal size, sales cycle, and churn expectations.
4. **Stage:** Pre-launch (all projections), early revenue (some actuals), or growth (extrapolation from real data)?
5. **Time horizon:** How far out? (Typically 12-month for early stage, 36-month for growth stage)

If the user hasn't decided on pricing or revenue model, flag this as the highest-priority decision and help them think through it before modeling. A model without pricing clarity is fiction.

### Step 2: Size the Market (TAM/SAM/SOM)

Estimate the addressable market using top-down and bottom-up approaches:

1. **TAM (Total Addressable Market):** Total revenue if you captured 100% of the target market. Use industry reports, census data, or market research.
2. **SAM (Serviceable Addressable Market):** The portion of TAM your product can actually reach given geography, segment, and distribution constraints.
3. **SOM (Serviceable Obtainable Market):** The realistic share you can capture in the time horizon, given competition and resources.

Apply both methods per [references/framework.md](references/framework.md):
- **Top-down:** Start from total market size and narrow
- **Bottom-up:** Start from unit economics and scale up

If both methods produce wildly different numbers, flag the discrepancy and explain what's driving it. Use the more conservative estimate as the base case.

### Step 3: Model Revenue

Build the revenue projection using SaaS-specific drivers:

1. **Customer acquisition:** Monthly new customers (from marketing spend, conversion rates, organic growth)
2. **Churn:** Monthly customer loss rate (use industry benchmarks if no data: 3-7% monthly for SMB SaaS, 1-2% for mid-market, <1% for enterprise)
3. **Expansion:** Net revenue retention from upsells, cross-sells, seat expansion
4. **MRR build-up:** Month-by-month calculation: New MRR + Expansion MRR - Churned MRR = Net New MRR
5. **ARR projection:** MRR x 12 at each milestone

State every assumption explicitly. No hidden numbers. See [references/framework.md](references/framework.md) for formulas and benchmark ranges.

### Step 4: Calculate Unit Economics

Compute the metrics that determine financial viability:

1. **CAC (Customer Acquisition Cost):** Total sales + marketing spend / new customers acquired
2. **LTV (Lifetime Value):** ARPU x Gross Margin / Monthly Churn Rate
3. **LTV:CAC Ratio:** Target >3:1 for viable SaaS
4. **Payback Period:** CAC / (ARPU x Gross Margin) — months to recover acquisition cost
5. **Gross Margin:** (Revenue - COGS) / Revenue — for SaaS, COGS includes hosting, LLM API costs, support
6. **Burn Rate and Runway:** Monthly expenses - monthly revenue = monthly burn. Cash / burn = runway months.

For each metric, compare to SaaS industry benchmarks. Flag any metric that's outside healthy ranges.

### Step 5: Model Costs

Build the cost structure:

1. **Fixed costs:** Team salaries, office, tools/subscriptions, insurance
2. **Variable costs:** Hosting (scale with users), LLM API costs (scale with usage), payment processing fees, support
3. **Growth costs:** Marketing spend, sales team, partnerships
4. **One-time costs:** Development, legal, initial setup

For AI-powered SaaS, specifically model LLM costs as a variable cost tied to usage. This is often the biggest margin risk — see [references/framework.md](references/framework.md) for LLM cost modeling guidance.

### Step 6: Run Scenarios

Stress-test the model with three scenarios:

1. **Base case:** Realistic assumptions based on available data and benchmarks
2. **Optimistic case:** What if acquisition is 50% better, churn is 50% lower, and expansion is 2x?
3. **Pessimistic case:** What if acquisition is 50% worse, churn is 50% higher, and no expansion revenue?

For each scenario, calculate: months to breakeven, runway required, LTV:CAC ratio, and 12/24/36-month ARR.

Identify the **key sensitivity variables** — which assumptions, if wrong, change the outcome most? These are the variables the user needs to validate first.

### Step 7: Synthesize and Recommend

Deliver a clear verdict:

1. **Viability assessment:** Is this financially viable? Under which conditions?
2. **Key risks:** The 2-3 assumptions that most threaten the model
3. **Validation priorities:** What data would make this model more reliable?
4. **Decision framework:** What milestones should trigger go/no-go decisions?

Be honest. If the model shows the business isn't viable under realistic assumptions, say so and explain what would need to change.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Business Model Summary** — revenue model, pricing, target customer, stage
- **Market Sizing** — TAM/SAM/SOM with top-down and bottom-up estimates
- **Revenue Projection** — month-by-month MRR build-up with assumptions table
- **Unit Economics** — CAC, LTV, LTV:CAC, payback period, gross margin
- **Cost Structure** — fixed, variable, growth, one-time costs
- **Scenario Analysis** — base/optimistic/pessimistic with sensitivity variables
- **Viability Assessment** — verdict, risks, validation priorities
- **Assumptions Register** — every assumption listed with confidence level and source

Expected length: 2,000-4,000 words depending on model complexity.

## Quality Criteria

- [ ] Every number in the model traces back to a stated assumption
- [ ] Assumptions register lists every assumption with confidence level and source
- [ ] Unit economics are calculated with correct formulas (not estimated)
- [ ] LTV:CAC ratio is computed and benchmarked against SaaS standards
- [ ] Three scenarios modeled (base, optimistic, pessimistic)
- [ ] Key sensitivity variables identified (which assumptions matter most)
- [ ] Market sizing uses both top-down and bottom-up approaches
- [ ] SaaS-specific metrics used (MRR, ARR, churn rate, NRR, not just "revenue")
- [ ] Honest assessment — model acknowledges when data is thin or viability is questionable

## References

- **Financial formulas and benchmarks:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (AI writing assistant SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Hidden assumptions:** Stating "we'll acquire 100 customers/month" without explaining how. Every growth number needs a driver (marketing spend x conversion rate = customers). If the driver isn't known, tag the assumption as Low confidence.

2. **Ignoring LLM costs in AI SaaS:** Treating hosting costs as the only variable cost when the product uses AI. LLM API calls can be the largest COGS item. Model them explicitly: cost per request x requests per user x users = monthly LLM cost. This directly impacts gross margin.

3. **Using annual churn when monthly matters:** SaaS models live and die on monthly churn. 5% monthly churn means you lose 46% of customers per year. Always model in monthly increments and show the compounding effect.

4. **Market sizing fantasy:** TAM numbers that are technically correct but meaningless ("the global SaaS market is $200B"). SOM is what matters — the realistic share you can capture given your resources, competition, and distribution. If SOM is less than the revenue needed to be viable, the business has a structural problem.

5. **Single-scenario modeling:** Presenting only the base case as if it's certain. Every model is wrong — the value is in understanding the range. Always run pessimistic and optimistic scenarios and identify which assumptions drive the biggest variance.
