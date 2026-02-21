# Master Skill Flow

**Date:** 2026-02-21
**Status:** Complete - AI Agent Ready

---

## Overview

This document shows the complete skill architecture for AgentPad, organized into 7 batches. It defines dependencies, team configurations, and data flows. AI agents should follow this flow to determine which skills to use based on user goals.

---

## High-Level Flow (Mermaid)

```mermaid
flowchart TB
    subgraph BATCH0["Batch 0: Security Foundation"]
        direction TB
        S0A[security-baseline-pack]
        S0B[security-requirements-baseline]
        S0C[threat-modeling]
        S0D[security-architecture-review]
        S0E[data-protection-assessment]
        S0F[privacy-regulation-assessment]
        S0G[security-compliance-roadmap]
    end

    subgraph BATCH1["Batch 1: Validation Packs"]
        direction TB
        V1[validation-pack]
        V2[technical-readiness-pack]
    end

    subgraph BATCH2["Batch 2: Architecture & Foundation"]
        direction TB
        A1[architecture-design]
        A2[requirements-elicitation]
        A3[feature-prioritization]
        A4[user-persona-creation]
        A5[user-journey-mapping]
        A6[feedback-synthesis]
        A7[saas-metrics-analysis]
        A8[devils-advocate]
        A9[business-case-modeling]
    end

    subgraph BATCH3["Batch 3: Completion"]
        direction TB
        C1[competitor-research]
        C2[business-case-modeling]
    end

    subgraph BATCH4["Batch 4: Research Squad"]
        direction TB
        R1[user-story-generation]
        R2[pricing-strategy]
        R3[roadmap-planning]
        R4[gap-analysis]
        R5[process-mapping]
        R6[stakeholder-analysis]
        R7[information-architecture]
        R8[wireframing]
        R9[heuristic-evaluation]
        R10[interview-guide-creation]
        R11[survey-design]
        R12[usability-test-planning]
        R13[cohort-analysis]
        R14[funnel-analysis]
        R15[ab-test-design]
        R16[data-visualization]
    end

    subgraph BATCH5["Batch 5: Go-to-Market"]
        direction TB
        G1[launch-planning]
        G2[messaging-framework]
        G3[content-strategy]
        G4[channel-strategy]
        G5[launch-analytics]
        G6[seo-foundation]
        G7[paid-acquisition]
        G8[sales-enablement]
        G9[community-building]
        G10[partner-strategy]
        G11[pricing-launch]
        G12[referral-program]
        G13[analyst-relations]
        G14[devils-advocate-gtm]
    end

    subgraph BATCH6["Batch 6: Technical"]
        direction TB
        T1[data-modeling]
        T2[schema-design]
        T3[migration-planning]
        T4[performance-tuning]
        T5[data-security]
        T6[backup-recovery]
        T7[component-architecture]
        T8[ui-patterns]
        T9[design-system]
        T10[animation-motion]
        T11[state-management]
        T12[accessibility-review]
        T13[responsive-patterns]
        T14[frontend-performance]
        T15[test-strategy]
        T16[automation-framework]
        T17[tdd]
        T18[infrastructure-as-code]
        T19[ci-cd-pipeline]
        T20[monitoring-observability]
        T21[cloud-platforms]
        T22[api-design]
        T23[mobile-ios]
        T24[mobile-android]
        T25[serverless-development]
        T26[ml-llm-integration]
        T27[edge-computing]
        T28[ticket-refinement]
    end

    BATCH0 --> BATCH1
    BATCH1 --> BATCH2
    BATCH2 --> BATCH3
    BATCH3 --> BATCH4
    BATCH4 --> BATCH5
    BATCH5 --> BATCH6
```

---

## Detailed Flow with Data Contracts

