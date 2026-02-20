# Worked Example: User Story Generation

This file shows the User Story Generation skill applied to a complete scenario.

## Scenario: InvoiceFlow - Recurring Invoices Feature

**Context:** InvoiceFlow is a SaaS invoicing tool for freelance designers. The team has completed requirements elicitation for a new "Recurring Invoices" feature. Now they need user stories generated for the development team.

### Input: Requirements from Elicitation

From `requirements-elicitation` skill output:

**Feature:** Recurring Invoices

**Functional Requirements:**

- **FR-001:** Users can create invoice templates that repeat on a schedule
- **FR-002:** Users can set the frequency (weekly, monthly, quarterly)
- **FR-003:** Users can set an end date or number of occurrences
- **FR-004:** The system automatically generates invoices based on templates
- **FR-005:** Users can pause/resume recurring templates
- **FR-006:** Users can edit individual generated invoices without affecting the template

**Non-Functional Requirements:**
- NFR-001: Recurring invoices generated within 5 minutes of scheduled time
- NFR-002: System handles 1000+ active templates without performance degradation

**User Personas available:**
- P1: Freelance Designer (primary user)
- P2: Small Agency Owner (secondary user)
- P3: Accountant (view-only access)

---

## Output: User Stories

# User Stories: Recurring Invoices Feature

## 1. Story Overview

### Story Map

| Feature Area | MVP | Release 2 | Future |
|--------------|-----|-----------|--------|
| Template Management | US-1, US-2, US-3 | US-6 | US-8 |
| Invoice Generation | US-4, US-5 | | |
| Template Control | | US-7 | |

### Summary Statistics

- Total stories: 8
- Total effort: 21 points
- MVP stories: 5 (13 points)
- Release 2 stories: 2 (5 points)
- Future stories: 1 (3 points)

---

## 2. User Stories

### US-1: Create Recurring Invoice Template

**As a** freelance designer  
**I want to** create an invoice template with a repeating schedule  
**So that** I don't have to manually create invoices for recurring clients

**Source requirement:** FR-001, FR-002, FR-003  
**Priority:** Must

#### Context

- User has at least one client in the system
- User has created at least one invoice previously (for line item reference)
- Default currency is user's default currency

#### Acceptance Criteria

- [ ] **AC-1** — Given I am on the templates page When I click "Create Recurring Template" Then I see a form with fields for client selection, schedule, and line items

- [ ] **AC-2** — Given I am creating a template When I select a frequency (weekly/monthly/quarterly) Then I see relevant date options (start date, end date or occurrence count)

- [ ] **AC-3** — Given I am creating a template When I add line items (description, quantity, rate) Then the subtotal calculates automatically

- [ ] **AC-4** — Given I am creating a template When I select "monthly" and start date of "15th" Then subsequent invoices generate on the 15th of each month

- [ ] **AC-5** — Given I am creating a template When I don't select a client Then I see error "Please select a client"

- [ ] **AC-6** — Given I am creating a template When I don't add any line items Then I see error "Please add at least one line item"

#### Technical Notes

- **Dependencies:** None (new feature)
- **Database:** New table `recurring_templates` with fields: client_id, frequency, start_date, end_date (nullable), occurrence_count (nullable), line_items (JSONB)
- **API:** POST /api/recurring-templates, GET /api/recurring-templates
- **Third-party:** None
- **Security:** User must have "create invoice" permission; client must belong to user's organization

#### Effort Estimate

- **Points:** 5
- **Range:** 5-8
- **Confidence:** High
- **Notes:** Standard CRUD with scheduling logic. Known tech (PostgreSQL, existing invoice patterns).

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)
- **User segment:** Solo freelancers with recurring clients

---

### US-2: View Recurring Templates

**As a** freelance designer  
**I want to** see a list of all my recurring invoice templates  
**So that** I can manage which clients have recurring invoices

**Source requirement:** FR-001 (part of template management)  
**Priority:** Must

#### Context

- User may have 0 to 100+ templates
- Templates may be active, paused, or completed

#### Acceptance Criteria

- [ ] **AC-1** — Given I am on the templates page When the page loads Then I see a list of all my recurring templates with client name, frequency, next invoice date, and status

