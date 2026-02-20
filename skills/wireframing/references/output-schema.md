# Output Schema: Wireframing

This file defines the exact structure of the Wireframing skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **information-architecture:** `context.ia.sitemap`, `context.ia.navigation`
- **user-journey-mapping:** `context.flows`, `context.tasks`

### Produces

This skill produces:
- `context.wireframes[].screen` — Screen name and purpose
- `context.wireframes[].priority` — P0/P1/P2/P3
- `context.wireframes[].layout` — Visual structure
- `context.wireframes[].annotations` — Element details
- `context.interactions` — Click paths and states

---

## Output Structure

```
# Wireframes: [Product Name]

## 1. Executive Summary (required)

- Total screens: [X]
- Priority P0: [X]
- Priority P1: [X]
- Fidelity level: [Low/Mid/High]
- Primary recommendation: [2-3 sentences]

## 2. Screen Prioritization (required)

### Prioritization Matrix

| Screen | Priority | Justification | Wireframe |
|--------|----------|--------------|-----------|
| [Screen 1] | P0 | Core task | Yes |
| [Screen 2] | P0 | Core task | Yes |
| [Screen 3] | P1 | High usage | Yes |
| [Screen 4] | P2 | Support | No (skip) |
| [Screen 5] | P3 | Edge case | No (skip) |

### Not Wireframed (Deferred)
| Screen | Priority | Reason |
|--------|----------|--------|
| [Screen] | P2 | Lower priority |

## 3. Wireframes (required)

### Screen: [Screen Name]

**Priority:** P0
**Purpose:** [What this screen does]
**Fidelity:** [Low/Mid/High]

**Layout Structure:**
```
[Visual wireframe layout - ASCII or description]

Header: [Elements]
Content: [Elements]
Footer: [Elements]
```

**Key Elements:**

| Element | Purpose | Content | Notes |
|---------|---------|---------|-------|
| [Element 1] | [Purpose] | [Type] | [Notes] |

**Interactions:**

| Element | Interaction | Result |
|---------|-------------|--------|
| [Element] | Click | [Navigate to/Show] |
| [Element] | Hover | [State change] |

**States:**
- [ ] Default
- [ ] Hover
- [ ] Active
- [ ] [Other states]

**Responsive Behavior:**
- Mobile: [How it adapts]
- Tablet: [How it adapts]

[Repeat for each wireframed screen]

## 4. Interactions (required)

### Click Paths

```
[Screen A]
  → click [Element] → [Screen B]
  → click [Element] → [Screen C]

[Screen B]
  → click [Back] → [Screen A]
  → click [Submit] → [Screen D]
    ↳ success → [Screen E]
    ↳ error → [Show error]
```

### State Specifications

| State | Visual | Trigger |
|-------|--------|---------|
| Default | [Normal] | Normal |
| Hover | [Change] | Mouse over |
| Active | [Change] | Clicking |
| Disabled | [Grayed] | Unavailable |
| Loading | [Spinner] | Processing |
| Error | [Red border] | Invalid |

## 5. Responsive Behavior (required)

### Breakpoint Summary

| Breakpoint | Width | Screen Adaptations |
|------------|-------|-------------------|
| Mobile | < 640px | [Adaptations] |
| Tablet | 640-1024px | [Adaptations] |
| Desktop | > 1024px | Full layout |

### Screen-by-Screen

| Screen | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| [Screen 1] | Stack | 2-col | Full |
| [Screen 2] | Hide sidebar | Collapse | Full |

## 6. Annotations (required)

### Annotation Summary

| Screen | Element | Annotation |
|--------|---------|------------|
| [Screen 1] | Header | Logo links to home |
| [Screen 1] | Nav | Active state = highlighted |
| [Screen 2] | Form | Required fields marked * |

---

## Validation Rules

1. Screen priorities defined (P0/P1/P2/P3)
2. Fidelity appropriate for purpose
3. P0 and P1 screens wireframed
4. Layout structure clear (header, content, footer)
5. Interactions documented (click paths)
6. States shown (default, hover, etc.)
7. Responsive behavior noted
8. Annotations included for each screen

## Confidence Tagging

- **High:** Based on IA and user flows
- **Medium:** Some assumptions, needs validation
- **Low:** No IA/flows, needs input

Apply confidence to screen prioritization and layout decisions.
