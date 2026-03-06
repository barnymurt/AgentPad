---
name: Delivery Manager
description: Use when coordinating delivery of work across multiple skills. Use when breaking down a goal into executable tasks with clear dependencies. Use when sequencing work to respect dependencies. Use when managing scope boundaries. Focus is on HOW work gets done, not WHAT should be built. Product decisions are handled separately.
lifecycle: build
category: product
outputSummary: Delivery management plan with sprint coordination and stakeholder management
relatedAfter: scrum-master,release-management
nextSteps: Coordinate delivery with release-management and scrum-master
---

# Delivery Manager

The Delivery Manager skill focuses purely on execution logistics — breaking down work, mapping dependencies, sequencing tasks, and managing scope boundaries. It does NOT make product decisions (what to build, prioritization rationale, product strategy). That's the Product Manager's role. This skill handles the mechanics of delivery coordination.

## Core Workflow

### Step 1: Goal Clarification

- Extract the stated goal or outcome from the user
- Identify what "done" looks like — the success criteria
- Determine any explicit constraints or boundaries mentioned
- If the goal is vague, ask clarifying questions to specificize before proceeding

### Step 2: Work Breakdown

- Decompose the goal into discrete, executable tasks
- Each task should be:
  - Self-contained enough to be assigned to a skill
  - Specific enough to have clear completion criteria
  - Atomic enough to not need further decomposition
- Group related tasks into logical workstreams
- Identify which existing skills can execute each task
- Flag any tasks that may require new skills to be built

### Step 3: Dependency Analysis

- For each task, identify what other tasks must complete first
- Map dependencies as a directed graph (task A → task B means A must complete before B)
- Identify:
  - **Hard dependencies** — B cannot start until A finishes
  - **Soft dependencies** — B can parallelize but benefits from A's output
  - **Shared resources** — tasks that may compete for same inputs
- Identify the critical path — the longest dependency chain that determines minimum sequence

### Step 4: Complexity Assessment

- For each task, assess complexity using T-shirt sizing:
  - **S (Small):** Single skill invocation, straightforward output
  - **M (Medium):** 2-3 skill calls, some coordination needed
  - **L (Large):** Multiple skill calls, complex handoffs, tight dependencies
- Complexity helps users understand relative effort without time estimates
- This is optional — use when it helps communicate scope

### Step 5: Scope Boundary

- Define what's explicitly IN scope for the current delivery
- Define what's explicitly OUT of scope
- Identify scope creep risks
- Note: Scope is about delivery boundaries, not product scope decisions

### Step 6: Sequencing

- Order tasks to minimize idle time and blockers
- Group tasks that can run in parallel into stages
- Ensure each stage's output feeds the next stage's input
- Flag any circular dependencies (A→B→C→A) — these must be resolved
- Note: Do NOT assign time estimates. AI agents execute continuously.

### Step 7: Output Generation

- Present the work breakdown as a structured delivery plan
- Include: tasks, dependencies, stages/sequences, scope boundaries, complexity ratings
- Format for easy consumption by other skills or the orchestrator
- Do NOT include time estimates (hours/days/weeks) — use complexity ratings instead

### During Delivery: Blocker Resolution

After initial plan is generated, the Delivery Manager also handles ongoing blocker resolution:

**Identifying Blockers:**
- Monitor tasks that are not progressing
- Identify dependency blockers (waiting on other tasks)
- Identify input blockers (missing required data)
- Identify quality blockers (poor output requiring revision)
- Identify direction blockers (unclear next steps)

**Resolving Blockers:**
- **Dependency blockers:** Re-sequence tasks, merge dependent tasks
- **Input blockers:** Request missing input, use proxy data, flag critical gaps
- **Quality blockers:** Request revision from skill, fix directly if minor
- **Direction blockers:** Clarify with user, reference plan

**Status Reporting:**
- Track completed, in-progress, blocked, and waiting tasks
- Report blocker status to orchestrator/user
- Update plan as delivery evolves

Note: This replaces the separate Scrum Master role. Delivery Manager handles both planning AND blocker resolution.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Goal Statement:** The delivery objective
- **Workstreams:** Logical groupings of related tasks
- **Task Registry:** Each task with ID, description, assigned skill, dependencies
- **Dependency Map:** Visual or textual representation of task relationships
- **Stage Sequencing:** Ordered stages with parallelizable tasks identified
- **Scope Boundary:** Explicit in-scope and out-of-scope items

## Quality Criteria

- [ ] Goal is stated with success criteria
- [ ] Tasks are atomic and executable by skills
- [ ] All dependencies are identified and mapped
- [ ] Critical path is identified
- [ ] Complexity ratings assigned (S/M/L) — optional but recommended
- [ ] Parallelizable tasks are grouped into stages
- [ ] Scope boundaries are explicit
- [ ] No time estimates (hours/days/weeks) — use complexity ratings instead
- [ ] Output can be consumed by the Skill Orchestrator
- [ ] Focus is on delivery mechanics, not product decisions

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Adding time estimates:** AI agents work continuously. Don't use hours, days, weeks. Use complexity ratings (S/M/L) instead if needed.
2. **Vague task definitions:** Tasks like "do research" or "make it better" are not executable. Break into specific actions.
3. **Missing dependencies:** Failing to identify that Task B needs output from Task A creates blockers. Map all connections.
4. **Scope creep:** Not defining what's out of scope leads to unbounded work. Always state boundaries explicitly.
5. **Sequencing without regard to dependencies:** Running tasks in parallel that have dependencies creates rework. Respect the dependency graph.
