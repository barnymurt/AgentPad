# Backup & Recovery Worked Example

## Strategy
- Full: Daily at 2am
- Incremental: Every 6 hours
- Retention: 30 days
- Offsite: AWS S3 cross-region

## RTO/RPO
- RTO: 4 hours
- RPO: 1 hour

## Testing
- Last test: 2026-01-15
- Result: Recovered in 2.5 hours
