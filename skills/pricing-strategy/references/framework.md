# Framework: Pricing Strategy

This file provides detailed methodology for analyzing and recommending SaaS pricing strategies.

## 1. Pricing Model Options

### Per-Seat Pricing

**How it works:** Charge per user, per month.

**Formula:** Price = (Seat Price) × (Number of Users)

**Examples:** Slack, Zoom, Notion

**Pros:**
- Aligns cost with value (more users = more value)
- Predictable revenue growth as teams grow
- Simple to understand

**Cons:**
- Cannibalizes site-wide deals
- Can price out small teams
- User counting creates friction

**Best for:** Collaboration tools, team productivity, B2B SaaS

### Usage-Based Pricing

**How it works:** Charge based on consumption — API calls, storage, transactions, etc.

**Formula:** Price = (Usage Rate) × (Units Consumed)

**Examples:** Twilio, AWS, Stripe, SendGrid

**Pros:**
- Scale-neutral (customers pay for what they use)
- Low barrier to entry
- Natural upsell as usage grows

**Cons:**
- Revenue less predictable
- Requires usage tracking infrastructure
- Can create bill shock

**Best for:** API products, infrastructure, platforms

### Tiered (Feature) Pricing

**How it works:** Different packages with different feature sets.

**Formula:** Price = Tier Package (includes features A, B, C)

**Examples:** HubSpot, Mailchimp, Intercom

**Pros:**
- Clear value differentiation
- Natural upgrade path
- Reduces feature requests on lower tiers

**Cons:**
- Can create "tier lock-in" frustration
- Complex to communicate
- Feature creep pressure

**Best for:** Product-led growth, freemium conversion

### Tiered (Volume) Pricing

**How it works:** Discounts increase with usage/volume.

**Formula:** Price = Unit Price × Volume (with tiered discount)

**Examples:** Bulk storage, email sending, SMS

**Pros:**
- Rewards growth
- Aligns cost with value
- Encourages expansion

**Cons:**
- Complex to communicate
- Revenue per unit decreases
- Harder to forecast

**Best for:** Products with clear volume metrics

### Flat Rate

**How it works:** Single price, all features included.

**Examples:** Basecamp, Doodle

**Pros:**
- Simplest to understand
- No surprises
- Easy to market

**Cons:**
- Leaves money on table from power users
- Can underprice for enterprise
- Limited upsell path

**Best for:** Simple products, narrow scope, single-market focus

### Freemium

**How it works:** Free tier with limited functionality, paid tiers for full access.

**Examples:** Notion, Figma, Loom

**Pros:**
- Maximum adoption
- Viral potential
- Low barrier to try

**Cons:**
- Low conversion rates (typically 2-7%)
- Free users cost money to support
- Hard to justify premium

**Best for:** Products with strong network effects, consumer B2C, PLG

### Hybrid Models

**How it works:** Combination of above models.

**Examples:**
- Base (per-seat) + Usage (API calls)
- Tiered features + Usage overages
- Per-seat + Enterprise custom

**Pros:**
- Flexible
- Captures multiple value axes
- Complex to replicate

**Cons:**
- Hardest to communicate
- Complex billing infrastructure
- Customer confusion risk

**Best for:** Complex products, enterprise

---

## 2. Value Metrics

### Choosing the Right Metric

The value metric should:

1. **Correlate with value delivered** — More usage = more value
2. **Be measurable** — Can track and bill accurately
3. **Be predictable** — Customers can forecast costs
4. **Be controllable** — Customer can manage consumption

### Common Value Metrics

| Metric | Products | Notes |
|--------|----------|-------|
| Per user/month | Slack, Notion | Team tools |
| Per transaction | Stripe, Twilio | Payment/communications |
| Per API call | AWS, Twilio | Platforms |
| Per storage GB | Dropbox, AWS | Infrastructure |
| Per seat + usage | Notion + AI | Hybrid |
| Per page view | Some analytics | Content platforms |

### Value-to-Price Ratio

Estimate customer value and ensure pricing captures appropriate %:

```
Price as % of Value =
  (Monthly Price / Estimated Monthly Value to Customer) × 100

Target: 5-15% of value delivered
```

---

## 3. Competitive Pricing Analysis

### Price Ladder Mapping

