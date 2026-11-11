import { useMemo, useRef } from 'react';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
import { SandGarden } from '../components/SandGarden';
import { defaultMessage, whatsappLink } from '../content';

export function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);
  const stoneRef = useRef<HTMLDivElement>(null);
  const stones = useMemo(
    () => [
      { ref: copyRef, kind: 'block' as const, pad: 18 },
      { ref: stoneRef, kind: 'stone' as const, pad: 22 },
    ],
    [],
  );

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <SandGarden stones={stones} />
      <div className="shell hero-layout">
        <div className="hero-copy" ref={copyRef}>
          <h1 id="hero-title" className="display hero-title">
            software que se molda ao seu negócio.
          </h1>
          <p className="hero-lead">
            Sistemas, plataformas e soluções de dados sob medida para empresas, escolas e órgãos públicos. Uma equipe
            de sete pessoas, do primeiro contato ao suporte depois da entrega.
          </p>
          <div className="hero-actions">
            <a className="button button-ember" href={whatsappLink(defaultMessage)}>
              <Icon name="whatsapp" size={20} />
              Conversar no WhatsApp
            </a>
            <a className="text-link" href="#projetos">
              Ver projetos
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
        <div className="hero-stone" ref={stoneRef}>
          <Brand variant="symbol" decorative />
        </div>
      </div>
      <p className="hero-hint" aria-hidden="true">
        passe o cursor pela areia
      </p>
    </section>
  );
}
