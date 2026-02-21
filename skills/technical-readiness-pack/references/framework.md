# Technical Readiness Pack Framework

## Overview

The Technical Readiness Pack orchestrates 7 security/architecture skills into a cohesive technical readiness artifact. This framework defines the methodology for each skill, the decision gate logic, and the synthesis process.

---

## Skill Methodologies

### 1. Architecture Design

**Purpose:** Produce system architecture consumed by all other skills

**Method:**
1. Define system boundaries and scope
2. Identify containers (services, apps, databases)
3. Document data flows between components
4. Specify authentication/authorization design
5. Define data storage and classification
6. List technology choices per component

**Output:** Architecture diagram + component specification

---

### 2. Security Requirements Baseline

**Purpose:** Define minimum security bar for launch

**Method:**
1. Map architecture components to security requirements
2. Categorize requirements: Authentication, Authorization, Data Protection, Logging, Compliance
3. Prioritize: P0 (must have), P1 (should have), P2 (nice to have)
4. Identify gaps between requirements and current state
5. Document compliance obligations

**Output:** Requirements checklist with status per component

---

### 3. Threat Modeling (STRIDE)

**Purpose:** Identify threats against architecture

**Method:**
1. Apply STRIDE per component:
   - **S**poofing: Can someone fake their identity?
   - **T**ampering: Can data be modified without detection?
   - **R**epudiation: Can users deny actions?
   - **I**nformation Disclosure: Can sensitive data leak?
   - **D**enial of Service: Can system be made unavailable?
   - **E**levation of Privilege: Can users gain unauthorized access?
2. For each threat, document:
   - Affected component
   - Attack vector
   - Risk rating (Critical/High/Medium/Low)
   - Existing mitigations
   - Recommended controls

**Output:** Threat register with STRIDE analysis

---

### 4. Security Architecture Review

**Purpose:** Evaluate architecture against threats

**Method:**
1. Review auth flows end-to-end
2. Trace data through entire lifecycle
3. Assess attack surface (exposed APIs, ports, services)
4. Evaluate third-party dependencies
5. Check for security anti-patterns
6. Assess incident response capability

**Output:** Security findings with severity and recommendations

---

### 5. Data Protection Assessment

**Purpose:** Map data lifecycle and protection

**Method:**
1. Create data inventory (what data is collected, processed, stored)
2. Classify data sensitivity (Public, Internal, Confidential, Restricted)
3. Map PII exposure (what PII, where, who has access)
4. Define retention policies per data type
5. Assess protection mechanisms (encryption at rest/transit, access controls)
6. Identify data flow risks

**Output:** Data inventory + protection assessment

---

### 6. Privacy Regulation Assessment

**Purpose:** Triage applicable regulations

**Method:**
1. Determine applicable jurisdictions (where users are, where data is stored)
2. Triage regulations by applicability:
   - **GDPR** (EU users)
   - **CCPA/CPRA** (California users)
   - **HIPAA** (health data)
   - **COPPA** (children's data)
   - **SOC 2** (customer requirement)
3. For each applicable regulation:
   - Assess current compliance status
   - Identify gaps
   - Estimate remediation effort
4. Draft privacy policy sections

**Output:** Regulation applicability matrix + compliance gaps

---

### 7. Security & Compliance Roadmap

**Purpose:** Create phased timeline

**Method:**
1. Consolidate findings from all prior skills
2. Prioritize by risk (severity × likelihood)
3. Identify quick wins (high impact, low effort)
4. Estimate timeline for each initiative
5. Identify dependencies between initiatives
6. Estimate costs where applicable

**Output:** Phased roadmap with milestones

---

## Decision Gate Logic

### Gate 1: Architecture Completeness

**Trigger (PAUSE):**
```
undefined_components > 2 OR
unmapped_requirements > 5 OR
no_data_flow_diagram
```

**Rationale:** Security analysis on incomplete architecture produces meaningless results

**Output:** Partial pack with gap list, request more detail

---

### Gate 2: Security Risk Threshold

**Trigger (PAUSE):**
```
critical_unmitigated_threats >= 2 OR
fundamental_auth_flaws == true OR
overall_assessment == "Critical"
```

**Rationale:** Compliance on insecure architecture wastes effort

**Output:** Partial pack with critical findings, must address before continuing

---

## Risk Scoring

### Threat Severity

| Rating | Definition |
|--------|------------|
| Critical | Immediate risk of data breach or system compromise |
| High | Significant vulnerability with potential for exploitation |
| Medium | Moderate risk requiring attention |
| Low | Minor issue, address when possible |

### Likelihood

| Rating | Definition |
|--------|------------|
| High | Likely to be exploited in next 12 months |
| Medium | Possible within 12-24 months |
| Low | Unlikely in foreseeable future |

### Risk = Severity × Likelihood

| Risk Score | Action |
|------------|--------|
| 12-16 (Critical) | Immediate mitigation required |
| 8-11 (High) | Address within 30 days |
| 4-7 (Medium) | Address within 90 days |
| 1-3 (Low) | Address in next planning cycle |

---

## Certification Timeline Estimates

| Certification | Typical Timeline | Estimated Cost |
|--------------|------------------|----------------|
| SOC 2 Type II | 3-12 months | $30K-80K |
| ISO 27001 | 6-18 months | $50K-150K |
| HIPAA | 3-6 months | $20K-50K |
| GDPR (basic compliance) | 1-3 months | $10K-30K |
| PCI DSS | 2-6 months | $20K-100K |

---

## Quick Wins (High Impact, Low Effort)

1. Enable HTTPS/TLS everywhere
2. Implement MFA for admin accounts
3. Add security headers (CSP, HSTS)
4. Enable database encryption at rest
5. Configure logging and alerting
6. Use secrets management (not env vars in code)
7. Implement rate limiting on APIs
8. Add input validation and sanitization

---

## Glossary

| Term | Definition |
|------|------------|
| STRIDE | Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege |
| PII | Personally Identifiable Information |
| DLP | Data Loss Prevention |
| MFA | Multi-Factor Authentication |
| RBAC | Role-Based Access Control |
| TLS | Transport Layer Security |
| CSP | Content Security Policy |
| HSTS | HTTP Strict Transport Security |
| SOC 2 | Service Organization Control 2 (security framework) |
| GDPR | General Data Protection Regulation |
| CCPA | California Consumer Privacy Act |

---

## Quality Thresholds

| Element | Minimum | Maximum |
|---------|---------|---------|
| Threat Model Entries | 10 | No max |
| Data Inventory Items | 5 | No max |
| Regulations Assessed | Applicable ones | All major |
| Roadmap Phases | 2 | 5 |
| Quick Wins Identified | 3 | 10 |

---

## Common Pitfalls

1. **Generic threat model** — Must be specific to actual technologies
2. **Ignoring existing compliance** — Don't repeat if user already has certifications
3. **Jargon without explanation** — Non-security experts use these skills
4. **Unrealistic timelines** — Certifications take months, not weeks
5. **Missing TBD handling** — Distinguish intentional vs. forgotten components
6. **Gate 2 bypass** — Don't continue to compliance with critical security flaws
