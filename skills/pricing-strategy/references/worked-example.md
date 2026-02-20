# Worked Example: Pricing Strategy

This file shows the Pricing Strategy skill applied to a complete scenario.

---

## Scenario: TaskFlow - Project Management SaaS

**Context:** TaskFlow is a project management tool for small creative agencies (5-20 people). The team has built the product and is now figuring out pricing. They've done competitor research and have basic cost data.

### Input Available

**From competitor-research:**
- 4 competitors analyzed with detailed pricing
- Pricing ranges from $0 (Basic) to $49/user/month (Premium)

**From business-case-modeling:**
- Development costs: $15,000 (one-time)
- Monthly operating costs: $500 (servers, tools, support)
- Cost per additional customer: $5/month (incremental support, hosting)

**Target Market:**
- B2B, small creative agencies
- 5-20 employees
- Currently using spreadsheets, Notion, or basic tools
- Budget: $10-30/user/month typical

---

## Output: Pricing Strategy

# Pricing Strategy: TaskFlow

## 1. Executive Summary

**Recommended pricing model:** Tiered (Feature) + Per-Seat

**Primary price point:** $19/user/month (Pro tier)

**Key rationale:** TaskFlow offers mid-market pricing between budget tools (free/$0) and premium solutions ($29-49). The per-seat model aligns with value (more team members = more collaborative value) while tiered features create clear upgrade paths. Target customer (creative agencies, 5-20 people) budgets $10-30/user, making $19 the sweet spot between accessible and premium-feeling.

---

## 2. Prerequisites Confirmed

| Input | Status | Source |
|-------|--------|--------|
| Value proposition | ✓ Confirmed | User provided: Task management + time tracking + client collaboration |
| Target market | ✓ Confirmed | B2B/SMB, creative agencies, 5-20 employees |
| Competitor data | ✓ Confirmed | competitor-research: 4 competitors analyzed |
| Cost estimates | ✓ Confirmed | $500/month operating, $5/customer incremental |

---

## 3. Value Analysis

### Core Value Metric

**Metric:** Per user/month

**Rationale:** Project management tools deliver more value as more team members collaborate. More users = more tasks, more projects, more communication in the tool = more value per seat. Per-seat pricing directly aligns cost with value delivered.

### Value Quantification

| Value Type | Estimated Value | Notes |
|------------|------------------|-------|
| Time saved | $150/month | 3 hours/month saved × $50/hour avg |
| Billable time tracked | $200/month | 4 hours recovered × $50/hour |
| Client collaboration | $100/month | Reduced email, faster approvals |

**Total Estimated Value:** $450/user/month

### Value-to-Price Ratio

- Estimated monthly value: $450
- Proposed price: $19
- Price as % of value: **4.2%**

**Assessment:** Excellent — pricing captures <5% of delivered value, leaving plenty of upside for customer while making business viable.

---

## 4. Competitive Positioning

### Price Ladder

```
                    Price Point ($/user/month)
Low                 ↑                  High
  |-----------------|-------------------|
Free    $9        $19        $29       $49+
 [Notion] [Trello] [TaskFlow] [Asana] [Monday]
   ↑                              ↑
 Basic                        Premium
```

### Positioning Statement

**Recommended position:** Mid-market Value

**Rationale:** TaskFlow sits between free/budget tools and premium platforms. At $19/user, it's accessible to small agencies (budget reality) while signaling it's not a "free tool" (quality signal). Competes on value-to-price ratio, not lowest price.

### Competitive Gap Opportunities

| Gap | Opportunity | Rationale |
|-----|-------------|-----------|
| $15-25 band | Sweet spot | No strong competitor at $15-25 for agency-focused features |
| Agency-specific features | Differentiation | No competitor targets creative agencies specifically |
| Simple pricing | Clarity | Competitors confuse with multiple tiers, add-ons |

---

## 5. Pricing Scenarios

### Scenario A: Per-Seat Flat (Recommended)

**Structure:**
- Single tier: $19/user/month
- All features included
- Unlimited projects, clients, storage

**Expected Distribution:**
- 100% on single tier (simplifies decision)

**Rationale:** Maximum simplicity for target market. Creative agencies don't want to compare tiers — just want a price that works. All features included means no feature-gating complaints.

**Pros:**
- Simplest to understand
- No analysis paralysis
- Every customer gets full product
- Easy to communicate

**Cons:**
- Leaves money on table from power users
- No natural upsell path
- May underprice for very large teams

---

### Scenario B: Tiered (Feature)

**Structure:**
- **Basic:** $9/user — Tasks + Projects
- **Pro:** $19/user — Basic + Time Tracking + Client Portal
- **Enterprise:** $39/user — Pro + SSO + API + Priority Support

**Expected Distribution:**
- Basic: 20%
- Pro: 70%
- Enterprise: 10%

**Rationale:** Feature gating creates natural upgrade path. Basic captures price-sensitive, Pro captures core market, Enterprise captures agencies wanting advanced features.

**Pros:**
- Multiple entry points
- Clear upgrade path
- Can capture more revenue from willing payers

**Cons:**
- Feature-gating complexity
- "Why don't I have X?" complaints
- More decisions for customer

---

### Scenario C: Usage-Based (Not Recommended)

**Structure:**
- Base: $29/month (includes 5 users, 100 tasks)
- Per additional user: $5/user
- Per additional 100 tasks: $2

**Expected Distribution:**
- Variable (hard to predict)

