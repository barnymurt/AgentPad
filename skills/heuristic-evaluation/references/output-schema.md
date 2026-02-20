# Output Schema: Heuristic Evaluation

This file defines the exact structure of the Heuristic Evaluation skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **wireframing:** `context.wireframes[].screen`, `context.wireframes[].layout`
- **user-journey-mapping:** `context.flows`

### Produces

This skill produces:
- `context.findings[]` — Issues found with severity ratings
- `context.summary` — Overview of evaluation
- `context.recommendations[]` — Prioritized fixes

---

## Output Structure

```
# Heuristic Evaluation: [Product/Feature Name]

## 1. Executive Summary (required)

- Evaluation scope: [X] screens evaluated
- Total findings: [X]
- Critical/Catastrophic: [X]
- Major: [X]
- Minor: [X]
- Cosmetic: [X]
- Key recommendation: [2-3 sentences]

## 2. Evaluation Scope (required)

### Screens Evaluated
| Screen | Priority | Heuristics Applied |
|--------|----------|---------------------|
| [Screen 1] | P0 | H1-H10 |
| [Screen 2] | P0 | H1-H10 |

### Not Evaluated (Deferred)
| Screen | Reason |
|--------|--------|
| [Screen] | Lower priority |

### Evaluator Expertise
- [ ] Expert (UX professional)
- [ ] Novice (non-UX)

## 3. Findings by Heuristic (required)

### H1: Visibility of System Status

**Finding 1**
- **Severity:** [0-4]
- **Screen:** [Location]
- **Description:** [What the problem is]
- **Scenario:** [When encountered]
- **Impact:** [User impact]
- **Recommendation:** [Specific fix]

[Repeat for each finding]

### H2: Match Between System and Real World
[Same structure]

[Continue H3-H10]

## 4. Severity Summary (required)

### Distribution
| Severity | Count | % |
|----------|-------|---|
| 4 - Catastrophic | X | X% |
| 3 - Major | X | X% |
| 2 - Minor | X | X% |
| 1 - Cosmetic | X | X% |
| 0 - Not a problem | X | X% |

### Critical Issues Requiring Immediate Attention
| Finding | Severity | Screen |
|---------|-----------|--------|
| [Issue] | 4 | [Screen] |

## 5. Recommendations (required)

### Quick Wins (High Severity, Low Effort)

| Finding | Recommendation | Effort |
|---------|---------------|--------|
| [Issue] | [Fix] | Low |

### Strategic Fixes (High Severity, High Effort)

| Finding | Recommendation | Effort |
|---------|---------------|--------|
| [Issue] | [Fix] | High |

### Fill-ins (Low Severity, Low Effort)

| Finding | Recommendation | Effort |
|---------|---------------|--------|
| [Issue] | [Fix] | Low |

### Deprioritized (Low Severity, High Effort)

| Finding | Reason |
|---------|---------|
| [Issue] | [Why skip] |

## 6. Priority Matrix Visualization

```
                    EFFORT
              Low         High
            ┌─────────┬─────────┐
      High  │ QUICK   │ STRATEGIC│
            │  WINS   │  FIXES   │
Severity    ├─────────┼─────────┤
      Low   │ FILL-INS│DEPRIORITIZE│
            │         │           │
            └─────────┴─────────┘
```

## 7. Findings Detail (required)

### Finding #[N]

**Heuristic:** H#[#] - [Name]
**Severity:** [0-4]
**Screen:** [Location]
**Component:** [Element]

**Description:**
[Specific, observable problem]

**Scenario:**
[When does user encounter this?]

**Impact:**
[How does this affect user?]

**Recommendation:**
[Specific, actionable fix]

[Repeat for all findings]

---

## Validation Rules

1. Scope defined (5-10 key screens)
2. Severity calibrated (0-4 scale with justification)
3. All 10 heuristics evaluated
4. Each finding has severity rating
5. Findings include location and scenario
6. Each finding has actionable recommendation
7. Recommendations prioritized
8. Quick wins identified
9. Evaluator expertise noted

## Confidence Tagging

- **High:** Expert evaluator, clear findings
- **Medium:** Some assumptions, novice evaluator
- **Low:** Vague findings, limited context

Apply confidence to severity ratings and recommendations.
