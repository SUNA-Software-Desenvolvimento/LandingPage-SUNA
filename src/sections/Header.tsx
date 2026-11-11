import { useEffect, useState } from 'react';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
import { defaultMessage, nav, whatsappLink } from '../content';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="shell header-bar">
        <a className="header-logo" href="#inicio" aria-label="SUNA, voltar ao início">
          <Brand variant="wordmark" decorative />
        </a>
        <nav className="header-nav" aria-label="Principal">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="button button-stone header-cta" href={whatsappLink(defaultMessage)}>
          <Icon name="whatsapp" size={20} />
          <span>Conversar</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} />
          <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </div>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        <ul className="shell">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a className="button button-stone" href={whatsappLink(defaultMessage)}>
              <Icon name="whatsapp" size={20} />
              Conversar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
