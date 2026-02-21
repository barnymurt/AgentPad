---
name: schema-design
description: Create detailed database schema. Use when you need tables or collections, want to define indexes, constraints, or need to implement data-modeling into database. Covers table design, indexes, constraints, and database-specific features.
---

# Schema Design

Create detailed database schema from data models. This skill implements your data structure in the database.

## Core Workflow

### Step 1: Create Tables
- Define tables from entities
- Set up primary keys
- Add basic structure

### Step 2: Add Constraints
- Foreign keys
- Unique constraints
- Check constraints

### Step 3: Create Indexes
- For queries
- For performance
- Consider composite indexes

### Step 4: Apply Database Features
- Triggers
- Stored procedures
- Partitioning if needed

## Output Format

- CREATE TABLE statements
- Index definitions
- Constraint specifications

## Quality Criteria

- [ ] Schema matches data model
- [ ] Constraints enforce integrity
- [ ] Indexes support queries
- [ ] Performance considered

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **No indexes** — Slow queries
2. **Too many indexes** — Write overhead
3. **Missing constraints** — Data integrity issues
