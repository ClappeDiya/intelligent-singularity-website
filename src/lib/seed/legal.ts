type Para = { type: 'paragraph'; version: 1; direction: 'ltr'; format: ''; indent: 0; children: { type: 'text'; version: 1; text: string; format?: number }[] };
type Heading = { type: 'heading'; version: 1; direction: 'ltr'; format: ''; indent: 0; tag: 'h2' | 'h3'; children: { type: 'text'; version: 1; text: string }[] };
type List = { type: 'list'; version: 1; direction: 'ltr'; format: ''; indent: 0; listType: 'bullet' | 'number'; tag: 'ul' | 'ol'; start: 1; children: { type: 'listitem'; version: 1; direction: 'ltr'; format: ''; indent: 0; value: number; children: { type: 'text'; version: 1; text: string }[] }[] };

type Node = Para | Heading | List;

const p = (text: string): Para => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [{ type: 'text', version: 1, text }],
});

const h = (tag: 'h2' | 'h3', text: string): Heading => ({
  type: 'heading',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  children: [{ type: 'text', version: 1, text }],
});

const ul = (items: string[]): List => ({
  type: 'list',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((text, i) => ({
    type: 'listitem',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    value: i + 1,
    children: [{ type: 'text', version: 1, text }],
  })),
});

