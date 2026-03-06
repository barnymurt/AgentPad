#!/usr/bin/env python3
"""
Skills-to-MCP Research Agent

This script analyzes all skills and researches relevant MCPs/services
for each skill, creating a comprehensive mapping document.
"""

import json
import os
from pathlib import Path

SKILLS_DIR = Path("skills")
SQUADS_FILE = Path("data-sources/squads.json")
OUTPUT_DIR = Path("docs/mcp-research")

MCP_DATABASE = {
    # Design & Creative
    "figma": {
        "name": "Figma",
        "description": "Design and prototyping tool - create wireframes, UI designs, prototypes",
        "capabilities": ["create_files", "create_frames", "add_components", "create_prototypes", "export_assets"],
        "official": True,
        "use_cases": ["wireframing", "ui-design", "prototyping", "design-systems"]
    },
    "miro": {
        "name": "Miro",
        "description": "Visual collaboration whiteboard - brainstorming, wireframing, mapping",
        "capabilities": ["create_boards", "add_shapes", "create_frames", "add_stickies", "export"],
        "official": True,
        "use_cases": ["wireframing", "brainstorming", "user-journey-mapping", "process-mapping"]
    },
    "excalidraw": {
        "name": "Excalidraw",
        "description": "Hand-drawn style virtual whiteboard - quick wireframes and diagrams",
        "capabilities": ["create_drawings", "add_shapes", "add_text", "export"],
        "official": True,
        "use_cases": ["wireframing", "diagrams", "quick-prototyping"]
    },
    
    # Productivity & Docs
    "notion": {
        "name": "Notion",
        "description": "All-in-one workspace - docs, databases, wikis, project management",
        "capabilities": ["create_pages", "add_content", "create_database", "update_properties", "search"],
        "official": True,
        "use_cases": ["requirements-docs", "product-specs", "meeting-notes", "roadmaps", "user-personas"]
    },
    "google-docs": {
        "name": "Google Docs",
        "description": "Document creation and editing",
        "capabilities": ["create_documents", "add_content", "format_text", "share"],
        "official": True,
        "use_cases": ["requirements-docs", "business-cases", "reports"]
    },
    "google-sheets": {
        "name": "Google Sheets",
        "description": "Spreadsheet creation and data analysis",
        "capabilities": ["create_spreadsheets", "add_data", "create_charts", "format", "analyze"],
        "official": True,
        "use_cases": ["metrics-dashboards", "financial-models", "data-analysis", "kpi-tracking"]
    },
    "slack": {
        "name": "Slack",
        "description": "Team communication and notifications",
        "capabilities": ["send_messages", "create_channels", "share_files"],
        "official": True,
        "use_cases": ["team-notifications", "status-updates"]
    },
    
    # Development
    "github": {
        "name": "GitHub",
        "description": "Code hosting and collaboration",
        "capabilities": ["create_repos", "create_issues", "create_pulls", "create_files", "manage_branches"],
        "official": True,
        "use_cases": ["code-repos", "issue-tracking", "documentation", "ci-cd-setup"]
    },
    "vercel": {
        "name": "Vercel",
        "description": "Frontend cloud platform - deployment and serverless functions",
        "capabilities": ["deploy_projects", "create_projects", "manage_env", "create_functions"],
        "official": True,
        "use_cases": ["web-deployment", "preview-urls", "serverless-functions"]
    },
    "netlify": {
        "name": "Netlify",
        "description": "Web deployment and Jamstack platform",
        "capabilities": ["deploy_sites", "manage_env", "create_functions", "form-handling"],
        "official": True,
        "use_cases": ["web-deployment", "static-sites", "forms"]
    },
    
    # Data & Analytics
    "google-analytics": {
        "name": "Google Analytics",
        "description": "Web analytics and user behavior tracking",
        "capabilities": ["get_reports", "query_data", "get_metrics"],
        "official": True,
        "use_cases": ["analytics", "user-behavior", "funnel-analysis"]
    },
    "postgres": {
        "name": "PostgreSQL",
        "description": "Relational database",
        "capabilities": ["query", "create_tables", "insert_data", "manage_schema"],
        "official": False,
        "use_cases": ["data-storage", "analytics", "reporting"]
    },
    
    # Marketing & Sales
    "hubspot": {
        "name": "HubSpot",
        "description": "CRM, marketing automation, sales tools",
        "capabilities": ["create_contacts", "create_deals", "send_emails", "create_tickets"],
        "official": True,
        "use_cases": ["crm", "email-campaigns", "lead-tracking", "sales-pipeline"]
    },
    "mailchimp": {
        "name": "Mailchimp",
        "description": "Email marketing platform",
        "capabilities": ["create_campaigns", "send_emails", "manage_lists", "get_analytics"],
        "official": True,
        "use_cases": ["email-marketing", "newsletters", "automations"]
    },
    "twitter": {
        "name": "Twitter/X",
        "description": "Social media platform",
        "capabilities": ["post_tweets", "search_tweets", "get_user_info"],
        "official": True,
        "use_cases": ["social-media", "announcements", "engagement"]
    },
    "linkedin": {
        "name": "LinkedIn",
        "description": "Professional network API",
        "capabilities": ["post_content", "get_profile"],
        "official": True,
        "use_cases": ["professional-networking", "b2b-marketing"]
    },
    
    # Communication
    "gmail": {
        "name": "Gmail",
        "description": "Email service",
        "capabilities": ["send_emails", "read_emails", "create_drafts"],
        "official": True,
        "use_cases": ["email-communications", "outreach"]
    },
    "google-calendar": {
        "name": "Google Calendar",
        "description": "Calendar and scheduling",
        "capabilities": ["create_events", "read_events", "update_events"],
        "official": True,
        "use_cases": ["meeting-scheduling", "reminders"]
    },
    
    # Infrastructure
    "aws": {
        "name": "AWS",
        "description": "Cloud infrastructure and services",
        "capabilities": ["ec2", "s3", "lambda", "rds", "iam"],
        "official": True,
        "use_cases": ["cloud-hosting", "serverless", "storage", "databases"]
    },
    "digitalocean": {
        "name": "DigitalOcean",
        "description": "Cloud infrastructure simplified",
        "capabilities": ["create_droplets", "manage_storage", "create_databases"],
        "official": True,
        "use_cases": ["cloud-hosting", "vps", "managed-databases"]
    },
    
    # Security
    "snyk": {
        "name": "Snyk",
        "description": "Security vulnerability scanning",
        "capabilities": ["scan_code", "get_vulnerabilities", "create_issues"],
        "official": True,
        "use_cases": ["security-scanning", "vulnerability-management"]
    },
    
    # Project Management
    "linear": {
        "name": "Linear",
        "description": "Issue tracking and project management",
        "capabilities": ["create_issues", "update_issues", "create_projects", "add_comments"],
        "official": True,
        "use_cases": ["issue-tracking", "project-management", "sprint-planning"]
    },
    "jira": {
        "name": "Jira",
        "description": "Enterprise project and issue tracking",
        "capabilities": ["create_issues", "create_epics", "manage_sprints", "track_work"],
        "official": True,
        "use_cases": ["enterprise-pm", "agile-tracking", "roadmapping"]
    },
    "trello": {
        "name": "Trello",
        "description": "Visual project management with boards",
        "capabilities": ["create_boards", "add_cards", "create_lists", "move_cards"],
        "official": True,
        "use_cases": ["kanban", "simple-pm", "task-tracking"]
    },
    
    # Payments
    "stripe": {
        "name": "Stripe",
        "description": "Payment processing",
        "capabilities": ["create_payment", "manage_subscriptions", "webhooks"],
        "official": True,
        "use_cases": ["payment-processing", "subscriptions", "invoicing"]
    },
    
    # Search
    "algolia": {
        "name": "Algolia",
        "description": "Search and discovery platform",
        "capabilities": ["index_data", "search", "configure_facets"],
        "official": True,
        "use_cases": ["site-search", "product-search", "autocomplete"]
    },
}

