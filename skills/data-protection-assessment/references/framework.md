# Framework: Data Protection Assessment

This framework provides the systematic methodology for mapping all data in a SaaS product and assessing its protection. It covers the complete data lifecycle, classification tiers, PII identification, access control assessment, retention policies, and data flow diagramming — specifically tuned for SaaS products that integrate multiple third-party services.

## Methodology Overview

Most data protection efforts fail because they start with controls rather than inventory. You cannot protect what you have not mapped. This framework works in two phases: first, build a complete picture of what data exists and where it lives (the mapping phase); second, assess how that data is protected and what gaps remain (the protection phase). The merged approach ensures every data type has both a location and a protection assessment.

## Data Lifecycle Framework

Every piece of data in a SaaS system moves through six lifecycle phases. Assess each phase independently — a data type may be well-protected at rest but exposed in transit, or properly collected but never deleted.

### Phase 1: Collection

**What to assess:**
- Where is data collected? (User input forms, API imports, third-party webhooks, system-generated)
- What data is collected? (Enumerate specific fields, not just categories)
- Is collection minimized? (Only collecting what is needed for the stated purpose)
- Is the user informed about what is collected? (Privacy notice, consent mechanism)
- Is consent recorded and auditable?

**Controls that apply:**
- Input validation (prevent collection of malformed or excessive data)
- Consent management (record what was consented to, when, by whom)
- Data minimization enforcement (reject unnecessary fields at the API level)
- Collection point encryption (TLS on all forms and API endpoints)

**Common gaps:**
- Collecting more data than needed "just in case" (violates data minimization)
- No consent record — consent is assumed from account creation
- Third-party SDKs collecting data without explicit user awareness (analytics, error tracking)
- Browser fingerprinting or device data collected by analytics services without disclosure

### Phase 2: Storage

**What to assess:**
- Where is data stored? (Primary database, file storage, cache, third-party services, browser storage)
- Is data encrypted at rest? (What algorithm? Who holds the keys?)
- Is access controlled? (Who can read/write? Is access logged?)
- Is the storage compliant with data residency requirements? (Region, jurisdiction)
- Are backups encrypted and access-controlled?

**Controls that apply:**
- Encryption at rest (AES-256 for database, S3 server-side encryption)
- Access control lists (database-level RLS, IAM policies, VPC restrictions)
- Key management (who holds encryption keys? Are they rotated?)
- Data residency compliance (data stored in correct jurisdiction)
- Backup encryption (same or stronger than primary storage)

**Common gaps:**
- Primary database encrypted but third-party services storing unencrypted copies
- Backups not subject to same access controls as primary data
- Encryption keys stored alongside the encrypted data
- Cache layers (Redis, in-memory) holding sensitive data without access controls
- Browser localStorage storing auth tokens or user data without encryption

### Phase 3: Processing

**What to assess:**
- Which services process the data? (Application server, background jobs, AI APIs, payment processors)
- Is processing logged? (Audit trail of who processed what, when)
- Is data transformed during processing? (Anonymization, pseudonymization, aggregation)
- Does processing create new data that is more or less sensitive?
- Is data processed in memory only, or persisted during processing?

**Controls that apply:**
- Processing audit logs (who processed what data, when, why)
- Data transformation controls (anonymization before sharing, pseudonymization for analytics)
- Memory protection (sensitive data cleared from memory after processing)
- Processing environment isolation (sensitive processing does not share resources with less-trusted workloads)

**Common gaps:**
- AI APIs receiving raw user data without anonymization (prompts sent to OpenAI containing customer PII)
- Background jobs processing sensitive data without audit logging
- Temporary files created during processing (PDF generation, CSV exports) not cleaned up
- Processing combining data from multiple sources to create more sensitive derived records

### Phase 4: Sharing

**What to assess:**
- Which third parties receive data? (Payment processor, email service, analytics, AI APIs, CDN)
- What data do they receive? (Full records or only necessary fields?)
- What are their data handling commitments? (DPA, security certifications, retention policies)
- Is sharing minimized? (Only sharing what the third party needs)
- Is sharing logged and auditable?

**Controls that apply:**
- Data Processing Agreements (DPAs) with all third parties that receive PII
- Field-level filtering (send only necessary fields, not full records)
- Third-party security assessment (SOC 2, ISO 27001, PCI DSS compliance)
- Sharing audit logs (what was shared, with whom, when)
- API-level access controls (scoped API keys, least-privilege service accounts)

