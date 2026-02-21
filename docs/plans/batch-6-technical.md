# Batch 6 Design Document: Technical Skills

**Date:** 2026-02-21
**Status:** Ready for Review
**Purpose:** Detailed technical implementation skills for post-validation work

---

## 1. Overview

### 1.1 What Batch 6 Enables

Batch 6 provides **detailed technical implementation skills** — the skills needed to turn architecture into production code. These skills handle the detailed design work that comes after high-level architecture.

### 1.2 Philosophy: Modular + Collaborative

- **Modular skills**: Use what you need based on product scope
- **Agent-driven**: Agent determines which skills to trigger
- **Dynamic**: Skills can pull in others when issues arise
- **Iterative**: Part of the product development cycle

### 1.3 Position in Pipeline

```
Validation Pack (Batch 1) → Architecture (Batch 2) → Research (Batch 4) → GTM (Batch 5)
                                        ↓
                              Technical Skills (Batch 6)
                                        ↓
                              3 Amigos Squad (ongoing iteration)
```

---

## 2. Modular Skill Philosophy

### 2.1 How Skills Are Triggered

The agent evaluates:
- Product complexity
- Team capability
- Technical requirements
- Issues that arise

And recommends: "Based on your scope, these technical skills are relevant"

### 2.2 Not a Pack

Unlike Validation Pack or GTM Pack, Batch 6 is **modular**:
- No fixed sequence
- Pick skills as needed
- Can combine any skills for a task

### 2.3 Dynamic Collaboration

If QA finds a performance issue → pulls in database/frontend
If frontend has accessibility gap → pulls in accessibility-review
If deployment has issues → pulls in DevOps skills

---

## 3. Skill Categories

### Category 1: Database Expert (6 skills)

| # | Skill | Purpose |
|---|-------|---------|
| 1 | data-modeling | Entity relationships, data structure |
| 2 | schema-design | Table/collection design |
| 3 | migration-planning | Version control for schema |
| 4 | performance-tuning | Query optimization |
| 5 | data-security | Encryption, access, compliance |
| 6 | backup-recovery | Business continuity |

### Category 2: Frontend Expert (8 skills)

| # | Skill | Purpose |
|---|-------|---------|
| 1 | component-architecture | Component structure, patterns |
| 2 | ui-patterns | Common UI patterns, best practices |
| 3 | design-system | Design tokens, scale, consistency |
| 4 | animation-motion | Micro-interactions, transitions |
| 5 | state-management | App state, caching |
| 6 | accessibility-review | WCAG compliance |
| 7 | responsive-patterns | Mobile-first, breakpoints |
| 8 | performance-optimization | Core web vitals |

### Category 3: QA/Testing (3 skills)

| # | Skill | Purpose |
|---|-------|---------|
| 1 | test-strategy | Testing pyramid, coverage |
| 2 | automation-framework | E2E, integration tests |
| 3 | tdd | Test-driven development |

### Category 4: DevOps/Infra (4 skills)

| # | Skill | Purpose |
|---|-------|---------|
| 1 | infrastructure-as-code | Terraform, CloudFormation |
| 2 | ci-cd-pipeline | Build, test, deploy |
| 3 | monitoring-observability | Logs, metrics, alerts |
| 4 | cloud-platforms | AWS, Azure, GCP |

### Category 5: API/Mobile/ML (6 skills)

| # | Skill | Purpose |
|---|-------|---------|
| 1 | api-design | REST/GraphQL, endpoints |
| 2 | mobile-ios | iOS-specific patterns |
| 3 | mobile-android | Android-specific patterns |
| 4 | serverless-development | Lambda, Cloud Functions |
| 5 | ml-llm-integration | AI/ML implementation |
| 6 | edge-computing | CDN, edge functions |

### Category 6: 3 Amigos Squad (1 skill)

| # | Skill | Purpose |
|---|-------|---------|
| 1 | ticket-refinement | PM + Dev + QA collaboration |

---

## 4. Skill Descriptions

### 4.1 Database Expert

#### data-modeling
Define entity relationships and data structure before schema design.

**When to use:** Before schema-design, when building new features

#### schema-design
Create detailed table/collection designs with indexes, constraints.

**When to use:** During implementation, when creating new data structures

#### migration-planning
Plan schema versions, migrations, rollbacks.

**When to use:** When schema needs to change, before deployments

#### performance-tuning
Optimize queries, indexes, caching strategies.

**When to use:** When performance issues arise, before launch

#### data-security
Define encryption, access controls, compliance requirements.

**When to use:** During security review, for compliance

