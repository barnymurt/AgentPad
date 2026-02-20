# Worked Example: Wireframing

This file shows the Wireframing skill applied to a complete scenario.

---

## Scenario: TaskFlow - Project Management Dashboard

**Context:** TaskFlow needs wireframes for their core dashboard. The team has an IA document and knows the main user flows. They want to communicate layout direction to stakeholders and prepare for design.

---

## Output: Wireframes

# Wireframes: TaskFlow Dashboard

## 1. Executive Summary

**Total screens:** 8 identified
**Priority P0:** 3 (Dashboard, Project View, Task Detail)
**Priority P1:** 3 (Create Task, Settings, Team)
**Priority P2:** 2 (Search Results, Notifications)
**Fidelity level:** Mid-fi (wireframe)
**Primary recommendation:** Focus wireframes on P0 screens (Dashboard, Project View, Task Detail) to establish core layout patterns. These three screens cover 80% of user interactions.

---

## 2. Screen Prioritization

### Prioritization Matrix

| Screen | Priority | Justification | Wireframe |
|--------|----------|--------------|-----------|
| Dashboard | P0 | Core entry, high traffic | Yes |
| Project View | P0 | Main workspace | Yes |
| Task Detail | P0 | Core action | Yes |
| Create Task | P1 | Frequent action | Yes |
| Settings | P1 | Configuration | Yes |
| Team | P1 | Management | Yes |
| Search Results | P2 | Support feature | No |
| Notifications | P2 | Low frequency | No |

### Not Wireframed (Deferred)
| Screen | Priority | Reason |
|--------|----------|--------|
| Search Results | P2 | Lower priority |
| Notifications | P2 | Lower priority |

---

## 3. Wireframes

### Screen: Dashboard (P0)

**Priority:** P0
**Purpose:** Main entry point showing overview of projects and tasks
**Fidelity:** Mid-fi

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ [Header: Logo] [Search] [+ New] [User Avatar]     │
├────────────┬────────────────────────────────────────┤
│            │  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│ [Sidebar]  │  │ Active  │ │ Due     │ │ Complete│  │
│            │  │ Projects│ │ Today   │ │ This   │  │
│ - Dashboard│  │    3    │ │    5    │ │   Week  │  │
│ - Projects │  └─────────┘ └─────────┘ └─────────┘  │
│ - My Tasks │  ┌─────────────────────────────────┐  │
│ - Team     │  │ Recent Projects                 │  │
│ - Settings │  │ ├─ Project A ──── 3 tasks    │  │
│            │  │ ├─ Project B ──── 5 tasks    │  │
│            │  │ └─ Project C ──── 2 tasks    │  │
│            │  └─────────────────────────────────┘  │
│            │  ┌─────────────────────────────────┐  │
│            │  │ Upcoming Tasks                 │  │
│            │  │ ├─ Task X ── Due Tomorrow    │  │
│            │  │ └─ Task Y ── Due Friday      │  │
│            │  └─────────────────────────────────┘  │
└────────────┴────────────────────────────────────────┘
```

**Key Elements:**

| Element | Purpose | Content | Notes |
|---------|--------|---------|-------|
| Stats cards | Show metrics | Numbers + labels | Quick overview |
| Project list | Recent projects | Name + task count | Click → Project |
| Task list | Upcoming tasks | Name + due date | Click → Task |

**Interactions:**

| Element | Interaction | Result |
|---------|-------------|--------|
| Logo | Click | Dashboard (refresh) |
| Search | Click | Open search modal |
| + New | Click | Dropdown: New Project / New Task |
| Project item | Click | Navigate to Project View |
| Task item | Click | Navigate to Task Detail |

**States:**
- [x] Default
- [x] Hover (project/task rows highlight)
- [x] Active (current page in sidebar)
- [ ] Loading (skeleton)

**Responsive Behavior:**
- Mobile: Sidebar collapses to hamburger, single column
- Tablet: Sidebar icon-only, 2-column grid
- Desktop: Full sidebar, 3-column grid

---

### Screen: Project View (P0)

**Priority:** P0
**Purpose:** Main workspace for managing a project and its tasks
**Fidelity:** Mid-fi

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ [Breadcrumb: Projects > Project A] [Filter] [View] │
├────────────┬────────────────────────────────────────┤
│            │  ┌─────────────────────────────────┐  │
│ [Project   │  │ Task List / Board               │  │
│  Sidebar]  │  │                                 │  │
│            │  │ ┌─────┐ ┌─────┐ ┌─────┐        │  │
│ - Overview │  │ │To Do│ │In   │ │Done │        │  │
│ - Tasks    │  │ │     │ │Prog │ │     │        │  │
│ - Files    │  │ │Task1│ │Task3│ │Task5│        │  │
│ - Team     │  │ │Task2│ │Task4│ │     │        │  │
│ - Settings │  │ └─────┘ └─────┘ └─────┘        │  │
│            │  │                                 │  │
│            │  └─────────────────────────────────┘  │
│            │                                        │
└────────────┴────────────────────────────────────────┘
```

