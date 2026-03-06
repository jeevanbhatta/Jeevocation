export type Industry = 'auto' | 'construction' | 'textiles' | 'transport' | 'retail' | 'healthcare';

export interface UserProfile {
  name: string;
  age: number;
  location: string;
  education: string;
  industry: Industry;
  skills: string;
}

export interface CompanyPosting {
  id: string;
  companyName: string;
  industry: Industry;
  role: string;
  location: string;
  skillsRequired: string[];
  trainingProvided: string;
  salaryRange: string;
  duration: string;
  description: string;
}
