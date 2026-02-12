# Skill Quality Checklist

Use this checklist before shipping any AgentPad skill. Every item must pass. If an item fails, fix it before committing.

---

## Structure

- [ ] **SKILL.md exists** and is under 500 lines
- [ ] **Frontmatter** has `name` and `description` fields (no other YAML fields)
- [ ] **Description includes trigger conditions** — another developer can read it and know when to use this skill
- [ ] **Overview** section is 2-3 sentences explaining what the skill does and why it matters
- [ ] **Core Workflow** has numbered, actionable steps (not descriptions of steps — the actual procedure)
- [ ] **Output Format** section references `references/output-schema.md`
- [ ] **Quality Criteria** section has a checklist of pass/fail items
- [ ] **References** section links to all reference files
- [ ] **Common Mistakes** section has at least 3 documented failure modes from testing

## References

- [ ] **references/output-schema.md** exists and defines the exact output structure
- [ ] All required fields are marked `(required)` and have format definitions
- [ ] Validation rules are defined (minimum thresholds, cross-field consistency)
- [ ] Confidence tagging guidelines are included (High/Medium/Low with criteria)
- [ ] **references/framework.md** exists (unless the skill is lightweight with no deep methodology)
- [ ] Framework includes scoring rubrics or decision trees where applicable
- [ ] Edge cases are documented with handling instructions
- [ ] **references/worked-example.md** exists with at least one complete, realistic example
- [ ] Example uses a SaaS/digital product scenario (not generic business)
- [ ] Example populates every required field from the output schema
- [ ] Example shows the reasoning process, not just the final output

## Quality

- [ ] **Tested against baseline:** Output is demonstrably better than what a raw LLM produces without the skill
- [ ] **Methodology is applied, not just mentioned:** The output visibly uses the framework (scoring, structured analysis, multi-dimensional evaluation) rather than just referencing it
- [ ] **SaaS-specific throughout:** Examples, terminology, and frameworks reference SaaS/digital product scenarios — not generic business
- [ ] **Specific, not generic:** The worked example and test outputs name real or realistic products, markets, and competitors — not "[Company A]" or "a competitor"
- [ ] **Confidence levels assigned:** Major findings and recommendations include High/Medium/Low confidence with data source attribution
- [ ] **Pressure-tested:** Adversarial scenarios (vague input, no competitors, conflicting data, quick mode) have been run and the skill handles them

## Format

- [ ] **Imperative form used throughout** — "Analyze the market" not "The market should be analyzed"
- [ ] **No extraneous files** — No README, CHANGELOG, INSTALLATION_GUIDE, or other documentation clutter
- [ ] **Progressive disclosure respected** — SKILL.md is lean; detail lives in references/
- [ ] **All internal links work** — Every `[text](path)` link in SKILL.md resolves to an existing file
- [ ] **No placeholder content** — No `[TODO]`, `[TBD]`, or `[INSERT HERE]` in any file

## Final Checks

- [ ] Read the skill from start to finish as if you're seeing it for the first time — does it make sense?
- [ ] Could another AI agent follow these instructions and produce the expected output?
- [ ] Does the worked example actually match the output schema?
- [ ] Is there anything in the skill that a raw LLM already knows how to do without guidance? If so, remove it — only add what's non-obvious.
