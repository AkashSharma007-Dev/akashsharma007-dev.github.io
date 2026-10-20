// Shared prototype runner. Screens are <section class="screen" data-name>.
// URL options: ?s=2 opens screen 2 (0-based), &shot=1 drops the presentation chrome, &wire=1 shows the wireframe version.
(() => {
  const q = new URLSearchParams(location.search);
  const screens = [...document.querySelectorAll('.screen')];
  const list = document.getElementById('list');
  if (q.has('shot')) document.body.classList.add('shot');
  if (q.has('wire')) document.body.classList.add('wire');

  const items = screens.map((s, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button">${i + 1}. ${s.dataset.name}</button>`;
    li.firstChild.addEventListener('click', () => show(i));
    list && list.append(li);
    return li.firstChild;
  });

  function show(i) {
    screens.forEach((s, n) => s.classList.toggle('on', n === i));
    items.forEach((b, n) => b.setAttribute('aria-current', n === i));
  }

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) show(+go.dataset.go);
  });
  show(Math.min(+(q.get('s') || 0), screens.length - 1));
})();
