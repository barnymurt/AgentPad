import os
import re

SKILLS_DIR = r"C:\Dev\claude-add-notion-ai-prompt\skills"

# Map of skill -> output summary (what the skill generates)
OUTPUT_SUMMARIES = {
    "ab-test-design": "A/B test design with hypothesis, variables, sample size calculation, and success metrics",
    "accessibility-review": "Accessibility audit with WCAG compliance checklist and remediation recommendations",
    "agent-browser": "Browser automation agent configuration and task definitions",
    "analyst-relations": "Analyst engagement strategy and briefing materials",
    "animation-motion": "Animation and motion design specifications for UI components",
    "api-design": "REST API specification with endpoints, schemas, and authentication",
    "architecture-design": "System architecture diagram with components, data flows, and tech stack",
    "automation-framework": "Test automation framework setup with test scripts and CI/CD integration",
    "backup-recovery": "Backup strategy and disaster recovery plan",
    "business-case-modeling": "Business case with financial projections and ROI analysis",
    "channel-strategy": "Go-to-market channel strategy with channel mix recommendations",
    "ci-cd-pipeline": "CI/CD pipeline configuration with build, test, and deployment scripts",
    "cloud-platforms": "Cloud platform comparison and infrastructure recommendations",
    "cohort-analysis": "Cohort analysis report with retention curves and insights",
    "community-building": "Community building strategy with engagement tactics",
    "competitor-research": "Competitive landscape analysis with feature comparison and positioning",
    "component-architecture": "Frontend component architecture with component hierarchy and state management",
    "content-strategy": "Content strategy with topics, formats, and distribution plan",
    "data-modeling": "Database schema design with tables, relationships, and indexes",
    "data-protection-assessment": "Data protection impact assessment with compliance recommendations",
    "data-security": "Data security plan with encryption, access controls, and compliance",
    "data-visualization": "Data visualization dashboard with charts and metrics",
    "delivery-manager": "Delivery management plan with sprint coordination and stakeholder management",
    "design-system": "Design system documentation with components, tokens, and usage guidelines",
    "devils-advocate": "Critical analysis identifying risks and weaknesses in your approach",
    "devils-advocate-gtm": "GTM critique with market risks and positioning concerns",
    "edge-computing": "Edge computing architecture with latency optimization",
    "feature-prioritization": "Ranked feature backlog with ICE/RICE scores and build tiers",
    "feedback-synthesis": "Synthesized user feedback themes with actionable insights",
    "frontend-performance": "Performance optimization recommendations with metrics and benchmarks",
    "funnel-analysis": "Conversion funnel analysis with bottleneck identification",
    "gap-analysis": "Gap analysis with current state, desired state, and recommendations",
    "heuristic-evaluation": "UX heuristic evaluation with usability issues and severity ratings",
    "information-architecture": "Information architecture with site map and user flows",
    "infrastructure-as-code": "Infrastructure as code scripts with Terraform/CloudFormation configurations",
    "interview-guide-creation": "User interview guide with questions and facilitation tips",
    "iteration-planning": "Sprint planning document with story point estimates and velocity",
    "kpi-tracking": "KPI tracking framework with metrics dashboard and alerts",
    "launch-analytics": "Launch analytics setup with key metrics and tracking plan",
    "launch-planning": "Launch timeline with milestones, owners, and go/no-go criteria",
    "messaging-framework": "Messaging framework with value proposition and key messages",
    "metrics-dashboard-creation": "Metrics dashboard design with charts and visualization specs",
    "migration-planning": "System migration plan with timeline and risk mitigation",
    "ml-llm-integration": "ML/LLM integration architecture with model selection and API design",
    "mobile-android": "Android app architecture with Jetpack components and patterns",
    "mobile-ios": "iOS app architecture with SwiftUI/UIKit patterns",
    "monitoring-observability": "Monitoring and observability setup with alerts and dashboards",
    "paid-acquisition": "Paid acquisition strategy with channel recommendations and budget allocation",
    "partner-strategy": "Partnership strategy with partner identification and engagement plan",
    "performance-tuning": "Performance optimization report with bottlenecks and solutions",
    "pricing-launch": "Pricing launch plan with rollout timeline and communication plan",
    "pricing-strategy": "Pricing model recommendation with tier structure and LTV/CAC analysis",
    "privacy-regulation-assessment": "Privacy compliance assessment with GDPR/CCPA requirements",
    "process-mapping": "Business process maps with workflows and optimization opportunities",
    "product-health-check": "Product health assessment with metrics and recommendations",
    "product-okrs": "OKR framework with objectives, key results, and measurement plan",
    "product-vision": "Product vision statement, mission, and market positioning",
    "referral-program": "Referral program design with incentives and viral mechanics",
    "release-management": "Release management process with deployment schedule and rollback plans",
    "requirements-elicitation": "Product requirements document with user stories and acceptance criteria",
    "responsive-patterns": "Responsive design patterns for mobile, tablet, and desktop",
    "roadmap-planning": "Phased roadmap with milestones, dependencies, and timeline",
    "saas-metrics-analysis": "SaaS metrics analysis with MRR, churn, and LTV insights",
    "sales-enablement": "Sales enablement materials with pitch deck and battle cards",
    "scale-readiness": "Scalability assessment with bottlenecks and remediation plan",
    "schema-design": "Database schema design with tables and relationships",
    "scrum-master": "Scrum ceremonies facilitation guide and team health recommendations",
    "security-architecture-review": "Security architecture review with threat assessment",
    "security-compliance-roadmap": "Security compliance roadmap with certification timeline",
    "security-requirements-baseline": "Security requirements document with compliance checklist",
    "seo-foundation": "SEO strategy with keyword research and on-page optimization",
    "serverless-development": "Serverless architecture design with Lambda function specs",
    "skill-orchestrator": "Multi-skill orchestration plan with workflow definitions",
    "skill-reviewer": "Skill review with quality assessment and improvement recommendations",
    "stakeholder-analysis": "Stakeholder map with influence/interest grid and engagement plan",
    "state-management": "State management architecture with Redux/Context specs",
    "survey-design": "User survey design with questions and sampling strategy",
    "tdd": "Test-driven development setup with test patterns and code examples",
    "technical-readiness-pack": "Technical readiness checklist with architecture sign-off",
    "test-strategy": "Test strategy document with testing approach and coverage goals",
    "threat-modeling": "Threat model with security risks and mitigation strategies",
    "ticket-refinement": "Refined user stories with acceptance criteria and point estimates",
    "ui-patterns": "UI pattern library with component specifications",
    "usability-test-planning": "Usability test plan with tasks, scenarios, and metrics",
    "user-journey-mapping": "User journey maps with touchpoints and pain points",
    "user-persona-creation": "User persona cards with demographics, goals, and pain points",
    "user-story-generation": "User stories with acceptance criteria and story points",
    "validation-pack": "Comprehensive validation report with market and product insights",
    "webapp-testing": "Web app testing strategy with test cases and automation scripts",
    "wireframing": "Wireframe designs with layout and component specifications",
}

