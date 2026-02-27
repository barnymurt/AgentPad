# Release Management Output Schema

This defines the structure of release management output.

## Output Structure

```
RELEASE OVERVIEW

Version: [X.Y.Z]
Release Type: Major/Minor/Patch
Release Date: [Date]
Risk Level: [Low/Medium/High]

Summary: [2-3 sentences on what's in this release]

---

FEATURES IN RELEASE

Feature 1: [Name]
Description: [What it does]
Owner: [Who built it]
Testing Status: [Pass/Fail]
Risk: [Low/Medium/High]

Feature 2: ...

---

CHANGELOG

ADDED

- [New feature 1]
- [New feature 2]

CHANGED

- [Changed feature 1]
- [Changed feature 2]

FIXED

- [Fixed issue 1]
- [Fixed issue 2]

REMOVED

- [Deprecated feature 1]
- [Removed feature 2]

---

KNOWN ISSUES

Issue 1: [Description]
Workaround: [If available]
Severity: [Critical/Major/Minor]
Planned Fix: [When]

Issue 2: ...

---

DEPLOYMENT CHECKLIST

Pre-Deployment:
[ ] Backup created
[ ] Tests passing
[ ] Code reviewed
[ ] Rollback plan ready

Deployment:
[ ] Deploy to [environment]
[ ] Verify health checks
[ ] Run smoke tests
[ ] Monitor metrics

Post-Deployment:
[ ] Verify all systems operational
[ ] Check error rates
[ ] Monitor support channels
[ ] Confirm with stakeholders

---

ROLLBACK PLAN

Conditions for Rollback:
- Error rate exceeds [X]%
- Response time exceeds [Y]ms
- Critical functionality unavailable

Rollback Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Estimated Time: [X minutes]

Escalation Contact: [Name/Channel]

---

AI-TO-HUMAN COMMUNICATION

Release Decision: [Auto-release / Requires approval]

Summary for Humans:
[2-3 sentences on what's happening]

Risk Level: [Low/Medium/High]

Required Human Actions:
- [ ] Review and approve release
- [ ] Monitor for issues
- [ ] [Other actions]

Communication After Release:
- Success: Notify stakeholders
- Issue: Alert immediately with recommendation

---

NOTES

[Assumptions]
[Open questions]
[Known risks]
```

## Quality Guidelines

- Be specific about versions and features
- Include actionable checklists
- Make rollback clear and testable
- Communicate risk appropriately
- Ensure humans have what they need to decide
