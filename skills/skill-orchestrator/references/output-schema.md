# Output Schema: Skill Orchestrator

This document defines the exact structure of the Skill Orchestrator output.

## Required Sections

### 1. Goal Analysis

**Purpose:** Document understanding of user's objective.

**Fields:**
- `user_goal`: What the user wants to achieve (verbatim)
- `success_criteria`: How success will be measured
- `constraints`: Any stated limitations
- `assumptions`: What's being assumed if not stated

**Format:** Markdown with structured fields

**Example:**
```
user_goal: "Build a validation pack for my AI-powered sales notes app"

success_criteria:
  - Complete Validation Scorecard with GO/PAUSE/KILL
  - MVP scope defined with prioritized features
  - Business case with unit economics

constraints: None stated

assumptions: 
  - Target market: SMB to enterprise sales teams
  - Revenue model: Subscription SaaS
```

### 2. Strategy Selection

**Purpose:** Document chosen approach and rationale.

**Fields:**
- `strategy`: one_on_one, coordinated, mini_squad, parallel, or nested (nested is advanced use only)
- `rationale`: Why this strategy fits the goal
- `alternatives_considered`: Other approaches and why not chosen

**Format:** Markdown with structured fields

**Example:**
```
strategy: mini_squad

rationale: Validation pack requires tight integration between research, 
modeling, and synthesis skills. Output from each feeds the next. A mini 
squad ensures collaboration and coherence.

alternatives_considered:
  - coordinated: Could work but less tight integration
  - one_on_one: Too many handoffs, would lose coherence
```

### 3. Skill Team

**Purpose:** List all skills engaged for this delivery.

**Fields:**
- `skill_name`: Name of the skill
- `role`: What this skill contributes
- `dependencies`: What it needs from others
- `delivers`: What it produces

**Format:** Markdown table

**Example:**
| Skill | Role | Dependencies | Delivers |
|-------|------|--------------|----------|
| project-manager | Plan and sequence | user_goal | Delivery plan |
| scrum-master | Coordinate and unblock | delivery_plan | Status, blockers resolved |
| requirements-elicitation | Define requirements | none | Requirements doc |
| competitor-research | Analyze market | none | Competitor profiles |
| user-persona-creation | Define customers | requirements | Personas |
| business-case-modeling | Financial viability | competitors, personas | Business case |
| devils-advocate | Challenge assumptions | business_case | Risk analysis |
| feature-prioritization | Rank features | requirements, competitors | Prioritized backlog |
| user-journey-mapping | Map user flow | personas, features | Journey map |

### 4. Execution Plan

**Purpose:** Document the sequence of skill execution.

**Fields:**
- `stage`: Sequential stage identifier
- `skills_in_stage`: Skills that run in this stage
- `parallel_or_sequential`: How skills in stage execute
- `entry_criteria`: What must complete before stage
- `exit_criteria`: What this stage produces
- `handoffs`: What passes between skills

**Format:** Markdown table

**Example:**
| Stage | Skills | Mode | Entry | Exit | Handoffs |
|-------|--------|------|-------|------|----------|
| 1 | requirements-elicitation, competitor-research, user-persona-creation | parallel | none | Requirements, competitors, personas | - |
| 2 | business-case-modeling | sequential | Stage 1 | Business case | Requirements + competitors → business case |
| 3 | devils-advocate | sequential | Stage 2 | Risk analysis | Business case → devils advocate |
| 4 | feature-prioritization | sequential | Stage 3 | Prioritized backlog | Requirements + competitors + risks → prioritization |
| 5 | user-journey-mapping | sequential | Stage 4 | Journey map | Personas + features → journey |
| 6 | (synthesis) | - | All | Validation pack | All → unified deliverable |

### 5. Mini Squad Configuration (if applicable)

**Purpose:** Define how skills collaborate in mini squad mode.

**Fields:**
- `squad_name`: Descriptive name for this squad
- `mission`: What the squad aims to achieve
- `members`: Skills in the squad
- `collaboration_protocol`: How skills work together
- `aggregation_strategy`: How outputs combine

**Format:** Markdown with structured fields

**Example:**
```
squad_name: Validation Pack Squad

mission: Produce comprehensive validation pack assessing viability of 
AI sales notes product

members:
  - competitor-research (market reality)
  - user-persona-creation (customer understanding)
  - business-case-modeling (financial viability)
  - devils-advocate (risk identification)
  - feature-prioritization (scope definition)
  - user-journey-mapping (execution flow)

collaboration_protocol:
  - Each skill runs in sequence
  - Output feeds next skill
  - Delivery Manager monitors collaboration
  - Blockers resolved immediately

aggregation_strategy:
  - Project Manager synthesizes into Validation Scorecard
  - All outputs preserved as appendices
  - Unified narrative through synthesis step
```

### 6. Status Report

**Purpose:** Current state of the delivery.

**Fields:**
- `overall_status`: on_track, at_risk, blocked, complete
- `completion_percentage`: Estimated percent complete
- `active_stage`: Current execution stage
- `completed_skills`: Skills finished
- `in_progress_skills`: Skills currently running
- `pending_skills`: Skills waiting

**Format:** Markdown with structured fields

**Example:**
```
overall_status: on_track
completion_percentage: 45
active_stage: 2 (Business Case Modeling)

completed_skills:
  - requirements-elicitation
  - competitor-research  
  - user-persona-creation

in_progress_skills:
  - business-case-modeling (75%)

pending_skills:
  - devils-advocate
  - feature-prioritization
  - user-journey-mapping
```

### 7. Blocker Summary

**Purpose:** High-level blocker status.

**Fields:**
- `critical_count`: Blockers stopping all progress
- `major_count`: Blockers significantly slowing progress
- `minor_count`: Blockers with workaround
- `summary`: One-line status

**Format:** Markdown with fields

**Example:**
```
critical_count: 0
major_count: 1
minor_count: 2

summary: One major blocker (waiting on competitor data), working around 
minor issues. Delivery on track.
```

### 8. Deliverable Preview

**Purpose:** Preview of what will be delivered.

**Fields:**
- `deliverable_type`: What form the output takes
- `key_sections`: Major sections/components
- `confidence`: How confident in deliverable quality
- `risks_to_quality`: What could affect final quality

**Format:** Markdown with structured fields

**Example:**
```
deliverable_type: Validation Pack (Notion workspace + PDF summary)

key_sections:
  - Validation Scorecard (GO/PAUSE/KILL)
  - Competitive Positioning Map
  - User Personas
  - Business Case (TAM/SAM/SOM, unit economics)
  - Risk Analysis
  - MVP Feature Backlog
  - User Journey Map
  - Assumption Register

confidence: high

risks_to_quality:
  - Business case assumptions may need user validation
  - Competitor data may be incomplete for niche players
```

## Validation Rules

1. Goal must be stated in user's terms
2. Strategy must have clear rationale
3. All engaged skills must have defined roles
4. Execution plan must show clear sequencing
5. Mini squad must have collaboration protocol
6. Status must reflect actual state
7. No time-based references in execution plan

## Confidence Tagging

Assign confidence based on goal clarity and skill fit:

- **High:** Goal clear, right skills selected, execution plan solid
- **Medium:** Some ambiguity in goal or skill selection
- **Low:** Goal unclear or requires discovery phase first

Include confidence rationale for Medium/Low tags.
