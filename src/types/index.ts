
import React from 'react';


export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface EmergencyAlert {
  id: number;
  title: string;
  description: string;
  location: string;
  severity: 'KRITIS' | 'DARURAT' | 'TINGGI' | 'PERHATIAN';
  time: string;
  type: 'mining' | 'fire' | 'pollution' | 'deforestation';
  icon: IconType;
  color: string;
  bgGradient: string;
  accentColor: string;
  stats: string;
  image: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: IconType;
  badge?: boolean;
}

export interface EnvironmentalData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'danger';
  location: string;
  lastUpdated: Date;
}

export interface ContactInfo {
  icon: IconType;
  text?: string;
  name?: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon: IconType;
  href: string;
  color: string;
}

export interface FooterLink {
  name: string;
  href: string;
}