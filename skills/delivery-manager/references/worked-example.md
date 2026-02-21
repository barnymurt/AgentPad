# Worked Example: Project Manager

This document shows a complete example of applying the Project Manager skill to a realistic scenario.

## Scenario

**User Input:**
> "I want to build an AI-powered note-taking app for sales teams. It should automatically capture and summarize sales calls, extract action items, and integrate with Salesforce. Help me figure out what skills I need and how to coordinate them."

## Step-by-Step Application

### Step 1: Goal Clarification

**Extracted:**
- **Goal:** Build an AI-powered note-taking app for sales teams
- **Core features:** Call capture/summarization, action item extraction, Salesforce integration
- **Target:** Sales teams (B2B)

**Success Criteria (inferred + to confirm):**
- Understanding of target market (sales teams)
- Competitive analysis of existing solutions
- Technical feasibility assessment
- Business case (is it viable?)
- Clear next steps

**Clarifying questions needed:**
- What's the revenue model? (subscription, per-seat, enterprise?)
- What's the current development capability? (solo, team, outsource?)

### Step 2: Work Breakdown

**Decomposed Tasks:**

| Task ID | Description | Assigned Skill |
|---------|-------------|----------------|
| T-1 | Define target customer segment and persona | requirements-elicitation |
| T-2 | Research direct competitors (note-taking + sales tools) | competitor-research |
| T-3 | Identify integration requirements (Salesforce API) | requirements-elicitation |
| T-4 | Build business case (market size, pricing strategy) | business-case-modeling |
| T-5 | Assess technical feasibility (AI transcription, API) | architecture-design |
| T-6 | Feature prioritization (what to build first) | feature-prioritization |
| T-7 | Define MVP scope | (synthesis) |

### Step 3: Dependency Analysis

**Mapping:**

```
T-1: no dependencies (defines who we're building for)
T-2: no dependencies (external research)
T-3: depends on T-1 (persona informs requirements)
T-4: depends on T-1, T-2 (persona + competitors inform business case)
T-5: depends on T-3 (requirements inform architecture)
T-6: depends on T-2, T-3, T-4 (all inputs inform prioritization)
T-7: depends on T-6 (prioritization defines MVP)
```

### Step 4: Sequencing

**Stages:**

| Stage | Tasks | Rationale |
|-------|-------|------------|
| S-1: Discovery | T-1, T-2 | Can run in parallel — define who + research market |
| S-2: Requirements | T-3, T-4, T-5 | Need S-1 outputs; can run in parallel |
| S-3: Analysis | T-6 | Needs all S-2 outputs to prioritize |
| S-4: Synthesis | T-7 | Final scope definition |

**Critical Path:** T-1 → T-3 → T-5 → T-6 → T-7 (5 tasks)

### Step 5: Scope Management

**In Scope:**
- Target market analysis (sales teams, SMB to enterprise)
- Competitive analysis (top 5 direct competitors)
- Business case (TAM/SAM/SOM, pricing model options)
- Technical feasibility (transcription, NLP, Salesforce API)
- MVP feature prioritization (top 5 features)

**Out of Scope:**
- Detailed technical architecture
- User testing/interviews
- Marketing plan
- Sales strategy
- Integration with other CRMs (Salesforce only for MVP)

**Scope Creep Risks:**
- Adding more than 5 competitors
- Including other CRM integrations
- Building admin/billing features for MVP

### Step 6: Alignment Check

- T-1 (persona): Defines who → aligns with goal
- T-2 (competitors): Validates market → aligns with goal
- T-3 (requirements): Defines what → aligns with goal
- T-4 (business case): Validates viability → aligns with goal
- T-5 (architecture): Validates feasibility → aligns with goal
- T-6 (prioritization): Decides what first → aligns with goal
- T-7 (MVP): Delivers scope → aligns with goal

**All tasks contribute to the goal.** No misalignment flags.

### Step 7: Output Generation

---

# Delivery Plan: AI Sales Notes App

## Vision Statement

**Goal:** Build an AI-powered note-taking app for sales teams that automatically captures and summarizes sales calls, extracts action items, and integrates with Salesforce.

**Success Criteria:**
1. Target customer segment clearly defined with validated pain points
2. Competitive landscape understood with clear differentiation opportunities
3. Business case shows viable path to revenue
4. Technical approach is feasible with identified risks
5. MVP scope defined with prioritized feature list

**Constraints:** None explicitly stated; assume modern SaaS approach (cloud-native, subscription model)

---

## Workstreams

