---
name: state-management
description: Design application state architecture. Use when state gets complex, need data flow patterns, or want to manage caching. Covers local state, server state, caching, and state machines.
---

# State Management

Design application state architecture. This skill manages data flow.

## Core Workflow

### Step 1: Identify State
- Local vs server
- Ephemeral vs persistent
- Complexity

### Step 2: Choose Approach
- Context
- Redux/Zustand
- Server state (React Query)
- State machines

### Step 3: Implement
- Store setup
- Data flow
- Caching

### Step 4: Optimize
- Re-renders
- Caching
- Persistence

## Output Format

- State architecture
- Implementation
- Patterns

## Quality Criteria

- [ ] Clear data flow
- [ ] Appropriate complexity
- [ ] Performant

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Over-engineering** — Simple state complex
2. **No caching** — Over-fetching
3. **Global everything** — Unnecessary
