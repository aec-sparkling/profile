import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { profile, skills, experience, education, courses, awards } from '../data';

interface TerminalProps {
  onTheme: () => void;
  onMatrix: () => void;
}

interface Entry {
  cmd: string | null;
  out: string;
}

const COMMANDS: Record<string, () => string> = {
  help: () =>
    [
      'Available commands:',
      '  whoami       — who is this guy?',
      '  skills       — tech stack',
      '  experience   — work history',
      '  education    — degrees',
      '  courses      — certificates & courses',
      '  awards       — trophy cabinet',
      '  contact      — reach out',
      '  languages    — spoken, not programming',
      '  theme        — cycle color theme',
      '  matrix       — ⚠ do not run',
      '  clear        — wipe the screen',
    ].join('\n'),
  whoami: () =>
    `${profile.name}\n${profile.title} @ NeoBIM GmbH & TU Munich\n"${profile.tagline}"`,
  skills: () =>
    skills
      .map((s) => `▸ ${s.name.padEnd(22)} ${'█'.repeat(s.level)}${'░'.repeat(5 - s.level)}`)
      .join('\n'),
  experience: () =>
    experience.map((e) => `[${e.period}] ${e.role}\n           └─ ${e.org}`).join('\n'),
  education: () => education.map((e) => `🎓 ${e.degree} — ${e.school} (${e.period})`).join('\n'),
  courses: () =>
    courses
      .map(
        (c) =>
          `📜 ${c.title} — ${c.provider} (${c.year})` +
          (c.items ? `\n${c.items.map((i) => `     · ${i}`).join('\n')}` : '')
      )
      .join('\n'),
  awards: () => awards.map((a) => `★ ${a}`).join('\n'),
  contact: () =>
    [
      `email:       ${profile.email}`,
      `linkedin:    ${profile.linkedin}`,
      `blog:        ${profile.blog}`,
      `location:    ${profile.location}`,
      `born:        ${profile.dateOfBirth}`,
      `nationality: ${profile.nationality}`,
      `family:      ${profile.maritalStatus}`,
    ].join('\n'),
  blog: () => `📝 Blog is live at ${profile.blog} — go take a look!`,
  languages: () => profile.languages.map((l) => `🗣 ${l}`).join('\n'),
  sudo: () => 'manav is not in the sudoers file. This incident will be reported. 👮',
  ls: () => 'skills/  experience/  education/  courses/  awards/  secret_projects/ 🔒',
  pwd: () => '/home/manav/profile',
  'rm -rf /': () => 'nice try. 🙃',
  hello: () => 'Hi there! Type `help` to see what I can do.',
  hi: () => 'Hi there! Type `help` to see what I can do.',
  exit: () => "There is no escape. This isn't even a real shell.",
};

export default function Terminal({ onTheme, onMatrix }: TerminalProps) {
  const [history, setHistory] = useState<Entry[]>([
    { cmd: null, out: 'Welcome to manav-shell v1.0.0 — type `help` to get started.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setCmdHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    if (cmd === 'theme') {
      onTheme();
      setHistory((h) => [...h, { cmd, out: 'Theme switched. Fancy. ✨' }]);
      return;
    }
    if (cmd === 'matrix') {
      onMatrix();
      setHistory((h) => [...h, { cmd, out: 'Wake up, Neo... (click anywhere to exit)' }]);
      return;
    }
    const handler = COMMANDS[cmd] ?? COMMANDS[cmd.toLowerCase()];
    const out = handler
      ? handler()
      : `command not found: ${cmd}\nType \`help\` for available commands.`;
    setHistory((h) => [...h, { cmd, out }]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next] !== undefined) {
        setHistIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? cmdHistory[next] : '');
    }
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="term-titlebar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="term-title">manav@profile: ~/shell</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {history.map((h, i) => (
          <div key={i} className="term-entry">
            {h.cmd !== null && (
              <div className="term-line">
                <span className="prompt">manav@profile:~$</span> {h.cmd}
              </div>
            )}
            <pre className="term-out">{h.out}</pre>
          </div>
        ))}
        <div className="term-line term-input-line">
          <span className="prompt">manav@profile:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  );
}
