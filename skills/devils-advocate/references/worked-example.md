# Worked Example: Devil's Advocate

This example demonstrates the Devil's Advocate skill applied to an AI SaaS product idea.

## Scenario

**Product:** SupportBot — an AI-powered customer support SaaS that auto-resolves support tickets using a company's knowledge base
**Target Market:** B2B SaaS companies with 50-500 employees that receive 500+ support tickets per month
**Stage:** Pre-launch, founder has a working prototype and 3 design partners
**Context provided:** Founder is excited — design partners love it, resolves 60% of tickets in testing, plans to charge $499/mo.

## Input

> "I'm building an AI customer support tool. It connects to a company's help docs and past ticket history, then automatically responds to incoming support tickets. In testing with 3 design partners, it's resolving about 60% of tickets without human intervention. I'm planning to charge $499/mo for companies getting 500+ tickets. The market is huge — every B2B SaaS needs customer support. Can you give me a reality check?"

## Reasoning

### Step 1: Extract the Claim Set

Core thesis: "B2B SaaS companies will pay $499/mo for an AI tool that auto-resolves 60% of support tickets."

Decomposed into assumptions about problem, customer, solution, market, business model, and timing. Ranked each by certainty and impact.

### Step 2-6: Challenge, Test, Model, Surface, Verdict

Applied the full framework below.

## Output

---

# Devil's Advocate Analysis: SupportBot

## 1. Claim Set

### Core Thesis
"B2B SaaS companies (50-500 employees) will pay $499/mo for an AI tool that automatically resolves 60% of their support tickets using their knowledge base."

**Confidence:** Partially validated — 3 design partners have tested the product, but no one has paid yet.

### Decomposed Assumptions

| # | Assumption | Category | Certainty | Impact if Wrong | Risk Priority |
|---|-----------|----------|-----------|----------------|---------------|
| 1 | The 60% resolution rate holds across diverse companies | Solution | Low | Fatal | Challenge First |
| 2 | Companies will trust AI to respond to customers without review | Customer | Low | Fatal | Challenge First |
| 3 | $499/mo is the right price point for this market | Business Model | Low | Major | Challenge First |
| 4 | Knowledge base quality is sufficient for AI resolution | Solution | Medium | Major | Challenge Second |
| 5 | This is a $499 problem, not a $49 problem | Business Model | Low | Major | Challenge Second |
| 6 | The market is large enough at the 50-500 employee segment | Market | Medium | Minor | Monitor |
| 7 | B2B SaaS companies handle 500+ tickets/mo | Customer | Medium | Minor | Monitor |
| 8 | Timing is right — AI trust has reached sufficient threshold | Timing | Medium | Minor | Monitor |

## 2. Assumption Challenges

### Challenge 1: "The 60% resolution rate will hold across diverse companies"

**Assumption:** "Our AI resolves 60% of tickets automatically."

**Counter-argument:** Your 3 design partners were likely selected because they're a good fit — well-maintained knowledge bases, straightforward products, cooperative support teams. In the wild, you'll encounter companies with incomplete docs, complex products requiring contextual judgment, tickets that are really complaints (not questions), and edge cases your AI hasn't seen. Resolution rates typically drop 20-40% from pilot to production.

**Evidence:** Intercom's Fin AI launched with similar claims and later publicly stated resolution rates vary from 25-60% depending on knowledge base quality. Zendesk's AI features show similar variance. Three design partners is too small a sample to establish a reliable rate — even the 60% may have been measured generously (was "resolution" defined as "customer didn't respond" or "customer confirmed their issue was solved"?).

**Damage assessment:** Fatal if the actual rate is below 30%. At 30% resolution, the ROI calculation changes dramatically — you're saving 150 tickets/month instead of 300, which may not justify $499/mo.

**Validation test:** Define "resolved" precisely (customer confirms solved, not just "customer didn't reply within 48 hours"). Run a blind test with 500 real tickets across 5 companies with varying knowledge base quality. Measure: confirmed resolution rate, false resolution rate (AI said "solved" but customer followed up), and escalation rate. Timeline: 2 weeks. Decision: if resolution rate is <40% across the 5 companies, the core thesis needs revision.

### Challenge 2: "Companies will trust AI to talk to their customers without review"

**Assumption:** "Companies will let AI respond directly to support tickets."

**Counter-argument:** This is the biggest adoption barrier in AI customer support. B2B companies are terrified of AI hallucinating incorrect answers to their customers. One wrong response about a security feature, a billing question, or a compliance issue could damage the relationship with a key account. Most companies will demand a human-in-the-loop approval step, at least initially — which destroys the efficiency gain that justifies the price.

