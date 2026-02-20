---
name: data-protection-assessment
description: Map all data in a SaaS product and assess how it is protected. Use when the user asks about data protection, data inventory, PII exposure, data handling practices, data retention policies, data access controls, data processing mapping, or what data their system collects and where it goes. Covers data inventory, data flow classification, PII lifecycle tracking, access control assessment, retention policy evaluation, and prioritized protection recommendations.
---

# Data Protection Assessment

Produce a complete data inventory and protection assessment for SaaS products, covering what data exists, where it lives, who can access it, how long it is kept, and what controls protect it. This is the merged skill that replaces separate "data processing mapping" and "data protection" analyses — it handles both the "what data do we have" mapping AND the "how do we protect it" assessment in a single pass, eliminating the 60% overlap between those concerns. Unlike raw LLM output that lists generic data protection advice, this skill traces every data type through the entire system — including third-party services — and produces specific, prioritized protection recommendations grounded in the actual architecture and data sensitivity.

## Core Workflow

### Step 1: Gather Data Context from Architecture Design

Pull data context from the Architecture Design output if available:

1. **Load architecture inputs:**
   - Extract `context.architecture.data_flows` — data flow diagrams with trust boundaries and sensitivity classification
   - Extract `context.architecture.storage` — databases, file storage, caching, data classification per store
   - Extract `context.architecture.containers` — all containers with technology choices and responsibilities
   - Extract `context.architecture.auth_design` — auth approach, roles, permissions
   - Extract `context.architecture.system_context` — external actors and dependencies
2. **Load security baseline inputs (if available):**
   - Extract `context.security_baseline` — requirements checklist, especially data protection requirements
3. **If no architecture context exists:** Ask the user: "What does your product do, what data does it handle, what tech stack are you using, and which third-party services do you integrate with?" Do not proceed without understanding the data landscape.
4. **Identify all data stores:** Not just the primary database — enumerate every place data lives: primary database, file storage, cache layers, third-party services (payment processor, auth provider, analytics, error tracking, email service, AI APIs), browser local storage, logs, backups.

### Step 2: Build Complete Data Inventory

Catalog every data type in the system:

1. **For each data type, document:**
   - What the data is (name and description)
   - Where it is stored (which data store or service)
   - Sensitivity level (Public, Internal, Confidential, Restricted — per the classification tiers in [references/framework.md](references/framework.md))
   - How it is collected (user input, system generated, imported, received from third party)
   - Legal basis for collection (consent, contract performance, legitimate interest)
   - Owner/responsible party (which team or role is responsible for this data)
2. **Include ALL data stores:**
   - Primary database (obvious)
   - Third-party services: payment processor (Stripe stores card data, customer IDs, transaction history), auth provider (Clerk/Auth0 stores user credentials, session data), analytics (PostHog/Mixpanel stores usage events, IP addresses, device info), error tracking (Sentry stores stack traces that may contain user data), email service (Resend/SendGrid stores recipient addresses, email content), AI APIs (OpenAI stores prompts that may contain user data)
   - File storage (S3/R2 — PDFs, uploads, exports)
   - Caches and queues (Redis, in-memory — transient but still data)
   - Browser storage (localStorage, cookies, sessionStorage)
   - Logs (application logs, access logs, audit logs)
   - Backups (where, how long, encrypted?)
3. **Flag data that appears in multiple stores** — this is where PII sprawl happens.

**Encryption Standards Reference:**

| Data State | Recommended | Minimum |
|-----------|-------------|---------|
| At Rest - Database | AES-256 | AES-128 |
| At Rest - Files | AES-256 | AES-128 |
| In Transit - API | TLS 1.3 | TLS 1.2 |
| Backups | AES-256 + separate key | AES-128 |
| Passwords | bcrypt/Argon2 | PBKDF2 |

**Key Management:**
- Use KMS (AWS KMS, Azure Key Vault, GCP Secret Manager)
- Rotate keys annually (quarterly for sensitive)
- Least privilege access to keys
- Never store keys in code

---

### Step 3: Map Data Flows with Classification

Trace data through the system with sensitivity classification at every hop:

