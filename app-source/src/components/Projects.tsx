import { useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { Reveal } from './Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Project {
  slug: string;
  layout?: 'b';
  img: string;
  alt: string;
  label: string;
  title: string;
  pills: string[];
  lede: string;
  necesidad: string;
  queHice: string;
}

const PROJECTS: Project[] = [
  {
    slug: 'la-chef',
    img: '/lab/lachef.jpg',
    alt: 'Pieza publicitaria de la marca de alimentos La Chef',
    label: 'Marca activa · Dirección de marca',
    title: 'La Chef',
    pills: ['Dirección de marca', 'Pieza publicitaria', 'Sistema de íconos'],
    lede: 'La marca de alimentos donde actualmente lidero el desarrollo de marca y la expansión comercial en Comayagua y Siguatepeque.',
    necesidad: 'Comunicar cercanía familiar y calidad de producto en una sola pieza visual.',
    queHice:
      'Dirección de marca, negociación comercial con distribuidores y diseño de piezas publicitarias con paleta cálida, tipografía manuscrita y sistema de íconos de atributos.',
  },
  {
    slug: 'asimet',
    layout: 'b',
    img: '/lab/asimet-mark.jpg',
    alt: 'Logotipo Asimet: letra A asimétrica con destellos',
    label: 'Caso de estudio · Identidad de marca',
    title: 'Asimet',
    pills: ['Investigación conceptual', 'Bocetado a mano', 'Diseño vectorial'],
    lede: 'Un proceso completo de identidad, del cuaderno de bocetos a la ejecución digital en Illustrator.',
    necesidad: 'Un símbolo distintivo a partir del nombre "Asimet", con una A protagonista.',
    queHice:
      'Bocetos a mano, refinamiento en iPad con Apple Pencil y ejecución vectorial final: una "A" asimétrica con destellos en abanico que sugieren movimiento.',
  },
  {
    slug: 'fullbody',
    img: '/lab/fullbody.jpg',
    alt: 'Logotipo Fullbody: ícono hexagonal con letra F, marca de fitness',
    label: 'Identidad de marca · Fitness',
    title: 'Fullbody',
    pills: ['Diseño de logotipo', 'Ícono de marca', 'Tagline visual'],
    lede: 'Identidad para una marca de fitness construida sobre un símbolo geométrico simple.',
    necesidad: 'Un símbolo fuerte, minimalista y versátil para distintos formatos.',
    queHice:
      'Ícono hexagonal con una "F" en líneas continuas que transmite movimiento, más el tagline "Become the best version of you".',
  },
  {
    slug: 'taxi-center',
    layout: 'b',
    img: '/lab/taxicenter.jpg',
    alt: 'Logotipo Taxi Center sobre fotografía nocturna de ciudad',
    label: 'Identidad de marca · Transporte',
    title: 'Taxi Center',
    pills: ['Diseño de logotipo', 'Dirección de imagen'],
    lede: 'Una identidad pensada para transmitir confianza en un servicio de transporte.',
    necesidad: 'Transmitir profesionalismo y seguridad de un vistazo.',
    queHice: 'Ícono que combina un auto y un teléfono, tipografía sobria y paleta azul nocturno.',
  },
  {
    slug: 'spark-creative',
    img: '/lab/sparkcreative.jpg',
    alt: 'Logotipo Spark Creative: ícono de llama en degradado naranja y azul',
    label: 'Identidad de marca · Estudio creativo',
    title: 'Spark Creative',
    pills: ['Diseño de logotipo', 'Paleta de color', 'Tipografía de marca'],
    lede: 'Una identidad con energía visual para un estudio de contenido creativo.',
    necesidad: 'Una marca con carácter que se sintiera tan dinámica como su trabajo.',
    queHice: 'Ícono de llama en degradado cálido-frío con tipografía redondeada y enérgica.',
  },
];

function ProjectMedia({ src, alt }: { src: string; alt: string }) {
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
    <div className="project-media" ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="alt-bg">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Proyectos destacados</p>
          <h2>Marcas en las que he trabajado</h2>
          <p>
            Casos reales de identidad de marca, del objetivo inicial a la solución visual
            entregada.
          </p>
        </Reveal>
      </div>

      {PROJECTS.map((p) => (
        <Reveal as="article" key={p.slug} className={`project ${p.layout === 'b' ? 'layout-b' : ''}`}>
          <div className="wrap project-inner">
            <ProjectMedia src={p.img} alt={p.alt} />
            <div className="project-copy">
              <span className="project-label">{p.label}</span>
              <h3>{p.title}</h3>
              <div className="project-meta">
                {p.pills.map((pill) => (
                  <span className="pill" key={pill}>
                    {pill}
                  </span>
                ))}
              </div>
              <p>{p.lede}</p>
              <div className="project-block">
                <div className="k">Necesidad</div>
                <div className="v">{p.necesidad}</div>
              </div>
              <div className="project-block">
                <div className="k">Qué hice</div>
                <div className="v">{p.queHice}</div>
              </div>
              <a href="#contacto" className="project-link">
                Ver proyecto →
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
