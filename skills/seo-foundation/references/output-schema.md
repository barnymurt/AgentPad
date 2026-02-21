# SEO Foundation Output Schema

## Consumes

| Field | Source | Description |
|-------|--------|-------------|
| context.product | User input | Product context |
| context.target_audience | User input | Target users |

## Produces

| Field | Destination | Description |
|-------|-------------|-------------|
| context.seo_strategy.keywords | GTM Pack | Target keywords |
| context.seo_strategy.technical | GTM Pack | Technical SEO plan |

---

## Output Structure

### Section 1: Search Context (required)

| Field | Type | Description |
|-------|------|-------------|
| target_keywords | array | Keywords to target |
| competition_level | enum | Competition assessment |

### Section 2: Keyword Strategy (required)

| Field | Type | Description |
|-------|------|-------------|
| keyword_clusters | array | Grouped keywords |
| priority_keywords | array | Primary targets |

### Section 3: Technical SEO Audit (required)

| Field | Type | Description |
|-------|------|-------------|
| current_state | object | Current technical state |
| issues | array | Issues found |
| fixes | array | Recommended fixes |

### Section 4: On-Page SEO (required)

| Field | Type | Description |
|-------|------|-------------|
| optimizations | array | Page optimizations |
| template | string | SEO template |

### Section 5: Content Plan (required)

| Field | Type | Description |
|-------|------|-------------|
| content_topics | array | Topics to cover |
| timeline | string | Publishing timeline |

---

## Validation Rules

1. Minimum 10 target keywords
2. Technical audit covers all major areas
3. Content plan has minimum 10 topics
