# Worked Example: Feedback Synthesis

This example demonstrates the Feedback Synthesis skill applied to a team collaboration SaaS receiving mixed feedback from multiple sources.

## Scenario

**Product:** ThreadLoop — a team collaboration SaaS combining async messaging, document sharing, and lightweight project tracking for distributed teams (10-50 people)
**Target Market:** Series A-B remote-first companies, primarily tech and creative teams
**Stage:** Growth — 8,500 active users across 340 workspaces, $85K MRR, NPS of 32, 4.8% monthly churn
**Context provided:** User has feedback from 5 sources spanning the last quarter: NPS survey comments, support tickets, G2 reviews, 6 user interviews, and a churn exit survey. Product team needs to decide Q2 priorities.

## Input

> "We just wrapped up our quarterly feedback collection and I'm drowning in data. We have:
> - NPS survey from last month (420 responses, 38% response rate, with open-ended comments)
> - Last 90 days of support tickets (312 tickets)
> - Our G2 page reviews (28 new reviews this quarter)
> - 6 user interviews we conducted with power users (30-45 min each)
> - A churn exit survey (47 responses from users who cancelled)
>
> I need to figure out what our users are actually telling us and what to prioritize for Q2. We're a team collaboration tool for remote teams — async messaging plus docs plus basic project tracking. Our NPS dropped from 38 to 32 last quarter and churn ticked up from 4.2% to 4.8%. Something's going on but I can't pinpoint it."

## Reasoning

### Step 1: Inventory and Classify Feedback Sources

Five sources provided. Classified by reliability tier:

| Source | Tier | Rationale |
|--------|------|-----------|
| 6 user interviews | Tier 1 | Direct, deep, probed — highest reliability |
| NPS survey (420 responses) | Tier 2 | Structured, solicited, good sample size |
| Support tickets (312) | Tier 2 | Direct user problems, but skew toward bugs/confusion |
| Churn exit survey (47) | Tier 2 | Critical segment (churned users), but post-hoc rationalization risk |
| G2 reviews (28) | Tier 3 | Self-selected, tend extreme, but useful for theme discovery |

Coverage gaps identified: No feedback from free-tier users specifically, no onboarding-specific feedback, no data from the "silent middle" (users who are neither promoters nor detractors).

### Step 2: Code and Tag Feedback Items

Coded all ~813 feedback items. Key coding patterns emerged:

- "Notifications" appeared in 127 items across all sources
- "Search" appeared in 89 items, predominantly support tickets and interviews
- "Speed/performance" appeared in 74 items with increasing frequency in recent weeks
- "Love async messaging" appeared in 96 items — the product's core strength
- "Confusing project tracking" appeared in 63 items, heavily weighted in churn surveys

### Step 3: Extract Themes

Seven themes extracted from coding clusters. Validated each for frequency, source diversity, user diversity, coherence, and distinctness. Two contradiction patterns identified.

### Step 4: Filter Signal from Noise

Applied signal scoring rubric. Notification overload scored highest (23/25). Search functionality and project tracking confusion scored High. Performance scored Medium-High but trending upward. Some noise filtered: 8 requests for a "dark mode" from G2 reviews — frequent but low severity, no segment alignment signal.

### Step 5: Map Insights to Product Impact

Connected top themes to product changes and SaaS metrics. Notification overload and project tracking confusion both map directly to the churn increase. Search dysfunction maps to retention and engagement metrics.

## Output

---

# Feedback Synthesis: ThreadLoop

## 1. Executive Summary

- **Notification overload is the primary driver of the NPS drop and churn increase** — users across all segments report being overwhelmed by notifications, with 4 of 6 interviewees calling it their "biggest frustration," and it's the #1 theme in churn exit surveys.
- **The project tracking module is confusing mid-market teams** who expected more structure, creating a wedge between ThreadLoop's async-messaging strength and its "all-in-one" positioning. Churned users specifically cite this gap.
- **Search is functionally broken for teams with 6+ months of content**, with support tickets about "can't find" issues increasing 40% quarter-over-quarter. This is a silent churn risk — users don't complain loudly, they just stop using the product.
- **ThreadLoop's async messaging remains a genuine differentiator** — even detractors praise it. This strength should be protected, not diluted by feature additions.
- **Biggest gap:** No feedback from new users in their first 14 days. The onboarding experience is a blind spot in this data set.

## 2. Source Inventory

