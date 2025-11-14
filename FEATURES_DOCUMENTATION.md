# BuildConnect - Complete Feature Documentation

## Project Overview
BuildConnect is a modern digital marketplace platform connecting construction builders with qualified contractors through a transparent tender/bidding system. The application provides role-based access for Builders and Contractors with comprehensive project management and bidding capabilities.

---

## 1. AUTHENTICATION FEATURES

### 1.1 User Registration (Signup)
- **Location**: `/app/signup/page.jsx`
- **Users Can**:
  - Register as either a Builder or Contractor
  - Provide full name, email, phone, company name
  - Select their role (Builder/Contractor) during signup
  - Create account with email-based authentication via Supabase Auth

### 1.2 User Login
- **Location**: `/app/login/page.jsx`
- **Features**:
  - Email and password-based authentication
  - Role-based redirect after login (Builders → builder dashboard, Contractors → contractor dashboard)
  - Automatic user context detection from stored authentication

### 1.3 Role-Based Access Control
- **Protected Routes**: All dashboard and project routes are protected
- **Route Protection**: Uses UserContext to check authentication state
- **Automatic Redirects**: Unauthenticated users are redirected to login page
- **Role Separation**: Builder and Contractor have separate dashboards and features

### 1.4 Authentication State Management
- **Context**: Uses UserContext to manage user state globally
- **User Profile Data**: Auto-loaded on authentication
- **Session Persistence**: Session maintained via Supabase authentication tokens

---

## 2. BUILDER FEATURES

### 2.1 Builder Dashboard
- **Location**: `/app/builder/dashboard/page.jsx`
- **Dashboard Statistics**:
  - Total active projects count
  - Total bids received across all projects
  - Total completed projects count

- **Quick Actions**:
  - Post new project button (links to project creation)
  - View all projects button

- **Recent Projects Widget**:
  - Shows 5 most recent projects
  - Displays project title, location, budget range, number of bids
  - Shows when project was posted (relative time)
  - Status badge (open/awarded/completed)
  - Quick view button for each project

### 2.2 Post New Project
- **Location**: `/app/builder/projects/new/page.jsx`
- **Project Information Section**:
  - Project title (required)
  - Project type dropdown (Residential, Commercial, Infrastructure, Renovation)
  - Detailed description (required, text area)

- **Location Section**:
  - City selection from predefined list (Patna, Lucknow, Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad)
  - Detailed location/address (required)

- **Requirements Section**:
  - Multiple specializations selection (Plumbing, Electrical, Civil, Carpentry, Painting, Masonry, Roofing)
  - Minimum budget (in INR)
  - Maximum budget (in INR)
  - Expected start date
  - Project duration in days
  - Bidding deadline (date and time)

- **Validations**:
  - Maximum budget must be greater than minimum budget
  - At least one specialization must be selected
  - All required fields must be filled
  - Bidding deadline must be in the future

### 2.3 View My Projects
- **Location**: `/app/builder/projects/page.jsx`
- **Features**:
  - Search functionality (search by title or location)
  - Filter by project status:
    - All projects
    - Open projects
    - Awarded projects
    - Completed projects
  
- **Project Card Display**:
  - Project title with status badge
  - Project description (truncated)
  - Location with map icon
  - Budget range
  - Project duration
  - Number of bids received
  - Posted timestamp (relative time)
  - View details button

### 2.4 Project Detail View
- **Location**: `/app/builder/projects/[id]/page.jsx`
- **Project Details Tab**:
  - Full project information display
  - Description (full text)
  - Location and city
  - Budget range
  - Start date
  - Duration
  - Required specializations (as badges)
  - Bidding deadline

- **Bids Tab**:
  - View all bids received for the project
  - Bids sorted by quoted price (lowest to highest)
  - For each bid shows:
    - Contractor company name (clickable link to profile)
    - Contractor rating and review count
    - Number of completed projects
    - Years of experience
    - Team size
    - Quoted price with currency formatting
    - Estimated project duration
    - Bid submission timestamp
    - Proposal text
    - Contractor specializations

