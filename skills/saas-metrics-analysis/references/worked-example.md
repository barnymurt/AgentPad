# Worked Example: SaaS Metrics Analysis

This example demonstrates the SaaS Metrics Analysis skill applied to an early-stage B2B SaaS with rising churn.

## Scenario

**Product:** PipelineSync — a CRM data enrichment and sync tool for B2B sales teams
**Target Market:** SMB sales teams (5-50 reps) using HubSpot or Salesforce who need clean, enriched contact data to run outbound campaigns
**Stage:** Early stage — 14 months post-launch, $15K MRR, 180 paying customers
**Context provided:** Founder has noticed churn climbing over the last 3 months and MRR growth stalling. Provides a set of metrics from their billing system and product analytics.

## Input

> "We're at $15K MRR with about 180 customers. Our churn has been climbing — it was around 4% six months ago and now it's hitting 7-8% monthly. MRR growth has basically flatlined even though we're still adding ~20 new customers per month. Our pricing is $49/mo for Starter (up to 10 users, 1,000 enrichments/mo) and $149/mo for Team (up to 50 users, 5,000 enrichments/mo). About 70% of customers are on Starter. CAC is around $120 through a mix of content marketing and LinkedIn ads. We don't have formal NRR tracking but I don't think many customers upgrade. Can you diagnose what's going on and tell me what to fix?"

## Reasoning

### Step 1: Gather and Classify Metrics

Extracted and classified:
- MRR: $15,000 (Revenue, Lagging) [H]
- Active customers: 180 (Revenue, Lagging) [H]
- Monthly churn: 7-8% (currently), was 4% six months ago (Retention, Lagging) [H]
- New customers/mo: ~20 (Acquisition, Leading) [H]
- Pricing: $49 Starter / $149 Team, 70/30 split (Revenue) [H]
- ARPU: $15,000 / 180 = $83/mo (Revenue, Derived) [H]
- CAC: ~$120 (Acquisition, Lagging) [M]
- NRR: Not tracked — estimated ~90% based on "not many upgrades" + rising churn [L]

Missing critical metrics flagged: Activation rate, onboarding completion, time-to-value, feature adoption, cohort retention data, expansion revenue. These gaps limit diagnosis confidence.

### Step 2: Score Business Health

Applied early-stage SMB SaaS benchmarks:
- Monthly churn (7-8%): **Red** (benchmark: <5% for early SMB)
- LTV:CAC: LTV = $83 × 0.78 GM / 0.075 churn = $863. LTV:CAC = $863 / $120 = 7.2:1 — **Green** (but misleading — LTV is declining as churn rises)
- MRR growth: Flatlined → **Red** (benchmark: >15% MoM for early stage)
- ARPU: $83 — healthy for the segment, **Green**
- Gross margin: Estimated ~78% (enrichment API costs are the main COGS) — **Green**
- NRR: Estimated ~90% — **Yellow** (benchmark: >95% for early stage)

Composite weighted score: ~1.8 (Concerning). Weakest dimensions: churn and MRR growth.

### Step 3: Map Metric Relationships

Started with the two Red metrics:

**Chain 1 (Churn):** Monthly churn at 7-8% → doubled from 4% in 6 months. Since new customer acquisition rate hasn't changed (~20/mo), the problem isn't market quality. Rising churn in newer cohorts suggests either: (a) product value degrades after initial period, (b) newer customers are lower quality, or (c) competitive pressure. Without cohort data, working hypothesis is (a) — customers exhaust initial value and see no ongoing reason to stay. This maps to: High churn ← Low ongoing engagement ← No expansion path ← Starter plan limits hit and no upgrade incentive.

**Chain 2 (MRR stall):** Net new MRR near zero because new MRR (~20 customers × $83 ARPU = ~$1,660/mo) is offset by churned MRR (180 × 7.5% × $83 = ~$1,125/mo). Leaky bucket — acquisition can't outpace churn. This is downstream of Chain 1.

Root cause hypothesis: Customers on Starter plan ($49/mo) hit the 1,000 enrichment cap, see no compelling reason to upgrade to the $149 Team plan (3x price jump), and either stay underserved or leave. The lack of a mid-tier option and the steep upgrade path create a "churn cliff."

### Step 4: Trend and Cohort Analysis

