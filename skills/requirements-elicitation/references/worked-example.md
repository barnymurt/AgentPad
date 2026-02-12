# Worked Example: Requirements Elicitation

This example demonstrates the Requirements Elicitation skill applied to a SaaS onboarding flow feature.

## Scenario

**Product:** PulseBoard — a customer analytics SaaS for e-commerce brands
**Target Market:** D2C e-commerce brands ($1M-50M revenue) using Shopify or WooCommerce
**Stage:** Early revenue, 50 paying customers, building out self-service onboarding
**Context provided:** User wants to replace manual onboarding (currently a sales call + CSV import) with a self-service flow.

## Input

> "Right now we onboard every customer manually — they have a call with us, we help them connect their Shopify store, and we import their data. It takes 2-3 days and doesn't scale. I need a self-service onboarding flow where they can sign up, connect their store, and start seeing their dashboard without talking to anyone. Our customers are e-commerce brand owners — not super technical but they use Shopify every day."

## Reasoning

### Step 1: Understand the Source Material

Input type: Feature brief with some context. User has described the problem (manual onboarding doesn't scale) and the desired outcome (self-service). Missing: specific steps, edge cases, non-functional requirements, success criteria.

Key unknowns:
- Must-know-now: What does the onboarding flow include? Just Shopify, or WooCommerce too? What data is imported?
- Can-assume-and-validate: Auth method (OAuth for sign-up, Shopify OAuth for connection), progressive disclosure (don't ask for everything upfront)
- Defer: Exact copy, specific UI layout

### Step 2: Elicit Through Structured Questions

Asked in batches:

**Batch 1 (User & Problem):** Who signs up? (Brand owner or marketing manager). What's the first thing they need to see? (Revenue dashboard with last 30 days). What makes them abandon onboarding today? (Too many steps, unclear value)

**Batch 2 (Scope):** Shopify only or WooCommerce too? (Shopify first, WooCommerce later). What's imported? (Orders, customers, products). Do they need to configure anything or is it automatic? (Automatic with optional filters).

**Batch 3 (Edge Cases):** What if Shopify connection fails? What if their store has no orders yet? What if they already have an account (re-onboarding)?

### Step 3-6: Write, Classify, and Validate

Produced full requirements below.

## Output

---

# Requirements Document: Self-Service Onboarding Flow

## 1. Context

### Problem Statement
PulseBoard currently onboards every customer through a manual sales call and CSV import, taking 2-3 days per customer. This doesn't scale past 50 customers and creates a bottleneck on the sales team. Customers need a self-service flow where they can sign up, connect their Shopify store, and start seeing analytics data without human assistance — targeting completion in under 10 minutes.

**Current solution:** Manual call with sales team → Shopify API credentials shared over email → CSV export/import by engineering → Dashboard provisioned manually. Painful, slow, error-prone.

**Target users:**
- **Primary:** E-commerce brand owner or marketing manager. Not highly technical but uses Shopify daily. Comfortable with OAuth flows ("Connect with Shopify" buttons). Wants to see value immediately.
- **Secondary:** PulseBoard admin/support team. Needs visibility into onboarding funnel, ability to intervene when users get stuck.

### Scope

**In scope:**
- New user sign-up (email + password, Google OAuth)
- Shopify store connection via Shopify OAuth
- Automatic data import (orders, customers, products)
- First-value moment: revenue dashboard populated with data
- Onboarding progress indicator
- Error handling and recovery for common failure scenarios

**Out of scope:**
- WooCommerce integration (Phase 2)
- Custom data source connections
- Team invitations (separate feature)
- Billing setup (handled separately post-trial)
- Data transformation or custom metrics (post-onboarding feature)

**Constraints:**
- Must use Shopify OAuth 2.0 (mandatory per Shopify Partner requirements)
- Initial data import must complete within 5 minutes for stores with <50K orders
- Must work on Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile-responsive (e-commerce owners frequently work from phones/tablets)

## 2. Functional Requirements

### Sign-Up

#### FR-001: Account Creation
- **User story:** As a new user, I want to create a PulseBoard account so that I can start connecting my store.
- **Priority:** Must
- **Acceptance criteria:**
  - Given I am on the sign-up page, When I enter a valid email and password (8+ chars, 1 number, 1 uppercase), Then an account is created and I am logged in
  - Given I am on the sign-up page, When I click "Continue with Google," Then I am authenticated via Google OAuth and an account is created
  - Given I enter an email already registered, When I submit the form, Then I see "An account with this email already exists" with a link to log in
- **Edge cases:**
  - Email with a + alias (user+test@gmail.com) — must accept as valid
  - User abandons mid-signup and returns later — email should not be "taken" until signup is complete
- **Notes:** No email verification required before proceeding to onboarding (reduces friction). Verification email sent in background, enforced before trial expires.

#### FR-002: Onboarding Entry Point
- **User story:** As a newly signed-up user, I want to be guided immediately into the onboarding flow so that I don't have to figure out what to do next.
- **Priority:** Must
- **Acceptance criteria:**
  - Given I have just created an account, When the sign-up completes, Then I am redirected to the onboarding flow (not the empty dashboard)
  - Given I started onboarding but didn't finish, When I log back in, Then I resume onboarding at the step I left off

### Store Connection

#### FR-003: Shopify Store Connection
- **User story:** As a new user, I want to connect my Shopify store by clicking a button so that PulseBoard can access my store data.
- **Priority:** Must
- **Acceptance criteria:**
  - Given I am on the "Connect your store" step, When I click "Connect Shopify," Then I am redirected to Shopify's OAuth consent screen
  - Given I approve the Shopify OAuth request, When Shopify redirects back to PulseBoard, Then a success message is shown and the next step activates
  - Given I deny the Shopify OAuth request, When Shopify redirects back, Then I see a clear message explaining why the connection is needed with a "Try Again" button
- **Edge cases:**
  - User has multiple Shopify stores — must select which one to connect (show store name during OAuth)
  - Shopify is temporarily down — show "Shopify is currently unavailable, please try again in a few minutes" with retry button
  - User's Shopify plan doesn't support the required API scopes — show specific error with instructions
- **Dependencies:** Shopify Partner account and app listing (D1)

#### FR-004: Connection Status Indicator
- **User story:** As a user, I want to see whether my store is connected so that I know if data is flowing.
- **Priority:** Should
- **Acceptance criteria:**
  - Given my Shopify store is connected, When I view my account settings, Then I see a green "Connected" badge with the store name
  - Given the connection has expired or been revoked, When I view my settings, Then I see a red "Disconnected" badge with a "Reconnect" button

### Data Import

#### FR-005: Automatic Data Import
- **User story:** As a user who just connected their store, I want my data to import automatically so that I don't have to do anything manually.
- **Priority:** Must
- **Acceptance criteria:**
  - Given I have connected my Shopify store, When the OAuth flow completes, Then data import begins automatically within 30 seconds
  - Given data import is in progress, When I view the onboarding screen, Then I see a progress indicator showing what's being imported (orders, customers, products) and percentage complete
  - Given the import completes, When all data is processed, Then I am automatically advanced to the dashboard with my data visible
- **Edge cases:**
  - Store has 0 orders (brand new store) — show dashboard with "No data yet" state and a message: "We'll start showing insights as orders come in"
  - Store has >50K orders — show estimated time ("This may take up to 15 minutes for large stores") and allow user to proceed to dashboard while import continues in background
  - Import fails mid-way (API error) — retry 3 times with exponential backoff, then show error with "Contact support" and store partial data

#### FR-006: Import Progress Communication
- **User story:** As a user waiting for data to import, I want to see meaningful progress updates so that I know the system is working.
- **Priority:** Should
- **Acceptance criteria:**
  - Given import is in progress, When I view the onboarding screen, Then I see: current step (e.g., "Importing orders..."), items imported count, estimated time remaining
  - Given import has been running for >5 minutes, When I view the screen, Then I see an option to "Continue to dashboard" while import finishes in background

### First-Value Moment

#### FR-007: Dashboard Population
- **User story:** As a user who has completed onboarding, I want to see my revenue dashboard immediately so that I get value from PulseBoard right away.
- **Priority:** Must
- **Acceptance criteria:**
  - Given data import is complete, When I land on the dashboard, Then I see: total revenue (last 30 days), order count, average order value, and a revenue trend chart
  - Given I have at least 30 days of order data, When I view the dashboard, Then the trend chart shows daily revenue for the last 30 days
- **Edge cases:**
  - Less than 30 days of data — show available data period with a note: "Showing data since [first order date]"

## 3. Non-Functional Requirements

### NFR-001: Performance
- **Requirement:** The onboarding flow (sign-up through dashboard) must be completable in under 10 minutes for stores with <10K orders.
- **Metric:** Time from sign-up button click to dashboard with data visible
- **Priority:** Must

### NFR-002: Security
- **Requirement:** Shopify OAuth tokens must be encrypted at rest (AES-256) and never exposed to the client. All API communication over TLS 1.3. Password hashing with bcrypt (cost factor 12+).
- **Standard:** OWASP Top 10 compliance, Shopify Partner API security requirements
- **Priority:** Must

### NFR-003: Scalability
- **Requirement:** Onboarding flow must handle 50 concurrent new users without degradation. Data import pipeline must handle 10 concurrent imports.
- **Metric:** No increase in response time or error rate at 50 concurrent onboarding sessions
- **Priority:** Should

### NFR-004: Reliability
- **Requirement:** If data import fails, partial data is preserved and import resumes from last checkpoint on retry. No data loss.
- **Metric:** Zero data loss on import failure; successful retry within 3 attempts
- **Priority:** Must

### NFR-005: Usability
- **Requirement:** Onboarding must be completable without documentation, support, or prior training. Mobile-responsive. WCAG 2.1 AA compliant.
- **Standard:** WCAG 2.1 AA, responsive design (360px minimum viewport)
- **Priority:** Must (responsive), Should (WCAG 2.1 AA)

## 4. Dependencies and Assumptions

### Dependencies

| ID | Dependency | Type | Impact if Unavailable |
|----|-----------|------|----------------------|
| D1 | Shopify Partner App listing approved | External | Cannot start Shopify OAuth — onboarding blocked entirely |
| D2 | Data import pipeline (background jobs) | Internal | Cannot import data — manual import fallback needed |
| D3 | Dashboard feature (basic revenue view) | Internal | No first-value moment — onboarding leads to empty screen |
| D4 | Authentication system (email/password + Google OAuth) | Internal | Cannot create accounts |

### Assumptions

| ID | Assumption | Confidence | Risk if Wrong |
|----|-----------|------------|---------------|
| A1 | Users will complete onboarding in one session | [M] | Need "resume onboarding" flow (covered in FR-002) |
| A2 | Shopify OAuth approval takes <5 business days | [M] | Delays launch; apply early |
| A3 | Average Shopify store has 5K-20K orders | [M] | If much higher, import times exceed 5-minute target |
| A4 | Users trust "Connect with Shopify" buttons (familiar OAuth flow) | [H] | Would need alternative connection method |
| A5 | Email verification can be deferred without security risk | [M] | Could get spam accounts; add rate limiting |

### Integration Points

| System | Integration Type | Data Flow | Requirements |
|--------|-----------------|-----------|-------------|
| Shopify | OAuth 2.0 + REST API | Inbound (orders, customers, products) | Read scope for orders, customers, products; webhook for new orders |
| Google | OAuth 2.0 | Inbound (auth only) | Profile scope for email and name |
| Email service (SendGrid/Postmark) | API | Outbound (verification, welcome email) | Transactional email sending |

## 5. Priority Matrix

### Must Have
| ID | Requirement | Rationale |
|----|------------|-----------|
| FR-001 | Account creation | Cannot onboard without an account |
| FR-002 | Onboarding entry point | Users must be guided, not dropped into empty dashboard |
| FR-003 | Shopify connection | Core integration — entire product depends on store data |
| FR-005 | Automatic data import | Replaces the manual process — primary goal of this feature |
| FR-007 | Dashboard population | First-value moment — proves the product works |
| NFR-001 | Performance (<10 min) | Longer onboarding = abandonment |
| NFR-002 | Security (OAuth tokens, encryption) | Handling financial/customer data — non-negotiable |
| NFR-004 | Reliability (no data loss) | Losing customer data destroys trust |

### Should Have
| ID | Requirement | Rationale |
|----|------------|-----------|
| FR-004 | Connection status indicator | Users need to verify connection — but not launch-critical |
| FR-006 | Import progress communication | Reduces anxiety during waiting — improves completion rate |
| NFR-003 | Scalability (50 concurrent) | Current growth rate unlikely to hit this soon |
| NFR-005 | WCAG 2.1 AA | Important but can be achieved iteratively |

### Could Have
| ID | Requirement | Rationale |
|----|------------|-----------|
| - | Animated onboarding tutorial | Nice UX polish but not needed for completion |
| - | "Invite team member" step at end of onboarding | Team invitations are a separate feature |

### Won't Have This Version
| ID | Requirement | Why Deferred |
|----|------------|-------------|
| - | WooCommerce connection | Shopify first; WooCommerce is Phase 2 |
| - | Custom data source connections | Too complex for MVP; requires ingestion framework |
| - | Onboarding A/B testing | Need baseline data first |
| - | Multi-store support | Edge case (<5% of users); handle manually for now |

### Priority Distribution
- Must: 8 requirements (62%)
- Should: 4 requirements (31%)
- Could: 2 requirements (7%)
- **Assessment:** Distribution is healthy. Must-haves are genuinely required for a functional self-service onboarding. No scope bloat.

## 6. Open Questions

| # | Question | Impact | Needed By | Suggested Default |
|---|---------|--------|-----------|-------------------|
| Q1 | Should we show a "skip for now" option on the Shopify connection step? | Affects whether users can explore the dashboard without data. Changes empty-state requirements. | Before dev starts | No — the product has no value without data. Guide them to connect. |
| Q2 | What historical data period should we import? (All-time vs. last 12 months) | Affects import time and storage costs. Large stores with years of data could have very long imports. | Before data pipeline design | Last 12 months by default, with option to request full history. |
| Q3 | Do we need to handle Shopify stores that are on Shopify Lite (limited API access)? | Some API endpoints may not be available. Could cause import failures for a subset of users. | Before Shopify app submission | Check Shopify Lite API limitations and either support or show a clear "upgrade your Shopify plan" message. |

---

## Quality Check

- [x] Every functional requirement has a user story AND acceptance criteria (Given/When/Then)
- [x] Edge cases identified for every requirement (empty stores, failed connections, abandoned flows)
- [x] Non-functional requirements cover performance, security, scalability, reliability, usability
- [x] SaaS-specific requirements addressed (OAuth integration, data isolation implicit in tenant model, import pipeline)
- [x] Assumptions listed with confidence and risk (A1-A5)
- [x] MoSCoW priorities assigned to all requirements
- [x] Open questions flagged (Q1-Q3) — not silently resolved
- [x] All acceptance criteria are testable (specific, measurable)
