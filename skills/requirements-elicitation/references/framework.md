# Framework: Requirements Elicitation

This framework provides the structured elicitation methodology, question banks, and classification systems for extracting complete requirements from product ideas and user conversations.

## Methodology Overview

Requirements elicitation is the process of uncovering what a system must do (functional) and how well it must do it (non-functional). The key insight for AI-assisted elicitation is that users provide information in unstructured ways — stories, complaints, wishes, constraints all mixed together. This framework systematically extracts structure from that input, identifies gaps, and produces requirements a development team can build from.

## Elicitation Question Bank

### Category 1: User & Problem

| Question | Why It Matters | When to Ask |
|----------|---------------|-------------|
| Who is the primary user? (Role, title, technical level) | Determines UX complexity, terminology, onboarding needs | Always — first question |
| Who else interacts with the system? (Secondary users, admins, viewers) | Reveals permission models, multi-role requirements | Always |
| What problem does this solve? | Validates the requirement is need-driven, not feature-driven | Always |
| How are they solving it today? | Current workflow reveals integration points and migration needs | Always |
| What's the most painful part of the current process? | Prioritizes which requirements are "Must have" | When user has existing process |
| How often do they do this? (Daily, weekly, monthly) | Affects performance requirements and UX investment | Always |
| What triggers them to need this? (Entry point, notification, schedule) | Reveals system entry points and trigger mechanisms | Always |

### Category 2: Scope & Boundaries

| Question | Why It Matters | When to Ask |
|----------|---------------|-------------|
| What is explicitly out of scope? | Prevents scope creep, sets clear boundaries | Always — ask early |
| What's the absolute minimum for the first version? | Defines the "Must have" tier | Always |
| What would make this a failure? | Reveals critical requirements that might not be stated | Always |
| Are there hard deadlines? | Constrains scope and affects priority decisions | When timeline matters |
| What existing systems must this work with? | Reveals integration requirements | When product is not greenfield |
| What can you NOT change? (Existing tech, contracts, processes) | Reveals hard constraints | When there's an existing system |

### Category 3: Behavior & Business Rules

| Question | Why It Matters | When to Ask |
|----------|---------------|-------------|
| What happens when [X is empty / missing / invalid]? | Reveals edge cases and error handling | For every data input |
| Are there limits? (Max items, characters, file size, users) | Defines boundary conditions | For every list, field, or resource |
| Who can do what? (Permissions, roles, access levels) | Defines authorization model | When multiple user types exist |
| What business rules must be enforced? | Reveals validation logic, pricing rules, approval workflows | When business logic exists |
| What data is required vs. optional? | Defines form validation and data model | For every data entry flow |
| In what order must things happen? | Reveals workflow dependencies and state machines | When multi-step processes exist |
| What notifications or alerts are needed? | Reveals async communication requirements | When actions affect other users |

### Category 4: Non-Functional

| Question | Why It Matters | When to Ask |
|----------|---------------|-------------|
| How fast must it respond? | Sets performance targets | Always |
| How many concurrent users? | Sizes infrastructure and identifies scaling needs | Always |
| What happens if it goes down? | Defines reliability and recovery requirements | Always |
| What data is sensitive? | Defines encryption, access control, and compliance | Always for SaaS |
| Who should NOT see certain data? | Defines data isolation and tenancy model | Always for multi-user |
| What devices and browsers must be supported? | Defines compatibility requirements | For web products |
| What accessibility standards apply? | Defines WCAG level and specific accommodations | Always (default: WCAG 2.1 AA) |

### Category 5: SaaS-Specific

| Question | Why It Matters | When to Ask |
|----------|---------------|-------------|
| How is data isolated between customers? | Defines multi-tenancy architecture | All SaaS products |
| What triggers a billing event? | Defines metering and billing integration | When product has paid tiers |
| What happens when a subscription expires? | Defines grace period, data retention, feature degradation | When product has paid tiers |
| Will there be an API? | Reveals API design requirements | Growth-stage or technical audience |
| What does the admin/operator need to see? | Reveals internal tooling requirements | When product serves multiple customers |
| How will users migrate data in? | Reveals import/onboarding requirements | When replacing an existing solution |

