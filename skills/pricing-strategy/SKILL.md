---
name: pricing-strategy
description: Analyze and recommend pricing models for SaaS and digital products. Use when the user has a product idea or existing product and needs pricing strategy — including pricing model selection, tier structure, competitive positioning, and unit economics. Use when the user says "what should I charge," "how should I price my product," "what pricing model works for SaaS," "help me think about pricing tiers," or "is my pricing competitive." Covers per-seat, usage-based, tiered, freemium, and hybrid models with LTV/CAC analysis.
lifecycle: build
category: growth
relatedBefore: competitor-research,product-vision
relatedAfter: pricing-launch,messaging-framework
outputSummary: Pricing model recommendation with tier structure, LTV/CAC analysis, and competitive positioning
nextSteps: Execute pricing with pricing-launch and communicate value through messaging-framework
---

# Pricing Strategy

Analyze and recommend pricing structures for SaaS products. Unlike raw LLM output that suggests generic pricing tiers, this skill applies deep SaaS pricing expertise to model multiple scenarios, analyze competitive positioning, calculate unit economics, and produce a recommended pricing strategy with rationale and validation approach.

**Note**: This skill requires minimum inputs to produce useful output. See Step 1 for requirements.

## Core Workflow

### Step 1: Validate Prerequisites

Before generating pricing recommendations, confirm minimum inputs exist:

**Required Inputs (all must be present):**
- Product value proposition — What problem solved, for whom, value delivered
- Target market — B2B / B2C / Both, company size, geography
- At least 2 competitors or alternatives users consider

**Strongly Recommended Inputs:**
- Customer acquisition cost estimate (or comparable data)
- Customer lifetime value benchmarks
- Development/operating costs (rough order of magnitude)
- Desired margin target

**If inputs are missing:**
- Ask the user for missing information before proceeding
- If competitor data is missing, consult competitor-research skill
- Do not generate pricing without minimum context — output will be generic and useless

### Step 2: Analyze Value Proposition

Understand what the pricing must justify:

1. **Identify the core value metric:** What does the customer pay for?
   - Per user/seat
   - Per transaction/usage
   - Per feature access
   - Flat fee

2. **Quantify value delivered:** If possible, estimate:
   - Time saved (hours × hourly rate)
   - Revenue enabled (customers × conversion × value)
   - Cost reduced (process cost - new cost)
   - Risk avoided (probability × cost of risk event)

3. **Determine willingness to pay factors:**
   - Budget context (SMB vs Enterprise)
   - Pain level (solved problem urgency)
   - Alternative cost (what they do now and cost)

### Step 3: Research Competitive Pricing

Analyze how competitors price similar products:

1. **Extract competitor pricing data:**
   - From competitor-research output (preferred)
   - From direct research if needed

2. **Map competitor positioning on price ladder:**
   ```
   Low:    [Free] ---- [Basic] ---- [Pro] ---- [Enterprise]: High
   Market: [Comp A]                        [Comp B]
   ```

3. **Identify occupied vs. unoccupied positions:**
   - Where are competitors clustered?
   - What price points are underserved?
   - Where is there whitespace to position?

4. **Learn from competitor pricing strategies:**
   - What features in each tier?
   - What's the expansion revenue path?
   - How do they handle enterprise?

### Step 4: Model Pricing Scenarios

Generate at least 3 pricing scenarios for evaluation:

**Scenario Types:**

| Model | Description | Best For |
|-------|-------------|----------|
| **Per-Seat** | Price per user/month | Tools used by teams, collaboration |
| **Usage-Based** | Price per transaction/API call/storage | Variable value, scale-neutral |
| **Tiered (Feature)** | Packages with different feature sets | Product-led growth, upsell path |
| **Tiered (Volume)** | Discounts at usage thresholds | Enterprise, growth alignment |
| **Flat Rate** | Single price, all included | Simplicity, narrow scope |
| **Freemium** | Free tier + paid tiers | Adoption, viral loops |
| **Hybrid** | Combination of above | Complex products |

