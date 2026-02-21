# Data Modeling Worked Example

## Context
E-commerce platform for TaskFlow

## Entities

### User
- id (PK)
- email
- name
- password_hash
- created_at

### Order
- id (PK)
- user_id (FK)
- total
- status
- created_at

### Product
- id (PK)
- name
- price
- stock

### OrderItem
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity
- price

## Relationships
- User 1→M Order
- Order 1→M OrderItem
- Product 1→M OrderItem
