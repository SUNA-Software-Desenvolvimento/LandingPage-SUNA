import { useMemo } from 'react';
import type { Shape } from '../components/garden';
import { rakedPaths } from '../components/garden';
import { reasons } from '../content';

const W = 1000;
const H = 340;
// Sete pedras em três grupos, como num jardim de pedras. Cada uma é uma pessoa da equipe.
const STONES = [
  { cx: 170, cy: 150, rx: 62, ry: 44, rot: -8, ember: true },
  { cx: 262, cy: 214, rx: 30, ry: 22, rot: 12 },
  { cx: 108, cy: 248, rx: 22, ry: 17, rot: -4 },
  { cx: 520, cy: 118, rx: 48, ry: 35, rot: 6 },
  { cx: 604, cy: 178, rx: 25, ry: 19, rot: -14 },
  { cx: 832, cy: 214, rx: 58, ry: 41, rot: 10 },
  { cx: 902, cy: 120, rx: 24, ry: 19, rot: -6 },
];

export function Team() {
  const paths = useMemo(() => {
    const shapes: Shape[] = STONES.map((s) => ({ cx: s.cx, cy: s.cy, rx: s.rx + 8, ry: s.ry + 8, reach: 2.2 }));
    return rakedPaths(W, H, shapes, 12, 5);
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
        <figure className="stone-garden">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Jardim de areia com sete pedras, uma para cada pessoa da equipe">
            <defs>
              <filter id="stone-shadow" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#442D1D" floodOpacity="0.28" />
              </filter>
            </defs>
            {paths.map((d, i) => (
              <g key={i}>
                <path d={d} className="rake-groove" />
                <path d={d} className="rake-crest" transform="translate(0 1.6)" />
              </g>
            ))}
            {STONES.map((s, i) => (
              <ellipse
                key={i}
                cx={s.cx}
                cy={s.cy}
                rx={s.rx}
                ry={s.ry}
                transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}
                className={s.ember ? 'stone stone-ember' : 'stone'}
                filter="url(#stone-shadow)"
              />
            ))}
          </svg>
        </figure>
        <ul className="reasons">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
