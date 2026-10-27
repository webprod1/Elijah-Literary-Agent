import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
const pages=['index','about','representation','books','approach','featured-book-to-film','blog','journal','caa','perspectives','contact','book-short-stories-to-amuse-baffle-and-educate','book-all-the-presidents-dates','book-the-path-to-excellence','book-ultimate-love','book-wrinkles-dont-hurt','book-time-for-joy','journal-distinctive-literary-voice','journal-preparing-your-manuscript','journal-role-of-a-literary-agent','journal-building-an-author-platform','journal-professional-book-proposal','journal-editorial-revision-and-the-journey'];
export default defineConfig({plugins:[tailwindcss()],base:'/Elijah-Literary-Agent/',build:{rollupOptions:{input:pages.map(p=>p+'.html')}}});
