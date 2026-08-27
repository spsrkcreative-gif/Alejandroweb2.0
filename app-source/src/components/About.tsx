import { Reveal } from './Reveal';

export function About() {
  return (
    <section className="about alt-bg" id="sobre-mi">
      <div className="wrap">
        <div>
          <Reveal>
            <p className="eyebrow">Sobre mí</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.4vw,2.6rem)', maxWidth: '16ch' }}>
              Hola, soy Alejandro.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={2} className="about-copy">
          <p>
            Soy un profesional en formación en <strong>Gerencia de Negocios</strong> y con
            formación en <strong>Marketing Digital</strong> en la Universidad Tecnológica de
            Honduras (UTH). Mi enfoque combina marketing, creatividad, estrategia y tecnología —
            no me defino solo como diseñador ni solo como Community Manager, sino como alguien que
            conecta esas piezas para construir marcas completas.
          </p>
          <p>
            Llegué aquí gestionando redes sociales, catálogos y ventas de negocios reales, y de
            ahí entendí que una marca sin identidad clara pierde ventas, no solo estética. Hoy
            lidero el desarrollo de marca de <strong>La Chef</strong> y he construido identidades
            visuales para proyectos como Asimet, Fullbody, Taxi Center y Spark Creative.
          </p>
          <div className="about-blocks">
            <div className="about-block">
              <span className="ab-num">01</span>
              <h4>Marketing</h4>
              <p>Estrategia y comunicación orientadas a resultados reales de negocio.</p>
            </div>
            <div className="about-block">
              <span className="ab-num">02</span>
              <h4>Creatividad</h4>
              <p>Branding y contenido que le dan forma visual a una idea.</p>
            </div>
            <div className="about-block">
              <span className="ab-num">03</span>
              <h4>Tecnología</h4>
              <p>IA, herramientas digitales y análisis aplicados al proceso creativo.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
