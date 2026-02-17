# Output Schema: User Persona Creation

This file defines the exact structure of the User Persona Creation skill output. Every persona output must conform to this schema. Fields marked (required) must be populated; fields marked (conditional) are included when relevant data exists.

## Output Structure

```
# User Personas: [Product Name]

## Context

### Product Overview (required)
- Product (required): One-sentence product description
- Target market (required): Primary market segment and customer profile
- Stage (required): Pre-launch / Early-stage / Growth-stage
- Research inputs (required): What evidence was used (interviews, analytics, assumptions, etc.)

### Methodology Notes (required)
- Segmentation approach (required): How personas were segmented (JTBD, adoption stage, etc.)
- Evidence quality (required): Overall confidence assessment (Evidence-driven / Mixed / Hypothesis-driven)
- Limitations (required): What data was unavailable or assumed

---

## Persona [N]: [Persona Name]

### Identity (required)
- Name (required): Realistic first name
- Role (required): Job title or function
- Behavioral summary (required): One sentence capturing their primary behavior pattern
- Context (required): Company size, industry, team structure — only attributes that affect product decisions
- Technical proficiency (required): Low / Medium / High — affects onboarding and UX expectations
- Adoption lifecycle position (required): Innovator / Early Adopter / Early Majority / Late Majority / Laggard

### Jobs-to-Be-Done (required)
- Functional job (required): What they need to accomplish, with context
- Emotional job (required): How they want to feel
- Social job (required): How they want to be perceived
- Job frequency (required): How often they need to do this (daily, weekly, monthly, event-driven)
- Desired outcome (required): What success looks like after the job is done

### Current Workflow (required)
- Steps (required, minimum 3): Numbered list of how they accomplish the job today
- Tools used (required): Current tools/methods for each step
- Friction points (required, minimum 2): Where the current workflow breaks down, marked with severity

### Pain Points (required, minimum 3)
For each pain point:
- Description (required): Specific, observable frustration
- Workflow step (required): Which step in the current workflow this pain occurs
- Type (required): Functional / Emotional / Financial / Process
- Severity (required): Critical / High / Medium / Low
- Confidence (required): [H] / [M] / [L]

### Gains Sought (required, minimum 3)
For each gain:
- Description (required): What "better" looks like
- Type (required): Required / Expected / Desired / Unexpected
- Confidence (required): [H] / [M] / [L]

### Decision Criteria (required)
- Ranked criteria (required, minimum 3, maximum 5): Ordered list of what matters most when choosing a tool
- Evaluation method (required): How they evaluate (free trial / demo / peer ask / comparison site / etc.)
- Purchase authority (required): Self / Team lead / Manager / Executive / Procurement
- Budget range (conditional): Monthly or annual budget if known or estimable

### SaaS-Specific Attributes (required)
- Adoption trigger (required): What event causes them to search for a solution
- Time to value expectation (required): How quickly they need to see results (minutes / hours / days / weeks)
- Willingness to pay (required): Price sensitivity and budget range
- Churn signals (required, minimum 2): Behaviors that predict they'll leave
- Expansion triggers (conditional): What causes upgrade or seat addition
- Switching costs (required): What makes it hard to leave their current solution

### Quotes (conditional)
- Representative quotes (minimum 2 if included): Realistic statements this persona would make, based on interview patterns or inferred from behavior. Label source: [from research] or [synthesized].

---

[Repeat for each persona — minimum 2, maximum 4]

---

## Persona Priority Matrix (required)

| Persona | Revenue Potential | Acquisition Feasibility | Retention Potential | Product Alignment | Overall Priority |
|---------|------------------|------------------------|--------------------|--------------------|-----------------|
| [Name]  | H/M/L            | H/M/L                 | H/M/L              | H/M/L              | Primary/Secondary/Tertiary |

### Priority Rationale (required)
- Primary persona: [Name] — [Why this persona is highest priority, 1-2 sentences]
- Secondary persona: [Name] — [Why second, 1-2 sentences]
- [Additional as needed]

## Relationship Map (required)

### Interactions (required)
- [How personas interact: buyer vs. user, champion vs. decision-maker, collaborators]

### Conflicts (conditional)
- [Where persona needs conflict and how to resolve]

## Confidence Summary (required)

### Evidence Distribution (required)
| Persona | High Confidence | Medium Confidence | Low Confidence |
|---------|----------------|-------------------|----------------|
| [Name]  | X%             | X%                | X%             |

### Key Assumptions (required, minimum 2)
| # | Assumption | Impact if Wrong | Confidence |
|---|-----------|-----------------|------------|
| 1 | [assumption] | [consequence] | [H/M/L] |

## Validation Plan (required)

### Highest-Risk Assumptions (required, minimum 3)
| # | Assumption | Validation Method | Timeline | Owner |
|---|-----------|-------------------|----------|-------|
| 1 | [assumption] | [interview / survey / analytics / A/B test] | [when] | [who] |

### Update Triggers (required)
- [Events that should trigger persona revision]
```

