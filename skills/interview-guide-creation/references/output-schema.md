# Output Schema: Interview Guide Creation

This file defines the exact structure of the Interview Guide Creation skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **user-persona-creation:** `context.personas` (target participant definitions)
- **requirements-elicitation:** `context.research_objectives` (if defined)

### Produces

This skill produces:
- `context.interview.objectives` — Research goals
- `context.interview.criteria` — Participant criteria
- `context.interview.screener` — Qualification questions
- `context.interview.questions` — Main questions
- `context.interview.probes` — Follow-up techniques
- `context.interview.tips` — Facilitation guidance

---

## Output Structure

```
# Interview Guide: [Research Topic]

## 1. Research Overview (required)

### Research Type
- [ ] Discovery
- [ ] Validation
- [ ] Feedback
- [ ] Evaluation

### Research Objectives
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

### Target Participants
- Role: [Description]
- Experience: [Level]
- Company size: [If B2B]

## 2. Participant Criteria (required)

### Screener Questions

| # | Question | Yes Criteria | No Criteria |
|---|----------|--------------|-------------|
| 1 | [Question] | [Pass] | [Fail] |
| 2 | [Question] | [Pass] | [Fail] |
| 3 | [Question] | [Pass] | [Fail] |

### Recruitment Sources
- [ ] Customer list
- [ ] LinkedIn outreach
- [ ] Professional networks
- [ ] Recruitment platform
- [ ] Other: [Source]

### Target Participants
- Number: [X-Y] participants
- Duration: [X] minutes per interview

## 3. Interview Structure (required)

### Timing

| Section | Time | Purpose |
|---------|------|---------|
| Opening | [X] min | Welcome, purpose, consent |
| Warm-up | [X] min | Build rapport, context |
| Core Questions | [X] min | Main research |
| Deep-dive | [X] min | Priority topics |
| Wrap-up | [X] min | Summary, thank you |

**Total:** [X] minutes

## 4. Screener Script (required)

```
Hi [Name], thanks for your interest in our research. This will only take 2-3 minutes.

1. [First screener question]
   - [Response]
   - [If yes → continue, if no → thank and close]

2. [Second screener question]
   - [Response]
   - [If yes → continue, if no → thank and close]

[Continue...]

Great, we'd love to chat! Can you share your email to send calendar invite?
```

## 5. Interview Questions (required)

### Opening Script

```
Thank you for taking the time to speak with me today. 

The purpose of our conversation is [research purpose]. 

This will take about [X] minutes. I'll be taking notes, and with your permission, I'll record this for reference. 

There are no right or wrong answers - I'm just interested in your honest experiences and perspectives. 

Let's get started with some background...
```

### Warm-up Questions

| # | Question | Purpose |
|---|----------|---------|
| Q1 | [Question] | [Context] |
| Q2 | [Question] | [Context] |

### Core Questions

| # | Question | Objective | Follow-ups |
|---|----------|-----------|------------|
| Q1 | [Open-ended question] | [Related to objective] | [Probes] |
| Q2 | [Open-ended question] | [Related to objective] | [Probes] |

### Deep-dive Questions

| # | Question | Why Important |
|---|----------|---------------|
| Q1 | [Key question] | [Rationale] |

### Wrap-up Script

```
That's all my questions. Is there anything else you'd like to share that we haven't covered?

Thank you so much for your time. Your insights are really helpful. 

[If recording:] I'll send a summary in the next few days. 

Any questions for me?
```

## 6. Follow-up Probes (required)

### Standard Probes

| Probe | When to Use | Example |
|-------|-------------|---------|
| Silence | After answer, wait | [Wait 5 seconds] |
| "Tell me more" | Want depth | "Can you tell me more about that?" |
| Example | Need specifics | "Can you give me a concrete example?" |
| Why | Understand reason | "Why is that important?" |
| How | Understand process | "How do you handle that?" |

### Probing Best Practices
- Don't rush through silences
- Follow interesting answers
- Get specific examples
- Explore contradictions

## 7. Interviewer Tips (required)

### Before Interview
- [ ] Review guide thoroughly
- [ ] Test recording setup
- [ ] Prepare notes template
- [ ] Have water ready

### During Interview
- [ ] Be conversational
- [ ] Build rapport
- [ ] Listen more than talk
- [ ] Take notes
- [ ] Watch for non-verbal cues
- [ ] Stay on time

### After Interview
- [ ] Record notes immediately
- [ ] Fill in gaps while fresh
- [ ] Note follow-up needed
- [ ] Send thank you within 24 hours

## 8. Pilot Plan (required)

### Recommended Pilot
- **Participants:** 1-2 people similar to target
- **Purpose:** Test questions, timing, flow
- **Adjust based on pilot:**
  - [ ] Remove confusing questions
  - [ ] Add missing topics
  - [ ] Adjust timing

---

## Validation Rules

1. Research objectives clearly defined
2. Participant criteria with screener questions
3. Recruitment guidance included
4. Interview structured with time allocation
5. Minimum 10 substantive questions
6. Questions open-ended (not yes/no in main section)
7. Follow-up probes included
8. Interviewer facilitation tips provided
9. Pilot test recommended
10. Questions sequenced logically

## Confidence Tagging

- **High:** Clear objectives, known participant pool
- **Medium:** Some assumptions about participants
- **Low:** Unclear objectives, unknown availability

Apply confidence to question relevance and recruitment feasibility.
