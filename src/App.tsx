import { useState } from 'react';
import Hero from './components/Hero';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import MatrixRain from './components/MatrixRain';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, cycleTheme } = useTheme();
  const [matrix, setMatrix] = useState(false);

  return (
    <div className="page">
      <ScrollProgress />
      {matrix && <MatrixRain onClose={() => setMatrix(false)} />}
      <Hero theme={theme} onCycleTheme={cycleTheme} />
      <Reveal>
        <Editor />
      </Reveal>
      <Reveal delay={120}>
        <Terminal onTheme={cycleTheme} onMatrix={() => setMatrix(true)} />
      </Reveal>
      <StatusBar />
    </div>
  );
}