**Common gaps:**
- Email service receives full customer name + email + invoice content — more than needed for delivery
- Error tracking service captures full request payloads including PII in stack traces
- Analytics service receives user identifiers that were supposed to be anonymized
- AI API receives contextual data that includes customer information
- No DPAs in place with third-party services

### Phase 5: Retention

**What to assess:**
- How long is each data type actually kept? (Not the policy — the reality)
- Is there a defined retention period? (Regulatory requirement, business justification, or undefined)
- Is retention automated? (Auto-expiry, scheduled cleanup jobs, or manual deletion)
- Do third-party services have their own retention policies? (Stripe, Clerk, PostHog each retain data independently)
- Are backups subject to retention limits?

**Controls that apply:**
- Retention policy per data type (documented, justified, enforced)
- Automated retention enforcement (TTL on cache entries, scheduled deletion jobs, database partitioning with partition drops)
- Third-party retention alignment (ensure third parties delete data when you delete it)
- Backup retention limits (backups purged on a schedule, not kept indefinitely)

**Common gaps:**
- No defined retention period — data kept forever by default
- Retention policy exists on paper but is not enforced technically
- Third-party services retain data longer than your own policy
- Backups contain data that has been "deleted" from the primary store
- Logs retained indefinitely with no cleanup mechanism

### Phase 6: Deletion

**What to assess:**
- Can data be deleted on request? (Right to erasure / GDPR Article 17)
- Does deletion propagate to all copies? (Primary DB, backups, third-party services, caches, logs)
- Is deletion verified? (How do you confirm data is actually gone?)
- What is the deletion timeline? (Immediate, within 30 days, on next backup rotation?)
- Are there legal holds that prevent deletion? (Litigation hold, regulatory retention requirements)

**Controls that apply:**
- Deletion API or mechanism (user-facing "delete my account," admin deletion tools)
- Cascade deletion (deleting a user cascades to all their data across stores)
- Third-party deletion requests (API calls to delete data from Stripe, Clerk, PostHog, etc.)
- Deletion verification (audit log confirming deletion completed across all stores)
- Legal hold mechanism (ability to pause deletion when required by law)

**Common gaps:**
- Deletion only removes from primary database — copies persist in backups, logs, analytics, error tracking
- No mechanism to request deletion from third-party services
- "Soft delete" used everywhere — data is flagged but never actually removed
- Deletion does not propagate to file storage (orphaned files in S3)
- No deletion verification — no way to confirm data is actually gone

---

## Data Classification Tiers

Classify every data type into one of four tiers. Classification determines required controls — higher tiers require stricter protection. Classify based on the most sensitive interpretation (if data could be used to identify a person, classify it as PII even if that was not the intent).

### Tier 1: Public

**Definition:** Data intended for public consumption. No harm if disclosed.

**Examples in SaaS context:**
- Product marketing content
- Public API documentation
- Published pricing tiers
- Public user profiles (if user opted in)
- Open-source code

**Required controls:**
- Integrity protection (prevent unauthorized modification)
- Availability (ensure data remains accessible)
- No encryption requirement at rest
- No access control requirement for reading

### Tier 2: Internal

**Definition:** Data not intended for public consumption but with minimal harm if disclosed. Internal operations and business data.

**Examples in SaaS context:**
- Internal feature flags and configuration
- Aggregated analytics (total users, revenue trends — no individual records)
- System health metrics
- Application logs (without PII — see caveat below)
- Internal documentation and runbooks

**Required controls:**
- Access limited to authenticated team members
- Basic access logging
- Encryption in transit (TLS)
- No encryption at rest required (recommended)
- Regular access review (quarterly)

### Tier 3: Confidential

**Definition:** Data that would cause harm to the business or individuals if disclosed. Includes PII, financial data, and business-sensitive information.

**Examples in SaaS context:**
- User names, email addresses, phone numbers
- Invoice data, billing addresses, payment amounts
- Customer lists and CRM data
- Business financial records (revenue, costs, margins)
- User-generated content (documents, files, notes)
- API keys and service credentials
- Database connection strings

