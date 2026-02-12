---
name: devils-advocate
description: Systematically challenge product assumptions, test value propositions, and model customer objections for SaaS and digital products. Use when the user needs their idea stress-tested, wants to know why customers might NOT buy, needs assumptions identified and challenged, wants their value proposition evaluated, or asks for objection modeling. Also use when a product spec or idea brief seems overly optimistic or lacks critical scrutiny. Combines assumption challenging, value proposition testing, and customer objection modeling into one structured adversarial analysis.
---

# Devil's Advocate

Provide structured, evidence-based pushback on SaaS product ideas, features, and strategies. Unlike a raw LLM that agrees with the user or offers mild suggestions, this skill systematically identifies hidden assumptions, stress-tests the value proposition against real customer behavior, and models the specific objections target customers would raise — with the goal of making the idea stronger, not killing it.

This skill is designed to be constructive, not hostile. Every challenge comes with a path forward: "Here's the risk, here's what would need to be true to mitigate it, here's how to find out."

## Core Workflow

### Step 1: Extract the Claim Set

Before challenging anything, understand what the user is claiming:

1. **Identify the core thesis:** What is the user betting on? ("Freelancers will pay $29/mo for time-tracked invoicing")
2. **Decompose into assumptions:** Break the thesis into its component beliefs. Every product idea contains hidden assumptions about:
   - **The problem:** Does it exist? Is it painful enough to pay for?
   - **The customer:** Who are they? Will they find this? Can they afford it?
   - **The solution:** Does this actually solve the problem? Better than alternatives?
   - **The market:** Is it big enough? Is it growing?
   - **The business model:** Will the economics work? Can it scale?
   - **The timing:** Why now? What changed?
3. **Rank assumptions by risk:** Which assumptions, if wrong, would kill the idea? These are the ones to challenge hardest. Use the Assumption Risk Matrix in [references/framework.md](references/framework.md).

### Step 2: Challenge Assumptions

For each high-risk assumption, apply the challenge framework:

1. **State the assumption clearly:** "You are assuming that [X]."
2. **Ask the "Why would this NOT be true?" question:** Generate the strongest counter-argument.
3. **Provide evidence where possible:** Cite analogies, market data, competitor outcomes, or customer behavior patterns that support or undermine the assumption.
4. **Assess the damage:** If this assumption is wrong, what happens? (Idea dies, needs pivot, minor adjustment, or doesn't matter?)
5. **Recommend a test:** How could the user validate or invalidate this assumption quickly and cheaply?

Do NOT challenge every assumption equally. Focus energy on the 3-5 that matter most — the ones that would kill the idea if wrong.

### Step 3: Test the Value Proposition

Evaluate whether the stated value proposition actually holds up:

1. **The Switchover Test:** Would a customer switch from their current solution to this? What are the switching costs (monetary, time, learning, data migration, habit change)? Is the improvement large enough to overcome switching inertia?
2. **The "10x Better" Test:** Is this 10x better than the current alternative on at least one dimension? (Speed, price, ease, accuracy, coverage.) If it's only marginally better, customers won't switch — the pain of change exceeds the gain.
3. **The "Would You Pay for This?" Test:** Not "would this be nice to have" but "would you pull out your credit card right now?" Separate polite interest from genuine willingness to pay.
4. **The "Explain It to a Customer" Test:** Can the value proposition be stated in one sentence that makes a target customer say "I need that"? If it takes a paragraph to explain why it's valuable, it's too complex.

For each test, deliver a clear pass/conditional/fail assessment with reasoning.

### Step 4: Model Customer Objections

Predict the specific objections target customers will raise:

1. **Price objections:** "This is too expensive." / "I can get this for free." / "I'm not sure the ROI justifies the cost."
2. **Trust objections:** "I've never heard of you." / "How do I know my data is safe?" / "What happens if you shut down?"
3. **Switching objections:** "I'm already using [competitor]." / "Migration would be a nightmare." / "My team won't adopt another tool."
4. **Need objections:** "I don't actually have this problem." / "My current solution is good enough." / "This is a nice-to-have, not a need."
5. **Timing objections:** "Not right now." / "We're in the middle of something else." / "Let me think about it."

For each objection:
- State it in the customer's voice (not abstract — make it feel real)
- Assess how common this objection would be (affects X% of target market)
- Rate its strength (easily overcome, moderate barrier, deal-breaker)
- Suggest a rebuttal or strategy to address it

### Step 5: Identify Blind Spots

Surface the things the user hasn't thought about:

1. **The "do nothing" competitor:** Most SaaS products don't lose to other SaaS products — they lose to inaction. What's the cost of the customer doing nothing? If it's low, the product has a demand problem.
2. **The adjacent player threat:** Who could add this functionality as a feature? (Platform plays — Stripe adding invoicing, Shopify adding analytics.) These are more dangerous than direct competitors.
3. **The edge cases that break the model:** What scenarios would cause the product to fail or provide negative value? (Customer has unusual data, regulatory constraint, team that won't adopt)
4. **The unsexy dependencies:** What must be true about the market, infrastructure, or customer behavior that the user is taking for granted? (Customers have Shopify, customers read email, customers track time)

### Step 6: Synthesize the Verdict

Deliver a balanced assessment:

1. **Overall strength rating:** Strong / Promising / Needs Work / Fundamental Concerns
2. **Top 3 strengths:** What's genuinely strong about this idea? (The Devil's Advocate is not just negative — acknowledging strengths builds credibility for the criticisms)
3. **Top 3 risks:** The most dangerous assumptions or weaknesses
4. **Recommended actions:** Specific, ordered steps to derisk the idea. Prioritize cheap, fast validation over expensive pivots.
5. **The "kill condition":** What evidence, if found, should cause the user to abandon or fundamentally pivot this idea? Name it explicitly.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Claim Set** — core thesis and decomposed assumptions with risk ranking
- **Assumption Challenges** — top 3-5 challenges with evidence and tests
- **Value Proposition Assessment** — pass/conditional/fail on four tests
- **Customer Objection Model** — predicted objections with rebuttals
- **Blind Spots** — threats and dependencies the user hasn't considered
- **Verdict** — strength rating, strengths, risks, actions, kill condition

Expected length: 1,500-3,000 words. Tone: direct, constructive, specific.

## Quality Criteria

- [ ] At least 5 assumptions identified and ranked by risk
- [ ] Top 3-5 assumptions challenged with specific counter-arguments (not generic concerns)
- [ ] Value proposition tested on all 4 tests (Switchover, 10x Better, Would You Pay, Explain It)
- [ ] At least 5 customer objections modeled in the customer's voice
- [ ] Each objection has a strength rating and suggested rebuttal
- [ ] Blind spots section identifies at least 2 threats the user didn't raise
- [ ] Verdict includes both strengths and risks (not just criticism)
- [ ] Every challenge includes a recommended validation test
- [ ] Tone is constructive — challenges the idea to make it stronger, not to kill it
- [ ] SaaS-specific concerns addressed (churn, switching costs, platform risk, unit economics)

## References

- **Challenge frameworks and risk matrices:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (AI customer support SaaS):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Being negative without being useful:** Listing problems without offering validation tests or paths forward. Every challenge MUST include: "Here's how you'd find out if this is real." The goal is to make the idea stronger, not to discourage the founder.

2. **Generic challenges that apply to everything:** "You might face competition" or "growth could be challenging" are worthless. Challenges must be specific to THIS idea: "Stripe already offers invoicing to their 3.4M users — why would a freelancer install a separate tool when their payment processor does it?"

3. **Missing the "do nothing" competitor:** Obsessing over product competitors while ignoring the biggest threat — that customers simply won't change their current behavior. For most SaaS products, the real competitor is inertia + existing workflow, not another startup.

4. **Challenging the wrong assumptions:** Spending time questioning low-impact assumptions (e.g., "will the logo be the right color?") while ignoring high-impact ones (e.g., "will anyone pay for this?"). Always rank assumptions by risk-if-wrong before challenging.

5. **Confusing devil's advocacy with pessimism:** The skill should feel like a tough-but-fair investor meeting, not a rejection letter. Always acknowledge what's strong before what's risky. Always end with constructive next steps.