SKILL_MCP_MAPPING = {
    # Discovery Squad
    "validation-pack": {
        "mcp": ["notion", "google-docs"],
        "priority": 1,
        "output_type": "comprehensive_document",
        "templates": ["validation-report-template"],
        "quality": ["completeness", "actionability", "clarity"]
    },
    "requirements-elicitation": {
        "mcp": ["notion", "linear", "jira"],
        "priority": 1,
        "output_type": "structured_requirements",
        "templates": ["requirements-doc-template", "user-story-template"],
        "quality": ["clarity", "testability", "traceability"]
    },
    "user-persona-creation": {
        "mcp": ["notion", "miro", "figma"],
        "priority": 1,
        "output_type": "persona_documents",
        "templates": ["persona-template", "persona-cards"],
        "quality": ["realism", "detail-level", "actionability"]
    },
    "competitor-research": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "competitive_analysis",
        "templates": ["competitor-matrix-template", "swot-template"],
        "quality": ["accuracy", "depth", "actionable-insights"]
    },
    "business-case-modeling": {
        "mcp": ["google-sheets", "notion"],
        "priority": 1,
        "output_type": "financial_model",
        "templates": ["financial-model-template", "tam-sam-som-template"],
        "quality": ["financial-accuracy", "realism", "scenario-analysis"]
    },
    "devils-advocate": {
        "mcp": ["notion", "miro"],
        "priority": 1,
        "output_type": "risk_analysis",
        "templates": ["risk-matrix-template"],
        "quality": ["thoroughness", "challenge-quality", "mitigation"]
    },
    "devils-advocate-gtm": {
        "mcp": ["notion", "google-docs"],
        "priority": 1,
        "output_type": "gtm_risk_analysis",
        "templates": ["gtm-risk-template"],
        "quality": ["market-understanding", "risk-identification"]
    },
    "feature-prioritization": {
        "mcp": ["notion", "linear", "jira", "trello"],
        "priority": 1,
        "output_type": "prioritized_backlog",
        "templates": ["moSCoW-template", "rIce-template", "kanban-board"],
        "quality": ["clear-rationale", "business-alignment"]
    },
    "user-journey-mapping": {
        "mcp": ["miro", "figma", "notion"],
        "priority": 1,
        "output_type": "visual_journey_map",
        "templates": ["journey-map-template", "empathy-map"],
        "quality": ["comprehensiveness", "user-centricity", "actionability"]
    },
    "gap-analysis": {
        "mcp": ["notion", "google-sheets"],
        "priority": 2,
        "output_type": "gap_report",
        "templates": ["gap-analysis-template"],
        "quality": ["accuracy", "prioritization"]
    },
    "survey-design": {
        "mcp": ["google-forms", "typeform"],
        "priority": 2,
        "output_type": "survey_questions",
        "templates": ["survey-template", "question-bank"],
        "quality": ["clarity", "bias-free", "actionable-results"]
    },
    "interview-guide-creation": {
        "mcp": ["notion", "google-docs"],
        "priority": 2,
        "output_type": "interview_script",
        "templates": ["interview-guide-template"],
        "quality": ["open-ended", "topic-coverage"]
    },
    "feedback-synthesis": {
        "mcp": ["notion", "google-sheets"],
        "priority": 2,
        "output_type": "synthesis_report",
        "templates": ["feedback-analysis-template"],
        "quality": ["themes-identification", "prioritization"]
    },
    "stakeholder-analysis": {
        "mcp": ["notion", "miro"],
        "priority": 2,
        "output_type": "stakeholder_map",
        "templates": ["stakeholder-matrix-template", "power-interest-grid"],
        "quality": ["comprehensiveness", "relationship-clarity"]
    },
    "roadmap-planning": {
        "mcp": ["notion", "linear", "jira", "miro"],
        "priority": 1,
        "output_type": "product_roadmap",
        "templates": ["roadmap-template", "timeline-view"],
        "quality": ["feasibility", "dependency-mapping", "milestone-clarity"]
    },
    
    # Design Squad
    "wireframing": {
        "mcp": ["figma", "miro", "excalidraw"],
        "priority": 1,
        "output_type": "visual_wireframes",
        "templates": ["wireframe-components", "screen-library"],
        "quality": ["usability", "accessibility", "mobile-responsive", "ios-hig", "material-design"]
    },
    "ui-patterns": {
        "mcp": ["figma"],
        "priority": 1,
        "output_type": "pattern_library",
        "templates": ["pattern-components", "design-tokens"],
        "quality": ["consistency", "accessibility", "reusability"]
    },
    "information-architecture": {
        "mcp": ["miro", "figma", "notion"],
        "priority": 1,
        "output_type": "ia_document",
        "templates": ["site-map-template", "user-flow-diagram"],
        "quality": ["logical-structure", "scalability", "findability"]
    },
    "heuristic-evaluation": {
        "mcp": ["notion", "google-sheets"],
        "priority": 2,
        "output_type": "evaluation_report",
        "templates": ["heuristic-checklist", "severity-rating"],
        "quality": ["thoroughness", "nielsen-principles"]
    },
    "usability-test-planning": {
        "mcp": ["notion", "google-docs"],
        "priority": 2,
        "output_type": "test_plan",
        "templates": ["usability-test-script", "task-list"],
        "quality": ["task-clarity", "metric-definitions"]
    },
    "accessibility-review": {
        "mcp": ["figma", "notion"],
        "priority": 2,
        "output_type": "a11y_report",
        "templates": ["wcag-checklist", "a11y-scorecard"],
        "quality": ["wcag-compliance", "screen-reader-testing"]
    },
    "design-system": {
        "mcp": ["figma", "notion"],
        "priority": 1,
        "output_type": "design_system",
        "templates": ["token-library", "component-specs", "guidelines-doc"],
        "quality": ["consistency", "scalability", "documentation"]
    },
    "animation-motion": {
        "mcp": ["figma", "after-effects"],
        "priority": 3,
        "output_type": "animation_specs",
        "templates": ["animation-library", "motion-guidelines"],
        "quality": ["performance", "user-feedback", "delight"]
    },
    "responsive-patterns": {
        "mcp": ["figma"],
        "priority": 1,
        "output_type": "responsive_designs",
        "templates": ["breakpoint-library", "device-mockups"],
        "quality": ["cross-device", "performance"]
    },
    "component-architecture": {
        "mcp": ["figma", "notion", "github"],
        "priority": 2,
        "output_type": "component_specs",
        "templates": ["component-tree", "prop-specs"],
        "quality": ["reusability", "composition", "documentation"]
    },
    
    # Data Squad
    "data-visualization": {
        "mcp": ["google-sheets", "tableau", "looker", "metabase"],
        "priority": 1,
        "output_type": "visualizations",
        "templates": ["chart-templates", "dashboard-layouts"],
        "quality": ["clarity", "insightfulness", "aesthetics"]
    },
    "cohort-analysis": {
        "mcp": ["google-sheets", "metabase", "postgres"],
        "priority": 1,
        "output_type": "cohort_report",
        "templates": ["cohort-table-template"],
        "quality": ["retention-metrics", "segmentation"]
    },
    "funnel-analysis": {
        "mcp": ["google-sheets", "metabase", "google-analytics"],
        "priority": 1,
        "output_type": "funnel_report",
        "templates": ["funnel-visualization"],
        "quality": ["drop-off-identification", "optimization-opportunities"]
    },
    "data-modeling": {
        "mcp": ["notion", "dbdiagram", "drawsql"],
        "priority": 1,
        "output_type": "schema_design",
        "templates": ["er-diagram", "schema-specs"],
        "quality": ["normalization", "relationships", "scalability"]
    },
    "ab-test-design": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "test_spec",
        "templates": ["ab-test-template", "hypothesis-template"],
        "quality": ["statistical-rigor", "clear-metrics"]
    },
    "saas-metrics-analysis": {
        "mcp": ["google-sheets", "metabase"],
        "priority": 1,
        "output_type": "metrics_dashboard",
        "templates": ["saas-metrics-template", "unit-economics"],
        "quality": ["accuracy", "benchmarking"]
    },
    "metrics-dashboard-creation": {
        "mcp": ["google-sheets", "metabase", "looker", "notion"],
        "priority": 1,
        "output_type": "dashboard",
        "templates": ["dashboard-templates", "kpi-cards"],
        "quality": ["relevance", "real-time", "actionability"]
    },
    "kpi-tracking": {
        "mcp": ["google-sheets", "metabase", "notion"],
        "priority": 1,
        "output_type": "kpi_framework",
        "templates": ["kpi-dictionary", "tracking-sheet"],
        "quality": ["measurement-clarity", "target-setting"]
    },
    
    # Technical Squad
    "architecture-design": {
        "mcp": ["notion", "miro", "drawsql"],
        "priority": 1,
        "output_type": "architecture_doc",
        "templates": ["arch-diagram-template", "decision-records"],
        "quality": ["scalability", "reliability", "security"]
    },
    "schema-design": {
        "mcp": ["drawsql", "dbdiagram", "notion"],
        "priority": 1,
        "output_type": "database_schema",
        "templates": ["schema-visual", "migration-guide"],
        "quality": ["efficiency", "relationships"]
    },
    "api-design": {
        "mcp": ["notion", "stoplight", "swagger"],
        "priority": 1,
        "output_type": "api_spec",
        "templates": ["openapi-template", "endpoint-docs"],
        "quality": ["rest-standards", "documentation"]
    },
    "user-story-generation": {
        "mcp": ["notion", "linear", "jira"],
        "priority": 1,
        "output_type": "user_stories",
        "templates": ["user-story-template", "acceptance-criteria"],
        "quality": ["clarity", "testability", "independence"]
    },
    "technical-readiness-pack": {
        "mcp": ["notion", "github"],
        "priority": 1,
        "output_type": "technical_assessment",
        "templates": ["readiness-checklist"],
        "quality": ["comprehensiveness", "risk-identification"]
    },
    "ticket-refinement": {
        "mcp": ["linear", "jira", "trello"],
        "priority": 2,
        "output_type": "refined_tickets",
        "templates": ["ticket-template"],
        "quality": ["clarity", "estimation", "dependencies"]
    },
    "state-management": {
        "mcp": ["notion", "github"],
        "priority": 2,
        "output_type": "state_design",
        "templates": ["state-diagram", "store-specs"],
        "quality": ["predictability", "performance"]
    },
    "frontend-performance": {
        "mcp": ["notion", "lighthouse"],
        "priority": 2,
        "output_type": "performance_report",
        "templates": ["performance-audit-template"],
        "quality": ["metrics", "optimization-priorities"]
    },
    "monitoring-observability": {
        "mcp": ["notion", "datadog", "newrelic"],
        "priority": 2,
        "output_type": "monitoring_plan",
        "templates": ["alerting-config", "dashboard-specs"],
        "quality": ["coverage", "actionability"]
    },
    "ci-cd-pipeline": {
        "mcp": ["github", "vercel", "netlify"],
        "priority": 2,
        "output_type": "pipeline_config",
        "templates": ["ci-config-template", "deployment-workflow"],
        "quality": ["reliability", "speed", "rollback"]
    },
    "infrastructure-as-code": {
        "mcp": ["github", "aws", "terraform"],
        "priority": 2,
        "output_type": "iac_config",
        "templates": ["terraform-template", "cloudformation"],
        "quality": ["idempotency", "security"]
    },
    "cloud-platforms": {
        "mcp": ["aws", "digitalocean", "vercel", "netlify"],
        "priority": 2,
        "output_type": "cloud_architecture",
        "templates": ["cloud-diagram", "service-selection"],
        "quality": ["cost-efficiency", "scalability"]
    },
    "serverless-development": {
        "mcp": ["vercel", "aws-lambda", "netlify"],
        "priority": 2,
        "output_type": "serverless_design",
        "templates": ["function-specs", "architecture-diagram"],
        "quality": ["cost-optimization", "performance"]
    },
    "mobile-ios": {
        "mcp": ["figma", "xcode"],
        "priority": 2,
        "output_type": "ios_specs",
        "templates": ["ios-design-template", "app-specs"],
        "quality": ["human-interface-guidelines"]
    },
    "mobile-android": {
        "mcp": ["figma", "android-studio"],
        "priority": 2,
        "output_type": "android_specs",
        "templates": ["material-design-template", "app-specs"],
        "quality": ["material-design-compliance"]
    },
    "ml-llm-integration": {
        "mcp": ["openai", "anthropic", "huggingface"],
        "priority": 2,
        "output_type": "ml_integration_plan",
        "templates": ["model-selection-guide", "integration-specs"],
        "quality": ["accuracy", "cost-optimization"]
    },
    "automation-framework": {
        "mcp": ["zapier", "make", "github"],
        "priority": 2,
        "output_type": "automation_spec",
        "templates": ["workflow-template", "integration-map"],
        "quality": ["reliability", "maintainability"]
    },
    "migration-planning": {
        "mcp": ["notion", "google-sheets"],
        "priority": 2,
        "output_type": "migration_plan",
        "templates": ["migration-checklist", "risk-register"],
        "quality": ["risk-mitigation", "rollback-planning"]
    },
    "performance-tuning": {
        "mcp": ["notion", "google-pagespeed", "newrelic"],
        "priority": 2,
        "output_type": "tuning_recommendations",
        "templates": ["performance-audit", "optimization-roadmap"],
        "quality": ["measurable-impact", "prioritization"]
    },
    "edge-computing": {
        "mcp": ["cloudflare", "vercel", "aws-cloudfront"],
        "priority": 3,
        "output_type": "edge_strategy",
        "templates": ["edge-architecture", "caching-strategy"],
        "quality": ["latency-reduction", "cost-optimization"]
    },
    
    # QA Squad
    "test-strategy": {
        "mcp": ["notion", "jira", "linear"],
        "priority": 1,
        "output_type": "test_plan",
        "templates": ["test-strategy-template", "coverage-matrix"],
        "quality": ["coverage", "risk-based-prioritization"]
    },
    "tdd": {
        "mcp": ["github"],
        "priority": 2,
        "output_type": "test_examples",
        "templates": ["test-structure", "assertion-library"],
        "quality": ["coverage", "maintainability"]
    },
    "automation-framework": {
        "mcp": ["github", "playwright", "selenium"],
        "priority": 2,
        "output_type": "automation_setup",
        "templates": ["test-automation-template", "page-object-model"],
        "quality": ["reliability", "maintainability"]
    },
    "usability-test-planning": {
        "mcp": ["notion", "google-forms", "miro"],
        "priority": 2,
        "output_type": "usability_plan",
        "templates": ["usability-protocol", "task-scripts"],
        "quality": ["task-design", "metric-definition"]
    },
    
    # Security Squad
    "security-requirements-baseline": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "security_requirements",
        "templates": ["security-requirements-template"],
        "quality": ["comprehensiveness", "compliance"]
    },
    "security-compliance-roadmap": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "compliance_roadmap",
        "templates": ["compliance-matrix", "audit-checklist"],
        "quality": ["regulatory-knowledge", "practicality"]
    },
    "security-architecture-review": {
        "mcp": ["notion", "miro"],
        "priority": 1,
        "output_type": "security_assessment",
        "templates": ["threat-model-template"],
        "quality": ["depth", "actionability"]
    },
    "threat-modeling": {
        "mcp": ["miro", "notion", "drawsql"],
        "priority": 1,
        "output_type": "threat_model",
        "templates": ["stride-template", "attack-tree"],
        "quality": ["comprehensiveness", "prioritization"]
    },
    "data-security": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "data_security_plan",
        "templates": ["data-classification", "encryption-specs"],
        "quality": ["encryption-standards", "access-control"]
    },
    "data-protection-assessment": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "dpa_assessment",
        "templates": ["data-flow-diagram", "consent-tracking"],
        "quality": ["gdpr-compliance", "practicality"]
    },
    "privacy-regulation-assessment": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "privacy_assessment",
        "templates": ["privacy-audit-template"],
        "quality": ["regulatory-knowledge", "gap-analysis"]
    },
    "backup-recovery": {
        "mcp": ["notion", "aws"],
        "priority": 2,
        "output_type": "backup_strategy",
        "templates": ["backup-plan-template", "rto-rpo-specs"],
        "quality": ["reliability", "testing"]
    },
    
    # GTM Squad
    "launch-planning": {
        "mcp": ["notion", "miro", "linear"],
        "priority": 1,
        "output_type": "launch_plan",
        "templates": ["launch-checklist", "timeline-template"],
        "quality": ["comprehensiveness", "timeline-clarity"]
    },
    "launch-analytics": {
        "mcp": ["google-analytics", "google-sheets", "metabase"],
        "priority": 1,
        "output_type": "launch_metrics",
        "templates": ["launch-dashboard", "success-metrics"],
        "quality": ["measurement-clarity", "baseline-definitions"]
    },
    "pricing-strategy": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "pricing_model",
        "templates": ["pricing-model-template", "price-tier-structure"],
        "quality": ["market-research", "business-model"]
    },
    "pricing-launch": {
        "mcp": ["stripe", "notion"],
        "priority": 1,
        "output_type": "pricing_execution",
        "templates": ["pricing-page-template"],
        "quality": ["implementation-clarity"]
    },
    "channel-strategy": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "channel_plan",
        "templates": ["channel-analysis-template"],
        "quality": ["channel-fit", "prioritization"]
    },
    "paid-acquisition": {
        "mcp": ["google-ads", "facebook-ads", "linkedin-ads"],
        "priority": 1,
        "output_type": "ad_strategy",
        "templates": ["campaign-structure", "audience-templates"],
        "quality": ["targeting-clarity", "roi-projections"]
    },
    "partner-strategy": {
        "mcp": ["notion", "hubspot"],
        "priority": 2,
        "output_type": "partner_plan",
        "templates": ["partnership-template", "outreach-sequence"],
        "quality": ["partner-fit", "mutual-value"]
    },
    "content-strategy": {
        "mcp": ["notion", "google-docs"],
        "priority": 1,
        "output_type": "content_plan",
        "templates": ["content-calendar", "topic-cluster-template"],
        "quality": ["content-gaps", "seo-optimization"]
    },
    "community-building": {
        "mcp": ["discord", "slack", "notion"],
        "priority": 2,
        "output_type": "community_plan",
        "templates": ["community-guidelines", "onboarding-flow"],
        "quality": ["engagement-strategy", "moderation"]
    },
    "referral-program": {
        "mcp": ["notion", "stripe", "google-sheets"],
        "priority": 2,
        "output_type": "referral_design",
        "templates": ["referral-incentives", "program-rules"],
        "quality": ["viral-coefficient", "sustainability"]
    },
    "seo-foundation": {
        "mcp": ["notion", "google-search-console", "ahrefs"],
        "priority": 1,
        "output_type": "seo_strategy",
        "templates": ["keyword-research", "on-page-checklist"],
        "quality": ["keyword-opportunities", "technical-seo"]
    },
    "analyst-relations": {
        "mcp": ["notion", "google-docs"],
        "priority": 2,
        "output_type": "analyst_plan",
        "templates": ["briefing-template", "coverage-map"],
        "quality": ["relationship-building", "messaging"]
    },
    "sales-enablement": {
        "mcp": ["hubspot", "notion", "google-docs"],
        "priority": 2,
        "output_type": "sales_materials",
        "templates": ["pitch-deck-template", "battle-cards"],
        "quality": ["clarity", "persuasiveness"]
    },
    "messaging-framework": {
        "mcp": ["notion", "miro", "google-docs"],
        "priority": 1,
        "output_type": "messaging_doc",
        "templates": ["messaging-hierarchy", "value-prop-template"],
        "quality": ["clarity", "consistency", "differentiation"]
    },
    
    # Iteration Squad
    "iteration-planning": {
        "mcp": ["notion", "linear", "jira"],
        "priority": 1,
        "output_type": "sprint_plan",
        "templates": ["sprint-template", "capacity-planning"],
        "quality": ["realistic-scoping", "dependency-mapping"]
    },
    "product-health-check": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "health_report",
        "templates": ["health-metrics-template"],
        "quality": ["metric-selection", "trend-identification"]
    },
    "scale-readiness": {
        "mcp": ["notion", "google-sheets"],
        "priority": 2,
        "output_type": "scale_assessment",
        "templates": ["scale-readiness-checklist"],
        "quality": ["technical-readiness", "operational-readiness"]
    },
    "release-management": {
        "mcp": ["github", "linear", "jira"],
        "priority": 2,
        "output_type": "release_plan",
        "templates": ["release-checklist", "rollback-plan"],
        "quality": ["reliability", "communication"]
    },
    "feedback-synthesis": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "feedback_report",
        "templates": ["feedback-analysis-template"],
        "quality": ["theme-identification", "prioritization"]
    },
    "cohort-analysis": {
        "mcp": ["google-sheets", "metabase"],
        "priority": 1,
        "output_type": "cohort_report",
        "templates": ["cohort-dashboard"],
        "quality": ["retention-insights", "segmentation"]
    },
    "funnel-analysis": {
        "mcp": ["google-sheets", "metabase"],
        "priority": 1,
        "output_type": "funnel_insights",
        "templates": ["funnel-visualization"],
        "quality": ["drop-off-identification"]
    },
    "saas-metrics-analysis": {
        "mcp": ["google-sheets", "metabase"],
        "priority": 1,
        "output_type": "metrics_assessment",
        "templates": ["saas-dashboard-template"],
        "quality": ["benchmarking", "trend-analysis"]
    },
    
    # Product Squad
    "product-vision": {
        "mcp": ["notion", "miro", "google-docs"],
        "priority": 1,
        "output_type": "vision_doc",
        "templates": ["vision-template", "pitch-deck"],
        "quality": ["clarity", "inspiration", "feasibility"]
    },
    "roadmap-planning": {
        "mcp": ["notion", "linear", "jira", "miro"],
        "priority": 1,
        "output_type": "roadmap",
        "templates": ["roadmap-template", "feature-timeline"],
        "quality": ["prioritization", "dependency-mapping"]
    },
    "feature-prioritization": {
        "mcp": ["notion", "linear", "jira"],
        "priority": 1,
        "output_type": "prioritization",
        "templates": ["moscow-template", "rice-template"],
        "quality": ["business-alignment", "clear-rationale"]
    },
    "requirements-elicitation": {
        "mcp": ["notion", "linear", "jira"],
        "priority": 1,
        "output_type": "requirements",
        "templates": ["requirements-template"],
        "quality": ["completeness", "clarity"]
    },
    "stakeholder-analysis": {
        "mcp": ["notion", "miro"],
        "priority": 2,
        "output_type": "stakeholder_map",
        "templates": ["stakeholder-matrix"],
        "quality": ["relationship-clarity", "influence-mapping"]
    },
    "product-okrs": {
        "mcp": ["notion", "google-sheets", "linear"],
        "priority": 1,
        "output_type": "okr_document",
        "templates": ["okr-template", "check-in-template"],
        "quality": ["alignment", "measurability"]
    },
    "messaging-framework": {
        "mcp": ["notion", "miro", "google-docs"],
        "priority": 1,
        "output_type": "messaging",
        "templates": ["messaging-hierarchy"],
        "quality": ["clarity", "consistency"]
    },
    "pricing-strategy": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "pricing",
        "templates": ["pricing-model"],
        "quality": ["market-research", "value-based"]
    },
    
    # Growth Squad
    "ab-test-design": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "test_design",
        "templates": ["ab-test-template"],
        "quality": ["statistical-rigor", "clear-hypothesis"]
    },
    "paid-acquisition": {
        "mcp": ["google-ads", "facebook-ads"],
        "priority": 1,
        "output_type": "acquisition_plan",
        "templates": ["campaign-templates", "audience-segments"],
        "quality": ["targeting", "roi-projections"]
    },
    "referral-program": {
        "mcp": ["notion", "stripe"],
        "priority": 2,
        "output_type": "referral_design",
        "templates": ["referral-incentives"],
        "quality": ["viral-loop", "sustainability"]
    },
    "channel-strategy": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "channel_strategy",
        "templates": ["channel-analysis"],
        "quality": ["channel-fit", "prioritization"]
    },
    "funnel-analysis": {
        "mcp": ["google-sheets", "metabase"],
        "priority": 1,
        "output_type": "funnel_analysis",
        "templates": ["funnel-dashboard"],
        "quality": ["drop-off-identification", "optimization"]
    },
    
    # Infrastructure Squad
    "cloud-platforms": {
        "mcp": ["aws", "digitalocean", "vercel"],
        "priority": 1,
        "output_type": "cloud_strategy",
        "templates": ["cloud-selection-guide"],
        "quality": ["cost-optimization", "scalability"]
    },
    "infrastructure-as-code": {
        "mcp": ["github", "terraform"],
        "priority": 1,
        "output_type": "iac_setup",
        "templates": ["terraform-modules"],
        "quality": ["idempotency", "security"]
    },
    "serverless-development": {
        "mcp": ["vercel", "aws-lambda"],
        "priority": 1,
        "output_type": "serverless_design",
        "templates": ["function-architecture"],
        "quality": ["cost-optimization", "performance"]
    },
    "ci-cd-pipeline": {
        "mcp": ["github", "vercel"],
        "priority": 1,
        "output_type": "pipeline_setup",
        "templates": ["github-actions-template"],
        "quality": ["reliability", "speed"]
    },
    "monitoring-observability": {
        "mcp": ["datadog", "newrelic", "notion"],
        "priority": 1,
        "output_type": "monitoring_plan",
        "templates": ["alerting-rules", "dashboard-specs"],
        "quality": ["coverage", "actionability"]
    },
    
    # Research Squad
    "survey-design": {
        "mcp": ["google-forms", "typeform", "notion"],
        "priority": 1,
        "output_type": "survey",
        "templates": ["survey-template"],
        "quality": ["question-clarity", "bias-prevention"]
    },
    "interview-guide-creation": {
        "mcp": ["notion", "google-docs"],
        "priority": 1,
        "output_type": "interview_guide",
        "templates": ["interview-script-template"],
        "quality": ["topic-coverage", "open-endedness"]
    },
    "feedback-synthesis": {
        "mcp": ["notion", "google-sheets"],
        "priority": 1,
        "output_type": "synthesis",
        "templates": ["feedback-analysis-template"],
        "quality": ["theme-identification", "insights"]
    },
    "usability-test-planning": {
        "mcp": ["notion", "miro"],
        "priority": 1,
        "output_type": "usability_plan",
        "templates": ["usability-protocol"],
        "quality": ["task-design", "metric-definition"]
    },
}


