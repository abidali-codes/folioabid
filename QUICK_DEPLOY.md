# 🚀 Quick Deploy to GitHub Pages

## Step-by-Step Commands

### 1️⃣ Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 2️⃣ Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### 3️⃣ Create GitHub Repository
- Go to: https://github.com/new
- Repository name: `portfolio` (or any name you want)
- Make it **Public**
- **Don't** check any boxes (no README, no .gitignore, no license)
- Click **Create repository**

### 4️⃣ Connect to GitHub
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repo name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 5️⃣ Deploy!
```bash
npm run deploy
```

### 6️⃣ Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source", select branch: `gh-pages`
5. Click **Save**

### 7️⃣ Wait 1-2 minutes, then visit:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## ⚠️ Important: Update Base Path

If your repo name is NOT `portfolio`, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',  // Add this line
  plugins: [react()],
  // ... rest stays the same
});
```

Then redeploy:
```bash
npm run deploy
```

---

## 🔄 To Update Your Site Later

```bash
git add .
git commit -m "Update portfolio"
git push origin main
npm run deploy
```

---

## ✅ Checklist Before Deploying

- [ ] Replace Web3Forms API key in `client/src/pages/Contact.tsx`
- [ ] Replace favicon in `client/public/favicon.png`
- [ ] Test locally: `npm run build`
- [ ] Check for any console errors

---

That's it! Your portfolio will be live! 🎉
