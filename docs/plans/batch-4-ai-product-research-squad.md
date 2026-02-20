# Batch 4 Design Document: AI Product Research Squad

**Date:** 2026-02-20
**Status:** Ready for implementation
**Branch:** `claude/add-notion-ai-prompt-p0fNB`

---

## 1. Vision & Scope

### 1.1 Overview

Batch 4 builds the **complete Research and Analysis layer** for AgentPad — transforming individual skills into an **AI Product Research Squad** that operates like a real Agile/Scrum team. These 16 skills enable customers to hand off complex research and analysis tasks to AI agents that collaborate intelligently.

### 1.2 Why This Matters for AgentPad

These skills represent the **core unique selling point** beyond MVP and Technical Readiness outputs. While Batches 1-3 handle validation and technical readiness, Batch 4 enables customers to do the **deep work** of:

- **Requirement gathering and analysis** - Beyond basic elicitation
- **Prioritization and roadmapping** - Strategic sequencing
- **Design research** - IA, wireframing, usability
- **User research methods** - Interviews, surveys, testing
- **Advanced analytics** - Cohorts, funnels, experiments

This creates a **complete AI product team** that can operate independently or as part of a human-AI hybrid workflow.

### 1.3 Scope

**Layer**: Research and Analysis (Layer 1 of 4)
**Skills**: 16 new skills + squad orchestration
**Pattern**: Individual skills + team configurations

---

## 2. Team Interaction Model

### 2.1 The Hybrid Architecture

Skills interact using **two complementary patterns**:

#### Pattern A: Sequential Handoffs (Definition of Done)
```
[Requirements Elicitation] → [User Story Gen] → [Gap Analysis] → [Roadmap Planning]
```
Each skill outputs structured data that the next skill consumes. Includes **acceptance criteria** — the receiving skill validates input before processing.

#### Pattern B: On-Demand Consultation
```
[Developer skill] asks [Architecture skill]: "Is this approach scalable?"
[UX skill] asks [User Researcher]: "What questions should I ask about this flow?"
```
Skills can invoke each other mid-flow for expertise. Maintains conversation context.

### 2.2 Team Communication Protocol

Each skill defines:

1. **Consults** — Which other skills it may invoke for input
2. **Feeds** — Which skills receive its output (primary + conditional)
3. **Quality Contract** — What valid input looks like, what constitutes "done"

### 2.3 Example: User Story Generation Skill

```yaml
name: User Story Generation
role: Product Manager
consults:
  - requirements-elicitation (for raw requirements)
  - user-persona-creation (for user context)
  - architecture-design (for technical feasibility)
feeds:
  - feature-prioritization (for scoring)
  - gap-analysis (for completeness check)
  - development-team (for implementation)
quality_contract:
  inputs: [context.requirements, context.personas, context.architecture]
  outputs: structured user stories with acceptance criteria
  min_requirements: 3 stories per feature
```

---

## 3. Squad System

### 3.1 Standard Squads

Pre-configured team compositions that consult each other frequently. Skills remain independent but opt into squad behavior.

| Squad Name | Members | Purpose |
|------------|---------|---------|
| **Discovery Squad** | PM (Competitor Research) + BA (Requirements Elicitation) + User Researcher (Feedback Synthesis) | Early-stage exploration, market validation |
| **Design Squad** | UX Designer (Information Architecture) + UX Designer (Wireframing) + User Researcher (Usability Test Planning) | Design decisions, prototyping, usability |
| **Analysis Squad** | BA (Gap Analysis) + Data Analyst (Cohort Analysis, Funnel Analysis) + PM (Feature Prioritization) | Deep-dive metrics, gap identification |
| **Research Squad** | User Researcher (Interview Guide) + User Researcher (Survey Design) + User Researcher (Feedback Synthesis) | Qualitative and quantitative research |
| **Roadmap Squad** | PM (User Story Gen) + PM (Roadmap Planning) + BA (Stakeholder Analysis) | Prioritization, planning, stakeholder alignment |
| **Pricing Squad** | PM (Pricing Strategy) + BA (Business Case Modeling) + Data Analyst (A/B Test Design) | Pricing decisions, monetization strategy |

