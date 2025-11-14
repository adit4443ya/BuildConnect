# CLAUDE.md - AI Assistant Guide for BuildConnect

> **Last Updated:** 2025-11-14
> **Project Version:** 1.0 MVP (95% Complete)
> **Framework:** Next.js 14.2.3 with App Router
> **Language:** JavaScript (not TypeScript)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Development Workflows](#development-workflows)
- [Code Conventions](#code-conventions)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Common Tasks](#common-tasks)
- [Testing & Debugging](#testing--debugging)
- [Deployment](#deployment)
- [Important Files](#important-files)
- [Do's and Don'ts](#dos-and-donts)

---

## Project Overview

**BuildConnect** is a construction bidding platform that connects builders with contractors through a transparent tender/bidding system.

### User Roles
1. **Builders:** Post construction projects and review bids
2. **Contractors:** Browse projects and submit competitive bids

### Core Workflow
```
Builder posts project → Contractor submits bid → Builder reviews bids
→ Builder accepts/rejects → Email notifications sent → Project awarded
```

### Project Status
- **95% Complete MVP** - Production-ready
- All Priority 1 & 2 features implemented
- 13 pages, 50+ components, 4 API routes
- Fully responsive and mobile-ready
- Comprehensive documentation

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14.2.3 (App Router, not Pages Router)
- **Language:** JavaScript (JSX, not TypeScript)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4.1
- **Components:** shadcn/ui (built on Radix UI)
- **Icons:** Lucide React
- **Forms:** React Hook Form 7.58.1 + Zod validation
- **Date Utils:** date-fns 4.1.0

### Backend
- **Database:** PostgreSQL via Supabase
- **Authentication:** Supabase Auth (@supabase/ssr, @supabase/supabase-js)
- **Email Service:** Resend
- **API Routes:** Next.js App Router API routes

### Development Tools
- **Package Manager:** Yarn 1.22.22
- **Path Aliases:** `@/` for root imports
- **CSS Utilities:** clsx, tailwind-merge, class-variance-authority

### Infrastructure
- **Hosting:** Vercel (optimized configuration)
- **Database Hosting:** Supabase Cloud
- **Email Service:** Resend.com

---

## Directory Structure

```
/home/user/BuildConnect/
│
├── app/                                    # Next.js App Router
│   ├── page.js                             # Landing page
│   ├── layout.js                           # Root layout with UserProvider
│   ├── globals.css                         # Global styles + Tailwind config
│   │
│   ├── login/                              # Authentication
│   │   └── page.jsx
│   ├── signup/
│   │   └── page.jsx
│   │
│   ├── profile/                            # Public profiles
│   │   ├── builder/[id]/page.jsx
│   │   └── contractor/[id]/page.jsx
│   │
│   ├── builder/                            # Builder section (protected)
│   │   ├── dashboard/page.jsx              # Builder dashboard with stats
│   │   ├── profile/page.jsx                # Edit builder profile
│   │   └── projects/
│   │       ├── page.jsx                    # All builder's projects
│   │       ├── new/page.jsx                # Create new project
│   │       └── [id]/page.jsx               # Project details + bids
│   │
│   ├── contractor/                         # Contractor section (protected)
│   │   ├── dashboard/page.jsx              # Contractor dashboard with stats
│   │   ├── profile/page.jsx                # Edit contractor profile
│   │   ├── bids/page.jsx                   # View all contractor's bids
│   │   └── projects/
│   │       ├── page.jsx                    # Browse all projects
│   │       └── [id]/page.jsx               # Project details + bid submission
│   │
│   └── api/                                # API Routes
│       ├── emails/
│       │   ├── bid-received/route.js       # POST - Notify builder of new bid
│       │   ├── bid-accepted/route.js       # POST - Notify contractor bid accepted
│       │   └── bid-rejected/route.js       # POST - Notify contractor bid rejected
│       └── [[...path]]/route.js            # Catch-all route
│
├── components/
│   ├── auth/                               # Authentication components
│   │   ├── SignInForm.jsx
│   │   └── SignUpForm.jsx
│   ├── layout/
│   │   └── DashboardLayout.jsx             # Shared dashboard layout
│   ├── ui/                                 # shadcn/ui components (50+ files)
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   ├── badge.jsx
│   │   └── ... (accordion, tabs, toast, etc.)
│   └── RatingModal.jsx
│
├── context/
│   └── UserContext.jsx                     # Global user state (auth + profile)
│
├── hooks/
│   ├── use-toast.js                        # Toast notifications
│   └── use-mobile.jsx                      # Mobile detection hook
│
├── lib/
│   ├── supabase/
│   │   ├── client.js                       # Browser Supabase client
│   │   └── server.js                       # Server Supabase client
│   ├── email.js                            # Email utility functions
│   └── utils.js                            # General utilities (cn function)
│
├── middleware.js                           # Auth & route protection
│
├── Configuration Files:
│   ├── package.json                        # Dependencies & scripts
│   ├── next.config.js                      # Next.js config (Vercel optimized)
│   ├── tailwind.config.js                  # Tailwind theme + plugins
│   ├── jsconfig.json                       # Path aliases
│   ├── postcss.config.js                   # PostCSS config
│   ├── components.json                     # shadcn/ui configuration
│   └── .env                                # Environment variables
│
├── Database Schema Files:
│   ├── supabase-schema.sql                 # Main schema (USE THIS)
│   ├── supabase-complete-setup.sql
│   ├── supabase-ratings-and-enhancements.sql
│   ├── supabase-fix-awarded-to.sql
│   └── supabase-trigger-fix.sql
│
└── Documentation:
    ├── README.md                           # Quick start guide
    ├── SETUP_GUIDE.md                      # Comprehensive setup
    ├── DEPLOYMENT_GUIDE.md                 # Deployment instructions
    ├── PROJECT_STATUS.md                   # Feature completion status
    ├── DEPLOYMENT_CHECKLIST.md             # Pre-deployment checks
    ├── PRE_DEPLOYMENT_CHECKLIST.md
    ├── NEW_FEATURES_GUIDE.md
    ├── QUICK_FIX_GUIDE.md
    ├── RLS_FIX_GUIDE.md
    └── CLAUDE.md                           # This file
```

---

## Development Workflows

### Starting Development

```bash
# Install dependencies
yarn install

# Start development server (with memory limits)
yarn dev
# Runs on http://0.0.0.0:3000

# Development without hot reload (if memory issues)
yarn dev:no-reload

# Production build
yarn build

# Start production server
yarn start
```

### Development Server Configuration
- **Host:** 0.0.0.0 (accessible from network)
- **Port:** 3000
- **Memory Limit:** 512MB (NODE_OPTIONS='--max-old-space-size=512')
- **Hot Reload:** Enabled by default (optimized watch settings)

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add [component-name]
```

Component config is in `/home/user/BuildConnect/components.json`:
- Style: new-york
- RSC: true
- TSX: false (using JSX)
- Base color: slate

### Path Aliases (jsconfig.json)

```javascript
// All these work:
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/context/UserContext'
```

### Database Management

**Schema Location:** `/home/user/BuildConnect/supabase-schema.sql`

**To apply schema:**
1. Go to https://supabase.com/dashboard
2. Select project: `oeccxntwqrlgwvretorl`
3. SQL Editor → New Query
4. Paste contents of `supabase-schema.sql`
5. Run it

**To modify schema:**
- Edit the SQL file
- Re-run in Supabase SQL Editor
- OR write migration SQL separately

---

## Code Conventions

### File Naming
- **Components:** PascalCase (e.g., `SignUpForm.jsx`, `DashboardLayout.jsx`)
- **Utilities:** camelCase (e.g., `email.js`, `utils.js`)
- **Pages:** lowercase (Next.js convention: `page.jsx`, `layout.jsx`)
- **API Routes:** lowercase (`route.js`)

### Component Structure

**Client Components (Interactive):**
```javascript
'use client'  // MUST be first line

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/context/UserContext'
import { Button } from '@/components/ui/button'

export default function ComponentName() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const { user, userRole } = useUser()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('table_name')
        .select('*')

      if (error) throw error
      setData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* JSX here */}
    </div>
  )
}
```

**Server Components (Data Fetching):**
```javascript
// NO 'use client' directive
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('table_name')
    .select('*')

  return <div>{/* JSX */}</div>
}
```

### Naming Conventions

**Functions:**
```javascript
// Use camelCase
const handleSubmit = async () => {}
const fetchProjects = async () => {}
const updateProfile = async () => {}
```

**Variables:**
```javascript
// Use camelCase
const userData = {}
const isLoading = false
const projectList = []
```

**Database Columns:**
```javascript
// Use snake_case (Supabase convention)
created_at, updated_at, user_type, full_name, quoted_price
```

**CSS Classes:**
```javascript
// Use Tailwind utilities + cn() helper
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  customClassName
)} />
```

### Error Handling Pattern

```javascript
try {
  // Operation
  const { data, error } = await supabase.from('table').select()
  if (error) throw error

  // Success handling
  setData(data)
  toast({ title: "Success!" })
} catch (error) {
  console.error('Error:', error)
  toast({
    title: "Error",
    description: error.message,
    variant: "destructive"
  })
} finally {
  setLoading(false)
}
```

### Supabase Query Patterns

**Simple Select:**
```javascript
const { data, error } = await supabase
  .from('projects')
  .select('*')
