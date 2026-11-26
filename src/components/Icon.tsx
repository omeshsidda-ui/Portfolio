const paths = {
  wave: 'M1 7c4 0 5-5 9-5s5 5 9 5 5-5 9-5 5 5 9 5M1 14c4 0 5-5 9-5s5 5 9 5 5-5 9-5 5 5 9 5M1 21c4 0 5-5 9-5s5 5 9 5 5-5 9-5 5 5 9 5',
  diagonal: 'M5 19 19 5M6 5h13v13',
  down: 'M12 4v16m-7-7 7 7 7-7',
  copy: 'M8 8h12v13H8zM16 5V3H4v14h1',
  check: 'm4 12 5 5L20 6',
  sun: 'M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M17 12a5 5 0 1 1-10 0 5 5 0 1 1 10 0Z',
  moon: 'M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11Z',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 1 1 4 0Z',
  clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0ZM12 7v5l4 2',
  plus: 'M5 12h14M12 5v14',
  sine: 'M1 12c4 0 3-8 6-8s5 16 9 16 3-8 7-8',
  triangle: 'm1 15 6-10 9 15 7-12',
  square: 'M1 16h4V5h8v14h7V9h3',
  pause: 'M8 5v14M16 5v14',
  play: 'm7 5 12 7-12 7Z',
  book: 'M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1Zm9 1v14',
};
export type IconName = keyof typeof paths;
export default function Icon({ name }: { name: IconName }) {
  return <svg className={'icon icon-' + name} viewBox={name === 'wave' ? '0 0 38 24' : '0 0 24 24'} fill="none" stroke="currentColor" strokeWidth={name === 'wave' ? 2.9 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