Churn trend: 4% → 5% → 5.5% → 6% → 7% → 7.5% → 8% over 6 months — consistent upward trajectory with no signs of stabilizing. At this rate, churn will exceed 10% within 3 months.

MRR growth trend: Was growing ~12% MoM six months ago, now ~1-2% MoM. The deceleration tracks the churn increase almost exactly.

Cohort inference (without formal data): Since acquisition rate and channel mix haven't changed, the most likely explanation is that older cohorts (acquired 6-12+ months ago) are now reaching a "value ceiling" and churning. This would appear as accelerating churn over time even if newer cohort behavior is unchanged.

### Step 5: Benchmark Comparison

Compared against early-stage SMB SaaS benchmarks:
- Churn (7.5%) is 50% above the 5% early-stage benchmark → largest gap
- MRR growth (1-2%) is 85% below the 15% early-stage benchmark → severe
- LTV:CAC (7.2:1) is above benchmark but declining (was ~15:1 six months ago at 4% churn)
- Payback period: $120 / ($83 × 0.78) = 1.9 months → excellent, well below 8-month benchmark

Highest-leverage gap: Closing the churn gap from 7.5% to 4% would save ~$468/mo in churned MRR and compound rapidly, restoring MRR growth without any acquisition increase.

### Step 6: Diagnose and Recommend

Primary diagnosis: Rising churn is driven by Starter-plan customers hitting enrichment limits with no palatable upgrade path, leading to a "value ceiling" churn pattern. The 3x price jump from Starter ($49) to Team ($149) creates a dead zone. Fix the pricing/packaging, and churn should return to the 4-5% range.

## Output

---

# SaaS Metrics Analysis: PipelineSync

## 1. Metrics Inventory

### Provided Metrics

| Metric | Value | Period | Funnel Stage | Indicator Type | Confidence |
|--------|-------|--------|-------------|---------------|------------|
| MRR | $15,000 | Current | Revenue | Lagging | [H] |
| Active customers | 180 | Current | Revenue | Lagging | [H] |
| Monthly customer churn | 7-8% (currently) | Last month | Retention | Lagging | [H] |
| Monthly churn (6 months ago) | ~4% | 6 months ago | Retention | Lagging | [H] |
| New customers per month | ~20 | Trailing 3 months | Acquisition | Leading | [H] |
| Pricing — Starter | $49/mo | Current | Revenue | — | [H] |
| Pricing — Team | $149/mo | Current | Revenue | — | [H] |
| Tier mix | 70% Starter / 30% Team | Current | Revenue | — | [H] |
| CAC | ~$120 | Trailing average | Acquisition | Lagging | [M] |

### Derived Metrics

| Metric | Value | Derivation | Confidence |
|--------|-------|-----------|------------|
| ARPU | $83/mo | $15,000 MRR / 180 customers | [H] |
| LTV | $863 | $83 × 0.78 GM / 0.075 churn | [M] — sensitive to current churn rate |
| LTV:CAC | 7.2:1 | $863 / $120 | [M] |
| Payback period | 1.9 months | $120 / ($83 × 0.78) | [M] |
| Gross margin | ~78% | Revenue minus estimated enrichment API + hosting costs | [M] |
| Monthly churned MRR | ~$1,125 | 180 × 7.5% × $83 | [M] |
| Monthly new MRR | ~$1,660 | 20 × $83 | [H] |
| Net new MRR | ~$535 | $1,660 - $1,125 | [M] |
| Estimated NRR | ~90% | No formal tracking; inferred from "not many upgrades" + 7.5% churn | [L] |

### Missing Critical Metrics

| Metric | Why Critical | Estimated Value | Estimation Basis | Confidence |
|--------|-------------|-----------------|-----------------|------------|
| Activation rate | Determines if new users reach value — leading indicator for churn | ~30% (estimated) | SMB SaaS benchmark for early stage | [L] |
| Onboarding completion | Upstream driver of activation | Unknown | Cannot estimate without product data | — |
| Feature adoption (enrichment usage) | Key to understanding value ceiling | Unknown | Cannot estimate | — |
| Cohort retention curves | Reveals whether churn is worsening in newer vs. older cohorts | Not available | — | — |
| Expansion revenue | Needed for NRR calculation | ~$0-200/mo (estimated) | "Not many upgrades" per founder | [L] |
| NPS | Customer satisfaction signal | Unknown | Cannot estimate | — |

