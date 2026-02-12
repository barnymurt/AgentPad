# AgentPad Product Design

**Date:** 2026-02-12
**Status:** Reviewed and refined through brainstorming session
**Author:** Brainstorm session between owner and AI
**Scope:** SaaS and digital products only (not physical products)

---

## 1. Current State

AgentPad is currently a developer framework with:

- **3-layer architecture** (directives / orchestration / execution) defined in `AGENTS.md`
- **14 skills** from Anthropic focused on document creation (docx, pdf, pptx), design (frontend, canvas, algorithmic art, brand guidelines, themes), web artifacts (React/Tailwind builder), testing (Playwright), internal comms, MCP server building, and a skill creator
- **Resource registry** (`RESOURCES.md`) linking to Superpowers, Vercel Agent Skills, wshobson/agents, and Claude Code Agent Teams
- **No populated directives or execution scripts** — the `directives/` and `execution/` directories are empty
- **No frontend, user auth, database, or billing infrastructure**

The 3-layer architecture is a solid foundation. It separates AI decision-making (probabilistic) from business logic execution (deterministic), which is exactly what a product handling real business data needs under the hood. The existing 14 skills are all **production skills** — they create documents, presentations, web pages, and images. What's missing is the **research and analysis skill layer** that a real cross-functional product team needs: competitor research, business case modeling, user persona creation, data analysis, security review, and go-to-market strategy. Without these, the production skills have nothing meaningful to say. See Section 10 (Skill Architecture) for the full skill map.

---

## 2. Product Concept

**One-liner:** AgentPad turns SaaS and digital product ideas into validated, data-backed product concepts — refined to your brand, your market, and your data.

**The problem:** SME owners and startup founders building SaaS or digital products have ideas but lack the team, time, or technical skill to properly validate, refine, and begin building them. They currently use a patchwork of consultants, freelancers, ChatGPT, and spreadsheets. Nothing connects ideation to execution in a structured, repeatable way. And generic AI tools give generic answers — they don't know your business, your brand, or your customers.

**The value proposition:** AgentPad gives you a virtual product team that knows your business. You describe your idea in plain language. AI agents refine it using your brand context, your data, and your market — then produce tangible, insight-driven deliverables that look and feel like they came from your team, not a template.

**Key differentiators:**

### Differentiator 1: Business Context Engine (the moat)

Unlike ChatGPT which starts from zero every session, AgentPad builds a persistent, evolving profile of the user's business:

- Users get value immediately — describe an idea, get an initial analysis before investing any effort
- Then prompted to enrich: upload brand assets (logo, colors, fonts, tone of voice), describe target market, identify competitors
- Optionally connect data sources: analytics (Google Analytics, Stripe), CRM, social media metrics, customer feedback
- Over time the profile gets richer — AgentPad learns their market, customers, and voice
- Every output is filtered through this context. A pitch deck for a fintech SaaS sounds completely different from one for an e-commerce wellness brand
- Value first, investment second — see Section 5 for the full onboarding flow

### Differentiator 2: Insight-Driven Deliverables

Outputs are not generic templates. They are:

- Backed by reasoning chains visible to the user: "Based on your Stripe data showing X, and market trend Y, we recommend Z"
- Styled in the user's brand (colors, fonts, tone of voice, imagery style)
- Specific to the user's industry, market position, and customer base
- Tagged with confidence indicators (high/medium/low) based on data quality

### Differentiator 3: Two Modes (Sprint vs. Discovery)

Right at the start, the user chooses their path:

- **Sprint Mode** — "I need something now." Quick turnaround. 3-5 targeted questions, deliverable in minutes. For pop-up campaigns, quick landing pages, investor one-pagers, social media launch assets.
- **Discovery Mode** — "I'm developing something bigger." Full pipeline with validation, prioritization, and phased execution. For new product lines, pivots, or greenfield SaaS concepts.

Both modes draw from the same business context engine. A Sprint can evolve into a Discovery project if the idea has legs.

### Differentiator 4: Devil's Advocate / Customer Advocate

Unlike generic AI tools that agree with everything, AgentPad actively challenges ideas:

- Assumption challenging: "Why would a customer choose this over doing nothing?"
- Customer objection modeling: "Here are the top 3 objections your target customer would raise"
- Value proposition testing: "Does this actually solve a problem people will pay for?"
- Competitive switching analysis: "What would make someone leave their current tool for yours?"

This is refreshing and genuinely useful — it simulates the pushback a good product manager or investor would give, and it's the feature that most distinguishes AgentPad from supportive-but-uncritical AI chat.

### Differentiator 5: Trust Through Transparency

- **Show the work:** Every recommendation comes with evidence — data points, competitor examples, market signals
- **Progressive confidence building:** Start with small, verifiable claims ("We found these 5 competitors — does this match what you know?") before making bigger recommendations
- **User remains the expert:** AgentPad presents options with trade-offs. The user decides.
- **Plain language, always:** No "agent teams" or "orchestration" in the UI. Instead: "Your team is working on this" or "We're analyzing your data."
- **Three-layer quality system:** Guardrails catch bad output before users see it. Confidence indicators flag uncertainty. Feedback loops improve quality over time. See Section 16.

### Differentiator 6: SaaS / Digital Product Specialization

Narrowing to SaaS and digital products allows depth over breadth:

- Built-in frameworks for SaaS metrics (MRR, churn, LTV, CAC)
- Pricing model analysis specific to subscription businesses
- Feature prioritization using proven frameworks (RICE, ICE, weighted scoring)
- Technical feasibility assessment for software features
- Integration with tools SaaS founders actually use (Stripe, Intercom, Mixpanel, Google Analytics)

---

## 3. Target Users

### Primary: Non-technical SaaS founders and digital product owners

- Time-poor, idea-rich
- Understand their market but not software development
- Building or scaling a SaaS product or digital service
- Want tangible, brand-aligned outputs, not just advice
- Budget-conscious but willing to pay for productivity gains
- Often juggling multiple ideas and need help prioritizing
- May have existing businesses looking to expand, pivot, or launch new product lines

### Secondary: Small technical teams at SaaS startups

- 1-3 person dev teams who need product/strategy support
- Use the CLI/agent tools for hands-on execution
- Want structured planning before they code
- Value test-driven and data-driven approaches
- Already have data in Stripe, analytics, CRM that could inform decisions

