---
name: security-compliance-roadmap
description: Produce a timeline-based roadmap of which security certifications and compliance frameworks to pursue and when, mapped to business milestones. Use when the user asks what certifications they need, wants a compliance roadmap, asks when to get SOC 2, needs security planning for growth, wants a compliance timeline, or asks which frameworks to pursue. Covers certification universe assessment, milestone-based phasing, effort and cost estimation, quick wins, and decision triggers.
---

# Security & Compliance Roadmap

Produce a phased, milestone-driven roadmap that tells a founder exactly which security certifications and compliance frameworks to pursue and when, based on their product's architecture, data sensitivity, market, and business stage. Unlike raw LLM output that lists every certification alphabetically with generic descriptions, this skill synthesizes all prior security analysis (architecture, baseline, threat model, review, data protection, privacy regulation) to produce a roadmap where every certification is tied to a specific business trigger, with realistic effort and cost estimates, and quick wins that satisfy multiple frameworks simultaneously.

## Core Workflow

### Step 1: Gather Context from Prior Security Analysis

Before recommending any certifications, consolidate the full security picture:

1. **Load all available Batch 3 outputs:**
   - Architecture Design (`context.architecture`) — containers, tech stack, data flows, storage, trust boundaries
   - Security Requirements Baseline (`context.security_baseline`) — current security posture, P0/P1/P2 requirements, implementation status
   - Threat Model (`context.threat_model`) — STRIDE analysis, risk register, mitigations
   - Security Architecture Review (`context.security_review`) — per-component findings, remediation plan
   - Data Protection Assessment (`context.data_protection`) — data classification, encryption status, retention policies
   - Privacy Regulation Assessment (`context.privacy_regulation`) — applicable regulations, compliance gaps, required actions

2. **If prior outputs are missing:** Ask the user for: product description, data types handled, target market (B2B/B2C/B2B2C), customer segments (SMB/mid-market/enterprise), geographic markets, current revenue stage, and any certifications already requested by customers. Do not proceed without understanding data sensitivity and target market.

3. **Establish business context:**
   - Current business stage (pre-launch, post-launch, growth, scale)
   - Revenue level (pre-revenue, <$500K ARR, $500K-$2M, $2M-$5M, $5M+)
   - Customer segment (consumers, SMBs, mid-market, enterprise, government)
   - Geographic markets (US, EU, UK, APAC, specific countries)
   - Industry verticals served (healthcare, finance, education, general)

### Step 2: Identify Applicable Certification Universe

**Regulation Selection Decision Tree:**

| Question | Answer | Regulation |
|----------|--------|------------|
| Do you process EU personal data? | Yes | GDPR |
| Do you serve California residents? | Yes | CCPA/CPRA |
| Do you handle health data? | Yes | HIPAA |
| Do you process payments? | Yes | PCI-DSS |
| Do you serve US government? | Yes | FedRAMP |
| Do B2B customers ask for SOC 2? | Yes | SOC 2 |
| Do EU customers ask for ISO 27001? | Yes | ISO 27001 |
| Do you serve children under 13? | Yes | COPPA |
| Do you handle student data? | Yes | FERPA |

**Framework Selection Guide:**

| Framework | When Required | Typical Timeline | Annual Cost |
|-----------|---------------|------------------|-------------|
| **SOC 2** | Enterprise B2B customers | 2-4 months | $15K-50K |
| **ISO 27001** | EU/enterprise customers | 6-12 months | $30K-80K |
| **HIPAA** | Health data processing | 3-6 months | $20K-60K |
| **PCI-DSS** | Direct payment processing | 2-4 months | $10K-30K |
| **GDPR** | EU data subjects | 3-6 months | $10K-40K |
| **SOC 1** | Financial data processing | 2-4 months | $15K-40K |

---

Evaluate every major certification and framework for relevance to this specific product:

