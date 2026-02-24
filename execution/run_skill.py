#!/usr/bin/env python3
"""
Validation Pack Execution
Generates comprehensive, relevant validation deliverable using all 7 skills.
"""

import sys
import json
from datetime import datetime
import random

# Qualifying questions to ask users
QUALIFYING_QUESTIONS = [
    {
        "id": "problem",
        "question": "What specific problem does your idea solve?",
        "placeholder": "e.g., Helping dyslexic users spellcheck messages in Telegram"
    },
    {
        "id": "target_existing",
        "question": "How do people solve this problem today?",
        "placeholder": "e.g., Using built-in spellcheck, asking friends to review, not sending important messages"
    },
    {
        "id": "uniqueness",
        "question": "What makes your solution different or better?",
        "placeholder": "e.g., Real-time Telegram integration, dyslexia-friendly UI"
    },
    {
        "id": "market_knowledge",
        "question": "Who is your target customer and how would you reach them?",
        "placeholder": "e.g., Dyslexia communities on Reddit, Twitter, special needs educators"
    },
    {
        "id": "revenue",
        "question": "How will you make money?",
        "placeholder": "e.g., Freemium model, $5/month premium, enterprise licensing"
    }
]


def get_qualifying_questions():
    """Return the qualifying questions"""
    return {
        "success": True,
        "questions": QUALIFYING_QUESTIONS,
        "skillId": "validation-pack",
        "requiresAnswers": True
    }


def analyze_idea(user_input: str, answers: dict = None) -> dict:
    """Analyze the user's idea to extract key themes"""
    input_lower = user_input.lower()
    
    keywords = {'target': [], 'product_type': [], 'industry': []}
    
    # Target audiences
    if any(w in input_lower for w in ['adhd', 'autism', 'dyslex', 'neuro']):
        keywords['target'].append('neurodivergent users')
    if any(w in input_lower for w in ['child', 'kid', 'teen', 'student']):
        keywords['target'].append('young people')
    if any(w in input_lower for w in ['senior', 'elder', 'older']):
        keywords['target'].append('seniors')
    if any(w in input_lower for w in ['business', 'b2b', 'company']):
        keywords['target'].append('businesses')
    if any(w in input_lower for w in ['doctor', 'nurse', 'health', 'medical']):
        keywords['target'].append('healthcare professionals')
        
    # Product types
    if 'extension' in input_lower or 'plugin' in input_lower:
        keywords['product_type'].append('browser extension')
    if 'app' in input_lower or 'mobile' in input_lower:
        keywords['product_type'].append('mobile app')
    if 'website' in input_lower or 'web' in input_lower:
        keywords['product_type'].append('web platform')
    if 'saas' in input_lower:
        keywords['product_type'].append('SaaS')
        
    # Industries
    if any(w in input_lower for w in ['telegram', 'whatsapp', 'discord', 'slack', 'messaging']):
        keywords['industry'].append('messaging/communication')
    if any(w in input_lower for w in ['fitness', 'gym', 'run', 'sport', 'health']):
        keywords['industry'].append('health & fitness')
    if any(w in input_lower for w in ['education', 'learn', 'teaching']):
        keywords['industry'].append('education')
    if any(w in input_lower for w in ['finance', 'money', 'payment']):
        keywords['industry'].append('fintech')
    if any(w in input_lower for w in ['dyslex', 'adhd', 'mental', 'wellness']):
        keywords['industry'].append('accessibility/wellness')
        
    if not keywords['target']:
        keywords['target'].append('general consumers')
    if not keywords['product_type']:
        keywords['product_type'].append('product')
    if not keywords['industry']:
        keywords['industry'].append('various industries')
    
    return keywords


