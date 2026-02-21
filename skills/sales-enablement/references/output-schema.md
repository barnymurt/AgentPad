# Sales Enablement Output Schema

## Consumes
- context.product - Product context
- context.competitors - Competitive landscape

## Produces
- context.sales_materials - Created materials

## Output Structure

### Section 1: Materials List (required)
- materials: array - Required materials

### Section 2: Pitch Deck (required)
- slides: array - Deck outline
- structure: string - Presentation flow

### Section 3: Battlecards (required)
- competitors: array - Competitive cards
- objections: array - Objection responses

### Section 4: Competitive Analysis (required)
- comparison: object - Feature comparison
- differentiators: array - Key differences
