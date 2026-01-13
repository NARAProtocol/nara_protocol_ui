import React from 'react';

interface DAppButtonProps {
  href: string;
  isEnabled: boolean;
  className?: string;
}

export const DAppButton: React.FC<DAppButtonProps> = ({ 
  href, 
  isEnabled,
  className = '' 
}) => {
  if (!isEnabled) {
    return (
      <button 
        className={`dapp-button dapp-button--disabled ${className}`}
        disabled
        aria-label="App launching soon"
      >
        <span className="dapp-button-text">Coming Soon</span>
      </button>
    );
  }

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`dapp-button dapp-button--active ${className}`}
      aria-label="Enter the NARA app"
    >
      <span className="dapp-button-text">Enter App</span>
      <span className="dapp-button-arrow" aria-hidden="true">→</span>
    </a>
  );
};

export default DAppButton;
