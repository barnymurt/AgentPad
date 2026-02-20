# Worked Example: Process Mapping

This file shows the Process Mapping skill applied to a complete scenario.

---

## Scenario: InvoiceFlow - Invoice Processing

**Context:** InvoiceFlow processes invoices for 500+ small businesses. The team has been growing but operations are struggling. They're overwhelmed with manual work and want to understand their invoice processing workflow, find bottlenecks, and identify automation opportunities.

---

## Output: Process Mapping

# Process Mapping: InvoiceFlow Invoice Processing

## 1. Executive Summary

**Processes Mapped:** 4 core invoice processing workflows
**Problems Identified:** 12 total, 5 high impact
**Quick Wins Identified:** 3
**Automation Opportunities:** 6 identified, 4 recommended

**Primary Recommendation:** Focus on invoice data entry and approval bottlenecks. Implementing OCR for data extraction and parallel approval workflows can reduce processing time by 60% and eliminate 80% of manual data entry errors.

---

## 2. Scope Definition

### Priority Processes

| Process | Priority | Rationale |
|---------|----------|-----------|
| Invoice Receipt & Data Entry | High | Most time-consuming, error-prone |
| Invoice Approval | High | Current bottleneck |
| Payment Processing | High | Critical, time-sensitive |
| Error Resolution | Medium | Impacts above processes |

### Excluded Processes

| Process | Reason |
|---------|--------|
| Customer onboarding | Different workflow |
| Reporting | Not core invoice processing |
| Vendor management | Future phase |

### Scope Boundaries

- **In scope:** Invoice receipt through payment or rejection
- **Out of scope:** Purchase order matching, inventory, contracts
- **Start triggers:** Email received with invoice attachment
- **End results:** Payment sent OR invoice rejected with reason

---

## 3. As-Is Process Maps

### Process 1: Invoice Receipt & Data Entry

**Objective:** Extract invoice data and enter into system

**Flow:**
```
[Email Received] → [Open Invoice] → [Manual Data Entry] → [Verify in System] → [Complete]
                      ↓
                [Format Issue] → [Request Resend]
```

**Swimlane View:**

| Actor | Steps |
|-------|-------|
| Operations | Open invoice, Verify in system |
| Accounting | Manual data entry |
| System | Send confirmation |

**Process Details:**

| Step | Actor | Action | Input | Output | Time |
|------|-------|--------|-------|--------|------|
| 1 | Ops | Open email, download PDF | Email with attachment | PDF file | 1 min |
| 2 | Ops | Open PDF, read fields | PDF | Data in head | 2 min |
| 3 | Accounting | Enter in system | Data | System record | 8 min |
| 4 | Accounting | Verify data | System record | Confirmation | 2 min |

**Total Time:** ~13 minutes per invoice

**Validation:**
- [✓] Reviewed by: Sarah (Ops), Mike (Accounting)
- [✓] Matches actual workflow: Yes, except sometimes multiple invoices batched

---

### Process 2: Invoice Approval

**Objective:** Get appropriate approvals for payment

**Flow:**
```
[Data Complete] → [Determine Approval Chain] → [Manager 1 Approval] → [Manager 2 Approval] → [Complete]
                      ↓                                            ↓
                [Under $1K]                               [Over $1K]
```

**Process Details:**

| Step | Actor | Action | Time | Notes |
|------|-------|--------|------|-------|
| 1 | Accounting | Determine amount tier | 1 min | Look up in system |
| 2 | Manager 1 | Review and approve | 24-48 hrs | Email notification |
| 3 | Manager 2 | Review and approve | 24-48 hrs | Only for >$1K |

**Bottleneck Analysis:**
- Average wait time: 3-5 days
- 40% require manager follow-up
- 15% stuck in "pending" status

---

### Process 3: Payment Processing

**Objective:** Execute approved payment

**Flow:**
```
[Approval Complete] → [Schedule Payment] → [Execute Payment] → [Confirm] → [Complete]
```

**Process Details:**

| Step | Actor | Action | Time |
|------|-------|--------|------|
| 1 | Accounting | Schedule in payment system | 5 min |
| 2 | Finance | Execute transfer | 10 min |
| 3 | System | Send confirmation | 1 min |

---

## 4. Problem Analysis

### Aggregated Problems

