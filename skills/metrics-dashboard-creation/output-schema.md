# Metrics Dashboard Output Schema

This defines the structure of dashboard creation output.

## Output Structure

```
DASHBOARD SPECIFICATION

Dashboard Name: [Name]
Purpose: [Why this dashboard exists]
Audience: [Who uses it]
Refresh Frequency: [Real-time/Daily/Weekly]

---

DATA SOURCES

Source 1: [Name]
Type: [Analytics tool/Database/Spreadsheet]
Data Available: [What's in it]
How to Connect: [Method]

Source 2: ...

---

METRICS

Metric 1: [Name]
Definition: [How it's calculated]
Source: [Where data comes from]
Visualization: [Chart type]
Benchmark: [Target or comparison]

Metric 2: ...

---

DASHBOARD SECTIONS

Section 1: [Name] (e.g., Key Metrics)
Metrics:
- [Metric name]
- [Metric name]
Layout: [Horizontal/Grid/Custom]

Section 2: [Name] (e.g., Trends)
Metrics: ...
Layout: ...

Section 3: [Name]
Metrics: ...
Layout: ...

---

ALERTS

Alert 1: [Condition]
Threshold: [Value]
Notification: [Email/Slack/Other]
Action: [What to do]

Alert 2: ...

---

IMPLEMENTATION

Recommended Tool: [Name]
Alternative Tools: [List]
Setup Steps:
1. [Step]
2. [Step]
3. [Step]

Tips:
- [Tip 1]
- [Tip 2]

---

NOTES

[Any assumptions]
[Open questions]
[Next steps]
```

## Quality Guidelines

- Make metrics actionable
- Include benchmarks
- Specify visualization types
- Set up alerts
- Recommend appropriate tools
