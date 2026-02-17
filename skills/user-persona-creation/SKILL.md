---
name: user-persona-creation
description: Create structured, evidence-based user personas for SaaS and digital products. Use when the user asks to create personas, understand their users, define their target audience, segment their market, identify user types, or asks "who is my user?" or "who am I building for?" Covers behavior-driven persona creation, jobs-to-be-done mapping, pain/gain analysis, technology adoption positioning, and SaaS-specific attributes like adoption triggers, churn signals, and willingness to pay.
---

# User Persona Creation

Create structured, behavior-driven user personas for SaaS and digital products. Unlike raw LLM output that produces generic, demographic-heavy personas ("Sarah, 34, marketing manager, likes coffee"), this skill produces personas grounded in real behavioral patterns — organized around jobs-to-be-done, pain points, decision criteria, and SaaS-specific attributes like adoption triggers, churn signals, and willingness to pay. The result is a persona a product team can actually design and prioritize against.

## Core Workflow

### Step 1: Gather Context and Research Inputs

Establish what information exists before creating personas:

1. **Identify available evidence:**
   - User interviews or survey data (strongest signal)
   - Support tickets or feature requests (behavioral evidence)
   - Analytics data (usage patterns, funnel drop-offs)
   - Sales call notes or CRM data (buying patterns)
   - Founder/team intuition (weakest signal — label as assumption)

2. **Assess the product stage:**
   - Pre-launch (no users) → Persona is hypothesis-driven. Label everything Low confidence. Focus on the problem space, not product features.
   - Early-stage (some users) → Blend evidence with assumptions. Identify which persona attributes are validated vs. hypothesized.
   - Growth-stage (meaningful data) → Evidence-driven. Prioritize behavioral data over demographics.

3. **Clarify scope:** Ask the user:
   - What does the product do and for whom?
   - What problem does it solve?
   - How many distinct user types do they believe exist?
   - Do they have any user research, analytics, or customer feedback available?

If the user provides only a product idea with no research, proceed with hypothesis-driven personas but flag every assumption explicitly. Do not invent research that doesn't exist.

### Step 2: Identify Behavioral Segments

Segment users by behavior and need, not demographics:

1. **Map the jobs-to-be-done:**
   - What functional job does the user hire this product to do? (e.g., "Track project progress across my team")
   - What emotional job? (e.g., "Feel confident my team is on track")
   - What social job? (e.g., "Look organized to my clients")

2. **Identify distinct behavioral clusters:**
   - Group users by HOW they use the product (frequency, features used, workflow)
   - Group by WHY they use it (different jobs, different trigger events)
   - Group by WHERE they are in the adoption lifecycle (evaluators, new users, power users, at-risk users)

3. **Apply segmentation criteria from [references/framework.md](references/framework.md):**
   - Primary segmentation: Job-to-be-done (what they need to accomplish)
   - Secondary segmentation: Adoption stage (how they relate to the product)
   - Tertiary segmentation: Decision-making pattern (how they evaluate and buy)

Target: 2-4 personas for most SaaS products. More than 5 signals over-segmentation — merge or prioritize. Fewer than 2 suggests insufficient understanding of the user landscape.

### Step 3: Build Each Persona Profile

For each identified segment, construct a full persona following the schema in [references/output-schema.md](references/output-schema.md):

1. **Identity (brief):** Name, role, and one-sentence behavioral summary. Demographics only where they influence product decisions (e.g., technical proficiency affects onboarding design).

2. **Jobs-to-be-done:** Primary functional job, emotional job, social job. State the context (when, where, how often) and the desired outcome.

3. **Current workflow:** How they accomplish the job today (before using this product). Identify each step, what tools they use, and where the friction is. This is where product opportunities live.

4. **Pain points:** Specific, observable frustrations — not generic complaints. Each pain must be tied to a workflow step or a job-to-be-done. Rate severity (Critical / High / Medium / Low).

5. **Gains sought:** What "better" looks like for them. What would make them recommend the product? What metrics improve in their life/work?

6. **Decision criteria:** How they evaluate and choose tools. What matters most? (Price, ease of use, integrations, brand trust, peer recommendation, specific feature). Rank the top 3-5 criteria.

7. **SaaS-specific attributes:** Apply the SaaS lens from [references/framework.md](references/framework.md):
   - Adoption trigger: What event causes them to search for a solution?
   - Evaluation behavior: How do they evaluate? (Free trial, demo request, peer review, comparison site)
   - Willingness to pay: What's their budget range? Who approves the purchase?
   - Churn signals: What would cause them to leave?
   - Expansion triggers: What would cause them to upgrade or add seats?

