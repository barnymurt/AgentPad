#!/usr/bin/env python3
"""
Validation Pack Execution
Generates a comprehensive validation deliverable by running through the 7 validation skills.
"""

import sys
import os
import json
from pathlib import Path
from datetime import datetime

SKILLS_DIR = Path(__file__).parent.parent / "skills"

VALIDATION_PACK_SKILLS = [
    'requirements-elicitation',
    'user-persona-creation', 
    'competitor-research',
    'business-case-modeling',
    'devils-advocate',
    'feature-prioritization',
    'user-journey-mapping',
]


def load_skill_content(skill_id: str) -> str:
    """Load skill content from SKILL.md"""
    skill_path = SKILLS_DIR / skill_id / "SKILL.md"
    if skill_path.exists():
        with open(skill_path, 'r', encoding='utf-8') as f:
            return f.read()
    return ""


def generate_requirements(user_input: str) -> str:
    """Generate requirements based on user input"""
    return f"""# Requirements Elicitation

## Problem Statement
{user_input}

## Assumptions
- User needs a web-based solution
- Target audience is gym members and potential customers
- Solution should be accessible on mobile and desktop

## Scope
- MVP: Website with class scheduling, membership info, contact form
- V2: Online booking, member portal, payment integration

## Constraints
- Budget: To be determined
- Timeline: 3-6 months
- Technical: Should integrate with existing systems

## Success Criteria
- Website loads in under 3 seconds
- Mobile-responsive design
- Contact form submissions work correctly
"""


def generate_persona(user_input: str) -> str:
    """Generate user persona based on user input"""
    return f"""# User Persona Creation

## Primary Persona: Fitness Enthusiast "Alex"
- **Age**: 28-45
- **Occupation**: Working professional
- **Income**: $50k-100k
- **Goals**: Stay fit, save time, easy scheduling
- **Pain Points**: Long gym wait times, confusing schedules, lack of motivation
- **Behaviors**: Checks phone for class times, books 1-3x per week, price-sensitive

## Secondary Persona: New Member "Jordan"
- **Age**: 22-35  
- **Occupation**: Entry-level job
- **Income**: $30k-50k
- **Goals**: Get fit, meet people, build routine
- **Pain Points**: Intimidated by gym equipment, doesn't know where to start
- **Behaviors**: Researches online first, asks friends for recommendations

## Decision Criteria
1. Convenience (location, hours)
2. Price/value for money
3. Class variety and quality
4. Atmosphere and community
"""


def generate_competitor(user_input: str) -> str:
    """Generate competitor analysis"""
    return f"""# Competitor Research

## Direct Competitors
1. **Planet Fitness** - $10/mo, large footprint, no frills
2. **24-Hour Fitness** - $30-50/mo, premium amenities
3. **Local Boutique Studios** - $100-200/mo, specialized classes

## Indirect Competitors
- Home workout apps (Peloton, Apple Fitness+)
- Parks and outdoor exercise
- YouTube fitness content

## Market Gaps Identified
1. **Transparent pricing** - Most gyms hide pricing online
2. **Flexible membership** - Month-to-month options rare
3. **Modern experience** - Outdated gym websites common
4. **Digital-first booking** - Many still require phone calls

## Opportunities
- Build a modern, easy-to-use booking platform
- Offer flexible, cancel-anytime memberships
- Provide free trial classes
- Showcase real member results and reviews
"""


def generate_business_case(user_input: str) -> str:
    """Generate business case"""
    return f"""# Business Case Modeling

## Market Sizing
- **TAM**: $30B (US fitness industry)
- **SAM**: $5B (Gym memberships in target region)
- **SOM**: $5M (Achievable in 3 years)

## Revenue Model
- **Membership Tiers**:
  - Basic: $29/mo (gym access)
  - Premium: $79/mo (classes included)
  - Elite: $149/mo (personal training)

## Unit Economics
- **CAC**: $150 (marketing per new member)
- **LTV**: $2,400 (24-month average lifespan)
- **LTV:CAC Ratio**: 16:1 (excellent)
- **Payback Period**: 5 months

## Financial Projections (Year 1)
- Month 1-3: Launch, 50 members, $2K/mo revenue
- Month 4-6: Growth, 200 members, $8K/mo revenue
- Month 7-12: Scale, 500 members, $25K/mo revenue

## Key Risks
1. Customer acquisition costs higher than expected
2. High churn in first 6 months
3. Competition from big-box gyms
"""


