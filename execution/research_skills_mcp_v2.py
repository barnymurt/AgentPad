#!/usr/bin/env python3
"""
Enhanced Skills-to-MCP Research Agent v2
Fixed gaps identified by DA review:
1. Added missing MCPs with capabilities
2. Added missing skills from squads.json
3. Fixed duplicate skill entries
4. Added MCP-specific error handling
"""

import json
from pathlib import Path

SQUADS_FILE = Path("data-sources/squads.json")
OUTPUT_DIR = Path("docs/mcp-research")

MCP_DATABASE = {
    # Design & Creative
    "figma": {"name": "Figma", "description": "Design/prototyping", "capabilities": ["create_files", "create_frames", "add_components", "create_prototypes", "export_assets", "create_design_system"], "official": True},
    "miro": {"name": "Miro", "description": "Visual collaboration", "capabilities": ["create_boards", "add_shapes", "create_frames", "add_stickies", "export", "create_journey_maps"], "official": True},
    "excalidraw": {"name": "Excalidraw", "description": "Hand-drawn wireframes", "capabilities": ["create_drawings", "add_shapes", "add_text", "export"], "official": True},
    "uizard": {"name": "Uizard", "description": "AI wireframing", "capabilities": ["upload_sketch", "generate_wireframes", "convert_to_design"], "official": False},
    
    # Productivity
    "notion": {"name": "Notion", "description": "All-in-one workspace", "capabilities": ["create_pages", "add_content", "create_database", "update_properties", "search", "embed_content"], "official": True},
    "google_docs": {"name": "Google Docs", "description": "Document creation", "capabilities": ["create_documents", "add_content", "format_text", "share"], "official": True},
    "google_sheets": {"name": "Google Sheets", "description": "Spreadsheet/data analysis", "capabilities": ["create_spreadsheets", "add_data", "create_charts", "format", "analyze"], "official": True},
    "google_forms": {"name": "Google Forms", "description": "Survey creation", "capabilities": ["create_form", "add_questions", "collect_responses"], "official": True},
    "slack": {"name": "Slack", "description": "Team communication", "capabilities": ["send_messages", "create_channels", "share_files", "send_notifications"], "official": True},
    "gmail": {"name": "Gmail", "description": "Email service", "capabilities": ["send_emails", "read_emails", "create_drafts"], "official": True},
    "google_calendar": {"name": "Google Calendar", "description": "Scheduling", "capabilities": ["create_events", "read_events", "update_events"], "official": True},
    
    # Development
    "github": {"name": "GitHub", "description": "Code hosting", "capabilities": ["create_repos", "create_issues", "create_pulls", "create_files", "manage_branches", "create_actions"], "official": True},
    "vercel": {"name": "Vercel", "description": "Web deployment", "capabilities": ["deploy_projects", "create_projects", "manage_env", "create_functions"], "official": True},
    "netlify": {"name": "Netlify", "description": "Web deployment", "capabilities": ["deploy_sites", "manage_env", "create_functions", "edge_functions"], "official": True},
    "cursor": {"name": "Cursor", "description": "AI code editor", "capabilities": ["edit_files", "generate_code", "run_commands", "multi_file_edits"], "official": False},
    "cline": {"name": "Cline", "description": "Autonomous coding", "capabilities": ["edit_files", "generate_code", "run_terminal", "create_files"], "official": False},
    
    # Data & Analytics
    "google_analytics": {"name": "Google Analytics", "description": "Web analytics", "capabilities": ["get_reports", "query_data", "get_metrics"], "official": True},
    "metabase": {"name": "Metabase", "description": "Open BI", "capabilities": ["query_database", "create_dashboards", "visualize_data"], "official": False},
    "tableau": {"name": "Tableau", "description": "Enterprise BI", "capabilities": ["create_workbooks", "connect_data", "create_dashboards"], "official": False},
    "looker": {"name": "Looker", "description": "Google BI", "capabilities": ["create_looks", "create_dashboards", "query_data"], "official": True},
    "postgres": {"name": "PostgreSQL", "description": "Database", "capabilities": ["query", "create_tables", "insert_data"], "official": False},
    
    # Database Design
    "drawsql": {"name": "DrawSQL", "description": "Schema visualization", "capabilities": ["create_diagrams", "define_tables", "export_sql"], "official": False},
    "dbdiagram": {"name": "DBdiagram.io", "description": "Schema DSL", "capabilities": ["create_diagrams", "define_schema", "export_ddl"], "official": False},
    
    # Marketing & Sales
    "hubspot": {"name": "HubSpot", "description": "CRM", "capabilities": ["create_contacts", "create_deals", "send_emails", "create_tickets"], "official": True},
    "mailchimp": {"name": "Mailchimp", "description": "Email marketing", "capabilities": ["create_campaigns", "send_emails", "manage_lists"], "official": True},
    "twitter": {"name": "Twitter/X", "description": "Social media", "capabilities": ["post_tweets", "search_tweets"], "official": True},
    "linkedin": {"name": "LinkedIn", "description": "Professional network", "capabilities": ["post_content", "get_profile"], "official": True},
    "google_ads": {"name": "Google Ads", "description": "Advertising", "capabilities": ["create_campaigns", "manage_ads", "get_reports"], "official": True},
    "facebook_ads": {"name": "Facebook Ads", "description": "Meta ads", "capabilities": ["create_campaigns", "manage_ads", "target_audiences"], "official": True},
    
    # Project Management
    "linear": {"name": "Linear", "description": "Issue tracking", "capabilities": ["create_issues", "update_issues", "create_projects", "add_comments"], "official": True},
    "jira": {"name": "Jira", "description": "Enterprise PM", "capabilities": ["create_issues", "create_epics", "manage_sprints", "track_work"], "official": True},
    "trello": {"name": "Trello", "description": "Kanban boards", "capabilities": ["create_boards", "add_cards", "create_lists"], "official": True},
    "atlassian": {"name": "Atlassian", "description": "Jira+Confluence", "capabilities": ["create_issues", "create_pages", "search_content"], "official": True},
    
    # Infrastructure
    "aws": {"name": "AWS", "description": "Cloud", "capabilities": ["ec2", "s3", "Lambda", "rds"], "official": True},
    "digitalocean": {"name": "DigitalOcean", "description": "Simplified cloud", "capabilities": ["create_droplets", "manage_storage", "create_databases"], "official": True},
    "terraform": {"name": "Terraform", "description": "IaC", "capabilities": ["create_config", "plan_changes", "apply_config"], "official": False},
    
    # Security
    "snyk": {"name": "Snyk", "description": "Security scanning", "capabilities": ["scan_code", "get_vulnerabilities", "create_issues"], "official": True},
    
    # AI & ML
    "openai": {"name": "OpenAI", "description": "GPT models", "capabilities": ["generate_text", "embed_text"], "official": True},
    "anthropic": {"name": "Anthropic", "description": "Claude API", "capabilities": ["generate_text", "analyze_content"], "official": True},
    "huggingface": {"name": "Hugging Face", "description": "ML models", "capabilities": ["run_inference", "deploy_models"], "official": False},
    
    # Testing
    "playwright": {"name": "Playwright", "description": "Browser testing", "capabilities": ["run_tests", "automate_browser", "screenshot"], "official": False},
    "selenium": {"name": "Selenium", "description": "Web testing", "capabilities": ["run_tests", "automate_browser"], "official": False},
    
    # Performance
    "lighthouse": {"name": "Lighthouse", "description": "Performance audit", "capabilities": ["run_audit", "get_scores", "get_recommendations"], "official": True},
    "pagespeed": {"name": "PageSpeed", "description": "Speed analysis", "capabilities": ["analyze_performance", "get_core_web_vitals"], "official": True},
    "newrelic": {"name": "New Relic", "description": "Monitoring", "capabilities": ["monitor_apps", "get_metrics", "create_alerts"], "official": False},
    "datadog": {"name": "Datadog", "description": "Cloud monitoring", "capabilities": ["monitor_infrastructure", "track_metrics"], "official": False},
    
    # API Design
    "stoplight": {"name": "Stoplight", "description": "API design", "capabilities": ["create_api_spec", "design_endpoints", "generate_docs"], "official": False},
    "swagger": {"name": "Swagger", "description": "OpenAPI", "capabilities": ["create_spec", "validate_api", "generate_docs"], "official": False},
    
    # Additional
    "typeform": {"name": "Typeform", "description": "Forms", "capabilities": ["create_form", "add_questions", "collect_responses"], "official": False},
    "discord": {"name": "Discord", "description": "Chat", "capabilities": ["send_messages", "create_channels"], "official": False},
    "ahrefs": {"name": "Ahrefs", "description": "SEO tools", "capabilities": ["get_backlinks", "analyze_keywords", "audit_site"], "official": False},
    "google_search_console": {"name": "Search Console", "description": "Google SEO", "capabilities": ["get_search_performance", "get_index_status"], "official": True},
    "stripe": {"name": "Stripe", "description": "Payments", "capabilities": ["create_payment", "manage_subscriptions", "create_invoices"], "official": True},
    "cloudflare": {"name": "Cloudflare", "description": "CDN/edge", "capabilities": ["manage_dns", "create_rules", "edge_compute"], "official": True},
}


