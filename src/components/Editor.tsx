import { useState, type ReactNode } from 'react';
import SkillsPanel from './SkillsPanel';
import ExperiencePanel from './ExperiencePanel';
import EducationPanel from './EducationPanel';
import CoursesPanel from './CoursesPanel';
import AwardsPanel from './AwardsPanel';
import ResearchPanel from './ResearchPanel';

const TABS = [
  'skills.json',
  'experience.log',
  'education.md',
  'courses.yml',
  'research.bib',
  'awards.txt',
] as const;
type Tab = (typeof TABS)[number];

const PANELS: Record<Tab, ReactNode> = {
  'skills.json': <SkillsPanel />,
  'experience.log': <ExperiencePanel />,
  'education.md': <EducationPanel />,
  'courses.yml': <CoursesPanel />,
  'research.bib': <ResearchPanel />,
  'awards.txt': <AwardsPanel />,
};

export default function Editor() {
  const [tab, setTab] = useState<Tab>('skills.json');

  return (
    <main className="editor">
      <div className="tabbar">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="editor-body">{PANELS[tab]}</div>
    </main>
  );
}
