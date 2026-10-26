import fs from 'node:fs';
import path from 'node:path';
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html')&&f!=='index.html')){
 const slug=file.slice(0,-5);const dir=path.join('dist',slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),fs.readFileSync(path.join('dist',file)));
 const target=`/Elijah-Literary-Agent/${slug}/`;
 fs.writeFileSync(path.join('dist',file),`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page moved | Elijah</title><link rel="canonical" href="https://webprod1.github.io${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${target}">Continue to the updated page</a></body></html>`);
}
const replaced={'printable-profile':'caa','book-the-shape-of-stillness':'book-pride-and-prejudice','book-a-map-of-ordinary-days':'book-the-great-gatsby','book-where-the-river-remembers':'book-jane-eyre'};
for(const [oldSlug,newSlug] of Object.entries(replaced)){const target=`/Elijah-Literary-Agent/${newSlug}/`;const html=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Page moved | Elijah Cruz</title><link rel="canonical" href="https://webprod1.github.io${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${target}">Explore the reading shelf</a></body></html>`;fs.mkdirSync(path.join('dist',oldSlug),{recursive:true});fs.writeFileSync(path.join('dist',oldSlug,'index.html'),html);fs.writeFileSync(path.join('dist',oldSlug+'.html'),html);}
console.log('Created clean URLs, legacy redirects and reading-shelf replacements.');
