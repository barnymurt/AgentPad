---
name: data-visualization
description: Create clear, actionable charts and dashboards that communicate insights effectively. Use when the user needs to "visualize this data," "create a chart," "build a dashboard," "show trends," "make data digestible," or "communicate findings visually." Transforms raw data into visual formats that drive decision-making.
---

# Data Visualization

Create visualizations that communicate insights clearly and drive action. Unlike generic charting that produces cluttered or misleading visuals, this skill applies data visualization best practices: appropriate chart selection, clear labeling, accessible colors, and focused messaging.

**Note**: This skill requires data and a question/insight to communicate. See Step 1.

## Core Workflow

### Step 1: Understand the Data and Question

**Data Requirements:**

Before choosing a visualization, understand:
- What data do you have? (quantitative, categorical, time series)
- How many variables? (1, 2, 3+)
- What relationships? (comparison, distribution, composition, trend)

**Question Requirements:**

Every visualization should answer a question or communicate an insight.

| Question Type | Example | Best Chart |
|--------------|---------|------------|
| Comparison | Which month had highest sales? | Bar chart |
| Distribution | How are prices distributed? | Histogram |
| Trend | Is revenue growing? | Line chart |
| Composition | What makes up total revenue? | Stacked bar, pie |
| Relationship | Do more users mean more revenue? | Scatter plot |

**If Data or Question is Unclear:**
- Request clarification on what insight is needed
- Ask what decision this visualization will inform
- Determine who the audience is

### Step 2: Choose Appropriate Chart Type

**Chart Selection Decision Tree:**

```
What do you want to show?
├── Comparison across categories?
│   ├── Few categories (≤5): Bar chart
│   └── Many categories (10+): Horizontal bar chart
├── Over time (trend)?
│   ├── Continuous data: Line chart
│   └── Discrete periods: Column chart
├── Part-to-whole (composition)?
│   ├── Simple (≤4 parts): Pie chart
│   ├── Complex (5+ parts): Stacked bar
│   └── Change over time: Stacked area
├── Distribution?
│   ├── Single variable: Histogram
│   └── Two variables: Scatter plot
└── Relationship?
    └── Two numeric variables: Scatter plot
    └── Categorical + numeric: Box plot
```

**Avoid These Charts:**

| Chart | Problem | Alternative |
|-------|---------|------------|
| 3D pie charts | Distorts proportions | Pie chart or bar chart |
| Double Y-axis | Confusing, misleading | Two separate charts |
| Too many lines | Cluttered | Small multiples |
| Truncated axes | Can mislead | Full axes |

### Step 3: Design for Clarity

**Essential Elements:**

Every chart needs:
1. **Clear title:** What does this show?
2. **Axis labels:** What are the units?
3. **Legend:** What do colors/shapes mean?
4. **Source:** Where did data come from?

**Labeling Best Practices:**

| Element | Guideline |
|---------|----------|
| Title | Specific, not generic ("Sales by Region" not "Chart 1") |
| Axes | Include units ($1,000 not 1000, Feb not 2) |
| Data labels | Show values for key points |
| Legend | Place where intuitive (right for line, top for bar) |

**Data-Ink Ratio:**

Remove anything that doesn't communicate data:
- Gridlines: Minimal or none
- Background: Clean, white
- 3D effects: Never
- Unnecessary borders: Remove

### Step 4: Ensure Accessibility

**Colorblind-Safe Design:**

~8% of men have color vision deficiency. Design for the most common forms (red-green).

**Colorblind-Safe Palette:**

| Purpose | Safe Colors | Avoid |
|---------|-------------|-------|
| Categorical | Blue, Orange, Green, Yellow | Red, Green (together) |
| Sequential | Light blue → Dark blue | Rainbow |
| Diverging | Blue → White → Orange | Red → Green |

**Accessibility Checklist:**

- [ ] Test palette with colorblind simulator
- [ ] Don't rely on color alone (add labels, patterns)
- [ ] Ensure sufficient contrast (4.5:1 minimum)
- [ ] Provide alt text for screen readers

### Step 5: Add Context and Insights

**Annotations:**

Add annotations to highlight key insights:
- Annotations should answer "so what?"
- Point to the most important data
- Keep text minimal

**Annotation Types:**

| Type | Example |
|------|---------|
| Callout | "Peak in March" |
| Reference line | "Target: $100K" |
| Note | "*Q4 data incomplete" |

### Step 6: Decide Interactive vs Static

**Use Static When:**
- Presenting in slides or documents
- Distributing via email
- Creating one-time reports
- Audience reviews independently

**Use Interactive When:**
- Building dashboards for ongoing monitoring
- Exploring data (self-service analytics)
- Multiple stakeholders need different views
- Drill-down is valuable

**Interactive Features:**

| Feature | Use When |
|---------|----------|
| Hover tooltips | Exact values needed |
| Filtering | Multiple categories |
| Drill-down | Hierarchical data |
| Zoom | Dense time series |

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Visualization** — The chart(s) created
- **Context** — What the visualization shows
- **Key Insight** — The main takeaway
- **Methodology** — How data was prepared

Expected: Visualization with explanation

## Quality Criteria

- [ ] Question/insight clearly defined
- [ ] Chart type appropriate for data and question
- [ ] Clear title and axis labels
- [ ] Legend if needed
- [ ] Colorblind-safe palette used
- [ ] No misleading elements (truncated axes, 3D)
- [ ] Data-ink ratio optimized
- [ ] Key insight annotated
- [ ] Source documented
- [ ] Static vs interactive decision justified

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked examples:** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Wrong chart type:** Using pie chart for comparison. Match chart to question.

2. **No clear message:** Creating "data dumps" without insight. Every chart should answer a question.

3. **Clutter:** Too much decoration. Follow data-ink ratio.

4. **Misleading colors:** Rainbow scales, truncated axes. Be accurate.

5. **Ignoring accessibility:** Red-green color combinations. Use colorblind-safe palettes.

6. **No context:** Showing data without baseline or targets. Add reference points.

7. **Too much data:** Trying to show everything. Focus on what's relevant.

8. **Inconsistent scales:** Comparing trends with different scales. Normalize or separate.

9. **No labels:** Relying on tooltips only. Key values should be visible.

10. **Forgetting the audience:** Technical charts for executives. Match complexity to audience.
