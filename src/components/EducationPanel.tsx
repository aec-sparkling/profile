import { education } from '../data';

export default function EducationPanel() {
  return (
    <ul className="edu-list">
      {education.map((e) => (
        <li key={e.degree}>
          <span className="kw">##</span> {e.degree}
          <p className="edu-meta">
            {e.school} · {e.period}
          </p>
        </li>
      ))}
    </ul>
  );
}
