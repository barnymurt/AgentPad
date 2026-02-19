<!-- MAINTENANCE NOTE: This reference file should be reviewed quarterly 
to ensure accuracy with current best practices, regulatory changes, and 
skill evolution. Last reviewed: 2026-02-19 -->

# Output Schema: Data Protection Assessment

This file defines the exact structure of the Data Protection Assessment skill output. Every output must conform to this schema.

## Data Contracts

**Consumes:**
- `context.architecture.containers` — all containers with technology choices, responsibilities, interfaces
- `context.architecture.data_flows` — data flow diagrams with trust boundaries and sensitivity classification
- `context.architecture.storage` — databases, file storage, caching, data classification per store
- `context.architecture.auth_design` — auth approach, roles, permissions
- `context.security_baseline.requirements_checklist` — data protection requirements from baseline

**Produces (consumed by downstream skills):**
- `context.data_protection.data_inventory` — complete catalog of all data types and stores
- `context.data_protection.data_flow_map` — sensitivity-classified data flows per journey
- `context.data_protection.pii_exposure_map` — PII lifecycle tracking
- `context.data_protection.access_controls` — access matrix and enforcement assessment
- `context.data_protection.retention_policies` — retention and deletion policies per data type
- `context.data_protection.protection_recommendations` — prioritized recommendations

---

## Output Structure

```
# Data Protection Assessment: [Product Name]

## 1. Data Context Summary

### 1a. Product Overview
- Product name (required): Name of the product
- Data handling summary (required): What data types this product handles
- Input source (required): "Architecture Design output" or "Standalone input"

### 1b. Data Stores Inventory
Complete enumeration of all data storage locations:

| Store | Technology | Data Types | Classification | Owner |
|-------|-----------|-----------|----------------|-------|
| (name) | (e.g., PostgreSQL, S3, Stripe) | What's stored | Public/Internal/Confidential/Restricted | (team/role) |

Must include: primary database, third-party services, file storage, cache, browser storage, logs, backups.

## 2. Data Inventory

### 2a. Data Types Catalog
Every data type in the system:

| Data Type | Description | Store | Sensitivity | Collection Method | Legal Basis | Owner |
|-----------|-------------|-------|-------------|-------------------|-------------|-------|
| (name) | What it is | Where it lives | Level | How obtained | (consent/contract/legitimate interest) | (responsible party) |

### 2b. Third-Party Data Handling
Data handled by external services:

| Service | Data Received | Purpose | Data Retention | Your Access |
|---------|--------------|---------|----------------|-------------|
| (e.g., Stripe) | (what they receive) | (purpose) | (retention policy) | (what you can access) |

## 3. Data Flow Map with Classification

### 3a. Key User Journeys
For each major user journey:

| Step | Action | Data Involved | Sensitivity | Trust Boundary | Protection |
|------|--------|---------------|-------------|----------------|------------|
| 1 | (action) | (data) | (level) | (yes/no) | (encryption/auth/etc) |

### 3b. Data-at-Rest Classification
| Data Store | Data Types | Encryption | Access Controls | Classification |
|------------|-----------|-----------|-----------------|----------------|
| (store) | (types) | (yes/no/method) | (auth method) | (overall level) |

### 3c. Data-in-Transit Classification
| Flow | Protocol | Encryption | Authentication | Sensitivity |
|------|----------|-----------|----------------|-------------|
| (from → to) | (HTTPS/gRPC/etc) | (TLS 1.3/etc) | (method) | (level) |

## 4. PII Exposure Assessment

### 4a. PII Types Identified
| PII Type | Category | Direct/Indirect | Sensitive | Special Category |
|----------|----------|-----------------|-----------|------------------|
| (e.g., email) | (identifier) | (direct/indirect) | (yes/no) | (yes/no) |

### 4b. PII Lifecycle Map
For each PII type:

| PII Type | Collected At | Processed By | Stored At | Shared With | Crosses Boundary |
|----------|--------------|--------------|-----------|-------------|------------------|
| (type) | (where) | (services) | (stores) | (third parties) | (yes/no + where) |

### 4c. Exposure Risk Summary
| Risk | PII Affected | Severity | Mitigation |
|------|--------------|----------|------------|
| (specific risk) | (which PII) | Critical/High/Medium/Low | (action) |

## 5. Access Control Assessment

### 5a. Access Matrix
| Role | Data Access | Justification | Enforcement |
|------|-------------|--------------|-------------|
| (role) | (what they can access) | (why they need it) | (how enforced) |

### 5b. Access Enforcement Review
| Data Store | Access Control Method | Enforcement | Gaps |
|------------|----------------------|-------------|------|
| (store) | (method) | (how verified) | (identified gaps) |

## 6. Retention and Deletion Assessment

### 6a. Retention Policies
| Data Type | Retention Period | Legal Requirement | Deletion Method |
|-----------|-----------------|-------------------|-----------------|
| (type) | (period) | (if any) | (how deleted) |

### 6b. Right to Erasure Support
| Data Type | Erasure Possible | Process | Challenges |
|-----------|------------------|---------|------------|
| (type) | (yes/no) | (process) | (if any) |

### 6c. Data Lifecycle Summary
| Stage | Data Types | Duration | Location |
|-------|-----------|----------|----------|
| Collection | (types) | (when) | (where) |
| Processing | (types) | (duration) | (where) |
| Storage | (types) | (retention) | (where) |
| Deletion | (types) | (when) | (how) |

## 7. Protection Recommendations

### 7a. Prioritized Recommendations
| Recommendation | Priority | Effort | Addresses Risk | Implementation |
|---------------|----------|--------|----------------|----------------|
| (specific action) | P0/P1/P2 | S/M/L | (which risk) | (how to implement) |

### 7b. Quick Wins
Recommendations with high impact and low effort:

| Action | Impact | Effort | Applies To |
|--------|--------|--------|------------|
| (action) | (risk reduction) | (S/M/L) | (data types/risks) |

## 8. Data Protection Summary

### 8a. Posture Rating
- Overall classification (required): Predominant sensitivity level
- Protection maturity (required): Strong/Moderate/Developing/Initial
- Key strengths (required): What's working well
- Key gaps (required): What needs attention

### 8b. Handoff Notes
For Privacy Regulation Assessment and Compliance Roadmap:

| Area | What to Investigate | Why It Matters |
|------|---------------------|----------------|
| (component) | (specific question) | (significance) |
```

---

## Validation Rules

1. All data stores must be enumerated — not just primary database
2. Every data type must have a sensitivity classification
3. Data flows must show classification at each hop
4. All third-party services must be documented with their data handling
5. PII lifecycle map must trace every PII type from collection to deletion
6. Access matrix must cover all roles and data stores
7. Retention policies must address every data type
8. Recommendations must be prioritized with specific implementation guidance

---

## Confidence Tagging

- **High:** Based on documented architecture with known data flows
- **Medium:** Based on stated tech stack and common patterns
- **Low:** Based on product description with inferred data handling
