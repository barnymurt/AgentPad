# Worked Example: Cohort Analysis

This file shows a complete example of cohort analysis for a SaaS product.

## Input Context

**Product:** TaskFlow - Team project management SaaS
**Analysis Period:** January - March 2026
**User Request:** "Help me understand how users are retaining over time"

### Provided Data

```
User Data (Sample):
- 2,500 total users acquired Jan-Mar 2026
- Signup date available
- Plan tier available (Free, Starter, Pro, Enterprise)
- Acquisition source available (Organic, Paid, Referral)
- Activity log with session data
```

---

## Analysis Process

### Step 1: Data Validation

**Data Requirements Met:**
- User identifiers: ✓
- Signup dates: ✓
- Activity timestamps: ✓
- Plan information: ✓
- Source information: ✓

**Volume Assessment:**
- 2,500 users over 3 months
- Weekly cohort size: ~190 users
- Minimum threshold (20): ✓ Met

**Decision:** Use weekly cohorts for best signal-to-noise ratio

### Step 2: Cohort Definition

**Selected:** Weekly Acquisition Cohorts (primary) + Plan-based (secondary)

**Rationale:**
- Weekly captures weekly usage patterns without daily noise
- Plan-based reveals if premium tiers have better retention

### Step 3: Retention Calculation

**Weekly Retention Table:**

| Cohort | Users | Week 1 | Week 2 | Week 3 | Week 4 | Week 8 | Week 12 |
|--------|-------|--------|--------|--------|--------|--------|---------|
| Jan W1 | 195 | 72% | 55% | 45% | 40% | 32% | 28% |
| Jan W2 | 210 | 68% | 52% | 42% | 38% | 30% | 26% |
| Jan W3 | 188 | 75% | 58% | 48% | 42% | 34% | 30% |
| Jan W4 | 202 | 70% | 54% | 44% | 39% | 31% | 27% |
| Feb W1 | 215 | 65% | 48% | 38% | 34% | 26% | - |
| Feb W2 | 225 | 62% | 45% | 36% | 32% | 24% | - |
| Feb W3 | 198 | 70% | 52% | 42% | 38% | - | - |
| Feb W4 | 205 | 68% | 50% | 40% | 35% | - | - |
| Mar W1 | 230 | 60% | 42% | 33% | - | - | - |
| Mar W2 | 218 | 58% | 40% | 31% | - | - | - |
| Mar W3 | 205 | 63% | 46% | - | - | - | - |
| Mar W4 | 212 | 65% | - | - | - | - | - |

### Step 4: Pattern Identification

**Pattern Detected:** Classic Decay with concerning trend

**Key Observations:**
1. Week 1 retention averages 67% (healthy)
2. Week 4 retention averages 37% (concerning)
3. NEW cohorts are performing WORSE than older cohorts
4. March W1-2 cohorts show 15% lower Week 1 retention than January cohorts

**Trend Analysis:**
- Jan W1: 72% → 40% (Week 4)
- Feb W1: 65% → 34% (Week 4)
- Decline: -7% → -6% = significant downward trend

### Step 5: Plan-Based Analysis

**Retention by Plan (All cohorts combined):**

| Plan | Users | Week 1 | Week 4 | Week 12 |
|------|-------|--------|--------|---------|
| Free | 1,500 | 55% | 25% | 12% |
| Starter | 650 | 72% | 45% | 28% |
| Pro | 280 | 85% | 62% | 48% |
| Enterprise | 70 | 95% | 88% | 82% |

**Key Finding:** Clear correlation between plan tier and retention
- Free: 12% Week 12 retention
- Pro: 48% Week 12 retention (4x better)
- Enterprise: 82% Week 12 retention

### Step 6: Small Cohort Handling

**Not applicable** - All weekly cohorts have >190 users (well above 20 minimum)

---

## Output

# Cohort Analysis: TaskFlow (Q1 2026)

## 1. Executive Summary

