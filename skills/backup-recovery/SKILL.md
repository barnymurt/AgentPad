---
name: backup-recovery
description: Plan backup and recovery. Use when you need data recovery strategy, want to ensure business continuity, or need disaster recovery. Covers backup strategies, recovery procedures, testing, and automation.
lifecycle: build
category: engineering
outputSummary: Backup strategy and disaster recovery plan
nextSteps: Set up monitoring-observability to verify backup health
specialization: fullstack
---

# Backup & Recovery

Plan database backup and recovery. This skill ensures business continuity.

## Core Workflow

### Step 1: Define Strategy
- Backup types (full, incremental)
- Frequency
- Retention

### Step 2: Implement Backups
- Automated backups
- Offsite storage
- Encryption

### Step 3: Plan Recovery
- Recovery procedures
- RTO/RPO
- Runbooks

### Step 4: Test
- Restore tests
- Recovery drills
- Document results

## Output Format

- Backup configuration
- Recovery procedures
- Test results

## Quality Criteria

- [ ] Backups automated
- [ ] Recovery tested
- [ ] RTO/RPO met

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **No backups** — Data loss
2. **Not tested** — Recovery fails
3. **No offsite** — Regional failure
