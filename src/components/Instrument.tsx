import { memo, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const modes = ['sine', 'triangle', 'square'] as const;
type Mode = typeof modes[number];
const frequencies = [0.5, 1, 1.5, 2];
const knobAngles = [-86, -32, 22, 70];

function signal(phase: number, mode: Mode) {
  const value = Math.sin(phase);
  if (mode === 'square') return Math.tanh(4 * value);
  if (mode === 'triangle') return 2 * Math.asin(value) / Math.PI;
  return value;
}

// Draw two identical periods. CSS slides the whole trace layer without redrawing paths.
const Traces = memo(function Traces({ mode, frequency }: { mode: Mode; frequency: number }) {
  const paths = Array.from({ length: 17 }, (_, i) => {
    const offset = i / 16;
    const points: string[] = [];
    for (let x = 0; x <= 480; x += 3) {
      const phase = 2 * Math.PI * x / 480;
      const y = 90 + 44 * signal(phase * Math.round(frequency * 2) + offset * 2.7, mode)
        + 23 * Math.sin(phase - 2.8 * offset) + (offset - 0.5) * 27;
      points.push(x + ',' + y.toFixed(1));
    }
    return <polyline key={i} points={points.join(' ')} />;
  });
  return <>
    <defs><g id="signal-period">{paths}</g></defs>
    <g className="traces"><use href="#signal-period" /><use href="#signal-period" x="480" /></g>
  </>;
});

export default function Instrument() {
  const [mode, setMode] = useState<Mode>('sine');
  const [frequencyIndex, setFrequencyIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (scope.current) observer.observe(scope.current);
    return () => observer.disconnect();
  }, []);
  const frequency = frequencies[frequencyIndex];
  return <div className="instrument-stage">
    <div ref={scope} className="instrument" role="group" aria-label="Interactive signal generator">
      {['tl', 'tr', 'bl', 'br'].map(position => <i key={position} className={'screw ' + position} aria-hidden="true" />)}
      <div className="plate-head"><strong><Icon name="wave" /> Signal generator</strong><span>OS–01</span></div>
      <div className="bezel"><div className="glass">
        <div className="readout"><span>CH 1&nbsp; / &nbsp;{mode}</span><span aria-live="polite">{frequency.toFixed(1)} Hz</span></div>
        <svg viewBox="0 0 480 180" preserveAspectRatio="none" className={'display' + (paused || !visible ? ' still' : '')} aria-label={mode + ' waveform at ' + frequency + ' Hz'} role="img">
          <Traces mode={mode} frequency={frequency} />
        </svg>
        <div className="scale" />
      </div></div>
      <div className="instrument-controls">
        <div><span className="engraved">Waveform</span><div className="keys">{modes.map(type =>
          <button key={type} title={type + ' waveform'} aria-label={type + ' waveform'} aria-pressed={mode === type} onClick={() => setMode(type)}><Icon name={type} /></button>
        )}</div></div>
        <div><span className="engraved">Trace</span><div className="keys"><button className="trace-key" aria-label={paused ? 'Resume trace' : 'Pause trace'} onClick={() => setPaused(value => !value)}><Icon name={paused ? 'play' : 'pause'} /></button></div></div>
        <div className="frequency-control" role="group" aria-labelledby="frequency-label">
          <span id="frequency-label" className="engraved">Freq.</span>
          <div className="frequency-keys">
            <button className="frequency-step" aria-label="Decrease frequency" disabled={frequencyIndex === 0} onClick={() => setFrequencyIndex(index => Math.max(0, index - 1))}>
              <span aria-hidden="true">−</span>
            </button>
            <button className="tuner" aria-label={'Change frequency, currently ' + frequency + ' Hz'} title="Cycle frequency" onClick={() => setFrequencyIndex(index => (index + 1) % frequencies.length)}>
              <span className="knob"><i style={{ transform: 'rotate(' + knobAngles[frequencyIndex] + 'deg)' }} /></span>
            </button>
            <button className="frequency-step" aria-label="Increase frequency" disabled={frequencyIndex === frequencies.length - 1} onClick={() => setFrequencyIndex(index => Math.min(frequencies.length - 1, index + 1))}>
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
