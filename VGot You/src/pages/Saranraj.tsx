import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LinkedInIcon, GitHubIcon, CodeBracketIcon, SparklesIcon } from '../components/Icons';
import { Helmet } from "react-helmet";   // ✅ SEO

const m = motion as any;

const SaranrajProfile: React.FC = () => {
    const skillSets = [
        {
            category: "AI & Machine Learning",
            icon: <SparklesIcon className="w-8 h-8" />,
            description: "Building intelligent systems using deep learning and predictive modeling.",
            skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "YOLO"]
        },
        {
            category: "Data & Analytics",
            icon: <img src="https://www.vgotyou.com/assets/strategy.png" alt="Data" className="w-8 h-8 object-contain" />,
            description: "Extracting insights and visualizing complex data patterns.",
            skills: ["Data Analysis", "Tableau", "Prediction Models", "Feature Engineering"]
        },
        {
            category: "Web Development",
            icon: <CodeBracketIcon className="w-8 h-8" />,
            description: "Creating responsive and user-friendly digital interfaces.",
            skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"]
        }
    ];

    const projects = [
        {
            title: "Autonomous Car Parking Using Path Planning Algorithms",
            description: "Developed path planning solutions using A* and RRT algorithms for intelligent vehicle navigation."
        },
        {
            title: "Pneumonia Detection System",
            description: "Built a deep learning model using CNN (VGG16) to detect pneumonia from X-ray images with high accuracy."
        },
        {
            title: "Sentiment Analysis on Amazon Reviews",
            description: "Used natural language processing and machine learning to analyze customer sentiment from large-scale review data."
        }
    ];

    return (
        <div className="relative w-full min-h-screen bg-white overflow-hidden transition-colors duration-300">
            <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Saranraj Vasanthi | Co-Founder & AI Engineer at VGot You</title>

  <meta
    name="description"
    content="Saranraj Vasanthi is the Co-Founder of VGot You, specializing in Artificial Intelligence, Machine Learning, and data-driven technologies. Based in Birmingham, UK, he helps businesses build innovative digital solutions and scalable systems for global clients."
  />

  <meta
    name="keywords"
    content="Saranraj Vasanthi, VGot You co founder, AI engineer India, machine learning engineer, data scientist VGot You, artificial intelligence developer, predictive models expert"
  />

  <meta name="author" content="Saranraj Vasanthi | VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/saran-raj" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://www.vgotyou.com/saran-raj" />
  <meta property="og:title" content="Saranraj Vasanthi | Co-Founder of VGot You" />
  <meta
    property="og:description"
    content="Meet Saranraj Vasanthi, Co-Founder of VGot You and specialist in Artificial Intelligence, Machine Learning, and Data Science."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/saran.png" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Saranraj Vasanthi | AI & Data Science Specialist" />
  <meta
    name="twitter:description"
    content="Co-Founder of VGot You with expertise in Artificial Intelligence, Machine Learning, and predictive data systems."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/saran.png" />

  {/* ================= PERSON SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://www.vgotyou.com/saranraj#person",
      name: "Saranraj Vasanthi",
      url: "https://www.vgotyou.com/saran-raj",
      image: "https://www.vgotyou.com/assets/saran.png",
      jobTitle: "Co-Founder & AI Engineer",
      worksFor: {
        "@id": "https://www.vgotyou.com/#organization"
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN"
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Predictive Models",
        "Deep Learning",
        "Python",
        "Natural Language Processing",
        "Web Development"
      ],
      sameAs: [
        "https://www.linkedin.com/in/saranraj-vasanthi-297ba625a/",
        "https://github.com/Saran830",
      ]
    })}
  </script>

  {/* ================= ORGANIZATION ENTITY ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.vgotyou.com/#organization",
      name: "VGot You",
      url: "https://www.vgotyou.com/",
      logo: "https://www.vgotyou.com/assets/vgotyou.png"
    })}
  </script>

  {/* ================= WEBSITE ENTITY ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.vgotyou.com/#website",
      url: "https://www.vgotyou.com/",
      name: "VGot You",
      publisher: {
        "@id": "https://www.vgotyou.com/#organization"
      }
    })}
  </script>
</Helmet>
            
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[80px] mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[80px] mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-24 max-w-7xl mt-10 md:mt-16">
                
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24 lg:mb-32">
                    
                    {/* Image Content */}
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full max-w-sm lg:max-w-md relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100 bg-white">
                             <img 
                                src="https://www.vgotyou.com/assets/saran.png" 
                                alt="Saranraj Vasanthi – Co-Founder of VGot You"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="absolute -z-10 top-8 right-8 w-full h-full border-2 border-zinc-100 rounded-[2rem] hidden md:block"></div>
                    </m.div>

                    {/* Text Content */}
                    <m.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left order-1 lg:order-2"
                    >
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-red-100 text-red-600 text-xs font-bold tracking-[0.2em] uppercase">
                            Co-Founder & Tech Lead
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-zinc-900 mb-6 leading-[1.1]">
                            Saranraj Vasanthi <br/>
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">AI & Data Scientist.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
                            Expert Artificial Intelligence Engineer, Data Scientist, and Machine Learning Engineer. Co-Founder of VGot You and professional Web Developer helping businesses build innovative digital solutions.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a href="https://wa.me/917871120415?text=Hi%20Saranraj,%20I%20found%20VGot%20You%20and%20I%E2%80%99m%20interested%20in%20discussing%20a%20project."
                            target="_blank"rel="noopener noreferrer"
                            className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg hover:bg-red-600">
                            Get In Touch
                            </a>
                            <div className="flex gap-2">
                                {[
                                    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/saranraj-vasanthi-297ba625a/", label: "LinkedIn" },
                                    { icon: GitHubIcon, href: "https://github.com/Saran830", label: "GitHub" }
                                ].map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-300"
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </m.div>
                </div>

                {/* About Section */}
                <section className="mb-24">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-6">About Saranraj</h2>
                        <p className="text-zinc-500 text-lg leading-relaxed font-light mb-6">
                            With a strong academic background in Artificial Intelligence and Data Science from prestigious institutions in the UK and India, Saranraj brings a data-driven approach to digital product development. His expertise lies in bridging the gap between complex machine learning systems and practical business solutions.
                        </p>
                        <p className="text-zinc-500 text-lg leading-relaxed font-light">
                            As a Co-Founder of VGot You, he focuses on building innovative digital products that leverage predictive models and machine learning systems. His ability to work with data-driven technologies combined with web development experience ensures that VGot You delivers not just beautiful websites, but intelligent digital ecosystems.
                        </p>
                    </m.div>
                </section>

                {/* Skills Section */}
                <div id="skills" className="mb-24 scroll-mt-32">
                    <m.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 mb-6">Technical Skills</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full"></div>
                    </m.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {skillSets.map((set, idx) => (
                            <m.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-red-600 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-zinc-100">
                                    {set.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-zinc-900">{set.category}</h3>
                                <p className="text-zinc-500 mb-8 leading-relaxed font-light">{set.description}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {set.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-white text-xs font-bold text-zinc-600 rounded-lg border border-zinc-100">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>

                {/* Projects */}
                <section className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 mb-12 text-center">Key Projects</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-zinc-900 text-white hover:bg-red-600 transition-colors duration-500"
                            >
                                <h3 className="text-xl font-bold mb-4 leading-tight">{project.title}</h3>
                                <p className="text-zinc-400 group-hover:text-white/90 text-sm font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </m.div>
                        ))}
                    </div>
                </section>

                {/* Navigation Back */}
                <div className="text-center">
                    <Link 
                        to="/about" 
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-600 font-bold transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Team
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SaranrajProfile;
