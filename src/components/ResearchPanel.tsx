import { useMemo, useState } from 'react';
import { research, researchCategories } from '../data';
import type { Research } from '../types';

type Filter = 'all' | Research['category'];

function ResearchItem({ item }: { item: Research }) {
  return (
    <li className="xp static">
      <div className="xp-head">
        <span className="xp-role">{item.title}</span>
        <span className="xp-period">{item.year}</span>
      </div>
      <p className="xp-org">// {item.authors}</p>
      <p className="course-provider">{item.venue}</p>
      {item.link && (
        <a href={item.link} target="_blank" rel="noreferrer">
          → {item.link.replace('https://', '')}
        </a>
      )}
    </li>
  );
}

export default function ResearchPanel() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => research.filter((r) => filter === 'all' || r.category === filter),
    [filter]
  );

  return (
    <>
      <div className="filters">
        {(Object.entries(researchCategories) as [Filter, string][]).map(([key, label]) => (
          <button
            key={key}
            className={`filter ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            #{label}
          </button>
        ))}
      </div>
      <ul className="xp-list">
        {filtered.map((r) => (
          <ResearchItem key={r.title} item={r} />
        ))}
      </ul>
    </>
  );
}
