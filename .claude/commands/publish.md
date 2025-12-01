# Commit, push, and deploy to GitHub Pages

This command will:
1. Check git status to see what changes exist
2. Add all changes to git staging
3. Commit with an auto-generated descriptive message
4. Push to the remote repository
5. Deploy to GitHub Pages

First, check what changes we have:

```bash
git status
```

```bash
git diff --stat
```

Add and commit all changes:

```bash
git add .
```

```bash
git commit -m "$(cat <<'EOF'
Update project files

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

Push to remote:

```bash
git push
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

Confirm deployment:

```bash
echo "✅ Published successfully! Live at: https://drain.ohkayblanket.com"
```