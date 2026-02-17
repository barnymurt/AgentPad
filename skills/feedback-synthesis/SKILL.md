---
name: feedback-synthesis
description: Synthesize user feedback from multiple sources into structured, actionable insights for SaaS product teams. Use when the user asks to analyze feedback, synthesize user research, make sense of survey results, interpret NPS comments, analyze support tickets, understand what users are saying, or asks "what are my users telling me?" Covers thematic analysis, source weighting, signal vs noise filtering, sentiment analysis, impact mapping, and prioritized recommendations.
---

# Feedback Synthesis

Synthesize user feedback from multiple sources (surveys, interviews, support tickets, reviews, NPS comments, social media) into structured, actionable insights for SaaS product teams. Unlike raw LLM output that summarizes feedback at face value, this skill applies thematic analysis methodology, weights feedback by source reliability and user segment, separates signal from noise, and produces prioritized recommendations tied to measurable product outcomes.

## Core Workflow

### Step 1: Inventory and Classify Feedback Sources

Catalog all available feedback before analysis:

1. **List every source.** Ask the user to provide or describe all feedback sources: survey responses, interview transcripts, support tickets, app store reviews, NPS comments, social media mentions, sales call notes, churn exit surveys, feature requests, community forum posts.
2. **Classify each source by type.** Assign a reliability tier per [references/framework.md](references/framework.md) — Tier 1 (direct interviews, usability tests), Tier 2 (surveys, NPS, support tickets), Tier 3 (reviews, feature requests), Tier 4 (social media, secondhand reports).
3. **Tag metadata per source.** For each: time period covered, sample size, user segment represented, collection method (solicited vs. unsolicited), and any known biases.
4. **Identify coverage gaps.** Which user segments are underrepresented? Which parts of the user journey have no feedback? Flag these gaps — absence of feedback is not absence of problems.

If the user provides raw unstructured feedback (e.g., a dump of comments), organize it into logical groups before proceeding.

### Step 2: Code and Tag Feedback Items

Apply open coding to extract meaning from individual feedback items:

1. **Read every feedback item.** Do not skim or sample — every item gets coded. For large datasets (100+), batch into groups of 20 and code systematically.
2. **Assign descriptive codes.** For each item, apply 1-3 short labels that capture the core meaning. Use in-vivo codes (the user's own words) when their phrasing is specific and vivid. Examples: "slow load times," "confused by permissions," "want Slack integration," "love the simplicity."
3. **Tag sentiment.** For each item, tag: Positive, Negative, Mixed, or Neutral. Where possible, note the intensity (strong negative vs. mild frustration). Refer to the sentiment rubric in [references/framework.md](references/framework.md).
4. **Tag user segment.** Link each item to a segment if identifiable: plan tier (free, pro, enterprise), tenure (new, established, churned), role (admin, end user, buyer), or company size.
5. **Tag product area.** Map each item to a product area: onboarding, core workflow, integrations, billing, performance, UI/UX, mobile, admin/settings, reliability.

### Step 3: Extract Themes

Group codes into higher-order themes:

1. **Cluster related codes.** Group codes that describe the same underlying issue or need. "Slow load times," "dashboard takes forever," and "reports timing out" all cluster under a theme like "Performance degradation."
2. **Name each theme.** Use clear, specific theme names that convey the insight — not vague labels. "Users struggle with role-based permissions" is better than "Permissions issues."
3. **Quantify each theme.** Count: how many feedback items, from how many unique users, across how many sources. Frequency alone is not enough — a theme mentioned 50 times by 3 users is different from one mentioned 10 times by 10 users.
4. **Assess theme strength.** Apply the signal scoring rubric from [references/framework.md](references/framework.md) — weight by source reliability, user segment alignment, frequency, and severity.
5. **Identify contradictions.** Where feedback conflicts (some love feature X, some hate it), flag it as a contradiction theme. Do not average away the disagreement — contradictions are signals, not noise.

Aim for 5-12 themes. Fewer than 5 suggests the feedback is too homogeneous or under-coded. More than 12 suggests themes need consolidation.

### Step 4: Filter Signal from Noise

Not all feedback deserves equal weight:

1. **Apply the signal vs. noise checklist** from [references/framework.md](references/framework.md). Evaluate each theme against: frequency, severity, segment alignment, source reliability, and trend direction.
2. **Downweight noise.** Edge cases, one-off complaints, feature requests from non-target users, and feedback that conflicts with product strategy should be noted but deprioritized.
3. **Elevate hidden signals.** Low-frequency but high-severity feedback (e.g., data loss, security concerns) gets elevated regardless of volume. Feedback from churned users gets extra weight — they already voted with their feet.
4. **Produce a signal ranking.** Order themes by signal strength (High / Medium / Low). Only High and Medium signal themes advance to recommendations.

### Step 5: Map Insights to Product Impact

Connect validated themes to product changes and expected outcomes:

1. **For each High/Medium signal theme**, define:
   - **The problem:** What the user is experiencing (in their words, not yours)
   - **The product change:** What could be built or changed to address it
   - **The expected outcome:** Which SaaS metric moves — churn reduction, activation improvement, NPS increase, expansion revenue, support ticket deflection
   - **Confidence level:** High (strong multi-source signal), Medium (moderate signal), Low (emerging pattern)
2. **Estimate impact magnitude.** Use the impact estimation framework in [references/framework.md](references/framework.md) — small (incremental improvement), medium (measurable metric movement), large (step-change in key metric).
3. **Note required validation.** For Medium/Low confidence themes, specify what additional data would confirm the insight.

### Step 6: Compile Synthesis Report

Produce the final output following [references/output-schema.md](references/output-schema.md):

1. **Executive summary.** 3-5 bullet points capturing the most important findings — what a PM or founder needs to know in 30 seconds.
2. **Source inventory table.** All sources with metadata and reliability tiers.
3. **Theme analysis.** Each theme with supporting evidence, quantification, and signal strength.
4. **Contradiction analysis.** Where feedback conflicts, what explains it, and how to resolve it.
5. **Impact map.** Theme → product change → expected outcome, ranked by priority.
6. **Recommendations.** Specific, actionable next steps — not vague "consider improving X."
7. **Gaps and limitations.** What the feedback doesn't tell you and what to investigate next.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Executive Summary** — top findings in 30-second scannable format
- **Source Inventory** — all feedback sources with reliability tiers and metadata
- **Theme Analysis** — coded themes with evidence, frequency, severity, and signal strength
- **Contradiction Analysis** — conflicting feedback with resolution recommendations
- **Impact Map** — themes mapped to product changes and expected SaaS metric outcomes
- **Prioritized Recommendations** — ranked actions with confidence levels
- **Gaps and Limitations** — coverage holes and areas needing further research

Expected length: 2,000-4,000 words depending on the number of sources and themes.

## Quality Criteria

- [ ] All feedback sources classified by reliability tier with metadata
- [ ] Every feedback item coded (not summarized without coding)
- [ ] Themes are specific and named descriptively (not generic labels)
- [ ] Each theme quantified by item count, unique user count, and source count
- [ ] Signal vs. noise filtering applied with explicit rationale
- [ ] Contradictions identified and analyzed (not averaged away)
- [ ] Impact map connects themes to specific SaaS metrics
- [ ] Confidence levels assigned to every recommendation (High/Medium/Low)
- [ ] Gaps in feedback coverage are identified
- [ ] SaaS-specific context maintained throughout (churn, activation, expansion, NPS)

## References

- **Thematic analysis methodology and scoring rubrics:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (team collaboration SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Summarizing instead of synthesizing:** Restating what users said without extracting themes or identifying patterns. Synthesis means finding the structure underneath the surface — not creating a bulleted recap of feedback. If the output reads like "10 users said X, 5 users said Y," it's a summary, not a synthesis.

2. **Treating all feedback as equal weight:** A casual app store review and a 45-minute interview with a power user do not carry the same signal. Always apply source reliability weighting. A single interview insight can outweigh dozens of review comments when the interview reveals the *why* behind behavior.

3. **Averaging away contradictions:** When some users love a feature and others hate it, the instinct is to say "mixed feedback." This destroys the signal. Contradictions almost always indicate a segment difference — dig into who said what and why. The answer is usually "power users want X, new users want Y."

4. **Confusing loudness with importance:** Vocal users and repeat complainers can dominate feedback volume without representing the majority. Always normalize by unique user count, not raw mention count. Five users filing 50 tickets is a different signal than 50 users filing one ticket each.

5. **Ignoring what's NOT in the feedback:** Users rarely provide feedback about things that work well or about needs they've already solved with workarounds. Absence of complaints about a feature does not mean the feature is good — it might mean users have given up or found alternatives. Always map feedback coverage against the full user journey to spot blind spots.