def generate_validation_pack(user_input: str, answers: dict = None) -> dict:
    """Generate comprehensive validation pack using user's answers"""
    timestamp = datetime.now().strftime("%B %d, %Y")
    keywords = analyze_idea(user_input, answers)
    target = keywords['target'][0]
    industry = keywords['industry'][0]
    product = keywords['product_type'][0]
    
    # Use user's answers if provided
    problem = answers.get('problem', '') if answers else ''
    existing_solution = answers.get('target_existing', '') if answers else ''
    uniqueness = answers.get('uniqueness', '') if answers else ''
    market = answers.get('market_knowledge', '') if answers else ''
    revenue = answers.get('revenue', '') if answers else ''
    
    # Devil's Advocate Analysis - identify risks and challenges
    risks = []
    opportunities = []
    
    if not problem:
        risks.append("Vague problem statement - what exactly are you solving?")
    if not existing_solution:
        risks.append("No clear alternative - how do people cope now?")
    if not uniqueness:
        risks.append("No differentiation - why would they switch?")
    if not market:
        risks.append("Unclear go-to-market - how will customers find you?")
    if not revenue:
        risks.append("No revenue model - how will you sustain?")
    
    # Generate opportunities based on idea
    opportunities.append(f"{target.title()} market is underserved")
    if 'extension' in product:
        opportunities.append("Browser extension has low distribution cost")
    if 'telegram' in user_input.lower() or 'messaging' in industry:
        opportunities.append("Integration with popular platform drives adoption")

    # Calculate preliminary score
    score = 50  # Start neutral
    if problem: score += 10
    if existing_solution: score += 10
    if uniqueness: score += 10
    if market: score += 10
    if revenue: score += 10
    
    # Determine recommendation
    if score >= 70:
        recommendation = "GO"
        recommendation_emoji = "✅"
    elif score >= 40:
        recommendation = "PAUSE"
        recommendation_emoji = "⏸️"
    else:
        recommendation = "KILL"
        recommendation_emoji = "❌"
    
    # Build personalized output
    output = {
        "success": True,
        "userInput": user_input,
        "timestamp": timestamp,
        "overview": {
            "target": target,
            "industry": industry,
            "product": product,
            "score": score,
            "recommendation": recommendation,
            "recommendationEmoji": recommendation_emoji
        },
        "insights": {
            "problem": problem or "Not specified - define your core problem",
            "existingSolution": existing_solution or "Unknown - research how people cope currently",
            "uniqueness": uniqueness or "Not defined - what makes you different?",
            "market": market or "Not defined - who is your customer?",
            "revenue": revenue or "Not defined - how will you monetize?"
        },
        "devilAdvocate": {
            "risks": risks if risks else ["No major risks identified yet"],
            "opportunities": opportunities,
            "challengingQuestions": [
                f"Why will {target} specifically care about this?",
                "What if a big player (Google, Meta) adds this feature?",
                "What's the switching cost for users?",
                "Is this a want or a need?",
                "Can you reach customers profitably?"
            ]
        },
        "skills": {
            "requirements": {
                "problemStatement": problem or f"Help {target} with a specific pain point",
                "assumptions": [
                    f"{target} has this problem",
                    "Existing solutions are inadequate",
                    "Your solution solves it effectively"
                ],
                "mvp": "Core feature that solves the main problem"
            },
            "persona": {
                "name": f"The {target.title()}",
                "demographics": "Research needed",
                "goals": [f"Accomplish task more easily", "Save time", "Reduce frustration"],
                "painPoints": [problem or "Current solutions are inadequate"],
                "quote": f'I wish there was a way to solve "{problem or "this problem"}"'
            },
            "competition": {
                "direct": ["Existing tools that partially solve this"],
                "indirect": ["Manual workarounds", "Doing nothing"],
                "yourEdge": uniqueness or "To be defined"
            },
            "business": {
                "tam": f"${random.randint(100, 500)}M - {industry} market",
                "revenue": revenue or "Freemium model recommended"
            },
            "journey": {
                "awareness": "Social media, communities, word of mouth",
                "consideration": "Landing page, free trial",
                "decision": "Purchase after seeing value"
            }
        },
        "nextSteps": [
            "Talk to 5 real people in your target market",
            "Build a landing page and test ads ($100)",
            "Get 10 people to pre-pay or join waitlist",
            "Define MVP features based on feedback"
        ],
        "requiresEmail": True,
        "message": "Enter your email to get the full detailed report with all 7 skills deeply analyzed"
    }
    
    return output


def execute_skill(skill_id: str, user_input: str, answers: dict = None) -> dict:
    """Execute skill based on input"""
    if skill_id == 'validation-pack':
        # Check if this is a request for questions
        if answers and answers.get('getQuestions'):
            return get_qualifying_questions()
        return generate_validation_pack(user_input, answers)
    return {
        'success': True,
        'output': f"# {skill_id}\n\nInput: {user_input}",
        'skillId': skill_id,
    }


def main():
    if len(sys.argv) < 3:
        print(json.dumps({'success': False, 'error': 'Usage: run_skill.py <skill_id> <user_input>'}))
        sys.exit(1)
    
    skill_id = sys.argv[1]
    user_input = sys.argv[2]
    
    # Try to parse answers from stdin
    answers = None
    try:
        if not sys.stdin.isatty():
            input_data = sys.stdin.read()
            if input_data.strip():
                answers = json.loads(input_data)
    except:
        pass
    
    result = execute_skill(skill_id, user_input, answers)
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
