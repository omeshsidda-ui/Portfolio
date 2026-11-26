import type { SymbolName } from '../components/Symbol';

export interface SocialProfile {
  label: string;
  href: string;
  handle: string;
}

export interface Capability {
  icon: SymbolName;
  name: string;
  summary: string;
  detail: string;
}

export const site = {
  siteName: 'Omesh Sidda',
  domain: 'https://omeshsidda.me',
  person: {
    name: 'Omesh Sidda',
    shortName: 'Omesh',
    alternateNames: ['Omesh', 'omeshsidda-ui'],
    givenName: 'Omesh',
    familyName: 'Sidda',
    email: 'omeshsidda@gmail.com',
    shortLocation: 'Kurnool, India',
    location: 'Kurnool, Andhra Pradesh, India',
    addressLocality: 'Kurnool',
    addressRegion: 'Andhra Pradesh',
    addressCountry: 'IN',
    bio: 'First-year B.Tech Computer Science and Engineering student at G. Pullaiah College of Engineering and Technology (GPCET), Kurnool, Andhra Pradesh, India, building web apps and working with headless Linux servers and Hermes AI agents.',
    socialImage: '/social-preview.png',
    socialImageAlt: 'Omesh Sidda, web development and Linux portfolio',
  },
  education: {
    institution: 'G. Pullaiah College of Engineering and Technology',
    shortInstitution: 'GPCET',
    degree: 'B.Tech in Computer Science and Engineering',
    year: 'First-year student',
    location: 'Kurnool, Andhra Pradesh, India',
    departmentUrl: 'https://www.gpcet.ac.in/cse_home/',
  },
  socialProfiles: [
    {
      label: 'GitHub',
      href: 'https://github.com/omeshsidda-ui',
      handle: 'omeshsidda-ui',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/omesh-sidda-a51988343/',
      handle: 'Omesh Sidda',
    },
    {
      label: 'X',
      href: 'https://x.com/omeshsidda',
      handle: '@omeshsidda',
    },
  ] satisfies SocialProfile[],
  knowsAbout: [
    'Web Development',
    'Headless Linux Servers',
    'Hermes AI Agents',
    'Networking',
    'Reverse Engineering',
    'Web Scraping',
    'TypeScript',
    'React',
    'Next.js',
    'HTML5 Canvas',
    'Tailwind CSS',
    'Supabase',
  ],
  capabilities: [
    {
      icon: 'code',
      name: 'Web development',
      summary: 'I build browser interfaces and test how they feel on a phone.',
      detail: 'From Next.js App Router applications to interactive HTML5 Canvas software and static pre-rendered React pages, with mobile layout checks on iPhone.',
    },
    {
      icon: 'server',
      name: 'Headless Linux servers',
      summary: 'I manage remote Linux machines from the command line and use them to run agents.',
      detail: 'Provisioning, shell tooling, systemd services, and deploying lightweight workloads on remote Linux hosts without a desktop environment.',
    },
    {
      icon: 'spark',
      name: 'Hermes agents',
      summary: 'I run Hermes agents on remote servers for day-to-day workflows.',
      detail: 'Operating and integrating Hermes AI agent workflows on headless Linux servers alongside developer tools and automated checks.',
    },
    {
      icon: 'network',
      name: 'Networking',
      summary: 'I configure networks and trace connectivity problems.',
      detail: 'Configuring custom domains, DNS records, HTTPS hosting, and tracing how requests move between clients and remote servers.',
    },
    {
      icon: 'search',
      name: 'Reverse engineering',
      summary: 'I examine application behavior and structure to understand how software works.',
      detail: 'Inspecting client bundles, network traffic, and document structures to map out undocumented behavior and data flows.',
    },
    {
      icon: 'database',
      name: 'Web scraping',
      summary: 'I extract information from web pages and turn it into structured data.',
      detail: 'Collecting institutional pages, faculty records, and document catalogs into clean Markdown and structured datasets.',
    },
  ] satisfies Capability[],
} as const;
