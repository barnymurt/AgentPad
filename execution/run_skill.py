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
    
    preview = f"""# Your Validation Pack

## "{user_input.title()}"

**Generated**: {timestamp}

---

## Scorecard

### Your Target: {target.title()}
### Industry: {industry.title()}
### Product Type: {product.title()}

---

## What This Validates

This pack helps you stress-test your idea and identify what to build first.

### 1. Requirements
What's the core problem you're solving? For who?

### 2. User Persona  
Who exactly is your customer? What do they need?

### 3. Competition
Who else serves this market? What's missing?

### 4. Business Case
Is there a viable business here? What's the opportunity?

### 5. Risk Analysis
What could go wrong? What are you assuming?

### 6. Feature Priority
What should you build FIRST? What's the MVP?

### 7. User Journey
How will users discover and use your product?

---

## Recommended Next Steps

1. **Talk to 5 real people** in your target market (not friends)
2. **Build a simple landing page** to test interest
3. **Get people to pre-pay** or join a waitlist
4. **Research competitors** deeply

---

## 💡 Pro Tip

The #1 mistake founders make: Building before validating with real customers.

---

Enter your email to download the full detailed report.
"""
    
    full = f"""# VALIDATION PACK: {user_input.title()}

Generated: {timestamp}

---

# 1. Requirements

## Your Idea
{user_input}

## Problem Statement
What problem does this solve? For whom?

## Key Assumptions
- {target.title()} has this problem
- Existing solutions are inadequate
- This solution is technically feasible

## MVP Scope
**Build first:**
- Core feature that solves the main problem
- Basic user accounts
- Essential functionality only

---

# 2. User Persona

## Primary User: {target.title()}

### Goals
- What do they want to achieve?

### Pain Points  
- What's frustrating them now?

### Behaviors
- Where do they spend time online?
- How do they make decisions?

### Quote
> "I wish there was a way to..."

---

# 3. Competition

## Direct Competitors
| Company | What They Do | Weakness | Price |
|---------|--------------|----------|-------|
| [Name] | | | |

## Indirect Alternatives
- What do people use now instead?
- DIY solutions?

## Your Edge
What gap in the market does your idea fill?

---

# 4. Business Case

## Market Sizing
- TAM: $[estimate]
- SAM: $[estimate]  
- SOM: $[estimate]

## Revenue Model
- Pricing: $[X]/month
- Target customers: {target}

## Unit Economics
- CAC: $[estimate]
- LTV: $[estimate]
- Target: 3:1 LTV:CAC

---

# 5. Risk Analysis

## Top Risks
1. **Risk 1**: [What could go wrong]
2. **Risk 2**: [What could go wrong]
3. **Risk 3**: [What could go wrong]

## Kill Condition
What would make you abandon this idea?

---

# 6. Feature Priority

## Must-Have (MVP)
1. Feature A
2. Feature B
3. Feature C

## Nice-to-Have
- Feature D
- Feature E

## Don't Build Yet
- Feature F
- Feature G

---

# 7. User Journey

## Stage 1: Awareness
How do users discover they have a problem?

## Stage 2: Consideration
How do they evaluate options?

## Stage 3: Decision
What triggers purchase?

## Stage 4: Onboarding
How do they get value?

## Stage 5: Retention
What keeps them using it?

---

# Your Action Items

- [ ] Interview 5 target users
- [ ] Build landing page
- [ ] Test with ads ($100)
- [ ] Get 10 pre-sales
- [ ] Define MVP features
- [ ] Research competitors
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