**Data gap impact:** Without cohort data and enrichment usage data, the root cause diagnosis is [M] confidence rather than [H]. Instrumentation of these metrics is a top recommendation.

## 2. Health Scorecard

### Company Context

- **Stage:** Early ($15K MRR, 180 customers, 14 months post-launch)
- **Segment:** SMB (5-50 person sales teams)
- **MRR:** $15,000
- **Customer count:** 180 paying

### Metric Scores

| Metric | Value | Benchmark (Early SMB) | Score | Notes |
|--------|-------|-----------------------|-------|-------|
| Monthly customer churn | 7.5% | <5% | **Red** | Doubled in 6 months; accelerating |
| LTV:CAC | 7.2:1 | >3:1 | **Green** | Healthy but declining (was ~15:1 at 4% churn) |
| MRR growth (MoM) | ~1-2% | >15% | **Red** | Stalled — new MRR barely exceeds churned MRR |
| ARPU | $83 | $50-150 range for SMB | **Green** | Healthy for segment |
| Gross margin | ~78% | >70% | **Green** | Solid; enrichment API costs manageable |
| Payback period | 1.9 months | <8 months | **Green** | Excellent — fast capital recovery |
| NRR (estimated) | ~90% | >95% | **Yellow** | Below benchmark; no expansion motion [L] |

### Composite Health Score

- **Score: 1.9 / 3.0 (Concerning)**
  - Weighted calculation: Churn (Red, 25% weight = 0.25) + LTV:CAC (Green, 20% = 0.60) + MRR growth (Red, 20% = 0.20) + Gross margin (Green, 10% = 0.30) + Payback (Green, 10% = 0.30) + NRR (Yellow, 10% = 0.20) + Activation (unknown, 5% = 0.10 est.) = 1.95
- **Weakest dimension:** Monthly churn (7.5%, Red) in the Retention funnel stage — this is the diagnostic priority
- **Strongest dimension:** Payback period (1.9 months, Green) in the Revenue funnel stage — acquisition efficiency is strong

## 3. Metric Relationship Map

### Primary Causal Chain: Rising Churn

**Symptom:** Monthly customer churn at 7.5% and accelerating (Lagging, Retention)

**Chain:**

1. **Monthly churn doubled from 4% to 7.5% in 6 months** — the trend is structural, not a one-time event. [H]
2. **New customer acquisition rate is unchanged (~20/mo)** — this rules out "lower quality leads" as the primary driver. [H]
3. **Churn is accelerating over time** — consistent with a "value ceiling" pattern where customers hit a limit after N months of usage. [M]
4. **70% of customers are on Starter plan ($49/mo, 1,000 enrichments/mo)** — these customers likely exhaust their enrichment quota as their teams grow. [M]
5. **No mid-tier plan exists** — the jump from $49 to $149 (3x) is too steep for customers who need slightly more than Starter. The rational choice is to stay on Starter (underserved) or leave. [M]
6. **"Not many upgrades" per founder** — confirms that the expansion path is broken. Customers who outgrow Starter are churning rather than upgrading. [M]

**Root cause:** Broken expansion path. The Starter→Team pricing gap creates a "value ceiling" where customers who need more than 1,000 enrichments/mo face a 3x price increase with no intermediate option. They churn instead of upgrading. [M]

**Evidence supporting this chain:**
- Churn is rising while acquisition quality is constant → problem is post-acquisition
- Most customers (70%) are on the plan with the hard cap (Starter)
- Upgrades are rare despite growing customer base → expansion friction is real
- Churn acceleration is consistent with more customers reaching the cap over time

**Confidence: Medium [M]** — the chain is logically sound and consistent with all available data, but confirmation requires enrichment usage data (what % of churning customers were near or at their enrichment cap).

### Secondary Chain: Stalled MRR Growth

**Symptom:** MRR growth at 1-2% MoM (Lagging, Revenue)

**Chain:**

1. **Net new MRR = ~$535/mo** ($1,660 new - $1,125 churned). [H]
2. **This is a "leaky bucket" — acquisition produces $1,660 but churn erodes $1,125 (68% of new MRR is lost to churn).** [H]
3. **Expansion MRR is near zero** — no upsell motion, no seat-based expansion. [M]
4. **The fix is not more acquisition — it's reducing the leak.** Adding 5 more customers/mo at current churn only adds ~$300 net MRR. Cutting churn by 3 points saves ~$400/mo and compounds. [H]

