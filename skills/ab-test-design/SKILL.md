---
name: ab-test-design
description: Design statistically rigorous experiments to compare two or more variants. Use when the user needs to "test a hypothesis," "compare design solutions," "run an experiment," "measure impact," or "validate a change." Defines success metrics, calculates sample size requirements, and plans analysis approach for reliable results.
lifecycle: iterate
category: research
outputSummary: A/B test design with hypothesis, variables, sample size calculation, and success metrics
relatedAfter: cohort-analysis,funnel-analysis
nextSteps: Analyze results with cohort-analysis and iterate based on findings
---

# A/B Test Design

Design rigorous experiments that produce reliable, actionable results. Unlike informal testing that produces noisy data, this skill ensures proper statistical design, defines clear success criteria, and accounts for common pitfalls like novelty effects and seasonality.

**Note**: This skill requires a hypothesis and baseline metrics. See Step 1.

## Core Workflow

### Step 1: Validate Hypothesis

**Requirements - Critical:**

This skill requires a testable hypothesis. Before proceeding:

**Required:**
- Clear hypothesis (what you expect to happen and why)
- Baseline metric value (current performance)
- Control and variant definitions

**Strong Hypothesis Format:**
```
IF [change], THEN [expected outcome] BECAUSE [rationale]
```

**Example:**
- Weak: "New checkout button will be better"
- Strong: "IF we change the checkout button from blue to green, THEN conversion will increase by 5% BECAUSE green signals 'go' and reduces hesitation at the final step"

**Hypothesis Validation:**
1. Is it specific? (not "improve conversion")
2. Is it measurable? (can we detect a change?)
3. Is it testable? (can we implement and measure?)
4. Is there a rationale? (why do we expect this?)

### Step 2: Define Success Metrics

**Primary Metric (North Star):**

The ONE metric that determines test success. Choose carefully.

| Good Primary Metrics | Bad Primary Metrics |
|---------------------|---------------------|
| Conversion rate | Page views |
| Revenue per user | Time on page |
| Click-through rate | Sessions |
| Retention rate | Bounce rate |

**Requirements for Primary Metric:**
- Direct business impact
- Responsive to the change
- Not easily gamed
- Aligns with business goals

**Secondary Metrics (Guardrail Metrics):**

Metrics that MUST NOT degrade, even if primary improves.

| Example Guardrails | Why They Matter |
|-------------------|------------------|
| Revenue per user | Don't improve conversions but kill revenue |
| Cancel rate | Don't improve signup but increase churn |
| Support tickets | Don't improve flow but increase confusion |
| Page load time | Don't improve UX but slow performance |

**Guardrail Metric Rules:**
1. Define 2-3 guardrail metrics minimum
2. Set acceptable degradation threshold (e.g., "-5% max")
3. Test fails if ANY guardrail is breached, even if primary wins
4. Document why each guardrail matters

**Segment Metrics (Optional):**

Break down metrics by segment to understand heterogeneous effects:
- Device (mobile vs desktop)
- Source (paid vs organic)
- User type (new vs returning)

### Step 3: Calculate Sample Size

**Power Analysis - Critical:**

Sample size depends on:
- Baseline conversion rate
- Minimum detectable effect (MDE)
- Statistical significance level (α = typically 0.05)
- Statistical power (1-β = typically 0.80)

**Sample Size Formula:**

```
n = (16 * σ²) / δ²

Where:
- σ = standard deviation (estimated from baseline)
- δ = minimum detectable effect (in absolute terms)
```

**Simplified Calculation:**

| Baseline | MDE | Sample per Variant |
|----------|-----|-------------------|
| 10% | 5% relative (0.5%) | 31,000 |
| 10% | 10% relative (1%) | 7,800 |
| 10% | 20% relative (2%) | 1,900 |
| 50% | 5% relative (2.5%) | 4,900 |
| 50% | 10% relative (5%) | 1,200 |

**Decision Framework:**

| MDE | When Appropriate |
|-----|-----------------|
| 20% | Major changes, established products |
| 10% | Typical optimizations |
| 5% | Mature products, small wins |
| 1-2% | Incremental changes, large traffic |

**If You Can't Reach Sample Size:**

1. **Increase MDE** - Test bigger changes
2. **Reduce power** - Accept 70% instead of 80%
3. **Extend test duration** - Run longer
4. **Change primary metric** - Use more sensitive metric
5. **Don't test** - Not enough traffic for reliable results

### Step 4: Design Variants

**Control (A):**
- Current experience (status quo)
- Should represent current best practice
- Document exactly what "current" means

