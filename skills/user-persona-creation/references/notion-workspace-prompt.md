# Notion Workspace Generation Prompt

This prompt generates a structured Notion workspace from user persona creation output.

**When to use:** After user-persona-creation skill completes with persona profiles.

**Input:** Persona data (demographics, behaviors, goals, pain points, motivations).

**Output:** A Notion workspace for managing and using personas across product development.

---

## Data Mapping

| Template Variable | Source | Field Path |
|-------------------|--------|------------|
| `template_version` | Static | `"1.0"` |
| `generated_date` | Runtime | Current date |
| `product_name` | Input | Product name |
| `personas` | Output | Array of persona objects |
| `primary_persona` | Output | First/primary persona |
| `secondary_personas` | Output | Additional personas |

---

## Prompt

> **Instruction to AI:** Generate a Notion workspace specification from persona data.

---

### 0. Start Here (Page)

**Purpose callout:**
> This workspace was generated from User Persona Creation (v{{template_version}}) on {{generated_date}}.
> Product: **{{product_name}}**

**Persona Overview:**
- Primary Persona: **{{primary_persona.name}}**
- Total Personas: {{count of personas}}

**Quick Links:**
- → Persona Profiles
- → Persona Comparison
- → Interview Guides
- → Feature Fit Matrix

---

### 1. Persona Profiles (Page)

Create one sub-page per persona with this structure:

**Persona: {{persona_name}}**

**Identity Block:**
| Field | Value |
|-------|-------|
| Name | {{persona.name}} |
| Role | {{persona.role}} |
| Industry | {{persona.industry}} |
| Company Size | {{persona.company_size}} |
| Location | {{persona.location}} |
| Age Range | {{persona.age_range}} |

**Bio:** {{persona.bio}}

**Goals (What they want to achieve):**
- {{persona.goals}}

**Pain Points (Frustrations):**
- {{persona.pain_points}}

**Motivations:**
- {{persona.motivations}}

**Behaviors:**
- {{persona.behaviors}}

**Tech Savvy:** {{persona.tech_savvy}}
**Budget Authority:** {{persona.budget_authority}}

**Preferred Channels:** {{persona.preferred_channels}}

**Quotes:**
> "{{persona.quote}}"

---

### 2. Persona Database

**Database Name:** All Personas

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Name | Title | — |
| Role | Select | Founder, PM, Developer, Designer, Marketer, Sales, Customer Support, Other |
| Priority | Select | Primary, Secondary, Tertiary |
| Tech Savvy | Select | Low, Medium, High |
| Budget Authority | Select | None, Influencer, Decision Maker |
| Goals | Text | — |
| Pain Points | Text | — |
| Status | Select | Validated, Draft, Archive |

**Pre-populate:** One row per persona from `personas`.

**Views:**
1. **"Primary First"** — Sort by: Priority
2. **"By Role"** — Group by: Role
3. **"Valid"** — Filter: Status = Validated

---

### 3. Persona Comparison (Page)

**Table View:**

| Dimension | {{primary_persona.name}} | {{secondary_personas[0].name}} | ... |
|-----------|--------------------------|--------------------------------|-----|
| Role | | | |
| Goals | | | |
| Pain Points | | | |
| Tech Savvy | | | |
| Budget | | | |
| Priority | Primary | Secondary | ... |

---

### 4. Interview Guide Generator (Page)

**Database Name:** Interview Guides

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Guide | Title | — |
| Target Persona | Relation | → All Personas |
| Status | Select | Draft, Ready, Completed |
| Questions | Text | — |
| Interview Date | Date | — |

**Pre-populate:** Generate 5-8 interview questions per persona based on their goals and pain points.

---

### 5. Feature Fit Matrix (Page)

**Database Name:** Feature Fit

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Feature | Title | — |
| Primary Persona Fit | Select | High, Medium, Low, N/A |
| Secondary Persona Fit | Select | High, Medium, Low, N/A |
| Notes | Text | — |

**Purpose:** Track which features align with which personas.

**Views:**
1. **"High Priority Features"** — Filter: Primary Persona Fit = High

---

### 6. Persona Validation Tracker (Page)

**Database Name:** Validation Evidence

**Properties:**
| Property | Type | Options |
|----------|------|---------|
| Claim | Title | — |
| Persona | Relation | → All Personas |
| Evidence Type | Select | Interview, Survey, Analytics, Assumed |
| Status | Select | Validated, Pending, Invalid |
| Source | Text | — |

---

### 7. Messaging Matrix (Page)

**Table:**

| Message/Feature | {{primary_persona.name}} | {{secondary_personas[0].name}} |
|----------------|--------------------------|--------------------------------|
| Value Prop 1 | | |
| Value Prop 2 | | |
| Pain Solver 1 | | |
| Pain Solver 2 | | |

---

## Output Checklist

- [ ] Persona sub-pages for each persona
- [ ] All Personas database with all personas
- [ ] Interview Guides database
- [ ] Feature Fit Matrix database
- [ ] Validation Evidence tracker
- [ ] Messaging Matrix
- [ ] All views configured
