# Batch 3 Completion Plan

**Date:** 2026-02-19
**Status:** Ready for implementation
**Branch:** `claude/add-notion-ai-prompt-p0fNB`
**Starting commit:** `c73f6f9` ("Add Batch 3 security skills and Technical Readiness Pack")

---

## 1. Overview of Work Completed

Batch 3 adds 7 security/compliance skills and an orchestration layer (the Technical Readiness Pack) to AgentPad. A prior session built the majority of this — 21 files totalling ~5,400 lines of skill documentation, plus a 539-line orchestration directive, a 313-line design document, and a 183-line pack output schema.

### What was built (complete)

| Skill | SKILL.md | framework.md | output-schema.md | worked-example.md |
|-------|----------|-------------|------------------|-------------------|
| Architecture Design | 169 lines | 198 lines | 238 lines | 383 lines |
| Security Requirements Baseline | 147 lines | 308 lines | 178 lines | — |
| Threat Modeling | 145 lines | 355 lines | 220 lines | — |
| Security Architecture Review | 158 lines | 360 lines | 231 lines | 413 lines |
| Data Protection Assessment | 192 lines | 486 lines | — | — |
| Privacy Regulation Assessment | 160 lines | 420 lines | — | — |
| Security & Compliance Roadmap | 143 lines | 301 lines | — | — |
| Technical Readiness Pack (meta) | N/A | N/A | 183 lines | N/A |

### Supporting infrastructure (complete)

- **Design doc:** `docs/plans/technical-readiness-pack-design.md` — 313 lines. Defines the pack concept, skill chaining spec, data contracts between skills, decision gates, and output document structure.
- **Orchestration directive:** `directives/run_technical_readiness_pack.md` — 539 lines. Step-by-step execution flow, gate logic, error handling, and final assembly instructions.
- **Pack output schema:** `skills/technical-readiness-pack/output-schema.md` — 183 lines. 7-section output contract with validation rules and verdict criteria.

### Process undertaken

The build followed the process defined in `docs/plans/2026-02-12-skill-design-pattern.md` and `directives/build_skill.md`:

1. **Design phase** — Product owner and AI brainstormed the restructured Batch 3 scope (originally 9 skills → 7 after devil's advocate assessment identified overlaps and premature skills). Produced `technical-readiness-pack-design.md`.
2. **Architecture Design skill** — Built first as the foundation all other skills consume. Includes a complete InvoiceFlow worked example showing a Container-level C4 architecture for a freelance invoicing SaaS.
3. **Security skills (4)** — Built Security Requirements Baseline, Threat Modeling, Security Architecture Review, and Data Protection Assessment. Each has a SKILL.md with core workflow + quality criteria + common mistakes, and a framework.md with detailed methodology. Security Architecture Review was completed with all 4 files including a worked example.
4. **Compliance skills (2)** — Built Privacy Regulation Assessment and Security & Compliance Roadmap with SKILL.md + framework.md.
5. **Orchestration** — Created the Technical Readiness Pack directive and output schema, connecting all 7 skills with data contracts and decision gates.
6. **Rate limit hit** — The implementing agent exhausted its context/rate budget before completing output schemas for the last 3 skills and worked examples for 5 skills.

---

## 2. What Remains (9 files)

### 2a. Missing output schemas (3 files)

These define the exact structure of what each skill produces — the data contract that downstream skills consume. Without them, the chain relies on implicit contracts inferred from SKILL.md descriptions.

| File to create | Approximate length | Upstream dependencies |
|---------------|-------------------|----------------------|
| `skills/data-protection-assessment/references/output-schema.md` | ~180 lines | Follow pattern from `security-requirements-baseline/references/output-schema.md` |
| `skills/privacy-regulation-assessment/references/output-schema.md` | ~200 lines | Follow same pattern |
| `skills/security-compliance-roadmap/references/output-schema.md` | ~170 lines | Follow same pattern |

### 2b. Missing worked examples (5 files)

These are complete InvoiceFlow walkthroughs showing the skill applied to a concrete scenario. They serve as both documentation and implicit test cases. All should use the same InvoiceFlow product context established in `skills/architecture-design/references/worked-example.md`.

| File to create | Approximate length | Key content |
|---------------|-------------------|-------------|
| `skills/security-requirements-baseline/references/worked-example.md` | ~350 lines | InvoiceFlow OWASP ASVS Level 1 mapping, P0/P1/P2 prioritisation |
| `skills/threat-modeling/references/worked-example.md` | ~400 lines | InvoiceFlow STRIDE analysis, attack trees, risk register |
| `skills/data-protection-assessment/references/worked-example.md` | ~400 lines | InvoiceFlow data inventory, PII map, protection assessment |
| `skills/privacy-regulation-assessment/references/worked-example.md` | ~400 lines | InvoiceFlow regulation triage, GDPR/CCPA assessment, privacy policy draft |
| `skills/security-compliance-roadmap/references/worked-example.md` | ~350 lines | InvoiceFlow phased cert roadmap mapped to business milestones |

### 2c. Not required

- **Technical Readiness Pack SKILL.md** — intentionally absent. This is a meta-skill; its workflow lives in `directives/run_technical_readiness_pack.md`.
- **Technical Readiness Pack worked example** — would be the full 7-skill chain output. Nice to have but not a blocker; each individual skill example demonstrates its contribution.

---

## 3. Implementation Plan

### Guiding principles

1. **Follow established patterns exactly.** Every completed output schema and worked example follows a consistent format. The new files must match. Read the existing exemplars before writing.
2. **Use InvoiceFlow throughout.** All worked examples use the same product: AI-powered invoicing for freelance designers. The scenario context is defined in `skills/architecture-design/references/worked-example.md`. Each example should consume the outputs of upstream skills (i.e., the threat modeling example should reference the actual architecture from the architecture example).
3. **Output schemas define data contracts.** Each must specify: what the skill **Consumes** (with `context.*` field paths), what it **Produces** (with `context.*` field paths), and the exact section-by-section output structure with (required)/(conditional) annotations.
4. **Worked examples are complete outputs.** Not summaries or excerpts. They show the full skill output as it would appear when the skill runs — every section populated with InvoiceFlow-specific content.

### Step 1: Build the 3 output schemas (do first — they inform the worked examples)

These can be built in parallel since they don't depend on each other. Each follows the identical format pattern established by the 4 existing output schemas.

**Pattern to follow** (read these files first):
- `skills/security-requirements-baseline/references/output-schema.md` (178 lines)
- `skills/threat-modeling/references/output-schema.md` (220 lines)
- `skills/security-architecture-review/references/output-schema.md` (231 lines)

**For each output schema:**

1. Read the skill's SKILL.md and framework.md to understand what sections the output contains.
2. Read the Technical Readiness Pack design doc section 4 ("Data Contracts Between Skills") to understand what downstream skills expect from this skill's output.
3. Read the Technical Readiness Pack output schema to understand what fields from this skill appear in the final synthesised document.
4. Write the output-schema.md with:
   - **Data Contracts** header: Consumes (list `context.*` fields from upstream skills) + Produces (list `context.*` fields this skill outputs for downstream skills)
   - **Section-by-section output structure**: Mirror the sections defined in SKILL.md's "Output Format" / core workflow, adding (required)/(conditional) annotations and field-level specifications
   - **Validation rules** (at the bottom): Minimum counts, required fields, format constraints

**File 1: `skills/data-protection-assessment/references/output-schema.md`**

Consumes from: `context.architecture.*` (containers, data_flows, storage, auth_design, system_context) + `context.security_baseline.*` (requirements_checklist)

Produces for downstream: `context.data_protection.data_inventory`, `context.data_protection.data_flow_map`, `context.data_protection.pii_exposure_map`, `context.data_protection.access_controls`, `context.data_protection.retention_policies`, `context.data_protection.protection_recommendations`

Output sections to define (from SKILL.md workflow):
1. Data Context Summary
2. Data Inventory (complete table of all data types with store, sensitivity, collection method, legal basis)
3. Data Flow Map with Classification (flows between components with sensitivity levels)
4. PII Exposure Assessment (PII types, lifecycle stages, exposure ratings)
5. Access Control Assessment (access matrix, enforcement, gaps)
6. Retention and Deletion Assessment (policies per data type, right-to-erasure support)
7. Protection Recommendations (prioritised by sensitivity × exposure × current state)
8. Data Protection Summary (posture rating, top risks, handoff notes)

**File 2: `skills/privacy-regulation-assessment/references/output-schema.md`**

Consumes from: `context.data_protection.*` (data_inventory, pii_exposure_map, retention_policies) + `context.architecture.containers` (for jurisdiction) + Validation Pack context (target markets, customer segments)

Produces for downstream: `context.privacy_regulation.applicable_regulations`, `context.privacy_regulation.compliance_assessments`, `context.privacy_regulation.data_processing_activities`, `context.privacy_regulation.regulatory_risks`, `context.privacy_regulation.remediation_roadmap`, `context.privacy_regulation.privacy_policy_draft`

Output sections to define (from SKILL.md workflow):
1. Regulatory Context
2. Regulation Triage Results (decision tree output: which regulations apply and why)
3. Per-Regulation Compliance Assessment (gap analysis for each applicable regulation)
4. Data Processing Activities Map (legal basis, data subject rights, cross-border transfers)
5. Regulatory Risk Assessment (penalty exposure, enforcement likelihood, breach notification)
6. Remediation Roadmap (prioritised by risk and effort, cross-regulation synergies)
7. Privacy Policy Draft (generated from actual data practices)
8. Regulation Assessment Summary (compliance posture, top risks, handoff notes)

**File 3: `skills/security-compliance-roadmap/references/output-schema.md`**

Consumes from: All prior `context.*` fields (architecture, security_baseline, threat_model, security_review, data_protection, privacy_regulation)

Produces for downstream: `context.compliance_roadmap.certification_universe`, `context.compliance_roadmap.phased_roadmap`, `context.compliance_roadmap.quick_wins`, `context.compliance_roadmap.investment_summary`, `context.compliance_roadmap.decision_triggers`

Output sections to define (from SKILL.md workflow):
1. Context Summary (synthesis of prior skill outputs relevant to compliance)
2. Certification Universe (all evaluated certs with applicability assessment)
3. Certification-to-Milestone Mapping (which certs matter at which business stage)
4. Effort and Cost Estimates (per certification: prep time, audit cost, tooling, maintenance)
5. Quick Wins (controls that satisfy multiple frameworks simultaneously)
6. Phased Roadmap (timeline with decision triggers, not fixed dates)
7. Roadmap Summary (investment summary, critical path, handoff notes)

### Step 2: Build the 5 worked examples

These should be built sequentially in skill-chain order because each example should reference outputs from upstream skill examples (building the cumulative InvoiceFlow context).

**Pattern to follow** (read these files first):
- `skills/architecture-design/references/worked-example.md` (383 lines) — the foundation scenario
- `skills/security-architecture-review/references/worked-example.md` (413 lines) — shows how to reference upstream skill outputs

**For each worked example:**

1. Read the skill's SKILL.md (core workflow), output-schema.md (required structure), and framework.md (methodology).
2. Read the InvoiceFlow architecture example (`skills/architecture-design/references/worked-example.md`) for product context.
3. Read any upstream skill's worked example if it exists (e.g., the security architecture review example references threat model outputs).
4. Write the worked-example.md as a **complete skill output** — not a summary, not an excerpt. Every section from the output schema must be populated with InvoiceFlow-specific content.

**File 4: `skills/security-requirements-baseline/references/worked-example.md`**

- **Scenario setup:** InvoiceFlow post-architecture. Reference the containers, data flows, auth design, and storage from the architecture example.
- **Key content to generate:**
  - Security context assessment (data sensitivity = Confidential due to financial data + PII, threat profile = moderate, team capability = solo founder)
  - OWASP ASVS Level 1 mapping across 9 domains, tailored to InvoiceFlow's specific architecture (Clerk auth, Supabase RLS, Stripe payment handling, OpenAI API calls)
  - P0/P1/P2 prioritisation with rationale (P0 = auth, input validation, data protection; P1 = session management, error handling; P2 = logging, cryptographic standards)
  - Architecture-specific risks (e.g., Supabase RLS misconfiguration, OpenAI prompt injection, Stripe webhook signature verification)

**File 5: `skills/threat-modeling/references/worked-example.md`**

- **Scenario setup:** InvoiceFlow post-architecture + post-security-baseline. Reference the security requirements from File 4.
- **Key content to generate:**
  - Threat actors (3-4: external attacker, malicious client via portal, compromised third-party, insider/founder credential compromise)
  - STRIDE analysis per component boundary (Web App, API Server, Database, Background Jobs, Cache + all external integrations)
  - Attack trees for top 3 threats (e.g., financial data exfiltration, payment manipulation via Stripe webhook forgery, account takeover via Clerk misconfiguration)
  - Risk register with Likelihood × Impact ratings (expect ~12-18 entries across Critical/High/Medium/Low)
  - Mitigations with effort estimates and residual risk

**File 6: `skills/data-protection-assessment/references/worked-example.md`**

- **Scenario setup:** InvoiceFlow post-architecture + post-security-baseline. Reference containers and storage from architecture example.
- **Key content to generate:**
  - Complete data inventory (every data type across Supabase, Clerk, Stripe, S3, OpenAI, Inngest, Resend, Vercel logs, browser localStorage)
  - Data flow map with classification (show sensitivity levels at each flow: user → Web App → API → Supabase, user → Clerk, invoice → Stripe, prompts → OpenAI)
  - PII exposure assessment (direct identifiers: name, email, address; indirect: invoice amounts, payment history; sensitive: bank account details)
  - Access control matrix (founder = full access, Supabase RLS per user, Clerk manages auth tokens, Stripe restricted keys)
  - Retention and deletion policies (user data = account lifetime + 30 days, financial records = 7 years for tax, OpenAI prompts = check data retention policy)
  - Protection recommendations prioritised

**File 7: `skills/privacy-regulation-assessment/references/worked-example.md`**

- **Scenario setup:** InvoiceFlow with data inventory from File 6. Target market = US + EU freelancers.
- **Key content to generate:**
  - Regulation triage: GDPR (yes — EU freelancers), CCPA (conditional — depends on CA user count), PCI-DSS (no — Stripe handles card data, but SAQ-A may apply), COPPA (no — adult users), HIPAA (no — no health data)
  - GDPR gap analysis (lawful basis for each processing activity, DPIA assessment, cross-border transfer assessment for US-hosted services, data subject rights implementation)
  - CCPA assessment (if applicable: right to know, right to delete, right to opt-out, do-not-sell)
  - Regulatory risk assessment (GDPR penalty exposure, breach notification requirements)
  - Remediation roadmap with cross-regulation synergies
  - Privacy policy draft covering InvoiceFlow's actual data practices

**File 8: `skills/security-compliance-roadmap/references/worked-example.md`**

- **Scenario setup:** InvoiceFlow with all prior analysis. Solo founder, pre-launch, targeting $0 → $500K ARR in year 1.
- **Key content to generate:**
  - Certification universe evaluation (SOC 2, ISO 27001, GDPR certification, PCI-DSS SAQ-A, HIPAA — with applicability assessment for InvoiceFlow specifically)
  - Milestone mapping (pre-launch: security baseline + privacy policy; $0-100K: penetration test + GDPR compliance; $100K-500K: SOC 2 Type I; $500K-2M: SOC 2 Type II + ISO 27001 consideration)
  - Quick wins (controls satisfying both SOC 2 and GDPR: access controls, encryption, incident response, data retention policies)
  - Effort and cost estimates per certification
  - Phased roadmap with decision triggers (e.g., "pursue SOC 2 when enterprise sales pipeline > $50K or when 3+ prospects request it")

### Step 3: Commit and push

After all 8 files are written:

1. `git add` all new files
2. Commit: `Complete Batch 3 skill reference files: output schemas and worked examples`
3. Push to `claude/add-notion-ai-prompt-p0fNB`

---

## 4. Verification checklist

After implementation, verify:

- [ ] Every skill directory has all 4 files: SKILL.md, references/framework.md, references/output-schema.md, references/worked-example.md
- [ ] All output schemas follow the Consumes/Produces/Section pattern from existing schemas
- [ ] All worked examples use the InvoiceFlow scenario consistently
- [ ] Worked examples reference upstream skill outputs (not invented data that contradicts other examples)
- [ ] Data contract field paths (`context.*`) are consistent across output schemas and the Technical Readiness Pack design doc (section 4)
- [ ] Each worked example populates every section defined in its output schema
- [ ] No file exceeds 500 lines (per skill quality standards)

---

## 5. File inventory after completion

```
skills/
├── architecture-design/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               ✅ exists
│       └── worked-example.md              ✅ exists
├── security-requirements-baseline/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               ✅ exists
│       └── worked-example.md              🔨 Step 2, File 4
├── threat-modeling/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               ✅ exists
│       └── worked-example.md              🔨 Step 2, File 5
├── security-architecture-review/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               ✅ exists
│       └── worked-example.md              ✅ exists
├── data-protection-assessment/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               🔨 Step 1, File 1
│       └── worked-example.md              🔨 Step 2, File 6
├── privacy-regulation-assessment/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               🔨 Step 1, File 2
│       └── worked-example.md              🔨 Step 2, File 7
├── security-compliance-roadmap/
│   ├── SKILL.md                           ✅ exists
│   └── references/
│       ├── framework.md                   ✅ exists
│       ├── output-schema.md               🔨 Step 1, File 3
│       └── worked-example.md              🔨 Step 2, File 8
└── technical-readiness-pack/
    └── output-schema.md                   ✅ exists
```

**Total new files:** 8
**Estimated total new lines:** ~2,450 (3 schemas × ~180 avg + 5 examples × ~380 avg)

---

## 6. Notes for the implementer

1. **Read before writing.** For each file type, read both existing exemplars first. The architecture-design and security-architecture-review skills have complete sets of all 4 files — study them.

2. **InvoiceFlow consistency matters.** The worked examples form a chain. The threat model example should reference the exact containers and data flows from the architecture example. The data protection example should reference the same tech stack. Contradictions between examples undermine the entire pack concept.

3. **Output schemas are structural contracts, not content guides.** They define what sections and fields must exist — not what values they should contain. Use (required) and (conditional) annotations. Don't over-specify content.

4. **The Technical Readiness Pack design doc (section 4) is the source of truth for data contracts.** When writing `Consumes` and `Produces` blocks in output schemas, cross-reference `docs/plans/technical-readiness-pack-design.md` section 4 to ensure field paths match.

5. **Expect ~180-200 lines per output schema, ~350-400 lines per worked example.** These are the ranges established by the existing files. Don't pad to hit a target, but if a file is significantly shorter, it's probably missing content.

6. **The 3 output schemas can be built in parallel.** The 5 worked examples should ideally be built in chain order (security-requirements-baseline → threat-modeling → data-protection → privacy-regulation → compliance-roadmap) so each can reference the prior example's outputs. However, if parallelism is needed, each example can reference "assumed" upstream outputs as the security-architecture-review example already does.
