# Framework: User Journey Mapping

This framework provides the detailed methodology for mapping SaaS user journeys across five lifecycle stages. It encodes touchpoint mapping, emotion tracking, moment-of-truth identification, pain point severity scoring, and opportunity prioritization — all calibrated for subscription-based digital products.

## Methodology Overview

User journey mapping replaces anecdotal "I think users struggle with X" with structured, multi-dimensional analysis of the entire user lifecycle. The key insight for SaaS is that the journey doesn't end at purchase — retention, expansion, and advocacy are where the business model lives. This framework captures not just what users do, but what they think, feel, and decide at each stage, making the invisible friction visible and prioritizable.

## The Five SaaS Journey Stages

### Stage 1: Awareness

**Definition:** The user discovers the product exists and forms an initial impression.

**Starts when:** User first encounters the product (ad, search result, referral, content).
**Ends when:** User decides to try the product (clicks "Sign Up" or "Start Free Trial").

**Key touchpoints:**
- Search engine results / SEO content
- Social media / ads / sponsored content
- Review sites (G2, Capterra, TrustRadius)
- Word-of-mouth / referral links
- Landing pages / marketing website
- Comparison pages / "vs." content
- Webinars / demo videos

**What to map:**
- How users find the product (channels)
- First impression of the value proposition (clear vs. confusing)
- Trust signals encountered (social proof, reviews, security badges)
- Competitor alternatives considered at this stage
- Decision triggers that push toward sign-up

**Common emotions:** Curiosity (+1), skepticism (0), overwhelm (-1 if too many options).

**SaaS-specific considerations:**
- Freemium vs. free trial vs. demo-request — each creates a different awareness-to-trial bridge
- B2B buyers often have multiple stakeholders; map the primary evaluator's journey
- Product-led growth (PLG) products may collapse Awareness and Trial stages

### Stage 2: Trial

**Definition:** The user signs up and begins exploring the product without full commitment.

**Starts when:** User creates an account or begins a free trial.
**Ends when:** User hits the activation moment or the trial expires.

**Key touchpoints:**
- Sign-up flow (form fields, SSO, verification)
- Welcome email / onboarding email sequence
- First-run experience (empty states, setup wizard, tooltips)
- In-app onboarding (checklists, product tours, contextual help)
- Sample/demo data or templates
- Documentation / help center
- Support (chat, email, community)

**What to map:**
- Time from sign-up to first meaningful action
- Steps to reach the aha moment
- Friction in setup (integrations, data import, team invites)
- Content and guidance provided (or missing)
- Drop-off points within the first session and first week

**Common emotions:** Excitement (+1 at sign-up), confusion (-1 during setup), relief (+1 when something works), frustration (-2 if stuck).

**SaaS-specific considerations:**
- Trial length matters — map the day-by-day experience for the trial duration
- Time-to-value is the critical metric; every hour of friction increases abandonment
- Empty states are a journey killer — map what the user sees before they add data

### Stage 3: Activation

**Definition:** The user experiences the product's core value and converts to committed usage.

**Starts when:** User experiences the aha moment (understands the value).
**Ends when:** User converts to paid or establishes a usage habit.

**Key touchpoints:**
- Core feature first-use (the action that delivers the value proposition)
- Success moment (first result, first workflow completed, first report generated)
- Upgrade / payment flow
- Team invitation / collaboration first-use
- Integration setup with existing tools
- Trial expiry communications (if applicable)

**What to map:**
- The specific action that correlates with conversion (activation metric)
- Barriers between aha moment and activation (pricing, permissions, missing features)
- The conversion flow (pricing page, checkout, plan selection)
- What happens when the trial ends (grace period? data locked? feature gating?)
- Competitive evaluation that happens at this stage

**Common emotions:** Confidence (+2 after first success), anxiety (-1 at payment decision), satisfaction (+1 after conversion).

**SaaS-specific considerations:**
- The activation metric varies by product — identify the specific action (e.g., "sent first campaign," "created first project," "connected first integration")
- Freemium products: activation = upgrading to paid. Free trial products: activation = subscribing before expiry.
- Payment friction (billing info, plan confusion, hidden costs) can kill conversion even for activated users

### Stage 4: Retention

**Definition:** The user is a paying/active customer and the product delivers ongoing value.

**Starts when:** User has converted to paid (or established habitual use in freemium).
**Ends when:** User churns or enters expansion mode.

