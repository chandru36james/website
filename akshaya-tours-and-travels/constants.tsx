import React from 'react';
import { Car, MapPin, Plane, UserCheck } from 'lucide-react';
import { AreaItem, FAQItem, ServiceItem, PriceItem, GalleryItem, DestinationItem, ReviewItem } from './types';

// Business Information
export const BUSINESS_NAME = "Akshaya Tours and Travels";
export const PHONE_NUMBER = "+91 81241 02526";
export const PHONE_NUMBER_SECONDARY = "+91 99402 79442";
export const WHATSAPP_NUMBER = "918124102526"; // No spaces for link
export const ADDRESS = "No 34 pandiyarajan street, main road, Selaiyur, CH-73";

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://www.facebook.com/share/1Be8Auhv3D/",
  INSTAGRAM: "https://www.instagram.com/akshaya_travels__/",
  YOUTUBE: "https://youtube.com/@ak.travels_vlog?si=VhTD8n7qjQRWjxhZ"
};

// Routes (Hash Links for Single Page App)
export const ROUTES = {
  HOME: '#home',
  ABOUT: '#about',
  SERVICES: '#services',
  DESTINATIONS: '#destinations',
  PRICING: '#pricing',
  GALLERY: '#gallery',
  AREAS: '#areas',
  CONTACT: '#contact',
};

// Services Data
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'local-taxi',
    title: 'Vehicle Rentals in Tambaram',
    description: 'Premier Vehicle Rentals in Tambaram for local commute. We are the best travels in Tambaram offering safe and sanitized vehicles for daily needs.',
    icon: Car,
  },
  {
    id: 'airport-transfer',
    title: 'Domestic Travels & Airport',
    description: 'Specialists in Domestic Travels in Tambaram with 24/7 Airport Pickup and Drop. Serving East Tambaram and nearby areas.',
    icon: Plane,
  },
  {
    id: 'outstation',
    title: 'Tempo Traveller & Mini Bus',
    description: 'Looking for Bus Travels in Tambaram? We arrange Tempo Travellers and Vans for family trips. Outstation packages available.',
    icon: MapPin,
  },
  {
    id: 'corporate',
    title: 'Tour Packages',
    description: 'Customized Domestic Tour Packages and Outstation trips. Experience the best travels in Tambaram service quality.',
    icon: UserCheck,
  },
];

// Areas Data
export const AREAS_LIST: AreaItem[] = [
  { name: 'Selaiyur', description: 'Camp Road junction, Bharat University, and Madambakkam areas.' },
  { name: 'West Tambaram', description: 'Complete coverage near Railway Station and Mudichur Road.' },
  { name: 'East Tambaram', description: 'Serving MCC College area, Velachery Main Road, and surroundings.' },
  { name: 'Chromepet', description: 'Quick pickup near MIT Bridge, Radha Nagar, and Hasthinapuram.' },
  { name: 'Pallavaram', description: 'Airport proximity services and Cantonment area coverage.' },
  { name: 'Medavakkam', description: 'Connecting OMR and Tambaram with reliable transport fleets.' },
  { name: 'Perungalathur', description: 'Gateway to Chennai south, serving IT parks and residential hubs.' },
];

// Price Data
export const PRICE_LIST: PriceItem[] = [
  {
    category: "Sedan & SUV Tariffs",
    bata: "Driver Bata: ₹500 - ₹600 (Outstation)",
    services: [
      { name: "Etios Local (5h/50km)", price: "₹1400", note: "Extra Hr: ₹350" },
      { name: "Innova Local (5h/50km)", price: "₹1800", note: "Extra Hr: ₹300, Km: ₹18" },
      { name: "Etios Outstation", price: "₹14/km (AC)", note: "Non-AC: ₹13" },
      { name: "Innova Outstation", price: "₹18/km (AC)", note: "Min 250km/day" },
    ]
  },
  {
    category: "Tempo Traveller (12/14 Pax)",
    bata: "Driver Bata: ₹800/Day",
    services: [
      { name: "Local Package (5h/50km)", price: "AC ₹3000", note: "Non-AC: ₹2800" },
      { name: "Local Extras", price: "₹500/hr", note: "Extra Km: ₹21" },
      { name: "One Day Package", price: "₹7500", note: "Local Use Only" },
      { name: "Outstation", price: "₹21/km (AC)", note: "Non-AC: ₹20" },
    ]
  },
  {
    category: "Mini Bus (21 & 25 Pax)",
    bata: "Driver Bata: ₹900/Day",
    services: [
      { name: "21 Seater Local (5h/50km)", price: "AC ₹4000", note: "Non-AC: ₹3500" },
      { name: "21 Seater Outstation", price: "AC ₹27/km", note: "Non-AC: ₹24/km" },
      { name: "25 Seater Local (5h/50km)", price: "AC ₹4500", note: "Non-AC: ₹4000" },
      { name: "25 Seater Outstation", price: "AC ₹31/km", note: "Non-AC: ₹28" },
    ]
  },
];

