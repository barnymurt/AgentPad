<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current data protection best practices, regulatory 
requirements, and skill methodology. Last reviewed: 2026-02-19 -->

# Worked Example: Data Protection Assessment — InvoiceFlow

## Scenario

InvoiceFlow is an AI-powered invoicing tool for freelance designers. This assessment consumes the Architecture Design output and evaluates how data is collected, processed, stored, and protected.

**Key data handled:**
- PII: Client names, emails, addresses, phone numbers
- Financial: Invoice amounts, payment history, bank account details, tax IDs
- System: User credentials, session tokens, API logs

**Tech stack:** Next.js 14 + Supabase + Clerk + Stripe + OpenAI + S3 + Resend

---

## Section 1: Data Context Summary

### 1a. Product Overview
- **Product name:** InvoiceFlow
- **Data handling summary:** Collects client PII for invoicing, processes payments via Stripe, stores financial records, uses AI for invoice suggestions
- **Input source:** Architecture Design output

### 1b. Data Stores Inventory

| Store | Technology | Data Types | Classification | Owner |
|-------|-----------|-----------|----------------|-------|
| User accounts | Supabase PostgreSQL | User profiles, auth data | Confidential | InvoiceFlow |
| Client records | Supabase PostgreSQL | Client PII, contact info | Confidential | InvoiceFlow |
| Invoices | Supabase PostgreSQL | Financial data, line items | Restricted | InvoiceFlow |
| Payments | Stripe (external) | Card data, bank accounts | Restricted | Stripe |
| Auth tokens | Clerk (external) | Credentials, sessions | Restricted | Clerk |
| AI prompts | OpenAI (external) | Invoice context | Internal | OpenAI |
| File storage | AWS S3 | Invoice PDFs, attachments | Confidential | InvoiceFlow |
| Email | Resend (external) | Recipient addresses, content | Internal | Resend |
| Analytics | PostHog (external) | Usage events, IP addresses | Internal | PostHog |
| Logs | Supabase/Resend | API calls, errors | Internal | InvoiceFlow |

---

## Section 2: Data Inventory

### 2a. Data Types Catalog

| Data Type | Description | Store | Sensitivity | Collection Method | Legal Basis | Owner |
|-----------|-------------|-------|-------------|-------------------|-------------|-------|
| User email | Account identification | Supabase | Confidential | User registration | Contract | InvoiceFlow |
| User password | Account access | Clerk | Restricted | User input | Contract | Clerk |
| Client name | Invoice recipient | Supabase | Confidential | User input | Consent | InvoiceFlow |
| Client email | Invoice delivery | Supabase | Confidential | User input | Consent | InvoiceFlow |
| Client address | Invoice shipping | Supabase | Confidential | User input | Consent | InvoiceFlow |
| Client phone | Contact | Supabase | Internal | User input | Consent | InvoiceFlow |
| Invoice amount | Financial value | Supabase | Restricted | User input | Contract | InvoiceFlow |
| Bank account | Payout processing | Supabase | Restricted | User input | Contract | InvoiceFlow |
| Tax ID | Legal requirement | Supabase | Restricted | User input | Legal obligation | InvoiceFlow |
| Payment status | Transaction result | Stripe | Restricted | Stripe webhook | Contract | Stripe |
| AI prompt | Context for suggestions | OpenAI | Internal | System generated | Legitimate interest | OpenAI |
| IP address | Analytics | PostHog | Internal | Auto-collected | Legitimate interest | PostHog |

### 2b. Third-Party Data Handling

| Service | Data Received | Purpose | Data Retention | Your Access |
|---------|--------------|---------|----------------|-------------|
| Clerk | Email, password hash, name | Authentication | Account lifetime | User read/update |
| Stripe | Payment info, customer ID | Payments | Per Stripe policy | Payment status only |
| OpenAI | Invoice text, amounts | AI suggestions | 30 days | Conversation history |
| Resend | Recipient email, content | Email delivery | 7 days | Delivery status |
| PostHog | Events, IP, device | Analytics | 1 year | Full analytics access |
| S3 | Invoice PDFs, images | File storage | Account lifetime | Full access |

