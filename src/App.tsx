import React from 'react';
import { LinkItem } from './types';

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
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-6 md:p-12 font-mono selection:bg-white selection:text-black">
      <div className="max-w-3xl w-full space-y-16">
        
        {/* Header Section */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            NARA
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed">
            Competitive token issuance on Base.
          </p>
        </header>

        {/* Core Mechanics Section */}
        <section className="space-y-2 text-lg md:text-xl opacity-90">
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
        <footer className="pt-12 space-y-2 text-sm md:text-base text-gray-400">
          <p>
            <span className="text-white">Status:</span> pre-deployment
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