# Analyst Relations Output Schema

## Consumes
- context.product - Product context
- context.target_audience - Target users

## Produces
- context.analyst_relations - Strategy

## Output Structure

### Section 1: Analyst Identification (required)
- analysts: array - Target analysts
- sites: array - Review sites
- priorities: array - Priority list

### Section 2: Strategy (required)
- outreach: string - Approach
- briefings: array - Briefing plan
- content: array - Content plan

### Section 3: Review Management (required)
- g2: object - G2 strategy
- capterra: object - Capterra strategy
- response: string - Response process

### Section 4: Measurement (required)
- metrics: array - What to track
- reporting: string - Reporting plan