1. **For each user journey** (from Architecture Design or user input):
   - Trace the data from collection through processing to storage and any sharing
   - Classify sensitivity at each hop (data may change classification — e.g., aggregated data is less sensitive than individual records)
   - Mark trust boundaries where data crosses between systems
   - Flag PII at every point it appears in the flow
2. **Map data-at-rest AND data-in-transit:**
   - At rest: Where does it land? Encrypted? Access-controlled?
   - In transit: What protocol? Encrypted? Authenticated?
3. **Map data transformations:**
   - Where is data anonymized, pseudonymized, aggregated, or enriched?
   - Where does raw PII get combined with other data to create more sensitive combined records?
4. **Produce a data flow diagram per journey** with classification labels at each hop and trust boundaries marked.

### Step 4: Identify PII Exposure Points

Trace every PII type through its complete lifecycle:

1. **Identify all PII types** in the system using the PII identification guide in [references/framework.md](references/framework.md):
   - Direct identifiers (name, email, phone, address, government IDs)
   - Indirect identifiers (IP address, device fingerprint, location, behavioral data)
   - Sensitive PII (financial data, health data, biometric data)
   - Special category data (racial/ethnic origin, political opinions, religious beliefs, trade union membership)
2. **For each PII type, map:**
   - Where it is collected (entry point)
   - Where it is processed (which services touch it)
   - Where it is stored (which data stores hold it)
   - Where it is shared (which third parties receive it)
   - Where it crosses trust boundaries
3. **Assess exposure risk per PII type:**
   - How many systems hold this PII? (more copies = more risk)
   - Is it encrypted at rest and in transit?
   - Who has access? Is access logged?
   - Is there a deletion mechanism for this specific PII type?
4. **Assign an exposure rating:** Low (well-contained, encrypted, access-controlled), Medium (multiple copies, some controls missing), High (widespread, minimal controls, crosses trust boundaries without protection).

### Step 5: Assess Access Controls

Evaluate who and what has access to each data type:

1. **Build an access control matrix:**
   - Rows: data types (grouped by sensitivity level)
   - Columns: actors (human users by role, services, third-party integrations, background jobs)
   - Cells: access level (none, read, write, delete, admin) and enforcement mechanism
2. **Evaluate enforcement mechanisms:**
   - Database-level: Row-level security, column-level encryption, connection restrictions
   - Application-level: Role-based access control, attribute-based access control, API authentication
   - Infrastructure-level: Network segmentation, IAM policies, VPC boundaries
   - Third-party: What access does each external service have? Can they access more than they need?
3. **Identify gaps:**
   - Is the principle of least privilege followed? Does anything have more access than it needs?
   - Are there shared credentials or overly broad permissions?
   - Is access to Confidential/Restricted data logged and auditable?
   - Can a compromised component access data it should not reach?
4. **Flag specific violations:** Name the exact component, the data it accesses, and why the access is excessive.

### Step 6: Evaluate Retention and Deletion

Assess how long data is kept and whether it can be removed:

1. **For each data type, document:**
   - Current retention period (how long is it actually kept?)
   - Recommended retention (based on regulatory requirements and business need — see [references/framework.md](references/framework.md))
   - Retention justification (legal requirement, business need, or no justification)
   - Deletion mechanism (does one exist? Is it automated or manual? Does it work?)
2. **Evaluate right-to-erasure support:**
   - Can a user request deletion of all their data?
   - Which data stores are covered by the deletion mechanism?
   - Which are NOT covered? (Common gaps: backups, logs, third-party services, analytics, error tracking)
   - How long does deletion take? Is it propagated to all copies?
3. **Assess backup implications:**
   - Are backups subject to the same retention policies?
   - If a user requests deletion, is their data removed from backups?
   - How long do backups persist after the primary data is deleted?
4. **Flag data with no defined retention policy** — indefinite retention of PII is a risk.

### Step 7: Produce Protection Recommendations

Synthesize findings into prioritized, specific recommendations:

1. **For each recommendation, specify:**
   - What the recommendation is (specific, actionable control)
   - What data it protects (specific data types)
   - Sensitivity level of that data (ties priority to data classification)
   - Current state (Implemented, Partial, Missing)
   - Effort to implement (S/M/L)
   - Priority (Critical, High, Medium, Low — derived from sensitivity x exposure x current state)