**Key touchpoints:**
- Regular usage sessions (the core loop)
- Feature discovery beyond initial use case
- Email communications (product updates, tips, usage reports)
- Support interactions (tickets, chat, community)
- Billing events (renewals, failed payments, plan changes)
- Product updates and release notes
- Customer success check-ins (for higher-tier plans)

**What to map:**
- Usage frequency and patterns (daily, weekly, event-driven)
- Feature adoption breadth — are users stuck on one feature or exploring?
- Support burden — how often do users need help?
- The "habit loop" — trigger, action, reward, investment
- Churn signals — decreasing usage, failed logins, support complaints
- Renewal experience — seamless auto-renewal vs. re-evaluation moment

**Common emotions:** Routine (0 to +1), frustration (-1 when hitting limitations), loyalty (+2 if deeply integrated), indifference (0, the most dangerous for retention).

**SaaS-specific considerations:**
- Monthly churn rate is the headline metric — map what causes it
- "Silent churn" happens when users stop getting value but don't cancel immediately
- Contract renewals (annual plans) create a re-evaluation moment that needs explicit mapping
- Billing failures ("involuntary churn") are a distinct pain point from dissatisfaction churn

### Stage 5: Expansion / Advocacy

**Definition:** The user deepens engagement — upgrades, adds seats, refers others, or becomes a champion.

**Starts when:** User is stably retained and begins expanding usage.
**Ends when:** Ongoing — this is the target steady state.

**Key touchpoints:**
- Upsell / upgrade prompts (in-app, email, CSM-driven)
- Seat addition / team expansion
- Advanced feature adoption
- Referral program / invite flows
- Community participation (forums, events, user groups)
- Case study / testimonial requests
- NPS surveys
- Public reviews (G2, Product Hunt, social media)

