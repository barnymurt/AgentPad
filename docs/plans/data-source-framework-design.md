# Feature Design Spec: Data Source Framework

## 1. Overview

**Feature Name:** Data Source Framework  
**Purpose:** Allow users to provide external data references (URLs, credentials, files) that skills can access during execution to provide deeper, more informed analysis.  
**Scope:** v1 - Core framework only, no Notion integration (separate feature)

---

## 2. Problem Statement

Users have existing research, data, and resources they want skills to leverage during product development (customer interviews, analytics data, competitor analysis docs). Currently:

- No standardized way to provide data to skills
- Skills operate in isolation without access to user's existing knowledge
- Non-technical users face barriers (env files, JSON config)
- No security framework for handling credentials

### 2.1 Enterprise Value & Monetization

This feature is designed primarily for **enterprise users** who:

- Have existing data assets (customer research, analytics, documentation)
- Need secure credential management (no exposing API keys in conversations)
- Require audit trails for data access
- Will pay for a tool that provides this capability

**Monetization value:**
- Data source framework is a premium feature (not available in free tier)
- Enterprise users expect and will pay for: encrypted credential storage, audit logging, access controls
- Differentiator: Most AI tools allow pasting data in conversation - this is a **security risk**
- The registry approach keeps credentials encrypted and out of chat context

### 2.2 Why Not Paste in Conversation?

**Security risks of pasting credentials in conversation:**
- Credentials are stored in conversation history (potential data breach)
- Credentials may be logged by the AI provider
- Credentials exposed in context window (model memory)
- No audit trail of who accessed what

**This solution:**
- Credentials stay in encrypted keychain, never in conversation
- Audit log tracks every data source access
- User controls which squads can access which data sources
- Passphrase-protected encryption (AES-256-GCM with PBKDF2)

---

## 3. Solution Architecture

### 3.1 Core Components

| Component | Purpose | Location |
|-----------|---------|----------|
| **Data Source Registry** | Metadata about data sources (not actual data) | `data-sources/registry.json` |
| **Keychain File** | Encrypted credentials | `data-sources/keychain.enc` |
| **Management CLI** | Add/list/delete data sources | `execution/manage_data_sources.py` |
| **Squad Definitions** | Squad-to-skills mapping | `data-sources/squads.json` |

### 3.2 Data Flow

```
User Input (conversation/form)
         ↓
    ┌────┴────┐
    ↓         ↓
Quick Add   Persistent Add
(session)   (registry + keychain)
    ↓         ↓
    └────┬────┘
         ↓
   Skill Execution
         ↓
  ┌──────┴──────┐
  ↓              ↓
No Creds      Decrypt
              (prompt for passphrase)
                  ↓
           Inject into
           skill context
```

---

## 4. Squad Structure

### 4.1 Predefined Squads

| Squad | Skills |
|-------|--------|
| **Discovery** | validation-pack, requirements-elicitation, user-persona-creation, competitor-research, business-case-modeling, devils-advocate, devils-advocate-gtm, feature-prioritization, user-journey-mapping, gap-analysis, survey-design, interview-guide-creation, feedback-synthesis, stakeholder-analysis, roadmap-planning |
| **Design** | wireframing, ui-patterns, information-architecture, heuristic-evaluation, usability-test-planning, accessibility-review, design-system, animation-motion, responsive-patterns, component-architecture |
| **Data** | data-visualization, cohort-analysis, funnel-analysis, data-modeling, ab-test-design, saas-metrics-analysis |
| **Security** | security-requirements-baseline, security-compliance-roadmap, security-architecture-review, threat-modeling, data-security, data-protection-assessment, privacy-regulation-assessment, backup-recovery |
| **GTM/Launch** | launch-planning, launch-analytics, pricing-strategy, pricing-launch, channel-strategy, paid-acquisition, partner-strategy, content-strategy, community-building, referral-program, seo-foundation, analyst-relations, sales-enablement, messaging-framework |
| **Technical** | architecture-design, schema-design, api-design, user-story-generation, technical-readiness-pack, ticket-refinement, state-management, frontend-performance, monitoring-observability, ci-cd-pipeline, infrastructure-as-code, cloud-platforms, serverless-development, mobile-ios, mobile-android, ml-llm-integration, automation-framework, tdd, test-strategy, migration-planning, performance-tuning, edge-computing |
| **Product** | roadmap-planning, feature-prioritization, requirements-elicitation, stakeholder-analysis |
| **Research** | survey-design, interview-guide-creation, feedback-synthesis, usability-test-planning |
| **Growth** | ab-test-design, paid-acquisition, referral-program, channel-strategy, funnel-analysis |
| **Infrastructure** | cloud-platforms, infrastructure-as-code, serverless-development, ci-cd-pipeline, monitoring-observability |

