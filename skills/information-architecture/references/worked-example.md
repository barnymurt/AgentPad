# Worked Example: Information Architecture

This file shows the Information Architecture skill applied to a complete scenario.

---

## Scenario: TaskFlow - Project Management App

**Context:** TaskFlow is a project management SaaS for small teams. They need to organize their web presence, including marketing site and app. The team has basic content but no formal IA. They want to improve how users find features, pricing, and get started.

---

## Output: Information Architecture

# Information Architecture: TaskFlow

## 1. Executive Summary

**Product type:** SaaS Web + App
**Complexity:** Medium
**Navigation type:** Horizontal global + sidebar local
**Primary recommendation:** Implement section-based navigation with clear user paths (Getting Started, Features, Pricing). Prioritize search for logged-in app users. Simple 3-level hierarchy to keep users moving efficiently.

---

## 2. Complexity Assessment

### Assessment Factors
| Factor | Value | Notes |
|--------|-------|-------|
| Content types | 6 | Pages, blog, docs, app, pricing, about |
| User tasks | 8 | Learn, try, buy, use, get help |
| Audiences | 4 | Visitors, trial users, customers, partners |
| Platform | Web + App | Primary web for marketing |

### Complexity Level
- **Level:** Medium
- **IA Depth:** 3 levels recommended
- **Navigation:** Horizontal global, sidebar local

---

## 3. Content Inventory

### Content Types
| Type | Examples | Audience |
|------|----------|----------|
| Marketing | Home, Features, Pricing | Visitors |
| Product | Dashboard, Projects, Tasks | Users |
| Support | Help, Docs, API | Users |
| Blog | Posts, Categories | All |
| Company | About, Careers, Contact | Visitors |
| Legal | Privacy, Terms, Security | All |

### Content by User Task
| Task | Related Content |
|------|-----------------|
| Understand product | Home, Features, Pricing, Demo |
| Get started | Sign up, Getting Started Guide, Docs |
| Use product | Dashboard, Projects, Tasks |
| Get help | Help Center, Docs, Support |
| Learn success stories | Case Studies, Blog |

---

## 4. Site Map

### Visual Hierarchy

```
[Global Nav]
├── Home
├── Features
│   ├── Overview
│   ├── Project Management
│   ├── Time Tracking
│   ├── Reporting
│   └── Integrations
├── Pricing
│   ├── Plans
│   ├── Enterprise
│   └── FAQ
├── Resources
│   ├── Blog
│   ├── Case Studies
│   ├── Getting Started
│   └── Webinars
├── Company
│   ├── About
│   ├── Careers
│   ├── Contact
│   └── Security
└── [CTA: Start Free Trial]
```

### App Navigation (Logged-in)

```
[App Sidebar]
├── Dashboard
├── Projects
├── My Tasks
├── Team
├── Time
├── Reports
└── Settings
    ├── Profile
    ├── Workspace
    ├── Billing
    └── Integrations
```

### Page List

| Level | Page | Parent | Purpose |
|-------|------|--------|---------|
| 1 | Home | - | Entry, value prop |
| 2 | Features | Home | Section hub |
| 3 | Project Mgmt | Features | Detail |
| 2 | Pricing | Home | Conversion |
| 3 | Enterprise | Pricing | Detail |
| 2 | Getting Started | Resources | Onboarding |
| 2 | Blog | Resources | Content |
| 1 | Dashboard | App | Main app |

---

## 5. Navigation System

### Global Navigation (Web)
| Label | Destination | Priority |
|-------|------------|----------|
| Features | /features | Primary |
| Pricing | /pricing | Primary |
| Resources | /resources | Secondary |
| Company | /company | Secondary |
| Login | /login | Utility |
| Start Free Trial | /signup | CTA |

### Local Navigation (Resources)
| Section | Links |
|---------|-------|
| Getting Started | Quick Start, Video Tutorials, API Docs |
| Blog | Latest, Product, Tips |
| Company | About, Careers, Contact |

### Utility Navigation
| Element | Purpose |
|---------|---------|
| Search | Find content/pages |
| Help | Link to support |
| Language | EN/ES/FR |

---

## 6. Label Glossary

| Label | Meaning | Alternatives |
|-------|---------|--------------|
| Features | What the product does | Capabilities, Benefits |
| Pricing | How much it costs | Plans, Costs, Subscription |
| Resources | Helpful content | Learn, Support, Help |
| Getting Started | How to begin | Onboarding, Quick Start |
| Dashboard | Main app view | Home, Overview |
| Projects | Work containers | Workspaces, Boards |
| Team | People | Members, Users |
| Settings | Configuration | Preferences, Account |

---

## 7. Search Strategy

### Search vs. Browse
- **Primary method:** Hybrid
- **When to search:** Logged-in app users searching for projects/tasks
- **When to browse:** Website visitors exploring features

### Website Search
- Search pages and blog posts
- No advanced filters needed (simple content)
- Show results in list format
- Highlight matching terms

### App Search
- Search projects, tasks, team members
- Filter by type (project/task/person)
- Recent searches
- Quick actions from search

### No Results
- "No results for [query]"
- Suggest related pages
- Suggest starting new project

---

## 8. Multi-Platform Considerations

### Web (Marketing)
- Horizontal global nav
- Resources section hub
- Blog categories
- Clear CTAs throughout

### App (Product)
- Vertical sidebar navigation
- Tab-based for main sections
- Command palette (Cmd+K) for power users
- Breadcrumbs in complex views

### API (Developer Docs)
- Endpoint grouping by resource
- Version switching prominent
- Search first (developers know what they want)
- Code snippets prominent

---

## 9. Validation

### Validation Method
- [ ] Tree testing - **Planned for Q2**
- [ ] Card sorting - Not yet conducted
- [ ] Click testing - Not yet conducted
- [x] Heuristic evaluation - Internal review completed
- [ ] Not validated (needs user testing)

### Internal Review Results
- Navigation labels clear: Yes
- Hierarchy depth appropriate: Yes
- Search integration needed: Yes
- Mobile consideration: Need responsive design

### Notes
- This IA is based on competitive analysis and best practices
- Needs user testing to validate groupings
- Will conduct tree testing with 5 users before launch

---

## 10. Maintenance

### When to Update
- New feature launch → Add to Features section
- New content type → Update inventory
- User feedback → Test and iterate

### Content Owners
| Content | Owner |
|---------|-------|
| Marketing pages | Marketing |
| Product UI | Product |
| Docs | Support |
| Blog | Marketing |
| Legal | Operations |

---

**End of Worked Example**