```

**With Filters:**
```javascript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('builder_id', userId)
  .eq('status', 'open')
  .order('created_at', { ascending: false })
```

**With Joins:**
```javascript
const { data, error } = await supabase
  .from('bids')
  .select(`
    *,
    contractor:profiles!bids_contractor_id_fkey(
      id,
      full_name,
      email
    )
  `)
  .eq('project_id', projectId)
```

**Insert:**
```javascript
const { data, error } = await supabase
  .from('bids')
  .insert({
    project_id: projectId,
    contractor_id: userId,
    quoted_price: price,
    proposal: text
  })
  .select()
```

**Update:**
```javascript
const { data, error } = await supabase
  .from('projects')
  .update({ status: 'awarded', awarded_to: contractorId })
  .eq('id', projectId)
```

---

## Database Schema

### Tables Overview

**5 Main Tables:**
1. `profiles` - User accounts (both builders & contractors)
2. `contractors` - Contractor-specific data
3. `projects` - Construction projects
4. `bids` - Contractor bids on projects
5. `reviews` - Ratings and reviews (schema ready, UI not implemented)

### Profiles Table

```sql
id              UUID PRIMARY KEY (references auth.users)
email           TEXT NOT NULL UNIQUE
full_name       TEXT NOT NULL
phone           TEXT NOT NULL
user_type       TEXT ('builder' | 'contractor')
company_name    TEXT
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Key Points:**
- `id` matches Supabase Auth user ID
- `user_type` determines role (critical for authorization)
- Auto-created on signup via database trigger