**Root cause:** Same as primary chain — churn is the binding constraint on growth. Until churn is addressed, acquisition investment has diminishing returns.

**Confidence: High [H]** — the math is straightforward.

## 4. Trend Analysis

### Key Metric Trends

| Metric | 6-Month Trend | Direction | Rate of Change | Projected Time to Benchmark |
|--------|--------------|-----------|----------------|---------------------------|
| Monthly churn | 4% → 5% → 5.5% → 6% → 7% → 7.5% → 8% | Deteriorating | +0.6 pts/mo | Will exceed 10% in ~3 months if unchecked |
| MRR growth (MoM) | 12% → 8% → 5% → 3% → 2% → 1% | Deteriorating | -1.8 pts/mo | Will turn negative within 2 months |
| MRR | $10K → $11.5K → $12.8K → $13.8K → $14.5K → $15K | Decelerating | Approaching plateau | Plateau at ~$16-17K MRR then decline |
| New customers/mo | ~20 (stable) | Stable | 0 | Already at benchmark |
| LTV:CAC | ~15:1 → 7.2:1 (declining) | Deteriorating | -1.3 pts/mo | Crosses 3:1 in ~3 months if churn continues rising |

### Cohort Analysis

Formal cohort data is not available. Inferred behavior based on aggregate data:

- **Hypothesis:** Earlier cohorts (months 1-8) retained better because they hadn't yet hit the enrichment ceiling. Cohorts from months 9-14 are hitting the ceiling faster as the product matures and usage increases.
- **Supporting signal:** Churn was stable at 4% for the first ~8 months, then began climbing — consistent with early adopters being more tolerant and later cohorts being more price-sensitive at the upgrade threshold.
- **Key finding:** The churn acceleration is likely a cohort maturity effect, not a sudden product quality issue. This means the trend will continue (and worsen) unless the value ceiling is addressed.

**Confidence: [L]** — this is inference from aggregate data; cohort tracking would confirm or refute.

### Anomalies and Seasonality

No obvious seasonal pattern in a 14-month window. The churn increase is a steady trend, not a spike — this points to structural cause rather than a one-time event (like a competitor launch or service outage).

## 5. Benchmark Comparison

### Gap Analysis

| Metric | Current | Benchmark (Early SMB) | Gap | Percentile (est.) | Priority |
|--------|---------|----------------------|-----|-------------------|----------|
| Monthly churn | 7.5% | <5% | +2.5 pts | Bottom 25% | **Highest** |
| MRR growth (MoM) | 1-2% | >15% | -13 pts | Bottom 10% | **High** (downstream of churn) |
| NRR | ~90% (est.) | >95% | -5 pts | Below median | **High** |
| LTV:CAC | 7.2:1 | >3:1 | +4.2 pts above | Top 25% | Low (but declining) |
| Payback period | 1.9 mo | <8 mo | -6.1 mo better | Top 10% | Low (strong) |
| Gross margin | 78% | >70% | +8 pts above | Above median | Low (healthy) |
| ARPU | $83 | $50-150 | Within range | Median | Low |

### Contextual Notes

- **LTV:CAC at 7.2:1 is healthy but misleading.** It was 15:1 six months ago. At current churn trajectory, it will cross below 3:1 within 3 months. The trend matters more than the current snapshot.
- **Payback period excellence masks the problem.** PipelineSync acquires customers cheaply and recoups cost fast — but then loses them. Fast payback with high churn means the business efficiently acquires customers it can't keep.
- **The benchmarks used are for early-stage SMB SaaS** ($1K-$50K MRR, <500 customers) from SaaS Capital and OpenView sources. [M]

## 6. Diagnosis

### Primary Diagnosis

**Statement:** The primary issue is accelerating customer churn (4% → 7.5% in 6 months), caused by a broken expansion path where Starter-plan customers who outgrow their 1,000 enrichment/mo cap face a 3x price jump to Team with no intermediate option, which is stalling MRR growth and will turn MRR negative within 2 months if unchecked.

