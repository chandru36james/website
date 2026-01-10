export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  mobileImageUrl?: string;
  liveUrl?: string;
  isFeatured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedDate: string;
  author: string;
  readTime?: string;
  idCode?: string;
  externalUrl: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Arctic Textiles',
    category: 'Manufacturing',
    description: 'Textile Manufacturing company.',
    imageUrl: 'https://vgotyou.com/assets/arctic.png',
    mobileImageUrl: 'https://vgotyou.com/assets/arctictextiles-min.png',
    liveUrl: 'https://arctictextiles.com/',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Bloom Green Developers',
    category: 'Real Estate',
    description: 'A construction and interior company with single page requirement.',
    imageUrl: 'https://vgotyou.com/assets/bloom.png',
    mobileImageUrl: 'https://vgotyou.com/assets/bloomgreen-min.png',
    liveUrl: 'https://bloomgreendevs.netlify.app/',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Vesa Homes',
    category: 'E-commerce',
    description: 'E-commerce site for clothing.',
    imageUrl: 'https://www.vgotyou.com/assets/vesahomes.png',
    mobileImageUrl: 'https://www.vgotyou.com/assets/vesahomes-min.png',
    liveUrl: 'https://www.vesahomes.com/',
    isFeatured: true
  },
  {
    id: '4',
    title: 'Rudhraa Exports',
    category: 'Export',
    description: 'Exporting company required B2B site.',
    imageUrl: 'https://vgotyou.com/assets/rudhraa.png',
    mobileImageUrl: 'https://vgotyou.com/assets/rudhraa-min.png',
    liveUrl: 'https://rudhraaexportsandimports.com/',
    isFeatured: true
  }
];

