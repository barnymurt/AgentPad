---
name: migration-planning
description: Plan database schema migrations. Use when schema needs to change, you need version control for database, or need to plan rollbacks. Covers migration strategy, versioning, rollback plans, and zero-downtime migrations.
---

# Migration Planning

Plan database schema migrations with versioning and rollback strategies. This skill ensures safe schema changes.

## Core Workflow

### Step 1: Assess Changes
- What needs to change?
- Impact analysis
- Dependencies

### Step 2: Plan Migration
- Migration order
- Dependencies
- Rollback steps

### Step 3: Version Control
- Migration files
- Sequencing
- Documentation

### Step 4: Test Plan
- Test migration
- Test rollback
- Zero-downtime approach

## Output Format

- Migration scripts
- Rollback scripts
- Test plan

## Quality Criteria

- [ ] All changes covered
- [ ] Rollback possible
- [ ] Tested before production

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **No rollback** — Can't undo
2. **Not tested** — Production failures
3. **Breaking changes** — Downtime