**Evidence:** A 2025 Gartner survey found that 72% of B2B companies require human review of AI-generated customer communications before sending. Even Intercom positions Fin as "AI with human oversight" in their enterprise messaging. The companies willing to let AI respond freely are typically B2C with high volume and low stakes (e-commerce, food delivery), not B2B SaaS where support interactions affect contract renewals.

**Damage assessment:** Major — if most customers require human review, SupportBot becomes an "AI draft" tool (useful but a different product and value proposition). The pricing, messaging, and resolution rate metrics all change.

**Validation test:** Ask your 3 design partners: "Would you turn on fully automatic responses tomorrow for your paying customers, or would you want to review AI responses first?" If all 3 say "review first," that's your answer. Follow up with: "What would need to be true for you to turn off human review?" The answers define your product roadmap. Timeline: 1 day (one conversation per partner).

### Challenge 3: "$499/mo is the right price for this market"

**Assumption:** "$499/mo is the right price for a 50-500 employee B2B SaaS company."

**Counter-argument:** $499/mo sounds reasonable in isolation, but consider the competitive context. Intercom charges $29-99/mo per seat for their full suite including AI features. Zendesk's AI add-ons start at $50/agent/month. Freshdesk has AI features in their $49/agent/month tier. You're asking companies to pay $499/mo for a single feature (AI resolution) on top of their existing support tool, while incumbents are bundling AI into their existing platforms for less.

**Evidence:** The "separate AI tool" vs. "AI feature in existing platform" dynamic has played out in multiple categories. Standalone AI writing tools (Jasper, Copy.ai) have seen significant churn as Google Docs, Notion, and Microsoft added built-in AI writing. The pattern: standalone AI tools win early adopters, then lose to incumbents who add AI features. Zendesk and Intercom are both aggressively adding AI — they have the distribution and the customer relationship.

**Damage assessment:** Major — if incumbents bundle equivalent AI features, the standalone product needs to be dramatically better (not just 60% resolution — more like 80%+) or positioned differently (specialized for a niche the incumbents ignore).

**Validation test:** Ask 10 companies in your target market two questions: (1) "How much do you spend on customer support tools today?" and (2) "Would you add a $499/mo tool on top of that, or would you expect AI features to be included in your existing tool?" If >60% expect it included, your pricing model has a structural problem. Timeline: 1-2 weeks of outreach.

### Challenge 4: "Knowledge base quality is sufficient"

**Assumption:** "Companies have good enough documentation for AI to resolve tickets."

**Counter-argument:** Most B2B SaaS companies have documentation that is incomplete, outdated, or internally inconsistent. The AI is only as good as the knowledge it's trained on. Companies with poor docs will see low resolution rates and blame SupportBot, not their documentation.

