import { Brand } from '../components/Brand';
import { contact, nav, whatsappLink } from '../content';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-layout">
        <div className="footer-brand">
          <Brand variant="full" label="SUNA Software e Desenvolvimento" />
          <p>software que se molda. e permanece.</p>
        </div>
        <nav aria-label="Rodapé">
          <h2>Navegação</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Contato</h2>
          <ul>
            <li>
              <a href={whatsappLink('Olá, SUNA!')}>WhatsApp {contact.whatsappDisplay}</a>
            </li>
            <li>
              <a href={contact.instagramUrl}>Instagram {contact.instagramHandle}</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="shell footer-legal">© {new Date().getFullYear()} SUNA Software e Desenvolvimento</p>
    </footer>
  );
}