- **Bid Management Actions**:
  - Accept bid button (for pending bids on open projects)
  - Reject bid button (for pending bids on open projects)
  - Accept bid confirmation dialog
  - Automatically rejects all other pending bids when one is accepted

- **Project Editing**:
  - Edit button (only available for open projects)
  - Edit modal allows updating:
    - Bidding deadline
    - Project start date
    - Project duration
  - Save changes button with loading state

- **Rating Feature**:
  - After a bid is accepted, builder can rate the contractor
  - Rate Contractor button (with award icon)
  - Opens rating modal (described in Rating System section)

### 2.5 Builder Profile
- **Location**: `/app/builder/profile/page.jsx`
- **Profile Information**:
  - Full name (editable)
  - Company name (editable)
  - Phone number (editable)
  - Email (read-only)
  
- **Profile Statistics**:
  - Total projects count
  - Active projects count
  - Completed projects count

- **Recent Projects History**:
  - Shows up to 10 recent projects
  - Each project shows title, location, project type, budget range, number of bids, and posted time

---

## 3. CONTRACTOR FEATURES

### 3.1 Contractor Dashboard
- **Location**: `/app/contractor/dashboard/page.jsx`
- **Dashboard Statistics**:
  - Total bids submitted count
  - Bids won (accepted bids) count
  - Your rating (average rating from builders)

- **Quick Actions**:
  - Browse Projects button
  - View My Bids button

- **Location-Based Filtering**:
  - Filter new projects by location
  - Shows all available cities from open projects with project count
  - "All Locations" option to see all projects
  - Dynamic location buttons with counts

- **New Projects Widget**:
  - Shows recent open projects matching contractor's location preferences
  - Filter by location dynamically
  - For each project:
    - Project title with "Already Bid" badge if contractor has bid
    - Project description (truncated)
    - Location
    - Budget range
    - Time posted (relative)
    - View & Bid button

### 3.2 Browse Projects
- **Location**: `/app/contractor/projects/page.jsx`
- **Search and Filters**:
  - Search box (searches project titles and descriptions)
  - City filter dropdown (All, Patna, Lucknow, Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad)
  - Project type filter dropdown (All, Residential, Commercial, Infrastructure, Renovation)
  - All filters work in combination

- **Project Cards Display**:
  - Project title with status badges:
    - NEW badge (for projects posted today)
    - URGENT badge (for projects with 3 or fewer days left to bid)
    - Already Bid badge (if contractor has already submitted a bid)
  - Project description (truncated)
  - Location icon with city name
  - Budget range
  - Project duration
  - Number of bids received
  - Required specializations (up to 3 shown, with "+X more" indicator)
  - Posted timestamp
  - Days left to bid (color-coded red if deadline passed)
  - View & Bid button

### 3.3 Project Detail & Bid Submission
- **Location**: `/app/contractor/projects/[id]/page.jsx`
- **Left Sidebar - Project Information**:
  - Full project description
  - Location details
  - Budget range
  - Start date
  - Duration
  - Required specializations
  - Bidding deadline (with visual indicator if passed)

- **Right Sidebar - Builder Information Card**:
  - Posted By section
  - Builder avatar with initials
  - Builder company/full name (clickable link to builder profile)
  - Builder contact info

- **Bid Form (Right Sidebar)**:
  - Quoted Price input (must be within budget range)
  - Estimated Duration input (in days)
  - Proposal textarea (minimum 100 characters)
  - Budget range guidance
  - Project duration reference

- **Bid Form Features**:
  - Form allows submitting new bid (if not already bid) OR updating existing bid (if bid status is pending)
  - Validation ensures quoted price is within project's budget range
  - Auto-submits form and redirects to bids page on success
  - Shows success/error messages
  - Three states:
    1. No bid yet: "Submit Bid" button
    2. Bid pending: "Update Bid" button (allows updating until accepted/rejected)
    3. Bid accepted/rejected: Shows status message

- **Project Status Indicators**:
  - Shows if bidding is closed
  - Shows if bid was accepted (with congratulations message)
  - Shows if bid was rejected

