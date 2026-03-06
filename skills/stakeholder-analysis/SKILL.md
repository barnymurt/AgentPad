---
name: stakeholder-analysis
description: Map and prioritize people, teams, and groups affected by a product or project. Use when the user needs to understand who has a stake in the product, what they care about, how much influence they have, and how to communicate with them effectively. Use when the user says "who cares about this," "stakeholder map," "manage stakeholders," "who should I talk to," "build buy-in," or "what do different teams want." Works for internal projects, product launches, and organizational change.
lifecycle: discovery
category: product
outputSummary: Stakeholder map with influence/interest grid and engagement plan
relatedAfter: roadmap-planning,messaging-framework
nextSteps: Engage stakeholders in planning
---

# Stakeholder Analysis

Map and prioritize the people, teams, and groups affected by a product or project. Unlike raw LLM output that produces generic stakeholder lists, this skill systematically identifies stakeholders, assesses their power and interest, uncovers hidden influences, and creates actionable communication strategies for building alignment and managing resistance.

**Note**: This skill works best when combined with discovery methods. See Step 1.

## Core Workflow

### Step 1: Discover and Identify Stakeholders

**Stakeholder Discovery Methods:**

1. **Organizational analysis:**
   - Review org charts
   - Identify reporting lines
   - Find decision-makers and approvers

2. **Project context:**
   - Who requested this?
   - Who will use it?
   - Who funds it?
   - Who could block it?

3. **Interview approaches:**
   - Ask "who else should I talk to?" (snowball)
   - Interview sponsors, users, approvers
   - Check meeting invites for names

4. **Systematic categories:**
   - **Internal:** Leadership, product, engineering, design, marketing, sales, support, finance, legal, HR
   - **External:** Customers, partners, vendors, regulators, investors, press
   - **End users:** Direct users, managers of users, administrators

**Create initial stakeholder list:**
- Name/role
- Department/team
- Relationship to project (sponsor, user, approver, etc.)

**If stakeholders unknown:**
- Use discovery methods above to find them
- Don't proceed without at least 3-5 key stakeholders identified

### Step 2: Assess Power and Interest

**Assess each stakeholder on two dimensions:**

**Power (Influence):**
| Level | Description |
|-------|-------------|
| 5 | Can make or break project (ultimate decision-maker) |
| 4 | Strong influence on decisions |
| 3 | Can influence, not decide |
| 2 | Interested but limited influence |
| 1 | Little to no influence |

**Interest (Level of Care):**
| Level | Description |
|-------|-------------|
| 5 | Very invested - career depends on this |
| 4 | Strong interest - actively monitoring |
| 3 | Moderate interest - occasional updates |
| 2 | Low interest - aware but not tracking |
| 1 | No real interest - just needs to know |

**Calculate Priority Score:** Power × Interest

### Step 3: Map Stakeholder Positions

**For each stakeholder, assess:**

1. **Current position:**
   - Supportive? Neutral? Resistant? Unknown?

2. **Concerns and needs:**
   - What do they care about?
   - What are their priorities?
   - What could make them supportive?

3. **Potential resistance:**
   - What might they push back on?
   - What are their objections likely to be?

### Step 4: Identify Relationships

**Map connections between stakeholders:**

1. **Alliances:** Who supports whom?
2. **Conflicts:** Who disagrees with whom?
3. **Influences:** Who listens to whom?
4. **Dependencies:** Who needs approval from whom?

**Create influence map:**
```
    [CEO]
       ↓
[Product] ←→ [Engineering]
    ↓          ↓
[Marketing] ← [Sales]
```

### Step 5: Develop Communication Strategy

**Based on Power/Interest position:**

| Position | Strategy | Communication Approach |
|----------|---------|----------------------|
| **High Power, High Interest** (Manage Closely) | Partner, involve in decisions | Regular updates, seek input |
| **High Power, Low Interest** (Keep Satisfied) | Keep informed, don't overwhelm | Executive summaries, milestones |
| **Low Power, High Interest** (Keep Informed) | Communicate regularly | Newsletters, demos |
| **Low Power, Low Interest** (Monitor)** | Minimal effort | Basic updates as needed |

**For each key stakeholder:**
- Communication frequency
- Key messages they need to hear
- Format (email, meeting, document)
- Owner for maintaining relationship

### Step 6: Address Conflicts and Resistance

**When stakeholders have conflicting interests:**

1. **Identify the conflict:**
   - What do they disagree on?
   - What's the root cause?

2. **Find common ground:**
   - What's shared between them?
   - What outcomes do they all want?

3. **Escalation path:**
   - Who resolves disagreements?
   - What's the decision process?

4. **Trade-off documentation:**
   - What's being traded off?
   - Who makes the call?

**Conflict Resolution Framework:**
- Acknowledge different perspectives
- Focus on shared goals
- Propose solutions with trade-offs
- Get explicit agreement on decisions
- Document for future reference

### Step 7: Validate and Update

**Validate stakeholder map:**
- Review with project sponsor
- Check for missing stakeholders
- Verify power/interest assessments

**Note:** Stakeholder landscape changes over time. Plan for periodic updates.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Stakeholder Matrix** — Power/interest grid with all stakeholders
- **Stakeholder Profiles** — Individual assessments
- **Relationship Map** — Connections and influences
- **Communication Strategy** — Who needs what, how often
- **Risk Assessment** — Potential conflicts and resistance
- **Recommendations** — Prioritized actions

Expected length: 1,500-2,500 words

## Quality Criteria

- [ ] Minimum 5 key stakeholders identified
- [ ] Stakeholder discovery methods used (not just assumptions)
- [ ] Power and interest scored for each stakeholder (1-5)
- [ ] Current position (supportive/neutral/resistant) assessed
- [ ] Relationships and influences mapped
- [ ] Communication strategy defined per key stakeholder
- [ ] Conflict risks identified with resolution approach
- [ ] Stakeholder map validated with user/sponsor
- [ ] Change management note included (stakeholders evolve)
- [ ] Quick wins identified for building alignment

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS launch):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Only listing obvious stakeholders:** Missing hidden influencers, sponsors, and gatekeepers. Always use discovery methods to find unknown stakeholders.

2. **Assuming support:** Just because someone wasn't resistant in the past doesn't mean they'll support this. Always assess current position.

3. **Static analysis:** Treating stakeholder map as permanent. Stakeholders change, projects evolve, relationships shift. Plan to update.

4. **No conflict plan:** Ignoring potential conflicts until they surface. Identify risks early and have resolution approach ready.

5. **One-size-fits-all communication:** Treating all stakeholders the same. Adjust approach based on power/interest level.

6. **Forgetting the sponsor:** Often the most important stakeholder. Ensure their needs and concerns are addressed.

7. **Skipping validation:** Presenting analysis without verifying accuracy. Always validate with user or sponsor.

8. **Analysis paralysis:** Over-mapping every relationship. Focus on key stakeholders and critical relationships.