```mermaid
flowchart LR
    subgraph INPUT["User Input"]
        I1[Product Idea]
        I2[Existing Artifacts]
    end

    INPUT --> BATCH0

    subgraph BATCH0["Batch 0: Security"]
        B0A[threat-modeling]
        B0B[security-requirements-baseline]
        B0C[security-architecture-review]
        B0D[data-protection-assessment]
        B0E[privacy-regulation-assessment]
        B0F[security-compliance-roadmap]
    end

    BATCH0 -->|Feeds into| BATCH1

    subgraph BATCH1["Batch 1: Validation"]
        B1A[validation-pack<br/>GO/PAUSE/KILL]
        B1B[technical-readiness-pack<br/>READY/NEEDS WORK]
    end

    BATCH1 -->|If GO| BATCH2

    subgraph BATCH2["Batch 2: Foundation"]
        B2A[requirements-elicitation]
        B2B[user-persona-creation]
        B2C[user-journey-mapping]
        B2D[feature-prioritization]
        B2E[devils-advocate]
        B2F[business-case-modeling]
        B2G[architecture-design]
        B2H[saas-metrics-analysis]
        B2I[feedback-synthesis]
    end

    BATCH2 --> BATCH3

    subgraph BATCH3["Batch 3: Completion"]
        B3A[competitor-research]
        B3B[business-case-modeling]
    end

    BATCH3 --> BATCH4

    subgraph BATCH4["Batch 4: Research"]
        B4A[user-story-generation]
        B4B[pricing-strategy]
        B4C[roadmap-planning]
        B4D[gap-analysis]
        B4E[process-mapping]
        B4F[stakeholder-analysis]
        B4G[information-architecture]
        B4H[wireframing]
        B4I[heuristic-evaluation]
        B4J[interview-guide-creation]
        B4K[survey-design]
        B4L[usability-test-planning]
        B4M[cohort-analysis]
        B4N[funnel-analysis]
        B4O[ab-test-design]
        B4P[data-visualization]
    end

    BATCH4 --> BATCH5

    subgraph BATCH5["Batch 5: GTM"]
        B5A[launch-planning]
        B5B[messaging-framework]
        B5C[content-strategy]
        B5D[channel-strategy]
        B5E[launch-analytics]
        B5F[seo-foundation]
        B5G[paid-acquisition]
        B5H[sales-enablement]
        B5I[community-building]
        B5J[partner-strategy]
        B5K[pricing-launch]
        B5L[referral-program]
        B5M[analyst-relations]
    end

    BATCH5 --> BATCH6

    subgraph BATCH6["Batch 6: Technical"]
        B6A[data-modeling]
        B6B[schema-design]
        B6C[migration-planning]
        B6D[performance-tuning]
        B6E[data-security]
        B6F[backup-recovery]
        B6G[component-architecture]
        B6H[ui-patterns]
        B6I[design-system]
        B6J[animation-motion]
        B6K[state-management]
        B6L[accessibility-review]
        B6M[responsive-patterns]
        B6N[frontend-performance]
        B6O[test-strategy]
        B6P[automation-framework]
        B6Q[tdd]
        B6R[infrastructure-as-code]
        B6S[ci-cd-pipeline]
        B6T[monitoring-observability]
        B6U[cloud-platforms]
        B6V[api-design]
        B6W[mobile-ios]
        B6X[mobile-android]
        B6Y[serverless-development]
        B6Z[ml-llm-integration]
        B6AA[edge-computing]
        B6AB[ticket-refinement]
    end
```

---

## Squad Configurations (Team Setups)

```mermaid
flowchart TB
    subgraph SQUADS["Available Squads"]
        SQ1[Discovery Squad]
        SQ2[Design Squad]
        SQ3[Research Squad]
        SQ4[Roadmap Squad]
        SQ5[Analysis Squad]
        SQ6[GTM Squad]
        SQ7[3 Amigos Squad]
    end

    SQ1 -->|Uses| SQB1[competitor-research<br/>requirements-elicitation<br/>feedback-synthesis]
    SQ2 -->|Uses| SQB2[information-architecture<br/>wireframing<br/>user-journey-mapping]
    SQ3 -->|Uses| SQB3[interview-guide-creation<br/>survey-design<br/>usability-test-planning]
    SQ4 -->|Uses| SQB4[user-story-generation<br/>roadmap-planning<br/>feature-prioritization]
    SQ5 -->|Uses| SQB5[cohort-analysis<br/>funnel-analysis<br/>gap-analysis]
    SQ6 -->|Uses| SQB6[messaging-framework<br/>channel-strategy<br/>content-strategy]
    SQ7 -->|Uses| SQB7[ticket-refinement]
```

---

## Decision Flow for AI Agents

```mermaid
flowchart TD
    START["User Request"] --> ASK{What is the goal?}

    ASK -->|Validate idea| VALIDATE[Run Validation Pack]
    VALIDATE -->|GO| TECH[Run Technical Readiness Pack]
    TECH -->|READY| FOUNDATION[Run Foundation Skills]
    
    ASK -->|Design product| FOUNDATION
    
    ASK -->|Research| RESEARCH[Run Research Squad]
    
    ASK -->|Launch| GTM[Run GTM Skills]
    
    ASK -->|Build feature| TECHBATCH[Run Technical Skills]
    
    ASK -->|Refine tickets| AMIGOS[Run 3 Amigos]

    FOUNDATION --> OUTPUT[Deliverable]
    RESEARCH --> OUTPUT
    GTM --> OUTPUT
    TECHBATCH --> OUTPUT
    AMIGOS --> OUTPUT
```

