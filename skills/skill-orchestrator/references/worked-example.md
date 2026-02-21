# Worked Example: Skill Orchestrator

This document shows a complete example of applying the Skill Orchestrator to a complex delivery scenario.

## Scenario

**User Input:**
> "I have an idea for an AI-powered note-taking app for sales teams. It should capture and summarize sales calls, extract action items, and integrate with Salesforce. I need to know if this is worth building and what I should build first."

**Analysis:** This is a classic validation pack request. The goal is complex and requires multiple skills working together.

---

## Step-by-Step Application

### Step 1: Goal Analysis

**User Goal:** Validate SaaS product idea for AI-powered sales notes app

**Success Criteria:**
- Clear GO/PAUSE/KILL recommendation
- MVP scope defined
- Business case viability assessed
- Risks identified
- Clear next steps

**Constraints:** None stated explicitly

**Assumptions:**
- B2B SaaS, subscription model
- Target: Sales teams (SMB to enterprise)
- Differentiation: AI-native, Salesforce integration

### Step 2: Strategy Selection

**Initial consideration:**
- One-on-one? No — too complex
- Coordinated? Could work but might lose coherence
- Mini squad? Yes — tight integration needed
- Parallel? Could do validation + technical in parallel, but technical not needed yet

**Decision: Mini Squad**

**Rationale:** The validation pack is a coherent deliverable where each skill's output feeds the next. A mini squad ensures collaboration and produces a unified output. The Validation Pack directive (in directives/) is specifically designed for this pattern.

**Alternatives considered:**
- Coordinated: Would work but less tight integration, higher risk of incoherent output
- Parallel: Could do validation + technical spec, but premature for technical

### Step 3: Skill Team Assembly

**Core Team (always needed):**
| Skill | Role |
|-------|------|
| project-manager | Break down into tasks, sequence |
| scrum-master | Coordinate, remove blockers |

**Domain Skills (validation pack):**
| Skill | Role | Dependencies |
|-------|------|--------------|
| requirements-elicitation | Define what the product does | none |
| competitor-research | Analyze market | none |
| user-persona-creation | Define customers | requirements |
| business-case-modeling | Financial viability | competitors, personas |
| devils-advocate | Challenge assumptions | business_case |
| feature-prioritization | Rank features | requirements, competitors |
| user-journey-mapping | Map user flow | personas, features |

### Step 4: Execution Plan

**Stages:**

| Stage | Skills | Mode | Entry | Exit |
|-------|--------|------|-------|------|
| 1 | requirements-elicitation, competitor-research, user-persona-creation | Parallel | none | Requirements, competitors, personas |
| 2 | business-case-modeling | Sequential | Stage 1 | Business case |
| 3 | devils-advocate | Sequential | Stage 2 | Risk analysis |
| 4 | feature-prioritization | Sequential | Stage 3 | Prioritized backlog |
| 5 | user-journey-mapping | Sequential | Stage 4 | Journey map |
| 6 | (synthesis) | - | All | Validation pack |

**Critical Path:** requirements → persona → business case → prioritization → journey → synthesis

### Step 5: Mini Squad Configuration

```
Squad Name: Validation Pack Squad

Mission: Produce comprehensive validation pack assessing viability of 
AI-powered sales notes product for sales teams.

Members:
  - requirements-elicitation (defines what)
  - competitor-research (validates market)
  - user-persona-creation (understands customer)
  - business-case-modeling (quantifies viability)
  - devils-advocate (challenges assumptions)
  - feature-prioritization (defines scope)
  - user-journey-mapping (maps execution)

Collaboration Protocol:
  - Sequential execution per stages above
  - Each skill's output becomes next skill's input
  - Project Manager maintains task tracking
  - Delivery Manager monitors for blockers
  - Quality gate: Each skill output reviewed before advancing

Aggregation Strategy:
  - Project Manager synthesizes all outputs
  - Creates Validation Scorecard
  - Builds unified narrative
  - All individual outputs preserved as appendices
```

---

## Orchestrator Output

### Goal Analysis

```
user_goal: "Validate AI-powered sales notes app idea for sales teams 
with Salesforce integration"

success_criteria:
  - GO/PAUSE/KILL recommendation
  - MVP scope with prioritized features
  - Business case with unit economics
  - Risk analysis
  - Clear next steps

constraints: None stated

assumptions:
  - B2B SaaS, subscription model
  - Target: Sales teams (SMB to enterprise)
  - Differentiation: AI-native, Salesforce integration
```

### Strategy Selection