export const blogs: BlogPost[] = [
  {
    slug: 'from-local-brand-to-online-authority',
    category: 'Strategy',
    title: 'From Local Brand to Online Authority',
    excerpt: 'Learn how strategic web design and SEO help local service businesses move from word-of-mouth to trusted online authorities.',
    content: `
      <p>For many service-based businesses, growth begins locally. Word-of-mouth, referrals, and local visibility build the first wave of customers—but in today’s digital-first world, a professionally designed, SEO-ready website is what transforms a local business into an online authority.</p>
      <p>A strong online presence does more than “show you exist”. It builds trust, proves credibility, and creates a predictable way to generate leads beyond your immediate area.</p>

      <h2>The Challenge: From Local Presence to Digital Credibility</h2>
      <p>Most local service businesses reach a point where referrals alone are not enough. At that stage, they often face similar issues:</p>
      <ul>
        <li>Outdated or DIY websites that don’t reflect the true quality of the business</li>
        <li>Poor search visibility, so only people who already know the brand can find it</li>
        <li>No clear path for visitors to become leads—no strong CTAs, forms, or booking flows</li>
      </ul>
      <p>The result: even if the business is great offline, it looks unprofessional online. This gap between local reputation and digital presence stops them from becoming an authority in their niche.</p>

      <h2>Strategic Web Design for Service Businesses</h2>
      <p>Effective web design starts with understanding the business, its audience, and its goals. At VGot You, service websites are designed with clear value propositions and strong visual hierarchy, so visitors quickly understand what you do and why they should choose you.</p>
      <p>Key elements of strategic web design for service businesses include:</p>
      <ul>
        <li><strong>Clear positioning:</strong> Who you serve, what you solve, and why you are different</li>
        <li><strong>Clean layout:</strong> Sections that guide users from problem to solution to action</li>
        <li><strong>Trust elements:</strong> Testimonials, reviews, case studies, and social proof placed visibly</li>
        <li><strong>Conversion-focused CTAs:</strong> Buttons and forms that make it easy to call, book, or enquire</li>
      </ul>
      <p>When the design is strategic, your website works like a 24/7 sales representative, not just a digital brochure.</p>

      <h2>SEO-First Website Structure</h2>
      <p>A visually appealing website means little if it cannot be found. Building SEO into the structure from day one creates a long-term engine for organic traffic and qualified leads.</p>
      <p>An SEO-first website for local service businesses should include:</p>
      <ul>
        <li><strong>Optimized service pages:</strong> targeting “service + location” keywords (for example, “web design studio in Karur”)</li>
        <li><strong>Clear URL structure:</strong> and on-page headings (H1, H2, H3) aligned with search intent</li>
        <li><strong>Performance:</strong> Fast, mobile-friendly layouts that improve user experience and search rankings</li>
        <li><strong>Location signals:</strong> such as consistent NAP details, embedded Google Map, and local-focused content</li>
      </ul>
      <p>This kind of structure helps your business show up when people near you search for the services you offer, turning local searches into real enquiries.</p>

      <h2>Sustainable Online Growth</h2>
      <p>A conversion-driven, SEO-ready website does more than generate one-time spikes in traffic. It becomes the foundation for sustainable online growth.</p>
      <p>When you combine Strategic Web Design, SEO-first structure, clear calls to action, and ongoing content marketing, you create a system where your brand consistently appears, looks credible, and converts visitors into leads—even when you are not actively “selling”.</p>
      <p>This is how local brands evolve into true online authorities.</p>

      <h2>How VGot You Helps Local Brands Grow Online</h2>
      <p>VGot You is a digital studio in Karur that designs modern, SEO-friendly websites, branding, and campaign assets for service businesses ready to grow beyond word-of-mouth.</p>
      <p>If you are a local service business that wants to move from “just having a presence” to being seen as a trusted authority online, VGot You can help you redesign your website with a clear strategy, build SEO-first pages, and create a smooth path from visit to enquiry.</p>
      <p><strong>Ready to transform your local brand into an online authority? Let’s build your website today.</strong></p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    publishedDate: '2024-03-20',
    author: 'VGot You',
    readTime: '7 min',
    idCode: 'ST-AUTH-04',
    externalUrl: 'https://vgotyou.medium.com/from-local-brand-to-online-authority-80b691e0b273?postPublishedType=initial'  },
  {
    slug: 'vesa-homes-ecommerce',
    category: 'E-commerce',
    title: 'Crafting an Elegant E-commerce Experience for Vesa Homes',
    excerpt: 'A deep dive into building a direct-to-consumer brand for a premium home textile company. Learn how we used design to drive sales.',
    content: `
      <p>For modern home textile brands, an online store is more than a sales channel — it’s a digital showroom. Vesa Homes, an Indian brand known for its premium, handcrafted textiles, needed an e-commerce platform that could translate the tactile quality of their products into a compelling online experience.</p>
      <p>Our mission was to build a direct-to-consumer (D2C) website that not only looked beautiful but also functioned as a powerful sales engine, connecting Vesa Homes with a design-conscious global audience.</p>
      
      <h2>The Challenge: From B2B to D2C</h2>
      <p>Vesa Homes had a strong B2B business but a minimal D2C presence. Their challenge was to create an online brand that could speak directly to consumers, showcasing the story, quality, and aesthetic of their products without the physical touch-and-feel experience.</p>
      <p>Their objectives included:</p>
      <ul>
        <li>Creating a visually stunning and immersive online store.</li>
        <li>Building a seamless, mobile-first shopping experience.</li>
        <li>Telling the brand story of craftsmanship and sustainability.</li>
        <li>Driving online sales and increasing average order value.</li>
      </ul>

      <h2>Our E-commerce Design Strategy</h2>
      <p>We crafted a strategy centered around visual storytelling and user experience.</p>
      
      <h3>1. An Earthy, Minimalist Aesthetic</h3>
      <p>We designed a clean, warm interface with an earthy color palette and elegant typography. The design puts the focus squarely on the products, using high-quality lifestyle photography to evoke a sense of comfort and home.</p>

      <h3>2. Storytelling Through Design</h3>
      <p>We integrated a dedicated “Our Story” section and wove brand narratives throughout the site. Details about sustainable materials and artisanal processes were highlighted on product pages, adding value and building an emotional connection with customers.</p>

      <h3>3. Robust Shopify-Powered Backend</h3>
      <p>We chose Shopify as the e-commerce platform for its scalability, security, and ease of management. This allowed us to build custom features while ensuring the Vesa Homes team could easily manage inventory, orders, and content.</p>

      <h3>4. Conversion-Focused Features</h3>
      <p>We implemented features designed to boost sales:</p>
      <ul>
        <li><strong>“Shop the Look” Bundles:</strong> Allowing customers to purchase curated bedding and bath sets inspired by lifestyle photos.</li>
        <li><strong>High-Resolution Image Zooms:</strong> Providing detailed views of fabric texture and quality.</li>
        <li><strong>Customer Reviews & Galleries:</strong> Building social proof and trust with user-generated content.</li>
        <li><strong>Streamlined Checkout Process:</strong> A simple, three-step checkout to reduce cart abandonment.</li>
      </ul>

      <h2>The Results: A Thriving D2C Brand</h2>
      <p>The new e-commerce site successfully launched Vesa Homes into the D2C market:</p>
      <ul>
        <li>40% increase in online sales within the first quarter.</li>
        <li>25% higher average order value, driven by the “Shop the Look” feature.</li>
        <li>Significant growth in social media engagement and user-generated content.</li>
        <li>Positive customer feedback praising the site’s beauty and ease of use.</li>
      </ul>

      <h2>Final Thoughts</h2>
      <p>This project proves that a thoughtful, story-driven e-commerce design can bridge the gap between a traditional craft and the modern digital consumer. For Vesa Homes, their website is now the heart of their brand, beautifully showcasing their products to the world.</p>
      <p><strong>Ready to build an online store that tells your brand’s story? Get in touch with us.</strong></p>
    `,
    imageUrl: 'https://www.vgotyou.com/assets/vesahomes.png',
    publishedDate: '2023-11-05',
    author: 'VGot You',
    readTime: '6 min',
    idCode: 'CS-VES-02',
    externalUrl: 'https://medium.com/@vgotyou/e-commerce-case-study-ce01d95318b2'
  },
  {
    slug: 'arctic-textiles',
    category: 'Case Study',
    title: 'How Our Web Design Helped Arctic Textiles Reach Global Markets',
    excerpt: 'See how a modern, SEO-optimized website design helped Arctic Textiles expand globally. A deep dive case study by VGot You.',
    content: `
      <p>In today’s competitive textile industry, a strong digital presence is essential for growth. When Arctic Textiles, a leading manufacturer and exporter of high-quality fabrics, approached us, their goal was clear — to transform their local presence into a global brand.</p>
      <p>Our team took on the challenge of designing a modern, performance-driven website that would showcase their craftsmanship, attract international clients, and position them as a trusted name in the textile export market.</p>
      
      <h2>Understanding Arctic Textiles’ Vision</h2>
      <p>Before starting the design process, we spent time understanding the brand’s story and target audience. Arctic Textiles had a rich history of quality manufacturing, but their online presence didn’t reflect that scale or professionalism.</p>
      <p>Their goals were:</p>
      <ul>
        <li>To build trust with international buyers</li>
        <li>To showcase product categories clearly</li>
        <li>To generate B2B leads through website inquiries</li>
        <li>To create a responsive, SEO-optimized platform that works flawlessly on all devices</li>
      </ul>

      <h2>Our Web Design Approach</h2>
      <p>We focused on combining visual aesthetics with strategic functionality.</p>
      
      <h3>1. Brand-Aligned Design</h3>
      <p>We used a clean, modern layout with subtle textures inspired by woven fabrics. The color palette included cool blues and whites to reflect the “Arctic” identity, representing trust, quality, and global standards.</p>

      <h3>2. Product-Focused Layout</h3>
      <p>We built a dedicated product showcase section with filters for fabrics, categories, and specifications — making it easy for buyers to explore and send inquiries directly.</p>

      <h3>3. B2B Lead Optimization</h3>
      <p>Every key page includes a Call-to-Action (CTA) such as “Request a Quote” or “Get a Sample”, helping convert visitors into leads. The contact form is connected to email and WhatsApp for instant communication.</p>

      <h3>4. SEO and Performance</h3>
      <p>We implemented technical SEO best practices:</p>
      <ul>
        <li><strong>Keyword optimization:</strong> “textile manufacturer,” “fabric exporter,” “wholesale fabric supplier.”</li>
        <li><strong>Fast loading time:</strong> &lt;2.5s.</li>
        <li><strong>Optimized images in WebP format.</strong></li>
        <li><strong>Schema markup</strong> for better Google indexing.</li>
      </ul>

      <h3>5. Global Accessibility</h3>
      <p>The site is hosted on a high-performance international CDN, ensuring fast access from Europe, the Middle East, and Asia. This was crucial for reaching Arctic’s expanding export network.</p>

      <h2>The Results</h2>
      <p>Within weeks of launching the new website, Arctic Textiles saw measurable growth:</p>
      <ul>
        <li>65% increase in international traffic</li>
        <li>Inquiries from 6+ new countries</li>
        <li>Higher engagement time per visitor</li>
        <li>Improved brand perception among overseas clients</li>
      </ul>
      <p>The website now serves as their digital showroom, bridging the gap between manufacturing excellence and global visibility.</p>

      <h2>What Makes This Project Special</h2>
      <p>This project showcases how strategic web design can transform a traditional business into a global brand. For Arctic Textiles, their website is more than an online presence — it’s a growth engine.</p>
      <p>From the color psychology to SEO-friendly structure, every element was crafted to tell a story of reliability, quality, and expansion.</p>

      <h2>Final Thoughts</h2>
      <p>If your business wants to expand internationally or attract B2B clients, your website is your strongest marketing tool. A well-planned, SEO-optimized design — like Arctic Textiles’ — can redefine your digital growth.</p>
      <p>Want to elevate your brand’s online presence? <strong>Let’s build your website today.</strong></p>
    `,
    imageUrl: 'https://vgotyou.com/assets/arctic.png',
    publishedDate: '2023-10-26',
    author: 'VGot You',
    readTime: '6 min',
    idCode: 'CS-ARC-01',
    externalUrl: 'https://medium.com/@vgotyou/how-our-web-design-helped-arctic-textiles-reach-global-markets-7b2d6e62bd26'
  },
  {
    slug: 'beyond-the-logo-strategic-branding',
    category: 'Branding',
    title: 'Beyond the Logo: How Strategic Branding Builds Lasting Impressions',
    excerpt: 'Strategic branding goes beyond the logo. See how clear identity, color, and storytelling create lasting impressions.',
    content: `
      <p>What is a brand? It is the story you tell, the values you embody, and the promise you make to your customers every time they interact with you. A strong brand builds trust, fosters loyalty, and creates a competitive advantage that simple visuals or a logo alone can never achieve.</p>
      <p>In a digital-first world, brands that feel consistent, clear, and intentional stand out in the minds of customers. Strategic branding shapes not just how your business looks, but how it is remembered.</p>

      <h2>Branding is more than just a logo</h2>
      <p>A logo is an important symbol, but it is only one piece of a larger identity system. Strategic branding brings together visuals, voice, positioning, and experience to communicate who you are and why you matter.</p>
      <p>Effective branding answers questions like:</p>
      <ul>
        <li>What emotions should customers feel when they see or hear your brand?</li>
        <li>What values and personality should your brand express every time it shows up?</li>
        <li>How should your brand look and sound across your website, social media, and offline materials?</li>
      </ul>
      <p>When these answers are clear, your brand feels unified and instantly recognizable wherever people encounter it.</p>

      <h2>The pillars of a lasting brand identity</h2>
      <p>At VGot You, brand identities are built around reliability, quality, and clarity. The goal is to create brands that look professional, feel trustworthy, and communicate their value in seconds.</p>
      <p>Core pillars of a strong brand identity include:</p>
      <ul>
        <li><strong>Visual consistency:</strong> A defined system of colors, typography, logos, and layouts that works across digital and print.</li>
        <li><strong>Clear messaging:</strong> Simple, memorable lines that express what you do and why you are different.</li>
        <li><strong>Emotional connection:</strong> Design and language that reflect the aspirations, fears, and values of your ideal customers.</li>
        <li><strong>Experience alignment:</strong> Making sure the way your brand looks matches the actual service and experience you deliver.</li>
      </ul>
      <p>When these pillars align, your brand moves from “nice design” to a powerful mental shortcut for trust and quality.</p>

      <h2>Case study: Bloomgreen Developers – eco‑luxury with purpose</h2>
      <p>Bloomgreen Developers needed a brand that spoke to a very specific audience: environmentally-conscious luxury homebuyers. The challenge was to balance sustainability with a high-end, aspirational feel.</p>
      <p>An “eco-luxury” identity was created by blending earthy tones with sophisticated metallic accents. Natural greens and neutrals communicated connection to nature, while metallic highlights added a sense of exclusivity and refinement.</p>
      <p>The result is a visual language that attracts buyers who care about both design and sustainability, positions Bloomgreen Developers as a premium yet responsible brand, and feels cohesive across all presentations.</p>

      <h2>Case study: Rudhraa Exports – strength and connectivity</h2>
      <p>Rudhraa Exports needed a brand that could represent reliability and global reach in the export space. The strategy focused on the pillars of strength, stability, and connectivity.</p>
      <p>A palette of navy blue and gold was chosen to evoke professionalism, trust, and authority. Navy signals stability and seriousness, while gold adds a touch of success and confidence. Combined with clean typography, the brand immediately communicates “serious, established business”.</p>

      <h2>How strategic branding builds lasting impressions</h2>
      <p>When branding is handled strategically, it shapes what people remember and how they feel long after the first interaction. It makes your business instantly recognizable, builds credibility so customers feel safer choosing you, and supports premium positioning and long-term loyalty.</p>

      <h2>How VGot You can shape your brand</h2>
      <p>VGot You is a digital studio that helps businesses move beyond “just a logo” to build complete, strategic brand identities that work across web, digital, and print.</p>
      <p>If you want your brand to look professional and leave a lasting impression, VGot You can help you clarify your brand story, design a cohesive visual identity, and apply your branding to all marketing materials.</p>
      <p><strong>Ready to build a brand that people recognize and remember? Reach out to VGot You today.</strong></p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop',
    publishedDate: '2023-11-12',
    author: 'VGot You',
    readTime: '5 min',
    idCode: 'BR-IDE-03',
    externalUrl: 'https://vgotyou.medium.com/beyond-the-logo-how-strategic-branding-builds-lasting-impressions-e9ebef6b1c43?postPublishedType=initial'
  }
].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

export const dataStore = {
    getBlogs: (): BlogPost[] => {
        const stored = localStorage.getItem('vgotyou_blogs');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored blogs', e);
            }
        }
        return blogs;
    },
    saveBlog: (post: BlogPost) => {
        const current = dataStore.getBlogs();
        const index = current.findIndex(b => b.slug === post.slug);
        if (index > -1) {
            current[index] = post;
        } else {
            current.push(post);
        }
        localStorage.setItem('vgotyou_blogs', JSON.stringify(current));
    },
    deleteBlog: (slug: string) => {
        const current = dataStore.getBlogs();
        const updated = current.filter(b => b.slug !== slug);
        localStorage.setItem('vgotyou_blogs', JSON.stringify(updated));
    }
};