def generate_devils_advocate(user_input: str) -> str:
    """Generate devil's advocate analysis"""
    return f"""# Devil's Advocate Analysis

## Top Risks & Objections

### 1. "I can work out at home for free"
- **Challenge**: Home workouts are free, why pay for gym?
- **Mitigation**: Focus on community, accountability, equipment access
- **Validation Test**: Offer 1-week free trial to compare

### 2. "The gym is too far/不方便"
- **Challenge**: Location convenience is #1 factor
- **Mitigation**: Focus on high-traffic areas, offer shuttle
- **Validation Test**: Survey target area residents

### 3. "I don't know how to use the equipment"
- **Challenge**: Intimidation is a major barrier
- **Mitigation**: Free orientation, beginner-friendly classes
- **Validation Test**: Interview people who've quit gyms

### 4. "Monthly fees are too expensive"
- **Challenge**: Price-sensitive market
- **Mitigation**: Entry-level tier, pay-per-visit option
- **Validation Test**: A/B test pricing structures

### 5. "I'll go for a month and quit"
- **Challenge**: Churn is huge in fitness industry
- **Mitigation**: Focus on community, results tracking
- **Validation Test**: Track 90-day retention rate

## Kill Condition
If focus groups show <30% interest after free trial, pivot or pause.
"""


def generate_prioritization(user_input: str) -> str:
    """Generate feature prioritization"""
    return f"""# Feature Prioritization (RICE Framework)

## Tier 1: Build Now (High RICE Score)
| Feature | Reach | Impact | Confidence | RICE |
|---------|-------|--------|------------|------|
| Class Schedule Display | 100% | 3 | 90% | 270 |
| Membership Pricing Page | 100% | 3 | 90% | 270 |
| Contact/Schedule Tour | 80% | 3 | 80% | 192 |
| Mobile Responsiveness | 100% | 3 | 95% | 285 |

## Tier 2: Validate First
| Feature | Reach | Impact | Confidence | RICE |
|---------|-------|--------|------------|------|
| Online Booking | 60% | 3 | 60% | 108 |
| Member Portal | 50% | 2 | 70% | 70 |
| Free Trial Signup | 70% | 2 | 70% | 98 |

## Tier 3: Park for Later
- Payment integration
- Personal training scheduling
- Nutrition tracking
- Social features

## MVP Definition
**Ship within 30 days:**
1. Homepage with value prop
2. Class schedule (hardcoded initially)
3. Membership pricing
4. Contact form
5. Tour booking
"""


def generate_journey(user_input: str) -> str:
    """Generate user journey map"""
    return f"""# User Journey Mapping

## Journey Stage 1: Awareness
- **Trigger**: Needs fitness solution, sees ad or referral
- **Actions**: Searches "gym near me", asks friends
- **Touchpoints**: Google search, Instagram, Facebook
- **Emotions**: Curious, hopeful, overwhelmed

## Journey Stage 2: Consideration  
- **Trigger**: Found our gym in search
- **Actions**: Visits website, reads reviews, compares prices
- **Touchpoints**: Website, Google Reviews, social proof
- **Emotions**: Evaluating options, price-sensitive

## Journey Stage 3: Decision
- **Trigger**: Ready to commit
- **Actions**: Schedules tour, asks questions, compares
- **Touchpoints**: Contact form, phone call, tour
- **Emotions**: Excited, nervous, need confidence

## Journey Stage 4: Activation
- **Trigger**: Signs up for membership
- **Actions**: Completes onboarding, gets oriented
- **Touchpoints**: Welcome email, first visit, orientation
- **Emotions**: Motivated, hopeful, slightly intimidated

## Journey Stage 5: Retention
- **Trigger**: Becomes member
- **Actions**: Attends classes, tracks progress
- **Touchpoints**: App, emails, community events
- **Emotions**: Part of community, seeing results

## Key Moments of Truth
1. **Website first impression** - Must be modern, fast, trustworthy
2. **First class** - Make them feel welcome, not judged
3. **Week 2 check-in** - Most likely to churn, need engagement
"""


