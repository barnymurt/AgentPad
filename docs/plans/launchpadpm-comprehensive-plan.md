# LaunchPadPM - Comprehensive Plan

## Product Vision

**LaunchPadPM** - A product development platform that combines AI-powered skill execution with Agile/Scrum best practices, featuring dynamic Notion templates that grow with the project.

### Product Tier Model

| Tier | Name | Features | Price |
|------|------|----------|-------|
| Free | **Validate** | Validation pack → GO/PAUSE/PIVOT/KILL | Free |
| Paid | **Build** | Full squad access, Notion templates, project tracking | $X/mo |
| Paid | **Enterprise** | Team features, advanced integrations | $Y/mo |

### The Hook (Free Tier)
1. User enters their idea
2. Optionally add existing data sources
3. Ask clarifying questions to build context
4. Run validation pack
5. Results: GO / PAUSE / PIVOT / KILL

**Monetization trigger:** GO/PAUSE/PIVOT users prompted to upgrade to "Build" tier to continue developing their idea.

---

## Core Features

### 1. Conversation-First Interface
- Central chat window for idea input
- "I have an idea to validate" flow
- Ask questions to build context
- Display results in-line
- Option to export as document

### 2. Squad Browser
- 10 predefined squads + custom squads
- Visual cards with descriptions
- Skills visible per squad
- "Join Devil's Advocate" option on any squad

### 3. Skill Browser
- All 80+ skills searchable
- Filter by squad
- Skill detail view
- Run button

### 4. Data Source Manager
- View connected data sources
- Add/remove via UI
- Squad access management
- Connect to existing credentials

### 5. Results & Output
- Display in app (rendered markdown)
- Copy to clipboard
- Export as document

### 6. Dynamic Notion Templates
- Master template per project
- Sections added/removed based on squads run
- Customized to user's idea
- Export to user's Notion

### 7. Project Tracking (Build Tier)
- Backlog management
- Sprint planning
- Kanban board
- User story tracking

---

## Devil's Advocate Integration

The Devil's Advocate can join ANY squad to stress-test outputs:

| Squad | Can Include Devil's Advocate |
|-------|------------------------------|
| Discovery | ✓ |
| Design | ✓ |
| Data | ✓ |
| Security | ✓ |
| GTM/Launch | ✓ |
| Technical | ✓ |
| Product | ✓ |
| Research | ✓ |
| Growth | ✓ |
| Infrastructure | ✓ |
| Custom | ✓ |

**Implementation:** When running any squad, user can toggle "Include Devil's Advocate" to add adversarial analysis to the output.

---

## Notion Template Strategy

### Dynamic Section Model

```
Project Workspace (Master Template)
├── 📋 Validation Pack Results (if run)
│   ├── GO/PAUSE/PIVOT/KILL Decision
│   ├── Problem Statement
│   ├── Personas
│   ├── Competitor Analysis
│   ├── Business Case
│   └── Assumptions Register
│
├── 🏗️ Technical Architecture (if Technical squad run)
│   ├── Architecture Diagram
│   ├── API Design
│   ├── Schema Design
│   └── User Stories
│
├── 🎨 Design Work (if Design squad run)
│   ├── Wireframes
│   ├── UI Patterns
│   ├── User Flows
│   └── Design System
│
├── 🚀 Launch Plan (if GTM/Launch squad run)
│   ├── Pricing Strategy
│   ├── Channel Strategy
│   ├── Launch Timeline
│   └── Messaging Framework
│
├── 📊 Analytics & Growth (if Data/Growth squad run)
│   ├── A/B Tests
│   ├── Funnel Analysis
│   └── Cohort Analysis
│
├── 📦 Backlog (Build tier)
│   ├── Sprint 1
│   ├── Sprint 2
│   └── ...
│
└── 📈 Project Board (Build tier)
    ├── To Do
    ├── In Progress
    └── Done
```

### Template Generation Flow

1. User runs validation pack → Validation sections generated
2. User upgrades to Build tier
3. User runs Technical squad → Technical sections added to template
4. User runs Design squad → Design sections added
5. etc.

---

## User Flows

### Flow 1: Validate Idea (Free)
```
1. Open app → Conversation window
2. "I have an idea to validate"
3. Enter idea description
4. Add data sources (optional)
5. Answer clarifying questions
6. Run validation pack
7. See GO/PAUSE/PIVOT/KILL
8. [If GO/PAUSE/PIVOT] → Prompt to upgrade
```

### Flow 2: Build Product (Paid)
```
1. Upgrade to Build tier
2. Select squad (e.g., Technical)
3. Optionally add Devil's Advocate
4. Run skills in sequence
5. View results in app
6. Export to Notion
7. Add items to backlog
```

### Flow 3: Use Templates (Paid)
```
1. Run a squad
2. View results
3. Click "Export to Notion"
4. Template dynamically generated
5. Opens in user's Notion
```

---

## Technical Architecture

### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State:** React Context + SWR/React Query

### Backend/API
- **API Routes:** Next.js API routes
- **Skill Execution:** Python subprocess calls
- **Data Storage:** JSON files (registry, squads)

### External Integrations
- **Notion:** API for template export
- **Authentication:** Clerk or NextAuth (future)

---

## File Structure

```
launchpadpm/
├── app/
│   ├── page.tsx                 # Home - conversation + squads
│   ├── layout.tsx
│   ├── squads/
│   │   └── [squad]/page.tsx     # Squad detail + skills
│   ├── skills/
│   │   └── [skill]/page.tsx     # Skill detail
│   ├── data-sources/
│   │   └── page.tsx             # Data source manager
│   ├── project/
│   │   └── [projectId]/page.tsx # Project view + Notion export
│   └── api/
│       ├── run-skill/           # Execute skill
│       ├── run-squad/           # Execute squad
│       ├── data-sources/        # CRUD data sources
│       └── export-notion/       # Generate Notion template
├── components/
│   ├── SquadCard.tsx
│   ├── SkillCard.tsx
│   ├── Conversation.tsx
│   ├── OutputDisplay.tsx
│   ├── DataSourceForm.tsx
│   ├── NotionExport.tsx
│   └── ProjectBoard.tsx
├── lib/
│   ├── skills.ts                # Load skills from files
│   ├── squads.ts                # Load squads from JSON
│   ├── executor.ts              # Run skills/skills
│   └── notion.ts                # Notion API helpers
└── package.json
```

---

## Implementation Phases

### Phase 1: MVP (This Session)
- [ ] Next.js setup
- [ ] Squad browser
- [ ] Skill browser
- [ ] Basic conversation interface
- [ ] Output display (markdown)

### Phase 2: Data Sources
- [ ] UI for data source management
- [ ] Connect to existing CLI
- [ ] Display connected sources

### Phase 3: Skill Execution
- [ ] Run individual skills
- [ ] Run squads
- [ ] Devil's Advocate toggle

### Phase 4: Notion Export (Build Tier)
- [ ] Dynamic template generation
- [ ] Notion API integration
- [ ] Export workflow

### Phase 5: Project Tracking (Build Tier)
- [ ] Backlog management
- [ ] Sprint planning
- [ ] Kanban board

---

## Next Steps

1. Initialize Next.js project
2. Build Phase 1 (MVP)
3. Test with validation pack
4. Add data sources
5. Implement paid features
