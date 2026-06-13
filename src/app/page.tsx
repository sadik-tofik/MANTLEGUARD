import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Activity, Zap, Lock, Globe, Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCounter from '@/components/StatsCounter';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import RecentAuditsFeed from '@/components/RecentAuditsFeed';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden pt-20">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10">
        {/* Section 1: Hero */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI DevTools — Mantle Network
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            INSTANT SMART CONTRACT<br />
            <span className="text-emerald-500">SECURITY AUDITS.</span>
          </h1>
          
          <p className="text-white/40 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Powered by Llama 3.3 70B & Groq. Verified forever on Mantle. Get deep security reports with cryptographic proofs in under 10 seconds.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link 
              href="/audit" 
              className="px-8 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl rounded-2xl transition-all shadow-2xl shadow-emerald-500/20 active:scale-95 flex items-center gap-3"
            >
              Audit Your Contract
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link 
              href="/audit?example=true" 
              className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xl rounded-2xl transition-all active:scale-95"
            >
              View Live Example
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 opacity-40 animate-in fade-in duration-1000 delay-500 font-black uppercase tracking-widest text-[10px]">
            <div className="flex items-center gap-2 justify-center"><ShieldCheck className="w-4 h-4" /> AI Analysis</div>
            <div className="flex items-center gap-2 justify-center"><Lock className="w-4 h-4" /> On-Chain Proof</div>
            <div className="flex items-center gap-2 justify-center"><Zap className="w-4 h-4" /> 10s Results</div>
            <div className="flex items-center gap-2 justify-center"><Globe className="w-4 h-4" /> Free Forever</div>
            <div className="flex items-center gap-2 justify-center"><Terminal className="w-4 h-4" /> Mantle Native</div>
          </div>
        </section>

        {/* Section 2: Key Stats */}
        <section className="bg-white/[0.01] border-y border-white/5 py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCounter value="10" label="Audit Time" sublabel="vs 2-4 weeks manual" suffix="s" prefix="< " />
              <StatsCounter value="0" label="Cost to Audit" sublabel="vs $5k-$50k firms" prefix="$" />
              <StatsCounter value="100" label="On-Chain" sublabel="via Mantle Network" suffix="%" />
              <StatsCounter value="50" label="Vulnerabilities" sublabel="including Mantle-specific" suffix="+" />
            </div>
          </div>
        </section>

        {/* Section 3: Feature Cards */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">WHY MANTLEGUARD?</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">The gold standard for automated smart contract security in the Mantle ecosystem.</p>
          </div>
          <FeatureCards />
        </section>

        {/* Section 4: How It Works */}
        <section id="how-it-works" className="bg-[#050508] py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">How It works</h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto">From terminal to blockchain in three simple steps.</p>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* Section 5: Recent Audits Live Feed */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Recent Audits <br />
                <span className="text-emerald-500">Live Feed</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed">
                Real-time visibility into the Mantle ecosystem security landscape. Every entry below is a live event pulled directly from the Mantle Sepolia network.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">5003</span>
                  <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Chain ID</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">Mantle</span>
                  <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Sepolia Testnet</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-50" />
              <div className="relative bg-[#0a0a0f] border border-white/10 rounded-[32px] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-xs font-black uppercase tracking-widest text-white/40">Network Activity</span>
                   </div>
                   <Activity className="w-4 h-4 text-emerald-500/50" />
                </div>
                <RecentAuditsFeed />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center relative overflow-hidden">
           <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                Ready to secure <br />
                your contract?
              </h2>
              <p className="text-white/40 text-lg md:text-2xl max-w-2xl mx-auto font-medium">
                Join the developers building securely on Mantle. <br />
                Free forever. Results in 10 seconds.
              </p>
              <Link 
                href="/audit" 
                className="inline-flex px-12 py-6 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-2xl rounded-2xl transition-all shadow-2xl shadow-emerald-500/20 active:scale-95 items-center gap-4"
              >
                Audit Your Contract Now
                <ArrowRight className="w-8 h-8" />
              </Link>
           </div>
           
           {/* Decorative background for CTA */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-emerald-500/5 blur-[150px] rounded-full -z-10" />
        </section>

        <Footer />
      </div>
    </main>
  );
}
