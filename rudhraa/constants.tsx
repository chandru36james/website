
import React from 'react';
import { NavLink, Category, Product, Testimonial, SocialLink } from './types';

export const ICONS = {
  email: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  phone: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
  location: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  globe: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.25 9.75h17.5M3.25 14.25h17.5M12 2.25c-3.125 0-5.625 4.365-5.625 9.75s2.5 9.75 5.625 9.75S17.625 17.635 17.625 12 15.125 2.25 12 2.25z" /></svg>,
  categories: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  delivery: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.25 9.75h17.5M3.25 14.25h17.5M12 2.25c-3.125 0-5.625 4.365-5.625 9.75s2.5 9.75 5.625 9.75S17.625 17.635 17.625 12 15.125 2.25 12 2.25z" /></svg>,
  experience: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {/* People */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a3 3 0 100 6 3 3 0 000-6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 12a5 5 0 00-10 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7a2 2 0 100 4 2 2 0 000-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 14a3.5 3.5 0 00-7 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 7a2 2 0 100 4 2 2 0 000-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 14a3.5 3.5 0 00-7 0" />
      {/* Stars */}
      <g transform="translate(9.5 15) scale(0.25)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.418a.563.563 0 00.475-.31L11.48 3.5z" />
      </g>
      <g transform="translate(4 17) scale(0.2)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.418a.563.563 0 00.475-.31L11.48 3.5z" />
      </g>
      <g transform="translate(15 17) scale(0.2)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.418a.563.563 0 00.475-.31L11.48 3.5z" />
      </g>
    </svg>
  ),
  farming: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  quality: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      {/* Ribbon part */}
      <path d="M8.21 15.89L7 23l5-3 5 3-1.21-7.12" />
      {/* Medal with star cutout */}
      <path fillRule="evenodd" d="M12 17a7 7 0 100-14 7 7 0 000 14zm-.965-11.621a.562.562 0 011.04 0l.965 2.321a.563.563 0 00.475.31h2.468a.563.563 0 01.321.988l-1.99 1.71a.563.563 0 00-.182.557l.67 2.45a.562.562 0 01-.84.61l-2.14-1.306a.563.563 0 00-.586 0L8.03 15.54a.562.562 0 01-.84-.61l.67-2.45a.562.562 0 00-.182-.557l-1.99-1.71a.563.563 0 01.321.988h2.468a.563.563 0 00.475.31l.965-2.322z" clipRule="evenodd" />
    </svg>
  ),
  packaging: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  arrowRight: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
  quote: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6H6.75A2.25 2.25 0 004.5 8.25v4.5A2.25 2.25 0 006.75 15h3.75m7.5-6H17.25a2.25 2.25 0 00-2.25 2.25v4.5a2.25 2.25 0 002.25 2.25h3.75" /></svg>,
  partnership: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.226c-3.421 0-6.22-2.799-6.22-6.22s2.799-6.22 6.22-6.22 6.22 2.799 6.22 6.22m-12.44 0c0 3.421 2.799 6.22 6.22 6.22" /></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>,
  arrowUp: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>,
  instagram: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>,
  linkedin: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>,
  deliveryTruck: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V9.75c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504-1.125-1.125-1.125H18.375m-15-9h15" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0V9" /></svg>,
  star: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.418a.563.563 0 00.475-.31L11.48 3.5z" /></svg>,
  smiley: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" /></svg>,
  store: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25a.75.75 0 01-.75-.75v-12.75c0-.414.336-.75.75-.75h19.5c.414 0 .75.336.75.75v12.75c0 .414-.336.75-.75.75h-4.5m-4.5 0v-7.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21m-4.5 0h4.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l.75-5.25h9l.75 5.25" /></svg>,
  thumbsUp: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.425 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0118 4.5v1.518c0 .387.237.74.625.908l2.25.75a2.25 2.25 0 011.625 2.15v4.218c0 .387-.237.74-.625.908l-2.25.75a2.25 2.25 0 01-1.625 2.15v4.218a2.25 2.25 0 01-2.25 2.25h-5.318a2.25 2.25 0 01-2.121-1.588l-1.127-4.243a.75.75 0 01.19-.763c.27-.24.59-.42.934-.555.343-.135.712-.2 1.08-.2zM9 15.188l1.121-4.206"></path></svg>,
  machinery: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4.5 4.5M9 9l4.5 4.5M9 9V3.75M9 9H3.75m11.25 6.75L15 20.25m0 0l4.5-4.5M15 20.25V15m0 5.25H9.75M4.5 9l4.5 4.5M4.5 9H9.75m-5.25 5.25l4.5-4.5m4.5 4.5l4.5-4.5m-4.5 4.5v-5.25m4.5 5.25h5.25"></path></svg>,
  trophy: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.05-1.05A5.25 5.25 0 0112 15.75a5.25 5.25 0 014.45-2.7A9.75 9.75 0 0016.5 18.75z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3 3 0 100-6 3 3 0 000 6z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  search: <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>,
  vision: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>,
  ventures: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6A2.25 2.25 0 0115.75 3.75h2.25A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 01-2.25 2.25h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75A2.25 2.25 0 0115.75 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>,
  ethics: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>,
  policy: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m-3-3a3 3 0 00-3 3" /></svg>,
  logistics: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21.75l4.5-4.5-4.5-4.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V9.75c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125H18.375m-15-9h15" /></svg>,
  expertise: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.05-1.05A5.25 5.25 0 0112 15.75a5.25 5.25 0 014.45-2.7A9.75 9.75 0 0016.5 18.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V9.75m0 0l3-3m-3 3l-3-3m3 3V3.75M9 6.75h6" /></svg>,
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', icon: ICONS.linkedin, path: 'https://www.linkedin.com/company/rudhraa-exports-and-imports/' },
  { name: 'Instagram', icon: ICONS.instagram, path: 'https://www.instagram.com/rudhraa_exim/' },
];

