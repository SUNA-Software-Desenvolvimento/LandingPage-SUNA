import { useState } from 'react';
import { Icon } from '../components/Icon';
import { contact, whatsappLink } from '../content';

function buildMessage(name: string, company: string, need: string) {
  const parts = ['Olá, SUNA!'];
  if (name) parts.push(`Meu nome é ${name}${company ? `, da ${company}` : ''}.`);
  else if (company) parts.push(`Falo em nome da ${company}.`);
  parts.push(need || 'Vim pelo site e quero conversar sobre um projeto.');
  return parts.join(' ');
}

export function Contact() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [need, setNeed] = useState('');
  const link = whatsappLink(buildMessage(name.trim(), company.trim(), need.trim()));

  return (
    <section className="section contact" id="contato" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <h2 id="contact-title" className="display contact-title">
            vamos conversar sobre o seu projeto?
          </h2>
          <p className="section-lead">
            Sem compromisso e sem linguagem técnica. Explique a situação do seu jeito e voltamos com um caminho
            possível.
          </p>
          <dl className="contact-channels">
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={whatsappLink('Olá, SUNA!')}>{contact.whatsappDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={contact.instagramUrl}>{contact.instagramHandle}</a>
              </dd>
            </div>
          </dl>
        </div>
        <form className="composer" onSubmit={(event) => event.preventDefault()} aria-labelledby="composer-title">
          <h3 id="composer-title">Monte sua mensagem</h3>
          <p>Preencha e ela abre pronta no WhatsApp da SUNA.</p>
          <label htmlFor="composer-name">Seu nome</label>
          <input
            id="composer-name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como podemos te chamar?"
          />
          <label htmlFor="composer-company">Empresa ou instituição</label>
          <input
            id="composer-company"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Opcional"
          />
          <label htmlFor="composer-need">O que você precisa?</label>
          <textarea
            id="composer-need"
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            placeholder="Ex.: hoje controlamos tudo em planilha e queremos um sistema."
            rows={4}
          />
          <a className="button button-stone composer-send" href={link} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={20} />
            Abrir no WhatsApp
          </a>
        </form>
      </div>
    </section>
  );
}
