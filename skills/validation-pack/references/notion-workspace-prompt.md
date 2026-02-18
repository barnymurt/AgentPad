# Notion Workspace Generation Prompt

This prompt is used as the final output step of the Validation Pack. After completing Batch 1-2 skills and the synthesis step, this prompt generates a structured Notion workspace that transforms the static Validation Pack into an actionable, interactive workspace.

**When to use:** After Step 8 (Synthesis) produces a complete Validation Pack with a GO, PIVOT, or NO-GO decision.

**Input:** The completed Validation Pack data (all context objects from the skill chain).

**Output:** A Notion workspace specification that can be built manually or via the Notion API.

---

## Data Mapping

The prompt uses template variables that map to Validation Pack output fields. This table defines every mapping.

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` (increment on prompt changes) |
| `generated_date` | Runtime | Date the Validation Pack was produced |
| `validation_decision` | Validation Scorecard | Section 1 → Recommendation → Verdict (mapped: GO → GO, PAUSE → PIVOT, KILL → NO-GO) |
| `product_name` | Step 0 input | The product name from user's idea description |
| `persona_summary` | `context.personas` | Primary persona → Identity block (role, context, 1-2 sentence summary) |
| `problem_statement` | `context.requirements` | Section 1 → Problem Statement → `problem` field |
| `differentiators` | `context.competitors` | Section 5 → Recommendations → `differentiation levers` |
| `success_metrics` | Validation Pack | Section 6 (MVP Scope Definition) → First Milestone → `success criteria` + Section 1 → Confidence Statement |
| `assumptions` | Validation Pack | Section 4 (Assumption Register) → all rows |
| `mvp_features` | Validation Pack | Section 6 (MVP Scope Definition) → Feature List → all rows |
| `risks` | Validation Pack | Section 7 (Risk Register) → all rows |
| `competitors` | Validation Pack | Section 3 (Competitive Positioning Map) → Plotted Competitors → all rows |
| `recommended_next_steps` | Validation Pack | Section 8 (What to Do Next) → `Recommended Next Skills` |
| `top_objection` | Validation Pack | Section 5 (Objection Bank) → highest Strength objection → `objection text` |
| `activation_moment` | `context.journey` | User Journey Mapping → Activation stage → highest-emotion touchpoint description |
| `business_case_price` | `context.business_case` | Business Case Modeling → Pricing Structure → primary price point |
| `persona_1_name` | `context.personas` | Primary persona → name |
| `risk_1` | Validation Pack | Section 7 (Risk Register) → row 1 → `risk description` |
| `top_unvalidated_assumption` | Validation Pack | Section 4 (Assumption Register) → first "Validate First" row → `assumption text` |

### Decision Mapping

The Validation Pack uses GO/PAUSE/KILL. The Notion workspace uses GO/PIVOT/NO-GO. Map as follows:

| Validation Pack Verdict | Workspace Decision | Rationale |
|-------------------------|-------------------|-----------|
| GO | GO | Proceed to build — workspace focuses on sprint planning and launch |
| PAUSE | PIVOT | Competitive or conditional issues — workspace focuses on hypothesis testing and pivoting |
| KILL | NO-GO | Economics or assumptions failed — workspace focuses on post-mortem and asset preservation |

---

## Prompt

> **Instruction to AI:** Using the Validation Pack data provided, generate a Notion workspace specification following the structure below. Replace all `{{template_variables}}` with actual data from the pack. Where data is unavailable or cannot be inferred, use `[FILL IN]` as placeholder text. Never invent data — only use what exists in the Validation Pack.

---

### 0. Start Here (Page) — ALWAYS FIRST

**Purpose callout (blue):**
> This workspace was generated from your MVP Validation Pack (v{{template_version}}) on {{generated_date}}.
> Decision: **{{validation_decision}}**
> Use this workspace to organize your build journey based on validated insights.

**How to Use (numbered list):**
1. Review the Dashboard for your priority items
2. Work through assumptions and features sprint-by-sprint
3. Update statuses as you progress — the views auto-filter

**Pre-flight Check callout (yellow/warning):**
> ⚠️ **Sections requiring attention:**
> - [ ] Review all `[FILL IN]` placeholders and complete them
> - [ ] Verify assumption owners are assigned
> - [ ] Confirm Sprint 1 scope is realistic
> - [ ] Set dates on Roadmap items

**Quick Links:**
- → Dashboard
- → Assumption Tracker
- → Validation Experiments
- → MVP Backlog
- → Risk Register
- → Roadmap
- → Weekly Review Template
- → {{Decision-specific page based on validation_decision}}

---

### 1. Dashboard (Page)

**Header:** "Mission Control — {{product_name}}"

**Embed these linked database views:**

| View Name | Source Database | Filter/Group |
|-----------|----------------|--------------|
| Sprint 1 Focus | MVP Backlog | Sprint = Sprint 1 AND Priority in (P0, P1) |
| Critical Assumptions | Assumption Tracker | Importance = High AND Evidence Level ≠ Validated |
| Active Experiments | Validation Experiments | Status ≠ Complete |
| Active Risks | Risk Register | Severity = High OR Status = Mitigating |
| Timeline | Roadmap | Timeline view, grouped by Phase |

**Metrics callout (gray):**
> **Success Metrics:**
> {{bullet list from success_metrics}}

---

### 2. Assumption Tracker (Database)

**Database Name:** Assumption Tracker

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Assumption | Title | — |
| Importance | Select | High, Medium, Low |
| Evidence Level | Select | Validated, Assumed, Unknown |
| Test Method | Text | — |
| Owner | Text | — |
| Status | Select | Not started, In progress, Validated, Invalidated |
| Next Review | Date | — |

**Pre-populate:** One row per item in `assumptions` array.

Field mapping from Validation Pack Assumption Register:

| Assumption Register Field | Maps to Notion Property |
|---------------------------|------------------------|
| Assumption (text) | Assumption (Title) |
| Importance (Fatal/Major/Minor) | Importance (Fatal → High, Major → Medium, Minor → Low) |
| Proof Level (Validated/Partial/Unvalidated) | Evidence Level (Validated → Validated, Partial → Assumed, Unvalidated → Unknown) |
| Validation Test | Test Method |
| Priority (Validate First/Monitor/Known) | Status (Validate First → Not started, Monitor → Not started, Known → Validated) |

If `assumptions` array is empty, create 3 template rows with `[FILL IN]` placeholders.

**Views:**
1. **"Critical (High + Unvalidated)"** — Filter: Importance = High AND Evidence Level ≠ Validated
2. **"All by Status"** — Group by: Status
3. **"Validated"** — Filter: Evidence Level = Validated

---

### 3. Validation Experiments (Database)

**Database Name:** Validation Experiments

**Purpose:** Bridges the gap between "what to validate" (Assumption Tracker) and "how to validate" (future skills). This database provides the tracking scaffold; experiment design content is generated by dedicated skills.

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Experiment | Title | — |
| Linked Assumption | Relation | → Assumption Tracker |
| Method | Select | User Interview, Survey, Landing Page Test, Prototype Test, Ad Campaign, Other |
| Status | Select | Not started, Designing, Running, Analyzing, Complete |
| Success Criteria | Text | — |
| Result | Select | Validated, Invalidated, Inconclusive, — |
| Notes | Text | — |

**Auto-seed:** One row per assumption where Priority = Validate First from the Assumption Register.

Field mapping from Validation Pack Assumption Register:

| Assumption Register Field | Maps to Notion Property |
|---------------------------|------------------------|
| Assumption (text, truncated to 50 chars) | Experiment (Title, prefixed with "Test: ") |
| (Relation to matching Assumption Tracker row) | Linked Assumption |
| — | Method (`[FILL IN]` — see Skill Tip below) |
| Decision Criteria | Success Criteria |
| — | Status (Not started) |
| — | Result (—) |

If no "Validate First" assumptions exist, create 2 template rows with `[FILL IN]` placeholders.

**Skill Tips (include as callout below the database):**

> **Need help designing these experiments?**
> - **User interviews →** Use the *Interview Guide Creation* skill to generate a targeted script from your assumptions
> - **Surveys →** Use the *Survey Design* skill to build a validation survey with statistically sound sample sizes
> - **A/B tests →** Use the *A/B Test Design* skill to structure landing page or feature experiments

**Views:**
1. **"Active Experiments"** — Filter: Status ≠ Complete
2. **"By Method"** — Group by: Method
3. **"Results"** — Filter: Status = Complete

---

### 4. MVP Backlog (Database)

**Database Name:** MVP Backlog

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Feature | Title | — |
| Impact | Select | High, Medium, Low |
| Effort | Select | High, Medium, Low |
| Quadrant | Select | Quick Win, Big Bet, Fill-In, Time Sink |
| Priority | Select | P0, P1, P2, P3 |
| Status | Select | Not started, In progress, Blocked, Done |
| Sprint | Select | Sprint 1, Sprint 2, Sprint 3, Backlog |
| Related Assumptions | Relation | → Assumption Tracker |
| Notes | Text | — |

**Pre-populate:** One row per item in `mvp_features` array.

Field mapping from Validation Pack MVP Scope Definition:

| MVP Scope Field | Maps to Notion Property |
|-----------------|------------------------|
| Feature (name) | Feature (Title) |
| RICE Score → Impact dimension | Impact (score 7-10 → High, 4-6 → Medium, 1-3 → Low) |
| Effort (T-shirt: S/M/L) | Effort (S → Low, M → Medium, L → High) |
| Impact-Effort Matrix quadrant | Quadrant (Quick Win / Big Bet / Fill-in → Fill-In / Deprioritise → Time Sink) |

If `mvp_features` array is empty, create 3 template rows with `[FILL IN]` placeholders.

**Auto-assign Priority (apply during population):**
- Quadrant = Quick Win AND Impact = High → **P0**
- Impact = High (any other quadrant) → **P1**
- Impact = Medium → **P2**
- Impact = Low → **P3**

**Auto-assign Sprint (apply during population):**
- P0 items → Sprint 1
- P1 items (up to 3) → Sprint 1
- Remaining → Backlog

**Views:**
1. **"Sprint 1 (P0/P1)"** — Filter: Sprint = Sprint 1 AND Priority in (P0, P1)
2. **"By Quadrant"** — Group by: Quadrant
3. **"Kanban"** — Board view, group by Status

---

### 5. Risk Register (Database)

**Database Name:** Risk Register

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Risk | Title | — |
| Likelihood | Select | Low, Medium, High |
| Impact | Select | Low, Medium, High |
| Severity | Select | Low, Medium, High |
| Mitigation | Text | — |
| Owner | Text | — |
| Status | Select | Watching, Mitigating, Resolved |
| Review Date | Date | — |

**Pre-populate:** One row per item in `risks` array.

Field mapping from Validation Pack Risk Register:

| Risk Register Field | Maps to Notion Property |
|---------------------|------------------------|
| Risk (description) | Risk (Title) |
| Likelihood (High/Medium/Low) | Likelihood (direct) |
| Impact (Fatal/Major/Minor) | Impact (Fatal → High, Major → Medium, Minor → Low) |
| Mitigation (action) | Mitigation (direct) |
| Owner (role) | Owner (direct) |

If `risks` array is empty, create 2 template rows with `[FILL IN]` placeholders.

**Auto-assign Severity (apply during population):**
- Likelihood = High OR Impact = High → **High**
- Likelihood = Medium AND Impact = Medium → **Medium**
- Otherwise → **Low**

**Auto-assign Status (apply during population):**
- Severity = High → **Mitigating**
- Otherwise → **Watching**

**Views:**
1. **"High Severity"** — Filter: Severity = High
2. **"Active"** — Filter: Status ≠ Resolved
3. **"By Owner"** — Group by: Owner

---

### 6. Competitive Landscape (Simple Table)

**Table Name:** Competitive Landscape

**Columns:**
| Competitor | Positioning | Strengths | Weaknesses | Our Advantage |

**Pre-populate:** One row per item in `competitors` array.

Field mapping from Validation Pack Competitive Positioning Map + `context.competitors`:

| Source Field | Maps to Column |
|-------------|----------------|
| Competitor name | Competitor |
| Competitor Research → profile positioning | Positioning |
| Competitor Research → Comparison Matrix strengths (top-scoring dimensions) | Strengths |
| Competitor Research → Comparison Matrix weaknesses (low-scoring dimensions) | Weaknesses |
| Competitor Research → Gap Analysis → where user's product fills the gap | Our Advantage |

If `competitors` array is empty, create 2 template rows with `[FILL IN]` placeholders.

---

### 7. Roadmap (Database + Timeline)

**Database Name:** Roadmap

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Item | Title | — |
| Phase | Select | Validate, Build MVP, Launch |
| Start | Date | — |
| End | Date | — |
| Linked Feature | Relation | → MVP Backlog |
| Linked Assumption | Relation | → Assumption Tracker |
| Status | Select | Planned, Active, Done |

**Auto-seed items:**

**Phase: Validate**
- Create 1 item per assumption where Importance = High AND Evidence Level ≠ Validated (max 3)
- Title format: "Validate: {{assumption_text truncated to 50 chars}}"

**Phase: Build MVP**
- Create 1 item per MVP feature in Sprint 1
- Title format: "Build: {{feature_name}}"

**Phase: Launch**
- Create these placeholder items (include Skill Tips in the Notes field where indicated):
  - "Finalize pricing" — *Notes: "Tip: Use the Pricing Strategy skill to model optimal price points from your competitive data and willingness-to-pay ranges"*
  - "Build landing page" — *Notes: "Tip: Use the Brand Messaging Framework skill to generate positioning and copy, then Content Strategy to plan your content"*
  - "Set up onboarding flow"
  - "Implement analytics"
  - "Create support channel"

**Views:**
1. **"Timeline"** — Timeline view, grouped by Phase
2. **"By Status"** — Table view, grouped by Status

---

### 8. Decision-Specific Pages

Generate ONLY the pages that match the `validation_decision` value.

---

#### IF validation_decision = GO

**Create: "Sprint 1 Plan" (Page)**

**Sprint Goal callout (green):**
> **Sprint 1 Goal:** {{first item from recommended_next_steps, or "[FILL IN]"}}

**Embedded views:**
- MVP Backlog → "Sprint 1 (P0/P1)" view
- Assumption Tracker → "Critical (High + Unvalidated)" view

**Definition of Done checklist:**
- [ ] All P0 features shipped
- [ ] At least 1 critical assumption validated
- [ ] User feedback collected from 3+ users

---

**Create: "Launch Checklist" (Page)**

**Purpose callout (blue):**
> This checklist is derived from your Validation Pack data. Items reference your specific objections, personas, risks, and success metrics.

**Pre-launch — Validation (toggle, expanded):**
- [ ] Top 3 assumptions validated (see Assumption Tracker → "Critical" view)
- [ ] All active experiments complete (see Validation Experiments → "Results" view)
- [ ] Pricing tested at {{business_case_price}} with {{persona_1_name}} segment

**Pre-launch — Build (toggle, expanded):**
- [ ] Landing page addresses top objection: "{{top_objection}}"
- [ ] Onboarding flow reaches activation moment: {{activation_moment}}
- [ ] Analytics tracks primary success metric: {{success_metrics}}
- [ ] Support email/channel ready
- [ ] Legal/privacy policy in place

**Launch Day (toggle, collapsed):**
- [ ] Final smoke test passed
- [ ] Announce on primary channel
- [ ] Monitor error logs for first 24 hours
- [ ] Track first 10 signups against success criteria

**Post-launch (toggle, collapsed):**
- [ ] Monitor for Risk #1: {{risk_1}}
- [ ] Collect feedback targeting: {{top_unvalidated_assumption}}
- [ ] Review Sprint 1 metrics against: {{success_metrics}} (Day 7)
- [ ] Update Assumption Tracker and Risk Register with real data
- [ ] Plan Sprint 2 based on learnings

**Skill Tips callout (gray):**
> Need help with pre-launch items?
> - **Landing page copy →** Use *Brand Messaging Framework* skill
> - **Pricing validation →** Use *Pricing Strategy* skill
> - **User feedback plan →** Use *Interview Guide Creation* skill

---

#### IF validation_decision = PIVOT

**Create: "Original Idea Archive" (Page)**

**Summary callout (gray):**
> **Original Idea:** {{product_name}}
> **Why pivoting:** {{first item from recommended_next_steps, or "[FILL IN]"}}

**What we learned (bulleted):**
- {{Extract key learnings from assumptions where Evidence Level = Validated, or "[FILL IN]"}}

**Assets to preserve:**
- `[FILL IN]`

---

**Create: "Pivot Hypothesis Board" (Page)**

**Template for each hypothesis (use toggle blocks):**

▶ **Hypothesis 1: [FILL IN]**
- New target user: `[FILL IN]`
- New problem: `[FILL IN]`
- Key assumption to test: `[FILL IN]`
- Test method: `[FILL IN]`
- Success criteria: `[FILL IN]`

▶ **Hypothesis 2: [FILL IN]**
(same structure)

▶ **Hypothesis 3: [FILL IN]**
(same structure)

---

**Create: "Pivot Decision Log" (Page)**

**Table:**
| Date | Decision | Rationale | Owner | Outcome |
|------|----------|-----------|-------|---------|
| {{generated_date}} | Initiated pivot exploration | Validation indicated need to pivot | `[FILL IN]` | Pending |

---

**Create embedded view on Dashboard:**
- Assumption Tracker → Filter: Evidence Level = Unknown (title: "Unknowns to Test")

---

#### IF validation_decision = NO-GO

**Create: "Post-Mortem" (Page)**

**Summary callout (red):**
> **Decision:** NO-GO
> **Date:** {{generated_date}}
> **Product:** {{product_name}}

**What happened (toggle, expanded):**
- Market/problem fit issues: `[FILL IN]`
- Key risks that materialized: `[FILL IN]`
- Resource/timing constraints: `[FILL IN]`

**Why we stopped (toggle, expanded):**
- `[FILL IN]`

**What we'd do differently (toggle, collapsed):**
- `[FILL IN]`

---

**Create: "Transferable Assets" (Page)**

**Categories (bulleted with sub-bullets):**

**Research & Insights:**
- Market research: `[FILL IN]`
- Customer interviews: `[FILL IN]`
- Competitive analysis: (link to Competitive Landscape)

**Technical:**
- Code/prototypes: `[FILL IN]`
- Design assets: `[FILL IN]`
- Documentation: `[FILL IN]`

**Relationships:**
- Contacts made: `[FILL IN]`
- Partnerships explored: `[FILL IN]`

**Skills developed:**
- `[FILL IN]`

---

**Create: "Market Insights Archive" (Page)**

**Key insights (numbered):**
1. {{Extract from validated assumptions, or "[FILL IN]"}}
2. `[FILL IN]`
3. `[FILL IN]`

**Trends observed:**
- `[FILL IN]`

**Adjacent opportunities noticed:**
- `[FILL IN]`

---

**Create: "Future Opportunity Radar" (Page)**

**Idea parking lot (table):**
| Idea | Source | Why interesting | Priority | Notes |
|------|--------|-----------------|----------|-------|
| `[FILL IN]` | This project | `[FILL IN]` | `[FILL IN]` | — |

---

### 9. Weekly Review Template (Page) — ALL DECISIONS

**Purpose:** Gives founders a weekly cadence for updating their validation progress. Without this, the workspace becomes a one-time artifact that gets abandoned.

**Purpose callout (blue):**
> Use this template every week to track your validation progress. Duplicate this page each week and fill in the prompts.

**Week of: `[FILL IN date]`**

**Assumptions Review (link to Assumption Tracker):**
- Which assumptions did you test this week? Update their Evidence Level and Status in the tracker.
- Any surprises or contradictions? Document in the Notes field.
- Assumptions changed status this week: `[FILL IN]`

**Experiments Review (link to Validation Experiments):**
- Which experiments are currently running? Update their Status.
- Any results in? Update the Result field (Validated / Invalidated / Inconclusive).
- What did you learn that changes your priorities? `[FILL IN]`

**Risks Review (link to Risk Register):**
- Did any risk materialize? Update Status to Mitigating.
- Any new risks discovered? Add them to the register.
- Risks resolved this week: `[FILL IN]`

**Decision Check callout (yellow/warning):**
> Based on this week's learnings, is your Validation Pack verdict ({{validation_decision}}) still correct?
> - If 3+ assumptions changed status this week → consider re-running the Validation Pack with updated data
> - If a "Validate First" assumption was invalidated → revisit MVP scope immediately

**Next Week Focus:**
- Top 1-2 experiments to run: `[FILL IN]`
- Top 1-2 features to build/validate: `[FILL IN]`
- Blockers to resolve: `[FILL IN]`

---

## Output Checklist

Before delivering the workspace specification, verify:
- [ ] Start Here page exists and is first
- [ ] Pre-flight Check callout lists incomplete sections
- [ ] All databases have defined properties with correct types
- [ ] All specified views are created
- [ ] Validation Experiments database is present with auto-seeded rows from "Validate First" assumptions
- [ ] Empty arrays resulted in template placeholder rows
- [ ] Decision-specific pages match validation_decision
- [ ] Weekly Review Template page is present (all decisions)
- [ ] Launch Checklist (GO path) references pack-specific data (objections, metrics, risks), not generic items
- [ ] Skill Tips are included where specified (Validation Experiments callout, Roadmap notes, Launch Checklist callout)
- [ ] No invented data — only Validation Pack content used
- [ ] Quick Links are accurate and include Validation Experiments and Weekly Review
- [ ] All field mappings from the Data Mapping table above were applied correctly

---

## Context Limit Guidance

If the Validation Pack data exceeds these limits, split into multiple generation requests:
- Assumptions: max 15
- MVP Features: max 15
- Risks: max 10
- Competitors: max 8

For larger datasets, generate core workspace first, then add items via follow-up prompts.
