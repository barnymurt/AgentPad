# AgentPad

A structured AI agent workflow system using a 3-layer architecture to separate concerns and maximize reliability.

## Architecture

This system uses a 3-layer architecture that separates probabilistic LLM decision-making from deterministic business logic:

### Layer 1: Directives (`directives/`)
- SOPs written in Markdown
- Define goals, inputs, tools/scripts, outputs, and edge cases
- Natural language instructions

### Layer 2: Orchestration (AI Agent)
- Intelligent routing and decision-making
- Reads directives and calls execution tools in the right order
- Handles errors and asks for clarification
- Updates directives with learnings

### Layer 3: Execution (`execution/`)
- Deterministic Python scripts
- Handles API calls, data processing, file operations
- Reliable, testable, fast

## Getting Started

1. Create directives in `directives/` for your workflows
2. Write execution scripts in `execution/` for deterministic tasks
3. Store environment variables and API keys in `.env`
4. Let the AI agent orchestrate the workflow

## File Organization

- `directives/` - Workflow SOPs and instructions
- `execution/` - Python scripts for deterministic tasks
- `skills/` - Reusable skill templates from Anthropic for implementing common tasks
- `.tmp/` - Temporary intermediate files (not committed)
- `.env` - Environment variables and API keys (not committed)

## Operating Principles

1. **Check for tools first** - Use existing scripts before creating new ones
2. **Self-anneal when things break** - Fix errors, update tools, update directives
3. **Update directives as you learn** - Keep instructions current with real-world constraints

See `AGENTS.md` for complete instructions.