---

## Section 3: Data Flow Map with Classification

### 3a. Key User Journey: Create and Send Invoice

| Step | Action | Data Involved | Sensitivity | Trust Boundary | Protection |
|------|--------|---------------|-------------|----------------|------------|
| 1 | User logs in | Session token | Restricted | Yes (user→app) | HTTPS, HttpOnly cookie |
| 2 | User enters client info | Client PII | Confidential | Yes (user→app) | HTTPS |
| 3 | User creates invoice | Invoice data | Restricted | Yes (app→db) | TLS, RLS (if enabled) |
| 4 | AI generates suggestions | Invoice context | Internal | Yes (app→OpenAI) | TLS, no PII (sanitized) |
| 5 | Invoice sent to client | Client email | Confidential | Yes (app→Resend) | TLS |
| 6 | PDF stored | Invoice PDF | Confidential | Yes (app→S3) | AWS encryption |

### 3b. Data-at-Rest Classification

| Data Store | Data Types | Encryption | Access Controls | Classification |
|------------|-----------|-----------|-----------------|----------------|
| Supabase (users) | Email, password hash | At rest (TLS) | RLS, Clerk | Confidential |
| Supabase (clients) | Names, emails, addresses | At rest (TLS) | RLS | Confidential |
| Supabase (invoices) | Financial data | At rest (TLS) | RLS | Restricted |
| Clerk | Credentials | At rest (TLS) | Clerk policies | Restricted |
| Stripe | Card, bank data | Tokenized | Stripe controls | Restricted |
| S3 | PDFs | AES-256 | IAM policies | Confidential |

### 3c. Data-in-Transit Classification

| Flow | Protocol | Encryption | Authentication | Sensitivity |
|------|----------|-----------|----------------|-------------|
| User → Next.js | HTTPS | TLS 1.3 | Clerk session | Confidential |
| Next.js → Supabase | HTTPS | TLS | Service role / anon key | Restricted |
| Next.js → Stripe | HTTPS | TLS | API key | Restricted |
| Next.js → OpenAI | HTTPS | TLS | API key | Internal |
| Next.js → S3 | HTTPS | TLS | Presigned URL | Confidential |
| Next.js → Resend | HTTPS | TLS | API key | Internal |

---

## Section 4: PII Exposure Assessment

### 4a. PII Types Identified

| PII Type | Category | Direct/Indirect | Sensitive | Special Category |
|----------|----------|-----------------|-----------|------------------|
| User email | Identifier | Direct | No | No |
| Client name | Identifier | Direct | No | No |
| Client email | Identifier | Direct | No | No |
| Client address | Identifier | Direct | No | No |
| Client phone | Identifier | Direct | No | No |
| Bank account | Financial | Direct | Yes | No |
| Tax ID | Government ID | Direct | Yes | No |
| IP address | Device | Indirect | No | No |

### 4b. PII Lifecycle Map

| PII Type | Collected At | Processed By | Stored At | Shared With | Crosses Boundary |
|----------|--------------|--------------|-----------|-------------|------------------|
| Client email | Web app | Next.js, Resend | Supabase | Resend | Yes (to email service) |
| Client address | Web app | Next.js | Supabase | No | No |
| Bank account | Web app | Next.js, Stripe | Supabase (tokenized) | Stripe | Yes (to payment processor) |
| Tax ID | Web app | Next.js | Supabase | No | No |

### 4c. Exposure Risk Summary

| Risk | PII Affected | Severity | Mitigation |
|------|--------------|----------|------------|
| PII sent to AI | Client name, email, invoice amounts | High | Sanitize prompts before sending to OpenAI |
| Email addresses in logs | Client email | Medium | Configure logging to exclude PII |
| Bank data in database | Bank account numbers | Critical | Use Stripe tokens, not raw data |
| PII in S3 | Invoice PDFs with client info | Medium | Enable S3 bucket encryption, restrict access |

