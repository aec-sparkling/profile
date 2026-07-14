import { useState } from 'react';
import { profile } from '../data';
import { useTypewriter } from '../hooks/useTypewriter';
import { useScroll } from '../hooks/useScroll';
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
  const typed = useTypewriter(TYPED_LINES);
  const { y } = useScroll();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <header className="hero" style={{ opacity: Math.max(1 - y / 600, 0.25) }}>
      <div className="photo-wrap" style={{ transform: `translateY(${y * 0.18}px)` }}>
        <img
          src="/profile.png"
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
          <button onClick={onCycleTheme} className="btn" title="cycle theme">
            theme: {theme}
          </button>
        </div>
      </div>
    </header>
  );
}
