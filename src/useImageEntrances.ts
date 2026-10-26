import {useEffect,useLayoutEffect} from 'react';

const useVisualEffect=typeof window==='undefined'?useEffect:useLayoutEffect;
const frames='.photo,.portrait-home-image,.portrait-wrap,.caa-identity-card,.caa-layout>figure,.book-stage,.detail-cover,.journal-image,.fair-image,.blog-intro-image,.adaptation-cover,.film-preview-cover,.screen-hero-art,.caa-reference-background';

/** Reveal each visual once, including cards added by the search and genre filters. */
export function useImageEntrances(){
 useVisualEffect(()=>{
  const main=document.querySelector('main');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  if(!main||preference.matches||!('IntersectionObserver' in window))return;
  let disposed=false;
  const tracked=new Set<HTMLElement>();
  const handlers=new Map<HTMLElement,(event:TransitionEvent)=>void>();
  const clear=(element:HTMLElement)=>{
   element.classList.remove('image-enter-pending','image-enter-visible');
   element.removeAttribute('data-image-entrance');
   const handler=handlers.get(element);
   if(handler)element.removeEventListener('transitionend',handler);
   handlers.delete(element);
  };
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    const element=entry.target as HTMLElement;
    observer.unobserve(element);
    const images=element instanceof HTMLImageElement?[element]:Array.from(element.querySelectorAll('img'));
    // Decode visible images before revealing their frame, so lazy loading cannot flash.
    Promise.allSettled(images.map(image=>image.decode())).then(()=>{
     if(disposed||!element.isConnected||preference.matches)return;
     const finish=(event:TransitionEvent)=>{
      if(event.target===element&&event.propertyName==='transform')clear(element);
      else if(event.target===element&&event.propertyName==='opacity'&&element.dataset.imageEntrance==='background')clear(element);
     };
     handlers.set(element,finish);
     element.addEventListener('transitionend',finish);
     requestAnimationFrame(()=>{if(!disposed&&element.isConnected)element.classList.add('image-enter-visible')});
    });
   }
  },{threshold:0.08,rootMargin:'0px 0px -25px 0px'});
  const scan=()=>{
   for(const element of tracked){
    if(!element.isConnected){observer.unobserve(element);clear(element);tracked.delete(element)}
   }
   main.querySelectorAll<HTMLElement>(frames).forEach(element=>{
    if(tracked.has(element)||element.parentElement?.closest(frames))return;
    tracked.add(element);
    // Keep imagery already above a restored scroll position visible.
    if(element.getBoundingClientRect().bottom<=0)return;
    element.dataset.imageEntrance=element.matches('.section-backdrop,.book-detail-backdrop,.caa-reference-background')?'background':'foreground';
    element.classList.add('image-enter-pending');
    observer.observe(element);
   });
  };
  const mutations=new MutationObserver(scan);
  scan();
  mutations.observe(main,{childList:true,subtree:true});
  const stop=()=>{
   disposed=true;
   observer.disconnect();mutations.disconnect();
   tracked.forEach(clear);tracked.clear();
  };
  const onPreferenceChange=()=>{if(preference.matches)stop()};
  preference.addEventListener('change',onPreferenceChange);
  return()=>{stop();preference.removeEventListener('change',onPreferenceChange)};
 },[]);
}
