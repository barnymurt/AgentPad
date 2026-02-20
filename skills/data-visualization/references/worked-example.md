# Worked Example: Data Visualization

This file shows a complete example of data visualization for different scenarios.

---

## Example 1: Retention Cohort Chart

### Input Context

**Data Source:** Cohort Analysis output
**Question:** "How are users retaining over time?"
**Audience:** Product team
**Context:** Quarterly review presentation

### Data

| Cohort | Size | Week 1 | Week 4 | Week 8 | Week 12 |
|--------|------|--------|--------|--------|---------|
| Jan W1 | 195 | 72% | 40% | 32% | 28% |
| Jan W2 | 210 | 68% | 38% | 30% | 26% |
| Jan W3 | 188 | 75% | 42% | 34% | 30% |
| Feb W1 | 215 | 65% | 34% | 26% | - |
| Feb W2 | 225 | 62% | 32% | 24% | - |
| Mar W1 | 230 | 60% | - | - | - |

### Visualization Design

**Chart Type:** Line chart with cohort curves

**Decision Rationale:**
- Trend data (retention over time) → Line chart
- Multiple series (cohorts) → Multiple lines
- Comparison across time → X-axis is time

**Color Scheme:** Blue-orange diverging (colorblind-safe)
- Each cohort gets distinct color fromest cohort solid palette
- Old newest, lighter

### Output

# Data Visualization: User Retention by Cohort

## 1. Visualization

**Chart Type:** Multi-line retention curve
**Format:** Static (for presentation)

```
Retention Rate (%)
100% |                   * Jan W1 (Week 1)
 80% |              *    \
 60% |           *        * Jan W3
 40% |        *           \      * Feb W1
 20% |      *               \        * Mar W1
  0% |_____*_________________*________*______
      W1    W2    W4    W8    W12   Weeks
```

## 2. Data Summary

### Data Source

| Source | Description |
|--------|-------------|
| Cohort Analysis | Weekly retention by signup cohort |
| Time period | Jan - March 2026 |
| Data points | 6 cohorts × up to 5 time points |

### Data Preparation

| Step | Description |
|------|-------------|
| Aggregation | Retention calculated as % of original cohort |
| Filtering | None - all cohorts included |
| Normalization | Percentage (0-100%) |

## 3. Design Decisions

### Chart Selection Rationale

| Decision | Choice | Reason |
|---------|--------|--------|
| Chart type | Line chart | Shows trend over time |
| Orientation | Horizontal time axis | Standard for time series |
| Color scheme | Blue-orange palette | Colorblind-safe, distinguishes cohorts |
| Scale | 0-100% | Full scale avoids misleading truncation |

### Accessibility

| Check | Status |
|-------|--------|
| Colorblind-safe palette | ✓ Blue-orange-cyan-magenta |
| Sufficient contrast | ✓ Dark lines on white |
| Labels not color-only | ✓ Legend + line labels |
| Alt text provided | ✓ For screen readers |

## 4. Key Insight

**Main Takeaway:**
Newer cohorts are retaining worse than older cohorts - March W1 shows 12 percentage points lower Week 1 retention than January W1.

**Supporting Points:**
1. Week 1 retention dropped from 72% (Jan) to 60% (Mar) - 16% relative decline
2. Week 4 retention stabilizes around 35-40% for all cohorts that reach it
3. Gap between cohorts emerges in Week 1 and stays consistent

## 5. Annotations

| Annotation | Text | Position | Purpose |
|------------|------|----------|---------|
| Callout | "Declining trend: -12pp from Jan to Mar" | Above Mar line | Highlight key insight |
| Reference line | "Industry benchmark: 45%" | At 45% | Context |

## 6. Context for Audience

| Element | Description |
|---------|-------------|
| Audience | Product team, executives |
| Context | Quarterly business review presentation |
| Decision | Investigate retention decline, prioritize onboarding improvements |

## 7. Source and Credits

**Data Source:** Cohort Analysis output (from skills/cohort-analysis)
**Created:** March 2026
**Author:** Data Analyst

---

## Example 2: Funnel Conversion Chart

### Input Context

**Data Source:** Funnel Analysis output
**Question:** "Where are users dropping off in our signup funnel?"
**Audience:** Growth team
**Context:** Optimization workshop

### Data

| Stage | Users | % of Start | Conversion |
|-------|-------|------------|------------|
| Landing | 15,000 | 100% | - |
| Pricing | 9,500 | 63% | 63% |
| Plan Select | 6,500 | 43% | 68% |
| Signup Start | 4,800 | 32% | 74% |
| Complete | 3,200 | 21% | 67% |
| Verified | 2,400 | 16% | 75% |

### Visualization Design

**Chart Type:** Funnel chart

**Decision Rationale:**
- Funnel/showing drop-off → Funnel chart visual
- Sequential steps → Horizontal bars
- Clear visual of where drop-off happens

