# Worked Example: Heuristic Evaluation

This file shows the Heuristic Evaluation skill applied to a complete scenario.

---

## Scenario: TaskFlow - Dashboard Evaluation

**Context:** TaskFlow has created wireframes for their dashboard. They want a heuristic evaluation to identify usability issues before moving to visual design. The evaluation focuses on 5 key screens.

---

## Output: Heuristic Evaluation

# Heuristic Evaluation: TaskFlow Dashboard

## 1. Executive Summary

**Evaluation scope:** 5 screens evaluated
**Total findings:** 12
**Critical/Catastrophic:** 1
**Major:** 3
**Minor:** 5
**Cosmetic:** 3

**Key recommendation:** Address the catastrophic finding (no empty state) immediately - users see an empty dashboard with no guidance. Also prioritize 3 major findings around visibility of system status and error handling. These 4 issues significantly impact user experience.

---

## 2. Evaluation Scope

### Screens Evaluated
| Screen | Priority | Heuristics Applied |
|--------|----------|---------------------|
| Dashboard | P0 | H1-H10 |
| Project View | P0 | H1-H10 |
| Task Detail | P0 | H1-H10 |
| Create Task Modal | P1 | H1-H10 |
| Settings | P1 | H1-H10 |

### Not Evaluated (Deferred)
| Screen | Reason |
|--------|--------|
| Search Results | Lower traffic |
| Team Management | Secondary feature |

### Evaluator Expertise
- [x] Expert (UX professional)
- [ ] Novice (non-UX)

---

## 3. Findings by Heuristic

### H1: Visibility of System Status

**Finding 1 - Empty State Issue**
- **Severity:** 4 (Catastrophic)
- **Screen:** Dashboard
- **Component:** Project list
- **Description:** When user has no projects, dashboard shows completely blank area with no indication of what to do or how to create first project.
- **Scenario:** New user logs in for first time
- **Impact:** User doesn't know how to get started, may abandon
- **Recommendation:** Add empty state with: (1) Clear message "No projects yet", (2) Prominent "Create Project" button, (3) Brief getting started tips

**Finding 2 - Loading States**
- **Severity:** 2 (Minor)
- **Screen:** Project View
- **Component:** Task list
- **Description:** No loading indicator when switching between projects
- **Scenario:** User clicks on different project
- **Impact:** Brief confusion about whether content loaded
- **Recommendation:** Add skeleton loader or spinner during project switch

---

### H2: Match Between System and Real World

**Finding 3 - Ambiguous Labels**
- **Severity:** 2 (Minor)
- **Screen:** Settings
- **Component:** Navigation
- **Description:** "Workspace" used interchangeably with "Project" causing confusion
- **Scenario:** User trying to understand hierarchy
- **Impact:** Terminology confusion
- **Recommendation:** Standardize on "Project" as primary term; clarify "Workspace" = collection of projects

---

### H3: User Control and Freedom

**Finding 4 - No Undo**
- **Severity:** 3 (Major)
- **Screen:** Task Detail
- **Component:** Delete button
- **Description:** Delete task has no confirmation and no undo option
- **Scenario:** User accidentally clicks delete
- **Impact:** Permanent data loss, high user frustration
- **Recommendation:** Add confirmation dialog before delete; implement soft delete with 30-day recovery

---

### H4: Consistency and Standards

**Finding 5 - Button Inconsistency**
- **Severity:** 1 (Cosmetic)
- **Screen:** Multiple
- **Component:** Action buttons
- **Description:** Some buttons use filled style, others use outline style inconsistently
- **Scenario:** Throughout the interface
- **Impact:** Minor visual inconsistency
- **Recommendation:** Establish button style guide: Primary = filled, Secondary = outline

---

### H5: Error Prevention

**Finding 6 - No Input Validation**
- **Severity:** 3 (Major)
- **Screen:** Create Task Modal
- **Component:** Task name field
- **Description:** No validation on task name - allows empty submissions and very long names
- **Scenario:** User submits form without task name
- **Impact:** Invalid data, error message after submission
- **Recommendation:** Add inline validation: (1) Required field indicator, (2) Character limit, (3) Prevent submit if invalid

**Finding 7 - Dangerous Action No Confirmation**
- **Severity:** 3 (Major)
- **Screen:** Settings
- **Component:** Delete account
- **Description:** No confirmation before deleting account
- **Scenario:** User clicks delete account
- **Impact:** Accidental deletion, no recovery
- **Recommendation:** Add multi-step confirmation: (1) "Are you sure?", (2) "Type DELETE to confirm"

---

