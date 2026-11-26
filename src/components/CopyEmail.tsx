import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

export const email = 'omeshsidda@gmail.com';
export default function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 3500);
  }
  return <button className="copy" onClick={copy}><Icon name={state === 'copied' ? 'check' : 'copy'} /><span aria-live="polite">{state === 'copied' ? 'Email copied' : state === 'failed' ? email : 'Copy email'}</span></button>;
}
