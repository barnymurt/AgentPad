# Worked Example: Stakeholder Analysis

This file shows the Stakeholder Analysis skill applied to a complete scenario.

---

## Scenario: InvoiceFlow - Enterprise Feature Launch

**Context:** InvoiceFlow is launching an enterprise feature (SSO, advanced permissions, API) to target larger clients. This requires alignment across multiple teams and executive buy-in. The product team needs to understand who the stakeholders are, how to communicate with them, and what conflicts might arise.

---

## Output: Stakeholder Analysis

# Stakeholder Analysis: InvoiceFlow Enterprise Features

## 1. Executive Summary

**Stakeholders Identified:** 12 total (8 internal, 4 external)
**Key Stakeholders:** 5
**Critical Relationships:** 6
**Primary Risks:** Sales vs. Product priorities, Engineering capacity concerns

**Top Recommendation:** Focus on building alignment with Sales (champion), while proactively addressing Engineering concerns through capacity commitment. Executive sponsor (CTO) needs bi-weekly executive summaries. Without Sales partnership, enterprise launch will struggle to hit targets.

---

## 2. Stakeholder Discovery

### Discovery Methods Used
- [✓] Org chart review
- [✓] Interview snowball (asked PM: "Who else should I talk to?")
- [✓] Project sponsor input
- [✓] Team brainstorming

### Stakeholders Identified

| Name | Role | Department | Category | Discovery Method |
|------|------|------------|---------|-----------------|
| Sarah Chen | VP Sales | Sales | Internal | Sponsor input |
| Mike Johnson | CTO | Engineering | Internal | Org chart |
| Lisa Park | Product Director | Product | Internal | Sponsor input |
| Tom Wilson | Engineering Lead | Engineering | Internal | Snowball |
| Rachel Green | Marketing Director | Marketing | Internal | Team brainstorm |
| David Kim | Enterprise AE | Sales | Internal | Snowball |
| James Lee | Customer Success | Support | Internal | Snowball |
| Amy Roberts | Finance Manager | Finance | Internal | Org chart |
| Enterprise Client A | VP Operations | External | Customer | Interview |
| Enterprise Client B | IT Director | External | Customer | Sales input |
| Partner XYZ | Integration Lead | External | Partner | Partnership meeting |
| Investor | Board Member | External | Investor | Board meeting |

---

## 3. Stakeholder Matrix

### Power/Interest Grid

| Stakeholder | Power | Interest | Score | Quadrant |
|-------------|-------|----------|-------|----------|
| Sarah Chen (VP Sales) | 5 | 5 | 25 | Manage Closely |
| Mike Johnson (CTO) | 5 | 4 | 20 | Manage Closely |
| Lisa Park (Product Director) | 4 | 5 | 20 | Manage Closely |
| Tom Wilson (Eng Lead) | 3 | 5 | 15 | Manage Closely |
| Rachel Green (Marketing) | 3 | 4 | 12 | Keep Satisfied |
| David Kim (Enterprise AE) | 2 | 5 | 10 | Keep Informed |
| James Lee (Customer Success) | 2 | 4 | 8 | Keep Informed |
| Amy Roberts (Finance) | 4 | 3 | 12 | Keep Satisfied |
| Enterprise Client A | 3 | 5 | 15 | Manage Closely |
| Partner XYZ | 2 | 3 | 6 | Keep Informed |
| Board/Investor | 5 | 2 | 10 | Keep Satisfied |

### Quadrant Summary

| Quadrant | Count | Stakeholders |
|----------|-------|--------------|
| Manage Closely | 4 | Sarah, Mike, Lisa, Tom, Client A |
| Keep Satisfied | 2 | Rachel, Amy, Investor |
| Keep Informed | 3 | David, James, Partner |
| Monitor | 0 | - |

---

## 4. Stakeholder Profiles

### Sarah Chen (VP Sales) — Manage Closely