```
                    Price Point
Low                 ↑                  High
  |-----------------|-------------------|
Free    Basic      Pro      Business   Enterprise
 [Comp A]         [Comp B]    [Comp C]
 
Position:     Your product here
```

### Positioning Options

| Position | Strategy | When to Use |
|----------|----------|-------------|
| **Undercut** | 20%+ cheaper | Commoditized, price-sensitive market |
| **Match** | Same range | Fast follower, similar value prop |
| **Premium** | 20%+ more expensive | Superior value, brand, trust required |
| **Whitespace** | Unoccupied price point | Different segment, unique offering |

---

## 4. Unit Economics Deep Dive

### LTV Calculation

```
LTV = (ARPU × Gross Margin) / Churn Rate

Where:
- ARPU = Average Revenue Per User per month
- Gross Margin = (Revenue - COGS) / Revenue
- Churn Rate = % customers lost per month
```

**Example:**
- ARPU: $50/month
- Gross Margin: 80%
- Monthly Churn: 5%

LTV = ($50 × 0.80) / 0.05 = $800

### CAC Calculation

```
CAC = (Sales + Marketing Costs) / New Customers Acquired

Consider:
- Marketing spend (ads, content, events)
- Sales team cost (salary, commission, tools)
- Onboarding/activation costs
- Customer success (first 90 days)
```

### LTV:CAC Ratio

| Ratio | Assessment |
|-------|------------|
| < 1:1 | Losing money on every customer |
| 1:1 - 3:1 | Struggling — need efficiency gains |
| 3:1 | Healthy baseline |
| 5:1 | Excellent — good growth potential |
| > 10:1 | Potentially underinvesting in growth |

### Payback Period

```
Payback Period (months) = CAC / (MRR - COGS per Customer)

Target: <12 months, <6 months excellent
```

---

## 5. Pricing Psychology

### Anchoring

- First price shown sets expectation
- Show high-priced option first → mid-tier looks reasonable
- Enterprise pricing anchors premium positioning

### Decoy Effect

- Add a "decoy" tier to make another tier look better
- Example: $15 → $20 → $50 (middle looks like sweet spot)

### Loss Aversion

- Emphasize what customers lose by not subscribing
- Annual plans → save X% (don't lose discount)

### Bundling

- Bundle features to increase perceived value
- Bundle related products for expansion revenue

---

## 6. Validation Methods

### Before Launch

| Method | Description | Cost | Accuracy |
|--------|-------------|------|----------|
| **Wizard of Oz** | Manual pricing, automated feeling | Low | Medium |
| **Survey + WTP** | Ask willingness to pay | Low | Medium |
| **Concierge** | Sell manually before automating | Medium | High |
| **Pilot Program** | Run with select customers | Medium | High |

### After Launch

| Method | Description |
|--------|-------------|
| **A/B Testing** | Test price points with random customer cohorts |
| **Price Experiments** | Temporary discounts with control group |
| **Cohort Analysis** | Track LTV by acquisition price/plan |

### Willingness to Pay Survey Questions

1. "What is the maximum you would pay for [product]?" (Open-ended)
2. "If [competitor] costs $X, what is the maximum you would pay?" (Anchored)
3. "Would you pay $Y for [product]?" (Yes/No with price Y)
4. "What would make [product] worth $Z?" (Value justification)

---

## 7. Enterprise Considerations

### Enterprise Pricing Strategy

| Approach | Description |
|----------|-------------|
| **Published Pricing** | Transparent, used by PLG products |
| **Custom Pricing** | Negotiated per-account, used by sales-led |
| **Band Pricing** | Tiers based on organization size |

### Enterprise Negotiation Factors

- Number of seats/usage
- Contract length (1-3 years)
- Payment terms (net 30/60/90)
- Support level required
- Custom integrations
- Data security requirements

### Enterprise Discount Guidelines

| Factor | Typical Discount |
|--------|------------------|
| 2-year contract | 10-20% |
| 50+ seats | 10-25% |
| Large enterprise | 20-40% |
| Non-profit/education | 20-50% |

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **competitor-research:** Competitive pricing data, positioning
- **business-case-modeling:** Financial projections, cost structure
- **saas-metrics-analysis:** Churn rates, LTV benchmarks

### Outputs (Feeds)

- **business-case-modeling:** Updated projections with pricing
- **roadmap-planning:** Phasing based on pricing strategy
- **feature-prioritization:** Feature tiering based on pricing
