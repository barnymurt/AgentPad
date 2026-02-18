# Directive: Run Validation Pack

**Goal:** Execute the Validation Pack skill chain to produce a tangible, shareable deliverable that answers "Is this idea worth building, and if so, what specifically should I build first?"

**Inputs:**
- A SaaS or digital product idea described in plain language by the user
- Optionally: target market, existing competitors the user knows about, rough pricing thoughts

**Tools/Scripts:**
- Skills (run in order): `skills/requirements-elicitation/`, `skills/user-persona-creation/`, `skills/competitor-research/`, `skills/business-case-modeling/`, `skills/devils-advocate/`, `skills/feature-prioritization/`, `skills/user-journey-mapping/`
- Output schema: `skills/validation-pack/output-schema.md`
- Notion workspace prompt: `skills/validation-pack/references/notion-workspace-prompt.md`
- Design reference: `docs/plans/validation-pack-design.md`

**Outputs:**
- A complete Validation Pack document conforming to `skills/validation-pack/output-schema.md`
- A Notion workspace specification (for full packs) generated using `skills/validation-pack/references/notion-workspace-prompt.md`
- OR a partial pack with PAUSE/KILL recommendation if a decision gate triggers (no workspace spec for partial packs)

---

## Process

### Step 0: Gather Idea Input

Before running any skill, ensure you have enough context from the user. At minimum, you need:

1. **What the product does** — a clear description of the product or feature
2. **Who it's for** — target customer segment or persona
3. **How it makes money** — revenue model (subscription, usage-based, freemium, etc.)

If any of these are missing, ask the user directly. Keep it conversational — 2-3 questions maximum. Do not run the chain on vague input.

**Review gate — advance when:**
- [ ] Product description is specific enough to research competitors
- [ ] Target customer is named (not "everyone")
- [ ] Revenue model is stated or can be reasonably inferred

---

### Step 1: Requirements Elicitation

**Load:** `skills/requirements-elicitation/SKILL.md` and its references

**Input:** The user's idea description from Step 0

**Run the skill.** Produce the full output per the skill's output schema.

**Extract and retain for later steps:**
- Problem statement (problem, current solution, target users)
- Scope (in scope, out of scope, constraints)
- Functional requirements list (each feature with user story)
- Assumptions register (all entries with confidence)
- Priority matrix (MoSCoW distribution)

**Store this output as `context.requirements`** — all subsequent skills reference it.

**Review gate — advance when:**
- [ ] Problem statement is specific to one product and market
- [ ] At least 3 functional requirements with user stories
- [ ] At least 1 "Won't Have" item (proves scope discipline)

---

### Step 2: User Persona Creation

**Load:** `skills/user-persona-creation/SKILL.md` and its references

**Input:**
- From `context.requirements`: target users, problem statement, current solution, constraints
- The original user idea description for additional context

**Run the skill.** Produce 2-3 personas per the skill's output schema.

**Extract and retain for later steps:**
- Primary persona (highest priority from the Priority Matrix)
- All personas: JTBD (functional, emotional, social), pain points with severity, decision criteria (ranked), SaaS attributes (adoption trigger, willingness to pay, churn signals, switching costs)
- Current workflow and tools used (for competitor identification)

**Store this output as `context.personas`.**

**Review gate — advance when:**
- [ ] At least 2 personas with all required fields populated
- [ ] Primary persona identified and ranked
- [ ] Pain points are specific (tied to workflow steps, not generic complaints)

---

### Step 3: Competitor Research

**Load:** `skills/competitor-research/SKILL.md` and its references

**Input:**
- From `context.requirements`: problem statement, scope
- From `context.personas`: primary persona JTBD, tools used in current workflow, decision criteria
- Any competitors the user mentioned in Step 0

**Run the skill.** Produce the full competitive landscape analysis.

**Extract and retain for later steps:**
- Competitor profiles (all, with pricing data)
- Comparison matrix with weighted totals
- Gap analysis (underserved segments, feature gaps, pricing gaps, positioning gaps)
- Recommendations (positioning statement, differentiation levers, competitive risks)
- Direct competitor count

**Store this output as `context.competitors`.**

**Review gate — advance when:**
- [ ] At least 3 competitors profiled
- [ ] Comparison matrix populated with scores
- [ ] Gap analysis has at least one entry per required subsection

---

### GATE 1: Competitive Viability

**Evaluate using `context.competitors`.**

**PAUSE if ALL of the following are true:**
- Direct competitor count >= 5 AND
- Gap Analysis: `underserved segments` is empty or all gaps have Low confidence AND
- Gap Analysis: `feature gaps` are all addressed by 2+ existing competitors