### Contractors Table

```sql
id                    UUID PRIMARY KEY
user_id               UUID REFERENCES profiles(id)
specializations       TEXT[] (array of specializations)
experience_years      INTEGER
team_size             INTEGER
service_locations     TEXT[] (array of cities)
bio                   TEXT
portfolio_images      TEXT[] (array of URLs)
rating                DECIMAL(2,1)
total_projects        INTEGER
verification_status   TEXT ('pending' | 'verified' | 'rejected')
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

**Key Points:**
- One-to-one with profiles (only for contractors)
- Uses PostgreSQL arrays for specializations & locations
- Rating auto-calculated via trigger

### Projects Table

```sql
id                        UUID PRIMARY KEY
builder_id                UUID REFERENCES profiles(id)
title                     TEXT NOT NULL
description               TEXT NOT NULL
project_type              TEXT ('residential' | 'commercial' | 'infrastructure' | 'renovation')
location                  TEXT NOT NULL
city                      TEXT NOT NULL
required_specializations  TEXT[]
budget_min                INTEGER
budget_max                INTEGER
start_date                DATE
duration_days             INTEGER
status                    TEXT ('open' | 'bidding_closed' | 'awarded' | 'completed' | 'cancelled')
document_url              TEXT
awarded_to                UUID REFERENCES contractors(id)
bidding_deadline          TIMESTAMP
created_at                TIMESTAMP
updated_at                TIMESTAMP
```

**Status Flow:**
- `open` → `awarded` (when bid accepted)
- `awarded` → `completed` (when project finished)

### Bids Table

```sql
id                  UUID PRIMARY KEY
project_id          UUID REFERENCES projects(id)
contractor_id       UUID REFERENCES profiles(id)
quoted_price        INTEGER NOT NULL
estimated_duration  INTEGER NOT NULL
proposal            TEXT NOT NULL
attachments         TEXT[]
status              TEXT ('pending' | 'accepted' | 'rejected' | 'withdrawn')
created_at          TIMESTAMP
updated_at          TIMESTAMP

