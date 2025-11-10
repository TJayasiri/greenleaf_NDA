# NDA Manager

Complete NDA management system with authentication, dashboard, and tracking.

## Features

✅ **Login/Signup** - Secure authentication with Supabase  
✅ **Dashboard** - View all NDAs at a glance  
✅ **Send NDAs** - Send NDAs to customers  
✅ **Database Storage** - All data saved in Supabase  
✅ **Track Everything** - Date sent, reminders, status  
✅ **Lock NDAs** - Lock/unlock NDAs as needed  
✅ **User Management** - Multi-user support built-in

## Quick Setup

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the `schema.sql` file
4. Go to **Settings > API** and copy:
   - Project URL
   - Anon/Public key

### 2. Local Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### 3. First User
- Click "Sign Up" to create your account
- Check email for confirmation link
- Login and start managing NDAs!

## Usage

### Send NDA
1. Click "Send New NDA"
2. Enter customer name and email
3. Click "Send NDA"

### Track NDAs
- View all NDAs in the dashboard table
- See sent dates, reminder dates, and status
- Lock/unlock NDAs as needed
- Send reminders to customers

### Add Users
- Just give them the URL
- They sign up with their email
- All users can see and manage all NDAs

## Database Schema

```sql
ndas
├── id (UUID)
├── customer_name (TEXT)
├── customer_email (TEXT)
├── sent_date (TIMESTAMPTZ)
├── reminder_sent (TIMESTAMPTZ)
├── status (TEXT)
├── locked (BOOLEAN)
├── file_url (TEXT) - For future cloud storage
└── created_by (UUID)
```

## Future Enhancements

**Cloud Storage Integration:**
- Add file upload for NDA PDFs
- Store in Supabase Storage or OneDrive
- Link files to NDA records

**Email Integration:**
- Use Resend API to actually send emails
- Automatic reminder emails
- Email templates

**Status Updates:**
- Add "signed" status when customer signs
- Track signature date
- Upload signed documents

## Tech Stack

- **Frontend:** Next.js 14 + React + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Deployment:** Vercel (recommended)

## Deploy to Production

```bash
# Build
npm run build

# Deploy to Vercel
# Just connect your GitHub repo to Vercel
# Add environment variables in Vercel dashboard
```

---

**Made with ⚡ by a self-taught coder**
# greenleaf_NDA