**If PAUSE triggers:**
1. Inform the user: "The competitive landscape for [product] is crowded with no clear gaps identified."
2. Provide pivot suggestions from any Indirect/Emerging competitor whitespace
3. Ask: "Would you like to continue anyway, pivot the idea, or stop here?"
4. If the user wants to stop: produce a **Partial Pack** (Validation Scorecard with PAUSE + Competitive Positioning Map + Requirements summary + pivot suggestions)
5. If the user wants to continue: proceed to Step 4, but flag PAUSE in the final Validation Scorecard

**If gate passes:** Proceed to Step 4.

---

### Step 4: Business Case Modeling

**Load:** `skills/business-case-modeling/SKILL.md` and its references

**Input:**
- From `context.requirements`: scope, constraints, functional requirements (for cost estimation)
- From `context.personas`: willingness to pay, target customer context (for pricing)
- From `context.competitors`: competitor pricing data, market segment scope, gap analysis (for TAM and pricing strategy), competitive risks

**Run the skill.** Produce the full business case.

**Extract and retain for later steps:**
- TAM/SAM/SOM estimates with confidence
- Revenue projection (MRR build-up)
- Unit economics (CAC, LTV, LTV:CAC ratio, payback period, gross margin)
- Scenario analysis (pessimistic, base, optimistic)
- Viability verdict and conditions
- Assumptions register (all entries)
- Key risks

**Store this output as `context.business_case`.**

**Review gate — advance when:**
- [ ] TAM/SAM/SOM populated with calculation methodology
- [ ] LTV:CAC ratio calculated and benchmarked
- [ ] Three scenarios modeled
- [ ] Viability verdict stated with rationale

---

### GATE 2: Financial Viability

**Evaluate using `context.business_case`.**

**KILL if ALL of the following are true:**
- Viability verdict = "Not viable under current assumptions" AND
- Pessimistic scenario shows no path to breakeven within time horizon AND
- LTV:CAC ratio < 1.0 in both pessimistic and base scenarios

**If KILL triggers:**
1. Inform the user: "The unit economics for [product] do not support a viable business under current assumptions."
2. Show: LTV:CAC ratio, projected monthly burn, runway
3. Show: specific assumption values that would flip viability
4. Ask: "Would you like to revise your assumptions and re-run, or stop here?"
5. If the user wants to stop: produce a **Partial Pack** (Validation Scorecard with KILL + populated matrices so far + Assumption Register + conditions for reconsideration)
6. If the user wants to revise: return to Step 4 with revised inputs (one revision only)

**If gate passes:** Proceed to Step 5.

---

### Step 5: Devil's Advocate

**Load:** `skills/devils-advocate/SKILL.md` and its references

**Input:**
- From `context.business_case`: assumptions register (primary input), viability verdict, conditions for viability, LTV:CAC ratio, TAM confidence, key risks
- From `context.personas`: JTBD and pain points (for customer objection modeling)
- From `context.competitors`: positioning, competitive risks (for blind spot identification)
- From `context.requirements`: problem statement (for value proposition testing)

**Important:** The Devil's Advocate must challenge the **specific** assumptions accumulated across Steps 1-4, not generic assumptions. Reference actual numbers, competitors, and persona details by name.

**Run the skill.** Produce the full adversarial analysis.

**Extract and retain for later steps:**
- Decomposed assumptions with risk priority
- Top assumption challenges with validation tests
- Value proposition assessment (4 test verdicts)
- Customer objection model (5+ objections with rebuttals)
- Blind spots
- Verdict (overall strength, top risks, kill condition, recommended actions)

**Store this output as `context.devils_advocate`.**

**Review gate — advance when:**
- [ ] At least 5 assumptions decomposed
- [ ] Challenges reference specific data from earlier steps (not generic)
- [ ] All 4 value proposition tests applied
- [ ] Kill condition is specific and testable

---

### GATE 3: Assumption Integrity

**Evaluate using `context.devils_advocate`.**

**KILL if ALL of the following are true:**
- Verdict = "Fundamental Concerns" AND
- 2+ assumptions with Impact if Wrong = "Fatal" have Certainty = "L" AND
- Value Proposition Assessment overall score = "Weak" (0-1 tests passed)

**If KILL triggers:**
1. Inform the user: "Critical assumptions underlying [product] are unvalidated and potentially fatal."
2. Show: the fatal assumptions with counter-arguments
3. Show: ordered validation roadmap (what to test before re-attempting)
4. Ask: "Would you like to stop here, or continue to see the feature analysis anyway?"
5. If stop: produce a **Partial Pack** (Validation Scorecard with KILL + all three matrices + full Assumption Register + validation roadmap)
6. If continue: proceed but flag KILL prominently in final pack

**If gate passes:** Proceed to Step 6.

---

### Step 6: Feature Prioritization

**Load:** `skills/feature-prioritization/SKILL.md` and its references