def get_mcp_details(mcp_name):
    """Get details about an MCP from the database"""
    return MCP_DATABASE.get(mcp_name, {"name": mcp_name, "description": "Unknown MCP", "official": False})


def analyze_skill(skill_id, skill_info):
    """Analyze a single skill and return research findings"""
    mapping = SKILL_MCP_MAPPING.get(skill_id, {})
    
    mcp_list = []
    for mcp in mapping.get("mcp", []):
        mcp_details = get_mcp_details(mcp)
        mcp_list.append({
            "id": mcp,
            "name": mcp_details.get("name", mcp),
            "description": mcp_details.get("description", ""),
            "official": mcp_details.get("official", False),
            "capabilities": mcp_details.get("capabilities", []),
            "priority": mapping.get("priority", 3)
        })
    
    # Sort by priority
    mcp_list.sort(key=lambda x: x.get("priority", 3))
    
    return {
        "skill_id": skill_id,
        "mcp_mapping": mcp_list,
        "priority": mapping.get("priority", 3),
        "output_type": mapping.get("output_type", "document"),
        "templates_needed": mapping.get("templates", []),
        "quality_criteria": mapping.get("quality", []),
        "error_scenarios": [
            {"error": "auth_failure", "recovery": "prompt_user_reauth"},
            {"error": "rate_limit", "recovery": "queue_and_retry"},
            {"error": "template_missing", "recovery": "use_default_fallback"},
            {"error": "api_error", "recovery": "graceful_degradation_with_plan"}
        ]
    }


