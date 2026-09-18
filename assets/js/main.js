/* ================= تبديل التبويبات ================= */
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', selected);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
  });
  tab.addEventListener('keydown', e => {
    const list = [...tabs];
    const i = list.indexOf(tab);
    const isRTL = document.documentElement.getAttribute('dir') !== 'ltr';
    const forwardKey = isRTL ? 'ArrowLeft' : 'ArrowRight';
    const backwardKey = isRTL ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === forwardKey)  list[(i + 1) % list.length].focus();
    if (e.key === backwardKey) list[(i - 1 + list.length) % list.length].focus();
  });
});

/* ================= تبديل المظهر (داكن/فاتح) ================= */
const rootEl = document.documentElement;
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
let currentTheme = prefersLight ? 'light' : 'dark';

function applyTheme(theme){
  currentTheme = theme;
  if (theme === 'light') rootEl.setAttribute('data-theme', 'light');
  else rootEl.removeAttribute('data-theme');
  document.querySelectorAll('[data-theme-icon]').forEach(el => {
    el.textContent = theme === 'light' ? '☾' : '☀';
  });
}
applyTheme(currentTheme);
document.getElementById('theme-toggle').addEventListener('click', () => {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

/* ================= تبديل اللغة (عربي/إنجليزي) ================= */
const dict = {
  'brand-main': {ar:'مزاج', en:'MAZAJ'},
  'nav-menu': {ar:'المنيو', en:'Menu'},
  'nav-about': {ar:'عن مزاج', en:'About'},
  'nav-visit': {ar:'زورونا', en:'Visit Us'},
  'cta-whatsapp': {ar:'اطلب واتساب', en:'Order on WhatsApp'},
  'hero-tagline': {ar:'قهوة مختصة · جدة', en:'Specialty Coffee · Jeddah'},
  'hero-desc': {ar:'كل فنجان له وقته. اختر مزاجك — بارد يفتح النهار، أو ساخن يطوّل الجلسة.', en:'Every cup has its moment. Choose your mood — cold to start the day, or hot to slow it down.'},
  'cta-browse-menu': {ar:'تصفّح المنيو', en:'Browse Menu'},
  'cta-find-us': {ar:'وين نلقاكم؟', en:'Find Us'},
  'ticker-hours': {ar:'نفتح يومياً <b>٧ ص — ٢ ف</b>', en:'Open Daily <b>7 AM – 2 AM</b>'},
  'ticker-roast': {ar:'حبوب محمّصة <b>كل ٣ أيام</b>', en:'Beans Roasted <b>Every 3 Days</b>'},
  'ticker-location': {ar:'حي الشاطئ · <b>جدة</b>', en:'Al Shati District · <b>Jeddah</b>'},
  'menu-title': {ar:'المنيو', en:'Menu'},
  'menu-desc': {ar:'كل المشروبات تنحضّر بحبوب مختصة من محمصتنا، والحليب يتبدّل لوز أو شوفان بدون فرق في السعر إلا ٤ ريال.', en:'All drinks are made with specialty beans from our roastery. Milk can be swapped for almond or oat for just 4 SAR more.'},
  'tab-cold': {ar:'مشروبات باردة', en:'Cold Drinks'},
  'tab-hot': {ar:'مشروبات ساخنة', en:'Hot Drinks'},
  'tab-sweet': {ar:'يروق معها', en:'Goes Well With'},
  'curr': {ar:'ر.س', en:'SAR'},

  'cold1-name': {ar:'سبانيش لاتيه بالتمر<span class="tag">الأكثر طلباً</span>', en:'Spanish Latte with Date<span class="tag">Best Seller</span>'},
  'cold1-desc': {ar:'حليب مكثف مع دبس تمر سكري ولمسة هيل.', en:'Condensed milk with date molasses and a touch of cardamom.'},
  'cold2-name': {ar:'آيس سبانيش لاتيه', en:'Iced Spanish Latte'},
  'cold2-desc': {ar:'إسبريسو مزدوج على حليب مكثف بارد.', en:'Double espresso over cold condensed milk.'},
  'cold3-name': {ar:'كولد برو', en:'Cold Brew'},
  'cold3-desc': {ar:'منقوع ١٦ ساعة — حموضة هادية وقوام ناعم.', en:'Steeped 16 hours — gentle acidity, smooth body.'},
  'cold4-name': {ar:'آيس لاتيه', en:'Iced Latte'},
  'cold4-desc': {ar:'الكلاسيكي، بحليب طازج وثلج مضغوط.', en:'The classic — fresh milk over packed ice.'},
  'cold5-name': {ar:'آيس أمريكانو', en:'Iced Americano'},
  'cold5-desc': {ar:'إسبريسو وماء بارد فقط — خفيف وصافي.', en:'Espresso and cold water only — light and clean.'},
  'cold6-name': {ar:'آيس V60', en:'Iced V60'},
  'cold6-desc': {ar:'تقطير على ثلج، من حبوب إثيوبية فاكهية.', en:'Poured over ice, from fruity Ethiopian beans.'},
  'cold7-name': {ar:'آيس ماتشا لاتيه', en:'Iced Matcha Latte'},
  'cold7-desc': {ar:'ماتشا يابانية درجة احتفالية.', en:'Ceremonial-grade Japanese matcha.'},
  'cold8-name': {ar:'موكا مثلجة', en:'Iced Mocha'},
  'cold8-desc': {ar:'شوكولاتة داكنة ٧٠٪ مع إسبريسو.', en:'70% dark chocolate with espresso.'},
  'cold9-name': {ar:'ليموناضة نعناع', en:'Mint Lemonade'},
  'cold9-desc': {ar:'ليمون طازج يُعصر عند الطلب.', en:'Fresh lemon, squeezed to order.'},
  'cold10-name': {ar:'آيس تي خوخ<span class="tag new">جديد</span>', en:'Iced Peach Tea<span class="tag new">New</span>'},
  'cold10-desc': {ar:'شاي أسود بارد مع خوخ وحبق.', en:'Cold black tea with peach and basil.'},

  'hot1-name': {ar:'قهوة عربية', en:'Arabic Coffee'},
  'hot1-desc': {ar:'تُقدّم بدلّة صغيرة مع تمرتين.', en:'Served in a small dallah with two dates.'},
  'hot2-name': {ar:'إسبريسو', en:'Espresso'},
  'hot2-desc': {ar:'شوت واحد، خلطة مزاج الداكنة.', en:'Single shot of Mazaj\u2019s dark blend.'},
  'hot3-name': {ar:'مكياتو', en:'Macchiato'},
  'hot3-desc': {ar:'إسبريسو بلمسة رغوة حليب.', en:'Espresso with a touch of milk foam.'},
  'hot4-name': {ar:'كورتادو', en:'Cortado'},
  'hot4-desc': {ar:'نصف إسبريسو ونصف حليب — متوازن.', en:'Half espresso, half milk — balanced.'},
  'hot5-name': {ar:'فلات وايت<span class="tag">الأكثر طلباً</span>', en:'Flat White<span class="tag">Best Seller</span>'},
  'hot5-desc': {ar:'قوام حريري وطعم قهوة واضح.', en:'Silky texture with a clear coffee flavor.'},
  'hot6-name': {ar:'كابتشينو', en:'Cappuccino'},
  'hot6-desc': {ar:'رغوة كثيفة ورسمة على السطح.', en:'Dense foam with latte art.'},
  'hot7-name': {ar:'لاتيه', en:'Latte'},
  'hot7-desc': {ar:'حليب أكثر، مرارة أقل.', en:'More milk, less bitterness.'},
  'hot8-name': {ar:'سبانيش لاتيه', en:'Spanish Latte'},
  'hot8-desc': {ar:'حلو ودافئ بحليب مكثف.', en:'Sweet and warm with condensed milk.'},
  'hot9-name': {ar:'في ٦٠ (تقطير)', en:'V60 (Pour Over)'},
  'hot9-desc': {ar:'اسأل الباريستا عن حبوب اليوم.', en:'Ask the barista about today\u2019s beans.'},
  'hot10-name': {ar:'أمريكانو', en:'Americano'},
  'hot10-desc': {ar:'إسبريسو مطوّل بماء ساخن.', en:'Espresso lengthened with hot water.'},
  'hot11-name': {ar:'موكا', en:'Mocha'},
  'hot11-desc': {ar:'شوكولاتة بلجيكية مع كريمة خفيفة.', en:'Belgian chocolate with light cream.'},
  'hot12-name': {ar:'ماتشا لاتيه', en:'Matcha Latte'},
  'hot12-desc': {ar:'دافئة وكريمية بدون كافيين قوي.', en:'Warm and creamy, without strong caffeine.'},
  'hot13-name': {ar:'شاي كرك', en:'Karak Tea'},
  'hot13-desc': {ar:'مغلي على الطريقة الهندية بالهيل والزعفران.', en:'Boiled Indian-style with cardamom and saffron.'},
  'hot14-name': {ar:'شاي أخضر بالنعناع', en:'Mint Green Tea'},
  'hot14-desc': {ar:'أوراق كاملة ونعناع طازج.', en:'Whole leaves with fresh mint.'},

  'sweet1-name': {ar:'تشيز كيك التمر', en:'Date Cheesecake'},
  'sweet1-desc': {ar:'قاعدة تمر وسكري وجبنة كريمية.', en:'Date and biscuit base with creamy cheese.'},
  'sweet2-name': {ar:'سان سباستيان', en:'San Sebasti\u00e1n'},
  'sweet2-desc': {ar:'محروقة من فوق، سائلة من داخل.', en:'Burnt on top, molten inside.'},
  'sweet3-name': {ar:'كوكيز شوكولاتة', en:'Chocolate Cookies'},
  'sweet3-desc': {ar:'تُخبز مرتين في اليوم.', en:'Baked twice daily.'},
  'sweet4-name': {ar:'كرواسون زعتر وجبن', en:'Za\u2019atar & Cheese Croissant'},
  'sweet4-desc': {ar:'يناسب فطور الصباح مع أمريكانو.', en:'Perfect for breakfast with an Americano.'},
  'sweet5-name': {ar:'كيكة عسل', en:'Honey Cake'},
  'sweet5-desc': {ar:'طبقات رقيقة وقشدة خفيفة.', en:'Thin layers with light cream.'},
  'sweet6-name': {ar:'تمر محشي بالمكسرات', en:'Nut-Stuffed Dates'},
  'sweet6-desc': {ar:'٦ حبات — يقدّم مع القهوة العربية.', en:'6 pieces — served with Arabic coffee.'},

  'extra1': {ar:'شوت إسبريسو إضافي <b>+٥</b>', en:'Extra Espresso Shot <b>+5</b>'},
  'extra2': {ar:'حليب لوز أو شوفان <b>+٤</b>', en:'Almond or Oat Milk <b>+4</b>'},
  'extra3': {ar:'نكهة فانيلا أو كراميل <b>+٣</b>', en:'Vanilla or Caramel Flavor <b>+3</b>'},
  'extra4': {ar:'كريمة مخفوقة <b>+٤</b>', en:'Whipped Cream <b>+4</b>'},
  'extra5': {ar:'تكبير الحجم <b>+٥</b>', en:'Size Up <b>+5</b>'},

  'feature-title': {ar:'مزاج الحجاز', en:'Hejaz Mood'},
  'feature-desc': {ar:'تركيبة البيت: إسبريسو من حبوب يمنية، حليب مكثف بدبس التمر، ورشة هيل مطحون طازج فوق الرغوة. يتقدّم بارد أو ساخن — والباريستا يوصي بالبارد بعد العصر.', en:'The house blend: espresso from Yemeni beans, condensed milk with date molasses, and a sprinkle of freshly ground cardamom on top. Served hot or cold — the barista recommends it cold in the afternoon.'},
  'feature-price': {ar:'27 <span style="font-size:.8rem;color:var(--stone-dim)">ر.س</span>', en:'27 <span style="font-size:.8rem;color:var(--stone-dim)">SAR</span>'},

  'about-title': {ar:'القهوة عندنا مزاج، مو عادة', en:'Coffee here is a mood, not a habit'},
  'about-p1': {ar:'بدأنا بمحمصة صغيرة في حي الشاطئ سنة ٢٠٢١، وفكرة واحدة: إن الفنجان الزين ما يحتاج تعقيد، يحتاج حبوب طازجة وباريستا يعرف وش يسوي.', en:'We started with a small roastery in Al Shati district back in 2021, with one idea: a great cup doesn\u2019t need complexity — it needs fresh beans and a barista who knows what they\u2019re doing.'},
  'about-p2': {ar:'نجيب حبوبنا مباشرة من مزارع في اليمن وإثيوبيا وكولومبيا، ونحمّصها على دفعات صغيرة كل ثلاثة أيام. وأي مشروب على المنيو تقدر تعدّله على مزاجك بدون حرج.', en:'We source our beans directly from farms in Yemen, Ethiopia, and Colombia, roasting in small batches every three days. Any drink on the menu can be customized to your mood — no worries at all.'},

  'fact1': {ar:'<b>٣ أيام</b><span>أقصى عمر للتحميصة قبل ما تنزل للبار</span>', en:'<b>3 Days</b><span>Maximum roast age before it hits the bar</span>'},
  'fact2': {ar:'<b>٤ مصادر</b><span>مزارع نتعامل معها بشكل مباشر</span>', en:'<b>4 Sources</b><span>Farms we work with directly</span>'},
  'fact3': {ar:'<b>١٩ ساعة</b><span>نفتح فيها يومياً بدون إجازة أسبوعية</span>', en:'<b>19 Hours</b><span>Open daily, no weekly day off</span>'},

  'visit-title': {ar:'زورونا', en:'Visit Us'},
  'visit-loc-title': {ar:'الموقع', en:'Location'},
  'visit-loc-desc': {ar:'شارع الأمير سلطان، حي الشاطئ<br>جدة، المملكة العربية السعودية', en:'Prince Sultan Street, Al Shati District<br>Jeddah, Saudi Arabia'},
  'visit-map-btn': {ar:'افتح في خرائط جوجل', en:'Open in Google Maps'},
  'visit-hours-title': {ar:'أوقات العمل', en:'Working Hours'},
  'visit-hours-desc': {ar:'السبت — الخميس: ٧ ص — ٢ ف<br>الجمعة: ١ ظ — ٢ ف', en:'Sat – Thu: 7 AM – 2 AM<br>Friday: 1 PM – 2 AM'},
  'visit-contact-title': {ar:'تواصل معنا', en:'Contact Us'},
  'visit-contact-desc': {ar:'<a href="tel:+966501234567">٠٥٠١ ٢٣٤ ٥٦٧</a><br><a href="https://instagram.com/mazaj.jed" target="_blank" rel="noopener">إنستقرام: mazaj.jed@</a>', en:'<a href="tel:+966501234567">050 123 4567</a><br><a href="https://instagram.com/mazaj.jed" target="_blank" rel="noopener">Instagram: mazaj.jed@</a>'},

  'footer-tagline': {ar:'خذ وقتك. القهوة ما تستعجل.', en:'Take your time. Coffee never rushes.'},
  'deliver1': {ar:'اطلب عبر هنقرستيشن', en:'Order via HungerStation'},
  'deliver2': {ar:'اطلب عبر جاهز', en:'Order via Jahez'},
  'deliver3': {ar:'اطلب عبر طلبات', en:'Order via Talabat'},
  'legal1': {ar:'<b>السجل التجاري:</b> 4030512987 &nbsp;·&nbsp; <b>الرقم الضريبي:</b> 300123456700003', en:'<b>Commercial Registration:</b> 4030512987 &nbsp;·&nbsp; <b>Tax Number:</b> 300123456700003'},
  'legal2': {ar:'مقهى مزاج للتجارة العامة — جدة، المملكة العربية السعودية', en:'Mazaj Cafe General Trading — Jeddah, Saudi Arabia'},
  'legal3': {ar:'الأسعار شاملة ضريبة القيمة المضافة، وقابلة للتغيير دون إشعار مسبق.', en:'Prices include VAT and are subject to change without prior notice.'},

  'aria-theme-toggle': {ar:'تبديل المظهر', en:'Toggle theme'},
  'aria-lang-toggle': {ar:'تبديل اللغة', en:'Switch language'},
  'aria-whatsapp-fab': {ar:'اطلب عبر واتساب', en:'Order via WhatsApp'},
  'aria-instagram': {ar:'إنستقرام', en:'Instagram'},
  'aria-snapchat': {ar:'سناب شات', en:'Snapchat'},
  'aria-x': {ar:'اكس', en:'X'},
  'aria-tiktok': {ar:'تيك توك', en:'TikTok'}
};

let currentLang = 'ar';

function applyLang(lang){
  currentLang = lang;
  rootEl.setAttribute('lang', lang);
  rootEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] && dict[key][lang] !== undefined) el.innerHTML = dict[key][lang];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key] && dict[key][lang] !== undefined) el.setAttribute('aria-label', dict[key][lang]);
  });

  document.getElementById('lang-toggle').textContent = lang === 'ar' ? 'EN' : 'AR';
  document.title = lang === 'ar' ? 'مزاج · قهوة مختصة في جدة' : 'MAZAJ · Specialty Coffee in Jeddah';
}
document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLang(currentLang === 'ar' ? 'en' : 'ar');
});