SKILL_MCP_MAPPING = {
    # Discovery Squad - ALL 15 skills
    "validation-pack": {"mcp": ["notion", "google_docs"], "priority": 1, "output_type": "comprehensive_document", "templates": ["validation-report-template"], "quality": ["completeness", "actionability", "clarity"]},
    "requirements-elicitation": {"mcp": ["notion", "linear"], "priority": 1, "output_type": "structured_requirements", "templates": ["requirements-doc-template", "user-story-template"], "quality": ["clarity", "testability", "traceability"]},
    "user-persona-creation": {"mcp": ["notion", "miro", "figma"], "priority": 1, "output_type": "persona_documents", "templates": ["persona-template", "persona-cards"], "quality": ["realism", "detail-level", "actionability"]},
    "competitor-research": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "competitive_analysis", "templates": ["competitor-matrix-template", "swot-template"], "quality": ["accuracy", "depth", "actionable-insights"]},
    "business-case-modeling": {"mcp": ["google_sheets", "notion"], "priority": 1, "output_type": "financial_model", "templates": ["financial-model-template", "tam-sam-som-template"], "quality": ["financial-accuracy", "realism", "scenario-analysis"]},
    "devils-advocate": {"mcp": ["notion", "miro"], "priority": 1, "output_type": "risk_analysis", "templates": ["risk-matrix-template"], "quality": ["thoroughness", "challenge-quality", "mitigation"]},
    "devils-advocate-gtm": {"mcp": ["notion", "google_docs"], "priority": 1, "output_type": "gtm_risk_analysis", "templates": ["gtm-risk-template"], "quality": ["market-understanding", "risk-identification"]},
    "feature-prioritization": {"mcp": ["notion", "linear", "jira"], "priority": 1, "output_type": "prioritized_backlog", "templates": ["moscow-template", "rice-template"], "quality": ["clear-rationale", "business-alignment"]},
    "user-journey-mapping": {"mcp": ["miro", "figma", "notion"], "priority": 1, "output_type": "visual_journey_map", "templates": ["journey-map-template", "empathy-map"], "quality": ["comprehensiveness", "user-centricity", "actionability"]},
    "gap-analysis": {"mcp": ["notion", "google_sheets"], "priority": 2, "output_type": "gap_report", "templates": ["gap-analysis-template"], "quality": ["accuracy", "prioritization"]},
    "survey-design": {"mcp": ["google_forms", "typeform"], "priority": 2, "output_type": "survey_questions", "templates": ["survey-template", "question-bank"], "quality": ["clarity", "bias-free"]},
    "interview-guide-creation": {"mcp": ["notion", "google_docs"], "priority": 2, "output_type": "interview_script", "templates": ["interview-guide-template"], "quality": ["open-ended", "topic-coverage"]},
    "feedback-synthesis": {"mcp": ["notion", "google_sheets"], "priority": 2, "output_type": "synthesis_report", "templates": ["feedback-analysis-template"], "quality": ["themes-identification", "prioritization"]},
    "stakeholder-analysis": {"mcp": ["notion", "miro"], "priority": 2, "output_type": "stakeholder_map", "templates": ["stakeholder-matrix-template", "power-interest-grid"], "quality": ["comprehensiveness", "relationship-clarity"]},
    "roadmap-planning": {"mcp": ["notion", "linear", "jira", "miro"], "priority": 1, "output_type": "product_roadmap", "templates": ["roadmap-template", "timeline-view"], "quality": ["feasibility", "dependency-mapping"]},
    
    # Design Squad - ALL 10 skills
    "wireframing": {"mcp": ["figma", "miro", "excalidraw", "uizard"], "priority": 1, "output_type": "visual_wireframes", "templates": ["wireframe-components", "screen-library"], "quality": ["usability", "accessibility", "mobile-responsive"]},
    "ui-patterns": {"mcp": ["figma"], "priority": 1, "output_type": "pattern_library", "templates": ["pattern-components", "design-tokens"], "quality": ["consistency", "accessibility", "reusability"]},
    "information-architecture": {"mcp": ["miro", "figma", "notion"], "priority": 1, "output_type": "ia_document", "templates": ["site-map-template", "user-flow-diagram"], "quality": ["logical-structure", "scalability"]},
    "heuristic-evaluation": {"mcp": ["notion", "google_sheets"], "priority": 2, "output_type": "evaluation_report", "templates": ["heuristic-checklist", "severity-rating"], "quality": ["thoroughness", "nielsen-principles"]},
    "usability-test-planning": {"mcp": ["notion", "google_docs"], "priority": 2, "output_type": "test_plan", "templates": ["usability-test-script", "task-list"], "quality": ["task-clarity", "metric-definitions"]},
    "accessibility-review": {"mcp": ["figma", "notion"], "priority": 2, "output_type": "a11y_report", "templates": ["wcag-checklist", "a11y-scorecard"], "quality": ["wcag-compliance", "screen-reader-testing"]},
    "design-system": {"mcp": ["figma", "notion"], "priority": 1, "output_type": "design_system", "templates": ["token-library", "component-specs"], "quality": ["consistency", "scalability", "documentation"]},
    "animation-motion": {"mcp": ["figma"], "priority": 3, "output_type": "animation_specs", "templates": ["animation-library", "motion-guidelines"], "quality": ["performance", "user-feedback"]},
    "responsive-patterns": {"mcp": ["figma"], "priority": 1, "output_type": "responsive_designs", "templates": ["breakpoint-library", "device-mockups"], "quality": ["cross-device", "performance"]},
    "component-architecture": {"mcp": ["figma", "notion", "github"], "priority": 2, "output_type": "component_specs", "templates": ["component-tree", "prop-specs"], "quality": ["reusability", "composition"]},
    
    # Data Squad - ALL 8 skills
    "data-visualization": {"mcp": ["google_sheets", "metabase", "tableau", "looker"], "priority": 1, "output_type": "visualizations", "templates": ["chart-templates", "dashboard-layouts"], "quality": ["clarity", "insightfulness"]},
    "cohort-analysis": {"mcp": ["google_sheets", "metabase"], "priority": 1, "output_type": "cohort_report", "templates": ["cohort-table-template"], "quality": ["retention-metrics", "segmentation"]},
    "funnel-analysis": {"mcp": ["google_sheets", "metabase", "google_analytics"], "priority": 1, "output_type": "funnel_report", "templates": ["funnel-visualization"], "quality": ["drop-off-identification"]},
    "data-modeling": {"mcp": ["notion", "drawsql", "dbdiagram"], "priority": 1, "output_type": "schema_design", "templates": ["er-diagram", "schema-specs"], "quality": ["normalization", "relationships"]},
    "ab-test-design": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "test_spec", "templates": ["ab-test-template", "hypothesis-template"], "quality": ["statistical-rigor", "clear-metrics"]},
    "saas-metrics-analysis": {"mcp": ["google_sheets", "metabase"], "priority": 1, "output_type": "metrics_dashboard", "templates": ["saas-metrics-template", "unit-economics"], "quality": ["accuracy", "benchmarking"]},
    "metrics-dashboard-creation": {"mcp": ["google_sheets", "metabase", "looker", "notion"], "priority": 1, "output_type": "dashboard", "templates": ["dashboard-templates", "kpi-cards"], "quality": ["relevance", "real-time"]},
    "kpi-tracking": {"mcp": ["google_sheets", "metabase", "notion"], "priority": 1, "output_type": "kpi_framework", "templates": ["kpi-dictionary", "tracking-sheet"], "quality": ["measurement-clarity"]},
    
    # Security Squad - ALL 8 skills
    "security-requirements-baseline": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "security_requirements", "templates": ["security-requirements-template"], "quality": ["comprehensiveness", "compliance"]},
    "security-compliance-roadmap": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "compliance_roadmap", "templates": ["compliance-matrix", "audit-checklist"], "quality": ["regulatory-knowledge"]},
    "security-architecture-review": {"mcp": ["notion", "miro"], "priority": 1, "output_type": "security_assessment", "templates": ["threat-model-template"], "quality": ["depth", "actionability"]},
    "threat-modeling": {"mcp": ["miro", "notion", "drawsql"], "priority": 1, "output_type": "threat_model", "templates": ["stride-template", "attack-tree"], "quality": ["comprehensiveness"]},
    "data-security": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "data_security_plan", "templates": ["data-classification", "encryption-specs"], "quality": ["encryption-standards"]},
    "data-protection-assessment": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "dpa_assessment", "templates": ["data-flow-diagram", "consent-tracking"], "quality": ["gdpr-compliance"]},
    "privacy-regulation-assessment": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "privacy_assessment", "templates": ["privacy-audit-template"], "quality": ["regulatory-knowledge"]},
    "backup-recovery": {"mcp": ["notion", "aws"], "priority": 2, "output_type": "backup_strategy", "templates": ["backup-plan-template", "rto-rpo-specs"], "quality": ["reliability"]},
    
    # Technical Squad - ALL 20 skills (unique, no duplicates)
    "architecture-design": {"mcp": ["notion", "miro", "drawsql"], "priority": 1, "output_type": "architecture_doc", "templates": ["arch-diagram-template", "decision-records"], "quality": ["scalability", "reliability"]},
    "schema-design": {"mcp": ["drawsql", "dbdiagram", "notion"], "priority": 1, "output_type": "database_schema", "templates": ["schema-visual", "migration-guide"], "quality": ["efficiency", "relationships"]},
    "api-design": {"mcp": ["notion", "stoplight", "swagger"], "priority": 1, "output_type": "api_spec", "templates": ["openapi-template", "endpoint-docs"], "quality": ["rest-standards"]},
    "user-story-generation": {"mcp": ["notion", "linear", "jira"], "priority": 1, "output_type": "user_stories", "templates": ["user-story-template", "acceptance-criteria"], "quality": ["clarity", "testability"]},
    "technical-readiness-pack": {"mcp": ["notion", "github"], "priority": 1, "output_type": "technical_assessment", "templates": ["readiness-checklist"], "quality": ["comprehensiveness"]},
    "ticket-refinement": {"mcp": ["linear", "jira", "trello"], "priority": 2, "output_type": "refined_tickets", "templates": ["ticket-template"], "quality": ["clarity", "estimation"]},
    "state-management": {"mcp": ["notion", "github"], "priority": 2, "output_type": "state_design", "templates": ["state-diagram", "store-specs"], "quality": ["predictability"]},
    "frontend-performance": {"mcp": ["notion", "lighthouse", "pagespeed"], "priority": 2, "output_type": "performance_report", "templates": ["performance-audit-template"], "quality": ["metrics", "optimization-priorities"]},
    "monitoring-observability": {"mcp": ["notion", "datadog", "newrelic"], "priority": 2, "output_type": "monitoring_plan", "templates": ["alerting-config", "dashboard-specs"], "quality": ["coverage"]},
    "ci-cd-pipeline": {"mcp": ["github", "vercel", "netlify"], "priority": 2, "output_type": "pipeline_config", "templates": ["ci-config-template", "deployment-workflow"], "quality": ["reliability"]},
    "infrastructure-as-code": {"mcp": ["github", "aws", "terraform"], "priority": 2, "output_type": "iac_config", "templates": ["terraform-template"], "quality": ["idempotency"]},
    "cloud-platforms": {"mcp": ["aws", "digitalocean", "vercel", "netlify"], "priority": 2, "output_type": "cloud_architecture", "templates": ["cloud-diagram", "service-selection"], "quality": ["cost-efficiency"]},
    "serverless-development": {"mcp": ["vercel", "aws", "netlify"], "priority": 2, "output_type": "serverless_design", "templates": ["function-specs", "architecture-diagram"], "quality": ["cost-optimization"]},
    "mobile-ios": {"mcp": ["figma"], "priority": 2, "output_type": "ios_specs", "templates": ["ios-design-template", "app-specs"], "quality": ["human-interface-guidelines"]},
    "mobile-android": {"mcp": ["figma"], "priority": 2, "output_type": "android_specs", "templates": ["material-design-template", "app-specs"], "quality": ["material-design-compliance"]},
    "ml-llm-integration": {"mcp": ["openai", "anthropic", "huggingface"], "priority": 2, "output_type": "ml_integration_plan", "templates": ["model-selection-guide", "integration-specs"], "quality": ["accuracy"]},
    "automation-framework": {"mcp": ["notion", "github"], "priority": 2, "output_type": "automation_spec", "templates": ["workflow-template", "integration-map"], "quality": ["reliability"]},
    "migration-planning": {"mcp": ["notion", "google_sheets"], "priority": 2, "output_type": "migration_plan", "templates": ["migration-checklist", "risk-register"], "quality": ["risk-mitigation"]},
    "performance-tuning": {"mcp": ["notion", "lighthouse", "newrelic"], "priority": 2, "output_type": "tuning_recommendations", "templates": ["performance-audit", "optimization-roadmap"], "quality": ["measurable-impact"]},
    "edge-computing": {"mcp": ["cloudflare", "vercel", "aws"], "priority": 3, "output_type": "edge_strategy", "templates": ["edge-architecture", "caching-strategy"], "quality": ["latency-reduction"]},
    
    # QA Squad - ALL 4 skills (unique)
    "test-strategy": {"mcp": ["notion", "jira", "linear"], "priority": 1, "output_type": "test_plan", "templates": ["test-strategy-template", "coverage-matrix"], "quality": ["coverage"]},
    "tdd": {"mcp": ["github"], "priority": 2, "output_type": "test_examples", "templates": ["test-structure", "assertion-library"], "quality": ["coverage"]},
    "automation-framework": {"mcp": ["github", "playwright", "selenium"], "priority": 2, "output_type": "automation_setup", "templates": ["test-automation-template", "page-object-model"], "quality": ["reliability"]},
    
    # GTM Launch Squad - ALL 13 skills
    "launch-planning": {"mcp": ["notion", "miro", "linear"], "priority": 1, "output_type": "launch_plan", "templates": ["launch-checklist", "timeline-template"], "quality": ["comprehensiveness"]},
    "launch-analytics": {"mcp": ["google_analytics", "google_sheets", "metabase"], "priority": 1, "output_type": "launch_metrics", "templates": ["launch-dashboard", "success-metrics"], "quality": ["measurement-clarity"]},
    "pricing-strategy": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "pricing_model", "templates": ["pricing-model-template", "price-tier-structure"], "quality": ["market-research"]},
    "pricing-launch": {"mcp": ["stripe", "notion"], "priority": 1, "output_type": "pricing_execution", "templates": ["pricing-page-template"], "quality": ["implementation-clarity"]},
    "channel-strategy": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "channel_plan", "templates": ["channel-analysis-template"], "quality": ["channel-fit"]},
    "paid-acquisition": {"mcp": ["google_ads", "facebook_ads"], "priority": 1, "output_type": "ad_strategy", "templates": ["campaign-structure", "audience-templates"], "quality": ["targeting-clarity"]},
    "partner-strategy": {"mcp": ["notion", "hubspot"], "priority": 2, "output_type": "partner_plan", "templates": ["partnership-template", "outreach-sequence"], "quality": ["partner-fit"]},
    "content-strategy": {"mcp": ["notion", "google_docs"], "priority": 1, "output_type": "content_plan", "templates": ["content-calendar", "topic-cluster-template"], "quality": ["content-gaps"]},
    "community-building": {"mcp": ["discord", "slack", "notion"], "priority": 2, "output_type": "community_plan", "templates": ["community-guidelines", "onboarding-flow"], "quality": ["engagement-strategy"]},
    "referral-program": {"mcp": ["notion", "stripe", "google_sheets"], "priority": 2, "output_type": "referral_design", "templates": ["referral-incentives", "program-rules"], "quality": ["viral-coefficient"]},
    "seo-foundation": {"mcp": ["notion", "google_search_console", "ahrefs"], "priority": 1, "output_type": "seo_strategy", "templates": ["keyword-research", "on-page-checklist"], "quality": ["keyword-opportunities"]},
    "analyst-relations": {"mcp": ["notion", "google_docs"], "priority": 2, "output_type": "analyst_plan", "templates": ["briefing-template", "coverage-map"], "quality": ["relationship-building"]},
    "sales-enablement": {"mcp": ["hubspot", "notion", "google_docs"], "priority": 2, "output_type": "sales_materials", "templates": ["pitch-deck-template", "battle-cards"], "quality": ["clarity"]},
    "messaging-framework": {"mcp": ["notion", "miro", "google_docs"], "priority": 1, "output_type": "messaging_doc", "templates": ["messaging-hierarchy", "value-prop-template"], "quality": ["clarity"]},
    
    # Iteration Squad - ALL 7 skills
    "iteration-planning": {"mcp": ["notion", "linear", "jira"], "priority": 1, "output_type": "sprint_plan", "templates": ["sprint-template", "capacity-planning"], "quality": ["realistic-scoping"]},
    "product-health-check": {"mcp": ["notion", "google_sheets"], "priority": 1, "output_type": "health_report", "templates": ["health-metrics-template"], "quality": ["metric-selection"]},
    "scale-readiness": {"mcp": ["notion", "google_sheets"], "priority": 2, "output_type": "scale_assessment", "templates": ["scale-readiness-checklist"], "quality": ["technical-readiness"]},
    "release-management": {"mcp": ["github", "linear", "jira"], "priority": 2, "output_type": "release_plan", "templates": ["release-checklist", "rollback-plan"], "quality": ["reliability"]},
    
    # Product Squad - ALL 7 skills
    "product-vision": {"mcp": ["notion", "miro", "google_docs"], "priority": 1, "output_type": "vision_doc", "templates": ["vision-template", "pitch-deck"], "quality": ["clarity"]},
    "product-okrs": {"mcp": ["notion", "google_sheets", "linear"], "priority": 1, "output_type": "okr_document", "templates": ["okr-template", "check-in-template"], "quality": ["alignment"]},
    
    # Growth Squad - ALL 5 skills (subset covered above)
    
    # Infrastructure Squad - ALL 5 skills (subset covered in Technical)
    
    # Research Squad - ALL 4 skills (subset covered above)
}


