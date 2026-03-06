---
name: release-management
description: Plan and manage product releases including versioning, changelog creation, deployment coordination, and rollback planning. Use when the user needs to release new features, plan version updates, or coordinate deployments. Includes guidance on release frequency, semantic versioning, rollback strategies, and how AI agents should communicate release decisions to humans.
lifecycle: build
category: engineering
outputSummary: Release management process with deployment schedule and rollback plans
relatedAfter: ci-cd-pipeline,monitoring-observability
nextSteps: Coordinate releases and monitor stability
specialization: fullstack
---

# Release Management

Plan and manage product releases. Coordinate versioning, changelogs, deployments, and rollback plans.

## When to Use This Skill

Use when:
- Preparing to release new features
- Planning version updates
- Creating release notes/changelog
- Coordinating deployments
- Planning rollback procedures
- Deciding release timing

## Release Frequency Guidance

| Product Stage | Recommended Frequency | Rationale |
|--------------|---------------------|-----------|
| Pre-launch | As needed | Fast iteration, no users |
| MVP (0-100 users) | Weekly | Fast feedback, iterate quickly |
| Growth (100-1000) | Bi-weekly or weekly | Balance speed and stability |
| Scaling (1000+) | Monthly or bi-weekly | Stability matters more |
| Enterprise | Monthly | Need predictability |

## Versioning: Semantic Versioning

Format: MAJOR.MINOR.PATCH

| Version Type | When to Increment | Examples |
|--------------|------------------|----------|
| PATCH | Bug fixes, small changes | 1.0.0 -> 1.0.1 |
| MINOR | New features (backward compatible) | 1.0.0 -> 1.1.0 |
| MAJOR | Breaking changes | 1.0.0 -> 2.0.0 |

## Workflow

### Step 1: Gather Release Information

- What features are being released?
- What is the version number?
- What testing has been completed?
- What is the target environment?

### Step 2: Create Changelog

Document all changes:
- Added: New features
- Changed: Existing feature updates
- Fixed: Bug fixes
- Removed: Deprecated features

### Step 3: Plan Deployment

Create deployment checklist and rollback plan.

### Step 4: AI-to-Human Communication

Communicate release decisions to stakeholders appropriately.

lifecycle: build
category: engineering
outputSummary: Release management process with deployment schedule and rollback plans
relatedAfter: ci-cd-pipeline,monitoring-observability
nextSteps: Coordinate releases and monitor stability
specialization: fullstack
---

## Output Format

The skill produces these sections:

**RELEASE OVERVIEW**

Version: [X.Y.Z]
Release type: Major/Minor/Patch
Release date: [Date]
Summary: What's in this release

**FEATURES IN RELEASE**

For each feature:
- Name
- Description
- Owner
- Testing status

**CHANGELOG**

Added features
Changed features
Fixed issues
Removed features

**KNOWN ISSUES**

Issue description and workaround if available

**DEPLOYMENT CHECKLIST**

Pre-deployment items
Deployment steps
Post-deployment verification

**ROLLBACK PLAN**

Conditions for rollback
Rollback steps
Escalation contact

**AI-TO-HUMAN COMMUNICATION**

Decision: Auto-release / Requires approval
Summary for humans
Risk level
Required human actions (if any)

lifecycle: build
category: engineering
outputSummary: Release management process with deployment schedule and rollback plans
relatedAfter: ci-cd-pipeline,monitoring-observability
nextSteps: Coordinate releases and monitor stability
specialization: fullstack
---

## Reference Files

- [references/framework.md](references/framework.md) - Release planning framework
- [references/versioning.md](references/versioning.md) - Versioning best practices
- [references/rollback.md](references/rollback.md) - Rollback strategies
- [references/ai-communication.md](references/ai-communication.md) - How AI communicates with humans

lifecycle: build
category: engineering
outputSummary: Release management process with deployment schedule and rollback plans
relatedAfter: ci-cd-pipeline,monitoring-observability
nextSteps: Coordinate releases and monitor stability
specialization: fullstack
---

## Related Skills

- iteration-planning: Plan what goes in release
- release-management: Execute release
- product-health-check: Post-release assessment
- metrics-dashboard-creation: Track release metrics
