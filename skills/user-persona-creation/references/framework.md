# Framework: User Persona Creation

This framework provides the detailed methodology for building behavior-driven user personas for SaaS and digital products. It encodes Jobs-to-Be-Done analysis, behavioral segmentation, pain/gain mapping, technology adoption positioning, and decision-making modeling — specifically tuned for SaaS contexts where adoption triggers, churn signals, and willingness to pay are critical persona attributes.

## Methodology Overview

Traditional persona creation over-indexes on demographics and psychographics, producing profiles that feel real but don't inform product decisions. This framework inverts the approach: start with the job the user needs done, map the behavioral patterns around that job, then add demographics only where they influence product design. The result is a persona that answers "what should we build and for whom?" rather than "what does our imaginary user look like?"

## Component 1: Jobs-to-Be-Done (JTBD) Analysis

### Why JTBD for Personas

JTBD reframes the persona from "who the user IS" to "what the user NEEDS TO ACCOMPLISH." This matters because:
- The same person has different needs in different contexts
- Different people with different demographics may have the exact same need
- Product decisions are driven by the job, not the demographic

### The Three Job Layers

Every user job has three layers. All three must be captured for each persona:

| Layer | Definition | Example (Project Management SaaS) |
|-------|-----------|-----------------------------------|
| **Functional job** | The practical task to accomplish | "Track and coordinate tasks across a distributed team" |
| **Emotional job** | How the user wants to feel | "Feel confident that nothing is falling through the cracks" |
| **Social job** | How the user wants to be perceived | "Be seen as an organized, capable project lead by clients" |

### How to Elicit JTBD

1. **Start with the trigger:** What event causes the user to need this product? (New project starts, team grows past 5, client demands visibility)
2. **Map the desired outcome:** What does success look like after the job is done? (Project delivered on time, client satisfied, no missed deadlines)
3. **Identify the constraints:** What limits how they can do the job? (Budget, team technical skills, existing tool ecosystem)
4. **Find the current solution:** How do they do the job today without this product? (The "fire" they hire your product to put out)

### JTBD Quality Checklist

