# Push changes and deploy to GitHub Pages

This command will:
1. Add all changes to git
2. Commit with a descriptive message
3. Push to the remote repository
4. Deploy to GitHub Pages

First, check git status and create a commit:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "$(cat <<'EOF'
Fix mobile layout gap and keyboard cutoff

- Remove vertical centering in App.css to eliminate gap above terminal
- Terminal now properly fills viewport from top to bottom
- Fixes keyboard cutoff issue on mobile Chrome with bottom address bar

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

```bash
git push
```

Now deploy to GitHub Pages:

```bash
npm run deploy
```

Check deployment status:

```bash
echo "Deployment complete! Check https://drain.ohkayblanket.com"
```