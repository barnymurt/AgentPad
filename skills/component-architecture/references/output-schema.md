# Component Architecture Output Schema

## Consumes
- context.ui_requirements - UI requirements

## Produces
- context.components - Component definitions

## Output Structure

### Components (required)
- name: string
- type: enum
- props: array

### Hierarchy (required)
- root: string
- tree: object
