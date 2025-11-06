# Supabase Setup Guide for AgroChain360

## Overview
This guide will help you set up Supabase as the database for AgroChain360.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub or create an account
4. Click "New Project"
5. Fill in the details:
   - **Name**: AgroChain360
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to Zambia (e.g., South Africa)
   - **Pricing Plan**: Free tier is fine for development
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

## Step 2: Get Your Credentials

Once your project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. You'll see:
   - **Project URL**: Copy this
   - **anon/public key**: Copy this

## Step 3: Update Environment Variables

1. Open `.env.local` in your project
2. Replace the Supabase placeholders:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run the Database Schema

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned"

## Step 5: Verify Tables Created

1. Click **Table Editor** in the sidebar
2. You should see these tables:
   - farmers
   - contracts
   - milestones
   - extension_officers
   - verification_tasks
   - evidence
   - payments

## Step 6: Test the Connection

Restart your development server:

```bash
npm run dev
```

The app should now connect to Supabase!

## Database Schema Overview

### Tables

#### farmers
- Stores farmer information
- Links to wallet addresses
- Tracks farm location and size

#### contracts
- Smart contract details
- Links to farmers
- Tracks crop type, quantities, prices

#### milestones
- Contract milestones
- Payment tracking
- Status management

#### extension_officers
- Officer profiles
- Availability status
- Performance metrics

#### verification_tasks
- Milestone verification requests
- Officer assignments
- Location data

#### evidence
- Photos and notes from farmers/officers
- Geolocation data
- Timestamps

#### payments
- Transaction records
- Payment status tracking
- Links to contracts and milestones

## Security (Row Level Security)

The schema includes RLS policies that currently allow all operations. 

For production, you should customize these policies:

```sql
-- Example: Farmers can only see their own data
CREATE POLICY "Farmers see own data" ON farmers
  FOR SELECT USING (auth.uid() = id);
```

## Backup & Recovery

Supabase automatically backs up your database daily on the free tier.

To manually backup:
1. Go to **Database** → **Backups**
2. Click **Create backup**

## Next Steps

1. ✅ Supabase project created
2. ✅ Environment variables configured
3. ✅ Database schema deployed
4. ✅ Tables verified
5. ⬜ Integrate with application code
6. ⬜ Test CRUD operations
7. ⬜ Deploy to production

## Troubleshooting

### Connection Error
- Verify URL and anon key are correct
- Check for typos in `.env.local`
- Restart dev server

### Schema Error
- Make sure UUID extension is enabled
- Run schema in correct order
- Check for syntax errors

### Permission Error
- Verify RLS policies
- Check anon key permissions
- Review Supabase logs

## Support

- Supabase Docs: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions
