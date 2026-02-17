# Worked Example: User Persona Creation

This example demonstrates the User Persona Creation skill applied to a SaaS project management tool for remote agencies.

## Scenario

**Product:** FlowDesk — a project management and client collaboration SaaS for remote creative agencies
**Target Market:** Remote-first creative and digital agencies (5-30 people) serving multiple clients simultaneously
**Stage:** Early-stage, ~80 paying customers, product-market fit emerging
**Context provided:** Founder has conducted 12 customer interviews, has basic product analytics (feature usage, login frequency), and 6 months of support ticket data. No formal survey data.

## Input

> "We built FlowDesk for remote agencies like ours. Our customers are creative and digital agencies — designers, developers, copywriters — usually 5-30 people, all remote, juggling 5-15 client projects at once. We're trying to figure out who our real personas are. We have some user interviews (12 so far), our product analytics, and our support tickets. I think there are at least 2-3 different types of users but I'm not sure how to frame them. Who are we actually building for?"

## Reasoning

### Step 1: Gather Context and Research Inputs

**Available evidence:**
- 12 customer interviews (strong signal for patterns, limited sample size)
- Product analytics: feature usage, login frequency, team size distribution
- 6 months of support tickets (~200 tickets, categorized)
- Founder domain expertise (ran an agency before building FlowDesk)

**Product stage:** Early-stage with real users. Evidence is available but limited. Confidence will be Medium for most attributes, with some High (direct interview quotes, analytics) and some Low (inferred motivations, market sizing).

**Scope:** 5-30 person remote agencies in creative/digital services. Multiple user types exist: agency owners, project managers, and individual contributors all use the tool differently.

### Step 2: Identify Behavioral Segments

**Primary JTBD split:**
Based on interview analysis, three distinct jobs emerge:
1. "Ensure all client projects are profitable and on-track" (agency owner/principal — strategic oversight)
2. "Coordinate tasks and deadlines across multiple projects and team members" (project manager — operational execution)
3. "Know what I need to work on today and update my progress without overhead" (creative/developer — individual execution)

**Adoption stage split:**
Analytics show a clear behavioral divide between users who adopted FlowDesk as the agency's primary tool vs. those still using it alongside other tools (partial adoption). This cross-cuts the role-based segmentation.

**Decision:**
3 personas based on the JTBD/role split. The adoption stage variation is captured within each persona's adoption profile rather than creating 6 separate personas (which would over-segment given 80 customers).

### Step 3-5: Build, Map, and Validate

Built full personas below, mapped relationships, and tagged confidence.

## Output

---

# User Personas: FlowDesk

## Context

### Product Overview
- **Product:** FlowDesk — project management and client collaboration SaaS for remote creative agencies
- **Target market:** Remote-first creative and digital agencies (5-30 people) managing multiple client projects simultaneously
- **Stage:** Early-stage (~80 paying customers, product-market fit emerging)
- **Research inputs:** 12 customer interviews [H], product analytics — feature usage and login frequency [H], 6 months of support tickets (~200) [H], founder domain expertise from running an agency [M]

