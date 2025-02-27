// Define the types for our survey configuration
export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export interface FieldOption {
  label: string;
  value: string;
}

export interface SurveyField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: FieldOption[];
}

export interface SurveyConfig {
  id: string;
  title: string;
  description: string;
  fields: SurveyField[];
}

// Form state types
export interface FormErrors {
  [key: string]: string;
}

export interface FormData {
  [key: string]: string | string[] | number | boolean;
}

export interface ConditionalFieldsState {
  insights_elaboration: boolean;
  insight_other: boolean;
  integrations_comment: boolean;
  price_other: boolean;
}

export interface SurveySubmissionData extends FormData {
  survey_id: string;
  created_at: string;
  user_agent: string;
  screen_size: string;
}
