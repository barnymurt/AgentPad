# Framework: Information Architecture

This file provides detailed methodology for structuring content and designing navigation.

## 1. Complexity Scaling

### Simple Products (<20 pages)

**Characteristics:**
- Single product/service
- Limited content types
- Single audience
- Clear primary task

**IA Approach:**
- Flat hierarchy (2 levels max)
- Simple navigation
- Minimal categories
- Search optional

### Medium Products (20-100 pages)

**Characteristics:**
- Multiple features/sections
- Multiple content types
- Multiple audiences
- Various user tasks

**IA Approach:**
- 3-4 level hierarchy
- Section-based navigation
- Local navigation within sections
- Search important

### Complex Products (100+ pages)

**Characteristics:**
- Multi-product/suite
- Extensive content
- Multiple user types
- Enterprise features

**IA Approach:**
- 4-5+ level hierarchy
- Mega-menu or faceted navigation
- Multiple navigation systems
- Search-first design

---

## 2. Navigation Patterns

### Global Navigation

| Pattern | Description | Best For |
|---------|-------------|----------|
| **Horizontal** | Top header links | Simple-medium sites |
| **Vertical** | Left sidebar | Apps, complex sites |
| **Mega-menu** | Dropdown with sections | E-commerce, large sites |

### Local Navigation

| Pattern | Description | Best For |
|---------|-------------|----------|
| **Breadcrumbs** | Path to current page | Deep hierarchies |
| **Sidebar** | Section-specific links | Documentation, apps |
| **Tabs** | Switch between views | Related content |

### Utility Navigation

- Search
- User account
- Settings
- Help
- Cart/notifications

---

## 3. Card Sorting Methodology

### Open Card Sorting

1. **Prepare cards** — Each piece of content on a card
2. **Invite users** — 5-8 users minimum
3. **Ask them to group** — No categories provided
4. **Ask for labels** — Users name each group
5. **Analyze** — Find common groupings

### Closed Card Sorting

1. **Provide categories** — Pre-defined sections
2. **Ask users to sort** — Place cards in categories
3. **Analyze** — See where users agree/disagree

### Analysis

- Look for consensus groupings
- Note unexpected groupings
- Identify outliers
- Resolve conflicts with user data

---

## 4. Labeling Standards

### Good Labels

- Familiar words (user vocabulary)
- Concise (1-2 words)
- Parallel structure
- Action-oriented when appropriate
- Noun-oriented for content

### Label Testing

- Do users understand?
- Do labels match mental models?
- Are labels consistent?
- Is terminology clear?

### Common Mistakes

| Bad | Good |
|-----|------|
| "Solutions" | "Products" or "Services" |
| "Our Expertise" | "How It Works" |
| "Resources & Insights" | "Blog" or "Help" |
| Internal jargon | User terminology |

---

## 5. Search Design

### Search Components

| Component | Purpose |
|-----------|---------|
| Search field | Input query |
| Autocomplete | Suggest queries |
| Filters | Narrow results |
| Sort | Order results |
| Highlights | Show matches |
| No results | Handle empty state |

### Search vs. Browse

**When to emphasize search:**
- Users know what they want
- Large content library
- Power users
- Specific queries

**When to emphasize browse:**
- Discovery
- Unknown content
- Casual users
- Visual products

---

## 6. Multi-Platform IA

### Web (Information)

- Deep hierarchies OK
- Breadcrumbs important
- Global nav primary
- Search secondary

### App (Task-oriented)

- Flat hierarchy preferred
- Tab-based navigation
- Contextual nav important
- Search prominent

### API (Developer)

- No navigation
- Endpoint grouping
- Version consideration
- Search primary

---

## 7. Validation Methods

### Tree Testing

**Process:**
1. Create text-only version of IA
2. Give users tasks ("Find pricing")
3. Measure: success rate, time, errors
4. Identify problem areas

**Metrics:**
- Success rate: >80% is good
- Time to complete
- Direct vs. indirect paths

### Click Testing

**Process:**
1. Show users current IA
2. Ask where they would click
3. Measure clicks to goal

### Heuristics

1. **Consistency** — Same patterns throughout
2. **Visibility** — Options are visible
3. **Feedback** — Clear where user is
4. **Match** — Matches user mental model

---

## 8. Integration with Other Skills

### Inputs (Consults)

- **user-journey-mapping:** User tasks and flows
- **requirements-elicitation:** Content requirements
- **user-persona-creation:** User needs by segment

### Outputs (Feeds)

- **wireframing:** Navigation implementation
- **frontend-development:** Structure implementation
- **content-strategy:** Content creation priorities
