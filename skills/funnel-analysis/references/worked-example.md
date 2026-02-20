# Worked Example: Funnel Analysis

This file shows a complete example of funnel analysis for a SaaS product.

## Input Context

**Product:** TaskFlow - Team project management SaaS
**Analysis Period:** March 2026
**User Request:** "Help me understand where users drop off in our signup flow"

### Provided Data

```
Event Log (Sample):
- 15,000 unique users
- Events: page_view, pricing_view, plan_select, signup_start, signup_complete, email_verify
- Timestamps available
- Source attribution available
- 45,000 total events
```

---

## Analysis Process

### Step 1: Data Validation

**Data Requirements Met:**
- Event names: ✓
- User identifiers: ✓
- Timestamps: ✓
- Source data: ✓

**Volume Assessment:**
- 15,000 unique users - sufficient
- 45,000 events - sufficient for funnel analysis

**Decision:** Proceed with linear funnel analysis

### Step 2: Define Funnel Stages

**Chosen Funnel:** Signup Flow
**Type:** Strict Linear (required sequence)

| Stage | Event | Completion Criteria | Time Window |
|-------|-------|---------------------|--------------|
| 1: Landing | page_view | Viewed landing page | Session |
| 2: Pricing | pricing_view | Viewed pricing page | Session |
| 3: Plan Select | plan_select | Selected a plan | Session |
| 4: Signup Start | signup_start | Started account creation | Session |
| 5: Signup Complete | signup_complete | Completed account | 24 hours |
| 6: Email Verify | email_verify | Verified email | 7 days |

### Step 3: Calculate Conversion Rates

**Stage-by-Stage:**

| Stage | Users | % of Start | Step Conv | Drop-off |
|-------|-------|------------|-----------|----------|
| 1: Landing | 15,000 | 100% | - | - |
| 2: Pricing | 9,500 | 63% | 63% | 37% |
| 3: Plan Select | 6,500 | 43% | 68% | 32% |
| 4: Signup Start | 4,800 | 32% | 74% | 26% |
| 5: Complete | 3,200 | 21% | 67% | 33% |
| 6: Verify | 2,400 | 16% | 75% | 25% |

**Overall Conversion:** 16% (2,400 / 15,000)

### Step 4: Multi-Path Analysis

**Analysis:** Are there alternative paths users take?

| Path | Users | Conversion |
|------|-------|------------|
| Direct: Landing → Pricing → Plan → Signup → Complete | 8,000 | 18% |
| Landing → Features → Pricing → Plan → Signup → Complete | 3,500 | 14% |
| Landing → Blog → Pricing → Plan → Signup → Complete | 2,000 | 12% |
| Direct to Signup (from ads) → Complete | 1,500 | 22% |

**Finding:** Users from direct signup (ads) actually convert BETTER than those who browse.

### Step 5: Segment Analysis

**Conversion by Source:**

| Source | Landing | Complete | Conversion |
|--------|---------|----------|------------|
| Organic | 6,000 | 1,200 | 20% |
| Paid Search | 4,500 | 585 | 13% |
| Paid Social | 3,000 | 330 | 11% |
| Referral | 1,500 | 285 | 19% |

**Finding:** Paid traffic converts significantly worse than organic/referral.

### Step 6: Returning User Analysis

**First-time vs Returning:**

| Type | Users | Complete | Conversion |
|------|-------|----------|------------|
| First-time | 12,000 | 1,680 | 14% |
| Returning (bounced before) | 3,000 | 720 | 24% |

**Finding:** Users who previously dropped off and returned convert at 24% - much higher than first-time (14%).

---

## Output

# Funnel Analysis: TaskFlow Signup Flow (March 2026)

## 1. Executive Summary

**Funnel Scope:**
- Funnel type: Linear (strict sequence)
- Stages: 6
- Data period: March 1-31, 2026
- Total users: 15,000

