# Notion Workspace Generation Prompt

This prompt generates a structured Notion workspace from business case modeling output.

**When to use:** After business-case-modeling skill completes with financial projections.

**Input:** Business case data (assumptions, revenue projections, costs, unit economics, scenarios).

**Output:** A Notion workspace for tracking and updating business case metrics.

---

## Data Mapping

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` |
| `generated_date` | Runtime | Current date |
| `product_name` | Input | Product name |
| `assumptions` | Business Case | Key assumptions |
| `revenue_projections` | Business Case | Revenue forecasts |
| `costs` | Business Case | Cost structure |
| `unit_economics` | Business Case | LTV, CAC, margins |
| `scenarios` | Business Case | Best/Base/Worst case |
| `financial_model_url` | Output | Link to Google Sheet (if created) |

---

## Prompt

> **Instruction to AI:** Generate a Notion workspace specification from business case data. Note: Financial model data should also be created as a Google Sheet for calculations.

---

### 0. Start Here (Page)

**Purpose callout:**
> This workspace was generated from Business Case Modeling (v{{template_version}}) on {{generated_date}}.
> Product: **{{product_name}}**

**Financial Model:** {{financial_model_url}}

**Key Metrics:**
- Target CAC: {{assumptions.cac}}
- Target LTV: {{unit_economics.ltv}}
- LTV:CAC Ratio: {{unit_economics.ltv_cac_ratio}}
- Break-even: {{unit_economics.break_even}}

**Quick Links:**
- → Financial Model (Google Sheet)
- → Assumptions Tracker
- → Scenario Comparison
- → KPI Dashboard
- → Funding Milestones

---

### 1. Financial Model (External Link)

**Embed or link to:** {{financial_model_url}}

**Sheets expected:**
1. **Assumptions** — All input assumptions
2. **Revenue** — Revenue projections by month/year
3. **Costs** — Cost structure breakdown
4. **Cash Flow** — Monthly cash flow projection
5. **Scenario Analysis** — Best/Base/Worst case
6. **Unit Economics** — LTV, CAC, margins

---

### 2. Assumptions Tracker (Notion Database)

**Database Name:** Business Assumptions

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Assumption | Title | — |
| Category | Select | Revenue, Cost, Growth, Pricing |
| Value | Text | — |
| Confidence | Select | High, Medium, Low |
| Last Updated | Date | — |
| Notes | Text | — |

**Pre-populate:** From `assumptions`.

**Views:**
1. **"Low Confidence"** — Filter: Confidence = Low
2. **"By Category"** — Group by: Category

---

### 3. Scenario Comparison (Page)

**Table:**

| Metric | Best Case | Base Case | Worst Case |
|--------|-----------|-----------|------------|
| MRR at Month 12 | | | |
| MRR at Month 24 | | | |
| MRR at Month 36 | | | |
| CAC | | | |
| LTV | | | |
| LTV:CAC | | | |
| Burn Rate | | | |
| Runway (months) | | | |
| Break-even Month | | | |

**Pre-populate:** From `scenarios`.

---

### 4. KPI Dashboard (Page)

**Metrics Cards:**

| KPI | Current | Target | Status |
|-----|---------|--------|--------|
| Monthly Revenue | | | |
| ARR | | | |
| Customer Count | | | |
| ACV | | | |
| Gross Margin | | | |
| CAC | | | |
| LTV | | | |
| LTV:CAC | | | |
| Payback Period | | | |
| Burn Rate | | | |
| Runway | | | |

**Calculations from unit_economics:**

---

### 5. Funding Milestones (Page)

**Database Name:** Funding Milestones

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Milestone | Title | — |
| Amount Needed | Number | — |
| Target Date | Date | — |
| Required MRR | Number | — |
| Required Customers | Number | — |
| Status | Select | Planned, In Progress, Achieved |
| Actual Date | Date | — |

**Pre-populate milestones:**
- Seed: $500K
- Series A: $3M
- Series B: $15M

---

### 6. Cash Flow Tracker (Page)

**Database Name:** Cash Flow

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Month | Title | — |
| Revenue | Number | — |
| COGS | Number | — |
| Gross Profit | Number | — |
| OpEx | Number | — |
| Net Burn | Number | — |
| Cash Balance | Number | — |
| Variance % | Number | — |

**Linked to:** Financial Model

**Views:**
1. **"Burn Rate"** — Sort by: Net Burn
2. **"Low Cash"** — Filter: Cash Balance < 100000

---

### 7. Revenue Breakdown (Page)

**Database Name:** Revenue Streams

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Stream | Title | — |
| Monthly Revenue | Number | — |
| % of Total | Number | — |
| Growth Rate | Number | — |
| Status | Select | Launching, Growing, Mature |

---

### 8. Cost Breakdown (Page)

**Database Name:** Cost Categories

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Category | Title | — |
| Monthly Cost | Number | — |
| % of Total | Number | — |
| Fixed/Variable | Select | Fixed, Variable |
| Trend | Select | Increasing, Stable, Decreasing |

---

### 9. Sensitivity Analysis (Page)

**Table:**

| Scenario | CAC Impact | Pricing Impact | Growth Impact |
|----------|------------|----------------|---------------|
| +20% CAC | | | |
| -20% CAC | | | |
| +10% Price | | | |
| -10% Price | | | |
| +50% Growth | | | |
| -50% Growth | | | |

---

### 10. Monthly Review Checklist (Page)

- [ ] Update Actuals vs Forecast
- [ ] Review variance > 10%
- [ ] Update runway projection
- [ ] Check milestone progress
- [ ] Update confidence levels

---

## Output Checklist

- [ ] Link to Financial Model (Google Sheet)
- [ ] Assumptions Tracker database
- [ ] Scenario Comparison table
- [ ] KPI Dashboard
- [ ] Funding Milestones database
- [ ] Cash Flow Tracker
- [ ] Revenue Streams database
- [ ] Cost Categories database
- [ ] Sensitivity Analysis
- [ ] Monthly Review Checklist
