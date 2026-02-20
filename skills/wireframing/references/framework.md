# Framework: Wireframing

This file provides detailed methodology for creating effective wireframes.

## 1. Screen Prioritization

### Priority Framework

| Priority | Criteria | Examples |
|----------|----------|----------|
| **P0 - Critical** | Core user task, high traffic | Dashboard, Login, Checkout |
| **P1 - Important** | Key support, conversion | Settings, Product page, Form |
| **P2 - Useful** | Secondary features | Profile, Search results, Lists |
| **P3 - Optional** | Edge cases | 404, Empty states, Modals |

### Screen Selection Process

1. List all screens from IA
2. Score each by: Usage + Complexity + Stakeholder + Conversion
3. Prioritize top 5-10 for wireframing
4. Note remaining for later iterations

---

## 2. Fidelity Levels

### Low-Fi (Sketch)

**Characteristics:**
- Rough boxes
- Stick figures
- No detail
- Quick to create

**Tools:**
- Paper sketch
- Whiteboard
- Simple drawing tools

**Best for:**
- Early ideation
- Team brainstorming
- Quick concept validation
- Getting buy-in

### Mid-Fi (Wireframe)

**Characteristics:**
- Structured boxes
- Placeholder text (not lorem ipsum)
- Basic shapes
- Clear layout

**Tools:**
- Figma
- Balsamiq
- Sketch
- Adobe XD

**Best for:**
- Design direction
- Stakeholder review
- User testing
- Developer handoff

### High-Fi (Prototype)

**Characteristics:**
- Near-final layout
- Real content
- Basic styling
- Clickable

**Tools:**
- Figma
- InVision
- Principle

**Best for:**
- Usability testing
- Final approval
- Developer reference

---

## 3. Wireframe Elements

### Common Elements

| Element | Symbol | Description |
|---------|--------|-------------|
| Container | ▭ | Box for content |
| Image placeholder | ⊞ | Image area |
| Text placeholder | ≡ | Text lines |
| Button | ◯ | CTA or action |
| Form input | [ ] | Entry field |
| Navigation | — | Links |
| Header | ▬ | Section header |
| Divider | --- | Separation |

### Content Patterns

**Text:**
- Headlines: One thick line
- Body: Multiple thin lines
- Captions: Short line

**Images:**
- Simple box with X
- Aspect ratio noted
- Placeholder image

**Navigation:**
- Horizontal: Line with dots
- Vertical: Stacked lines

---

## 4. Layout Grids

### 12-Column Grid (Desktop)

```
┌─────────────────────────────────────────┐
│               12 columns                │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│1│2│3│4│5│6│7│8│9│10│11│12│
├─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│        Common groupings:        │
│ 3+3+3+3 (4 items)            │
│ 4+4+4 (3 items)              │
│ 8+4 (2 items)                │
│ 12 (1 item)                  │
└───────────────────────────────┘
```

### Mobile Grid (4-column)

```
┌─────────────┐
│ 1 │ 2 │ 3 │ 4 │
└─────────────┘
  Full width
  or 2+2
```

---

## 5. Responsive Breakpoints

### Standard Breakpoints

| Device | Width | Columns |
|--------|-------|---------|
| Mobile | < 640px | 4 |
| Tablet | 640-1024px | 8 |
| Desktop | > 1024px | 12 |

### Responsive Patterns

**Collapse:**
- Hide low-priority elements
- Stack vertically
- Hamburger menu

**Adapt:**
- Single column → Multiple
- Large → Small images
- Show → Hide

---

## 6. Annotation Standards

### What to Annotate

| Category | Examples |
|----------|----------|
| **Purpose** | "Main heading for page" |
| **Content** | "Product image, 4:3 ratio" |
| **Interaction** | "Opens modal on click" |
| **States** | "Hover: darken 10%" |
| **Behavior** | "Scrolls horizontally on mobile" |
| **Priority** | "Most important element" |

### Annotation Format

```
[Element]
- Purpose: [what it is]
- Content: [what goes here]
- Interaction: [what happens]
- States: [default, hover, etc.]
- Responsive: [how it adapts]
```

---

## 7. Interaction Documentation

### Click Path Format

```
Screen A
  → click [Button] → Screen B
  → click [Link] → Screen C
    ↳ hover [Item] → Shows tooltip
```

### State Documentation

| State | Visual | When |
|-------|--------|------|
| Default | Normal | Normal |
| Hover | Lighter/darker | Mouse over |
| Active | Pressed | Clicking |
| Disabled | Grayed | Unavailable |
| Loading | Spinner | Processing |
| Error | Red border | Invalid |

---

## 8. Common Wireframe Layouts

### Dashboard Layout

```
┌─────────────────────────────────────┐
│ Header: Logo + Nav + User          │
├────────────┬────────────────────────┤
│            │                        │
│  Sidebar   │    Main Content       │
│  - Nav     │    - Stats cards     │
│  - Quick   │    - Main table      │
│    actions │    - Activity         │
│            │                        │
├────────────┴────────────────────────┤
│ Footer: Links + Copyright          │
└─────────────────────────────────────┘
```

### Form Layout

```
┌─────────────────────────────────────┐
│ Header: Title + Progress            │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Label                      │   │
│  │ [Input field]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Label                      │   │
│  │ [Input field]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Primary Button]                   │
│                                     │
└─────────────────────────────────────┘
```

### List/Table Layout

```
┌─────────────────────────────────────┐
│ Header: Title + Search + Filter   │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Item 1 │ Description │ Actions │ │
│ ├─────────────────────────────────┤ │
│ │ Item 2 │ Description │ Actions │ │
│ ├─────────────────────────────────┤ │
│ │ Item 3 │ Description │ Actions │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ Pagination: < 1 2 3 ... >        │
└─────────────────────────────────────┘
```

---

## 9. Integration with Other Skills

### Inputs (Consults)

- **information-architecture:** Site map, content structure
- **user-journey-mapping:** User flows, tasks
- **user-persona-creation:** User needs, contexts

### Outputs (Feeds)

- **heuristic-evaluation:** Wireframes for review
- **design-system:** Component patterns
- **frontend-development:** Layout reference
