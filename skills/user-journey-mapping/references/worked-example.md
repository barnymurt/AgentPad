# Worked Example: User Journey Mapping

This example demonstrates the User Journey Mapping skill applied to a SaaS email marketing platform for small businesses.

## Scenario

**Product:** MailPulse — an email marketing SaaS for small businesses (1-50 employees)
**Target Market:** Small business owners and marketing managers with limited technical skills who need to send email campaigns, manage subscriber lists, and track engagement
**Stage:** Growth — 8,000 active users, $85K MRR, 5.5% monthly churn, freemium model (free up to 500 subscribers, paid plans from $29/mo)
**Context provided:** User has onboarding analytics, support ticket data, churn interviews, and NPS scores. Trial-to-paid conversion rate is 8%. They want to understand why conversion is low and where users drop off.

## Input

> "We have about 8,000 active users on our email marketing platform but our trial-to-paid conversion is stuck at 8% and monthly churn is 5.5%. We have a freemium model — free for up to 500 subscribers, then paid plans start at $29/month. I want to understand what the user experience looks like end-to-end so we can figure out where people are dropping off and what to fix. We have analytics, support tickets, and some churn interview data."

## Reasoning

### Step 1: Define the Journey Scope

Persona: Small business marketing manager — non-technical, time-constrained, likely managing email marketing alongside other responsibilities. Product is freemium with a 500-subscriber cap, so the activation path runs through getting value from the free tier and then hitting the growth ceiling. Full lifecycle mapping is appropriate since the user wants to understand end-to-end experience. Data availability is good (analytics + support + churn interviews), so confidence will be Medium-to-High for most stages.

### Step 2: Map the Five Journey Stages

Walked through each stage for the persona, identifying specific MailPulse touchpoints. The freemium model means there's no hard "trial expiry" — instead, the conversion trigger is hitting the 500-subscriber limit or needing paid features. This changes the Trial→Activation dynamics compared to a time-limited trial.

### Step 3: Identify Moments of Truth

- Aha moment: Seeing the first campaign report with open rates and click data — "My emails are actually working"
- Activation moment: Sending the first campaign to a real subscriber list (not a test send)
- Habit moment: Using MailPulse weekly to send campaigns and check subscriber growth

### Step 4-7: Score Pain Points, Map Emotions, Identify Opportunities, Synthesize

Applied the severity scoring framework with SaaS modifiers. The biggest issues cluster in Trial (complex list import) and the free-to-paid transition (sudden paywall at 500 subscribers with no warning). Emotion curve shows "The Dip" pattern — high excitement at sign-up, valley during setup/import, recovery after first successful campaign.

## Output

---

# User Journey Map: MailPulse

## 1. Journey Context

**Persona:** Lisa, Marketing Manager at a 12-person e-commerce startup. Manages email marketing, social media, and basic content. Goal: grow email subscriber list from 200 to 2,000 and drive repeat purchases. Comfortable with marketing tools like Canva and Instagram, but no coding or API experience. Budget-conscious — needs to justify any new software expense to the founder.

**Product:** MailPulse — email marketing SaaS with drag-and-drop campaign builder, subscriber management, automation, and analytics. Freemium: free up to 500 subscribers, paid plans from $29/mo (Starter: 2,500 subs), $79/mo (Growth: 10,000 subs), $199/mo (Pro: 50,000 subs).

**Journey scope:** Full lifecycle (Awareness through Expansion/Advocacy)

**Data sources:** Onboarding analytics (event tracking for sign-up, first campaign, list import), support ticket categories and volume, 15 churn exit interviews, NPS survey results (n=420, score: 32), conversion funnel data.

**Key assumptions:** Emotion ratings inferred from support ticket sentiment and churn interview quotes (tagged as Medium confidence). Awareness-stage touchpoints estimated from marketing analytics (Medium confidence).

## 2. Journey Stages

### Stage 1: Awareness

#### Actions
- Searches Google for "email marketing tool for small business" or "Mailchimp alternative affordable" → lands on MailPulse blog post or comparison page (Website - SEO content)
- Sees MailPulse mentioned in a "Best email marketing tools 2026" listicle on a third-party blog (Third-party - review content)
- Visits MailPulse homepage, scans hero section and feature list (Website - landing page)
- Clicks "Pricing" to check if it's affordable, sees the free tier (Website - pricing page)
- Reads 2-3 G2 reviews to validate credibility (Third-party - G2)

