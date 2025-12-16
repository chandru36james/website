import { ReactNode, ElementType } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface AreaItem {
  name: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PriceItem {
  category: string;
  bata?: string;
  services: {
    name: string;
    price: string;
    note?: string;
  }[];
}

export interface GalleryItem {
  url: string;
  alt: string;
}

export interface DestinationItem {
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  comment: string;
  location: string;
}