## Requirement Classification

### User Story Format (INVEST Criteria)

Good user stories are:
- **I**ndependent: Can be built and delivered separately
- **N**egotiable: Details can be discussed (it's a conversation starter, not a contract)
- **V**aluable: Delivers value to the user or business
- **E**stimable: Development team can estimate the effort
- **S**mall: Completable within one sprint/iteration
- **T**estable: Has clear acceptance criteria

**Standard format:**
```
As a [user role],
I want to [action/capability],
So that [benefit/value].
```

**Acceptance criteria format (Given/When/Then):**
```
Given [precondition/context],
When [action is taken],
Then [expected outcome].
```

### MoSCoW Prioritization

| Priority | Definition | Decision Criteria |
|----------|-----------|-------------------|
| **Must** | Without this, the product doesn't work. No workaround. | Would you delay launch for this? If yes → Must |
| **Should** | Important, painful without it, but a workaround exists. | Would users complain loudly but still use the product? If yes → Should |
| **Could** | Nice to have. Users would appreciate it but don't need it. | Would users notice if it's missing? If no → Could |
| **Won't** | Explicitly out of scope for this version. Document to prevent scope creep. | Is this for a future version? → Won't |

**Rule of thumb for SaaS MVP:** ~60% Must, ~20% Should, ~20% Could. If >80% is "Must," the scope is too big — challenge whether each "Must" is truly required for launch.

### Non-Functional Requirement Categories

| Category | What It Covers | Typical SaaS Defaults |
|----------|---------------|----------------------|
| **Performance** | Response time, throughput, latency | Page load <2s, API response <500ms |
| **Security** | Auth, encryption, access control, compliance | OAuth 2.0, TLS 1.3, AES-256 at rest |
| **Scalability** | User growth, data growth, traffic spikes | Handle 10x current load within 6 months |
| **Reliability** | Uptime, recovery, failover | 99.9% uptime, RPO <1hr, RTO <4hr |
| **Usability** | Accessibility, devices, onboarding | WCAG 2.1 AA, modern browsers, <5min onboarding |
| **Maintainability** | Logging, monitoring, deployment | Structured logging, error tracking, CI/CD |

## Edge Case Identification Framework

For every feature, systematically check:

| Edge Case Category | Questions to Ask |
|-------------------|------------------|
| **Empty states** | What does the user see with no data? First-time use? |
| **Boundaries** | What happens at 0, 1, max, max+1? |
| **Errors** | What if the network fails? API times out? Payment fails? |
| **Permissions** | What if the user doesn't have access? Role changes mid-session? |
| **Concurrency** | What if two users edit the same thing? Race conditions? |
| **Time** | What about timezones? Daylight saving? Expired sessions? |
| **Data** | What if data is malformed? Unicode? Very long strings? |
| **State** | What if the user navigates away mid-process? Browser back button? |

## Requirement Completeness Checklist

Before finalizing, verify coverage:

- [ ] All user roles identified and have at least one user story
- [ ] Happy path defined for every workflow
- [ ] Error/exception path defined for every workflow
- [ ] Empty states defined for every list/dashboard
- [ ] Permission model documented
- [ ] Data validation rules documented for every input
- [ ] Non-functional requirements stated with measurable targets
- [ ] Assumptions listed explicitly
- [ ] Dependencies mapped
- [ ] Open questions flagged (not guessed at)

## Sources and Rationale

- **User story format:** Based on Mike Cohn's work (Mountain Goat Software) and the Agile Alliance
- **INVEST criteria:** Bill Wake's criteria for evaluating user story quality
- **MoSCoW:** Dai Clegg, DSDM framework
- **Given/When/Then:** Behavior-Driven Development (BDD), Dan North
- **Non-functional categories:** ISO 25010 Software Quality Model, adapted for SaaS
