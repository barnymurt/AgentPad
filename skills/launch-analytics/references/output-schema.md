# Launch Analytics Output Schema

## Consumes

| Field | Source | Description |
|-------|--------|-------------|
| context.product | User input | Product context |
| context.launch_goals | User input | Launch objectives |

## Produces

| Field | Destination | Description |
|-------|-------------|-------------|
| context.launch_analytics.kpis | GTM Pack | Defined KPIs |
| context.launch_analytics.tracking | GTM Pack | Tracking plan |

---

## Output Structure

### Section 1: Launch Goals (required)

| Field | Type | Description |
|-------|------|-------------|
| success_definition | string | What success looks like |
| targets | object | Specific targets |

### Section 2: Key Metrics (required)

| Field | Type | Description |
|-------|------|-------------|
| north_star | object | Primary metric |
| supporting_metrics | array | Secondary metrics |
| guardrail_metrics | array | Metrics to monitor |

### Section 3: Tracking Plan (required)

| Field | Type | Description |
|-------|------|-------------|
| tools | array | Tracking tools |
| events | array | Events to track |
| attribution | string | Attribution model |

### Section 4: Dashboard Design (required)

| Field | Type | Description |
|-------|------|-------------|
| metrics_shown | array | Dashboard metrics |
| audience | object | Who sees dashboard |

### Section 5: Reporting Plan (required)

| Field | Type | Description |
|-------|------|-------------|
| cadence | string | How often |
| format | string | Report format |
| recipients | array | Who receives |

---

## Validation Rules

1. One north star metric defined
2. At least 3 supporting metrics
3. Tracking plan has specific events
