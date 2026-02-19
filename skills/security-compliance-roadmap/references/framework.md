# Framework: Security & Compliance Roadmap

This document defines the certification maturity model, decision trigger framework, effort estimation methodology, and quick win identification process used by the Security & Compliance Roadmap skill.

---

## Certification Maturity Model

The maturity model maps security certifications and compliance activities to business stages. Not every product follows this progression linearly — use the decision triggers (below) to determine when to advance.

### Stage 1: Pre-Launch

**Goal:** Establish the minimum viable security and privacy posture before shipping.

| Activity | Description | Effort | Cost |
|----------|-------------|--------|------|
| Security Requirements Baseline compliance | Implement all P0 security controls from Security Requirements Baseline | 40-80 person-hours | $0 (internal effort) |
| Privacy policy | Draft privacy policy covering data collection, use, sharing, retention, and user rights | 8-16 person-hours | $0-$500 (template or legal review) |
| Terms of service | Draft ToS covering acceptable use, liability, data handling | 8-16 person-hours | $0-$500 (template or legal review) |
| Basic data protection | Encryption at rest and in transit, secure credential storage, backup strategy | 16-32 person-hours | $0-$50/mo (managed service encryption) |
| Cookie consent (if EU users) | Implement cookie consent mechanism for GDPR compliance | 4-8 person-hours | $0-$20/mo (consent platform) |
| Incident response plan (basic) | Document what to do if a breach occurs — who to contact, how to assess, how to notify | 4-8 person-hours | $0 (internal document) |

**Who needs this:** Everyone. Every product that handles user data.

### Stage 2: Post-Launch (0-$500K ARR)

**Goal:** Demonstrate security maturity to early customers and address regulatory requirements.

| Activity | Description | Effort | Cost |
|----------|-------------|--------|------|
| Penetration testing | Engage external firm for first penetration test of the application | 8-16 person-hours (prep + remediation) | $5K-$15K per test |
| Privacy regulation compliance | Full GDPR compliance (if EU users), CCPA (if CA users), or applicable regulation | 40-120 person-hours | $2K-$10K (legal review + implementation) |
| Bug bounty program (optional) | Establish responsible disclosure policy or basic bug bounty | 4-8 person-hours | $0-$500/mo (platform fees) |
| Incident response plan (tested) | Tabletop exercise to test the incident response plan | 8-16 person-hours | $0 (internal exercise) |
| Vendor security questionnaire readiness | Prepare standard responses for customer security questionnaires (SIG Lite, CAIQ) | 16-32 person-hours | $0 (internal effort) |
| Security page | Publish a security page on the website describing security practices | 4-8 person-hours | $0 |

**Who needs this:** Products with paying customers who handle any form of PII or sensitive data.

### Stage 3: Growth ($500K-$2M ARR)

**Goal:** Achieve certifications that unlock mid-market and enterprise sales.

| Activity | Description | Effort | Cost |
|----------|-------------|--------|------|
| SOC 2 Type I (if B2B) | Point-in-time assessment of security controls across Trust Service Criteria | 200-400 person-hours | $20K-$50K (audit) + $10K-$30K/yr (tooling) |
| ISO 27001 (if EU market) | Establish Information Security Management System (ISMS) and achieve certification | 300-600 person-hours | $15K-$40K (certification audit) + $5K-$15K/yr (surveillance) |
| HIPAA BAA readiness (if health data) | Implement HIPAA Security Rule safeguards and prepare Business Associate Agreements | 200-500 person-hours | $10K-$30K (gap assessment + legal) |
| PCI-DSS SAQ validation (if payment data) | Validate PCI-DSS scope and complete appropriate Self-Assessment Questionnaire | 40-120 person-hours | $5K-$15K (QSA consultation) |
| Compliance automation platform | Implement Vanta, Drata, or Secureframe to automate evidence collection | 40-80 person-hours (setup) | $10K-$30K/yr |

**Who needs this:** B2B products entering mid-market sales cycles where procurement requires compliance evidence.

### Stage 4: Scale ($2M-$5M ARR)

**Goal:** Maintain and extend certifications; build security as competitive advantage.

