# Output Schema: Technical Readiness Pack

The Technical Readiness Pack is the Batch 3 deliverable — a single, shareable document produced by chaining 7 skills in sequence. This schema defines the exact structure of the synthesized output.

---

## Section 1: Architecture Summary (required)

### 1a. Product Overview
- **Product name** (required)
- **One-line description** (required)
- **Target market** (required): geography + customer segment
- **Data sensitivity level** (required): highest classification tier in the system (Public/Internal/Confidential/Restricted)
- **Input source** (required): "Validation Pack" or "Standalone"

### 1b. System Context Diagram (required)
- Mermaid or text-based diagram from Architecture Design output
- All external actors and dependencies shown

### 1c. Container Architecture (required)
- Container diagram from Architecture Design output
- Summary table: Container | Technology | Responsibility

### 1d. Key Architecture Decisions (required)
- Top 5 decisions from the Architecture Decision Record
- Each with: decision, rationale, trade-offs

---

## Section 2: Security Posture Assessment (required)

### 2a. Security Requirements Status (required)
| Metric | Value |
|--------|-------|
| Total P0 requirements | (count) |
| P0 requirements addressed by architecture | (count) |
| P0 coverage percentage | (%) |
| Total P1 requirements | (count) |
| Total P2 requirements | (count) |

### 2b. Top Threats (required)
From Threat Modeling, top 5 threats by risk level:
| # | Threat | STRIDE Category | Risk Level | Mitigation Status |
|---|--------|----------------|------------|------------------|
| 1 | (required) | S/T/R/I/D/E | Critical/High/Medium/Low | Mitigated/Partial/Unmitigated |

### 2c. Security Architecture Findings (required)
From Security Architecture Review, critical and high findings:
| # | Finding | Severity | Component | Remediation | Effort |
|---|---------|----------|-----------|-------------|--------|
| 1 | (required) | Critical/High | (container name) | (required) | S/M/L |

### 2d. Security Posture Rating (required)
- **Rating** (required): Strong / Adequate / Weak / Critical
- **Rationale** (required): 2-3 sentences explaining the rating based on findings

---

## Section 3: Data Protection Summary (required)

### 3a. Data Sensitivity Overview (required)
| Data Type | Sensitivity Level | Location(s) | PII? |
|-----------|------------------|-------------|------|
| (required, minimum 5 data types) | Public/Internal/Confidential/Restricted | Where stored | Yes/No |

### 3b. PII Exposure Map (required)
- Summary of PII types identified and where each flows through the system
- Key exposure points (where PII crosses trust boundaries)
- Protection status per exposure point (Protected/Partial/Unprotected)

### 3c. Data Protection Posture (required)
- **Rating** (required): Strong / Adequate / Weak
- **Key gaps** (required): top 3 data protection gaps
- **Retention compliance** (required): are retention policies defined for all data types? (Yes/Partial/No)

---

## Section 4: Regulatory Compliance Status (required)

### 4a. Applicable Regulations (required)
| Regulation | Applies? | Compliance Status | Critical Gaps |
|-----------|----------|------------------|---------------|
| (required, minimum 4 evaluated) | Yes/No/Partial | Compliant/Gaps/Non-compliant | (count or "None") |

### 4b. Critical Compliance Gaps (required)
For each gap with severity High or Critical:
| # | Regulation | Requirement | Current State | Remediation | Deadline |
|---|-----------|-------------|---------------|-------------|----------|
| 1 | (required) | (required) | (required) | (required) | (required) |

### 4c. Privacy Policy Status (required)
- **Generated?** (required): Yes / No
- **Regulations covered** (required): which regulations the policy addresses
- **Key data practices disclosed** (required): summary of what the policy covers

---

## Section 5: Certification Roadmap (required)

### 5a. Phased Roadmap (required)
| Phase | Business Milestone | Actions | Estimated Effort | Estimated Cost |
|-------|-------------------|---------|-----------------|----------------|
| Pre-launch | (required) | (required) | (required) | (required) |
| Post-launch | (required) | (required) | (required) | (required) |
| Growth | (required) | (required) | (required) | (required) |
| Scale | (conditional — include if relevant) | | | |

### 5b. Quick Wins (required)
| Control | Frameworks Satisfied | Effort | Impact |
|---------|---------------------|--------|--------|
| (required, minimum 3) | (which certs/regulations) | S/M/L | (what it enables) |

### 5c. Investment Summary (required)
- **Total estimated first-year cost** (required)
- **Annual ongoing cost** (required)
- **First recommended certification** (required): which one and why
- **Recommended timeline to first certification** (required)

---

## Section 6: Consolidated Risk Register (required)

Top 10 risks merged from all skills, deduplicated, sorted by severity:
| # | Risk | Source Skill | Severity | Likelihood | Impact | Mitigation | Owner |
|---|------|-------------|----------|-----------|--------|-----------|-------|
| 1 | (required) | Architecture/Security/Data/Compliance | Critical/High/Medium/Low | 1-5 | 1-5 | (required) | Security/Compliance/Architecture |

Minimum 8 risks, maximum 15. Each must have a specific mitigation action (not "address this risk").

---

## Section 7: Recommendation (required)

### 7a. Verdict (required)
One of:
- **READY** — Architecture is secure and compliant enough to proceed to build
- **NEEDS WORK** — Specific issues must be addressed but architecture is fundamentally sound
- **REDESIGN** — Fundamental architectural changes needed before proceeding

### 7b. Verdict Rationale (required)
- 3-5 sentences explaining the verdict
- Reference specific findings from Sections 2-6

### 7c. Decision Logic (required)
| Criterion | Value | Threshold |
|-----------|-------|-----------|
| Critical risks unmitigated | (count) | READY: 0, NEEDS WORK: 1-2, REDESIGN: 3+ |
| High risks | (count) | READY: ≤ 2, NEEDS WORK: 3-5, REDESIGN: 6+ |
| Security posture rating | (from 2d) | READY: Strong/Adequate, NEEDS WORK: Weak, REDESIGN: Critical |
| Gate PAUSE triggered? | Yes/No | READY: No, NEEDS WORK: Yes (continued), REDESIGN: Yes (unresolved) |

### 7d. Next Steps (required)
Based on verdict:

**If READY:**
- Implement P0 security requirements before launch (list top 5)
- Begin pre-launch phase of certification roadmap
- Schedule first penetration test for [timeline]

**If NEEDS WORK:**
- Address critical findings (list each with owner and timeline)
- Re-assess after addressing critical items
- Do not proceed to build until [specific conditions] are met

**If REDESIGN:**
- Specific architectural changes recommended (list each)
- Re-run Technical Readiness Pack after redesign
- Consider consulting with [type of expert] for [specific area]

---

## Validation Rules

1. All 7 sections must be present and populated
2. Verdict must be one of: READY, NEEDS WORK, REDESIGN
3. Risk register has 8-15 entries, all with specific mitigations
4. At least 4 regulations evaluated in Section 4
5. Certification roadmap has at least 3 phases
6. Every finding references a specific component or data flow (not generic)
7. No placeholder content — all fields populated with scenario-specific data
8. If a gate triggered PAUSE, it must be reflected in the verdict rationale
9. Quick wins section has at least 3 entries
10. Privacy policy status is reported (generated or not, with reason if not)
