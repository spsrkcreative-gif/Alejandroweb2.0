import { Reveal } from './Reveal';

const FACETS = ['Estratega', 'Creativo', 'Analista', 'Emprendedor', 'Explorador de IA', 'Músico'];

export function MoreThanMarketing() {
  return (
    <section className="alt-bg">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Más que marketing</p>
          <h2>Distintas facetas, una misma forma de pensar</h2>
        </Reveal>
        <Reveal className="facets-grid">
          {FACETS.map((f) => (
            <span className="facet" key={f}>
              {f}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
