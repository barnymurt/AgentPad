# Output Schema: Process Mapping

This file defines the exact structure of the Process Mapping skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **requirements-elicitation:** `context.process_requirements`, `context.pain_points`
- **stakeholder-analysis:** `context.stakeholders`, `context.roles`

### Produces

This skill produces:
- `context.processes[].as_is` — Current state process map
- `context.processes[].analysis` — Identified problems
- `context.processes[].to_be` — Future state design
- `context.automation_opportunities[]` — What's suitable for automation
- `context.recommendations[]` — Prioritized improvements

---

## Output Structure

```
# Process Mapping: [Scope]

## 1. Executive Summary (required)

- Processes mapped: [X]
- Key problems identified: [X]
- Quick wins identified: [X]
- Automation opportunities: [X]
- Primary recommendation: [2-3 sentences]

## 2. Scope Definition (required)

### Priority Processes (limit 3-5)
| Process | Priority | Rationale |
|---------|----------|-----------|
| [Process 1] | High | [Why important] |
| [Process 2] | Medium | [Why important] |

### Excluded Processes
| Process | Reason |
|---------|--------|
| [Process] | [Out of scope] |

### Scope Boundaries
- **In scope:** [What's included]
- **Out of scope:** [What's excluded]
- **Start triggers:** [What initiates each process]
- **End results:** [What completes each process]

## 3. As-Is Process Maps (required)

### Process 1: [Name]

**Objective:** [What this process achieves]

**Flow:**
```
[Start] → [Step 1] → [Step 2] → [Decision] → [Step 3] → [End]
              ↓
          [Alternative path]
```

**Swimlane View:**
| Actor | Steps |
|-------|-------|
| [Role 1] | [Step 1], [Step 3] |
| [Role 2] | [Step 2], [Step 4] |

**Process Details:**

| Step | Actor | Action | Input | Output | Time |
|------|-------|--------|-------|--------|------|
| 1 | [Who] | [Does what] | [Data] | [Result] | [Duration] |
| 2 | [Who] | [Does what] | [Data] | [Result] | [Duration] |

**Validation:**
- [✓] Reviewed by: [Names]
- [✓] Matches actual workflow: Yes / No (notes)

[Repeat for each process]

## 4. Problem Analysis (required)

### Process 1 Problems

| Problem | Type | Location | Frequency | Impact | Root Cause |
|---------|------|----------|-----------|--------|------------|
| [Issue] | Bottleneck/Redundancy/Exception | Step X | [Often/Sometimes] | High/Med/Low | [Cause] |

### Aggregated Problems

| Problem Type | Count | Top Impact Areas |
|--------------|-------|------------------|
| Bottlenecks | X | [Process names] |
| Redundancies | X | [Process names] |
| Manual Steps | X | [Process names] |

## 5. To-Be Process Designs (required)

### Process 1: Improved

**Improvements Applied:**
- [Change 1]
- [Change 2]

**New Flow:**
```
[Start] → [Step 1] → [Step 2] → [End]
```

**Expected Benefits:**
| Benefit | Metric | Current → Target |
|---------|--------|-----------------|
| Time reduction | [X] min → [Y] min | [-Z%] |
| Error reduction | [X]% → [Y]% | [-Z%] |

## 6. Automation Assessment (required)

### Opportunities Identified

| Process | Task | Automation Appropriateness | Risk | Recommendation |
|---------|------|---------------------------|------|----------------|
| [Name] | [Task] | Good / Poor / Conditional | Low/Med/High | Automate / Don't automate / Human in loop |

### Not Appropriate for Automation

| Process | Task | Reason |
|---------|------|--------|
| [Name] | [Task] | [Why not suitable] |

### Automation Implementation Notes
- [Implementation consideration 1]
- [Implementation consideration 2]

## 7. Recommendations (required)

### Quick Wins (High Impact, Low Effort)

| Recommendation | Process | Effort | Impact | Owner | Timeline |
|----------------|---------|--------|--------|-------|----------|
| [Action] | [Which] | <1 week | High | [Who] | [When] |

### Strategic Improvements (High Impact, High Effort)

| Recommendation | Process | Effort | Impact | Owner | Timeline |
|----------------|---------|--------|--------|-------|----------|
| [Action] | [Which] | [Weeks] | High | [Who] | [When] |

### Low Priority

| Recommendation | Reason |
|----------------|--------|
| [Action] | [Why deprioritized] |

## 8. Implementation Plan (required)

### Phase 1: Quick Wins (Weeks 1-2)

| Action | Owner | Deliverable |
|--------|-------|-------------|
| [Task] | [Who] | [What] |

### Phase 2: Process Improvements (Weeks 3-6)

| Action | Owner | Deliverable |
|--------|-------|-------------|
| [Task] | [Who] | [What] |

### Phase 3: Automation (Weeks 7+)

| Action | Owner | Deliverable |
|--------|-------|-------------|
| [Task] | [Who] | [What] |

---

## Validation Rules

1. Scope limited to 3-5 priority processes
2. As-is processes documented with evidence (validated by stakeholders)
3. Each process has start trigger and end result defined
4. Problems identified with type, location, and impact
5. To-be processes designed with improvement rationale
6. Automation assessed for appropriateness (not everything automated)
7. Quick wins identified with owners and timelines
8. Recommendations prioritized by effort/impact

## Confidence Tagging

- **High:** Process observed, validated by participants
- **Medium:** Process described by stakeholders, not observed
- **Low:** Process assumed based on documentation only

Apply confidence to problem analysis and recommendations.
