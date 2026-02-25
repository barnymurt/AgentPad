#!/usr/bin/env python3
"""
Validation Pack Execution
Runs all 7 validation pack skills using MiniMax LLM with proper skill frameworks.
"""

import sys
import json
import os
import requests
from datetime import datetime
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# Try to import dotenv for local development
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# MiniMax API Configuration
MINIMAX_API_KEY = os.environ.get('MINIMAX_API_KEY', '')
MINIMAX_API_URL = 'https://api.minimax.io/v1/text/chatcompletion_v2'

# Base path for skills
SKILLS_DIR = Path(__file__).parent.parent / 'skills'

# Validation Pack Skills - in order of importance for validation
VALIDATION_PACK_SKILLS = [
    'devils-advocate',           # Risk analysis (always included)
    'requirements-elicitation',   # What to build
    'user-persona-creation',      # Who for
    'competitor-research',        # Competition
    'business-case-modeling',     # Economics
    'feature-prioritization',    # What first
    'user-journey-mapping'       # How they'll use it
]

# For MVP speed - run core skills first
CORE_VALIDATION_SKILLS = [
    'devils-advocate',
    'requirements-elicitation', 
    'competitor-research',
    'business-case-modeling'
]


def call_minimax(prompt: str, system_prompt: str = None, max_tokens: int = 2000) -> str:
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
        'model': 'MiniMax-M2.5',
        'messages': messages,
        'temperature': 0.7,
        'max_tokens': max_tokens
    }
    
    try:
        response = requests.post(MINIMAX_API_URL, headers=headers, json=payload, timeout=60)
        if response.status_code == 200:
            result = response.json()
            choices = result.get('choices', [])
            if choices and len(choices) > 0:
                msg = choices[0].get('message', {})
                return msg.get('content', '')
            return None
        else:
            print(f"MiniMax API error: {response.status_code}", file=sys.stderr)
            return None
    except Exception as e:
        print(f"MiniMax API exception: {e}", file=sys.stderr)
        return None