UNIQUE(project_id, contractor_id)  -- One bid per contractor per project
```

**Status Values:**
- `pending` - Waiting for builder decision
- `accepted` - Bid won, project awarded
- `rejected` - Bid declined by builder
- `withdrawn` - Contractor withdrew bid

### Reviews Table (Schema Ready, UI Not Implemented)

```sql
id             UUID PRIMARY KEY
project_id     UUID REFERENCES projects(id)
builder_id     UUID REFERENCES profiles(id)
contractor_id  UUID REFERENCES contractors(id)
rating         INTEGER (1-5)
review_text    TEXT
created_at     TIMESTAMP
```

### Row Level Security (RLS) Policies

**All tables have RLS enabled.** Key policies:

**Profiles:**
- Public: Can SELECT (view all profiles)
- Authenticated: Can UPDATE own profile

**Contractors:**
- Public: Can SELECT (view contractor profiles)
- Authenticated: Can UPDATE own contractor record

**Projects:**
- Public: Can SELECT (view all projects)
- Builders: Can INSERT, UPDATE, DELETE own projects

**Bids:**
- Contractors: Can SELECT own bids, INSERT/UPDATE own bids
- Builders: Can SELECT bids on their projects
- No one can DELETE bids (audit trail)

**Reviews:**
- Public: Can SELECT (view all reviews)
- Authenticated: Can INSERT reviews (with validation)

### Database Functions & Triggers

**update_updated_at_column():**
- Automatically sets `updated_at = NOW()` on UPDATE
- Applied to all tables

**update_contractor_rating():**
- Recalculates contractor's average rating when new review added
- Updates `contractors.rating` and `contractors.total_projects`

---

## Authentication & Authorization

### Authentication Provider: Supabase Auth

### Session Management

**Three Layers:**
1. **Middleware** (`/home/user/BuildConnect/middleware.js`)
2. **UserContext** (`/home/user/BuildConnect/context/UserContext.jsx`)
3. **Component-level checks**

### Middleware (middleware.js)

**Runs on every request** (except static assets, images, API routes)

```javascript
// Protected routes
const builderPaths = ['/builder']
const contractorPaths = ['/contractor']

// What it does:
1. Refreshes Supabase session
2. Checks if user is authenticated
3. Redirects to /login if not
4. Checks role matches route (builder vs contractor)
5. Redirects to correct dashboard if role mismatch
```

**Matcher:**
```javascript
matcher: ['/((?!_next/static|_next/image|favicon.ico|images|public|api).*)']
```

### UserContext Pattern

**Provides global auth state:**

```javascript
import { useUser } from '@/context/UserContext'

function Component() {
  const { user, userRole, profile, loading, refreshProfile } = useUser()

  // user: Supabase auth user object
  // userRole: 'builder' or 'contractor'
  // profile: Full profile data from profiles table
  // loading: Boolean
  // refreshProfile: Function to reload profile data
}
```

**Usage in components:**
```javascript
useEffect(() => {
  if (!loading && !user) {
    router.push('/login')
  }
}, [user, loading])
```

### Signup Flow

**Location:** `/home/user/BuildConnect/app/signup/page.jsx`

```javascript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name,
      phone,
      company_name,
      user_type,  // 'builder' or 'contractor'
    }
  }
})
```

**Database triggers automatically:**
- Create profile record in `profiles` table
- If contractor, create record in `contractors` table

### Login Flow

**Location:** `/home/user/BuildConnect/app/login/page.jsx`

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})

// After login:
// - Middleware refreshes session
// - UserContext loads user data
// - Redirect to dashboard based on role
```

