---
name: user-journey-mapping
description: Map the end-to-end user experience across a SaaS product lifecycle. Use when the user asks to map user journeys, understand user experience flows, identify friction points, map the customer lifecycle, optimize onboarding, find drop-off points, or asks "what does the user experience look like?" Covers multi-stage journey mapping from awareness through advocacy with emotion tracking, pain point scoring, and opportunity prioritization.
---

# User Journey Mapping

Map the end-to-end user experience across a SaaS product lifecycle, capturing actions, thoughts, emotions, pain points, and opportunities at each stage. Unlike raw LLM output that produces flat step lists, this skill creates multi-dimensional journey maps that track the user across five SaaS-specific stages (Awareness → Trial → Activation → Retention → Expansion/Advocacy), identify moments of truth, score pain point severity, and prioritize improvement opportunities with clear business impact.

## Core Workflow

### Step 1: Define the Journey Scope

Establish boundaries before mapping:

1. **Identify the persona.** Get from the user: role, company size, goals, technical sophistication, and key jobs-to-be-done. If the user provides multiple personas, map one journey at a time — start with the primary persona.
2. **Define the journey type.** Determine which journey to map:
   - **Full lifecycle** — Awareness through Advocacy (default)
   - **Stage-specific** — Deep dive into one stage (e.g., onboarding only)
   - **Task-specific** — A single workflow end-to-end (e.g., "create and send first campaign")
3. **Establish the product context.** Confirm: product category, pricing model (freemium, free trial, sales-led), primary value proposition, and current known issues.
4. **Identify data sources.** Ask what data exists: analytics, support tickets, churn interviews, NPS scores, session recordings. Tag each stage's confidence accordingly.

If the user provides minimal context, infer reasonable SaaS defaults and tag assumptions as Low confidence.

### Step 2: Map the Five Journey Stages

For each stage, identify what happens across multiple dimensions. Refer to [references/framework.md](references/framework.md) for detailed stage definitions.

**The five SaaS journey stages:**

| Stage | Starts When | Ends When |
|-------|------------|-----------|
| 1. Awareness | User first encounters the product | User decides to try it |
| 2. Trial | User signs up or starts a free trial | User hits the activation moment or trial expires |
| 3. Activation | User experiences the core value (aha moment) | User converts to paid or establishes a habit |
| 4. Retention | User is a paying/active customer | User churns or enters expansion |
| 5. Expansion/Advocacy | User deepens engagement | User becomes a champion, refers others, or upgrades |

For each stage, populate these dimensions:

- **User actions:** What the user physically does (clicks, reads, configures)
- **Touchpoints:** Where the interaction happens (website, app, email, support, community)
- **User thoughts:** What the user is thinking ("Is this worth my time?", "How do I do X?")
- **User emotions:** Emotional state mapped to the emotion curve (see framework.md)
- **Pain points:** Friction, confusion, frustration, or blockers
- **Moments of truth:** Critical decision points that determine whether the user progresses or drops off

### Step 3: Identify Moments of Truth

Locate and classify the three SaaS-critical moments. Refer to [references/framework.md](references/framework.md) for identification criteria.

1. **Aha Moment** — When the user first understands the product's value (Trial/Activation stage)
2. **Activation Moment** — When the user completes the action that correlates with long-term retention (Activation stage)
3. **Habit Moment** — When the product becomes part of the user's routine (Retention stage)

For each moment of truth:
- Define the specific trigger action
- Estimate the % of users who reach it (if data exists, use it; otherwise estimate and tag confidence)
- Identify what blocks users from reaching it
- State the business impact of improving conversion at this moment

### Step 4: Score Pain Points

Score every pain point identified in Step 2 using the severity framework in [references/framework.md](references/framework.md):

| Dimension | Scale | Description |
|-----------|-------|-------------|
| Frequency | 1-5 | How often users encounter this |
| Impact | 1-5 | How much it disrupts the experience |
| Breadth | 1-5 | What % of users are affected |

**Severity Score** = (Frequency + Impact + Breadth) / 3, rounded to 1 decimal.

Classify each pain point:
- **Critical (4.0-5.0):** Causes churn or blocks activation. Fix immediately.
- **Major (3.0-3.9):** Significant friction. Plan to fix this quarter.
- **Minor (1.0-2.9):** Annoyance but not a blocker. Backlog.

Tag each score with confidence level (High/Medium/Low) based on data source.

