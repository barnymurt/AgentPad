import os
import re

SKILLS_DIR = r"C:\Dev\claude-add-notion-ai-prompt\skills"

# Categorization mapping: skill_name -> (lifecycle, category)
SKILL_CATEGORIES = {
    # Discovery
    "product-vision": ("discovery", "product"),
    "user-persona-creation": ("discovery", "research"),
    "user-journey-mapping": ("discovery", "research"),
    "requirements-elicitation": ("discovery", "research"),
    "competitor-research": ("discovery", "research"),
    "business-case-modeling": ("discovery", "product"),
    "stakeholder-analysis": ("discovery", "product"),
    "interview-guide-creation": ("discovery", "research"),
    "feedback-synthesis": ("discovery", "research"),
    "devils-advocate": ("discovery", "product"),
    "gap-analysis": ("discovery", "product"),
    
    # Build
    "feature-prioritization": ("build", "product"),
    "roadmap-planning": ("build", "product"),
    "product-okrs": ("build", "product"),
    "iteration-planning": ("build", "product"),
    "messaging-framework": ("build", "product"),
    "pricing-strategy": ("build", "growth"),
    "usability-test-planning": ("build", "research"),
    "survey-design": ("build", "research"),
    "heuristic-evaluation": ("build", "design"),
    "information-architecture": ("build", "design"),
    "wireframing": ("build", "design"),
    "ui-patterns": ("build", "design"),
    "responsive-patterns": ("build", "design"),
    "design-system": ("build", "design"),
    "animation-motion": ("build", "design"),
    "accessibility-review": ("build", "design"),
    "user-story-generation": ("build", "product"),
    "ticket-refinement": ("build", "product"),
    "architecture-design": ("build", "engineering"),
    "api-design": ("build", "engineering"),
    "schema-design": ("build", "engineering"),
    "state-management": ("build", "engineering"),
    "component-architecture": ("build", "engineering"),
    "tdd": ("build", "engineering"),
    "test-strategy": ("build", "engineering"),
    "technical-readiness-pack": ("build", "engineering"),
    "security-requirements-baseline": ("build", "engineering"),
    "security-architecture-review": ("build", "engineering"),
    "security-compliance-roadmap": ("build", "engineering"),
    "privacy-regulation-assessment": ("build", "engineering"),
    "data-protection-assessment": ("build", "engineering"),
    "data-modeling": ("build", "engineering"),
    "threat-modeling": ("build", "engineering"),
    "process-mapping": ("build", "product"),
    "data-security": ("build", "engineering"),
    "backup-recovery": ("build", "engineering"),
    "migration-planning": ("build", "engineering"),
    "infrastructure-as-code": ("build", "engineering"),
    "serverless-development": ("build", "engineering"),
    "mobile-ios": ("build", "engineering"),
    "mobile-android": ("build", "engineering"),
    "edge-computing": ("build", "engineering"),
    "cloud-platforms": ("build", "engineering"),
    "ml-llm-integration": ("build", "engineering"),
    "automation-framework": ("build", "engineering"),
    "ci-cd-pipeline": ("build", "engineering"),
    "performance-tuning": ("build", "engineering"),
    "monitoring-observability": ("build", "engineering"),
    "frontend-performance": ("build", "engineering"),
    "release-management": ("build", "engineering"),
    "scrum-master": ("build", "product"),
    "delivery-manager": ("build", "product"),
    "skill-reviewer": ("build", "product"),
    "skill-orchestrator": ("build", "product"),
    "agent-browser": ("build", "product"),
    "product-health-check": ("build", "product"),
    "webapp-testing": ("build", "engineering"),
    "validation-pack": ("build", "product"),
    "scale-readiness": ("build", "product"),
    
    # Launch
    "pricing-launch": ("launch", "growth"),
    "launch-planning": ("launch", "product"),
    "launch-analytics": ("launch", "growth"),
    "channel-strategy": ("launch", "growth"),
    "paid-acquisition": ("launch", "growth"),
    "referral-program": ("launch", "growth"),
    "community-building": ("launch", "growth"),
    "sales-enablement": ("launch", "growth"),
    "partner-strategy": ("launch", "growth"),
    "analyst-relations": ("launch", "growth"),
    "content-strategy": ("launch", "growth"),
    "seo-foundation": ("launch", "growth"),
    "devils-advocate-gtm": ("launch", "growth"),
    
    # Iterate
    "ab-test-design": ("iterate", "research"),
    "cohort-analysis": ("iterate", "research"),
    "funnel-analysis": ("iterate", "research"),
    "saas-metrics-analysis": ("iterate", "research"),
    "kpi-tracking": ("iterate", "product"),
    "metrics-dashboard-creation": ("iterate", "product"),
    "data-visualization": ("iterate", "product"),
}

def update_skill_file(skill_dir):
    skill_name = os.path.basename(skill_dir)
    skill_md = os.path.join(skill_dir, "SKILL.md")
    
    if not os.path.exists(skill_md):
        print(f"  SKIP: {skill_name} (no SKILL.md)")
        return
    
    with open(skill_md, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has lifecycle and category
    if 'lifecycle:' in content and 'category:' in content:
        print(f"  SKIP: {skill_name} (already has tags)")
        return
    
    if skill_name not in SKILL_CATEGORIES:
        print(f"  SKIP: {skill_name} (not in mapping)")
        return
    
    lifecycle, category = SKILL_CATEGORIES[skill_name]
    
    # Add lifecycle and category after description line
    # Find the line with "---" that ends the frontmatter
    lines = content.split('\n')
    new_lines = []
    in_frontmatter = False
    frontmatter_end = False
    
    for i, line in enumerate(lines):
        if line.strip() == '---':
            if not in_frontmatter:
                in_frontmatter = True
                new_lines.append(line)
            else:
                # End of frontmatter - add our tags before this line
                new_lines.append(f"lifecycle: {lifecycle}")
                new_lines.append(f"category: {category}")
                new_lines.append(line)
                frontmatter_end = True
        elif in_frontmatter and not frontmatter_end:
            new_lines.append(line)
        else:
            new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    with open(skill_md, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  UPDATE: {skill_name} -> lifecycle: {lifecycle}, category: {category}")

def main():
    print("Updating skills with lifecycle and category tags...")
    
    for item in os.listdir(SKILLS_DIR):
        skill_dir = os.path.join(SKILLS_DIR, item)
        if os.path.isdir(skill_dir):
            update_skill_file(skill_dir)
    
    print("\nDone!")

if __name__ == "__main__":
    main()
