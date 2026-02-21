# Schema Design Output Schema

## Consumes
- context.data_model - From data-modeling

## Produces
- context.schema - Table definitions

## Output Structure

### Tables (required)
- name: string
- columns: array
- constraints: array

### Indexes (required)
- table: string
- columns: array
- unique: boolean