- [ ] **AC-2** — Given I am on the templates page When a template is paused Then I see "Paused" status with visual indicator (gray)

- [ ] **AC-3** — Given I am on the templates page When a template's next invoice is within 7 days Then I see "Upcoming" badge

- [ ] **AC-4** — Given I am on the templates page When there are no templates Then I see empty state "No recurring invoices yet. Create your first template to automate your billing."

#### Technical Notes

- **Dependencies:** US-1 (template creation must exist)
- **Database:** Query `recurring_templates` table with user_id filter
- **API:** GET /api/recurring-templates?status=all|active|paused
- **Third-party:** None
- **Security:** Only show templates belonging to user's organization

#### Effort Estimate

- **Points:** 2
- **Range:** 2-3
- **Confidence:** High
- **Notes:** Standard list view. Reuse existing table components.

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)

---

### US-3: Edit Recurring Template

**As a** freelance designer  
**I want to** modify an existing recurring template  
**So that** I can adjust pricing or schedules when client agreements change

**Source requirement:** FR-001 (part of template management)  
**Priority:** Should

#### Context

- Only future invoices are affected; past generated invoices remain unchanged
- User can change frequency, line items, client

#### Acceptance Criteria

- [ ] **AC-1** — Given I am viewing a template When I click "Edit" Then I see the template form pre-populated with current values

- [ ] **AC-2** — Given I am editing a template When I change the frequency from monthly to quarterly Then I see confirmation "This will affect [X] upcoming invoices. Continue?"

- [ ] **AC-3** — Given I am editing a template When I change line item pricing Then I see notice "Past generated invoices will not be affected"

- [ ] **AC-4** — Given I am editing a template When I change the client Then the new client sees the change on next generated invoice

#### Technical Notes

- **Dependencies:** US-1, US-2
- **Database:** UPDATE on `recurring_templates` table
- **API:** PUT /api/recurring-templates/{id}
- **Third-party:** None
- **Security:** Only template owner can edit

#### Effort Estimate

- **Points:** 3
- **Range:** 3-5
- **Confidence:** Medium
- **Notes:** Similar to create form with pre-population. Confirmation dialog adds complexity.

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)

---

### US-4: Automatic Invoice Generation

**As a** system  
**I want to** automatically create invoices from active recurring templates  
**So that** users receive invoices on schedule without manual intervention

**Source requirement:** FR-004  
**Priority:** Must

#### Context

- Runs as background job every minute
- Checks for templates where next_invoice_date <= now AND status = active

#### Acceptance Criteria

- [ ] **AC-1** — Given a template with "monthly" frequency and start date Jan 15 When the job runs on Feb 15 Then an invoice is created for that template

- [ ] **AC-2** — Given a template has reached its occurrence limit (e.g., 6 times) When the final invoice is generated Then the template status changes to "Completed"

- [ ] **AC-3** — Given a template has reached its end date When that date passes Then the template status changes to "Completed"

- [ ] **AC-4** — Given the background job encounters an error generating an invoice Then the error is logged and the template status changes to "Failed" with notification to user

- [ ] **AC-5** — Given a template has "weekly" frequency When 7 days pass from last invoice date Then a new invoice generates

#### Technical Notes

- **Dependencies:** US-1 (template structure)
- **Database:** INSERT into `invoices` table from template data; UPDATE `recurring_templates.next_invoice_date`
- **API:** Internal job (not user-facing)
- **Third-party:** None
- **Security:** Background job runs with system permissions; invoice inherits template's organization

#### Effort Estimate

- **Points:** 5
- **Range:** 5-8
- **Confidence:** High
- **Notes:** Background job logic is straightforward. Need to handle edge cases carefully.

#### Persona Reference

- **Primary actor:** System (automated)
- **Secondary actor:** Freelance Designer (receives invoice)

---

### US-5: User Notification on Invoice Generation

**As a** freelance designer  
**I want to** receive notification when a recurring invoice is generated  
**So that** I know when to expect payment

**Source requirement:** FR-004 (notification part)  
**Priority:** Must

#### Context

- User has notification preferences (email, in-app, both)
- Invoice notification is separate from payment notification