### H6: Recognition Rather Than Recall

**Finding 8 - Hidden Actions**
- **Severity:** 2 (Minor)
- **Screen:** Project View
- **Component:** Task menu
- **Description:** Task actions (archive, duplicate, delete) hidden in kebab menu, not visible
- **Scenario:** User trying to archive completed tasks
- **Impact:** Users don't discover useful actions
- **Recommendation:** Show common actions (archive, complete) as visible buttons; keep less common in menu

---

### H7: Flexibility and Efficiency of Use

**Finding 9 - No Keyboard Shortcuts**
- **Severity:** 1 (Cosmetic)
- **Screen:** Task Detail
- **Component:** Global
- **Description:** No keyboard shortcuts for power users
- **Scenario:** Power user wants to navigate quickly
- **Impact:** Minor inefficiency for power users
- **Recommendation:** Add shortcuts: (1) Cmd+N = New task, (2) Cmd+/ = Search, (3) J/K = Navigate tasks

---

### H8: Aesthetic and Minimalist Design

**Finding 10 - Cluttered Header**
- **Severity:** 1 (Cosmetic)
- **Screen:** Dashboard
- **Component:** Header
- **Description:** Too many items in header competing for attention
- **Scenario:** User looking at dashboard
- **Impact:** Visual overwhelm, harder to find primary action
- **Recommendation:** Move secondary actions (notifications, help) to condensed menu; emphasize primary "New Task" CTA

---

### H9: Help Users Recognize, Diagnose, Recover from Errors

**Finding 11 - Generic Error Message**
- **Severity:** 2 (Minor)
- **Screen:** Create Task Modal
- **Component:** Form submission
- **Description:** "An error occurred" message with no specifics
- **Scenario:** Network fails during task creation
- **Impact:** User doesn't know what happened or how to recover
- **Recommendation:** Specific error: "Couldn't save task. Check your connection and try again."

---

### H10: Help and Documentation

**Finding 12 - No Contextual Help**
- **Severity:** 1 (Cosmetic)
- **Screen:** Settings
- **Component:** Advanced options
- **Description:** Advanced settings have no explanation
- **Scenario:** User sees unfamiliar setting
- **Impact:** Confusion about what setting does
- **Recommendation:** Add tooltip/help icon next to advanced settings with brief explanation

---

## 4. Severity Summary

### Distribution
| Severity | Count | % |
|----------|-------|---|
| 4 - Catastrophic | 1 | 8% |
| 3 - Major | 3 | 25% |
| 2 - Minor | 5 | 42% |
| 1 - Cosmetic | 3 | 25% |

### Critical Issues Requiring Immediate Attention
| Finding | Severity | Screen |
|---------|-----------|--------|
| Empty state issue | 4 | Dashboard |
| No undo on delete | 3 | Task Detail |
| No input validation | 3 | Create Task |
| No delete confirmation | 3 | Settings |

---

## 5. Recommendations

### Quick Wins (High Severity, Low Effort)

| Finding | Recommendation | Effort |
|---------|---------------|--------|
| Empty state | Add empty state with CTA | Low |
| Button inconsistency | Standardize button styles | Low |
| Generic error | Add specific error message | Low |

### Strategic Fixes (High Severity, High Effort)

| Finding | Recommendation | Effort |
|---------|---------------|--------|
| No undo/delete | Add confirmation + soft delete | Medium |
| No input validation | Implement form validation | Medium |
| No account confirmation | Multi-step delete flow | Medium |

### Fill-ins (Low Severity, Low Effort)

| Finding | Recommendation | Effort |
|---------|---------------|--------|
| Hidden actions | Make common actions visible | Low |
| Loading states | Add skeleton loaders | Low |
| Keyboard shortcuts | Add Cmd+N, Cmd+/ | Low |

### Deprioritized (Low Severity, High Effort)

| Finding | Reason |
|---------|---------|
| No keyboard shortcuts for all | Too extensive for MVP |
| Help documentation | Nice to have, not critical |

---

## 6. Priority Matrix

```
                    EFFORT
              Low         High
            ┌─────────┬─────────┐
      High  │ QUICK   │ STRATEGIC│
            │  WINS   │  FIXES   │
            │ (3)     │   (2)    │
Severity    ├─────────┼─────────┤
      Low   │ FILL-INS│DEPRIORITIZE│
            │   (3)   │    (0)    │
            └─────────┴─────────┘

Quick Wins:
- Empty state
- Button consistency
- Error messages

Strategic:
- Undo/delete
- Input validation
- Account confirmation
```

---

**End of Worked Example**
