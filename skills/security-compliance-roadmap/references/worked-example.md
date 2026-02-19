<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current certification requirements, pricing, 
regulatory landscape, and skill methodology. Last reviewed: 2026-02-19 -->

# Worked Example: Security & Compliance Roadmap — InvoiceFlow

## Scenario

InvoiceFlow is an AI-powered invoicing tool for freelance designers. This roadmap synthesizes all prior security analysis (architecture, baseline, threat model, data protection, privacy assessment) to produce a phased compliance timeline.

**Current security posture:**
- Security Requirements Baseline: Developing (8/12 P0 requirements addressed)
- Threat Model: 5 Critical, 7 High, 4 Medium, 2 Low threats
- Data Protection: RLS not verified, PII in AI prompts needs fix
- Privacy: CCPA gaps, GDPR preparation needed for EU expansion

**Business context:**
- Stage: Pre-launch
- Revenue: Pre-revenue
- Customer segments: Freelancers (B2C), planning SMB agencies
- Markets: US-first, EU expansion in 12 months
- Industry: SaaS / Professional services

---

## Section 1: Context Summary

### 1a. Business Profile
- **Business stage:** Pre-launch (MVP in 3 months)
- **Current revenue:** Pre-revenue
- **Customer segments:** Freelancers (primary), SMB agencies (future)
- **Geographic markets:** US (current), EU (planned 12 months)
- **Industry vertical:** SaaS for professional services

### 1b. Security Posture Summary
- **Current posture:** Developing
- **Requirements addressed:** 8 of 12 P0 (67%)
- **Key risks:** RLS status unknown, webhook security gaps, AI data handling

### 1c. Compliance Context
- **Applicable regulations:** CCPA (current), GDPR (future EU)
- **Data sensitivity:** Client PII (Confidential), Financial (Restricted)
- **Customer requirements:** None yet (pre-launch)

---

## Section 2: Certification Universe

### 2a. Framework Evaluation

| Framework | Relevance | Trigger | Confidence | Notes |
|-----------|----------|---------|------------|-------|
| SOC 2 Type I | Potentially Relevant | First enterprise customer asks | Medium | Standard for B2B SaaS |
| SOC 2 Type II | Potentially Relevant | Enterprise deals in pipeline | Medium | Required for mid-market |
| ISO 27001 | Not Applicable | — | — | Overkill for pre-revenue |
| HIPAA | Not Applicable | — | — | No health data |
| PCI-DSS | Required | Accepting payments | High | Via Stripe, minimal scope |
| GDPR | Required | EU expansion | High | Privacy regulation applies |
| CCPA | Required | California users | High | US privacy law applies |

### 2b. Not Applicable Certifications

| Framework | Not Applicable Because |
|-----------|----------------------|
| ISO 27001 | Enterprise-only, expensive ($50K+), pre-revenue stage |
| HIPAA | No Protected Health Information in product |
| FedRamp | Not targeting US government customers |
| SOC 1 | Not processing financial statements for customers |

---

## Section 3: Certification-to-Milestone Mapping

### 3a. Milestone-Based Relevance

| Business Milestone | Certifications That Matter | Priority |
|-------------------|---------------------------|----------|
| Pre-launch | PCI-DSS (via Stripe), CCPA | 1 - Legal requirement |
| First revenue | CCPA compliance verification | 2 - Customer trust |
| First enterprise prospect | SOC 2 Type I | 3 - Sales enablement |
| $500K ARR | SOC 2 Type II | 4 - Mid-market requirement |
| EU expansion | GDPR compliance | 5 - Legal requirement |

### 3b. Customer-Driven Requirements

| Customer Request | Applicable Certification | Timeline |
|-----------------|-------------------------|----------|
| "We need your SOC 2 report" | SOC 2 Type I/II | 3-6 months to obtain |
| "Are you GDPR compliant?" | GDPR | 6-12 months (EU launch) |
| "What's your security posture?" | SOC 2 | Respond with roadmap |

---

## Section 4: Effort and Cost Estimates

### 4a. Per-Certification Breakdown

| Certification | Prep Time | Audit Cost | Tooling | Annual Maintenance |
|--------------|-----------|-----------|---------|-------------------|
| CCPA compliance | 1-2 months | $0 (self-assessment) | Documentation time | Minimal |
| PCI-DSS (via Stripe) | 1 month | $0 (Stripe handles) | Stripe integration | Minimal |
| SOC 2 Type I | 2-3 months | $5-15K | Compliance software | $5-10K |
| SOC 2 Type II | 6-12 months | $15-30K | Continuous monitoring | $10-20K |
| GDPR compliance | 3-6 months | $0-10K (DPO, assessment) | Documentation | $2-5K/year |

### 4b. Total Investment View

