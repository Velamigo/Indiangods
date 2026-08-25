import type { Metadata } from 'next';
import './globals.css';
import './extra.css';
import './names.css';
import './hierarchy.css';
import './portraits.css';
import './ratio-fix.css';
import './gender.css';
import './map-fix.css';
import './couples.css';
import './mobile.css';
import './collection.css';
import './graph-stable.css';
import {sitePath} from './site-path';
export const metadata:Metadata={
  title:'天竺神谱｜印度教神祇、故事与信仰地图',
  description:'一部可视化的中文印度教神祇指南：认识众神的职责、经典故事、形象标识与主要信仰地区。',
  openGraph:{title:'天竺神谱｜印度教神祇、故事与信仰地图',description:'沿着故事，认识印度教众神的职责、形象与信仰地理。',images:['/og.png'],type:'website'},
  twitter:{card:'summary_large_image',title:'天竺神谱',description:'印度教神祇、故事与信仰地图',images:['/og.png']}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}<a className="collection-fab" href={sitePath('/collection/')}>✦ 众神收藏与 PK</a></body></html>}
