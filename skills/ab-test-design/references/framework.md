# Framework: A/B Test Design

This file provides detailed methodology for designing A/B tests.

## 1. Hypothesis Development

### Strong Hypothesis Components

| Component | Question | Example |
|-----------|----------|---------|
| **IF** | What changes? | IF we add social proof to pricing page |
| **THEN** | What happens? | THEN checkout conversion increases |
| **BY HOW MUCH** | How much? | by 10% relative |
| **BECAUSE** | Why? | because social proof reduces uncertainty |

### Hypothesis Examples

**Good Hypothesis:**
"IF we add customer logos to the pricing page, THEN checkout conversion will increase by 10% BECAUSE logos provide social proof that reduce purchase anxiety for enterprise buyers."

**Weak Hypothesis:**
"New pricing page will be better" (not specific, no measurable outcome, no rationale)

### Validating Your Hypothesis

| Criterion | Check |
|-----------|-------|
| Specific | Can you describe exactly what changes? |
| Measurable | Can you calculate the metric? |
| Testable | Can you implement and measure? |
| Actionable | Would you act on the result? |
| Rationale | Do you have a theory for why? |

---

## 2. Metric Selection Guide

### Primary Metric Characteristics

**Good Primary Metrics:**
- Directly tied to business value (revenue, conversions)
- Responsive to the change being tested
- Not easily gamed or manipulated
- Available with low latency

**Bad Primary Metrics:**
- Vanities (page views, sessions)
- Lagging (NPS scores, annual retention)
- Proxies (clicks but not conversions)

### Secondary Metric Types

| Type | Example | Purpose |
|------|---------|---------|
| **Guardrail** | Revenue per user | Don't harm while improving |
| **Diagnostic** | Time to convert | Understand mechanism |
| **Segment** | Mobile conversion | Heterogeneous effects |

### Guardrail Metric Framework

**Template:**

| Metric | Current Value | Max Degradation | Why It Matters |
|--------|---------------|-----------------|----------------|
| Revenue per user | $15.00 | -10% | Don't sacrifice revenue for volume |
| Cancel rate | 2% | +20% relative | Don't improve signup but increase churn |
| Support tickets | 100/day | +10% | Don't create confusion |

---

## 3. Sample Size Calculation

### Key Parameters

| Parameter | Symbol | Typical Value | Notes |
|-----------|--------|---------------|-------|
| Baseline | p₀ | Current metric | Must know before test |
| Minimum detectable effect | δ | 5-20% relative | Smaller = bigger sample |
| Significance level | α | 0.05 | False positive rate |
| Statistical power | 0. | 1-β80 | True positive rate |
| Standard deviation | σ | Varies | For continuous metrics |

### Sample Size Formula (Proportions)

```
n = (p₀(1-p₀) * (z_α + z_β)²) / δ²

Where:
- z_α = 1.96 for α=0.05
- z_β = 0.84 for power=0.80
- δ = minimum detectable effect
```

### Quick Reference Table

**Baseline = 10% conversion:**

| MDE | Sample per Variant | Total Sample | Days @ 1k/day |
|-----|---------------------|---------------|---------------|
| 20% (2%) | 1,900 | 3,800 | 4 |
| 10% (1%) | 7,800 | 15,600 | 16 |
| 5% (0.5%) | 31,000 | 62,000 | 62 |
| 2% (0.2%) | 195,000 | 390,000 | 390 |

**Baseline = 50% conversion:**

| MDE | Sample per Variant | Total Sample | Days @ 1k/day |
|-----|---------------------|---------------|---------------|
| 20% (10%) | 300 | 600 | 1 |
| 10% (5%) | 1,200 | 2,400 | 2 |
| 5% (2.5%) | 4,900 | 9,800 | 10 |
| 2% (1%) | 31,000 | 62,000 | 62 |

### What If You Can't Get Enough Sample?

| Option | Trade-off |
|--------|-----------|
| Increase MDE | Bigger change needed |
| Reduce power | Higher chance of false negative |
| Extend duration | Longer time to results |
| Use more sensitive metric | Different measurement |
| Don't test | Accept uncertainty |

---

## 4. Test Duration Guidelines

### Minimum Duration

| Scenario | Minimum | Why |
|----------|---------|-----|
| Simple website change | 1 week | Cover day-of-week variation |
| Subscription/recurring | 2 weeks | Cover full billing cycle |
| Seasonal business | 2+ cycles | Cover seasonal patterns |
| Significant product change | 4 weeks | Account for novelty |

### Duration Calculation

```
Duration = Sample size needed / Daily traffic
```

### Novelty Effect Handling

**Timeline:**
- Week 1: Initial reaction (may be inflated or deflated)
- Week 2-3: Stabilization
- Week 4+: True effect

**Recommendation:** Run for minimum 2 weeks, prefer 4 weeks for important tests.

### Seasonality Considerations

**Known Patterns:**
- Day of week: Weekends often different
- Month: Start/end of month effects
- Quarter: Quarter-end for B2B
- Year: Holidays, annual cycles

**Mitigation:**
- Run test through full cycle (at least one week)
- Document timing relative to cycles
- Consider segmenting by time

---

## 5. Statistical Significance

### Understanding p-value

**Definition:** Probability of seeing results this extreme if there's no real effect.

| p-value | Interpretation |
|---------|----------------|
| p < 0.05 | Statistically significant (5% chance of false positive) |
| p < 0.01 | Highly significant (1% chance) |
| p > 0.05 | Not significant |

### Confidence Intervals

**Always report with confidence interval:**

- "Conversion improved from 10% to 11%" - Point estimate
- "Conversion improved from 10% to 11% (95% CI: 9.5% to 12.5%)" - Range

**Interpretation:** We're 95% confident the true effect is between 9.5% and 12.5%.

### Multiple Comparison Problem

**The problem:** Testing 5 variants increases chance of false positive.

**Solutions:**
1. **Bonferroni:** Divide α by number of tests
2. **Winner framework:** Only declare winner if beats control
3. **Keep it simple:** Test fewer variants

---

## 6. Common Test Types

### A/B Test
- Two variants: Control vs Treatment
- Classic, most common

### A/B/n Test
- Multiple variants: A vs B vs C...
- Higher traffic requirements

### Multivariate Test (MVT)
- Multiple changes combined
- Tests interaction effects
- Very high traffic needs

### Bandit Algorithm
- Adaptive: Shifts traffic to winners
- Good for ongoing optimization
- Harder to analyze

**Recommendation:** Start with A/B, advance as needed.

---

## 7. Integration with Other Skills

### Inputs (Consults)

- **funnel-analysis:** To identify what to test (drop-off points)
- **cohort-analysis:** To understand segment differences
- **research-objectives:** To align with research goals

### Outputs (Feeds)

- **development-team:** Test specification for implementation
- **experiment-tracking:** Test results and learnings
- **product-strategy:** Validated learnings for roadmap
- **data-visualization:** Results visualization
