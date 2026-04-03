document.addEventListener("DOMContentLoaded", () => {
  const cube = document.getElementById("holoCube");
  if (!cube) return;

  let currentX = -30;
  let currentY = 35;
  let currentZ = 0;

  let targetX = -30;
  let targetY = 35;

  let scrollBoostX = 0;
  let scrollBoostY = 0;
  let lastScrollY = window.scrollY;

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    targetY = x * 70;
    targetX = -y * 70;
  });

  window.addEventListener("scroll", () => {
    const now = window.scrollY;
    const delta = now - lastScrollY;
    lastScrollY = now;

    scrollBoostX += delta * 0.15;
    scrollBoostY += delta * 0.10;
    currentZ += delta * 0.03;

    scrollBoostX = Math.max(-25, Math.min(25, scrollBoostX));
    scrollBoostY = Math.max(-25, Math.min(25, scrollBoostY));
    currentZ = Math.max(-12, Math.min(12, currentZ));
  });

  function animate() {
    scrollBoostX *= 0.9;
    scrollBoostY *= 0.9;
    currentZ *= 0.9;

    const finalX = targetX + scrollBoostX;
    const finalY = targetY + scrollBoostY;

    currentX += (finalX - currentX) * 0.08;
    currentY += (finalY - currentY) * 0.08;

    cube.style.transform = `
      rotateX(${currentX}deg)
      rotateY(${currentY}deg)
      rotateZ(${currentZ}deg)
    `;

    requestAnimationFrame(animate);
  }

  animate();
});