### 3.2 Custom Squads

Users can create their own squads:

1. **Select skills** - Choose any combination from the skill library
2. **Name the squad** - Give it a meaningful name
3. **Define consultation rules** - Which skills consult which
4. **Save for reuse** - Store in user profile for future sessions

**Example Custom Squads:**
- **Startup MVP Squad**: Requirements Elicitation + User Story Gen + Feature Prioritization + Roadmap Planning
- **UX Deep Dive**: User Personas + Journey Mapping + Information Architecture + Wireframing + Usability Testing
- **Growth Analysis**: Cohort Analysis + Funnel Analysis + A/B Test Design + Data Visualization

### 3.3 Future Squad Placeholder

| Squad Name | Status | Notes |
|------------|--------|-------|
| **3 Amigos Squad** | Deferred to Batch 6 | Requires QA skills from Batch 6. Placeholder: "Ticket Refinement Squad" to be created later |

**Note**: The 3 Amigos format (PM + Dev + QA) requires Testing/QA skills that are scheduled for Batch 6. A placeholder should be created to document this future squad configuration.

---

## 4. Quality Gates Architecture

### 4.1 Gate 1: Input Validation

Every skill validates incoming data against its `Consumes` contract before processing.

```python
# Pseudocode for skill input validation
def validate_input(skill, incoming_data):
    required_fields = skill.input_schema.required
    for field in required_fields:
        if field not in incoming_data:
            raise InputValidationError(f"Missing required field: {field}")
    # Validate data types, formats, ranges
```

**Implementation**: Each skill's `output-schema.md` includes `Consumes` section with required fields and validation rules.

### 4.2 Gate 2: Output Schema Validation

Every skill output must match its `Produces` contract. Enables automated testing.

**Implementation**: Each skill defines strict output schema with:
- Required fields
- Data types
- Format constraints
- Minimum/maximum values
- Confidence indicators

### 4.3 Gate 3: Human/AI Review Gates

At key handoff points, a review step occurs:

| Review Type | Trigger | Approver |
|------------|---------|----------|
| **Full Review** | Significant deliverables (roadmaps, architecture) | Human or AI (configurable) |
| **Quick Check** | Minor outputs (user stories, survey questions) | AI auto-validation |
| **Auto-approve** | Low-risk outputs passing schema | Automatic |

**Implementation**: Skills define `review_points` in their specification - moments where output should be reviewed before proceeding.

### 4.4 Gate 4: Integration Testing

End-to-end validation of skill chains:

- Output from Skill A matches input requirements of Skill B
- Data flows correctly through multi-step workflows
- No information loss in handoffs

**Implementation**: Dedicated integration test suite that runs skill chains and validates data flow.

---

## 5. Devil's Advocate Integration

### 5.1 Phase 1: Design Review (Pre-Build)

Before each skill is built, Devil's Advocate reviews the skill design:

**Review Checklist:**
1. What assumptions does this skill make about user input?
2. What are the 3 most likely failure modes?
3. How could a user misuse this skill?
4. What would a skeptical expert flag as incomplete?
5. Where could the skill drift from its core purpose?

**Example: User Story Generation Design Review**
```
Assumption: Requirements are already documented
Risk: User provides vague requirements → garbage output
Mitigation: Require minimum 3 bullet points per requirement with specific acceptance criteria

Assumption: User knows how to write acceptance criteria  
Risk: Generated stories are too vague to implement
Mitigation: Enforce Given-When-Then format with measurable outcomes

Assumption: Single user type
Risk: Stories don't account for edge users
Mitigation: Require persona reference in each story
```

### 5.2 Phase 2: Chain Integration (Built-In)

Devil's Advocate skill is available in every skill chain as a **consultable expert**:

```
[Any Skill] can consult: devils-advocate
  - "Is this assumption valid?"
  - "What objections would a customer raise?"
  - "What's missing from this analysis?"
```

### 5.3 Phase 3: Review Gates (Optional)

Devil's Advocate can be triggered at key review points:
- After requirements are gathered
- After user stories are written
- After roadmap is drafted
- Before final output is delivered

---

## 6. Feedback Loops Architecture

### 6.1 Loop 1: Per-Skill Self-Validation

