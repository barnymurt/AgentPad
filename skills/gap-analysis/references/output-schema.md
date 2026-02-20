# Output Schema: Gap Analysis

This file defines the exact structure of the Gap Analysis skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **requirements-elicitation:** `context.desired_state` (from requirements)
- **architecture-design:** `context.current_state` (technical capabilities)
- **stakeholder-analysis:** `context.priorities`, `context.constraints`

### Produces

This skill produces:
- `context.gaps[]` — Array of gap objects with scores
- `context.root_causes[]` — Root cause analysis
- `context.recommendations[]` — Gap closure recommendations
- `context.action_plan[]` — Prioritized action items

---

## Output Structure

```
# Gap Analysis: [Product / Process Name]

## 1. Executive Summary (required)

- Analysis scope: [What's included]
- Number of gaps identified: [X]
- Top 3 priority gaps: [List]
- Quick wins identified: [X]
- Primary recommendation: [2-3 sentences]

## 2. Prerequisites Confirmed (required)

| Input | Status | Source |
|-------|--------|--------|
| Current state | ✓ Confirmed / ⚠ Assumed | User provided / Interview |
| Desired state | ✓ Confirmed | requirements/vision |
| Scope | ✓ Confirmed | [Boundaries defined] |
| Constraints | ✓ Confirmed / ⚠ Missing | User provided |

## 3. Current State (required)

### Systems & Capabilities
| Capability | Status | Evidence |
|------------|--------|----------|
| [Capability 1] | Existing / Partial / None | [Evidence] |
| [Capability 2] | Existing / Partial / None | [Evidence] |

### Processes
| Process | Status | Notes |
|---------|--------|-------|
| [Process 1] | Working / Problematic / None | [Notes] |
| [Process 2] | Working / Problematic / None | [Notes] |

### Team/Skills
| Area | Status | Gap |
|------|--------|-----|
| [Skill area] | Adequate / Gap | [Gap if any] |

## 4. Desired State (required)

### From Requirements
| Requirement | Source | Priority |
|-------------|--------|----------|
| [Req 1] | requirements-elicitation | Must/Should |
| [Req 2] | requirements-elicitation | Must/Should |

### From Vision
| Vision Element | Description |
|----------------|-------------|
| [Element] | [Description] |

### Constraints
| Constraint | Impact |
|------------|--------|
| [Budget] | [How it limits scope] |
| [Timeline] | [How it limits scope] |

## 5. Gap Map (required)

### Gap [G-001]: [Title]

**Category:** Missing / Inadequate / Excess / Misaligned

**Current State:**
[What's happening now - specific and evidenced]

**Desired State:**
[What should be happening - from requirements/vision]

**Evidence:**
- [Evidence 1]
- [Evidence 2]

**Dimension:** Capability / Process / Technology / People / Governance

**Impact:** [1-5] — [Justification]
**Effort:** [1-5] — [Justification]
**Priority Score:** [Impact × Effort] = [X]

**Root Cause Analysis:**
- Surface Gap: [Stated above]
- Root Cause: [Why this gap exists]
- Related Gaps: [G-002, G-003 if any]

**Recommendation:** Build / Buy / Borrow / Block
**Approach Details:** [Specific recommendation]

[Repeat for each gap - aim for 5-10 significant gaps]

## 6. Root Cause Analysis (required)

### Grouped Root Causes

| Root Cause | Surface Gaps | Recommendation |
|------------|-------------|----------------|
| [Root cause 1] | G-001, G-003 | [Approach] |
| [Root cause 2] | G-002 | [Approach] |

### Insights
- [Key insight 1]
- [Key insight 2]

## 7. Gap Assessment Summary (required)

### Priority Matrix

| Quadrant | Gaps | Action |
|----------|------|--------|
| Quick Wins (High Impact, Low Effort) | G-001, G-005 | Do first |
| Strategic Investment (High Impact, High Effort) | G-002, G-004 | Plan for |
| Fill-ins (Low Impact, Low Effort) | G-007 | Do when time permits |
| Deprioritize (Low Impact, High Effort) | G-008, G-009 | Skip |

### Gap Distribution

| Category | Count | % of Total |
|----------|-------|------------|
| Missing | X | X% |
| Inadequate | X | X% |
| Excess | X | X% |
| Misaligned | X | X% |

### Impact Distribution

| Impact Level | Count |
|--------------|-------|
| Critical (5) | X |
| High (4) | X |
| Medium (3) | X |
| Low (2) | X |
| Trivial (1) | X |

## 8. Recommendations (required)

### Gap [G-001]: [Title]

**Recommendation:** [Build / Buy / Borrow / Block]

**Specific Approach:**
[Detailed recommendation - what to do specifically]

**Timeline:** [Estimate - e.g., 2-3 weeks]

**Resources Required:**
- [Resource 1]
- [Resource 2]

**Dependencies:**
- [What must happen first]

**Alternative Considered:**
[If any - and why not chosen]

[Repeat for each gap]

## 9. Action Plan (required)

### Phase 1: Immediate (This Sprint/Sprint 1)

| Gap | Priority | Approach | Owner | Due |
|-----|----------|----------|-------|-----|
| G-001 | 10 | Build | [Name] | [Date] |
| G-005 | 8 | Buy | [Name] | [Date] |

### Phase 2: Short-term (Next 1-2 Months)

| Gap | Priority | Approach | Owner | Due |
|-----|----------|----------|-------|-----|
| G-002 | 16 | Build | [Name] | [Date] |

### Phase 3: Medium-term (3-6 Months)

| Gap | Priority | Approach | Owner | Due |
|-----|----------|----------|-------|-----|
| G-004 | 12 | Borrow | [Name] | [Date] |

### Acceptable Gaps (No Action Planned)

| Gap | Reason |
|-----|--------|
| G-008 | Low priority, high effort, not critical |

## 10. Assumptions (required)

| Assumption | Confidence | Impact if Wrong |
|------------|------------|-----------------|
| [Assumption] | High/Medium/Low | [Impact] |

---

## Validation Rules

1. Current state documented with evidence (not just assertions)
2. Desired state clearly defined from requirements or vision
3. Top 5-10 gaps identified (not exhaustive list)
4. Each gap has impact score (1-5) with justification
5. Each gap has effort score (1-5) with justification
6. Root cause analysis distinguishes surface from root gaps
7. Priority matrix populated correctly
8. Quick wins identified (high impact, low effort)
9. Acceptable gaps noted where appropriate
10. Recommendations include approach (build/buy/borrow/block) with specifics

## Confidence Tagging

- **High:** Evidence-based current state, clear requirements
- **Medium:** Some assumptions, reasonable estimates
- **Low:** Unclear current state, vague requirements

Apply confidence to gap significance and recommendation viability.
