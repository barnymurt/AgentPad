# Data Security Output Schema

## Consumes
- context.schema - Database schema
- context.compliance - Compliance requirements

## Produces
- context.security - Security configuration

## Output Structure

### Encryption (required)
- at_rest: boolean
- in_transit: boolean
- column_level: array

### Access Controls (required)
- users: array
- permissions: array
- rls: object

### Audit (required)
- logging: boolean
- retention: string
