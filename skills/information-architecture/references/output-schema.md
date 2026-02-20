# Output Schema: Information Architecture

This file defines the exact structure of the Information Architecture skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **user-journey-mapping:** `context.user_tasks`, `context.flows`
- **requirements-elicitation:** `context.content_requirements`
- **user-persona-creation:** `context.personas`

### Produces

This skill produces:
- `context.ia.sitemap` — Hierarchical site map
- `context.ia.navigation` — Navigation system definitions
- `context.ia.labels` — Label glossary
- `context.ia.search` — Search strategy

---

## Output Structure

```
# Information Architecture: [Product/Site Name]

## 1. Executive Summary (required)

- Product type: [Web/App/API]
- Complexity: [Simple/Medium/Complex]
- Navigation type: [Global/Local/etc.]
- Primary recommendation: [2-3 sentences]

## 2. Complexity Assessment (required)

### Assessment Factors
| Factor | Value | Notes |
|--------|-------|-------|
| Content types | [X] | [Types] |
| User tasks | [X] | [Tasks] |
| Audiences | [X] | [Segments] |
| Platform | [Web/App/Both] | [Primary] |

### Complexity Level
- **Level:** [Simple/Medium/Complex]
- **IA Depth:** [X] levels recommended
- **Navigation:** [Type] recommended

## 3. Content Inventory (required)

### Content Types
| Type | Examples | Audience |
|------|----------|----------|
| [Type] | [Pages] | [Users] |

### Content by User Task
| Task | Related Content |
|------|-----------------|
| [Task 1] | [Content A, B] |
| [Task 2] | [Content C, D] |

## 4. Site Map (required)

### Visual Hierarchy

```
[Level 1 - Global]
├── [Section A]
│   ├── [Page A1]
│   └── [Page A2]
├── [Section B]
│   ├── [Page B1]
│   └── [Page B2]
└── [Section C]
```

### Page List

| Level | Page | Parent | Purpose |
|-------|------|--------|---------|
| 1 | Home | - | Entry point |
| 2 | Features | Home | Section |
| 3 | Feature Detail | Features | Detail |

[Continue for all pages]

## 5. Navigation System (required)

### Global Navigation
| Label | Destination | Priority |
|-------|------------|----------|
| [Label] | [Page] | Primary |

### Local Navigation
| Section | Links |
|---------|-------|
| [Section A] | [Link 1], [Link 2] |

### Utility Navigation
| Element | Purpose |
|---------|---------|
| Search | Find content |
| Account | User profile |

## 6. Label Glossary (required)

| Label | Meaning | Alternatives |
|-------|---------|--------------|
| [Label] | [What it means] | [Other options] |

## 7. Search Strategy (required)

### Search vs. Browse
- **Primary method:** [Search/Browse]
- **When to search:** [Scenarios]
- **When to browse:** [Scenarios]

### Search Features
| Feature | Implementation |
|---------|----------------|
| Autocomplete | [Yes/No] |
| Filters | [Categories] |
| No results | [Handling] |

## 8. Multi-Platform Considerations (required)

### Web
- [Considerations]

### App
- [Considerations]

### API (if applicable)
- [Considerations]

## 9. Validation (required)

### Validation Method
- [ ] Tree testing
- [ ] Card sorting
- [ ] Click testing
- [ ] Heuristic evaluation
- [ ] Not validated (needs user testing)

### Results (if tested)
- Success rate: [X]%
- Issues found: [List]

### Notes
- [This IA is based on [assumptions/user testing/needs validation]]

## 10. Maintenance (required)

### When to Update
- [Triggers for updates]

### Content Owners
| Content | Owner |
|---------|-------|
| [Page] | [Role] |

---

## Validation Rules

1. Complexity assessed and IA depth matches
2. Content inventory covers all types
3. Site map has clear hierarchy (max 3 clicks to any page)
4. Navigation system defined (global, local, utility)
5. Labels are user-friendly
6. Search strategy addresses browse vs. search
7. Multi-platform considerations noted
8. Validation method included or need noted

## Confidence Tagging

- **High:** User testing completed, validated with users
- **Medium:** Based on best practices, needs testing
- **Low:** Assumptions, no validation yet

Apply confidence to site map and navigation decisions.
