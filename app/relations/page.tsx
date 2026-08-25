'use client';
import {useState} from 'react';
import '../relations.css';

type Node={id:string;zh:string;en:string;indic:string;x:number;y:number;sheet:string;index:number};
type Edge={a:string;b:string;type:string;story:string};
const nodes:Node[]=[
{id:'shiva',zh:'湿婆',en:'Shiva',indic:'शिव',x:220,y:180,sheet:'a',index:0},{id:'parvati',zh:'帕尔瓦蒂',en:'Parvati',indic:'पार्वती',x:420,y:180,sheet:'b',index:4},{id:'ganesha',zh:'象头神',en:'Ganesha',indic:'गणेश',x:220,y:560,sheet:'a',index:4},{id:'murugan',zh:'穆鲁甘',en:'Murugan',indic:'முருகன்',x:420,y:560,sheet:'b',index:7},
{id:'vishnu',zh:'毗湿奴',en:'Vishnu',indic:'विष्णु',x:950,y:180,sheet:'a',index:1},{id:'lakshmi',zh:'吉祥天女',en:'Lakshmi',indic:'लक्ष्मी',x:1150,y:180,sheet:'a',index:5},{id:'rama',zh:'罗摩',en:'Rama',indic:'राम',x:820,y:580,sheet:'b',index:1},{id:'sita',zh:'悉多',en:'Sita',indic:'सीता',x:1020,y:580,sheet:'b',index:6},{id:'hanuman',zh:'哈奴曼',en:'Hanuman',indic:'हनुमान',x:820,y:980,sheet:'b',index:2},{id:'krishna',zh:'黑天',en:'Krishna',indic:'कृष्ण',x:1280,y:580,sheet:'b',index:0},{id:'radha',zh:'罗陀',en:'Radha',indic:'राधा',x:1480,y:580,sheet:'b',index:5},
{id:'devi',zh:'女神',en:'Devi / Shakti',indic:'देवी',x:320,y:940,sheet:'a',index:3},{id:'durga',zh:'杜尔迦',en:'Durga',indic:'दुर्गा',x:220,y:1240,sheet:'a',index:7},{id:'kali',zh:'迦梨',en:'Kali',indic:'काली',x:420,y:1240,sheet:'b',index:3},{id:'jagannath',zh:'札格纳特',en:'Jagannatha',indic:'जगन्नाथ',x:1280,y:980,sheet:'c',index:0}
];
const edges:Edge[]=[
{a:'shiva',b:'parvati',type:'伴侣',story:'帕尔瓦蒂以长期苦修赢得湿婆的认可；两人的结合象征纯粹意识与创造性能量不可分离。'},
{a:'shiva',b:'ganesha',type:'父子',story:'湿婆误斩守门的象头神，得知他是帕尔瓦蒂之子后使其复生，并赐予他“诸祭之先”的地位。'},
{a:'parvati',b:'ganesha',type:'母子',story:'帕尔瓦蒂以自身力量创造象头神，让他守护浴室；这个故事确立了母子之间格外亲密的关系。'},
{a:'shiva',b:'murugan',type:'父子',story:'室建陀由湿婆的神圣火花诞生，为击败阿修罗而成为天军统帅。'},
{a:'parvati',b:'murugan',type:'母子',story:'帕尔瓦蒂赐予穆鲁甘神矛 Vel；神矛帮助他洞穿无知并击败苏罗波陀曼。'},
{a:'vishnu',b:'lakshmi',type:'伴侣',story:'吉祥天女从乳海升起后选择毗湿奴。守护宇宙的秩序与滋养世界的丰饶由此并行。'},
{a:'vishnu',b:'rama',type:'化身',story:'正法衰落时，毗湿奴化身为阿约提亚王子罗摩，以人的身份实践责任与理想王道。'},
{a:'vishnu',b:'krishna',type:'化身',story:'毗湿奴化身为黑天，既在温达文展现神圣之爱，也在《薄伽梵歌》中向阿周那讲授正法。'},
{a:'rama',b:'sita',type:'伴侣',story:'罗摩与悉多共同经历放逐、分离与归国；他们的故事成为《罗摩衍那》的情感核心。'},
{a:'rama',b:'hanuman',type:'奉爱',story:'哈奴曼渡海寻找悉多，并在罗什曼那受伤时举山取药；他的力量完全服务于对罗摩的奉爱。'},
{a:'krishna',b:'radha',type:'神圣之爱',story:'罗陀与黑天的相聚和分离，被奉爱诗歌用来表现灵魂渴望并亲近神圣的过程。'},
{a:'krishna',b:'jagannath',type:'地域形态',story:'在奥迪沙传统中，札格纳特被广泛理解为黑天／毗湿奴的木质圣像形态，每年乘神车走出神庙。'},
{a:'devi',b:'durga',type:'战斗形态',story:'众神光芒汇聚为杜尔迦；她作为最高女神的战斗形态，击败水牛魔王并恢复宇宙秩序。'},
{a:'devi',b:'kali',type:'猛烈形态',story:'迦梨从女神的怒火中显现，代表时间、死亡，以及斩断自我幻象的彻底力量。'},
{a:'parvati',b:'devi',type:'温柔形态',story:'在女神传统中，帕尔瓦蒂被理解为同一沙克蒂的温柔、家庭与修行面相。'}
];
const pos=(n:Node)=>({left:`${n.x-80}px`,top:`${n.y-105}px`});
const face=(n:Node)=>({backgroundImage:`url(/deities/${n.id==='murugan'?'kartikeya':n.id}.png)`,backgroundPosition:'center center'});
const female=new Set(['parvati','lakshmi','sita','radha','devi','durga','kali']);
const coupleClusters=[{label:'伴侣',left:110,top:55,width:420,height:260},{label:'伴侣',left:840,top:55,width:420,height:260},{label:'伴侣',left:710,top:455,width:420,height:260},{label:'神圣伴侣',left:1170,top:455,width:420,height:260}];
export default function Relations(){const[active,setActive]=useState<Edge|null>(null);const by=(id:string)=>nodes.find(n=>n.id===id)!;return <main className="relation-page"><nav className="relation-nav"><a href="/">← 返回天竺神谱</a><span>神际关系地图</span><small>将鼠标移到连线上</small></nav><header className="relation-intro"><p>RELATIONSHIP ATLAS · 关系并不只有血缘</p><h1>众神之间，<br/><i>每一条线都是一个故事</i></h1><div className="relation-key"><span>— 伴侣／亲子</span><span>– – 化身／形态</span><span>··· 奉爱</span><span className="male-key">男神</span><span className="female-key">女神</span></div></header><div className="graph-scroll"><div className="graph-stage">{coupleClusters.map((c,i)=><div className="couple-cluster" key={i} style={{left:c.left,top:c.top,width:c.width,height:c.height}}><span>{c.label}</span></div>)}<svg viewBox="0 0 1600 1350" aria-label="印度教神祇关系连线图">{edges.map((e,i)=>{const a=by(e.a),b=by(e.b);const dash=e.type.includes('化身')||e.type.includes('形态')?'10 8':e.type==='奉爱'?'2 8':'none';return <g key={i} className={active===e?'edge active':'edge'} onMouseEnter={()=>setActive(e)} onMouseLeave={()=>setActive(null)}><line className="edge-hit" x1={a.x} y1={a.y} x2={b.x} y2={b.y}/><line className="edge-visible" strokeDasharray={dash} x1={a.x} y1={a.y} x2={b.x} y2={b.y}/><text x={(a.x+b.x)/2} y={(a.y+b.y)/2-8}>{e.type}</text></g>})}</svg>{nodes.map(n=><article className={`graph-node ${female.has(n.id)?'female':'male'}`} key={n.id} style={pos(n)}><i style={face(n)}/><em>{female.has(n.id)?'女神':'男神'}</em><div><b>{n.zh}</b><span>{n.en}</span><small>{n.indic}</small></div></article>)}{active&&<aside className="edge-story"><span>{by(active.a).zh} × {by(active.b).zh}</span><b>{active.type}</b><p>{active.story}</p></aside>}</div></div><section className="relation-help"><b>如何阅读这张图？</b><p>伴侣被并排放在同一分组中；实线多表示伴侣或亲子，虚线表示化身与形态，点线表示奉爱关系。蓝色标签为男神，红色标签为女神。</p><small>性别标签指档案中的主要人格形态，神圣本体可能超越人类性别；不同经文、地区与教派的叙述也可能不同。</small></section></main>}
