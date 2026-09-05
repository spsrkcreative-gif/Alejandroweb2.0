export interface ProfileImage {
  src: string;
  strength: string;
  title: string;
  description: string;
  bg: string;
  panel: string;
}

/**
 * Replace `src` with the final asset paths for production.
 * Each image lives in /public/images and represents one
 * professional dimension of the profile owner.
 */
export const IMAGES: ProfileImage[] = [
  {
    src: '/images/profile-01.png',
    strength: 'CREATIVITY',
    title: 'Creatividad que convierte ideas en experiencias',
    description:
      'Transformo conceptos en ideas visuales, contenido y propuestas capaces de conectar con las personas.',
    bg: '#E86A4A',
    panel: '#F29A82',
  },
  {
    src: '/images/profile-02.png',
    strength: 'STRATEGY',
    title: 'Estrategia con propósito',
    description:
      'Analizo, planifico y convierto objetivos de negocio en estrategias de marketing accionables.',
    bg: '#4E8F7A',
    panel: '#79B49F',
  },
  {
    src: '/images/profile-03.png',
    strength: 'COMMUNICATION',
    title: 'Comunicación que conecta',
    description:
      'Creo mensajes claros, humanos y estratégicos para conectar marcas con sus audiencias.',
    bg: '#C96C91',
    panel: '#E29CB6',
  },
  {
    src: '/images/profile-04.png',
    strength: 'ADAPTABILITY',
    title: 'Adaptabilidad para evolucionar',
    description:
      'Aprendo nuevas herramientas, exploro tecnologías y me adapto rápidamente a nuevos retos.',
    bg: '#4D87C7',
    panel: '#80AFE3',
  },
  {
    src: '/images/profile-05.png',
    strength: 'LEADERSHIP',
    title: 'Liderazgo para hacer que las ideas sucedan',
    description:
      'Combino iniciativa, organización y trabajo en equipo para convertir proyectos en resultados.',
    bg: '#8A7048',
    panel: '#B39A6D',
  },
];
