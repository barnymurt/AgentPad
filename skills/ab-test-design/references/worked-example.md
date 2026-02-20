# Worked Example: A/B Test Design

This file shows a complete example of A/B test design.

## Input Context

**Product:** TaskFlow - Team project management SaaS
**Request:** "We want to test whether adding customer logos to our pricing page will improve conversion"

### Prior Analysis (from Funnel Analysis)
- Pricing page has 63% drop-off to plan selection
- Exit surveys suggest "Not sure if this is right for us" is a top reason
- Competitors prominently display customer logos

### Baseline Metrics
- Pricing page to Plan Select: 63% conversion
- Checkout conversion: 21% (overall)
- Monthly traffic to pricing: 9,500 visitors
- Revenue per user: $18.50
- Cancel rate: 2.5%

---

## Analysis Process

### Step 1: Validate Hypothesis

**Initial Hypothesis:**
"We should add customer logos to improve conversion"

**Formatted as IF/THEN/BECAUSE:**

**IF** we add prominent customer logos (company names and logos of current customers) to the pricing page, **THEN** pricing page to plan selection conversion will increase by 10% relative (from 63% to ~69%), **BECAUSE** social proof reduces purchase anxiety for enterprise buyers who are unsure if the product is right for their company size.

**Validation:**

| Criterion | Met? | Notes |
|-----------|------|-------|
| Specific | Yes | Adding logos to pricing page |
| Measurable | Yes | Plan selection conversion rate |
| Testable | Yes | Can implement and measure |
| Actionable | Yes | Would implement if positive |
| Rationale | Yes | Competitors use this, exit surveys support |

**Conclusion:** Strong hypothesis - proceed

### Step 2: Define Metrics

**Primary Metric:**
- Metric: Pricing page → Plan selection conversion rate
- Current: 63%
- Expected: 69% (10% relative improvement = 6 percentage points absolute)
- Justification: Direct measure of hypothesis, business impact

**Guardrail Metrics:**

| Metric | Current | Max Degradation | Why |
|--------|---------|-----------------|-----|
| Revenue per user | $18.50 | -5% | Don't sacrifice revenue |
| Checkout conversion | 21% | -10% | Don't harm downstream |
| Cancel rate | 2.5% | +25% relative | Don't improve pricing but increase churn |

### Step 3: Calculate Sample Size

**Parameters:**
- Baseline: 63% (0.63)
- MDE: 10% relative → 6.3 percentage points absolute → 0.693
- α = 0.05 (standard)
- Power = 0.80 (standard)

**Sample Size Calculation:**

Using standard formula for proportions:
```
n = (p₀(1-p₀) * (z_α + z_β)²) / δ²
n = (0.63 * 0.37 * (1.96 + 0.84)²) / 0.063²
n = (0.2331 * 7.84) / 0.003969
n = 1,827 / 0.003969
n = ~460 users per variant
```

**Verification with Table:**
- Baseline 63%, MDE 10% relative (~6% absolute)
- Sample needed: ~460 per variant

**Traffic Check:**
- Monthly traffic: 9,500 to pricing
- Daily traffic: ~317 visitors/day
- Sample needed: 920 total (460 × 2)
- Duration: 3 days

**Decision:** 3 days is too short - need at least 1 week for day-of-week variation. Proceed with sample size.

### Step 4: Duration Calculation

**Minimum for day-of-week:** 1 week (7 days)
**Novelty considerations:** Minimal (logos are subtle)
**Seasonality:** None expected

**Duration Decision:** Run for 2 weeks (14 days)

Expected sample in 2 weeks:
- 317 visitors/day × 14 days × 2 variants = 8,876 total
- Well above minimum of 920

### Step 5: Design Variants

**Control (A):**
- Current pricing page without logos
- URL: /pricing
- No changes

**Treatment (B):**
- Pricing page with customer logos section
- "Trusted by 500+ companies" header
- 8 customer logos in 2 rows of 4
- Logos positioned above pricing plans
- Implementation: New section between value props and pricing plans

---

## Output

# A/B Test Design: Pricing Page Social Proof

## 1. Executive Summary

