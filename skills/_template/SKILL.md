---
name: skill-name
description: One-line description of what this skill does. Use when [specific trigger conditions — what the user says or asks that should activate this skill]. Covers [scope of the skill's capabilities].
---

# Skill Name

Brief overview (2-3 sentences): What this skill does, why it matters, and what distinguishes it from what a raw LLM would produce without guidance.

## Core Workflow

<!-- Numbered steps the AI follows. This IS the methodology — not a description of a methodology, but the actual procedure. Each step should be actionable and specific. -->

### Step 1: [First Phase Name]

- What to do in this step
- What inputs are needed
- What decisions to make

### Step 2: [Second Phase Name]

- What to do in this step
- How to use the output from Step 1
- What to produce

### Step 3: [Third Phase Name]

- What to do in this step
- How to synthesize findings
- What to produce

<!-- Add or remove steps as needed. Most skills have 4-7 steps. -->

## Output Format

<!-- Define the structure of the final output. Not the content — the shape. Example: -->

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Section 1:** [What this section contains]
- **Section 2:** [What this section contains]
- **Section 3:** [What this section contains]

<!-- Describe the expected length, format (markdown, JSON, prose), and any required sections. -->

## Quality Criteria

<!-- How to tell if the output is good. These become the structural validation checks. -->

- [ ] Output follows the defined schema (all required sections populated)
- [ ] Analysis is specific to the scenario (not generic/boilerplate)
- [ ] Methodology is visibly applied (not just mentioned)
- [ ] Sources and reasoning are cited where applicable
- [ ] Confidence levels are assigned where uncertainty exists
- [ ] SaaS/digital product context is maintained throughout

## References

- **Detailed methodology and scoring:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

<!-- Added during testing (Steps 5-8 of the build process). Start empty, populate based on real failure modes observed. -->

1. **[Mistake name]:** [What goes wrong and how to avoid it]
2. **[Mistake name]:** [What goes wrong and how to avoid it]
3. **[Mistake name]:** [What goes wrong and how to avoid it]