### 3.4 My Bids
- **Location**: `/app/contractor/bids/page.jsx`
- **Bid Status Tabs**:
  - All bids
  - Pending bids
  - Accepted bids
  - Rejected bids
  - Each tab shows count of bids in that category

- **Bid Card Display**:
  - Project title with bid status badge
  - Project status badge
  - Project location
  - Your quoted price
  - Estimated duration
  - Submission timestamp
  - Project budget range
  - Proposal text (truncated to 3 lines)
  - View Project button
  - Edit Bid button (only for pending bids)

- **Bid Status Indicators**:
  - Accepted bids have green border
  - Shows congratulations message for accepted bids

### 3.5 Contractor Profile
- **Location**: `/app/contractor/profile/page.jsx`
- **Profile Statistics Cards**:
  - Average rating (with star icon)
  - Total completed projects
  - Bids won count
  - Years of experience

- **Basic Information Section**:
  - Full name (editable)
  - Company name (editable)
  - Phone number (editable)
  - Bio/description (textarea, editable)

- **Professional Details Section**:
  - Specializations (multi-select checkboxes for Plumbing, Electrical, Civil, Carpentry, Painting, Masonry, Roofing)
  - Service locations (multi-select checkboxes for all cities)
  - Years of experience (numeric input)
  - Team size (numeric input)

- **Awarded Projects History**:
  - Shows all projects where contractor's bid was accepted
  - For each project:
    - Project title
    - Project location
    - Badge showing "Won"
    - Contractor's quoted price
    - Estimated duration

---

## 4. PUBLIC PROFILE PAGES

### 4.1 Builder Profile (Public)
- **Location**: `/app/profile/builder/[id]/page.jsx`
- **Public Information Displayed**:
  - Builder avatar (initials-based)
  - Company name
  - Full name
  - Project statistics (total, active, completed)
  - Member since date

- **Contact Information**:
  - Email (clickable mailto link)
  - Phone (clickable tel link)

- **Projects Overview**:
  - All projects posted by builder (shows status, location, type, date, description)
  - Shows budget range and bid counts
  - Status badges with color coding

### 4.2 Contractor Profile (Public)
- **Location**: `/app/profile/contractor/[id]/page.jsx`
- **Public Information Displayed**:
  - Contractor avatar (initials-based)
  - Company name
  - Full name
  - Overall rating with star display
  - Review count
  - Total completed projects
  - Years of experience
  - Member since date

- **Tabbed Interface**:
  - **About Tab**:
    - Bio/description text
    - Specializations (displayed as badges)
    - Performance metrics (Quality, Communication, Timeline, Budget) with detailed scores
  
  - **Reviews Tab**:
    - All ratings/reviews from builders
    - For each review shows:
      - Review title
      - Builder name
      - Project name
      - Star rating
      - Review date
      - Review text
      - Detailed rating breakdowns (Quality, Communication, Timeline, Budget if available)
  
  - **Projects Tab**:
    - All projects contractor won/completed
    - Shows project title, location, date, description, and status

- **Contact Information**:
  - Email (clickable mailto link)
  - Phone (clickable tel link)
  - Portfolio URL (if available, opens in new tab)
  - Certifications list (if available)

---

## 5. RATING AND REVIEW SYSTEM

### 5.1 Rating Submission
- **Location**: `/app/builder/projects/[id]/page.jsx` (Rating Modal button)
- **Component**: `/components/RatingModal.jsx`
- **When Available**:
  - After builder accepts a bid on their project
  - "Rate Contractor" button appears on accepted bid card
  - Only available if project is not yet rated (one rating per project)

### 5.2 Rating Form Elements
- **Overall Rating** (Required):
  - 5-star rating system with hover preview
  - Shows numeric value (1-5)

- **Review Title** (Optional):
  - Text input (max 200 characters)
  - Pre-filled with contractor name if left empty

- **Review Text** (Required):
  - Textarea for detailed review (min 100 characters, max 1000)
  - Character counter displayed
  - Placeholder guidance

