# Framework: Funnel Analysis

This file provides detailed methodology for conducting funnel analysis.

## 1. Funnel Type Selection

### Linear Funnels

**Definition:** Users must complete steps in a specific, required sequence.

**Best for:**
- Checkout processes
- Account signup flows
- Onboarding sequences
- Application forms

**Example:**
```
Landing Page → Pricing Page → Plan Selection → Account Creation → Payment → Confirmation
```

**Analysis Approach:**
- Count users at each step
- Calculate step-by-step conversion
- Identify specific friction points

### Branching Funnels

**Definition:** Users can take different paths but end at common goal(s).

**Best for:**
- Product onboarding with optional steps
- Feature discovery flows
- Account setup (some steps optional)

**Example:**
```
Start → Required Step A → Optional Step B OR C → Common Step D → Complete
```

**Analysis Approach:**
- Track completion by any path
- Compare path efficiency
- Analyze path distribution

### Time-Based Funnels

**Definition:** Users complete steps within defined time windows.

**Best for:**
- Re-engagement campaigns
- Subscription renewal
- Trial conversion
- Event-driven sequences

**Example:**
```
Signup → (Day 3) Email 1 → (Day 7) Email 2 → (Day 14) Email 3 → Conversion
```

**Analysis Approach:**
- Track completion within time window
- Measure time-to-convert
- Optimize timing

---

## 2. Stage Definition Guidelines

### Selecting Funnel Stages

**Include:**
1. First touchpoint (entry)
2. Key decision points
3. Significant actions
4. Conversion/completion

**Exclude:**
- Micro-interactions (hover, scroll)
- Optional exploratory behavior
- Technical redirects

### Stage Criteria Definition

For each stage, define:

| Criterion | Question |
|-----------|----------|
| **Trigger** | What event triggers this stage? |
| **Completion** | What counts as "completing" this stage? |
| **Time window** | How long can user take to complete? |
| **Exclusions** | Any users/events to exclude? |

### Example Stage Definitions

**Signup Funnel:**

| Stage | Trigger | Completion | Time Window |
|-------|---------|------------|-------------|
| 1: Landing | Page view | Landed on page | Session |
| 2: Signup form | Form view | Form started | Session |
| 3: Form complete | Form submit | Valid submission | Session |
| 4: Email verify | Verify email sent | Email clicked | 24 hours |
| 5: Complete | Profile complete | Profile 100% | 7 days |

---

## 3. Conversion Metrics Deep Dive

### Step-by-Step Conversion

```
Step 1 → Step 2 = Users completing Step 2 / Users at Step 1
Step 2 → Step 3 = Users completing Step 3 / Users at Step 2
```

**What it tells you:**
- Which specific step is problematic
- Where to focus optimization efforts

### Overall Conversion

```
Overall = Users completing final step / Users at first step
```

**What it tells you:**
- Total funnel efficiency
- Business impact of entire funnel

**Why both matter:**
- Step-by-step: where to optimize
- Overall: what happens if you fix everything

### Drop-off Rate

```
Drop-off at Stage N = 1 - (Stage N+1 conversion)
```

**Example:**
- Stage 1→2: 80% conversion, 20% drop-off
- Stage 2→3: 50% conversion, 50% drop-off
- Stage 3→4: 40% conversion, 60% drop-off

### Time to Convert

**Metrics:**
- Median time: 50% of users convert by this time
- Mean time: Average time to convert
- Distribution: How time varies

**Why it matters:**
- Long time-to-convert = friction or low intent
- Short time-to-convert = smooth or desperate

---

## 4. Multi-Path Analysis

### Path Tracking Approaches

| Approach | Definition | Use Case |
|----------|------------|----------|
| **Strict sequence** | Must complete in exact order | Checkout, signup |
| **Loose sequence** | Can skip but order matters | Onboarding |
| **Any order** | Can complete in any order | Feature enablement |
| **First occurrence** | First time counts | Attribution |

