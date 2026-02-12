# Framework: Competitor Research

This framework provides the systematic evaluation methodology for competitive landscape analysis. It combines Jobs-to-Be-Done competitor identification with multi-dimensional scoring and strategic gap analysis, specifically tuned for SaaS and digital product markets.

## Methodology Overview

Traditional competitor analysis lists similar products and compares features. This framework goes deeper: it starts by defining the competitive arena through the customer's job-to-be-done (not the product category), evaluates competitors across 8 weighted dimensions, and synthesizes the scored landscape into exploitable strategic gaps. The output is a scored, evidence-tagged analysis that supports positioning and prioritization decisions.

## Phase 1: Arena Definition (Jobs-to-Be-Done)

### Why JTBD for Competitor Identification

Defining competitors by product category misses the real competitive set. A SaaS invoicing tool doesn't just compete with other invoicing tools — it competes with spreadsheets, accountants, and the "send a PayPal request" workflow. JTBD captures this by asking: "What does the customer hire to get this job done?"

### How to Define the Arena

1. **State the core job:** "[Target customer] needs to [accomplish X] so they can [achieve Y]."
2. **Identify all solutions to that job:** Products, services, manual processes, and "do nothing."
3. **Filter by relevance:** Exclude solutions the target customer would never realistically consider (e.g., enterprise tools for SMB customers, free tools for enterprise buyers).
4. **Tier the competitors:**
   - **Direct:** Same product category, same target customer
   - **Indirect:** Different approach, same job-to-be-done
   - **Emerging:** New entrants or pivoting companies entering the space

### Arena Scope Parameters

| Parameter | Question | Impact on Analysis |
|-----------|----------|-------------------|
| Market segment | SMB, mid-market, or enterprise? | Determines which competitors are relevant |
| Geography | Global, regional, or local? | Some competitors are region-specific |
| Budget range | What do target customers pay today? | Filters out tools in a completely different price bracket |
| Switching willingness | How much friction to change solutions? | Determines whether incumbent alternatives are real threats |

## Phase 2: Eight-Dimension Evaluation

### The 8 Dimensions

Each competitor is evaluated across these dimensions. Dimensions are not equally important — they're weighted based on the user's strategic priorities.

#### Dimension 1: Product (what they build)
Evaluate the competitor's core product offering.

| Score | Criteria |
|-------|----------|
| 1 | Minimal viable product, limited features, unreliable |
| 2 | Functional but basic, limited use cases, some UX issues |
| 3 | Solid product covering core use cases, acceptable UX |
| 4 | Strong product with broad feature set, good UX, reliable |
| 5 | Best-in-class product, exceptional UX, comprehensive features, strong platform |

**Evidence sources:** Product demos, free trials, documentation, screenshots, video walkthroughs.

#### Dimension 2: Pricing (how they charge)
Evaluate pricing model fitness for the target market and value delivery.

| Score | Criteria |
|-------|----------|
| 1 | Pricing is opaque, misaligned with value, or prohibitively expensive for the target market |
| 2 | Pricing exists but is confusing, has hidden costs, or poor tier design |
| 3 | Clear pricing with reasonable tiers, standard for the category |
| 4 | Competitive pricing, well-designed tiers, good free/trial offering |
| 5 | Innovative pricing model, perfectly aligned with value delivery, strong freemium |

**Evidence sources:** Pricing pages, customer reviews mentioning cost, comparison sites.

#### Dimension 3: Target Market (who they sell to)
Evaluate how directly they overlap with the user's target customer.

| Score | Criteria |
|-------|----------|
| 1 | No meaningful overlap — different segment, industry, or company size |
| 2 | Tangential overlap — some shared customers but different primary focus |
| 3 | Moderate overlap — similar segment but different positioning or use case |
| 4 | Significant overlap — same segment, similar use case, direct competition |
| 5 | Near-identical target — same customer persona, same use case, head-to-head |

**Evidence sources:** Marketing copy, case studies, customer testimonials, pricing tiers (company size indicators).

#### Dimension 4: Positioning (how they present themselves)
Evaluate the clarity and effectiveness of their market positioning.

| Score | Criteria |
|-------|----------|
| 1 | No clear positioning — generic messaging, unclear value proposition |
| 2 | Weak positioning — tries to be everything, no differentiation |
| 3 | Adequate positioning — clear category but undifferentiated from peers |
| 4 | Strong positioning — clear differentiation, consistent messaging, owned angle |
| 5 | Dominant positioning — owns a category or mindshare position, referenced by others |

**Evidence sources:** Website messaging, taglines, social media, press coverage, G2 category placement.

#### Dimension 5: Traction (how fast they're growing)
Evaluate momentum and market validation signals.

| Score | Criteria |
|-------|----------|
| 1 | No visible traction — no funding, no customers, no growth signals |
| 2 | Early traction — some customers, seed funding, small team |
| 3 | Moderate traction — established customer base, Series A/B, growing team |
| 4 | Strong traction — significant revenue/users, well-funded, expanding |
| 5 | Market leader traction — dominant share, IPO/late-stage, industry standard |

**Evidence sources:** Crunchbase, LinkedIn headcount trends, press releases, app store rankings, web traffic estimates.

#### Dimension 6: Strengths (what they do well)
Evaluate competitive advantages the user must contend with.

| Score | Criteria |
|-------|----------|
| 1 | No notable strengths — commodity offering |
| 2 | Minor advantages — slightly better UX or one good feature |
| 3 | Clear strengths in 1-2 areas — recognized by customers |
| 4 | Strong advantages in multiple areas — hard to replicate quickly |
| 5 | Formidable strengths — network effects, data moats, brand loyalty, or technical IP |

**Evidence sources:** Positive G2/Capterra reviews (look for patterns), customer testimonials, technical documentation.

