<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current regulatory changes, GDPR updates, 
US state privacy laws evolution, and skill methodology updates. 
Last reviewed: 2026-02-19 -->

# Output Schema: Privacy Regulation Assessment

This file defines the exact structure of the Privacy Regulation Assessment skill output.

## Data Contracts

**Consumes:**
- `context.data_protection.data_inventory` — data types and sensitivity
- `context.data_protection.pii_exposure_map` — PII lifecycle
- `context.data_protection.retention_policies` — retention and deletion
- `context.architecture.containers` — for jurisdiction assessment
- Target market geography, customer segments

**Produces (consumed by downstream skills):**
- `context.privacy_regulation.applicable_regulations` — which regulations apply
- `context.privacy_regulation.compliance_assessments` — per-regulation gap analysis
- `context.privacy_regulation.data_processing_activities` — legal basis mapping
- `context.privacy_regulation.regulatory_risks` — penalty exposure assessment
- `context.privacy_regulation.remediation_roadmap` — prioritized actions
- `context.privacy_regulation.privacy_policy_draft` — generated privacy policy

---

## Output Structure

```
# Privacy Regulation Assessment: [Product Name]

## 1. Regulatory Context Summary

### 1a. Product Overview
- Product name (required)
- Company location (required)
- User geography (required): Countries/states where users reside
- Customer segment (required): B2B/B2C, enterprise/consumer
- Industry vertical (required): e.g., SaaS, healthcare, financial

### 1b. Data Processing Overview
- Data types handled (required): Summary of PII, sensitive data
- Processing purposes (required): Why data is collected
- Data subjects (required): Who the data is about

## 2. Regulation Triage Results

### 2a. Applicable Regulations Decision Tree
| Regulation | Applies | Reasoning |
|------------|---------|-----------|
| GDPR | Yes/No/Conditional | (geography/data criteria) |
| CCPA/CPRA | Yes/No/Conditional | (California users, revenue thresholds) |
| PIPEDA | Yes/No/Conditional | (Canadian users) |
| LGPD | Yes/No/Conditional | (Brazil users) |
| HIPAA | Yes/No/Conditional | (health data handling) |
| PCI-DSS | Yes/No/Conditional | (payment card handling) |
| COPPA | Yes/No/Conditional | (users under 13) |
| Other | Yes/No | (state laws, sector regulations) |

### 2b. Non-Applicable Regulations
| Regulation | Not Applicable Because |
|------------|----------------------|
| (regulation) | (reason it doesn't apply) |

## 3. Per-Regulation Compliance Assessment

For each applicable regulation:

### 3a. [Regulation Name] Gap Analysis
| Requirement | Current State | Gap | Remediation |
|-------------|---------------|-----|-------------|
| (specific requirement) | (what's in place) | (what's missing) | (how to fix) |

### 3b. Compliance Score
- Requirements met: [X] of [Y]
- Requirements in progress: [Z]
- Critical gaps: [list]

### 3c. Evidence Requirements
| Requirement | Evidence Needed | Current Evidence |
|-------------|------------------|------------------|
| (requirement) | (what documentation needed) | (what exists) |

## 4. Data Processing Activities Map

### 4a. Processing Activities
| Activity | Data Types | Legal Basis | Data Subjects | Retention |
|----------|-----------|-------------|---------------|-----------|
| (e.g., user authentication) | (data) | (consent/contract/legitimate interest) | (who) | (period) |

### 4b. Cross-Border Transfers
| Transfer | From | To | Mechanism | Adequacy |
|----------|------|----|-----------|-----------|
| (description) | (country) | (country) | (SCCs/adequacy/BCR) | (yes/no/pending) |

### 4c. Data Subject Rights
| Right | Supported | Implementation |
|-------|-----------|----------------|
| Access | Yes/No/Partial | (how) |
| Rectification | Yes/No/Partial | (how) |
| Erasure | Yes/No/Partial | (how) |
| Portability | Yes/No/Partial | (how) |
| Objection | Yes/No/Partial | (how) |

## 5. Regulatory Risk Assessment

### 5a. Penalty Exposure
| Regulation | Max Penalty | Likelihood | Exposure |
|------------|-------------|------------|----------|
| GDPR | (4% revenue / €20M) | (high/medium/low) | (assessment) |
| CCPA | ($7,500/intentional) | (high/medium/low) | (assessment) |

### 5b. Enforcement Risk Factors
| Factor | Risk Level | Mitigation |
|--------|------------|------------|
| (e.g., high-volume PII) | (high/medium/low) | (what's in place) |

### 5c. Breach Notification
| Regulation | Notification Required | Timeline | Authority |
|------------|---------------------|----------|-----------|
| GDPR | Yes/No | (72 hours) | (DPA) |
| CCPA | Yes/No | (business discretion) | (AG) |

## 6. Remediation Roadmap

### 6a. Prioritized Actions
| Action | Regulation | Priority | Effort | Timeline | Synergies |
|--------|------------|----------|--------|----------|-----------|
| (specific action) | (which) | P0/P1/P2 | S/M/L | (when) | (what else it helps) |

### 6b. Quick Wins
Actions that address multiple regulations:

| Action | Regulations Addressed | Effort | Impact |
|--------|----------------------|--------|--------|
| (action) | (list) | S/M/L | (high/medium) |

### 6c. Long-Term Items
| Action | Why It Matters | Timeline |
|--------|---------------|----------|
| (action) | (significance) | (when) |

## 7. Privacy Policy Draft

### 7a. Data Collection Section
[Generated based on actual data inventory and processing activities]

### 7b. Data Use Section
[Generated based on processing purposes and legal basis]

### 7c. Data Sharing Section
[Generated based on third-party integrations]

### 7d. User Rights Section
[Generated based on data subject rights implementation]

### 7e. Security Section
[Generated based on security measures in place]

### 7f. Contact Information
[Generated based on company details]

## 8. Privacy Assessment Summary

### 8a. Compliance Posture
- Overall rating: Compliant / Mostly Compliant / Significant Gaps / Non-Compliant
- Highest-risk areas: [list]
- Quick wins available: [count]

### 8b. Handoff Notes
For Compliance Roadmap:
| Area | What to Include | Priority |
|------|-----------------|----------|
| (certification) | (relevance) | (high/medium/low) |
```

---

## Validation Rules

1. Regulation triage must document reasoning for each apply/not-apply decision
2. Every applicable regulation must have a gap analysis
3. All data processing activities must have legal basis identified
4. Cross-border transfers must be documented with mechanism
5. Data subject rights must address each right
6. Penalty exposure must cite actual regulation maximums
7. Privacy policy must reflect actual data practices, not generic text

---

## Confidence Tagging

- **High:** Based on documented data protection assessment and known user geography
- **Medium:** Based on stated geography and common patterns
- **Low:** Based on product description with inferred regulations
