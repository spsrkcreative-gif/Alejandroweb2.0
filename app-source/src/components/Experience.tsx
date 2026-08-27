import { Reveal } from './Reveal';

interface TimelineItem {
  year: string;
  role: string;
  org: string;
  text: string;
  current?: boolean;
}

const ITEMS: TimelineItem[] = [
  {
    year: '2026 · Actualidad',
    role: 'Desarrollo de Marca y Ventas',
    org: 'La Chef',
    text: 'Negociación comercial, gestión de distribuidores y estrategia de posicionamiento de marca.',
    current: true,
  },
  {
    year: '2025 · 10 meses',
    role: 'Desarrollo de Marca',
    org: 'Tienda Maranatha',
    text: 'Administración de catálogo web (WordPress) y campañas promocionales.',
  },
  {
    year: '2023 · 7 meses',
    role: 'Community Manager',
    org: 'Tiendas Supoma',
    text: 'Gestión de redes sociales, atención al cliente y campañas digitales.',
  },
  {
    year: '2021 · 12 meses',
    role: 'Profesor de Música',
    org: 'CDI',
    text: 'Planificación e impartición de clases de música y actividades educativas.',
  },
  {
    year: '2018 · 2020',
    role: 'Community Manager y Vendedor',
    org: 'Golosinas Indira',
    text: 'Administración de redes sociales y apoyo comercial en la operación diaria.',
  },
];

export function Experience() {
  return (
    <section id="experiencia">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Experiencia</p>
          <h2>Trayectoria profesional</h2>
        </Reveal>
        <Reveal className="timeline">
          {ITEMS.map((item) => (
            <div className={`t-item ${item.current ? 'current' : ''}`} key={item.role + item.org}>
              <div className="t-dot"></div>
              <span className="t-year">{item.year}</span>
              <div className="t-role">{item.role}</div>
              <span className="t-org">{item.org}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
