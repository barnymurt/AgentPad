---
name: responsive-patterns
description: Build responsive interfaces. Use when building mobile-first, need responsive layouts, or want cross-device consistency. Covers breakpoints, layouts, and device-specific patterns.
lifecycle: build
category: design
outputSummary: Responsive design patterns for mobile, tablet, and desktop
relatedAfter: design-system,frontend-performance
nextSteps: Apply patterns to all breakpoints
specialization: frontend
---

## MANDATORY OUTPUT FORMAT - JSON ONLY

**YOU MUST OUTPUT VALID JSON. NO PROSE DESCRIPTIONS. NO MARKDOWN. NO EXPLANATIONS.**

Output ONLY valid JSON in this exact format:

```json
{
  "breakpoints": [
    { "name": "mobile", "min": 0, "max": 639, "default": true },
    { "name": "tablet", "min": 640, "max": 1023 },
    { "name": "desktop", "min": 1024, "max": null }
  ],
  "patterns": [
    {
      "name": "Navigation",
      "description": "Responsive navigation pattern",
      "mobile": { "type": "hamburger", "position": "top" },
      "desktop": { "type": "horizontal", "position": "top" }
    },
    {
      "name": "Grid Layout", 
      "description": "Content grid adaptation",
      "mobile": { "columns": 1, "gap": "16px" },
      "tablet": { "columns": 2, "gap": "24px" },
      "desktop": { "columns": 3, "gap": "24px" }
    }
  ],
  "testing": {
    "devices": ["iPhone 14", "iPad", "MacBook"],
    "browsers": ["Chrome", "Safari", "Firefox"]
  }
}
```

DO NOT output anything except JSON. Start with `{` and end with `}`. No markdown code blocks, no explanations.

---

# Responsive Patterns

Build responsive interfaces for all devices. This skill handles multi-device experiences.

## Core Workflow

### Step 1: Define Breakpoints
- Mobile
- Tablet
- Desktop
- Custom

### Step 2: Choose Layouts
- Grid
- Flexbox
- Container queries

### Step 3: Handle Content
- Images
- Typography
- Navigation

### Step 4: Test
- Real devices
- Emulators
- Cross-browser

## Output Format

- Breakpoint definitions
- Layout patterns
- Testing plan

## Quality Criteria

- [ ] Works on all devices
- [ ] Content is readable
- [ ] Touch-friendly

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Not mobile-first** — Desktop-first breaks mobile
2. **Hidden content** — Can't access on mobile
3. **No testing** — Issues in production
