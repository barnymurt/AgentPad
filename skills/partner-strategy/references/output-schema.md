# Partner Strategy Output Schema

## Consumes
- context.product - Product context
- context.target_audience - Target users

## Produces
- context.partner_strategy - Strategy document

## Output Structure

### Section 1: Partnership Goals (required)
- objectives: array - Partnership objectives
- target_types: array - Partner types

### Section 2: Partner Identification (required)
- partners: array - Potential partners
- assessment: object - Fit assessment

### Section 3: Outreach Strategy (required)
- approach: string - Outreach approach
- value_prop: string - Partner value proposition
- terms: object - Partnership terms

### Section 4: Management Plan (required)
- onboarding: object - Partner onboarding
- metrics: array - Success metrics
- communication: string - Communication plan