### 4.2 Squad Descriptions

| Squad | When to Use | Example Data Sources |
|-------|-------------|---------------------|
| **Discovery** | Validating a product idea, researching market, building business case | Customer interview transcripts, competitor analysis docs, market research, survey results |
| **Design** | Creating wireframes, UI patterns, user flows, design systems | User research recordings, usability test videos, design mockups, style guides |
| **Data** | Analyzing metrics, building visualizations, cohort analysis | Analytics exports, database schemas, SQL queries, data dictionaries |
| **Security** | Threat modeling, compliance assessment, security architecture | Security audit reports, compliance certifications, architecture diagrams |
| **GTM/Launch** | Planning launches, pricing strategy, marketing channels | Market research, pricing data, channel performance, customer feedback |
| **Technical** | Architecture design, technical planning, development | API documentation, system architecture, technical specs, code repositories |
| **Product** | Roadmapping, prioritization, stakeholder management | Feature requests, user feedback, priority matrices, stakeholder contacts |
| **Research** | User interviews, surveys, usability testing | Interview recordings, survey responses, research synthesis, persona documents |
| **Growth** | Experimentation, acquisition, retention analysis | A/B test results, funnel data, cohort analysis, acquisition costs |
| **Infrastructure** | Cloud setup, CI/CD, monitoring, DevOps | Infrastructure diagrams, deployment logs, monitoring dashboards, cost reports |

### 4.3 Squad Selection Options

Users can choose how to select squads:

1. **Manual selection:** User explicitly selects which squads can access a data source
2. **Auto-detect:** Tool automatically selects squads based on the skill being run
3. **Custom squads:** Users create their own squads by selecting skills

### 4.4 Squad Templates

Pre-built workflow bundles for common use cases:

| Template | Squads Included | Use Case |
|----------|-----------------|----------|
| **Product Validation** | Discovery + Research | Validating a new product idea |
| **Build MVP** | Technical + Design | Building and designing an MVP |
| **Launch** | GTM/Launch + Growth | Planning and executing a launch |
| **Analytics** | Data + Growth | Analyzing product metrics |
| **Full Stack** | All squads | Complete product development lifecycle |

Users can use templates for quick setup or manually select individual squads.

### 4.5 Custom Squads

Users can create custom squads by selecting skills from the full skill inventory. Custom squads persist in the registry.

---

## 5. Data Source Types

| Type | Description | Example | Credential Required |
|------|------------|---------|---------------------|
| `cloud_storage` | Google Drive, Dropbox, S3 | URL to shared folder | Optional (if private) |
| `spreadsheet` | Google Sheets, Excel | URL | Optional |
| `database` | PostgreSQL, MySQL, MongoDB | Connection string | Yes |
| `api` | REST/GraphQL endpoint | URL | Yes (API key/token) |
| `url` | Public webpage | https://... | No |
| `file` | Local file reference | path/to/file | No |

---

## 6. Security Design

### 6.1 Encryption

| Aspect | Implementation |
|--------|----------------|
| **Algorithm** | AES-256-GCM (authenticated encryption) |
| **Key Derivation** | PBKDF2-HMAC-SHA256 (PRF), 100,000 iterations |
| **Salt** | Random 16 bytes per keychain file |
| **Storage** | `data-sources/keychain.enc` (gitignored) |

**Why PBKDF2?**
- Industry-standard Password-Based Key Derivation Function (RFC 2898)
- Uses HMAC-SHA256 as the PRF (Pseudo-Random Function)
- 100,000 iterations makes brute-force attacks computationally expensive
- Random salt prevents rainbow table attacks

