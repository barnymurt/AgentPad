# Framework: Privacy Regulation Assessment

This document defines the regulation triage decision tree, per-regulation requirement summaries, compliance assessment methodology, and privacy policy generation framework.

---

## Regulation Triage Decision Tree

The triage determines which regulations apply to a specific product. Run all four branches — geography, data type, industry, and business model — before proceeding to assessment.

### Branch 1: Geography-Based Triage

```
Where are your users located?
│
├─ EU/EEA (any member state)
│  └─ GDPR applies? → YES if:
│     - Company is established in the EU, OR
│     - Company offers goods/services to EU residents (even if free), OR
│     - Company monitors behavior of EU residents
│     Confidence: HIGH if user data shows EU IP addresses or EU billing addresses
│     Confidence: MEDIUM if product is available globally but not specifically targeting EU
│
├─ California (USA)
│  └─ CCPA/CPRA applies? → YES if the business:
│     - Has annual gross revenue > $25M, OR
│     - Buys/sells/shares personal info of 100,000+ consumers/households, OR
│     - Derives 50%+ of revenue from selling/sharing personal info
│     Note: CPRA (effective Jan 2023) amends and extends CCPA
│     Confidence: HIGH if revenue/user thresholds are clearly met or not met
│     Confidence: MEDIUM if near thresholds or projecting growth
│
├─ Other US States with comprehensive privacy laws
│  ├─ Virginia (VCDPA) — 100K+ consumers OR 25K+ consumers + 50% revenue from data sales
│  ├─ Colorado (CPA) — 100K+ consumers OR 25K+ consumers + revenue from data sales
│  ├─ Connecticut (CTDPA) — 100K+ consumers OR 25K+ consumers + 25% revenue from data sales
│  ├─ Utah (UCPA) — $25M+ revenue AND 100K+ consumers OR 25K+ consumers + 50% revenue from data sales
│  ├─ Texas (TDPSA) — does business in Texas, processes personal data (no revenue/volume threshold)
│  ├─ Oregon (OCPA) — 100K+ consumers OR 25K+ consumers + 25% revenue from data sales
│  └─ Additional states — check current legislative status; new laws take effect annually
│  Note: Even if thresholds are not met today, project forward 12-18 months
│
├─ Canada
│  └─ PIPEDA applies? → YES if:
│     - Organization collects, uses, or discloses personal info in commercial activity
│     - Operates in provinces without substantially similar legislation (Alberta, BC, Quebec have own laws)
│     Confidence: HIGH if Canadian users are a target market
│
├─ Brazil
│  └─ LGPD applies? → YES if:
│     - Processing is carried out in Brazil, OR
│     - Data of individuals located in Brazil is processed, OR
│     - Goods/services offered to individuals in Brazil
│     Confidence: HIGH if Brazilian users are a target market
│
└─ Other jurisdictions
   └─ Flag for manual review: UK (UK GDPR post-Brexit), Australia (Privacy Act), Japan (APPI),
      South Korea (PIPA), India (DPDP Act), China (PIPL)
      Note: Only deep-dive if the product specifically targets these markets
```

### Branch 2: Data-Type-Based Triage

```
What types of data does the product handle?
│
├─ Health / medical data
│  └─ HIPAA applies? → YES if:
│     - Entity is a covered entity (healthcare provider, health plan, clearinghouse), OR
│     - Entity is a business associate of a covered entity, OR
│     - Entity handles Protected Health Information (PHI)
│     IMPORTANT: A general SaaS product that happens to be used by healthcare customers
│     is NOT automatically subject to HIPAA — unless it handles PHI on behalf of a covered entity
│     Confidence: HIGH if product is designed for healthcare or has BAAs in place
│     Confidence: LOW if healthcare use is incidental
│
├─ Payment card data (credit/debit card numbers, CVVs)
│  └─ PCI-DSS applies? → YES if:
│     - Entity stores, processes, or transmits cardholder data
│     IMPORTANT: If payments are handled entirely by a PCI-compliant processor (Stripe, PayPal)
│     and the product never sees card numbers, PCI-DSS applicability is PARTIAL
│     - Partial: must complete SAQ-A (self-assessment questionnaire) to confirm proper delegation
│     - Full: applies if the product touches card data at any point
│     Confidence: HIGH if payment integration architecture is documented
│
├─ Children's data (users under 13 in US, under 16 in EU)
│  └─ COPPA applies? → YES if:
│     - Website/app is directed at children under 13, OR
│     - Operator has actual knowledge it collects data from children under 13
│     Note: "Directed at children" considers subject matter, visual content, age of models,
│     language, presence of child celebrities, ads for products aimed at children
│     Under GDPR: parental consent required for children under 16 (member states can lower to 13)
│     Confidence: HIGH if product explicitly targets or excludes children
│     Confidence: LOW if age of users is unknown
│
├─ Education records
│  └─ FERPA applies? → YES if:
│     - Entity receives funding from the US Department of Education, OR
│     - Entity handles education records on behalf of an institution that does
│     Note: EdTech products serving K-12 or higher education should evaluate FERPA
│     Confidence: HIGH if product is designed for educational institutions
│
├─ Financial data (bank accounts, transaction history, credit scores)
│  └─ GLBA applies? → YES if:
│     - Entity is a financial institution OR provides financial products/services
│     Note: "Financial institution" is broadly defined — includes tax preparers, financial advisors, etc.
│     Confidence: HIGH if product is in the financial services sector
│
└─ Biometric data (fingerprints, facial recognition, voiceprints)
   └─ BIPA (Illinois) and similar state biometric laws may apply
      Evaluate if product collects, stores, or uses biometric identifiers
```

