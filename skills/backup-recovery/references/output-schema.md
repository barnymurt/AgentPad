# Backup & Recovery Output Schema

## Consumes
- context.schema - Database schema
- context.rto - Recovery requirements

## Produces
- context.backup - Backup configuration

## Output Structure

### Strategy (required)
- type: enum
- frequency: string
- retention: string
- offsite: boolean

### Recovery (required)
- rto: string
- rpo: string
- procedures: array

### Testing (required)
- last_test: date
- results: string