### Methodology Notes
- **Segmentation approach:** Primary segmentation by job-to-be-done (three distinct jobs mapped to agency roles); secondary by adoption stage (captured within each persona's profile)
- **Evidence quality:** Mixed — strong behavioral data from analytics and interviews, but limited sample size (12 interviews across 80 accounts). Pain points and JTBD are well-evidenced; market sizing and willingness-to-pay estimates are inferred.
- **Limitations:** No formal survey data. Interview sample skews toward engaged customers (survivorship bias). No churn interview data — churn signals are inferred from support tickets and usage decline patterns.

---

## Persona 1: Maya — The Agency Owner

### Identity
- **Name:** Maya
- **Role:** Founder / Agency Principal
- **Behavioral summary:** Agency owner who checks project health dashboards every morning before client calls because one missed deadline can cost a $10K/month retainer.
- **Context:** Runs a 12-person remote design and development agency. 8-12 active client projects at any time. Revenue: $1.2M-$2M/year. Team spread across 3 timezones. She doesn't manage tasks day-to-day but needs visibility into everything.
- **Technical proficiency:** Medium — comfortable with SaaS tools, uses them daily, but won't configure complex automations. Expects things to "just work."
- **Adoption lifecycle position:** Early Majority — adopted FlowDesk after seeing two peers recommend it. Needs proof it works; won't tolerate beta-quality features.

### Jobs-to-Be-Done
- **Functional job:** Monitor the health and profitability of all active client projects across the agency without attending every standup or reading every Slack thread. Ensure nothing is off-track before clients notice.
- **Emotional job:** Feel confident that the agency is running smoothly — that no project is silently going off the rails while she focuses on sales and strategy.
- **Social job:** Appear organized and in-control to clients. When a client asks "how's the project going?" she wants to answer immediately with specific data, not "let me check with the team."
- **Job frequency:** Daily (morning dashboard check), weekly (profitability review), monthly (client health review)
- **Desired outcome:** Every project ships on time and within margin. Clients feel informed without her team spending hours on status updates. She can focus on growth, not firefighting.

### Current Workflow
1. **Morning check-in:** Opens Slack, scans project channels for red flags. Reads overnight messages across 8-12 channels (20 min). [Tool: Slack]
2. **Status compilation:** Asks project managers for updates on at-risk projects. Waits for responses, follows up. (30 min, often delayed) [Tool: Slack, sometimes email]
3. **Client reporting:** Before client calls, pulls together a status summary from Slack, Google Sheets (time tracking), and project boards. (15-20 min per client) [Tool: Google Sheets, Slack, Asana/Trello]
4. **Profitability review (weekly):** Compares hours logged vs. budget in a spreadsheet. Manually calculates margin per project. (45 min) [Tool: Google Sheets + Harvest/Toggl]
5. **Team allocation:** Decides who works on what next week based on availability and project deadlines. Juggles competing priorities. (30 min) [Tool: Google Sheets, gut feel]

**Friction points:**
- Step 2: Status updates are async and unreliable — PMs are busy and forget to respond. She sometimes doesn't know a project is behind until a client complains. [Critical]
- Step 4: Profitability data is in a separate system from project data. Combining them is manual and error-prone. She often discovers a project went over budget after it's done. [High]

### Pain Points
1. **No single source of truth for project health.** Information is scattered across Slack, spreadsheets, and project boards. Getting a clear picture requires checking 3-4 tools every morning. [Workflow step: 1-2 / Process / Critical / [H] — stated in 8/12 interviews]
2. **Discovers projects are over-budget too late.** Hours tracked in one system, budget in another, tasks in a third. By the time she reconciles them, the project has already exceeded margin targets. [Workflow step: 4 / Financial / Critical / [H] — identified in analytics + interviews]
3. **Client communication is manual and reactive.** Clients email asking for updates. She has to go find the information, compile it, and respond. Wants to send proactive updates but doesn't have time. [Workflow step: 3 / Process / High / [M] — mentioned in 5/12 interviews]
4. **Can't see team capacity at a glance.** Doesn't know who's overloaded vs. underutilized without asking each PM. Leads to uneven workloads and burnout or missed deadlines. [Workflow step: 5 / Functional / High / [M] — inferred from support tickets about team views]

### Gains Sought
1. **Single dashboard showing all project health, budget status, and deadlines.** Open one screen, know everything. [Required / [H]]
2. **Automatic margin tracking** that combines time logged with project budget in real-time, alerting her when a project hits 80% of budget. [Expected / [H]]
3. **Client-shareable status pages** that update automatically, so clients can check progress without emailing her team. [Desired / [M]]
4. **AI-generated weekly summary** of what happened across all projects — shipped to her inbox every Monday morning. [Unexpected / [L]]

### Decision Criteria
1. **Ease of team adoption** — her team (designers, developers) must actually use it daily, or the data is stale and the dashboard is useless. If the tool is complex, her team will revert to Slack. [H]
2. **Client-facing capabilities** — must be able to share project status with clients without giving them access to internal conversations or budget data. [M]
3. **Integrations** — must connect to their time-tracking tool (Harvest) and communication tool (Slack). Non-negotiable; she won't replace those. [H]
4. **Price** — agency margins are 20-35%. Can't justify more than $25-30/user/month. But willing to pay more if it demonstrably saves PM hours. [M]
5. **Reporting** — needs to pull profitability reports for quarterly business reviews. Exportable or built-in. [M]

- **Evaluation method:** Peer recommendation first, then free trial for 2-3 weeks with one project team as a pilot
- **Purchase authority:** Self (she's the owner)
- **Budget range:** $200-$400/month total for a 12-person team

### SaaS-Specific Attributes
- **Adoption trigger:** Lost a client because the team missed a deadline nobody was tracking. The post-mortem revealed nobody had a clear view of the project timeline. She Googled "project management for agencies" that afternoon. [H]
- **Time to value expectation:** Needs to see a populated project dashboard within the first week. If the tool is empty after 7 days, she'll assume it's not going to work. [M]
- **Willingness to pay:** $20-30/user/month. Would pay up to $40/user if profitability tracking is built-in (saves her the separate time-tracking subscription). Price-conscious but ROI-aware. [M]
- **Churn signals:** Dashboard login frequency drops below 3x/week. Stops inviting new team members. Exports project list to spreadsheet (reverting to old workflow). Files support ticket about data export format. [M]
- **Expansion triggers:** Wins a large new client, hires 3-5 new people. Needs more seats and wants to add client portal access. [M]
- **Switching costs:** Medium — has project history in the current tool, team is trained on the workflow. But current solution is duct tape (3 tools), so switching cost is mostly time, not loyalty. [M]

### Quotes
- "I shouldn't have to check Slack, Harvest, AND a spreadsheet to know if a project is profitable. That's insane." [from research]
- "If my team won't use it, the data is garbage and I'm back to Slack-stalking everyone for updates." [synthesized from interview patterns]
- "I need to know Monday morning if anything is going to miss a deadline this week — before the client does." [from research]

---

## Persona 2: Jake — The Project Manager

### Identity
- **Name:** Jake
- **Role:** Project Manager / Account Manager
- **Behavioral summary:** Project manager who juggles 4-6 client projects simultaneously and lives in the task view because one dropped ball means an angry client and an angrier Maya.
- **Context:** Manages 4-6 active projects across 3-8 team members. Reports to Maya. Acts as the bridge between clients and the creative/dev team. Non-technical background (came from account management).
- **Technical proficiency:** Medium — power user of PM tools, comfortable with integrations, but not a developer. Wants drag-and-drop, not configuration files.
- **Adoption lifecycle position:** Early Adopter — actively seeks better tools because current workflow is painful. Willing to champion a new tool internally if it saves him time.

### Jobs-to-Be-Done
- **Functional job:** Assign tasks, track deadlines, and manage dependencies across 4-6 concurrent client projects so that every deliverable ships on time and nothing slips through the cracks.
- **Emotional job:** Feel in control of his project portfolio — not constantly anxious that something was forgotten or someone is blocked without telling him.
- **Social job:** Be seen as the reliable one — clients trust him because he always knows the status, and the team trusts him because he unblocks them quickly.
- **Job frequency:** Continuous — checks and updates the tool 10-15 times per day. This is his primary workspace.
- **Desired outcome:** All tasks assigned, all deadlines visible, all blockers surfaced immediately. He can tell any client the exact status of any deliverable within 60 seconds.

### Current Workflow
1. **Morning planning:** Reviews all active projects, identifies what's due this week, checks for overdue tasks. (20 min) [Tool: Asana/Trello + Slack]
2. **Task assignment:** Creates and assigns tasks for new work, updates existing tasks with client feedback. (30 min/day distributed) [Tool: Asana/Trello]
3. **Status check-ins:** Messages team members in Slack to ask for updates on key tasks. Follows up on blocked items. (40 min/day, fragmented) [Tool: Slack]
4. **Client updates:** Writes status emails to clients 1-2x/week per project. Compiles from memory, Slack threads, and project board. (15 min per client, 4-6 clients = 60-90 min/week) [Tool: Gmail, Slack, Asana/Trello]
5. **Time tracking reminders:** Reminds team to log hours (they always forget). Checks hours against budget. (15 min/day) [Tool: Harvest, Slack]
6. **Scope management:** When clients request changes mid-project, updates tasks, adjusts timeline, communicates impact to team. (Ad hoc, 20-30 min per change) [Tool: Slack, Asana/Trello, email]

**Friction points:**
- Step 3: Status check-ins are his biggest time sink. He's a "human API" between the task board and reality — the task board is often outdated because team members update Slack but not the board. [Critical]
- Step 4: Client updates are manual, repetitive, and error-prone. He's copying information from one place to another, and sometimes misses things. [High]
- Step 6: Scope changes are chaotic. No clear process for tracking what changed, when, and what the impact is. [High]

### Pain Points
1. **Task boards are always stale.** Team members update Slack but don't move cards. He spends time asking "is this done?" when it was done 2 days ago. The source of truth is Slack threads, not the project board. [Workflow step: 3 / Process / Critical / [H] — stated in 7/12 interviews]
2. **Writing client updates is soul-crushing repetitive work.** 60-90 minutes per week compiling information that already exists somewhere in the system. Copy-paste from Slack to email, reformatted for the client. [Workflow step: 4 / Process / High / [H] — mentioned in 6/12 interviews]
3. **No way to see cross-project dependencies.** When one project slips, it affects team members on other projects. He doesn't see the cascade until someone misses a deadline. [Workflow step: 1 / Functional / High / [M] — inferred from support tickets about timeline views]
4. **Scope creep is invisible.** Client asks for "one small change" in an email. He updates the task list but there's no running log of scope additions. At project end, he can't explain why it went over budget. [Workflow step: 6 / Financial / Medium / [M] — mentioned in 3/12 interviews]

### Gains Sought
1. **Tasks that auto-update from team activity** — when a developer pushes code or a designer shares a file, the task should reflect progress without manual card-moving. [Required / [M]]
2. **One-click client status reports** generated from real task data, not manually compiled. [Expected / [H]]
3. **Cross-project timeline view** showing all his projects and team assignments on one screen so he can spot conflicts. [Desired / [H]]
4. **Scope change log** that automatically tracks additions to the project scope with timestamps and requester. [Desired / [M]]

### Decision Criteria
1. **Task management power** — must handle subtasks, dependencies, due dates, and assignees. Needs to be as powerful as Asana but easier to use for his non-technical team. [H]
2. **Ease of team adoption** — if the team doesn't update tasks, the tool is useless. Needs to be low-friction enough that designers and developers actually use it. [H]
3. **Client visibility** — needs client-facing views that show progress without exposing internal notes or budget data. [H]
4. **Slack integration** — must sync with Slack (where the team actually communicates). Ideally, task updates from Slack flow into the tool. [M]
5. **Price** — doesn't make the buying decision but influences it. Needs to justify the cost to Maya in terms of hours saved. [M]

- **Evaluation method:** Free trial. Sets up one real project, invites the team, runs it for 2 weeks. If the team adopts it, he champions it to Maya.
- **Purchase authority:** Recommender (Maya decides), but his recommendation carries heavy weight
- **Budget range:** Doesn't control budget. Knows Maya is price-sensitive but will advocate if the tool saves him 5+ hours/week.

### SaaS-Specific Attributes
- **Adoption trigger:** Got a panicked Slack message from Maya at 10 PM asking why a client deliverable was late — a task had been "in progress" on the board for 2 weeks but the designer had been blocked and never told anyone. Jake decided he needed a better system that same night. [H]
- **Time to value expectation:** Needs to set up a project and assign tasks within the first 30 minutes. If the tool takes a full day to configure, he'll abandon it. [M]
- **Willingness to pay:** Not the buyer, but will advocate for up to $25-30/user/month if it eliminates his manual status reporting. Frames ROI in hours saved. [M]
- **Churn signals:** Stops creating new projects in FlowDesk (still using the old tool for new work). Creates tasks in FlowDesk but updates in Slack (tool becoming stale). Files support tickets about missing PM features. [M]
- **Expansion triggers:** Agency wins a major client requiring more structured project tracking. New team member joins and needs onboarding into the tool. [M]
- **Switching costs:** Low-medium — project history exists in the current tool, but he's not emotionally attached. Would switch for meaningful improvement. The real cost is convincing the team to learn something new. [M]

### Quotes
- "I'm basically a human sync engine between Slack and Asana. If someone made a tool that did that automatically, I'd pay for it myself." [from research]
- "My clients don't care what tool we use. They care that I can tell them exactly where their project stands in 30 seconds." [synthesized from interview patterns]
- "The hardest part isn't managing the project. It's getting my team to update the damn project board." [from research]

---

## Persona 3: Sam — The Creative Contributor

### Identity
- **Name:** Sam
- **Role:** Senior Designer / Developer (individual contributor)
- **Behavioral summary:** Creative professional who wants to do great work and resents any tool that adds overhead to their day — will only adopt PM tools that take less than 30 seconds to update.
- **Context:** Works on 2-3 client projects simultaneously. Reports to Jake. Specializes in design (or development — the behavioral pattern is the same). Works independently for long stretches, then collaborates in bursts during reviews.
- **Technical proficiency:** High (developers) or Medium-High (designers) — comfortable with tools but judges them on design quality and UX. Won't use ugly or slow software.
- **Adoption lifecycle position:** Late Majority — doesn't seek out PM tools, adopts when the team mandates it. Will use the minimum viable feature set. If the tool gets in the way of real work, they'll quietly stop using it.

### Jobs-to-Be-Done
- **Functional job:** Know exactly what to work on today, in what priority, with all the context needed to start — without sitting through a meeting or reading a 50-message Slack thread.
- **Emotional job:** Feel focused and uninterrupted. The PM tool should reduce noise, not add to it.
- **Social job:** Be recognized for quality creative work, not for how well they update task boards.
- **Job frequency:** Checks task list 2-3 times per day (morning, after lunch, end of day). Does NOT live in the PM tool.
- **Desired outcome:** Start each morning knowing their 2-3 tasks for the day. Get briefs and feedback in one place. Mark things done in under 30 seconds. Never sit in a meeting that could have been a task update.

### Current Workflow
1. **Morning task review:** Checks Slack for messages from Jake about priorities. Opens project board to see assigned tasks. (10 min) [Tool: Slack, Asana/Trello]
2. **Context gathering:** For each task, finds the brief, reference files, and client feedback. Often scattered across Slack threads, Google Drive, and email. (15-20 min, sometimes more) [Tool: Slack, Google Drive, email, Figma/GitHub]
3. **Focused work:** Does the actual creative/development work. (4-6 hours) [Tool: Figma, VS Code, etc.]
4. **Update status:** Jake asks for update. Sam replies in Slack. Sometimes remembers to update the project board. Often doesn't. (5 min when prompted) [Tool: Slack, reluctantly Asana/Trello]
5. **Submit deliverable:** Shares work in Slack or drops a link. Marks task "done" if they remember. (5 min) [Tool: Slack, Figma/GitHub]

**Friction points:**
- Step 2: Context is scattered everywhere. Finding the latest version of a brief or the most recent client feedback takes 10-20 minutes of scrolling through Slack. [High]
- Step 4: Updating the PM tool feels like unnecessary overhead. The work is done — why should they spend time moving a card? They already told Jake in Slack. [Medium — low severity for Sam, Critical downstream impact for Jake and Maya]

### Pain Points
1. **Context is scattered across 4+ tools.** Every task requires a scavenger hunt for the brief, assets, and latest client feedback. "Where did the client send that revision note?" is a daily question. [Workflow step: 2 / Process / High / [H] — mentioned in 9/12 interviews]
2. **Duplicate status updates.** Jake asks in Slack, they respond. Then they're supposed to update the project board. Same information, two places. Feels like busywork. [Workflow step: 4 / Process / Medium / [H] — mentioned in 8/12 interviews]
3. **Priority ambiguity.** Multiple PMs assign tasks with different deadlines. Not clear which project takes priority when there's a conflict. Resolves by asking Jake, which interrupts both of them. [Workflow step: 1 / Functional / Medium / [M] — inferred from support tickets about notification settings]
4. **Meetings about status that should be async.** Attends 2-3 standup calls per week that exist only because the project board doesn't reflect reality. Loses 30-60 min of focused work time. [Workflow step: 4 (downstream effect) / Process / Medium / [M] — mentioned in 4/12 interviews]

### Gains Sought
1. **All task context in one place** — brief, assets, feedback, and conversation attached to the task itself, not in Slack. [Required / [H]]
2. **One-action status update** — mark something done from Slack, from a mobile notification, or from within Figma. Not a separate app login. [Expected / [H]]
3. **Clear daily priority list** — "Here are your 3 tasks for today, ranked." Not a board of 40 cards. [Desired / [M]]
4. **Fewer meetings** — if the tool keeps the project board current, standups become unnecessary. [Unexpected / [M]]

### Decision Criteria
1. **Low friction** — if it takes more than 30 seconds to update a task, they won't do it. The tool must be faster than replying in Slack. [H]
2. **Clean UX** — as a designer/developer, they judge tools by design quality. Ugly or cluttered UI = "this tool is bad" regardless of functionality. [H]
3. **Integrations with creative tools** — must connect to Figma, GitHub, Google Drive, or wherever their actual work lives. [M]
4. **Notifications that aren't noisy** — only notify for things relevant to them (assigned task, deadline change, feedback on their work). Not every comment on every project. [M]

- **Evaluation method:** Doesn't evaluate. Uses whatever the team adopts. Forms an opinion in the first 3 days of use.
- **Purchase authority:** None — uses what's mandated
- **Budget range:** N/A (doesn't pay)

### SaaS-Specific Attributes
- **Adoption trigger:** Doesn't self-trigger. Adopts when Maya or Jake mandate it. However, will champion the tool if it genuinely makes their life easier (reduces meetings, centralizes context). [H]
- **Time to value expectation:** Must see their assigned tasks with full context within the first 10 minutes. If the tool is empty or requires them to set things up themselves, they'll never open it again. [M]
- **Willingness to pay:** N/A — not the buyer. But their satisfaction is critical to retention (if the team doesn't use the tool, Maya and Jake churn).
- **Churn signals:** Stops updating task status (reverts to Slack-only updates). Never opens the tool proactively (only when Jake sends a direct link). Complains about the tool in team retrospectives. [M]
- **Expansion triggers:** N/A — doesn't drive expansion. But high engagement from contributors signals healthy adoption, which supports Jake's case for more seats.
- **Switching costs:** Very low — has no personal data in the tool, no emotional attachment. Will switch to whatever the team tells them to use next. The switching cost is team-level, not individual. [H]

### Quotes
- "I don't care about project management. I care about knowing what I need to do today and having everything I need to do it." [from research]
- "If I have to log into a separate app just to move a card from 'in progress' to 'done,' I'm not going to do it. Sorry." [synthesized from interview patterns]
- "The best project management tool is one I barely notice." [from research]

---

## Persona Priority Matrix

| Persona | Revenue Potential | Acquisition Feasibility | Retention Potential | Product Alignment | Overall Priority |
|---------|------------------|------------------------|--------------------|--------------------|-----------------|
| Maya (Owner) | H — controls budget, pays the bill | M — reachable via content marketing, peer networks | H — if the dashboard delivers value, she stays | M — needs more reporting/profitability features | Primary |
| Jake (PM) | M — influences purchase, doesn't pay | H — actively seeking tools, easy to convert on trial | H — power user, high switching cost once embedded | H — core PM features align with product | Primary |
| Sam (Creative) | L — doesn't pay or influence purchase | L — doesn't seek tools, adopts when mandated | M — low personal investment, but team adoption drives retention | M — needs low-friction UX, integrations | Secondary |

### Priority Rationale
- **Primary — Maya:** She's the buyer. Revenue depends on convincing her the tool is worth $200-400/month. Product strategy should prioritize her visibility and reporting needs alongside PM capabilities.
- **Primary — Jake:** He's the champion. If Jake loves FlowDesk, he'll convince Maya to buy and ensure the team adopts it. His trial experience is the most critical conversion moment. Tied for primary because Maya and Jake together represent the full buying unit.
- **Secondary — Sam:** She doesn't drive purchase or adoption. But her compliance determines data quality — and data quality determines whether Maya and Jake get value. Sam's UX experience is a constraint on the entire value chain. Build for Maya and Jake, but never make it painful for Sam.

## Relationship Map

### Interactions
- **Maya → Jake:** Maya relies on Jake's project updates to make business decisions. If Jake's data is stale, Maya's dashboard is useless. Maya evaluates FlowDesk based on the dashboard; Jake evaluates it based on task management. Both must be satisfied.
- **Jake → Sam:** Jake assigns work to Sam and needs status updates. Sam's adoption of the tool directly determines whether Jake gets accurate data or has to chase updates in Slack. Jake is the internal champion; Sam is the adoption gatekeeper.
- **Maya → Clients (external):** Maya needs client-facing views. Clients don't use FlowDesk but consume its outputs (status pages, reports). Client experience with FlowDesk's external views affects agency retention of the client, which affects agency retention of FlowDesk.

### Conflicts
- **Jake needs rich task management; Sam needs minimal friction.** More required fields on tasks = better data for Jake and Maya, but more overhead for Sam. **Resolution:** Make rich metadata optional or auto-populated. Never block Sam from marking a task done with required fields.
- **Maya needs real-time dashboard; Sam updates infrequently.** Dashboard accuracy depends on Sam updating status, but Sam checks the tool 2-3x/day. **Resolution:** Integrate with Figma/GitHub so Sam's work activity auto-updates task status. Slack integration that lets Sam update from where they already are.

## Confidence Summary

### Evidence Distribution
| Persona | High Confidence | Medium Confidence | Low Confidence |
|---------|----------------|-------------------|----------------|
| Maya (Owner) | 50% | 40% | 10% |
| Jake (PM) | 55% | 35% | 10% |
| Sam (Creative) | 45% | 40% | 15% |

**Overall assessment:** Mixed confidence. JTBD and pain points are well-evidenced from interviews and analytics. Willingness-to-pay estimates and churn signals are inferred. No persona is purely hypothetical, but all need ongoing validation.

### Key Assumptions
| # | Assumption | Impact if Wrong | Confidence |
|---|-----------|-----------------|------------|
| 1 | Agency owners (Maya) will pay $20-30/user/month for combined PM + profitability tracking | Pricing model may be wrong; could need separate tiers for PM vs. analytics | [M] |
| 2 | PMs (Jake) are the primary internal champions who drive adoption | If owners mandate from the top without PM buy-in, onboarding approach changes | [M] |
| 3 | Creative contributors (Sam) will adopt if friction is low enough (Slack integration, 30-second updates) | If adoption requires behavior change beyond tool integration, team-level adoption may fail | [M] |
| 4 | Client-facing status pages are a differentiator, not just a feature | If agencies don't share project status with clients (internal use only), this feature is wasted investment | [L] |
| 5 | The 5-30 person agency size band is the right market | Smaller agencies may not need a PM tool; larger agencies may need enterprise features FlowDesk doesn't have | [M] |

## Validation Plan

### Highest-Risk Assumptions
| # | Assumption | Validation Method | Timeline | Owner |
|---|-----------|-------------------|----------|-------|
| 1 | Maya pays $20-30/user/month | Run pricing survey with 30 agency owners via Wynter or similar. Test price anchoring with 3 tiers. | Next 4 weeks | Founder |
| 2 | Jake champions adoption internally | Add question to onboarding: "Who initiated the search for a PM tool?" Track which role signs up vs. which role invites team. | Ongoing (instrument in analytics) | Product |
| 3 | Sam adopts with Slack integration | Ship Slack task-update integration, measure: what % of task updates come from Slack vs. web app? If >60% from Slack, hypothesis confirmed. | After Slack integration ships | Product |
| 4 | Client-facing pages are a differentiator | Interview 10 agencies specifically about client communication workflow. Ask: "Would you share a live project status page with your client?" | Next 6 weeks | Founder |
| 5 | 5-30 person agency is the right band | Analyze current customer base: what's the distribution of team sizes? Where is retention highest? Where is NPS highest? | Next 2 weeks | Product |

### Update Triggers
- **Revisit personas when:** Customer count reaches 200 (larger sample validates or invalidates patterns), churn rate exceeds 5% monthly (signals persona-product misalignment), new market segment enters (e.g., non-creative agencies start signing up), major feature launches (client portal, time tracking integration — may shift persona priorities)
- **Quarterly review:** Re-run confidence assessment with updated interview and analytics data. Promote Medium → High where evidence accumulates. Flag Low assumptions that remain unvalidated.

---

## Quality Check

- [x] Each persona is organized around jobs-to-be-done (functional, emotional, social for each)
- [x] Pain points are specific and tied to numbered workflow steps (not generic frustrations)
- [x] Decision criteria are ranked (numbered, with persona-specific rationale)
- [x] SaaS-specific attributes included for all personas (adoption trigger, churn signals, willingness to pay)
- [x] Technology adoption lifecycle position assigned (Early Majority, Early Adopter, Late Majority)
- [x] Confidence levels tagged on every pain point and gain [H/M/L]
- [x] Personas are meaningfully differentiated (different JTBD, different decision criteria, different adoption triggers)
- [x] Validation plan identifies 5 highest-risk assumptions with specific test methods and timelines
- [x] Output follows the schema in references/output-schema.md