# Map of skill -> related skills to run after
RELATED_AFTER = {
    # Discovery skills
    "product-vision": "competitor-research,user-persona-creation",
    "user-persona-creation": "user-journey-mapping,feature-prioritization",
    "competitor-research": "pricing-strategy,messaging-framework",
    "requirements-elicitation": "feature-prioritization,user-story-generation",
    "interview-guide-creation": "feedback-synthesis,user-persona-creation",
    "feedback-synthesis": "user-persona-creation,feature-prioritization",
    "stakeholder-analysis": "roadmap-planning,messaging-framework",
    "gap-analysis": "feature-prioritization,roadmap-planning",
    "devils-advocate": "feature-prioritization,roadmap-planning",
    "business-case-modeling": "roadmap-planning,pricing-strategy",
    
    # Build skills  
    "feature-prioritization": "user-story-generation,roadmap-planning",
    "roadmap-planning": "launch-planning,iteration-planning",
    "product-okrs": "kpi-tracking,iteration-planning",
    "iteration-planning": "release-management,kpi-tracking",
    "messaging-framework": "launch-planning,content-strategy",
    "pricing-strategy": "pricing-launch,messaging-framework",
    "usability-test-planning": "feedback-synthesis,heuristic-evaluation",
    "heuristic-evaluation": "wireframing,usability-test-planning",
    "information-architecture": "wireframing,user-journey-mapping",
    "wireframing": "ui-patterns,design-system",
    "ui-patterns": "design-system,responsive-patterns",
    "responsive-patterns": "design-system,frontend-performance",
    "design-system": "component-architecture,frontend-performance",
    "user-story-generation": "ticket-refinement,tdd",
    "ticket-refinement": "sprint-planning,release-management",
    "architecture-design": "api-design,data-modeling",
    "api-design": "tdd,ci-cd-pipeline",
    "schema-design": "data-modeling,migration-planning",
    "state-management": "component-architecture,frontend-performance",
    "component-architecture": "tdd,frontend-performance",
    "tdd": "ci-cd-pipeline,test-strategy",
    "test-strategy": "automation-framework,ci-cd-pipeline",
    "technical-readiness-pack": "release-management,security-architecture-review",
    "security-requirements-baseline": "security-architecture-review,threat-modeling",
    "security-architecture-review": "threat-modeling,security-compliance-roadmap",
    "security-compliance-roadmap": "data-protection-assessment,privacy-regulation-assessment",
    "privacy-regulation-assessment": "data-protection-assessment,security-architecture-review",
    "data-protection-assessment": "data-security,privacy-regulation-assessment",
    "data-modeling": "migration-planning,schema-design",
    "threat-modeling": "security-requirements-baseline,data-security",
    "process-mapping": "automation-framework,workflow-design",
    "data-security": "backup-recovery,monitoring-observability",
    "migration-planning": "data-modeling,infrastructure-as-code",
    "infrastructure-as-code": "ci-cd-pipeline,cloud-platforms",
    "serverless-development": "ml-llm-integration,edge-computing",
    "mobile-ios": "mobile-android,responsive-patterns",
    "mobile-android": "mobile-ios,responsive-patterns",
    "edge-computing": "serverless-development,performance-tuning",
    "cloud-platforms": "infrastructure-as-code,serverless-development",
    "ml-llm-integration": "serverless-development,api-design",
    "automation-framework": "ci-cd-pipeline,tdd",
    "ci-cd-pipeline": "release-management,monitoring-observability",
    "performance-tuning": "frontend-performance,monitoring-observability",
    "monitoring-observability": "performance-tuning,alerting-setup",
    "release-management": "ci-cd-pipeline,monitoring-observability",
    "scrum-master": "delivery-manager,iteration-planning",
    "delivery-manager": "scrum-master,release-management",
    "skill-reviewer": "skill-orchestrator,skill-improvement",
    "skill-orchestrator": "skill-reviewer,execution-planning",
    "agent-browser": "skill-orchestrator,automation-framework",
    "product-health-check": "kpi-tracking,cohort-analysis",
    "validation-pack": "product-vision,feature-prioritization",
    "scale-readiness": "performance-tuning,cloud-platforms",
    "webapp-testing": "automation-framework,security-requirements-baseline",
    
    # Launch skills
    "pricing-launch": "launch-analytics,paid-acquisition",
    "launch-planning": "launch-analytics,paid-acquisition",
    "launch-analytics": "cohort-analysis,funnel-analysis",
    "channel-strategy": "paid-acquisition,content-strategy",
    "paid-acquisition": "referral-program,community-building",
    "referral-program": "community-building,paid-acquisition",
    "community-building": "content-strategy,analyst-relations",
    "sales-enablement": "messaging-framework,channel-strategy",
    "partner-strategy": "channel-strategy,sales-enablement",
    "analyst-relations": "content-strategy,pr-strategy",
    "content-strategy": "seo-foundation,paid-acquisition",
    "seo-foundation": "content-strategy,paid-acquisition",
    "devils-advocate-gtm": "channel-strategy,messaging-framework",
    
    # Iterate skills
    "ab-test-design": "cohort-analysis,funnel-analysis",
    "cohort-analysis": "saas-metrics-analysis,kpi-tracking",
    "funnel-analysis": "kpi-tracking,cohort-analysis",
    "saas-metrics-analysis": "kpi-tracking,cohort-analysis",
    "kpi-tracking": "metrics-dashboard-creation,iteration-planning",
    "metrics-dashboard-creation": "kpi-tracking,data-visualization",
    "data-visualization": "metrics-dashboard-creation,kpi-tracking",
    "survey-design": "feedback-synthesis,cohort-analysis",
}

