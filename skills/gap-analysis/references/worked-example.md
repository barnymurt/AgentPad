# Worked Example: Gap Analysis

This file shows the Gap Analysis skill applied to a complete scenario.

---

## Scenario: InvoiceFlow - SaaS Invoicing Tool

**Context:** InvoiceFlow is an invoicing tool for freelancers and small agencies. The team has been building for 6 months and has a working product. They're now raising funding and investors want to understand the product gaps vs. where they need to be for a Series A product. The team has documented their current state and has requirements for "enterprise-readiness."

---

## Input Available

**Current State (from team):**
- 2,000 active users (freelancers mostly)
- Core invoicing: create, send, track
- PayPal integration only
- Manual customer support via email
- No API
- Simple dashboard with basic reports

**Desired State (from investor requirements for growth):**
- Multi-channel payments (Stripe, bank transfer)
- API for integrations
- Self-service support (knowledge base, tickets)
- Advanced reporting
- Team/collaboration features
- Multi-currency support

**Constraints:**
- 3 developers
- $50k/month budget
- 6 months to show growth before next fundraise

---

## Output: Gap Analysis

# Gap Analysis: InvoiceFlow Enterprise Readiness

## 1. Executive Summary

**Scope:** Gap analysis comparing current product state to enterprise-readiness requirements for Series A fundraising.

**Gaps Identified:** 8 significant gaps identified across capabilities, integrations, and operations.

**Top 3 Priority Gaps:**
1. **Payment Gateway Diversity** (Priority 20) — Currently PayPal-only limits enterprise appeal
2. **API Availability** (Priority 16) — No API blocks integration ecosystem
3. **Advanced Reporting** (Priority 15) — Investors want data sophistication

**Quick Wins:** 2 identified (recurring invoices, client portal)
**Primary Recommendation:** Prioritize payment diversity and API in next 6 months to unlock enterprise market.

---

## 2. Prerequisites Confirmed

| Input | Status | Source |
|-------|--------|--------|
| Current state | ✓ Confirmed | Product walkthrough, team interview |
| Desired state | ✓ Confirmed | Investor requirements, competitive analysis |
| Scope | ✓ Confirmed | Enterprise-readiness for Series A |
| Constraints | ✓ Confirmed | 3 devs, $50k/month, 6 months |

---

## 3. Current State

### Systems & Capabilities

| Capability | Status | Evidence |
|------------|--------|----------|
| Invoice creation | Existing | Working in production |
| Payment tracking | Existing | PayPal integration live |
| Client management | Partial | Manual entry only |
| Recurring invoices | None | Not built |
| Multi-currency | None | USD only |
| API | None | Not started |
| Advanced reporting | None | Basic summary only |
| Team collaboration | None | Single user only |

### Processes

| Process | Status | Notes |
|---------|--------|-------|
| Onboarding | Working | Email-based, <24 hours |
| Support | Problematic | Manual email only, 48hr response |
| Invoicing | Working | Core value works |
| Reporting | Problematic | Manual export required |

### Team/Skills

| Area | Status | Gap |
|------|--------|-----|
| Frontend | Adequate | - |
| Backend | Adequate | - |
| DevOps | Gap | No dedicated ops |
| Customer Success | Gap | Founder does manually |

---

## 4. Desired State

### From Investor Requirements

| Requirement | Source | Priority |
|-------------|--------|----------|
| Multiple payment gateways | Investor | Must |
| API for integrations | Investor | Must |
| Advanced reporting | Investor | Should |
| Multi-currency | Competitive | Should |
| Self-service support | Growth | Should |
| Team features | Growth | Could |

### From Vision

| Vision Element | Description |
|----------------|-------------|
| Platform play | Ecosystem, not just tool |
| Scale | 10k+ users |
| Enterprise-ready | Features match competitors |

### Constraints

| Constraint | Impact |
|------------|--------|
| 3 developers | Can't build everything |
| $50k/month | Limited third-party tools |
| 6 months | Must show progress to investors |

---

## 5. Gap Map

### Gap G-001: Payment Gateway Diversity

**Category:** Missing

**Current State:**
PayPal integration live, no other payment methods. ~60% of enterprise prospects require Stripe.

**Desired State:**
Stripe, bank transfer, credit card options available. Must support enterprise procurement.

**Evidence:**
- 3 of 5 last enterprise prospects churned because no Stripe
- Competitor comparison shows 4+ payment options standard

**Dimension:** Capability

**Impact:** 5 — Critical blocker for enterprise market
**Effort:** 4 — High (Stripe integration ~2-3 weeks)
**Priority Score:** 20

**Root Cause Analysis:**
- Surface Gap: No Stripe
- Root Cause: Initial team had PayPal expertise, Stripe deprioritized
- Related Gaps: None

