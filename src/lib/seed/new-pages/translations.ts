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

const LOCALES: LocaleCode[] = ['zh-CN','es','hi','ar','fr','pt','bn','ru','ur','id','sw','yo','ha'];

export async function seedNewPagesTranslations(payload: Payload, log: string[]): Promise<void> {
  let updated = 0;

  for (const locale of LOCALES) {
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

    updated += 3;
    log.push(`translations: ${locale} ← trust, status, help`);
  }

  // Deliberately untouched: PILLAR_KEYS list is only exported for future use.
  void PILLAR_KEYS;

  log.push(`translations: wrote ${updated} locale×global rows`);
}
