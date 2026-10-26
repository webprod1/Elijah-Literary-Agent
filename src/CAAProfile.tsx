import {useEffect,useRef,useState,type ReactNode} from 'react';

const base='/Elijah-Literary-Agent/';
const officialSource='https://www.caa.com/entertainmenttalent/books/';

export function CAAProfile({children}:{children:ReactNode}){
 const frame=useRef<HTMLIFrameElement>(null);
 const [profileReady,setProfileReady]=useState(false);
 useEffect(()=>{
  const profile=frame.current;
  if(profile?.contentDocument?.readyState==='complete'&&profile.contentDocument.URL.includes('printable-profile'))setProfileReady(true);
 },[]);
 const printProfile=()=>frame.current?.contentWindow?.print();
 return <>
  <section className="caa-reference-hero" aria-labelledby="caa-reference-title">
   <img className="caa-reference-background" src={base+'images/caa-building.webp'} width="1010" height="568" alt="Glass and stone architectural entrance" fetchPriority="high"/>
   <div className="caa-reference-rail"><span>ELIJAH CRUZ · INDUSTRY REFERENCE</span><span>Independent professional profile</span></div>
   <div className="caa-reference-grid section">
    <div className="caa-reference-copy"><p className="eyebrow"><span/>PUBLISHING / AN INDUSTRY PERSPECTIVE</p><h1 className="headline" id="caa-reference-title">Creative<br/>Artists Agency<br/><span>Industry<br/>Reference.</span></h1><p>A wider view of the publishing landscape, with a direct link to CAA’s official books division and a printable profile of Elijah Cruz’s independent work.</p><div className="caa-reference-actions"><a className="button" href="#caa-context">Review the reference <span aria-hidden="true">↓</span></a><a className="button caa-outline-button" href={officialSource} target="_blank" rel="noreferrer">Official CAA source <span aria-hidden="true">↗</span></a><button className="button caa-outline-button" type="button" disabled={!profileReady} onClick={printProfile}>{profileReady?'Print profile':'Preparing profile…'} <span aria-hidden="true">↗</span></button></div><p className="caa-hero-note">An independent reference. No CAA affiliation or endorsement is implied.</p></div>
    <figure className="caa-identity-card"><img className="caa-card-portrait" src={base+'elijah.webp'} alt="Elijah Cruz, independent literary agent" width="522" height="782" fetchPriority="high"/><figcaption><h2>Elijah Cruz</h2><p>Independent Literary Agent<br/>&amp; Publishing Strategist</p><div className="caa-card-reference"><p>PORTFOLIO REFERENCE</p><strong>ELIJAH CRUZ</strong><img src={base+'elijah-barcode.svg'} alt="Barcode encoding the name ELIJAH" width="264" height="72"/><span>Independent professional profile</span></div><a href={base+'printable-profile/'} target="_blank" rel="noreferrer">Open printable profile <span aria-hidden="true">↗</span></a></figcaption></figure>
   </div>
  </section>
  <section className="caa-page-intro section" id="caa-context"><p className="eyebrow"><span/>SOURCE &amp; CONTEXT</p><h2>Professional identity.<br/><em>Clearly presented.</em></h2><div className="prose"><p>Creative Artists Agency has a books division working with authors in the publishing industry. The source below leads to CAA’s own website for information about that division.</p><a className="editorial-link" href={officialSource} target="_blank" rel="noreferrer">Visit the official CAA Books website <span aria-hidden="true">↗</span></a><p>Elijah Cruz works independently. This page and the printable profile are independently prepared. They are not CAA-issued credentials, endorsements, or verification documents. Inquiries through this portfolio go directly to Elijah.</p></div></section>
  <section id="printable" className="printable-section section"><div className="printable-heading"><div><p className="eyebrow"><span/>ELIJAH CRUZ / PROFESSIONAL PROFILE</p><h2>A profile to keep.<br/><em>A conversation to begin.</em></h2></div><div className="print-actions"><button className="button" type="button" disabled={!profileReady} onClick={printProfile}>{profileReady?'Print / Save as PDF':'Preparing profile…'} <span aria-hidden="true">↗</span></button><a className="editorial-link" href={base+'printable-profile/'} target="_blank" rel="noreferrer">Open full profile <span aria-hidden="true">↗</span></a></div></div><iframe ref={frame} className="profile-frame" src={base+'printable-profile/'} title="Printable professional profile of Elijah Cruz" onLoad={()=>setProfileReady(true)}/><p className="small-note">Use your browser’s print dialog to print the profile or save it as a PDF.</p></section>
  {children}
 </>;
}
