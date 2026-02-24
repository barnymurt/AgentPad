#!/usr/bin/env python3
"""
Validation Pack Execution
Generates a comprehensive validation deliverable relevant to the user's idea.
"""

import sys
import json
from datetime import datetime

def analyze_idea(user_input: str) -> dict:
    """Analyze the user's idea to extract key themes and generate relevant content"""
    input_lower = user_input.lower()
    
    keywords = {
        'target': [],
        'product_type': [],
        'industry': [],
    }
    
    if 'adhd' in input_lower or 'autism' in input_lower or 'neuro' in input_lower:
        keywords['target'].append('neurodivergent adults')
    if 'child' in input_lower or 'kid' in input_lower or 'teen' in input_lower:
        keywords['target'].append('children/teens')
    if 'senior' in input_lower or 'elder' in input_lower:
        keywords['target'].append('seniors')
    if 'business' in input_lower or 'b2b' in input_lower:
        keywords['target'].append('businesses')
    if 'student' in input_lower:
        keywords['target'].append('students')
    
    if 'website' in input_lower or 'web' in input_lower:
        keywords['product_type'].append('website')
    if 'app' in input_lower or 'mobile' in input_lower:
        keywords['product_type'].append('mobile app')
    if 'saas' in input_lower:
        keywords['product_type'].append('SaaS platform')
    if 'tool' in input_lower:
        keywords['product_type'].append('tool')
    
    if 'fitness' in input_lower or 'gym' in input_lower or 'health' in input_lower:
        keywords['industry'].append('health & fitness')
    if 'education' in input_lower or 'learn' in input_lower:
        keywords['industry'].append('education')
    if 'finance' in input_lower or 'financial' in input_lower:
        keywords['industry'].append('fintech')
    if 'food' in input_lower or 'restaurant' in input_lower:
        keywords['industry'].append('food & dining')
    if 'shopping' in input_lower or 'e-commerce' in input_lower or 'store' in input_lower:
        keywords['industry'].append('e-commerce')
    if 'adhd' in input_lower or 'mental' in input_lower or 'wellness' in input_lower:
        keywords['industry'].append('mental health/wellness')
        
    if not keywords['target']:
        keywords['target'].append('general consumers')
    if not keywords['product_type']:
        keywords['product_type'].append('product')
    if not keywords['industry']:
        keywords['industry'].append('various industries')
    
    return keywords


def generate_validation_pack(user_input: str) -> dict:
    timestamp = datetime.now().strftime("%B %d, %Y")
    keywords = analyze_idea(user_input)
    target = keywords['target'][0] if keywords['target'] else 'your target users'
    industry = keywords['industry'][0] if keywords['industry'] else 'your industry'
    product = keywords['product_type'][0] if keywords['product_type'] else 'solution'
    
    # Generate relevant content based on keywords
    preview = f"""# Validation Pack: {user_input.title()}

**Generated**: {timestamp}

---

## Your Idea
{user_input}

---

## At a Glance

| | |
|---|---|
| **Target Audience** | {target.title()} |
| **Industry** | {industry.title()} |
| **Product Type** | {product.title()} |

---

## What's Inside

### 1. Requirements
Your problem statement and assumptions

### 2. User Persona
Who exactly is your customer?

### 3. Competition
Market gaps and opportunities

### 4. Business Case
Market size and revenue potential

### 5. Risk Analysis
What could go wrong

### 6. Feature Priority
What to build first (MVP)

### 7. User Journey
How users will find and use your product

---

## Your Next Steps

1. **Talk to 5 real people** in your target market
2. **Build a simple landing page** to test interest  
3. **Get pre-payments or waitlist signups**
4. **Research competitors**

---

*Enter your email to download the full detailed report with templates and frameworks*
"""
    
    full = f"""# VALIDATION PACK: {user_input.title()}

Generated: {timestamp}

---

# 1. Requirements

## Your Idea
{user_input}

## Problem Statement
[Define the core problem your idea solves]

## For Who?
{target.title()}

## Key Assumptions
- This problem is painful enough to pay for
- Your solution actually solves it
- {target.title()} will adopt new technology

## MVP Features
1. Core solution to main problem
2. Basic user accounts
3. Essential functionality only

---

# 2. User Persona

## Primary User: {target.title()}

### Demographics
- Age range: [Your research]
- Tech comfort: [Your research]

### Goals
- [Goal 1 - what they want]
- [Goal 2 - what they want]

### Pain Points
- [Pain 1 - current frustration]
- [Pain 2 - current frustration]

### Where They Hang Out
- [Online communities, forums, social media]

### Quote
> "I wish there was a way to..."

---

# 3. Competition

## Direct Competitors
| Company | What They Do | Weakness | Price |
|---------|--------------|----------|-------|
| [Name] | | | |

## Your Unique Position
[What gap does your idea fill?]

---

# 4. Business Case

## Market Opportunity
- TAM: $[Your estimate]
- SAM: $[Your estimate]
- SOM: $[Your estimate - Year 1]

## Revenue Model
- Monthly subscription: $[X]/mo
- Target: {target}

## Key Metrics
- CAC: $[Your estimate]
- LTV: $[Your estimate]
- Target: 3:1 LTV:CAC

---

# 5. Risk Analysis

## Top Risks
1. **Problem isn't real** - Validate with user interviews
2. **Can't reach customers** - Test acquisition channels
3. **Competition** - Define your moat

## Kill Condition
[What evidence would make you pivot or stop?]

---

# 6. Feature Priority

## MVP (Build First)
1. [Core feature]
2. [Core feature]
3. [Core feature]

## Phase 2
- [Feature]
- [Feature]

## Not Yet
- [Complex feature]
- [Advanced feature]

---

# 7. User Journey

## Stage 1: Awareness
- Trigger: [What makes them realize they have a problem?]
- Action: [Where do they look?]

## Stage 2: Consideration  
- Trigger: [Found your solution]
- Action: [What do they evaluate?]

## Stage 3: Decision
- Trigger: [Ready to buy]
- Action: [What convinces them?]

## Stage 4: Onboarding
- First value moment: [When do they get ROI?]

## Stage 5: Retention
- What keeps them: [Ongoing value]

---

# ACTION ITEMS

- [ ] Interview 5 {target}
- [ ] Build landing page
- [ ] Test with $100 in ads
- [ ] Get 10 pre-sales or waitlist
- [ ] Define MVP features
- [ ] Deep competitor research
"""

    return {
        'success': True,
        'output': full,
        'preview': preview,
        'skillId': 'validation-pack',
        'skillName': 'Validation Pack',
        'userInput': user_input,
    }


def execute_skill(skill_id: str, user_input: str) -> dict:
    if skill_id == 'validation-pack':
        return generate_validation_pack(user_input)
    return {
        'success': True,
        'output': f"# {skill_id}\n\nInput: {user_input}",
        'skillId': skill_id,
    }


def main():
    if len(sys.argv) < 3:
        print(json.dumps({'success': False, 'error': 'Usage: run_skill.py <skill_id> <user_input>'}))
        sys.exit(1)
    
    result = execute_skill(sys.argv[1], sys.argv[2])
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
