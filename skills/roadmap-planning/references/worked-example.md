# Worked Example: Roadmap Planning

This file shows the Roadmap Planning skill applied to a complete scenario.

---

## Scenario: TaskFlow - Project Management SaaS

**Context:** TaskFlow is a project management tool for creative agencies. The team has prioritized features from feature-prioritization and now needs a roadmap. They have a 3-person development team and want to launch in 3 months.

### Input Available

**From feature-prioritization:**

| Feature | Score | Priority |
|---------|-------|----------|
| User Authentication | 85 | Must |
| Project Creation | 80 | Must |
| Task Management | 78 | Must |
| Team Members | 72 | Must |
| Client Portal | 65 | Should |
| Time Tracking | 55 | Should |
| File Attachments | 45 | Could |
| Reporting | 40 | Could |
| Gantt Charts | 35 | Won't |
| Mobile App | 30 | Won't |

**Team:**
- 3 developers (full-time)
- 1 designer (part-time, 50%)
- All experienced, but new team (no historical velocity)

**Constraints:**
- Want to launch publicly in 3 months
- Must have auth and core task management for launch

---

## Output: Roadmap

# Roadmap: TaskFlow

## 1. Executive Summary

**Overview:** 6-sprint roadmap for TaskFlow launch. MVP includes authentication, project creation, task management, and team features (4 features, ~60 points). Phased approach allows launch at Sprint 4 with core functionality, with remaining features in v1.1.

**Total duration:** 6 sprints (12 weeks)
**Number of phases:** 3
**Key milestones:** MVP Complete (Sprint 2), Beta Ready (Sprint 3), Public Launch (Sprint 4)

---

## 2. Prerequisites Confirmed

| Input | Status | Source |
|-------|--------|--------|
| Prioritized features | ✓ Confirmed | feature-prioritization |
| Team size | ✓ Confirmed | 3 devs, 0.5 designer |
| Timeline constraints | ✓ Confirmed | 3 months to launch |
| Velocity estimate | ⚠ Assumed | New team, 25 pts/sprint estimated |

---

## 3. Capacity Planning

### Team Composition
| Role | Count | Availability |
|------|-------|---------------|
| Developer | 3 | 100% |
| Designer | 1 | 50% |

### Velocity Assumptions
| Metric | Value | Basis |
|--------|-------|-------|
| Sprint velocity | 25 points | New team, conservative |
| Capacity buffer | 40% | Bugs, meetings, unknown |
| Available capacity | 15 points/sprint | 25 × 0.60 |

### Risk Adjustment
- Conservative velocity: 15 points/sprint
- Adjusted capacity: ~60 points over 4 sprints for MVP

---

## 4. Dependencies Map

### Dependency List
| Feature | Depends On | Type | Risk |
|---------|-----------|------|------|
| User Authentication | None | - | Low |
| Project Creation | User Auth | Technical | Medium |
| Task Management | Project Creation | Data | Medium |
| Team Members | User Auth | Technical | Low |
| Client Portal | Project Creation, Task Management | Technical | High |
| Time Tracking | Task Management | Data | Medium |
| File Attachments | Project Creation | Data | Low |
| Reporting | Task Management | Data | Medium |

### Critical Path
- Sequence: Auth → Projects → Tasks → Time Tracking
- Minimum sprints: 3
- Bottleneck: Project Creation (depends on Auth)

### Circular Dependency Check
✓ No circular dependencies found

---

## 5. Timeline

### Visual Timeline

```
        | S1 | S2 | S3 | S4 | S5 | S6 |
        ├────┼────┼────┼────┼────┼────┤
MVP     │████│████│    |    |    |    │
v1.0    │    │    │████│████│    |    │
v1.1    │    │    │    │    │████│████│
        ├────┼────┼────┼────┼────┼────┤
Milestone:    MVP    Beta   Launch
```

### Sprint Breakdown

| Sprint | Phase | Features | Points | Status |
|--------|-------|----------|--------|--------|
| 1 | MVP | Auth | 15 | Planned |
| 2 | MVP | Projects, Team | 20 | Planned |
| 3 | v1.0 | Tasks, Beta Launch | 25 | Planned |
| 4 | v1.0 | Client Portal | 15 | Planned |
| 5 | v1.1 | Time Tracking | 10 | Planned |
| 6 | v1.1 | Reporting, Polish | 15 | Planned |

---

## 6. Phases

### Phase 1: MVP

**Duration:** Sprints 1-2 (4 weeks)
**Total Points:** 35 points

**Features:**

| Feature | Points | Dependencies |
|---------|--------|--------------|
| User Authentication | 15 | None |
| Project Creation | 12 | Auth |
| Team Members | 8 | Auth |

**Entry Criteria:**
- [ ] Tech stack selected and configured
- [ ] Database schema designed
- [ ] Design mockups for auth, projects, team

**Exit Criteria:**
- [ ] Users can sign up, log in, log out
- [ ] Users can create projects
- [ ] Users can invite team members to projects
- [ ] Basic unit tests passing

**Go/No-Go Decision:**
- [ ] Ship if Auth + Projects + Team features complete (25+ points)
- [ ] Delay if Auth incomplete (critical path)

---

### Phase 2: v1.0 - Launch Release

**Duration:** Sprints 3-4 (4 weeks)
**Total Points:** 40 points

