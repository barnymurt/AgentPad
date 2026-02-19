# Directive: Run Security Baseline Pack

**Goal:** Execute a lightweight 3-skill security chain to produce a personalized security assessment based on user's actual product context, data, and examples.

**Inputs:**
- Product description with architecture context (if available)
- Tech stack choices
- Data types handled
- Target market

**Tools/Scripts:**
- Skills (run in order): `skills/security-requirements-baseline/`, `skills/threat-modeling/`, `skills/data-protection-assessment/`
- Output schema: `skills/security-baseline-pack/output-schema.md`
- Summary template: `skills/security-baseline-pack/summary-template.md`

**Outputs:**
- A personalized Security Baseline Pack document conforming to the output schema
- Summary document generated from actual run data (reactive to user's product)

---

## Process

### Step 0: Gather Product Context

Before running any skill, gather:

1. **What the product does** — clear description
2. **Who it's for** — target customer segment
3. **What data it handles** — data types and sensitivity
4. **Tech stack** — technologies being used
5. **Target market geography** — affects regulatory considerations

Ask the user directly. Keep it to 4-5 questions. The pack adapts to whatever context they provide.

**Review gate — advance when:**
- [ ] Product description is specific enough
- [ ] At least the primary data types are known

---

### Step 1: Security Requirements Baseline

**Load:** `skills/security-requirements-baseline/SKILL.md` and its references

**Input:** User's product description and tech stack

**Run the skill.** Produce the security requirements checklist.

**Extract and retain:**
- Prioritized requirements (P0/P1/P2)
- Architecture-specific risks
- Security posture score

**Store as `context.security_baseline`**

---

### Step 2: Threat Modeling

**Load:** `skills/threat-modeling/SKILL.md` and its references

**Input:**
- From `context.security_baseline`: requirements, risks
- User's product context from Step 0

**Run the skill.** Produce the threat model.

**Extract and retain:**
- STRIDE analysis
- Top threats
- Risk ratings

**Store as `context.threat_model`**

---

### Step 3: Data Protection Assessment

**Load:** `skills/data-protection-assessment/SKILL.md` and its references

**Input:**
- User's product context from Step 0
- Tech stack and data types

**Run the skill.** Produce the data protection assessment.

**Extract and retain:**
- Data inventory
- PII exposure map
- Protection recommendations

**Store as `context.data_protection`**

---

### Step 4: Generate Summary Document

**Load:** `skills/security-baseline-pack/summary-template.md`

**Input:**
- `context.security_baseline` — actual requirements and posture
- `context.threat_model` — actual threats identified
- `context.data_protection` — actual data handling assessment
- User's original product context

**Generate the summary document** by filling in the template with the actual outputs from Steps 1-3. This is reactive — the summary reflects the user's specific product, not a pre-written template.

---

## Decision Gates

### Gate 1: Minimum Viable Output

**If ANY of the following are true after Step 1:**
- Fewer than 15 requirements defined
- No P0 requirements identified
- Tech stack is too vague for specific guidance

**Then:** Ask the user for more detail before proceeding.

### Gate 2: Threat Model Validity

**If after Step 2:**
- No threats identified (empty threat model)
- Risk ratings missing

**Then:** Note this in the summary. The baseline may not have triggered threat concerns, or more context is needed.

---

## Output

Produce:
1. Full outputs from each skill (Steps 1-3)
2. Summary document (Step 4) — this is the user-facing deliverable

The summary adapts to user's data. It should feel personalized, not templated.

---

## Next Steps

After completion, offer the user:
- Upgrade path to full Technical Readiness Pack (7 skills) if they need compliance/privacy deeper dive
- Specific follow-up skills based on their results
- Re-run with different product context if they want to compare approaches