| Activity | Description | Effort | Cost |
|----------|-------------|--------|------|
| SOC 2 Type II | Ongoing assessment over 3-12 month observation period; proves sustained compliance | 100-200 person-hours/yr | $30K-$80K/yr (audit) + tooling |
| Additional certifications per market | ISO 27001 if not yet achieved, SOC 2 + HIPAA bridge letter, industry-specific | Varies | Varies |
| Dedicated security hire | First security-focused team member (security engineer or compliance manager) | N/A | $120K-$180K/yr (salary) |
| Annual penetration testing program | Recurring pen tests with scope expansion as product grows | 16-32 person-hours/yr | $10K-$25K/yr |
| Third-party risk management | Formal vendor assessment process for all subprocessors | 40-80 person-hours | $5K-$15K/yr (platform) |

**Who needs this:** Products with enterprise customers, significant data processing, or operating in regulated industries.

### Stage 5: Enterprise ($5M+ ARR)

**Goal:** Open specialized market segments requiring advanced certifications.

| Activity | Description | Effort | Cost |
|----------|-------------|--------|------|
| FedRAMP (if gov market) | Federal Risk and Authorization Management Program authorization | 1,500-3,000+ person-hours | $250K-$1M+ (3P assessment + remediation) |
| SOC 1 (if financial data processing) | Report on controls relevant to customers' financial statement audits | 200-400 person-hours | $25K-$60K/yr (audit) |
| StateRAMP (if state/local gov) | State-level FedRAMP equivalent for cloud service providers | 500-1,000 person-hours | $50K-$200K |
| HITRUST CSF (if health tech) | Comprehensive health data security framework certification | 400-800 person-hours | $50K-$150K |
| Security Operations Center (SOC) | 24/7 security monitoring capability | N/A | $100K-$300K/yr (managed SOC) or headcount |

**Who needs this:** Products specifically targeting government, healthcare, or financial enterprise segments.

---

## Certification Reference Cards

### SOC 2 (Type I and Type II)

- **What it is:** Audit report evaluating an organization's controls across five Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy. Type I is point-in-time; Type II covers an observation period (typically 3-12 months)
- **Who needs it:** B2B SaaS companies selling to mid-market and enterprise customers. Procurement departments increasingly require SOC 2 before approving vendors
- **When to start:** When the third enterprise prospect asks for it during procurement, or when >20% of pipeline deals require it. Typically around $500K-$1M ARR for B2B SaaS
- **Typical cost range:** Type I: $20K-$50K (audit) + $10K-$30K/yr (compliance tooling). Type II: $30K-$80K/yr (audit) + tooling
- **Time to achieve:** Type I: 3-6 months from decision to report. Type II: 6-12 months after Type I (observation period)
- **Prerequisites:** Written security policies, access control procedures, incident response plan, change management process, risk assessment, employee security training, vendor management program
- **Ongoing maintenance:** Annual Type II audit, continuous evidence collection, policy updates, employee training renewals, vendor reassessments

### ISO 27001

- **What it is:** International standard for Information Security Management Systems (ISMS). Requires establishing, implementing, maintaining, and continually improving an ISMS
- **Who needs it:** Companies with EU enterprise customers (ISO 27001 is more recognized in Europe than SOC 2), companies seeking a comprehensive security management framework, companies pursuing government contracts outside the US
- **When to start:** When EU enterprise customers require it for procurement, or when seeking to demonstrate security maturity to international markets. Can be pursued alongside or instead of SOC 2
- **Typical cost range:** Certification audit: $15K-$40K. Implementation consulting: $20K-$50K. Surveillance audits (annual): $5K-$15K
- **Time to achieve:** 6-12 months for initial certification
- **Prerequisites:** Risk assessment methodology, Statement of Applicability (SoA), security policies covering all Annex A controls, management commitment, internal audit capability
- **Ongoing maintenance:** Annual surveillance audits, re-certification every 3 years, continuous ISMS improvement, management reviews

### HIPAA (BAA)

- **What it is:** US federal law protecting health information. Business Associate Agreements (BAAs) are contracts between covered entities (healthcare providers) and their service providers (business associates) that handle Protected Health Information (PHI)
- **Who needs it:** Any product that stores, processes, or transmits Protected Health Information on behalf of healthcare providers, health plans, or healthcare clearinghouses
- **When to start:** Before signing the first customer that requires a BAA. There is no "HIPAA certification" — compliance is demonstrated through BAAs, risk assessments, and security safeguards
- **Typical cost range:** Gap assessment: $10K-$30K. Implementation: $20K-$50K. Legal (BAA drafting): $5K-$15K. Ongoing: $10K-$25K/yr
- **Time to achieve:** 3-6 months for initial compliance readiness
- **Prerequisites:** Encryption of PHI at rest and in transit, access controls with audit logging, risk assessment, workforce training, BAA template, breach notification procedures, minimum necessary principle implementation
- **Ongoing maintenance:** Annual risk assessment, workforce training, BAA management, breach monitoring, policy updates