### Branch 3: Industry-Based Triage

```
What industry does the product operate in?
│
├─ Healthcare
│  └─ Already flagged via data-type triage (HIPAA)
│     Additionally: HITECH Act (breach notification), state health privacy laws
│
├─ Financial Services
│  └─ Already flagged via data-type triage (GLBA)
│     Additionally: SOX (if publicly traded), state financial regulations, SEC/FINRA requirements
│
├─ Telecommunications
│  └─ FCC regulations on customer data (CPNI — Customer Proprietary Network Information)
│     State-level telecom privacy requirements
│
├─ Insurance
│  └─ State insurance data security laws (e.g., NY DFS Cybersecurity Regulation 23 NYCRR 500)
│
└─ General SaaS / Technology
   └─ No sector-specific regulations beyond geography and data-type triggers
      Focus on general privacy frameworks (GDPR, CCPA, etc.)
```

### Branch 4: Business-Model-Based Triage

```
Who are the customers?
│
├─ B2C (direct to consumer)
│  └─ Higher consent requirements:
│     - GDPR: consent must be freely given, specific, informed, unambiguous
│     - CCPA: "Do Not Sell My Personal Information" link required
│     - COPPA: verifiable parental consent if children are users
│     Product is the DATA CONTROLLER — full regulatory obligations apply
│
├─ B2B (business to business)
│  └─ Dual role assessment:
│     - For customer business data: product may be DATA PROCESSOR
│     - For end-user PII within customer accounts: processing obligations still apply
│     - Data Processing Agreements (DPAs) required under GDPR
│     - Assess: does the product determine the purpose of processing (controller)?
│       Or only process data on behalf of the customer (processor)?
│
├─ B2B2C (platform serving businesses that serve consumers)
│  └─ Most complex scenario:
│     - Product may be both processor (for B2B customer) and controller (for own analytics)
│     - End consumers have data subject rights under applicable regulations
│     - Must support customer's ability to fulfill data subject requests
│
└─ Marketplace / Multi-sided platform
   └─ Assess each side independently:
      - Seller/provider data: likely controller
      - Buyer/consumer data: likely controller
      - Transaction data: controller for own purposes, assess processor role for facilitating transactions
```

---

## Per-Regulation Requirement Summaries

### GDPR (General Data Protection Regulation)

**Applicability test:** Does the product (a) have an establishment in the EU, (b) offer goods/services to EU individuals, or (c) monitor the behavior of EU individuals?

**Key requirements:**
| Category | Requirement | SaaS Consideration |
|----------|------------|-------------------|
| Lawful basis | Must have a lawful basis for each processing activity (consent, contract, legitimate interest, legal obligation, vital interests, public task) | Consent is not always the best basis — legitimate interest or contractual necessity often apply for core product functionality |
| Consent | Consent must be freely given, specific, informed, unambiguous; must be as easy to withdraw as to give | Cookie consent banners, opt-in for marketing emails, granular consent for data processing beyond core service |
| Data subject rights | Right to access, rectification, erasure ("right to be forgotten"), restriction, portability, objection, not be subject to automated decision-making | Product must support data export (portability), account deletion (erasure), and data correction flows |
| Privacy notices | Must inform data subjects of: identity of controller, purposes of processing, legal basis, recipients, transfers, retention periods, rights | Privacy policy must be comprehensive, accessible, and in plain language |
| Data Protection Impact Assessment | Required for high-risk processing (profiling, large-scale processing of sensitive data, systematic monitoring) | AI/ML features, behavioral analytics, large-scale PII processing likely trigger DPIA requirement |
| Data Processing Agreements | Required with all processors handling personal data on controller's behalf | DPAs needed with cloud providers, email services, analytics tools, payment processors |
| Cross-border transfers | Transfers outside EU/EEA require adequate safeguards (SCCs, adequacy decisions, BCRs) | US-based hosting, US-based sub-processors (Stripe, AWS, etc.) require transfer mechanism |
| Breach notification | Notify supervisory authority within 72 hours; notify data subjects if high risk | Must have incident response plan and ability to identify scope of breach |
| Data Protection Officer | Required for public authorities, large-scale monitoring, or large-scale processing of sensitive data | Most early-stage SaaS products do not need a DPO, but should designate a privacy contact |
| Records of processing | Must maintain records of all processing activities | Document data flows and processing purposes in a Register of Processing Activities (ROPA) |

