---
name: wireframing
description: Create low-fidelity layouts focusing on structure, layout, and user flow. Use when the user needs to visualize screen layouts, communicate design direction, or create clickable prototypes. Use when the user says "sketch out this screen," "what would this look like," "create a wireframe," "design the layout," or "show me the flow." Works for websites, web apps, and mobile apps.
---

# Wireframing

Create low-fidelity layouts that focus on structure, layout, and user flow rather than visual design. Unlike raw LLM output that produces generic layouts, this skill systematically identifies key screens, creates appropriate fidelity wireframes, annotates important elements, and documents interactions. The skill adapts fidelity based on purpose and scope.

**Note**: This skill requires IA or user flows as input. See Step 1.

## Core Workflow

### Step 1: Prioritize Screens

Not every screen needs a wireframe. Prioritize:

**Screen Priority Matrix:**

| Priority | Type | When to Wireframe |
|----------|------|-------------------|
| **P0 - Critical** | Core user tasks | Always - must have |
| **P1 - Important** | Key supporting screens | Usually - should have |
| **P2 - Useful** | Secondary screens | Sometimes - nice to have |
| **P3 - Optional** | Edge cases | Rarely - only if complex |

**Screen Selection Criteria:**
- High traffic/usage screens
- Complex interaction screens
- Key conversion points
- Screens with multiple stakeholders

**If too many screens:**
- Focus on P0 and P1
- Group similar screens
- Note remaining screens for later

### Step 2: Determine Fidelity

**Fidelity Levels:**

| Level | Detail | Use When |
|-------|--------|----------|
| **Low-fi (Sketch)** | Rough boxes, stick figures | Early ideation, quick concepts |
| **Mid-fi (Wireframe)** | Structured boxes, placeholder text | Design direction, stakeholder buy-in |
| **High-fi (Prototype)** | Near-final layout, real content | Usability testing, final approval |

**Choose fidelity based on:**
- **Purpose:** Exploration (low) → Validation (mid) → Testing (high)
- **Audience:** Internal (low) → Stakeholders (mid) → Users (high)
- **Timeline:** Quick (low) → Thorough (mid)
- **Complexity:** Simple (low) → Complex (mid/high)

**Start low, go higher only if needed.**

### Step 3: Structure the Layout

**Layout Components:**

1. **Header/Navigation**
   - Global nav
   - Branding
   - Utility nav (search, account)

2. **Content Area**
   - Main content
   - Sidebar (if applicable)
   - Secondary info

3. **Footer**
   - Secondary nav
   - Legal/links
   - Social

**Grid Systems:**
- 12-column for web
- 4-column for mobile
- Consistent spacing (8px baseline)

### Step 4: Create Wireframe Elements

**Basic Elements:**

| Element | Symbol | Use For |
|---------|--------|---------|
| Container | ▭ | Boxes, cards |
| Image | ⊞ | Placeholder for images |
| Text | ≡ | Lines for text |
| Button | ◯ or □ | CTAs, actions |
| Input | [ ] | Form fields |
| Navigation | — | Links, tabs |
| Header | ▬ | Section headers |

**Annotations:**
- Label purpose
- Note interactions
- Mark states (hover, active)
- Indicate responsive behavior

### Step 5: Add Interactions

**Document click paths:**

```
[Home] → click "Features" → [Features Page]
                ↓
           click "Get Started" → [Signup Flow]
```

**States to show:**
- Default
- Hover/focus
- Active/pressed
- Disabled
- Error states
- Empty states

**Interaction annotations:**
- What happens on click?
- What changes on hover?
- Any animations?
- What states exist?

### Step 6: Define Responsive Breakpoints

**Standard Breakpoints:**

| Breakpoint | Width | Devices |
|------------|-------|---------|
| Mobile | < 640px | Phone |
| Tablet | 640-1024px | Tablet |
| Desktop | > 1024px | Desktop |

**For each screen:**
- How does layout adapt?
- What collapses/hides?
- What's the priority order?

**Mobile-first approach:**
- Design mobile first
- Then adapt up

### Step 7: Annotate and Document

**Annotation Checklist:**

- [ ] Purpose of each section
- [ ] Content type (text, image, video)
- [ ] Interaction details
- [ ] States to show
- [ ] Responsive behavior
- [ ] Any accessibility notes
- [ ] Priority of elements

**Documentation:**
- Screen name
- Purpose
- Key elements
- Interactions
- Notes

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Screen List** — Prioritized screens with priority levels
- **Wireframes** — Layout sketches for each screen
- **Interactions** — Click paths and states
- **Responsive Notes** — Breakpoint behavior
- **Annotations** — Element purposes

Expected length: 1,000-2,000 words plus wireframe diagrams

## Quality Criteria

- [ ] Screen priority defined (P0/P1/P2/P3)
- [ ] Fidelity level appropriate for purpose
- [ ] Key screens covered (P0 and P1 minimum)
- [ ] Layout structure clear (header, content, footer)
- [ ] Grid/spacing consistent
- [ ] Interactions documented (click paths)
- [ ] States shown (default, hover, error)
- [ ] Responsive behavior noted
- [ ] Annotations included for each screen
- [ ] Purpose of each element labeled

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS dashboard):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Over-fidelity:** Creating detailed designs when rough sketches would suffice. Start low, only go higher if needed.

2. **Wireframing everything:** Not prioritizing screens. Focus on P0 and P1 screens first.

3. **No annotations:** Showing layout without explaining interactions. Always document what happens on click, hover, etc.

4. **Ignoring states:** Only showing default state. Wireframes should show hover, active, error, and empty states.

5. **Forgetting responsive:** Creating desktop-only wireframes. Always consider how layout adapts to different screens.

6. **Content as decoration:** Using lorem ipsum without thinking about actual content length. Use realistic content.

7. **No hierarchy:** All elements same visual weight. Use size and position to show importance.

8. **Skipping mobile:** Focusing only on desktop. Consider mobile-first for many products.
