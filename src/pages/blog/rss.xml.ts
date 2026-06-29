const SITE = 'https://foilsuite.netlify.app'

const posts = [
  {
    slug: 'smtp-spoofing-and-email-forensics',
    title: 'How attackers spoof email — and how to catch them',
    date: '2026-06-28',
    category: 'TUTORIAL',
    description: 'A practical guide to SMTP spoofing, SPF, DKIM, and DMARC — with a walkthrough of the FoilLab mail-trap challenge.',
  },
  {
    slug: 'how-typosquatting-works',
    title: 'How Typosquatting Works — and How FoilGuard Catches It',
    date: '2026-06-28',
    category: 'DEEP DIVE',
    description: 'A deep dive into typosquatting, homoglyph attacks, and combosquatting — and how FoilGuard detects each technique.',
  },
  {
    slug: 'password-manager-threat-models',
    title: 'Password Manager Threat Models — and Why Local-First Wins',
    date: '2026-06-28',
    category: 'DEEP DIVE',
    description: 'A practical look at the threat models behind password managers — cloud sync vs. local-first encryption — and what FoilVault does differently.',
  },
]

export async function GET(): Promise<Response> {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  const items = sorted.map(p => `
  <item>
    <title>${escXml(p.title)}</title>
    <link>${SITE}/blog/${p.slug}</link>
    <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description>${escXml(p.description)}</description>
    <category>${escXml(p.category)}</category>
  </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FoilSuite Blog</title>
    <link>${SITE}/blog</link>
    <description>Security research, tutorials, and deep dives from the Foil Security Suite team.</description>
    <language>en</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
