# Validation Pack: Manual Test Guide

**Purpose:** Test the Validation Pack with real SaaS founders before building any platform infrastructure. This validates the core value proposition: "Is the orchestrated skill chain + polished output worth paying for?"

---

## What You're Testing

1. **Does the skill chain produce a coherent, useful artifact?** (not just 7 disconnected outputs)
2. **Do the decision gates add value?** (do users appreciate being told "stop" or does it frustrate them?)
3. **Is the output better than what they'd get from vanilla Claude/ChatGPT?** (the fundamental question)
4. **Would they pay for it?** (the business question)

---

## Setup

### Environment

Run the test in **Cursor** or a **Claude Project** where you can load all 7 skills into context.

**Files to load:**
1. `directives/run_validation_pack.md` (the orchestration instructions)
2. `skills/requirements-elicitation/SKILL.md` + `references/`
3. `skills/user-persona-creation/SKILL.md` + `references/`
4. `skills/competitor-research/SKILL.md` + `references/`
5. `skills/business-case-modeling/SKILL.md` + `references/`
6. `skills/devils-advocate/SKILL.md` + `references/`
7. `skills/feature-prioritization/SKILL.md` + `references/`
8. `skills/user-journey-mapping/SKILL.md` + `references/`
9. `skills/validation-pack/output-schema.md` (the output contract)

### Prompt to Start

```
Follow the directive in directives/run_validation_pack.md to produce a Validation Pack for the following idea:

[User's idea description here]

Run each skill in the specified order. Evaluate each decision gate. Produce the final Validation Pack conforming to skills/validation-pack/output-schema.md.
```

---

## Finding Test Participants

**Target:** 3-5 people with active SaaS ideas at the validation stage.

**Where to find them:**
- IndieHackers (filter for "idea stage" or "building" posts)
- Twitter/X SaaS builder community (#buildinpublic, #indiehackers)
- Reddit: r/SaaS, r/startups, r/Entrepreneur
- Your own network — anyone who's mentioned a SaaS idea recently
- Product Hunt discussions
- Local startup meetups or Slack communities

**Ideal participant profile:**
- Has a specific SaaS or digital product idea (not "I want to start a business")
- Has not yet built it (or is very early — pre-revenue)
- Would describe themselves as a founder, indie hacker, or product person
- Willing to spend 15-20 minutes describing their idea and 15 minutes reviewing the output

**Screening question:** "Do you have a SaaS idea you're trying to decide whether to build? I'm testing a new validation tool and I'd like to run your idea through it for free."

---

## Test Protocol

### Before the Test

1. **Prepare:** Have the environment ready with all skills loaded
2. **Brief the participant:** "I'm going to ask you about your SaaS idea, then run it through an AI-powered validation process. At the end, you'll get a report. I want your honest feedback on whether it's useful."
3. **Get their idea:** Ask them to describe their idea in 2-3 sentences. Follow up with:
   - Who is it for?
   - How would it make money?
   - What's the biggest thing you're unsure about?

### During the Test

1. **Run the full chain** following `directives/run_validation_pack.md`
2. **Time it** — how long does the full pack take to produce?
3. **Note any points where the AI struggles** — vague outputs, contradictions between skills, gates that seem miscalibrated
4. **If a gate triggers PAUSE/KILL:** share that with the participant and observe their reaction before continuing

### After the Test — Feedback Questions

Ask these questions in order. Record responses verbatim where possible.

**Value questions:**
1. "On a scale of 1-10, how useful was this report for deciding what to do next with your idea?"
2. "What was the single most valuable part?"
3. "What was missing that you expected to see?"
4. "Was there anything that surprised you or changed your thinking?"

**Gate questions (if applicable):**
5. "The analysis flagged [PAUSE/KILL] at [gate]. How did that feel? Was it helpful or frustrating?"
6. "Did you agree with the recommendation? Why or why not?"

**Comparison questions:**
7. "Have you tried running this through ChatGPT or Claude directly? How does this compare?"
8. "Is this better, worse, or about the same as what you'd get from a conversation with a smart friend who knows the SaaS space?"

**Willingness to pay:**
9. "If this was a product and you could generate this report for any idea, would you use it?"
10. "Would you pay $50 for this report? What about $30? What price feels right?"
11. "What would need to be different for you to pay without hesitation?"

**Format questions:**
12. "Is the report too long, too short, or about right?"
13. "Which sections would you actually reference again? Which would you skip?"
14. "Would you share this with a co-founder or advisor? Why or why not?"

---

## What to Track

For each test run, record:

| Field | Value |
|-------|-------|
| Participant | Name / pseudonym |
| Idea | One-sentence description |
| Date | When the test was run |
| Duration | How long the full chain took |
| Gates triggered | Which gates, what recommendation |
| User overrides | Did they override any gate? |
| Usefulness (1-10) | Self-reported score |
| Most valuable section | Which section they highlighted |
| Missing element | What they expected but didn't get |
| Would pay | Yes / No / Maybe |
| Price point | What price they'd accept |
| Key quote | The most revealing thing they said |

---

## Success Criteria

The Validation Pack concept is validated if:

- **3+ of 5 participants** rate usefulness >= 7/10
- **3+ of 5 participants** say they would pay (at any price point)
- **Average price point** >= $30
- **At least 1 participant** says they would share the report with someone else
- **No participant** says "I could have done this myself with ChatGPT" as their primary reaction

## Red Flags (pivot signals)

- **3+ participants** rate usefulness <= 5/10 → the chain isn't producing valuable output
- **3+ participants** say "I could do this myself" → the orchestration isn't adding enough value
- **All participants** skip the same section → that section needs rethinking or removal
- **Gate recommendations consistently wrong** → gate criteria need recalibration
- **Takes > 45 minutes** to produce → too slow for the value delivered

---

## After Testing

1. **Compile findings** in `.tmp/validation-pack-test-results.md`
2. **Identify patterns** — what worked, what didn't, what's missing
3. **Update the directive** (`directives/run_validation_pack.md`) with learnings
4. **Update the output schema** if sections need adding/removing/restructuring
5. **Decide:** proceed to execution scripts (Phase E) or iterate on the chain
