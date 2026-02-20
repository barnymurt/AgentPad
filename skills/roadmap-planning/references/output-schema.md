# Output Schema: Roadmap Planning

This file defines the exact structure of the Roadmap Planning skill output.

## Data Contracts

### Consumes

This skill consumes output from:
- **feature-prioritization:** `context.features[].score`, `context.features[].priority`
- **architecture-design:** `context.dependencies[]`, `context.technical_constraints`
- **stakeholder-analysis:** `context.stakeholders[].priorities`, `context.timeline_constraints`
- **user-story-generation:** `context.stories[].effort` (for capacity planning)

### Produces

This skill produces:
- `context.roadmap.phases[]` — Phased release structure
- `context.roadmap.timeline` — Visual timeline representation
- `context.roadmap.milestones[]` — Milestones with criteria
- `context.roadmap.risks[]` — Risk assessments per phase
- `context.roadmap.cut_list[]` — Features to cut if behind

---

## Output Structure

```
# Roadmap: [Product Name]

## 1. Executive Summary (required)

- Roadmap overview: [2-3 sentences]
- Total duration: [X sprints / Y months]
- Number of phases: [X]
- Key milestones: [List]

## 2. Prerequisites Confirmed (required)

| Input | Status | Source |
|-------|--------|--------|
| Prioritized features | ✓ Confirmed | feature-prioritization |
| Team size | ✓ Confirmed | [X] devs, [Y] designers |
| Timeline constraints | ✓ Confirmed / ⚠ Missing | User provided |
| Velocity estimate | ✓ Confirmed / ⚠ Assumed | Historical / Rule of thumb |

## 3. Capacity Planning (required)

### Team Composition
| Role | Count | Availability |
|------|-------|---------------|
| Developer | X | X% |
| Designer | Y | Y% |
| Other | Z | Z% |

### Velocity Assumptions
| Metric | Value | Basis |
|--------|-------|-------|
| Sprint velocity | [X] points | [Historical / Estimated] |
| Capacity buffer | [X]% | [Bugs / Meetings / Buffer] |
| Available capacity | [X] points | Per sprint |

### Risk Adjustment
- Conservative velocity: [X] points (30% reduction)
- Adjusted capacity: [X] points/sprint

## 4. Dependencies Map (required)

### Dependency List
| Feature | Depends On | Type | Risk |
|---------|-----------|------|------|
| Feature A | None | - | Low |
| Feature B | Feature A | Technical | Medium |
| Feature C | Feature B | UX | Low |
| Feature D | None | - | Low |
| Feature E | Feature D | Data | Medium |

### Critical Path
- Sequence: [A → B → C]
- Minimum sprints: [X]
- Bottleneck: [Feature name]

### Circular Dependency Check
- ✓ No circular dependencies found
- OR: [Description of circular dependency and resolution]

## 5. Timeline (required)

### Visual Timeline
```
        | S1 | S2 | S3 | S4 | S5 | S6 |
        ├────┼────┼────┼────┼────┼────┤
Phase 1 │████│████│    |    |    |    │
Phase 2 │    │    │████│████│    |    │
Phase 3 │    │    │    │    │████│████│
```

### Sprint Breakdown
| Sprint | Phase | Features | Points | Status |
|--------|-------|----------|--------|--------|
| 1 | Phase 1 | A, B | 20 | Planned |
| 2 | Phase 1 | C, D | 25 | Planned |

## 6. Phases (required)

### Phase 1: [Phase Name - e.g., MVP]

**Duration:** Sprints [X-Y] ([Z] weeks)
**Total Points:** [X] points

**Features:**
| Feature | Points | Dependencies |
|---------|--------|--------------|
| Feature A | 10 | None |
| Feature B | 15 | A |

**Entry Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

**Exit Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

**Go/No-Go Decision:**
- [ ] [Condition to ship]
- [ ] [Condition to delay]

### Phase 2: [Phase Name]
[Same structure]

### Phase 3: [Phase Name]
[Same structure]

## 7. Milestones (required)

### Feature Milestones
| Milestone | Sprint | Date | Criteria | Owner |
|-----------|--------|------|----------|-------|
| MVP Complete | 2 | March 15 | All MVP features done | Dev Lead |
| Beta Ready | 3 | April 1 | 20 beta users | PM |

### Business Milestones
| Milestone | Sprint | Date | Criteria | Owner |
|-----------|--------|------|----------|-------|
| Public Launch | 4 | April 30 | Marketing ready | Marketing |
| GA Release | 6 | June 1 | No critical bugs | Dev |

### Technical Milestones
| Milestone | Sprint | Date | Criteria | Owner |
|-----------|--------|------|----------|-------|
| Infra Ready | 1 | Feb 28 | AWS live | DevOps |
| Performance OK | 3 | April 1 | Load test passed | QA |

## 8. Risks (required)

### Phase 1 Risks
| Risk | Likelihood | Impact | Mitigation | Contingency |
|------|------------|--------|-------------|-------------|
| Feature B takes longer | Medium | High | Spike first | Cut Feature C |

### Phase 2 Risks
| Risk | Likelihood | Impact | Mitigation | Contingency |
|------|------------|--------|-------------|-------------|
| [Risk] | [Low/Med/High] | [Low/Med/High] | [Plan A] | [Plan B] |

## 9. Cut List (required)

### Priority 1: Cut First (if any delay)
| Feature | Points | Reason | Impact |
|---------|--------|--------|--------|
| Feature C | 5 | Nice-to-have | Low |

### Priority 2: Cut Second (if significant delay)
| Feature | Points | Reason | Impact |
|---------|--------|--------|--------|
| Feature D | 8 | Enhancement | Medium |

### Priority 3: Cut Never (unless critical)
| Feature | Points | Reason |
|---------|--------|--------|
| Core Feature | 15 | MVP required |

### Cut Decision Triggers
- [ ] Velocity < 50% of planned for 2 sprints
- [ ] External deadline at risk
- [ ] Key dependency blocked

## 10. Assumptions (required)

| Assumption | Confidence | Impact if Wrong |
|------------|------------|-----------------|
| Team velocity = 25 pts/sprint | Medium | Timeline off by 30% |
| Feature B = 10 points | Low | Capacity misaligned |
| External API ready by Sprint 2 | Medium | Phase 2 delayed |

## 11. Recommendations (required)

### Roadmap Health
- [ ] Achievable: Yes / No
- [ ] Buffer adequate: Yes / No
- [ ] Dependencies clear: Yes / No

### Suggested Adjustments
1. [Recommendation 1]
2. [Recommendation 2]

---

## Validation Rules

1. Minimum 3 features in roadmap
2. Dependencies mapped and validated (no circular)
3. Each phase has entry, exit, and go/no-go criteria
4. At least one milestone per phase
5. Cut list has minimum 2 items identified
6. Phase risks identified with mitigation
7. Capacity calculations shown with buffer
8. Timeline accounts for all phases
9. Recommendations grounded in analysis

## Confidence Tagging

- **High:** Historical velocity known, dependencies confirmed, scope clear
- **Medium:** Estimated velocity, some dependencies known
- **Low:** New team, dependencies uncertain, scope unclear

Apply confidence to timeline estimates and capacity calculations.
