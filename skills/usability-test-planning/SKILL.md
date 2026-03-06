---
name: usability-test-planning
description: Design usability tests to evaluate if users can complete tasks effectively. Use when the user needs to conduct usability testing, evaluate a design or prototype, or assess how easily users can complete key tasks. Use when the user says "plan a usability test," "test this design," "how do we test usability," "what tasks should we test," or "usability test protocol." Creates test plans with tasks, scenarios, metrics, and facilitation guidance.
lifecycle: build
category: research
relatedBefore: wireframing,user-persona-creation
relatedAfter: feedback-synthesis,heuristic-evaluation
outputSummary: Usability test plan with tasks, scenarios, success metrics, and facilitation script
nextSteps: Conduct tests, then synthesize findings with feedback-synthesis and compare with heuristic-evaluation
specialization: qa
---

# Usability Test Planning

Design usability tests that produce actionable insights about user task completion. Unlike generic test plans, this skill creates structured test plans with properly prioritized tasks, realistic scenarios, clear success metrics, and facilitator guidance.

**Note**: This skill requires clear test objectives. See Step 1.

## Core Workflow

### Step 1: Define Test Objectives

**Before planning, establish:**

1. **What to test:**
   - New feature
   - Prototype
   - Existing design
   - Complete product

2. **What to learn:**
   - Can users complete key tasks?
   - Where do they get stuck?
   - How long does it take?
   - What's their satisfaction?

3. **Success criteria:**
   - What makes this test successful?
   - What decisions will this inform?

**If objectives unclear:**
- Ask user to define goals before proceeding
- Don't create test without purpose

### Step 2: Prioritize Tasks

**Task selection - Critical:**

Focus on tasks that are:
- **High impact:** Core to product value
- **High risk:** Complex or new
- **High frequency:** Done often by users

**Task Prioritization Matrix:**

| Priority | Criteria | Test? |
|----------|-----------|-------|
| P0 | Core tasks, high impact | Always |
| P1 | Important tasks | Usually |
| P2 | Nice-to-have | If time permits |
| P3 | Edge cases | Skip |

**Select 5-8 tasks maximum:**
- More tasks = less depth
- Focus on P0 and P1

### Step 3: Write Scenarios

**Scenario structure:**

1. **Context:** Set the scene
2. **Task:** What to do
3. **Success criteria:** How to measure

**Good scenario example:**
```
Context: You're a freelancer who just finished a project for a client.
Task: Create and send an invoice for $5,000 to your client.
Success: Invoice sent successfully
```

**Scenario guidelines:**
- Start with real-world context
- Give specific goals, not instructions
- Don't tell them how to do it
- Include enough detail to be realistic
- Avoid leading words

### Step 4: Define Success Metrics

**For each task, define:**

| Metric | Definition | Target |
|--------|------------|--------|
| **Completion rate** | % who complete successfully | >80% |
| **Time on task** | How long to complete | <target |
| **Errors** | Number of errors | <target |
| **Satisfaction** | User rating after task | >4/5 |

**Metric guidelines:**
- Set targets before testing
- Completion rate is most important
- Time is context-dependent
- Errors show usability issues

### Step 5: Determine Logistics

**Participant recruitment:**

| Source | Pros | Cons |
|--------|------|-------|
| Existing customers | Relevant, motivated | May be biased |
| Recruiting platforms | Broader pool | Less context |
| User testing services | Professional | Expensive |

**Target numbers:**
- 5 participants: Find major issues
- 8 participants: Find most issues
- 10+ participants: Quantitative data

**Test format:**

| Format | Best For | Considerations |
|--------|-----------|----------------|
| **Remote** | Broad reach, lower cost | Tech issues, less rapport |
| **In-person** | Rich feedback, observation | Geographic limits |
| **Moderated** | Clarify, probe | Time-intensive |
| **Unmoderated** | Scale, speed | No clarification |

### Step 6: Create Protocol

**Test session structure:**

1. **Introduction (5 min)**
   - Welcome
   - Purpose
   - Consent to record
   - Think aloud instruction

2. **Warm-up (5 min)**
   - Easy task
   - Practice thinking aloud

3. **Tasks (30-45 min)**
   - Present scenario
   - Observe
   - Note issues
   - Ask follow-up questions

4. **Wrap-up (5 min)**
   - Overall impressions
   - Additional feedback
   - Thank you

**Total time:** 45-60 minutes

### Step 7: Facilitator Tips

**During test:**

- Let users struggle (don't help too soon)
- Ask "what are you thinking?" not "is this confusing?"
- Note exact words and behaviors
- Stay neutral - don't lead
- Observe, don't interrupt unless stuck

**What to observe:**
- Hesitations
- Errors
- Frustrations
- Successes
- Comments

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Test Objectives** — Purpose and goals
- **Task List** — Prioritized tasks with scenarios
- **Metrics** — Success criteria per task
- **Protocol** — Session structure
- **Logistics** — Participants, timing, format

Expected length: 1,500-2,500 words

## Quality Criteria

- [ ] Test objectives clearly defined
- [ ] Tasks prioritized (P0/P1/P2)
- [ ] 5-8 tasks selected (not exhaustive)
- [ ] Scenarios realistic with context
- [ ] Success metrics defined per task
- [ ] Completion rate target set
- [ ] Participant criteria defined
- [ ] Number of participants specified
- [ ] Test format selected (remote/in-person)
- [ ] Facilitation tips provided

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Testing too many tasks:** Trying to test everything leads to shallow insights. Focus on 5-8 priority tasks.

2. **Leading scenarios:** Telling users how to do it, not what to accomplish. Give goals, not instructions.

3. **No success criteria:** Not defining what "success" looks like. Set targets before testing.

4. **Too few participants:** Testing with 2-3 people misses issues. 5 minimum, 8 is better.

5. **Helping too soon:** Jumping in when users struggle. Let them figure it out - that's where insights are.

6. **Biased questions:** Asking "was that confusing?" Instead ask "what were you thinking?"

7. **Skipping warm-up:** Starting with hard task. Use easy task to practice think-aloud.

8. **No practice run:** Testing without piloting. Always do a practice run first.