### Tertiary (GTM funnel): Developer community

- Developers and AI practitioners who discover AgentPad Skills on GitHub (see Section 14: Go-to-Market Strategy)
- Use individual skills in Claude Code, Cursor, or other agent environments
- Some convert to the paid product when they want the connected pipeline and dashboard
- Some become community contributors, building new skills for the marketplace
- They build credibility and awareness before the non-technical product launches

---

## 4. Core Pipeline

### Mode Selection (the fork)

When a user starts a new project, AgentPad asks one question first: "What kind of project is this?"

- **Sprint Mode** — Quick turnaround. User describes the need, AgentPad asks 3-5 targeted questions, produces a deliverable in minutes. Skips validation and prioritization. For: pop-up campaigns, quick landing pages, investor one-pagers, social media launch assets, urgent marketing needs.
- **Discovery Mode** — Full pipeline. Idea refinement, validation, prioritization, phased execution. For: new SaaS products, feature roadmaps, pivots, greenfield concepts.

A Sprint can be promoted to a Discovery project at any time if the idea warrants deeper exploration.

### Discovery Mode Pipeline

The full user journey flows through six stages. Stages 1-4 and 6 happen in the web dashboard. Stage 5 is handled by agent teams.

#### Stage 1: Idea Input

- User describes their idea in plain language via a conversational chat interface
- AI asks clarifying questions one at a time, preferring multiple choice when possible (modeled on the brainstorming skill pattern)
- Questions focus on: purpose, target customer, how it makes money, constraints, success criteria
- If business context profile exists, the AI uses it to ask smarter, more specific questions
- Devil's Advocate challenges are woven into the conversation: "Why would a customer choose this over doing nothing?" — not as a separate step, but naturally during input
- **Output:** Structured idea brief with initial assumption challenges (stored in the user's project)

#### Stage 2: Refinement

- AI analyzes the idea across dimensions: market fit, competition, feasibility, revenue potential, technical complexity
- Draws on the business context engine — user's brand, existing data, industry knowledge
- Presents findings in digestible sections (200-300 words each)
- User validates each section before the next is generated — incremental buy-in, not a wall of text
- Can flag sections for revision or deeper exploration
- All insights tagged with confidence indicators (high/medium/low) based on data quality
- **Output:** Refined product spec, written in the user's brand voice

#### Stage 3: Validation

- Agent team runs validation tasks:
  - Competitor landscape analysis (web search, public data)
  - Market sizing estimates with SaaS-specific benchmarks
  - User persona generation
  - Risk identification
  - SaaS metrics analysis (if Stripe/analytics connected): churn patterns, revenue trends, feature adoption
- Connects to user's data sources where available, falls back to public data and industry benchmarks where not
- User verification checkpoints: "We identified these 5 competitors — are we on track?" before proceeding
- **Output:** Validation report with confidence scores per dimension and data source attribution

#### Stage 4: Prioritization

- When a user has multiple ideas or features, AgentPad scores and ranks them
- Scoring dimensions: effort vs. impact, market readiness, resource requirements, time to revenue
- Uses proven SaaS frameworks: RICE, ICE, weighted scoring
- Visual matrix view (effort/impact quadrant)
- **Output:** Prioritized backlog with recommended next steps for each item

#### Stage 5: Execution

- Agent teams produce tangible, brand-aligned deliverables based on the validated spec:
  - Landing pages in the user's brand (web-artifacts-builder skill)
  - Pitch decks styled to brand guidelines (pptx skill)
  - Business plans and specs (docx, pdf skills)
  - Technical architecture documents
  - Prototypes (frontend-design skill)
- All deliverables use the business context engine: brand colors, fonts, tone of voice, imagery style
- Each deliverable has a human-in-the-loop checkpoint — agents propose, user approves before finalizing
- Agent team structure modeled on Claude Code Teams pattern: lead agent coordinates, specialist agents execute, shared task list tracks progress
- **Output:** Downloadable/shareable deliverables that look like they came from the user's own team

#### Stage 6: Review and Iterate

- User reviews deliverables, provides natural-language feedback
- Agent teams revise based on feedback
- Can loop back to any earlier stage if the idea pivots
- Version history preserved so users can compare iterations
- **Output:** Approved deliverables or revision requests

### Sprint Mode Pipeline

Compressed flow for urgent, well-defined needs:

1. **Brief** — User describes what they need. AgentPad asks 3-5 targeted questions (drawing on business context if available).
2. **Execute** — Agent produces the deliverable, using brand assets and any available data.
3. **Review** — User reviews, requests changes, or approves.

Sprint deliverables can be promoted to Discovery projects ("This quick analysis is revealing — let's build a full product spec around this idea").

**Sprint Mode capabilities by phase:**

| Phase | Sprint Can Produce |
|-------|-------------------|
| MVP | Quick idea analysis, assumption challenges, competitor snapshot, idea brief |
| Phase 2 | Above + validation summaries, prioritization snapshots |
| Phase 3 | Above + landing pages, pitch decks, one-pagers, social media assets |

Sprint Mode grows in value as more skills come online. At MVP it's fast analysis, not fast production — but that's still valuable and honest.

---

## 5. Business Context Engine and Data Model

### How the Context Engine Works

The business context engine is AgentPad's core moat. It builds a persistent, evolving profile of the user's business that enriches every output.

**Value-First Onboarding (no homework before first value):**

The onboarding is designed so the user gets value *before* being asked to invest effort:

1. **Sign up** — email only, minimal friction
2. **"What's your idea?"** — immediate conversation. The user describes their SaaS or digital product idea in plain language.
3. **First output** — AgentPad delivers a quick initial analysis with Devil's Advocate challenges. This happens with zero brand assets, zero data connections, zero profile building. The user sees value in the first 5 minutes.
4. **The enrichment prompt** — "Want to make this more specific to your business? Tell us a bit more and we'll sharpen the results." Now the user is motivated to invest because they've seen what generic looks like and want better.
5. **Guided context building** — Conversational, not a form:
   - Who is your target customer? (multiple choice personas or free text)
   - What problem are you solving? How are they solving it today?
   - What's your rough pricing model? (one-time, subscription, freemium)
   - Upload any brand assets you have — even just a logo and a color you like
   - Who do you consider competitors?
6. **Second output** — Same analysis, now brand-contextual and market-specific. The user sees the difference. This is the conversion moment.

This works for pre-launch startups with zero assets. The profile starts thin but it's *theirs*, and it gets richer as they use the product. Users who have nothing to upload can skip — the system degrades gracefully.

**Data connections (optional, upgrade trigger):**

Connected data sources make insights stronger but are never required. The data connections become a natural upsell: "You're making decisions based on assumptions — connect Stripe to get revenue-backed insights instead."

### Tiered Data Model

| Data Tier | Source | Confidence | Available On |
|-----------|--------|------------|-------------|
| Conversational | User's own answers during onboarding and refinement | Medium | All tiers |
| Public | Competitor websites, industry data, market reports via web search | Medium | All tiers |
| Brand Assets | Uploaded logo, colors, fonts, copy samples, tone of voice | High (user-provided) | All tiers |
| Connected | Stripe, Analytics, CRM, social media metrics | High (real data) | Starter+ |
| Enriched | Third-party data APIs (market sizing, industry benchmarks) | Medium-High | Growth+ |

### Data Quality Handling

The product must degrade gracefully, not fail catastrophically.

**No data:** Conversational context plus public data. Still useful, still personalized to their answers.

**Patchy or messy data:** Data health check on connection:
- "We found 1,200 customer records but 30% have no email — we'll work with the 70% that are complete"
- "Your analytics show a tracking gap between March and June — we'll flag insights from that period as low-confidence"
- "We detected what looks like test data in Stripe (transactions under $1) — should we exclude these?"

**Wrong data or false positives:** User verification checkpoints before acting on data:
- "We identified these 5 companies as your main competitors — are we on track?"
- "We're looking at traffic to these pages for conversion analysis — are these the right pages?"
- "Here's what we understand about your customer segments — does this match your experience?"

Every insight gets a confidence indicator. Users can see at a glance which recommendations are rock-solid and which are educated guesses.

---

## 6. Interface Design

### Web Dashboard (primary interface for non-technical users)

**Design philosophy:** Clean, minimal, purposeful. Think Notion meets Linear — no clutter, no dashboards full of charts nobody reads.

**Key views:**

- **Idea Pipeline:** Visual kanban/pipeline view showing where each idea sits across the stages. Cards are draggable, color-coded by status, labeled Sprint or Discovery.
- **Conversation View:** Chat-like interface for idea input and refinement. Feels natural, not like filling out a form. Multiple choice options rendered as clickable cards. Devil's Advocate challenges displayed as distinct, visually differentiated cards (different color/icon) so users recognize them as constructive pushback, not errors.
- **Deliverables Gallery:** Card-based previews of all generated deliverables. Click to expand, download, or share. Thumbnails generated for visual assets.
- **Prioritization Matrix:** Effort vs. impact quadrant with ideas plotted as bubbles. Interactive — drag to re-score, click for details.

**Inline UI elements across all views:**

- **Credit cost indicator:** Shown before every action ("This will use ~10 credits. Proceed?"). Credit balance always visible in the header.
- **Confidence badges:** Every insight and recommendation tagged with High/Medium/Low confidence. Click to see the data sources behind it.
- **Feedback buttons:** Thumbs up/down on every output, with optional "What's wrong?" categorization (wrong data, off-brand tone, too generic, missing info).
- **Source attribution:** Expandable "How we got here" section on every analysis showing data sources, reasoning chain, and assumptions made.

**Design principles:**

- No code, no terminal, no jargon anywhere in the UI
- Progressive disclosure — show complexity only when the user asks for it
- Every screen answers one question: "What should I do next?"
- Mobile-responsive from day one (SME owners are often on their phones)
- Transparency is a design pattern, not an afterthought — confidence, credits, and sources are always visible

### CLI / Agent Tools (secondary interface for technical teams)

- Direct access to agent teams and execution scripts via terminal
- Integrates with existing dev workflows (git, CI/CD)
- Can run locally or connect to AgentPad cloud backend
- Uses the 3-layer architecture directly (directives, orchestration, execution)
- Available only on Growth tier and above

---

## 7. Revenue Model

### Recommended: Credits-Based Hybrid

Credits are the industry standard for AI SaaS billing (used by Anthropic, OpenAI, Jasper, and most successful AI products). Credits abstract away the complexity of token costs into a unit users understand: "I have credits, actions cost credits."

| Tier | Price | Credits/mo | Active Ideas | Key Features |
|------|-------|-----------|-------------|--------------|
| Free | $0 | 20 | 1 | Conversational refinement, idea brief output, Devil's Advocate challenges |
| Starter | $29/mo | 200 | 5 | Full pipeline, validation reports, prioritization, data connections, rollover credits |
| Growth | $79/mo | 1,000 | Unlimited | Premium deliverables (landing pages, pitch decks, prototypes), CLI access, export/share, priority agents |
| Scale | $199/mo | 5,000 | Unlimited | API access, custom skills, team seats, dedicated support, overage pricing |

**Credit cost examples (shown to user before each action):**

| Action | Credits | Why |
|--------|---------|-----|
| Quick idea analysis (Sprint) | 5 | Single model, short output |
| Refinement conversation (per section) | 3 | Mid-tier model, structured output |
| Devil's Advocate challenge | 5 | Expensive model (complex reasoning) |
| Competitor research | 10 | Multiple model calls, web search |
| Full validation report | 25 | Multiple skills, data aggregation |
| Pitch deck generation | 20 | Multi-step generation + brand styling |
| Landing page generation | 20 | Code generation + brand styling |
| Business case model | 15 | Complex reasoning + data analysis |
| Deep dive add-on (one-time) | 50 | Comprehensive multi-skill analysis |

**Why credits work:**

- **Intuitive:** Users understand "I have 200 credits" better than "50 agent executions"
- **Flexible:** Users spend credits where they see value, not forced into a rigid plan
- **Transparent:** Cost shown before each action eliminates surprise and anxiety
- **Upsell-friendly:** "You're out of credits — top up or upgrade" is a natural conversion moment
- **Margin-safe:** Credit pricing is set to ensure healthy margins regardless of which models are used under the hood (see Section 15: LLM Cost Management)

**Top-up option:** Users can buy additional credit packs ($10 for 50 credits) without upgrading tier. Captures impulse usage and reduces churn from users who occasionally exceed their allowance.

### Additional Revenue Opportunities

- **Deep dive add-ons:** One-time purchases for comprehensive market analysis, competitor audit, or financial modeling (e.g., $49-149 per report)
- **Skill marketplace:** Community-created agent skills with AgentPad taking a percentage of each sale
- **White-label / API licensing:** Agencies and consultancies can offer AgentPad's pipeline to their own clients under their brand
- **Enterprise custom:** Bespoke pricing for larger organizations with custom security, SSO, dedicated infrastructure

---

## 8. Security and Data Practices

Business users deal with sensitive commercial information — their ideas are intellectual property, and some workflows involve customer data and financial information. Security is not optional.

### Data Protection

- **Tenant isolation:** Each customer's ideas, specs, and deliverables are isolated at the database level (row-level security minimum, tenant-per-schema preferred for paid tiers)
- **Encryption:** All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- **No training on user data:** Customer business ideas and data are never used to train AI models. This must be explicit in terms of service and privacy policy.
- **Data retention:** Users control their data lifecycle. Right to export and right to delete on demand.

### Compliance

- **GDPR readiness:** Design for compliance from day one — consent management, data processing records, DPO contact, breach notification procedures
- **SOC 2 Type II:** Target for post-MVP once revenue supports the audit cost. Design infrastructure to be audit-ready from the start (logging, access controls, change management).
- **Audit logging:** All agent actions, data access, and user interactions logged with timestamps and actor identification

### Authentication and Access

- **Auth:** OAuth 2.0 (Google, GitHub, email/password) via Clerk or Auth0
- **MFA:** Required for paid tiers, optional for free
- **Role-based access:** When team seats are introduced (Scale tier), support owner/editor/viewer roles
- **API keys:** Scoped, rotatable, with usage tracking

### Agent-Specific Security

- **PII detection:** When agent teams process market research or user-provided data, PII detection and redaction built into the execution layer
- **Sandboxed execution:** Agent scripts run in isolated environments, no cross-tenant data access
- **Human approval gates:** Agents cannot take irreversible actions (publishing, sending, deleting) without explicit user approval

---

## 9. Technical Architecture

### High-Level Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js (React) | Aligns with Vercel agent skills / best practices. SSR for performance. Large ecosystem. |
| Backend API | Python (FastAPI) | Aligns with existing execution layer and 3-layer architecture. Async-native. |
| Database | PostgreSQL | Structured data for users, ideas, specs, billing. Row-level security for tenant isolation. |
| Vector Store | pgvector or Pinecone | Semantic search across ideas and specs. Powers semantic caching and "find similar ideas." |
| Model Router | Custom (Python) | Classifies requests and routes to cheapest capable model. 80% cheap (Haiku), 20% mid/expensive (Sonnet/Opus). See Section 15. |
| Semantic Cache | Redis + pgvector | Caches similar query patterns to reduce redundant LLM calls. 30-50% cost savings. |
| Quality Gates | LLM-as-Judge + schemas | Structural validation, automated quality review, confidence scoring before output reaches users. See Section 16. |
| Agent Orchestration | 3-layer architecture | Directives define workflows, orchestration layer routes, execution scripts do the work. Agent teams modeled on Claude Code Teams / Superpowers patterns. |
| Deliverable Generation | Existing skills | web-artifacts-builder, pptx, docx, pdf, frontend-design skills generate tangible outputs. |
| Credit Tracking | Stripe Metering API | Real-time credit usage tracking, pre-action cost display, tier enforcement. |
| Auth | Clerk or Auth0 | OAuth 2.0, MFA, session management without building from scratch. |
| Billing | Stripe | Subscriptions, usage metering, invoicing. Well-documented, startup-friendly. |
| Hosting | Vercel (frontend) + Railway or Fly.io (backend) | Vercel for Next.js is natural. Railway/Fly for Python backend with easy scaling. |
| File Storage | S3 or R2 (Cloudflare) | Generated deliverables stored here. Signed URLs for secure download. |

### Data Model (Core Entities)

- **User** — account, auth, subscription tier
- **Organization** — for team seats (Scale tier)
- **BusinessProfile** — the context engine: brand assets, tone of voice, target market, competitor list, industry. Evolves over time.
- **DataConnection** — linked data sources (Stripe, Analytics, CRM) with health status and last sync
- **Idea** — the core entity, tracks stage in pipeline and mode (Sprint/Discovery)
- **IdeaBrief** — structured output from Stage 1
- **ProductSpec** — refined spec from Stage 2
- **ValidationReport** — output from Stage 3 with confidence scores and data source attribution
- **PriorityScore** — scoring data from Stage 4
- **Deliverable** — generated artifact (file reference, type, version, approval status, brand-alignment metadata)
- **AgentSession** — log of agent team execution (tasks, messages, outcomes)
- **Feedback** — user feedback on deliverables, linked to revision history

### Agent Team Architecture

Modeled on the Claude Code Teams pattern with adaptations for a product context:

- **Lead agent:** Receives the validated spec, breaks work into tasks, assigns to specialist agents
- **Specialist agents:** Each owns a deliverable type (landing page agent, pitch deck agent, spec writer agent, etc.)
- **Shared task list:** Tracks progress, dependencies, and completion status
- **Human checkpoints:** After each deliverable draft, execution pauses for user approval
- **Self-annealing:** When an agent task fails, the system retries with error context (per the 3-layer architecture's self-anneal principle)

---

## 10. Skill Architecture

The agent team's value comes from what it knows how to do. Skills are organized into three layers: **Research and Analysis** (figuring out what to build and why), **Strategic and Technical** (how to build it securely and at scale), and **Production** (creating the actual deliverables). Without the first two layers, the production layer produces generic output.

### Layer 1: Research and Analysis Skills

These are the thinking skills. They drive the Discovery pipeline and inform every deliverable.

#### Product Manager

| Skill | What it does |
|-------|-------------|
| Competitor Research | Maps the competitive landscape: who they are, pricing, features, positioning, strengths/weaknesses. Goes beyond surface-level — analyzes product reviews, job postings (signals investment areas), and public financials where available. |
| Feature Prioritization | Scores and ranks features using RICE, ICE, or weighted scoring frameworks. Factors in effort, impact, market readiness, and strategic alignment. |
| User Story Generation | Translates refined specs into structured user stories with acceptance criteria, following best practices (INVEST, Gherkin). |
| Pricing Strategy | Analyzes pricing models specific to SaaS: freemium vs. trial, per-seat vs. usage-based, price anchoring, competitor pricing benchmarks. |
| Roadmap Planning | Sequences features into phases based on dependencies, market timing, and resource constraints. Produces visual roadmaps. |

#### Business Analyst

| Skill | What it does |
|-------|-------------|
| Business Case Modeling | Builds revenue projections, unit economics (LTV, CAC, payback period), and TAM/SAM/SOM estimates. Uses connected Stripe/analytics data where available, falls back to industry benchmarks. |
| Requirements Elicitation | Structured process for extracting functional and non-functional requirements from the idea brief and user conversations. |
| Gap Analysis | Identifies gaps between current state and desired state — what exists, what's missing, what needs changing. |
| Process Mapping | Visualizes business workflows and user processes to identify inefficiencies and automation opportunities. |
| Stakeholder Analysis | Maps who cares about the product, what they need, and how to prioritize conflicting requirements. |

#### UI/UX Designer

| Skill | What it does |
|-------|-------------|
| User Persona Creation | Builds detailed personas from user data, customer feedback, and market research. Not generic archetypes — specific to the user's business and customer base. |
| User Journey Mapping | Maps the end-to-end experience from discovery to retention, identifying pain points, drop-offs, and moments of delight. |
| Information Architecture | Structures content, navigation, and feature hierarchy. Produces sitemaps and IA diagrams. |
| Wireframing | Generates low-fidelity wireframes for key screens, focused on layout and flow, not aesthetics. |
| Heuristic Evaluation | Reviews existing products or prototypes against established usability heuristics (Nielsen's 10, accessibility standards). Produces actionable findings. |

#### User Researcher

| Skill | What it does |
|-------|-------------|
| Interview Guide Creation | Produces structured interview scripts for customer discovery, feature validation, or usability testing. Includes screener questions, prompts, and follow-up probes. |
| Survey Design | Creates targeted surveys for quantitative validation — NPS, feature preference, willingness to pay, satisfaction. |
| Feedback Synthesis | Analyzes qualitative data at scale: App Store reviews, support tickets, social media mentions, forum posts. Extracts themes, sentiment, and actionable insights. |
| Insight Extraction | Turns raw qualitative data into structured insights with evidence, confidence levels, and recommended actions. |
| Usability Test Planning | Designs test plans: tasks, success criteria, metrics, participant recruitment criteria, analysis framework. |

#### Data Analyst

| Skill | What it does |
|-------|-------------|
| SaaS Metrics Analysis | Calculates and interprets MRR, ARR, churn rate, LTV, CAC, expansion revenue, net revenue retention. Uses connected data where available. |
| Cohort Analysis | Groups users by signup date, plan, or behavior and tracks retention and engagement patterns over time. |
| Funnel Analysis | Maps conversion funnels (signup, activation, purchase, retention) and identifies where users drop off. |
| A/B Test Design | Designs experiments: hypothesis, variants, sample size, duration, success metrics, statistical significance thresholds. |
| Data Visualization | Produces charts, dashboards, and reports that make complex data understandable for non-technical stakeholders. |

### Layer 2: Strategic and Technical Skills

These skills ensure the product is built right — secure, scalable, and market-ready.

#### Chief Security Officer

| Skill | What it does |
|-------|-------------|
| Threat Modeling | Identifies attack vectors and security risks specific to the product architecture. Uses STRIDE analysis and attack tree construction. |
| Security Architecture Review | Evaluates proposed architectures for security weaknesses: auth flows, data handling, API security, third-party dependencies. |
| Data Protection Assessment | Reviews how customer data is collected, stored, processed, and shared. Identifies PII exposure and recommends controls. |
| Incident Response Planning | Creates incident response procedures: detection, containment, communication, recovery, post-mortem. |

#### Compliance / GDPR / SOC Expert

| Skill | What it does |
|-------|-------------|
| GDPR Compliance Audit | Assesses data processing activities against GDPR requirements: consent, lawful basis, data subject rights, cross-border transfers. |
| Privacy Policy Generation | Produces privacy policies and terms of service tailored to the product's actual data practices, not generic templates. |
| SOC 2 Readiness Assessment | Evaluates infrastructure and processes against SOC 2 Trust Services Criteria. Produces gap analysis and remediation roadmap. |
| Data Processing Mapping | Documents what data is collected, why, where it's stored, who has access, and how long it's retained. |

#### Systems Architect

| Skill | What it does |
|-------|-------------|
| Architecture Design | Produces system architecture diagrams and technical specs: microservices vs. monolith, API design, integration patterns, scalability approach. |
| Technology Selection | Evaluates and recommends tech stack choices based on requirements, team size, budget, and scaling needs. |
| Infrastructure Planning | Designs hosting, deployment, CI/CD, monitoring, and disaster recovery infrastructure. |
| API Design | Designs RESTful or GraphQL APIs with endpoint specifications, auth patterns, rate limiting, and versioning strategy. |
| Scalability Assessment | Analyzes bottlenecks and recommends scaling strategies: caching, CDN, database sharding, queue systems, load balancing. |

#### Database Expert

| Skill | What it does |
|-------|-------------|
| Data Model Design | Designs database schemas optimized for the product's query patterns, relationships, and growth projections. |
| Migration Planning | Plans database migrations: schema changes, data transformation, rollback strategies, zero-downtime deployment. |
| Performance Optimization | Identifies slow queries, missing indexes, N+1 problems, and recommends optimizations. |
| Multi-Tenancy Design | Designs tenant isolation strategies appropriate to the product's security and scale requirements. |

#### Frontend Expert

| Skill | What it does |
|-------|-------------|
| Component Architecture | Designs component hierarchies, state management patterns, and data flow for React/Next.js applications. |
| Performance Optimization | Identifies and resolves frontend performance issues: bundle size, render waterfalls, hydration, image optimization. Uses Vercel best practices. |
| Accessibility Audit | Reviews UI against WCAG standards. Produces actionable findings with severity ratings and fix recommendations. |
| Responsive Design | Ensures layouts, interactions, and content adapt properly across devices and viewport sizes. |

### Layer 3: Go-to-Market and Growth Skills

These skills bridge from product to market — getting the product in front of the right people.

#### Marketing Expert

| Skill | What it does |
|-------|-------------|
| Go-to-Market Strategy | Develops launch strategy: target segments, channels, messaging, timeline, budget allocation, KPIs. |
| Brand Messaging Framework | Creates positioning statements, value propositions, taglines, and messaging hierarchies — all in the user's brand voice. |
| Content Strategy | Plans content calendar, topic clusters, and distribution channels aligned with the product's growth strategy. |
| Campaign Design | Designs marketing campaigns: email sequences, social media, paid ads, landing pages — coordinated and brand-aligned. |

#### Product Marketing Expert

| Skill | What it does |
|-------|-------------|
| Positioning and Differentiation | Defines how the product is positioned against competitors. Produces positioning maps and battle cards. |
| Customer Segmentation | Identifies and profiles target segments based on behavior, needs, and value — not just demographics. |
| Sales Enablement | Creates sales collateral: one-pagers, comparison sheets, objection handling guides, demo scripts. |
| Launch Planning | Coordinates pre-launch, launch day, and post-launch activities across product, marketing, and support. |

#### SEO Expert

| Skill | What it does |
|-------|-------------|
| Keyword Research | Identifies high-value keywords for the product's domain: search volume, difficulty, intent, competitor gaps. |
| Technical SEO Audit | Reviews site structure, meta tags, schema markup, page speed, crawlability, and indexation. |
| Content Optimization | Optimizes existing content for target keywords while maintaining brand voice and readability. |
| SEO Strategy | Develops long-term organic growth plan: content pillars, link building approach, featured snippet targets. |

#### Devil's Advocate (Voice of the Customer)

| Skill | What it does |
|-------|-------------|
| Assumption Challenging | Systematically identifies and stress-tests assumptions in the product spec. "Why would a customer choose this over doing nothing?" |
| Customer Objection Modeling | Predicts the top objections a target customer would raise and tests whether the product addresses them. |
| Value Proposition Testing | Evaluates whether the stated value proposition actually resonates with the target persona. Identifies gaps between what the product claims and what customers need. |
| Competitive Switching Analysis | Analyzes why customers would switch from existing solutions. Identifies switching costs, friction points, and the minimum bar for adoption. |
| Edge Case Exploration | Identifies user scenarios, edge cases, and failure modes the team hasn't considered. "What happens when...?" |

### Layer 4: Production Skills (existing)

These skills create the final deliverables, now informed by Layers 1-3.

| Skill | Output |
|-------|--------|
| web-artifacts-builder | Landing pages, interactive prototypes (React/Tailwind/shadcn) |
| pptx | Pitch decks, investor presentations, stakeholder updates |
| docx | Business plans, specs, reports, proposals |
| pdf | Polished reports, one-pagers, printable deliverables |
| frontend-design | UI design direction and aesthetic guidance |
| brand-guidelines | Brand-consistent styling across all outputs |
| theme-factory | Consistent color/font themes across deliverables |
| canvas-design | Visual assets, posters, social media graphics |
| internal-comms | Status updates, newsletters, stakeholder communications |

### How Skills Compose in Agent Teams

In a typical Discovery Mode execution, the lead agent assembles a team based on what the project needs:

**Example: "I want to build a subscription billing dashboard for freelancers"**

1. **Product Manager** runs competitor research and feature prioritization
2. **User Researcher** synthesizes freelancer feedback from forums and app reviews
3. **Business Analyst** models the unit economics and pricing
4. **Devil's Advocate** challenges assumptions: "Freelancers hate subscriptions — why would they pay monthly for this?"
5. **UI/UX Designer** creates personas and journey maps based on research findings
6. **Systems Architect** proposes a technical architecture
7. **Security Officer** reviews data handling (freelancers' financial data)
8. **Product Marketing** develops positioning against existing tools
9. **Production skills** package everything into branded deliverables

Each agent's output feeds the next. Research informs design. Design informs architecture. The Devil's Advocate challenges everyone. Production skills package the final result using the business context engine for brand alignment.

---

## 11. Test-Driven and Data-Driven Approach

### Test-Driven Development

- **Backend:** pytest with fixtures for all API endpoints, agent orchestration logic, and execution scripts
- **Frontend:** Vitest + React Testing Library for component tests, Playwright for E2E
- **Agent quality:** Each agent skill has acceptance criteria — generated deliverables are validated against schema/quality checks before presenting to users
- **CI/CD:** All tests run on every PR. No merge without green.

### Data-Driven Product Decisions

- **Usage analytics:** Track which pipeline stages users engage with most, where they drop off, which deliverables get downloaded/shared
- **Agent performance metrics:** Execution time, revision rate (how often users request changes), approval rate
- **A/B testing:** Test different questioning flows, deliverable formats, and pricing to optimize conversion
- **Feedback loops:** User satisfaction ratings on deliverables feed back into agent skill improvements

---

## 12. MVP Scope

The MVP proves the core value loop: **idea in, brand-contextual refined spec out.**

### MVP Includes

1. **Value-first onboarding** — User signs up (email only), immediately describes their idea, gets a quick initial analysis with Devil's Advocate challenges before being asked for any brand assets or context. Then prompted to enrich for better results. (See Section 5 for full flow.)
2. **Mode selection** — Sprint or Discovery choice at project start
3. **Web-based conversational idea input** — Chat interface where users describe their idea and AI asks structured clarifying questions, informed by business context where available
4. **AI-driven refinement with Devil's Advocate** — Agent analyzes the idea, presents findings in sections for user validation with confidence indicators, and actively challenges assumptions ("Why would a customer choose this over doing nothing?")
5. **Idea brief / product spec generation** — Downloadable document output (markdown or PDF), styled to brand where applicable
6. **Simple dashboard** — List view of user's ideas with status indicators and mode labels
7. **User authentication** — Email/password + Google OAuth via Clerk
8. **Free tier with credits** — 20 credits/mo, credit cost shown before each action
9. **Basic quality gates** — Structural validation on outputs, confidence scoring, thumbs up/down feedback on every output

### MVP Skills Required (subset of full architecture)

The MVP uses a single agent (not teams) but it needs core research skills to produce meaningful refinement, not just document generation:

- **Product Manager:** Competitor Research, Feature Prioritization (lightweight)
- **Business Analyst:** Business Case Modeling (basic), Requirements Elicitation
- **UI/UX Designer:** User Persona Creation, User Journey Mapping (basic)
- **Devil's Advocate:** Assumption Challenging, Value Proposition Testing, Customer Objection Modeling
- **Production:** docx/pdf (for spec output), brand-guidelines (for brand alignment)

The Devil's Advocate skill is essential for MVP — it's the "wow" moment that distinguishes AgentPad from generic AI chat. An AI that actively questions and challenges your assumptions is genuinely different from one that agrees with everything.

Other skills (Security, Compliance, Systems Architecture, SEO, Data Analysis, full Marketing suite) are introduced in Phase 2+ when agent teams and deeper execution come online.

### MVP Does NOT Include

- Data source connections (Stripe, Analytics, CRM)
- Agent team execution (multi-agent deliverables beyond specs)
- Prioritization scoring and matrix
- CLI tools
- Paid tiers / Stripe billing (free tier only)
- Validation with real external data sources
- Team collaboration / multiple seats
- Voice input
- Mobile app
- Full skill architecture (Strategic/Technical and Go-to-Market layers are Phase 2+)
- LLM-as-Judge quality layer (basic structural validation only at MVP)

### Why This Scope

It tests three hypotheses:

1. **Value:** Do SaaS founders find the AI-guided ideation and Devil's Advocate challenging genuinely useful?
2. **Personalization:** Does the business context engine (even with just conversational input and brand assets) produce outputs that feel meaningfully different from generic AI?
3. **Engagement:** Do users come back and invest effort in enriching their profile and refining ideas?

If users don't engage with refinement, don't perceive outputs as tailored, or don't value the Devil's Advocate challenges, the differentiators need rethinking before investing in the expensive execution layer.

The MVP is small enough to build in weeks, not months. It uses a single agent (not teams) for refinement, backed by the 3-layer architecture and model routing for cost efficiency.

**Success criteria:**
- Users return to refine ideas more than once
- Users download/share the generated specs
- Users enrich their profile after seeing the first generic output (signals value-first onboarding works)
- Sprint mode gets used (signals demand for quick-turn outputs)
- Devil's Advocate challenges get positive feedback ratings (signals differentiation)
- Credit usage patterns show users spending credits on research skills, not just document generation

---

## 13. Post-MVP Roadmap (Phases)

### Phase 2: Data Connections, Validation, and Full Research Skills
- Data source integrations (Stripe, Google Analytics, CRM)
- Data health check and quality assessment on connection
- Add Stage 3 (validation with real data + web search + market data)
- Add Stage 4 (prioritization scoring and matrix view with SaaS frameworks)
- Introduce Starter tier ($29/mo) with Stripe billing
- **New skills:** Full Data Analyst suite, User Researcher suite, expanded Business Analyst (gap analysis, process mapping)

### Phase 3: Agent Team Execution and Strategic Skills
- Build the agent team orchestration layer (lead + specialist agents)
- Add deliverable generation (landing pages, pitch decks, business plans) — all brand-aligned via context engine
- Human-in-the-loop approval flow for deliverables
- Introduce Growth tier ($79/mo)
- Third-party enriched data APIs (market sizing, industry benchmarks)
- **New skills:** Systems Architect, Database Expert, Frontend Expert, Security Officer, Compliance/GDPR Expert — the full Strategic and Technical skill layer

### Phase 4: Go-to-Market Skills and Scale
- CLI access for technical users
- API for programmatic access
- Team collaboration (multiple seats, roles)
- Introduce Scale tier ($199/mo)
- Skill marketplace (community contributions)
- **New skills:** Full Marketing, Product Marketing, and SEO skill suites — the Go-to-Market layer

### Phase 5: Enterprise and Expansion
- White-label / API licensing
- Custom agent skills
- SOC 2 certification
- Enterprise SSO and dedicated infrastructure
- Community-contributed skills via marketplace

---

## 14. Go-to-Market Strategy: Open-Source Skills Funnel

### The Strategy

Release AgentPad's skill architecture as an open-source project on GitHub before launching the paid product. This follows the proven playbook used by Vercel (Next.js -> Vercel hosting), PostHog (open-source analytics -> cloud product), and Supabase (open-source client libraries -> managed platform).

### The Funnel

**Phase 0 (Pre-MVP): Open-Source Skills**

Release individual skills as standalone, open-source tools that work in Claude Code, Cursor, or any agent environment:

- Product Manager skills (competitor research, feature prioritization)
- Business Analyst skills (business case modeling, requirements elicitation)
- Devil's Advocate skill (assumption challenging, objection modeling)
- UI/UX skills (persona creation, journey mapping)

Each skill is well-documented, useful on its own, and free. The GitHub repo becomes the landing page — compelling README, live examples, transparent roadmap.

**Phase 0.5: Community Building**

- GitHub stars and contributors signal credibility
- Discord community for SaaS founders and product builders using the skills
- Blog posts and tutorials: "How to validate your SaaS idea using AgentPad Skills"
- Engineer-led content: YouTube walkthroughs, use-case guides
- Skills get battle-tested by real users before they need to work in a production product

**Phase 1: Product Launch**

"From the team that built AgentPad Skills — now there's AgentPad, the product that connects them all."

- Open-source users already trust the quality
- Some convert to paid (they want the dashboard, the business context engine, the pipeline)
- Some contribute new skills (marketplace revenue later)
- The launch has built-in distribution — existing community, GitHub SEO, word of mouth

### Why This Solves Multiple Problems

- **Skill build plan:** Skills get built, tested, and refined publicly with community feedback before they're in the product
- **Distribution:** GitHub + Discord + content = organic top-of-funnel without paid acquisition
- **Credibility:** "20k GitHub stars" signals legitimacy to non-technical founders evaluating the product
- **Competitive moat:** Open-source skills create an ecosystem. The more skills that exist, the more valuable the platform that connects them.
- **Talent pipeline:** Open-source contributors may become early hires or partners

---

## 15. LLM Cost Management

### The Economics

Every user interaction burns API tokens. Without active cost management, subscription revenue can be consumed by LLM costs. Target: LLM cost should be <30% of subscription revenue per user.

### Model Routing (saves 60-80%)

The single biggest cost lever. Route each request to the cheapest capable model:

| Task Type | Model Tier | Examples | Cost Level |
|-----------|-----------|----------|------------|
| Simple classification, formatting, summarization | Cheap (Haiku, GPT-4o Mini) | Parsing user input, formatting outputs, simple Q&A | ~$0.001/request |
| Standard analysis, research, writing | Mid (Sonnet, GPT-4o) | Competitor research, spec writing, persona creation | ~$0.01/request |
| Complex reasoning, strategy, challenge | Expensive (Opus, o1) | Devil's Advocate challenges, architecture design, business case modeling | ~$0.05/request |

70-80% of requests can be handled by cheap models. Build a classifier that routes requests automatically.

### Semantic Caching (saves 30-50%)

Many users ask similar questions about similar businesses. Cache the patterns:

- Business context processing cached so it's not re-tokenized every conversation turn
- Common analysis structures (SaaS competitor analysis, pricing model evaluation) cached and personalized with user-specific data
- Semantic similarity matching: if a query is 90%+ similar to a cached result, serve the cache and adapt

### Prompt Optimization (saves 30-70%)

- Send only relevant business context to each skill, not the entire profile
- Use structured formats (JSON) in system prompts, not verbose natural language
- Strip HTML and formatting from any ingested content (reduces tokens by up to 70%)
- Set explicit max output tokens per skill — competitor summaries don't need 5,000 tokens

### User-Facing Cost Controls

- Credit cost shown before each action: "This will use ~15 credits. Proceed?"
- Daily/session credit warnings at 80% usage
- Depth control: "Quick analysis (5 credits) or Deep analysis (25 credits)?"
- Monthly usage dashboard showing credit consumption by skill type

### Margin Model (example at Starter tier)

| | Calculation |
|---|---|
| Subscription revenue | $29/mo |
| Credits included | 200/mo |
| Avg. model calls per credit | ~1 |
| Model mix | 80% Haiku ($0.001), 20% Sonnet ($0.01) |
| Estimated LLM cost | 160 x $0.001 + 40 x $0.01 = $0.56 |
| LLM cost as % of revenue | ~2% |
| Margin for infrastructure, storage, compute | ~98% |

Even at pessimistic estimates (heavier Sonnet usage, longer conversations), LLM costs stay well under 30% of revenue with proper routing.

---

## 16. AI Output Quality System

### Three-Layer Quality Architecture

Quality is not a feature — it's the product. If outputs are generic or wrong, nothing else matters.

#### Layer A: Guardrails (before output reaches user)

- **Structural validation:** Every output conforms to a schema. A competitor analysis must have populated fields (company name, pricing, features, strengths, weaknesses). A business case must include stated assumptions. Schema violations are caught and regenerated before the user sees them.
- **PII/brand safety filters:** Scan outputs for exposed personal data, off-brand language, or unsourced factual claims. Block and regenerate.
- **Confidence scoring:** The system self-evaluates. If the model's confidence is below threshold, the output is tagged as "preliminary" or flagged for the user's verification.
- **Output token limits:** Per-skill caps prevent verbose, unfocused responses.

#### Layer B: LLM-as-Judge (automated quality review)

- A second, cheaper model evaluates the primary model's output against skill-specific quality criteria
- Example criteria for Competitor Research: "Does this include at least 3 competitors? Does each have pricing data? Are sources cited? Is the analysis specific to the user's market?"
- Build a "golden set" of reference outputs per skill — known-good examples that new outputs are benchmarked against
- Run this as a post-processing step before delivery. Costs are minimal (cheap model reviewing structured output).

#### Layer C: Human Feedback Loop (continuous improvement)

- Every output has thumbs up/down + optional categorization: wrong data, off-brand tone, too generic, missing information, outdated
- Feedback aggregated per skill — if a skill drops below 70% positive, it triggers automatic review
- High-quality user corrections feed back into the skill's golden set
- Monthly quality reports per skill inform the skill improvement backlog

### Deployment Process

Follow the Define, Instrument, Assemble, Automate, Pilot, Harden workflow:

1. **Define:** Quality criteria per skill (what does "good" look like?)
2. **Instrument:** Add structural validation and LLM-as-Judge to each skill
3. **Assemble:** Wire guardrails, judges, and feedback into the pipeline
4. **Automate:** Integrate into CI/CD — skill changes are tested against golden sets before deployment
5. **Pilot:** Soft-launch skills to a subset of users with enhanced monitoring
6. **Harden:** Lock in quality thresholds based on pilot data

---

## 17. Competitive Positioning

### Positioning Map

AgentPad occupies the intersection that no existing tool covers:

| Tool | Production | Research/Analysis | Brand Context | SaaS-Specific | Pipeline |
|------|-----------|-------------------|---------------|---------------|----------|
| ChatGPT / Claude | Generic | Generic | None (starts fresh) | No | No |
| Gamma | Presentations | No | Minimal | No | No |
| Notion AI | Docs | Basic | No | No | No |
| Taskade AI | Project mgmt | Basic | No | No | Generic |
| Whimsical AI | Wireframes | No | No | No | No |
| Stratup.ai | Business plans | Basic | No | Partial | Linear |
| **AgentPad** | **Full suite** | **Cross-functional team** | **Persistent engine** | **Deep** | **Sprint + Discovery** |

### Positioning Statement

"AgentPad is the only AI product development platform built specifically for SaaS founders. Unlike generic AI tools, AgentPad knows your business, speaks your brand, and simulates a full cross-functional team — from product manager to security officer to devil's advocate."

### Key Messaging by Competitor

- **vs. ChatGPT/Claude:** "ChatGPT starts from zero every time. AgentPad knows your business."
- **vs. Gamma/Canva:** "They make pretty slides. AgentPad makes the strategy behind them."
- **vs. Notion AI:** "Notion helps you write. AgentPad helps you think."
- **vs. Consultants:** "Same cross-functional expertise. Available 24/7. Fraction of the cost."

---

## Appendix: Resources Referenced

- [Superpowers (obra/superpowers)](https://github.com/obra/superpowers) — Agentic skills framework and dev methodology
- [Vercel Agent Skills (vercel-labs/agent-skills)](https://github.com/vercel-labs/agent-skills) — React/Next.js best practices and web design guidelines
- [Claude Code Plugins (wshobson/agents)](https://github.com/wshobson/agents) — 73 plugins, 112 agents, 146 skills for Claude Code
- [Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams) — Multi-session agent orchestration with shared task lists