1. **Evaluate each framework against the product's profile:**
   - SOC 2 Type I and Type II — relevant for B2B selling to mid-market or enterprise
   - ISO 27001 — relevant for EU market or enterprise customers demanding ISMS
   - HIPAA BAA — relevant only if handling Protected Health Information
   - PCI-DSS — relevant if handling payment card data directly (not just using Stripe)
   - GDPR certification — relevant if processing EU personal data
   - SOC 1 — relevant if processing financial data that affects customers' financial statements
   - FedRAMP — relevant only for US federal government customers
   - Sector-specific frameworks (FERPA, COPPA, CCPA, SOX, NIST 800-171, etc.)

2. **For each framework, determine:**
   - Relevance to this product (Not Applicable / Potentially Relevant / Required)
   - Business trigger that makes it relevant (specific customer demand, market expansion, regulatory requirement)
   - Confidence level (High/Medium/Low based on how certain the assessment is)

3. **Eliminate frameworks with clear non-applicability** (e.g., HIPAA for a project management tool that never touches health data). Document why each eliminated framework is not applicable — the reasoning matters.

### Step 3: Map Certifications to Business Milestones

For each relevant certification, determine when it becomes necessary based on business stage:

1. **Pre-launch:** What must be in place before shipping (privacy policy, security baseline, basic data protection)
2. **Post-launch (0-$500K ARR):** What to add as the product gains traction (penetration testing, privacy regulation compliance, incident response)
3. **Growth ($500K-$2M ARR):** What enterprise customers start requesting (SOC 2 Type I, ISO 27001)
4. **Scale ($2M-$5M ARR):** What becomes table stakes (SOC 2 Type II, additional market-specific certifications)
5. **Enterprise ($5M+ ARR):** What opens new market segments (FedRAMP, SOC 1, advanced certifications)

For each milestone-certification mapping, provide the business justification — not just "get SOC 2 at $1M ARR" but "enterprise freelancer agencies with 50+ seats will require SOC 2 before procurement approves; expect this demand around $1M ARR based on B2B SaaS benchmarks."

### Step 4: Estimate Effort and Cost

For each certification on the roadmap, provide realistic estimates:

1. **Preparation time:** Person-hours to achieve readiness (implementing controls, writing policies, training)
2. **Audit cost:** External auditor fees for initial certification
3. **Tooling cost:** Security tools, compliance platforms, monitoring (e.g., Vanta, Drata, Secureframe)
4. **Ongoing maintenance:** Annual renewal audit costs, continuous monitoring, policy updates
5. **Total first-year cost:** Preparation + audit + tooling
6. **Annual renewal cost:** Ongoing costs after initial certification
7. **Prerequisites:** What must be in place before starting (e.g., SOC 2 requires existing security policies, access controls, incident response plan)

Use the effort estimation methodology in [references/framework.md](references/framework.md). Flag estimates as ranges — certification costs vary significantly by company size and scope.

**Evidence Requirements by Framework:**

| Framework | Evidence Required | Examples |
|-----------|------------------|----------|
| **SOC 2** | Policies, logs, access records | Access control policy, audit logs, vendor assessments |
| **ISO 27001** | ISMS documentation, risk assessment | Risk treatment plan, Statement of Applicability |
| **HIPAA** | BAA, policies, training records | Business Associate Agreement, PHI handling procedures |
| **GDPR** | DPIA, privacy policy, consent records | Data Processing Impact Assessment, consent management |
| **PCI-DSS** | Network diagrams, scan reports | Quarterly vulnerability scans, penetration test reports |

**Compliance Cost Estimation:**

| Company Size | SOC 2 | ISO 27001 | HIPAA |
|-------------|-------|-----------|-------|
| Startup (<50) | $15-30K | $30-50K | $15-30K |
| Growth (50-200) | $30-50K | $50-80K | $30-50K |
| Enterprise (200+) | $50-100K+ | $80-150K+ | $50-100K+ |

*Includes: Audit fees, tooling, implementation time*

### Step 5: Identify Quick Wins

Find security controls that satisfy multiple frameworks simultaneously:

