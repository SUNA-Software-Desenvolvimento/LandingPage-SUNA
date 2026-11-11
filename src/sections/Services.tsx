import { Icon } from '../components/Icon';
import { Rake } from '../components/Rake';
import { services } from '../content';

export function Services() {
  return (
    <section className="section services" id="servicos" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-head">
          <h2 id="services-title" className="display section-title">
            do sistema à infraestrutura, tudo com a mesma equipe.
          </h2>
          <p className="section-lead">
            Quatro frentes que se conversam. Quem desenvolve é quem publica, monitora e mantém o sistema no ar.
          </p>
        </div>
        <ul className="service-list">
          {services.map((service) => (
            <li key={service.title} className="service">
              <span className="service-icon">
                <Icon name={service.icon} size={30} />
              </span>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-body">
                <p>{service.text}</p>
                <p className="service-examples">{service.examples}</p>
              </div>
              <Rake className="service-rake" height={30} spacing={10} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
