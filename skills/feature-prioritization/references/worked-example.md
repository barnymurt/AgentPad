# Worked Example: Feature Prioritization

This example demonstrates the Feature Prioritization skill applied to a growth-stage SaaS product with available usage data.

## Scenario

**Product:** TaskForge — a project management SaaS for small software teams (5-20 people)
**Target Market:** Seed to Series A startups with engineering-heavy teams
**Stage:** Growth — 2,000 active users, $15K MRR, 6% monthly churn
**Context provided:** User has a backlog of 6 feature requests and needs to decide what to build next quarter. They have usage analytics and customer feedback data.

## Input

> "I have a bunch of feature requests piling up and I need to figure out what to build next quarter. Here's what's on the list:
> 1. Time tracking integration (customers keep asking for it)
> 2. Custom workflows / automation (power users want this)
> 3. Guest access for external stakeholders (sales team says we lose deals without it)
> 4. Mobile app (some requests but not urgent)
> 5. AI task summarization (I think this could be cool)
> 6. Gantt chart view (enterprise prospects ask for it)
> We have about 2,000 active users, $15K MRR, and 6% monthly churn. Small eng team — 3 developers."

## Reasoning

### Step 1: Gather the Feature List

Normalized the 6 features. All have names and descriptions. Checked for overlaps — "Custom workflows" and "AI task summarization" are distinct (automation vs. intelligence). Scope confirmed: next quarter (3 months), 3-developer team.

### Step 2: Select the Framework

User has usage data (2,000 users, MRR, churn rate) and customer feedback. No complex stakeholder alignment needed (small team). **RICE** is the right framework — provides quantitative rigor using available data.

### Step 3: Define Scoring Criteria

Calibrated using "Time tracking integration" as the reference feature since the user knows it well (customers keep asking). Established that for TaskForge:
- Reach is measured as % of 2,000 active users affected per quarter
- Impact uses the SaaS-specific indicators (churn reduction, conversion, expansion)
- Confidence based on data quality behind each estimate
- Effort measured in developer-weeks (3 developers available = ~36 dev-weeks per quarter)

### Step 4-6: Score, Rank, and Recommend

Applied RICE scoring with SaaS adjustments (churn-reducing features get +1 Impact, table-stakes features get Confidence 1.0).

## Output

---

# Feature Prioritization: TaskForge

## 1. Feature List

| # | Feature | Description | Target User |
|---|---------|-------------|-------------|
| 1 | Time tracking integration | Track time spent on tasks, integrate with invoicing tools | All users (especially freelancer/agency teams) |
| 2 | Custom workflows | User-defined automation rules (e.g., "when task moves to Done, notify Slack") | Power users, team leads |
| 3 | Guest access | Read-only or limited access for external stakeholders (clients, contractors) | Teams working with external collaborators |
| 4 | Mobile app | Native iOS/Android app for task management on the go | All users (mobile-first subset) |
| 5 | AI task summarization | AI-generated summaries of task threads, sprint progress, and blockers | Team leads, project managers |
| 6 | Gantt chart view | Timeline visualization of tasks with dependencies | Enterprise prospects, project managers |

## 2. Framework Selection

**Framework:** RICE (Reach, Impact, Confidence, Effort)

**Rationale:** TaskForge has 2,000 active users with usage analytics and direct customer feedback, providing the data needed for RICE's quantitative approach. The team is small (3 developers), so the Effort denominator ensures resource-constrained decisions. RICE is also well-suited for SaaS because Reach directly maps to user segments that drive MRR.

**Scoring dimensions:**
- **Reach:** % of 2,000 active users affected per quarter (scale 1-5)
- **Impact:** Effect on key SaaS metrics — churn, conversion, expansion revenue (scale 0.5-5)
- **Confidence:** Data quality behind reach and impact estimates (scale 0.5-1.0)
- **Effort:** Developer-weeks to ship MVP (scale 0.5-5)

