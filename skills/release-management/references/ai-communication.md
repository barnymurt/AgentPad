# AI-to-Human Communication Guide

## Why AI Must Communicate with Humans

AI agents can execute releases, but humans must:
- Approve significant decisions
- Understand what's happening
- Take action when needed
- Maintain control and accountability

---

## Communication Triggers

### Always Communicate (No Auto-Release)

These require human approval:

- **Major version releases** (2.0.0, etc.)
- **Breaking changes**
- **Database migrations**
- **New integrations**
- **Security-related changes**
- **Any rollback**

### Can Auto-Communicate After

These can auto-release but must notify:

- **Patch releases** (bug fixes)
- **Minor features** (low risk)
- **Documentation changes**
- **UI improvements** (non-breaking)

---

## Communication Format

### For Approval Requests

```
RELEASE APPROVAL REQUEST

Version: 1.2.0
Type: Minor release
Risk: Medium

What's New:
- Feature A: Description
- Feature B: Description

Testing Status:
- Automated tests: Passed
- Manual testing: Passed
- Staging: Verified

Changes from Previous:
- 3 new features
- 2 bug fixes
- No breaking changes

Rollback Plan:
- Steps documented
- Tested: Yes/No

Human Decision Required:
- [ ] Approve release
- [ ] Request changes
- [ ] Need more information

Response by: [Date/Time]
```

### For Notifications (Post-Release)

```
RELEASE COMPLETED

Version: 1.2.0
Released: [Date Time]
Risk Level: Low

Summary:
- 3 new features deployed
- 2 bugs fixed
- No issues detected

Monitoring:
- Error rate: 0.1% (normal)
- Response time: 200ms (normal)
- No support tickets

If issues occur:
- Contact: [Name/Channel]
- Rollback available: Yes
- Expected resolution: [Time]

Next Release Planned: [Date]
```

### For Rollback Requests

```
ROLLBACK RECOMMENDED

Issue: [Description]
Severity: Critical/High/Medium
Impact: [What's affected]

Current Status:
- Error rate: X%
- Users affected: Y
- Revenue impact: Z

Recommendation: Rollback to v1.1.0

Rollback will:
- Restore previous version
- Disable new features
- Take approximately X minutes

Human Approval Required:
- [ ] Approve rollback
- [ ] Investigate instead
- [ ] Need more information

Decision needed by: [Time]
```

---

## Risk Level Classification

### Low Risk

- Patch releases
- Documentation changes
- UI/text changes
- Minor bug fixes

**AI Action:** Auto-release + notify

### Medium Risk

- New minor features
- Non-critical improvements
- Performance optimizations

**AI Action:** Request approval + notify after

### High Risk

- Major releases
- Breaking changes
- Database changes
- Security updates

**AI Action:** Require explicit approval + continuous updates

---

## What Humans Need to Know

### Before Release

1. What's changing
2. What's the risk
3. What's the rollback plan
4. How to approve

### During Release

1. Progress status
2. Any issues
3. Expected completion

### After Release

1. Success/failure
2. Any issues found
3. What to monitor
4. Who to contact

---

## Escalation Path

### Level 1: Automated

AI handles:
- Release execution
- Monitoring
- Notifications

### Level 2: AI Requests

AI asks human for:
- Approval decisions
- Rollback authorization
- Exception handling

### Level 3: Human Handles

Humans handle:
- Major incidents
- Strategy decisions
- External communication

---

## Good Communication Principles

1. **Be Clear:** Use simple language
2. **Be Complete:** Include all relevant info
3. **Be Timely:** Communicate at right moments
4. **Be Actionable:** Tell humans what to do
5. **Be Honest:** Don't hide problems

---

## Example Communication Flows

### Flow 1: Patch Release (Auto)

AI: Runs tests -> Deploys -> Notifies humans

```
[Auto-notification]
Patch v1.0.1 deployed successfully.
3 bugs fixed.
Monitor for issues.
```

### Flow 2: Feature Release (Approval)

AI: Prepares release -> Requests approval -> Deploys -> Notifies

```
[Approval request]
Feature release v1.1.0 ready.
New: Dashboard, Reports.
Risk: Low.
Please approve by 5pm.
```

### Flow 3: Issue Detected

AI: Detects issue -> Assesses -> Requests decision

```
[Alert]
Error rate spiked to 8%.
Possibly related to v1.1.0 release.
Recommendation: Rollback to v1.0.0.
Approve rollback?
```

---

## Questions for Human Decision

When asking humans, always include:

1. **What happened?** (brief)
2. **What's the impact?**
3. **What are the options?**
4. **What do we recommend?**
5. **When do you need to decide?**