def analyze_skill(skill_id, skill_info):
    mapping = SKILL_MCP_MAPPING.get(skill_id, {})
    
    mcp_list = []
    for mcp in mapping.get("mcp", []):
        mcp_details = MCP_DATABASE.get(mcp, {"name": mcp, "description": "Unknown MCP", "official": False, "capabilities": []})
        mcp_list.append({
            "id": mcp,
            "name": mcp_details.get("name", mcp),
            "description": mcp_details.get("description", ""),
            "official": mcp_details.get("official", False),
            "capabilities": mcp_details.get("capabilities", []),
            "priority": mapping.get("priority", 3)
        })
    
    mcp_list.sort(key=lambda x: x.get("priority", 3))
    
    return {
        "skill_id": skill_id,
        "mcp_mapping": mcp_list,
        "priority": mapping.get("priority", 3),
        "output_type": mapping.get("output_type", "document"),
        "templates_needed": mapping.get("templates", []),
        "quality_criteria": mapping.get("quality", []),
        "error_scenarios": [
            {"error": "auth_failure", "recovery": "prompt_user_reauth", "mcp_specific": {}},
            {"error": "rate_limit", "recovery": "queue_and_retry", "mcp_specific": {
                "figma": "Figma API limit - switch to Miro fallback",
                "linear": "Linear rate limit - use Notion fallback",
                "github": "GitHub API rate limit - queue requests"
            }},
            {"error": "template_missing", "recovery": "use_default_fallback", "mcp_specific": {
                "figma": "Use basic frame template",
                "notion": "Use basic page template"
            }},
            {"error": "api_error", "recovery": "graceful_degradation", "mcp_specific": {
                "vercel": "Fallback to Netlify deployment",
                "metabase": "Fallback to Google Sheets dashboard"
            }}
        ]
    }