**Input:**
- From `context.requirements`: functional requirements (the feature list), priority matrix, dependencies
- From `context.competitors`: gap analysis feature gaps (add competitive gap features to the list if not already present)
- From `context.personas`: pain points with severity (informs Impact scoring)
- From `context.devils_advocate`: recommended actions (features addressing top risks score higher), customer objections (features addressing objections score higher on Reach), value proposition test verdicts

**Run the skill** using RICE framework. Produce the full prioritization.

**Extract and retain for later steps:**
- Scoring table with per-dimension scores and rationales
- Ranked backlog: Tier 1 (Build Now), Tier 2 (Validate First), Tier 3 (Park)
- Dependencies and build sequence
- Regret test results

**Store this output as `context.feature_priority`.**

**Review gate — advance when:**
- [ ] At least 3 features scored
- [ ] At least 1 feature in Tier 1 (Build Now)
- [ ] Scores reference persona pain points and competitive gaps (not just guesses)

---

### Step 7: User Journey Mapping

**Load:** `skills/user-journey-mapping/SKILL.md` and its references

**Input:**
- From `context.personas`: primary persona (the persona whose journey is mapped)
- From `context.feature_priority`: Tier 1 features (the feature set to map the journey through)
- From `context.feature_priority`: dependencies (sequence constraints)
- From `context.requirements`: problem statement (journey context)
- From `context.competitors`: positioning statement (for awareness stage context)

**Run the skill** mapping the primary persona's journey through the proposed MVP feature set.

**Extract and retain for synthesis:**
- Journey stages with actions, thoughts, emotions
- Pain points with severity scores
- Moments of truth (aha, activation, habit)
- Emotion curve
- Opportunity register with top 3 opportunities
- Time to value (how long until activation moment)

**Store this output as `context.journey`.**

**Review gate — advance when:**
- [ ] All 5 journey stages mapped
- [ ] At least 2 moments of truth identified
- [ ] Pain points reference the specific MVP features from Tier 1
- [ ] Emotion curve shows a clear trajectory

---

### Step 8: Synthesis

**Do not load any skill.** This is an orchestration step — assemble the Validation Pack from accumulated context.

**Load:** `skills/validation-pack/output-schema.md` for structure reference.

**Build each section of the Validation Pack:**

#### 8a. Validation Scorecard

Calculate the 7 metrics:

1. **Competitive density** — `context.competitors` direct competitor count
2. **Differentiation gap** — `context.competitors` Gap Analysis: count gaps with M+ confidence
3. **TAM/SAM/SOM** — `context.business_case` Market Sizing: SOM value
4. **Unit economics health** — `context.business_case` LTV:CAC ratio (base scenario)
5. **Assumption risk score** — `context.devils_advocate` count of Fatal/Major assumptions with L confidence
6. **MVP complexity** — `context.feature_priority` Tier 1 feature count + `context.requirements` dependency count → map to S/M/L
7. **Time to value** — `context.journey` Activation Moment of Truth timeline

Apply recommendation logic:
- **GO:** 0 Critical metrics, ≤ 1 Warning
- **PAUSE:** 1 Critical OR 3+ Warnings
- **KILL:** 2+ Critical (or any gate triggered KILL/PAUSE earlier)

If a gate triggered PAUSE/KILL earlier, reflect that in the scorecard regardless of metric calculations.

#### 8b. Three Matrices

Populate each matrix using the specifications in `docs/plans/validation-pack-design.md` Section 6:

1. **Importance vs. Proof** — merge assumptions from `context.business_case` + `context.devils_advocate`, plot by importance and proof level
2. **Risk-Value** — calculate composite value score and risk score, plot single point
3. **Impact-Effort** — plot Tier 1 and Tier 2 features from `context.feature_priority`

Write a 2-3 sentence interpretation for each matrix specific to this idea.

#### 8c. Competitive Positioning Map

From `context.competitors`:
- Select the two Comparison Matrix dimensions where the user's product has the largest advantage
- Plot all competitors + user's product
- Annotate the whitespace opportunity

#### 8d. Assumption Register

Merge and deduplicate from `context.business_case` (Section 8) + `context.devils_advocate` (Section 1 + Section 2):
- Sort by priority (Validate First at top)
- Minimum 8, maximum 15 entries
- Every "Validate First" entry must have a validation test with timeline

#### 8e. Objection Bank

Extract from `context.devils_advocate` Section 4:
- Top 5-7 objections by strength
- Include rebuttal strategies
- Write 2-3 sentence summary of the objection landscape

#### 8f. MVP Scope Definition

From `context.feature_priority` (Tier 1) + `context.journey` (critical path):
- State: "Version 1 solves [problem] for [primary persona] with these [N] features"
- List features with RICE scores, persona pain addressed, and journey stage
- State what's excluded
- Estimate complexity (T-shirt size)

