import { useEffect, useRef } from 'react';
import { Reveal } from './Reveal';

const TOOLS = ['ChatGPT', 'Canva', 'Gamma', 'Leonardo AI', 'Ideogram', 'Sora', 'ElevenLabs', 'InVideo'];

function useOrbitLayout(wrapRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    function layout() {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const nodes = wrap.querySelectorAll<HTMLElement>('.orbit-node');
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const n = nodes.length;
      const innerR = w * 0.29;
      const outerR = w * 0.46;
      nodes.forEach((node, i) => {
        const radius = i % 2 === 0 ? outerR : innerR;
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.transform = 'translate(-50%, -50%)';
      });
    }
    layout();
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, [wrapRef]);
}

export function MarketingIA() {
  const orbitRef = useRef<HTMLDivElement>(null);
  useOrbitLayout(orbitRef);

  return (
    <section id="ia-data" className="ia-lab alt-bg">
      <div className="wrap">
        <div className="ia-copy">
          <Reveal>
            <p className="eyebrow">Marketing + IA</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.4vw,2.6rem)', marginBottom: 20 }}>
              Marketing Lab: estrategia potenciada por tecnología
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p>
              Utilizo <strong>inteligencia artificial</strong> como herramienta para acelerar la
              creatividad, analizar información, desarrollar contenido y construir soluciones
              digitales — no como atajo, sino como parte activa de mi proceso.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <ul className="ia-list">
              <li>
                <b>Ideación y contenido</b> — ChatGPT, Gamma
              </li>
              <li>
                <b>Diseño e imagen</b> — Canva, Leonardo AI, Ideogram
              </li>
              <li>
                <b>Video y voz</b> — Sora, InVideo, ElevenLabs
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={2} className="orbit-wrap">
          <div ref={orbitRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div className="orbit-ring r1"></div>
            <div className="orbit-ring r2"></div>
            <div className="orbit-core">
              Marketing
              <br />
              Lab
            </div>
            {TOOLS.map((tool) => (
              <span className="orbit-node" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