**Recommendation:** Buy (Stripe API)
**Approach Details:** Integrate Stripe Connect. Use existing Stripe libraries. 2-3 weeks dev time.

---

### Gap G-002: API Availability

**Category:** Missing

**Current State:**
No API exists. All actions must be through web UI.

**Desired State:**
RESTful API for invoice creation, client management, reporting. Must support third-party integrations.

**Evidence:**
- Accounting software integrations require API
- 2 potential partners walked away due to no API
- Competitors all have APIs

**Dimension:** Capability

**Impact:** 4 — High — Blocks ecosystem growth
**Effort:** 5 — Very High — API design + implementation ~3-4 weeks
**Priority Score:** 16

**Root Cause Analysis:**
- Surface Gap: No API
- Root Cause: User-facing features prioritized over developer experience
- Related Gaps: G-005 (partner opportunities)

**Recommendation:** Build
**Approach Details:** Design REST API with OpenAPI spec. Prioritize: Invoices → Clients → Reports. Use existing backend patterns.

---

### Gap G-003: Advanced Reporting

**Category:** Inadequate

**Current State:**
Basic dashboard showing total invoiced, paid, outstanding. No customization.

**Desired State:**
Custom date ranges, exportable reports, revenue analytics, client health scores.

**Evidence:**
- Users manually export to Excel for analysis
- Requested feature in last 3 surveys
- Investor explicitly asked about "revenue intelligence"

**Dimension:** Capability

**Impact:** 3 — Medium — Important but not blocker
**Effort:** 4 — High — New backend queries + frontend
**Priority Score:** 12

**Root Cause Analysis:**
- Surface Gap: Basic reporting
- Root Cause: Reporting database not optimized, metrics undefined
- Related Gaps: None

**Recommendation:** Build
**Approach Details:** Add analytics database (PostgreSQL + Metabase or custom). Define key metrics. 3-4 weeks.

---

### Gap G-004: Recurring Invoices

**Category:** Missing

**Current State:**
Manual invoice creation only. Users recreate monthly invoices.

**Desired State:**
Scheduled, automatic invoice generation for recurring clients.

**Evidence:**
- Top 10 users request this feature
- Would reduce manual work by ~5 hours/month per user
- Competitors have this

**Dimension:** Capability

**Impact:** 4 — High — Strong user demand
**Effort:** 2 — Low — Similar pattern to existing invoice flow
**Priority Score:** 8

**Recommendation:** Build
**Approach Details:** Add scheduler + template system. 1-2 weeks.

---

### Gap G-005: Client Portal

**Category:** Missing

**Current State:**
Clients receive invoices via email only. No self-service view.

**Desired State:**
Client portal for viewing invoices, making payments, downloading history.

**Evidence:**
- Support requests "where can I see my invoices"
- Improves payment velocity (competitors have it)

**Dimension:** Capability

**Impact:** 3 — Medium — Improves UX, reduces support
**Effort:** 2 — Low — Reuses existing invoice display
**Priority Score:** 6

**Recommendation:** Build
**Approach Details:** Simple client-facing view. 1-2 weeks.

---

### Gap G-006: Multi-Currency Support

**Category:** Missing

**Current State:**
USD only.

**Desired State:**
Support major currencies (EUR, GBP, CAD, AUD) with automatic conversion.

**Evidence:**
- 40% of users are international
- EU GDPR requires EU pricing display
- Competitors support 5+ currencies

**Dimension:** Capability

**Impact:** 3 — Medium — Geographic limitation
**Effort:** 5 — Very High — Currency APIs, display logic, rounding rules
**Priority Score:** 9

**Recommendation:** Block (for now)
**Approach Details:** Accept gap for 6 months. Focus on enterprise features that don't require multi-currency. Revisit Q4.

---

### Gap G-007: Self-Service Support

**Category:** Inadequate

**Current State:**
Email support only, 48-hour response. No knowledge base.

**Desired State:**
Knowledge base + ticket system. <24 hour response.

**Evidence:**
- Support tickets increased 200% as user base grew
- Same questions repeatedly
- Zendesk competitor at $50/month would solve

**Dimension:** Process

**Impact:** 3 — Medium — Quality of life
**Effort:** 2 — Low — Third-party tools available
**Priority Score:** 6

**Recommendation:** Buy
**Approach Details:** Zendesk or Intercom. <1 week setup. $50-100/month.

---

### Gap G-008: Team Collaboration

**Category:** Missing

**Current State:**
Single user accounts only.

**Desired State:**
Team features: multiple users per account, role-based access, permissions.

**Evidence:**
- 30% of enterprise prospects ask for team features
- Most competitors have this
- Low current priority from user surveys

