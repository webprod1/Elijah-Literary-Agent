import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
const require=createRequire(import.meta.url);
fs.mkdirSync('.sites',{recursive:true});
await build({entryPoints:['src/main.tsx'],bundle:true,platform:'node',format:'cjs',outfile:'.sites/prerender.cjs',loader:{'.css':'empty'},packages:'external'});
const React=require('react');const {renderToString}=require('react-dom/server');
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html'))){globalThis.location={pathname:'/'+file};const entry=path.resolve('.sites/prerender.cjs');delete require.cache[entry];const {App}=require(entry);const content=renderToString(React.createElement(App));const dest=path.join('dist',file);const html=fs.readFileSync(dest,'utf8');fs.writeFileSync(dest,html.replace('<div id="root"></div>',`<div id="root">${content}</div>`));}
console.log('Prerendered all main pages with readable HTML content.');
