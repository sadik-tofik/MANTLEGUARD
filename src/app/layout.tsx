import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jbMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-jb-mono',
});

export const metadata: Metadata = {
  title: 'MantleGuard — AI Smart Contract Auditor',
  description: 'AI-powered smart contract security auditing with permanent on-chain proof on Mantle Network.',
  keywords: ['Mantle', 'AI', 'Smart Contract', 'Audit', 'Security', 'Blockchain', 'DevTools'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jbMono.variable} font-mono bg-[#080c10] text-white selection:bg-emerald-500/30`}>
        {children}
      </body>
    </html>
  );
}
