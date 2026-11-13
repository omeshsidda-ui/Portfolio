import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === 'touch') {
        onLeave();
        return;
      }
      for (const cursor of [outer.current, inner.current]) {
        if (!cursor) continue;
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.style.opacity = '1';
      }
      root.classList.add('custom-cursor-enabled');
    };
    const onDown = (event: PointerEvent) => {
      if (finePointer.matches && event.pointerType !== 'touch') root.classList.add('custom-cursor-clicked');
      else onLeave();
    };
    const onUp = () => root.classList.remove('custom-cursor-clicked');
    const onLeave = () => {
      root.classList.remove('custom-cursor-enabled', 'custom-cursor-clicked', 'custom-cursor-hovered');
      for (const cursor of [outer.current, inner.current]) {
        if (cursor) cursor.style.opacity = '0';
      }
    };
    const onOver = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) root.classList.add('custom-cursor-hovered');
    };
    const onOut = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) root.classList.remove('custom-cursor-hovered');
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    finePointer.addEventListener('change', onLeave);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    return () => {
      root.classList.remove('custom-cursor-enabled', 'custom-cursor-clicked', 'custom-cursor-hovered');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      finePointer.removeEventListener('change', onLeave);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return <><div aria-hidden="true" ref={outer} className="custom-cursor-outer" /><div aria-hidden="true" ref={inner} className="custom-cursor-inner" /></>;
}