**What to map:**
- Natural expansion triggers (hitting plan limits, new team members, new use cases)
- Barriers to expansion (pricing tiers unclear, admin permissions, budget approval)
- What prompts advocacy (delight moments, community, personal relationship with brand)
- The referral experience (how easy is it to refer? what's the incentive?)
- How the product leverages power users as growth channels

**Common emotions:** Pride (+2 when product makes user look good), annoyance (-1 at upsell pressure), evangelism (+2 genuine advocacy).

**SaaS-specific considerations:**
- Net revenue retention (NRR) is driven by expansion — map what unlocks it
- Seat-based pricing: the journey of adding a new team member IS an expansion journey
- Usage-based pricing: map what happens when users approach tier limits
- Advocacy programs must feel organic, not forced — map the user's motivation

## Touchpoint Mapping Across Channels

Map every touchpoint to its channel. A single stage may span multiple channels:

| Channel | Examples | Best Mapped At Stage |
|---------|----------|---------------------|
| Website | Landing pages, pricing, blog, docs | Awareness, Trial |
| In-App | UI, onboarding flows, feature prompts | Trial, Activation, Retention |
| Email | Welcome sequence, drip campaigns, renewals | All stages |
| Support | Chat, tickets, knowledge base | Trial, Retention |
| Community | Forums, Slack/Discord, events | Retention, Expansion |
| Sales/CSM | Demos, check-ins, renewal calls | Awareness (sales-led), Retention, Expansion |
| Third-Party | Review sites, social media, partner integrations | Awareness, Expansion |

Flag stages with single-channel touchpoints — these are fragile. If that one channel fails, the user has no support path.

## Moment-of-Truth Identification

### The Aha Moment

**What it is:** The cognitive shift when the user understands the product's value for *them* (not in the abstract).

**How to identify it:**
- Ask: "What's the first thing a user sees/does that makes them think 'this is what I need'?"
- In data: look for the action after which trial-to-paid conversion rates jump
- It's usually NOT the first feature used — it's the first *result* seen

**Examples by product type:**
| Product Type | Typical Aha Moment |
|-------------|-------------------|
| Email marketing tool | Sees the first campaign report with open rates |
| Project management | Sees the team's tasks organized in one view |
| Analytics platform | Sees their own data in a dashboard for the first time |
| CRM | Sees a contact's full history in one timeline |

**Red flags (aha moment is too far into the journey):**
- If the aha moment requires >5 minutes of setup, it's too far
- If it requires data import or integration before value, add a sample/demo data path
- If it requires other team members, provide a single-user preview of the collaborative value

### The Activation Moment

**What it is:** The behavioral action that statistically predicts long-term retention and conversion.

**How to identify it:**
- Requires data: compare users who retained 90+ days vs. those who churned — what action differs?
- Without data: identify the action that makes the user "invested" (data entered, integrations connected, workflows configured)
- The activation moment should be a *specific, measurable action*, not a feeling

**Common activation metrics in SaaS:**
| Product Type | Typical Activation Metric |
|-------------|--------------------------|
| Email marketing | Sent first campaign to real subscribers |
| Project management | Created 3+ tasks with due dates |
| Analytics platform | Connected a live data source |
| CRM | Logged 5+ customer interactions |

### The Habit Moment

**What it is:** When the product becomes part of the user's routine — they use it without prompting.

**How to identify it:**
- Frequency: user returns X times per week without email/notification triggers
- Integration: product is embedded in the user's workflow (e.g., browser tab always open, connected to Slack)
- Investment: user has enough data/configuration that switching cost is real

**Habit loop components to map:**
1. **Trigger:** What prompts usage? (external: email notification; internal: "I need to check my metrics")
2. **Action:** What the user does in the product
3. **Reward:** What value they get (insight, task completed, anxiety reduced)
4. **Investment:** What they add that makes the product more valuable over time (data, configuration, relationships)

## Pain Point Severity Scoring

### Scoring Rubric

#### Frequency (how often users encounter this pain point)

| Score | Criteria |
|-------|----------|
| 1 | Rare — <5% of users encounter it, or once per user journey |
| 2 | Occasional — 5-15% of users, or once per month |
| 3 | Regular — 15-40% of users, or once per week |
| 4 | Frequent — 40-70% of users, or multiple times per week |
| 5 | Constant — >70% of users encounter it every session |

#### Impact (how severely it disrupts the user experience)

| Score | Criteria |
|-------|----------|
| 1 | Cosmetic — slight annoyance, user works around it easily |
| 2 | Minor friction — slows the user down but doesn't block progress |
| 3 | Moderate — causes confusion, user may need to seek help |
| 4 | Major — blocks progress temporarily, user may abandon the task |
| 5 | Critical — blocks progress entirely, user may abandon the product |

#### Breadth (what percentage of the user base is affected)

| Score | Criteria |
|-------|----------|
| 1 | Niche — affects only a specific edge case or rare user type |
| 2 | Narrow — affects a small segment (e.g., enterprise-only, mobile-only) |
| 3 | Moderate — affects a meaningful segment (e.g., all new users, all free-tier users) |
| 4 | Wide — affects most users in a specific stage of the journey |
| 5 | Universal — affects virtually all users regardless of segment |

### Classification Thresholds

| Severity Score | Classification | Action |
|---------------|---------------|--------|
| 4.0-5.0 | Critical | Fix immediately — causes churn or blocks activation |
| 3.0-3.9 | Major | Plan to fix this quarter — significant friction |
| 2.0-2.9 | Minor | Backlog — annoyance, not a blocker |
| 1.0-1.9 | Trivial | Monitor — may not be worth fixing |

### SaaS-Specific Pain Point Modifiers

Apply these adjustments when scoring:

| Context | Modifier |
|---------|----------|
| Pain point occurs during first session | +1 to Impact (first impressions are irreversible) |
| Pain point blocks the activation moment | +1 to Impact (directly affects conversion) |
| Pain point triggers support tickets | +1 to Frequency (creates operational cost) |
| Pain point is cited in churn interviews | +1 to Impact (validated churn driver) |
| Pain point affects only annual-plan users at renewal | +1 to Breadth (renewal is high-stakes) |

## Opportunity Scoring and Prioritization

### Opportunity Score Formula

```
Opportunity Score = Pain Severity × Business Impact × Feasibility
```

Each factor on a 1-5 scale. Maximum score: 125. Minimum: 1.

### Business Impact Rubric

| Score | Criteria |
|-------|----------|
| 1 | No measurable business metric change |
| 2 | Minor improvement to a secondary metric (e.g., support ticket volume) |
| 3 | Moderate improvement to a primary metric (e.g., trial-to-paid conversion +2-5%) |
| 4 | Significant improvement to a primary metric (e.g., churn reduction by 1-2 points) |
| 5 | Transformative — unlocks a new revenue stream, dramatically improves unit economics |

### Feasibility Rubric

| Score | Criteria |
|-------|----------|
| 1 | Requires fundamental product/architecture change, 3+ months |
| 2 | Major development effort, 1-3 months, cross-team coordination |
| 3 | Moderate effort, 2-4 weeks, single team |
| 4 | Small effort, 1-2 weeks, well-understood implementation |
| 5 | Trivial — copy change, config update, email trigger, <1 week |

### Opportunity Tiers

| Tier | Score Range | Action |
|------|-----------|--------|
| Quick Wins | Feasibility 4-5, any Pain Severity | Do first — low effort, immediate improvement |
| Strategic Bets | Business Impact 4-5, Feasibility 1-3 | Plan carefully — high payoff but needs investment |
| Incremental Fixes | Pain Severity 2-3, Feasibility 3-5 | Batch into sprints — steady improvement |
| Deprioritize | Business Impact 1-2, Feasibility 1-2 | Skip unless context changes |

## Emotion Curve Patterns

### Common SaaS Emotion Curve Shapes

| Pattern | Shape | Description | Typical Cause |
|---------|-------|-------------|---------------|
| The Dip | High → Low → High | Excitement at sign-up, frustration during setup, recovery after activation | Complex onboarding with strong core product |
| The Cliff | High → Low → Flat | Excitement fades and never recovers | Poor onboarding, no aha moment reached |
| The Ramp | Low → Medium → High | Skeptical start, builds confidence over time | B2B products with gradual value discovery |
| The Plateau | High → Medium → Flat | Initial excitement stabilizes into routine | Product delivers on promise but doesn't delight |
| The Roller Coaster | Alternating highs and lows | Inconsistent experience | Bugs, uneven feature quality, unreliable performance |

### Emotion Curve Intervention Points

- **Emotional valleys before Stage 3 (Activation):** Highest priority — users who feel bad before activating won't convert
- **Emotional peaks:** Reinforce these — add celebration UI, social sharing, or upgrade prompts at high points
- **Flat segments:** Dangerous in Retention — indifference precedes churn. Introduce feature discovery or engagement hooks.
- **Declining trend entering Stage 4:** Retention is at risk. Investigate what's eroding satisfaction post-conversion.

## Decision Trees

### Journey Scope Selection

```
How much context has the user provided?
├── Full product description + data → Map full lifecycle
├── Specific problem area ("our onboarding is broken") → Map single stage in depth
├── Task-level question ("how do users export reports?") → Map task-specific journey
└── Vague ("map our user journey") → Ask clarifying questions, default to full lifecycle
```

### Data Availability Impact

```
Does the user have quantitative data (analytics, churn data, conversion rates)?
├── YES → Use actual numbers for Reach/Breadth, tag as High confidence
│         Use real drop-off rates for emotion curve calibration
├── PARTIAL → Use data where available, estimate gaps, tag mixed confidence
└── NO → Estimate based on SaaS benchmarks and product category
          Tag all scores as Low confidence
          Recommend data collection as a top opportunity
```

## Edge Cases

- **Multi-persona product:** Map one journey per persona. Start with the highest-revenue persona. Note where journeys diverge and where they share touchpoints.
- **Sales-led vs. product-led:** Sales-led products may skip Trial (user goes from Awareness to a demo to Activation). Adapt the stages — "Trial" becomes "Evaluation" with demo/POC touchpoints.
- **Platform / marketplace products:** Two-sided journeys (buyer and seller). Map each side separately. Identify the moments where the two journeys intersect.
- **Product with no free tier:** Awareness → Purchase → Activation (no Trial stage). The purchase itself is a moment of truth. Map the demo/evaluation experience in its place.
- **Enterprise with long sales cycles:** Awareness and Trial stages may span months and involve multiple stakeholders. Map the champion's journey (the internal advocate), not the entire buying committee.

## Sources and Rationale

- **Five-stage SaaS lifecycle:** Adapted from the Pirate Metrics (AARRR) framework by Dave McClure, extended with Expansion/Advocacy to reflect modern SaaS growth models (product-led growth, land-and-expand).
- **Moment-of-truth framework:** Synthesized from Chamath Palihapitiya's activation metric work (Facebook) and the Jobs-to-Be-Done framework (Christensen). Adapted for SaaS with the three-moment model (aha, activation, habit).
- **Pain point severity scoring:** Based on usability severity ratings (Nielsen Norman Group) adapted with SaaS-specific modifiers for business impact.
- **Emotion curve:** Derived from service design blueprinting (Shostack) and experience mapping practices. The textual representation is adapted for LLM output where visual diagrams aren't available.
- **Opportunity scoring:** Multi-criteria scoring adapted from the Opportunity Solution Tree framework (Teresa Torres) with feasibility and business impact dimensions.
