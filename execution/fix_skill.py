#!/usr/bin/env python3
import re

with open('run_skill.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix corrupted re.sub line
old_pattern = r"r'<think>.*?\n</think>', '', result, flags=re.DOTALL)"
new_pattern = r"r'<think>.*?</think>', '', result, flags=re.DOTALL)"

content = content.replace(old_pattern, new_pattern)

with open('run_skill.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