1. **Map controls to frameworks:** Identify which specific controls (encryption at rest, audit logging, access reviews, incident response plan) satisfy requirements across multiple frameworks
2. **Prioritize by coverage:** Rank controls by the number of frameworks they satisfy
3. **Assess implementation effort:** Estimate S/M/L effort for each quick win
4. **Build on existing posture:** Reference the Security Requirements Baseline — which quick wins are already implemented (P0 items) vs. which need new work?

The goal: maximize compliance coverage per unit of effort. A single control like "encryption at rest" can simultaneously advance SOC 2, GDPR, HIPAA, and ISO 27001 readiness.

### Step 6: Produce Phased Roadmap with Decision Triggers

Synthesize everything into the final deliverable:

1. **Phased roadmap:** Organized by business milestone, with specific actions, timelines, costs, and dependencies per phase
2. **Decision triggers:** For each certification, define the specific business event that should trigger starting the certification process (e.g., "When the third enterprise prospect asks for SOC 2 during procurement, begin SOC 2 Type I preparation")
3. **Leading indicators:** What signals to watch for that suggest a certification will be needed soon (e.g., "If >20% of pipeline deals are enterprise, SOC 2 demand is imminent")
4. **Roadmap summary:** Recommended first certification, timeline, total 2-year investment, key dependencies, and handoff notes for implementation

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Roadmap Context** — product summary, current security posture, market segment, business stage
- **Certification Universe** — evaluated table of all relevant frameworks
- **Phased Roadmap** — milestone-based plan with actions, effort, and cost per phase
- **Quick Wins** — cross-framework controls with coverage and effort
- **Effort & Cost Estimates** — per-certification cost breakdown
- **Decision Triggers** — business events that activate each certification
- **Roadmap Summary** — first certification, timeline, investment, dependencies

Expected length: 2,500-4,000 words depending on certification universe size.

## Quality Criteria

- [ ] Roadmap is mapped to specific business milestones with revenue ranges and customer triggers (not generic phases)
- [ ] Every recommended certification has a business justification (why this founder needs it)
- [ ] Effort and cost estimates included for every certification with ranges (not single numbers)
- [ ] Prerequisites identified for each certification (what must be true before starting)
- [ ] Decision triggers are specific and observable (not "when the time is right")
- [ ] Quick wins identified with which frameworks they satisfy and implementation effort
- [ ] Roadmap builds on current security posture from prior skills (not starting from zero)
- [ ] Non-applicable certifications are explicitly excluded with reasoning
- [ ] SaaS/digital product context maintained (not generic enterprise compliance advice)
- [ ] Output follows the schema in references/output-schema.md

## References

- **Certification maturity model and decision framework:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Recommending SOC 2 for a pre-revenue B2C product:** SOC 2 is a B2B trust signal. A consumer app with no enterprise customers has zero use for SOC 2. Recommend certifications that match the actual customer segment and buying process. A B2C product might need GDPR compliance or app store privacy requirements — but not SOC 2.

2. **Treating all certifications as equal urgency:** Presenting SOC 2, ISO 27001, HIPAA, FedRAMP, and PCI-DSS as a flat list without prioritization. Each certification has a different trigger point and different business impact. A founder with 10 SMB customers does not need FedRAMP. The roadmap must sequence certifications by when they become relevant, not by alphabetical order.

3. **Ignoring ongoing maintenance costs:** Quoting the initial certification cost without mentioning annual audits, continuous monitoring, policy updates, and re-certification. SOC 2 Type II is not a one-time expense — it is an annual commitment of $30K-$80K+ in audit fees plus tooling plus internal effort. The total cost of ownership over 3 years is what matters.

4. **Not connecting to actual security posture:** Producing a certification roadmap that ignores what the product has already implemented. If the Security Requirements Baseline shows encryption at rest, audit logging, and access controls are already in place, the SOC 2 preparation effort is materially lower. The roadmap must build on the current state, not assume starting from scratch.

5. **Presenting certifications without business justification:** Recommending ISO 27001 because "it's a good practice" rather than because "your EU enterprise pipeline requires it for procurement approval." Every certification on the roadmap must answer: "What business outcome does this unlock?" If a certification does not unlock revenue, customer trust, or market access, it does not belong on the roadmap yet.
