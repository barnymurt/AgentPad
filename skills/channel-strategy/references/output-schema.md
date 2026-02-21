# Channel Strategy Output Schema

## Consumes

| Field | Source | Description |
|-------|--------|-------------|
| context.product | User input | Product context |
| context.target_audience | User input | Target users |
| context.budget | User input | Marketing budget |

## Produces

| Field | Destination | Description |
|-------|-------------|-------------|
| context.channel_strategy.channels | GTM Pack | Prioritized channels |
| context.channel_strategy.budget | GTM Pack | Budget allocation |

---

## Output Structure

### Section 1: Channel Audit (required)

| Field | Type | Description |
|-------|------|-------------|
| existing_channels | array | Current channels |
| performance | object | Performance data |

### Section 2: Channel Evaluation (required)

| Field | Type | Description |
|-------|------|-------------|
| potential_channels | array | Channels to evaluate |
| scores | object | Fit scores |

### Section 3: Channel Prioritization (required)

| Field | Type | Description |
|-------|------|-------------|
| prioritized_channels | array | Top channels |
| rationale | string | Why these |

### Section 4: Budget Allocation (required)

| Field | Type | Description |
|-------|------|-------------|
| allocation | object | Budget by channel |
| testing_budget | number | For testing |

### Section 5: Testing Plan (required)

| Field | Type | Description |
|-------|------|-------------|
| tests | array | Tests to run |
| timeline | string | Test duration |

---

## Validation Rules

1. Minimum 3 prioritized channels
2. Budget allocation sums to total budget
3. Testing plan has specific metrics
