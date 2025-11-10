# NDA Manager - Quick Start Guide

## What You Got

Complete NDA management system with:
- Login/Signup page
- Dashboard to manage NDAs
- Send NDAs to customers
- Track sent dates, reminders, status
- Lock/unlock NDAs
- Multi-user support

## Setup (5 minutes)

### 1. Extract the files
```bash
tar -xzf nda-manager.tar.gz
cd nda-manager
```

### 2. Setup Supabase (Free)
1. Go to supabase.com → Sign up
2. Create new project
3. Go to SQL Editor → Run this:
   ```sql
   (Copy everything from schema.sql)
   ```
4. Go to Settings → API → Copy:
   - Project URL
   - Anon key

### 3. Configure
```bash
cp .env.local.example .env.local
nano .env.local  # Add your Supabase URL and key
```

### 4. Run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## First Time Use

1. Click "Sign Up"
2. Enter email + password
3. Check email for confirmation
4. Login
5. Click "Send New NDA"
6. Done!

## Features Overview

**Dashboard Shows:**
- All NDAs in table
- Customer name & email
- Date sent
- Last reminder date
- Status (sent/signed/etc)
- Lock/unlock button

**Actions:**
- Send new NDA
- Send reminder
- Lock/unlock NDA
- View all history

## Database Structure

```
ndas table:
- id
- customer_name
- customer_email  
- sent_date (when NDA sent)
- reminder_sent (when reminder sent)
- status (sent/signed/etc)
- locked (true/false)
- file_url (for future cloud storage)
- created_by (user who sent it)
```

## Add More Features Later

**Cloud Storage:**
- Upload actual NDA PDFs
- Use Supabase Storage or OneDrive API
- Just add file upload component

**Email Integration:**
- Add Resend API (free tier: 3000/month)
- Actually send emails to customers
- Automatic reminders

**More Status Types:**
- Signed
- Rejected
- Expired

## Tech Used

- Next.js 14 (React framework)
- Supabase (database + auth)
- Tailwind CSS (styling)
- TypeScript

## Deploy to Production

**Vercel (Recommended - Free):**
1. Push to GitHub
2. Import to Vercel
3. Add env variables
4. Deploy!

**Or any Node.js host**

---

Questions? Check README.md for more details.
