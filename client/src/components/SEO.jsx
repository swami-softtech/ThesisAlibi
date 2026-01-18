import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website'
}) => {
  const brandName = 'ThesisAlibi';
  const defaultTitle = brandName;
  const defaultDescription = 'ThesisAlibi is your trusted partner for comprehensive thesis assistance, offering expert guidance, research support, and professional writing services to help you achieve academic success.';
  const defaultKeywords = 'thesis assistance, academic writing, research help, dissertation support, thesis guidance, academic services';

  const fullTitle = title ? `${brandName} | ${title} ` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const canonicalHref = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
    </Helmet>
  );
};

export default SEO;