- Each skill validates its own output against quality criteria
- Outputs confidence score (high/medium/low) with reasoning
- Flags uncertainty for human review

### 6.2 Loop 2: Skill-to-Skill Validation

- Downstream skills validate upstream outputs
- Missing context triggers request for clarification
- Quality issues bubble up to original skill

### 6.3 Loop 3: Team Consistency Check

- Periodic "squad sync" validates all outputs are consistent
- Persona consistency: Do all skills reference the same user personas?
- Architectural consistency: Do design decisions align with architecture?
- Priority consistency: Do roadmaps reflect actual priorities?

### 6.4 Loop 4: User Feedback Integration

- Every output includes "confidence indicator"
- User can flag "not accurate" with category (wrong data, missing context, etc.)
- Feedback improves future outputs in same session

---

## 7. Skill Specifications

### 7.1 Phase 4.1: PM + BA Core (Skills 1-4)

#### Skill: User Story Generation

**Purpose**: Transform requirements into implementable user stories with acceptance criteria

**Role**: Product Manager

**Core Workflow**:
1. Receive requirements with context (personas, architecture)
2. Identify actors and actions
3. Write story in format: "As a [who], I want [what], so that [why]"
4. Add acceptance criteria (Given-When-Then or checklist)
5. Add technical notes (dependencies, constraints)
6. Estimate effort (story points or t-shirt size)

**Consults**:
- requirements-elicitation
- user-persona-creation
- architecture-design

**Feeds**:
- feature-prioritization
- gap-analysis

**Quality Contract**:
- Required inputs: requirements list, user personas (optional), architecture context (optional)
- Minimum 3 bullet points per requirement
- Every story has measurable acceptance criteria
- Stories are independently implementable

---

#### Skill: Pricing Strategy

**Purpose**: Analyze and recommend pricing models for SaaS products

**Role**: Product Manager

**Core Workflow**:
1. Analyze product value proposition
2. Research competitor pricing
3. Model pricing scenarios (per-seat, usage, tiered, etc.)
4. Calculate customer lifetime value impacts
5. Recommend pricing structure with rationale

**Consults**:
- competitor-research
- business-case-modeling
- saas-metrics-analysis

**Feeds**:
- business-case-modeling
- roadmap-planning

**Quality Contract**:
- Required inputs: value proposition, target market, competitor data
- Minimum 3 pricing scenarios evaluated
- Include LTV/CAC analysis

---

#### Skill: Roadmap Planning

**Purpose**: Sequence features into phased roadmap with dependencies and milestones

**Role**: Product Manager

**Core Workflow**:
1. Gather scored/prioritized features
2. Identify dependencies and constraints
3. Estimate team capacity
4. Sequence into phases (MVP, v1, v2, etc.)
5. Define milestones and success criteria
6. Create visual timeline

**Consults**:
- feature-prioritization
- architecture-design
- stakeholder-analysis

**Feeds**:
- development-team
- stakeholders

**Quality Contract**:
- Required inputs: prioritized feature list, dependencies, capacity estimate
- Each phase has clear entry/exit criteria
- Dependencies are mapped

---

#### Skill: Gap Analysis

**Purpose**: Identify differences between current state and desired state

**Role**: Business Analyst

**Core Workflow**:
1. Define current state (systems, processes, capabilities)
2. Define desired state (from requirements, vision)
3. Map gaps (missing, inadequate, or excess capabilities)
4. Assess gap significance (business impact, effort)
5. Recommend approach to close each gap

**Consults**:
- requirements-elicitation
- architecture-design

**Feeds**:
- roadmap-planning
- stakeholder-analysis

**Quality Contract**:
- Required inputs: current state description, desired state/requirements
- Each gap has impact and effort assessment
- Recommendations are prioritized

---

### 7.2 Phase 4.2: BA + UX Core (Skills 5-8)

#### Skill: Process Mapping

**Purpose**: Visualize and analyze business workflows

**Role**: Business Analyst

**Core Workflow**:
1. Identify process scope and boundaries
2. Document as-is processes (interviews, observation, docs)
3. Analyze for inefficiencies, redundancies, bottlenecks
4. Design to-be processes
5. Identify automation opportunities

