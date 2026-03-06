# Framework: Scrum Master

This document provides the detailed methodology for the Scrum Master skill, including blocker resolution strategies, collaboration patterns, and process optimization.

## Methodology Overview

The Scrum Master skill applies Agile facilitation principles to AI agent workflows. The core difference from traditional Scrum: AI agents don't need human-style ceremonies or time-based cadence. Instead, the focus is on:

- **Reactive:** Remove blockers when they arise
- **Proactive:** Optimize how skills collaborate
- **Continuous:** No sprint boundaries, just flow

## Blocker Resolution Strategies

### Dependency Blockers

**Symptom:** Task B is waiting on Task A, but Task A isn't complete.

**Resolution Options:**

| Situation | Resolution |
|-----------|------------|
| A is blocked | Remove A's blocker first |
| A is slow | Run other independent tasks |
| A was underestimated | Re-sequence to minimize wait |
| A and B can merge | Combine into single task |

**Decision Tree:**
```
Is A (dependency) complete?
├── Yes → B should not be blocked; check status
├── No, A is blocked → Resolve A's blocker first
├── No, A is slow → Can other work proceed?
│   ├── Yes → Continue other tasks
│   └── No → Request priority clarification
└── No, A was missed → Add dependency to tracking
```

### Input Blockers

**Symptom:** Task needs data/information that isn't available.

**Resolution Options:**

| Situation | Resolution |
|-----------|------------|
| Input exists but not captured | Generate from earlier output |
| Input requires user input | Request from user |
| Input can be approximated | Use proxy/estimate |
| Input is critical and missing | Escalate to human |

**Decision Tree:**
```
Is the input available from earlier task?
├── Yes → Use it
├── No → Can it be derived/estimated?
│   ├── Yes → Derive with noted assumption
│   └── No → Is it critical to proceed?
│       ├── No → Proceed with noted gap
│       └── Yes → Request from user
```

### Quality Blockers

**Symptom:** Task output is wrong, incomplete, or poor quality.

**Resolution Options:**

| Situation | Resolution |
|-----------|------------|
| Minor issue | Fix directly in orchestration |
| Moderate issue | Request revision from skill |
| Major issue | Escalate to skill building |
| Fundamental issue | Flag for human review |

**Severity Guidelines:**

| Severity | Indicator | Response |
|----------|-----------|----------|
| Minor | 1-2 fields wrong, does not affect overall | Direct fix |
| Moderate | Significant gaps, affects downstream | Request revision |
| Major | Wrong approach, fundamental issues | Skill revision needed |
| Critical | No usable output | Human intervention |

### Direction Blockers

**Symptom:** It's unclear what to do next.

**Resolution Options:**

| Situation | Resolution |
|-----------|------------|
| Goal unclear | Clarify with user |
| Next step unclear | Reference Project Manager plan |
| Conflicting priorities | Ask user to clarify |
| Scope unclear | Reference scope boundary |

### Collaboration Blockers

**Symptom:** Skills aren't working together effectively.

**Resolution Options:**

| Situation | Resolution |
|-----------|------------|
| Output format mismatch | Define handoff format |
| Unclear handoff | Clarify "done" definition |
| Conflict in outputs | Mediate and resolve |
| Missing handoff | Add to collaboration notes |

## Collaboration Patterns

### Pattern 1: Sequential Handoff

```
Skill A → produces X → Skill B consumes X
```

**Best for:** When B truly needs A's output

**Requirements:**
- Clear output specification for A
- Clear input expectation for B
- Explicit reference in B's input

### Pattern 2: Parallel with Merge

```
Skill A → produces X
Skill B → produces Y → Merge → Skill C
Skill C consumes X + Y
```

**Best for:** Independent work that combines later

**Requirements:**
- Both A and B can complete independently
- C can accept partial input (with noted gaps)
- Merge logic is clear

### Pattern 3: Producer-Consumer Loop

```
Skill A → produces X → Skill B consumes X → produces Y → Skill A
```

**Best for:** Iterative refinement

**Requirements:**
- Clear iteration criteria
- Termination condition
- Maximum iteration limit

### Pattern 4: Squad Assembly

```
Orchestrator → Skill A, Skill B, Skill C work together
```

**Best for:** Complex deliverables requiring multiple perspectives

**Requirements:**
- Clear shared goal
- Defined roles for each skill
- Aggregation strategy for outputs

## Process Optimization