### Logout Flow

**Any component:**
```javascript
const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
```

### Authorization Patterns

**Route-level (Middleware):**
```javascript
// Automatically enforced for /builder/* and /contractor/* routes
// No code needed in components
```

**Component-level:**
```javascript
// Check if user can edit resource
if (project.builder_id !== user.id) {
  return <div>Not authorized</div>
}
```

**Database-level (RLS):**
```sql
-- Example: Only builders can update their own projects
CREATE POLICY "Builders can update own projects"
ON projects FOR UPDATE
USING (auth.uid() = builder_id);
```

### Accessing User Data

**In Client Components:**
```javascript
const supabase = createClient()  // from @/lib/supabase/client
const { data: { user } } = await supabase.auth.getUser()
```

**In Server Components:**
```javascript
const supabase = createClient()  // from @/lib/supabase/server
const { data: { user } } = await supabase.auth.getUser()
```

**In API Routes (with elevated permissions):**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Service role for admin operations
)
```

---

## Common Tasks

### Task 1: Add a New Page

**Example: Add "My Profile" page for contractors**

1. **Create page file:**
```bash
# Path: /home/user/BuildConnect/app/contractor/profile/page.jsx
```

2. **Use client component if interactive:**
```javascript
'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext'
import { createClient } from '@/lib/supabase/client'

export default function ContractorProfile() {
  const { user, profile, loading } = useUser()
  const [data, setData] = useState(null)

  // Component logic...

  return <div>Profile content</div>
}
```

3. **Route is automatically available at `/contractor/profile`**

### Task 2: Add a New Database Table

1. **Write SQL migration:**
```sql
-- Add to supabase-schema.sql or create new migration file
CREATE TABLE table_name (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columns...
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "policy_name" ON table_name
  FOR SELECT USING (true);  -- Adjust as needed

-- Add trigger for updated_at
CREATE TRIGGER update_table_name_updated_at
  BEFORE UPDATE ON table_name
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

2. **Run in Supabase SQL Editor**

3. **Query from components:**
```javascript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
```

### Task 3: Add Email Notification

1. **Create email template in `/home/user/BuildConnect/lib/email.js`:**
```javascript
export const sendCustomEmail = async (toEmail, data) => {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Subject</h1>
      <p>Message with ${data.variable}</p>
    </body>
    </html>
  `

  return await resend.emails.send({
    from: 'BuildConnect <onboarding@resend.dev>',
    to: toEmail,
    subject: 'Subject Line',
    html: emailHtml,
  })
}
```

2. **Create API route at `/home/user/BuildConnect/app/api/emails/custom/route.js`:**
```javascript
import { NextResponse } from 'next/server'
import { sendCustomEmail } from '@/lib/email'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, data } = body

    await sendCustomEmail(email, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

3. **Call from component:**
```javascript
await fetch('/api/emails/custom', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: user.email,
    data: { variable: 'value' }
  })
})
```

### Task 4: Add a Form with Validation

**Using React Hook Form + Zod (already installed):**

```javascript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
})

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('title')} />
      {errors.title && <p>{errors.title.message}</p>}

      <Input type="number" {...register('price', { valueAsNumber: true })} />
      {errors.price && <p>{errors.price.message}</p>}

      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Task 5: Add a shadcn/ui Component

```bash
# List available components
npx shadcn-ui@latest add

# Add specific component
npx shadcn-ui@latest add dropdown-menu

# Component added to /home/user/BuildConnect/components/ui/dropdown-menu.jsx
```

**Then use it:**
```javascript
import { DropdownMenu } from '@/components/ui/dropdown-menu'
```

### Task 6: Fetch and Display Data

**Pattern used throughout the app:**

```javascript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/context/UserContext'

export default function DataList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchItems()
    }
  }, [user])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('table_name')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}
