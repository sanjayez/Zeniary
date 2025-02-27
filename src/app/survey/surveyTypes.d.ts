// Define the types for our survey configuration
export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "range";

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
  min?: number;
  max?: number;
  step?: number;
}

export interface SurveyConfig {
  id: string;
  title: string;
  description: string;
  fields: SurveyField[];
}