---

## Skill-to-Squad Mapping

| Squad | Primary Skills | Secondary Skills |
|-------|---------------|------------------|
| Discovery Squad | competitor-research, requirements-elicitation, feedback-synthesis | user-persona-creation, user-journey-mapping |
| Design Squad | information-architecture, wireframing, user-journey-mapping | heuristic-evaluation, usability-test-planning |
| Research Squad | interview-guide-creation, survey-design, usability-test-planning | feedback-synthesis, cohort-analysis |
| Roadmap Squad | user-story-generation, roadmap-planning, feature-prioritization | stakeholder-analysis, gap-analysis |
| Analysis Squad | cohort-analysis, funnel-analysis, gap-analysis | ab-test-design, data-visualization |
| GTM Squad | launch-planning, messaging-framework, channel-strategy, content-strategy, launch-analytics, seo-foundation | All Batch 5 skills |
| 3 Amigos Squad | ticket-refinement | All Batch 6 skills as needed |

---

## Data Contracts: Key Handoffs

### Batch 0 → Batch 1

| Output | Input To |
|--------|----------|
| threat-model findings | technical-readiness-pack |
| security requirements | validation-pack (optional) |

### Batch 1 → Batch 2

| Output | Input To |
|--------|----------|
| GO/PAUSE/KILL verdict | All Batch 2 skills |
| validated requirements | requirements-elicitation |
| MVP scope | feature-prioritization |

### Batch 2 → Batch 3

| Output | Input To |
|--------|----------|
| requirements | competitor-research |
| personas | competitor-research |
| business case | competitor-research |

### Batch 2 → Batch 4

| Output | Input To |
|--------|----------|
| requirements | user-story-generation |
| personas | interview-guide-creation |
| journey | wireframing, heuristic-evaluation |
| metrics | cohort-analysis, ab-test-design |

### Batch 3 → Batch 4

| Output | Input To |
|--------|----------|
| competitive analysis | pricing-strategy |
| market sizing | cohort-analysis |

### Batch 4 → Batch 5

| Output | Input To |
|--------|----------|
| user insights | messaging-framework |
| pricing data | pricing-launch |
| roadmap | launch-planning |

### Batch 5 → Batch 6

| Output | Input To |
|--------|----------|
| launch requirements | All Batch 6 skills |
| channel specs | api-design |

---

## Iteration Loops

```mermaid
flowchart LR
    subgraph LOOP1["Product Development Cycle"]
        direction LR
        L1A[Build] --> L1B[Test]
        L1B --> L1C[Launch]
        L1C --> L1D[Measure]
        L1D --> L1E[Learn]
        L1E --> L1A
    end

    subgraph LOOP2["Research Cycle"]
        direction LR
        L2A[Research] --> L2B[Analyze]
        L2B --> L2C[Prioritize]
        L2C --> L2D[Build]
        L2D --> L2A
    end
```

---

## Quick Reference: Which Batch?

| User Goal | Use These Batches |
|-----------|------------------|
| "Is this idea worth building?" | Batch 1 (Validation Pack) |
| "Is the product ready technically?" | Batch 1 (Technical Readiness) |
| "What should we build?" | Batch 2 → Batch 4 |
| "How do users behave?" | Batch 2 → Batch 4 (Research) |
| "How do we launch?" | Batch 5 (GTM) |
| "How do we build it?" | Batch 6 (Technical) |
| "How do we improve?" | Batch 4 → Batch 6 (iteration) |
| "What security is needed?" | Batch 0 (always) |

---

## Total Skills by Batch

| Batch | Name | Skills |
|-------|------|--------|
| 0 | Security Foundation | 7 |
| 1 | Validation Packs | 2 |
| 2 | Architecture & Foundation | 9 |
| 3 | Completion | 2 |
| 4 | Research Squad | 16 |
| 5 | Go-to-Market | 14 |
| 6 | Technical | 28 |
| **Total** | | **78** |

---

## Document Status

**Status:** Complete
**Last Updated:** 2026-02-21

This document is designed for AI agents to:
1. Understand the overall skill architecture
2. Determine which skills to use based on user goals
3. Follow data contracts between skills
4. Assemble squads for specific tasks
