# Migration Planning Worked Example

## Change: Add user roles

### Migration 001
```sql
-- Up
ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';

-- Down
ALTER TABLE users DROP COLUMN role;
```

## Strategy
1. Add column nullable
2. Backfill data
3. Add constraint
