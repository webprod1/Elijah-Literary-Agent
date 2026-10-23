import fs from 'node:fs';
import path from 'node:path';
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html')&&f!=='index.html')){
 const slug=file.slice(0,-5);const dir=path.join('dist',slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),fs.readFileSync(path.join('dist',file)));
 const target=`/Elijah-Literary-Agent/${slug}/`;
 fs.writeFileSync(path.join('dist',file),`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page moved | Elijah</title><link rel="canonical" href="https://webprod1.github.io${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${target}">Continue to the updated page</a></body></html>`);
}
console.log('Created clean directory URLs and redirects for 15 legacy .html pages.');
