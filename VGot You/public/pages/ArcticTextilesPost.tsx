
import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from "react-router-dom";

interface PostProps {
    onNavigate: (page: string) => void;
}

const ArcticTextilesPost: React.FC<PostProps> = ({ onNavigate }) => {
    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onNavigate('Contact');
    };

    return (
        <div className="animate-fade-in p-6 sm:p-12 text-black dark:text-white transition-colors duration-300">
            <SEO 
                title="How Our Web Design Helped Arctic Textiles Reach Global Markets"
                description="See how a modern, SEO-optimized website design helped Arctic Textiles expand globally. A deep dive case study by VGot You."
                image="https://vgotyou.com/assets/arctic_home-1F48Ee0h.png"
                datePublished="2023-10-26"
                url="https://vgotyou.com/blog/arctic-textiles"
            />
            <article>
                {/* Post Header */}
                <header className="mb-12 text-center">
                    <p className="text-red-600 font-bold tracking-wider text-sm uppercase">CASE STUDY</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-500 mt-2 mb-4 leading-tight">
                        How Our Web Design Helped Arctic Textiles Reach Global Markets
                    </h1>
                    <p className="text-black/60 dark:text-white/60 text-sm font-medium">
                        Published on October 26, 2023 by VGot You
                    </p>
                </header>

                {/* Featured Image */}
                <img 
                    src="https://vgotyou.com/assets/arctic.png" 
                    alt="High-quality fabrics from Arctic Textiles"
                    className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-2xl mb-12 grayscale hover:grayscale-0 transition-all duration-500"
                />

                {/* Post Content */}
                <div className="space-y-6 text-lg leading-relaxed prose prose-lg max-w-none 
                    prose-headings:text-black dark:prose-headings:text-white 
                    prose-p:text-black/90 dark:prose-p:text-white/90 
                    prose-strong:text-black dark:prose-strong:text-white 
                    prose-li:text-black/90 dark:prose-li:text-white/90
                    prose-a:text-red-600 hover:prose-a:text-red-500
                    ">
                    <p>In today’s competitive textile industry, a strong digital presence is essential for growth. When Arctic Textiles, a leading manufacturer and exporter of high-quality fabrics, approached us, their goal was clear — to transform their local presence into a global brand.</p>

                    <p>Our team took on the challenge of designing a modern, performance-driven website that would showcase their craftsmanship, attract international clients, and position them as a trusted name in the textile export market.</p>

                    <h2 className="text-2xl font-bold">Understanding Arctic Textiles’ Vision</h2>
                    <p>Before starting the design process, we spent time understanding the brand’s story and target audience. Arctic Textiles had a rich history of quality manufacturing, but their online presence didn’t reflect that scale or professionalism.</p>
                    <p>Their goals were:</p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-red-600">
                        <li>To build trust with international buyers</li>
                        <li>To showcase product categories clearly</li>
                        <li>To generate B2B leads through website inquiries</li>
                        <li>To create a responsive, SEO-optimized platform that works flawlessly on all devices</li>
                    </ul>

                    <h2 className="text-2xl font-bold">Our Web Design Approach</h2>
                    <p>We focused on combining visual aesthetics with strategic functionality.</p>
                    
                    <h3 className="text-xl font-bold">1. Brand-Aligned Design</h3>
                    <p>We used a clean, modern layout with subtle textures inspired by woven fabrics. The color palette included cool blues and whites to reflect the “Arctic” identity, representing trust, quality, and global standards.</p>

                    <h3 className="text-xl font-bold">2. Product-Focused Layout</h3>
                    <p>We built a dedicated product showcase section with filters for fabrics, categories, and specifications — making it easy for buyers to explore and send inquiries directly.</p>

                    <h3 className="text-xl font-bold">3. B2B Lead Optimization</h3>
                    <p>Every key page includes a Call-to-Action (CTA) such as “Request a Quote” or “Get a Sample”, helping convert visitors into leads. The contact form is connected to email and WhatsApp for instant communication.</p>

                    <h3 className="text-xl font-bold">4. SEO and Performance</h3>
                    <p>We implemented technical SEO best practices:</p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-red-600">
                        <li><strong>Keyword optimization:</strong> “textile manufacturer,” “fabric exporter,” “wholesale fabric supplier.”</li>
                        <li><strong>Fast loading time:</strong> &lt;2.5s.</li>
                        <li><strong>Optimized images in WebP format.</strong></li>
                        <li><strong>Schema markup</strong> for better Google indexing.</li>
                    </ul>

                    <h3 className="text-xl font-bold">5. Global Accessibility</h3>
                    <p>The site is hosted on a high-performance international CDN, ensuring fast access from Europe, the Middle East, and Asia. This was crucial for reaching Arctic’s expanding export network.</p>

                    <h2 className="text-2xl font-bold">The Results</h2>
                    <p>Within weeks of launching the new website, Arctic Textiles saw measurable growth:</p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-red-600">
                        <li>65% increase in international traffic</li>
                        <li>Inquiries from 6+ new countries</li>
                        <li>Higher engagement time per visitor</li>
                        <li>Improved brand perception among overseas clients</li>
                    </ul>
                    <p>The website now serves as their digital showroom, bridging the gap between manufacturing excellence and global visibility.</p>

                    <h2 className="text-2xl font-bold">What Makes This Project Special</h2>
                    <p>This project showcases how strategic web design can transform a traditional business into a global brand. For Arctic Textiles, their website is more than an online presence — it’s a growth engine.</p>
                    <p>From the color psychology to SEO-friendly structure, every element was crafted to tell a story of reliability, quality, and expansion.</p>

                    <h2 className="text-2xl font-bold">Final Thoughts</h2>
                    <p>If your business wants to expand internationally or attract B2B clients, your website is your strongest marketing tool. A well-planned, SEO-optimized design — like Arctic Textiles’ — can redefine your digital growth.</p>
                    <p>Want to elevate your brand’s online presence? <Link
  to="/contact"
  className="font-bold border-b-2 border-red-600 hover:text-red-600 transition-colors no-underline"
>
  Let’s build your website today.
</Link></p>
                </div>
            </article>
        </div>
    );
};

export default ArcticTextilesPost;
