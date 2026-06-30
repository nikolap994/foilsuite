export interface Challenge {
  id: string
  title: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  description: string
  scenario: string
  files: { name: string; path: string; size: string }[]
  hints: string[]
  flagHash: string  // SHA-256 of the flag — never store plaintext flags client-side
  published: string
  author: string
  writeupAvailable: boolean
}

export const challenges: Challenge[] = [
  {
    id: 'dns-exfil',
    title: 'Silent Channel',
    category: 'LOG FORENSICS',
    difficulty: 'easy',
    points: 100,
    description: 'Your SOC team has detected unusual DNS traffic originating from a single internal workstation. A raw DNS query log has been captured from the network gateway. Your job: figure out what data is being sent out — and how.',
    scenario: `
**Incident report #2026-001**

Alert triggered at 09:31 UTC by anomaly detection rule DNS-HEX-SUBDOMAIN.
Source: 192.168.1.42 (WKSTN-FINANCE-04)
Duration: ~12 minutes of sustained unusual DNS activity.

The workstation belongs to the finance department and should only be accessing internal ERP systems and standard SaaS tools. No external file transfers were authorised.

Analyze the attached DNS query log. Identify the exfiltration channel, extract the data being sent, and submit the flag.
    `.trim(),
    files: [
      { name: 'dns-queries.log', path: '/lab/challenges/dns-queries.log', size: '14 KB' },
    ],
    hints: [
      'Sort or filter DNS queries by the registrable domain (eTLD+1) — one domain stands out.',
      'Look at the subdomain labels of queries to that domain. What do they look like?',
      'The subdomain labels appear in a specific order. Collect them in sequence.',
      'Convert the concatenated string from hex to ASCII.',
    ],
    flagHash: 'cc34b7abba24249d234f4e91464d8ea08473d0abd709708da1b01dcc639e67e2',
    published: '2026-06-28',
    author: 'nikolap994',
    writeupAvailable: true,
  },
  {
    id: 'beacon',
    title: 'Phantom Heartbeat',
    category: 'LOG FORENSICS',
    difficulty: 'medium',
    points: 200,
    description: 'A corporate HTTP proxy captured outbound traffic from the internal network. Analysts spotted a host sending unusually regular requests to an unknown external server. Find the beacon, decode the data it leaks, and submit the flag.',
    scenario: `
**Incident report #2026-002**

Alert triggered at 08:31 UTC by traffic anomaly rule BEACON-INTERVAL-60S.
Source: 192.168.1.88 (WKSTN-DEV-12)
Duration: ~1 hour of periodic outbound activity.

The workstation has no scheduled tasks or monitoring agents that would explain regular outbound connections at exactly 60-second intervals. The traffic is to an unregistered external host not listed in any approved service registry.

Analyze the attached HTTP proxy access log. Identify the beaconing host, extract the data being exfiltrated across multiple requests, and decode the flag.
    `.trim(),
    files: [
      { name: 'access.log', path: '/lab/challenges/access.log', size: '8 KB' },
    ],
    hints: [
      'Filter the log for entries from 192.168.1.88 — what external domains does it talk to?',
      'Look at the interval between requests to the suspicious host. Is it regular?',
      'Check the URL query parameters in those requests. There are three distinct sequences.',
      'The token values form a base64url-encoded string. Concatenate them in sequence order, then decode.',
    ],
    flagHash: '2b405089f5e7a149c3f4d8e0fe72df2b5b082d1032e54d7efc3f0b663e801efa',
    published: '2026-06-28',
    author: 'nikolap994',
    writeupAvailable: true,
  },
  {
    id: 'ttl-exfil',
    title: 'Ghost Protocol',
    category: 'PACKET ANALYSIS',
    difficulty: 'hard',
    points: 300,
    description: 'A network tap captured DNS traffic from a compromised workstation. The IDS flagged abnormally high response TTL values with no apparent cause. Something is hiding in the numbers.',
    scenario: `
**Incident report #2026-003**

Alert triggered at 11:22 UTC by IDS rule DNS-UNUSUAL-TTL.
Source: 192.168.1.88 (WKSTN-DEV-12) — the same host from report #2026-002.
Duration: ~4 minutes.

DNS responses from an external authoritative nameserver for \`cmd.exfil.badactor.cc\` carry TTL values that are far outside the expected range for that domain. Other DNS traffic on the wire has normal TTL values (300–86400). The anomalous TTLs are all in the printable ASCII range (32–126).

The capture has been exported to JSON via tshark for your analysis. Identify the covert channel, extract the TTL values in the correct order, and decode the flag.
    `.trim(),
    files: [
      { name: 'capture.json', path: '/lab/challenges/capture.json', size: '18 KB' },
    ],
    hints: [
      'Filter the JSON for records where the "dns.resp.name" field ends in "exfil.badactor.cc".',
      'Sort those records by the "frame.number" field to get chronological order.',
      'Extract the "dns.resp.ttl" field from each matching record.',
      'Convert each decimal TTL value to its ASCII character.',
    ],
    flagHash: 'dee56c52619ce1c6ce29cf9937e764ad485be6f52ed591696a1d040d7dae6121',
    published: '2026-06-28',
    author: 'nikolap994',
    writeupAvailable: true,
  },
  {
    id: 'mail-trap',
    title: 'Mail Trap',
    category: 'EMAIL FORENSICS',
    difficulty: 'easy',
    points: 150,
    description: 'An employee in the finance department received an email claiming to be from the company CFO requesting an urgent wire transfer. The SOC team captured the raw SMTP conversation. Find out what was really sent.',
    scenario: `
**Incident report #2026-004**

Alert triggered at 09:15 UTC by email-gateway rule SUSPICIOUS-SENDER-MISMATCH.
Recipient: finance@company.local
Claimed sender: ceo@company.com (John Smith, CFO)

Initial triage flagged the email as potentially spoofed: the sending mail server does not match the claimed domain's SPF record. The gateway logged the complete SMTP transaction before delivery.

Analyze the attached SMTP log. Identify the spoofing technique, locate the hidden payload in the email body, and decode the flag.
    `.trim(),
    files: [
      { name: 'smtp.log', path: '/lab/challenges/smtp.log', size: '3 KB' },
    ],
    hints: [
      'Look at the Received header — which mail server actually sent this email? Does it match company.com?',
      'The email uses MIME base64 Content-Transfer-Encoding. What does the body decode to?',
      'Decode the base64 body: you can use `python3 -c "import base64; print(base64.b64decode(\'...\').decode())"` or any online decoder.',
      'The decoded body IS the flag.',
    ],
    flagHash: '6ce30abd660272bce5d8da4f6a16c16f87a52f15e8fb032c251d95470e86eb62',
    published: '2026-06-28',
    author: 'nikolap994',
    writeupAvailable: true,
  },

  {
    id: 'phish-kit',
    title: 'Brand Impersonator',
    category: 'THREAT INTEL',
    difficulty: 'medium',
    points: 250,
    description: 'A threat intel feed captured 72 hours of suspicious domain registrations. Multiple brands are being impersonated. Identify the phishing infrastructure, map the campaign, and extract the operator\'s mistake encoded in the kit metadata.',
    scenario: `
**Incident report #2026-005**

Alert triggered at 06:00 UTC by brand-protection rule TYPO-CLUSTER-DETECTED.
Feed: passive DNS registration monitor (72-hour window)
Brands affected: 3 major financial institutions

A burst of 18 domain registrations was observed over a 72-hour window. The registrations share infrastructure: same registrar, overlapping nameserver patterns, and consistent WHOIS privacy provider. One domain in the cluster was registered with WHOIS privacy disabled — the registrant's email address was accidentally exposed.

A SHA-256 hash of the operator's exposed contact email is the flag.

Analyze the attached registration feed. Identify which domains belong to the same phishing campaign. Find the one registration where WHOIS privacy was not applied. The registrant email in that record is the secret.
    `.trim(),
    files: [
      { name: 'registrations.json', path: '/lab/challenges/registrations.json', size: '22 KB' },
    ],
    hints: [
      'Start by grouping domains by registrar — legitimate registrations are spread across many registrars; campaign infrastructure is not.',
      'Look at the nameserver assignments. Phishing kits often share nameservers across all domains in a campaign.',
      'Filter for records where the "privacy" field is false — there should be exactly one.',
      'The flag is FOIL{sha256(email)} — compute the SHA-256 of the exposed registrant email address.',
    ],
    flagHash: 'ea2fa611abaa38113ba20ff01015a5c480f33886eb7e069353e668e728620bc1',
    published: '2026-06-30',
    author: 'nikolap994',
    writeupAvailable: true,
  },
]

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id)
}
