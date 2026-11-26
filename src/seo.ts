import { projects, getProjectByPath, type ProjectData } from './data/projects';
import { site } from './data/site';

export interface RouteMeta {
  title: string;
  description: string;
  canonical?: string;
  ogType: 'profile' | 'article' | 'website';
  ogImage: string;
  ogImageWidth: number;
  ogImageHeight: number;
  ogImageAlt: string;
  robots?: string;
  profileFirstName?: string;
  profileLastName?: string;
  articleAuthor?: string;
  jsonLd?: Record<string, unknown>;
}

const WEBSITE_ID = `${site.domain}/#website`;
const PERSON_ID = `${site.domain}/#omesh-sidda`;

function buildWebsiteNode(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.siteName,
    alternateName: site.person.shortName,
    url: `${site.domain}/`,
  };
}

function buildPersonNode(): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    url: `${site.domain}/`,
    name: site.person.name,
    alternateName: [...site.person.alternateNames],
    givenName: site.person.givenName,
    familyName: site.person.familyName,
    email: `mailto:${site.person.email}`,
    image: `${site.domain}${site.person.socialImage}`,
    description: site.person.bio,
    homeLocation: {
      '@type': 'Place',
      name: site.person.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.person.addressLocality,
        addressRegion: site.person.addressRegion,
        addressCountry: site.person.addressCountry,
      },
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: site.education.institution,
      alternateName: site.education.shortInstitution,
      url: site.education.departmentUrl,
    },
    knowsAbout: [...site.knowsAbout],
    sameAs: site.socialProfiles.map((profile) => profile.href),
  };
}

function buildHomeJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebsiteNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${site.domain}/#webpage`,
        url: `${site.domain}/`,
        name: 'Omesh Sidda (Omesh) — Web Developer & Linux Portfolio',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      buildPersonNode(),
      {
        '@type': 'ItemList',
        '@id': `${site.domain}/#projects-list`,
        name: 'Selected projects by Omesh Sidda',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          url: `${site.domain}${project.path}`,
        })),
      },
    ],
  };
}

function buildAboutJsonLd(): Record<string, unknown> {
  const pageUrl = `${site.domain}/about`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebsiteNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'About Omesh Sidda (Omesh) — GPCET CSE, Linux & AI Agents',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        breadcrumb: { '@id': breadcrumbId },
      },
      buildPersonNode(),
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${site.domain}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

function buildProjectJsonLd(project: ProjectData): Record<string, unknown> {
  const pageUrl = `${site.domain}${project.path}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const softwareNode: Record<string, unknown> = {
    '@type': [project.schema.applicationType, 'SoftwareSourceCode'],
    '@id': `${pageUrl}#software`,
    name: project.title,
    description: project.lead,
    applicationCategory: project.schema.applicationCategory,
    operatingSystem: 'Web Browser',
    url: project.live,
    codeRepository: project.github,
    programmingLanguage: project.schema.programmingLanguage,
    keywords: project.schema.keywords,
    screenshot: `${site.domain}${project.image}`,
    author: { '@id': PERSON_ID },
  };

  if (project.schema.aboutInstitution) {
    softwareNode.about = {
      '@type': 'CollegeOrUniversity',
      name: site.education.institution,
      alternateName: site.education.shortInstitution,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebsiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${project.title} — ${project.category} | ${site.person.name}`,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': `${pageUrl}#software` },
        breadcrumb: { '@id': breadcrumbId },
      },
      buildPersonNode(),
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${site.domain}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${site.domain}/#projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
      softwareNode,
    ],
  };
}

const projectDescriptions: Record<string, { title: string; description: string }> = {
  mindgraph: {
    title: 'MindGraph — 3-Level AI Mind Map Tool | Omesh Sidda',
    description:
      'MindGraph by Omesh Sidda turns topics, notes, or captioned YouTube videos into interactive 3-level React Flow mind maps with PNG and Markdown export.',
  },
  'pam-io': {
    title: 'pam.io — HTML5 Canvas Snake Arena Game | Omesh Sidda',
    description:
      'Case study for pam.io by Omesh Sidda: a TypeScript and HTML5 Canvas snake arena with 5 bot personalities, King Cobra boss fight, 12 skins, and mobile controls.',
  },
  'gpcet-redesign': {
    title: 'GPCET Redesign — Institutional Portal & Pipeline | Omesh Sidda',
    description:
      'GPCET Redesign by Omesh Sidda: Next.js 15, React 19, TypeScript, and Supabase portal indexing 936 Markdown pages, 452 faculty records, and 5,822 documents.',
  },
};

