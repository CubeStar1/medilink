# MediLink 

## Core Features

### Authentication & Authorization
- Multi-role user authentication (Donor, NGO, Admin)
- Organization verification 
- Protected route system
- Document verification for organizations

### Dashboard & Management
- Role-specific dashboards
  - Donor: Donation tracking and management
  - NGO: Request management and inventory access
  - Admin: Platform oversight and verification
- Quick statistics and metrics display
- Recent activity tracking
- Profile and settings management

### Medication Management
- Medication listing with grid/list views
- Donation creation and tracking
- Stock status monitoring
- Category-based organization
- Search and filtering system

### Request System
- Request creation and management
- Status tracking
- Request timeline 
- Priority-based handling
- Available medications view



## Database Requirements

### Firebase Data Collections
1. Users & Organizations
   - User profiles with role-based access
   - Organization verification documents
   - Contact and address information

2. Medications & Donations
   - Medication details and inventory
   - Donation tracking information
   - Storage requirements

3. Requests & Tracking
   - Medication requests
   - Delivery tracking
   - Status updates
   - Temperature monitoring

## Task Distribution

### Task 1 (Auth & Core Dashboards)

#### Step 1: Authentication & Landing Page
**Pages & Components:**
- `app/(marketing)/page.tsx` - Landing page
- `components/landing/`
  - `hero.tsx` - Impact statistics
  - `features.tsx` - Core features
  - `how-it-works.tsx` - Process flow
  - `testimonials.tsx` - User stories
- `components/supaauth/` - Auth components

**API Integration:**
- [ ] Integrate Firebase Auth:
  - [ ] `/api/auth/signup` - Registration
  - [ ] `/api/auth/login` - Authentication
  - [ ] `/api/auth/verify` - Verification
  - [ ] `/api/auth/reset` - Password reset

#### Step 2: Donor Dashboard
**Pages & Components:**
- `app/(dashboard)/donor/page.tsx` - Main dashboard
- `components/dashboard/`
  - `statistics-cards.tsx` - Quick stats
  - `overview-section.tsx` - Overview content
  - `charts/overview-chart.tsx` - Donation trends
  - `recent-activity.tsx` - Activity feed
  - `recent-donations.tsx` - Donations list

**API Integration:**
- [ ] Implement donation management:
  - [ ] `/api/donations/create` - New donations
  - [ ] `/api/donations/list` - Listing
  - [ ] `/api/donations/stats` - Metrics
  - [ ] `/api/donations/status` - Updates

#### Step 3: NGO Dashboard
**Pages & Components:**
- `app/(dashboard)/ngo/page.tsx` - NGO interface
- `components/ngo/`
  - `statistics-cards.tsx` - NGO stats
  - `recent-requests.tsx` - Request grid
  - `available-medications.tsx` - Medication grid
  - `request-trends.tsx` - Trends chart
  - `beneficiary-growth.tsx` - Impact metrics

**API Integration:**
- [ ] Connect request system:
  - [ ] `/api/requests/create` - New requests
  - [ ] `/api/requests/status` - Status tracking
  - [ ] `/api/inventory/available` - Available items
  - [ ] `/api/requests/timeline` - Request tracking

#### Step 4: Profile & Settings
**Pages & Components:**
- `app/(dashboard)/profile/page.tsx` - Profile page
- `components/global/`
  - `profile-form.tsx` - Profile editing
  - `document-upload.tsx` - Document handling
  - `settings-panel.tsx` - Settings UI

**API Integration:**
- [ ] Implement profile features:
  - [ ] `/api/profile/update` - Profile updates
  - [ ] `/api/documents/upload` - Document upload
  - [ ] `/api/settings/*` - Settings management

### Task 2 (Admin & Core Features)

#### Step 1: Admin Dashboard
**Pages & Components:**
- `app/(dashboard)/admin/dashboard/page.tsx` - Admin overview
- `components/admin/`
  - `statistics-cards.tsx` - Admin stats
  - `activity-log.tsx` - System activity
  - `verification-card.tsx` - Verification UI
  - `charts/` - System metrics

**API Integration:**
- [ ] Connect admin features:
  - [ ] `/api/admin/metrics` - System metrics
  - [ ] `/api/admin/activity` - Activity logs
  - [ ] `/api/verification/*` - Verification system

#### Step 2: Medication Management
**Pages & Components:**
- `app/(dashboard)/medications/page.tsx` - Marketplace
- `components/medications/`
  - `grid-view.tsx` - Grid display
  - `list-view.tsx` - List display
  - `filters.tsx` - Search/filter
  - `details-card.tsx` - Medication details

**API Integration:**
- [ ] Implement inventory system:
  - [ ] `/api/inventory/list` - Listing
  - [ ] `/api/inventory/search` - Search
  - [ ] `/api/inventory/categories` - Categories