### PCI-DSS

- **What it is:** Payment Card Industry Data Security Standard — security requirements for organizations that handle credit card data
- **Who needs it:** Only products that directly handle, store, or transmit credit card numbers. If you use Stripe, Braintree, or similar payment processors that handle card data on their infrastructure, your PCI scope is minimal (SAQ A or SAQ A-EP)
- **When to start:** Before accepting credit card payments. Most SaaS products using Stripe only need to confirm their SAQ scope — not undergo full PCI-DSS assessment
- **Typical cost range:** SAQ A validation: $0-$5K. SAQ A-EP: $5K-$15K. Full PCI-DSS (Level 1): $50K-$200K+ (QSA assessment)
- **Time to achieve:** SAQ: 1-2 weeks. Full assessment: 3-9 months
- **Prerequisites (for full PCI-DSS):** Network segmentation, firewall configuration, encryption, access controls, vulnerability management, monitoring, security policies
- **Ongoing maintenance:** Annual SAQ or assessment, quarterly network scans (if applicable), ongoing monitoring

### FedRAMP

- **What it is:** Federal Risk and Authorization Management Program — standardized approach to security assessment for cloud services used by US federal agencies
- **Who needs it:** Only products that want to sell to US federal government agencies. Not required for state/local government (see StateRAMP)
- **When to start:** Only when a specific federal agency sponsor is identified and committed. FedRAMP without an agency sponsor is wasted effort
- **Typical cost range:** $250K-$1M+ for initial authorization (3PAO assessment, remediation, documentation). Ongoing: $100K-$300K/yr (continuous monitoring)
- **Time to achieve:** 12-24 months (often longer)
- **Prerequisites:** SOC 2 Type II (recommended), NIST 800-53 control implementation, dedicated security team, 3PAO engagement, agency sponsor
- **Ongoing maintenance:** Continuous monitoring, monthly vulnerability scanning, annual assessment, POA&M management

### SOC 1

- **What it is:** Audit report on controls relevant to user entities' (customers') internal control over financial reporting (ICFR)
- **Who needs it:** Products that process transactions or host data that directly affects customers' financial statements — payroll processors, payment platforms, financial data aggregators
- **When to start:** When enterprise financial services customers require it for their own audit compliance
- **Typical cost range:** $25K-$60K/yr (audit). Similar preparation effort to SOC 2
- **Time to achieve:** 3-6 months (Type I), 6-12 months (Type II)
- **Prerequisites:** Similar to SOC 2 but focused on financial reporting controls. May require SOC 2 first
- **Ongoing maintenance:** Annual audit, continuous evidence collection

### GDPR Compliance

- **What it is:** EU General Data Protection Regulation — comprehensive data protection law governing how personal data of EU residents is collected, processed, and stored. There is no formal "GDPR certification," but compliance is demonstrated through documented practices
- **Who needs it:** Any product that collects or processes personal data of EU residents, regardless of where the company is based
- **When to start:** Before collecting data from EU users. GDPR applies from day one
- **Typical cost range:** Initial compliance: $5K-$20K (legal review + implementation). DPO (if required): $50K-$100K/yr or outsourced at $2K-$10K/yr
- **Time to achieve:** 1-3 months for basic compliance; ongoing for full maturity
- **Prerequisites:** Lawful basis for processing, privacy notices, data processing records, DSAR process, DPA with processors, data breach procedures
- **Ongoing maintenance:** DSAR handling, DPA management, annual privacy impact assessments, regulatory monitoring

---

## Decision Trigger Framework

Decision triggers are specific, observable business events that should prompt starting a certification process. Do not start a certification "because it seems like the right time" — start it because a trigger has fired.

### Primary Triggers (Start the Process)