#### Acceptance Criteria

- [ ] **AC-1** — Given a recurring invoice is generated When the user's notification preference is "email" Then an email is sent to user's registered email with invoice details

- [ ] **AC-2** — Given a recurring invoice is generated When the user's notification preference is "in-app" Then an in-app notification appears in the notification center

- [ ] **AC-3** — Given a recurring invoice is generated When the user has multiple notification preferences enabled Then both email and in-app notifications are sent

- [ ] **AC-4** — Given a recurring invoice is generated When email delivery fails Then in-app notification is still attempted

#### Technical Notes

- **Dependencies:** US-4 (invoice generation), existing notification system
- **Database:** Read from `user_preferences` for notification settings
- **API:** Internal trigger after invoice creation
- **Third-party:** Resend (existing email provider)
- **Security:** Only send to invoice owner

#### Effort Estimate

- **Points:** 3
- **Range:** 3-5
- **Confidence:** High
- **Notes:** Reuses existing notification infrastructure.

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)

---

### US-6: Pause/Resume Template

**As a** freelance designer  
**I want to** pause a recurring template and resume it later  
**So that** I can temporarily stop billing without deleting the template

**Source requirement:** FR-005  
**Priority:** Should (Release 2)

#### Context

- Pausing stops future invoice generation but preserves template
- Resuming continues from where it left off (respects original schedule)

#### Acceptance Criteria

- [ ] **AC-1** — Given I am viewing a template When I click "Pause" Then the template status changes to "Paused" and no new invoices generate

- [ ] **AC-2** — Given a template is paused When I click "Resume" Then the template status changes to "Active" and next invoice generates on next scheduled date

- [ ] **AC-3** — Given I am viewing a paused template Then I see "Paused on [date]" with option to resume

- [ ] **AC-4** — Given a template is paused When the original end date passes Then the template status changes to "Completed" as usual

#### Technical Notes

- **Dependencies:** US-2 (template viewing)
- **Database:** UPDATE `recurring_templates.status`
- **API:** PATCH /api/recurring-templates/{id}/pause, PATCH /api/recurring-templates/{id}/resume
- **Third-party:** None
- **Security:** Only template owner can pause/resume

#### Effort Estimate

- **Points:** 2
- **Range:** 2-3
- **Confidence:** High
- **Notes:** Simple status toggle. Reuses existing status logic.

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)

---

### US-7: Edit Generated Invoice Without Affecting Template

**As a** freelance designer  
**I want to** edit an individual generated invoice without changing the template  
**So that** I can handle one-time adjustments without affecting future invoices

**Source requirement:** FR-006  
**Priority:** Should (Release 2)

#### Context

- Editing an invoice creates a "snapshot" — template changes don't affect this invoice
- Audit trail shows this invoice was modified from template

#### Acceptance Criteria

- [ ] **AC-1** — Given I am viewing a generated invoice When I click "Edit" Then I can modify line items, amounts, or client details

- [ ] **AC-2** — Given I edit a generated invoice When I save changes Then I see confirmation "This invoice was modified. Template changes will not affect this invoice."

- [ ] **AC-3** — Given I edit a generated invoice When I later edit the source template Then this modified invoice is not affected

- [ ] **AC-4** — Given I am viewing a generated invoice that was modified Then I see "Customized from template" indicator

#### Technical Notes

- **Dependencies:** US-4, US-5
- **Database:** Invoice table gets `is_customized` flag and stores snapshot of template at generation time
- **API:** PUT /api/invoices/{id}
- **Third-party:** None
- **Security:** Only invoice owner can edit

#### Effort Estimate

- **Points:** 5
- **Range:** 5-8
- **Confidence:** Medium
- **Notes:** Need to handle snapshot logic carefully. Could be complex depending on how template changes are tracked.

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)

---

### US-8: Template Analytics Dashboard

**As a** freelance designer  
**I want to** see analytics on my recurring invoices  
**So that** I can understand revenue projections from recurring billing

**Source requirement:** Out of scope for initial release  
**Priority:** Won't (this version) — Future feature

#### Context

Would show: total recurring revenue, upcoming invoices, template performance

#### Technical Notes