#### User Thoughts
- "Is this simpler than Mailchimp? I got overwhelmed by Mailchimp's interface last time."
- "Free for up to 500 subscribers — I only have 200 right now, so I can try this at no risk."
- "The reviews mention it's easy to use. That's what I need."

#### Emotions
- Rating: **+1 (hopeful)** — The free tier removes financial risk, and the messaging emphasizes simplicity, which matches Lisa's core need.

#### Pain Points
- **Comparison page lacks specificity:** The "MailPulse vs. Mailchimp" page lists features but doesn't address the #1 concern for switchers: "Can I import my existing list easily?" Freq: 3 / Impact: 2 / Breadth: 4 → Severity: 3.0 (Major) [M]

#### Moment of Truth
- None at this stage (decision to sign up is the stage exit, not a moment of truth).

---

### Stage 2: Trial

#### Actions
- Clicks "Get Started Free" and enters email + password (In-app - sign-up form)
- Receives welcome email with subject "Welcome to MailPulse — send your first campaign in 5 minutes" (Email - welcome)
- Lands on empty dashboard with a setup checklist: (1) Import subscribers, (2) Create first campaign, (3) Send test email (In-app - onboarding)
- Attempts to import subscriber list from a CSV export from previous tool (In-app - import flow)
- Encounters column mapping screen — needs to match CSV headers to MailPulse fields (In-app - import flow)
- Gives up on import after 10 minutes, decides to manually add 5 test subscribers (In-app - manual add)
- Opens the campaign builder, selects a template, and customizes it with her brand colors and logo (In-app - campaign builder)
- Sends a test email to herself (In-app - test send)
- Sees the test email in her inbox and thinks it looks good (Email - test campaign)

#### User Thoughts
- "This sign-up was easy. Good start."
- "Wait, I need to import my list first? I thought I could just start writing emails."
- "This column mapping is confusing. What's 'merge field'? I just have names and emails."
- "I'll just add a few people manually for now and deal with the import later."
- "Oh, the templates are nice. This is more like it."
- "The test email looks great on my phone. Okay, I'm starting to see how this works."

#### Emotions
- Sign-up: **+1 (confident)** — Quick, painless form.
- Import attempt: **-2 (frustrated)** — Column mapping is confusing, feels like a wall. Technical jargon ("merge fields") is intimidating.
- Manual workaround: **-1 (annoyed)** — Had to find a workaround, feels like the product failed her.
- Campaign builder: **+1 (pleased)** — Templates are good, drag-and-drop is intuitive.
- Test email received: **+2 (delighted)** — Seeing a professional-looking email with her branding is the aha moment.

#### Pain Points

1. **CSV import column mapping is confusing:** Technical jargon ("merge fields," "custom properties") and no auto-detection of common column names (first_name, email, etc.). Users with simple CSVs shouldn't need to do manual mapping.
   - Freq: 4 / Impact: 4 / Breadth: 4 → Severity: 4.0 (Critical) [H]
   - *SaaS modifier applied: +1 Impact (occurs during first session)*

2. **No skip option in onboarding checklist:** The checklist implies import must happen before campaign creation, but it's not actually required. Users who want to explore the builder first feel blocked.
   - Freq: 3 / Impact: 3 / Breadth: 3 → Severity: 3.0 (Major) [M]

3. **Welcome email promises "5 minutes to first campaign" but import alone takes 15+:** Mismatched expectations create frustration. The promise is technically possible if you skip import, but the checklist doesn't make that obvious.
   - Freq: 4 / Impact: 3 / Breadth: 4 → Severity: 3.7 (Major) [M]

#### Moment of Truth: Aha Moment
- **Type:** Aha Moment
- **Trigger action:** Receives the test email in her inbox and sees a professional campaign with her branding
- **Current conversion:** ~55% of sign-ups send a test email within the first session [M]
- **Blockers:** Users who get stuck on import never reach the campaign builder. Import friction is the #1 aha-moment blocker.

---

### Stage 3: Activation

