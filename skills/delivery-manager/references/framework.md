# Framework: Project Manager

This document provides the detailed methodology for the Project Manager skill, including scoring rubrics, decision trees, and edge case handling.

## Methodology Overview

The Project Manager skill applies traditional delivery management principles adapted for AI agent workflows. The core insight: AI agents execute continuously without human scheduling constraints, so time-based management is replaced by dependency-based sequencing.

## Task Decomposition Principles

### What Makes a Good Task

A well-defined task is:
- **Executable:** Can be handed to a skill and produce output
- **Atomic:** Cannot be meaningfully split further
- **Bounded:** Has clear start and end conditions
- **Transferable:** Output can be consumed by downstream tasks

### Task Size Guidelines

| Size | Description | Indicators |
|------|-------------|------------|
| Small | Single skill invocation | Produces one defined output |
| Medium | Small cluster of skill calls | 2-3 outputs, some dependencies |
| Large | Full workflow phase | Multiple skills, clear stage boundary |

**Rule of thumb:** If you need "and then..." to describe it, it's probably multiple tasks.

### Anti-patterns

| Anti-pattern | Why It's Bad | Fix |
|-------------|--------------|-----|
| "Do research" | Not actionable | Break into "identify competitors", "analyze pricing", etc. |
| "Make it better" | No completion criteria | Define specific improvement target |
| "Create deliverable" | Too vague | Specify exact deliverable type and contents |
| "Finish X and start Y" | Two tasks | Split into T-1 (finish X), T-2 (start Y) |

## Dependency Analysis

### Dependency Types

#### Hard Dependencies (Must Have)
```
Task B → Task A (B cannot start until A completes)
```
**Example:** Cannot analyze competitors until competitors are identified.

**Rule:** If B needs output from A, it's hard.

#### Soft Dependencies (Should Have)
```
Task B → Task A (B benefits from A but can run)
```
**Example:** Creating personas benefits from competitor research, but could proceed with user input alone.

**Rule:** If B's output is better with A but not required, it's soft.

#### Shared Resource Dependencies
```
Task A → Resource X
Task B → Resource X
```
**Example:** Both competitor research and business modeling need market data — they compete for the same input.

**Rule:** If multiple tasks need the same input source, sequence them or parallelize carefully.

### Building the Dependency Graph

1. For each task, ask: "What do I need before I can start?"
2. For each task, ask: "What will I produce that others need?"
3. Map as directed edges: source → target
4. Check for cycles (A→B→C→A) — these must be resolved

### Cycle Resolution

If cycles exist:
1. Identify the purpose of each task in the cycle
2. Can tasks be merged? (A+B = single task)
3. Can feedback loops be eliminated? (A produces final, not intermediate)
4. Can one task's output be made available earlier?
5. If no resolution, flag for human intervention

## Critical Path Analysis

### Definition
The critical path is the longest sequence of dependent tasks that determines minimum completion order.

### How to Identify

1. List all paths from start tasks (no dependencies) to end tasks (no dependents)
2. Count tasks in each path
3. The path with most tasks is critical
4. Any delay in critical path delays overall delivery

### Implications

- Tasks on critical path: Execute in sequence, no parallelization
- Tasks off critical path: Can parallelize within their stages
- Critical path may change as scope changes

**Important:** AI agents don't have "delay" in human terms, but understanding critical path helps:
- Identify what must happen first
- Identify what can happen concurrently
- Communicate structure to users

## Sequencing and Staging

### Stage Design Principles

1. **Maximize parallelism:** Group tasks that can run concurrently
2. **Respect dependencies:** Ensure stage N's inputs come from stage N-1
3. **Single entry/exit:** Each stage should have clear start and end
4. **Balanced stages:** Similar effort across stages (for human consumption)

### Stage Structure

```
Stage 1 (Parallel)
├── Task A
├── Task B
└── Task C

Stage 2 (Sequential from Stage 1)
└── Task D (needs A, B, C outputs)

Stage 3 (Parallel from Stage 2)
├── Task E
└── Task F
```

### Decision Tree: Should Tasks Parallelize?

```
Q: Can Task B start while Task A runs?
├── A needs B's output → NO, hard dependency
├── A and B share resources → MAYBE, check contention
├── A and B independent → YES, parallelize
└── B needs A's intermediate output → NO, wait for A
```

## Scope Management

### Scope Definition Process

