# Pricing Launch Output Schema

## Consumes
- context.pricing_strategy - From pricing-strategy skill
- context.product - Product context

## Produces
- context.pricing_launch - Finalized pricing

## Output Structure

### Section 1: Pricing Strategy (required)
- model: string - Pricing model
- rationale: string - Why this pricing

### Section 2: Tier Configuration (required)
- tiers: array - Pricing tiers
- features: object - Feature mapping

### Section 3: Launch Offers (required)
- discount: object - Launch discount
- terms: string - Terms
- duration: string - How long

### Section 4: Documentation (required)
- pricing_page: string - Page content
- faq: array - Pricing FAQ
