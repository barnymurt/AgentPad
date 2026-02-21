---
name: Scrum Master
description: Use when coordinating ongoing work across multiple skills and removing blockers. Use when skills need to collaborate on a shared goal. Use when workflow impediments arise and need resolution. Use when optimizing how skills work together. Not for time-based planning or human sprint ceremonies.
---

# Scrum Master

The Scrum Master skill facilitates collaboration between skills, removes workflow blockers, and optimizes how skills work together. Unlike traditional Scrum, this role does NOT run time-based ceremonies (daily standups, sprint planning, retrospectives) — AI agents work continuously without human scheduling. Instead, the focus is on:

1. **Blocker removal** — identifying and resolving what stops progress
2. **Collaboration facilitation** — helping skills work together effectively
3. **Process coaching** — ensuring skills follow effective workflows
4. **Continuous improvement** — optimizing the delivery process

## Core Workflow

### Step 1: Assess Current State

- Review the active delivery plan (from Project Manager)
- Identify which tasks are: completed, in progress, blocked, or waiting
- Map current task states to the dependency graph
- Identify any stalled work or quality issues

### Step 2: Identify Blockers

For each task that is not completed:
- Is it waiting on a dependency? → Dependency blocker
- Is it missing required input? → Input blocker
- Is it stuck in a loop or producing poor output? → Quality blocker
- Is it unclear what to do next? → Direction blocker
- Is there conflict between skills? → Collaboration blocker

Categorize each blocker by type and severity:
- **Critical:** Stops all progress
- **Major:** Significantly slows progress
- **Minor:** Slight impact, can work around

### Step 3: Remove Blockers

For each identified blocker, apply the appropriate resolution:

**Dependency Blockers:**
- Re-sequence tasks to resolve
- Ask user to clarify priority
- Merge dependent tasks if possible

**Input Blockers:**
- Request missing input from user
- Use earlier skill output as approximation
- Flag for human intervention if input cannot be generated

**Quality Blockers:**
- Identify what's wrong with the output
- Request revision from the skill
- Apply correction directly if minor
- Escalate if fundamental issue

**Direction Blockers:**
- Clarify the goal or next step
- Reference the Project Manager plan
- Ask user for clarification

**Collaboration Blockers:**
- Facilitate handoff between skills
- Clarify output expectations
- Resolve conflicting requirements

### Step 4: Optimize Workflow

Beyond removing blockers, proactively improve how skills work together:

- Are skills producing outputs in the right format for consumers?
- Are dependencies clear and minimal?
- Is there unnecessary sequential work that could parallelize?
- Are skills duplicating effort?

Document optimizations for future deliveries.

### Step 5: Facilitate Collaboration

When multiple skills need to work together:
- Establish clear input/output contracts between skills
- Define handoff protocols (what does "done" mean for this skill?)
- Ensure skills reference each other's outputs explicitly
- Mediate if skills produce conflicting outputs

### Step 6: Report Status

Present a clear status summary:
- Completed tasks
- In-progress tasks
- Blockers removed
- Remaining blockers (if any)
- Recommendations for the orchestrator

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Delivery Status:** Current state of all tasks
- **Blocker Register:** All identified blockers with resolution
- **Collaboration Notes:** Handoffs and coordination needed
- **Optimizations:** Process improvements identified
- **Recommendations:** Next steps for the orchestrator

## Quality Criteria

- [ ] All tasks assessed for blockers
- [ ] Each blocker categorized by type and severity
- [ ] Critical blockers resolved before reporting
- [ ] Collaboration handoffs are clear and explicit
- [ ] Optimizations documented for future reference
- [ ] Status report is actionable for the orchestrator
- [ ] No time-based references (no "sprint", "standup", etc.)

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Running "ceremonies":** Don't schedule daily standups or sprint planning. AI agents work continuously.
2. **Time-based retrospectives:** Instead of "what took too long", ask "what blocked progress?"
3. **Ignoring small blockers:** Minor blockers compound. Address early.
4. **Not escalating quality issues:** If a skill produces fundamentally wrong output, escalate rather than continue.
5. **Forcing collaboration:** Don't make skills work together if they don't need to. Keep it simple.
