---
name: threat-modeling
description: Apply STRIDE threat analysis to a proposed system architecture for a SaaS or digital product. Use when the user asks to identify threats, analyze attack vectors, assess security risks, run STRIDE analysis, perform threat modeling, find vulnerabilities in an architecture, or evaluate the security posture of a system design. Covers per-component STRIDE analysis, attack tree construction, risk rating, and prioritized mitigation recommendations.
---

# Threat Modeling

Produce a structured, STRIDE-based threat model for SaaS and digital product architectures. Unlike raw LLM output that lists generic security concerns, this skill systematically applies STRIDE categories to every component boundary and data flow from the Architecture Design output, constructs attack trees for the highest-severity threats, rates every threat on a defined likelihood-by-impact matrix, and produces mitigations specific to the actual tech stack — not boilerplate security advice.

## Core Workflow

### Step 1: Gather Architecture Context

**If No Architecture Exists:**

If the user cannot provide an architecture design, use a lightweight approach:

1. **Request minimum context:**
   - What type of application? (web, mobile, API, etc.)
   - What data does it handle? (PII, financial, health, none)
   - Who are the users? (public, authenticated, admin)
   - What integrations exist? (payment, third-party APIs)
   - What is the deployment? (cloud, on-prem, serverless)

2. **Create minimal architecture assumption:**
   - Standard web architecture: Browser → Load Balancer → API → Database
   - Note assumptions explicitly
   - Flag as "inferred" vs "confirmed"

3. **Scope appropriately:**
   - Acknowledge gaps in inferred architecture
   - Recommend full architecture design as follow-up
   - Focus on generic threats that apply regardless of specific architecture

---

Before modeling threats, establish what you're analyzing:

1. **Identify the input source:** Is there Architecture Design output available (containers, data flows, auth design, storage, trust boundaries)? Or is this a standalone request?
   - If Architecture Design exists: extract containers, data flows with trust boundaries, auth approach, storage architecture, external dependencies, and any security gaps flagged in the Architecture Decision Record
   - If standalone: ask the user for system components, data flows, authentication approach, and external integrations — do not guess at architecture
2. **Extract the security baseline:** If a Security Requirements Baseline exists, pull the requirements checklist and priority summary to cross-reference against threats
3. **Identify threat actors:** Based on the product type, target users, and data sensitivity, define who would attack this system and why:
   - External attackers (opportunistic, targeted)
   - Malicious insiders (employees, contractors)
   - Compromised third parties (supply chain, integration partners)
   - Automated threats (bots, credential stuffing)
4. **Define scope boundaries:** What is in scope for this threat model (your system, your code, your infrastructure) and what is out of scope (third-party SaaS internals, cloud provider infrastructure)

If the user provides vague input (e.g., "find security issues" with no architecture), ask for the architecture context before proceeding. Do not invent components.

### Step 2: Identify Threat Targets

Map the attack surface from the architecture:

1. **Enumerate component boundaries:** List every container from the Container Architecture diagram and its exposed interfaces
2. **Enumerate data flows:** List every data flow from the Data Flow Diagrams, noting sensitivity level and trust boundary crossings
3. **Enumerate trust boundaries:** Identify every point where data crosses from one trust zone to another (browser to server, server to external API, server to database, public to authenticated)
4. **Enumerate external integrations:** List every third-party dependency and the data exchanged with it
5. **Build the threat target inventory:** Create a table of all targets: component boundaries, data flows crossing trust boundaries, authentication/authorization enforcement points, and data stores

This inventory becomes the input for STRIDE analysis — every row must be analyzed.

### Step 3: Apply STRIDE per Component Boundary

For each threat target in the inventory, systematically apply all six STRIDE categories:

1. **Spoofing:** Can an attacker impersonate a legitimate user, service, or component at this boundary?
2. **Tampering:** Can an attacker modify data in transit or at rest at this point?
3. **Repudiation:** Can a user deny performing an action because the system lacks audit evidence?
4. **Information Disclosure:** Can sensitive data leak through this boundary (in logs, error messages, API responses, side channels)?
5. **Denial of Service:** Can an attacker exhaust resources or block legitimate access at this point?
6. **Elevation of Privilege:** Can an attacker gain higher permissions than intended at this boundary?

