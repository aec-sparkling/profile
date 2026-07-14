import type { Profile, Skill, SkillTag, Experience, Education, Course, Research } from './types';

export const profile: Profile = {
  name: 'Manav Mahan SINGH (PhD)',
  title: 'AI Research & Development',
  tagline:
    'AI researcher passionate about developing smart solutions for the built world — applying software engineering, machine learning, and AI to create innovative solutions.',
  location: 'Essen, Germany',
  email: 'manav.mahan.singh@live.in',
  linkedin: 'https://www.linkedin.com/in/manav-mahan-singh-871928b1/',
  blog: 'blog/',
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

export const courses: Course[] = [
  {
    title: 'Accelerated Computer Science Fundamentals Specialization',
    provider: 'Coursera · University of Illinois Urbana-Champaign',
    year: '2021',
    items: [
      'Object-Oriented Data Structures in C++',
      'Ordered Data Structures',
      'Unordered Data Structures',
    ],
  },
  {
    title: 'DevOps, Cloud & Application Development',
    provider: 'Coursera · IBM Skills Network',
    year: '2023',
    items: [
      'Introduction to DevOps',
      'Introduction to Containers w/ Docker, Kubernetes & OpenShift',
      'Introduction to Test Driven Development',
      'Introduction to Cloud Computing',
      'Introduction to Agile Development and Scrum',
      'Getting Started with Git and GitHub',
      'Hands-on Introduction to Linux Commands and Shell Scripting',
      'Application Security for Developers and DevOps Professionals',
      'Continuous Integration and Continuous Delivery (CI/CD)',
      'Application Development using Microservices and Serverless',
      'Developing AI Applications with Python and Flask',
      'Python for Data Science, AI & Development',
    ],
  },
  {
    title: 'Agile with Atlassian Jira',
    provider: 'Coursera · Atlassian University',
    year: '2023',
  },
  {
    title: 'Python',
    provider: 'KU Leuven',
    year: '2021',
  },
  {
    title: 'Machine Learning',
    provider: 'Coursera',
    year: '2020',
  },
  {
    title: 'Modelling Languages (UML)',
    provider: 'VU Brussels',
    year: '2018',
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

export const research: Research[] = [
  {
    category: 'journal',
    authors: 'Singh, M. M., Santer, K., Quesada-Allerhand, J., & Smith, I. F. C.',
    year: 2026,
    title: 'Enrichment of building energy models using error domain constrained generative machine learning',
    venue: 'Advanced Engineering Informatics, 69, 104018',
    link: 'https://www.sciencedirect.com/science/article/pii/S1474034625009115',
  },
  {
    category: 'journal',
    authors: 'Chen, X., Abualdenien, J., Singh, M. M., Borrmann, A., & Geyer, P.',
    year: 2022,
    title: 'Introducing causal inference in the energy-efficient building design process',
    venue: 'Energy and Buildings, 277, 112583',
    link: 'https://doi.org/10.1016/j.enbuild.2022.112583',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., Deb, C., & Geyer, P.',
    year: 2022,
    title: 'Early-stage design support tool combining machine learning and building information modelling',
    venue: 'Automation in Construction, 104147',
    link: 'https://doi.org/10.1016/j.autcon.2022.104147',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., Singaravel, S., & Geyer, P.',
    year: 2021,
    title: 'Machine Learning for Early-Stage Building Energy Prediction: Increment and Enrichment',
    venue: 'Applied Energy, 117787',
    link: 'https://doi.org/10.1016/j.apenergy.2021.117787',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., Singaravel, S., Klein, R., & Geyer, P.',
    year: 2020,
    title: 'Quick energy prediction and comparison of options at the early design stage',
    venue: 'Advanced Engineering Informatics, 46',
    link: 'https://doi.org/10.1016/j.aei.2020.101185',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., & Geyer, P.',
    year: 2020,
    title: 'Information requirements for multi-level-of-development BIM using sensitivity analysis for energy performance',
    venue: 'Advanced Engineering Informatics, 43',
    link: 'https://doi.org/10.1016/j.aei.2019.101026',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., Sawhney, A., & Borrmann, A.',
    year: 2019,
    title: 'Integrating rules of modular coordination to improve model authoring in BIM',
    venue: 'International Journal of Construction Management, 19(1)',
    link: 'https://doi.org/10.1080/15623599.2017.1358077',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., Sawhney, A., & Sharma, V.',
    year: 2017,
    title: 'Utilising Building Component Data from BIM for Formwork Planning',
    venue: 'Construction Economics and Building, 17(4)',
    link: 'https://doi.org/10.5130/AJCEB.v17i4.5546',
  },
  {
    category: 'journal',
    authors: 'Singh, M. M., Sawhney, A., & Borrmann, A.',
    year: 2015,
    title: 'Modular Coordination and BIM: Development of Rule Based Smart Building Components',
    venue: 'Procedia Engineering, 123',
    link: 'https://doi.org/10.1016/j.proeng.2015.10.104',
  },
  {
    category: 'journal',
    authors: 'Harter, H., Singh, M. M., Schneider-Marin, P., Lang, W., & Geyer, P.',
    year: 2020,
    title: 'Uncertainty Analysis of Life Cycle Energy Assessment in Early Stages of Design',
    venue: 'Energy and Buildings, 208',
    link: 'https://doi.org/10.1016/j.enbuild.2019.109635',
  },
  {
    category: 'journal',
    authors:
      'Abualdenien, J., Schneider-Marin, P., Zahedi, A., Harter, H., Exner, H., Steiner, D., Mahan Singh, M., Borrmann, A., Lang, W., König, M., Geyer, P., & Schnellenbach-Held, M.',
    year: 2020,
    title: 'Consistent management and evaluation of building models in the early design stages',
    venue: 'Journal of Information Technology in Construction, 25, 212–232',
    link: 'https://doi.org/10.36680/j.itcon.2020.013',
  },
  {
    category: 'thesis',
    authors: 'Singh, M. M.',
    year: 2021,
    title: 'Early Stage Design Support using Machine Learning and Building Information Modelling',
    venue: 'PhD Thesis, KU Leuven, Belgium',
    link: 'https://www.researchgate.net/publication/359627735',
  },
  {
    category: 'book',
    authors: 'Sawhney, A., Singh, M. M., & Ahuja, R.',
    year: 2017,
    title: 'Worldwide BIM Overview',
    venue: 'In Integrated Building Information Modelling (pp. 1–45), BENTHAM SCIENCE PUBLISHERS',
    link: 'https://doi.org/10.2174/9781681084572117010004',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., & Geyer, P.',
    year: 2021,
    title: 'CNN-based Quick Energy Prediction Model using Image Analysis for Shape Information',
    venue: 'Building Simulation 2021, Bruges, Belgium',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., Schneider-Marin, P., Harter, H., Lang, W., & Geyer, P.',
    year: 2020,
    title: 'Applying Deep Learning and Databases for Energy-efficient Architectural Design',
    venue: 'eCAADe 2020, Berlin, Germany',
    link: 'http://ecaade.org/downloads/eCAADe2020_volume2-print.pdf',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., & Geyer, P.',
    year: 2020,
    title: 'Examining and improving accuracy in a deep learning-based pipeline for the prediction of building energy demand',
    venue: 'EG-ICE 2020, Berlin, Germany',
    link: 'http://dx.doi.org/10.14279/depositonce-9977',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., Singaravel, S., & Geyer, P.',
    year: 2019,
    title: 'Improving Prediction Accuracy of Machine Learning Energy Prediction Models',
    venue: 'CIB W78 2019, New Castle, UK',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., & Geyer, P.',
    year: 2019,
    title: 'Statistical decision assistance for determining energy-efficient options in building design under uncertainty',
    venue: 'EG-ICE 2019, Leuven, Belgium',
    link: 'http://ceur-ws.org/Vol-2394/paper08.pdf',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., Singaravel, S., & Geyer, P.',
    year: 2018,
    title: 'Information Exchange Scenarios between Machine Learning Energy Prediction Model and BIM at Early Stage of Design',
    venue: 'IALCCE 2018, Ghent, Belgium',
  },
  {
    category: 'conference',
    authors: 'Geyer, P., Singh, M. M., & Singaravel, S.',
    year: 2018,
    title: 'Component-Based Machine Learning for Energy Performance Prediction by MultiLOD Models in the Early Phases of Building Design',
    venue: 'EG-ICE 2018, Lausanne, Switzerland',
    link: 'https://doi.org/10.1007/978-3-319-91635-4_27',
  },
  {
    category: 'conference',
    authors: 'Singh, M. M., Sawhney, A., & Borrmann, A.',
    year: 2015,
    title: 'Rule based Building Components for Modular Coordination',
    venue: 'Creative Construction Conference 2015, Krakow, Poland',
  },
  {
    category: 'paper',
    authors: 'Chen, X., Singh, M. M., & Geyer, P.',
    year: 2021,
    title: 'Component-based machine learning for predicting representative time-series of energy performance in building design',
    venue: '28th Eur. Gr. Intell. Comput. Eng. (EG-ICE 2021), Berlin, Germany',
    link: 'https://depositonce.tu-berlin.de/handle/11303/13226',
  },
  {
    category: 'paper',
    authors: 'Singh, M. M., Sawhney, A., Sharma, V., & Kumari, S. P.',
    year: 2016,
    title: 'Exploring Potentials of Using BIM Data for Formwork Design through API Development',
    venue: 'Proceedings of ID@50 Integrated Design Conference, University of Bath',
  },
  {
    category: 'paper',
    authors: 'Sawhney, A., Singh, M. M., & Sharma, V.',
    year: 2016,
    title: 'Building Information Modelling and International Property Measurement Standards: Promising Prospects',
    venue: 'Proceedings of ID@50 Integrated Design Conference, University of Bath',
  },
];

export const researchCategories: Record<'all' | Research['category'], string> = {
  all: 'all',
  journal: 'journal',
  thesis: 'thesis',
  book: 'book',
  conference: 'talk',
  paper: 'paper',
};