| Source | Type | Tier | Sample Size | Time Period | Segments Represented | Known Bias |
|--------|------|------|-------------|-------------|---------------------|------------|
| User interviews | Qualitative, 1:1 | Tier 1 (1.5x) | 6 interviews (30-45 min) | Last 4 weeks | Power users, team leads (Pro plan) | Skews toward engaged users; no churned or free users interviewed |
| NPS survey | Quantitative + open-ended | Tier 2 (1.0x) | 420 responses (38% rate) | Last month | All plans, broad cross-section | 62% non-response; respondents may skew toward opinionated users |
| Support tickets | Problem reports | Tier 2 (1.0x) | 312 tickets | Last 90 days | All plans, skews toward active users | Overrepresents bugs and confusion; misses strategic needs |
| Churn exit survey | Post-cancellation survey | Tier 2 (1.0x) | 47 responses | Last 90 days | Churned users across all plans | Post-hoc rationalization; users may cite easy reasons, not real ones |
| G2 reviews | Public reviews | Tier 3 (0.75x) | 28 reviews | Last 90 days | Mix of current and former users | Self-selected extremes; 18 positive (4-5 stars), 10 negative (1-3 stars) |

**Total feedback items analyzed:** 813
**Source diversity assessment:** Good coverage across source types and reliability tiers. Tier 1 source is limited to power users only, creating a gap in understanding new-user and free-tier experiences. Churn exit survey provides critical perspective from lost users. No behavioral data (analytics) was included — all findings are based on self-reported feedback.

## 3. Theme Analysis

### Theme 1: Notification Overload Drives Disengagement

**Summary:** Users are overwhelmed by the volume and irrelevance of notifications. The default notification settings send alerts for nearly every activity, and the customization options are buried in settings. Users report muting entire channels as a coping mechanism — which defeats the purpose of the product.

**Signal strength:** High signal (23/25) — Frequency: 5 (127 mentions), Severity: 5 (users muting channels = product failure), Segment: 4 (affects all paid segments), Source: 4 (all 5 sources), Trend: 5 (40% increase in notification complaints vs. prior quarter)

**Evidence count:** 127 items from 94 unique users across 5 sources
**Weighted frequency:** 127.0 (18 interview mentions × 1.5 + 52 NPS × 1.0 + 31 tickets × 1.0 + 12 churn survey × 1.0 + 19 G2 × 0.75 = 27.0 + 52.0 + 31.0 + 12.0 + 14.25 = 136.25)
**Severity:** Blocker — users are actively disabling product functionality to cope
**Sentiment:** 92% negative, 8% mixed
**Segments affected:** All paid plans; worst for teams >20 people; team leads and ICs affected differently (leads want more control, ICs want less noise)
**Representative quotes:**
- "I get 200+ notifications a day. I've muted everything except DMs, which means I miss important project updates. It's the opposite of what this tool should do." — Tier 1, Interview, Team Lead, Pro plan
- "The notification settings are so buried I didn't even know they existed. I just assumed this was how it worked and started checking the app less." — Tier 2, NPS comment, IC, Pro plan
- "Notifications were the #1 reason I cancelled. My team was spending more time managing alerts than actually collaborating." — Tier 2, Churn exit survey, Admin, Pro plan

**Product area:** Core workflow / Notifications

---

### Theme 2: Project Tracking Module Confuses More Than It Helps

**Summary:** The lightweight project tracking (kanban boards, task lists) is positioned as a key feature, but users find it underpowered compared to dedicated tools and confusing in how it integrates with messaging. Teams either ignore it entirely or attempt to use it and get frustrated by limitations, particularly around due dates, assignments, and status workflows.

**Signal strength:** High signal (20/25) — Frequency: 4 (63 mentions), Severity: 4 (drives churn in mid-market), Segment: 5 (highest in target segment — Series A-B teams), Source: 3 (Tier 1-2 sources primarily), Trend: 4 (increasing as more mid-market teams adopt)

**Evidence count:** 63 items from 48 unique users across 4 sources
**Weighted frequency:** 63.75 (9 interview × 1.5 + 18 NPS × 1.0 + 14 tickets × 1.0 + 15 churn survey × 1.0 + 10 G2 × 0.75 = 13.5 + 18.0 + 14.0 + 15.0 + 7.5 = 68.0)
**Severity:** High friction — not a blocker, but drives churn when teams realize the tool can't replace their project tracker
**Sentiment:** 78% negative, 15% mixed, 7% positive (the 7% like the simplicity)
**Segments affected:** Mid-market teams (20-50 people) most affected; small teams (<15) less impacted because their needs are simpler
**Representative quotes:**
- "We tried to use ThreadLoop for project tracking but there's no way to set dependencies or see a timeline. We went back to Asana within a week and now we're running two tools, which defeats the purpose." — Tier 1, Interview, PM, Pro plan
- "The kanban board is too basic. No custom fields, no automations, no due date reminders. It's a toy, not a tool." — Tier 2, Churn exit survey, Team Lead, Pro plan
- "I actually like that the project tracking is simple. We don't need another Jira. But I understand why bigger teams want more." — Tier 2, NPS comment, Founder, Free plan