#### Step 3: Request Management
**Pages & Components:**
- `app/(dashboard)/requests/page.tsx` - Request management
- `components/requests/`
  - `request-form.tsx` - Creation form
  - `status-board.tsx` - Status display
  - `timeline.tsx` - Request timeline
  - `actions.tsx` - Quick actions

**API Integration:**
- [ ] Connect request features:
  - [ ] `/api/requests/*` - Request operations
  - [ ] `/api/inventory/status` - Stock updates

#### Step 4: Tracking System
**Pages & Components:**
- `app/(dashboard)/tracking/page.tsx` - Tracking interface
- `components/tracking/`
  - `map-view.tsx` - Location tracking
  - `timeline.tsx` - Status timeline
  - `temperature.tsx` - Temperature display
  - `alerts.tsx` - Alert system

**API Integration:**
- [ ] Implement tracking:
  - [ ] `/api/tracking/location` - Location
  - [ ] `/api/tracking/status` - Status
  - [ ] `/api/tracking/alerts` - Alerts

### Backend Tasks (API & Firebase integration)

#### Step 1: Core Authentication & Database
- [ ] Implement authentication endpoints:
  ```typescript
  POST /api/auth/signup
  POST /api/auth/login
  POST /api/auth/verify
  POST /api/auth/reset
  GET  /api/auth/session
  ```
- [ ] Create user management:
  ```typescript
  POST /api/profile/create
  PUT  /api/profile/update
  POST /api/documents/upload
  GET  /api/verification/status
  ```

#### Step 2: Medication & Request System
- [ ] Build donation endpoints:
  ```typescript
  POST /api/donations/create
  PUT  /api/donations/update
  GET  /api/donations/list
  GET  /api/donations/stats
  ```
- [ ] Create request endpoints:
  ```typescript
  POST /api/requests/create
  PUT  /api/requests/update
  GET  /api/requests/list
  GET  /api/requests/status
  ```

#### Step 3: Tracking & Analytics
- [ ] Implement tracking:
  ```typescript
  POST /api/tracking/update
  GET  /api/tracking/location
  GET  /api/tracking/temperature
  POST /api/tracking/alerts
  ```
- [ ] Create analytics:
  ```typescript
  GET  /api/analytics/donor
  GET  /api/analytics/ngo
  GET  /api/analytics/admin
  POST /api/reports/generate
  ```


## Getting Started



### Initial Setup
1. Clone the repository
```bash
git clone https://github.com/CubeStar1/medilink.git
cd medilink
```

2. Install dependencies
```bash
npm install
```

3. Firebase Setup
- Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
- Enable Authentication (Email/Password and Google)
- Create a Firestore database

4. Environment Variables
Create a `.env` file in the root directory:

5. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)


## Project Structure

```
medilink/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx            # Public marketing pages
│   │                       # Landing page
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── admin/          # Admin section
│   │   ├── donor/          # Donor section
│   │   ├── ngo/            # NGO section
│   │   ├── medications/    # Medication management
│   │   ├── requests/       # Request management
│   │   ├── tracking/       # Tracking system
│   │   └── layout.tsx      # Dashboard layout
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
│
├── components/             # React components
│   ├── admin/             # Admin-specific components
│   ├── dashboard/         # Dashboard components
│   ├── global/            # Shared components
│   ├── landing/           # Landing page components
│   ├── medications/       # Medication-related components
│   ├── ngo/               # NGO-specific components
│   ├── requests/          # Request-related components
│   ├── tracking/          # Tracking components
│   └── ui/                # UI components library
│
├── lib/                   # Utility functions
│   ├── firebase/         # Firebase configuration
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
│
├── public/               # Static files
│   ├── images/          # Image assets
│   └── icons/           # Icon assets
│
├── styles/              # Global styles
│   └── globals.css      # Global CSS
│
├── types/               # TypeScript type definitions
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

### Key Directories Explained

- `app/`: Contains all pages and API routes using Next.js 15 App Router
  - `(marketing)/`: Public pages (landing, about, etc.)
  - `(dashboard)/`: Protected routes requiring authentication
  - `api/`: Backend API endpoints

- `components/`: Reusable React components
  - `global/`: Shared components used across the app
  - `ui/`: Basic shadcn UI components (buttons, inputs, etc.)
  - Feature-specific directories for organized components

- `lib/`: Utility functions and configurations
  - `firebase/`: Firebase setup and helper functions
  - `hooks/`: Custom React hooks for shared logic
  - `utils/`: General utility functions

- `types/`: TypeScript type definitions
  - Shared interfaces and types
  - API request/response types
  - Database model types

## Tech Stack

- Frontend: Next.js 15 (App Router)
- Backend: Next.js API Routes
- Database: Firebase/Firestore
- Authentication: Firebase Auth
- Storage: Firebase Storage
- Deployment: Vercel

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
