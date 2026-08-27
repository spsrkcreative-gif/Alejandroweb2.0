import { Reveal } from './Reveal';

export function CTAFinal() {
  return (
    <section className="cta-final">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">¿Tienes una idea?</p>
        </Reveal>
        <Reveal delay={1}>
          <h2>
            Hagámosla <span className="acc">crecer.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p>
            Si tienes un proyecto, una marca o una idea que quieres convertir en algo real,
            conversemos.
          </p>
        </Reveal>
        <Reveal delay={3} className="hero-actions">
          <a href="#contacto" className="btn btn-primary">
            Contactar →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Contacto</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.2vw,2.4rem)', maxWidth: '14ch' }}>
            Hablemos de tu proyecto.
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 18, maxWidth: '44ch' }}>
            Respondo por correo o WhatsApp. Cuéntame brevemente tu idea — te contesto lo antes
            posible.
          </p>
        </Reveal>
        <Reveal delay={1} className="contact-links">
          <a className="clink" href="mailto:leandrohnz0114l17@gmail.com">
            <span>
              <span className="k">Correo</span>
              <br />
              <span className="v">leandrohnz0114l17@gmail.com</span>
            </span>
            <span className="arrow">→</span>
          </a>
          <a className="clink" href="https://wa.me/50498490334" target="_blank" rel="noopener">
            <span>
              <span className="k">WhatsApp</span>
              <br />
              <span className="v">+504 9849-0334</span>
            </span>
            <span className="arrow">→</span>
          </a>
          <div className="clink" style={{ cursor: 'default' }}>
            <span>
              <span className="k">Ubicación</span>
              <br />
              <span className="v">Siguatepeque, Honduras</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
