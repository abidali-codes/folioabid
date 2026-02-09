# Deploy Portfolio to GitHub Pages

## Quick Deployment Steps

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., `portfolio`)
3. **DO NOT** initialize with README, .gitignore, or license

### 3. Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Build Your Project
```bash
npm run build
```

### 5. Deploy to GitHub Pages

**Option A: Using gh-pages package (Recommended)**

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Add these scripts to your `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist/public"
}
```

Deploy:
```bash
npm run deploy
```

**Option B: Manual Deployment**

1. Build the project: `npm run build`
2. Go to your GitHub repository settings
3. Navigate to Pages section
4. Select "Deploy from a branch"
5. Choose `gh-pages` branch and `/ (root)` folder
6. Save

### 6. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select `gh-pages` branch
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 7. Update Base Path (if using subdirectory)

If your site is at `username.github.io/repo-name`, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // ... rest of config
});
```

Then rebuild and redeploy:
```bash
npm run build
npm run deploy
```

## Custom Domain (Optional)

If you want to use a custom domain like `yourname.com`:

1. Add a `CNAME` file to `client/public/` with your domain:
   ```
   yourdomain.com
   ```

2. In your domain registrar, add these DNS records:
   - Type: A, Host: @, Value: 185.199.108.153
   - Type: A, Host: @, Value: 185.199.109.153
   - Type: A, Host: @, Value: 185.199.110.153
   - Type: A, Host: @, Value: 185.199.111.153
   - Type: CNAME, Host: www, Value: YOUR_USERNAME.github.io

3. In GitHub repository settings → Pages, add your custom domain

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: GitHub Pages doesn't support client-side routing by default. Add a `404.html` that redirects to `index.html`.

### Issue: Images not loading
**Solution**: Make sure all image paths are relative and start with `/` or use the correct base path.

### Issue: Build fails
**Solution**: Check that all dependencies are installed and there are no TypeScript errors:
```bash
npm install
npm run check
```

## Update Your Site

To update your deployed site:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
npm run deploy
```

## Environment Variables

For production, make sure to:
1. Update the Web3Forms API key in `client/src/pages/Contact.tsx`
2. Remove any development-only code
3. Test the build locally: `npm run build && npx serve dist/public`

---

Your portfolio will be live at: **https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/**

🎉 Happy deploying!