**Required controls:**
- Encryption at rest (AES-256 or equivalent)
- Encryption in transit (TLS 1.2+)
- Role-based access control with principle of least privilege
- Access logging and audit trail
- Defined retention period with automated enforcement
- Deletion mechanism supporting right to erasure
- Backup encryption matching or exceeding primary storage
- Regular access review (monthly)
- Data Processing Agreements with third parties that receive this data

### Tier 4: Restricted

**Definition:** Data that would cause severe harm if disclosed. Requires the highest level of protection. Regulatory consequences for mishandling.

**Examples in SaaS context:**
- Social security numbers, government-issued IDs
- Bank account numbers, credit card numbers (PCI scope)
- Health records (HIPAA scope)
- Password hashes, authentication tokens, session secrets
- Encryption keys, master secrets
- OAuth refresh tokens, API master keys
- Biometric data

**Required controls:**
- All Confidential controls plus:
- Column-level or field-level encryption where possible
- Key management with hardware security module (HSM) or dedicated KMS
- Multi-factor authentication for human access
- Access requires explicit justification (break-glass procedure)
- Real-time monitoring and alerting on access
- Quarterly access certification
- Penetration testing of systems storing this data
- Incident response plan specific to this data type
- If possible, avoid storing this data at all (delegate to specialized services — e.g., Stripe for payment data, Clerk for credentials)

---

## PII Identification Guide

PII (Personally Identifiable Information) is any data that can be used to identify a specific individual, either directly or in combination with other data. In a SaaS context, PII appears in more places than most teams realize.

### Direct Identifiers

Data that can identify a person on its own:

| Identifier | Risk Level | Common Locations in SaaS |
|-----------|-----------|------------------------|
| Full name | Confidential | User table, invoices, client records, email templates, PDF exports |
| Email address | Confidential | User table, auth provider, email service, analytics events, error logs, newsletter lists |
| Phone number | Confidential | User table, SMS notifications, 2FA recovery |
| Mailing address | Confidential | Billing records, invoices, shipping data, PDF exports |
| Government ID (SSN, passport) | Restricted | Tax forms, identity verification (avoid storing — delegate to specialized service) |
| Bank account number | Restricted | Payout configuration (avoid storing — delegate to Stripe Connect or similar) |
| Credit card number | Restricted | Never store directly — PCI DSS scope (delegate to Stripe, Braintree, etc.) |

### Indirect Identifiers

Data that can identify a person when combined with other data:

| Identifier | Risk Level | Common Locations in SaaS |
|-----------|-----------|------------------------|
| IP address | Internal-Confidential | Access logs, analytics, rate limiting, error tracking |
| Device fingerprint | Internal-Confidential | Analytics, fraud detection, session management |
| User agent string | Internal | Access logs, analytics, error tracking |
| Geolocation | Confidential | Analytics, content personalization, compliance (data residency) |
| Behavioral data (clicks, page views, feature usage) | Internal | Analytics service, product analytics, A/B testing |
| Cookie identifiers | Internal-Confidential | Browser, analytics, session management |
| Account creation date + location | Confidential (in combination) | User table, analytics |

### Sensitive PII

Data that requires additional protection due to potential for financial or physical harm:

| Data Type | Risk Level | Regulatory Scope |
|----------|-----------|-----------------|
| Financial account data | Restricted | PCI DSS, state financial regulations |
| Income/salary data | Confidential | Financial privacy laws |
| Transaction history | Confidential | Financial privacy laws, tax regulations |
| Credit score / financial status | Restricted | FCRA (US), financial privacy laws |
| Health information | Restricted | HIPAA (US), GDPR Article 9 (EU) |
| Biometric data | Restricted | BIPA (Illinois), GDPR Article 9 |

### Special Category Data (GDPR Article 9)

Data requiring explicit consent and enhanced protection under GDPR:

- Racial or ethnic origin
- Political opinions
- Religious or philosophical beliefs
- Trade union membership
- Genetic data
- Biometric data for identification
- Health data
- Sex life or sexual orientation

**Handling guidance:** Most SaaS products should NOT collect special category data. If your system collects it (e.g., health-tech, HR-tech), flag it immediately and ensure explicit consent mechanisms are in place.

---

## Access Control Assessment Methodology

### Principle of Least Privilege Evaluation

For each actor (human role, service, third-party integration) that accesses data:

