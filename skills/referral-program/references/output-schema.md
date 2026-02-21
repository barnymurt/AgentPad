# Referral Program Output Schema

## Consumes
- context.product - Product context

## Produces
- context.referral_program - Program design

## Output Structure

### Section 1: Program Design (required)
- goals: object - Program objectives
- target: string - Who to refer

### Section 2: Incentive Structure (required)
- referrer: object - Referrer reward
- referred: object - Referred reward
- limits: object - Program limits

### Section 3: Technical Plan (required)
- implementation: string - How it works
- tracking: object - Tracking setup
- fulfillment: string - How to reward

### Section 4: Launch Plan (required)
- rollout: string - Launch approach
- communication: string - How to announce
- optimization: string - Testing plan