2. **Prioritize by:**
   - Data sensitivity (Restricted > Confidential > Internal > Public)
   - Exposure level (High exposure + missing controls = Critical priority)
   - Regulatory implications (PII without controls = higher priority than internal data without controls)
3. **Produce an overall data protection posture rating:**
   - **Strong:** All Restricted/Confidential data has encryption at rest and in transit, access controls enforced, retention policies defined, deletion mechanisms working, PII exposure contained
   - **Adequate:** Most critical data is protected, some gaps in access controls or retention, PII tracked but not fully contained
   - **Weak:** Significant gaps in data protection, PII exposure unmanaged, no retention policies, deletion not supported
4. **Write handoff notes** for Privacy Regulation Assessment — what compliance-relevant findings should that skill investigate further.

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Data Context** — architecture summary, data stores identified, data sensitivity overview
- **Data Inventory** — table of every data type with location, sensitivity, collection method, legal basis
- **Data Flow Map** — per-journey data flow with classification at each hop
- **PII Exposure Analysis** — PII types identified, lifecycle mapped, exposure ratings
- **Access Control Matrix** — who/what has access to which data, enforcement, gaps
- **Retention & Deletion Assessment** — per data type retention, deletion mechanism, right-to-erasure support
- **Protection Recommendations** — prioritized list with effort and current state
- **Data Protection Summary** — overall posture, top risks, handoff notes

Expected length: 3,000-5,000 words depending on the number of data stores and third-party services.

## Quality Criteria

- [ ] Data inventory covers ALL data stores including every third-party service (not just the primary database)
- [ ] PII mapped through its entire lifecycle: collection, processing, storage, sharing, deletion
- [ ] Access control matrix populated with specific actors, data types, and enforcement mechanisms
- [ ] Retention policies defined per data type with regulatory justification where applicable
- [ ] Protection recommendations are specific to the tech stack (not generic advice like "use encryption")
- [ ] Data flow classification shows sensitivity level at each hop, not just at rest
- [ ] Trust boundaries marked in every data flow diagram
- [ ] Third-party data handling assessed (what does Stripe store? what does Sentry capture? what does PostHog track?)
- [ ] Deletion mechanism assessed for right-to-erasure compliance across all data stores
- [ ] Output follows the schema in references/output-schema.md with all required sections populated

## References

- **Data lifecycle framework, classification tiers, and PII identification guide:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Inventorying only the primary database:** The most common failure mode. A typical SaaS product stores data in 5-10 places: primary database, file storage, auth provider, payment processor, analytics, error tracking, email service, AI APIs, caches, logs, backups. Missing third-party data stores like Stripe (stores card data, transaction history), Clerk (stores credentials, session data), PostHog (stores user events, IP addresses), and Sentry (stores stack traces that may contain user data) leaves critical PII exposure unmapped.

2. **Confusing data mapping with data protection:** This skill must do BOTH. Mapping data without assessing controls is an inventory exercise. Assessing controls without mapping data is guesswork. The merged workflow ensures every data type has both a location (where it lives) and a protection assessment (how it is secured). If your output has a data inventory but no access control matrix or protection recommendations, you have only done half the work.

3. **Treating all PII equally:** Email addresses, social security numbers, and financial account data have vastly different risk profiles. An exposed email list is embarrassing; exposed financial data triggers regulatory action and potential lawsuits. Use the data classification tiers (Public, Internal, Confidential, Restricted) and assess exposure risk per PII type, not as a blanket "PII found" flag.

4. **Missing data in transit:** Focusing only on data at rest (what is stored in the database) and ignoring data in transit (what moves between services). Data flowing from the API server to an email service contains PII. Data flowing to an AI API may contain confidential business data. Webhook payloads from payment processors contain financial data. Every hop in a data flow is an exposure point.

5. **Ignoring data in logs, errors, and analytics:** Application logs often contain user data that was never intended to be logged (query parameters with emails, error messages with stack traces containing PII, analytics events with user-identifiable information). These are some of the least-protected data stores in most systems — no encryption, broad access, long retention, no deletion mechanism. Always audit what ends up in logs, error tracking, and analytics services.