For each scenario, specify:
- Pricing structure (what's charged, how priced)
- Tier breakdown (if applicable)
- Expected customer distribution (% per tier)
- Rationale (why this model fits)

### Step 5: Calculate Unit Economics

Analyze the financial viability of each scenario:

1. **Customer Acquisition Cost (CAC):**
   - Marketing costs
   - Sales costs
   - Onboarding costs

2. **Lifetime Value (LTV):**
   - Monthly recurring revenue per customer
   - Average customer lifespan (churn rate inverse)
   - Expansion revenue (upsell, cross-sell)

3. **LTV:CAC Ratio:**
   ```
   LTV:CAC = (MRR × Lifespan) / CAC
   ```
   - Target: 3:1 minimum, 5:1 healthy

4. **Payback Period:**
   ```
   Payback = CAC / (MRR - COGS)
   ```
   - Target: <12 months, <6 months excellent

5. **Margin Analysis:**
   - Gross margin after hosting, support, payment processing
   - Target: 70%+ for SaaS

### Step 6: Recommend and Validate

Deliver actionable recommendations:

1. **Primary Recommendation:**
   - Best pricing model with rationale
   - Specific price points (not ranges)
   - Tier structure if applicable

2. **Alternative Options:**
   - 1-2 backup scenarios with trade-offs

3. **Validation Approach:**
   - How to test pricing before full launch
   - Recommended: Wizard of Oz, pilot program, A/B test, survey + willingness to pay

4. **Free Tier Consideration:**
   - If applicable, what to include free
   - Conversion rate expectations
   - Upsell path from free

5. **Enterprise Pricing:**
   - How to handle large customers
   - Custom vs. published pricing
   - Negotiation guidelines

6. **Launch Strategy:**
   - Initial price vs. future price increase
   - Launch discount considerations
   - When to raise prices

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — Recommended pricing in 2 sentences
- **Value Analysis** — How pricing relates to value delivered
- **Competitive Positioning** — Where pricing sits vs. alternatives
- **Pricing Scenarios** — Minimum 3 models evaluated
- **Unit Economics** — LTV, CAC, payback, margins
- **Recommendation** — Specific pricing with rationale
- **Validation Plan** — How to test pricing before full rollout

Expected length: 1,500-3,000 words

## Quality Criteria

- [ ] Minimum required inputs confirmed before generating output
- [ ] At least 3 pricing scenarios evaluated
- [ ] Each scenario includes specific price points (not ranges)
- [ ] Unit economics calculated (LTV, CAC, payback period)
- [ ] LTV:CAC ratio stated with target comparison
- [ ] Competitive positioning mapped visually or in table
- [ ] Free tier addressed if relevant
- [ ] Validation approach recommended (how to test pricing)
- [ ] B2B vs. B2C context considered
- [ ] Recommendations grounded in value delivered, not just competitor comparison

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (B2B SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Generic tiering:** Creating "Starter/Business/Enterprise" without specific rationale. Every tier should have a clear value differentiator and target customer.

2. **Ignoring unit economics:** Suggesting prices without calculating whether the business can actually survive. A price that sounds reasonable may not cover CAC + costs + margin.

3. **Copying competitors exactly:** Positioning at exactly the same price point as established competitors with no differentiation justification. Need a reason to compete on price.

4. **No free tier strategy:** Not addressing whether free tier makes sense, what it includes, and what the conversion expectation is.

5. **Pricing in a vacuum:** Not considering the target market's budget reality. Enterprise pricing doesn't work for SMB, and SMB pricing doesn't signal quality for Enterprise.

6. **Ignoring expansion revenue:** Not modeling how pricing enables upselling. SaaS pricing should have a clear path to higher revenue as customers grow.

7. **No validation plan:** Recommending pricing without testing. Even experienced pricing experts get it wrong — validate with customers before full launch.

8. **Over-complicating:** Creating 8 pricing tiers when 2-3 would suffice. More tiers = more customer confusion = analysis paralysis.