### Step 5: Map the Emotion Curve

Plot the user's emotional trajectory across all five stages:

1. Assign an emotion rating (-2 to +2) at each major touchpoint:
   - +2: Delighted, excited
   - +1: Satisfied, confident
   - 0: Neutral
   - -1: Frustrated, confused
   - -2: Angry, ready to leave
2. Identify the **emotional peaks** (best moments to reinforce) and **emotional valleys** (priority improvement targets).
3. Note the **emotional trend** entering each stage — is the user gaining or losing confidence?

The emotion curve is described textually as a sequence of touchpoints with ratings. Identify the overall shape: "U-shape" (starts high, dips during setup, recovers), "declining" (erosion over time), "ascending" (grows after initial friction), etc.

### Step 6: Identify Opportunities

For each stage, identify improvement opportunities:

1. **Convert pain points to opportunities.** Every Critical or Major pain point becomes an opportunity. State the fix, not just the problem.
2. **Find gaps in the journey.** Are there stages with no touchpoints? Missing communications? Silent periods where the user is left alone?
3. **Identify quick wins vs. structural changes.** Quick wins: copy changes, email triggers, UI tweaks. Structural: new features, flow redesigns, pricing changes.
4. **Prioritize opportunities** using the Opportunity Score from [references/framework.md](references/framework.md):

   Opportunity Score = Pain Severity × Business Impact × Feasibility

   Where Business Impact and Feasibility are each scored 1-5. Rank opportunities by score.

### Step 7: Synthesize and Recommend

Produce the final journey map output:

1. Compile the stage-by-stage map with all dimensions populated
2. Highlight the top 3 opportunities by Opportunity Score
3. Provide a recommended action plan: what to fix first, what to validate, what to defer
4. Note confidence levels throughout — where is the map based on data vs. assumptions?
5. Define success metrics for the top opportunities (what KPI moves if the fix works?)

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Journey Context** — persona, product, scope, data sources
- **Stage-by-Stage Journey Map** — actions, touchpoints, thoughts, emotions, pain points per stage
- **Moments of Truth** — aha, activation, and habit moments with conversion data
- **Pain Point Register** — scored and classified pain points
- **Emotion Curve** — emotional trajectory with peaks and valleys
- **Opportunity Register** — prioritized improvements with scores
- **Recommendations** — top 3 actions, success metrics, revisit triggers
- **Methodology Notes** — confidence distribution, data sources, limitations

Expected length: 2,000-4,000 words depending on journey scope (full lifecycle vs. single stage).

## Quality Criteria

- [ ] All five journey stages mapped with actions, touchpoints, thoughts, emotions, and pain points
- [ ] At least 3 moments of truth identified with specific trigger actions
- [ ] Every pain point scored on Frequency, Impact, and Breadth with rationale
- [ ] Emotion curve tracks across all stages with ratings at major touchpoints
- [ ] Opportunities are derived from pain points (not invented separately)
- [ ] Opportunity scores calculated and opportunities ranked
- [ ] Confidence levels tagged throughout (High/Medium/Low)
- [ ] SaaS-specific context maintained (trial conversion, activation, churn, expansion)
- [ ] Recommendations include specific success metrics (not just "improve onboarding")

## References

- **Journey stages, scoring rubrics, and moment-of-truth criteria:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (email marketing SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Mapping actions without emotions:** Listing what users do without capturing what they think and feel. A journey map that's just a flowchart misses the entire point. Every action should have a corresponding emotional state and user thought — these reveal *why* users drop off, not just *where*.

2. **Generic stage content:** Writing "user signs up" without specifics. What fields do they fill in? What's the CTA? What email do they get? Generic maps produce generic recommendations. Ground every touchpoint in the actual product experience.

3. **Treating all pain points as equal:** Listing pain points without scoring severity. "Confusing pricing page" and "app crashes during onboarding" are not the same severity. Always score and classify — this is what separates actionable maps from complaint lists.

4. **Missing the silent gaps:** Focusing only on where users interact and ignoring where they don't. The days between sign-up and first login, the week after trial expiry with no follow-up — these silent gaps are often where users are lost. Explicitly look for periods with no touchpoints.

5. **Confusing the aha moment with the activation moment:** The aha moment is cognitive ("I see how this helps me"), the activation moment is behavioral ("I completed the action that predicts retention"). They're related but distinct. Mixing them up leads to optimizing the wrong thing.
