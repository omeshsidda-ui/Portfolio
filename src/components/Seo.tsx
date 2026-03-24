import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
}

export default function Seo({ 
  title = "Omesh Sidda - Vibecoder & Developer", 
  description = "Portfolio of Omesh Sidda, a 17-year-old developer specializing in vibecoding, web designing, and app building.",
  name = "Omesh Sidda",
  type = "website"
}: SeoProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
