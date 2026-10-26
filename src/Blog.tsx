import {useEffect,useState} from 'react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {articles} from './content';

const base='/Elijah-Literary-Agent/';
const scenes=['journal','representation','approach','books','about','contact'];
const descriptions=['A bright reading room with curved oak shelves','Manuscript pages on an editorial desk','A light-filled study with bookshelves','A still life of clothbound books','An oak writing desk in a library','A limestone archway opening onto a courtyard'];
const topics=['All articles',...new Set(articles.map(article=>article.category))];
const articleURL=(slug:string)=>base+'journal-'+slug+'/';
export const readingTime=(article:typeof articles[number])=>Math.max(1,Math.ceil([article.intro,...article.sections.flat()].join(' ').split(/\s+/).length/200));

export function Blog(){
 const [topic,setTopic]=useState('All articles');
 const [query,setQuery]=useState('');
 useEffect(()=>{ScrollTrigger.refresh()},[topic,query]);
 const featured=articles[0];
 const filtered=articles.filter(article=>(topic==='All articles'||article.category===topic)&&`${article.title} ${article.intro} ${article.category}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <>
  <section className="blog-intro section">
   <div className="blog-intro-copy"><p className="eyebrow"><span/>THE BLOG / NOTES FROM THE DESK</p><h1 className="headline">Notes for your<br/><em>next chapter.</em></h1><p>Thoughts on writing, the work of revision, and finding a considered path through publishing. A little perspective for the pages ahead.</p><a className="editorial-link" href="#articles">Explore the articles <span aria-hidden="true">↓</span></a></div>
   <figure className="blog-intro-image"><img src={base+'images/journal.webp'} srcSet={base+'images/journal-800.webp 800w, '+base+'images/journal.webp 1536w'} sizes="(max-width:700px) 100vw, 50vw" width="1536" height="1024" alt={descriptions[0]} fetchPriority="high"/><figcaption>A SPACE FOR IDEAS TO TAKE SHAPE</figcaption></figure>
  </section>
  <section className="blog-feature section" aria-labelledby="featured-title"><p className="eyebrow"><span/>THE FEATURED READ</p><a className="blog-feature-link" href={articleURL(featured.slug)}><span className="blog-feature-number" aria-hidden="true">01</span><div><p className="category">{featured.category} · {readingTime(featured)} MIN READ</p><h2 id="featured-title">{featured.title}</h2><p>{featured.intro}</p></div><span className="blog-feature-arrow" aria-hidden="true">↗</span></a></section>
  <section className="blog-library section" id="articles" aria-labelledby="articles-title">
   <div className="section-heading"><div><p className="eyebrow"><span/>THE ARTICLE COLLECTION</p><h2 id="articles-title">A closer <em>look.</em></h2></div><label className="blog-search">Search articles<input type="search" placeholder="Search by title or topic…" value={query} onChange={event=>setQuery(event.target.value)}/></label></div>
   <div className="blog-topics" role="group" aria-label="Filter articles by topic">{topics.map(value=><button type="button" key={value} aria-pressed={topic===value} onClick={()=>setTopic(value)}>{value}</button>)}</div>
   <p className="blog-results" role="status">{filtered.length} {filtered.length===1?'article':'articles'}{topic!=='All articles'?' in '+topic:''}{query.trim()?' matching “'+query.trim()+'”':''}</p>
   <div className="journal-grid blog-grid">{filtered.map(article=>{const i=articles.indexOf(article);return <a className="journal-item" href={articleURL(article.slug)} key={article.slug}><div className="journal-image"><img src={base+'images/'+scenes[i]+'.webp'} srcSet={base+'images/'+scenes[i]+'-800.webp 800w, '+base+'images/'+scenes[i]+'.webp 1536w'} sizes="(max-width:700px) 100vw, 33vw" width="1536" height="1024" loading="lazy" alt={descriptions[i]}/><span>0{i+1}</span></div><p className="category">{article.category}<span>{readingTime(article)} MIN READ</span></p><h3>{article.title}</h3><p>{article.intro}</p><span className="editorial-link">Read article <span aria-hidden="true">↗</span></span></a>})}</div>
   {filtered.length===0&&<div className="blog-empty"><h3>No articles found.</h3><p>Try a different title or explore all topics.</p><button className="button" type="button" onClick={()=>{setQuery('');setTopic('All articles')}}>Show all articles <span aria-hidden="true">↗</span></button></div>}
  </section>
 </>;
}
