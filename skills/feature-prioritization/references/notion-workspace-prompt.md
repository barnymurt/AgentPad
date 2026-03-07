# Notion Workspace Generation Prompt

This prompt generates a structured Notion workspace from feature prioritization output.

**When to use:** After feature-prioritization skill completes with ranked feature list.

**Input:** Prioritized features with scores, effort estimates, quadrants, dependencies.

**Output:** A Notion workspace for managing feature backlog and sprint planning.

---

## Data Mapping

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` |
| `generated_date` | Runtime | Current date |
| `product_name` | Input | Product name |
| `features` | Output | Prioritized feature list |
| `quadrants` | Output | Feature quadrants (Quick Win, Big Bet, etc.) |
| `dependencies` | Output | Feature dependencies |
| `mvp_scope` | Output | MVP feature selection |

---

## Prompt

> **Instruction to AI:** Generate a Notion workspace specification from feature prioritization data.

---

### 0. Start Here (Page)

**Purpose callout:**
> This workspace was generated from Feature Prioritization (v{{template_version}}) on {{generated_date}}.
> Product: **{{product_name}}**

**Prioritization Summary:**
- Total Features: {{count of features}}
- MVP Features: {{count of mvp_scope}}
- Quick Wins: {{count where quadrant = Quick Win}}
- Big Bets: {{count where quadrant = Big Bet}}

**Quick Links:**
- → Feature Backlog
- → MVP Roadmap
- → Sprint Planning
- → Dependency Map

---

### 1. Feature Backlog (Database)

**Database Name:** Features

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Feature | Title | — |
| Description | Text | — |
| Priority Score | Number | — |
| Effort | Select | XS, S, M, L, XL |
| Quadrant | Select | Quick Win, Big Bet, Fill-in, Time Sink |
| Status | Select | Backlog, Planned, In Progress, Done |
| Sprint | Select | Sprint 1, Sprint 2, Sprint 3, Backlog |
| Category | Select | Core, Enhancement, Bug, Technical |
| Value | Select | High, Medium, Low |
| Dependencies | Relation | → Features |
| RICE Score | Number | — |

**Pre-populate:** One row per feature from `features`.

**Views:**
1. **"By Priority"** — Sort by: Priority Score descending
2. **"Sprint 1"** — Filter: Sprint = Sprint 1
3. **"Kanban"** — Board view, group by Status
4. **"By Quadrant"** — Group by: Quadrant

---

### 2. MVP Roadmap (Page)

**Database Name:** MVP Features

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Feature | Relation | → Features |
| Sprint | Select | Sprint 1, Sprint 2, Sprint 3 |
| Rationale | Text | — |
| Success Metric | Text | — |
| Status | Select | Not Started, In Progress, Complete |

**Pre-populate:** From `mvp_scope`.

**Views:**
1. **"Sprint Timeline"** — Timeline view by Sprint

---

### 3. Sprint Planning (Page)

**Database Name:** Sprint Plan

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Item | Title | — |
| Feature | Relation | → Features |
| Sprint | Select | Sprint 1, Sprint 2, Sprint 3 |
| Story Points | Number | — |
| Assignee | Text | — |
| Status | Select | Todo, In Progress, Blocked, Done |

**Views:**
1. **"Sprint 1"** — Filter: Sprint = Sprint 1
2. **"Story Points Total"** — Calculate sum

---

### 4. Dependency Map (Page)

**Database Name:** Dependencies

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| From Feature | Relation | → Features |
| To Feature | Relation | → Features |
| Type | Select | Blocks, Requires, Related |
| Status | Select | Blocked, Clear, In Progress |

**Pre-populate:** From `dependencies`.

**Views:**
1. **"Blocking"** — Filter: Status = Blocked

---

### 5. Impact vs Effort Matrix (Page)

**2x2 Matrix:**

| | Low Effort | High Effort |
|---|-----------|------------|
| **High Value** | Quick Win | Big Bet |
| **Low Value** | Fill-in | Time Sink |

**Features in each quadrant:**

**Quick Win (High Value, Low Effort):**
- {{features where quadrant = Quick Win}}

**Big Bet (High Value, High Effort):**
- {{features where quadrant = Big Bet}}

**Fill-in (Low Value, Low Effort):**
- {{features where quadrant = Fill-in}}

**Time Sink (Low Value, High Effort):**
- {{features where quadrant = Time Sink}}

---

### 6. RICE Scoring (Page)

**Database Name:** RICE Scores

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Feature | Relation | → Features |
| Reach | Number | — |
| Impact | Select | Massive (3), High (2), Medium (1), Low (0.5) |
| Confidence | Select | High (100%), Medium (80%), Low (50%) |
| Effort | Number | — |
| RICE Score | Formula | (Reach × Impact × Confidence) / Effort |

---

### 7. Feature Categories (Page)

**Table:**

| Category | Features | Total Points | Status |
|----------|----------|---------------|--------|
| Core | {{count}} | {{sum points}} | |
| Enhancement | {{count}} | {{sum points}} | |
| Technical | {{count}} | {{sum points}} | |
| Bug | {{count}} | {{sum points}} | |

---

### 8. Weekly Planning Checklist (Page)

- [ ] Review Sprint backlog
- [ ] Confirm assignee for each item
- [ ] Check dependencies are unblocked
- [ ] Estimate remaining story points
- [ ] Identify blockers

---

### 9. Release Tracker (Page)

**Database Name:** Releases

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Release | Title | — |
| Target Date | Date | — |
| Features | Relation | → Features (multi) |
| Status | Select | Planning, In Progress, Released |
| Notes | Text | — |

---

## Output Checklist

- [ ] Feature Backlog database with all features
- [ ] MVP Roadmap database
- [ ] Sprint Planning database
- [ ] Dependency Map
- [ ] Impact vs Effort Matrix
- [ ] RICE Scoring database
- [ ] Feature Categories table
- [ ] Weekly Planning Checklist
- [ ] Release Tracker database
- [ ] All views configured
