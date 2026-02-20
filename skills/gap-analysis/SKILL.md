---
name: gap-analysis
description: Identify and prioritize differences between current state and desired state for products and processes. Use when the user has a vision or requirements and needs to understand what's missing, what needs to change, and what to focus on first — including capability gaps, process inefficiencies, and resource mismatches. Use when the user says "what are we missing," "what do we need to build," "analyze our capabilities," "what's the gap between where we are and where we want to be," or "what should we focus on." Works with SaaS products, internal tools, and business processes.
---

# Gap Analysis

Identify and prioritize the differences between current state and desired state. Unlike raw LLM output that lists obvious gaps, this skill applies structured analysis to surface critical gaps, assess their significance using impact/effort scoring, distinguish root causes from symptoms, and produce actionable recommendations with prioritization.

**Note**: This skill requires minimum inputs to produce useful output. See Step 1 for requirements.

## Core Workflow

### Step 1: Validate Prerequisites

Confirm minimum inputs exist before analyzing:

**Required Inputs (all must be present):**
- Current state description — What exists today (systems, processes, capabilities)
- Desired state definition — What the goal/vision/requirements specify
- Scope definition — What's included in this analysis

**Strongly Recommended Inputs:**
- Constraints — Budget, timeline, resource limitations
- Priorities — What matters most to stakeholders
- Existing efforts — What's already underway to close gaps

**If inputs are missing:**
- Ask the user to clarify current and desired state before proceeding
- If scope is unclear, suggest a scope and get agreement
- Do not proceed with vague or assumed states

### Step 2: Document Current State

Capture what's happening today:

1. **Systems & Capabilities:**
   - What technology exists?
   - What processes are in place?
   - What skills/capabilities exist on the team?
   - What's working well?

2. **Processes:**
   - How does work get done today?
   - What tools are used?
   - What are the hand-offs?

3. **Limitations:**
   - What's frustrating?
   - What's slow?
   - What's error-prone?

**Output:** Current state document with evidence, not just assertions. ("We use spreadsheets" — what spreadsheets? How?)

### Step 3: Document Desired State

Define where we want to be:

1. **From Requirements:**
   - What must the product do?
   - What are the functional requirements?
   - What are non-functional requirements?

2. **From Vision:**
   - What should be true?
   - What's the target experience?
   - What's the target capability?

3. **From Constraints:**
   - What's not allowed?
   - What's the budget/timeline?
   - What's the technical reality?

### Step 4: Map Gaps

Identify differences between current and desired:

1. **Gap Categories:**
   - **Missing** — Need to create (doesn't exist)
   - **Inadequate** — Exists but not good enough (needs improvement)
   - **Excess** — Have more than needed (could be removed)
   - **Misaligned** — Exists but wrong direction (needs change)

2. **Gap Structure:**
   ```
   Gap: [Brief title]
   Current: [What's happening now]
   Desired: [What should be happening]
   Evidence: [Why this is a gap]
   ```

3. **Scope Management:**
   - Identify top 5-10 significant gaps
   - Don't exhaustively list everything
   - Focus on gaps that matter for the goal

### Step 5: Assess Gap Significance

Score each gap using Impact × Effort:

**Impact (1-5):**
| Score | Description |
|-------|-------------|
| 5 | Critical — blocks core goal |
| 4 | High — significantly affects success |
| 3 | Medium — noticeable effect |
| 2 | Low — minor impact |
| 1 | Trivial — barely noticeable |

**Effort (1-5):**
| Score | Description |
|-------|-------------|
| 5 | Very High — major project |
| 4 | High — significant investment |
| 3 | Medium — moderate effort |
| 2 | Low — quick fix |
| 1 | Very Low — trivial |

**Priority Score:** Impact × Effort (higher = more urgent)

### Step 6: Root Cause Analysis

Distinguish symptoms from causes:

1. **Ask "Why?"** — For each gap, ask why it exists
2. **Trace upstream** — Find the underlying cause
3. **Group related gaps** — Multiple surface gaps may have one root cause
4. **Document root vs. surface:**

   ```
   Surface Gap: Slow onboarding
   Root Cause: No automated setup, manual config required
   
   Surface Gap: Support tickets high
   Root Cause: (above) + poor documentation
   ```

### Step 7: Recommend Approaches

For each gap, recommend how to close it:

1. **Build** — Create something new
2. **Buy** — Acquire (vendor, team, tool)
3. **Borrow** — Partner or outsource
4. **Block** — Accept gap and manage risk
5. **Benchmark** — Match industry standard

**For each recommendation:**
- Specific approach (build/buy/borrow/block)
- Dependencies (what must happen first)
- Timeline estimate
- Resource requirements

### Step 8: Create Action Plan

Prioritize and sequence:

1. **Quick Wins** (High Impact, Low Effort) — Do first
2. **Strategic Investments** (High Impact, High Effort) — Plan for
3. **Fill-Ins** (Low Impact, Low Effort) — Do when time permits
4. **Deprioritize** (Low Impact, High Effort) — Consider skipping

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — Top gaps and recommendations in 2-3 sentences
- **Current State** — Documented现状
- **Desired State** — Documented目标
- **Gap Map** — All identified gaps with categories
- **Gap Assessment** — Impact/effort scoring with prioritization
- **Root Cause Analysis** — Surface vs. root gaps
- **Recommendations** — Approach for each gap (build/buy/borrow/block)
- **Action Plan** — Prioritized list with sequencing

Expected length: 1,500-3,000 words

## Quality Criteria

- [ ] Minimum required inputs confirmed before analyzing
- [ ] Current state documented with evidence (not assumptions)
- [ ] Desired state clearly defined (from requirements or vision)
- [ ] Top 5-10 significant gaps identified (not exhaustive list)
- [ ] Each gap has impact and effort scores
- [ ] Root cause analysis distinguishes symptoms from causes
- [ ] Recommendations include specific approach (build/buy/borrow/block)
- [ ] Quick wins identified for immediate action
- [ ] "Acceptable gaps" noted where appropriate
- [ ] Recommendations have dependencies noted

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS onboarding):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Listing everything:** Exhaustively cataloging every difference rather than focusing on significant gaps. The user doesn't need 50 gaps — they need the top 5-10 that matter.

2. **Confusing symptoms with causes:** Listing "slow onboarding" as a gap without asking why. The real gap might be "no automated setup" or "poor documentation."

3. **No prioritization:** Treating all gaps equally. A gap blocking launch is different from a gap that's a nice-to-have. Always score and rank.

4. **Generic recommendations:** Saying "build a solution" without specifics. What's the approach? What's the timeline? What are the dependencies?

5. **Ignoring existing efforts:** Not asking what's already being done to close gaps. Duplicating work wastes resources.

6. **Accepting states at face value:** Not validating current state with evidence. "We have good UX" without defining what that means.

7. **Missing the "good enough" gaps:** Trying to close every gap. Some gaps don't matter. Identifying acceptable gaps is as important as identifying critical ones.

8. **No dependencies:** Recommending gap closure without noting what must happen first. Closing Gap B might require Gap A to be closed first.
