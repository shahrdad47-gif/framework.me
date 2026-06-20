export type Locale = 'fa' | 'hy' | 'pt' | 'ar'

export interface LangT {
  dir: 'ltr' | 'rtl'
  nav: {
    about: string; articles: string; nations: string; endTimes: string
    geopolitics: string; resources: string; authors: string
    contactUs: string; donate: string
  }
  footer: {
    brand: string; navigate: string; resources: string; connect: string
    videoTeachings: string; books: string; articlesByNation: string
    notes: string; shorts: string; support: string; copyright: string
  }
  hero: { eyebrow: string; title: string; sub: string; cta: string; youtube: string }
  scripture: { verse: string; ref: string }
  about: {
    heading: string; body1: string; body2: string; body3: string
    missionTitle: string; missionBody: string; focusTitle: string; focusBody: string
  }
  sections: {
    comingSoon: string; getNotified: string; backToHome: string
    resources: {
      eyebrow: string; title: string; sub: string; badge: string
      cards: Array<{ title: string; desc: string; cta: string }>
    }
    nations: { title: string; desc: string }
    endTimes: { title: string; desc: string }
    geopolitics: { title: string; desc: string }
    articles: { title: string; sub: string; selectNation: string; back: string }
    authors: { title: string; sub: string; comingSoon: string }
    videoTeachings: {
      eyebrow: string; title: string; sub: string; back: string
      video: string; videos: string
      searchPlaceholder?: string
      searchHints?: string[]
      categories: Record<string, { label: string; desc: string }>
    }
    books: { title: string; sub: string; viewBook: string; comingSoon: string; back: string; by: string }
    notes: { title: string; sub: string; comingSoon: string; back: string }
    shorts: { title: string; sub: string; back: string }
    series: { title: string; sub: string; back: string }
  }
  framework: {
    heading: string; lead: string; sub: string
    expressions: Array<{ num: string; title: string; sub: string; body: string }>
  }
  give: {
    eyebrow: string; title: string; desc: string
    reason1Title: string; reason1Body: string
    reason2Title: string; reason2Body: string
    reason3Title: string; reason3Body: string
    monthlyTitle: string; monthlyDesc: string
    giveCTA: string; secure: string; questions: string
  }
}

