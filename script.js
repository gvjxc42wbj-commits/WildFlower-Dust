// Wildflower Dust cursor sparkle/dust trail
// Lightweight, fades quickly, capped so it won't lag.

(() => {
  const MAX = 60;                 // max particles on screen
  const throttleMs = 12;          // lower = more dust
  let last = 0;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function spawn(x, y) {
    const el = document.createElement("div");
    el.className = "dust";

    // random drift
    const dx = `${rand(-18, 18)}px`;
    const dy = `${rand(-24, 10)}px`;
    el.style.setProperty("--dx", dx);
    el.style.setProperty("--dy", dy);

    // position
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // slight size variance
    const s = rand(0.7, 1.35);
    el.style.width = `${8 * s}px`;
    el.style.height = `${8 * s}px`;

    document.body.appendChild(el);

    // cleanup
    setTimeout(() => el.remove(), 700);

    // cap
    const dusts = document.querySelectorAll(".dust");
    if (dusts.length > MAX) {
      for (let i = 0; i < dusts.length - MAX; i++) dusts[i].remove();
    }
  }

  window.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - last < throttleMs) return;
    last = now;

    // spawn 1–2 particles per move (makes it feel "dusty")
    spawn(e.clientX, e.clientY);
    if (Math.random() < 0.35) spawn(e.clientX + rand(-6, 6), e.clientY + rand(-6, 6));
  }, { passive: true });

  // optional: dust on clicks
  window.addEventListener("click", (e) => {
    for (let i = 0; i < 10; i++) {
      spawn(e.clientX + rand(-10, 10), e.clientY + rand(-10, 10));
    }
  }, { passive: true });
})();
