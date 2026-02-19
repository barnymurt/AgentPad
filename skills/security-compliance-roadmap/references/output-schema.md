<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current certification requirements, pricing changes, 
regulatory updates, and skill methodology. Last reviewed: 2026-02-19 -->

# Output Schema: Security & Compliance Roadmap

This file defines the exact structure of the Security & Compliance Roadmap skill output.

## Data Contracts

**Consumes:**
- `context.architecture` — containers, tech stack, data flows
- `context.security_baseline` — requirements, posture score
- `context.threat_model` — risks, mitigations
- `context.security_review` — findings, remediation
- `context.data_protection` — data classification, protection measures
- `context.privacy_regulation` — applicable regulations, compliance gaps
- Business context: stage, revenue, customer segments, markets

**Produces:**
- `context.compliance_roadmap.certification_universe` — all evaluated certs
- `context.compliance_roadmap.phased_roadmap` — timeline with triggers
- `context.compliance_roadmap.quick_wins` — controls satisfying multiple frameworks
- `context.compliance_roadmap.investment_summary` — cost and effort estimates
- `context.compliance_roadmap.decision_triggers` — when to pursue each cert

---

## Output Structure

```
# Security & Compliance Roadmap: [Product Name]

## 1. Context Summary

### 1a. Business Profile
- Business stage (required): Pre-launch / Post-launch / Growth / Scale
- Current revenue (required): Pre-revenue / <$500K / $500K-$2M / $2M-$5M / $5M+
- Customer segments (required): SMB / Mid-market / Enterprise / Consumer
- Geographic markets (required): US / EU / UK / Global
- Industry vertical (required): e.g., SaaS, healthcare, financial

### 1b. Security Posture Summary
- Current posture (required): From security baseline assessment
- Requirements addressed (required): P0/P1/P2 status
- Key risks (required): From threat model

### 1c. Compliance Context
- Applicable regulations (required): From privacy assessment
- Data sensitivity (required): Classification level
- Customer requirements (required): Any certs already requested

## 2. Certification Universe

### 2a. Framework Evaluation
| Framework | Relevance | Trigger | Confidence | Notes |
|-----------|----------|---------|------------|-------|
| SOC 2 Type I | Relevant/Required/Not Applicable | (when needed) | H/M/L | (rationale) |
| SOC 2 Type II | Relevant/Required/Not Applicable | (when needed) | H/M/L | (rationale) |
| ISO 27001 | Relevant/Required/Not Applicable | (when needed) | H/M/L | (rationale) |
| HIPAA | Relevant/Required/Not Applicable | (when needed) | H/M/L | (rationale) |
| PCI-DSS | Relevant/Required/Not Applicable | (when needed) | H/M/L | (rationale) |
| GDPR | Relevant/Required/Not Applicable | (when needed) | H/M/L | (rationale) |
| Other | ... | ... | ... | ... |

### 2b. Not Applicable Certifications
| Framework | Not Applicable Because |
|-----------|----------------------|
| (cert) | (reason) |

## 3. Certification-to-Milestone Mapping

### 3a. Milestone-Based Relevance
| Business Milestone | Certifications That Matter | Priority |
|-------------------|---------------------------|----------|
| Pre-launch | (certifications needed now) | (order) |
| First revenue | (certifications to consider) | (order) |
| $500K ARR | (certifications to pursue) | (order) |
| Enterprise customers | (certifications required) | (order) |
| EU expansion | (regulatory certs) | (order) |

### 3b. Customer-Driven Requirements
| Customer Request | Applicable Certification | Timeline |
|-----------------|-------------------------|----------|
| (specific request) | (cert) | (when) |

## 4. Effort and Cost Estimates

### 4a. Per-Certification Breakdown
| Certification | Prep Time | Audit Cost | Tooling | Annual Maintenance |
|--------------|-----------|-----------|---------|-------------------|
| SOC 2 Type I | (weeks) | ($X) | ($X/year) | ($X/year) |
| SOC 2 Type II | (months) | ($X) | ($X/year) | ($X/year) |
| ISO 27001 | (months) | ($X) | ($X/year) | ($X/year) |
| HIPAA | (varies) | ($X) | ($X/year) | ($X/year) |
| PCI-DSS | (varies) | ($X) | ($X/year) | ($X/year) |

### 4b. Total Investment View
| Timeframe | Total Cost | Focus |
|-----------|-----------|-------|
| Year 1 | (estimate) | (certs to pursue) |
| Year 2 | (estimate) | (certs to pursue) |
| Year 3 | (estimate) | (certs to pursue) |

## 5. Quick Wins

### 5a. Multi-Framework Controls
Controls that satisfy multiple certifications:

| Control | SOC 2 | ISO 27001 | GDPR | PCI-DSS | Implementation |
|---------|-------|-----------|------|---------|----------------|
| (e.g., access control) | ✓ | ✓ | ✓ | ✓ | (how) |
| (e.g., encryption) | ✓ | ✓ | ✓ | ✓ | (how) |
| (e.g., incident response) | ✓ | ✓ | ✓ | — | (how) |

### 5b. Low-Effort High-Impact Items
| Action | Impact | Effort | Certifications |
|--------|--------|--------|---------------|
| (action) | (risk reduction) | S/M/L | (list) |

## 6. Phased Roadmap

### 6a. Phase 1: Foundation (Now - 3 months)
**Trigger:** Pre-launch or early stage

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| (primary) | (date) | (date) | (prereqs) |

**Focus:** Security baseline, basic controls

### 6b. Phase 2: Validation (3-12 months)
**Trigger:** First revenue or first customer request

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| (primary) | (date) | (date) | (prereqs) |

**Focus:** SOC 2 Type I, initial compliance

### 6c. Phase 3: Growth (12-24 months)
**Trigger:** $500K+ ARR or mid-market customers

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| (primary) | (date) | (date) | (prereqs) |

**Focus:** SOC 2 Type II, ISO 27001

### 6d. Phase 4: Scale (24+ months)
**Trigger:** Enterprise customers or EU expansion

| Certification | Start | Target | Dependencies |
|--------------|-------|--------|--------------|
| (primary) | (date) | (date) | (prereqs) |

**Focus:** Industry-specific certifications

## 7. Decision Triggers

### 7a. Certification Triggers
| Certification | Trigger Condition | Action |
|--------------|-------------------|--------|
| SOC 2 | (e.g., 3+ enterprise prospects ask) | Begin prep |
| ISO 27001 | (e.g., EU expansion) | Begin prep |
| HIPAA | (e.g., sign healthcare customer) | Begin prep |
| PCI-DSS | (e.g., handle cards directly) | Begin prep |

### 7b. Reassessment Triggers
| Event | Action |
|-------|--------|
| New customer segment | Reassess roadmap |
| New market entry | Reassess regulations |
| Significant data change | Reassess requirements |

## 8. Roadmap Summary

### 8a. Investment Summary
- Year 1 estimate: $(X)
- Year 2 estimate: $(X)
- Year 3 estimate: $(X)
- Total 3-year: $(X)

### 8b. Critical Path
| Milestone | Certification | Why Critical |
|-----------|--------------|---------------|
| (milestone) | (cert) | (reason) |

### 8c. Next Steps
1. [Immediate action]
2. [30-day action]
3. [90-day action]
```

---

## Validation Rules

1. Every certification must have relevance assessment with reasoning
2. Triggers must be specific, measurable conditions
3. Cost estimates must cite ranges with assumptions
4. Quick wins must map to multiple frameworks
5. Roadmap phases must have clear triggers
6. Decision triggers must be actionable

---

## Confidence Tagging

- **High:** Based on documented security analysis and known customer requirements
- **Medium:** Based on stated business context and common patterns
- **Low:** Based on product description with inferred needs