**Consults**:
- requirements-elicitation
- stakeholder-analysis

**Feeds**:
- user-journey-mapping
- technical-implementation

**Quality Contract**:
- Required inputs: process scope, stakeholder interviews (optional)
- Both as-is and to-be processes documented
- Automation opportunities identified

---

#### Skill: Stakeholder Analysis

**Purpose**: Map and prioritize people/groups affected by the product

**Role**: Business Analyst

**Core Workflow**:
1. Identify all stakeholders (internal, external)
2. Assess interests, influence, and impact
3. Map communication needs
4. Identify conflicting requirements
5. Recommend prioritization framework

**Consults**:
- requirements-elicitation

**Feeds**:
- roadmap-planning
- communication-planning

**Quality Contract**:
- Required inputs: project scope, identified stakeholders
- Interest/influence matrix documented
- Communication plan included

---

#### Skill: Information Architecture

**Purpose**: Structure content and navigation for optimal user experience

**Role**: UI/UX Designer

**Core Workflow**:
1. Analyze content requirements
2. Conduct card sorting (or simulate)
3. Create site map
4. Define navigation hierarchy
5. Label systems and search behavior
6. Validate with user testing

**Consults**:
- user-journey-mapping
- requirements-elicitation
- user-persona-creation

**Feeds**:
- wireframing
- frontend-development

**Quality Contract**:
- Required inputs: content requirements, user personas
- Site map with clear hierarchy
- Navigation labels defined

---

#### Skill: Wireframing

**Purpose**: Create low-fidelity layouts focusing on structure and flow

**Role**: UI/UX Designer

**Core Workflow**:
1. Review IA and user flows
2. Sketch key screens
3. Create wireframes with annotations
4. Define responsive breakpoints
5. Add interaction notes

**Consults**:
- information-architecture
- user-personas

**Feeds**:
- heuristic-evaluation
- design-system

**Quality Contract**:
- Required inputs: IA document, user flows
- Key screens covered
- Responsive breakpoints defined

---

### 7.3 Phase 4.3: UX + Research Core (Skills 9-12)

#### Skill: Heuristic Evaluation

**Purpose**: Review UI against established usability heuristics

**Role**: UI/UX Designer

**Core Workflow**:
1. Define evaluation scope (screens, flows)
2. Apply Nielsen's 10 heuristics
3. Rate severity of issues (0-4)
4. Provide actionable recommendations
5. Prioritize fixes

**Consults**:
- wireframing
- user-journey-mapping

**Feeds**:
- design-team
- development-team

**Quality Contract**:
- Required inputs: screens or prototypes to evaluate
- All 10 heuristics applied
- Severity ratings with recommendations

---

#### Skill: Interview Guide Creation

**Purpose**: Create structured interview scripts for discovery/validation

**Role**: User Researcher

**Core Workflow**:
1. Define research objectives
2. Identify participant criteria
3. Write screener questions
4. Draft interview questions (open-ended, probing)
5. Plan sequencing and time allocation
6. Add follow-up prompts

**Consults**:
- user-persona-creation
- research-objectives

**Feeds**:
- survey-design
- user-persona-creation

**Quality Contract**:
- Required inputs: research objectives, target user description
- Minimum 10 substantive questions
- Follow-up prompts included

---

#### Skill: Survey Design

**Purpose**: Create quantitative surveys for validation and measurement

**Role**: User Researcher

**Core Workflow**:
1. Define survey objectives
2. Choose question types (Likert, NPS, multiple choice)
3. Write questions (avoid bias, leading)
4. Structure survey flow
5. Calculate sample size needs
6. Plan analysis approach

**Consults**:
- interview-guide-creation
- research-objectives

**Feeds**:
- data-analysis
- ab-test-design

**Quality Contract**:
- Required inputs: survey objectives, target audience
- Minimum 5 questions
- Sample size calculation included

---

#### Skill: Usability Test Planning

**Purpose**: Design tests to evaluate if users can complete tasks

**Role**: User Researcher

**Core Workflow**:
1. Define test objectives
2. Identify key tasks to test
3. Write test scenarios and tasks
4. Define success metrics (time, completion, errors)
5. Recruit participants (criteria, numbers)
6. Create test protocol

