export type ProjectTone = 'sage' | 'apricot' | 'slate';

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectData {
  slug: string;
  path: string;
  fig: string;
  title: string;
  category: string;
  tone: ProjectTone;
  featured?: boolean;
  image: string;
  alt: string;
  description: string;
  lead: string;
  cardTech: string[];
  tech: string[];
  notes: string;
  live: string;
  github: string;
  overview: string[];
  architectureTitle: string;
  architecture: string[];
  specs: ProjectSpec[];
  schema: {
    applicationType: 'WebApplication' | 'SoftwareApplication';
    applicationCategory: 'EducationalApplication' | 'GameApplication';
    programmingLanguage: string[];
    keywords: string[];
    aboutInstitution?: boolean;
  };
}

export const projects: ProjectData[] = [
  {
    slug: 'mindgraph',
    path: '/projects/mindgraph',
    fig: 'Fig. 01',
    title: 'MindGraph',
    category: 'Knowledge tool',
    tone: 'sage',
    image: '/projects/mindgraph.png',
    alt: 'MindGraph showing three levels of branches around How the Internet Works',
    description:
      'Turn a topic, pasted notes, or a captioned YouTube video into an interactive three-level mind map.',
    lead:
      'MindGraph turns a topic prompt, pasted study notes, or a captioned YouTube video into an interactive three-level React Flow mind map with PNG and Markdown export.',
    cardTech: ['Next.js App Router', 'React Flow', 'Zod'],
    tech: ['Next.js App Router', 'React Flow', 'Zod', 'youtube-transcript', 'html-to-image'],
    notes:
      'Explore the connections on the canvas, export the map as a PNG with html-to-image, or take its outline with you as Markdown.',
    live: 'https://mind-graph-nine.vercel.app',
    github: 'https://github.com/omeshsidda-ui/MindGraph',
    overview: [
      'MindGraph is built for breaking down dense subjects into a clear, navigable hierarchy without wrestling with manual diagramming tools. Instead of starting from an empty whiteboard, you feed in a topic, raw notes, or a captioned YouTube URL.',
      'The generated graph organizes concepts into three levels—a central root, primary branches, and supporting subtopics—rendered directly on an interactive React Flow canvas so branches can be panned, zoomed, and inspected.',
    ],
    architectureTitle: 'Pipeline & exports',
    architecture: [
      'Built on the Next.js App Router with structured output validation handled by Zod so every generated node and branch fits the three-level hierarchy reliably.',
      'Captioned YouTube links are parsed through youtube-transcript before mapping, turning spoken explanations into structured topic branches.',
      'Completed maps export directly from the canvas as PNG images via html-to-image or as clean Markdown outlines for notes and study repositories.',
    ],
    specs: [
      { label: 'Framework', value: 'Next.js App Router' },
      { label: 'Canvas', value: 'React Flow (3-level graph)' },
      { label: 'Validation', value: 'Zod schemas' },
      { label: 'Video input', value: 'youtube-transcript' },
      { label: 'Exports', value: 'PNG (html-to-image) & Markdown' },
    ],
    schema: {
      applicationType: 'WebApplication',
      applicationCategory: 'EducationalApplication',
      programmingLanguage: ['TypeScript'],
      keywords: ['Next.js', 'React Flow', 'Zod'],
    },
  },
  {
    slug: 'pam-io',
    path: '/projects/pam-io',
    fig: 'Fig. 02',
    title: 'pam.io',
    category: 'Browser game',
    tone: 'apricot',
    image: '/projects/pam-io.png',
    alt: 'pam.io snake arena start screen with the Viper skin selected',
    description:
      'A browser snake arena with five bot personalities, a King Cobra boss fight, and 12 unlockable skins.',
    lead:
      'pam.io is a TypeScript and HTML5 Canvas snake arena featuring five distinct bot personalities, a King Cobra boss fight, 12 skins, and responsive mobile controls.',
    cardTech: ['TypeScript', 'HTML5 Canvas', 'Game'],
    tech: ['TypeScript', 'HTML5 Canvas', 'Mobile Joystick'],
    notes:
      'Steer with the mobile joystick, fight through five bot personalities and the King Cobra boss, and unlock up to 12 skins as you play.',
    live: 'https://pam-io.vercel.app',
    github: 'https://github.com/omeshsidda-ui/pam.io',
    overview: [
      'pam.io runs directly in the browser on an HTML5 Canvas loop written in TypeScript, focusing on fast arcade movement, readable arena contrast, and responsive touch play on phones alongside desktop mouse and keyboard input.',
      'Matches pair you against five distinct bot personalities rather than uniform wandering AI, keeping the arena unpredictable as snakes grow, contest drops, and cut off rivals.',
    ],
    architectureTitle: 'Arena mechanics',
    architecture: [
      'Custom TypeScript simulation and HTML5 Canvas renderer handling smooth steering, segment trailing, boost mechanics, and mobile joystick controls.',
      'Five bot personalities create varied pressure across the arena, culminating in a King Cobra boss encounter designed as a high-stakes target.',
      'Progression unlocks up to 12 distinct snake skins—including the Viper skin shown on the start screen—so players can customize their look between runs.',
    ],
    specs: [
      { label: 'Language', value: 'TypeScript' },
      { label: 'Renderer', value: 'HTML5 Canvas' },
      { label: 'Opponents', value: '5 bot personalities' },
      { label: 'Boss', value: 'King Cobra boss fight' },
      { label: 'Customization', value: '12 skins & mobile controls' },
    ],
    schema: {
      applicationType: 'SoftwareApplication',
      applicationCategory: 'GameApplication',
      programmingLanguage: ['TypeScript'],
      keywords: ['HTML5 Canvas'],
    },
  },
  {
    slug: 'gpcet-redesign',
    path: '/projects/gpcet-redesign',
    fig: 'Fig. 03',
    title: 'GPCET Redesign',
    category: 'Institutional portal',
    tone: 'slate',
    featured: true,
    image: '/projects/gpcet-redesign.png',
    alt: 'GPCET Redesign institutional portal homepage showing structured navigation and academic sections',
    description:
      'An institutional portal and content pipeline for GPCET indexing 936 Markdown pages, 452 faculty records, and 5,822 cataloged documents.',
    lead:
      'GPCET Redesign is a Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase portal backed by a content pipeline indexing 936 Markdown pages, 452 faculty records, and 5,822 cataloged documents.',
    cardTech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    notes:
      'Built to turn scattered institutional pages and PDFs into a fast, structured portal covering 936 Markdown pages, 452 faculty records, and 5,822 documents.',
    live: 'https://gpcet-redesign.vercel.app',
    github: 'https://github.com/omeshsidda-ui/gpcet-redesign',
    overview: [
      'College websites often bury academic notices, department handbooks, and faculty directories behind deep nested menus and unindexed PDF links. GPCET Redesign rethinks the portal around direct navigation and structured records for G. Pullaiah College of Engineering and Technology.',
      'Alongside the frontend redesign, the project includes a data and content pipeline that transforms existing institutional pages and files into clean, searchable entries backed by Supabase.',
    ],
    architectureTitle: 'Content pipeline & stack',
    architecture: [
      'Implemented with Next.js 15, React 19, TypeScript, and Tailwind CSS for fast page transitions and clean typographic hierarchy across academic departments.',
      'Powered by a structured repository of 936 Markdown pages, 452 faculty records, and 5,822 cataloged documents synced with Supabase.',
      'Organizes disparate institutional notices, department resources, and faculty information into consistent, accessible views.',
    ],
    specs: [
      { label: 'Stack', value: 'Next.js 15, React 19, TypeScript' },
      { label: 'Styling', value: 'Tailwind CSS' },
      { label: 'Backend', value: 'Supabase' },
      { label: 'Content corpus', value: '936 Markdown pages' },
      { label: 'Directory & docs', value: '452 faculty · 5,822 documents' },
    ],
    schema: {
      applicationType: 'WebApplication',
      applicationCategory: 'EducationalApplication',
      programmingLanguage: ['TypeScript'],
      keywords: ['React', 'Next.js', 'Tailwind CSS', 'Supabase'],
      aboutInstitution: true,
    },
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectByPath(path: string): ProjectData | undefined {
  return projects.find((project) => project.path === path);
}
