# Framework: Devil's Advocate

This framework provides the structured challenge methodology, risk assessment tools, and value proposition testing approaches for adversarial analysis of SaaS product ideas.

## Methodology Overview

Devil's Advocate analysis combines three disciplines: assumption mapping (from lean startup methodology), value proposition stress-testing (from Strategyzer and jobs-to-be-done theory), and customer objection modeling (from solution selling and enterprise sales methodologies). The approach is structured to be constructive — every challenge must include a validation path. The goal is de-risking, not discouraging.

## Phase 1: Assumption Extraction and Risk Ranking

### The Six Assumption Categories

Every SaaS product idea rests on assumptions in these categories:

| Category | Core Question | What to Extract |
|----------|--------------|-----------------|
| **Problem** | Does this problem exist and is it painful enough? | Problem severity, frequency, willingness to pay for a solution |
| **Customer** | Will the right people find and adopt this? | Target customer clarity, reachability, purchase authority, adoption willingness |
| **Solution** | Does this product actually solve the problem? | Solution-problem fit, usability, completeness, superiority over alternatives |
| **Market** | Is the market big enough and is the timing right? | Market size, growth trajectory, competitive density, timing signals |
| **Business Model** | Will the economics work? | Unit economics viability, pricing-value alignment, scalability of cost structure |
| **Timing** | Why now and not before or later? | Technology enablers, market shifts, regulatory changes, cultural readiness |

### Assumption Risk Matrix

For each identified assumption, assess on two dimensions:

**Certainty** (how confident are we that this assumption is true?):
- **High:** Validated with data, multiple signals confirm it
- **Medium:** Some evidence supports it, reasonable to believe but not proven
- **Low:** Assumption only — no evidence, based on founder intuition or analogy

**Impact** (what happens if this assumption is wrong?):
- **Fatal:** Idea dies. No pivot saves it.
- **Major:** Idea needs significant redesign (different customer, different pricing, different approach)
- **Minor:** Adjustments needed but core thesis survives

### Risk Priority Matrix

```
                    LOW CERTAINTY          HIGH CERTAINTY
                    
FATAL IMPACT    │ ★ CHALLENGE FIRST   │  Monitor           │
                │   (highest risk)     │  (validated but    │
                │                      │   still check)     │
                ├──────────────────────┤──────────────────── │
MAJOR IMPACT    │ ★ CHALLENGE SECOND  │  Note              │
                │   (high risk)        │  (aware, not       │
                │                      │   urgent)          │
                ├──────────────────────┤──────────────────── │
MINOR IMPACT    │   Acknowledge        │  Skip              │
                │   (low priority)     │  (safe)            │
```

Focus challenge effort on the top-left quadrant: low certainty + high impact. These are the assumptions that could kill the idea and haven't been validated.

## Phase 2: Assumption Challenge Techniques

### Technique 1: Inversion ("Why Would This NOT Be True?")

For each assumption, generate the strongest possible counter-argument. Not a strawman — a genuine, good-faith argument for why the assumption might be wrong.

**Template:**
```
Assumption: [X is true]
Inversion: What if [X is not true]? The strongest evidence for this would be:
- [Counter-evidence 1]
- [Counter-evidence 2]
- [Analogous failure where someone believed X and was wrong]
```

### Technique 2: Reference Class Forecasting

Compare the assumption to base rates from similar products/markets:

```
Assumption: "We'll achieve 5% monthly growth"
Base rate: Median SaaS startup grows at 3-5% monthly in Year 1, 
but 70% of SaaS startups fail to reach $10K MRR in the first year.
Assessment: The assumption is within the possible range but 
represents above-median performance. Not unreasonable, but not the default.
```

### Technique 3: Pre-Mortem

Imagine the product has failed 12 months from now. Work backward:

```
It's [date + 12 months]. [Product] shut down. 
The most likely reasons, in order:
1. [Most probable failure mode]
2. [Second most probable]
3. [Third most probable]

For each: What assumption being wrong caused this?
```

