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

  seoTitle: 'From Local Brand to Online Authority | Web Design & Local SEO Strategy for Service Businesses in India',
  seoDescription: 'Discover how professional web design and local SEO help service businesses build trust, rank on Google, and grow into online authorities. A strategic guide by VGot You, a web design company in Karur, Tamil Nadu.',
  seoKeywords: 'web design for service businesses, local seo for small business, website design company in karur, digital branding for service firms, online authority building, b2b website strategy, seo web design tamil nadu',

  excerpt: 'A strategic guide on how service businesses can transform from referral-based local brands into trusted online authorities using professional web design, SEO, and conversion-focused digital branding.',

  content: `
    <p>For many service-based businesses in India, growth begins locally. Word-of-mouth, referrals, and local reputation build the first wave of customers. However, in today’s digital-first economy, a professionally designed, SEO-optimized website is what transforms a local service provider into a recognized online authority.</p>

    <p>A strong digital presence does more than simply show that your business exists. It establishes credibility, builds trust before the first call, and creates a scalable system for lead generation through Google search and content visibility.</p>

    <h2>The Challenge: From Local Recognition to Digital Authority</h2>
    <p>Most service businesses reach a stage where referrals alone are no longer sufficient for consistent growth. Common challenges include:</p>
    <ul>
      <li>Outdated or template-based websites that fail to reflect brand professionalism</li>
      <li>Poor Google rankings due to weak on-page SEO and technical structure</li>
      <li>Low conversion rates caused by unclear messaging and weak calls-to-action</li>
      <li>No location-focused optimization to attract nearby high-intent search traffic</li>
    </ul>

    <h2>Strategic Web Design for Service Businesses</h2>
    <p>High-performing service websites are built around clarity, trust, and conversion. At VGot You, web design is approached strategically—combining brand positioning, UX structure, and persuasive copy to guide visitors from awareness to enquiry.</p>

    <p>Elements such as clear service positioning, authority-building visuals, testimonial integration, and conversion-focused layouts ensure that visitors perceive the brand as credible and professional from the first interaction.</p>

    <h2>SEO-First Website Architecture</h2>
    <p>An SEO-driven website structure is essential for long-term visibility. This includes:</p>
    <ul>
      <li>Optimized service pages targeting high-intent keywords</li>
      <li>Local SEO signals such as city-based content and schema markup</li>
      <li>Fast loading speed and mobile-first performance</li>
      <li>Logical internal linking and crawl-friendly URL structure</li>
    </ul>

    <h2>Building Sustainable Online Growth</h2>
    <p>When web design and SEO work together, service businesses evolve from being locally known to becoming digitally discoverable, trusted, and consistently chosen. Authority is built through content, search visibility, and a brand experience that reflects expertise.</p>

    <h2>How VGot You Helps Local Brands Become Online Authorities</h2>
    <p>VGot You is a professional web design and SEO studio based in Karur, Tamil Nadu, specializing in high-conversion websites, local SEO, branding, and digital growth strategies for service businesses across India. Through strategic design, technical optimization, and brand positioning, we help businesses move from local recognition to online leadership.</p>
  `,

  imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  publishedDate: '2024-03-20',
  author: 'VGot You',
  readTime: '7 min',
  idCode: 'ST-AUTH-04',
  externalUrl: 'https://vgotyou.medium.com/from-local-brand-to-online-authority-80b691e0b273?postPublishedType=initial'
}
,
{
  slug: 'vesa-homes-ecommerce',
  category: 'E-commerce',
  title: 'Crafting an Elegant E-commerce Experience for Vesa Homes',

  seoTitle: 'E-commerce Website Design for Textile Brands | Vesa Homes D2C Case Study by VGot You',
  seoDescription: 'See how VGot You designed a high-converting Shopify e-commerce website for Vesa Homes, a premium home textile brand, using strategic UI/UX, storytelling, and conversion-focused design to scale D2C sales.',
  seoKeywords: 'ecommerce website design for textile brands, shopify ecommerce development, d2c website design india, textile ecommerce website, conversion optimized ecommerce design, ui ux for ecommerce, ecommerce agency in karur, ecommerce website designers tamil nadu',

  excerpt: 'A detailed case study on building a premium direct-to-consumer e-commerce website for a home textile brand, focused on UI/UX, storytelling, and conversion optimization.',

  content: `
<p>For modern home textile brands, an e-commerce website is not just a sales platform—it is a digital showroom. Vesa Homes, a premium Indian home furnishing brand known for its handcrafted textiles, required an online store that could visually communicate quality, craftsmanship, and lifestyle appeal while driving consistent D2C sales.</p>

<p>As a professional e-commerce website design company in Karur, Tamil Nadu, VGot You partnered with Vesa Homes to create a conversion-focused Shopify website that combined elegant visual design, strong brand storytelling, and performance-driven UX.</p>

<h2>The Challenge: Transitioning from B2B to D2C</h2>
<p>While Vesa Homes had strong presence in the B2B and export market, their direct-to-consumer digital presence needed to:</p>
<ul>
  <li>Establish premium brand perception online.</li>
  <li>Build trust without physical product interaction.</li>
  <li>Create a smooth, mobile-first shopping experience.</li>
  <li>Increase online sales and average order value.</li>
</ul>

<h2>E-commerce Website Design Strategy</h2>
<p>Our approach combined branding, UI/UX design, and Shopify development to position Vesa Homes as a premium lifestyle brand.</p>

<h3>1. Premium UI/UX & Visual Language</h3>
<p>We used warm tones, minimal layouts, and lifestyle imagery to reflect fabric texture, comfort, and elegance. Clean navigation and intuitive product categorization ensured frictionless browsing.</p>

<h3>2. Brand Storytelling Through Design</h3>
<p>Dedicated storytelling sections showcased craftsmanship, sustainability, and material quality, strengthening emotional connection and trust.</p>

<h3>3. Shopify E-commerce Development</h3>
<p>The store was built on Shopify for scalability, security, and SEO performance, enabling easy product management, fast load speeds, and smooth checkout experiences.</p>

<h3>4. Conversion Optimization Features</h3>
<ul>
  <li><strong>Bundle & Lookbook Sections:</strong> To increase average order value.</li>
  <li><strong>High-Resolution Product Zoom:</strong> For fabric detailing.</li>
  <li><strong>Customer Reviews & Social Proof:</strong> To improve trust.</li>
  <li><strong>Mobile-Optimized Checkout:</strong> To reduce abandonment.</li>
</ul>

<h2>Business Impact</h2>
<ul>
  <li>40% growth in online sales within the first quarter.</li>
  <li>25% increase in average order value.</li>
  <li>Improved engagement and repeat customer rate.</li>
  <li>Stronger brand positioning in Indian and international markets.</li>
</ul>

<h2>Conclusion</h2>
<p>This case study demonstrates how strategic e-commerce website design and UI/UX optimization can help traditional textile brands successfully transition into premium D2C businesses.</p>

<h2>How VGot You Helps E-commerce Brands</h2>
<p>VGot You is a professional web design and Shopify e-commerce development company in Karur, Tamil Nadu, specializing in high-conversion websites for textile brands, manufacturers, exporters, and D2C startups across India.</p>

<p><strong>Looking to build a premium e-commerce website for your brand? Let VGot You design a conversion-focused online store that drives growth and builds long-term brand authority.</strong></p>
`,

  imageUrl: 'https://www.vgotyou.com/assets/vesahomes.png',
  publishedDate: '2023-11-05',
  author: 'VGot You',
  readTime: '6 min',
  idCode: 'CS-VES-02',
  externalUrl: 'https://medium.com/@vgotyou/e-commerce-case-study-ce01d95318b2'
}
,
  {
  slug: 'arctic-textiles',
  category: 'Case Study',
  title: 'How Our Web Design Helped Arctic Textiles Reach Global Markets',

  seoTitle: 'B2B Website Design for Textile Exporters | Arctic Textiles Global Case Study – VGot You Karur',
  seoDescription: 'Discover how VGot You, a professional web design company in Karur, Tamil Nadu, built an SEO-optimized B2B website for Arctic Textiles, enabling them to attract international buyers and grow as a trusted global textile exporter.',
  seoKeywords: 'b2b website design for textile exporters, textile manufacturer website, fabric exporter website india, web design company in karur, industrial website development tamil nadu, seo for manufacturing companies, export business website design',

  excerpt: 'A detailed B2B case study showing how a modern, SEO-optimized website helped Arctic Textiles expand globally and attract international buyers.',

  content: `
<p>In today’s competitive textile export industry, a professional digital presence is no longer optional—it is a core business asset. When Arctic Textiles, a leading fabric manufacturer and exporter, approached VGot You, their objective was clear: to build a world-class B2B website that could position them as a trusted global supplier and consistently attract overseas buyers.</p>

<p>As a specialized web design company in Karur, Tamil Nadu, VGot You designed and developed an SEO-optimized B2B website that transformed Arctic Textiles’ local manufacturing strength into a globally visible brand.</p>

<h2>Business Challenge</h2>
<p>Although Arctic Textiles had strong production capabilities and export experience, their existing website did not reflect:</p>
<ul>
  <li>Their international quality standards</li>
  <li>The scale of their manufacturing infrastructure</li>
  <li>The breadth of their fabric collections</li>
  <li>A clear enquiry and lead generation system</li>
</ul>

<h2>Our B2B Website Strategy</h2>
<p>We combined industrial branding, UI/UX design, technical SEO, and conversion optimization to create a performance-driven export website.</p>

<h3>1. Export-Focused UI/UX Design</h3>
<p>The website interface was designed to communicate trust, consistency, and professionalism. A clean layout, fabric-inspired textures, and a structured visual hierarchy helped international buyers quickly understand product categories and quality positioning.</p>

<h3>2. Product-Driven Information Architecture</h3>
<p>We built dedicated fabric category pages with technical specifications, application details, and enquiry CTAs, allowing sourcing managers to evaluate products easily and initiate RFQs.</p>

<h3>3. B2B Lead Generation System</h3>
<ul>
  <li>Strategic “Request Quote” and “Export Enquiry” CTAs</li>
  <li>WhatsApp and email integration for fast response</li>
  <li>Optimized enquiry forms for higher conversion rates</li>
</ul>

<h3>4. SEO for Global Buyer Searches</h3>
<p>To rank for high-intent keywords such as “textile exporter in India”, “fabric manufacturer website”, and “B2B textile supplier”, we implemented:</p>
<ul>
  <li>Keyword-optimized content and headings</li>
  <li>SEO-friendly URL structure</li>
  <li>Technical schema markup</li>
  <li>Page speed optimization under 2.5 seconds</li>
  <li>Image compression and WebP delivery</li>
</ul>

<h3>5. International Performance Optimization</h3>
<p>The website was deployed on a global CDN to ensure fast loading across Europe, Middle East, and Asia, critical for export buyer experience.</p>

<h2>Results & Business Impact</h2>
<ul>
  <li>65% growth in international organic search traffic</li>
  <li>Inbound enquiries from 6+ new countries</li>
  <li>Improved average session duration and engagement</li>
  <li>Stronger brand trust among overseas sourcing teams</li>
</ul>

<h2>Conclusion</h2>
<p>This project demonstrates how a strategically designed B2B website, backed by SEO and conversion optimization, can transform a manufacturing company into a globally trusted exporter brand.</p>

<h2>How VGot You Helps Export Businesses</h2>
<p>VGot You is a professional web design and SEO company in Karur, Tamil Nadu, specializing in high-performance B2B websites for textile manufacturers, exporters, and industrial brands across India.</p>

<p><strong>Planning to expand your export business globally? Let VGot You build an SEO-driven, lead-generating B2B website for your brand.</strong></p>
`,

  imageUrl: 'https://vgotyou.com/assets/arctic.png',
  publishedDate: '2023-10-26',
  author: 'VGot You',
  readTime: '6 min',
  idCode: 'CS-ARC-01',
  externalUrl: 'https://medium.com/@vgotyou/how-our-web-design-helped-arctic-textiles-reach-global-markets-7b2d6e62bd26'
}
,
{
  slug: 'beyond-the-logo-strategic-branding',
  category: 'Branding',
  title: 'Beyond the Logo: How Strategic Branding Builds Lasting Impressions',

  seoTitle: 'Strategic Branding & Brand Identity Design | Build Trust Beyond a Logo – VGot You Karur',
  seoDescription: 'Discover how strategic branding, visual identity, and storytelling help businesses in Karur and Tamil Nadu build trust, authority, and long-term brand recall. A branding insight by VGot You.',
  seoKeywords: 'strategic branding for businesses, brand identity design, logo and branding agency, corporate branding strategy, website branding, branding company in karur, visual identity tamil nadu, brand positioning, digital branding',

  excerpt: 'Strategic branding goes beyond the logo. Learn how visual identity, messaging, and storytelling create lasting impressions and build trust for modern businesses.',

  content: `
  <p>A brand is not just a logo or a color palette. It is the story you tell, the values you represent, and the promise you deliver every time a customer interacts with your business. Strong branding builds trust, creates emotional connection, and gives your company a competitive edge that visuals alone can never achieve.</p>

  <p>In a digital-first world, where your website and online presence are often the first touchpoints, strategic branding defines not only how your business looks, but how it is remembered. For companies in Karur, Tamil Nadu, and across India, a clear and consistent brand identity is essential to stand out in crowded markets.</p>

  <h2>Branding Is More Than Just a Logo</h2>
  <p>A logo is an important symbol, but it is only one component of a complete brand system. Strategic branding integrates visual design, tone of voice, positioning, and user experience across your website, social media, and marketing materials.</p>

  <p>Effective branding answers critical questions:</p>
  <ul>
    <li>What emotions should customers associate with your brand?</li>
    <li>What personality and values should your business communicate?</li>
    <li>How should your brand look and sound across every digital and offline touchpoint?</li>
  </ul>

  <p>When these elements are aligned, your brand becomes consistent, recognizable, and trustworthy.</p>

  <h2>The Pillars of a Strong Brand Identity</h2>
  <p>At VGot You, a branding and web design studio in Karur, we build brand identities that communicate clarity, professionalism, and credibility.</p>

  <ul>
    <li><strong>Visual Consistency:</strong> Unified use of colors, typography, logo systems, and layouts.</li>
    <li><strong>Clear Positioning:</strong> Simple messaging that explains who you are and why you are different.</li>
    <li><strong>Emotional Connection:</strong> Design and language that resonate with your ideal audience.</li>
    <li><strong>Experience Alignment:</strong> Ensuring your visual promise matches the real service experience.</li>
  </ul>

  <h2>Case Study: Bloomgreen Developers – Eco-Luxury Positioning</h2>
  <p>Bloomgreen Developers required a brand identity that appealed to environmentally conscious luxury homebuyers. We created an “eco-luxury” visual system combining natural greens with refined metallic accents, balancing sustainability with premium appeal.</p>

  <h2>Case Study: Rudhraa Exports – Global Trust & Authority</h2>
  <p>For Rudhraa Exports, the brand needed to communicate reliability and international credibility. A navy and gold palette with strong typography established a sense of stability, professionalism, and global business confidence.</p>

  <h2>How Strategic Branding Creates Lasting Impressions</h2>
  <p>Strategic branding builds instant recognition, strengthens credibility, and supports premium positioning. A consistent brand across your logo, website, and marketing channels makes customers feel confident and reassured in their choice.</p>

  <h2>How VGot You Builds Brand Identity</h2>
  <p>VGot You is a professional branding and web design company in Karur, Tamil Nadu, helping startups, exporters, and service businesses create complete brand systems — from logo and visual identity to website branding and digital presence.</p>

  <p><strong>Planning to build or rebrand your business? Let VGot You craft a strategic brand identity that people recognize, trust, and remember.</strong></p>
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