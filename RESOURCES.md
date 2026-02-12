# Resources

Curated tools, frameworks, skills, and libraries for building with AgentPad. Reference this file when planning new features or workflows.

---

## Agent Skills & Frameworks

### Superpowers — obra/superpowers
- **URL:** https://github.com/obra/superpowers
- **Stars:** 50k+ | **License:** MIT
- **What it is:** Complete agentic software development workflow built on composable skills. Enforces brainstorming → planning → TDD → subagent-driven development → code review → branch cleanup.
- **Key skills:** brainstorming, writing-plans, executing-plans, subagent-driven-development, test-driven-development, systematic-debugging, using-git-worktrees, dispatching-parallel-agents
- **When to use:** Structuring any multi-step dev workflow. Borrow skill patterns for AgentPad directives. Reference their TDD and plan-then-execute methodology.
- **Notes:** Already heavily influenced AgentPad's brainstorming and git-worktree skills. Good source for new skill ideas.

### Vercel Agent Skills — vercel-labs/agent-skills
- **URL:** https://github.com/vercel-labs/agent-skills
- **Stars:** 20k+ | **License:** MIT
- **What it is:** Vercel's official collection of agent skills. Includes React/Next.js best practices (40+ rules across 8 categories), web design guidelines (100+ rules), React Native guidelines, composition patterns, and a deploy-to-Vercel skill.
- **Key skills:**
  - `react-best-practices` — Performance optimization: eliminating waterfalls, bundle size, server-side perf, re-render optimization
  - `web-design-guidelines` — Accessibility, focus states, forms, animation, typography, images, performance, dark mode, i18n
  - `react-native-guidelines` — Mobile performance, layout, animation, images, state management
  - `composition-patterns` — Compound components, state lifting, avoiding prop drilling
  - `vercel-deploy-claimable` — Auto-detect framework and deploy from conversations
- **When to use:** Building any React/Next.js frontend. Use as reference rules when creating web app skills or reviewing UI code.

### Claude Code Plugins — wshobson/agents
- **URL:** https://github.com/wshobson/agents
- **Stars:** 28k+ | **License:** MIT
- **What it is:** 73 plugins, 112 specialized agents, 146 skills, and 79 dev tools for Claude Code. Covers full-stack dev, security, infrastructure, AI/ML, data, payments, and more.
- **Key plugins:**
  - `security-scanning` — SAST, attack tree construction, STRIDE analysis, threat mitigation mapping
  - `python-development` — Async patterns, testing, packaging, UV package manager
  - `full-stack-orchestration` — Multi-agent coordination across 7+ agents
  - `conductor` — Context-driven development with track-based planning
  - `agent-teams` — Parallel multi-agent workflows (review, debug, feature, security)
- **When to use:** Reference for building AgentPad plugins/skills. Borrow security scanning patterns, multi-agent orchestration ideas, and plugin architecture design.

---

## Agent Orchestration & Teams

### Claude Code Agent Teams — Anthropic
- **URL:** https://code.claude.com/docs/en/agent-teams
- **What it is:** Experimental feature for orchestrating multiple Claude Code sessions as a coordinated team. One session acts as lead, spawning teammates that work independently with their own context windows, communicate via messaging, and coordinate through a shared task list.
- **Key concepts:**
  - Team lead + teammates architecture with shared task lists and inter-agent messaging
  - Split-pane or in-process display modes for monitoring parallel work
  - Plan approval gates: teammates must get lead approval before implementing
  - Delegate mode: restricts lead to coordination-only (no direct code changes)
  - Self-claiming tasks with dependency management and file locking
  - Quality enforcement via hooks (TeammateIdle, TaskCompleted)
- **Best use cases:** Parallel code review (security + performance + tests), competing hypothesis debugging, cross-layer coordination (frontend + backend + tests), research and exploration
- **When to use:** Reference architecture for AgentPad's agent team execution layer. Borrow the lead/teammate pattern, shared task lists, plan approval gates, and human-in-the-loop checkpoints.
- **Notes:** Experimental — requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` flag. Each teammate is a full independent session with its own context window. Token usage scales with team size.

---

## How to Use This File

1. **Planning new features** — Scan relevant resources for patterns and prior art before building
2. **Creating new skills** — Check if a resource already solves the problem or provides a template
3. **Adding new resources** — Append to the appropriate section with URL, description, key capabilities, and when to use
