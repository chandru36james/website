import React from 'react';
import { Helmet } from "react-helmet";   // ✅ for seo
import { useFadeIn } from '../../hooks/useFadeIn';

const Section: React.FC<{ children: React.ReactNode; className?: string, id?: string }> = ({ children, className, id }) => {
    const ref = useFadeIn();
    return <section id={id} ref={ref} className={`fade-in container mx-auto px-6 py-20 ${className}`}>{children}</section>;
};

const SkillCard: React.FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-gray-700 hover:border-violet-500 transform hover:-translate-y-2">
        <div className="text-violet-400 mb-4">{icon}</div>
        <h3 className="font-semibold text-lg text-gray-200">{name}</h3>
    </div>
);

const ProjectCard: React.FC<{ title: string; description: string; tags: string[]; imageUrl: string; liveUrl?: string; repoUrl?: string }> = ({ title, description, tags, imageUrl, liveUrl, repoUrl }) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:border-violet-500">
        <div className="overflow-hidden h-56">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map(tag => <span key={tag} className="bg-gray-700 text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>)}
            </div>
            <div className="flex items-center gap-4">
                {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="bg-violet-600 text-white font-semibold py-2 px-5 rounded-full hover:bg-violet-500 transition-colors">View Live</a>}
                {repoUrl && <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white font-semibold transition-colors">GitHub</a>}
            </div>
        </div>
    </div>
);

const DhamoPortfolio: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Dhamo | Full-Stack Developer</title>
                <meta name="description" content="The portfolio of Dhamo, a passionate Full-Stack Developer & UI/UX Enthusiast creating beautiful and functional web applications." />
                <style>{`
                    .animated-gradient {
                        background: linear-gradient(90deg, #a78bfa, #f472b6, #60a5fa, #a78bfa);
                        background-size: 200% 200%;
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        animation: gradient-animation 5s ease infinite;
                    }
                    @keyframes gradient-animation {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    body {
                       background-color: #111827; /* bg-gray-900 */
                    }
                     body::-webkit-scrollbar-thumb {
                        background-color: #4c1d95; /* violet-800 */
                    }
                     body::-webkit-scrollbar-track {
                        background: #1f2937; /* gray-800 */
                    }
                `}</style>
            </Helmet>
            <div className="bg-gray-900 text-white font-poppins min-h-screen relative">
                 {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '2rem 2rem' }}></div>
                
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="min-h-screen flex items-center justify-center text-center px-6">
                        <div>
                            <h1 className="text-6xl md:text-8xl font-bold mb-4">
                                <span className="animated-gradient">Dhamo</span>
                            </h1>
                            <h2 className="text-2xl md:text-4xl text-gray-300 mb-6">Full-Stack Developer & UI/UX Enthusiast</h2>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                                I build elegant, high-performance web applications from concept to launch, focusing on seamless user experiences.
                            </p>
                            <div className="flex justify-center gap-6">
                                <a href="mailto:hello@dhamo.dev" className="bg-violet-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-violet-500 transition-all transform hover:scale-105">Get In Touch</a>
                                <a href="#projects" className="bg-gray-800 border border-gray-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-700 transition-colors">View My Work</a>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <Section id="about" className="max-w-4xl text-center">
                        <h2 className="text-4xl font-bold mb-8">About Me</h2>
                        <p className="text-xl text-gray-300">
                           With a foundation in both creative design and robust backend development, I bring a holistic approach to every project. My passion lies in solving complex problems with clean code and intuitive design. I'm driven by curiosity and a desire to continuously learn and build amazing things on the web. Let's create something incredible together.
                        </p>
                    </Section>

                    {/* Skills Section */}
                    <Section id="skills" className="max-w-5xl">
                         <h2 className="text-4xl font-bold mb-12 text-center">Core Competencies</h2>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <SkillCard name="React & Next.js" icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v10"></path><path d="m4.93 4.93 7.07 7.07"></path><path d="M2 12h10"></path><path d="m4.93 19.07 7.07-7.07"></path><path d="M12 22v-10"></path><path d="m19.07 19.07-7.07-7.07"></path><path d="M22 12h-10"></path><path d="m19.07 4.93-7.07 7.07"></path></svg>} />
                            <SkillCard name="Node.js & Express" icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4"></path><path d="M4 12h16"></path></svg>} />
                            <SkillCard name="UI/UX Design" icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.5c-4.25.02-7.85-2.83-9.5-6.5.55-1.25 1.5-2.5 2.5-3.5"></path><path d="M12 3.5c4.25-.02 7.85 2.83 9.5 6.5-.55 1.25-1.5 2.5-2.5 3.5"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></svg>} />
                            <SkillCard name="Database Management" icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>} />
                         </div>
                    </Section>

                    {/* Projects Section */}
                    <Section id="projects" className="max-w-6xl">
                         <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
                         <div className="grid md:grid-cols-2 gap-12">
                             <ProjectCard 
                                title="E-commerce Platform" 
                                description="A full-featured e-commerce site with Stripe integration, product management, and a user-friendly checkout process." 
                                tags={["Next.js", "TypeScript", "Stripe", "PostgreSQL"]}
                                imageUrl="https://picsum.photos/seed/project1/600/400"
                                liveUrl="#"
                                repoUrl="#"
                            />
                             <ProjectCard 
                                title="B2B Lead Gen Site" 
                                description="A corporate website focused on credibility and lead generation, featuring a headless CMS for easy content updates." 
                                tags={["React", "Node.js", "Contentful", "SEO"]}
                                imageUrl="https://picsum.photos/seed/project2/600/400"
                                liveUrl="#"
                                repoUrl="#"
                            />
                         </div>
                    </Section>
                    
                    {/* Contact Footer */}
                    <footer className="bg-gray-900 border-t border-gray-800 py-12">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                            <p className="text-gray-400 max-w-lg mx-auto mb-8">I'm currently available for freelance opportunities. Have a project in mind? Let's talk.</p>
                             <a href="mailto:hello@dhamo.dev" className="bg-violet-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-violet-500 transition-all transform hover:scale-105 inline-block mb-8">
                                hello@dhamo.dev
                            </a>
                            <div className="flex justify-center space-x-6 text-gray-500">
                                <a href="#" className="hover:text-violet-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                                 <a href="#" className="hover:text-violet-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                            </div>
                             <p className="text-gray-600 text-sm mt-8">&copy; {new Date().getFullYear()} Dhamo. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default DhamoPortfolio;
