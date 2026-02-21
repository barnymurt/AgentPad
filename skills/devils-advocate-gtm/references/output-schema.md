# Devil's Advocate (GTM) Output Schema

## Consumes
- context.gtm_strategy - GTM strategy to review

## Produces
- context.da_findings - Review findings

## Output Structure

### Section 1: Assumption Register (required)
- assumptions: array - All assumptions
- confidence: object - Confidence levels

### Section 2: Challenge Findings (required)
- challenges: array - Challenges to each assumption
- severity: object - Impact assessment

### Section 3: Blind Spots (required)
- gaps: array - Missing elements
- risks: array - Identified risks

### Section 4: Recommendations (required)
- fixes: array - Priority fixes
- acceptance: array - Accepted risks
- tradeoffs: array - Trade-offs
