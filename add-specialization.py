import os

SKILLS_DIR = r"C:\Dev\claude-add-notion-ai-prompt\skills"

SPECIALIZATIONS = {
    # Frontend
    "ui-patterns": "frontend",
    "responsive-patterns": "frontend",
    "frontend-performance": "frontend",
    "animation-motion": "frontend",
    "design-system": "frontend",
    "wireframing": "frontend",
    "information-architecture": "frontend",
    "accessibility-review": "frontend",
    
    # Backend
    "api-design": "backend",
    "schema-design": "backend",
    "data-modeling": "backend",
    "serverless-development": "backend",
    "edge-computing": "backend",
    "infrastructure-as-code": "backend",
    "cloud-platforms": "backend",
    "state-management": "backend",
    "component-architecture": "backend",
    "migration-planning": "backend",
    "ml-llm-integration": "backend",
    
    # QA/Test
    "test-strategy": "qa",
    "tdd": "qa",
    "automation-framework": "qa",
    "webapp-testing": "qa",
    "usability-test-planning": "qa",
    
    # Full-stack / Cross-cutting
    "architecture-design": "fullstack",
    "security-architecture-review": "fullstack",
    "security-requirements-baseline": "fullstack",
    "security-compliance-roadmap": "fullstack",
    "data-security": "fullstack",
    "data-protection-assessment": "fullstack",
    "privacy-regulation-assessment": "fullstack",
    "threat-modeling": "fullstack",
    "backup-recovery": "fullstack",
    "monitoring-observability": "fullstack",
    "performance-tuning": "fullstack",
    "ci-cd-pipeline": "fullstack",
    "release-management": "fullstack",
    "mobile-ios": "fullstack",
    "mobile-android": "fullstack",
}


def update_skill_file(skill_dir):
    skill_name = os.path.basename(skill_dir)
    skill_md = os.path.join(skill_dir, "SKILL.md")
    
    if not os.path.exists(skill_md):
        return
    
    with open(skill_md, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has specialization
    if 'specialization:' in content:
        return
    
    if skill_name not in SPECIALIZATIONS:
        return
    
    lines = content.split('\n')
    new_lines = []
    frontmatter_end = False
    
    for i, line in enumerate(lines):
        if line.strip() == '---':
            if not frontmatter_end:
                frontmatter_end = True
                new_lines.append(line)
            else:
                # End of frontmatter - add specialization before this
                specialization = SPECIALIZATIONS.get(skill_name, "")
                if specialization:
                    new_lines.append(f"specialization: {specialization}")
                new_lines.append(line)
        else:
            new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    with open(skill_md, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  UPDATE: {skill_name} -> {SPECIALIZATIONS.get(skill_name, 'none')}")


def main():
    print("Adding specialization tags to skills...")
    
    for item in os.listdir(SKILLS_DIR):
        skill_dir = os.path.join(SKILLS_DIR, item)
        if os.path.isdir(skill_dir):
            update_skill_file(skill_dir)
    
    print("\nDone!")

if __name__ == "__main__":
    main()
