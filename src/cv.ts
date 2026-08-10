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
import type { SkillTag, ResearchCategory, Theme } from './types';

const PAGE_W = 210;
const PAGE_H = 297;
const SIDEBAR_W = 62;
const SIDE_X = 10;
const SIDE_W = SIDEBAR_W - SIDE_X * 2;

// page 1: content sits right of the full sidebar; later pages: right of a slimmer color band
const PAGE1_X = SIDEBAR_W + 12;
const PAGE1_W = PAGE_W - PAGE1_X - 14;
const BAND_W = 10;
const BAND_X = BAND_W + 10;
const BAND_MAIN_W = PAGE_W - BAND_X - 14;
// publications get the widest possible line — just enough gutter to clear the band
const PUB_X = BAND_W + 4;
const PUB_W = PAGE_W - PUB_X - 14;

type RGB = [number, number, number];

// exact hex values from each :root[data-theme=...] block in index.css
const THEME_PALETTES: Record<Theme, { navy: RGB; accent: RGB; accentDim: RGB; text: RGB }> = {
  green: { navy: [22, 29, 22], accent: [51, 255, 102], accentDim: [29, 140, 63], text: [210, 232, 210] },
  blue: { navy: [18, 26, 44], accent: [77, 184, 255], accentDim: [31, 110, 163], text: [207, 224, 245] },
  purple: { navy: [26, 21, 48], accent: [181, 115, 255], accentDim: [109, 59, 163], text: [222, 210, 245] },
  cyan: { navy: [10, 40, 32], accent: [41, 255, 208], accentDim: [21, 156, 124], text: [200, 245, 234] },
  red: { navy: [44, 13, 13], accent: [255, 77, 77], accentDim: [163, 43, 43], text: [245, 210, 210] },
};

const INK: RGB = [26, 30, 34];
const MUTED: RGB = [100, 105, 112];

interface Photo {
  dataUrl: string;
  format: 'JPEG' | 'PNG';
  width: number;
  height: number;
}

async function loadPhoto(url: string): Promise<Photo | null> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = dataUrl;
    });
    const format = blob.type.includes('png') ? 'PNG' : 'JPEG';
    return { dataUrl, format, width, height };
  } catch {
    return null;
  }
}

/**
 * jsPDF's standard Helvetica font silently drops characters outside its
 * built-in encoding (em/en dashes, curly quotes) instead of rendering them —
 * the glyph just vanishes while width calculations still account for it,
 * throwing off wrapping. Swap them for plain ASCII before anything is measured
 * or drawn.
 */
function pdfSafe(text: string): string {
  return text
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');
}