function doc(children: Node[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children,
    },
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Privacy Policy
// ──────────────────────────────────────────────────────────────────────────────
const PRIVACY = doc([
  p(
    'Your privacy matters to us. This page explains in plain words what data we take when you visit intelligentsingularityinc.com, what we do with it, how long we keep it, who can see it, and how you can take it back. We wrote it so a grade-8 student can read it without a dictionary.',
  ),
  p(
    'We are Intelligent Singularity Inc., the parent company of the Clap ecosystem and its sister projects, based in Alberta, Canada. We build software that aims to work for every person in every country, without picking favourites. The same belief shapes this policy: one rule book, read the same way, whether you live in Toronto or Nairobi.',
  ),

  h('h2', 'The short version'),
  ul([
    'This website does not run any advertising trackers, analytics scripts, or social-media pixels.',
    'We do not sell your information. We have never sold it. We never plan to.',
    'We only receive information that you choose to send us, for example through the contact form.',
    'One tiny cookie remembers your language so the site opens in the language you picked last time.',
    'You can ask us for a copy of what we hold, fix it, or erase it, by writing to privacy@intelligentsingularityinc.com.',
  ]),

  h('h2', 'Who this policy covers'),
  p(
    'This policy covers intelligentsingularityinc.com and any subdomain that links back here. Each product in our wider family (for example our healthcare, payments, freelance, and farm management tools) runs on its own domain and has its own privacy notice that fits what that product actually does. If you move from this site to one of those products, please read that product’s notice before signing up.',
  ),
  p(
    'When a word is written like "we", it means Intelligent Singularity Inc. When a word is written like "you", it means the person reading the page — a visitor, a customer, a partner, a journalist, or anyone else.',
  ),

  h('h2', 'Across the Clap product family'),
  p(
    'Intelligent Singularity is the parent company of the Clap ecosystem. The corporate website you are reading now is the public front door. The products inside the family — Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, and the shared infrastructure that connects them — each handle their own user accounts, their own paid subscriptions, and their own private business data on their own dedicated domains.',
  ),
  p(
    'A few things are shared across the family. Single sign-on lets you use one Clap account across products that opt in. Customer-support tickets are routed through one help desk so a question about ClapBill can be picked up by the same team that maintains ClapPay. Fraud detection and abuse signals are shared between products, but only as anonymised patterns — never as the underlying personal data. The detail of what is shared, with which product, and for how long is documented on each product’s own privacy page.',
  ),
  p(
    'If you would like a complete map of which Clap product holds which piece of your data, write to privacy@intelligentsingularityinc.com from the email address linked to your account. We will reply within thirty days with a single, plain-language report you can save or print.',
  ),

  h('h2', 'What we collect and why'),
  p(
    'We try to collect as close to nothing as we can. Most of this website works without asking for anything. When we do collect something, it is because you gave it to us on purpose, or because the web itself needs it to deliver the page to your screen.',
  ),

  h('h3', 'Information you give us'),
  p(
    'When you write to us through the contact form, you send us four things: your name, your email address, a subject line, and the body of your message. You may also tell us why you are writing (for example, sales, support, press, or careers). We use those details only to read your note and write you back. We do not add you to any marketing list, and we do not share the message with anyone outside our small team.',
  ),
  p(
    'If you send us a CV for a job opening, we store it inside our hiring inbox until the role is filled or for twelve months, whichever comes first. After that we delete it, unless you ask us to keep it longer.',
  ),

  h('h3', 'Information your browser sends automatically'),
  p(
    'When any browser opens any website, it sends a few technical details so the page can load. Ours receives the usual ones: the address you asked for, the time of the request, the kind of browser and device you use, the language your device is set to, and the country-level network address that sent the request. These show up in our server logs and are used only to keep the website online and safe. We delete them on a rolling fourteen-day cycle.',
  ),

  h('h3', 'Information we choose not to collect'),
  ul([
    'We do not set advertising cookies or cross-site tracking cookies.',
    'We do not run analytics on your behaviour inside the site.',
    'We do not fingerprint your browser, canvas, or audio stack.',
    'We do not embed third-party video, font, or image hosts that could log your visit on the side.',
    'We do not use heatmaps, session recorders, or scroll trackers.',
    'We do not buy visitor data from brokers, list providers, or ad exchanges.',
  ]),
  p(
    'A build-time check in our code, called no-third-party.mjs, scans the finished site before it is published and blocks the release if any third-party runtime call is found. This is not only a promise. It is a test that must pass before anyone can ship.',
  ),

  h('h2', 'Cookies and similar storage'),
  p(
    'A cookie is a small piece of text that a website asks your browser to keep so it can remember a setting next time. This site uses the fewest cookies we can.',
  ),
  p(
    'We set one first-party preference cookie called NEXT_LOCALE. It holds the code for the language you chose (for example "en" for English, "ar" for Arabic, or "zh-CN" for Simplified Chinese). It has no personal detail in it. It lasts for one year unless you clear it. You can erase it any time through your browser’s privacy settings and the site will continue to work.',
  ),
  p(
    'We do not set any other cookies of our own. We also do not let outside parties set cookies on our pages, because no outside parties are loaded.',
  ),

  h('h2', 'The lawful reasons we rely on'),
  p(
    'Under European law (the GDPR), Canadian law (PIPEDA), and similar rules in other places, a company needs a lawful reason to handle personal data. We rely on only three reasons, depending on what you are doing.',
  ),
  ul([
    'Your consent — when you write to us through the contact form or apply for a job, you are giving us permission to read and reply.',
    'A legitimate interest in keeping the website running, safe, and free of abuse, which is why we keep short server logs.',
    'A legal duty, when a court order or a regulator formally requires us to produce a record we already hold.',
  ]),

  h('h2', 'How long we keep things'),
  ul([
    'Contact-form messages: kept while we are replying, then archived for up to twenty-four months for record keeping, then deleted.',
    'Server logs: kept for fourteen days, then deleted.',
    'Job applications: kept until the role is closed or for twelve months, whichever comes first.',
    'Newsletter-type messages: we do not have a newsletter, so we keep nothing for this reason.',
    'Backups: our encrypted backups roll every thirty days. Older backups are overwritten automatically.',
  ]),

  h('h2', 'Where your information lives'),
  p(
    'Our servers sit inside Alberta, Canada, in a named datacentre we rent from our hosting partner. Email passes through our self-hosted mail server on the same network, protected with TLS. There is no content delivery network in front of the website, so when the page loads in your browser it is speaking directly to our machine and nothing in the middle.',
  ),
  p(
    'If you are writing to us from outside Canada, your message will travel to Canada to be read. We treat that message with the same care we would for a person sending it from next door. Canada is a country recognised by the European Union as offering an "adequate" level of data protection, so personal data sent from the European Economic Area or the United Kingdom moves under that adequacy decision.',
  ),

  h('h2', 'Who gets to see your information'),
  p(
    'Only the small number of employees and contractors who need to read your message or fix the servers can see it. Every person with access signs a confidentiality commitment as part of their employment contract. We never rent, sell, or lend your information to anyone.',
  ),
  p(
    'We rely on a very short list of service providers to run the site. Each one is listed on our trust page with the purpose it serves, what data it touches, and where it runs. We do not hand your personal data to advertisers, data brokers, or marketing networks — because we do not work with any.',
  ),

  h('h2', 'How we keep your information safe'),
  ul([
    'All pages and forms run over TLS 1.3 with modern ciphers.',
    'Our databases are encrypted on disk and in our rotating backups.',
    'Admin access to the site sits behind a short list of approved internet addresses, enforced at the proxy.',
    'Every code change passes through review, automated tests, and an accessibility scan before it goes live.',
    'Secrets such as passwords and API keys are held in a password-protected vault, never inside source code.',
    'We run internal penetration tests before every major release and keep a private bug-bounty contact for outside researchers.',
  ]),

  h('h2', 'Your rights and choices'),
  p(
    'No matter where you live, we honour the following requests for anyone who has contacted us:',
  ),
  ul([
    'Access — ask what we hold about you and get a plain-text copy within thirty days.',
    'Correction — ask us to fix a detail that is wrong.',
    'Deletion — ask us to erase your data, subject to any short legal holds we must follow.',
    'Portability — ask us to send you a machine-readable copy of your data.',
    'Objection — ask us to stop processing your data for a given reason.',
    'Withdraw consent — take back permission you earlier gave us.',
    'Complain — bring a concern to your local privacy regulator.',
  ]),
  p(
    'To use any of these rights, send an email to privacy@intelligentsingularityinc.com from the address you used when you first contacted us. We reply within three working days and complete the request within thirty days. There is no charge for any of these steps.',
  ),

  h('h2', 'Children and young people'),
  p(
    'This website is meant for a general audience aged thirteen and up. We do not knowingly collect personal data from children under thirteen. If a parent or guardian believes we have received data from a child under that age, please write to privacy@intelligentsingularityinc.com and we will delete it as soon as we can confirm the request.',
  ),

  h('h2', 'If something goes wrong'),
  p(
    'If we ever learn that someone’s personal data was seen by a person who should not have seen it, we act fast. Inside one working day, we start an investigation and lock down the affected systems. Inside seventy-two hours, we tell the affected users and the right privacy regulator, with the plain facts of what happened, what we did, and what you can do next. We then publish a public note on this website once the investigation is finished.',
  ),

  h('h2', 'Automated decisions'),
  p(
    'We do not use machine learning or other automated systems on this website to make decisions that have a legal or similarly important effect on you. If our product sites begin to use automated decision-making in a way that could affect you personally, those sites will explain that directly on the sign-up flow.',
  ),

  h('h2', 'Links to other websites'),
  p(
    'Our pages link out to our family of product sites, to reference sources such as the International Telecommunication Union, and to partner organisations we admire. Each of those sites runs on its own terms and its own privacy rules. When you follow a link, please read the destination site’s notice before sharing anything personal.',
  ),

  h('h2', 'Regional notes'),
  h('h3', 'If you live in the European Economic Area or the United Kingdom'),
  p(
    'Our data controller for your personal data is Intelligent Singularity Inc. You may contact our privacy office at privacy@intelligentsingularityinc.com. If your question is not fully answered, you may contact your national data-protection authority.',
  ),
  h('h3', 'If you live in Canada'),
  p(
    'You may send a privacy concern to the Office of the Privacy Commissioner of Canada after first writing to us.',
  ),
  h('h3', 'If you live in the United States'),
  p(
    'Residents of states with local privacy laws (for example California, Colorado, Virginia, and Connecticut) have the same rights listed above. We do not sell personal information, so there is nothing to opt out of on that point; we list it here for clarity.',
  ),
  h('h3', 'If you live anywhere else'),
  p(
    'We apply the same rights to every user, on every continent. Equal treatment is part of our company mission.',
  ),

  h('h2', 'Changes to this policy'),
  p(
    'If we ever change the way we handle your information, we update this page, change the "Last updated" date at the bottom, and, where the change is large, publish a short summary on our homepage banner. We do not change the meaning of the policy in a quiet or hidden way.',
  ),

  h('h2', 'Contact us'),
  p(
    'The simplest way to reach us is through the form at /contact. If you would prefer an email, write to privacy@intelligentsingularityinc.com. For legal service of notices, write to legal@intelligentsingularityinc.com. We reply in English by default and can reply in any of the fourteen languages this site already speaks.',
  ),
  p(
    'Thank you for reading. Treating you well starts with telling you the truth in a voice you can follow.',
  ),
]);

// ──────────────────────────────────────────────────────────────────────────────
// Terms of Service
// ──────────────────────────────────────────────────────────────────────────────
const TERMS = doc([
  p(
    'These Terms of Service are the agreement between you and Intelligent Singularity Inc. for using this website. They are written in plain English so you can follow them without a law degree. By opening any page on intelligentsingularityinc.com you agree to the rules below.',
  ),
  p(
    'Our individual products — for example our healthcare, invoicing, payments, trading, or farm software — each live on their own domain and carry their own product terms, which are designed to match what that product actually does. If you sign up for a product, the product’s terms take priority over these site terms for that product only.',
  ),

  h('h2', 'The short version'),
  ul([
    'You may read, browse, bookmark, and share our pages.',
    'You may quote short passages with a credit and a link back.',
    'You may not try to break the site, scrape it in bulk, or copy it as your own brand.',
    'We own the text, layouts, photos, and drawings we created. You own yours.',
    'We do our best to keep everything accurate, but we cannot promise it is perfect.',
    'We may update these terms. If we do, we put the date at the bottom.',
  ]),

  h('h2', 'Who can use the website'),
  p(
    'You can use this website if you are at least thirteen years old and able to enter into a binding agreement in the place where you live. If you are younger, please ask an adult to read the page with you. If you are using the site on behalf of a company, school, or government body, you confirm that you have permission to accept these terms on that organisation’s behalf.',
  ),

  h('h2', 'Permitted uses'),
  p(
    'You may do the following without asking first:',
  ),
  ul([
    'Read any public page, in any language we offer.',
    'Save a page as a bookmark or print it for your own reference.',
    'Share a link to one of our pages on social media, email, or chat.',
    'Quote a sentence or paragraph in an article, blog post, study, or lesson plan, as long as you credit Intelligent Singularity Inc. and link back to the source page.',
    'Run standard accessibility tools such as screen readers, keyboard navigation, and reader-mode views.',
    'Archive the site for non-commercial research through a well-known public archive.',
  ]),

  h('h2', 'Things you agree not to do'),
  ul([
    'Do not run automated scrapers, spiders, or bulk downloaders against the site in a way that interferes with its operation or ignores our robots.txt file.',
    'Do not attempt to break into, reverse engineer, or damage any part of the site or the servers it runs on.',
    'Do not upload, post, or submit content that is unlawful, abusive, harassing, defamatory, obscene, hateful, infringing, or threatening.',
    'Do not pretend to be another person, company, or public figure.',
    'Do not use the website to distribute malware, phishing pages, or spam.',
    'Do not repackage or resell our content as your own product or training material without written permission.',
    'Do not bypass region, language, or access controls we have set up for legal reasons.',
  ]),

  h('h2', 'Intellectual property'),
  p(
    'Everything original on this website — the text, the page layouts, the brand marks, the illustrations, the audio, the video, and the source code we created — is owned by Intelligent Singularity Inc. and protected by copyright, trademark, and design rights in Canada and around the world.',
  ),
  p(
    'A few parts carry their own open-source or Creative Commons licences. Where they do, the page explains the licence clearly. Anything not marked as openly licensed is covered by the general rule above.',
  ),
  p(
    'If you would like to reproduce a whole page, translate it for a public project, or use our brand mark in a presentation, please write to legal@intelligentsingularityinc.com with a short description. We reply quickly and are often happy to say yes.',
  ),

  h('h2', 'Our brand'),
  p(
    '"Intelligent Singularity", our infinity logo, and the names of the products inside our family are trademarks of Intelligent Singularity Inc. You may refer to our products by name in news, reviews, lessons, and academic writing. You may not use our logo on your own product, put it in an advertisement, or imply that we endorse something we have not endorsed.',
  ),

  h('h2', 'User-submitted content'),
  p(
    'If you send us a message, a CV, a suggestion, or a survey answer, you keep ownership of what you sent. You grant us a limited, royalty-free permission to read it, reply to it, act on it internally, and, where a suggestion is used, to build on it. We do not publish messages without your consent.',
  ),
  p(
    'Please do not send us confidential information, trade secrets, or ideas you wish to keep secret. If you are unsure whether to send something, write to legal@intelligentsingularityinc.com first and we will set up the right kind of agreement.',
  ),

  h('h2', 'Third-party links'),
  p(
    'Some pages link to websites owned by others — our family of product sites, research institutions like the International Telecommunication Union, open-source communities, and partner organisations. Those sites are run by other people, under other terms and other privacy rules. We are not responsible for what you find there. Please read the destination site’s own terms before acting on what you read.',
  ),

  h('h2', 'Accuracy and availability'),
  p(
    'We work hard to make this website accurate, clear, and up to date. We also know software is never perfect. We do not guarantee that every page is always online, that every number is always current, or that every translation is word-for-word. Where a figure matters (for example an ITU statistic) we link to the source so you can check the latest number yourself.',
  ),
  p(
    'From time to time we take the site down for maintenance. We try to give notice on /status before we do, but sometimes we have to act quickly to keep things secure. Short outages are a normal part of running good software.',
  ),

  h('h2', 'Feedback, bug reports, and security reports'),
  p(
    'Kind feedback is always welcome. Security reports are especially appreciated. If you find a weakness in how the site handles data, please write to security@intelligentsingularityinc.com. We answer within one working day, work with you to fix the issue, and credit you by name in the public advisory once it is patched (unless you prefer to stay anonymous).',
  ),

  h('h2', 'Suspension and termination'),
  p(
    'If someone uses the site in a way that harms other users, breaks the law, or breaks these terms, we may block that access, either for a short time or permanently. Where the abuse is serious we may report it to the right authorities. Where it is a genuine mistake we will usually send a warning and ask for a quick change in behaviour first.',
  ),

  h('h2', 'Disclaimers'),
  p(
    'This website is provided "as is" and "as available". To the fullest extent allowed by law, we disclaim implied promises that the site will meet a particular purpose, be free of every bug, or work with every device. Nothing in this section limits your consumer rights under the laws that apply where you live.',
  ),

  h('h2', 'Limitation of liability'),
  p(
    'Except where the law does not allow us to, our total responsibility for any claim linked to your use of this website is limited to one hundred Canadian dollars. We are not responsible for indirect losses, lost profits, or lost data that result from using or not being able to use this public corporate site.',
  ),
  p(
    'This limit does not apply to personal injury caused by our negligence, to fraud, or to any right you have under mandatory local law.',
  ),

  h('h2', 'Indemnity'),
  p(
    'You agree to cover reasonable legal costs we face if a claim is brought against us because of your own unlawful or abusive use of the site. This is a standard clause. It does not apply to normal, honest use, and it does not take away our duty to defend claims ourselves when we are at fault.',
  ),

  h('h2', 'Governing law and how disputes are handled'),
  p(
    'These terms are governed by the laws of the Province of Alberta and the federal laws of Canada that apply there. Disputes linked to this website will be heard by the courts located in Calgary, Alberta, unless the law where you live requires another forum.',
  ),
  p(
    'Before turning to court, please write to legal@intelligentsingularityinc.com and give us a reasonable chance to sort things out directly. In our experience, a five-minute conversation settles most concerns.',
  ),

  h('h2', 'Export and sanctions compliance'),
  p(
    'You agree to use this site in a way that follows the export-control and trade-sanctions laws that apply to you. We do not knowingly offer services to persons or places on a current sanctions list.',
  ),

  h('h2', 'Changes to these terms'),
  p(
    'As our products and our company grow, these terms may need small updates. When we change something that affects your rights, we update the "Last updated" date below and, for large changes, publish a short summary on the homepage banner for at least thirty days. Continuing to use the site after a change means you accept the new version.',
  ),

  h('h2', 'The rest of the fine print'),
  ul([
    'If a court finds one paragraph of these terms unenforceable, the rest of the terms still apply.',
    'A delay in enforcing a right does not waive that right.',
    'You may not transfer your rights or duties under these terms to anyone else without our written agreement; we may transfer ours as part of a normal business reorganisation.',
    'Notices to you are given on this website, in your dashboard (for products that have one), or to the email address you gave us.',
    'Notices to us should be sent to legal@intelligentsingularityinc.com and to our registered office in Alberta.',
  ]),

  h('h2', 'Contact'),
  p(
    'Questions about these terms? Write to legal@intelligentsingularityinc.com or use the form at /contact. We answer in plain English and we answer quickly.',
  ),
]);

// ──────────────────────────────────────────────────────────────────────────────
// Accessibility Statement
// ──────────────────────────────────────────────────────────────────────────────
const ACCESSIBILITY = doc([
  p(
    'Accessibility is not a feature we add at the end. It is the first rule we write by. Intelligent Singularity builds software meant to serve every human being, which means every human being must be able to read the page, press the button, fill in the form, and hear the result — whatever device they are using and whatever ability they have.',
  ),
  p(
    'This statement explains the standard we follow, how we test ourselves against it, what we have already done, what we know is not finished, and how to tell us when something is wrong.',
  ),

  h('h2', 'Our target standard'),
  p(
    'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA across every public page of this website, and to reach Level AAA on text contrast whenever the typography allows. Where a local rule is stricter than WCAG — for example the European Accessibility Act, the United Kingdom Equality Act, or the Accessible Canada Act — we follow that stricter rule as well.',
  ),

  h('h2', 'What that standard means in practice'),
  ul([
    'Every page uses semantic HTML first. ARIA is added only when the meaning would otherwise be missed.',
    'Every interactive element works from the keyboard, in a predictable order, with a visible focus outline that never hides under other elements.',
    'Every page ships a "skip to content" link as its first focusable item.',
    'Body text meets a contrast ratio of at least 7:1 against the background. Small supporting labels meet at least 4.5:1.',
    'All colour is designed to be understood even if it is read as greyscale. Meaning is never carried by colour alone.',
    'All motion honours the "prefers-reduced-motion" setting in your operating system, so animations pause when you ask them to.',
    'All forms use real labels connected to real inputs, with clear error messages and helpful hints underneath, and no placeholder-as-label patterns.',
    'All images used for meaning ship with concise alternative text. Images that are purely decorative are hidden from screen readers.',
    'All videos and audio clips carry captions and transcripts in every language the page is offered in.',
    'All fourteen languages we ship on day one render with fonts that include the full script, with no glyph fallbacks in the middle of a word.',
    'Right-to-left languages (Arabic and Urdu) are rendered in a proper RTL layout, not flipped or mirrored Latin blocks.',
  ]),

  h('h2', 'How we test'),
  p(
    'Every code change runs an automated accessibility scan, called axe-core, inside our continuous integration pipeline. If a single violation is found, the change cannot be merged.',
  ),
  p(
    'Before every major release we also run manual tests with three screen readers (one on each major desktop and mobile operating system), with keyboard-only navigation, with the operating system set to 200 percent text size, and with high-contrast mode turned on. We record the recordings internally so our engineers can watch what a blind or low-vision visitor actually experiences.',
  ),
  p(
    'Twice a year we hire an external accessibility reviewer who is a daily screen-reader user. Their report is published on /insights and the issues they raise become the first items in the next release plan.',
  ),

  h('h2', 'What works well today'),
  ul([
    'Full keyboard operation on every page.',
    'Visible focus on every interactive element.',
    'Zero automated axe-core violations on the current build.',
    'Full support for browser-level zoom to 400 percent without horizontal scrolling.',
    'Full support for reader mode, print mode, and dark-to-light operating system switches.',
    'Fourteen shipping languages with per-script typography.',
  ]),

  h('h2', 'What we are still improving'),
  p(
    'Honest accessibility work is never finished. These are the items we know about and are working on right now:',
  ),
  ul([
    'Adding audio description tracks to the small number of product trailer videos on partner domains.',
    'Adding long-form alternative text for the few infographics that summarise complex statistics, so they are also readable as a structured table.',
    'Moving our sign-language introduction (for the about page) out of draft and onto production.',
    'Continuing to widen the pool of external accessibility testers to include neurodivergent users and users with motor impairments.',
  ]),

  h('h2', 'Assistive technologies we test with'),
  ul([
    'Screen readers on desktop and mobile operating systems used by most of our global audience.',
    'Speech-to-text dictation and voice control tools on those same platforms.',
    'Switch access controllers used by people with limited hand movement.',
    'Magnifiers, high-contrast themes, and custom colour filters in modern browsers.',
  ]),

  h('h2', 'Low bandwidth and old devices'),
  p(
    'Accessibility also means being able to load the page at all. Every route on this site is designed to fit inside a fifty-kilobyte first-paint budget, gzipped, so it works on a slow mobile connection and on a phone that is five years old or more. Where a page must load something heavier, it loads on demand and only after you ask for it.',
  ),

  h('h2', 'Report an accessibility problem'),
  p(
    'If you hit a barrier of any kind — a missing label, a trap, a contrast problem, a feature that does not work with your assistive tool — please write to accessibility@intelligentsingularityinc.com with the page address and a short description of what went wrong. You may attach a recording or screenshot if that is easier.',
  ),
  p(
    'We reply within two working days and treat accessibility reports as high-priority bugs. When a fix is shipped, we credit the reporter in the release notes unless they prefer to stay anonymous.',
  ),

  h('h2', 'Alternative channels'),
  p(
    'If the form is not an option for you, we welcome contact by email, by telephone, or by letter. Details are on the /contact page. Every channel is read by the same small team.',
  ),

  h('h2', 'Your legal rights'),
  p(
    'Accessibility is both a moral commitment and a legal requirement in many places where we operate. If you believe a part of this website does not meet the law that applies where you live, you may contact your national accessibility regulator. Please consider writing to us first so we can fix the issue quickly.',
  ),
]);

// ──────────────────────────────────────────────────────────────────────────────
// Cookie Policy
// ──────────────────────────────────────────────────────────────────────────────
const COOKIES = doc([
  p(
    'Cookies are tiny pieces of text that websites ask your browser to keep so they can remember small settings from one visit to the next. This page tells you the full truth about the cookies and other small storage that Intelligent Singularity uses on intelligentsingularityinc.com.',
  ),
  p(
    'We wrote this page to be boring on purpose. A good cookie story should not surprise anyone.',
  ),

  h('h2', 'The short version'),
  ul([
    'We use one cookie, called NEXT_LOCALE, to remember your language.',
    'We do not use advertising cookies. We do not use analytics cookies. We do not use tracking pixels.',
    'No outside company sets cookies on these pages, because no outside companies are loaded on these pages.',
    'You may clear every cookie at any time through your browser’s settings and the site will still work.',
  ]),

  h('h2', 'The full list, in one table'),
  h('h3', 'NEXT_LOCALE  —  First-party preference cookie'),
  p(
    'Purpose: remembers the ISO code of the language you chose last time (for example "en" for English, "ar" for Arabic, or "zh-CN" for Simplified Chinese), so the next page opens in the same language.',
  ),
  p(
    'Contents: a short letter-and-hyphen string. Nothing personal. No identifier we can link back to you.',
  ),
  p(
    'Lifetime: one year, then it expires by itself. It is also re-set when you pick a new language.',
  ),
  p(
    'Flags: SameSite=Lax; Secure in production. Never sent to any third party.',
  ),

  h('h2', 'Things we purposely do not set'),
  ul([
    'No advertising cookies. The site shows no ads.',
    'No cross-site tracking cookies.',
    'No third-party analytics cookies (we do not run analytics of any kind on this site).',
    'No social-media embed cookies. We link out to social platforms instead of embedding them.',
    'No A/B-testing cookies. We test our ideas with real people in research sessions, not silently in production.',
    'No heatmap, session-replay, or behavioural cookies.',
  ]),

  h('h2', 'Other kinds of storage'),
  p(
    'Some websites use local storage, session storage, or the IndexedDB database to save larger information on your device. We do not use any of these on the corporate website. Our product sites may use them to keep you signed in or to store offline drafts; those product sites say so plainly on their own cookie pages.',
  ),

  h('h2', 'Is a consent banner needed?'),
  p(
    'Consent banners are required when a website uses cookies that are not strictly necessary. The single preference cookie we set is strictly necessary to remember your language, a right supported by accessibility law. No other cookies are set. Because of that, we do not show a consent pop-up — showing one would be theatre, not protection.',
  ),
  p(
    'If we ever add a cookie that is not strictly necessary, we will ask for your consent before it is set, with a clear choice to accept or decline, and the same default for every country.',
  ),

  h('h2', 'How to clear cookies and storage'),
  p(
    'Every modern browser lets you clear cookies for one website or for all sites, either one at a time or all at once. If you delete the NEXT_LOCALE cookie, the site returns to the default language on your next visit. Nothing else changes.',
  ),

  h('h2', 'Do Not Track and Global Privacy Control'),
  p(
    'Because we set no tracking cookies, there is nothing for a Do Not Track or Global Privacy Control signal to disable. If you send one, we honour the spirit of it automatically, by not tracking you at all.',
  ),

  h('h2', 'Questions'),
  p(
    'If you would like more detail than this page gives, write to privacy@intelligentsingularityinc.com. We reply in plain English, quickly, and in any language this website already speaks.',
  ),
]);

export const LEGAL_SEED = [
  { slug: 'privacy', title: 'Privacy Policy', body: PRIVACY, lastUpdated: '2026-04-26' },
  { slug: 'terms', title: 'Terms of Service', body: TERMS, lastUpdated: '2026-04-26' },
  { slug: 'accessibility', title: 'Accessibility Statement', body: ACCESSIBILITY, lastUpdated: '2026-04-26' },
  { slug: 'cookies', title: 'Cookie Policy', body: COOKIES, lastUpdated: '2026-04-26' },
];