**Product area:** Project tracking

---

### Theme 3: Search Fails for Mature Workspaces

**Summary:** Teams that have used ThreadLoop for 6+ months find search increasingly unusable. Results are irrelevant, there's no way to filter by date/author/channel, and file search doesn't work reliably. Users report spending significant time scrolling through channels to find content they know exists.

**Signal strength:** High signal (19/25) — Frequency: 4 (89 mentions), Severity: 4 (significant daily friction), Segment: 3 (affects established users across plans), Source: 4 (4 sources), Trend: 5 (40% increase QoQ — growing worse as content volume grows)

**Evidence count:** 89 items from 61 unique users across 4 sources
**Weighted frequency:** 86.5 (6 interview × 1.5 + 24 NPS × 1.0 + 47 tickets × 1.0 + 8 churn × 1.0 + 8 G2 × 0.75 = 9.0 + 24.0 + 47.0 + 8.0 + 6.0 = 94.0)
**Severity:** High friction — not a blocker on any single day, but compounds into significant time waste and frustration
**Sentiment:** 95% negative, 5% neutral
**Segments affected:** All plans, but disproportionately affects teams with 6+ months of usage (the users most likely to churn if not addressed)
**Representative quotes:**
- "I searched for 'Q4 budget proposal' and got results from random threads mentioning 'Q4' or 'budget' separately. I know the doc exists because I uploaded it. Took me 15 minutes to find it manually." — Tier 2, Support ticket, IC, Pro plan
- "Search is the #1 thing I'd fix. We have 8 months of conversations and documents and I can't find anything. It's becoming a real problem." — Tier 1, Interview, Team Lead, Enterprise plan
- "Please add date filters and author filters to search. Basic stuff." — Tier 2, NPS comment, Admin, Pro plan

**Product area:** Search / Information retrieval

---

### Theme 4: Async Messaging Is a Genuine Differentiator

**Summary:** Even users who are frustrated with other parts of the product consistently praise the async messaging experience. Thread-based conversations, thoughtful read receipts, and "reply later" functionality are cited as reasons users chose ThreadLoop over Slack. This is the product's moat.

**Signal strength:** High signal (19/25) — Frequency: 4 (96 positive mentions), Severity: n/a (positive theme), Segment: 5 (consistent across all segments), Source: 4 (all sources), Trend: 3 (stable — consistently mentioned)

**Evidence count:** 96 items from 78 unique users across 5 sources
**Weighted frequency:** 99.0 (12 interview × 1.5 + 38 NPS × 1.0 + 8 tickets × 1.0 + 6 churn × 1.0 + 22 G2 × 0.75 = 18.0 + 38.0 + 8.0 + 6.0 + 16.5 = 86.5)
**Severity:** n/a — positive theme
**Sentiment:** 94% positive, 6% mixed
**Segments affected:** All segments; strongest praise from teams that previously used Slack and switched
**Representative quotes:**
- "The threading model is SO much better than Slack. I can actually have a thoughtful conversation without it getting buried. This is why we switched and why we'll stay." — Tier 1, Interview, Engineering Manager, Pro plan
- "Reply later is the single best feature in any collaboration tool I've used. It respects my focus time." — Tier 2, NPS comment (Promoter, score 9), IC, Pro plan
- "Even though I'm frustrated with other parts of ThreadLoop, the messaging is leagues ahead of alternatives. That's what keeps me here." — Tier 3, G2 review (3 stars), Team Lead, Pro plan

**Product area:** Core workflow / Messaging

---

### Theme 5: Performance Degradation in Peak Hours

**Summary:** Users report slowness during peak collaboration hours (9-11am, 2-4pm in their timezone). Message loading, file previews, and the project board specifically are cited as slow. This is an emerging issue that has worsened over the quarter.

**Signal strength:** Medium signal (16/25) — Frequency: 3 (74 mentions), Severity: 4 (impacts daily workflow), Segment: 3 (affects larger teams more), Source: 3 (Tier 2-3 primarily), Trend: 4 (increasing — recent spike)