**Role:** VP Sales
**Department:** Sales
**Category:** Internal

**Power:** 5 — Controls enterprise sales targets, directly impacts revenue
**Interest:** 5 — Enterprise features critical to hitting quota
**Position:** Champion

**Concerns:**
- Enterprise features delivered by Q2 target
- Competitive differentiation vs. competitors
- Sales enablement materials ready before launch

**What She Needs to Hear:**
- Timeline commitments
- Competitive positioning
- What's included vs. what's roadmap

**Potential Resistance:**
- None — fully supportive

**Communication Strategy:**
- Frequency: Weekly
- Format: In-person meeting
- Owner: Lisa Park (Product Director)
- Key Messages: Timeline, wins, enablement needs

---

### Mike Johnson (CTO) — Manage Closely

**Role:** CTO
**Department:** Engineering
**Category:** Internal

**Power:** 5 — Controls engineering resources, ultimate technical authority
**Interest:** 4 — Wants quality technical decisions, manages team
**Position:** Supporter (with concerns)

**Concerns:**
- Engineering capacity — can team actually deliver?
- Technical debt implications
- Security requirements for enterprise

**What He Needs to Hear:**
- Clear requirements
- Realistic timeline
- Security/compliance needs

**Potential Resistance:**
- Could push back if requirements exceed capacity

**Communication Strategy:**
- Frequency: Bi-weekly
- Format: Meeting with technical updates
- Owner: Tom Wilson (Engineering Lead)
- Key Messages: Technical roadmap, capacity needs, security

---

### Lisa Park (Product Director) — Manage Closely

**Role:** Product Director
**Department:** Product
**Category:** Internal

**Power:** 4 — Controls product roadmap, prioritization
**Interest:** 5 — Enterprise launch is key initiative
**Position:** Champion

**Concerns:**
- Getting all teams aligned
- Balancing enterprise vs. SMB needs
- Launch timeline

**What She Needs to Hear:**
- Cross-team dependencies
- Customer requirements
- Marketing messaging alignment

**Potential Resistance:**
- None — driving the initiative

**Communication Strategy:**
- Frequency: Weekly
- Format: Cross-functional standup
- Owner: Product Lead
- Key Messages: Roadmap, priorities, launch prep

---

### Tom Wilson (Engineering Lead) — Manage Closely

**Role:** Engineering Lead
**Department:** Engineering
**Category:** Internal

**Power:** 3 — Owns implementation, manages team
**Interest:** 5 — Wants to build something great
**Position:** Skeptic

**Concerns:**
- Unclear requirements — "enterprise" is vague
- Timeline realistic?
- Testing/QA capacity

**What He Needs to Hear:**
- Specific requirements
- Clear priorities
- Testing support

**Potential Resistance:**
- Will push back on unclear requirements

**Communication Strategy:**
- Frequency: Weekly
- Format: Technical planning meetings
- Owner: Lisa Park
- Key Messages: Requirements clarity, priorities, timeline

---

### Enterprise Client A — Manage Closely

**Role:** VP Operations
**Department:** Customer (External)
**Category:** External

**Power:** 3 — Large customer, potential reference client
**Interest:** 5 — Needs features to close their internal approval
**Position:** Champion

**Concerns:**
- Timeline — when can they implement?
- SSO implementation support
- Migration path

**What They Need to Hear:**
- Concrete timeline
- Implementation support plan
- Pricing/contract

**Potential Resistance:**
- Could go to competitor if timeline slips

**Communication Strategy:**
- Frequency: Bi-weekly
- Format: Executive check-in calls
- Owner: David Kim (Enterprise AE)
- Key Messages: Timeline, implementation plan, support

---

## 5. Relationship Map

### Influence Diagram

