import { Reveal } from './Reveal';

const STEPS = [
  { num: '01', title: 'Descubro', text: 'Entiendo el problema real detrás de la marca.' },
  { num: '02', title: 'Analizo', text: 'Investigo el mercado, la audiencia y el contexto.' },
  { num: '03', title: 'Creo', text: 'Desarrollo conceptos y soluciones visuales.' },
  { num: '04', title: 'Ejecuto', text: 'Convierto la estrategia en piezas reales.' },
  { num: '05', title: 'Mido', text: 'Analizo resultados y oportunidades de mejora.' },
];

export function Process() {
  return (
    <section id="proceso">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Mi proceso</p>
          <h2>Mi forma de trabajar</h2>
          <p>Cinco pasos claros, del primer diagnóstico a la medición de resultados.</p>
        </Reveal>
        <Reveal className="process-track">
          {STEPS.map((s) => (
            <div className="process-item" key={s.num}>
              <div className="pnum">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
