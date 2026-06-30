const SITE = 'https://foilsuite.netlify.app'

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog/phishing-infrastructure-analysis', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/foilguard-detection-architecture', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/dns-exfiltration-guide', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/c2-beacon-analysis', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/ttl-covert-channels', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/smtp-spoofing-and-email-forensics', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/how-typosquatting-works', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog/password-manager-threat-models', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/lab', priority: '0.9', changefreq: 'weekly' },
  { url: '/lab/challenges', priority: '0.9', changefreq: 'weekly' },
  { url: '/lab/challenges/dns-exfil', priority: '0.8', changefreq: 'monthly' },
  { url: '/lab/challenges/beacon', priority: '0.8', changefreq: 'monthly' },
  { url: '/lab/challenges/mail-trap', priority: '0.8', changefreq: 'monthly' },
  { url: '/lab/challenges/ttl-exfil', priority: '0.8', changefreq: 'monthly' },
  { url: '/lab/challenges/phish-kit', priority: '0.8', changefreq: 'monthly' },
  { url: '/lab/scoreboard', priority: '0.6', changefreq: 'daily' },
  { url: '/lab/certificate', priority: '0.5', changefreq: 'monthly' },
  { url: '/lab/about', priority: '0.6', changefreq: 'monthly' },
]

export async function GET(): Promise<Response> {
  const now = new Date().toISOString().slice(0, 10)

  const urls = staticPages.map(p => `
  <url>
    <loc>${SITE}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
