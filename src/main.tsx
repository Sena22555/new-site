import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, MoveUpRight, Quote, Star } from 'lucide-react';
import './styles.css';

const projects = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ animationDelay: `${delay}s` }}>{children}</div>;
}

function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => { if (ref.current) { const r = ref.current.getBoundingClientRect(); setOffset(Math.max(-35, Math.min(35, (window.innerHeight / 2 - r.top) * 0.08))); } };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} className="parallax-frame"><img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260715_020402_14047c8b-e116-4ac5-bc7d-1ab18d18a358.png&w=1600&q=90" alt="Abstract product design study" style={{ transform: `translateY(${offset}px) scale(1.08)` }} /></div>;
}

function App() {
  const [sent, setSent] = useState(false);
  return <main>
    <header className="topbar"><a className="mini-logo" href="#top">VO<span>.</span></a><span className="top-note">Independent creative studio / 2026</span><a className="nav-link" href="mailto:hello@viktoroddy.com">Let's talk <ArrowUpRight size={14} /></a></header>
    <section id="top" className="hero page-column">
      <Reveal delay={.1}><div className="logo">Viktor Oddy</div></Reveal>
      <Reveal delay={.2}><div className="eyebrow">The creative studio of Viktor Oddy</div></Reveal>
      <Reveal delay={.3}><h1>Build the <em>next wave,</em><br />the <em>bold way.</em></h1></Reveal>
      <Reveal delay={.4} className="intro"><p>I spent seven years at Apple crafting products used by over a billion people. I founded Vortex Studio to bring that same level of thinking to innovators shaping what comes next.</p><p>The studio is deliberately small. I guide the creative vision on every project, backed by a veteran design crew that moves fast without cutting corners.</p><p className="price">Projects start at <strong>$5,000</strong> per month.</p></Reveal>
      <Reveal delay={.5} className="hero-actions"><a className="button primary" href="mailto:hello@viktoroddy.com">Start a chat <MoveUpRight size={16} /></a><a className="button secondary" href="#work">View projects <ArrowUpRight size={16} /></a></Reveal>
    </section>
    <section id="work" className="marquee-wrap" aria-label="Selected projects"><div className="marquee-track">{[...projects, ...projects].map((src, i) => <img key={`${src}-${i}`} src={src} alt="Selected creative studio project" loading={i > 3 ? 'lazy' : 'eager'} />)}</div></section>
    <section className="quote-section page-column"><Reveal delay={.1}><Quote size={25} strokeWidth={1.5} /></Reveal><Reveal delay={.2}><blockquote>“I left <em>Apple</em> to build the studio I always wanted to work with.”</blockquote></Reveal><Reveal delay={.3}><cite>— Viktor Oddy, founder</cite></Reveal><Reveal delay={.4} className="logos"><span>Apple</span><span>IDEO</span><span>Polygon</span></Reveal><Reveal delay={.5}><ParallaxImage /></Reveal></section>
    <section className="manifesto"><div className="manifesto-inner"><Reveal><p className="eyebrow light">A studio for the next</p><h2>Good ideas deserve<br /><em>unreasonable attention.</em></h2></Reveal><Reveal delay={.2} className="manifesto-copy"><p>From first thought to final pixel, we make ambitious products feel inevitable. Strategy, identity, digital experiences, and the details that make people stop scrolling.</p><a className="text-link" href="mailto:hello@viktoroddy.com">Tell us what you're building <ArrowUpRight size={15} /></a></Reveal></div></section>
    <section className="contact page-column"><Reveal><div className="eyebrow">Have a good one?</div><h2>Let's make<br /><em>something odd.</em></h2></Reveal><form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><input aria-label="Your email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Send email">{sent ? 'Sent' : 'Get in touch'} <ArrowUpRight size={17} /></button></form><footer><span>Viktor Oddy © 2026</span><span>New York / Everywhere</span><a href="#top">Back to top ↑</a></footer></section>
  </main>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
