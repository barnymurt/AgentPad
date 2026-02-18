# Output Schema: Validation Pack

This file defines the exact structure of the Validation Pack deliverable. The Validation Pack is a composite artifact assembled from 7 chained skills. Every output must conform to this schema. Fields marked (required) must be populated; fields marked (conditional) are included when relevant.

**Reference:** See `docs/plans/validation-pack-design.md` for the full design specification, data contracts, and matrix definitions.

## Output Structure

```
# Validation Pack: [Product Name]

**Date:** [generation date]
**Idea:** [one-sentence product description]
**Target Market:** [primary customer segment]
**Revenue Model:** [subscription / usage-based / freemium / hybrid]
**Skills Run:** [list of skills executed, noting any gates that triggered]
**Overall Recommendation:** GO / PAUSE / KILL

---

## 1. Validation Scorecard

### Recommendation (required)
- Verdict (required): GO / PAUSE / KILL
- Rationale (required): 2-3 sentences grounding the verdict in the metrics below
- Gate history (conditional): If any decision gate triggered PAUSE or KILL during execution, state which gate, why, and whether the user overrode it

### Key Metrics (required, all 7)

| # | Metric | Value | Rating | Source |
|---|--------|-------|--------|--------|
| 1 | Competitive density | [N direct competitors] | Good / Warning / Critical | Competitor Research |
| 2 | Differentiation gap | [N gaps at M+ confidence] | Good / Warning / Critical | Competitor Research |
| 3 | TAM/SAM/SOM | [SOM value] | Good / Warning / Critical | Business Case Modeling |
| 4 | Unit economics health | [LTV:CAC ratio] | Good / Warning / Critical | Business Case Modeling |
| 5 | Assumption risk score | [N Fatal/Major + Low confidence] | Good / Warning / Critical | Devil's Advocate |
| 6 | MVP complexity | [S / M / L] | Good / Warning / Critical | Feature Prioritization + Requirements |
| 7 | Time to value | [Minutes / Hours-Days / Weeks+] | Good / Warning / Critical | User Journey Mapping |

Rating thresholds (required — apply these):
- Competitive density: Good = 1-3, Warning = 4-6, Critical = 7+
- Differentiation gap: Good = 3+ gaps, Warning = 1-2 gaps, Critical = 0 gaps
- TAM/SAM/SOM: Good = SOM > $10M, Warning = $1-10M, Critical = < $1M
- Unit economics: Good = LTV:CAC > 3:1, Warning = 1-3:1, Critical = < 1:1
- Assumption risk: Good = 0-1 unvalidated fatal/major, Warning = 2-3, Critical = 4+
- MVP complexity: Good = S (1-3 features, 0-2 deps), Warning = M (4-6, 3-5), Critical = L (7+, 6+)
- Time to value: Good = Minutes, Warning = Hours-Days, Critical = Weeks+

### Recommendation Logic (required — apply this):
- GO: 0 Critical metrics AND ≤ 1 Warning metric
- PAUSE: 1 Critical metric OR 3+ Warning metrics
- KILL: 2+ Critical metrics (or triggered by a decision gate)

### Confidence Statement (required)
- Overall data quality (required): What % of metrics are backed by High/Medium/Low confidence data
- Key caveat (required): The single most important limitation of this analysis

---

## 2. Three Matrices

### 2a. Importance vs. Proof Matrix (Assumption Risk)

Purpose: "What could kill this idea?"

#### Assumption Plot (required, minimum 8, maximum 15)

| # | Assumption | Category | Importance | Proof Level | Quadrant |
|---|-----------|----------|-----------|-------------|----------|
| 1 | [assumption text] | Problem / Customer / Solution / Market / Business Model / Timing | Fatal / Major / Minor | Validated / Partial / Unvalidated | Validate First / Known Strength / Monitor / Nice to Know |

Sources: Devil's Advocate Section 1 (Decomposed Assumptions) + Business Case Modeling Section 8 (Assumptions Register)

Rules:
- Deduplicate across sources; when same assumption appears with different confidence, use lower (conservative)
- Sort by quadrant: Validate First at top, then Known Strengths, then Monitor, then Nice to Know

#### Interpretation (required)
- 2-3 sentences explaining what the matrix reveals for this specific idea
- Count of assumptions in each quadrant
- The #1 assumption to validate first, with its recommended test

### 2b. Risk-Value Matrix (Opportunity Assessment)

Purpose: "Is the upside worth the downside?"

#### Value Score (required)
| Component | Source | Raw Value | Weight | Weighted Score |
|-----------|--------|-----------|--------|----------------|
| Market size (SOM) | Business Case Modeling | [SOM value] → [1-10] | 30% | [calculated] |
| Differentiation gap | Competitor Research | [gap count/strength] → [1-10] | 30% | [calculated] |
| Unit economics health | Business Case Modeling | [LTV:CAC] → [1-10] | 40% | [calculated] |
| **Total Value Score** | | | | **[1-10]** |

Scale mapping (required — apply these):
- Market size: SOM < $1M = 1-3, $1-10M = 4-6, $10M+ = 7-10
- Differentiation: No gaps = 1-2, minor gaps = 3-5, clear whitespace = 6-8, blue ocean = 9-10
- Unit economics: LTV:CAC < 1 = 1-2, 1-2 = 3-4, 2-3 = 5-6, 3-5 = 7-8, 5+ = 9-10

#### Risk Score (required)
| Component | Source | Raw Value | Weight | Weighted Score |
|-----------|--------|-----------|--------|----------------|
| Competitive density | Competitor Research | [competitor count] → [1-10] | 30% | [calculated] |
| Assumption risk | Devil's Advocate | [unvalidated fatal/major count] → [1-10] | 40% | [calculated] |
| Technical complexity | Requirements Elicitation | [constraints + deps] → [1-10] | 30% | [calculated] |
| **Total Risk Score** | | | | **[1-10]** |

Scale mapping (required — apply these):
- Competitive density: 1-2 competitors = 1-3, 3-5 = 4-6, 6+ = 7-10
- Assumption risk: 0-1 unvalidated fatal/major = 1-3, 2-3 = 4-6, 4+ = 7-10
- Technical complexity: Low = 1-3, Medium = 4-6, High = 7-10

#### Quadrant Position (required)
- Position (required): [Value score, Risk score] → quadrant name
- Quadrant labels: Go (high value, low risk) / Consider (low value, low risk) / Validate (high value, high risk) / Walk Away (low value, high risk)
- Threshold: Value ≥ 6 = "high value", Risk ≤ 4 = "low risk"

#### Interpretation (required)
- 2-3 sentences explaining the opportunity assessment for this specific idea

### 2c. Impact-Effort Matrix (MVP Scoping)

Purpose: "What should I build first?"

#### Feature Plot (required, all Tier 1 and Tier 2 features)

| # | Feature | Impact Score | Effort Score | Quadrant |
|---|---------|-------------|-------------|----------|
| 1 | [feature name] | [1-10] | [1-10] | Quick Win / Big Bet / Fill-in / Deprioritise |

Sources:
- Impact: Feature Prioritization RICE Impact score (1-5) × primary persona pain severity for that feature's addressed pain point (1-2 multiplier)
- Effort: Feature Prioritization RICE Effort score (1-5) × Requirements Elicitation dependency complexity (1-2 multiplier)

Quadrant labels:
- Quick Win: Impact ≥ 6, Effort ≤ 4 — build these first (MVP core)
- Big Bet: Impact ≥ 6, Effort ≥ 5 — schedule for post-MVP
- Fill-in: Impact ≤ 5, Effort ≤ 4 — build if time permits
- Deprioritise: Impact ≤ 5, Effort ≥ 5 — not worth building now

#### Interpretation (required)
- 2-3 sentences explaining the MVP scope implications
- The recommended build order based on quadrant positions

---

## 3. Competitive Positioning Map

### Axes (required)
- X-axis (required): [Dimension name] — chosen from the two Comparison Matrix dimensions where the user's product has the largest positive gap vs. competitors
- Y-axis (required): [Dimension name] — second most differentiating dimension

### Plotted Competitors (required, minimum 3)

| Competitor | X Score | Y Score | Category |
|-----------|---------|---------|----------|
| [competitor name] | [1-5] | [1-5] | Direct / Indirect / Emerging |
| **[User's product]** | **[projected]** | **[projected]** | **Target position** |

### Whitespace Annotation (required)
- 2-3 sentences explaining where the opportunity lies and why the user's product can occupy that position

---

## 4. Assumption Register

### Consolidated Assumptions (required, minimum 8, maximum 15)

| # | Assumption | Category | Importance | Proof Level | Validation Test | Timeline | Decision Criteria | Priority |
|---|-----------|----------|-----------|-------------|-----------------|----------|-------------------|----------|
| 1 | [assumption text] | Problem / Customer / Solution / Market / Business Model / Timing | Fatal / Major / Minor | Validated / Partial / Unvalidated | [specific test] | [timeframe] | [what constitutes pass/fail] | Validate First / Monitor / Known |

Sources: Business Case Modeling Section 8 + Devil's Advocate Sections 1-2

Rules:
- Sorted by Priority: Validate First at top
- Deduplicated across sources
- Every "Validate First" entry MUST have: a specific validation test (not "do more research"), a timeline, and decision criteria
- When same assumption appears in both sources with different confidence, use lower confidence (conservative)

### Summary (required)
- Total assumptions: [N]
- Validate First: [N] — these block progress
- Monitor: [N] — track but don't block
- Known: [N] — validated, foundation of the case

---

## 5. Objection Bank

### Top Objections (required, 5-7 by strength)

| # | Objection | Category | Prevalence | Strength | Rebuttal Strategy | Unresolved Risk |
|---|----------|----------|-----------|----------|-------------------|-----------------|
| 1 | "[objection in customer's voice]" | Price / Trust / Switching / Need / Timing | Est. % of market | 1-Easy / 2-Moderate / 3-Significant / 4-Deal-breaker | [acknowledge, reframe, evidence, action] | [remaining risk if any] |

Source: Devil's Advocate Section 4 (Customer Objection Model)

### Objection Landscape Summary (required)
- 2-3 sentences assessing overall defensibility of the product's pitch
- The single strongest objection and whether the rebuttal is convincing
- Recommendation: any product changes needed to address objections

---

## 6. MVP Scope Definition

### The Statement (required)
> Version 1 solves [problem] for [primary persona name and role] with these [N] features:

### Feature List (required, from Feature Prioritization Tier 1)

| # | Feature | RICE Score | Persona Pain Addressed | Journey Stage | Effort |
|---|---------|-----------|----------------------|---------------|--------|
| 1 | [feature name] | [composite score] | [which pain point it resolves, from which persona] | [which journey stage it enables] | [T-shirt: S/M/L] |

### Excluded (required, minimum 1)
- [Feature name]: [why deferred] — from Feature Prioritization Tier 3 + Requirements "Won't Have"

### First Milestone (required)
- What "shipped" looks like (required): 2-3 sentences defining the minimum viable release
- Estimated timeline (conditional): If inferable from effort estimates
- Success criteria (required): How to know if the MVP is working (specific metric + threshold)

### Journey Validation (required)
- Does the MVP feature set cover the critical path from Awareness to Activation? (required): Yes / No / Partial
- Gaps identified (conditional): If the journey mapping revealed missing steps
- Recommendation (conditional): Features to add to close journey gaps

---

## 7. Risk Register

### Top 5 Risks (required, exactly 5)

| # | Risk | Source | Likelihood | Impact | Severity | Mitigation | Owner |
|---|------|--------|-----------|--------|----------|------------|-------|
| 1 | [risk description] | BCM / DA / CR | High / Medium / Low | Fatal / Major / Minor | [L × I composite] | [specific action, not "monitor"] | [role responsible] |

Sources:
- Business Case Modeling Section 6: Key Risks
- Devil's Advocate Section 5: Blind Spots
- Competitor Research Section 5: Competitive Risks

Rules:
- Exactly 5 risks (the most dangerous)
- Deduplicated and merged across sources
- Sorted by Severity (Likelihood × Impact)
- Every mitigation is a specific, actionable step (not "be aware of" or "monitor")

### Risk Summary (required)
- Overall risk profile (required): 1-2 sentences characterizing the risk landscape
- Highest-severity risk (required): Name it and state the mitigation timeline

---

## 8. What to Do Next (required)

### Recommended Next Skills (required, 3-5 recommendations)

Based on the pack results, recommend specific AgentPad skills the founder should run next. Each recommendation must reference a specific finding from the pack that creates the need.

**Conditional logic (apply all that match, in order):**

| Condition | Recommendation |
|-----------|---------------|
| Assumption Register has 3+ "Validate First" items | **Interview Guide Creation** — "You have [N] unvalidated assumptions. Generate a targeted interview script to test your top assumptions ([list top 2-3]) with real users before building." |
| Objection Bank has any Strength 3-4 objections | **Brand Messaging Framework** — "Your strongest objection ('[objection text]') needs positioning that addresses it head-on. Generate messaging that reframes this objection." |
| Business Case verdict is "Conditionally Viable" or unit economics Warning | **Pricing Strategy** — "Your unit economics are conditional on pricing holding at [price]. Model optimal price points using your competitive positioning data." |
| Validation Scorecard has any Warning metrics | **Survey Design** — "Your [metric name] metric rated Warning. Design a quick validation survey to gather data and strengthen this score." |
| Always include | **Go-to-Market Strategy** — "Turn this validation into a launch plan. Generate a GTM strategy based on your competitive gaps and persona pain points." |

Format (required):
> **Recommended: [Skill Name]**
> [1-2 sentences explaining WHY this skill is relevant to THIS specific pack, referencing specific data points]

### Methodology Appendix (required)

- Skills executed (required): Ordered list of all 7 skills run (or fewer if gates triggered early)
- Gates evaluated (required): Which gates were reached, what the outcome was
- Data quality (required): Overall % of inputs at High / Medium / Low confidence
- Time to produce (conditional): If tracked
- Key limitations (required): What could change the conclusions (minimum 2)

---

## 9. Notion Workspace Specification (required for full packs, excluded from partial packs)

After producing Sections 1-8, generate a Notion workspace specification using the prompt template in `skills/validation-pack/references/notion-workspace-prompt.md`.

### Purpose
Transforms the static Validation Pack into an actionable, interactive Notion workspace with databases, views, and decision-specific pages. This is the "what to do next" artifact — while Sections 1-8 answer "should I build this?", the workspace answers "how do I organize the build?"

### Decision Mapping
The workspace adapts its structure based on the Validation Scorecard verdict:
- **GO** → Sprint planning pages + Launch Checklist
- **PAUSE** → Mapped to PIVOT: Hypothesis Board + Pivot Decision Log + Original Idea Archive
- **KILL** → Mapped to NO-GO: Post-Mortem + Transferable Assets + Market Insights Archive + Future Opportunity Radar

### Required Components (all decisions)
1. Start Here page with pre-flight checklist
2. Dashboard with embedded database views (including Active Experiments)
3. Assumption Tracker database (pre-populated from Section 4)
4. Validation Experiments database (auto-seeded from "Validate First" assumptions, with Skill Tips)
5. MVP Backlog database (pre-populated from Section 6)
6. Risk Register database (pre-populated from Section 7)
7. Competitive Landscape table (pre-populated from Section 3)
8. Roadmap database with auto-seeded items (including Skill Tips in Launch phase notes)
9. Weekly Review Template page

### Validation Rules
- All template variables resolved against actual pack data (no `{{variable}}` in output)
- Empty source arrays produce placeholder rows with `[FILL IN]`
- Decision-specific pages match the mapped verdict only
- Field mappings follow the Data Mapping table in the prompt template
- Priority and Sprint auto-assignment rules applied to MVP Backlog
- Severity auto-assignment rules applied to Risk Register
- Validation Experiments database auto-seeded from "Validate First" assumptions
- Skill Tips included in Validation Experiments callout, Roadmap Launch phase notes, and Launch Checklist callout
- Weekly Review Template page present for all decisions
- Launch Checklist (GO path) references pack-specific data, not generic items
```

