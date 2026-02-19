# Directive: Run Technical Readiness Pack

**Goal:** Execute the Technical Readiness Pack skill chain to produce a tangible, shareable deliverable that answers "Is this architecture secure, compliant, and ready to build?"

**Inputs:**
- A Validation Pack output (preferred) OR a standalone product description with architecture context
- Optionally: existing tech stack choices, known regulatory requirements, target launch date

**Tools/Scripts:**
- Skills (run in order): `skills/architecture-design/`, `skills/security-requirements-baseline/`, `skills/threat-modeling/`, `skills/security-architecture-review/`, `skills/data-protection-assessment/`, `skills/privacy-regulation-assessment/`, `skills/security-compliance-roadmap/`
- Output schema: `skills/technical-readiness-pack/output-schema.md`
- Design reference: `docs/plans/technical-readiness-pack-design.md`

**Outputs:**
- A complete Technical Readiness Pack document conforming to `skills/technical-readiness-pack/output-schema.md`
- OR a partial pack with NEEDS WORK / REDESIGN recommendation if a decision gate triggers

---

## Process

### Step 0: Gather Product and Architecture Context

Before running any skill, ensure you have enough context. At minimum, you need:

1. **What the product does** — a clear description of the product or feature
2. **Who it's for** — target customer segment
3. **What data it handles** — data types and sensitivity (PII, financial, health, etc.)
4. **Revenue model** — affects compliance requirements (B2B vs B2C, payment handling)

**Preferred input:** Validation Pack output. If available, extract:
- `context.requirements` — functional requirements, constraints
- `context.personas` — target users, data sensitivity signals
- `context.feature_priority` — Tier 1 features for architecture scope
- `context.business_case` — revenue model, pricing, market geography
- `context.journey` — user journeys to map in data flows

If Validation Pack is not available, ask the user directly. Keep it conversational — 3-4 questions maximum. Do not run the chain on vague input.

**Review gate — advance when:**
- [ ] Product description is specific enough to design an architecture
- [ ] Data types and sensitivity are known (at least categories)
- [ ] Target market geography is stated (affects regulatory requirements)
- [ ] Revenue model is stated or inferable (affects B2B/B2C compliance paths)

---

### Step 1: Architecture Design

**Load:** `skills/architecture-design/SKILL.md` and its references

**Input:**
- Validation Pack context (if available) or user's product description from Step 0
- Any existing tech stack preferences the user mentioned

**Run the skill.** Produce the full architecture output per the skill's output schema.

**Extract and retain for later steps:**
- System context diagram (external actors, dependencies)
- Container architecture (all containers with technology choices)
- Data flow diagrams (with trust boundaries and sensitivity classification)
- Auth and authorization design
- Storage architecture (databases, file storage, data classification)
- Tech stack recommendations
- Architecture decision record (decisions, deferred items, risk flags)

**Store this output as `context.architecture`** — all subsequent skills reference it.

**Review gate — advance when:**
- [ ] At least 3 containers defined with technology choices
- [ ] Data flows mapped for at least 3 user journeys with trust boundaries
- [ ] Auth approach specified with justification
- [ ] Data sensitivity classification applied to all data stores

---

### Step 2: Security Requirements Baseline

**Load:** `skills/security-requirements-baseline/SKILL.md` and its references

**Input:**
- From `context.architecture`: containers, data flows, auth design, storage, tech stack, trust boundaries
- From Validation Pack (if available): personas (customer segment → data sensitivity)

**Run the skill.** Produce the full security requirements checklist.

**Extract and retain for later steps:**
- Prioritized requirements checklist (P0/P1/P2)
- Architecture-specific risks
- Top 5 security actions
- Deferred items register

**Store this output as `context.security_baseline`.**

**Review gate — advance when:**
- [ ] At least 25 requirements defined
- [ ] At least 8 P0 (must have at launch) requirements
- [ ] Implementation guidance is specific to the chosen tech stack
- [ ] Data sensitivity classification matches architecture output

---

### GATE 1: Architecture Completeness

**Evaluate using `context.architecture` and `context.security_baseline`.**

**PAUSE if ANY of the following are true:**
- Architecture Design output has > 2 "TBD" or undefined components AND
- Security Requirements Baseline cannot map requirements to specific components (too many "generic" entries)

OR:

- No data flow diagram was producible (user couldn't describe what data the system handles)

**If PAUSE triggers:**
1. Inform the user: "The architecture for [product] is not concrete enough for meaningful security analysis."
2. Show: which components are undefined, which data flows are missing
3. Show: minimum information needed to proceed (list specific questions)
4. Ask: "Can you provide more detail about [specific gaps], or would you like to stop here?"
5. If the user provides detail: revise Architecture Design and Security Baseline, then continue
6. If the user wants to stop: produce a **Partial Pack** (Architecture summary + Security Baseline + gap list + recommendations for what to define before re-running)

**If gate passes:** Proceed to Step 3.

---

### Step 3: Threat Modeling

**Load:** `skills/threat-modeling/SKILL.md` and its references

**Input:**
- From `context.architecture`: containers, data flows, trust boundaries, auth design (the system to model)
- From `context.security_baseline`: requirements checklist, priority summary (the bar to measure against)

**Run the skill.** Produce the full STRIDE analysis.

**Extract and retain for later steps:**
- STRIDE analysis per component
- Attack trees for top 3 threats
- Risk register (all threats rated)
- Recommended mitigations

**Store this output as `context.threat_model`.**

**Review gate — advance when:**
- [ ] STRIDE applied to every container boundary
- [ ] At least 3 attack trees produced
- [ ] Risk ratings use defined likelihood × impact scale
- [ ] Mitigations are specific to the tech stack (not generic)

---

### Step 4: Security Architecture Review

**Load:** `skills/security-architecture-review/SKILL.md` and its references

**Input:**
- From `context.architecture`: all fields (the architecture to review)
- From `context.threat_model`: STRIDE analysis, risk register, mitigations (prioritized threats to focus on)

**Run the skill.** Produce the full security review.

**Extract and retain for later steps:**
- Per-component security assessments
- Auth flow review findings
- API security review findings
- Third-party dependency assessment
- Remediation plan (prioritized)

**Store this output as `context.security_review`.**

**Review gate — advance when:**
- [ ] Every container has a security assessment
- [ ] Auth flow reviewed end-to-end for all user types
- [ ] Third-party dependencies assessed with security posture
- [ ] Remediation plan prioritized by threat model severity

---

### GATE 2: Security Risk Threshold

**Evaluate using `context.threat_model` and `context.security_review`.**

**PAUSE if ANY of the following are true:**
- Threat model identifies 2+ Critical risks with no viable mitigation at current stage
- Security Architecture Review finds fundamental auth or data handling flaws requiring architecture redesign (severity = Critical)
- Security Architecture Review overall assessment = "Critical"

**If PAUSE triggers:**
1. Inform the user: "Critical security risks identified in [product] that should be addressed before continuing to compliance assessment."
2. Show: the Critical findings with recommended architectural changes
3. Show: estimated effort to address each Critical finding
4. Ask: "Would you like to revise the architecture to address these risks, or continue with the assessment as-is?"
5. If the user wants to revise: return to Step 1 with specific architectural changes recommended (one revision only)
6. If the user wants to continue: proceed but flag PAUSE prominently in the final pack

**If gate passes:** Proceed to Step 5.

---

### Step 5: Data Protection Assessment

**Load:** `skills/data-protection-assessment/SKILL.md` and its references

**Input:**
- From `context.architecture`: data flows, storage, containers (data stores and flows to inventory)
- From `context.security_baseline`: data protection requirements from the checklist

**Run the skill.** Produce the full data protection assessment.

**Extract and retain for later steps:**
- Complete data inventory (all data stores including third-party)
- PII exposure map
- Data flow classification diagram
- Access control matrix
- Retention policies per data type
- Protection recommendations

**Store this output as `context.data_protection`.**

**Review gate — advance when:**
- [ ] Data inventory includes ALL data stores (including third-party services)
- [ ] PII mapped through entire lifecycle
- [ ] Access control matrix populated
- [ ] Retention policies defined per data type

---

### Step 6: Privacy Regulation Assessment

**Load:** `skills/privacy-regulation-assessment/SKILL.md` and its references

**Input:**
- From `context.data_protection`: data inventory, PII exposure map, data flow classification, retention policies
- From `context.architecture`: containers, storage (geography, infrastructure location)
- From Validation Pack (if available): target market, customer segments, business case (market geography)

**Run the skill.** Produce the full regulatory assessment including privacy policy draft.

**Extract and retain for later steps:**
- Applicable regulations (triage results)
- Per-regulation compliance status
- Gap analysis
- Remediation roadmap
- Privacy policy draft

**Store this output as `context.privacy_regulation`.**

**Review gate — advance when:**
- [ ] Regulation triage evaluated at least 6 frameworks (GDPR, CCPA, HIPAA, PCI-DSS, COPPA, + relevant)
- [ ] Applicable regulations have per-requirement compliance assessment
- [ ] Privacy policy draft reflects actual data practices (not template)
- [ ] Remediation roadmap prioritized by risk and effort

---

### Step 7: Security & Compliance Roadmap

**Load:** `skills/security-compliance-roadmap/SKILL.md` and its references

**Input:**
- From ALL prior context: `context.architecture`, `context.security_baseline`, `context.threat_model`, `context.security_review`, `context.data_protection`, `context.privacy_regulation`

**Run the skill.** Produce the full certification roadmap.

**Extract and retain for synthesis:**
- Certification universe (what's relevant)
- Phased roadmap by business milestone
- Quick wins (controls satisfying multiple frameworks)
- Effort and cost estimates
- Decision triggers

**Store this output as `context.compliance_roadmap`.**

**Review gate — advance when:**
- [ ] Roadmap mapped to specific business milestones (not generic)
- [ ] Effort and cost estimates included per certification
- [ ] Decision triggers defined (what event starts each certification process)
- [ ] Quick wins identified with which frameworks they satisfy

---

### Step 8: Synthesis

**Do not load any skill.** This is an orchestration step — assemble the Technical Readiness Pack from accumulated context.

**Load:** `skills/technical-readiness-pack/output-schema.md` for structure reference.

**Build each section of the Technical Readiness Pack:**

#### 8a. Architecture Summary

From `context.architecture`:
- System context diagram
- Container architecture diagram
- Key technology choices with rationale
- Architecture pattern decision

#### 8b. Security Posture Assessment

Synthesize from `context.security_baseline` + `context.threat_model` + `context.security_review`:
- Security requirements status: P0 requirements met vs. total P0
- Top threats by risk level (from threat model)
- Critical findings from security review
- Remediation priority list (merged from all three skills, deduplicated)

#### 8c. Data Protection Summary

From `context.data_protection`:
- Data sensitivity overview
- PII exposure map (simplified)
- Key access control findings
- Retention policy summary

#### 8d. Regulatory Compliance Status

From `context.privacy_regulation`:
- Applicable regulations
- Compliance status per regulation (Compliant / Gaps / Non-compliant)
- Critical gaps requiring immediate action
- Privacy policy status

#### 8e. Certification Roadmap

From `context.compliance_roadmap`:
- Phased roadmap visualization (Pre-launch → Post-launch → Growth → Scale)
- Quick wins
- Total estimated investment (2-year view)
- Decision triggers

#### 8f. Consolidated Risk Register

Merge and deduplicate risks from ALL skills:
- `context.architecture` → Architecture Decision Record risk flags
- `context.security_baseline` → Architecture-specific risks
- `context.threat_model` → Risk register
- `context.security_review` → Remediation plan critical items
- `context.data_protection` → Data protection risks
- `context.privacy_regulation` → Regulatory risks

Top 10 risks, deduplicated, sorted by severity. Each with: source skill, severity, mitigation, owner (security / compliance / architecture).

#### 8g. Recommendation

Apply recommendation logic:
- **READY:** 0 Critical risks unmitigated, ≤ 2 High risks, no gate triggered PAUSE
- **NEEDS WORK:** 1-2 Critical risks with viable mitigations, OR 3+ High risks, OR gate triggered PAUSE (user continued)
- **REDESIGN:** 3+ Critical risks, OR fundamental architecture flaws identified, OR gate triggered PAUSE with no viable path forward

Include: specific next steps for each recommendation level.

---

**Validate Sections 1-7 of the pack against `skills/technical-readiness-pack/output-schema.md`.** Every required field must be populated. No placeholders.

**Present the Technical Readiness Pack to the user.**

---

## Edge Cases

- **No Validation Pack available:** Accept standalone input. Ask for product description, target market, data types, and tech stack preferences. Architecture Design will work from this directly.
- **User already has an architecture:** Skip Step 1 (Architecture Design). Ask user to provide their architecture in a format compatible with the data contracts (containers, data flows, auth approach, storage). Map to `context.architecture` manually.
- **Trivial architecture (static site, no user data):** Gate 1 may not have enough to work with. Produce a lightweight pack: architecture summary + security baseline (minimal) + note that threat modeling, data protection, and compliance are not applicable. This is a valid output — not every product needs a full security review.
- **User overrides a PAUSE gate:** Proceed, but the final recommendation retains the PAUSE flag with "User override" noted. The pack is still produced but with prominent warnings.
- **Skills produce conflicting findings:** When a later skill contradicts an earlier one (e.g., Security Architecture Review finds a risk the Threat Model missed), include both. The Consolidated Risk Register is the source of truth — it merges all findings.

---

## Learnings

<!-- Updated as Technical Readiness Packs are produced. Record patterns, common failure modes, and process improvements. -->
