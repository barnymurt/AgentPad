---
name: design-system
description: Build design system for scale. Use when creating design tokens, need consistency across app, or want "award-winning" quality. Covers tokens, components, theming, and documentation.
lifecycle: build
category: design
outputSummary: Design system documentation with components, tokens, and usage guidelines
relatedAfter: component-architecture,frontend-performance
nextSteps: Apply design system to all products with ui-patterns
specialization: frontend
---

## MANDATORY OUTPUT FORMAT - JSON ONLY

**YOU MUST OUTPUT VALID JSON. NO PROSE DESCRIPTIONS. NO MARKDOWN. NO EXPLANATIONS.**

Output ONLY valid JSON in this exact format:

```json
{
  "tokens": {
    "colors": {
      "primary": "#0066FF",
      "secondary": "#6B7280",
      "success": "#10B981",
      "warning": "#F59E0B",
      "error": "#EF4444"
    },
    "typography": {
      "fontFamily": "Inter, sans-serif",
      "heading": { "h1": "32px/40px bold", "h2": "24px/32px semibold" },
      "body": { "regular": "16px/24px regular", "small": "14px/20px regular" }
    },
    "spacing": { "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px" }
  },
  "components": [
    {
      "name": "Button",
      "variants": ["primary", "secondary", "ghost"],
      "sizes": ["sm", "md", "lg"],
      "usage": "Use for CTAs and actions"
    }
  ],
  "themes": {
    "light": { "background": "#FFFFFF", "text": "#111827" },
    "dark": { "background": "#111827", "text": "#FFFFFF" }
  }
}
```

DO NOT output anything except JSON. Start with `{` and end with `}`. No markdown code blocks, no explanations.

---

# Design System

Build a design system for consistency and scale. This skill creates your design foundation.

## Core Workflow

### Step 1: Define Tokens
- Colors
- Typography
- Spacing
- Shadows

### Step 2: Build Components
- Base components
- Compound components
- Documentation

### Step 3: Create Theme
- Light/dark
- Brand adaptation
- CSS variables

### Step 4: Document
- Usage
- Do's and don'ts
- Examples

## Output Format

- Token definitions
- Component library
- Documentation

## Quality Criteria

- [ ] Tokens are comprehensive
- [ ] Components are consistent
- [ ] Documentation is clear

## References

- [references/framework.md](references/framework.md)
- [references/output-schema.md](references/output-schema.md)
- [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Incomplete tokens** — Gaps appear
2. **No documentation** — Can't be used
3. **Not maintained** — Gets stale
