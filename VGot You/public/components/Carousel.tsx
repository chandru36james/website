import React, { useState } from 'react';

const img4  = "https://www.vgotyou.com/assets/4.jpeg";
const img6  = "https://www.vgotyou.com/assets/6.jpeg";

const projects = [
  {
    title: 'Modern E-Commerce Experience',
    description: 'A lightning-fast e-commerce site that drastically reduced cart abandonment.',
    image: "https://www.vgotyou.com/assets/vesahomes.png",
    url: 'https://www.vesahomes.com/',
  },
  {
    title: 'Secure B2B Platform',
    description: 'A laser-focused landing page that achieved a 300% increase in lead capture for our client.',
    image: "https://www.vgotyou.com/assets/arctic.png",
    url: 'https://arctictextiles.com/',
  },
  {
    title: 'High-Converting Landing Page',
    description: 'An elegant, visually-driven portfolio to showcase creative work and attract freelance inquiries.',
    image: "https://vgotyou.com/assets/bloomgreen_home.png",
    url: 'https://bloomgreen.netlify.app/',
  },
  {
    title: 'Stunning Logo Design',
    description: 'Creative and memorable logo designs crafted to elevate brand identity and leave a lasting impression.',
    image: img6,
    
  },
  {
    title: 'Logo Design Showcase',
    description: 'A Majestic logo designs built to strengthen company identity and recognition.',
    image: img4,
  },
];

const ProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailPage, setThumbnailPage] = useState(0);
  const [isThumbnailFading, setIsThumbnailFading] = useState(false);
  const [mainImageTransitionClass, setMainImageTransitionClass] = useState('opacity-100 scale-100');

  const THUMBNAILS_PER_PAGE = 3;
  const totalPages = Math.ceil(projects.length / THUMBNAILS_PER_PAGE);

  const activeProject = projects[activeIndex];

  const handleSelectProject = (index: number) => {
    if (index === activeIndex) return;

    setMainImageTransitionClass('opacity-0 scale-95');
    setTimeout(() => {
      setActiveIndex(index);
      setMainImageTransitionClass('opacity-100 scale-100');
    }, 500);
  };

  const changePage = (newPage: number) => {
    setIsThumbnailFading(true);
    setTimeout(() => {
      setThumbnailPage(newPage);
      setIsThumbnailFading(false);
    }, 300);
  };

  const handlePrev = () => {
    if (thumbnailPage > 0) {
      changePage(thumbnailPage - 1);
    }
  };

  const handleNext = () => {
    if (thumbnailPage < totalPages - 1) {
      changePage(thumbnailPage + 1);
    }
  };

  const startIndex = thumbnailPage * THUMBNAILS_PER_PAGE;
  const visibleProjects = projects.slice(startIndex, startIndex + THUMBNAILS_PER_PAGE);

  return (
    <section className="bg-gray-50 py-10 md:py-12 px-4">
      <div className="container mx-auto text-center max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">Our Project Showcase</h2>
        <p className="mt-2 text-base text-gray-600">
          Here's a glimpse of the digital experiences we've crafted for our clients.
        </p>

        {/* Main image */}
        <div className="mt-8">
  <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] overflow-hidden rounded-lg shadow-xl bg-gray-200">
    <div
      className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${mainImageTransitionClass}`}
    >
      <a
        href={activeProject.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 block"
      >
        <img
          src={activeProject.image}
          alt={activeProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
      </a>

      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white text-left">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
          {activeProject.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-300">
          {activeProject.description}
        </p>
      </div>
    </div>
  </div>
</div>

        {/* Thumbnails */}
        <div className="mt-6 flex justify-center items-center gap-2 sm:gap-3">
          <button
            onClick={handlePrev}
            disabled={thumbnailPage === 0}
            aria-label="Previous projects"
            className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
  className={`flex justify-center gap-2 sm:gap-3 transition-all duration-300 ease-in-out ${
    isThumbnailFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
  }`}
>
  {visibleProjects.map((project, index) => {
    const projectIndex = startIndex + index;
    const isActive = activeIndex === projectIndex;
    return (
      <button
        key={projectIndex}
        onClick={() => handleSelectProject(projectIndex)}
        aria-label={`View project: ${project.title}`}
        className={`group focus:outline-none rounded-md overflow-hidden transition-all duration-300 ring-2 ring-offset-1 ring-offset-gray-50 ${
          isActive ? 'ring-gray-900' : 'ring-transparent'
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`
            object-cover transition-all duration-300 ease-in-out
            w-16 h-12   /* 📱 smaller thumbnails */
            sm:w-20 sm:h-14
            md:w-28 md:h-20  /* 💻 bigger on desktop */
            ${isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-60 group-hover:opacity-100'}
          `}
        />
      </button>
    );
  })}
</div>


          <button
            onClick={handleNext}
            disabled={thumbnailPage >= totalPages - 1}
            aria-label="Next projects"
            className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