| Trigger Event | Certification to Start | Lead Time Needed |
|---------------|----------------------|------------------|
| Third enterprise prospect asks for SOC 2 in procurement | SOC 2 Type I | 3-6 months |
| First healthcare customer needs BAA signed | HIPAA compliance | 3-6 months |
| Expanding to EU market with EU user data | GDPR compliance | 1-3 months |
| EU enterprise customer requires ISO 27001 | ISO 27001 | 6-12 months |
| Accepting credit card data directly (not via Stripe) | PCI-DSS | 3-9 months |
| Federal agency expresses interest and offers sponsorship | FedRAMP | 12-24 months |
| Financial services customer requires SOC 1 for their audit | SOC 1 | 3-6 months |
| Processing data of California residents at scale | CCPA compliance | 1-3 months |
| Product targets children under 13 | COPPA compliance | 1-3 months |
| Processing education records | FERPA compliance | 3-6 months |

### Leading Indicators (Prepare to Start)

These signals suggest a trigger is approaching. Begin internal preparation (policies, controls, gap assessment) but do not engage auditors yet.

| Leading Indicator | What It Signals | Preparation Action |
|-------------------|----------------|-------------------|
| >20% of pipeline deals are enterprise accounts | SOC 2 demand is imminent | Draft security policies, implement compliance tooling, begin evidence collection |
| First customer security questionnaire received | Market expects security transparency | Prepare SIG Lite / CAIQ responses, publish security page |
| Competitor advertises SOC 2 badge | Compliance is becoming table stakes in this market | Evaluate SOC 2 timeline and budget |
| EU traffic exceeds 10% of total users | GDPR obligations are material | Review data flows for EU data, implement consent mechanisms, draft DPA |
| Healthcare vertical appears in sales pipeline | HIPAA may be needed | Assess PHI handling, review architecture for HIPAA gaps |
| Customer asks about data residency | Geographic compliance requirements emerging | Evaluate multi-region deployment, review data transfer mechanisms |
| RFP requires compliance evidence | Enterprise sales maturity demanded | Build compliance evidence repository, standardize questionnaire responses |

### Anti-Triggers (Do Not Start Yet)

| Situation | Why Not Yet | What to Do Instead |
|-----------|------------|-------------------|
| Pre-revenue with no enterprise prospects | No business justification for audit costs | Focus on security baseline and privacy policy |
| B2C product with no enterprise sales motion | SOC 2 / ISO 27001 have no audience | Focus on applicable privacy regulations (GDPR, CCPA) |
| One prospect mentioned SOC 2 casually | Single data point; may not convert | Ask if SOC 2 is a hard requirement or preference; track frequency |
| Competitor has SOC 2 but sells to different segment | Their compliance needs may not match yours | Evaluate whether your customers actually require it |
| Investor suggested getting SOC 2 | Investors are not customers; validate with actual customer demand | Survey pipeline for compliance requirements |

---

## Quick Win Identification

Quick wins are security controls that satisfy requirements across multiple frameworks simultaneously. Implement these first to maximize compliance coverage per unit of effort.

### Cross-Framework Control Matrix

| Control | SOC 2 | ISO 27001 | HIPAA | PCI-DSS | GDPR | Effort |
|---------|-------|-----------|-------|---------|------|--------|
| Encryption at rest (AES-256) | CC6.1 | A.10.1.1 | 164.312(a)(2)(iv) | Req 3.4 | Art. 32 | S-M |
| Encryption in transit (TLS 1.2+) | CC6.1 | A.10.1.1 | 164.312(e)(1) | Req 4.1 | Art. 32 | S |
| Audit logging | CC7.2 | A.12.4.1 | 164.312(b) | Req 10 | Art. 30 | M |
| Access control (RBAC) | CC6.3 | A.9.2.2 | 164.312(a)(1) | Req 7 | Art. 25 | M |
| Incident response plan | CC7.3 | A.16.1.1 | 164.308(a)(6) | Req 12.10 | Art. 33 | S-M |
| Vulnerability management | CC7.1 | A.12.6.1 | 164.308(a)(5)(ii)(B) | Req 6.1 | Art. 32 | M |
| Employee security training | CC1.4 | A.7.2.2 | 164.308(a)(5) | Req 12.6 | Art. 39 | S |
| Data backup and recovery | CC7.5 | A.12.3.1 | 164.308(a)(7) | Req 9.5 | — | S-M |
| Vendor/third-party management | CC9.2 | A.15.1.1 | 164.308(b)(1) | Req 12.8 | Art. 28 | M |
| Change management process | CC8.1 | A.12.1.2 | 164.308(a)(1)(ii)(B) | Req 6.4 | — | S-M |
| Data retention and deletion | CC6.5 | A.8.3.2 | 164.530(j) | Req 3.1 | Art. 5(1)(e) | M |
| Risk assessment | CC3.2 | A.6.1.2 | 164.308(a)(1)(ii)(A) | Req 12.2 | Art. 35 | M |

