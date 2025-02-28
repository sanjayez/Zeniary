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
  - `Email CTA Click`: Fired ONLY when a user successfully submits an email (not on validation errors or duplicates)
  - Includes properties:
    - `location`: Distinguishes between different email form locations (`hero_cta`, `bottom_cta`)
    - `page_path`: The page where the submission occurred
    - `email_domain`: The domain portion of the submitted email (for analytics)
    - `status`: Always "success" since we only track successful submissions
  - This ensures accurate conversion metrics that reflect actual successful submissions

### 3. Total Email CTA / Total Number of Users

- This metric can be derived from PostHog by comparing:
  - Total count of `Email CTA Click` events (can be filtered by location if needed)
  - Total unique users (tracked automatically by PostHog)
- Since we only track successful submissions, this metric accurately reflects actual conversions

### 4. Average Time Spent in Each Section

- **Implementation**: Created a new `useSectionTimeTracking` hook in `src/hooks/useSectionTimeTracking.tsx`
- **Events**:
  - `Section Time`: Fired when a user exits a section or when the component unmounts
  - Includes data on which section was viewed and how long the user spent in it

### 5. Survey Conversion Rate

- **Implementation**: Updated the survey page in `src/app/survey/page.tsx`
- **Events**:
  - `Survey Page Enter`: Fired when a user loads the survey page
  - `Survey Submission`: Fired ONLY when a user successfully submits the survey (not on validation errors or failures)
  - Includes a `status: "success"` property to confirm successful submission
- This ensures the survey conversion rate reflects actual completed submissions

## PostHog Dashboard Setup

To visualize these metrics in PostHog:

1. **Avg Scroll Depth**: Create a chart showing the average `depth_percentage` from `Final Scroll Depth` events
2. **Email CTA Conversion (Bottom Visitors)**: Create a funnel with:
   - First step: `Reached Bottom` event
   - Second step: `Email CTA Click` event with property filter `location = bottom_cta`
3. **Email CTA Conversion by Location**: Create a breakdown chart showing:
   - Event: `Email CTA Click`
   - Break down by: `location` property
   - This shows the distribution of successful email submissions across different page locations
4. **Overall Email CTA Conversion**: Create a funnel with:
   - First step: `$pageview` event
   - Second step: `Email CTA Click` event (all locations)
5. **Avg Time Spent in Sections**: Create a chart showing:
   - Average `timeSpent` from `Section Time` events
   - Break down by `sectionId`
6. **Survey Conversion**: Create a funnel with:
   - First step: `Survey Page Enter` event
   - Second step: `Survey Submission` event

## Implementation Notes

- All tracking is implemented client-side using the PostHog JavaScript SDK
- Scroll depth tracking uses throttling to prevent excessive event firing
- Section time tracking uses the Intersection Observer API for efficient viewport detection
- Email CTAs are tracked with location information to distinguish between different form placements
- We only track successful email submissions and survey completions to ensure accurate metrics
- All events include relevant metadata (page identifiers, timestamps, etc.)

## Testing the Implementation

To verify that the tracking is working correctly:

1. Use PostHog's Live Events view to see events as they happen
2. Test each form location separately and verify the correct `location` property is sent
3. Verify that email submissions are only tracked when successful (try submitting invalid emails and duplicates)
4. Check that scroll depth events fire at the expected thresholds
5. Verify that section time tracking captures reasonable time values
6. Complete the survey flow to test the survey conversion tracking, and verify that failed submissions are not tracked
