import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import InteractiveGlobe from '../components/InteractiveGlobe';
/* ── Animated counter hook ─────────────────────────────────── */
function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(end / (duration / 16));
          const id = window.setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              window.clearInterval(id);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
}

export function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  /* Trigger entrance animations */
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Animated stats */
  const donors = useCountUp(12500);
  const hospitals = useCountUp(340);
  const nfts = useCountUp(45000);
  const lives = useCountUp(8200);

  return (
    <div className="w-full min-h-screen overflow-x-hidden box-border">

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative w-full min-h-[100vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24 box-border">

        {/* Decorative dark glows that keep depth without purple tint */}
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-zinc-800/20 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-zinc-800/20 blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row flex-wrap items-center justify-between gap-12 lg:gap-20">

          {/* Left — copy */}
          <div
            className={`flex-1 text-center lg:text-left transition-all duration-1000 ease-out flex flex-col items-center lg:items-start w-full ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
              </span>
              Powered by Hive Blockchain
            </span>

            <h1 className="font-extrabold leading-tight mb-6 text-[clamp(2.5rem,6vw,5rem)]">
              <span className="block text-white">Save Lives,</span>
              <span className="block text-secondary-light">Earn NFT Rewards</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              The world's first <strong className="text-white">blockchain-verified</strong> blood donation platform.
              Donate blood, get immutable NFT certificates, and redeem real-world benefits — all on the <strong className="text-white">Hive chain</strong>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <Link
                to="/register"
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold text-lg shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Start Donating</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary-dark to-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/explore"
                className="px-8 py-3.5 rounded-xl border border-slate-600 bg-slate-800/60 backdrop-blur-sm text-slate-200 font-semibold text-lg hover:border-secondary/50 hover:bg-slate-700/60 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Explore NFTs →
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Decentralized & Secure
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                100 % On-Chain Verified
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Zero Gas Fees
              </span>
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 flex justify-center lg:justify-end">
            <InteractiveGlobe />
          </div>

        </div>
      </section>

      {/* ═══════════ LIVE STATS BAR ═══════════ */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-24 z-20">
        <div className="grid gap-4 w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { label: 'Donors Registered', value: donors, suffix: '+', icon: '🩸' },
            { label: 'Partner Hospitals', value: hospitals, suffix: '+', icon: '🏥' },
            { label: 'NFTs Minted', value: nfts, suffix: '+', icon: '🎖️' },
            { label: 'Lives Saved', value: lives, suffix: '+', icon: '❤️' },
          ].map((stat, i) => (
            <div
              key={i}
              ref={stat.value.ref}
              className="group relative bg-slate-800/70 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 text-center hover:border-secondary/40 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl md:text-3xl font-bold text-gradient">
                {stat.value.count.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FEATURE HIGHLIGHTS STRIP ═══════════ */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Blockchain Verified',
              desc: 'Every donation is permanently recorded on the Hive blockchain for absolute transparency and trust.',
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              color: 'purple' as const,
            },
            {
              title: 'NFT Certificates',
              desc: 'Receive unique, tradeable digital certificates as proof of your life-saving contribution.',
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A5.99 5.99 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A5.99 5.99 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a17.106 17.106 0 01-3.77.547m3.77-.547a17.07 17.07 0 003.77-.547" />
                </svg>
              ),
              color: 'pink' as const,
            },
            {
              title: 'Multi-Role Platform',
              desc: 'Purpose-built dashboards for Government agencies, Hospitals, and Blood donors — all seamlessly connected.',
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              ),
              color: 'blue' as const,
            },
          ].map((feat, i) => {
            const colorMap: Record<'purple' | 'pink' | 'blue', string> = {
              purple: 'from-secondary/20 to-secondary/5 border-secondary/20 text-secondary-light',
              pink: 'from-secondary-dark/20 to-secondary-dark/5 border-secondary-dark/20 text-secondary-light',
              blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-400',
            };
            const colors = colorMap[feat.color];
            return (
              <div
                key={i}
                className={`relative bg-gradient-to-br ${colors.split(' ').slice(0, 2).join(' ')} backdrop-blur-md border ${colors.split(' ')[2]} rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-4 ${colors.split(' ').slice(-1)[0]}`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS (existing — preserved) ═══════════ */}
      <div className="py-16 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/80 p-6 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">For Government</h3>
            <p className="text-slate-400 text-center">
              Add hospitals to the system, manage their credentials, and monitor blood donation activities.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-secondary-dark/20 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">For Hospitals</h3>
            <p className="text-slate-400 text-center">
              Verify blood donations, issue NFTs to donors, and contribute to a transparent donation ecosystem.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">For Users</h3>
            <p className="text-slate-400 text-center">
              Donate blood, receive NFTs as proof, and redeem them for benefits from participating organizations.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input type="text" className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
              <textarea rows={4} className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary-dark text-white font-medium transition-all shadow-lg hover:shadow-secondary/20">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