- **Detailed Ratings** (Optional):
  - Quality of Work (1-5 stars)
  - Communication (1-5 stars)
  - Timeline Adherence (1-5 stars)
  - Budget Management (1-5 stars)
  - Each defaults to overall rating if not set separately

- **Would Hire Again** (Checkbox):
  - Boolean indicator if builder would hire contractor again
  - Defaults to true

### 5.3 Rating Submission Process
- **Database Function**: Uses `submit_rating` RPC function
- **Data Stored**:
  - Project ID, Builder ID, Contractor ID
  - Overall rating (1-5)
  - Detailed ratings (quality, communication, timeline, budget)
  - Review title and text
  - Would hire again flag
  - Timestamp

- **Automatic Updates**:
  - Contractor's average rating updated
  - Total ratings count incremented
  - Detailed score metrics calculated
  - Marks project as rated

- **Email Notification**:
  - Sends email to contractor when rated
  - Email template at `/api/emails/rating-received/route.js`

---

## 6. EMAIL NOTIFICATION SYSTEM

### 6.1 Bid Received Notification
- **Trigger**: When contractor submits a bid
- **API Route**: `/api/emails/bid-received/route.js`
- **Recipient**: Builder (project owner)
- **Email Contains**:
  - Builder details and project information
  - Contractor name and bid details
  - Quoted price
  - Contractor proposal

### 6.2 Bid Accepted Notification
- **Trigger**: When builder accepts a bid
- **API Route**: `/api/emails/bid-accepted/route.js`
- **Recipient**: Contractor (winning bidder)
- **Email Contains**:
  - Project details
  - Builder contact information (name, phone)
  - Bid details (price, duration)
  - Congratulations message

### 6.3 Bid Rejected Notification
- **Trigger**: When builder rejects a bid or accepts another bid (auto-rejection)
- **API Route**: `/api/emails/bid-rejected/route.js`
- **Recipient**: Contractor (whose bid was rejected)
- **Email Contains**:
  - Project details
  - Rejection notification
  - Encouragement to bid on other projects

### 6.4 Rating Received Notification
- **Trigger**: When builder submits a rating for contractor
- **API Route**: `/api/emails/rating-received/route.js`
- **Recipient**: Contractor
- **Email Contains**:
  - Rating score
  - Review title
  - Builder name
  - Project information

### 6.5 Email Service
- **Provider**: Resend.com email service
- **Integration**: Via `/lib/email.js` utility functions
- **Error Handling**: Email failures don't block core operations

---

## 7. PROJECT FILTERING AND SEARCH CAPABILITIES

### 7.1 Builder Project Search
- **Location**: `/app/builder/projects/page.jsx`
- **Search Method**: Text search by:
  - Project title
  - Project location/city
- **Filters Available**:
  - Status filter (All, Open, Awarded, Completed)
- **Real-time Filtering**: Updates as user types/selects

### 7.2 Contractor Project Search
- **Location**: `/app/contractor/projects/page.jsx`
- **Search Method**: Text search by:
  - Project title
  - Project description
- **Filters Available**:
  - City dropdown (All, Patna, Lucknow, Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad)
  - Project type dropdown (All, Residential, Commercial, Infrastructure, Renovation)
- **Combined Filtering**: Multiple filters work together
- **Real-time Results**: Updates as filters are changed

### 7.3 Location-Based Discovery
- **Contractor Dashboard**: 
  - Auto-detects available locations from open projects
  - Shows location-specific project counts
  - Contractors can filter by location
  - Special styling for selected location

### 7.4 Project Status Indicators
- **NEW Badge**: Projects posted in the last 24 hours
- **URGENT Badge**: Projects with 3 or fewer days until bidding deadline
- **Already Bid Badge**: Shows if contractor has already submitted a bid
- **Deadline Countdown**: Shows days remaining to bid (red if passed)

---

## 8. BID MANAGEMENT FEATURES

