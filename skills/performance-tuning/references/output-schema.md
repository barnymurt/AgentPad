# Performance Tuning Output Schema

## Consumes
- context.schema - Database schema
- context.queries - Query patterns

## Produces
- context.optimizations - Performance improvements

## Output Structure

### Analysis (required)
- slow_queries: array
- bottlenecks: array

### Recommendations (required)
- index_adds: array
- query_changes: array
- caching: object
