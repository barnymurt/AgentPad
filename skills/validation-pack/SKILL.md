---
name: validation-pack
description: Chains 7 skills into a complete validation deliverable. Use when user wants to validate a product idea — produces GO/PAUSE/KILL recommendation with competitive analysis, financial model, and MVP scope.
---

# Validation Pack

The Validation Pack is a comprehensive artifact that answers: **"Is this idea worth building, and if so, what specifically should I build first?"**

It orchestrates 7 skills in sequence: Requirements Elicitation → User Persona Creation → Competitor Research → Business Case Modeling → Devil's Advocate → Feature Prioritization → User Journey Mapping.

Three decision gates can halt the flow early with a KILL or PAUSE recommendation. Three industry-recognized matrices (Importance vs. Proof, Risk-Value, Impact-Effort) give the output institutional credibility.

## Core Workflow

### Step 0: Input Validation

- Confirm user has provided: problem statement, target market, current solution alternatives
- If input is sparse, request clarification before proceeding
- **Quality gate:** Minimum 3 bullet points for problem, clear target user description

### Step 1: Requirements Elicitation

- Extract structured context from raw idea
- Document problem statement, scope, assumptions, constraints
- Output feeds Step 2

### Step 2: User Persona Creation

- Build behavior-driven personas from target user description
- Define JTBD, pain points, decision criteria
- Output feeds Step 3

### Step 3: Competitor Research

- Map competitive landscape for the defined JTBD
- Identify direct, indirect, and emerging competitors
- Document pricing, features, gaps
- **GATE 1: Competitive Viability** — If saturated with no gaps → PAUSE recommendation

### Step 4: Business Case Modeling

- Model TAM/SAM/SOM, revenue scenarios, unit economics
- Calculate LTV:CAC, payback period, runway
- **GATE 2: Financial Viability** — If economics broken → KILL recommendation

### Step 5: Devil's Advocate

- Stress-test accumulated assumptions
- Challenge value proposition, identify blind spots
- Model customer objections
- **GATE 3: Assumption Integrity** — If fatal unvalidated assumptions → KILL recommendation

### Step 6: Feature Prioritization

- Score features using RICE framework
- Rank into tiers: Build Now, Validate First, Park
- Output feeds Step 7

### Step 7: User Journey Mapping

- Map MVP feature set through user journey stages
- Identify Moment of Truth triggers
- Define "shipped" milestone

### Step 8: Synthesis

- Compile Validation Pack document with:
  - Validation Scorecard (GO/PAUSE/KILL)
  - Three Matrices
  - Competitive Positioning Map
  - Assumption Register
  - Objection Bank
  - MVP Scope Definition
  - Risk Register

## Output Format

The output follows the structure defined in [output-schema.md](output-schema.md):

- **Section 1:** Validation Scorecard — GO/PAUSE/KILL with 7 key metrics
- **Section 2:** Three Matrices — Importance vs. Proof, Risk-Value, Impact-Effort
- **Section 3:** Competitive Positioning Map — 2x2 with gaps identified
- **Section 4:** Assumption Register — consolidated from BCM and DA
- **Section 5:** Objection Bank — top customer objections with rebuttals
- **Section 6:** MVP Scope — Tier 1 features with RICE scores
- **Section 7:** Risk Register — top 5 consolidated risks

## Quality Criteria

- [ ] Output follows the defined schema (all required sections populated)
- [ ] All three decision gates evaluated with clear verdicts
- [ ] Matrices include at least 8 data points, maximum 15
- [ ] Assumption Register includes specific validation tests with timelines
- [ ] MVP scope includes T-shirt size estimation
- [ ] Risk Register includes specific mitigations, not generic advice
- [ ] User can override any gate decision and continue

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [output-schema.md](output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Running gates without triggering them:** Ensure gate conditions are explicitly checked and reported
2. **Generic matrices:** Each data point must be specific to this idea, not boilerplate
3. **Missing validation tests:** Assumption register entries must include specific tests, not just "validate this"
4. **Ignoring overrides:** Always offer user the option to override gate decisions
5. **Token overflow:** Implement checkpointing for long chains; warn user if approaching limits