**Evidence count:** 74 items from 52 unique users across 3 sources
**Weighted frequency:** 62.75 (0 interview × 1.5 + 21 NPS × 1.0 + 38 tickets × 1.0 + 0 churn × 1.0 + 5 G2 × 0.75 = 0 + 21.0 + 38.0 + 0 + 3.75 = 62.75)
**Severity:** Moderate friction — annoying but not a stated churn reason (yet)
**Sentiment:** 88% negative, 12% neutral
**Segments affected:** Teams with 30+ members most affected; enterprise plan users more vocal
**Representative quotes:**
- "Every morning around 10am the app crawls. Loading messages takes 5-8 seconds. File previews just spin." — Tier 2, Support ticket, IC, Enterprise plan
- "Performance has gotten noticeably worse over the past month. We used to love how fast ThreadLoop was." — Tier 2, NPS comment, Admin, Pro plan

**Product area:** Performance / Infrastructure

---

### Theme 6: Integration Ecosystem Is Thin

**Summary:** Users want integrations with their existing tool stack — particularly Google Drive, GitHub, Figma, and calendar tools. The current integration library is limited, and the API is underdocumented. This theme is moderate in signal strength but comes disproportionately from the enterprise segment.

**Signal strength:** Medium signal (14/25) — Frequency: 3 (41 mentions), Severity: 3 (not blocking, but limits adoption), Segment: 4 (enterprise and mid-market), Source: 3 (Tier 2-3), Trend: 3 (stable)

**Evidence count:** 41 items from 33 unique users across 4 sources
**Weighted frequency:** 39.5 (3 interview × 1.5 + 12 NPS × 1.0 + 9 tickets × 1.0 + 5 churn × 1.0 + 16 G2 × 0.75 = 4.5 + 12.0 + 9.0 + 5.0 + 12.0 = 42.5)
**Severity:** Moderate friction — adoption blocker for specific teams, not a daily problem for current users
**Sentiment:** 72% negative, 28% neutral
**Segments affected:** Enterprise and mid-market teams; less relevant for smaller teams
**Representative quotes:**
- "We need Google Drive integration. We're not going to move our documents into ThreadLoop — we need ThreadLoop to work with what we already use." — Tier 1, Interview, Ops Lead, Enterprise plan
- "No GitHub integration is a non-starter for our engineering team." — Tier 2, Churn exit survey, CTO, Pro plan

**Product area:** Integrations / Ecosystem

---

### Theme 7: Onboarding Lacks Guidance for Team Setup

**Summary:** An emerging theme with limited evidence — new admins struggle to configure workspaces, set up channels, and get their team onboarded. The feedback is sparse because most sources don't capture early-journey feedback well, but what exists suggests a meaningful gap.

**Signal strength:** Low signal (10/25) — Frequency: 2 (18 mentions), Severity: 3 (impacts first impression), Segment: 2 (new admins only, small sample), Source: 2 (tickets and NPS only), Trend: 3 (stable)

**Evidence count:** 18 items from 15 unique users across 2 sources
**Weighted frequency:** 18.0 (0 interview × 1.5 + 7 NPS × 1.0 + 11 tickets × 1.0 + 0 churn × 1.0 + 0 G2 × 0.75 = 18.0)
**Severity:** Moderate friction — impacts first impression and time-to-value
**Sentiment:** 80% negative, 20% neutral
**Segments affected:** New workspace admins in their first 2 weeks
**Representative quotes:**
- "I created the workspace but then had no idea how to organize channels for my team. A template or wizard would've helped a lot." — Tier 2, Support ticket, Admin, Pro plan (Week 1)
- "We spent an hour figuring out the right setup. Some guidance on best practices for a team our size would've been great." — Tier 2, NPS comment, Admin, Pro plan

**Product area:** Onboarding

## 4. Contradiction Analysis

### Contradiction 1: Project Tracking Complexity

**Contradiction:** Some users say project tracking is "too basic" and needs more features, while others say they "love the simplicity" and don't want it bloated.

**Side A — "Too basic" (56 items, 41 users):** Predominantly mid-market teams (20-50 people), PMs, and team leads on Pro and Enterprise plans. These users expected ThreadLoop to replace a dedicated project tracker and found it couldn't.

**Side B — "Love the simplicity" (7 items, 7 users):** Predominantly small teams (<15 people), founders, and ICs on Free and Pro plans. These users don't want another complex tool and value the lightweight approach.