- **Dependencies:** US-4 (invoice generation data)
- **Database:** Aggregate queries on invoices table
- **API:** New analytics endpoints
- **Third-party:** Chart library (existing)

#### Effort Estimate

- **Points:** 8
- **Range:** 5-13
- **Confidence:** Low
- **Notes:** Out of scope for MVP. Defer to understand actual user needs first.

#### Persona Reference

- **Primary actor:** Freelance Designer (P1)

---

## 3. Feature Area Grouping

### Template Management

| Story ID | Title | Priority | Points |
|----------|-------|----------|--------|
| US-1 | Create Recurring Invoice Template | Must | 5 |
| US-2 | View Recurring Templates | Must | 2 |
| US-3 | Edit Recurring Template | Should | 3 |

### Invoice Generation

| Story ID | Title | Priority | Points |
|----------|-------|----------|--------|
| US-4 | Automatic Invoice Generation | Must | 5 |
| US-5 | User Notification on Invoice Generation | Must | 3 |

### Template Control

| Story ID | Title | Priority | Points |
|----------|-------|----------|--------|
| US-6 | Pause/Resume Template | Should | 2 |
| US-7 | Edit Generated Invoice Without Affecting Template | Should | 5 |

### Future

| Story ID | Title | Priority | Points |
|----------|-------|----------|--------|
| US-8 | Template Analytics Dashboard | Won't | 8 |

---

## 4. Release Planning

### Release 1: MVP

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-1 | Create Recurring Invoice Template | 5 | None |
| US-2 | View Recurring Templates | 2 | US-1 |
| US-4 | Automatic Invoice Generation | 5 | US-1 |
| US-5 | User Notification on Invoice Generation | 3 | US-4 |
| US-2 | View Recurring Templates (testing) | - | US-1, US-4 |

**MVP Criteria:** Users can create recurring templates, view them, and have invoices automatically generated and sent. Minimum viable automation for recurring billing.

**Total MVP Points:** 13

### Release 2

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-3 | Edit Recurring Template | 3 | US-1 |
| US-6 | Pause/Resume Template | 2 | US-2 |
| US-7 | Edit Generated Invoice | 5 | US-4 |

**Total Release 2 Points:** 10

### Future

| Story ID | Title | Why Deferred |
|----------|-------|--------------|
| US-8 | Template Analytics Dashboard | Need user feedback before designing. May need different metrics. |

---

## 5. Effort Summary

### By Priority

| Priority | Stories | Total Points | % of Total |
|----------|---------|---------------|------------|
| Must | 4 | 15 | 71% |
| Should | 3 | 10 | 24% |
| Won't | 1 | 3 | 5% |

### By Feature Area

| Feature Area | Stories | Points |
|--------------|---------|--------|
| Template Management | 3 | 10 |
| Invoice Generation | 2 | 8 |
| Template Control | 2 | 7 |

### By Release

| Release | Stories | Points |
|---------|---------|--------|
| MVP | 4 | 13 |
| Release 2 | 3 | 8 |
| Future | 1 | 3 |

---

## 6. Dependencies Map

### Story Dependencies

| Story | Depends On | Type |
|-------|-----------|------|
| US-2 | US-1 | Internal |
| US-3 | US-1 | Internal |
| US-4 | US-1 | Internal |
| US-5 | US-4 | Internal |
| US-6 | US-2 | Internal |
| US-7 | US-4 | Internal |

### External Dependencies

None for this feature. All dependencies are internal stories.

---

## 7. Gaps and Open Questions

### Questions for Product Owner

| # | Question | Related Stories | Impact |
|---|----------|-----------------|--------|
| Q1 | What's the maximum number of line items we should support per template? | US-1 | UX/design decision |
| Q2 | Should we support different invoice dates for different line items within one template? | US-1 | Complexity increase |
| Q3 | How should we handle failed payment on a recurring invoice? | US-4, US-5 | Revenue operations |

### Stories Needing Clarification

| Story | Gap | Needed From |
|-------|-----|-------------|
| US-1 | Maximum line items | Product decision |
| US-4 | Failed payment handling | Product + engineering discussion |

---

**End of Worked Example**