**Dimension:** Capability

**Impact:** 2 — Low — Nice-to-have for now
**Effort:** 5 — Very High — Auth redesign, new data model
**Priority Score:** 10

**Recommendation:** Block (for now)
**Approach Details:** Schedule for v2.0 (post-Series A). Current single-user focus is correct.

---

## 6. Root Cause Analysis

### Grouped Root Causes

| Root Cause | Surface Gaps | Recommendation |
|------------|-------------|----------------|
| No developer experience focus | G-002 (API) | Shift prioritization |
| Initial technical shortcuts | G-003 (Reporting), G-006 (Currency) | Technical debt payment needed |
| PayPal-only expertise | G-001 (Payments) | Add Stripe capability |

### Insights

1. **Technical debt is limiting:** Several gaps (reporting, multi-currency) stem from quick early decisions. Need to pay down debt.

2. **Enterprise features are blockers:** API and payments are gatekeepers. Fix these first before other features.

3. **Support is manual bottleneck:** Growth will break current support model. Need self-service soon.

---

## 7. Gap Assessment Summary

### Priority Matrix

| Quadrant | Gaps | Action |
|----------|------|--------|
| Quick Wins (High Impact, Low Effort) | G-004, G-005 | Do first |
| Strategic Investment (High Impact, High Effort) | G-001, G-002, G-003 | Plan for |
| Fill-ins (Low Impact, Low Effort) | G-007 | Do when time permits |
| Deprioritize (Low Impact, High Effort) | G-006, G-008 | Skip for now |

### Gap Distribution

| Category | Count | % of Total |
|----------|-------|------------|
| Missing | 5 | 63% |
| Inadequate | 2 | 25% |
| Excess | 0 | 0% |
| Misaligned | 1 | 12% |

### Impact Distribution

| Impact Level | Count |
|--------------|-------|
| Critical (5) | 1 |
| High (4) | 2 |
| Medium (3) | 4 |
| Low (2) | 1 |

---

## 8. Recommendations

### Gap G-001: Payment Gateway Diversity

**Recommendation:** Buy (Stripe)

**Specific Approach:** Integrate Stripe Connect for credit cards. Separate project, 2-week timeline. Use existing payment handling patterns.

**Timeline:** 2-3 weeks

**Resources Required:**
- 1 backend developer
- Stripe account setup
- Testing environment

**Dependencies:**
- None — can start immediately

---

### Gap G-002: API Availability

**Recommendation:** Build

**Specific Approach:** Design REST API with OpenAPI spec. Start with critical endpoints: invoices, clients, payments. Auth via API keys.

**Timeline:** 4-6 weeks

**Resources Required:**
- 1 backend developer (full-time)
- API documentation effort

**Dependencies:**
- None — foundational capability

---

### Gap G-003: Advanced Reporting

**Recommendation:** Build

**Specific Approach:** Add analytics layer. Define key metrics: revenue, growth, client health. Use Metabase for quick implementation or custom dashboard.

**Timeline:** 3-4 weeks

**Resources Required:**
- 1 backend + 1 frontend developer
- Database optimization

**Dependencies:**
- G-002 (API) useful but not required

---

## 9. Action Plan

### Phase 1: Immediate (Months 1-2)

| Gap | Priority | Approach | Owner | Due |
|-----|----------|----------|-------|-----|
| G-004 Recurring Invoices | 8 | Build | Dev A | Month 1 |
| G-005 Client Portal | 6 | Build | Dev B | Month 1-2 |
| G-001 Stripe Integration | 20 | Buy | Dev A | Month 2 |

### Phase 2: Short-term (Months 3-4)

| Gap | Priority | Approach | Owner | Due |
|-----|----------|----------|-------|-----|
| G-002 API | 16 | Build | Dev A+B | Month 3-4 |
| G-003 Reporting | 12 | Build | Dev C | Month 3-4 |

### Phase 3: Medium-term (Months 5-6)

| Gap | Priority | Approach | Owner | Due |
|-----|----------|----------|-------|-----|
| G-007 Support Tools | 6 | Buy | Ops | Month 5 |

### Acceptable Gaps (No Action Planned)

| Gap | Reason |
|-----|--------|
| G-006 Multi-Currency | High effort, not critical for 6-month goal. Revisit Q4. |
| G-008 Team Features | Enterprise focus for Series B, not now. |

---

## 10. Assumptions

| Assumption | Confidence | Impact if Wrong |
|------------|------------|-----------------|
| 3 developers available for 6 months | High | Timeline extends |
| Stripe integration is ~2 weeks | Medium | Could be 3-4 weeks |
| Enterprise market worth pursuing | Medium | May be wrong segment |

---

**End of Worked Example**
