# Deploy guide (static site: koi build step nahi)

Ye `dist/` folder poori website hai: plain HTML + CSS + JS. Server, Node, database kuch nahi chahiye.
Offline bhi chalta hai: `index.html` ko double-click karke browser mein khol lo (file://).

Folder: `index.html` (home), `lesson01.html` ... `lesson22.html`, `appendix.html`, `assets/` (css, js, widgets).

## Option 1: Netlify Drop (sabse aasaan, 1 minute)
1. Browser mein https://app.netlify.com/drop kholo (free account / login lagega).
2. Poora `dist` folder drag & drop karo page par.
3. Netlify ek link dega (e.g. `https://random-name.netlify.app`). Done. Site name `Site settings > Change site name` se badal sakte ho.
4. Update karna ho: `python3 make_site.py` dobara chalao, phir wahi `dist` folder dobara drop karo (Deploys tab > drag & drop).

## Option 2: GitHub Pages
1. GitHub par naya repo banao (e.g. `gate-da-dbms`), public.
2. Is `dist` folder ke andar ki saari files repo ke root mein daalo (ya poora dist ek `docs/` folder bana ke):
   ```
   cd dist
   git init && git add . && git commit -m "site"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/gate-da-dbms.git
   git push -u origin main
   ```
3. Repo > Settings > Pages > Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)` (agar `docs/` mein rakha to `/docs`). Save.
4. 1-2 minute baad site: `https://<USERNAME>.github.io/gate-da-dbms/`. (`.nojekyll` file already hai.)

## Option 3: Vercel
1. https://vercel.com par login karo. Terminal se: `npm i -g vercel`.
2. `cd dist && vercel` (sab sawaal par Enter; "Framework" = Other; "Output directory" = `.`). Production ke liye `vercel --prod`.
3. Ya dashboard se: Add New > Project > "Import" ya `dist` folder ko Git repo bana ke import karo; Build Command khali, Output Directory `.`.

## Notes
- Progress (done ticks, "continue where you left off", dark mode) browser ke localStorage mein save hota hai: har device/browser mein alag.
- Nayi lesson/widget add hone par: `python3 make_site.py` chalao, `dist/` naya ban jayega.
