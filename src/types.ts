export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  /** blog URL — GitHub Pages blog, to be created */
  blog: string;
  languages: string[];
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
}

export type SkillTag = 'lang' | 'ai' | 'built' | 'infra';

export interface Skill {
  name: string;
  /** 1–5 */
  level: number;
  tag: SkillTag;
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  detail: string;
  link?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface Course {
  title: string;
  provider: string;
  year: string;
  /** individual course names for bundles/specializations */
  items?: string[];
}

export type Theme = 'green' | 'blue' | 'purple' | 'cyan' | 'red';

export type ResearchCategory = 'journal' | 'thesis' | 'book' | 'conference' | 'paper';

export interface Research {
  category: ResearchCategory;
  authors: string;
  year: number | string;
  title: string;
  venue: string;
  link?: string;
}
