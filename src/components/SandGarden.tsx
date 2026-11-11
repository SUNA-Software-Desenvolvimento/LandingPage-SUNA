import { useEffect, useRef, type RefObject } from 'react';
import { displace, type Shape } from './garden';

// `block` contorna um bloco de texto (retângulo arredondado); `stone` contorna uma pedra (elipse).
type Stone = { ref: RefObject<HTMLElement>; kind: 'stone' | 'block'; pad: number };

const SPACING = 15;
const STEP = 4;
const POINTER_RADIUS = 64;
const INTRO_MS = 1600;
const GLIDE_MS = 2600;

// Canvas de areia rastelada. As linhas contornam os elementos passados em `stones`
// e se abrem ao redor do ponteiro, como areia ao redor de uma pedra.
// Em telas de toque, uma pedra atravessa a areia uma vez depois da abertura.
export function SandGarden({ stones }: { stones: Stone[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none)').matches;
    const styles = getComputedStyle(host);
    const groove = styles.getPropertyValue('--rake').trim() || '#B78B5A';
    const crest = styles.getPropertyValue('--sand-light').trim() || '#F9EED9';

    let width = 0;
    let height = 0;
    let shapes: Shape[] = [];
    let raf = 0;
    let intro = reduce ? 1 : 0;
    let start = 0;
    let glide = touch && !reduce ? 0 : 1;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, r: 0, target: 0 };

    const measure = () => {
      const box = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const narrow = box.width < 860;
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      shapes = [];
      for (const stone of stones) {
        const el = stone.ref.current;
        if (!el) continue;
        const b = el.getBoundingClientRect();
        const cx = (b.left + b.right) / 2 - box.left;
        const cy = (b.top + b.bottom) / 2 - box.top;
        const rx = b.width / 2 + stone.pad;
        const ry = b.height / 2 + stone.pad;
        if (stone.kind === 'block') {
          shapes.push({ cx, cy, rx, ry, power: narrow ? 6 : 4, reach: narrow ? 1.12 : 1.3 });
        } else {
          shapes.push({ cx, cy, rx, ry, reach: narrow ? 1.7 : 2.1 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const all: Shape[] =
        pointer.r > 1 ? [...shapes, { cx: pointer.x, cy: pointer.y, rx: pointer.r, ry: pointer.r, reach: 2.4 }] : shapes;
      const eased = 1 - Math.pow(1 - intro, 4);
      const lines = Math.ceil(height / SPACING);
      for (let i = 0; i < lines; i++) {
        const y = SPACING / 2 + i * SPACING;
        const delay = (i / lines) * 0.35;
        const progress = Math.min(1, Math.max(0, (eased - delay) / (1 - delay)));
        if (progress <= 0) continue;
        const end = -STEP + (width + STEP * 2) * progress;
        ctx.beginPath();
        for (let x = -STEP; x <= end; x += STEP) {
          const [px, py] = displace(x, y, all);
          if (x === -STEP) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = groove;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.translate(0, 1.8);
        ctx.strokeStyle = crest;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.translate(0, -1.8);
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = 0;
      if (!start) start = now;
      const elapsed = now - start;
      if (intro < 1) intro = Math.min(1, elapsed / INTRO_MS);
      else if (glide < 1) {
        // Pedra que atravessa a areia uma vez, para quem usa o dedo em vez do cursor.
        glide = Math.min(1, (elapsed - INTRO_MS) / GLIDE_MS);
        const t = glide * glide * (3 - 2 * glide);
        pointer.tx = -POINTER_RADIUS + (width + POINTER_RADIUS * 2) * t;
        pointer.ty = height * (0.82 + 0.06 * Math.sin(t * Math.PI * 2));
        if (pointer.r < 1) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
        pointer.target = glide < 1 ? POINTER_RADIUS * 0.8 : 0;
      }
      pointer.r += (pointer.target - pointer.r) * 0.12;
      pointer.x += (pointer.tx - pointer.x) * 0.2;
      pointer.y += (pointer.ty - pointer.y) * 0.2;
      draw();
      const settling =
        Math.abs(pointer.target - pointer.r) > 0.4 || Math.hypot(pointer.tx - pointer.x, pointer.ty - pointer.y) > 0.4;
      if (intro < 1 || glide < 1 || settling) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (reduce || event.pointerType === 'touch') return;
      const box = host.getBoundingClientRect();
      pointer.tx = event.clientX - box.left;
      pointer.ty = event.clientY - box.top;
      if (pointer.r < 1) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.target = POINTER_RADIUS;
      wake();
    };
    const onLeave = () => {
      pointer.target = 0;
      wake();
    };

    const resize = () => {
      measure();
      draw();
      wake();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    stones.forEach((s) => s.ref.current && observer.observe(s.ref.current));
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    document.fonts?.ready.then(resize);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [stones]);

  return <canvas ref={canvasRef} className="sand-canvas" aria-hidden="true" />;
}