```

### Task 7: Update User Profile

**Example from contractor profile page:**

```javascript
const handleUpdate = async () => {
  try {
    // Update profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name, phone, company_name })
      .eq('id', user.id)

    if (profileError) throw profileError

    // Update contractors table
    const { error: contractorError } = await supabase
      .from('contractors')
      .update({
        specializations,
        service_locations,
        experience_years,
        team_size,
        bio
      })
      .eq('user_id', user.id)

    if (contractorError) throw contractorError

    // Refresh user context
    refreshProfile()

    toast({ title: 'Profile updated!' })
  } catch (error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive'
    })
  }
}
```

---

## Testing & Debugging

### Testing Approach

**This project uses manual testing** (no automated tests)

### Manual Testing Workflow

**Test with two users simultaneously:**

1. **Regular browser:** Builder account
2. **Incognito window:** Contractor account

**Test scenario:**
```
1. Builder signs up → creates account
2. Contractor signs up → creates account
3. Builder posts project → appears in database
4. Contractor views project → sees new project
5. Contractor submits bid → builder gets email
6. Builder accepts bid → contractor gets email
7. Check status updates → project awarded, bid accepted
```

### Debugging Tools

**Browser Console:**
```javascript
console.log('Debug:', data)
console.error('Error:', error)
```

**Supabase Dashboard:**
- **Table Editor:** View/edit data directly
- **SQL Editor:** Run queries
- **Logs:** View API logs (last 24 hours)
- **Auth:** View users and sessions

**Resend Dashboard:**
- View email delivery logs
- Check email status (sent, delivered, failed)
- View email content

**Network Tab:**
- Monitor API requests
- Check request/response payloads
- Identify slow queries

### Common Issues & Fixes

**Issue: User not redirected after login**
```javascript
// Fix: Check middleware.js is running
// Check user_metadata.user_type is set correctly
// Verify session is created
```

**Issue: Can't access protected route**
```javascript
// Fix: Check RLS policies in Supabase
// Verify user is authenticated
// Check role matches route
```

**Issue: Data not loading**
```javascript
// Fix: Check browser console for errors
// Verify RLS policies allow SELECT
// Check Supabase logs for query errors
```

**Issue: Email not sending**
```javascript
// Fix: Check Resend API key is valid
// Check spam/junk folder
// View Resend dashboard logs
// Verify email address is valid
```

**Issue: Database error**
```javascript
// Fix: Run supabase-schema.sql in SQL Editor
// Check table exists
// Verify column names match query
```

### Performance Monitoring

**Development server optimizations:**
```javascript
// next.config.js
watchOptions: {
  poll: 2000,              // Check for changes every 2s
  aggregateTimeout: 300,   // Wait 300ms before rebuild
  ignored: /node_modules/  // Don't watch node_modules
}

// Memory limit in package.json
NODE_OPTIONS='--max-old-space-size=512'
```

**Database performance:**
- Indexes on frequently queried columns
- Use `.select()` with specific columns (not `*` in production)
- Use `.limit()` for large datasets
- Add pagination for long lists

---

## Deployment

### Deployment Platform: Vercel

### Current Deployment
- **URL:** https://bidconnect-2.preview.emergentagent.com
- **Supabase Project:** oeccxntwqrlgwvretorl
- **Status:** Live and functional

### Deployment Checklist

**Pre-deployment:**
- [ ] Database schema applied in Supabase
- [ ] All environment variables set
- [ ] Test authentication flow
- [ ] Test email sending (Resend)
- [ ] Test both roles (builder & contractor)
- [ ] Check mobile responsiveness
- [ ] Review RLS policies
- [ ] Update FROM email address in `lib/email.js`

**Environment Variables Required:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://oeccxntwqrlgwvretorl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
RESEND_API_KEY=re_...
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
CORS_ORIGINS=*
```

### Deployment Process

**Option 1: Deploy via GitHub (Recommended)**
```bash
1. Push code to GitHub repository
2. Go to vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Click "Deploy"
```

**Option 2: Deploy via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... (add all env vars)