def fetch_google_sheet_content(spreadsheet_url: str, auth: dict = None, max_rows: int = 50) -> str:
    """Fetch content from a Google Sheets URL"""
    try:
        import re
        # Extract spreadsheet ID from URL
        match = re.search(r'/d/([a-zA-Z0-9_-]+)', spreadsheet_url)
        if not match:
            return ""
        
        spreadsheet_id = match.group(1)
        
        # Use provided API key or fall back to env
        api_key = (auth.get('apiKey') if auth else None) or os.environ.get('GOOGLE_SHEETS_API_KEY')
        
        # First try: CSV export (works for publicly shared sheets)
        csv_url = f'https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv'
        
        try:
            response = requests.get(csv_url, timeout=15)
            if response.status_code == 200 and response.text.strip():
                lines = response.text.strip().split('\n')
                if not lines:
                    return ""
                
                content_lines = []
                for line in lines[1:max_rows+1]:  # Skip header
                    if line.strip():
                        # Parse CSV line
                        values = line.split(',')
                        content_lines.append(' | '.join([v.strip() for v in values if v.strip()]))
                
                return "\n".join(content_lines)
            elif response.status_code == 401:
                if api_key:
                    # Try with API key
                    pass
                else:
                    return "[Authentication required - make sheet public or provide API key]"
        except Exception as e:
            print(f"Google Sheets CSV error: {e}", file=sys.stderr)
        
        # Second try: API (requires API key)
        if api_key:
            api_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Sheet1?key={api_key}"
            try:
                response = requests.get(api_url, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    rows = data.get('values', [])
                    if rows:
                        content_lines = []
                        for row in rows[1:max_rows+1]:
                            if any(row):
                                content_lines.append(' | '.join([v for v in row if v]))
                        return "\n".join(content_lines)
                elif response.status_code == 403:
                    return "[API key invalid or insufficient permissions]"
            except Exception as e:
                print(f"Google Sheets API error: {e}", file=sys.stderr)
        
        return "[Content not accessible - check sheet sharing settings or provide API key]"
    except Exception as e:
        print(f"Error fetching Google Sheet: {e}", file=sys.stderr)
        return ""


def get_connected_data_sources_context(selected_ids: list = None) -> str:
    """Get context from connected data sources including actual content
    
    Args:
        selected_ids: Optional list of data source IDs to include. If None, includes all.
    """
    try:
        from data_source_helpers import load_json
        DATA_SOURCES_DIR = Path(__file__).parent.parent / "data-sources"
        REGISTRY_FILE = DATA_SOURCES_DIR / "registry.json"
        registry = load_json(REGISTRY_FILE)
        
        data_sources = registry.get("data_sources", [])
        if not data_sources:
            return ""
        
        # Filter by selected IDs if provided
        if selected_ids:
            data_sources = [ds for ds in data_sources if ds.get('id') in selected_ids]
        
        if not data_sources:
            return ""
        
        context_parts = ["CONNECTED DATA SOURCES:"]
        
        for ds in data_sources:
            ds_name = ds.get('name', 'Unnamed')
            ds_type = ds.get('type', 'unknown')
            ds_location = ds.get('location', '')
            ds_auth = ds.get('auth', {})
            
            context_parts.append(f"\n### {ds_name} ({ds_type})")
            
            # Try to fetch content based on type
            content = ""
            if ds_type == 'spreadsheet' and ds_location:
                if 'docs.google.com/spreadsheets' in ds_location:
                    content = fetch_google_sheet_content(ds_location, ds_auth)
                elif ds_location.endswith('.csv') or ds_location.endswith('.xlsx'):
                    content = f"File: {ds_location}"
                else:
                    content = f"Location: {ds_location}"
            elif ds_type == 'api' and ds_location:
                content = f"API Endpoint: {ds_location}"
            elif ds_type == 'database' and ds_location:
                content = f"[Database connection available: {ds_location}]"
            elif ds_type == 'cloud_storage' and ds_location:
                content = f"[Cloud storage bucket: {ds_location}]"
            elif ds_location:
                content = f"Location: {ds_location}"
            
            if content:
                # Truncate if too long
                if len(content) > 3000:
                    content = content[:3000] + "\n... (truncated)"
                context_parts.append(f"Content:\n{content}")
        
        return "\n".join(context_parts)
    except Exception as e:
        print(f"Error loading data sources: {e}", file=sys.stderr)
        return ""


def generate_intelligent_questions(user_input: str, data_source_ids: list = None) -> list:
    """Generate idea-specific Devil's Advocate questions using LLM"""
    
    # Check for connected data sources (pass data_source_ids if available)
    data_context = get_connected_data_sources_context(data_source_ids)
    
    system_prompt = """You are a startup expert and thought partner. Your job is to generate 3 thought-provoking questions that help refine this business idea.
The questions should be POSITIVE and constructive - not designed to shoot down the idea, but to help the founder think deeper.
Focus on: opportunity size, unique insight, first step feasibility.
IMPORTANT: Output ONLY the JSON array, no explanations, no thinking, no markdown.
Format: [{\"id\": \"q1\", \"question\": \"...\", \"placeholder\": \"...\"}]"""
    
    prompt = f"""Generate 3 constructive questions for this idea:
Idea: {user_input}
{f"Data context: {data_context}" if data_context else ""}
Output ONLY valid JSON array starting with [ and ending with ]."""
    
    result = call_minimax(prompt, system_prompt, max_tokens=600)
    
    if result:
        try:
            # Try to find and parse JSON array in response
            import re
            # Look for JSON array pattern
            match = re.search(r'\[.*\]', result, re.DOTALL)
            if match:
                questions = json.loads(match.group())
                if isinstance(questions, list) and len(questions) >= 3:
                    return questions
            # Try direct parse
            questions = json.loads(result)
            if isinstance(questions, list) and len(questions) >= 3:
                return questions
        except Exception as e:
            print(f"JSON parse error: {e}", file=sys.stderr)
            pass
    
    # Fallback to dynamic but generic questions
    return generate_dynamic_questions(user_input)


def generate_dynamic_questions(user_input: str) -> list:
    """Generate dynamic questions based on idea keywords"""
    input_lower = user_input.lower()
    
    # Simple 3-question banks
    question_banks = {
        'accessibility': [
            {"id": "opportunity", "question": "What's the specific accessibility need you're addressing?", "placeholder": "e.g., Dyslexia-friendly reading tools"},
            {"id": "audience", "question": "How would your target users discover this?", "placeholder": "e.g., Disability communities, assistive tech forums"},
            {"id": "value", "question": "What makes this solution uniquely valuable?", "placeholder": "e.g., Specific expertise or approach"}
        ],
        'fitness': [
            {"id": "opportunity", "question": "What's the specific fitness challenge you're solving?", "placeholder": "e.g., Motivation for inconsistent exercisers"},
            {"id": "audience", "question": "How will you reach your target users?", "placeholder": "e.g., Fitness communities, social media"},
            {"id": "value", "question": "What makes your approach different?", "placeholder": "e.g., Unique method or technology"}
        ],
        'default': [
            {"id": "opportunity", "question": "What's the specific problem you're solving?", "placeholder": "e.g., Helping people save time on X"},
            {"id": "audience", "question": "Who is your target customer?", "placeholder": "e.g., Small business owners"},
            {"id": "value", "question": "What unique value do you bring?", "placeholder": "e.g., Your specific expertise or approach"}
        ]
    }
    
    for keyword, questions in question_banks.items():
        if keyword in input_lower:
            return questions
    
    return question_banks['default']


def generate_intelligent_validation(user_input: str, answers: dict, data_source_ids: list = None) -> dict:
    """Generate intelligent validation pack using LLM"""
    
    # Get connected data sources context
    data_context = get_connected_data_sources_context(data_source_ids)
    
    system_prompt = """You are an expert startup validator. Generate a comprehensive, idea-specific validation report.
IMPORTANT: Output ONLY valid JSON, no explanations, no thinking, no markdown.
Use this exact structure:
{"overview": {"target": "", "industry": "", "product": "", "score": 0, "recommendation": ""}, "insights": {"problem": "", "existingSolution": "", "uniqueness": "", "market": "", "revenue": ""}, "devilAdvocate": {"risks": [], "opportunities": [], "challengingQuestions": []}, "nextSteps": []}"""
    
    answers_str = "\n".join([f"- {k}: {v}" for k, v in answers.items()])
    prompt = f"""Generate validation for: {user_input}
Answers: {answers_str}
{f"Data sources: {data_context}" if data_context else ""}
Output ONLY valid JSON."""
    
    result = call_minimax(prompt, system_prompt, max_tokens=2000)
    
    if result:
        try:
            import re
            # Try to find JSON in response
            match = re.search(r'\{.*\}', result, re.DOTALL)
            if match:
                validation = json.loads(match.group())
                if 'overview' in validation:
                    validation['success'] = True
                    return validation
        except Exception as e:
            print(f"Validation parse error: {e}", file=sys.stderr)
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


def get_questions_for_idea(user_input: str, data_source_ids: list = None) -> list:
    """Get questions - uses LLM if available, otherwise dynamic fallback"""
    # Try LLM first
    questions = generate_intelligent_questions(user_input, data_source_ids)
    return questions


def validate_idea(user_input: str, answers: dict, data_source_ids: list = None) -> dict:
    """Validate idea - uses LLM if available, otherwise fallback"""
    # Try LLM first
    result = generate_intelligent_validation(user_input, answers, data_source_ids)
    return result


def load_skill_prompt(skill_name: str) -> dict:
    """Load skill prompt and output schema from files"""
    skill_dir = SKILLS_DIR / skill_name
    
    result = {
        'name': skill_name,
        'description': '',
        'system_prompt': '',
        'output_schema': ''
    }
    
    skill_file = skill_dir / 'SKILL.md'
    if skill_file.exists():
        content = skill_file.read_text(encoding='utf-8')
        if '---' in content:
            parts = content.split('---', 2)
            if len(parts) >= 3:
                import re
                desc_match = re.search(r'description:\s*(.+?)(?:\n---|$)', parts[1])
                if desc_match:
                    result['description'] = desc_match.group(1).strip()
                result['system_prompt'] = parts[2].strip()[:3000]
    
    schema_file = skill_dir / 'references' / 'output-schema.md'
    if schema_file.exists():
        result['output_schema'] = schema_file.read_text(encoding='utf-8')[:2000]
    
    return result


# Questions to ask when no context is provided - keyed by skill type
SKILL_QUESTIONS = {
    'architecture-design': """Since there's no validation context provided, I need some context about your project to design a relevant architecture:

1. **Target users & scale**: Who are your users and how many do you expect in year 1?
2. **Team**: How many developers on your team and what's their expertise?
3. **Budget**: What's your infrastructure budget range for Year 1?
4. **Timeline**: Any launch deadlines or regulatory requirements?

Or if you'd like, run a Validation Pack first to answer these questions automatically.""",
    
    'api-design': """To design the right API for your project, I need some context:

1. **Who will consume your API**: External customers, internal teams, or both?
2. **Integrations**: Any third-party services you need to connect to?
3. **Authentication**: Do you need user auth, API keys, or both?
4. **Data sensitivity**: Any PII, payments, or regulated data?

Run a Validation Pack first for comprehensive context.""",
    
    'user-story-generation': """To generate relevant user stories, I need context about your users:

1. **Who are your target users** and what's their tech comfort level?
2. **What's the core value** your product delivers?
3. **What are the key workflows** users need to accomplish?
4. **Any constraints** like mobile-first, offline support, etc.?

Run a Validation Pack for full user research context.""",
    
    'schema-design': """To design your data schema, I need to understand your data model:

1. **What entities** does your application manage (users, orders, products, etc.)?
2. **What are the relationships** between these entities?
3. **Any compliance needs** (PII, financial data, healthcare, etc.)?
4. **Expected data volume** and growth trajectory?

Run a Validation Pack for complete context.""",
    
    'default': """Since there's no validation context provided, I need some basic context:

1. **What problem does your product solve** and for whom?
2. **What's your target scale** (users, transactions, data volume)?
3. **Any technical constraints** (existing tech stack, budget, team size)?
4. **Timeline or regulatory requirements**?

For best results, run a Validation Pack first to get comprehensive context, or provide your research/notes in the context field."""
}


def execute_single_skill(skill_name: str, user_input: str, answers: dict) -> dict:
    """Execute a single skill and return its output"""
    skill = load_skill_prompt(skill_name)
    
    # Check if we have context
    has_context = False
    context_block = ""
    
    if isinstance(answers, dict) and answers:
        has_context = True
        context_block = f"USER'S ANSWERS TO DEVIL'S ADVOCATE QUESTIONS (THIS IS THE CONTEXT - USE THIS):\n{json.dumps(answers, indent=2)}\n"
    elif isinstance(answers, str) and answers.strip():
        has_context = True
        context_block = f"ADDITIONAL CONTEXT FROM VALIDATION/RESEARCH:\n{answers}\n"
    
    # If no context, ask skill-specific questions
    if not has_context:
        clarifying_questions = SKILL_QUESTIONS.get(skill_name, SKILL_QUESTIONS['default'])
        return {
            'skill': skill_name,
            'output': clarifying_questions,
            'success': True,
            'needs_context': True,
            'suggestion': 'Run a Validation Pack first or provide context in the context field'
        }
    
    context = f"""
IDEAS: {user_input}

{context_block}
"""
    
    system_prompt = f"""You are an expert in {skill['name'].replace('-', ' ')}.
{skill['system_prompt'][:2500]}

IMPORTANT: The user's idea and their answers to clarifying questions are provided above. 
Use this context to provide SPECIFIC, RELEVANT output for their idea - not generic advice."""

    user_prompt = f"""{context}

Apply the {skill['name'].replace('-', ' ')} framework to the above idea with its context.
Provide specific, tailored output relevant to this particular idea."""

    result = call_minimax(user_prompt, system_prompt, max_tokens=1200)
    
    # Clean output - remove thinking tags and normalize whitespace
    if result:
        import re
        # Remove thinking tags like "<think>" and "</think>"
        result = re.sub(r'<think>.*?</think>', '', result, flags=re.DOTALL)
        # Remove markdown code block markers from thinking
        result = re.sub(r'```markdown\n?', '', result)
        result = re.sub(r'```\n?', '', result)
        # Normalize whitespace
        result = '\n'.join(line for line in result.split('\n') if line.strip())
    
    return {
        'skill': skill_name,
        'output': result if result else f"[{skill['name']} - LLM call failed]",
        'success': bool(result)
    }


def generate_instant_validation(user_input: str, answers: dict, data_source_ids: list = None) -> dict:
    """Generate instant validation - single LLM call for fast response"""
    
    # Check for connected data sources
    data_context = get_connected_data_sources_context(data_source_ids)
    
    context = f"""
IDEA: {user_input}

{f"{data_context}" if data_context else ""}

USER'S ANSWERS:
{json.dumps(answers, indent=2)}
"""
    
    # Single comprehensive LLM call for instant response
    system_prompt = """You are a startup validator. Provide instant validation using ALL available context (user input, connected data sources, and user's answers).
Output ONLY valid JSON with:
{"score": 1-10, "recommendation": "GO/PIVOT/KILL", "devilAdvocateSummary": "2 sentence insight", "validationSummary": "overall assessment", "strengths": ["s1", "s2"], "considerations": ["c1", "c2"], "firstStep": "one action"}

Tone: Constructive, helpful, not overly critical. Use the data sources to provide SPECIFIC insights."""
    
    user_prompt = f"""{context}
Provide instant validation for this startup idea. Reference any connected data sources in your analysis."""
    
    result = call_minimax(user_prompt, system_prompt, max_tokens=600)
    
    validation = {"score": 5, "recommendation": "PIVOT", "devilAdvocateSummary": "", "validationSummary": "", "strengths": [], "considerations": [], "firstStep": ""}
    
    if result:
        try:
            import re
            match = re.search(r'\{.*\}', result, re.DOTALL)
            if match:
                validation = json.loads(match.group())
        except Exception as e:
            print(f"Parse error: {e}", file=sys.stderr)
    
    rec = validation.get('recommendation', 'PIVOT').upper()
    if rec not in ['GO', 'PIVOT', 'KILL']:
        score = int(validation.get('score', 5))
        rec = 'GO' if score >= 8 else 'PIVOT' if score >= 5 else 'KILL'
    
    return {
        "success": True,
        "mode": "instant",
        "userInput": user_input,
        "timestamp": datetime.now().strftime("%B %d, %Y"),
        "overview": {
            "target": answers.get('opportunity', answers.get('q1', 'General'))[:100],
            "industry": extract_industry(user_input),
            "product": "SaaS/Mobile App",
            "score": int(validation.get('score', 5)) * 10,
            "recommendation": rec,
            "summary": validation.get('validationSummary', '')
        },
        "instant": {
            "recommendation": rec,
            "score": int(validation.get('score', 5)),
            "devilAdvocateSummary": validation.get('devilAdvocateSummary', ''),
            "validationSummary": validation.get('validationSummary', ''),
            "strengths": validation.get('strengths', []),
            "considerations": validation.get('considerations', []),
            "firstStep": validation.get('firstStep', '')
        },
        "skillsExecuted": 1,
        "skillsSuccessful": 1,
        "skillResults": {
            "instant-validation": {
                "skill": "instant-validation",
                "output": result[:500] if result else "Failed",
                "success": bool(result)
            }
        },
        "fullPackAvailable": True,
        "fullPackProgress": 0,
        "emailCapture": True,
        "message": "Full 7-skill validation pack being prepared"
    }


def execute_skill_wrapper(skill_name: str, user_input: str, answers: dict) -> tuple:
    """Wrapper to execute a single skill and return with its name"""
    print(f"# Running skill: {skill_name}...", file=sys.stderr)
    result = execute_single_skill(skill_name, user_input, answers)
    return (skill_name, result)


def generate_full_validation_pack(user_input: str, answers: dict, data_source_ids: list = None) -> dict:
    """Generate full 7-skill validation pack using parallel execution"""
    
    # Get connected data sources context
    data_context = get_connected_data_sources_context(data_source_ids)
    
    context = f"""
IDEA: {user_input}

{f"{data_context}" if data_context else ""}

USER'S ANSWERS (CONTEXT):
{json.dumps(answers, indent=2)}
"""
    
    all_skills = [
        'devils-advocate',
        'requirements-elicitation',
        'user-persona-creation',
        'competitor-research',
        'business-case-modeling',
        'feature-prioritization',
        'user-journey-mapping'
    ]
    
    skill_results = {}
    successful_skills = 0
    
    print(f"# Starting {len(all_skills)} skills in parallel...", file=sys.stderr)
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {
            executor.submit(execute_skill_wrapper, skill_name, user_input, answers): skill_name
            for skill_name in all_skills
        }
        
        for future in as_completed(futures):
            skill_name, result = future.result()
            skill_results[skill_name] = result
            if result.get('success'):
                successful_skills += 1
            progress = int((len(skill_results) / len(all_skills)) * 70)
            print(f"# Progress: {progress}%", file=sys.stderr)
    
    # Generate final scorecard
    score_prompt = f"""{context}

7 skills executed. Provide final validation:
Output ONLY JSON with {{"score": 1-10, "recommendation": "GO/PIVOT/KILL", "summary": "final assessment"}}"""

    score_result = call_minimax(score_prompt, "You are a startup validator. Output ONLY valid JSON.", max_tokens=400)
    
    validation = {"score": 5, "recommendation": "PIVOT", "summary": ""}
    
    if score_result:
        try:
            import re
            match = re.search(r'\{.*\}', score_result, re.DOTALL)
            if match:
                validation = json.loads(match.group())
        except:
            pass
    
    rec = validation.get('recommendation', 'PIVOT').upper()
    if rec not in ['GO', 'PIVOT', 'KILL']:
        score = int(validation.get('score', 5))
        rec = 'GO' if score >= 8 else 'PIVOT' if score >= 5 else 'KILL'
    
    return {
        "success": True,
        "mode": "full",
        "userInput": user_input,
        "timestamp": datetime.now().strftime("%B %d, %Y"),
        "overview": {
            "target": answers.get('opportunity', answers.get('q1', 'General'))[:100],
            "industry": extract_industry(user_input),
            "product": "SaaS/Mobile App",
            "score": int(validation.get('score', 5)) * 10,
            "recommendation": rec,
            "summary": validation.get('summary', '')
        },
        "skillsExecuted": 7,
        "skillsSuccessful": successful_skills,
        "skillResults": skill_results,
        "scorecard": validation,
        "fullPackComplete": True,
        "notionTemplate": True,
        "message": "Full validation pack complete"
    }


def extract_industry(user_input: str) -> str:
    """Extract industry from user input"""
    input_lower = user_input.lower()
    industries = {
        'fitness': 'Health & Fitness', 'finance': 'Fintech', 'education': 'EdTech',
        'health': 'Healthcare', 'messaging': 'Communication', 'social': 'Social Media',
        'ecommerce': 'E-Commerce', 'saas': 'SaaS'
    }
    for keyword, industry in industries.items():
        if keyword in input_lower:
            return industry
    return 'Various'


def main():
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False, 
            'error': 'Usage: run_skill.py <skill_id> <user_input> [context_json]',
            'hasApiKey': bool(MINIMAX_API_KEY)
        }))
        sys.exit(1)
    
    skill_id = sys.argv[1]
    user_input = sys.argv[2]
    answers = {}
    data_source_ids = None
    
    # Parse context from command line (can contain answers and/or dataSourceIds)
    if len(sys.argv) > 3:
        try:
            context = json.loads(sys.argv[3])
            if isinstance(context, dict):
                answers = context.get('answers', {})
                data_source_ids = context.get('dataSourceIds')
            else:
                answers = context
        except:
            pass
    
    # Parse mode from environment or use default
    mode = os.environ.get('VALIDATION_MODE', 'instant')  # 'instant' or 'full'
    
    if skill_id == 'validation-pack':
        # Check if MiniMax API is available
        if not MINIMAX_API_KEY:
            print(f"# MiniMax API key not found - using intelligent fallback", file=sys.stderr)
        
        # Get idea-specific questions
        questions = generate_intelligent_questions(user_input, data_source_ids)
        
        # If we have answers, generate validation
        if answers and len(answers) > 0:
            if mode == 'full':
                # Generate full 7-skill pack
                result = generate_full_validation_pack(user_input, answers, data_source_ids)
            else:
                # Generate instant 3-skill response
                result = generate_instant_validation(user_input, answers, data_source_ids)
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
    elif skill_id == 'validation-pack-full':
        # Explicit full mode
        questions = generate_intelligent_questions(user_input, data_source_ids)
        if answers and len(answers) > 0:
            result = generate_full_validation_pack(user_input, answers, data_source_ids)
            result['questions'] = questions
            print(json.dumps(result, indent=2))
        else:
            print(json.dumps({
                'success': True,
                'questions': questions,
                'requiresAnswers': True,
                'hasApiKey': bool(MINIMAX_API_KEY)
            }, indent=2))
    else:
        # Execute the individual skill
        answers_dict = {}
        if answers:
            try:
                answers_dict = json.loads(answers) if isinstance(answers, str) else answers
            except:
                pass
        
        result = execute_single_skill(skill_id, user_input, answers_dict)
        print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