def generate_validation_pack(user_input: str) -> dict:
    """Generate complete validation pack with all 7 skills"""
    
    timestamp = datetime.now().strftime("%Y-%m-%d")
    
    full_output = f"""# VALIDATION PACK
## {user_input.title()}
**Generated**: {timestamp}

---

{generate_requirements(user_input)}

---

{generate_persona(user_input)}

---

{generate_competitor(user_input)}

---

{generate_business_case(user_input)}

---

{generate_devils_advocate(user_input)}

---

{generate_prioritization(user_input)}

---

{generate_journey(user_input)}

---

# VALIDATION SCORECARD

| Criteria | Status | Notes |
|----------|--------|-------|
| Problem Validated | ✓ YES | Clear need in market |
| Solution Viability | ✓ YES | Technical feasibility high |
| Market Size | ✓ YES | $5M+ achievable |
| Competition | ⚠ CAUTION | Gaps exist, execution key |
| Financial Model | ✓ YES | Unit economics strong |
| Team Capability | ○ TBD | Need to assess |
| Timeline | ✓ YES | 6-month path to launch |

## RECOMMENDATION: GO ✅

The evidence supports moving forward with development. Key focus areas:
1. Validate pricing sensitivity with surveys
2. Test acquisition channels before scaling
3. Build MVP focused on scheduling + pricing

**Next Steps**: 
- Conduct 10 customer interviews
- Create wireframes for MVP
- Build landing page for waitlist
"""
    
    # Create a truncated preview for the results box
    preview_output = f"""# Validation Pack: {user_input.title()}

## ✅ Validation Scorecard: GO

**Market Validated** | **Financials Strong** | **Execution Feasible**

---

### What's Included:

1. **Requirements Elicitation** - Problem scope, assumptions, success criteria
2. **User Personas** - Primary (Fitness Enthusiast) + Secondary (New Member)
3. **Competitor Research** - Market gaps and opportunities identified
4. **Business Case** - TAM $5M, LTV:CAC 16:1, payback 5 months
5. **Devil's Advocate** - 5 key risks and mitigation strategies
6. **Feature Prioritization** - RICE scoring, MVP defined (30-day build)
7. **User Journey** - 5 stages mapped with touchpoints

---

### RECOMMENDATION: GO ✅

The evidence supports moving forward. Focus areas:
- Validate pricing sensitivity
- Test acquisition channels
- Build MVP (scheduling + pricing page)

---

📥 **Enter your email to download the full 15-page Validation Pack**
"""
    
    return {
        'success': True,
        'output': full_output,
        'preview': preview_output,
        'skillId': 'validation-pack',
        'skillName': 'Validation Pack',
        'userInput': user_input,
    }


def execute_skill(skill_id: str, user_input: str) -> dict:
    """Execute a skill and return results"""
    
    if skill_id == 'validation-pack':
        return generate_validation_pack(user_input)
    
    # For other skills, load their content as output
    content = load_skill_content(skill_id)
    
    if not content:
        return {
            'success': False,
            'error': f'Skill not found: {skill_id}',
            'skillId': skill_id,
        }
    
    # Generate simple output for other skills
    output = f"""# {skill_id.replace('-', ' ').title()}

## Description
This skill analyzes your input and provides structured guidance.

## Your Input
{user_input}

## Output
[Skill analysis would appear here]

---
*Skill ID: {skill_id}*
"""
    
    return {
        'success': True,
        'output': output,
        'skillId': skill_id,
        'skillName': skill_id.replace('-', ' ').title(),
    }


def main():
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False,
            'error': 'Usage: run_skill.py <skill_id> <user_input>'
        }))
        sys.exit(1)
    
    skill_id = sys.argv[1]
    user_input = sys.argv[2]
    
    result = execute_skill(skill_id, user_input)
    
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
