import { pains } from '../content';

export function Problem() {
  return (
    <section className="section problem" aria-labelledby="problem-title">
      <div className="shell problem-layout">
        <div className="problem-intro">
          <h2 id="problem-title" className="display section-title">
            quando o negócio cresce, o improviso começa a custar caro.
          </h2>
          <p className="section-lead">
            Se alguma destas mensagens já chegou no grupo da sua equipe, sua empresa passou do ponto da planilha.
          </p>
        </div>
        <ol className="pain-list">
          {pains.map((pain) => (
            <li key={pain.time} className="pain">
              <p className="bubble">
                {pain.message}
                <span className="bubble-time">{pain.time}</span>
              </p>
              <p className="pain-cost">{pain.cost}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="shell problem-answer">
        A SUNA resolve isso com uma equipe próxima, que <strong>continua aqui depois da entrega</strong>.
      </p>
    </section>
  );
}
