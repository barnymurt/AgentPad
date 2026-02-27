# Versioning Best Practices

## Semantic Versioning (SemVer)

Format: MAJOR.MINOR.PATCH

### When to Increment Each

**PATCH (1.0.0 -> 1.0.1)**
- Bug fixes
- Small corrections
- Performance improvements
- Backward-compatible

**MINOR (1.0.0 -> 1.1.0)**
- New features
- New capabilities
- Backward-compatible
- May deprecate in future

**MAJOR (1.0.0 -> 2.0.0)**
- Breaking changes
- Removed features
- API changes
- Requires migration

---

## Version Number Examples

### Starting a New Project

Start with: 1.0.0

- 1.0.0 - Initial release

### Adding Features

1.0.0 -> 1.1.0

- New feature: Dark mode
- New feature: Export to PDF
- New feature: User dashboard

### Bug Fixes

1.1.0 -> 1.1.1

- Fixed login issue
- Fixed display bug on mobile
- Fixed data export timeout

### Breaking Changes

1.1.1 -> 2.0.0

- Removed legacy API
- Changed authentication method
- Required database migration

---

## Pre-Release Versions

### Beta/RC Versions

Use for testing before full release:

- 1.0.0-beta.1
- 1.0.0-beta.2
- 1.0.0-rc.1
- 1.0.0-rc.2
- 1.0.0 (stable)

### Alpha Versions

Very early testing:

- 0.1.0 - First alpha
- 0.2.0 - More features
- 0.9.0 - Feature complete

---

## Version Communication

### What to Tell Users

**Major release:**
- What's new
- Breaking changes
- Migration guide
- Timeline for old version

**Minor release:**
- New features
- Improvements
- Bug fixes

**Patch release:**
- What was fixed
- No action needed

---

## Common Mistakes

### 1. Incrementing Too Fast

Releasing major versions for minor changes.

**Bad:** 1.0.0 -> 2.0.0 for new feature
**Good:** 1.0.0 -> 1.1.0 for new feature

### 2. Not Documenting Breaking Changes

Not telling users when things break.

**Bad:** Surprise breaking changes
**Good:** Clear communication ahead of time

### 3. Skipping Version Numbers

Jumping from 1.0 to 3.0 with no reason.

**Bad:** 1.0 -> 3.0 (looks like major changes)
**Good:** 1.0 -> 1.1 -> 1.2 -> 2.0 (progression)

### 4. Not Tagging Releases

Not using version tags in code.

**Good:** Use git tags
```
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

---

## Best Practices Summary

1. Start at 1.0.0
2. Use semantic versioning
3. Communicate changes clearly
4. Use pre-release versions for testing
5. Tag releases in version control
6. Document breaking changes
7. Plan migration paths
8. Keep changelog updated