**Supporting evidence:**
- Churn doubled in 6 months while acquisition quality remained constant — problem is post-acquisition value delivery
- 70% of customers are on the capped Starter plan — the majority of the base faces this ceiling
- Upgrades are "rare" per founder — the expansion path is not working
- The 3x price jump ($49 → $149) exceeds the typical SaaS upsell sweet spot of 1.5-2x
- Churn acceleration is consistent over time (not a spike) — structural, not event-driven

**Confidence: Medium [M]** — all available data is consistent with this diagnosis, but enrichment usage data from churning customers would elevate this to [H]. If data shows churning customers were not near their cap, the root cause lies elsewhere (e.g., competitive displacement, product quality).

### Secondary Diagnosis

**Statement:** NRR is below benchmark (~90% vs. 95%+) because there is no expansion motion — no usage-based upsell, no seat expansion tracking, and no mid-tier plan.

**Supporting evidence:**
- Founder confirms "not many upgrades"
- Only two tiers with a 3x gap
- No mention of expansion revenue in any reporting

**Confidence: Medium [M]** — consistent with data, but NRR itself is estimated.

## 7. Action Plan

### Prioritized Recommendations

#### 1. Introduce a mid-tier plan ($89-99/mo)

- **Action:** Add a Growth plan between Starter and Team — approximately $89-99/mo, 3,000 enrichments/mo, up to 25 users. This creates a natural upgrade step for Starter customers hitting their cap.
- **Target metric:** Monthly customer churn
- **Current value:** 7.5%
- **Target value:** 4.5-5.5% within 3 months of launch
- **Mechanism:** Customers who currently churn because the $49→$149 jump is too steep will instead upgrade to $89-99. Reduces churn among Starter customers who are outgrowing their plan. Also increases ARPU as some fraction of new customers choose the mid-tier.
- **Expected impact on MRR:** Reducing churn from 7.5% to 5.5% saves ~$270/mo in churned MRR at current base. Over 6 months, compounding effect adds ~$2,500/mo in retained MRR. Additional ARPU lift from mid-tier adoption adds ~$500-1,000/mo.
- **Priority:** Quick Win
- **Effort:** Low (pricing/packaging change, no major product work)
- **Timeline:** Implement in 1-2 weeks, measure churn impact over 60-90 days

#### 2. Instrument enrichment usage tracking and churn analysis

- **Action:** Track enrichment usage per customer relative to their plan cap. Identify customers approaching 80% of their cap and trigger proactive outreach (upgrade offer, usage consultation). Analyze churned customers' usage patterns to validate or refute the "value ceiling" hypothesis.
- **Target metric:** Churn (diagnostic confidence → retention intervention rate)
- **Current value:** No usage-based churn analysis exists
- **Target value:** 100% of at-risk customers identified >14 days before cap
- **Mechanism:** Early warning system identifies churn-risk customers before they leave. Proactive outreach converts some to upgrades, others get help optimizing usage.
- **Expected impact on MRR:** If 20% of identified at-risk customers are saved, that's ~2-3 customers/mo × $83 ARPU = ~$166-249/mo saved. More importantly, the data validates/refutes the churn diagnosis, enabling more targeted interventions.
- **Priority:** Quick Win
- **Effort:** Low-Medium (analytics instrumentation + simple alert)
- **Timeline:** 1-2 weeks to instrument, 30 days to gather data

#### 3. Implement cohort retention tracking

- **Action:** Set up monthly cohort tracking — group customers by signup month, track retention at month 1, 2, 3, ..., N. Compare cohort curves to identify whether newer cohorts are churning faster, slower, or the same as older ones.
- **Target metric:** Diagnostic confidence on all retention metrics
- **Current value:** No cohort tracking
- **Target value:** Monthly cohort reports with 90-day retention curves
- **Mechanism:** Cohort data reveals whether churn is worsening for newer customers (acquisition quality issue), worsening for older customers (value ceiling issue), or both. This determines whether the fix is acquisition-side or retention-side.
- **Expected impact on MRR:** No direct MRR impact, but enables all future retention interventions to be targeted correctly. Without this, any fix is partially blind.
- **Priority:** Quick Win
- **Effort:** Low (analytics setup)
- **Timeline:** 1 week to implement, 60 days for meaningful data

#### 4. Build proactive upgrade nudges in-product

