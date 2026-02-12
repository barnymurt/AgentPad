---
name: requirements-elicitation
description: Extract structured functional and non-functional requirements from product ideas, user conversations, and briefs. Use when the user has a product idea, feature description, or project brief and needs it translated into clear, actionable requirements — including user stories, acceptance criteria, constraints, and assumptions. Use when the user says things like "what do I need to build," "write the requirements," "create user stories," "what should the spec include," or "turn this idea into something a developer can build." Covers functional requirements, non-functional requirements, constraints, assumptions, and dependency mapping for SaaS and digital products.
---

# Requirements Elicitation

Extract structured, complete requirements from product ideas and user conversations. Unlike raw LLM output that produces vague feature lists, this skill systematically uncovers functional requirements, non-functional requirements (performance, security, scalability), constraints, assumptions, and dependencies — producing a requirements document a development team can actually build from.

## Core Workflow

### Step 1: Understand the Source Material

Assess what the user has provided and identify what's missing:

1. **Identify the input type:**
   - Rough idea (conversational, unstructured) → heavy elicitation needed
   - Feature brief (some structure, some detail) → moderate elicitation
   - Existing spec (structured but needs refinement) → gap analysis
   - User feedback / support tickets (raw customer voice) → synthesis needed

2. **Extract what's already stated:** Pull out any explicit requirements, constraints, or decisions already made. Don't re-elicit what's already clear.

3. **Map the unknowns:** What critical information is missing? Categorize into:
   - **Must-know-now:** Blocks requirement writing (e.g., who is the user? what problem are they solving?)
   - **Can-assume-and-validate:** Reasonable defaults exist (e.g., "web-first, mobile later" for early SaaS)
   - **Defer:** Not needed yet (e.g., exact error message copy)

### Step 2: Elicit Through Structured Questions

Ask targeted questions to close the gaps. Organize questions by category:

**User & Problem:**
- Who are the primary users? (Role, technical level, frequency of use)
- What problem does this solve for them?
- How are they solving it today? (Current workflow)
- What triggers them to need this? (Entry point)

**Scope & Boundaries:**
- What is explicitly OUT of scope for this version?
- What's the minimum viable version? (What can ship without?)
- Are there hard deadlines or external dependencies?

**Behavior & Rules:**
- What happens when [edge case]? (Empty states, errors, permissions)
- Are there business rules that must be enforced? (Pricing logic, access control, data validation)
- What data is required vs. optional?

**Non-Functional:**
- Performance expectations? (Response time, concurrent users)
- Security requirements? (Auth, data encryption, compliance)
- Scalability? (Expected user growth, data volume)
- Accessibility? (WCAG level, screen reader support)

Ask questions in batches of 3-5. Let the user answer in whatever format works for them — shorthand, bullet points, stream of consciousness. Extract structure from their answers.

### Step 3: Write Functional Requirements

For each feature or capability, produce structured requirements:

1. **Write user stories** in the standard format:
   ```
   As a [user role], I want to [action] so that [benefit].
   ```

2. **Add acceptance criteria** for each story using Given/When/Then:
   ```
   Given [precondition]
   When [action]
   Then [expected result]
   ```

3. **Identify edge cases** for each requirement:
   - What happens with empty/null input?
   - What happens at boundaries (max items, max characters, timeout)?
   - What happens with concurrent access?
   - What happens when the user lacks permission?

4. **Set priority** using MoSCoW:
   - **Must have:** Required for launch, no workaround exists
   - **Should have:** Important, workaround exists but is painful
   - **Could have:** Desirable, easy to defer
   - **Won't have (this version):** Explicitly out of scope

### Step 4: Write Non-Functional Requirements

Capture the quality attributes that constrain the solution:

1. **Performance:** Response time targets, throughput, concurrent user capacity
2. **Security:** Authentication method, authorization model, data encryption, compliance requirements
3. **Scalability:** Expected growth, data volume projections, horizontal/vertical scaling needs
4. **Reliability:** Uptime target, backup/recovery requirements, error handling strategy
5. **Usability:** Accessibility standards, supported devices/browsers, onboarding requirements
6. **Maintainability:** Logging, monitoring, deployment frequency, tech debt constraints

For SaaS products, specifically address:
- Multi-tenancy requirements (data isolation, tenant-specific config)
- Billing integration points (what triggers a charge, what's metered)
- API requirements (if the product will have an API)

### Step 5: Map Dependencies and Assumptions

Surface the hidden requirements:

1. **Dependencies:** What must exist before this can be built? (APIs, infrastructure, other features, third-party services)
2. **Assumptions:** What are we assuming to be true? (Each assumption is a risk — make them explicit)
3. **Constraints:** What limits the solution space? (Technology choices, budget, timeline, team size, regulatory)
4. **Integration points:** What other systems does this touch? (Payment, email, analytics, auth)

### Step 6: Review and Validate

Present the complete requirements document and validate with the user:

1. **Completeness check:** Are there any features or scenarios not covered?
2. **Consistency check:** Do any requirements contradict each other?
3. **Feasibility check:** Are any requirements technically infeasible or prohibitively expensive?
4. **Priority check:** Does the MoSCoW prioritization match the user's intuition?

Flag any requirement where confidence is Low — these need user confirmation before development begins.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Context** — problem statement, users, scope
- **Functional Requirements** — user stories with acceptance criteria, grouped by feature area
- **Non-Functional Requirements** — performance, security, scalability, etc.
- **Dependencies and Assumptions** — explicit list with risk assessment
- **Priority Matrix** — MoSCoW categorization
- **Open Questions** — unresolved items requiring user decision

Expected length: 1,500-3,500 words depending on scope.

## Quality Criteria

- [ ] Every functional requirement has a user story AND acceptance criteria
- [ ] Edge cases identified for each requirement (at least empty state and error state)
- [ ] Non-functional requirements cover at least: performance, security, scalability
- [ ] SaaS-specific requirements addressed (multi-tenancy, billing, API)
- [ ] Every assumption is listed explicitly with risk level
- [ ] MoSCoW priorities assigned to all functional requirements
- [ ] Open questions listed (not hidden — unanswered questions are flagged, not guessed)
- [ ] Requirements are testable (each acceptance criterion can be verified as pass/fail)

## References

- **Elicitation methodology and question bank:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS onboarding flow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Solutioning instead of specifying:** Writing "use a dropdown menu" instead of "user must select one option from a predefined list." Requirements describe WHAT, not HOW. Leave implementation decisions to the development team unless the user explicitly specifies technology.

2. **Missing the negative requirements:** Only specifying what the system SHOULD do, not what it should NOT do. "The system must not expose other tenants' data" is as important as "the system must display the user's dashboard." Always include security and data isolation requirements.

3. **Vague acceptance criteria:** Writing "the page should load quickly" instead of "the page must render within 2 seconds on a 3G connection." Every acceptance criterion must be measurable and testable.

4. **Assuming shared understanding:** Skipping requirements that seem "obvious" — like "the user must be logged in to access their dashboard." Obvious to the product owner is not obvious to the developer. Spell everything out.

5. **Scope creep in requirements:** Adding requirements the user didn't ask for because they seem like good ideas. Stick to what the user needs for this version. Capture "future" ideas in a separate "Won't have (this version)" section.
