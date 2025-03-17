import { SurveyConfig } from "./surveyTypes";

// Updated survey configuration for journaling habits
export const journalingSurveyConfig: SurveyConfig = {
  id: "journaling-habits",
  title: "Feedback Form",
  description:
    "Help us understand your journaling preferences to create a better experience. This should take about 3 minutes to complete.",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Enter your email address",
    },
    {
      id: "journaling_frequency",
      type: "radio",
      label: "How often do you maintain a personal journal or diary?",
      required: true,
      options: [
        { label: "Daily", value: "daily" },
        { label: "A few times a week", value: "few_times_week" },
        { label: "Occasionally", value: "occasionally" },
      ],
    },
    {
      id: "current_tools",
      type: "checkbox",
      label:
        "What methods or apps do you currently use for journaling or note-taking?",
      required: true,
      options: [
        { label: "Paper Journal", value: "Paper" },
        {
          label: "Digital note taking app (Eg. Notion / apple notes)",
          value: "digital",
        },
        { label: "Voice notes", value: "Voice notes" },
      ],
    },
    {
      id: "privacy_importance",
      type: "radio",
      label: "how important is data privacy when choosing a journaling app?",
      required: true,
      options: [
        { label: "Extremely important", value: "1" },
        { label: "Moderately important", value: "2" },
        { label: "Not much important", value: "3" },
      ],
    },
    {
      id: "pain_points",
      type: "textarea",
      label:
        "What are your current pain points when journaling digitally? if any.",
      required: false,
      placeholder: "I really wish I could...",
    },
    {
      id: "personalized_insights",
      type: "radio",
      label:
        "Would you find value in an app that provides personalized insights (e.g., mood trends, behavior patterns, actionable tips based on past entries) based on your journaling?",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      id: "insights_elaboration",
      type: "textarea",
      label:
        "Please elaborate on why you would or wouldn't find value in personalized insights (Optional)",
      required: false,
      placeholder:
        "Your thoughts on AI-generated insights from your journal entries...",
    },
    {
      id: "insight_preferences",
      type: "checkbox",
      label:
        "What types of insights would be most useful to you? (Select all that apply)",
      required: true,
      options: [
        { label: "Mood tracking", value: "mood_tracking" },
        { label: "Trend analysis", value: "trend_analysis" },
        { label: "Event correlations", value: "event_correlations" },
        { label: "Habit formation", value: "habit_formation" },
        { label: "Actionable tips", value: "actionable_tips" },
        { label: "Other", value: "other" },
      ],
    },
    {
      id: "insight_other",
      type: "text",
      label: "If you selected 'Other' above, please specify",
      required: true,
      placeholder: "Other insights you'd find valuable...",
    },
    {
      id: "visual_journey",
      type: "radio",
      label:
        "How appealing is the idea of exploring your past experiences through an interactive visual journey (like a knowledge graph or timeline)?",
      required: true,
      options: [
        { label: "Very appealing", value: "very_appealing" },
        { label: "Neutral", value: "neutral" },
        { label: "Not appealing at all", value: "not_appealing" },
      ],
    },
    {
      id: "adoption_likelihood",
      type: "select",
      label:
        "On a scale of 1-10, how likely are you to switch to an app that combines voice and text journaling with personalized AI insights?",
      required: true,
      options: [
        { label: "Extremely likely", value: "1" },
        { label: "Neutral", value: "2" },
        { label: "Not likely at all", value: "3" },
      ],
    },
  ],
};
