import { Reveal } from './Reveal';

const ITEMS = [
  {
    num: '01',
    title: 'Estrategia',
    text: 'Investigación, planificación y estrategia de marketing antes de diseñar nada.',
  },
  {
    num: '02',
    title: 'Branding',
    text: 'Construcción y desarrollo de identidad de marca, del concepto al sistema visual.',
  },
  {
    num: '03',
    title: 'Contenido',
    text: 'Contenido visual, redes sociales y comunicación digital con consistencia de marca.',
  },
  {
    num: '04',
    title: 'IA & Data',
    text: 'Aplicación de inteligencia artificial y herramientas digitales al proceso creativo.',
  },
];

export function Services() {
  return (
    <section id="servicios">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Lo que hago</p>
          <h2>Cuatro disciplinas, una sola estrategia de marca</h2>
          <p>
            No trabajo por piezas sueltas — cada disciplina se conecta con las demás para que la
            marca hable con una sola voz.
          </p>
        </Reveal>
        <Reveal className="what-grid">
          {ITEMS.map((item) => (
            <div className="what-item" key={item.num}>
              <div className="wnum">{item.num}</div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