**Analysis Scope:**
- Data period: January 1 - March 31, 2026
- Total users analyzed: 2,500
- Cohort window: Weekly
- Cohort type: Acquisition (primary), Plan-based (secondary)

**Key Findings:**
1. Overall retention is healthy but DECLINING - March cohorts show 15% lower Week 1 retention than January
2. Plan tier strongly predicts retention - Pro users retain 4x better than Free at Week 12
3. Week 4 is the critical inflection point - users who make it past Week 4 have good long-term retention

**Top Recommendation:**
The declining retention in newer cohorts is concerning. Investigate if recent changes to onboarding or acquisition channels have introduced lower-quality users. Focus retention efforts on the Week 1-4 window with particular attention to Free tier users who show the highest churn.

## 2. Cohort Definition

### Cohort Window Selection

| Window | Rationale |
|--------|------------|
| Weekly | Good balance of signal and noise. Daily would be too noisy for ~190 users/week. Monthly would miss weekly patterns. |

### Cohort Type

| Type | Grouping | Rationale |
|------|----------|-----------|
| Acquisition | Signup week | Primary - tracks overall business health |
| Plan-based | Subscription tier | Secondary - reveals pricing/segment impact |

### Data Quality Assessment

| Metric | Value | Assessment |
|--------|-------|------------|
| Total users | 2,500 | Sufficient |
| Avg cohort size | 192 users | Well above 20 minimum |
| Data completeness | 98% | Good - minor gaps in activity logs |

## 3. Cohort Retention Analysis

### Retention Heatmap

| Cohort | Size | W1 | W2 | W3 | W4 | W8 | W12 |
|--------|------|----|----|----|----|----|-----|
| Jan W1 | 195 | 72% | 55% | 45% | 40% | 32% | 28% |
| Jan W2 | 210 | 68% | 52% | 42% | 38% | 30% | 26% |
| Jan W3 | 188 | 75% | 58% | 48% | 42% | 34% | 30% |
| Jan W4 | 202 | 70% | 54% | 44% | 39% | 31% | 27% |
| Feb W1 | 215 | 65% | 48% | 38% | 34% | 26% | - |
| Feb W2 | 225 | 62% | 45% | 36% | 32% | 24% | - |
| Feb W3 | 198 | 70% | 52% | 42% | 38% | - | - |
| Feb W4 | 205 | 68% | 50% | 40% | 35% | - | - |
| Mar W1 | 230 | 60% | 42% | 33% | - | - | - |
| Mar W2 | 218 | 58% | 40% | 31% | - | - | - |

### Retention Curves

**Visualization:**
```
100% |  *Jan W1   *Jan W3   *Feb W1   *Mar W1
 80% |    \         \         \         \
 60% |     \         \         \         \
 40% |      \_________\_________\_________
 20% |
  0% |____________________________________
       W1    W2    W3    W4    W8   W12
```

**Key Observations:**
- Clear separation between cohorts - newer cohorts perform worse
- Convergence happens around Week 4
- Gap between Jan and March W1 is 12 percentage points

### Segment Comparison by Plan

| Plan | Users | W1 Retention | W4 Retention | W12 Retention |
|------|-------|--------------|--------------|---------------|
| Free | 1,500 | 55% | 25% | 12% |
| Starter | 650 | 72% | 45% | 28% |
| Pro | 280 | 85% | 62% | 48% |
| Enterprise | 70 | 95% | 88% | 82% |

**Insight:** Plan tier is a strong predictor of retention. Upgrading Free users to Paid should significantly improve retention.

## 4. Pattern Analysis

### Pattern 1: Declining Cohort Quality

**Description:**
Newer cohorts are retaining worse than older cohorts at the same time points.

**Evidence:**
- Jan W1: 72% Week 1 → March W1: 60% Week 1 (12 point decline)
- Feb W1: 65% Week 1 → March W2: 58% Week 1 (7 point decline)