#### 8g. Risk Register

Consolidate from:
- `context.business_case` Section 6: Key Risks
- `context.devils_advocate` Section 5: Blind Spots
- `context.competitors` Section 5: Competitive Risks

Top 5 risks, deduplicated, sorted by Likelihood × Impact. Each with specific mitigation.

---

**Validate Sections 1-8 of the pack against `skills/validation-pack/output-schema.md`.** Every required field must be populated. No placeholders.

**Present Sections 1-8 of the Validation Pack to the user.**

---

### Step 9: Notion Workspace Generation

**Skip this step if:** the pack is a partial pack (any gate triggered PAUSE/KILL and the user chose to stop).

**Load:** `skills/validation-pack/references/notion-workspace-prompt.md`

This step transforms the Validation Pack into an actionable Notion workspace specification. The workspace gives users an organized, interactive environment to execute on the pack's recommendations.

**Input:** All accumulated context + the completed Validation Pack (Sections 1-8).

**Process:**

#### 9a. Map the decision

Convert the Validation Scorecard verdict to the workspace decision:
- GO → GO (sprint planning + launch focus)
- PAUSE → PIVOT (hypothesis testing + pivot focus)
- KILL → NO-GO (post-mortem + asset preservation focus)

#### 9b. Resolve template variables

Using the Data Mapping table in the prompt template, resolve every `{{template_variable}}` against actual pack data:
- `template_version` = "1.0"
- `generated_date` = date the pack was produced
- `product_name` = from Step 0 input
- `validation_decision` = mapped verdict from 9a
- `persona_summary` = from `context.personas` primary persona
- `problem_statement` = from `context.requirements`
- `differentiators` = from `context.competitors` differentiation levers
- `success_metrics` = from Section 6 success criteria
- `assumptions` = from Section 4 Assumption Register rows
- `mvp_features` = from Section 6 Feature List rows
- `risks` = from Section 7 Risk Register rows
- `competitors` = from Section 3 Competitive Positioning Map rows
- `recommended_next_steps` = from Section 8 recommended follow-up

#### 9c. Pre-populate databases

Apply the field mappings and auto-assignment rules defined in the prompt template:

1. **Assumption Tracker** — map importance (Fatal→High, Major→Medium, Minor→Low), evidence level (Validated→Validated, Partial→Assumed, Unvalidated→Unknown), populate test methods
2. **MVP Backlog** — map impact/effort, assign quadrants, auto-assign priority (Quick Win+High Impact→P0, High Impact→P1, Medium→P2, Low→P3), auto-assign sprints (P0→Sprint 1, P1 up to 3→Sprint 1, rest→Backlog)
3. **Risk Register** — map fields, auto-assign severity (High likelihood OR impact→High, both Medium→Medium, else→Low)
4. **Competitive Landscape** — populate from competitor profiles
5. **Roadmap** — auto-seed Validate phase (high-importance unvalidated assumptions, max 3), Build MVP phase (Sprint 1 features), Launch phase (5 standard placeholders)

#### 9d. Generate decision-specific pages

Generate ONLY the pages matching the mapped decision from 9a. Do not generate pages for other decisions.

#### 9e. Run output checklist

Verify against the checklist in the prompt template:
- [ ] Start Here page exists and is first
- [ ] Pre-flight Check callout lists incomplete sections
- [ ] All databases have defined properties with correct types
- [ ] All specified views are created
- [ ] Empty arrays resulted in template placeholder rows
- [ ] Decision-specific pages match validation_decision
- [ ] No invented data — only Validation Pack content used
- [ ] Quick Links are accurate

**Present the Notion workspace specification to the user alongside the Validation Pack.**

---

## Edge Cases

- **User idea is too vague:** Ask up to 3 clarifying questions in Step 0. If still vague after 3 questions, proceed with stated assumptions and flag them prominently.
- **No competitors found:** This is unusual. If genuinely no competitors exist, the Competitor Research skill will note this. Gate 1 passes by default. Flag "no competitors found" as a risk (either the market doesn't exist, or you missed competitors).
- **User overrides a KILL gate:** Proceed, but the final Validation Scorecard retains the KILL flag with "User override" noted. The pack is still produced but with prominent warnings.
- **User wants to revise mid-chain:** Allow one revision at any step. If the user wants to change their idea fundamentally, restart from Step 0.
- **Skills produce inconsistent data:** When a later skill contradicts an earlier one (e.g., Devil's Advocate finds an assumption the Business Case didn't list), include both perspectives in the Assumption Register. Consistency issues are learning opportunities, not failures.

---

## Learnings

<!-- Updated as Validation Packs are produced. Record patterns, common failure modes, and process improvements. -->
