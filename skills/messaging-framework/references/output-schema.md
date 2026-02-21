# Messaging Framework Output Schema

## Consumes

| Field | Source | Description |
|-------|--------|-------------|
| context.product.description | User input | Product description |
| context.product.category | User input | Product category |
| context.product.differentiator | User input | Key differentiator |
| context.target_audience | User input | Primary audience |
| context.competitors | Optional | Competitive landscape |
| context.validation_pack | Optional | If Validation Pack exists |

## Produces

| Field | Destination | Description |
|-------|-------------|-------------|
| context.messaging_framework.value_proposition | GTM Pack | Core value message |
| context.messaging_framework.positioning | GTM Pack | Positioning statement |
| context.messaging_framework.key_messages | GTM Pack | Messages by audience |
| context.messaging_framework.proof_points | GTM Pack | Supporting evidence |

---

## Output Structure

### Section 1: Product Context (required)

| Field | Type | Description |
|-------|------|-------------|
| product_name | string | Name of the product |
| product_description | string | Brief description |
| category | string | Product category |
| core_function | string | What it does |
| key_benefit | string | Primary benefit |
| differentiator | string | What makes it different |

### Section 2: Value Proposition (required)

| Field | Type | Description |
|-------|------|-------------|
| statement | string | Full value proposition |
| jobs_to_be_done | array | JTBD list |
| jobs_to_be_done[].type | enum | functional, emotional, social |
| jobs_to_be_done[].description | string | JTBD description |
| quantified_value | object | Measurable outcomes |
| quantified_value.metric | string | Metric name |
| quantified_value.value | string | Value claim |

### Section 3: Positioning Statement (required)

| Field | Type | Description |
|-------|------|-------------|
| statement | string | Formal positioning statement |
| template_filled | string | Template with product filled |
| components | object | Statement components |
| components.target | string | Target customer |
| components.problem | string | Problem/job |
| components.category | string | Category |
| components.benefit | string | Key benefit |
| components.differentiation | string | Why different |

### Section 4: Key Messages (required)

| Field | Type | Description |
|-------|------|-------------|
| elevator_pitch | string | 30-second pitch |
| short_description | string | 2-minute description |
| long_description | string | Full description |
| audience_messages | array | Messages by audience |
| audience_messages[].audience | string | Audience name |
| audience_messages[].message | string | Primary message |
| audience_messages[].proof_points | array | Supporting points |

### Section 5: Proof Points (required)

| Field | Type | Description |
|-------|------|-------------|
| proof_points | array | List of proof points |
| proof_points[].claim | string | Claim being proven |
| proof_points[].evidence | string | Evidence type |
| proof_points[].source | string | Source of evidence |

### Section 6: Messages by Channel (conditional)

| Field | Type | Description |
|-------|------|-------------|
| channel_messages | array | Channel adaptations |
| channel_messages[].channel | string | Channel name |
| channel_messages[].message | string | Adapted message |
| channel_messages[].length | string | Length guidance |

### Section 7: Objection Handling (conditional)

| Field | Type | Description |
|-------|------|-------------|
| objections | array | Common objections |
| objections[].objection | string | The objection |
| objections[].category | enum | price, trust, timing, need, alternative |
| objections[].response | string | How to respond |

---

## Validation Rules

1. **Value proposition:** Must be specific, not generic ("best-in-class")
2. **Positioning:** Must include target, problem, category, benefit, differentiation
3. **Elevator pitch:** Maximum 30 words
4. **Audience messages:** Minimum 2 audiences
5. **Proof points:** Minimum 3, must be believable
6. **Objections:** If included, must have response for each
7. **Consistency:** Core message must be consistent across all sections
