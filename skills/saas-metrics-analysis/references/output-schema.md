# Output Schema: SaaS Metrics Analysis

This file defines the exact structure of the SaaS Metrics Analysis skill output. Every output must conform to this schema. Fields marked (required) must always be populated; fields marked (conditional) are included when data exists.

## Output Structure

```
# SaaS Metrics Analysis: [Product/Company Name]

## 1. Metrics Inventory

### Provided Metrics (required)
| Metric | Value | Period | Funnel Stage | Indicator Type | Confidence |
|--------|-------|--------|-------------|---------------|------------|

### Derived Metrics (required)
| Metric | Value | Derivation | Confidence |
|--------|-------|-----------|------------|

### Missing Critical Metrics (required)
| Metric | Why Critical | Estimated Value | Estimation Basis | Confidence |
|--------|-------------|-----------------|-----------------|------------|

## 2. Health Scorecard

### Company Context (required)
- Stage (required): Pre-revenue / Early / Growth / Scale
- Segment (required): SMB / Mid-market / Enterprise
- MRR (required): Current MRR
- Customer count (required): Active paying customers

### Metric Scores (required)
| Metric | Value | Benchmark (for stage) | Score | Notes |
|--------|-------|-----------------------|-------|-------|

### Composite Health Score (required)
- Score (required): Numeric (1.0-3.0) with interpretation
- Weakest dimension (required): The lowest-scoring metric and its funnel stage
- Strongest dimension (required): The highest-scoring metric and its funnel stage

## 3. Metric Relationship Map

### Primary Causal Chain (required)
- Symptom (required): The lagging indicator showing the problem
- Chain (required): Step-by-step trace from symptom to root cause
- Root cause (required): The leading indicator that is the actual problem
- Evidence (required): Data supporting each link in the chain
- Confidence (required): H/M/L on the causal chain

### Secondary Chains (conditional — include if multiple Red/Yellow metrics exist)
- Same structure as primary chain

## 4. Trend Analysis

### Key Metric Trends (required)
| Metric | 3-Month Trend | Direction | Rate of Change | Projected Time to Benchmark |
|--------|--------------|-----------|----------------|---------------------------|

### Cohort Analysis (conditional — include if cohort data available)
- Cohort comparison (required if data): Retention curves by signup month
- Cohort quality trend (required if data): Is customer quality improving or degrading?
- Key finding (required if data): One sentence on what cohorts reveal

### Anomalies and Seasonality (conditional)
- Identified anomalies with date and explanation

## 5. Benchmark Comparison

### Gap Analysis (required)
| Metric | Current | Benchmark (stage/segment) | Gap | Percentile | Priority |
|--------|---------|---------------------------|-----|-----------|----------|

### Contextual Notes (required)
- Outlier explanations (any metric far above or below benchmark)
- Benchmark source and confidence

## 6. Diagnosis

### Primary Diagnosis (required)
- Statement (required): One sentence — "The primary issue is [X], caused by [Y], which is impacting [Z]"
- Supporting evidence (required): 3-5 bullet points of data that support this diagnosis
- Confidence (required): H/M/L with reasoning

### Secondary Diagnosis (conditional — if additional significant issues exist)
- Same structure as primary

## 7. Action Plan

### Prioritized Recommendations (required, minimum 3)
For each recommendation:
- Action (required): Specific, actionable recommendation
- Target metric (required): Which metric this action improves
- Current value (required): Where the metric is today
- Target value (required): Where the metric should move to
- Mechanism (required): How the action produces the metric improvement
- Expected impact on MRR (required): Quantified revenue impact
- Priority (required): Quick Win / Strategic / Major Initiative
- Effort (required): Low / Medium / High
- Timeline (required): Expected time to see metric movement

### Quick Wins Summary (required)
- Top 1-3 actions that can be implemented within 2 weeks

## 8. Monitoring Dashboard

### Metrics to Track (required)
| Metric | Current | Target | Review Cadence | Alert Threshold |
|--------|---------|--------|---------------|----------------|

### Review Schedule (required)
- Weekly metrics (required): Which metrics to check weekly
- Monthly metrics (required): Which metrics to review monthly
- Quarterly metrics (required): Which metrics to assess quarterly
```