**Interpretation:**
Either (a) acquisition quality has declined, (b) recent changes to product/onboarding have reduced value, or (c) increased competition.

**Confidence:** High
- Rationale: Consistent across 10+ cohorts, statistically significant

### Pattern 2: Week 4 Inflection Point

**Description:**
Retention curves flatten after Week 4 - users who make it to Week 4 have much better long-term retention.

**Evidence:**
- Week 4 to Week 12: 40% → 28% for Jan W1 (30% relative decline)
- Week 1 to Week 4: 72% → 40% (44% relative decline)

**Interpretation:**
The first month is the critical period. After users survive the first month, they tend to stick.

**Confidence:** High
- Rationale: Consistent pattern across all cohorts

### Pattern 3: Plan-Dependent Retention

**Description:**
Higher tier users retain at significantly higher rates.

**Evidence:**
- Enterprise (95%) vs Free (55%) at Week 1
- Enterprise (82%) vs Free (12%) at Week 12

**Interpretation:**
Premium users have higher commitment and value. Also, the product may serve their needs better.

**Confidence:** High
- Rationale: Large sample sizes, consistent across time periods

## 5. Engagement vs Retention Analysis

**Critical Distinction Applied:**

| Metric | Calculation | Performance |
|--------|-------------|-------------|
| Retention Rate | Logged in at least once in period | 40% at Week 4 (avg) |
| Engagement Rate | 5+ sessions in period | 65% of retained users |

**Analysis:**
Retained users are reasonably engaged - 65% have 5+ sessions per week. Not a "zombie user" problem.

**Warning:** None - engaged retained users.

## 6. Insights and Recommendations

### Insight 1: Declining Acquisition Quality

**Observation:**
March cohorts show 15% lower Week 1 retention than January cohorts.

**Implication:**
Either the product has gotten worse, onboarding has degraded, or acquisition channels are bringing in less qualified users.

**Recommendation:**
1. Audit recent onboarding changes
2. Review acquisition channel mix - are paid campaigns targeting right users?
3. A/B test onboarding improvements for new users

**Priority:** High
**Expected Impact:** Restoring Jan retention levels = +15% Week 1 retention
**Effort:** Medium

### Insight 2: Free Tier Churn

**Observation:**
Free users have only 12% retention at Week 12 vs 48% for Pro.

**Implication:**
Free tier is not converting to paid AND is churning. Could be (a) not getting value, (b) not seeing upgrade value, or (c) product doesn't fit their use case.

**Recommendation:**
1. Analyze what Pro features Free users who upgrade actually use
2. Consider freemium model changes
3. Implement in-app triggers when Free users hit "power user" patterns

**Priority:** High
**Expected Impact:** Converting 10% of churning Free users to Pro = ~$X MRR
**Effort:** High

### Insight 3: Week 1-4 Critical Window

**Observation:**
Users who make it to Week 4 have good long-term retention (70%+ survive to Week 12).

**Implication:**
All retention efforts should focus on the first month.

**Recommendation:**
1. Enhanced onboarding flow with check-ins at Day 3, Day 7, Day 14
2. Proactive outreach to users who haven't logged in for 5+ days
3. Consider "new user" workspace/feature set for first 30 days

**Priority:** High
**Expected Impact:** Improving Week 4 retention from 37% to 45% = +22% relative
**Effort:** Medium

## 7. Confidence Summary

| Finding | Confidence | Rationale |
|---------|------------|-----------|
| Declining cohort quality | High | Clear trend across 10+ cohorts |
| Week 4 inflection point | High | Consistent across all cohorts |
| Plan-dependent retention | High | Large sample sizes, statistically significant |
| Engagement quality | Medium | Based on session counts only |

**Overall Confidence:** High

**Limitation Statement:**
Analysis limited to 3 months of data. Longer time horizon would strengthen trend analysis. Cohort comparison at Week 12 limited to Jan cohorts only.
