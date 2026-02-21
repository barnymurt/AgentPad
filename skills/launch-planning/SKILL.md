---
name: launch-planning
description: Coordinate launch activities into a timeline with milestones and owners. Use when the user wants to plan a product launch, needs a launch timeline, asks when to start marketing, or needs to coordinate cross-functional launch activities. Covers launch phases, milestone definition, owner assignment, go/no-go criteria, and contingency planning.
---

# Launch Planning

Coordinate all product launch activities into a coherent timeline with clear milestones, owners, and decision points. Unlike generic project timelines, this skill produces a launch-specific plan that accounts for the unique constraints of software launches — soft launches, phased rollouts, feature flags, and the coordination between product, marketing, engineering, and customer success.

## Core Workflow

### Step 1: Assess Launch Context

Before planning, understand what you're launching:

1. **Identify the product:**
   - What is being launched? (full product, feature, update)
   - Current development stage (beta, RC, final)
   - Target launch date or constraint

2. **Map stakeholders:**
   - Who is involved in launch? (product, marketing, sales, support, exec)
   - Who makes go/no-go decisions?
   - What are their priorities?

3. **Determine launch type:**
   - Full public launch
   - Beta/early access
   - Phased rollout
   - Re-launch or update

If the user hasn't provided context, ask these questions before proceeding. Do not assume — launch planning depends heavily on scope.

### Step 2: Define Launch Phases

Map the launch into distinct phases:

1. **Pre-Launch (4-6 weeks before):**
   - Final QA and bug fixing
   - Marketing asset preparation
   - Content and documentation
   - Internal enablement
   - List building (for beta/signup)

2. **Launch Week:**
   - Release and deployment
   - Announcement and outreach
   - Support escalation
   - Monitoring and quick fixes

3. **Post-Launch (2-4 weeks after):**
   - User feedback collection
   - Issue resolution
   - Content follow-up
   - Performance review

4. **Stabilization (ongoing):**
   - Bug fixes and improvements
   - Feature iterations
   - Scale planning

### Step 3: Define Milestones and Owners

For each phase, define specific milestones:

1. **List all milestones:**
   - What needs to happen?
   - What's the dependency chain?
   - What's the deadline?

2. **Assign owners:**
   - Who is responsible?
   - Who needs to approve?
   - Who is backup?

3. **Identify dependencies:**
   - What must happen first?
   - What's blocking what?

### Step 4: Define Go/No-Go Criteria

Establish clear decision points:

1. **Launch readiness checklist:**
   - What must be true to launch?
   - What are the "must-have" vs "nice-to-have" items?

2. **Red flags:**
   - What issues would delay launch?
   - What's the escalation path?

3. **Contingency plans:**
   - What if we need to delay?
   - What's the rollback plan?
   - What's the phased launch option?

### Step 5: Create Communication Plan

Map how the launch is communicated:

1. **Internal communication:**
   - Team announcements
   - Status updates
   - Post-launch debrief

2. **External communication:**
   - Announcement channels
   - Timing and sequencing
   - Key messages

### Step 6: Synthesize Timeline

Produce the final launch plan:

1. **Timeline view:** Visual or tabular timeline with dates
2. **Milestone matrix:** What, who, when, dependencies
3. **Go/No-Go checklist:** Criteria with owners
4. **Communication plan:** Internal and external
5. **Risk register:** Launch risks with mitigations

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Section 1:** Launch Overview — product, type, timeline summary
- **Section 2:** Launch Phases — pre-launch, launch week, post-launch, stabilization
- **Section 3:** Milestone Matrix — all milestones with owners and dates
- **Section 4:** Go/No-Go Criteria — readiness checklist with owners
- **Section 5:** Risk Register — launch risks with mitigations
- **Section 6:** Communication Plan — internal and external communication
- **Section 7:** Contingency Plans — delay scenarios and responses

Expected length: 2,000-3,000 words depending on launch complexity.

## Quality Criteria

- [ ] Output follows the defined schema (all required sections populated)
- [ ] Timeline is realistic given launch type
- [ ] Every milestone has a clear owner
- [ ] Go/No-Go criteria are specific and measurable
- [ ] Dependencies are identified and reasonable
- [ ] Risks have specific mitigations, not generic advice
- [ ] Communication plan includes internal and external stakeholders

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Over-optimistic timelines:** Underestimating time for QA, content, and contingency. Build in buffer — software launches always take longer than expected.

2. **Missing dependencies:** Not identifying what must happen before launch (legal review, security sign-off, partner coordination). Map dependencies explicitly.

3. **No go/no-go criteria:** Launch decisions become emotional rather than data-driven. Define measurable criteria upfront.

4. **Ignoring post-launch:** Focusing only on launch day without planning for feedback collection, issue resolution, and iteration.

5. **No contingency:** Assuming launch will go perfectly. Plan for delay scenarios.