# Map of skill -> related skills to run before
RELATED_BEFORE = {v: k for k, v in RELATED_AFTER.items()}


def update_skill_file(skill_dir):
    skill_name = os.path.basename(skill_dir)
    skill_md = os.path.join(skill_dir, "SKILL.md")
    
    if not os.path.exists(skill_md):
        return
    
    with open(skill_md, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has outputSummary
    if 'outputSummary:' in content:
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
                # End of frontmatter - add our fields before this
                # Add outputSummary
                output_summary = OUTPUT_SUMMARIES.get(skill_name, "Structured output specific to this skill type")
                new_lines.append(f"outputSummary: {output_summary}")
                
                # Add relatedBefore
                related_before = RELATED_BEFORE.get(skill_name, "")
                if related_before:
                    new_lines.append(f"relatedBefore: {related_before}")
                
                # Add relatedAfter  
                related_after = RELATED_AFTER.get(skill_name, "")
                if related_after:
                    new_lines.append(f"relatedAfter: {related_after}")
                
                new_lines.append(line)
        else:
            new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    with open(skill_md, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  UPDATE: {skill_name}")


def main():
    print("Adding outputSummary, relatedBefore, relatedAfter to all skills...")
    
    for item in os.listdir(SKILLS_DIR):
        skill_dir = os.path.join(SKILLS_DIR, item)
        if os.path.isdir(skill_dir):
            update_skill_file(skill_dir)
    
    print("\nDone!")

if __name__ == "__main__":
    main()