---

## Section 5: Access Control Assessment

### 5a. Access Matrix

| Role | Data Access | Justification | Enforcement |
|------|-------------|--------------|-------------|
| Freelancer (owner) | All own data | Account holder | Clerk auth + RLS |
| Clients | Own invoices only | View invoices | Invoice token (UUID) |
| InvoiceFlow (system) | All data | Service operation | Service role key |
| Admin | All data | System administration | Supabase admin |

### 5b. Access Enforcement Review

| Data Store | Access Control Method | Enforcement | Gaps |
|------------|----------------------|-------------|------|
| Supabase | RLS (if enabled) | Database policies | Status unknown - needs verification |
| Clerk | Built-in auth | Token validation | Not reviewed |
| Stripe | Tokenized + API | Stripe controls | Not reviewed |
| S3 | IAM + presigned URLs | AWS controls | Not reviewed |

---

## Section 6: Retention and Deletion Assessment

### 6a. Retention Policies

| Data Type | Retention Period | Legal Requirement | Deletion Method |
|-----------|-----------------|-------------------|-----------------|
| User account | Account lifetime | Contract | Delete via Clerk |
| Client records | Account lifetime | Consent | Manual delete in app |
| Invoices | 7 years (tax) | Legal obligation | Archive after 7 years |
| Payment records | 7 years (tax) | Legal obligation | Stripe retains |
| AI prompts | 30 days | OpenAI policy | Automatic |
| Email logs | 90 days | Practical | Auto-delete |

### 6b. Right to Erasure Support

| Data Type | Erasure Possible | Process | Challenges |
|-----------|------------------|---------|------------|
| User profile | Yes | Delete account | Cascades to all data |
| Client records | Yes | Manual delete | Must preserve invoices for tax |
| Invoice data | Partial | Archive + anonymize | Legal retention requirement |
| Payment data | No | N/A | Stripe controls - legal hold |

### 6c. Data Lifecycle Summary

| Stage | Data Types | Duration | Location |
|-------|-----------|----------|----------|
| Collection | Client PII, financial | User action | Web app |
| Processing | All data types | Real-time | Next.js |
| Storage | Invoices, clients, users | Account lifetime | Supabase |
| Deletion | Upon request | Case-by-case | Various |

---

## Section 7: Protection Recommendations

### 7a. Prioritized Recommendations

| Recommendation | Priority | Effort | Addresses Risk | Implementation |
|---------------|----------|--------|----------------|----------------|
| Sanitize AI prompts to exclude PII | P0 | S | PII sent to OpenAI | Create sanitizeForAI() function |
| Verify RLS enabled on all Supabase tables | P0 | S | Cross-tenant access | Run RLS audit script |
| Implement automated PII logging redaction | P1 | M | PII in logs | Configure log middleware |
| Enable S3 bucket versioning | P1 | S | Data loss | Enable in AWS console |
| Implement data export functionality | P1 | M | GDPR compliance | Add export endpoint |

### 7b. Quick Wins

| Action | Impact | Effort | Applies To |
|--------|--------|--------|------------|
| Add PII field allowlist for AI | High risk reduction | S | OpenAI integration |
| Enable RLS on tables | High risk reduction | S | Supabase |
| Configure log exclusion | Medium risk reduction | S | Logging |

---

## Section 8: Data Protection Summary

### 8a. Posture Rating
- **Overall classification:** Mixed (Confidential + Restricted)
- **Protection maturity:** Developing
- **Key strengths:** Encryption in transit, third-party integrations with established security
- **Key gaps:** RLS status unknown, PII in AI prompts, retention policy not automated

### 8b. Handoff Notes

| Area | What to Investigate | Why It Matters |
|------|---------------------|----------------|
| RLS enforcement | Verify RLS policies work correctly | Data isolation |
| AI data handling | Confirm PII is excluded from prompts | Privacy compliance |
| Retention automation | Implement automated deletion | Legal compliance |