8. **Technology adoption profile:** Where do they sit on the adoption lifecycle? (Innovator, Early Adopter, Early Majority, Late Majority, Laggard). This affects messaging, onboarding, and feature expectations.

### Step 4: Map Persona Relationships

Show how personas relate to each other and to the product:

1. **Persona priority matrix:** Rank personas by strategic importance:
   - Revenue potential (willingness to pay x segment size)
   - Acquisition feasibility (how reachable, how ready to buy)
   - Retention potential (likelihood to stay and expand)
   - Product alignment (how well the current/planned product serves them)

2. **Interaction mapping:** How do the personas interact?
   - Does one persona buy and another use? (Buyer vs. User)
   - Does one persona influence another's adoption? (Champion vs. Decision-maker)
   - Do personas collaborate within the product? (Different roles, same workflow)

3. **Conflict identification:** Where do persona needs conflict?
   - Feature A benefits Persona 1 but complicates things for Persona 2
   - Pricing that works for Persona 1's segment is too expensive for Persona 2

### Step 5: Validate and Assign Confidence

Review each persona for quality and tag confidence levels:

1. **Evidence audit:** For each persona attribute, tag the source:
   - **High confidence [H]:** Based on user research, analytics, or direct customer data
   - **Medium confidence [M]:** Based on industry patterns, analogous products, or limited data
   - **Low confidence [L]:** Based on assumption or founder intuition — needs validation

2. **Completeness check:** Verify every required field in the schema is populated. Flag any persona where >50% of attributes are Low confidence — this persona is a hypothesis, not a finding.

3. **Differentiation check:** Each persona must be meaningfully different from the others. If two personas share the same job-to-be-done, same pain points, and same decision criteria, merge them.

### Step 6: Generate Validation Recommendations

Personas are living documents — provide a plan to validate and update them:

1. **Highest-risk assumptions:** List the 3-5 assumptions with the biggest impact if wrong
2. **Validation methods:** For each assumption, suggest how to validate (user interviews, A/B tests, analytics, surveys)
3. **Update triggers:** Define when the personas should be revisited (new market entered, significant churn spike, major feature launch, quarterly review)

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Context** — product description, research inputs, methodology notes
- **Persona Profiles** (2-4) — full structured profile for each persona
- **Persona Priority Matrix** — ranked by strategic importance with scores
- **Relationship Map** — how personas interact and where they conflict
- **Confidence Summary** — overall evidence quality and key assumptions
- **Validation Plan** — highest-risk assumptions and how to test them

Expected length: 2,000-4,000 words depending on the number of personas.

## Quality Criteria

- [ ] Each persona is organized around jobs-to-be-done (not just demographics)
- [ ] Pain points are specific and tied to workflow steps (not generic frustrations)
- [ ] Decision criteria are ranked, not just listed
- [ ] SaaS-specific attributes included (adoption trigger, churn signals, willingness to pay)
- [ ] Technology adoption lifecycle position assigned to each persona
- [ ] Confidence levels tagged on every major attribute [H/M/L]
- [ ] Personas are meaningfully differentiated from each other
- [ ] Validation plan identifies highest-risk assumptions with specific test methods
- [ ] Output follows the schema in references/output-schema.md

## References

- **Behavioral segmentation and JTBD methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (project management tool for remote agencies):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Demographics-first personas:** Leading with age, gender, education, and hobbies instead of behavior and motivation. Demographics are only useful when they directly influence product decisions (e.g., technical proficiency affects onboarding complexity). A persona built around "34-year-old marketing manager who enjoys hiking" tells the product team nothing actionable.

2. **Aspirational instead of evidence-based:** Creating personas that describe ideal users rather than real ones. If the product is pre-launch with no users, label the personas as hypotheses. Don't write them with the same confidence as research-backed personas — this creates false certainty that leads to building the wrong thing.

3. **Pain points without context:** Listing generic frustrations ("too many tools," "wastes time") without connecting them to specific workflow steps or JTBD. Every pain point must answer: pain doing WHAT, during WHICH step, and HOW SEVERE? "Wastes time" is useless. "Spends 45 minutes every Monday manually compiling status updates from 3 different tools" is actionable.

4. **Missing the buyer-user distinction:** In B2B SaaS, the person who buys the product is often not the person who uses it daily. A persona set that only describes end-users misses the decision-maker whose criteria (ROI, compliance, vendor reputation) drive the purchase. Always check: who pays, who decides, and who uses?

5. **Too many personas:** Creating 6+ personas to cover every possible user type. This dilutes focus and makes prioritization impossible. If the product team can't name their top 2 personas and explain how they differ, there are too many. Merge similar personas and deprioritize edge cases.