**Features:**

| Feature | Points | Dependencies |
|---------|--------|--------------|
| Task Management | 20 | Project Creation |
| Client Portal | 15 | Project, Tasks |
| File Attachments | 5 | Project |

**Entry Criteria:**
- [ ] MVP features stable in staging
- [ ] Performance < 2s page load
- [ ] Basic security review passed

**Exit Criteria:**
- [ ] Task CRUD complete with subtasks
- [ ] Clients can view projects (read-only)
- [ ] Files can be attached to tasks
- [ ] No critical bugs

**Go/No-Go Decision:**
- [ ] Ship if Task Management + Client Portal complete
- [ ] Delay if Task Management incomplete

---

### Phase 3: v1.1 - Enhancement Release

**Duration:** Sprints 5-6 (4 weeks)
**Total Points:** 25 points

**Features:**

| Feature | Points | Dependencies |
|---------|--------|--------------|
| Time Tracking | 10 | Task Management |
| Reporting | 8 | Tasks |
| Polish/Refactor | 7 | All |

**Entry Criteria:**
- [ ] v1.0 live and stable
- [ ] User feedback collected

**Exit Criteria:**
- [ ] Time tracking functional
- [ ] Basic reports available
- [ ] Performance optimized

---

## 7. Milestones

### Feature Milestones
| Milestone | Sprint | Date | Criteria | Owner |
|-----------|--------|------|----------|-------|
| MVP Core Ready | 2 | Week 4 | Auth + Projects + Team working | Dev Lead |
| Beta Launch | 3 | Week 6 | 10 beta users onboarded | PM |
| Feature Complete | 4 | Week 8 | All v1.0 features done | Dev Lead |

### Business Milestones
| Milestone | Sprint | Date | Criteria | Owner |
|-----------|--------|------|----------|-------|
| Public Launch | 4 | Week 8 | Marketing ready, press list prepared | Marketing |
| GA Release | 6 | Week 12 | v1.1 live, no critical bugs | Dev |

### Technical Milestones
| Milestone | Sprint | Date | Criteria | Owner |
|-----------|--------|------|----------|-------|
| Staging Ready | 1 | Week 2 | Infrastructure deployed | DevOps |
| Security Review | 2 | Week 4 | Auth security verified | Dev |
| Load Testing | 3 | Week 6 | 500 rps sustained | QA |

---

## 8. Risks

### Phase 1 Risks
| Risk | Likelihood | Impact | Mitigation | Contingency |
|------|------------|--------|-------------|-------------|
| Auth takes longer than estimated | Medium | High | Use auth library (Auth0) | Reduce team features scope |
| Designer unavailable | Low | Medium | Prioritize core UX | Use simpler UI patterns |

### Phase 2 Risks
| Risk | Likelihood | Impact | Mitigation | Contingency |
|------|------------|--------|-------------|-------------|
| Client portal dependencies block | High | High | Build client portal after tasks | Defer to v1.1 |
| Third-party integrations fail | Low | Medium | Build fallbacks | Manual workaround |

### Phase 3 Risks
| Risk | Likelihood | Impact | Mitigation | Contingency |
|------|------------|--------|-------------|-------------|
| v1.0 issues consume v1.1 time | Medium | Medium | Bug-fix time box | Defer reporting to v1.2 |

---

## 9. Cut List

### Priority 1: Cut First (if any delay)
| Feature | Points | Reason | Impact |
|---------|--------|--------|--------|
| File Attachments | 5 | Nice-to-have | Low - use links instead |

### Priority 2: Cut Second (if significant delay)
| Feature | Points | Reason | Impact |
|---------|--------|--------|--------|
| Client Portal | 15 | Secondary revenue | Medium - launch without it |

### Priority 3: Cut Never (unless critical)
| Feature | Points | Reason |
|---------|--------|--------|
| User Authentication | 15 | Required for any launch |
| Project Creation | 12 | Core value |
| Task Management | 20 | Core value |
| Team Members | 8 | Required for teams |

### Cut Decision Triggers
- [x] Velocity < 8 points for 2 consecutive sprints → Trigger cut review
- [x] External deadline at risk (Week 8) → Prioritize launch features
- [x] Key developer unavailable → Reduce scope to MVP only

---

## 10. Assumptions

| Assumption | Confidence | Impact if Wrong |
|------------|------------|-----------------|
| Team velocity = 15 pts/sprint | Medium | Timeline 30% longer |
| Auth using Auth0 = 15 points | Medium | +5 points if custom |
| Client portal = 15 points | Low | Could be 20+ points |
| Designer available 50% | High | Per agreement |

---

## 11. Recommendations

### Roadmap Health
- [✓] Achievable: Yes, with conservative velocity
- [✓] Buffer adequate: 25% buffer built in
- [✓] Dependencies clear: Critical path identified

### Suggested Adjustments

1. **Consider parallel work:** In Sprint 1, designer could start on v1.0 mockups while devs build auth. Reduces Phase 2 design bottleneck.

2. **Early client portal probe:** Client portal is high-risk (dependencies). Start investigating in Sprint 2 even if not building. Reduces Phase 2 surprise.

3. **Consider 1-week buffer:** If timeline slips, Sprint 5 is already light. Better to have buffer than need it.

---

**End of Worked Example**
