---
name: Skill Orchestrator
description: Use when managing a complex delivery involving multiple skills that need coordination. Use when you need to oversee the big picture and ensure all tasks align with the overall vision. Use when skills need to work together (mini squad) or one-on-one collaboration. Use when deciding which skills to engage for a given goal. Not for simple single-skill tasks. This is a meta-skill that coordinates other skills.
---

# Skill Orchestrator

The Skill Orchestrator is a meta-skill that coordinates delivery across multiple skills. It sits above individual skills and ensures:

1. **Strategic alignment** — All work contributes to the user's goal
2. **Skill selection** — Right skills engaged for right work
3. **Coordination** — Skills work together effectively
4. **Visibility** — Clear view of overall delivery health
5. **Adaptation** — Responds to changes and blockers

This skill DOES NOT execute individual tasks — it delegates to other skills (Delivery Manager, Skill Reviewer, and domain skills) while maintaining the overall picture.

## Core Workflow

### Step 1: Goal Analysis + Domain Context

- Understand the user's ultimate objective
- Break down what needs to be achieved
- Identify success criteria
- Determine if this is a new delivery or continuation
- **⚠️ Critical:** Gather sufficient domain context to select appropriate skills
  - If user says "validate my idea," you need to know: What idea? What domain?
  - If user says "build something," ask: What type of product? What industry?
  - Without domain context, you cannot select the right skills
- If domain context is unclear, ask clarifying questions before proceeding

### Step 1b: Check for Data Sources

**After understanding the goal, check if the user has connected data sources:**

1. **Check if data sources exist:**
   - Look for any data sources in `data-sources/registry.json`
   - If none exist, optionally prompt: "Would you like to connect any existing research, data, or credentials to enhance this work?"

2. **Identify relevant data sources:**
   - Based on the skill(s) being run, identify which squads are needed
   - Check which data sources are accessible to those squads
   - Match user's stated goal to appropriate data sources

3. **Data source integration options:**
   - **Auto-detect (default):** Automatically use data sources relevant to the skill being run
   - **Manual selection:** User explicitly specifies which data source to use
   - **Template:** Use a squad template (e.g., "Product Validation" = Discovery + Research squads)

4. **If credentials are needed:**
   - For encrypted data sources, prompt for passphrase
   - Decrypt credentials at runtime (never store decrypted)
   - Pass credentials to skill context only when needed

5. **Inject into skill context:**
   ```json
   {
     "data_sources": {
       "data_source_id": {
         "name": "...",
         "type": "...",
         "location": "...",
         "format": "...",
         "credential": "decrypted_credential_if_needed"
       }
     }
   }
   ```

### Step 2: Skill Strategy

Determine the best approach to achieve the goal:

**Option A: Single Skill**
- Goal fits one skill's scope
- Linear execution, no coordination needed
- Example: "Research competitors" → competitor-research skill

**Option B: Coordinated Skills**
- Goal requires multiple skills
- Sequential or parallel execution
- Delivery Manager plans the sequence
- Delivery Manager coordinates during execution

**Option C: Mini Squad**
- Complex goal needing tight collaboration
- Multiple skills work together on shared output
- Clear handoffs and collaboration required
- Example: "Build validation pack" → squad of research, modeling, synthesis skills

**Option D: Nested Orchestration**
- ⚠️ **Advanced use only** — For very large, complex goals with multiple independent sub-deliveries
- Very large goal, multiple sub-deliveries that can run independently
- Each sub-delivery has its own orchestrator
- Example: "Build full product" → validation pack + technical architecture + development plan as separate workstreams
- **When to use:** Goal has 10+ skills AND sub-deliveries are largely independent
- **When NOT to use:** Default to Options A-C; nested orchestration adds complexity overhead

### Step 3: Assemble Delivery Team

Based on skill strategy, select and engage skills:

**Always include:**
- Delivery Manager: For breaking down, sequencing work, AND blocker resolution
- Skill Reviewer: For validating skills before use (optional, recommended)

**Domain skills as needed:**
- Select skills that match the work
- Consider skill dependencies
- Plan handoffs between skills

### Step 3b: Skill Gap Check

**⚠️ Before executing, check for missing skills:**

- For each task, verify the skill exists in the skills/ directory
- If a required skill doesn't exist:
  1. **Can existing skills be combined?** Merge task with similar skill
  2. **Can the task be expressed differently?** Use available skills differently
  3. **Should a new skill be built?** If it's a recurring need, trigger skill building
  4. **Can it be handled as an exception?** One-off tasks can be handled manually
