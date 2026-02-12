# Output Schema: [Skill Name]

<!-- This file defines the exact structure of what the skill produces. It serves as the structural validation contract — every output must conform to this schema. Fields marked (required) must be populated; fields marked (conditional) are included when relevant data exists. -->

## Output Structure

```
# [Output Title]

## Section 1: [Name]
- Field A (required): [description, expected type/format]
- Field B (required): [description, expected type/format]
- Field C (conditional): [description, when to include]

## Section 2: [Name]
- Field D (required): [description, expected type/format]
- Field E (required): [description, expected type/format]

## Section 3: [Name]
- Field F (required): [description, expected type/format]
- Field G (conditional): [description, when to include]
```

## Field Definitions

<!-- Define each field precisely. Include: what it is, acceptable values/ranges, and examples of good vs. bad values. -->

### Field A
- **What:** [Description]
- **Format:** [Expected format — e.g., "1-2 sentences", "numeric score 1-5", "bullet list of 3-5 items"]
- **Good example:** [Example of a well-populated field]
- **Bad example:** [Example of a poorly-populated field and why]

### Field B
- **What:** [Description]
- **Format:** [Expected format]
- **Good example:** [Example]
- **Bad example:** [Example and why]

<!-- Repeat for all fields -->

## Validation Rules

<!-- Rules that must pass for the output to be considered structurally valid -->

1. All (required) fields must be populated with non-placeholder content
2. [Minimum content thresholds — e.g., "at least 3 competitors analyzed"]
3. [Cross-field consistency — e.g., "scoring dimensions match across all entries"]
4. [Format requirements — e.g., "confidence levels must be High/Medium/Low"]
5. [SaaS-specificity — e.g., "pricing analysis must reference subscription models"]

## Confidence Tagging

<!-- How to assign confidence levels to different parts of the output -->

- **High:** Based on verifiable data (public pricing pages, official documentation, user-provided data)
- **Medium:** Based on reasonable inference from available data (industry benchmarks, pattern matching)
- **Low:** Based on limited information or significant assumptions (estimated market size, inferred strategy)

Tag each major finding or recommendation with its confidence level and data source.
