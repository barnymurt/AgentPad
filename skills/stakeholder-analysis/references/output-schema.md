# Output Schema: Stakeholder Analysis

This file defines the exact structure of the Stakeholder Analysis skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **requirements-elicitation:** `context.stakeholder_requirements`, `context.priorities`

### Produces

This skill produces:
- `context.stakeholders[]` — Array with power, interest, position assessments
- `context.relationships` — Influence map
- `context.communication_plan` — Strategy per stakeholder
- `context.conflicts[]` — Identified conflicts with resolution approaches

---

## Output Structure

```
# Stakeholder Analysis: [Project/Initiative Name]

## 1. Executive Summary (required)

- Total stakeholders identified: [X]
- Key stakeholders: [Names and positions]
- Critical relationships: [X]
- Primary risks: [Conflicts to manage]
- Top recommendation: [2-3 sentences]

## 2. Stakeholder Discovery (required)

### Discovery Methods Used
- [ ] Org chart review
- [ ] Interview snowball
- [ ] Project sponsor input
- [ ] Team brainstorming
- [ ] Other: [Method]

### Stakeholders Identified
| Name | Role | Department | Category | Discovery Method |
|------|------|------------|---------|-----------------|
| [Name] | [Role] | [Dept] | Internal/External | [How found] |

## 3. Stakeholder Matrix (required)

### Power/Interest Grid

| Stakeholder | Power (1-5) | Interest (1-5) | Score | Quadrant |
|-------------|-------------|----------------|------|----------|
| [Name] | 5 | 5 | 25 | Manage Closely |
| [Name] | 4 | 3 | 12 | Keep Satisfied |

### Quadrant Summary
| Quadrant | Count | Stakeholders |
|----------|-------|--------------|
| Manage Closely | X | [Names] |
| Keep Satisfied | X | [Names] |
| Keep Informed | X | [Names] |
| Monitor | X | [Names] |

## 4. Stakeholder Profiles (required)

### [Stakeholder Name]

**Role:** [Title/Role]
**Department:** [Team]
**Category:** Internal / External

**Power:** [1-5] — [Rationale]
**Interest:** [1-5] — [Rationale]
**Position:** Champion / Supporter / Neutral / Skeptic / Resistant

**Concerns:**
- [Concern 1]
- [Concern 2]

**What They Need to Hear:**
- [Message 1]
- [Message 2]

**Potential Resistance:**
- [Risk 1]
- [Risk 2]

**Communication Strategy:**
- Frequency: [Weekly/etc.]
- Format: [Meeting/Email/etc.]
- Owner: [Who manages relationship]

[Repeat for each key stakeholder]

## 5. Relationship Map (required)

### Influence Diagram

```
[Visual map showing relationships]

Key:
↓ Reports to
←→ Influences
→ Depends on
⇔ Allies
≠ Conflicts
```

### Key Relationships
| From | To | Type | Impact |
|------|-----|------|--------|
| [Name] | [Name] | [Type] | High/Med/Low |

## 6. Conflict Analysis (required)

### Identified Conflicts
| Conflict | Stakeholders | Type | Resolution Approach |
|----------|--------------|------|---------------------|
| [Issue] | A vs B | Resource/Priority | [Approach] |

### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-------------|
| [Resistance] | High/Med/Low | High/Med/Low | [Plan] |

## 7. Communication Strategy (required)

### Communication Plan

| Stakeholder | Quadrant | Frequency | Format | Owner | Key Messages |
|-------------|----------|------------|--------|-------|--------------|
| [Name] | Manage Closely | Weekly | Meeting | [PM] | Roadmap, decisions |
| [Name] | Keep Satisfied | Bi-weekly | Email | [Sponsor] | Updates, milestones |

### Key Message Themes
- **For Champions:** Recognition, strategy, how to help
- **For Supporters:** Appreciation, specific asks
- **For Neutrals:** Value proposition, what's in it for them
- **For Skeptics:** Evidence, address concerns, transparency
- **For Resistant:** Acknowledge concerns, find common ground

## 8. Change Management Notes (required)

### Stakeholder Evolution

**Note:** Stakeholder positions change throughout project lifecycle.

- **Watch for:** [Signs of position changes]
- **Update frequency:** [When to reassess]
- **Trigger events:** [What prompts reassessment]

## 9. Recommendations (required)

### Quick Wins for Building Alignment
| Action | Stakeholder | Impact | Owner | Timeline |
|--------|-------------|--------|-------|----------|
| [Meet with] | [Name] | High | [Who] | [When] |
| [Share update] | [Name] | Medium | [Who] | [When] |

### Long-term Strategy
| Strategy | Target | Expected Outcome | Owner |
|----------|--------|------------------|-------|
| [Approach] | [Stakeholders] | [Outcome] | [Who] |

---

## Validation Rules

1. Minimum 5 key stakeholders identified
2. Discovery methods documented (not just assumed)
3. Power and interest scored (1-5) for each
4. Position assessed (supporter/neutral/resistant)
5. Relationships mapped (influence map)
6. Communication strategy per key stakeholder
7. Conflicts identified with resolution approach
8. Quick wins identified for building alignment
9. Change management note included

## Confidence Tagging

- **High:** Direct contact with stakeholder, current information
- **Medium:** Second-hand information, some assumptions
- **Low:** Unknown stakeholder, no contact yet

Apply confidence to influence assessments and communication strategies.
