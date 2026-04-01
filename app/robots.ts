import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/compte'],
      },
    ],
    sitemap: 'https://fleuriste-annefreret.com/sitemap.xml',
  };
}
