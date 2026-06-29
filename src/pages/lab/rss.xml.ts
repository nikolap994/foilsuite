import { challenges } from '../../data/challenges'

const SITE = 'https://foilsuite.netlify.app'

export async function GET(): Promise<Response> {
  const items = challenges
    .slice()
    .sort((a, b) => b.published.localeCompare(a.published))
    .map(c => `
  <item>
    <title>${escXml(c.title)}</title>
    <link>${SITE}/lab/challenges/${c.id}</link>
    <guid isPermaLink="true">${SITE}/lab/challenges/${c.id}</guid>
    <pubDate>${new Date(c.published).toUTCString()}</pubDate>
    <description>${escXml(c.description)}</description>
    <category>${escXml(c.category)}</category>
  </item>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FoilLab — New Challenges</title>
    <link>${SITE}/lab</link>
    <description>CTF challenges from the Foil Security Suite. New puzzles based on real attack patterns.</description>
    <language>en</language>
    <atom:link href="${SITE}/lab/rss.xml" rel="self" type="application/rss+xml" />
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
