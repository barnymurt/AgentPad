# Output Schema: Scrum Master

This document defines the exact structure of the Scrum Master skill output.

## Required Sections

### 1. Delivery Status

**Purpose:** Show current state of all tasks in the delivery.

**Fields:**
- `task_id`: Unique identifier
- `status`: One of: completed, in_progress, blocked, waiting
- `since`: When status changed (optional, for context)
- `notes`: Brief context on current state

**Format:** Markdown table

**Example:**
| Task | Status | Notes |
|------|--------|-------|
| T-1: Define persona | ✅ Completed | Primary persona: Sales Manager |
| T-2: Competitor research | 🔄 In Progress | 3/5 competitors analyzed |
| T-3: Requirements | ⏸️ Waiting | Blocked by T-1 output |
| T-4: Business case | ⏸️ Waiting | Blocked by T-2 output |

### 2. Blocker Register

**Purpose:** Document all identified blockers and their resolution.

**Fields:**
- `blocker_id`: Unique identifier (B-1, B-2, etc.)
- `type`: dependency, input, quality, direction, collaboration
- `severity`: critical, major, minor
- `description`: What is blocking
- `affected_task`: Task ID(s) impacted
- `resolution`: How it was/will be resolved
- `status`: resolved, pending, escalated

**Format:** Markdown table

**Example:**
| ID | Type | Severity | Description | Affected | Resolution | Status |
|----|------|----------|-------------|----------|------------|--------|
| B-1 | dependency | major | T-3 needs T-1 output | T-3 | T-1 complete, unblocked | resolved |
| B-2 | input | critical | Salesforce API specs missing | T-5 | Requested from user | pending |
| B-3 | quality | major | Competitor data incomplete | T-4 | Requested revision | resolved |

### 3. Dependency Health

**Purpose:** Assess the overall dependency structure.

**Fields:**
- `total_dependencies`: Count of dependency relationships
- `blocked_count`: How many tasks are blocked
- `critical_path_status`: clear, at_risk, blocked
- `recommendations`: Suggested fixes if unhealthy

**Format:** Markdown with summary + recommendations

**Example:**
```
total_dependencies: 12
blocked_tasks: 2
critical_path: clear

recommendations: None needed
```

### 4. Collaboration Notes

**Purpose:** Document handoffs and coordination between skills.

**Fields:**
- `from_skill`: Source skill
- `to_skill`: Destination skill
- `handoff_item`: What's being passed
- `format_expected`: Expected format/structure
- `notes`: Any special instructions

**Format:** Markdown table

**Example:**
| From | To | Handoff | Format | Notes |
|------|-----|---------|--------|-------|
| competitor-research | business-case-modeling | Competitor profiles + pricing | JSON | Include TAM estimates |
| requirements-elicitation | architecture-design | Feature list | Markdown | Prioritized list |

### 5. Optimizations Identified

**Purpose:** Document process improvements for future deliveries.

**Fields:**
- `optimization_id`: Unique identifier
- `category`: sequencing, format, handoff, other
- `description`: What could be improved
- `impact`: high, medium, low
- `recommendation`: How to implement

**Format:** Markdown table

**Example:**
| ID | Category | Description | Impact | Recommendation |
|----|----------|-------------|--------|----------------|
| O-1 | format | Business case should output TAM as JSON | medium | Update business-case-modeling skill |
| O-2 | handoff | Persona output missing decision criteria | high | Add to requirements-elicitation skill |

### 6. Recommendations

**Purpose:** Actionable next steps for the orchestrator.

**Fields:**
- `recommendation`: What to do
- `priority`: critical, high, medium
- `reasoning`: Why this matters

**Format:** Markdown with priority list

**Example:**
```
1. [CRITICAL] Resolve B-2 before proceeding (missing API specs)
2. [HIGH] Review optimization O-2 for future deliveries
3. [MEDIUM] Consider parallelizing T-4 and T-5 once B-1 clears
```

### 7. Summary Statement

**Purpose:** High-level status for quick consumption.

**Format:** Single paragraph

**Example:**
```
Delivery is 40% complete (3/7 tasks). Two blockers identified: one resolved (dependency), one pending (missing input). Critical path is clear. Recommend resolving pending blocker before proceeding to Stage 3.
```

## Validation Rules

1. All non-completed tasks must have a status
2. All blocked tasks must have a blocker entry
3. All resolved blockers must reference resolution
4. At least one collaboration note if multiple skills are involved
5. At least one "out of scope" item in optimizations (proves continuous improvement mindset)
6. No time-based language (no "sprint", "velocity", "capacity")

## Confidence Tagging

Assign confidence based on clarity of blockers and resolution path:

- **High:** Blockers clear, resolution straightforward
- **Medium:** Some uncertainty about root cause or resolution
- **Low:** Blockers ambiguous or require external input

Include confidence rationale for Medium/Low tags.
