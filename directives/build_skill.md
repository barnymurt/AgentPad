# Directive: Build a Skill

**Goal:** Create a new AgentPad skill using the test-driven design pattern. Every skill must demonstrably outperform a raw LLM on the same task.

**Inputs:**
- Skill name and category (e.g., "Competitor Research" under "Product Manager")
- Description of what the skill does and when it triggers
- The methodology or framework the skill should encode

**Tools/Scripts:**
- Template: `skills/_template/` (copy as starting point)
- Quality checklist: `skills/quality-checklist.md` (verify before shipping)

**Outputs:**
- Complete skill directory: `skills/[skill-name]/SKILL.md` + `references/`
- Skill passes all quality checklist items

---

## Process (TDD Skill Creation)

Each step has a **review gate** — a set of pass/fail criteria that must be met before advancing. Do not proceed to the next step until the gate passes. This prevents rework loops and keeps the process credit-efficient.

### Step 1: Define

Answer these four questions before writing anything:

1. **What specific problem does this skill solve that a raw LLM cannot?**
   - Identify the gap: structure, methodology, depth, consistency, or SaaS-specificity
   - If the answer is "nothing" — stop here. The skill isn't needed.

2. **What does a user say or ask that should trigger this skill?**
   - Write the trigger conditions for the frontmatter `description`
   - Be specific: "analyze my competitors" not "help with business"

3. **What does "good" output look like?**
   - Draft the output schema (`references/output-schema.md`)
   - Define required vs. conditional fields
   - Set minimum thresholds (e.g., "at least 3 competitors analyzed")