| Problem | Type | Location | Frequency | Impact | Root Cause |
|---------|------|----------|-----------|--------|------------|
| Manual data entry errors | Quality | Data Entry | 15% of invoices | High | Human error |
| Approval delays | Bottleneck | Approval | 40% of invoices | High | Sequential, manual |
| Missing invoice data | Exception | Receipt | 10% of invoices | Medium | Vendor formatting |
| Duplicate entries | Redundancy | Data Entry | 5% of invoices | Medium | No duplicate check |
| Payment timing | Bottleneck | Payment | 20% of invoices | Medium | Batch processing |
| Email lost | Bottleneck | Receipt | 2% of invoices | Low | Manual tracking |

### Root Cause Analysis

**Primary Issues:**
1. **Sequential approvals** — Both managers must approve, in order, via email
2. **Manual data entry** — All invoice fields typed by hand
3. **No validation** — System accepts any input without verification
4. **Batch processing** — Payments only run twice weekly

---

## 5. To-Be Process Designs

### Invoice Receipt & Data Entry - Improved

**Improvements:**
1. Implement OCR for automatic data extraction
2. Add duplicate detection
3. Auto-validate against vendor database

**New Flow:**
```
[Email Received] → [OCR Extraction] → [Auto-validate] → [Manual Review Exceptions] → [Complete]
                                           ↓
                                     [Duplicate Alert]
```

**Expected Benefits:**
- Data entry time: 8 min → 1 min (87% reduction)
- Error rate: 15% → 2% (87% reduction)
- Total processing: 13 min → 5 min per invoice

### Invoice Approval - Improved

**Improvements:**
1. Parallel approvals for different amounts
2. In-app approval instead of email
3. Automatic escalation after 48 hours

**New Flow:**
```
[Data Complete] → [Determine Tier] → [Parallel Requests] → [Both Approved] → [Complete]
                                           ↓
                                     [Any Rejected] → [Resolution]
```

**Expected Benefits:**
- Approval time: 3-5 days → 24-48 hours
- Stuck approvals: 15% → <5%

---

## 6. Automation Assessment

### Opportunities Identified

| Process | Task | Appropriateness | Risk | Recommendation |
|---------|------|-----------------|------|----------------|
| Receipt | OCR data extraction | Good | Low | Automate |
| Receipt | Duplicate detection | Good | Low | Automate |
| Receipt | Email parsing | Good | Medium | Automate |
| Approval | Notification | Good | Low | Automate |
| Approval | Escalation | Conditional | Medium | Human in loop |
| Payment | Scheduling | Good | Low | Automate |

### Not Appropriate for Automation

| Process | Task | Reason |
|---------|------|--------|
| Approval | Final decision | Requires judgment |
| Exception | Resolve mismatches | Requires investigation |
| Payment | Approve payment | Control requirement |

---

## 7. Recommendations

### Quick Wins (High Impact, Low Effort)

| Recommendation | Process | Effort | Impact | Owner | Timeline |
|----------------|---------|--------|--------|-------|----------|
| Enable parallel approval in system | Approval | 2 days | High | Mike | Week 1 |
| Add duplicate detection | Data Entry | 1 day | Medium | Sarah | Week 1 |
| Switch to daily payment batches | Payment | 1 day | Medium | Finance | Week 2 |

### Strategic Improvements

| Recommendation | Process | Effort | Impact | Owner | Timeline |
|----------------|---------|--------|--------|-------|----------|
| Implement OCR solution | Data Entry | 6 weeks | High | Ops | Month 1-2 |
| In-app approval workflow | Approval | 4 weeks | High | Product | Month 2 |
| Vendor database auto-validate | Data Entry | 3 weeks | Medium | Data | Month 2 |

---

## 8. Implementation Plan

### Phase 1: Quick Wins (Weeks 1-2)

| Action | Owner | Deliverable |
|--------|-------|-------------|
| Configure parallel approval | Mike | System config |
| Add duplicate check rule | Sarah | System rule |
| Change payment schedule | Finance | New batch timing |

### Phase 2: Workflow Improvements (Weeks 3-8)

| Action | Owner | Deliverable |
|--------|-------|-------------|
| In-app approval rollout | Product | New approval UI |
| Vendor database setup | Data | Vendor records |

### Phase 3: Automation (Weeks 9+)

| Action | Owner | Deliverable |
|--------|-------|-------------|
| OCR vendor selection | Ops | Vendor contract |
| OCR implementation | Engineering | Production system |

---

**End of Worked Example**