### 6.2 Passphrase Flow

1. First time adding credential → prompt for passphrase
2. Passphrase → derive encryption key → encrypt credential → store
3. Subsequent use → prompt for passphrase → decrypt → use
4. Option to cache in memory for session duration (optional flag)

### 6.3 File Permissions

- `registry.json` - User read/write only (0600)
- `keychain.enc` - User read/write only (0600)
- Both files in `.gitignore`

### 6.4 Audit Logging

Each data source access logged:
```json
{
  "timestamp": "ISO-8601",
  "data_source_id": "uuid",
  "skill_name": "competitor-research",
  "action": "read",
  "user_ip": "optional"
}
```

---

## 7. User Interfaces

### 7.1 User Experience for Non-Technical Users

**Conversational UI is the primary interface for non-technical users:**
- Simple questions, one at a time
- Natural language responses
- No command-line knowledge required
- Tool explains each step in plain English

**CLI is available for power users who prefer it:**
- Batch operations
- Scriptable workflows
- Faster for repeated operations

### 7.2 Conversational (Quick Add)

```
User: "I have customer interview data I want to use"
Bot: "Great! What type of data is it?"
     "  1. A spreadsheet (like Google Sheets or Excel)"
     "  2. A document or file"
     "  3. A database connection"
     "  4. An API endpoint"
     "  5. A website URL"
User: "1"
Bot: "Got it - a spreadsheet. What's the URL?"
User: "https://docs.google.com/spreadsheets/d/..."
Bot: "Which teams should have access? You can choose:"
     "  - Discovery (for validating ideas, research)"
     "  - Design (for user research, wireframes)"
     "  - Data (for analytics, visualizations)"
     "  - Or describe what you're working on and I'll auto-detect"
User: "Discovery"
Bot: "✓ Added 'Customer Interview Data' to your data sources."
     "The Discovery team can now access this when you run validation skills."
```

**Auto-Detect Option (Default):**
If users aren't sure which squad to choose, they can say "auto-detect" and the tool will select the appropriate squad(s) based on the skill they're running. **Auto-detect is the default** - users can manually select if they prefer.

### 7.3 Credential Warning System

If a user pastes what appears to be a credential (API key, password, connection string) in conversation:

```
User: "Here's my API key: sk_live_1234567890abcdef"
Bot: "⚠️ I notice you've pasted what looks like an API key.
     For security, I recommend storing credentials in the Data Source Registry instead.
     This keeps them encrypted and out of conversation history.
     
     Would you like to add this as a data source instead?"
```

### 7.4 CLI Form

```bash
# Add data source
> data-source add
Name: Analytics Database
Type: database
Connection: postgresql://user:pass@host/db
Squad access: Discovery, Data
Encrypt credentials? (y/n): y
Enter passphrase: ********
Confirm passphrase: ********
✓ Data source added

# List data sources
> data-source list
┌─────────────────────────────────────────────┬────────────┬──────────┐
│ Name                    │ Type      │ Squads          │
├─────────────────────────┼───────────┼─────────────────┤
│ Customer Interview     │ spreadsheet│ Discovery       │
│ Analytics Database     │ database  │ Discovery, Data │
│ Competitor Analysis    │ url       │ Discovery       │
└─────────────────────────┴───────────┴─────────────────┘

# Delete data source
> data-source remove <id>
```

---

## 8. Skill Integration

### 8.1 Context Injection

When orchestrator runs a skill belonging to a squad:

1. Check which data sources that squad has access to
2. If user references a data source (by name/ID), fetch metadata
3. If credentials needed, prompt for passphrase (or use cached)
4. Inject into skill context:

```json
{
  "data_sources": {
    "customer-interviews": {
      "name": "Customer Interview Data",
      "type": "spreadsheet",
      "location": "https://docs.google.com/...",
      "format": "google_sheet",
      "squads": ["discovery"]
    }
  }
}
```

### 8.2 Skill SKILL.md Extension Pattern

Each skill's SKILL.md includes:

```
### Data Sources

This skill can access data sources when provided:
- **Discovery squad:** Customer interviews, analytics data, competitor docs
- **Data squad:** Raw datasets, SQL databases, API endpoints

User provides via:
- Conversation: "use my [data source name]"
- CLI: `data-source link <id> --skill <skill-name>`
```

---

## 9. File Changes

### 9.1 New Files

| File | Purpose |
|------|---------|
| `data-sources/registry.json` | Data source metadata (empty template) |
| `data-sources/squads.json` | Squad definitions with skills |
| `execution/manage_data_sources.py` | CLI tool for management |
| `docs/guides/data-sources.md` | User guide |

### 9.2 Modified Files

| File | Change |
|------|--------|
| `.gitignore` | Add data-sources/* entries |
| `skills/skill-orchestrator/SKILL.md` | Add data source handling |
| `directives/run_validation_pack.md` | Add data source injection |

---

## 10. Implementation Steps

### Phase 1: Foundation
1. Create `data-sources/` directory structure
2. Create `squads.json` with predefined squads
3. Create empty `registry.json`
4. Add to `.gitignore`

### Phase 2: Core CLI
1. Implement `manage_data_sources.py`
2. Add/remove/list data source functions
3. Integrate passphrase encryption (AES-256-GCM)
4. Implement keychain read/write

### Phase 3: Orchestrator Integration
1. Update skill-orchestrator to check squad access
2. Implement context injection for data sources
3. Add passphrase prompt flow for credentials

### Phase 4: User Guide
1. Document workflows in `docs/guides/data-sources.md`

---

## 11. Edge Cases

| Scenario | Handling |
|----------|----------|
| Wrong passphrase | Show error, allow retry (max 3), suggest reset |
| Data source URL becomes invalid | Log warning, notify user on access attempt |
| Squad deleted with linked data sources | Prompt to reassign or delete data sources |
| Keychain corrupted | Offer to re-add credentials |
| Large file reference | Warn user we store metadata only, not actual data |

---

## 12. Out of Scope (v1)

- Notion integration (separate feature)
- Team/shared data sources
- Data source versioning
- Automated data fetching/refresh
- Web UI (CLI only for v1)

---

## 13. Success Criteria

- [ ] Users can add data sources via conversation
- [ ] Users can add data sources via CLI
- [ ] Credentials encrypted at rest with passphrase
- [ ] Squad-level access control enforced
- [ ] Skills receive data source context
- [ ] Audit log captures access
- [ ] User guide documents all workflows

---

## 14. Updates Since DA Review

1. **Added enterprise value & monetization section** - Feature designed for enterprise users who will pay
2. **Added security section** - Explains why pasting credentials in conversation is a security risk
3. **Added squad descriptions** - Clear guidance on when to use each squad
4. **Added auto-detect option** - Users can let the tool select squads based on skill
5. **Clarified PRF** - PBKDF2-HMAC-SHA256 is industry standard
6. **Emphasized conversational UI** - Primary interface for non-technical users
7. **Added squad templates** - Pre-built workflow bundles for common use cases

### 14.1 DA Round 2 Recommendations (Implemented)

| Recommendation | Implementation |
|---------------|----------------|
| Make auto-detect default | Auto-detect is the default option; users can manually select if preferred |
| Add squad templates | Added workflow templates (see Section 4.5) |
| Credential warning system | Tool warns users if credentials detected in conversation |

### 14.2 Squad Templates

Pre-built templates for common workflows:

| Template | Squads Included | Use Case |
|----------|-----------------|----------|
| **Product Validation** | Discovery + Research | Validating a new product idea |
| **Build MVP** | Technical + Design | Building and designing an MVP |
| **Launch** | GTM/Launch + Growth | Planning and executing a launch |
| **Analytics** | Data + Growth | Analyzing product metrics |
| **Full Stack** | All squads | Complete product development lifecycle |

## 15. Questions for DA Review (Round 2)

1. Is the squad-to-skills mapping correct and complete?
2. Are there security gaps in the encryption approach?
3. Any missing data source types?
4. Should custom squads have different access rules than predefined?
5. Are the squad descriptions clear enough for users to make informed choices?
