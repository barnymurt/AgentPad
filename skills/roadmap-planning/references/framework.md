# Framework: Roadmap Planning

This file provides detailed methodology for creating practical, achievable product roadmaps.

## 1. Dependency Analysis

### Types of Dependencies

| Type | Description | Example |
|------|-------------|---------|
| **Technical** | One feature requires another technically | User auth before user profiles |
| **UX/UI** | Related to design patterns | Dashboard before analytics |
| **Data** | Requires data from another feature | Reports before data entry |
| **Business** | Must have for business reasons | Payment before premium features |
| **External** | Third-party or outside team | API integration, design assets |

### Dependency Mapping

Create a dependency matrix:

```
Feature        | A | B | C | D | E |
Depends on:    |   |   |   |   |   |
A              | - | ✓ | ✓ |   |   |
B              | - | - |   | ✓ |   |
C              | - | - | - |   | ✓ |
D              | - | - | - | - |   |
E              | - | - | - | - | -
```

### Dependency Validation Rules

1. **No circular dependencies** — If A→B→C→A, break the chain
2. **Short chains preferred** — Long chains increase risk
3. **Identify critical path** — Longest dependency chain determines minimum time
4. **Parallelize where possible** — Independent features can run concurrently

---

## 2. Capacity Planning

### Velocity Calculation

**For established teams:**
```
Velocity = Average story points completed per sprint
           (over last 3-6 sprints)
```

**For new teams:**
```
Estimated Velocity = 20-30 points per developer per sprint

Example: 3 developers × 25 points = 75 points/sprint
```

### Capacity Formula

```
Capacity = (Team Velocity) × (Number of Sprints) × (Load Factor)

Where:
- Load Factor = 0.7-0.8 (accounts for bugs, meetings, etc.)

Example: 75 points × 4 sprints × 0.75 = 225 points
```

### Buffer Allocation

| Category | Typical Buffer |
|----------|----------------|
| Bugs and tech debt | 20-25% |
| Meetings and ceremonies | 10-15% |
| Unplanned work | 10-15% |
| **Total Buffer** | **40-50%** |

---

## 3. Phase Definitions

### MVP (Minimum Viable Product)

**Purpose:** Deliver core value with minimum feature set

**Characteristics:**
- Must solve the core problem
- Can launch with reduced UX polish
- No nice-to-have features
- 1-3 months typical

**Entry Criteria:**
- Core features designed
- Tech stack selected
- Team capacity known

**Exit Criteria:**
- Core features complete
- Basic testing passed
- Can demonstrate value

### v1.0 (First Release)

**Purpose:** Production-ready launch

**Characteristics:**
- Launch-quality UX
- Essential polish
- Core integrations
- 2-4 months typical

**Entry Criteria:**
- MVP complete
- Performance acceptable
- Security basics in place

**Exit Criteria:**
- All v1.0 features complete
- No critical bugs
- Launch checklist passed

### v1.1+ (Incremental Releases)

**Purpose:** Iteration based on feedback

**Characteristics:**
- Smaller scope
- Faster cycles
- Feedback-driven
- 1-2 months typical

---

## 4. Milestone Types

### Feature Milestones

| Milestone | Description | Example |
|-----------|-------------|---------|
| **MVP Complete** | Core feature set ready | "5 core features working" |
| **Beta Ready** | Internal/external testing | "20 beta users" |
| **Feature Complete** | All features done | "All planned features shipped" |

### Business Milestones

| Milestone | Description | Example |
|-----------|-------------|---------|
| **Launch** | Public availability | "Open for signups" |
| **GA (General Availability)** | Full production | "No longer beta" |
| **Enterprise Ready** | Enterprise features | "SSO, SLA, support" |

### Technical Milestones

| Milestone | Description | Example |
|-----------|-------------|---------|
| **Infra Ready** | Systems operational | "AWS infrastructure live" |
| **Performance Ready** | Load testing passed | "Handles 1000 rps" |
| **Security Ready** | Security review passed | "Pen test complete" |

---

## 5. Risk Assessment Framework

### Risk Categories

| Risk | Description | Mitigation |
|------|-------------|------------|
| **Technical** | Complex implementation | Spike/proof of concept first |
| **Dependencies** | External blockers | Buffer, alternative identified |
| **Capacity** | Team availability | Cut list, timeline adjustment |
| **Scope** | Requirements unclear | Definition of done, clarification |
| **External** | Third-party delays | Early engagement, fallback |

### Risk Assessment Matrix

```
                    LOW IMPACT         HIGH IMPACT
                 
HIGH PROBABILITY  │   Monitor         │  Mitigate      
                  │   (accept)        │  (action now)   
                  ├───────────────────┼─────────────────
LOW PROBABILITY   │   Accept         │  Contingency    
                  │   (ignore)       │  (plan B ready) 
```

### Phase Risk Checklist

For each phase, document:
- [ ] What could delay this phase?
- [ ] What's the likelihood?
- [ ] What's the impact?
- [ ] What's the mitigation?
- [ ] What's the contingency (plan B)?

---

## 6. Cut List Strategy

### How to Identify Cut Candidates

1. **Nice-to-have features** — Not core to value proposition
2. **Complexity vs. value** — High effort, low impact
3. **Dependencies** — Features that block others are higher priority
4. **Replacements** — Features with workarounds

### Cut Priority

| Priority | Type | Cut When |
|----------|------|----------|
| **First** | Nice-to-have | Any delay |
| **Second** | Enhancement | Behind schedule |
| **Third** | Secondary feature | Significant delay |
| **Never** | Core feature | MVP incomplete |

### Cut Decision Framework

**Trigger:** What signals we need to cut?
- Sprint 2 velocity < 50% of planned
- External deadline at risk
- Key dependency delayed

**Process:**
1. Review cut list
2. Assess impact of each cut
3. Get stakeholder alignment
4. Communicate change
5. Adjust remaining plan

---

## 7. Timeline Visualization

### Gantt-Style View

```
        | S1 | S2 | S3 | S4 | S5 | S6 |
        ├────┼────┼────┼────┼────┼────┤
MVP     |████│████│    |    |    |    |
v1.0    |    │    │████│████│    |    │
v1.1    |    |    |    │    │████│████│
        ├────┼────┼────┼────┼────┼────┤
Milestone:    MVP     Launch      GA
```

### Milestone Cards

```
┌─────────────────────────────────────┐
│ MILESTONE: MVP Complete             │
│ Sprint: 2                          │
│ Date: March 15                     │
│ Criteria:                           │
│ ✓ Auth, Projects, Tasks,           │
│   Assignments complete              │
│ ✓ Basic testing passed             │
└─────────────────────────────────────┘
```

---

## 8. Roadmap Review Cadence

### Weekly

- Progress vs. plan
- Blockers and risks
- Upcoming dependencies

### Sprint Boundary

- Velocity actual vs. planned
- Rollover items
- Cut list review

### Monthly

- Roadmap validity
- Re-prioritization if needed
- Stakeholder alignment

---

## 9. Integration with Other Skills

### Inputs (Consults)

- **feature-prioritization:** Prioritized feature list with scores
- **architecture-design:** Technical dependencies, constraints
- **stakeholder-analysis:** Business priorities, timeline constraints
- **user-story-generation:** Story counts for capacity planning

### Outputs (Feeds)

- **development-team:** Implementation schedule
- **stakeholders:** Roadmap visibility, timeline commitments
- **business-case-modeling:** Timeline for projections
