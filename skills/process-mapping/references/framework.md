# Framework: Process Mapping

This file provides detailed methodology for visualizing, analyzing, and improving business processes.

## 1. Process Mapping Notation

### Standard Symbols

| Symbol | Name | Meaning |
|--------|------|---------|
| ○ | Start/End | Process begins or ends |
| □ | Process | Action or task |
| ◇ | Decision | Branching point (yes/no) |
| → | Arrow | Flow direction |
| ⎍ | Document | Input/output document |
| ⎙ | Data | Data storage |
| ▭ | Swimlane | Actor/role boundary |

### Process Types

| Type | Description | Example |
|------|-------------|---------|
| **Primary** | Core value-adding processes | Order fulfillment |
| **Support** | Enable primary processes | HR, IT |
| **Management** | Govern and measure | Reporting, planning |

---

## 2. Process Analysis Techniques

### Bottleneck Identification

**Method:** Measure time and queue at each step

```
Step A: 5 min, no queue
Step B: 30 min, queue of 10 ← BOTTLENECK
Step C: 5 min, no queue
```

**Common Bottleneck Causes:**
- Manual approval required
- Single person/team responsible
- Complex decision-making
- External dependencies

### Redundancy Detection

**Signs of redundancy:**
- Same data entered multiple times
- Multiple people reviewing same thing
- Duplicate approval chains
- Rework due to errors

### Handoff Analysis

**Handoff friction points:**
- Waiting for response
- Unclear ownership
- Information loss between steps
- Time zone delays

---

## 3. Process Improvement Patterns

### The EISS Framework

| Approach | Description | Example |
|----------|-------------|---------|
| **Eliminate** | Remove unnecessary steps | Delete redundant approval |
| **Simplify** | Reduce complexity | Combine forms, shorten steps |
| **Standardize** | Create consistent process | Use templates |
| **Automate** | Use technology | Auto-fill, notifications |

### Improvement Questions

For each step, ask:
1. Is this step necessary?
2. Can it be done earlier/later?
3. Can someone else do it?
4. Can it be combined with another step?
5. Can it be automated?

---

## 4. Automation Appropriateness

### Good Candidates for Automation

| Characteristic | Why |
|----------------|-----|
| High volume | Saves most time |
| Repetitive | Same steps, same outcome |
| Rule-based | Clear if/then logic |
| Error-prone | Humans make mistakes |
| Time-sensitive | Fast response needed |
| 24/7 required | Humans need breaks |

### Poor Candidates for Automation

| Characteristic | Why |
|----------------|-----|
| Complex judgment | Requires human nuance |
| Highly variable | Hard to code rules |
| Relationship-based | Needs human touch |
| Creative | Needs innovation |
| Exception-heavy | Rules can't cover all |

### Automation Risk Assessment

| Risk | Mitigation |
|------|------------|
| System fails | Manual override, graceful degradation |
| Wrong output | Validation checks, human review |
| No audit trail | Logging, accountability |
| Can't handle exceptions | Human escalation path |

---

## 5. Process Documentation Templates

### Basic Process Map Template

```
## Process: [Name]

**Objective:** [What this process achieves]

**Scope:** [What's included/excluded]

**Start Trigger:** [What starts the process]

**End Result:** [What completes the process]

### As-Is Process

| Step | Actor | Action | Input | Output | Time |
|------|-------|--------|-------|--------|------|
| 1 | [Who] | [Does what] | [What] | [What] | [How long] |
| 2 | ... | ... | ... | ... | ... |

### Problems Identified

| Problem | Location | Impact | Root Cause |
|---------|----------|--------|------------|
| [Issue] | Step X | [High/Med/Low] | [Cause] |

### To-Be Process

[Improved process flow]

### Automation Opportunities

| Opportunity | Appropriateness | Risk |
|-------------|----------------|------|
| [Task] | [Good/Poor] | [Low/Med/High] |
```

---

## 6. Quick Wins Framework

### Identification Criteria

| Criteria | Threshold |
|----------|-----------|
| Effort | <1 week |
| Impact | Measurable improvement |
| Risk | Low |
| Value | High user benefit |

### Quick Win Examples

- Remove redundant approval step
- Auto-notify next person in chain
- Standardize form fields
- Add input validation
- Create template

---

## 7. Process Validation

### Validation Checklist

- [ ] Map reviewed by process participants
- [ ] Matches actual workflow (not ideal)
- [ ] Exceptions documented
- [ ] Times/queues measured (not guessed)
- [ ] Edge cases included

### Validation Questions

1. "Is this how it actually works?"
2. "What happens when things go wrong?"
3. "Where do things typically get stuck?"
4. "What takes the most time?"
5. "What's the most frustrating part?"

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **requirements-elicitation:** Process requirements, pain points
- **stakeholder-analysis:** Who does the work, priorities

### Outputs (Feeds)

- **user-journey-mapping:** Process as user experiences it
- **gap-analysis:** Process improvement gaps
- **technical-implementation:** Automation technical approach
- **feature-prioritization:** Process improvement features