## Field Definitions

### Metrics Inventory — Provided Metrics Table

#### Funnel Stage
- **What:** AARRR classification of the metric
- **Format:** One of: Acquisition, Activation, Retention, Revenue, Referral
- **Good example:** "Retention" for monthly churn rate
- **Bad example:** "Customer health" — not a funnel stage

#### Indicator Type
- **What:** Whether the metric predicts future state or reports past state
- **Format:** One of: Leading, Lagging
- **Good example:** "Leading" for activation rate (predicts future churn)
- **Bad example:** "Important" — not an indicator type

### Health Scorecard — Metric Scores

#### Score
- **What:** Health grade based on stage-appropriate benchmark comparison
- **Format:** One of: Green, Yellow, Red — with the benchmark range shown
- **Good example:** "Red (8% monthly churn vs. <5% benchmark for early-stage SMB SaaS)"
- **Bad example:** "Bad" — not a defined score; missing benchmark reference

### Metric Relationship Map — Chain

#### Chain
- **What:** Sequential causal links from lagging symptom to leading root cause
- **Format:** Numbered list where each step is: "Metric/behavior → next metric/behavior" with supporting data
- **Good example:** "1. Monthly churn at 8% (Red) → 2. Only 25% of users active after day 7 → 3. Activation rate at 18% → 4. Onboarding completion at 32% — root cause"
- **Bad example:** "Churn is high because of poor retention" — circular, no causal chain

### Action Plan — Expected Impact on MRR

#### Expected Impact on MRR
- **What:** Quantified estimate of revenue impact if the action succeeds
- **Format:** Dollar range or percentage, with calculation shown
- **Good example:** "Reducing churn from 8% to 5% saves ~$1,200/mo churned MRR at current base (150 customers × $48 ARPU × 3% reduction = ~$216 saved per month, compounding)"
- **Bad example:** "Significant revenue impact" — not quantified

### Monitoring Dashboard — Alert Threshold

#### Alert Threshold
- **What:** The value at which the metric requires immediate attention
- **Format:** Specific numeric threshold with direction (above/below)
- **Good example:** "Monthly churn >10% — triggers immediate churn investigation"
- **Bad example:** "If it gets worse" — not a specific threshold

## Validation Rules

1. All (required) fields are populated with non-placeholder content
2. Every metric in the inventory is classified by both funnel stage and indicator type
3. Health scores reference the specific benchmark used (stage + segment), not generic SaaS averages
4. At least one complete causal chain is traced from symptom to root cause with evidence
5. Minimum 3 prioritized recommendations in the action plan
6. Every recommendation includes current value, target value, mechanism, and quantified MRR impact
7. Confidence levels (H/M/L) are assigned to all estimates, inferences, and causal chains
8. Missing data is explicitly flagged in the Missing Critical Metrics table — never silently assumed
9. Trends show direction and rate of change, not just current values
10. Monitoring dashboard includes specific numeric alert thresholds, not vague descriptions

## Confidence Tagging

- **High [H]:** Based on user-provided data with clear measurement methodology (actual MRR, measured churn from billing system, tracked conversion rates)
- **Medium [M]:** Based on reasonable inference from partial data or strong industry benchmarks (churn estimated from customer count changes, benchmarks from well-sourced surveys)
- **Low [L]:** Based on assumptions, rough estimates, or analogies (activation rate guessed from similar products, market benchmarks from a different segment, causal chain with unverified links)

Tag each of the following with confidence level:
- Every metric in the Derived and Missing Critical Metrics tables
- The composite health score
- Each causal chain
- Each recommendation's expected metric impact
- Each benchmark comparison (confidence in the benchmark itself)