For each applicable threat, document: the specific attack vector, which data or functionality is at risk, and which existing controls (if any) already mitigate it. Reference the methodology in [references/framework.md](references/framework.md).

Not every STRIDE category applies to every component — document why a category is not applicable when you skip it, so the analysis is visibly complete.

### Step 4: Build Attack Trees for Top Threats

Select the top 3 threats by preliminary severity and construct attack trees:

1. **Root node:** The attacker's goal (e.g., "Exfiltrate invoice data for all users")
2. **Sub-goals:** What intermediate objectives must be achieved (e.g., "Bypass row-level security" OR "Compromise admin credentials")
3. **Attack methods:** Specific techniques for each sub-goal (e.g., "SQL injection in search endpoint" or "Phishing the admin email")
4. **Required capabilities:** What the attacker needs (skill level, access, tools, time)
5. **Existing controls:** What currently blocks each path
6. **Residual paths:** Which attack paths remain viable after existing controls

Attack trees expose compound threats that single-category STRIDE analysis misses. They also show which mitigations have the highest leverage (blocking a node that appears in multiple paths).

### Step 5: Rate Risks (Likelihood x Impact)

For every identified threat, assign a risk rating using the detailed criteria below:

**Likelihood Scoring (1-5):**

| Score | Rating | Criteria |
|-------|--------|----------|
| 1 | Very Unlikely | No known exploits, strong controls, high attacker skill required |
| 2 | Unlikely | Possible with specific conditions, some controls in place |
| 3 | Possible | Exploitable under normal conditions, partial controls |
| 4 | Likely | Exploitable by opportunistic attacker, weak/no controls |
| 5 | Very Likely | Trivial to exploit, no controls, active threats exist |

**Likelihood Factors to Consider:**
- Threat actor capability (script kiddie vs APT)
- Attack complexity (one-click vs multi-step)
- Required privileges (none vs admin)
- Existing controls (defense in depth vs single control)
- Public availability of exploit (none vs well-known)

**Impact Scoring (1-5):**

| Score | Rating | Criteria |
|-------|--------|----------|
| 1 | Negligible | No data loss, no service impact, no reputational effect |
| 2 | Minor | Limited data exposure, brief downtime, minor reputational |
| 3 | Moderate | Significant data exposure, extended downtime, regulatory notice |
| 4 | Major | Large-scale breach, sustained outage, legal liability |
| 5 | Catastrophic | Business-ending breach, massive liability, criminal investigation |

**Risk Level = Likelihood x Impact:**

| Score | Rating | Action |
|-------|--------|--------|
| 20-25 | Critical | Immediate action required |
| 12-19 | High | Address within sprint |
| 6-11 | Medium | Plan for next iteration |
| 1-5 | Low | Address when time permits |

Use the rating criteria defined in [references/framework.md](references/framework.md). Apply consistently — do not rate every threat as "High" without differentiation.

Build the Risk Register: a sorted table of all threats ranked by risk level, with severity classification.

### Step 6: Recommend Mitigations Prioritized by Risk Rating

For each threat in the Risk Register (starting with Critical, then High):

1. **Specific mitigation:** What to implement, using the actual tech stack from the architecture (not generic advice like "use encryption" — specify what encryption, where, how)
2. **Effort estimate:** Low (< 1 day), Medium (1-3 days), High (1-2 weeks), Very High (> 2 weeks)
3. **Risk reduction:** How much the risk rating drops after mitigation (re-score likelihood and impact)
4. **Implementation guidance:** Concrete steps for the tech stack (e.g., "Add Supabase RLS policy: `auth.uid() = user_id` on the invoices table" not "implement access controls")
5. **Residual risk:** What risk remains after mitigation and whether it's acceptable

Prioritize mitigations by risk-reduction-per-effort: a Low-effort mitigation that reduces a Critical risk is higher priority than a High-effort mitigation that reduces a Medium risk.

### Remediation Priority Matrix

Use this matrix to prioritize which threats to address first:

