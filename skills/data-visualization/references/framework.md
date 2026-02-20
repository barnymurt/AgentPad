# Framework: Data Visualization

This file provides detailed methodology for creating effective data visualizations.

## 1. Chart Type Selection Guide

### Comparison Charts

**When to use:** Comparing values across categories

| Chart | Best For | Example |
|-------|----------|---------|
| **Bar chart** | Few categories, vertical comparison | Sales by quarter |
| **Horizontal bar** | Many categories, ranked | Top 10 products |
| **Grouped bar** | Comparing multiple metrics | Sales vs target by region |
| **Bullet graph** | Performance against target | Actual vs goal |

### Trend Charts

**When to use:** Showing change over time

| Chart | Best For | Example |
|-------|----------|---------|
| **Line chart** | Continuous time series | Revenue over 12 months |
| **Column chart** | Discrete periods | Sales by month |
| **Area chart** | Total + components | Revenue with breakdown |
| **Sparkline** | Compact trend | KPI with mini-chart |

### Composition Charts

**When to use:** Showing parts of a whole

| Chart | Best For | Example |
|-------|----------|---------|
| **Pie chart** | Simple parts (≤4), total is 100% | Market share |
| **Stacked bar** | Compare totals + composition | Revenue by product line |
| **Stacked area** | Composition over time | Traffic sources over time |
| **Treemap** | Hierarchical composition | Folder sizes |

### Distribution Charts

**When to use:** Showing how data is distributed

| Chart | Best For | Example |
|-------|----------|---------|
| **Histogram** | Continuous data distribution | Price distribution |
| **Box plot** | Distribution with quartiles | Salary by department |
| **Violin plot** | Complex distributions | Response times |
| **Dot plot** | Few data points | Survey responses |

### Relationship Charts

**When to use:** Showing correlation between variables

| Chart | Best For | Example |
|-------|----------|---------|
| **Scatter plot** | Two numeric variables | Ad spend vs revenue |
| **Bubble chart** | Three variables (size = 3rd) | Revenue vs profit by category |
| **Connected scatter** | Relationship over time | Temperature vs sales |

---

## 2. Colorblind-Safe Design

### The Problem

- 8% of men have red-green color blindness
- Blue-orange is universally distinguishable
- Always test with colorblind simulators

### Safe Color Palettes

**Categorical (distinct categories):**
- Blue (#0077BB)
- Orange (#EE7733)
- Green (#009988)
- Magenta (#EE3377)
- Cyan (#33BBEE)
- Grey (#BBBBBB)

**Sequential (ordered data):**
- Light blue → Blue → Dark blue
- Light grey → Dark grey

**Diverging (positive-negative):**
- Blue → White → Orange
- Purple → White → Yellow

### Accessibility Checklist

- [ ] Use colorblind-safe palette
- [ ] Don't rely on color alone (add labels, patterns)
- [ ] Test with simulator (ColorOracle, etc.)
- [ ] Ensure 4.5:1 contrast ratio
- [ ] Provide alt text for screen readers

---

## 3. Data Visualization Checklist

### Before Creating

- [ ] What question does this answer?
- [ ] Who is the audience?
- [ ] What decision will this inform?
- [ ] What data do I need?

### While Designing

- [ ] Is chart type appropriate?
- [ ] Are axes labeled with units?
- [ ] Is legend clear?
- [ ] Are colors accessible?
- [ ] Is title descriptive?

### After Creating

- [ ] Can I remove gridlines?
- [ ] Are key insights annotated?
- [ ] Is source documented?
- [ ] Is this simpler?
- [ ] Does it answer the question?

---

## 4. Common Chart Mistakes

### Pie Charts

**Problem:** Hard to compare angles, especially with many slices

**Better alternatives:**
- Bar chart for comparison
- Stacked bar for composition + comparison

### 3D Charts

**Problem:** Distorts data, impossible to read accurately

**Solution:** Use 2D charts always

### Truncated Axes

**Problem:** Can dramatically misrepresent differences

**Example:**
- 0-100 scale: Shows 50 vs 100 as half
- 45-55 scale: Shows 50 vs 100 as huge difference

**Solution:** Use full axes or clearly annotate

### Double Y-Axes

**Problem:** Two scales make comparison difficult, easy to mislead

**Solution:** Two separate charts or normalized data

### Too Many Categories

**Problem:** Cluttered, hard to read

**Solution:** Top N + "Other", or use treemap

### Inconsistent Scales

**Problem:** Can't compare across charts

**Solution:** Same scale for comparison charts

---

## 5. Annotation Guide

### Types of Annotations

| Type | Use For |
|------|---------|
| **Reference line** | Target, benchmark, average |
| **Callout** | Highlight specific point |
| **Zone** | Highlight range (e.g., "target zone") |
| **Note** | Data quality, caveats |
| **Arrow** | Draw attention to trend |

### Annotation Best Practices

1. Keep text minimal
2. Use clear, simple language
3. Don't cover data points
4. Be consistent in styling

---

## 6. Interactive vs Static

### When to Use Static

| Scenario | Why |
|----------|-----|
| Slide presentations | Can't interact in slides |
| Email reports | Interactive doesn't work |
| One-time documents | Interactive adds overhead |
| Print materials | Physical medium |
| Executive summaries | Quick overview |

### When to Use Interactive

| Scenario | Why |
|----------|-----|
| Dashboards | Ongoing monitoring |
| Self-service analytics | User explores |
| Multiple audiences | Different views |
| Dense data | Filter to focus |
| Drill-down | Hierarchical exploration |

### Interactive Design Principles

1. **Default view:** Show most common question
2. **Tooltips:** Provide detail on hover
3. **Filtering:** Easy to filter categories
4. **Responsiveness:** Fast, smooth interaction

---

## 7. Data Prep for Visualization

### Aggregation

| Data Type | Aggregation | Example |
|-----------|-------------|---------|
| Time series | Sum, Average | Revenue by month |
| Categories | Count, Sum | Orders by product |
| Continuous | Average, Median | Average order value |

### Filtering

- Remove outliers if needed
- Filter to relevant time range
- Exclude null/zero values appropriately

### Normalization

- Per-capita for population differences
- Percent change for trends
- Indexed to baseline

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **cohort-analysis:** Cohort retention curves
- **funnel-analysis:** Funnel conversion charts
- **ab-test-design:** Experiment results
- **saas-metrics-analysis:** Metric dashboards
- **user-persona-creation:** Segment visualizations

### Outputs (Feeds)

- **stakeholders:** Executive dashboards
- **reports:** Recurring reports
- **presentations:** Slide visuals
- **product-strategy:** Trend analysis
