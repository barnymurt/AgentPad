# LaunchPadPM MVP Specification

## Overview

**LaunchPadPM** - A lightweight web UI that provides access to the AgentPad skill library.

- **AgentPad**: The 80+ skill files (the "brain")
- **LaunchPadPM**: The web UI (the "face")

## MVP Goals

1. Create a tangible, visual product people can see
2. Enable non-technical users to access skills
3. Demonstrate monetization potential
4. Keep it simple - add features later

---

## Core Features (MVP)

### 1. Squad Browser
- Visual list of 10 squads with descriptions
- Click squad to see skills in it
- Simple card-based layout

### 2. Skill Browser  
- List all skills
- Search/filter by name
- Click skill to see description
- "Run" button (future)

### 3. Data Source Manager (connect to existing)
- View connected data sources
- Add/remove data sources (calls existing CLI)
- Simple form interface

### 4. Output Display
- Show skill outputs as formatted markdown/rendered content
- Simple, readable format
- Copy to clipboard

---

## Technical Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Data**: Connect to existing JSON files (squads.json, registry.json)
- **API**: Python scripts via subprocess or API routes

---

## File Structure

```
launchpadpm/
├── app/
│   ├── page.tsx           # Home - squad browser
│   ├── squads/
│   │   └── [squad]/page.tsx  # Skills in squad
│   ├── skills/
│   │   └── [skill]/page.tsx  # Skill detail
│   ├── data-sources/page.tsx  # Data source manager
│   └── layout.tsx
├── components/
│   ├── SquadCard.tsx
│   ├── SkillCard.tsx
│   ├── DataSourceForm.tsx
│   └── OutputDisplay.tsx
├── lib/
│   ├── api.ts             # Call Python scripts
│   └── data.ts           # Load JSON data
├── public/
└── package.json
```

---

## Implementation Phases

### Phase 1: Setup
1. Initialize Next.js project
2. Configure Tailwind
3. Set up folder structure

### Phase 2: Squad Browser
1. Create squad data loader
2. Build squad cards
3. Build squad detail page

### Phase 3: Skill Browser
1. Create skill data loader (from skills/ directory)
2. Build skill cards
3. Build skill detail page

### Phase 4: Data Source Integration
1. Connect to existing manage_data_sources.py
2. Build add/remove forms
3. Display current data sources

### Phase 5: Output Display
1. Render markdown outputs
2. Simple styling
3. Copy functionality

---

## Out of Scope (MVP)

- User authentication
- Skill execution (just viewing for now)
- Team features
- Payment/monetization
- Notion integration

---

## Success Criteria

- [ ] User can browse squads
- [ ] User can see skills in each squad
- [ ] User can search/filter skills
- [ ] User can view skill descriptions
- [ ] User can manage data sources via UI
- [ ] Skill outputs display correctly
- [ ] Deployable (Vercel, etc.)