**Consults**:
- user-journey-mapping
- wireframes

**Feeds**:
- heuristic-evaluation
- iteration-planning

**Quality Contract**:
- Required inputs: test objectives, target users
- Minimum 5 tasks defined
- Success metrics defined for each task

---

### 7.4 Phase 4.4: Data Analysis Core (Skills 13-16)

#### Skill: Cohort Analysis

**Purpose**: Group users by acquisition date and track behavior over time

**Role**: Data Analyst

**Core Workflow**:
1. Define cohort grouping (signup date, plan, source)
2. Calculate retention curves
3. Identify engagement patterns
4. Compare cohort performance
5. Generate insights and recommendations

**Consults**:
- saas-metrics-analysis

**Feeds**:
- product-strategy
- churn-reduction

**Quality Contract**:
- Required inputs: user data with timestamps
- Minimum 3 cohort segments
- Retention curve visualization

---

#### Skill: Funnel Analysis

**Purpose**: Map and analyze conversion through sequential steps

**Role**: Data Analyst

**Core Workflow**:
1. Define funnel stages
2. Calculate conversion rates between stages
3. Identify drop-off points
4. Analyze why users leave
5. Recommend optimizations
6. Set improvement targets

**Consults**:
- user-journey-mapping

**Feeds**:
- product-optimization
- ab-test-design

**Quality Contract**:
- Required inputs: event/behavior data
- Minimum 4 funnel stages
- Drop-off analysis included

---

#### Skill: A/B Test Design

**Purpose**: Design experiments to compare two or more variants

**Role**: Data Analyst

**Core Workflow**:
1. Form hypothesis
2. Define success metric (primary, secondary)
3. Calculate required sample size
4. Design variants
5. Define statistical significance threshold
6. Plan analysis approach

**Consults**:
- funnel-analysis
- research-objectives

**Feeds**:
- development-team
- experiment-tracking

**Quality Contract**:
- Required inputs: hypothesis, baseline metrics
- Sample size calculation with power analysis
- Success metrics defined

---

#### Skill: Data Visualization

**Purpose**: Create clear, actionable charts and dashboards

**Role**: Data Analyst

**Core Workflow**:
1. Understand the data and question
2. Choose appropriate chart type
3. Design visualization (color, labels, layout)
4. Ensure accessibility
5 insights
6. Make interactive if needed

**Consults. Add context and**:
- All analysis skills (for data sources)

**Feeds**:
- stakeholders
- reports

**Quality Contract**:
- Required inputs: data, question/insight needed
- Appropriate chart type selected
- Accessibility considerations documented

---

## 8. Implementation Roadmap

### Phase 4.1: PM + BA Core
| Week | Skills | Files | Dependencies |
|------|--------|-------|--------------|
| 1 | User Story Generation | 4 | None |
| 2 | Pricing Strategy | 4 | Week 1 skills |
| 3 | Roadmap Planning | 4 | Feature Prioritization (Batch 1) |
| 4 | Gap Analysis | 4 | Requirements Elicitation (Batch 1) |

### Phase 4.2: BA + UX Core
| Week | Skills | Files | Dependencies |
|------|--------|-------|--------------|
| 5 | Process Mapping | 4 | Requirements Elicitation |
| 6 | Stakeholder Analysis | 4 | Requirements Elicitation |
| 7 | Information Architecture | 4 | User Journey Mapping (Batch 2) |
| 8 | Wireframing | 4 | Information Architecture |

### Phase 4.3: UX + Research Core
| Week | Skills | Files | Dependencies |
|------|--------|-------|--------------|
| 9 | Heuristic Evaluation | 4 | Wireframing |
| 10 | Interview Guide Creation | 4 | User Personas (Batch 2) |
| 11 | Survey Design | 4 | Interview Guide |
| 12 | Usability Test Planning | 4 | User Journey Mapping |

### Phase 4.4: Data Analysis Core
| Week | Skills | Files | Dependencies |
|------|--------|-------|--------------|
| 13 | Cohort Analysis | 4 | SaaS Metrics (Batch 2) |
| 14 | Funnel Analysis | 4 | Cohort Analysis |
| 15 | A/B Test Design | 4 | Funnel Analysis |
| 16 | Data Visualization | 4 | All analysis skills |

