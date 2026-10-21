import { useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { Reveal } from './Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

const BADGES = [
  'USAID',
  'UTH AVANZA',
  'TechnoServe',
  'Creando Mi Futuro Aquí',
  '2023',
  'Siguatepeque → SPS',
];

const METRICS = [
  { k: 'Validado por', v: 'USAID' },
  { k: 'Finalista', v: 'Top Nacional' },
  { k: 'Valor clave', v: 'Resiliencia' },
];

export function Achievement() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const onMouseMove = (e: ReactMouseEvent) => {
    if (reducedMotion || !ref.current) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${(x * 4).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <section id="logro" className="achievement">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Logro</p>
          <h2>Reactiva 2: del aprendizaje al capital semilla</h2>
        </Reveal>

        <Reveal as="article" className="ach-card">
          <div
            className="ach-media project-media"
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <img
              src={asset('lab/reactiva2.jpg')}
              alt="Alejandro sostiene el cheque gigante de Ganador Reactiva 2 por $1,000.00, con los logos de USAID, UTH, TechnoServe y UTH Avanza"
              loading="lazy"
            />
          </div>

          <div className="ach-copy">
            <span className="project-label">Logro · Ganador Reactiva 2</span>
            <h3>Ganador Reactiva 2 — $1,000 Seed Capital</h3>
            <div className="project-meta">
              {BADGES.map((b) => (
                <span className="pill" key={b}>
                  {b}
                </span>
              ))}
            </div>
            <p className="ach-story">
              Entré a Reactiva 2 en mi primer año en Siguatepeque solo por las capacitaciones. Era
              grupal pero terminé solo. Me quedé por el aprendizaje y gané $1,000 de capital semilla
              entre cientos de emprendedores. Premiación en UTH San Pedro Sula.
            </p>
            <div className="ach-metrics">
              {METRICS.map((m) => (
                <div className="ach-metric" key={m.v}>
                  <span>{m.k}</span>
                  <b>{m.v}</b>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