1. **What data does it access?** (Enumerate specific data types, not just "the database")
2. **What level of access does it have?** (Read, write, delete, admin)
3. **What does it NEED to access?** (Minimum required for its function)
4. **Is there a gap?** (Does it access more than it needs?)
5. **How is access enforced?** (Database RLS, application middleware, IAM policy, API key scope)
6. **Is access logged?** (Can you audit who accessed what, when?)

### Access Matrix Construction

Build a matrix with data types as rows and actors as columns:

```
| Data Type (Sensitivity) | App User (Owner) | App User (Viewer) | API Server | Background Jobs | Stripe | Auth Provider | Analytics | Error Tracking |
|------------------------|-----------------|-------------------|-----------|----------------|--------|--------------|-----------|---------------|
| User profile (Conf.)   | R/W own         | R shared          | R/W       | R              | -      | R/W          | -         | -             |
| Invoice data (Conf.)   | R/W own         | R shared          | R/W       | R/W            | Partial| -            | -         | -             |
| Payment data (Restr.)  | R own status    | -                 | R status  | R status       | R/W    | -            | -         | -             |
```

**Access level codes:**
- `-` No access
- `R` Read only
- `R/W` Read and write
- `R/W/D` Read, write, and delete
- `Admin` Full access including schema changes
- `Partial` Only specific fields (specify which)
- `own` Only their own records
- `shared` Only records explicitly shared with them

### Access Control Gap Patterns

Common patterns that indicate access control problems:

1. **Flat access:** All authenticated users can access all data (no row-level isolation)
2. **Overprivileged services:** Background job has admin database access when it only needs read access to specific tables
3. **Third-party over-sharing:** Sending full records to a service that only needs one field
4. **Shared credentials:** Multiple services using the same database credentials (cannot audit or revoke individually)
5. **No access logging:** Cannot determine who accessed sensitive data after the fact
6. **Access without justification:** Users or services with access to Restricted data without a documented business need

---

## Retention Policy Framework

### Regulatory Minimums

| Data Type | Regulation | Minimum Retention | Maximum Retention |
|----------|-----------|------------------|------------------|
| Financial records (invoices, transactions) | Tax law (varies by jurisdiction) | 3-7 years (US: 7yr IRS, EU: varies by country) | No maximum, but data minimization applies |
| Employment records | Labor law | 3-7 years after termination | Varies by jurisdiction |
| Health records | HIPAA | 6 years | State laws may require longer |
| General PII | GDPR | No minimum | Only as long as necessary for stated purpose |
| Payment card data | PCI DSS | No minimum | As short as possible; tokenize instead of storing |
| User credentials | Best practice | Duration of account | Delete on account closure |
| Access logs | SOC 2, ISO 27001 | 1 year (typical) | 2-3 years for compliance |
| Application logs | Best practice | 30-90 days | 1 year maximum (contains incidental PII) |

### Business Justification Categories

When no regulation requires retention, justify retention by business need:

1. **Operational need:** Data required for the product to function (e.g., user profile for active accounts)
2. **Analytical need:** Data required for business analytics (anonymize or aggregate after use)
3. **Legal hold:** Data preserved due to pending or anticipated litigation
4. **Contractual obligation:** Data retained per customer contract terms
5. **No justification:** Data retained "just in case" — this is a gap. Define a retention period or delete.

### Deletion Mechanism Requirements

A complete deletion mechanism must:

1. **Cover all data stores:** Primary database, file storage, caches, third-party services, logs, backups
2. **Be verifiable:** Produce an audit record confirming deletion across all stores
3. **Handle dependencies:** Delete or anonymize related records (cascade or orphan handling)
4. **Respect legal holds:** Pause deletion when required by law
5. **Include third-party propagation:** Trigger deletion in external services via API (Stripe Customer deletion, Clerk user deletion, analytics data removal request)
6. **Complete within a defined timeline:** GDPR requires response within 30 days

---

## Data Flow Diagramming

### How to Trace Data Through the System

For each user journey:

1. **Start at the collection point:** Where does the user (or system) input data?
2. **Follow each hop:** Which service receives the data next? What data is passed?
3. **Classify at each hop:**
   - What sensitivity level is the data at this point?
   - Is it encrypted in transit?
   - Does the receiving service need all the fields it receives?
4. **Mark trust boundaries:** Where does data cross between:
   - Browser and server
   - Server and third-party API
   - Server and file storage
   - Internal service and external service
   - Different security zones (public internet, private network, database tier)
