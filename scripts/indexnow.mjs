/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver; Bing powers ChatGPT search) with every URL in the
 * live sitemap. Run after a production deploy:  node scripts/indexnow.mjs
 * The key file public/6a4814de9615a0421bcb5917a52d3d90.txt must be deployed at the site root.
 */
const HOST = 'www.virtusco.in';
const KEY = '6a4814de9615a0421bcb5917a52d3d90';

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(png|jpe?g|webp)$/.test(u));
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
