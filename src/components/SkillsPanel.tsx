import { useMemo, useState } from 'react';
import { skills, skillTags } from '../data';
import type { Skill, SkillTag } from '../types';

type Filter = 'all' | SkillTag;

function SkillItem({ skill }: { skill: Skill }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      className={`skill ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded((e) => !e)}
      title="click me"
    >
      <span className="skill-name">{skill.name}</span>
      {expanded && (
        <span className="skill-meter">
          <span className="skill-fill" style={{ width: `${skill.level * 20}%` }} />
          <span className="skill-pct">{skill.level * 20}%</span>
        </span>
      )}
    </button>
  );
}

export default function SkillsPanel() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => skills.filter((s) => filter === 'all' || s.tag === filter),
    [filter]
  );

  return (
    <>
      <div className="filters">
        {(Object.entries(skillTags) as [Filter, string][]).map(([key, label]) => (
          <button
            key={key}
            className={`filter ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            #{label}
          </button>
        ))}
      </div>
      <div className="skills-grid">
        {filtered.map((s) => (
          <SkillItem key={s.name} skill={s} />
        ))}
      </div>
      <p className="hint">// click a skill to inspect proficiency</p>
    </>
  );
}