# Deploy to production
vercel --prod
```

### Post-Deployment

**Verify:**
1. Site loads correctly
2. Can sign up and login
3. Can create projects
4. Can submit bids
5. Email notifications work
6. No console errors

**Monitor:**
- Vercel Analytics (if enabled)
- Supabase logs
- Resend email delivery

### Rollback

**If deployment fails:**
```bash
# Redeploy previous version in Vercel dashboard
# Or via CLI:
vercel rollback
```

---

## Important Files

### Configuration Files

**`/home/user/BuildConnect/next.config.js`**
- Next.js configuration
- Image optimization disabled (Vercel handles it)
- Webpack watch options for development
- CORS headers
- External packages (mongodb for Server Components)

**`/home/user/BuildConnect/tailwind.config.js`**
- Tailwind theme configuration
- Custom colors using CSS variables
- Animation plugins
- Content paths for class scanning

**`/home/user/BuildConnect/jsconfig.json`**
- Path aliases (`@/` → root)
- Compiler options for JSX

**`/home/user/BuildConnect/middleware.js`**
- **CRITICAL:** Handles all authentication and route protection
- Refreshes Supabase sessions
- Role-based access control

**`/home/user/BuildConnect/.env`**
- **NEVER COMMIT THIS FILE**
- Contains all secrets and API keys

### Core Application Files

**`/home/user/BuildConnect/app/layout.js`**
- Root layout for entire application
- Wraps app in UserProvider
- Includes global CSS

**`/home/user/BuildConnect/context/UserContext.jsx`**
- **CRITICAL:** Global user state management
- Used by almost all components
- Provides user, userRole, profile, loading, refreshProfile

**`/home/user/BuildConnect/lib/supabase/client.js`**
- Browser Supabase client
- Use in client components

**`/home/user/BuildConnect/lib/supabase/server.js`**
- Server Supabase client
- Use in server components and API routes

**`/home/user/BuildConnect/lib/email.js`**
- All email sending functions
- HTML email templates
- Uses Resend service

**`/home/user/BuildConnect/lib/utils.js`**
- Utility functions
- `cn()` function for merging Tailwind classes

### Database Files

**`/home/user/BuildConnect/supabase-schema.sql`**
- **MOST IMPORTANT DATABASE FILE**
- Complete schema with all tables, indexes, RLS policies, triggers
- Run this file first in Supabase

**Other SQL files:**
- Enhancement and fix files for specific features
- Apply after main schema if needed

### Documentation Files

**README.md** - Quick start guide (start here)
**SETUP_GUIDE.md** - Comprehensive setup instructions
**PROJECT_STATUS.md** - Feature completion status
**DEPLOYMENT_GUIDE.md** - Deployment instructions
**CLAUDE.md** - This file (AI assistant guide)

---

## Do's and Don'ts

### ✅ DO

**Code Style:**
- ✅ Use `'use client'` directive for client components
- ✅ Use absolute imports with `@/` prefix
- ✅ Use `cn()` utility for conditional className
- ✅ Follow existing naming conventions
- ✅ Add loading and error states to components
- ✅ Use try/catch for error handling
- ✅ Use console.error for error logging

**Database:**
- ✅ Use Supabase RLS policies for security
- ✅ Validate data before inserting
- ✅ Use transactions for multi-table updates
- ✅ Create indexes for frequently queried columns
- ✅ Use `.select()` to specify needed columns

**Authentication:**
- ✅ Check user authentication in components
- ✅ Use middleware for route protection
- ✅ Store user role in user_metadata
- ✅ Refresh profile after updates

**Components:**
- ✅ Reuse existing UI components from `/components/ui`
- ✅ Use shadcn/ui for new components
- ✅ Keep components focused and single-purpose
- ✅ Extract reusable logic into hooks

**Git:**
- ✅ Commit with clear, descriptive messages
- ✅ Test before committing
- ✅ Work on feature branches
- ✅ Push to correct branch (claude/...)

### ❌ DON'T

**Code Style:**
- ❌ Don't mix TypeScript into this JavaScript project
- ❌ Don't use class components (use functional + hooks)
- ❌ Don't use Pages Router patterns (this is App Router)
- ❌ Don't use relative imports when absolute imports work
- ❌ Don't skip error handling

**Database:**
- ❌ Don't bypass RLS policies with service role key (except in API routes when necessary)
- ❌ Don't expose service role key to client
- ❌ Don't run raw SQL from client components
- ❌ Don't forget to enable RLS on new tables
- ❌ Don't delete bid records (maintain audit trail)

**Authentication:**
- ❌ Don't store sensitive data in user_metadata
- ❌ Don't skip authentication checks
- ❌ Don't trust client-side role checks only
- ❌ Don't use session tokens in URLs

**Security:**
- ❌ Don't commit `.env` file
- ❌ Don't expose API keys in client code
- ❌ Don't trust user input without validation
- ❌ Don't disable CORS without good reason
- ❌ Don't log sensitive information

**Deployment:**
- ❌ Don't deploy without testing email notifications
- ❌ Don't deploy without running database migrations
- ❌ Don't push directly to main branch
- ❌ Don't skip environment variable setup

**Performance:**
- ❌ Don't fetch large datasets without pagination
- ❌ Don't run queries in loops
- ❌ Don't forget to add indexes
- ❌ Don't use `SELECT *` when you only need specific columns

---

## Appendix: Quick Reference

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://oeccxntwqrlgwvretorl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>

# Email
RESEND_API_KEY=<resend_key>

# App
NEXT_PUBLIC_BASE_URL=https://your-domain.com
CORS_ORIGINS=*
```