**Penalties:** Up to 4% of annual global turnover or 20 million EUR (whichever is higher). Lower tier: 2% or 10 million EUR.

### CCPA/CPRA (California Consumer Privacy Act / California Privacy Rights Act)

**Applicability test:** Does the business (a) have annual gross revenue > $25M, (b) buy/sell/share personal info of 100K+ consumers/households/devices, or (c) derive 50%+ of revenue from selling/sharing personal info? Must do business in California.

**Key requirements:**
| Category | Requirement | SaaS Consideration |
|----------|------------|-------------------|
| Right to know | Consumers can request what personal info is collected and how it's used | Must support data access requests within 45 days |
| Right to delete | Consumers can request deletion of personal info | Account deletion flow, cascading deletion to service providers |
| Right to opt-out | "Do Not Sell or Share My Personal Information" link required | Required even if you don't "sell" data — "sharing" for cross-context behavioral advertising counts |
| Right to correct | Consumers can request correction of inaccurate personal info (CPRA addition) | Profile editing functionality, data correction workflow |
| Right to limit use of sensitive personal info | Consumers can limit use of sensitive info (CPRA addition) | Must categorize data as sensitive vs. non-sensitive |
| Privacy notice | Must disclose categories of personal info collected, purposes, third parties, retention periods | Privacy policy must include CCPA-specific disclosures |
| Service provider contracts | Written contracts required with service providers processing personal info | Vendor agreements must include CCPA-required provisions |
| Data minimization | Collect only personal info that is reasonably necessary (CPRA addition) | Review data collection practices for necessity |
| Non-discrimination | Cannot discriminate against consumers who exercise their rights | Cannot deny service or charge different prices for exercising privacy rights |

**Penalties:** $2,500 per violation (unintentional), $7,500 per intentional violation. Private right of action for data breaches: $100-$750 per consumer per incident.

### HIPAA (Health Insurance Portability and Accountability Act)

**Applicability test:** Is the entity (a) a covered entity (healthcare provider, health plan, clearinghouse), or (b) a business associate that creates, receives, maintains, or transmits PHI on behalf of a covered entity?

**Key requirements:**
| Category | Requirement | SaaS Consideration |
|----------|------------|-------------------|
| Privacy Rule | Limits use and disclosure of PHI; requires minimum necessary standard | Access controls must limit PHI exposure to what's needed for each function |
| Security Rule | Administrative, physical, and technical safeguards for ePHI | Encryption at rest and in transit, access controls, audit logging, risk assessments |
| Breach notification | Notify individuals within 60 days, HHS for breaches affecting 500+ individuals | Must have incident response plan with HIPAA-specific timelines |
| Business Associate Agreement | Required between covered entities and business associates | BAA must be in place before handling any PHI |
| Minimum necessary | Use/disclose only the minimum PHI necessary for the purpose | Role-based access, data segmentation, purpose limitation |
| Patient rights | Access, amendment, accounting of disclosures, restrictions, confidential communications | Product must support patient access to their PHI and amendment requests |

**Penalties:** $100-$50,000 per violation, up to $1.5M per year per violation category. Criminal penalties for knowing misuse.

### PCI-DSS (Payment Card Industry Data Security Standard)

**Applicability test:** Does the entity store, process, or transmit cardholder data (card number, CVV, expiration date, cardholder name)?

