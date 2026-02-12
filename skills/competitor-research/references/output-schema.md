# Output Schema: Competitor Research

This file defines the exact structure of the Competitor Research skill output. Every output must conform to this schema. Fields marked (required) must be populated; fields marked (conditional) are included when relevant data exists.

## Output Structure

```
# Competitive Landscape Analysis: [Product Name]

## 1. Competitive Arena Definition
- Product summary (required): 2-3 sentences
- Job-to-be-done (required): What problem customers hire this product to solve
- Scope (required): Market segment, geography, customer budget range
- Arena boundaries (required): What's in scope and what's excluded, and why

## 2. Competitor Profiles

### [Competitor Name] — [Direct/Indirect/Emerging]

#### Product
- Core offering (required): What they do in 1-2 sentences
- Key features (required): 5-8 most relevant features
- Platform (required): Web, mobile, desktop, API
- Integrations (conditional): Notable integrations if relevant
- UX quality (required): Brief assessment with evidence

#### Pricing
- Model (required): Freemium/trial/per-seat/usage/flat-rate
- Price points (required): Specific tiers and prices, or "not publicly listed"
- Free tier (conditional): What's included free
- Enterprise pricing (conditional): If mentioned

#### Target Market
- Primary segment (required): Who they sell to
- Company size (required): SMB/mid-market/enterprise
- Industry focus (conditional): Vertical specialization if any

#### Positioning
- Tagline/headline (required): How they describe themselves
- Key messaging (required): 2-3 core messaging themes
- Brand tone (required): Professional/casual/technical/aspirational

#### Traction
- Funding (conditional): Total raised, last round, investors
- Revenue signals (conditional): Public revenue, customer count, growth claims
- Team size (conditional): Approximate headcount
- Growth indicators (required): At least one signal (hiring, expansion, product velocity)

#### Strengths
- 3-5 specific strengths (required): Each with supporting evidence

#### Weaknesses
- 3-5 specific weaknesses (required): Each with supporting evidence (reviews, missing features, complaints)

#### Strategic Direction
- Recent moves (required): Last 6-12 months of notable changes
- Likely next moves (conditional): Inferred from signals
- Threat assessment (required): Low/Medium/High threat to user's product, with reasoning

**Confidence:** [High/Medium/Low] — [Primary data sources used]

[Repeat for each competitor — minimum 3, target 5-10]

## 3. Comparison Matrix

| Dimension | [Comp 1] | [Comp 2] | [Comp 3] | ... |
|-----------|----------|----------|----------|-----|
| Product (1-5) | | | | |
| Pricing competitiveness (1-5) | | | | |
| Target market overlap (1-5) | | | | |
| Positioning clarity (1-5) | | | | |
| Traction/momentum (1-5) | | | | |
| Strengths vs. user (1-5) | | | | |
| Weakness exploitability (1-5) | | | | |
| Strategic threat (1-5) | | | | |
| **Weighted Total** | | | | |

Weights (required): State which dimensions were weighted higher and why
Ranking (required): Order competitors by overall threat level

## 4. Strategic Gap Analysis

### Underserved Segments
- Segment (required): At least one underserved customer segment
- Evidence (required): Why this segment is underserved
- Opportunity size (conditional): Estimated opportunity if data available

### Feature Gaps
- Gap (required): At least one feature gap across the landscape
- Who needs it (required): Which customer segment
- Why it's missing (conditional): Cost, complexity, or strategic choice

### Pricing Gaps
- Gap (conditional): Unoccupied price points or models
- Opportunity (conditional): Why this gap is exploitable

### Positioning Gaps
- Gap (conditional): Messaging angles nobody owns
- Opportunity (conditional): Why this positioning is viable

### Emerging Threats
- Threat (required): At least one trend or emerging competitor
- Timeline (required): When this could materially impact the landscape
- Severity (required): How much disruption potential

## 5. Recommendations

### Positioning Statement
- Recommended positioning (required): 1-2 sentences
- Rationale (required): Why this positioning works given the landscape

### Differentiation Levers
- Lever 1 (required): Specific differentiator with evidence
- Lever 2 (required): Specific differentiator with evidence
- Lever 3 (conditional): Third differentiator if applicable

### Competitive Risks
- Risk 1 (required): What could go wrong, with trigger conditions
- Risk 2 (required): Second risk
- Mitigation (required): How to reduce exposure for each risk

### Watch List
- Competitor/trend to monitor (required): At least 2 items
- What to watch for (required): Specific signals that indicate action needed
- Review cadence (required): When to re-run this analysis

## 6. Methodology Notes
- Data sources used (required): List of source types
- Data freshness (required): When data was gathered
- Confidence distribution (required): % of findings at High/Medium/Low confidence
- Known limitations (required): What couldn't be determined and why
- Recommended follow-up (conditional): Specific research that would improve confidence
```

## Validation Rules

1. At least 3 competitor profiles, each with all (required) fields populated
2. Comparison matrix includes all profiled competitors with scores 1-5 on all 8 dimensions
3. Weighted totals are arithmetically correct given stated weights
4. Strategic gap analysis contains at least one item per (required) subsection
5. Every recommendation references specific evidence from the competitor profiles
6. Confidence tags are present on every competitor profile
7. Methodology notes are honest about limitations — no false precision

## Confidence Tagging

- **High:** Based on the competitor's own public content — pricing pages, documentation, official blog posts, press releases, published case studies
- **Medium:** Based on third-party sources — G2/Capterra reviews, news articles, industry reports, social media presence, app store data
- **Low:** Based on inference — LinkedIn headcount as team size proxy, funding as revenue proxy, job postings as strategy signals, absence of information as a signal

Apply to each competitor profile as a whole, and additionally to individual data points where confidence differs from the profile-level tag.
