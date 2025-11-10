# NDA Manager - System Architecture

## File Structure

```
nda-manager/
├── app/
│   ├── page.tsx              # Login page (home)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tailwind styles
│   └── dashboard/
│       └── page.tsx          # Main dashboard (NDA management)
│
├── utils/
│   └── supabase/
│       ├── client.ts         # Browser Supabase client
│       └── server.ts         # Server Supabase client
│
├── schema.sql                # Database schema (run in Supabase)
├── .env.local.example        # Environment variables template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind config
├── next.config.js            # Next.js config
└── README.md                 # Full documentation
```

## How It Works

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ Visit site
       ▼
┌─────────────────┐
│  Login Page     │ ◄── Not logged in? Show this
│  (/)            │
└────────┬────────┘
         │
         │ Login/Signup
         ▼
┌─────────────────┐
│  Supabase Auth  │ ◄── Handles authentication
└────────┬────────┘
         │
         │ Success
         ▼
┌─────────────────────────┐
│  Dashboard              │
│  (/dashboard)           │
│                         │
│  Features:              │
│  • View all NDAs        │
│  • Send new NDA         │
│  • Send reminders       │
│  • Lock/unlock          │
│  • Track status         │
└───────┬─────────────────┘
        │
        │ CRUD operations
        ▼
┌─────────────────────┐
│  Supabase Database  │
│                     │
│  Tables:            │
│  • ndas             │
│  • auth.users       │
└─────────────────────┘
```

## User Flow

### 1. First Visit
```
User → Login Page → Click "Sign Up" → Enter email/password 
→ Receive confirmation email → Click link → Login
```

### 2. Send NDA
```
Dashboard → Click "Send New NDA" → Fill form (name, email)
→ Click "Send NDA" → Saved to database → Appears in table
```

### 3. Manage NDAs
```
Dashboard → View table → Actions:
  • Send Reminder → Updates reminder_sent date
  • Lock/Unlock → Toggles locked status
  • View all history in table
```

## Database Schema

```sql
ndas table
┌────────────────┬──────────────┬───────────────────────┐
│ Column         │ Type         │ Description           │
├────────────────┼──────────────┼───────────────────────┤
│ id             │ UUID         │ Primary key           │
│ customer_name  │ TEXT         │ Customer full name    │
│ customer_email │ TEXT         │ Customer email        │
│ sent_date      │ TIMESTAMPTZ  │ When NDA was sent     │
│ reminder_sent  │ TIMESTAMPTZ  │ Last reminder date    │
│ status         │ TEXT         │ sent/signed/etc       │
│ locked         │ BOOLEAN      │ Lock status           │
│ file_url       │ TEXT         │ Future: PDF storage   │
│ created_by     │ UUID         │ User who created it   │
└────────────────┴──────────────┴───────────────────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│ Supabase handles everything:                        │
│                                                     │
│ • User registration                                 │
│ • Email confirmation                                │
│ • Password hashing                                  │
│ • Session management                                │
│ • Row Level Security (RLS)                          │
│                                                     │
│ No custom auth code needed!                         │
└─────────────────────────────────────────────────────┘
```

## Security

**Row Level Security (RLS):**
- Users can only access data they're authenticated for
- Policies defined in schema.sql
- Automatic enforcement by Supabase

**Authentication:**
- Passwords hashed by Supabase
- JWT tokens for sessions
- Email confirmation required

## Future Extensions

```
┌──────────────────────┐
│ Cloud Storage        │  ◄── Upload actual NDA PDFs
│ (Supabase/OneDrive)  │      Store in cloud
└──────────────────────┘      Link to NDA record

┌──────────────────────┐
│ Email Service        │  ◄── Use Resend/SendGrid
│ (Resend API)         │      Actually send emails
└──────────────────────┘      Automatic reminders

┌──────────────────────┐
│ E-signature          │  ◄── DocuSign integration
│ (DocuSign API)       │      Digital signing
└──────────────────────┘      Update status automatically
```

## Tech Stack Choices

**Why Next.js?**
- Modern, fast
- Server + client components
- Easy deployment
- Great developer experience

**Why Supabase?**
- Free tier is generous
- Built-in auth
- PostgreSQL database
- Real-time updates (if needed)
- Easy to use

**Why Tailwind?**
- Fast styling
- No separate CSS files
- Responsive by default
- Utility-first approach

---

This is a production-ready foundation. Add features as you need them!