### Useful Commands

```bash
# Development
yarn dev                    # Start dev server
yarn dev:no-reload          # Start without hot reload
yarn build                  # Production build
yarn start                  # Start production server

# Package management
yarn install                # Install dependencies
yarn add <package>          # Add dependency
yarn add -D <package>       # Add dev dependency

# Database
# (No CLI commands - use Supabase dashboard)

# Git
git status                  # Check status
git add .                   # Stage all changes
git commit -m "message"     # Commit changes
git push -u origin <branch> # Push to remote

# shadcn/ui
npx shadcn-ui@latest add <component>  # Add component
```

### File Locations Quick Reference

```
Auth:             /home/user/BuildConnect/app/login/page.jsx
                  /home/user/BuildConnect/app/signup/page.jsx
                  /home/user/BuildConnect/middleware.js

User Context:     /home/user/BuildConnect/context/UserContext.jsx

Database:         /home/user/BuildConnect/supabase-schema.sql
                  /home/user/BuildConnect/lib/supabase/client.js
                  /home/user/BuildConnect/lib/supabase/server.js

Email:            /home/user/BuildConnect/lib/email.js
                  /home/user/BuildConnect/app/api/emails/*/route.js

Components:       /home/user/BuildConnect/components/ui/*
                  /home/user/BuildConnect/components/auth/*
                  /home/user/BuildConnect/components/layout/*

Config:           /home/user/BuildConnect/next.config.js
                  /home/user/BuildConnect/tailwind.config.js
                  /home/user/BuildConnect/jsconfig.json
                  /home/user/BuildConnect/.env
```

### Common Patterns

**Fetch data on mount:**
```javascript
useEffect(() => {
  if (user) fetchData()
}, [user])
```

**Loading state:**
```javascript
if (loading) return <div>Loading...</div>
```

**Error handling:**
```javascript
try {
  const { data, error } = await supabase.from('table').select()
  if (error) throw error
} catch (error) {
  console.error('Error:', error)
}
```

**Toast notification:**
```javascript
import { useToast } from '@/hooks/use-toast'
const { toast } = useToast()

toast({ title: "Success!" })
toast({ title: "Error", variant: "destructive" })
```

---

## Contact & Support

**Project Documentation:**
- Quick Start: `/home/user/BuildConnect/README.md`
- Setup Guide: `/home/user/BuildConnect/SETUP_GUIDE.md`
- Deployment: `/home/user/BuildConnect/DEPLOYMENT_GUIDE.md`

**External Resources:**
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

**Development Tools:**
- Supabase Dashboard: https://supabase.com/dashboard
- Resend Dashboard: https://resend.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard

---

**Last Updated:** 2025-11-14
**Version:** 1.0 MVP
**Status:** Production-ready (95% complete)

---

*This guide is designed to help AI assistants understand and work effectively with the BuildConnect codebase. For human developers, start with README.md and SETUP_GUIDE.md.*