4. **What framework or methodology should the skill encode?**
   - Identify proven frameworks (RICE, SWOT, Porter's Five Forces, etc.)
   - Draft the framework reference (`references/framework.md`)
   - Include scoring rubrics and decision trees where applicable

**Review gate — advance when all pass:**
- [ ] The skill solves a specific gap a raw LLM cannot (stated in one sentence)
- [ ] Trigger conditions are specific enough that a developer knows when to use it
- [ ] Output schema draft has at least 3 required sections with defined fields
- [ ] A named framework or methodology is identified (not "general analysis")

### Step 2: Baseline (Fail First)

Run a realistic scenario **without** the skill to establish what unguided output looks like:

1. Pick a specific SaaS product scenario (e.g., "invoicing tool for freelancers")
2. Ask the AI to perform the skill's task with no special guidance
3. Evaluate the unguided output against these dimensions:
   - **Generic** — could apply to any product?
   - **Shallow** — lists but doesn't analyze?
   - **Unstructured** — no consistent format?
   - **Missing methodology** — no scoring, no framework, no decision criteria?
   - **Missing skepticism** — no challenging of assumptions?

Save this baseline output and the gap evaluation.

**Review gate — advance when all pass:**
- [ ] A specific SaaS scenario was used (not a generic prompt)
- [ ] Baseline output is saved for later comparison
- [ ] At least 3 specific gaps are identified and categorized (use table below)

| Gap Type | What's Missing | How the Skill Will Fix It |
|----------|---------------|--------------------------|
| | | |
| | | |
| | | |

### Step 3: Build

Copy the template and build all files. Each file has its own review gate before the step is complete.

```
Copy skills/_template/ to skills/[skill-name]/
```

#### 3a. Write SKILL.md

- Frontmatter: `name` + `description` with trigger conditions
- Overview: 2-3 sentences — what it does, why it matters
- Core Workflow: numbered steps encoding the methodology (the actual procedure, not a description of one)
- Output Format: reference to output-schema.md
- Quality Criteria: checklist of pass/fail items
- References: links to framework.md, output-schema.md, worked-example.md
- Common Mistakes: leave empty (populated in Step 5)

**Review gate for SKILL.md:**
- [ ] Under 500 lines
- [ ] Frontmatter description includes specific trigger conditions
- [ ] Core Workflow steps are actionable (imperative form, not descriptive)
- [ ] Every step addresses at least one gap from the Step 2 baseline
- [ ] References link to files that will exist

#### 3b. Write references/output-schema.md

- Exact structure of every output section
- Required vs. conditional fields with format definitions
- Validation rules (minimums, cross-field consistency)
- Confidence tagging guidelines (High/Medium/Low with criteria)

**Review gate for output-schema.md:**
- [ ] Every section from the SKILL.md "Output Format" has a matching schema definition
- [ ] All required fields have format descriptions and good/bad examples
- [ ] At least 3 validation rules are defined
- [ ] Confidence tagging criteria distinguish High, Medium, and Low with specific data source types

#### 3c. Write references/framework.md

- Full methodology with scoring rubrics
- Decision trees for branching logic
- Edge case handling
- Sources and rationale

**Review gate for framework.md:**
- [ ] Scoring rubric has defined scales (not just "score 1-5" — each level described)
- [ ] Edge cases identified (at least 3) with handling instructions
- [ ] Framework is SaaS/digital product specific (not generic business)

#### 3d. Write references/worked-example.md

- One complete, realistic SaaS scenario
- Full input, reasoning process, and output
- Every required field from output-schema.md populated with specific content

**Review gate for worked-example.md:**
- [ ] Scenario names a specific SaaS product and target market (not "[Product X]")
- [ ] Every required field from output-schema.md is populated
- [ ] Reasoning section shows how each Core Workflow step was applied
- [ ] Content is specific enough that it couldn't be copy-pasted for a different product

**Constraints for all files:**
- All examples must be SaaS/digital product scenarios
- Use imperative/infinitive form throughout
- Detail goes in references/, not SKILL.md

### Step 4: Validate

Run the **same scenario from Step 2** with the skill loaded. Compare output to the baseline. This is a single validation pass, not an open-ended loop.

1. Load the skill into the AI's context
2. Present the identical scenario from Step 2
3. Evaluate the output against these criteria:

**Review gate — the skill ships if all pass:**
- [ ] Output follows the defined schema (all required sections populated)
- [ ] Methodology is visibly applied (scoring, frameworks, structured analysis — not just mentioned)
- [ ] Output is specific to the scenario (names the actual product, market, competitors)
- [ ] Quality criteria checklist from SKILL.md passes
- [ ] Output is demonstrably better than the Step 2 baseline on every identified gap
- [ ] Pressure check: would the output hold up if the input was vague? (mental evaluation — does the skill instruct the agent to ask for context before proceeding?)

**If the gate fails (max 1 revision):**
For each failing criterion, make a targeted fix:
1. Identify the specific gap in SKILL.md, framework.md, or output-schema.md
2. Make the minimal edit to close the gap
3. Re-evaluate against the failing criteria only

If it still fails after one revision, flag for human review with a summary of what's not working. Do not loop further — open-ended iteration wastes credits without guaranteed improvement.

### Step 5: Finalize

Add the "Common Mistakes" section to SKILL.md and run the final quality checklist:

1. **Document Common Mistakes** — at least 3, drawn from:
   - What the Step 2 baseline got wrong (these are the mistakes unguided LLMs make)
   - Any failures observed during Step 4 validation
   - Edge cases the skill needs to handle (vague input, missing data, niche markets)

2. **Run the quality checklist** — go through every item in `skills/quality-checklist.md`

3. **Verify file integrity** — all files present, all internal links resolve, no placeholder content

**Review gate — ship when all pass:**
- [ ] Common Mistakes has at least 3 entries, each with: what goes wrong, why, and how to avoid it
- [ ] Every item in `skills/quality-checklist.md` passes
- [ ] No `[TODO]`, `[TBD]`, or placeholder text in any file
- [ ] All `[text](path)` links in SKILL.md resolve to existing files

4. **Commit** with message: `Add [skill-name] skill: [one-line description]`

---

## Step Summary

| Step | What Happens | Gate (must pass to advance) |
|------|-------------|---------------------------|
| 1. Define | Answer 4 questions about the skill's purpose | Gap identified, schema drafted, framework named |
| 2. Baseline | Run scenario without skill, record gaps | 3+ gaps categorized with fix plan |
| 3. Build | Write SKILL.md + all reference files | Per-file review gates (see above) |
| 4. Validate | Run same scenario with skill, compare to baseline | Output beats baseline, schema followed, max 1 revision |
| 5. Finalize | Common Mistakes, quality checklist, ship | Checklist passes, no placeholders, commit |

**Key constraint:** Step 4 allows a maximum of 1 revision cycle. If the skill doesn't pass after one targeted fix, it's flagged for human review rather than looping. This prevents unbounded credit consumption from iteration cycles that may not converge.

---

## Edge Cases

- **Skill overlaps with existing skill:** Check `skills/` directory first. If overlap exists, decide whether to extend the existing skill or create a new one with clear boundaries.
- **No proven framework exists:** Build one from first principles. Document the rationale in `references/framework.md` under "Sources and Rationale."
- **Skill is lightweight (no deep methodology):** Skip `references/framework.md`. Still require output-schema.md and worked-example.md.
- **Testing reveals the skill isn't needed:** Document why and close. Not every skill idea is worth building.
- **Step 4 fails after 1 revision:** Flag for human review. Include: which criteria failed, what was tried, and a hypothesis for why it didn't converge. The human decides whether to iterate further or redesign.

## Learnings

<!-- Updated as skills are built. Record patterns, surprises, and improvements to this process. -->