### Output

# Data Visualization: Signup Funnel Drop-off

## 1. Visualization

**Chart Type:** Funnel chart
**Format:** Static (for workshop)

```
                    [████████████████████] 15,000 - Landing (100%)
                         ↓ 37% drop         
                    [████████████] 9,500 - Pricing (63%)
                         ↓ 32% drop         
                    [████████] 6,500 - Plan Select (43%)
                         ↓ 26% drop         
                    [██████] 4,800 - Signup Start (32%)
                         ↓ 33% drop         
                    [████] 3,200 - Complete (21%)
                         ↓ 25% drop         
                    [██] 2,400 - Verified (16%)

Overall Conversion: 16% (2,400 / 15,000)
Biggest Drop: Landing → Pricing (37%)
```

## 4. Key Insight

**Main Takeaway:**
The biggest drop-off (37%) is between Landing and Pricing - users visit but leave before seeing plans.

**Supporting Points:**
1. 5,500 users leave between Landing and Pricing - largest absolute drop
2. Conversion improves after Pricing - users who see plans tend to proceed
3. Overall 16% conversion is below 20% benchmark

---

## Example 3: A/B Test Results Chart

### Input Context

**Data Source:** A/B Test results
**Question:** "Did the new pricing page improve conversion?"
**Audience:** Product leadership
**Context:** Test results presentation

### Data

| Variant | Sample | Conversions | Conversion Rate | Lift |
|---------|--------|-------------|-----------------|------|
| Control (A) | 4,438 | 710 | 16.0% | - |
| Treatment (B) | 4,438 | 785 | 17.7% | +10.6% |

Statistical significance: p = 0.03

### Visualization Design

**Chart Type:** Grouped bar chart with confidence interval

**Decision Rationale:**
- Comparing two values → Bar chart
- Show both absolute and lift → Grouped
- Show uncertainty → Error bars

### Output

# Data Visualization: A/B Test Results - Pricing Page

## 1. Visualization

**Chart Type:** Grouped bar chart with error bars
**Format:** Static (for presentation)

```
Conversion Rate (%)

20% |        [█████]           
     |        |    |            
18% |        |    |   [█████]   
     |        |    |   |    |   
16% | [█████]|    |   |    |   
     | |    ||    |   |    |   
14% | |    ||    |   |    |   
     | |_||_|    |   |_||_|    
     |   Control   Treatment    
        (A)          (B)         
                   
         16.0%      17.7%       
                    +10.6% lift
                    (p = 0.03)
```

## 4. Key Insight

**Main Takeaway:**
The customer logos treatment increased conversion by 10.6% (statistically significant at p=0.03), supporting the hypothesis.

**Supporting Points:**
1. Treatment outperformed control by 1.7 percentage points
2. Results are statistically significant (p < 0.05)
3. At current traffic, this represents ~400 additional signups/month

---

## Example 4: Metric Trend Dashboard

### Input Context

**Data Source:** SaaS Metrics (monthly)
**Question:** "How are our key metrics trending?"
**Audience:** Executive team
**Context:** Monthly business review

### Data (6 months)

| Month | MRR | Growth | Churn | CAC |
|-------|-----|--------|-------|-----|
| Oct | $85K | 12% | 2.1% | $1,200 |
| Nov | $92K | 8% | 2.3% | $1,150 |
| Dec | $98K | 7% | 2.0% | $1,100 |
| Jan | $108K | 10% | 1.8% | $950 |
| Feb | $115K | 6% | 1.9% | $900 |
| Mar | $125K | 9% | 1.7% | $850 |

### Visualization Design

**Chart Type:** Multi-metric line chart (dual axis)

**Decision Rationale:**
- Multiple metrics over time → Multiple lines
- Different scales (MRR in thousands, CAC in hundreds) → Dual Y-axis
- Clear trends → Line chart

### Output

# Data Visualization: Key SaaS Metrics Trend

## 1. Visualization

**Chart Type:** Line chart with dual Y-axis
**Format:** Interactive (dashboard)

```
MRR ($K)                   CAC ($)
    |                          |
$130K|              __________* $1,200
    |             /        ____*
$120K|     _______*_______/
    |    /        *        
$110K|___*________/_________* $950
    |   *        /          
$100K|   *_______/__________* $850
    |    Oct  Nov  Dec  Jan  Feb  Mar
    |
    +---------------------------
          MRR         CAC
```

## 4. Key Insight

**Main Takeaway:**
Strong growth trajectory with improving unit economics - MRR up 47% while CAC dropped 29%.

**Supporting Points:**
1. MRR grew from $85K to $125K (47% growth in 6 months)
2. CAC decreased from $1,200 to $850 (29% improvement)
3. Churn remained stable around 2% (healthy)
