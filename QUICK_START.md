# 🚀 AgroChain360 - Quick Start Guide (UPDATED WITH SUPABASE)

## 🚀 Get Running in 5 Minutes

### Step 1: Get CDP Project ID (2 minutes)
1. Go to https://portal.cdp.coinbase.com
2. Sign in or create account
3. Click "Create Project" → Name it "AgroChain360"
4. Copy your **Project ID** (looks like: `8c21e60b-c8af-4286-a0d3-111111111111`)
5. Add `http://localhost:3000` to **Allowed Origins**

### Step 2: Configure Environment (30 seconds)
1. Open `.env.local` file
2. Replace `your-project-id-here` with your actual Project ID:
```bash
NEXT_PUBLIC_CDP_PROJECT_ID=8c21e60b-c8af-4286-a0d3-111111111111
```
3. Save the file

### Step 3: Start the App (1 minute)
```bash
npm run dev
```

### Step 4: Test It! (2 minutes)
1. Open http://localhost:3000
2. Click "Sign In" → Choose Email/SMS/Google
3. Select a role: Farmer, Officer, or Admin
4. Explore the dashboard!

---

## 🎯 Quick Test Scenarios

### Test as Farmer
1. Sign in → Select "Farmer"
2. Click "Create New Contract"
3. Fill form:
   - Crop: Mangoes
   - Variety: Kent
   - Farm Size: 2.5 hectares
   - Quantity: 1000 kg
   - Discounted Price: K15.50
   - Standard Price: K18.00
4. Submit and view your contract!

### Test as Officer
1. Sign in → Select "Extension Officer"
2. Toggle availability ON
3. View available tasks
4. Accept a verification task

### Test as Admin
1. Sign in → Select "Cherry-Pick Admin"
2. View platform statistics
3. Check recent activity
4. See crop distribution

---

## 📱 What You Can Do

### Farmers Can:
- ✅ Create smart contracts
- ✅ Track milestones
- ✅ Submit evidence
- ✅ Monitor payments
- ✅ View QR codes

### Officers Can:
- ✅ Accept verification tasks
- ✅ Perform inspections
- ✅ Submit verification
- ✅ Track earnings
- ✅ View ratings

### Admins Can:
- ✅ Monitor all contracts
- ✅ View analytics
- ✅ Track performance
- ✅ Manage platform
- ✅ Generate reports

---

## 🛠️ Useful Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production
npm start

# Check for errors
npm run lint
```

---

## 🆘 Quick Fixes

### App won't start?
```bash
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run dev
```

### Authentication not working?
1. Check Project ID is correct
2. Verify `http://localhost:3000` is whitelisted
3. Restart dev server

### Port 3000 in use?
```bash
npm run dev -- -p 3001
```

---

## 📚 Full Documentation

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup
- **PROJECT_SUMMARY.md** - Complete feature list

---

## 🎉 You're Ready!

The app is now running at: **http://localhost:3000**

Click the browser preview button above to view it! 👆

---

**Need Help?**
- CDP Docs: https://docs.cdp.coinbase.com
- Next.js Docs: https://nextjs.org/docs
