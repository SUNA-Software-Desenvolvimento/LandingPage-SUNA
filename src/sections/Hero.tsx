import { useMemo, useRef, useState } from 'react';
import Dither from '../components/Dither';
import { DuneFallback } from '../components/DuneFallback';
import { SandGarden } from '../components/SandGarden';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
import { defaultMessage, whatsappLink } from '../content';

// Grãos do fundo, do mais escuro ao mais claro: tons claros de areia, próximos o bastante para o texto
// em Espresso ficar legível sobre qualquer um deles (contraste acima de 7:1), sem pontos coloridos.
const SKY_GRAINS = ['#d6ba8b', '#e2c99d', '#ebd7b2', '#f4e6cb'];

// Topo: areia pontilhada viva em todo o fundo (Dither): o vento move os grãos e o cursor os apaga.
// Embaixo, uma duna de areia rastelada: as linhas contornam a pedra da marca, pousada na crista,
// e se abrem ao redor do cursor. "Moldada pelo vento, mas permanece."
export function Hero() {
  const stoneRef = useRef<HTMLDivElement>(null);
  const stones = useMemo(() => [{ ref: stoneRef, kind: 'stone' as const, pad: 18 }], []);
  // Sem WebGL2 (ou só por software, com a GPU desligada), o fundo passa para o modo Canvas 2D.
  const [webgl, setWebgl] = useState(true);

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden="true">
        {webgl ? (
          <Dither
            waveColor="#f4e6cb"
            backgroundColor="#d6ba8b"
            ditherMode="bayer"
            colorNum={4}
            pixelSize={2}
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            mouseEffect="erase"
            mouseRadius={0.3}
            palette={SKY_GRAINS}
            scale={1}
            contrast={1}
            brightness={0}
            mouseStrength={1}
            trail={0.5}
            enableMouseInteraction
            clickRipple
            intro
            disableAnimation={false}
            onUnsupported={() => setWebgl(false)}
          />
        ) : (
          <DuneFallback palette={SKY_GRAINS} cell={4} />
        )}
      </div>
      <div className="hero-dune" aria-hidden="true">
        <SandGarden stones={stones} glideY={0.72} />
      </div>
      <div className="shell hero-layout">
        <div className="hero-copy">
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
    </section>
  );
}
