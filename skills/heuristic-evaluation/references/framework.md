# Framework: Heuristic Evaluation

This file provides detailed methodology for conducting usability heuristic evaluations.

## 1. Nielsen's 10 Usability Heuristics

### H1: Visibility of System Status

**Principle:** The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

**What to evaluate:**
- Loading indicators
- Progress feedback
- Success/error messages
- System response times

**Common issues:**
- No feedback during long operations
- Unclear what system is doing
- Delayed response without notification

---

### H2: Match Between System and Real World

**Principle:** The system should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon.

**What to evaluate:**
- Terminology
- Metaphors
- Information organization

**Common issues:**
- Technical jargon
- Inconsistent terms
- Icons without labels

---

### H3: User Control and Freedom

**Principle:** Users often choose system functions by mistake and need a clearly marked "emergency exit."

**What to evaluate:**
- Cancel/Back buttons
- Undo functionality
- Exit from flows

**Common issues:**
- No way to undo action
- Dead-end screens
- Forced linear flows

---

### H4: Consistency and Standards

**Principle:** Users should not have to wonder whether different words, situations, or actions mean the same thing.

**What to evaluate:**
- Action consistency
- Visual consistency
- Platform conventions

**Common issues:**
- Different labels for same action
- Inconsistent button styles
- Ignoring platform patterns

---

### H5: Error Prevention

**Principle:** Even better than good error messages is a careful design which prevents a problem from occurring in the first place.

**What to evaluate:**
- Input validation
- Constraints
- Confirmation for destructive actions

**Common issues:**
- No input validation
- Easy to make errors
- No confirmation for delete

---

### H6: Recognition Rather Than Recall

**Principle:** Minimize the user's memory load by making objects, actions, and options visible.

**What to evaluate:**
- Visible options
- Instructions
- Context retention

**Common issues:**
- Hidden options
- No instructions
- Context lost

---

### H7: Flexibility and Efficiency of Use

**Principle:** Shortcuts — hidden from novice users — may speed up the interaction for expert users.

**What to evaluate:**
- Shortcuts
- Customization
- Keyboard navigation

**Common issues:**
- No shortcuts for power users
- No customization
- No keyboard support

---

### H8: Aesthetic and Minimalist Design

**Principle:** Dialogues should not contain information which is irrelevant or rarely needed.

**What to evaluate:**
- Information relevance
- Visual hierarchy
- Clutter

**Common issues:**
- Too much information
- Low visual hierarchy
- Unnecessary elements

---

### H9: Help Users Recognize, Diagnose, and Recover from Errors

**Principle:** Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and suggest a solution.

**What to evaluate:**
- Error message clarity
- Problem indication
- Recovery suggestions

**Common issues:**
- Cryptic error messages
- No solution provided
- Blaming user

---

### H10: Help and Documentation

**Principle:** Even though it is better if the system can be used without documentation, it may be necessary to provide help that is easy to search, focused on tasks.

**What to evaluate:**
- Help availability
- Help relevance
- Search functionality

**Common issues:**
- Help hard to find
- Help not relevant
- No help available

---

## 2. Severity Rating Calibration

### Rating Scale with Examples

| Severity | Level | Example |
|----------|-------|---------|
| **4** | Catastrophic | User cannot complete primary task |
| **3** | Major | User completes task with significant frustration |
| **2** | Minor | User notices issue, easily overcomes |
| **1** | Cosmetic | User wouldn't notice without being told |
| **0** | Not a problem | No issue |

### Severity Factors

**Impact:** How much does this affect the user?
- High: Blocks task completion
- Medium: Causes frustration, delays
- Low: Minor annoyance

**Frequency:** How often do users encounter this?
- High: Every use
- Medium: Sometimes
- Low: Rarely

**Persistence:** Does the problem persist?
- High: Can't recover
- Medium: Can recover with effort
- Low: One-time, easily forgotten

---

## 3. Finding Documentation Template

```
## Finding #[N]

**Heuristic:** H# - [Name]
**Severity:** [0-4]
**Screen:** [Location]
**Component:** [Element]

**Description:**
[What the problem is - specific and observable]

**Scenario:**
[When does user encounter this?]

**Impact:**
[How does this affect the user?]

**Recommendation:**
[Specific, actionable fix]
```

---

## 4. Priority Matrix

### Quick Wins (Fix First)
- High severity (3-4)
- Low effort

### Strategic (Plan and Fix)
- High severity (3-4)
- High effort

### Fill-ins (Fix When Time Permits)
- Low severity (1-2)
- Low effort

### Deprioritize (Skip)
- Low severity (1-2)
- High effort

---

## 5. Evaluation Scope Guide

### Recommended Screen Count

| Product Complexity | Screens to Evaluate |
|-------------------|-------------------|
| Simple (5-10 pages) | 3-5 screens |
| Medium (10-50 pages) | 5-8 screens |
| Complex (50+ pages) | 8-10 screens |

### Screen Selection Criteria

**Priority factors:**
- Core user tasks
- High traffic
- Complex interactions
- Key conversion points

---

## 6. Expert vs. Novice Evaluation

### Expert Evaluator
- Can identify subtle issues
- Understands UX principles deeply
- Can hypothesize about user behavior
- More findings, higher confidence

### Novice Evaluator
- Focus on obvious issues
- May miss subtle problems
- Document what you notice
- Still valuable - fresh eyes

---

## 7. Integration with Other Skills

### Inputs (Consults)

- **wireframing:** Designs to evaluate
- **user-journey-mapping:** User flows to assess

### Outputs (Feeds)

- **design-team:** Findings for design fixes
- **development-team:** Findings for implementation
- **feature-prioritization:** Usability issues as features