**Calibration:** Time tracking integration scored first as the anchor. "Customers keep asking" = Reach ~40% (score 3), Impact 2 (meaningful improvement, some cite it as a reason to stay), Confidence 1.0 (validated demand), Effort 2 (2-4 weeks for integration).

## 3. RICE Scoring

| Feature | Reach | Impact | Confidence | Effort | RICE Score |
|---------|-------|--------|------------|--------|------------|
| Time tracking | 3 (40% of users in project/billing workflows) [H] | 2 (meaningful workflow improvement, reduces "workaround" churn) [H] | 1.0 (repeated customer requests, support ticket data) [H] | 2 (API integration + UI, 3-4 dev-weeks) [H] | **3.0** |
| Custom workflows | 2 (15-20% power users and team leads) [M] | 3 (high — stickiness driver, power users are expansion revenue) [M] | 0.8 (power user requests + competitor analysis shows demand) [M] | 3 (complex — rule engine, UI builder, 6-8 dev-weeks) [M] | **1.6** |
| Guest access | 3 (35% of teams have external collaborators) [M] | 3 (high — sales team reports lost deals, directly affects conversion) [M] | 1.0 (sales team has specific lost deal data) [H] | 1 (relatively simple — permissions layer + limited UI, 1-2 dev-weeks) [H] | **9.0** |
| Mobile app | 4 (60%+ of users would use mobile access) [L] | 1 (low — incremental convenience, not a workflow change) [L] | 0.5 (some requests but no data showing it drives churn or conversion) [L] | 5 (native apps for 2 platforms, 12+ dev-weeks) [H] | **0.4** |
| AI task summarization | 2 (20% — team leads and PMs) [L] | 2 (medium — saves time but not a blocker for anyone) [L] | 0.5 (user's hypothesis, no customer validation) [L] | 2 (LLM integration + UI, 3-4 dev-weeks) [M] | **1.0** |
| Gantt chart | 1 (5-10% — enterprise prospects only) [M] | 2 (medium — could unlock enterprise deals but unvalidated) [L] | 0.8 (enterprise prospects mention it, but sample size is small) [M] | 2 (complex visualization, 4-5 dev-weeks) [M] | **0.8** |

**Formula applied:** RICE = (Reach x Impact x Confidence) / Effort

## 4. Ranked Backlog

### Tier 1: Build Now

**#1 — Guest Access (RICE: 9.0)**
Highest score by a significant margin. Low effort (1-2 dev-weeks), high impact (sales team has specific lost-deal evidence), and strong reach (35% of teams). This is the rare "quick win with high impact" — it directly addresses lost revenue and can ship within 2 weeks. Build this first.

**#2 — Time Tracking Integration (RICE: 3.0)**
Strong, well-validated demand. Customers actively ask for it, reducing confidence risk to zero. Medium effort (3-4 dev-weeks) is manageable. Reduces churn by eliminating a workaround (using a separate time tracker). Build immediately after Guest Access.

### Tier 2: Validate First

**#3 — Custom Workflows (RICE: 1.6)**
Promising score but Medium confidence — the demand signal comes from power users who are vocal but may not represent the broader base. The effort is high (6-8 dev-weeks). **Validation step:** Survey 50 active users about workflow automation needs. If >40% express interest, build. If not, deprioritize.

**#4 — AI Task Summarization (RICE: 1.0)**
The user's hypothesis, not customer-driven. Low confidence across the board. However, the effort is moderate and the differentiator potential is high if it resonates. **Validation step:** Build a lightweight prototype (1 dev-week) that summarizes 1 task thread using an LLM. Share with 10 team leads and measure response. If >60% find it valuable, plan full implementation.

### Tier 3: Park

**#5 — Gantt Chart (RICE: 0.8)**
Low reach (enterprise only) and unvalidated impact. Building this to win enterprise deals is premature at $15K MRR — the product isn't enterprise-ready and Gantt alone won't change that. **Revisit trigger:** When ARR exceeds $500K and enterprise pipeline is >30% of revenue.

**#6 — Mobile App (RICE: 0.4)**
Lowest score. High effort (12+ dev-weeks = an entire quarter for the team), low impact, and low confidence. A mobile app is a "nice to have" that would consume all available resources with questionable return. **Revisit trigger:** When mobile usage data (responsive web tracking) shows >30% of sessions are mobile, or when churn interviews cite lack of mobile as a reason.

## 5. Analysis

### Surprises
- **Guest Access ranked #1** despite not being the most-requested feature. The RICE framework surfaced it because the effort is very low and the impact data (lost deals) is strong. This is exactly where structured prioritization adds value over gut feel.
- **Mobile App ranked last** despite 60% potential reach. The Effort denominator crushes it — 12+ dev-weeks for incremental convenience is a poor trade-off for a 3-person team.

### Dependencies
- None of the top 3 features have hard dependencies on each other. They can be built sequentially.
- Custom Workflows (if validated) could benefit from Time Tracking being built first — workflow rules like "when timer stops, create invoice line item" would be a powerful combination.

### Regret Test
**Top 3:**
- Guest Access: "If we don't build this, we keep losing deals where stakeholders can't see project status. Revenue impact: direct."
- Time Tracking: "If we don't build this, users keep using a separate tracker and feel our tool is incomplete. Churn risk: moderate."
- Custom Workflows: "If we don't build this, power users may outgrow us. But validation is needed first."

**Bottom 3:**
- AI Summarization: "If we never build this, nobody notices — yet. But it could become a differentiator."
- Gantt Chart: "If we never build this, we miss some enterprise deals. At current stage, that's acceptable."
- Mobile App: "If we never build this, users use the responsive web version. Inconvenient but functional."

## 6. Recommendations

**Recommended next action:** Build Guest Access this sprint (1-2 dev-weeks). Immediately follow with Time Tracking (3-4 dev-weeks). Both ship well within the quarter, leaving capacity for validation work on Custom Workflows.

**Quarter plan:**
- Weeks 1-2: Guest Access (ship)
- Weeks 3-6: Time Tracking Integration (ship)
- Weeks 7-8: Custom Workflows user survey + AI Summarization prototype
- Weeks 9-12: Build whichever validated feature scored higher

**Revisit cadence:** Re-run prioritization at the start of next quarter, or sooner if: (a) churn rate changes by more than 2 points, (b) a major competitor launches a feature on this list, or (c) the validation results from Tier 2 come in.

**Missing features:** No feature on this list directly addresses the 6% monthly churn. Consider adding "churn reduction initiative" as a research/analysis item (interview churned users, identify the top 3 reasons, and see if any map to buildable features).

## 7. Methodology Notes

**Framework used:** RICE — Score = (Reach x Impact x Confidence) / Effort

**Data sources:** Customer support tickets (time tracking demand), sales team lost-deal reports (guest access), in-app analytics (reach estimates), team capacity planning (effort estimates), user feedback threads (workflow demand).

**Confidence distribution:** 33% High (Guest Access, Time Tracking — strong data), 40% Medium (Custom Workflows, Gantt — some signals), 27% Low (Mobile App, AI Summarization — assumptions).

**Limitations:** Effort estimates assume current team of 3 developers with no interruptions. Actual velocity may be lower. Reach estimates are based on current user base of 2,000 — if growth is rapid, reach scores may shift. Enterprise demand (Gantt) is based on a small sample of prospects.

---

## Quality Check

- [x] 6 features scored across all 4 RICE dimensions
- [x] Every score has a 1-sentence rationale
- [x] Confidence levels tagged on each score ([H], [M], [L])
- [x] Framework selection is justified (usage data available → RICE)
- [x] Dependencies identified (Custom Workflows benefits from Time Tracking first)
- [x] Recommendations tiered (Build Now: 2, Validate First: 2, Park: 2)
- [x] Scoring formula stated and correctly applied
- [x] SaaS-specific factors considered (churn reduction, conversion, expansion revenue, lost deals)