A well-formed JTBD statement:
- Starts with a verb (Track, Coordinate, Understand, Reduce)
- Is solution-agnostic (doesn't mention a specific tool or method)
- Is specific enough to be testable ("Track task progress" not "manage projects")
- Includes context ("...across a distributed team of 5-15 people")
- Can be prioritized against other jobs

**Good:** "Coordinate task assignments and deadlines across a 5-15 person remote team so that projects ship on time without daily standups."

**Bad:** "Manage projects better." (Too vague, not testable, no context.)

## Component 2: Behavioral Segmentation

### Why Behavior Over Demographics

Two users with identical demographics (same age, role, company size) may use the product in completely different ways and for completely different reasons. Behavior-based segmentation groups users by what they DO, not who they ARE.

### Segmentation Axes

Segment users along these axes, in priority order:

#### Axis 1: Job-to-Be-Done (Primary)

Group users by WHAT they need to accomplish. Different jobs = different personas.

| Signal | Data Source | Example |
|--------|------------|---------|
| Different core workflows | Analytics, user interviews | "Uses the product for client reporting" vs. "Uses it for internal team coordination" |
| Different success metrics | Surveys, interviews | "Measures time saved" vs. "Measures client satisfaction score" |
| Different trigger events | Sales calls, sign-up surveys | "Hired after losing a client due to missed deadline" vs. "Hired when team grew past 10" |

#### Axis 2: Adoption Stage (Secondary)

Group users by WHERE they are in their relationship with the product:

| Stage | Behavior | Product Implications |
|-------|----------|---------------------|
| **Evaluator** | Signed up for trial, exploring features, comparing alternatives | Onboarding, first-value moment, competitive differentiation |
| **New User** | Recently adopted, learning the product, building habits | Feature discovery, activation milestones, support needs |
| **Power User** | Deep, frequent usage, uses advanced features, has built workflows | Expansion opportunities, advocacy potential, platform stability |
| **At-Risk User** | Declining usage, support tickets, exploring alternatives | Churn prevention, re-engagement, pain point resolution |

#### Axis 3: Decision-Making Pattern (Tertiary)

Group users by HOW they evaluate and adopt tools:

| Pattern | Behavior | Implications |
|---------|----------|-------------|
| **Self-serve explorer** | Signs up for free trial, evaluates independently, upgrades when ready | Needs excellent onboarding, clear pricing, low-friction upgrade |
| **Consensus builder** | Evaluates with team, needs buy-in from multiple stakeholders | Needs shareable demos, team trial features, ROI documentation |
| **Top-down mandator** | Buys for the team, mandates usage, cares about compliance and admin | Needs admin controls, SSO, reporting, vendor security review |
| **Peer-influenced adopter** | Buys because a trusted peer recommended it, low personal research | Needs social proof, case studies, community |

### Minimum Viable Segmentation

For early-stage products with limited data, use this simplified approach:

1. Identify the primary job-to-be-done (just one for now)
2. Split by adoption stage (Evaluator vs. Active User at minimum)
3. Note the dominant decision-making pattern
4. You now have 2 personas minimum — expand as evidence grows

## Component 3: Pain/Gain Mapping

### Pain Point Classification

Not all pain points are equal. Classify each pain by severity and type:

| Severity | Definition | Product Response |
|----------|-----------|-----------------|
| **Critical** | Blocks the user from completing their job. They CANNOT proceed. | Must solve — this is a core feature requirement |
| **High** | Significantly slows or frustrates the user. They find workarounds. | Should solve — major differentiator opportunity |
| **Medium** | Annoying but tolerable. User has adapted. | Could solve — nice to have, improves NPS |
| **Low** | Minor friction. User barely notices. | Deprioritize — not worth product investment now |

| Type | Definition | Example |
|------|-----------|---------|
| **Functional** | Can't do the thing, or it takes too long | "Manually exporting data from 3 tools takes 45 min/week" |
| **Emotional** | Feels anxious, frustrated, or overwhelmed | "Never sure if my team is actually on track until it's too late" |
| **Financial** | Costs too much money or wastes revenue | "Paying $200/mo for a tool the team barely uses" |
| **Process** | Workflow is broken, has unnecessary steps | "Have to update the same status in two different systems" |

### Pain Point Quality Test

Every pain point in a persona must pass this test:

1. **Specific:** Describes a concrete situation, not a vague complaint
2. **Observable:** Could be witnessed in a user session or interview
3. **Connected:** Tied to a specific step in the user's current workflow
4. **Severable:** Rated by severity with justification
5. **Actionable:** Suggests a product opportunity (even if the solution isn't defined yet)

**Good pain point:** "Spends 30+ minutes every Friday compiling status updates from Slack, email, and Google Sheets into a client-facing report. Frequently misses items, causing client complaints." [Critical / Process + Functional]

**Bad pain point:** "Frustrated with current tools." (Not specific, not observable, not connected to a workflow step.)

### Gain Mapping

Gains are the positive outcomes the user seeks. Map them as the inverse of pain points:

| Gain Type | Question to Ask | Example |
|-----------|----------------|---------|
| **Required gains** | What must the solution deliver at minimum? | "Must track all tasks in one place" |
| **Expected gains** | What does the user expect but doesn't explicitly ask for? | "Expects real-time updates without manual refresh" |
| **Desired gains** | What would delight the user? | "Would love automated client status reports" |
| **Unexpected gains** | What would exceed expectations? | "AI suggests task dependencies based on past projects" |

## Component 4: Technology Adoption Lifecycle

### Applying Moore's Adoption Model to SaaS

Position each persona on the technology adoption curve. This determines messaging, onboarding approach, and feature expectations:

| Position | Characteristics | SaaS Behavior | Product Implications |
|----------|----------------|---------------|---------------------|
| **Innovator** (2.5%) | Seeks new technology for its own sake, tolerates bugs, wants cutting-edge | Signs up day one, provides feedback, forgives rough edges | Early beta access, feedback loops, "build with us" positioning |
| **Early Adopter** (13.5%) | Sees strategic advantage, willing to take risk for competitive edge | Evaluates quickly, needs vision alignment, less price-sensitive | Vision-driven marketing, case studies showing ROI, white-glove onboarding |
| **Early Majority** (34%) | Pragmatic, needs proof it works, wants references, lower risk tolerance | Needs social proof, thorough evaluation, expects polish | Testimonials, comparison pages, free trial, self-serve onboarding |
| **Late Majority** (34%) | Skeptical, adopts when it becomes standard, needs hand-holding | Buys when "everyone else is using it," needs training/support | Industry reports, migration guides, dedicated onboarding support |
| **Laggard** (16%) | Resists change, adopts only when forced | Forced by mandate, compliance, or tool sunset | Admin-driven deployment, minimal disruption messaging |

### Crossing the Chasm

The biggest gap is between Early Adopters and Early Majority. If the product is in this phase:
- Early Adopter personas need vision and possibility
- Early Majority personas need proof and safety
- These require fundamentally different messaging and onboarding — a single persona set must capture this difference

## Component 5: Decision-Making Process Modeling

### B2B SaaS Buying Process

For B2B SaaS, model the full buying process — it's rarely one person:

| Role | Function | Persona Implications |
|------|----------|---------------------|
| **End User** | Uses the product daily | Cares about UX, speed, feature fit, daily workflow |
| **Champion** | Advocates internally for adoption | Needs ROI story, shareable materials, easy trial setup |
| **Decision Maker** | Has budget authority | Cares about cost, compliance, vendor reputation, scalability |
| **Blocker** | Can veto the purchase | Cares about security, integration with existing stack, migration risk |

A complete persona set for B2B SaaS should cover at least the End User and the Decision Maker. If they're the same person (common in SMB), note that explicitly.

### Decision Criteria Ranking

For each persona, rank their top 5 decision criteria. Common criteria for SaaS:

| Criterion | What It Means | Typical Priority By Segment |
|-----------|--------------|---------------------------|
| **Ease of use** | Low learning curve, intuitive UX | High for SMB, Medium for Enterprise |
| **Price** | Total cost including per-seat, overages | High for SMB, Medium for Enterprise |
| **Integrations** | Works with existing tools (Slack, Jira, Salesforce, etc.) | Medium for SMB, High for Enterprise |
| **Security/Compliance** | SOC 2, GDPR, SSO, encryption | Low for SMB, Critical for Enterprise |
| **Scalability** | Grows with the team/company | Low for SMB, High for Enterprise |
| **Support quality** | Responsive, knowledgeable help | Medium for all |
| **Peer recommendation** | Used by trusted contacts or industry peers | High for Early Majority |
| **Brand/reputation** | Known, trusted vendor | Low for Innovators, High for Late Majority |
| **Customization** | Can adapt to specific workflows | Medium for SMB, High for Enterprise |
| **Migration ease** | Simple to switch from current tool | High when replacing incumbents |

## Component 6: SaaS-Specific Persona Attributes

### Attributes Every SaaS Persona Needs

Beyond standard persona attributes, every SaaS persona must include:

| Attribute | Why It Matters | How to Determine |
|-----------|---------------|-----------------|
| **Adoption trigger** | What event causes them to search for a solution | Interview data, sign-up surveys, "what brought you here?" |
| **Evaluation behavior** | How they assess options (trial, demo, reviews, peer ask) | Sales data, trial conversion patterns, attribution data |
| **Willingness to pay** | Budget range and price sensitivity | Pricing page analytics, sales conversations, competitive pricing |
| **Time to value** | How quickly they need to see results | Trial-to-paid conversion timing, onboarding completion data |
| **Churn signals** | What behaviors predict they'll leave | Usage analytics, support tickets before churn, exit surveys |
| **Expansion triggers** | What causes them to upgrade or add seats | Upgrade patterns, feature usage hitting limits, team growth |
| **Switching costs** | What makes it hard to leave their current solution | Interview data, competitive analysis, data lock-in assessment |

### Churn Signal Patterns

Common SaaS churn signals to watch for in persona development:

| Signal Category | Examples | Persona Relevance |
|----------------|---------|-------------------|
| **Usage decline** | Login frequency drops, key features unused | Power User → At-Risk transition |
| **Support escalation** | Repeated tickets, frustration in tone | Unresolved pain points |
| **Evaluation behavior** | Visiting competitor pricing pages, asking about data export | Active consideration of alternatives |
| **Team changes** | Champion leaves the company, team restructures | Loss of internal advocate |
| **Value plateau** | Hit the ceiling of what the product can do for them | Need for expansion features or integrations |

## Persona Completeness Scoring

### Scoring Rubric

Rate each completed persona for quality:

| Dimension | 1 (Weak) | 3 (Adequate) | 5 (Strong) |
|-----------|----------|--------------|------------|
| **JTBD clarity** | Vague or missing job statement | Functional job stated, emotional/social missing | All three layers with context and desired outcome |
| **Behavioral specificity** | Generic behavior descriptions | Some specific behaviors with frequency | Detailed workflow with tools, timing, and friction points |
| **Pain point quality** | Generic complaints ("too slow") | Specific pains tied to workflow steps | Rated pains with severity, type, and product implications |
| **Decision criteria** | Listed but not ranked | Ranked top 3-5 criteria | Ranked with evidence and rationale |
| **SaaS attributes** | Missing or generic | 3-4 SaaS attributes populated | All 7 SaaS attributes populated with evidence tags |
| **Evidence quality** | All assumptions, no data | Mix of evidence and assumptions, tagged | Majority evidence-backed, assumptions explicitly flagged |
| **Differentiation** | Overlaps significantly with another persona | Some unique attributes, some overlap | Clearly distinct job, behavior, and decision pattern |

**Target: Average score of 3+ across all dimensions.** Personas scoring below 3 need additional research or should be flagged as hypotheses.

## Edge Cases

- **Solo founder with no users:** All personas are hypotheses. Use "proto-personas" label. Focus on the problem space (who has this pain) rather than product usage (who uses which features). Recommend 3-5 customer discovery interviews before treating personas as validated.

- **Platform product with very different user types:** (e.g., a marketplace with buyers and sellers) Create separate persona sets for each side. Map the cross-side dependencies (seller persona success depends on buyer persona behavior).

- **Enterprise product with complex buying committees:** Extend beyond End User + Decision Maker to include IT Evaluator, Procurement, and Executive Sponsor as distinct personas or persona annotations. Focus the full persona treatment on the 2-3 most influential roles.

- **Product pivot — existing personas are wrong:** Don't discard old personas. Create new ones and explicitly document what changed and why. Old personas become the "before" that validates the pivot rationale.

- **B2C SaaS (prosumer):** Buyer and user are the same person. Decision criteria shift toward ease of use, price, and peer recommendation. Simplify the decision-making model but keep JTBD and SaaS attributes.

## Sources and Rationale

- **Jobs-to-Be-Done:** Clayton Christensen (Competing Against Luck), Tony Ulwick (Outcome-Driven Innovation)
- **Behavioral segmentation:** Based on product-led growth patterns (Wes Bush, Product-Led Growth)
- **Technology adoption lifecycle:** Geoffrey Moore (Crossing the Chasm)
- **Pain/Gain mapping:** Alexander Osterwalder (Value Proposition Design)
- **Decision-making modeling:** Based on B2B SaaS buying process research (Gartner, Forrester)
- **Churn signal patterns:** Derived from SaaS retention research (ProfitWell/Paddle, ChurnZero)

Adapted for AI-assisted persona creation where the agent must work with whatever evidence the user provides — from rich research data to a single-sentence product idea — and must clearly communicate the confidence level of every persona attribute.
