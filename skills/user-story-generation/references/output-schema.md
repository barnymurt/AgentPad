# Output Schema: User Story Generation

This file defines the exact structure of the User Story Generation skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **requirements-elicitation:** `context.requirements` (functional requirements, user stories, acceptance criteria)
- **user-persona-creation:** `context.personas` (optional, for user role context)
- **architecture-design:** `context.architecture` (optional, for technical context)

### Produces

This skill produces:
- `context.user_stories.stories[]` — Array of user story objects
- `context.user_stories.story_map` — Grouped by feature/release
- `context.user_stories.effort_summary` — Aggregate effort by release

## Output Structure

```
# User Stories: [Feature / Product Name]

## 1. Story Overview

### Story Map (required)
| Feature Area | MVP | Release 2 | Future |
|--------------|-----|-----------|-------|
| [Area 1] | US-1, US-2 | US-5 | US-8 |
| [Area 2] | US-3, US-4 | US-6, US-7 | |

### Summary Statistics (required)
- Total stories: X
- Total effort: X points / X hours
- MVP stories: X (X points)
- Release 2 stories: X (X points)

## 2. User Stories

### US-[Number]: [Title]

**As a** [actor]  
**I want to** [action]  
**So that** [benefit]

**Source requirement:** [FR-XXX from requirements elicitation]
**Priority:** Must / Should / Could / Won't

#### Context (optional)
- [Preconditions, assumptions, relevant background]

#### Acceptance Criteria (required, minimum 3)

- [ ] **AC-1** — Given [precondition] When [action] Then [expected result]
- [ ] **AC-2** — Given [precondition] When [action] Then [expected result]
- [ ] **AC-3** — Given [precondition] When [action] Then [expected result]

[Additional acceptance criteria as needed]

#### Technical Notes (required)

- **Dependencies:** [List of prerequisite stories or external dependencies]
- **Database:** [New tables, columns, or schema changes]
- **API:** [Required endpoints, methods, payloads]
- **Third-party:** [External services or integrations]
- **Security:** [Authentication, authorization, data handling]

#### Effort Estimate (required)

- **Points:** [X]
- **Range:** [X-Y] (confidence interval)
- **Confidence:** High / Medium / Low
- **Notes:** [Assumptions, risks, factors considered]

#### Persona Reference (required)
- **Primary actor:** [Role from persona or directly specified]
- **User segment:** [If using personas, reference persona ID]

[Repeat for each user story]

## 3. Feature Area Grouping

### [Feature Area 1] (required)

| Story ID | Title | Priority | Points |
|----------|-------|----------|--------|
| US-1 | [Title] | Must | 3 |
| US-2 | [Title] | Must | 5 |

### [Feature Area 2] (required)

| Story ID | Title | Priority | Points |
|----------|-------|----------|--------|
| US-3 | [Title] | Should | 3 |

## 4. Release Planning

### Release 1: MVP (required)

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-1 | [Title] | 3 | None |
| US-2 | [Title] | 5 | US-1 |

**MVP Criteria:** [What makes this release "minimum viable"]

### Release 2 (required if any Release 2 stories)

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-5 | [Title] | 8 | US-2 |

### Future (required if any future stories)

| Story ID | Title | Notes |
|----------|-------|-------|
| US-8 | [Title] | [Why deferred] |

## 5. Effort Summary

### By Priority (required)

| Priority | Stories | Total Points | % of Total |
|----------|---------|---------------|------------|
| Must | X | X | X% |
| Should | X | X | X% |
| Could | X | X | X% |
| Won't | X | X | X% |

### By Feature Area (required)

| Feature Area | Stories | Points |
|--------------|---------|--------|
| [Area 1] | X | X |
| [Area 2] | X | X |

### By Release (required)

| Release | Stories | Points |
|---------|---------|--------|
| MVP | X | X |
| Release 2 | X | X |
| Future | X | X |

## 6. Dependencies Map

### Story Dependencies (required)

| Story | Depends On | Type |
|-------|-----------|------|
| US-2 | US-1 | Internal |
| US-5 | US-2 | Internal |
| US-6 | US-3 | Internal |

### External Dependencies (conditional)

| Story | External Dependency | Impact |
|-------|---------------------|--------|
| US-4 | Stripe API integration | Can't complete without |

## 7. Gaps and Open Questions

### Questions for Product Owner (required if any)

| # | Question | Related Stories | Impact |
|---|----------|-----------------|--------|
| Q1 | [Question] | US-X, US-Y | [Impact if unanswered] |

### Stories Needing Clarification (conditional)

| Story | Gap | Needed From |
|-------|-----|-------------|
| US-X | [Description] | [Source needed] |

---

## Validation Rules

1. Every source requirement has at least one user story
2. Every user story follows "As a... I want to... so that..." format
3. Every user story has minimum 3 acceptance criteria
4. Every acceptance criteria follows Given-When-Then format
5. Every user story has effort estimate with confidence level
6. Every user story references an actor/role/persona
7. Stories are grouped by feature area
8. Stories are assigned to releases (MVP, Release 2, Future)
9. Dependencies are mapped between stories
10. MoSCoW priority carried forward from source requirements

## Confidence Tagging

- **High:** Clear requirements, known technology, similar prior work
- **Medium:** Some unknowns, moderate complexity
- **Low:** Vague requirements, new technology, many dependencies

Acceptance criteria without clear expected results should be flagged with Low confidence.
