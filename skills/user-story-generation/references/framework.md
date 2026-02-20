# Framework: User Story Generation

This file provides detailed methodology for transforming requirements into implementation-ready user stories.

## 1. Story Writing Principles

### The INVEST Model

Good user stories follow the INVEST principle:

| Letter | Principle | Application |
|--------|-----------|-------------|
| **I**ndependent | Can be developed and tested independently | Avoid dependencies between stories. If Story B requires Story A, either combine them or make A a prerequisite. |
| **N**egotiable | Not a contract — a reminder of a conversation | Stories are placeholders for discussion. Include just enough detail to guide implementation. |
| **V**aluable | Delivers value to the end user | Every story should connect to user benefit. If you can't explain why a user cares, reconsider the story. |
| **E**stimable | Team can estimate the effort | If a story can't be estimated, it's too big or too vague. Split or add detail. |
| **S**mall | Fits within one sprint | Stories typically 1-5 days of work. Larger = split it. |
| **T**estable | We know how to verify it's done | Clear acceptance criteria enable testing. |

### Story Splitting Techniques

When stories are too large, split by:

1. **Business rule split:** Handle one business rule per story
   ```
   Bad:  User can manage project permissions
   Good: User can view project team members
   Good: User can invite team members
   Good: User can remove team members
   Good: User can change member roles
   ```

2. **Data split:** CRUD operations as separate stories
   ```
   Bad:  User can manage customer data
   Good: User can create customers
   Good: User can read customer details
   Good: User can update customer details
   Good: User can delete customers
   ```

3. **Path split:** Happy path vs. edge cases
   ```
   Bad:  User can upload files
   Good: User can upload valid files (happy path)
   Good: User sees error for invalid file types (edge case)
   Good: User sees progress during upload (edge case)
   ```

4. **Operation split:** Different operations on same entity
   ```
   Bad:  User manages billing
   Good: User can view invoices
   Good: User can download invoices
   Good: User can update payment method
   ```

## 2. Acceptance Criteria Writing

### Given-When-Then Format

Structure acceptance criteria as:

```
Given [precondition]
When [action or trigger]
Then [expected result]
```

### AC Quality Checklist

- [ ] **Complete:** Covers the main scenario AND at least one error case
- [ ] **Atomic:** Tests one thing per criterion
- [ ] **Clear:** No ambiguity in expected result
- [ ] **Executable:** Can be automated or manually verified
- [ ] **Independent:** Doesn't depend on other criteria being run first

### AC Examples by Category

**Happy Path:**
```
Given I am on the project dashboard
When I click the "Invite Member" button
Then I see the invite form modal
```

**Alternate Flow:**
```
Given I am on the invite form
When I enter an email already registered in the system
Then I see a message "This person is already a member"
And they are added to my project with "member" role
```

**Error Case:**
```
Given I am on the invite form
When I enter an invalid email format
Then I see inline error "Please enter a valid email address"
And the submit button is disabled
```

**Edge Case:**
```
Given I am an admin with 10 pending invitations
When I try to send an 11th invitation
Then I see error "Daily invite limit reached"
And I can try again tomorrow
```

## 3. Effort Estimation

### Story Points: Fibonacci Scale

| Points | Complexity | Time Equivalent | Example |
|--------|------------|-----------------|---------|
| 1 | Very simple | 1-4 hours | Change button text, fix typo |
| 2 | Simple | 4-8 hours | Simple form field, basic validation |
| 3 | Moderate | 1-2 days | Standard feature, known tech |
| 5 | Complex | 2-4 days | Complex logic, new integration |
| 8 | Very complex | 4-8 days | Major feature, multiple unknowns |
| 13 | Epic | 8+ days | Requires splitting |

### Factors Affecting Effort

1. **Code complexity:** Business logic, algorithms, data transformations
2. **UI/UX effort:** New components, responsive design, accessibility
3. **Testing:** Unit tests, integration tests, E2E tests
4. **Integration:** Third-party APIs, internal services
5. **Security:** Auth, authorization, data validation, PII
6. **Data:** Database changes, migrations, data cleanup
7. **Documentation:** User docs, API docs, runbooks

### Estimation Confidence

Always provide a range and confidence level:

| Confidence | Range | When |
|------------|-------|------|
| **High** | ±20% | Known technology, clear requirements, similar prior work |
| **Medium** | ±50% | Some unknowns, moderate complexity |
| **Low** | 2-4x | New technology, vague requirements, many dependencies |

## 4. User Story Mapping

### Story Mapping Structure

For larger features, create a story map:

```
User Story Map: [Feature Name]

| Backbone (User Activities) | Activity 1 | Activity 2 | Activity 3 |
|---------------------------|------------|------------|------------|
| Release 1 (MVP)           | Story A    | Story B    | Story C    |
| Release 2                 | Story D    | Story E    |            |
| Release 3                 | Story F    | Story G    | Story H    |
```

### Release Planning

Group stories by:

1. **MVP:** Minimum functionality to release
2. **Enhancements:** Nice-to-have but not critical
3. **Future:** Out of scope for current planning horizon

## 5. Templates

### User Story Template

```markdown
## US-[Number]: [Title]

**As a** [actor]  
**I want to** [action]  
**So that** [benefit]

### Context (optional)
- [Preconditions, assumptions, relevant background]

### Acceptance Criteria
- [ ] Given [condition] When [action] Then [result]
- [ ] Given [condition] When [action] Then [result]
- [ ] Given [condition] When [action] Then [result]

### Technical Notes
- Dependencies: [list]
- Database: [changes needed]
- API: [endpoints]
- Third-party: [services]
- Security: [considerations]

### Estimation
- Points: [X]
- Confidence: [High/Medium/Low]
- Notes: [assumptions, risks]
```

### Story Map Template

```markdown
# Story Map: [Feature]

## User Activities (top to bottom = priority)

### Activity 1: [Name]
| Release | Stories |
|---------|---------|
| MVP | US-1, US-2 |
| R2 | US-3 |

### Activity 2: [Name]
| Release | Stories |
|---------|---------|
| MVP | US-4 |
| R2 | US-5, US-6 |

## Walking Skeleton
[Minimum path through the map that delivers value]
```

## 6. Anti-Patterns

### Stories That Need Rewriting

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| "As a user, I want to click buttons" | No value stated | Add "so that..." benefit |
| "As admin, I want to manage permissions" | Too broad | Split into specific actions |
| "System shall be fast" | Not testable | "Page loads in < 2 seconds" |
| "Create the dashboard" | Not a story | Break into specific user actions |
| "Add validation" | Vague | What input? What error message? |

### Estimation Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Anchor bias | First number sets the range | Use planning poker, anonymous voting |
| Optimism | Underestimating unknowns | Add 20% buffer for unknowns |
| Detail blindness | Missing hidden effort | Walk through implementation mentally |
| Solo estimation | Individual blind spots | Team estimation sessions |

## 7. Integration with Other Skills

### Inputs (Consults)

- **requirements-elicitation:** Source requirements with user stories and acceptance criteria
- **user-persona-creation:** Reference for user roles and context
- **architecture-design:** Technical constraints and system context

### Outputs (Feeds)

- **feature-prioritization:** Stories ready for scoring
- **gap-analysis:** Completeness check on requirements coverage
- **development-team:** Implementation-ready backlog
