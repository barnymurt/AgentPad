# Output Schema: Requirements Elicitation

This file defines the exact structure of the Requirements Elicitation skill output.

## Output Structure

```
# Requirements Document: [Feature / Product Name]

## 1. Context

### Problem Statement (required)
- Problem (required): What problem this solves, in 2-3 sentences
- Current solution (required): How users solve this today
- Target users (required): Primary and secondary user roles with descriptions

### Scope (required)
- In scope (required): What this version covers
- Out of scope (required): What is explicitly excluded (and why)
- Constraints (required): Technology, timeline, budget, or regulatory limits

## 2. Functional Requirements

### [Feature Area 1]

#### FR-001: [Requirement Title]
- User story (required): As a [role], I want to [action] so that [benefit]
- Priority (required): Must / Should / Could / Won't
- Acceptance criteria (required, minimum 2):
  - Given [context], When [action], Then [result]
  - Given [context], When [action], Then [result]
- Edge cases (required, minimum 1):
  - [Edge case description and expected behavior]
- Dependencies (conditional): Other requirements that must be built first
- Notes (conditional): Additional context or design considerations

[Repeat for each functional requirement]

### [Feature Area 2]
[Same structure]

## 3. Non-Functional Requirements

### NFR-001: Performance
- Requirement (required): Specific, measurable performance target
- Metric (required): How to measure compliance
- Priority (required): Must / Should / Could

### NFR-002: Security
- Requirement (required): Authentication, authorization, encryption, compliance
- Standard (conditional): Reference standard (e.g., OWASP, SOC 2, GDPR)
- Priority (required)

### NFR-003: Scalability
- Requirement (required): Growth expectations and scaling needs
- Metric (required): User count, data volume, request volume targets
- Priority (required)

### NFR-004: Reliability
- Requirement (required): Uptime, recovery, error handling targets
- Metric (required): SLA, RPO, RTO
- Priority (required)

### NFR-005: Usability
- Requirement (required): Accessibility, device support, onboarding
- Standard (conditional): WCAG level, supported browsers
- Priority (required)

[Additional NFRs as applicable]

## 4. Dependencies and Assumptions

### Dependencies (required)
| ID | Dependency | Type | Impact if Unavailable |
|----|-----------|------|----------------------|
| D1 | [dependency] | Internal/External/Third-party | [impact] |

### Assumptions (required)
| ID | Assumption | Confidence | Risk if Wrong |
|----|-----------|------------|---------------|
| A1 | [assumption] | H/M/L | [consequence] |

### Integration Points (conditional)
| System | Integration Type | Data Flow | Requirements |
|--------|-----------------|-----------|-------------|
| [system] | API/Webhook/File/Manual | In/Out/Bidirectional | [specific requirements] |

## 5. Priority Matrix

### Must Have (required, at least 1)
| ID | Requirement | Rationale |
|----|------------|-----------|

### Should Have (required if any exist)
| ID | Requirement | Rationale |

### Could Have (conditional)
| ID | Requirement | Rationale |

### Won't Have This Version (required, at least 1 — demonstrates scope discipline)
| ID | Requirement | Why Deferred |

### Priority Distribution (required)
- Must: X% of requirements
- Should: X%
- Could: X%
- Assessment: [Is the distribution healthy? If >80% Must, flag scope risk]

## 6. Open Questions (required)

| # | Question | Impact | Needed By | Suggested Default |
|---|---------|--------|-----------|-------------------|
| Q1 | [unresolved question] | [which requirements it affects] | [when an answer is needed] | [reasonable default if one exists] |

Open questions must NOT be silently resolved — they are flagged for user decision.
```

## Validation Rules

1. Every functional requirement has a user story AND at least 2 acceptance criteria
2. Every acceptance criteria follows Given/When/Then format
3. Every functional requirement has at least 1 edge case identified
4. MoSCoW priority assigned to every requirement (functional and non-functional)
5. Non-functional requirements have measurable targets (not "fast" but "< 2 seconds")
6. At least 1 item in "Won't have" (proves scope discipline)
7. Open questions section exists and is not empty (if no questions, state "All questions resolved during elicitation" — but this is rare)
8. Assumptions are listed with confidence and risk

## Confidence Tagging

- **High [H]:** User explicitly stated this requirement or confirmed it during elicitation
- **Medium [M]:** Inferred from user's context, follows standard patterns, reasonable default
- **Low [L]:** Assumption made to complete the requirement — needs user validation before development

Requirements with Low confidence should be flagged in the Open Questions section.
