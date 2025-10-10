export interface ProfileLinks {
  linkedin?: string;
  github?: string;
  resume?: string;
  email?: string;
}

export interface Profile {
  name?: string;
  tagline?: string;
  location?: string;
  headline?: string;
  summary?: string;
  links?: ProfileLinks;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights?: string[];
  stack?: string[];
}

export interface ProjectItem {
  name: string;
  tags?: string[];
  summary?: string;
  details?: string;
  overview?: string;
  contribution?: string; // for WealthNest wording
  role?: string; // for SplitEx/UrbanNest wording
  highlights?: string[];
  tech?: string[];
  links?: { demo?: string; code?: string };
  status?: string;
  outcome?: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  cgpa?: string;
  period: string;
  coursework?: string[];
}

export interface PersonalInfo {
  interests?: string[];
  blurb?: string;
}

export interface SiteData {
  profile?: Profile;
  skills?: Record<string, string[]>;
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
  education?: EducationItem[];
  certifications?: string[];
  awards_leadership?: string[];
  workshops?: string[];
  personal?: PersonalInfo;
  contact?: { showEmail?: boolean; showPhone?: boolean; note?: string };
}
