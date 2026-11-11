import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Services } from './sections/Services';
import { Projects } from './sections/Projects';
import { Team } from './sections/Team';
import { Process } from './sections/Process';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problem />
        <Services />
        <Projects />
        <Team />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