**Explanation:** This is a clear segment split. Larger teams have more complex project management needs (dependencies, custom fields, automations), while small teams just need basic task visibility. The product is caught between two value propositions.

**Resolution:** Do not try to build "Asana inside ThreadLoop." Instead, pursue two parallel strategies: (1) Improve the integration with dedicated project tools (addresses Side A without bloating the product), and (2) Keep the native project tracking simple but add 2-3 high-value improvements (due date reminders, basic custom fields) that satisfy Side B's adjacent needs without overwhelming them. This preserves the product's identity while serving both segments.

### Contradiction 2: Notification Preferences

**Contradiction:** Team leads want more granular notification controls (per-channel, per-thread, per-keyword), while ICs want notifications to "just work" with smart defaults that require no configuration.

**Side A — "More control" (34 items, 28 users):** Team leads and admins who manage multiple channels and projects. They need to triage across many contexts.

**Side B — "Smart defaults" (22 items, 19 users):** Individual contributors who want to focus on their work and trust the tool to surface what matters.

**Explanation:** Different roles have different information management needs. Leads are information routers; ICs are information consumers.

**Resolution:** Both sides can be satisfied with a single approach: implement smart default notification profiles (e.g., "IC Focus Mode," "Lead Overview Mode") that are selected during onboarding, with full granular controls available for users who want to customize. The key is that the default must be good enough that most users never need to touch settings.

## 5. Impact Map

