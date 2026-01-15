# Git Workflow and Pull Request Guidelines

## Purpose

This document defines a standard Git workflow for all projects. The goals are:

- Keep Git history clean and readable
- Make changes easy to track, audit, and QA
- Ensure consistency across teams and repositories
- Improve traceability between code, pull requests, and tickets

These rules are mandatory unless explicitly stated otherwise.

---

## Branch Strategy

We use **two main permanent branches only**:

- **main**

  - Production branch
  - Always reflects what is live in production

- **dev**

  - Staging branch
  - Integration branch for all development work

### Rules

- All feature, fix, hotfix, and improvement work must target **dev**
- Direct pull requests to **main** are not allowed
- **main** only receives changes from **dev**

---

## Pull Request Target Rules

### Default Rule

- **All pull requests must target the \*\***dev\***\* branch**
- This applies to:
  - Features
  - Bug fixes
  - Hotfixes
  - Refactors
  - Chores

GitHub must be configured so that:

- Squash and merge is the **default and only allowed merge option** for pull requests into `dev`

---

## Merge Strategy Rules

### 1. Pull Requests into `dev`

- **Always use Squash and Merge**
- No exceptions

#### Why

- Keeps commit history clean
- One commit equals one logical change
- Easy to scan history and understand what was delivered
- Reduces noise from intermediate or WIP commits
- Improves blame and auditing

---

### 2. Deploying to Production (`dev` → `main`)

- **Always use Merge Commit**
- **Never squash** when merging into `main`

#### Requirements

- The merge commit **must include a clear and descriptive message**
- This merge represents a production deployment

#### Why

- Preserves the exact state of `dev` at deployment time
- Clearly marks production releases in Git history
- Makes rollbacks and audits easier

---

## Branch Naming Convention

### Rule

- **Always use the ticket ID as the branch name**
- Do not use `feature`, `fix`, `hotfix`, or similar prefixes

### Format

```
TICKET-ID
```

- Ticket ID must be in **capital letters**

### Examples

- `PAY-123`
- `AUTH-456`
- `CORE-9`

---

## Pull Request Title Convention

### Rule

- Pull request titles **must start with the ticket ID**

### Format

```
TICKET-ID: Description of the change
```

### Examples

- `PAY-123: Add payment retry logic`
- `AUTH-456: Fix token refresh race condition`

This rule is mandatory.

---

## Commit Message Standards

### Commit Convention

- We follow a **conventional commit style** adapted to our workflow
- The exact body can vary, but the **title is mandatory and standardized**

### Mandatory Rule for Commit Titles

- The **ticket ID must always be present in the commit title**
- This enables automatic linking with tools such as Linear
- This applies to:
  - Squash commits
  - Merge commits

### Title Format

```
TICKET-ID: Short, clear description
```

### Notes

- The commit body is optional and flexible
- The title is the source of truth for traceability
- Squash commits inherit the pull request title and description

---

## Examples

### Example 1. Production Deployment Using Merge Commit

**Scenario**

- Deploy staging changes to production
- Merge `dev` into `main`

**Action**

- Create a pull request from `dev` to `main`
- Use **Merge Commit**, not squash

**Merge Commit Message Example**

```
Release: Deploy dev to production

Includes:
- PAY-123 Add payment retry logic
- AUTH-456 Fix token refresh race condition
```

**Resulting git log --oneline**

```
f9e8d7c Merge dev into main: production release
```

This clearly documents what was released.

---

### Example 2. Feature Development Using Squash and Merge

**Scenario**

- Implement a new feature

**Branch Name**

```
PAY-123
```

**Pull Request Title**

```
PAY-123: Add payment retry logic
```

**Target Branch**

- `dev`

**Merge Strategy**

- Squash and merge

**Resulting Commit Message**

```
PAY-123: Add payment retry logic
```

**Resulting git log --oneline**

```
a1b2c3d PAY-123: Add payment retry logic
```

When running `git blame`, it is immediately clear:

- Which ticket caused the change
- Which pull request introduced it

---

## Summary of Rules

- Only two permanent branches: `main` and `dev`
- All pull requests target `dev`
- Squash and merge is mandatory for `dev`
- Merge commit is mandatory for `main`
- Branch names must be the ticket ID
- Pull request titles must start with the ticket ID
- Commit titles must include the ticket ID
- Conventional commit style is recommended, title is mandatory
- Clean history is a requirement, not a preference

---

## Enforcement

- GitHub branch protection rules must enforce these policies
- Pull requests not following these rules must be rejected

This workflow applies to all projects and repositories.