def generate_research_document():
    """Generate the comprehensive research document"""
    
    # Load squads data
    with open(SQUADS_FILE, 'r') as f:
        squads_data = json.load(f)
    
    # Build skill-to-squad mapping
    skill_squad_map = {}
    for squad_id, squad_info in squads_data.get("squads", {}).items():
        for skill in squad_info.get("skills", []):
            skill_squad_map[skill] = {
                "squad_id": squad_id,
                "squad_name": squad_info.get("name", squad_id),
                "squad_description": squad_info.get("description", "")
            }
    
    # Analyze all skills
    all_skill_research = {}
    for skill_id in SKILL_MCP_MAPPING.keys():
        skill_info = skill_squad_map.get(skill_id, {})
        analysis = analyze_skill(skill_id, skill_info)
        analysis["squad"] = skill_info
        all_skill_research[skill_id] = analysis
    
    # Group by squad
    by_squad = {}
    for skill_id, research in all_skill_research.items():
        squad_id = research["squad"].get("squad_id", "unknown")
        if squad_id not in by_squad:
            by_squad[squad_id] = []
        by_squad[squad_id].append(research)
    
    # Sort skills within each squad by priority
    for squad_id in by_squad:
        by_squad[squad_id].sort(key=lambda x: x.get("priority", 3))
    
    return {
        "skills_by_squad": by_squad,
        "all_skills": all_skill_research,
        "mcp_database": MCP_DATABASE
    }


