import { Reveal } from './Reveal';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

// Los planes son confidenciales (uso exclusivo del cliente): se solicitan por WhatsApp
const wa = (doc: string) =>
  `https://wa.me/50498490334?text=${encodeURIComponent(`Hola Alejandro, me gustaría ver el ${doc}.`)}`;

interface Cta {
  label: string;
  href: string;
  primary?: boolean;
}

interface CaseStudy {
  slug: string;
  theme: 'cma' | 'montessori' | 'cafe';
  label: string;
  title: string;
  tags: string[];
  deliverables: string[];
  insight: string;
  extras?: string[];
  ctas: Cta[];
}

const CASES: CaseStudy[] = [
  {
    slug: 'cma',
    theme: 'cma',
    label: 'Caso de estudio · Salud privada',
    title: 'Centro Médico Los Ángeles CMA',
    tags: ['Salud Privada', '20 Especialidades', 'Siguatepeque'],
    deliverables: [
      'Plan de Marketing Digital de 17 páginas',
      'FODA digital y Buyer Personas',
      'Embudo omnicanal: Google Maps → WhatsApp Business',
      'Calendario de contenidos de 20 semanas',
      'Proyección de KPIs a 90 días',
    ],
    extras: [
      'Brochure de Alianzas: 25% Lab. Bueso Arias · 20% Hospitalización y Cirugías',
      'Brochure Institucional: Visión, Misión y Valores',
    ],
    insight:
      'CMA tiene 4.7 estrellas y la oferta médica más completa pero era invisible digitalmente. Proyectamos 50-60 leads WhatsApp/mes.',
    ctas: [
      { label: 'Ver Plan Completo', href: wa('Plan de Marketing Digital de CMA'), primary: true },
      { label: 'Ver Brochure · Alianzas', href: 'docs/cma-brochure-alianzas.pdf' },
      { label: 'Ver Brochure · Institucional', href: 'docs/cma-brochure-institucional.pdf' },
    ],
  },
  {
    slug: 'del-sol',
    theme: 'montessori',
    label: 'Caso de estudio · Educación privada',
    title: 'Del Sol Montessori Bilingual School',
    tags: ['Educación Privada', 'Método Montessori', 'Pre-básica a Bachillerato'],
    deliverables: [
      'Plan de Marketing Digital de 17 páginas',
      'Estrategia Google Maps + Facebook + Instagram + TikTok',
      'Embudo a WhatsApp Business',
    ],
    insight:
      'Único método Montessori bilingüe en región central, con 100% recomendación pero sin web funcional. Oportunidad de dominar SEO local.',
    ctas: [{ label: 'Ver Plan Completo', href: wa('Plan de Marketing Digital de Del Sol Montessori'), primary: true }],
  },
  {
    slug: 'cafetero',
    theme: 'cafe',
    label: 'Propuesta estratégica · Café',
    title: 'Cafetero',
    tags: ['Café / Tercer Espacio', 'Siguatepeque'],
    deliverables: [
      'Propuesta Estratégica: Inbound 70% / Outbound 30%',
      'Pilares: Experiencia, Comunidad, Producto, Promos',
      'Calendario de contenido semanal',
    ],
    insight: 'Posicionar de vender café a vender experiencia para estudiantes y freelancers.',
    ctas: [{ label: 'Ver Plan Completo', href: wa('Propuesta Estratégica de Cafetero'), primary: true }],
  },
];

function CardMedia({ c }: { c: CaseStudy }) {
  if (c.theme === 'cma') {
    return (
      <div className="case-media case-fan" aria-hidden={false}>
        <img
          className="fan-a"
          src={asset('lab/cma-alianzas-2.jpg')}
          alt="Brochure de Alianzas de CMA: beneficios complementarios con 25% en Laboratorio Bueso Arias y 20% en Hospitalización y Cirugías"
          loading="lazy"
        />
        <img
          className="fan-c"
          src={asset('lab/cma-inst-2.jpg')}
          alt="Brochure Institucional de CMA: misión, visión y valores"
          loading="lazy"
        />
        <img
          className="fan-b"
          src={asset('lab/cma-inst-1.jpg')}
          alt="Portada del brochure institucional del Centro Médico Los Ángeles"
          loading="lazy"
        />
      </div>
    );
  }
  const src = c.theme === 'montessori' ? 'lab/delsol-plan.jpg' : 'lab/cafetero-plan.jpg';
  const alt =
    c.theme === 'montessori'
      ? 'Portada del Plan de Marketing Digital de Del Sol Montessori'
      : 'Portada de la Propuesta Estratégica de Marketing Digital para Cafetero';
  return (
    <div className="case-media case-doc">
      <img src={asset(src)} alt={alt} loading="lazy" />
    </div>
  );
}

export function Agency() {
  return (
    <section id="agencia" className="agency">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Agencia · @sparkcreativemkt</p>
          <h2>Spark Creative Mkt</h2>
          <p>
            Agencia de Marketing Digital |{' '}
            <a
              href="https://sparkcreativemkt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              sparkcreativemkt.com
            </a>{' '}
            | Siguatepeque, Honduras
          </p>
        </Reveal>

        <div className="case-grid">
          {CASES.map((c, i) => (
            <Reveal
              as="article"
              key={c.slug}
              className={`case-card theme-${c.theme}`}
              delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}
            >
              <CardMedia c={c} />
              <div className="case-body">
                <span className="project-label">{c.label}</span>
                <h3>{c.title}</h3>
                <div className="project-meta">
                  {c.tags.map((t) => (
                    <span className="pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-block">
                  <div className="k">Entregables</div>
                  <ul className="case-list">
                    {c.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>

                {c.extras && (
                  <div className="project-block">
                    <div className="k">Material de marca</div>
                    <ul className="case-list">
                      {c.extras.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <blockquote className="case-insight">
                  <span className="k">Key Insight</span>
                  {c.insight}
                </blockquote>

                <div className="case-ctas">
                  {c.ctas.map((b) => (
                    <a
                      key={b.label}
                      href={b.href.startsWith('http') ? b.href : asset(b.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${b.primary ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {b.label} {b.primary ? '→' : '↗'}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