| Priority | Theme | Product Change | Target Metric | Expected Impact | Confidence |
|----------|-------|---------------|---------------|-----------------|------------|
| 1 | Notification overload | Implement smart notification defaults with role-based profiles; add per-channel mute/priority controls; surface notification settings prominently in onboarding | Monthly churn rate | Large — directly cited by churned users; expect churn reduction of 1-2 points (4.8% → 3-3.8%) | High |
| 2 | Search fails for mature workspaces | Rebuild search with filters (date, author, channel, file type); implement full-text search for documents; add "recent searches" and saved searches | Retention (DAU/MAU) | Medium — addresses growing daily friction; expect 10-15% increase in search usage and improved retention in 6+ month cohorts | High |
| 3 | Project tracking confusion | Add integrations with Asana/Linear/Jira (don't rebuild); add due date reminders and basic custom fields to native tracking | Monthly churn rate | Medium — reduces "two tool" frustration for mid-market; expect churn reduction of 0.5-1 point in 20+ person teams | Medium |
| 4 | Performance degradation | Investigate and resolve peak-hour bottlenecks; establish performance SLA targets; add monitoring and alerting | NPS | Medium — performance is a hygiene factor; fixing it prevents further NPS decline rather than improving it; expect NPS stabilization | Medium |
| 5 | Integration ecosystem | Ship Google Drive and GitHub integrations; improve API documentation; publish integration roadmap | Enterprise conversion | Medium — removes adoption blockers for enterprise; expect 15-20% increase in enterprise trial-to-paid conversion | Medium |
| 6 | Onboarding guidance | Build workspace setup wizard with team-size-appropriate templates; add "getting started" checklist for admins | Activation rate | Small-Medium — limited evidence but high potential; expect 5-10% improvement in 14-day activation | Low |

## 6. Prioritized Recommendations

### Act Now (High confidence, High/Medium signal)

**1. Fix notification overload (Priority 1)**
Redesign the notification system with smart defaults. Ship in two phases: (a) Immediately expose notification settings in a more accessible location and add a "reduce notifications" quick toggle. (b) Build role-based notification profiles with an "IC Focus" and "Lead Overview" mode. This is the single highest-leverage fix for the churn increase.
- **Supporting themes:** Theme 1 (Notification overload), Contradiction 2 (Notification preferences)
- **Expected outcome:** Churn reduction of 1-2 points; NPS improvement of 3-5 points
- **Validation needed:** None — signal is overwhelming across all sources

**2. Rebuild search (Priority 2)**
Add date, author, channel, and file-type filters. Implement proper full-text document search. Add "recent searches" for repeat lookups. This is a compound problem that gets worse every day as workspace content grows — delaying this means more users hit the pain threshold.
- **Supporting themes:** Theme 3 (Search failures)
- **Expected outcome:** Improved retention in 6+ month cohorts; reduced support ticket volume for "can't find" issues (currently ~15% of all tickets)
- **Validation needed:** Minimal — check analytics for search abandonment rate to size the opportunity precisely

### Investigate Further (Medium confidence or single-source)

**3. Project tracking integration strategy (Priority 3)**
Before building, validate the segment split quantitatively. Survey 100 workspaces: "Do you use a dedicated project management tool alongside ThreadLoop?" If >50% say yes, prioritize building integrations (Asana, Linear, Jira). If <50%, invest in modest native improvements instead.
- **Why uncertain:** Contradiction between "too basic" and "love the simplicity" suggests a real segment split, but the exact ratio is unclear
- **Suggested method:** In-app survey targeting workspace admins; segment results by team size

**4. Performance investigation (Priority 4)**
Correlate support ticket timing with server metrics to identify specific bottlenecks. If it's a database scaling issue, it will worsen with growth. If it's a specific feature (e.g., file previews), it can be scoped and fixed.
- **Why uncertain:** No Tier 1 data; all evidence is user-reported. Need to verify with technical investigation
- **Suggested method:** Engineering deep-dive on peak-hour performance metrics; cross-reference with ticket timestamps

**5. Integration prioritization (Priority 5)**
Survey users on which integrations they'd value most. Current evidence points to Google Drive and GitHub, but the sample is small. If enterprise is a strategic priority, elevate this above performance.
- **Why uncertain:** Moderate signal, mostly from enterprise segment; unclear whether integrations would reduce churn or are more of a "nice to have"
- **Suggested method:** In-app feedback widget asking "What tools do you wish ThreadLoop connected with?" + analysis of which integrations churned users mentioned

### Monitor (Low signal, emerging)

**6. Onboarding friction (Priority 6)**
Evidence is thin (18 items, 2 sources) but the absence of onboarding feedback is itself a red flag — the feedback infrastructure may not be capturing early-journey pain.
- **Signal:** New admins struggle with initial workspace configuration
- **Threshold:** Implement a post-onboarding survey (Day 3 and Day 14). If >25% of new admins report setup confusion, escalate to "Investigate Further." Also check 14-day activation rates — if below 40%, onboarding is almost certainly a problem regardless of feedback volume.

## 7. Gaps and Limitations

**Underrepresented segments:**
- Free-tier users are barely represented (most feedback is from Pro and Enterprise). Their needs may differ significantly, and free-to-paid conversion insights are absent.
- New users (first 14 days) are a major blind spot. No interview data, sparse survey data. The onboarding experience is largely unmeasured.
- Non-admin end users — most feedback comes from admins and team leads. IC-specific pain points may be underreported.

**Missing journey stages:**
- Activation and onboarding: No structured feedback collection at this stage
- Upgrade decision point: No data on what motivates (or blocks) free-to-paid conversion
- Team expansion: No feedback on the experience of adding new team members to an existing workspace

**Source limitations:**
- The 6 user interviews were all with power users on Pro plans. This creates a Tier 1 source bias toward engaged, invested users. Churned users and free users were not interviewed.
- NPS response rate of 38% means 62% of users are unheard. Non-responders may differ systematically from responders.
- Support tickets overrepresent bugs and confusion, underrepresent strategic needs and feature gaps.

**Recommended next research:**
1. **Interview 4-6 recently churned users** (within 30 days of cancellation). This converts the Tier 2 churn exit survey data into Tier 1 data and reveals the *real* reasons behind cancellation.
2. **Implement a Day 3 + Day 14 onboarding survey** to close the biggest journey-stage gap. Even 3 questions ("What was hardest about getting started?", "Have you gotten value yet?", "What almost made you quit?") would dramatically improve visibility.
3. **Run a free-tier survey** targeting users who've been on free for 30+ days without upgrading. Understand what they value, what they're missing, and what would make them pay.
4. **Add session recording or heatmaps** for the search and notification settings pages to validate the self-reported friction with behavioral data.

---

## Quality Check

- [x] All 5 feedback sources classified by reliability tier with metadata
- [x] All 813 feedback items coded (not summarized without coding)
- [x] 7 themes extracted with specific, descriptive names
- [x] Each theme quantified by item count (127, 63, 89, 96, 74, 41, 18), unique user count, and source count
- [x] Signal vs. noise filtering applied with 5-dimension scoring (scores shown for each theme)
- [x] 2 contradictions identified and analyzed with segment-based resolution
- [x] Impact map connects each theme to specific SaaS metrics (churn, retention, NPS, activation, enterprise conversion)
- [x] Confidence levels assigned to every recommendation (High: 2, Medium: 3, Low: 1)
- [x] 4 specific gaps identified (free-tier, onboarding, non-admin, journey stages)
- [x] SaaS context maintained throughout (MRR, churn rate, NPS, activation, expansion)
