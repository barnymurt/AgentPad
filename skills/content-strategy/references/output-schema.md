# Content Strategy Output Schema

## Consumes

| Field | Source | Description |
|-------|--------|-------------|
| context.product | User input | Product context |
| context.target_audience | User input | Target users |
| context.messaging_framework | Optional | If messaging exists |

## Produces

| Field | Destination | Description |
|-------|-------------|-------------|
| context.content_strategy.goals | GTM Pack | Content goals |
| context.content_strategy.themes | GTM Pack | Content themes |
| context.content_strategy.calendar | GTM Pack | Content calendar |

---

## Output Structure

### Section 1: Content Goals (required)

| Field | Type | Description |
|-------|------|-------------|
| primary_goal | string | Main content goal |
| secondary_goals | array | Supporting goals |
| success_metrics | array | How to measure |

### Section 2: Audience Definition (required)

| Field | Type | Description |
|-------|------|-------------|
| primary_audience | object | Main audience |
| content_needs | array | What they want to read |

### Section 3: Content Themes (required)

| Field | Type | Description |
|-------|------|-------------|
| themes | array | Content themes |
| themes[].name | string | Theme name |
| themes[].topics | array | Topics in theme |

### Section 4: Format Strategy (required)

| Field | Type | Description |
|-------|------|-------------|
| formats | array | Content formats |
| formats[].type | string | Format type |
| formats[].cadence | string | How often |

### Section 5: Distribution Plan (required)

| Field | Type | Description |
|-------|------|-------------|
| channels | array | Distribution channels |

### Section 6: Content Calendar (required)

| Field | Type | Description |
|-------|------|-------------|
| items | array | Calendar items |
| items[].topic | string | Content topic |
| items[].format | string | Format |
| items[].date | date | Publish date |

---

## Validation Rules

1. At least 3 content themes
2. At least 2 content formats defined
3. Calendar has minimum 8 items
