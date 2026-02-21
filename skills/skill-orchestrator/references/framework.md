# Framework: Skill Orchestrator

This document provides the detailed methodology for the Skill Orchestrator skill, including strategy selection, skill assembly, and coordination patterns.

## Methodology Overview

The Skill Orchestrator applies systems thinking to coordinate delivery across multiple skills. The key principles:

1. **Right-size orchestration:** Don't over-engineer simple tasks
2. **Clear contracts:** Skills need clear input/output expectations
3. **Maintain vision:** Always connect back to user's ultimate goal
4. **Enable flow:** Remove friction between skills
5. **Adapt continuously:** Respond to changes and blockers

## Strategy Selection

### Decision Matrix

| Factor | One-on-One | Coordinated | Mini Squad | Parallel |
|--------|------------|-------------|------------|----------|
| Number of skills | 1 | 2-4 | 5+ | 3+ |
| Complexity | Low | Medium | High | Medium-High |
| Dependencies | None | Some | Many | Mixed |
| Collaboration | None | Moderate | Tight | None |
| Time to deliver | Short | Medium | Long | Medium |

### Choosing Strategy

**Use One-on-One when:**
- User goal maps directly to one skill
- No coordination needed
- Simple handoff (orchestrator → skill → user)
- Example: "Research competitors"

**Use Coordinated when:**
- 2-4 skills needed
- Clear sequential dependencies
- Moderate complexity
- Example: "Build a business case"

**Use Mini Squad when:**
- 5+ skills needed
- Tight integration between skills
- Output must be coherent
- Example: "Build validation pack"

**Use Parallel when:**
- Multiple independent workstreams
- Skills don't need each other's output
- Can combine later
- Example: "Build validation pack + technical spec"

### ⚠️ Nested Orchestration (Advanced Use Only)

Nested orchestration should be used sparingly. It adds complexity overhead.

**When to consider nested orchestration:**
- Goal requires 10+ skills across multiple independent sub-deliveries
- Sub-deliveries can execute largely in parallel without cross-dependencies
- Each sub-delivery has a clear, separate output
- You have the capacity to coordinate multiple orchestrators

**When NOT to use nested orchestration:**
- Default to Options A-C (one-on-one, coordinated, mini squad)
- If you're unsure whether you need it, you don't
- It adds coordination overhead and complexity

**Example use case:**
- "Build a full SaaS product" → sub-delivery 1: validation, sub-delivery 2: architecture, sub-delivery 3: development plan

## Skill Selection

### Core Skills (Always Available)

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| delivery-manager | Break down goals, sequence work | Always for multi-skill delivery |
| scrum-master | Remove blockers, coordinate | When issues arise (optional) |
| skill-reviewer | Validate skills before use | Before using new/unknown skills |
| skill-orchestrator | This skill | For very complex nested deliveries |

### Domain Skills (Select as Needed)

See skills/ directory for full list. Common categories:

**Research & Analysis:**
- competitor-research
- user-persona-creation
- requirements-elicitation
- market-analysis

**Strategy & Planning:**
- business-case-modeling
- feature-prioritization
- roadmap-planning

**Design & Execution:**
- user-journey-mapping
- architecture-design
- design-system

**Validation & Review:**
- devils-advocate
- heuristic-evaluation
- security-baseline-pack

### Skill Dependency Mapping

Before executing, map dependencies:

```
Skill A → Skill B → Skill C
    ↓           ↓
Skill D    Skill E
```

This becomes:
- Stage 1: A, D (parallel)
- Stage 2: B (needs A)
- Stage 3: C, E (B→C, B→E)

## Assembly Patterns

### Pattern 1: Assembly Line

**Best for:** Sequential dependencies

```
[Skill A] → [Skill B] → [Skill C] → [Skill D]
```

**Use when:** Each skill's output feeds the next

### Pattern 2: Fan-In

**Best for:** Multiple skills feeding one

```
[Skill A] ─┐
[Skill B] ─┼→ [Skill D]
[Skill C] ─┘
```

**Use when:** Synthesis needed from multiple sources

### Pattern 3: Fan-Out

**Best for:** One skill spawning multiple

```
[Skill A] → [Skill B]
         → [Skill C]
         → [Skill D]
```

**Use when:** Exploration of multiple options

### Pattern 4: Mesh

**Best for:** Complex interdependencies

```
    → [Skill B] ─→
   ↗            ↘
[Skill A]      [Skill D]
   ↘            ↗
    → [Skill C] ─→
```

**Use when:** Skills influence each other

## Coordination Mechanisms

### Handoff Contracts

Before skills interact, establish:

**Output Specification:**
- What the producing skill will deliver
- Format (JSON, Markdown, etc.)
- Required fields
- Optional fields

**Input Specification:**
- What the consuming skill expects
- Format matching output
- Handling of missing fields