#### Actions
- Returns the next day and successfully imports her 200-subscriber CSV (after watching a help video linked from support) (In-app - import flow)
- Creates a real campaign: a product launch announcement (In-app - campaign builder)
- Configures send settings — selects her imported list, sets subject line (In-app - send flow)
- Sends the campaign to her 200 subscribers (In-app - send action)
- Waits 2 hours, then checks the campaign report: sees 42% open rate and 8% click rate (In-app - analytics dashboard)
- Receives a congratulatory in-app notification: "Your first campaign is performing great!" (In-app - notification)

#### User Thoughts
- "I had to watch a video to figure out the import. That shouldn't be necessary."
- "Okay, the campaign builder is really easy. I already know how to use this from the test."
- "42% open rate — is that good? I think that's good. My emails are actually getting read!"
- "This report is really useful. I can see exactly who clicked and what they clicked on."

#### Emotions
- Import retry: **0 (neutral)** — Got it working but shouldn't have needed a help video.
- Campaign creation: **+1 (confident)** — Builder feels familiar now.
- Sending to real list: **+1 (excited, nervous)** — First real send is a commitment moment.
- Seeing analytics: **+2 (delighted)** — Real data about real subscribers. This is the activation moment — concrete value delivered.

#### Pain Points

4. **Campaign report doesn't contextualize metrics:** Shows open rate and click rate but doesn't indicate whether they're good or bad. No benchmarks, no industry comparison. A 42% open rate is excellent for e-commerce but the user has to Google that to know.
   - Freq: 4 / Impact: 2 / Breadth: 5 → Severity: 3.7 (Major) [H]

5. **No prompt to set up automation after first campaign:** After the first successful campaign, users are left to figure out automation on their own. No contextual suggestion like "Want to automatically welcome new subscribers?"
   - Freq: 5 / Impact: 2 / Breadth: 4 → Severity: 3.7 (Major) [M]

#### Moment of Truth: Activation Moment
- **Type:** Activation Moment
- **Trigger action:** Sends first campaign to a real subscriber list (not a test) and views the campaign report
- **Current conversion:** ~35% of sign-ups send a real campaign within 14 days [H]
- **Blockers:** Import friction from Stage 2 is the main blocker. Users who can't import their list can't send a real campaign. Secondary blocker: users who send a test email but never return to send a real one (no re-engagement email for this segment).

---

### Stage 4: Retention

#### Actions
- Sends campaigns weekly — product updates, promotions, newsletters (In-app - campaign builder)
- Subscriber list grows from 200 to 480 over 3 months (organic growth through website signup form) (In-app - subscriber management)
- Receives weekly "Your MailPulse stats" email with open rate trends (Email - engagement report)
- Encounters an issue: a campaign lands in spam for Gmail users. Submits a support ticket. (Support - email ticket)
- Gets a reply in 6 hours with deliverability tips (Support - email reply)
- Explores automation for the first time — sets up a welcome email for new subscribers (In-app - automation builder)
- List hits 490 subscribers. Sees a warning banner: "You're approaching your 500-subscriber limit" (In-app - upgrade prompt)

#### User Thoughts
- "I'm getting into a good rhythm with this. Weekly campaigns are part of my routine now."
- "The weekly stats email is helpful — I like seeing my trends without logging in."
- "Ugh, my emails are going to spam? That's scary. I need this fixed."
- "Support was helpful and fast. Good to know they're responsive."
- "I set up a welcome automation! That was easier than I expected."
- "Wait, 500-subscriber limit? I'm almost there. Now I need to pay?"

#### Emotions
- Weekly routine: **+1 (satisfied)** — Product is working as expected, becoming a habit.
- Deliverability issue: **-2 (anxious)** — Email going to spam feels like the product is broken. High stakes — these are real customers not receiving emails.
- Support resolution: **+1 (relieved)** — Fast response and actionable advice restores confidence.
- Automation discovery: **+1 (empowered)** — New capability discovered, feels like getting more value.
- Approaching limit: **-1 (anxious)** — Free ride is ending. The warning feels abrupt even though the limit was disclosed at sign-up.

#### Pain Points

6. **No proactive deliverability guidance:** Users only discover deliverability best practices when something goes wrong. No onboarding content, no setup wizard for SPF/DKIM, no preemptive tips.
   - Freq: 3 / Impact: 5 / Breadth: 3 → Severity: 3.7 (Major) [H]
   - *SaaS modifier applied: +1 Impact (cited in churn interviews)*

