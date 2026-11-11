import { createRef, useEffect, useMemo, useRef, type CSSProperties, type RefObject } from 'react';
import { SandGarden } from '../components/SandGarden';
import { reasons } from '../content';

// Sete pedras em três grupos, como num jardim de pedras. Cada uma é uma pessoa da equipe.
// Coordenadas num jardim de 1000 x 340; o CSS converte em porcentagens.
const STONES = [
  { cx: 170, cy: 150, rx: 62, ry: 44, rot: -8, ember: true, shape: '54% 46% 52% 48% / 58% 50% 50% 42%' },
  { cx: 262, cy: 214, rx: 30, ry: 22, rot: 12, shape: '46% 54% 44% 56% / 50% 58% 42% 50%' },
  { cx: 108, cy: 248, rx: 22, ry: 17, rot: -4, shape: '58% 42% 50% 50% / 46% 54% 46% 54%' },
  { cx: 520, cy: 118, rx: 48, ry: 35, rot: 6, shape: '48% 52% 58% 42% / 54% 44% 56% 46%' },
  { cx: 604, cy: 178, rx: 25, ry: 19, rot: -14, shape: '52% 48% 46% 54% / 44% 56% 50% 50%' },
  { cx: 832, cy: 214, rx: 58, ry: 41, rot: 10, shape: '50% 50% 56% 44% / 56% 46% 54% 44%' },
  { cx: 902, cy: 120, rx: 24, ry: 19, rot: -6, shape: '44% 56% 52% 48% / 52% 48% 58% 42%' },
];

export function Team() {
  const gardenRef = useRef<HTMLElement>(null);
  const stoneRefs = useMemo(() => STONES.map(() => createRef<HTMLSpanElement>()), []);
  const shapes = useMemo(
    () => stoneRefs.map((ref) => ({ ref: ref as RefObject<HTMLElement>, kind: 'stone' as const, pad: 10 })),
    [stoneRefs],
  );

  // O jardim começa visível. Só quando ainda está abaixo da dobra as pedras esperam fora da areia
  // e assentam, uma a uma, quando a seção aparece.
  useEffect(() => {
    const garden = gardenRef.current;
    const section = garden?.closest('.team');
    if (!garden || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (garden.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    section.classList.add('is-waiting');
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        section.classList.replace('is-waiting', 'is-settling');
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(garden);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section team" id="equipe" aria-labelledby="team-title">
      <div className="shell">
        <div className="section-head">
          <h2 id="team-title" className="display section-title">
            sete pessoas, uma equipe inteira.
          </h2>
          <p className="section-lead">
            Cada pedra deste jardim é alguém da SUNA. Juntas, cobrem todas as áreas de um projeto de software.
          </p>
        </div>
        <figure
          className="stone-garden"
          ref={gardenRef}
          role="img"
          aria-label="Jardim de areia com sete pedras, uma para cada pessoa da equipe"
        >
          <SandGarden stones={shapes} startOnView glideY={0.5} />
          {STONES.map((s, i) => (
            <span
              key={i}
              ref={stoneRefs[i]}
              className={s.ember ? 'garden-stone is-ember' : 'garden-stone'}
              style={
                {
                  left: `${((s.cx - s.rx) / 1000) * 100}%`,
                  top: `${((s.cy - s.ry) / 340) * 100}%`,
                  width: `${((s.rx * 2) / 1000) * 100}%`,
                  aspectRatio: `${s.rx} / ${s.ry}`,
                  borderRadius: s.shape,
                  '--rot': `${s.rot}deg`,
                  '--i': i,
                } as CSSProperties
              }
            />
          ))}
        </figure>
        <ul className="reasons">
          {reasons.map((reason, i) => (
            <li key={reason.title} style={{ '--i': i } as CSSProperties}>
              <span className="reason-mark" aria-hidden="true" />
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
