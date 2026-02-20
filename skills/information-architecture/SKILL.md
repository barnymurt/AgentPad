---
name: information-architecture
description: Structure content and navigation for optimal user experience. Use when the user needs to organize information, create a site map, design navigation, or organize content for a website, app, or product. Use when the user says "organize our content," "create a site map," "design navigation," "what pages do we need," "how should we structure this," or "improve how users find things." Works for websites, web apps, mobile apps, and documentation.
---

# Information Architecture

Structure content and navigation for optimal user experience. Unlike raw LLM output that produces generic site maps, this skill applies structured IA methodology to create intuitive information structures, design clear navigation hierarchies, and ensure users can find what they need. The skill adapts complexity based on product scope and includes validation methods.

**Note**: This skill scales based on product complexity. See Step 1.

## Core Workflow

### Step 1: Assess Complexity and Scope

**Complexity Assessment:**

Before creating IA, determine appropriate depth:

| Complexity | Indicators | IA Depth |
|------------|------------|----------|
| **Simple** | <20 pages, focused product | 2-3 levels |
| **Medium** | 20-100 pages, multiple features | 3-4 levels |
| **Complex** | 100+ pages, multi-product | 4-5+ levels |

**Assessment Questions:**
- How many distinct content types?
- How many user tasks/goals?
- How many audiences?
- Is this for web, app, or both?

**Adjust approach based on complexity:**
- Simple: Focus on clarity, minimal hierarchy
- Medium: Add sections and categories
- Complex: Consider multiple navigation systems, mega-menus, search-first

### Step 2: Analyze Content and Users

**Content Inventory:**
1. List all content types (pages, features, data)
2. Group by type (static, dynamic, transactional)
3. Identify content owners

**User Task Analysis:**
1. What are users trying to accomplish?
2. What questions are they trying to answer?
3. What information do they need at each step?

**Persona Context:**
- What does each persona need most?
- How do they search vs. browse?
- What's their technical comfort level?

### Step 3: Card Sorting (or Simulate)

**If users available:**
- Conduct open card sorting (users group content)
- Identify mental models
- Validate groupings

**If no users available (simulate):**
- Use common patterns from similar products
- Apply standard conventions
- Make assumptions explicit
- Note "needs validation with users"

**Card Sorting Analysis:**
- Identify natural groupings
- Note unexpected groupings
- Resolve conflicts between groups

### Step 4: Create Site Map

**Hierarchy Design:**

Level 1: Global navigation (main sections)
```
- Home
- [Product/Service]
- Resources
- Company
- Support
```

Level 2: Section pages
```
- [Product]
  - Features
  - Pricing
  - Integrations
  - Case Studies
```

Level 3+: Detail pages

**Site Map Principles:**
- Maximum 3 clicks to any page
- Similar items at same level
- Logical grouping
- Clear labels

### Step 5: Define Navigation System

**Navigation Types:**

| Type | Use For | Example |
|------|---------|---------|
| **Global** | Main sections | Header navigation |
| **Local** | Within section | Sidebar, sub-nav |
| **Utility** | Actions, tools | Header links, CTAs |
| **Contextual** | Related content | In-page links |
| **Search** | Finding specific | Site search |

**Label Standards:**
- Use familiar words (not internal jargon)
- Keep labels concise (1-2 words)
- Parallel structure (all verbs or all nouns)
- Test labels with users

### Step 6: Design Search Strategy

**Browse vs. Search:**

| When to Browse | When to Search |
|---------------|----------------|
| Exploring options | Known item |
| Unclear what exists | Specific query |
| Low commitment | High commitment |
| Discovery mode | Goal-oriented |

**Search Integration:**
- Prominent search field
- Search suggestions/autocomplete
- Filter results by category
- No results handling

### Step 7: Validate IA

**Validation Methods:**

1. **Tree Testing:**
   - Give users tasks ("Find pricing")
   - Measure success rate
   - Identify confusion points

2. **Card Sorting:**
   - Users group content
   - Compare to proposed IA

3. **Click Testing:**
   - Users click to navigate
   - Measure errors

**If no user testing available:**
- Heuristic evaluation
- Competitive analysis
- Expert review

**Note validation status:**
- "This IA is based on [assumptions/needs user testing]"

### Step 8: Document and Maintain

**IA Documentation:**

1. Site map (visual or list)
2. Navigation definitions
3. Label glossary
4. Content inventory
5. Decisions and rationale

**Maintenance:**
- Note when IA needs updating
- Track content changes
- Plan for growth

## Output Format

The output follows the structure defined in [references/output-schema.md](references/output-schema.md):

- **Site Map** — Visual hierarchy
- **Navigation System** — Global, local, utility navigation
- **Content Groups** — Organized by user task
- **Search Strategy** — Browse vs. search approach
- **Labels** — Glossary of navigation labels
- **Validation** — Testing results or notes

Expected length: 1,000-2,500 words

## Quality Criteria

- [ ] Complexity assessed and IA depth adjusted accordingly
- [ ] Content inventory completed (or minimum content types identified)
- [ ] User tasks analyzed
- [ ] Site map has clear hierarchy (max 3 levels recommended)
- [ ] Navigation system defined (global, local, utility)
- [ ] Labels are user-friendly (not jargon)
- [ ] Search strategy addressed (when to browse vs. search)
- [ ] Multi-platform considerations noted (web/app/API)
- [ ] Validation method included (or notes need for testing)
- [ ] Documentation is maintainable

## References

- **Detailed methodology:** [references/framework.md](references/framework.md)
- **Output structure contract:** [references/output-schema.md](references/output-schema.md)
- **Worked example (SaaS app):** [references/worked-example.md](references/worked-example.md)

## Common Mistakes

1. **Over-engineering:** Creating complex IA for simple products. Match depth to complexity. A 5-page site doesn't need 4 levels of hierarchy.

2. **Ignoring mental models:** Creating IA based on internal structure rather than how users think. Always consider user mental models.

3. **No validation:** Presenting IA as final without testing. IA is a hypothesis until validated with users.

4. **Inconsistent labels:** Using different terminology for the same thing. Maintain label glossary and consistency.

5. **Forgetting search:** Focusing only on navigation. Products with lots of content need search-first design.

6. **One-size-fits-all:** Using same IA for web/app/API. Different platforms have different patterns.

7. **Deep hierarchies:** Going too many levels deep. Users prefer breadth over depth. Maximum 3 clicks to any content.

8. **Assuming users know:** Using internal jargon. Labels should match user vocabulary, not company terminology.