### Technique 4: The "Who Else Tried This?" Test

Search for companies that attempted something similar:

```
Similar attempts:
- [Company A] tried [similar approach] in [year]. Result: [outcome]. Lesson: [what we learn].
- [Company B] tried [variant]. Result: [outcome]. Lesson: [what we learn].

Does our approach address the failure modes that killed these attempts?
```

## Phase 3: Value Proposition Stress Tests

### Test 1: The Switchover Test

**Framework:** Switching happens when: `Perceived Benefit - Perceived Cost > Current Solution + Switching Cost + Habit Inertia`

| Factor | Evaluate |
|--------|----------|
| Perceived benefit | How much better is this than the current solution? Quantify if possible. |
| Perceived cost | Monthly price + time investment + learning curve |
| Current solution performance | How well does the existing approach work? "Good enough" is the enemy. |
| Switching costs | Data migration, workflow change, team retraining, contract exit |
| Habit inertia | How entrenched is the current behavior? Daily habit = high inertia. |

**Pass criteria:** Benefit clearly exceeds all costs. **Fail criteria:** "Good enough" current solution + any significant switching cost.

### Test 2: The "10x Better" Test

Based on Peter Thiel's principle: a new product needs to be 10x better on at least one dimension to overcome switching inertia.

| Dimension | Current Solution | This Product | Improvement Factor |
|-----------|-----------------|-------------|-------------------|
| Speed | | | x? |
| Price | | | x? |
| Ease of use | | | x? |
| Accuracy | | | x? |
| Coverage/features | | | x? |
| Integration/workflow | | | x? |

**Pass criteria:** 10x improvement on at least one dimension the customer cares about.
**Conditional pass:** 3-5x improvement on 2-3 dimensions.
**Fail:** Marginal improvements across the board — not enough to switch.

### Test 3: The "Would You Pay?" Test

Separate stated interest from willingness to pay:

| Signal | Strength | Example |
|--------|----------|---------|
| "That's interesting" | Weak — polite interest | Survey respondent says "I'd consider it" |
| "I'd try the free version" | Moderate — willing to invest time | Beta signups |
| "I'd pay $X for that" | Strong — named a price | Pricing survey with specific amounts |
| "Can I pre-order?" | Very strong — action matches words | Pre-launch signups with payment |
| "I already hacked together something similar" | Strongest — revealed preference | Users building workarounds (spreadsheets, scripts) |

**Pass criteria:** Evidence of "would pay" strength or stronger from target customer segment.
**Fail criteria:** Only "that's interesting" level signals.

### Test 4: The "Explain It" Test

Can the value proposition be stated in one sentence that would make a target customer respond "I need that"?

**Template:** "[Product] helps [specific customer] [achieve specific outcome] [without/by eliminating specific pain]."

**Evaluation criteria:**
- Is the customer specific? (Not "businesses" but "D2C e-commerce brands doing $1-10M/year")
- Is the outcome specific? (Not "be more productive" but "cut invoice creation time from 30 minutes to 30 seconds")
- Is the pain specific? (Not "save time" but "stop switching between time tracker and invoicing tool")

**Pass:** The sentence makes a real person in the target segment say "yes, that's my problem."
**Fail:** The sentence requires explanation, or the reaction is "that's nice but..."

## Phase 4: Customer Objection Modeling

### Objection Categories and Strength Assessment

| Category | Typical Objections | Strength Assessment |
|----------|-------------------|---------------------|
| **Price** | "Too expensive," "I can get this free," "Not in the budget" | Easily overcome if value is clear; deal-breaker if value isn't proven |
| **Trust** | "Never heard of you," "Is my data safe?" "What if you shut down?" | Moderate — overcome with social proof, security certs, escrow |
| **Switching** | "Already using X," "Migration is too hard," "Team won't adopt" | Often deal-breaker — switching costs are real and rational |
| **Need** | "Don't have this problem," "Current solution works fine" | Deal-breaker if widespread — indicates product-market fit issue |
| **Timing** | "Not now," "After our next funding round," "Next quarter" | Moderate — often means "the value isn't urgent enough" |

