import { useEffect, useRef, useState } from 'react';
import { profile } from '../data';
import { exportCv } from '../cv';
import { useTypewriter } from '../hooks/useTypewriter';
import { useScroll } from '../hooks/useScroll';
import { usePhotoShuffle } from '../hooks/usePhotoShuffle';
import type { Theme } from '../types';

const TYPED_LINES = [
  'AI Research & Development',
  'Generative AI for the built world',
  'BIM × Machine Learning',
  'PhD, KU Leuven',
] as const;

interface HeroProps {
  theme: Theme;
  onCycleTheme: () => void;
}

export default function Hero({ theme, onCycleTheme }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const typed = useTypewriter(TYPED_LINES);
  const { y } = useScroll();
  const photo = usePhotoShuffle();
  const cvMenuRef = useRef<HTMLDivElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  useEffect(() => {
    if (!cvMenuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) {
        setCvMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [cvMenuOpen]);

  function handleExport(withPublications: boolean) {
    setCvMenuOpen(false);
    // open the tab synchronously, in the click handler, so the browser doesn't
    // treat it as a pop-up once the PDF finishes building after an `await`
    const tab = window.open('', '_blank');
    exportCv(withPublications, `${import.meta.env.BASE_URL}${photo}`, theme, tab);
  }

  return (
    <header className="hero" style={{ opacity: Math.max(1 - y / 600, 0.25) }}>
      <div className="photo-wrap" style={{ transform: `translateY(${y * 0.18}px)` }}>
        <img
          key={photo}
          src={`${import.meta.env.BASE_URL}${photo}`}
          alt={profile.name}
          className={`photo ${glitch ? 'glitch' : ''}`}
          onMouseEnter={() => setGlitch(true)}
          onAnimationEnd={() => setGlitch(false)}
        />
      </div>
      <div className="hero-text">
        <p className="hero-comment">{'/** hello, world */'}</p>
        <h1>
          <span className="kw">const</span> me = <span className="str">"{profile.name}"</span>;
        </h1>
        <p className="typed">
          &gt; {typed}
          <span className="cursor">▊</span>
        </p>
        <p className="tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <button onClick={copyEmail} className="btn">
            {copied ? '✓ copied!' : 'copy(email)'}
          </button>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            open(linkedin)
          </a>
          <a
            className="btn"
            href={`${import.meta.env.BASE_URL}${profile.blog}`}
            target="_blank"
            rel="noreferrer"
          >
            read(blog)
          </a>
          <div className="cv-export" ref={cvMenuRef}>
            <button onClick={() => setCvMenuOpen((o) => !o)} className="btn">
              export(cv.pdf) ▾
            </button>
            {cvMenuOpen && (
              <div className="cv-menu">
                <button onClick={() => handleExport(true)} className="cv-menu-item">
                  (+) publications
                </button>
                <button onClick={() => handleExport(false)} className="cv-menu-item">
                  (-) publications
                </button>
              </div>
            )}
          </div>
          <button onClick={onCycleTheme} className="btn theme-btn" title={`theme: ${theme}`}>
            <span className="theme-dot" />
          </button>
        </div>
      </div>
    </header>
  );
}
