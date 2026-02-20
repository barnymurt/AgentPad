---
name: user-story-generation
description: Transform requirements into implementable user stories with acceptance criteria, effort estimates, and clear implementation guidance. Use when the user has requirements from requirements-elicitation and needs them converted to developer-ready user stories — including actor identification, business rules, edge cases, technical notes, and effort estimates. Use when the user says "turn these requirements into user stories," "break down these features," "write stories for the dev team," or "add effort estimates to our backlog." Works with SaaS and digital products.
---

# User Story Generation

Transform requirements into implementation-ready user stories with structured acceptance criteria, effort estimates, and clear delineation of scope. Unlike raw LLM output that produces vague user stories without actionable detail, this skill systematically breaks down requirements into independently implementable stories, adds technical context, estimates effort, and ensures each story can be developed and tested in isolation.

## Core Workflow

### Step 1: Receive and Validate Requirements

Accept requirements input in any form:

1. **Direct output from requirements-elicitation** — Preferred. Contains structured functional requirements with user stories, acceptance criteria, and edge cases.
2. **User-provided requirements list** — Normalize into standard format. Ask for missing elements.
3. **Existing backlog or feature list** — Enrich with user stories and acceptance criteria.

**Validate minimum inputs:**
- Feature/requirement name
- Brief description of what it should do
- Target user or user segment (can reference a persona)

If any required field is missing, ask the user before proceeding. Do not fabricate missing information.

**Input Guardrails:**
- If requirements lack specific acceptance criteria, flag this and ask for clarification
- If target user is "generic" (e.g., "users"), ask for specific role
- If description is vague ("do X better"), ask for specific behavior

### Step 2: Identify Actors and Actions

For each requirement, identify:

1. **Primary actor** — Who performs the action? (e.g., "registered user," "admin," "API consumer")
2. **Secondary actors** — Who else is involved? (e.g., "system," "manager receiving notification")
3. **Actions** — What does each actor do? Break complex requirements into multiple actions.
4. **Goals** — Why does the actor want this? Connect to user value.

Group related actions into single stories or split into separate stories based on:
- Can this story be implemented independently?
- Can this story be tested independently?
- Does this story deliver value on its own?

### Step 3: Write the User Story

Use the standard format with extensions:

```
As a [actor],
I want to [action],
so that [benefit].
```

**Enhance with:**

1. **Context** — Optional preconditions (e.g., "given I'm logged in," "given the dashboard is loaded")
2. **Business rules** — Constraints or validations that apply
3. **Edge cases** — What happens with invalid input, permissions, empty states

**Example:**
```
As a project admin,
I want to invite team members by email,
so that collaborators can access my workspace and contribute to projects.

Context: User must have admin role
Business rules: Email must be valid format, max 10 invites per day per admin
Edge cases: Already-registered user gets different treatment than new user
```

### Step 4: Define Acceptance Criteria

For each user story, write acceptance criteria that are:

- **Testable** — Can be verified as pass/fail
- **Complete** — Cover happy path, edge cases, and error conditions
- **Independent** — Don't depend on other stories being complete

**Format: Given-When-Then**

```
Given [precondition]
When [action]
Then [expected result]
```

**Minimum 3 acceptance criteria per story:**
1. Primary happy path (the main thing the user wants)
2. Secondary valid scenario (alternative flows)
3. Error/edge case (what happens when things go wrong)