7. **Abrupt free-to-paid transition:** The 500-subscriber limit warning appears only when the user is at 490+. No progressive messaging, no "here's what you'll get on paid," no grace period. Users feel blindsided.
   - Freq: 4 / Impact: 4 / Breadth: 4 → Severity: 4.0 (Critical) [H]
   - *SaaS modifier applied: +1 Impact (directly affects conversion)*

8. **Upgrade pricing page is confusing:** Three tiers with feature matrices, but the differences between Starter ($29) and Growth ($79) are unclear. Users can't quickly answer "which plan do I need?"
   - Freq: 4 / Impact: 3 / Breadth: 4 → Severity: 3.7 (Major) [M]

#### Moment of Truth: Habit Moment
- **Type:** Habit Moment
- **Trigger action:** Sends 3+ campaigns and returns weekly without being prompted by email (habitual usage)
- **Current conversion:** ~60% of activated users reach habitual weekly usage within 8 weeks [M]
- **Blockers:** Deliverability issues are the #1 habit disruptor — users who see declining open rates lose confidence and reduce sending frequency. Secondary: users who don't discover automation feel like they're doing too much manual work.

---

### Stage 5: Expansion / Advocacy

#### Actions
- Upgrades to Starter plan ($29/mo) after list passes 500 subscribers (In-app - upgrade flow)
- Invites a colleague to help manage campaigns (In-app - team settings)
- Hits the 2,500-subscriber Starter limit after 8 months — upgrades to Growth ($79/mo) (In-app - upgrade flow)
- Recommends MailPulse in a small business Facebook group when someone asks for email tool recommendations (Third-party - social media)
- Receives NPS survey, gives a 9 (promoter) with comment: "Easy to use, great templates, wish the import was better" (Email - NPS survey)
- Invited to write a case study but declines — too busy (Email - case study request)

#### User Thoughts
- "The upgrade was painless. Good — I was worried about losing my data."
- "Adding my colleague was easy. She picked it up in 10 minutes."
- "I'm recommending this because it's genuinely simple. Unlike Mailchimp."
- "I'd do a case study but I don't have time for that. Maybe a quick quote?"

#### Emotions
- Upgrade: **0 (neutral)** — Expected expense, no delight but no friction. Could be a positive moment but isn't leveraged.
- Team collaboration: **+1 (satisfied)** — Sharing access is easy, validates the product for team use.
- Recommending to others: **+2 (proud)** — User feels like an expert recommending a good tool.
- Case study decline: **0 (neutral)** — No negative feeling, but the ask felt too big.

#### Pain Points

9. **No upgrade celebration or unlocked-feature guidance:** After paying, the experience is identical. No "welcome to Starter" email, no tour of new features, no acknowledgment of the upgrade. Missed delight moment.
   - Freq: 5 / Impact: 2 / Breadth: 5 → Severity: 4.0 (Critical) [M]

10. **Referral program is hidden:** MailPulse has a referral program (give $10, get $10) but it's buried in account settings. The most likely referral moment (when a user recommends in a group) has no easy link to share.
    - Freq: 3 / Impact: 3 / Breadth: 3 → Severity: 3.0 (Major) [M]

11. **Case study ask is too heavyweight:** Requesting a full case study from a busy small-business user is a mismatch. A short testimonial quote or a 2-minute video would have higher acceptance.
    - Freq: 2 / Impact: 2 / Breadth: 2 → Severity: 2.0 (Minor) [L]

## 3. Moments of Truth Summary

| Moment | Stage | Trigger Action | Conversion | Top Blocker | Confidence |
|--------|-------|---------------|------------|-------------|------------|
| Aha Moment | Trial | Receives test email with own branding in inbox | ~55% of sign-ups [M] | CSV import friction prevents reaching campaign builder | [M] |
| Activation Moment | Activation | Sends first real campaign and views analytics report | ~35% of sign-ups [H] | Unresolved import issues from Trial stage; no re-engagement for test-only users | [H] |
| Habit Moment | Retention | Sends 3+ campaigns and returns weekly without prompting | ~60% of activated users [M] | Deliverability issues erode confidence; lack of automation discovery increases manual burden | [M] |