**Key Findings:**
1. Overall signup conversion is 16% - below 20% benchmark for SaaS
2. Biggest drop-off is Landing → Pricing (37% drop) - users leave before seeing value
3. Paid traffic converts 40% worse than organic - significant acquisition inefficiency

**Top Recommendation:**
Optimize the landing to pricing transition. Users are visiting but leaving before seeing plans. Add clearer value proposition and social proof on landing page to increase pricing page visits.

## 2. Funnel Definition

### Funnel Type

| Type | Justification |
|------|---------------|
| Linear | Signup is a required sequence - users must complete all 6 steps |

### Stage Definitions

| Stage | Event | Completion | Time Window |
|-------|-------|------------|--------------|
| 1: Landing | page_view | Viewed landing | Session |
| 2: Pricing | pricing_view | Viewed pricing | Session |
| 3: Plan Select | plan_select | Selected plan | Session |
| 4: Signup Start | signup_start | Started signup | Session |
| 5: Signup Complete | signup_complete | Account created | 24 hours |
| 6: Email Verify | email_verify | Email verified | 7 days |

### Data Quality

| Metric | Value | Assessment |
|--------|-------|------------|
| Total events | 45,000 | Sufficient |
| Unique users | 15,000 | Sufficient |
| Data completeness | 99% | Excellent |

## 3. Conversion Analysis

### Overall Metrics

| Metric | Value | Benchmark | Assessment |
|--------|-------|-----------|------------|
| Overall conversion | 16% | 20% | Below |
| Landing volume | 15,000 | - | - |
| Final stage (Verified) | 2,400 | - | - |
| Median time to complete | 2.5 days | - | - |

### Stage-by-Stage Conversion

| Stage | Users | % Start | Step Conv | Drop-off |
|-------|-------|---------|-----------|----------|
| 1: Landing | 15,000 | 100% | - | - |
| 2: Pricing | 9,500 | 63% | 63% | 37% |
| 3: Plan Select | 6,500 | 43% | 68% | 32% |
| 4: Signup Start | 4,800 | 32% | 74% | 26% |
| 5: Complete | 3,200 | 21% | 67% | 33% |
| 6: Verify | 2,400 | 16% | 75% | 25% |

### Visualization

```
Landing:       [████████████] 15,000 (100%)
   ↓ 63%                                    
Pricing:       [████████]      9,500 (63%)
   ↓ 68%                                    
Plan Select:   [██████]        6,500 (43%)
   ↓ 74%                                    
Signup Start:  [████]          4,800 (32%)
   ↓ 67%                                    
Complete:      [███]            3,200 (21%)
   ↓ 75%                                    
Verified:      [██]             2,400 (16%)
```

## 4. Drop-off Analysis

### Drop-off by Stage

| Stage | Drop-off Users | Drop-off Rate | Priority |
|-------|----------------|---------------|----------|
| 1→2 | 5,500 | 37% | **HIGH** |
| 2→3 | 3,000 | 32% | HIGH |
| 3→4 | 1,700 | 26% | MEDIUM |
| 4→5 | 1,600 | 33% | HIGH |
| 5→6 | 800 | 25% | MEDIUM |

### Priority Matrix

| | Easy Fix | Hard Fix |
|---|---|---|
| **High Impact** | **1→2, 2→3, 4→5** | **-** |
| **Low Impact** | **5→6** | **3→4** |

### Drop-off Analysis: Stage 1→2 (Highest Priority)

**Where users go:**
- 60% Leave site entirely
- 25% Go to other pages (blog, features)
- 15% Start different flow

**Possible reasons:**
1. Landing page doesn't clearly communicate value - users bounce
2. No clear path to pricing - users get lost
3. Pricing link not prominent enough

**Evidence:**
- Heatmap (if available): Pricing link in bottom 20% of page
- Scroll depth: Only 40% scroll past hero section

## 5. Multi-Path Analysis

### Paths Identified