### Optimization Categories

1. **Sequencing:** Tasks in wrong order
2. **Format:** Output not matching consumer needs
3. **Handoff:** Unclear what's passed between skills
4. **Redundancy:** Skills duplicating work
5. **Granularity:** Tasks too fine or too coarse

### How to Identify Optimizations

**During delivery:**
- Notice repeated requests for format changes
- Skills asking for clarification on outputs
- Same data retrieved multiple times
- Unnecessarily sequential work

**After delivery:**
- Review what caused delays
- Note skills that needed rework
- Track format mismatches
- Document handoff issues

### Optimization Prioritization

| Impact | Effort | Action |
|--------|--------|--------|
| High | Low | Implement immediately |
| High | High | Add to backlog, prioritize |
| Low | Low | Implement if time permits |
| Low | High | Skip |

## Quality Scoring Rubric

### Blocker Management Score

| Score | Criteria |
|-------|----------|
| 5 | All blockers identified, resolved, documented |
| 4 | Most blockers found, good resolution |
| 3 | Some blockers missed or unresolved |
| 2 | Significant blockers ignored |
| 1 | No blocker tracking |

### Collaboration Facilitation Score

| Score | Criteria |
|-------|----------|
| 5 | Clear handoffs, all skills aligned |
| 4 | Most handoffs clear |
| 3 | Some confusion between skills |
| 2 | Significant collaboration issues |
| 1 | No collaboration support |

### Optimization Score

| Score | Criteria |
|-------|----------|
| 5 | Multiple optimizations identified and documented |
| 4 | Some optimizations found |
| 3 | Limited optimization thinking |
| 2 | No optimization effort |
| 1 | Introducing new problems |

### Overall Score

- **Excellent (13-15):** Pro-level facilitation
- **Good (9-12):** Effective Scrum Master
- **Fair (5-8):** Needs improvement
- **Poor (1-4):** Not effective

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Better Approach |
|--------------|--------------|-----------------|
| Running daily standups | Irrelevant for continuous work | Update status on-demand |
| Sprint planning | No time-based cadence | Plan per-delivery, not sprint |
| Velocity tracking | No time dimension | Track completion rate |
| Retrospectives on schedule | Unnecessary for AI | Retrospect after major block |
| Role hierarchy | Skills are equal partners | Facilitate, don't command |
| Extensive process | Over-engineering | Lightweight facilitation |

## Edge Cases

### Edge Case 1: Circular Dependencies

**Situation:** Skills A and B depend on each other.

**Resolution:**
1. Identify which output is truly needed first
2. Have one skill run with provisional input
3. Second skill runs with real input
4. First skill re-runs if needed

### Edge Case 2: Skill Produces Wrong Output

**Situation:** A skill keeps producing poor output despite revisions.

**Resolution:**
1. Check if the skill is being used correctly
2. Check if input to skill is correct
3. If skill is fundamentally wrong → flag for skill rebuild
4. Document issue for future skill improvement

### Edge Case 3: User Changes Goal Mid-Delivery

**Situation:** User wants to pivot or change direction.

**Resolution:**
1. Acknowledge change request
2. Assess impact on current plan
3. Option A: Restart planning (Project Manager)
4. Option B: Refactor current plan
5. Option C: Complete current, start new separately

### Edge Case 4: Skills Have Conflicting Outputs

**Situation:** Skill A says X, Skill B says Y, both about same topic.

**Resolution:**
1. Identify the conflict
2. Determine which is more authoritative
3. Or: synthesize both perspectives
4. Document conflict resolution for transparency

### Edge Case 5: No Blockers but Stuck

**Situation:** All dependencies clear, but nothing is progressing.

**Resolution:**
1. Check if tasks are truly started
2. Check if there's implicit waiting
3. Check if orchestration is the blocker
4. Proactively advance tasks

## Sources and Rationale

This methodology draws from:
- **Scrum Framework:** Facilitation, servant leadership, continuous improvement
- **Kanban:** Flow optimization, limiting work in progress
- **Team Dynamics:** Collaboration patterns, handoff optimization
- **AI Adaptation:** Removal of time-based ceremonies, continuous execution

The key insight: AI agents don't need:
- Time-boxed ceremonies
- Human scheduling
- Sprint velocity tracking
- Capacity planning

What they do need:
- Clear dependencies
- Unblocked flow
- Effective collaboration
- Continuous optimization
