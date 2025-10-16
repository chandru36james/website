import React from 'react';

export interface NavLink {
  name: string;
  path: string;
}

export interface Category {
  name: string;
  path: string;
  imageUrl?: string;
}

export interface Product {
  name: string;
  category: string;
  description: string;
  specs: string;
  imageUrl: string;
  origin?: string;
  uses?: string;
  nutrition?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface SocialLink {
  name: string;
  icon: React.ReactElement;
  path: string;
}

export interface SearchResult {
  type: 'Product';
  path: string;
  title: string;
  category: string;
  imageUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  imageUrl: string;
  content: React.ReactElement;
  excerpt: string;
}
