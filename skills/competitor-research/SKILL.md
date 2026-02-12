---
name: competitor-research
description: Map and analyze the competitive landscape for a SaaS or digital product. Use when the user asks to analyze competitors, understand the competitive landscape, compare their product to alternatives, identify market gaps, or evaluate competitive positioning. Covers direct competitors, indirect alternatives, pricing analysis, feature comparison, and strategic positioning.
---

# Competitor Research

Produce a structured, multi-dimensional competitive landscape analysis for SaaS and digital products. Unlike raw LLM output that lists competitors with surface descriptions, this skill applies a systematic evaluation framework across 8 dimensions, scores each competitor, identifies strategic gaps, and produces actionable positioning recommendations grounded in evidence.

## Core Workflow

### Step 1: Define the Competitive Arena

Before searching for competitors, establish what you're comparing against:

1. **Clarify the product:** What does the user's product do? Who is the target customer? What is the primary value proposition?
2. **Define the job-to-be-done:** What problem does the customer hire this product to solve? (Use the Jobs-to-Be-Done framing — competitors are anything the customer uses to get this job done, not just similar-looking products.)
3. **Set scope boundaries:** Ask the user:
   - Are there specific competitors they already know about?
   - What market segment? (SMB, mid-market, enterprise)
   - Geographic focus? (Global, US, EU, specific regions)
   - Budget range of target customers?

If the user provides vague input (e.g., "analyze my competitors" with no context), ask these questions before proceeding. Do not guess.

### Step 2: Identify Competitors

Find competitors across three tiers:

1. **Direct competitors** (same product category, same target customer):
   - Search for products that solve the same problem for the same audience
   - Check product comparison sites (G2, Capterra, Product Hunt, AlternativeTo)
   - Look at "vs" and "alternative to" search patterns

2. **Indirect competitors** (different approach, same job-to-be-done):
   - Identify adjacent tools customers might use instead
   - Look for manual/DIY alternatives (spreadsheets, agencies, freelancers)
   - Consider platform plays that absorb this functionality

3. **Emerging competitors** (early-stage or pivoting into the space):
   - Check Product Hunt launches, Y Combinator batches, funding announcements
   - Look for open-source alternatives gaining traction
   - Identify AI-native challengers reimagining the category

Target: 5-10 competitors total (3-5 direct, 2-3 indirect, 1-2 emerging). If fewer exist, document why the competitive landscape is thin — this itself is a finding.

### Step 3: Research Each Competitor

For each competitor, gather data across the 8 evaluation dimensions defined in [references/framework.md](references/framework.md):

1. **Product:** Core features, platform, integrations, UX quality
2. **Pricing:** Model (freemium, trial, per-seat, usage), price points, published vs. negotiable
3. **Target Market:** Who they sell to, company size, industry focus
4. **Positioning:** How they describe themselves, messaging, brand tone
5. **Traction:** Funding, revenue signals, team size, growth indicators
6. **Strengths:** What they do well, why customers choose them
7. **Weaknesses:** Where they fall short, common complaints
8. **Strategic Direction:** Where they're heading (roadmap signals, job postings, recent features)

**Data sources and confidence:**
- Public pricing pages, feature lists, documentation → **High confidence**
- G2/Capterra reviews, App Store ratings, social media → **Medium confidence**
- Inferred from job postings, funding, blog posts → **Low confidence**

Tag every data point with its confidence level and source type.

### Step 4: Score and Compare

Apply the scoring framework from [references/framework.md](references/framework.md):

1. Score each competitor on each dimension (1-5 scale)
2. Build the comparison matrix
3. Calculate weighted scores using the user's priority weights (or default weights if not specified)
4. Rank competitors by overall threat level

### Step 5: Identify Strategic Gaps

Analyze the scored landscape to find:

1. **Underserved segments:** Customer needs no competitor addresses well
2. **Feature gaps:** Capabilities missing across the competitive set
3. **Pricing gaps:** Price points or models nobody occupies
4. **Positioning gaps:** Messaging angles nobody owns
5. **Emerging threats:** Trends that could reshape the landscape

For each gap, assess: Is this a gap because nobody's thought of it, or because it's not viable? Apply skepticism.

### Step 6: Synthesize Recommendations

Produce actionable positioning recommendations:

1. **Positioning statement:** How the user's product should position against this landscape
2. **Differentiation levers:** 2-3 specific ways to stand out
3. **Competitive risks:** What could go wrong (competitor moves, market shifts)
4. **Watch list:** Competitors or trends to monitor over the next 6-12 months

Ground every recommendation in the evidence gathered. No unsupported assertions.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md). Key sections:

- **Competitive Arena Definition** — scope, JTBD, and boundaries
- **Competitor Profiles** — structured profile for each competitor across 8 dimensions
- **Comparison Matrix** — scored table with all competitors
- **Strategic Gap Analysis** — underserved segments, feature/pricing/positioning gaps
- **Recommendations** — positioning, differentiation, risks, watch list
- **Methodology Notes** — data sources, confidence levels, limitations

Expected length: 2,000-4,000 words depending on the number of competitors analyzed.

## Quality Criteria

- [ ] At least 3 competitors analyzed with full profiles (all 8 dimensions populated)
- [ ] Each competitor has data source attribution and confidence levels
- [ ] Comparison matrix includes scores and is internally consistent
- [ ] Strategic gaps are grounded in the analysis (not generic observations)
- [ ] Recommendations reference specific evidence from the research
- [ ] SaaS-specific metrics used (MRR signals, churn indicators, pricing models)
- [ ] Methodology notes explain what data was available and what was inferred
- [ ] Output follows the schema in references/output-schema.md

## References

- **Evaluation framework and scoring rubrics:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS invoicing tool):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Listing without analyzing:** Naming competitors and describing what they do, without evaluating strengths/weaknesses or scoring them. Every competitor must be scored across all 8 dimensions, not just described.

2. **Ignoring indirect competitors:** Only finding products that look similar. The biggest competitive threats are often adjacent tools, manual processes, or platform plays — not just lookalikes. Always include the "do nothing" and "DIY spreadsheet" alternatives.

3. **Treating all data as equal confidence:** Stating inferred information (team size from LinkedIn, revenue from funding announcements) with the same certainty as public pricing pages. Every data point needs a confidence tag. If most data is Low confidence, say so explicitly — that itself is a finding.

4. **Generic gap analysis:** Identifying "gaps" that are really just generic advice (e.g., "better UX" or "lower pricing"). Gaps must be specific: which customer segment is underserved, which exact feature is missing, which price point is unoccupied.

5. **Missing the "why not" question:** Listing what competitors offer without asking why customers would or wouldn't switch. Switching costs, lock-in, and inertia are often more important than feature comparisons.
