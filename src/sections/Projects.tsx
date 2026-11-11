import { useMemo, useRef } from 'react';
import { Icon } from '../components/Icon';
import { rakedPaths } from '../components/garden';
import { projects } from '../content';

const PW = 380;
const PH = 220;
// Posição da pedra em cada card, para que os espaços de imagem não fiquem idênticos.
const SPOTS = [
  { cx: 250, cy: 96, rx: 44, ry: 32, rot: -8 },
  { cx: 120, cy: 120, rx: 38, ry: 28, rot: 10 },
  { cx: 290, cy: 140, rx: 34, ry: 26, rot: -14 },
  { cx: 170, cy: 82, rx: 46, ry: 33, rot: 6 },
  { cx: 230, cy: 128, rx: 40, ry: 30, rot: -4 },
];

// Espaço reservado para a imagem do projeto: areia rastelada com uma pedra.
function ImageSlot({ index }: { index: number }) {
  const spot = SPOTS[index % SPOTS.length];
  const paths = useMemo(
    () => rakedPaths(PW, PH, [{ cx: spot.cx, cy: spot.cy, rx: spot.rx + 6, ry: spot.ry + 6, reach: 2.3 }], 11, 5),
    [spot],
  );
  return (
    <svg className="slot-art" viewBox={`0 0 ${PW} ${PH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} className="rake-groove" />
          <path d={d} className="rake-crest" transform="translate(0 1.6)" />
        </g>
      ))}
      <ellipse
        cx={spot.cx}
        cy={spot.cy}
        rx={spot.rx}
        ry={spot.ry}
        transform={`rotate(${spot.rot} ${spot.cx} ${spot.cy})`}
        className={index % 3 === 1 ? 'stone stone-ember' : 'stone'}
      />
    </svg>
  );
}

export function Projects() {
  const railRef = useRef<HTMLUListElement>(null);
  const hasExamples = projects.some((project) => project.placeholder);

  const move = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector('li');
    if (!rail || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section className="section projects" id="projetos" aria-labelledby="projects-title">
      <div className="shell projects-head">
        <div>
          <h2 id="projects-title" className="display section-title">
            problemas reais, sistemas sob medida.
          </h2>
          <p className="section-lead">
            {hasExamples
              ? 'Os tipos de sistema que a SUNA constrói. Os projetos entregues entram aqui, com o resultado de cada um.'
              : 'Projetos entregues pela SUNA. Cada um começou com uma conversa sobre a rotina do cliente.'}
          </p>
        </div>
        <div className="rail-controls">
          <button className="round-button" type="button" onClick={() => move(-1)} aria-label="Projeto anterior">
            <Icon name="arrow-left" />
          </button>
          <button className="round-button" type="button" onClick={() => move(1)} aria-label="Próximo projeto">
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <ul className="rail" ref={railRef} tabIndex={0} aria-label="Projetos">
        {projects.map((project, index) => (
          <li className="project" key={index}>
            <div className="project-image">
              {project.image ? (
                <img src={project.image} alt={project.imageAlt ?? ''} loading="lazy" />
              ) : (
                <>
                  <ImageSlot index={index} />
                  <span className="slot-label">imagem do projeto</span>
                </>
              )}
              <span className="project-tag">
                {project.category}
                {project.placeholder ? ' · exemplo' : ''}
              </span>
            </div>
            <div className="project-body">
              <h3 className="project-name">{project.name}</h3>
              <dl className="project-facts">
                <div>
                  <dt>Desafio</dt>
                  <dd>{project.challenge}</dd>
                </div>
                <div>
                  <dt>Resultado</dt>
                  <dd>{project.result}</dd>
                </div>
              </dl>
              <ul className="project-stack" aria-label="Tecnologias">
                {project.stack.map((tech, n) => (
                  <li key={n}>{tech}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
