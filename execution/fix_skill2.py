#!/usr/bin/env python3
import re

with open('run_skill.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all occurrences of the broken pattern and replace them
# Pattern: r'<think>.*? (newline) 
</think>
fixed_pattern = r"r'<think>.*?</think>"
broken_patterns = [
    r"r'<think>.*?\n\n<\/think>",
    r"r'<think>.*?\r\n<\/think>",
    r"r'<think>.*?\r<\/think>",
]

for broken in broken_patterns:
    content = content.replace(broken, fixed_pattern)

with open('run_skill.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