| Path | Users | Conversion |
|------|-------|------------|
| Direct (L→P→S→Complete) | 8,000 | 18% |
| Features detour | 3,500 | 14% |
| Blog detour | 2,000 | 12% |
| Direct signup (ads) | 1,500 | 22% |

### Path Efficiency

- Most efficient: Direct signup (22%) - users know what they want
- Least efficient: Blog detour (12%) - lower intent users
- Most common: Direct path (53% of users)

### Recommendations for Paths

The features and blog paths have lower conversion - users may be "just browsing" rather than ready to buy. Consider adding CTAs on these pages to move users toward pricing.

## 6. Segment Analysis

### Conversion by Source

| Source | Users | Complete | Conversion |
|--------|-------|----------|------------|
| Organic | 6,000 | 1,200 | 20% |
| Referral | 1,500 | 285 | 19% |
| Paid Search | 4,500 | 585 | 13% |
| Paid Social | 3,000 | 330 | 11% |

### Key Differences

- Paid traffic converts 40% worse than organic
- Likely reasons:
  1. Misalignment between ad messaging and product experience
  2. Higher proportion of "just looking" users
  3. Landing page quality mismatch

## 7. Returning User Analysis

### First-Time vs Returning

| Type | Users | Complete | Conversion |
|------|-------|----------|------------|
| First-time | 12,000 | 1,680 | 14% |
| Returning | 3,000 | 720 | 24% |

### Insights

Returning users (those who bounced and came back) convert at 24% - significantly higher than first-time visitors (14%).

**Implication:** There's a large pool of interested users who need more nurturing. Consider retargeting campaigns for pricing page visitors who don't convert.

## 8. Recommendations

### Priority 1: Optimize Landing → Pricing Transition

**Observation:**
37% of users leave between landing and pricing - the biggest single drop.

**Diagnosis:**
Users visit landing but don't see enough value to continue. Pricing link not prominent.

**Solution:**
1. Add "View Pricing" button in hero section (currently only in nav)
2. Add social proof (logos, testimonials) above fold
3. Add value proposition summary with specific benefits

**Expected Impact:**
Improving 37% → 50% conversion = +3,200 users seeing pricing = +500 signups/month

**Effort:** Low

### Priority 2: Improve Paid Traffic Landing Experience

**Observation:**
Paid traffic converts 40% worse than organic.

**Diagnosis:**
Ad promise doesn't match landing page experience. Landing page is optimized for SEO, not paid conversion.

**Solution:**
1. Create dedicated landing pages for paid traffic
2. Match ad copy exactly to page messaging
3. Add "start free trial" CTA prominently

**Expected Impact:**
Improving paid conversion from 12% → 16% = +400 signups/month

**Effort:** Medium

### Priority 3: Reduce Signup Form Abandonment

**Observation:**
33% drop from Signup Start to Complete.

**Diagnosis:**
Form may be too long or have friction points.

**Solution:**
1. Analyze form field analytics - which fields cause hesitation
2. Consider progressive disclosure (some fields after signup)
3. Add progress indicator

**Expected Impact:**
Improving 67% → 75% = +380 signups/month

**Effort:** Medium

### Priority 4: Re-target Pricing Page Visitors

**Observation:**
Returning users convert at 24% vs 14% first-time.

**Diagnosis:**
Users who visited pricing but didn't convert are high-intent - just need nudge.

**Solution:**
1. Implement retargeting ads for pricing page visitors
2. Add exit-intent popup with special offer
3. Email follow-up to users who viewed pricing

**Expected Impact:**
Converting additional 10% of 9,500 pricing visitors = +950 signups/month

**Effort:** Medium

## 9. Confidence Summary

| Finding | Confidence | Rationale |
|---------|------------|-----------|
| Stage 1→2 biggest drop-off | High | Clear data, consistent pattern |
| Paid worse than organic | High | 40% difference, statistically significant |
| Returning users convert better | High | Clear segment difference |
| Multi-path differences | Medium | Less data for alternative paths |

**Overall Confidence:** High
