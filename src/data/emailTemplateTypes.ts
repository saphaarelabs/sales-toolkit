export interface TemplateVariable {
  key: string;
  label: string;
  placeholder: string;
}

export interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  category: string;
  variables: TemplateVariable[];
}