### Analyzing Alternative Paths

**Step 1: Map all paths**

```
Path A: Landing → Pricing → Checkout → Complete
Path B: Landing → Features → Pricing → Checkout → Complete
Path C: Landing → Blog → Pricing → Checkout → Complete
Path D: Landing → Checkout → (bounce) → Return → Complete
```

**Step 2: Calculate path performance**

| Path | Users | Conversion | % of Converted |
|------|-------|------------|----------------|
| A | 500 | 25% | 40% |
| B | 300 | 35% | 33% |
| C | 150 | 15% | 7% |
| D | 200 | 20% | 13% |

**Step 3: Identify insights**

- Path B is most efficient but few use it
- Path C has high drop-off - investigate
- Path D shows re-engagement works

### Handling Re-entry

**Scenario:** User enters funnel, drops, returns, completes

**Options:**
1. **First attempt only:** Count only first entry
2. **All attempts:** Count every attempt
3. **Best attempt:** Count best result

**Recommendation:** Report both first-attempt AND all-attempt metrics

---

## 5. Returning User Handling

### Segmentation

| Segment | Definition | Analysis Value |
|---------|------------|----------------|
| **First-time visitors** | Never converted before | New user experience |
| **Returning visitors** | Have visited before | Repeat behavior |
| **Converted users** | Completed goal | Post-conversion |
| **Churned users** | Previously converted, now inactive | Re-engagement |

### Analysis Approach

**Separate Funnels by Segment:**

```
First-Time Funnel:
Landing → Signup → Complete (conversion rate: 5%)

Returning Funnel:
Landing → Signup → Complete (conversion rate: 15%)
```

**Why different:**
- First-time: Need to convince
- Returning: Already convinced, just need reminder/nudge

### Session Handling

**Same user, multiple sessions:**

1. **Within-session:** Complete funnel in single session
2. **Cross-session:** Complete over multiple sessions
3. **Time-bounded:** Must complete within X days

**Recommendation:** Define session window (24 hours typical) and track both.

---

## 6. Visualization

### Classic Funnel Chart

```
Landing:        [████████████] 10,000 (100%)
   ↓ 60%                                    
Pricing:        [██████]        6,000 (60%)
   ↓ 50%                                    
Checkout:       [███]           3,000 (30%)
   ↓ 40%                                    
Complete:       [█]             1,200 (12%)
```

### Conversion Rate Table

| Stage | Users | % of Start | Step Conversion | Drop-off |
|-------|-------|------------|-----------------|----------|
| Landing | 10,000 | 100% | - | - |
| Pricing | 6,000 | 60% | 60% | 40% |
| Checkout | 3,000 | 30% | 50% | 50% |
| Complete | 1,200 | 12% | 40% | 60% |

### Funnel Chart by Segment

| Segment | Landing | Pricing | Checkout | Complete |
|---------|---------|---------|----------|----------|
| Organic | 4,000 | 65% | 55% | 15% |
| Paid | 4,000 | 50% | 40% | 8% |
| Referral | 2,000 | 70% | 60% | 18% |

### Drop-off Visualization

```
Stage 1 → Stage 2: 40% drop (4,000 users)
Stage 2 → Stage 3: 50% drop (3,000 users)
Stage 3 → Stage 4: 60% drop (1,800 users)
```

**Key insight:** Stage 3 has highest RELATIVE drop, but Stage 1 has highest ABSOLUTE drop.

---

## 7. Integration with Other Skills

### Inputs (Consults)

- **user-journey-mapping:** For understanding user flows
- **cohort-analysis:** For understanding segment differences
- **ab-test-design:** For testing funnel optimizations

### Outputs (Feeds)

- **product-optimization:** Funnel insights for product improvements
- **ab-test-design:** Test hypotheses from drop-off analysis
- **stakeholder-analysis:** Conversion metrics for stakeholders
- **data-visualization:** Funnel charts for reporting
