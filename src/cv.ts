import {
  profile,
  skills,
  skillTags,
  experience,
  education,
  courses,
  awards,
  research,
  researchCategories,
} from './data';
import type { SkillTag, ResearchCategory } from './types';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function skillsHtml(): string {
  const tags: SkillTag[] = ['lang', 'ai', 'built', 'infra'];
  return tags
    .map((tag) => {
      const list = skills
        .filter((s) => s.tag === tag)
        .map(
          (s) =>
            `<span class="skill">${esc(s.name)} <span class="dots">${'●'.repeat(s.level)}${'○'.repeat(5 - s.level)}</span></span>`,
        )
        .join('');
      return `<div class="skill-row"><span class="skill-tag">${esc(skillTags[tag])}</span><span class="skill-list">${list}</span></div>`;
    })
    .join('');
}

function researchHtml(): string {
  const cats: ResearchCategory[] = ['journal', 'thesis', 'book', 'conference', 'paper'];
  return cats
    .map((cat) => {
      const entries = research.filter((r) => r.category === cat);
      if (!entries.length) return '';
      const label = cat === 'conference' ? 'conference talks' : `${researchCategories[cat]}s`;
      const items = entries
        .map(
          (r) =>
            `<li>${esc(r.authors)} (${r.year}). <em>${esc(r.title)}</em>. ${esc(r.venue)}.${
              r.link ? ` <a href="${esc(r.link)}">link</a>` : ''
            }</li>`,
        )
        .join('');
      return `<h3>${esc(label)}</h3><ul class="pubs">${items}</ul>`;
    })
    .join('');
}

function cvHtml(): string {
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const exp = experience
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-head"><strong>${esc(e.role)}</strong><span class="period">${esc(e.period)}</span></div>
        <div class="entry-sub">${esc(e.org)}</div>
        <div class="entry-detail">${esc(e.detail)}${e.link ? ` · <a href="${esc(e.link)}">${esc(e.link.replace('https://', ''))}</a>` : ''}</div>
      </div>`,
    )
    .join('');

  const edu = education
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-head"><strong>${esc(e.degree)}</strong><span class="period">${esc(e.period)}</span></div>
        <div class="entry-sub">${esc(e.school)}</div>
      </div>`,
    )
    .join('');

  const crs = courses
    .map(
      (c) => `
      <div class="entry">
        <div class="entry-head"><strong>${esc(c.title)}</strong><span class="period">${esc(c.year)}</span></div>
        <div class="entry-sub">${esc(c.provider)}${c.items ? ` — ${c.items.length} courses` : ''}</div>
        ${c.items ? `<div class="entry-detail course-items">${c.items.map(esc).join(' · ')}</div>` : ''}
      </div>`,
    )
    .join('');

  const awd = awards.map((a) => `<li>${esc(a)}</li>`).join('');

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>CV — ${esc(profile.name)}</title>
<style>
  @page { size: A4; margin: 16mm 18mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font: 9.5pt/1.45 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #1a1a1a;
  }
  a { color: #1a5276; text-decoration: none; }
  header { border-bottom: 2px solid #1a1a1a; padding-bottom: 8pt; margin-bottom: 10pt; }
  h1 { font-size: 19pt; letter-spacing: 0.5pt; }
  .title { font-size: 11pt; color: #444; margin-top: 2pt; }
  .contact { font-size: 8.5pt; color: #555; margin-top: 5pt; }
  .contact span + span::before { content: '  ·  '; }
  .tagline { font-size: 9pt; color: #333; margin-top: 5pt; font-style: italic; }
  h2 {
    font-size: 10.5pt; text-transform: uppercase; letter-spacing: 1.2pt;
    border-bottom: 1px solid #999; padding-bottom: 2pt; margin: 12pt 0 6pt;
  }
  h3 { font-size: 9pt; text-transform: capitalize; color: #444; margin: 7pt 0 3pt; }
  .entry { margin-bottom: 6pt; break-inside: avoid; }
  .entry-head { display: flex; justify-content: space-between; gap: 12pt; }
  .period { color: #555; font-size: 8.5pt; white-space: nowrap; }
  .entry-sub { color: #444; }
  .entry-detail { color: #555; font-size: 8.8pt; }
  .course-items { font-size: 8pt; color: #666; }
  .skill-row { display: flex; gap: 8pt; margin-bottom: 3pt; break-inside: avoid; }
  .skill-tag { flex: 0 0 70pt; font-weight: 600; color: #444; }
  .skill-list { flex: 1; }
  .skill { display: inline-block; margin-right: 10pt; white-space: nowrap; }
  .dots { color: #666; font-size: 7pt; letter-spacing: 1pt; vertical-align: 0.5pt; }
  ul { padding-left: 14pt; }
  li { margin-bottom: 2.5pt; break-inside: avoid; }
  .pubs { font-size: 8.5pt; color: #333; }
  .pubs em { color: #1a1a1a; }
  footer {
    margin-top: 14pt; padding-top: 5pt; border-top: 1px solid #ccc;
    font-size: 7.5pt; color: #888; display: flex; justify-content: space-between;
  }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.name)}</h1>
    <div class="title">${esc(profile.title)}</div>
    <div class="contact">
      <span>${esc(profile.location)}</span>
      <span><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></span>
      <span><a href="${esc(profile.linkedin)}">LinkedIn</a></span>
      <span>${profile.languages.map(esc).join(', ')}</span>
    </div>
    <div class="tagline">${esc(profile.tagline)}</div>
  </header>

  <h2>Experience</h2>
  ${exp}

  <h2>Education</h2>
  ${edu}

  <h2>Skills</h2>
  ${skillsHtml()}

  <h2>Awards &amp; Honours</h2>
  <ul>${awd}</ul>

  <h2>Courses &amp; Certifications</h2>
  ${crs}

  <h2>Research &amp; Publications</h2>
  ${researchHtml()}

  <footer>
    <span>${esc(profile.name)} — Curriculum Vitae</span>
    <span>Generated on ${date}</span>
  </footer>
</body>
</html>`;
}

/** Opens a print-ready CV in a new tab and triggers the browser's PDF export. */
export function exportCv(): void {
  const win = window.open('', '_blank');
  if (!win) return; // popup blocked
  win.document.write(cvHtml());
  win.document.close();
  win.focus();
  // let fonts/layout settle before the print dialog opens
  setTimeout(() => win.print(), 250);
}
