## Project Overview

**Actors Slot Academy** — a premium talent management dashboard built with React + Tailwind CSS. Brand: `asa-` (amber/emerald/dark).

---

## What We Did This Session

### 1. Created Public View-Only Talent Request Page

**Files:**
- `src/external/TalentViewPage.jsx` — Public page at `/talent-request/view/:token`
- `src/external/ExternalPageLayout.jsx` — Shared layout for all public external pages
- `src/external/index.js` — Barrel export for external pages
- `src/AppRoutes.jsx` — Added route for `/talent-request/view/:token`

**How it works:**
- Admin generates a share link per casting request via `CastingRequestsPage`
- A `crypto.randomUUID()` token is stored in `asa-talent-share-tokens` in localStorage
- The link redirects to a public-facing page showing only the approved & selected talents for that casting request
- Each talent card displays: photo, name, contact info, role, bio, media
- If no talents match the token, a 404-style "not found" state is rendered
- Layout and fonts match the main site branding

### 2. Updated CastingRequestsPage — Added Share Link Generator

**File:** `src/dashboard/pages/casting/CastingRequestsPage.jsx`

- Added "Generate Share Link" button in the expanded actions section
- Modal opens with search + multi-select checkboxes across the full `TALENTS` directory
- Pre-selects the talents that were part of the original request
- On confirm, creates a UUID token, stores `{ talentIds, directorName, createdAt }`, copies the URL to clipboard
- Shows a "Link Copied!" confirmation before closing

### 3. Updated VotingPage — Added Results Tab & Share Vote Link

**File:** `src/dashboard/pages/9-voting/VotingPage.jsx`

- Added a tab bar: **Campaigns** (manage/create) and **Results** (analytics)
- Results tab reads `asa-votes` from localStorage and shows per-campaign breakdown:
  - Vote counts + percentages per candidate
  - Animated progress bars
  - Empty state when no votes received
- Added "Share Vote Link" button on each campaign (link icon)
- Copies `{origin}/vote/{campaignId}` to clipboard with checkmark confirmation

### 4. Created Public Vote Page

**File:** `src/AppRoutes.jsx` — Added route for `/vote/:campaignId`

- Route added alongside the existing route structure
- Uses `VotePage` from `src/external/` which reads campaign from `asaVotingCampaigns` and votes from `asa-votes`

### 5. Naming Convention

| LocalStorage Key | Purpose |
|---|---|
| `asaVotingCampaigns` | Voting campaign data |
| `asa-votes` | All submitted votes |
| `asaTalentPortal` | Talent portal submissions |
| `asaCastingRequests` | Casting request submissions |
| `asa-talent-share-tokens` | View-only share tokens |

---

## Application Architecture

- **Dashboard**: `/dashboard/*` — admin panel with sidebar navigation
- **External pages**: `/talent-portal`, `/talent-request/view/:token`, `/vote/:campaignId` — public-facing pages
- **State**: localStorage-based (no backend)
- **Styling**: Custom CSS variables with `asa-` prefix (amber/emerald scheme), Tailwind classes, `motion` for animations
- **Fonts**: `font-headline` for titles, system font for body
- **Routes**: Defined in `src/AppRoutes.jsx` with `layout` and `children` per section
