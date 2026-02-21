---
name: data-modeling
description: Define entity relationships and data structure. Use when you need to design how data relates, want to create an ERD, need to plan entities and attributes, or are building new features requiring data structure. Covers entity identification, relationships, attributes, and data flow.
---

# Data Modeling

Define entity relationships and data structure before schema design. This skill ensures your data architecture is sound before implementation.

## Core Workflow

### Step 1: Identify Entities
- What are the core objects?
- What data needs to be stored?
- What are the nouns in your system?

### Step 2: Define Relationships
- How do entities relate?
- One-to-one, one-to-many, many-to-many?
- What are the foreign keys?

### Step 3: Document Attributes
- What data fields needed?
- Types, constraints, defaults
- Which are required vs optional

### Step 4: Validate with Queries
- What questions need answering?
- Can the model support queries?
- Any performance concerns?

## Output Format

- Entity diagram
- Relationship definitions
- Attribute specifications
- Query requirements

## Quality Criteria

- [ ] All entities identified
- [ ] Relationships are correct
- [ ] Attributes complete
- [ ] Queries can be supported

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Skipping modeling** — Jumping to schema
2. **Missing relationships** — Entities isolated
3. **Over-normalizing** — Performance issues
