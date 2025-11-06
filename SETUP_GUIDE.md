# AgroChain360 Setup Guide

This guide will walk you through setting up AgroChain360 on your local machine and deploying it to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Coinbase Developer Platform Setup](#coinbase-developer-platform-setup)
4. [Testing the Application](#testing-the-application)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 22+**: [Download here](https://nodejs.org/)
- **npm, pnpm, or yarn**: Comes with Node.js
- **Git**: [Download here](https://git-scm.com/)
- **A code editor**: VS Code recommended

---

## Local Development Setup

### Step 1: Navigate to Project Directory

```bash
cd "c:/Users/lisel/OneDrive/Pictures/cherry pick/agrochain360"
```

### Step 2: Install Dependencies

```bash
npm install --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` due to React 19 compatibility with CDP SDK.

### Step 3: Verify Installation

Check that all packages are installed:
```bash
npm list --depth=0
```

You should see packages like:
- @coinbase/cdp-react
- @coinbase/cdp-sdk
- @coinbase/cdp-hooks
- next
- react
- viem
- lucide-react

---

## Coinbase Developer Platform Setup

### Step 1: Create CDP Account

1. Go to [https://portal.cdp.coinbase.com](https://portal.cdp.coinbase.com)
2. Sign up or log in with your Coinbase account
3. Complete the verification process

### Step 2: Create a New Project

1. Click **"Create Project"** in the CDP Portal
2. Name your project: **"AgroChain360"**
3. Select **"Web Application"** as the project type
4. Click **"Create"**

### Step 3: Get Your Project ID

1. In your project dashboard, locate the **Project ID**
2. It looks like: `8c21e60b-c8af-4286-a0d3-111111111111`
3. Copy this ID

### Step 4: Configure Allowed Origins

1. In your project settings, find **"Allowed Origins"**
2. Add the following URLs:
   - `http://localhost:3000`
   - `http://127.0.0.1:3000`
3. Save changes

### Step 5: Update Environment Variables

1. Open `.env.local` in the project root
2. Replace `your-project-id-here` with your actual Project ID:

```bash
NEXT_PUBLIC_CDP_PROJECT_ID=8c21e60b-c8af-4286-a0d3-111111111111
```

3. Save the file

---

## Testing the Application

### Step 1: Start Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in 1874ms
- Local: http://localhost:3000
```

### Step 2: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

### Step 3: Test Authentication

1. Click **"Sign In"** button
2. Choose authentication method:
   - **Email**: Enter your email and verify with OTP
   - **SMS**: Enter phone number and verify with OTP
   - **Google OAuth**: Sign in with Google account

3. After successful authentication, you should see your wallet address in the header

### Step 4: Test User Roles

After signing in, you'll see three role options:

#### Test as Farmer:
1. Click **"Farmer"** role
2. Click **"Create New Contract"**
3. Fill in the form:
   - Crop Type: Select "Mangoes"
   - Variety: "Kent"
   - Farm Size: "2.5"
   - Required Quantity: "1000"
   - Discounted Price: "15.50"
   - Standard Price: "18.00"
   - Expected Harvest Date: Select a future date
4. Click **"Create Contract"**
5. Verify the contract appears in your dashboard with milestones

#### Test as Extension Officer:
1. Sign out and sign in again (or use a different browser)
2. Click **"Extension Officer"** role
3. Toggle availability to **ON**
4. View available verification tasks
5. Accept a task to test the verification flow

#### Test as Admin:
1. Click **"Cherry-Pick Admin"** role
2. View platform statistics
3. See recent activity
4. Check crop distribution charts

---

## Deployment

### Option 1: Deploy to Vercel (Recommended)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AgroChain360"
git branch -M main
git remote add origin https://github.com/yourusername/agrochain360.git
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   - Key: `NEXT_PUBLIC_CDP_PROJECT_ID`
   - Value: Your CDP Project ID
6. Click **"Deploy"**

#### Step 3: Update CDP Allowed Origins

1. Go back to CDP Portal
2. Add your Vercel URL to Allowed Origins:
   - `https://your-app.vercel.app`
3. Save changes

### Option 2: Deploy to Netlify

#### Step 1: Build the Application

```bash
npm run build
```

#### Step 2: Deploy to Netlify

1. Go to [https://netlify.com](https://netlify.com)
2. Drag and drop the `.next` folder
3. Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Step 3: Configure Environment Variables

In Netlify dashboard:
1. Go to **Site Settings** → **Environment Variables**
2. Add `NEXT_PUBLIC_CDP_PROJECT_ID`
3. Redeploy

### Option 3: Manual Server Deployment

#### Step 1: Build for Production

```bash
npm run build
```

#### Step 2: Start Production Server

```bash
npm start
```

The app will run on port 3000 by default.

#### Step 3: Use PM2 for Process Management

```bash
npm install -g pm2
pm2 start npm --name "agrochain360" -- start
pm2 save
pm2 startup
```

---

## Troubleshooting

### Issue: "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue: CDP authentication not working

**Checklist**:
1. ✓ Project ID is correct in `.env.local`
2. ✓ `http://localhost:3000` is whitelisted in CDP Portal
3. ✓ Environment variable starts with `NEXT_PUBLIC_`
4. ✓ Restart dev server after changing `.env.local`

### Issue: "Invalid Project ID" error

**Solution**:
1. Verify Project ID in CDP Portal
2. Ensure no extra spaces in `.env.local`
3. Restart the development server

### Issue: Styles not loading

**Solution**:
```bash
npm run dev -- --turbo
```

Or clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Issue: TypeScript errors

The following warnings are expected and won't affect functionality:
- "Props must be serializable" warnings
- "@theme" CSS warnings

To suppress them, you can ignore or they'll be resolved in production build.

### Issue: Port 3000 already in use

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

---

## Additional Configuration

### Enable Base Sepolia Testnet

To test blockchain transactions:

1. Get test ETH from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Use your wallet address from the app
3. Wait for confirmation (~30 seconds)

### Configure Smart Contract Addresses

When deploying actual smart contracts:

1. Update `lib/config.ts`:
```typescript
export const CONTRACT_ADDRESSES = {
  "base-sepolia": "0x...",
  "base-mainnet": "0x..."
};
```

### Add Custom Crops

To add more crop types:

1. Edit `lib/config.ts`
2. Add to `SUPPORTED_CROPS` array
3. Add milestones to `CROP_MILESTONES` object

---

## Next Steps

1. **Customize Branding**: Update colors in `lib/theme.ts`
2. **Add Real Data**: Integrate with your backend API
3. **Deploy Smart Contracts**: Deploy actual contracts to Base network
4. **Set Up Database**: Add PostgreSQL or MongoDB for data persistence
5. **Enable Notifications**: Add push notifications for milestone updates
6. **Integrate Maps**: Add Google Maps for location tracking
7. **Add Analytics**: Integrate analytics for tracking usage

---

## Support

For help:
- **Email**: support@cherrypick.com
- **CDP Documentation**: [https://docs.cdp.coinbase.com](https://docs.cdp.coinbase.com)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

---

## Security Notes

⚠️ **Important**:
- Never commit `.env.local` to version control
- Keep your CDP Project ID secure
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Regularly update dependencies

---

## License

Proprietary - Cherry-Pick Ltd. All rights reserved.
