// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface ContactFormErrors {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface ContactSubmissionData extends ContactFormData {
  created_at: string;
  status: "new" | "in-progress" | "resolved" | "closed";
  user_agent: string;
  screen_size: string;
}
