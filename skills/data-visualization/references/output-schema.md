# Output Schema: Data Visualization

This file defines the exact structure of the Data Visualization skill output.

## Data Contracts

### Consumes

This skill consumes data from:
- **cohort-analysis:** `context.retention_curves`, `context.patterns[]`
- **funnel-analysis:** `context.conversion[]`, `context.drop_offs[]`
- **ab-test-design:** `context.results`
- **saas-metrics-analysis:** `context.metrics`
- Any data source: Raw data with question/insight needed

### Produces

This skill produces:
- `context.visualization` — Chart(s) created
- `context.insight` — Key takeaway
- `context.metadata` — Chart type, colors, design decisions

---

## Output Structure

```
# Data Visualization: [Chart Title]

## 1. Visualization (required)

[Chart or dashboard here - describe what was created]

**Chart Type:** [Type, e.g., Line chart, Bar chart]
**Format:** [Static / Interactive]

## 2. Data Summary (required)

### Data Source

| Source | Description |
|--------|-------------|
| [Skill/Source] | [What data] |
| Time period | [Start - End] |
| Data points | [N] |

### Data Preparation

| Step | Description |
|------|-------------|
| Aggregation | [Sum/Avg/Count] |
| Filtering | [Any filters applied] |
| Normalization | [Any normalization] |

## 3. Design Decisions (required)

### Chart Selection Rationale

| Decision | Choice | Reason |
|---------|--------|--------|
| Chart type | [Type] | [Why appropriate for question] |
| Orientation | [Vertical/Horizontal] | [Best for data] |
| Color scheme | [Palette] | [Colorblind-safe, brand] |
| Scale | [Linear/Log] | [Appropriate for data] |

### Accessibility

| Check | Status |
|-------|--------|
| Colorblind-safe palette | [✓/✗] |
| Sufficient contrast | [✓/✗] |
| Labels not color-only | [✓/✗] |
| Alt text provided | [✓/✗] |

## 4. Key Insight (required)

**Main Takeaway:**
[One sentence answer to the question]

**Supporting Points:**
1. [Point 1 - with data]
2. [Point 2 - with data]
3. [Point 3 - with data]

## 5. Annotations (if applicable)

| Annotation | Text | Position | Purpose |
|------------|------|----------|---------|
| [Type] | [Text] | [Location] | [Why] |

## 6. Interactive Features (if applicable)

| Feature | Description |
|---------|-------------|
| Hover tooltips | [What shows] |
| Filtering | [Options] |
| Drill-down | [Hierarchy] |
| Other | [Features] |

## 7. Context for Audience

| Element | Description |
|---------|-------------|
| Audience | [Who will view this] |
| Context | [How used - presentation, dashboard, etc.] |
| Decision | [What decision does this inform] |

## 8. Source and Credits (required)

**Data Source:** [Source name]
**Created:** [Date]
**Author:** [Name/Role]

---

## Validation Rules

1. Question/insight clearly defined
2. Chart type appropriate for data type and question
3. Clear title that describes what chart shows
4. Axis labels with units
5. Legend if needed
6. Colorblind-safe palette used
7. No misleading elements (truncated axes, 3D)
8. Data-ink ratio optimized (minimal decoration)
9. Key insight annotated or highlighted
10. Source documented

## Confidence Tagging

- **High:** Standard data, clear question, appropriate chart
- **Medium:** Some assumptions, complex data
- **Low:** Unclear question, unusual data type