**Evidence:** A survey by Document360 found that 53% of SaaS companies rate their own documentation as "needs improvement." Only 18% rate it as "comprehensive and up-to-date." Your design partners likely have better-than-average documentation (they're the type of company that volunteers for AI pilots).

**Damage assessment:** Major — creates a hidden dependency that determines product success but is outside your control.

**Validation test:** Before onboarding any customer, run a "documentation readiness score" — an automated audit that checks: coverage (% of product features documented), freshness (% of articles updated in last 6 months), and consistency (contradictions between articles). Set a minimum threshold. If the customer scores below it, recommend documentation improvements before activating full auto-resolution. This turns a weakness into a feature ("SupportBot helps you identify documentation gaps"). Timeline: build the audit as a feature, 2-3 weeks.

## 3. Value Proposition Assessment

### The Switchover Test
- **Current solution:** Human support agents using Zendesk/Intercom/Freshdesk. Companies already have workflows, macros, and trained teams.
- **Switching costs:** SupportBot doesn't replace the support tool — it layers on top. But: team needs training, trust must be built gradually, workflow changes required. Moderate switching cost.
- **Benefit magnitude:** At 60% resolution, a company with 500 tickets/mo saves ~300 human responses. At $15/ticket cost (loaded agent time), that's $4,500/mo savings. Against $499/mo price, that's 9:1 ROI.
- **Verdict:** **Conditional Pass** — the ROI math works IF the 60% resolution rate holds AND the company trusts fully automated responses. Both are big IFs.
- **Reasoning:** The economic case is strong on paper. The behavioral case (trusting AI with customer communication) is the real barrier, not the price.

### The "10x Better" Test

| Dimension | Human Support | SupportBot | Factor |
|-----------|--------------|------------|--------|
| Speed | 2-4 hour response | <1 minute | ~100x |
| Cost per ticket | $15 | ~$0.50 (LLM cost) | 30x |
| Availability | Business hours | 24/7 | 3x |
| Consistency | Varies by agent | Consistent | 2-3x |
| Accuracy | Human judgment | KB-dependent | 0.5-1x |

- **Best dimension:** Response speed (100x) and cost (30x)
- **Verdict:** **Pass** — speed and cost improvements are dramatic and genuine.
- **Reasoning:** The 10x bar is cleared on speed and cost. The concern is accuracy, where AI may be worse than humans — and accuracy is the dimension customers care about most for B2B support.

### The "Would You Pay?" Test
- **Strongest demand signal:** 3 design partners using the product actively (invested time, not money).
- **Signal strength:** Between "would try free" and "would pay" — they're using it but haven't paid.
- **Verdict:** **Conditional Pass** — genuine engagement, but untested willingness to pay.
- **Reasoning:** Design partners who get something free are not proof of willingness to pay. Convert at least one to a paid plan before treating demand as validated.

### The "Explain It" Test
- **One-sentence value prop:** "SupportBot resolves 60% of your customer support tickets automatically using your existing help docs — 24/7, in under a minute."
- **Verdict:** **Pass** — clear, specific, and would make a support team leader say "tell me more."
- **What could be stronger:** The "60%" claim needs proof. Consider: "SupportBot automatically resolves support tickets using your knowledge base — our customers see 40-60% resolution rates within the first month."

### Overall Value Prop Score
- **Tests passed:** 2 pass, 2 conditional = Promising but unvalidated
- **Assessment:** The idea solves a real problem with strong economics. The gap is not "does this work?" but "will companies trust it and will it work outside pilot conditions?"

## 4. Customer Objection Model

### Objection 1: "What if the AI gives a wrong answer to an important customer?"
- **Category:** Trust
- **Prevalence:** ~80% of prospects will raise this
- **Strength:** 3 - Significant
- **Rebuttal:** Offer a "supervised mode" where AI drafts responses and a human approves before sending. After the team sees accuracy over 100+ tickets, offer to switch to automatic. Include a confidence threshold — AI only auto-sends when confidence is above 90%, otherwise routes to human.
- **Unresolved risk:** Even one high-profile wrong answer could cause a customer to churn from SupportBot and tell others.

### Objection 2: "We already have Intercom/Zendesk and they're adding AI features"
- **Category:** Switching
- **Prevalence:** ~60% of prospects
- **Strength:** 3 - Significant
- **Rebuttal:** Position SupportBot as a specialist vs. generalist: "Intercom's AI is a feature in a suite. SupportBot is purpose-built for resolution, which is why our resolution rates are 2-3x higher." Prove this with published benchmarks. Alternatively, build SupportBot as a plugin for Zendesk/Intercom rather than a standalone tool.
- **Unresolved risk:** If Zendesk/Intercom close the resolution rate gap, this objection becomes a deal-breaker.

### Objection 3: "Our docs aren't good enough for this to work"
- **Category:** Need (readiness)
- **Prevalence:** ~40% of prospects
- **Strength:** 2 - Moderate
- **Rebuttal:** Turn this into an upsell: "SupportBot includes a knowledge base health check that identifies gaps. We'll show you exactly what to improve, and as your docs get better, your resolution rate goes up." This makes the product stickier over time.

### Objection 4: "$499/mo is a lot — can we start smaller?"
- **Category:** Price
- **Prevalence:** ~50% of prospects
- **Strength:** 2 - Moderate
- **Rebuttal:** Offer a lower entry tier ($199/mo for 200 tickets/mo) or a performance-based model ("$2 per resolved ticket — you only pay when it works"). Performance pricing aligns incentives and removes risk for the customer.

### Objection 5: "What happens to our support team? Will this replace them?"
- **Category:** Need (political)
- **Prevalence:** ~30% of prospects (especially when talking to support managers, not executives)
- **Strength:** 2 - Moderate
- **Rebuttal:** "SupportBot handles the repetitive questions so your team can focus on complex, high-value interactions. It makes support agents better, not redundant." Position as a tool for the support team, not a replacement. Marketing to support managers, not around them.

## 5. Blind Spots

### Blind Spot 1: The "Do Nothing" Competitor
Support teams have been handling tickets manually for decades. The status quo isn't painful enough for most companies to act urgently. Your target companies have 500+ tickets/mo but they're also already handling them — they've hired agents, built macros, created templates. "Do nothing differently" is your strongest competitor. The key question: at what ticket volume does the pain become acute enough to seek automation? Probably higher than 500/mo — more like 1,000+.

**Recommendation:** Validate the pain threshold. Interview 10 companies at different ticket volumes (500, 1,000, 2,000, 5,000/mo). Where does the "we need a solution" urgency actually kick in?

### Blind Spot 2: LLM Cost at Scale
At 500 tickets/mo with an average of 3 AI interactions per ticket (initial response + follow-ups), that's 1,500 LLM calls/month per customer. At current API pricing with model routing (80% Haiku, 20% Sonnet), that's roughly $15-30/customer/month in LLM costs. At $499/mo revenue, that's healthy. But: if resolution requires more context (longer tickets, larger knowledge bases), token usage could 3-5x. And if you offer unlimited tickets, one enterprise customer with 5,000 tickets/mo could cost $150+/mo in LLM fees alone. Have you modeled the cost ceiling per customer?

**Recommendation:** Model per-customer LLM cost at 500, 2,000, and 10,000 tickets/mo. Set usage caps or tiered pricing that ensures every customer remains profitable. Monitor per-customer LLM cost as a key metric from day one.

### Blind Spot 3: The Enterprise Procurement Barrier
B2B SaaS companies with 50-500 employees often have procurement processes, security reviews, and IT approval requirements for new vendors — especially for tools that access customer data. Your sales cycle may be 3-6 months, not the 1-week self-service signup you might be imagining. This affects cash flow, runway, and acquisition economics.

**Recommendation:** Ask your design partners how long their internal approval process took (or would take if you charged them). If it's >30 days, plan for a longer sales cycle and model the cash flow impact.

## 6. Verdict

### Overall Strength: Promising

SupportBot solves a real, quantifiable problem with strong unit economics on paper. The speed and cost improvements are genuine (10x+), and the one-sentence value prop is clear. However, two critical assumptions are unvalidated: (1) the 60% resolution rate holding in production, and (2) companies trusting AI to respond to customers autonomously. Both must be tested before scaling.

### Top 3 Strengths
1. **Clear ROI story:** 60% ticket resolution at $499/mo vs. $4,500/mo in agent cost savings. The math is compelling and easy for a buyer to justify.
2. **Speed advantage is dramatic:** Sub-minute response vs. 2-4 hour average. This is a genuine 10x improvement that customers will feel immediately.
3. **Knowledge base integration is a moat:** The more a company uses SupportBot, the more it learns their product. This creates switching costs and improves over time — a virtuous cycle.

### Top 3 Risks
1. **Resolution rate fragility:** If the 60% drops to 30% in production, the entire value proposition collapses. This is the single biggest risk and it's poorly validated (n=3 friendly companies).
2. **Incumbent bundling:** Zendesk and Intercom adding comparable AI features as included features, not $499/mo add-ons. Timeline: 6-12 months.
3. **Trust barrier:** B2B companies may require human review of every AI response, which transforms the product from "auto-resolution" to "AI drafting" — a different (and less differentiated) product.

### Recommended Actions

| Priority | Action | Purpose | Effort |
|----------|--------|---------|--------|
| 1 | Define "resolved" precisely and measure true resolution rate across 5+ companies | Validate the core 60% claim | 2-3 weeks |
| 2 | Ask all 3 design partners to pay $499/mo (or negotiate a price they would pay) | Validate willingness to pay | 1 week |
| 3 | Build "supervised mode" as the default onboarding experience | Address the trust barrier proactively | 2-3 weeks |
| 4 | Run a documentation readiness audit on 10 potential customers | Validate knowledge base quality assumption | 1-2 weeks |
| 5 | Model per-customer LLM costs at 500/2,000/10,000 tickets and set pricing tiers | Protect margins at scale | 2-3 days |

### Kill Condition
"If the true resolution rate (customer-confirmed solved, not 'no reply') is below 35% across 5+ companies with varying knowledge base quality, the core value proposition doesn't hold. At 35%, the ROI calculation flips — savings don't justify $499/mo, and the product needs to be repositioned (cheaper, or solving a different problem like 'AI-assisted drafting' instead of 'AI resolution')."

**How to test:** Deploy to 5 companies across different industries. Track confirmed resolution rate (customer replies "yes, solved" or doesn't reopen within 7 days). Minimum 200 tickets per company. If 3+ companies are below 35%, stop and reassess.

---

## Quality Check

- [x] 8 assumptions identified and ranked by risk
- [x] Top 4 challenged with specific counter-arguments, evidence, and validation tests
- [x] Value proposition tested on all 4 tests (Switchover: Conditional, 10x: Pass, Pay: Conditional, Explain: Pass)
- [x] 5 customer objections modeled in the customer's voice
- [x] Each objection has strength rating (2-3) and rebuttal strategy
- [x] 3 blind spots identified (do nothing, LLM cost at scale, enterprise procurement)
- [x] Verdict includes strengths (3) and risks (3) — balanced assessment
- [x] Every challenge includes a validation test with timeline and decision criteria
- [x] Tone is constructive — "promising" with clear path to validation
- [x] Kill condition is specific and testable (35% resolution rate threshold)
