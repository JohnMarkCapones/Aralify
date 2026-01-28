# CodeForge Contributing Guidelines

Welcome to CodeForge! This document outlines our branching strategy, commit conventions, and pull request guidelines. Following these standards ensures a clean, maintainable codebase and smooth collaboration.

---

## Table of Contents

- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Review Process](#code-review-process)
- [Quick Reference](#quick-reference)

---

## Branching Strategy

We use a modified **Git Flow** strategy optimized for continuous deployment.

### Branch Types

| Branch | Purpose | Created From | Merges Into |
|--------|---------|--------------|-------------|
| `main` | Production-ready code | — | — |
| `staging` | Testing and Environment Check | — | — |
| `develop` | Integration branch for features | `staging` | `staging` |
| `feature/*` | New features | `develop` | `develop` |
| `fix/*` | Bug fixes | `develop` | `develop` |
| `hotfix/*` | Urgent production fixes | `main` | `main` + `develop` |
| `release/*` | Release preparation | `develop` | `main` + `develop` |
| `docs/*` | Documentation updates | `develop` | `develop` |
| `refactor/*` | Code refactoring (no new features) | `develop` | `develop` |
| `test/*` | Test additions/improvements | `develop` | `develop` |

### Branch Naming Convention

```
<type>/<ticket-id>-<short-description>
```

**Format Rules:**
- Use lowercase only
- Use hyphens to separate words (no underscores or spaces)
- Keep descriptions short but meaningful (2-4 words)
- Include ticket/issue ID when applicable

**Examples:**

```bash
# Features
feature/CF-123-user-authentication
feature/CF-456-xp-leaderboard
feature/add-streak-notifications

# Bug fixes
fix/CF-789-login-redirect-loop
fix/quiz-score-calculation

# Hotfixes (production emergencies)
hotfix/CF-999-payment-failure
hotfix/critical-auth-bypass

# Documentation
docs/api-endpoints
docs/CF-101-setup-guide

# Refactoring
refactor/auth-service-cleanup
refactor/CF-202-optimize-queries

# Tests
test/gamification-unit-tests
test/CF-303-e2e-checkout
```

### Branch Lifecycle

```
1. Create branch from develop
   git checkout develop
   git pull origin develop
   git checkout -b feature/CF-123-new-feature

2. Work on your branch (commit often)
   git add .
   git commit -m "feat(auth): add Google OAuth integration"

3. Keep branch updated with develop
   git fetch origin
   git rebase origin/develop

4. Push and create PR
   git push origin feature/CF-123-new-feature

5. After PR approval and merge, delete branch
   git branch -d feature/CF-123-new-feature
   git push origin --delete feature/CF-123-new-feature
```

### Protected Branches

| Branch | Protection Rules |
|--------|------------------|
| `main` | Requires PR, 2 approvals, passing CI, no direct pushes |
| `develop` | Requires PR, 1 approval, passing CI |

---

## Commit Guidelines

We follow the **Conventional Commits** specification for clear, consistent commit history.

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(quiz): add multiple choice question type` |
| `fix` | Bug fix | `fix(auth): resolve token refresh loop` |
| `docs` | Documentation only | `docs(readme): update installation steps` |
| `style` | Formatting, no code change | `style(components): fix indentation` |
| `refactor` | Code change, no new feature or fix | `refactor(api): simplify error handling` |
| `perf` | Performance improvement | `perf(db): add index to user_progress table` |
| `test` | Adding or updating tests | `test(auth): add unit tests for login flow` |
| `build` | Build system or dependencies | `build(deps): upgrade next to 14.1.0` |
| `ci` | CI configuration | `ci(github): add test coverage reporting` |
| `chore` | Maintenance tasks | `chore: clean up unused imports` |
| `revert` | Revert previous commit | `revert: feat(quiz): add timer feature` |

### Scopes

Scopes indicate which part of the codebase is affected:

| Scope | Description |
|-------|-------------|
| `auth` | Authentication system |
| `api` | API routes and handlers |
| `db` | Database schema, migrations |
| `ui` | UI components |
| `quiz` | Quiz system |
| `challenge` | Code challenges |
| `gamification` | XP, badges, streaks, leaderboards |
| `social` | Friends, comments, profiles |
| `admin` | Admin panel |
| `mobile` | React Native specific |
| `web` | Next.js web specific |
| `i18n` | Internationalization |
| `deps` | Dependencies |
| `config` | Configuration files |

### Subject Rules

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Keep under 50 characters

**Good:**
```
feat(auth): add password reset flow
fix(quiz): prevent duplicate submissions
refactor(api): extract validation logic
```

**Bad:**
```
feat(auth): Added password reset flow.     # Past tense, period
fix: fixed the bug                          # Vague, past tense
FEAT(QUIZ): ADD NEW FEATURE                 # All caps
```

### Body (Optional)

Use the body to explain **what** and **why**, not how:

```
fix(quiz): prevent race condition in score calculation

The score was being calculated before all answers were saved,
causing incorrect results for users with slow connections.

Added a mutex lock to ensure atomic score updates.
```

### Footer (Optional)

Reference issues and breaking changes:

```
feat(api): change authentication to JWT

BREAKING CHANGE: API now requires Bearer token in Authorization header.
Sessions-based auth is no longer supported.

Closes #123
Refs #456, #789
```

### Breaking Changes

For breaking changes, add `!` after type/scope and explain in footer:

```
feat(api)!: change response format for lessons endpoint

BREAKING CHANGE: Lesson responses now return `content` as structured
JSON instead of raw HTML. Update your parsers accordingly.
```

### Commit Examples

```bash
# Simple feature
git commit -m "feat(gamification): add daily streak counter"

# Bug fix with scope
git commit -m "fix(mobile): resolve crash on iOS 17 devices"

# Documentation
git commit -m "docs(api): add examples for quiz endpoints"

# Multi-line commit
git commit -m "refactor(auth): migrate from sessions to JWT

- Remove express-session dependency
- Add jsonwebtoken for token generation
- Update all protected routes to use new middleware

Refs #234"

# Breaking change
git commit -m "feat(api)!: rename user endpoints

BREAKING CHANGE: /api/users/:id renamed to /api/profiles/:id
Old endpoints will return 301 redirect for 30 days.

Closes #567"
```

---

## Pull Request Guidelines

### Before Creating a PR

- [ ] Branch is up-to-date with `develop`
- [ ] All tests pass locally (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] New code has appropriate tests
- [ ] Documentation updated if needed
- [ ] Self-reviewed your own code

### PR Title Format

Follow the same convention as commit messages:

```
<type>(<scope>): <description>
```

**Examples:**
```
feat(auth): implement social login with Google and GitHub
fix(quiz): correct score calculation for timed quizzes
docs(api): add OpenAPI specification for v1 endpoints
```

### PR Description Template

```markdown
## Summary
Brief description of what this PR does.

## Type of Change
- [ ] ✨ Feature (new functionality)
- [ ] 🐛 Bug fix (fixes an issue)
- [ ] 📝 Documentation (updates docs)
- [ ] 🎨 Style (formatting, no code change)
- [ ] ♻️ Refactor (code restructuring)
- [ ] ⚡ Performance (improves performance)
- [ ] ✅ Test (adds/updates tests)
- [ ] 🔧 Chore (maintenance)

## Related Issues
Closes #123
Refs #456

## Changes Made
- Added X component
- Updated Y service
- Fixed Z bug

## Screenshots (if applicable)
| Before | After |
|--------|-------|
| img    | img   |

## Testing Done
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Testing Instructions
1. Checkout this branch
2. Run `npm install`
3. Navigate to /feature
4. Expected behavior: ...

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] Dependent changes have been merged

## Additional Notes
Any additional context or notes for reviewers.
```

### PR Size Guidelines

| Size | Lines Changed | Review Time | Recommendation |
|------|---------------|-------------|----------------|
| XS | < 50 | < 15 min | ✅ Ideal |
| S | 50-200 | 15-30 min | ✅ Good |
| M | 200-500 | 30-60 min | ⚠️ Consider splitting |
| L | 500-1000 | 1-2 hours | ⚠️ Split if possible |
| XL | > 1000 | 2+ hours | ❌ Must split |

**Tips for smaller PRs:**
- One feature/fix per PR
- Separate refactoring from features
- Split large features into incremental PRs
- Use feature flags for incomplete features

### Draft PRs

Use draft PRs for:
- Work in progress needing early feedback
- Experimental changes
- Dependent on other PRs

Convert to ready when:
- All checks pass
- Self-review complete
- Ready for full review

---

## Code Review Process

### For Authors

1. **Respond to all comments** — Resolve or discuss each one
2. **Don't take it personally** — Reviews improve code quality
3. **Explain your reasoning** — Help reviewers understand decisions
4. **Request re-review** — After addressing feedback

### For Reviewers

#### What to Look For

| Category | Check |
|----------|-------|
| **Correctness** | Does it work? Edge cases handled? |
| **Design** | Does it fit the architecture? Proper abstractions? |
| **Readability** | Clear names? Self-documenting? Comments where needed? |
| **Performance** | Any obvious inefficiencies? N+1 queries? |
| **Security** | Input validation? Auth checks? SQL injection? |
| **Testing** | Adequate coverage? Edge cases? |
| **Documentation** | Updated docs? Clear commit messages? |

#### Comment Prefixes

Use prefixes to indicate comment importance:

| Prefix | Meaning | Requires Action |
|--------|---------|-----------------|
| `[blocking]` | Must fix before merge | Yes |
| `[suggestion]` | Consider this improvement | No |
| `[question]` | Clarification needed | Response needed |
| `[nit]` | Minor nitpick (style, typo) | No |
| `[praise]` | Something done well | No |

**Examples:**
```
[blocking] This query will cause N+1 issues. Consider using include().

[suggestion] This could be simplified using Array.map()

[question] Why did we choose this approach over X?

[nit] Typo: "recieve" → "receive"

[praise] Great job on the error handling here!
```

### Approval Requirements

| Target Branch | Required Approvals | Additional Requirements |
|---------------|-------------------|------------------------|
| `develop` | 1 | CI passing |
| `main` | 2 | CI passing, QA sign-off |
| `hotfix/*` → `main` | 1 | CI passing, senior dev approval |

### Merge Strategy

We use **Squash and Merge** for most PRs:
- Creates clean, linear history
- PR title becomes commit message
- All commits squashed into one

**When to use Merge Commit:**
- Large features with meaningful individual commits
- Release branches

**When to use Rebase and Merge:**
- Never (to avoid complications)

---

## Quick Reference

### Branch Cheatsheet

```bash
# Start new feature
git checkout develop && git pull
git checkout -b feature/CF-123-description

# Start bug fix
git checkout develop && git pull
git checkout -b fix/CF-456-description

# Start hotfix (from main)
git checkout main && git pull
git checkout -b hotfix/CF-789-description

# Update branch with latest develop
git fetch origin
git rebase origin/develop

# Push branch
git push origin feature/CF-123-description

# Delete branch after merge
git branch -d feature/CF-123-description
git push origin --delete feature/CF-123-description
```

### Commit Cheatsheet

```bash
# Feature
git commit -m "feat(scope): add new thing"

# Bug fix
git commit -m "fix(scope): resolve the issue"

# Breaking change
git commit -m "feat(scope)!: change API response format"

# With body
git commit -m "fix(scope): resolve issue

Detailed explanation here.

Closes #123"
```

### PR Checklist (Copy-Paste)

```
## Checklist
- [ ] Branch up-to-date with develop
- [ ] All tests pass
- [ ] Linter passes
- [ ] Self-reviewed code
- [ ] Documentation updated
- [ ] Ready for review
```

---

## Questions?

If you have questions about these guidelines, ask in:
- **#dev-help** channel on Discord
- Create a discussion in GitHub Discussions
- Tag @team-leads in your PR

---

**Happy coding! 🚀**