## Validation Rules

1. All 9 sections populated for full packs (or partial pack sections if gates triggered early — Section 9 excluded from partial packs)
2. Validation Scorecard has all 7 metrics with ratings and a clear GO/PAUSE/KILL verdict
3. Three matrices each have plotted data points and 2-3 sentence interpretations
4. Assumption Register has minimum 8 entries, sorted by priority, with validation tests for all "Validate First" items
5. Objection Bank has 5-7 objections with rebuttals and a landscape summary
6. MVP Scope Definition has a clear feature list with persona pain mapping and journey stage mapping
7. Risk Register has exactly 5 risks with specific mitigations
8. No placeholder text in Sections 1-8: no `[TODO]`, `[TBD]`, `[placeholder]`, or `[...]` (Section 9 uses `[FILL IN]` intentionally for user-completed fields)
9. Cross-references are consistent: features in MVP Scope match Tier 1 from Feature Prioritization, assumptions in the register match those challenged by Devil's Advocate
10. Recommendation logic is correctly applied (GO/PAUSE/KILL matches metric ratings per the stated thresholds)
11. Section 9 (Notion Workspace): all template variables resolved, decision-specific pages match mapped verdict, databases pre-populated from Sections 3-7, Validation Experiments auto-seeded, Weekly Review Template present, Launch Checklist (GO) references pack-specific data, Skill Tips included

## Partial Pack Validation Rules (when gates trigger early)

1. Validation Scorecard present with PAUSE or KILL verdict and gate trigger explanation
2. All matrices populated up to the point of termination
3. Assumption Register present (even if only from Requirements Elicitation assumptions)
4. Conditions for reconsideration stated (what would need to change)
5. Recommended next steps provided (not just "idea killed")

## Confidence Tagging

The Validation Pack inherits confidence from its source skills. The Methodology Appendix (Section 8) must report the aggregate confidence distribution.

- **High:** Metric or finding backed by multiple corroborating sources across skills (e.g., competitive risk identified by both Competitor Research and Devil's Advocate)
- **Medium:** Metric or finding from a single skill with Medium+ confidence data
- **Low:** Metric or finding based on assumptions or Low-confidence data from source skills

When the overall pack has >50% Low-confidence inputs, the Validation Scorecard must include a prominent caveat: "This analysis is heavily assumption-based. Validate key assumptions before making investment decisions."