#### Dimension 7: Weaknesses (where they fall short)
Evaluate exploitable gaps and limitations.

| Score | Criteria (higher = more exploitable weakness) |
|-------|----------|
| 1 | Few weaknesses — well-rounded product and company |
| 2 | Minor gaps — customers notice but tolerate |
| 3 | Moderate weaknesses — common complaints in reviews, visible gaps |
| 4 | Significant weaknesses — persistent customer frustration, feature gaps, churn signals |
| 5 | Critical weaknesses — major churn driver, security concerns, platform instability, PR problems |

**Evidence sources:** Negative G2/Capterra reviews (patterns in 1-2 star reviews), support forum complaints, Twitter/Reddit threads, churn-related job postings (e.g., hiring for "customer success" or "retention").

#### Dimension 8: Strategic Direction (where they're heading)
Evaluate likely future moves and alignment with market trends.

| Score | Criteria (higher = more threatening direction) |
|-------|----------|
| 1 | Stagnant or moving away from the user's market — decreasing threat |
| 2 | Maintaining current course — predictable, no escalation |
| 3 | Incremental improvements in the user's direction — gradual convergence |
| 4 | Active investment in the user's space — new features, partnerships, hiring |
| 5 | Strategic pivot directly into the user's market — existential threat potential |

**Evidence sources:** Job postings (what roles they're hiring for), recent blog posts, product changelogs, partnership announcements, conference talks.

### Default Dimension Weights

When the user doesn't specify priorities, use these defaults:

| Dimension | Default Weight | Rationale |
|-----------|---------------|-----------|
| Product | 1.0 | Baseline importance |
| Pricing | 1.0 | Baseline importance |
| Target Market | 1.5 | Overlap determines direct competition intensity |
| Positioning | 0.75 | Important but less than product/market |
| Traction | 1.25 | Momentum signals real market validation |
| Strengths | 1.25 | Must understand what you're up against |
| Weaknesses | 1.0 | Exploitable but depends on execution |
| Strategic Direction | 1.25 | Forward-looking threats matter most |

**Weighted total = sum of (score x weight) for each dimension.**

Ask the user if they want to adjust weights based on their priorities. Example: a startup may weight Traction lower (they can't compete on scale anyway) and Weaknesses higher (they need gaps to exploit).

## Phase 3: Strategic Gap Analysis

### Gap Identification Framework

After scoring, analyze the landscape for gaps across four axes:

#### Customer Segment Gaps
- Which customer segments are poorly served?
- Look for: low Target Market scores for certain personas, review complaints about "not built for us"
- Validate: Is the segment large enough? Is there willingness to pay?

#### Feature Gaps
- Which capabilities are missing across the competitive set?
- Look for: consistent feature requests in reviews, workarounds described in forums
- Validate: Is the feature missing because it's hard/expensive, or because nobody's thought of it?

#### Pricing Gaps
- Which price points or models are unoccupied?
- Look for: large jumps between tiers, no freemium in a market that expects it, no enterprise tier
- Validate: Is the gap because it's economically unviable at that price, or because it's a real opportunity?

#### Positioning Gaps
- Which messaging angles are unclaimed?
- Look for: everyone positioning on the same 1-2 themes, customer needs mentioned in reviews that no competitor addresses in marketing
- Validate: Is the positioning gap because the angle doesn't resonate, or because nobody's tried it?

### The "Why Not?" Test

For every identified gap, apply this filter:

1. Has anyone tried this and failed? (Search for dead startups in the space)
2. Is there a structural reason this gap exists? (Regulation, technical impossibility, market too small)
3. Would filling this gap require capabilities the user doesn't have?

If all three answers are "no," the gap is likely a real opportunity.

## Phase 4: Competitive Threat Assessment

### Threat Level Classification

| Level | Criteria | Response |
|-------|----------|----------|
| **Critical** | Direct competitor, high traction, strong product, converging strategy | Must differentiate immediately or concede the segment |
| **High** | Direct competitor with significant overlap and momentum | Monitor closely, build defensible advantages |
| **Medium** | Moderate overlap, some strengths, predictable trajectory | Track quarterly, exploit weaknesses |
| **Low** | Tangential overlap, limited traction, or diverging direction | Note for awareness, review semi-annually |
| **Emerging** | Not yet a threat but showing signals (funding, hiring, product moves) | Add to watch list, define trigger conditions |

### Watch List Criteria

A competitor goes on the watch list when:
- They receive significant funding (Series B+) targeted at the user's space
- They hire for roles indicating a pivot (e.g., a dev tool company hiring enterprise sales)
- They launch features that overlap with the user's core value proposition
- Their customer reviews start mentioning the same job-to-be-done

## Edge Cases

- **No direct competitors found:** This is a finding, not a failure. Analyze indirect competitors and the "do nothing" alternative more deeply. Consider: is the market too small, too new, or misidentified?
- **Competitor is a platform with adjacent functionality:** (e.g., Stripe adding invoicing) Analyze the platform threat separately — evaluate switching costs, integration lock-in, and whether "good enough" beats "best."
- **Competitor data is sparse:** Assign Low confidence and state what's missing. Recommend specific follow-up research. Don't fill gaps with speculation.
- **Market is rapidly changing:** Flag the analysis as having a shorter shelf life. Recommend re-running in 3 months instead of 6-12.

## Sources and Rationale

This framework draws from:
- **Jobs-to-Be-Done theory** (Christensen) for competitor identification
- **Porter's Five Forces** for structural competitive analysis
- **Strategyzer's value proposition design** for positioning gap analysis
- **SaaS industry best practices** for metrics and pricing analysis

Adapted specifically for AI-assisted analysis where the evaluator has access to public web data but not proprietary data, and where consistency of evaluation structure matters more than depth of primary research.
