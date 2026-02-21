# Data Security Worked Example

## Configuration

### Encryption
- TLS in transit
- AES-256 at rest
- Column-level: password_hash, payment tokens

### Access
- Users: SELECT
- Orders: SELECT, INSERT
- Admins: All

### Audit
- All writes logged
- 1 year retention
