'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Verify Audit', href: '/verify' },
    { name: 'Audit History', href: '/history' },
    { name: 'GitHub', href: 'https://github.com/sadik-tofik/MANTLEGUARD', external: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            MANTLE<span className="text-emerald-500">GUARD</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-emerald-400' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/audit"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-xl transition-all active:scale-95"
          >
            Start Auditing
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black/95 backdrop-blur-2xl z-40 p-6 animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-white/80 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/audit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-emerald-500 text-black text-center text-lg font-black rounded-2xl"
            >
              Start Auditing
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