| | Low Effort | Medium Effort | High Effort |
|---|---|---|---|
| **Critical Risk** | **P1 - IMMEDIATE** | **P2 - This Sprint** | **P3 - Plan Now** |
| **High Risk** | **P2 - This Sprint** | **P3 - Plan Now** | **P4 - Backlog** |
| **Medium Risk** | **P3 - Plan Now** | **P4 - Backlog** | **P5 - Consider** |
| **Low Risk** | **P4 - Backlog** | **P5 - Consider** | **P5 - Consider** |

**Decision Rules:**
1. Any Critical risk with Low effort → Address immediately
2. High risk + Low effort → Address in current sprint
3. If multiple P1 items exist, prioritize by risk reduction magnitude
4. Document why items are deprioritized

### Step 7: Synthesize Threat Model Summary

Produce the summary deliverable:

1. **Threat counts by severity:** Total Critical, High, Medium, Low threats
2. **Top 3 risks:** The three threats with the highest risk ratings, with one-sentence descriptions
3. **Security posture assessment:** Overall assessment of the architecture's security readiness (Strong, Adequate, Needs Improvement, Weak) with justification
4. **Quick wins:** 3-5 mitigations that are Low effort and address High/Critical risks
5. **Handoff notes:** What the Security Architecture Review skill should investigate further

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Threat Modeling Context** -- product summary, architecture summary, scope, threat actors
- **STRIDE Analysis** -- per-component analysis with threat category, attack vector, risk rating
- **Attack Trees** -- top 3 threats expanded into sub-goals and attack paths
- **Risk Register** -- all threats ranked by risk level with severity classification
- **Recommended Mitigations** -- per-threat fixes with effort, implementation guidance, residual risk
- **Threat Model Summary** -- severity counts, top risks, posture assessment, handoff notes

Expected length: 3,000-5,000 words depending on architecture complexity.

## Quality Criteria

- [ ] STRIDE applied to every component boundary and trust boundary crossing (not just the obvious ones)
- [ ] Attack trees constructed for top 3 threats with sub-goals, methods, and required capabilities
- [ ] Risk ratings use the defined 1-5 Likelihood x 1-5 Impact scale consistently
- [ ] Every threat in the Risk Register has a severity classification (Critical/High/Medium/Low)
- [ ] Mitigations are specific to the actual tech stack (reference specific libraries, configurations, services)
- [ ] Effort estimates provided for every mitigation
- [ ] Residual risk assessed after each mitigation
- [ ] Trust boundaries from the Architecture Design data flows are all accounted for
- [ ] Threat actors identified and referenced in likelihood assessments
- [ ] Analysis is specific to the scenario — not generic security advice that applies to any SaaS product

## References

- **STRIDE methodology and risk rating framework:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (InvoiceFlow):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Surface-level threat listing without STRIDE categories:** Listing generic threats ("SQL injection," "XSS," "data breach") without systematically applying STRIDE to each component boundary. The value of STRIDE is exhaustive category coverage — skipping categories means missed threats. Every component must be analyzed against all six categories, with explicit "not applicable" notes where a category doesn't apply.

2. **Ignoring indirect and data flow threats:** Focusing only on direct attacks (someone hacks the API) while ignoring threats that travel through data flows — poisoned inputs from third-party integrations, webhook tampering, malicious file uploads processed by background jobs, or AI prompt injection through user-supplied content. Analyze every data flow that crosses a trust boundary.

3. **Treating all threats as equal severity:** Listing 20 threats without differentiating a Critical risk (payment data exfiltration) from a Low risk (verbose error messages). The risk matrix exists to force prioritization. If every threat is rated High, the rating system isn't being applied — re-calibrate using the likelihood and impact criteria.

4. **Recommending mitigations without effort or feasibility context:** Suggesting "implement mutual TLS between all services" for a solo-founder MVP, or "add a WAF" without specifying which WAF or what rules. Mitigations must include effort estimates and be realistic for the team size, budget, and stage described in the architecture. A solo founder needs different advice than a 20-person security team.

5. **Missing trust boundary analysis:** Analyzing individual components in isolation without examining what happens at the boundaries between them. The most exploitable vulnerabilities occur where data crosses trust boundaries — browser to server, server to third-party API, authenticated to unauthenticated zones. If trust boundaries aren't explicitly enumerated and analyzed, the threat model has structural gaps.
