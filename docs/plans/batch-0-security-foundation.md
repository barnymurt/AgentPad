# Batch 0 Design Document: Security Foundation

**Date:** 2026-02-20
**Status:** Ready for implementation (with Devil's Advocate improvements)
**Branch:** `claude/add-notion-ai-prompt-p0fNB`

---

## 1. Vision & Scope

### 1.1 Overview

Batch 0 provides the **Security Foundation** layer for AgentPad — a collection of security, privacy, and compliance skills that form the base of the entire skill architecture. These skills ensure products are built securely from the ground up.

### 1.2 Why This Matters

Security is foundational — it must be considered before any product development begins. These skills provide:

- **Threat identification** before building
- **Security requirements** to guide development
- **Architecture review** to catch gaps
- **Compliance mapping** for regulated industries
- **Data protection** throughout the lifecycle

### 1.3 Scope

**Layer**: Security Foundation (Layer 0 - foundational)
**Skills**: 7 skills + security baseline pack
**Pattern**: Sequential (threats → requirements → review → compliance)

---

## 2. Skill Specifications

### Skill 1: Threat Modeling

**Purpose**: Apply STRIDE threat analysis to identify security threats in system design

**Role**: Security Architect

**Core Workflow**:
1. Gather architecture context (components, data flows, trust boundaries)
2. Identify threat targets (attack surface enumeration)
3. Apply STRIDE per component (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege)
4. Build attack trees for high-severity threats
5. Rate threats using likelihood × impact matrix
6. Recommend specific mitigations

**Consults**:
- architecture-design (for system context)
- security-requirements-baseline (for existing requirements)

**Feeds**:
- security-architecture-review
- development-team

**Quality Contract**:
- Required inputs: Architecture design with components and data flows
- Minimum 10 threat targets analyzed
- All 6 STRIDE categories applied per target
- Risk ratings with likelihood AND impact scores

**Devil's Advocate Improvements Incorporated**:
- Added threat likelihood scoring (not just severity)
- Included guidance for when architecture doesn't exist
- Added remediation priority matrix (impact × effort × likelihood)

---

### Skill 2: Security Requirements Baseline

**Purpose**: Define security requirements tailored to product context

**Role**: Security Engineer

**Core Workflow**:
1. Assess product context (data types, users, compliance needs)
2. Map to appropriate frameworks (OWASP ASVS, NIST CSF, ISO 27001)
3. Define requirement categories (authentication, authorization, data protection, logging, etc.)
4. Prioritize requirements (must/should/could with rationale)
5. Create actionable requirements checklist with verification methods

**Consults**:
- threat-modeling (for specific threats)
- privacy-regulation-assessment (for compliance requirements)

**Feeds**:
- architecture-design
- security-architecture-review

**Quality Contract**:
- Required inputs: Product description, data types, target market, user geography
- Minimum 5 security categories covered
- Prioritized requirements with rationale tied to risk
- Verification method defined for each requirement

**Devil's Advocate Improvements Incorporated**:
- Added framework selection decision tree (OWASP vs NIST vs ISO)
- Included product-type templates (SaaS, e-commerce, healthcare, fintech)
- Added minimum viable security requirements per business tier (startup vs enterprise)

---

### Skill 3: Security Architecture Review

**Purpose**: Review technical architecture for security gaps and controls

**Role**: Security Architect

**Core Workflow**:
1. Analyze architecture design against security requirements
2. Identify security controls needed vs. provided
3. Rate control effectiveness (strong/partial/weak/missing/none)
4. Document gaps with severity ratings (critical/high/medium/low)
5. Recommend specific remediation with effort estimates

**Consults**:
- architecture-design (for architecture context)
- security-requirements-baseline (for requirements to review against)

**Feeds**:
- threat-modeling
- development-team
- stakeholders

**Quality Contract**:
- Required inputs: Architecture design, security requirements baseline
- All major components reviewed (minimum 5)
- Gap analysis with severity ratings AND business impact
- Specific remediation recommendations per gap

**Devil's Advocate Improvements Incorporated**:
- Added cloud-specific control mappings (AWS, Azure, GCP)
- Included severity ratings with business impact assessment
- Added verification/testing methods for each control

---

### Skill 4: Security Compliance Roadmap

**Purpose**: Map compliance requirements and create phased remediation plan

**Role**: Compliance Officer

**Core Workflow**:
1. Identify applicable regulations based on geography, industry, data types
2. Map requirements to current state (gap analysis)
3. Identify compliance gaps with evidence requirements
4. Create phased remediation roadmap (phase 1: critical, phase 2: important, phase 3: enhancement)
5. Estimate effort, timeline, and resource requirements

**Consults**:
- privacy-regulation-assessment (for privacy regulations)
- data-protection-assessment (for data handling requirements)

**Feeds**:
- security-requirements-baseline
- stakeholders
- legal-team

**Quality Contract**:
- Required inputs: Product type, target market geography, data types processed
- Applicable regulations identified with rationale
- Gap analysis with evidence requirements per control
- Realistic timeline estimates per phase

**Devil's Advocate Improvements Incorporated**:
- Added regulation selection decision tree (GDPR, HIPAA, SOC2, PCI, CCPA, etc.)
- Included evidence/certification requirements mapping
- Added compliance cost estimation framework

---

### Skill 5: Data Protection Assessment

**Purpose**: Assess data protection controls across the data lifecycle

**Role**: Privacy Officer

**Core Workflow**:
1. Map data flows (collection → storage → processing → transmission → deletion)
2. Assess protection controls at each stage (encryption, access, retention)
3. Identify vulnerabilities (weak encryption, excessive access, unbounded retention)
4. Recommend specific improvements with standards
5. Document data handling policies and procedures

**Consults**:
- privacy-regulation-assessment (for privacy requirements)
- architecture-design (for system architecture)

**Feeds**:
- security-requirements-baseline
- compliance-team
- legal-team

**Quality Contract**:
- Required inputs: Architecture, data types, storage systems, processing flows
- All data lifecycle stages covered
- Protection ratings per stage (adequate/partial/inadequate)
- Specific improvement recommendations with standards

**Devil's Advocate Improvements Incorporated**:
- Added specific encryption standard recommendations (AES-256, TLS 1.3, etc.)
- Included key management considerations
- Added third-party data flow assessment

---

### Skill 6: Privacy Regulation Assessment

**Purpose**: Assess compliance with privacy regulations

**Role**: Privacy Officer

**Core Workflow**:
1. Identify applicable regulations (GDPR, CCPA, CPRA, state laws, sector-specific)
2. Map data processing activities to regulation requirements
3. Assess compliance status per requirement (compliant/gap/needs-review)
4. Identify specific gaps and risks
5. Recommend practical compliance improvements

**Consults**:
- data-protection-assessment (for data handling)

**Feeds**:
- security-compliance-roadmap
- legal-team
- stakeholders

**Quality Contract**:
- Required inputs: Product description, data types, user geography, target market
- Applicable regulations identified with scope rationale
- Compliance status mapped per requirement
- Practical implementation guidance per gap

**Devil's Advocate Improvements Incorporated**:
- Added data subject rights mapping (access, deletion, portability, objection)
- Included breach notification requirements by regulation
- Added practical implementation checklist per requirement

---

### Skill 7: Threat Modeling (special skill - already designed)

**Note**: This skill was included in original design. See skills/threat-modeling/.

---

## 3. Quality Gates

### Gate 1: Input Validation

Every security skill validates:
- Architecture/design inputs exist
- Scope is defined (what's in/out of scope)
- Data types and sensitivity are known

### Gate 2: Output Schema Validation

Each skill produces:
- Structured threat/requirement/gap list
- Severity/priority ratings
- Specific recommendations
- Evidence/verification methods

### Gate 3: Sequential Dependencies

```
threat-modeling (identify threats)
  → security-requirements-baseline (define requirements)
    → security-architecture-review (verify implementation)
      → security-compliance-roadmap (ensure compliance)
```

---

## 4. Integration with Other Batches

### Inputs to Batch 0
- **Batch 2 (Architecture)**: architecture-design output

### Outputs from Batch 0
- **Batch 1 (Validation)**: Security requirements inform validation criteria
- **Batch 2 (Architecture)**: Security requirements feed into architecture design
- **Batch 4 (Research)**: Security considerations inform product decisions

---

## 5. Implementation Notes

### Security First Principle
These skills should be consulted BEFORE:
- Architecture design decisions
- Feature development
- Data handling implementation
- Compliance certifications

### Continuous Integration
Security skills can be invoked:
- At design time (threat modeling)
- During development (requirements, architecture review)
- Before launch (compliance roadmap)
- Periodically (assessment refresh)

---

## 6. Devil's Advocate Review Summary

All 6 skills were reviewed and improved with:

| Skill | Key Improvements Added |
|-------|----------------------|
| Threat Modeling | Likelihood scoring, cloud-agnostic, prioritization matrix |
| Security Requirements Baseline | Framework selection, product templates, tiered requirements |
| Security Architecture Review | Cloud controls, severity ratings, verification methods |
| Security Compliance Roadmap | Regulation selection, evidence requirements, cost estimation |
| Data Protection Assessment | Encryption standards, key management, third-party flows |
| Privacy Regulation Assessment | Data subject rights, breach notification, practical implementation |

---

## 7. Implementation Status

| Skill | SKILL.md | Framework | Schema | Example | Status |
|-------|----------|-----------|--------|---------|--------|
| threat-modeling | ✅ | ✅ | ✅ | ✅ | Existing (verify improvements) |
| security-requirements-baseline | ✅ | ✅ | ✅ | ✅ | Existing (verify improvements) |
| security-architecture-review | ✅ | ✅ | ✅ | ✅ | Existing (verify improvements) |
| security-compliance-roadmap | ✅ | ✅ | ✅ | ✅ | Existing (verify improvements) |
| data-protection-assessment | ✅ | ✅ | ✅ | ✅ | Existing (verify improvements) |
| privacy-regulation-assessment | ✅ | ✅ | ✅ | ✅ | Existing (verify improvements) |

**Next Step**: Verify existing skills incorporate Devil's Advocate improvements, or update as needed.

---

**Document Status**: Reviewed with Devil's Advocate
**Next Step**: Update existing skills with improvements, or proceed to next batch
