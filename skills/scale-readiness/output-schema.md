# Scale Readiness Output Schema

This defines the structure of scale readiness output.

## Output Structure

```
SCALE READINESS ASSESSMENT

Assessment Date: [Date]
Target Horizon: [Timeline to scale]

---

CURRENT STATE

Users: [Current number]
Monthly Active: [Number]
Data Volume: [Size]
API Requests/Month: [Number]
Infrastructure Spend: $[Amount]

---

TARGET STATE

Target Users: [Number]
Target Timeline: [Months]
Growth Multiple: [e.g., 10x]

---

ASSESSMENT RESULTS

1. TECHNICAL READINESS

Status: [Ready/Partial/Not Ready]

What's Ready:
- [List what's working]

What's Not Ready:
- [List gaps]

Details:
- Architecture: [Status]
- Database: [Status]
- Caching: [Status]
- API: [Status]

---

2. INFRASTRUCTURE READINESS

Status: [Ready/Partial/Not Ready]

What's Ready:
- [List what's working]

What's Not Ready:
- [List gaps]

Details:
- Cloud capacity: [Status]
- CDN: [Status]
- Backups: [Status]
- Regions: [Status]

---

3. PROCESS READINESS

Status: [Ready/Partial/Not Ready]

What's Ready:
- [List what's working]

What's Not Ready:
- [List gaps]

Details:
- Deployment: [Status]
- Incidents: [Status]
- Documentation: [Status]
- Onboarding: [Status]

---

4. TEAM READINESS

Status: [Ready/Partial/Not Ready]

What's Ready:
- [List what's working]

What's Not Ready:
- [List gaps]

Details:
- Expertise: [Status]
- On-call: [Status]
- Debug ability: [Status]
- Capacity: [Status]

---

GAP ANALYSIS

Gap 1: [Description]
Impact: [What happens if not addressed]
Priority: [High/Medium/Low]
Effort: [Small/Medium/Large]
Solution: [How to address]

Gap 2: ...

---

SCALING ROADMAP

Phase 1: Immediate (Next 30 days)
Items:
- [Action item]
Owner: [Who]
Timeline: [When]

Phase 2: Short-term (1-3 months)
Items:
- [Action item]
Owner: ...
Timeline: ...

Phase 3: Medium-term (3-6 months)
Items:
- [Action item]
Owner: ...
Timeline: ...

---

COST CONSIDERATIONS

Preparation Investment: $[Estimate]
Reactive Cost Risk: $[If not prepared]
Recommendation: [Invest now/Wait/Monitor]

---

REAL-WORLD EXAMPLE

Company: [Name]
Situation: [Context]
What happened: [Scaling story]
Lesson: [What we can learn]

---

NOTES

[Assumptions]
[Open questions]
[Risks to monitor]
```

## Quality Guidelines

- Be specific about numbers
- Prioritize gaps realistically
- Make roadmap actionable
- Include cost estimates
