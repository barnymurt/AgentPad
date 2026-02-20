# Output Schema: Usability Test Planning

This file defines the exact structure of the Usability Test Planning skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **user-journey-mapping:** `context.user_tasks` (key tasks to test)
- **wireframing:** `context.wireframes` (designs to test)

### Produces

This skill produces:
- `context.test.objectives` — Test goals
- `context.test.tasks[]` — Tasks with scenarios and metrics
- `context.test.protocol` — Session structure
- `context.test.logistics` — Participants, format, timing

---

## Output Structure

```
# Usability Test Plan: [Product/Feature]

## 1. Test Objectives (required)

### Purpose
- [What is being tested]
- [Why this test matters]

### Research Questions
1. [Question 1]
2. [Question 2]

### Success Criteria
- [What makes this test successful]

## 2. Task List (required)

### Task Prioritization

| Task | Priority | Why Test | Test? |
|------|----------|----------|-------|
| [Task 1] | P0 | Core task | Yes |
| [Task 2] | P0 | Core task | Yes |
| [Task 3] | P1 | Important | Yes |
| [Task 4] | P2 | Nice-to-have | No |

### Tasks to Test

#### Task 1: [Task Name]

**Scenario:**
```
[Context - set the scene]
[Task - what to do]
[Goal - success criteria]
```

**Success Metrics:**
| Metric | Target | How Measured |
|--------|--------|--------------|
| Completion rate | >80% | % completing |
| Time on task | <[X] sec | Stopwatch |
| Errors | <2 | Count |
| Satisfaction | >4/5 | Post-task rating |

**Notes:**
- [Any considerations]

[Repeat for each task]

## 3. Test Protocol (required)

### Session Structure

| Section | Time | Purpose |
|---------|------|---------|
| Introduction | 5 min | Welcome, consent |
| Warm-up | 5 min | Practice task |
| Tasks | 30-45 min | Main testing |
| Wrap-up | 5 min | Final questions |

**Total:** 45-60 minutes

### Introduction Script

```
Welcome! Thank you for participating.

Purpose: We're testing [what], not you. We want to improve [product].

Process: You'll complete [X] tasks. Think aloud - say what you're thinking.

Recording: With permission, we'll record [for research purposes].

Questions?
```

### Task Presentation

For each task:
1. Read scenario
2. "Go ahead"
3. Observe and note
4. "Any questions?"
5. Rate satisfaction (if applicable)

### Wrap-up Script

```
That's all the tasks. 

Final questions:
- What worked well?
- What was frustrating?
- Any other feedback?

Thank you for your time!
```

## 4. Logistics (required)

### Participants

**Target:**
- Number: [X] participants
- Source: [How recruited]
- Criteria: [Who]

**Screener Questions:**
1. [Question]
2. [Question]

### Test Format

- [ ] Remote / [ ] In-person
- [ ] Moderated / [ ] Unmoderated
- Platform: [Tool]

### Timing

- Session length: [X] minutes
- Sessions per day: [X]
- Total testing window: [Dates]

### Equipment

- [ ] Screen recording
- [ ] Audio recording
- [ ] Note-taking
- [ ] Observer access

## 5. Facilitator Guide (required)

### During Test

**Do:**
- [ ] Let users struggle (wait 10+ seconds)
- [ ] Ask "what are you thinking?"
- [ ] Note exact words
- [ ] Stay neutral
- [ ] Observe everything

**Don't:**
- [ ] Help too soon
- [ ] Ask "was that confusing?"
- [ ] Lead with questions
- [ ] Show frustration

### Probing Questions

| Type | Example |
|------|---------|
| Think aloud | "What are you thinking?" |
| Clarify | "What do you mean by...?" |
| Understand | "Why did you do that?" |
| Feeling | "How do you feel about...?" |

## 6. Analysis Plan (required)

### Metrics to Collect

| Metric | How |
|--------|-----|
| Completion rate | % completing each task |
| Time on task | Stopwatch |
| Errors | Count per task |
| Satisfaction | Post-task rating |

### Findings Template

```
## Task [X] Results

**Completion:** [X]% ([X]/[Y] users)
**Average time:** [X] seconds
**Errors:** [X] errors across [Y] users
**Satisfaction:** [X]/5 average

**Issues Found:**
1. [Issue] - [Severity]
2. [Issue] - [Severity]
```

---

## Validation Rules

1. Test objectives clearly defined
2. Tasks prioritized (P0/P1/P2)
3. 5-8 tasks selected
4. Scenarios realistic with context
5. Success metrics defined per task
6. Completion rate target set
7. Participant criteria defined
8. Number of participants specified
9. Test format selected (remote/in-person)
10. Facilitation tips provided

## Confidence Tagging

- **High:** Clear objectives, known participants
- **Medium:** Some assumptions about tasks
- **Low:** Unclear objectives, unknown participants

Apply confidence to task selection and metric targets.
