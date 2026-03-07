# Notion Workspace Generation Prompt

This prompt generates a structured Notion workspace from requirements elicitation output.

**When to use:** After requirements-elicitation skill completes with full requirements data.

**Input:** Requirements document data (user stories, acceptance criteria, non-functional requirements, dependencies).

**Output:** A Notion workspace specification with databases for tracking requirements through development.

---

## Data Mapping

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` |
| `generated_date` | Runtime | Current date |
| `product_name` | Input | Product name from user idea |
| `project_scope` | Requirements | Scope definition |
| `functional_requirements` | Requirements | All user stories with acceptance criteria |
| `non_functional` | Requirements | NFR section |
| `dependencies` | Requirements | Dependencies list |
| `assumptions` | Requirements | Assumptions list |
| `open_questions` | Requirements | Unresolved questions |

---

## Prompt

> **Instruction to AI:** Generate a Notion workspace specification from requirements data. Replace `{{variables}}` with actual data.

---

### 0. Start Here (Page)

**Purpose callout:**
> This workspace was generated from Requirements Elicitation (v{{template_version}}) on {{generated_date}}.
> Product: **{{product_name}}**

**Quick Links:**
- → Requirements Database
- → User Stories Board
- → Acceptance Criteria Tracker
- → Dependencies Map
- → Open Questions

---

### 1. Requirements Database

**Database Name:** Requirements Tracker

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Requirement | Title | — |
| Type | Select | Functional, Non-Functional |
| Category | Select | Authentication, Data, UI/UX, API, Security, Performance, Other |
| Priority | Select | Must Have, Should Have, Could Have, Won't Have |
| Status | Select | Draft, Review, Approved, In Development, Complete |
| User Story | Text | — |
| Owner | Text | — |
| Sprint | Select | Sprint 1, Sprint 2, Sprint 3, Backlog |

**Pre-populate:** One row per requirement from `functional_requirements` and `non_functional`.

**Views:**
1. **"Sprint 1 Ready"** — Filter: Status = Approved AND Sprint = Sprint 1
2. **"By Priority"** — Group by: Priority
3. **"By Type"** — Group by: Type
4. **"Kanban"** — Board view, group by Status

---

### 2. User Stories Board (Page)

**Database Name:** User Stories

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Story | Title | — |
| As a / I want to / So that | Text | — |
| Priority | Select | Must Have, Should Have, Could Have |
| Status | Select | Backlog, In Progress, Done |
| Sprint | Select | Sprint 1, Sprint 2, Sprint 3 |
| Dependencies | Relation | → Requirements Database |
| Acceptance Criteria | Text | — |

**Pre-populate:** One row per user story from `functional_requirements`.

**Views:**
1. **"Sprint View"** — Group by: Sprint
2. **"Priority Board"** — Board view, group by Priority

---

### 3. Acceptance Criteria Tracker (Page)

**Database Name:** Acceptance Criteria

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Criteria | Title | — |
| Given / When / Then | Text | — |
| Test Status | Select | Not Tested, Pass, Fail, Blocked |
| Related Story | Relation | → User Stories |
| Tested By | Text | — |
| Test Date | Date | — |
| Notes | Text | — |

**Pre-populate:** From all acceptance criteria in `functional_requirements`.

**Views:**
1. **"Untested"** — Filter: Test Status = Not Tested
2. **"Failed"** — Filter: Test Status = Fail

---

### 4. Dependencies Map (Page)

**Database Name:** Dependencies

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Dependency | Title | — |
| Type | Select | External API, Internal Feature, Infrastructure, Third-Party |
| Status | Select | Blocked, In Progress, Ready, Not Needed |
| Risk | Select | High, Medium, Low |
| Owner | Text | — |
| Notes | Text | — |

**Pre-populate:** From `dependencies` list.

**Views:**
1. **"Blocking"** — Filter: Status = Blocked
2. **"High Risk"** — Filter: Risk = High

---

### 5. Open Questions (Page)

**Database Name:** Open Questions

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Question | Title | — |
| Category | Select | Scope, Technical, Business, UX, Security |
| Priority | Select | Blocker, Important, Nice to Know |
| Answer | Text | — |
| Asked By | Text | — |
| Answered Date | Date | — |

**Pre-populate:** From `open_questions`.

**Views:**
1. **"Blockers"** — Filter: Priority = Blocker

---

### 6. Non-Functional Requirements (Page)

**Database Name:** NFRs

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Requirement | Title | — |
| Type | Select | Performance, Security, Scalability, Reliability, Usability, Maintainability |
| Target | Text | — |
| Status | Select | Not Started, In Progress, Met |
| Notes | Text | — |

**Pre-populate:** From `non_functional` requirements.

---

### 7. Progress Dashboard (Page)

**Metrics:**
- Total Requirements: {{count of functional_requirements + non_functional}}
- Approved: {{count where status = Approved}}
- In Development: {{count where status = In Development}}
- User Stories: {{count of user stories}}
- Open Questions: {{count of open_questions}}

---

## Output Checklist

- [ ] Requirements Database with all requirements
- [ ] User Stories Board with all stories
- [ ] Acceptance Criteria Tracker
- [ ] Dependencies Map
- [ ] Open Questions database
- [ ] NFRs database
- [ ] Progress Dashboard with metrics
- [ ] All views configured as specified
