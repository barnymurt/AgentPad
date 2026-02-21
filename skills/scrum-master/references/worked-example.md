# Worked Example: Scrum Master

This document shows a complete example of applying the Scrum Master skill to an ongoing delivery.

## Scenario

**Context:** A delivery is in progress based on the Project Manager plan from the earlier example. The plan has 7 tasks across 4 stages. Stage 1 is complete, Stage 2 is partially complete, and issues have arisen.

**Current Task States:**

| Task | Status | Notes |
|------|--------|-------|
| T-1: Define persona | ✅ Complete | Primary: Sales Manager, mid-market |
| T-2: Competitor research | 🔄 In Progress | 4/5 competitors done |
| T-3: Requirements | 🔄 In Progress | Functional reqs 80% |
| T-4: Business case | ⏸️ Waiting | Blocked by T-2 |
| T-5: Architecture | ⏸️ Waiting | Blocked by T-3 |
| T-6: Prioritization | ⏸️ Waiting | Blocked by T-3, T-4 |
| T-7: MVP scope | ⏸️ Waiting | Blocked by T-6 |

---

## Step-by-Step Application

### Step 1: Assess Current State

**Mapping to dependency graph:**
```
S-1 (Complete):
  T-1 ✅ → T-3 🔄 (dependency satisfied)
  T-2 🔄

S-2 (Partial):
  T-3 🔄 → T-5 ⏸️ (waiting on T-3)
  T-2 🔄 → T-4 ⏸️ (waiting on T-2)

S-3 (Not Started):
  T-6 ⏸️ (waiting on T-3, T-4)

S-4 (Not Started):
  T-7 ⏸️ (waiting on T-6)
```

**Observations:**
- T-2 has been in progress for a while (potential quality blocker)
- T-3 is nearly done but blocking T-5
- T-4 waiting on T-2 — can we parallelize anything?

### Step 2: Identify Blockers

**Analysis:**

| Task | Status | Blocker Check | Finding |
|------|--------|---------------|---------|
| T-2 | In Progress | Is it making progress? | Slow but moving |
| T-3 | In Progress | Almost done | Not blocked |
| T-4 | Waiting | Waiting on T-2 | Dependency blocker |
| T-5 | Waiting | Waiting on T-3 | Dependency blocker |
| T-6 | Waiting | Waiting on T-3, T-4 | Dependency blocker |
| T-7 | Waiting | Waiting on T-6 | Dependency blocker |

**Identified Blockers:**

| ID | Type | Severity | Description | Affected |
|----|------|----------|-------------|----------|
| B-1 | dependency | major | T-4 waiting on T-2 | T-4 |
| B-2 | dependency | minor | T-5 waiting on T-3 | T-5 |
| B-3 | dependency | major | T-6 waiting on T-4 | T-6 |
| B-4 | quality | minor | T-2 taking too long | T-2 |

### Step 3: Remove Blockers

**B-1 (Major - Dependency):** T-4 waiting on T-2
- T-2 is 80% complete (4/5 competitors)
- T-4 can start with partial data? No — needs full competitor list
- **Resolution:** Wait for T-2 to complete. This is reasonable.

**B-2 (Minor - Dependency):** T-5 waiting on T-3
- T-3 is 80% complete
- T-5 could start with 80% of requirements?
- **Resolution:** Wait for near-complete T-3. Not worth partial.

**B-3 (Major - Dependency):** T-6 waiting on T-4
- T-4 depends on T-2
- T-3 will also feed into T-6
- **Resolution:** Once T-2 and T-3 complete, T-6 can proceed

**B-4 (Minor - Quality):** T-2 taking long
- Is the skill being used correctly? Yes
- Is the scope too large? Maybe
- **Resolution:** Let it complete. One more competitor.

### Step 4: Optimize Workflow

**Current flow:**
```
Stage 2:
  T-2 (80%) → T-4 (waiting)
  T-3 (80%) → T-5 (waiting)
  
Stage 3:
  T-4 + T-3 → T-6 (waiting)
```

**Optimization opportunities:**