| WS-ID | Workstream | Description | Tasks |
|-------|------------|-------------|-------|
| WS-1 | Market Discovery | Who are we building for and who competes | T-1, T-2 |
| WS-2 | Requirements & Feasibility | What to build and can we build it? | T-3, T-4, T-5 |
| WS-3 | Prioritization & Scope | What first and what's MVP? | T-6, T-7 |

---

## Task Registry

| T-ID | Description | Skill | Dependencies | Outputs | Done Criteria |
|------|-------------|-------|--------------|---------|---------------|
| T-1 | Define target customer segment and persona | requirements-elicitation | none | Primary persona, target segment | Segment defined with size estimate |
| T-2 | Research direct competitors | competitor-research | none | 5 competitor profiles, comparison matrix | At least 5 competitors analyzed |
| T-3 | Identify integration requirements | requirements-elicitation | T-1 | Functional requirements, Salesforce integration spec | Requirements document with user stories |
| T-4 | Build business case | business-case-modeling | T-1, T-2 | TAM/SAM/SOM, pricing model, unit economics | Business case with viability verdict |
| T-5 | Assess technical feasibility | architecture-design | T-3 | Architecture recommendations, risk assessment | Feasibility report with risk register |
| T-6 | Prioritize features | feature-prioritization | T-2, T-3, T-4 | Ranked feature backlog, RICE scores | Top 5 features scored and ranked |
| T-7 | Define MVP scope | (synthesis) | T-6 | MVP scope document | Clear "what's in v1" statement |

---

## Dependency Map

```
graph TD
    T-1 --> T-3
    T-2 --> T-4
    T-2 --> T-6
    T-1 --> T-4
    T-3 --> T-5
    T-3 --> T-6
    T-4 --> T-6
    T-5 --> T-6
    T-6 --> T-7
```

**Textual View:**
- T-1: no dependencies
- T-2: no dependencies
- T-3: depends on T-1
- T-4: depends on T-1, T-2
- T-5: depends on T-3
- T-6: depends on T-2, T-3, T-4
- T-7: depends on T-6

---

## Critical Path

**Path:** T-1 → T-3 → T-5 → T-6 → T-7

**Length:** 5 tasks

**Rationale:** This sequence defines the customer, derives requirements, validates technical approach, prioritizes, and defines MVP. Other tasks (T-2, T-4) can parallelize but don't change the minimum sequence.

---

## Stage Sequencing

| Stage | Name | Tasks | Entry | Exit |
|-------|------|-------|-------|------|
| S-1 | Discovery | T-1, T-2 | none | Persona + competitor landscape |
| S-2 | Requirements & Feasibility | T-3, T-4, T-5 | S-1 complete | Requirements + business case + architecture |
| S-3 | Prioritization | T-6 | S-2 complete | Ranked feature backlog |
| S-4 | MVP Definition | T-7 | S-3 complete | MVP scope document |

---

## Scope Boundary

**In Scope:**
- Target market: Sales teams (SMB to enterprise)
- Competitors: Top 5 direct competitors (note-taking + sales tooling)
- Business case: TAM/SAM/SOM, subscription pricing model, unit economics
- Technical: Feasibility of transcription, NLP, Salesforce integration
- MVP: Top 5 prioritized features

**Out of Scope:**
- User interviews / primary research (use existing knowledge)
- Integration with CRMs other than Salesforce
- Admin/billing features for MVP
- Marketing or sales strategy
- Detailed technical architecture (high-level only)

**Scope Creep Risks:**
- Expanding competitor analysis beyond 5
- Adding other CRM integrations
- Including "nice to have" features in MVP

---

## Alignment Summary

**Workstream Contributions:**
- WS-1 (Market Discovery): Establishes who we're building for and validates market exists
- WS-2 (Requirements & Feasibility): Defines what to build and confirms it's possible to build
- WS-3 (Prioritization & Scope): Decides what to build first and commits to MVP

**Misalignment Flags:** None

**Overall Coherence:** Tasks flow logically from discovery → requirements → analysis → synthesis. Each stage builds on previous outputs. The plan produces a clear GO/PAUSE/KILL decision on the product idea.

---

## Confidence Assessment

**Overall Confidence:** High

**Rationale:**
- Goal is specific (AI notes for sales + Salesforce)
- Dependencies are clear and acyclic
- Scope is bounded (MVP, not full product)
- All tasks can be assigned to existing skills

---

## For Skill Orchestrator

To execute this plan:

1. **Run S-1 tasks in parallel:** T-1 and T-2 can start together
2. **After S-1 completes:** Run S-2 tasks in parallel (T-3, T-4, T-5)
3. **After S-2 completes:** Run T-6 (depends on all S-2 outputs)
4. **After T-6 completes:** Run T-7 (final synthesis)

Total: 4 sequential stages with 2 parallel clusters inside.
