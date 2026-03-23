import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EpochTimer } from './components/EpochTimer';

const APP_URL  = '/mine';
const DOCS_URL = 'https://github.com/NARAProtocol/nara_protocol';

// â”€â”€ Animated number count-up â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useCountUp(target: number, duration = 900, delay = 0) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const rafRef = useRef<number>(0);

  const run = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now() + delay;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return { value, run };
}

// â”€â”€ IntersectionObserver trigger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// â”€â”€ Snapshot row with count-up â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface SnapRowProps {
  label: string;
  countTarget: number;
  suffix?: string;
  delay?: number;
  inView: boolean;
}

function SnapRow({ label, countTarget, suffix = '', delay = 0, inView }: SnapRowProps) {
  const { value, run } = useCountUp(countTarget, 900, delay);

  useEffect(() => {
    if (inView) run();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayValue = inView
    ? value.toLocaleString() + suffix
    : '0' + suffix;

  return (
    <div
      className={`snap-row ${inView ? 'snap-row--visible' : ''}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <span className="snap-row__label">{label}</span>
      <span className="snap-row__value">{displayValue}</span>
    </div>
  );
}

// â”€â”€ Main App â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  const { ref: snapRef, inView: snapInView } = useInView(0.1);
  const { ref: edgesRef, inView: edgesInView } = useInView(0.1);

  return (
    <div className="page">
      {/* Background bloom */}
      <div className="bg-bloom" aria-hidden="true" />

      {/* â”€â”€ Nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav className="nav">
        <div className="nav__logo">
          <span className="nav__mark">NARA</span>
          <span className="nav__sub">protocol</span>
        </div>

        <div className="nav__right">
          <div className="nav__pill">
            <span className="live-dot" aria-hidden="true" />
            Base mainnet live
          </div>
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="nav__link">
            Docs
          </a>
        </div>
      </nav>

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <main className="hero">
        <div className="hero__left">
          {/* Eyebrow */}
          <div className="eyebrow">
            <span className="live-dot live-dot--accent" aria-hidden="true" />
            FIXED SUPPLY. SEALED RESERVES. LIVE ON BASE.
          </div>

          {/* Headline */}
          <h1 className="headline">
            <span className="headline__line headline__line--1">Hard supply.</span>
            <span className="headline__line headline__line--2">Patient yield.</span>
          </h1>

          {/* Sub */}
          <p className="hero__sub">
            Lock NARA. Earn ETH every epoch.<br />
            700,000 sealed by code - not by promise.
          </p>

          {/* CTAs */}
          <div className="cta-group">
            <a href={APP_URL} className="btn btn--primary">
              Open App
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              Read Docs
            </a>
          </div>
        </div>

        {/* â”€â”€ Protocol Snapshot sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <aside className="snapshot" ref={snapRef}>
          <div className="snapshot__header">
            <span className="snapshot__title">Protocol Snapshot</span>
            <span className="snapshot__chain">Base</span>
          </div>

          <div className="snapshot__rows">
            <SnapRow
              label="Fixed Supply"
              countTarget={1000000}
              suffix=" NARA"
              delay={0}
              inView={snapInView}
            />
            <SnapRow
              label="Sealed Reserves"
              countTarget={700000}
              suffix=" NARA"
              delay={120}
              inView={snapInView}
            />
            <SnapRow
              label="Epoch Length"
              countTarget={15}
              suffix=" min"
              delay={240}
              inView={snapInView}
            />
            <SnapRow
              label="Locker Weight"
              countTarget={2}
              suffix="x quadratic"
              delay={360}
              inView={snapInView}
            />
          </div>

          {/* Live epoch counter */}
          <div className="snapshot__epoch">
            <div className="snapshot__epoch-label">EPOCHS - 15m on Base</div>
            <EpochTimer />
          </div>

          {/* Trust link */}
          <a
            href="https://basescan.org/token/0xE444de61752bD13D1D37Ee59c31ef4e489bd727C"
            target="_blank"
            rel="noopener noreferrer"
            className="snapshot__scan"
          >
            <span className="live-dot live-dot--dim" aria-hidden="true" />
            Verified on BaseScan {"->"}
          </a>
        </aside>
      </main>

      {/* â”€â”€ Protocol Edges â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="edges" ref={edgesRef}>
        <div className="edges__label">Protocol Edges</div>

        <div className="edges__grid">
          {[
            {
              tag: 'Supply',
              title: '1,000,000. Fixed. Forever.',
              body: 'No mint function after deployment. The supply cannot change.',
              delay: 0,
            },
            {
              tag: 'Reserve',
              title: '700,000 sealed by code.',
              body: 'Team cannot withdraw. Only releases epoch by epoch, earned by lockers.',
              delay: 120,
            },
            {
              tag: 'Yield',
              title: 'ETH from real activity.',
              body: 'Bond purchases route ETH to lockers. Revenue-driven, not inflationary.',
              delay: 240,
            },
            {
              tag: 'Weight',
              title: 'Quadratic duration.',
              body: '2x the lock time earns dramatically more than 2x rewards. Time has real value.',
              delay: 360,
            },
          ].map((edge) => (
            <div
              key={edge.tag}
              className={`edge ${edgesInView ? 'edge--visible' : ''}`}
              style={{ '--delay': `${edge.delay}ms` } as CSSProperties}
            >
              <span className="edge__tag">{edge.tag}</span>
              <strong className="edge__title">{edge.title}</strong>
              <p className="edge__body">{edge.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer className="footer">
        <div className="footer__links">
          {[
            { label: 'X', href: 'https://x.com/NARA_protocol' },
            { label: 'Farcaster', href: 'https://warpcast.com/naraprotocol' },
            { label: 'GitHub', href: DOCS_URL },
            {
              label: 'Contract',
              href: 'https://basescan.org/token/0xE444de61752bD13D1D37Ee59c31ef4e489bd727C',
            },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer__link">
              {l.label}
            </a>
          ))}
        </div>
        <p className="footer__notice">Experimental. No guarantees.</p>
      </footer>
    </div>
  );
}


