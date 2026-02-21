# Paid Acquisition Output Schema

## Consumes
- context.product - Product context
- context.target_audience - Target users
- context.budget - Available budget

## Produces
- context.paid_strategy.channels - Selected channels
- context.paid_strategy.campaigns - Campaign plans

## Output Structure

### Section 1: Channel Selection (required)
- channels: array - Selected paid channels
- rationale: string - Why these channels

### Section 2: Campaign Strategy (required)
- campaigns: array - Campaign definitions
- objectives: array - Campaign goals
- budgets: object - Budget per campaign

### Section 3: Creative Requirements (required)
- formats: array - Ad formats needed
- brief: string - Creative brief

### Section 4: Setup Plan (required)
- platforms: array - Platform setup
- tracking: object - Tracking setup
- timeline: string - Implementation timeline