// Gallery Data
export const GALLERY_IMAGES: GalleryItem[] = [
  { url: "https://akshayatoursandtravels.com/assets/1.png", alt: "White Swift Dzire Travels in Tambaram" },
  { url: "https://akshayatoursandtravels.com/assets/2.png", alt: "Clean & Premium Vehicle Interior Chennai" },
  { url: "https://akshayatoursandtravels.com/assets/3.png", alt: "Innova Crysta Outstation Service Chennai" },
  { url: "https://akshayatoursandtravels.com/assets/4.png", alt: "Airport Pickup and Drop Tambaram Travels" },
  { url: "https://akshayatoursandtravels.com/assets/5.png", alt: "Local Travel Service Tambaram Selaiyur" },
  { url: "https://akshayatoursandtravels.com/assets/6.png", alt: "Corporate Travel Service in Tambaram" },
  { url: "https://akshayatoursandtravels.com/assets/7.png", alt: "Professional Driver for Outstation Tours" },
  { url: "https://akshayatoursandtravels.com/assets/8.png", alt: "Domestic Travels in Tambaram Family Tour" },
  { url: "https://akshayatoursandtravels.com/assets/9.png", alt: "24/7 Travel Service in Tambaram" },
  { url: "https://akshayatoursandtravels.com/assets/10.png", alt: "Spacious SUV Vehicle for Family Trips" },
  { url: "https://akshayatoursandtravels.com/assets/11.png", alt: "Luxury Wedding Vehicle Rental Chennai" },
  { url: "https://akshayatoursandtravels.com/assets/12.png", alt: "Bus Travels in Tambaram Tempo Traveller" },
];

// FAQ Data
export const FAQS: FAQItem[] = [
  {
    question: "What is the Tambaram Travels Contact Number?",
    answer: "You can reach Akshaya Tours and Travels at +91 81241 02526. We are the best travels in Tambaram available 24/7 for bookings."
  },
  {
    question: "Do you offer Bus Travels in Tambaram?",
    answer: "Yes, we arrange Bus Travels in Tambaram and Tempo Travellers for larger groups, family functions, and outstation trips."
  },
  {
    question: "Are you offering Domestic Travels in Tambaram?",
    answer: "Yes, we are specialists in Domestic Travels in Tambaram. We organize complete tour packages to Ooty, Kodaikanal, Tirupati, and more."
  },
  {
    question: "Do you have services for Travels in East Tambaram?",
    answer: "Yes, we cover Travels in East Tambaram, West Tambaram, Selaiyur, Chromepet, and all nearby areas with quick pickup."
  },
  {
    question: "How can I find travels near me?",
    answer: "If you are in Chennai South, just search for 'travels near me' or call Akshaya Tours and Travels. We will be at your doorstep in minutes."
  }
];

// Destinations List
export const DESTINATIONS_LIST: DestinationItem[] = [
  {
    title: "Chennai Local Tourist Place",
    description: "Experience the vibrant culture, historic landmarks and scenic spots of Chennai. Full day city tour.",
    image: "https://akshayatoursandtravels.com/assets/chennai.png",
    category: "City Tour",
    duration: "1 Day",
    price: "From ₹2500"
  },
  {
    title: "Mahabalipuram Trip",
    description: "Explore the iconic UNESCO world heritage sites, ancient rock-cut temples and beaches.",
    image: "https://akshayatoursandtravels.com/assets/mahabs.png",
    category: "Heritage",
    duration: "1 Day",
    price: "From ₹3000"
  },
  {
    title: "Airport Pickup & Drops",
    description: "Reliable, comfortable, and punctual airport transfer services to Chennai Airport (MAA).",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    category: "Transfer",
    duration: "2-3 Hours",
    price: "From ₹800"
  },
  {
    title: "Arupadai Veedu Temple Tour",
    description: "Visit the six sacred abodes of Lord Murugan. A divine spiritual experience tailored for families.",
    image: "https://akshayatoursandtravels.com/assets/murugan.png",
    category: "Pilgrimage",
    duration: "3-4 Days",
    price: "Custom Quote"
  },
  {
    title: "Ooty & Kodaikanal Hills",
    description: "Revel in the misty landscapes, lush tea gardens, serene lakes and famous Guna Caves.",
    image: "https://akshayatoursandtravels.com/assets/kolli.png",
    category: "Hill Station",
    duration: "3 Days / 2 Nights",
    price: "From ₹12,000"
  },
  {
    title: "Yercaud, Munnar & Coorg",
    description: "Relax amidst the peaceful misty hills, coffee plantations, and charming waterfalls.",
    image: "https://akshayatoursandtravels.com/assets/hills.png",
    category: "Nature",
    duration: "3 Days / 2 Nights",
    price: "From ₹14,000"
  },
  {
    title: "Kerala & Karnataka Trips",
    description: "Alappuzha Houseboating, Hill stations, and Adventure tours across states.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
    category: "Adventure",
    duration: "5 Days / 4 Nights",
    price: "Custom Quote"
  }
];

// Customer Reviews
export const REVIEWS_LIST: ReviewItem[] = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Excellent service for outstation trip to Pondicherry. The driver was very polite and the Innova was spotless.",
    location: "Tambaram"
  },
  {
    name: "Anita S.",
    rating: 5,
    comment: "Booked a Tempo Traveller for our family temple tour. Very spacious and comfortable journey. Highly recommend Akshaya Travels!",
    location: "Chromepet"
  },
  {
    name: "Praveen D.",
    rating: 4,
    comment: "On-time airport pickup at 3 AM. Very reliable service in Selaiyur area. Reasonable pricing compared to apps.",
    location: "Selaiyur"
  },
  {
    name: "Karthik Raja",
    rating: 5,
    comment: "Best travels in Tambaram for corporate booking. We use them regularly for employee transport.",
    location: "MEPZ"
  },
  {
    name: "Lakshmi Narayanan",
    rating: 5,
    comment: "Arranged a bus for our marriage function guest transport. Everything was managed perfectly on time.",
    location: "West Tambaram"
  },
  {
    name: "Suresh Babu",
    rating: 5,
    comment: "Used their Etios for local city usage. Driver knew all the routes well and saved us a lot of time.",
    location: "Perungalathur"
  }
];