def main():
    print("Starting Skills-to-MCP Research...")
    
    research = generate_research_document()
    
    # Save the full research
    output_file = OUTPUT_DIR / "full_research.json"
    with open(output_file, 'w') as f:
        json.dump(research, f, indent=2)
    print(f"Saved full research to {output_file}")
    
    # Generate markdown reports
    for squad_id, skills in research["skills_by_squad"].items():
        report_lines = [
            f"# {squad_id.replace('-', ' ').title()} Squad - MCP Mapping",
            "",
            f"Total skills: {len(skills)}",
            "",
            "## Skills",
            ""
        ]
        
        for skill in skills:
            report_lines.append(f"### {skill['skill_id'].replace('-', ' ').title()}")
            report_lines.append(f"**Priority:** {skill['priority']}")
            report_lines.append(f"**Output Type:** {skill['output_type']}")
            report_lines.append("")
            report_lines.append("**Recommended MCPs:**")
            for mcp in skill["mcp_mapping"]:
                official = " (Official)" if mcp.get("official") else " (Community)"
                report_lines.append(f"- {mcp['name']}{official} - Priority {mcp['priority']}")
            report_lines.append("")
            report_lines.append("**Templates Needed:**")
            for template in skill["templates_needed"]:
                report_lines.append(f"- {template}")
            report_lines.append("")
            report_lines.append("**Quality Criteria:**")
            for criterion in skill["quality_criteria"]:
                report_lines.append(f"- {criterion}")
            report_lines.append("")
            report_lines.append("---")
            report_lines.append("")
        
        report_file = OUTPUT_DIR / f"squad_{squad_id}" / "skills_analysis.md"
        report_file.parent.mkdir(exist_ok=True)
        with open(report_file, 'w') as f:
            f.write("\n".join(report_lines))
        print(f"Saved {report_file}")
    
    # Generate summary
    summary_lines = [
        "# Skills-to-MCP Research Summary",
        "",
        f"Total Skills Analyzed: {len(research['all_skills'])}",
        f"Total Squads: {len(research['skills_by_squad'])}",
        f"Total MCPs Available: {len(research['mcp_database'])}",
        "",
        "## MCP Coverage Overview",
        ""
    ]
    
    # Count MCP usage
    mcp_usage = {}
    for skill in research["all_skills"].values():
        for mcp in skill["mcp_mapping"]:
            mcp_usage[mcp["id"]] = mcp_usage.get(mcp["id"], 0) + 1
    
    mcp_usage_sorted = sorted(mcp_usage.items(), key=lambda x: x[1], reverse=True)
    
    summary_lines.append("| MCP | Skills Using It |")
    summary_lines.append("|-----|----------------|")
    for mcp_id, count in mcp_usage_sorted:
        mcp_name = research["mcp_database"].get(mcp_id, {}).get("name", mcp_id)
        summary_lines.append(f"| {mcp_name} | {count} |")
    
    summary_file = OUTPUT_DIR / "README.md"
    with open(summary_file, 'w') as f:
        f.write("\n".join(summary_lines))
    print(f"Saved summary to {summary_file}")
    
    print("\nResearch complete!")


if __name__ == "__main__":
    main()
