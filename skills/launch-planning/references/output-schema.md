# Launch Planning Output Schema

## Consumes

| Field | Source | Description |
|-------|--------|-------------|
| context.product.description | User input | What is being launched |
| context.product.stage | User input | Development stage |
| context.launch.type | User input | Launch type (full, beta, phased) |
| context.launch.target_date | User input | Target launch date |
| context.stakeholders | User input | Who is involved |
| context.validation_pack | Optional | If Validation Pack exists |

## Produces

| Field | Destination | Description |
|-------|-------------|-------------|
| context.launch_plan.phases | GTM Pack | Launch phase definitions |
| context.launch_plan.milestones | GTM Pack | Milestone matrix |
| context.launch_plan.criteria | GTM Pack | Go/no-go criteria |
| context.launch_plan.risks | GTM Pack | Risk register |

---

## Output Structure

### Section 1: Launch Overview (required)

| Field | Type | Description |
|-------|------|-------------|
| product_name | string | Name of product being launched |
| launch_type | enum | full_public, beta, phased, re_launch |
| target_launch_date | date | Target date for launch |
| timeline_duration | string | Duration from start to launch |

### Section 2: Launch Phases (required)

| Field | Type | Description |
|-------|------|-------------|
| pre_launch | object | Pre-launch phase details |
| pre_launch.weeks_before | number | Weeks before launch |
| pre_launch.activities | array | List of activities |
| launch_week | object | Launch week details |
| launch_week.activities | array | Launch week activities |
| post_launch | object | Post-launch phase |
| post_launch.weeks_after | number | Post-launch tracking period |
| post_launch.activities | array | Post-launch activities |
| stabilization | object | Stabilization phase |
| stabilization.duration | string | Duration |

### Section 3: Milestone Matrix (required)

| Field | Type | Description |
|-------|------|-------------|
| milestones | array | List of all milestones |
| milestones[].id | string | Unique ID |
| milestones[].name | string | Milestone name |
| milestones[].phase | enum | pre_launch, launch_week, post_launch |
| milestones[].owner | string | Person responsible |
| milestones[].deadline | date | Due date |
| milestones[].dependencies | array | Array of milestone IDs |
| milestones[].status | enum | not_started, in_progress, complete, at_risk |

### Section 4: Go/No-Go Criteria (required)

| Field | Type | Description |
|-------|------|-------------|
| criteria | array | List of criteria |
| criteria[].id | string | Unique ID |
| criteria[].description | string | What must be true |
| criteria[].category | enum | product, marketing, technical, legal |
| criteria[].owner | string | Who owns this |
| criteria[].must_have | boolean | Required vs nice-to-have |
| criteria[].status | enum | not_met, in_progress, met |

### Section 5: Risk Register (required)

| Field | Type | Description |
|-------|------|-------------|
| risks | array | List of launch risks |
| risks[].id | string | Unique ID |
| risks[].description | string | Risk description |
| risks[].likelihood | enum | high, medium, low |
| risks[].impact | enum | critical, major, minor |
| risks[].mitigation | string | Mitigation strategy |
| risks[].owner | string | Risk owner |

### Section 6: Communication Plan (required)

| Field | Type | Description |
|-------|------|-------------|
| internal | object | Internal communication |
| internal.channels | array | Internal channels |
| internal.cadence | string | Update frequency |
| external | object | External communication |
| external.channels | array | External channels |
| external.timeline | array | Communication timeline |

### Section 7: Contingency Plans (conditional)

| Field | Type | Description |
|-------|------|-------------|
| contingencies | array | Contingency plans |
| contingencies[].scenario | string | Scenario description |
| contingencies[].trigger | string | When to activate |
| contingencies[].response | string | Response plan |
| contingencies[].owner | string | Who executes |

---

## Validation Rules

1. **Milestones:** Minimum 5, maximum 30
2. **Go/No-Go criteria:** Minimum 3, must include at least 1 from product, marketing, technical
3. **Risks:** Minimum 3, maximum 15
4. **Every milestone:** Must have owner assigned
5. **Every risk:** Must have mitigation strategy
6. **Timeline:** Must be achievable (check dates are sequential)