## Field Definitions

### Behavioral Summary
- **What:** A single sentence that captures the persona's primary relationship with the product and their defining behavior pattern.
- **Format:** 1 sentence, structured as "[Role] who [behavior] because [motivation]."
- **Good example:** "Agency owner who obsessively tracks project margins because one unprofitable project can tank the quarter."
- **Bad example:** "Marketing professional who uses project management tools." (Generic, no behavior, no motivation.)

### Functional Job (JTBD)
- **What:** The primary practical task the persona hires the product to accomplish, stated with context.
- **Format:** Verb-first statement with context clause. 1-2 sentences.
- **Good example:** "Coordinate task assignments, deadlines, and deliverables across a 5-15 person remote team spread across 3+ timezones, so that client projects ship on time without requiring daily standup calls."
- **Bad example:** "Manage projects." (No context, not testable, solution-agnostic without being specific.)

### Pain Point Description
- **What:** A specific, observable frustration tied to a workflow step.
- **Format:** 1-2 sentences describing the situation, including frequency and impact where possible.
- **Good example:** "Every Monday, spends 45+ minutes compiling status updates from Slack threads, email chains, and Google Sheets into a client-facing progress report. Frequently misses items, leading to client follow-up emails." [Process / Critical]
- **Bad example:** "Frustrated with status reporting." (Not specific, not observable, not tied to a step.)

### Decision Criteria (Ranked)
- **What:** The top 3-5 factors this persona weighs when choosing a SaaS tool, in priority order.
- **Format:** Numbered list, highest priority first. Each item includes what the criterion means for this specific persona.
- **Good example:** "1. Ease of use (team is non-technical, won't adopt complex tools) 2. Client-facing features (needs to share progress with external stakeholders) 3. Price (agency margins are thin, can't justify >$30/user/mo)"
- **Bad example:** "Price, features, ease of use" (Not ranked meaningfully, no persona-specific context.)

### Adoption Trigger
- **What:** The specific event, situation, or threshold that causes this persona to actively search for a solution.
- **Format:** 1-2 sentences describing the trigger event and context.
- **Good example:** "Missed a client deadline because a task was assigned in Slack but never tracked — the client escalated to the agency owner, who mandated 'find a project management tool this week.'"
- **Bad example:** "Needs better project management." (Not an event, not a trigger.)

### Churn Signals
- **What:** Observable behaviors that predict this persona is likely to stop using the product.
- **Format:** Bullet list of 2-4 specific behavioral indicators.
- **Good example:** "Stops inviting new team members (team growth stalls in the tool). Exports project data to spreadsheets (reverting to old workflow). Opens fewer than 3 sessions per week (was previously daily)."
- **Bad example:** "Gets frustrated and leaves." (Not observable, not specific.)

## Validation Rules

1. Minimum 2 personas, maximum 4 (any more must be justified)
2. Every persona has all (required) fields populated with non-placeholder content
3. Every persona has at least 3 pain points, each with severity and type classification
4. Pain points must reference a specific workflow step (not generic complaints)
5. Decision criteria are ranked (numbered, not bulleted)
6. SaaS-specific attributes section is complete (adoption trigger, churn signals, willingness to pay at minimum)
7. Technology adoption lifecycle position is assigned and consistent with the persona's described behavior
8. Confidence tags [H/M/L] appear on all pain points and gains
9. Persona Priority Matrix ranks all personas with rationale
10. Validation Plan includes at least 3 testable assumptions with specific methods
11. Each persona is meaningfully differentiated — no two personas share the same JTBD AND the same decision criteria AND the same adoption trigger
12. Quotes, if included, are labeled as [from research] or [synthesized]

## Confidence Tagging

- **High [H]:** Based on direct user research (interviews, usability tests), product analytics, or verified customer data. The attribute has been observed or stated by real users.
- **Medium [M]:** Based on reasonable inference from limited data — industry patterns, analogous products, a small number of data points, or team domain expertise. Likely accurate but not directly validated.
- **Low [L]:** Based on assumption, founder intuition, or general market knowledge. Needs validation before making significant product decisions based on this attribute.

Tag each pain point, gain, and SaaS-specific attribute with its confidence level. If a persona has >50% Low confidence attributes, label the entire persona as "Hypothesis — requires validation" in the Confidence Summary.
