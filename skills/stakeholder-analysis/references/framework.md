# Framework: Stakeholder Analysis

This file provides detailed methodology for identifying, analyzing, and managing stakeholders.

## 1. Stakeholder Categories

### Internal Stakeholders

| Category | Examples | Typical Concerns |
|----------|----------|------------------|
| **Executive** | CEO, CTO, CFO | Budget, strategy, risk |
| **Product** | PM, Product Lead | Requirements, roadmap, success |
| **Engineering** | Dev leads, architects | Feasibility, timeline, technical debt |
| **Design** | Design leads, UX | User experience, consistency |
| **Marketing** | Marketing leads | Positioning, messaging, launch |
| **Sales** | Sales leads, reps | Customer needs, features, enablement |
| **Support** | Support leads | Customer issues, scalability |
| **Finance** | Finance team | Budget, ROI, costs |
| **Legal** | Legal/Compliance | Risk, compliance, contracts |
| **Operations** | Ops, HR | Process, resources, hiring |

### External Stakeholders

| Category | Examples | Typical Concerns |
|----------|----------|------------------|
| **Customers** | Users, admins, buyers | Value, ease, support |
| **Partners** | Integrators, resellers | APIs, revenue, support |
| **Investors** | VC, angels, board | Growth, metrics, exits |
| **Regulators** | Compliance, auditors | Legal, privacy, security |
| **Press** | Journalists, analysts | Story, newsworthiness |

---

## 2. Power/Interest Grid

### The Grid

```
                    INTEREST
                 Low        High
               ┌────────┬────────┐
        High  │  Keep   │ Manage │
              │Satisfied│Closely │
POWER          ├────────┼────────┤
         Low  │ Monitor │ Inform │
              │         │        │
              └────────┴────────┘
```

### Strategies by Quadrant

| Quadrant | Stakeholders | Strategy |
|----------|--------------|----------|
| **Manage Closely** | High Power, High Interest | Partner actively, involve in decisions, regular check-ins |
| **Keep Satisfied** | High Power, Low Interest | Keep informed, don't overwhelm, executive updates |
| **Keep Informed** | Low Power, High Interest | Communicate regularly, gather input, acknowledge |
| **Monitor** | Low Power, Low Interest | Basic awareness, minimal effort |

---

## 3. Stakeholder Position Assessment

### Position Types

| Position | Definition | Signs |
|----------|------------|-------|
| **Champion** | Actively advocates for project | Speaks positively, allocates resources |
| **Supporter** | Backs the project | Willing to help, provides resources |
| **Neutral** | No strong opinion yet | Waiting for information |
| **Skeptic** | Has concerns, open to persuasion | Asks tough questions, needs reassurance |
| **Resistant** | Actively opposes | Raises objections, blocks decisions |

### Assessment Questions

For each stakeholder:
1. What's their current position?
2. What do they care most about?
3. What could change their position?
4. What's the risk if they resist?
5. How do I influence them?

---

## 4. Influence Mapping

### Relationship Types

| Type | Symbol | Meaning |
|------|--------|---------|
| **Reports to** | ↓ | Formal authority |
| **Influences** | ←→ | Can sway opinion |
| **Depends on** | → | Needs approval/input |
| **Allies with** | ⇔ | Natural supporters |
| **Conflicts with** | ≠ | Disagrees with |

### Influence Map Template

```
         [Executive Sponsor]
                  ↓
    ┌─────────────┼─────────────┐
    ↓             ↓             ↓
[Product]    [Engineering]  [Sales]
    ↓             ↓             ↓
[Design]──────[Marketing]────[Support]
```

---

## 5. Communication Planning

### Communication Matrix

| Stakeholder | Power | Interest | Position | Frequency | Format | Key Messages |
|-------------|-------|----------|----------|-----------|--------|--------------|
| [Name] | 5 | 5 | Supporter | Weekly | Meeting | Roadmap, wins |
| [Name] | 4 | 3 | Neutral | Bi-weekly | Email | Updates |

### Message Customization

| Position | What They Need to Hear |
|----------|----------------------|
| Champion | Recognition, strategic context |
| Supporter | How to help, what's needed |
| Neutral | Why this matters, benefits |
| Skeptic | Evidence, answers to concerns |
| Resistant | Address concerns, find common ground |

---

## 6. Conflict Resolution

### Conflict Types

| Type | Description | Resolution Approach |
|------|-------------|---------------------|
| **Resource** | Competing for budget/people | Prioritize, get sponsor input |
| **Priority** | Different project priorities | Align on goals, escalate |
| **Technical** | Disagree on approach | Present options, get data |
| **Political** | Turf battles | Find shared objectives |
| **Personal** | Historical issues | Address directly, HR if needed |

### Resolution Steps

1. **Acknowledge** — Recognize the conflict exists
2. **Understand** — Each perspective
3. **Find common** — Shared goals/outcomes
4. **Propose** — Solutions with trade-offs
5. **Decide** — Get explicit agreement
6. **Document** — Record decision and rationale

---

## 7. Change Management

### Stakeholder Evolution

Stakeholder positions change over time:

- **Project lifecycle:** Early excitement → implementation fatigue → launch
- **Information:** Learn more → position may shift
- **External factors:** Market changes, org changes, priorities

### Update Cadence

| Project Phase | Update Frequency |
|--------------|------------------|
| Initiation | Weekly |
| Planning | Bi-weekly |
| Execution | Weekly |
| Launch | Daily/weekly |
| Post-launch | Monthly |

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **requirements-elicitation:** Stakeholder requirements, priorities
- **product-vision:** Strategic context

### Outputs (Feeds)

- **roadmap-planning:** Stakeholder priorities for sequencing
- **communication-planning:** Stakeholder communication strategy
- **feature-prioritization:** Stakeholder needs weighting
