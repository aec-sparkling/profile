import { jsPDF } from 'jspdf';
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

const MARGIN = 18;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;

function makeDoc() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  function ensureSpace(next: number) {
    if (y + next > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  }

  function heading(text: string) {
    ensureSpace(10);
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text(text.toUpperCase(), MARGIN, y);
    y += 1.5;
    doc.setDrawColor(160);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 5;
  }

  function entry(head: string, side: string, sub: string, detail?: string) {
    const detailLines = detail ? doc.splitTextToSize(detail, CONTENT_W) : [];
    ensureSpace(5 + (sub ? 4 : 0) + detailLines.length * 4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(head, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(90, 90, 90);
    doc.text(side, PAGE_W - MARGIN, y, { align: 'right' });
    y += 4;

    if (sub) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(70, 70, 70);
      doc.text(sub, MARGIN, y);
      y += 4;
    }

    if (detailLines.length) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(85, 85, 85);
      doc.text(detailLines, MARGIN, y);
      y += detailLines.length * 3.8;
    }
    y += 2;
  }

  function bullet(text: string) {
    const lines = doc.splitTextToSize(`•  ${text}`, CONTENT_W - 2);
    ensureSpace(lines.length * 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(40, 40, 40);
    doc.text(lines, MARGIN, y);
    y += lines.length * 4;
  }

  // ---- header ----
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(15, 15, 15);
  doc.text(profile.name, MARGIN, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(profile.title, MARGIN, y);
  y += 5;

  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  const contact = [profile.location, profile.email, profile.linkedin, profile.languages.join(', ')].join('   ·   ');
  doc.text(doc.splitTextToSize(contact, CONTENT_W), MARGIN, y);
  y += 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const taglineLines = doc.splitTextToSize(profile.tagline, CONTENT_W);
  doc.text(taglineLines, MARGIN, y);
  y += taglineLines.length * 4 + 2;

  doc.setDrawColor(20);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  doc.setLineWidth(0.2);

  // ---- experience ----
  heading('Experience');
  experience.forEach((e) => entry(e.role, e.period, e.org, e.detail));

  // ---- education ----
  heading('Education');
  education.forEach((e) => entry(e.degree, e.period, e.school));

  // ---- skills ----
  heading('Skills');
  (['lang', 'ai', 'built', 'infra'] as SkillTag[]).forEach((tag) => {
    const list = skills.filter((s) => s.tag === tag);
    if (!list.length) return;
    ensureSpace(4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    doc.text(skillTags[tag], MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(list.map((s) => s.name).join('   ·   '), MARGIN + 24, y);
    y += 4.5;
  });
  y += 2;

  // ---- awards ----
  heading('Awards & Honours');
  awards.forEach((a) => bullet(a));

  // ---- courses ----
  heading('Courses & Certifications');
  courses.forEach((c) => entry(c.title, c.year, c.provider, c.items?.join(' · ')));

  // ---- research ----
  heading('Research & Publications');
  (['journal', 'thesis', 'book', 'conference', 'paper'] as ResearchCategory[]).forEach((cat) => {
    const list = research.filter((r) => r.category === cat);
    if (!list.length) return;
    ensureSpace(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text((cat === 'conference' ? 'conference talks' : `${researchCategories[cat]}s`).toUpperCase(), MARGIN, y);
    y += 4;
    list.forEach((r) => {
      const text = `${r.authors} (${r.year}). ${r.title}. ${r.venue}.`;
      const lines = doc.splitTextToSize(text, CONTENT_W);
      ensureSpace(lines.length * 3.6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.3);
      doc.setTextColor(50, 50, 50);
      doc.text(lines, MARGIN, y);
      y += lines.length * 3.6 + 1;
    });
    y += 1.5;
  });

  return doc;
}

/** Builds and downloads the CV as a real PDF file — no print dialog. */
export function exportCv(): void {
  makeDoc().save('cv.pdf');
}
