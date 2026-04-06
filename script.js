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

    targetY = x * 120;
    targetX = -y * 120;
  });

  window.addEventListener("scroll", () => {
    const now = window.scrollY;
    const delta = now - lastScrollY;
    lastScrollY = now;

    scrollBoostX += delta * 0.35;
    scrollBoostY += delta * 0.35;
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

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderCube = document.getElementById("loaderCube");
  const loaderWord = document.getElementById("loaderWord");

  setTimeout(() => {
    loaderCube.classList.add("break-apart");
    loaderWord.classList.add("drop");
  }, 2550);

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 4200);

  setTimeout(() => {
    loader.style.display = "none";
  }, 4800);
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderCube = document.getElementById("loaderCube");
  const loaderWord = document.getElementById("loaderWord");
  const loaderProgressFill = document.getElementById("loaderProgressFill");

  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;
    loaderProgressFill.style.width = progress + "%";

    if (progress === 100) {
      clearInterval(progressInterval);
    }
  }, 60);

  setTimeout(() => {
    loaderCube.classList.add("break-apart");
    loaderWord.classList.add("drop");
  }, 4500);

  setTimeout(() => {
    loaderProgressFill.style.width = "100%";
  }, 4800);

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 5850);

  setTimeout(() => {
    loader.style.display = "none";
  }, 6800);
});