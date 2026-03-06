---
name: roadmap-planning
description: Sequence features into phased roadmap with dependencies, milestones, and success criteria. Use when the user has prioritized features and needs them organized into a practical roadmap — including release phases, timeline, team capacity, and go/no-go criteria. Use when the user says "what should we build first," "create a roadmap," "sequence these features," "when should we launch," or "plan out our development." Works with SaaS and digital products.
lifecycle: build
category: product
relatedBefore: feature-prioritization,product-vision
relatedAfter: launch-planning,iteration-planning
outputSummary: Phased roadmap with milestones, dependencies, timeline, team capacity planning, and go/no-go criteria
nextSteps: Once roadmap is set, plan your launch with launch-planning and iterate based on metrics with iteration-planning
---

# Roadmap Planning

Sequence features into a practical, achievable roadmap that balances technical dependencies, business priorities, and team capacity. Unlike raw LLM output that creates arbitrary timelines, this skill applies structured sequencing logic, validates dependencies, stress-tests assumptions, and produces a roadmap with clear milestones, risk mitigation, and cut criteria.

**Note**: This skill requires minimum inputs to produce useful output. See Step 1 for requirements.

## Core Workflow

### Step 1: Validate Prerequisites

Before generating roadmap, confirm minimum inputs exist:

**Required Inputs (all must be present):**
- Prioritized feature list — At least 3 features with priority scores
- Team size — Number of developers, designers, and their availability
- Timeline context — Target launch date or constraints

**Strongly Recommended Inputs:**
- Dependencies between features (from requirements or architecture)
- Velocity/capacity estimate — Historical velocity or reasonable assumption
- Business milestones — External constraints (funding, events, launches)

**If inputs are missing:**
- Ask the user for missing information before proceeding
- If dependencies unknown, note them as "TBD" and sequence by priority alone
- If capacity unknown, use rule of thumb: 1 developer = 20-40 story points/sprint

### Step 2: Analyze Dependencies

Map technical and business dependencies between features:

1. **Identify explicit dependencies:**
   - Feature A must be done before Feature B
   - Feature C depends on infrastructure work
   - Feature D needs third-party API (lead time)

2. **Identify implicit dependencies:**
   - Feature E and F should be done together (same area)
   - Feature G needs Feature H's data model
   - Feature I requires Feature J's UX patterns

3. **Validate dependency chains:**
   - Check for circular dependencies
   - Identify long chains that create risk
   - Flag missing dependencies (things that seem independent but aren't)

4. **Sequence dependency by:**
   - Features with no dependencies first
   - Then features depending on them
   - Work backward from must-have features

### Step 3: Assess Team Capacity

Determine realistic capacity for each sprint/phase:

1. **Calculate available capacity:**
   ```
   Capacity = (Team Size) × (Velocity) × (Sprints)
   ```

2. **Account for factors:**
   - Time off / holidays
   - Bugs and maintenance (typically 20-30% of capacity)
   - Meetings and ceremonies (10-15%)
   - Learning and investigation (10%)

3. **Validate velocity assumptions:**
   - If known: Use historical velocity
   - If new team: Use conservative estimate (20 points/dev/sprint)
   - If uncertain: Build in buffer (add 30% to estimates)

4. **Flag capacity risks:**
   - If required work > capacity: Note as risk
   - If timeline is tight: Identify cut candidates

### Step 4: Define Release Phases

Organize features into logical releases:

**Phase Types:**

| Phase | Description | Typical Duration |
|-------|-------------|------------------|
| **MVP** | Minimum viable — core value delivered | 1-3 sprints |
| **v1.0** | First production release | 2-4 sprints |
| **v1.1** | Incremental improvement | 1-2 sprints |
| **v2.0** | Major feature release | 3-6 sprints |

**For each phase, define:**

1. **Entry criteria** — What must be true to start this phase?
2. **Exit criteria** — What must be delivered to complete this phase?
3. **Go/No-Go criteria** — What determines if we ship or delay?

### Step 5: Add Milestones and Success Criteria

Define measurable milestones:

1. **Feature Milestones:**
   - "MVP feature complete" — X features ready
   - "Beta ready" — Internal testing passed

2. **Business Milestones:**
   - "Launch to public" — Marketing ready
   - "Enterprise features done" — Sales ready

3. **Technical Milestones:**
   - "Infrastructure ready" — Systems operational
   - "Performance at scale" — Load testing passed

**For each milestone:**
- Specific date or sprint
- Definition of done
- Owner/accountability

### Step 6: Identify Risks and Cut Criteria

Every roadmap should anticipate what could go wrong:

1. **Phase Risks:**
   - What could delay this phase?
   - What's the mitigation?
   - What's the fallback?

2. **Cut List:**
   - What features are "nice to have"?
   - What's cut first if behind?
   - What's cut second?

3. **Decision Triggers:**
   - When do we decide to cut?
   - What signals indicate we're behind?
   - Who makes the call?

### Step 7: Create Visual Timeline

Present the roadmap visually:

1. **Timeline view:**
   ```
   Sprint 1    Sprint 2    Sprint 3    Sprint 4
   ─────────────────────────────────────────────
   [MVP]      [MVP]      [v1.0]     [v1.0]
   Feature A  Feature B  Feature D  Feature E
   Feature C             Feature F
   ```

2. **Milestone markers:**
   - Mark MVP, Beta, Launch dates
   - Show external dependencies

3. **Status indicators:**
   - On track / At risk / Behind

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — High-level roadmap in 2-3 sentences
- **Timeline** — Visual representation by sprint
- **Phases** — Each phase with features, criteria, timeline
- **Dependencies** — Full dependency map
- **Milestones** — Feature, business, technical milestones
- **Risks** — Phase-by-phase risk assessment
- **Cut List** — What to cut if behind
- **Assumptions** — What's assumed in this roadmap

Expected length: 1,500-3,000 words

## Quality Criteria

- [ ] Minimum required inputs confirmed before generating output
- [ ] Dependencies mapped and validated (no circular dependencies)
- [ ] Each phase has entry, exit, and go/no-go criteria
- [ ] Cut list identified (at least 2-3 items)
- [ ] Phase risks identified with mitigation
- [ ] Milestones categorized (feature, business, technical)
- [ ] Capacity calculations shown
- [ ] Timeline accounts for bugs, meetings, buffer
- [ ] Roadmap is achievable given stated capacity
- [ ] Recommendations grounded in dependencies, not just priority

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (TaskFlow SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Ignoring dependencies:** Sequencing purely by priority without considering that Feature B requires Feature A to be complete. Always map dependencies first.

2. **No buffer:** Planning at 100% capacity. Things always take longer than expected. Always include 20-30% buffer for bugs, unknowns, and scope creep.

3. **No cut list:** Committing to every feature with no flexibility. When timeline slips, everything slips. Pre-identify what can be cut.

4. **Unrealistic velocity:** Using optimistic velocity estimates. New teams overestimate; experienced teams underestimate. Calibrate to reality.

5. **Vague milestones:** "Ship when ready" is not a milestone. Define specific, measurable criteria for each milestone.

6. **No rollback plan:** Assuming everything goes perfectly. Each phase should have a plan B: What if we need more time? What gets cut?

7. **Missing external dependencies:** Not accounting for third-party APIs, design assets, marketing materials that are needed but out of dev's control.

8. **No stakeholder alignment:** Roadmap without buy-in from engineering, design, and business leads. Get agreement before committing.
