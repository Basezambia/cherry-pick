# AgroChain360 - Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

---

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] CDP Project ID configured in production environment
- [ ] Production domain whitelisted in CDP Portal
- [ ] Environment variables set in hosting platform
- [ ] `.env.local` NOT committed to git (check .gitignore)
- [ ] All API keys and secrets secured

### Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run build` - Successful build
- [ ] Test all user flows (Farmer, Officer, Admin)
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Verify all images and assets load correctly
- [ ] Test authentication with all methods (Email, SMS, OAuth)

### Security
- [ ] HTTPS enabled on production domain
- [ ] Content Security Policy configured
- [ ] Rate limiting implemented for API calls
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] CSRF protection enabled

### Performance
- [ ] Images optimized (use Next.js Image component)
- [ ] Lazy loading implemented for heavy components
- [ ] Code splitting configured
- [ ] Bundle size analyzed and optimized
- [ ] Lighthouse score > 90 for performance

---

## 🚀 Deployment Steps

### Option 1: Vercel Deployment

#### Step 1: Prepare Repository
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment: AgroChain360"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/agrochain360.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install --legacy-peer-deps`

#### Step 3: Add Environment Variables
In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add:
   - **Key**: `NEXT_PUBLIC_CDP_PROJECT_ID`
   - **Value**: Your CDP Project ID
   - **Environment**: Production, Preview, Development

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Get your deployment URL (e.g., `agrochain360.vercel.app`)

#### Step 5: Update CDP Portal
1. Go to https://portal.cdp.coinbase.com
2. Navigate to your project settings
3. Add production URL to Allowed Origins:
   - `https://agrochain360.vercel.app`
   - `https://www.agrochain360.com` (if using custom domain)

#### Step 6: Test Production
- [ ] Visit production URL
- [ ] Test authentication
- [ ] Create a test contract
- [ ] Verify all features work
- [ ] Check mobile responsiveness

---

### Option 2: Netlify Deployment

#### Step 1: Build the Application
```bash
npm run build
```

#### Step 2: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Step 3: Configure Environment Variables
In Netlify dashboard:
1. Site Settings → Environment Variables
2. Add `NEXT_PUBLIC_CDP_PROJECT_ID`
3. Redeploy

#### Step 4: Update CDP Portal
Add Netlify URL to Allowed Origins

---

### Option 3: Self-Hosted (VPS/Cloud)

#### Step 1: Server Setup
```bash
# SSH into your server
ssh user@your-server.com

# Install Node.js 22+
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### Step 2: Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/agrochain360.git
cd agrochain360

# Install dependencies
npm install --legacy-peer-deps

# Create .env.local
nano .env.local
# Add: NEXT_PUBLIC_CDP_PROJECT_ID=your-project-id

# Build
npm run build

# Start with PM2
pm2 start npm --name "agrochain360" -- start
pm2 save
pm2 startup
```

#### Step 3: Configure Nginx
```nginx
server {
    listen 80;
    server_name agrochain360.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 4: Enable HTTPS with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d agrochain360.com
```

---

## 🔍 Post-Deployment Verification

### Functional Testing
- [ ] User can sign in with email
- [ ] User can sign in with SMS
- [ ] User can sign in with Google OAuth
- [ ] Farmer can create contracts
- [ ] Milestones display correctly
- [ ] Officer dashboard loads
- [ ] Admin dashboard shows stats
- [ ] Wallet address displays in header
- [ ] Sign out works correctly

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No console errors
- [ ] No 404 errors
- [ ] Images load correctly
- [ ] Fonts load correctly

### Security Testing
- [ ] HTTPS working (green padlock)
- [ ] No mixed content warnings
- [ ] CSP headers present
- [ ] XSS protection active
- [ ] Authentication required for protected routes

### Mobile Testing
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test on iPad
- [ ] Responsive design works
- [ ] Touch interactions work
- [ ] Forms are usable on mobile

---

## 📊 Monitoring Setup

### Analytics
- [ ] Google Analytics installed
- [ ] Conversion tracking setup
- [ ] User flow tracking
- [ ] Error tracking (Sentry)

### Performance Monitoring
- [ ] Vercel Analytics enabled
- [ ] Core Web Vitals tracking
- [ ] API response time monitoring

### Uptime Monitoring
- [ ] UptimeRobot configured
- [ ] Alert notifications setup
- [ ] Status page created

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '22'
      - run: npm install --legacy-peer-deps
      - run: npm run build
      - run: npm run lint
```

---

## 📝 Documentation Updates

### Before Launch
- [ ] Update README with production URL
- [ ] Add API documentation
- [ ] Create user guide
- [ ] Write admin manual
- [ ] Document troubleshooting steps

### After Launch
- [ ] Announce to stakeholders
- [ ] Train Cherry-Pick staff
- [ ] Onboard first farmers
- [ ] Onboard extension officers
- [ ] Collect initial feedback

---

## 🎯 Launch Day Checklist

### Morning of Launch
- [ ] Final code review
- [ ] Database backup (if applicable)
- [ ] Test all critical paths
- [ ] Verify monitoring is active
- [ ] Prepare rollback plan

### During Launch
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test all features
- [ ] Monitor error logs
- [ ] Watch analytics

### After Launch
- [ ] Monitor for 24 hours
- [ ] Respond to user feedback
- [ ] Fix critical bugs immediately
- [ ] Document any issues
- [ ] Plan next iteration

---

## 🐛 Rollback Plan

If something goes wrong:

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys
2. Find previous deploy
3. Click "Publish deploy"

### Self-Hosted
```bash
# Revert to previous version
git checkout previous-commit-hash
npm install --legacy-peer-deps
npm run build
pm2 restart agrochain360
```

---

## 📞 Support Contacts

### Technical Issues
- **Developer**: [Your contact]
- **CDP Support**: https://support.coinbase.com
- **Vercel Support**: https://vercel.com/support

### Business Issues
- **Cherry-Pick Admin**: [Admin contact]
- **Project Manager**: [PM contact]

---

## ✅ Final Checklist

Before marking deployment as complete:

- [ ] Application is live and accessible
- [ ] All features tested and working
- [ ] Performance metrics acceptable
- [ ] Security measures in place
- [ ] Monitoring active
- [ ] Documentation updated
- [ ] Team trained
- [ ] Users notified
- [ ] Backup plan ready
- [ ] Celebration scheduled! 🎉

---

## 🎉 Post-Launch

### Week 1
- Monitor daily active users
- Collect user feedback
- Fix critical bugs
- Optimize performance

### Month 1
- Analyze usage patterns
- Plan feature improvements
- Scale infrastructure if needed
- Conduct user surveys

### Quarter 1
- Review business metrics
- Plan next phase
- Expand to new regions
- Add requested features

---

**Deployment Date**: _______________

**Deployed By**: _______________

**Production URL**: _______________

**Status**: ⬜ Pending | ⬜ In Progress | ⬜ Complete

---

*Good luck with your deployment! 🚀*
