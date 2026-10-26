import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
const pages=['index','about','representation','books','approach','blog','journal','caa','perspectives','contact','book-pride-and-prejudice','book-the-great-gatsby','book-jane-eyre','journal-distinctive-literary-voice','journal-preparing-your-manuscript','journal-role-of-a-literary-agent','journal-building-an-author-platform','journal-professional-book-proposal','journal-editorial-revision-and-the-journey'];
export default defineConfig({plugins:[tailwindcss()],base:'/Elijah-Literary-Agent/',build:{rollupOptions:{input:pages.map(p=>p+'.html')}}});
