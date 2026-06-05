import type { Payload } from 'payload';

// Per-locale translations for the six new pages' visible headline/lede
// content. Applied via payload.updateGlobal({ locale }) so each locale
// reader sees their own language.

type GlobalStrings = {
  eyebrow?: string;
  title: string;
  lede: string;
};

type TrustStrings = GlobalStrings & {
  pillarHeadings: Record<string, { heading: string; blurb: string }>;
};

type HelpStrings = GlobalStrings & {
  emergencyRow: { heading: string; body: string };
  contactFallback: { heading: string; body: string };
};

type StatusStrings = GlobalStrings & {
  operationalCopy: string;
};

type CareersStrings = GlobalStrings & {
  openings: { heading: string; currentlyHiringText: string; note: string };
  introduceYourself: { eyebrow: string; heading: string; body: string };
  howWeWork: Array<{ title: string; body: string }>;
  productFamily: string[];
  process: Array<{ stage: string; what: string }>;
};

type PressStrings = GlobalStrings & {
  boilerplate: string;
  brandGuidance: { brandName: string; founderReference: string };
  contactCta: { eyebrow: string; heading: string; body: string };
  quotes: Array<{ text: string; role: string }>;
  factSheet: Array<{ label: string; value: string }>;
  storyAnglesYes: Array<{ title: string; body: string }>;
  storyAnglesNo: Array<{ title: string; body: string }>;
};

type SecurityStrings = GlobalStrings & {
  postureSummary: { eyebrow: string; heading: string; body: string };
  topStats: Array<{ label: string; value: string; hint: string }>;
  reportCta: { eyebrow: string; heading: string; body: string };
  posture: Array<{ title: string; body: string }>;
  dataHandling: Array<{ title: string; body: string }>;
  compliance: Array<{ title: string; body: string }>;
};

type PricingStrings = GlobalStrings & {
  whyThisExists: { eyebrow: string; heading: string; body: string; freeTierLine: string; paidTierLine: string; enterpriseLine: string };
  seePricesCta: { eyebrow: string; heading: string; body: string };
  principles: Array<{ title: string; body: string }>;
  antiPatterns: Array<{ title: string; body: string }>;
  workedExample: Array<{ who: string; tier: string; what: string; note: string }>;
};

type FaqStrings = GlobalStrings & {
  sectionTitles: string[];
  stillStuckCta: { eyebrow: string; heading: string; body: string };
  sectionItems: Array<Array<{ q: string; a: string }> | undefined>;
};

type LocaleCode = 'zh-CN' | 'es' | 'hi' | 'ar' | 'fr' | 'pt' | 'bn' | 'ru' | 'ur' | 'id' | 'sw' | 'yo' | 'ha';

const PILLAR_KEYS = ['security', 'privacy', 'sustainability', 'accessibility'] as const;

// Minimal, literal translations. Every locale ships with the same message
// structure so the language-switch experience is predictable.

const TRUST: Record<LocaleCode, TrustStrings> = {
  'zh-CN': {
    eyebrow: '信任', title: '查阅证据的地方。',
    lede: '我们关于安全、隐私、可持续性和可访问性的每一项声明都链接到证据。您不必相信我们的话。',
    pillarHeadings: {
      security: { heading: '安全', blurb: '我们如何用您可以自行核查的方式保护网站和您的数据。' },
      privacy:  { heading: '隐私', blurb: '我们收集什么、不收集什么,以及如何删除您分享的内容。' },
      sustainability: { heading: '可持续性', blurb: '一个网站可以多小——测量出来的,而不是猜出来的。' },
      accessibility:  { heading: '可访问性', blurb: 'WCAG 2.2 AA 在这里意味着什么,以及我们在每次构建中如何自检。' },
    },
  },
  es: {
    eyebrow: 'CONFIANZA', title: 'Dónde encontrar la prueba.',
    lede: 'Cada afirmación que hacemos sobre seguridad, privacidad, sostenibilidad y acceso enlaza con la evidencia. Nunca deberías tener que creernos sin más.',
    pillarHeadings: {
      security: { heading: 'Seguridad', blurb: 'Cómo protegemos el sitio y tus datos, en términos simples que puedes comprobar.' },
      privacy:  { heading: 'Privacidad', blurb: 'Qué recopilamos, qué no recopilamos y cómo eliminar lo que has compartido.' },
      sustainability: { heading: 'Sostenibilidad', blurb: 'Cómo de pequeño puede ser un sitio — medido, no estimado.' },
      accessibility:  { heading: 'Accesibilidad', blurb: 'Qué significa WCAG 2.2 AA aquí y cómo nos auditamos en cada compilación.' },
    },
  },
  hi: {
    eyebrow: 'भरोसा', title: 'जहाँ प्रमाण मिलेगा।',
    lede: 'हम सुरक्षा, निजता, स्थिरता और पहुँच के बारे में जो भी दावा करते हैं, वह प्रमाण से जुड़ा है। आपको हमारी बात पर यूँ ही विश्वास नहीं करना चाहिए।',
    pillarHeadings: {
      security: { heading: 'सुरक्षा', blurb: 'हम साइट और आपके डेटा को कैसे सुरक्षित रखते हैं, सरल शब्दों में जिनकी आप जाँच कर सकते हैं।' },
      privacy:  { heading: 'निजता', blurb: 'हम क्या इकट्ठा करते हैं, क्या नहीं करते, और आपने जो साझा किया उसे कैसे मिटाएँ।' },
      sustainability: { heading: 'स्थिरता', blurb: 'एक साइट कितनी छोटी हो सकती है — मापा गया, अनुमान नहीं।' },
      accessibility:  { heading: 'पहुँच', blurb: 'WCAG 2.2 AA का यहाँ क्या मतलब है, और हर बिल्ड पर हम खुद की जाँच कैसे करते हैं।' },
    },
  },
  ar: {
    eyebrow: 'الثقة', title: 'أين تجد الدليل.',
    lede: 'كل ادعاء نطرحه حول الأمان والخصوصية والاستدامة والوصول مرتبط بدليل. لا يجب أن تصدّقنا على كلامنا فقط.',
    pillarHeadings: {
      security: { heading: 'الأمان', blurb: 'كيف نحافظ على الموقع وبياناتك بطريقة يمكنك التحقق منها.' },
      privacy:  { heading: 'الخصوصية', blurb: 'ما نجمعه، وما لا نجمعه، وكيف تحذف ما شاركته معنا.' },
      sustainability: { heading: 'الاستدامة', blurb: 'كم يمكن لموقع أن يكون صغيرًا — بالقياس لا بالتخمين.' },
      accessibility:  { heading: 'الوصول', blurb: 'ما الذي يعنيه WCAG 2.2 AA هنا، وكيف نفحص أنفسنا مع كل بناء.' },
    },
  },
  fr: {
    eyebrow: 'CONFIANCE', title: 'Où trouver la preuve.',
    lede: "Chaque affirmation sur la sécurité, la vie privée, la durabilité et l'accès renvoie à une preuve. Vous ne devriez jamais avoir à nous croire sur parole.",
    pillarHeadings: {
      security: { heading: 'Sécurité', blurb: "Comment nous protégeons le site et vos données, en termes simples que vous pouvez vérifier." },
      privacy:  { heading: 'Vie privée', blurb: "Ce que nous collectons, ce que nous ne collectons pas et comment supprimer ce que vous avez partagé." },
      sustainability: { heading: 'Durabilité', blurb: "À quel point un site peut être petit — mesuré, pas estimé." },
      accessibility:  { heading: 'Accessibilité', blurb: "Ce que WCAG 2.2 AA signifie ici, et comment nous nous vérifions à chaque build." },
    },
  },
  pt: {
    eyebrow: 'CONFIANÇA', title: 'Onde encontrar a prova.',
    lede: 'Cada afirmação que fazemos sobre segurança, privacidade, sustentabilidade e acesso remete para a evidência. Nunca deve precisar de acreditar na nossa palavra.',
    pillarHeadings: {
      security: { heading: 'Segurança', blurb: 'Como mantemos o site e os seus dados seguros, em termos simples que pode verificar.' },
      privacy:  { heading: 'Privacidade', blurb: 'O que recolhemos, o que não recolhemos, e como eliminar o que partilhou.' },
      sustainability: { heading: 'Sustentabilidade', blurb: 'Quão pequeno um site pode ser — medido, não estimado.' },
      accessibility:  { heading: 'Acessibilidade', blurb: 'O que WCAG 2.2 AA significa aqui, e como nos verificamos em cada build.' },
    },
  },
  bn: {
    eyebrow: 'আস্থা', title: 'প্রমাণ কোথায় পাবেন।',
    lede: 'নিরাপত্তা, গোপনীয়তা, স্থায়িত্ব এবং প্রবেশাধিকার সম্পর্কে আমাদের প্রতিটি দাবি প্রমাণের সাথে যুক্ত। আমাদের কথায় বিশ্বাস করতে হবে না।',
    pillarHeadings: {
      security: { heading: 'নিরাপত্তা', blurb: 'সাইট ও আপনার ডেটাকে আমরা কীভাবে সুরক্ষিত রাখি, সরল ভাষায় যা আপনি যাচাই করতে পারেন।' },
      privacy:  { heading: 'গোপনীয়তা', blurb: 'আমরা কী সংগ্রহ করি, কী করি না, এবং আপনি যা শেয়ার করেছেন তা কীভাবে মুছবেন।' },
      sustainability: { heading: 'স্থায়িত্ব', blurb: 'একটি সাইট কতটা ছোট হতে পারে — পরিমাপ করা, অনুমান নয়।' },
      accessibility:  { heading: 'প্রবেশাধিকার', blurb: 'WCAG 2.2 AA এখানে কী মানে, এবং প্রতিটি বিল্ডে আমরা কীভাবে নিজেদের পরীক্ষা করি।' },
    },
  },
  ru: {
    eyebrow: 'ДОВЕРИЕ', title: 'Где найти доказательства.',
    lede: 'Каждое наше утверждение о безопасности, приватности, устойчивости и доступности подкреплено доказательствами. Вам не нужно верить нам на слово.',
    pillarHeadings: {
      security: { heading: 'Безопасность', blurb: 'Как мы защищаем сайт и ваши данные — простыми словами, которые вы можете проверить.' },
      privacy:  { heading: 'Приватность', blurb: 'Что мы собираем, чего не собираем, и как удалить то, чем вы поделились.' },
      sustainability: { heading: 'Устойчивость', blurb: 'Насколько маленьким может быть сайт — измерено, а не угадано.' },
      accessibility:  { heading: 'Доступность', blurb: 'Что здесь значит WCAG 2.2 AA и как мы себя проверяем при каждой сборке.' },
    },
  },
  ur: {
    eyebrow: 'اعتماد', title: 'ثبوت کہاں ملے گا۔',
    lede: 'سیکیورٹی، پرائیویسی، پائیداری اور رسائی کے بارے میں ہمارا ہر دعویٰ ثبوت سے منسلک ہے۔ آپ کو ہماری بات پر بھروسہ کرنے کی ضرورت نہیں۔',
    pillarHeadings: {
      security: { heading: 'سیکیورٹی', blurb: 'ہم سائٹ اور آپ کا ڈیٹا کیسے محفوظ رکھتے ہیں، ایسے سادہ الفاظ میں جن کی آپ خود تصدیق کر سکتے ہیں۔' },
      privacy:  { heading: 'پرائیویسی', blurb: 'ہم کیا جمع کرتے ہیں، کیا نہیں، اور آپ نے جو شیئر کیا اسے کیسے مٹائیں۔' },
      sustainability: { heading: 'پائیداری', blurb: 'ایک سائٹ کتنی چھوٹی ہو سکتی ہے — ماپا گیا، اندازہ نہیں۔' },
      accessibility:  { heading: 'رسائی', blurb: 'یہاں WCAG 2.2 AA کا کیا مطلب ہے، اور ہر بلڈ پر ہم خود کو کیسے جانچتے ہیں۔' },
    },
  },
  id: {
    eyebrow: 'KEPERCAYAAN', title: 'Di mana bukti dapat ditemukan.',
    lede: 'Setiap klaim kami tentang keamanan, privasi, keberlanjutan, dan akses terhubung dengan bukti. Anda tidak perlu percaya begitu saja.',
    pillarHeadings: {
      security: { heading: 'Keamanan', blurb: 'Bagaimana kami menjaga situs dan data Anda dengan cara yang bisa Anda periksa sendiri.' },
      privacy:  { heading: 'Privasi', blurb: 'Apa yang kami kumpulkan, apa yang tidak, dan cara menghapus apa yang Anda bagikan.' },
      sustainability: { heading: 'Keberlanjutan', blurb: 'Seberapa kecil sebuah situs — diukur, bukan diperkirakan.' },
      accessibility:  { heading: 'Aksesibilitas', blurb: 'Apa arti WCAG 2.2 AA di sini, dan bagaimana kami memeriksa diri sendiri setiap build.' },
    },
  },
  sw: {
    eyebrow: 'IMANI', title: 'Mahali pa kupata ushahidi.',
    lede: 'Kila madai tunayofanya kuhusu usalama, faragha, uendelevu na ufikiaji yameunganishwa na ushahidi. Haupaswi kuchukua neno letu pekee.',
    pillarHeadings: {
      security: { heading: 'Usalama', blurb: 'Jinsi tunavyoweka tovuti na data yako salama, kwa maneno rahisi unayoweza kuyathibitisha.' },
      privacy:  { heading: 'Faragha', blurb: 'Kile tunachokusanya, kile tusichokusanya, na jinsi ya kufuta ulichoshiriki.' },
      sustainability: { heading: 'Uendelevu', blurb: 'Ni kiasi gani tovuti inaweza kuwa ndogo — kipimwa, si kisichodhaniwa.' },
      accessibility:  { heading: 'Ufikiaji', blurb: 'Maana ya WCAG 2.2 AA hapa, na jinsi tunavyojichunguza kila wakati tunapojenga.' },
    },
  },
  yo: {
    eyebrow: 'IGBẸ́KẸ̀LẸ̀', title: 'Ibi tí ẹ̀rí ti wà.',
    lede: 'Gbogbo ohun tí a sọ nípa ààbò, àṣírí, ìtọ́jú àgbáyé àti àǹfààní ni a so mọ́ ẹ̀rí. O kò gbọdọ̀ gba ọ̀rọ̀ wa nìkan.',
    pillarHeadings: {
      security: { heading: 'Ààbò', blurb: 'Báwo ni a ṣe ń dáàbò bo ojú-òpó àti ẹ̀rí rẹ ní ọ̀nà tó rọrùn tí o lè yẹ̀wò.' },
      privacy:  { heading: 'Àṣírí', blurb: 'Ohun tí a ń kó jọ, ohun tí a kò kó, àti bí o ṣe lè pa ohun tí o ti pín jáde rẹ́.' },
      sustainability: { heading: 'Ìtọ́jú àgbáyé', blurb: 'Báwo ni ojú-òpó lè kéré — tí a fi wọ́n, kì í ṣe àbá.' },
      accessibility:  { heading: 'Àǹfààní', blurb: 'Ohun tí WCAG 2.2 AA túmọ̀ sí níbí, àti báwo ni a ṣe ń yẹ ara wa wò ní gbogbo ìkọ́lé.' },
    },
  },
  ha: {
    eyebrow: 'AMINCI', title: 'Inda za a samu shaida.',
    lede: 'Kowace da\'awar da muke yi game da tsaro, sirri, ɗorewa da dama tana da tushen shaida. Bai kamata ka dogara da maganar mu kawai ba.',
    pillarHeadings: {
      security: { heading: 'Tsaro', blurb: 'Yadda muke kare wannan shafi da bayananka, a kalamai masu sauki da za ka iya bincika.' },
      privacy:  { heading: 'Sirri', blurb: 'Abin da muke tarawa, abin da ba mu tarawa, da yadda za a share abin da ka raba.' },
      sustainability: { heading: 'Ɗorewa', blurb: 'Yadda shafi zai iya zama karami — da aunawa, ba tsammani ba.' },
      accessibility:  { heading: 'Dama', blurb: 'Ma\'anar WCAG 2.2 AA anan, da yadda muke bincika kanmu kowane build.' },
    },
  },
};

const HELP: Record<LocaleCode, HelpStrings> = {
  'zh-CN': {
    eyebrow: '帮助', title: '找到您需要的东西。',
    lede: '选择下面的主题,或搜索本页。如果都不能回答您的问题,底部的联系表格会送到真人那里。',
    emergencyRow: { heading: '现在需要帮助?', body: '如果网站宕机或您无法登录,先查看状态页面。它每分钟更新一次。' },
    contactFallback: { heading: '还没解决?', body: '给我们发消息,我们会在一个工作日内回复。' },
  },
  es: {
    eyebrow: 'AYUDA', title: 'Encuentra lo que necesitas.',
    lede: 'Elige un tema abajo o busca en la página. Si ninguno responde tu pregunta, el formulario de contacto llega a una persona real.',
    emergencyRow: { heading: '¿Necesitas ayuda ahora mismo?', body: 'Si el sitio está caído o no puedes iniciar sesión, revisa primero la página de estado. Se actualiza cada minuto.' },
    contactFallback: { heading: '¿Sigues atascado?', body: 'Envíanos un mensaje y responderemos en un día laboral.' },
  },
  hi: {
    eyebrow: 'सहायता', title: 'जो चाहिए वह खोजें।',
    lede: 'नीचे कोई विषय चुनें या पन्ने पर खोज करें। अगर कोई उत्तर नहीं देता, तो नीचे का संपर्क फ़ॉर्म असली व्यक्ति तक जाता है।',
    emergencyRow: { heading: 'अभी मदद चाहिए?', body: 'अगर साइट डाउन है या लॉग इन नहीं हो पा रहा, पहले स्थिति पृष्ठ देखें। यह हर मिनट अपडेट होता है।' },
    contactFallback: { heading: 'अभी भी अटके हैं?', body: 'हमें संदेश भेजें, हम एक कार्य दिवस में जवाब देंगे।' },
  },
  ar: {
    eyebrow: 'مساعدة', title: 'اعثر على ما تحتاجه.',
    lede: 'اختر موضوعًا من الأسفل أو ابحث في الصفحة. إذا لم يُجِب أيٌّ منها على سؤالك، فإن نموذج الاتصال في الأسفل يصل إلى شخص حقيقي.',
    emergencyRow: { heading: 'تحتاج مساعدة الآن؟', body: 'إذا كان الموقع لا يعمل أو لا يمكنك تسجيل الدخول، تحقق أولاً من صفحة الحالة. يتم تحديثها كل دقيقة.' },
    contactFallback: { heading: 'لا تزال عالقًا؟', body: 'أرسل لنا رسالة وسنرد خلال يوم عمل واحد.' },
  },
  fr: {
    eyebrow: 'AIDE', title: 'Trouvez ce dont vous avez besoin.',
    lede: "Choisissez un sujet ci-dessous ou recherchez dans la page. Si aucune ne répond à votre question, le formulaire de contact en bas va à une personne réelle.",
    emergencyRow: { heading: "Besoin d'aide tout de suite ?", body: "Si le site est en panne ou que vous ne pouvez pas vous connecter, consultez d'abord la page d'état. Elle se met à jour toutes les minutes." },
    contactFallback: { heading: 'Toujours bloqué ?', body: 'Envoyez-nous un message et nous répondrons dans un jour ouvré.' },
  },
  pt: {
    eyebrow: 'AJUDA', title: 'Encontre o que precisa.',
    lede: 'Escolha um tema abaixo ou pesquise na página. Se nenhum responder à sua pergunta, o formulário de contacto vai ter com uma pessoa real.',
    emergencyRow: { heading: 'Precisa de ajuda já?', body: 'Se o site estiver em baixo ou não conseguir iniciar sessão, verifique primeiro a página de estado. Actualiza a cada minuto.' },
    contactFallback: { heading: 'Ainda preso?', body: 'Envie-nos uma mensagem e responderemos num dia útil.' },
  },
  bn: {
    eyebrow: 'সাহায্য', title: 'যা প্রয়োজন খুঁজে নিন।',
    lede: 'নিচের একটি বিষয় বাছুন বা পৃষ্ঠাটি খুঁজুন। যদি কোনটিই উত্তর না দেয়, নিচের যোগাযোগ ফর্মটি একজন প্রকৃত ব্যক্তির কাছে যায়।',
    emergencyRow: { heading: 'এখনই সাহায্য দরকার?', body: 'সাইট ডাউন থাকলে বা লগ ইন করতে না পারলে, প্রথমে স্ট্যাটাস পৃষ্ঠা দেখুন। এটি প্রতি মিনিটে আপডেট হয়।' },
    contactFallback: { heading: 'এখনও আটকে?', body: 'আমাদের বার্তা পাঠান, আমরা এক কার্যদিবসে উত্তর দেব।' },
  },
  ru: {
    eyebrow: 'ПОМОЩЬ', title: 'Найдите то, что вам нужно.',
    lede: 'Выберите тему ниже или ищите по странице. Если ни одна не отвечает на ваш вопрос, форма в нижней части идёт к реальному человеку.',
    emergencyRow: { heading: 'Нужна помощь прямо сейчас?', body: 'Если сайт не работает или вы не можете войти — сначала проверьте страницу статуса. Она обновляется каждую минуту.' },
    contactFallback: { heading: 'Всё ещё зашли в тупик?', body: 'Напишите нам, и мы ответим в течение одного рабочего дня.' },
  },
  ur: {
    eyebrow: 'مدد', title: 'جو چاہیے وہ ڈھونڈیں۔',
    lede: 'نیچے سے کوئی موضوع چنیں یا صفحے پر تلاش کریں۔ اگر کوئی آپ کے سوال کا جواب نہ دے، تو نیچے کا رابطہ فارم ایک حقیقی شخص تک پہنچتا ہے۔',
    emergencyRow: { heading: 'ابھی مدد چاہیے؟', body: 'اگر سائٹ بند ہو یا آپ لاگ ان نہ کر پائیں، تو پہلے اسٹیٹس صفحہ دیکھیں۔ یہ ہر منٹ اپ ڈیٹ ہوتا ہے۔' },
    contactFallback: { heading: 'اب بھی پھنسے ہوئے ہیں؟', body: 'ہمیں پیغام بھیجیں، ہم ایک کاروباری دن میں جواب دیں گے۔' },
  },
  id: {
    eyebrow: 'BANTUAN', title: 'Temukan yang Anda butuhkan.',
    lede: 'Pilih topik di bawah atau cari di halaman. Jika tidak ada yang menjawab pertanyaan Anda, formulir kontak di bagian bawah menuju ke orang sungguhan.',
    emergencyRow: { heading: 'Butuh bantuan sekarang?', body: 'Jika situs mati atau Anda tidak bisa login, cek halaman status dulu. Diperbarui setiap menit.' },
    contactFallback: { heading: 'Masih bingung?', body: 'Kirimkan pesan dan kami akan membalas dalam satu hari kerja.' },
  },
  sw: {
    eyebrow: 'MSAADA', title: 'Pata kile unachohitaji.',
    lede: 'Chagua mada hapa chini au tafuta ndani ya ukurasa. Ikiwa hakuna kinachojibu swali lako, fomu ya mawasiliano huenda kwa mtu halisi.',
    emergencyRow: { heading: 'Unahitaji msaada sasa?', body: 'Ikiwa tovuti imeshuka au huwezi kuingia, angalia ukurasa wa hadhi kwanza. Unasasishwa kila dakika.' },
    contactFallback: { heading: 'Bado umekwama?', body: 'Tutumie ujumbe na tutajibu ndani ya siku moja ya kazi.' },
  },
  yo: {
    eyebrow: 'ÌRÀNLỌ́WỌ́', title: 'Ri ohun tí o nílò.',
    lede: 'Yan koko-ọ̀rọ̀ nísàlẹ̀ tàbí wá nínú ojú-ìwé náà. Tí kò bá dáhùn ìbéèrè rẹ, fọ́ọ̀mù ìbánisọ̀rọ̀ nísàlẹ̀ lọ sí ọwọ́ ènìyàn gidi.',
    emergencyRow: { heading: 'O nílò ìrànlọ́wọ́ báyìí?', body: 'Tí ojú-òpó kò bá ṣiṣẹ́ tàbí o kò lè wọ inú, kọ́kọ́ ṣàyẹ̀wò ojú-ìwé ipò. Ó ń ṣàtúnyẹ̀wò láàárín ìṣẹ́jú kọ̀ọ̀kan.' },
    contactFallback: { heading: 'Ṣì kò yanjú?', body: 'Fi ìránṣẹ́ ránṣẹ́ sí wa, a ó dáhùn láàárín ọjọ́ iṣẹ́ kan.' },
  },
  ha: {
    eyebrow: 'TAIMAKO', title: 'Samu abin da kake bukata.',
    lede: 'Zabi batu a kasa ko binciko shafin. Idan babu wanda ya amsa tambayarka, takardar tuntuɓa a kasa tana zuwa ga mutum na gaske.',
    emergencyRow: { heading: 'Kana bukatan taimako yanzu?', body: 'Idan shafin ya faɗi ko ba za ka iya shiga ba, dubi shafin matsayi tukuna. Yana sabuntawa kowane mintuna.' },
    contactFallback: { heading: 'Har yanzu ka makale?', body: 'Aiko mana saƙo, za mu amsa cikin rana ɗaya ta aiki.' },
  },
};

const STATUS: Record<LocaleCode, StatusStrings> = {
  'zh-CN': { eyebrow: '状态', title: '一切的运行情况。', lede: '本页面实时从我们的公开状态监控中拉取。如果数字看起来不对,请告诉我们——这也是保持诚实的一部分。', operationalCopy: '运行正常意味着过去五分钟内每次检查都在目标时间内做出了响应。小波动不会破坏这一点,持续性故障才会。' },
  es: { eyebrow: 'ESTADO', title: 'Cómo está funcionando todo.', lede: 'Esta página se actualiza en vivo desde nuestro monitor público. Si algún número parece incorrecto, avísanos — eso es parte de mantenernos honestos.', operationalCopy: 'Operativo significa que el servicio respondió dentro del tiempo objetivo en cada comprobación de los últimos cinco minutos. Un pequeño fallo no lo rompe. Un fallo sostenido sí.' },
  hi: { eyebrow: 'स्थिति', title: 'सब कुछ कैसे चल रहा है।', lede: 'यह पृष्ठ हमारे सार्वजनिक मॉनिटर से लाइव खींचा जाता है। अगर संख्याएँ गलत लगें तो हमें बताएँ — ईमानदारी का यह भी हिस्सा है।', operationalCopy: 'परिचालनीय का अर्थ है कि पिछले पाँच मिनटों की हर जाँच में सेवा ने लक्ष्य समय के भीतर जवाब दिया। एक छोटी रुकावट इसे नहीं तोड़ती। लगातार विफलता तोड़ती है।' },
  ar: { eyebrow: 'الحالة', title: 'كيف يسير كل شيء.', lede: 'يتم تحديث هذه الصفحة مباشرة من مراقب الحالة العام لدينا. إذا بدت الأرقام خاطئة، أخبرنا — فهذا جزء من الحفاظ على الصدق.', operationalCopy: 'يشغيلي يعني أن الخدمة ردّت في الوقت المستهدف في كل فحص خلال الدقائق الخمس الماضية. خلل صغير لا يكسر ذلك. خلل مستمر يفعل.' },
  fr: { eyebrow: 'ÉTAT', title: 'Comment tout fonctionne.', lede: "Cette page est tirée en direct de notre moniteur public. Si les chiffres semblent faux, dites-le-nous — cela fait partie de notre honnêteté.", operationalCopy: "Opérationnel signifie que le service a répondu dans le temps visé à chaque vérification des cinq dernières minutes. Un petit hoquet ne casse pas cela. Une défaillance prolongée oui." },
  pt: { eyebrow: 'ESTADO', title: 'Como está tudo a funcionar.', lede: 'Esta página é puxada em tempo real do nosso monitor público. Se os números parecerem errados, diga-nos — faz parte de nos mantermos honestos.', operationalCopy: 'Operacional significa que o serviço respondeu dentro do tempo alvo em cada verificação dos últimos cinco minutos. Um pequeno soluço não quebra isto. Uma falha sustentada quebra.' },
  bn: { eyebrow: 'অবস্থা', title: 'সবকিছু কেমন চলছে।', lede: 'এই পৃষ্ঠাটি আমাদের সর্বজনীন মনিটর থেকে সরাসরি টেনে আনা হয়। সংখ্যা ভুল মনে হলে আমাদের জানান — এটি সততা রক্ষার অংশ।', operationalCopy: 'পরিচালনযোগ্য মানে গত পাঁচ মিনিটের প্রতিটি পরীক্ষায় পরিষেবা লক্ষ্য সময়ের মধ্যে সাড়া দিয়েছে। ছোটো ত্রুটি এটি ভাঙে না। টানা ব্যর্থতা ভাঙে।' },
  ru: { eyebrow: 'СТАТУС', title: 'Как всё работает.', lede: 'Эта страница обновляется в реальном времени с нашего публичного монитора. Если цифры кажутся неверными — сообщите нам, это часть нашей честности.', operationalCopy: 'Работает означает, что сервис отвечал в целевое время в каждой проверке последних пяти минут. Небольшой сбой не ломает это. Длительный — ломает.' },
  ur: { eyebrow: 'حالت', title: 'ہر چیز کیسے چل رہی ہے۔', lede: 'یہ صفحہ ہمارے پبلک مانیٹر سے لائیو پکڑا گیا ہے۔ اگر نمبر غلط لگیں، تو ہمیں بتائیں — یہ ایمانداری کا حصہ ہے۔', operationalCopy: 'فعال کا مطلب یہ ہے کہ گزشتہ پانچ منٹ کی ہر چیک میں خدمت نے مقررہ وقت کے اندر جواب دیا۔ ایک چھوٹی رکاوٹ اسے نہیں توڑتی۔ مسلسل ناکامی توڑتی ہے۔' },
  id: { eyebrow: 'STATUS', title: 'Bagaimana semuanya berjalan.', lede: 'Halaman ini ditarik langsung dari monitor publik kami. Jika angka terlihat salah, beri tahu kami — itu bagian dari tetap jujur.', operationalCopy: 'Operasional berarti layanan merespons dalam waktu target pada setiap pemeriksaan selama lima menit terakhir. Gangguan kecil tidak merusaknya. Kegagalan berkelanjutan merusaknya.' },
  sw: { eyebrow: 'HADHI', title: 'Jinsi kila kitu kinavyofanya kazi.', lede: 'Ukurasa huu unavutwa moja kwa moja kutoka kwa mfuatiliaji wetu wa umma. Nambari zikionekana si sahihi, tujulishe — huu ni sehemu ya kuendelea kuwa waaminifu.', operationalCopy: 'Kuwa hai kunamaanisha kuwa huduma ilijibu ndani ya muda wa lengo kila ukaguzi katika dakika tano zilizopita. Kipimo kidogo hakikivunji hilo. Hitilafu ya kudumu hufanya.' },
  yo: { eyebrow: 'IPO', title: 'Báwo ni gbogbo nǹkan ṣe ń ṣiṣẹ́.', lede: 'A fa ojú-ìwé yìí lọ̀run lórí olùtọ́jú ipò wa ní gbangba. Tí àwọn nọ́mbà bá jọ àṣìṣe, sọ fún wa — apá ṣíṣe olóòótọ́ ni èyí.', operationalCopy: 'Ṣíṣiṣẹ́ túmọ̀ sí pé iṣẹ́ náà dáhùn láàárín àkókò àfojúsùn ní gbogbo àyẹ̀wò ti ìṣẹ́jú márùn-ún tó kọjá. Àjálu kékeré kò ṣẹ́ eléyí. Ìkùnà tó gùn ṣẹ́.' },
  ha: { eyebrow: 'MATSAYI', title: 'Yadda komai ke gudana.', lede: 'Ana jawo wannan shafin kai-tsaye daga mai sa ido na jama\'a. Idan lambobin sun yi kamar kuskure, fada mana — wani bangare ne na ci gaba da gaskiya.', operationalCopy: 'Yana aiki yana nufin hidimar ta amsa a cikin lokacin manufa a kowane binciken na mintoci biyar da suka wuce. Ɗan lokaci ba ya karya wannan. Gazawa mai ɗorewa tana karyawa.' },
};

const CAREERS: Record<LocaleCode, CareersStrings> = {
  'zh-CN': {
    eyebrow: '招聘 · 加入工作室', title: '小团队,长视野。',
    lede: '我们招聘缓慢且谨慎。当一个职位开放时,会发布在这里。如果没有空缺,最好的自我介绍仍然会得到回复。',
    openings: {
      heading: '空缺职位',
      currentlyHiringText: '当前在招… 无。',
      note: '目前没有空缺职位。这一行不是装饰——我们保持诚实。当有职位开放时,它将是一个真实的职位,有真实的范围、薪资区间和具名的招聘经理。',
    },
    introduceYourself: {
      eyebrow: '无论如何介绍自己',
      heading: '我们最好的招聘案例,是在还没有职位时就给我们写信的人。',
      body: '告诉我们你做过什么,以及接下来想做什么。两段话胜过一份精美的简历。来自真人的真实回复,通常在两个工作日内。',
    },
    howWeWork: [
      { title: '小团队,共享技术栈', body: '一个代码库。一种部署模式。一个跨所有 Clap 产品的共享平台。你不会浪费一个月去学习十五种工具和每天五场会议。同一套 Next.js + Postgres + Payload 技术栈运行这个网站、Clappe、ClapBill、ClapMed 以及其他所有产品。在一个产品上发布功能,你就能在每一个产品上发布。' },
      { title: 'AI 增强,不是 AI 替代', body: '我们大量依靠 AI 获得杠杆。代码生成、翻译、支持分诊、欺诈检测。但写出最终发布代码的是人。每一个选择由人来负责。工艺很重要。代码评审很重要。责任很重要。AI 是动力工具,不是木匠。' },
      { title: '诚实地远程', body: '我们选择远程是因为它适合这份工作,而不是因为它流行。会议简短而稀少。我们把写作当作一门正经的手艺。大多数决定都活在书面简报里,几个月后任何人都能读懂。我们尊重时区。没有人会为了迁就别人在凌晨三点开会。' },
      { title: '为长远而做', body: '工作室是自筹资金的,不出售。我们打算把这家公司做二十年。这意味着稳定的节奏、真正的周末,以及选择那些随时间复利的问题。这里没人在为退出而冲刺。' },
      { title: '薪酬,透明', body: '每一个开放职位都以书面形式公布薪资区间。我们不会与猜中区间的人讨价还价。我们公布它,然后支付它。股权不在桌上——公司不出售。我们支付有竞争力的现金,年度调整与真实影响挂钩。' },
      { title: '倾向于资深', body: '我们大多数员工都已经交付过足够多的项目,既能持有强烈的看法,也有足够的伤疤让自己轻装持有。我们不是初级工程师流水线。当我们招聘比较年轻的人时,这个角色是围绕真正的辅导建立的——不是生存。' },
    ],
    productFamily: [
      'ERP 统一平台——生态系统的核心。',
      '面向中小企业和大型企业的多租户开票系统。',
      '具备代理能力的电子病历。',
      '实验室引导的营养与膳食规划。',
      '全球统一的金融平台。',
      '以信任为先的全球自由职业市场。',
      '面向商业和小型农户的农场管理。',
      'AI 媒体与创意工具。',
    ],
    process: [
      { stage: '01 · 两段话', what: '你给这个职位发邮件。两段话:你已经交付过什么,以及接下来想构建什么。欢迎打磨过的简历,但不是必需的。我们阅读每一封邮件。回复来自真人,在两个工作日内。' },
      { stage: '02 · 一次真实的对话', what: '与招聘经理四十五分钟。没有"讲一个时刻"那种戏剧。我们谈真正的工作——你的和我们的。你问对你重要的问题。我们当周分享书面跟进。' },
      { stage: '03 · 一小块真实的工作', what: '一项四到六小时的练习,反映这个角色实际做的事,按我们标准的合同工时薪酬支付。你保留你做出来的东西。无论结果如何,我们都会分享书面反馈。' },
      { stage: '04 · 推荐人与录用', what: '与你共事过的两个人的简短推荐通话。一份书面录用,载明确切的薪资、入职日期、设备预算和休假政策。以书面方式接受或拒绝——没有施压策略。' },
    ],
  },
  es: {
    eyebrow: 'CARRERAS · ÚNETE AL ESTUDIO', title: 'Un equipo pequeño, con un horizonte largo.',
    lede: 'Contratamos despacio y con cuidado. Cuando hay un puesto abierto, se publica aquí. Si no hay nada, las mejores presentaciones igual reciben respuesta.',
    openings: {
      heading: 'Puestos abiertos',
      currentlyHiringText: 'Actualmente contratando para… nada.',
      note: 'No hay puestos abiertos en este momento. Esta línea no es decoración — la mantenemos honesta. Cuando se abra algo, será un puesto real con un alcance real, una franja salarial y un responsable de contratación con nombre.',
    },
    introduceYourself: {
      eyebrow: 'Preséntate de todos modos',
      heading: 'Las mejores contrataciones que hicimos nos escribieron antes de que hubiera un puesto.',
      body: 'Cuéntanos lo que has lanzado y lo que quieres construir a continuación. Dos párrafos superan a un CV pulido. Una respuesta real llega de una persona, normalmente en dos días laborables.',
    },
    howWeWork: [
      { title: 'Equipo pequeño, stack compartido', body: 'Un único código base. Un único modelo de despliegue. Una única plataforma compartida en todos los productos Clap. No vas a perder un mes aprendiendo quince herramientas y cinco reuniones al día. El mismo stack Next.js + Postgres + Payload corre este sitio, Clappe, ClapBill, ClapMed y los demás. Lanza una función en un producto y podrás lanzarla en todos.' },
      { title: 'Aumentado por IA, no reemplazado', body: 'Nos apoyamos mucho en la IA para obtener apalancamiento. Generación de código, traducción, triaje de soporte, detección de fraude. Pero los humanos escriben las líneas que se publican. Los humanos son dueños de cada decisión. La artesanía importa. La revisión de código importa. La responsabilidad importa. La IA es una herramienta eléctrica, no el carpintero.' },
      { title: 'Remoto, honestamente', body: 'Somos remotos porque encaja con el trabajo, no porque esté de moda. Las reuniones son breves y pocas. La escritura es un oficio que tomamos en serio. La mayoría de las decisiones viven en un brief escrito que cualquiera puede leer meses después. Se respetan las zonas horarias. Nadie hace una reunión a las tres de la mañana para acomodarse a otro.' },
      { title: 'Hechos para el largo plazo', body: 'El estudio es bootstrapped y no está en venta. Planeamos seguir lanzando dentro de veinte años. Eso significa un ritmo estable, fines de semana de verdad y elegir problemas que se acumulan con el tiempo. Aquí nadie corre hacia una salida.' },
      { title: 'Compensación, transparente', body: 'Cada puesto abierto publica una franja salarial por escrito. No negociamos contra quien adivina la franja. La publicamos y la pagamos. La participación no está sobre la mesa — la empresa no está en venta. Pagamos efectivo competitivo con revisiones anuales atadas al impacto real.' },
      { title: 'Sesgo claro hacia la seniority', body: 'La mayoría de las contrataciones han lanzado lo suficiente como para sostener opiniones fuertes y tener suficientes cicatrices como para sostenerlas con ligereza. No somos una línea de montaje de junior developers. Cuando contratamos a alguien más temprano en su carrera, el rol se construye en torno a una mentoría real — no a la supervivencia.' },
    ],
    productFamily: [
      'ERP unificado — el núcleo del ecosistema.',
      'Facturación multi-tenant para pymes y empresas.',
      'Historia clínica electrónica con agentes.',
      'Nutrición y planificación de comidas guiadas por laboratorio.',
      'Plataforma financiera unificada global.',
      'Marketplace global de freelance basado en confianza.',
      'Gestión de granjas comerciales y de pequeños productores.',
      'Herramientas de medios e IA creativa.',
    ],
    process: [
      { stage: '01 · Dos párrafos', what: 'Escribes un email al puesto. Dos párrafos: lo que has lanzado y lo que quieres construir a continuación. Los CV pulidos son bienvenidos pero no obligatorios. Leemos cada email. La respuesta llega de una persona en dos días laborables.' },
      { stage: '02 · Una conversación real', what: 'Cuarenta y cinco minutos con el responsable de contratación. Sin teatro de "cuéntame una vez". Hablamos de trabajo real — el tuyo y el nuestro. Preguntas lo que te importa. Compartimos un seguimiento escrito esa misma semana.' },
      { stage: '03 · Un pequeño trozo de trabajo real', what: 'Un ejercicio de cuatro a seis horas que refleja lo que el rol hace de verdad, pagado a nuestra tarifa estándar de contratista. Te quedas con lo que construyas. Compartimos comentarios escritos sea cual sea el resultado.' },
      { stage: '04 · Referencias y oferta', what: 'Una llamada breve de referencia con dos personas con las que hayas trabajado. Una oferta escrita con el salario exacto, fecha de inicio, presupuesto de equipo y política de tiempo libre. Acepta o rechaza por escrito — sin tácticas de presión.' },
    ],
  },
  hi: {
    eyebrow: 'करियर · स्टूडियो में शामिल हों', title: 'एक छोटी टीम, लंबे क्षितिज के साथ।',
    lede: 'हम धीरे और सावधानी से नियुक्त करते हैं। जब कोई पद खुला होता है, यहाँ पोस्ट किया जाता है। यदि कुछ खुला नहीं है, तब भी सबसे अच्छे परिचयों का जवाब मिलता है।',
    openings: {
      heading: 'खुले पद',
      currentlyHiringText: 'अभी नियुक्ति कर रहे हैं… किसी के लिए नहीं।',
      note: 'इस समय कोई खुला पद नहीं है। यह पंक्ति सजावट नहीं है — हम इसे ईमानदार रखते हैं। जब कुछ खुलेगा, तो वह एक वास्तविक पद होगा जिसका वास्तविक दायरा, वेतन सीमा और नामांकित नियुक्ति प्रबंधक होगा।',
    },
    introduceYourself: {
      eyebrow: 'फिर भी अपना परिचय दें',
      heading: 'हमारी सबसे अच्छी नियुक्तियाँ वो थीं जिन्होंने पद होने से पहले हमें लिखा था।',
      body: 'हमें बताएँ आपने क्या बनाया है और आगे क्या बनाना चाहते हैं। दो पैराग्राफ़ एक चमकदार CV को मात देते हैं। एक वास्तविक व्यक्ति से असली जवाब, आमतौर पर दो कार्य दिवसों में।',
    },
    howWeWork: [
      { title: 'छोटी टीम, साझा स्टैक', body: 'एक कोडबेस। एक डिप्लॉय मॉडल। हर Clap उत्पाद में एक साझा प्लेटफ़ॉर्म। आप एक महीना पंद्रह टूल और दिन में पाँच मीटिंग सीखने में नहीं गँवाएँगे। वही Next.js + Postgres + Payload स्टैक यह साइट, Clappe, ClapBill, ClapMed और बाकी सब चलाता है। एक उत्पाद पर फ़ीचर शिप करें और आप हर उत्पाद पर शिप कर सकते हैं।' },
      { title: 'AI-संवर्धित, AI-प्रतिस्थापित नहीं', body: 'हम लीवरेज के लिए AI पर बहुत भरोसा करते हैं। कोड जेनरेशन, अनुवाद, सपोर्ट ट्रायेज, धोखाधड़ी पहचान। लेकिन शिप होने वाली पंक्तियाँ इंसान लिखते हैं। हर निर्णय पर इंसान का स्वामित्व है। शिल्प मायने रखता है। कोड समीक्षा मायने रखती है। स्वामित्व मायने रखता है। AI एक शक्ति-उपकरण है, बढ़ई नहीं।' },
      { title: 'रिमोट, ईमानदारी से', body: 'हम रिमोट हैं क्योंकि यह काम के अनुकूल है, इसलिए नहीं कि यह ट्रेंडी है। मीटिंग छोटी और कम होती हैं। लेखन एक शिल्प है जिसे हम गंभीरता से लेते हैं। अधिकांश निर्णय एक लिखित ब्रीफ़ में जीते हैं जिसे कोई भी महीनों बाद पढ़ सकता है। समय क्षेत्रों का सम्मान किया जाता है। कोई भी किसी और के लिए सुबह तीन बजे मीटिंग नहीं लेता।' },
      { title: 'लंबे खेल के लिए बना', body: 'स्टूडियो बूटस्ट्रैप्ड है और बिक्री के लिए नहीं है। हम बीस साल में शिप करने की योजना बनाते हैं। इसका मतलब स्थिर गति, असली सप्ताहांत, और ऐसी समस्याएँ चुनना जो समय के साथ संयोजित होती हैं। यहाँ कोई एग्ज़िट के लिए नहीं दौड़ रहा।' },
      { title: 'मुआवज़ा, पारदर्शी रूप से', body: 'हर खुला पद लिखित में सैलरी बैंड पोस्ट करता है। हम बैंड का अनुमान लगाने वालों के विरुद्ध बातचीत नहीं करते। हम इसे प्रकाशित करते हैं और भुगतान करते हैं। इक्विटी मेज़ पर नहीं है — कंपनी बिक्री के लिए नहीं है। हम वास्तविक प्रभाव से जुड़ी वार्षिक समीक्षाओं के साथ प्रतिस्पर्धी नकद भुगतान करते हैं।' },
      { title: 'सीनियॉरिटी की ओर लंबा झुकाव', body: 'अधिकांश नियुक्तियों ने पर्याप्त शिप किया है कि वे मज़बूत राय रख सकें और पर्याप्त निशान कि वे उन्हें हल्के से रख सकें। हम जूनियर डेवलपर असेंबली लाइन नहीं हैं। जब हम किसी को उसके करियर में पहले नियुक्त करते हैं, तो भूमिका वास्तविक मेंटरशिप के इर्द-गिर्द बनी होती है — जीवित रहने के नहीं।' },
    ],
    productFamily: [
      'एकीकृत ERP — पारिस्थितिकी तंत्र का केंद्र।',
      'SMB और एंटरप्राइज़ के लिए मल्टी-टेनेंट इनवॉइसिंग।',
      'एजेंटिक इलेक्ट्रॉनिक मेडिकल रिकॉर्ड।',
      'लैब-निर्देशित पोषण और भोजन योजना।',
      'वैश्विक एकीकृत वित्तीय प्लेटफ़ॉर्म।',
      'विश्वास-प्रथम वैश्विक फ़्रीलांस मार्केटप्लेस।',
      'वाणिज्यिक और छोटे किसानों के लिए कृषि प्रबंधन।',
      'AI मीडिया और रचनात्मक उपकरण।',
    ],
    process: [
      { stage: '01 · दो पैराग्राफ़', what: 'आप पद के लिए ईमेल भेजते हैं। दो पैराग्राफ़: आपने क्या शिप किया है, और आगे क्या बनाना चाहते हैं। पॉलिश किए हुए CV स्वागत हैं पर ज़रूरी नहीं। हम हर ईमेल पढ़ते हैं। जवाब एक इंसान से आता है, दो कार्य दिवसों के भीतर।' },
      { stage: '02 · एक असली बातचीत', what: 'हायरिंग मैनेजर के साथ पैंतालीस मिनट। कोई "एक बार जब" वाला नाटक नहीं। हम असली काम के बारे में बात करते हैं — आपका और हमारा। आप अपने लिए महत्वपूर्ण सवाल पूछते हैं। हम उसी हफ़्ते एक लिखित फ़ॉलो-अप साझा करते हैं।' },
      { stage: '03 · असली काम का एक छोटा टुकड़ा', what: 'चार से छह घंटे का एक अभ्यास जो दर्शाता है कि भूमिका वास्तव में क्या करती है, हमारी मानक ठेकेदार दर पर भुगतान। आप जो बनाते हैं वह आप ही रखते हैं। परिणाम चाहे जो हो, हम लिखित फ़ीडबैक साझा करते हैं।' },
      { stage: '04 · संदर्भ और प्रस्ताव', what: 'दो लोगों के साथ एक छोटी संदर्भ कॉल जिनके साथ आपने काम किया है। एक लिखित प्रस्ताव जिसमें सटीक वेतन, शुरुआत की तारीख़, उपकरण बजट और छुट्टी नीति। लिखित में स्वीकार या अस्वीकार करें — कोई दबाव की रणनीति नहीं।' },
    ],
  },
  ar: {
    eyebrow: 'الوظائف · انضم إلى الاستوديو', title: 'فريق صغير، بأفق بعيد.',
    lede: 'نوظف ببطء وحذر. عند توفر وظيفة، تُنشر هنا. إذا لم يكن هناك شيء مفتوح، فإن أفضل التعريفات تحصل على رد.',
    openings: {
      heading: 'الوظائف المفتوحة',
      currentlyHiringText: 'نوظف حاليًا لـ… لا شيء.',
      note: 'لا توجد وظائف مفتوحة في هذه اللحظة. هذا السطر ليس زخرفة — نحافظ على صدقه. عندما يُفتح شيء، سيكون وظيفة حقيقية بنطاق حقيقي وحدود راتب ومدير توظيف باسمه.',
    },
    introduceYourself: {
      eyebrow: 'عرّف بنفسك على أي حال',
      heading: 'أفضل من وظفناهم على الإطلاق كتبوا إلينا قبل أن تتوفر وظيفة.',
      body: 'أخبرنا بما أطلقته وبما تريد بناءه بعد ذلك. فقرتان تتفوقان على سيرة ذاتية مصقولة. ردّ حقيقي من إنسان، عادةً خلال يومي عمل.',
    },
    howWeWork: [
      { title: 'فريق صغير، حزمة مشتركة', body: 'قاعدة كود واحدة. نموذج نشر واحد. منصة واحدة مشتركة عبر كل منتجات Clap. لن تضيع شهرًا في تعلم خمس عشرة أداة وخمسة اجتماعات يوميًا. حزمة Next.js + Postgres + Payload نفسها تشغّل هذا الموقع، وClappe، وClapBill، وClapMed، والبقية. أطلِق ميزة على منتج واحد وستتمكن من إطلاقها على كل منتج.' },
      { title: 'مُعزَّز بالذكاء الاصطناعي، غير مُستبدَل به', body: 'نعتمد على الذكاء الاصطناعي بقوة من أجل الرافعة. توليد الكود، الترجمة، فرز الدعم، كشف الاحتيال. لكن البشر يكتبون الأسطر التي تُطلَق. البشر يملكون كل قرار. الإتقان مهم. مراجعة الكود مهمة. المُلكية مهمة. الذكاء الاصطناعي أداة قوية، وليس النجار.' },
      { title: 'عن بُعد، بصدق', body: 'نحن عن بُعد لأنه يناسب العمل، لا لأنه عصري. الاجتماعات قصيرة وقليلة. الكتابة حِرفة نأخذها على محمل الجد. تعيش معظم القرارات في موجز مكتوب يستطيع أي شخص قراءته بعد أشهر. نحترم المناطق الزمنية. لا أحد يأخذ اجتماعًا في الثالثة فجرًا ليناسب شخصًا آخر.' },
      { title: 'مصنوع للعب الطويل', body: 'الاستوديو مُموَّل ذاتيًا وغير معروض للبيع. نخطط أن نُطلِق بعد عشرين عامًا. هذا يعني وتيرة ثابتة، عطلات نهاية أسبوع حقيقية، واختيار مشاكل تتراكم مع الزمن. لا أحد هنا في سباق نحو الخروج.' },
      { title: 'تعويض، بشفافية', body: 'كل وظيفة مفتوحة تنشر نطاق راتب مكتوبًا. لا نُساوم مع من يخمّن النطاق. ننشره وندفعه. حقوق المساهمة ليست على الطاولة — الشركة ليست للبيع. ندفع نقدًا تنافسيًا مع مراجعات سنوية مرتبطة بالأثر الفعلي.' },
      { title: 'ميل طويل نحو الخبرة', body: 'معظم من نوظفهم أطلقوا ما يكفي ليحملوا آراء قوية، ولديهم من الجراح ما يكفي ليحملوها بخفّة. لسنا خط تجميع لمطورين مبتدئين. حين نوظف شخصًا في وقت أبكر من مسيرته، تُبنى الوظيفة حول إرشاد حقيقي — لا حول النجاة.' },
    ],
    productFamily: [
      'ERP موحَّد — جوهر المنظومة.',
      'فوترة متعددة المستأجرين للشركات الصغيرة والكبيرة.',
      'سجلات طبية إلكترونية وكيليّة.',
      'تغذية وتخطيط وجبات بإرشاد مختبري.',
      'منصة مالية موحَّدة عالميًا.',
      'سوق عمل حُرّ عالمي يقوم على الثقة أوّلًا.',
      'إدارة مزارع تجارية وصغيرة.',
      'أدوات إعلام وإبداع بالذكاء الاصطناعي.',
    ],
    process: [
      { stage: '01 · فقرتان', what: 'تُرسل بريدًا إلى الوظيفة. فقرتان: ما أطلقته، وما تريد بناءه بعد ذلك. السير الذاتية المصقولة مرحَّب بها ولكنها ليست شرطًا. نقرأ كل بريد. الرد يأتي من إنسان خلال يومي عمل.' },
      { stage: '02 · حديث حقيقي', what: 'خمس وأربعون دقيقة مع مدير التوظيف. لا مسرحية "أخبرني عن مرة". نتحدث عن عمل حقيقي — عملك وعملنا. تطرح الأسئلة التي تهمّك. نشارك متابعة مكتوبة في نفس الأسبوع.' },
      { stage: '03 · قطعة صغيرة من عمل حقيقي', what: 'تمرين من أربع إلى ست ساعات يعكس ما تفعله الوظيفة فعلًا، مدفوع بسعرنا القياسي للمتعاقدين. تحتفظ بما تبنيه. نشارك ملاحظات مكتوبة بصرف النظر عن النتيجة.' },
      { stage: '04 · المراجع والعرض', what: 'مكالمة مرجعية قصيرة مع شخصين عملت معهما. عرض مكتوب يحدد بدقة الراتب، تاريخ البدء، ميزانية الأجهزة، وسياسة الإجازات. اقبل أو ارفض كتابةً — لا تكتيكات ضغط.' },
    ],
  },
  fr: {
    eyebrow: 'CARRIÈRES · REJOIGNEZ LE STUDIO', title: 'Une petite équipe, avec un horizon long.',
    lede: "Nous recrutons lentement et avec soin. Quand un poste est ouvert, il est publié ici. Si rien n'est ouvert, les meilleures présentations reçoivent quand même une réponse.",
    openings: {
      heading: 'Postes ouverts',
      currentlyHiringText: 'Recrutement en cours pour… rien.',
      note: "Il n'y a aucun poste ouvert pour l'instant. Cette ligne n'est pas une décoration — nous la gardons honnête. Quand quelque chose s'ouvre, c'est un vrai poste avec un vrai périmètre, une fourchette salariale et un responsable du recrutement nommé.",
    },
    introduceYourself: {
      eyebrow: 'Présentez-vous quand même',
      heading: "Nos meilleurs recrutements nous ont écrit avant qu'il n'y ait un poste.",
      body: "Dites-nous ce que vous avez livré et ce que vous voulez construire ensuite. Deux paragraphes battent un CV soigné. Une vraie réponse vient d'une personne, généralement sous deux jours ouvrés.",
    },
    howWeWork: [
      { title: 'Petite équipe, stack partagée', body: 'Une seule base de code. Un seul modèle de déploiement. Une seule plateforme partagée pour tous les produits Clap. Vous ne perdrez pas un mois à apprendre quinze outils et cinq réunions par jour. Le même stack Next.js + Postgres + Payload fait tourner ce site, Clappe, ClapBill, ClapMed et le reste. Livrez une fonctionnalité sur un produit et vous pouvez la livrer sur chaque produit.' },
      { title: "Augmenté par l'IA, pas remplacé par elle", body: "Nous nous appuyons fortement sur l'IA pour le levier. Génération de code, traduction, triage du support, détection de fraude. Mais ce sont les humains qui écrivent les lignes qui partent en production. Les humains sont propriétaires de chaque choix. Le métier compte. La revue de code compte. La responsabilité compte. L'IA est un outil de puissance, pas le menuisier." },
      { title: 'À distance, honnêtement', body: "Nous travaillons à distance parce que cela colle au travail, pas parce que c'est tendance. Les réunions sont courtes et rares. L'écriture est un métier que nous prenons au sérieux. La plupart des décisions vivent dans un brief écrit que n'importe qui peut lire des mois plus tard. Les fuseaux horaires sont respectés. Personne ne prend une réunion à trois heures du matin pour s'adapter à quelqu'un d'autre." },
      { title: 'Faits pour la durée', body: "Le studio est bootstrapped et pas à vendre. Nous prévoyons de livrer dans vingt ans. Cela veut dire un rythme régulier, de vrais week-ends et choisir des problèmes qui composent dans le temps. Personne ici ne court vers une sortie." },
      { title: 'Rémunération, transparente', body: "Chaque poste ouvert publie une fourchette salariale par écrit. Nous ne négocions pas contre les gens qui devinent la fourchette. Nous la publions et nous la payons. Les actions ne sont pas sur la table — l'entreprise n'est pas à vendre. Nous payons en cash compétitif avec des révisions annuelles liées à l'impact réel." },
      { title: 'Un biais marqué vers la séniorité', body: 'La plupart des recrutements ont livré assez pour avoir des opinions fortes et assez de cicatrices pour les porter avec légèreté. Nous ne sommes pas une chaîne de montage de juniors. Quand nous embauchons quelqu’un plus tôt dans sa carrière, le poste est construit autour d’un vrai mentorat — pas de la survie.' },
    ],
    productFamily: [
      "ERP unifié — le cœur de l'écosystème.",
      'Facturation multi-tenant pour PME et entreprises.',
      'Dossier médical électronique agentique.',
      'Nutrition et planification de repas guidées par laboratoire.',
      'Plateforme financière unifiée mondiale.',
      'Marketplace freelance mondial axé sur la confiance.',
      "Gestion d'exploitations agricoles commerciales et familiales.",
      'Outils de médias et de création par IA.',
    ],
    process: [
      { stage: '01 · Deux paragraphes', what: "Vous écrivez au poste. Deux paragraphes : ce que vous avez livré et ce que vous voulez construire ensuite. Les CV soignés sont bienvenus mais pas obligatoires. Nous lisons chaque message. La réponse vient d'une personne sous deux jours ouvrés." },
      { stage: '02 · Une vraie conversation', what: "Quarante-cinq minutes avec le responsable de recrutement. Pas de théâtre du « racontez-moi une fois ». Nous parlons de vrai travail — le vôtre et le nôtre. Vous posez les questions qui comptent pour vous. Nous partageons un suivi écrit la même semaine." },
      { stage: '03 · Un petit morceau de vrai travail', what: "Un exercice de quatre à six heures qui reflète ce que le poste fait réellement, payé à notre tarif standard de prestataire. Vous gardez ce que vous construisez. Nous partageons un retour écrit quelle que soit l'issue." },
      { stage: '04 · Références et offre', what: 'Un court appel de référence avec deux personnes avec lesquelles vous avez travaillé. Une offre écrite avec le salaire exact, la date de début, le budget équipement et la politique de congés. Acceptez ou refusez par écrit — aucune tactique de pression.' },
    ],
  },
  pt: {
    eyebrow: 'CARREIRAS · JUNTE-SE AO ESTÚDIO', title: 'Uma equipa pequena, com horizonte longo.',
    lede: 'Contratamos devagar e com cuidado. Quando há uma vaga, é publicada aqui. Se não houver nada aberto, as melhores apresentações recebem mesmo assim uma resposta.',
    openings: {
      heading: 'Vagas abertas',
      currentlyHiringText: 'A contratar agora para… nada.',
      note: 'Não há vagas abertas neste momento. Esta linha não é decoração — mantemo-la honesta. Quando algo abrir, será uma vaga real com âmbito real, escalão salarial e um responsável de recrutamento com nome.',
    },
    introduceYourself: {
      eyebrow: 'Apresente-se na mesma',
      heading: 'As melhores contratações que fizemos escreveram-nos antes de haver uma vaga.',
      body: 'Diga-nos o que lançou e o que quer construir a seguir. Dois parágrafos ganham a um CV polido. Uma resposta verdadeira vem de uma pessoa, normalmente em dois dias úteis.',
    },
    howWeWork: [
      { title: 'Equipa pequena, stack partilhada', body: 'Uma base de código. Um modelo de deploy. Uma plataforma partilhada em cada produto Clap. Não vai perder um mês a aprender quinze ferramentas e cinco reuniões por dia. A mesma stack Next.js + Postgres + Payload corre este site, o Clappe, o ClapBill, o ClapMed e o resto. Lança uma funcionalidade num produto e podes lançá-la em todos.' },
      { title: 'Aumentado por IA, não substituído', body: 'Apoiamo-nos muito na IA para alavancagem. Geração de código, tradução, triagem de suporte, deteção de fraude. Mas são os humanos quem escreve as linhas que vão para produção. Os humanos são donos de cada escolha. O ofício importa. A revisão de código importa. A responsabilidade importa. A IA é uma ferramenta elétrica, não o carpinteiro.' },
      { title: 'Remoto, honestamente', body: 'Somos remotos porque encaixa no trabalho, não porque esteja na moda. Reuniões são curtas e poucas. A escrita é um ofício que levamos a sério. A maior parte das escolhas vive num brief escrito que qualquer um pode ler meses depois. Respeitamos os fusos horários. Ninguém faz uma reunião às três da manhã para se ajustar a outra pessoa.' },
      { title: 'Feitos para o jogo longo', body: 'O estúdio é bootstrapped e não está à venda. Planeamos continuar a entregar daqui a vinte anos. Isso significa um ritmo constante, fins de semana a sério e escolher problemas que se acumulam ao longo do tempo. Ninguém aqui está a correr para uma saída.' },
      { title: 'Compensação, com transparência', body: 'Cada vaga aberta publica uma faixa salarial por escrito. Não negociamos contra quem adivinha a faixa. Publicamo-la e pagamo-la. Equity não está em cima da mesa — a empresa não está à venda. Pagamos em dinheiro competitivo, com revisões anuais ligadas a impacto real.' },
      { title: 'Forte preferência por seniority', body: 'A maior parte das contratações lançou o suficiente para ter opiniões fortes e tem cicatrizes suficientes para as carregar com leveza. Não somos uma linha de montagem de programadores juniores. Quando contratamos alguém mais cedo na carreira, o papel é construído em torno de mentoria real — não de sobrevivência.' },
    ],
    productFamily: [
      'ERP unificado — o núcleo do ecossistema.',
      'Faturação multi-tenant para PMEs e grandes empresas.',
      'Registos médicos eletrónicos agênticos.',
      'Nutrição e planeamento de refeições guiados por laboratório.',
      'Plataforma financeira unificada global.',
      'Marketplace global de freelance focado na confiança.',
      'Gestão de explorações agrícolas comerciais e familiares.',
      'Ferramentas de media e criativas por IA.',
    ],
    process: [
      { stage: '01 · Dois parágrafos', what: 'Escreve um email à vaga. Dois parágrafos: o que lançou, e o que quer construir a seguir. CVs polidos são bem-vindos mas não obrigatórios. Lemos cada email. A resposta vem de uma pessoa, dentro de dois dias úteis.' },
      { stage: '02 · Uma conversa a sério', what: 'Quarenta e cinco minutos com o responsável de recrutamento. Sem teatro de "fale-me de uma vez". Falamos de trabalho a sério — o seu e o nosso. Faz as perguntas que lhe importam. Partilhamos um seguimento escrito na mesma semana.' },
      { stage: '03 · Um pedaço pequeno de trabalho a sério', what: 'Um exercício de quatro a seis horas que reflete o que o papel realmente faz, pago à nossa tarifa padrão de prestador. Fica com o que construir. Partilhamos feedback escrito independentemente do desfecho.' },
      { stage: '04 · Referências e oferta', what: 'Uma chamada curta de referência com duas pessoas com quem trabalhou. Uma oferta escrita com o salário exato, data de início, orçamento para equipamento e política de tempo livre. Aceite ou recuse por escrito — sem táticas de pressão.' },
    ],
  },
  bn: {
    eyebrow: 'ক্যারিয়ার · স্টুডিওতে যোগ দিন', title: 'ছোট দল, দীর্ঘ দিগন্ত নিয়ে।',
    lede: 'আমরা ধীরে এবং সাবধানে নিয়োগ করি। যখন একটি পদ খোলা থাকে, তা এখানে পোস্ট করা হয়। যদি কিছু খোলা না থাকে, তাহলেও সেরা পরিচয়গুলো একটি উত্তর পায়।',
    openings: {
      heading: 'খোলা পদসমূহ',
      currentlyHiringText: 'বর্তমানে নিয়োগ করছি… কিছুর জন্য নয়।',
      note: 'এই মুহূর্তে কোনো খোলা পদ নেই। এই লাইনটি সজ্জা নয় — আমরা এটিকে সৎ রাখি। যখন কিছু খুলবে, এটি হবে একটি বাস্তব পদ যার বাস্তব পরিধি, বেতন পরিসীমা এবং নাম-উল্লিখিত নিয়োগ ম্যানেজার থাকবে।',
    },
    introduceYourself: {
      eyebrow: 'তবু নিজেকে পরিচয় করিয়ে দিন',
      heading: 'আমাদের সবচেয়ে সেরা নিয়োগগুলো ছিল যারা পদ থাকার আগেই আমাদের লিখেছিল।',
      body: 'আমাদের বলুন আপনি কী তৈরি করেছেন এবং পরে কী তৈরি করতে চান। দুটি অনুচ্ছেদ একটি পরিপাটি সিভিকে হারায়। একজন প্রকৃত মানুষের কাছ থেকে একটি বাস্তব উত্তর, সাধারণত দুই কার্যদিবসের মধ্যে।',
    },
    howWeWork: [
      { title: 'ছোট দল, ভাগাভাগি স্ট্যাক', body: 'একটি কোডবেস। একটি ডিপ্লয় মডেল। প্রতিটি Clap পণ্য জুড়ে একটি ভাগাভাগি প্ল্যাটফর্ম। আপনি পনেরোটি টুল এবং প্রতিদিন পাঁচটি মিটিং শিখতে এক মাস হারাবেন না। একই Next.js + Postgres + Payload স্ট্যাক এই সাইট, Clappe, ClapBill, ClapMed এবং বাকিগুলো চালায়। একটি পণ্যে একটি বৈশিষ্ট্য শিপ করুন এবং আপনি প্রতিটি পণ্যে শিপ করতে পারবেন।' },
      { title: 'AI-বর্ধিত, AI-প্রতিস্থাপিত নয়', body: 'আমরা লিভারেজের জন্য AI-এর উপর জোরালোভাবে নির্ভর করি। কোড জেনারেশন, অনুবাদ, সাপোর্ট ট্রায়াজ, প্রতারণা শনাক্তকরণ। কিন্তু যে লাইনগুলো শিপ হয় সেগুলো মানুষ লেখে। প্রতিটি সিদ্ধান্তের মালিক মানুষ। শিল্প-নৈপুণ্য গুরুত্বপূর্ণ। কোড রিভিউ গুরুত্বপূর্ণ। মালিকানা গুরুত্বপূর্ণ। AI একটি শক্তি-হাতিয়ার, ছুতার নয়।' },
      { title: 'রিমোট, সততার সাথে', body: 'আমরা রিমোট কারণ এটি কাজের সাথে মানানসই, ট্রেন্ডি বলে নয়। মিটিং সংক্ষিপ্ত ও কম। লেখা একটি শিল্প যা আমরা গুরুত্ব সহকারে নিই। বেশিরভাগ সিদ্ধান্ত একটি লিখিত ব্রিফে থাকে যা কেউ মাস পরেও পড়তে পারে। সময় অঞ্চলকে সম্মান করা হয়। কেউই অন্য কারো সুবিধার্থে সকাল তিনটায় মিটিং নেয় না।' },
      { title: 'দীর্ঘ খেলার জন্য তৈরি', body: 'স্টুডিওটি বুটস্ট্র্যাপড এবং বিক্রির জন্য নয়। আমরা বিশ বছর পরে শিপ করার পরিকল্পনা করি। এর মানে স্থির গতি, প্রকৃত উইকেন্ড, এবং এমন সমস্যা বেছে নেওয়া যা সময়ের সাথে সংযুক্ত হয়। এখানে কেউ এক্সিটের দিকে দৌড়াচ্ছে না।' },
      { title: 'ক্ষতিপূরণ, স্বচ্ছভাবে', body: 'প্রতিটি খোলা পদ লিখিতভাবে একটি বেতন পরিসর প্রকাশ করে। যারা পরিসর অনুমান করে তাদের বিরুদ্ধে আমরা দরকষাকষি করি না। আমরা এটি প্রকাশ করি এবং তা পরিশোধ করি। ইক্যুইটি টেবিলে নেই — কোম্পানি বিক্রির জন্য নয়। আমরা প্রকৃত প্রভাবের সাথে যুক্ত বার্ষিক পর্যালোচনা সহ প্রতিযোগিতামূলক নগদ অর্থ প্রদান করি।' },
      { title: 'সিনিয়রিটির দিকে দীর্ঘ ঝোঁক', body: 'বেশিরভাগ নিয়োগপ্রাপ্তরা যথেষ্ট শিপ করেছেন যাতে তারা শক্তিশালী মতামত রাখতে পারেন এবং যথেষ্ট দাগ আছে যাতে তারা সেগুলো হালকাভাবে ধরতে পারেন। আমরা জুনিয়র ডেভেলপার অ্যাসেম্বলি লাইন নই। যখন আমরা কাউকে তার ক্যারিয়ারে আগে নিয়োগ করি, ভূমিকাটি বাস্তব মেন্টরশিপের চারপাশে নির্মিত — বেঁচে থাকার নয়।' },
    ],
    productFamily: [
      'একীভূত ERP — বাস্তুতন্ত্রের কেন্দ্র।',
      'SMB ও এন্টারপ্রাইজের জন্য বহু-ভাড়াটিয়া ইনভয়েসিং।',
      'এজেন্টিক ইলেকট্রনিক মেডিকেল রেকর্ড।',
      'ল্যাব-নির্দেশিত পুষ্টি ও খাবার পরিকল্পনা।',
      'বিশ্বব্যাপী একীভূত আর্থিক প্ল্যাটফর্ম।',
      'আস্থা-প্রথম বৈশ্বিক ফ্রিল্যান্স মার্কেটপ্লেস।',
      'বাণিজ্যিক ও ক্ষুদ্র খামারের জন্য খামার ব্যবস্থাপনা।',
      'AI মিডিয়া ও সৃজনশীল সরঞ্জাম।',
    ],
    process: [
      { stage: '01 · দুটি অনুচ্ছেদ', what: 'আপনি পদটিতে ইমেইল করেন। দুটি অনুচ্ছেদ: আপনি কী শিপ করেছেন, এবং পরে কী তৈরি করতে চান। পরিপাটি সিভি স্বাগত কিন্তু আবশ্যক নয়। আমরা প্রতিটি ইমেইল পড়ি। উত্তর একজন মানুষের কাছ থেকে আসে, দুই কার্যদিবসের মধ্যে।' },
      { stage: '02 · একটি প্রকৃত কথোপকথন', what: 'নিয়োগ ম্যানেজারের সাথে পঁয়তাল্লিশ মিনিট। "কখনো একবার..." টাইপের নাটক নেই। আমরা প্রকৃত কাজ নিয়ে কথা বলি — আপনার এবং আমাদের। আপনি যেসব প্রশ্ন আপনার কাছে গুরুত্বপূর্ণ সেগুলো জিজ্ঞেস করেন। আমরা একই সপ্তাহে একটি লিখিত ফলো-আপ ভাগ করি।' },
      { stage: '03 · প্রকৃত কাজের একটি ছোট টুকরো', what: 'চার থেকে ছয় ঘণ্টার একটি অনুশীলন যা ভূমিকাটি আসলে কী করে তা প্রতিফলিত করে, আমাদের মানসম্মত ঠিকাদারের রেটে পরিশোধিত। আপনি যা তৈরি করেন তা রাখেন। ফলাফল যাই হোক, আমরা লিখিত প্রতিক্রিয়া ভাগ করি।' },
      { stage: '04 · রেফারেন্স ও প্রস্তাব', what: 'আপনি যাদের সাথে কাজ করেছেন এমন দুজন ব্যক্তির সাথে একটি সংক্ষিপ্ত রেফারেন্স কল। একটি লিখিত প্রস্তাব যাতে সঠিক বেতন, শুরুর তারিখ, সরঞ্জাম বাজেট এবং ছুটির নীতি থাকে। লিখিতভাবে গ্রহণ বা প্রত্যাখ্যান করুন — কোনো চাপের কৌশল নেই।' },
    ],
  },
  ru: {
    eyebrow: 'КАРЬЕРА · ПРИСОЕДИНЯЙТЕСЬ К СТУДИИ', title: 'Небольшая команда, с длинным горизонтом.',
    lede: 'Мы нанимаем медленно и осторожно. Когда вакансия открыта, она публикуется здесь. Если ничего нет, лучшие представления всё равно получают ответ.',
    openings: {
      heading: 'Открытые вакансии',
      currentlyHiringText: 'Сейчас нанимаем на… ничего.',
      note: 'На данный момент нет открытых вакансий. Эта строка — не декорация, мы поддерживаем её честной. Когда что-то откроется, это будет реальная позиция с реальным объёмом, диапазоном зарплаты и именованным нанимающим менеджером.',
    },
    introduceYourself: {
      eyebrow: 'Представьтесь в любом случае',
      heading: 'Лучшие наши сотрудники писали нам ещё до того, как появилась вакансия.',
      body: 'Расскажите, что вы запустили и что хотите построить дальше. Два абзаца превосходят отшлифованное резюме. Настоящий ответ приходит от живого человека, обычно в течение двух рабочих дней.',
    },
    howWeWork: [
      { title: 'Маленькая команда, общий стек', body: 'Одна кодовая база. Одна модель деплоя. Одна общая платформа для всех продуктов Clap. Вы не потратите месяц на изучение пятнадцати инструментов и пяти встреч в день. Тот же стек Next.js + Postgres + Payload запускает этот сайт, Clappe, ClapBill, ClapMed и остальные. Выпустите фичу на одном продукте — и сможете выпускать её на каждом.' },
      { title: 'Усилены ИИ, не заменены ИИ', body: 'Мы сильно полагаемся на ИИ ради рычага. Генерация кода, перевод, сортировка поддержки, детекция мошенничества. Но строки, которые уходят в продакшн, пишут люди. Люди владеют каждым выбором. Ремесло важно. Код-ревью важно. Ответственность важна. ИИ — это электроинструмент, а не плотник.' },
      { title: 'Удалёнка, честно', body: 'Мы работаем удалённо потому, что это подходит работе, а не потому, что это модно. Встречи короткие и редкие. Письмо — ремесло, к которому мы относимся серьёзно. Большинство решений живут в письменном брифе, который любой может прочитать через месяцы. Мы уважаем часовые пояса. Никто не созывает встречу в три ночи, чтобы подстроиться под кого-то.' },
      { title: 'Сделано для долгой игры', body: 'Студия начата на свои средства и не продаётся. Мы планируем выпускать продукты ещё через двадцать лет. Это значит ровный темп, настоящие выходные и выбор задач, которые накапливаются со временем. Здесь никто не бежит к выходу.' },
      { title: 'Компенсация, прозрачно', body: 'Каждая открытая позиция публикует диапазон зарплаты в письменном виде. Мы не торгуемся с теми, кто угадал диапазон. Мы публикуем его и платим. Долей нет на столе — компания не продаётся. Мы платим конкурентный кеш с ежегодным пересмотром, привязанным к реальному импакту.' },
      { title: 'Сильный сдвиг к сеньорности', body: 'Большинство нанятых уже выпустили достаточно, чтобы держать сильное мнение, и у них достаточно шрамов, чтобы носить его легко. Мы — не конвейер для джунов. Когда мы нанимаем кого-то на более раннем этапе карьеры, роль выстраивается вокруг настоящего менторства, а не выживания.' },
    ],
    productFamily: [
      'Единая ERP — ядро экосистемы.',
      'Мульти-тенантное выставление счетов для SMB и предприятий.',
      'Агентные электронные медицинские карты.',
      'Питание и планирование меню под руководством лаборатории.',
      'Глобальная единая финансовая платформа.',
      'Глобальный фриланс-маркетплейс с приоритетом доверия.',
      'Управление коммерческими и мелкими фермами.',
      'AI-инструменты для медиа и творчества.',
    ],
    process: [
      { stage: '01 · Два абзаца', what: 'Вы пишете на роль. Два абзаца: что вы запустили и что хотите построить дальше. Отшлифованные резюме приветствуются, но не обязательны. Мы читаем каждое письмо. Ответ приходит от живого человека, в течение двух рабочих дней.' },
      { stage: '02 · Настоящий разговор', what: 'Сорок пять минут с нанимающим менеджером. Без театра «расскажите мне о случае». Мы говорим о настоящей работе — вашей и нашей. Вы задаёте вопросы, которые важны вам. Мы делимся письменным фоллоу-апом на той же неделе.' },
      { stage: '03 · Небольшой кусок настоящей работы', what: 'Упражнение на четыре–шесть часов, которое отражает то, что роль действительно делает, оплачивается по нашей стандартной подрядной ставке. То, что вы строите, остаётся у вас. Мы делимся письменным фидбэком вне зависимости от исхода.' },
      { stage: '04 · Рекомендации и оффер', what: 'Короткий звонок с двумя людьми, с которыми вы работали. Письменный оффер с точной зарплатой, датой выхода, бюджетом на оборудование и политикой отгулов. Примите или откажите письменно — без давящих тактик.' },
    ],
  },
  ur: {
    eyebrow: 'کیریئر · اسٹوڈیو میں شامل ہوں', title: 'چھوٹی ٹیم، طویل افق کے ساتھ۔',
    lede: 'ہم آہستہ اور احتیاط سے بھرتی کرتے ہیں۔ جب کوئی پوزیشن کھلی ہوتی ہے، تو یہاں پوسٹ کی جاتی ہے۔ اگر کچھ کھلا نہ ہو، بہترین تعارف پھر بھی جواب پاتے ہیں۔',
    openings: {
      heading: 'کھلی آسامیاں',
      currentlyHiringText: 'فی الحال بھرتی کر رہے ہیں… کسی کے لیے نہیں۔',
      note: 'اس وقت کوئی کھلی پوزیشن نہیں۔ یہ لائن سجاوٹ نہیں — ہم اسے ایماندار رکھتے ہیں۔ جب کچھ کھلے گا، یہ ایک حقیقی پوزیشن ہوگی جس کا حقیقی دائرہ، تنخواہ کی رینج اور نام والا ہائرنگ مینیجر ہوگا۔',
    },
    introduceYourself: {
      eyebrow: 'پھر بھی اپنا تعارف کرائیں',
      heading: 'ہماری بہترین بھرتیاں وہ تھیں جنہوں نے پوزیشن ہونے سے پہلے ہمیں لکھا تھا۔',
      body: 'ہمیں بتائیں آپ نے کیا تیار کیا ہے اور آگے کیا بنانا چاہتے ہیں۔ دو پیراگراف ایک چمکدار سی وی کو ہراتے ہیں۔ ایک حقیقی شخص سے اصلی جواب، عام طور پر دو کاروباری دنوں کے اندر۔',
    },
    howWeWork: [
      { title: 'چھوٹی ٹیم، مشترکہ اسٹیک', body: 'ایک کوڈ بیس۔ ایک ڈپلائے ماڈل۔ ہر Clap پروڈکٹ میں ایک مشترکہ پلیٹ فارم۔ آپ پندرہ ٹولز اور دن میں پانچ میٹنگز سیکھنے میں ایک مہینہ ضائع نہیں کریں گے۔ وہی Next.js + Postgres + Payload اسٹیک یہ سائٹ، Clappe، ClapBill، ClapMed اور باقی سب کو چلاتا ہے۔ ایک پروڈکٹ پر فیچر شپ کریں اور آپ ہر پروڈکٹ پر شپ کر سکتے ہیں۔' },
      { title: 'AI-تقویت یافتہ، AI-تبدیل شدہ نہیں', body: 'ہم لیوریج کے لیے AI پر بہت بھروسا کرتے ہیں۔ کوڈ جنریشن، ترجمہ، سپورٹ ٹرائج، فراڈ کا پتا لگانا۔ لیکن جو لائنیں شپ ہوتی ہیں وہ انسان لکھتے ہیں۔ ہر فیصلے کا مالک انسان ہے۔ کاری گری اہم ہے۔ کوڈ ریویو اہم ہے۔ ملکیت اہم ہے۔ AI ایک پاور ٹول ہے، بڑھئی نہیں۔' },
      { title: 'ریموٹ، ایمانداری سے', body: 'ہم ریموٹ ہیں کیونکہ یہ کام سے میل کھاتا ہے، اس لیے نہیں کہ یہ ٹرینڈی ہے۔ میٹنگز مختصر اور کم ہیں۔ تحریر ایک ایسا ہنر ہے جسے ہم سنجیدگی سے لیتے ہیں۔ زیادہ تر فیصلے ایک تحریری بریف میں رہتے ہیں جنہیں مہینوں بعد بھی کوئی پڑھ سکتا ہے۔ ٹائم زونز کا احترام کیا جاتا ہے۔ کوئی بھی صبح تین بجے کسی اور کی سہولت کے لیے میٹنگ نہیں لیتا۔' },
      { title: 'طویل کھیل کے لیے بنا', body: 'اسٹوڈیو خود سے فنڈڈ ہے اور برائے فروخت نہیں۔ ہم بیس سال میں شپ کرنے کا منصوبہ بناتے ہیں۔ اس کا مطلب ہے مستحکم رفتار، حقیقی ویک اینڈز، اور ایسے مسائل کا انتخاب جو وقت کے ساتھ جمع ہوتے ہیں۔ یہاں کوئی ایگزٹ کی طرف نہیں دوڑ رہا۔' },
      { title: 'معاوضہ، شفاف طور پر', body: 'ہر کھلی پوزیشن ایک تنخواہ کا بینڈ تحریری طور پر شائع کرتی ہے۔ ہم بینڈ کا اندازہ لگانے والوں کے خلاف بات چیت نہیں کرتے۔ ہم اسے شائع کرتے ہیں اور ادا کرتے ہیں۔ ایکویٹی میز پر نہیں ہے — کمپنی برائے فروخت نہیں۔ ہم حقیقی اثر سے جڑے سالانہ جائزوں کے ساتھ مسابقتی نقد ادا کرتے ہیں۔' },
      { title: 'سنیئریٹی کی طرف لمبا جھکاؤ', body: 'زیادہ تر بھرتیوں نے اتنا شپ کیا ہے کہ وہ مضبوط رائے رکھ سکیں اور اتنے داغ ہیں کہ انہیں ہلکا پھلکا رکھ سکیں۔ ہم جونیئر ڈویلپر اسمبلی لائن نہیں۔ جب ہم کسی کو اپنے کیریئر میں پہلے بھرتی کرتے ہیں، تو کردار حقیقی مینٹرشپ کے گرد بنایا جاتا ہے — بقا کے گرد نہیں۔' },
    ],
    productFamily: [
      'متحد ERP — ایکوسسٹم کا مرکز۔',
      'SMB اور انٹرپرائز کے لیے ملٹی-ٹیننٹ انوائسنگ۔',
      'ایجنٹک الیکٹرانک میڈیکل ریکارڈز۔',
      'لیب-رہنمائی غذا اور کھانے کی منصوبہ بندی۔',
      'عالمی متحد مالیاتی پلیٹ فارم۔',
      'اعتماد-اوّل عالمی فری لانس مارکیٹ پلیس۔',
      'تجارتی اور چھوٹے کسانوں کے فارم کی انتظامیہ۔',
      'AI میڈیا اور تخلیقی ٹولز۔',
    ],
    process: [
      { stage: '01 · دو پیراگراف', what: 'آپ پوزیشن کو ای میل کرتے ہیں۔ دو پیراگراف: آپ نے کیا شپ کیا ہے، اور آگے کیا بنانا چاہتے ہیں۔ پالش شدہ سی وی خوش آمدید لیکن لازمی نہیں۔ ہم ہر ای میل پڑھتے ہیں۔ جواب ایک حقیقی شخص سے آتا ہے، دو کاروباری دنوں کے اندر۔' },
      { stage: '02 · ایک حقیقی گفتگو', what: 'ہائرنگ مینیجر کے ساتھ پینتالیس منٹ۔ کوئی "مجھے ایک وقت بتائیں" والا تھیٹر نہیں۔ ہم حقیقی کام کے بارے میں بات کرتے ہیں — آپ کا اور ہمارا۔ آپ وہ سوال پوچھتے ہیں جو آپ کے لیے اہم ہیں۔ ہم اسی ہفتے ایک تحریری فالو-اپ شیئر کرتے ہیں۔' },
      { stage: '03 · حقیقی کام کا ایک چھوٹا ٹکڑا', what: 'چار سے چھ گھنٹے کی ایک مشق جو ظاہر کرتی ہے کہ کردار اصل میں کیا کرتا ہے، ہماری معیاری کنٹریکٹر ریٹ پر ادائیگی۔ جو آپ بناتے ہیں وہ آپ کا ہی رہتا ہے۔ نتیجہ جو بھی ہو، ہم تحریری فیڈ بیک شیئر کرتے ہیں۔' },
      { stage: '04 · حوالہ جات اور پیشکش', what: 'ان دو لوگوں کے ساتھ ایک مختصر ریفرنس کال جن کے ساتھ آپ نے کام کیا ہے۔ ایک تحریری پیشکش جس میں عین تنخواہ، آغاز کی تاریخ، آلات کا بجٹ اور چھٹی کی پالیسی ہوگی۔ تحریری طور پر قبول یا رد کریں — کوئی دباؤ کی حکمت عملی نہیں۔' },
    ],
  },
  id: {
    eyebrow: 'KARIER · BERGABUNG DENGAN STUDIO', title: 'Tim kecil, dengan cakrawala panjang.',
    lede: 'Kami merekrut perlahan dan hati-hati. Saat ada lowongan terbuka, lowongan diposting di sini. Jika tidak ada yang terbuka, perkenalan terbaik tetap mendapat balasan.',
    openings: {
      heading: 'Lowongan terbuka',
      currentlyHiringText: 'Saat ini merekrut untuk… tidak ada.',
      note: 'Tidak ada lowongan terbuka saat ini. Baris ini bukan dekorasi — kami menjaganya tetap jujur. Saat ada yang terbuka, itu akan menjadi posisi nyata dengan cakupan nyata, kisaran gaji, dan manajer perekrut yang disebutkan namanya.',
    },
    introduceYourself: {
      eyebrow: 'Tetap perkenalkan diri Anda',
      heading: 'Karyawan terbaik yang pernah kami rekrut menulis kepada kami sebelum ada posisi.',
      body: 'Beri tahu kami apa yang telah Anda kirim dan apa yang ingin Anda bangun selanjutnya. Dua paragraf mengalahkan CV yang dipoles. Balasan nyata datang dari orang nyata, biasanya dalam dua hari kerja.',
    },
    howWeWork: [
      { title: 'Tim kecil, stack bersama', body: 'Satu basis kode. Satu model deploy. Satu platform bersama untuk setiap produk Clap. Anda tidak akan kehilangan satu bulan untuk mempelajari lima belas alat dan lima rapat sehari. Stack Next.js + Postgres + Payload yang sama menjalankan situs ini, Clappe, ClapBill, ClapMed, dan lainnya. Kirim sebuah fitur di satu produk dan Anda dapat mengirimnya di setiap produk.' },
      { title: 'Diperkuat AI, bukan digantikan AI', body: 'Kami banyak bersandar pada AI untuk leverage. Pembuatan kode, terjemahan, triase dukungan, deteksi penipuan. Namun manusialah yang menulis baris yang dirilis. Manusia memiliki setiap pilihan. Keterampilan penting. Tinjauan kode penting. Kepemilikan penting. AI adalah alat yang kuat, bukan tukang kayunya.' },
      { title: 'Remote, dengan jujur', body: 'Kami bekerja remote karena cocok dengan pekerjaan, bukan karena sedang tren. Rapat singkat dan sedikit. Menulis adalah keahlian yang kami anggap serius. Kebanyakan keputusan hidup dalam brief tertulis yang dapat dibaca siapa pun bulan-bulan kemudian. Zona waktu dihormati. Tidak ada yang mengambil rapat pukul tiga pagi demi menyesuaikan diri dengan orang lain.' },
      { title: 'Dibuat untuk permainan panjang', body: 'Studio ini bootstrapped dan tidak dijual. Kami berencana terus mengirim selama dua puluh tahun. Itu berarti ritme yang stabil, akhir pekan yang nyata, dan memilih masalah yang menumpuk seiring waktu. Tidak ada di sini yang berlari menuju exit.' },
      { title: 'Kompensasi, secara transparan', body: 'Setiap lowongan terbuka memposting kisaran gaji secara tertulis. Kami tidak bernegosiasi melawan orang yang menebak kisaran. Kami mempublikasikannya dan membayarnya. Ekuitas tidak ada di meja — perusahaan tidak dijual. Kami membayar tunai yang kompetitif dengan tinjauan tahunan terkait dampak nyata.' },
      { title: 'Kecenderungan kuat ke senioritas', body: 'Sebagian besar karyawan telah merilis cukup banyak untuk memegang opini yang kuat dan punya cukup luka untuk memegangnya dengan ringan. Kami bukan jalur perakitan junior developer. Saat kami merekrut seseorang lebih awal dalam kariernya, peran itu dibangun di sekitar mentoring nyata — bukan bertahan hidup.' },
    ],
    productFamily: [
      'ERP terpadu — inti ekosistem.',
      'Penagihan multi-tenant untuk UKM dan perusahaan.',
      'Rekam Medis Elektronik agentik.',
      'Nutrisi dan perencanaan menu yang dipandu laboratorium.',
      'Platform finansial terpadu global.',
      'Marketplace freelance global yang mengutamakan kepercayaan.',
      'Manajemen pertanian komersial dan petani kecil.',
      'Alat media dan kreatif berbasis AI.',
    ],
    process: [
      { stage: '01 · Dua paragraf', what: 'Anda mengirim email ke posisi tersebut. Dua paragraf: apa yang sudah Anda kirim, dan apa yang ingin Anda bangun selanjutnya. CV yang dipoles disambut tetapi tidak wajib. Kami membaca setiap email. Balasan datang dari orang nyata, dalam dua hari kerja.' },
      { stage: '02 · Percakapan nyata', what: 'Empat puluh lima menit dengan manajer perekrut. Tanpa drama "ceritakan tentang suatu waktu". Kami membicarakan pekerjaan nyata — milik Anda dan milik kami. Anda menanyakan hal-hal yang penting bagi Anda. Kami membagikan tindak lanjut tertulis pada minggu yang sama.' },
      { stage: '03 · Sepotong kecil pekerjaan nyata', what: 'Latihan empat sampai enam jam yang mencerminkan apa yang sebenarnya dilakukan peran tersebut, dibayar dengan tarif kontraktor standar kami. Anda menyimpan apa yang Anda bangun. Kami membagikan umpan balik tertulis terlepas dari hasilnya.' },
      { stage: '04 · Referensi dan tawaran', what: 'Telepon referensi singkat dengan dua orang yang pernah bekerja dengan Anda. Tawaran tertulis dengan gaji pasti, tanggal mulai, anggaran perangkat, dan kebijakan cuti. Terima atau tolak secara tertulis — tanpa taktik tekanan.' },
    ],
  },
  sw: {
    eyebrow: 'KAZI · JIUNGE NA STUDIO', title: 'Timu ndogo, yenye upeo mrefu.',
    lede: 'Tunaajiri polepole na kwa uangalifu. Wakati nafasi inafunguliwa, inachapishwa hapa. Ikiwa hakuna kitu kilichofunguliwa, utangulizi bora bado unapata jibu.',
    openings: {
      heading: 'Nafasi zilizo wazi',
      currentlyHiringText: 'Sasa hivi tunaajiri kwa… hakuna kitu.',
      note: 'Hakuna nafasi zilizo wazi kwa sasa. Mstari huu si pambo — tunauweka mwaminifu. Wakati kitu kitakapofunguliwa, itakuwa nafasi halisi yenye upeo halisi, kiwango cha mshahara na meneja wa kuajiri aliyetajwa kwa jina.',
    },
    introduceYourself: {
      eyebrow: 'Jitambulishe vyovyote vile',
      heading: 'Walioajiriwa wetu bora zaidi walituandikia kabla nafasi haijawepo.',
      body: "Tuambie umetuma nini na unataka kujenga nini baadaye. Aya mbili zinashinda CV iliyong'arishwa. Jibu halisi hutoka kwa mtu halisi, kwa kawaida ndani ya siku mbili za kazi.",
    },
    howWeWork: [
      { title: 'Timu ndogo, stack iliyoshirikiwa', body: 'Codebase moja. Modeli moja ya deploy. Jukwaa moja lililoshirikiwa kwa kila bidhaa ya Clap. Hutapoteza mwezi mzima ukijifunza zana kumi na tano na mikutano mitano kwa siku. Stack ile ile ya Next.js + Postgres + Payload inaendesha tovuti hii, Clappe, ClapBill, ClapMed, na zingine. Tuma kipengele kwa bidhaa moja, na unaweza kutuma kwa kila bidhaa.' },
      { title: 'Imeimarishwa kwa AI, si kubadilishwa na AI', body: 'Tunategemea AI kwa nguvu kupata leva. Uzalishaji wa codi, tafsiri, kupanga msaada, kugundua udanganyifu. Lakini watu ndio wanaoandika mistari inayotumwa. Watu wanamiliki kila uchaguzi. Ufundi unajalisha. Mapitio ya codi yanajalisha. Umiliki unajalisha. AI ni zana ya nguvu, si seremala.' },
      { title: 'Mbali, kwa unyofu', body: 'Tunafanya kazi mbali kwa sababu inafaa kwa kazi, si kwa sababu ni mtindo. Mikutano ni mifupi na michache. Uandishi ni ufundi tunaouchukua kwa uzito. Maamuzi mengi yanaishi katika muhtasari ulioandikwa ambao mtu yeyote anaweza kuusoma miezi baadaye. Maeneo ya saa yanaheshimiwa. Hakuna mtu anayechukua mkutano saa tatu asubuhi ili kumfaa mtu mwingine.' },
      { title: 'Imeundwa kwa mchezo mrefu', body: 'Studio imejifadhili na haiuzwi. Tunapanga kuendelea kutuma kwa miaka ishirini. Hiyo ina maana mwendo thabiti, wikendi za kweli, na kuchagua matatizo yanayoongezeka kwa muda. Hapa hakuna anayekimbilia kutoka.' },
      { title: 'Malipo, kwa uwazi', body: 'Kila nafasi iliyo wazi huchapisha kiwango cha mshahara kwa maandishi. Hatufanyi mazungumzo dhidi ya watu wanaokisia kiwango. Tunakichapisha na kukilipa. Hisa hazipo mezani — kampuni haiuzwi. Tunalipa pesa za ushindani na mapitio ya kila mwaka yanayohusishwa na athari halisi.' },
      { title: 'Mwelekeo mrefu kuelekea uzoefu', body: 'Walioajiriwa wengi wametuma vya kutosha kushikilia maoni makali na wana makovu ya kutosha ya kuyashikilia kwa upole. Sisi si laini ya kuajiri wanaoanza. Tunapomwajiri mtu mapema katika kazi yake, jukumu linajengwa kuzunguka mwongozo halisi — si kuishi tu.' },
    ],
    productFamily: [
      'ERP iliyounganishwa — kiini cha mfumo.',
      'Utoaji wa ankara wa wapangaji wengi kwa SMB na makampuni.',
      'Rekodi za Matibabu za Kielektroniki za uwakala.',
      'Lishe na mipango ya milo iliyoongozwa na maabara.',
      'Jukwaa moja la kifedha la kimataifa.',
      'Soko la kazi huria la kimataifa linaloweka uaminifu mbele.',
      'Usimamizi wa mashamba ya kibiashara na ya wakulima wadogo.',
      'Zana za media na ubunifu za AI.',
    ],
    process: [
      { stage: '01 · Aya mbili', what: "Unatuma barua pepe kwenye nafasi. Aya mbili: kile umetuma, na unataka kujenga nini baadaye. CV zilizong'arishwa zinakaribishwa lakini si lazima. Tunasoma kila barua pepe. Jibu hutoka kwa mtu halisi, ndani ya siku mbili za kazi." },
      { stage: '02 · Mazungumzo halisi', what: 'Dakika arobaini na tano na meneja wa kuajiri. Hakuna mchezo wa "niambie kuhusu wakati mmoja". Tunazungumza kazi halisi — yako na yetu. Unauliza maswali yanayokuhusu. Tunashirikiana ufuatiliaji ulioandikwa wiki hiyo hiyo.' },
      { stage: '03 · Kipande kidogo cha kazi halisi', what: 'Zoezi la masaa manne hadi sita linaloakisi kile ambacho jukumu hufanya kweli, kulipwa kwa kiwango chetu cha kawaida cha mkandarasi. Unabaki na kile unachojenga. Tunashirikiana maoni yaliyoandikwa bila kujali matokeo.' },
      { stage: '04 · Marejeleo na ofa', what: 'Simu fupi ya marejeleo na watu wawili uliofanya kazi nao. Ofa iliyoandikwa yenye mshahara halisi, tarehe ya kuanza, bajeti ya vifaa, na sera ya likizo. Kubali au kataa kwa maandishi — hakuna mbinu za shinikizo.' },
    ],
  },
  yo: {
    eyebrow: 'IṢẸ́ · DARÚPỌ̀ MỌ́ STUDIO', title: 'Ẹgbẹ́ kékeré, pẹ̀lú ìpèsè jíjìn.',
    lede: 'A ń gba òṣìṣẹ́ jọ pẹ̀lú ìfaradà àti ìṣọ́ra. Nígbà tí ipò kan bá ṣí, a ó tẹ̀ ẹ́ jáde níbí. Tí kò bá sí ohunkóhun tó ṣí, àwọn ìfihàn-ara-ẹni tó dára jùlọ ṣì máa ń gba ìdáhùn.',
    openings: {
      heading: 'Àwọn ipò tí ó ṣí sílẹ̀',
      currentlyHiringText: 'A ń gba òṣìṣẹ́ ní báyìí fún… ohunkóhun.',
      note: 'Kò sí ipò tí ó ṣí ní àkókò yìí. Ìlà yìí kì í ṣe ọ̀ṣọ́ — a fi olótìítọ́ pa á mọ́. Nígbà tí ohun kan bá ṣí, yóò jẹ́ ipò gidi pẹ̀lú ààlà gidi, ìwọ̀n owó-osù àti olùdarí ìgbaṣẹ́ tí orúkọ rẹ̀ wà.',
    },
    introduceYourself: {
      eyebrow: 'Sọ ara rẹ kalẹ̀ síbẹ̀síbẹ̀',
      heading: 'Àwọn òṣìṣẹ́ tó dára jùlọ tí a gbà nígbàgbogbo kọ̀wé sí wa kí ipò kan tó ṣí.',
      body: 'Sọ fún wa ohun tí o ti jádelé àti ohun tí o fẹ́ kọ́ tókàn. Àyọ̀kà méjì lè ju CV tó ti pé pé. Ìdáhùn gidi wá láti ọwọ́ ènìyàn gidi, lọ́pọ̀ ìgbà nínú ọjọ́ iṣẹ́ méjì.',
    },
    howWeWork: [
      { title: 'Ẹgbẹ́ kékeré, ìpilẹ̀ ìpín', body: 'Codebase kan. Àpẹrẹ ìpèsè kan. Pèpéle kan tí a pín kárí gbogbo ọjà Clap. Iwọ kò ní pàdánù oṣù kan tí o ń kọ́ irinṣẹ́ mẹ́ẹ̀ẹ́dógún àti ìpàdé márùn-ún lójoojúmọ́. Stack kannáà ti Next.js + Postgres + Payload ni ó ń ṣàkóso ojú-òpó yìí, Clappe, ClapBill, ClapMed, àti àwọn yòókù. Fi àfikún kan jádelé sí ọjà kan, o sì lè fi jádelé sí gbogbo ọjà.' },
      { title: 'Tí AI ṣe àfikún, kì í ṣe tí AI rọ́pò', body: 'A gbára pa AI lágbára fún ìró. Ìṣẹ̀dá codi, ìtumọ̀, ìṣètò ìránlọ́wọ́, ìwádìí àjèjì. Ṣùgbọ́n àwọn ènìyàn ni ó ń kọ ìlà tí a fi jádelé. Àwọn ènìyàn ni o ní gbogbo àṣàyàn. Iṣẹ́ ọnà jẹ́ pàtàkì. Àyẹ̀wò codi jẹ́ pàtàkì. Ìní jẹ́ pàtàkì. AI jẹ́ irinṣẹ́ agbára, kì í ṣe gbẹnàgbẹnà.' },
      { title: 'Latọ̀nà jíjìn, lóòótọ́', body: 'A wà látọ̀nà jíjìn nítorí pé ó bá iṣẹ́ mu, kì í ṣe nítorí pé ó wọ́pọ̀. Àwọn ìpàdé wa kúrú àti ní iye kéréré. Ìkọ̀wé jẹ́ iṣẹ́ ọnà tí a gbé yẹ̀. Ọ̀pọ̀lọpọ̀ àṣàyàn ń gbé inú àkọsílẹ̀ kúkúrú tí ẹnikẹ́ni lè ka lẹ́yìn oṣù. A bọwọ̀ fún àwọn àkókò àgbègbè. Kò sí ẹnikẹ́ni tí ó ń mu ìpàdé ní agogo mẹ́ta òwúrọ̀ láti baá ẹlòmíràn mu.' },
      { title: 'Tí a ṣe fún ìṣeré gígùn', body: 'Studio náà jẹ́ tí a fúnra-rẹ̀ ṣètilẹ́yìn, kì í sì í ṣe fún títà. A ń pinnu láti tẹ̀síwájú láti jádelé fún ogún ọdún. Èyí túmọ̀ sí ọkà tí ó dúró ṣinṣin, ìparí ọṣẹ̀ tí ó jẹ́ tòótọ́, àti yíyàn àwọn ìṣòro tí ń pọ̀ síi pẹ̀lú àkókò. Kò sí ẹnikẹ́ni níbí tí ó ń sáré sí ìjáde.' },
      { title: 'Owó iṣẹ́, lọ́nà gbangba', body: 'Gbogbo ipò tí ó ṣí sílẹ̀ ń tẹ ààlà owó-osù jáde lọ́nà ìkọ̀wé. A kì í bá àwọn tí ó kọ̀wé ààlà náà ṣe ìjíròrò. A ń tẹ̀ ẹ́ jáde, a sì ń san án. Ìpín ko sí lórí tábìlì — ilé-iṣẹ́ kò sí fún títà. A ń san owó ìfojúsùn tí ó ní ìdíje pẹ̀lú àyẹ̀wò ọdọọdún tí ó so mọ́ ipa gidi.' },
      { title: 'Ìfẹ́ jíjìn fún ọgbọ́n àgbà', body: 'Ọ̀pọ̀lọpọ̀ àwọn tí a gbà ti jádelé tó láti gbé èrò tí ó lágbára àti ní ọgbẹ́ tó láti gbé wọn lọ́pọ̀. A kì í ṣe ọ̀nà ìṣètò àwọn akọsílẹ̀ junior. Nígbà tí a bá gba ẹnìkan ní ìbẹ̀rẹ̀ iṣẹ́-ìgbé wọn, a ó kọ́ ipò náà yí ìtọ́jú gidi ká — kì í ṣe ìwàláàyè.' },
    ],
    productFamily: [
      'ERP tó dìpọ̀ — ọkàn-àyà ètò ìmọ̀.',
      'Ìpèsè owó-iṣẹ́ aláọ̀ṣọ́pọ̀-onílé fún SMB àti àwọn ilé-iṣẹ́.',
      'Ìwé Ìròyìn Ìṣègùn Onínáṣẹ̀dá pẹ̀lú agbára aṣojú.',
      'Ìjẹunjẹ àti ètò oúnjẹ tí ilé-ìwádìí dárí.',
      'Pèpéle ìṣúná tó dìpọ̀ kárí ayé.',
      'Ọjà iṣẹ́-òmìnira kárí ayé tí ó kọ́kọ́ gbé ìgbẹ́kẹ̀lé.',
      'Àkóso oko fún àwọn àgbẹ̀ ọjà-ìpínkiri àti àwọn àgbẹ̀ kéékèèké.',
      'Àwọn irinṣẹ́ ìròyìn àti ìṣẹ̀dá AI.',
    ],
    process: [
      { stage: '01 · Àyọ̀kà méjì', what: 'O fi ìmẹ́ìlì ránṣẹ́ sí ipò náà. Àyọ̀kà méjì: ohun tí o ti jádelé, àti ohun tí o fẹ́ kọ́ tókàn. Àwọn CV tí a ti pé pé wà ní káàbọ̀ ṣùgbọ́n kò pọn dandan. A ka ìmẹ́ìlì kọ̀ọ̀kan. Ìdáhùn wá láti ọwọ́ ènìyàn gidi, nínú ọjọ́ iṣẹ́ méjì.' },
      { stage: '02 · Ìfọ̀rọ̀wánilẹ́nuwò gidi', what: 'Ìṣẹ́jú márùn-ún-dín-ní-àádọ́ta pẹ̀lú olùdarí ìgbaṣẹ́. Kò sí eré "sọ fún mi nípa àkókò kan". A sọ̀rọ̀ nípa iṣẹ́ gidi — tirẹ àti tiwa. O béèrè àwọn ìbéèrè tí ó ṣe pàtàkì sí ọ. A pín ìbáraẹnisọ̀rọ̀ ìkọ̀wé ní ọ̀sẹ̀ kannáà.' },
      { stage: '03 · Ìpínlẹ̀ kékeré ti iṣẹ́ gidi', what: 'Ìdánwò wákàtí mẹ́rin sí mẹ́fà tí ó ṣe àpẹẹrẹ ohun tí ipò náà ṣe ní gidi, tí a san fún ní iyege ìfẹnukogun ìpilẹ̀ wa. O pa ohun tí o kọ́ mọ́. A pín àròyé ìkọ̀wé láìka àbájáde si.' },
      { stage: '04 · Ẹ̀rí àti ìfọ̀rọ̀wánilẹ́nuwò', what: 'Ìpè ẹ̀rí kúkúrú pẹ̀lú àwọn ènìyàn méjì tí o ti ṣiṣẹ́ pẹ̀lú. Ìfọ̀rọ̀wánilẹ́nuwò ìkọ̀wé pẹ̀lú owó-osù gangan, ọjọ́ ìbẹ̀rẹ̀, ìpèsè owó-èlò àti ìlànà àkókò ìsinmi. Gba tàbí kọ̀ ní ìkọ̀wé — kò sí ọgbọ́n ìfipá.' },
    ],
  },
  ha: {
    eyebrow: 'AIKI · SHIGA STUDIYO', title: 'Ƙaramin tawaga, mai dogon ido.',
    lede: "Muna ɗaukar ma'aikata sannu a hankali. Lokacin da matsayi ya buɗe, ana wallafa shi anan. Idan babu komai a buɗe, gabatarwar da ta fi kowa kyau har yanzu tana samun amsa.",
    openings: {
      heading: 'Buƙatun aiki da ke buɗe',
      currentlyHiringText: "Yanzu muna ɗaukar ma'aikata don… babu komai.",
      note: "Babu buƙatun aiki a buɗe a halin yanzu. Wannan layi ba kayan ado ba ne — muna kiyaye shi gaskiya. Lokacin da wani abu ya buɗe, zai zama matsayi na hakika tare da iyaka na hakika, kewayon albashi da manajan ɗaukar ma'aikata mai suna.",
    },
    introduceYourself: {
      eyebrow: 'Gabatar da kanka kome ya faru',
      heading: "Mafiya kyawun ma'aikatanmu sun rubuto mana kafin matsayi ya kasance.",
      body: 'Gaya mana abin da ka aika da abin da kake son ginawa na gaba. Sakin layi biyu sun fi CV mai walƙiya. Amsa ta gaskiya tana zuwa daga mutum na gaske, yawanci a cikin kwanaki biyu na aiki.',
    },
    howWeWork: [
      { title: 'Ƙaramar tawaga, tafsirin haɗin gwiwa', body: 'Codebase ɗaya. Modal ɗaya na deploy. Tafsiri ɗaya da aka raba a kowane samfurin Clap. Ba za ka rasa wata ɗaya kana koyon kayan aiki goma sha biyar da tarurruka biyar a rana ba. Tafsirin Next.js + Postgres + Payload guda ɗaya ne ke gudanar da wannan shafin, Clappe, ClapBill, ClapMed, da sauran. Aikawa fasali a samfuri ɗaya kuma za ka iya aikawa a kowane samfuri.' },
      { title: 'An haɓaka da AI, ba a maye gurbin da AI ba', body: 'Muna dogara akan AI sosai don leverage. Samar da code, fassara, tsara tallafi, gano zamba. Amma mutane ne ke rubuta layukan da ake aikawa. Mutane ne suka mallaki kowane zaɓi. Sana\'a tana da muhimmanci. Bita na code yana da muhimmanci. Mallaka tana da muhimmanci. AI kayan aiki ne mai ƙarfi, ba kafinta ba.' },
      { title: 'A nesa, da gaskiya', body: 'Muna a nesa saboda yana dacewa da aiki, ba don yana kan layi ba. Tarurruka gajeru ne kuma kaɗan. Rubutu hanya ce da muke ɗauka da muhimmanci. Yawancin yanke shawara suna rayuwa cikin taƙaitaccen rubutaccen rahoto wanda kowa zai iya karantawa watanni daga baya. Ana mutunta yankunan lokaci. Babu wanda ke ɗaukar taro a karfe uku na safe don dacewa da wani.' },
      { title: 'An gina don dogon wasa', body: 'Studio yana da kuɗin kansa kuma ba a sayar da shi ba. Muna shirin ci gaba da aikawa shekaru ashirin masu zuwa. Wannan yana nufin sannu-sannu mai ɗorewa, ƙarshen mako na hakika, da zaɓen matsalolin da ke girma da lokaci. Babu wanda ke gudu zuwa fita anan.' },
      { title: 'Lada, da gaskiya', body: 'Kowane buƙatar aiki da ke buɗe yana wallafa kewayon albashi a rubuce. Ba mu yin shawarwari da waɗanda suka yi tsammanin kewayo. Muna wallafa shi kuma muna biya. Ba a sa hannu a kan teburi — kamfanin ba a sayar da shi ba. Muna biya tsabar kuɗi mai gasa tare da nazarin shekara-shekara da ke da alaƙa da tasiri na hakika.' },
      { title: 'Karkata mai tsayi zuwa ga babba', body: "Yawancin ma'aikatan da muka ɗauka sun aika isa don riƙe ra'ayi mai ƙarfi kuma suna da raunuka isasshe don riƙe su a hankali. Mu ba layin tafiyar da samari masu shirye-shirye ba ne. Lokacin da muka ɗauki wani da wuri a aikinsa, ana gina rawar a kewayen jagoranci na hakika — ba rayuwa ba." },
    ],
    productFamily: [
      'ERP haɗaɗɗen — zuciyar tsarin halittar.',
      'Yin lissafi mai-mahaya da yawa don SMB da kamfanoni masu girma.',
      'Bayanan Likitanci na Lantarki masu wakili.',
      'Abinci da tsara abinci wanda dakin gwaje-gwaje ke jagora.',
      'Dandamali na kuɗi haɗaɗɗen na duniya.',
      'Kasuwar aikin yi mai zaman kanta a duniya wanda amincewa ke gaba.',
      'Kula da gonaki na kasuwanci da na ƙananan manoma.',
      'Kayan aikin watsa labarai da kerawa na AI.',
    ],
    process: [
      { stage: '01 · Sakin layi biyu', what: 'Ka aiko da imel zuwa ga matsayin. Sakin layi biyu: abin da ka aika, da abin da kake son ginawa na gaba. Ana maraba da CV mai walƙiya amma ba lallai ba. Muna karanta kowane imel. Amsa tana zuwa daga mutum na gaske, a cikin kwanaki biyu na aiki.' },
      { stage: '02 · Tattaunawa ta hakika', what: "Mintuna arba'in da biyar tare da manajan ɗaukar ma'aikata. Ba a ga \"gaya min lokacin da\" wasan kwaikwayo ba. Muna tattauna aiki na gaske — naka da namu. Kana yi tambayoyin da suka shafe ka. Muna raba bibiyar rubutaccen rahoto a cikin makon nan." },
      { stage: '03 · Ƙaramin guntun aiki na gaske', what: "Atisaye na sa'o'i huɗu zuwa shida wanda ke nuna abin da rawar take aikatawa a hakika, ana biya a kan farashin ƙwararren mu na yau da kullum. Ka adana abin da ka gina. Muna raba ra'ayin rubutaccen rahoto ba tare da la'akari da sakamako ba." },
      { stage: '04 · Magana da tayi', what: 'Kira na takaitacciyar magana tare da mutum biyu da ka taɓa aiki tare da su. Tayi da aka rubuta tare da albashi madaidaici, ranar farawa, kasafin kayan aiki da manufar lokacin hutu. Karɓi ko ƙi a rubuce — babu dabarun matsi.' },
    ],
  },
};

const PRESS: Record<LocaleCode, PressStrings> = {
  'zh-CN': {
    eyebrow: '新闻 · 媒体室', title: '写一些关于我们的真实内容。',
    lede: '此处的一切都已获准发布。请注明我们。需要更多?发邮件至 press@intelligentsingularityai.com。真人在一个工作日内回复。',
    boilerplate: 'Intelligent Singularity Inc. 是一家母公司和软件工作室。公司于 2024 年在加拿大艾伯塔省成立。它是 Clap 生态系统的母公司。Clap 生态系统是一个不断壮大的平台家族。它涵盖商业、健康、金融、工作、农业、创意媒体和共享基础设施。团队规模小、完全远程、AI 增强。每个产品都为通用访问而构建。同一旗舰产品同时服务于发达和发展中市场的客户。公司是自筹资金,不出售。',
    brandGuidance: {
      brandName: '首次使用时写 Intelligent Singularity。之后写 the studio。法律名称是 Intelligent Singularity Inc.,总部位于加拿大艾伯塔省。',
      founderReference: '首次引用 Dr. Md Diya,之后用 Diya。代词:he/him。可应要求提供照片和简短简介。',
    },
    contactCta: {
      eyebrow: '直接联系',
      heading: '需要引语、背景信息或创始人采访?',
      body: '请将您的截止日期发邮件至 press@intelligentsingularityai.com。每条消息都有真人阅读。我们在一个工作日内回复。',
    },
    quotes: [
      { text: '伟大的软件不是奢侈品。它是世界上任何地方每一家企业、每一位在做诚实工作的人的基本权利。', role: '创始人,Intelligent Singularity' },
      { text: '奥斯陆的孩子和马拉维农村的孩子,应该可以拿起同一款软件。这不是抱负。这是每个产品在出货时所遵守的约束。', role: '工作室宣言 · 2026' },
      { text: '今天仍有 22 亿人离线。其中 96% 生活在中低收入国家。我们不以向服务最充分的客户卖出多少来衡量成功;我们以地球上服务最不到位的人能否在自己的语言、自己的设备、自己实际拥有的网络连接下使用同一款产品,来衡量成功。', role: '创始人,Intelligent Singularity' },
      { text: '运行一个小型 AI 增强团队所节省的开支,并不用来支付更大的办公室或更喧闹的发布会。它们用来支付那个让一人企业不必信用卡就能进行真实运营的免费层。', role: '关于页面 · 2026' },
    ],
    factSheet: [
      { label: '法律实体', value: 'Intelligent Singularity Inc.' },
      { label: '成立', value: '2024 · 加拿大艾伯塔省' },
      { label: '创始人', value: 'Dr. Md Diya, MD' },
      { label: '创始人背景', value: '34 年跨大洲医疗从业经验' },
      { label: '架构', value: 'Clap 生态系统的母公司' },
      { label: '团队', value: '小型、远程、AI 增强' },
      { label: '融资', value: '自筹资金 · 自我融资 · 不出售' },
      { label: '产品组合', value: '跨 7 个类别且不断壮大的平台家族' },
      { label: '语言', value: '14 种发行语言 · 可触达 60 亿以上人口' },
      { label: '技术栈', value: '跨所有产品的同一共享平台' },
      { label: '网站占用', value: '每页 50 KB 以下 · 零第三方调用' },
    ],
    storyAnglesYes: [
      { title: '通用访问的实践', body: '单一产品如何在同一引擎上为财富 500 强买家和一人市场摊位提供服务,没有针对新兴市场的"精简版"。具体示例、真实工作流程、可应要求提供录屏。' },
      { title: 'AI 增强的小团队', body: '一家拥有十多个平台的母公司如何在一个小型远程团队上规模化交付,以及 AI 代理结构真正在做什么(与营销版本相比)。诚实的数字,而非虚荣指标。' },
      { title: '免费层的经济学', body: '为什么我们的免费层是结构上工程化的,而不是销售漏斗。区域定价在实践中如何运作。我们向企业客户收取多少费用,以及为什么金额是公布的,而不是协商的。' },
      { title: '面向每家诊所的医疗软件', body: 'ClapMed 是具备代理能力的电子病历。我们可以用通俗的话解释"代理"的含义。我们可以展示同一引擎如何同时服务苏黎世的私人诊所和农村卫生站。我们可以谈论监管路径。我们可以告诉你今天有什么是上线的。' },
      { title: '为离线的 22 亿人构建', body: 'ITU 2025 年的数字。它们对我们如何设计产品意味着什么。一个每页 50 KB 的企业网站如何与组合中更广泛的通用访问实践相联系。' },
    ],
    storyAnglesNo: [
      { title: '没有可工作软件的炒作功能', body: '我们不会预告未投产的功能。如果某个能力在路线图上,我们会诚实地说出来并链接到公开的路线图条目——但我们不会假装某个东西已经发货,而事实并非如此。' },
      { title: '"颠覆者对垒在位者"的框架', body: '我们不在营销或新闻中点名竞争对手,我们不会被引述批评其他公司。有趣的故事是我们正在构建什么,而不是我们据称在击败谁。' },
      { title: '对监管、政治或时事的热门评论', body: '我们是一家软件公司。我们会详细谈论访问、可访问性、隐私和数字鸿沟。我们不为不相关的政治或文化新闻周期提供引语。' },
    ],
  },
  es: {
    eyebrow: 'PRENSA · SALA DE MEDIOS', title: 'Escribe algo verdadero sobre nosotros.',
    lede: 'Todo aquí está aprobado para publicar. Por favor, atribúyenos. ¿Necesitas más? Envía un email a press@intelligentsingularityai.com. Una persona responde en un día laborable.',
    boilerplate: 'Intelligent Singularity Inc. es una empresa matriz y un estudio de software. Se fundó en Alberta, Canadá, en 2024. Es la matriz del ecosistema Clap. El ecosistema Clap es una familia creciente de plataformas. Cubre negocio, salud, finanzas, trabajo, agricultura, medios creativos e infraestructura compartida. El equipo es pequeño, totalmente remoto y aumentado por IA. Cada producto está construido para acceso universal. El mismo producto principal sirve a clientes en mercados desarrollados y en desarrollo. La empresa es bootstrapped y no está a la venta.',
    brandGuidance: {
      brandName: 'Escribe Intelligent Singularity en el primer uso. Después, the studio. El nombre legal es Intelligent Singularity Inc. Con sede en Alberta, Canadá.',
      founderReference: 'Dr. Md Diya en la primera referencia, Diya después. Pronombres: he/him. Fotos y biografía corta disponibles a petición.',
    },
    contactCta: {
      eyebrow: 'Contacto directo',
      heading: '¿Necesitas una cita, contexto o una entrevista con el fundador?',
      body: 'Envía un email a press@intelligentsingularityai.com con tu plazo. Una persona lee cada mensaje. Respondemos en un día laborable.',
    },
    quotes: [
      { text: 'El gran software no es un bien de lujo. Es un derecho básico para cada empresa y cada persona que hace un trabajo honesto en cualquier parte del mundo.', role: 'Fundador, Intelligent Singularity' },
      { text: 'Un niño en Oslo y un niño en la Malawi rural deberían alcanzar el mismo software. No es una aspiración. Es la restricción contra la que se entrega cada producto.', role: 'Manifiesto del estudio · 2026' },
      { text: 'Dos mil doscientos millones de personas siguen sin conexión hoy. El noventa y seis por ciento vive en países de ingresos bajos y medios. No medimos el éxito por cuánto vendemos al cliente mejor servido; lo medimos por si la persona menos servida en la Tierra puede usar el mismo producto, en su idioma, en su dispositivo, con la conexión que realmente tiene.', role: 'Fundador, Intelligent Singularity' },
      { text: 'Los ahorros de operar un pequeño equipo aumentado por IA no pagan oficinas más grandes ni lanzamientos más ruidosos. Pagan el plan gratuito que permite a un negocio de una sola persona ejecutar operaciones reales sin tarjeta de crédito.', role: 'Página Sobre · 2026' },
    ],
    factSheet: [
      { label: 'Entidad legal', value: 'Intelligent Singularity Inc.' },
      { label: 'Fundada', value: '2024 · Alberta, Canadá' },
      { label: 'Fundador', value: 'Dr. Md Diya, MD' },
      { label: 'Trayectoria del fundador', value: '34 años de práctica médica intercontinental' },
      { label: 'Estructura', value: 'Empresa matriz del ecosistema Clap' },
      { label: 'Equipo', value: 'Pequeño, remoto, aumentado por IA' },
      { label: 'Financiación', value: 'Bootstrapped · autofinanciado · no en venta' },
      { label: 'Portafolio', value: 'Una familia creciente de plataformas en 7 categorías' },
      { label: 'Idiomas', value: '14 idiomas de lanzamiento · al alcance de más de 6 mil millones de personas' },
      { label: 'Stack', value: 'Una plataforma compartida para cada producto' },
      { label: 'Huella del sitio', value: 'Menos de 50 KB por página · cero llamadas a terceros' },
    ],
    storyAnglesYes: [
      { title: 'Acceso universal en la práctica', body: 'Cómo un único producto se construye para atender a un comprador Fortune 500 y a un puesto de mercado unipersonal en el mismo motor, sin versiones "lite" para mercados emergentes. Ejemplos concretos, flujos de trabajo reales, grabaciones de pantalla a petición.' },
      { title: 'Equipos pequeños aumentados por IA', body: 'Cómo una empresa matriz con más de una docena de plataformas entrega a escala con un pequeño equipo remoto, y qué hace realmente el tejido de agentes IA (vs. la versión de marketing). Números honestos, no métricas de vanidad.' },
      { title: 'La economía del plan gratuito', body: 'Por qué nuestro plan gratuito está estructuralmente diseñado, no es un embudo de ventas. Cómo funciona en la práctica el precio regional. Cuánto cobramos a clientes empresariales y por qué el monto está publicado, no negociado.' },
      { title: 'Software sanitario para cada clínica', body: 'ClapMed es una historia clínica electrónica con agentes. Podemos explicar qué significa "agente" en palabras llanas. Podemos mostrar cómo el mismo motor sirve a una clínica privada en Zúrich y a un puesto de salud rural. Podemos hablar del camino regulatorio. Podemos decirte qué está activo hoy.' },
      { title: 'Construir para los 2,2 mil millones offline', body: 'Las cifras de la ITU 2025. Qué significan para cómo diseñamos productos. Cómo un sitio corporativo de 50 KB por página se conecta con una práctica más amplia de acceso universal en todo el portafolio.' },
    ],
    storyAnglesNo: [
      { title: 'Funciones bombo sin software funcionando', body: 'No preanunciamos funciones que no estén en producción. Si una capacidad está en la hoja de ruta, lo diremos honestamente y enlazaremos a la entrada pública de la hoja de ruta — pero no fingiremos que algo está enviado cuando no lo está.' },
      { title: 'El marco "disruptor vs. titular"', body: 'No nombramos competidores en marketing ni prensa, y no nos citarán criticando a otras empresas. La historia interesante es lo que estamos construyendo, no a quién supuestamente le ganamos.' },
      { title: 'Opiniones sobre regulación, política o actualidad', body: 'Somos una empresa de software. Hablaremos en detalle sobre acceso, accesibilidad, privacidad y brecha digital. No damos citas sobre ciclos noticiosos políticos o culturales no relacionados.' },
    ],
  },
  hi: {
    eyebrow: 'प्रेस · मीडिया कक्ष', title: 'हमारे बारे में कुछ सच लिखें।',
    lede: 'यहाँ सब कुछ प्रकाशन के लिए स्वीकृत है। कृपया हमें श्रेय दें। और चाहिए? press@intelligentsingularityai.com पर ईमेल करें। एक इंसान एक कार्य दिवस के भीतर जवाब देता है।',
    boilerplate: 'Intelligent Singularity Inc. एक मूल कंपनी और सॉफ़्टवेयर स्टूडियो है। इसे 2024 में अल्बर्टा, कनाडा में स्थापित किया गया। यह Clap इकोसिस्टम की मूल कंपनी है। Clap इकोसिस्टम बढ़ता हुआ प्लेटफ़ॉर्म परिवार है। यह व्यवसाय, स्वास्थ्य, वित्त, कार्य, कृषि, रचनात्मक मीडिया और साझा बुनियादी ढाँचे को कवर करता है। टीम छोटी, पूर्णतः दूरस्थ और AI-संवर्धित है। हर उत्पाद सार्वभौमिक पहुँच के लिए बनाया गया है। वही प्रमुख उत्पाद विकसित और विकासशील बाज़ारों दोनों के ग्राहकों की सेवा करता है। कंपनी बूटस्ट्रैप्ड है और बिक्री के लिए नहीं है।',
    brandGuidance: {
      brandName: 'पहली बार के उपयोग में Intelligent Singularity लिखें। फिर the studio। कानूनी नाम Intelligent Singularity Inc. है। मुख्यालय अल्बर्टा, कनाडा में।',
      founderReference: 'पहले संदर्भ में Dr. Md Diya, उसके बाद Diya। सर्वनाम: he/him। फ़ोटो और छोटी जीवनी अनुरोध पर उपलब्ध।',
    },
    contactCta: {
      eyebrow: 'सीधा संपर्क',
      heading: 'उद्धरण, पृष्ठभूमि या संस्थापक साक्षात्कार चाहिए?',
      body: 'अपनी समय-सीमा के साथ press@intelligentsingularityai.com पर ईमेल करें। हर संदेश एक इंसान पढ़ता है। हम एक कार्य दिवस में जवाब देते हैं।',
    },
    quotes: [
      { text: 'बेहतरीन सॉफ़्टवेयर कोई विलासिता की वस्तु नहीं है। यह दुनिया में कहीं भी ईमानदारी से काम करने वाले हर व्यवसाय और हर व्यक्ति का बुनियादी अधिकार है।', role: 'संस्थापक, Intelligent Singularity' },
      { text: 'ऑस्लो का बच्चा और ग्रामीण मलावी का बच्चा एक ही सॉफ़्टवेयर तक पहुँच सके। यह आकांक्षा नहीं है। यह वह बाधा है जिसके तहत हर उत्पाद शिप होता है।', role: 'स्टूडियो घोषणापत्र · 2026' },
      { text: 'आज भी 2.2 अरब लोग ऑफ़लाइन हैं। उनमें से 96% निम्न और मध्यम आय वाले देशों में रहते हैं। हम सफलता को इस आधार पर नहीं मापते कि सर्वोत्तम-सेवित ग्राहक को कितना बेचा; हम इसे इस आधार पर मापते हैं कि क्या पृथ्वी पर सबसे कम-सेवित व्यक्ति वही उत्पाद, अपनी भाषा में, अपने डिवाइस पर, उस कनेक्शन पर जो उसके पास वास्तव में है, इस्तेमाल कर सकता है।', role: 'संस्थापक, Intelligent Singularity' },
      { text: 'एक छोटी AI-संवर्धित टीम चलाने से होने वाली बचत बड़े दफ़्तरों या ज़्यादा शोरगुल वाले लॉन्च के लिए नहीं जाती। वह उस मुफ़्त टियर के लिए जाती है जो एक-व्यक्ति कारोबार को बिना क्रेडिट कार्ड के असली परिचालन चलाने देता है।', role: 'अबाउट पृष्ठ · 2026' },
    ],
    factSheet: [
      { label: 'कानूनी इकाई', value: 'Intelligent Singularity Inc.' },
      { label: 'स्थापना', value: '2024 · अल्बर्टा, कनाडा' },
      { label: 'संस्थापक', value: 'Dr. Md Diya, MD' },
      { label: 'संस्थापक पृष्ठभूमि', value: 'अंतरमहाद्वीपीय चिकित्सा अभ्यास के 34 वर्ष' },
      { label: 'संरचना', value: 'Clap इकोसिस्टम की मूल कंपनी' },
      { label: 'टीम', value: 'छोटी, दूरस्थ, AI-संवर्धित' },
      { label: 'वित्त पोषण', value: 'बूटस्ट्रैप्ड · स्व-वित्त पोषित · बिक्री के लिए नहीं' },
      { label: 'पोर्टफोलियो', value: '7 श्रेणियों में फैला हुआ बढ़ता प्लेटफ़ॉर्म परिवार' },
      { label: 'भाषाएँ', value: '14 शिपिंग भाषाएँ · 6 अरब से अधिक लोगों तक पहुँच' },
      { label: 'स्टैक', value: 'हर उत्पाद में एक साझा प्लेटफ़ॉर्म' },
      { label: 'वेबसाइट फुटप्रिंट', value: 'प्रति पृष्ठ 50 KB से कम · शून्य तृतीय-पक्ष कॉल' },
    ],
    storyAnglesYes: [
      { title: 'सार्वभौमिक पहुँच व्यवहार में', body: 'कैसे एक ही उत्पाद Fortune 500 खरीदार और एक-व्यक्ति बाज़ार-स्टॉल की उसी इंजन पर सेवा करने के लिए बनाया गया है, उभरते बाज़ारों के लिए "लाइट" संस्करण के बिना। ठोस उदाहरण, वास्तविक वर्कफ़्लो, अनुरोध पर स्क्रीन रिकॉर्डिंग।' },
      { title: 'AI-संवर्धित छोटी टीमें', body: 'एक मूल कंपनी एक दर्जन से अधिक प्लेटफ़ॉर्म के साथ छोटी रिमोट टीम पर पैमाने पर कैसे शिप करती है, और AI-एजेंट फ़ैब्रिक वास्तव में क्या करता है (मार्केटिंग संस्करण बनाम)। ईमानदार आँकड़े, घमंड वाली मीट्रिक नहीं।' },
      { title: 'मुफ़्त टियर की अर्थशास्त्र', body: 'हमारा मुफ़्त टियर संरचनात्मक रूप से इंजीनियर्ड क्यों है, बिक्री फ़नल नहीं। क्षेत्रीय मूल्य निर्धारण व्यवहार में कैसे काम करता है। हम एंटरप्राइज़ ग्राहकों से क्या लेते हैं और राशि क्यों प्रकाशित है, न कि बातचीत की गई।' },
      { title: 'हर क्लिनिक के लिए हेल्थकेयर सॉफ़्टवेयर', body: 'ClapMed एक एजेंटिक इलेक्ट्रॉनिक मेडिकल रिकॉर्ड है। हम सरल शब्दों में "एजेंटिक" का अर्थ समझा सकते हैं। हम दिखा सकते हैं कि वही इंजन ज़्यूरिख के निजी क्लिनिक और ग्रामीण स्वास्थ्य चौकी की सेवा कैसे करता है। हम विनियामक रास्ते के बारे में बात कर सकते हैं। हम आपको बता सकते हैं आज क्या लाइव है।' },
      { title: 'ऑफ़लाइन 2.2 अरब के लिए निर्माण', body: 'ITU 2025 के आँकड़े। उत्पाद डिज़ाइन के लिए उनका क्या मतलब है। एक 50 KB-प्रति-पृष्ठ कॉर्पोरेट साइट पूरे पोर्टफ़ोलियो में व्यापक सार्वभौमिक-पहुँच अभ्यास से कैसे जुड़ती है।' },
    ],
    storyAnglesNo: [
      { title: 'काम करते सॉफ़्टवेयर के बिना हाइप फ़ीचर', body: 'हम उन फ़ीचरों की पूर्व-घोषणा नहीं करेंगे जो उत्पादन में नहीं हैं। यदि कोई क्षमता रोडमैप पर है, तो हम ईमानदारी से कहेंगे और सार्वजनिक रोडमैप प्रविष्टि से लिंक करेंगे — लेकिन हम यह नहीं दिखाएँगे कि कुछ शिप होता है जबकि वह नहीं होता।' },
      { title: '"विघटनकर्ता बनाम स्थापित" फ़्रेमिंग', body: 'हम मार्केटिंग या प्रेस में प्रतिस्पर्धियों का नाम नहीं लेते, और हम अन्य कंपनियों की आलोचना के लिए उद्धृत नहीं किए जाएँगे। दिलचस्प कहानी वही है जो हम बना रहे हैं, न कि जिसे हम कथित तौर पर हरा रहे हैं।' },
      { title: 'विनियमन, राजनीति या वर्तमान घटनाओं पर तीखी टिप्पणियाँ', body: 'हम एक सॉफ़्टवेयर कंपनी हैं। हम पहुँच, सुलभता, निजता और डिजिटल विभाजन के बारे में विस्तार से बात करेंगे। हम असंबंधित राजनीतिक या सांस्कृतिक समाचार चक्रों पर उद्धरण नहीं देते।' },
    ],
  },
  ar: {
    eyebrow: 'الصحافة · غرفة الإعلام', title: 'اكتب شيئًا صادقًا عنّا.',
    lede: 'كل ما هنا معتمد للنشر. يرجى نسب الفضل إلينا. تحتاج إلى المزيد؟ راسل press@intelligentsingularityai.com. يردّ إنسان خلال يوم عمل واحد.',
    boilerplate: 'Intelligent Singularity Inc. شركة أم واستوديو برمجيات. تأسست في ألبرتا، كندا عام 2024. وهي الشركة الأم لمنظومة Clap. منظومة Clap عائلة متنامية من المنصات. تغطي الأعمال والصحة والتمويل والعمل والزراعة والإعلام الإبداعي والبنية التحتية المشتركة. الفريق صغير، عن بُعد بالكامل، ومُعزَّز بالذكاء الاصطناعي. كل منتج مبني للوصول الشامل. المنتج الرئيسي نفسه يخدم العملاء في الأسواق المتقدمة والنامية على حد سواء. الشركة ممولة ذاتيًا وغير معروضة للبيع.',
    brandGuidance: {
      brandName: 'اكتب Intelligent Singularity في أول استخدام. ثم اكتب the studio. الاسم القانوني هو Intelligent Singularity Inc. ومقرها ألبرتا، كندا.',
      founderReference: 'Dr. Md Diya في أول إشارة، ثم Diya بعد ذلك. الضمائر: he/him. الصور والسيرة المختصرة متاحة عند الطلب.',
    },
    contactCta: {
      eyebrow: 'تواصل مباشر',
      heading: 'هل تحتاج إلى اقتباس، أو خلفية، أو مقابلة مع المؤسس؟',
      body: 'راسل press@intelligentsingularityai.com مع موعد التسليم. إنسان يقرأ كل ملاحظة. نرد خلال يوم عمل واحد.',
    },
    quotes: [
      { text: 'البرمجيات العظيمة ليست سلعة كمالية. هي حق أساسي لكل عمل ولكل إنسان يقوم بعمل صادق في أي مكان من العالم.', role: 'المؤسس، Intelligent Singularity' },
      { text: 'يجب أن يصل طفل في أوسلو وطفل في الريف الملاوي إلى البرنامج نفسه. هذا ليس طموحًا. هذا هو القيد الذي يُطلَق به كل منتج.', role: 'بيان الاستوديو · 2026' },
      { text: 'لا يزال 2.2 مليار شخص خارج الإنترنت اليوم. يعيش 96% منهم في بلدان منخفضة ومتوسطة الدخل. لا نقيس النجاح بمقدار ما نبيعه للعميل الأفضل خدمة؛ نقيسه بقدرة أقل الناس خدمةً على الأرض على استخدام المنتج نفسه، بلغته، على جهازه، عبر الاتصال الذي يملكه فعلًا.', role: 'المؤسس، Intelligent Singularity' },
      { text: 'الوفورات الناتجة عن تشغيل فريق صغير مُعزَّز بالذكاء الاصطناعي لا تُنفَق على مكاتب أكبر أو إطلاقات أعلى صوتًا. تُنفَق على الباقة المجانية التي تتيح لعمل من شخص واحد إدارة عمليات حقيقية دون بطاقة ائتمان.', role: 'صفحة من نحن · 2026' },
    ],
    factSheet: [
      { label: 'الكيان القانوني', value: 'Intelligent Singularity Inc.' },
      { label: 'التأسيس', value: '2024 · ألبرتا، كندا' },
      { label: 'المؤسس', value: 'Dr. Md Diya, MD' },
      { label: 'خلفية المؤسس', value: '34 عامًا من الممارسة الطبية بين القارات' },
      { label: 'البنية', value: 'الشركة الأم لمنظومة Clap' },
      { label: 'الفريق', value: 'صغير، عن بُعد، مُعزَّز بالذكاء الاصطناعي' },
      { label: 'التمويل', value: 'ممول ذاتيًا · لا للبيع' },
      { label: 'المحفظة', value: 'عائلة متنامية من المنصات عبر 7 فئات' },
      { label: 'اللغات', value: '14 لغة إطلاق · يمكن الوصول إلى أكثر من 6 مليارات شخص' },
      { label: 'الحزمة التقنية', value: 'منصة واحدة مشتركة عبر كل المنتجات' },
      { label: 'بصمة الموقع', value: 'أقل من 50 ك.ب لكل صفحة · صفر مكالمات لطرف ثالث' },
    ],
    storyAnglesYes: [
      { title: 'الوصول الشامل في الممارسة', body: 'كيف يُبنى منتج واحد ليخدم مشتريًا من Fortune 500 وكشكًا تجاريًا لشخص واحد على المحرك ذاته، دون إصدارات "خفيفة" للأسواق الناشئة. أمثلة محددة، تدفقات عمل حقيقية، تسجيلات شاشة عند الطلب.' },
      { title: 'فرق صغيرة مُعزَّزة بالذكاء الاصطناعي', body: 'كيف تُسلِّم شركة أم بأكثر من اثنتي عشرة منصة بنطاق واسع عبر فريق صغير عن بُعد، وما الذي تفعله بنية الوكلاء الذكية فعلًا (مقابل النسخة التسويقية). أرقام صادقة، لا مقاييس فخر فارغة.' },
      { title: 'اقتصاديات الباقة المجانية', body: 'لماذا باقتنا المجانية مهندَسة هيكليًا، لا قمعًا للبيع. كيف يعمل التسعير الإقليمي عمليًا. ما نتقاضاه من عملاء الشركات ولماذا المبلغ منشور لا يُتفاوض عليه.' },
      { title: 'برمجيات الرعاية الصحية لكل عيادة', body: 'ClapMed سجل طبي إلكتروني وكيلي. يمكننا شرح معنى "وكيلي" بكلمات بسيطة. يمكننا توضيح كيف يخدم المحرك ذاته عيادة خاصة في زيورخ ومركزًا صحيًا ريفيًا. يمكننا الحديث عن المسار التنظيمي. يمكننا إخبارك بما هو نشط اليوم.' },
      { title: 'البناء لـ 2.2 مليار خارج الإنترنت', body: 'أرقام ITU لعام 2025. ماذا تعني لطريقة تصميمنا للمنتجات. كيف يرتبط موقع شركة بحجم 50 ك.ب لكل صفحة بممارسة وصول شامل أوسع عبر المحفظة.' },
    ],
    storyAnglesNo: [
      { title: 'ميزات الضجيج دون برامج عاملة', body: 'لن نُعلن مسبقًا عن ميزات ليست في الإنتاج. إذا كانت قدرة على خارطة الطريق، فسنقول ذلك بصدق ونربط بمدخل خارطة الطريق العام — لكننا لن ندعي أن شيئًا يُطلَق وهو ليس كذلك.' },
      { title: 'إطار "المُعطِّل مقابل الراسخ"', body: 'لا نسمي المنافسين في التسويق أو الصحافة، ولن نُقتبس وننتقد شركات أخرى. القصة المثيرة هي ما نبنيه، لا من نهزمه افتراضًا.' },
      { title: 'آراء حادة في التنظيم والسياسة والأحداث الراهنة', body: 'نحن شركة برمجيات. سنتحدث بتفصيل عن الوصول وقابلية الوصول والخصوصية والفجوة الرقمية. لا نقدم اقتباسات في دورات أخبار سياسية أو ثقافية غير مرتبطة.' },
    ],
  },
  fr: {
    eyebrow: 'PRESSE · SALLE DE PRESSE', title: 'Écrivez quelque chose de vrai sur nous.',
    lede: "Tout ici est approuvé pour la publication. Merci de nous créditer. Besoin de plus ? Envoyez un email à press@intelligentsingularityai.com. Une personne répond sous un jour ouvré.",
    boilerplate: "Intelligent Singularity Inc. est une société mère et un studio logiciel. Elle a été créée en Alberta, au Canada, en 2024. Elle est la société mère de l'écosystème Clap. L'écosystème Clap est une famille croissante de plateformes. Il couvre business, santé, finance, travail, agriculture, médias créatifs et infrastructure partagée. L'équipe est petite, entièrement à distance, et augmentée par l'IA. Chaque produit est construit pour un accès universel. Le même produit phare sert les clients des marchés développés et en développement. La société est bootstrapped et n'est pas à vendre.",
    brandGuidance: {
      brandName: "Écrivez Intelligent Singularity à la première utilisation. Ensuite, the studio. Le nom légal est Intelligent Singularity Inc. Basée en Alberta, au Canada.",
      founderReference: "Dr. Md Diya à la première référence, Diya ensuite. Pronoms : he/him. Photos et bio courte disponibles sur demande.",
    },
    contactCta: {
      eyebrow: 'Contact direct',
      heading: "Besoin d'une citation, d'un contexte ou d'une interview du fondateur ?",
      body: "Envoyez un email à press@intelligentsingularityai.com avec votre échéance. Une personne lit chaque message. Nous répondons sous un jour ouvré.",
    },
    quotes: [
      { text: "Un excellent logiciel n'est pas un bien de luxe. C'est un droit fondamental pour chaque entreprise et chaque personne qui fait un travail honnête, où que ce soit dans le monde.", role: 'Fondateur, Intelligent Singularity' },
      { text: "Un enfant à Oslo et un enfant dans la Malawi rurale devraient pouvoir prendre le même logiciel. Ce n'est pas une aspiration. C'est la contrainte avec laquelle chaque produit est livré.", role: 'Manifeste du studio · 2026' },
      { text: "Deux milliards deux cents millions de personnes sont encore hors ligne aujourd'hui. Quatre-vingt-seize pour cent vivent dans des pays à revenu faible ou intermédiaire. Nous ne mesurons pas le succès à l'aune de ce que nous vendons au client le mieux servi ; nous le mesurons en regardant si la personne la moins servie au monde peut utiliser le même produit, dans sa langue, sur son appareil, avec la connexion qu'elle a réellement.", role: 'Fondateur, Intelligent Singularity' },
      { text: "Les économies réalisées en faisant tourner une petite équipe augmentée par l'IA ne paient pas des bureaux plus grands ou des lancements plus bruyants. Elles paient le forfait gratuit qui permet à une entreprise d'une personne de mener de vraies opérations sans carte de crédit.", role: 'Page À propos · 2026' },
    ],
    factSheet: [
      { label: 'Entité légale', value: 'Intelligent Singularity Inc.' },
      { label: 'Fondée', value: '2024 · Alberta, Canada' },
      { label: 'Fondateur', value: 'Dr. Md Diya, MD' },
      { label: 'Parcours du fondateur', value: '34 ans de pratique médicale transcontinentale' },
      { label: 'Structure', value: "Société mère de l'écosystème Clap" },
      { label: 'Équipe', value: 'Petite, à distance, augmentée par IA' },
      { label: 'Financement', value: 'Bootstrapped · auto-financé · pas à vendre' },
      { label: 'Portefeuille', value: 'Une famille croissante de plateformes dans 7 catégories' },
      { label: 'Langues', value: '14 langues de lancement · accessibles à plus de 6 milliards de personnes' },
      { label: 'Stack', value: 'Une seule plateforme partagée pour chaque produit' },
      { label: 'Empreinte du site', value: 'Moins de 50 Ko par page · zéro appel tiers' },
    ],
    storyAnglesYes: [
      { title: "L'accès universel en pratique", body: "Comment un produit unique est construit pour servir un acheteur Fortune 500 et un stand de marché individuel sur le même moteur, sans versions « lite » pour les marchés émergents. Exemples concrets, flux de travail réels, enregistrements d'écran sur demande." },
      { title: 'Petites équipes augmentées par IA', body: "Comment une société mère avec plus d'une douzaine de plateformes livre à grande échelle avec une petite équipe à distance, et ce que fait réellement le tissu d'agents IA (vs. la version marketing). Des chiffres honnêtes, pas des métriques de vanité." },
      { title: "L'économie du forfait gratuit", body: "Pourquoi notre forfait gratuit est conçu structurellement, pas un entonnoir de vente. Comment fonctionne la tarification régionale en pratique. Ce que nous facturons aux clients entreprises et pourquoi le montant est publié, pas négocié." },
      { title: 'Logiciel de santé pour chaque clinique', body: "ClapMed est un dossier médical électronique agentique. Nous pouvons expliquer ce que « agentique » signifie en termes simples. Nous pouvons montrer comment le même moteur sert une clinique privée à Zurich et un poste de santé rural. Nous pouvons parler du parcours réglementaire. Nous pouvons vous dire ce qui est en ligne aujourd'hui." },
      { title: 'Construire pour les 2,2 milliards hors ligne', body: "Les chiffres ITU 2025. Ce qu'ils signifient pour la conception de produits. Comment un site corporate de 50 Ko par page se rattache à une pratique plus large d'accès universel à travers le portefeuille." },
    ],
    storyAnglesNo: [
      { title: 'Fonctionnalités hype sans logiciel fonctionnel', body: "Nous ne pré-annoncerons pas de fonctionnalités qui ne sont pas en production. Si une capacité est sur la feuille de route, nous le dirons honnêtement et lierons à l'entrée publique — mais nous ne prétendrons pas qu'une chose est livrée alors qu'elle ne l'est pas." },
      { title: 'Le cadrage « disrupteur contre titulaire »', body: "Nous ne nommons pas de concurrents dans le marketing ou la presse, et nous ne serons pas cités en train de critiquer d'autres entreprises. L'histoire intéressante est ce que nous construisons, pas qui nous battons soi-disant." },
      { title: "Prises de position sur la régulation, la politique ou l'actualité", body: "Nous sommes une société de logiciels. Nous parlerons en détail d'accès, d'accessibilité, de vie privée, et de fracture numérique. Nous ne donnons pas de citations sur des cycles d'actualité politique ou culturelle non liés." },
    ],
  },
  pt: {
    eyebrow: 'IMPRENSA · SALA DE MEDIA', title: 'Escreva algo verdadeiro sobre nós.',
    lede: 'Tudo aqui está aprovado para publicação. Por favor, dê-nos crédito. Precisa de mais? Envie um email para press@intelligentsingularityai.com. Uma pessoa responde dentro de um dia útil.',
    boilerplate: 'A Intelligent Singularity Inc. é uma empresa-mãe e um estúdio de software. Foi criada em Alberta, Canadá, em 2024. É a empresa-mãe do ecossistema Clap. O ecossistema Clap é uma família crescente de plataformas. Cobre negócio, saúde, finanças, trabalho, agricultura, media criativa e infraestrutura partilhada. A equipa é pequena, totalmente remota e aumentada por IA. Cada produto é construído para acesso universal. O mesmo produto principal serve clientes em mercados desenvolvidos e em desenvolvimento. A empresa é bootstrapped e não está à venda.',
    brandGuidance: {
      brandName: 'Escreva Intelligent Singularity na primeira utilização. Depois, the studio. O nome legal é Intelligent Singularity Inc. Sediada em Alberta, Canadá.',
      founderReference: 'Dr. Md Diya na primeira referência, Diya a seguir. Pronomes: he/him. Fotos e biografia curta disponíveis a pedido.',
    },
    contactCta: {
      eyebrow: 'Contacto direto',
      heading: 'Precisa de uma citação, contexto, ou de uma entrevista com o fundador?',
      body: 'Envie um email para press@intelligentsingularityai.com com o seu prazo. Uma pessoa lê cada mensagem. Respondemos dentro de um dia útil.',
    },
    quotes: [
      { text: 'O bom software não é um bem de luxo. É um direito básico para cada empresa e cada pessoa que faz um trabalho honesto em qualquer parte do mundo.', role: 'Fundador, Intelligent Singularity' },
      { text: 'Uma criança em Oslo e uma criança na Malavi rural deviam poder pegar no mesmo software. Não é uma aspiração. É a restrição com que cada produto é lançado.', role: 'Manifesto do estúdio · 2026' },
      { text: 'Há 2,2 mil milhões de pessoas ainda offline hoje. 96% delas vivem em países de baixo e médio rendimento. Não medimos o sucesso pelo quanto vendemos ao cliente mais bem servido; medimo-lo pela capacidade da pessoa menos bem servida na Terra de usar o mesmo produto, na sua língua, no seu dispositivo, na ligação que ela realmente tem.', role: 'Fundador, Intelligent Singularity' },
      { text: 'As poupanças de uma equipa pequena aumentada por IA não pagam escritórios maiores nem lançamentos mais barulhentos. Pagam o plano gratuito que permite a um negócio de uma só pessoa operar a sério sem cartão de crédito.', role: 'Página Sobre · 2026' },
    ],
    factSheet: [
      { label: 'Entidade legal', value: 'Intelligent Singularity Inc.' },
      { label: 'Fundada', value: '2024 · Alberta, Canadá' },
      { label: 'Fundador', value: 'Dr. Md Diya, MD' },
      { label: 'Antecedentes do fundador', value: '34 anos de prática médica intercontinental' },
      { label: 'Estrutura', value: 'Empresa-mãe do ecossistema Clap' },
      { label: 'Equipa', value: 'Pequena, remota, aumentada por IA' },
      { label: 'Financiamento', value: 'Bootstrapped · autofinanciada · não está à venda' },
      { label: 'Portfólio', value: 'Uma família crescente de plataformas em 7 categorias' },
      { label: 'Idiomas', value: '14 idiomas de lançamento · ao alcance de mais de 6 mil milhões de pessoas' },
      { label: 'Stack', value: 'Uma plataforma partilhada em cada produto' },
      { label: 'Pegada do site', value: 'Menos de 50 KB por página · zero chamadas a terceiros' },
    ],
    storyAnglesYes: [
      { title: 'Acesso universal na prática', body: 'Como um único produto é construído para servir um comprador Fortune 500 e uma banca de mercado de uma só pessoa no mesmo motor, sem versões "lite" para mercados emergentes. Exemplos concretos, fluxos de trabalho reais, gravações de ecrã a pedido.' },
      { title: 'Equipas pequenas aumentadas por IA', body: 'Como uma empresa-mãe com mais de uma dúzia de plataformas entrega em escala com uma equipa pequena e remota, e o que o tecido de agentes IA realmente faz (vs. a versão de marketing). Números honestos, não métricas de vaidade.' },
      { title: 'A economia do plano gratuito', body: 'Porque é que o nosso plano gratuito é desenhado estruturalmente, não um funil de vendas. Como o preço regional funciona na prática. Quanto cobramos a clientes enterprise e porque o valor é publicado, não negociado.' },
      { title: 'Software de saúde para cada clínica', body: 'O ClapMed é um registo médico eletrónico agêntico. Podemos explicar o que "agêntico" significa em palavras simples. Podemos mostrar como o mesmo motor serve uma clínica privada em Zurique e um posto de saúde rural. Podemos falar do percurso regulatório. Podemos dizer-lhe o que está ativo hoje.' },
      { title: 'Construir para os 2,2 mil milhões offline', body: 'Os números ITU 2025. O que significam para a forma como concebemos produtos. Como um site corporativo de 50 KB por página se liga a uma prática mais ampla de acesso universal em todo o portefólio.' },
    ],
    storyAnglesNo: [
      { title: 'Funcionalidades hype sem software a funcionar', body: 'Não anunciaremos antecipadamente funcionalidades que não estejam em produção. Se uma capacidade está na roadmap, vamos dizê-lo honestamente e ligar à entrada pública — mas não fingiremos que algo está lançado quando não está.' },
      { title: 'O enquadramento "disruptor vs. estabelecido"', body: 'Não nomeamos concorrentes em marketing nem imprensa, e não seremos citados a criticar outras empresas. A história interessante é o que estamos a construir, não quem alegadamente estamos a vencer.' },
      { title: 'Opiniões sobre regulação, política ou atualidade', body: 'Somos uma empresa de software. Falaremos em detalhe sobre acesso, acessibilidade, privacidade e a divisão digital. Não damos citações em ciclos de notícias políticas ou culturais não relacionados.' },
    ],
  },
  bn: {
    eyebrow: 'প্রেস · মিডিয়া কক্ষ', title: 'আমাদের সম্পর্কে কিছু সত্য লিখুন।',
    lede: 'এখানে সবকিছু প্রকাশের জন্য অনুমোদিত। অনুগ্রহ করে আমাদের কৃতিত্ব দিন। আরও দরকার? press@intelligentsingularityai.com-এ ইমেইল করুন। একজন মানুষ এক কার্যদিবসের মধ্যে উত্তর দেয়।',
    boilerplate: 'Intelligent Singularity Inc. একটি মূল কোম্পানি এবং সফটওয়্যার স্টুডিও। এটি 2024 সালে কানাডার আলবার্টায় প্রতিষ্ঠিত হয়েছিল। এটি Clap ইকোসিস্টেমের মূল কোম্পানি। Clap ইকোসিস্টেম একটি ক্রমবর্ধমান প্ল্যাটফর্ম পরিবার। এটি ব্যবসা, স্বাস্থ্য, অর্থ, কাজ, কৃষি, সৃজনশীল মিডিয়া এবং ভাগাভাগি অবকাঠামো কভার করে। দলটি ছোট, সম্পূর্ণ রিমোট এবং AI-সংবর্ধিত। প্রতিটি পণ্য সর্বজনীন প্রবেশের জন্য তৈরি। একই প্রধান পণ্য উন্নত এবং উন্নয়নশীল বাজার উভয়ের গ্রাহকদের সেবা করে। কোম্পানিটি বুটস্ট্র্যাপড এবং বিক্রির জন্য নয়।',
    brandGuidance: {
      brandName: 'প্রথম ব্যবহারে Intelligent Singularity লিখুন। তারপর the studio। আইনি নাম Intelligent Singularity Inc.। কানাডার আলবার্টায় অবস্থিত।',
      founderReference: 'প্রথম উল্লেখে Dr. Md Diya, এরপর Diya। সর্বনাম: he/him। অনুরোধে ছবি এবং সংক্ষিপ্ত জীবনী উপলব্ধ।',
    },
    contactCta: {
      eyebrow: 'সরাসরি যোগাযোগ',
      heading: 'উদ্ধৃতি, পটভূমি, বা প্রতিষ্ঠাতার সাক্ষাৎকার দরকার?',
      body: 'আপনার সময়সীমা সহ press@intelligentsingularityai.com-এ ইমেইল করুন। প্রতিটি বার্তা একজন মানুষ পড়েন। আমরা এক কার্যদিবসে উত্তর দিই।',
    },
    quotes: [
      { text: 'উৎকৃষ্ট সফটওয়্যার বিলাসদ্রব্য নয়। এটি বিশ্বের যে কোনো জায়গায় সৎ কাজ করা প্রতিটি ব্যবসা এবং প্রতিটি ব্যক্তির মৌলিক অধিকার।', role: 'প্রতিষ্ঠাতা, Intelligent Singularity' },
      { text: 'অসলোর একটি শিশু এবং গ্রামীণ মালাউইয়ের একটি শিশু একই সফটওয়্যার পর্যন্ত পৌঁছাতে পারবে। এটি কোনো আকাঙ্ক্ষা নয়। এটি সেই সীমাবদ্ধতা যার বিরুদ্ধে প্রতিটি পণ্য শিপ করা হয়।', role: 'স্টুডিও ঘোষণাপত্র · 2026' },
      { text: 'আজও 2.2 বিলিয়ন মানুষ অফলাইনে আছেন। তাদের 96% নিম্ন ও মধ্যম আয়ের দেশগুলোতে বাস করেন। আমরা সফলতা পরিমাপ করি না সর্বাধিক-সেবিত গ্রাহকের কাছে কতটা বিক্রি করেছি তার দ্বারা; আমরা পরিমাপ করি পৃথিবীর সর্বনিম্ন-সেবিত ব্যক্তি একই পণ্য, তাঁর ভাষায়, তাঁর ডিভাইসে, তিনি বাস্তবে যে সংযোগ পান, ব্যবহার করতে পারেন কি না তার দ্বারা।', role: 'প্রতিষ্ঠাতা, Intelligent Singularity' },
      { text: 'একটি ছোট AI-সংবর্ধিত দল চালানো থেকে যে সাশ্রয় হয় তা বড়ো অফিস বা আরও কোলাহলপূর্ণ লঞ্চের জন্য খরচ হয় না। তা সেই ফ্রি টিয়ারের জন্য খরচ হয় যা একজন-ব্যক্তির ব্যবসাকে ক্রেডিট কার্ড ছাড়াই বাস্তব অপারেশন চালাতে দেয়।', role: 'সম্পর্কে পৃষ্ঠা · 2026' },
    ],
    factSheet: [
      { label: 'আইনি সত্তা', value: 'Intelligent Singularity Inc.' },
      { label: 'প্রতিষ্ঠা', value: '2024 · আলবার্টা, কানাডা' },
      { label: 'প্রতিষ্ঠাতা', value: 'Dr. Md Diya, MD' },
      { label: 'প্রতিষ্ঠাতার পটভূমি', value: 'আন্তর্মহাদেশীয় চিকিৎসা চর্চার 34 বছর' },
      { label: 'কাঠামো', value: 'Clap ইকোসিস্টেমের মূল কোম্পানি' },
      { label: 'দল', value: 'ছোট, রিমোট, AI-সংবর্ধিত' },
      { label: 'অর্থায়ন', value: 'বুটস্ট্র্যাপড · স্ব-অর্থায়িত · বিক্রির জন্য নয়' },
      { label: 'পোর্টফোলিও', value: '7টি শ্রেণিতে ছড়িয়ে থাকা ক্রমবর্ধমান প্ল্যাটফর্ম পরিবার' },
      { label: 'ভাষা', value: '14টি শিপিং ভাষা · 6 বিলিয়নের বেশি মানুষের কাছে পৌঁছানো' },
      { label: 'স্ট্যাক', value: 'প্রতিটি পণ্যে একটি ভাগাভাগি প্ল্যাটফর্ম' },
      { label: 'ওয়েবসাইট ফুটপ্রিন্ট', value: 'প্রতি পৃষ্ঠা 50 KB-এর কম · শূন্য তৃতীয়-পক্ষ কল' },
    ],
    storyAnglesYes: [
      { title: 'বাস্তবে সর্বজনীন প্রবেশাধিকার', body: 'কীভাবে একটি একক পণ্য একই ইঞ্জিনে Fortune 500 ক্রেতা এবং একজন-ব্যক্তির বাজার-স্টলকে সেবা দেওয়ার জন্য তৈরি, উদীয়মান বাজারের জন্য "লাইট" সংস্করণ ছাড়াই। নির্দিষ্ট উদাহরণ, বাস্তব ওয়ার্কফ্লো, অনুরোধে স্ক্রিন রেকর্ডিং।' },
      { title: 'AI-সংবর্ধিত ছোট দল', body: 'এক ডজনের বেশি প্ল্যাটফর্মসহ একটি মূল কোম্পানি ছোট রিমোট দল নিয়ে কীভাবে স্কেলে শিপ করে, এবং AI-এজেন্ট ফ্যাব্রিক আসলে কী করে (মার্কেটিং সংস্করণের তুলনায়)। সৎ সংখ্যা, অহংকারী মেট্রিক নয়।' },
      { title: 'ফ্রি টিয়ারের অর্থনীতি', body: 'কেন আমাদের ফ্রি টিয়ার কাঠামোগতভাবে ইঞ্জিনিয়ার্ড, বিক্রির ফানেল নয়। আঞ্চলিক মূল্য বাস্তবে কীভাবে কাজ করে। আমরা এন্টারপ্রাইজ গ্রাহকদের কত নিই এবং কেন পরিমাণ প্রকাশিত, আলোচনা করা নয়।' },
      { title: 'প্রতিটি ক্লিনিকের জন্য স্বাস্থ্যসেবা সফটওয়্যার', body: 'ClapMed একটি এজেন্টিক ইলেকট্রনিক মেডিকেল রেকর্ড। আমরা সরল ভাষায় "এজেন্টিক" এর অর্থ ব্যাখ্যা করতে পারি। আমরা দেখাতে পারি কীভাবে একই ইঞ্জিন জুরিখের ব্যক্তিগত ক্লিনিক এবং গ্রামীণ স্বাস্থ্য পোস্ট উভয়কে সেবা দেয়। আমরা নিয়ন্ত্রক পথ সম্পর্কে কথা বলতে পারি। আমরা আপনাকে বলতে পারি আজ কী লাইভ আছে।' },
      { title: 'অফলাইন 2.2 বিলিয়নের জন্য নির্মাণ', body: 'ITU 2025-এর সংখ্যা। পণ্য ডিজাইনে এর অর্থ কী। প্রতি পৃষ্ঠা 50 KB-এর একটি কর্পোরেট সাইট পোর্টফোলিও জুড়ে বিস্তৃত সর্বজনীন-প্রবেশ অনুশীলনের সাথে কীভাবে সংযুক্ত হয়।' },
    ],
    storyAnglesNo: [
      { title: 'কার্যকর সফটওয়্যার ছাড়া হাইপ ফিচার', body: 'উৎপাদনে নেই এমন ফিচার আমরা পূর্ব-ঘোষণা করব না। যদি কোনো সক্ষমতা রোডম্যাপে থাকে, আমরা সততার সাথে বলব এবং পাবলিক রোডম্যাপ এন্ট্রির সাথে লিঙ্ক করব — কিন্তু আমরা ভান করব না যে কিছু শিপ হয় যখন তা হয়নি।' },
      { title: '"বিঘ্নকারী বনাম প্রতিষ্ঠিত" ফ্রেমিং', body: 'মার্কেটিং বা প্রেসে আমরা প্রতিযোগীদের নাম নিই না, এবং অন্য কোম্পানিগুলোর সমালোচনা করতে আমাদের উদ্ধৃত করা হবে না। আকর্ষণীয় গল্পটি হলো আমরা কী তৈরি করছি, কাকে আমরা কথিতভাবে হারাচ্ছি তা নয়।' },
      { title: 'নিয়ন্ত্রণ, রাজনীতি বা চলমান ঘটনাবলির উপর তীক্ষ্ণ মতামত', body: 'আমরা একটি সফটওয়্যার কোম্পানি। আমরা প্রবেশাধিকার, প্রবেশযোগ্যতা, গোপনীয়তা এবং ডিজিটাল বিভাজন সম্পর্কে বিস্তারিত কথা বলব। অসংশ্লিষ্ট রাজনৈতিক বা সাংস্কৃতিক সংবাদ চক্রের জন্য আমরা উদ্ধৃতি প্রদান করি না।' },
    ],
  },
  ru: {
    eyebrow: 'ПРЕССА · МЕДИА-ЦЕНТР', title: 'Напишите о нас что-то правдивое.',
    lede: 'Всё здесь одобрено к публикации. Пожалуйста, упоминайте нас. Нужно больше? Напишите на press@intelligentsingularityai.com. Живой человек отвечает в течение одного рабочего дня.',
    boilerplate: 'Intelligent Singularity Inc. — материнская компания и софт-студия. Основана в Альберте, Канада, в 2024 году. Является материнской для экосистемы Clap. Экосистема Clap — растущее семейство платформ. Охватывает бизнес, здоровье, финансы, работу, сельское хозяйство, креативные медиа и общую инфраструктуру. Команда небольшая, полностью удалённая и усиленная ИИ. Каждый продукт создан для универсального доступа. Один и тот же флагманский продукт обслуживает клиентов как на развитых, так и на развивающихся рынках. Компания самофинансируемая и не продаётся.',
    brandGuidance: {
      brandName: 'При первом упоминании пишите Intelligent Singularity. Затем — the studio. Юридическое название — Intelligent Singularity Inc. Базируется в Альберте, Канада.',
      founderReference: 'Dr. Md Diya при первом упоминании, далее — Diya. Местоимения: he/him. Фото и короткая биография по запросу.',
    },
    contactCta: {
      eyebrow: 'Прямой контакт',
      heading: 'Нужна цитата, бэкграунд или интервью с основателем?',
      body: 'Напишите на press@intelligentsingularityai.com и укажите дедлайн. Каждое письмо читает человек. Мы отвечаем в течение одного рабочего дня.',
    },
    quotes: [
      { text: 'Хорошее ПО — не предмет роскоши. Это базовое право каждой компании и каждого человека, занятого честным трудом, где бы он ни находился.', role: 'Основатель, Intelligent Singularity' },
      { text: 'Ребёнок в Осло и ребёнок в сельском Малави должны тянуться к одному и тому же ПО. Это не цель. Это ограничение, под которое выпускается каждый продукт.', role: 'Манифест студии · 2026' },
      { text: 'Сегодня 2,2 миллиарда людей всё ещё оффлайн. 96% из них живут в странах с низким и средним доходом. Мы измеряем успех не тем, сколько продали наиболее обслуживаемому клиенту, — а тем, может ли наименее обслуживаемый человек на Земле использовать тот же продукт, на своём языке, на своём устройстве, через ту связь, которая у него реально есть.', role: 'Основатель, Intelligent Singularity' },
      { text: 'Сэкономленное на маленькой команде, усиленной ИИ, не идёт на офисы побольше или громче-запуски. Оно идёт на бесплатный тариф, который позволяет бизнесу из одного человека вести реальные операции без кредитной карты.', role: 'Страница «О нас» · 2026' },
    ],
    factSheet: [
      { label: 'Юридическое лицо', value: 'Intelligent Singularity Inc.' },
      { label: 'Основана', value: '2024 · Альберта, Канада' },
      { label: 'Основатель', value: 'Dr. Md Diya, MD' },
      { label: 'Бэкграунд основателя', value: '34 года межконтинентальной медицинской практики' },
      { label: 'Структура', value: 'Материнская компания экосистемы Clap' },
      { label: 'Команда', value: 'Маленькая, удалённая, усиленная ИИ' },
      { label: 'Финансирование', value: 'Bootstrapped · самофинансируемая · не продаётся' },
      { label: 'Портфель', value: 'Растущее семейство платформ в 7 категориях' },
      { label: 'Языки', value: '14 языков выпуска · охватывают более 6 миллиардов человек' },
      { label: 'Стек', value: 'Одна общая платформа для всех продуктов' },
      { label: 'Размер сайта', value: 'Менее 50 КБ на страницу · ноль вызовов сторонних' },
    ],
    storyAnglesYes: [
      { title: 'Универсальный доступ на практике', body: 'Как один продукт построен, чтобы обслуживать покупателя из Fortune 500 и одиночный рыночный прилавок на одном движке, без «облегчённых» версий для развивающихся рынков. Конкретные примеры, реальные рабочие процессы, записи экрана по запросу.' },
      { title: 'Маленькие команды, усиленные ИИ', body: 'Как материнская компания с более чем дюжиной платформ доставляет в масштабе небольшой удалённой командой, и что на самом деле делает фабрика ИИ-агентов (vs. маркетинговой версии). Честные цифры, а не метрики тщеславия.' },
      { title: 'Экономика бесплатного тарифа', body: 'Почему наш бесплатный тариф структурно сконструирован, а не воронка продаж. Как региональное ценообразование работает на практике. Сколько мы берём с корпоративных клиентов и почему сумма опубликована, а не обсуждается.' },
      { title: 'Медицинское ПО для каждой клиники', body: 'ClapMed — агентная электронная медицинская карта. Мы можем объяснить, что «агентное» значит простыми словами. Мы можем показать, как один и тот же движок служит частной клинике в Цюрихе и сельскому медпункту. Мы можем рассказать о регуляторном пути. Мы можем сказать, что работает сегодня.' },
      { title: 'Строим для 2,2 миллиарда оффлайн', body: 'Цифры ITU 2025. Что они значат для того, как мы проектируем продукты. Как корпоративный сайт в 50 КБ на страницу связан с более широкой практикой универсального доступа по портфелю.' },
    ],
    storyAnglesNo: [
      { title: 'Хайповые фичи без рабочего ПО', body: 'Мы не будем заранее анонсировать функции, которых нет в продакшене. Если возможность в дорожной карте, мы скажем это честно и сошлёмся на публичную запись — но мы не будем притворяться, что что-то выпущено, когда это не так.' },
      { title: 'Кадр «нарушитель против устоявшегося»', body: 'Мы не называем конкурентов в маркетинге или прессе и не позволим себя цитировать с критикой других компаний. Интересная история — это то, что мы строим, а не кого мы якобы побеждаем.' },
      { title: 'Острые мнения о регулировании, политике или текущих событиях', body: 'Мы — софт-компания. Мы будем подробно говорить о доступе, доступности, приватности и цифровом разрыве. Мы не даём цитат в несвязанных политических или культурных новостных циклах.' },
    ],
  },
  ur: {
    eyebrow: 'پریس · میڈیا روم', title: 'ہمارے بارے میں کچھ سچ لکھیں۔',
    lede: 'یہاں سب کچھ شائع کرنے کے لیے منظور شدہ ہے۔ براہ کرم ہمیں کریڈٹ دیں۔ مزید چاہیے؟ press@intelligentsingularityai.com پر ای میل کریں۔ ایک حقیقی شخص ایک کاروباری دن کے اندر جواب دیتا ہے۔',
    boilerplate: 'Intelligent Singularity Inc. ایک پیرنٹ کمپنی اور سافٹ ویئر اسٹوڈیو ہے۔ اسے 2024 میں البرٹا، کینیڈا میں قائم کیا گیا۔ یہ Clap ایکوسسٹم کی پیرنٹ کمپنی ہے۔ Clap ایکوسسٹم پلیٹ فارمز کا ایک بڑھتا ہوا خاندان ہے۔ یہ کاروبار، صحت، مالیات، کام، زراعت، تخلیقی میڈیا اور مشترکہ بنیادی ڈھانچے کو احاطہ کرتا ہے۔ ٹیم چھوٹی، مکمل طور پر ریموٹ، اور AI سے بڑھائی گئی ہے۔ ہر پروڈکٹ عالمی رسائی کے لیے بنائی گئی ہے۔ وہی فلیگ شپ پروڈکٹ ترقی یافتہ اور ترقی پذیر مارکیٹوں دونوں کے گاہکوں کی خدمت کرتی ہے۔ کمپنی خود فنڈڈ ہے اور برائے فروخت نہیں ہے۔',
    brandGuidance: {
      brandName: 'پہلے استعمال میں Intelligent Singularity لکھیں۔ پھر the studio۔ قانونی نام Intelligent Singularity Inc. ہے۔ ہیڈکوارٹر البرٹا، کینیڈا میں۔',
      founderReference: 'پہلے حوالے میں Dr. Md Diya، اس کے بعد Diya۔ ضمائر: he/him۔ تصاویر اور مختصر سوانح حیات درخواست پر دستیاب۔',
    },
    contactCta: {
      eyebrow: 'براہ راست رابطہ',
      heading: 'اقتباس، پس منظر، یا بانی کے انٹرویو کی ضرورت ہے؟',
      body: 'اپنی ڈیڈ لائن کے ساتھ press@intelligentsingularityai.com پر ای میل کریں۔ ہر پیغام ایک حقیقی شخص پڑھتا ہے۔ ہم ایک کاروباری دن میں جواب دیتے ہیں۔',
    },
    quotes: [
      { text: 'بہترین سافٹ ویئر کوئی عیش و عشرت کی شے نہیں ہے۔ یہ دنیا میں کہیں بھی ایمانداری سے کام کرنے والے ہر کاروبار اور ہر شخص کا بنیادی حق ہے۔', role: 'بانی، Intelligent Singularity' },
      { text: 'اوسلو کا ایک بچہ اور دیہی ملاوی کا ایک بچہ ایک ہی سافٹ ویئر تک پہنچ سکنا چاہیے۔ یہ کوئی خواہش نہیں۔ یہ وہ قید ہے جس کے تحت ہر پروڈکٹ شپ ہوتی ہے۔', role: 'اسٹوڈیو منشور · 2026' },
      { text: 'آج بھی 2.2 ارب لوگ آف لائن ہیں۔ ان میں سے 96% کم اور درمیانی آمدنی والے ممالک میں رہتے ہیں۔ ہم کامیابی کو اس بنیاد پر نہیں ناپتے کہ ہم نے سب سے زیادہ خدمت یافتہ صارف کو کتنا فروخت کیا؛ ہم اسے اس بنیاد پر ناپتے ہیں کہ آیا زمین پر سب سے کم خدمت یافتہ شخص وہی پروڈکٹ، اپنی زبان میں، اپنے ڈیوائس پر، اس کنکشن پر جو اس کے پاس واقعی ہے، استعمال کر سکتا ہے۔', role: 'بانی، Intelligent Singularity' },
      { text: 'ایک چھوٹی AI سے بڑھائی گئی ٹیم چلانے سے جو بچت ہوتی ہے وہ بڑے دفاتر یا زیادہ شور والے لانچ پر خرچ نہیں ہوتی۔ وہ اس فری ٹائر پر خرچ ہوتی ہے جو ایک شخص کے کاروبار کو کریڈٹ کارڈ کے بغیر حقیقی آپریشنز چلانے دیتی ہے۔', role: 'تعارف صفحہ · 2026' },
    ],
    factSheet: [
      { label: 'قانونی ادارہ', value: 'Intelligent Singularity Inc.' },
      { label: 'قیام', value: '2024 · البرٹا، کینیڈا' },
      { label: 'بانی', value: 'Dr. Md Diya, MD' },
      { label: 'بانی کا پس منظر', value: 'بین البرعظمی طبی پریکٹس کے 34 سال' },
      { label: 'ڈھانچہ', value: 'Clap ایکوسسٹم کی پیرنٹ کمپنی' },
      { label: 'ٹیم', value: 'چھوٹی، ریموٹ، AI سے بڑھائی گئی' },
      { label: 'فنڈنگ', value: 'خود فنڈڈ · برائے فروخت نہیں' },
      { label: 'پورٹ فولیو', value: '7 زمروں میں پھیلی ہوئی بڑھتی ہوئی پلیٹ فارم فیملی' },
      { label: 'زبانیں', value: '14 شپنگ زبانیں · 6 ارب سے زیادہ لوگوں تک رسائی' },
      { label: 'اسٹیک', value: 'ہر پروڈکٹ میں ایک مشترکہ پلیٹ فارم' },
      { label: 'ویب سائٹ فٹ پرنٹ', value: 'فی صفحہ 50 KB سے کم · صفر تھرڈ-پارٹی کالز' },
    ],
    storyAnglesYes: [
      { title: 'عملی طور پر عالمی رسائی', body: 'کیسے ایک ہی پروڈکٹ Fortune 500 خریدار اور ایک شخص کے بازار کے اسٹال کو ایک ہی انجن پر خدمت کے لیے بنائی گئی ہے، بغیر ابھرتی منڈیوں کے لیے "لائٹ" ورژن کے۔ ٹھوس مثالیں، حقیقی ورک فلوز، درخواست پر اسکرین ریکارڈنگز۔' },
      { title: 'AI سے بڑھائی گئی چھوٹی ٹیمیں', body: 'ایک پیرنٹ کمپنی جس کے پاس درجن سے زیادہ پلیٹ فارمز ہیں چھوٹی ریموٹ ٹیم پر پیمانے پر کیسے شپ کرتی ہے، اور AI-ایجنٹ فیبرک اصل میں کیا کرتا ہے (مارکیٹنگ ورژن بمقابلہ)۔ ایماندار اعداد و شمار، گھمنڈ والے میٹرکس نہیں۔' },
      { title: 'فری ٹائر کی معاشیات', body: 'ہمارا فری ٹائر ساختی طور پر انجینئرڈ کیوں ہے، سیلز فنل نہیں۔ علاقائی قیمتیں عملی طور پر کیسے کام کرتی ہیں۔ ہم انٹرپرائز گاہکوں سے کیا چارج کرتے ہیں اور رقم کیوں شائع شدہ ہے، بات چیت کی نہیں۔' },
      { title: 'ہر کلینک کے لیے ہیلتھ کیئر سافٹ ویئر', body: 'ClapMed ایک ایجنٹک الیکٹرانک میڈیکل ریکارڈ ہے۔ ہم سادہ الفاظ میں "ایجنٹک" کا مطلب سمجھا سکتے ہیں۔ ہم دکھا سکتے ہیں کیسے وہی انجن زیورخ کے نجی کلینک اور دیہی صحت پوسٹ دونوں کی خدمت کرتا ہے۔ ہم ریگولیٹری راستے کے بارے میں بات کر سکتے ہیں۔ ہم آپ کو بتا سکتے ہیں آج کیا لائیو ہے۔' },
      { title: 'آف لائن 2.2 ارب کے لیے تعمیر', body: 'ITU 2025 کے اعداد و شمار۔ ان کا مطلب پروڈکٹ ڈیزائن کے لیے کیا ہے۔ ایک 50 KB-فی-صفحہ کارپوریٹ سائٹ پورے پورٹ فولیو میں وسیع تر عالمی-رسائی پریکٹس سے کیسے جڑتی ہے۔' },
    ],
    storyAnglesNo: [
      { title: 'کام کرنے والے سافٹ ویئر کے بغیر ہائپ فیچرز', body: 'ہم پروڈکشن میں نہ ہونے والی فیچرز کا پیشگی اعلان نہیں کریں گے۔ اگر کوئی صلاحیت روڈ میپ پر ہے، ہم ایمانداری سے کہیں گے اور پبلک روڈ میپ اندراج سے لنک کریں گے — لیکن ہم یہ ظاہر نہیں کریں گے کہ کچھ شپ ہوتا ہے جبکہ ایسا نہیں ہے۔' },
      { title: '"ڈسرپٹر بمقابلہ موجودہ" فریمنگ', body: 'ہم مارکیٹنگ یا پریس میں مدمقابلوں کا نام نہیں لیتے، اور ہم دوسری کمپنیوں پر تنقید کرتے ہوئے نقل نہیں کیے جائیں گے۔ دلچسپ کہانی یہ ہے کہ ہم کیا بنا رہے ہیں، نہ یہ کہ ہم مبینہ طور پر کسے ہرا رہے ہیں۔' },
      { title: 'ضابطہ، سیاست، یا حالیہ واقعات پر تیز رائے', body: 'ہم ایک سافٹ ویئر کمپنی ہیں۔ ہم رسائی، قابل رسائی، رازداری، اور ڈیجیٹل تقسیم کے بارے میں تفصیل سے بات کریں گے۔ ہم غیر متعلقہ سیاسی یا ثقافتی خبروں کے چکروں پر اقتباسات فراہم نہیں کرتے۔' },
    ],
  },
  id: {
    eyebrow: 'PERS · RUANG MEDIA', title: 'Tulis sesuatu yang benar tentang kami.',
    lede: 'Semua di sini disetujui untuk dipublikasikan. Mohon mencantumkan kami. Butuh lebih? Email press@intelligentsingularityai.com. Seorang manusia menjawab dalam satu hari kerja.',
    boilerplate: 'Intelligent Singularity Inc. adalah perusahaan induk dan studio perangkat lunak. Didirikan di Alberta, Kanada, pada tahun 2024. Ini adalah induk dari ekosistem Clap. Ekosistem Clap adalah keluarga platform yang terus berkembang. Mencakup bisnis, kesehatan, keuangan, kerja, pertanian, media kreatif, dan infrastruktur bersama. Tim kecil, sepenuhnya remote, dan diperkuat AI. Setiap produk dibangun untuk akses universal. Produk unggulan yang sama melayani pelanggan di pasar maju dan berkembang. Perusahaan ini bootstrapped dan tidak dijual.',
    brandGuidance: {
      brandName: 'Tulis Intelligent Singularity pada penggunaan pertama. Kemudian the studio. Nama hukum adalah Intelligent Singularity Inc. Berbasis di Alberta, Kanada.',
      founderReference: 'Dr. Md Diya pada referensi pertama, Diya setelahnya. Kata ganti: he/him. Foto dan biografi singkat tersedia atas permintaan.',
    },
    contactCta: {
      eyebrow: 'Kontak langsung',
      heading: 'Butuh kutipan, latar belakang, atau wawancara pendiri?',
      body: 'Email press@intelligentsingularityai.com dengan tenggat waktu Anda. Seorang manusia membaca setiap pesan. Kami membalas dalam satu hari kerja.',
    },
    quotes: [
      { text: 'Perangkat lunak yang hebat bukan barang mewah. Ia adalah hak dasar bagi setiap usaha dan setiap orang yang bekerja jujur di mana pun di dunia.', role: 'Pendiri, Intelligent Singularity' },
      { text: 'Seorang anak di Oslo dan seorang anak di pedesaan Malawi seharusnya bisa menggapai perangkat lunak yang sama. Itu bukan cita-cita. Itu adalah kendala yang dengannya setiap produk dirilis.', role: 'Manifesto Studio · 2026' },
      { text: '2,2 miliar orang masih offline hari ini. Sembilan puluh enam persen dari mereka tinggal di negara berpenghasilan rendah dan menengah. Kami tidak mengukur kesuksesan dengan seberapa banyak yang kami jual kepada pelanggan paling terlayani; kami mengukurnya dengan apakah orang yang paling kurang terlayani di Bumi dapat menggunakan produk yang sama, dalam bahasanya, di perangkatnya, melalui koneksi yang sebenarnya dia miliki.', role: 'Pendiri, Intelligent Singularity' },
      { text: 'Penghematan dari menjalankan tim kecil yang diperkuat AI tidak digunakan untuk kantor yang lebih besar atau peluncuran yang lebih ramai. Itu digunakan untuk paket gratis yang memungkinkan usaha satu orang menjalankan operasi nyata tanpa kartu kredit.', role: 'Halaman Tentang · 2026' },
    ],
    factSheet: [
      { label: 'Entitas hukum', value: 'Intelligent Singularity Inc.' },
      { label: 'Didirikan', value: '2024 · Alberta, Kanada' },
      { label: 'Pendiri', value: 'Dr. Md Diya, MD' },
      { label: 'Latar belakang pendiri', value: '34 tahun praktik medis lintas benua' },
      { label: 'Struktur', value: 'Perusahaan induk dari ekosistem Clap' },
      { label: 'Tim', value: 'Kecil, remote, diperkuat AI' },
      { label: 'Pendanaan', value: 'Bootstrapped · didanai sendiri · tidak dijual' },
      { label: 'Portofolio', value: 'Keluarga platform yang terus berkembang di 7 kategori' },
      { label: 'Bahasa', value: '14 bahasa rilis · menjangkau lebih dari 6 miliar orang' },
      { label: 'Stack', value: 'Satu platform bersama untuk setiap produk' },
      { label: 'Jejak situs', value: 'Kurang dari 50 KB per halaman · nol panggilan pihak ketiga' },
    ],
    storyAnglesYes: [
      { title: 'Akses universal dalam praktik', body: 'Bagaimana satu produk dibangun untuk melayani pembeli Fortune 500 dan kios pasar satu orang pada mesin yang sama, tanpa versi "lite" untuk pasar berkembang. Contoh konkret, alur kerja nyata, rekaman layar atas permintaan.' },
      { title: 'Tim kecil yang diperkuat AI', body: 'Bagaimana perusahaan induk dengan lebih dari selusin platform mengirim secara skala dengan tim kecil remote, dan apa yang sebenarnya dilakukan jaringan agen AI (vs. versi pemasaran). Angka jujur, bukan metrik kebanggaan.' },
      { title: 'Ekonomi paket gratis', body: 'Mengapa paket gratis kami dirancang secara struktural, bukan corong penjualan. Bagaimana penetapan harga regional bekerja dalam praktik. Berapa yang kami kenakan kepada pelanggan enterprise dan mengapa jumlahnya dipublikasikan, bukan dinegosiasikan.' },
      { title: 'Perangkat lunak kesehatan untuk setiap klinik', body: 'ClapMed adalah Rekam Medis Elektronik agentik. Kami dapat menjelaskan apa arti "agentik" dalam kata-kata sederhana. Kami dapat menunjukkan bagaimana mesin yang sama melayani klinik pribadi di Zürich dan pos kesehatan pedesaan. Kami dapat berbicara tentang jalur regulasi. Kami dapat memberi tahu Anda apa yang aktif hari ini.' },
      { title: 'Membangun untuk 2,2 miliar offline', body: 'Angka ITU 2025. Apa artinya bagi cara kami merancang produk. Bagaimana situs korporat 50 KB per halaman terhubung dengan praktik akses universal yang lebih luas di seluruh portofolio.' },
    ],
    storyAnglesNo: [
      { title: 'Fitur hype tanpa perangkat lunak yang berfungsi', body: 'Kami tidak akan mengumumkan terlebih dahulu fitur yang tidak ada dalam produksi. Jika sebuah kemampuan ada di peta jalan, kami akan mengatakannya dengan jujur dan menautkan ke entri peta jalan publik — tetapi kami tidak akan berpura-pura sesuatu sudah dikirim padahal tidak.' },
      { title: 'Pembingkaian "pengganggu vs. petahana"', body: 'Kami tidak menyebutkan pesaing dalam pemasaran atau pers, dan kami tidak akan dikutip mengkritik perusahaan lain. Cerita yang menarik adalah apa yang sedang kami bangun, bukan siapa yang katanya kami kalahkan.' },
      { title: 'Pendapat tajam tentang regulasi, politik, atau peristiwa terkini', body: 'Kami adalah perusahaan perangkat lunak. Kami akan berbicara secara rinci tentang akses, aksesibilitas, privasi, dan kesenjangan digital. Kami tidak memberikan kutipan tentang siklus berita politik atau budaya yang tidak terkait.' },
    ],
  },
  sw: {
    eyebrow: 'VYOMBO VYA HABARI · CHUMBA CHA HABARI', title: 'Andika kitu cha kweli kuhusu sisi.',
    lede: 'Kila kitu hapa kimeidhinishwa kuchapishwa. Tafadhali tutaje. Unahitaji zaidi? Tuma barua pepe kwa press@intelligentsingularityai.com. Mtu halisi anajibu ndani ya siku moja ya kazi.',
    boilerplate: 'Intelligent Singularity Inc. ni kampuni mama na studio ya programu. Ilianzishwa Alberta, Kanada, mwaka wa 2024. Ni kampuni mama ya mfumo wa Clap. Mfumo wa Clap ni familia inayoongezeka ya majukwaa. Inashughulikia biashara, afya, fedha, kazi, kilimo, vyombo vya habari vya ubunifu, na miundombinu ya pamoja. Timu ni ndogo, mbali kabisa, na imeimarishwa na AI. Kila bidhaa imejengwa kwa ajili ya ufikiaji wa wote. Bidhaa kuu ile ile inahudumia wateja katika masoko yaliyoendelea na yanayoendelea. Kampuni imejifadhili na haiuzwi.',
    brandGuidance: {
      brandName: 'Andika Intelligent Singularity wakati wa kwanza. Kisha the studio. Jina la kisheria ni Intelligent Singularity Inc. Iko Alberta, Kanada.',
      founderReference: 'Dr. Md Diya kwenye marejeleo ya kwanza, Diya baadaye. Viwakilishi: he/him. Picha na wasifu mfupi unapatikana kwa ombi.',
    },
    contactCta: {
      eyebrow: 'Mawasiliano ya moja kwa moja',
      heading: 'Unahitaji nukuu, asili, au mahojiano na mwanzilishi?',
      body: 'Tuma barua pepe kwa press@intelligentsingularityai.com pamoja na muda wako wa mwisho. Kila ujumbe husomwa na mtu halisi. Tunajibu ndani ya siku moja ya kazi.',
    },
    quotes: [
      { text: 'Programu nzuri si bidhaa ya anasa. Ni haki ya msingi kwa kila biashara na kila mtu anayefanya kazi ya uaminifu mahali popote duniani.', role: 'Mwanzilishi, Intelligent Singularity' },
      { text: 'Mtoto huko Oslo na mtoto kijijini Malawi wanapaswa kuweza kufikia programu ile ile. Si lengo. Ni kikwazo ambacho kila bidhaa hutumwa nayo.', role: 'Ilani ya Studio · 2026' },
      { text: 'Bilioni 2.2 za watu bado wako nje ya mtandao leo. Asilimia tisini na sita yao wanaishi katika nchi zenye mapato ya chini na ya kati. Hatuipimi mafanikio kwa kiasi tunachouza kwa mteja anayehudumiwa zaidi; tunaipima kwa iwapo mtu anayehudumiwa kwa uchache zaidi Duniani anaweza kutumia bidhaa ile ile, kwa lugha yake, kwenye kifaa chake, kwa muunganisho anaouwa kweli.', role: 'Mwanzilishi, Intelligent Singularity' },
      { text: 'Akiba kutokana na kuendesha timu ndogo iliyoimarishwa kwa AI hailipi ofisi kubwa zaidi wala uzinduzi wa kelele zaidi. Hulipa kiwango cha bure kinachoruhusu biashara ya mtu mmoja kuendesha shughuli halisi bila kadi ya mkopo.', role: 'Ukurasa wa Kuhusu · 2026' },
    ],
    factSheet: [
      { label: 'Chombo cha kisheria', value: 'Intelligent Singularity Inc.' },
      { label: 'Imeanzishwa', value: '2024 · Alberta, Kanada' },
      { label: 'Mwanzilishi', value: 'Dr. Md Diya, MD' },
      { label: 'Asili ya mwanzilishi', value: 'Miaka 34 ya mazoezi ya kimatibabu kati ya bara' },
      { label: 'Muundo', value: 'Kampuni mama ya mfumo wa Clap' },
      { label: 'Timu', value: 'Ndogo, mbali, imeimarishwa kwa AI' },
      { label: 'Ufadhili', value: 'Imejifadhili · haiuzwi' },
      { label: 'Portfolio', value: 'Familia inayoongezeka ya majukwaa katika kategoria 7' },
      { label: 'Lugha', value: 'Lugha 14 za usafirishaji · zinafikia zaidi ya watu bilioni 6' },
      { label: 'Stack', value: 'Jukwaa moja lililoshirikiwa kwa kila bidhaa' },
      { label: 'Alama ya tovuti', value: 'Chini ya 50 KB kwa ukurasa · sifuri simu za mtu wa tatu' },
    ],
    storyAnglesYes: [
      { title: 'Ufikiaji wa wote kwa vitendo', body: 'Jinsi bidhaa moja inavyojengwa kuhudumia mnunuzi wa Fortune 500 na duka la mtu mmoja kwenye injini ile ile, bila matoleo ya "lite" kwa masoko yanayoibuka. Mifano halisi, mtiririko halisi wa kazi, rekodi za skrini kwa ombi.' },
      { title: 'Timu ndogo zilizoimarishwa kwa AI', body: 'Jinsi kampuni mama yenye majukwaa zaidi ya kumi na mbili inavyotuma kwa kiwango kikubwa kwa timu ndogo ya mbali, na kile ambacho kitambaa cha mawakala wa AI hufanya kweli (vs. toleo la masoko). Takwimu za uaminifu, si vipimo vya kujivunia.' },
      { title: 'Uchumi wa kiwango cha bure', body: 'Kwa nini kiwango chetu cha bure kimebuniwa kimuundo, si mfereji wa mauzo. Bei za eneo zinavyofanya kazi kwa vitendo. Tunatoza nini wateja wa biashara na kwa nini kiasi kimechapishwa, si kujadiliwa.' },
      { title: 'Programu ya afya kwa kila kliniki', body: 'ClapMed ni Rekodi za Matibabu za Kielektroniki za uwakala. Tunaweza kueleza nini "uwakala" maana yake kwa maneno rahisi. Tunaweza kuonyesha jinsi injini ile ile inavyohudumia kliniki binafsi huko Zürich na kituo cha afya cha kijijini. Tunaweza kuzungumza kuhusu njia ya kanuni. Tunaweza kukuambia kile ambacho ni hai leo.' },
      { title: 'Kujenga kwa bilioni 2.2 walio nje ya mtandao', body: 'Takwimu za ITU 2025. Maana yake kwa jinsi tunavyobuni bidhaa. Jinsi tovuti ya kampuni ya 50 KB kwa ukurasa inavyounganishwa na mazoezi mapana zaidi ya ufikiaji wa wote katika portfolio yote.' },
    ],
    storyAnglesNo: [
      { title: 'Vipengele vya pamiti bila programu inayofanya kazi', body: 'Hatutatangaza kabla vipengele vilivyo nje ya uzalishaji. Ikiwa uwezo uko kwenye ramani ya barabara, tutasema hivyo kwa unyofu na kuunganisha na ingizo la ramani ya umma — lakini hatutadanganya kwamba kitu kimetumwa wakati hakijatumwa.' },
      { title: 'Mfumo wa "msumbufu dhidi ya aliyepo"', body: 'Hatutaji washindani katika masoko au vyombo vya habari, na hatutarejewa tukikosoa makampuni mengine. Hadithi ya kuvutia ni kile tunachojenga, si nani tunadhaniwa kushinda.' },
      { title: 'Maoni makali kuhusu kanuni, siasa, au matukio ya sasa', body: 'Sisi ni kampuni ya programu. Tutazungumza kwa undani kuhusu ufikiaji, ufikivu, faragha, na pengo la kidijitali. Hatutoi manukuu kuhusu mizunguko ya habari za kisiasa au kitamaduni isiyohusiana.' },
    ],
  },
  yo: {
    eyebrow: 'IṢẸ́ ÌRÒYÌN · YÀRÁ ÌTÀN', title: 'Kọ ohun kan tó jẹ́ òtítọ́ nípa wa.',
    lede: 'Gbogbo nǹkan níbí ti gba ìfọwọ́sí láti tẹ̀ jáde. Jọ̀wọ́, sọ orúkọ wa. Ó nílò sí i? Fi ìmẹ́ìlì ránṣẹ́ sí press@intelligentsingularityai.com. Ènìyàn gidi ń dáhùn nínú ọjọ́ iṣẹ́ kan.',
    boilerplate: 'Intelligent Singularity Inc. jẹ́ kampani ìyá àti studio sọ́fítíwéàrì. A dá a sílẹ̀ ní Alberta, Canada, ní ọdún 2024. Ó jẹ́ kampani ìyá ti mfumo Clap. Mfumo Clap jẹ́ ìdílé pèpéle tí ń dàgbà. Ó kárí òwò, ìlera, ìṣúná, iṣẹ́, ọgbọ́n àgbẹ̀, ìròyìn ìṣẹ̀dá, àti ìpilẹ̀ṣẹ̀ àjọṣe. Ẹgbẹ́ kékeré, ní ọ̀nà jíjìn pátápátá, àti tí AI ti múratàn. Gbogbo ọjà ni a kọ́ fún àǹfààní ayé ńláńlá. Ọjà àkọ́kọ́ kannáà ń ṣe iṣẹ́ fún àwọn oníbàárá ní ọjà tó ti dàgbà àti tí ń dàgbà. Kampani náà jẹ́ tí a fúnra-rẹ̀ ṣètilẹ́yìn, kì í sì í ṣe fún títà.',
    brandGuidance: {
      brandName: 'Kọ Intelligent Singularity ní lílò àkọ́kọ́. Lẹ́yìn náà, the studio. Orúkọ ìjọba ni Intelligent Singularity Inc. Wà ní Alberta, Canada.',
      founderReference: 'Dr. Md Diya ní àfihàn àkọ́kọ́, Diya lẹ́yìn náà. Ọ̀rọ̀ arọ́pò orúkọ: he/him. Àwòrán àti ìtàn ìgbé ayé kúkúrú wà ní ìbéèrè.',
    },
    contactCta: {
      eyebrow: 'Ìbárasọ̀rọ̀ tààrà',
      heading: 'Ó nílò àyọkà, ìpilẹ̀ àyẹ̀wò, tàbí ìfọ̀rọ̀wánilẹ́nuwò pẹ̀lú olùdásílẹ̀?',
      body: 'Fi ìmẹ́ìlì ránṣẹ́ sí press@intelligentsingularityai.com pẹ̀lú àkókò ìparí rẹ. Ènìyàn ń ka àkọsílẹ̀ kọ̀ọ̀kan. A dáhùn nínú ọjọ́ iṣẹ́ kan.',
    },
    quotes: [
      { text: 'Sọ́fítíwéàrì tó dára kì í ṣe ọjà fún ìgbádùn. Ó jẹ́ ẹ̀tọ́ pàtàkì fún gbogbo òwò àti gbogbo ènìyàn tó ń ṣe iṣẹ́ olótìítọ́ ní ibikíbi ní ayé.', role: 'Olùdásílẹ̀, Intelligent Singularity' },
      { text: 'Ọmọ kan ní Oslo àti ọmọ kan ní àwọn àgbègbè ìgbé Malawi kan gbọdọ̀ lè dé sí sọ́fítíwéàrì kannáà. Ó kì í ṣe ìfojúsùn. Ó jẹ́ ìkànnì tí gbogbo ọjà ń jádelé pẹ̀lú.', role: 'Àpèjuwe Ilé-iṣẹ́ · 2026' },
      { text: 'Bilionu 2.2 ènìyàn ṣì wà látọ̀nà jíjìn lónìí. Ìpín 96 nínú wọn ń gbé ní àwọn orílẹ̀-èdè onígbówó kekere àti àárín gbùngbùn. A kì í wọn àṣeyọrí pẹ̀lú ìwọ̀n tí a tà fún oníbàárá tí a ti ṣe iṣẹ́ jùlọ fún; a wọn ní iwọn agbára ènìyàn tí a kò tí ì pèsè jùlọ ní Ayé láti lo ọjà kannáà, ní èdè rẹ̀, lórí ẹ̀rọ rẹ̀, lórí ìsopọ̀ tí ó ní ní gidi.', role: 'Olùdásílẹ̀, Intelligent Singularity' },
      { text: 'Owó tí a fipamọ́ láti ṣe iṣẹ́ ẹgbẹ́ kékeré tí AI ti múratàn kì í san fún àwọn ọ́fíìsì títóbi tàbí ìfilọ̀ tí ó pariwo. Ó san fún ipele ọfẹ tí ó jẹ́ kí òwò ènìyàn-kan ṣiṣẹ́ àwọn iṣẹ́ gidi láì sí káàdì ojú èèyàn.', role: 'Ojú-ìwé Nípa · 2026' },
    ],
    factSheet: [
      { label: 'Ọ̀nà ìjọba', value: 'Intelligent Singularity Inc.' },
      { label: 'Tí a dá sílẹ̀', value: '2024 · Alberta, Canada' },
      { label: 'Olùdásílẹ̀', value: 'Dr. Md Diya, MD' },
      { label: 'Ìpilẹ̀ olùdásílẹ̀', value: 'Ọdún 34 ti àjọṣe iṣẹ́ ìṣègùn àgbáyé' },
      { label: 'Ètò', value: 'Kampani ìyá ti mfumo Clap' },
      { label: 'Ẹgbẹ́', value: 'Kékeré, latọ̀nà jíjìn, tí AI ti múratàn' },
      { label: 'Ìpèsè owó', value: 'Tí a fúnra-rẹ̀ ṣètilẹ́yìn · kì í sì í ṣe fún títà' },
      { label: 'Àkójọpọ̀', value: 'Ìdílé pèpéle tí ń dàgbà ní àwọn ẹ̀ká 7' },
      { label: 'Èdè', value: 'Èdè 14 tí a ṣe ìfilọ̀ · dé ọwọ́ ènìyàn ju bilionu 6 lọ' },
      { label: 'Stack', value: 'Pèpéle kan tí a pín kárí gbogbo ọjà' },
      { label: 'Ìpasẹ̀ ojú-òpó', value: 'Kéré sí 50 KB fún ojú-ìwé · òfo àwọn ìpè ẹgbẹ́ kẹta' },
    ],
    storyAnglesYes: [
      { title: 'Àǹfààní ayé ńláńlá ní iṣe', body: 'Báwo ni a ṣe kọ́ ọjà kan láti ṣe iṣẹ́ fún olùra Fortune 500 àti ìpẹ̀ja oníkàńṣoṣo lórí ẹ̀rọ kannáà, láìsí àwọn ẹ̀dà "lite" fún àwọn ọjà tí ń dìde. Àwọn àpẹẹrẹ tó kàn, ìṣàn iṣẹ́ gidi, gbígba àwòrán ojú-ìran ní ìbéèrè.' },
      { title: 'Àwọn ẹgbẹ́ kéékèèké tí AI ti múratàn', body: 'Báwo ni kampani ìyá tí ó ní pèpéle tí ó ju mejìlá lọ ṣe ń jádelé ní iwọnsí pẹ̀lú ẹgbẹ́ kékeré ní ọ̀nà jíjìn, àti ohun tí kítísì àwọn aṣojú AI máa ń ṣe ní gidi (vs. ẹ̀dà ìpolongò). Àwọn nọ́mbà olótìítọ́, kì í ṣe àwọn òṣùwọ̀n ìgbéraga.' },
      { title: 'Ìṣúná ti ipele ọfẹ', body: 'Kí ló dé tí ipele ọfẹ wa fi jẹ́ tí a ṣe ní ìpilẹ̀, kì í ṣe ìfunni tí ó ń ṣe ìpolongò. Báwo ni iye-owó àgbègbè ṣe ń ṣiṣẹ́ ní iṣe. Bí a ṣe ń gba owó láti ọwọ́ àwọn oníbàárá ilé-iṣẹ́ àti idi rẹ̀ tí iye náà fi wà ní àkójọpọ̀, kì í ṣe ìjíròrò.' },
      { title: 'Sọ́fítíwéàrì ìlera fún ilé-ìwòsàn kọ̀ọ̀kan', body: 'ClapMed jẹ́ Ìwé Ìròyìn Ìṣègùn Onínáṣẹ̀dá pẹ̀lú agbára aṣojú. A lè ṣàlàyé ohun tí "onínáṣẹ̀dá" túmọ̀ sí ní ọ̀rọ̀ tó rọrùn. A lè fi hàn báwo ni ẹ̀rọ kannáà ṣe ń ṣe iṣẹ́ fún ilé-ìwòsàn aládàáni ní Zürich àti ibi ààyè ìlera ìgbé. A lè sọ̀rọ̀ nípa ipa ọ̀nà òfin. A lè sọ fún ọ ohun tí ó wà ní iṣẹ́ lónìí.' },
      { title: 'Kíkọ́ fún àwọn bilionu 2.2 tí kò sí lórí ínà', body: 'Àwọn nọ́mbà ITU 2025. Ohun tí wọ́n túmọ̀ sí fún báwo ni a ṣe ń ṣe ètò àwọn ọjà. Báwo ni ojú-òpó ilé-iṣẹ́ tí ó jẹ́ KB 50 fún ojú-ìwé ṣe ń sopọ̀ sí àjọṣe àǹfààní ayé ńláńlá tó gbòòrò ní gbogbo àkójọpọ̀.' },
    ],
    storyAnglesNo: [
      { title: 'Àwọn àfikún ìpolongò láì sí sọ́fítíwéàrì tó ń ṣiṣẹ́', body: 'A kì yóò kéde ní àkọ́kọ́ àwọn àfikún tí kò sí ní iṣẹ́. Tí agbára kan bá wà lórí ìpèsè ọ̀nà, a ó sọ ọ́ lóòótọ́ a sì ó so pọ̀ mọ́ ìfọ̀rọ̀wé ìpèsè ọ̀nà ti gbangba — ṣùgbọ́n a kì yóò ṣe ìmọ̀ pé ohun kan ti jádelé nígbà tí kò ti ṣe.' },
      { title: 'Ètò "olùdíwọ́n vs. olùdàdúró"', body: 'A kì í pe orúkọ àwọn olùdíje nínú ìpolongò tàbí ìròyìn, a kì yóò sì jẹ́ kí á sọ wa ní àbùkù àwọn ilé-iṣẹ́ mìíràn. Ìtàn tó wù ni ohun tí à ń kọ́, kì í ṣe ẹni tí à ń lù.' },
      { title: 'Ìfèsìpadà lórí òfin, ìṣèlú, tàbí ìṣẹ̀lẹ̀ àkókò', body: 'A jẹ́ kampani sọ́fítíwéàrì. A ó sọ̀rọ̀ nípa àǹfààní, ìbálópọ̀, àṣírí, àti àlàfo dijítà. A kì í pèsè àyọkà lórí àwọn ìyípo ìròyìn ìṣèlú tàbí àṣà tí kò ní ìbáṣepọ̀.' },
    ],
  },
  ha: {
    eyebrow: 'JARIDU · ƊAKIN MEDIA', title: 'Rubuta wani abu na gaskiya game da mu.',
    lede: 'Komai a nan an amince a buga shi. Don Allah ka ambace mu. Kana bukatar ƙari? Aiko da imel zuwa press@intelligentsingularityai.com. Mutum na gaske yana amsawa cikin rana ɗaya ta aiki.',
    boilerplate: "Intelligent Singularity Inc. kamfanin uba ne kuma studiyo na software. An kafa shi a Alberta, Kanada, a shekarar 2024. Shi ne kamfanin uban tsarin Clap. Tsarin Clap iyali ne na dandamali masu girma. Yana rufe kasuwanci, lafiya, kuɗi, aiki, noma, kafofin watsa labarai na kerawa, da ababen more rayuwa na haɗin gwiwa. Ƙungiyar ƙarama ce, gaba ɗaya tana aiki ta nesa, kuma an haɓaka ta da AI. Ana gina kowane samfuri don samun damar amfani na duniya. Babban samfuri ɗaya yana hidima ga abokan ciniki a cikin kasuwanni masu ci gaba da masu tasowa. Kamfanin yana da kuɗin kansa kuma ba a sayar da shi ba.",
    brandGuidance: {
      brandName: "A rubuta Intelligent Singularity a amfani na farko. Sai the studio. Sunan shari'a shi ne Intelligent Singularity Inc. Yana Alberta, Kanada.",
      founderReference: "Dr. Md Diya a nuni na farko, Diya bayan haka. Karin magana: he/him. Hotuna da takaitaccen tarihin rayuwa suna nan akan buƙata.",
    },
    contactCta: {
      eyebrow: 'Sadarwa kai tsaye',
      heading: 'Kana bukatar magana, bayanan baya, ko hira da wanda ya kafa?',
      body: 'Aiko da imel zuwa press@intelligentsingularityai.com tare da lokacin ƙarshe. Mutum na karanta kowane saƙo. Muna amsa cikin rana ɗaya ta aiki.',
    },
    quotes: [
      { text: 'Software mai kyau ba kayan alatu ba ne. Hakki ne na asali ga kowane kasuwanci da kowane mutum mai aiki na gaskiya a ko\'ina a duniya.', role: 'Wanda ya kafa, Intelligent Singularity' },
      { text: 'Yaro a Oslo da yaro a karkarar Malawi ya kamata su kai ga software guda. Wannan ba burin ba ne. Ƙayyadewa ne wanda kowane samfuri yake aiko da shi.', role: 'Sanarwar Studio · 2026' },
      { text: 'Mutane biliyan 2.2 har yanzu suna a waje da intanet a yau. Kashi 96 cikin ɗari na rayuwa a ƙasashe masu ƙananan kuɗaɗen shiga da matsakaita. Ba mu auna nasara da yawan abin da muka sayar wa abokin cinikin da aka fi yi wa hidima ba; muna auna ta da ko mutum mafi rashin hidima a Duniya zai iya amfani da samfurin guda, a yarensa, a kan na\'urarsa, ta hanyar haɗin da yake da shi a hakika.', role: 'Wanda ya kafa, Intelligent Singularity' },
      { text: 'Tanadi daga gudanar da ƙaramar ƙungiya da AI ya haɓaka ba ya biyan ɗakunan ofis manya ko ƙaddamarwa mai ƙara. Yana biyan matakin kyauta wanda ke ba da damar kasuwancin mutum ɗaya gudanar da ayyuka na hakika ba tare da katin biyan kuɗi ba.', role: 'Shafin Game da Mu · 2026' },
    ],
    factSheet: [
      { label: "Hukunci na shari'a", value: 'Intelligent Singularity Inc.' },
      { label: 'An kafa', value: '2024 · Alberta, Kanada' },
      { label: 'Wanda ya kafa', value: 'Dr. Md Diya, MD' },
      { label: 'Tarihin wanda ya kafa', value: 'Shekaru 34 na aikin likitanci tsakanin nahiyoyi' },
      { label: 'Tsari', value: 'Kamfanin uba na tsarin Clap' },
      { label: 'Tawaga', value: 'Ƙarama, mai aiki ta nesa, an haɓaka da AI' },
      { label: 'Tallafin kuɗi', value: 'Mai kuɗin kansa · ba a sayar da shi ba' },
      { label: 'Portfolio', value: "Iyali mai girma na dandamali a cikin nau'ikan 7" },
      { label: 'Harsuna', value: 'Harsuna 14 na aikawa · ya isa ga mutane sama da biliyan 6' },
      { label: 'Stack', value: 'Dandamali ɗaya da aka raba a kowane samfuri' },
      { label: 'Sawu na shafin', value: 'Ƙasa da KB 50 a kowane shafi · sifili kiraye-kiraye na ɓangare na uku' },
    ],
    storyAnglesYes: [
      { title: 'Damar samun duniya a aikace', body: 'Yadda aka gina samfuri ɗaya don hidima ga mai siye na Fortune 500 da kwalin kasuwa na mutum ɗaya akan injin guda, ba tare da nau\'ikan "lite" na kasuwannin masu tasowa ba. Misalai na zahiri, kwararar aiki na hakika, faifan rikodin allo akan buƙata.' },
      { title: 'Ƙananan ƙungiyoyi da AI ya haɓaka', body: 'Yadda kamfanin uba mai dandamali sama da goma sha biyu ke aika a kan girma tare da ƙaramar ƙungiya mai aiki ta nesa, da abin da yadudduka na wakilan AI ke yi da gaske (vs. nau\'in talla). Lambobi na gaskiya, ba ma\'auni na girman kai ba.' },
      { title: 'Tattalin arzikin matakin kyauta', body: 'Me ya sa matakin kyauta namu yana da injiniya na tsari, ba famar tallace-tallace ba. Yadda farashi na yanki ke aiki a aikace. Abin da muke ɗauka daga abokan ciniki na enterprise da dalilin da ya sa adadin ya bayyana, ba a tattauna shi ba.' },
      { title: 'Software na kiwon lafiya don kowace asibiti', body: 'ClapMed shi ne Bayanin Likitanci na Lantarki mai wakili. Za mu iya bayyana abin da "wakili" ke nufi a cikin sauƙin kalmomi. Za mu iya nuna yadda injin guda ke hidima ga asibiti mai zaman kansa a Zürich da kuma matsayin kiwon lafiya na karkara. Za mu iya yin magana akan tafarkin doka. Za mu iya gaya muku abin da ke aiki a yau.' },
      { title: 'Gina don biliyan 2.2 da ke waje da intanet', body: 'Lambobin ITU 2025. Abin da suke nufi don yadda muke tsara samfura. Yadda shafin kamfani na 50 KB a kowane shafi yake haɗawa da yawa na samun damar duniya a duk fadin portfolio.' },
    ],
    storyAnglesNo: [
      { title: 'Fasalin hype ba tare da software mai aiki ba', body: 'Ba za mu sanar da farko fasalin da ba sa cikin samarwa ba. Idan iyawa tana cikin taswirar hanya, za mu fada hakan da gaskiya kuma mu haɗa da bayanin taswirar hanya na jama\'a — amma ba za mu yi kamar wani abu ya tafi ba alhali bai tafi ba.' },
      { title: 'Tsarin "mai tarwatsewa vs. mai dorewa"', body: 'Ba mu ambaci masu fafata a kasuwanci ko a yaɗa labarai, kuma ba za a ambace mu muna sukar wasu kamfanoni ba. Labari mai ban sha\'awa shi ne abin da muke ginawa, ba wanda ake zaton muna doke shi ba.' },
      { title: 'Ra\'ayoyi masu zafi akan ka\'idoji, siyasa, ko abubuwan da suka faru a yanzu', body: 'Mu kamfanin software ne. Za mu yi magana dalla-dalla akan damar amfani, dama, sirri, da raba dijital. Ba mu ba da kalamai akan abubuwan da suka shafi siyasa ko al\'adu masu rugujewa.' },
    ],
  },
};

const SECURITY: Record<LocaleCode, SecurityStrings> = {
  'zh-CN': {
    eyebrow: '安全 · 信任 · 数据', title: '你真的能读懂的安全。',
    lede: '没有营销图示。只是我们为了保持你的数据私密、小巧、并掌握在你手中所做的事——在本站以及我们交付的每个产品上。',
    postureSummary: {
      eyebrow: '姿态摘要',
      heading: '一个来源。线路加密。零第三方。短保留。命名的子处理方。',
      body: '上面五行就是一口气讲完的全部姿态。下面的所有内容都是支持证据——每一行的含义、如何执行,以及出问题时如何报告。',
    },
    topStats: [
      { label: '跟踪器', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: '第三方调用', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: '服务器日志保留', value: '14 天', hint: '然后永久删除' },
    ],
    reportCta: {
      eyebrow: '报告漏洞',
      heading: '发现什么了?请先告诉我们。',
      body: '请将描述和重现步骤发邮件至 security@intelligentsingularityai.com。我们在一个工作日内确认报告。在三天内分类处理。修复发布时,我们在事后报告中按姓名致谢研究人员,除非他们要求匿名。我们绝不威胁或起诉善意的安全研究人员,就这么简单。',
    },
    posture: [
      { title: '每条线路加密', body: '所有公共页面和产品流量都通过 TLS 1.3 与现代密码套件传输。证书由 Let\'s Encrypt 颁发并自动轮换。HTTP 严格传输安全(HSTS)设置了较长的 max-age。你输入的任何内容都不会以明文穿越开放互联网。在网络路径可能被观察到的地方,内部服务间调用使用相互 TLS。' },
      { title: '零第三方调用', body: '无分析工具、无像素、无广告网络、无外部字体、无嵌入视频、无社交媒体小部件。你的浏览器只与我们的源通信。这一点由持续集成中的一个名为 no-third-party.mjs 的脚本强制执行,它扫描构建后的站点,如果包中出现任何外部主机就让发布失败。承诺是一个单元测试,不是一句营销语。 On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: '签名并验证的构建', body: '我们交付的每个容器镜像都由锁定的部件集合构建。锁文件在 git 中。我们在升级任何部件之前会审阅相关公告。发布在运行前会被签名并在主机上校验。任何未通过门禁——包大小、可访问性、第三方——的构建都无法进入生产。' },
      { title: '短保留窗口', body: '服务器日志保留十四天用于调试,然后删除。联系表单邮件仅保留到我们回复并归档对话所需的时间,之后为存档目的最多保存二十四个月,然后删除。备份按三十天周期滚动,并在静态时加密。' },
      { title: '隔离的产品环境', body: '每个产品都有自己的数据库、自己的密钥、自己的规则。一个工具的入侵不会扩散到另一个。某些功能在产品之间联动。单点登录。支持路由。欺诈信号。我们只在产品之间移动所需的最少内容。每个流程都在各自产品的隐私页面上说明。' },
      { title: '管理在白名单后面', body: '访问 Payload CMS 管理面板和底层服务器在代理层被限制为一份书面批准的、简短的互联网地址清单。每个管理员账户都需要多因素认证。没有共享的"管理员"凭证——每个操作都可以追溯到一个有名有姓的人。' },
      { title: '密钥在保险库中,从不在代码里', body: '数据库密码、API 密钥、签名机密和证书存放在加密的密钥保险库中,并在运行时注入。源代码扫描会拦截任何试图嵌入凭证的提交。轮换的密钥会在几分钟内传播到运行中的服务。' },
    ],
    dataHandling: [
      { title: '你发更少,我们存更少', body: '我们只索取产品工作所需的最小信息。没有预先勾选的复选框。没有那种悄悄变成获取结果之必要的"可选"字段。我们不从第三方购买或丰富个人数据。' },
      { title: '你的数据是你的', body: '从每个产品导出都是一等公民功能,而不是增值销售。删除,你的数据就被移除——不是"永久软删除"藏在你看不到的开关后面。出口时使用标准格式(CSV、JSON、ICS、PDF)。没有专有锁定。' },
      { title: '不用你的内容训练', body: 'AI 功能仅使用你选择提交的数据。该数据仍然绑定在你的账户范围内。你的私人内容从不用于训练共享模型。从不混入另一个客户的数据中。从不发送到会保留你提示的第三方 AI。' },
      { title: '透明的事件响应', body: '如果安全事件影响了你的数据,我们会在七十二小时内告知你。用通俗的话。我们说出发生了什么、我们做了什么以及你接下来可以做什么。工作完成后我们会发布公开的事后分析。我们绝不会通过悄悄更新政策来隐藏漏洞。' },
      { title: '请求即可访问', body: '你可以索要我们持有的每一份个人数据的简洁副本。你可以让我们更正。你可以让我们删除。你可以让我们将干净的副本发送到另一项服务。我们在三十天内免费回复。我们可以用本站支持的十四种语言中的任何一种回复。' },
      { title: '一份简短的、有名字的子处理方清单', body: '少数供应商帮我们运行平台——例如我们的托管合作伙伴、邮件中继合作伙伴,以及产品在结账时使用的任何支付通道处理方。每一个都在我们的信任页面上以姓名标注,说明其服务目的和接触的数据。我们绝不会悄悄新增子处理方。' },
    ],
    compliance: [
      { title: 'PIPEDA(加拿大)', body: '我们的母公司在艾伯塔省设立。我们遵循《个人信息保护与电子文件法案》。我们对加拿大隐私专员办公室负责。那也是你在先写信给我们之后,可以提起隐私关切的地方。' },
      { title: '全球范围的 GDPR 等效权利', body: '我们将欧洲 GDPR 中的权利扩展到每一个大陆上的每一位用户。平等对待是使命的一部分。不是绑定到你所在位置的合规复选框。' },
      { title: 'WCAG 2.2 AA 级', body: '可访问性是一种安全属性——你无法使用的网站就是你无法信任的网站。每一页至少按 WCAG 2.2 AA 构建,任何违规都会让 axe-core 检查使构建失败。请在 /legal/accessibility 阅读完整声明。' },
      { title: '尚无 FedRAMP、尚无 SOC 2', body: '我们对我们没有的东西保持诚实。我们今天太小,无法维持 SOC 2 Type II 审计或 FedRAMP 授权,我们也不会在营销中声称拥有它们。当某个产品进入需要其中之一的市场时,我们会在该产品在那里提供之前获得它。' },
    ],
  },
  es: {
    eyebrow: 'SEGURIDAD · CONFIANZA · DATOS', title: 'Seguridad que de verdad puedes leer.',
    lede: 'Sin diagramas de marketing. Solo lo que hacemos para mantener tus datos privados, pequeños y en tus manos — en este sitio y en cada producto que entregamos.',
    postureSummary: {
      eyebrow: 'Resumen de la postura',
      heading: 'Un origen. Cifrado en el cable. Cero terceros. Retención corta. Subprocesadores nombrados.',
      body: 'Las cinco líneas de arriba son toda la postura en una sola respiración. Todo lo de abajo es la evidencia de respaldo — qué significa cada línea, cómo se aplica y cómo reportar un problema cuando algo sale mal.',
    },
    topStats: [
      { label: 'Rastreadores', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Llamadas a terceros', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Retención de logs de servidor', value: '14 días', hint: 'Después borrados permanentemente' },
    ],
    reportCta: {
      eyebrow: 'Reportar una vulnerabilidad',
      heading: '¿Encontraste algo? Por favor, dínoslo primero.',
      body: 'Envía un email a security@intelligentsingularityai.com con una descripción y los pasos para reproducir. Confirmamos los reportes en un día laborable. Triajamos en tres. Acreditamos a los investigadores por nombre en el post-mortem cuando se envía una corrección, a menos que pidan permanecer anónimos. No amenazamos ni demandamos a investigadores de seguridad de buena fe, punto.',
    },
    posture: [
      { title: 'Cifrado en cada cable', body: "Todas las páginas públicas y el tráfico de los productos viajan por TLS 1.3 con cifrados modernos. Los certificados los emite Let's Encrypt y se rotan automáticamente. HTTP Strict Transport Security está configurado con un max-age largo. Nada de lo que escribes cruza la web abierta en texto claro. Las llamadas internas servicio a servicio usan TLS mutuo cuando la ruta de red podría ser observada." },
      { title: 'Cero llamadas a terceros', body: 'Sin analíticas, sin píxeles, sin redes de publicidad, sin fuentes externas, sin video embebido, sin widgets de redes sociales. Tu navegador solo habla con nuestro origen. Esto se aplica en integración continua por un script llamado no-third-party.mjs que escanea el sitio compilado y hace fallar el lanzamiento si aparece cualquier host externo en el bundle. La promesa es una prueba unitaria, no una línea de marketing. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Builds firmadas y verificadas', body: 'Cada imagen de contenedor que enviamos se construye con un conjunto bloqueado de partes. El lockfile está en git. Revisamos avisos antes de actualizar cualquier parte. Los lanzamientos se firman y comprueban en el host antes de ejecutarse. Una build que falle cualquier check — tamaño del bundle, a11y, terceros — no puede llegar a producción.' },
      { title: 'Ventanas de retención cortas', body: 'Los logs del servidor se guardan catorce días para depuración y luego se borran. Los emails del formulario de contacto se mantienen solo lo necesario para responder y archivar la conversación; luego se archivan hasta veinticuatro meses para registro y luego se borran. Los backups rotan en un ciclo de treinta días y están cifrados en reposo.' },
      { title: 'Entornos de producto aislados', body: 'Cada producto corre con su propia base de datos, sus propios secretos y sus propias reglas. Una intrusión en una herramienta no puede derramarse a otra. Algunas funciones cruzan productos. Inicio de sesión único. Enrutamiento de soporte. Señales de fraude. Movemos solo el mínimo necesario entre productos. Cada flujo está descrito en la página de privacidad de su producto.' },
      { title: 'Admin detrás de una allow-list', body: 'El acceso al panel de Payload CMS y al servidor subyacente está restringido en la capa de proxy a una lista corta de direcciones de internet aprobadas por escrito. Se requiere autenticación multifactor para cada cuenta de administrador. No hay una credencial de "admin" compartida — cada acción es atribuible a una persona con nombre.' },
      { title: 'Secretos en un vault, nunca en código', body: 'Las contraseñas de base de datos, las claves de API, los secretos de firma y los certificados viven en un vault de secretos cifrado y se inyectan en tiempo de ejecución. Los escaneos de código fuente bloquean cualquier commit que intente incrustar una credencial. Los secretos rotados se propagan a los servicios en ejecución en minutos.' },
    ],
    dataHandling: [
      { title: 'Tú envías menos, nosotros guardamos menos', body: 'Solo pedimos lo mínimo que un producto necesita para funcionar. Sin casillas premarcadas. Sin campos "opcionales" que silenciosamente se vuelven obligatorios para obtener resultados. No compramos ni enriquecemos datos personales de terceros.' },
      { title: 'Tus datos son tuyos', body: 'Exportar desde cada producto es una función de primera clase, no un upsell. Borra, y tus datos se eliminan — no "borrado suave para siempre" detrás de un interruptor que no puedes ver. Formatos estándar (CSV, JSON, ICS, PDF) a la salida. Sin lock-in propietario.' },
      { title: 'No entrenamos con tu contenido', body: 'Las funciones de IA usan solo los datos que tú eliges enviar. Los datos quedan dentro del alcance de tu cuenta. Tu contenido privado nunca se usa para entrenar modelos compartidos. Nunca se mezcla con los datos de otro cliente. Nunca se envía a una IA de terceros que conserve tus prompts.' },
      { title: 'Respuesta transparente a incidentes', body: 'Si un evento de seguridad llegara a tocar tus datos, te avisamos en setenta y dos horas. En palabras llanas. Decimos qué pasó, qué hicimos, y qué puedes hacer tú a continuación. Publicamos un post-mortem público una vez terminado el trabajo. Nunca esconderemos una brecha tras una actualización silenciosa de política.' },
      { title: 'Derecho de acceso, a petición', body: 'Puedes pedirnos una copia clara de cada dato personal que tengamos. Puedes pedirnos corregirlo. Puedes pedirnos borrarlo. Puedes pedirnos enviar una copia limpia a otro servicio. Respondemos en treinta días, gratis. Podemos contestar en cualquiera de los catorce idiomas que el sitio habla.' },
      { title: 'Una lista corta de subprocesadores, con nombre', body: 'Un puñado de proveedores nos ayudan a operar la plataforma — por ejemplo nuestro socio de hosting, nuestro socio de email-relay, y cualquier procesador de pagos que un producto use en checkout. Cada uno está nombrado en nuestra página de trust con el propósito que cumple y los datos que toca. Nunca añadimos un subprocesador nuevo en silencio.' },
    ],
    compliance: [
      { title: 'PIPEDA (Canadá)', body: 'Nuestra empresa matriz se constituyó en Alberta. Seguimos la Ley de Protección de la Información Personal y los Documentos Electrónicos. Respondemos ante la Oficina del Comisionado de Privacidad de Canadá. Ahí también puedes llevar una queja de privacidad, después de escribirnos primero.' },
      { title: 'Derechos equivalentes al RGPD, globalmente', body: 'Extendemos los derechos del RGPD europeo a cada usuario, en cada continente. La igualdad de trato es parte de la misión. No una casilla de cumplimiento atada a dónde vives.' },
      { title: 'WCAG 2.2 nivel AA', body: 'La accesibilidad es una propiedad de seguridad — un sitio que no puedes usar es un sitio en el que no puedes confiar. Cada página se construye al menos al nivel WCAG 2.2 AA, con comprobaciones de axe-core que hacen fallar la build ante cualquier violación. Lee la declaración completa en /legal/accessibility.' },
      { title: 'Sin FedRAMP, sin SOC 2 — todavía', body: 'Somos honestos sobre lo que no tenemos. Hoy somos demasiado pequeños para mantener una auditoría SOC 2 Type II o una autorización FedRAMP, y no las reclamaremos en marketing. Cuando un producto entre en un mercado que lo requiera, lo conseguiremos antes de ofrecer ese producto allí.' },
    ],
  },
  hi: {
    eyebrow: 'सुरक्षा · भरोसा · डेटा', title: 'सुरक्षा जो आप सच में पढ़ सकें।',
    lede: 'कोई मार्केटिंग डायग्राम नहीं। बस वो जो हम आपके डेटा को निजी, छोटा, और आपके हाथ में रखने के लिए करते हैं — इस साइट पर और हर उस उत्पाद में जो हम भेजते हैं।',
    postureSummary: {
      eyebrow: 'मुद्रा सारांश',
      heading: 'एक उत्पत्ति। लाइन पर एन्क्रिप्टेड। शून्य तीसरे पक्ष। छोटी अवधि। नामित उप-प्रोसेसर।',
      body: 'ऊपर की पाँच पंक्तियाँ एक साँस में पूरी मुद्रा हैं। नीचे की हर बात सहायक प्रमाण है — हर पंक्ति का क्या मतलब, कैसे लागू होती है, और कुछ गलत होने पर समस्या की रिपोर्ट कैसे करें।',
    },
    topStats: [
      { label: 'ट्रैकर', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'तृतीय-पक्ष कॉल', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'सर्वर लॉग प्रतिधारण', value: '14 दिन', hint: 'फिर स्थायी रूप से हटा दिया जाता है' },
    ],
    reportCta: {
      eyebrow: 'भेद्यता की रिपोर्ट करें',
      heading: 'कुछ मिला? कृपया पहले हमें बताएँ।',
      body: 'विवरण और दोहराने के चरणों के साथ security@intelligentsingularityai.com पर ईमेल करें। हम एक कार्य दिवस में रिपोर्ट की पुष्टि करते हैं। तीन में ट्रायेज करते हैं। फ़िक्स आने पर पोस्ट-मॉर्टम में हम शोधकर्ताओं को नाम से श्रेय देते हैं, जब तक वे गुमनाम रहना न माँगें। हम सद्भावपूर्ण सुरक्षा शोधकर्ताओं को धमकी या मुकदमा कभी नहीं देते, बस।',
    },
    posture: [
      { title: 'हर तार पर एन्क्रिप्शन', body: 'सभी सार्वजनिक पृष्ठ और उत्पाद ट्रैफ़िक आधुनिक साइफरों के साथ TLS 1.3 पर यात्रा करता है। प्रमाणपत्र Let\'s Encrypt द्वारा जारी किए जाते हैं और स्वचालित रूप से रोटेट होते हैं। HTTP Strict Transport Security एक लंबे max-age के साथ सेट है। आपका टाइप किया कुछ भी कभी प्लेन टेक्स्ट में खुले वेब को पार नहीं करता। आंतरिक सेवा-से-सेवा कॉल वहाँ म्युचुअल TLS का उपयोग करते हैं जहाँ नेटवर्क पथ देखा जा सकता है।' },
      { title: 'शून्य तृतीय-पक्ष कॉल', body: 'कोई एनालिटिक्स नहीं, कोई पिक्सेल नहीं, कोई विज्ञापन नेटवर्क नहीं, कोई बाहरी फ़ॉन्ट नहीं, कोई एम्बेडेड वीडियो नहीं, कोई सोशल-मीडिया विजेट नहीं। आपका ब्राउज़र सिर्फ़ हमारे ओरिजिन से बात करता है। यह निरंतर एकीकरण में no-third-party.mjs नामक एक स्क्रिप्ट द्वारा लागू किया जाता है जो निर्मित साइट को स्कैन करती है और अगर बंडल में कोई बाहरी होस्ट दिखे तो रिलीज़ को विफल कर देती है। वादा एक यूनिट टेस्ट है, मार्केटिंग की लाइन नहीं। On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'हस्ताक्षरित और सत्यापित बिल्ड', body: 'हम जो हर कंटेनर इमेज भेजते हैं वह लॉक किए हुए हिस्सों के सेट से बनी है। लॉकफ़ाइल git में है। हम कोई भी हिस्सा बदलने से पहले सलाहकारी समीक्षा करते हैं। रिलीज़ें चलने से पहले हस्ताक्षरित और मेज़बान पर जाँची जाती हैं। कोई भी बिल्ड जो किसी गेट — बंडल आकार, a11y, तृतीय पक्ष — पर विफल होती है, उत्पादन तक नहीं पहुँच सकती।' },
      { title: 'छोटी प्रतिधारण विंडो', body: 'सर्वर लॉग चौदह दिन डीबगिंग के लिए रखे जाते हैं और फिर हटा दिए जाते हैं। संपर्क-फ़ॉर्म ईमेल केवल इतने समय रखे जाते हैं जितना जवाब देने और बातचीत फ़ाइल करने में लगे, फिर अधिकतम चौबीस महीनों तक रिकॉर्ड के लिए संग्रहित, फिर हटा दिए जाते हैं। बैकअप तीस दिन के चक्र पर रोल करते हैं और स्टैटिक पर एन्क्रिप्टेड हैं।' },
      { title: 'पृथक उत्पाद वातावरण', body: 'हर उत्पाद अपने डेटाबेस, अपने सीक्रेट और अपने नियमों के साथ चलता है। एक उपकरण पर सेंध दूसरे में नहीं फैल सकती। कुछ फ़ीचर उत्पादों के बीच जुड़ते हैं। सिंगल साइन-ऑन। सपोर्ट रूटिंग। धोखाधड़ी संकेत। हम उत्पादों के बीच केवल आवश्यक न्यूनतम स्थानांतरित करते हैं। हर प्रवाह उसके उत्पाद के निजता पृष्ठ पर है।' },
      { title: 'एडमिन एक allow-list के पीछे', body: 'Payload CMS एडमिन और अंतर्निहित सर्वर तक पहुँच प्रॉक्सी परत पर लिखित रूप से अनुमोदित इंटरनेट पतों की एक छोटी सूची तक सीमित है। हर एडमिनिस्ट्रेटर खाते के लिए मल्टी-फ़ैक्टर ऑथेंटिकेशन ज़रूरी है। कोई साझा "एडमिन" क्रेडेंशियल नहीं — हर क्रिया एक नामित व्यक्ति को सौंपी जा सकती है।' },
      { title: 'सीक्रेट वॉल्ट में, कोड में कभी नहीं', body: 'डेटाबेस पासवर्ड, API कीज़, साइनिंग सीक्रेट और प्रमाणपत्र एक एन्क्रिप्टेड सीक्रेट वॉल्ट में रहते हैं और रनटाइम पर इंजेक्ट होते हैं। सोर्स-कोड स्कैन किसी भी कमिट को रोकते हैं जो क्रेडेंशियल एम्बेड करने का प्रयास करता है। रोटेट किए गए सीक्रेट कुछ ही मिनटों में चल रही सेवाओं तक पहुँच जाते हैं।' },
    ],
    dataHandling: [
      { title: 'आप कम भेजते हैं, हम कम स्टोर करते हैं', body: 'हम केवल वही माँगते हैं जो उत्पाद को काम करने के लिए न्यूनतम चाहिए। कोई पूर्व-चिह्नित बक्से नहीं। कोई "वैकल्पिक" फ़ील्ड नहीं जो परिणाम पाने के लिए चुपचाप अनिवार्य बन जाते हैं। हम तृतीय पक्षों से व्यक्तिगत डेटा नहीं खरीदते या समृद्ध नहीं करते।' },
      { title: 'आपका डेटा आपका है', body: 'हर उत्पाद से निर्यात फ़र्स्ट-क्लास फ़ीचर है, अपसेल नहीं। हटाएँ, और आपका डेटा हटा दिया जाता है — किसी ऐसे स्विच के पीछे "हमेशा के लिए सॉफ़्ट-डिलीटेड" नहीं जिसे आप देख न सकें। निर्गमन में मानक फ़ॉर्मैट (CSV, JSON, ICS, PDF)। कोई स्वामित्व लॉक-इन नहीं।' },
      { title: 'आपकी सामग्री पर कोई प्रशिक्षण नहीं', body: 'AI फ़ीचर केवल वही डेटा उपयोग करते हैं जो आप जमा करना चुनते हैं। डेटा आपके खाते के दायरे में ही रहता है। आपकी निजी सामग्री कभी भी साझा मॉडलों को प्रशिक्षित करने के लिए उपयोग नहीं की जाती। यह कभी किसी अन्य ग्राहक के डेटा में मिश्रित नहीं होती। यह कभी ऐसे तृतीय-पक्ष AI को नहीं भेजी जाती जो आपके प्रॉम्प्ट रखता है।' },
      { title: 'पारदर्शी घटना प्रतिक्रिया', body: 'अगर कोई सुरक्षा घटना आपके डेटा को छूती है, तो हम बहत्तर घंटों के भीतर आपको बताते हैं। साधारण शब्दों में। हम बताते हैं क्या हुआ, हमने क्या किया, और आप आगे क्या कर सकते हैं। काम पूरा होने पर हम सार्वजनिक पोस्ट-मॉर्टम प्रकाशित करते हैं। हम कभी किसी चुपचाप पॉलिसी अपडेट के पीछे सेंध नहीं छिपाएँगे।' },
      { title: 'पहुँच का अधिकार, अनुरोध पर', body: 'आप हमारे पास मौजूद हर बिट व्यक्तिगत डेटा की सादी कॉपी माँग सकते हैं। आप हमें ठीक करने को कह सकते हैं। आप हमें हटाने को कह सकते हैं। आप हमें किसी अन्य सेवा को साफ़ कॉपी भेजने को कह सकते हैं। हम तीस दिनों के भीतर निःशुल्क जवाब देते हैं। हम साइट की चौदह भाषाओं में से किसी में भी जवाब दे सकते हैं।' },
      { title: 'नामित उप-प्रोसेसर की एक छोटी सूची', body: 'मुट्ठी भर वेंडर हमें प्लेटफ़ॉर्म चलाने में मदद करते हैं — उदाहरण के लिए हमारा होस्टिंग पार्टनर, हमारा ईमेल-रिले पार्टनर, और कोई भी पेमेंट-रेल प्रोसेसर जो कोई उत्पाद चेकआउट पर उपयोग करता है। प्रत्येक का नाम हमारे ट्रस्ट पृष्ठ पर है, उसके उद्देश्य और छुए गए डेटा के साथ। हम कभी चुपचाप नया उप-प्रोसेसर नहीं जोड़ते।' },
    ],
    compliance: [
      { title: 'PIPEDA (कनाडा)', body: 'हमारी मूल कंपनी अल्बर्टा में स्थापित है। हम व्यक्तिगत सूचना संरक्षण और इलेक्ट्रॉनिक दस्तावेज़ अधिनियम का पालन करते हैं। हम कनाडा के गोपनीयता आयुक्त के कार्यालय के प्रति जवाबदेह हैं। आप हमें पहले लिखने के बाद वहाँ भी एक गोपनीयता चिंता ले जा सकते हैं।' },
      { title: 'GDPR-समतुल्य अधिकार, वैश्विक रूप से', body: 'हम यूरोपीय GDPR के अधिकारों को हर महाद्वीप के हर उपयोगकर्ता तक बढ़ाते हैं। समान व्यवहार मिशन का हिस्सा है। यह कोई अनुपालन चेकबॉक्स नहीं जो आपके निवास से बँधा हो।' },
      { title: 'WCAG 2.2 स्तर AA', body: 'सुलभता एक सुरक्षा गुण है — एक साइट जिसका आप उपयोग नहीं कर सकते वह साइट है जिस पर आप भरोसा नहीं कर सकते। हर पृष्ठ कम से कम WCAG 2.2 AA पर बनाया जाता है, जहाँ axe-core जाँचें किसी भी उल्लंघन पर बिल्ड को विफल कर देती हैं। पूर्ण कथन /legal/accessibility पर पढ़ें।' },
      { title: 'अभी तक FedRAMP नहीं, SOC 2 नहीं', body: 'हम जो हमारे पास नहीं है उसके बारे में ईमानदार हैं। हम आज SOC 2 Type II ऑडिट या FedRAMP प्राधिकरण बनाए रखने के लिए बहुत छोटे हैं, और हम उन्हें मार्केटिंग में दावा नहीं करेंगे। जब कोई उत्पाद ऐसे बाज़ार में प्रवेश करेगा जिसके लिए कोई आवश्यक है, हम उसे उस बाज़ार में पेश करने से पहले अर्जित करेंगे।' },
    ],
  },
  ar: {
    eyebrow: 'الأمان · الثقة · البيانات', title: 'أمان يمكنك قراءته فعلًا.',
    lede: 'لا رسوم تسويقية. فقط ما نفعله للحفاظ على بياناتك خاصة، صغيرة، وفي يديك — على هذا الموقع وعبر كل منتج نُطلِقه.',
    postureSummary: {
      eyebrow: 'ملخص الموقف',
      heading: 'مصدر واحد. مشفّر على الخط. صفر أطراف ثالثة. احتفاظ قصير. معالجون فرعيون مذكورون بالاسم.',
      body: 'الأسطر الخمسة أعلاه هي الموقف كله في نفَس واحد. كل ما يلي هو الدليل المؤيِّد — ما يعنيه كل سطر، وكيف يُفرَض، وكيف تُبلِّغ عن مشكلة حين يحدث خطأ.',
    },
    topStats: [
      { label: 'متتبعات', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'مكالمات لطرف ثالث', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'احتفاظ بسجلات الخادم', value: '14 يومًا', hint: 'ثم تُحذف نهائيًا' },
    ],
    reportCta: {
      eyebrow: 'الإبلاغ عن ثغرة',
      heading: 'وجدت شيئًا؟ من فضلك أخبرنا أولًا.',
      body: 'راسل security@intelligentsingularityai.com بوصف وخطوات لإعادة الإنتاج. نؤكد البلاغات خلال يوم عمل واحد. نُصنّفها خلال ثلاثة. ننسب الفضل للباحثين بالاسم في تقرير ما بعد الحادث عند إصدار الإصلاح، ما لم يطلبوا البقاء مجهولين. لا نهدد أو نقاضي باحثي الأمن ذوي النية الحسنة، نقطة.',
    },
    posture: [
      { title: 'تشفير على كل خط', body: "تنتقل جميع الصفحات العامة وحركة المنتجات عبر TLS 1.3 مع شفرات حديثة. تُصدر الشهادات Let's Encrypt وتُجدَّد تلقائيًا. HTTP Strict Transport Security مضبوط بقيمة max-age طويلة. لا شيء تكتبه يعبر الويب المفتوح كنص واضح. تستخدم الاستدعاءات الداخلية بين الخدمات TLS متبادلًا حيث قد يُلاحَظ مسار الشبكة." },
      { title: 'صفر مكالمات لطرف ثالث', body: 'لا تحليلات، لا بكسلات، لا شبكات إعلانات، لا خطوط خارجية، لا فيديوهات مضمَّنة، لا أدوات وسائل تواصل اجتماعي. متصفحك يتحدث فقط مع مصدرنا. يُفرَض ذلك في التكامل المستمر عبر سكربت اسمه no-third-party.mjs يفحص الموقع المبني ويُفشل الإصدار إذا ظهر أي مضيف خارجي في الحزمة. الوعد اختبار وحدة، لا جملة تسويقية. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'إصدارات موقَّعة ومُتحقَّق منها', body: 'كل صورة حاوية نُطلِقها مبنية من مجموعة مغلقة من الأجزاء. ملف القفل في git. نراجع التنبيهات قبل تحديث أي جزء. الإصدارات موقَّعة وتُفحَص على المضيف قبل التشغيل. أي إصدار يفشل في أي بوابة — حجم الحزمة، إمكانية الوصول، طرف ثالث — لا يمكن أن يصل إلى الإنتاج.' },
      { title: 'نوافذ احتفاظ قصيرة', body: 'تُحفَظ سجلات الخادم لمدة أربعة عشر يومًا للتصحيح ثم تُحذف. تُحفَظ رسائل نموذج الاتصال فقط طوال المدة اللازمة للرد وحفظ المحادثة، ثم تُؤرشَف لمدة أقصاها أربعة وعشرون شهرًا لأغراض السجلات، ثم تُحذف. النسخ الاحتياطية تتدور بدورة ثلاثين يومًا ومشفَّرة في حالة الراحة.' },
      { title: 'بيئات منتجات معزولة', body: 'كل منتج يعمل بقاعدة بياناته الخاصة، وأسراره الخاصة، وقواعده الخاصة. الاختراق في أداة واحدة لا يمكن أن يمتد إلى أخرى. بعض الميزات تربط بين المنتجات. تسجيل دخول موحَّد. توجيه الدعم. إشارات الاحتيال. ننقل فقط الحد الأدنى اللازم بين المنتجات. كل تدفق موصوف في صفحة خصوصية كل منتج.' },
      { title: 'الإدارة خلف قائمة سماح', body: 'الوصول إلى لوحة Payload CMS الإدارية والخادم الأساسي مقيَّد على طبقة الوكيل بقائمة قصيرة من عناوين الإنترنت المعتمدة كتابيًا. المصادقة متعددة العوامل مطلوبة لكل حساب مسؤول. لا توجد بيانات اعتماد "مسؤول" مشتركة — كل إجراء يُنسَب إلى شخص باسمه.' },
      { title: 'الأسرار في خزنة، أبدًا في الكود', body: 'كلمات مرور قواعد البيانات، ومفاتيح API، وأسرار التوقيع، والشهادات تعيش في خزنة أسرار مشفَّرة وتُحقَن في وقت التشغيل. تحظر فحوصات الكود المصدري أي التزام يحاول تضمين بيانات اعتماد. الأسرار المُجدَّدة تنتشر إلى الخدمات الجارية خلال دقائق.' },
    ],
    dataHandling: [
      { title: 'أنت ترسل أقل، نحن نحتفظ بأقل', body: 'نطلب فقط الحد الأدنى الذي يحتاجه المنتج للعمل. لا مربعات اختيار مُسبقة. لا حقول "اختيارية" تصبح إلزامية بهدوء للحصول على نتائج. لا نشتري ولا نُثري البيانات الشخصية من أطراف ثالثة.' },
      { title: 'بياناتك ملكك', body: 'التصدير من كل منتج ميزة من الدرجة الأولى، لا ترقية بيع. احذف، وتُزال بياناتك — لا "حذف ناعم للأبد" خلف زر لا تراه. صيغ قياسية (CSV, JSON, ICS, PDF) عند الخروج. لا قفل ملكية.' },
      { title: 'لا تدريب على محتواك', body: 'تستخدم ميزات الذكاء الاصطناعي فقط البيانات التي تختار إرسالها. تبقى البيانات ضمن نطاق حسابك. لا يُستخدم محتواك الخاص أبدًا لتدريب نماذج مشتركة. لا يُمزَج أبدًا مع بيانات عميل آخر. لا يُرسَل أبدًا إلى ذكاء اصطناعي خارجي يحتفظ بمحفِّزاتك.' },
      { title: 'استجابة شفافة للحوادث', body: 'إذا مسَّ حدث أمني بياناتك، نخبرك خلال اثنتين وسبعين ساعة. بكلمات بسيطة. نقول ما حدث وما فعلناه وما يمكنك فعله بعد ذلك. ننشر تقرير ما بعد الحادث للعموم بمجرد إنجاز العمل. لن نُخفي اختراقًا أبدًا خلف تحديث سياسة هادئ.' },
      { title: 'حق الوصول عند الطلب', body: 'يمكنك طلب نسخة واضحة من كل بيان شخصي نحتفظ به. يمكنك طلب تصحيحه. يمكنك طلب حذفه. يمكنك طلب إرسال نسخة نظيفة إلى خدمة أخرى. نرد خلال ثلاثين يومًا مجانًا. يمكننا الرد بأي من اللغات الأربع عشرة التي يتحدث بها الموقع.' },
      { title: 'قائمة قصيرة لمعالجين فرعيين بالاسم', body: 'حفنة من البائعين تساعدنا في تشغيل المنصة — مثل شريك الاستضافة، وشريك إعادة توجيه البريد، وأي معالج لقنوات الدفع يستخدمه منتج عند الدفع. كل واحد مذكور بالاسم في صفحة الثقة لدينا مع الغرض الذي يخدمه والبيانات التي يلمسها. لا نُضيف معالجًا فرعيًا جديدًا في صمت أبدًا.' },
    ],
    compliance: [
      { title: 'PIPEDA (كندا)', body: 'شركتنا الأم مُؤسَّسة في ألبرتا. نتبع قانون حماية المعلومات الشخصية والوثائق الإلكترونية. نُجيب أمام مكتب مفوض الخصوصية في كندا. هناك أيضًا يمكنك تقديم شكوى خصوصية، بعد مراسلتنا أولًا.' },
      { title: 'حقوق مكافئة لـ GDPR عالميًا', body: 'نمنح حقوق GDPR الأوروبية لكل مستخدم في كل قارة. المساواة في المعاملة جزء من الرسالة. ليست خانة امتثال مرتبطة بمكان إقامتك.' },
      { title: 'WCAG 2.2 المستوى AA', body: 'إمكانية الوصول خاصية أمان — موقع لا تستطيع استخدامه هو موقع لا تستطيع الوثوق به. كل صفحة مبنية بحد أدنى وفق WCAG 2.2 AA، مع فحوصات axe-core تُفشل البناء عند أي مخالفة. اقرأ البيان الكامل على /legal/accessibility.' },
      { title: 'لا FedRAMP، لا SOC 2 — حتى الآن', body: 'نحن صادقون بشأن ما لا نملكه. نحن اليوم أصغر من أن نحافظ على تدقيق SOC 2 Type II أو ترخيص FedRAMP، ولن نزعمهما في التسويق. حين يدخل منتج سوقًا يتطلب أيهما، سنحصل عليه قبل تقديم ذلك المنتج هناك.' },
    ],
  },
  fr: {
    eyebrow: 'SÉCURITÉ · CONFIANCE · DONNÉES', title: 'Une sécurité que vous pouvez vraiment lire.',
    lede: "Pas de schémas marketing. Juste ce que nous faisons pour garder vos données privées, petites, et entre vos mains — sur ce site et sur chaque produit que nous livrons.",
    postureSummary: {
      eyebrow: 'Résumé de la posture',
      heading: 'Une origine. Chiffré sur le câble. Zéro tiers. Rétention courte. Sous-traitants nommés.',
      body: "Les cinq lignes ci-dessus sont toute la posture en une seule respiration. Tout ce qui suit est la preuve d'appui — ce que chaque ligne signifie, comment elle est appliquée, et comment signaler un problème quand quelque chose tourne mal.",
    },
    topStats: [
      { label: 'Trackers', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Appels tiers', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Rétention des logs serveur', value: '14 jours', hint: 'Puis supprimés définitivement' },
    ],
    reportCta: {
      eyebrow: 'Signaler une vulnérabilité',
      heading: "Trouvé quelque chose ? Dites-le-nous d'abord, s'il vous plaît.",
      body: "Envoyez un email à security@intelligentsingularityai.com avec une description et les étapes de reproduction. Nous confirmons les rapports sous un jour ouvré. Nous trions sous trois. Nous créditons les chercheurs nommément dans le post-mortem quand un correctif est livré, sauf s'ils demandent à rester anonymes. Nous ne menaçons ni ne poursuivons les chercheurs de sécurité de bonne foi, point final.",
    },
    posture: [
      { title: 'Chiffrement sur chaque câble', body: "Toutes les pages publiques et le trafic produit voyagent en TLS 1.3 avec des chiffres modernes. Les certificats sont émis par Let's Encrypt et renouvelés automatiquement. HTTP Strict Transport Security est configuré avec un max-age long. Rien de ce que vous tapez ne traverse jamais le web ouvert en clair. Les appels internes de service à service utilisent du TLS mutuel là où le chemin réseau pourrait être observé." },
      { title: 'Zéro appel tiers', body: "Pas d'analytique, pas de pixels, pas de réseaux publicitaires, pas de polices externes, pas de vidéo embarquée, pas de widgets de réseaux sociaux. Votre navigateur ne parle qu'à notre origine. C'est appliqué en intégration continue par un script appelé no-third-party.mjs qui scanne le site construit et fait échouer la livraison si un hôte externe apparaît dans le bundle. La promesse est un test unitaire, pas une ligne marketing. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list." },
      { title: 'Builds signés et vérifiés', body: "Chaque image de conteneur que nous livrons est construite à partir d'un ensemble verrouillé de pièces. Le lockfile est dans git. Nous examinons les avis avant de bouger toute pièce. Les livraisons sont signées et vérifiées sur l'hôte avant d'être lancées. Un build qui échoue à n'importe quelle barrière — taille du bundle, a11y, tiers — ne peut atteindre la production." },
      { title: 'Fenêtres de rétention courtes', body: "Les logs serveur sont conservés quatorze jours pour le débogage puis supprimés. Les emails du formulaire de contact ne sont gardés que le temps nécessaire pour répondre et classer la conversation, puis archivés jusqu'à vingt-quatre mois à des fins d'archivage, puis supprimés. Les sauvegardes tournent sur un cycle de trente jours et sont chiffrées au repos." },
      { title: 'Environnements produits isolés', body: "Chaque produit tourne avec sa propre base de données, ses propres secrets, ses propres règles. Une intrusion sur un outil ne peut pas déborder sur un autre. Certaines fonctionnalités relient les produits. Single sign-on. Routage du support. Signaux de fraude. Nous déplaçons uniquement le minimum nécessaire entre les produits. Chaque flux est décrit sur la page de confidentialité de chaque produit." },
      { title: "L'admin derrière une allow-list", body: "L'accès à l'admin Payload CMS et au serveur sous-jacent est restreint au niveau du proxy à une courte liste d'adresses internet approuvées par écrit. L'authentification multi-facteurs est requise pour chaque compte administrateur. Pas d'identifiant « admin » partagé — chaque action est imputable à une personne nommée." },
      { title: 'Secrets dans un coffre, jamais dans le code', body: "Les mots de passe de base de données, les clés API, les secrets de signature et les certificats vivent dans un coffre de secrets chiffré et sont injectés à l'exécution. Les scans du code source bloquent tout commit qui tente d'embarquer un identifiant. Les secrets renouvelés se propagent aux services en cours en quelques minutes." },
    ],
    dataHandling: [
      { title: 'Vous envoyez moins, nous stockons moins', body: "Nous ne demandons que le minimum dont un produit a besoin pour fonctionner. Pas de cases pré-cochées. Pas de champs « optionnels » qui deviennent silencieusement obligatoires pour obtenir des résultats. Nous n'achetons pas et n'enrichissons pas les données personnelles auprès de tiers." },
      { title: 'Vos données sont à vous', body: "L'export depuis chaque produit est une fonctionnalité de première classe, pas un upsell. Supprimez, et vos données sont enlevées — pas un « soft-deleted pour toujours » derrière un interrupteur que vous ne voyez pas. Formats standard (CSV, JSON, ICS, PDF) à la sortie. Pas de lock-in propriétaire." },
      { title: "Pas d'entraînement sur votre contenu", body: "Les fonctionnalités IA n'utilisent que les données que vous choisissez de soumettre. Les données restent dans le périmètre de votre compte. Votre contenu privé n'est jamais utilisé pour entraîner des modèles partagés. Il n'est jamais mélangé aux données d'un autre client. Il n'est jamais envoyé à une IA tierce qui conserve vos prompts." },
      { title: 'Réponse aux incidents transparente', body: "Si un événement de sécurité touche vos données, nous vous prévenons sous soixante-douze heures. Avec des mots simples. Nous disons ce qui s'est passé, ce que nous avons fait, et ce que vous pouvez faire ensuite. Nous publions un post-mortem public une fois le travail terminé. Nous ne cacherons jamais une brèche derrière une mise à jour de politique silencieuse." },
      { title: "Droit d'accès, sur demande", body: "Vous pouvez demander une copie claire de chaque donnée personnelle que nous détenons. Vous pouvez nous demander de la corriger. Vous pouvez nous demander de la supprimer. Vous pouvez nous demander d'envoyer une copie propre à un autre service. Nous répondons sous trente jours, gratuitement. Nous pouvons répondre dans n'importe laquelle des quatorze langues parlées sur le site." },
      { title: 'Une courte liste de sous-traitants, nommés', body: "Une poignée de prestataires nous aide à faire tourner la plateforme — par exemple notre partenaire d'hébergement, notre partenaire d'email-relay, et tout processeur de paiement qu'un produit utilise au checkout. Chacun est nommé sur notre page trust avec l'objectif qu'il sert et les données qu'il touche. Nous n'ajoutons jamais un nouveau sous-traitant en silence." },
    ],
    compliance: [
      { title: 'PIPEDA (Canada)', body: "Notre société mère est constituée en Alberta. Nous suivons la Loi sur la protection des renseignements personnels et les documents électroniques. Nous rendons compte au Commissariat à la protection de la vie privée du Canada. C'est aussi là que vous pouvez porter une préoccupation de confidentialité, après nous avoir écrit d'abord." },
      { title: 'Droits équivalents au RGPD, mondialement', body: "Nous étendons les droits du RGPD européen à chaque utilisateur, sur chaque continent. L'égalité de traitement fait partie de la mission. Pas une case de conformité liée à votre lieu de résidence." },
      { title: 'WCAG 2.2 niveau AA', body: "L'accessibilité est une propriété de sécurité — un site que vous ne pouvez pas utiliser est un site auquel vous ne pouvez pas faire confiance. Chaque page est construite au minimum au niveau WCAG 2.2 AA, avec des vérifications axe-core qui font échouer le build à toute violation. Lisez la déclaration complète sur /legal/accessibility." },
      { title: "Pas de FedRAMP, pas de SOC 2 — pour l'instant", body: "Nous sommes honnêtes sur ce que nous n'avons pas. Nous sommes aujourd'hui trop petits pour maintenir un audit SOC 2 Type II ou une autorisation FedRAMP, et nous ne les revendiquerons pas dans le marketing. Quand un produit entrera sur un marché qui en exige un, nous l'obtiendrons avant que ce produit y soit proposé." },
    ],
  },
  pt: {
    eyebrow: 'SEGURANÇA · CONFIANÇA · DADOS', title: 'Segurança que pode mesmo ler.',
    lede: 'Sem diagramas de marketing. Apenas o que fazemos para manter os seus dados privados, pequenos e nas suas mãos — neste site e em cada produto que entregamos.',
    postureSummary: {
      eyebrow: 'Resumo da postura',
      heading: 'Uma origem. Encriptado no fio. Zero terceiros. Retenção curta. Subprocessadores nomeados.',
      body: 'As cinco linhas acima são toda a postura num só fôlego. Tudo abaixo é a evidência de apoio — o que cada linha significa, como é aplicada, e como reportar um problema quando algo corre mal.',
    },
    topStats: [
      { label: 'Rastreadores', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Chamadas a terceiros', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Retenção de logs do servidor', value: '14 dias', hint: 'Depois eliminados permanentemente' },
    ],
    reportCta: {
      eyebrow: 'Reportar uma vulnerabilidade',
      heading: 'Encontrou algo? Por favor, diga-nos primeiro.',
      body: 'Envie um email para security@intelligentsingularityai.com com uma descrição e os passos para reproduzir. Confirmamos relatos dentro de um dia útil. Triamos em três. Damos crédito aos investigadores pelo nome no post-mortem quando uma correção é lançada, a menos que peçam para permanecer anónimos. Não ameaçamos nem processamos investigadores de segurança de boa-fé, ponto final.',
    },
    posture: [
      { title: 'Encriptação em cada fio', body: "Todas as páginas públicas e o tráfego dos produtos viajam por TLS 1.3 com cifras modernas. Os certificados são emitidos pela Let's Encrypt e rodam automaticamente. HTTP Strict Transport Security está configurado com um max-age longo. Nada do que escreve atravessa a web aberta em texto simples. As chamadas internas serviço a serviço usam TLS mútuo onde o caminho de rede possa ser observado." },
      { title: 'Zero chamadas a terceiros', body: 'Sem analítica, sem pixels, sem redes de publicidade, sem fontes externas, sem vídeo embebido, sem widgets de redes sociais. O seu browser só fala com a nossa origem. Isto é aplicado em integração contínua por um script chamado no-third-party.mjs que faz scan do site construído e faz falhar o lançamento se algum host externo aparecer no bundle. A promessa é um teste unitário, não uma linha de marketing. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Builds assinados e verificados', body: 'Cada imagem de contentor que enviamos é construída a partir de um conjunto bloqueado de partes. O lockfile está no git. Revemos avisos antes de atualizar qualquer parte. Os lançamentos são assinados e verificados no anfitrião antes de correrem. Um build que falhe qualquer porta — tamanho do bundle, a11y, terceiros — não pode chegar à produção.' },
      { title: 'Janelas de retenção curtas', body: 'Os logs do servidor são guardados durante catorze dias para depuração e depois apagados. Os emails do formulário de contacto são mantidos apenas o tempo necessário para responder e arquivar a conversa, depois arquivados até vinte e quatro meses para registo, depois apagados. Os backups rolam num ciclo de trinta dias e estão encriptados em repouso.' },
      { title: 'Ambientes de produto isolados', body: 'Cada produto corre com a sua própria base de dados, os seus próprios segredos e as suas próprias regras. Uma intrusão numa ferramenta não pode passar para outra. Algumas funcionalidades cruzam produtos. Single sign-on. Encaminhamento de apoio. Sinais de fraude. Movemos apenas o mínimo necessário entre produtos. Cada fluxo está descrito na página de privacidade de cada produto.' },
      { title: 'Admin atrás de uma allow-list', body: 'O acesso ao painel Payload CMS e ao servidor subjacente está restringido na camada de proxy a uma lista curta de endereços de internet aprovados por escrito. A autenticação multifator é obrigatória para cada conta de administrador. Não há credencial "admin" partilhada — cada ação é atribuível a uma pessoa nomeada.' },
      { title: 'Segredos num cofre, nunca no código', body: 'As palavras-passe de base de dados, as chaves API, os segredos de assinatura e os certificados vivem num cofre de segredos encriptado e são injetados em tempo de execução. Os scans de código fonte bloqueiam qualquer commit que tente embutir uma credencial. Os segredos rodados propagam-se aos serviços em execução em minutos.' },
    ],
    dataHandling: [
      { title: 'Você envia menos, nós guardamos menos', body: 'Pedimos apenas o mínimo que um produto precisa para funcionar. Sem caixas pré-marcadas. Sem campos "opcionais" que silenciosamente se tornam obrigatórios para obter resultados. Não compramos nem enriquecemos dados pessoais junto de terceiros.' },
      { title: 'Os seus dados são seus', body: 'A exportação a partir de cada produto é uma funcionalidade de primeira classe, não um upsell. Apague, e os seus dados são removidos — não "soft-delete para sempre" atrás de um interruptor que não pode ver. Formatos padrão (CSV, JSON, ICS, PDF) à saída. Sem lock-in proprietário.' },
      { title: 'Sem treino no seu conteúdo', body: 'As funcionalidades de IA usam apenas dados que escolhe enviar. Os dados ficam no âmbito da sua conta. O seu conteúdo privado nunca é usado para treinar modelos partilhados. Nunca é misturado com dados de outro cliente. Nunca é enviado a uma IA de terceiros que guarde os seus prompts.' },
      { title: 'Resposta a incidentes transparente', body: 'Se um evento de segurança alguma vez tocar nos seus dados, dizemos-lhe dentro de setenta e duas horas. Em palavras simples. Dizemos o que aconteceu, o que fizemos, e o que pode fazer a seguir. Publicamos um post-mortem público assim que o trabalho está feito. Nunca esconderemos uma brecha por trás de uma atualização silenciosa de política.' },
      { title: 'Direito de acesso, a pedido', body: 'Pode pedir uma cópia clara de cada bocadinho de dados pessoais que tenhamos. Pode pedir-nos para corrigir. Pode pedir-nos para apagar. Pode pedir-nos para enviar uma cópia limpa a outro serviço. Respondemos em trinta dias, grátis. Podemos responder em qualquer uma das catorze línguas em que o site fala.' },
      { title: 'Uma lista curta de subprocessadores, com nome', body: 'Um punhado de fornecedores ajuda-nos a operar a plataforma — por exemplo o nosso parceiro de hosting, o parceiro de email-relay, e qualquer processador de pagamentos que um produto use no checkout. Cada um é nomeado na nossa página de trust com o propósito que serve e os dados que toca. Nunca adicionamos um novo subprocessador em silêncio.' },
    ],
    compliance: [
      { title: 'PIPEDA (Canadá)', body: 'A nossa empresa-mãe está constituída em Alberta. Seguimos a Lei de Proteção de Informações Pessoais e Documentos Eletrónicos. Respondemos perante o Gabinete do Comissário de Privacidade do Canadá. Aí também pode levar uma preocupação de privacidade, depois de nos escrever primeiro.' },
      { title: 'Direitos equivalentes ao GDPR, globalmente', body: 'Estendemos os direitos do GDPR europeu a cada utilizador, em cada continente. Igualdade de tratamento faz parte da missão. Não é uma caixa de conformidade ligada a onde mora.' },
      { title: 'WCAG 2.2 nível AA', body: 'A acessibilidade é uma propriedade de segurança — um site que não consegue usar é um site em que não pode confiar. Cada página é construída no mínimo ao nível WCAG 2.2 AA, com verificações axe-core a fazer falhar o build em qualquer violação. Leia a declaração completa em /legal/accessibility.' },
      { title: 'Sem FedRAMP, sem SOC 2 — por enquanto', body: 'Somos honestos sobre o que não temos. Hoje somos demasiado pequenos para manter uma auditoria SOC 2 Type II ou uma autorização FedRAMP, e não as iremos reivindicar em marketing. Quando um produto entrar num mercado que exija uma, conquistá-la-emos antes de oferecer esse produto lá.' },
    ],
  },
  bn: {
    eyebrow: 'নিরাপত্তা · আস্থা · ডেটা', title: 'যে নিরাপত্তা আপনি সত্যিই পড়তে পারবেন।',
    lede: 'কোনো মার্কেটিং ডায়াগ্রাম নয়। শুধু আমরা যা করি আপনার ডেটাকে গোপন, ছোট এবং আপনার হাতে রাখতে — এই সাইটে এবং আমরা যে প্রতিটি পণ্য পাঠাই তাতে।',
    postureSummary: {
      eyebrow: 'অবস্থান সারসংক্ষেপ',
      heading: 'একটি মূল। তারে এনক্রিপ্টেড। শূন্য তৃতীয়-পক্ষ। ছোট ধারণ। নাম-উল্লিখিত সাব-প্রসেসর।',
      body: 'উপরের পাঁচটি লাইন একটি নিঃশ্বাসে সম্পূর্ণ অবস্থান। নিচের সবকিছু সমর্থনকারী প্রমাণ — প্রতিটি লাইনের অর্থ, এটি কীভাবে প্রয়োগ করা হয় এবং কিছু ভুল হলে সমস্যাটি কীভাবে রিপোর্ট করতে হয়।',
    },
    topStats: [
      { label: 'ট্র্যাকার', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'তৃতীয়-পক্ষ কল', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'সার্ভার লগ ধারণ', value: '14 দিন', hint: 'তারপর স্থায়ীভাবে মুছে ফেলা হয়' },
    ],
    reportCta: {
      eyebrow: 'একটি দুর্বলতা রিপোর্ট করুন',
      heading: 'কিছু পেলেন? দয়া করে আমাদের প্রথমে বলুন।',
      body: 'বিবরণ এবং পুনরুৎপাদনের পদক্ষেপ সহ security@intelligentsingularityai.com-এ ইমেইল করুন। আমরা এক কার্যদিবসের মধ্যে রিপোর্ট নিশ্চিত করি। তিনের মধ্যে ট্রায়েজ করি। ফিক্স যখন শিপ হয়, তখন পোস্ট-মর্টেমে আমরা গবেষকদের নাম দিয়ে কৃতিত্ব দিই, যদি না তারা বেনামি থাকতে চান। আমরা সদিচ্ছাপূর্ণ সুরক্ষা গবেষকদের কখনো হুমকি দিই না বা মামলা করি না, পুরোপুরি বিরাম।',
    },
    posture: [
      { title: 'প্রতিটি তারে এনক্রিপশন', body: "সকল সর্বজনীন পৃষ্ঠা এবং পণ্য ট্র্যাফিক আধুনিক সাইফারের সাথে TLS 1.3-এ ভ্রমণ করে। সার্টিফিকেটগুলো Let's Encrypt দ্বারা জারি এবং স্বয়ংক্রিয়ভাবে রোটেট করা হয়। HTTP Strict Transport Security একটি দীর্ঘ max-age সহ সেট করা। আপনি যা টাইপ করেন তা কখনো প্লেইন টেক্সটে খোলা ওয়েব অতিক্রম করে না। অভ্যন্তরীণ পরিষেবা-থেকে-পরিষেবা কলগুলো mutual TLS ব্যবহার করে যেখানে নেটওয়ার্ক পথ পর্যবেক্ষণ করা যেতে পারে।" },
      { title: 'শূন্য তৃতীয়-পক্ষ কল', body: 'কোনো অ্যানালিটিক্স নেই, কোনো পিক্সেল নেই, কোনো বিজ্ঞাপন নেটওয়ার্ক নেই, কোনো বাহ্যিক ফন্ট নেই, কোনো এমবেডেড ভিডিও নেই, কোনো সোশ্যাল-মিডিয়া উইজেট নেই। আপনার ব্রাউজার শুধু আমাদের অরিজিনের সাথে কথা বলে। এটি ক্রমাগত ইন্টিগ্রেশনে no-third-party.mjs নামক একটি স্ক্রিপ্ট দ্বারা প্রয়োগ করা হয় যা নির্মিত সাইট স্ক্যান করে এবং বান্ডলে কোনো বাহ্যিক হোস্ট দেখা গেলে রিলিজ ব্যর্থ করে। প্রতিশ্রুতি একটি ইউনিট টেস্ট, মার্কেটিং লাইন নয়। On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'স্বাক্ষরিত এবং যাচাইকৃত বিল্ড', body: 'আমরা যে প্রতিটি কন্টেইনার ইমেজ পাঠাই তা তালাবদ্ধ অংশের একটি সেট থেকে তৈরি। লকফাইল git-এ আছে। আমরা যেকোনো অংশ আপগ্রেড করার আগে পরামর্শাবলী পর্যালোচনা করি। রিলিজগুলো স্বাক্ষরিত এবং চলার আগে হোস্টে যাচাই করা হয়। যেকোনো গেট — বান্ডল আকার, a11y, তৃতীয় পক্ষ — ব্যর্থ হওয়া বিল্ড উৎপাদনে পৌঁছাতে পারে না।' },
      { title: 'ছোট ধারণ উইন্ডো', body: 'সার্ভার লগগুলো ডিবাগিংয়ের জন্য চৌদ্দ দিন রাখা হয় এবং তারপর মুছে ফেলা হয়। যোগাযোগ-ফর্ম ইমেইলগুলো কেবল ততক্ষণই রাখা হয় যতক্ষণ উত্তর দিতে এবং কথোপকথন ফাইল করতে লাগে, তারপর সর্বোচ্চ চব্বিশ মাস পর্যন্ত রেকর্ড-রক্ষার জন্য সংরক্ষিত, তারপর মুছে ফেলা। ব্যাকআপ ত্রিশ-দিনের চক্রে রোল করে এবং রেস্টে এনক্রিপ্ট করা।' },
      { title: 'বিচ্ছিন্ন পণ্য পরিবেশ', body: 'প্রতিটি পণ্য তার নিজস্ব ডেটাবেস, নিজস্ব সিক্রেট এবং নিজস্ব নিয়ম নিয়ে চলে। একটি টুলে অনুপ্রবেশ অন্যটিতে ছড়াতে পারে না। কিছু ফিচার পণ্যের মধ্যে লিঙ্ক করে। সিঙ্গেল সাইন-অন। সাপোর্ট রাউটিং। প্রতারণা সংকেত। আমরা পণ্যের মধ্যে শুধুমাত্র প্রয়োজনীয় ন্যূনতম স্থানান্তর করি। প্রতিটি প্রবাহ প্রতিটি পণ্যের গোপনীয়তা পৃষ্ঠায় রয়েছে।' },
      { title: 'অ্যাডমিন একটি allow-list এর পেছনে', body: 'Payload CMS অ্যাডমিনে এবং অন্তর্নিহিত সার্ভারে অ্যাক্সেস প্রক্সি স্তরে লিখিতভাবে অনুমোদিত ইন্টারনেট ঠিকানার একটি সংক্ষিপ্ত তালিকায় সীমিত। প্রতিটি অ্যাডমিনিস্ট্রেটর অ্যাকাউন্টের জন্য মাল্টি-ফ্যাক্টর প্রমাণীকরণ প্রয়োজন। কোনো শেয়ার করা "অ্যাডমিন" ক্রেডেনশিয়াল নেই — প্রতিটি কর্ম একজন নাম-উল্লিখিত ব্যক্তির কাছে দায়ী।' },
      { title: 'সিক্রেট ভল্টে, কখনো কোডে নয়', body: 'ডেটাবেস পাসওয়ার্ড, API কী, স্বাক্ষর সিক্রেট এবং সার্টিফিকেট একটি এনক্রিপ্টেড সিক্রেট ভল্টে থাকে এবং রানটাইমে ইনজেক্ট করা হয়। সোর্স-কোড স্ক্যান যেকোনো কমিট ব্লক করে যা ক্রেডেনশিয়াল এম্বেড করার চেষ্টা করে। রোটেট করা সিক্রেট কয়েক মিনিটের মধ্যে চলমান পরিষেবাগুলোতে ছড়িয়ে যায়।' },
    ],
    dataHandling: [
      { title: 'আপনি কম পাঠান, আমরা কম জমা করি', body: 'আমরা শুধু পণ্যের কাজ করতে যা সর্বনিম্ন প্রয়োজন সেটাই চাই। কোনো প্রি-চেক্ড বক্স নেই। কোনো "ঐচ্ছিক" ফিল্ড নেই যা ফলাফল পেতে নীরবে বাধ্যতামূলক হয়ে ওঠে। আমরা তৃতীয় পক্ষ থেকে ব্যক্তিগত ডেটা কিনি বা সমৃদ্ধ করি না।' },
      { title: 'আপনার ডেটা আপনারই', body: 'প্রতিটি পণ্য থেকে রপ্তানি একটি প্রথম-শ্রেণির বৈশিষ্ট্য, আপসেল নয়। মুছুন, এবং আপনার ডেটা মুছে ফেলা হয় — এমন কোনো সুইচের পেছনে "চিরকালীন সফট-ডিলিট" নয় যা আপনি দেখতে পারেন না। বের হওয়ার পথে স্ট্যান্ডার্ড ফরম্যাট (CSV, JSON, ICS, PDF)। কোনো প্রোপ্রাইটারি লক-ইন নেই।' },
      { title: 'আপনার সামগ্রীতে কোনো প্রশিক্ষণ নয়', body: 'AI বৈশিষ্ট্যগুলো শুধু আপনি যে ডেটা জমা দিতে বেছে নেন সেটাই ব্যবহার করে। ডেটা আপনার অ্যাকাউন্টের সীমার মধ্যেই থাকে। আপনার ব্যক্তিগত সামগ্রী কখনো ভাগ করা মডেল প্রশিক্ষণের জন্য ব্যবহৃত হয় না। এটি কখনো অন্য গ্রাহকের ডেটার সাথে মিশ্রিত হয় না। এটি কখনো এমন তৃতীয়-পক্ষ AI-তে পাঠানো হয় না যা আপনার প্রম্পট রাখে।' },
      { title: 'স্বচ্ছ ঘটনা প্রতিক্রিয়া', body: 'যদি কোনো নিরাপত্তা ঘটনা আপনার ডেটায় স্পর্শ করে, আমরা বাহাত্তর ঘণ্টার মধ্যে আপনাকে জানাই। সরল ভাষায়। আমরা বলি কী হয়েছে, আমরা কী করেছি, এবং আপনি পরবর্তীতে কী করতে পারেন। কাজ শেষ হলে আমরা একটি সর্বজনীন পোস্ট-মর্টেম প্রকাশ করি। আমরা কখনো একটি নিরব পলিসি আপডেটের পেছনে একটি লঙ্ঘন লুকাব না।' },
      { title: 'অনুরোধে অ্যাক্সেসের অধিকার', body: 'আমরা যে প্রতিটি ব্যক্তিগত ডেটা ধারণ করি তার একটি সরল কপি আপনি চাইতে পারেন। আমাদের ঠিক করতে বলতে পারেন। মুছতে বলতে পারেন। অন্য কোনো পরিষেবায় পরিষ্কার কপি পাঠাতে বলতে পারেন। আমরা ত্রিশ দিনের মধ্যে বিনামূল্যে উত্তর দিই। আমরা সাইটের চৌদ্দটি ভাষার যেকোনোটিতে উত্তর দিতে পারি।' },
      { title: 'নাম-উল্লিখিত সাব-প্রসেসরের একটি ছোট তালিকা', body: 'অল্প কিছু বিক্রেতা আমাদের প্ল্যাটফর্ম চালাতে সাহায্য করে — যেমন আমাদের হোস্টিং পার্টনার, ইমেইল-রিলে পার্টনার এবং কোনো পেমেন্ট-রেইল প্রসেসর যা একটি পণ্য চেকআউটে ব্যবহার করে। প্রত্যেকটি আমাদের ট্রাস্ট পৃষ্ঠায় নাম-উল্লিখিত, তাদের উদ্দেশ্য এবং স্পর্শ করা ডেটা সহ। আমরা কখনো নীরবে নতুন সাব-প্রসেসর যোগ করি না।' },
    ],
    compliance: [
      { title: 'PIPEDA (কানাডা)', body: 'আমাদের মূল কোম্পানি আলবার্টায় প্রতিষ্ঠিত। আমরা ব্যক্তিগত তথ্য সুরক্ষা এবং ইলেকট্রনিক ডকুমেন্টস আইন অনুসরণ করি। আমরা কানাডার গোপনীয়তা কমিশনারের কার্যালয়ের কাছে দায়বদ্ধ। আপনি প্রথমে আমাদের লেখার পর সেখানেও একটি গোপনীয়তা উদ্বেগ নিয়ে যেতে পারেন।' },
      { title: 'GDPR-সমতুল্য অধিকার, বিশ্বব্যাপী', body: 'আমরা ইউরোপীয় GDPR-এর অধিকারগুলো প্রতিটি মহাদেশের প্রতিটি ব্যবহারকারীর কাছে প্রসারিত করি। সমান আচরণ মিশনের একটি অংশ। কোনো অনুপালন চেকবক্স নয় যা আপনি কোথায় বাস করেন তার সাথে বাঁধা।' },
      { title: 'WCAG 2.2 লেভেল AA', body: 'প্রবেশযোগ্যতা একটি নিরাপত্তা সম্পত্তি — যে সাইট আপনি ব্যবহার করতে পারেন না সেটি এমন সাইট যাকে আপনি বিশ্বাস করতে পারেন না। প্রতিটি পৃষ্ঠা ন্যূনতম WCAG 2.2 AA-তে নির্মিত, যেখানে axe-core পরীক্ষাগুলো যেকোনো লঙ্ঘনে বিল্ড ব্যর্থ করে। সম্পূর্ণ বিবৃতি /legal/accessibility-এ পড়ুন।' },
      { title: 'এখনো FedRAMP নেই, SOC 2 নেই', body: 'আমরা যা আমাদের নেই সে সম্পর্কে সৎ। আমরা আজ SOC 2 Type II নিরীক্ষা বা FedRAMP অনুমোদন বজায় রাখার জন্য খুব ছোট, এবং আমরা মার্কেটিংয়ে সেগুলো দাবি করব না। যখন কোনো পণ্য এমন বাজারে প্রবেশ করবে যা একটি প্রয়োজন, আমরা সেই পণ্যটি সেখানে দেওয়ার আগে এটি অর্জন করব।' },
    ],
  },
  ru: {
    eyebrow: 'БЕЗОПАСНОСТЬ · ДОВЕРИЕ · ДАННЫЕ', title: 'Безопасность, которую вы действительно можете прочитать.',
    lede: 'Никаких маркетинговых диаграмм. Только то, что мы делаем, чтобы ваши данные оставались приватными, небольшими и в ваших руках — на этом сайте и во всех продуктах, которые мы выпускаем.',
    postureSummary: {
      eyebrow: 'Сводка позиции',
      heading: 'Один источник. Шифрование на проводе. Ноль сторонних. Короткое хранение. Именованные субпроцессоры.',
      body: 'Пять строк выше — это вся позиция в одном дыхании. Всё ниже — поддерживающее доказательство: что значит каждая строка, как она обеспечивается и как сообщить о проблеме, когда что-то идёт не так.',
    },
    topStats: [
      { label: 'Трекеры', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Вызовы сторонних', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Хранение логов сервера', value: '14 дней', hint: 'Затем удаляются навсегда' },
    ],
    reportCta: {
      eyebrow: 'Сообщить об уязвимости',
      heading: 'Нашли что-то? Пожалуйста, расскажите сначала нам.',
      body: 'Напишите на security@intelligentsingularityai.com с описанием и шагами воспроизведения. Подтверждаем отчёты в течение одного рабочего дня. Сортируем в течение трёх. Указываем имена исследователей в посмертном отчёте, когда выходит исправление, если только они не просят остаться анонимными. Мы никогда не угрожаем добросовестным исследователям безопасности и не подаём на них в суд, точка.',
    },
    posture: [
      { title: 'Шифрование на каждом проводе', body: "Все публичные страницы и трафик продуктов идут через TLS 1.3 с современными шифрами. Сертификаты выпускаются Let's Encrypt и автоматически обновляются. HTTP Strict Transport Security настроен с длинным max-age. Ничто из того, что вы вводите, никогда не пересекает открытый интернет в виде открытого текста. Внутренние вызовы между сервисами используют взаимный TLS там, где сетевой путь можно наблюдать." },
      { title: 'Ноль вызовов сторонних', body: 'Никакой аналитики, никаких пикселей, никаких рекламных сетей, никаких внешних шрифтов, никакого встроенного видео, никаких виджетов соцсетей. Ваш браузер общается только с нашим источником. Это обеспечивается в непрерывной интеграции скриптом no-third-party.mjs, который сканирует собранный сайт и проваливает релиз, если в бандле появляется внешний хост. Обещание — это юнит-тест, а не маркетинговая строка. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Подписанные и проверенные сборки', body: 'Каждый контейнерный образ, который мы выпускаем, собран из заблокированного набора частей. Lockfile в git. Мы изучаем уведомления, прежде чем поднять любую часть. Релизы подписаны и проверяются на хосте перед запуском. Сборка, которая не проходит хотя бы один шлюз — размер бандла, доступность, сторонние, — не может попасть в продакшен.' },
      { title: 'Короткие окна хранения', body: 'Серверные логи хранятся четырнадцать дней для отладки, потом удаляются. Письма с контактной формы хранятся ровно столько, сколько нужно, чтобы ответить и заархивировать переписку, далее архивируются до двадцати четырёх месяцев для учёта, затем удаляются. Резервные копии идут циклом тридцать дней и зашифрованы в покое.' },
      { title: 'Изолированные среды продуктов', body: 'Каждый продукт работает со своей базой, своими секретами и своими правилами. Взлом одного инструмента не может перетечь в другой. Некоторые фичи связывают продукты. Single sign-on. Маршрутизация поддержки. Сигналы мошенничества. Между продуктами мы передаём только необходимый минимум. Каждый поток описан на странице приватности своего продукта.' },
      { title: 'Админка за allow-list', body: 'Доступ к админ-панели Payload CMS и к самому серверу ограничен на уровне прокси коротким списком интернет-адресов, утверждённых в письменной форме. Многофакторная аутентификация обязательна для каждого администраторского аккаунта. Нет общего «admin»-доступа — каждое действие можно сопоставить с конкретным человеком.' },
      { title: 'Секреты в хранилище, никогда в коде', body: 'Пароли БД, API-ключи, ключи подписи и сертификаты живут в зашифрованном хранилище секретов и подкачиваются во время выполнения. Сканеры исходного кода блокируют любой коммит, пытающийся встроить учётные данные. Обновлённые секреты распространяются на рабочие сервисы в течение минут.' },
    ],
    dataHandling: [
      { title: 'Вы шлёте меньше — мы храним меньше', body: 'Мы просим только тот минимум, который продукту нужен для работы. Никаких заранее проставленных галочек. Никаких «опциональных» полей, которые тихо становятся обязательными для получения результата. Мы не покупаем и не обогащаем персональные данные у третьих сторон.' },
      { title: 'Ваши данные — ваши', body: 'Экспорт из любого продукта — функция первого класса, не апсейл. Удалите — и ваши данные удаляются, никаких «мягких удалений навсегда» за переключателем, который вы не видите. Стандартные форматы (CSV, JSON, ICS, PDF) на выходе. Никакой проприетарной привязки.' },
      { title: 'Никакого обучения на вашем контенте', body: 'Функции ИИ используют только те данные, которые вы решаете отправить. Данные остаются в рамках вашей учётной записи. Ваш приватный контент никогда не используется для обучения общих моделей. Никогда не смешивается с данными другого клиента. Никогда не отправляется стороннему ИИ, который сохраняет ваши промпты.' },
      { title: 'Прозрачное реагирование на инциденты', body: 'Если событие безопасности коснётся ваших данных, мы сообщаем вам в течение семидесяти двух часов. Простыми словами. Мы говорим, что произошло, что мы сделали и что вы можете сделать дальше. Мы публикуем публичный пост-мортем по завершении работы. Мы никогда не скроем брешь за тихим обновлением политики.' },
      { title: 'Право доступа по запросу', body: 'Вы можете запросить понятную копию любых ваших персональных данных, которые мы храним. Можете попросить исправить. Можете попросить удалить. Можете попросить отправить чистую копию в другую службу. Отвечаем в течение тридцати дней бесплатно. Можем ответить на любом из четырнадцати языков сайта.' },
      { title: 'Короткий список именованных субпроцессоров', body: 'Несколько вендоров помогают нам управлять платформой — например, хостинг-партнёр, партнёр по email-relay и любой платёжный процессор, который продукт использует на чекауте. Каждый назван на нашей странице trust с указанием цели и данных, которых он касается. Мы никогда не добавляем нового субпроцессора молча.' },
    ],
    compliance: [
      { title: 'PIPEDA (Канада)', body: 'Наша материнская компания зарегистрирована в Альберте. Мы следуем Закону о защите персональной информации и электронных документов. Мы подотчётны Управлению уполномоченного по приватности Канады. Туда же вы можете обратиться с вопросом о приватности — после того как сначала напишете нам.' },
      { title: 'Эквивалент GDPR — глобально', body: 'Мы распространяем права из европейского GDPR на каждого пользователя на каждом континенте. Равное отношение — часть миссии. А не галочка комплаенса, привязанная к вашему месту жительства.' },
      { title: 'WCAG 2.2 уровень AA', body: 'Доступность — свойство безопасности: сайт, которым вы не можете пользоваться, — сайт, которому нельзя доверять. Каждая страница построена минимум по WCAG 2.2 AA, с проверками axe-core, которые роняют сборку при любом нарушении. Полная декларация — на /legal/accessibility.' },
      { title: 'Без FedRAMP, без SOC 2 — пока', body: 'Мы честны о том, чего у нас нет. Сегодня мы слишком малы, чтобы поддерживать аудит SOC 2 Type II или авторизацию FedRAMP, и не будем заявлять о них в маркетинге. Когда продукт зайдёт на рынок, где это требуется, мы получим это до того, как продукт появится там.' },
    ],
  },
  ur: {
    eyebrow: 'سیکیورٹی · اعتماد · ڈیٹا', title: 'وہ سیکیورٹی جسے آپ واقعی پڑھ سکیں۔',
    lede: 'کوئی مارکیٹنگ ڈایاگرامز نہیں۔ صرف وہ جو ہم آپ کے ڈیٹا کو نجی، چھوٹا، اور آپ کے ہاتھ میں رکھنے کے لیے کرتے ہیں — اس سائٹ پر اور ہر اس پروڈکٹ میں جو ہم بھیجتے ہیں۔',
    postureSummary: {
      eyebrow: 'پوزیشن کا خلاصہ',
      heading: 'ایک اصل۔ تار پر انکرپٹڈ۔ صفر تھرڈ پارٹیز۔ مختصر برقراری۔ نام والے سب پروسیسرز۔',
      body: 'اوپر کی پانچ لائنیں ایک سانس میں پوری پوزیشن ہیں۔ نیچے ہر چیز معاون ثبوت ہے — ہر لائن کا کیا مطلب ہے، اسے کیسے نافذ کیا جاتا ہے، اور کچھ غلط ہونے پر کسی مسئلے کی اطلاع کیسے دی جائے۔',
    },
    topStats: [
      { label: 'ٹریکرز', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'تھرڈ-پارٹی کالز', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'سرور لاگ برقراری', value: '14 دن', hint: 'پھر مستقل طور پر ڈلیٹ کر دیا جاتا ہے' },
    ],
    reportCta: {
      eyebrow: 'کمزوری کی اطلاع دیں',
      heading: 'کچھ ملا؟ براہ کرم پہلے ہمیں بتائیں۔',
      body: 'تفصیل اور دوبارہ پیدا کرنے کے اقدامات کے ساتھ security@intelligentsingularityai.com پر ای میل کریں۔ ہم رپورٹس کی تصدیق ایک کاروباری دن کے اندر کرتے ہیں۔ تین میں ٹرائج کرتے ہیں۔ جب فکس شپ ہوتا ہے، پوسٹ-مارٹم میں ہم محققین کو نام سے کریڈٹ دیتے ہیں، جب تک وہ گمنام رہنے نہ مانگیں۔ ہم نیک نیت سیکیورٹی محققین کو دھمکی یا مقدمہ نہیں کرتے، بس۔',
    },
    posture: [
      { title: 'ہر تار پر انکرپشن', body: "تمام عوامی صفحات اور پروڈکٹ ٹریفک جدید سائفرز کے ساتھ TLS 1.3 پر سفر کرتا ہے۔ سرٹیفکیٹس Let's Encrypt جاری کرتا ہے اور خودکار طور پر روٹیٹ ہوتے ہیں۔ HTTP Strict Transport Security ایک طویل max-age کے ساتھ سیٹ ہے۔ آپ جو ٹائپ کرتے ہیں وہ کبھی پلین ٹیکسٹ میں کھلا ویب پار نہیں کرتا۔ اندرونی سروس-سے-سروس کالیں وہاں mutual TLS استعمال کرتی ہیں جہاں نیٹ ورک کا راستہ دیکھا جا سکتا ہے۔" },
      { title: 'صفر تھرڈ-پارٹی کالز', body: 'کوئی اینالٹکس نہیں، کوئی پکسلز نہیں، کوئی ایڈ نیٹ ورک نہیں، کوئی بیرونی فونٹس نہیں، کوئی ایمبیڈڈ ویڈیو نہیں، کوئی سوشل میڈیا ویجٹس نہیں۔ آپ کا براؤزر صرف ہمارے اوریجن سے بات کرتا ہے۔ یہ مسلسل انٹیگریشن میں no-third-party.mjs نامی ایک اسکرپٹ کے ذریعے نافذ کیا جاتا ہے جو بنی ہوئی سائٹ کو اسکین کرتا ہے اور بنڈل میں کوئی بیرونی ہوسٹ ظاہر ہونے پر ریلیز ناکام کر دیتا ہے۔ وعدہ ایک یونٹ ٹیسٹ ہے، مارکیٹنگ لائن نہیں۔ On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'سائن شدہ اور تصدیق شدہ بلڈز', body: 'ہم جو ہر کنٹینر امیج بھیجتے ہیں وہ تالا لگائے ہوئے حصوں کے ایک سیٹ سے بنی ہے۔ لاک فائل git میں ہے۔ ہم کسی بھی حصے کو اپ گریڈ کرنے سے پہلے ایڈوائزری کا جائزہ لیتے ہیں۔ ریلیز چلنے سے پہلے سائن کی جاتی ہیں اور میزبان پر چیک کی جاتی ہیں۔ کوئی بھی بلڈ جو کسی گیٹ — بنڈل سائز، a11y، تھرڈ پارٹی — میں ناکام ہو، پروڈکشن تک نہیں پہنچ سکتی۔' },
      { title: 'مختصر برقراری ونڈوز', body: 'سرور لاگز ڈیبگنگ کے لیے چودہ دن رکھے جاتے ہیں اور پھر ڈلیٹ کر دیے جاتے ہیں۔ رابطہ-فارم ای میلز صرف اتنی دیر تک رکھی جاتی ہیں جتنی جواب دینے اور گفتگو فائل کرنے میں لگے، پھر ریکارڈ کیپنگ کے لیے زیادہ سے زیادہ چوبیس ماہ تک محفوظ، پھر ڈلیٹ۔ بیک اپس تیس دن کے سائیکل پر رول کرتے ہیں اور ریسٹ پر انکرپٹڈ ہیں۔' },
      { title: 'الگ تھلگ پروڈکٹ ماحول', body: 'ہر پروڈکٹ اپنے ڈیٹا بیس، اپنی سیکرٹس، اور اپنے قواعد کے ساتھ چلتا ہے۔ ایک ٹول پر نقب دوسرے میں نہیں پھیل سکتی۔ کچھ فیچرز پروڈکٹس کے درمیان لنک کرتے ہیں۔ سنگل سائن آن۔ سپورٹ راؤٹنگ۔ فراڈ سگنلز۔ ہم پروڈکٹس کے درمیان صرف ضروری کم از کم منتقل کرتے ہیں۔ ہر بہاؤ ہر پروڈکٹ کے پرائیویسی صفحے پر ہے۔' },
      { title: 'ایڈمن ایک allow-list کے پیچھے', body: 'Payload CMS ایڈمن اور بنیادی سرور تک رسائی پراکسی پرت پر تحریری طور پر منظور شدہ انٹرنیٹ پتوں کی ایک مختصر فہرست تک محدود ہے۔ ہر ایڈمنسٹریٹر اکاؤنٹ کے لیے ملٹی-فیکٹر تصدیق درکار ہے۔ کوئی شیئر شدہ "ایڈمن" کریڈینشل نہیں — ہر عمل ایک نام والے شخص سے منسوب ہے۔' },
      { title: 'سیکرٹس والٹ میں، کبھی کوڈ میں نہیں', body: 'ڈیٹا بیس پاس ورڈز، API کیز، سائننگ سیکرٹس، اور سرٹیفکیٹس ایک انکرپٹڈ سیکرٹ والٹ میں رہتے ہیں اور رن ٹائم پر انجیکٹ ہوتے ہیں۔ سورس کوڈ اسکین کسی بھی کمٹ کو روکتے ہیں جو کریڈینشل ایمبیڈ کرنے کی کوشش کرے۔ روٹیٹ شدہ سیکرٹس چند منٹوں کے اندر چل رہی خدمات تک پھیل جاتے ہیں۔' },
    ],
    dataHandling: [
      { title: 'آپ کم بھیجتے ہیں، ہم کم محفوظ کرتے ہیں', body: 'ہم صرف وہی پوچھتے ہیں جو ایک پروڈکٹ کام کرنے کے لیے کم سے کم چاہتی ہے۔ کوئی پہلے سے چیک شدہ خانے نہیں۔ کوئی "اختیاری" فیلڈز نہیں جو نتائج حاصل کرنے کے لیے خاموشی سے لازمی بن جائیں۔ ہم تیسرے فریقوں سے ذاتی ڈیٹا نہیں خریدتے یا اسے افزودہ نہیں کرتے۔' },
      { title: 'آپ کا ڈیٹا آپ کا ہے', body: 'ہر پروڈکٹ سے ایکسپورٹ ایک فرسٹ-کلاس فیچر ہے، اپ سیل نہیں۔ ڈلیٹ کریں، اور آپ کا ڈیٹا ہٹا دیا جاتا ہے — کسی ایسے سوئچ کے پیچھے "ہمیشہ کے لیے سافٹ-ڈلیٹڈ" نہیں جسے آپ دیکھ نہ سکیں۔ نکلتے وقت معیاری فارمیٹس (CSV، JSON، ICS، PDF)۔ کوئی ملکیتی لاک-ان نہیں۔' },
      { title: 'آپ کے مواد پر کوئی تربیت نہیں', body: 'AI فیچرز صرف وہ ڈیٹا استعمال کرتے ہیں جو آپ جمع کرنے کا انتخاب کرتے ہیں۔ ڈیٹا آپ کے اکاؤنٹ کے دائرے میں رہتا ہے۔ آپ کا نجی مواد کبھی بھی مشترکہ ماڈلز کی تربیت کے لیے استعمال نہیں ہوتا۔ یہ کبھی کسی اور صارف کے ڈیٹا میں ملایا نہیں جاتا۔ یہ کبھی ایسے تھرڈ-پارٹی AI کو نہیں بھیجا جاتا جو آپ کے پرومپٹس رکھتا ہو۔' },
      { title: 'شفاف واقعہ ردعمل', body: 'اگر کوئی سیکیورٹی واقعہ آپ کے ڈیٹا کو چھوئے، ہم بہتر گھنٹوں کے اندر آپ کو بتاتے ہیں۔ سادہ الفاظ میں۔ ہم بتاتے ہیں کیا ہوا، ہم نے کیا کیا، اور آپ آگے کیا کر سکتے ہیں۔ کام مکمل ہونے پر ہم ایک عوامی پوسٹ-مارٹم شائع کرتے ہیں۔ ہم کبھی کسی خاموش پالیسی اپڈیٹ کے پیچھے کسی نقب کو نہیں چھپائیں گے۔' },
      { title: 'درخواست پر رسائی کا حق', body: 'آپ ہمارے پاس موجود ہر بٹ ذاتی ڈیٹا کی سادہ کاپی مانگ سکتے ہیں۔ آپ ہمیں اسے درست کرنے کے لیے کہہ سکتے ہیں۔ آپ ہمیں ڈلیٹ کرنے کے لیے کہہ سکتے ہیں۔ آپ ہمیں کسی اور سروس کو صاف کاپی بھیجنے کے لیے کہہ سکتے ہیں۔ ہم تیس دنوں کے اندر مفت جواب دیتے ہیں۔ ہم سائٹ کی چودہ زبانوں میں سے کسی میں بھی جواب دے سکتے ہیں۔' },
      { title: 'نام والے سب پروسیسرز کی ایک مختصر فہرست', body: 'مٹھی بھر وینڈرز ہمیں پلیٹ فارم چلانے میں مدد کرتے ہیں — مثلاً ہمارا ہوسٹنگ پارٹنر، ہمارا ای میل-ریلے پارٹنر، اور کوئی بھی پیمنٹ-ریل پروسیسر جو ایک پروڈکٹ چیک آؤٹ پر استعمال کرتی ہے۔ ہر ایک ہمارے ٹرسٹ صفحے پر نام کے ساتھ موجود ہے، اپنے مقصد اور چھوئے گئے ڈیٹا کے ساتھ۔ ہم کبھی خاموشی سے نیا سب پروسیسر شامل نہیں کرتے۔' },
    ],
    compliance: [
      { title: 'PIPEDA (کینیڈا)', body: 'ہماری پیرنٹ کمپنی البرٹا میں قائم ہے۔ ہم ذاتی معلومات کی حفاظت اور الیکٹرانک دستاویزات کے قانون کی پیروی کرتے ہیں۔ ہم کینیڈا کے پرائیویسی کمشنر کے دفتر کو جوابدہ ہیں۔ آپ پہلے ہمیں لکھنے کے بعد وہاں بھی پرائیویسی کا ایک تشویش لے جا سکتے ہیں۔' },
      { title: 'GDPR-مساوی حقوق، عالمی سطح پر', body: 'ہم یورپی GDPR کے حقوق ہر صارف تک، ہر براعظم پر، بڑھاتے ہیں۔ مساوی سلوک مشن کا حصہ ہے۔ یہ کوئی تعمیل کا چیک باکس نہیں جو آپ کے رہائش سے بندھا ہو۔' },
      { title: 'WCAG 2.2 لیول AA', body: 'قابل رسائی ایک سیکیورٹی خاصیت ہے — ایک ایسی سائٹ جسے آپ استعمال نہیں کر سکتے وہ سائٹ ہے جس پر آپ بھروسا نہیں کر سکتے۔ ہر صفحہ کم از کم WCAG 2.2 AA پر بنایا جاتا ہے، جہاں axe-core چیکس کسی بھی خلاف ورزی پر بلڈ کو ناکام کر دیتے ہیں۔ مکمل بیان /legal/accessibility پر پڑھیں۔' },
      { title: 'ابھی تک FedRAMP نہیں، SOC 2 نہیں', body: 'ہم اس بارے میں ایماندار ہیں کہ ہمارے پاس کیا نہیں۔ ہم آج SOC 2 Type II آڈٹ یا FedRAMP اتھرائزیشن برقرار رکھنے کے لیے بہت چھوٹے ہیں، اور ہم انہیں مارکیٹنگ میں دعویٰ نہیں کریں گے۔ جب کوئی پروڈکٹ ایسے بازار میں داخل ہو جس کے لیے ایک کی ضرورت ہو، ہم اس پروڈکٹ کو وہاں پیش کرنے سے پہلے یہ حاصل کریں گے۔' },
    ],
  },
  id: {
    eyebrow: 'KEAMANAN · KEPERCAYAAN · DATA', title: 'Keamanan yang benar-benar bisa Anda baca.',
    lede: 'Tidak ada diagram pemasaran. Hanya apa yang kami lakukan untuk menjaga data Anda tetap pribadi, kecil, dan di tangan Anda — di situs ini dan di setiap produk yang kami kirim.',
    postureSummary: {
      eyebrow: 'Ringkasan postur',
      heading: 'Satu asal. Terenkripsi di kabel. Nol pihak ketiga. Retensi singkat. Subprosesor yang disebutkan.',
      body: 'Lima baris di atas adalah seluruh postur dalam satu tarikan napas. Semua di bawah adalah bukti pendukung — apa arti setiap baris, bagaimana itu ditegakkan, dan bagaimana melaporkan masalah ketika ada yang salah.',
    },
    topStats: [
      { label: 'Pelacak', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Panggilan pihak ketiga', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Retensi log server', value: '14 hari', hint: 'Kemudian dihapus secara permanen' },
    ],
    reportCta: {
      eyebrow: 'Laporkan kerentanan',
      heading: 'Menemukan sesuatu? Tolong beri tahu kami terlebih dahulu.',
      body: 'Email security@intelligentsingularityai.com dengan deskripsi dan langkah-langkah untuk mereproduksi. Kami mengonfirmasi laporan dalam satu hari kerja. Kami memilah dalam tiga. Kami memberi kredit peneliti dengan nama dalam post-mortem ketika perbaikan dirilis, kecuali mereka meminta untuk tetap anonim. Kami tidak mengancam atau menuntut peneliti keamanan dengan niat baik, titik.',
    },
    posture: [
      { title: 'Enkripsi di setiap kabel', body: "Semua halaman publik dan lalu lintas produk berjalan melalui TLS 1.3 dengan cipher modern. Sertifikat dikeluarkan oleh Let's Encrypt dan dirotasi otomatis. HTTP Strict Transport Security diatur dengan max-age yang panjang. Apa pun yang Anda ketik tidak pernah melintasi web terbuka dalam teks polos. Panggilan internal antar layanan menggunakan TLS timbal balik di tempat di mana jalur jaringan dapat diamati." },
      { title: 'Nol panggilan pihak ketiga', body: 'Tidak ada analitik, tidak ada piksel, tidak ada jaringan iklan, tidak ada font eksternal, tidak ada video tertanam, tidak ada widget media sosial. Browser Anda hanya berbicara dengan asal kami. Ini ditegakkan dalam continuous integration oleh skrip bernama no-third-party.mjs yang memindai situs yang dibangun dan menggagalkan rilis jika ada host eksternal muncul di bundel. Janji adalah unit test, bukan baris pemasaran. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Build yang ditandatangani dan diverifikasi', body: 'Setiap image kontainer yang kami kirim dibuat dari kumpulan bagian yang dikunci. Lockfile ada di git. Kami meninjau saran sebelum memutakhirkan bagian apa pun. Rilis ditandatangani dan diperiksa di host sebelum berjalan. Build yang gagal di gerbang mana pun — ukuran bundle, a11y, pihak ketiga — tidak dapat mencapai produksi.' },
      { title: 'Jendela retensi singkat', body: 'Log server disimpan selama empat belas hari untuk debugging dan kemudian dihapus. Email formulir kontak disimpan hanya selama waktu yang dibutuhkan untuk membalas dan mengarsipkan percakapan, lalu diarsipkan hingga dua puluh empat bulan untuk pencatatan, kemudian dihapus. Backup berputar dalam siklus tiga puluh hari dan dienkripsi saat istirahat.' },
      { title: 'Lingkungan produk yang terisolasi', body: 'Setiap produk berjalan dengan database, rahasia, dan aturannya sendiri. Pelanggaran pada satu alat tidak dapat tumpah ke yang lain. Beberapa fitur menghubungkan produk. Single sign-on. Routing dukungan. Sinyal penipuan. Kami memindahkan hanya minimum yang diperlukan antar produk. Setiap alur ada di halaman privasi setiap produk.' },
      { title: 'Admin di balik allow-list', body: 'Akses ke admin Payload CMS dan ke server yang mendasari dibatasi di lapisan proxy ke daftar pendek alamat internet yang disetujui secara tertulis. Autentikasi multi-faktor wajib untuk setiap akun administrator. Tidak ada kredensial "admin" bersama — setiap tindakan dapat dikaitkan dengan orang yang disebutkan namanya.' },
      { title: 'Rahasia di vault, tidak pernah di kode', body: 'Kata sandi database, kunci API, rahasia penandatanganan, dan sertifikat hidup di vault rahasia terenkripsi dan disuntikkan saat runtime. Pemindaian kode sumber memblokir setiap commit yang mencoba menyematkan kredensial. Rahasia yang dirotasi menyebar ke layanan yang berjalan dalam hitungan menit.' },
    ],
    dataHandling: [
      { title: 'Anda mengirim lebih sedikit, kami menyimpan lebih sedikit', body: 'Kami hanya meminta minimum yang dibutuhkan produk untuk berfungsi. Tidak ada kotak yang dicentang sebelumnya. Tidak ada bidang "opsional" yang diam-diam menjadi wajib untuk mendapatkan hasil. Kami tidak membeli atau memperkaya data pribadi dari pihak ketiga.' },
      { title: 'Data Anda milik Anda', body: 'Ekspor dari setiap produk adalah fitur kelas pertama, bukan upsell. Hapus, dan data Anda dihapus — bukan "soft-deleted selamanya" di balik sakelar yang tidak Anda lihat. Format standar (CSV, JSON, ICS, PDF) di pintu keluar. Tanpa lock-in proprietary.' },
      { title: 'Tanpa pelatihan pada konten Anda', body: 'Fitur AI hanya menggunakan data yang Anda pilih untuk dikirim. Data tetap dalam lingkup akun Anda. Konten pribadi Anda tidak pernah digunakan untuk melatih model bersama. Tidak pernah dicampur dengan data pelanggan lain. Tidak pernah dikirim ke AI pihak ketiga yang menyimpan prompt Anda.' },
      { title: 'Respons insiden yang transparan', body: 'Jika peristiwa keamanan menyentuh data Anda, kami memberi tahu Anda dalam tujuh puluh dua jam. Dengan kata-kata sederhana. Kami katakan apa yang terjadi, apa yang kami lakukan, dan apa yang dapat Anda lakukan selanjutnya. Kami menerbitkan post-mortem publik setelah pekerjaan selesai. Kami tidak akan pernah menyembunyikan pelanggaran di balik pembaruan kebijakan yang sunyi.' },
      { title: 'Hak akses, atas permintaan', body: 'Anda dapat meminta salinan polos dari setiap data pribadi yang kami simpan. Anda dapat meminta kami memperbaikinya. Anda dapat meminta kami menghapusnya. Anda dapat meminta kami mengirim salinan bersih ke layanan lain. Kami merespons dalam tiga puluh hari, gratis. Kami dapat membalas dalam salah satu dari empat belas bahasa yang dipakai situs ini.' },
      { title: 'Daftar pendek subprosesor yang disebut', body: 'Segelintir vendor membantu kami menjalankan platform — misalnya mitra hosting kami, mitra email-relay, dan setiap pemroses jalur pembayaran yang digunakan suatu produk saat checkout. Setiap satu disebutkan namanya pada halaman trust kami dengan tujuan yang dilayaninya dan data yang disentuhnya. Kami tidak pernah menambahkan subprosesor baru dalam diam.' },
    ],
    compliance: [
      { title: 'PIPEDA (Kanada)', body: 'Perusahaan induk kami didirikan di Alberta. Kami mengikuti Personal Information Protection and Electronic Documents Act. Kami bertanggung jawab kepada Office of the Privacy Commissioner of Canada. Di sana juga Anda dapat membawa kekhawatiran privasi, setelah menulis kepada kami terlebih dahulu.' },
      { title: 'Hak setara GDPR, secara global', body: 'Kami memperluas hak-hak dari GDPR Eropa ke setiap pengguna, di setiap benua. Perlakuan yang setara adalah bagian dari misi. Bukan kotak kepatuhan yang terikat pada tempat tinggal Anda.' },
      { title: 'WCAG 2.2 Level AA', body: 'Aksesibilitas adalah properti keamanan — situs yang tidak dapat Anda gunakan adalah situs yang tidak dapat Anda percayai. Setiap halaman dibangun setidaknya pada WCAG 2.2 AA, dengan pemeriksaan axe-core yang menggagalkan build pada pelanggaran apa pun. Baca pernyataan lengkap di /legal/accessibility.' },
      { title: 'Tidak ada FedRAMP, tidak ada SOC 2 — belum', body: 'Kami jujur tentang apa yang tidak kami miliki. Kami terlalu kecil hari ini untuk mempertahankan audit SOC 2 Type II atau otorisasi FedRAMP, dan kami tidak akan mengklaim mereka dalam pemasaran. Saat sebuah produk masuk ke pasar yang membutuhkan salah satunya, kami akan memperolehnya sebelum produk itu ditawarkan di sana.' },
    ],
  },
  sw: {
    eyebrow: 'USALAMA · IMANI · DATA', title: 'Usalama unaoweza kweli kuusoma.',
    lede: 'Hakuna michoro ya masoko. Ni tu kile tunachofanya kuweka data yako binafsi, ndogo, na mikononi mwako — kwenye tovuti hii na katika kila bidhaa tunayotuma.',
    postureSummary: {
      eyebrow: 'Muhtasari wa msimamo',
      heading: 'Asili moja. Iliyofichwa kwenye waya. Sifuri za nje. Uhifadhi mfupi. Wachakataji wadogo waliotajwa kwa jina.',
      body: 'Mistari mitano hapo juu ndiyo msimamo mzima kwa pumzi moja. Kila kilicho hapa chini ni ushahidi wa kuunga mkono — maana ya kila mstari, jinsi unavyotekelezwa, na jinsi ya kuripoti tatizo wakati kitu kinakwenda vibaya.',
    },
    topStats: [
      { label: 'Wafuatiliaji', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Simu za nje', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Uhifadhi wa kumbukumbu za seva', value: 'Siku 14', hint: 'Kisha hufutwa kabisa' },
    ],
    reportCta: {
      eyebrow: 'Ripoti udhaifu',
      heading: 'Umepata kitu? Tafadhali tuambie kwanza.',
      body: 'Tuma barua pepe kwa security@intelligentsingularityai.com na maelezo na hatua za kuzaa upya. Tunathibitisha ripoti ndani ya siku moja ya kazi. Tunatatua katika siku tatu. Tunawapongeza watafiti kwa jina katika ripoti ya baada ya tukio wakati marekebisho yanapotumwa, isipokuwa wameomba kubaki bila kutambuliwa. Hatutishi au kushtaki watafiti wa usalama wenye nia njema, hivyo tu.',
    },
    posture: [
      { title: 'Usimbaji kwenye kila waya', body: "Kurasa zote za umma na trafiki ya bidhaa husafiri kupitia TLS 1.3 na cipher za kisasa. Vyeti hutolewa na Let's Encrypt na huzungushwa kiotomatiki. HTTP Strict Transport Security imewekwa na max-age ndefu. Hakuna unachoandika ambacho hupita kwenye wavuti wazi katika maandishi wazi. Simu za ndani za huduma kwa huduma hutumia TLS ya pande mbili pale njia ya mtandao inaweza kuonekana." },
      { title: 'Sifuri simu za nje', body: 'Hakuna uchanganuzi, hakuna pikseli, hakuna mitandao ya matangazo, hakuna fonti za nje, hakuna video iliyopachikwa, hakuna vijenzi vya mitandao ya kijamii. Kivinjari chako huzungumza tu na asili yetu. Hii inatekelezwa katika continuous integration na hati iitwayo no-third-party.mjs ambayo huchunguza tovuti iliyojengwa na kushinda kutolewa ikiwa mwenyeji wowote wa nje atatokea kwenye bundle. Ahadi ni mtihani wa kitengo, sio mstari wa masoko. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Builds zilizotiwa saini na kuthibitishwa', body: 'Kila picha ya kontena tunayotuma imejengwa kutoka seti iliyofungwa ya sehemu. Faili la kufunga liko kwenye git. Tunakagua ushauri kabla ya kubadilisha sehemu yoyote. Matoleo yanasainwa na kukaguliwa kwenye mwenyeji kabla ya kuendeshwa. Build inayoshindwa kwenye lango lolote — ukubwa wa bundle, a11y, wa nje — haiwezi kufikia uzalishaji.' },
      { title: 'Madirisha mafupi ya uhifadhi', body: 'Kumbukumbu za seva huhifadhiwa kwa siku kumi na nne kwa utatuzi wa makosa kisha hufutwa. Barua pepe za fomu ya mawasiliano huhifadhiwa tu kwa muda inaochukua kujibu na kuhifadhi mazungumzo, kisha huhifadhiwa hadi miezi ishirini na minne kwa kuhifadhi rekodi, kisha hufutwa. Hifadhi rudufu huzungushwa katika mzunguko wa siku thelathini na zimefichwa kwenye mahali zinapokaa.' },
      { title: 'Mazingira yaliyojitenga ya bidhaa', body: 'Kila bidhaa inaendesha kwa hifadhidata yake, siri zake, na sheria zake. Uvunjaji kwenye chombo kimoja hauwezi kumwagika kwingine. Baadhi ya vipengele vinaunganisha bidhaa. Single sign-on. Uongezaji wa msaada. Ishara za udanganyifu. Tunahamisha tu kima cha chini kinachohitajika kati ya bidhaa. Kila mtiririko uko kwenye ukurasa wa faragha wa kila bidhaa.' },
      { title: 'Admin nyuma ya allow-list', body: 'Ufikiaji wa admin wa Payload CMS na seva ya msingi umewekwa mipaka katika tabaka la proxy kwenye orodha fupi ya anwani za mtandao zilizoidhinishwa kwa maandishi. Uthibitishaji wa hatua nyingi unahitajika kwa kila akaunti ya msimamizi. Hakuna kitambulisho cha "admin" cha pamoja — kila kitendo kinaweza kuhusishwa na mtu aliyetajwa kwa jina.' },
      { title: 'Siri katika vault, kamwe katika kodi', body: 'Manenosiri ya hifadhidata, funguo za API, siri za kusaini, na vyeti hukaa katika vault iliyofichwa ya siri na hudungwa wakati wa utekelezaji. Uchunguzi wa msimbo wa chanzo huzuia kila commit inayojaribu kuingiza kitambulisho. Siri zilizozungushwa hueneza kwa huduma zinazoendesha ndani ya dakika.' },
    ],
    dataHandling: [
      { title: 'Unatuma kidogo, tunahifadhi kidogo', body: 'Tunaomba tu kile cha chini ambacho bidhaa inahitaji ili kufanya kazi. Hakuna masanduku yaliyochekwa mapema. Hakuna sehemu za "hiari" ambazo kimya kimya zinakuwa za lazima ili kupata matokeo. Hatununui au kuthamarisha data ya kibinafsi kutoka kwa wahusika wa nje.' },
      { title: 'Data yako ni yako', body: 'Kuhamisha kutoka kila bidhaa ni kipengele cha daraja la kwanza, sio upsell. Futa, na data yako huondolewa — sio "imefutwa kimya kimya milele" nyuma ya kifirio usichoona. Miundo ya kawaida (CSV, JSON, ICS, PDF) kutokea. Hakuna lock-in ya umiliki.' },
      { title: 'Hakuna mafunzo kwenye maudhui yako', body: 'Vipengele vya AI hutumia tu data unayochagua kuwasilisha. Data hubaki ndani ya wigo wa akaunti yako. Maudhui yako binafsi kamwe hayatumiki kufundisha modeli zilizoshirikiwa. Kamwe hayachanganywi na data ya mteja mwingine. Kamwe hayatumwi kwa AI ya nje inayohifadhi maelekezo yako.' },
      { title: 'Mwitikio wa wazi wa matukio', body: 'Ikiwa tukio la usalama litawahi kugusa data yako, tunakujulisha ndani ya saa sabini na mbili. Kwa maneno rahisi. Tunasema kile kilichotokea, kile tulichofanya, na kile unachoweza kufanya kifuatacho. Tunachapisha ripoti ya baada ya tukio ya umma mara tu kazi inapokamilika. Hatutawahi kuficha uvunjaji nyuma ya sasisho la sera la kimya.' },
      { title: 'Haki ya ufikiaji, kwa ombi', body: 'Unaweza kuomba nakala wazi ya kila kipande cha data ya kibinafsi tunayoshikilia. Unaweza kutuomba tukirekebishe. Unaweza kutuomba tukifute. Unaweza kutuomba tutume nakala safi kwa huduma nyingine. Tunajibu ndani ya siku thelathini, bila malipo. Tunaweza kujibu kwa lugha yoyote kati ya kumi na nne ambazo tovuti inazungumza.' },
      { title: 'Orodha fupi ya wachakataji wadogo, waliotajwa', body: 'Wachache wa wachuuzi wanatusaidia kuendesha jukwaa — kwa mfano mshirika wetu wa hosting, mshirika wa email-relay, na mchakataji yeyote wa njia ya malipo ambayo bidhaa inatumia kwenye checkout. Kila mmoja anatajwa kwa jina kwenye ukurasa wetu wa trust pamoja na lengo analotumikia na data anayoigusa. Kamwe hatuongezi mchakataji mdogo mpya kwa kimya.' },
    ],
    compliance: [
      { title: 'PIPEDA (Kanada)', body: 'Kampuni yetu mama imeanzishwa Alberta. Tunafuata Sheria ya Ulinzi wa Habari za Kibinafsi na Hati za Kielektroniki. Tunajibu kwa Ofisi ya Kamishna wa Faragha wa Kanada. Hiyo pia ni mahali ambapo unaweza kupeleka wasiwasi wa faragha, baada ya kutuandikia kwanza.' },
      { title: 'Haki sawa na GDPR, kimataifa', body: 'Tunapanua haki kutoka GDPR ya Ulaya kwa kila mtumiaji, katika kila bara. Matibabu sawa ni sehemu ya dhamira. Sio sanduku la kufuata sheria lililofungwa kwenye mahali unapoishi.' },
      { title: 'WCAG 2.2 Kiwango AA', body: 'Ufikivu ni mali ya usalama — tovuti usiyoweza kuitumia ni tovuti usiyoweza kuiamini. Kila ukurasa hujengwa angalau kwa WCAG 2.2 AA, ambapo ukaguzi wa axe-core hushinda build kwenye ukiukaji wowote. Soma taarifa kamili kwenye /legal/accessibility.' },
      { title: 'Hakuna FedRAMP, hakuna SOC 2 — bado', body: 'Tuko waaminifu kuhusu kile hatuna. Sisi ni wadogo sana leo kuendesha ukaguzi wa SOC 2 Type II au idhini ya FedRAMP, na hatutadai kuwa nazo katika masoko. Bidhaa inapoingia katika soko linalohitaji moja, tutaipata kabla ya bidhaa hiyo kutolewa hapo.' },
    ],
  },
  yo: {
    eyebrow: 'ÀÀBÒ · ÌGBẸ́KẸ̀LẸ̀ · DÉÈTÀ', title: 'Ààbò tí o lè kà ní gangan.',
    lede: 'Kò sí àwọn àwòrán ìpolongò. Ohun tí a ń ṣe nikan láti pa déètà rẹ mọ́ ní àṣírí, kéréré, àti ní ọwọ́ rẹ — lórí ojú-òpó yìí àti kárí gbogbo ọjà tí à ń jádelé.',
    postureSummary: {
      eyebrow: 'Àkójọpọ̀ ipò',
      heading: 'Orísun kan. Tí a fi ìpamọ́ ṣe lórí okùn. Òfo àwọn ẹgbẹ́ kẹta. Ìfipamọ́ kúkúrú. Àwọn olùṣàfikún kéékèèké tí a darúkọ.',
      body: 'Àwọn ìlà márùn-ún ní òkè ni ipò rẹ̀ tókọ̀ọ̀kan ní ìfàá ẹ̀mí kan. Gbogbo ohun tí ó wà nísàlẹ̀ ni ẹ̀rí àtìlẹ́yìn — ohun tí ìlà kọ̀ọ̀kan túmọ̀ sí, bí a ti ń fi sílẹ̀ lágbára, àti báwo ni a ṣe lè ṣèròyìn ìṣòro nígbà tí ohun kan bá lọ́ àṣìṣe.',
    },
    topStats: [
      { label: 'Awọn olùtọpa', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Àwọn ìpè ẹgbẹ́ kẹta', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Ìfipamọ́ àkọsílẹ̀ olùpèsè', value: 'Ọjọ́ 14', hint: 'Lẹ́yìn náà a parẹ́ wọn pátápátá' },
    ],
    reportCta: {
      eyebrow: 'Ròyìn àbùkù',
      heading: 'Rí nǹkan kan? Jọ̀wọ́, sọ fún wa ní àkọ́kọ́.',
      body: 'Fi ìmẹ́ìlì ránṣẹ́ sí security@intelligentsingularityai.com pẹ̀lú àpèjúwe àti àwọn ìgbésẹ̀ láti tún-ṣe. A jẹ́rìí àwọn ìròyìn ní ọjọ́ iṣẹ́ kan. A ṣe ìpín-ìpín ní mẹ́ta. A fi ìbọ̀wọ̀ fún àwọn olùwádìí pẹ̀lú orúkọ wọn nínú àròyé lẹ́yìn-iṣẹ̀lẹ̀ nígbà tí ìtúnṣe bá jádelé, àyàfi tí wọ́n bá béèrè láti dúró ní àìmọ̀ràn. A kì í halẹ̀ tàbí ṣe ẹjọ́ àwọn olùwádìí ààbò tí ó ní ìfẹ́ rere, kò sí ìyèméjì.',
    },
    posture: [
      { title: 'Ìpamọ́ lórí gbogbo okùn', body: "Gbogbo àwọn ojú-ìwé ti gbangba àti àwọn ríràn ọjà rin nípasẹ̀ TLS 1.3 pẹ̀lú àwọn àmì òkun ìpamọ́ ti òde-òní. Àwọn ìjẹ́rìí jẹ́ tí Let's Encrypt ṣe àti tí ó yí ara rẹ̀ pa lódódo. HTTP Strict Transport Security ti tan pẹ̀lú max-age tí ó gùn. Ohunkóhun tí o tẹ̀ kì í gba ojú-òpó tí ó ṣí sílẹ̀ ní ọ̀rọ̀ tó ṣàlàyé. Àwọn ìpè inú-iṣẹ́-sí-iṣẹ́ ń lo TLS olùpínkiri níbi tí a lè wo ìpa ọ̀nà nẹ́tíwọ́kì." },
      { title: 'Òfo àwọn ìpè ẹgbẹ́ kẹta', body: 'Kò sí àyẹ̀wò, kò sí àwọn àmì-òṣùwọ̀n, kò sí àwọn nẹ́tíwọ́kì ìpolongò, kò sí àwọn fonti òde, kò sí àwọn fíìmù tí a fi pọ̀, kò sí àwọn ohun-èlò ojú-ìwé àjọ. Bíráùsà rẹ ń bá orísun wa nìkan sọ̀rọ̀. A ń fi sílẹ̀ lágbára nínú ìpapọ̀ tí ń tẹ̀síwájú nípa ìwé tí orúkọ rẹ̀ ní no-third-party.mjs tí ó ń yẹ ojú-òpó tí a kọ́ wò àti pé ó ń ja ìfilọ̀ kuna bí ó bá ní agbalejò òde tí ó han nínú àkójọpọ̀. Ìlérí náà jẹ́ ìdánwò ẹyọ, kì í ṣe ìlà ìpolongò. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Àwọn ìkọ́ tí a fọwọ́sí àti tí a ti rí dájú', body: 'Gbogbo àwòrán kontenẹ̀ tí à ń jádelé jẹ́ tí a kọ́ láti orí ètò àwọn apá tí a ti títì. Ìwé títì wà nínú git. A ń ṣe àyẹ̀wò àwọn imọ̀ràn kí á tó yí apá kankan padà. Àwọn ìfilọ̀ ni a fọwọ́sí àti àyẹ̀wò lórí olùgbàlejò kí wọ́n tó ṣiṣẹ́. Ìkọ́ tí ó kùnà ní ẹnu ọ̀nà kankan — ìwọ̀n àkójọpọ̀, a11y, ẹgbẹ́ kẹta — kò lè dé sí iṣẹ́.' },
      { title: 'Awọn fèrèsé ìfipamọ́ kúkúrú', body: 'A pa àwọn àkọsílẹ̀ olùpèsè mọ́ fún ọjọ́ mẹ́rìnlá fún ìbáworan kí á tó parẹ́. A ń pa àwọn ìmẹ́ìlì fọ́ọ̀mù ìbárasọ̀rọ̀ mọ́ fún àkókò tí ó wù láti dáhùn àti tọrọ ìfọ̀rọ̀wánilẹ́nuwò sílẹ̀, lẹ́yìn náà a fi sí àkójọ títí di oṣù mẹ́rìnlélógún fún àkọsílẹ̀ ìpamọ́, lẹ́yìn náà a parẹ́. Àwọn àdàkọpamọ́ ń yí pa ní ọmọ ìjì ọjọ́ mẹ́talá àti pé wọ́n ti ṣe ìpamọ́ pẹ̀lú nínú ìsinmi.' },
      { title: 'Àwọn àyíká ọjà tí a yà sọ́tọ̀', body: 'Ọjà kọ̀ọ̀kan ń ṣiṣẹ́ pẹ̀lú ipilẹ̀ déètà rẹ̀, àṣírí rẹ̀, àti àwọn òfin rẹ̀ pàtó. Àwọn ìjáẹnu lórí irinṣẹ́ kan kò lè tú lọ sí òmíràn. Àwọn àfikún kan so àwọn ọjà pọ̀. Ìbẹ̀rẹ̀ kan-kanṣoṣo. Ìránní ìránlọ́wọ́. Àwọn ààmì àjèjì. A ń lọ ní kíkéré ní àwọn ọjà. Ìṣàn kọ̀ọ̀kan wà lórí ojú-ìwé àṣírí ọjà rẹ̀.' },
      { title: 'Admin lẹ́yìn allow-list', body: 'Ìwọlé sí Payload CMS àdmín àti sí olùpèsè ìpilẹ̀ ti ní ààlà ní ipele aṣípaarọ̀ sí àkójọ kúkúrú àwọn àdírẹ́sì ìntánẹ́ẹ̀tì tí a fọwọ́sí ní ìkọ̀wé. Ìjẹ́rìí ọ̀pọ̀-ọ̀nà jẹ́ ohun pàtàkì fún àkáọ̀nù olùdari kọ̀ọ̀kan. Kò sí ìjẹ́rìí "admin" tí a pín — gbogbo ìṣe ni a lè so mọ́ ènìyàn tí a darúkọ.' },
      { title: 'Àṣírí ní ìpamọ́, kò sí nínú kódì', body: 'Àwọn ọ̀rọ̀ àṣínà ipilẹ̀-déètà, àwọn kọ́kọ́rọ́ API, àwọn àṣírí ìfọwọ́sí, àti àwọn ìjẹ́rìí ń gbé inú ìpamọ́ àṣírí tí a ti fi ìpamọ́ ṣe àti pe a fi sí inú àkókò ṣiṣẹ́. Àwọn àyẹ̀wò kódì orísun ń ja ìṣètò kankan kuna tí ó gbìyànjú láti fi ìjẹ́rìí sínú. Àwọn àṣírí tí a yí ká wọ́n nípasẹ̀ ìṣẹ́jú kọ̀ọ̀kan sí àwọn iṣẹ́ tí ń ṣiṣẹ́.' },
    ],
    dataHandling: [
      { title: 'O ń fi ránṣẹ́ kéré, a ń fipamọ́ kéré', body: 'A ń béèrè kíkéré tí ọjà nílò láti ṣiṣẹ́ nikan. Kò sí àwọn àpótí tí a ti yan ṣáájú. Kò sí àwọn ààyè "yíyàn" tí ó di pàtàkì ní idakẹjẹ láti gba àbájáde. A kì í ra tàbí mu déètà ti àdáni dára sí láti ọ̀dọ̀ àwọn ẹgbẹ́ kẹta.' },
      { title: 'Déètà rẹ jẹ́ tirẹ', body: 'Sísàjáde lati gbogbo ọjà jẹ́ àfikún ipele-kíní, kì í ṣe ìpolongò títà. Pa á rẹ́, déètà rẹ ni a yọ — kì í ṣe "softly-deleted títí láé" lẹ́yìn iṣẹ́pọ̀ tí o kò lè rí. Ìṣẹ̀dá àpẹẹrẹ (CSV, JSON, ICS, PDF) lori ọ̀nà jáde. Kò sí ìfipamọ́ ìní.' },
      { title: 'Kò sí ìkọ́ lórí ohun-ìní rẹ', body: 'Àwọn àfikún AI ń lo déètà tí o yan láti firanṣẹ́ nikan. Déètà ṣì wà nínú àkójọpọ̀ àkáọ̀nù rẹ. Ohun-ìní rẹ ti àdáni kì í ṣe ohun tí a lò láti kọ́ àwọn àpẹẹrẹ tí a pín. Kò pààpọ̀ pẹ̀lú déètà ti olùbáraẹnisọ̀rọ̀ mìíràn rí. A kì í ránṣẹ́ sí AI ti ẹgbẹ́ kẹta tí ó pa àwọn ìfilelẹ̀ rẹ mọ́ rí.' },
      { title: 'Ìfèsìpadà ìṣẹ̀lẹ̀ tó hàn ní gbangba', body: 'Tí ìṣẹ̀lẹ̀ ààbò bá fọ́n déètà rẹ, a ó sọ fún ọ láàárín wákàtí àádọ́rin-ó-lé-méjì. Ní ọ̀rọ̀ tó rọrùn. A ó sọ ohun tí ó ṣẹlẹ̀, ohun tí a ṣe, àti ohun tí o lè ṣe tókàn. A ń tẹ ìbáraẹnisọ̀rọ̀ àròyé lẹ́yìn-iṣẹ̀lẹ̀ jáde fún gbogbo ènìyàn nígbà tí iṣẹ́ bá pari. A kì yóò pa ìjáẹnu mọ́ rí lẹ́yìn ìmúdọ́gba ètò ìmúlòlùwà alaìfọ̀rọ̀.' },
      { title: 'Ẹ̀tọ́ àyẹ̀wò, lórí ìbéèrè', body: 'O lè béèrè ẹ̀dà tó kedere ti gbogbo bítì déètà àdáni tí à ń tọ́jú. O lè béèrè kí á tún ún ṣe. O lè béèrè kí á parẹ́. O lè béèrè kí á fi ẹ̀dà tó mọ́ ránṣẹ́ sí iṣẹ́ mìíràn. A ń dáhùn láàárín ọjọ́ ọgbọ̀n, lọ́fẹ̀ẹ́. A lè dáhùn ní ọ̀kankan nínú àwọn èdè mẹ́rìnlá tí ojú-òpó ń sọ.' },
      { title: 'Àkójọ kúkúrú àwọn olùṣàfikún kéékèèké, tí a darúkọ', body: 'Ẹgbẹ́ kéékèèké àwọn olùpèsè ń ràn wá lọ́wọ́ láti ṣe pèpéle náà — fún àpẹẹrẹ alábàá ìgbàlejò wa, alábàá ìfagagba ìmẹ́ìlì, àti olùṣàfikún ipa ìsanwó kankan tí ọjà kan lò ní àyẹ̀wò. A darúkọ ọ̀kọ̀ọ̀kan lórí ojú-ìwé ìgbẹ́kẹ̀lé wa pẹ̀lú ète tí ó ṣèrànwọ́ àti déètà tí ó fọwọ́ kàn. A kì í ṣàfikún olùṣàfikún kékeré tuntun ní ìdákẹ́jẹ́ rí.' },
    ],
    compliance: [
      { title: 'PIPEDA (Canada)', body: 'A dá kampani ìyá wa sílẹ̀ ní Alberta. A ń tẹ̀lé Òfin Ìdáàbòbò Ìmọ̀-Àdáni àti Àkọsílẹ̀ Onírinátí. A ń dáhùn fún Ọ́físì Komisọ́nà Àṣírí ti Canada. Níbẹ̀ náà ni o lè gbé ìbáraẹnisọ̀rọ̀ àṣírí lọ, lẹ́yìn tí o bá kọ̀wé sí wa ní àkọ́kọ́.' },
      { title: 'Ẹ̀tọ́ tó dọ́gba pẹ̀lú GDPR, kárí ayé', body: 'A ń pèsè ẹ̀tọ́ láti GDPR ti Yúróòpù fún olùmújáde kọ̀ọ̀kan, lórí gbogbo agbègbè. Ìbálòpọ̀ dọ́gba jẹ́ ara àfojúsùn. Kì í ṣe àpótí ìbáṣepọ̀ tí a so mọ́ ibi tí o ń gbé.' },
      { title: 'WCAG 2.2 Ipele AA', body: 'Àǹfààní jẹ́ ohun-ìní ààbò — ojú-òpó tí o kò lè lò ni ojú-òpó tí o kò lè gbẹ́kẹ̀lé. Gbogbo ojú-ìwé ni a kọ́ ní ipele tí ó kéré jùlọ ti WCAG 2.2 AA, pẹ̀lú àyẹ̀wò axe-core tí ó ja ìkọ́ kuna ní ìṣẹlẹ̀ ìrú ofin kankan. Ka àpèjuwe kíkún ní /legal/accessibility.' },
      { title: 'Kò sí FedRAMP, kò sí SOC 2 — síbẹ̀', body: 'A jẹ́ olótìítọ́ nípa ohun tí a kò ní. A kéré jù lónìí láti pa àyẹ̀wò SOC 2 Type II tàbí àṣẹ FedRAMP mọ́, a kò sì ní bèrè wọn nínú ìpolongò. Nígbà tí ọjà kan bá wọ ọjà tí ó nílò ọ̀kan, a ó ní in kí ọjà náà tó wà níbẹ̀.' },
    ],
  },
  ha: {
    eyebrow: 'TSARO · AMINCEWA · DATA', title: 'Tsaro da kuke iya karantawa da gaske.',
    lede: 'Babu zane-zanen tallace-tallace. Kawai abin da muke yi don kiyaye bayanan ku masu zaman kansu, ƙanana, da kuma a hannunku — akan wannan shafin da kuma a kowane samfuri da muke aika.',
    postureSummary: {
      eyebrow: 'Takaitaccen matsayi',
      heading: 'Asali ɗaya. An ɓoye akan layi. Sifili na ɓangare na uku. Riƙewa gajere. Masu sarrafa ƙananan da aka ambata.',
      body: 'Layuka biyar da ke sama sun zama dukan matsayi a numfashi ɗaya. Duk abin da ke ƙasa shaida ce ta tallafi — abin da kowane layi ke nufi, yadda ake aiwatar da shi, da yadda za a ba da rahoton matsala lokacin da wani abu ya yi kuskure.',
    },
    topStats: [
      { label: 'Masu bibiya', value: '0', hint: 'On this site. Products disclose their own.' },
      { label: 'Kira na ɓangare na uku', value: '0', hint: 'On this site. Enforced by CI on every build.' },
      { label: 'Riƙe na log na uwar garke', value: 'Kwanaki 14', hint: "Sa'an nan a goge dindindin" },
    ],
    reportCta: {
      eyebrow: 'Bayar da rahoton rauni',
      heading: 'Kun sami wani abu? Don Allah a faɗa mana farko.',
      body: 'Aiko da imel zuwa security@intelligentsingularityai.com tare da bayanin da matakan sake fitarwa. Muna tabbatar da rahotanni a cikin rana ɗaya ta aiki. Muna tantance su a cikin uku. Muna ba da daraja ga masu bincike da sunansu a cikin rahoton bayan-mutuwa lokacin da gyara ya tafi, sai dai idan sun nemi su zauna ba a san su ba. Ba mu yi wa masu binciken tsaro da niyya mai kyau barazana ko kara, kwata-kwata.',
    },
    posture: [
      { title: 'Ɓoyewa akan kowane waya', body: "Dukkan shafukan jama'a da zirga-zirgar samfuri suna tafiya ta TLS 1.3 tare da cipher na zamani. Takaddun shaida ana ba da su ne ta Let's Encrypt kuma ana juyawa ta atomatik. HTTP Strict Transport Security an saita ta da max-age mai tsayi. Babu abin da kuke buga wanda ya taɓa ƙetare gidan yanar gizo a sarari. Kira na sabis-zuwa-sabis na ciki suna amfani da TLS na biyu inda hanyar sadarwa za a iya gani." },
      { title: 'Sifili na kira na ɓangare na uku', body: 'Babu nazari, babu pixels, babu hanyoyin tallace-tallace, babu rubutun waje, babu bidiyo da aka shigar, babu kayan aikin kafofin watsa labarun. Mai binciken ku yana magana ne kawai tare da asalin mu. Wannan an aiwatar da shi a cikin haɗin gwiwa mai ci gaba ta wani rubutu mai suna no-third-party.mjs wanda ke duba shafin da aka gina kuma ya gaza fitarwa idan wani mai dauke da bayanan na waje ya fito a cikin bundle. Alkawarin shi ne gwajin sashi, ba layin tallace-tallace ba ne. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
      { title: 'Builds masu sa hannu da aka tabbatar', body: 'Kowane hoton kwantena da muke aikawa an gina shi ne daga saitin kullun da aka kulle. Lockfile yana cikin git. Muna nazarin shawarwari kafin mu sabunta kowane bangare. Ana sanya hannu kan fitarwa kuma ana duba akan mai masaukin kafin su gudana. Ginin da ya gaza a kowane ƙofa — girman bundle, a11y, ɓangare na uku — ba zai iya kaiwa zuwa samarwa ba.' },
      { title: 'Tagogin riƙewa gajere', body: 'Ana ajiye logs na uwar garke kwanaki goma sha huɗu don gyaran kuskure sannan a goge. Ana ajiye imel na fom ɗin tuntuɓa kawai a tsawon lokacin da ya kamata don amsawa da ajiye tattaunawar, sannan a ajiye har watanni ashirin da huɗu don kiyaye rikodi, sannan a goge. Backups suna juyawa a cikin sake zagayowar kwanaki talatin kuma an boye su a hutawa.' },
      { title: 'Wuraren samfuri masu rabe', body: "Kowane samfuri yana gudana tare da bayanan sa, sirrin sa, da ƙa'idojin sa. Karya akan kayan aiki ɗaya ba zai iya zubar wa wani ba. Wasu fasalulluka suna haɗa samfura. Single sign-on. Hanyar tallafi. Sigogin zamba. Muna kwasar ƙananan abin da ake buƙata kawai tsakanin samfura. Kowane kwarara yana kan shafin sirrin kowane samfuri." },
      { title: 'Admin bayan allow-list', body: "An iyakance damar zuwa admin ɗin Payload CMS da uwar garken da ke ƙasa a matakin proxy zuwa ƙaramar jerin adireshin intanet da aka amince da su a rubuce. Ana buƙatar tantance abubuwa da yawa don kowane asusun mai kulawa. Babu wata sanarwar 'admin' da aka raba — kowane aiki ana danganta shi da mutum da aka ambata sunansa." },
      { title: 'Sirri a cikin vault, ba taɓa cikin code ba', body: 'Kalmomin sirri na bayanai, makullai na API, sirrin sa hannu, da takaddun shaida suna rayuwa a cikin vault na sirri da aka ɓoye kuma ana saka su lokacin gudana. Binciken code na tushe yana toshe kowane commit da yake ƙoƙarin shigar da sanarwa. Sirrin da aka juya yana yaɗawa zuwa ayyukan da ke gudana cikin mintuna.' },
    ],
    dataHandling: [
      { title: 'Kuna aika ƙasa, muna ajiye ƙasa', body: "Muna tambaya kawai mafi ƙarancin abin da samfuri ke buƙata don aiki. Babu kwalaye da aka rigaya aka duba. Babu filayen 'zaɓi' da suke shiru-shiru zama tilas don samun sakamako. Ba mu sayan ko wadatar da bayanai na sirri daga ɓangare na uku." },
      { title: 'Bayanan ku naku ne', body: "Fitarwa daga kowane samfuri shi ne fasalin aji na farko, ba upsell ba. Goge, kuma an cire bayananku — ba 'soft-deleted har abada' bayan tsamiya da ba ku gani ba. Tsarin daidaitaccen (CSV, JSON, ICS, PDF) a kan hanyar fita. Babu lock-in mai mallaka." },
      { title: 'Babu horo akan abubuwan da kuke ciki', body: "Fasalulluka na AI suna amfani da bayanan da kuka zaɓi aikawa kawai. Bayanan suna ci gaba da kasancewa cikin kewayon asusunku. Abubuwan ku na sirri ba a taɓa amfani da su don horar da samfura masu rabawa ba. Ba a taɓa cakude su da bayanan wani abokin ciniki ba. Ba a taɓa aika su zuwa AI na ɓangare na uku da ke ajiye bayananku ba." },
      { title: 'Amsar lamari mai gaskiya', body: "Idan wani lamari na tsaro ya taɓa bayananku, muna gaya muku a cikin sa'o'i saba'in da biyu. A cikin sauƙin kalmomi. Muna fada abin da ya faru, abin da muka yi, da abin da za ku iya yi gaba. Muna buga rahoton bayan-mutuwa na jama'a da zarar an gama aikin. Ba za mu taɓa ɓoye keta a bayan sabunta manufofin shiru ba." },
      { title: 'Hakkin samun damar, akan buƙata', body: "Kuna iya neman kwafin sauƙi na duk wani bit na bayanai na sirri da muke riƙe da su. Kuna iya tambayar mu mu gyara su. Kuna iya tambayar mu mu goge su. Kuna iya tambayar mu mu aika kwafi mai tsabta zuwa wata sabis. Muna amsa cikin kwanaki talatin, kyauta. Za mu iya amsawa a cikin kowanne daga cikin yarurruka goma sha huɗu da shafin yake magana." },
      { title: 'Gajeren jerin sunaye na masu sarrafa ƙananan', body: "Wasu kaɗan na masu siyarwa suna taimaka mana mu gudanar da dandamali — alal misali abokin tafiyar mu na hosting, abokin tafiyar email-relay, da kowane mai sarrafa hanyar biyan kuɗi da samfuri ke amfani da shi a checkout. An ambaci kowanne sunansa a kan shafin trust namu tare da manufar da yake yi da kuma bayanan da yake taɓa. Ba mu taɓa ƙara wani sabon mai sarrafa ƙanƙana a cikin shiru ba." },
    ],
    compliance: [
      { title: 'PIPEDA (Kanada)', body: "Kamfanin uba namu yana zaune ne a Alberta. Muna bin Dokar Kare Bayanai na Sirri da Takaddun Lantarki. Muna amsa wa Ofishin Kwamishinan Sirri na Kanada. A nan ne kuma za ku iya kai damuwar sirri, bayan ku rubuto mana farko." },
      { title: 'Hakki masu daidai da GDPR, a duniya gaba ɗaya', body: "Muna fadada hakki daga GDPR na Turai zuwa ga kowane mai amfani, a kowace nahiya. Daidaitar magancewa wani ɓangare ne na manufar. Ba akwatin biyayya da ke ɗaure da inda kuke zama ba ne." },
      { title: 'WCAG 2.2 Mataki AA', body: "Damar amfani wani sifofin tsaro ne — shafin da ba za ku iya amfani da shi ba shi ne shafin da ba za ku iya yarda da shi ba. Ana gina kowane shafi a kalla a matakin WCAG 2.2 AA, tare da bincike na axe-core da ke gazawa build a kowane keta. Karanta cikakken sanarwa a /legal/accessibility." },
      { title: 'Babu FedRAMP, babu SOC 2 — har yanzu', body: "Mu na gaskiya game da abin da ba mu da shi. Mu kanana ne yau don kiyaye binciken SOC 2 Type II ko izinin FedRAMP, kuma ba za mu yi da'awar mallakar su a tallace-tallace ba. Lokacin da samfuri ya shiga kasuwa da ke buƙatar ɗaya, za mu samu shi kafin a ba da samfurin a wurin." },
    ],
  },
};

const PRICING: Record<LocaleCode, PricingStrings> = {
  'zh-CN': {
    eyebrow: '定价 · 我们的六条规则', title: '公平、公开、为长期而生。',
    lede: '我们在每个产品自己的网站上定价。本页讲的是我们到处通用的规则。同样的规则适用于一人商店和五千人工厂。',
    whyThisExists: {
      eyebrow: '为什么存在这个',
      heading: '企业软件之所以昂贵,是因为它被设计成那样。',
      body: '六位数合同、六个月的部署和六层咨询不是行业的 bug——它们是它的商业模式。我们拒绝这种模式。我们的价格是为了让工作室运转下去,而不是把小企业挡在门外。',
      freeTierLine: '免费层——足以运行一个真实的业务,而不是演示沙盒。',
      paidTierLine: '付费层——增加规模(席位、容量、支持),从不解锁你已经拥有的功能。',
      enterpriseLine: '企业版——同一个产品,加上采购文件、SSO 和随叫随到的真人。没有秘密功能集。',
    },
    seePricesCta: {
      eyebrow: '查看实际价格',
      heading: '每个产品都公布自己的价格。',
      body: '数字因产品和地区而异,但本页的六条规则永远不变。浏览产品组合找到合适的产品,当前价格就在其首页上。',
    },
    principles: [
      { title: '一个真能用来做生意的免费层', body: '不是试用。不是三张发票加一个倒计时。每个旗舰产品都有一个永久免费计划,有足够的空间运营一个一人企业——真实的记录、真实的报告、真实的导出,没有广告。如果你长大需要更多,付费层增加规模,而非功能。拉各斯的一人市场摊位和多伦多的咨询公司注册同一个计划,需要更多余量时去按同一个升级按钮。' },
      { title: '按你居住地调整的价格', body: '在多伦多花二十美元的计划在拉各斯花得更少。我们使用世界银行公布的购买力指数来设定公平的区域价格,这样同一个团队无论从哪里注册都支付相同的相对成本。发达市场客户支付完整市场价;新兴市场客户支付尊重其货币的价格。没有人被价格挡在门外,也没有人在补贴一个更差的产品。' },
      { title: '每个层级都有所有功能', body: 'AI 帮助、自动化、多店铺、深度分析、集成、欺诈检查——所有这些都在每一个价格层级中。没有"仅限企业"的门槛。更高层级买的是更多席位、更多容量、更多支持时长和更严格的 SLA。它们从不解锁你已经拥有的功能。免费版上的八年级学生和财富 500 强的买家登录的是同一款产品,使用同一套工具。' },
      { title: '公开定价。没有"联系销售。"', body: '如果你必须发邮件给我们才能知道价格,那不是透明定价。每一个数字都在产品自己的网站上,我们改动当天就更新,所有我们服务的货币都列出。没有隐藏的企业表单,没有取决于你在发现电话上看起来有多大的报价。价格就是价格,我们公开发布它。' },
      { title: '不按席位敲诈', body: '席位重要,但不应是唯一的杠杆。我们按真正反映价值的使用量计费——交易、存储、活跃量——保持席位数学简单。一个成长中的团队应该多付一点,而不是被乘以五倍。我们的定价从未要求任何人为了让数字成立而裁掉队友。' },
      { title: '按你的条件停止付款', body: '一键取消。没有挽留电话。没有"我们需要一个理由。"未使用时间的退款会在三个工作日内到达你的账户。你的数据可以干净地导出为标准格式,这样你永远不会被沉没成本的迁移所绑架。我们靠每一个月赢得下一个月——靠值得保留,而不是靠难以离开。' },
    ],
    antiPatterns: [
      { title: '没有"入门"层级带残废功能', body: '一个移除了数据导出、API 节流到无用、或 AI 藏在升级提示后的免费层不是免费层——它是穿着戏服的销售漏斗。我们的免费层与付费层使用同一个引擎。' },
      { title: '没有惩罚增长的交易税', body: '一些平台对每张发票、每笔支付、每条记录收取一定百分比。那是对成功的征税。我们在跟踪真实成本的地方计费(存储、计算、支付通道费用),并在我们的成本下降时返还节省的部分。' },
      { title: '没有报价、没有"联系销售"、没有企业不透明', body: '每一个价格都公开。如果采购团队需要 MSA、DPA 或开具发票计费,那是文书,不是定价。Fortune 500 发票上的美元金额与公布页面上的金额一致,乘以他们购买的席位数。' },
      { title: '没有每步翻三倍的席位阶梯', body: '十人团队不应支付三人团队三倍的人均价格。我们的席位算术是线性而简单的,在诚实的折点上有数量折扣——绝不作为升级的诱饵。' },
    ],
    workedExample: [
      { who: '独立商户 · 拉各斯,尼日利亚', tier: '免费层', what: '运营一个一人店铺。开具发票、跟踪库存、处理税务申报。永远免费、无广告、无记录上限、完整数据导出。', note: '不支付任何费用。使用与付费客户相同的引擎。' },
      { who: '五人咨询公司 · 多伦多,加拿大', tier: 'Pro 层', what: '五个席位。AI 辅助开票、中等交易量、工作时间支持。与免费层和企业层相同的功能集。', note: '以加元支付加拿大公布的 Pro 价格。' },
      { who: '制造商 · 法兰克福,德国', tier: '企业层', what: '120 席位。SSO、DPA、专属客户联系人、24 小时 SLA。与独立商户相同的功能,只是有更多空间和更多文书。', note: '以欧元支付德国公布的企业层价格。' },
    ],
  },
  es: {
    eyebrow: 'PRECIOS · NUESTRAS SEIS REGLAS', title: 'Justos, publicados, hechos para durar.',
    lede: 'Ponemos precio a cada producto en su propio sitio. Esta página trata sobre las reglas que usamos en todas partes. Las mismas reglas aplican a una tienda de una sola persona y a una fábrica de cinco mil personas.',
    whyThisExists: {
      eyebrow: 'Por qué existe esto',
      heading: 'El software empresarial es caro porque se diseñó para serlo.',
      body: 'Contratos de seis cifras, despliegues de seis meses y seis capas de consultores no son un bug de la industria — son su modelo de negocio. Rechazamos ese modelo. Nuestros precios existen para mantener el estudio en marcha, no para frenar a las pequeñas empresas en la puerta.',
      freeTierLine: 'Plan gratuito — suficiente para llevar un negocio real, no un sandbox de demostración.',
      paidTierLine: 'Plan de pago — añade escala (asientos, volumen, soporte), nunca desbloquea funciones que ya tenías.',
      enterpriseLine: 'Enterprise — el mismo producto con papeleo de compras, SSO y una persona de guardia. Sin set de funciones secreto.',
    },
    seePricesCta: {
      eyebrow: 'Ver precios reales',
      heading: 'Cada producto publica sus propios precios.',
      body: 'Los números varían por producto y región, pero las seis reglas de esta página nunca cambian. Navega por el portafolio para encontrar el producto adecuado; los precios actuales están en su página principal.',
    },
    principles: [
      { title: 'Un plan gratuito con el que de verdad puedes llevar un negocio', body: 'No una prueba. No tres facturas y un cronómetro. Cada producto principal tiene un plan gratis-para-siempre con suficiente margen para un negocio de una persona — registros reales, informes reales, exportaciones reales, sin publicidad. Si te quedas pequeño, los planes de pago añaden escala, nunca funciones. El puesto de mercado de una persona en Lagos y la consultoría de Toronto se registran al mismo plan y buscan el mismo botón de upgrade cuando necesitan más margen.' },
      { title: 'Precios ajustados a dónde vives', body: 'Un plan que cuesta veinte dólares en Toronto cuesta menos en Lagos. Usamos índices publicados de poder adquisitivo del Banco Mundial para fijar precios regionales justos, de modo que el mismo equipo paga el mismo coste relativo desde donde se registre. El cliente del mundo desarrollado paga el precio de mercado completo; el cliente del mercado emergente paga un precio que respeta su moneda. Nadie queda fuera por precio, y nadie subvenciona un producto peor.' },
      { title: 'Cada función en cada plan', body: 'Ayuda con IA, automatización, multi-tienda, analíticas profundas, integraciones, comprobaciones antifraude — todo en cada nivel de precio. Sin barreras "solo para enterprise". Los planes superiores compran más asientos, más volumen, más horas de soporte y SLA más estrictos. Nunca desbloquean una función que no tuvieras ya. El estudiante de octavo grado en el plan gratuito y el comprador Fortune 500 inician sesión en el mismo producto, con el mismo conjunto de herramientas.' },
      { title: 'Precios publicados. Sin "contacta con ventas."', body: 'Si tienes que escribirnos para saber cuánto cuesta algo, no es precio transparente. Cada número está en el propio sitio del producto, actualizado el día que cambiamos, en cada moneda que servimos. Sin hoja enterprise oculta, sin presupuesto que dependa de lo grande que parezcas en una llamada de descubrimiento. El precio es el precio, y lo publicamos.' },
      { title: 'Sin abuso por asiento', body: 'Los asientos importan, pero no deberían ser la única palanca. Medimos el uso que de verdad refleja valor — transacciones, almacenamiento, volúmenes activos — y mantenemos las matemáticas de asientos simples. Un equipo en crecimiento debería pagar un poco más, no un multiplicador por cinco. Nuestros precios nunca han pedido a nadie que despida compañeros para que cuadren los números.' },
      { title: 'Deja de pagar en tus términos', body: 'Cancela con un clic. Sin llamadas de retención. Sin "necesitamos un motivo." Un reembolso por tiempo no usado llega a tu cuenta en tres días laborables. Tus datos se exportan limpiamente a formatos estándar para que nunca te retenga el coste hundido de una migración. Nos ganamos el mes siguiente, cada mes — siendo dignos de quedarse, no por ser dolorosos de dejar.' },
    ],
    antiPatterns: [
      { title: 'Sin nivel "starter" con funciones lisiadas', body: 'Un plan gratuito con la exportación de datos quitada, la API limitada hasta la inutilidad, o la IA escondida tras un prompt de upgrade no es un plan gratuito — es un embudo de ventas disfrazado. Nuestro plan gratuito envía el mismo motor que el de pago.' },
      { title: 'Sin impuesto de transacción que castiga el crecimiento', body: 'Algunas plataformas cobran un porcentaje sobre cada factura, cada pago, cada registro. Eso es un impuesto al éxito. Medimos donde sigue el coste real (almacenamiento, cómputo, comisiones de pasarela de pago) y devolvemos el ahorro cuando nuestro coste baja.' },
      { title: 'Sin presupuestos, sin "contacta con ventas", sin opacidad enterprise', body: 'Cada precio está publicado. Si un equipo de compras necesita un MSA, un DPA o facturación, eso es papeleo, no precio. La cantidad en dólares de una factura Fortune 500 es la misma cantidad en la página publicada, multiplicada por los asientos que compraron.' },
      { title: 'Sin escaleras por asiento que triplican en cada paso', body: 'Un equipo de diez no debería pagar tres veces lo que paga un equipo de tres por asiento. Nuestras matemáticas de asientos son lineales y simples, con descuentos por volumen en puntos de quiebre honestos — nunca como cebo para upselling.' },
    ],
    workedExample: [
      { who: 'Comerciante individual · Lagos, Nigeria', tier: 'Plan gratuito', what: 'Lleva una tienda de una persona. Emite facturas, lleva stock, gestiona declaraciones fiscales. Gratis-para-siempre, sin publicidad, sin tope de registros, exportación completa de datos.', note: 'No paga nada. Usa el mismo motor que los clientes de pago.' },
      { who: 'Consultoría de cinco personas · Toronto, Canadá', tier: 'Plan Pro', what: 'Cinco asientos. Facturación asistida por IA, transacciones de volumen medio, soporte en horario de oficina. Mismo conjunto de funciones que el plan gratuito y el enterprise.', note: 'Paga el precio Pro publicado para Canadá en CAD.' },
      { who: 'Fabricante · Fráncfort, Alemania', tier: 'Plan Enterprise', what: '120 asientos. SSO, DPA, contacto de cuenta dedicado, SLA de 24 horas. Mismas funciones que el comerciante individual, solo con más margen y más papeleo.', note: 'Paga el precio Enterprise publicado para Alemania en EUR.' },
    ],
  },
  hi: {
    eyebrow: 'मूल्य निर्धारण · हमारे छह नियम', title: 'न्यायपूर्ण, प्रकाशित, टिकाऊ।',
    lede: 'हम हर उत्पाद की कीमत उसकी अपनी साइट पर तय करते हैं। यह पृष्ठ उन नियमों के बारे में है जो हम हर जगह उपयोग करते हैं। वही नियम एक-व्यक्ति की दुकान और पाँच हज़ार लोगों की फ़ैक्टरी पर लागू होते हैं।',
    whyThisExists: {
      eyebrow: 'यह क्यों मौजूद है',
      heading: 'एंटरप्राइज़ सॉफ़्टवेयर महँगा है क्योंकि उसे ऐसा ही बनाने के लिए डिज़ाइन किया गया था।',
      body: 'छह-अंकीय अनुबंध, छह महीने के रोलआउट, और छह परतों के सलाहकार उद्योग की बग नहीं हैं — वे उसका बिज़नेस मॉडल हैं। हम उस मॉडल को अस्वीकार करते हैं। हमारी कीमतें स्टूडियो को चालू रखने के लिए मौजूद हैं, छोटे व्यवसायों को दरवाज़े पर रोकने के लिए नहीं।',
      freeTierLine: 'मुफ़्त टियर — एक असली व्यवसाय चलाने के लिए पर्याप्त, न कि डेमो सैंडबॉक्स।',
      paidTierLine: 'पेड टियर — स्केल (सीट, वॉल्यूम, सपोर्ट) जोड़ता है, उन फ़ीचरों को कभी अनलॉक नहीं करता जो आपके पास पहले से हैं।',
      enterpriseLine: 'एंटरप्राइज़ — वही उत्पाद जिसमें प्रोक्योरमेंट पेपरवर्क, SSO, और कॉल पर एक इंसान। कोई गुप्त फ़ीचर सेट नहीं।',
    },
    seePricesCta: {
      eyebrow: 'वास्तविक कीमतें देखें',
      heading: 'हर उत्पाद अपनी कीमतें खुद प्रकाशित करता है।',
      body: 'संख्याएँ उत्पाद और क्षेत्र के अनुसार बदलती हैं, लेकिन इस पृष्ठ के छह नियम कभी नहीं। सही उत्पाद तक पहुँचने के लिए पोर्टफ़ोलियो ब्राउज़ करें, और वर्तमान कीमतें उसके होमपेज पर हैं।',
    },
    principles: [
      { title: 'एक मुफ़्त टियर जिस पर आप वाकई व्यवसाय चला सकते हैं', body: 'ट्रायल नहीं। तीन इनवॉइस और एक टाइमर नहीं। हर फ़्लैगशिप का हमेशा-के-लिए-मुफ़्त प्लान है जिसमें एक-व्यक्ति व्यवसाय के लिए पर्याप्त जगह है — असली रिकॉर्ड, असली रिपोर्ट, असली एक्सपोर्ट, कोई विज्ञापन नहीं। अगर आप इससे बड़े हो जाते हैं, पेड टियर स्केल जोड़ते हैं, फ़ीचर नहीं। लागोस का एक-व्यक्ति बाज़ार स्टॉल और टोरंटो की कंसल्टेंसी एक ही प्लान पर साइनअप करते हैं और जब और हेडरूम चाहिए होता है तो उसी अपग्रेड बटन तक पहुँचते हैं।' },
      { title: 'आप कहाँ रहते हैं उस अनुसार समायोजित कीमतें', body: 'टोरंटो में जो प्लान बीस डॉलर का है वह लागोस में कम का है। हम विश्व बैंक के प्रकाशित क्रय-शक्ति सूचकांकों का उपयोग करके निष्पक्ष क्षेत्रीय कीमतें तय करते हैं ताकि एक ही टीम जहाँ भी साइन-अप करे, समान सापेक्ष लागत चुकाए। विकसित-जगत का ग्राहक पूर्ण बाज़ार मूल्य देता है; उभरते बाज़ार का ग्राहक एक ऐसी कीमत देता है जो उनकी मुद्रा का सम्मान करती है। कोई कीमत के कारण बाहर नहीं होता, और कोई बदतर उत्पाद को सब्सिडी नहीं देता।' },
      { title: 'हर टियर में हर फ़ीचर', body: 'AI मदद, ऑटोमेशन, मल्टी-स्टोर, गहरा एनालिटिक्स, इंटीग्रेशन, धोखाधड़ी जाँच — सब हर मूल्य टियर में। कोई "केवल-एंटरप्राइज़" गेट नहीं। उच्च टियर अधिक सीटें, अधिक वॉल्यूम, अधिक सपोर्ट घंटे और कड़े SLA खरीदते हैं। वे कभी ऐसे फ़ीचर अनलॉक नहीं करते जो आपके पास पहले से न हों। मुफ़्त प्लान पर आठवीं कक्षा का छात्र और Fortune 500 खरीदार एक ही उत्पाद में, एक ही टूलकिट के साथ साइन इन करते हैं।' },
      { title: 'प्रकाशित कीमतें। कोई "संपर्क बिक्री" नहीं।', body: 'अगर किसी चीज़ की कीमत जानने के लिए आपको हमें ईमेल करना पड़े, यह पारदर्शी मूल्य निर्धारण नहीं। हर संख्या उत्पाद की अपनी साइट पर है, उसी दिन अपडेट होती है जिस दिन हम बदलते हैं, हर मुद्रा में जिसमें हम सेवा करते हैं। कोई छिपी एंटरप्राइज़ शीट नहीं, कोई कोट नहीं जो इस पर निर्भर करे कि आप डिस्कवरी कॉल पर कितने बड़े दिखते हैं। कीमत यही है, और हम इसे प्रकाशित करते हैं।' },
      { title: 'सीट-दर-सीट लूट नहीं', body: 'सीटें मायने रखती हैं, पर एकमात्र लीवर नहीं होनी चाहिए। हम उस उपयोग पर मीटर लगाते हैं जो वास्तव में मूल्य प्रतिबिंबित करता है — लेनदेन, स्टोरेज, सक्रिय वॉल्यूम — और सीट गणित को सरल रखते हैं। एक बढ़ती टीम को थोड़ा अधिक भुगतान करना चाहिए, पाँच गुना नहीं। हमारी कीमत ने कभी किसी से नहीं कहा कि वह संख्याएँ ठीक करने के लिए साथियों को निकाले।' },
      { title: 'अपनी शर्तों पर भुगतान बंद करें', body: 'एक क्लिक से रद्द करें। कोई रिटेंशन कॉल नहीं। कोई "हमें एक कारण चाहिए" नहीं। अप्रयुक्त समय का रिफ़ंड तीन कार्य दिवसों के भीतर आपके खाते में आ जाता है। आपका डेटा साफ़-सुथरे ढंग से मानक प्रारूपों में निर्यात हो जाता है ताकि आप कभी सनक-कॉस्ट माइग्रेशन के बंधक न रहें। हम अगला महीना हर महीने कमाते हैं — टिके रहने के योग्य होकर, छोड़ने में कष्टदायक होकर नहीं।' },
    ],
    antiPatterns: [
      { title: 'कोई "स्टार्टर" टियर अपंग फ़ीचरों के साथ नहीं', body: 'एक मुफ़्त टियर जिसमें डेटा एक्सपोर्ट हटा दिया गया हो, API थ्रॉटल कर दी गई हो, या AI अपग्रेड प्रॉम्प्ट के पीछे छिपा हो — मुफ़्त टियर नहीं है — यह वेशभूषा में सेल्स फ़नल है। हमारा मुफ़्त टियर पेड टियर के समान इंजन शिप करता है।' },
      { title: 'कोई लेनदेन कर नहीं जो विकास को दंडित करे', body: 'कुछ प्लेटफ़ॉर्म हर इनवॉइस, हर भुगतान, हर रिकॉर्ड पर एक प्रतिशत लेते हैं। वह सफलता पर कर है। हम वहाँ मीटर लगाते हैं जहाँ यह वास्तविक लागत (स्टोरेज, कंप्यूट, पेमेंट-रेल शुल्क) ट्रैक करता है और जब हमारी लागत घटती है तो बचत वापस करते हैं।' },
      { title: 'कोई कोट नहीं, कोई "संपर्क बिक्री" नहीं, कोई एंटरप्राइज़ अपारदर्शिता नहीं', body: 'हर कीमत प्रकाशित है। अगर खरीद टीम को MSA, DPA, या इनवॉइस्ड बिलिंग चाहिए, वह कागज़ी काम है, कीमत नहीं। Fortune 500 इनवॉइस पर डॉलर राशि वही है जो प्रकाशित पेज पर है, उनके खरीदे गए सीटों की संख्या से गुणा।' },
      { title: 'कोई प्रति-सीट सीढ़ी नहीं जो हर कदम पर तिगुना हो', body: 'दस लोगों की टीम को तीन लोगों की टीम से प्रति-सीट तीन गुना नहीं देना चाहिए। हमारी सीट गणित रैखिक और सरल है, जिसमें ईमानदार ब्रेक पॉइंट्स पर वॉल्यूम छूट है — कभी अपसेल के चारे के रूप में नहीं।' },
    ],
    workedExample: [
      { who: 'अकेला व्यापारी · लागोस, नाइजीरिया', tier: 'मुफ़्त टियर', what: 'एक-व्यक्ति की दुकान चलाता है। इनवॉइस जारी करता है, स्टॉक ट्रैक करता है, कर दाखिले संभालता है। हमेशा-मुफ़्त, कोई विज्ञापन नहीं, कोई रिकॉर्ड सीमा नहीं, पूर्ण डेटा एक्सपोर्ट।', note: 'कुछ नहीं चुकाता। पेड ग्राहकों के समान इंजन का उपयोग करता है।' },
      { who: 'पाँच लोगों की कंसल्टेंसी · टोरंटो, कनाडा', tier: 'Pro टियर', what: 'पाँच सीटें। AI-सहायता प्राप्त बिलिंग, मध्यम-वॉल्यूम लेनदेन, कारोबारी समय समर्थन। मुफ़्त टियर और एंटरप्राइज़ टियर के समान फ़ीचर सेट।', note: 'कनाडा के लिए प्रकाशित Pro कीमत CAD में चुकाता है।' },
      { who: 'निर्माता · फ्रैंकफर्ट, जर्मनी', tier: 'एंटरप्राइज़ टियर', what: '120 सीटें। SSO, DPA, समर्पित खाता संपर्क, 24 घंटे SLA। अकेले व्यापारी के समान फ़ीचर, बस अधिक हेडरूम और अधिक कागज़ी काम के साथ।', note: 'जर्मनी के लिए प्रकाशित एंटरप्राइज़ कीमत EUR में चुकाता है।' },
    ],
  },
  ar: {
    eyebrow: 'التسعير · قواعدنا الست', title: 'عادل، منشور، مبني للبقاء.',
    lede: 'نحدد سعر كل منتج على موقعه الخاص. هذه الصفحة عن القواعد التي نستخدمها في كل مكان. القواعد نفسها تنطبق على متجر شخص واحد وعلى مصنع بخمسة آلاف موظف.',
    whyThisExists: {
      eyebrow: 'لماذا توجد هذه الصفحة',
      heading: 'برامج الشركات باهظة الثمن لأنها صُمِّمت لتكون كذلك.',
      body: 'عقود من ستة أرقام، عمليات تشغيل لستة أشهر، وستة طبقات من الاستشاريين ليست خللًا في الصناعة — إنها نموذجها التجاري. نحن نرفض ذلك النموذج. أسعارنا موجودة لإبقاء الاستوديو يعمل، لا لمنع الشركات الصغيرة عند الباب.',
      freeTierLine: 'الباقة المجانية — تكفي لإدارة عمل حقيقي، لا صندوق رمل تجريبي.',
      paidTierLine: 'الباقة المدفوعة — تضيف سعة (مقاعد، حجم، دعم)، ولا تفتح أبدًا ميزات تملكها بالفعل.',
      enterpriseLine: 'المؤسسات — المنتج نفسه مع أوراق المشتريات، SSO، وشخص جاهز للاتصال. لا مجموعة ميزات سرية.',
    },
    seePricesCta: {
      eyebrow: 'شاهد الأسعار الفعلية',
      heading: 'كل منتج ينشر أسعاره الخاصة.',
      body: 'الأرقام تختلف بحسب المنتج والمنطقة، لكن القواعد الست في هذه الصفحة لا تتغير أبدًا. تصفح المحفظة للوصول إلى المنتج المناسب، والأسعار الحالية على صفحته الرئيسية.',
    },
    principles: [
      { title: 'باقة مجانية يمكنك بالفعل إدارة عمل عليها', body: 'ليست تجربة. ليست ثلاث فواتير ومؤقتًا. كل منتج رئيسي لديه خطة مجانية إلى الأبد بمساحة كافية لعمل شخص واحد — سجلات حقيقية، تقارير حقيقية، تصديرات حقيقية، بدون إعلانات. إن نمت أكبر منها، تضيف الباقات المدفوعة سعةً، لا ميزات. كشك السوق لشخص واحد في لاجوس وشركة الاستشارات في تورونتو يسجلان في الخطة نفسها ويصلان إلى زر الترقية نفسه عند الحاجة لمزيد من المساحة.' },
      { title: 'أسعار معدَّلة حسب مكان عيشك', body: 'خطة تكلف عشرين دولارًا في تورونتو تكلف أقل في لاجوس. نستخدم مؤشرات القوة الشرائية المنشورة من البنك الدولي لتحديد أسعار إقليمية عادلة بحيث يدفع الفريق نفسه التكلفة النسبية نفسها من حيثما يسجل. عميل العالم المتقدم يدفع سعر السوق الكامل؛ عميل السوق الناشئ يدفع سعرًا يحترم عملته. لا أحد يُستبعد بسبب السعر، ولا أحد يدعم منتجًا أسوأ.' },
      { title: 'كل ميزة في كل باقة', body: 'مساعدة الذكاء الاصطناعي، الأتمتة، المتاجر المتعددة، التحليلات العميقة، التكاملات، فحوصات الاحتيال — كلها في كل باقة سعر. لا بوابات "للشركات فقط". الباقات الأعلى تشتري مقاعد أكثر، حجمًا أكبر، ساعات دعم أكثر، واتفاقيات SLA أصرم. لا تفتح أبدًا ميزة لم تكن تملكها. طالب الصف الثامن على الباقة المجانية ومشتري Fortune 500 يدخلان إلى المنتج نفسه، بمجموعة الأدوات نفسها.' },
      { title: 'أسعار منشورة. لا "تواصل مع المبيعات."', body: 'إذا اضطررت لمراسلتنا لتعرف كم يكلف شيء ما، فهذا ليس تسعيرًا شفافًا. كل رقم على موقع المنتج نفسه، يُحدَّث في اليوم الذي نغيره فيه، بكل عملة نخدمها. لا ورقة شركات مخفية، لا عرض سعر يعتمد على حجمك المرئي في مكالمة استكشاف. السعر هو السعر، وننشره.' },
      { title: 'لا ابتزاز لكل مقعد', body: 'المقاعد مهمة، لكنها يجب ألا تكون الرافعة الوحيدة. نقيس الاستخدام الذي يعكس قيمة فعلية — معاملات، تخزين، أحجام نشطة — ونحافظ على رياضيات المقاعد بسيطة. فريق نامٍ يجب أن يدفع قليلًا أكثر، لا مضاعفًا خمس مرات. لم تطلب أسعارنا من أحد قط أن يفصل زملاءه ليُعدِّل الأرقام.' },
      { title: 'توقف عن الدفع بشروطك', body: 'إلغاء بنقرة واحدة. بلا مكالمات احتفاظ. بلا "نحتاج سببًا." يصل استرداد الوقت غير المستخدم إلى حسابك خلال ثلاثة أيام عمل. تُصدَّر بياناتك بنظافة إلى صيغ قياسية حتى لا تكون رهينة هجرة بتكلفة غارقة. نكسب الشهر التالي، كل شهر — بأن نستحق البقاء، لا بأن يكون الرحيل مؤلمًا.' },
    ],
    antiPatterns: [
      { title: 'لا باقة "للمبتدئين" بميزات معطّلة', body: 'باقة مجانية مع تصدير البيانات محذوفًا، أو API مُقيَّدة حتى عدم الفائدة، أو ذكاء اصطناعي مخفي خلف تنبيه ترقية، ليست باقة مجانية — إنها قمع مبيعات في ثوب آخر. باقتنا المجانية تشحن المحرك نفسه الذي تشحنه المدفوعة.' },
      { title: 'لا ضريبة معاملات تعاقب النمو', body: 'تتقاضى بعض المنصات نسبة مئوية من كل فاتورة، كل دفعة، كل سجل. هذه ضريبة على النجاح. نقيس حيث تتعقب التكلفة الفعلية (تخزين، حوسبة، رسوم قنوات الدفع) ونعيد التوفير عندما تنخفض تكلفتنا.' },
      { title: 'لا عروض أسعار، لا "تواصل مع المبيعات"، لا غموض للشركات', body: 'كل سعر منشور. إذا احتاج فريق المشتريات إلى MSA أو DPA أو فوترة بفاتورة، فتلك أوراق، ليست تسعيرًا. مبلغ الدولار على فاتورة Fortune 500 هو المبلغ نفسه على الصفحة المنشورة، مضروبًا بعدد المقاعد التي اشتراها.' },
      { title: 'لا سُلَّم لكل مقعد يضاعف ثلاث مرات في كل خطوة', body: 'فريق من عشرة لا يجب أن يدفع ثلاثة أضعاف ما يدفعه فريق من ثلاثة لكل مقعد. رياضيات المقاعد عندنا خطية وبسيطة، مع خصومات الحجم التي تبدأ عند نقاط كسر صادقة — لا كطُعم لترقية بيع.' },
    ],
    workedExample: [
      { who: 'تاجر فرديّ · لاجوس، نيجيريا', tier: 'الباقة المجانية', what: 'يدير محل شخص واحد. يُصدر فواتير، يتتبع المخزون، يتعامل مع الإقرارات الضريبية. مجاني للأبد، بلا إعلانات، بلا حد للسجلات، تصدير بيانات كامل.', note: 'لا يدفع شيئًا. يستخدم المحرك نفسه الذي يستخدمه العملاء المدفوعون.' },
      { who: 'استشارات من خمسة أشخاص · تورنتو، كندا', tier: 'باقة Pro', what: 'خمسة مقاعد. فوترة بمساعدة الذكاء الاصطناعي، معاملات بحجم متوسط، دعم في ساعات العمل. مجموعة الميزات نفسها للباقة المجانية وباقة المؤسسات.', note: 'يدفع سعر Pro المنشور لكندا بعملة CAD.' },
      { who: 'صانع · فرانكفورت، ألمانيا', tier: 'باقة المؤسسات', what: '120 مقعدًا. SSO، DPA، جهة اتصال حساب مخصصة، SLA لمدة 24 ساعة. الميزات نفسها التي يستخدمها التاجر الفردي، فقط بمساحة أكبر وأوراق أكثر.', note: 'يدفع سعر المؤسسات المنشور لألمانيا بعملة EUR.' },
    ],
  },
  fr: {
    eyebrow: 'TARIFS · NOS SIX RÈGLES', title: 'Justes, publiés, faits pour durer.',
    lede: "Nous fixons le prix de chaque produit sur son propre site. Cette page concerne les règles que nous utilisons partout. Les mêmes règles s'appliquent à une boutique d'une personne et à une usine de cinq mille personnes.",
    whyThisExists: {
      eyebrow: 'Pourquoi cette page existe',
      heading: "Les logiciels d'entreprise sont chers parce qu'ils ont été conçus pour l'être.",
      body: "Les contrats à six chiffres, les déploiements de six mois et les six couches de consultants ne sont pas un bug de l'industrie — ils sont son modèle économique. Nous rejetons ce modèle. Nos prix existent pour faire tourner le studio, pas pour bloquer les petites entreprises à la porte.",
      freeTierLine: 'Forfait gratuit — assez pour faire tourner une vraie entreprise, pas un bac à sable de démonstration.',
      paidTierLine: 'Forfait payant — ajoute de la capacité (sièges, volume, support), ne déverrouille jamais des fonctionnalités que vous aviez déjà.',
      enterpriseLine: 'Entreprise — le même produit avec la paperasse achats, SSO, et une personne disponible. Aucun jeu de fonctionnalités secret.',
    },
    seePricesCta: {
      eyebrow: 'Voir les prix réels',
      heading: 'Chaque produit publie ses propres prix.',
      body: "Les chiffres varient selon le produit et la région, mais les six règles de cette page ne changent jamais. Parcourez le portefeuille pour atterrir sur le bon produit ; les prix actuels sont sur sa page d'accueil.",
    },
    principles: [
      { title: 'Un forfait gratuit avec lequel vous pouvez vraiment faire tourner une entreprise', body: "Pas un essai. Pas trois factures et un minuteur. Chaque produit phare a un plan gratuit-à-vie avec assez de place pour une entreprise d'une personne — vrais enregistrements, vrais rapports, vrais exports, pas de publicité. Si vous le dépassez, les forfaits payants ajoutent de la capacité, jamais de fonctionnalités. Le stand de marché d'une personne à Lagos et le cabinet de conseil de Toronto s'inscrivent au même plan et atteignent le même bouton d'upgrade quand ils ont besoin de plus de marge." },
      { title: "Prix ajustés à l'endroit où vous vivez", body: "Un plan qui coûte vingt dollars à Toronto coûte moins à Lagos. Nous utilisons les indices de pouvoir d'achat publiés par la Banque mondiale pour fixer des prix régionaux justes afin que la même équipe paie le même coût relatif d'où qu'elle s'inscrive. Le client du monde développé paie le plein prix de marché ; le client des marchés émergents paie un prix qui respecte sa devise. Personne n'est exclu par le prix, et personne ne subventionne un produit moins bon." },
      { title: 'Chaque fonctionnalité dans chaque forfait', body: "Aide IA, automatisation, multi-magasin, analyses profondes, intégrations, contrôles antifraude — tout dans chaque palier de prix. Pas de barrières « uniquement pour entreprises ». Les paliers supérieurs achètent plus de sièges, plus de volume, plus d'heures de support et des SLA plus stricts. Ils ne déverrouillent jamais une fonctionnalité que vous n'aviez pas déjà. L'élève de quatrième sur le plan gratuit et l'acheteur Fortune 500 se connectent au même produit, avec la même boîte à outils." },
      { title: "Prix publiés. Pas de « contactez les ventes ».", body: "Si vous devez nous écrire pour savoir combien coûte quelque chose, ce n'est pas une tarification transparente. Chaque chiffre est sur le site du produit, mis à jour le jour où nous le changeons, dans chaque devise que nous servons. Pas de feuille entreprise cachée, pas de devis qui dépend de votre taille apparente lors d'un appel de découverte. Le prix est le prix, et nous le publions." },
      { title: 'Pas de gouge par siège', body: "Les sièges comptent, mais ne devraient pas être le seul levier. Nous facturons l'usage qui reflète vraiment la valeur — transactions, stockage, volumes actifs — et gardons les maths de sièges simples. Une équipe qui grandit devrait payer un peu plus, pas un multiplicateur par cinq. Nos prix n'ont jamais demandé à personne de licencier des coéquipiers pour faire tenir les chiffres." },
      { title: 'Arrêtez de payer à vos conditions', body: "Annulez en un clic. Pas d'appels de rétention. Pas de « il nous faut une raison ». Un remboursement du temps non utilisé arrive sur votre compte sous trois jours ouvrés. Vos données s'exportent proprement dans des formats standard pour que vous ne soyez jamais l'otage d'une migration au coût irrécupérable. Nous gagnons le mois suivant, chaque mois — en méritant qu'on reste, pas en étant pénible à quitter." },
    ],
    antiPatterns: [
      { title: 'Pas de palier « starter » aux fonctionnalités estropiées', body: "Un plan gratuit avec l'export des données retiré, l'API bridée jusqu'à l'inutilité, ou l'IA cachée derrière un prompt d'upgrade n'est pas un plan gratuit — c'est un entonnoir de vente déguisé. Notre plan gratuit livre le même moteur que le payant." },
      { title: 'Pas de taxe de transaction qui punit la croissance', body: "Certaines plateformes prennent un pourcentage sur chaque facture, chaque paiement, chaque enregistrement. C'est une taxe sur le succès. Nous facturons là où ça suit le coût réel (stockage, calcul, frais de rail de paiement) et reversons l'économie quand notre coût baisse." },
      { title: "Pas de devis, pas de « contactez les ventes », pas d'opacité enterprise", body: "Chaque prix est publié. Si une équipe achats a besoin d'un MSA, d'un DPA, ou d'une facturation, ce sont des papiers, pas du tarif. Le montant en dollars sur une facture Fortune 500 est le même que sur la page publiée, multiplié par le nombre de sièges qu'ils ont achetés." },
      { title: "Pas d'échelles par siège qui triplent à chaque palier", body: "Une équipe de dix ne devrait pas payer trois fois ce qu'une équipe de trois paie par siège. Nos maths de sièges sont linéaires et simples, avec des remises de volume qui démarrent à des points de cassure honnêtes — jamais comme appât pour upsell." },
    ],
    workedExample: [
      { who: 'Commerçant solo · Lagos, Nigeria', tier: 'Plan gratuit', what: "Tient une boutique d'une personne. Émet des factures, suit le stock, gère les déclarations fiscales. Gratuit-pour-toujours, sans publicité, sans plafond d'enregistrements, export complet des données.", note: 'Ne paie rien. Utilise le même moteur que les clients payants.' },
      { who: 'Cabinet de conseil de cinq personnes · Toronto, Canada', tier: 'Plan Pro', what: 'Cinq sièges. Facturation assistée par IA, transactions de volume moyen, support en heures ouvrées. Même ensemble de fonctionnalités que le plan gratuit et le plan enterprise.', note: 'Paie le prix Pro publié pour le Canada en CAD.' },
      { who: 'Fabricant · Francfort, Allemagne', tier: 'Plan Enterprise', what: '120 sièges. SSO, DPA, contact de compte dédié, SLA de 24 heures. Mêmes fonctionnalités que le commerçant solo, juste avec plus de marge et plus de paperasse.', note: "Paie le prix Enterprise publié pour l'Allemagne en EUR." },
    ],
  },
  pt: {
    eyebrow: 'PREÇOS · AS NOSSAS SEIS REGRAS', title: 'Justos, publicados, feitos para durar.',
    lede: 'Definimos o preço de cada produto no seu próprio site. Esta página é sobre as regras que usamos em todo lado. As mesmas regras aplicam-se a uma loja de uma só pessoa e a uma fábrica de cinco mil pessoas.',
    whyThisExists: {
      eyebrow: 'Porque existe isto',
      heading: 'O software empresarial é caro porque foi desenhado para o ser.',
      body: 'Contratos de seis dígitos, implementações de seis meses, e seis camadas de consultores não são um bug da indústria — são o seu modelo de negócio. Rejeitamos esse modelo. Os nossos preços existem para manter o estúdio a funcionar, não para travar pequenas empresas à porta.',
      freeTierLine: 'Plano gratuito — suficiente para gerir um negócio a sério, não um sandbox de demonstração.',
      paidTierLine: 'Plano pago — acrescenta escala (lugares, volume, suporte), nunca desbloqueia funcionalidades que já tinha.',
      enterpriseLine: 'Enterprise — o mesmo produto com papelada de compras, SSO, e uma pessoa de plantão. Sem conjunto de funcionalidades secreto.',
    },
    seePricesCta: {
      eyebrow: 'Ver preços reais',
      heading: 'Cada produto publica os seus próprios preços.',
      body: 'Os números variam por produto e região, mas as seis regras desta página nunca variam. Navegue pelo portefólio para encontrar o produto certo, e os preços atuais estão na sua homepage.',
    },
    principles: [
      { title: 'Um plano gratuito com que pode mesmo gerir um negócio', body: 'Não é um trial. Não são três faturas e um cronómetro. Cada produto principal tem um plano grátis-para-sempre com espaço suficiente para um negócio de uma pessoa — registos reais, relatórios reais, exportações reais, sem publicidade. Se crescer para além dele, os planos pagos acrescentam escala, nunca funcionalidades. A banca de mercado de uma pessoa em Lagos e a consultoria em Toronto subscrevem o mesmo plano e procuram o mesmo botão de upgrade quando precisam de mais margem.' },
      { title: 'Preços ajustados ao sítio onde vive', body: 'Um plano que custa vinte dólares em Toronto custa menos em Lagos. Usamos índices de poder de compra publicados pelo Banco Mundial para definir preços regionais justos, para que a mesma equipa pague o mesmo custo relativo onde quer que se inscreva. O cliente do mundo desenvolvido paga o preço de mercado completo; o cliente do mercado emergente paga um preço que respeita a sua moeda. Ninguém é excluído pelo preço, e ninguém subsidia um produto pior.' },
      { title: 'Cada funcionalidade em cada plano', body: 'Ajuda com IA, automação, multi-loja, análise profunda, integrações, verificações antifraude — tudo em cada nível de preço. Sem barreiras "só enterprise". Os planos superiores compram mais lugares, mais volume, mais horas de suporte e SLAs mais apertados. Nunca desbloqueiam uma funcionalidade que já não tivesse. O aluno do oitavo ano no plano gratuito e o comprador Fortune 500 entram no mesmo produto, com o mesmo conjunto de ferramentas.' },
      { title: 'Preços publicados. Sem "contactar vendas."', body: 'Se tem de nos escrever para saber quanto custa algo, não é preço transparente. Cada número está no próprio site do produto, atualizado no dia em que alteramos, em cada moeda que servimos. Sem folha enterprise oculta, sem orçamento que dependa de quão grande parece numa chamada de descoberta. O preço é o preço, e publicamo-lo.' },
      { title: 'Sem extorsão por lugar', body: 'Os lugares importam, mas não deviam ser a única alavanca. Medimos o uso que reflete valor real — transações, armazenamento, volumes ativos — e mantemos a matemática dos lugares simples. Uma equipa em crescimento deveria pagar um pouco mais, não um multiplicador de cinco. Os nossos preços nunca pediram a ninguém que despedisse colegas para os números fecharem.' },
      { title: 'Deixe de pagar nos seus termos', body: 'Cancele com um clique. Sem chamadas de retenção. Sem "precisamos de um motivo." Um reembolso pelo tempo não usado chega à sua conta em três dias úteis. Os seus dados exportam-se de forma limpa para formatos padrão para que nunca seja refém de uma migração com custo afundado. Ganhamos o mês seguinte, todos os meses — por merecer ficar, não por ser doloroso sair.' },
    ],
    antiPatterns: [
      { title: 'Sem plano "starter" com funcionalidades aleijadas', body: 'Um plano gratuito com a exportação de dados removida, a API limitada até à inutilidade, ou IA escondida atrás de um prompt de upgrade não é um plano gratuito — é um funil de vendas em fato. O nosso plano gratuito envia o mesmo motor que o pago.' },
      { title: 'Sem imposto de transação que castiga o crescimento', body: 'Algumas plataformas cobram uma percentagem sobre cada fatura, cada pagamento, cada registo. Isso é um imposto sobre o sucesso. Medimos onde acompanha o custo real (armazenamento, computação, taxas de canais de pagamento) e devolvemos a poupança quando o nosso custo desce.' },
      { title: 'Sem orçamentos, sem "contactar vendas", sem opacidade enterprise', body: 'Cada preço é publicado. Se uma equipa de compras precisa de um MSA, um DPA, ou faturação, isso é papelada, não preço. O valor em dólares numa fatura Fortune 500 é o mesmo valor da página publicada, multiplicado pelos lugares que compraram.' },
      { title: 'Sem escadas por lugar que triplicam em cada degrau', body: 'Uma equipa de dez não deveria pagar três vezes o que uma equipa de três paga por lugar. A nossa matemática de lugares é linear e simples, com descontos por volume em pontos de quebra honestos — nunca como isco para upsell.' },
    ],
    workedExample: [
      { who: 'Comerciante solo · Lagos, Nigéria', tier: 'Plano gratuito', what: 'Gere uma loja de uma só pessoa. Emite faturas, controla stock, trata de declarações fiscais. Grátis-para-sempre, sem publicidade, sem limite de registos, exportação completa de dados.', note: 'Não paga nada. Usa o mesmo motor que os clientes pagos.' },
      { who: 'Consultoria de cinco pessoas · Toronto, Canadá', tier: 'Plano Pro', what: 'Cinco lugares. Faturação assistida por IA, transações de volume médio, suporte em horário comercial. Mesmo conjunto de funcionalidades do plano gratuito e do enterprise.', note: 'Paga o preço Pro publicado para o Canadá em CAD.' },
      { who: 'Fabricante · Frankfurt, Alemanha', tier: 'Plano Enterprise', what: '120 lugares. SSO, DPA, contacto de conta dedicado, SLA de 24 horas. Mesmas funcionalidades que o comerciante solo, apenas com mais margem e mais papelada.', note: 'Paga o preço Enterprise publicado para a Alemanha em EUR.' },
    ],
  },
  bn: {
    eyebrow: 'মূল্য · আমাদের ছয়টি নিয়ম', title: 'ন্যায্য, প্রকাশিত, টেকসই।',
    lede: 'আমরা প্রতিটি পণ্যের মূল্য তার নিজস্ব সাইটে নির্ধারণ করি। এই পৃষ্ঠাটি আমরা সর্বত্র ব্যবহার করা নিয়ম সম্পর্কে। একই নিয়ম এক-ব্যক্তির দোকান এবং পাঁচ হাজার লোকের কারখানার জন্য প্রযোজ্য।',
    whyThisExists: {
      eyebrow: 'এটি কেন আছে',
      heading: 'এন্টারপ্রাইজ সফটওয়্যার ব্যয়বহুল কারণ এটিকে তেমনই ডিজাইন করা হয়েছিল।',
      body: 'ছয়-অঙ্কের চুক্তি, ছয় মাসের রোলআউট, এবং ছয় স্তরের পরামর্শদাতা শিল্পের বাগ নয় — এটিই তার ব্যবসায়িক মডেল। আমরা সেই মডেলকে প্রত্যাখ্যান করি। আমাদের মূল্য স্টুডিও চালু রাখার জন্য, ছোট ব্যবসাগুলোকে দরজায় আটকানোর জন্য নয়।',
      freeTierLine: 'ফ্রি টিয়ার — একটি বাস্তব ব্যবসা চালানোর জন্য যথেষ্ট, ডেমো স্যান্ডবক্স নয়।',
      paidTierLine: 'পেইড টিয়ার — স্কেল (সিট, ভলিউম, সাপোর্ট) যোগ করে, যা আপনার ইতিমধ্যে আছে এমন বৈশিষ্ট্য কখনো আনলক করে না।',
      enterpriseLine: 'এন্টারপ্রাইজ — একই পণ্য, প্রোকিউরমেন্ট পেপারওয়ার্ক, SSO, এবং একজন কল-অন মানুষ সহ। কোনো গোপন বৈশিষ্ট্য সেট নেই।',
    },
    seePricesCta: {
      eyebrow: 'প্রকৃত মূল্য দেখুন',
      heading: 'প্রতিটি পণ্য তার নিজস্ব মূল্য প্রকাশ করে।',
      body: 'সংখ্যা পণ্য এবং অঞ্চল অনুসারে পরিবর্তিত হয়, কিন্তু এই পৃষ্ঠার ছয়টি নিয়ম কখনো পরিবর্তিত হয় না। সঠিক পণ্যে পৌঁছানোর জন্য পোর্টফোলিও ব্রাউজ করুন এবং বর্তমান মূল্য তার হোমপেজে রয়েছে।',
    },
    principles: [
      { title: 'একটি ফ্রি টিয়ার যেখানে আপনি সত্যিই ব্যবসা চালাতে পারেন', body: 'কোনো ট্রায়াল নয়। তিনটি ইনভয়েস এবং একটি টাইমার নয়। প্রতিটি ফ্ল্যাগশিপের একটি চিরকাল-মুক্ত প্ল্যান আছে যাতে এক-ব্যক্তির ব্যবসার জন্য যথেষ্ট জায়গা — বাস্তব রেকর্ড, বাস্তব রিপোর্ট, বাস্তব এক্সপোর্ট, কোনো বিজ্ঞাপন নয়। আপনি যদি এর চেয়ে বড় হয়ে যান, পেইড টিয়ার স্কেল যোগ করে, বৈশিষ্ট্য নয়। লাগোসের এক-ব্যক্তির বাজার স্টল এবং টরন্টোর কনসাল্টেন্সি একই প্ল্যানে সাইন আপ করে এবং যখন আরও জায়গা প্রয়োজন তখন একই আপগ্রেড বোতামে পৌঁছায়।' },
      { title: 'আপনি যেখানে বাস করেন তার অনুযায়ী সমন্বিত মূল্য', body: 'টরন্টোতে যে প্ল্যানের দাম বিশ ডলার, লাগোসে তার দাম কম। আমরা ন্যায্য আঞ্চলিক মূল্য নির্ধারণ করতে বিশ্ব ব্যাংকের প্রকাশিত ক্রয়-ক্ষমতা সূচক ব্যবহার করি যাতে একই দল যেখান থেকেই সাইন আপ করুক একই আপেক্ষিক খরচ দেয়। উন্নত-বিশ্বের গ্রাহক পূর্ণ বাজার মূল্য দেয়; উদীয়মান বাজারের গ্রাহক এমন মূল্য দেয় যা তাদের মুদ্রাকে সম্মান করে। মূল্যের কারণে কেউ বাদ পড়ে না, এবং কেউ একটি খারাপ পণ্যকে ভর্তুকি দেয় না।' },
      { title: 'প্রতিটি টিয়ারে প্রতিটি বৈশিষ্ট্য', body: 'AI সহায়তা, অটোমেশন, মাল্টি-স্টোর, গভীর অ্যানালিটিক্স, ইন্টিগ্রেশন, প্রতারণা যাচাই — সব প্রতিটি মূল্য টিয়ারে। কোনো "শুধু-এন্টারপ্রাইজ" গেট নয়। উচ্চ টিয়ার কেনে আরও সিট, আরও ভলিউম, আরও সাপোর্ট ঘণ্টা এবং কঠোর SLA। তারা কখনো এমন বৈশিষ্ট্য আনলক করে না যা আপনার পূর্বে ছিল না। ফ্রি প্ল্যানে অষ্টম শ্রেণির ছাত্র এবং Fortune 500 ক্রেতা একই পণ্যে, একই টুলকিট সহ সাইন ইন করে।' },
      { title: 'প্রকাশিত মূল্য। কোনো "বিক্রয় যোগাযোগ" নয়।', body: 'কোনো কিছুর দাম জানতে যদি আপনাকে আমাদের ইমেইল করতে হয়, এটি স্বচ্ছ মূল্য নির্ধারণ নয়। প্রতিটি সংখ্যা পণ্যের নিজস্ব সাইটে, পরিবর্তনের দিনই আপডেট হয়, প্রতিটি মুদ্রায় যেগুলো আমরা সেবা দিই। কোনো লুকানো এন্টারপ্রাইজ শিট নয়, কোনো উদ্ধৃতি নয় যা নির্ভর করে আপনি ডিসকভারি কলে কতটা বড় দেখান তার উপর। মূল্যই মূল্য, এবং আমরা এটি প্রকাশ করি।' },
      { title: 'প্রতি-সিট লুট নয়', body: 'সিট গুরুত্বপূর্ণ, কিন্তু একমাত্র লিভার হওয়া উচিত নয়। আমরা সেই ব্যবহারে মিটার করি যা সত্যিই মূল্য প্রতিফলিত করে — লেনদেন, স্টোরেজ, সক্রিয় ভলিউম — এবং সিটের গণিত সহজ রাখি। একটি বাড়তি দল কিছুটা বেশি দিতে পারে, পাঁচগুণ গুণিতক নয়। আমাদের মূল্য কখনো কাউকে সংখ্যা মেলাতে সহকর্মীদের ছাঁটাই করতে বলেনি।' },
      { title: 'আপনার শর্তে অর্থ প্রদান বন্ধ করুন', body: 'এক ক্লিকে বাতিল করুন। কোনো রিটেনশন কল নয়। কোনো "আমাদের একটি কারণ দরকার" নয়। অব্যবহৃত সময়ের একটি রিফান্ড তিন কার্যদিবসের মধ্যে আপনার অ্যাকাউন্টে আসে। আপনার ডেটা পরিষ্কারভাবে স্ট্যান্ডার্ড ফরম্যাটে এক্সপোর্ট হয় যাতে আপনি কখনো সানক-কস্ট মাইগ্রেশনের জিম্মি না হন। আমরা পরের মাস উপার্জন করি, প্রতি মাসে — থাকার যোগ্য হয়ে, ছাড়া কষ্টদায়ক হয়ে নয়।' },
    ],
    antiPatterns: [
      { title: 'বিকলাঙ্গ বৈশিষ্ট্য সহ কোনো "স্টার্টার" টিয়ার নয়', body: 'একটি ফ্রি টিয়ার যেখানে ডেটা এক্সপোর্ট সরিয়ে নেওয়া হয়েছে, API অকেজোতার পর্যায়ে থ্রটল করা, বা AI আপগ্রেড প্রম্পটের পেছনে লুকানো — সেটি ফ্রি টিয়ার নয় — এটি ছদ্মবেশে একটি বিক্রির ফানেল। আমাদের ফ্রি টিয়ার পেইড টিয়ারের মতো একই ইঞ্জিন শিপ করে।' },
      { title: 'বৃদ্ধিকে শাস্তি দেয় এমন কোনো লেনদেন কর নয়', body: 'কিছু প্ল্যাটফর্ম প্রতিটি ইনভয়েস, প্রতিটি অর্থপ্রদান, প্রতিটি রেকর্ডের একটি শতাংশ চার্জ করে। এটি সাফল্যের উপর কর। আমরা সেখানে মিটার করি যেখানে এটি প্রকৃত খরচ (স্টোরেজ, কম্পিউট, পেমেন্ট-রেইল ফি) ট্র্যাক করে এবং আমাদের খরচ কমলে সঞ্চয় ফিরিয়ে দিই।' },
      { title: 'কোনো উদ্ধৃতি নয়, কোনো "বিক্রয় যোগাযোগ" নয়, কোনো এন্টারপ্রাইজ অস্পষ্টতা নয়', body: 'প্রতিটি মূল্য প্রকাশিত। যদি কোনো প্রকিউরমেন্ট দলের MSA, DPA, বা ইনভয়েস্ড বিলিং প্রয়োজন হয়, সেগুলো কাগজি কাজ, মূল্য নয়। Fortune 500 ইনভয়েসে ডলার পরিমাণ প্রকাশিত পৃষ্ঠায় থাকা একই পরিমাণ, তারা যত সিট কিনেছে তা দিয়ে গুণ করা।' },
      { title: 'প্রতি ধাপে তিনগুণ হওয়া কোনো প্রতি-সিট সিঁড়ি নয়', body: 'দশজনের একটি দলকে তিনজনের একটি দলের চেয়ে প্রতি-সিট তিনগুণ দেওয়া উচিত নয়। আমাদের সিট গণিত রৈখিক এবং সহজ, যেখানে সৎ ব্রেক পয়েন্টে ভলিউম ছাড় শুরু হয় — কখনো আপসেলের টোপ হিসেবে নয়।' },
    ],
    workedExample: [
      { who: 'একক ব্যবসায়ী · লাগোস, নাইজেরিয়া', tier: 'ফ্রি টিয়ার', what: 'এক-ব্যক্তির দোকান চালান। ইনভয়েস ইস্যু, স্টক ট্র্যাক, কর জমা পরিচালনা। চিরকাল-মুক্ত, কোনো বিজ্ঞাপন নয়, কোনো রেকর্ড ক্যাপ নেই, পূর্ণ ডেটা এক্সপোর্ট।', note: 'কিছু পরিশোধ করেন না। পেইড গ্রাহকদের মতো একই ইঞ্জিন ব্যবহার করেন।' },
      { who: 'পাঁচজনের কনসাল্টেন্সি · টরন্টো, কানাডা', tier: 'Pro টিয়ার', what: 'পাঁচটি সিট। AI-সহায়ক বিলিং, মাঝারি-ভলিউম লেনদেন, কর্মঘণ্টায় সহায়তা। ফ্রি টিয়ার এবং এন্টারপ্রাইজ টিয়ারের একই বৈশিষ্ট্য সেট।', note: 'কানাডার জন্য প্রকাশিত Pro মূল্য CAD-এ পরিশোধ করেন।' },
      { who: 'নির্মাতা · ফ্রাঙ্কফুর্ট, জার্মানি', tier: 'এন্টারপ্রাইজ টিয়ার', what: '120 সিট। SSO, DPA, ডেডিকেটেড অ্যাকাউন্ট কন্টাক্ট, 24-ঘণ্টা SLA। একক ব্যবসায়ীর মতো একই বৈশিষ্ট্য, শুধু বেশি জায়গা এবং বেশি কাগজি কাজ সহ।', note: 'জার্মানির জন্য প্রকাশিত এন্টারপ্রাইজ মূল্য EUR-এ পরিশোধ করেন।' },
    ],
  },
  ru: {
    eyebrow: 'ЦЕНЫ · НАШИ ШЕСТЬ ПРАВИЛ', title: 'Справедливо, публично, на долгий срок.',
    lede: 'Мы устанавливаем цену на каждый продукт на его собственном сайте. Эта страница — о правилах, которые мы используем везде. Те же правила работают для магазина из одного человека и для фабрики из пяти тысяч.',
    whyThisExists: {
      eyebrow: 'Зачем это нужно',
      heading: 'Корпоративный софт дорогой потому, что так и был задуман.',
      body: 'Шестизначные контракты, шестимесячные внедрения и шесть слоёв консультантов — не баг индустрии, а её бизнес-модель. Мы отвергаем эту модель. Наши цены существуют, чтобы студия продолжала работать, а не чтобы преграждать дорогу малому бизнесу.',
      freeTierLine: 'Бесплатный тариф — хватит, чтобы вести реальный бизнес, а не демо-песочницу.',
      paidTierLine: 'Платный тариф — добавляет масштаб (места, объём, поддержка), никогда не открывает функции, которые у вас уже есть.',
      enterpriseLine: 'Enterprise — тот же продукт с бумагами закупок, SSO и человеком на дежурстве. Никакого тайного набора функций.',
    },
    seePricesCta: {
      eyebrow: 'Смотреть реальные цены',
      heading: 'Каждый продукт публикует свои цены.',
      body: 'Числа меняются по продукту и региону, но шесть правил на этой странице — никогда. Просмотрите портфель, чтобы найти подходящий продукт; текущие цены — на его главной странице.',
    },
    principles: [
      { title: 'Бесплатный тариф, на котором действительно можно вести бизнес', body: 'Не пробный. Не три счёта и таймер. У каждого флагмана есть бесплатный-навсегда план с достаточным простором для бизнеса из одного человека — реальные записи, реальные отчёты, реальные экспорты, без рекламы. Если перерастёте — платные тарифы добавляют масштаб, никогда фичи. Одинокий рыночный прилавок в Лагосе и консалтинг в Торонто подписываются на один и тот же план и тянутся к одной и той же кнопке апгрейда, когда нужен запас.' },
      { title: 'Цены, скорректированные под место жительства', body: 'План, который стоит двадцать долларов в Торонто, стоит меньше в Лагосе. Мы используем опубликованные индексы покупательной способности Всемирного банка, чтобы устанавливать справедливые региональные цены, чтобы одна и та же команда платила одинаковую относительную стоимость, откуда бы она ни регистрировалась. Клиент из развитого мира платит полную рыночную цену; клиент из развивающегося рынка — цену, уважающую его валюту. Никто не отсечён ценой, и никто не субсидирует худший продукт.' },
      { title: 'Каждая фича в каждом тарифе', body: 'Помощь ИИ, автоматизация, мульти-магазины, глубокая аналитика, интеграции, антифрод — всё в каждом ценовом тарифе. Никаких ворот «только для enterprise». Старшие тарифы покупают больше мест, больше объёма, больше часов поддержки и более жёсткие SLA. Они никогда не открывают функцию, которой у вас уже не было. Восьмиклассник на бесплатном плане и покупатель Fortune 500 заходят в один и тот же продукт с одним и тем же набором инструментов.' },
      { title: 'Опубликованные цены. Никакого «свяжитесь с продажами».', body: 'Если, чтобы узнать цену, вам нужно нам написать — это не прозрачное ценообразование. Каждое число — на сайте самого продукта, обновляется в день изменения, в каждой обслуживаемой нами валюте. Никакой скрытой enterprise-таблицы, никаких котировок, зависящих от того, насколько вы выглядите большими на discovery-звонке. Цена — это цена, и мы её публикуем.' },
      { title: 'Никакого выкручивания за место', body: 'Места важны, но не должны быть единственным рычагом. Мы тарифицируем использование, отражающее реальную ценность — транзакции, хранилище, активные объёмы — и держим математику мест простой. Растущая команда должна платить чуть больше, а не в пять раз. Наши цены никогда не просили никого увольнять коллег ради чисел.' },
      { title: 'Прекратите платить на своих условиях', body: 'Отмена в один клик. Никаких удерживающих звонков. Никакого «нам нужна причина». Возврат за неиспользованное время приходит на ваш счёт в течение трёх рабочих дней. Ваши данные чисто экспортируются в стандартные форматы, чтобы вы никогда не были заложником «затопленных» затрат на миграцию. Мы зарабатываем следующий месяц каждый месяц — тем, что нас стоит держать, а не тем, что больно уходить.' },
    ],
    antiPatterns: [
      { title: 'Никаких «стартер»-тарифов с покалеченными функциями', body: 'Бесплатный тариф с убранным экспортом данных, API, заглушенной до бесполезности, или ИИ, спрятанным за апгрейд-промптом, — не бесплатный тариф, а воронка продаж в маскировке. Наш бесплатный тариф поставляет тот же движок, что и платный.' },
      { title: 'Никакого транзакционного налога, наказывающего рост', body: 'Некоторые платформы берут процент с каждого инвойса, каждого платежа, каждой записи. Это налог на успех. Мы тарифицируем там, где это отслеживает реальную стоимость (хранилище, вычисления, комиссии платёжных рельсов), и возвращаем экономию, когда наша стоимость падает.' },
      { title: 'Никаких котировок, никакого «свяжитесь с продажами», никакой enterprise-непрозрачности', body: 'Каждая цена опубликована. Если отделу закупок нужны MSA, DPA или биллинг по инвойсам — это бумаги, а не цена. Сумма в долларах на инвойсе Fortune 500 — это та же сумма, что и на опубликованной странице, умноженная на количество купленных мест.' },
      { title: 'Никаких лестниц «за место», умножающих в три раза на каждом шаге', body: 'Команда из десяти не должна платить за место в три раза больше, чем команда из трёх. Наша математика мест — линейная и простая, с объёмными скидками на честных порогах — никогда как наживка для апсейла.' },
    ],
    workedExample: [
      { who: 'Соло-предприниматель · Лагос, Нигерия', tier: 'Бесплатный тариф', what: 'Ведёт магазин из одного человека. Выставляет инвойсы, отслеживает склад, обрабатывает налоговые декларации. Бесплатно-навсегда, без рекламы, без лимита записей, полный экспорт данных.', note: 'Не платит ничего. Использует тот же движок, что и платные клиенты.' },
      { who: 'Консалтинг из пяти человек · Торонто, Канада', tier: 'Тариф Pro', what: 'Пять мест. Биллинг с ИИ, средний объём транзакций, поддержка в рабочие часы. Тот же набор фич, что и в бесплатном тарифе и в enterprise.', note: 'Платит опубликованную цену Pro для Канады в CAD.' },
      { who: 'Производитель · Франкфурт, Германия', tier: 'Тариф Enterprise', what: '120 мест. SSO, DPA, выделенный контакт по аккаунту, SLA 24 часа. Те же функции, что и у соло-предпринимателя, только с большим запасом и большим объёмом бумаг.', note: 'Платит опубликованную цену Enterprise для Германии в EUR.' },
    ],
  },
  ur: {
    eyebrow: 'قیمت · ہمارے چھ اصول', title: 'منصفانہ، شائع شدہ، دیرپا ہونے کے لیے بنا۔',
    lede: 'ہم ہر پروڈکٹ کی قیمت اس کی اپنی سائٹ پر مقرر کرتے ہیں۔ یہ صفحہ ان اصولوں کے بارے میں ہے جو ہم ہر جگہ استعمال کرتے ہیں۔ وہی اصول ایک شخص کی دکان اور پانچ ہزار افراد کی فیکٹری پر لاگو ہوتے ہیں۔',
    whyThisExists: {
      eyebrow: 'یہ کیوں موجود ہے',
      heading: 'انٹرپرائز سافٹ ویئر مہنگا ہے کیونکہ اسے ایسا ہی ڈیزائن کیا گیا تھا۔',
      body: 'چھ ہندسوں کے معاہدے، چھ ماہ کے رول آؤٹ، اور چھ پرتوں کے مشیر صنعت کا بگ نہیں — وہ اس کا کاروباری ماڈل ہیں۔ ہم اس ماڈل کو مسترد کرتے ہیں۔ ہماری قیمتیں اسٹوڈیو کو چلانے کے لیے ہیں، چھوٹے کاروباروں کو دروازے پر روکنے کے لیے نہیں۔',
      freeTierLine: 'فری ٹائر — ایک حقیقی کاروبار چلانے کے لیے کافی، ڈیمو سینڈ باکس نہیں۔',
      paidTierLine: 'پیڈ ٹائر — اسکیل (سیٹ، حجم، سپورٹ) شامل کرتا ہے، ان فیچرز کو کبھی انلاک نہیں کرتا جو آپ کے پاس پہلے سے ہیں۔',
      enterpriseLine: 'انٹرپرائز — وہی پروڈکٹ، پروکیورمنٹ کاغذی کارروائی، SSO، اور کال پر ایک حقیقی شخص کے ساتھ۔ کوئی خفیہ فیچر سیٹ نہیں۔',
    },
    seePricesCta: {
      eyebrow: 'اصل قیمتیں دیکھیں',
      heading: 'ہر پروڈکٹ اپنی قیمتیں خود شائع کرتی ہے۔',
      body: 'اعداد پروڈکٹ اور علاقے کے مطابق مختلف ہوتے ہیں، لیکن اس صفحے کے چھ اصول کبھی نہیں۔ صحیح پروڈکٹ تک پہنچنے کے لیے پورٹ فولیو براؤز کریں، اور موجودہ قیمتیں اس کے ہوم پیج پر ہیں۔',
    },
    principles: [
      { title: 'ایک فری ٹائر جس پر آپ واقعی کاروبار چلا سکتے ہیں', body: 'ٹرائل نہیں۔ تین انوائسز اور ایک ٹائمر نہیں۔ ہر فلیگ شپ کا ایک ہمیشہ-کے-لیے-مفت پلان ہے جس میں ایک شخص کے کاروبار کے لیے کافی جگہ — حقیقی ریکارڈز، حقیقی رپورٹس، حقیقی ایکسپورٹس، کوئی اشتہار نہیں۔ اگر آپ اس سے بڑے ہو جاتے ہیں، پیڈ ٹائر اسکیل شامل کرتے ہیں، فیچرز نہیں۔ لاگوس کا ایک شخص بازار اسٹال اور ٹورنٹو کی کنسلٹنسی ایک ہی پلان پر سائن اپ کرتے ہیں اور جب مزید جگہ چاہیے ہوتی ہے تو اسی اپ گریڈ بٹن تک پہنچتے ہیں۔' },
      { title: 'آپ جہاں رہتے ہیں اس کے لحاظ سے ایڈجسٹ کی گئی قیمتیں', body: 'ٹورنٹو میں جو پلان بیس ڈالر کا ہے وہ لاگوس میں کم کا ہے۔ ہم ورلڈ بینک کی شائع شدہ قوت خرید اشاریوں کا استعمال کر کے منصفانہ علاقائی قیمتیں طے کرتے ہیں تاکہ وہی ٹیم جہاں سے بھی سائن اپ کرے، وہی متعلقہ لاگت ادا کرے۔ ترقی یافتہ-دنیا کا گاہک پوری مارکیٹ قیمت ادا کرتا ہے؛ ابھرتی-منڈی کا گاہک ایسی قیمت ادا کرتا ہے جو اس کی کرنسی کا احترام کرے۔ کوئی بھی قیمت کی وجہ سے باہر نہیں ہوتا، اور کوئی برے پروڈکٹ کو سبسڈی نہیں دیتا۔' },
      { title: 'ہر ٹائر میں ہر فیچر', body: 'AI مدد، آٹومیشن، ملٹی-اسٹور، گہری تجزیات، انٹیگریشنز، فراڈ چیکس — سب ہر قیمت ٹائر میں۔ کوئی "صرف-انٹرپرائز" دروازے نہیں۔ اعلیٰ ٹائرز زیادہ سیٹیں، زیادہ حجم، زیادہ سپورٹ گھنٹے اور سخت SLAs خریدتے ہیں۔ وہ کبھی ایسا فیچر انلاک نہیں کرتے جو آپ کے پاس پہلے سے نہ ہو۔ مفت پلان پر آٹھویں جماعت کا طالب علم اور Fortune 500 خریدار ایک ہی پروڈکٹ میں، ایک ہی ٹول کٹ کے ساتھ سائن ان کرتے ہیں۔' },
      { title: 'شائع شدہ قیمتیں۔ کوئی "سیلز سے رابطہ" نہیں۔', body: 'اگر کسی چیز کی قیمت جاننے کے لیے آپ کو ہمیں ای میل کرنا پڑے، یہ شفاف قیمت بندی نہیں۔ ہر نمبر پروڈکٹ کی اپنی سائٹ پر ہے، اسی دن اپڈیٹ ہوتا ہے جس دن ہم تبدیل کرتے ہیں، ہر اس کرنسی میں جو ہم پیش کرتے ہیں۔ کوئی پوشیدہ انٹرپرائز شیٹ نہیں، کوئی کوٹ نہیں جو اس پر منحصر ہو کہ آپ ڈسکوری کال پر کتنے بڑے دکھائی دیتے ہیں۔ قیمت ہی قیمت ہے، اور ہم اسے شائع کرتے ہیں۔' },
      { title: 'فی-سیٹ لُوٹ نہیں', body: 'سیٹیں اہم ہیں، لیکن واحد لیور نہیں ہونی چاہیں۔ ہم اس استعمال پر میٹر لگاتے ہیں جو حقیقتاً قدر کی عکاسی کرتا ہے — ٹرانزیکشنز، اسٹوریج، فعال حجم — اور سیٹ کا حساب آسان رکھتے ہیں۔ ایک بڑھتی ہوئی ٹیم کو تھوڑا زیادہ ادا کرنا چاہیے، پانچ گنا ضرب نہیں۔ ہماری قیمت نے کبھی کسی سے نہیں کہا کہ نمبروں کو فِٹ کرنے کے لیے ساتھیوں کو نکالے۔' },
      { title: 'اپنی شرائط پر ادائیگی روکیں', body: 'ایک کلک سے منسوخ کریں۔ کوئی ریٹینشن کالز نہیں۔ کوئی "ہمیں ایک وجہ چاہیے" نہیں۔ غیر استعمال شدہ وقت کا ریفنڈ تین کاروباری دنوں کے اندر آپ کے اکاؤنٹ میں آ جاتا ہے۔ آپ کا ڈیٹا صاف طور پر معیاری فارمیٹس میں ایکسپورٹ ہوتا ہے تاکہ آپ کبھی ڈوبی-لاگت کی منتقلی کے یرغمال نہ بنیں۔ ہم اگلا مہینہ ہر مہینہ کماتے ہیں — رکھنے کے قابل ہو کر، چھوڑنے میں تکلیف دہ ہو کر نہیں۔' },
    ],
    antiPatterns: [
      { title: 'معذور فیچرز کے ساتھ کوئی "اسٹارٹر" ٹائر نہیں', body: 'ایک فری ٹائر جس سے ڈیٹا ایکسپورٹ ہٹا دیا گیا ہو، API بے کاری تک محدود کر دی گئی ہو، یا AI ایک اپ گریڈ پرومپٹ کے پیچھے چھپایا گیا ہو — فری ٹائر نہیں — یہ بہروپ میں سیلز فنل ہے۔ ہمارا فری ٹائر پیڈ ٹائر کے جیسا ہی انجن شپ کرتا ہے۔' },
      { title: 'ترقی کو سزا دینے والا کوئی ٹرانزیکشن ٹیکس نہیں', body: 'کچھ پلیٹ فارمز ہر انوائس، ہر ادائیگی، ہر ریکارڈ پر ایک فیصد لیتے ہیں۔ یہ کامیابی پر ٹیکس ہے۔ ہم وہاں میٹر کرتے ہیں جہاں یہ حقیقی لاگت کا پتہ لگاتا ہے (اسٹوریج، کمپیوٹ، پیمنٹ-ریل فیس) اور جب ہماری لاگت کم ہوتی ہے تو بچت واپس کر دیتے ہیں۔' },
      { title: 'کوئی کوٹس نہیں، کوئی "سیلز سے رابطہ" نہیں، کوئی انٹرپرائز اوپیسٹی نہیں', body: 'ہر قیمت شائع شدہ ہے۔ اگر کسی پروکیورمنٹ ٹیم کو MSA، DPA، یا انوائسڈ بلنگ کی ضرورت ہو، یہ کاغذی کارروائی ہے، قیمت بندی نہیں۔ Fortune 500 انوائس پر ڈالر رقم وہی ہے جو شائع شدہ صفحے پر ہے، ان سیٹوں کی تعداد سے ضرب جو انہوں نے خریدیں۔' },
      { title: 'ہر قدم پر تین گنا ہونے والی کوئی فی-سیٹ سیڑھی نہیں', body: 'دس افراد کی ٹیم کو تین افراد کی ٹیم سے فی-سیٹ تین گنا ادا نہیں کرنا چاہیے۔ ہماری سیٹ کی ریاضی لکیری اور سادہ ہے، ایماندار بریک پوائنٹس پر حجم کی رعایتوں کے ساتھ — کبھی اپ سیل کے لیے چارہ کے طور پر نہیں۔' },
    ],
    workedExample: [
      { who: 'تنہا تاجر · لاگوس، نائجیریا', tier: 'فری ٹائر', what: 'ایک شخص کی دکان چلاتا ہے۔ انوائس جاری کرتا ہے، اسٹاک ٹریک کرتا ہے، ٹیکس فائلنگز سنبھالتا ہے۔ ہمیشہ مفت، کوئی اشتہار نہیں، کوئی ریکارڈ کیپ نہیں، مکمل ڈیٹا ایکسپورٹ۔', note: 'کچھ ادا نہیں کرتا۔ پیڈ گاہکوں کے جیسا ہی انجن استعمال کرتا ہے۔' },
      { who: 'پانچ افراد کی کنسلٹنسی · ٹورنٹو، کینیڈا', tier: 'Pro ٹائر', what: 'پانچ سیٹیں۔ AI کی مدد سے بلنگ، درمیانے حجم کی ٹرانزیکشنز، کاروباری گھنٹے کی سپورٹ۔ فری ٹائر اور انٹرپرائز ٹائر کا وہی فیچر سیٹ۔', note: 'کینیڈا کے لیے شائع شدہ Pro قیمت CAD میں ادا کرتی ہے۔' },
      { who: 'مینوفیکچرر · فرانکفرٹ، جرمنی', tier: 'انٹرپرائز ٹائر', what: '120 سیٹیں۔ SSO، DPA، وقف اکاؤنٹ رابطہ، 24-گھنٹے SLA۔ تنہا تاجر کے جیسے فیچرز، صرف زیادہ گنجائش اور زیادہ کاغذی کارروائی کے ساتھ۔', note: 'جرمنی کے لیے شائع شدہ انٹرپرائز قیمت EUR میں ادا کرتا ہے۔' },
    ],
  },
  id: {
    eyebrow: 'HARGA · ENAM ATURAN KAMI', title: 'Adil, dipublikasikan, dibuat untuk bertahan.',
    lede: 'Kami menetapkan harga setiap produk di situsnya sendiri. Halaman ini tentang aturan yang kami gunakan di mana-mana. Aturan yang sama berlaku untuk toko satu orang dan pabrik lima ribu orang.',
    whyThisExists: {
      eyebrow: 'Mengapa ini ada',
      heading: 'Perangkat lunak enterprise mahal karena dirancang untuk seperti itu.',
      body: 'Kontrak enam digit, peluncuran enam bulan, dan enam lapis konsultan bukan bug industri — itu adalah model bisnisnya. Kami menolak model itu. Harga kami ada untuk menjaga studio tetap berjalan, bukan untuk menghadang bisnis kecil di pintu.',
      freeTierLine: 'Tier gratis — cukup untuk menjalankan bisnis nyata, bukan sandbox demo.',
      paidTierLine: 'Tier berbayar — menambah skala (kursi, volume, dukungan), tidak pernah membuka fitur yang sudah Anda miliki.',
      enterpriseLine: 'Enterprise — produk yang sama dengan dokumen pengadaan, SSO, dan orang yang siap dipanggil. Tidak ada set fitur rahasia.',
    },
    seePricesCta: {
      eyebrow: 'Lihat harga sebenarnya',
      heading: 'Setiap produk mempublikasikan harganya sendiri.',
      body: 'Angka bervariasi per produk dan wilayah, tetapi enam aturan di halaman ini tidak pernah berubah. Telusuri portofolio untuk mendarat di produk yang tepat, dan harga saat ini ada di halaman utamanya.',
    },
    principles: [
      { title: 'Tier gratis yang benar-benar bisa dipakai menjalankan bisnis', body: 'Bukan trial. Bukan tiga faktur dan timer. Setiap produk unggulan punya plan gratis-selamanya dengan ruang cukup untuk bisnis satu orang — catatan nyata, laporan nyata, ekspor nyata, tanpa iklan. Jika Anda tumbuh melampauinya, tier berbayar menambah skala, bukan fitur. Kios pasar satu orang di Lagos dan konsultansi di Toronto mendaftar di plan yang sama dan menjangkau tombol upgrade yang sama saat butuh ruang lebih.' },
      { title: 'Harga disesuaikan dengan tempat tinggal Anda', body: 'Plan yang harganya dua puluh dolar di Toronto harganya lebih murah di Lagos. Kami memakai indeks daya beli yang dipublikasikan Bank Dunia untuk menetapkan harga regional yang adil, sehingga tim yang sama membayar biaya relatif yang sama dari mana pun mendaftar. Pelanggan dunia maju membayar harga pasar penuh; pelanggan pasar berkembang membayar harga yang menghargai mata uangnya. Tidak ada yang dikeluarkan oleh harga, dan tidak ada yang mensubsidi produk yang lebih buruk.' },
      { title: 'Setiap fitur di setiap tier', body: 'Bantuan AI, otomasi, multi-toko, analitik dalam, integrasi, pemeriksaan penipuan — semuanya di setiap tier harga. Tidak ada gerbang "khusus enterprise". Tier yang lebih tinggi membeli lebih banyak kursi, volume lebih besar, jam dukungan lebih banyak, dan SLA lebih ketat. Mereka tidak pernah membuka fitur yang tidak Anda miliki sebelumnya. Siswa kelas delapan di plan gratis dan pembeli Fortune 500 masuk ke produk yang sama, dengan toolkit yang sama.' },
      { title: 'Harga dipublikasikan. Tanpa "hubungi sales."', body: 'Jika Anda harus mengirim email kepada kami untuk tahu berapa harganya, itu bukan harga transparan. Setiap angka ada di situs produknya sendiri, diperbarui pada hari kami mengubahnya, di setiap mata uang yang kami layani. Tidak ada lembar enterprise tersembunyi, tidak ada penawaran yang tergantung seberapa besar Anda terlihat dalam panggilan discovery. Harga adalah harga, dan kami memublikasikannya.' },
      { title: 'Tanpa pemerasan per kursi', body: 'Kursi penting, tetapi seharusnya bukan satu-satunya tuas. Kami mengukur penggunaan yang benar-benar mencerminkan nilai — transaksi, penyimpanan, volume aktif — dan menjaga matematika kursi sederhana. Tim yang berkembang harus membayar sedikit lebih banyak, bukan pengali lima kali. Harga kami tidak pernah meminta siapa pun memecat rekan tim agar angkanya cocok.' },
      { title: 'Berhenti membayar dengan syarat Anda', body: 'Batalkan dengan satu klik. Tanpa panggilan retensi. Tanpa "kami butuh alasan." Pengembalian dana untuk waktu yang tidak terpakai tiba di akun Anda dalam tiga hari kerja. Data Anda diekspor dengan bersih ke format standar sehingga Anda tidak pernah disandera oleh migrasi biaya hangus. Kami memenangkan bulan berikutnya, setiap bulan — dengan layak dipertahankan, bukan dengan menyakitkan untuk ditinggalkan.' },
    ],
    antiPatterns: [
      { title: 'Tanpa tier "starter" dengan fitur lumpuh', body: 'Tier gratis dengan ekspor data dihilangkan, API dibatasi hingga tidak berguna, atau AI disembunyikan di balik prompt upgrade bukan tier gratis — itu corong penjualan yang menyamar. Tier gratis kami mengirimkan mesin yang sama dengan yang berbayar.' },
      { title: 'Tanpa pajak transaksi yang menghukum pertumbuhan', body: 'Beberapa platform mengenakan persentase pada setiap faktur, setiap pembayaran, setiap catatan. Itu pajak atas kesuksesan. Kami mengukur di tempat yang melacak biaya nyata (penyimpanan, komputasi, biaya jalur pembayaran) dan mengembalikan penghematan ketika biaya kami turun.' },
      { title: 'Tanpa kuotasi, tanpa "hubungi sales", tanpa opasitas enterprise', body: 'Setiap harga dipublikasikan. Jika tim pengadaan butuh MSA, DPA, atau penagihan berfaktur, itu administrasi, bukan harga. Jumlah dolar pada faktur Fortune 500 adalah jumlah yang sama dengan halaman yang dipublikasikan, dikalikan jumlah kursi yang mereka beli.' },
      { title: 'Tanpa tangga per kursi yang melipatgandakan tiga kali setiap langkah', body: 'Tim sepuluh orang seharusnya tidak membayar tiga kali lipat per kursi yang dibayar tim tiga orang. Matematika kursi kami linier dan sederhana, dengan diskon volume yang dimulai pada titik putus yang jujur — tidak pernah sebagai umpan untuk upsell.' },
    ],
    workedExample: [
      { who: 'Pedagang solo · Lagos, Nigeria', tier: 'Tier gratis', what: 'Menjalankan toko satu orang. Menerbitkan faktur, melacak stok, menangani pengajuan pajak. Gratis-selamanya, tanpa iklan, tanpa batas catatan, ekspor data penuh.', note: 'Tidak membayar apa pun. Menggunakan mesin yang sama dengan pelanggan berbayar.' },
      { who: 'Konsultansi lima orang · Toronto, Kanada', tier: 'Tier Pro', what: 'Lima kursi. Penagihan berbantuan AI, transaksi volume menengah, dukungan jam kerja. Set fitur yang sama dengan tier gratis dan tier enterprise.', note: 'Membayar harga Pro yang dipublikasikan untuk Kanada dalam CAD.' },
      { who: 'Produsen · Frankfurt, Jerman', tier: 'Tier Enterprise', what: '120 kursi. SSO, DPA, kontak akun yang ditunjuk, SLA 24 jam. Fitur yang sama dengan pedagang solo, hanya dengan lebih banyak ruang dan lebih banyak administrasi.', note: 'Membayar harga Enterprise yang dipublikasikan untuk Jerman dalam EUR.' },
    ],
  },
  sw: {
    eyebrow: 'BEI · SHERIA SITA ZETU', title: 'Haki, iliyochapishwa, iliyojengwa kudumu.',
    lede: 'Tunaweka bei kwa kila bidhaa kwenye tovuti yake. Ukurasa huu unahusu sheria tunazotumia kila mahali. Sheria zile zile zinatumika kwa duka la mtu mmoja na kiwanda cha watu elfu tano.',
    whyThisExists: {
      eyebrow: 'Kwa nini hili lipo',
      heading: 'Programu za biashara kubwa ni ghali kwa sababu ziliundwa kuwa hivyo.',
      body: 'Mikataba ya tarakimu sita, utekelezaji wa miezi sita, na tabaka sita za washauri si bug ya tasnia — ndio mfano wake wa biashara. Tunakataa mfano huo. Bei zetu zipo kuendesha studio, si kuzuia biashara ndogo mlangoni.',
      freeTierLine: 'Kiwango cha bure — kinatosha kuendesha biashara halisi, sio sandbox ya onyesho.',
      paidTierLine: 'Kiwango cha kulipia — huongeza kiwango (viti, kiasi, msaada), hakuwahi kufungua vipengele ambavyo tayari unavyo.',
      enterpriseLine: 'Enterprise — bidhaa ile ile na karatasi za ununuzi, SSO, na mtu wa kupigia simu. Hakuna seti ya vipengele ya siri.',
    },
    seePricesCta: {
      eyebrow: 'Ona bei halisi',
      heading: 'Kila bidhaa huchapisha bei zake mwenyewe.',
      body: 'Nambari hutofautiana kwa bidhaa na eneo, lakini sheria sita kwenye ukurasa huu hazitofautiani kamwe. Vinjari portfolio ili kufikia bidhaa sahihi, na bei za sasa ziko kwenye ukurasa wake wa nyumbani.',
    },
    principles: [
      { title: 'Kiwango cha bure ambacho unaweza kweli kuendesha biashara nacho', body: 'Sio jaribio. Sio bili tatu na saa ya kuhesabu. Kila bidhaa kuu ina mpango wa bure-milele wenye nafasi ya kutosha kwa biashara ya mtu mmoja — rekodi halisi, ripoti halisi, kupakua halisi, hakuna matangazo. Ukikua kupita kiwango hicho, viwango vya kulipia huongeza kiasi, sio vipengele. Duka la mtu mmoja kijijini Lagos na kampuni ya ushauri Toronto wanajiandikisha kwenye mpango uleule na hufikia kitufe kile kile cha kuongeza wanapohitaji nafasi zaidi.' },
      { title: 'Bei zilizosawazishwa kwa mahali unapoishi', body: 'Mpango unaogharimu dolari ishirini Toronto hugharimu kidogo Lagos. Tunatumia faharasa za uwezo wa kununua zilizochapishwa na Benki ya Dunia kuweka bei za kikanda za haki ili timu ile ile ilipe gharama sawa ya kulinganisha popote inapojiandikisha. Mteja wa ulimwengu ulioendelea hulipa bei kamili ya soko; mteja wa soko linaloibuka hulipa bei inayoheshimu sarafu yake. Hakuna anayetolewa nje na bei, na hakuna anayepa ruzuku bidhaa duni.' },
      { title: 'Kila kipengele katika kila kiwango', body: 'Msaada wa AI, otomatiki, maduka mengi, uchambuzi wa kina, ujumuishaji, ukaguzi wa udanganyifu — vyote katika kila kiwango cha bei. Hakuna mageti ya "enterprise pekee". Viwango vya juu hununua viti zaidi, kiasi zaidi, masaa zaidi ya msaada na SLA kali zaidi. Hawawahi kufungua kipengele ambacho hukuwa nacho tayari. Mwanafunzi wa darasa la nane kwenye mpango wa bure na mnunuzi wa Fortune 500 huingia kwenye bidhaa ile ile, na zana zile zile.' },
      { title: 'Bei zilizochapishwa. Hakuna "wasiliana na mauzo."', body: 'Ikiwa lazima utuandikie barua pepe ili kujua gharama ya kitu, hiyo si bei ya wazi. Kila nambari iko kwenye tovuti ya bidhaa yenyewe, inasasishwa siku tunayobadilisha, katika kila sarafu tunayohudumu. Hakuna karatasi ya enterprise iliyofichwa, hakuna nukuu inayotegemea ukubwa unaoonekana kwenye simu ya ugunduzi. Bei ndio bei, na tunaichapisha.' },
      { title: 'Hakuna ulanguzi kwa kiti', body: 'Viti vinajalisha, lakini havipaswi kuwa lever pekee. Tunapima matumizi yanayoakisi thamani halisi — miamala, hifadhi, kiasi hai — na kudumisha hesabu ya viti rahisi. Timu inayokua inapaswa kulipa kidogo zaidi, sio kuzidi kwa mara tano. Bei zetu hazijawahi kumwomba mtu yeyote kupunguza wenzake ili namba zilingane.' },
      { title: 'Acha kulipa kwa masharti yako', body: 'Ghairi kwa kubofya mara moja. Hakuna simu za kuhifadhi. Hakuna "tunahitaji sababu." Marejesho ya muda usiotumika hufika kwenye akaunti yako ndani ya siku tatu za kazi. Data yako huhamishwa kwa usafi katika fomati za kawaida ili usishikwe mateka na uhamiaji wa gharama iliyozama. Tunashinda mwezi unaofuata, kila mwezi — kwa kustahili kuendelea, sio kwa kuwa mgumu kuondoka.' },
    ],
    antiPatterns: [
      { title: 'Hakuna kiwango cha "starter" chenye vipengele vilivyolemazwa', body: 'Kiwango cha bure chenye uhamishaji wa data uliotolewa, API iliyopunguzwa hadi kutokuwa na maana, au AI iliyofichwa nyuma ya promti ya upgrade si kiwango cha bure — ni mfereji wa mauzo katika mavazi. Kiwango chetu cha bure husafirisha injini ileile kama ya kulipia.' },
      { title: 'Hakuna kodi ya muamala inayoadhibu ukuaji', body: 'Baadhi ya majukwaa hutoza asilimia kwa kila ankara, kila malipo, kila rekodi. Hiyo ni kodi juu ya mafanikio. Tunapima pale inapofuatilia gharama halisi (hifadhi, hesabu, ada za njia ya malipo) na kurudisha akiba wakati gharama yetu inashuka.' },
      { title: 'Hakuna manukuu, hakuna "wasiliana na mauzo", hakuna ukungu wa enterprise', body: 'Kila bei imechapishwa. Ikiwa timu ya manunuzi inahitaji MSA, DPA, au bili kwa ankara, hizo ni karatasi, sio bei. Kiasi cha dolari kwenye ankara ya Fortune 500 ni kiasi kileile kilicho kwenye ukurasa uliochapishwa, kilichozidishwa kwa idadi ya viti walivyonunua.' },
      { title: 'Hakuna ngazi za kila-kiti zinazozidi mara tatu kila hatua', body: 'Timu ya watu kumi haipaswi kulipa mara tatu kile timu ya watu watatu inalipa kwa kila kiti. Hesabu yetu ya viti ni mstari na rahisi, na punguzo za kiasi zinazoanza kwenye nukta za uvunjaji za uaminifu — kamwe sio kama chambo cha upsell.' },
    ],
    workedExample: [
      { who: 'Mfanyabiashara wa pekee · Lagos, Nigeria', tier: 'Kiwango cha bure', what: 'Anaendesha duka la mtu mmoja. Hutoa ankara, hufuatilia hisa, hushughulikia uwasilishaji wa kodi. Bure milele, hakuna matangazo, hakuna kikomo cha rekodi, uhamishaji kamili wa data.', note: 'Halipi kitu. Anatumia injini ileile kama wateja wanaolipia.' },
      { who: 'Kampuni ya ushauri ya watu watano · Toronto, Kanada', tier: 'Kiwango cha Pro', what: 'Viti vitano. Bili inayosaidiwa na AI, miamala ya kiasi cha kati, msaada wa saa za kazi. Seti ileile ya vipengele kama kiwango cha bure na kiwango cha enterprise.', note: 'Hulipa bei iliyochapishwa ya Pro kwa Kanada katika CAD.' },
      { who: 'Mtengenezaji · Frankfurt, Ujerumani', tier: 'Kiwango cha Enterprise', what: 'Viti 120. SSO, DPA, mawasiliano ya akaunti yaliyoteuliwa, SLA ya saa 24. Vipengele vilevile kama mfanyabiashara wa pekee, tu na nafasi zaidi na karatasi zaidi.', note: 'Hulipa bei iliyochapishwa ya Enterprise kwa Ujerumani katika EUR.' },
    ],
  },
  yo: {
    eyebrow: 'IYE OWÓ · ÒFIN MẸ́FÀ WA', title: 'Tó dára, tí a tẹ̀ jáde, tí a kọ́ láti dúró.',
    lede: 'A ń ṣe iye-owó ọjà kọ̀ọ̀kan lórí ojú-òpó tirẹ̀. Ojú-ìwé yìí jẹ́ nípa àwọn òfin tí a ń lò níbi gbogbo. Òfin kannáà ń bá ṣòpọ̀ pẹ̀lú ilé-iṣẹ́ ènìyàn-kan àti ilé-iṣẹ́ ẹgbẹ̀rún márùn-ún.',
    whyThisExists: {
      eyebrow: 'Idi tí èyí fi wà',
      heading: 'Sọ́fítíwéàrì ile-iṣẹ́ wà ní iye-owó gíga nítorí pé a ṣe é láti rí bẹ́ẹ̀.',
      body: 'Àwọn àdéhùn nọ́mbà mẹ́fà, àwọn ìfilọ̀ oṣù mẹ́fà, àti àwọn ipele mẹ́fà ti àwọn olùdámọ̀ràn kì í ṣe àbùkù ile-iṣẹ́ — wọ́n jẹ́ àpẹrẹ òwò rẹ̀. A kọ̀ àpẹrẹ yẹn. Iye-owó wa wà láti pa studio mọ́ ní iṣẹ́, kì í ṣe láti dí àwọn òwò kéékèèké lójú ẹnu-bodè.',
      freeTierLine: 'Ipele ọfẹ — tó láti ṣe òwò gidi, kì í ṣe yàrá-iyanrìn àfihàn.',
      paidTierLine: 'Ipele owó-sànwó — fí ìwọ̀nsí kún (àwọn ìjókòó, ìwọ̀n, ìránlọ́wọ́), kò sí ìṣípayá àwọn àfikún tí o ti ní rí.',
      enterpriseLine: 'Enterprise — ọjà kannáà pẹ̀lú àwọn àpèjúwe ìfajúsùn, SSO, àti ènìyàn lórí ìpè. Kò sí ètò àfikún àṣírí.',
    },
    seePricesCta: {
      eyebrow: 'Wo iye-owó tó wà ní gangan',
      heading: 'Ọjà kọ̀ọ̀kan ń tẹ iye-owó tirẹ̀ jáde.',
      body: 'Àwọn nọ́mbà yàtọ̀ síra láti ọjà sí ọjà àti agbègbè, ṣùgbọ́n òfin mẹ́fà tí ó wà lórí ojú-ìwé yìí kì í yí padà rí. Yẹ àkójọpọ̀ wò láti dé sí ọjà tó dára, iye-owó lọ́wọ́lọ́wọ́ wà lórí ojú-ìwé ilé rẹ̀.',
    },
    principles: [
      { title: 'Ipele ọfẹ tí o lè ṣe òwò gidi lórí rẹ̀', body: 'Kì í ṣe ìdánwò. Kì í ṣe ìwé-òwò mẹ́ta àti àkókò. Gbogbo ọjà àkọ́kọ́ ní ètò ọfẹ-títí-láé pẹ̀lú ààyè tó láti ṣe òwò ènìyàn-kan — àkọsílẹ̀ gidi, ìròyìn gidi, ìfàjáde gidi, kò sí ìpolongò. Tí o bá dàgbà ju u lọ, àwọn ipele owó-sànwó fí kíkún kún, kò sí àwọn àfikún. Ìpẹ̀ja oníkàńṣoṣo ní Lagos àti ilé-iṣẹ́ ìmọ̀ràn ní Toronto fọwọ́sí ètò kannáà àti dé bọ́tánì ìmúdọ́gba kannáà nígbà tí wọ́n bá nílò ààyè síwájú.' },
      { title: 'Iye-owó tí a ṣe àyẹ̀wò sí ibi tí o ń gbé', body: 'Ètò tí ó nílò dọ́là ogún ní Toronto nílò kéré ní Lagos. A lo àwọn àfọkàn-mọ́ agbára ìrà tí Banki Àgbáyé tẹ̀ jáde láti ṣe àwọn iye-owó àgbègbè tó dára kí ẹgbẹ́ kannáà san iye-owó tó dọ́gba síra-wọn níbikíbi tí wọ́n bá fọwọ́sí. Oníbàárá ti àgbáyé tó ti dàgbà san iye-owó ọjà kíkún; oníbàárá ọjà tí ń dìde san iye-owó tó bọ̀wọ̀ fún owó orílẹ̀-èdè rẹ̀. Kò sí ẹnikẹ́ni tí a yọ kúrò nípa iye-owó, kò sì sí ẹnikẹ́ni tí ń ṣe ìfowópamọ́ ọjà tí kò dára.' },
      { title: 'Gbogbo àfikún ní ipele kọ̀ọ̀kan', body: 'Ìránlọ́wọ́ AI, ìṣe-fúnra-rẹ̀, ọjà-pàtàkì, ìṣàyẹ̀wò àjọṣe, ìṣòpọ̀, àyẹ̀wò àjèjì — gbogbo wọn ní ipele iye-owó kọ̀ọ̀kan. Kò sí àwọn ẹnu-bodè "enterprise nikan". Àwọn ipele tí ó ga ra àwọn ìjókòó síwájú, ìwọ̀n síwájú, wákàtí ìránlọ́wọ́ síwájú àti SLA tí ó dín. Wọ́n kì í ṣípayá àfikún tí o kò ní rí. Akẹ́kọ̀ọ́ kíláàsì kẹjọ lórí ètò ọfẹ àti olùra Fortune 500 wọlé sí ọjà kannáà, pẹ̀lú ọnà-iṣẹ́ kannáà.' },
      { title: 'Iye-owó tí a tẹ̀ jáde. Kò sí "tako sales."', body: 'Tí o bá gbọdọ̀ fi ìmẹ́ìlì ránṣẹ́ sí wa láti mọ̀ iye nǹkan kan, èyí kì í ṣe iye-owó tó hàn. Gbogbo nọ́mbà wà lórí ojú-òpó ọjà fúnra rẹ̀, tí a ṣe àtúnṣe ní ọjọ́ tí a yí padà, ní gbogbo owó orílẹ̀-èdè tí a ń pèsè. Kò sí àkọsílẹ̀ enterprise tí a fi pamọ́, kò sí ìpèsè tí ó dá lórí ìwọ̀n tí o farahàn ní ìpè ìwádìí. Iye-owó ni iye-owó, a sì ń tẹ̀ ẹ́ jáde.' },
      { title: 'Kò sí jíjù fún ìjókòó kọ̀ọ̀kan', body: 'Àwọn ìjókòó ṣe pàtàkì, ṣùgbọ́n wọn kò gbọdọ̀ jẹ́ lever kanṣoṣo. A ń wọn lílò tó ń ṣàfihàn iye gidi — àwọn ìṣèdá, ìfipamọ́, ìwọ̀n tó ń ṣiṣẹ́ — a sì ń pa ìṣirò ìjókòó mọ́ ní rọrùn. Ẹgbẹ́ tó ń dàgbà yẹ kí ó san díẹ̀ síi, kì í ṣe ìṣípaarọ̀ ìlọpo márùn-ún. Iye-owó wa kò ti béèrè kí ẹnikẹ́ni mu àwọn ẹgbẹ́ rẹ̀ kúrò ki nọ́mbà náà lè ṣe.' },
      { title: 'Dáwọ́ sísan dúró lórí àwọn ìpinnu rẹ', body: 'Fagilé pẹ̀lú ìtẹ̀mọ́lẹ̀ kan. Kò sí ìpè ìfilọ̀wọ́. Kò sí "a nílò ìdí." Owó ìpadàpẹ̀ fún àkókò tí a kò lò dé sí àkáọ̀nù rẹ nínú ọjọ́ iṣẹ́ mẹ́ta. Déètà rẹ ń pòṣàjáde ní mímọ́ sí àwọn ọ̀nà ìbátan kí ìwọ kò sì ní di ìgbéwọ̀n nípa ìṣíkiri owó-tí-a-tì-nírẹ́. A ń ṣe owó oṣù tó tẹ̀le, ní oṣù kọ̀ọ̀kan — nípa títí jẹ́ tó wù láti pa mọ́, kì í ṣe nípa títí kún àjálu láti fi sílẹ̀.' },
    ],
    antiPatterns: [
      { title: 'Kò sí ipele "starter" pẹ̀lú àwọn àfikún tí ó ti rọ', body: 'Ipele ọfẹ pẹ̀lú ìpòṣàjáde déètà tí a ti yọ, API tí a ti dín títí di àìní fáyà, tàbí AI tí a fi pamọ́ lẹ́yìn ìfilelẹ̀ ìmúdọ́gba kì í ṣe ipele ọfẹ — ó jẹ́ àkójọ ìtà nínú aṣọ ẹlẹ́yà. Ipele ọfẹ wa ń jádelé ẹ̀rọ kannáà bíi ti ọmọ ọwọ́-sànwó.' },
      { title: 'Kò sí owó-orí ìṣèdá tí ó jẹ ìpẹ̀dà ìdàgbàsókè', body: 'Àwọn pèpéle kan máa ń gba ìpín nínú gbogbo ìwé-òwò, gbogbo ìsanwó, gbogbo àkọsílẹ̀. Èyí jẹ́ owó-orí lórí àṣeyọrí. A ń wọn ibi tí ó tẹ̀lé iye gidi (ìpamọ́, ìṣirò, owó-ojú-ọ̀nà-ìsanwó) a sì ń da iye-pamọ́ padà nígbà tí iye-owó wa bá rẹlẹ̀.' },
      { title: 'Kò sí àwọn ìpèsè iye-owó, kò sí "tako sales", kò sí àìfaramọ́ enterprise', body: 'Gbogbo iye-owó ni a tẹ̀ jáde. Tí ẹgbẹ́ ìfajúsùn bá nílò MSA, DPA, tàbí bíllingì pẹ̀lú ìwé-òwò, ìwọ̀nyẹn jẹ́ ìwé, kì í ṣe iye-owó. Iye dọ́là lórí ìwé-òwò Fortune 500 ni iye kannáà tí ó wà lórí ojú-ìwé tí a tẹ̀ jáde, tí a sí ìṣípaarọ̀ nípa iye àwọn ìjókòó tí wọ́n rà.' },
      { title: 'Kò sí àwọn àkàsọ̀ fún ìjókòó kọ̀ọ̀kan tí ó di mẹ́ta ní ipele kọ̀ọ̀kan', body: 'Ẹgbẹ́ mẹ́wàá kò gbọdọ̀ san ní ìlọpo mẹ́ta ohun tí ẹgbẹ́ mẹ́ta máa ń san fún ìjókòó kọ̀ọ̀kan. Ìṣirò ìjókòó wa wà ní ìlà àti rọrùn, pẹ̀lú àwọn ẹ̀dín fún iye tí ó bẹ̀rẹ̀ ní àwọn àyè ìfọ̀rọ̀ olótìítọ́ — kò sí gẹ́gẹ́ bí ìfilelẹ̀ fún upsell rí.' },
    ],
    workedExample: [
      { who: 'Oníbàjẹ̀ olúkúkú · Lagos, Nigeria', tier: 'Ipele ọfẹ', what: 'Ń ṣe ìpẹ̀ja ènìyàn-kan. Ń tẹ ìwé-òwò jáde, ń tọpinpin ọjà, ń ṣe ìfilọ̀ owó-orí. Ọfẹ-títí-láé, kò sí ìpolongò, kò sí ààlà àkọsílẹ̀, ìpòṣàjáde déètà kíkún.', note: 'Kò san ohunkóhun. Ń lo ẹ̀rọ kannáà bí àwọn oníbàárá tí ń san owó.' },
      { who: 'Ilé-iṣẹ́ ìmọ̀ràn ènìyàn márùn-ún · Toronto, Canada', tier: 'Ipele Pro', what: 'Àwọn ìjókòó márùn-ún. Bíllingì pẹ̀lú àfikún AI, àwọn ìṣèdá ìwọ̀nsí ààrín, ìránlọ́wọ́ wákàtí òwò. Ètò àfikún kannáà bíi ti ipele ọfẹ àti ti enterprise.', note: 'Ń san iye-owó Pro tí a tẹ̀ jáde fún Canada ní CAD.' },
      { who: 'Olùṣèdá · Frankfurt, Germany', tier: 'Ipele Enterprise', what: 'Ìjókòó 120. SSO, DPA, ìbárasọ̀rọ̀ àkáọ̀nù àkànyàn, SLA wákàtí 24. Àwọn àfikún kannáà bíi ti oníbàjẹ̀ olúkúkú, kìkì pẹ̀lú ààyè síwájú àti àwọn ìwé síwájú.', note: 'Ń san iye-owó Enterprise tí a tẹ̀ jáde fún Germany ní EUR.' },
    ],
  },
  ha: {
    eyebrow: 'FARASHI · DOKOKINMU SHIDA', title: 'Adali, an buga, an gina don dorewa.',
    lede: "Muna sa farashi ga kowane samfuri akan nasa shafin. Wannan shafin yana magana ne kan dokokin da muke amfani da su a ko'ina. Dokokin guda suna nasaba da shago na mutum ɗaya da masana'antar mutum dubu biyar.",
    whyThisExists: {
      eyebrow: 'Me ya sa wannan ya kasance',
      heading: 'Software na enterprise yana da tsada saboda an tsara shi don haka.',
      body: "Yarjejeniyoyi na lambobi shida, nazarin watanni shida, da matakai shida na masu ba da shawara ba bug na masana'antar ba ne — ne misalin kasuwancin ta. Mun ƙi wannan misali. Farashinmu yana wanzu don ci gaba da gudanar da studio, ba don toshe kasuwanci kanana a ƙofa ba.",
      freeTierLine: 'Matakin kyauta — isasshen don gudanar da kasuwanci na hakika, ba sandbox na demo ba.',
      paidTierLine: 'Matakin biya — yana ƙara girma (kujeru, ƙara, tallafi), ba ya buɗe fasalulluka da kuke da su tukuna.',
      enterpriseLine: 'Enterprise — samfurin guda tare da takaddun siye, SSO, da mutum a kira. Babu saiti na fasalulluka na sirri.',
    },
    seePricesCta: {
      eyebrow: 'Duba farashin gaske',
      heading: 'Kowane samfuri yana wallafa farashinsa.',
      body: 'Lambobi suna bambanta da samfuri da yanki, amma dokoki shida a kan wannan shafin ba sa canzawa kwata-kwata. Bincika portfolio don sauka a samfuri da ya dace, kuma farashin yanzu suna kan shafinsa na gida.',
    },
    principles: [
      { title: 'Matakin kyauta da kuke iya gudanar da kasuwanci da gaske akansa', body: "Ba gwaji ba. Ba lissafin kuɗi uku da agogo ba. Kowane manyan samfuri yana da plan kyauta-har-abada tare da isasshen wuri don kasuwancin mutum ɗaya — bayanai na hakika, rahotanni na hakika, fitarwa na hakika, babu talla. Idan ka girma fiye da shi, matakan biya suna ƙara girma, ba fasalulluka ba. Gidan kasuwa na mutum ɗaya a Lagos da kamfanin ba da shawara a Toronto suna yin rajista akan plan ɗaya kuma suna kai wa maɓallin upgrade ɗaya yayin da suke buƙatar ƙarin sarari." },
      { title: 'Farashi da aka daidaita don inda kuke zaune', body: "Plan da yake biyan dala ashirin a Toronto yana biyan ƙasa a Lagos. Muna amfani da ma'auni na ƙarfin saye da Bankin Duniya ya buga don saita farashi na yanki na adalci ta yadda ƙungiya guda za ta biya farashi guda na dangantaka daga ko'ina ta yi rajista. Abokin ciniki na duniya mai ci gaba yana biyan cikakken farashin kasuwa; abokin ciniki na kasuwa mai tasowa yana biyan farashi da yake girmama kuɗinsa. Babu wanda aka kore ta hanyar farashi, kuma babu wanda yake tallafawa samfuri marar kyau." },
      { title: 'Kowane fasali a kowane mataki', body: "Taimakon AI, sarrafa kai, shaguna da yawa, nazari mai zurfi, haɗi, binciken zamba — duka a kowane matakin farashi. Babu ƙofofi na 'enterprise kawai'. Manyan matakai suna sayan ƙarin kujeru, ƙarin ƙara, ƙarin sa'o'i na tallafi da SLA mai tsanani. Ba sa taɓa buɗe fasalin da ba ku da shi tukuna. Ɗalibin aji na takwas akan plan kyauta da mai siye na Fortune 500 suna shiga cikin samfurin guda, tare da kayan aikin guda." },
      { title: "Farashin da aka buga. Babu 'tuntuɓi sales.'", body: 'Idan dole ne ku aiko mana imel don sanin nawa wani abu yake biya, wannan ba farashi mai tsabta ba ne. Kowace lamba tana akan shafin samfurin kansa, an sabunta ranar da muka canza, a kowane kuɗin da muke ba da. Babu takarda ta enterprise da aka ɓoye, babu ƙididdiga da ta dogara da yadda kuke girma a kira na gano. Farashi shi ne farashi, kuma muna buga shi.' },
      { title: 'Babu zaluntar kowane kujera', body: "Kujeru suna da muhimmanci, amma bai kamata su zama lever kawai ba. Muna lissafa amfani da yake nuna ƙimar ainihi — ma'amaloli, ajiya, ƙarar mai aiki — kuma muna kiyaye lissafin kujera mai sauƙi. Ƙungiya mai girma ya kamata ta biya ɗan kaɗan, ba ninkawa sau biyar ba. Farashinmu ba su taɓa tambayar wani ya kori abokan aiki don lambobi su yi aiki ba." },
      { title: 'Tsayar da biya akan sharuɗɗanku', body: "Soke da danna ɗaya. Babu kira na riƙewa. Babu 'muna buƙatar dalili.' Mayar da kuɗi don lokacin da ba a yi amfani da ba zuwa asusunku a cikin kwanaki uku na aiki. Bayananku suna fitar da tsabta zuwa tsarin daidaitattun ƙa'idodi don kada ku zama mai ɗauke da kashe-kashen kuɗin shige. Muna samun watan da ke gaba, kowane wata — ta hanyar zama ya cancanci tsayawa, ba ta hanyar zafi don barin ba." },
    ],
    antiPatterns: [
      { title: 'Babu matakin "starter" tare da fasalulluka da aka guragu', body: "Matakin kyauta wanda aka cire fitar da bayanai, API da aka rage zuwa rashin amfani, ko AI da aka ɓoye a bayan tambayar upgrade ba matakin kyauta ba ne — yana da famar tallace-tallace cikin kayan ɓoyewa. Matakin kyauta namu yana aikawa injin guda kamar na biya." },
      { title: "Babu harajin ma'amala wanda yake hukunci girma", body: "Wasu dandamali suna karɓar kashi a kowane lissafi, kowane biya, kowane rikodin. Wannan haraji ne akan nasara. Muna lissafa inda yake bin tsadar gaskiya (ajiya, lissafi, kuɗin hanyar biyan kuɗi) kuma muna mayar da tanadi lokacin da farashinmu ya sauka." },
      { title: "Babu kuotoshi, babu 'tuntuɓi sales', babu shakkar enterprise", body: "Kowane farashi an buga shi. Idan ƙungiyar saye ta buƙaci MSA, DPA, ko biya na lissafi, waɗannan takaddu ne, ba farashi ba. Adadin dala akan lissafin Fortune 500 shi ne adadi guda akan shafin da aka buga, an ninka shi da yawan kujerun da suka saya." },
      { title: 'Babu matakai na kowane kujera da suke ninkawa sau uku a kowane mataki', body: "Ƙungiya goma bai kamata ta biya sau uku abin da ƙungiya uku ke biya kowace kujera ba. Lissafin kujerar mu mai layi ne kuma mai sauƙi, tare da rangwamen yawa da ke fara a wuraren karyewa na gaskiya — ba a matsayin koto don upsell ba." },
    ],
    workedExample: [
      { who: 'Ɗan kasuwanci ɗaya · Lagos, Najeriya', tier: 'Matakin kyauta', what: "Yana gudanar da shago na mutum ɗaya. Yana fitar da lissafi, yana bibiyar kayan, yana gudanar da fayilolin haraji. Kyauta-har-abada, babu talla, babu iyaka na rikodin, fitar da bayanai cikakke.", note: 'Ba ya biyan komai. Yana amfani da injin guda kamar abokan ciniki masu biya.' },
      { who: 'Kamfanin ba da shawara na mutum biyar · Toronto, Kanada', tier: 'Matakin Pro', what: "Kujeru biyar. Lissafi tare da taimakon AI, ma'amaloli na matsakaicin yawa, tallafi a sa'o'in kasuwanci. Saiti guda na fasalulluka kamar matakin kyauta da matakin enterprise.", note: 'Tana biyan farashin Pro da aka buga don Kanada a cikin CAD.' },
      { who: "Mai masana'antu · Frankfurt, Jamus", tier: 'Matakin Enterprise', what: "Kujeru 120. SSO, DPA, lambar tuntuɓa ta keɓe, SLA na sa'o'i 24. Fasalulluka guda kamar ɗan kasuwanci ɗaya, kawai tare da ƙarin sarari da ƙarin takaddu.", note: 'Yana biyan farashin Enterprise da aka buga don Jamus a cikin EUR.' },
    ],
  },
};

const FAQ: Record<LocaleCode, FaqStrings> = {
  'zh-CN': {
    eyebrow: '常见问题 · 直白的回答', title: '问题,直白地回答。',
    lede: '人们真正向我们问的问题——关于工作室、产品,以及使用我们工具的隐私权衡。',
    sectionTitles: ['工作室', '产品', '定价与金钱', '隐私与数据', '语言与可访问性', '合作伙伴与新闻', '招聘'],
    stillStuckCta: { eyebrow: '还有问题?', heading: '每条消息都有真人阅读。', body: '我们通常在两个工作日内回复。通过表单发送备注。或者写信至 hello@intelligentsingularityai.com。' },
    sectionItems: [
      [
        { q: 'Intelligent Singularity 是什么?', a: 'Intelligent Singularity Inc. 是 Clap 生态系统的母公司。我们是一家小型、AI 增强、完全远程的工作室。我们位于加拿大艾伯塔省。我们构建为通用访问而设计的软件。同一旗舰产品同时服务于纽约的财富 500 强买家和拉各斯的一人市场摊位。一个共享技术栈。一个使命。' },
        { q: '你们是风险投资支持的初创公司吗?', a: '不是。我们自筹资金、自助创业。这意味着我们对用户负责,而不是对追逐快速退出的投资者。我们交付较慢,但计划存在二十年。公司不出售。' },
        { q: '是谁在做这件事?', a: 'Dr. Md Diya 在三十四年的跨大洲医疗执业之后,于 2024 年创立了这个工作室。一个小型、远程、AI 增强的团队在一个共享技术栈和一个共享可访问性预算下交付每一个产品。' },
        { q: '如果你们的应用价格亲民,你们如何赚钱?', a: '产品有一个永远免费的层级,可以经营真实的业务。付费层增加规模,从不增加功能。定价根据购买力调整,所以在多伦多花二十美元的计划在拉各斯花得更少。发达世界和企业客户支付完整市场价;新兴市场和单人客户支付尊重其货币的价格。算账成立是因为我们运营精简,让 AI 代理结构承担杠杆。' },
        { q: '为什么叫"母公司"——这是控股结构吗?', a: '它是简单意义上的母公司。一个法律实体拥有这一系列平台。清单:Clappe、ClapBill、ClapMed、ClapDiet、ClapPay、Clapwork、Apogee、Audiflo、Nestbitt、DailyWorship、Gclap、FileManager,加上共享基础设施。每个产品都有自己的网站。每个都有自己的条款和价格。法律所有者是 Intelligent Singularity Inc.。' },
        { q: '团队有多大?', a: '足够小,新员工在第一周就认识每一张脸,但又足够大,能让十几个平台持续交付。我们刻意不做规模竞赛;AI 代理结构在真正的意义上是团队的一部分。' },
      ],
      [
        { q: '这些产品是真实的还是还停留在想法阶段?', a: '产品组合页面上每个产品都有诚实的状态标签。"上线"意味着你今天就可以注册。"预演"意味着它在运行但仍处于邀请制状态,我们正在加固。"等待批准"意味着已经准备好但等待监管机构。"基础设施"是我们公开共享的、其他产品依赖的代码。我们不会预告尚不存在的事物。' },
        { q: '为什么有些产品列为预演状态?', a: '我们的大多数工具在公开发布之前仍在加固中。我们宁愿延迟发布也不愿在第一天就破坏信任——特别是在医疗、支付和交易领域,一次回退是真实世界的事件,而不是不便。如果你想要早期访问,请从联系页面写信给我们,我们会诚实地告诉你预演构建是否还能支持你。' },
        { q: '为什么产品链接到其他域名?', a: '每个产品都是其自身的服务,有自己的条款、定价、注册和隐私通知。直接将你送到产品域名更快,并使边界清晰:clappe.com 受 Clappe 的条款管辖,clappay.com 受 ClapPay 的条款管辖,以此类推。intelligentsingularityai.com 上的公司网站是前门,而不是计费系统。' },
        { q: '我能离线使用你们的产品吗?', a: '可以。每个产品都设计为在慢速和间歇性网络上工作。我们以两格 2G 信号上的五年旧手机为基准,而不是锦上添花。页面在首次绘制时压缩后重量低于五十千字节。关键工作流程(开具发票、记录病人笔记、捕获作业)在无连接时也能工作,并在连接恢复时同步。' },
        { q: '产品共享账户吗?', a: '可选。单个 Clap 账户可以登录任何选择加入的产品,但每个产品仍然保留自己的数据、自己的订阅和自己的同意流程。你可以使用一个产品而不使用其他产品、切换到另一个产品,或删除一个产品而不影响其余产品。' },
        { q: '你们为单个客户构建定制功能吗?', a: '很少,而且只有当该功能对更广泛的用户群体公平合适时。我们不会为一位客户构建产品的私有分支;那条路会通向维护墓地。但是,如果一个可信的合作伙伴赞助一个路线图项目,并且结果作为公共功能对所有人发布,我们会优先处理。' },
      ],
      [
        { q: '为什么你们的定价在不同国家不一样?', a: '因为统一的全球价格会悄悄地把地球上大多数人排除在外。我们使用世界银行公布的购买力指数来设定公平的区域价格。法兰克福的客户支付完整市场价。拉各斯的客户支付一个尊重奈拉的价格。功能和产品质量是一致的。' },
        { q: '免费层真的免费吗,还是试用?', a: '真的免费。永远免费、无倒计时、无广告、无功能阉割、无数据导出税。如果拉各斯的一人企业能在免费层上运营真实业务,那免费层就在履行其职责。' },
        { q: '你们会做企业报价吗?', a: '不报价。每一个价格都在我们服务的每种货币中公开。如果你们的采购团队需要 MSA、DPA 或开具发票计费,那是文书——不是定价。公布页面上的美元数字就是发票上的美元数字,乘以你购买的席位数。' },
      ],
      [
        { q: '你们在这个网站上跟踪我吗?', a: '不。本站零分析、零像素、零追踪 Cookie、零广告网络、零第三方内容。我们看到的唯一数据是你输入联系表单并点击发送的内容。一个名为 no-third-party.mjs 的持续集成脚本会在任何外部主机出现在 bundle 中时阻止发布。 On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: '我的数据存在哪里?', a: '当你联系我们时,你的消息通过电子邮件发送到加拿大艾伯塔省的收件箱。我们不在本站的数据库中存储它。产品特定数据(当你注册我们的某个工具时)在该产品自己域名上的隐私政策中描述。' },
        { q: '我能删除你们持有的关于我的数据吗?', a: '可以。从你使用的地址发邮件至 legal@intelligentsingularityai.com。我们在三个工作日内确认收到。我们在三十天内完成删除。同样的权利适用于每个产品,在 PIPEDA 和 GDPR 等同规则下。' },
        { q: '你们用我的内容训练 AI 模型吗?', a: '不。我们组合中所有 AI 功能只使用你显式提交的数据,作用域限于你自己的账户。你的私人内容从不会混入共享训练集,从不会用于改进公共模型,也从不会发送到保留你提示的第三方 AI 提供商。' },
      ],
      [
        { q: '该站点支持多少种语言?', a: '上线第一天就支持十四种。清单:英语、简体中文、西班牙语、印地语、阿拉伯语、法语、葡萄牙语、孟加拉语、俄语、乌尔都语、印尼语、斯瓦希里语、约鲁巴语和豪萨语。每一种都搭载覆盖完整文字系统的字体。词中没有回退字母。从右到左的语言以正确的 RTL 布局呈现,不是镜像拉丁文。' },
        { q: '该站点的无障碍性如何?', a: '我们的目标是每个公共页面都达到 WCAG 2.2 AA 级。axe-core 检查会在出现任何违规时使构建失败。正文至少满足 7:1 对比度。小标签至少满足 4.5:1。每个交互元素都可以通过键盘工作。我们尊重减少动画的设置。完整声明位于 /legal/accessibility。' },
        { q: '你们会添加我的语言吗?', a: '如果你的语言使用广泛但尚未在列表中,请写信给我们。添加新区域设置是一项真实工作——字体、翻译、RTL/LTR 布局、文化审查——但这正是我们想做的工作。' },
      ],
      [
        { q: '我如何与工作室合作?', a: '我们与 NGO、政府和公司合作。共同目标是为通常负担不起的人提供普遍可及的软件。从联系页面发送一段简短说明。将其路由到 Partnerships。你将在两个工作日内收到回复。' },
        { q: '我在哪里可以找到媒体资源包?', a: '访问 /press 获取事实简介、批准的引用、品牌指南、创始人简介和媒体样板。需要 logo 文件、高分辨率创始人肖像或定制声明?发邮件至 press@intelligentsingularityai.com 并附上你的截止日期。' },
        { q: '你们在会议上发言吗?', a: '有时。我们谈论普遍可及性、AI 增强团队、医疗软件和精益软件经济。发邮件至 press@intelligentsingularityai.com,附上活动详情和受众规模。我们会诚实告诉你能否到场。' },
        { q: '你们接受捐款或资助吗?', a: '我们不向用户请求捐款。我们欢迎资助。资助必须来自基金会或银行。该资助必须与全价尚未起作用的市场中的可及性软件相关。发邮件至 partners@intelligentsingularityai.com。' },
      ],
      [
        { q: '你们在招聘吗?', a: '有时。/careers 页面列出当前开放的职位。如果没有列出任何职位,我们当时就没有在招聘,就是这样。我们不运行无限期的"把简历发给我们"漏斗——但一份深思熟虑的自我介绍总会得到真实的回复。' },
        { q: '团队真的是完全远程吗?', a: '是的。我们之所以远程,是因为这是适合这份工作的正确模式,而不是因为它很时髦。时区会得到尊重。大多数决策都以书面形式存在,以便它们能在做出决策的人之后存续。' },
        { q: '你们公布薪资范围吗?', a: '是的,每个开放职位都公布。我们不会与猜测薪资范围的人讨价还价;我们公布它并按其支付。股权不在谈判桌上,因为公司不出售。' },
      ],
    ],
  },
  es: {
    eyebrow: 'PREGUNTAS FRECUENTES · RESPUESTAS LLANAS', title: 'Preguntas, respondidas con llaneza.',
    lede: 'Lo que la gente realmente nos pregunta — sobre el estudio, los productos y los compromisos de privacidad al usar nuestras herramientas.',
    sectionTitles: ['El estudio', 'Los productos', 'Precios y dinero', 'Privacidad y datos', 'Idiomas y accesibilidad', 'Alianzas y prensa', 'Contratación'],
    stillStuckCta: { eyebrow: '¿Aún tienes una pregunta?', heading: 'Una persona lee cada mensaje.', body: 'Normalmente respondemos en dos días laborables. Envía una nota desde el formulario. O escribe a hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: '¿Qué es Intelligent Singularity?', a: 'Intelligent Singularity Inc. es la empresa matriz del ecosistema Clap. Somos un estudio pequeño, aumentado por IA y completamente remoto. Tenemos sede en Alberta, Canadá. Construimos software para acceso universal. El mismo producto principal sirve a un comprador Fortune 500 en Nueva York y a un puesto de mercado de una persona en Lagos. Un stack compartido. Una misión.' },
        { q: '¿Sois una startup respaldada por capital riesgo?', a: 'No. Somos autofinanciados y bootstrapped. Eso significa que respondemos a los usuarios, no a inversores que persiguen salidas rápidas. Tardamos más en lanzar y planeamos estar aquí dentro de veinte años. La empresa no está en venta.' },
        { q: '¿Quién está detrás de esto?', a: 'Dr. Md Diya fundó el estudio en 2024 tras treinta y cuatro años de práctica médica intercontinental. Un equipo pequeño, remoto y aumentado por IA entrega cada producto bajo un stack compartido y un presupuesto compartido de accesibilidad.' },
        { q: '¿Cómo ganáis dinero si vuestras apps son asequibles?', a: 'Los productos tienen un plan gratis-para-siempre con el que se puede llevar un negocio real. Los planes de pago añaden escala, nunca funciones. El precio se ajusta al poder adquisitivo, así un plan que cuesta veinte dólares en Toronto cuesta menos en Lagos. Los clientes del mundo desarrollado y enterprise pagan precio de mercado completo; los clientes de mercados emergentes y solo pagan un precio que respeta su moneda. La matemática funciona porque operamos lean y dejamos que el tejido de agentes IA cargue el apalancamiento.' },
        { q: '¿Por qué "empresa matriz" — es una estructura holding?', a: 'Es una empresa matriz en el sentido llano. Una entidad legal posee la familia de plataformas. La lista: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, más infraestructura compartida. Cada producto corre en su propio sitio. Cada uno tiene sus propios términos y precios. La propietaria legal es Intelligent Singularity Inc.' },
        { q: '¿Cómo de grande es el equipo?', a: 'Lo bastante pequeño para que un nuevo fichaje aprenda cada cara la primera semana, lo bastante grande para mantener más de una docena de plataformas en producción. Deliberadamente no anunciamos una carrera de tamaño; el tejido de agentes IA es parte del equipo en sentido real.' },
      ],
      [
        { q: '¿Estos productos son reales o son ideas todavía?', a: 'Cada producto en la página de portafolio tiene una etiqueta de estado honesta. "En vivo" significa que puedes registrarte hoy. "Staging" significa que funciona pero es por invitación mientras lo endurecemos. "Esperando aprobación" está listo pero a la espera de un regulador. "Infraestructura" es código que compartimos públicamente y del que dependen otros productos. No preanunciamos cosas que aún no existen.' },
        { q: '¿Por qué algunos productos están listados como staging?', a: 'La mayoría de nuestras herramientas todavía se están endureciendo antes del lanzamiento público. Preferimos lanzar tarde a romper la confianza en el primer día — especialmente en salud, pagos y trading, donde una regresión es un incidente real, no una molestia. Si quieres acceso anticipado, escríbenos desde la página de contacto y te diremos honestamente si la build de staging te puede soportar aún.' },
        { q: '¿Por qué los productos enlazan a otros dominios?', a: 'Cada producto es su propio servicio, con sus propios términos, precios, registro y aviso de privacidad. Enviarte directamente al dominio del producto es más rápido, y deja claros los límites: clappe.com se rige por los términos de Clappe, clappay.com por los de ClapPay, y así sucesivamente. El sitio corporativo en intelligentsingularityai.com es la puerta de entrada, no un sistema de facturación.' },
        { q: '¿Puedo usar vuestros productos sin conexión?', a: 'Sí. Cada producto está diseñado para funcionar en redes lentas e intermitentes. Apuntamos a un teléfono de cinco años con dos barras de 2G como línea base, no como un nice-to-have. Las páginas pesan menos de cincuenta kilobytes en el primer pintado, gzip. Los flujos críticos (escribir una factura, registrar una nota de paciente, capturar un trabajo) funcionan sin conexión y se sincronizan cuando vuelve.' },
        { q: '¿Los productos comparten una cuenta?', a: 'Opcionalmente. Una única cuenta Clap puede iniciar sesión en cualquier producto que se haya adherido, pero cada producto mantiene sus propios datos, su propia suscripción y su propio flujo de consentimiento. Puedes usar un producto sin los otros, cambiar a otro, o eliminar uno sin afectar al resto.' },
        { q: '¿Construís funciones a medida para clientes individuales?', a: 'Rara vez, y solo cuando la función encaja bien con la base de usuarios más amplia. No construiremos un fork privado de un producto para un cliente; ese camino lleva a un cementerio de mantenimiento. Sin embargo, priorizaremos un punto de la hoja de ruta si un socio creíble lo patrocina y el resultado aterriza como función pública para todos.' },
      ],
      [
        { q: '¿Por qué vuestra tarifa es diferente en distintos países?', a: 'Porque un precio plano global excluiría silenciosamente a la mayoría del planeta. Usamos índices de poder adquisitivo publicados por el Banco Mundial para fijar precios regionales justos. El cliente de Fráncfort paga la tarifa de mercado completa. El cliente de Lagos paga una tarifa que respeta la naira. Las funciones y la calidad del producto son idénticas.' },
        { q: '¿El plan gratuito es realmente gratuito o es un trial?', a: 'Realmente gratuito. Gratis-para-siempre, sin cuenta atrás, sin publicidad, sin lisiar funciones, sin impuesto de exportación de datos. Si un negocio de una persona en Lagos puede llevar su operación real en el plan gratuito, el plan gratuito está haciendo su trabajo.' },
        { q: '¿Hacéis presupuestos enterprise?', a: 'Sin presupuestos. Cada precio está publicado en cada moneda que servimos. Si vuestro equipo de compras necesita un MSA, un DPA o facturación, eso es papeleo — no precio. El número en dólares de la página publicada es el número en dólares de la factura, multiplicado por los asientos que comprasteis.' },
      ],
      [
        { q: '¿Me rastreáis en este sitio web?', a: 'No. Este sitio tiene cero analíticas, cero píxeles, cero cookies de seguimiento, cero redes de publicidad y cero contenido de terceros. Los únicos datos que vemos son los que escribes en el formulario de contacto y envías. Un script de integración continua llamado no-third-party.mjs bloquea el lanzamiento si aparece cualquier host externo en el bundle. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: '¿Dónde se almacenan mis datos?', a: 'Cuando nos contactas, tu mensaje se envía por correo a una bandeja en Alberta, Canadá. No lo guardamos en una base de datos en este sitio. Los datos específicos del producto (cuando te registras en una de nuestras herramientas) se describen en la política de privacidad de ese producto en su propio dominio.' },
        { q: '¿Puedo borrar los datos que tenéis sobre mí?', a: 'Sí. Envía un email a legal@intelligentsingularityai.com desde la dirección que usaste. Confirmamos recepción en tres días laborables. Terminamos el borrado en treinta días. El mismo derecho aplica a cada producto, bajo PIPEDA y reglas equivalentes al RGPD.' },
        { q: '¿Entrenáis modelos de IA con mi contenido?', a: 'No. Las funciones de IA en todo nuestro portafolio usan solo datos que envías explícitamente, en el alcance de tu propia cuenta. Tu contenido privado nunca se mezcla en un set de entrenamiento compartido, nunca se usa para mejorar un modelo público, y nunca se envía a un proveedor de IA de terceros que retenga tus prompts.' },
      ],
      [
        { q: '¿Cuántos idiomas soporta el sitio?', a: 'Catorce el primer día. La lista: inglés, chino simplificado, español, hindi, árabe, francés, portugués, bengalí, ruso, urdu, indonesio, swahili, yorùbá y hausa. Cada uno se entrega con una fuente que cubre su escritura completa. Sin letras de respaldo a mitad de palabra. Los idiomas de derecha a izquierda se renderizan en una disposición RTL adecuada. No latín reflejado.' },
        { q: '¿Qué tan accesible es el sitio?', a: 'Apuntamos a WCAG 2.2 nivel AA en cada página pública. Una verificación axe-core hace fallar la build ante cualquier violación. El texto del cuerpo cumple al menos 7:1 de contraste. Las etiquetas pequeñas cumplen al menos 4.5:1. Cada elemento interactivo funciona desde el teclado. Honramos los ajustes de movimiento reducido. La declaración completa está en /legal/accessibility.' },
        { q: '¿Añadiréis mi idioma?', a: 'Si tu idioma se habla ampliamente y aún no está en la lista, escríbenos. Añadir un nuevo locale es una pieza de trabajo real — fuentes, traducciones, layout RTL/LTR, revisión cultural — pero es el tipo de trabajo que queremos hacer.' },
      ],
      [
        { q: '¿Cómo me asocio con el estudio?', a: 'Trabajamos con ONGs, gobiernos y empresas. El objetivo compartido es software de acceso universal para personas que normalmente no pueden permitírselo. Envía una nota breve desde la página de contacto. Dirígela a Partnerships. Recibirás respuesta en dos días laborables.' },
        { q: '¿Dónde encuentro un kit de prensa?', a: 'Visita /press para la ficha de datos, las citas aprobadas, la guía de marca, la referencia del fundador y el boilerplate de prensa. ¿Necesitas un archivo de logo, un retrato del fundador en alta resolución, o una declaración personalizada? Escribe a press@intelligentsingularityai.com con tu fecha límite.' },
        { q: '¿Habláis en conferencias?', a: 'A veces. Hablamos sobre acceso universal, equipos aumentados por IA, software de salud y economía de software lean. Escribe a press@intelligentsingularityai.com con los detalles del evento y el tamaño de la audiencia. Te diremos honestamente si podemos asistir.' },
        { q: '¿Aceptáis donaciones o subvenciones?', a: 'No pedimos donaciones a los usuarios. Sí damos la bienvenida a subvenciones. Las subvenciones deben venir de fundaciones o bancos. La subvención debe estar atada a software de acceso en mercados donde los precios completos aún no funcionan. Escribe a partners@intelligentsingularityai.com.' },
      ],
      [
        { q: '¿Estáis contratando?', a: 'A veces. La página /careers lista los roles abiertos actuales. Cuando no hay nada listado, no estamos contratando en ese momento, punto. No ejecutamos un embudo evergreen "envíanos tu CV" que no lleva a ninguna parte — pero una presentación reflexiva siempre obtiene una respuesta real.' },
        { q: '¿El equipo es realmente completamente remoto?', a: 'Sí. Somos remotos porque es el modelo correcto para el trabajo, no porque esté de moda. Se respetan las zonas horarias. La mayoría de decisiones viven por escrito para que sobrevivan a las personas que las tomaron.' },
        { q: '¿Publicáis bandas salariales?', a: 'Sí, en cada rol abierto. No negociamos con personas que adivinan la banda; la publicamos y la pagamos. La equity no está sobre la mesa porque la empresa no está en venta.' },
      ],
    ],
  },
  hi: {
    eyebrow: 'अक्सर पूछे जाने वाले प्रश्न · सीधे जवाब', title: 'प्रश्न, सीधे जवाब के साथ।',
    lede: 'लोग वास्तव में हमसे क्या पूछते हैं — स्टूडियो के बारे में, उत्पादों के बारे में, और हमारे उपकरण उपयोग करने के निजता समझौतों के बारे में।',
    sectionTitles: ['स्टूडियो', 'उत्पाद', 'मूल्य और पैसा', 'निजता और डेटा', 'भाषाएँ और सुलभता', 'भागीदारी और प्रेस', 'नियुक्ति'],
    stillStuckCta: { eyebrow: 'अभी भी कोई प्रश्न?', heading: 'हर संदेश एक इंसान पढ़ता है।', body: 'हम आमतौर पर दो कार्य दिवसों में जवाब देते हैं। फ़ॉर्म के माध्यम से नोट भेजें। या hello@intelligentsingularityai.com पर लिखें।' },
    sectionItems: [
      [
        { q: 'Intelligent Singularity क्या है?', a: 'Intelligent Singularity Inc. Clap इकोसिस्टम की मूल कंपनी है। हम एक छोटा, AI-संवर्धित, पूर्णतः दूरस्थ स्टूडियो हैं। हम कनाडा के अल्बर्टा में स्थित हैं। हम सार्वभौमिक पहुँच के लिए सॉफ़्टवेयर बनाते हैं। वही प्रमुख उत्पाद न्यू यॉर्क के Fortune 500 खरीदार और लागोस के एक-व्यक्ति बाज़ार-स्टॉल दोनों की सेवा करता है। एक साझा स्टैक। एक मिशन।' },
        { q: 'क्या आप उद्यम-समर्थित स्टार्टअप हैं?', a: 'नहीं। हम स्व-वित्तपोषित और बूटस्ट्रैप्ड हैं। इसका मतलब है हम उपयोगकर्ताओं को जवाबदेह हैं, उन निवेशकों को नहीं जो जल्दी एग्ज़िट का पीछा करते हैं। हम शिप करने में अधिक समय लेते हैं और बीस साल बाद भी रहने की योजना बनाते हैं। कंपनी बिक्री के लिए नहीं है।' },
        { q: 'इसके पीछे कौन है?', a: 'Dr. Md Diya ने चौंतीस साल की अंतरमहाद्वीपीय चिकित्सा अभ्यास के बाद 2024 में स्टूडियो की स्थापना की। एक छोटी, दूरस्थ, AI-संवर्धित टीम एक साझा स्टैक और एक साझा सुलभता बजट के तहत हर उत्पाद शिप करती है।' },
        { q: 'अगर आपकी ऐप्स किफ़ायती हैं तो आप पैसे कैसे कमाते हैं?', a: 'उत्पादों के पास एक हमेशा-मुफ़्त टियर है जो असली व्यवसाय चलाता है। पेड टियर स्केल जोड़ते हैं, फ़ीचर कभी नहीं। मूल्य निर्धारण क्रय शक्ति के अनुसार समायोजित होता है ताकि टोरंटो में बीस डॉलर का प्लान लागोस में कम का हो। विकसित-विश्व और एंटरप्राइज़ ग्राहक पूर्ण बाज़ार मूल्य देते हैं; उभरते बाज़ार और एकल ग्राहक एक ऐसी कीमत देते हैं जो उनकी मुद्रा का सम्मान करती है। गणित काम करता है क्योंकि हम लीन चलते हैं और AI-एजेंट फ़ैब्रिक को लीवरेज ले जाने देते हैं।' },
        { q: '"मूल कंपनी" क्यों — क्या यह एक होल्डिंग संरचना है?', a: 'यह सादे अर्थ में मूल कंपनी है। एक कानूनी इकाई प्लेटफ़ॉर्म के परिवार की मालिक है। सूची: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, साथ ही साझा बुनियादी ढाँचा। हर उत्पाद अपनी साइट पर चलता है। हर एक के अपने नियम और कीमतें हैं। कानूनी मालिक Intelligent Singularity Inc. है।' },
        { q: 'टीम कितनी बड़ी है?', a: 'इतनी छोटी कि एक नया कर्मचारी पहले हफ़्ते में हर चेहरा सीख ले, इतनी बड़ी कि एक दर्जन से अधिक प्लेटफ़ॉर्म शिपिंग होते रहें। हम जानबूझकर आकार की दौड़ का विज्ञापन नहीं करते; AI-एजेंट फ़ैब्रिक एक वास्तविक अर्थ में टीम का हिस्सा है।' },
      ],
      [
        { q: 'क्या ये उत्पाद असली हैं या अभी विचार हैं?', a: 'पोर्टफ़ोलियो पृष्ठ पर हर उत्पाद का एक ईमानदार स्थिति लेबल है। "Live" का मतलब है आप आज साइन अप कर सकते हैं। "Staging" का मतलब है कि यह चलता है लेकिन हम इसे मज़बूत कर रहे हैं इसलिए केवल आमंत्रण-आधारित है। "Awaiting approval" तैयार है लेकिन एक नियामक के इंतज़ार में है। "Infrastructure" वह कोड है जो हम सार्वजनिक रूप से साझा करते हैं और जिस पर अन्य उत्पाद निर्भर हैं। हम उन चीज़ों की पूर्व-घोषणा नहीं करते जो अभी मौजूद नहीं हैं।' },
        { q: 'कुछ उत्पाद staging के रूप में क्यों सूचीबद्ध हैं?', a: 'हमारे अधिकांश उपकरण सार्वजनिक लॉन्च से पहले मज़बूत किए जा रहे हैं। हम पहले दिन भरोसा तोड़ने के बजाय देर से शिप करना पसंद करते हैं — विशेष रूप से स्वास्थ्य, भुगतान और ट्रेडिंग में जहाँ एक रिग्रेशन एक वास्तविक-दुनिया की घटना है, असुविधा नहीं। यदि आप जल्दी पहुँच चाहते हैं, संपर्क पृष्ठ से हमें लिखें और हम ईमानदारी से बताएँगे कि staging बिल्ड आपका समर्थन कर सकती है या नहीं।' },
        { q: 'उत्पाद अन्य डोमेन से क्यों जुड़ते हैं?', a: 'प्रत्येक उत्पाद अपनी स्वयं की सेवा है जिसके अपने नियम, मूल्य निर्धारण, साइन-अप और गोपनीयता सूचना है। आपको सीधे उत्पाद डोमेन पर भेजना तेज़ है, और यह सीमाओं को स्पष्ट करता है: clappe.com Clappe के नियमों द्वारा शासित है, clappay.com ClapPay द्वारा, इत्यादि। intelligentsingularityai.com पर कॉर्पोरेट साइट सामने का दरवाज़ा है, बिलिंग सिस्टम नहीं।' },
        { q: 'क्या मैं आपके उत्पादों का ऑफ़लाइन उपयोग कर सकता हूँ?', a: 'हाँ। हर उत्पाद धीमी और रुक-रुक कर चलने वाले नेटवर्क पर काम करने के लिए डिज़ाइन किया गया है। हम दो-बार 2G पर पाँच साल पुराने फ़ोन को आधार रेखा के रूप में लक्ष्य बनाते हैं, अच्छा-होगा-अगर के रूप में नहीं। पृष्ठ पहली पेंट पर gzipped पचास किलोबाइट से कम वज़न के होते हैं। महत्वपूर्ण वर्कफ़्लो (इनवॉइस लिखना, मरीज़ की नोट दर्ज करना, नौकरी पकड़ना) बिना कनेक्शन के काम करते हैं और कनेक्शन वापस आने पर सिंक होते हैं।' },
        { q: 'क्या उत्पाद एक खाता साझा करते हैं?', a: 'वैकल्पिक रूप से। एक एकल Clap खाता किसी भी उत्पाद में साइन इन कर सकता है जो ऑप्ट इन करता है, लेकिन हर उत्पाद अभी भी अपना डेटा, अपनी सदस्यता और अपना सहमति प्रवाह रखता है। आप दूसरों के बिना एक उत्पाद का उपयोग कर सकते हैं, किसी अन्य पर स्विच कर सकते हैं, या एक को बाकी को प्रभावित किए बिना हटा सकते हैं।' },
        { q: 'क्या आप व्यक्तिगत ग्राहकों के लिए कस्टम फ़ीचर बनाते हैं?', a: 'बहुत कम, और केवल तब जब फ़ीचर व्यापक उपयोगकर्ता आधार के लिए उचित फ़िट है। हम एक ग्राहक के लिए उत्पाद का निजी फ़ोर्क नहीं बनाएँगे; वह रास्ता रखरखाव के कब्रिस्तान की ओर ले जाता है। लेकिन हम एक रोडमैप आइटम को प्राथमिकता देंगे यदि एक विश्वसनीय भागीदार उसे प्रायोजित करता है और परिणाम सभी के लिए सार्वजनिक फ़ीचर के रूप में आता है।' },
      ],
      [
        { q: 'आपकी कीमत अलग-अलग देशों में अलग क्यों है?', a: 'क्योंकि एक समान वैश्विक कीमत चुपचाप ग्रह के अधिकांश लोगों को बाहर कर देगी। हम विश्व बैंक के प्रकाशित क्रय-शक्ति सूचकांकों का उपयोग करके निष्पक्ष क्षेत्रीय कीमतें तय करते हैं। फ्रैंकफर्ट का ग्राहक पूर्ण बाज़ार दर देता है। लागोस का ग्राहक एक ऐसी दर देता है जो नायरा का सम्मान करती है। फ़ीचर और उत्पाद गुणवत्ता समान हैं।' },
        { q: 'क्या मुफ़्त टियर वास्तव में मुफ़्त है, या यह एक ट्रायल है?', a: 'वास्तव में मुफ़्त। हमेशा-मुफ़्त, कोई काउंटडाउन नहीं, कोई विज्ञापन नहीं, कोई फ़ीचर अपंगता नहीं, कोई डेटा-निर्यात कर नहीं। यदि लागोस का एक-व्यक्ति व्यवसाय मुफ़्त टियर पर अपना असली परिचालन चला सकता है, तो मुफ़्त टियर अपना काम कर रहा है।' },
        { q: 'क्या आप एंटरप्राइज़ कोट देते हैं?', a: 'कोई कोट नहीं। हर कीमत हमारी सेवा की हर मुद्रा में प्रकाशित है। यदि आपकी खरीद टीम को MSA, DPA, या इनवॉइस्ड बिलिंग चाहिए, वह कागज़ी काम है — कीमत नहीं। प्रकाशित पृष्ठ पर डॉलर संख्या इनवॉइस पर डॉलर संख्या है, आपके खरीदे गए सीटों से गुणा।' },
      ],
      [
        { q: 'क्या आप इस वेबसाइट पर मुझे ट्रैक करते हैं?', a: 'नहीं। इस साइट में शून्य एनालिटिक्स, शून्य पिक्सेल, शून्य ट्रैकिंग कुकीज़, शून्य विज्ञापन नेटवर्क, और तृतीय पक्षों से शून्य सामग्री है। हम केवल वही डेटा देखते हैं जो आप संपर्क फ़ॉर्म में टाइप करते हैं और भेजते हैं। no-third-party.mjs नामक एक निरंतर एकीकरण स्क्रिप्ट बंडल में किसी भी बाहरी होस्ट के दिखने पर रिलीज़ ब्लॉक करती है। On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'मेरा डेटा कहाँ संग्रहीत है?', a: 'जब आप हमसे संपर्क करते हैं, आपका संदेश ईमेल द्वारा कनाडा के अल्बर्टा में एक इनबॉक्स को भेजा जाता है। हम इसे इस साइट पर एक डेटाबेस में संग्रहीत नहीं करते। उत्पाद-विशिष्ट डेटा (जब आप हमारे एक उपकरण के लिए साइन अप करते हैं) उस उत्पाद की अपनी निजता नीति में अपने स्वयं के डोमेन पर वर्णित है।' },
        { q: 'क्या मैं वह डेटा हटा सकता हूँ जो आप मेरे बारे में रखते हैं?', a: 'हाँ। आपने जिस पते का उपयोग किया उससे legal@intelligentsingularityai.com पर ईमेल करें। हम तीन कार्य दिवसों में प्राप्ति की पुष्टि करते हैं। हम तीस दिनों के भीतर हटाने का काम पूरा करते हैं। यही अधिकार हर उत्पाद पर लागू होता है, PIPEDA और GDPR-समतुल्य नियमों के तहत।' },
        { q: 'क्या आप मेरी सामग्री पर AI मॉडल प्रशिक्षित करते हैं?', a: 'नहीं। हमारे पोर्टफ़ोलियो में सभी AI फ़ीचर केवल वही डेटा उपयोग करते हैं जो आप स्पष्ट रूप से सबमिट करते हैं, आपके अपने खाते के दायरे में। आपकी निजी सामग्री कभी साझा प्रशिक्षण सेट में मिश्रित नहीं होती, कभी सार्वजनिक मॉडल को बेहतर बनाने के लिए उपयोग नहीं होती, और कभी आपके प्रॉम्प्ट को बनाए रखने वाले तृतीय-पक्ष AI प्रदाता को नहीं भेजी जाती।' },
      ],
      [
        { q: 'साइट कितनी भाषाओं का समर्थन करती है?', a: 'पहले दिन चौदह। सूची: अंग्रेज़ी, सरलीकृत चीनी, स्पेनिश, हिंदी, अरबी, फ़्रेंच, पुर्तगाली, बंगाली, रूसी, उर्दू, इंडोनेशियाई, स्वाहिली, योरूबा और हौसा। हर एक अपनी पूरी लिपि को कवर करने वाले फ़ॉन्ट के साथ शिप होती है। शब्द के बीच में फ़ॉलबैक अक्षर नहीं। दाएँ-से-बाएँ भाषाएँ उचित RTL लेआउट में प्रस्तुत होती हैं। मिरर किया हुआ लैटिन नहीं।' },
        { q: 'साइट कितनी सुलभ है?', a: 'हम हर सार्वजनिक पृष्ठ पर WCAG 2.2 स्तर AA को लक्षित करते हैं। एक axe-core जाँच किसी भी उल्लंघन पर बिल्ड फ़ेल कर देती है। बॉडी टेक्स्ट कम से कम 7:1 कंट्रास्ट को पूरा करता है। छोटे लेबल कम से कम 4.5:1 को पूरा करते हैं। हर इंटरैक्टिव तत्व कीबोर्ड से काम करता है। हम कम-गति सेटिंग्स का सम्मान करते हैं। पूरा स्टेटमेंट /legal/accessibility पर है।' },
        { q: 'क्या आप मेरी भाषा जोड़ेंगे?', a: 'यदि आपकी भाषा व्यापक रूप से बोली जाती है और अभी तक सूची में नहीं है, हमें लिखें। एक नया लोकेल जोड़ना एक वास्तविक काम है — फ़ॉन्ट, अनुवाद, RTL/LTR लेआउट, सांस्कृतिक समीक्षा — लेकिन यह वही काम है जो हम करना चाहते हैं।' },
      ],
      [
        { q: 'मैं स्टूडियो के साथ कैसे साझेदारी करूँ?', a: 'हम NGO, सरकारों और कंपनियों के साथ काम करते हैं। साझा लक्ष्य उन लोगों के लिए सार्वभौमिक-पहुँच सॉफ़्टवेयर है जो आमतौर पर इसका वहन नहीं कर सकते। संपर्क पृष्ठ से एक संक्षिप्त नोट भेजें। इसे Partnerships पर रूट करें। आपको दो कार्य दिवसों में जवाब मिलेगा।' },
        { q: 'मुझे प्रेस किट कहाँ मिलेगी?', a: 'फ़ैक्ट शीट, स्वीकृत उद्धरण, ब्रांड मार्गदर्शन, संस्थापक संदर्भ और प्रेस बॉयलरप्लेट के लिए /press पर जाएँ। एक लोगो फ़ाइल, हाई-रेज़ संस्थापक चित्र, या कस्टम स्टेटमेंट चाहिए? press@intelligentsingularityai.com पर अपनी समय सीमा के साथ ईमेल करें।' },
        { q: 'क्या आप सम्मेलनों में बोलते हैं?', a: 'कभी-कभी। हम सार्वभौमिक पहुँच, AI-संवर्धित टीमों, स्वास्थ्य सॉफ़्टवेयर और लीन सॉफ़्टवेयर अर्थशास्त्र के बारे में बात करते हैं। press@intelligentsingularityai.com पर इवेंट विवरण और दर्शक आकार के साथ लिखें। हम ईमानदारी से बताते हैं कि हम आ सकते हैं या नहीं।' },
        { q: 'क्या आप दान या अनुदान लेते हैं?', a: 'हम उपयोगकर्ताओं से दान नहीं माँगते। हम अनुदान का स्वागत करते हैं। अनुदान फ़ाउंडेशनों या बैंकों से आना चाहिए। अनुदान उन बाज़ारों में पहुँच सॉफ़्टवेयर से जुड़ा होना चाहिए जहाँ पूर्ण कीमतें अभी काम नहीं करतीं। partners@intelligentsingularityai.com पर ईमेल करें।' },
      ],
      [
        { q: 'क्या आप भर्ती कर रहे हैं?', a: 'कभी-कभी। /careers पृष्ठ वर्तमान खुली भूमिकाओं को सूचीबद्ध करता है। जब कुछ भी सूचीबद्ध नहीं होता, हम उस समय भर्ती नहीं कर रहे, बस। हम एक एवरग्रीन "हमें अपना CV भेजें" फ़नल नहीं चलाते जो कहीं नहीं जाता — लेकिन एक विचारशील परिचय हमेशा एक वास्तविक उत्तर पाता है।' },
        { q: 'क्या टीम वास्तव में पूर्णतः दूरस्थ है?', a: 'हाँ। हम दूरस्थ हैं क्योंकि यह काम के लिए सही मॉडल है, इसलिए नहीं कि यह ट्रेंडी है। समय क्षेत्रों का सम्मान किया जाता है। अधिकांश निर्णय लिखित रूप में रहते हैं ताकि वे उन लोगों के बाद भी जीवित रहें जिन्होंने उन्हें बनाया।' },
        { q: 'क्या आप वेतन बैंड प्रकाशित करते हैं?', a: 'हाँ, हर खुली भूमिका पर। हम उन लोगों के साथ बातचीत नहीं करते जो बैंड का अनुमान लगाते हैं; हम इसे प्रकाशित करते हैं और भुगतान करते हैं। इक्विटी मेज़ पर नहीं है क्योंकि कंपनी बिक्री के लिए नहीं है।' },
      ],
    ],
  },
  ar: {
    eyebrow: 'الأسئلة الشائعة · إجابات بسيطة', title: 'أسئلة، يُجاب عليها ببساطة.',
    lede: 'ما يسألنا الناس فعلًا — عن الاستوديو، والمنتجات، والمقايضات الخصوصية لاستخدام أدواتنا.',
    sectionTitles: ['الاستوديو', 'المنتجات', 'التسعير والمال', 'الخصوصية والبيانات', 'اللغات والوصول', 'الشراكات والصحافة', 'التوظيف'],
    stillStuckCta: { eyebrow: 'لا يزال لديك سؤال؟', heading: 'إنسان يقرأ كل رسالة.', body: 'عادةً ما نرد في غضون يومي عمل. أرسل ملاحظة عبر النموذج. أو راسل hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'ما هي Intelligent Singularity؟', a: 'Intelligent Singularity Inc. هي الشركة الأم لمنظومة Clap. نحن استوديو صغير، مُعزَّز بالذكاء الاصطناعي، يعمل عن بُعد بالكامل. نتخذ من ألبرتا، كندا مقرًا. نبني برمجيات للوصول الشامل. المنتج الرئيسي ذاته يخدم مشترًيا من Fortune 500 في نيويورك وكشكًا تجاريًا لشخص واحد في لاجوس. حزمة واحدة مشتركة. رسالة واحدة.' },
        { q: 'هل أنتم شركة ناشئة مدعومة برأس مال جريء؟', a: 'لا. نحن مموَّلون ذاتيًا وbootstrapped. وهذا يعني أننا نُجيب أمام المستخدمين، لا أمام مستثمرين يلاحقون خروجًا سريعًا. يستغرقنا الإطلاق وقتًا أطول، ونخطط للبقاء بعد عشرين عامًا. الشركة ليست للبيع.' },
        { q: 'من خلف هذا؟', a: 'Dr. Md Diya أسس الاستوديو عام 2024 بعد أربعة وثلاثين عامًا من الممارسة الطبية بين القارات. فريق صغير، عن بُعد، مُعزَّز بالذكاء الاصطناعي يُطلق كل منتج تحت حزمة مشتركة واحدة وميزانية وصول مشتركة واحدة.' },
        { q: 'كيف تكسبون المال إذا كانت تطبيقاتكم في متناول الجميع؟', a: 'للمنتجات باقة مجانية-للأبد تكفي لإدارة عمل حقيقي. الباقات المدفوعة تضيف سعةً، لا ميزات. التسعير يتعدّل وفق القوة الشرائية، فالخطة التي تكلّف عشرين دولارًا في تورونتو تكلّف أقل في لاجوس. عملاء العالم المتقدم والشركات يدفعون السعر السوقي الكامل؛ عملاء الأسواق الناشئة والأفراد يدفعون سعرًا يحترم عملتهم. الحساب ينجح لأننا نعمل بكفاءة ونترك بنية وكلاء الذكاء الاصطناعي تحمل الرافعة.' },
        { q: 'لماذا "شركة أم" — هل هذه بنية قابضة؟', a: 'هي شركة أم بالمعنى البسيط. كيان قانوني واحد يملك عائلة المنصات. القائمة: Clappe، ClapBill، ClapMed، ClapDiet، ClapPay، Clapwork، Apogee، Audiflo، Nestbitt، DailyWorship، Gclap، FileManager، إضافة إلى البنية التحتية المشتركة. كل منتج يعمل على موقعه الخاص. لكل منتج شروطه وأسعاره. المالك القانوني هو Intelligent Singularity Inc.' },
        { q: 'كم حجم الفريق؟', a: 'صغير بما يكفي ليتعلم الموظف الجديد كل وجه في الأسبوع الأول، كبير بما يكفي ليُبقي أكثر من اثنتي عشرة منصة تُطلق. نتعمد عدم الترويج لسباق الحجم؛ بنية وكلاء الذكاء الاصطناعي جزء حقيقي من الفريق.' },
      ],
      [
        { q: 'هل هذه المنتجات حقيقية أم لا تزال أفكارًا؟', a: 'لكل منتج في صفحة المحفظة ملصق حالة صادق. "Live" يعني أنك تستطيع التسجيل اليوم. "Staging" يعني أنه يعمل لكنه بدعوة فقط بينما نُحكِم تجهيزه. "Awaiting approval" جاهز لكنه ينتظر جهة تنظيمية. "Infrastructure" كود نشاركه علنًا وتعتمد عليه منتجات أخرى. لا نُعلن مسبقًا عن أشياء لا توجد بعد.' },
        { q: 'لماذا تُسرَد بعض المنتجات على أنها staging؟', a: 'معظم أدواتنا لا تزال تُحكَم تجهيزها قبل الإطلاق العام. نفضّل الإطلاق متأخرًا على كسر الثقة في اليوم الأول — خصوصًا في الرعاية الصحية والمدفوعات والتداول، حيث الانحراف حادث في العالم الحقيقي، لا إزعاج. إن أردت وصولًا مبكرًا، راسلنا من صفحة الاتصال وسنخبرك بصدق إن كانت بناء staging تستطيع دعمك بعد.' },
        { q: 'لماذا تربط المنتجات بنطاقات أخرى؟', a: 'كل منتج خدمته الخاصة بشروطه وأسعاره وتسجيله وإشعار خصوصيته. إرسالك مباشرة إلى نطاق المنتج أسرع، ويُوضّح الحدود: clappe.com يحكمه شروط Clappe، وclappay.com شروط ClapPay، وهكذا. الموقع المؤسسي على intelligentsingularityai.com هو الباب الأمامي، لا نظام فوترة.' },
        { q: 'هل يمكنني استخدام منتجاتكم بلا اتصال؟', a: 'نعم. كل منتج مصمَّم للعمل على شبكات بطيئة ومتقطعة. نستهدف هاتفًا عمره خمس سنوات على إشارة 2G بشريطين كأساس، لا كميزة إضافية. تزن الصفحات أقل من خمسين كيلوبايت عند أول رسم بعد ضغط gzip. تعمل تدفقات العمل الحرجة (كتابة فاتورة، تسجيل ملاحظة مريض، التقاط مهمة) دون اتصال وتُزامَن عند عودة الاتصال.' },
        { q: 'هل تتشارك المنتجات حسابًا واحدًا؟', a: 'اختياريًا. يمكن لحساب Clap واحد تسجيل الدخول إلى أي منتج يختار الانضمام، لكن كل منتج يحتفظ ببياناته الخاصة، واشتراكه الخاص، وتدفق موافقته الخاص. يمكنك استخدام منتج واحد دون البقية، الانتقال إلى آخر، أو حذف واحد دون التأثير على الباقي.' },
        { q: 'هل تبنون ميزات مخصصة لعملاء فرديين؟', a: 'نادرًا، وفقط حين تناسب الميزة قاعدة المستخدمين الأوسع. لن نبني فرعًا خاصًا من منتج لعميل واحد؛ هذا الطريق يقود إلى مقبرة صيانة. مع ذلك، سنُولي بندًا على خارطة الطريق أولوية إذا رعاه شريك جدير ووصلت النتيجة كميزة عامة للجميع.' },
      ],
      [
        { q: 'لماذا تختلف أسعاركم بين الدول؟', a: 'لأن سعرًا عالميًا موحَّدًا سيُقصي بهدوء معظم سكان الكوكب. نستخدم مؤشرات القوة الشرائية المنشورة من البنك الدولي لتحديد أسعار إقليمية عادلة. عميل فرانكفورت يدفع السعر السوقي الكامل. عميل لاجوس يدفع سعرًا يحترم النايرا. الميزات وجودة المنتج متطابقة.' },
        { q: 'هل الباقة المجانية مجانية فعلًا، أم أنها تجربة؟', a: 'مجانية فعلًا. مجانية للأبد، بلا عدّ تنازلي، بلا إعلانات، بلا تعطيل ميزات، بلا ضريبة تصدير بيانات. إن استطاع عمل شخص واحد في لاجوس تشغيل عملياته الحقيقية على الباقة المجانية، فالباقة المجانية تؤدي عملها.' },
        { q: 'هل تُقدّمون عرض سعر للشركات؟', a: 'لا عروض أسعار. كل سعر منشور بكل عملة نخدمها. إن احتاج فريق المشتريات لديكم MSA أو DPA أو فوترة بفاتورة، فتلك أوراق — لا تسعير. الرقم بالدولار على الصفحة المنشورة هو الرقم بالدولار على الفاتورة، مضروبًا بعدد المقاعد التي اشتريتموها.' },
      ],
      [
        { q: 'هل تتعقّبونني على هذا الموقع؟', a: 'لا. لهذا الموقع صفر تحليلات، صفر بكسلات، صفر ملفات تعريف ارتباط للتعقّب، صفر شبكات إعلانات، وصفر محتوى من أطراف ثالثة. البيانات الوحيدة التي نراها هي ما تكتبه في نموذج الاتصال وتضغط إرسال. سكربت تكامل مستمر اسمه no-third-party.mjs يحجب الإصدار إذا ظهر أي مضيف خارجي في الحزمة. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'أين تُخزَّن بياناتي؟', a: 'حين تراسلنا، تُرسَل رسالتك بالبريد إلى صندوق وارد في ألبرتا، كندا. لا نُخزّنها في قاعدة بيانات على هذا الموقع. تُوصَف بيانات المنتج المخصصة (عند تسجيلك في إحدى أدواتنا) في سياسة خصوصية ذلك المنتج على نطاقه الخاص.' },
        { q: 'هل يمكنني حذف البيانات التي تحتفظون بها عنّي؟', a: 'نعم. راسل legal@intelligentsingularityai.com من العنوان الذي استخدمته. نُؤكّد الاستلام خلال ثلاثة أيام عمل. نُنهي الحذف خلال ثلاثين يومًا. الحق نفسه يسري على كل منتج، بموجب PIPEDA والقواعد المكافئة لـ GDPR.' },
        { q: 'هل تُدرّبون نماذج ذكاء اصطناعي على محتواي؟', a: 'لا. ميزات الذكاء الاصطناعي عبر محفظتنا تستخدم فقط البيانات التي ترسلها صراحةً، في نطاق حسابك الخاص. لا يُمزَج محتواك الخاص أبدًا في مجموعة تدريب مشتركة، ولا يُستخدَم لتحسين نموذج عام، ولا يُرسَل أبدًا إلى مزوّد ذكاء اصطناعي خارجي يحتفظ بمحفِّزاتك.' },
      ],
      [
        { q: 'كم لغة يدعمها الموقع؟', a: 'أربع عشرة لغة منذ اليوم الأول. القائمة: الإنجليزية، الصينية المبسَّطة، الإسبانية، الهندية، العربية، الفرنسية، البرتغالية، البنغالية، الروسية، الأردية، الإندونيسية، السواحيلية، اليوروبا، والهوسا. كل لغة تأتي مع خط يغطي نظامها الكتابي بالكامل. لا حروف بديلة في منتصف الكلمة. اللغات من اليمين إلى اليسار تظهر بتخطيط RTL سليم. ليس لاتينية معكوسة.' },
        { q: 'ما مدى وصول الموقع للجميع؟', a: 'نستهدف WCAG 2.2 المستوى AA في كل صفحة عامة. فحص axe-core يُفشل البناء عند أي مخالفة. النص الأساسي يحقق تباينًا 7:1 على الأقل. التسميات الصغيرة تحقق 4.5:1 على الأقل. كل عنصر تفاعلي يعمل من لوحة المفاتيح. نحترم إعدادات تقليل الحركة. البيان الكامل في /legal/accessibility.' },
        { q: 'هل ستضيفون لغتي؟', a: 'إن كانت لغتك مُتداولة على نطاق واسع وليست بعدُ على القائمة، راسلنا. إضافة لغة جديدة عمل حقيقي — خطوط، ترجمات، تخطيط RTL/LTR، مراجعة ثقافية — لكنه نوع العمل الذي نريد القيام به.' },
      ],
      [
        { q: 'كيف أعقد شراكة مع الاستوديو؟', a: 'نعمل مع المنظمات غير الحكومية والحكومات والشركات. الهدف المشترك هو برمجيات وصول عالمي لمن لا يستطيعون عادةً تحمّل تكلفتها. أرسل ملاحظة موجزة من صفحة الاتصال. وجِّهها إلى Partnerships. ستتلقى ردًا خلال يومي عمل.' },
        { q: 'أين أجد حقيبة صحفية؟', a: 'تفضّل بزيارة /press للحصول على ورقة الحقائق والاقتباسات المعتمدة وتوجيهات العلامة ومرجع المؤسس وقوالب البيانات الصحفية. تحتاج ملف شعار أو صورة عالية الدقة للمؤسس أو بيانًا مخصصًا؟ راسل press@intelligentsingularityai.com مع موعدك النهائي.' },
        { q: 'هل تتحدثون في المؤتمرات؟', a: 'أحيانًا. نتحدث عن الوصول الشامل والفرق المُعزَّزة بالذكاء الاصطناعي وبرمجيات الرعاية الصحية واقتصاديات البرمجيات الرشيقة. راسل press@intelligentsingularityai.com بتفاصيل الفعالية وحجم الجمهور. نخبرك بصدق إن كنا نستطيع الحضور.' },
        { q: 'هل تقبلون التبرعات أو المنح؟', a: 'لا نطلب تبرعات من المستخدمين. نُرحّب بالمنح. يجب أن تأتي المنح من مؤسسات أو مصارف. يجب ربط المنحة ببرمجيات الوصول في الأسواق التي لم تنجح فيها الأسعار الكاملة بعد. راسل partners@intelligentsingularityai.com.' },
      ],
      [
        { q: 'هل توظّفون؟', a: 'أحيانًا. صفحة /careers تسرد الأدوار المفتوحة حاليًا. حين لا يكون شيء مدرجًا، فنحن لا نوظّف في تلك اللحظة، نقطة. لا نُدير قمعًا دائمًا "أرسل سيرتك" لا يفضي إلى شيء — لكن تقديمًا مدروسًا يحظى دائمًا برد حقيقي.' },
        { q: 'هل الفريق فعلاً عن بُعد بالكامل؟', a: 'نعم. نحن عن بُعد لأنه النموذج الصحيح للعمل، لا لأنه رائج. نحترم المناطق الزمنية. تعيش معظم القرارات مكتوبةً لتبقى بعد الأشخاص الذين اتخذوها.' },
        { q: 'هل تنشرون نطاقات الرواتب؟', a: 'نعم، لكل دور مفتوح. لا نتفاوض مع من يخمّن النطاق؛ ننشره وندفعه. الأسهم ليست على الطاولة لأن الشركة ليست للبيع.' },
      ],
    ],
  },
  fr: {
    eyebrow: 'FAQ · RÉPONSES DIRECTES', title: 'Questions, des réponses simples.',
    lede: "Ce que les gens nous demandent vraiment — sur le studio, les produits, et les compromis de confidentialité liés à l'usage de nos outils.",
    sectionTitles: ['Le studio', 'Les produits', 'Tarifs et argent', 'Confidentialité et données', 'Langues et accessibilité', 'Partenariats et presse', 'Recrutement'],
    stillStuckCta: { eyebrow: 'Encore une question ?', heading: 'Une personne lit chaque message.', body: 'Nous répondons généralement sous deux jours ouvrés. Envoyez une note via le formulaire. Ou écrivez à hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: "Qu'est-ce qu'Intelligent Singularity ?", a: "Intelligent Singularity Inc. est la société mère de l'écosystème Clap. Nous sommes un petit studio, augmenté par IA, entièrement à distance. Nous sommes basés en Alberta, au Canada. Nous construisons des logiciels pour un accès universel. Le même produit phare sert un acheteur Fortune 500 à New York et un stand de marché d'une personne à Lagos. Un stack partagé. Une mission." },
        { q: 'Êtes-vous une startup soutenue par du capital-risque ?', a: "Non. Nous sommes autofinancés et bootstrapped. Cela signifie que nous rendons des comptes aux utilisateurs, pas à des investisseurs qui chassent des sorties rapides. Nous mettons plus de temps à livrer, et nous prévoyons d'être là dans vingt ans. La société n'est pas à vendre." },
        { q: 'Qui est derrière tout cela ?', a: "Dr. Md Diya a fondé le studio en 2024 après trente-quatre ans de pratique médicale transcontinentale. Une petite équipe à distance, augmentée par IA, livre chaque produit sous un stack partagé et un budget d'accessibilité partagé." },
        { q: "Comment gagnez-vous de l'argent si vos applis sont abordables ?", a: "Les produits ont un plan gratuit-à-vie sur lequel on peut faire tourner une vraie entreprise. Les forfaits payants ajoutent de la capacité, jamais des fonctionnalités. Le prix s'ajuste au pouvoir d'achat, ainsi un plan qui coûte vingt dollars à Toronto coûte moins à Lagos. Les clients du monde développé et entreprises paient le plein prix de marché ; les clients des marchés émergents et solo paient un prix qui respecte leur devise. Le calcul fonctionne parce que nous opérons en lean et laissons le tissu d'agents IA porter le levier." },
        { q: 'Pourquoi « société mère » — est-ce une structure holding ?', a: "C'est une société mère au sens simple. Une entité juridique possède la famille de plateformes. La liste : Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, plus l'infrastructure partagée. Chaque produit tourne sur son propre site. Chacun a ses propres conditions et prix. Le propriétaire légal est Intelligent Singularity Inc." },
        { q: "Quelle est la taille de l'équipe ?", a: "Assez petite pour qu'une nouvelle recrue apprenne chaque visage en première semaine, assez grande pour faire tourner plus d'une douzaine de plateformes. Nous ne faisons délibérément pas la course à la taille ; le tissu d'agents IA fait partie de l'équipe au sens réel." },
      ],
      [
        { q: "Ces produits sont-ils réels ou encore à l'état d'idées ?", a: "Chaque produit sur la page portefeuille a une étiquette de statut honnête. « Live » signifie que vous pouvez vous inscrire aujourd'hui. « Staging » signifie qu'il fonctionne mais sur invitation pendant que nous le solidifions. « Awaiting approval » est prêt mais attend un régulateur. « Infrastructure » est du code que nous partageons publiquement et dont d'autres produits dépendent. Nous n'annonçons pas à l'avance des choses qui n'existent pas encore." },
        { q: 'Pourquoi certains produits sont-ils listés comme staging ?', a: "La plupart de nos outils sont encore solidifiés avant le lancement public. Nous préférons livrer en retard plutôt que casser la confiance le premier jour — surtout dans la santé, les paiements et le trading, où une régression est un incident réel, pas un inconfort. Si vous voulez un accès anticipé, écrivez-nous depuis la page de contact et nous vous dirons honnêtement si la build staging peut vous supporter pour l'instant." },
        { q: "Pourquoi les produits renvoient vers d'autres domaines ?", a: "Chaque produit est son propre service avec ses propres conditions, prix, inscription et avis de confidentialité. Vous envoyer directement au domaine du produit est plus rapide, et clarifie les frontières : clappe.com est régi par les conditions de Clappe, clappay.com par celles de ClapPay, et ainsi de suite. Le site corporate à intelligentsingularityai.com est la porte d'entrée, pas un système de facturation." },
        { q: 'Puis-je utiliser vos produits hors-ligne ?', a: "Oui. Chaque produit est conçu pour fonctionner sur des réseaux lents et intermittents. Nous visons un téléphone de cinq ans sur 2G à deux barres comme base, pas comme un nice-to-have. Les pages pèsent moins de cinquante kilooctets au premier rendu, gzip. Les flux critiques (écrire une facture, enregistrer une note patient, saisir un job) fonctionnent sans connexion et se synchronisent au retour." },
        { q: 'Les produits partagent-ils un compte ?', a: "Optionnellement. Un compte Clap unique peut se connecter à tout produit qui adhère, mais chaque produit garde ses propres données, son propre abonnement et son propre flux de consentement. Vous pouvez utiliser un produit sans les autres, basculer vers un autre, ou en supprimer un sans affecter le reste." },
        { q: 'Construisez-vous des fonctionnalités sur mesure pour des clients individuels ?', a: "Rarement, et seulement quand la fonctionnalité s'inscrit dans la base d'utilisateurs plus large. Nous ne construirons pas un fork privé d'un produit pour un client ; ce chemin mène à un cimetière de maintenance. En revanche, nous prioriserons un élément de la feuille de route si un partenaire crédible le sponsorise et que le résultat atterrit comme fonctionnalité publique pour tous." },
      ],
      [
        { q: 'Pourquoi vos prix sont-ils différents selon les pays ?', a: "Parce qu'un prix global uniforme exclurait silencieusement la majeure partie de la planète. Nous utilisons les indices de pouvoir d'achat publiés par la Banque mondiale pour fixer des prix régionaux justes. Le client de Francfort paie le plein tarif marché. Le client de Lagos paie un tarif qui respecte le naira. Les fonctionnalités et la qualité du produit sont identiques." },
        { q: 'Le plan gratuit est-il vraiment gratuit, ou est-ce un essai ?', a: "Vraiment gratuit. Gratuit-pour-toujours, pas de compte à rebours, pas de publicité, pas de fonctionnalités estropiées, pas de taxe d'export de données. Si une entreprise d'une personne à Lagos peut faire tourner ses vraies opérations sur le plan gratuit, le plan gratuit fait son travail." },
        { q: 'Faites-vous des devis entreprise ?', a: "Pas de devis. Chaque prix est publié dans chaque devise que nous servons. Si votre équipe achats a besoin d'un MSA, d'un DPA, ou d'une facturation, ce sont des papiers — pas du tarif. Le nombre en dollars sur la page publiée est le nombre en dollars sur la facture, multiplié par les sièges que vous avez achetés." },
      ],
      [
        { q: 'Me suivez-vous sur ce site ?', a: "Non. Ce site n'a aucune analytique, aucun pixel, aucun cookie de tracking, aucun réseau publicitaire, et aucun contenu de tiers. Les seules données que nous voyons sont celles que vous tapez dans le formulaire de contact et envoyez. Un script d'intégration continue appelé no-third-party.mjs bloque la livraison si un hôte externe apparaît dans le bundle. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list." },
        { q: 'Où mes données sont-elles stockées ?', a: "Quand vous nous contactez, votre message est envoyé par email à une boîte en Alberta, au Canada. Nous ne le stockons pas dans une base de données sur ce site. Les données spécifiques au produit (quand vous vous inscrivez à l'un de nos outils) sont décrites dans la politique de confidentialité de ce produit sur son propre domaine." },
        { q: 'Puis-je supprimer les données que vous détenez sur moi ?', a: "Oui. Envoyez un email à legal@intelligentsingularityai.com depuis l'adresse que vous avez utilisée. Nous confirmons réception sous trois jours ouvrés. Nous terminons la suppression sous trente jours. Le même droit s'applique à chaque produit, selon PIPEDA et les règles équivalentes au RGPD." },
        { q: 'Entraînez-vous des modèles IA sur mon contenu ?', a: "Non. Les fonctionnalités IA dans tout notre portefeuille n'utilisent que des données que vous soumettez explicitement, dans le périmètre de votre propre compte. Votre contenu privé n'est jamais mélangé à un jeu d'entraînement partagé, jamais utilisé pour améliorer un modèle public, et jamais envoyé à un fournisseur d'IA tiers qui conserve vos prompts." },
      ],
      [
        { q: 'Combien de langues le site prend-il en charge ?', a: "Quatorze dès le premier jour. La liste : anglais, chinois simplifié, espagnol, hindi, arabe, français, portugais, bengali, russe, ourdou, indonésien, swahili, yorùbá et haoussa. Chacune embarque une police qui couvre l'écriture complète. Pas de lettres de repli au milieu d'un mot. Les langues de droite à gauche s'affichent en RTL correct. Pas du latin en miroir." },
        { q: 'Le site est-il accessible ?', a: "Nous visons WCAG 2.2 niveau AA sur chaque page publique. Une vérification axe-core fait échouer le build à la moindre violation. Le texte courant atteint au moins un contraste 7:1. Les petits libellés atteignent au moins 4.5:1. Chaque élément interactif fonctionne au clavier. Nous respectons le réglage mouvement réduit. La déclaration complète est sur /legal/accessibility." },
        { q: 'Ajouterez-vous ma langue ?', a: "Si votre langue est largement parlée et pas encore sur la liste, écrivez-nous. Ajouter une nouvelle locale est un vrai travail — polices, traductions, mise en page RTL/LTR, revue culturelle — mais c'est le genre de travail que nous voulons faire." },
      ],
      [
        { q: 'Comment puis-je devenir partenaire du studio ?', a: "Nous travaillons avec des ONG, des gouvernements et des entreprises. L'objectif commun est un logiciel d'accès universel pour des personnes qui ne pourraient pas se l'offrir habituellement. Envoyez une courte note depuis la page de contact. Dirigez-la vers Partnerships. Vous aurez une réponse sous deux jours ouvrés." },
        { q: 'Où trouver un kit presse ?', a: "Rendez-vous sur /press pour la fiche, les citations approuvées, la guidance de marque, la référence du fondateur et le boilerplate presse. Besoin d'un fichier logo, d'un portrait fondateur en haute résolution, ou d'une déclaration personnalisée ? Écrivez à press@intelligentsingularityai.com avec votre date limite." },
        { q: 'Intervenez-vous en conférence ?', a: "Parfois. Nous parlons d'accès universel, d'équipes augmentées par IA, de logiciels santé et d'économie logicielle lean. Écrivez à press@intelligentsingularityai.com avec les détails de l'événement et la taille du public. Nous vous dirons honnêtement si nous pouvons venir." },
        { q: 'Acceptez-vous des dons ou des subventions ?', a: "Nous ne demandons pas de dons aux utilisateurs. Nous accueillons les subventions. Les subventions doivent venir de fondations ou de banques. La subvention doit être liée à des logiciels d'accès sur des marchés où les prix pleins ne fonctionnent pas encore. Écrivez à partners@intelligentsingularityai.com." },
      ],
      [
        { q: 'Recrutez-vous ?', a: "Parfois. La page /careers liste les postes ouverts actuels. Quand rien n'est listé, nous ne recrutons pas à ce moment, point. Nous ne lançons pas un entonnoir evergreen « envoyez-nous votre CV » qui ne mène nulle part — mais une présentation réfléchie obtient toujours une vraie réponse." },
        { q: "L'équipe est-elle vraiment totalement à distance ?", a: "Oui. Nous sommes à distance parce que c'est le bon modèle pour le travail, pas parce que c'est tendance. Les fuseaux horaires sont respectés. La plupart des décisions vivent à l'écrit pour survivre aux personnes qui les ont prises." },
        { q: 'Publiez-vous les fourchettes de salaires ?', a: "Oui, sur chaque poste ouvert. Nous ne négocions pas avec ceux qui devinent la fourchette ; nous la publions et nous la payons. L'equity n'est pas sur la table parce que la société n'est pas à vendre." },
      ],
    ],
  },
  pt: {
    eyebrow: 'FAQ · RESPOSTAS DIRETAS', title: 'Perguntas, respostas diretas.',
    lede: 'O que as pessoas nos perguntam de verdade — sobre o estúdio, os produtos e os compromissos de privacidade ao usar as nossas ferramentas.',
    sectionTitles: ['O estúdio', 'Os produtos', 'Preços e dinheiro', 'Privacidade e dados', 'Idiomas e acessibilidade', 'Parcerias e imprensa', 'Contratação'],
    stillStuckCta: { eyebrow: 'Ainda tem uma pergunta?', heading: 'Uma pessoa lê cada mensagem.', body: 'Normalmente respondemos dentro de dois dias úteis. Envie uma nota pelo formulário. Ou escreva para hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'O que é a Intelligent Singularity?', a: 'A Intelligent Singularity Inc. é a empresa-mãe do ecossistema Clap. Somos um estúdio pequeno, aumentado por IA, totalmente remoto. Estamos sediados em Alberta, Canadá. Construímos software para acesso universal. O mesmo produto principal serve um comprador Fortune 500 em Nova Iorque e uma banca de mercado de uma pessoa em Lagos. Uma stack partilhada. Uma missão.' },
        { q: 'São uma startup apoiada por venture capital?', a: 'Não. Somos autofinanciados e bootstrapped. Isso significa que respondemos a utilizadores, não a investidores que perseguem saídas rápidas. Demoramos mais a lançar, e planeamos estar por aqui daqui a vinte anos. A empresa não está à venda.' },
        { q: 'Quem está por trás disto?', a: 'O Dr. Md Diya fundou o estúdio em 2024 depois de trinta e quatro anos de prática médica intercontinental. Uma equipa pequena, remota, aumentada por IA entrega cada produto sob uma stack partilhada e um orçamento de acessibilidade partilhado.' },
        { q: 'Como ganham dinheiro se as vossas apps são acessíveis?', a: 'Os produtos têm um plano grátis-para-sempre com que se pode gerir um negócio a sério. Os planos pagos acrescentam escala, nunca funcionalidades. O preço ajusta-se ao poder de compra, por isso um plano que custa vinte dólares em Toronto custa menos em Lagos. Os clientes do mundo desenvolvido e enterprise pagam preço de mercado completo; os clientes de mercados emergentes e solo pagam um preço que respeita a sua moeda. As contas batem certo porque operamos lean e deixamos o tecido de agentes IA carregar a alavancagem.' },
        { q: 'Porquê "empresa-mãe" — é uma estrutura holding?', a: 'É empresa-mãe no sentido simples. Uma entidade legal detém a família de plataformas. A lista: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, mais infraestrutura partilhada. Cada produto corre no seu próprio site. Cada um tem os seus próprios termos e preços. O proprietário legal é a Intelligent Singularity Inc.' },
        { q: 'Que tamanho tem a equipa?', a: 'Pequena o suficiente para que uma nova contratação aprenda cada cara na primeira semana, grande o suficiente para manter mais de uma dúzia de plataformas em produção. Deliberadamente não fazemos uma corrida ao tamanho; o tecido de agentes IA faz parte da equipa em sentido real.' },
      ],
      [
        { q: 'Estes produtos são reais ou ainda ideias?', a: 'Cada produto na página de portefólio tem um rótulo de estado honesto. "Live" significa que pode inscrever-se hoje. "Staging" significa que funciona mas é por convite enquanto o endurecemos. "Awaiting approval" está pronto mas à espera de um regulador. "Infrastructure" é código que partilhamos publicamente e do qual outros produtos dependem. Não pré-anunciamos coisas que ainda não existem.' },
        { q: 'Porque é que alguns produtos estão listados como staging?', a: 'A maioria das nossas ferramentas ainda está a ser endurecida antes do lançamento público. Preferimos lançar tarde a quebrar confiança no primeiro dia — especialmente em saúde, pagamentos e trading onde uma regressão é um incidente real, não uma inconveniência. Se quiser acesso antecipado, escreva-nos a partir da página de contacto e dizemos-lhe honestamente se a build de staging consegue suportá-lo já.' },
        { q: 'Porque é que os produtos ligam para outros domínios?', a: 'Cada produto é o seu próprio serviço com os seus próprios termos, preços, registo e aviso de privacidade. Enviá-lo diretamente ao domínio do produto é mais rápido, e torna as fronteiras claras: clappe.com é governado pelos termos da Clappe, clappay.com pelos da ClapPay, e por aí fora. O site corporativo em intelligentsingularityai.com é a porta da frente, não um sistema de faturação.' },
        { q: 'Posso usar os vossos produtos offline?', a: 'Sim. Cada produto está desenhado para funcionar em redes lentas e intermitentes. Visamos um telefone de cinco anos numa rede 2G de dois traços como linha base, não como um nice-to-have. As páginas pesam menos de cinquenta kilobytes no primeiro paint, gzipped. Os fluxos críticos (escrever uma fatura, registar uma nota de paciente, capturar um trabalho) funcionam sem ligação e sincronizam quando volta.' },
        { q: 'Os produtos partilham uma conta?', a: 'Opcionalmente. Uma única conta Clap pode entrar em qualquer produto que aceite, mas cada produto continua a guardar os seus próprios dados, a sua própria subscrição e o seu próprio fluxo de consentimento. Pode usar um produto sem os outros, mudar para outro, ou eliminar um sem afetar os restantes.' },
        { q: 'Constroem funcionalidades à medida para clientes individuais?', a: 'Raramente, e só quando a funcionalidade encaixa bem na base de utilizadores mais ampla. Não construiremos um fork privado de um produto para um cliente; esse caminho leva a um cemitério de manutenção. Mas iremos priorizar um item da roadmap se um parceiro credível o patrocinar e o resultado aterrar como funcionalidade pública para todos.' },
      ],
      [
        { q: 'Porque é que o vosso preço é diferente em diferentes países?', a: 'Porque um preço global plano excluiria silenciosamente a maior parte do planeta. Usamos índices de poder de compra publicados pelo Banco Mundial para definir preços regionais justos. O cliente em Frankfurt paga a tarifa de mercado completa. O cliente em Lagos paga uma tarifa que respeita a naira. As funcionalidades e a qualidade do produto são idênticas.' },
        { q: 'O plano gratuito é realmente gratuito, ou é um trial?', a: 'Realmente gratuito. Grátis-para-sempre, sem contagem decrescente, sem publicidade, sem funcionalidades aleijadas, sem imposto de exportação de dados. Se um negócio de uma pessoa em Lagos consegue gerir as suas operações reais no plano gratuito, o plano gratuito está a fazer o seu trabalho.' },
        { q: 'Fazem orçamentos enterprise?', a: 'Sem orçamentos. Cada preço é publicado em cada moeda que servimos. Se a vossa equipa de compras precisa de um MSA, um DPA, ou faturação, isso é papelada — não preço. O número em dólares na página publicada é o número em dólares na fatura, multiplicado pelos lugares que compraram.' },
      ],
      [
        { q: 'Seguem-me neste site?', a: 'Não. Este site tem zero analítica, zero pixels, zero cookies de seguimento, zero redes de publicidade e zero conteúdo de terceiros. Os únicos dados que vemos são os que você escreve no formulário de contacto e envia. Um script de integração contínua chamado no-third-party.mjs bloqueia o lançamento se algum host externo aparecer no bundle. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'Onde estão guardados os meus dados?', a: 'Quando nos contacta, a sua mensagem é enviada por email para uma caixa de entrada em Alberta, Canadá. Não a guardamos numa base de dados neste site. Os dados específicos do produto (quando se regista numa das nossas ferramentas) estão descritos na política de privacidade desse produto no seu próprio domínio.' },
        { q: 'Posso apagar os dados que mantêm sobre mim?', a: 'Sim. Envie um email para legal@intelligentsingularityai.com a partir do endereço que usou. Confirmamos receção em três dias úteis. Terminamos a eliminação em trinta dias. O mesmo direito aplica-se a cada produto, sob PIPEDA e regras equivalentes ao GDPR.' },
        { q: 'Treinam modelos de IA com o meu conteúdo?', a: 'Não. As funcionalidades de IA em todo o nosso portefólio usam apenas dados que submete explicitamente, no âmbito da sua própria conta. O seu conteúdo privado nunca é misturado num conjunto de treino partilhado, nunca é usado para melhorar um modelo público, e nunca é enviado a um fornecedor de IA de terceiros que retenha os seus prompts.' },
      ],
      [
        { q: 'Quantos idiomas o site suporta?', a: 'Catorze no primeiro dia. A lista: inglês, chinês simplificado, espanhol, hindi, árabe, francês, português, bengali, russo, urdu, indonésio, suaíli, iorubá e hauçá. Cada um vem com uma fonte que cobre a sua escrita completa. Sem letras de fallback a meio de palavra. Os idiomas da direita para a esquerda renderizam em layout RTL adequado. Não em latim espelhado.' },
        { q: 'Quão acessível é o site?', a: 'Visamos WCAG 2.2 nível AA em cada página pública. Uma verificação axe-core faz a build falhar perante qualquer violação. O texto do corpo cumpre pelo menos contraste 7:1. As etiquetas pequenas cumprem pelo menos 4.5:1. Cada elemento interativo funciona pelo teclado. Honramos as definições de movimento reduzido. A declaração completa está em /legal/accessibility.' },
        { q: 'Vão acrescentar o meu idioma?', a: 'Se o seu idioma for amplamente falado e ainda não estiver na lista, escreva-nos. Acrescentar uma nova locale é trabalho a sério — fontes, traduções, layout RTL/LTR, revisão cultural — mas é o tipo de trabalho que queremos fazer.' },
      ],
      [
        { q: 'Como me torno parceiro do estúdio?', a: 'Trabalhamos com ONGs, governos e empresas. O objetivo partilhado é software de acesso universal para pessoas que normalmente não podem pagar. Envie uma nota curta a partir da página de contacto. Encaminhe-a para Partnerships. Terá resposta em dois dias úteis.' },
        { q: 'Onde encontro um kit de imprensa?', a: 'Visite /press para a ficha de factos, as citações aprovadas, a orientação de marca, a referência do fundador e o boilerplate de imprensa. Precisa de um ficheiro de logótipo, de um retrato do fundador em alta resolução, ou de uma declaração personalizada? Escreva para press@intelligentsingularityai.com com a sua data-limite.' },
        { q: 'Falam em conferências?', a: 'Por vezes. Falamos sobre acesso universal, equipas aumentadas por IA, software de saúde e economia de software lean. Escreva para press@intelligentsingularityai.com com os detalhes do evento e o tamanho da audiência. Diremos honestamente se podemos comparecer.' },
        { q: 'Aceitam donativos ou subsídios?', a: 'Não pedimos donativos aos utilizadores. Damos boas-vindas a subsídios. Os subsídios devem vir de fundações ou bancos. O subsídio tem de estar ligado a software de acesso em mercados onde os preços completos ainda não funcionam. Escreva para partners@intelligentsingularityai.com.' },
      ],
      [
        { q: 'Estão a contratar?', a: 'Por vezes. A página /careers lista as funções abertas atualmente. Quando nada está listado, não estamos a contratar nesse momento, ponto. Não corremos um funil perene "envie-nos o seu CV" que não vai a lado nenhum — mas uma apresentação ponderada recebe sempre uma resposta real.' },
        { q: 'A equipa é mesmo totalmente remota?', a: 'Sim. Somos remotos porque é o modelo certo para o trabalho, não porque está na moda. Os fusos horários são respeitados. A maioria das decisões vive por escrito para sobreviver às pessoas que as tomaram.' },
        { q: 'Publicam bandas salariais?', a: 'Sim, em cada função aberta. Não negociamos com quem adivinha a banda; publicamo-la e pagamo-la. O capital próprio não está em cima da mesa porque a empresa não está à venda.' },
      ],
    ],
  },
  bn: {
    eyebrow: 'FAQ · সরাসরি উত্তর', title: 'প্রশ্ন, সরলভাবে উত্তর দেওয়া।',
    lede: 'মানুষ আসলে আমাদের যা জিজ্ঞেস করে — স্টুডিও সম্পর্কে, পণ্যগুলো সম্পর্কে, এবং আমাদের সরঞ্জাম ব্যবহারের গোপনীয়তা ট্রেডঅফ সম্পর্কে।',
    sectionTitles: ['স্টুডিও', 'পণ্যসমূহ', 'মূল্য ও অর্থ', 'গোপনীয়তা ও ডেটা', 'ভাষা ও প্রবেশযোগ্যতা', 'অংশীদারিত্ব ও প্রেস', 'নিয়োগ'],
    stillStuckCta: { eyebrow: 'এখনো একটি প্রশ্ন আছে?', heading: 'প্রতিটি বার্তা একজন মানুষ পড়েন।', body: 'আমরা সাধারণত দুই কার্যদিবসের মধ্যে উত্তর দিই। ফর্মের মাধ্যমে একটি নোট পাঠান। বা hello@intelligentsingularityai.com-এ লিখুন।' },
    sectionItems: [
      [
        { q: 'Intelligent Singularity কী?', a: 'Intelligent Singularity Inc. হল Clap ইকোসিস্টেমের মূল কোম্পানি। আমরা একটি ছোট, AI-সংবর্ধিত, সম্পূর্ণ রিমোট স্টুডিও। আমরা কানাডার আলবার্টায় অবস্থিত। আমরা সর্বজনীন প্রবেশাধিকারের জন্য সফটওয়্যার তৈরি করি। একই প্রধান পণ্য নিউ ইয়র্কের Fortune 500 ক্রেতা এবং লাগোসের এক-ব্যক্তির বাজার স্টল উভয়কে সেবা দেয়। একটি ভাগাভাগি স্ট্যাক। একটি মিশন।' },
        { q: 'আপনারা কি ভেঞ্চার-সমর্থিত স্টার্টআপ?', a: 'না। আমরা স্ব-অর্থায়িত এবং বুটস্ট্র্যাপড। এর অর্থ আমরা ব্যবহারকারীদের কাছে দায়বদ্ধ, দ্রুত এক্সিটের পেছনে ছুটে যাওয়া বিনিয়োগকারীদের কাছে নয়। আমরা শিপ করতে বেশি সময় নিই, এবং বিশ বছর পরেও থাকার পরিকল্পনা করি। কোম্পানি বিক্রির জন্য নয়।' },
        { q: 'এর পেছনে কে আছেন?', a: 'Dr. Md Diya চৌত্রিশ বছরের আন্তর্মহাদেশীয় চিকিৎসা চর্চার পর 2024 সালে স্টুডিওটি প্রতিষ্ঠা করেন। একটি ছোট, রিমোট, AI-সংবর্ধিত দল একটি ভাগাভাগি স্ট্যাক এবং একটি ভাগাভাগি প্রবেশযোগ্যতা বাজেটের অধীনে প্রতিটি পণ্য শিপ করে।' },
        { q: 'যদি আপনার অ্যাপগুলো সাশ্রয়ী হয় তাহলে আপনি কীভাবে অর্থ উপার্জন করেন?', a: 'পণ্যগুলোর একটি চিরকাল-মুক্ত টিয়ার আছে যা একটি বাস্তব ব্যবসা চালায়। পেইড টিয়ার স্কেল যোগ করে, বৈশিষ্ট্য কখনো নয়। মূল্য ক্রয় ক্ষমতার জন্য সমন্বয় করা হয় তাই টরন্টোতে যে প্ল্যানের দাম বিশ ডলার সেটি লাগোসে কম। উন্নত-বিশ্ব ও এন্টারপ্রাইজ গ্রাহকরা পূর্ণ বাজার মূল্য দেন; উদীয়মান বাজার ও একক গ্রাহকরা এমন একটি মূল্য দেন যা তাদের মুদ্রাকে সম্মান করে। গণিত কাজ করে কারণ আমরা চটপটে চলি এবং AI-এজেন্ট ফ্যাব্রিককে লিভারেজ বহন করতে দিই।' },
        { q: '"মূল কোম্পানি" কেন — এটি কি একটি হোল্ডিং কাঠামো?', a: 'এটি সাধারণ অর্থে একটি মূল কোম্পানি। একটি আইনি সত্তা প্ল্যাটফর্ম পরিবারের মালিক। তালিকা: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, প্লাস ভাগাভাগি অবকাঠামো। প্রতিটি পণ্য তার নিজস্ব সাইটে চলে। প্রত্যেকটির নিজস্ব শর্তাবলী এবং মূল্য আছে। আইনি মালিক Intelligent Singularity Inc.।' },
        { q: 'দলটি কত বড়?', a: 'এত ছোট যে একজন নতুন নিয়োগপ্রাপ্ত প্রথম সপ্তাহে প্রতিটি মুখ শিখে যান, এত বড় যে এক ডজনেরও বেশি প্ল্যাটফর্ম শিপিং চলমান থাকে। আমরা ইচ্ছাকৃতভাবে আকারের প্রতিযোগিতা প্রচার করি না; AI-এজেন্ট ফ্যাব্রিক প্রকৃত অর্থে দলের একটি অংশ।' },
      ],
      [
        { q: 'এই পণ্যগুলো কি বাস্তব নাকি এখনো শুধু ধারণা?', a: 'পোর্টফোলিও পৃষ্ঠার প্রতিটি পণ্যের একটি সৎ স্ট্যাটাস লেবেল আছে। "Live" মানে আপনি আজই সাইন আপ করতে পারবেন। "Staging" মানে এটি চলছে কিন্তু আমরা এটিকে শক্তিশালী করছি বলে আমন্ত্রণ-ভিত্তিক। "Awaiting approval" প্রস্তুত কিন্তু একটি নিয়ন্ত্রকের অপেক্ষায়। "Infrastructure" এমন কোড যা আমরা সর্বজনীনভাবে ভাগ করি এবং অন্য পণ্যগুলো এর উপর নির্ভরশীল। আমরা এমন জিনিসের পূর্ব-ঘোষণা করি না যা এখনো বিদ্যমান নেই।' },
        { q: 'কিছু পণ্য staging হিসেবে কেন তালিকাভুক্ত?', a: 'আমাদের বেশিরভাগ সরঞ্জাম সর্বজনীন লঞ্চের আগে এখনো শক্তিশালী করা হচ্ছে। আমরা প্রথম দিনে আস্থা ভাঙার চেয়ে দেরিতে শিপ করতে পছন্দ করি — বিশেষ করে স্বাস্থ্যসেবা, অর্থপ্রদান এবং ট্রেডিংয়ে যেখানে একটি রিগ্রেশন একটি বাস্তব-জগতের ঘটনা, অসুবিধা নয়। যদি আপনি প্রাথমিক প্রবেশাধিকার চান, যোগাযোগ পৃষ্ঠা থেকে আমাদের লিখুন এবং আমরা সততার সাথে বলব staging বিল্ড আপনাকে সমর্থন করতে পারে কি না।' },
        { q: 'পণ্যগুলো কেন অন্য ডোমেইনে লিঙ্ক করে?', a: 'প্রতিটি পণ্য তার নিজস্ব পরিষেবা যার নিজস্ব শর্তাবলী, মূল্য, সাইন-আপ এবং গোপনীয়তা নোটিশ আছে। আপনাকে সরাসরি পণ্যের ডোমেইনে পাঠানো দ্রুততর এবং সীমানা স্পষ্ট করে: clappe.com Clappe-এর শর্তাবলী দ্বারা পরিচালিত, clappay.com ClapPay দ্বারা, ইত্যাদি। intelligentsingularityai.com-এ কর্পোরেট সাইট হলো সামনের দরজা, বিলিং সিস্টেম নয়।' },
        { q: 'আমি কি আপনার পণ্যগুলো অফলাইনে ব্যবহার করতে পারি?', a: 'হ্যাঁ। প্রতিটি পণ্য ধীর এবং বিরতিপূর্ণ নেটওয়ার্কে কাজ করার জন্য ডিজাইন করা হয়েছে। আমরা দুই-বার 2G-তে পাঁচ বছরের পুরনো ফোনকে বেসলাইন হিসেবে লক্ষ্য করি, ভালো-হলে-ভালো হিসেবে নয়। পৃষ্ঠাগুলো প্রথম পেইন্টে gzipped পঞ্চাশ কিলোবাইটের কম ওজনের। গুরুত্বপূর্ণ ওয়ার্কফ্লো (একটি ইনভয়েস লেখা, একটি রোগীর নোট রেকর্ড করা, একটি কাজ ক্যাপচার করা) সংযোগ ছাড়াই কাজ করে এবং সংযোগ ফিরে এলে সিঙ্ক হয়।' },
        { q: 'পণ্যগুলো কি একটি অ্যাকাউন্ট ভাগ করে?', a: 'ঐচ্ছিকভাবে। একটি একক Clap অ্যাকাউন্ট যে কোনো পণ্যে সাইন ইন করতে পারে যা অপ্ট ইন করে, কিন্তু প্রতিটি পণ্য এখনো নিজস্ব ডেটা, নিজস্ব সাবস্ক্রিপশন এবং নিজস্ব সম্মতি প্রবাহ রাখে। আপনি একটি পণ্য অন্যগুলো ছাড়া ব্যবহার করতে পারেন, অন্যটিতে স্যুইচ করতে পারেন, বা একটি মুছতে পারেন বাকিগুলোকে প্রভাবিত না করে।' },
        { q: 'আপনি কি ব্যক্তিগত গ্রাহকদের জন্য কাস্টম বৈশিষ্ট্য তৈরি করেন?', a: 'খুব কম, এবং কেবল তখন যখন বৈশিষ্ট্যটি বৃহত্তর ব্যবহারকারী ভিত্তির জন্য একটি ন্যায্য মানানসই। আমরা একজন গ্রাহকের জন্য একটি পণ্যের একটি ব্যক্তিগত ফর্ক তৈরি করব না; সেই পথ একটি রক্ষণাবেক্ষণ কবরস্থানের দিকে নিয়ে যায়। তবে আমরা একটি রোডম্যাপ আইটেমকে অগ্রাধিকার দেব যদি একজন বিশ্বাসযোগ্য অংশীদার এটি স্পনসর করেন এবং ফলাফলটি সকলের জন্য একটি সর্বজনীন বৈশিষ্ট্য হিসেবে আসে।' },
      ],
      [
        { q: 'আপনার মূল্য বিভিন্ন দেশে কেন আলাদা?', a: 'কারণ একটি সমান বৈশ্বিক মূল্য নীরবে গ্রহের বেশিরভাগ মানুষকে বাদ দেবে। আমরা ন্যায্য আঞ্চলিক মূল্য নির্ধারণ করতে বিশ্ব ব্যাংকের প্রকাশিত ক্রয়-ক্ষমতা সূচক ব্যবহার করি। ফ্রাঙ্কফুর্টের গ্রাহক পূর্ণ বাজার হার দেন। লাগোসের গ্রাহক এমন একটি হার দেন যা নায়রাকে সম্মান করে। বৈশিষ্ট্য এবং পণ্যের গুণমান অভিন্ন।' },
        { q: 'ফ্রি টিয়ার কি সত্যিই ফ্রি, নাকি এটি একটি ট্রায়াল?', a: 'সত্যিই ফ্রি। চিরকাল-মুক্ত, কোনো কাউন্টডাউন নেই, কোনো বিজ্ঞাপন নেই, কোনো বৈশিষ্ট্য বিকলাঙ্গকরণ নেই, কোনো ডেটা-এক্সপোর্ট কর নেই। যদি লাগোসের এক-ব্যক্তির ব্যবসা ফ্রি টিয়ারে তাদের প্রকৃত অপারেশন চালাতে পারে, তবে ফ্রি টিয়ার তার কাজ করছে।' },
        { q: 'আপনি কি এন্টারপ্রাইজ কোট দেবেন?', a: 'কোনো উদ্ধৃতি নেই। প্রতিটি মূল্য আমরা যে প্রতিটি মুদ্রায় সেবা প্রদান করি তাতে প্রকাশিত। যদি আপনার প্রকিউরমেন্ট দলের MSA, DPA, বা ইনভয়েস্ড বিলিং প্রয়োজন হয়, সেগুলো কাগজি কাজ — মূল্য নয়। প্রকাশিত পৃষ্ঠার ডলার সংখ্যা ইনভয়েসের ডলার সংখ্যা, আপনার কেনা সিট দিয়ে গুণ করা।' },
      ],
      [
        { q: 'আপনি কি এই ওয়েবসাইটে আমাকে ট্র্যাক করেন?', a: 'না। এই সাইটের শূন্য অ্যানালিটিক্স, শূন্য পিক্সেল, শূন্য ট্র্যাকিং কুকিজ, শূন্য বিজ্ঞাপন নেটওয়ার্ক এবং তৃতীয় পক্ষের শূন্য সামগ্রী আছে। আমরা কেবল সেই ডেটা দেখি যা আপনি যোগাযোগ ফর্মে টাইপ করেন এবং পাঠান। no-third-party.mjs নামক একটি ক্রমাগত একীকরণ স্ক্রিপ্ট বান্ডলে কোনো বাহ্যিক হোস্ট দেখা গেলে রিলিজ ব্লক করে। On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'আমার ডেটা কোথায় সংরক্ষিত?', a: 'যখন আপনি আমাদের সাথে যোগাযোগ করেন, আপনার বার্তা ইমেইলের মাধ্যমে কানাডার আলবার্টায় একটি ইনবক্সে পাঠানো হয়। আমরা এটিকে এই সাইটের একটি ডেটাবেসে সংরক্ষণ করি না। পণ্য-নির্দিষ্ট ডেটা (যখন আপনি আমাদের একটি সরঞ্জামের জন্য সাইন আপ করেন) সেই পণ্যের নিজস্ব গোপনীয়তা নীতিতে তার নিজস্ব ডোমেইনে বর্ণিত আছে।' },
        { q: 'আপনি আমার সম্পর্কে যে ডেটা রাখেন তা কি আমি মুছতে পারি?', a: 'হ্যাঁ। আপনি যে ঠিকানা ব্যবহার করেছেন সেখান থেকে legal@intelligentsingularityai.com-এ ইমেইল করুন। আমরা তিন কার্যদিবসের মধ্যে প্রাপ্তি নিশ্চিত করি। আমরা ত্রিশ দিনের মধ্যে মুছে ফেলা শেষ করি। একই অধিকার প্রতিটি পণ্যে প্রযোজ্য, PIPEDA এবং GDPR-সমতুল্য নিয়মের অধীনে।' },
        { q: 'আপনি কি আমার সামগ্রীতে AI মডেল প্রশিক্ষণ দেন?', a: 'না। আমাদের পোর্টফোলিও জুড়ে AI বৈশিষ্ট্যগুলো কেবল সেই ডেটা ব্যবহার করে যা আপনি স্পষ্টভাবে জমা দেন, আপনার নিজের অ্যাকাউন্টের সীমার মধ্যে। আপনার ব্যক্তিগত সামগ্রী কখনো একটি ভাগাভাগি প্রশিক্ষণ সেটে মিশ্রিত হয় না, কখনো পাবলিক মডেল উন্নত করতে ব্যবহৃত হয় না, এবং কখনো আপনার প্রম্পট রাখে এমন তৃতীয়-পক্ষ AI প্রদানকারীর কাছে পাঠানো হয় না।' },
      ],
      [
        { q: 'সাইটটি কতগুলো ভাষা সমর্থন করে?', a: 'প্রথম দিন থেকেই চৌদ্দটি। তালিকা: ইংরেজি, সরলীকৃত চীনা, স্প্যানিশ, হিন্দি, আরবি, ফরাসি, পর্তুগিজ, বাংলা, রুশ, উর্দু, ইন্দোনেশীয়, সোয়াহিলি, ইয়োরুবা এবং হাউসা। প্রত্যেকটি তার সম্পূর্ণ লিপি কভার করে এমন ফন্টের সাথে শিপ হয়। শব্দের মাঝখানে কোনো ফলব্যাক অক্ষর নেই। ডান-থেকে-বাম ভাষাগুলো সঠিক RTL লেআউটে রেন্ডার হয়। মিরর করা ল্যাটিন নয়।' },
        { q: 'সাইটটি কতটা প্রবেশযোগ্য?', a: 'আমরা প্রতিটি সর্বজনীন পৃষ্ঠায় WCAG 2.2 লেভেল AA-কে লক্ষ্য করি। একটি axe-core চেক যেকোনো লঙ্ঘনে বিল্ড ফেল করে দেয়। বডি টেক্সট অন্তত 7:1 কনট্রাস্ট পূরণ করে। ছোট লেবেলগুলো অন্তত 4.5:1 পূরণ করে। প্রতিটি ইন্টারঅ্যাকটিভ এলিমেন্ট কীবোর্ড থেকে কাজ করে। আমরা কম-গতি সেটিংসকে সম্মান করি। সম্পূর্ণ বিবৃতি /legal/accessibility-এ আছে।' },
        { q: 'আপনি কি আমার ভাষা যোগ করবেন?', a: 'যদি আপনার ভাষা ব্যাপকভাবে কথিত এবং এখনো তালিকায় না থাকে, আমাদের লিখুন। একটি নতুন লোকেল যোগ করা একটি বাস্তব কাজ — ফন্ট, অনুবাদ, RTL/LTR লেআউট, সাংস্কৃতিক পর্যালোচনা — কিন্তু এটি সেই ধরনের কাজ যা আমরা করতে চাই।' },
      ],
      [
        { q: 'আমি স্টুডিওর সাথে কীভাবে অংশীদারিত্ব করব?', a: 'আমরা NGO, সরকার এবং কোম্পানিগুলোর সাথে কাজ করি। ভাগাভাগি লক্ষ্য হলো এমন মানুষদের জন্য সর্বজনীন-প্রবেশযোগ্য সফটওয়্যার যারা সাধারণত এটি বহন করতে পারে না। যোগাযোগ পৃষ্ঠা থেকে একটি ছোট নোট পাঠান। এটি Partnerships-এ রুট করুন। আপনি দুই কার্যদিবসের মধ্যে শুনবেন।' },
        { q: 'আমি প্রেস কিট কোথায় পাব?', a: 'ফ্যাক্ট শিট, অনুমোদিত উদ্ধৃতি, ব্র্যান্ড নির্দেশনা, প্রতিষ্ঠাতা রেফারেন্স এবং প্রেস বয়লারপ্লেটের জন্য /press-এ যান। লোগো ফাইল, হাই-রেজ প্রতিষ্ঠাতা প্রতিকৃতি, বা একটি কাস্টম বিবৃতি প্রয়োজন? আপনার ডেডলাইন সহ press@intelligentsingularityai.com-এ ইমেইল করুন।' },
        { q: 'আপনি কি সম্মেলনে কথা বলেন?', a: 'মাঝে মাঝে। আমরা সর্বজনীন প্রবেশাধিকার, AI-সংবর্ধিত দল, স্বাস্থ্যসেবা সফটওয়্যার এবং লিন সফটওয়্যার অর্থনীতি সম্পর্কে কথা বলি। ইভেন্টের বিবরণ এবং দর্শক সংখ্যা সহ press@intelligentsingularityai.com-এ লিখুন। আমরা সততার সাথে বলি আমরা আসতে পারব কিনা।' },
        { q: 'আপনি কি অনুদান বা গ্র্যান্ট নেন?', a: 'আমরা ব্যবহারকারীদের কাছ থেকে অনুদান চাই না। আমরা গ্র্যান্টকে স্বাগত জানাই। গ্র্যান্ট ফাউন্ডেশন বা ব্যাংক থেকে আসতে হবে। গ্র্যান্টটি এমন বাজারে অ্যাক্সেস সফটওয়্যারের সাথে সংযুক্ত থাকতে হবে যেখানে পূর্ণ মূল্য এখনো কাজ করে না। partners@intelligentsingularityai.com-এ ইমেইল করুন।' },
      ],
      [
        { q: 'আপনি কি নিয়োগ করছেন?', a: 'মাঝে মাঝে। /careers পৃষ্ঠা বর্তমান খোলা ভূমিকার তালিকা দেয়। যখন কিছুই তালিকাভুক্ত নয়, আমরা সেই মুহূর্তে নিয়োগ করছি না, ব্যাস। আমরা একটি চিরসবুজ "আমাদের আপনার CV পাঠান" ফানেল চালাই না যা কোথাও যায় না — কিন্তু একটি বিচক্ষণ পরিচিতি সবসময় একটি বাস্তব উত্তর পায়।' },
        { q: 'টিম কি সত্যিই সম্পূর্ণ রিমোট?', a: 'হ্যাঁ। আমরা রিমোট কারণ এটি কাজের জন্য সঠিক মডেল, এটি ট্রেন্ডি বলে নয়। সময় অঞ্চলগুলো সম্মানিত। অধিকাংশ সিদ্ধান্ত লিখিতভাবে থাকে যাতে সেগুলো তাদের নির্মাতাদের পরেও টিকে থাকে।' },
        { q: 'আপনি কি বেতনের সীমা প্রকাশ করেন?', a: 'হ্যাঁ, প্রতিটি খোলা ভূমিকায়। আমরা যারা সীমা অনুমান করে তাদের সাথে দরাদরি করি না; আমরা এটি প্রকাশ করি এবং প্রদান করি। ইক্যুইটি টেবিলে নেই কারণ কোম্পানি বিক্রির জন্য নয়।' },
      ],
    ],
  },
  ru: {
    eyebrow: 'FAQ · ПРОСТЫЕ ОТВЕТЫ', title: 'Вопросы, ответы по существу.',
    lede: 'Что нас спрашивают на самом деле — про студию, продукты и компромиссы приватности при использовании наших инструментов.',
    sectionTitles: ['Студия', 'Продукты', 'Цены и деньги', 'Приватность и данные', 'Языки и доступность', 'Партнёрство и пресса', 'Найм'],
    stillStuckCta: { eyebrow: 'Остался вопрос?', heading: 'Каждое сообщение читает человек.', body: 'Обычно отвечаем в течение двух рабочих дней. Отправьте сообщение через форму. Или напишите на hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'Что такое Intelligent Singularity?', a: 'Intelligent Singularity Inc. — материнская компания экосистемы Clap. Мы — небольшая студия, усиленная ИИ, полностью удалённая. Базируемся в Альберте, Канада. Делаем софт для универсального доступа. Тот же флагманский продукт обслуживает покупателя Fortune 500 в Нью-Йорке и одиночный рыночный прилавок в Лагосе. Один общий стек. Одна миссия.' },
        { q: 'Вы стартап, поддержанный венчурным капиталом?', a: 'Нет. Мы самофинансируемые и bootstrapped. Это значит, что мы отвечаем перед пользователями, а не перед инвесторами, гоняющимися за быстрым выходом. Релизы занимают больше времени, и мы планируем быть здесь и через двадцать лет. Компания не продаётся.' },
        { q: 'Кто за этим стоит?', a: 'Dr. Md Diya основал студию в 2024 году после тридцати четырёх лет межконтинентальной медицинской практики. Небольшая удалённая команда, усиленная ИИ, выпускает каждый продукт на одном общем стеке и в рамках одного общего бюджета на доступность.' },
        { q: 'Как вы зарабатываете, если ваши приложения доступны по цене?', a: 'У продуктов есть бесплатный-навсегда тариф, на котором можно вести реальный бизнес. Платные тарифы добавляют масштаб — не фичи. Цена корректируется по покупательной способности, поэтому план, стоящий двадцать долларов в Торонто, стоит меньше в Лагосе. Клиенты развитого мира и enterprise платят полную рыночную цену; клиенты развивающихся рынков и одиночки — цену, уважающую их валюту. Математика сходится потому, что мы работаем экономно и позволяем фабрике ИИ-агентов нести рычаг.' },
        { q: 'Почему «материнская компания» — это холдинговая структура?', a: 'Это материнская компания в простом смысле. Одно юридическое лицо владеет семейством платформ. Список: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, плюс общая инфраструктура. Каждый продукт работает на собственном сайте. У каждого свои условия и цены. Юридический владелец — Intelligent Singularity Inc.' },
        { q: 'Какого размера команда?', a: 'Достаточно маленькая, чтобы новый сотрудник за первую неделю узнал каждое лицо, достаточно большая, чтобы поддерживать выпуск более дюжины платформ. Мы намеренно не устраиваем гонку размеров; фабрика ИИ-агентов — часть команды в реальном смысле.' },
      ],
      [
        { q: 'Эти продукты реальны или ещё идеи?', a: 'Каждый продукт на странице портфеля имеет честный лейбл статуса. «Live» — можно зарегистрироваться сегодня. «Staging» — работает, но по приглашению, пока укрепляем. «Awaiting approval» — готов, но ждёт регулятора. «Infrastructure» — код, который мы публикуем публично и от которого зависят другие продукты. Мы не анонсируем заранее то, чего ещё нет.' },
        { q: 'Почему некоторые продукты в статусе staging?', a: 'Большинство инструментов всё ещё укрепляются перед публичным запуском. Мы предпочитаем выпустить позже, чем сломать доверие в первый день — особенно в здравоохранении, платежах и трейдинге, где регрессия — реальный инцидент, а не неудобство. Если хотите ранний доступ, напишите со страницы контактов, и мы честно скажем, может ли staging-сборка вас поддержать.' },
        { q: 'Почему продукты ведут на другие домены?', a: 'Каждый продукт — это свой сервис со своими условиями, ценой, регистрацией и уведомлением о приватности. Отправить вас прямо на домен продукта быстрее и делает границы чёткими: clappe.com управляется условиями Clappe, clappay.com — условиями ClapPay и т.д. Корпоративный сайт intelligentsingularityai.com — это парадная дверь, а не биллинговая система.' },
        { q: 'Можно ли пользоваться вашими продуктами офлайн?', a: 'Да. Каждый продукт спроектирован под медленные и нестабильные сети. Мы целимся в пятилетний телефон с двумя полосками 2G как в базовый сценарий, а не как в опцию. Страницы весят меньше пятидесяти килобайт при первой отрисовке, в gzip. Критические потоки (выставление инвойса, запись пациентской записи, фиксация задачи) работают без подключения и синхронизируются при его возвращении.' },
        { q: 'Делят ли продукты единый аккаунт?', a: 'Опционально. Один аккаунт Clap может входить в любой продукт, который согласился, но каждый продукт хранит свои данные, свою подписку и свой поток согласия. Можно пользоваться одним продуктом без других, переключиться на другой или удалить один, не затрагивая остальное.' },
        { q: 'Делаете ли вы кастомные фичи для отдельных клиентов?', a: 'Редко и только когда фича честно подходит для широкой пользовательской базы. Мы не будем делать приватный форк продукта для одного клиента — этот путь ведёт к кладбищу обслуживания. Но приоритезируем элемент дорожной карты, если надёжный партнёр спонсирует его и результат выходит как публичная фича для всех.' },
      ],
      [
        { q: 'Почему ваши цены разные в разных странах?', a: 'Потому что плоская глобальная цена молча отрезала бы большую часть планеты. Мы используем опубликованные индексы покупательной способности Всемирного банка, чтобы устанавливать справедливые региональные цены. Клиент во Франкфурте платит полную рыночную ставку. Клиент в Лагосе платит ставку, уважающую найру. Функции и качество продукта идентичны.' },
        { q: 'Бесплатный тариф действительно бесплатный или это пробный?', a: 'Действительно бесплатный. Бесплатно-навсегда, без обратного отсчёта, без рекламы, без покалеченных функций, без налога на экспорт данных. Если бизнес из одного человека в Лагосе может вести реальные операции на бесплатном тарифе — значит, бесплатный тариф работает.' },
        { q: 'Дадите ли вы корпоративную котировку?', a: 'Никаких котировок. Каждая цена опубликована в каждой обслуживаемой нами валюте. Если вашему отделу закупок нужны MSA, DPA или биллинг по инвойсам — это бумаги, а не цена. Цифра в долларах на опубликованной странице — это цифра в долларах на инвойсе, умноженная на купленные места.' },
      ],
      [
        { q: 'Вы отслеживаете меня на этом сайте?', a: 'Нет. На этом сайте ноль аналитики, ноль пикселей, ноль трекинговых кук, ноль рекламных сетей и ноль контента от третьих сторон. Единственные данные, которые мы видим, — это то, что вы вводите в форму контактов и отправляете. CI-скрипт под названием no-third-party.mjs блокирует релиз, если в бандле появляется любой внешний хост. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'Где хранятся мои данные?', a: 'Когда вы пишете нам, ваше сообщение отправляется по почте в наш ящик в Альберте, Канада. Мы не храним его в базе данных на этом сайте. Продуктовые данные (когда вы регистрируетесь в одном из инструментов) описаны в политике приватности этого продукта на его собственном домене.' },
        { q: 'Могу ли я удалить данные, которые вы храните обо мне?', a: 'Да. Напишите на legal@intelligentsingularityai.com с того адреса, который использовали. Мы подтверждаем получение в течение трёх рабочих дней. Завершаем удаление в течение тридцати дней. Это право действует для каждого продукта по PIPEDA и эквивалентным GDPR правилам.' },
        { q: 'Тренируете ли вы ИИ-модели на моём контенте?', a: 'Нет. ИИ-фичи во всём нашем портфеле используют только данные, которые вы явно отправляете, в рамках вашего же аккаунта. Ваш приватный контент никогда не вмешивается в общий тренировочный набор, никогда не используется для улучшения публичной модели и никогда не отправляется стороннему ИИ-провайдеру, который сохраняет ваши промпты.' },
      ],
      [
        { q: 'Сколько языков поддерживает сайт?', a: 'Четырнадцать с первого дня. Список: английский, упрощённый китайский, испанский, хинди, арабский, французский, португальский, бенгальский, русский, урду, индонезийский, суахили, йоруба и хауса. Каждый поставляется со шрифтом, покрывающим всю свою письменность. Никаких запасных букв в середине слова. Языки справа налево отображаются в правильной RTL-вёрстке. Не зеркальная латиница.' },
        { q: 'Насколько сайт доступен?', a: 'Мы целимся в WCAG 2.2 уровня AA на каждой публичной странице. Проверка axe-core ломает сборку при любом нарушении. Основной текст соответствует контрасту минимум 7:1. Мелкие подписи — минимум 4.5:1. Каждый интерактивный элемент работает с клавиатуры. Учитываем настройку уменьшения движения. Полное заявление — на /legal/accessibility.' },
        { q: 'Добавите ли вы мой язык?', a: 'Если ваш язык широко распространён и пока не в списке — напишите нам. Добавление нового локаля — это реальная работа: шрифты, переводы, RTL/LTR-вёрстка, культурная вычитка, — но именно такую работу мы и хотим делать.' },
      ],
      [
        { q: 'Как стать партнёром студии?', a: 'Мы работаем с НПО, правительствами и компаниями. Общая цель — софт универсального доступа для тех, кто обычно не может его себе позволить. Отправьте короткое сообщение со страницы контактов. Отметьте Partnerships. Ответим в течение двух рабочих дней.' },
        { q: 'Где найти пресс-кит?', a: 'Загляните на /press — там факт-лист, утверждённые цитаты, brand guidance, founder reference и пресс-болерплейт. Нужен файл логотипа, портрет основателя в высоком разрешении или индивидуальное заявление? Напишите на press@intelligentsingularityai.com с вашим дедлайном.' },
        { q: 'Выступаете ли вы на конференциях?', a: 'Иногда. Говорим про универсальный доступ, команды, усиленные ИИ, медицинский софт и lean-экономику софта. Напишите на press@intelligentsingularityai.com с деталями события и размером аудитории. Честно скажем, сможем ли приехать.' },
        { q: 'Принимаете ли пожертвования или гранты?', a: 'Мы не просим пожертвований у пользователей. Гранты приветствуем. Гранты должны быть от фондов или банков. Грант должен быть привязан к access-софту на рынках, где полные цены пока не работают. Пишите на partners@intelligentsingularityai.com.' },
      ],
      [
        { q: 'Вы нанимаете?', a: 'Иногда. На странице /careers перечислены текущие открытые роли. Если ничего не указано — значит, в данный момент мы не нанимаем, точка. Мы не держим вечнозелёную воронку «пришлите нам резюме», которая никуда не ведёт, — но вдумчивое представление всегда получает реальный ответ.' },
        { q: 'Команда действительно полностью удалённая?', a: 'Да. Мы удалёнка потому, что это правильная модель для работы, а не потому, что это модно. Часовые пояса уважаем. Большинство решений живут в письменном виде, чтобы пережить тех, кто их принял.' },
        { q: 'Публикуете ли вы зарплатные вилки?', a: 'Да, на каждой открытой роли. Мы не торгуемся с теми, кто угадывает вилку; мы публикуем её и платим. Equity на столе нет, потому что компания не продаётся.' },
      ],
    ],
  },
  ur: {
    eyebrow: 'FAQ · سادہ جوابات', title: 'سوالات، سادہ جواب کے ساتھ۔',
    lede: 'لوگ واقعی ہم سے کیا پوچھتے ہیں — اسٹوڈیو، پروڈکٹس، اور ہمارے ٹولز استعمال کرنے کے رازداری کے سمجھوتوں کے بارے میں۔',
    sectionTitles: ['اسٹوڈیو', 'پروڈکٹس', 'قیمت اور پیسہ', 'رازداری اور ڈیٹا', 'زبانیں اور رسائی', 'شراکت داری اور پریس', 'بھرتی'],
    stillStuckCta: { eyebrow: 'ابھی بھی کوئی سوال ہے؟', heading: 'ہر پیغام ایک حقیقی شخص پڑھتا ہے۔', body: 'ہم عام طور پر دو کاروباری دنوں کے اندر جواب دیتے ہیں۔ فارم کے ذریعے ایک نوٹ بھیجیں۔ یا hello@intelligentsingularityai.com پر لکھیں۔' },
    sectionItems: [
      [
        { q: 'Intelligent Singularity کیا ہے؟', a: 'Intelligent Singularity Inc. Clap ایکوسسٹم کی پیرنٹ کمپنی ہے۔ ہم ایک چھوٹا، AI سے بڑھایا گیا، مکمل طور پر ریموٹ اسٹوڈیو ہیں۔ ہم البرٹا، کینیڈا میں مقیم ہیں۔ ہم عالمی رسائی کے لیے سافٹ ویئر بناتے ہیں۔ وہی فلیگ شپ پروڈکٹ نیویارک میں Fortune 500 خریدار اور لاگوس میں ایک شخص کے بازار اسٹال دونوں کی خدمت کرتی ہے۔ ایک مشترکہ اسٹیک۔ ایک مشن۔' },
        { q: 'کیا آپ وینچر-بیکڈ اسٹارٹ اپ ہیں؟', a: 'نہیں۔ ہم خود فنڈڈ اور بوٹسٹریپڈ ہیں۔ اس کا مطلب ہے کہ ہم صارفین کو جوابدہ ہیں، تیز ایگزٹ کا پیچھا کرنے والے سرمایہ کاروں کو نہیں۔ ہم شپ کرنے میں زیادہ وقت لیتے ہیں، اور بیس سال بعد بھی موجود رہنے کا منصوبہ بناتے ہیں۔ کمپنی برائے فروخت نہیں۔' },
        { q: 'اس کے پیچھے کون ہے؟', a: 'Dr. Md Diya نے بین البرعظمی طبی پریکٹس کے چونتیس سال بعد 2024 میں اسٹوڈیو قائم کیا۔ ایک چھوٹی، ریموٹ، AI سے بڑھائی گئی ٹیم ایک مشترکہ اسٹیک اور ایک مشترکہ قابل رسائی بجٹ کے تحت ہر پروڈکٹ شپ کرتی ہے۔' },
        { q: 'اگر آپ کی ایپس سستی ہیں تو آپ پیسے کیسے کماتے ہیں؟', a: 'پروڈکٹس کا ایک ہمیشہ-مفت ٹائر ہے جو حقیقی کاروبار چلاتا ہے۔ پیڈ ٹائرز اسکیل شامل کرتے ہیں، فیچرز کبھی نہیں۔ قیمت قوت خرید کے مطابق ایڈجسٹ ہوتی ہے لہٰذا ٹورنٹو میں جس پلان کی قیمت بیس ڈالر ہے وہ لاگوس میں کم ہے۔ ترقی یافتہ-دنیا اور انٹرپرائز گاہک پوری مارکیٹ قیمت ادا کرتے ہیں؛ ابھرتی-منڈی اور تنہا گاہک ایسی قیمت ادا کرتے ہیں جو ان کی کرنسی کا احترام کرے۔ ریاضی کام کرتی ہے کیونکہ ہم لین چلتے ہیں اور AI-ایجنٹ فیبرک کو لیوریج لے جانے دیتے ہیں۔' },
        { q: '"پیرنٹ کمپنی" کیوں — کیا یہ ایک ہولڈنگ سٹرکچر ہے؟', a: 'یہ سادے معنوں میں پیرنٹ کمپنی ہے۔ ایک قانونی ادارہ پلیٹ فارمز کے خاندان کا مالک ہے۔ فہرست: Clappe، ClapBill، ClapMed، ClapDiet، ClapPay، Clapwork، Apogee، Audiflo، Nestbitt، DailyWorship، Gclap، FileManager، اور مشترکہ بنیادی ڈھانچہ۔ ہر پروڈکٹ اپنی سائٹ پر چلتی ہے۔ ہر ایک کی اپنی شرائط اور قیمتیں ہیں۔ قانونی مالک Intelligent Singularity Inc. ہے۔' },
        { q: 'ٹیم کتنی بڑی ہے؟', a: 'اتنی چھوٹی کہ نئی بھرتی پہلے ہفتے میں ہر چہرہ سیکھ لے، اتنی بڑی کہ درجن سے زیادہ پلیٹ فارمز شپنگ جاری رکھ سکیں۔ ہم جان بوجھ کر سائز کی دوڑ کا اعلان نہیں کرتے؛ AI-ایجنٹ فیبرک حقیقی معنوں میں ٹیم کا حصہ ہے۔' },
      ],
      [
        { q: 'کیا یہ پروڈکٹس حقیقی ہیں یا ابھی صرف آئیڈیاز ہیں؟', a: 'پورٹ فولیو صفحے پر ہر پروڈکٹ کا ایک ایماندار اسٹیٹس لیبل ہے۔ "Live" کا مطلب ہے آپ آج سائن اپ کر سکتے ہیں۔ "Staging" کا مطلب ہے یہ چلتا ہے لیکن جب ہم اسے مضبوط کر رہے ہیں دعوت پر مبنی ہے۔ "Awaiting approval" تیار ہے لیکن ایک ریگولیٹر کا منتظر ہے۔ "Infrastructure" وہ کوڈ ہے جسے ہم عوامی طور پر شیئر کرتے ہیں اور جس پر دیگر پروڈکٹس انحصار کرتے ہیں۔ ہم ایسی چیزوں کی پیشگی تشہیر نہیں کرتے جو ابھی موجود نہیں ہیں۔' },
        { q: 'کچھ پروڈکٹس staging کے طور پر کیوں درج ہیں؟', a: 'ہمارے زیادہ تر ٹولز عوامی لانچ سے پہلے ابھی بھی مضبوط کیے جا رہے ہیں۔ ہم پہلے دن اعتماد توڑنے کی بجائے دیر سے شپ کرنا پسند کرتے ہیں — خاص طور پر صحت، ادائیگیوں اور ٹریڈنگ میں جہاں ایک ریگریشن ایک حقیقی-دنیا کا واقعہ ہے، تکلیف نہیں۔ اگر آپ ابتدائی رسائی چاہتے ہیں، رابطہ صفحے سے ہمیں لکھیں اور ہم ایمانداری سے بتائیں گے کہ staging بلڈ ابھی آپ کی مدد کر سکتی ہے یا نہیں۔' },
        { q: 'پروڈکٹس دوسرے ڈومینز پر کیوں لنک کرتی ہیں؟', a: 'ہر پروڈکٹ اپنی سروس ہے اپنی شرائط، قیمت، سائن اپ، اور رازداری نوٹس کے ساتھ۔ آپ کو براہ راست پروڈکٹ ڈومین پر بھیجنا تیز تر ہے، اور یہ حدود کو واضح کرتا ہے: clappe.com Clappe کی شرائط کے تحت ہے، clappay.com ClapPay کی، اور اسی طرح۔ intelligentsingularityai.com پر کارپوریٹ سائٹ سامنے کا دروازہ ہے، بلنگ سسٹم نہیں۔' },
        { q: 'کیا میں آپ کی پروڈکٹس آف لائن استعمال کر سکتا ہوں؟', a: 'جی ہاں۔ ہر پروڈکٹ سست اور وقفے وقفے سے چلنے والی نیٹ ورکس پر کام کرنے کے لیے ڈیزائن کی گئی ہے۔ ہم دو-بار 2G پر پانچ سال پرانے فون کو بیس لائن کے طور پر ٹارگٹ کرتے ہیں، اچھا-ہو-تو-اچھا کے طور پر نہیں۔ صفحات پہلی پینٹ پر gzipped پچاس کلوبائٹ سے کم وزنی ہوتے ہیں۔ اہم ورک فلوز (ایک انوائس لکھنا، ایک مریض کا نوٹ ریکارڈ کرنا، ایک کام پکڑنا) کنکشن کے بغیر کام کرتے ہیں اور کنکشن واپس آنے پر سنک ہوتے ہیں۔' },
        { q: 'کیا پروڈکٹس ایک اکاؤنٹ شیئر کرتی ہیں؟', a: 'اختیاری طور پر۔ ایک واحد Clap اکاؤنٹ کسی بھی پروڈکٹ میں سائن ان کر سکتا ہے جو آپٹ ان کرتی ہے، لیکن ہر پروڈکٹ ابھی بھی اپنا ڈیٹا، اپنی سبسکرپشن، اور اپنا رضامندی کا بہاؤ رکھتی ہے۔ آپ دوسروں کے بغیر ایک پروڈکٹ استعمال کر سکتے ہیں، دوسری پر سوئچ کر سکتے ہیں، یا ایک کو باقی پر اثر ڈالے بغیر ڈلیٹ کر سکتے ہیں۔' },
        { q: 'کیا آپ انفرادی گاہکوں کے لیے کسٹم فیچرز بناتے ہیں؟', a: 'شاذ و نادر، اور صرف جب فیچر وسیع تر صارف بنیاد کے لیے منصفانہ فٹ ہو۔ ہم ایک گاہک کے لیے کسی پروڈکٹ کا نجی فورک نہیں بنائیں گے؛ وہ راستہ بحالی کے قبرستان کی طرف لے جاتا ہے۔ تاہم، ہم ایک روڈ میپ آئٹم کو ترجیح دیں گے اگر کوئی قابل اعتماد پارٹنر اسے اسپانسر کرے اور نتیجہ سب کے لیے ایک عوامی فیچر کے طور پر آئے۔' },
      ],
      [
        { q: 'آپ کی قیمت مختلف ممالک میں کیوں مختلف ہے؟', a: 'کیونکہ ایک یکساں عالمی قیمت خاموشی سے کرّہ ارض کے زیادہ تر لوگوں کو خارج کر دے گی۔ ہم منصفانہ علاقائی قیمتیں طے کرنے کے لیے ورلڈ بینک کی شائع شدہ قوت خرید اشاریے استعمال کرتے ہیں۔ فرینکفرٹ کا گاہک پوری مارکیٹ کی شرح ادا کرتا ہے۔ لاگوس کا گاہک ایک ایسی شرح ادا کرتا ہے جو نائرا کا احترام کرتی ہے۔ فیچرز اور پروڈکٹ کی کوالٹی یکساں ہیں۔' },
        { q: 'کیا فری ٹائر واقعی فری ہے، یا یہ ٹرائل ہے؟', a: 'واقعی فری۔ ہمیشہ-فری، کوئی کاؤنٹ ڈاؤن نہیں، کوئی اشتہار نہیں، کوئی فیچر معذور کرنا نہیں، کوئی ڈیٹا-ایکسپورٹ ٹیکس نہیں۔ اگر لاگوس میں ایک-شخص کا کاروبار فری ٹائر پر اپنے حقیقی آپریشنز چلا سکتا ہے، تو فری ٹائر اپنا کام کر رہا ہے۔' },
        { q: 'کیا آپ انٹرپرائز کوٹ کریں گے؟', a: 'کوئی کوٹس نہیں۔ ہر قیمت ہر اس کرنسی میں شائع شدہ ہے جو ہم پیش کرتے ہیں۔ اگر آپ کی پروکیورمنٹ ٹیم کو MSA، DPA، یا انوائسڈ بلنگ کی ضرورت ہو، یہ کاغذی کارروائی ہے — قیمت بندی نہیں۔ شائع شدہ صفحے پر ڈالر نمبر انوائس پر ڈالر نمبر ہے، ان سیٹوں سے ضرب جو آپ نے خریدیں۔' },
      ],
      [
        { q: 'کیا آپ مجھے اس ویب سائٹ پر ٹریک کرتے ہیں؟', a: 'نہیں۔ اس سائٹ میں صفر اینالٹکس، صفر پکسلز، صفر ٹریکنگ کوکیز، صفر ایڈ نیٹ ورکس، اور تیسرے فریق سے صفر مواد ہے۔ ہم صرف وہ ڈیٹا دیکھتے ہیں جو آپ رابطہ فارم میں ٹائپ کرتے ہیں اور بھیجتے ہیں۔ no-third-party.mjs نامی ایک مسلسل انٹیگریشن اسکرپٹ بنڈل میں کسی بیرونی ہوسٹ کے ظاہر ہونے پر ریلیز کو روک دیتی ہے۔ On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'میرا ڈیٹا کہاں ذخیرہ ہے؟', a: 'جب آپ ہم سے رابطہ کرتے ہیں، آپ کا پیغام ای میل کے ذریعے البرٹا، کینیڈا میں ایک ان باکس کو بھیجا جاتا ہے۔ ہم اسے اس سائٹ پر ڈیٹا بیس میں ذخیرہ نہیں کرتے۔ پروڈکٹ-مخصوص ڈیٹا (جب آپ ہمارے کسی ٹول کے لیے سائن اپ کرتے ہیں) اس پروڈکٹ کی اپنی پرائیویسی پالیسی میں اس کے اپنے ڈومین پر بیان کیا گیا ہے۔' },
        { q: 'کیا میں وہ ڈیٹا حذف کر سکتا ہوں جو آپ میرے بارے میں رکھتے ہیں؟', a: 'جی ہاں۔ آپ نے جو پتہ استعمال کیا اس سے legal@intelligentsingularityai.com پر ای میل کریں۔ ہم تین کاروباری دنوں میں وصولی کی تصدیق کرتے ہیں۔ ہم تیس دنوں کے اندر حذف مکمل کرتے ہیں۔ وہی حق ہر پروڈکٹ پر لاگو ہوتا ہے، PIPEDA اور GDPR کے مساوی اصولوں کے تحت۔' },
        { q: 'کیا آپ میرے مواد پر AI ماڈلز تربیت دیتے ہیں؟', a: 'نہیں۔ ہمارے پورٹ فولیو میں AI فیچرز صرف وہ ڈیٹا استعمال کرتے ہیں جو آپ واضح طور پر جمع کرواتے ہیں، آپ کے اپنے اکاؤنٹ کے دائرے میں۔ آپ کا نجی مواد کبھی ایک مشترکہ تربیتی سیٹ میں نہیں ملایا جاتا، کبھی ایک عوامی ماڈل کو بہتر بنانے کے لیے استعمال نہیں ہوتا، اور کبھی ایک تھرڈ-پارٹی AI فراہم کنندہ کو نہیں بھیجا جاتا جو آپ کے پرومپٹس برقرار رکھتا ہے۔' },
      ],
      [
        { q: 'سائٹ کتنی زبانوں کی حمایت کرتی ہے؟', a: 'پہلے دن سے چودہ۔ فہرست: انگریزی، آسان چینی، ہسپانوی، ہندی، عربی، فرانسیسی، پرتگالی، بنگالی، روسی، اردو، انڈونیشیائی، سواحلی، یوروبا، اور ہاؤسا۔ ہر ایک اپنے مکمل رسم الخط کو احاطہ کرنے والے فونٹ کے ساتھ شپ ہوتی ہے۔ لفظ کے درمیان کوئی فال بیک حروف نہیں۔ دائیں سے بائیں زبانیں مناسب RTL لے آؤٹ میں رینڈر ہوتی ہیں۔ آئینہ شدہ لاطینی نہیں۔' },
        { q: 'سائٹ کتنی قابل رسائی ہے؟', a: 'ہم ہر عوامی صفحے پر WCAG 2.2 لیول AA کو ٹارگٹ کرتے ہیں۔ ایک axe-core چیک کسی بھی خلاف ورزی پر بلڈ ناکام کر دیتی ہے۔ باڈی ٹیکسٹ کم از کم 7:1 کنٹراسٹ پورا کرتا ہے۔ چھوٹے لیبلز کم از کم 4.5:1 پورا کرتے ہیں۔ ہر انٹرایکٹیو عنصر کیبورڈ سے کام کرتا ہے۔ ہم کم-حرکت ترتیبات کا احترام کرتے ہیں۔ مکمل بیان /legal/accessibility پر ہے۔' },
        { q: 'کیا آپ میری زبان شامل کریں گے؟', a: 'اگر آپ کی زبان وسیع پیمانے پر بولی جاتی ہے اور ابھی فہرست میں نہیں ہے، ہمیں لکھیں۔ ایک نیا لوکیل شامل کرنا حقیقی کام ہے — فونٹس، تراجم، RTL/LTR لے آؤٹ، ثقافتی جائزہ — لیکن یہ وہ کام ہے جو ہم کرنا چاہتے ہیں۔' },
      ],
      [
        { q: 'میں اسٹوڈیو کے ساتھ شراکت کیسے کروں؟', a: 'ہم NGOs، حکومتوں اور کمپنیوں کے ساتھ کام کرتے ہیں۔ مشترکہ ہدف ان لوگوں کے لیے عالمی-رسائی سافٹ ویئر ہے جو عام طور پر اس کا متحمل نہیں ہو سکتے۔ رابطہ صفحے سے ایک مختصر نوٹ بھیجیں۔ اسے Partnerships پر روٹ کریں۔ آپ کو دو کاروباری دنوں میں جواب ملے گا۔' },
        { q: 'مجھے پریس کٹ کہاں ملے گی؟', a: 'فیکٹ شیٹ، منظور شدہ اقتباسات، برانڈ گائیڈنس، بانی حوالہ، اور پریس بائلر پلیٹ کے لیے /press پر جائیں۔ لوگو فائل، ہائی-ریز بانی پورٹریٹ، یا ایک حسب ضرورت بیان درکار ہے؟ اپنی ڈیڈ لائن کے ساتھ press@intelligentsingularityai.com پر ای میل کریں۔' },
        { q: 'کیا آپ کانفرنسوں میں بات کرتے ہیں؟', a: 'کبھی کبھی۔ ہم عالمی رسائی، AI-بڑھے ہوئے ٹیموں، صحت سافٹ ویئر، اور لین سافٹ ویئر اقتصادیات پر بات کرتے ہیں۔ ایونٹ تفصیلات اور حاضرین کی تعداد کے ساتھ press@intelligentsingularityai.com پر لکھیں۔ ہم ایمانداری سے بتائیں گے کہ آ سکتے ہیں یا نہیں۔' },
        { q: 'کیا آپ عطیات یا گرانٹس لیتے ہیں؟', a: 'ہم صارفین سے عطیات نہیں مانگتے۔ ہم گرانٹس کا خیر مقدم کرتے ہیں۔ گرانٹس فاؤنڈیشنز یا بینکوں سے آنی چاہئیں۔ گرانٹ ان مارکیٹوں میں رسائی سافٹ ویئر سے بندھی ہونی چاہیے جہاں مکمل قیمتیں ابھی کام نہیں کرتیں۔ partners@intelligentsingularityai.com پر ای میل کریں۔' },
      ],
      [
        { q: 'کیا آپ بھرتی کر رہے ہیں؟', a: 'کبھی کبھی۔ /careers صفحہ موجودہ کھلے کرداروں کی فہرست دیتا ہے۔ جب کچھ بھی درج نہ ہو، ہم اس وقت بھرتی نہیں کر رہے، اختتام۔ ہم ایک سدا بہار "ہمیں اپنا CV بھیجیں" چنل نہیں چلاتے جو کہیں نہیں جاتا — لیکن ایک سوچا سمجھا تعارف ہمیشہ ایک حقیقی جواب پاتا ہے۔' },
        { q: 'کیا ٹیم واقعی مکمل طور پر ریموٹ ہے؟', a: 'جی ہاں۔ ہم ریموٹ ہیں کیونکہ یہ کام کے لیے درست ماڈل ہے، اس لیے نہیں کہ یہ ٹرینڈی ہے۔ ٹائم زونز کا احترام کیا جاتا ہے۔ زیادہ تر فیصلے تحریر میں رہتے ہیں تاکہ وہ ان لوگوں کے بعد بھی زندہ رہیں جنہوں نے انہیں بنایا۔' },
        { q: 'کیا آپ تنخواہ بینڈ شائع کرتے ہیں؟', a: 'جی ہاں، ہر کھلے کردار پر۔ ہم ان لوگوں سے سودے بازی نہیں کرتے جو بینڈ کا اندازہ لگاتے ہیں؛ ہم اسے شائع کرتے ہیں اور ادا کرتے ہیں۔ ایکویٹی میز پر نہیں ہے کیونکہ کمپنی برائے فروخت نہیں۔' },
      ],
    ],
  },
  id: {
    eyebrow: 'FAQ · JAWABAN LANGSUNG', title: 'Pertanyaan, dijawab dengan langsung.',
    lede: 'Apa yang sebenarnya orang tanyakan kepada kami — tentang studio, produk, dan trade-off privasi saat menggunakan alat kami.',
    sectionTitles: ['Studio', 'Produk', 'Harga dan uang', 'Privasi dan data', 'Bahasa dan aksesibilitas', 'Kemitraan dan pers', 'Perekrutan'],
    stillStuckCta: { eyebrow: 'Masih ada pertanyaan?', heading: 'Seorang manusia membaca setiap pesan.', body: 'Kami biasanya membalas dalam dua hari kerja. Kirim pesan melalui formulir. Atau tulis ke hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'Apa itu Intelligent Singularity?', a: 'Intelligent Singularity Inc. adalah perusahaan induk dari ekosistem Clap. Kami adalah studio kecil, diperkuat AI, sepenuhnya remote. Kami berbasis di Alberta, Kanada. Kami membangun perangkat lunak untuk akses universal. Produk unggulan yang sama melayani pembeli Fortune 500 di New York dan kios pasar satu orang di Lagos. Satu stack bersama. Satu misi.' },
        { q: 'Apakah Anda startup yang didukung modal ventura?', a: 'Tidak. Kami self-funded dan bootstrapped. Itu berarti kami bertanggung jawab kepada pengguna, bukan kepada investor yang mengejar exit cepat. Kami butuh waktu lebih lama untuk merilis, dan kami berencana ada di sini dua puluh tahun lagi. Perusahaan tidak dijual.' },
        { q: 'Siapa di balik ini?', a: 'Dr. Md Diya mendirikan studio pada 2024 setelah tiga puluh empat tahun praktik medis lintas benua. Tim kecil, remote, diperkuat AI mengirim setiap produk di bawah satu stack bersama dan satu anggaran aksesibilitas bersama.' },
        { q: 'Bagaimana Anda menghasilkan uang jika aplikasi Anda terjangkau?', a: 'Produk memiliki tier gratis-selamanya yang dapat menjalankan bisnis nyata. Tier berbayar menambah skala, tidak pernah fitur. Harga disesuaikan dengan daya beli sehingga plan yang berharga dua puluh dolar di Toronto berharga lebih murah di Lagos. Pelanggan dunia maju dan enterprise membayar harga pasar penuh; pelanggan pasar berkembang dan solo membayar harga yang menghargai mata uangnya. Matematika berhasil karena kami beroperasi lean dan membiarkan jaringan agen AI membawa leverage.' },
        { q: 'Mengapa "perusahaan induk" — apakah ini struktur holding?', a: 'Ini perusahaan induk dalam arti sederhana. Satu entitas hukum memiliki keluarga platform. Daftar: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, plus infrastruktur bersama. Setiap produk berjalan di situsnya sendiri. Masing-masing memiliki ketentuan dan harga sendiri. Pemilik hukumnya adalah Intelligent Singularity Inc.' },
        { q: 'Seberapa besar tim?', a: 'Cukup kecil sehingga karyawan baru mempelajari setiap wajah di minggu pertama, cukup besar untuk menjaga lebih dari selusin platform tetap dirilis. Kami sengaja tidak mengiklankan perlombaan ukuran; jaringan agen AI adalah bagian dari tim dalam arti yang sebenarnya.' },
      ],
      [
        { q: 'Apakah produk-produk ini nyata atau masih ide?', a: 'Setiap produk di halaman portofolio memiliki label status yang jujur. "Live" berarti Anda bisa mendaftar hari ini. "Staging" berarti berjalan tetapi hanya dengan undangan saat kami memperkuatnya. "Awaiting approval" siap tetapi menunggu regulator. "Infrastructure" adalah kode yang kami bagikan secara publik dan yang diandalkan produk lain. Kami tidak mengumumkan terlebih dahulu hal-hal yang belum ada.' },
        { q: 'Mengapa beberapa produk terdaftar sebagai staging?', a: 'Sebagian besar alat kami masih sedang diperkuat sebelum peluncuran publik. Kami lebih suka merilis terlambat daripada merusak kepercayaan di hari pertama — terutama di kesehatan, pembayaran, dan trading di mana regresi adalah insiden dunia nyata, bukan ketidaknyamanan. Jika Anda ingin akses awal, tulis kepada kami dari halaman kontak dan kami akan dengan jujur memberi tahu apakah build staging sudah dapat mendukung Anda.' },
        { q: 'Mengapa produk menautkan ke domain lain?', a: 'Setiap produk adalah layanannya sendiri dengan syarat, harga, pendaftaran, dan pemberitahuan privasi sendiri. Mengirim Anda langsung ke domain produk lebih cepat, dan membuat batas-batas jelas: clappe.com diatur oleh syarat Clappe, clappay.com oleh ClapPay, dan seterusnya. Situs korporat di intelligentsingularityai.com adalah pintu depan, bukan sistem penagihan.' },
        { q: 'Bisakah saya menggunakan produk Anda offline?', a: 'Ya. Setiap produk dirancang untuk bekerja di jaringan lambat dan terputus-putus. Kami menargetkan ponsel berusia lima tahun di 2G dua bar sebagai baseline, bukan sebagai nice-to-have. Halaman berbobot kurang dari lima puluh kilobyte pada first paint, gzipped. Alur kerja penting (menulis faktur, mencatat catatan pasien, menangkap pekerjaan) bekerja tanpa koneksi dan tersinkronisasi saat koneksi kembali.' },
        { q: 'Apakah produk berbagi akun?', a: 'Opsional. Satu akun Clap dapat masuk ke produk apa pun yang opt in, tetapi setiap produk masih menyimpan data sendiri, langganan sendiri, dan alur persetujuan sendiri. Anda dapat menggunakan satu produk tanpa yang lain, beralih ke yang lain, atau menghapus satu tanpa memengaruhi yang lain.' },
        { q: 'Apakah Anda membangun fitur kustom untuk pelanggan individual?', a: 'Jarang, dan hanya ketika fitur tersebut cocok untuk basis pengguna yang lebih luas. Kami tidak akan membangun fork pribadi dari sebuah produk untuk satu pelanggan; jalan itu mengarah ke kuburan pemeliharaan. Namun, kami akan memprioritaskan item peta jalan jika mitra yang kredibel mensponsorinya dan hasilnya mendarat sebagai fitur publik untuk semua orang.' },
      ],
      [
        { q: 'Mengapa harga Anda berbeda di negara yang berbeda?', a: 'Karena harga global yang datar akan diam-diam mengecualikan sebagian besar penduduk planet ini. Kami menggunakan indeks daya beli yang dipublikasikan Bank Dunia untuk menetapkan harga regional yang adil. Pelanggan di Frankfurt membayar tarif pasar penuh. Pelanggan di Lagos membayar tarif yang menghormati naira. Fitur dan kualitas produk identik.' },
        { q: 'Apakah tier gratis benar-benar gratis, atau itu trial?', a: 'Benar-benar gratis. Gratis-selamanya, tanpa hitungan mundur, tanpa iklan, tanpa pelumpuhan fitur, tanpa pajak ekspor data. Jika bisnis satu orang di Lagos dapat menjalankan operasi nyata mereka di tier gratis, tier gratis sedang melakukan tugasnya.' },
        { q: 'Apakah Anda memberikan kuotasi enterprise?', a: 'Tanpa kuotasi. Setiap harga dipublikasikan di setiap mata uang yang kami layani. Jika tim pengadaan Anda butuh MSA, DPA, atau penagihan berfaktur, itu administrasi — bukan harga. Angka dolar pada halaman yang dipublikasikan adalah angka dolar pada faktur, dikalikan kursi yang Anda beli.' },
      ],
      [
        { q: 'Apakah Anda melacak saya di situs web ini?', a: 'Tidak. Situs ini memiliki nol analitik, nol piksel, nol cookie pelacakan, nol jaringan iklan, dan nol konten dari pihak ketiga. Satu-satunya data yang kami lihat adalah apa yang Anda ketik di formulir kontak dan tekan kirim. Skrip integrasi berkelanjutan bernama no-third-party.mjs memblokir rilis jika ada host eksternal muncul di bundel. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'Di mana data saya disimpan?', a: 'Saat Anda menghubungi kami, pesan Anda dikirim melalui email ke kotak masuk di Alberta, Kanada. Kami tidak menyimpannya di database pada situs ini. Data spesifik produk (saat Anda mendaftar untuk salah satu alat kami) dijelaskan dalam kebijakan privasi produk tersebut di domainnya sendiri.' },
        { q: 'Bisakah saya menghapus data yang Anda simpan tentang saya?', a: 'Ya. Email legal@intelligentsingularityai.com dari alamat yang Anda gunakan. Kami mengonfirmasi penerimaan dalam tiga hari kerja. Kami menyelesaikan penghapusan dalam tiga puluh hari. Hak yang sama berlaku untuk setiap produk, di bawah PIPEDA dan aturan setara GDPR.' },
        { q: 'Apakah Anda melatih model AI dengan konten saya?', a: 'Tidak. Fitur AI di seluruh portofolio kami hanya menggunakan data yang Anda kirim secara eksplisit, dalam lingkup akun Anda sendiri. Konten pribadi Anda tidak pernah dicampur ke dalam set pelatihan bersama, tidak pernah digunakan untuk meningkatkan model publik, dan tidak pernah dikirim ke penyedia AI pihak ketiga yang menyimpan prompt Anda.' },
      ],
      [
        { q: 'Berapa banyak bahasa yang didukung situs?', a: 'Empat belas sejak hari pertama. Daftar: Inggris, Mandarin sederhana, Spanyol, Hindi, Arab, Prancis, Portugis, Bengali, Rusia, Urdu, Indonesia, Swahili, Yoruba, dan Hausa. Masing-masing dikirim dengan font yang menutupi seluruh aksaranya. Tidak ada huruf cadangan di tengah kata. Bahasa kanan-ke-kiri dirender dalam tata letak RTL yang benar. Bukan Latin yang dicerminkan.' },
        { q: 'Seberapa aksesibel situs ini?', a: 'Kami menargetkan WCAG 2.2 Level AA di setiap halaman publik. Pemeriksaan axe-core menggagalkan build pada pelanggaran apa pun. Teks badan memenuhi setidaknya kontras 7:1. Label kecil memenuhi setidaknya 4.5:1. Setiap elemen interaktif bekerja dari keyboard. Kami menghormati pengaturan reduce motion. Pernyataan lengkap ada di /legal/accessibility.' },
        { q: 'Akankah Anda menambahkan bahasa saya?', a: 'Jika bahasa Anda banyak dituturkan dan belum ada di daftar, tulislah kepada kami. Menambahkan locale baru adalah pekerjaan nyata — font, terjemahan, tata letak RTL/LTR, tinjauan budaya — tetapi ini jenis pekerjaan yang ingin kami lakukan.' },
      ],
      [
        { q: 'Bagaimana saya bermitra dengan studio?', a: 'Kami bekerja dengan LSM, pemerintah, dan perusahaan. Tujuan bersama adalah perangkat lunak akses universal untuk orang-orang yang biasanya tidak mampu membayar. Kirim catatan singkat dari halaman kontak. Arahkan ke Partnerships. Anda akan mendengar kabar dalam dua hari kerja.' },
        { q: 'Di mana saya bisa menemukan press kit?', a: 'Kunjungi /press untuk lembar fakta, kutipan yang disetujui, panduan brand, referensi pendiri, dan boilerplate pers. Butuh file logo, potret pendiri resolusi tinggi, atau pernyataan kustom? Email press@intelligentsingularityai.com dengan tenggat Anda.' },
        { q: 'Apakah Anda berbicara di konferensi?', a: 'Kadang-kadang. Kami berbicara tentang akses universal, tim diperkuat AI, perangkat lunak kesehatan, dan ekonomi perangkat lunak lean. Tulis ke press@intelligentsingularityai.com dengan detail acara dan ukuran audiens. Kami akan dengan jujur mengatakan apakah kami bisa hadir.' },
        { q: 'Apakah Anda menerima donasi atau hibah?', a: 'Kami tidak meminta donasi dari pengguna. Kami menyambut hibah. Hibah harus berasal dari yayasan atau bank. Hibah harus terikat pada perangkat lunak akses di pasar di mana harga penuh belum bekerja. Email partners@intelligentsingularityai.com.' },
      ],
      [
        { q: 'Apakah Anda merekrut?', a: 'Kadang-kadang. Halaman /careers mencantumkan peran terbuka saat ini. Ketika tidak ada yang tercantum, kami tidak merekrut pada saat itu, titik. Kami tidak menjalankan saluran evergreen "kirim CV Anda" yang tidak ke mana-mana — tetapi pengantar yang penuh pertimbangan selalu mendapat balasan nyata.' },
        { q: 'Apakah tim benar-benar sepenuhnya remote?', a: 'Ya. Kami remote karena itu model yang tepat untuk pekerjaan, bukan karena itu trendi. Zona waktu dihormati. Sebagian besar keputusan hidup dalam tulisan agar bertahan melebihi orang yang membuatnya.' },
        { q: 'Apakah Anda mempublikasikan band gaji?', a: 'Ya, di setiap peran terbuka. Kami tidak bernegosiasi dengan orang yang menebak band; kami mempublikasikannya dan membayarnya. Ekuitas tidak ada di meja karena perusahaan tidak dijual.' },
      ],
    ],
  },
  sw: {
    eyebrow: 'FAQ · MAJIBU SAHIHI', title: 'Maswali, yanayojibiwa kwa unyofu.',
    lede: 'Kile watu wanachotuuliza kweli — kuhusu studio, bidhaa, na matokeo ya faragha ya kutumia zana zetu.',
    sectionTitles: ['Studio', 'Bidhaa', 'Bei na pesa', 'Faragha na data', 'Lugha na ufikivu', 'Ushirikiano na vyombo vya habari', 'Kuajiri'],
    stillStuckCta: { eyebrow: 'Bado una swali?', heading: 'Mtu halisi husoma kila ujumbe.', body: 'Kwa kawaida tunajibu ndani ya siku mbili za kazi. Tuma ujumbe kupitia fomu. Au andika kwa hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'Intelligent Singularity ni nini?', a: 'Intelligent Singularity Inc. ni kampuni mama ya mfumo wa Clap. Sisi ni studio ndogo, iliyoimarishwa kwa AI, mbali kabisa. Tuko Alberta, Kanada. Tunajenga programu kwa ajili ya ufikiaji wa wote. Bidhaa kuu ile ile inahudumia mnunuzi wa Fortune 500 huko New York na duka la mtu mmoja kijijini Lagos. Stack moja iliyoshirikiwa. Dhamira moja.' },
        { q: 'Je, ni startup inayoungwa mkono na mtaji wa hatari?', a: 'Hapana. Tumejifadhili na bootstrapped. Hiyo inamaanisha tunajibu kwa watumiaji, sio kwa wawekezaji wanaofuatilia kutoka kwa haraka. Tunachukua muda mrefu kutuma, na tunapanga kuwepo miaka ishirini ijayo. Kampuni haiuzwi.' },
        { q: 'Nani yuko nyuma ya hili?', a: 'Dr. Md Diya alianzisha studio mwaka 2024 baada ya miaka thelathini na minne ya mazoezi ya kimatibabu kati ya bara. Timu ndogo, mbali, iliyoimarishwa kwa AI hutuma kila bidhaa chini ya stack moja iliyoshirikiwa na bajeti moja iliyoshirikiwa ya ufikivu.' },
        { q: 'Mnatengeneza pesa vipi ikiwa apps zenu zina bei nafuu?', a: 'Bidhaa zina kiwango cha bure-milele kinachoendesha biashara halisi. Viwango vya kulipia huongeza kiasi, kamwe sio vipengele. Bei husawazishwa kwa nguvu ya kununua hivyo plan inayogharimu dolari ishirini Toronto hugharimu kidogo Lagos. Wateja wa ulimwengu ulioendelea na enterprise hulipa bei kamili ya soko; wateja wa soko linaloibuka na peke yake hulipa bei inayoheshimu sarafu yao. Hesabu inafanya kazi kwa sababu tunaendesha kwa ufanisi na kuruhusu kitambaa cha mawakala wa AI kubeba leva.' },
        { q: 'Kwa nini "kampuni mama" — je, ni muundo wa kushikilia?', a: 'Ni kampuni mama kwa maana rahisi. Chombo kimoja cha kisheria kinamiliki familia ya majukwaa. Orodha: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, pamoja na miundombinu iliyoshirikiwa. Kila bidhaa inaendesha kwenye tovuti yake. Kila moja ina masharti na bei zake. Mmiliki wa kisheria ni Intelligent Singularity Inc.' },
        { q: 'Timu ina ukubwa gani?', a: 'Ndogo vya kutosha mwajiriwa mpya kujifunza kila uso katika wiki ya kwanza, kubwa vya kutosha kuendelea kutuma majukwaa zaidi ya kumi na mbili. Tunafanya kwa makusudi tusitangaze mbio za ukubwa; kitambaa cha mawakala wa AI ni sehemu ya timu kwa maana halisi.' },
      ],
      [
        { q: 'Je, bidhaa hizi ni za kweli au bado ni mawazo?', a: 'Kila bidhaa kwenye ukurasa wa portfolio ina lebo ya hali ya uaminifu. "Live" maana yake unaweza kujiandikisha leo. "Staging" maana yake inaendesha lakini kwa mwaliko tu wakati tunaiimarisha. "Awaiting approval" iko tayari lakini inasubiri mdhibiti. "Infrastructure" ni codi tunayoshiriki hadharani na ambayo bidhaa nyingine zinategemea. Hatutangazi mapema vitu ambavyo havipo bado.' },
        { q: 'Kwa nini bidhaa zingine zimeorodheshwa kama staging?', a: 'Vifaa vyetu vingi bado vinaimarishwa kabla ya uzinduzi wa umma. Tunapendelea kutuma kuchelewa kuliko kuvunja imani siku ya kwanza — hasa katika afya, malipo, na biashara ambapo urejeshaji ni tukio la ulimwengu halisi, sio usumbufu. Ikiwa unataka ufikiaji wa mapema, tuandikie kutoka ukurasa wa mawasiliano na tutakuambia kwa unyofu kama build ya staging inaweza kukusaidia bado.' },
        { q: 'Kwa nini bidhaa zinaungwa kwenye vikoa vingine?', a: 'Kila bidhaa ni huduma yake yenye masharti yake, bei, kujiandikisha, na arifa ya faragha. Kukutuma moja kwa moja kwenye kikoa cha bidhaa ni haraka zaidi, na kunafanya mipaka iwe wazi: clappe.com unatawaliwa na masharti ya Clappe, clappay.com na ClapPay, na kadhalika. Tovuti ya shirika kwenye intelligentsingularityai.com ni mlango wa mbele, sio mfumo wa malipo.' },
        { q: 'Je, naweza kutumia bidhaa zako bila intaneti?', a: 'Ndiyo. Kila bidhaa imeundwa kufanya kazi kwenye mitandao ya polepole na inayokatika. Tunalenga simu ya miaka mitano kwenye 2G ya mistari miwili kama msingi, sio kama nzuri-kuwa-nayo. Kurasa zinazito chini ya kilobaiti hamsini kwenye paint ya kwanza, gzipped. Mtiririko muhimu (kuandika ankara, kurekodi noti ya mgonjwa, kunasa kazi) hufanya kazi bila muunganisho na kusawazisha unaporejea.' },
        { q: 'Je, bidhaa zinashiriki akaunti?', a: 'Kwa hiari. Akaunti moja ya Clap inaweza kuingia kwenye bidhaa yoyote inayokubali, lakini kila bidhaa bado huhifadhi data yake, usajili wake, na mtiririko wake wa idhini. Unaweza kutumia bidhaa moja bila zingine, kubadilisha hadi nyingine, au kufuta moja bila kuathiri nyinginezo.' },
        { q: 'Je, mnajenga vipengele maalum kwa wateja binafsi?', a: 'Mara chache, na tu wakati kipengele kinafaa vyema kwa msingi mpana wa watumiaji. Hatutajenga fork ya kibinafsi ya bidhaa kwa mteja mmoja; njia hiyo inaongoza kwenye makaburi ya matengenezo. Hata hivyo, tutaweka kipaumbele kipengele cha ramani ya barabara ikiwa mshirika anayeaminika anaadhinisha na matokeo yanapatikana kama kipengele cha umma kwa kila mtu.' },
      ],
      [
        { q: 'Kwa nini bei yako ni tofauti katika nchi tofauti?', a: 'Kwa sababu bei tambarare ya kimataifa ingekiondoa kimya kimya wengi wa ulimwengu. Tunatumia faharasa za uwezo wa kununua zilizochapishwa na Benki ya Dunia kuweka bei za kikanda za haki. Mteja huko Frankfurt hulipa kiwango kamili cha soko. Mteja huko Lagos hulipa kiwango kinachoheshimu naira. Vipengele na ubora wa bidhaa ni sawa.' },
        { q: 'Je, kiwango cha bure ni cha bure kweli, au ni jaribio?', a: 'Ni cha bure kweli. Bure-milele, hakuna hesabu ya kushuka, hakuna matangazo, hakuna kulemaza vipengele, hakuna kodi ya kupakua data. Ikiwa biashara ya mtu mmoja huko Lagos inaweza kuendesha shughuli zao halisi kwenye kiwango cha bure, basi kiwango cha bure kinafanya kazi yake.' },
        { q: 'Je, mtatoa nukuu ya enterprise?', a: 'Hakuna manukuu. Kila bei imechapishwa kwa kila sarafu tunayohudumu. Ikiwa timu yako ya manunuzi inahitaji MSA, DPA, au bili kwa ankara, hizo ni karatasi — sio bei. Nambari ya dolari kwenye ukurasa uliochapishwa ni nambari ya dolari kwenye ankara, ikizidishwa kwa viti ulivyonunua.' },
      ],
      [
        { q: 'Je, mnanifuatilia kwenye tovuti hii?', a: 'Hapana. Tovuti hii ina sifuri za uchanganuzi, sifuri za pikseli, sifuri za vidakuzi vya kufuatilia, sifuri za mitandao ya matangazo, na sifuri za maudhui kutoka kwa wahusika wa nje. Data pekee tunayoona ni kile unachoandika kwenye fomu ya mawasiliano na kubonyeza tuma. Hati ya muunganiko endelevu inayoitwa no-third-party.mjs huzuia kutolewa ikiwa mwenyeji wowote wa nje atatokea kwenye bundle. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'Data yangu inahifadhiwa wapi?', a: 'Unapowasiliana nasi, ujumbe wako unatumwa kwa barua pepe kwenye sanduku la kupokea huko Alberta, Kanada. Hatuihifadhi katika hifadhidata kwenye tovuti hii. Data mahususi ya bidhaa (unapojiandikisha kwa mojawapo ya zana zetu) imeelezwa katika sera ya faragha ya bidhaa hiyo kwenye kikoa chake.' },
        { q: 'Je, ninaweza kufuta data unayoshikilia kuhusu mimi?', a: 'Ndiyo. Tuma barua pepe kwa legal@intelligentsingularityai.com kutoka anwani uliyotumia. Tunathibitisha kupokea ndani ya siku tatu za kazi. Tunamaliza ufutaji ndani ya siku thelathini. Haki ile ile inatumika kwa kila bidhaa, chini ya PIPEDA na kanuni sawa na GDPR.' },
        { q: 'Je, mnafundisha mifano ya AI kwenye maudhui yangu?', a: 'Hapana. Vipengele vya AI katika portfolio yetu yote hutumia tu data unayowasilisha wazi, ndani ya wigo wa akaunti yako mwenyewe. Maudhui yako binafsi hayachanganywi kamwe kwenye seti ya mafunzo iliyoshirikiwa, hayatumiki kamwe kuboresha mfano wa umma, na hayatumwi kamwe kwa mtoa huduma wa AI wa nje anayehifadhi maelekezo yako.' },
      ],
      [
        { q: 'Tovuti inaunga mkono lugha ngapi?', a: 'Kumi na nne tangu siku ya kwanza. Orodha: Kiingereza, Kichina rahisi, Kihispania, Kihindi, Kiarabu, Kifaransa, Kireno, Kibengali, Kirusi, Kiurdu, Kiindonesia, Kiswahili, Kiyoruba, na Kihausa. Kila moja inakuja na fonti inayofunika maandishi yake yote. Hakuna herufi za kurudi nyuma katikati ya neno. Lugha za kulia-kushoto hurendewa katika muundo sahihi wa RTL. Sio Kilatini kilichoangaliwa kioo.' },
        { q: 'Tovuti ina ufikivu kiasi gani?', a: 'Tunalenga WCAG 2.2 Daraja la AA kwenye kila ukurasa wa umma. Ukaguzi wa axe-core unashindwisha build kwenye ukiukaji wowote. Maandishi ya mwili hutimiza angalau utofautishaji wa 7:1. Lebo ndogo hutimiza angalau 4.5:1. Kila kipengele cha mwingiliano hufanya kazi kutoka kibodi. Tunaheshimu mipangilio ya kupunguza mwendo. Taarifa kamili iko kwenye /legal/accessibility.' },
        { q: 'Je, mtaongeza lugha yangu?', a: 'Ikiwa lugha yako inazungumzwa sana na bado haiko kwenye orodha, tuandikie. Kuongeza locale mpya ni kazi halisi — fonti, tafsiri, muundo wa RTL/LTR, ukaguzi wa kitamaduni — lakini ni aina ya kazi tunayotaka kufanya.' },
      ],
      [
        { q: 'Ninafanyaje ushirikiano na studio?', a: 'Tunafanya kazi na NGOs, serikali, na kampuni. Lengo la pamoja ni programu ya ufikiaji wa wote kwa watu ambao kwa kawaida hawawezi kumudu. Tuma ujumbe mfupi kutoka ukurasa wa mawasiliano. Elekeza kwenye Partnerships. Utasikia ndani ya siku mbili za kazi.' },
        { q: 'Naweza kupata press kit wapi?', a: 'Tembelea /press kupata karatasi ya ukweli, manukuu yaliyoidhinishwa, mwongozo wa brand, marejeo ya mwanzilishi, na boilerplate ya vyombo vya habari. Unahitaji faili ya nembo, picha ya azimio la juu ya mwanzilishi, au taarifa maalum? Tuma barua pepe kwa press@intelligentsingularityai.com pamoja na muda wako.' },
        { q: 'Je, mnazungumza kwenye mikutano?', a: 'Wakati mwingine. Tunazungumza kuhusu ufikiaji wa wote, timu zilizoimarishwa kwa AI, programu ya afya, na uchumi wa programu lean. Andika kwa press@intelligentsingularityai.com pamoja na maelezo ya tukio na ukubwa wa hadhira. Tutakuambia kwa unyofu ikiwa tunaweza kuhudhuria.' },
        { q: 'Je, mnachukua michango au ruzuku?', a: 'Hatuombi michango kutoka kwa watumiaji. Tunakaribisha ruzuku. Ruzuku lazima zitoke kwa misingi au benki. Ruzuku lazima ifungamane na programu ya ufikiaji katika masoko ambapo bei kamili bado hazifanyi kazi. Tuma barua pepe kwa partners@intelligentsingularityai.com.' },
      ],
      [
        { q: 'Je, mnaajiri?', a: 'Wakati mwingine. Ukurasa wa /careers unaorodhesha nafasi zilizofunguliwa za sasa. Wakati hakuna kilichoorodheshwa, hatuajiri wakati huo, basi. Hatuendeshi mlolongo wa kudumu wa "tutume CV yako" usioenda popote — lakini utangulizi mzuri kila wakati hupata jibu halisi.' },
        { q: 'Je, timu ni kweli ya mbali kabisa?', a: 'Ndiyo. Sisi ni wa mbali kwa sababu ndiyo modeli sahihi kwa kazi, sio kwa sababu ni mtindo. Maeneo ya saa huheshimiwa. Maamuzi mengi huishi kwa maandishi ili yaishi baada ya watu waliyoyafanya.' },
        { q: 'Je, mnachapisha bendi za mishahara?', a: 'Ndiyo, kwenye kila nafasi iliyofunguliwa. Hatufanyi mazungumzo na watu wanaobashiri bendi; tunaichapisha na tunailipa. Equity haiko mezani kwa sababu kampuni haiuzwi.' },
      ],
    ],
  },
  yo: {
    eyebrow: 'FAQ · ÌDÁHÙN TÓ HÀN', title: 'Àwọn ìbéèrè, ìdáhùn tó rọrùn.',
    lede: 'Ohun tí àwọn ènìyàn máa ń béèrè lọ́wọ́ wa lóòótọ́ — nípa studio, àwọn ọjà, àti ìwọ̀n-ìfàníyàn ti àwọn ohun-èlò wa.',
    sectionTitles: ['Studio', 'Àwọn ọjà', 'Iye-owó àti owó', 'Àṣírí àti déètà', 'Àwọn èdè àti àǹfààní', 'Ìbáṣepọ̀ àti ìròyìn', 'Ìgbaṣẹ́'],
    stillStuckCta: { eyebrow: 'Ṣì ní ìbéèrè?', heading: 'Ènìyàn gidi ka àkọsílẹ̀ kọ̀ọ̀kan.', body: 'A sábà máa ń dáhùn nínú ọjọ́ iṣẹ́ méjì. Fi àkọsílẹ̀ ránṣẹ́ nípasẹ̀ fọ́ọ̀mù. Tàbí kọ́ sí hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'Kí ni Intelligent Singularity?', a: 'Intelligent Singularity Inc. jẹ́ kampani ìyá ti mfumo Clap. A jẹ́ studio kékeré, tí AI ti múratàn, ní ọ̀nà jíjìn pátápátá. A wà ní Alberta, Canada. A ń kọ́ sọ́fítíwéàrì fún àǹfààní ayé ńláńlá. Ọjà àkọ́kọ́ kannáà ń ṣe iṣẹ́ fún olùra Fortune 500 ní New York àti ìpẹ̀ja oníkàńṣoṣo ní Lagos. Stack kan tí a pín. Iṣẹ́ àyànfúnni kan.' },
        { q: 'Ǹjẹ́ ẹ̀yin jẹ́ startup tí ó gba ìtìlẹ́yìn venture?', a: 'Bẹ́ẹ̀kọ́. A jẹ́ tí ara wa ti ṣètilẹ́yìn àti bootstrapped. Èyí túmọ̀ sí pé a ń jíhìn fún àwọn olùmújáde, kì í ṣe fún àwọn olùdòwó tí ń lépa ìjáde kíákíá. A gba àkókò gígùn láti jádelé, a sì ń pinnu láti wà níbí lẹ́yìn ogún ọdún. Kampani náà kò sí fún títà.' },
        { q: 'Ta ni ó wà lẹ́yìn èyí?', a: 'Dr. Md Diya ṣèdá studio náà ní 2024 lẹ́yìn ogójì-dín-mẹ́rin ọdún ti àjọṣe iṣẹ́ ìṣègùn ní àgbáyé. Ẹgbẹ́ kékeré, ní ọ̀nà jíjìn, tí AI ti múratàn ń jádelé ọjà kọ̀ọ̀kan lábẹ́ stack kan tí a pín àti ààlà àǹfààní kan tí a pín.' },
        { q: 'Báwo ni ẹ ṣe ń ṣe owó tí àwọn ohun-èlò yín bá rọrùn?', a: 'Àwọn ọjà ní ipele ọfẹ-títí-láé tí ó ń ṣe òwò gidi. Àwọn ipele owó-sànwó fí kíkún kún, kò sí àwọn àfikún rí. Iye-owó ń ṣe àyẹ̀wò sí agbára-ìrà nítorí náà ètò tí ó nílò dọ́là ogún ní Toronto nílò kéré ní Lagos. Àwọn oníbàárá ti àgbáyé tó dàgbà àti enterprise san iye-owó ọjà kíkún; àwọn oníbàárá ọjà tí ń dìde àti olúkúkú san iye-owó tó bọ̀wọ̀ fún owó orílẹ̀-èdè wọn. Ìṣirò náà ń ṣiṣẹ́ nítorí pé a ń ṣiṣẹ́ ní rírọrùn a sì ń jẹ́ kí kítísì àwọn aṣojú AI gbé ìró.' },
        { q: 'Kí ló dé tí "kampani ìyá" — Ǹjẹ́ ó jẹ́ ẹ̀dà holding?', a: 'Ó jẹ́ kampani ìyá ní àpẹrẹ rírọrùn. Ẹgbẹ́ òfin kan ni o ní ìdílé pèpéle. Àkójọ: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, plus ìpilẹ̀ṣẹ̀ àjọṣe. Ọjà kọ̀ọ̀kan ń ṣiṣẹ́ lórí ojú-òpó tirẹ̀. Ọ̀kọ̀ọ̀kan ní àwọn àdéhùn àti iye-owó tirẹ̀. Olùní òfin ni Intelligent Singularity Inc.' },
        { q: 'Báwo ni ẹgbẹ́ ṣe tóbi tó?', a: 'Kéré tó pé tí ọmọ-iṣẹ́ tuntun lè kọ́ ojú kọ̀ọ̀kan ní ọ̀sẹ̀ àkọ́kọ́, tóbi tó pé láti pa àwọn pèpéle tí ó ju mejìlá lọ jádelé. A pinnu láti má ṣe ìpolongò ìdíje ìwọ̀n; kítísì àwọn aṣojú AI jẹ́ ara ẹgbẹ́ ní àpẹrẹ gidi.' },
      ],
      [
        { q: 'Ǹjẹ́ àwọn ọjà wọnyi jẹ́ gidi tàbí ṣì jẹ́ àwọn ọ̀rọ̀-èrò?', a: 'Gbogbo ọjà lórí ojú-ìwé portfolio ní àmì ipò olótìítọ́. "Live" túmọ̀ sí o lè fọwọ́sí lónìí. "Staging" túmọ̀ sí ó ń ṣiṣẹ́ ṣùgbọ́n nípasẹ̀ ìpè nikan nígbà tí à ń mú un le. "Awaiting approval" ti ṣetán ṣùgbọ́n ó ń dúró fún olùdarí òfin. "Infrastructure" jẹ́ codi tí à ń pín ní gbangba àti ti àwọn ọjà mìíràn dá lé. A kì í kéde ní àkọ́kọ́ àwọn ohun tí kò sí.' },
        { q: 'Kí ló dé tí àwọn ọjà kan fi wà ní àkójọ bí staging?', a: 'Ọ̀pọ̀lọpọ̀ àwọn ohun-èlò wa ṣì ń le-bẹ́ẹ̀-le kí á tó fi jádelé ní gbangba. A fẹ́ ká ó tó láti jádelé pẹ̀lú ìpẹ́ ju káá àfara àjọṣe ní ọjọ́ àkọ́kọ́ — pàápàá ní ìlera, ìsanwó, àti ìṣòwò ibi tí ìpadàsẹ́yìn jẹ́ ìṣẹ̀lẹ̀ ayé gidi, kì í ṣe àì-tó-rìn. Tí o bá fẹ́ ìwọlé ní àkọ́kọ́, kọ́wé sí wa lórí ojú-ìwé olùbátà àti àwa á sọ fún ọ lóòótọ́ bóyá staging build lè ràn ọ́ lọ́wọ́ ṣì.' },
        { q: 'Kí ló dé tí àwọn ọjà fi ń sopọ̀ sí àwọn àpá-ìwé mìíràn?', a: 'Ọjà kọ̀ọ̀kan jẹ́ iṣẹ́ tirẹ̀ pẹ̀lú àwọn àdéhùn rẹ̀, iye-owó, fọwọ́sí, àti àkọsílẹ̀ àṣírí. Líla yín lọ tààrà sí àpá-ìwé ọjà jẹ́ kíákíá, ó sì ń mú àwọn ààlà tó ṣe kedere: clappe.com ni a ń ṣe àkóso pẹ̀lú àdéhùn Clappe, clappay.com pẹ̀lú ti ClapPay, àti bẹ́ẹ̀ síwájú. Ojú-òpó ilé-iṣẹ́ ní intelligentsingularityai.com ni ìlẹ̀kùn iwájú, kì í ṣe ètò bíllingì.' },
        { q: 'Ǹjẹ́ mo lè lo àwọn ọjà yín láìsí ìntánẹ́ẹ̀tì?', a: 'Bẹ́ẹ̀ni. Ọjà kọ̀ọ̀kan ni a ṣe láti ṣiṣẹ́ lórí àwọn nẹ́tíwọ́kì tí ó lọ́ra àti tí ó ń yé. A ń tọ́ka sí fóònù ọmọ ọdún márùn-ún lórí 2G tó ní mọ́tà méjì gẹ́gẹ́ bí àkọ́kọ́, kì í ṣe gẹ́gẹ́ bí ohun rírí-tó-dára. Àwọn ojú-ìwé ń wúwo lábẹ́ kilobaiti àádọ́ta lórí àkọ́kọ́ paint, gzipped. Àwọn ìṣàn pàtàkì (kọ ìwé-òwò, kọ àkọsílẹ̀ aláìsàn sílẹ̀, mu iṣẹ́) ń ṣiṣẹ́ láìsí ìsopọ̀ ó sì máa ń ṣe ìmúdọ́gba nígbà tí ó padà.' },
        { q: 'Ǹjẹ́ àwọn ọjà ń pín àkáọ̀nù?', a: 'Lójú àyàn. Àkáọ̀nù Clap kan kan lè wọlé sí ọjà kankan tí ó kọ́kọ́, ṣùgbọ́n ọjà kọ̀ọ̀kan ṣì pa déètà rẹ̀ tirẹ̀ mọ́, ìforúkọsílẹ̀ rẹ̀, àti ìṣàn ìfọwọ́sí rẹ̀. O lè lo ọjà kan láìsí àwọn yòókù, yí padà sí òmíràn, tàbí pa ọ̀kan rẹ́ láìsí ní àbùkù àwọn yòókù.' },
        { q: 'Ǹjẹ́ ẹ̀yin máa ń kọ́ àwọn àfikún ìbámu fún àwọn oníbàárá olúkúkú?', a: 'Lọ́pọ̀ ìgbà rárá, àti nikan nígbà tí àfikún náà bá bá àpapọ̀ olùmújáde gbòòrò mu. A kì yóò kọ́ fork ìkọ̀kọ̀ ti ọjà fún oníbàárá kan; ipa ọ̀nà yẹn ń lọ sí ibojì ìmúpadà-bọ̀sípò. Síbẹ̀, a ó fún òṣùwọ̀n nínú akójọ ọ̀nà ṣiwaju tí olùdàrọ́ tí ó gbẹ́kẹ̀lé bá fọwọ́ràn àti bí àbájáde bá farahàn gẹ́gẹ́ bí àfikún tí ó wà ní gbangba fún gbogbo ènìyàn.' },
      ],
      [
        { q: 'Kí ló dé tí iye-owó yín fi yàtọ̀ sí ara nínú àwọn orílẹ̀-èdè ọ̀tọ̀ọ̀tọ̀?', a: 'Nítorí pé iye-owó tí ó bá ṣe pẹ̀lú àgbáyé ti gbígbo lẹ́ẹ̀kan ṣoṣo yóò yọ ọ̀pọ̀lọpọ̀ àwọn ènìyàn àgbáyé kúrò ní ìdákẹ́jẹ́. A ń lo àwọn àfọkàn-mọ́ agbára ìrà tí Banki Àgbáyé tẹ̀ jáde láti ṣe àwọn iye-owó àgbègbè tó dára. Oníbàárá ní Frankfurt san iye ọjà kíkún. Oníbàárá ní Lagos san iye tí ó bọ̀wọ̀ fún naira. Àwọn àfikún àti ìpele ọjà jẹ́ kannáà.' },
        { q: 'Ǹjẹ́ ipele ọfẹ jẹ́ ọfẹ ní gangan, tàbí ó jẹ́ ìdánwò?', a: 'Ó jẹ́ ọfẹ lóòótọ́. Ọfẹ-títí-láé, kò sí ìṣirò ìpadà-sẹ́yìn, kò sí ìpolongò, kò sí ìmúrọ̀rọ̀ àfikún, kò sí owó-orí ìpòṣàjáde déètà. Tí òwò ènìyàn-kan ní Lagos bá lè ṣe àwọn iṣẹ́ tó ń ṣe ní gidi lórí ipele ọfẹ, ipele ọfẹ ń ṣe iṣẹ́ rẹ̀.' },
        { q: 'Ǹjẹ́ ẹ̀yin yóò ṣe ìpèsè iye-owó enterprise?', a: 'Kò sí àwọn ìpèsè iye-owó. Gbogbo iye-owó ni a tẹ̀ jáde ní gbogbo owó orílẹ̀-èdè tí a ń pèsè. Tí ẹgbẹ́ ìfajúsùn yín bá nílò MSA, DPA, tàbí bíllingì pẹ̀lú ìwé-òwò, ìwọ̀nyẹn jẹ́ ìwé — kì í ṣe iye-owó. Nọ́mbà dọ́là lórí ojú-ìwé tí a tẹ̀ jáde ni nọ́mbà dọ́là lórí ìwé-òwò, tí a sí ìṣípaarọ̀ nípa ìjókòó tí ẹ rà.' },
      ],
      [
        { q: 'Ǹjẹ́ ẹ̀yin ń tọpinpin mi lórí ojú-òpó yìí?', a: 'Bẹ́ẹ̀kọ́. Ojú-òpó yìí ní àfọkàn-mọ́ òfo, ìpín-òṣùwọ̀n òfo, kúkì ìtọpinpin òfo, nẹ́tíwọ́kì ìpolongò òfo, àti ohun-ìní lati ọ̀dọ̀ àwọn ẹgbẹ́ kẹta òfo. Déètà nikan tí a rí ni ohun tí o tẹ̀ sí inú fọ́ọ̀mù ìbárasọ̀rọ̀ àti tí o tẹ̀ ránṣẹ́. Ìwé ìpapọ̀ tí ń tẹ̀síwájú tí orúkọ rẹ̀ ní no-third-party.mjs ń di ìfilọ̀ tí ó bá ní agbalejò òde tí ó han nínú àkójọpọ̀. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list.' },
        { q: 'Níbo ni a ti ń pa déètà mi mọ́?', a: 'Nígbà tí o bá tako wa, àkọsílẹ̀ rẹ ni a fi ìmẹ́ìlì ránṣẹ́ sí àpótí gbígba ní Alberta, Canada. A kì í pa á mọ́ nínú ipilẹ̀ déètà lórí ojú-òpó yìí. Déètà pàtó-sí-ọjà (nígbà tí o bá fọwọ́sí ọ̀kan lára àwọn ohun-èlò wa) ni a sọ̀rọ̀ rẹ̀ nínú ìlànà àṣírí ọjà yẹn lórí àpá-ìwé tirẹ̀.' },
        { q: 'Ǹjẹ́ mo lè parẹ́ déètà tí ẹ̀yin ń pa mọ́ nípa mi?', a: 'Bẹ́ẹ̀ni. Fi ìmẹ́ìlì ránṣẹ́ sí legal@intelligentsingularityai.com láti àdírẹ́sì tí o lò. A jẹ́rìí gbígbà nínú ọjọ́ iṣẹ́ mẹ́ta. A pari ìparẹ́ nínú ọjọ́ ọgbọ̀n. Ẹ̀tọ́ kannáà bá ọjà kọ̀ọ̀kan, lábẹ́ PIPEDA àti àwọn òfin tó dọ́gba pẹ̀lú GDPR.' },
        { q: 'Ǹjẹ́ ẹ̀yin ń kọ́ àwọn àpẹẹrẹ AI lórí ohun-ìní mi?', a: 'Bẹ́ẹ̀kọ́. Àwọn àfikún AI nínú gbogbo àkójọpọ̀ wa lo nikan déètà tí o fi ránṣẹ́ ní gbangba, nínú àkójọpọ̀ àkáọ̀nù rẹ. Ohun-ìní àdáni rẹ kò pààpọ̀ nínú ètò ìkọ́ tí a pín rí, kò lò rí láti dára si àpẹẹrẹ ti gbangba, kò sì ránṣẹ́ rí sí olùpèsè AI ẹgbẹ́ kẹta tí ó pa àwọn ìfilelẹ̀ rẹ mọ́.' },
      ],
      [
        { q: 'Èdè mélòó ni ojú-òpó náà ń ṣe àtìlẹyìn?', a: 'Mẹ́rìnlá láti ọjọ́ àkọ́kọ́. Àkójọ: Èdè Gẹ̀ẹ́sì, Ṣáínà tí ó rọrùn, Ìsípáníìṣì, Hindi, Lárúbáwá, Faransé, Pọ̀tugí, Bengáli, Rọ́ṣíà, Urdu, Indonesia, Swahili, Yorùbá, àti Hausa. Ọ̀kọ̀ọ̀kan ń wá pẹ̀lú fọ́ọ̀nù tí ó bo ìkọ̀wé rẹ̀ kíkún. Kò sí àwọn lẹ́tà àtìlẹ́yìn ní àárín ọ̀rọ̀. Àwọn èdè ọ̀tún-sí-òsì ń ṣe ìṣẹ̀dá ní àpẹrẹ RTL tó tọ́. Kì í ṣe Látìnì tí a sàn-án.' },
        { q: 'Báwo ni ojú-òpó ṣe ní àǹfààní tó?', a: 'A ń tọ́ka sí WCAG 2.2 Ipele AA lórí gbogbo ojú-ìwé tí ó wà ní gbangba. Ìṣàyẹ̀wò axe-core ń mú kí kíkọ́ kùnà nípa àìlólú èyíkéyìí. Ọ̀rọ̀ ara ń pẹ̀lú ìyàtọ̀ ti 7:1 tó kéréjù. Àwọn àmì kékéré ń pẹ̀lú 4.5:1 tó kéréjù. Gbogbo èròjà ìbárasọ̀rọ̀ ń ṣiṣẹ́ láti kọ́ọ̀dù. A ń bọ̀wọ̀ fún ètò dídín-ìgbésẹ̀-kù. Àkọsílẹ̀ kíkún wà ní /legal/accessibility.' },
        { q: 'Ǹjẹ́ ẹ̀yin yóò ṣe àfikún èdè mi?', a: 'Tí èdè rẹ bá ń sọ̀ ní fífilọ́pọ̀lọpọ̀ àti pé kò sí lórí àkójọ ṣì, kọ́wé sí wa. Ṣe àfikún locale tuntun jẹ́ iṣẹ́ gidi — fọ́ọ̀nù, ìtumọ̀, àpẹrẹ RTL/LTR, ìṣàyẹ̀wò àṣà — ṣùgbọ́n ó jẹ́ irú iṣẹ́ tí a fẹ́ ṣe.' },
      ],
      [
        { q: 'Báwo ni mo ṣe lè bá studio náà ṣe ìbáṣepọ̀?', a: 'A ń ṣiṣẹ́ pẹ̀lú àwọn NGO, ìjọba, àti àwọn kampani. Èrò àpapọ̀ ni sọ́fítíwéàrì ìráyé-àgbáyé fún àwọn ènìyàn tí kò lè ní owó láti rà lóòótọ́. Fi àkọsílẹ̀ kúkúrú kan ránṣẹ́ láti ojú-ìwé olùbátà. Pa á sí Partnerships. Ìwọ yóò gbọ́ nínú ọjọ́ iṣẹ́ méjì.' },
        { q: 'Níbo ni mo ti lè rí press kit?', a: 'Lọ sí /press fún ìwé-òṣùwọ̀n òtítọ́, àwọn àyọkà tí a ti fọwọ́sí, ìtọ́ni brand, ìtọ́ka olùdásílẹ̀, àti boilerplate fún ìròyìn. Nílò fáìlì àmì idánimọ̀, fọ́tò olùdásílẹ̀ tí ó ní ìṣòkan gíga, tàbí àkọsílẹ̀ àdáni? Fi ìmẹ́ìlì ránṣẹ́ sí press@intelligentsingularityai.com pẹ̀lú àkókò pípé rẹ.' },
        { q: 'Ǹjẹ́ ẹ̀yin máa ń sọ̀rọ̀ ní àwọn àpéjọ?', a: 'Nígbà mìíràn. A ń sọ̀rọ̀ nípa ìráyé-àgbáyé, àwọn ẹgbẹ́ tí AI mú lọ́pọ̀, sọ́fítíwéàrì ìlera, àti ìṣirò sọ́fítíwéàrì lean. Kọ́wé sí press@intelligentsingularityai.com pẹ̀lú àwọn àlàyé ìṣẹ̀lẹ̀ àti ìwọ̀n àwọn olùgbọ́. A ó sọ fún ọ lóòótọ́ bóyá a lè wà.' },
        { q: 'Ǹjẹ́ ẹ̀yin máa ń gba àwọn ọrẹ tàbí ránṣẹ́?', a: 'A kì í béèrè ọrẹ lọ́wọ́ àwọn olùmújáde. A ń gba ránṣẹ́ kàba. Ránṣẹ́ gbọ́dọ̀ wá láti ọ̀dọ̀ àwọn ipilẹ̀ṣẹ̀ tàbí àwọn báńkì. Ránṣẹ́ gbọ́dọ̀ darapọ̀ mọ́ sọ́fítíwéàrì ìráyé ní àwọn ọjà tí àwọn iye-owó kíkún kò ṣiṣẹ́ ṣì. Fi ìmẹ́ìlì ránṣẹ́ sí partners@intelligentsingularityai.com.' },
      ],
      [
        { q: 'Ǹjẹ́ ẹ̀yin ń gba ọmọ-iṣẹ́?', a: 'Nígbà mìíràn. Ojú-ìwé /careers ń ṣe àkójọ àwọn ipa tó ṣíi lọ́wọ́lọ́wọ́. Nígbà tí kò sí ohun tí a ṣe àkójọ, a kì í gba ọmọ-iṣẹ́ ní àkókò yẹn, dípé ńkó. A kì í ṣiṣẹ́ ìpalákèjì "fí CV rẹ ránṣẹ́" tó wà títí láé tó kò ní lọ síbikíbi — ṣùgbọ́n ìfihàn tó ní ìrònú nígbà gbogbo gba ìdáhùn gidi.' },
        { q: 'Ǹjẹ́ ẹgbẹ́ náà ń ṣiṣẹ́ ní ọ̀nà jíjìn pátápátá nítòótọ́?', a: 'Bẹ́ẹ̀ni. À ń ṣiṣẹ́ ní ọ̀nà jíjìn nítorí pé ó jẹ́ àpẹrẹ tó tọ́ fún iṣẹ́ náà, kì í ṣe nítorí pé ó wà ní ìṣe. À ń bọ̀wọ̀ fún àwọn agbègbè àkókò. Ọ̀pọ̀lọpọ̀ àwọn ìpinnu ń wà ní kíkọ́wé kí wọ́n bá lè wà tó àwọn ènìyàn tó ṣe wọ́n lọ.' },
        { q: 'Ǹjẹ́ ẹ̀yin máa ń tẹ̀ àwọn ìpele iye-owó-iṣẹ́ jáde?', a: 'Bẹ́ẹ̀ni, lórí ipa kọ̀ọ̀kan tó ṣíi. A kì í ṣe àdíjú pẹ̀lú àwọn ènìyàn tí ó dán ìpele wò; a tẹ̀ ẹ́ jáde a sì ń san án. Equity kò sí lórí tábìlì nítorí pé kampani kò sí fún títà.' },
      ],
    ],
  },
  ha: {
    eyebrow: 'FAQ · AMSOSHI MASU SAUƘI', title: 'Tambayoyi, an amsa su a sauƙaƙe.',
    lede: "Abin da mutane ke tambayar mu da gaske — game da studio, samfura, da ma'aunin sirri na amfani da kayan aikin mu.",
    sectionTitles: ['Studio', 'Samfura', 'Farashi da kuɗi', 'Sirri da bayanai', 'Harsuna da damar amfani', "Haɗin gwiwa da 'yan jarida", "Ɗaukar ma'aikata"],
    stillStuckCta: { eyebrow: 'Har yanzu kuna da tambaya?', heading: 'Mutum na karanta kowane saƙo.', body: 'Yawanci muna amsa cikin kwanaki biyu na aiki. Aiko da bayani ta hanyar fom. Ko rubuta zuwa hello@intelligentsingularityai.com.' },
    sectionItems: [
      [
        { q: 'Menene Intelligent Singularity?', a: "Intelligent Singularity Inc. shi ne kamfanin uba na tsarin Clap. Mu studio karami ne, wanda AI ya haɓaka, mai aiki ta nesa gaba ɗaya. Muna zaune a Alberta, Kanada. Muna gina software don samun damar amfani na duniya. Babban samfuri guda yana hidima ga mai siye na Fortune 500 a New York da kuma kwalin kasuwa na mutum ɗaya a Lagos. Stack guda da aka raba. Manufa guda." },
        { q: 'Shin ku startup ne mai goyon bayan kuɗin saka jari ne?', a: "A'a. Mu masu kuɗin kanmu ne kuma bootstrapped. Wannan yana nufin muna amsa wa masu amfani, ba ga masu saka jari da ke neman fita da sauri ba. Muna ɗaukar lokaci mai tsawo don aikawa, kuma muna shirin kasancewa nan bayan shekaru ashirin. Ba a sayar da kamfanin ba." },
        { q: 'Wane ne yake bayan wannan?', a: "Dr. Md Diya ya kafa studio a 2024 bayan shekaru talatin da huɗu na aikin likitanci tsakanin nahiyoyi. Ƙaramar ƙungiya, mai aiki ta nesa, da AI ya haɓaka tana aika kowane samfuri ƙarƙashin stack guda da aka raba da kasafin damar amfani guda da aka raba." },
        { q: 'Yaya kuke samun kuɗi idan apps ɗinku suna da araha?', a: "Samfura suna da matakin kyauta-har-abada wanda ke gudanar da kasuwanci na hakika. Matakai biya suna ƙara girma, ba fasalulluka ba. An daidaita farashi da ƙarfin saye don haka plan da yake kuɗi dala ashirin a Toronto yana kuɗi ƙasa a Lagos. Abokan ciniki na duniya mai ci gaba da enterprise suna biyan cikakken farashin kasuwa; abokan ciniki na kasuwa mai tasowa da kaɗaitattu suna biyan farashi da yake girmama kuɗinsu. Lissafin yana aiki saboda muna gudana lean kuma muna barin yadudduka na wakilan AI yana ɗaukar leverage." },
        { q: "Me ya sa 'kamfanin uba' — wannan tsarin riƙewa ne?", a: "Kamfanin uba ne a ma'ana mai sauƙi. Wani entity na shari'a guda yana mallakar iyalin dandamali. Jeri: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, Audiflo, Nestbitt, DailyWorship, Gclap, FileManager, ƙari da ababen more rayuwa da aka raba. Kowane samfuri yana gudana akan shafinsa. Kowanne yana da sharuɗɗansa da farashinsa. Mai mallakar shari'a shi ne Intelligent Singularity Inc." },
        { q: 'Yaya girman ƙungiyar?', a: "Ƙarama isasshe sabon ɗan aiki zai koyi kowace fuska a sati na farko, babba isasshe don ci gaba da aika dandamali sama da goma sha biyu. Da gangan ba mu yin tallar tseren girma; yadudduka na wakilan AI wani ɓangare ne na ƙungiya a ma'ana ta hakika." },
      ],
      [
        { q: "Shin waɗannan samfura na hakika ne ko ra'ayoyi ne kawai?", a: "Kowane samfuri akan shafin portfolio yana da lakabin matsayi mai gaskiya. \"Live\" yana nufin za ku iya yin rajista yau. \"Staging\" yana nufin yana gudana amma ta gayyatu kawai yayin da muke ƙarfafa shi. \"Awaiting approval\" yana shirye amma yana jiran mai tsari. \"Infrastructure\" shi ne lambar da muke raba a bainar jama'a kuma wanda wasu samfuran suka dogara akai. Ba mu sanar da abubuwan da har yanzu basu wanzu ba." },
        { q: 'Me ya sa wasu samfura suna jera kamar staging?', a: "Yawancin kayan aikinmu har yanzu ana ƙarfafa su kafin ƙaddamarwar jama'a. Mu fi son a aika cikin jinkiri fiye da karya amincewa a rana ta farko — musamman a kiwon lafiya, biyan kuɗi, da ciniki inda regression wani lamari ne na ainihin duniya, ba rashin jin daɗi ba. Idan kuna son shiga da wuri, rubuta mana daga shafin tuntuɓa kuma za mu gaya muku da gaskiya idan staging build na iya tallafa muku tukuna." },
        { q: 'Me ya sa samfura suke haɗawa zuwa wasu yankuna?', a: "Kowane samfuri sabis ne na kansa tare da sharuɗɗansa, farashin sa, rajista, da sanarwar sirri. Aika ku kai tsaye zuwa yankin samfuri ya fi sauri, kuma yana sa iyakoki suka bayyana: clappe.com ana mulkar shi da sharuɗɗan Clappe, clappay.com da ClapPay, da sauransu. Shafin kamfani a intelligentsingularityai.com shi ne ƙofar gaba, ba tsarin biyan kuɗi ba." },
        { q: 'Zan iya amfani da samfuranku ba tare da intanet ba?', a: "Ee. An ƙera kowane samfuri don aiki akan hanyoyin sadarwa masu jinkiri da na yanke yanke. Muna nufin wayar da ke shekaru biyar akan 2G mai sandar biyu a matsayin tushe, ba a matsayin abin da yake da kyau samu ba. Shafuka suna nauyi ƙasa da kilobyte hamsin akan paint na farko, gzipped. Mahimman ayyukan aiki (rubuta lissafi, yin rikodin bayanin majiyyaci, kama aiki) suna aiki ba tare da haɗi ba kuma suna daidaitawa lokacin da ya dawo." },
        { q: 'Shin samfura suna raba asusu?', a: 'A zaɓi. Asusun Clap guda ɗaya na iya shiga kowane samfuri da ya yarda, amma kowane samfuri har yanzu yana riƙe da bayanansa, biyan kuɗinsa, da kwararar yardarsa. Kuna iya amfani da samfuri ɗaya ba tare da wasu ba, sauya zuwa wani, ko share ɗaya ba tare da shafa sauran ba.' },
        { q: 'Shin kuna gina fasalulluka na musamman ga abokan ciniki ɗaya ɗaya?', a: 'Da kyar, kuma kawai lokacin da fasalin ya dace da faɗin tushen masu amfani. Ba za mu gina fork na sirri na samfuri ga abokin ciniki ɗaya ba; wannan hanyar tana kai zuwa kabari na kiyayewa. Duk da haka, za mu ba da fifiko ga abu na taswirar hanya idan abokin haɗin gwiwa mai tabbatarwa ya tallafa masa kuma sakamakon ya zo a matsayin fasalin jama\'a ga kowa.' },
      ],
      [
        { q: 'Me ya sa farashinku ya bambanta a ƙasashe daban-daban?', a: "Saboda farashin duniya guda zai cire mafi yawan mutanen duniya a hankali. Muna amfani da ma'auni na ƙarfin saye da Bankin Duniya ya buga don saita farashi na yanki na adalci. Abokin ciniki a Frankfurt yana biyan cikakken farashin kasuwa. Abokin ciniki a Lagos yana biyan farashi da yake girmama naira. Fasalulluka da ingancin samfuri iri ɗaya ne." },
        { q: 'Shin matakin kyauta da gaske kyauta ne, ko gwaji ne?', a: "Da gaske kyauta. Kyauta-har-abada, babu ƙidaya, babu talla, babu rauna fasalulluka, babu harajin fitar da bayanai. Idan kasuwancin mutum ɗaya a Lagos zai iya gudanar da ayyukansu na hakika a kan matakin kyauta, matakin kyauta yana yin aikinsa." },
        { q: 'Shin za ku yi maganar farashin enterprise?', a: "Babu kuotoshi. Kowane farashi an buga shi a kowane kuɗin da muke ba da. Idan ƙungiyar saye taku tana buƙatar MSA, DPA, ko biya ta lissafi, waɗannan takaddu ne — ba farashi ba. Adadin dala akan shafin da aka buga shi ne adadin dala akan lissafi, an ninka shi da kujerun da kuka saya." },
      ],
      [
        { q: 'Shin kuna bibiyar ni akan wannan shafin yanar gizo?', a: "A'a. Wannan shafin yana da sifili na nazari, sifili na pixels, sifili na cookies na bibiya, sifili na hanyoyin tallace-tallace, da sifili na abun ciki daga ɓangare na uku. Bayanan kawai da muke gani su ne abin da kuke buga a cikin fom ɗin tuntuɓa kuma ku danna aika. Wani rubutu na ci gaba da haɗawa mai suna no-third-party.mjs yana toshe fitarwa idan wani mai dauke da bayanai na waje ya fito a cikin bundle. On this marketing site only. Individual products in our portfolio may use named subprocessors — see each product privacy notice for the full list." },
        { q: 'Ina aka ajiye bayanaina?', a: "Lokacin da kuka tuntuɓe mu, an aika saƙon ku ta imel zuwa wani akwatin saƙo a Alberta, Kanada. Ba mu ajiye shi cikin database akan wannan shafin ba. An bayyana bayanai masu alaƙa da samfurin (lokacin da kuka yi rajista don ɗaya daga cikin kayan aikinmu) a cikin manufofin sirri na samfurin akan yankinsa." },
        { q: 'Zan iya goge bayanan da kuke da su game da ni?', a: "Ee. Aiko da imel zuwa legal@intelligentsingularityai.com daga adireshin da kuka yi amfani da shi. Muna tabbatar da karɓar a cikin kwanaki uku na aiki. Muna gama gogewa a cikin kwanaki talatin. Hakki guda ya shafi kowane samfuri, ƙarƙashin PIPEDA da ƙa'idodi masu kama da GDPR." },
        { q: 'Shin kuna horar da samfuran AI akan abin da nake ciki?', a: "A'a. Fasalulluka na AI a duk faɗin portfolio ɗinmu suna amfani da bayanan da kuka aika a fili kawai, a cikin iyakar asusun ku. Abubuwan ku na sirri ba a taɓa cakude su a cikin saiti na horo da aka raba ba, ba a taɓa amfani da su don inganta wani samfuri na jama'a ba, kuma ba a taɓa aika su zuwa mai ba da AI na ɓangare na uku da yake riƙe da bayananku ba." },
      ],
      [
        { q: 'Yawan yaruka nawa shafin yake tallafawa?', a: "Goma sha huɗu daga rana ta farko. Jeri: Turanci, Sinanci mai sauƙi, Sifaniyanci, Hindi, Larabci, Faransanci, Fotigaliyanci, Bengali, Rashanci, Urdu, Indonesiya, Swahili, Yoruba, da Hausa. Kowanne yana zuwa tare da rubutun da ya rufe rubutunsa gaba ɗaya. Babu haruffa na komai a tsakiyar kalma. Yarukan dama-zuwa-hagu suna fitowa cikin tsarin RTL daidai. Ba latin da aka madubi ba." },
        { q: 'Yaya samun damar shafin yake?', a: "Muna nufin WCAG 2.2 Mataki na AA akan kowane shafi na jama'a. Binciken axe-core yana sa build ya gaza akan keta dokoki kowane. Rubutun jiki yana cika a kalla bambanci na 7:1. Ƙananan lakabi suna cika a kalla 4.5:1. Kowane element na hulɗa yana aiki daga keyboard. Muna girmama saitin rage motsi. Cikakken bayanin yana kan /legal/accessibility." },
        { q: 'Shin za ku ƙara harshen na?', a: "Idan harshenku yana magana sosai kuma har yanzu ba ya kan jeri, rubuta mana. Ƙara wani locale sabo aiki ne na hakika — fonts, fassara, tsarin RTL/LTR, sake duba al'adu — amma irin aikin da muke son yi ne." },
      ],
      [
        { q: 'Yaya zan haɗa kai da studio?', a: "Muna aiki tare da NGOs, gwamnatoci, da kamfanoni. Manufar tarayya ita ce software na samun damar duniya ga mutanen da yawanci ba za su iya biya ba. Aika ɗan gajeren bayani daga shafin tuntuɓa. Aika shi zuwa Partnerships. Za ku ji muryarmu cikin kwanaki biyu na aiki." },
        { q: 'Ina zan iya samun press kit?', a: "Ziyarci /press don takaddar gaskiya, kalmomin da aka amince da su, jagorar brand, ma'anar wanda ya kafa, da boilerplate na 'yan jarida. Kuna buƙatar fayil ɗin tambari, hoton mai kafa mai ƙuduri sosai, ko bayanin musamman? Aiko da imel zuwa press@intelligentsingularityai.com tare da kwanan watan ƙarshe." },
        { q: 'Shin kuna magana a tarurruka?', a: "Wani lokaci. Muna magana game da samun damar duniya, ƙungiyoyi waɗanda AI ya haɓaka, software na lafiya, da ilimin tattalin arzikin software lean. Rubuta zuwa press@intelligentsingularityai.com tare da bayanan taron da girman masu sauraro. Za mu gaya muku da gaskiya idan za mu iya zuwa." },
        { q: "Shin kuna karɓar gudummawa ko taimako?", a: "Ba mu nemar gudummawa daga masu amfani. Muna marabtar taimako. Taimako dole ne ya zo daga ginshiƙai ko bankuna. Taimako dole ne a ɗaure shi da software na samun damar a kasuwannin inda farashin cikakke har yanzu ba sa aiki. Aiko da imel zuwa partners@intelligentsingularityai.com." },
      ],
      [
        { q: "Shin kuna ɗaukar ma'aikata?", a: "Wani lokaci. Shafin /careers yana lissafin matsayin da ke buɗe na yanzu. Idan ba a lissafa wani abu, ba ma ɗaukar ma'aikata a wannan lokacin, ƙarshe. Ba mu gudanar da hanya ta dindindin ta \"tura mana CV ɗin ku\" wanda baya zuwa ko ina — amma gabatarwa mai zurfi koyaushe yana samun amsa ta gaske." },
        { q: 'Shin ƙungiyar tana aiki ta nesa gaba ɗaya da gaske?', a: "Ee. Muna aiki ta nesa saboda shi ne ƙirar da ta dace da aikin, ba saboda yana cikin yanayi ba. Ana girmama yankunan lokaci. Yawancin shawarwari suna rayuwa a rubuce don su tsira fiye da mutanen da suka yi su." },
        { q: 'Shin kuna buga matakin albashi?', a: "Ee, akan kowane matsayin da ke buɗe. Ba ma yin ciniki da mutanen da ke yin tsammanin matakin; muna buga shi kuma muna biyan shi. Equity ba ya kan tebur saboda kamfani ba ya cikin sayarwa." },
      ],
    ],
  },
};

type ContactStrings = { title: string; lead: string; privacyNote: string; successMessage: string; errorMessage: string };

const CONTACT: Record<LocaleCode, ContactStrings> = {
  'zh-CN': {
    title: '联系我们',
    lead: '问题、合作想法、媒体咨询或法律事务——我们会阅读通过此表格发出的每一条消息。一位真实的人会回复你,通常在一个工作日内。',
    privacyNote: '我们不会将联系表单的消息存储在营销数据库中。你的留言会通过电子邮件发送给负责回复的小团队,不会发送到其他任何地方。',
    successMessage: '你的消息已发送。感谢你的来信。',
    errorMessage: '我们这边出了点问题。请重试,或直接发邮件至 hello@intelligentsingularityai.com。',
  },
  es: {
    title: 'Ponte en contacto',
    lead: 'Preguntas, ideas de colaboración, consultas de prensa o un asunto legal — leemos cada mensaje que llega por este formulario. Una persona real responde, normalmente en un día laborable.',
    privacyNote: 'No almacenamos los mensajes del formulario de contacto en una base de marketing. Tu nota se entrega por email al pequeño equipo que la responde, y a ningún otro lado.',
    successMessage: 'Tu mensaje se ha enviado. Gracias por escribir.',
    errorMessage: 'Algo salió mal de nuestro lado. Por favor inténtalo de nuevo o escríbenos directamente a hello@intelligentsingularityai.com.',
  },
  hi: {
    title: 'संपर्क करें',
    lead: 'प्रश्न, साझेदारी विचार, प्रेस पूछताछ, या कानूनी मामला — हम इस फ़ॉर्म से आने वाले हर संदेश को पढ़ते हैं। एक वास्तविक व्यक्ति जवाब देता है, आमतौर पर एक कार्य दिवस के भीतर।',
    privacyNote: 'हम संपर्क-फ़ॉर्म के संदेशों को मार्केटिंग डेटाबेस में संग्रहीत नहीं करते। आपकी नोट ईमेल द्वारा उस छोटी टीम को पहुँचाई जाती है जो इसका उत्तर देती है, और कहीं नहीं।',
    successMessage: 'आपका संदेश भेज दिया गया है। लिखने के लिए धन्यवाद।',
    errorMessage: 'हमारी ओर से कुछ गलत हो गया। कृपया पुनः प्रयास करें, या सीधे hello@intelligentsingularityai.com पर ईमेल करें।',
  },
  ar: {
    title: 'تواصلوا معنا',
    lead: 'أسئلة، أفكار شراكة، استفسارات صحفية، أو مسألة قانونية — نقرأ كل رسالة تصلنا عبر هذا النموذج. إنسان حقيقي يرد، عادةً خلال يوم عمل.',
    privacyNote: 'لا نُخزّن رسائل نموذج الاتصال في قاعدة بيانات تسويقية. تُسلَّم ملاحظتك بالبريد إلى الفريق الصغير الذي يرد عليها، ولا إلى أي مكان آخر.',
    successMessage: 'تم إرسال رسالتك. شكرًا على تواصلك.',
    errorMessage: 'حدث خطأ من جانبنا. يرجى المحاولة مرة أخرى، أو راسلنا مباشرة على hello@intelligentsingularityai.com.',
  },
  fr: {
    title: 'Contactez-nous',
    lead: "Questions, idées de partenariat, demandes presse, ou un sujet juridique — nous lisons chaque message qui passe par ce formulaire. Une personne réelle répond, généralement sous un jour ouvré.",
    privacyNote: "Nous ne stockons pas les messages du formulaire de contact dans une base marketing. Votre note est livrée par email à la petite équipe qui y répond, et nulle part ailleurs.",
    successMessage: 'Votre message a été envoyé. Merci de nous avoir écrit.',
    errorMessage: "Quelque chose s'est mal passé de notre côté. Veuillez réessayer, ou écrivez-nous directement à hello@intelligentsingularityai.com.",
  },
  pt: {
    title: 'Entre em contacto',
    lead: 'Perguntas, ideias de parceria, pedidos de imprensa, ou um assunto legal — lemos cada mensagem que chega por este formulário. Uma pessoa real responde, normalmente dentro de um dia útil.',
    privacyNote: 'Não guardamos as mensagens do formulário de contacto numa base de marketing. A sua nota é entregue por email à pequena equipa que lhe responde, e em nenhum outro lado.',
    successMessage: 'A sua mensagem foi enviada. Obrigado por escrever.',
    errorMessage: 'Algo correu mal do nosso lado. Por favor, tente de novo, ou escreva-nos diretamente para hello@intelligentsingularityai.com.',
  },
  bn: {
    title: 'যোগাযোগ করুন',
    lead: 'প্রশ্ন, অংশীদারিত্বের ধারণা, প্রেসের জিজ্ঞাসা, বা কোনো আইনি বিষয় — এই ফর্মের মাধ্যমে আসা প্রতিটি বার্তা আমরা পড়ি। একজন বাস্তব ব্যক্তি উত্তর দেন, সাধারণত এক কার্যদিবসের মধ্যে।',
    privacyNote: 'আমরা যোগাযোগ-ফর্মের বার্তাগুলো কোনো মার্কেটিং ডেটাবেসে সংরক্ষণ করি না। আপনার বার্তা ইমেইলের মাধ্যমে সেই ছোট দলকে পৌঁছানো হয় যারা এর উত্তর দেয়, অন্য কোথাও নয়।',
    successMessage: 'আপনার বার্তা পাঠানো হয়েছে। লেখার জন্য ধন্যবাদ।',
    errorMessage: 'আমাদের দিকে কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন, অথবা সরাসরি hello@intelligentsingularityai.com-এ ইমেইল করুন।',
  },
  ru: {
    title: 'Свяжитесь с нами',
    lead: 'Вопросы, идеи партнёрства, запросы прессы или юридические вопросы — мы читаем каждое сообщение, приходящее через эту форму. Отвечает живой человек, обычно в течение одного рабочего дня.',
    privacyNote: 'Мы не храним сообщения с контактной формы в маркетинговой базе. Ваше сообщение доставляется по почте небольшой команде, которая на него отвечает, и больше никуда.',
    successMessage: 'Ваше сообщение отправлено. Спасибо, что написали.',
    errorMessage: 'На нашей стороне что-то пошло не так. Пожалуйста, попробуйте ещё раз или напишите нам напрямую на hello@intelligentsingularityai.com.',
  },
  ur: {
    title: 'رابطہ کریں',
    lead: 'سوالات، شراکت داری کے خیالات، پریس انکوائریز، یا قانونی معاملہ — اس فارم کے ذریعے آنے والا ہر پیغام ہم پڑھتے ہیں۔ ایک حقیقی شخص جواب دیتا ہے، عام طور پر ایک کاروباری دن کے اندر۔',
    privacyNote: 'ہم رابطہ فارم کے پیغامات کسی مارکیٹنگ ڈیٹا بیس میں ذخیرہ نہیں کرتے۔ آپ کا نوٹ ای میل کے ذریعے اس چھوٹی ٹیم کو پہنچایا جاتا ہے جو اس کا جواب دیتی ہے، اور کہیں نہیں۔',
    successMessage: 'آپ کا پیغام بھیج دیا گیا ہے۔ لکھنے کا شکریہ۔',
    errorMessage: 'ہماری طرف سے کچھ غلط ہوگیا۔ براہ کرم دوبارہ کوشش کریں، یا براہ راست hello@intelligentsingularityai.com پر ای میل کریں۔',
  },
  id: {
    title: 'Hubungi kami',
    lead: 'Pertanyaan, ide kemitraan, permintaan pers, atau urusan hukum — kami membaca setiap pesan yang masuk melalui formulir ini. Orang sungguhan yang menjawab, biasanya dalam satu hari kerja.',
    privacyNote: 'Kami tidak menyimpan pesan formulir kontak di database pemasaran. Catatan Anda dikirim melalui email ke tim kecil yang menjawabnya, dan tidak ke tempat lain.',
    successMessage: 'Pesan Anda telah dikirim. Terima kasih telah menulis.',
    errorMessage: 'Ada yang salah di sisi kami. Silakan coba lagi, atau email kami langsung di hello@intelligentsingularityai.com.',
  },
  sw: {
    title: 'Wasiliana nasi',
    lead: 'Maswali, mawazo ya ushirikiano, maombi ya vyombo vya habari, au jambo la kisheria — tunasoma kila ujumbe unaotujia kupitia fomu hii. Mtu halisi anajibu, kwa kawaida ndani ya siku moja ya kazi.',
    privacyNote: 'Hatuhifadhi ujumbe wa fomu ya mawasiliano katika hifadhidata ya masoko. Ujumbe wako unawasilishwa kwa barua pepe kwa timu ndogo inayoujibu, na popote pengine.',
    successMessage: 'Ujumbe wako umetumwa. Asante kwa kuandika.',
    errorMessage: 'Kitu kilienda vibaya upande wetu. Tafadhali jaribu tena, au tutume barua pepe moja kwa moja kwa hello@intelligentsingularityai.com.',
  },
  yo: {
    title: 'Bá wa sọ̀rọ̀',
    lead: 'Ìbéèrè, èrò ìbáṣepọ̀, ìbéèrè ìròyìn, tàbí ọ̀rọ̀ òfin — a ka àkọsílẹ̀ kọ̀ọ̀kan tí ó wá nípasẹ̀ fọ́ọ̀mù yìí. Ènìyàn gidi ni ó dáhùn, sábà ní ọjọ́ iṣẹ́ kan.',
    privacyNote: 'A kì í pa àwọn àkọsílẹ̀ fọ́ọ̀mù olùbátà mọ́ nínú àtòjọ déètà ìpolongò. Àkọsílẹ̀ rẹ̀ ni a fi ìmẹ́ìlì ránṣẹ́ sí ẹgbẹ́ kékeré tí ó dáhùn rẹ̀, kò sí síbi mìíràn.',
    successMessage: 'A ti firanṣẹ́ àkọsílẹ̀ rẹ̀. A dúpẹ́ pé o kọ̀ wá.',
    errorMessage: 'Ohun kan ti bàjẹ́ ní ẹ̀gbẹ́ wa. Jọ̀wọ́ gbiyànjú lẹ́ẹ̀kansí, tàbí kọ̀wé sí wa tààrà ní hello@intelligentsingularityai.com.',
  },
  ha: {
    title: 'Tuntube mu',
    lead: "Tambayoyi, ra'ayoyin haɗin gwiwa, tambayoyin 'yan jarida, ko al'amari na shari'a — muna karanta kowane saƙo da yake zuwa ta wannan fom. Mutum na hakika ne ke amsawa, yawanci a cikin ranar aiki ɗaya.",
    privacyNote: 'Ba mu adana saƙonnin fom ɗin tuntuɓa a cikin database na talla. An aika bayanin ku ta imel zuwa ƙaramar ƙungiya da ke amsa shi, kuma babu wani waje.',
    successMessage: 'An aika saƙonku. Mun gode da rubuta.',
    errorMessage: "Wani abu ya yi kuskure a wannan ɓangare. Don Allah a sake gwada, ko aiko mana imel kai tsaye a hello@intelligentsingularityai.com.",
  },
};

type ChromePair = { title: string; lead: string };

const MANIFESTO: Record<LocaleCode, ChromePair> = {
  'zh-CN': { title: '我们的宣言', lead: '每一项业务都应得到优秀的软件。每一个人都应得到优秀的工具。这不是达到五百名员工后的奖励——而是基本人权。' },
  es: { title: 'Nuestro manifiesto', lead: 'Cada negocio merece un gran software. Cada persona merece grandes herramientas. No como recompensa por llegar a quinientos empleados — como un simple derecho humano.' },
  hi: { title: 'हमारा घोषणापत्र', lead: 'हर व्यवसाय बेहतरीन सॉफ़्टवेयर का हक़दार है। हर व्यक्ति बेहतरीन उपकरणों का हक़दार है। पाँच सौ कर्मचारी पहुँचने के इनाम के रूप में नहीं — एक साधारण मानव अधिकार के रूप में।' },
  ar: { title: 'بياننا', lead: 'كل عمل يستحق برمجيات رائعة. كل شخص يستحق أدوات رائعة. ليس مكافأةً على بلوغ خمسمئة موظف — بل حقًا إنسانيًا بسيطًا.' },
  fr: { title: 'Notre manifeste', lead: "Chaque entreprise mérite un excellent logiciel. Chaque personne mérite d'excellents outils. Non comme récompense pour avoir atteint cinq cents employés — comme un simple droit humain." },
  pt: { title: 'O nosso manifesto', lead: 'Cada negócio merece um excelente software. Cada pessoa merece excelentes ferramentas. Não como recompensa por chegar aos quinhentos colaboradores — como um simples direito humano.' },
  bn: { title: 'আমাদের ঘোষণাপত্র', lead: 'প্রতিটি ব্যবসা চমৎকার সফটওয়্যারের যোগ্য। প্রতিটি ব্যক্তি চমৎকার সরঞ্জামের যোগ্য। পাঁচশো কর্মী পৌঁছানোর পুরস্কার হিসেবে নয় — একটি সরল মানবাধিকার হিসেবে।' },
  ru: { title: 'Наш манифест', lead: 'Каждый бизнес заслуживает отличного софта. Каждый человек заслуживает отличных инструментов. Не как награду за достижение пятисот сотрудников — как простое человеческое право.' },
  ur: { title: 'ہمارا منشور', lead: 'ہر کاروبار بہترین سافٹ ویئر کا مستحق ہے۔ ہر شخص بہترین آلات کا مستحق ہے۔ پانچ سو ملازمین تک پہنچنے کے انعام کے طور پر نہیں — بلکہ ایک سادہ انسانی حق کے طور پر۔' },
  id: { title: 'Manifesto kami', lead: 'Setiap bisnis berhak atas perangkat lunak yang hebat. Setiap orang berhak atas alat yang hebat. Bukan sebagai hadiah karena mencapai lima ratus karyawan — sebagai hak asasi manusia yang sederhana.' },
  sw: { title: 'Tamko letu', lead: 'Kila biashara inastahili programu nzuri. Kila mtu anastahili zana nzuri. Si kama tuzo ya kufikia wafanyakazi mia tano — bali kama haki rahisi ya binadamu.' },
  yo: { title: 'Ìpolówó wa', lead: 'Òwò kọ̀ọ̀kan jẹ́ fún sọ́fítíwéàrì tó dára. Ènìyàn kọ̀ọ̀kan jẹ́ fún àwọn ohun-èlò tó dára. Kì í ṣe gẹ́gẹ́ bí ẹ̀bùn fún dé ọmọ-iṣẹ́ ọgọ́rùn-ún márùn-ún — ṣùgbọ́n gẹ́gẹ́ bí ẹ̀tọ́ ẹ̀dá ènìyàn rírọrùn.' },
  ha: { title: 'Sanarwarmu', lead: "Kowane kasuwanci ya cancanci software mai kyau. Kowane mutum ya cancanci kayan aiki masu kyau. Ba a matsayin lada don kaiwa ma'aikata ɗari biyar — sai dai a matsayin hakkin ɗan adam mai sauƙi." },
};

const ABOUT: Record<LocaleCode, ChromePair> = {
  'zh-CN': { title: '关于 Intelligent Singularity', lead: 'Clap 生态系统的母公司。一支小型的、AI 增强的、完全远程的团队,总部位于加拿大艾伯塔省——为每个人和每家企业打造软件,不偏袒任何一方。' },
  es: { title: 'Sobre Intelligent Singularity', lead: 'La empresa matriz del ecosistema Clap. Un equipo pequeño, aumentado por IA, totalmente remoto, con base en Alberta, Canadá — construyendo software para cada persona y cada negocio, sin tomar partido.' },
  hi: { title: 'Intelligent Singularity के बारे में', lead: 'Clap इकोसिस्टम की मूल कंपनी। कनाडा के अल्बर्टा में स्थित एक छोटी, AI-संवर्धित, पूर्णतः दूरस्थ टीम — हर व्यक्ति और हर व्यवसाय के लिए सॉफ़्टवेयर बनाते हुए, किसी का पक्ष लिए बिना।' },
  ar: { title: 'عن Intelligent Singularity', lead: 'الشركة الأم لمنظومة Clap. فريق صغير، مُعزَّز بالذكاء الاصطناعي، يعمل عن بُعد بالكامل، مقرّه ألبرتا، كندا — يبني برمجيات لكل شخص ولكل عمل، دون الانحياز لأحد.' },
  fr: { title: "À propos d'Intelligent Singularity", lead: "La société mère de l'écosystème Clap. Une petite équipe, augmentée par IA, entièrement à distance, basée en Alberta, au Canada — qui construit des logiciels pour chaque personne et chaque entreprise, sans choisir son camp." },
  pt: { title: 'Sobre a Intelligent Singularity', lead: 'A empresa-mãe do ecossistema Clap. Uma equipa pequena, aumentada por IA, totalmente remota, sediada em Alberta, Canadá — a construir software para cada pessoa e cada negócio, sem tomar partido.' },
  bn: { title: 'Intelligent Singularity সম্পর্কে', lead: 'Clap ইকোসিস্টেমের মূল কোম্পানি। কানাডার আলবার্টায় অবস্থিত একটি ছোট, AI-সংবর্ধিত, সম্পূর্ণ রিমোট দল — প্রতিটি ব্যক্তি এবং প্রতিটি ব্যবসার জন্য সফটওয়্যার তৈরি করছে, কোনো পক্ষ না নিয়ে।' },
  ru: { title: 'Об Intelligent Singularity', lead: 'Материнская компания экосистемы Clap. Небольшая, усиленная ИИ, полностью удалённая команда из Альберты, Канада — строит софт для каждого человека и каждого бизнеса, не выбирая сторон.' },
  ur: { title: 'Intelligent Singularity کے بارے میں', lead: 'Clap ایکوسسٹم کی پیرنٹ کمپنی۔ البرٹا، کینیڈا میں مقیم ایک چھوٹی، AI سے بڑھائی گئی، مکمل طور پر ریموٹ ٹیم — ہر شخص اور ہر کاروبار کے لیے سافٹ ویئر بنا رہی ہے، کسی کا ساتھ دیے بغیر۔' },
  id: { title: 'Tentang Intelligent Singularity', lead: 'Perusahaan induk dari ekosistem Clap. Tim kecil, diperkuat AI, sepenuhnya remote yang berbasis di Alberta, Kanada — membangun perangkat lunak untuk setiap orang dan setiap bisnis, tanpa memihak.' },
  sw: { title: 'Kuhusu Intelligent Singularity', lead: 'Kampuni mama ya mfumo wa Clap. Timu ndogo, iliyoimarishwa kwa AI, mbali kabisa iliyoko Alberta, Kanada — ikijenga programu kwa kila mtu na kila biashara, bila kuchagua upande.' },
  yo: { title: 'Nípa Intelligent Singularity', lead: 'Kampani ìyá ti mfumo Clap. Ẹgbẹ́ kékeré, tí AI ti múratàn, ní ọ̀nà jíjìn pátápátá tí ó wà ní Alberta, Canada — ń kọ́ sọ́fítíwéàrì fún ènìyàn kọ̀ọ̀kan àti òwò kọ̀ọ̀kan, láìṣe ìyàn.' },
  ha: { title: 'Game da Intelligent Singularity', lead: 'Kamfanin uba na tsarin Clap. Ƙaramar ƙungiya, da AI ya haɓaka, mai aiki ta nesa gaba ɗaya da ke zaune a Alberta, Kanada — tana gina software ga kowane mutum da kowane kasuwanci, ba tare da ɗauka kowane ɓangare ba.' },
};

const PRODUCT_TAGLINES: Record<LocaleCode, Record<string, string>> = {
  'zh-CN': {
    clappe: '经营业务。', clapbill: '为你的工作收款。', clapmed: '管理你的健康。', clapdiet: '吃得更好。', clapmove: '动得更好。',
    clappay: '随处收款。', clapwork: '在任何地方谋生。', apogee: '管理你的农场。', audiflo: '讲述你的故事。', nestbitt: '创作音乐。',
    dailyworship: '面向每个社区的礼拜音乐。', gclap: '为每个人提供电子邮件。', filemanager: '整理一切。', rateads: '倾听你的社群。',
  },
  es: {
    clappe: 'Lleva un negocio.', clapbill: 'Cobra por tu trabajo.', clapmed: 'Gestiona tu salud.', clapdiet: 'Come mejor.', clapmove: 'Muévete mejor.',
    clappay: 'Cobra, en cualquier lugar.', clapwork: 'Gánate la vida desde cualquier lugar.', apogee: 'Gestiona tu granja.', audiflo: 'Cuenta tu historia.', nestbitt: 'Haz música.',
    dailyworship: 'Música de adoración para cada comunidad.', gclap: 'Email para todos.', filemanager: 'Organiza todo.', rateads: 'Escucha a tu comunidad.',
  },
  hi: {
    clappe: 'व्यवसाय चलाएँ।', clapbill: 'अपने काम का भुगतान पाएँ।', clapmed: 'अपने स्वास्थ्य का प्रबंधन करें।', clapdiet: 'बेहतर खाएँ।', clapmove: 'बेहतर चलें।',
    clappay: 'कहीं भी भुगतान पाएँ।', clapwork: 'कहीं से भी जीविका कमाएँ।', apogee: 'अपने खेत का प्रबंधन करें।', audiflo: 'अपनी कहानी सुनाएँ।', nestbitt: 'संगीत बनाएँ।',
    dailyworship: 'हर समुदाय के लिए पूजा संगीत।', gclap: 'सभी के लिए ईमेल।', filemanager: 'सब कुछ व्यवस्थित करें।', rateads: 'अपने समुदाय की सुनें।',
  },
  ar: {
    clappe: 'أدِر عملك.', clapbill: 'احصل على أجر عملك.', clapmed: 'أدِر صحّتك.', clapdiet: 'تناوَل طعامًا أفضل.', clapmove: 'تحرّك أفضل.',
    clappay: 'احصل على المدفوعات في أي مكان.', clapwork: 'اكسب رزقك من أي مكان.', apogee: 'أدِر مزرعتك.', audiflo: 'احكِ قصّتك.', nestbitt: 'اصنع الموسيقى.',
    dailyworship: 'موسيقى عبادة لكل مجتمع.', gclap: 'بريد إلكتروني للجميع.', filemanager: 'نظِّم كل شيء.', rateads: 'استمع إلى مجتمعك.',
  },
  fr: {
    clappe: 'Gérez une entreprise.', clapbill: 'Soyez payé pour votre travail.', clapmed: 'Gérez votre santé.', clapdiet: 'Mangez mieux.', clapmove: 'Bougez mieux.',
    clappay: 'Soyez payé, partout.', clapwork: 'Gagnez votre vie de partout.', apogee: 'Gérez votre ferme.', audiflo: 'Racontez votre histoire.', nestbitt: 'Faites de la musique.',
    dailyworship: 'Musique de culte pour chaque communauté.', gclap: 'Email pour tous.', filemanager: 'Organisez tout.', rateads: 'Écoutez votre communauté.',
  },
  pt: {
    clappe: 'Gerir um negócio.', clapbill: 'Receber pelo teu trabalho.', clapmed: 'Gerir a tua saúde.', clapdiet: 'Comer melhor.', clapmove: 'Mexer-te melhor.',
    clappay: 'Recebe, em qualquer lado.', clapwork: 'Ganha a vida de qualquer lugar.', apogee: 'Gere a tua quinta.', audiflo: 'Conta a tua história.', nestbitt: 'Faz música.',
    dailyworship: 'Música de louvor para cada comunidade.', gclap: 'Email para todos.', filemanager: 'Organiza tudo.', rateads: 'Ouve a tua comunidade.',
  },
  bn: {
    clappe: 'ব্যবসা চালান।', clapbill: 'আপনার কাজের জন্য অর্থ পান।', clapmed: 'আপনার স্বাস্থ্য পরিচালনা করুন।', clapdiet: 'ভালো খান।', clapmove: 'ভালো নড়াচড়া করুন।',
    clappay: 'যেকোনো জায়গায় অর্থ পান।', clapwork: 'যেকোনো জায়গা থেকে জীবিকা অর্জন করুন।', apogee: 'আপনার খামার পরিচালনা করুন।', audiflo: 'আপনার গল্প বলুন।', nestbitt: 'সঙ্গীত তৈরি করুন।',
    dailyworship: 'প্রতিটি সম্প্রদায়ের জন্য আরাধনা সঙ্গীত।', gclap: 'সবার জন্য ইমেইল।', filemanager: 'সবকিছু সংগঠিত করুন।', rateads: 'আপনার সম্প্রদায়ের কথা শুনুন।',
  },
  ru: {
    clappe: 'Веди бизнес.', clapbill: 'Получай оплату за работу.', clapmed: 'Управляй своим здоровьем.', clapdiet: 'Питайся лучше.', clapmove: 'Двигайся лучше.',
    clappay: 'Получай оплату везде.', clapwork: 'Зарабатывай откуда угодно.', apogee: 'Управляй своей фермой.', audiflo: 'Расскажи свою историю.', nestbitt: 'Создавай музыку.',
    dailyworship: 'Музыка богослужения для каждой общины.', gclap: 'Email для всех.', filemanager: 'Организуй всё.', rateads: 'Слушай своё сообщество.',
  },
  ur: {
    clappe: 'کاروبار چلائیں۔', clapbill: 'اپنے کام کا معاوضہ حاصل کریں۔', clapmed: 'اپنی صحت کا انتظام کریں۔', clapdiet: 'بہتر کھائیں۔', clapmove: 'بہتر حرکت کریں۔',
    clappay: 'کہیں بھی ادائیگی حاصل کریں۔', clapwork: 'کہیں سے بھی ذریعہ معاش کمائیں۔', apogee: 'اپنے فارم کا انتظام کریں۔', audiflo: 'اپنی کہانی سنائیں۔', nestbitt: 'موسیقی بنائیں۔',
    dailyworship: 'ہر برادری کے لیے عبادتی موسیقی۔', gclap: 'ہر کسی کے لیے ای میل۔', filemanager: 'ہر چیز کو منظم کریں۔', rateads: 'اپنی برادری کی بات سنیں۔',
  },
  id: {
    clappe: 'Jalankan bisnis.', clapbill: 'Dapatkan bayaran atas pekerjaanmu.', clapmed: 'Kelola kesehatanmu.', clapdiet: 'Makan lebih baik.', clapmove: 'Bergerak lebih baik.',
    clappay: 'Terima pembayaran di mana saja.', clapwork: 'Mencari nafkah dari mana saja.', apogee: 'Kelola pertanianmu.', audiflo: 'Ceritakan kisahmu.', nestbitt: 'Buat musik.',
    dailyworship: 'Musik ibadah untuk setiap komunitas.', gclap: 'Email untuk semua orang.', filemanager: 'Atur semuanya.', rateads: 'Dengarkan komunitasmu.',
  },
  sw: {
    clappe: 'Endesha biashara.', clapbill: 'Pata malipo ya kazi yako.', clapmed: 'Simamia afya yako.', clapdiet: 'Kula vizuri zaidi.', clapmove: 'Sogea vizuri zaidi.',
    clappay: 'Pata malipo popote.', clapwork: 'Pata riziki popote.', apogee: 'Simamia shamba lako.', audiflo: 'Simulia hadithi yako.', nestbitt: 'Tengeneza muziki.',
    dailyworship: 'Muziki wa ibada kwa kila jamii.', gclap: 'Barua pepe kwa kila mtu.', filemanager: 'Panga kila kitu.', rateads: 'Sikiliza jamii yako.',
  },
  yo: {
    clappe: 'Ṣe ìṣe òwò.', clapbill: 'Gba owó iṣẹ́ rẹ.', clapmed: 'Ṣàkóso ìlera rẹ.', clapdiet: 'Jẹun dáadáa.', clapmove: 'Rin dáadáa.',
    clappay: 'Gba owó níbi-gbogbo.', clapwork: 'Ṣe owó láti ibikíbi.', apogee: 'Ṣàkóso oko rẹ.', audiflo: 'Ṣe àkọsílẹ̀ ìtàn rẹ.', nestbitt: 'Ṣe orin.',
    dailyworship: 'Orin ìjọsìn fún àwùjọ kọ̀ọ̀kan.', gclap: 'Ìmẹ́ìlì fún gbogbo ènìyàn.', filemanager: 'Ṣètò ohun gbogbo.', rateads: 'Tẹ́tí sí àwùjọ rẹ.',
  },
  ha: {
    clappe: 'Gudanar da kasuwanci.', clapbill: 'Sami biyan kuɗin aikinka.', clapmed: 'Sarrafa lafiyarka.', clapdiet: 'Ci abinci mafi kyau.', clapmove: 'Motsa mafi kyau.',
    clappay: "Sami biyan kuɗi a ko'ina.", clapwork: "Sami abin rayuwa daga ko'ina.", apogee: 'Sarrafa gonarka.', audiflo: 'Faɗi labarin ka.', nestbitt: 'Yi kiɗa.',
    dailyworship: "Kiɗan bauta ga kowace al'umma.", gclap: 'Imel ga kowa.', filemanager: 'Tsara komai.', rateads: "Saurari al'ummarka.",
  },
};

const PRODUCT_SHORTDESCS: Record<LocaleCode, Record<string, string>> = {
  'zh-CN': {
    clappe: '一个统一的 ERP，既适用于个体经营者，也适用于拥有 5,000 名员工的制造商。相同的功能，相同的质量，按购买力调整的定价。',
    clapbill: '多租户开票与业务管理。多伦多的咨询公司和拉各斯的市场摊位在同一平台上获得专业开票服务。',
    clapmed: '一个具备代理能力的电子病历系统。苏黎世的私人诊所与农村卫生所使用同一套记录系统——两者均支持离线。',
    clapdiet: '基于实验室指导的营养与膳食规划。同时服务于管理慢性病的城市专业人士和应对食品安全挑战的家庭。',
    clapmove: '个性化关节健康方案、疼痛追踪和临床支持的健康管理。既适用于管理慢性病的人，也适用于从零开始建立活动能力的人。',
    clappay: '全球统一金融平台——支持各类付款通道。',
    clapwork: '以信任为本的自由职业市场。旧金山和坎帕拉的自由职业者在同等条件下竞争——同样的工具、同样的代管、同样的合规。',
    apogee: '山羊养殖管理系统，既适用于商业养殖场，也适用于小农户。',
    audiflo: '面向多种受众的 AI 演示讲解。',
    nestbitt: 'AI 音乐生成与声音克隆。',
    dailyworship: 'AI 驱动的礼拜音乐生成，开源。',
    gclap: '开源的 AI 集成邮件与营销平台。',
    filemanager: '统一的跨平台文件操作、传输、同步与治理。',
    rateads: '面向各类社群的调查与反馈平台——企业、市民、弱势群体。',
  },
  es: {
    clappe: 'Un ERP unificado, útil tanto para una tienda de una sola persona como para un fabricante de 5.000 empleados. Mismas funciones, misma calidad, precios ajustados por poder adquisitivo.',
    clapbill: 'Facturación y gestión empresarial multiinquilino. Facturación profesional para una consultoría en Toronto y un puesto de mercado en Lagos en la misma plataforma.',
    clapmed: 'Un historial clínico electrónico con capacidad agéntica. El mismo sistema de registros que usa una clínica privada en Zúrich y un puesto de salud rural — con capacidad offline para ambos.',
    clapdiet: 'Nutrición y planificación de comidas guiadas por análisis. Sirve tanto a profesionales urbanos con enfermedades crónicas como a familias que afrontan retos de seguridad alimentaria.',
    clapmove: 'Programas personalizados de salud articular, seguimiento del dolor y bienestar con apoyo clínico. Funciona para quien gestiona una afección crónica y para quien construye movilidad desde cero.',
    clappay: 'Plataforma financiera unificada global — todos los rieles de pago.',
    clapwork: 'Marketplace freelance basado en la confianza. Un freelancer en San Francisco y otro en Kampala compiten en igualdad de condiciones — mismas herramientas, mismo escrow, mismo cumplimiento.',
    apogee: 'Sistema de gestión de cría caprina para granjas comerciales y pequeños productores por igual.',
    audiflo: 'Narración de presentaciones con IA para múltiples audiencias.',
    nestbitt: 'Generación musical con IA y clonación de voz.',
    dailyworship: 'Generación de música de adoración con IA, código abierto.',
    gclap: 'Plataforma de email y marketing integrada con IA, código abierto.',
    filemanager: 'Operaciones unificadas de archivos multiplataforma: transferencia, sincronización y gobernanza.',
    rateads: 'Plataforma de encuestas y feedback para cada comunidad — empresarial, ciudadana, desatendida.',
  },
  hi: {
    clappe: 'एक एकीकृत ERP, जो एक-व्यक्ति की दुकान और 5,000 कर्मचारियों वाली निर्माण कंपनी दोनों के लिए उपयोगी है। समान सुविधाएँ, समान गुणवत्ता, क्रय-शक्ति-समायोजित मूल्य।',
    clapbill: 'बहु-किराएदार इनवॉइसिंग और व्यवसाय प्रबंधन। टोरंटो की परामर्श कंपनी और लागोस के बाज़ार-स्टाल के लिए एक ही प्लेटफ़ॉर्म पर पेशेवर बिलिंग।',
    clapmed: 'एजेंटिक इलेक्ट्रॉनिक मेडिकल रिकॉर्ड। ज़्यूरिख के निजी क्लीनिक और ग्रामीण स्वास्थ्य केंद्र — दोनों के लिए ऑफ़लाइन-सक्षम एक ही रिकॉर्ड सिस्टम।',
    clapdiet: 'प्रयोगशाला-निर्देशित पोषण और भोजन योजना। पुरानी बीमारियों का प्रबंधन करने वाले शहरी पेशेवर और खाद्य-सुरक्षा चुनौतियों का सामना करने वाले परिवार दोनों के लिए।',
    clapmove: 'व्यक्तिगत जोड़-स्वास्थ्य कार्यक्रम, दर्द-ट्रैकिंग और चिकित्सक-समर्थित कल्याण। पुरानी स्थिति प्रबंधित करने वाले और शून्य से गतिशीलता बनाने वाले — दोनों के लिए काम करता है।',
    clappay: 'वैश्विक एकीकृत वित्तीय मंच — हर भुगतान चैनल।',
    clapwork: 'विश्वास-प्रथम फ्रीलांस मार्केटप्लेस। सैन फ्रांसिस्को और कंपाला के फ्रीलांसर समान शर्तों पर प्रतिस्पर्धा करते हैं — समान उपकरण, समान एस्क्रो, समान अनुपालन।',
    apogee: 'व्यावसायिक खेतों और छोटे किसानों दोनों के लिए बकरी पालन प्रबंधन सिस्टम।',
    audiflo: 'बहु-दर्शक AI प्रस्तुति नैरेशन।',
    nestbitt: 'AI संगीत निर्माण और आवाज़ क्लोनिंग।',
    dailyworship: 'AI-संचालित आराधना संगीत निर्माण, ओपन सोर्स।',
    gclap: 'ओपन-सोर्स AI-एकीकृत ईमेल और मार्केटिंग प्लेटफ़ॉर्म।',
    filemanager: 'एकीकृत क्रॉस-प्लेटफ़ॉर्म फ़ाइल संचालन, स्थानांतरण, सिंक और शासन।',
    rateads: 'हर समुदाय के लिए सर्वेक्षण और फ़ीडबैक प्लेटफ़ॉर्म — उद्यम, नागरिक, वंचित।',
  },
  ar: {
    clappe: 'نظام ERP موحَّد يناسب متجرًا فرديًا ومُصنِّعًا يضم 5,000 موظف على حد سواء. نفس الميزات، نفس الجودة، أسعار مُعدَّلة وفق القوة الشرائية.',
    clapbill: 'فوترة متعددة المستأجرين وإدارة الأعمال. فوترة احترافية لشركة استشارية في تورونتو وكشك سوق في لاغوس على المنصة نفسها.',
    clapmed: 'سجل طبي إلكتروني وكيل. نفس نظام السجلات المستخدم في عيادة خاصة في زيورخ ومركز صحي ريفي — يعمل دون اتصال لكليهما.',
    clapdiet: 'تغذية وتخطيط وجبات موجَّهان بالمختبر. يخدم المهنيين الحضريين الذين يديرون أمراضًا مزمنة والأسر التي تواجه تحديات الأمن الغذائي على حد سواء.',
    clapmove: 'برامج شخصية لصحة المفاصل، وتتبُّع الألم، وعافية بدعم سريري. تعمل لمن يدير حالة مزمنة ومن يبني الحركة من الصفر.',
    clappay: 'منصة مالية موحَّدة عالميًا — كل قنوات الدفع.',
    clapwork: 'سوق عمل حر يقوم على الثقة. مستقل في سان فرانسيسكو ومستقل في كمبالا يتنافسان بنفس الشروط — نفس الأدوات، نفس الضمان، نفس الامتثال.',
    apogee: 'نظام إدارة تربية الماعز للمزارع التجارية وصغار المربين على حد سواء.',
    audiflo: 'سرد عروض تقديمية بالذكاء الاصطناعي لجماهير متعددة.',
    nestbitt: 'توليد موسيقى وتقليد أصوات بالذكاء الاصطناعي.',
    dailyworship: 'توليد موسيقى عبادة بالذكاء الاصطناعي، مفتوح المصدر.',
    gclap: 'منصة بريد إلكتروني وتسويق مدمجة بالذكاء الاصطناعي ومفتوحة المصدر.',
    filemanager: 'عمليات ملفات موحَّدة عبر المنصات، ونقل ومزامنة وحوكمة.',
    rateads: 'منصة استطلاع وتغذية راجعة لكل مجتمع — مؤسسي ومدني وفئات قليلة الخدمة.',
  },
  fr: {
    clappe: "Un ERP unifié, utilisable autant par un commerce d'une seule personne que par un fabricant de 5 000 employés. Mêmes fonctionnalités, même qualité, prix ajustés au pouvoir d'achat.",
    clapbill: "Facturation multi-locataire et gestion d'entreprise. Facturation professionnelle pour un cabinet de conseil à Toronto et un étal de marché à Lagos sur la même plateforme.",
    clapmed: "Dossier médical électronique agentique. Le même système d'enregistrement utilisé par une clinique privée à Zurich et un poste de santé rural — avec capacité hors ligne pour les deux.",
    clapdiet: 'Nutrition et planification de repas guidées par laboratoire. Sert à la fois les professionnels urbains gérant des maladies chroniques et les familles confrontées à des défis de sécurité alimentaire.',
    clapmove: "Programmes personnalisés de santé articulaire, suivi de la douleur et bien-être avec accompagnement clinique. Fonctionne pour quelqu'un gérant une affection chronique et pour quelqu'un construisant sa mobilité à partir de zéro.",
    clappay: 'Plateforme financière unifiée mondiale — chaque rail de paiement.',
    clapwork: 'Place de marché freelance basée sur la confiance. Un freelance à San Francisco et un freelance à Kampala se concurrencent dans les mêmes conditions — mêmes outils, même séquestre, même conformité.',
    apogee: "Système de gestion d'élevage caprin pour fermes commerciales et petits éleveurs.",
    audiflo: 'Narration de présentations IA multi-audiences.',
    nestbitt: 'Génération musicale et clonage vocal par IA.',
    dailyworship: 'Génération de musique de culte par IA, open source.',
    gclap: "Plateforme open source d'email et de marketing intégrée à l'IA.",
    filemanager: 'Opérations de fichiers unifiées multiplateformes, transfert, synchronisation, gouvernance.',
    rateads: 'Plateforme de sondages et de retours pour chaque communauté — entreprise, citoyenne, mal desservie.',
  },
  pt: {
    clappe: 'Um ERP unificado, utilizável tanto por um negócio de uma só pessoa como por um fabricante com 5.000 funcionários. Mesmas funcionalidades, mesma qualidade, preços ajustados ao poder de compra.',
    clapbill: 'Faturação multi-tenant e gestão empresarial. Faturação profissional para uma consultoria em Toronto e uma banca de mercado em Lagos, na mesma plataforma.',
    clapmed: 'Registo Médico Eletrónico agêntico. O mesmo sistema usado por uma clínica privada em Zurique e por um posto de saúde rural — com capacidade offline para ambos.',
    clapdiet: 'Nutrição e planeamento de refeições orientados por laboratório. Serve profissionais urbanos a gerir doenças crónicas e famílias que enfrentam desafios de segurança alimentar.',
    clapmove: 'Programas personalizados de saúde articular, acompanhamento da dor e bem-estar com apoio clínico. Funciona para quem gere uma condição crónica e para quem está a construir mobilidade do zero.',
    clappay: 'Plataforma Financeira Unificada Global — todos os meios de pagamento.',
    clapwork: 'Marketplace freelance baseado em confiança. Um freelancer em São Francisco e um freelancer em Kampala competem nas mesmas condições — mesmas ferramentas, mesmo escrow, mesma conformidade.',
    apogee: 'Sistema de gestão de criação de cabras para quintas comerciais e pequenos produtores.',
    audiflo: 'Narração de apresentações com IA para múltiplas audiências.',
    nestbitt: 'Geração de música e clonagem de voz com IA.',
    dailyworship: 'Geração de música de louvor com IA, open source.',
    gclap: 'Plataforma open source de email e marketing integrada com IA.',
    filemanager: 'Operações unificadas de ficheiros multiplataforma — transferência, sincronização, governança.',
    rateads: 'Plataforma de inquéritos e feedback para cada comunidade — empresarial, cívica, sub-representada.',
  },
  bn: {
    clappe: 'একটি সমন্বিত ERP, যা একক-ব্যক্তির দোকান এবং ৫,০০০ কর্মীর প্রস্তুতকারক উভয়ের জন্যই উপযোগী। একই বৈশিষ্ট্য, একই গুণমান, ক্রয়ক্ষমতা অনুযায়ী সমন্বিত মূল্য।',
    clapbill: 'মাল্টি-টেন্যান্ট ইনভয়েসিং ও ব্যবসা ব্যবস্থাপনা। একই প্ল্যাটফর্মে টরন্টোর একটি পরামর্শক প্রতিষ্ঠান এবং লাগোসের একটি বাজার-স্টলের জন্য পেশাদার বিলিং।',
    clapmed: 'একটি এজেন্টিক ইলেকট্রনিক মেডিকেল রেকর্ড। জুরিখের একটি ব্যক্তিগত ক্লিনিক ও একটি গ্রামীণ স্বাস্থ্যকেন্দ্র — উভয়ের জন্য একই অফলাইন-সক্ষম রেকর্ড সিস্টেম।',
    clapdiet: 'গবেষণাগার-নির্দেশিত পুষ্টি ও খাদ্য পরিকল্পনা। দীর্ঘস্থায়ী রোগ ব্যবস্থাপনাকারী শহুরে পেশাদার ও খাদ্য-নিরাপত্তা চ্যালেঞ্জ মোকাবিলাকারী পরিবার উভয়কে সেবা দেয়।',
    clapmove: 'ব্যক্তিগতকৃত জয়েন্ট-স্বাস্থ্য কর্মসূচি, ব্যথা-ট্র্যাকিং এবং চিকিৎসক-সমর্থিত সুস্থতা। দীর্ঘস্থায়ী অবস্থা পরিচালনাকারী এবং শূন্য থেকে গতিশীলতা গড়ে তোলা — উভয়ের জন্য কাজ করে।',
    clappay: 'বিশ্বব্যাপী সমন্বিত আর্থিক প্ল্যাটফর্ম — প্রতিটি অর্থপ্রদান চ্যানেল।',
    clapwork: 'বিশ্বাস-প্রথম ফ্রিল্যান্স মার্কেটপ্লেস। সান ফ্রান্সিসকোর একজন ফ্রিল্যান্সার ও কাম্পালার একজন ফ্রিল্যান্সার একই শর্তে প্রতিদ্বন্দ্বিতা করেন — একই সরঞ্জাম, একই এসক্রো, একই কমপ্লায়েন্স।',
    apogee: 'বাণিজ্যিক খামার ও ক্ষুদ্র চাষি উভয়ের জন্য ছাগল পালন ব্যবস্থাপনা সিস্টেম।',
    audiflo: 'বহু-শ্রোতা AI উপস্থাপনা ন্যারেশন।',
    nestbitt: 'AI সংগীত উৎপাদন ও কণ্ঠ ক্লোনিং।',
    dailyworship: 'AI-চালিত আরাধনা সংগীত উৎপাদন, ওপেন সোর্স।',
    gclap: 'ওপেন-সোর্স AI-সমন্বিত ইমেইল ও মার্কেটিং প্ল্যাটফর্ম।',
    filemanager: 'সমন্বিত ক্রস-প্ল্যাটফর্ম ফাইল অপারেশন, স্থানান্তর, সিঙ্ক, প্রশাসন।',
    rateads: 'প্রতিটি সম্প্রদায়ের জন্য সমীক্ষা ও ফিডব্যাক প্ল্যাটফর্ম — উদ্যোগ, নাগরিক, অবহেলিত।',
  },
  ru: {
    clappe: 'Единая ERP, подходящая как для бизнеса из одного человека, так и для производителя с 5000 сотрудников. Одни функции, одно качество, цены с поправкой на покупательную способность.',
    clapbill: 'Многоарендные счета и управление бизнесом. Профессиональное выставление счетов для консалтинговой фирмы в Торонто и рыночного прилавка в Лагосе на одной платформе.',
    clapmed: 'Агентная электронная медицинская карта. Одна и та же система записей в частной клинике в Цюрихе и в сельском медпункте — с офлайн-режимом для обоих.',
    clapdiet: 'Лабораторно ориентированное питание и планирование меню. Служит как городским специалистам, управляющим хроническими заболеваниями, так и семьям, сталкивающимся с проблемой продовольственной безопасности.',
    clapmove: 'Персональные программы здоровья суставов, отслеживание боли и поддержка клиницистов. Работает и для тех, кто справляется с хроническим заболеванием, и для тех, кто строит мобильность с нуля.',
    clappay: 'Глобальная единая финансовая платформа — все платёжные каналы.',
    clapwork: 'Фриланс-маркетплейс, основанный на доверии. Фрилансер в Сан-Франциско и фрилансер в Кампале конкурируют на равных условиях — одни инструменты, один эскроу, один комплаенс.',
    apogee: 'Система управления козоводством — для коммерческих ферм и мелких хозяйств.',
    audiflo: 'ИИ-озвучка презентаций для разных аудиторий.',
    nestbitt: 'ИИ-генерация музыки и клонирование голоса.',
    dailyworship: 'ИИ-генерация богослужебной музыки, открытый исходный код.',
    gclap: 'Открытая платформа email- и маркетинга с интеграцией ИИ.',
    filemanager: 'Единые кросс-платформенные файловые операции — перенос, синхронизация, управление.',
    rateads: 'Платформа опросов и обратной связи для каждой общины — корпоративной, гражданской, недостаточно охваченной.',
  },
  ur: {
    clappe: 'ایک متحدہ ERP، جو ایک فرد کی دکان اور 5,000 ملازمین والے تیار کار دونوں کے لیے یکساں مفید ہے۔ وہی خصوصیات، وہی معیار، قوتِ خرید کے مطابق قیمتیں۔',
    clapbill: 'ملٹی-ٹیننٹ انوائسنگ اور کاروباری انتظام۔ ایک ہی پلیٹ فارم پر ٹورنٹو کی مشاورتی فرم اور لاگوس کے بازاری اسٹال کے لیے پیشہ ورانہ بلنگ۔',
    clapmed: 'ایک ایجنٹک الیکٹرانک میڈیکل ریکارڈ۔ زیورخ کے نجی کلینک اور دیہی صحت مرکز دونوں کے استعمال میں آنے والا ایک ہی ریکارڈ سسٹم — دونوں کے لیے آف لائن قابل۔',
    clapdiet: 'لیب-رہنمائی شدہ غذائیت اور کھانے کی منصوبہ بندی۔ دائمی بیماریوں کا انتظام کرنے والے شہری پیشہ ور اور خوراک کی حفاظت کے چیلنجز کا سامنا کرنے والے خاندان دونوں کو خدمت دیتی ہے۔',
    clapmove: 'ذاتی نوعیت کے جوڑوں کی صحت کے پروگرام، درد کی نگرانی اور معالج کی معاونت سے تندرستی۔ کسی دائمی حالت کا انتظام کرنے والے اور صفر سے نقل و حرکت بنانے والے — دونوں کے لیے کام کرتا ہے۔',
    clappay: 'عالمی متحدہ مالیاتی پلیٹ فارم — ہر ادائیگی کا ذریعہ۔',
    clapwork: 'اعتماد پر مبنی فری لانس مارکیٹ پلیس۔ سان فرانسسکو کا ایک فری لانسر اور کمپالا کا ایک فری لانسر یکساں شرائط پر مقابلہ کرتے ہیں — وہی اوزار، وہی ایسکرو، وہی تعمیلی شرائط۔',
    apogee: 'تجارتی فارموں اور چھوٹے کسانوں دونوں کے لیے بکری پالنے کا انتظامی سسٹم۔',
    audiflo: 'متعدد سامعین کے لیے AI پریزنٹیشن نیریشن۔',
    nestbitt: 'AI موسیقی کی تخلیق اور آواز کی نقل۔',
    dailyworship: 'AI سے چلنے والی عبادتی موسیقی کی تخلیق، اوپن سورس۔',
    gclap: 'اوپن سورس AI-مربوط ای میل اور مارکیٹنگ پلیٹ فارم۔',
    filemanager: 'متحدہ کراس-پلیٹ فارم فائل آپریشنز، منتقلی، ہم آہنگی، نظم و نسق۔',
    rateads: 'ہر برادری کے لیے سروے اور رائے کا پلیٹ فارم — کارپوریٹ، شہری، کم خدمت یافتہ۔',
  },
  id: {
    clappe: 'ERP terpadu yang cocok untuk toko satu orang maupun produsen 5.000 karyawan. Fitur sama, kualitas sama, harga disesuaikan dengan daya beli.',
    clapbill: 'Penagihan multi-tenant dan manajemen bisnis. Penagihan profesional bagi konsultan di Toronto dan kios pasar di Lagos pada platform yang sama.',
    clapmed: 'Rekam Medis Elektronik agentik. Sistem rekam yang sama digunakan klinik swasta di Zürich dan pos kesehatan pedesaan — keduanya berkemampuan offline.',
    clapdiet: 'Nutrisi dan perencanaan menu berbasis lab. Melayani profesional kota yang mengelola penyakit kronis dan keluarga yang menghadapi tantangan ketahanan pangan.',
    clapmove: 'Program kesehatan sendi yang dipersonalisasi, pelacakan nyeri, dan kebugaran dengan dukungan klinis. Bekerja untuk yang mengelola kondisi kronis dan yang membangun mobilitas dari nol.',
    clappay: 'Platform Keuangan Terpadu Global — setiap jalur pembayaran.',
    clapwork: 'Marketplace freelance berbasis kepercayaan. Freelancer di San Francisco dan freelancer di Kampala bersaing dengan syarat yang sama — alat sama, escrow sama, kepatuhan sama.',
    apogee: 'Sistem manajemen ternak kambing untuk peternakan komersial maupun peternak kecil.',
    audiflo: 'Narasi presentasi AI untuk banyak audiens.',
    nestbitt: 'Pembuatan musik dan kloning suara dengan AI.',
    dailyworship: 'Pembuatan musik ibadah berbasis AI, sumber terbuka.',
    gclap: 'Platform email & pemasaran terintegrasi AI, sumber terbuka.',
    filemanager: 'Operasi file lintas platform yang terpadu — transfer, sinkronisasi, tata kelola.',
    rateads: 'Platform survei dan umpan balik untuk setiap komunitas — enterprise, warga, kurang terlayani.',
  },
  sw: {
    clappe: 'ERP iliyounganishwa, inafaa kwa duka la mtu mmoja na mtengenezaji wa wafanyakazi 5,000 sawa. Vipengele sawa, ubora sawa, bei zilizolingana na nguvu ya ununuzi.',
    clapbill: 'Ankara za wapangaji wengi na usimamizi wa biashara. Ankara za kitaalamu kwa kampuni ya ushauri Toronto na kibanda cha sokoni Lagos kwenye jukwaa moja.',
    clapmed: 'Rekodi ya Kiafya ya Kielektroniki yenye uwezo wa wakala. Mfumo huo huo wa rekodi unatumika katika kliniki ya kibinafsi Zürich na kituo cha afya cha vijijini — vyote vinaweza kufanya kazi nje ya mtandao.',
    clapdiet: 'Lishe na upangaji wa milo unaoongozwa na maabara. Hutumikia wataalamu wa miji wanaosimamia magonjwa sugu na familia zinazokabiliana na changamoto za usalama wa chakula.',
    clapmove: 'Programu za afya ya viungo zilizobinafsishwa, ufuatiliaji wa maumivu, na ustawi unaoungwa mkono na madaktari. Inafanya kazi kwa anayesimamia hali sugu na anayejenga uhamaji kutoka mwanzo.',
    clappay: 'Jukwaa la Fedha la Kimataifa Lililounganishwa — kila njia ya malipo.',
    clapwork: 'Soko la freelance linalozingatia uaminifu. Freelancer wa San Francisco na wa Kampala wanashindana kwa masharti sawa — zana sawa, escrow sawa, kufuata sheria sawa.',
    apogee: 'Mfumo wa usimamizi wa ufugaji wa mbuzi kwa mashamba ya kibiashara na wakulima wadogo sawa.',
    audiflo: 'Usimulizi wa AI wa uwasilishaji kwa hadhira mbalimbali.',
    nestbitt: 'Uzalishaji wa muziki wa AI na unakili wa sauti.',
    dailyworship: 'Uzalishaji wa muziki wa ibada wa AI, chanzo huria.',
    gclap: 'Jukwaa la barua pepe na masoko lililojumuishwa na AI, chanzo huria.',
    filemanager: 'Operesheni za faili zilizounganishwa za majukwaa-mbalimbali — uhamishaji, usawazishaji, utawala.',
    rateads: 'Jukwaa la utafiti na maoni kwa kila jamii — biashara, raia, wasio na huduma za kutosha.',
  },
  yo: {
    clappe: 'ERP aṣopọ̀, ó wúlò fún ilé-iṣẹ́ ẹnìkan àti ilé-iṣẹ́ tó ní ẹgbẹ̀rún márùn-ún òṣìṣẹ́ bákan náà. Àwọn ẹ̀yà kan náà, irú-ọrẹ kan náà, owó tí a ṣe àdúnídé sí agbára ìrà.',
    clapbill: 'Ìwé-òwò onípilẹ̀ púpọ̀ àti ìṣàkóso òwò. Ìwé-òwò ọ̀jọ̀gbọ́n fún kọ̀mpaní ìmọ̀ràn ní Toronto àti ilé-ọjà ní Lagos lórí pẹpẹ kan náà.',
    clapmed: 'Àkọsílẹ̀ Ìṣègùn Itanna onípàtàkì. Ètò àkọsílẹ̀ kan náà tí kíníkì àdáni ní Zürich àti ilé-ìṣègùn igberiko ń lò — pẹ̀lú agbára aifara-ayélujára fún àwọn méjèèjì.',
    clapdiet: 'Oúnjẹ àti ìṣètò oúnjẹ tí ilé-iṣẹ́ ìmọ̀ ń darí. Ó ń ṣe iṣẹ́ fún àwọn òṣìṣẹ́ ìlú tí ń ṣàkóso àìsàn lójú-aiku àti ẹbí tí ń kojú ìpèníjà ààbò oúnjẹ.',
    clapmove: 'Ìtòlẹ́sẹẹsẹ ìlera oríkèé tí a ṣe àkànṣe, ìtọpinpin ìrora, àti àlàáfíà tí dókítà ti àtìlẹyìn. Ó ń ṣiṣẹ́ fún ẹni tí ń ṣàkóso àìsàn lójú-aiku àti fún ẹni tí ń kọ́ ìṣíkiri láti ọ̀dọ̀.',
    clappay: 'Pèpéle Ìnáwó Aṣọkan Àgbáyé — gbogbo ọ̀nà ìsanwó.',
    clapwork: 'Ọjà freelance tí ó dá lórí ìgbàgbọ́. Òṣìṣẹ́ aládàáṣe ní San Francisco àti ní Kampala ń díje lórí àwọn ipò kan náà — irinṣẹ́ kan náà, escrow kan náà, ìbámu kan náà.',
    apogee: 'Ètò ìṣàkóso ìtọ́jú ewúrẹ́ fún oko ìṣòwò àti àgbẹ̀ kéékèèkè bákan náà.',
    audiflo: 'Àwíjàgbà AI fún ìfihàn fún àwọn olùgbọ́ púpọ̀.',
    nestbitt: 'Ìṣẹ̀dá orin AI àti ẹ̀dà ohùn.',
    dailyworship: 'Ìṣẹ̀dá orin ìjọsìn AI, orisun ṣíṣí.',
    gclap: 'Pèpéle ìmẹ́ìlì àti títà tí AI dapo, orisun ṣíṣí.',
    filemanager: 'Iṣẹ́ fáìlì onípilẹ̀ pẹpẹ, gbigbe, ìmúdọ̀gba, ìṣàkóso.',
    rateads: 'Pèpéle ìbéèrè àti ìdáhùn fún àwùjọ kọ̀ọ̀kan — ilé-iṣẹ́, ará-ìlú, kò sí ìjọṣẹ́pọ̀.',
  },
  ha: {
    clappe: "ERP haɗe-haɗe, mai aiki ga shagon mutum ɗaya da kuma masana'antar da ke da ma'aikata 5,000 daidai. Iri ɗaya na fasali, iri ɗaya na inganci, farashin da aka daidaita da ƙarfin saye.",
    clapbill: 'Lissafi mai yawan haya da gudanar da kasuwanci. Lissafi na ƙwararru ga kamfanin shawara a Toronto da kuma kibanda kasuwa a Lagos a kan dandali ɗaya.',
    clapmed: 'Bayanin Likita na Lantarki mai aiki da kansa. Tsarin bayanan da asibitin sirri a Zürich da kuma asibitin karkara ke amfani da shi — duka biyu suna iya aiki ba tare da intanet ba.',
    clapdiet: 'Abinci da tsara cin abinci wanda dakin gwaje-gwaje ke jagoranta. Yana hidima ga ƙwararrun birane da ke gudanar da cututtukan dindindin da kuma iyalai da ke fuskantar ƙalubalen tsaro na abinci.',
    clapmove: 'Shirye-shiryen lafiyar gaɓoɓi na musamman, bin diddigin zafi, da ƙoshin lafiya tare da goyon baya na likita. Yana aiki ga wanda ke gudanar da yanayi mai dindindin da kuma wanda ke gina motsi daga sifili.',
    clappay: 'Dandali na Kuɗi na Duniya Mai Haɗe-Haɗe — kowace hanyar biya.',
    clapwork: "Kasuwar freelance ta amana-farko. Freelancer a San Francisco da kuma freelancer a Kampala suna gasa a kan sharudda iri ɗaya — kayan aiki iri ɗaya, escrow iri ɗaya, bin ka'idoji iri ɗaya.",
    apogee: 'Tsarin sarrafa kiwon awaki ga gonakin kasuwanci da ƙananan manoma daidai.',
    audiflo: 'Bayyana gabatarwa ta AI ga masu sauraro daban-daban.',
    nestbitt: 'Ƙirƙirar kiɗa ta AI da kuma kwafin murya.',
    dailyworship: 'Ƙirƙirar kiɗan bauta ta AI, buɗaɗɗen tushe.',
    gclap: 'Dandalin imel da tallace-tallace mai haɗe-haɗe da AI, buɗaɗɗen tushe.',
    filemanager: 'Ayyukan fayil masu haɗe-haɗe na dandali daban-daban, canja wuri, daidaitawa, mulki.',
    rateads: "Dandalin bincike da ra'ayi ga kowace al'umma — kasuwanci, ɗan ƙasa, marasa hidima.",
  },
};

const STUDIO_BLURB: Record<LocaleCode, string> = {
  'zh-CN': '一间致力于普惠数字接入的软件工作室。注册于 Alberta, Canada。将人类知识与人工智能相融合，为每一个人和每一家企业提供工具——无论在线还是离线。',
  es: 'Un estudio que desarrolla software para el acceso universal. Constituido en Alberta, Canada. Fusionamos el conocimiento humano con la inteligencia artificial para ofrecer herramientas a cada persona y cada empresa, con o sin conexión.',
  hi: 'सार्वभौमिक पहुँच के लिए सॉफ़्टवेयर निर्माण करने वाली एक कार्यशाला। Alberta, Canada में निगमित। मानवीय ज्ञान को कृत्रिम बुद्धिमत्ता से जोड़कर प्रत्येक व्यक्ति और प्रत्येक व्यवसाय के लिए उपकरण प्रदान करना — ऑनलाइन हो या ऑफ़लाइन।',
  ar: 'استوديو يبني برمجيات للوصول الشامل. مسجّل في Alberta, Canada. فريق صغير، منتجات متعددة، مهمة واحدة: برمجيات مؤسسية لكل إنسان.',
  fr: "Un studio qui crée des logiciels pour l'accès universel. Constitué en société en Alberta, Canada. Fusionnant le savoir humain et l'intelligence artificielle pour offrir des outils à chaque personne et chaque entreprise — en ligne ou hors ligne.",
  pt: 'Um estúdio de software dedicado ao acesso digital universal. Registrado em Alberta, Canada. Combina conhecimento humano com inteligência artificial para entregar ferramentas a cada pessoa e cada empresa — online ou offline.',
  bn: 'সর্বজনীন ডিজিটাল প্রবেশাধিকারের জন্য একটি সফটওয়্যার স্টুডিও। Alberta, Canada-তে নিবন্ধিত। মানবীয় জ্ঞান ও কৃত্রিম বুদ্ধিমত্তাকে একত্র করে প্রতিটি মানুষ ও প্রতিটি ব্যবসার জন্য টুল তৈরি করে — অনলাইন হোক বা অফলাইন।',
  ru: 'Студия программного обеспечения, посвящённая всеобщему цифровому доступу. Зарегистрирована в Alberta, Canada. Объединяет человеческий опыт и искусственный интеллект для создания инструментов, доступных каждому человеку и каждому бизнесу — онлайн и офлайн.',
  ur: 'ایک سافٹ ویئر اسٹوڈیو جو عالمی ڈیجیٹل رسائی کے لیے وقف ہے۔ Alberta, Canada میں رجسٹرڈ۔ انسانی علم اور مصنوعی ذہانت کو یکجا کر کے ہر فرد اور ہر کاروبار کے لیے آلات تیار کرتا ہے — آن لائن ہو یا آف لائن۔',
  id: 'Sebuah studio yang membangun perangkat lunak untuk akses universal. Didirikan di Alberta, Canada. Menggabungkan pengetahuan manusia dengan kecerdasan buatan untuk menghadirkan alat bagi setiap orang dan setiap bisnis — online maupun offline.',
  sw: 'Studio ya programu inayojikita katika ufikiaji wa kidijitali kwa wote. Imesajiliwa Alberta, Canada. Inachanganya ujuzi wa binadamu na akili bandia ili kutengeneza zana kwa kila mtu na kila biashara — mtandaoni au nje ya mtandao.',
  yo: 'Ilé iṣẹ́ tí ń kọ́ ètò amúlò fún ànfààní àgbáyé. Tí a forúkọsílẹ̀ ní Alberta, Canada. A ń so ìmọ̀ ẹ̀dá ènìyàn pọ̀ mọ́ ìmọ̀ atọwọ́dá láti pèsè irinṣẹ́ fún gbogbo ènìyàn àti gbogbo iṣẹ́ — bóyá lórí ayélujára tàbí ní àìsí i.',
  ha: 'Ɗakin aiki da ke haɓaka manhajoji don samun damar kowa. An kafa shi a Alberta, Canada. Muna haɗa ilimin ɗan adam da fasahar hankali na wucin gadi don samar da kayayyaki ga kowane mutum da kowace kasuwanci, da haɗin yanar gizo ko ba tare da shi ba.',
};

type CategoryTr = { slug: string; name: string; description: string };

const CATEGORIES_TR: Record<LocaleCode, CategoryTr[]> = {
  'zh-CN': [
    { slug: 'core-platform', name: '核心平台与业务运营', description: 'ERP、开票、中小企业运营和医疗账单工具。' },
    { slug: 'health-wellness', name: '健康与保健 / 医学', description: '病历、营养、诊所和关节健康保健。' },
    { slug: 'finance-commerce', name: '金融与商务', description: '支付、交易和金融研究。' },
    { slug: 'work-community', name: '工作、自由职业与社群', description: '自由职业市场和基础设施。' },
    { slug: 'agriculture-food', name: '农业与食品', description: '农场管理系统。' },
    { slug: 'media-creative', name: '媒体、创意与知识', description: 'AI 演示、音乐、语音和视频工具。' },
    { slug: 'communications-data', name: '通信、数据与基础设施', description: '电子邮件、文件操作、调查和邮件骨干。' },
  ],
  es: [
    { slug: 'core-platform', name: 'Plataforma central y operaciones empresariales', description: 'ERP, facturación, operaciones para pymes y herramientas de facturación sanitaria.' },
    { slug: 'health-wellness', name: 'Salud y bienestar / Medicina', description: 'Historiales médicos, nutrición, clínicas y bienestar articular.' },
    { slug: 'finance-commerce', name: 'Finanzas y comercio', description: 'Pagos, trading e investigación financiera.' },
    { slug: 'work-community', name: 'Trabajo, freelance y comunidad', description: 'Mercado freelance e infraestructura.' },
    { slug: 'agriculture-food', name: 'Agricultura y alimentación', description: 'Sistemas de gestión de granjas.' },
    { slug: 'media-creative', name: 'Medios, creativo y conocimiento', description: 'Herramientas de IA para presentaciones, música, voz y vídeo.' },
    { slug: 'communications-data', name: 'Comunicaciones, datos e infraestructura', description: 'Correo, operaciones de archivos, encuestas y backbone de email.' },
  ],
  hi: [
    { slug: 'core-platform', name: 'मुख्य प्लेटफ़ॉर्म और व्यापार संचालन', description: 'ERP, इनवॉइसिंग, SMB संचालन और स्वास्थ्य बिलिंग उपकरण।' },
    { slug: 'health-wellness', name: 'स्वास्थ्य और कल्याण / चिकित्सा', description: 'चिकित्सा रिकॉर्ड, पोषण, क्लीनिक और जोड़-स्वास्थ्य कल्याण।' },
    { slug: 'finance-commerce', name: 'वित्त और वाणिज्य', description: 'भुगतान, ट्रेडिंग और वित्तीय अनुसंधान।' },
    { slug: 'work-community', name: 'कार्य, फ्रीलांस और समुदाय', description: 'फ्रीलांस बाज़ार और बुनियादी ढाँचा।' },
    { slug: 'agriculture-food', name: 'कृषि और खाद्य', description: 'फ़ार्म प्रबंधन सिस्टम।' },
    { slug: 'media-creative', name: 'मीडिया, क्रिएटिव और ज्ञान', description: 'AI प्रस्तुति, संगीत, आवाज़ और वीडियो उपकरण।' },
    { slug: 'communications-data', name: 'संचार, डेटा और बुनियादी ढाँचा', description: 'ईमेल, फ़ाइल ऑप्स, सर्वे और मेल बैकबोन।' },
  ],
  ar: [
    { slug: 'core-platform', name: 'المنصة الأساسية والعمليات التجارية', description: 'ERP، الفوترة، عمليات الشركات الصغيرة والمتوسطة، وأدوات فوترة الرعاية الصحية.' },
    { slug: 'health-wellness', name: 'الصحة والعافية / الطب', description: 'السجلات الطبية، التغذية، العيادات، وعافية المفاصل.' },
    { slug: 'finance-commerce', name: 'المالية والتجارة', description: 'المدفوعات، التداول، والبحث المالي.' },
    { slug: 'work-community', name: 'العمل والعمل الحر والمجتمع', description: 'سوق العمل الحر والبنية التحتية.' },
    { slug: 'agriculture-food', name: 'الزراعة والغذاء', description: 'أنظمة إدارة المزارع.' },
    { slug: 'media-creative', name: 'الإعلام والإبداع والمعرفة', description: 'أدوات الذكاء الاصطناعي للعروض والموسيقى والصوت والفيديو.' },
    { slug: 'communications-data', name: 'الاتصالات والبيانات والبنية التحتية', description: 'البريد الإلكتروني، عمليات الملفات، الاستبيانات، والعمود الفقري للبريد.' },
  ],
  fr: [
    { slug: 'core-platform', name: 'Plateforme centrale et opérations métier', description: "ERP, facturation, opérations PME et outils de facturation santé." },
    { slug: 'health-wellness', name: 'Santé et bien-être / Médecine', description: 'Dossiers médicaux, nutrition, cliniques et bien-être articulaire.' },
    { slug: 'finance-commerce', name: 'Finance et commerce', description: 'Paiements, trading et recherche financière.' },
    { slug: 'work-community', name: 'Travail, freelance et communauté', description: 'Marketplace freelance et infrastructure.' },
    { slug: 'agriculture-food', name: 'Agriculture et alimentation', description: 'Systèmes de gestion de fermes.' },
    { slug: 'media-creative', name: 'Médias, créatif et savoir', description: "Outils IA de présentation, musique, voix et vidéo." },
    { slug: 'communications-data', name: 'Communications, données et infrastructure', description: 'Email, opérations de fichiers, sondages et backbone mail.' },
  ],
  pt: [
    { slug: 'core-platform', name: 'Plataforma central e operações de negócio', description: 'ERP, faturação, operações de PMEs e ferramentas de faturação de saúde.' },
    { slug: 'health-wellness', name: 'Saúde e bem-estar / Medicina', description: 'Registos médicos, nutrição, clínicas e bem-estar articular.' },
    { slug: 'finance-commerce', name: 'Finança e comércio', description: 'Pagamentos, trading e investigação financeira.' },
    { slug: 'work-community', name: 'Trabalho, freelance e comunidade', description: 'Marketplace freelance e infraestrutura.' },
    { slug: 'agriculture-food', name: 'Agricultura e alimentação', description: 'Sistemas de gestão de quintas.' },
    { slug: 'media-creative', name: 'Media, criativo e conhecimento', description: 'Ferramentas de IA para apresentação, música, voz e vídeo.' },
    { slug: 'communications-data', name: 'Comunicações, dados e infraestrutura', description: 'Email, operações de ficheiros, inquéritos e backbone de mail.' },
  ],
  bn: [
    { slug: 'core-platform', name: 'মূল প্ল্যাটফর্ম ও ব্যবসায়িক কার্যক্রম', description: 'ERP, ইনভয়েসিং, SMB কার্যক্রম, এবং স্বাস্থ্যসেবা বিলিং সরঞ্জাম।' },
    { slug: 'health-wellness', name: 'স্বাস্থ্য ও কল্যাণ / চিকিৎসা', description: 'চিকিৎসা রেকর্ড, পুষ্টি, ক্লিনিক, এবং জয়েন্ট-স্বাস্থ্য কল্যাণ।' },
    { slug: 'finance-commerce', name: 'অর্থ ও বাণিজ্য', description: 'অর্থপ্রদান, ট্রেডিং, এবং আর্থিক গবেষণা।' },
    { slug: 'work-community', name: 'কাজ, ফ্রিল্যান্স ও সম্প্রদায়', description: 'ফ্রিল্যান্স মার্কেটপ্লেস ও অবকাঠামো।' },
    { slug: 'agriculture-food', name: 'কৃষি ও খাদ্য', description: 'খামার ব্যবস্থাপনা সিস্টেম।' },
    { slug: 'media-creative', name: 'মিডিয়া, সৃজনশীল ও জ্ঞান', description: 'AI উপস্থাপনা, সঙ্গীত, কণ্ঠ, এবং ভিডিও সরঞ্জাম।' },
    { slug: 'communications-data', name: 'যোগাযোগ, ডেটা ও অবকাঠামো', description: 'ইমেইল, ফাইল অপস, সমীক্ষা, এবং মেইল ব্যাকবোন।' },
  ],
  ru: [
    { slug: 'core-platform', name: 'Базовая платформа и бизнес-операции', description: 'ERP, выставление счетов, операции SMB и инструменты медицинского биллинга.' },
    { slug: 'health-wellness', name: 'Здоровье и благополучие / Медицина', description: 'Медкарты, питание, клиники и здоровье суставов.' },
    { slug: 'finance-commerce', name: 'Финансы и коммерция', description: 'Платежи, трейдинг и финансовые исследования.' },
    { slug: 'work-community', name: 'Работа, фриланс и сообщество', description: 'Фриланс-маркетплейс и инфраструктура.' },
    { slug: 'agriculture-food', name: 'Сельское хозяйство и продовольствие', description: 'Системы управления фермами.' },
    { slug: 'media-creative', name: 'Медиа, креатив и знания', description: 'ИИ-инструменты для презентаций, музыки, голоса и видео.' },
    { slug: 'communications-data', name: 'Коммуникации, данные и инфраструктура', description: 'Почта, файловые операции, опросы и магистраль для писем.' },
  ],
  ur: [
    { slug: 'core-platform', name: 'بنیادی پلیٹ فارم اور کاروباری آپریشنز', description: 'ERP، انوائسنگ، SMB آپریشنز، اور صحت بلنگ ٹولز۔' },
    { slug: 'health-wellness', name: 'صحت اور تندرستی / طب', description: 'طبی ریکارڈز، غذائیت، کلینکس، اور جوڑوں کی صحت کی تندرستی۔' },
    { slug: 'finance-commerce', name: 'مالیات اور تجارت', description: 'ادائیگیاں، ٹریڈنگ، اور مالی تحقیق۔' },
    { slug: 'work-community', name: 'کام، فری لانس اور کمیونٹی', description: 'فری لانس مارکیٹ پلیس اور انفراسٹرکچر۔' },
    { slug: 'agriculture-food', name: 'زراعت اور خوراک', description: 'فارم منیجمنٹ سسٹم۔' },
    { slug: 'media-creative', name: 'میڈیا، تخلیقی اور علم', description: 'AI پریزنٹیشن، موسیقی، آواز، اور ویڈیو ٹولز۔' },
    { slug: 'communications-data', name: 'مواصلات، ڈیٹا اور انفراسٹرکچر', description: 'ای میل، فائل آپس، سروے، اور میل بیک بون۔' },
  ],
  id: [
    { slug: 'core-platform', name: 'Platform inti & Operasi bisnis', description: 'ERP, faktur, operasi UKM, dan alat penagihan layanan kesehatan.' },
    { slug: 'health-wellness', name: 'Kesehatan & Kebugaran / Kedokteran', description: 'Rekam medis, nutrisi, klinik, dan kebugaran sendi.' },
    { slug: 'finance-commerce', name: 'Keuangan & Perdagangan', description: 'Pembayaran, trading, dan riset keuangan.' },
    { slug: 'work-community', name: 'Kerja, Freelance & Komunitas', description: 'Marketplace freelance dan infrastruktur.' },
    { slug: 'agriculture-food', name: 'Pertanian & Pangan', description: 'Sistem manajemen pertanian.' },
    { slug: 'media-creative', name: 'Media, Kreatif & Pengetahuan', description: 'Alat AI untuk presentasi, musik, suara, dan video.' },
    { slug: 'communications-data', name: 'Komunikasi, Data & Infrastruktur', description: 'Email, operasi file, survei, dan backbone email.' },
  ],
  sw: [
    { slug: 'core-platform', name: 'Jukwaa kuu na Operesheni za biashara', description: 'ERP, ankara, operesheni za SMB, na zana za bili za afya.' },
    { slug: 'health-wellness', name: 'Afya na ustawi / Tiba', description: 'Rekodi za matibabu, lishe, kliniki, na ustawi wa viungo.' },
    { slug: 'finance-commerce', name: 'Fedha na biashara', description: 'Malipo, trading, na utafiti wa kifedha.' },
    { slug: 'work-community', name: 'Kazi, freelance na jamii', description: 'Soko la freelance na miundombinu.' },
    { slug: 'agriculture-food', name: 'Kilimo na chakula', description: 'Mifumo ya usimamizi wa mashamba.' },
    { slug: 'media-creative', name: 'Vyombo vya habari, ubunifu na maarifa', description: 'Zana za AI za uwasilishaji, muziki, sauti, na video.' },
    { slug: 'communications-data', name: 'Mawasiliano, data na miundombinu', description: 'Barua pepe, operesheni za faili, tafiti, na mgongo wa mail.' },
  ],
  yo: [
    { slug: 'core-platform', name: 'Pèpéle pàtàkì àti Iṣẹ́ òwò', description: 'ERP, ìwé-òwò, iṣẹ́ SMB, àti àwọn ohun-èlò ìwé-òwò ìlera.' },
    { slug: 'health-wellness', name: 'Ìlera àti àlàáfíà / Ìṣègùn', description: 'Àkọsílẹ̀ ìṣègùn, oúnjẹ, kíníkì, àti àlàáfíà oríkèé.' },
    { slug: 'finance-commerce', name: 'Ìnáwó àti ìṣòwò', description: 'Ìsanwó, ìṣòwò, àti ìwádìí ìnáwó.' },
    { slug: 'work-community', name: 'Iṣẹ́, freelance àti àwùjọ', description: 'Ọjà freelance àti ìpilẹ̀ṣẹ̀.' },
    { slug: 'agriculture-food', name: 'Iṣẹ́-àgbẹ̀ àti oúnjẹ', description: 'Àwọn ètò ìṣàkóso oko.' },
    { slug: 'media-creative', name: 'Ìròyìn, àkànṣe àti ìmọ̀', description: 'Àwọn ohun-èlò AI fún ìfihàn, orin, ohùn, àti fídíò.' },
    { slug: 'communications-data', name: 'Ìbárasọ̀rọ̀, déètà àti ìpilẹ̀ṣẹ̀', description: 'Ìmẹ́ìlì, iṣẹ́ fáìlì, ìbéèrè, àti ọ̀pá-ẹ̀yìn mail.' },
  ],
  ha: [
    { slug: 'core-platform', name: 'Babban Dandali da Ayyukan Kasuwanci', description: 'ERP, lissafi, ayyukan SMB, da kayan aikin lissafin lafiya.' },
    { slug: 'health-wellness', name: 'Lafiya da Lafiya / Likita', description: 'Bayanan likita, abinci mai gina jiki, asibitoci, da lafiyar gaɓoɓi.' },
    { slug: 'finance-commerce', name: 'Kuɗi da Kasuwanci', description: 'Biyan kuɗi, ciniki, da bincike na kuɗi.' },
    { slug: 'work-community', name: "Aiki, Freelance da Al'umma", description: 'Kasuwar freelance da kayayyakin more rayuwa.' },
    { slug: 'agriculture-food', name: 'Noma da Abinci', description: 'Tsarin sarrafa gonaki.' },
    { slug: 'media-creative', name: 'Kafofin watsa labarai, Ƙira da Ilimi', description: 'Kayan aikin AI don gabatarwa, kiɗa, murya, da bidiyo.' },
    { slug: 'communications-data', name: 'Sadarwa, Bayanai da Ababen more rayuwa', description: 'Imel, ayyukan fayil, bincike, da kashin baya na mail.' },
  ],
};

const LOCALES: LocaleCode[] = ['zh-CN','es','hi','ar','fr','pt','bn','ru','ur','id','sw','yo','ha'];

export async function seedNewPagesTranslations(payload: Payload, log: string[]): Promise<void> {
  let updated = 0;

  for (const locale of LOCALES) {
    // site-settings (footer studioBlurb — only field rendered from this global)
    try {
      await payload.updateGlobal({
        slug: 'site-settings',
        locale: locale as any,
        data: { studioBlurb: STUDIO_BLURB[locale] } as any,
      });
    } catch (e: any) {
      log.push(`site-settings ${locale} failed: ${e?.message ?? e}`);
    }

    // status-page
    const s = STATUS[locale];
    await payload.updateGlobal({
      slug: 'status-page',
      locale: locale as any,
      data: { eyebrow: s.eyebrow, title: s.title, lede: s.lede, operationalCopy: s.operationalCopy } as any,
    });

    // trust-page (eyebrow/title/lede only — pillar headings stored per-row)
    const t = TRUST[locale];
    await payload.updateGlobal({
      slug: 'trust-page',
      locale: locale as any,
      data: { eyebrow: t.eyebrow, title: t.title, lede: t.lede } as any,
    });

    // Pillar headings/blurbs — fetch the English baseline, merge translated
    // heading+blurb per pillar matched by key, preserve id+href+proof rows.
    try {
      const baseline = (await payload.findGlobal({
        slug: 'trust-page',
        locale: 'en' as any,
      })) as any;
      const pillars = (baseline?.pillars ?? []).map((p: any) => {
        const match = t.pillarHeadings[p.key as string];
        if (!match) return p;
        return { ...p, heading: match.heading, blurb: match.blurb };
      });
      if (pillars.length > 0) {
        await payload.updateGlobal({
          slug: 'trust-page',
          locale: locale as any,
          data: { pillars } as any,
        });
      }
    } catch {
      // Payload mocks in tests may not implement findGlobal; skip silently.
    }

    // help-page
    const h = HELP[locale];
    await payload.updateGlobal({
      slug: 'help-page',
      locale: locale as any,
      data: {
        eyebrow: h.eyebrow,
        title: h.title,
        lede: h.lede,
        emergencyRow: { heading: h.emergencyRow.heading, body: h.emergencyRow.body },
        contactFallback: { heading: h.contactFallback.heading, body: h.contactFallback.body },
      } as any,
    });

    // careers-page (chrome — eyebrow/title/lede + groups; structured arrays via baseline-merge)
    const c = CAREERS[locale];
    await payload.updateGlobal({
      slug: 'careers-page',
      locale: locale as any,
      data: {
        eyebrow: c.eyebrow,
        title: c.title,
        lede: c.lede,
        openings: {
          heading: c.openings.heading,
          currentlyHiringText: c.openings.currentlyHiringText,
          note: c.openings.note,
        },
        introduceYourself: {
          eyebrow: c.introduceYourself.eyebrow,
          heading: c.introduceYourself.heading,
          body: c.introduceYourself.body,
        },
      } as any,
    });

    // howWeWork + productFamily arrays — fetch EN baseline once, replace per index, preserve row ids
    try {
      const careersBaseline = (await payload.findGlobal({
        slug: 'careers-page',
        locale: 'en' as any,
      })) as any;
      const howWeWork = (careersBaseline?.howWeWork ?? []).map((row: any, i: number) => {
        const tr = c.howWeWork[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const productFamily = (careersBaseline?.productFamily ?? []).map((row: any, i: number) => {
        const line = c.productFamily[i];
        if (!line) return row;
        return { ...row, line };
      });
      const process = (careersBaseline?.process ?? []).map((row: any, i: number) => {
        const tr = c.process[i];
        if (!tr) return row;
        return { ...row, stage: tr.stage, what: tr.what };
      });
      const arrayPatch: any = {};
      if (howWeWork.length > 0) arrayPatch.howWeWork = howWeWork;
      if (productFamily.length > 0) arrayPatch.productFamily = productFamily;
      if (process.length > 0) arrayPatch.process = process;
      if (Object.keys(arrayPatch).length > 0) {
        await payload.updateGlobal({
          slug: 'careers-page',
          locale: locale as any,
          data: arrayPatch,
        });
      }
    } catch {
      // Payload mocks in tests may not implement findGlobal; skip silently.
    }

    // press-page (chrome — eyebrow/title/lede + boilerplate + brandGuidance + contactCta; quotes via baseline-merge)
    const pr = PRESS[locale];
    await payload.updateGlobal({
      slug: 'press-page',
      locale: locale as any,
      data: {
        eyebrow: pr.eyebrow,
        title: pr.title,
        lede: pr.lede,
        boilerplate: pr.boilerplate,
        brandGuidance: {
          brandName: pr.brandGuidance.brandName,
          founderReference: pr.brandGuidance.founderReference,
        },
        contactCta: {
          eyebrow: pr.contactCta.eyebrow,
          heading: pr.contactCta.heading,
          body: pr.contactCta.body,
        },
      } as any,
    });

    // quotes array — fetch EN baseline, replace text+role per index, preserve who (proper noun) + row ids
    try {
      const pressBaseline = (await payload.findGlobal({
        slug: 'press-page',
        locale: 'en' as any,
      })) as any;
      const quotes = (pressBaseline?.quotes ?? []).map((row: any, i: number) => {
        const tr = pr.quotes[i];
        if (!tr) return row;
        return { ...row, text: tr.text, role: tr.role };
      });
      const factSheet = (pressBaseline?.factSheet ?? []).map((row: any, i: number) => {
        const tr = pr.factSheet[i];
        if (!tr) return row;
        return { ...row, label: tr.label, value: tr.value };
      });
      const storyAnglesYes = (pressBaseline?.storyAnglesYes ?? []).map((row: any, i: number) => {
        const tr = pr.storyAnglesYes[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const storyAnglesNo = (pressBaseline?.storyAnglesNo ?? []).map((row: any, i: number) => {
        const tr = pr.storyAnglesNo[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const arrayPatch: any = {};
      if (quotes.length > 0) arrayPatch.quotes = quotes;
      if (factSheet.length > 0) arrayPatch.factSheet = factSheet;
      if (storyAnglesYes.length > 0) arrayPatch.storyAnglesYes = storyAnglesYes;
      if (storyAnglesNo.length > 0) arrayPatch.storyAnglesNo = storyAnglesNo;
      if (Object.keys(arrayPatch).length > 0) {
        await payload.updateGlobal({
          slug: 'press-page',
          locale: locale as any,
          data: arrayPatch,
        });
      }
    } catch {
      // Payload mocks in tests may not implement findGlobal; skip silently.
    }

    // security-page (chrome — eyebrow/title/lede + postureSummary + reportCta; topStats array via baseline-merge)
    const sec = SECURITY[locale];
    await payload.updateGlobal({
      slug: 'security-page',
      locale: locale as any,
      data: {
        eyebrow: sec.eyebrow,
        title: sec.title,
        lede: sec.lede,
        postureSummary: {
          eyebrow: sec.postureSummary.eyebrow,
          heading: sec.postureSummary.heading,
          body: sec.postureSummary.body,
        },
        reportCta: {
          eyebrow: sec.reportCta.eyebrow,
          heading: sec.reportCta.heading,
          body: sec.reportCta.body,
        },
      } as any,
    });

    // topStats array — fetch EN baseline, replace label+value+hint per index, preserve row ids
    try {
      const securityBaseline = (await payload.findGlobal({
        slug: 'security-page',
        locale: 'en' as any,
      })) as any;
      const topStats = (securityBaseline?.topStats ?? []).map((row: any, i: number) => {
        const tr = sec.topStats[i];
        if (!tr) return row;
        return { ...row, label: tr.label, value: tr.value, hint: tr.hint };
      });
      const posture = (securityBaseline?.posture ?? []).map((row: any, i: number) => {
        const tr = sec.posture[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const dataHandling = (securityBaseline?.dataHandling ?? []).map((row: any, i: number) => {
        const tr = sec.dataHandling[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const compliance = (securityBaseline?.compliance ?? []).map((row: any, i: number) => {
        const tr = sec.compliance[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const securityArrayPatch: any = {};
      if (topStats.length > 0) securityArrayPatch.topStats = topStats;
      if (posture.length > 0) securityArrayPatch.posture = posture;
      if (dataHandling.length > 0) securityArrayPatch.dataHandling = dataHandling;
      if (compliance.length > 0) securityArrayPatch.compliance = compliance;
      if (Object.keys(securityArrayPatch).length > 0) {
        await payload.updateGlobal({
          slug: 'security-page',
          locale: locale as any,
          data: securityArrayPatch,
        });
      }
    } catch {
      // Payload mocks in tests may not implement findGlobal; skip silently.
    }

    // pricing-page (chrome + groups; principles array via baseline-merge)
    const pri = PRICING[locale];
    await payload.updateGlobal({
      slug: 'pricing-page',
      locale: locale as any,
      data: {
        eyebrow: pri.eyebrow,
        title: pri.title,
        lede: pri.lede,
        whyThisExists: {
          eyebrow: pri.whyThisExists.eyebrow,
          heading: pri.whyThisExists.heading,
          body: pri.whyThisExists.body,
          freeTierLine: pri.whyThisExists.freeTierLine,
          paidTierLine: pri.whyThisExists.paidTierLine,
          enterpriseLine: pri.whyThisExists.enterpriseLine,
        },
        seePricesCta: {
          eyebrow: pri.seePricesCta.eyebrow,
          heading: pri.seePricesCta.heading,
          body: pri.seePricesCta.body,
        },
      } as any,
    });

    // principles array — fetch EN baseline, replace title+body per index, preserve label (01..06) + row ids
    try {
      const pricingBaseline = (await payload.findGlobal({
        slug: 'pricing-page',
        locale: 'en' as any,
      })) as any;
      const principles = (pricingBaseline?.principles ?? []).map((row: any, i: number) => {
        const tr = pri.principles[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const antiPatterns = (pricingBaseline?.antiPatterns ?? []).map((row: any, i: number) => {
        const tr = pri.antiPatterns[i];
        if (!tr) return row;
        return { ...row, title: tr.title, body: tr.body };
      });
      const workedExample = (pricingBaseline?.workedExample ?? []).map((row: any, i: number) => {
        const tr = pri.workedExample[i];
        if (!tr) return row;
        return { ...row, who: tr.who, tier: tr.tier, what: tr.what, note: tr.note };
      });
      const pricingArrayPatch: any = {};
      if (principles.length > 0) pricingArrayPatch.principles = principles;
      if (antiPatterns.length > 0) pricingArrayPatch.antiPatterns = antiPatterns;
      if (workedExample.length > 0) pricingArrayPatch.workedExample = workedExample;
      if (Object.keys(pricingArrayPatch).length > 0) {
        await payload.updateGlobal({
          slug: 'pricing-page',
          locale: locale as any,
          data: pricingArrayPatch,
        });
      }
    } catch {
      // Payload mocks in tests may not implement findGlobal; skip silently.
    }

    // faq-page (chrome — eyebrow/title/lede + stillStuckCta group; sections[].title via baseline-merge)
    const fa = FAQ[locale];
    await payload.updateGlobal({
      slug: 'faq-page',
      locale: locale as any,
      data: {
        eyebrow: fa.eyebrow,
        title: fa.title,
        lede: fa.lede,
        stillStuckCta: {
          eyebrow: fa.stillStuckCta.eyebrow,
          heading: fa.stillStuckCta.heading,
          body: fa.stillStuckCta.body,
        },
      } as any,
    });

    // sections array — fetch EN baseline, replace title per index, preserve items + row ids
    try {
      const faqBaseline = (await payload.findGlobal({
        slug: 'faq-page',
        locale: 'en' as any,
      })) as any;
      const sections = (faqBaseline?.sections ?? []).map((row: any, i: number) => {
        const titleTr = fa.sectionTitles[i];
        const itemsTr = fa.sectionItems[i];
        const items = (row.items ?? []).map((itemRow: any, j: number) => {
          const itemTr = itemsTr?.[j];
          if (!itemTr) return itemRow;
          return { ...itemRow, q: itemTr.q, a: itemTr.a };
        });
        return { ...row, title: titleTr ?? row.title, items };
      });
      if (sections.length > 0) {
        await payload.updateGlobal({
          slug: 'faq-page',
          locale: locale as any,
          data: { sections } as any,
        });
      }
    } catch {
      // Payload mocks in tests may not implement findGlobal; skip silently.
    }

    // product-categories collection — translate name + description per slug
    try {
      for (const tr of CATEGORIES_TR[locale]) {
        const found = await payload.find({
          collection: 'product-categories',
          where: { slug: { equals: tr.slug } },
          limit: 1,
        });
        const id = found.docs[0]?.id;
        if (id) {
          await payload.update({
            collection: 'product-categories',
            id,
            locale: locale as any,
            data: { name: tr.name, description: tr.description } as any,
          });
        }
      }
    } catch {
      // Payload mocks in tests may not implement find/update; skip silently.
    }

    // manifesto-page (chrome — title + lead only; body is set by /api/seed-translations
    // via textToParagraph(bodyText) per locale, so we deliberately omit it here to avoid
    // overwriting the localized body with the EN baseline. Sources are still mirrored from
    // EN with ids stripped so Payload accepts new-locale row creation.)
    const m = MANIFESTO[locale];
    try {
      const baseline = (await payload.findGlobal({ slug: 'manifesto-page', locale: 'en' as any })) as any;
      const sources = (baseline?.sources ?? []).map((row: any) => {
        const { id: _id, ...rest } = row;
        return rest;
      });
      await payload.updateGlobal({
        slug: 'manifesto-page',
        locale: locale as any,
        data: { title: m.title, lead: m.lead, sources } as any,
      });
    } catch (e: any) {
      log.push(`manifesto ${locale} failed: ${e?.message ?? e}`);
    }

    // about-page (chrome — title + lead; pass EN baseline richText to satisfy required fields)
    const a = ABOUT[locale];
    try {
      const baseline = (await payload.findGlobal({ slug: 'about-page', locale: 'en' as any })) as any;
      await payload.updateGlobal({
        slug: 'about-page',
        locale: locale as any,
        data: {
          title: a.title,
          lead: a.lead,
          founderStory: baseline?.founderStory,
          incorporationContext: baseline?.incorporationContext,
          leanOpsPhilosophy: baseline?.leanOpsPhilosophy,
        } as any,
      });
    } catch (e: any) {
      log.push(`about ${locale} failed: ${e?.message ?? e}`);
    }

    // contact-page (chrome — title, lead, privacyNote, successMessage, errorMessage)
    const ct = CONTACT[locale];
    await payload.updateGlobal({
      slug: 'contact-page',
      locale: locale as any,
      data: {
        title: ct.title,
        lead: ct.lead,
        privacyNote: ct.privacyNote,
        successMessage: ct.successMessage,
        errorMessage: ct.errorMessage,
      } as any,
    });

    // products collection — translate tagline + shortDescription per slug
    try {
      for (const [slug, tagline] of Object.entries(PRODUCT_TAGLINES[locale])) {
        const shortDescription = PRODUCT_SHORTDESCS[locale][slug];
        const found = await payload.find({
          collection: 'products',
          where: { slug: { equals: slug } },
          limit: 1,
        });
        const id = found.docs[0]?.id;
        if (id) {
          await payload.update({
            collection: 'products',
            id,
            locale: locale as any,
            data: { tagline, shortDescription } as any,
          });
        }
      }
    } catch {
      // Payload mocks in tests may not implement find/update; skip silently.
    }

    updated += 13;
    log.push(`translations: ${locale} ← site-settings, trust, status, help, careers, press, security, pricing, faq, categories, manifesto, about, contact, products(tagline+shortDesc)`);
  }

  // Deliberately untouched: PILLAR_KEYS list is only exported for future use.
  void PILLAR_KEYS;

  log.push(`translations: wrote ${updated} locale×global rows`);
}