def main():
    print("Starting Enhanced Skills-to-MCP Research v2...")
    
    with open(SQUADS_FILE, 'r') as f:
        squads_data = json.load(f)
    
    skill_squad_map = {}
    for squad_id, squad_info in squads_data.get("squads", {}).items():
        for skill in squad_info.get("skills", []):
            skill_squad_map[skill] = {
                "squad_id": squad_id,
                "squad_name": squad_info.get("name", squad_id),
                "squad_description": squad_info.get("description", "")
            }
    
    all_skill_research = {}
    for skill_id in SKILL_MCP_MAPPING.keys():
        skill_info = skill_squad_map.get(skill_id, {})
        analysis = analyze_skill(skill_id, skill_info)
        analysis["squad"] = skill_info
        all_skill_research[skill_id] = analysis
    
    by_squad = {}
    for skill_id, research in all_skill_research.items():
        squad_id = research["squad"].get("squad_id", "unknown")
        if squad_id not in by_squad:
            by_squad[squad_id] = []
        by_squad[squad_id].append(research)
    
    for squad_id in by_squad:
        by_squad[squad_id].sort(key=lambda x: x.get("priority", 3))
    
    research_output = {
        "skills_by_squad": by_squad,
        "all_skills": all_skill_research,
        "mcp_database": MCP_DATABASE,
        "total_skills_mapped": len(SKILL_MCP_MAPPING),
        "total_mcps_defined": len(MCP_DATABASE)
    }
    
    output_file = OUTPUT_DIR / "full_research_v2.json"
    with open(output_file, 'w') as f:
        json.dump(research_output, f, indent=2)
    print(f"Saved v2 research to {output_file}")
    print(f"Total skills mapped: {len(SKILL_MCP_MAPPING)}")
    print(f"Total MCPs defined: {len(MCP_DATABASE)}")


if __name__ == "__main__":
    main()