**Rationale:** Usage-based pricing creates bill anxiety. Creative agencies prefer predictable budgets. Not recommended for this market.

**Pros:**
- Scales with usage
- Lower barrier to start

**Cons:**
- Unpredictable bills = churn
- Complex to communicate
- Wrong metric — more tasks ≠ more value

---

## 6. Unit Economics

### Customer Economics

| Metric | Value | Calculation |
|--------|-------|-------------|
| ARPU | $76/month | $19 × 4 avg users per account |
| Gross Margin | 88% | ($76 - $5 - $4.12) / $76 |
| Monthly Churn | 8% | Industry average for SMB SaaS |
| LTV | $836 | ($76 × 0.88) / 0.08 |

### Acquisition Economics

| Metric | Value | Notes |
|--------|-------|-------|
| Marketing CAC | $120 | Content, ads, SEO |
| Sales CAC | $0 | Product-led, no sales team |
| Total CAC | $120 | All inbound |
| Onboarding Cost | $25 | Setup, training per customer |

### Ratios

| Metric | Value | Target | Assessment |
|--------|-------|--------|------------|
| LTV:CAC | 7:1 | 3:1 min | **Excellent** |
| Payback Period | 1.7 months | <12 | **Excellent** |
| Margin | 88% | 70%+ | **Excellent** |

---

## 7. Recommendation

### Primary Recommendation

**Pricing Model:** Per-Seat Flat (Scenario A)

**Tier Structure:**

| Tier | Price | Target Customer | Key Features |
|------|-------|-----------------|--------------|
| All-in-One | $19/user/month | 5-20 person agencies | Everything — tasks, time, clients, reports |

### Rationale

TaskFlow should use simple per-seat pricing at $19/user for three reasons:

1. **Market fit:** Creative agencies budget $10-30/user. $19 sits in the sweet spot — accessible but not "cheap."

2. **Simplicity wins:** This market doesn't want to compare tiers. One price, all features, done. Reduces friction and support burden.

3. **Strong unit economics:** At $19 × 4 users = $76 ARPU, with 8% churn, LTV is $836. Against $120 CAC, LTV:CAC is 7:1 — room to increase acquisition spend if needed.

The risk of leaving money on table from power users is acceptable. Enterprise deals (50+ seats) can be negotiated custom, but the primary model stays simple.

### Alternative Considered

**Tiered pricing (Scenario B)** was considered but rejected because:
- Feature-gating creates support overhead ("Why don't I have X?")
- Target market prefers simplicity
- LTV:CAC is already healthy at 7:1 — no need to squeeze more

---

## 8. Free Tier Strategy

### Free Tier Definition

**What's included:**
- Up to 3 users
- 50 tasks max
- 1 project
- Email support

**What's NOT included:**
- Time tracking
- Client portal
- Reports
- Priority support

**Usage limits:** Hard caps — not metered

### Conversion Expectations

- Expected conversion rate: 5%
- Time to conversion: 30-60 days
- Conversion triggers: Hitting task limit, needing client portal, team grows past 3

### Why Free Tier Makes Sense

A limited free tier captures:
- Solopreneurs as entry point (future agencies)
- Word-of-mouth from small teams
- Market share before competitors do

**Risk mitigation:** Hard caps prevent abuse. 3-user limit targets future agency founders, not enterprises looking for free tools.

---

## 9. Validation Plan

### Recommended Validation Approach

**Method:** Concierge + Pilot

**Timeline:** 6 weeks
- Weeks 1-2: Concierge sell to 5 agencies at $19 (accept all, perfect product)
- Weeks 3-4: Refine based on feedback, adjust features/pricing
- Weeks 5-6: Pilot at $19 with 10 agencies

**Success criteria:**
- 60%+ would recommend to another agency (NPS > 30)
- 70%+ would pay (not just use free)
- Churn < 10% in first 3 months

### Fallback if Validation Fails

- If price pushback: Offer annual discount (20% off = $15/user/month)
- If features missing: Add to roadmap, adjust tier structure
- If market timing off: Consider $9 launch, increase after validation

---

## 10. Enterprise Pricing

### Enterprise Strategy

- **Approach:** Custom pricing
- **Entry point:** 50+ users
- **Typical discount:** 15-20% for 2-year commitment
- **Negotiation factors:** Seats, support level, custom integrations

### Enterprise Features

| Feature | Included | Enterprise Only |
|---------|----------|-----------------|
| SSO/SAML | No | ✓ |
| API Access | No | ✓ |
| Dedicated support | No | ✓ |
| SLA | No | ✓ |
| Data residency | No | ✓ |
| Custom integrations | No | ✓ |

### Enterprise Pricing Formula

```
Enterprise Price = ($19 × 0.85) × Users × Contract Multiplier
Where:
- 0.85 = 15% volume discount
- Contract Multiplier: 1.0 (1 year), 0.9 (2 year)
```

---

## 11. Launch Strategy

### Launch Pricing

- **Initial price:** $19/user/month
- **Launch discount:** None — launch at full price
- **Rationale:** Quality signals matter. Launching cheap undersells. $19 is already competitive.

### Why No Launch Discount

- Target market (agencies) is not price elastic at launch
- Discount creates anchor problem — raising later is painful
- Strong unit economics don't require discount acquisition

### When to Consider Price Increase

- After 100+ paying customers with low churn
- When adding significant features (enterprise-grade)
- When brand establishes premium perception

---

**End of Worked Example**
