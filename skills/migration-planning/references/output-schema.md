# Migration Planning Output Schema

## Consumes
- context.schema - Current schema
- context.changes - Required changes

## Produces
- context.migrations - Migration files

## Output Structure

### Migrations (required)
- version: string
- up: string
- down: string
- description: string