- Document any skill gaps in the delivery plan
- If new skill needed, add task: "Build [skill-name] skill" using build_skill directive

### Step 4: Execute and Monitor

During delivery:

- Track progress across all active tasks
- Monitor for blockers (Delivery Manager handles blocker resolution)
- Ensure alignment with vision (Delivery Manager)
- Adapt plan as needed
- Communicate status to user

### Step 5: Synthesize and Deliver

At delivery completion:

- Aggregate outputs from all skills
- Ensure coherence across deliverables
- Present unified result to user
- Document learnings for future deliveries

## Interaction Patterns

### Pattern 1: One-on-One

**When:** Simple goal, single skill execution

**Flow:**
```
User → Orchestrator → Single Skill → Orchestrator → User
```

**Example:** "Research competitors for project management software"
- Orchestrator: Selects competitor-research skill
- Runs skill with context
- Delivers result to user

### Pattern 2: Coordinated Sequence

**When:** Multiple skills, clear sequence

**Flow:**
```
User → Orchestrator → PM (plan) → [Skill A → Skill B → Skill C] → SM (coordinate) → User
```

**Example:** "Build a business case for my SaaS idea"
- Delivery Manager: Breaks into research, modeling, synthesis
- Runs skills in sequence
- Delivery Manager removes blockers
- Delivers business case

### Pattern 3: Mini Squad

**When:** Complex goal, tight collaboration needed

**Flow:**
```
User → Orchestrator → Squad (multiple skills working together)
         ↑
    Continuous feedback
         ↓
User ← SM (facilitates collaboration)
```

**Example:** "Build a complete validation pack"
- Assemble: competitor-research, user-persona-creation, business-case-modeling, feature-prioritization, user-journey-mapping, devils-advocate
- Delivery Manager facilitates collaboration
- Continuous synchronization
- Unified deliverable

### Pattern 4: Parallel Workstreams

**When:** Independent workstreams that combine later

**Flow:**
```
User → Orchestrator
       ├── Workstream A (Skill 1, 2)
       ├── Workstream B (Skill 3, 4)
       └── Workstream C (Skill 5)
       ↓
    Synthesis → User
```

**Example:** "Build validation pack and technical spec in parallel"
- Workstream A: Validation pack (PM, domain skills)
- Workstream B: Technical architecture (architecture-design)
- Both complete → Synthesize into final deliverable

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Strategy:** Selected approach and rationale
- **Skill Team:** Skills engaged and their roles
- **Execution Plan:** Sequence and handoffs
- **Status:** Current delivery state
- **Deliverable:** Final output from coordinated work

## Quality Criteria

- [ ] Goal clearly understood and stated
- [ ] Appropriate skill strategy selected
- [ ] Right skills engaged for the work
- [ ] Dependencies mapped and respected
- [ ] Blockers identified and resolved
- [ ] Alignment with vision maintained
- [ ] User kept informed of progress
- [ ] Deliverable coherent and complete

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example:** [references/worked-example.md](references/worked-example.md)

## Data Source Handling

### Credential Warning System

**If user pastes what appears to be a credential in conversation:**

Detect patterns that look like credentials:
- API keys (starts with `sk_`, `pk_`, `api_`, etc.)
- Connection strings (`postgresql://`, `mysql://`, etc.)
- Passwords in URLs (`user:pass@host`)
- Token-like strings (long random-looking strings)

**When detected, warn the user:**

```
⚠️ I notice you've pasted what looks like a [API key / credential / connection string].

For security, I recommend storing credentials in the Data Source Registry instead.
This keeps them:
- Encrypted at rest
- Out of conversation history
- Accessible only to authorized squads

Would you like to add this as a data source instead?
```

### Data Source References

For more details on data sources, see:
- **Design spec:** `docs/plans/data-source-framework-design.md`
- **CLI tool:** `execution/manage_data_sources.py`
- **User guide:** `docs/guides/data-sources.md`

## Common Mistakes

1. **Over-orchestrating:** Using orchestrator for simple tasks that don't need it. Use one-on-one for simple goals.
2. **Under-orchestrating:** Not engaging Delivery Manager for complex deliveries, leading to chaos.
3. **No vision check:** Forgetting to verify alignment with user's ultimate goal.
4. **Ignoring skill limitations:** Not understanding what each skill can do.
5. **Poor handoffs:** Not ensuring skills pass clear outputs to each other.
6. **Not escalating:** Letting blockers persist instead of using Delivery Manager blocker resolution or escalating.
7. **Exposing credentials:** Never include decrypted credentials in skill context when not needed, never log credentials.
