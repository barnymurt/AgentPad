# Framework: Gap Analysis

This file provides detailed methodology for identifying, assessing, and prioritizing gaps between current and desired states.

## 1. Gap Categories

### Types of Gaps

| Category | Description | Example |
|----------|-------------|---------|
| **Missing** | Doesn't exist, need to create | No mobile app |
| **Inadequate** | Exists but not good enough | Manual reporting, slow |
| **Excess** | Have more than needed | Legacy features nobody uses |
| **Misaligned** | Exists but wrong direction | Wrong pricing model |

### Gap Dimensions

| Dimension | Description |
|-----------|-------------|
| **Capability** | What we can do |
| **Process** | How we do it |
| **Technology** | Tools and systems |
| **People** | Skills and capacity |
| **Governance** | Policies and controls |

---

## 2. Impact/Effort Scoring

### Impact Scoring

| Score | Level | Description |
|-------|-------|-------------|
| 5 | Critical | Blocks core goal or mission |
| 4 | High | Significantly affects success |
| 3 | Medium | Noticeable effect on outcomes |
| 2 | Low | Minor impact |
| 1 | Trivial | Barely noticeable |

### Effort Scoring

| Score | Level | Description |
|-------|-------|-------------|
| 5 | Very High | Major project, >3 months |
| 4 | High | Significant investment, 1-3 months |
| 3 | Medium | Moderate effort, 2-4 weeks |
| 2 | Low | Quick fix, <1 week |
| 1 | Very Low | Trivial, <1 day |

### Priority Matrix

```
                    EFFORT
               Low      High
            ┌─────────┬─────────┐
      High  │ QUICK   │STRATEGIC│
            │  WINS   │INVESTMENT│
IMPACT      ├─────────┼─────────┤
      Low   │ FILL-INS│DEPRIORITIZE│
            │         │          │
            └─────────┴─────────┘

Quick Wins:     Do first (high impact, low effort)
Strategic:      Plan and prioritize (high impact, high effort)
Fill-ins:       Do when time permits (low impact, low effort)
Deprioritize:   Consider skipping (low impact, high effort)
```

---

## 3. Root Cause Analysis

### The 5 Whys Technique

For each gap, ask "Why?" repeatedly to find root cause:

```
Gap: Onboarding takes 2 weeks

Why? Manual setup required
→ Why? No self-service system
→ Why? Product designed for enterprise first
→ Why? Initial team had enterprise background

Root Cause: Product strategy mismatch with target market
```

### Fishbone Diagram Categories

When analyzing root causes, consider:

| Category | Questions |
|----------|-----------|
| **People** | Skills gaps? Training needed? Capacity issues? |
| **Process** | Steps unnecessary? Hand-offs causing delays? |
| **Technology** | Tool limitations? Integration gaps? |
| **Environment** | Infrastructure issues? External dependencies? |
| **Materials** | Data quality? Content gaps? |
| **Measurement** | Not tracking right things? Reporting gaps? |

### Surface vs. Root Gaps

| Surface Gap | Root Gap |
|-------------|----------|
| High support tickets | Poor documentation |
| Slow onboarding | No automated setup |
| Low conversion | Misaligned pricing |
| Customer complaints | Incomplete features |

---

## 4. Gap Closure Approaches

### Build

Create something new internally.

**When:** Competitive advantage, core capability, have expertise
**Consider:** Time to market, opportunity cost, maintainability

### Buy

Acquire through vendor or acquisition.

**When:** Non-core, mature market exists, time-constrained
**Consider:** Cost, vendor lock-in, integration effort

### Borrow

Partner or outsource.

**When:** Limited internal capacity, expertise gap, shared risk
**Consider:** Partner reliability, IP concerns, coordination overhead

### Block

Accept gap and manage risk.

**When:** Gap is low priority, fixing is expensive, temporary situation
**Consider:** Risk level, mitigation strategies, review timeline

---

## 5. Evidence Gathering

### For Current State

| Source | What to Ask |
|--------|-------------|
| **Interviews** | How do you do X? What works? What doesn't? |
| **Observations** | Watch processes in action |
| **Documents** | Process docs, policies, specs |
| **Metrics** | Performance data, error rates, cycle times |
| **Feedback** | Support tickets, surveys, exit interviews |

### Validation Questions

- [ ] Can you show me an example?
- [ ] How often does this happen?
- [ ] What's the impact when it goes wrong?
- [ ] Has anyone tried to fix this before?
- [ ] What have you already tried?

---

## 6. Documentation Templates

### Gap Assessment Template

```
## Gap: [Title]

**Current State:**
[Description with evidence]

**Desired State:**
[Description from requirements/vision]

**Evidence:**
- [Evidence 1]
- [Evidence 2]

**Category:** Missing / Inadequate / Excess / Misaligned

**Impact:** [1-5]
**Effort:** [1-5]
**Priority Score:** [Impact × Effort]

**Root Cause:**
[If analyzed]

**Recommendation:** Build / Buy / Borrow / Block

**Dependencies:**
- [What must happen first]

**Timeline:** [Estimate]
```

### Gap Summary Table

| Gap | Current | Desired | Impact | Effort | Priority | Approach |
|-----|---------|---------|--------|--------|----------|----------|
| 1 | [State] | [State] | 5 | 2 | 10 | Build |
| 2 | [State] | [State] | 4 | 4 | 16 | Buy |
| 3 | [State] | [State] | 2 | 3 | 6 | Block |

---

## 7. Common Pitfalls

### Pitfall 1: The Exhaustiveness Trap

Trying to identify every possible gap.

**Solution:** Focus on top 5-10 gaps that matter for the goal.

### Pitfall 2: The Feature Factory

Listing missing features instead of capability gaps.

**Solution:** Group features into capabilities. "No mobile app" → "Mobile access capability gap."

### Pitfall 3: The Blame Game

Framing gaps as people problems.

**Solution:** Focus on systems and processes, not personalities.

### Pitfall 4: The Status Quo Bias

Accepting current state as inevitable.

**Solution:** Challenge assumptions. "We've always done it this way" is not a reason.

### Pitfall 5: The Solution Jump

Skipping gap analysis and jumping to solutions.

**Solution:** Fully understand the gap before recommending fixes.

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **requirements-elicitation:** Desired state definition
- **architecture-design:** Technical current state
- **stakeholder-analysis:** Priorities and constraints

### Outputs (Feeds)

- **roadmap-planning:** Prioritized gaps as work items
- **stakeholder-analysis:** Gap communication plan
- **feature-prioritization:** Gap-based feature ideas
