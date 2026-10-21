console.log("JavaScript carregado!");

const canvas = document.createElement("canvas");
canvas.id = "particulas-fundo";
canvas.setAttribute("aria-hidden", "true");

document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

function ajustarCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = "100%";
  canvas.style.height = "100%";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

const particulas = Array.from({ length: 75 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  raio: Math.random() * 2 + 0.5,
  velocidade: Math.random() * 0.35 + 0.1,
  opacidade: Math.random() * 0.5 + 0.2
}));

function animar() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const p of particulas) {
    p.y -= p.velocidade;

    if (p.y < -5) {
      p.y = window.innerHeight + 5;
      p.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190, 153, 80, ${p.opacidade})`;
    ctx.fill();
  }

  requestAnimationFrame(animar);
}

animar();