**Business impact of improving each moment:**
- **Aha Moment (55% → 75%):** 20% more users reach the campaign builder, directly increasing the pool of potential activated users. Estimated impact: +5-8% absolute increase in activation rate.
- **Activation Moment (35% → 50%):** 15% more sign-ups become real users who send campaigns. At 8,000 active users with 1,200 monthly sign-ups, this is ~180 additional activated users/month. With 8% trial-to-paid conversion, that's ~14 additional paying customers/month (~$400-$1,100/mo MRR).
- **Habit Moment (60% → 75%):** 15% more activated users become habitual. Reduces monthly churn by an estimated 1-2 points (from 5.5% to 3.5-4.5%), which compounds significantly over 12 months.

## 4. Pain Point Register

### Summary Table

| # | Pain Point | Stage | Freq | Impact | Breadth | Severity | Class | Confidence |
|---|-----------|-------|------|--------|---------|----------|-------|------------|
| 1 | CSV import column mapping confusing | Trial | 4 | 4+1=5 | 4 | 4.3 | Critical | [H] |
| 7 | Abrupt free-to-paid transition | Retention | 4 | 4+1=5 | 4 | 4.3 | Critical | [H] |
| 9 | No upgrade celebration or feature guidance | Expansion | 5 | 2 | 5 | 4.0 | Critical | [M] |
| 6 | No proactive deliverability guidance | Retention | 3 | 5+1=6→5 | 3 | 3.7 | Major | [H] |
| 4 | Campaign report lacks benchmarks | Activation | 4 | 2 | 5 | 3.7 | Major | [H] |
| 5 | No automation prompt after first campaign | Activation | 5 | 2 | 4 | 3.7 | Major | [M] |
| 8 | Upgrade pricing page confusing | Retention | 4 | 3 | 4 | 3.7 | Major | [M] |
| 3 | Welcome email overpromises "5 minutes" | Trial | 4 | 3 | 4 | 3.7 | Major | [M] |
| 2 | No skip option in onboarding checklist | Trial | 3 | 3 | 3 | 3.0 | Major | [M] |
| 10 | Referral program hidden | Expansion | 3 | 3 | 3 | 3.0 | Major | [M] |
| 11 | Case study ask too heavyweight | Expansion | 2 | 2 | 2 | 2.0 | Minor | [L] |

*Note: Impact scores capped at 5 after modifier application.*

### Critical Pain Points

**#1 — CSV Import Column Mapping (Severity: 4.3, Critical) [H]**
- **Full description:** The import flow requires manual column mapping using technical terminology ("merge fields," "custom properties"). Common CSV headers like "first_name" and "email" are not auto-detected. Users with simple lists (name + email) go through the same complex flow as users with 20 custom fields.
- **Root cause:** Import flow was built for power users and never simplified. No auto-detection logic, no "simple mode."
- **User impact:** 45% of users who attempt import in their first session abandon it. Many never return. Those who do return spend an average of 15 minutes on import (vs. expected 2 minutes).
- **Business impact:** Directly blocks the aha moment and activation moment. Estimated to prevent 20% of sign-ups from ever sending a campaign.

**#7 — Abrupt Free-to-Paid Transition (Severity: 4.3, Critical) [H]**
- **Full description:** Users on the free plan see no messaging about the paid tier until they hit 490+ subscribers. The warning banner appears suddenly with no context about what paid plans include or why the limit exists. The transition from "free forever" to "pay now to keep going" feels like a bait-and-switch.
- **Root cause:** Product team set up the limit notification as a last-minute banner rather than designing a progressive upgrade journey.
- **User impact:** Users feel blindsided. In churn interviews, 4 of 15 churned users cited "unexpected paywall" as a factor, even though the limit is on the pricing page.
- **Business impact:** Directly suppresses trial-to-paid conversion. Users in a negative emotional state at the upgrade decision point are less likely to convert and more likely to evaluate alternatives.

**#9 — No Upgrade Celebration or Feature Guidance (Severity: 4.0, Critical) [M]**
- **Full description:** After upgrading to a paid plan, the user returns to the same dashboard with no acknowledgment. No welcome email, no tour of newly unlocked features (advanced automation, A/B testing, priority support), no celebration.
- **Root cause:** Upgrade flow was built as a billing transaction, not a product experience.
- **User impact:** Users who just committed $29-$79/month feel no reward. Feature discovery of paid features is delayed by weeks or never happens.
- **Business impact:** Suppresses expansion revenue — users who don't discover advanced features are less likely to upgrade to higher tiers. Reduces NRR.

