(function () {
  const canvas = document.getElementById('bgCinema');
  if (!canvas) return;

  const context = canvas.getContext('2d');

  // Internal render resolution — matches the extracted frame images.
  // Displayed full-bleed via CSS (object-fit: cover) regardless of
  // the actual viewport size.
  canvas.width = 960;
  canvas.height = 540;

  const totalFrames = 79;
  const frameUrl = (index) =>
    `frames/frame-${index.toString().padStart(3, '0')}.jpg`;

  // Preload every frame so scrubbing feels smooth instead of flickering
  const images = [];
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = frameUrl(i);
    if (i === 1) img.onload = () => renderFrame(1);
    images.push(img);
  }

  function renderFrame(index) {
    const img = images[index - 1];
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  // The video "stands still" (fixed) behind the page — frames are driven
  // by how far the whole document has scrolled, so it plays once,
  // gradually, over the full length of the site.
  function currentFrameForScroll() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return 1;

    const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
    return Math.min(totalFrames, Math.max(1, Math.round(progress * (totalFrames - 1)) + 1));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      renderFrame(currentFrameForScroll());
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
