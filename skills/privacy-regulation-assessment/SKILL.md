---
name: privacy-regulation-assessment
description: Determine which privacy regulations apply to a SaaS product and assess compliance. Use when the user asks about privacy compliance, GDPR, CCPA, data regulations, privacy policy, what regulations apply, compliance requirements, data protection obligations, or how to handle user data legally. Covers multi-regulation triage, per-regulation compliance assessment, gap analysis, remediation roadmap, and privacy policy generation.
---

# Privacy Regulation Assessment

Produce a targeted, multi-regulation privacy compliance assessment for SaaS and digital products. Unlike raw LLM output that defaults to a GDPR-centric checklist, this skill first determines which regulations actually apply based on the product's market geography, user locations, data types, customer segments, and industry vertical — then deep-dives only on applicable regulations. The output includes a compliance gap analysis, prioritized remediation roadmap, and a complete privacy policy draft tailored to the product's actual data practices.

## Core Workflow

### Step 1: Gather Regulatory Context

Before assessing any regulation, establish the product's regulatory surface area:

1. **Load upstream context:**
   - Load Data Protection Assessment output (`context.data_protection`) if available — extract data_inventory, pii_exposure_map, data_flow_classification, retention_policies
   - Load Architecture Design output (`context.architecture`) if available — extract containers, storage, external dependencies
   - Load Validation Pack context if available — extract target market, customer segments, geographic scope

2. **Determine regulatory inputs (ask if not available):**
   - Target market geography — where is the company based? Where are users?
   - User locations — which countries/states do users reside in?
   - Data types handled — PII, financial, health, children's, biometric, behavioral
   - Customer segments — B2B, B2C, or both? Enterprise or consumer?
   - Industry vertical — healthcare, financial services, education, general SaaS?

3. **Document data processing activities:**
   - What data is collected and why?
   - How is it processed, stored, and shared?
   - Who are the data recipients (internal teams, third-party processors, external APIs)?
   - What cross-border data transfers occur?

If the user provides no context about their product's data handling, ask: "What data does your product collect, where are your users located, and what industry are you in?" Do not proceed without understanding the data landscape.

### Step 2: Run Regulation Triage Decision Tree

Apply the regulation triage framework from [references/framework.md](references/framework.md) to determine which regulations apply:

1. **Geography-based triage:**
   - Does the product have users in the EU/EEA? → Evaluate GDPR
   - Does the product have users in California? → Evaluate CCPA/CPRA
   - Does the product have users in Canada? → Evaluate PIPEDA
   - Does the product have users in Brazil? → Evaluate LGPD
   - Check US state-level privacy laws (Virginia VCDPA, Colorado CPA, Connecticut CTDPA, etc.)

2. **Data-type-based triage:**
   - Does the product handle health data? → Evaluate HIPAA
   - Does the product handle payment card data? → Evaluate PCI-DSS
   - Does the product have users under 13? → Evaluate COPPA
   - Does the product handle education records? → Evaluate FERPA

3. **Industry-based triage:**
   - Financial services? → Evaluate GLBA, state financial regulations
   - Healthcare? → HIPAA already flagged above, evaluate HITECH Act
   - Telecommunications? → Evaluate sector-specific regulations

4. **Business-model-based triage:**
   - B2B with enterprise customers? → Assess data processor vs. controller obligations
   - B2C consumer product? → Heightened consent requirements apply

For each regulation, record: Applies (Yes/No/Partial), Confidence (High/Medium/Low), and Rationale.

**Data Subject Rights by Regulation:**

| Right | GDPR | CCPA | HIPAA | LGPD |
|-------|------|------|-------|------|
| Access | ✅ | ✅ | ✅ | ✅ |
| Deletion | ✅ | ✅ | ✅ | ✅ |
| Portability | ✅ | ✅ | ✅ | ✅ |
| Correction | ✅ | ✅ | ✅ | ✅ |
| Objection | ✅ | ✅ | N/A | ✅ |
| Opt-out (sale) | N/A | ✅ | N/A | ✅ |
| Restrict processing | ✅ | N/A | N/A | ✅ |

**Breach Notification Requirements:**

| Regulation | Notification Timeline | Who Notified | Penalty |
|------------|----------------------|--------------|---------|
| GDPR | 72 hours | Supervisory authority | Up to €20M or 4% revenue |
| CCPA | Business discretion | Users (if material) | $7,500/intentional |
| HIPAA | 60 days | HHS + individuals | Up to $1.5M/violation |
| State laws | 30-60 days | Affected individuals | Varies |

---

### Step 3: Per-Regulation Compliance Assessment

For each regulation marked Yes or Partial in the triage:

1. **Map current compliance status** against the regulation's key requirement categories
2. **Identify specific gaps** — what the product currently does vs. what the regulation requires
3. **Assign severity** to each gap — Critical (immediate legal exposure), High (significant risk), Medium (should address), Low (best practice)
4. **Note specific remediation actions** for each gap

Skip regulations marked No — do not assess what doesn't apply. This is the core differentiator from generic compliance checklists.

### Step 4: Map Data Processing Activities

Create a structured map of data processing activities against regulatory requirements:

1. **For each processing activity:** identify data categories, legal basis (consent, legitimate interest, contractual necessity, legal obligation), data subjects affected, recipients/processors, cross-border transfers, and retention period
2. **Validate legal basis:** Is the claimed legal basis defensible for this processing activity under each applicable regulation?
3. **Assess data subject rights:** Can the product currently fulfill data access, deletion, portability, and correction requests?
4. **Evaluate cross-border transfers:** Are adequate safeguards in place (Standard Contractual Clauses, adequacy decisions, binding corporate rules)?

### Step 5: Assess Regulatory Risks

For each applicable regulation, evaluate:

1. **Maximum penalty exposure** — fines, enforcement actions, private right of action
2. **Likelihood of enforcement** — is the regulator active? Are complaints common in this sector?
3. **Notification requirements** — what must happen in case of a data breach?
4. **Reputational risk** — how would non-compliance affect user trust and business relationships?
5. **Timeline pressure** — are there upcoming regulatory deadlines or enforcement ramp-ups?

### Step 6: Produce Remediation Roadmap

Synthesize gaps across all applicable regulations into a prioritized remediation plan:

1. **Prioritize by risk and effort:**
   - Critical gaps with low effort → immediate action
   - Critical gaps with high effort → plan and resource
   - Low-severity gaps → schedule for later
2. **Identify cross-regulation synergies** — actions that close gaps under multiple regulations simultaneously
3. **Set deadline recommendations** tied to regulatory timelines and enforcement risk
4. **Flag dependencies** — what requires engineering changes, legal review, vendor agreements, or policy updates?

### Step 7: Generate Privacy Policy Draft

Produce a complete privacy policy tailored to the product's actual data practices:

1. **Include all required sections** per applicable regulations (GDPR Article 13/14, CCPA disclosure requirements, etc.)
2. **Write in plain language** — no legalese walls; use clear, specific descriptions of data practices
3. **Reference actual data handling** identified in Steps 1 and 4 — not boilerplate
4. **Cover all applicable jurisdictions** with regulation-specific sections where needed
5. **Flag sections requiring legal review** — mark anything that needs attorney validation before publishing

**Practical Implementation Checklist:**

| Requirement | Implementation |
|-------------|----------------|
| Lawful basis | Document legal basis for each processing activity |
| Consent management | Implement consent capture and preference center |
| Right to access | Build data export functionality |
| Right to deletion | Implement data deletion pipeline |
| Privacy policy | Publish and link from all collection points |
| DPA | Execute with all third-party processors |
| Data inventory | Maintain current list of data processed |
| Breach response | Document incident response procedures |

---

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Regulatory Context** — product summary, geography, data types, customer segments
- **Regulation Triage** — which regulations apply and why
- **Per-Regulation Compliance Assessment** — status and gaps for each applicable regulation
- **Data Processing Activity Map** — structured map of all processing activities
- **Regulatory Risk Assessment** — penalties, enforcement likelihood, notification requirements
- **Remediation Roadmap** — prioritized actions with timelines and dependencies
- **Privacy Policy Draft** — complete, tailored privacy policy
- **Assessment Summary** — overall posture, top risks, handoff notes

Expected length: 3,000-6,000 words depending on the number of applicable regulations and complexity of data processing.

## Quality Criteria

- [ ] Regulation triage covers all major frameworks (GDPR, CCPA/CPRA, HIPAA, PCI-DSS, COPPA at minimum)
- [ ] Assessment is specific to applicable regulations only — regulations marked "No" are not assessed in detail
- [ ] Gap analysis references actual data practices from the product, not generic compliance checklists
- [ ] Privacy policy reflects real data handling identified during assessment (not boilerplate)
- [ ] Per-regulation compliance status uses specific requirement categories (not vague "partially compliant")
- [ ] Remediation roadmap is prioritized by risk and effort with cross-regulation synergies identified
- [ ] Data processing activity map covers all identified processing activities with legal basis
- [ ] Cross-border data transfer mechanisms evaluated where applicable
- [ ] Confidence levels assigned to triage decisions with rationale
- [ ] Handoff notes identify areas requiring legal counsel review

## References

- **Regulation triage framework and per-regulation requirements:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Assuming GDPR applies to everyone:** Defaulting to GDPR compliance for all products regardless of whether they have EU users. If a US-only product has no EU users and no plans to serve the EU market, GDPR does not apply. The triage step exists to prevent this — apply it honestly.

2. **Treating compliance as a one-time checkbox:** Producing a static compliance report without acknowledging that regulations evolve, data practices change, and compliance is ongoing. The remediation roadmap must include trigger conditions for reassessment (new market entry, new data types, regulation amendments).

3. **Generating a privacy policy without understanding actual data practices:** Writing a privacy policy from templates before mapping what data the product actually collects, processes, and shares. The privacy policy is Step 7 — not Step 1 — because it must reflect the real data handling discovered during assessment.

4. **Missing sector-specific regulations:** Checking only GDPR and CCPA while ignoring HIPAA (health data), PCI-DSS (payment data), COPPA (children), FERPA (education), or GLBA (financial). The data-type and industry triage branches exist to catch these. Always run all four triage branches.

5. **Conflating privacy regulation with security requirements:** Recommending encryption, firewalls, or penetration testing as privacy compliance actions. Security controls are handled by Security Requirements Baseline and Threat Modeling. This skill focuses on regulatory obligations: lawful basis, data subject rights, consent management, data processing agreements, cross-border transfers, and privacy notices.
