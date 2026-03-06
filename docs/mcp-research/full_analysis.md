# Skills-to-MCP Research: Real-World Examples & Industry Standards

## Executive Summary

This document provides comprehensive research on mapping the 90+ skills in the AgentPad system to MCPs (Model Context Protocol servers) and real-world services. The goal is to enable BobAI (Premium Plus tier) to actually execute tasks for users, not just generate plans.

---

## Part 1: Real-World AI Competitors & Benchmarks

### Design & Wireframing (Highest Priority)

| Tool | What They Do | Pricing | Key Differentiator |
|------|--------------|---------|-------------------|
| **[v0](https://v0.dev)** | Generates production-ready UI from prompts, deploys to Vercel | Paid credits | Agentic - plans, creates tasks, connects DBs as it builds |
| **[bolt.new](https://bolt.new)** | Full-stack app generation in browser | Free/Paid | Runs in browser, no setup needed |
| **[Framer](https://framer.com)** | AI-powered design & prototyping | Paid | Design-to-code, excellent animations |
| **[Uizard](https://uizard.io)** | Sketch/photo to wireframe | Freemium | Hand-drawn style, image-to-design |
| **[Buildship](https://buildship.com)** | Visual AI workflow builder | Free/Paid | No-code + AI |

### Technical & Code Generation

| Tool | What They Do | Pricing | Key Differentiator |
|------|--------------|---------|-------------------|
| **[Cursor](https://cursor.sh)** | AI-first code editor (Windsurf) | Paid | Agentic coding, multi-file edits |
| **[GitHub Copilot](https://github.com/features/copilot)** | Code completion & chat | Paid | Deep IDE integration |
| **[Cline](https://cline.dev/)** | Autonomous coding agent | Free | CLI-based, VS Code extension |
| **[Windsurf](https://windsurf.ai/)** | Agentic coding by Codeium | Paid | Cascade AI agent mode |

### Project Management & Planning

| Tool | What They Do | Pricing | Key Differentiator |
|------|--------------|---------|-------------------|
| **[ClickUp AI](https://clickup.com/features/ai)** | AI writing & planning in PM tool | Paid tool | PM native |
| **[Notion AI](https://notion.so/product/ai)** | AI in docs/PM | Paid | Native to workspace |
| **[Linear](https://linear.app)** | Issue tracking with AI | Paid | Cycle planning, velocity |

---

## Part 2: MCP Ecosystem Overview

### Official MCPs (from modelcontextprotocol/servers)

**Reference Servers:**
- Fetch - Web content fetching
- Filesystem - Secure file operations
- Git - Repository operations
- Memory - Knowledge graph persistence
- Sequential Thinking - Problem-solving
- Time - Time/timezone

**Third-Party (Community):**

| Category | MCPs Available |
|----------|----------------|
| **Design** | Figma (official), Miro, Excalidraw |
| **Productivity** | Notion (official), Google Drive, Google Sheets **Development** | GitHub, Slack |
|, GitLab, Vercel, Netlify, AWS |
| **Data** | PostgreSQL, SQLite, Redis, Google Analytics |
| **Communication** | Gmail, Google Calendar, Slack |
| **CRM** | HubSpot, Salesforce, Stripe |
| **Analytics** | Amplitude, Mixpanel, Segment |

### Most Relevant MCPs for BobAI MVP

1. **Notion** - 61 skills need this
2. **Google Sheets** - 24 skills
3. **Miro** - 14 skills
4. **Figma** - 12 skills
5. **Linear/Jira** - 18 skills combined
6. **GitHub** - 8 skills

---

## Part 3: Skill-by-Skill Analysis with Real-World Benchmarks

### DISCOVERY SQUAD (Priority 1)

#### 1. validation-pack
**Output:** Comprehensive validation document  
**MCPs:** Notion, Google Docs  
**Real-World Benchmark:** 
- Competitors: Product Hunt validation tools, Launchdic
- Industry Standard: Airbnb's "Lean Startup Canvas", Y Combinator's startup worksheet
**Templates Needed:** Validation report template with sections for problem, solution, market, competition, financials
**Quality Criteria:** Completeness, actionability, clarity, feasibility score

#### 2. requirements-elicitation
**Output:** Structured requirements document  
**MCPs:** Notion, Linear, Jira  
**Real-World Benchmark:**
- Competitors: Notion AI, ClickUp Brain
- Industry Standard: User stories (INVEST), acceptance criteria format
**Templates Needed:** User story template, acceptance criteria checklist
**Quality Criteria:** Testability, traceability, clarity, completeness

#### 3. user-persona-creation
**Output:** Persona documents with demographics, goals, pain points  
**MCPs:** Notion, Miro, Figma  
**Real-World Benchmark:**
- Competitors: Xtensio, HubSpot Make My Persona (free)
- Industry Standard: Alan Cooper's persona methodology, proto-personas
**Templates Needed:** Persona card template, persona comparison matrix
**Quality Criteria:** Realism, detail-level, actionability, differentiation

#### 4. competitor-research
**Output:** Competitive analysis matrix  
**MCPs:** Notion, Google Sheets  
**Real-World Benchmark:**
- Competitors: Crayon, Klue
- Industry Standard: SWOT analysis, feature comparison matrices
**Templates Needed:** Competitor matrix template, SWOT framework
**Quality Criteria:** Accuracy, depth, actionable insights, coverage

#### 5. business-case-modeling
**Output:** Financial projections and business model  
**MCPs:** Google Sheets, Notion  
**Real-World Benchmark:**
- Competitors: LivePlan, Enloop
- Industry Standard: TAM/SAM/SOM, unit economics, 3-statement model
**Templates Needed:** Financial model template, TAM/SAM/SOM calculator
**Quality Criteria:** Financial accuracy, realism, scenario analysis, assumptions documentation

#### 6. devils-advocate
**Output:** Risk analysis with devil's perspective  
**MCPs:** Notion, Miro  
**Real-World Benchmark:**
- Competitors: Boardist, Stratify
- Industry Standard: Pre-mortem analysis, risk matrices
**Templates Needed:** Risk matrix template, assumption challenger worksheet
**Quality Criteria:** Thoroughness, challenge quality, mitigation suggestions

#### 7. feature-prioritization
**Output:** Prioritized feature backlog  
**MCPs:** Notion, Linear, Jira, Trello  
**Real-World Benchmark:**
- Competitors: Productboard, Roadmunk
- Industry Standard: MoSCoW, RICE, Kano model, WSJF
**Templates Needed:** MoSCoW template, RICE scoring worksheet
**Quality Criteria:** Clear rationale, business alignment, dependency mapping

#### 8. user-journey-mapping
**Output:** Visual journey maps with touchpoints, emotions  
**MCPs:** Miro, Figma, Notion  
**Real-World Benchmark:**
- Competitors: Smaply, Journey mapping tools in Figma
- Industry Standard: Customer journey mapping (Nielsen Norman Group)
**Templates Needed:** Journey map template, empathy map
**Quality Criteria:** Comprehensiveness, user-centricity, actionability

---

### DESIGN SQUAD (Priority 1)

#### 9. wireframing
**Output:** Visual wireframes for screens  
**MCPs:** Figma, Miro, Excalidraw  
**Real-World Benchmark:**
- Competitors: v0, bolt.new, Uizard, Framer AI
- Industry Standard: iOS Human Interface Guidelines, Material Design 3, WCAG 2.1
**Templates Needed:** Wireframe component library, screen templates
**Quality Criteria:** Usability, accessibility, mobile-responsive, consistency

#### 10. ui-patterns
**Output:** Reusable UI component patterns  
**MCPs:** Figma  
**Real-World Benchmark:**
- Competitors: Material UI, shadcn/ui, Component Gallery
- Industry Standard: Atomic Design, design tokens
**Templates Needed:** Pattern library, design tokens
**Quality Criteria:** Consistency, accessibility, reusability, documentation

#### 11. information-architecture
**Output:** Site maps, user flows, navigation structure  
**MCPs:** Miro, Figma, Notion  
**Real-World Benchmark:**
- Competitors: GlooMaps, FlowMapp
- Industry Standard: Card sorting, tree testing
**Templates Needed:** Sitemap template, user flow diagram
**Quality Criteria:** Logical structure, scalability, findability

#### 12. design-system
**Output:** Complete design system with tokens, components, guidelines  
**MCPs:** Figma, Notion  
**Real-World Benchmark:**
- Competitors: Storybook, Figma's Dev Mode
- Industry Standard: Design tokens (W3C), component APIs
**Templates Needed:** Token library, component specs, guidelines doc
**Quality Criteria:** Consistency, scalability, documentation, accessibility

#### 13. accessibility-review
**Output:** Accessibility audit and recommendations  
**MCPs:** Figma, Notion  
**Real-World Benchmark:**
- Competitors: A11y Project, WAVE
- Industry Standard: WCAG 2.1 AA, screen reader testing
**Templates Needed:** WCAG checklist, a11y scorecard
**Quality Criteria:** WCAG compliance, screen reader testing, keyboard navigation

---

### TECHNICAL SQUAD (Priority 2)

#### 14. architecture-design
**Output:** System architecture documentation  
**MCPs:** Notion, Miro, DrawSQL  
**Real-World Benchmark:**
- Competitors: Structurizr, Lucidchart
- Industry Standard: C4 model, UML
**Templates Needed:** Architecture diagram template, ADR format
**Quality Criteria:** Scalability, reliability, security, cost-awareness

#### 15. schema-design
**Output:** Database schema with relationships  
**MCPs:** DrawSQL, DBdiagram, Notion  
**Real-World Benchmark:**
- Competitors: dbdiagram.io, DBeaver
- Industry Standard: ERD notation, normalization forms
**Templates Needed:** Schema visual, migration guide
**Quality Criteria:** Efficiency, relationships, scalability

#### 16. api-design
**Output:** API specification and documentation  
**MCPs:** Notion, Stoplight, Swagger  
**Real-World Benchmark:**
- Competitors: Postman, Apigee
- Industry Standard: OpenAPI 3.0, RESTful principles
**Templates Needed:** OpenAPI template, endpoint docs
**Quality Criteria:** REST standards, documentation clarity, versioning

#### 17. user-story-generation
**Output:** Ready-to-code user stories  
**MCPs:** Notion, Linear, Jira  
**Real-World Benchmark:**
- Competitors: UserStory.io
- Industry Standard: INVEST criteria, Gherkin format
**Templates Needed:** User story template, acceptance criteria
**Quality Criteria:** Clarity, testability, independence

#### 18. ci-cd-pipeline
**Output:** CI/CD configuration files  
**MCPs:** GitHub, Vercel, Netlify  
**Real-World Benchmark:**
- Competitors: GitHub Actions marketplace, CircleCI orbs
- Industry Standard: CI best practices, deployment strategies
**Templates Needed:** CI config template, deployment workflow
**Quality Criteria:** Reliability, speed, rollback capability

#### 19. infrastructure-as-code
**Output:** Terraform/CloudFormation configs  
**MCPs:** GitHub, AWS, Terraform  
**Real-World Benchmark:**
- Competitors: Pulumi, Serverless Framework
- Industry Standard: Infrastructure as Code best practices
**Templates Needed:** Terraform modules, best practice checklist
**Quality Criteria:** Idempotency, security, documentation

#### 20. serverless-development
**Output:** Serverless function architecture  
**MCPs:** Vercel, AWS Lambda, Netlify  
**Real-World Benchmark:**
- Competitors: Serverless Framework, Apex
- Industry Standard: Cold start optimization, function patterns
**Templates Needed:** Function specs, architecture diagram
**Quality Criteria:** Cost optimization, performance, observability

---

### GTM/LAUNCH SQUAD (Priority 2)

#### 21. launch-planning
**Output:** Go-to-market plan with timeline  
**MCPs:** Notion, Miro, Linear  
**Real-World Benchmark:**
- Competitors: LaunchDarkly, ProductPlan
- Industry Standard: GTM checklist, launch timeline
**Templates Needed:** Launch checklist, timeline view
**Quality Criteria:** Comprehensiveness, timeline clarity, contingency

#### 22. pricing-strategy
**Output:** Pricing model and tier structure  
**MCPs:** Notion, Google Sheets  
**Real-World Benchmark:**
- Competitors: PriceIntelligently, ProfitWell
- Industry Standard: Value-based pricing, competitive pricing
**Templates Needed:** Pricing model template, price tier structure
**Quality Criteria:** Market research, business model alignment, value metrics

#### 23. content-strategy
**Output:** Content plan with topics, calendar  
**MCPs:** Notion, Google Docs  
**Real-World Benchmark:**
- Competitors: Contently, HubSpot
- Industry Standard: Content pillars, SEO content briefs
**Templates Needed:** Content calendar, topic cluster template
**Quality Criteria:** Content gaps, SEO optimization, distribution plan

#### 24. seo-foundation
**Output:** SEO strategy and implementation plan  
**MCPs:** Notion, Google Search Console  
**Real-World Benchmark:**
- Competitors: Ahrefs, SEMrush, Surfer SEO
- Industry Standard: Keyword research, on-page SEO checklist
**Templates Needed:** Keyword research, on-page checklist
**Quality Criteria:** Keyword opportunities, technical SEO, content optimization

#### 25. messaging-framework
**Output:** Brand messaging hierarchy  
**MCPs:** Notion, Miro, Google Docs  
**Real-World Benchmark:**
- Competitors: Voxpop, Membrane
- Industry Standard: Message house, value proposition canvas
**Templates Needed:** Messaging hierarchy, value prop template
**Quality Criteria:** Clarity, consistency, differentiation

---

### DATA SQUAD (Priority 2)

#### 26. metrics-dashboard-creation
**Output:** Metrics dashboard design  
**MCPs:** Google Sheets, Metabase, Looker, Notion  
**Real-World Benchmark:**
- Competitors: Tableau, Power BI, Databox
- Industry Standard: SaaS metrics (David Skok), KPI hierarchies
**Templates Needed:** Dashboard templates, KPI cards
**Quality Criteria:** Relevance, real-time, actionability

#### 27. cohort-analysis
**Output:** Cohort analysis report  
**MCPs:** Google Sheets, Metabase  
**Real-World Benchmark:**
- Competitors: Mixpanel, Amplitude
- Industry Standard: Retention curves, cohort comparison
**Templates Needed:** Cohort table template
**Quality Criteria:** Retention metrics, segmentation, visualization clarity

#### 28. funnel-analysis
**Output:** Funnel visualization and insights  
**MCPs:** Google Sheets, Metabase, Google Analytics  
**Real-World Benchmark:**
- Competitors: Amplitude, Kissmetrics
- Industry Standard: Conversion metrics, funnel stages
**Templates Needed:** Funnel visualization template
**Quality Criteria:** Drop-off identification, optimization opportunities

---

## Part 4: Implementation Priority Matrix

### CORRECTED Implementation Phases (AI Speed)

**Phase 1: Notion MCP (Week 1-2)**
- Build first: Notion MCP connector
- Skills: validation-pack, requirements-elicitation, competitor-research, business-case-modeling
- 8 skills become "buildable"

**Phase 2: Google Sheets MCP (Week 2-3)**
- Add Sheets connector
- Skills: cohort-analysis, funnel-analysis, metrics-dashboard-creation, business-case-modeling
- Total: 12 skills

**Phase 3: Design MCPs (Week 3-4)**
- Build: Figma + Miro MCPs
- Skills: wireframing, ui-patterns, design-system, user-journey-mapping, information-architecture
- Total: 17 skills

**Phase 4: PM MCPs (Week 4-5)**
- Build: Linear + Jira + Trello MCPs
- Skills: feature-prioritization, roadmap-planning, ticket-refinement, user-story-generation
- Total: 21 skills

**Phase 5: Technical MCPs (Week 5-7)**
- Build: GitHub + Vercel + Netlify MCPs
- Skills: architecture-design, schema-design, api-design, ci-cd-pipeline, serverless-development
- Total: 26 skills

**Phase 6: Analytics & Marketing (Week 7-9)**
- Build: Metabase, Google Analytics, HubSpot, Stripe, Google Ads MCPs
- Skills: all remaining data, gtm, iteration skills
- Total: 45+ skills

### Additional Competitors to Monitor

**Design:**
- Canva AI
- Galileo AI
- Uizard (sketch-to-wireframe)
- Figma AI

**PM:**
- Asana AI
- Monday AI
- Smartsheet

**Research:**
- Dovetail (user research synthesis)
- Hotjar
- UserTesting

---

## Part 5: Template Requirements

### Priority 1 Templates (MVP)

1. **validation-report-template**
   - Sections: Problem Statement, Target User, Solution, Market Size, Competition, Business Model, Risks
   - Format: Notion page with embedded databases

2. **persona-template**
   - Sections: Demographics, Goals, Pain Points, Behaviors, Quotes, Journey
   - Format: Notion database + Figma card

3. **requirements-template**
   - Sections: User Stories, Acceptance Criteria, Dependencies, Priority
   - Format: Linear/Jira sync + Notion backup

4. **wireframe-components**
   - Components: Forms, Navigation, Cards, Lists, Modals, Headers
   - Format: Figma file with variants

5. **financial-model-template**
   - Sections: Assumptions, Revenue, Costs, Unit Economics, Scenarios
   - Format: Google Sheets with charts

6. **competitor-matrix**
   - Sections: Feature comparison, Pricing, Strengths, Weaknesses
   - Format: Notion database + Google Sheets

7. **journey-map-template**
   - Stages: Awareness, Consideration, Purchase, Retention, Advocacy
   - Format: Miro board + Notion summary

8. **roadmap-template**
   - Views: Timeline, Kanban, List
   - Format: Linear sync + Notion view

---

## Part 6: Quality Standards Per Skill

### Validation Pack
- **Completeness:** All sections filled with substantive content
- **Actionability:** Clear next steps identified
- **Feasibility:** Realistic assumptions stated
- **Clarity:** No jargon without explanation

### Wireframes
- **Accessibility:** WCAG 2.1 AA compliant
- **Mobile-first:** Responsive breakpoints defined
- **Consistency:** Design system alignment
- **Usability:** Nielsen heuristics applied

### Business Case
- **Accuracy:** Math verified
- **Realism:** Assumptions stated and justified
- **Scenarios:** Best/worst/expected cases
- **Unit Economics:** CAC, LTV, payback period calculated

### User Personas
- **Realism:** Based on research, not stereotypes
- **Differentiation:** Clear differences between personas
- **Actionability:** Goals/pain points inform features

---

## Part 7: Error Handling Strategy

### Common MCP Failure Modes

| Error Type | Detection | Generic Recovery | MCP-Specific Recovery |
|-----------|-----------|------------------|----------------------|
| Auth Failure | 401/403 | Prompt user to reconnect | - |
| Rate Limit | 429 | Exponential backoff | Figma: "Switch to Miro", GitHub: "Queue requests" |
| API Timeout | Timeout | Retry 3x, then degrade | Vercel: "Fallback to Netlify" |
| Template Missing | File not found | Fallback to default | Figma: "Use basic frame", Notion: "Use basic page" |
| Invalid Input | Validation error | Clear error message | - |
| Partial Failure | Some ops fail | Complete what's possible | Metabase: "Fallback to Sheets" |

### Error Response Schema
```json
{
  "success": false,
  "error": "rate_limit",
  "mcp": "figma",
  "message": "Figma API limit reached",
  "recovery_action": "switch_to_mcp_fallback",
  "fallback_mcp": "miro",
  "fallback": {
    "deliverable": "miro_board",
    "url": "..."
  }
}
```

---

## Part 8: BobAI Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [ ] Build MCP connectors for Notion, Google Sheets
- [ ] Create validation-pack, requirements-elicitation templates
- [ ] Implement skill execution with MCP tool calling
- [ ] Build error handling framework

### Phase 2: Design (Weeks 5-8)
- [ ] Integrate Figma MCP
- [ ] Build wireframe generation pipeline
- [ ] Create design system templates
- [ ] Implement Miro MCP for journey mapping

### Phase 3: Technical (Weeks 9-12)
- [ ] Integrate GitHub MCP
- [ ] Build code generation from architecture
- [ ] Implement Vercel/Netlify deployment
- [ ] Create schema and API design tools

### Phase 4: Growth (Weeks 13-16)
- [ ] Integrate CRM MCPs (HubSpot, Stripe)
- [ ] Build content and SEO tools
- [ ] Implement analytics dashboards
- [ ] Add launch planning workflows

### Phase 5: Polish (Weeks 17-20)
- [ ] Quality assurance on all outputs
- [ ] User testing and feedback
- [ ] Performance optimization
- [ ] Documentation and support

---

## Appendix: Available MCPs Summary

### By Function

**Productivity:**
- Notion (official)
- Google Drive (official)
- Google Sheets (official)
- Google Docs (official)
- Slack (official)
- Gmail (official)
- Google Calendar (official)

**Design:**
- Figma (official)
- Miro (official)
- Excalidraw (official)

**Development:**
- GitHub (official)
- GitLab (community)
- Vercel (community)
- Netlify (community)
- AWS (official)
- DigitalOcean (community)

**Data:**
- PostgreSQL (archived)
- SQLite (archived)
- Google Analytics (community)
- Amplitude (official)
- Metabase (community)

**Communication:**
- Slack (official)
- Discord (community)
- Gmail (official)

**CRM:**
- HubSpot (community)
- Salesforce (community)
- Stripe (community)

**Security:**
- Snyk (official)

**Project Management:**
- Linear (official)
- Jira (official)
- Trello (official)
- Atlassian (official)

---

*Research completed: March 2026*
*Next step: Implementation planning for BobAI tier*