// Navigation
export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

export const CATEGORIES: Category[] = [
  { name: 'Fruits', path: '/category/fruits', imageUrl: 'https://rudhraaexportsandimports.com/images/fruits.jpg' },
  { name: 'Vegetables', path: '/category/vegetables', imageUrl: 'https://rudhraaexportsandimports.com/images/vegetables.jpg' },
  { name: 'Spices', path: '/category/spices', imageUrl: 'https://rudhraaexportsandimports.com/images/spices.jpg' },
  { name: 'Powdered Spices', path: '/category/powdered-spices', imageUrl: 'https://rudhraaexportsandimports.com/images/powder.jpg' },
  { name: 'Cereals & Pulses', path: '/category/cereals-pulses', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals.webp' },
  { name: 'Coconut & Coir Products', path: '/category/coconut-coir', imageUrl: 'https://rudhraaexportsandimports.com/images/coconut.webp' },
  { name: 'Moringa', path: '/category/moringa', imageUrl: 'https://rudhraaexportsandimports.com/images/moringa.webp' },
];

// WhatsApp Configuration
const WHATSAPP_NUMBER = '+917373745695'; // Use the same number as header/footer
const WHATSAPP_GREETING = 'Hello! I am interested in your products and would like to request a quote.';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Rudhraa Exports has been a game-changer for our business. Their produce is consistently fresh, and their delivery is always on time. A truly reliable partner.",
    author: "John Doe",
    company: "Global Foods Inc."
  },
  {
    quote: "The quality of spices we source from Rudhraa is unmatched. Their commitment to quality control is evident in every shipment. Highly recommended.",
    author: "Jane Smith",
    company: "Spice World LLC"
  },
  {
    quote: "Working with Venkateshwaran and his team has been a pleasure. They are professional, responsive, and truly understand the needs of their international clients.",
    author: "Ahmed Al-Farsi",
    company: "Middle East Trading"
  }
];