**Variant (B, C, ...):**
- One change per variant (when possible)
- Document exact implementation
- Consider interaction effects

**Variant Count Decision:**

| # Variants | When Appropriate |
|------------|------------------|
| 1 (A/B) | Clear single hypothesis |
| 2+ (A/B/C) | Testing multiple approaches |
| Many | Only with very high traffic |

**Warning:** Each additional variant increases sample size requirements by ~15-20%.

### Step 5: Set Statistical Thresholds

**Significance Level (α):**
- Standard: 0.05 (5% false positive rate)
- Conservative: 0.01 (1% false positive rate)
- When to use conservative: High-stakes decisions, multiple tests

**Power (1-β):**
- Standard: 0.80 (80% chance to detect true positive)
- Conservative: 0.90 (90% power)
- When to use conservative: Expensive changes, high cost of false negative

**Multiple Comparison Correction:**

If testing multiple variants:
- Bonferroni: Divide α by number of variants
- Or: Use "winner" framework (compare each to control separately)

**Recommendation:** Keep it simple - test 1 variant vs control with standard α=0.05, power=0.80.

### Step 6: Consider Novelty and Seasonality

**Novelty Effect:**

Users may initially respond positively (or negatively) to changes simply because it's new, then revert to baseline.

**How to Handle:**
1. **Run longer:** Minimum 2 weeks, preferably 4 to account for novelty
2. **Segment by tenure:** Analyze new users vs established users separately
3. **Pre-registration:** Commit to test duration before seeing results
4. **Accept uncertainty:** If results look too good, probably novelty

**Seasonality:**

Business metrics often vary by:
- Day of week
- Time of month
- Season/holidays

**How to Handle:**
1. **Run full cycles:** Minimum 1 full week, ideally 2-4 weeks
2. **Match time windows:** Control and variant should run simultaneously
3. **Document timing:** Note test start/end relative to known cycles
4. **Segment by time:** Analyze first half vs second half of test

### Step 7: Plan Analysis Approach

**Before Running:**

1. **Pre-register test:** Document hypothesis, metrics, sample size, duration BEFORE starting
2. **Set decision criteria:** When will you declare winner? (e.g., p < 0.05 AND MDE met)
3. **Define action thresholds:** What change in metrics triggers what action?

**During Test:**

- **DO NOT PEEK:** Checking results early and stopping increases false positive rate
- **Monitor guardrails:** Check daily that guardrails aren't breached
- **Document anomalies:** Record any external factors (site issues, marketing campaigns)

**After Test:**

1. Calculate primary metric impact with confidence interval
2. Check each guardrail metric
3. Analyze segments
4. Write conclusion with confidence assessment

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — Hypothesis, test design, expected outcome
- **Metric Definitions** — Primary, guardrail, segment metrics
- **Statistical Design** — Sample size, power, significance
- **Variant Design** — Control and variant details
- **Duration and Timing** — Run time, seasonality considerations
- **Analysis Plan** — Decision criteria, monitoring plan
- **Implementation Checklist** — What to do before/after

Expected length: 800-1,500 words

## Quality Criteria

- [ ] Hypothesis is specific, measurable, testable, with rationale
- [ ] Primary metric defined with clear business justification
- [ ] Guardrail metrics defined (minimum 2)
- [ ] Sample size calculated with power analysis
- [ ] Minimum detectable effect justified
- [ ] Control and variant clearly defined
- [ ] Statistical thresholds defined (α, power)
- [ ] Novelty effect considerations documented
- [ ] Seasonality considerations documented
- [ ] Analysis plan with decision criteria
- [ ] Duration calculated and justified

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **No hypothesis:** Testing "something" without knowing what you expect. Without hypothesis, you can't learn.

2. **Underpowered test:** Running test without calculating sample size. Results will be inconclusive.

3. **Peeking:** Checking results early and stopping when significant. Increases false positives dramatically.

4. **Ignoring guardrails:** Focusing only on primary metric while destroying other metrics.

5. **Wrong metric:** Using vanity metrics that don't impact business. Primary should directly tie to revenue/outcomes.

6. **No baseline:** Not knowing current performance. Can't calculate MDE without baseline.

7. **Too many variants:** Testing 5+ variants without traffic. Dilutes statistical power.

8. **Running too short:** One week isn't enough for most tests. Need full cycles.

9. **Novelty blindness:** Not accounting for initial excitement/rejection that fades.

10. **Analysis paralysis:** Over-complicating analysis. Simpler is better - stick to primary + guardrails.