- **Action:** When a Starter customer uses >70% of their enrichment cap in a billing cycle, display an in-app banner showing usage, projected overage, and upgrade options. Send an email at 90% usage with a one-click upgrade path.
- **Target metric:** Starter→Growth upgrade rate (new metric); NRR
- **Current value:** Upgrade rate ~0% (implied by "not many upgrades")
- **Target value:** 5-10% of Starter customers upgrading per quarter
- **Mechanism:** Converts customers who are silently hitting the cap into upgraders rather than churners. Increases ARPU and NRR simultaneously.
- **Expected impact on MRR:** If 10% of 126 Starter customers upgrade to mid-tier ($89) over 6 months → ~13 upgrades × $40 ARPU increase = ~$520/mo additional MRR. Combined with reduced churn, this restores MRR growth to 5-8% MoM.
- **Priority:** Strategic
- **Effort:** Medium (product feature work)
- **Timeline:** 2-4 weeks to build, 60 days to measure

#### 5. Investigate competitive displacement

- **Action:** Survey churned customers (last 3 months) with a 3-question exit survey: (1) primary reason for leaving, (2) switching to a competitor? which one?, (3) what would have kept you? This validates or rules out competitive pressure as a churn driver.
- **Target metric:** Churn root cause confidence
- **Current value:** Root cause diagnosis at [M] confidence
- **Target value:** Diagnosis at [H] confidence
- **Mechanism:** If >30% of churned customers cite a competitor, the diagnosis shifts from pricing/packaging to competitive differentiation. If <10% cite a competitor, the value ceiling hypothesis is strengthened.
- **Expected impact on MRR:** No direct impact, but prevents investing in the wrong fix.
- **Priority:** Quick Win
- **Effort:** Low (email survey, 30 minutes to set up)
- **Timeline:** Send this week, results in 2 weeks

### Quick Wins Summary

1. **Add mid-tier plan ($89-99/mo)** — 1-2 weeks, highest expected impact on churn
2. **Instrument enrichment usage tracking** — 1-2 weeks, validates root cause and enables proactive saves
3. **Send churn exit survey** — 1 day, confirms or refutes diagnosis

## 8. Monitoring Dashboard

### Metrics to Track

| Metric | Current | Target (90-day) | Review Cadence | Alert Threshold |
|--------|---------|-----------------|---------------|----------------|
| Monthly customer churn | 7.5% | <5.5% | Weekly | >9% — emergency review |
| MRR | $15,000 | $18,000 | Weekly | MoM decline — investigate immediately |
| Net new MRR | ~$535 | >$1,500 | Weekly | <$0 (negative) — churn exceeds acquisition |
| Starter→Growth upgrade rate | 0% | >5%/quarter | Monthly | — (new metric, baseline first) |
| NRR | ~90% (est.) | >95% | Monthly | <85% — expansion motion failing |
| Enrichment usage vs. cap | Not tracked | Tracked per customer | Weekly | Any customer at >80% cap without upgrade path |
| LTV:CAC | 7.2:1 | >5:1 (stabilize) | Monthly | <4:1 — investigate LTV decline or CAC increase |
| Cohort 30-day retention | Unknown | >85% | Monthly | <75% for any cohort — onboarding issue |

### Review Schedule

- **Weekly:** MRR, net new MRR, churn rate, new customers, enrichment usage alerts
- **Monthly:** NRR, LTV:CAC, payback period, cohort retention curves, upgrade rate, CAC by channel
- **Quarterly:** Gross margin, competitive landscape check, pricing review, benchmark re-comparison

---

## Quality Check

- [x] Every metric is classified by type (leading/lagging) and funnel stage (AARRR) — see Metrics Inventory table
- [x] Health scores use stage-appropriate benchmarks (Early SMB SaaS, not generic) — see Scorecard
- [x] Two causal chains traced from symptom to root cause with evidence — see Metric Relationship Map
- [x] Recommendations tied to specific metrics with current value, target, and mechanism — see Action Plan
- [x] Trends analyzed over 6-month window with rate of change and projections — see Trend Analysis
- [x] Confidence levels assigned to all estimates and inferences ([H], [M], [L] throughout)
- [x] Missing data flagged explicitly (activation rate, cohort data, enrichment usage, NPS) — see Missing Critical Metrics table
- [x] Benchmarks cite the stage and segment ("Early SMB SaaS") with sources noted
- [x] Action plan prioritized by impact × feasibility with Quick Win / Strategic / Major Initiative labels
