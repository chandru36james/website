import React, { useEffect, useRef, useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Helmet } from "react-helmet";   // ✅ for seo
import portrait from '@/assets/chandru.png';

// Base64 for the user's portrait
const portraitBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEgASADASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAYHCAUEAwL/xABIEAABAwIDBQYGCAMFBwUAAAABAAIDBAUGBxEIEiExExQiNFFhFhg3UnGRtBVCUlNyc4GhIzdCYrHCM1aCk6KywdJjwvDx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EACIRAQEAAgICAgMBAQAAAAAAAAABERITIUExQfAicYHBcf/aAAwDAQACEQMRAD8A9UoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIi-';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; }[] = [];
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const createParticles = () => {
            particles = [];
            const particleCount = 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
                if (p.y > canvas.height || p.y < 0) p.speedY *= -1;

                ctx.fillStyle = 'rgba(24, 24, 27, 0.5)'; // Dark particles
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        createParticles();
        animate();
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

const AnimatedStat: React.FC<{ value: number; label: string }> = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = value;
                    if (start === end) return;
                    
                    const duration = 2000;
                    const incrementTime = (duration / end);
                    
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start === end) clearInterval(timer);
                    }, incrementTime);
                    observer.unobserve(ref.current!);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
             if (ref.current) observer.unobserve(ref.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div ref={ref} className="text-center">
            <p className="text-5xl font-bold">{count}+</p>
            <p className="text-zinc-600">{label}</p>
        </div>
    );
};

const SkillBadge: React.FC<{ text: string; index: number }> = ({ text, index }) => {
    const ref = useFadeIn();
    return (
        <div
            ref={ref}
            className="fade-in bg-brand-light-gray border border-zinc-200 text-zinc-700 py-2 px-4 rounded-full"
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            {text}
        </div>
    );
};

const AboutMe: React.FC = () => {
     const skills = ["React.js", "TypeScript", "Adobe Illustrator", "HTML", "CSS", "JS", "Photoshop", "Brand Strategy", "UI/UX Design","Excel","PowerBi","MySql", "SEO Optimization"];

    return (
        <div className="relative min-h-screen bg-brand-white flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
            <ParticleBackground />
            <Helmet>
  <title>Chandru | VGOT YOU - Creative Web & Logo Designer</title>
  <meta 
    name="description" 
    content="Learn more about VGOT YOU – a creative web designer and logo specialist passionate about crafting unique brand identities and digital experiences." 
  />
  <meta 
    name="keywords" 
    content="about VGOT YOU, logo designer, web designer, creative portfolio, brand identity" 
  />
  <link rel="canonical" href="https://www.vgotyou.com/chandru" />

  {/* Open Graph */}
  <meta property="og:type" content="profile" />
  <meta property="og:title" content="About Me | VGOT YOU" />
  <meta property="og:description" content="Get to know the designer behind VGOT YOU, passionate about logos, websites, and branding." />
  <meta property="og:image" content="https://www.vgotyou.com/assets/og-about.jpg" />
  <meta property="og:url" content="https://www.vgotyou.com/chandru" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About Me | VGOT YOU" />
  <meta name="twitter:description" content="Creative logo and web designer helping brands stand out." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/favicon.svg" />

  {/* Schema.org */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "VGOT YOU",
      "jobTitle": "Web & Logo Designer",
      "url": "https://www.vgotyou.com/about",
      "image": "https://www.vgotyou.com/assets/chandru.png"
    }
    `}
  </script>
</Helmet>

            <div className="relative z-10 max-w-4xl">
                <div className="group w-64 h-64 mx-auto mb-8 rounded-3xl overflow-hidden border-4 border-zinc-300 shadow-lg">
                    <img 
                        src={portrait} 
                        alt="Portrait" 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                    />
                </div>
                <h1 className="text-5xl font-bold mb-4">I'm the Vision Behind <span className="font-cambria">VGot You</span></h1>
                <p className="text-lg text-zinc-700 max-w-2xl mx-auto mb-12">
                   Hello! I'm a full-stack developer and brand strategist with a passion for creating clean, elegant, and efficient solutions. I thrive at the intersection of logic and creativity, turning complex problems into beautiful digital experiences. My approach is simple: listen, understand, and then build something that not only meets but exceeds expectations.
                </p>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8">My Core Skills</h2>
                    <div className="flex flex-wrap gap-4 justify-center max-w-2xl mx-auto">
                        {skills.map((skill, index) => (
                            <SkillBadge key={skill} text={skill} index={index} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <AnimatedStat value={1} label="Years of Experience" />
                    <AnimatedStat value={9} label="Projects Completed" />
                    <AnimatedStat value={5} label="Happy Clients" />
                </div>
                 <div className="flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/in/vgotyou/" className="text-zinc-600 hover:text-brand-black hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="https://github.com/chandru36james/" className="text-zinc-600 hover:text-brand-black hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://www.instagram.com/vgot_you/" className="text-zinc-600 hover:text-brand-black hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;