export function getRouteMeta(path: string): RouteMeta {
  if (path === '/') {
    return {
      title: 'Omesh Sidda (Omesh) — Web Developer & Linux Portfolio',
      description:
        'Portfolio of Omesh Sidda (Omesh), a first-year B.Tech CSE student at GPCET building Next.js web apps, interactive browser software, and Linux agent systems.',
      canonical: `${site.domain}/`,
      ogType: 'profile',
      ogImage: `${site.domain}${site.person.socialImage}`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageAlt: site.person.socialImageAlt,
      profileFirstName: site.person.givenName,
      profileLastName: site.person.familyName,
      jsonLd: buildHomeJsonLd(),
    };
  }

  if (path === '/about') {
    return {
      title: 'About Omesh Sidda (Omesh) — GPCET CSE, Linux & AI Agents',
      description:
        'About Omesh Sidda (Omesh), a first-year B.Tech CSE student at GPCET, Kurnool working with web development, headless Linux servers, and Hermes AI agents.',
      canonical: `${site.domain}/about`,
      ogType: 'profile',
      ogImage: `${site.domain}${site.person.socialImage}`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageAlt: site.person.socialImageAlt,
      profileFirstName: site.person.givenName,
      profileLastName: site.person.familyName,
      jsonLd: buildAboutJsonLd(),
    };
  }

  const project = getProjectByPath(path);
  if (project) {
    const copy = projectDescriptions[project.slug];
    return {
      title: copy.title,
      description: copy.description,
      canonical: `${site.domain}${project.path}`,
      ogType: 'article',
      ogImage: `${site.domain}${project.image}`,
      ogImageWidth: 1280,
      ogImageHeight: 800,
      ogImageAlt: project.alt,
      articleAuthor: site.person.name,
      jsonLd: buildProjectJsonLd(project),
    };
  }

  return {
    title: 'Page not found — Omesh Sidda',
    description: "The requested page could not be found on Omesh Sidda's portfolio.",
    ogType: 'website',
    ogImage: `${site.domain}${site.person.socialImage}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: site.person.socialImageAlt,
    robots: 'noindex',
  };
}

export function escapeAttr(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function escapeHtmlText(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function escapeJsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2).replaceAll('<', '\\u003c');
}

export function renderRouteHead(path: string): string {
  const meta = getRouteMeta(path);
  const lines: string[] = [
    `  <title>${escapeHtmlText(meta.title)}</title>`,
    `  <meta name="description" content="${escapeAttr(meta.description)}">`,
  ];

  if (meta.robots) {
    lines.push(`  <meta name="robots" content="${escapeAttr(meta.robots)}">`);
  }

  if (meta.canonical) {
    lines.push(`  <link rel="canonical" href="${escapeAttr(meta.canonical)}">`);
    lines.push(`  <meta property="og:url" content="${escapeAttr(meta.canonical)}">`);
  }

  lines.push(
    `  <meta property="og:type" content="${escapeAttr(meta.ogType)}">`,
    `  <meta property="og:title" content="${escapeAttr(meta.title)}">`,
    `  <meta property="og:description" content="${escapeAttr(meta.description)}">`,
    `  <meta property="og:image" content="${escapeAttr(meta.ogImage)}">`,
    `  <meta property="og:image:width" content="${meta.ogImageWidth}">`,
    `  <meta property="og:image:height" content="${meta.ogImageHeight}">`,
    `  <meta property="og:image:alt" content="${escapeAttr(meta.ogImageAlt)}">`,
  );

  if (meta.profileFirstName) {
    lines.push(`  <meta property="profile:first_name" content="${escapeAttr(meta.profileFirstName)}">`);
  }
  if (meta.profileLastName) {
    lines.push(`  <meta property="profile:last_name" content="${escapeAttr(meta.profileLastName)}">`);
  }
  if (meta.articleAuthor) {
    lines.push(`  <meta property="article:author" content="${escapeAttr(meta.articleAuthor)}">`);
  }

  lines.push(
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${escapeAttr(meta.title)}">`,
    `  <meta name="twitter:description" content="${escapeAttr(meta.description)}">`,
    `  <meta name="twitter:image" content="${escapeAttr(meta.ogImage)}">`,
    `  <meta name="twitter:image:alt" content="${escapeAttr(meta.ogImageAlt)}">`,
  );

  if (meta.jsonLd) {
    lines.push(
      `  <script type="application/ld+json">\n${escapeJsonLd(meta.jsonLd)}\n  </script>`,
    );
  }

  return lines.join('\n');
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string | undefined) {
  const selector = `meta[${attr}="${key}"]`;
  const existing = document.head.querySelector(selector);
  if (!content) {
    existing?.remove();
    return;
  }
  const el = existing ?? document.createElement('meta');
  el.setAttribute(attr, key);
  el.setAttribute('content', content);
  if (!existing) document.head.appendChild(el);
}

function upsertCanonical(href: string | undefined) {
  const existing = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    existing?.remove();
    return;
  }
  const el = existing ?? document.createElement('link');
  el.setAttribute('rel', 'canonical');
  el.setAttribute('href', href);
  if (!existing) document.head.appendChild(el);
}

function upsertJsonLd(data: Record<string, unknown> | undefined) {
  const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach((node, index) => {
    if (index > 0 || !data) node.remove();
  });
  if (!data) return;
  const target = scripts[0] ?? document.createElement('script');
  target.setAttribute('type', 'application/ld+json');
  target.textContent = JSON.stringify(data);
  if (!scripts[0]) document.head.appendChild(target);
}

export function syncDocumentHead(path: string): void {
  if (typeof document === 'undefined') return;
  const meta = getRouteMeta(path);
  document.title = meta.title;

  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'robots', meta.robots);
  upsertCanonical(meta.canonical);

  upsertMeta('property', 'og:url', meta.canonical);
  upsertMeta('property', 'og:type', meta.ogType);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:image', meta.ogImage);
  upsertMeta('property', 'og:image:width', String(meta.ogImageWidth));
  upsertMeta('property', 'og:image:height', String(meta.ogImageHeight));
  upsertMeta('property', 'og:image:alt', meta.ogImageAlt);

  upsertMeta('property', 'profile:first_name', meta.profileFirstName);
  upsertMeta('property', 'profile:last_name', meta.profileLastName);
  upsertMeta('property', 'article:author', meta.articleAuthor);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertMeta('name', 'twitter:image', meta.ogImage);
  upsertMeta('name', 'twitter:image:alt', meta.ogImageAlt);

  upsertJsonLd(meta.jsonLd);
}
