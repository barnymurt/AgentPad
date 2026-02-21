# Output Schema: Delivery Manager

This document defines the exact structure of the Delivery Manager skill output.

## Required Sections

### 1. Goal Statement

**Purpose:** State the delivery objective and success criteria.

**Fields:**
- `goal`: The user's stated objective
- `success_criteria`: What defines "done"
- `constraints`: Any explicit constraints

**Format:** Markdown with bullet lists

**Example:**
```
goal: "Build a validation pack for my SaaS idea"
success_criteria:
  - Complete Validation Scorecard with GO/PAUSE/KILL recommendation
  - All 7 validation metrics calculated
  - MVP scope defined with prioritized feature list
  - Notion workspace specification generated
constraints: none stated
```

### 2. Workstreams

**Purpose:** Group related tasks into logical categories for easier consumption.

**Fields:**
- `workstream_id`: Unique identifier (WS-1, WS-2, etc.)
- `workstream_name`: Short descriptive name
- `description`: What this workstream covers
- `task_ids`: List of task IDs in this workstream

**Format:** Markdown table

**Example:**
| WS-ID | Workstream | Description | Tasks |
|-------|------------|-------------|-------|
| WS-1 | Research | Competitive analysis and user research | T-1, T-2, T-3 |
| WS-2 | Modeling | Business case and financial modeling | T-4, T-5 |
| WS-3 | Synthesis | Validation pack assembly | T-6, T-7 |

### 3. Task Registry

**Purpose:** Enumerate all executable tasks with their details.

**Fields:**
- `task_id`: Unique identifier (T-1, T-2, etc.)
- `description`: Specific, actionable description
- `assigned_skill`: Which skill should execute this (e.g., "competitor-research")
- `complexity`: S/M/L rating (optional but recommended)
- `dependencies`: List of task IDs that must complete first (empty if none)
- `outputs`: What this task produces (for downstream consumption)
- `completion_criteria`: How to know this task is done

**Format:** Markdown table

**Example:**
| T-ID | Description | Skill | Complexity | Dependencies | Outputs | Done Criteria |
|------|-------------|-------|------------|--------------|---------|---------------|
| T-1 | Research direct competitors | competitor-research | M | none | competitor profiles | 3+ competitors profiled |
| T-2 | Create user personas | user-persona-creation | S | T-1 | 2-3 personas | Primary persona identified |
| T-3 | Analyze market size | business-case-modeling | M | T-1 | TAM/SAM/SOM | All three sizes calculated |

### 4. Dependency Map

**Purpose:** Visual or textual representation of task dependencies.

**Fields:**
- `type`: "graph" (textual) or "mermaid" (for rendering)
- `nodes`: List of task IDs
- `edges`: Directed pairs (source → target)

**Format:** Mermaid graph syntax preferred, or textual list

**Example (Mermaid):**
```
graph TD
    T-1 --> T-2
    T-1 --> T-3
    T-2 --> T-4
    T-3 --> T-4
    T-4 --> T-5
```

**Example (Textual):**
```
T-1: no dependencies
T-2: depends on T-1
T-3: depends on T-1
T-4: depends on T-2, T-3
T-5: depends on T-4
```

### 5. Critical Path

**Purpose:** Identify the longest dependency chain that determines minimum sequence.

**Fields:**
- `path`: Ordered list of task IDs from start to finish
- `length`: Number of tasks in the chain
- `rationale`: Why this path is critical

**Format:** Markdown with explanation

**Example:**
```
path: [T-1, T-2, T-4, T-5]
length: 4 tasks
rationale: All other tasks can parallelize, but these must run in sequence
```

### 6. Stage Sequencing

**Purpose:** Group tasks into execution stages for the orchestrator.

**Fields:**
- `stage_id`: Unique identifier (S-1, S-2, etc.)
- `stage_name`: Descriptive name
- `tasks`: Task IDs that can run in parallel in this stage
- `entry_criteria`: What must complete before this stage (usually previous stage)
- `exit_criteria`: What this stage produces

**Format:** Markdown table

**Example:**
| Stage | Name | Tasks | Entry | Exit |
|-------|------|-------|-------|------|
| S-1 | Research | T-1, T-3 | none | Competitor profiles, market data |
| S-2 | Analysis | T-2, T-4 | S-1 complete | Personas, TAM/SAM/SOM |
| S-3 | Synthesis | T-5, T-6 | S-2 complete | Validation pack draft |

### 7. Scope Boundary

**Purpose:** Define what's included and excluded from this delivery.

**Fields:**
- `in_scope`: List of items explicitly included
- `out_of_scope`: List of items explicitly excluded
- `scope_creep_risks`: Potential requests that would expand scope

**Format:** Markdown with bullet lists

**Example:**
```
in_scope:
  - Competitive analysis (direct competitors only)
  - Business case modeling (base scenario + 2 variations)
  - Feature prioritization (top 10 features)

out_of_scope:
  - User interviews (no primary research)
  - Detailed technical architecture
  - Marketing plan

scope_creep_risks:
  - Adding indirect competitors beyond initial 5
  - Building financial models beyond 3 scenarios
  - Creating presentation materials
```

## Validation Rules

1. Every task must have at least one assigned skill
2. Dependency graph must be acyclic (no circular dependencies)
3. All tasks must be reachable from the start (no orphaned tasks)
4. Scope must have at least one "out of scope" item (proves discipline)
5. No time-based fields (duration, estimates, deadlines)

## Confidence Tagging

Assign confidence levels based on clarity of goal and execution plan:

- **High:** Goal is specific, dependencies are clear, scope is bounded
- **Medium:** Goal is somewhat vague OR dependencies uncertain
- **Low:** Goal requires clarification OR tasks require discovery

Include confidence rationale for Medium/Low tags.