function makeDoc(includePublications: boolean, photo: Photo | null, theme: Theme) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const rawText = doc.text.bind(doc);
  doc.text = ((text: string | string[], x: number, y: number, options?: unknown, transform?: unknown) =>
    rawText(
      Array.isArray(text) ? text.map(pdfSafe) : pdfSafe(text),
      x,
      y,
      options as never,
      transform as never
    )) as typeof doc.text;

  const rawSplit = doc.splitTextToSize.bind(doc);
  doc.splitTextToSize = ((text: string, maxWidth: number, options?: unknown) =>
    rawSplit(pdfSafe(text), maxWidth, options as never)) as typeof doc.splitTextToSize;

  const rawLink = doc.textWithLink.bind(doc);
  doc.textWithLink = ((text: string, x: number, y: number, options: unknown) =>
    rawLink(pdfSafe(text), x, y, options as never)) as typeof doc.textWithLink;

  const rawWidth = doc.getTextWidth.bind(doc);
  doc.getTextWidth = ((text: string) => rawWidth(pdfSafe(text))) as typeof doc.getTextWidth;

  const { navy: NAVY, accent: ACCENT, accentDim: ACCENT_DIM, text: SIDE_TEXT } = THEME_PALETTES[theme];
  const LINK_ON_DARK = ACCENT;
  const LINK_ON_LIGHT = ACCENT_DIM;
  let y = 0;
  let mainX = PAGE1_X;
  let mainW = PAGE1_W;
  let wideContinuation = false;

  function paintSidebar() {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, SIDEBAR_W, PAGE_H, 'F');
    doc.setFillColor(...ACCENT);
    doc.rect(SIDEBAR_W, 0, 1, PAGE_H, 'F');
  }

  /** slim color band for continuation pages — same palette, smaller footprint */
  function paintBand() {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, BAND_W, PAGE_H, 'F');
    doc.setFillColor(...ACCENT);
    doc.rect(BAND_W, 0, 1, PAGE_H, 'F');
  }

  function newContinuationPage() {
    doc.addPage();
    paintBand();
    mainX = wideContinuation ? PUB_X : BAND_X;
    mainW = wideContinuation ? PUB_W : BAND_MAIN_W;
    y = 18;
  }

  function ensureSpace(next: number) {
    if (y + next > PAGE_H - 14) {
      newContinuationPage();
    }
  }

  /** shrinks font size until text fits maxWidth, for single-line clickable text */
  function fitSize(text: string, maxWidth: number, start: number, min = 6) {
    let size = start;
    doc.setFontSize(size);
    while (doc.getTextWidth(text) > maxWidth && size > min) {
      size -= 0.5;
      doc.setFontSize(size);
    }
    return size;
  }

  function heading(text: string) {
    ensureSpace(11);
    y += 6.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...INK);
    doc.text(text.toUpperCase(), mainX, y);
    const w = doc.getTextWidth(text.toUpperCase());
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(0.8);
    doc.line(mainX + w + 3, y - 1.2, mainX + mainW, y - 1.2);
    doc.setLineWidth(0.2);
    y += 6;
  }

  function entry(head: string, side: string, sub: string, detail?: string) {
    // splitTextToSize measures using whatever font/size is currently active,
    // so set the detail line's font before measuring, not just before drawing
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    const detailLines = detail ? doc.splitTextToSize(detail, mainW) : [];
    ensureSpace(6 + (sub ? 4.6 : 0) + detailLines.length * 4.4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(head, mainX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(...MUTED);
    doc.text(side, mainX + mainW, y, { align: 'right' });
    y += 4.6;

    if (sub) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9.3);
      doc.setTextColor(80, 85, 92);
      doc.text(sub, mainX, y);
      y += 4.6;
    }

    if (detailLines.length) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(90, 90, 90);
      doc.text(detailLines, mainX, y);
      y += detailLines.length * 4.4;
    }
    y += 3.4;
  }

  function bullet(text: string) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.1);
    const lines = doc.splitTextToSize(text, mainW - 3.5);
    ensureSpace(lines.length * 4.6);
    doc.setFillColor(...ACCENT);
    doc.circle(mainX + 0.6, y - 1.1, 0.6, 'F');
    doc.setTextColor(50, 50, 50);
    doc.text(lines, mainX + 3.5, y);
    y += lines.length * 4.6 + 1;
  }

  /** clickable single-line link, right after the given text block */
  function linkLine(label: string, url: string) {
    ensureSpace(4);
    doc.setFont('helvetica', 'normal');
    fitSize(label, mainW, 8.3);
    doc.setTextColor(...LINK_ON_LIGHT);
    doc.textWithLink(label, mainX, y, { url });
    y += 4;
  }

  // ================= sidebar (page 1 only) =================
  paintSidebar();
  let sy = 14;

  if (photo) {
    const diameter = 34;
    const r = diameter / 2;
    const cx = SIDEBAR_W / 2;
    const cy = sy + r;

    // scale to cover the circle without distorting the image, then center-crop
    const scale = diameter / Math.min(photo.width, photo.height);
    const w = photo.width * scale;
    const h = photo.height * scale;
    const px = cx - w / 2;
    const py = cy - h / 2;

    doc.setFillColor(255, 255, 255);
    doc.circle(cx, cy, r + 1, 'F');
    doc.saveGraphicsState();
    doc.circle(cx, cy, r, null);
    doc.clip();
    doc.discardPath();
    doc.addImage(photo.dataUrl, photo.format, px, py, w, h, undefined, 'FAST');
    doc.restoreGraphicsState();
    sy += diameter + 8;
  }

  const ICON_W = 5.5;
  const TEXT_X = SIDE_X + ICON_W;
  const TEXT_W = SIDE_W - ICON_W;

  type IconKind = 'pin' | 'mail' | 'linkedin' | 'web' | 'calendar' | 'chat';

  /** small vector glyphs — no icon font/dependency needed */
  function icon(kind: IconKind, cy: number) {
    const x = SIDE_X;
    doc.setDrawColor(...ACCENT);
    doc.setFillColor(...ACCENT);
    doc.setLineWidth(0.25);
    switch (kind) {
      case 'pin':
        doc.circle(x + 1.3, cy - 0.5, 1.05, 'F');
        doc.triangle(x + 0.4, cy + 0.1, x + 2.2, cy + 0.1, x + 1.3, cy + 1.6, 'F');
        break;
      case 'mail':
        doc.rect(x, cy - 1.3, 3.6, 2.6, 'S');
        doc.line(x, cy - 1.3, x + 1.8, cy + 0.2);
        doc.line(x + 1.8, cy + 0.2, x + 3.6, cy - 1.3);
        break;
      case 'linkedin':
        doc.roundedRect(x, cy - 1.6, 3.4, 3.2, 0.6, 0.6, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(5.5);
        doc.setTextColor(...NAVY);
        doc.text('in', x + 0.55, cy + 0.75);
        break;
      case 'web':
        doc.roundedRect(x, cy - 1.6, 3.4, 3.2, 0.6, 0.6, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(5.5);
        doc.setTextColor(...NAVY);
        doc.text('W', x + 0.85, cy + 0.75);
        break;
      case 'calendar':
        doc.rect(x, cy - 1.5, 3.6, 3.1, 'S');
        doc.line(x, cy - 0.6, x + 3.6, cy - 0.6);
        break;
      case 'chat':
        doc.roundedRect(x, cy - 1.7, 3.8, 2.5, 0.7, 0.7, 'F');
        doc.triangle(x + 0.5, cy + 0.6, x + 1.4, cy + 0.6, x + 0.5, cy + 1.5, 'F');
        break;
    }
  }

  function sideLine(text: string, kind?: IconKind, indent = false, oneLine = false) {
    const useIndent = !!kind || indent;
    const maxWidth = useIndent ? TEXT_W : SIDE_W;
    if (kind) icon(kind, sy - 1.1);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...SIDE_TEXT);
    if (oneLine) {
      fitSize(text, maxWidth, 8);
      doc.text(text, useIndent ? TEXT_X : SIDE_X, sy);
      sy += 5.6;
    } else {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, useIndent ? TEXT_X : SIDE_X, sy);
      sy += lines.length * 3.6 + 3;
    }
  }

  function sideLinkLine(label: string, url: string, kind: IconKind) {
    icon(kind, sy - 1.1);
    doc.setFont('helvetica', 'normal');
    fitSize(label, TEXT_W, 8);
    doc.setTextColor(...LINK_ON_DARK);
    doc.textWithLink(label, TEXT_X, sy, { url });
    sy += 6;
  }

  sideLine(profile.location, 'pin', false, true);
  sideLinkLine(profile.email, `mailto:${profile.email}`, 'mail');
  sideLinkLine('LinkedIn', profile.linkedin, 'linkedin');
  sideLinkLine('Portfolio', 'https://manavmahan.github.io/profile/', 'web');
  sy += 2;

  sideLine(profile.dateOfBirth, 'calendar');
  sy += 2;

  icon('chat', sy - 1.1);
  profile.languages.forEach((l) => sideLine(l, undefined, true));

  // ================= main column =================
  y = 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(...INK);
  doc.text(profile.name, mainX, y);
  y += 6.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11.5);
  doc.setTextColor(...ACCENT_DIM);
  doc.text(profile.title, mainX, y);
  y += 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  const taglineLines = doc.splitTextToSize(profile.tagline, mainW);
  doc.text(taglineLines, mainX, y);
  y += taglineLines.length * 4.5 + 6;

  heading('Experience');
  experience.forEach((e) => entry(e.role, e.period, e.org, e.detail));

  heading('Education');
  education.forEach((e) => entry(e.degree, e.period, e.school));

  heading('Awards & Honours');
  awards.forEach((a) => bullet(a));

  // courses always start on a fresh page, leaving page 1 to breathe
  newContinuationPage();

  heading('Courses & Certifications');
  courses.forEach((c) => entry(c.title, c.year, c.provider, c.items?.join(' · ')));

  const BAR_W = 15;
  const BAR_H = 1.5;
  const MAX_LEVEL = 5;

  function levelBar(x: number, barY: number, level: number) {
    doc.setFillColor(222, 222, 222);
    doc.roundedRect(x, barY, BAR_W, BAR_H, 0.5, 0.5, 'F');
    doc.setFillColor(...ACCENT_DIM);
    doc.roundedRect(x, barY, BAR_W * (level / MAX_LEVEL), BAR_H, 0.5, 0.5, 'F');
  }

  heading('Skills');
  (['lang', 'ai', 'built', 'infra'] as SkillTag[]).forEach((tag) => {
    const list = skills.filter((s) => s.tag === tag);
    if (!list.length) return;
    ensureSpace(9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT_DIM);
    doc.text(skillTags[tag].toUpperCase(), mainX, y);
    y += 1.2;
    doc.setDrawColor(...ACCENT_DIM);
    doc.setLineWidth(0.2);
    doc.line(mainX, y, mainX + 22, y);
    y += 4;

    const colGap = 8;
    const colW = (mainW - colGap) / 2;
    for (let i = 0; i < list.length; i += 2) {
      ensureSpace(5.2);
      list.slice(i, i + 2).forEach((s, col) => {
        const x = mainX + col * (colW + colGap);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.3);
        doc.setTextColor(40, 40, 40);
        doc.text(s.name, x, y);
        levelBar(x + colW - BAR_W, y - 2.2, s.level);
      });
      y += 5.2;
    }
    y += 2;
  });
  y += 1;

  if (includePublications) {
    // publications always start on a fresh page, after the rest of the CV, at full line width
    wideContinuation = true;
    newContinuationPage();

    heading('Research & Publications');
    (['journal', 'thesis', 'book', 'conference', 'paper'] as ResearchCategory[]).forEach((cat) => {
      const list = research.filter((r) => r.category === cat);
      if (!list.length) return;
      ensureSpace(6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...ACCENT_DIM);
      doc.text((cat === 'conference' ? 'conference talks' : `${researchCategories[cat]}s`).toUpperCase(), mainX, y);
      y += 4;
      list.forEach((r) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.3);
        const text = `${r.authors} (${r.year}). ${r.title}. ${r.venue}.`;
        const lines = doc.splitTextToSize(text, mainW);
        ensureSpace(lines.length * 3.6);
        doc.setTextColor(60, 60, 60);
        doc.text(lines, mainX, y);
        y += lines.length * 3.6 + 0.5;
        if (r.link) linkLine(r.link.replace('https://', ''), r.link);
        y += 1;
      });
      y += 1.5;
    });
  }

  return doc;
}

