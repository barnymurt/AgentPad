---
name: heuristic-evaluation
description: Evaluate user interfaces against established usability heuristics to identify usability issues. Use when the user needs to assess a design, website, app, or prototype for usability problems. Use when the user says "evaluate this design," "usability review," "check for usability issues," "UX audit," "heuristic evaluation," or "identify usability problems." Applies Nielsen's 10 heuristics with severity ratings and actionable recommendations.
---

# Heuristic Evaluation

Evaluate user interfaces against established usability heuristics to identify issues and recommend fixes. Unlike raw LLM feedback that produces generic observations, this skill systematically applies Nielsen's 10 heuristics, rates severity consistently, and provides actionable recommendations prioritized by impact and effort.

**Note**: This skill requires evaluation scope and designs to review. See Step 1.

## Core Workflow

### Step 1: Define Evaluation Scope

**Scope Management - Critical:**

Limit evaluation to key screens to avoid surface-level review:

**Screen Prioritization:**
- P0 (Critical): Core user tasks, high traffic screens
- P1 (Important): Key supporting screens
- P2+: Skip for initial evaluation

**Recommended Scope:**
- 5-10 screens maximum for initial evaluation
- Select screens that cover major user tasks
- Include key flows (onboarding, checkout, settings)

**If too many screens:**
- Focus on P0 screens first
- Note remaining screens for follow-up evaluation

### Step 2: Calibrate Severity Ratings

Before evaluating, establish shared understanding:

**Severity Scale:**

| Level | Rating | Description | Example |
|-------|--------|-------------|---------|
| **0** | Not a problem | No issue found | - |
| **1** | Cosmetic | Fix if time permits | Minor visual issue |
| **2** | Minor | Low priority, should fix | Easy to overcome |
| **3** | Major | High priority, important fix | Causes significant delay |
| **4** | Catastrophic | Must fix before launch | Blocks completion |

**Calibration Examples:**

| Severity | Example |
|----------|---------|
| 4 | User cannot complete primary task |
| 3 | User can complete but with significant frustration |
| 2 | User notices but easily overcomes |
| 1 | User wouldn't notice without pointing out |
| 0 | No usability issue |

**Note evaluator expertise:**
- Expert: Experienced UX professional
- Novice: Non-UX person conducting evaluation
- Adjust depth of findings accordingly

### Step 3: Apply Nielsen's 10 Heuristics

For each screen, evaluate against all heuristics:

**H1: Visibility of System Status**
- Is the user informed of what's happening?
- Appropriate feedback provided within reasonable time?

**H2: Match Between System and Real World**
- Does the system speak the user's language?
- Words, phrases, concepts familiar to user?

**H3: User Control and Freedom**
- Clearly marked "emergency exit"?
- Undo/redo functionality?

**H4: Consistency and Standards**
- Consistent terminology/actions within system?
- Platform conventions followed?

**H5: Error Prevention**
- Good error prevention vs. good error handling?
- Defaults, constraints, confirmation?

**H6: Recognition Rather Than Recall**
- Visible elements, options, actions?
- Instructions visible or easily retrievable?

**H7: Flexibility and Efficiency of Use**
- Shortcuts for experts?
- Customization available?

**H8: Aesthetic and Minimalist Design**
- Relevant information only?
- Dialogues free of irrelevant information?

**H9: Help Users Recognize, Diagnose, Recover from Errors**
- Error messages in plain language?
- Precise problem indicated?

**H10: Help and Documentation**
- Help easy to search?
- Task-focused, not too extensive?

### Step 4: Document Findings

For each issue found:

```
Issue #N
- Heuristic: [H#]
- Severity: [0-4]
- Description: [What the problem is]
- Location: [Screen, element]
- Scenario: [When user encounters issue]
- Impact: [How it affects user]
```

### Step 5: Recommend Fixes

For each finding, provide actionable recommendation:

**Recommendation Structure:**
- What to change
- Why it matters
- How to fix it
- Priority (based on severity + effort)

### Step 6: Prioritize Findings

**Priority Matrix:**

| | Low Effort | High Effort |
|---|---|---|
| **High Severity** | **Quick Wins** — Fix first | **Strategic** — Plan and fix |
| **Low Severity** | **Fill-ins** — Fix when time permits | **Deprioritize** — Skip |

**Prioritization Factors:**
- Severity of issue
- Effort to fix
- Number of users affected
- Business impact

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — Key findings overview
- **Scope Definition** — Screens evaluated
- **Findings by Heuristic** — Issues organized by heuristic
- **Severity Summary** — Distribution of issues
- **Recommendations** — Prioritized fix list
- **Priority Matrix** — Quick wins vs. strategic fixes

Expected length: 1,500-3,000 words

## Quality Criteria

- [ ] Scope defined (5-10 key screens)
- [ ] Severity calibrated with examples
- [ ] All 10 heuristics applied
- [ ] Each finding has severity rating (0-4)
- [ ] Findings include location and scenario
- [ ] Each finding has actionable recommendation
- [ ] Recommendations prioritized by severity + effort
- [ ] Quick wins identified
- [ ] Evaluator expertise noted
- [ ] Scope management applied (not exhaustive)

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS dashboard):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Evaluating too many screens:** Trying to evaluate everything leads to surface-level review. Limit to 5-10 key screens.

2. **Inconsistent severity ratings:** Without calibration, ratings become subjective. Use calibration examples.

3. **Vague recommendations:** "Improve usability" isn't actionable. Be specific: "Add inline validation to form field."

4. **Ignoring severity 1 issues:** Even cosmetic issues should be documented. They add up.

5. **No prioritization:** Treating all findings equally. Use severity + effort matrix.

6. **Forgetting user context:** Issues in isolation. Consider: When does this issue occur? For whom?

7. **Surface-level findings:** Only noting obvious issues. Dig deeper into each heuristic.

8. **Skipping documentation:** Not recording where issues found makes fixes harder. Document location precisely.
