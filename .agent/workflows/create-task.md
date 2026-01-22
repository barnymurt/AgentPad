---
description: Create a new task following the 3-layer architecture
---

To create a new task using the AgentPad 3-layer architecture:

1. **Step 1: Create the Directive**
   - Create a new file in `directives/[task_name].md`
   - Use the format:
     - Goal: What needs to be achieved
     - Inputs: What data is required
     - Tools: Which scripts in `execution/` to use
     - Outputs: Expected deliverables

2. **Step 2: Prepare Execution Scripts**
   - Check `execution/` for existing deterministic tools
   - Create new Python scripts if needed for specific logic (API calls, file parsing, etc.)

3. **Step 3: Execution**
   - Run the task based on the directive
   - Store intermediate results in `.tmp/`

4. **Step 4: Self-Anneal**
   - If the task fails, update the script or directive based on the error
   - Rerun until successful
