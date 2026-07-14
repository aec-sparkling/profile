import { profile } from '../data';

export default function StatusBar() {
  return (
    <footer className="statusbar">
      <span>⎇ main</span>
      <span>{profile.location}</span>
      <span>langs: {profile.languages.length}</span>
      <span className="grow" />
      <span>UTF-8</span>
      <span>© {new Date().getFullYear()} manav</span>
    </footer>
  );
}
