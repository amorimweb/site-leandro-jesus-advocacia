'use client';
import { site } from './config';
import { useEffect, useState } from 'react';

const Arrow = () => <span aria-hidden>↗</span>;

export default function Page() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('seen')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <header>
        <a className="brand" href="#inicio"><b>{site.monogram}</b><span>{site.short}</span></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav" aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? 'Fechar' : 'Menu'}</button>
        <nav id="nav" className={menu ? 'open' : ''} aria-label="Navegação principal">
          <a href="#atuacao" onClick={() => setMenu(false)}>Atuação</a>
          <a href="#escritorio" onClick={() => setMenu(false)}>Sobre</a>
          <a href="#contato" onClick={() => setMenu(false)}>Contato</a>
          <a className="navCta" href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="heroCopy reveal">
          <small>{site.kicker}</small>
          <h1>{site.title}</h1>
          <p>{site.intro}</p>
          <div className="actions">
            <a className="primary" href="#contato">Falar com o advogado <Arrow /></a>
            <a className="textLink" href="#atuacao">Ver atuação</a>
          </div>
        </div>
      </section>

      <section className="manifest reveal">
        <blockquote>&ldquo;{site.quote}&rdquo;</blockquote>
      </section>

      <section className="areas" id="atuacao">
        <div className="sectionHead reveal">
          <span>Áreas de atuação</span>
        </div>
        <div className="plainList">
          {site.areas.map((a, i) => (
            <div className="plainItem reveal" key={a[0]}>
              <span className="plainNum">0{i + 1}</span>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="photoStrip reveal" aria-hidden="true">
        <img src="/office.jpg" alt="" loading="lazy" decoding="async" />
      </div>

      <section className="about" id="escritorio">
        <div className="aboutCopy reveal">
          <span>Sobre</span>
          <h2>Objetividade em<br />cada orientação.</h2>
          <p>{site.about}</p>
          <ul>
            {site.values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contactTitle reveal">
          <span>Contato</span>
          <h2>Vamos conversar?</h2>
          <p>Envie sua demanda para receber orientação sobre os próximos passos.</p>
        </div>
      </section>

      <footer>
        <span>© 2026 {site.short}</span>
        <p>Conteúdo com caráter informativo. Não substitui a análise individual de um advogado.</p>
      </footer>
    </main>
  );
}