**Test Overview:**
- Test name: Pricing Page Customer Logos
- Hypothesis: IF we add prominent customer logos to pricing page, THEN pricing to plan selection conversion will increase by 10% relative, BECAUSE social proof reduces purchase anxiety.
- Primary metric: Pricing page → Plan selection (63% → 69%)
- Estimated sample: 920 users (minimum), targeting 8,000+
- Estimated duration: 2 weeks

**Design Decision:**
Proceed with test. Sample size is achievable, hypothesis is strong, guardrails are defined.

**Key Risks:**
1. Logos may not be prominent enough to move the needle
2. Sample size assumes current traffic levels hold
3. Novelty effect from first-time seeing logos

## 2. Hypothesis

### Validated Hypothesis

**IF** we add prominent customer logos (company names and logos of current customers) to the pricing page in a dedicated section positioned above the pricing plans, **THEN** pricing page to plan selection conversion will increase by 10% relative (from 63% to ~69%), **BECAUSE** social proof reduces purchase anxiety for enterprise buyers who are unsure if the product is right for their company size.

**Hypothesis Validation:**

| Criterion | Met? | Notes |
|-----------|------|-------|
| Specific | Yes | Adding logos to specific location |
| Measurable | Yes | Plan selection conversion |
| Testable | Yes | Can implement with feature flag |
| Actionable | Yes | Would implement if positive |
| Rationale | Yes | Exit surveys + competitor analysis |

### Baseline Metrics

| Metric | Current Value | Source | Date |
|--------|---------------|--------|------|
| Pricing → Plan selection | 63% | Analytics | Mar 2026 |
| Checkout conversion | 21% | Analytics | Mar 2026 |
| Revenue per user | $18.50 | Revenue data | Mar 2026 |
| Cancel rate | 2.5% | Analytics | Mar 2026 |

## 3. Metric Definitions

### Primary Metric (North Star)

| Component | Value |
|-----------|-------|
| Metric | Pricing page → Plan selection conversion |
| Definition | Users who view pricing page AND select a plan within same session |
| Current value | 63% (5,985 / 9,500) |
| Expected change | +6 pp absolute (+10% relative) → 69% |
| Business justification | Direct test of hypothesis; higher conversion = more revenue |

### Guardrail Metrics

| Metric | Current | Max Degradation | Why It Matters |
|--------|---------|-----------------|----------------|
| Revenue per user | $18.50 | -5% ($17.58) | Don't sacrifice revenue for volume |
| Checkout conversion | 21% | -10% (18.9%) | Don't harm downstream funnel |
| Cancel rate | 2.5% | +25% (3.1%) | Don't improve pricing but increase churn |

**Guardrail Rule:** Test fails if ANY guardrail metric exceeds max degradation, regardless of primary metric result.

### Segment Metrics

| Segment | Primary Metric | Expected Difference |
|---------|---------------|---------------------|
| New visitors | 63% | May be more influenced by social proof |
| Returning | 58% | Already know product, less need for proof |
| Mobile | 45% | Logos smaller, may have less impact |
| Desktop | 72% | Better logo display, likely more impact |

## 4. Statistical Design

### Sample Size Calculation

| Parameter | Value | Notes |
|-----------|-------|-------|
| Baseline rate | 63% | Current conversion |
| Minimum detectable effect | 10% relative (6.3pp) | Practical minimum |
| Significance level (α) | 0.05 | Standard |
| Power (1-β) | 0.80 | Standard |
| Sample per variant | 460 | Calculated |
| Total sample needed | 920 | Minimum |

### Sample Size Options

| MDE Option | Sample/Var | Total | Days @ 317/day | Feasible? |
|------------|------------|-------|----------------|-----------|
| 5% relative | 1,800 | 3,600 | 11 | Yes |
| **10% relative** | **460** | **920** | **3** | **Yes (min)** |
| 20% relative | 115 | 230 | 1 | Yes (but too short) |

**Selected:** 10% relative - balances sensitivity with feasibility

### Test Parameters

| Parameter | Value | Rationale |
|-----------|-------|----------|
| Variants | A/B | Simple, clear comparison |
| Allocation | 50/50 | Standard, easy to analyze |
| One-tailed/two-tailed | Two | Standard (could be worse too) |

## 5. Test Design

### Control (Variant A)

**Description:** Current pricing page without customer logos

**Implementation:**
- URL: /pricing
- No changes to existing elements
- Existing value proposition section remains