```
                    [Board/Investor]
                           ↓
                      [Mike Johnson - CTO]
                     /        ↓          \
                    ↓         ↓           ↓
           [Tom Wilson] ← [Lisa Park] → [Rachel Green]
                    ↓         ↓           ↓
              [Engineering] [Product] [Marketing]
                           ↓
                    [Sales]
                      ↓
              [David Kim - AE]
                    ↓
             [Enterprise Clients]
                    ↓
               [Partner XYZ]
```

### Key Relationships

| From | To | Type | Impact |
|------|-----|------|--------|
| Lisa Park | Tom Wilson | Technical authority | High |
| Sarah Chen | Mike Johnson | Budget authority | High |
| Lisa Park | Rachel Green | Depends on | Medium |
| David Kim | Enterprise Clients | Enables | High |
| Tom Wilson | Engineering team | Direct reports | High |

---

## 6. Conflict Analysis

### Identified Conflicts

| Conflict | Stakeholders | Type | Resolution Approach |
|----------|--------------|------|---------------------|
| Timeline vs. Capacity | Lisa/Tom vs. Sarah | Priority | Get CTO to validate capacity, adjust timeline or scope |
| Features vs. Resources | Product vs. Engineering | Resource | Prioritize with sponsor, define MVP vs. nice-to-have |
| Enterprise vs. SMB | Sales vs. Product | Priority | Confirm enterprise is priority, roadmap accordingly |

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-------------|
| Enterprise timeline slips | Medium | High | Weekly checks, early warning system |
| Engineering pushes back on scope | High | Medium | Scope prioritization workshop |
| Marketing launches before ready | Low | High | Gate approval with product sign-off |

---

## 7. Communication Strategy

### Communication Plan

| Stakeholder | Quadrant | Frequency | Format | Owner | Key Messages |
|-------------|----------|------------|--------|-------|--------------|
| Sarah Chen | Manage Closely | Weekly | In-person | Lisa | Timeline, wins, enablement |
| Mike Johnson | Manage Closely | Bi-weekly | Meeting | Tom | Technical updates, capacity |
| Lisa Park | Manage Closely | Daily | Standup | Team | Priorities, blockers |
| Tom Wilson | Manage Closely | Weekly | Meeting | Lisa | Requirements, technical plan |
| Rachel Green | Keep Satisfied | Bi-weekly | Email | Lisa | Milestones, messaging |
| David Kim | Keep Informed | Weekly | Slack | Lisa | Updates, customer feedback |
| Amy Roberts | Keep Satisfied | Monthly | Email | Lisa | Budget, business case |

### Key Message Themes

- **For Champions (Sarah, Lisa, Client A):** Timeline progress, wins, how to help
- **For Supporters (Mike):** Technical plan, capacity, resources needed
- **For Skeptics (Tom):** Clear requirements, prioritization, testing support
- **For Neutrals (Rachel, Amy):** Milestones, how it impacts them

---

## 8. Change Management Notes

### Stakeholder Evolution

**Note:** Stakeholder positions change throughout project lifecycle.

**Watch for:**
- "Feature fatigue" as timeline extends
- Interest wanes if quick wins don't materialize
- External events (competitor launches) may shift priorities

**Update frequency:** Re-assess at each phase gate (Planning → Build → Launch)

**Trigger events:**
- Timeline changes
- Scope changes
- Team changes
- External market shifts

---

## 9. Recommendations

### Quick Wins for Building Alignment

| Action | Stakeholder | Impact | Owner | Timeline |
|--------|-------------|--------|-------|----------|
| Requirements workshop | Tom Wilson | High | Lisa | This week |
| Executive sponsor intro | Mike Johnson | High | Lisa | This week |
| Customer call with Sales | Enterprise Client A | High | David | Next week |

### Long-term Strategy

| Strategy | Target | Expected Outcome | Owner |
|----------|--------|------------------|-------|
| Bi-weekly exec updates | Sarah, Mike | Alignment, support | Lisa |
| Engineering roadmap review | Tom | Understanding, input | Tom |
| Customer advisory board | Enterprise clients | Feedback, advocacy | David |

---

**End of Worked Example**