```
strategy: mini_squad

rationale: Validation pack requires tight integration across research, 
modeling, and synthesis. Each skill builds on previous output. Mini squad 
ensures coherence and collaboration.

alternatives_considered:
  - coordinated: Less tight integration, higher incoherence risk
  - parallel: Premature for technical parallel
```

### Skill Team

| Skill | Role | Dependencies | Delivers |
|-------|------|--------------|----------|
| project-manager | Plan & sequence | user_goal | Delivery plan |
| scrum-master | Coordinate | delivery_plan | Status, blockers |
| requirements-elicitation | Define requirements | none | Requirements doc |
| competitor-research | Analyze market | none | Competitor profiles |
| user-persona-creation | Define customers | requirements | Personas |
| business-case-modeling | Financial viability | competitors, personas | Business case |
| devils-advocate | Challenge assumptions | business_case | Risk analysis |
| feature-prioritization | Rank features | requirements, competitors | Prioritized backlog |
| user-journey-mapping | Map user flow | personas, features | Journey map |

### Execution Plan

| Stage | Skills | Mode | Entry | Exit | Handoffs |
|-------|--------|------|-------|------|----------|
| 1 | RE, CR, UPC | Parallel | none | Reqs, Comp, Pers | - |
| 2 | BCM | Sequential | Stage 1 | Business case | Comp+Pers → BCM |
| 3 | DA | Sequential | Stage 2 | Risks | BCM → DA |
| 4 | FP | Sequential | Stage 3 | Backlog | Reqs+Comp+Risks → FP |
| 5 | UJM | Sequential | Stage 4 | Journey | Pers+Features → UJM |
| 6 | Synthesis | - | All | Pack | All → unified |

### Status (Example - Mid-Execution)

```
overall_status: on_track
completion_percentage: 60
active_stage: 3 (Devil's Advocate)

completed_skills:
  - requirements-elicitation ✅
  - competitor-research ✅
  - user-persona-creation ✅
  - business-case-modeling ✅

in_progress_skills:
  - devils-advocate (50%)

pending_skills:
  - feature-prioritization
  - user-journey-mapping
  - synthesis
```

### Blocker Summary

```
critical_count: 0
major_count: 0
minor_count: 2

summary: Two minor blockers (waiting on persona details for journey map 
template, business case formatting). Main delivery on track.
```

### Deliverable Preview

```
deliverable_type: Validation Pack

key_sections:
  - Validation Scorecard (GO/PAUSE/KILL)
  - Competitive Positioning Map
  - User Personas (2-3)
  - Business Case (TAM/SAM/SOM, unit economics)
  - Risk Analysis
  - MVP Feature Backlog
  - User Journey Map
  - Assumption Register

confidence: high

risks_to_quality:
  - Competitor data may be incomplete for newer players
  - Business case assumptions need user validation
```

---

## How to Execute This Plan

### Phase 1: Discovery (Parallel)

1. **Engage requirements-elicitation**
   - Input: "AI-powered note-taking for sales teams, Salesforce integration"
   - Output: Requirements document

2. **Engage competitor-research**
   - Input: Same goal
   - Output: 5+ competitor profiles

3. **Engage user-persona-creation**
   - Input: Requirements + goal
   - Output: 2-3 personas

### Phase 2: Analysis

4. **Engage business-case-modeling**
   - Input: Personas + competitor data
   - Output: Business case with viability

5. **Engage devils-advocate**
   - Input: Business case + assumptions
   - Output: Risk analysis

### Phase 3: Synthesis

6. **Engage feature-prioritization**
   - Input: Requirements + competitors + risks
   - Output: Ranked feature backlog

7. **Engage user-journey-mapping**
   - Input: Primary persona + MVP features
   - Output: User journey

8. **Synthesize**
   - Combine all outputs into Validation Pack
   - Calculate Validation Scorecard
   - Present GO/PAUSE/KILL

### Continuous

- **Project Manager:** Maintains plan, tracks tasks
- **Delivery Manager:** Handles sequencing, blocker resolution, coordination
- **Skill Orchestrator:** Oversees entire delivery, communicates with user

---

## Key Insights for This Delivery

1. **Mini squad is right:** Validation packs are inherently sequential with tight coupling — perfect for squad model

2. **Parallel Stage 1 works:** Research skills can run in parallel because they don't depend on each other

3. **Business case is pivotal:** This skill determines viability — its output drives most subsequent decisions

4. **Devil's advocate is essential:** For validation, we need adversarial thinking to stress-test assumptions

5. **Synthesis is non-trivial:** Combining 7+ skill outputs into coherent pack requires careful aggregation

6. **No time estimates:** AI agents work continuously. Progress measured by completion %, not elapsed time.