**Example Handoff:**
```
competitor-research → business-case-modeling

Output from competitor-research:
{
  "competitors": [
    {"name": "X", "pricing": {...}, "market_share": {...}},
    ...
  ],
  "comparison_matrix": {...},
  "gap_analysis": {...}
}

Input expected by business-case-modeling:
{
  "competitors": "array of competitor objects with pricing",
  "market_segments": "from gap_analysis.segments"
}
```

### Collaboration Protocols

For mini squads, establish:

**Meeting Points:**
- When skills sync
- What gets shared
- How conflicts resolved

**Escalation Rules:**
  - When to involve Delivery Manager
- When to involve user
- When to escalate to human

**Quality Gates:**
- What must be true before advancing
- Who validates

## Execution Modes

### Mode 1: Plan-First

1. Engage Project Manager to create plan
2. Review plan with user
3. Execute plan
4. Adapt as needed

**Best for:** New or complex goals

### Mode 2: Execute-and-Adapt

1. Start with initial plan
2. Execute while refining
3. Continuously adapt

**Best for:** Evolving goals

### Mode 3: Rapid Prototyping

1. Quick assembly of skills
2. Get initial output fast
3. Refine iteratively

**Best for:** Time-sensitive decisions

## Quality Scoring Rubric

### Strategy Selection Score

| Score | Criteria |
|-------|----------|
| 5 | Perfect strategy for complexity |
| 4 | Good fit with minor sub-optimal |
| 3 | Workable but could be better |
| 2 | Poor fit causing issues |
| 1 | Wrong strategy entirely |

### Skill Selection Score

| Score | Criteria |
|-------|----------|
| 5 | All right skills, no gaps |
| 4 | Good selection, minor misses |
| 3 | Most skills right |
| 2 | Significant gaps |
| 1 | Wrong skills selected |

### Coordination Score

| Score | Criteria |
|-------|----------|
| 5 | Seamless handoffs, no friction |
| 4 | Good coordination, minor issues |
| 3 | Some coordination problems |
| 2 | Significant coordination failures |
| 1 | Chaotic, no coordination |

### Vision Alignment Score

| Score | Criteria |
|-------|----------|
| 5 | Every task connects to goal |
| 4 | Most tasks aligned |
| 3 | Some misalignment |
| 2 | Significant drift |
| 1 | Lost sight of goal |

### Overall Score

- **Excellent (17-20):** Expert-level orchestration
- **Good (13-16):** Effective orchestration
- **Fair (9-12):** Needs improvement
- **Poor (1-8):** Not effective

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|--------------|--------------|-----------------|
| Over-orchestrating | Unnecessary complexity | Use one-on-one for simple |
| Under-orchestrating | Chaos, missed dependencies | Use PM for multi-skill |
| No handoff specs | Skills miss needed input | Define contracts upfront |
| Ignoring blockers | Delivery slows/stops | Use Delivery Manager blocker resolution actively |
| Scope creep | Delivery expands infinitely | Use PM scope management |
| Not communicating | User loses visibility | Regular status updates |

## Edge Cases

### Edge Case 1: Skills Produce Conflicting Output

**Situation:** Two skills have different conclusions (e.g., one says viable, one says not)

**Resolution:**
1. Identify conflict
2. Use devils-advocate to analyze
3. Present both perspectives to user
4. Let user decide OR synthesize with caveats

### Edge Case 2: Skill Fails Repeatedly

**Situation:** A skill keeps failing or producing poor output

**Resolution:**
1. Check if being used correctly
2. Check input quality
3. Try alternative skill if available
4. If fundamental issue, escalate to skill building

### Edge Case 3: User Changes Goal Mid-Delivery

**Situation:** User wants to pivot or change direction

**Resolution:**
1. Acknowledge change
2. Assess impact on current plan
3. Option A: Restart planning (return to Step 1)
4. Option B: Adapt current plan
5. Communicate impact of change

### Edge Case 4: Too Many Skills

**Situation:** Delivery requires 10+ skills, becoming unwieldy

**Resolution:**
1. Break into nested orchestrations
2. Create sub-deliveries
3. Orchestrator manages sub-orchestrators
4. Each sub-delivery has clear scope

### Edge Case 5: Skill Not Available

**Situation:** Needed skill doesn't exist

**Resolution:**
1. Can existing skills combine?
2. Can task be expressed differently?
3. Should new skill be built?
4. Can work proceed without it?

## Sources and Rationale

This methodology draws from:
- **Systems Architecture:** Modular design, clean interfaces
- **Orchestration Patterns:** Fan-in, fan-out, pipeline
- **Team Dynamics:** Role clarity, coordination mechanisms
- **Project Management:** Planning, execution, monitoring

The key insight: The orchestrator's job is NOT to do the work, but to ensure the right work gets done by the right skills at the right time, while maintaining coherence toward the user's goal.