---

## 9. Quality Framework

### 9.1 Review Gates

| Phase | Gate | Who | Criteria |
|-------|------|-----|----------|
| Design | Devil's Advocate Review | AI | Design reviewed, gaps identified |
| Design | SME Review | Human | Assumptions validated |
| Build | Schema Review | AI | Contracts defined correctly |
| Build | Pattern Review | Human | Follows skill template |
| Test | Chain Test | AI | Skills connect correctly |
| Test | Quality Test | AI | Outputs meet quality criteria |
| Test | User Review | Human | Real-world applicability verified |

### 9.2 Quality Criteria per Skill

Every Batch 4 skill must meet:

1. **Trigger Clarity** - Frontmatter clearly defines when to use this skill
2. **Input Contract** - Schema defines required inputs with validation rules
3. **Output Contract** - Schema defines required outputs with quality thresholds
4. **Team Interface** - Clearly defines `consults` and `feeds`
5. **Worked Example** - Complete example showing input → process → output
6. **Quality Checklist** - Minimum 5 quality criteria for output evaluation
7. **Failure Modes** - Minimum 3 common mistakes documented
8. **Squad Integration** - Documented how skill fits into standard squads

---

## 10. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Skills produce inconsistent outputs | High | High | Strict output schemas + validation gates |
| Skills give conflicting advice | Medium | Medium | Team consistency check at key points |
| Skills don't understand each other | High | High | Clear data contracts + shared context |
| Quality degrades over long chains | Medium | High | Review gates at every handoff |
| Skills drift from purpose | Medium | Medium | Devil's Advocate built into design + chain |
| Squad configurations become rigid | Low | Medium | Custom squads always available |
| Performance degrades with multiple consultations | Medium | Low | Timeout and caching mechanisms |

---

## 11. Appendix: Skill Directory

### Batch 4 Complete Skill List

| # | Skill Name | Role | Phase | Standard Squads |
|---|------------|------|-------|-----------------|
| 1 | user-story-generation | Product Manager | 4.1 | Roadmap Squad, Discovery Squad |
| 2 | pricing-strategy | Product Manager | 4.1 | Pricing Squad |
| 3 | roadmap-planning | Product Manager | 4.1 | Roadmap Squad |
| 4 | gap-analysis | Business Analyst | 4.1 | Analysis Squad |
| 5 | process-mapping | Business Analyst | 4.2 | Discovery Squad |
| 6 | stakeholder-analysis | Business Analyst | 4.2 | Roadmap Squad |
| 7 | information-architecture | UI/UX Designer | 4.2 | Design Squad |
| 8 | wireframing | UI/UX Designer | 4.2 | Design Squad |
| 9 | heuristic-evaluation | UI/UX Designer | 4.3 | Design Squad |
| 10 | interview-guide-creation | User Researcher | 4.3 | Research Squad |
| 11 | survey-design | User Researcher | 4.3 | Research Squad |
| 12 | usability-test-planning | User Researcher | 4.3 | Design Squad |
| 13 | cohort-analysis | Data Analyst | 4.4 | Analysis Squad |
| 14 | funnel-analysis | Data Analyst | 4.4 | Analysis Squad |
| 15 | ab-test-design | Data Analyst | 4.4 | Pricing Squad, Analysis Squad |
| 16 | data-visualization | Data Analyst | 4.4 | All squads |

---

## 12. Future Work

### Batch 5: Go-to-Market Skills (14 skills)
- Marketing Expert (4 skills)
- Product Marketing Expert (4 skills)
- SEO Expert (4 skills)
- Remaining Devil's Advocate (2 skills)

### Batch 6: Technical Skills (13 skills)
- Systems Architect (remaining)
- Database Expert (3 skills)
- Frontend Expert (4 skills)
- QA/Testing (3 skills)
- **3 Amigos Squad** - PM + Dev + QA for ticket refinement

---

**Document Status**: Ready for implementation
**Next Step**: Begin Phase 4.1 - User Story Generation skill