| Timeframe | Total Cost | Focus |
|-----------|-----------|-------|
| Year 1 | $5-15K | CCPA, PCI-DSS via Stripe |
| Year 2 | $15-40K | SOC 2 Type I/II |
| Year 3 | $10-25K | Maintenance, GDPR |

---

## Section 5: Quick Wins

### 5a. Multi-Framework Controls

| Control | SOC 2 | ISO 27001 | GDPR | PCI-DSS | Implementation |
|---------|-------|-----------|------|---------|----------------|
| Access control (RLS) | ✓ | ✓ | ✓ | ✓ | Enable Supabase RLS |
| Encryption in transit | ✓ | ✓ | ✓ | ✓ | TLS everywhere |
| Incident response | ✓ | ✓ | ✓ | ✓ | Document process |
| Security awareness | ✓ | ✓ | — | — | Training for team |
| Vulnerability scanning | ✓ | ✓ | — | ✓ | Dependabot + audits |

### 5b. Low-Effort High-Impact Items

| Action | Impact | Effort | Certifications |
|--------|--------|--------|---------------|
| Enable RLS on all tables | Critical risk reduction | S | SOC 2, PCI-DSS, GDPR |
| Configure security headers | Medium risk reduction | S | SOC 2 |
| Document incident response | Moderate compliance | S | SOC 2, GDPR |
| Add PII to AI sanitization | Privacy risk reduction | S | GDPR, CCPA |

---

## Section 6: Phased Roadmap

### 6a. Phase 1: Foundation (Now - 3 months)
**Trigger:** Pre-launch MVP

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| CCPA compliance | Month 1 | Month 2 | Privacy policy, data handling docs |
| PCI-DSS (via Stripe) | Month 1 | Month 2 | Stripe integration complete |

**Focus:** Legal compliance for US launch
- Complete CCPA self-assessment
- Update privacy policy with CCPA rights
- Implement data export/deletion capabilities
- Verify Stripe PCI-DSS compliance

### 6b. Phase 2: Validation (3-12 months)
**Trigger:** First revenue, early customers

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| SOC 2 Type I | Month 6 | Month 9 | Security baseline stable |
| GDPR preparation | Month 9 | Month 12 | EU launch planning |

**Focus:** Customer trust, compliance for growth
- Remediate P0 findings from security baseline
- Implement continuous monitoring
- Document security controls
- Begin GDPR gap analysis

### 6c. Phase 3: Growth (12-24 months)
**Trigger:** $500K+ ARR, enterprise prospects

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| SOC 2 Type II | Month 12 | Month 18 | Type I complete |
| GDPR compliance | Month 12 | Month 18 | EU launch |

**Focus:** Enterprise readiness, EU expansion
- Operate under Type I for 6 months
- Complete GDPR implementation
- Designate EU representative
- Implement data transfer mechanisms

### 6d. Phase 4: Scale (24+ months)
**Trigger:** Enterprise customers

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| SOC 2 Type II renewal | Month 24 | Month 30 | Continuous compliance |
| Additional certifications | As needed | — | Customer requirements |

**Focus:** Maintain compliance, expand as needed

---

## Section 7: Decision Triggers

### 7a. Certification Triggers

| Certification | Trigger Condition | Action |
|--------------|-------------------|--------|
| SOC 2 Type I | 3+ enterprise prospects ask | Begin prep Month 6 |
| SOC 2 Type II | Type I complete + enterprise deals | Begin prep Month 12 |
| GDPR | EU expansion confirmed | Begin prep Month 9 |
| PCI-DSS | First payment processed | Verify Stripe compliance |

### 7b. Reassessment Triggers

| Event | Action |
|-------|--------|
| New customer segment (enterprise) | Reassess SOC 2 timeline |
| New market (EU) | Accelerate GDPR |
| Significant data change | Reassess compliance scope |
| Security incident | Reassess all certifications |

---

## Section 8: Roadmap Summary

### 8a. Investment Summary
- **Year 1 estimate:** $5-15K (CCPA, Stripe compliance)
- **Year 2 estimate:** $15-40K (SOC 2 Type I/II)
- **Year 3 estimate:** $10-25K (Maintenance)
- **Total 3-year:** $30-80K

### 8b. Critical Path

| Milestone | Certification | Why Critical |
|-----------|--------------|---------------|
| Launch | PCI-DSS | Legal requirement to accept payments |
| US launch | CCPA | Legal requirement for CA users |
| EU launch | GDPR | Legal requirement for EU users |
| Enterprise sales | SOC 2 | Customer requirement |

### 8c. Next Steps
1. **Immediate:** Complete CCPA self-assessment and update privacy policy
2. **30-day:** Verify Stripe PCI-DSS compliance, enable RLS on all tables
3. **90-day:** Document incident response process, begin SOC 2 gap analysis