**How to use this matrix:** Identify which frameworks are on the product's roadmap, then prioritize controls that cover the most applicable frameworks. A B2B SaaS targeting EU enterprise should prioritize controls covering SOC 2 + ISO 27001 + GDPR.

---

## Effort Estimation Methodology

Estimates are provided as ranges because actual effort varies based on:
- Current security posture (more mature = less effort)
- Product complexity (more containers, data flows = more work)
- Team size and security expertise
- Scope of the certification (number of services, data types)

### Estimation Factors

| Factor | Low End (Simple) | High End (Complex) |
|--------|-----------------|-------------------|
| Product architecture | Monolith, single data store, one cloud provider | Microservices, multiple data stores, multi-cloud |
| Data types | PII only | PII + financial + health + children's data |
| Team size | Solo founder / 2-3 engineers | 10+ engineers across multiple teams |
| Existing security posture | Security baseline implemented, policies drafted | No security controls, no documentation |
| Number of third-party integrations | 3-5 services | 15+ services with sensitive data access |
| Geographic scope | Single country | Global (multi-regulation) |

### Cost Categories

1. **Internal effort:** Person-hours x fully loaded hourly rate. For a startup, estimate $75-$150/hr equivalent
2. **External audit fees:** Paid to the auditing firm. Varies by firm size and scope. Get 3 quotes
3. **Compliance tooling:** Platforms like Vanta ($10K-$30K/yr), Drata ($10K-$25K/yr), or Secureframe ($8K-$20K/yr) that automate evidence collection
4. **Legal fees:** Privacy policy review, DPA drafting, BAA templates, regulatory counsel
5. **Consulting fees:** External consultants for gap assessment, readiness preparation, policy drafting
6. **Penetration testing:** External security testing, typically $5K-$25K per test
7. **Tooling and infrastructure:** Security tools (SIEM, vulnerability scanning, endpoint protection) beyond compliance platforms

---

## Edge Cases

### B2C Product That Never Needs SOC 2

Not every product needs SOC 2 or ISO 27001. A B2C mobile app, a consumer social platform, or a direct-to-consumer SaaS may never encounter enterprise procurement. The compliance roadmap for these products focuses on:

- Privacy regulations (GDPR, CCPA, COPPA if applicable)
- App store requirements (Apple App Tracking Transparency, Google Play data safety)
- Industry-specific consumer protections
- Security best practices without formal certification

Do not force-fit SOC 2 onto a product where no customer will ever ask for it.

### Product in Highly Regulated Industry

Healthcare, financial services, and government products may need multiple certifications from day one. The phased approach compresses: HIPAA compliance may be a pre-launch requirement, not a growth-stage goal. Adjust the maturity model stages accordingly — the triggers fire earlier because the regulatory requirements are immediate, not customer-driven.

### Product with No Clear Certification Path

Some products operate in spaces where no standard certification applies (e.g., open-source developer tools, browser extensions, niche consumer apps). The roadmap should focus on:

- Security baseline as the primary deliverable
- Privacy regulation compliance (applicable to almost everyone)
- Trust signals that don't require formal certification (security page, penetration test reports, responsible disclosure program)
- Monitoring for when certifications become relevant as the market matures

### Multi-Product Company

If the company has multiple products, each product may have different certification needs. The roadmap should specify scope per product and identify shared controls that can be leveraged across products (e.g., company-wide security policies, shared SSO, common infrastructure).

---

## Sources

- **AICPA SOC 2:** Trust Service Criteria (TSC) — https://www.aicpa.org/soc2
- **ISO/IEC 27001:2022:** Information Security Management Systems — https://www.iso.org/standard/27001
- **HIPAA:** Health Insurance Portability and Accountability Act — https://www.hhs.gov/hipaa
- **PCI-DSS v4.0:** Payment Card Industry Data Security Standard — https://www.pcisecuritystandards.org
- **FedRAMP:** Federal Risk and Authorization Management Program — https://www.fedramp.gov
- **GDPR:** General Data Protection Regulation — https://gdpr-info.eu
- **NIST Cybersecurity Framework:** — https://www.nist.gov/cyberframework
- **Vanta State of Trust Report:** SaaS compliance benchmarks and cost data