## 5. Emotion Curve

**Curve shape:** The Dip — excitement at sign-up, a sharp valley during import/setup, recovery after first successful campaign, sustained positive during retention, with a minor dip at the upgrade decision point.

**Touchpoint-by-touchpoint ratings:**

- [Awareness] Discovers MailPulse via search → **+1 (hopeful):** Free tier removes risk
- [Awareness] Reads pricing page → **+1 (relieved):** Affordable, free start
- [Trial] Completes sign-up → **+1 (confident):** Quick and easy form
- [Trial] Sees import requirement in checklist → **0 (uncertain):** "Do I have to do this now?"
- [Trial] Attempts CSV import → **-2 (frustrated):** Column mapping is confusing, jargon-heavy
- [Trial] Gives up on import, adds contacts manually → **-1 (annoyed):** Workaround required
- [Trial] Uses campaign builder with templates → **+1 (pleased):** Drag-and-drop feels natural
- [Trial] Receives test email in inbox → **+2 (delighted):** AHA MOMENT — professional email with own branding
- [Activation] Successfully imports list (day 2) → **0 (neutral):** Relief, but shouldn't have needed help
- [Activation] Sends first real campaign → **+1 (excited):** Real send to real subscribers
- [Activation] Views campaign report → **+2 (delighted):** ACTIVATION — real data, real results
- [Retention] Establishes weekly sending routine → **+1 (satisfied):** Routine, reliable
- [Retention] Encounters deliverability issue → **-2 (anxious):** "My emails are going to spam"
- [Retention] Support resolves issue → **+1 (relieved):** Fast and helpful
- [Retention] Sees 500-subscriber limit warning → **-1 (anxious):** Free ride ending, feels abrupt
- [Retention] Views confusing pricing page → **-1 (frustrated):** Can't determine right plan
- [Expansion] Completes upgrade → **0 (neutral):** No delight, just a transaction
- [Expansion] Adds team member → **+1 (satisfied):** Easy process
- [Expansion] Recommends MailPulse to others → **+2 (proud):** Advocacy moment

**Emotional peaks:**
1. Receiving test email with own branding (Trial, +2) — the moment the product becomes real
2. Viewing first campaign analytics (Activation, +2) — concrete proof of value
3. Recommending to peers (Expansion, +2) — identity as an expert/recommender

**Emotional valleys:**
1. CSV import attempt (Trial, -2) — the deepest frustration point, directly blocks progress
2. Deliverability scare (Retention, -2) — threatens the core value proposition
3. Abrupt subscriber limit warning (Retention, -1) — feels like a bait-and-switch

