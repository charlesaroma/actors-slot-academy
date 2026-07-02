# Voting System — Architecture & Plan

## Overview
Admin-managed voting campaigns for talent competitions, audience choice awards, and public casting votes. Each campaign has a set of candidates, a date range, and configurable rules (one vote per person, max votes per day, etc.).

## Data Model

```
VotingCampaign {
  id: string
  title: string
  description: string
  startDate: string (ISO)
  endDate: string (ISO)
  status: "draft" | "active" | "closed"
  maxVotesPerUser: number (default 1)
  candidates: Candidate[]
  createdAt: string
  updatedAt: string
}

Candidate {
  id: string
  name: string
  imageUrl: string
  category: string
  bio: string
  voteCount: number
}
```

## Admin Flow (Backend-like Simulated)
1. Admin logs into `/dashboard/login`.
2. Navigates to `/dashboard/voting`.
3. Sees list of all campaigns (past + present) with status badges.
4. Can create new campaign — form with title, description, date range, candidate list.
5. Can edit existing campaign (name, dates, candidates).
6. Can toggle status: draft → active → closed → draft (re-open).
7. Can delete draft/closed campaigns.
8. Viewing a campaign shows candidate cards with current vote counts.

## Future / Live Voting Flow
- A public page at `/vote/:campaignId` displays the active campaign.
- User selects candidate, submits vote (rate-limited by IP or cookie).
- Votes are tallied in real-time on admin dashboard.
- Results can be toggled public/private per campaign.

## Implementation Notes (Current Phase)
- All data is stored in React state + localStorage for persistence across refreshes.
- No real backend; all operations are simulated.
- Vote counting is manual (admin can adjust counts) until public voting UI is built.
- File paths:
  - `src/dashboard/pages/6-voting/VotingPage.jsx` — main list + CRUD
  - `src/data/votingData.js` — initial empty campaigns array
  - `src/data/votingData.js` — localStorage read/write helpers

## Future Enhancements
1. Public voting UI at `/vote/:campaignId` with rate limiting.
2. Real-time results with WebSocket or polling.
3. Fraud detection (IP checks, CAPTCHA).
4. Export results as CSV.
5. Integration with talent directory (auto-populate candidates from Talents).
