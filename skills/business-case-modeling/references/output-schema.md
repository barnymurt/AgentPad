# Output Schema: Business Case Modeling

This file defines the exact structure of the Business Case Modeling skill output.

## Output Structure

```
# Business Case: [Product Name]

## 1. Business Model Summary
- Product description (required): What it does in 2-3 sentences
- Revenue model (required): Subscription / usage-based / freemium / hybrid
- Pricing structure (required): Tiers, price points, billing cadence
- Target customer (required): Segment, company size, buyer persona
- Stage (required): Pre-launch / early revenue / growth
- Time horizon (required): 12 / 24 / 36 months

## 2. Market Sizing

### Top-Down
- TAM (required): Total market value with calculation and source
- SAM (required): Serviceable portion with narrowing criteria
- SOM (required): Obtainable share with market share assumption and rationale

### Bottom-Up
- Unit economics projection (required): Customers × ARPU × 12 scaled over time horizon
- Growth assumptions (required): Acquisition rate and sources

### Cross-Validation
- Comparison (required): Do top-down and bottom-up converge? Explain discrepancies.
- Confidence (required): High/Medium/Low on market size estimates with reasoning

## 3. Revenue Projection

### Assumptions Table
For each assumption (required):
- Assumption name
- Value used
- Source / basis
- Confidence: [H], [M], or [L]

### MRR Build-Up (required)
Month-by-month table (minimum 12 months):

| Month | New Customers | Churned | Active Customers | New MRR | Expansion MRR | Churned MRR | Net MRR | Cumulative ARR |
|-------|--------------|---------|-----------------|---------|---------------|-------------|---------|----------------|

### Revenue Milestones (required)
- Month to first $1K MRR
- Month to $10K MRR
- Month to breakeven (if within time horizon)

## 4. Unit Economics

For each metric (all required):

### CAC
- Calculation (required): Formula with actual numbers
- Benchmark comparison (required): vs. SaaS industry standard
- Assessment (required): Healthy / needs improvement / concerning

### LTV
- Calculation (required): Formula with actual numbers
- Benchmark comparison (required)
- Assessment (required)

### LTV:CAC Ratio
- Calculation (required)
- Benchmark comparison (required): vs. 3:1 standard
- Assessment (required)

### Payback Period
- Calculation (required): In months
- Benchmark comparison (required)
- Assessment (required)

### Gross Margin
- Calculation (required): Revenue - COGS breakdown
- COGS itemization (required): Hosting, LLM costs, payment processing, support
- Benchmark comparison (required): vs. 70-80% SaaS standard
- Assessment (required)

## 5. Cost Structure

### Fixed Costs (required)
| Category | Monthly Cost | Notes |
|----------|-------------|-------|

### Variable Costs (required)
| Category | Cost Driver | Cost per Unit | Projected Monthly at Scale |
|----------|-------------|--------------|---------------------------|

### LLM Costs (conditional — required if product uses AI)
- Cost per request (required)
- Requests per user per month (required)
- Monthly LLM cost at current scale (required)
- Monthly LLM cost at projected scale (required)
- LLM cost as % of revenue (required)
- Optimization levers (required): Strategies to reduce LLM cost

### Burn Rate and Runway (required)
- Monthly burn (required): At current state
- Projected monthly burn (required): At 12-month point
- Runway (required): Months of operation at current burn with current/projected cash

## 6. Scenario Analysis

### Three Scenarios (required)
| Parameter | Pessimistic | Base | Optimistic |
|-----------|-------------|------|------------|

For each scenario (required):
- 12-month ARR
- Month to breakeven
- LTV:CAC ratio
- Runway consumed
- Key difference from base case

### Sensitivity Analysis (required)
Top 3 variables that change the outcome most:
- Variable name
- Base value → Pessimistic value
- Impact on outcome (quantified)

### Key Risks (required, at least 2)
- Risk description
- Probability: High/Medium/Low
- Impact if realized
- Mitigation

## 7. Viability Assessment

### Verdict (required)
- Viable / Conditionally viable / Not viable under current assumptions
- Rationale (required): 2-3 sentences grounding the verdict in the numbers

### Conditions for Viability (conditional — required if "conditionally viable")
- What would need to be true for this to work?

### Validation Priorities (required)
- Top 3 assumptions to validate first, with suggested methods

### Decision Milestones (required)
- Checkpoint-based go/no-go criteria with specific metrics and timelines

## 8. Assumptions Register (required)

| # | Assumption | Value | Source | Confidence | Impact if Wrong |
|---|-----------|-------|--------|------------|-----------------|

Every number in the model must trace back to an entry in this register.
```

## Validation Rules

1. Every number in the revenue projection traces to a stated assumption in the register
2. Unit economics formulas are correct and show the calculation (not just the result)
3. Three scenarios are modeled with different parameter values
4. LTV:CAC ratio is calculated and benchmarked
5. At least 12 months of MRR projection in the build-up table
6. Assumptions register is complete — no orphan numbers
7. Viability verdict is grounded in the model (not a separate opinion)

## Confidence Tagging

- **High [H]:** Based on real data — actual revenue, measured churn, known costs, verified market data
- **Medium [M]:** Based on informed estimates — industry benchmarks, competitor analysis, expert judgment
- **Low [L]:** Based on assumptions — founder's estimate, unvalidated hypothesis, analogies from different markets

For pre-launch products, most assumptions will be Medium or Low. This is expected — the model's value is making assumptions explicit so they can be validated, not pretending certainty.