// Products Data
export const PRODUCTS: Product[] = [
  // Fruits
  { name: 'Pomegranate', category: 'fruits', description: 'Rich nutritional value and medicinal properties.', specs: 'Varieties: Bhagwa, Ganesh. Packaging: 5kg/10kg cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/f1.webp' },
  { name: 'Orange', category: 'fruits', description: 'Rich vitamin C content and refreshing taste.', specs: 'Varieties: Nagpur, Khasi. Packaging: 10kg cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/f2.webp' },
  { name: 'Apple', category: 'fruits', description: 'Nutritional value and long shelf life.', specs: 'Varieties: Royal Gala, Granny Smith. Packaging: 20kg boxes.', imageUrl: 'https://rudhraaexportsandimports.com/images/f3.webp' },
  { name: 'Banana', category: 'fruits', description: 'High demand and nutritional value.', specs: 'Varieties: Cavendish, Robusta. Packaging: 13.5kg cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/f4.webp' },
  { name: 'Mango', category: 'fruits', description: 'Valued for its rich taste and aroma.', specs: 'Varieties: Alphonso, Kesar. Packaging: 3kg/5kg boxes.', imageUrl: 'https://rudhraaexportsandimports.com/images/f5.webp' },
  { name: 'Grapes', category: 'fruits', description: 'Rich taste, nutritional value, and versatility.', specs: 'Varieties: Thompson Seedless, Flame. Packaging: 5kg punnets.', imageUrl: 'https://rudhraaexportsandimports.com/images/f6.webp' },
  { name: 'Papaya', category: 'fruits', description: 'Rich nutritional value and medicinal benefits.', specs: 'Varieties: Red Lady, Taiwan 786. Packaging: 8kg cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/f7.webp' },
  { name: 'Watermelon', category: 'fruits', description: 'Refreshing taste and high water content.', specs: 'Varieties: Sugar Baby, Arka Manik. Packaging: Individual or bulk bins.', imageUrl: 'https://rudhraaexportsandimports.com/images/f8.webp' },
  { name: 'Muskmelon', category: 'fruits', description: 'Sweet taste, high water content, and nutritional benefits.', specs: 'Varieties: Kharbuja, Pusa Sharbati. Packaging: 5kg/10kg cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/f9.webp' },
  { name: 'Guava', category: 'fruits', description: 'Rich nutritional value and medicinal benefits.', specs: 'Varieties: Allahabad Safeda, Pink Guava. Packaging: 5kg boxes.', imageUrl: 'https://rudhraaexportsandimports.com/images/f10.webp' },
  { name: 'Pineapple', category: 'fruits', description: 'Sweet taste, aroma, and nutritional value.', specs: 'Varieties: Queen, Kew. Packaging: Individual cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/f11.webp' },
  { name: 'Cherries', category: 'fruits', description: 'Rich flavor, nutritional benefits, and premium market demand.', specs: 'Varieties: Stella, Bing. Packaging: 2kg/5kg punnets.', imageUrl: 'https://rudhraaexportsandimports.com/images/f12.webp' },

  // Vegetables
  { 
    name: 'Suran (Yam)', 
    category: 'vegetables', 
    description: 'A versatile and starchy root vegetable, also known as Elephant Foot Yam, prized for its unique texture and earthy flavor.', 
    specs: 'Available in 5kg, 10kg, 25kg bags. Uniform size and shape.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(1).webp',
    origin: 'Sourced from the fertile plains of Western India.',
    uses: 'Ideal for curries, chips, and traditional Indian dishes. Can be boiled, fried, or baked.',
    nutrition: 'Rich in carbohydrates, potassium, and dietary fiber.'
  },
  { 
    name: 'Drumstick', 
    category: 'vegetables', 
    description: 'Long, slender pods of the Moringa oleifera tree, known for their distinct flavor and immense health benefits.', 
    specs: 'Packed in bunches to retain freshness. Length: 12-18 inches.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(30).webp',
    origin: 'Cultivated in the tropical regions of South India.',
    uses: 'A staple in South Indian sambar and curries. The pulp is used in soups and stews.',
    nutrition: 'Excellent source of Vitamin C, iron, and calcium.'
  },
  { 
    name: 'Red Onion', 
    category: 'vegetables', 
    description: 'Crisp, pungent, and mildly sweet red onions, a cornerstone of cuisines worldwide.', 
    specs: 'Sizes: 45-65mm. Packaging: 10kg/20kg Jute/Mesh bags.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(16).webp',
    origin: 'Sourced from the renowned onion-growing belt of Nashik, Maharashtra.',
    uses: 'Perfect for salads, sandwiches, grilling, and as a base for curries and sauces.',
    nutrition: 'Good source of antioxidants, particularly quercetin.'
  },
  { 
    name: 'Okra (Ladyfinger)', 
    category: 'vegetables', 
    description: 'Tender, green pods known for their unique texture and ability to thicken sauces. Also called "Bhindi".', 
    specs: 'Available in 5kg cartons and mesh bags. Length: 3-5 inches.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(33).webp',
    origin: 'Harvested from farms across Central India.',
    uses: 'Commonly fried, stuffed, or used in stews like gumbo and sambar.',
    nutrition: 'High in fiber, Vitamin C, and folate.'
  },
  { 
    name: 'Brinjal (Eggplant)', 
    category: 'vegetables', 
    description: 'A versatile vegetable with a glossy purple skin and spongy flesh, available in various shapes and sizes.', 
    specs: 'Custom packaging available. Varieties: Globe, Long Purple.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(28).webp',
    origin: 'Grown in various agricultural zones across India.',
    uses: 'Excellent for roasting, grilling, and in dishes like Baingan Bharta, curries, and ratatouille.',
    nutrition: 'Low in calories, good source of dietary fiber and manganese.'
  },
  { 
    name: 'Tomato', 
    category: 'vegetables', 
    description: 'Plump, juicy, and vibrant red tomatoes, bursting with flavor. A fundamental ingredient in cooking.', 
    specs: 'Packaging: 7kg, 15kg crates. Varieties: Roma, Beefsteak.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(17).webp',
    origin: 'Sourced from prime tomato-growing regions in India.',
    uses: 'Essential for sauces, salads, soups, and countless cooked dishes.',
    nutrition: 'Rich in Vitamin C and lycopene, a powerful antioxidant.'
  },
  { 
    name: 'Bitter Gourd', 
    category: 'vegetables', 
    description: 'High-demand export vegetable due to its medicinal and nutritional benefits. Rich in antioxidants and vitamins.', 
    specs: 'Packed in 5kg cartons, ensuring freshness. Various sizes available.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(29).webp'
  },
  { 
    name: 'Potatoes', 
    category: 'vegetables', 
    description: 'A major export crop from India, with high demand in the Middle East, Southeast Asia, and Europe.', 
    specs: 'Varieties: Kufri Jyoti, Pukhraj. Packaging: 20kg/50kg Jute bags.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(31).webp'
  },
  { 
    name: 'Lemon', 
    category: 'vegetables', 
    description: 'High-demand export fruit due to their culinary, medicinal, and industrial uses. Rich in vitamin C and antioxidants.', 
    specs: 'Varieties: Assam Lemon, Kagzi Lime. Packaging: 7kg/10kg cartons.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(32).webp'
  },
  { 
    name: 'Snake Gourd', 
    category: 'vegetables', 
    description: 'A highly demanded export vegetable due to its nutritional and medicinal benefits. Rich in fiber, vitamins, and antioxidants.', 
    specs: 'Packed to retain freshness, lengths vary. 5kg/10kg boxes.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(36).webp'
  },
  { 
    name: 'Bottle Gourd', 
    category: 'vegetables', 
    description: 'A widely exported vegetable due to its nutritional and medicinal benefits. Rich in fiber, vitamins, and antioxidants.', 
    specs: 'Varieties: Pusa Naveen, Arka Bahar. Packaging: 10kg boxes.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(34).webp'
  },
  { 
    name: 'Ridge Gourd', 
    category: 'vegetables', 
    description: 'A popular export vegetable due to its nutritional and medicinal benefits. Widely used in culinary and Ayurvedic applications.', 
    specs: 'Varieties: Pusa Nasdar, CO-1. Packaging: 5kg/10kg cartons.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(35).webp'
  },
  { 
    name: 'Carrot', 
    category: 'vegetables', 
    description: 'A highly demanded export vegetable due to their nutritional value and versatility. Rich in beta-carotene, fiber, and antioxidants.', 
    specs: 'Varieties: Pusa Rudhira, Nantes. Packaging: 5kg/10kg bags.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(39).webp'
  },
  { 
    name: 'Beetroot', 
    category: 'vegetables', 
    description: 'A highly demanded export vegetable due to its nutritional and medicinal benefits. Rich in fiber, iron, and antioxidants.', 
    specs: 'Varieties: Detroit Dark Red, Crimson Globe. Packaging: 10kg mesh bags.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(38).webp'
  },
  { 
    name: 'Radish', 
    category: 'vegetables', 
    description: 'A popular export vegetable due to its nutritional value and medicinal properties. Known for their crisp texture and pungent flavor.', 
    specs: 'Varieties: Pusa Chetki, Japanese White. Packaging: Bunches or 10kg bags.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(37).webp'
  },
  { 
    name: 'Green Banana', 
    category: 'vegetables', 
    description: 'A highly demanded export commodity due to their culinary and industrial uses. Rich in fiber, vitamins, and resistant starch.', 
    specs: 'Varieties: Robusta, Nendran. Packaging: 13.5kg cartons.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(6).webp'
  },
  { 
    name: 'Cucumber', 
    category: 'vegetables', 
    description: 'A widely exported vegetable due to its high water content, nutritional value, and culinary versatility.', 
    specs: 'Varieties: Poinsett, Japanese Long Green. Packaging: 5kg/10kg cartons.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(5).webp'
  },
  { 
    name: 'Spinach', 
    category: 'vegetables', 
    description: 'A highly demanded export leafy vegetable due to its rich nutritional profile. Packed with iron, vitamins, and antioxidants.', 
    specs: 'Varieties: Pusa Harit, All Green. Packaging: Bunches in cartons.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(3).webp'
  },
  { 
    name: 'Curry Leaves', 
    category: 'vegetables', 
    description: 'A highly demanded export herb due to their aromatic flavor and medicinal benefits. Used in culinary and ayurvedic industries.', 
    specs: 'Fresh or dried. Packed in pouches or bunches to retain aroma.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(40).webp'
  },
  { 
    name: 'Coriander Leaves', 
    category: 'vegetables', 
    description: 'A highly demanded export herb due to their aromatic flavor and medicinal benefits. Widely used in culinary and pharmaceutical industries.', 
    specs: 'Fresh bunches. Packaging designed to maintain freshness.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(41).webp'
  },
  { 
    name: 'Mint Leaves', 
    category: 'vegetables', 
    description: 'A highly demanded export herb due to their refreshing aroma and medicinal benefits. Used in culinary, pharmaceutical, and cosmetic industries.', 
    specs: 'Varieties: Peppermint, Spearmint. Fresh or dried packaging available.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(2).webp'
  },
  { 
    name: 'Shallots', 
    category: 'vegetables', 
    description: 'Highly sought after for their unique mild and sweet flavor. A favorite in gourmet dishes and sauces.', 
    specs: 'Various sizes available. Packed in 5kg/10kg mesh bags.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(18).webp',
    origin: 'Sourced from prime growing regions in India.',
    uses: 'Ideal for gourmet dishes, sauces, dressings, and salads.',
    nutrition: 'Rich in antioxidants and vitamins A and C.'
  },
  { 
    name: 'Green Chillies', 
    category: 'vegetables', 
    description: 'Pungent and flavorful green chilies, in high demand for culinary use. A staple in Indian and Asian cuisine.', 
    specs: 'Varieties: G4, Jwala. Packed to retain freshness.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(8).webp',
    origin: 'Cultivated across India.',
    uses: 'Used to add heat and flavor to curries, stir-fries, and sauces.',
    nutrition: 'Excellent source of Vitamin C and capsaicin.'
  },
  { 
    name: 'Ginger', 
    category: 'vegetables', 
    description: 'A high-demand commodity, valued for its aromatic, pungent flavor and extensive medicinal properties.', 
    specs: 'Varieties: Nadia, Rio de Janeiro. Fresh or dried.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(19).webp',
    origin: 'Cultivated in various regions of India.',
    uses: 'A staple in Asian cooking, used in teas, and for medicinal purposes.',
    nutrition: 'Contains gingerol, which has powerful anti-inflammatory and antioxidant effects.'
  },
  { 
    name: 'Beans', 
    category: 'vegetables', 
    description: 'A highly demanded export commodity, valued for their nutritional benefits. India exports fresh and dried beans.', 
    specs: 'Varieties: French beans, cluster beans (guar). Packaging: 5kg/10kg cartons.', 
    imageUrl: 'https://rudhraaexportsandimports.com/images/v%20(27).webp',
    origin: 'Cultivated across various regions in India.',
    uses: 'Used in global cuisines and industries like food processing.',
    nutrition: 'Excellent source of plant-based protein, fiber, and essential nutrients.'
  },

  // Spices
  { name: 'Red Chilli', category: 'spices', description: 'Valued for their heat, color, and flavor. Key types include Guntur, Byadgi, and Kashmiri.', specs: 'Available whole, with or without stem. Packaging: 25kg Jute bags.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(2).webp' },
  { name: 'Turmeric Fingers', category: 'spices', description: 'Prized for its rich curcumin content, color, and medicinal properties.', specs: 'Varieties: Alleppey, Erode, Salem. Polished or unpolished.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(1).webp' },
  { name: 'Black Pepper', category: 'spices', description: 'Known as the "King of Spices", valued for its pungent flavor and aroma.', specs: 'Grades: Malabar, Tellicherry. Packaging: 25kg/50kg PP bags.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(3).webp' },
  { name: 'Cumin Seeds', category: 'spices', description: 'Known for its strong aroma and digestive benefits. Used whole or ground.', specs: 'Purity: 99% Singapore/Europe Quality. Packaging: 25kg PP bags.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(4).webp' },
  { name: 'Coriander Seeds', category: 'spices', description: 'A versatile spice with a mild, sweet, and slightly citrusy flavor.', specs: 'Varieties: Eagle, Parrot. Split or whole.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(5).webp' },
  { name: 'Green Cardamom', category: 'spices', description: 'A premium spice with a strong, unique aroma and sweet flavor.', specs: 'Grades: 8mm, 7mm, 6mm. Packaging: 5kg poly bags.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(6).webp' },
  { name: 'Cloves', category: 'spices', description: 'Aromatic flower buds with a strong, sweet, and pungent flavor.', specs: 'Hand-picked quality. Packaging: 10kg cartons.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(8).webp' },
  { name: 'Cinnamon Sticks', category: 'spices', description: 'A sweet and woody spice, used in both sweet and savory dishes.', specs: 'Varieties: Cassia, Ceylon. Various lengths available.', imageUrl: 'https://rudhraaexportsandimports.com/images/spices%20(7).webp' },
  
  // Powdered Spices
  { name: 'Chilli Powder', category: 'powdered-spices', description: 'Valued for its strong flavor, color, and purity in global culinary applications.', specs: 'Heat level (SHU) and color value (ASTA) as per requirements.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(5).webp' },
  { name: 'Turmeric Powder', category: 'powdered-spices', description: 'Prized for its purity, rich curcumin content, and wide applications in global industries.', specs: 'Curcumin content: 2% to 5%. Fine or coarse ground.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(6).webp' },
  { name: 'Cumin Powder', category: 'powdered-spices', description: 'Valued for its rich essential oil content, enhancing flavors in global cuisines.', specs: 'Fine ground from high-quality cumin seeds.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(2).webp' },
  { name: 'Pepper Powder', category: 'powdered-spices', description: 'Prized for its purity, essential oils, and culinary versatility worldwide.', specs: 'Fine ground from Malabar or Tellicherry peppercorns.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(3).webp' },
  { name: 'Cardamom Powder', category: 'powdered-spices', description: 'Prized for its purity, essential oils, and use in culinary, pharmaceutical, and cosmetic industries.', specs: 'Ground from premium green cardamom pods.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(1).webp' },
  { name: 'Curry Leaf Powder', category: 'powdered-spices', description: 'Prized for its rich antioxidants, essential oils, and use in culinary, pharmaceutical, and Ayurvedic applications.', specs: 'Made from fresh, dehydrated curry leaves.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(4).webp' },
  { name: 'Coriander Powder', category: 'powdered-spices', description: 'A versatile spice with a mild, sweet, and slightly citrusy flavor, essential in many cuisines.', specs: 'Ground from high-quality roasted coriander seeds.', imageUrl: 'https://rudhraaexportsandimports.com/images/powder%20(7).webp' },
  
  // Cereals & Pulses
  { name: 'Basmati Rice', category: 'cereals-pulses', description: 'Premium long-grain aromatic rice, perfect for biryani and pilaf.', specs: 'Varieties: 1121, Pusa. Avg. grain length: 8.4mm.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(2).webp' },
  { name: 'Non-Basmati Rice', category: 'cereals-pulses', description: 'High-quality medium and short-grain rice for everyday consumption.', specs: 'Varieties: Sona Masoori, IR 64. Broken % as per requirement.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(3).webp' },
  { name: 'Wheat', category: 'cereals-pulses', description: 'High-quality milling wheat, valued for its quality and affordability.', specs: 'Varieties: Durum, Sharbati, Lokwan. Protein content: 12% min.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(1).webp' },
  { name: 'Maize', category: 'cereals-pulses', description: 'Non-GMO yellow and white maize for human consumption and animal feed.', specs: 'Moisture: 14% max. Aflatoxin: 20 PPB max.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(4).webp' },
  { name: 'Groundnuts', category: 'cereals-pulses', description: 'Valued for their quality, rich flavor, and high nutritional content.', specs: 'Types: Bold, Java. Counts per Ounce as per requirement.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(6).webp' },
  { name: 'Soya Chunks', category: 'cereals-pulses', description: 'Popular in vegetarian diets and health-conscious food markets worldwide.', specs: 'High protein content. Available in regular, mini, and granule forms.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(8).webp' },
  { name: 'Chickpeas', category: 'cereals-pulses', description: 'Valued for their taste, versatility, and nutritional benefits in global markets.', specs: 'Types: Kabuli, Desi. Caliber as per requirement.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(7).webp' },
  { name: 'Pearl Millet', category: 'cereals-pulses', description: 'Valued for its rich fiber, protein, and drought resistance.', specs: 'Used for food and fodder. Purity: 99% min.', imageUrl: 'https://rudhraaexportsandimports.com/images/cereals%20(5).webp' },
  
  // Coconut & Coir Products
  { name: 'Coconut', category: 'coconut-coir', description: 'High-demand for culinary and industrial uses worldwide.', specs: 'Varieties: West Coast Tall, East Coast Tall. Semi or fully husked.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(7).webp' },
  { name: 'Tender Coconut', category: 'coconut-coir', description: 'Refreshing and nutritious tender coconut, sourced for its sweet water.', specs: 'Harvested young for maximum water content. Trimmed or whole.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(8).webp' },
  { name: 'Copra', category: 'coconut-coir', description: 'Dried coconut kernel, a key source for coconut oil production.', specs: 'Types: Milling, Edible. Moisture content below 6%.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(5).webp' },
  { name: 'Coconut Shell', category: 'coconut-coir', description: 'Eco-friendly and versatile coconut shells, used for handicrafts and fuel.', specs: 'Cleaned and processed shells. Available in bulk.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(1).webp' },
  { name: 'Coconut Shell Charcoal', category: 'coconut-coir', description: 'High-quality charcoal made from coconut shells, known for its high calorific value.', specs: 'Uniform carbonization. Low moisture content.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(9).webp' },
  { name: 'Dessicated Coconut Powder', category: 'coconut-coir', description: 'Finely grated and dried coconut meat, perfect for baking and confectionery.', specs: 'Available in fine and medium grades. Low fat and high fat options.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(6).webp' },
  { name: 'Coir Pith Disc', category: 'coconut-coir', description: 'Compressed coir pith discs, ideal for seed starting and hydroponics.', specs: 'Various diameters available. Expands with water.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(3).webp' },
  { name: 'Coir Pith Brick', category: 'coconut-coir', description: 'A versatile, eco-friendly growing medium for horticulture and agriculture.', specs: 'Low EC, High EC. Compressed 5kg blocks.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(2).webp' },
  { name: 'Coir Fibre', category: 'coconut-coir', description: 'Natural and strong coir fibre extracted from coconut husks, used for ropes, mats, and brushes.', specs: 'Available in bales. Golden brown and white fibre.', imageUrl: 'https://rudhraaexportsandimports.com/images/c%20(4).webp' },

  // Moringa
  { name: 'Moringa Powder', category: 'moringa', description: 'A nutrient-dense supplement used in smoothies, capsules, and food fortification.', specs: 'Fine mesh powder, hygienically processed.', imageUrl: 'https://rudhraaexportsandimports.com/images/m%20(1).webp' },
  { name: 'Moringa Powder Capsule', category: 'moringa', description: 'A convenient way to consume the nutritional benefits of Moringa. Encapsulated for easy daily intake.', specs: 'Available in 60/90/120 count bottles. 500mg per capsule.', imageUrl: 'https://rudhraaexportsandimports.com/images/m%20(2).webp' },
];

// PNG Icons for Stats Section
export const STAT_ICONS = {
  experience: 'https://rudhraaexportsandimports.com/images/experience.png',
  clients: 'https://rudhraaexportsandimports.com/images/clients.png',
  countries: 'https://rudhraaexportsandimports.com/images/countries.png',
  products: 'https://rudhraaexportsandimports.com/images/product.png',
};
