import os

SKILLS_DIR = r"C:\Dev\claude-add-notion-ai-prompt\skills"

NEXT_STEPS_TEMPLATES = {
    "ab-test-design": "Analyze results with cohort-analysis and iterate based on findings",
    "accessibility-review": "Address issues in your design with ui-patterns and wireframing",
    "agent-browser": "Use the agent for repetitive tasks and integrate with skill-orchestrator",
    "analyst-relations": "Execute analyst briefings and build relationships",
    "animation-motion": "Implement animations in your frontend with component-architecture",
    "api-design": "Implement APIs with tdd and set up ci-cd-pipeline",
    "architecture-design": "Proceed to api-design and data-modeling for implementation",
    "automation-framework": "Run automated tests in your ci-cd-pipeline",
    "backup-recovery": "Set up monitoring-observability to verify backup health",
    "business-case-modeling": "Use insights for roadmap-planning and stakeholder alignment",
    "channel-strategy": "Execute channels with paid-acquisition and content-strategy",
    "ci-cd-pipeline": "Deploy your application and set up release-management",
    "cloud-platforms": "Provision infrastructure with infrastructure-as-code",
    "cohort-analysis": "Use insights for kpi-tracking and iteration-planning",
    "community-building": "Engage community members and measure growth metrics",
    "competitor-research": "Apply insights to pricing-strategy and messaging-framework",
    "component-architecture": "Build components and integrate with state-management",
    "content-strategy": "Execute content plan and measure with launch-analytics",
    "data-modeling": "Implement database with schema-design and migration-planning",
    "data-protection-assessment": "Implement data security measures with data-security",
    "data-security": "Set up monitoring-observability to track security events",
    "data-visualization": "Create dashboards with metrics-dashboard-creation",
    "delivery-manager": "Coordinate delivery with release-management and scrum-master",
    "design-system": "Apply design system to all products with ui-patterns",
    "devils-advocate": "Address identified risks in your planning and execution",
    "devils-advocate-gtm": "Refine your GTM strategy based on identified risks",
    "edge-computing": "Deploy edge functions and optimize for latency",
    "feature-prioritization": "Generate user stories and plan sprints",
    "feedback-synthesis": "Create actionable insights for product improvements",
    "frontend-performance": "Optimize your app and set up monitoring",
    "funnel-analysis": "Identify bottlenecks and plan improvements with iteration-planning",
    "gap-analysis": "Create action plan to close gaps with feature-prioritization",
    "heuristic-evaluation": "Fix identified issues in your design",
    "information-architecture": "Create wireframes based on the IA",
    "infrastructure-as-code": "Deploy infrastructure and set up ci-cd-pipeline",
    "interview-guide-creation": "Conduct interviews and synthesize feedback",
    "iteration-planning": "Execute sprints and track progress with kpi-tracking",
    "kpi-tracking": "Monitor metrics and iterate based on data",
    "launch-analytics": "Use data to optimize GTM strategy",
    "launch-planning": "Execute launch and measure with launch-analytics",
    "messaging-framework": "Apply messaging across all channels",
    "metrics-dashboard-creation": "Build dashboards for ongoing monitoring",
    "migration-planning": "Execute migration with minimal downtime",
    "ml-llm-integration": "Integrate ML models into your application",
    "mobile-android": "Build and test your Android app",
    "mobile-ios": "Build and test your iOS app",
    "monitoring-observability": "Set up alerts and respond to incidents",
    "paid-acquisition": "Launch campaigns and optimize based on ROI",
    "partner-strategy": "Execute partnership outreach and manage relationships",
    "performance-tuning": "Optimize performance and set up ongoing monitoring",
    "pricing-launch": "Launch pricing and monitor metrics",
    "privacy-regulation-assessment": "Implement compliance measures",
    "process-mapping": "Optimize processes with automation-framework",
    "product-health-check": "Address findings and improve product metrics",
    "product-okrs": "Track progress and adjust based on results",
    "referral-program": "Launch and measure viral growth",
    "release-management": "Coordinate releases and monitor stability",
    "requirements-elicitation": "Prioritize requirements with feature-prioritization",
    "responsive-patterns": "Apply patterns to all breakpoints",
    "saas-metrics-analysis": "Use insights to improve metrics with kpi-tracking",
    "sales-enablement": "Equip sales team and track performance",
    "scale-readiness": "Address bottlenecks before scaling",
    "schema-design": "Implement database schema",
    "scrum-master": "Facilitate delivery with delivery-manager",
    "security-architecture-review": "Implement security measures",
    "security-compliance-roadmap": "Achieve compliance certifications",
    "security-requirements-baseline": "Implement security requirements",
    "seo-foundation": "Optimize content and build backlinks",
    "serverless-development": "Deploy serverless functions",
    "skill-orchestrator": "Run multi-skill workflows",
    "skill-reviewer": "Improve skills based on feedback",
    "stakeholder-analysis": "Engage stakeholders in planning",
    "state-management": "Implement state in your application",
    "survey-design": "Conduct surveys and synthesize feedback",
    "tdd": "Write tests and maintain code quality",
    "technical-readiness-pack": "Achieve technical readiness for launch",
    "test-strategy": "Execute test plan with automation-framework",
    "threat-modeling": "Implement threat mitigations",
    "ticket-refinement": "Ready stories for sprint planning",
    "ui-patterns": "Apply patterns in your design system",
    "usability-test-planning": "Conduct tests and fix issues",
    "user-journey-mapping": "Design improvements based on journey insights",
    "user-persona-creation": "Use personas for feature-prioritization",
    "user-story-generation": "Refine stories with ticket-refinement",
    "validation-pack": "Use insights to inform your product strategy",
    "webapp-testing": "Fix issues and ensure quality",
    "wireframing": "Create high-fidelity designs with ui-patterns",
}


def update_skill_nextsteps(skill_dir):
    skill_name = os.path.basename(skill_dir)
    skill_md = os.path.join(skill_dir, "SKILL.md")
    
    if not os.path.exists(skill_md):
        return
    
    with open(skill_md, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has nextSteps
    if 'nextSteps:' in content:
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
                # End of frontmatter - add nextSteps before this
                next_steps = NEXT_STEPS_TEMPLATES.get(skill_name, "Review output and determine next steps based on your goals")
                new_lines.append(f"nextSteps: {next_steps}")
                new_lines.append(line)
        else:
            new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    with open(skill_md, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  UPDATE: {skill_name}")


def main():
    print("Adding nextSteps to all skills...")
    
    for item in os.listdir(SKILLS_DIR):
        skill_dir = os.path.join(SKILLS_DIR, item)
        if os.path.isdir(skill_dir):
            update_skill_nextsteps(skill_dir)
    
    print("\nDone!")

if __name__ == "__main__":
    main()
