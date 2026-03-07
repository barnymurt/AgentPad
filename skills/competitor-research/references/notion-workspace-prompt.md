# Notion Workspace Generation Prompt

This prompt generates a structured Notion workspace from competitor research output.

**When to use:** After competitor-research skill completes with competitive analysis.

**Input:** Competitor data (profiles, pricing, features, positioning, strengths, weaknesses).

**Output:** A Notion workspace for tracking competitive intelligence and positioning.

---

## Data Mapping

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` |
| `generated_date` | Runtime | Current date |
| `product_name` | Input | Your product name |
| `competitors` | Output | Array of competitor objects |
| `market_gaps` | Output | Identified market gaps |
| `differentiation_levers` | Output | Your differentiation opportunities |

---

## Prompt

> **Instruction to AI:** Generate a Notion workspace specification from competitive research data.

---

### 0. Start Here (Page)

**Purpose callout:**
> This workspace was generated from Competitive Research (v{{template_version}}) on {{generated_date}}.
> Product: **{{product_name}}**

**Competitive Landscape:**
- Total Competitors Analyzed: {{count of competitors}}
- Market Gaps Identified: {{count of market_gaps}}
- Differentiation Levers: {{count of differentiation_levers}}

**Quick Links:**
- → Competitor Database
- → Feature Comparison
- → Pricing Analysis
- → Positioning Map
- → Win/Loss Tracker

---

### 1. Competitor Database

**Database Name:** Competitors

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Name | Title | — |
| Category | Select | Direct, Indirect, Substitute, Alternative |
| Website | URL | — |
| Pricing Model | Select | Freemium, Subscription, Usage, One-time, Free |
| Target Segment | Multi-select | SMB, Mid-Market, Enterprise, Consumer |
| Strengths | Text | — |
| Weaknesses | Text | — |
| Threat Level | Select | High, Medium, Low |
| Last Updated | Date | — |

**Pre-populate:** One row per competitor from `competitors`.

**Views:**
1. **"Direct Competitors"** — Filter: Category = Direct
2. **"High Threat"** — Filter: Threat Level = High
3. **"By Segment"** — Group by: Target Segment
4. **"Recently Updated"** — Sort by: Last Updated descending

---

### 2. Feature Comparison Matrix (Page)

**Table:**

| Feature | {{product_name}} | {{competitor_1}} | {{competitor_2}} | ... |
|---------|-----------------|------------------|------------------|-----|
| Feature 1 | ✓/✗ | ✓/✗ | ✓/✗ | |
| Feature 2 | ✓/✗ | ✓/✗ | ✓/✗ | |
| Feature 3 | ✓/✗ | ✓/✗ | ✓/✗ | |
| ... | | | | |

**Properties per feature row:**
| Property | Type | Options |
|----------|------|---------|
| Feature | Title | — |
| Category | Select | Core, Advanced, Nice-to-have |
| Your Product | Select | Has, Partial, No, Planned |
| Priority | Select | Must Have, Should Have, Could Have |

---

### 3. Pricing Analysis (Page)

**Database Name:** Pricing Plans

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Competitor | Relation | → Competitors |
| Plan Name | Title | — |
| Price | Number | — |
| Billing | Select | Monthly, Yearly |
| Features Included | Text | — |
| Limitations | Text | — |

**Pre-populate:** Extract all pricing tiers from `competitors`.

**Views:**
1. **"Monthly Comparison"** — Filter: Billing = Monthly
2. **"By Competitor"** — Group by: Competitor

---

### 4. Positioning Map (Page)

**2x2 Matrix:**

| | Low Price | High Price |
|---|-----------|------------|
| **High Feature** | Disruptors | Premium |
| **Low Feature** | Budget | Basic |

Plot competitors on this matrix based on their pricing and feature richness.

**Quadrant Descriptions:**
- **Premium:** High features, high price — Enterprise solutions
- **Budget:** Low features, low price — Entry-level solutions
- **Disruptors:** High features, low price — Potential market disruption
- **Basic:** Low features, high price — Legacy solutions

---

### 5. Win/Loss Tracker (Page)

**Database Name:** Competitive Deals

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Deal | Title | — |
| Competitor | Relation | → Competitors |
| Outcome | Select | Win, Loss, No Decision |
| Win Reason | Text | — |
| Loss Reason | Text | — |
| Deal Value | Number | — |
| Date | Date | — |
| Lessons Learned | Text | — |

---

### 6. Market Gaps (Page)

**Database Name:** Market Gaps

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Gap | Title | — |
| Competitors Missing | Multi-select | → Competitors |
| Customer Demand | Select | High, Medium, Low |
| Your Opportunity | Select | High, Medium, Low |
| Priority | Select | P0, P1, P2 |
| Status | Select | Not Started, Exploring, Building |

**Pre-populate:** From `market_gaps`.

---

### 7. Differentiation Levers (Page)

**Database Name:** Differentiation

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Lever | Title | — |
| Description | Text | — |
| Competitors with this | Multi-select | → Competitors |
| Your Advantage | Text | — |
| Implementation Effort | Select | High, Medium, Low |
| Impact | Select | High, Medium, Low |

**Pre-populate:** From `differentiation_levers`.

---

### 8. Competitor Alerts (Page)

**Database Name:** Competitor News

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| News | Title | — |
| Competitor | Relation | → Competitors |
| Source | URL | — |
| Date | Date | — |
| Impact | Select | High, Medium, Low |
| Notes | Text | — |

---

### 9. Summary Dashboard (Page)

**Metrics:**
- Direct Competitors: {{count where category = Direct}}
- Win Rate: {{wins / total deals}}
- Market Gaps Available: {{count of market_gaps}}
- High-Impact Levers: {{count where impact = High}}

---

## Output Checklist

- [ ] Competitor Database with all competitors
- [ ] Feature Comparison Matrix
- [ ] Pricing Analysis database
- [ ] Positioning Map visualization
- [ ] Win/Loss Tracker
- [ ] Market Gaps database
- [ ] Differentiation Levers database
- [ ] Competitor Alerts
- [ ] Summary Dashboard
- [ ] All views configured
