import { useEffect, useRef } from 'react';

// Areia pontilhada em Canvas 2D, para navegadores sem WebGL2 (aceleração de hardware desligada,
// GPU bloqueada). Mesmo vocabulário do Dither: ruído que se move com o vento, pontilhado Bayer 8x8
// em poucos tons de areia, o cursor apaga os grãos e o clique abre uma onda.

const FPS = 30;
const INTRO_MS = 1600;

const BAYER8 = [
  0, 48, 12, 60, 3, 51, 15, 63, 32, 16, 44, 28, 35, 19, 47, 31, 8, 56, 4, 52, 11, 59, 7, 55, 40, 24, 36, 20, 43, 27,
  39, 23, 2, 50, 14, 62, 1, 49, 13, 61, 34, 18, 46, 30, 33, 17, 45, 29, 10, 58, 6, 54, 9, 57, 5, 53, 42, 26, 38, 22,
  41, 25, 37, 21,
].map((n) => n / 64 - 0.5);

const PERM = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  let seed = 7;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  return Uint8Array.from([...p, ...p]);
})();

const lattice = (x: number, y: number) => PERM[PERM[x & 255] + (y & 255)] / 255;

function noise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = lattice(ix, iy);
  const b = lattice(ix + 1, iy);
  const c = lattice(ix, iy + 1);
  const d = lattice(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number) {
  return (noise(x, y) + noise(x * 2.03, y * 2.03) * 0.5 + noise(x * 4.01, y * 4.01) * 0.25) / 1.75;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// `cell`: tamanho do grão em px de CSS. Fundos grandes pedem grãos maiores para manter os 30 quadros.
export function DuneFallback({ palette, cell = 3 }: { palette: string[]; cell?: number }) {
  const CELL = cell;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const colors = palette.map(hexToRgb);
    const levels = colors.length - 1;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cols = 1;
    let rows = 1;
    let image = ctx.createImageData(1, 1);
    let raf = 0;
    let last = 0;
    let start = 0;
    let time = 0;
    let visible = true;
    const pointer = { x: -1, y: -1, presence: 0, inside: false };
    const ripples: { x: number; y: number; age: number }[] = [];

    const resize = () => {
      cols = Math.max(1, Math.ceil(host.clientWidth / CELL));
      rows = Math.max(1, Math.ceil(host.clientHeight / CELL));
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
      draw(1);
    };

    const draw = (intro: number) => {
      const data = image.data;
      const scale = 2.6 / rows; // cerca de 2,6 ondas na altura da duna
      const radius = rows * 0.42;
      const reach = Math.hypot(cols, rows) * 0.5 * intro * 1.2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const u = x * scale;
          const v = y * scale;
          // Vento: o campo desliza e se dobra sobre si mesmo, como a areia nas cristas.
          const q = fbm(u + time * 0.6, v - time * 0.25);
          let f = fbm(u + q * 1.8 + time * 0.15, v + q * 1.8);
          f = Math.min(1, Math.max(0, (f - 0.28) / 0.44));

          if (pointer.presence > 0.01) {
            const d = Math.hypot(x - pointer.x, y - pointer.y) / radius;
            if (d < 1) f -= 0.55 * pointer.presence * (1 - d * d);
          }
          for (const r of ripples) {
            const d = Math.hypot(x - r.x, y - r.y) / rows;
            const life = r.age / 1.6;
            f += 0.5 * Math.exp(-(((d - r.age * 0.9) / 0.07) ** 2)) * (1 - life) * (1 - life);
          }
          if (intro < 1) {
            const show = Math.min(1, Math.max(0, (reach - Math.hypot(x - cols / 2, y - rows / 2)) / (rows * 0.6)));
            f *= show * show * (3 - 2 * show);
          }

          const t = BAYER8[(y & 7) * 8 + (x & 7)];
          const index = Math.min(levels, Math.max(0, Math.round(f * levels + t)));
          const c = colors[index];
          const o = (y * cols + x) * 4;
          data[o] = c[0];
          data[o + 1] = c[1];
          data[o + 2] = c[2];
          data[o + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (!start) start = now;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / FPS;
      if (last && now - last < 1000 / FPS - 2) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      time += dt * 0.05 * 6;
      pointer.presence += ((pointer.inside ? 1 : 0) - pointer.presence) * Math.min(1, dt / 0.15);
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += dt;
        if (ripples[i].age > 1.6) ripples.splice(i, 1);
      }
      draw(Math.min(1, (now - start) / INTRO_MS));
      raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf && !reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const locate = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      pointer.x = (event.clientX - box.left) / CELL;
      pointer.y = (event.clientY - box.top) / CELL;
      pointer.inside =
        event.pointerType !== 'touch' &&
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
    };
    const onDown = (event: PointerEvent) => {
      locate(event);
      const box = host.getBoundingClientRect();
      if (reduce || event.clientY < box.top || event.clientY > box.bottom) return;
      ripples.push({ x: pointer.x, y: pointer.y, age: 0 });
      if (ripples.length > 4) ripples.shift();
    };
    const onVisibility = () => {
      last = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      last = 0;
      wake();
    });
    intersection.observe(host);
    window.addEventListener('pointermove', locate, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    wake();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', locate);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [palette, cell]);

  return <canvas ref={canvasRef} className="dune-fallback" aria-hidden="true" />;
}
