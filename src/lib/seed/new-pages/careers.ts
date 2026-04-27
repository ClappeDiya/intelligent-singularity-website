import type { Payload } from 'payload';

export const CAREERS_PAGE_SEED = {
  eyebrow: 'Careers · Join the studio',
  title: 'A small team, with a long horizon.',
  lede:
    'We hire slowly and carefully. When a role is open, it is posted here. If nothing is open, the best introductions still get a reply.',
  howWeWork: [
    {
      title: 'Small team, shared stack',
      body: 'One codebase. One deploy model. One shared platform across every Clap product. You will not lose a month learning fifteen tools and five meetings a day. The same Next.js + Postgres + Payload stack runs this site, Clappe, ClapBill, ClapMed, and the rest. Ship a feature on one product and you can ship on every product.',
    },
    {
      title: 'AI-augmented, not AI-replaced',
      body: 'We lean hard on AI for leverage. Code generation, translation, support triage, fraud detection. But humans write the lines that ship. Humans own every choice. Craft matters. Code review matters. Ownership matters. The AI is a power tool, not the carpenter.',
    },
    {
      title: 'Remote, honestly',
      body: 'We are remote because it fits the work, not because it is trendy. Meetings are short and few. Writing is a craft we take seriously. Most choices live in a written brief that anyone can read months later. Time zones are respected. Nobody takes a meeting at three in the morning to suit someone else.',
    },
    {
      title: 'Made for the long game',
      body: 'The studio is bootstrapped and not for sale. We plan to ship in twenty years. That means a steady pace, real weekends, and choosing problems that compound over time. Nobody here is racing for an exit.',
    },
    {
      title: 'Compensation, transparently',
      body: 'Every open role posts a salary band in writing. We do not negotiate against people who guess the band. We publish it and pay it. Equity is not on the table — the company is not for sale. We pay competitive cash with annual reviews tied to real impact.',
    },
    {
      title: 'A long bias toward seniority',
      body: 'Most hires have shipped enough to hold strong opinions and enough scars to hold them lightly. We are not a junior-developer assembly line. When we hire someone earlier in their career, the role is built around real mentorship — not survival.',
    },
  ],
  productFamily: [
    { name: 'Clappe', line: 'Unified ERP — the core of the ecosystem.' },
    { name: 'ClapBill', line: 'Multi-tenant invoicing for SMBs and enterprises.' },
    { name: 'ClapMed', line: 'Agentic Electronic Medical Records.' },
    { name: 'ClapDiet', line: 'Lab-guided nutrition and meal planning.' },
    { name: 'ClapPay', line: 'Global unified financial platform.' },
    { name: 'Clapwork', line: 'Trust-first global freelance marketplace.' },
    { name: 'Apogee', line: 'Farm management for commercial and smallholder farms.' },
    { name: 'Audiflo · Nestbitt · DailyWorship', line: 'AI media and creative tools.' },
  ],
  process: [
    {
      stage: '01 · Two paragraphs',
      what: 'You email the role. Two paragraphs: what you have shipped, and what you want to build next. Polished CVs welcomed but not required. We read every email. The reply comes from a human within two business days.',
    },
    {
      stage: '02 · A real conversation',
      what: 'Forty-five minutes with the hiring manager. No "tell me about a time" theatre. We talk about real work — yours and ours. You ask the questions that matter to you. We share a written follow-up the same week.',
    },
    {
      stage: '03 · A small piece of real work',
      what: 'A four-to-six-hour exercise that mirrors what the role actually does, paid at our standard contractor rate. You keep what you build. We share written feedback regardless of outcome.',
    },
    {
      stage: '04 · References and offer',
      what: 'A short reference call with two people you have worked with. A written offer with the exact salary, start date, equipment budget, and time-off policy. Accept or decline by writing — no pressure tactics.',
    },
  ],
  openings: {
    heading: 'Open roles',
    currentlyHiringText: 'Currently hiring for… nothing.',
    note:
      'There are no open roles at this moment. This line is not decoration — we keep it honest. When something opens, it is a real role with a real scope, salary range, and a named hiring manager.',
  },
  introduceYourself: {
    eyebrow: 'Introduce yourself anyway',
    heading: 'The best hires we ever made wrote us before there was a role.',
    body:
      'Tell us what you have shipped and what you want to build next. Two paragraphs beats a polished CV. A real reply comes from a human, typically within two business days.',
    email: 'careers@intelligentsingularityinc.com',
  },
};

export async function seedCareersPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'careers-page', data: CAREERS_PAGE_SEED as any });
  log.push('careers-page: updated');
}
