# مزاج · Mazaj

نفس كودك الأصلي (`mazaj-cafe.html`) مقسوم على ثلاث ملفات بدل ملف واحد. لا تغيير على أي HTML أو CSS أو JS — فقط فصل.

## البنية

```
index.html              الهيكل (بدون <style> أو <script> بالداخل)
assets/css/styles.css   كل الـ CSS كان بين <style>...</style>
assets/js/main.js       كل الـ JS: التبويبات، الوضع الليلي، قاموس الترجمة i18n
netlify.toml
vercel.json
.gitignore
```

## التشغيل محلياً

افتح `index.html` مباشرة بالمتصفح، أو:

```bash
python3 -m http.server 8000
```

## وين تعدّل

- **الأسعار والنصوص العربية:** داخل `index.html` نفسه — كل صنف بسطر `<div class="item">`.
- **الترجمة الإنجليزية:** كائن `dict` في أول `assets/js/main.js` — لكل مفتاح `data-i18n` قيمتان `ar` و`en`. إذا غيّرت نصاً عربياً في HTML، غيّر مقابله بنفس المفتاح هنا حتى يبقى التبديل متطابق.
- **الألوان:** أول ٤٠ سطر من `styles.css` (`:root` للداكن الافتراضي، `html[data-theme="light"]` للفاتح).

## بيانات لازم تحدّثها قبل النشر

موجودة بالفعل داخل `index.html`:
- رقم الواتساب `966501234567` (مكرر في الهيدر وزر الطفو).
- رقم الجوال `tel:+966501234567`.
- السجل التجاري `4030512987` والرقم الضريبي `300123456700003`.
- حسابات إنستقرام/سناب/إكس/تيك توك `mazaj.jed` / `mazaj_jed`.

## النشر

**Vercel:** ارفع المستودع على GitHub، ثم من لوحة Vercel: *Add New → Project* واستورده. لا يحتاج أمر بناء — الإعدادات في `vercel.json`.

**Netlify:** *Add new site → Import an existing project*، أو اسحب المجلد مباشرة إلى لوحة Netlify. الإعدادات في `netlify.toml`.
