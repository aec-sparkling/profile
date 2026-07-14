import { profile, skills, experience, education, awards } from './data.js';

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="avatar" aria-hidden="true">
          MS
        </div>
        <h1>{profile.name}</h1>
        <p className="title">{profile.title}</p>
        <p className="tagline">{profile.tagline}</p>
        <nav className="links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span className="location">{profile.location}</span>
        </nav>
      </header>

      <Section title="Skills">
        <ul className="chips">
          {skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.role + e.period}>
              <div className="row">
                <h3>{e.role}</h3>
                <span className="period">{e.period}</span>
              </div>
              <p className="org">{e.org}</p>
              <p className="detail">
                {e.detail}{' '}
                {e.link && (
                  <a href={e.link} target="_blank" rel="noreferrer">
                    {e.link.replace('https://', '')}
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <ol className="timeline">
          {education.map((e) => (
            <li key={e.degree}>
              <div className="row">
                <h3>{e.degree}</h3>
                <span className="period">{e.period}</span>
              </div>
              <p className="org">{e.school}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Awards & Scholarships">
        <ul className="awards">
          {awards.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      <footer>
        <p>
          Languages: {profile.languages.join(' · ')}
        </p>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </div>
  );
}
