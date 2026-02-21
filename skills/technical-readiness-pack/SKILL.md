---
name: technical-readiness-pack
description: Chains 7 security/architecture skills into a technical readiness deliverable. Use when user wants to validate technical architecture — produces READY/NEEDS WORK/REDESIGN recommendation with threat model, compliance roadmap, and risk register.
---

# Technical Readiness Pack

The Technical Readiness Pack answers: **"Is this architecture secure, compliant, and ready to build?"**

It orchestrates 7 skills in sequence: Architecture Design → Security Requirements Baseline → Threat Modeling → Security Architecture Review → Data Protection Assessment → Privacy Regulation Assessment → Security & Compliance Roadmap.

Two decision gates can halt the flow early with a NEEDS WORK or REDESIGN recommendation. The output includes a consolidated risk register, certification roadmap, and clear verdict.

## Core Workflow

### Step 0: Context Setup

- Accept input from Validation Pack OR standalone product description
- Confirm target market geography for compliance scope
- Document any existing security infrastructure (SOC2, HIPAA, etc.)
- **Quality gate:** Require at least basic architecture components defined

### Step 1: Architecture Design

- Produce system architecture with containers, data flows, auth design
- Document tech stack choices, data storage, API boundaries
- Output feeds Steps 2-7

### Step 2: Security Requirements Baseline

- Define minimum security bar for launch
- Map requirements to architecture components
- Identify P0 (must-have) vs P1 (should-have) requirements
- **GATE 1: Architecture Completeness** — If >2 TBD components → PAUSE

### Step 3: Threat Modeling

- Apply STRIDE analysis to architecture components
- Identify threats by category: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege
- Document risk ratings for each threat

### Step 4: Security Architecture Review

- Evaluate architecture against identified threats
- Trace auth flows end-to-end
- Assess data handling security
- **GATE 2: Security Risk Threshold** — If 2+ critical unmitigated threats → PAUSE

### Step 5: Data Protection Assessment

- Full data lifecycle inventory
- Map PII exposure across system
- Define retention policies
- Assess protection mechanisms

### Step 6: Privacy Regulation Assessment

- Triage applicable regulations by jurisdiction (GDPR, CCPA, etc.)
- Assess compliance status for each
- Draft privacy policy sections
- Identify certification requirements

### Step 7: Security & Compliance Roadmap

- Phase timeline for quick wins vs. long-term investments
- Estimate certification costs where applicable
- Consolidate all findings into roadmap

### Step 8: Synthesis

- Compile Technical Readiness Pack with:
  - Architecture Summary
  - Security Posture assessment
  - Data Protection status
  - Regulatory Compliance status
  - Certification Roadmap
  - Risk Register (top 10)
  - Verdict: READY / NEEDS WORK / REDESIGN

## Output Format

The output follows the structure defined in [output-schema.md](output-schema.md):

- **Section 1:** Architecture Summary — diagrams, tech choices, key decisions
- **Section 2:** Security Posture — requirements status, top threats, findings
- **Section 3:** Data Protection — data inventory, PII map, protection posture
- **Section 4:** Regulatory Compliance — applicable regulations, status, policy drafts
- **Section 5:** Certification Roadmap — phased timeline, costs, milestones
- **Section 6:** Risk Register — top 10 consolidated risks
- **Section 7:** Recommendation — READY/NEEDS WORK/REDESIGN with rationale

## Quality Criteria

- [ ] Output follows the defined schema (all required sections populated)
- [ ] Both decision gates explicitly evaluated with verdicts
- [ ] STRIDE analysis covers all architecture components
- [ ] Risk Register includes specific mitigations, not generic advice
- [ ] Regulations triaged by actual jurisdiction applicability
- [ ] Certification timeline includes realistic estimates
- [ ] User can override gate decisions and continue

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [output-schema.md](output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Generic threat model:** STRIDE must be specific to actual technologies, not boilerplate
2. **Ignoring existing compliance:** Don't repeat work if user already has certifications
3. **Jargon overload:** Include glossary for non-security experts
4. **Missing TBD handling:** Distinguish intentional TBD (valid prototype) from forgotten components
5. **Unrealistic timelines:** Certifications like SOC2 take 3-12 months, not weeks
6. **Token overflow:** Implement checkpointing for long chains; warn user if approaching limits
