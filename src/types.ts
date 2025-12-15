import React from 'react';

export interface LinkItem {
  label: string;
  url: string;
  displayText: string;
}

export interface SectionProps {
  className?: string;
  children: React.ReactNode;
}