5. **Note transformations:** Where is data anonymized, enriched, aggregated, or split?
6. **End at storage or deletion:** Where does the data ultimately land? Or is it ephemeral?

### Diagram Format

```
Step N: [Source] → [Destination] | Data: [specific fields] | Sensitivity: [tier] | Encrypted: [Y/N] | PII: [Y/N]
---[TRUST BOUNDARY: description]---
```

Example:
```
Step 1: User (browser) → API Server | Data: name, email, invoice items | Sensitivity: Confidential | Encrypted: Y (TLS) | PII: Y
---[TRUST BOUNDARY: Browser → Server]---
Step 2: API Server → Supabase | Data: user_id, invoice record | Sensitivity: Confidential | Encrypted: Y (TLS + at rest) | PII: Y
Step 3: API Server → Resend | Data: recipient email, invoice link | Sensitivity: Confidential | Encrypted: Y (TLS) | PII: Y (email)
---[TRUST BOUNDARY: Server → External Email Service]---
```

---

## Edge Cases

### Data in Third-Party Services

Third-party services are data stores that you do not control. For each third party:

1. What data do they receive from you?
2. What data do they generate about your users? (Analytics services generate behavioral profiles. Error tracking generates stack traces. Payment processors generate transaction records.)
3. What is their retention policy? (You may delete data on your end, but Stripe retains transaction records per financial regulations.)
4. What is their security posture? (SOC 2, PCI DSS, ISO 27001 certifications)
5. Do you have a Data Processing Agreement in place?
6. Can you request deletion of your users' data from their system?

### Data in Logs

Application logs are the most commonly overlooked data store:

- Logs may contain user emails, IPs, request bodies with PII, error messages with stack traces that include user data
- Logs are typically stored with broad read access (any developer can search logs)
- Logs are rarely encrypted at rest
- Log retention is often indefinite or very long (1+ year)
- There is usually no mechanism to delete a specific user's data from logs

**Mitigation:** Implement structured logging with PII filtering. Redact sensitive fields before they enter the log pipeline. Set log retention to 90 days maximum. If longer retention is needed, anonymize logs before archival.

### Data in Backups

Backups create shadow copies of all data, including data that has been "deleted" from the primary store:

- A user requests account deletion → you delete from the database → the next backup still contains their data → all backups for the retention period contain their data
- Backup encryption is often different from (and weaker than) primary storage encryption
- Backup access controls are often broader than primary storage (the ops team needs backup access but may not have production database access)

**Mitigation:** Document backup retention periods. Accept that deleted data persists in backups for the backup retention period. If this is unacceptable, implement backup-level redaction or more frequent backup rotation.

### Data in Analytics

Analytics services create a parallel data store that mirrors user activity:

- PostHog, Mixpanel, Amplitude, Google Analytics all store user-level event data
- This data often includes user identifiers (user ID, email, IP), even when intended to be anonymous
- Analytics data is typically retained for 12-24 months
- Deletion from analytics services is possible but complex (requires API calls per user)
- Analytics data combined with other data sources can re-identify "anonymous" users

**Mitigation:** Use pseudonymous identifiers in analytics (internal user ID, not email). Avoid sending PII as event properties. Check analytics service deletion APIs. Include analytics deletion in the right-to-erasure flow.

---

## Sources

This framework draws from:

- **NIST SP 800-122** — Guide to Protecting the Confidentiality of Personally Identifiable Information (PII). Used for PII identification and classification methodology.
- **ISO 27001 Annex A** — Information security controls reference. Used for access control, encryption, and retention control categories.
- **GDPR Article 30** — Records of Processing Activities. Used for data inventory structure and processing mapping requirements.
- **GDPR Articles 17, 25** — Right to Erasure and Data Protection by Design. Used for deletion mechanism and data minimization requirements.
- **OWASP Data Classification** — Used for sensitivity tier definitions adapted to SaaS context.
- **PCI DSS v4.0** — Payment Card Industry Data Security Standard. Used for payment data handling requirements.
- **NIST Cybersecurity Framework** — Used for the identify-protect-detect-respond-recover structure applied to data lifecycle phases.

Adapted specifically for AI-assisted analysis of SaaS products where the evaluator has access to architecture documentation and public information about third-party services, and where practical implementability matters more than theoretical completeness.
