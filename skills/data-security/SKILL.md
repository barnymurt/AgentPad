---
name: data-security
description: Implement database security. Use when you need encryption, access controls, compliance, or want to secure sensitive data. Covers encryption at rest/transit, access controls, audit logging, and compliance requirements.
lifecycle: build
category: engineering
outputSummary: Data security plan with encryption, access controls, and compliance
relatedAfter: backup-recovery,monitoring-observability
nextSteps: Set up monitoring-observability to track security events
specialization: fullstack
---

# Data Security

Implement database security measures. This skill ensures your data is protected and compliant.

## Core Workflow

### Step 1: Assess Requirements
- Data sensitivity
- Compliance needs
- Access requirements

### Step 2: Implement Encryption
- At rest
- In transit
- Column-level encryption

### Step 3: Set Up Access Controls
- User permissions
- Row-level security
- API access

### Step 4: Add Auditing
- Audit logs
- Access tracking
- Compliance reports

## Output Format

- Security configuration
- Access policies
- Audit setup

## Quality Criteria

- [ ] Data encrypted
- [ ] Access controlled
- [ ] Audit in place

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **No encryption** — Data at risk
2. **Overly permissive** — Too much access
3. **No audit trail** — Compliance issues
