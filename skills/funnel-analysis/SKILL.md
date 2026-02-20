---
name: funnel-analysis
description: Analyze conversion through sequential steps to identify where users drop off and why. Use when the user needs to understand "where are users leaving," "conversion optimization," "funnel visualization," "drop-off analysis," or "identify conversion bottlenecks." Maps user journeys through key steps and identifies opportunities to improve conversion rates.
---

# Funnel Analysis

Map and analyze how users move through sequential steps to identify where conversion happens and where it breaks down. Unlike basic analytics that show individual page visits, funnel analysis reveals the critical path users follow (or abandon) and quantifies the drop-off at each step.

**Note**: This skill requires event/behavior data. See Step 1.

## Core Workflow

### Step 1: Validate and Prepare Data

**Data Requirements - Critical:**

This skill requires event/behavior data. Before proceeding:

**Required Data Fields:**
- Event names (e.g., "viewed_pricing", "clicked_signup")
- User identifiers
- Timestamps for each event
- Session identifiers (for path analysis)

**Optional but Recommended:**
- User properties (plan, source, device)
- Revenue data (for revenue funnels)

**If Data is Insufficient:**
- Request event log with minimum 10,000 events
- Flag if unique users < 500 (limited statistical power)
- Note: Funnel analysis requires user journey data - cannot work with aggregate metrics only

### Step 2: Define Funnel Stages

**Choose the Right Funnel Type:**

| Funnel Type | Description | Best For |
|-------------|-------------|----------|
| **Linear** | Users must complete steps in sequence | Checkout, signup flows |
| **Branching** | Users can take different paths | Product onboarding, feature discovery |
| **Time-Based** | Users complete steps within time windows | Engagement sequences, re-engagement |

**Minimum Stages Required:** 4

A funnel with fewer than 4 stages is usually too coarse to identify meaningful optimization opportunities.

**Stage Selection Guidelines:**

1. **Include the Drop-off Points:**
   - Start: First touchpoint (landing, app open)
   - Middle: Key decision points
   - End: Conversion or goal completion

2. **Avoid Too Many Stages:**
   - More stages = more complexity = harder to optimize
   - 4-7 stages is optimal
   - Split long funnels into multiple shorter funnels

3. **Define Clear Stage Criteria:**
   - What counts as "completing" each stage?
   - What time window applies?

### Step 3: Calculate Conversion Rates

**Stage-by-Stage Calculation:**

```
Stage 1 → Stage 2: (Users at Stage 2) / (Users at Stage 1)
Stage 2 → Stage 3: (Users at Stage 3) / (Users at Stage 2)
Overall: (Users at final stage) / (Users at first stage)
```

**Metrics to Calculate:**

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **Conversion Rate** | Stage N+1 / Stage N | Step-by-step efficiency |
| **Overall Conversion** | Final / First | Total funnel efficiency |
| **Drop-off Rate** | 1 - Conversion Rate | Where users leave |
| **Time to Convert** | Median time from Stage 1 to final | How fast users convert |

**Critical: Calculate both Step-by-Step AND Overall**

- Step-by-step shows where to optimize
- Overall shows true business impact

### Step 4: Handle Multi-Path Funnels

**The Problem with Linear Funnels:**

Many user journeys are NOT linear. Users may:
- Bounce and return
- Take alternative paths
- Skip stages entirely
- Enter the funnel at different points

**Multi-Path Analysis:**

| Approach | When to Use |
|----------|-------------|
| **Strict Linear** | Well-defined flows (checkout, signup) |
| **Allow Re-entries** | Shopping carts, multi-session flows |
| **Any Order** | Feature exploration, content consumption |
| **First-to-Complete** | User can complete in any order |

**Decision Tree:**

```
Is the funnel a REQUIRED sequence?
├── Yes → Strict linear (checkout, signup)
├── No, users can skip → Allow re-entries
├── No, order doesn't matter → Any order
└── No, user chooses path → First-to-complete
```

