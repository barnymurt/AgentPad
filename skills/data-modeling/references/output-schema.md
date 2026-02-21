# Data Modeling Output Schema

## Consumes
- context.product - Product context
- context.features - Feature requirements

## Produces
- context.data_model.entities - Entity definitions
- context.data_model.relationships - Relationships

## Output Structure

### Entities (required)
- name: string
- attributes: array
- type: string

### Relationships (required)
- from: string
- to: string
- type: enum

### Attributes (required)
- name: string
- type: string
- required: boolean