export const translations: Record<Locale, LangT> = {

  /* ── FARSI ── */
  fa: {
    dir: 'rtl',
    nav: {
      about: 'درباره', articles: 'مقالات', nations: 'ملت‌ها و نبوت',
      endTimes: 'آخرالزمان', geopolitics: 'ژئوپلیتیک', resources: 'منابع',
      authors: 'نویسندگان', contactUs: 'تماس با ما', donate: 'کمک مالی',
    },
    footer: {
      brand: 'یک کتابخانه رایگان آموزش و منابع برای آماده کردن کلیسای جهانی برای بازگشت مسیح.',
      navigate: 'ناوبری', resources: 'منابع', connect: 'ارتباط',
      videoTeachings: 'تعالیم ویدیویی', books: 'کتاب‌ها',
      articlesByNation: 'مقالات بر اساس ملت', notes: 'یادداشت‌ها',
      shorts: 'کلیپ‌های ۱ دقیقه‌ای', support: 'حمایت از کار ما',
      copyright: '© ۲۰۲۴ Framework:ME. تمامی حقوق محفوظ است. · آزاد برای اشتراک‌گذاری.',
    },
    hero: {
      eyebrow: 'خوش آمدید به Framework:ME',
      title: 'درک طرح خداوند برای اسماعیل',
      sub: 'کتابخانه‌ای رایگان برای آموزش و منابع متمرکز بر اهداف خداوند برای ملت‌ها — با تمرکز بر اسرائیل و خاورمیانه',
      cta: 'کشف منابع', youtube: 'کانال یوتیوب',
    },
    scripture: {
      verse: '«از من بخواه تا ملت‌ها را به ارث به تو بدهم، و انتهای زمین را به تصرف تو درآورم.»',
      ref: 'مزمور ۲:۸',
    },
    about: {
      heading: 'ما که هستیم',
      body1: 'Framework:ME یک کتابخانه رایگان برای آموزش و منابع است که بر درک طرح خداوند برای ملت‌ها متمرکز است — به‌ویژه بر اسرائیل و خاورمیانه. کلام ابدی و معتبر خداوند، خط داستانی رستگاری تاریخ بشری را که با بازگشت مسیح به اوج می‌رسد، بیان می‌کند.',
      body2: 'هدف ما آماده کردن کلیسای جهانی و ملت‌ها برای بازگشت مسیح است. این از طریق مطالعه کتاب مقدس درباره آنچه در کلیسای جهانی و ملت‌ها اتفاق خواهد افتاد انجام می‌شود و رویدادهای جاری از طریق عدسی کلام نبوی خداوند تفسیر می‌شوند.',
      body3: 'شما را تشویق می‌کنیم که آموزش‌ها و تفسیرهای ما را با کلام خداوند مقایسه کنید تا در آنچه باور دارید اطمینان داشته باشید.',
      missionTitle: 'ماموریت ما',
      missionBody: 'آماده کردن کلیسای جهانی و ملت‌ها برای بازگشت مسیح از طریق روشن‌سازی طرح رستگاری خداوند از طریق کتاب مقدس.',
      focusTitle: 'تمرکز ما',
      focusBody: 'اسرائیل، خاورمیانه، و همگرایی جنبش‌های نبوی که تاریخ را به اوج تعیین‌شده‌اش می‌رساند.',
    },
    framework: {
      heading: 'چارچوب درک ما',
      lead: 'اداره خداوند برای اعصار این است که همه چیز را در مسیح عیسی جمع کند — بهشت و زمین را دوباره به هم متصل کند.',
      sub: 'ما معتقدیم که این ۵ بیان کلیدی از دل خداوند، به هم خواهند پیوست تا تاریخ رستگاری را به اوج شکوهمند خود برسانند.',
      expressions: [
        { num: '۰۱', title: 'کلیسا', sub: 'آماده‌سازی عروس مسیح', body: 'خداوند کلیسای جهانی‌اش را کامل می‌کند — عروسی را برپا می‌کند که دلباخته، مقدس و آماده بازگشت پادشاه است.' },
        { num: '۰۲', title: 'اسرائیل', sub: 'عهد خداوند', body: 'عهدهای غیرقابل‌فسخ خداوند با اسرائیل — از درخت انجیر جوانه‌زننده تا نبوت آخرالزمان، اسرائیل در محور تمام تاریخ نبوی قرار دارد.' },
        { num: '۰۳', title: 'ماموریت', sub: 'تکمیل ماموریت بزرگ', body: 'انجیل باید برای هر قبیله، زبان و ملتی اعلام شود — به‌ویژه برای مردمان دست‌نرسیده خاورمیانه.' },
        { num: '۰۴', title: 'آخرالزمان', sub: 'داوری ملت‌ها', body: 'کتاب مقدس طرح خداوند را برای ملت‌ها در روزهای آخر آشکار می‌کند — لرزش بزرگ و تجدید آرایش در مسیر پایان تاریخ.' },
        { num: '۰۵', title: 'خانه دعا', sub: 'بنا کردن مکان سکونت خداوند', body: 'خداوند خانه‌های دعا شبانه‌روزی را در سراسر ملت‌ها برپا می‌کند — بنیادی که برداشت جهانی را نگه می‌دارد.' },
      ],
    },
    give: {
      eyebrow: 'همکاری با ما', title: 'از کار Framework:ME حمایت کنید',
      desc: 'Framework:ME یک کتابخانه رایگان آموزش و منابع برای کلیسای جهانی است. هر مقاله، آموزش و منبع به خاطر سخاوت افرادی که به این ماموریت ایمان دارند رایگان است.',
      reason1Title: 'منابع کتاب مقدسی رایگان', reason1Body: 'مقالات آموزشی، تعالیم ویدیویی و یادداشت‌های مطالعاتی بدون هیچ هزینه‌ای',
      reason2Title: 'رسیدن به ملت‌ها', reason2Body: 'آماده کردن کلیسای جهانی برای بازگشت مسیح',
      reason3Title: 'شفاعت و دعا', reason3Body: 'حمایت دعا برای اسرائیل، خاورمیانه و ملت‌ها',
      monthlyTitle: 'حمایت ماهانه', monthlyDesc: 'به عنوان شریک ماهانه بپیوندید و به تداوم این خدمت کمک کنید.',
      giveCTA: 'کمک ماهانه', secure: 'پرداخت امن از طریق Zeffy — ۱۰۰٪ برای خدمت',
      questions: 'سوالی دارید؟',
    },
    sections: {
      comingSoon: 'به زودی', getNotified: 'اطلاع‌رسانی', backToHome: '← صفحه اصلی',
      resources: {
        eyebrow: 'رایگان و در دسترس همه', title: 'منابع تعلیمی کتاب مقدس',
        sub: 'کتابخانه‌ای از تعالیم، مقالات، کتاب‌ها و یادداشت‌ها — در دسترس همه برای آماده کردن کلیسای جهانی برای بازگشت مسیح.',
        badge: 'تعالیم در اسرائیل، خاورمیانه و ملت‌ها',
        cards: [
          { title: 'تعالیم ویدیویی', desc: 'تعالیمی از کانال یوتیوب Framework:ME در ۷ موضوع کتاب مقدسی — خانه دعا، آخرالزمان، اسرائیل، ماموریت، عروس مسیح، زندگی مسیحی و الهیات.', cta: 'مشاهده تعالیم' },
          { title: 'سری‌ها', desc: 'با تماشای یک سری کامل، موضوعات مختلف کتاب مقدسی را به‌طور عمیق بررسی کنید.', cta: 'مشاهده سری‌ها' },
          { title: 'کتاب‌ها', desc: 'کتاب‌های مسیحی توصیه شده برای عمیق‌تر کردن درک شما از طرح خداوند برای ملت‌ها — نبوت، اسرائیل و ماموریت.', cta: 'مشاهده کتاب‌ها' },
          { title: 'مقالات بر اساس ملت', desc: 'مقالاتی درباره اهداف رستگاری‌بخش خداوند برای ملت‌های خاص — از اسرائیل تا خاورمیانه و فراتر از آن.', cta: 'مشاهده مقالات' },
          { title: 'یادداشت‌ها', desc: 'یادداشت‌های مطالعاتی و طرح‌های موعظه قابل دانلود برای مطالعه شخصی و گروهی.', cta: 'مشاهده یادداشت‌ها' },
          { title: 'کلیپ‌های ۱ دقیقه‌ای', desc: 'تعالیم کوتاه یک دقیقه‌ای برای تشویق روزانه و بینش کتاب مقدسی.', cta: 'مشاهده کلیپ‌ها' },
        ],
      },
      nations: { title: 'ملت‌ها و نبوت', desc: 'نبوت کتاب مقدسی و اهداف رستگاری‌بخش خداوند برای ملت‌های خاورمیانه و فراتر از آن.' },
      endTimes: { title: 'آخرالزمان', desc: 'آموزش‌ها و منابعی درباره آخرالزمان‌شناسی کتاب مقدسی — درک نشانه‌ها، فصول و همسویی ملت‌ها در روزهای آخر.' },
      geopolitics: { title: 'ژئوپلیتیک', desc: 'تحلیل‌ها و نظرات ژئوپلیتیکی تفسیر شده از طریق عدسی کلام مقدس و نبوت کتاب مقدسی.' },
      articles: { title: 'مقالات بر اساس ملت', sub: 'یک پرچم ملت را انتخاب کنید تا مقالات و تفسیرهایی درباره اهداف خداوند برای آن ملت بخوانید.', selectNation: 'انتخاب ملت', back: '← همه منابع' },
      authors: { title: 'نویسندگان', sub: 'صداها و معلمان پشت Framework:ME', comingSoon: 'پروفایل‌های نویسندگان به زودی در دسترس خواهند بود.' },
      videoTeachings: {
        eyebrow: 'منابع رایگان', title: 'تعالیم ویدیویی', sub: 'تعالیمی از کانال یوتیوب Framework:ME در موضوعات کتاب مقدسی.', back: '← همه منابع',
        video: 'ویدیو', videos: 'ویدیو',
        searchPlaceholder: 'جستجو بر اساس کلیدواژه، موضوع یا سخنران…',
        searchHints: ['اسرائیل', 'آخرالزمان', 'الهیات', 'دعا'],
        categories: {
          'house-of-prayer':      { label: 'خانه دعا',             desc: 'شفاعت شبانه‌روزی برای ملت‌های خاورمیانه و بازگشت مسیح.' },
          'end-times':            { label: 'آخرالزمان',             desc: 'نبوت کتاب مقدسی و طرح در حال تکامل خداوند برای ملت‌ها در روزهای آخر.' },
          'israel':               { label: 'اسرائیل',               desc: 'اهداف عهدی خداوند برای قوم یهود، سرزمین و نبوت آخرالزمان.' },
          'bride-of-christ':      { label: 'عروس مسیح',             desc: 'کلیسای جهانی آماده، پاک شده و مهیا شده برای بازگشت عیسی.' },
          'missions-middle-east': { label: 'ماموریت در خاورمیانه', desc: 'رساندن انجیل مسیح به مردمان دست‌نرسیده جهان مسلمان.' },
          'christian-living':     { label: 'زندگی مسیحی',           desc: 'آموزش عملی برای پیروی از مسیح در زندگی روزمره.' },
          'theology':             { label: 'الهیات',                 desc: 'درک آموزه‌های کتاب مقدسی که ایمان و تمرین مسیحی را شکل می‌دهند.' },
        },
      },
      books: { title: 'کتاب‌ها', sub: 'مطالعه پیشنهادی برای درک عمیق‌تر طرح خداوند برای ملت‌ها و کلام نبوی.', viewBook: 'مشاهده کتاب', comingSoon: 'پیشنهادهای کتاب به زودی.', back: '← همه منابع', by: 'نوشته' },
      notes: { title: 'یادداشت‌ها', sub: 'یادداشت‌های مطالعاتی و طرح‌های موعظه قابل دانلود برای مطالعه شخصی و گروهی.', comingSoon: 'یادداشت‌های مطالعاتی به زودی.', back: '← همه منابع' },
      shorts: { title: 'کلیپ‌های ۱ دقیقه‌ای', sub: 'تعالیم سریع یک دقیقه‌ای برای تشویق روزانه و بینش کتاب مقدسی.', back: '← همه منابع' },
      series: { title: 'سری‌ها', sub: 'با تماشای سری‌های کامل آموزشی، موضوعات کتاب مقدسی را به‌طور عمیق بررسی کنید.', back: '← همه منابع' },
    },
  },

  /* ── ARMENIAN ── */
  hy: {
    dir: 'ltr',
    nav: {
      about: 'Մեր Մասին', articles: 'Հոդվածներ', nations: 'Ազգեր և Մարգարեություն',
      endTimes: 'Վերջին Ժամանակներ', geopolitics: 'Երկրաքաղաքականություն', resources: 'Ռեսուրսներ',
      authors: 'Հեղինակներ', contactUs: 'Կապ Մեզ Հետ', donate: 'Նվիրատվություն',
    },
    footer: {
      brand: 'Ուսուցման և ռեսուրսների անվճար գրադարան՝ պատրաստելու համաշխարհային Եկեղեցուն Քրիստոսի վերադարձին:',
      navigate: 'Նավարկություն', resources: 'Ռեսուրսներ', connect: 'Կապ',
      videoTeachings: 'Տեսաուսուցումներ', books: 'Գրքեր',
      articlesByNation: 'Հոդվածներ ըստ Ազգի', notes: 'Նշումներ',
      shorts: '1 Րոպե Կարճ Տեսանյութեր', support: 'Աջակցեք Մեր Գործին',
      copyright: '© 2024 Framework:ME. Բոլոր իրավունքները պաշտպանված են: · Ազատ է կիսվելու Արքայության համար:',
    },
    hero: {
      eyebrow: 'Բարի գալուստ Framework:ME',
      title: 'Հասկանալ Աստծո Ծրագիրը Ազգերի Համար Վերջին Օրերին',
      sub: 'Ուսուցման և ռեսուրսների անվճար գրադարան՝ կենտրոնացած Աստծո ծրագրի ըմբռնման վրա ազգերի համար — կենտրոնացած Իսրայելի և Մերձավոր Արևելքի վրա',
      cta: 'Ուսումնասիրել Ռեսուրսները', youtube: 'YouTube Ալիք',
    },
    scripture: {
      verse: '«Խնդրիր ինձնից, և ժողովուրդներին կկտամ Քեզ ժառանգություն, և երկրի ծայրերը՝ Քո տիրույթ»',
      ref: '— Սաղմոս 2:8',
    },
    about: {
      heading: 'Ովքեր Ենք Մենք',
      body1: 'Framework:ME-ն ուսուցման և ռեսուրսների անվճար գրադարան է, կենտրոնացած Աստծո ծրագրի ըմբռնման վրա ազգերի համար — հատկապես Իսրայելի և Մերձավոր Արևելքի: Աստծո հավերժական և հեղինակավոր Խոսքը բացահայտում է մարդկության պատմության փրկագործության պատմական գիծը, որը հասնում է իր գագաթնակետին Քրիստոսի վերադարձով:',
      body2: 'Մեր նպատակն է պատրաստել համաշխարհային Եկեղեցին և ազգերը Քրիստոսի վերադարձի համար: Դա արվում է Սուրբ Գրքի ուսումնասիրությամբ այն մասին, թե ինչ է կատարվելու համաշխարհային Եկեղեցում ու ազգերում, և ընթացիկ իրադարձությունների մեկնաբանությամբ Աստծո մարգարեական Խոսքի լույսի ներքո:',
      body3: 'Խրախուսում ենք ձեզ մեր ուսուցումները և մեկնաբանությունները համեմատել Աստծո Խոսքի հետ, որպեսզի ձեր հավատqը լինի հաստատ:',
      missionTitle: 'Մեր Առաքելությունը',
      missionBody: 'Պատրաստել համաշխարհային Եկեղեցին և ազգերը Քրիստոսի վերադարձի համար՝ Սուրբ Գրքի միջոցով լուսաբանելով Աստծո փրկագործական ծրագիրը:',
      focusTitle: 'Մեր Կենտրոնացումը',
      focusBody: 'Իսրայել, Մերձավոր Արևելք և մարգարեական շարժումների համընկնումը, որոնք տանում են պատմությունը դեպի իր կանխատեսված ավարտը:',
    },
    framework: {
      heading: 'Մեր Ըմբռնման Շրջանակը',
      lead: 'Աստծո կառավարությունը դարերի համար — ամեն ինչ հավաքել Հիսուս Քրիստոսով — կրկին միավորելով երկինքն ու երկիրը:',
      sub: 'Հավատում ենք, որ Աստծո սրտի այս 5 հիմնական արտահայտությունները հասունանալու և համընկնելու են՝ փրկագործության պատմությունը տանելու դեպի իր փառավոր գագաթնակետ:',
      expressions: [
        { num: '01', title: 'Եկեղեցի', sub: 'Պատրաստել Քրիստոսի Հարսնացուն', body: 'Աստված կատարելագործում է Իր համաշխարհային Եկեղեցին — բարձրացնելով Հարսնացուի, ով սիրահարված է, սուրբ ու պատրաստ Թագավորի վերադարձի:' },
        { num: '02', title: 'Իսրայել', sub: 'Աստծո Ուխտը', body: 'Աստծո անփոփոխ ուխտերը Իսրայելի հետ — թզենու ծլարձակումից մինչև վերջին ժամանակների մարգարեություն, Իսրայելն ամբողջ մարգարեական պատմության առանցքում:' },
        { num: '03', title: 'Առաքելություն', sub: 'Կատարել Մեծ Հանձնարարությունը', body: 'Ավետարանը պետք է հռչակվի ամեն ցեղի, ազգի ու ժողովրդի — հատկապես Մերձավոր Արևելքի անհասանելի ժողովուրդների:' },
                { num: '04', title: 'Վերջին Ժամանակներ', sub: 'Ազգերի Դատաստան', body: 'Սուրբ Գիրքը բացահայտում ե Աստված ծրագիրը ազգների համար վերջին որերին — մեծ ցնցում ու վերադասավորում, երբ պատմությունն ընցնում ե դեպի իր կանխատեսված ավարտ:' },
        { num: '05', title: 'Աղոթքի Տուն', sub: 'Հաստատել Աստված Բնակավայրը', body: 'Աստված բարձրացնում ե 24/7 աղոթքի տուներ ազգներում — բարեխոսության հիմքներն, որն կպաշեցնելօվ ե համաշխարհային բերք:' },
      ],
    },
    give: {
      eyebrow: 'Գործընկերություն Մեզմով', title: 'Աջջակծություն Տարեք Framework:ME-ի Գործին',
      desc: 'Framework:ME-ն ուսուծման եվ ռեսուրսների անվճար գրադարան ե համաշխարհային Եկեղեցիի համար. Ամենային հոդվածդ, ուսուծմներ եվ Ռեսուրսներ անվճար ե.',
      reason1Title: 'Անվճար Կրոնական Ռեսուրսներ', reason1Body: 'ուսուծական հոդվածներ, Տեսաուսուծմներ եվ Նշումներ',
      reason2Title: 'Հասնել ազգներին', reason2Body: 'Պատրաստել համաշխարհային Եկեղեցիին Կրիստոսի վերադարծու համար',
      reason3Title: 'Բարեխոսություն եվ Աղոթք', reason3Body: 'աղոթքային աջջակծություն Իսրայելի, Մերձավոր Արեվելքքի եվ ազգների համար',
      monthlyTitle: 'Ամսակային Աջջակծություն', monthlyDesc: 'Միածեք որպես Ամսակային գործունկոր եվ ոկնեծեք այս ծարայությունն.',
      giveCTA: 'Ամսակային նվիրատվություն', secure: 'Անպատուհար նվիրատվություն Zeffy-ի միջոցյությամբ — 100% գնոմ ե ծարայությունին',
      questions: 'Հարծումներ?',
    },
    sections: {
      comingSoon: 'Շուտով', getNotified: 'Ձանուճել', backToHome: '← Գլխավոր Եջ',
      resources: {
        eyebrow: 'Անվճար եվ Բոլորի Համար', title: 'Կրոնական ուսուծման Ռեսուրսներ',
        sub: 'Աճկածող Ռեսուրսների գրադարան — անվճար հասանելի համաշխարհային Եկեղեցիին Կրիստոսի վերադարծու համար.',
        badge: 'ուսուծմներ Իսրայելի, Մերձավոր Արեվելքքի եվ ազգների մասին',
        cards: [
          { title: 'Տեսաուսուծմներ', desc: 'Տեսաուսուծմներ Framework:ME YouTube ալիքի 7 բաժմնական նյութներօվ.', cta: 'ուսուծմասիրել' },
          { title: 'Շարքեր', desc: 'Խոր ուսումնասիրեք տարբեր կրոնական թեմաներ՝ դիտելով ամբողջական ուսուծան շարքեր:', cta: 'Ուսումնասիրել Շարքեր' },
          { title: 'Գրքեր', desc: 'Անվճարաբանուծումներ կրոնական գրքերի գրադարան.', cta: 'ուսուծմասիրել Գրքեր' },
          { title: 'Հոդվածներ յստ Ազգի', desc: 'Հոդվածներ Աստվածո փռկագործական նպատակների մասին.', cta: 'ուսուծմասիրել Հոդվածներ' },
          { title: 'Նշումներ', desc: 'Ներբեռնելի ուսուծական Նշումներ.', cta: 'ուսուծմասիրել Նշումներ' },
          { title: '1 Ռոպե կարճ տեսանյութեր', desc: '1 րոպե ուսուծմներ ամենորյա խրախրածումն.', cta: 'ուսուծմասիրել' },
        ],
      },
      nations: { title: 'ազգներ եվ Մարգարեություն', desc: 'Աստվածո կրոնական մարգարեություն եվ փռկագործական նպատակներն Մերձավոր Արեվելքքի ազգների համար.' },
      endTimes: { title: 'Վերջին Ժամանակներ', desc: 'ուսուծմներ եվ Ռեսուրսներ կրոնական եսքատոլոգիայի — հասկանալ նշաններն եվ ազգների դասավորումն վերջին որերին.' },
      geopolitics: { title: 'Երկրաքաղաքականություն', desc: 'երկրաքաղաքական վերլուծում եվ մեկնաբանություններ Աստվածո Բանի լույսի նեռքո.' },
      articles: { title: 'Հոդվածներ յստ Ազգի', sub: 'Ենտրել ազգի դրոշակն Աստվածո նպատակների մասին Հոդվածներ կարդալու.', selectNation: 'Ենտրել Ազգ', back: '← Բոլոր Ռեսուրսներ' },
      authors: { title: 'Հեղինակներ', sub: 'Դզայներն եվ ուսուծիճներն Framework:ME-ի ըտեռեվ', comingSoon: 'Հեղինակների պրոֆիլներն Շուտով.' },
      videoTeachings: {
        eyebrow: 'Անվճար Ռեսուրսներ', title: 'Տեսաուսուծմներ', sub: 'Տեսաուսուծմներ Framework:ME YouTube ալիքի.', back: '← Բոլոր Ռեսուրսներ',
        video: 'տեսանյութ', videos: 'տեսանյութ',
        searchPlaceholder: 'Որոնել ըստ բառ, թեմա կամ բանախոս…',
        searchHints: ['Իսրայել', 'Վերջին Ժամանակներ', 'Աստվածաբանություն', 'Աղոթք'],
        categories: {
          'house-of-prayer':      { label: 'Աղոթքի Տուն', desc: 'շուրջորյական բարեխոսություն Մերձավոր Արեվելքքի ազգների եվ Կրիստոսի վերադարծու համար.' },
          'end-times':            { label: 'Վերջին Ժամանակներ',  desc: 'կրոնական մարգարեություն եվ Աստվածո ծրագիրն ազգների համար վերջին որերին.' },
          'israel':               { label: 'Իսրայել', desc: 'Աստվածո ուխտային նպատակներն հրեական ժողովրդի, երկրի եվ վերջին ժամանակների մարգարեություն.' },
          'bride-of-christ':      { label: 'Կրիստոսի Հարսնածու', desc: 'համաշխարհային Եկեղեցիին պատրաստված եվ հանդնված Իսուսի վերադարծու համար.' },
          'missions-middle-east': { label: 'Առաքելություն Մերձավոր Արեվելքում', desc: 'Ավետարանն հասծնել Մերձավոր Արեվելքքի անհասանելի ժողովրդներին.' },
          'christian-living':     { label: 'Կրիստոնեական Կյանք',  desc: 'գորնավոր ուսուծում Կրիստոսին հետեվորդելու համար.' },
          'theology':             { label: 'Աստվածաբանություն',  desc: 'կրոնական վարդապետական ուսուծումների հասկանում.' },
        },
      },
      books: { title: 'Գրքեր', sub: 'Անվճարաբանուծումներ կարդալու համար.', viewBook: 'Տեսնել Գիրքն', comingSoon: 'Գրքեր շուտով.', back: '← Բոլոր Ռեսուրսներ', by: 'հեղինակ' },
      notes: { title: 'Նշումներ', sub: 'Ներբեռնելի ուսուծական Նշումներ.', comingSoon: 'Նշումներ Շուտով.', back: '← Բոլոր Ռեսուրսներ' },
      shorts: { title: '1 Ռոպե կարճ տեսանյութեր', sub: '1 րոպե ուսուծմներ ամենորյա խրախրածումն.', back: '← Բոլոր Ռեսուրսներ' },
      series: { title: 'Շարքեր', sub: 'Խոր ուսումնասիրեք կրոնական թեմաները ամբողջական ուսուծան շարքերով:', back: '← Բոլոր Ռեսուրսներ' },
    },
  },

  /* ── PORTUGUESE ── */
  pt: {
    dir: 'ltr',
    nav: {
      about: 'Sobre', articles: 'Artigos', nations: 'Nações e Profecia',
      endTimes: 'Tempos do Fim', geopolitics: 'Geopolítica', resources: 'Recursos',
      authors: 'Autores', contactUs: 'Contato', donate: 'Doação',
    },
    footer: {
      brand: 'Uma biblioteca gratuita de ensino e recursos preparando a Igreja global para o retorno de Cristo.',
      navigate: 'Navegar', resources: 'Recursos', connect: 'Contato',
      videoTeachings: 'Ensinamentos em Vídeo', books: 'Livros',
      articlesByNation: 'Artigos por Nação', notes: 'Notas',
      shorts: 'Curtos de 1 Minuto', support: 'Apoie Nossa Obra',
      copyright: '© 2024 Framework:ME. Todos os direitos reservados. · Livre para compartilhar pelo Reino.',
    },
    hero: {
      eyebrow: 'Bem-vindo ao Framework:ME',
      title: 'Descobrindo o Plano de Deus para Ismael',
      sub: 'Uma biblioteca gratuita de ensino e recursos focada em compreender o plano de Deus para as nações — centrada em Israel e no Oriente Médio',
      cta: 'Explorar Recursos', youtube: 'Canal no YouTube',
    },
    scripture: {
      verse: '"Pede-me e te darei os povos como herança, e os confins da terra como possessão tua."',
      ref: '— Salmos 2:8',
    },
    about: {
      heading: 'Quem Somos',
      body1: 'Framework:ME é uma biblioteca gratuita de ensino e recursos focada em compreender o plano de Deus para as nações — especialmente centrada em Israel e no Oriente Médio. A Palavra eterna e autoritativa de Deus revela a linha narrativa da redenção da história humana, que está chegando ao seu clímax com o retorno de Cristo.',
      body2: 'Nosso objetivo é preparar a Igreja global e as nações para o retorno de Cristo. Isso é feito estudando as Escrituras sobre o que vai acontecer na Igreja global e nas nações, e interpretando os eventos atuais através da lente da Palavra profética de Deus.',
      body3: 'Encorajamos você a levar nossos ensinamentos e comentários de volta à Palavra de Deus para que você possa ter confiança no que acredita.',
      missionTitle: 'Nossa Missão',
      missionBody: 'Preparar a Igreja global e as nações para o retorno de Cristo iluminando o plano redentor de Deus através das Escrituras.',
      focusTitle: 'Nosso Foco',
      focusBody: 'Israel, o Oriente Médio e a convergência de movimentos proféticos que estão levando a história ao seu desfecho determinado.',
    },
    framework: {
      heading: 'Nossa Estrutura de Compreensão',
      lead: 'A administração de Deus para as eras é recapitular todas as coisas em Cristo Jesus — unir o céu e a terra novamente.',
      sub: 'Acreditamos que essas 5 expressões-chave do coração de Deus amadurecerão e convergirão para levar a história redentora à sua gloriosa culminação.',
      expressions: [
        { num: '01', title: 'A Igreja', sub: 'Preparando a Noiva de Cristo', body: 'Deus está aperfeiçoando Sua Igreja global — levantando uma Noiva apaixonada, santa e pronta para o retorno do Rei.' },
        { num: '02', title: 'Israel', sub: 'A Aliança de Deus', body: 'As alianças irrevogáveis de Deus com Israel — da figueira brotando à profecia dos últimos tempos, Israel está no fulcro de toda a história profética.' },
        { num: '03', title: 'Missões', sub: 'Cumprindo a Grande Comissão', body: 'O Evangelho deve ser proclamado para toda tribo, língua e nação — particularmente para os povos não alcançados do Oriente Médio.' },
        { num: '04', title: 'Tempos do Fim', sub: 'Julgamento das Nações', body: 'As Escrituras revelam o plano de Deus para as nações nos últimos dias — um grande abalo e realinhamento enquanto a história avança para seu fim determinado.' },
        { num: '05', title: 'Casa de Oração', sub: 'Estabelecendo a Morada de Deus', body: 'Deus está levantando casas de oração 24/7 nas nações — a fundação de intercessão que sustentará a colheita global.' },
      ],
    },
    give: {
      eyebrow: 'Parceria Conosco', title: 'Apoie a Obra do Framework:ME',
      desc: 'Framework:ME é uma biblioteca gratuita de ensino e recursos para a Igreja global. Cada artigo, ensinamento e recurso está disponível gratuitamente por causa da generosidade de pessoas que acreditam nessa missão.',
      reason1Title: 'Recursos Bíblicos Gratuitos', reason1Body: 'Artigos de ensino, vídeos e notas de estudo sem custo',
      reason2Title: 'Alcançando as Nações', reason2Body: 'Preparando a Igreja global para o retorno de Cristo',
      reason3Title: 'Intercessão e Oração', reason3Body: 'Sustentando a oração por Israel, o Oriente Médio e as nações',
      monthlyTitle: 'Apoio Mensal', monthlyDesc: 'Junte-se como parceiro mensal e ajude a sustentar este ministério a longo prazo.',
      giveCTA: 'Dar Mensalmente', secure: 'Doação segura via Zeffy — 100% vai para o ministério',
      questions: 'Dúvidas?',
    },
    sections: {
      comingSoon: 'Em Breve', getNotified: 'Ser Notificado', backToHome: '← Início',
      resources: {
        eyebrow: 'Gratuito e Aberto a Todos', title: 'Recursos de Ensino Bíblico',
        sub: 'Uma biblioteca crescente de ensinamentos, artigos, livros e notas — disponível gratuitamente para preparar a Igreja global para o retorno de Cristo.',
        badge: 'Ensinamentos sobre Israel, o Oriente Médio e as Nações',
        cards: [
          { title: 'Ensinamentos em Vídeo', desc: 'Explore ensinamentos do canal Framework:ME no YouTube, organizados em 7 temas bíblicos — Casa de Oração, Tempos do Fim, Israel, Missões, Noiva de Cristo, Vida Cristã e Teologia.', cta: 'Explorar Ensinamentos' },
          { title: 'Séries', desc: 'Aprofunde-se em vários temas bíblicos assistindo a séries completas de ensinamento para uma compreensão abrangente.', cta: 'Explorar Séries' },
          { title: 'Livros', desc: 'Amplie sua compreensão do plano de Deus para as nações com nossa biblioteca de livros cristãos recomendados sobre profecia, Israel e missões.', cta: 'Explorar Livros' },
          { title: 'Artigos por Nação', desc: 'Artigos aprofundados sobre os propósitos redentores de Deus para nações específicas — de Israel ao Oriente Médio e além.', cta: 'Explorar Artigos' },
          { title: 'Notas', desc: 'Notas de estudo e esboços de sermões para download para reflexão pessoal e estudo em grupo.', cta: 'Explorar Notas' },
          { title: 'Curtos de 1 Minuto', desc: 'Ensinamentos rápidos de um minuto para encorajamento diário e discipulado em movimento.', cta: 'Explorar Curtos' },
        ],
      },
      nations: { title: 'Nações e Profecia', desc: 'Profecia bíblica e os propósitos redentores de Deus para as nações do Oriente Médio e além.' },
      endTimes: { title: 'Tempos do Fim', desc: 'Ensinos e recursos sobre escatologia bíblica — compreendendo os sinais, estações e alinhamento das nações nos últimos dias.' },
      geopolitics: { title: 'Geopolítica', desc: 'Análise geopolítica e comentários interpretados através da lente da Palavra de Deus e da profecia bíblica.' },
      articles: { title: 'Artigos por Nação', sub: 'Selecione uma bandeira de nação para ler artigos e comentários sobre os propósitos de Deus para aquela nação.', selectNation: 'Selecionar Nação', back: '← Todos os Recursos' },
      authors: { title: 'Autores', sub: 'As vozes e mestres por trás do Framework:ME', comingSoon: 'Perfis dos contribuidores em breve.' },
      videoTeachings: {
        eyebrow: 'Recursos Gratuitos', title: 'Ensinamentos em Vídeo', sub: 'Ensinamentos do canal Framework:ME no YouTube organizados por tema bíblico.', back: '← Todos os Recursos',
        video: 'vídeo', videos: 'vídeos',
        searchPlaceholder: 'Pesquisar por palavra-chave, tema ou palestrante…',
        searchHints: ['Israel', 'Tempos do Fim', 'Teologia', 'Oração'],
        categories: {
          'house-of-prayer':      { label: 'Casa de Oração',             desc: 'Intercessão dia e noite pelas nações do Oriente Médio e o retorno de Cristo.' },
          'end-times':            { label: 'Tempos do Fim',               desc: 'Profecia bíblica e o plano de Deus para as nações nos últimos dias.' },
          'israel':               { label: 'Israel',                      desc: 'Os propósitos de aliança de Deus para o povo judeu, a terra e a profecia do fim dos tempos.' },
          'bride-of-christ':      { label: 'Noiva de Cristo',             desc: 'A Igreja global preparada, purificada e pronta para o retorno de Jesus.' },
          'missions-middle-east': { label: 'Missões no Oriente Médio',    desc: 'Alcançando os povos não evangelizados do mundo muçulmano com o Evangelho.' },
          'christian-living':     { label: 'Vida Cristã',                 desc: 'Ensino prático para seguir a Cristo na vida cotidiana.' },
          'theology':             { label: 'Teologia',                    desc: 'Compreendendo as doutrinas bíblicas que moldam a fé e a prática cristã.' },
        },
      },
      books: { title: 'Livros', sub: 'Leitura recomendada para o estudo mais profundo do plano de Deus para as nações.', viewBook: 'Ver Livro', comingSoon: 'Recomendações de livros em breve.', back: '← Todos os Recursos', by: 'por' },
      notes: { title: 'Notas', sub: 'Notas de estudo e esboços de sermões para download para reflexão pessoal e em grupo.', comingSoon: 'Notas de estudo em breve.', back: '← Todos os Recursos' },
      shorts: { title: 'Curtos de 1 Minuto', sub: 'Ensinamentos rápidos de um minuto para encorajamento diário.', back: '← Todos os Recursos' },
      series: { title: 'Séries', sub: 'Aprofunde-se em temas bíblicos com séries completas de ensinamento para uma compreensão abrangente.', back: '← Todos os Recursos' },
    },
  },

  /* ── ARABIC ── */
  ar: {
    dir: 'rtl',
    nav: {
      about: 'نبذة عنا', articles: 'المقالات', nations: 'الأمم والنبوة',
      endTimes: 'الأزمنة الأخيرة', geopolitics: 'الجيوسياسة', resources: 'الموارد',
      authors: 'المؤلفون', contactUs: 'اتصل بنا', donate: 'تبرع',
    },
    footer: {
      brand: 'مكتبة تعليمية ومواردية مجانية لإعداد الكنيسة العالمية لعودة المسيح.',
      navigate: 'التنقل', resources: 'الموارد', connect: 'التواصل',
      videoTeachings: 'تعاليم مرئية', books: 'الكتب',
      articlesByNation: 'مقالات حسب الأمة', notes: 'الملاحظات',
      shorts: 'مقاطع دقيقة', support: 'ادعم عملنا',
      copyright: '© 2024 Framework:ME. جميع الحقوق محفوظة. · حر للمشاركة من أجل الملكوت.',
    },
    hero: {
      eyebrow: 'مرحباً بكم في Framework:ME',
      title: 'اكتشاف خطة الله لإسماعيل',
      sub: 'مكتبة تعليمية ومواردية مجانية تركّز على فهم خطة الله للأمم — محورها إسرائيل والشرق الأوسط',
      cta: 'استكشف الموارد', youtube: 'قناة يوتيوب',
    },
    scripture: {
      verse: '«سلني فأعطيكَ الأمم ميراثاً، وأقاصي الأرض ملكاً لك.»',
      ref: '— مزمور ٢:٨',
    },
    about: {
      heading: 'من نحن',
      body1: 'Framework:ME مكتبة تعليمية ومواردية مجانية تركّز على فهم خطة الله للأمم — لا سيّما إسرائيل والشرق الأوسط. كلمة الله الأبدية والسلطانية تكشف الخط القصصي للخلاص في تاريخ البشرية الذي يبلغ ذروته بعودة المسيح.',
      body2: 'هدفنا إعداد الكنيسة العالمية والأمم لعودة المسيح. يتم ذلك بدراسة الكتاب المقدس فيما سيجري في الكنيسة العالمية والأمم، وتفسير الأحداث الراهنة من خلال منظور كلمة الله النبوية.',
      body3: 'نشجّعكم على أخذ تعاليمنا وتعليقاتنا إلى كلمة الله لتثقوا بما تؤمنون به.',
      missionTitle: 'مهمتنا',
      missionBody: 'إعداد الكنيسة العالمية والأمم لعودة المسيح من خلال إضاءة خطة الله الفدائية عبر الكتاب المقدس.',
      focusTitle: 'تركيزنا',
      focusBody: 'إسرائيل والشرق الأوسط وتقاطع الحركات النبوية التي تقود التاريخ نحو خاتمته المقدّرة.',
    },
    framework: {
      heading: 'إطار فهمنا',
      lead: 'تدبير الله للأجيال هو أن يجمع كل شيء في المسيح يسوع — أن يوحّد السماء والأرض من جديد.',
      sub: 'نؤمن أن هذه التعبيرات الخمسة الرئيسية من قلب الله ستنضج وتتقاطع لتقود تاريخ الخلاص إلى ذروته المجيدة.',
      expressions: [
        { num: '٠١', title: 'الكنيسة', sub: 'إعداد عروس المسيح', body: 'الله يُكمّل كنيسته العالمية — يُقيم عروساً مشتاقة، مقدّسة ومستعدة لعودة الملك.' },
        { num: '٠٢', title: 'إسرائيل', sub: 'عهد الله', body: 'المواثيق الثابتة لله مع إسرائيل — من شجرة التين المورقة إلى نبوة الأزمنة الأخيرة، إسرائيل في محور كل التاريخ النبوي.' },
        { num: '٠٣', title: 'التبشير', sub: 'إتمام الوصية العظمى', body: 'يجب إعلان الإنجيل لكل قبيلة ولسان وأمة — لا سيّما للشعوب غير المبشَّر بها في الشرق الأوسط.' },
        { num: '٠٤', title: 'الأزمنة الأخيرة', sub: 'دينونة الأمم', body: 'تكشف الكتب المقدسة خطة الله للأمم في الأيام الأخيرة — هزة عظيمة وإعادة توازن بينما يتجه التاريخ نحو نهايته.' },
        { num: '٠٥', title: 'بيت الصلاة', sub: 'إقامة مسكن الله', body: 'الله يُقيم بيوت صلاة على مدار الساعة في الأمم — أساس الشفاعة الذي يُديم الحصاد العالمي.' },
      ],
    },
    give: {
      eyebrow: 'شاركنا', title: 'ادعم عمل Framework:ME',
      desc: 'Framework:ME مكتبة تعليمية ومواردية مجانية للكنيسة العالمية. كل مقال وتعليم ومورد متاح مجاناً بفضل كرم أشخاص يؤمنون بهذه الرسالة.',
      reason1Title: 'موارد كتابية مجانية', reason1Body: 'مقالات تعليمية وتعاليم مرئية وملاحظات دراسية بلا تكلفة',
      reason2Title: 'الوصول إلى الأمم', reason2Body: 'إعداد الكنيسة العالمية لعودة المسيح',
      reason3Title: 'الشفاعة والصلاة', reason3Body: 'دعم الصلاة من أجل إسرائيل والشرق الأوسط والأمم',
      monthlyTitle: 'الدعم الشهري', monthlyDesc: 'انضم كشريك شهري وساعد على استدامة هذه الخدمة على المدى البعيد.',
      giveCTA: 'تبرّع شهرياً', secure: 'تبرع آمن عبر Zeffy — 100٪ تذهب للخدمة',
      questions: 'أسئلة؟',
    },
    sections: {
      comingSoon: 'قريباً', getNotified: 'أعلمني', backToHome: '← الصفحة الرئيسية',
      resources: {
        eyebrow: 'مجاني ومفتوح للجميع', title: 'موارد التعليم الكتابي',
        sub: 'مكتبة متنامية من التعاليم والمقالات والكتب والملاحظات — متاحة مجاناً لإعداد الكنيسة العالمية لعودة المسيح.',
        badge: 'تعاليم حول إسرائيل والشرق الأوسط والأمم',
        cards: [
          { title: 'تعاليم مرئية', desc: 'استكشف تعاليم من قناة Framework:ME على يوتيوب، منظّمة في 7 مواضيع كتابية — بيت الصلاة، الأزمنة الأخيرة، إسرائيل، التبشير، عروس المسيح، الحياة المسيحية، واللاهوت.', cta: 'استكشف التعاليم' },
          { title: 'السلاسل', desc: 'تعمّق في مختلف المواضيع الكتابية من خلال مشاهدة سلسلة كاملة لفهم شامل ومتعمّق.', cta: 'استكشف السلاسل' },
          { title: 'الكتب', desc: 'وسّع فهمك لخطة الله للأمم مع مكتبتنا الموصى بها من الكتب المسيحية حول النبوة وإسرائيل والتبشير.', cta: 'استكشف الكتب' },
          { title: 'مقالات حسب الأمة', desc: 'مقالات متعمّقة حول أغراض الله الفدائية لأمم محددة — من إسرائيل إلى الشرق الأوسط وما وراءه.', cta: 'استكشف المقالات' },
          { title: 'الملاحظات', desc: 'ملاحظات دراسية وخطط موعظة قابلة للتنزيل للتأمل الشخصي ودراسة المجموعات الصغيرة.', cta: 'استكشف الملاحظات' },
          { title: 'مقاطع دقيقة', desc: 'تعاليم سريعة مدتها دقيقة واحدة للتشجيع اليومي والبصيرة الكتابية.', cta: 'استكشف المقاطع' },
        ],
      },
      nations: { title: 'الأمم والنبوة', desc: 'النبوة الكتابية وأغراض الله الفدائية لأمم الشرق الأوسط وما وراءها.' },
      endTimes: { title: 'الأزمنة الأخيرة', desc: 'تعاليم وموارد حول الإسكاتولوجيا الكتابية — فهم العلامات والمواسم وتوافق الأمم في الأيام الأخيرة.' },
      geopolitics: { title: 'الجيوسياسة', desc: 'التحليل الجيوسياسي والتعليق المُفسَّر من خلال منظور الكلمة النبوية وكتاب مقدس.' },
      articles: { title: 'مقالات حسب الأمة', sub: 'اختر علم أمة لقراءة مقالات وتعليقات حول أغراض الله لتلك الأمة.', selectNation: 'اختر أمة', back: '← جميع الموارد' },
      authors: { title: 'المؤلفون', sub: 'الأصوات والمعلمون وراء Framework:ME', comingSoon: 'ملفات تعريف المؤلفين ستتوفر قريباً.' },
      videoTeachings: {
        eyebrow: 'موارد مجانية', title: 'تعاليم مرئية', sub: 'تعاليم من قناة Framework:ME على يوتيوب منظّمة حسب الموضوع الكتابي.', back: '← جميع الموارد',
        video: 'مقطع', videos: 'مقاطع',
        searchPlaceholder: 'ابحث بالكلمة المفتاحية أو الموضوع أو المتحدث…',
        searchHints: ['إسرائيل', 'الأزمنة الأخيرة', 'اللاهوت', 'الصلاة'],
        categories: {
          'house-of-prayer':      { label: 'بيت الصلاة',                 desc: 'الشفاعة ليلاً ونهاراً من أجل أمم الشرق الأوسط وعودة المسيح.' },
          'end-times':            { label: 'الأزمنة الأخيرة',             desc: 'النبوة الكتابية وخطة الله الجارية للأمم في الأيام الأخيرة.' },
          'israel':               { label: 'إسرائيل',                     desc: 'أغراض عهد الله للشعب اليهودي والأرض ونبوة الأزمنة الأخيرة.' },
          'bride-of-christ':      { label: 'عروس المسيح',                 desc: 'الكنيسة العالمية المُعدّة المُطهَّرة والمُهيَّأة لعودة يسوع.' },
          'missions-middle-east': { label: 'التبشير في الشرق الأوسط',     desc: 'الوصول إلى الشعوب غير المبشَّر بها في العالم الإسلامي بإنجيل يسوع.' },
          'christian-living':     { label: 'الحياة المسيحية',             desc: 'تعليم عملي لاتباع المسيح في الحياة اليومية.' },
          'theology':             { label: 'اللاهوت',                     desc: 'فهم العقائد الكتابية التي تُشكّل الإيمان والممارسة المسيحية.' },
        },
      },
      books: { title: 'الكتب', sub: 'قراءات مقترحة للدراسة الأعمق لخطة الله للأمم والكلمة النبوية.', viewBook: 'عرض الكتاب', comingSoon: 'توصيات الكتب قريباً.', back: '← جميع الموارد', by: 'بقلم' },
      notes: { title: 'الملاحظات', sub: 'ملاحظات دراسية وخطط موعظة قابلة للتنزيل للتأمل الشخصي ودراسة المجموعات.', comingSoon: 'ملاحظات الدراسة قريباً.', back: '← جميع الموارد' },
      shorts: { title: 'مقاطع دقيقة', sub: 'تعاليم سريعة مدتها دقيقة واحدة للتشجيع اليومي والبصيرة الكتابية.', back: '← جميع الموارد' },
      series: { title: 'السلاسل', sub: 'تعمّق في المواضيع الكتابية من خلال سلاسل التعليم الكاملة لفهم شامل ومتعمّق.', back: '← جميع الموارد' },
    },
  },
}