| ID | Category | Description | Impact | Recommendation |
|----|----------|-------------|--------|----------------|
| O-1 | sequencing | T-3 and T-2 are independent in Stage 2 | Low | Already parallel |
| O-2 | handoff | Ensure T-3 output format matches T-6 needs | Medium | Add to collaboration notes |
| O-3 | format | T-4 needs competitor pricing in specific format | High | Document in handoff |

### Step 5: Facilitate Collaboration

**Identified handoffs:**

| From | To | Handoff | Format | Status |
|------|-----|---------|--------|--------|
| T-2: competitor-research | T-4: business-case-modeling | Competitor profiles, pricing | JSON with fields: name, pricing, market_share | Ready |
| T-3: requirements-elicitation | T-5: architecture-design | Feature requirements | Markdown with user stories | 80% ready |
| T-3: requirements-elicitation | T-6: feature-prioritization | Requirements + priorities | Structured list | Not ready |
| T-2 + T-3 | T-6: feature-prioritization | Combined input | TBD merge | After both complete |

**Collaboration Note:** Ensure business-case-modeling knows to wait for full competitor list before starting analysis.

### Step 6: Report Status

---

# Scrum Master Status Report

## Delivery Status

| Task | Status | Notes |
|------|--------|-------|
| T-1: Define persona | ✅ Complete | Primary persona: Sales Manager |
| T-2: Competitor research | 🔄 In Progress | 4/5 competitors (1 remaining) |
| T-3: Requirements | 🔄 In Progress | 80% complete |
| T-4: Business case | ⏸️ Waiting | Blocked by T-2 (B-1) |
| T-5: Architecture | ⏸️ Waiting | Blocked by T-3 (B-2) |
| T-6: Prioritization | ⏸️ Waiting | Blocked by T-3, T-4 (B-3) |
| T-7: MVP scope | ⏸️ Waiting | Blocked by T-6 |

**Progress:** 14% complete (1/7 tasks), 43% in progress

## Blocker Register

| ID | Type | Severity | Description | Resolution | Status |
|----|------|----------|-------------|------------|--------|
| B-1 | dependency | major | T-4 waiting on T-2 | Wait for completion | pending |
| B-2 | dependency | minor | T-5 waiting on T-3 | T-3 nearly done | pending |
| B-3 | dependency | major | T-6 waiting on T-4 | Will resolve with B-1 | pending |
| B-4 | quality | minor | T-2 slow but moving | Let complete | pending |

**Resolution Plan:**
1. Wait for T-2 to complete (1 more competitor)
2. Once T-2 and T-3 both complete, Stage 3 can begin
3. T-4, T-5 can start immediately after T-2/T-3

## Dependency Health

```
total_dependencies: 8
blocked_tasks: 4
critical_path: clear (T-2 → T-4 → T-6 → T-7)

Assessment: Healthy, minor delays expected
```

## Collaboration Notes

- **Handoff T-2 → T-4:** Competitor profiles ready. Format: JSON with name, pricing, market_share. T-4 can prepare analysis framework while waiting.
- **Handoff T-3 → T-5:** Requirements 80% ready. Architecture can start prep work.
- **Note:** T-6 will need merged input from both T-2 and T-3. Document format expectations now to avoid delay later.

## Optimizations

| ID | Category | Description | Impact | Recommendation |
|----|----------|-------------|--------|----------------|
| O-1 | format | Business case needs competitor pricing in structured format | High | Document in handoff spec now |
| O-2 | handoff | Feature prioritization needs merge of requirements + competitor gaps | Medium | Define merge format early |

## Recommendations

1. **[HIGH]** T-2 should complete in this session. Check back for completion.
2. **[HIGH]** Once T-2 done, T-4 and T-6 can advance.
3. **[MEDIUM]** Define T-6 merge format now to avoid later blocker.
4. **[LOW]** Consider running T-5 (architecture) in parallel with T-4 after dependencies clear.

---

## Summary

Delivery is 14% complete with T-1 done and T-2/T-3 in progress (80% each). Four blockers identified, all dependency-related. No critical blockers — just natural sequencing. Critical path runs through T-2 → T-4 → T-6 → T-7. Recommend continuing as-is, checking back when T-2 completes.

**Next checkpoint:** After T-2 and T-3 both complete (~15 minutes or next session).
