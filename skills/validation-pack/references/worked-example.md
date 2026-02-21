# Validation Pack Worked Example

## Input

**Product Idea:** AI-powered meeting notes summarizer for sales teams

**Problem:** Sales reps spend 30+ minutes per day manually organizing meeting notes and follow-up emails. Existing tools don't integrate with CRM.

**Target Market:** B2B SaaS sales teams, 10-100 employees

**Current Solution:** Manual note-taking + Gmail/Outlook

---

## Step-by-Step Execution

### Step 1: Requirements Elicitation

**Output:**
- Problem: Time wasted on administrative tasks, inconsistent follow-ups
- Target Users: Sales Reps (primary), Sales Managers (secondary)
- Current Solution: Manual notes, no CRM integration
- Scope: MVP within 3 months, 2-person dev team
- Assumptions: Users have smartphones, need offline mode

---

### Step 2: User Persona Creation

**Output:** 2 Personas

**Persona 1: "Sprinter Sarah"**
- Role: Inside Sales Rep, 28 years old
- JTBD: Close deals efficiently without administrative burden
- Current Workflow: Manual notes → Gmail → Salesforce (sometimes)
- Pain Points:
  - Lost notes (5/5)
  - Inconsistent follow-up (4/5)
  - Manual data entry (4/5)
- Decision Criteria: Time savings (40%), Ease of use (30%), Price (20%), Integrations (10%)
- Switching Costs: Medium (habit, data migration)

**Persona 2: "Manager Mike"**
- Role: Sales Manager, 42 years old
- JTBD: Coach team, hit quotas
- Pain Points:
  - Can't see what reps are doing (5/5)
  - Inconsistent pipeline data (4/5)

---

### Step 3: Competitor Research

**Competitors Profiled:**
1. Gong — Meeting analytics, $1.5K/user/year
2. Chorus — Conversation intelligence, $2K/user/year
3. Fireflies — AI notes, $10/user/month
4. Otter.ai — General transcription, $10/user/month
5. Minutes.io — Basic notes, Free

**Comparison Matrix:**
| Feature | Gong | Chorus | Fireflies | Otter | Minutes |
|---------|------|--------|-----------|-------|---------|
| CRM Integration | ✅ | ✅ | ❌ | ❌ | ❌ |
| AI Summary | ✅ | ✅ | ✅ | ✅ | ❌ |
| Search | ✅ | ✅ | ✅ | ❌ | ❌ |
| Price | $$ | $$ | $ | $ | Free |

**Gap Analysis:**
- **High Confidence:** No affordable option with CRM auto-logging for SMB
- **Medium Confidence:** Limited mobile-first design in enterprise tools

**Gate 1 Decision: GO** — Clear gap in SMB CRM integration at affordable price

---

### Step 4: Business Case Modeling

**Market Sizing:**
- TAM: $4.2B (global conversation intelligence)
- SAM: $800M (SMB segment US+EU)
- SOM: $40M (3-year target)
- Confidence: Medium

**Revenue Model:**
- $29/user/month
- 40% gross margin
- 5-seat average deal

**Unit Economics:**
- LTV: $8,700
- CAC: $2,900
- LTV:CAC: 3.0
- Payback: 8 months

**Scenarios:**
| Scenario | ARR Yr1 | ARR Yr3 | LTV:CAC |
|----------|---------|---------|---------|
| Conservative | $120K | $800K | 2.1 |
| Base | $240K | $1.6M | 3.0 |
| Optimistic | $400K | $3.2M | 4.2 |

**Viability Assessment:** CONDITIONALLY VIABLE
- Conditions: Need 40% of target pipeline conversion, must achieve <$3K CAC

---

### Step 5: Devil's Advocate

**Assumptions Challenged:**

| Assumption | Category | Certainty | Impact | Test |
|-----------|----------|-----------|--------|------|
| Sales reps will use AI notes | Problem | M | Fatal | A/B test: 20 reps, 30 days |
| CRM integration is must-have | Solution | H | Major | Survey: 50 prospects |
| $29 price point accepted | Market | L | Major | Pricing test: 3 variants |
| 5-seat average deal | Business | M | Minor | Historical data |

**Value Proposition Test:**
1. Does it save 30 min/day? → Likely (self-reported)
2. Will they pay $29? → Uncertain (survey needed)
3. Is it better than Fireflies? → Differentiation unclear

**Verdict: NEEDS WORK**
- Need validation on pricing and differentiation
- Fatal assumption: adoption rate

---

### Step 6: Feature Prioritization

**RICE Scoring:**

| Feature | Reach | Impact | Conf | Effort | RICE | Tier |
|---------|-------|--------|------|--------|------|------|
| AI Summarization | 1000 | 3 | 80% | 3 | 80 | 1 |
| CRM Auto-log | 800 | 3 | 70% | 5 | 34 | 1 |
| Search | 1000 | 2 | 90% | 4 | 45 | 1 |
| Mobile App | 600 | 2 | 60% | 6 | 12 | 2 |
| Team Dashboard | 400 | 2 | 50% | 8 | 5 | 3 |

**Tier 1: Build Now** — AI Summary, CRM Auto-log, Search
**Tier 2: Validate First** — Mobile App

---

### Step 7: User Journey Mapping

**Journey Stages:**

1. **Awareness:** Search "AI meeting notes for sales" → Land on pricing page
2. **Consideration:** Compare Fireflies vs. product → Request demo
3. **Activation:** Sign up → Connect calendar → First meeting summarized → "Aha!" moment
4. **Retention:** Daily use → CRM auto-logs → Team adoption
5. **Referral:** Success story → NPS prompt → Referral

**Moment of Truth:**
- Day 1: First auto-summary received
- Week 2: First CRM auto-log works
- Month 3: Team-wide adoption

**MVP Definition:** "Version 1 summarizes sales meetings and auto-logs to Salesforce for $29/user/month"

---

## Final Validation Pack Summary

### Validation Scorecard

| Metric | Value | Status |
|--------|-------|--------|
| Competitive Density | 5 | Warning (4-6) |
| Differentiation Gap | 2 gaps | Warning (1-2) |
| TAM/SAM/SOM | $40M | Good (> $10M) |
| LTV:CAC | 3.0 | Good (>3) |
| Assumption Risk | 2 Fatal/Low | Warning (2-3) |
| MVP Complexity | M (3 features, 3 deps) | Warning |
| Time to Value | Days | Good |

**Recommendation: PAUSE**
- 1 Critical (Assumption Risk)
- 3 Warnings → Gate 3 triggered

### Three Matrices

**(Matrix visualization would appear here)**

### Assumption Register (Top 5)

| # | Assumption | Category | Impact | Proof | Test |
|---|-----------|----------|--------|-------|------|
| 1 | Reps will use daily | Problem | Fatal | Partial | A/B test |
| 2 | $29 price accepted | Market | Major | Unvalidated | Pricing test |
| 3 | CRM integration critical | Solution | Major | High | Survey |
| 4 | 5-seat avg deal | Business | Minor | Partial | Data |

### MVP Scope

| # | Feature | RICE | Persona Pain |
|---|--------|------|--------------|
| 1 | AI Summarization | 80 | Lost notes |
| 2 | CRM Auto-log | 34 | Inconsistent follow-up |
| 3 | Search | 45 | Lost notes |

**Estimated Complexity:** Medium (3 features, 3 dependencies)

---

## Recommendation

**PAUSE** — Address pricing validation and differentiation before full build.

**Next Steps:**
1. Run pricing test with 3 variants ($19/$29/$39)
2. Conduct 10 user interviews on differentiation
3. Re-run validation pack with data