### Treatment (Variant B)

**Description:** Pricing page with customer logos section

**Implementation:**
- URL: /pricing (served via feature flag)
- New section added between value props and pricing plans
- Header: "Trusted by 500+ companies building better teams"
- 8 customer logos in 2×4 grid
- Logos: [Logo1], [Logo2], [Logo3], [Logo4], [Logo5], [Logo6], [Logo7], [Logo8]
- Companies chosen: Mix of sizes and industries
- Logo display: Grayscale, professional appearance

**Design rationale:** Position logos where they're visible but don't distract from pricing plans. Above the fold on desktop.

### Traffic Allocation

| Variant | Allocation | Expected users (2 weeks) |
|---------|------------|--------------------------|
| A (Control) | 50% | 4,438 |
| B (Treatment) | 50% | 4,438 |

## 6. Duration and Timing

### Duration Calculation

| Input | Value |
|-------|-------|
| Sample needed (min) | 920 |
| Sample needed (target) | 8,000 |
| Daily traffic | 317 visitors/day |
| Minimum duration | 3 days |
| Target duration | 14 days |

### Recommended Duration

| Duration | Rationale |
|----------|----------|
| **2 weeks** | Cover full day-of-week cycle; sufficient for novelty to wear off |

### Timing Considerations

| Factor | Assessment | Mitigation |
|--------|------------|------------|
| Day of week | Some variation | Run full week+ |
| Month cycle | End-of-month for B2B | Avoid last 3 days |
| Seasonal | No major holidays | None |
| Marketing | No campaigns planned | Monitor |

### Novelty Effect

**Assessment:** Low-Medium risk

**Mitigation:**
- Run for minimum 2 weeks
- Analyze by user segment (new vs returning) post-test
- Compare first week vs second week results

## 7. Analysis Plan

### Decision Framework

**Primary Metric:**
| Result | p-value | MDE met? | Decision |
|--------|---------|----------|----------|
| Win | < 0.05 | Yes (>6pp) | Implement logos |
| Inconclusive | < 0.05 | No | Continue or inconclusive |
| Inconclusive | > 0.05 | Any | Keep control |
| Lose | < 0.05 | Negative | Remove, keep control |

**Guardrail Rule:** If ANY guardrail exceeds max degradation → Test fails regardless of primary.

### Pre-Registration

**Documented before test starts:**
- [x] Hypothesis
- [x] Primary and guardrail metrics
- [x] Sample size (920 min, 8000 target)
- [x] Duration (2 weeks)
- [x] Decision criteria

### Monitoring Plan

| Check | Frequency | Alert Threshold |
|-------|-----------|-----------------|
| Primary metric | Daily | ±20% from expected (50-75%) |
| Guardrails | Daily | Any breach of max degradation |
| Technical | Daily | Errors > 1% |

### Post-Test Analysis

| Analysis | What to Check |
|----------|---------------|
| Overall | Primary metric with 95% CI |
| Guardrails | All within acceptable range |
| Segments | Mobile vs desktop, new vs returning |
| Time | Week 1 vs Week 2 (novelty check) |

## 8. Implementation Checklist

### Pre-Test

| Item | Owner | Status |
|------|-------|--------|
| Hypothesis documented | PM | Done |
| Metrics defined in analytics | Analytics | Done |
| Sample size calculated | Data | Done |
| Test duration set | PM | Done |
| Engineering ticket created | Eng | Done |
| QA plan reviewed | QA | Done |

### During Test

| Item | Frequency | Owner |
|------|-----------|-------|
| Monitor primary metric | Daily | PM |
| Monitor guardrails | Daily | PM |
| Check for technical issues | Daily | Eng |
| Document external factors | Ongoing | PM |

### Post-Test

| Item | Owner | Status |
|------|-------|--------|
| Pull complete data | Analytics | Pending |
| Calculate results | Data | Pending |
| Document learnings | PM | Pending |
| Share with stakeholders | PM | Pending |
| Update run book | PM | Pending |

## 9. Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Hypothesis | High | Strong rationale, prior research |
| Sample size | High | Achieving target easily |
| Duration | High | Full week+ coverage |
| Metrics | High | Clear definitions, good baseline |

**Overall:** High
