# PostHog Tracking Implementation

This document outlines the implementation of PostHog tracking for user engagement metrics on the Zeniary landing page.

## Metrics Tracked

### 1. Average Scroll Depth

- **Implementation**: Enhanced the existing `useScrollDepthTracking` hook in `src/hooks/useScrollDepthTracking.ts`
- **Events**:
  - `scroll_depth_milestone`: Fired when a user reaches specific scroll depth thresholds (10%, 25%, 50%, 75%, 90%, 100%)
  - `Reached Bottom`: Fired when a user reaches the bottom of the page (100% scroll depth)
  - `Final Scroll Depth`: Fired when a user leaves the page, capturing their final scroll position

### 2. Email CTA Tracking

- **Implementation**: Updated the `Email` component in `src/app/components/common/Email.tsx`
- **Events**:
  - `Email CTA Click`: Fired when a user clicks the email CTA button

### 3. Total Email CTA / Total Number of Users

- This metric can be derived from PostHog by comparing:
  - Total count of `Email CTA Click` events
  - Total unique users (tracked automatically by PostHog)

### 4. Average Time Spent in Each Section

- **Implementation**: Created a new `useSectionTimeTracking` hook in `src/hooks/useSectionTimeTracking.tsx`
- **Events**:
  - `Section Time`: Fired when a user exits a section or when the component unmounts
  - Includes data on which section was viewed and how long the user spent in it

### 5. Survey Conversion Rate

- **Implementation**: Updated the survey page in `src/app/survey/page.tsx`
- **Events**:
  - `Survey Page Enter`: Fired when a user loads the survey page
  - `Survey Submission`: Fired when a user successfully submits the survey

## PostHog Dashboard Setup

To visualize these metrics in PostHog:

1. **Avg Scroll Depth**: Create a chart showing the average `depth_percentage` from `Final Scroll Depth` events
2. **Email CTA Conversion (Bottom Visitors)**: Create a funnel with `Reached Bottom` → `Email CTA Click`
3. **Email CTA Conversion (All Users)**: Create a funnel with `$pageview` → `Email CTA Click`
4. **Avg Time Spent in Sections**: Create a chart showing average `timeSpent` from `Section Time` events, broken down by `sectionId`
5. **Survey Conversion**: Create a funnel with `Survey Page Enter` → `Survey Submission`

## Implementation Notes

- All tracking is implemented client-side using the PostHog JavaScript SDK
- Scroll depth tracking uses throttling to prevent excessive event firing
- Section time tracking uses the Intersection Observer API for efficient viewport detection
- All events include relevant metadata (page identifiers, timestamps, etc.)
