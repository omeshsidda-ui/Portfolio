const card = document.querySelector('.card');
const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)');

card.disabled = false;
card.addEventListener('click', () => {
  const flipped = card.getAttribute('aria-pressed') === 'true';
  card.setAttribute('aria-pressed', String(!flipped));
});

card.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse' || !motionAllowed.matches) return;

  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  card.style.setProperty('--tilt-x', (-y * 13) + 'deg');
  card.style.setProperty('--tilt-y', (x * 13) + 'deg');
});

card.addEventListener('pointerleave', () => {
  card.style.removeProperty('--tilt-x');
  card.style.removeProperty('--tilt-y');
});
