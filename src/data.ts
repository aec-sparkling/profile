import type { Profile, Skill, SkillTag, Experience, Education } from './types';

export const profile: Profile = {
  name: 'Manav Mahan SINGH (PhD)',
  title: 'AI Research & Development',
  tagline:
    'AI researcher passionate about developing smart solutions for the built world — applying software engineering, machine learning, and AI to create innovative solutions.',
  location: 'Essen, Germany',
  email: 'manav.mahan.singh@live.in',
  linkedin: 'https://www.linkedin.com/in/manav-mahan-singh-871928b1',
  languages: ['English (proficient)', 'German (beginner)', 'Hindi (native)'],
};

export const skills: Skill[] = [
  { name: 'Python', level: 5, tag: 'lang' },
  { name: 'TypeScript', level: 4, tag: 'lang' },
  { name: '.NET / C#', level: 3, tag: 'lang' },
  { name: 'React / Next.js', level: 4, tag: 'lang' },
  { name: 'Machine Learning', level: 5, tag: 'ai' },
  { name: 'PyTorch', level: 5, tag: 'ai' },
  { name: 'TensorFlow', level: 4, tag: 'ai' },
  { name: 'LLMs & LoRA Training', level: 5, tag: 'ai' },
  { name: 'Google Gemini', level: 4, tag: 'ai' },
  { name: 'OpenAI', level: 4, tag: 'ai' },
  { name: 'Hugging Face', level: 4, tag: 'ai' },
  { name: 'BIM', level: 5, tag: 'built' },
  { name: 'CAD', level: 4, tag: 'built' },
  { name: 'AWS', level: 4, tag: 'infra' },
  { name: 'Docker', level: 4, tag: 'infra' },
  { name: 'Databases', level: 4, tag: 'infra' },
];

export const skillTags: Record<'all' | SkillTag, string> = {
  all: 'all',
  lang: 'languages',
  ai: 'ai/ml',
  built: 'built world',
  infra: 'infra',
};

export const experience: Experience[] = [
  {
    role: 'AI Research & Development',
    org: 'NeoBIM GmbH, Karlsruhe, Germany',
    period: 'Mar 2024 – Present',
    detail: 'Generative AI solutions for web-based BIM apps.',
    link: 'https://designer.bluebrick.ai',
  },
  {
    role: 'Post-Doctoral Researcher',
    org: 'Georg-Nemetschek-Institute, TU Munich, Germany',
    period: 'Jul 2022 – Present',
    detail: 'AI methods for the built world and BIM applications.',
  },
  {
    role: 'Software Developer',
    org: 'CADSys GmbH, Chemnitz, Germany',
    period: 'Nov 2021 – Jun 2022',
    detail: 'Plugins for CAD/BIM applications — C#, WPF, and design automation.',
  },
  {
    role: 'Doctoral Researcher',
    org: 'KU Leuven, Belgium',
    period: 'May 2017 – Oct 2021',
    detail: 'Software development, BIM API, and machine learning.',
  },
  {
    role: 'Assistant Architect',
    org: 'Central Public Works Department, India',
    period: 'Feb 2016 – Apr 2017',
    detail: 'Design and planning of public buildings.',
  },
  {
    role: 'Research and Teaching',
    org: 'RICS School of Built Environment, India',
    period: 'Aug 2014 – Feb 2016',
    detail: 'BIM research and construction management teaching.',
  },
];

export const education: Education[] = [
  {
    degree: 'PhD, Engineering Sciences',
    school: 'KU Leuven, Belgium',
    period: '2018 – 2022',
  },
  {
    degree: 'M.Tech.',
    school: 'Indian Institute of Technology, Delhi',
    period: '2012 – 2014 · 8.5/10',
  },
  {
    degree: 'B.Arch.',
    school: 'Gautam Buddh Technical University, Lucknow',
    period: '2007 – 2012 · 81.8%',
  },
];

export const awards: string[] = [
  'Visiting Researcher at ETH Zurich — ASL Scholarship, 2020, Belgium',
  'Winner, Student Competition — Digital Construction Brussels, 2018',
  'First Prize, National 3D Student Design Challenge — Autodesk, 2013, India',
  'Visiting Scholar at TU Munich — DAAD Scholarship, 2013–14',
  'Teaching Assistantship — IIT Delhi, 2012–14',
  'Silver Medal in Architecture — GBTU Lucknow, 2012',
  'Rank 2, National Level — GATE 2012, India',
];
