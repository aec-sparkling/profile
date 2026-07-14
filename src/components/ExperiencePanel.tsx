import { useState } from 'react';
import { experience } from '../data';
import type { Experience } from '../types';

function ExperienceItem({ item, defaultOpen = false }: { item: Experience; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li className={`xp ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
      <div className="xp-head">
        <span className="xp-toggle">{open ? '▾' : '▸'}</span>
        <span className="xp-role">{item.role}</span>
        <span className="xp-period">{item.period}</span>
      </div>
      {open && (
        <div className="xp-body">
          <p className="xp-org">// {item.org}</p>
          <p>{item.detail}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              → {item.link.replace('https://', '')}
            </a>
          )}
        </div>
      )}
    </li>
  );
}

export default function ExperiencePanel() {
  return (
    <>
      <ul className="xp-list">
        {experience.map((e, i) => (
          <ExperienceItem key={e.role + e.period} item={e} defaultOpen={i === 0} />
        ))}
      </ul>
      <p className="hint">// click an entry to expand</p>
    </>
  );
}