**Key requirements:**
| Category | Requirement | SaaS Consideration |
|----------|------------|-------------------|
| SAQ level determination | Compliance level depends on how card data is handled | If using Stripe.js/Elements (card data never touches your servers): SAQ-A |
| Network security | Firewalls, network segmentation, secure configurations | Primarily the responsibility of the payment processor if properly delegated |
| Data protection | Encrypt stored cardholder data, mask PAN when displayed | If delegated to Stripe: ensure no accidental logging of card data in your systems |
| Access control | Restrict access to cardholder data by business need-to-know | Ensure no developer access to production payment data |
| Monitoring | Track and monitor access to network resources and cardholder data | Audit logging for any payment-related API calls |
| Security testing | Regular vulnerability assessments and penetration tests | Scope depends on SAQ level |

**Penalties:** $5,000-$100,000 per month until compliance is achieved. Card brand fines, increased transaction fees, loss of ability to process cards.

**SaaS-specific note:** Most SaaS products using Stripe, PayPal, or similar processors never handle card data directly. This typically means PCI-DSS is PARTIAL — complete SAQ-A to document proper delegation. However, if the product logs, caches, or accidentally stores card data (even in error logs), full PCI-DSS applies.

### COPPA (Children's Online Privacy Protection Act)

**Applicability test:** Is the website or online service (a) directed at children under 13, or (b) does the operator have actual knowledge it collects personal info from children under 13?

**Key requirements:**
| Category | Requirement | SaaS Consideration |
|----------|------------|-------------------|
| Verifiable parental consent | Must obtain verifiable consent from parent before collecting personal info from children | Age gates, parental consent mechanisms, consent verification methods |
| Privacy notice | Direct notice to parents about data practices | Separate, child-focused privacy notice required |
| Data minimization | Collect only what is reasonably necessary for the activity | Strict limitation on data collection from children |
| Parental rights | Parents can review, delete, and refuse further collection of child's info | Must support parental access and deletion requests |
| Data security | Maintain confidentiality, security, and integrity of children's personal info | Reasonable security measures for children's data |
| Retention limits | Retain personal info only as long as necessary for the purpose collected | Defined, shorter retention periods for children's data |

**Penalties:** Up to $50,349 per violation (adjusted annually for inflation). FTC enforcement is active — significant fines issued regularly.

---

## Compliance Assessment Methodology

For each applicable regulation, follow this assessment sequence:

### 1. Map Data Processing Activities
For each processing activity, document:
- **Activity name** — what processing occurs (e.g., "user registration," "payment processing," "analytics collection")
- **Data categories** — what personal data is involved (names, emails, IP addresses, financial data, etc.)
- **Legal basis** — which lawful basis applies (consent, contract, legitimate interest, legal obligation)
- **Data subjects** — who the data is about (users, customers, employees, website visitors)
- **Recipients** — who receives the data (internal teams, sub-processors, third parties)
- **Cross-border transfers** — does data leave the country/region of collection?
- **Retention period** — how long is the data kept?

### 2. Identify Legal Basis per Activity
For each processing activity, validate the legal basis:
- **Consent:** Is it freely given, specific, informed, and unambiguous? Can it be withdrawn easily?
- **Contractual necessity:** Is the processing truly necessary to perform the contract, or just convenient?
- **Legitimate interest:** Has a balancing test been conducted? Does the individual's interest override?
- **Legal obligation:** Which specific law mandates this processing?

### 3. Assess Data Subject Rights Fulfillment
For each applicable right under each applicable regulation:
- **Can the product fulfill this right today?** (Yes / Partially / No)
- **What is the process?** (Automated / Manual / Not possible)
- **What is the response time?** (Does it meet regulatory timelines?)
- **What are the gaps?** (Missing functionality, manual workarounds, no process defined)

### 4. Evaluate Cross-Border Transfers
For each data transfer outside the originating jurisdiction:
- **Transfer destination** — which country/countries?
- **Transfer mechanism** — SCCs, adequacy decision, BCRs, derogation?
- **Assessment of adequacy** — is the mechanism valid and up to date?
- **Sub-processor chain** — do sub-processors further transfer data?

### 5. Identify Gaps
Compile all gaps into a structured register:
- **Gap ID** — unique identifier
- **Regulation** — which regulation this gap relates to
- **Requirement** — which specific requirement is not met
- **Current state** — what the product does today
- **Required state** — what the regulation requires
- **Severity** — Critical / High / Medium / Low
- **Remediation** — what action is needed to close the gap

---

## Privacy Policy Generation Framework

The privacy policy is generated as an output artifact in Step 7. It must be tailored to the product's actual data practices identified during assessment.

### Required Sections (by regulation)

**Always required (all products):**
1. Identity and contact details of the data controller
2. What personal data is collected
3. How personal data is used (purposes of processing)
4. Who personal data is shared with (categories of recipients)
5. How long personal data is retained
6. How personal data is protected (security measures summary)
7. User rights and how to exercise them
8. How to contact the company with privacy questions
9. How the policy is updated and how users are notified of changes

