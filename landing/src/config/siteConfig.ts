// Configuración centralizada de recursos y enlaces de DevGuard AI.
// Permite actualizar rutas de recursos, enlaces y datos académicos.

export interface SiteConfig {
  projectName: string;
  tagline: string;
  description: string;
  githubRepoUrl: string;
  hasPublicRepo: boolean;

  infographic: {
    title: string;
    description: string;
    imagePath: string;
    isReady: boolean;
  };

  videoDemo: {
    title: string;
    description: string;
    videoPath: string;
    isExternalUrl: boolean;
    isReady: boolean;
  };

  documentation: {
    skillPath: string;
    architecturePath: string;
    testingPath: string;
    deliverablesPath: string;
    readmePath: string;
  };

  academic: {
    course: string;
    author: string;
    year: string;
  };
}

export const siteConfig: SiteConfig = {
  projectName: 'DevGuard AI',

  tagline: 'Asistente de Auditoría, Calidad y Seguridad de Código',

  description:
    'Agent Skill especializada en revisión estática de código, detección de riesgos OWASP/CWE, diseño de pruebas automatizadas y generación de informes técnicos reproducibles con enfoque Human-in-the-Loop.',

  // Configuración del repositorio GitHub
  githubRepoUrl: 'https://github.com/samuel/devguard-ai',
  hasPublicRepo: false,

  // Infografía
  infographic: {
    title: 'Infografía Técnica de DevGuard AI',
    description:
      'Visualización integral de la arquitectura de la Skill, los vectores de análisis de seguridad, la pirámide de pruebas y el flujo Human-in-the-Loop.',
    imagePath: `${import.meta.env.BASE_URL}assets/infografia-devguard.png`,
    isReady: true,
  },

  // Video demostrativo
  videoDemo: {
    title: 'Demostración Práctica de DevGuard AI',
    description:
      'Demostración audiovisual de DevGuard AI, su enfoque de análisis de código, identificación de riesgos y generación de informes técnicos con validación humana.',
    videoPath: `${import.meta.env.BASE_URL}assets/video-demo.mp4`,
    isExternalUrl: false,
    isReady: true,
  },

  // Documentación
  documentation: {
    skillPath: '.agents/skills/devguard/SKILL.md',
    architecturePath: 'docs/ARCHITECTURE.md',
    testingPath: 'docs/TESTING.md',
    deliverablesPath: 'docs/DELIVERABLES.md',
    readmePath: 'README.md',
  },

  // Información académica
  academic: {
    course: 'Proyecto académico 2026',
    author: 'Proyecto DevGuard AI',
    year: '2026',
  },
};