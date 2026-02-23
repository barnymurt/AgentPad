# Data Source Framework User Guide

The Data Source Framework allows you to connect external data sources (databases, spreadsheets, APIs, documents) to the skills, enabling deeper and more informed analysis.

---

## Why Use Data Sources?

### Security Benefits

**Never paste credentials in conversation.** When you paste API keys, passwords, or connection strings in chat:
- They get stored in conversation history
- They may be logged by AI providers
- They remain in the AI's context window

**The Data Source Framework keeps credentials secure:**
- Encrypted at rest using AES-256-GCM
- Protected by your passphrase
- Never exposed in conversation context

### Enhanced Analysis

Skills can leverage your existing data:
- Customer interview transcripts
- Analytics exports
- Competitor research documents
- Database schemas
- API documentation

---

## Quick Start

### 1. Add a Data Source

**Via conversation:**
```
You: "I want to use my customer research data"
Bot: "What type of data is it? (spreadsheet, database, API, URL)"
You: "It's a Google Sheet"
Bot: "What's the URL?"
You: "https://docs.google.com/spreadsheets/d/..."
Bot: "Which squads should have access? (or say 'auto-detect')"
You: "auto-detect"
Bot: "[*] Added 'Customer Research' - Discovery squad can access it"
```

**Via CLI:**
```bash
python execution/manage_data_sources.py add \
  --name "My Analytics DB" \
  --type database \
  --location "postgresql://localhost/mydb" \
  --squads discovery data \
  --encrypt
```

### 2. Use in Skills

When running a skill:
```
You: "Run competitor research using my customer research data"
Bot: "[uses data from your connected Google Sheet in the analysis]"
```

---

## Squads

Squads define which skills can access your data sources.

### Available Squads

| Squad | When to Use | Example Data |
|-------|-------------|--------------|
| **Discovery** | Validating ideas, market research | Customer interviews, competitor docs |
| **Design** | Wireframes, UI, user flows | Usability recordings, design mocks |
| **Data** | Analytics, visualizations | Metrics exports, databases |
| **Security** | Threat modeling, compliance | Audit reports, architecture |
| **GTM/Launch** | Launches, pricing, marketing | Market research, pricing data |
| **Technical** | Architecture, development | API docs, specs |
| **Product** | Roadmapping, prioritization | Feature requests, feedback |
| **Research** | User interviews, surveys | Interview recordings |
| **Growth** | A/B tests, acquisition | Test results, funnel data |
| **Infrastructure** | Cloud, DevOps | Infra diagrams, logs |

### Templates

Pre-built squad combinations for common workflows:

| Template | Squads | Use Case |
|----------|--------|----------|
| **Product Validation** | Discovery + Research | Validating a new idea |
| **Build MVP** | Technical + Design | Building an MVP |
| **Launch** | GTM/Launch + Growth | Launching a product |
| **Analytics** | Data + Growth | Analyzing metrics |
| **Full Stack** | All | Complete development |

### Auto-Detect

Say "auto-detect" or "figure it out" and the tool will automatically select the right squad based on the skill you're running.

---

## Data Source Types

| Type | Description | Needs Encryption |
|------|-------------|-----------------|
| `spreadsheet` | Google Sheets, Excel | Optional |
| `cloud_storage` | Google Drive, Dropbox, S3 | Optional |
| `database` | PostgreSQL, MySQL, MongoDB | Yes |
| `api` | REST/GraphQL endpoints | Yes |
| `url` | Public webpages | No |
| `file` | Local file references | No |

---

## Security

### Encryption

Credentials are encrypted using:
- **Algorithm:** AES-256-GCM
- **Key Derivation:** PBKDF2-HMAC-SHA256 (100,000 iterations)
- **Your passphrase** protects the encryption key

### Setting a Passphrase

```bash
# When adding a data source with credentials
python execution/manage_data_sources.py add \
  --name "My DB" \
  --type database \
  --location "postgresql://..." \
  --encrypt \
  --credential "my_password"
# You'll be prompted for a passphrase
```

### Credential Warning

If you paste what looks like a credential in conversation:
```
⚠️ I notice you've pasted what looks like an API key.
For security, I recommend storing credentials in the Data Source Registry instead.
```

---

## CLI Commands

### Add a Data Source

```bash
python execution/manage_data_sources.py add \
  --name "My Data" \
  --type spreadsheet \
  --location "https://..." \
  --squads discovery data
```

Options:
- `--encrypt` - Encrypt credential with passphrase
- `--credential` - Provide credential directly (for scripting)
- `--passphrase` - Provide passphrase (for scripting)

### List Data Sources

```bash
# Brief list
python execution/manage_data_sources.py list

# Detailed view
python execution/manage_data_sources.py list --verbose
```

### Remove a Data Source

```bash
python execution/manage_data_sources.py remove <id> --force
```

### List Available Squads

```bash
python execution/manage_data_sources.py squads
```

### Check Access for a Squad

```bash
python execution/manage_data_sources.py check-access --squad discovery
```

---

## Examples

### Example 1: Customer Research

```bash
python execution/manage_data_sources.py add \
  --name "Customer Interviews" \
  --type spreadsheet \
  --location "https://docs.google.com/spreadsheets/d/..." \
  --squads discovery research
```

Now when you run validation skills, they'll access this data automatically.

### Example 2: Analytics Database

```bash
python execution/manage_data_sources.py add \
  --name "Production DB" \
  --type database \
  --location "postgresql://user:pass@host/db" \
  --squads data growth \
  --encrypt
```

Skills in the Data and Growth squads can use this for analysis.

### Example 3: API for Competitor Data

```bash
python execution/manage_data_sources.py add \
  --name "Competitor API" \
  --type api \
  --location "https://api.competitor.com/v1" \
  --squads discovery \
  --encrypt
```

---

## File Structure

```
data-sources/
├── registry.json      # Data source metadata
├── squads.json       # Squad definitions
├── keychain.enc      # Encrypted credentials (gitignored)
└── .salt            # Encryption salt (gitignored)
```

**Gitignored files:**
- `keychain.enc` - Encrypted credentials
- `.salt` - Encryption salt
- `audit.log` - Access logs

---

## Troubleshooting

### "Decryption failed"

Your passphrase is wrong. There's no password reset - you'll need to remove and re-add the data source.

### "No data sources found"

Run `python execution/manage_data_sources.py list` to see configured sources.

### "Squad not found"

Check available squads with `python execution/manage_data_sources.py squads`.

---

## Next Steps

- See the design spec: `docs/plans/data-source-framework-design.md`
- See the CLI tool: `execution/manage_data_sources.py`
- See helper module: `execution/data_source_helpers.py`