**Acceptance Criteria Checklist (each story must have):**
- [ ] Happy path covered (happy day scenario works)
- [ ] Error case covered (what happens when it fails)
- [ ] Edge case covered (empty states, permissions, boundaries)
- [ ] Criteria are testable (can verify pass/fail)
- [ ] Criteria are independent (don't depend on other stories)

### Step 5: Add Technical Notes

For each story, add implementation guidance:

1. **Dependencies** — Internal (other stories) or external (APIs, services)
2. **Database changes** — New tables, columns, relationships
3. **API considerations** — Endpoints, payload structure, authentication
4. **Third-party services** — External integrations required
5. **Security considerations** — Access control, data validation, PII handling
6. **Analytics/events** — Tracking events to implement

### Step 6: Estimate Effort

Estimate effort using the team's preferred scale:

| Scale | Description | Use When |
|-------|------------|----------|
| **Story Points** | Fibonacci (1, 2, 3, 5, 8, 13) | Team uses points |
| **T-Shirt Sizes** | XS, S, M, L, XL | Simpler estimation |
| **Hours** | Direct hours (4h, 8h, 16h) | Fixed-price projects |

**Consider for estimation:**
- Complexity of business logic
- UI/UX effort required
- Testing effort
- Integration complexity
- Unknowns and risks

**Never estimate alone** — If estimating for a team, use planning poker or similar. For individual use, provide a confidence range (e.g., "5-8 hours").

**Size Validation:**
- Stories estimated >8 points are "epics" — flag these for splitting
- Split epics into smaller stories (<5 points each) where possible
- If story cannot be split, note "Epic" in title and add detailed breakdown

### Step 7: Validate Implementation Feasibility

Before finalizing, verify each story can actually be implemented:

1. **Technical feasibility check:**
   - Are dependencies available/possible?
   - Are there known technical blockers?
   - Can this be built with current tech stack?

2. **Scope reality check:**
   - Is the acceptance criteria achievable?
   - Are there any contradictory requirements?
   - Is the effort estimate realistic given complexity?

3. **Flag concerns:**
   - If story seems too large → recommend split
   - If dependencies are unclear → note as risk
   - If technical constraints exist → document in notes

**Do not produce stories that cannot be implemented without flagging the issue.**

### Step 7: Organize and Prioritize

Group stories logically and apply MoSCoW prioritization from source requirements:

- **Must have** — Core functionality, no workaround
- **Should have** — Important, workaround exists
- **Could have** — Desirable, easy to defer
- **Won't have** — Explicitly out of scope

Create a story map or release structure if useful:
- **MVP stories** — Minimum viable feature
- **v1.1 stories** — Enhanced functionality
- **Future** — Out of scope for current release

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Story Map** — Visual or tabular overview of all stories grouped by feature/release
- **User Stories** — Each story with actor, action, benefit, context
- **Acceptance Criteria** — Given-When-Then for each story
- **Technical Notes** — Dependencies, DB changes, API considerations
- **Effort Estimates** — Points/sizes with confidence range
- **Prioritization** — MoSCoW assignment with rationale

Expected length: 2,000-4,000 words depending on number of requirements.

## Quality Criteria

- [ ] Each requirement converted to at least one user story
- [ ] Every user story follows "As a... I want to... so that..." format
- [ ] Each story has minimum 3 acceptance criteria (happy path, alternate, error)
- [ ] Acceptance criteria checklist completed for each story (happy + error + edge + testable + independent)
- [ ] Every story references a user persona (explicit or by role)
- [ ] Technical notes include dependencies and external integrations
- [ ] Effort estimates provided with confidence range
- [ ] Stories >8 points flagged as "epic" and split recommended
- [ ] Implementation feasibility verified (no impossible stories)
- [ ] Stories are independently testable
- [ ] MoSCoW prioritization applied from source requirements

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (invoice management SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Writing implementation instead of requirements:** "Create a dropdown with options A, B, C" instead of "User can select from available options." The story should describe WHAT, not HOW. Leave implementation details to acceptance criteria and technical notes.

2. **Creating monolithic stories:** Stuffing an entire feature into one story. If a story takes more than half a sprint to complete, it's too large. Split into independently deliverable pieces.

3. **Acceptance criteria that can't be tested:** "The system should be user-friendly" instead of "Form submission shows success message within 2 seconds." Every AC must be verifiable.

4. **Ignoring edge cases:** Only writing the happy path. Every story needs to address: What happens with invalid input? Empty data? Permission denied? Network failure?

5. **Estimating without context:** Giving a point estimate without noting assumptions or unknowns. Always provide a range and state what's factored in.

6. **Losing the user value:** Writing "As an admin, I want to click a button" instead of "As an admin, I want to invite team members so that collaborators can access my workspace." Always connect to the benefit.

7. **Ignoring story size:** Not flagging when stories are too large (>8 points). Large stories are hard to estimate, implement, and test. Always split or flag as epic.

8. **Skipping feasibility check:** Producing stories without verifying they can actually be built. Always check: Are dependencies available? Is it technically possible? Is the effort realistic?