**GDPR-specific sections (if GDPR applies):**
10. Legal basis for each processing purpose
11. Cross-border transfer details and safeguards
12. Right to lodge a complaint with a supervisory authority
13. Whether personal data provision is statutory/contractual requirement
14. Information about automated decision-making/profiling (if applicable)
15. DPO contact details (if DPO is appointed)

**CCPA/CPRA-specific sections (if CCPA applies):**
16. Categories of personal information collected in the past 12 months
17. Categories of sources from which personal information is collected
18. Business or commercial purpose for collecting/selling personal information
19. Categories of third parties with whom personal information is shared
20. "Do Not Sell or Share My Personal Information" instructions
21. Right to limit use of sensitive personal information (if applicable)
22. Financial incentive disclosures (if applicable)
23. Metrics disclosure (if business meets threshold for annual metrics reporting)

**HIPAA-specific sections (if HIPAA applies):**
24. Notice of Privacy Practices (separate from general privacy policy)
25. Uses and disclosures of PHI
26. Patient rights under HIPAA
27. Complaints process

**COPPA-specific sections (if COPPA applies):**
28. Parental consent mechanism description
29. Parental rights to review and delete child's information
30. Types of personal information collected from children
31. How children's information is used

### Plain Language Requirements
- Use active voice ("We collect" not "Data is collected")
- Define technical terms on first use
- Use specific examples where helpful ("such as your name, email address, and billing address")
- Avoid double negatives
- Keep sentences under 25 words where possible
- Use headers and bullet points for scannability
- Target an 8th-grade reading level

### Data Practice Disclosure Methodology
For each data practice, the privacy policy should answer:
1. **What** data is collected?
2. **Why** is it collected? (Purpose)
3. **How** is it collected? (Direct from user, automatically, from third parties)
4. **Who** sees it? (Internal teams, specific service providers, categories of third parties)
5. **Where** does it go? (Countries, cloud providers)
6. **How long** is it kept? (Specific retention periods)
7. **What can the user do?** (Access, delete, correct, opt out)

---

## Edge Cases

### Product serves multiple jurisdictions
- Assess each regulation independently
- Identify conflicts between regulatory requirements (e.g., data retention obligations under one regulation vs. deletion requirements under another)
- Recommend implementing the most restrictive requirement as the baseline, with jurisdiction-specific exceptions where necessary
- Privacy policy should have jurisdiction-specific sections or a layered notice approach

### Regulation is ambiguous for product type
- Document the ambiguity explicitly
- Provide a reasoned interpretation with confidence level
- Recommend seeking legal counsel for the specific question
- Apply the more conservative interpretation as the default recommendation

### No clear regulation applies
- Document why no specific regulation applies (geography, data types, thresholds)
- Recommend privacy best practices as a voluntary baseline (minimize data collection, support deletion requests, publish a privacy policy)
- Note that regulatory landscape is evolving — new state/national laws may apply in the future
- Flag if the product is near any regulatory threshold (approaching 100K users in California, planning EU expansion, etc.)

### Product pivots into regulated territory
- If a product initially outside regulatory scope plans to add features or markets that trigger regulation (e.g., adding health data, expanding to EU), assess the future state as well as the current state
- Include proactive recommendations in the remediation roadmap

---

## Sources

- **GDPR:** Regulation (EU) 2016/679 — https://gdpr-info.eu/
- **CCPA/CPRA:** California Civil Code, Title 1.81.5 — https://oag.ca.gov/privacy/ccpa
- **HIPAA:** 45 CFR Parts 160, 162, 164 — https://www.hhs.gov/hipaa/
- **PCI-DSS:** PCI Security Standards Council — https://www.pcisecuritystandards.org/
- **COPPA:** 16 CFR Part 312 — https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa
- **FERPA:** 34 CFR Part 99 — https://www2.ed.gov/policy/gen/guid/fpco/ferpa/
- **GLBA:** 15 USC Chapter 94 — https://www.ftc.gov/legal-library/browse/statutes/gramm-leach-bliley-act
- **PIPEDA:** Personal Information Protection and Electronic Documents Act — https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/
- **LGPD:** Lei Geral de Protecao de Dados Pessoais — https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd
- **IAPP:** International Association of Privacy Professionals — https://iapp.org/
- **US State Privacy Legislation Tracker:** IAPP — https://iapp.org/resources/article/us-state-privacy-legislation-tracker/
