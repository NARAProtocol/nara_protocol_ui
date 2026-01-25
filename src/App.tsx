import React from 'react';
import { LinkItem } from './types';
import { CountdownTimer } from './components/CountdownTimer';
import { DAppButton } from './components/DAppButton';
import { useCountdown } from './hooks/useCountdown';

// Launch: January 28, 2026 at 15:00 Lithuanian time (EET, UTC+2)
const LAUNCH_DATE = new Date('2026-01-28T15:00:00+02:00');
const DAPP_URL = 'https://www.naraprotocol.com';

const LINKS: LinkItem[] = [
  {
    label: 'Docs',
    url: 'https://github.com/NARAProtocol/nara_protocol',
    displayText: 'https://github.com/NARAProtocol/nara_protocol'
  },
  {
    label: 'X',
    url: 'https://x.com/NARA_protocol',
    displayText: 'https://x.com/NARA_protocol'
  },
  {
    label: 'Farcaster',
    url: 'https://warpcast.com/naraprotocol',
    displayText: '@naraprotocol'
  }
];

const ExternalLink: React.FC<{ item: LinkItem }> = ({ item }) => (
  <div className="flex flex-col sm:flex-row sm:gap-2 text-base">
    <span className="font-bold sm:font-normal sm:w-24 shrink-0">{item.label}:</span>
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="underline decoration-1 underline-offset-4 hover:decoration-white/50 transition-colors break-all"
    >
      {item.displayText}
    </a>
  </div>
);

const App = () => {
  const { isComplete } = useCountdown(LAUNCH_DATE);

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-6 md:p-12 font-mono selection:bg-white selection:text-black">
      <div className="max-w-3xl w-full space-y-12 md:space-y-16">
        
        {/* Header Section */}
        <header className="space-y-4 md:space-y-6 text-center select-none cursor-default">
          <div className="flex justify-center items-center gap-3">
            <h1 className="flex items-center">
              <span className="bg-white text-black px-2 py-0.5 text-4xl md:text-5xl font-bold tracking-tighter font-sans">
                NARA
              </span>
              <span className="text-white text-2xl md:text-3xl font-mono lowercase pl-3">
                protocol
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-mono">
            Competitive token issuance on Base.
          </p>
        </header>

        {/* Countdown Timer Section */}
        <section className="flex justify-center">
          <CountdownTimer targetDate={LAUNCH_DATE} />
        </section>

        {/* CTA Button Section */}
        <section className="flex justify-center">
          <DAppButton href={DAPP_URL} isEnabled={false} />
        </section>

        {/* Core Mechanics Section */}
        <section className="space-y-2 text-lg md:text-xl opacity-90 text-center">
          <p>Tokens are released only when ETH is committed.</p>
          <p>If participation is zero, issuance is zero.</p>
        </section>

        {/* Links Section */}
        <section className="space-y-3 pt-4">
          {LINKS.map((link) => (
            <ExternalLink key={link.label} item={link} />
          ))}
        </section>

        {/* Footer Status Section */}
        <footer className="pt-8 md:pt-12 space-y-2 text-sm md:text-base text-gray-400">
          <p>
            <span className="text-white">Status:</span> {isComplete ? 'Coming Soon' : 'pre-deployment'}
          </p>
          <p>
            Experimental. No guarantees.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default App;