**Overall trend:** Strong start, sharp dip during onboarding setup, recovery through the campaign builder (which is the product's strength), sustained positive through retention with periodic anxiety spikes (deliverability, pricing), and settling into satisfied advocacy. The biggest risk is losing users during the Trial dip before they experience the campaign builder.

## 6. Opportunity Register

### Summary Table

| # | Opportunity | Stage | Pain Sev. | Biz Impact | Feasibility | Opp Score | Tier |
|---|------------|-------|-----------|------------|-------------|-----------|------|
| A | Smart CSV import with auto-mapping | Trial | 4.3 | 5 | 4 | 86.0 | Quick Win |
| B | Progressive upgrade journey | Retention | 4.3 | 5 | 4 | 86.0 | Quick Win |
| C | Post-upgrade onboarding & celebration | Expansion | 4.0 | 4 | 5 | 80.0 | Quick Win |
| D | Proactive deliverability setup wizard | Retention | 3.7 | 4 | 3 | 44.4 | Strategic Bet |
| E | Add benchmarks to campaign reports | Activation | 3.7 | 3 | 5 | 55.5 | Quick Win |
| F | Contextual automation prompt after first send | Activation | 3.7 | 3 | 5 | 55.5 | Quick Win |
| G | Simplify pricing page with recommendation | Retention | 3.7 | 4 | 4 | 59.2 | Quick Win |
| H | Flexible onboarding path (skip import) | Trial | 3.0 | 3 | 5 | 45.0 | Quick Win |
| I | Surface referral program at advocacy moments | Expansion | 3.0 | 3 | 4 | 36.0 | Incremental |
| J | Replace case study ask with micro-testimonial | Expansion | 2.0 | 2 | 5 | 20.0 | Incremental |

### Top 3 Opportunities

**#A — Smart CSV Import with Auto-Mapping (Score: 86.0) [H]**

- **What to do:** Add auto-detection for common CSV column names (email, first_name, last_name, name, phone, company). When a CSV is uploaded, pre-map recognized columns and show the user a confirmation screen instead of a manual mapping screen. Add a "simple mode" for CSVs with just email + name columns — skip mapping entirely. Replace "merge fields" terminology with plain language ("Contact details," "Email address," "First name").
- **Expected outcome:** Users import their list in under 2 minutes. First-session drop-off at the import step decreases from 45% to under 15%. More users reach the aha moment (test email) in their first session.
- **Success metric:** Import completion rate increases from ~55% to >85% in first session. Time-to-first-campaign decreases from 2.3 days to under 1 day.
- **Estimated effort:** M (Medium) — 2-3 weeks. Auto-detection logic is straightforward (fuzzy match common header names). UI simplification is mostly frontend. No infrastructure changes needed.
- **Confidence:** [H] — Import drop-off data is clear from analytics. The fix is well-understood from competitor benchmarks (Mailchimp, ConvertKit both auto-detect).

**#B — Progressive Upgrade Journey (Score: 86.0) [H]**

- **What to do:** Replace the abrupt 490-subscriber warning with a progressive upgrade journey:
  - At 250 subscribers: celebratory email ("Your list is growing! Here's what's ahead")
  - At 400 subscribers: in-app card showing growth trajectory and a preview of paid features
  - At 475 subscribers: gentle nudge with a comparison of free vs. paid and a "what you'll unlock" preview
  - At 500 subscribers: clear upgrade prompt with a 7-day grace period (subscribers still accepted but new campaigns paused until upgraded)
  - Add a clear, personalized plan recommendation based on growth rate ("At your pace, the Starter plan will last you about 8 months")
- **Expected outcome:** Users feel guided toward the upgrade rather than hitting a wall. The emotional state at the upgrade decision point shifts from anxiety (-1) to readiness (0 or +1). Conversion rate at the 500-subscriber threshold increases.
- **Success metric:** Free-to-paid conversion rate at the 500-subscriber trigger increases from 8% to 15-20%. Churn mentions of "unexpected paywall" drop to zero in exit interviews.
- **Estimated effort:** M (Medium) — 2-3 weeks. Requires 3-4 new email templates, 2 in-app components (growth card, plan recommender), and a billing grace period implementation.
- **Confidence:** [H] — Churn interviews explicitly cite this issue. Progressive upgrade patterns are well-documented in SaaS best practices.

**#C — Post-Upgrade Onboarding & Celebration (Score: 80.0) [M]**

- **What to do:** Create a post-upgrade experience:
  - Immediate: "Welcome to [Plan Name]" in-app modal with confetti animation and a summary of unlocked features
  - Within 1 hour: welcome email highlighting 3 key features now available (A/B testing, advanced automation, priority support)
  - Within 24 hours: contextual tooltips on newly available features when the user encounters them
  - Within 1 week: "Getting the most from your plan" email with use cases for advanced features
- **Expected outcome:** Paid users discover advanced features within the first week instead of the current average of 4+ weeks. Increased engagement with paid features drives higher perceived value and reduces churn.
- **Success metric:** Advanced feature adoption (A/B testing, automation) within 30 days of upgrade increases from ~15% to >40%. 90-day paid churn rate decreases by 0.5-1 point.
- **Estimated effort:** S (Small) — 1-2 weeks. Primarily email templates and in-app components using existing UI patterns.
- **Confidence:** [M] — Based on the general principle that post-upgrade onboarding improves retention. Specific impact numbers are estimated, not data-backed.

## 7. Recommendations

**Recommended action plan:**
1. **Week 1-2:** Implement flexible onboarding path (Opportunity H) — allow users to skip import and go straight to campaign builder. This is a quick config change that unblocks users immediately.
2. **Week 2-4:** Build smart CSV auto-mapping (Opportunity A) — the highest-impact fix. Directly addresses the biggest aha moment blocker.
3. **Week 3-5:** Launch progressive upgrade journey (Opportunity B) — start with the email sequence (fastest to ship), then add in-app components.
4. **Week 4-6:** Ship post-upgrade celebration and feature guidance (Opportunity C) — low effort, quick to build with existing components.
5. **Week 5-6:** Add benchmarks to campaign reports (Opportunity E) and automation prompt after first send (Opportunity F) — both are quick copy/UI changes.

**Quick wins (ship in <1 week):**
- Allow skipping import in the onboarding checklist (Opportunity H)
- Add industry benchmarks to campaign analytics ("Your 42% open rate is above average for e-commerce")
- Add "Set up a welcome email" prompt after first campaign send
- Create a "Welcome to Starter" email template for post-upgrade

**Validation needed:**
- The deliverability setup wizard (Opportunity D) requires user research — how many users know what SPF/DKIM is? Should we auto-detect or guide manual setup? Run 5-10 user interviews before building.
- Referral program surfacing (Opportunity I) needs A/B testing — test a post-NPS referral prompt vs. an in-app share button vs. current hidden placement.

**Revisit triggers:**
- Re-map the journey in 90 days after implementing top opportunities
- Re-map immediately if monthly churn changes by more than 1 point
- Re-map the Expansion stage specifically when introducing a new pricing tier or referral program redesign

**Missing touchpoints:**
- No re-engagement email for users who sign up, send a test, but never send a real campaign. This segment (~20% of sign-ups) is reachable and partially activated.
- No in-app guidance between Trial and Activation — after the first session, the user is on their own until the weekly stats email starts (which requires sending at least one campaign first).
- No community or user forum — peer support and advocacy have no channel.

## 8. Methodology Notes

**Framework used:** SaaS 5-Stage Journey Mapping with Pain Point Severity Scoring. Stages: Awareness → Trial → Activation → Retention → Expansion/Advocacy. Pain points scored on Frequency (1-5) × Impact (1-5) × Breadth (1-5) with SaaS-specific modifiers. Opportunities scored on Pain Severity × Business Impact (1-5) × Feasibility (1-5).

**Data sources:** Onboarding event analytics (sign-up → import → campaign → send funnel), support ticket categorization (top 5 categories: import issues, deliverability, billing, automation, integrations), 15 churn exit interviews (qualitative), NPS survey n=420 (score: 32), conversion funnel data (sign-up to paid), weekly engagement metrics.

**Confidence distribution:** 36% High (Trial and Activation pain points with analytics data, Retention pain points with churn interview validation), 45% Medium (emotion ratings inferred from support sentiment, Expansion stage based on NPS + limited data), 19% Low (Awareness stage estimated from marketing analytics, case study and referral specifics assumed).

**Limitations:**
- Awareness stage is the least data-informed — marketing analytics show channels but not the user's emotional experience. Consider adding post-sign-up survey questions about discovery experience.
- Emotion ratings are inferred from behavioral signals and support tickets, not measured directly. Consider adding CSAT micro-surveys at key touchpoints.
- The persona maps a single archetype (marketing manager). Technical users, agency users, and enterprise evaluators likely have different journeys — especially at the Trial and Activation stages.
- Pain point severity scores are based on current data. As the product evolves and fixes ship, scores will change and the journey should be re-mapped.

---

## Quality Check

- [x] All five journey stages mapped with actions, touchpoints, thoughts, emotions, and pain points
- [x] 3 moments of truth identified with specific trigger actions (aha: test email, activation: first real campaign + report, habit: weekly sending)
- [x] Every pain point scored on Frequency, Impact, and Breadth with rationale
- [x] Emotion curve tracks across all stages with ratings at 19 major touchpoints
- [x] Opportunities derived from pain points (not invented separately)
- [x] 10 opportunities scored and ranked by Opportunity Score
- [x] Confidence levels tagged throughout ([H], [M], [L])
- [x] SaaS-specific context maintained (freemium conversion, activation metric, churn, expansion revenue, NRR)
- [x] Recommendations include specific success metrics (import completion rate, conversion rate, feature adoption %)