**Key Elements:**

| Element | Purpose | Content | Notes |
|---------|--------|---------|-------|
| Board view | Show tasks by status | Kanban columns | Drag between |
| Column | Group tasks | Status-based | Customizable |
| Task card | Individual task | Title + assignee + due | Click → Detail |

**Interactions:**

| Element | Interaction | Result |
|---------|-------------|--------|
| Column header | Click | Collapse/expand |
| Task card | Click | Open Task Detail |
| Task card | Drag | Move between columns |
| + Add task | Click | Open Create Task |

**States:**
- [x] Default
- [x] Hover (card lifts)
- [x] Dragging (card opacity 50%)
- [x] Empty column

---

### Screen: Task Detail (P0)

**Priority:** P0
**Purpose:** View and edit task details
**Fidelity:** Mid-fi

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ [← Back] Task: [Task Title]          [Delete]    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Status: [In Progress ▼]     Due: [Date Picker]  │
│  Assignee: [Avatar + Name]   Priority: [▼]        │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Description                                   │   │
│  │                                              │   │
│  │ [Rich text content area]                     │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Subtasks                          [+ Add]    │   │
│  │ □ Subtask 1                                  │   │
│  │ ☑ Subtask 2                                  │   │
│  │ □ Subtask 3                                  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Activity                          [Collapse]  │   │
│  │ • User A changed status → Done               │   │
│  │ • User B commented                           │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│                        [Cancel]  [Save Changes]    │
└─────────────────────────────────────────────────────┘
```

**Interactions:**

| Element | Interaction | Result |
|---------|-------------|--------|
| Back arrow | Click | Return to Project |
| Status dropdown | Click | Open options |
| Description | Click | Edit mode |
| Subtask checkbox | Click | Toggle complete |
| Save button | Click | Save and show success |

**States:**
- [x] Default
- [x] Editing (description in edit mode)
- [x] Hover
- [x] Saving (button disabled + spinner)

---

## 4. Interactions

### Click Paths

```
Dashboard
  → click project → Project View
    → click task → Task Detail
    → drag task → Move between columns
    → click back → Dashboard
  → click + New → Create Task Modal
    → submit → Project View (updated)
  → click sidebar item → Respective screen
```

### State Specifications

| State | Visual | Trigger |
|-------|--------|---------|
| Default | Normal appearance | Normal |
| Hover | Background #f5f5f5, cursor pointer | Mouse over |
| Active | Background #e0e0e0 | Clicking |
| Disabled | Opacity 50%, cursor not-allowed | No permission |
| Loading | Skeleton pulse animation | Loading data |
| Dragging | Opacity 50%, scale 1.02 | Dragging |

---

## 5. Responsive Behavior

### Breakpoint Summary

| Breakpoint | Width | Screen Adaptations |
|------------|-------|-------------------|
| Mobile | < 640px | Single column, hamburger menu, stacked cards |
| Tablet | 640-1024px | Collapsed sidebar, 2-column grid |
| Desktop | > 1024px | Full sidebar, 3-column grid |

### Screen-by-Screen

| Screen | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Dashboard | Stats stacked, single project | Stats in row, 2 projects | Stats in row, 3+ projects |
| Project View | Single column board, swipe columns | 2 visible columns | 3+ visible columns |
| Task Detail | Full screen modal | Full screen | Split view option |

---

## 6. Annotations

### Annotation Summary

| Screen | Element | Annotation |
|--------|---------|------------|
| Dashboard | Stats cards | Click opens respective filtered view |
| Dashboard | Project list | Shows last 5, click "View all" for more |
| Project View | Board | Drag-and-drop between columns |
| Project View | + Add | Opens inline, not modal |
| Task Detail | Description | Rich text (bold, italic, lists) |
| Task Detail | Activity | Chronological, newest first |
| All | Search | Cmd/Ctrl + K keyboard shortcut |
| All | User avatar | Dropdown: Profile, Settings, Logout |

---

**End of Worked Example**
