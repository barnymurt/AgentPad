# Security Baseline Pack: Quick Start Guide

A lightweight security assessment for SaaS products. Get a personalized security baseline in minutes.

---

## What This Is

The Security Baseline Pack is a quick way to assess your product's security posture without the full Technical Readiness Pack overhead.

**3 Skills, 1 Goal:** Understand your security requirements, threats, and data protection needs.

---

## When to Use This

| Use Case | Recommended Pack |
|----------|-----------------|
| Early-stage product, first security assessment | Security Baseline Pack (this) |
| Need compliance roadmap (SOC 2, ISO 27001, GDPR) | Full Technical Readiness Pack |
| Just need requirements, not full analysis | Security Requirements Baseline skill only |
| Have an architecture, need security review | Security Architecture Review skill |

---

## How It Works

### 1. Provide Context

Answer a few questions about your product:

- **What does your product do?**
- **Who are your users?**
- **What data do you handle?** (PII, financial, health, etc.)
- **What's your tech stack?** (frameworks, cloud, services)
- **Where are your users located?** (affects privacy regulations)

### 2. Run the Pack

The pack runs 3 skills in sequence:

1. **Security Requirements Baseline** — What security measures you need
2. **Threat Modeling** — What could go wrong
3. **Data Protection Assessment** — How to protect user data

### 3. Get Your Results

You receive:
- Personalized security requirements based on your tech stack
- Relevant threats for your product type
- Data protection recommendations specific to your data handling
- A summary document with prioritized actions

---

## Example Questions

**Q: What if I only have a product idea, no code yet?**

A: That's perfect. The pack works with product descriptions. Just describe what you plan to build.

**Q: What if I'm using specific services like AWS, Stripe, Supabase?**

A: Include those in your tech stack. The requirements will be specific to those services.

**Q: What if I'm not sure about my data types?**

A: List what you think you're handling. The assessment will help identify gaps.

---

## Output You'll Receive

### The Full Output
- Security requirements checklist (25+ items, prioritized P0/P1/P2)
- Threat model with risk ratings
- Data protection recommendations

### The Summary (User-Facing)
- Executive summary of your security posture
- Top 3 actions to take now
- What's working well
- Gaps to address
- Upgrade path to full pack if needed

---

## Upgrading to Full Pack

Need more? The Security Baseline Pack feeds into the full Technical Readiness Pack:

| This Pack Has | Full Pack Adds |
|---------------|----------------|
| Security Requirements Baseline | Architecture Design |
| Threat Modeling | Security Architecture Review |
| Data Protection Assessment | Privacy Regulation Assessment |
| — | Security Compliance Roadmap |

To upgrade: Run the full Technical Readiness Pack with the same context. Your Baseline Pack results will be incorporated.

---

## Files Reference

| File | Purpose |
|------|---------|
| `directives/run_security_baseline_pack.md` | Orchestration directive |
| `skills/security-baseline-pack/output-schema.md` | Output structure |
| `skills/security-baseline-pack/summary-template.md` | Summary template |

---

## Need Help?

If you have questions:
- Run the Validation Pack first for product/market context
- Check the individual skill files in `skills/security-requirements-baseline/`, `skills/threat-modeling/`, `skills/data-protection-assessment/`
- Start with the full Technical Readiness Pack if you need compliance certification support
