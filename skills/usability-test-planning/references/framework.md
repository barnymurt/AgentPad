# Framework: Usability Test Planning

This file provides detailed methodology for planning effective usability tests.

## 1. Task Prioritization

### Priority Framework

| Priority | Criteria | Testing |
|----------|-----------|---------|
| **P0 - Critical** | Core tasks, high impact | Always test |
| **P1 - Important** | Common tasks | Should test |
| **P2 - Nice-to-have** | Secondary tasks | Test if time |
| **P3 - Edge cases** | Rare scenarios | Skip |

### Selection Criteria

- **Frequency:** How often do users do this?
- **Impact:** How important to success?
- **Risk:** How likely to have issues?
- **New:** Is this new or changed?

### Task Count Guidelines

| Test Type | Tasks | Depth |
|-----------|-------|-------|
| Quick test | 3-5 | High |
| Standard | 5-8 | Medium |
| Comprehensive | 8-12 | Lower |

---

## 2. Scenario Writing

### Good Scenario Elements

```
[Context] - Set the scene
[Task] - What to accomplish  
[Goal] - Success criteria
```

### Scenario Examples

**Bad (leading):**
"Click the 'New Invoice' button, fill in the form with client info, add line items, and click Send."

**Good (task-focused):**
"You're a freelancer who just finished a project. Create an invoice for your client for $5,000 and send it to them."

### Scenario Checklist

- [ ] Real-world context
- [ ] Specific goal, not instructions
- [ ] Enough detail to be realistic
- [ ] No leading words
- [ ] Clear success criteria

---

## 3. Success Metrics

### Core Metrics

| Metric | Definition | Good Target |
|--------|------------|-------------|
| **Completion rate** | % completing successfully | >80% |
| **Time on task** | Seconds/minutes | Context-dependent |
| **Errors** | Number of mistakes | <2 |
| **Satisfaction** | Post-task rating | >4/5 |

### Severity Scale

| Issue | Impact | Action |
|-------|--------|--------|
| **Critical** | Blocks completion | Fix immediately |
| **Major** | Causes significant delay/frustration | Fix before launch |
| **Minor** | Causes minor confusion | Fix if easy |
| **Cosmetic** | No functional impact | Fix if time |

---

## 4. Participant Recruitment

### Recruitment Sources

| Source | Best For | Tips |
|--------|----------|------|
| Existing customers | Products with users | Offer incentive |
| User testing platforms | Broader reach | UserInterviews, Maze |
| Social media | Specific demographics | Careful screening |
| Friends/family | Early-stage tests | May be biased |

### Screening Questions

1. Do you use [product category]?
2. How often?
3. Are you involved in [relevant task]?
4. Available for [time]?

### Number of Participants

| Goal | Participants | Findings |
|------|---------------|----------|
| Find major issues | 5 | 85% of issues |
| Find most issues | 8 | 95% of issues |
| Quantitative data | 10+ | Statistical significance |

---

## 5. Test Formats

### Remote Testing

**Tools:** Zoom, UserTesting, Maze, Lookback

**Pros:**
- Geographic flexibility
- Lower cost
- Easy scheduling

**Cons:**
- Tech issues possible
- Less rapport
- Can't observe context

### In-Person Testing

**Pros:**
- Rich observations
- See real environment
- Build rapport

**Cons:**
- Geographic limits
- Higher cost
- Travel time

### Moderated vs. Unmoderated

**Moderated:**
- Clarify questions
- Ask follow-ups
- More time
- Better for complex tasks

**Unmoderated:**
- Scale quickly
- No interviewer bias
- Can't ask questions
- Good for simple tasks

---

## 6. Facilitation Guide

### During the Test

**Do:**
- Let users struggle (wait 10+ seconds)
- Ask "what are you thinking?"
- Note exact words
- Stay neutral
- Observe everything

**Don't:**
- Help too soon
- Ask "was that confusing?"
- Lead with questions
- Show frustration
- Answer how to use

### Probing Questions

| Type | Example |
|------|---------|
| Think aloud | "What are you thinking?" |
| Clarify | "What do you mean by...?" |
| Understand | "Why did you do that?" |
| Feeling | "How are you feeling about...?" |

---

## 7. Test Session Structure

### Introduction (5 min)

1. Welcome and thanks
2. Purpose of test
3. Consent to record
4. Think aloud instruction
5. Any questions?

### Warm-up (5 min)

1. Easy practice task
2. Get comfortable thinking aloud
3. Fix any tech issues

### Tasks (30-45 min)

1. Present scenario
2. Observe and note
3. Don't help unless stuck
4. Ask follow-up questions
5. Note time for each task

### Wrap-up (5 min)

1. Overall impressions
2. What worked well
3. What was frustrating
4. Any final thoughts
5. Thank you and incentive

---

## 8. Analysis Template

### Quantitative Summary

| Task | Completion Rate | Avg Time | Errors |
|------|----------------|----------|--------|
| Task 1 | 100% | 45s | 0 |
| Task 2 | 80% | 2min | 2 |

### Qualitative Findings

| Issue | Task | Severity | Recommendation |
|-------|------|----------|-----------------|
| Can't find button | Task 1 | Major | Make more prominent |

---

## 9. Integration with Other Skills

### Inputs (Consults)

- **user-journey-mapping:** Key user tasks
- **wireframing:** Designs to test

### Outputs (Feeds)

- **heuristic-evaluation:** Findings inform design fixes
- **iteration-planning:** Prioritize improvements
