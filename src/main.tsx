import { StrictMode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MoveUpRight, Quote, Star } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { useInViewAnimation } from './hooks/useInViewAnimation';
import './styles.css';

const gallery = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];
const testimonials = [
  ['Marcus Anderson', 'CEO, Data.storage', 'With very little guidance, the team delivered designs that were consistently spot on.', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=160'],
  ['alexwu', 'Founder, Nexgate', 'Viktor led the creation of our best fundraising deck to date. The room went quiet in the best way.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160'],
  ['James Mitchell', 'VP Product, LaunchPad', 'Working with Viktor transformed our product vision into something people could instantly understand.', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160'],
  ['Rachel Foster', 'Co-founder, Nexus Labs', 'The design quality exceeded our expectations and gave the whole company a sharper point of view.', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160'],
  ['David Zhang', 'Head of Design, Paradigm Labs', 'Incredible work from start to finish. Fast, thoughtful, and always one step ahead.', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=160'],
];
const caseStudies = [
  ['evr', 'From idea to millions raised for a web3 AI product', 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif'],
  ['Automation Machines', 'Streamlining industrial automation processes', 'https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif'],
  ['xPortfolio', 'Modern portfolio management platform', 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif'],
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const animation = useInViewAnimation();
  return <div ref={animation.ref} className={`${animation.className} ${className}`} style={{ animationDelay: `${delay}s` }}>{children}</div>;
}
function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null); const frame = useRef(0); const [offset, setOffset] = useState(0); const [active, setActive] = useState(false);
  useEffect(() => { if (!ref.current) return; const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: .1 }); observer.observe(ref.current); return () => observer.disconnect(); }, []);
  useEffect(() => { const onScroll = () => { cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => { if (active && ref.current) { const r = ref.current.getBoundingClientRect(); setOffset(Math.max(-200, Math.min(200, (innerHeight / 2 - r.top) * .2))); } }); }; addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => { cancelAnimationFrame(frame.current); removeEventListener('scroll', onScroll); }; }, [active]);
  return <div ref={ref} className="parallax-frame"><img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85" alt="Chris Halaska" style={{ transform: `translateY(${offset}px) scale(1.08)` }} /></div>;
}
function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const timer = setInterval(() => setActive((x) => (x + 1) % testimonials.length), 3000); return () => clearInterval(timer); }, [paused]);
  const move = (direction: number) => setActive((x) => (x + direction + testimonials.length) % testimonials.length);
  return <section className="reviews" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}><div className="wide review-head"><h2>What <em>builders</em> say</h2><div className="rating"><span>{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={18} fill="currentColor" />)}</span> Clutch 5/5</div></div><div className="review-window"><div className="review-track" style={{ transform: `translateX(calc(-${active} * (min(427.5px, calc(100vw - 48px)) + 24px)))` }}>{[...testimonials, ...testimonials, ...testimonials].map((item, i) => <article className="review-card" key={`${item[0]}-${i}`}><Quote size={26} strokeWidth={1.2} /><p>“{item[2]}”</p><div className="author"><img src={item[3]} alt="" /><div><strong>{item[0]}</strong><small>↳ {item[1]}</small></div></div></article>)}</div></div><div className="review-controls"><button onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronLeft size={19} /></button><button onClick={() => move(1)} aria-label="Next testimonial"><ChevronRight size={19} /></button></div></section>;
}
function Partner() {
  const [thumbs, setThumbs] = useState<{ id: number; src: string; x: number; y: number; rotate: number }[]>([]);
  const lastSpawn = useRef(0); const cleanupFrame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(cleanupFrame.current), []);
  const addThumb = (e: React.MouseEvent<HTMLDivElement>) => { const now = performance.now(); if (now - lastSpawn.current < 80) return; lastSpawn.current = now; const box = e.currentTarget.getBoundingClientRect(); const id = Date.now(); setThumbs((all) => [...all.slice(-7), { id, src: gallery[Math.floor(Math.random() * gallery.length)], x: e.clientX - box.left, y: e.clientY - box.top, rotate: Math.random() * 20 - 10 }]); cleanupFrame.current = requestAnimationFrame(() => setTimeout(() => setThumbs((all) => all.filter((t) => t.id !== id)), 1000)); };
  return <section className="partner wide" onMouseMove={addThumb}><div className="partner-inner"><h2>Partner <em>with us</em></h2><a className="button primary partner-button" href="mailto:hello@viktoroddy.com"><img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" />Start chat with Viktor <ArrowUpRight size={15} /></a>{thumbs.map((t) => <img className="cursor-thumb" key={t.id} src={t.src} alt="" style={{ left: t.x, top: t.y, transform: `translate(-50%, -50%) rotate(${t.rotate}deg)` }} />)}</div></section>;
}
function Footer() { return <><footer className="site-footer wide"><a className="button primary" href="mailto:hello@viktoroddy.com">Start a chat <MoveUpRight size={16} /></a><div className="footer-links"><ArrowUpRight size={18} /><div><a href="#work">Services</a><a href="#projects">Work</a><a href="#top">About</a></div><div><a href="https://x.com" target="_blank" rel="noreferrer">x.com</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div></div></footer><div className="copyright wide"><span>Vortex Studio Limited</span><span>Austin, USA</span></div></>; }
function App() {
  const [sent, setSent] = useState(false);
  return <main><header className="topbar"><a className="mini-logo" href="#top">VO<span>.</span></a><span className="top-note">Independent creative studio / 2026</span><a className="nav-link" href="mailto:hello@viktoroddy.com">Let's talk <ArrowUpRight size={14} /></a></header>
    <section id="top" className="hero page-column"><Reveal delay={.1}><div className="logo">Viktor Oddy</div></Reveal><Reveal delay={.2}><div className="eyebrow">The creative studio of Viktor Oddy</div></Reveal><Reveal delay={.3}><h1>Build the <em>next wave,</em><br />the <em>bold way.</em></h1></Reveal><Reveal delay={.4} className="intro"><p>I spent seven years at Apple crafting products used by over a billion people. I founded Vortex Studio to bring that same level of thinking to innovators shaping what comes next.</p><p>The studio is deliberately small. I guide the creative vision on every project, backed by a veteran design crew that moves fast without cutting corners.</p><p className="price">Projects start at <strong>$5,000</strong> per month.</p></Reveal><Reveal delay={.5} className="hero-actions"><a className="button primary" href="mailto:hello@viktoroddy.com">Start a chat <MoveUpRight size={16} /></a><a className="button secondary" href="#work">View projects <ArrowUpRight size={16} /></a></Reveal></section>
    <section id="work" className="marquee-wrap" aria-label="Selected projects"><div className="marquee-track">{[...gallery, ...gallery].map((src, i) => <img key={`${src}-${i}`} src={src} alt="Selected creative studio project" loading={i > 3 ? 'lazy' : 'eager'} />)}</div></section>
    <section className="quote-section page-column"><Reveal delay={.1}><Quote size={25} strokeWidth={1.5} /></Reveal><Reveal delay={.2}><blockquote>“I left <em>Apple</em> to build the studio I always wanted to work with.”</blockquote></Reveal><Reveal delay={.3}><cite>— Viktor Oddy, founder</cite></Reveal><Reveal delay={.4} className="logos"><span>Apple</span><span>IDEO</span><span>Polygon</span></Reveal><Reveal delay={.5}><ParallaxImage /></Reveal></section>
    <section className="pricing wide"><Reveal className="pricing-title"><p className="eyebrow">Ways to work together</p><h2>Good work starts<br /><em>with trust.</em></h2></Reveal><div className="pricing-grid"><Reveal delay={.1}><article className="plan dark-plan"><h3>Monthly Partnership</h3><p>A dedicated creative design team.<br />You work directly with Viktor.</p><strong>$5,000</strong><small>Monthly</small><div><a className="button plan-button light-button" href="https://halaskastudio.com/./book">Start a chat <ArrowUpRight size={15} /></a><a className="button plan-button ghost-button" href="https://halaskastudio.com/./book">How it works</a></div></article></Reveal><Reveal delay={.2}><article className="plan light-plan"><h3>Custom Project</h3><p>Fixed scope, fixed timeline.<br />Same team, same standards.</p><strong>$5,000</strong><small>Minimum</small><div><a className="button plan-button dark-button" href="https://halaskastudio.com/./book">Start a chat <ArrowUpRight size={15} /></a></div></article></Reveal></div></section>
    <Reviews />
    <section id="projects" className="case-studies wide"><Reveal><p className="eyebrow">A few things we've made</p><h2>Selected <em>projects</em></h2></Reveal><div className="case-list">{caseStudies.map((item, i) => <Reveal key={item[0]} delay={i * .1}><article className="case-item"><div className="case-label"><h3>{item[0]}</h3><p>{item[1]}</p></div><img src={item[2]} alt={`${item[0]} project`} loading="lazy" /></article></Reveal>)}</div></section>
    <Partner />
    <Footer /><nav className="bottom-nav" aria-label="Quick contact"><span>V</span><a className="button primary" href="mailto:hello@viktoroddy.com">Start a chat <ArrowUpRight size={14} /></a></nav>
  </main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