#### backup-recovery
Define backup strategies, recovery procedures.

**When to use:** Before launch, for business continuity

### 4.2 Frontend Expert

#### component-architecture
Define component structure, patterns, reusability.

**When to use:** During frontend implementation

#### ui-patterns
Apply common UI patterns and best practices.

**When to use:** When building specific UI features

#### design-system
Create design tokens, establish consistency.

**When to use:** When building design system from scratch or scaling

#### animation-motion
Design micro-interactions and transitions.

**When to use:** When differentiation matters, "award-winning" quality

#### state-management
Define app state, caching, data flow.

**When to use:** When state gets complex

#### accessibility-review
Ensure WCAG compliance, inclusive design.

**When to use:** Before launch, for accessibility requirements

#### responsive-patterns
Mobile-first, breakpoint strategies.

**When to use:** When building responsive interfaces

#### performance-optimization
Core web vitals, bundle optimization.

**When to use:** Before launch, for performance requirements

### 4.3 QA/Testing

#### test-strategy
Define testing pyramid, coverage targets.

**When to use:** At project start, for test planning

#### automation-framework
Build E2E, integration test framework.

**When to use:** When automation is needed, before CI/CD

#### tdd
Test-driven development practices.

**When to use:** For quality-focused teams, complex features

### 4.4 DevOps/Infra

#### infrastructure-as-code
Define infrastructure with Terraform/CloudFormation.

**When to use:** When setting up cloud infrastructure

#### ci-cd-pipeline
Build automated build, test, deploy pipelines.

**When to use:** For automation, before launch

#### monitoring-observability
Set up logs, metrics, alerting.

**When to use:** Before launch, for production readiness

#### cloud-platforms
AWS, Azure, GCP best practices and patterns.

**When to use:** When choosing/p configuring cloud

### 4.5 API/Mobile/ML

#### api-design
Detailed API endpoint design, REST/GraphQL.

**When to use:** When building APIs, from architecture design

#### mobile-ios
iOS-specific patterns, Swift/SwiftUI.

**When to use:** When building iOS app

#### mobile-android
Android-specific patterns, Kotlin/Jetpack.

**When to use:** When building Android app

#### serverless-development
Lambda, Cloud Functions patterns.

**When to use:** When using serverless architecture

#### ml-llm-integration
AI/ML implementation patterns.

**When to use:** When adding AI features

#### edge-computing
CDN, edge functions for performance.

**When to use:** For global distribution, performance

### 4.6 3 Amigos Squad

#### ticket-refinement
PM + Developer + QA collaboration on tickets.

**When to use:** During development, for ticket refinement sessions

---

## 5. Integration Points

### 5.1 From Architecture (Batch 2)

Architecture Design produces:
- Container design
- Data flows
- Tech stack decisions

Batch 6 consumes these and creates:
- Detailed schema
- Component architecture
- API specifications

### 5.2 From GTM (Batch 5)

GTM may reveal:
- Performance requirements
- Scaling needs
- Compliance needs

Batch 6 responds with appropriate skills

### 5.3 From 3 Amigos (Ongoing)

The 3 Amigos squad enables:
- Continuous refinement
- Issue identification
- Skill triggering

### 5.4 Dynamic Issue Resolution

```
Issue identified → Pull in relevant skill → Update specs → Flow back
```

Example:
1. QA finds slow query → Pull in performance-tuning
2. Frontend has accessibility gap → Pull in accessibility-review
3. Deployment fails → Pull in ci-cd-pipeline

---

## 6. Quality Criteria

### General
- [ ] Skills are modular and independently usable
- [ ] Agent can determine appropriate skills based on scope
- [ ] Skills can collaborate dynamically

### Database
- [ ] Data modeling precedes schema design
- [ ] Migrations handle rollbacks
- [ ] Performance considers scale

### Frontend
- [ ] Design system enables consistency
- [ ] Accessibility is baseline, not optional
- [ ] Performance optimized for core web vitals

### QA
- [ ] Test strategy matches project risk
- [ ] Automation covers right levels
- [ ] TDD is optional based on team preference

### DevOps
- [ ] Infrastructure as code from start
- [ ] CI/CD enables fast feedback
- [ ] Monitoring enables quick response

### API/Mobile/ ] API design follows REST/ML
- [GraphQL best practices
- [ ] Mobile follows platform conventions
- [ ] ML integration handles data requirements

---

## 7. Devil's Advocate Review

*Review conducted in conversation*

---

## 8. Document Status

**Status:** Ready for Review

**Next Steps:**
1. DA Review
2. Proceed to build (if approved)