/**
 * Builds the CV as a real PDF and opens it in a new tab (browser's native PDF viewer).
 *
 * `preOpenedWindow` should be a tab opened synchronously in the click handler
 * (e.g. `window.open('', '_blank')`) — building the PDF requires an `await`,
 * and opening the tab only after that would lose the user-gesture context and
 * get blocked as a pop-up. Passing an already-open tab sidesteps that.
 */
export async function exportCv(
  includePublications: boolean = true,
  photoUrl?: string,
  theme: Theme = 'blue',
  preOpenedWindow?: Window | null
): Promise<void> {
  const photo = await loadPhoto(photoUrl ?? `${import.meta.env.BASE_URL}profile.png`);
  const doc = makeDoc(includePublications, photo, theme);
  const filename = includePublications ? 'manav-cv-pubs.pdf' : 'manav-cv.pdf';
  doc.setProperties({ title: filename });
  // wrap the blob in a named File — browsers use this as the suggested
  // filename when the PDF viewer's own blob: URL would otherwise be nameless
  const file = new File([doc.output('blob')], filename, { type: 'application/pdf' });
  const url = URL.createObjectURL(file);
  if (preOpenedWindow) {
    preOpenedWindow.location.href = url;
  } else {
    window.open(url, '_blank');
  }
}
