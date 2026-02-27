# Scaling Trigger Guide

## When to Start Preparing

### Early Warning Signs

Start preparing for scale when you see these signals:

| Signal | Action Timeframe |
|--------|-----------------|
| Consistent 20%+ month-over-month growth | 3-6 months before hitting capacity |
| 50% infrastructure capacity used | Begin planning now |
| Performance degrading | Start immediately |
| Launch/PR event scheduled | Prepare 1-2 months before |
| Entering new market | Prepare 3-6 months before |
| Investor pitch with growth claims | Ensure ready before pitch |

---

### Growth Stage Indicators

#### Pre-Scale (0-1000 users)

Typical warning signs:
- First performance complaints
- Database queries getting slower
- Deployment times increasing
- Support tickets about speed

Time to prepare: 6+ months

#### Early Scale (1000-10000 users)

Typical warning signs:
- Regular performance issues
- Manual scaling becoming painful
- Can't deploy fast enough
- On-call getting overwhelming

Time to prepare: 3-6 months

#### Growth (10000-100000 users)

Typical warning signs:
- Daily capacity concerns
- Multiple performance incidents
- Team struggling with incidents
- Infrastructure costs increasing fast

Time to prepare: 1-3 months

#### Scale (100000+ users)

Typical warning signs:
- Already experiencing issues
- Competitor scaling faster
- Market demanding more

Time to prepare: Immediately

---

## Trigger Categories

### User Triggers

- Active users growing 20%+ MoM
- Sign-up spikes from marketing
- Viral coefficient above 1
- Press/influencer mentions

### Technical Triggers

- CPU consistently above 70%
- Database connections near limit
- API response times increasing
- Error rates rising
- Cache hit rate declining

### Business Triggers

- Enterprise deals requiring SLAs
- New market entry
- Pricing tier changes
- Partnership announcements
- Funding milestones

### Competitive Triggers

- Competitor launching new features
- Market shift toward your space
- Industry event/pandemic driving adoption

---

## Decision Framework

### Questions to Ask

1. **What is our growth trajectory?**
   - Linear: Can plan ahead
   - Exponential: Need to prepare for rapid scale

2. **What is our runway?**
   - Time until capacity issues
   - Time until performance degrades

3. **What is the cost of being wrong?**
   - Downtime impact
   - User loss
   - Reputation damage

4. **What can we do now vs. later?**
   - Quick wins: caching, indexing
   - Medium-term: architecture changes
   - Long-term: rebuilds

---

## The 70% Rule

When any metric hits 70% of capacity:

- Start planning
- Identify solutions
- Begin implementation

Waiting until 90% means:
- Crisis mode
- Expensive solutions
- Potential downtime

---

## Preparation Checklist

When you hit triggers:

- [ ] Assess current capacity
- [ ] Define target scale
- [ ] Identify gaps
- [ ] Prioritize fixes
- [ ] Create roadmap
- [ ] Allocate budget
- [ ] Assign ownership
- [ ] Set milestones
- [ ] Monitor progress