1. Start with goal — what's the desired outcome?
2. List what's clearly needed to achieve goal
3. List what's clearly NOT needed
4. Identify the gray area — decide explicitly

### Scope Creep Signals

| Signal | Response |
|--------|----------|
| "While you're at it..." | New request, assess if in scope |
| "Wouldn't it be nice..." | Enhancement, assess priority |
| "What about..." | Scope expansion, evaluate |
| "Can't we just..." | Scope expansion, evaluate |

**Rule:** Every scope addition should be explicitly acknowledged and documented.

### Boundary Discipline

Good scope statements:
- "Direct competitors only (top 5 by market share)"
- "Base financial scenario + 2 variations"
- "No primary user research"

Bad scope statements:
- "Relevant competitors" (undefined)
- "Standard financial analysis" (undefined)
- "Appropriate research" (undefined)

## Quality Scoring Rubric

### Task Decomposition Score

| Score | Criteria |
|-------|----------|
| 5 | All tasks atomic, executable, properly bounded |
| 4 | Most tasks good, minor overlaps or ambiguities |
| 3 | Mix of good and vague tasks |
| 2 | Many tasks need decomposition |
| 1 | Tasks are not actionable |

### Dependency Mapping Score

| Score | Criteria |
|-------|----------|
| 5 | All dependencies identified, no cycles, critical path clear |
| 4 | Most dependencies mapped, minor misses |
| 3 | Major dependencies present, some missing |
| 2 | Significant dependencies missing |
| 1 | No coherent dependency structure |

### Scope Discipline Score

| Score | Criteria |
|-------|----------|
| 5 | Clear in/out scope, explicit boundaries |
| 4 | Good boundaries, minor gray areas |
| 3 | Some boundaries defined |
| 2 | Vague boundaries |
| 1 | No scope definition |

### Alignment Score

| Score | Criteria |
|-------|----------|
| 5 | Every task clearly contributes to goal |
| 4 | Most tasks aligned, minor questions |
| 3 | Some tasks of unclear value |
| 2 | Significant misalignment |
| 1 | No coherence |

### Overall Score

- **Excellent (17-20):** Production-ready breakdown
- **Good (13-16):** Minor refinements needed
- **Fair (9-12):** Significant rework needed
- **Poor (4-8):** Start over with better goal clarification

## Edge Cases

### Edge Case 1: Vague Goal

**Situation:** User says "help me build something" or "improve my product"

**Response:** Ask clarifying questions before proceeding:
- What does "success" look like?
- What constraints exist (budget, timeline, scope)?
- What's the current state vs. desired state?

**If clarification fails:** Proceed with stated assumptions, flag them prominently.

### Edge Case 2: Circular Dependencies

**Situation:** A→B→C→A detected

**Resolution steps:**
1. Can A produce final output directly? Merge B and C into A
2. Can B produce intermediate that C doesn't need? Restructure
3. Can we accept one task doing double duty?

**If unresolved:** Flag for human resolution, explain the cycle.

### Edge Case 3: Too Many Dependencies

**Situation:** Task depends on everything (spaghetti graph)

**Root cause:** Tasks too granular OR artificial dependencies

**Resolution:**
- Merge tightly coupled tasks
- Remove soft dependencies that aren't truly needed
- Restructure into clearer phases

### Edge Case 4: New Skills Required

**Situation:** Task cannot be assigned to existing skills

**Options:**
1. Can existing skills be combined/extended?
2. Should new skill be built (long-term investment)?
3. Can task be expressed differently to use existing skills?

**Recommendation:** If task represents recurring need, build skill. If one-off, handle as exception.

### Edge Case 5: Conflicting Priorities

**Situation:** User requests multiple goals with different priorities

**Resolution:**
1. Clarify priority order
2. Break down each goal separately
3. Create unified work breakdown with priority tags
4. Or clarify: deliver one before another?

## Sources and Rationale

This methodology draws from:
- **PMI PMBOK:** Work breakdown structure, dependency management
- **Agile frameworks:** Sprint planning, story mapping
- **Systems thinking:** Dependency graphs, critical path
- **AI adaptation:** Removal of time-based estimates, continuous execution model

The key insight: AI agents execute differently than humans. They don't need:
- Time estimates (they work continuously)
- Resource allocation (they can parallelize within constraints)
- Sprint boundaries (they can work until done)

What they do need:
- Clear dependencies (what feeds what)
- Proper sequencing (respect dependencies)
- Bounded scope (know when to stop)
- Coherent goals (know what success looks like)
