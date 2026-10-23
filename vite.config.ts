import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
const pages=['index','about','representation','books','approach','journal','contact','book-the-shape-of-stillness','book-a-map-of-ordinary-days','book-where-the-river-remembers','journal-distinctive-literary-voice','journal-preparing-your-manuscript','journal-role-of-a-literary-agent','journal-building-an-author-platform','journal-professional-book-proposal','journal-editorial-revision-and-the-journey'];
export default defineConfig({plugins:[tailwindcss()],base:'./',build:{rollupOptions:{input:pages.map(p=>p+'.html')}}});
