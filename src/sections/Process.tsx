import { steps } from '../content';

export function Process() {
  return (
    <section className="section process" id="processo" aria-labelledby="process-title">
      <div className="shell">
        <div className="section-head">
          <h2 id="process-title" className="display section-title">
            quatro etapas, sem surpresas no caminho.
          </h2>
          <p className="section-lead">
            Escopo, prazo e valor por escrito antes de começar. Depois, entregas curtas que você valida.
          </p>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-mark" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