**For Non-Linear Funnels:**
- Track completion BY ANY PATH
- Analyze which paths have best/worst conversion
- Don't penalize users for valid alternative journeys

### Step 5: Handle Returning Users

**Key Decision: First-Time vs. Returning**

| Approach | Best For | Consideration |
|----------|----------|---------------|
| **First-time only** | Acquisition analysis | Shows new user experience |
| **All users** | Total funnel health | Includes power users |

**Recommended:** Analyze BOTH separately

- First-time users reveal onboarding/friction issues
- Returning users reveal engagement/feature issues

**Returning User Treatment:**

1. **Segment by Visit Number:**
   - First visit: New user conversion
   - Returning: Repeat behavior

2. **Handle Same User Multiple Times:**
   - Option A: Count each attempt separately (higher volume)
   - Option B: Count only first attempt (true new user conversion)
   - Recommended: Analyze both, report both

3. **Time Windows:**
   - Define max time between stages (e.g., 24 hours for session, 30 days for consideration)

### Step 6: Identify Drop-off Points

**Finding the Real Problems:**

The stage with the LOWEST conversion is NOT always the biggest opportunity.

**Priority Framework:**

| Factor | Consider |
|--------|----------|
| **Absolute drop-off** | How many users lost at this step? |
| **Relative drop-off** | What % of remaining users drop here? |
| **Ease of fix** | How hard is it to improve this step? |
| **Impact** | What's the revenue/conversion impact? |

**The "Should I Fix This?" Matrix:**

| | Easy Fix | Hard Fix |
|---|---|---|
| **High Impact** | **Priority 1** - Fix now | **Priority 2** - Plan and fix |
| **Low Impact** | **Priority 3** - Fix when time permits | **Priority 4** - Deprioritize |

### Step 7: Recommend Optimizations

**Optimization Categories:**

1. **Remove Friction:**
   - Reduce form fields
   - Simplify navigation
   - Remove required steps

2. **Add Motivation:**
   - Social proof
   - Urgency/scarcity
   - Value proposition reinforcement

3. **Improve Clarity:**
   - Better copy
   - Clearer CTAs
   - Progress indicators

4. **Fix Technical Issues:**
   - Page load speed
   - Mobile optimization
   - Error handling

**Recommendation Structure:**
- Observation: What the data shows
- Diagnosis: Why users drop here
- Solution: Specific recommendation
- Expected Impact: Estimated improvement
- Priority: High/Medium/Low

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — Key findings and recommendations
- **Funnel Definition** — Stages, type, and criteria
- **Conversion Analysis** — Stage-by-stage and overall metrics
- **Drop-off Analysis** — Where users leave and why
- **Multi-Path Insights** — Alternative paths and their performance
- **Recommendations** — Prioritized optimizations

Expected length: 1,000-2,000 words

## Quality Criteria

- [ ] Data requirements validated (events, timestamps, minimum volume)
- [ ] Funnel type defined (linear/branching/time-based)
- [ ] Minimum 4 stages defined
- [ ] Stage criteria clearly specified
- [ ] Both step-by-step AND overall conversion calculated
- [ ] Multi-path handling documented
- [ ] Returning user treatment defined
- [ ] Drop-off points identified with priority
- [ ] Recommendations prioritized by impact and effort
- [ ] Visualization of funnel included

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS signup):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Defining funnel too narrowly:** Only including "happy path" users. Include all paths users actually take.

2. **Ignoring returning users:** Treating every visit as a new funnel attempt. Segment by user journey type.

3. **Fixing wrong stage:** Focusing on lowest % conversion rather than highest absolute drop-off.

4. **No multi-path analysis:** Assuming all users follow one path. Analyze alternative routes.

5. **Comparing apples to oranges:** Comparing funnels with different definitions, time windows, or user segments.

6. **Analysis without action:** Identifying drop-offs but not recommending specific fixes.

7. **Over-complicating:** Creating 12-stage funnels when 4-7 would work. Split complex flows.

8. **No baseline:** Not establishing what "good" looks like. Compare to industry benchmarks.
