#!/usr/bin/env python3
"""
Validation Pack Execution
Generates comprehensive, relevant validation deliverable using MiniMax LLM for intelligent analysis.
"""

import sys
import json
import os
import requests
from datetime import datetime

# Try to import dotenv for local development
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# MiniMax API Configuration
MINIMAX_API_KEY = os.environ.get('MINIMAX_API_KEY', '')
MINIMAX_API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_pro'


def call_minimax(prompt: str, system_prompt: str = None) -> str:
    """Call MiniMax API for intelligent responses"""
    if not MINIMAX_API_KEY:
        return None
    
    headers = {
        'Authorization': f'Bearer {MINIMAX_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    messages = []
    if system_prompt:
        messages.append({'role': 'system', 'content': system_prompt})
    messages.append({'role': 'user', 'content': prompt})
    
    payload = {
        'model': 'MiniMax-Text-01',
        'messages': messages,
        'temperature': 0.7,
        'max_tokens': 2000
    }
    
    try:
        response = requests.post(MINIMAX_API_URL, headers=headers, json=payload, timeout=30)
        if response.status_code == 200:
            result = response.json()
            return result.get('choices', [{}])[0].get('message', {}).get('content', '')
        else:
            print(f"MiniMax API error: {response.status_code}", file=sys.stderr)
            return None
    except Exception as e:
        print(f"MiniMax API exception: {e}", file=sys.stderr)
        return None


def generate_intelligent_questions(user_input: str) -> list:
    """Generate idea-specific Devil's Advocate questions using LLM"""
    
    system_prompt = """You are a startup expert and Devil's Advocate. Your job is to stress-test business ideas.
Generate 5 specific, challenging questions that would help validate this idea.
The questions should be tailored to the specific idea, not generic.
Focus on: problem validity, market size, competition, revenue, unique value, user adoption.
Return ONLY a JSON array with this exact format:
[{"id": "q1", "question": "...", "placeholder": "..."}]"""
    
    prompt = f"""Analyze this business idea and generate 5 Devil's Advocate questions to stress-test it:

Idea: {user_input}

Generate questions that are SPECIFIC to this idea - not generic startup questions.
Make each question challenge a specific aspect of this particular idea."""
    
    result = call_minimax(prompt, system_prompt)
    
    if result:
        try:
            # Try to parse JSON from response
            questions = json.loads(result)
            if isinstance(questions, list) and len(questions) >= 3:
                return questions
        except:
            pass
    
    # Fallback to dynamic but generic questions
    return generate_dynamic_questions(user_input)


def generate_dynamic_questions(user_input: str) -> list:
    """Generate dynamic questions based on idea keywords"""
    input_lower = user_input.lower()
    
    # Idea-specific question banks
    question_banks = {
        'accessibility': [
            {"id": "problem", "question": "How big is the accessibility market and who are the key players?", "placeholder": "e.g., $17B market, Microsoft, Google dominate"},
            {"id": "adoption", "question": "How will users discover and adopt your accessibility solution?", "placeholder": "e.g., Through disability communities, assistive tech forums"},
            {"id": "differentiation", "question": "What prevents big companies from adding this accessibility feature?", "placeholder": "e.g., Cost of compliance, lack of focus"},
            {"id": "pricing", "question": "What's the willingness to pay in the accessibility market?", "placeholder": "e.g., Some pay premium, most expect free"},
            {"id": "evidence", "question": "What proof do you have that this problem is painful enough to pay for?", "placeholder": "e.g., User interviews, forum posts, surveys"}
        ],
        'messaging': [
            {"id": "problem", "question": "Why do users need another messaging tool?", "placeholder": "e.g., Existing apps not meeting specific needs"},
            {"id": "switching", "question": "What is the switching cost for users to move to your messaging platform?", "placeholder": "e.g., Network effect, habit, data migration"},
            {"id": "monetization", "question": "How will you monetize - subscriptions, ads, B2B?", "placeholder": "e.g., Freemium model, enterprise licensing"},
            {"id": "competition", "question": "How do you compete with WhatsApp, Telegram, Slack?", "placeholder": "e.g., Niche focus, better features, privacy"},
            {"id": "retention", "question": "What keeps users coming back to your messaging app?", "placeholder": "e.g., Network effects, unique features"}
        ],
        'fitness': [
            {"id": "problem", "question": "Why do fitness apps have 90%+ churn rates?", "placeholder": "e.g., Users lose motivation, better options exist"},
            {"id": "differentiation", "question": "What makes your fitness product different from the 10,000+ existing ones?", "placeholder": "e.g., Unique method, community, AI coaching"},
            {"id": "acquisition", "question": "How will you acquire fitness app users profitably?", "placeholder": "e.g., Influencers, app store SEO, partnerships"},
            {"id": "retention", "question": "What's your plan to keep users motivated past week 2?", "placeholder": "e.g., Social features, gamification, AI coaching"},
            {"id": "pricing", "question": "Can you charge enough to cover high customer acquisition costs?", "placeholder": "e.g., $30-50/month needed for profitability"}
        ],
        'default': [
            {"id": "problem", "question": "What specific problem does your idea solve that people care enough to pay for?", "placeholder": "e.g., Saving time, money, or frustration"},
            {"id": "existing", "question": "How do people solve this problem today - even suboptimally?", "placeholder": "e.g., Workarounds, manual processes, competitors"},
            {"id": "differentiation", "question": "What is your unique advantage that can't be easily copied?", "placeholder": "e.g., Technology, brand, network effects, data"},
            {"id": "market", "question": "What's your realistic path to getting paying customers?", "placeholder": "e.g., SEO, content, ads, partnerships, sales"},
            {"id": "revenue", "question": "What's the revenue model and are unit economics viable?", "placeholder": "e.g., SaaS, transaction, ads; CAC vs LTV"}
        ]
    }
    
    # Match idea to question bank
    for keyword, questions in question_banks.items():
        if keyword in input_lower:
            return questions
    
    return question_banks['default']


def generate_intelligent_validation(user_input: str, answers: dict) -> dict:
    """Generate intelligent validation pack using LLM"""
    
    system_prompt = """You are an expert startup validator. Generate a comprehensive, idea-specific validation report.
Return ONLY valid JSON with this exact structure:
{
    "overview": {"target": "", "industry": "", "product": "", "score": 0-100, "recommendation": "GO/PAUSE/KILL"},
    "insights": {"problem": "", "existingSolution": "", "uniqueness": "", "market": "", "revenue": ""},
    "devilAdvocate": {"risks": [], "opportunities": [], "challengingQuestions": []},
    "nextSteps": []
}
Be specific to the user's idea and their answers. Make insights actionable."""
    
    answers_str = "\n".join([f"- {k}: {v}" for k, v in answers.items()])
    prompt = f"""Generate a validation report for this idea:

Idea: {user_input}

User's Answers:
{answers_str}

Provide a thorough analysis that:
1. Identifies the real target market
2. Assesses competition
3. Evaluates business model viability
4. Provides specific next steps
5. Gives a GO/PAUSE/KILL recommendation with reasoning"""
    
    result = call_minimax(prompt, system_prompt)
    
    if result:
        try:
            validation = json.loads(result)
            if 'overview' in validation:
                return validation
        except:
            pass
    
    # Fallback to algorithmic validation
    return generate_algorithmic_validation(user_input, answers)


def generate_algorithmic_validation(user_input: str, answers: dict) -> dict:
    """Generate validation pack without LLM"""
    input_lower = user_input.lower()
    
    # Analyze idea keywords
    keywords = analyze_idea_keywords(user_input)
    
    # Calculate score based on answer quality
    score = 50
    if answers.get('problem') and len(answers['problem']) > 20:
        score += 15
    if answers.get('existing') and len(answers['existing']) > 20:
        score += 10
    if answers.get('uniqueness') and len(answers['uniqueness']) > 15:
        score += 15
    if answers.get('market') and len(answers['market']) > 15:
        score += 10
    
    # Determine recommendation
    if score >= 70:
        recommendation = "GO"
        emoji = "✅"
    elif score >= 40:
        recommendation = "PAUSE"
        emoji = "⏸️"
    else:
        recommendation = "KILL"
        emoji = "❌"
    
    # Generate risks based on idea
    risks = []
    if 'app' in input_lower or 'platform' in input_lower:
        risks.append("Platforms have high churn - how will you retain users?")
    if 'ai' in input_lower or 'automation' in input_lower:
        risks.append("AI solutions can be commoditized - what's your moat?")
    if 'marketplace' in input_lower or 'social' in input_lower:
        risks.append("Network effects take time - how will you bootstrap?")
    risks.extend([
        "Problem might not be painful enough to pay for",
        "Competition may be closer than you think",
        "Customer acquisition could be expensive"
    ])
    
    # Generate opportunities
    opportunities = [f"{keywords['target']} market is underserved"]
    if 'mobile' in input_lower or 'app' in input_lower:
        opportunities.append("Mobile-first approach captures on-the-go usage")
    if 'subscription' in input_lower or 'saas' in input_lower:
        opportunities.append("Recurring revenue model provides predictability")
    
    return {
        "success": True,
        "userInput": user_input,
        "timestamp": datetime.now().strftime("%B %d, %Y"),
        "overview": {
            "target": keywords['target'],
            "industry": keywords['industry'],
            "product": keywords['product'],
            "score": min(score, 100),
            "recommendation": recommendation,
            "recommendationEmoji": emoji
        },
        "insights": {
            "problem": answers.get('problem', 'Not specified'),
            "existingSolution": answers.get('existing', 'Unknown - needs research'),
            "uniqueness": answers.get('uniqueness', 'Not defined'),
            "market": answers.get('market', 'Not defined'),
            "revenue": answers.get('revenue', 'Not defined')
        },
        "devilAdvocate": {
            "risks": risks[:5],
            "opportunities": opportunities,
            "challengingQuestions": [
                f"Why will {keywords['target']} specifically care about this?",
                "What if a big player adds this feature?",
                "What's the actual willingness to pay?",
                "Can you reach customers profitably?",
                "Is this a want or a genuine need?"
            ]
        },
        "nextSteps": [
            "Talk to 5 real people in your target market",
            "Build a landing page and test with ads",
            "Get 10 people to pre-pay or join waitlist",
            "Define MVP features based on feedback"
        ],
        "requiresEmail": True,
        "message": "Enter your email to get the full detailed report"
    }


def analyze_idea_keywords(user_input: str) -> dict:
    """Extract keywords from user input"""
    input_lower = user_input.lower()
    
    keywords = {'target': 'general consumers', 'industry': 'various', 'product': 'solution'}
    
    # Target
    if any(w in input_lower for w in ['adhd', 'dyslex', 'autism', 'neuro']):
        keywords['target'] = 'neurodivergent users'
    elif any(w in input_lower for w in ['doctor', 'nurse', 'medical', 'health']):
        keywords['target'] = 'healthcare professionals'
    elif any(w in input_lower for w in ['business', 'b2b', 'company']):
        keywords['target'] = 'businesses'
    elif any(w in input_lower for w in ['child', 'kid', 'student']):
        keywords['target'] = 'young people'
    
    # Industry
    if any(w in input_lower for w in ['telegram', 'whatsapp', 'discord', 'messaging']):
        keywords['industry'] = 'messaging/communication'
    elif any(w in input_lower for w in ['fitness', 'gym', 'run', 'sport']):
        keywords['industry'] = 'health & fitness'
    elif any(w in input_lower for w in ['finance', 'money', 'payment']):
        keywords['industry'] = 'fintech'
    elif any(w in input_lower for w in ['education', 'learn', 'teaching']):
        keywords['industry'] = 'education'
    elif any(w in input_lower for w in ['dyslex', 'adhd', 'accessibility']):
        keywords['industry'] = 'accessibility/wellness'
    
    # Product
    if 'extension' in input_lower or 'plugin' in input_lower:
        keywords['product'] = 'browser extension'
    elif 'app' in input_lower or 'mobile' in input_lower:
        keywords['product'] = 'mobile app'
    elif 'website' in input_lower or 'web' in input_lower:
        keywords['product'] = 'web platform'
    elif 'saas' in input_lower:
        keywords['product'] = 'SaaS platform'
    
    return keywords


def get_questions_for_idea(user_input: str) -> list:
    """Get questions - uses LLM if available, otherwise dynamic fallback"""
    # Try LLM first
    questions = generate_intelligent_questions(user_input)
    return questions


def validate_idea(user_input: str, answers: dict) -> dict:
    """Validate idea - uses LLM if available, otherwise fallback"""
    # Try LLM first
    result = generate_intelligent_validation(user_input, answers)
    return result


def main():
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False, 
            'error': 'Usage: run_skill.py <skill_id> <user_input> [answers_json]',
            'hasApiKey': bool(MINIMAX_API_KEY)
        }))
        sys.exit(1)
    
    skill_id = sys.argv[1]
    user_input = sys.argv[2]
    answers = {}
    
    # Parse answers from command line
    if len(sys.argv) > 3:
        try:
            answers = json.loads(sys.argv[3])
        except:
            pass
    
    if skill_id == 'validation-pack':
        # Check if MiniMax API is available
        if not MINIMAX_API_KEY:
            print(f"# MiniMax API key not found - using intelligent fallback", file=sys.stderr)
        
        # Get idea-specific questions
        questions = get_questions_for_idea(user_input)
        
        # If we have answers, generate validation
        if answers and len(answers) > 0:
            result = validate_idea(user_input, answers)
            result['questions'] = questions
            print(json.dumps(result, indent=2))
        else:
            # Return questions only
            print(json.dumps({
                'success': True,
                'questions': questions,
                'requiresAnswers': True,
                'hasApiKey': bool(MINIMAX_API_KEY)
            }, indent=2))
    else:
        print(json.dumps({
            'success': True,
            'output': f"# {skill_id}\n\nIdea: {user_input}",
            'skillId': skill_id
        }))


if __name__ == '__main__':
    main()