### 8.1 Bid Submission
- **Process**:
  - Contractor enters quoted price, duration, and proposal
  - System validates price is within project's budget range
  - Minimum proposal length is 100 characters
  - Bid submitted with "pending" status
  - Email notification sent to builder

### 8.2 Bid Updates
- **Available**: Before bid is accepted or rejected
- **Updates Allowed**:
  - Quoted price
  - Estimated duration
  - Proposal text
- **Restrictions**:
  - Cannot update after bid is accepted/rejected
  - Cannot update if project deadline has passed
  - Price must still be within budget range

### 8.3 Bid Acceptance
- **Process**:
  - Builder clicks "Accept Bid" on desired bid
  - Confirmation dialog shown
  - System marks selected bid as "accepted"
  - All other pending bids automatically marked as "rejected"
  - Email notifications sent:
    - Acceptance email to winning contractor
    - Rejection emails to all other contractors
  - Project status changes to "awarded"

### 8.4 Bid Rejection
- **Process**:
  - Builder clicks "Reject" on unwanted bid
  - Confirmation dialog shown
  - Bid marked as "rejected"
  - Rejection email sent to contractor
  - Project remains open for other bids

### 8.5 Bid Sorting
- **Contractors Dashboard**: No sorting (chronological by submission)
- **Builder's Project Detail**: Sorted by quoted price (lowest to highest)
  - Visual indicator showing "lowest price first" strategy
  - Helps builder find competitive bids quickly

### 8.6 Bid History
- **Contractor Bids Page**: Shows all contractor's bids with:
  - Project name and location
  - Bid status (pending, accepted, rejected)
  - Quoted price
  - Duration
  - Submission date
  - Proposal preview (truncated)

---

## 9. PROFILE MANAGEMENT

### 9.1 Builder Profile Management
- **Edit Location**: `/app/builder/profile/page.jsx`
- **Editable Fields**:
  - Full name
  - Company name
  - Phone number

- **Read-only Fields**:
  - Email address

- **View Options**:
  - See own profile statistics (projects, active, completed)
  - View project history
  - Save changes functionality with success/error messages

### 9.2 Contractor Profile Management
- **Edit Location**: `/app/contractor/profile/page.jsx`
- **Basic Information Editable**:
  - Full name
  - Company name
  - Phone number
  - Bio/description

- **Professional Details Editable**:
  - Specializations (multi-select from predefined list)
  - Service locations (multi-select from predefined cities)
  - Years of experience (numeric)
  - Team size (numeric)

- **Profile Statistics Displayed**:
  - Average rating
  - Total ratings count
  - Total completed projects
  - Years of experience
  - Bids won count

- **Awarded Projects History**:
  - View list of all won bids with project details
  - Shows quoted price and estimated duration

---

## 10. ADDITIONAL KEY FEATURES

### 10.1 Responsive Design
- Mobile-first approach using Tailwind CSS
- All pages work on mobile, tablet, and desktop
- Navigation and layouts adapt to screen size
- Touch-friendly buttons and inputs

### 10.2 Loading States
- Skeleton loaders for async operations
- Loading spinners during form submission
- Loading text on buttons during submission
- Disabled states to prevent double submission

### 10.3 Error Handling
- Form validation with user-friendly error messages
- API error handling with fallback messages
- Dialog confirmations for destructive actions
- Toast notifications for success/error states

### 10.4 Real-time Data
- Auto-refresh of project/bid data on page load
- Updated bid counts on project cards
- Live bid status updates after acceptance/rejection
- Real-time statistics on dashboards

### 10.5 User Experience Features
- Relative timestamps ("posted 2 hours ago")
- Currency formatting (Indian Rupees with ₹ symbol)
- Breadcrumb navigation
- Back buttons for easy navigation
- Sticky/fixed elements for better UX
- Smooth animations and transitions
- Color-coded status indicators (green for success, red for urgent/failure)

### 10.6 Data Persistence
- Uses Supabase PostgreSQL database
- Row-level security (RLS) policies for data protection
- Automatic timestamps on data creation/updates
- Cascade delete for related records

