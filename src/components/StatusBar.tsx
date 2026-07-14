import { profile } from '../data';
import { useScroll } from '../hooks/useScroll';

function vimPosition(progress: number, y: number): string {
  if (y === 0) return 'Top';
  if (progress >= 0.999) return 'Bot';
  return `${Math.round(progress * 100)}%`;
}

export default function StatusBar() {
  const { y, progress } = useScroll();

  return (
    <footer className="statusbar">
      <span>⎇ main</span>
      <span>{profile.location}</span>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="statusbar-link">
        in/manav-mahan-singh
      </a>
      <span className="grow" />
      <span>{vimPosition(progress, y)}</span>
      <span>UTF-8</span>
      <span>© {new Date().getFullYear()} manav</span>
    </footer>
  );
}
