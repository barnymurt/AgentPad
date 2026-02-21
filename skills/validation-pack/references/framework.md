# Validation Pack Framework

## Overview

The Validation Pack orchestrates 7 skills into a cohesive validation artifact. This framework defines the methodology for each skill, the decision gate logic, and the synthesis process.

---

## Skill Methodologies

### 1. Requirements Elicitation

**Purpose:** Extract structured context from raw idea

**Method:**
1. Parse problem statement into discrete pain points
2. Identify target users (primary + secondary roles)
3. Document current solution alternatives
4. Capture scope constraints (budget, timeline, team)
5. List known assumptions

**Scoring:** N/A — this is input preparation

---

### 2. User Persona Creation

**Purpose:** Build behavior-driven personas

**Method:**
1. Define demographic baseline for each role
2. Articulate Jobs-to-be-Done (functional, emotional, social)
3. Document current workflow and tools used
4. Rank pain points by severity (1-5)
5. Define decision criteria with weighting
6. Assess SaaS attributes (switching costs, adoption cycle)

**Output:** 2-3 personas with confidence scores

---

### 3. Competitor Research

**Purpose:** Map competitive landscape

**Method:**
1. Define competitive arena (JTBD-based)
2. Profile 5-8 competitors:
   - Product description
   - Pricing model
   - Key features
   - Strengths/weaknesses
3. Build comparison matrix with weighted dimensions
4. Conduct gap analysis (segment + feature)
5. Generate positioning recommendations

**Scoring:**
- Competitive density: count of direct competitors
- Gap strength: confidence-weighted gap identification

---

### 4. Business Case Modeling

**Purpose:** Validate financial viability

**Method:**
1. Size market (TAM/SAM/SOM with confidence intervals)
2. Model revenue scenarios (conservative/base/optimistic)
3. Calculate unit economics (LTV, CAC, LTV:CAC, payback period)
4. Project financials (revenue, costs, runway)
5. Run scenario analysis (sensitivity to key assumptions)
6. Document assumptions with sources and confidence

**Scoring:**
- Viability verdict: Viable / Conditionally Viable / Not Viable
- Based on LTV:CAC >= 3.0 (base), path to breakeven

---

### 5. Devil's Advocate

**Purpose:** Stress-test assumptions

**Method:**
1. Decompose all assumptions from prior skills
2. Categorize: Problem, Customer, Solution, Market, Business Model, Timing
3. Assess certainty (High/Medium/Low) and impact if wrong (Minor/Major/Fatal)
4. Design validation tests for each assumption
5. Challenge value proposition with 5 Whys
6. Model customer objections (prevalence, strength, rebuttals)
7. Identify blind spots

**Scoring:**
- Verdict: Strong / Promising / Needs Work / Fundamental Concerns
- Based on count of Fatal-impact assumptions with Low certainty

---

### 6. Feature Prioritization

**Purpose:** Rank features for MVP

**Method:**
1. Gather feature list from Requirements
2. Score using RICE framework:
   - Reach: How many users per quarter?
   - Impact: How much does it help? (3/2/1/0.5/0.25)
   - Confidence: How certain are the estimates?
   - Effort: Person-weeks required
3. Calculate RICE score: (Reach × Impact × Confidence) / Effort
4. Sort into tiers:
   - Tier 1: Build Now (RICE > 20)
   - Tier 2: Validate First (RICE 10-20)
   - Tier 3: Park (RICE < 10)
5. Identify dependencies
6. Apply regret test (would we regret not building?)

---

### 7. User Journey Mapping

**Purpose:** Validate MVP scope through journey

**Method:**
1. Select primary persona
2. Map journey stages: Awareness → Consideration → Activation → Retention → Referral
3. Identify Moment of Truth triggers in each stage
4. Overlay Tier 1 features onto journey
5. Define "shipped" milestone (what does done look like?)
6. Estimate time-to-value

---

## Decision Gate Logic

### Gate 1: Competitive Viability

**Trigger (PAUSE):**
```
competitive_count >= 5 AND 
(underserved_segments is empty OR all gaps LOW confidence) AND
feature_gaps_addressed_by_2+_competitors
```

**Output:** PAUSE with pivot recommendations

---

### Gate 2: Financial Viability

**Trigger (KILL):**
```
verdict == "Not viable" AND
pessimistic_no_breakeven AND
ltv_cac < 1.0 (both scenarios)
```

**Trigger (CONDITIONAL):**
```
verdict == "Conditionally viable"
```

---

### Gate 3: Assumption Integrity

**Trigger (KILL):**
```
verdict == "Fundamental Concerns" AND
fatal_low_certainty_assumptions >= 2 AND
value_prop_score <= 1
```

---

## Matrix Calculations

### Matrix 1: Importance vs. Proof

| Axis | Data Source | Scale |
|------|-------------|-------|
| X: Proof Level | Confidence: L=Unvalidated, M=Partial, H=Validated | 3-point |
| Y: Importance | Impact if Wrong: Minor→Major→Fatal | 3-point |

### Matrix 2: Risk-Value

**Value (1-10):**
- Market size (TAM/SAM/SOM): 30%
- Differentiation gap: 30%
- Unit economics (LTV:CAC): 40%

**Risk (1-10):**
- Competitive density: 30%
- Assumption risk (count Fatal+Low): 40%
- Technical complexity: 30%

### Matrix 3: Impact-Effort

| Axis | Source |
|------|--------|
| Y: Impact | RICE Impact × Pain Severity |
| X: Effort | RICE Effort (1-5) |

---

## Quality Thresholds

| Element | Minimum | Maximum |
|---------|---------|---------|
| Assumptions in Register | 8 | 15 |
| Features in Matrix | Tier 1+2 | Tier 1+2 |
| Risks in Register | 5 | 10 |
| Competitor Profiles | 5 | 8 |
| Persona Pain Points | 3 | 7 per persona |

---

## Common Pitfalls

1. **Skipping gates** — Always evaluate gate conditions explicitly
2. **Generic data points** — Each matrix point must be specific to this idea
3. **Missing validation tests** — Every assumption needs specific test + timeline
4. **Ignoring overrides** — User can always override gate decisions
5. **Inconsistent personas** — All skills must reference the same personas
