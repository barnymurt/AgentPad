---
name: saas-metrics-analysis
description: Analyze and interpret SaaS business metrics to diagnose health, identify root causes, and recommend prioritized actions. Use when the user asks to analyze their metrics, interpret MRR/ARR/churn data, diagnose business health, benchmark against industry standards, understand why a metric is trending, investigate metric relationships, or asks "how is my SaaS doing?" Covers health scoring, AARRR funnel analysis, cohort analysis, metric relationship mapping, benchmarking by stage, and root cause diagnosis.
---

# SaaS Metrics Analysis

Diagnose SaaS business health from metrics data and produce actionable recommendations tied to specific metric improvements. Unlike raw LLM output that lists metric definitions, this skill applies diagnostic frameworks to actual or estimated metrics, maps causal relationships between leading and lagging indicators, benchmarks against stage-appropriate industry standards, identifies root causes for underperforming metrics, and delivers a prioritized action plan where each action ties to a quantified metric improvement.

## Core Workflow

### Step 1: Gather and Classify Metrics

Collect all available metrics from the user. For each metric:

1. **Record the value and time period.** A metric without a time range is useless.
2. **Classify by type:** leading indicator (predicts future state) or lagging indicator (reports past state). See [references/framework.md](references/framework.md) for the classification map.
3. **Classify by funnel stage:** Acquisition, Activation, Retention, Revenue, or Referral (AARRR).
4. **Flag missing critical metrics.** If the user provides MRR but not churn, flag churn as required. See the Critical Metrics Minimum Set in [references/framework.md](references/framework.md).

If fewer than 5 metrics are provided, ask the user for the missing critical ones before proceeding. If the user cannot provide them, estimate from industry benchmarks and tag every estimate as [L] confidence.

### Step 2: Score Business Health

Apply the SaaS Health Scorecard from [references/framework.md](references/framework.md):

1. **Score each metric** against stage-appropriate benchmarks (pre-revenue, early, growth, scale).
2. **Assign a grade:** Green (healthy), Yellow (watch), or Red (critical) per the rubric.
3. **Calculate the composite health score** by weighting metrics according to company stage.
4. **Identify the weakest dimension.** The lowest-scoring area is the diagnostic priority.

Do not use generic benchmarks. A 5% monthly churn is healthy for a pre-revenue SMB SaaS but alarming for a growth-stage enterprise product. Always anchor benchmarks to the user's stage and segment.

### Step 3: Map Metric Relationships

Trace causal chains between metrics to find root causes:

1. **Start with the weakest metric** from Step 2.
2. **Walk upstream** using the Metric Relationship Map in [references/framework.md](references/framework.md). Example: high churn → low activation rate → poor onboarding → low feature adoption in first 7 days.
3. **Identify the root metric** — the leading indicator furthest upstream that is underperforming.
4. **Validate the chain.** Check if the data supports each link. If a link is speculative, tag it as [L] confidence.
5. **Repeat** for any other Red-scored metrics.

This step transforms "churn is high" into "churn is high because activation is broken, specifically because users who don't complete onboarding in the first 3 days churn at 4x the rate of those who do."

### Step 4: Perform Cohort and Trend Analysis

Analyze metrics over time, not just as snapshots:

1. **Trend direction:** For each key metric, determine if it is improving, stable, or deteriorating over the available time range.
2. **Cohort behavior (if data available):** Compare retention curves across monthly cohorts. Are newer cohorts retaining better or worse than older ones?
3. **Seasonality and anomalies:** Flag any metric movements that look seasonal, one-time, or anomalous rather than structural.
4. **Rate of change:** A metric moving in the right direction but too slowly is still a problem. Calculate the trajectory — at the current rate of improvement, when does the metric reach the healthy benchmark?

If cohort data is not available, state this gap explicitly and work with aggregate trends. Tag all trend-based findings with the time range they cover.

### Step 5: Benchmark Against Stage and Segment

Compare every scored metric against industry benchmarks:

1. **Select the correct benchmark set** based on company stage (pre-revenue, <$1M ARR, $1-10M ARR, $10M+ ARR) and segment (SMB, mid-market, enterprise).
2. **Show the gap** between the user's metric and the benchmark — both the absolute difference and the percentile position.
3. **Contextualize outliers.** A metric far above benchmark is not automatically good — it might indicate under-investment (e.g., LTV:CAC of 10:1 often means under-spending on growth).
4. **Identify the highest-leverage gaps** — metrics where closing the gap to benchmark would have the largest impact on revenue or sustainability.

Use the benchmark tables in [references/framework.md](references/framework.md). Tag benchmark source and confidence.

### Step 6: Diagnose Root Causes and Recommend Actions

Synthesize Steps 2-5 into a diagnosis and action plan:

1. **State the diagnosis clearly.** One sentence: "The primary issue is [X], caused by [Y], which is dragging down [Z]."
2. **Prioritize actions** by impact × feasibility. Use the prioritization matrix in [references/framework.md](references/framework.md).
3. **Tie each action to a specific metric improvement.** "Improving onboarding completion from 30% to 50% is projected to reduce monthly churn from 8% to 5.5%, adding ~$X to MRR within Y months."
4. **Identify quick wins** (high impact, low effort) vs. structural fixes (high impact, high effort).
5. **Set monitoring targets.** For each recommendation, define the metric, target value, and review timeline.

Never recommend generic actions like "improve retention." Every recommendation must name the specific metric it targets, the current value, the target value, and the mechanism of improvement.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Metrics Inventory** — all provided metrics classified by type and funnel stage
- **Health Scorecard** — each metric scored Green/Yellow/Red with stage-appropriate benchmarks
- **Metric Relationship Map** — causal chains from lagging symptoms to leading root causes
- **Trend Analysis** — direction and rate of change for key metrics
- **Benchmark Comparison** — gap analysis against stage and segment benchmarks
- **Diagnosis** — root cause statement with supporting evidence chain
- **Action Plan** — prioritized recommendations tied to specific metric improvements
- **Monitoring Dashboard** — metrics to track, targets, and review cadence

Expected length: 2,000-4,000 words depending on data richness.

## Quality Criteria

- [ ] Every metric is classified by type (leading/lagging) and funnel stage (AARRR)
- [ ] Health scores use stage-appropriate benchmarks (not generic SaaS averages)
- [ ] At least one causal chain is traced from symptom to root cause
- [ ] Recommendations are tied to specific metrics with current value, target, and mechanism
- [ ] Trends are analyzed (not just point-in-time snapshots)
- [ ] Confidence levels assigned to all estimates and inferences
- [ ] Missing data is flagged explicitly (not silently assumed)
- [ ] Benchmarks cite the stage and segment used for comparison
- [ ] Action plan is prioritized by impact × feasibility

## References

- **Diagnostic methodology and benchmarks:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (early-stage B2B SaaS with rising churn):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Treating metrics as independent numbers:** Reporting "churn is 8%, CAC is $200, MRR is $15K" as separate findings without mapping their relationships. Metrics exist in causal chains — high churn drives down LTV, which worsens LTV:CAC, which means growth spending is inefficient. Always map the chain.

2. **Using wrong-stage benchmarks:** Comparing an early-stage SMB SaaS ($15K MRR) against growth-stage benchmarks (e.g., expecting <2% monthly churn). A metric that looks "Red" at scale might be "Yellow" or normal for the company's stage. Always anchor to the correct stage and segment.

3. **Diagnosing symptoms instead of causes:** Recommending "reduce churn" when the root cause is poor activation. Churn is a lagging indicator — by the time a customer churns, the failure happened weeks or months ago. Walk upstream to find the leading indicator that is actually broken.

4. **Generic recommendations without metric targets:** Saying "improve onboarding" without specifying what metric changes, from what value to what target, and what impact that has downstream. Every action must tie to a number.

5. **Ignoring cohort effects in aggregate metrics:** Overall churn might look stable while newer cohorts are churning much faster — masked by the loyalty of early adopters. Always check whether aggregate metrics hide diverging cohort behavior.