### 10.7 Authentication & Authorization
- Email-based authentication
- Role-based access control (Builder vs Contractor)
- Protected routes with automatic redirects
- Session management via Supabase Auth

---

## 11. DATABASE SCHEMA OVERVIEW

### Key Tables:
- **profiles**: User account information (builders and contractors)
- **contractors**: Extended contractor-specific information (specializations, ratings, experience)
- **projects**: Project postings by builders
- **bids**: Bid submissions by contractors on projects
- **ratings**: Reviews/ratings from builders about contractors

### Key Relationships:
- Builders and Contractors are distinguished by user_type in profiles table
- Projects belong to Builders (builder_id)
- Bids link Projects to Contractors
- Ratings link Projects, Builders, and Contractors
- Contractors table has one-to-one relationship with profiles

---

## 12. USER WORKFLOWS

### Workflow 1: Builder Posts Project and Awards Bid
1. Builder logs in to dashboard
2. Builder clicks "Post New Project"
3. Builder fills in project details (title, description, type, location, budget, specializations, dates)
4. Project is posted and contractors can now bid
5. Builder receives email notifications as contractors bid
6. Builder navigates to project detail page
7. Builder reviews all bids (sorted by price)
8. Builder clicks "Accept Bid" on chosen contractor
9. Winning contractor receives acceptance email
10. Other contractors receive rejection emails
11. Builder can rate the contractor after awarding

### Workflow 2: Contractor Browses and Bids on Projects
1. Contractor logs in to dashboard
2. Contractor sees new projects matching their location preferences
3. Contractor clicks "Browse Projects" for more options
4. Contractor uses filters (city, project type) to find relevant projects
5. Contractor clicks "View & Bid" on interesting project
6. Contractor reviews project details and builder profile
7. Contractor fills in bid form (price, duration, proposal)
8. Contractor submits bid
9. Contractor receives confirmation and is redirected to bids page
10. Builder receives email notification of new bid
11. Contractor can view bid status on "My Bids" page
12. If bid is accepted, contractor receives email and sees "Congratulations" message
13. If bid is rejected, contractor receives rejection email

### Workflow 3: Contractor Updates Bid Before Deadline
1. Contractor navigates to "My Bids" page
2. Contractor finds pending bid on project
3. Contractor clicks "Edit Bid" button
4. Bid form reopens with existing data pre-filled
5. Contractor modifies price, duration, or proposal
6. Contractor clicks "Update Bid"
7. Changes are saved and contractor is redirected to bids page

### Workflow 4: Builder Rates Contractor After Project
1. Builder navigates to project that has accepted bid
2. On bid card with accepted status, builder clicks "Rate Contractor"
3. Rating modal opens
4. Builder fills out:
   - Overall star rating (required)
   - Review title (optional)
   - Review text (required, 100+ characters)
   - Detailed ratings for quality, communication, timeline, budget (optional)
   - Would hire again checkbox
5. Builder submits rating
6. Contractor's profile is updated with new rating
7. Contractor receives email notification about rating
8. Rating appears on contractor's public profile page

---

## Summary Statistics

- **Total Pages**: 13 user-facing pages
- **API Routes**: 4 email notification endpoints
- **Database Tables**: 5 main tables (profiles, contractors, projects, bids, ratings)
- **Component Types**: UI components, forms, cards, modals, layouts
- **Authentication**: Email-based with Supabase
- **Email Provider**: Resend.com
- **Frontend Framework**: Next.js 14 with React
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)

---

## Key Features at a Glance

Builders Can:
- Post construction projects with detailed requirements
- Search and filter their own projects
- View all bids received
- Accept or reject bids
- Edit project details (deadline, dates, duration)
- Rate contractors after work
- View public profiles of bidding contractors
- Receive email notifications

Contractors Can:
- Browse available projects with smart filtering
- Submit and update bids before deadline
- View bid history and status
- Complete professional profile with specializations and experience
- View and manage accepted projects
- See builder profiles and contact information
- Receive ratings and reviews on public profile
- Receive email notifications about bid outcomes
- Track performance metrics (ratings, completed projects)

