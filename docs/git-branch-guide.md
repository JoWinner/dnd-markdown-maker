# Git Branch Management Guide

## Creating and Switching to a New Branch

1. First, ensure you're on the main branch and it's up to date:
```bash
git checkout main
git pull origin main
```

2. Create and switch to a new branch:
```bash
git checkout -b feature/enhanced-gfm-preview
```
Note: The `-b` flag creates a new branch and switches to it in one command

## Committing Changes to the New Branch

1. Check which files have been modified:
```bash
git status
```

2. Stage the modified files:
```bash
git add components/markdown/editor/markdown-preview.tsx
```
Or to stage all changes:
```bash
git add .
```

3. Commit your changes with a descriptive message:
```bash
git commit -m "feat: enhance markdown preview with GFM support and syntax highlighting"
```

4. Push the new branch to remote:
```bash
git push -u origin feature/enhanced-gfm-preview
```
Note: The `-u` flag sets up tracking between your local and remote branch

## Switching Between Branches

- To switch to another branch:
```bash
git checkout branch-name
```

- To switch back to main:
```bash
git checkout main
```

## Best Practices

1. **Branch Naming Conventions**:
   - `feature/` - for new features
   - `fix/` - for bug fixes
   - `docs/` - for documentation changes
   - `refactor/` - for code refactoring
   - Example: `feature/enhanced-gfm-preview`

2. **Commit Message Format**:
   - `feat:` - new feature
   - `fix:` - bug fix
   - `docs:` - documentation changes
   - `style:` - formatting, missing semicolons, etc.
   - `refactor:` - code refactoring
   - `test:` - adding tests
   - Example: "feat: enhance markdown preview with GFM support"

3. **Before Creating a New Branch**:
   - Always ensure you're on an updated main branch
   - Pull latest changes from remote
   - Create your new branch from there

4. **Regular Updates**:
   - Regularly pull changes from main to your feature branch:
   ```bash
   git checkout feature/enhanced-gfm-preview
   git pull origin main
   ```

## Quick Reference for Current Changes

To commit the enhanced GFM preview changes:
```bash
# Create and switch to new branch
git checkout -b feature/enhanced-gfm-preview

# Stage changes
git add components/markdown/editor/markdown-preview.tsx

# Commit with descriptive message
git commit -m "feat: enhance markdown preview with GFM support and syntax highlighting"

# Push to remote
git push -u origin feature/enhanced-gfm-preview
```