### Objection Strength Scale

| Rating | Definition | Implication |
|--------|-----------|-------------|
| **1 - Easy** | Standard objection with known rebuttals | Will lose <10% of otherwise-interested prospects |
| **2 - Moderate** | Requires specific evidence or concessions to overcome | Will lose 10-30% of prospects |
| **3 - Significant** | Structural barrier that can't be talked away | Will lose 30-50% of prospects — needs product/strategy change |
| **4 - Deal-breaker** | Fundamental mismatch between product and customer need | Will lose >50% — indicates a core problem |

### Rebuttal Strategy Framework

For each objection:

1. **Acknowledge:** Don't dismiss the concern. "That's a fair point."
2. **Reframe:** Shift the perspective. "The question isn't whether $29/mo is expensive — it's whether losing 3 hours/week on manual invoicing is more expensive."
3. **Evidence:** Provide specific proof. "Our beta users reduced invoice creation time by 85%."
4. **Action:** Give them a low-risk next step. "Try the free tier for 14 days — no credit card needed."

## Phase 5: Verdict Framework

### Overall Strength Rating

| Rating | Criteria |
|--------|----------|
| **Strong** | Core assumptions are validated or low-risk. Value proposition passes 3+ tests. No deal-breaker objections. Clear path to viable unit economics. |
| **Promising** | Most assumptions are reasonable but 1-2 critical ones are unvalidated. Value proposition passes 2+ tests. Objections are addressable. Needs specific validation before committing resources. |
| **Needs Work** | Multiple critical assumptions are unvalidated. Value proposition fails 1+ tests. Significant objections exist. Idea has potential but needs redesign or pivoting on specific elements. |
| **Fundamental Concerns** | Core thesis is undermined by evidence. Value proposition fails 2+ tests. Deal-breaker objections. Recommend pausing and re-evaluating before investing further. |

### Kill Condition Definition

Every analysis must name the explicit kill condition:

```
"If [specific evidence] is found, this idea should be abandoned or fundamentally pivoted. 
Specifically, look for: [what to measure or test]. 
If [threshold], stop."
```

Example: "If fewer than 5% of surveyed freelancers say they would pay $15+/month for this, the pricing assumption is invalidated and the business model doesn't work."

## Edge Cases

- **User has no idea yet (just exploring):** Focus on the problem space, not the solution. Challenge whether the problem is real before modeling objections to a solution that doesn't exist yet.
- **User is emotionally attached to the idea:** Be extra careful with tone. Lead with strengths before challenges. Frame criticism as "making it stronger" not "finding flaws." But do not soften the substance — honest feedback is the service.
- **Idea is genuinely strong:** Say so clearly. Not every idea needs to be challenged into the ground. Identify the 1-2 real risks that remain and recommend monitoring them.
- **Idea has already been validated (real revenue, real customers):** Shift from assumption challenging to growth risk analysis. The assumptions about "will anyone pay" are answered — focus on "can this scale" and "what threatens the moat."

## Sources and Rationale

- **Assumption mapping:** Lean Startup (Eric Ries), Running Lean (Ash Maurya)
- **Pre-mortem technique:** Gary Klein, "Performing a Project Premortem" (HBR)
- **Value proposition testing:** Strategyzer (Value Proposition Design), Jobs-to-Be-Done (Christensen)
- **10x better principle:** Peter Thiel, "Zero to One"
- **Customer objection modeling:** Solution Selling (Bosworth), MEDDIC, Challenger Sale
- **Switchover analysis:** Behavioral economics (Kahneman — loss aversion, status quo bias)
