# Launch Planning Worked Example

## Context

**Product:** TaskFlow — Project management tool for creative agencies
**Product description:** All-in-one project management for creative teams with time tracking, client portals, and invoicing
**Launch type:** Full public launch
**Target date:** 3 months from now
**Team:** 5 people (2 founders, 1 developer, 1 designer, 1 marketing)

---

## Step 1: Assess Launch Context

### Product Definition
- TaskFlow is a project management SaaS for creative agencies (design studios, video production, marketing teams)
- Core problem: Creative teams struggle with scope creep, missed deadlines, and administrative burden
- Key differentiator: Built specifically for creative workflows with time tracking and client invoicing built-in

### Team Context
- Development stage: MVP nearly complete, final QA in progress
- Launch experience: First launch for the team
- Budget: Limited marketing budget ($5K for launch)
- Timeline constraint: Need to launch before next funding round (3 months)

---

## Step 2: Define Launch Phases

### Pre-Launch (8 weeks before)
- Final QA and bug fixing (weeks 1-4)
- Marketing asset creation (weeks 3-6)
- Content and documentation (weeks 4-6)
- Internal enablement (week 5)
- Beta testing with 5 agencies (weeks 4-7)
- List building — signup page, waitlist (ongoing)

### Launch Week
- Deploy MVP (Day 0)
- Announcement: Product Hunt, Twitter, email to network (Day 1)
- Outreach to 20 industry influencers (Days 1-3)
- Support on standby (Days 1-7)
- Monitor metrics and fix critical bugs (Days 1-7)

### Post-Launch (4 weeks after)
- User feedback collection via Intercom
- Weekly blog posts about new features
- Case study development
- Community engagement (Slack, Twitter)
- Performance review at week 2 and week 4

### Stabilization (Months 2-3)
- Bug fixes and performance improvements
- Feature iterations based on feedback
- Plan for v1.1 launch
- Begin planning paid acquisition test

---

## Step 3: Milestones and Owners

| Milestone | Phase | Owner | Deadline | Dependencies |
|-----------|-------|-------|----------|--------------|
| MVP feature freeze | Pre-launch | Founder (PM) | Week 1 | - |
| Beta launch | Pre-launch | Developer | Week 4 | MVP freeze |
| Beta feedback synthesis | Pre-launch | Designer | Week 7 | Beta complete |
| Marketing assets complete | Pre-launch | Founder (Marketing) | Week 6 | Beta feedback |
| Press list finalized | Pre-launch | Founder (Marketing) | Week 5 | - |
| Go/no-go decision | Pre-launch | Both Founders | Week 7 | All criteria |
| Production deployment | Launch | Developer | Day 0 | Go decision |
| Product Hunt launch | Launch | Founder (Marketing) | Day 1 | Deployment |
| Email campaign sent | Launch | Founder (Marketing) | Day 1 | - |
| First 100 users | Post-launch | Both | Week 1 | Launch |
| First paying customer | Post-launch | Both | Week 2 | First 100 |

---

## Step 4: Go/No-Go Criteria

| Criterion | Category | Owner | Must Have? | Status |
|-----------|----------|-------|------------|--------|
| Critical bugs < 5 | Product | Developer | Yes | - |
| Performance < 3s load | Product | Developer | Yes | - |
| Time tracking working | Product | Developer | Yes | - |
| Invoicing working | Product | Developer | Yes | - |
| Landing page live | Marketing | Founder (Marketing) | Yes | - |
| Email sequence ready | Marketing | Founder (Marketing) | Yes | - |
| Press list 20+ contacts | Marketing | Founder (Marketing) | No | - |
| Legal/TOS ready | Legal | Founder (PM) | Yes | - |
| Support process defined | Support | Designer | Yes | - |
| Analytics setup | Technical | Developer | Yes | - |

---

## Step 5: Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| MVP not ready on time | Medium | Critical | Prioritize ruthlessly, cut features | Founder (PM) |
| Beta feedback reveals major issues | Medium | Major | Buffer 2 weeks for fixes | Developer |
| Low launch turnout | Medium | Major | Personal outreach to network, Product Hunt prep | Founder (Marketing) |
| Payment integration fails | Low | Critical | Test extensively, have manual backup | Developer |
| Competitor announces similar product | Low | Major | Focus on differentiation, speed to market | Both |

---

## Step 6: Communication Plan

### Internal Communication
- **Daily standups** (launch week): 15-min sync on Slack
- **Weekly reviews** (pre-launch): Full team, 1 hour
- **Launch day**: Hourly updates in #launch channel
- **Post-launch debrief**: Week 1 and Week 4

### External Communication
| Channel | Timing | Content |
|---------|--------|---------|
| Product Hunt | Day 1 | Launch post with screenshots |
| Twitter | Day 0-7 | Daily tweets, thread |
| Email | Day 1 | To warm contacts (500 contacts) |
| Blog | Day 1 | Launch announcement |
| Indie Hackers | Day 1 | Show + case study |

---

## Step 7: Contingency Plans

### Scenario: Launch Delayed

**Trigger:** Go/no-go criteria not met at week 7

**Response:**
1. Identify specific blockers
2. Estimate delay (1-2 weeks expected)
3. Communicate to network: "Launching week of [new date]"
4. Reschedule Product Hunt
5. Use extra time for QA and content

### Scenario: Low Signups After Launch

**Trigger:** < 50 signups in first week

**Response:**
1. Personal outreach to warm contacts
2. Offer early access to network
3. Fix any onboarding issues
4. Increase content marketing
5. Consider Product Hunt re-launch with v1.1

---

## Summary

This launch plan provides a realistic 3-month timeline for TaskFlow's launch. Key decisions:

1. **Beta testing** — Critical for finding issues before launch
2. **Conservative timeline** — 8 weeks pre-launch allows for unexpected delays
3. **Limited paid marketing** — Focusing on Product Hunt and network for launch
4. **Clear go/no-go criteria** — Ensures we don't ship broken product
5. **Contingency plans** — Prepared for common failure modes
