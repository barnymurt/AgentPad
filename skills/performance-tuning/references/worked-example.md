# Performance Tuning Worked Example

## Issue
Slow query: Get user orders

## Analysis
```sql
EXPLAIN SELECT * FROM orders WHERE user_id = '123';
-- Seq Scan on orders (slow)
```

## Fix
```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

## Result
- Before: 2.5s
- After: 15ms
