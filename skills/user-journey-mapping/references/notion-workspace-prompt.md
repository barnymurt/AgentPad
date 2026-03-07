# Notion Workspace Generation Prompt

This prompt generates a structured Notion workspace from user journey mapping output.

**When to use:** After user-journey-mapping skill completes with journey stages and touchpoints.

**Input:** Journey data (stages, touchpoints, emotions, pain points, opportunities).

**Output:** A Notion workspace for tracking and optimizing user journeys.

---

## Data Mapping

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` |
| `generated_date` | Runtime | Current date |
| `product_name` | Input | Product name |
| `persona_name` | Input | Primary persona |
| `journey_stages` | Output | Journey stages |
| `touchpoints` | Output | All touchpoints |
| `pain_points` | Output | Pain points identified |
| `opportunities` | Output | Improvement opportunities |
| `emotional_moments` | Output | High/low emotion moments |

---

## Prompt

> **Instruction to AI:** Generate a Notion workspace specification from user journey mapping data.

---

### 0. Start Here (Page)

**Purpose callout:**
> This workspace was generated from User Journey Mapping (v{{template_version}}) on {{generated_date}}.
> Product: **{{product_name}}**
> Persona: **{{persona_name}}**

**Journey Overview:**
- Stages: {{count of journey_stages}}
- Touchpoints: {{count of touchpoints}}
- Pain Points: {{count of pain_points}}
- Opportunities: {{count of opportunities}}

**Quick Links:**
- → Journey Stages
- → Touchpoint Tracker
- → Pain Points
- → Opportunities
- → Emotional Moments

---

### 1. Journey Stages (Database)

**Database Name:** Journey Stages

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Stage | Title | — |
| Order | Number | — |
| Description | Text | — |
| User Goal | Text | — |
| Key Actions | Text | — |
| Channels | Multi-select | Website, App, Email, Chat, Phone, Social |
| Status | Select | Not Started, Designed, Testing, Live |

**Pre-populate:** One row per stage from `journey_stages`.

**Views:**
1. **"In Order"** — Sort by: Order
2. **"By Status"** — Group by: Status

---

### 2. Touchpoint Tracker (Database)

**Database Name:** Touchpoints

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Touchpoint | Title | — |
| Stage | Relation | → Journey Stages |
| Channel | Select | Website, App, Email, Chat, Phone, Social |
| Type | Select | Information, Transaction, Support, Engagement |
| Description | Text | — |
| Owner | Text | — |
| Status | Select | Existing, Planned, Redesign |
| Priority | Select | P0, P1, P2 |

**Pre-populate:** From `touchpoints`.

**Views:**
1. **"By Stage"** — Group by: Stage
2. **"By Channel"** — Group by: Channel
3. **"P0 Priority"** — Filter: Priority = P0

---

### 3. Pain Points (Database)

**Database Name:** Pain Points

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Pain Point | Title | — |
| Stage | Relation | → Journey Stages |
| Severity | Select | High, Medium, Low |
| Description | Text | — |
| Root Cause | Text | — |
| Impact | Text | — |
| Solutions | Text | — |
| Status | Select | Open, In Progress, Resolved |

**Pre-populate:** From `pain_points`.

**Views:**
1. **"High Severity"** — Filter: Severity = High
2. **"Open"** — Filter: Status = Open

---

### 4. Opportunities (Database)

**Database Name:** Opportunities

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Opportunity | Title | — |
| Stage | Relation | → Journey Stages |
| Type | Select | Improve Experience, Reduce Friction, Add Value |
| Description | Text | — |
| Expected Impact | Select | High, Medium, Low |
| Effort | Select | High, Medium, Low |
| Linked Pain Points | Relation | → Pain Points |
| Status | Select | Backlog, In Progress, Done |

**Pre-populate:** From `opportunities`.

**Views:**
1. **"High Impact, Low Effort"** — Filter: Expected Impact = High AND Effort = Low
2. **"In Progress"** — Filter: Status = In Progress

---

### 5. Emotional Journey Map (Page)

**Table:**

| Stage | Emotion Level (1-10) | Emotion | Trigger | Moment |
|-------|---------------------|---------|---------|--------|
| {{stage_1}} | | | | |
| {{stage_2}} | | | | |
| {{stage_3}} | | | | |
| ... | | | | |

**Emotional Curve Visualization:**
Create a simple chart showing emotion levels across stages.

**Key Moments:**
- **Peak (Highest Emotion):** {{emotional_moments.peak}}
- **Valley (Lowest Emotion):** {{emotional_moments.valley}}

---

### 6. Channel Coverage (Page)

**Table:**

| Channel | Touchpoints | Status | Gaps |
|---------|------------|--------|------|
| Website | {{count}} | | |
| App | {{count}} | | |
| Email | {{count}} | | |
| Chat | {{count}} | | |
| Phone | {{count}} | | |
| Social | {{count}} | | |

---

### 7. User Goals by Stage (Page)

**Table:**

| Stage | User Goal | Current Experience | Ideal Experience |
|-------|-----------|-------------------|------------------|
| {{stage}} | | | |

---

### 8. Improvement Roadmap (Page)

**Database Name:** Journey Improvements

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Improvement | Title | — |
| Related Opportunity | Relation | → Opportunities |
| Target Stage | Relation | → Journey Stages |
| Target Touchpoint | Relation | → Touchpoints |
| Status | Select | Backlog, In Progress, Done |
| Due Date | Date | — |
| Notes | Text | — |

---

### 9. Journey Analytics (Page)

**Metrics to Track:**
- Completion Rate: {{% of users completing full journey}}
- Drop-off Points: {{stages with highest drop-off}}
- Satisfaction Score: {{NPS or CSAT}}
- Time in Stage: {{average time per stage}}

**Current Baseline:**
- Overall Completion: [FILL IN]
- Biggest Friction: [FILL IN]
- Highest Delight: [FILL IN]

---

### 10. Testing Checklist (Page)

For each improvement:
- [ ] Define success metrics
- [ ] Create test plan
- [ ] Run A/B test
- [ ] Measure impact
- [ ] Document learnings

---

## Output Checklist

- [ ] Journey Stages database
- [ ] Touchpoint Tracker database
- [ ] Pain Points database
- [ ] Opportunities database
- [ ] Emotional Journey Map
- [ ] Channel Coverage table
- [ ] User Goals by Stage
- [ ] Improvement Roadmap
- [ ] Journey Analytics page
- [ ] Testing Checklist
- [ ] All views configured
