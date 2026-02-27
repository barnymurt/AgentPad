---
name: scale-readiness
description: Assess product and technical readiness for scaling. Use when the user needs to understand if their product can handle growth, prepare for increased load, or identify what needs to change to support more users, data, or features. Includes scaling triggers, cost considerations, and real-world examples.
---

# Scale Readiness

Assess whether your product can handle growth and prepare for scaling. Understand what needs to change to support more users, data, and features.

## When to Use This Skill

Use when:
- User growth is accelerating
- Planning for a launch or marketing push
- Experiencing performance issues
- Preparing for funding rounds
- Reaching capacity limits
- Not sure if you're ready to scale

## When to Start Preparing

### Scaling Triggers

Start preparing when you see these signals:

| Signal | What It Means | Time to Prepare |
|--------|--------------|-----------------|
| 30% MoM growth | Scaling soon | 2-3 months |
| Capacity at 70% | Need to act now | 1 month |
| Performance degradation | Too late | Immediate |
| 10x growth goal | Strategic planning | 3-6 months |
| Investor pressure | External timeline | Varies |

### Cost of Preparation vs. Reaction

**Prepared Scaling:**
- Costs: Investment in infrastructure planning
- Benefits: Smooth transitions, predictable costs
- Risk: Low

**Reactive Scaling:**
- Costs: Emergency fixes, downtime, potential user loss
- Benefits: None
- Risk: High, potentially catastrophic

Rule of thumb: 1 hour of downtime costs approximately 1 month's infrastructure spend in recovery.

---

## Workflow

### Step 1: Define Current and Target Scale

Where are you now vs. where you want to be?

**Current scale:**
- Users, data volume, request volume

**Target scale:**
- Growth goal (2x, 10x, 100x)
- Timeline to reach goal

### Step 2: Assess Readiness Areas

Evaluate each dimension:

**Technical Readiness**
- Architecture can handle load
- Database performance
- Caching strategy
- API rate limits

**Infrastructure Readiness**
- Cloud capacity
- CDN usage
- Backup systems
- Monitoring

**Process Readiness**
- Deployment frequency
- Incident response
- Documentation
- Team workflows

**Team Readiness**
- Skills and knowledge
- On-call capacity
- Scalability expertise

### Step 3: Identify Gaps

What's not ready for target scale?

### Step 4: Create Roadmap

Prioritized plan to address gaps.

---

## Output Format

The skill produces these sections:

**CURRENT STATE**

Current scale metrics
Target scale goal
Timeline

**ASSESSMENT RESULTS**

For each dimension:
- Readiness status
- What's ready
- What's not ready
- Gap details

**GAP ANALYSIS**

Gap: Description
Impact: What happens if not addressed
Priority: High/Medium/Low
Effort: Small/Medium/Large
Solution: How to fix

**SCALING ROADMAP**

Phase 1: What and when
Phase 2: What and when
Phase 3: What and when

**COST CONSIDERATION**

Preparation cost estimate
Reactive cost comparison
Recommendation

**REAL-WORLD EXAMPLE**

Company: [Name]
What happened: [Scaling story]
Lesson: [What to learn]

---

## Reference Files

- [references/framework.md](references/framework.md) - Assessment framework
- [references/triggers.md](references/triggers.md) - Scaling trigger guide
- [references/examples.md](references/examples.md) - Real-world scaling stories
- [references/cost-guide.md](references/cost-guide.md) - Cost considerations

---

## Related Skills

- architecture-design: Design scalable systems
- iteration-planning: Plan scaling work
- infrastructure-as-code: Implement scalable infrastructure
- monitoring-observability: Track system health
