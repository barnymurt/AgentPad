---
name: process-mapping
description: Visualize and analyze business workflows to identify inefficiencies, bottlenecks, and automation opportunities. Use when the user needs to understand how work flows through their business, wants to improve processes, or needs to document workflows for system design. Use when the user says "map our process," "how does X work," "find bottlenecks," "improve our workflow," "document our process," or "what can we automate." Works with business processes, software development workflows, and operational processes.
---

# Process Mapping

Visualize and analyze business workflows to identify inefficiencies, redundancies, bottlenecks, and automation opportunities. Unlike raw LLM output that produces generic flowcharts, this skill systematically documents current processes, analyzes them for improvement opportunities, designs future-state processes, and recommends where automation adds value.

**Note**: This skill requires scope management to be effective. See Step 1 for requirements.

## Core Workflow

### Step 1: Define Scope and Gather Context

**Scope Management - Critical:**
- Identify 3-5 core processes maximum to map
- Avoid exhaustive mapping of entire organization
- Focus on processes relevant to the goal

**Gather context:**
1. **What processes matter most?** Ask user to identify priority processes
2. **What's the goal?** Improvement? Documentation? Automation?
3. **Who does the work?** Need stakeholder input
4. **What triggers the process?** Start conditions
5. **What's the output?** End conditions

**If scope is too broad:**
- Ask user to prioritize top 3-5 processes
- Suggest focusing on: highest volume, most problematic, or most valuable

### Step 2: Document As-Is Processes

Capture how things work today:

**For each process, document:**

1. **Steps** — Numbered sequence of actions
2. **Actors** — Who does each step
3. **Inputs** — What enters the process
4. **Outputs** — What exits the process
5. **Decisions** — Branching points with criteria
6. **Hand-offs** — Where work moves between people/systems
7. **Exceptions** — What goes wrong and how handled

**Documentation formats:**
- Flowchart symbols (start/end, process, decision, document, data)
- Swimlane diagrams (by actor/role)
- Step-by-step lists

**Validate with stakeholders:**
- Have users review the map for accuracy
- Confirm it matches how work actually happens
- Note: "The map shows how it should work, reality may differ"

### Step 3: Analyze for Problems

Identify issues in the current process:

**Analysis Dimensions:**

| Issue Type | Description | How to Find |
|------------|-------------|--------------|
| **Bottlenecks** | Slow steps that delay everything | Measure time per step, find longest |
| **Redundancies** | Duplicate efforts, repeated data entry | Look for same info requested multiple times |
| **Handoffs** | Delays between actors | Find wait states, approval chains |
| **Exceptions** | Special cases that complicate flow | Ask "what could go wrong?" |
| **Manual Steps** | Could be automated | Identify repetitive, rule-based tasks |
| **Decisions** | Complex branching | Find processes with many conditional paths |

**For each problem identified:**
- Location in process
- Frequency/impact
- Root cause (if identifiable)

### Step 4: Design To-Be Processes

Create improved future-state processes:

**Improvement Approaches:**

1. **Eliminate** — Remove unnecessary steps entirely
2. **Simplify** — Reduce complexity, fewer decisions
3. **Automate** — Use technology for manual tasks
4. **Reorder** — Change sequence for efficiency
5. **Combine** — Merge similar tasks
6. **Delegate** — Move to appropriate actor

**Design principles:**
- Minimize handoffs
- Reduce decision points
- Automate repetitive tasks
- Design for exceptions
- Clear start/end conditions

### Step 5: Assess Automation Opportunities

**Critical: Not everything should be automated**

For each potential automation:

**Automation Appropriateness Assessment:**

| Factor | Good for Automation | Bad for Automation |
|--------|--------------------|--------------------|
| **Repetition** | Done frequently | One-off, rare |
| **Rules** | Clear, consistent | Requires judgment |
| **Error rate** | Human error common | Already reliable |
| **Time** | Time-consuming | Quick already |
| **Data** | Digital input | Physical/analog |
| **Variability** | Standard inputs | Highly variable |

**Automation Risk Check:**
- [ ] What happens when it fails?
- [ ] Can humans override?
- [ ] Is there audit trail?
- [ ] What's the rollback plan?

### Step 6: Prioritize Improvements

Focus on quick wins:

**Priority Matrix:**

| | Low Effort | High Effort |
|---|---|---|
| **High Impact** | **Quick Wins** — Do first | **Strategic** — Plan for |
| **Low Impact** | **Fill-ins** — Do later | **Deprioritize** — Skip |

**Quick Win Criteria:**
- Takes <1 week to implement
- Improves measurable metric
- Low risk
- High user value

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Process Maps** — Visual diagrams of as-is and to-be processes
- **Analysis** — Identified problems with evidence
- **Automation Assessment** — What's suitable/not suitable for automation
- **Recommendations** — Prioritized improvement actions
- **Implementation Plan** — Quick wins first, strategic later

Expected length: 1,500-3,000 words

## Quality Criteria

- [ ] Scope limited to 3-5 priority processes
- [ ] As-is process documented with evidence (not assumptions)
- [ ] Process map validated with stakeholders
- [ ] Bottlenecks and inefficiencies identified with impact
- [ ] To-be process designed with improvement rationale
- [ ] Automation opportunities assessed for appropriateness
- [ ] Quick wins identified (high impact, low effort)
- [ ] Each recommendation has owner and timeline
- [ ] Process boundaries clearly defined (start/end triggers)

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (invoice process):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Mapping everything:** Trying to document every process in an organization. Scope creep leads to unusable maps. Focus on 3-5 priority processes.

2. **Perfect maps vs. useful maps:** Spending too much time on aesthetics instead of analysis. Good enough is better than perfect.

3. **Ignoring stakeholder input:** Creating maps based on assumptions instead of validating with people who do the work. Always verify with actual users.

4. **Automation everything:** Suggesting automation for everything without assessing appropriateness. Not all processes should be automated — some need human judgment.

5. **No prioritization:** Listing every improvement equally. Without prioritization, nothing gets done. Always apply quick wins framework.

6. **Skipping validation:** Presenting process maps as truth without confirming they match reality. "This is how it should work" ≠ "This is how it works."

7. **Missing exceptions:** Only mapping the happy path. Real processes have edge cases, errors, and exceptions. Document these too.

8. **No follow-through:** Creating beautiful maps but no action plan. Every map should have concrete next steps with owners.
