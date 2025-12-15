
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  mobileImageUrl?: string; // New field for vertical mobile images
  liveUrl?: string;
  isFeatured: boolean; // For the Home Carousel
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // HTML content
  category: string;
  imageUrl: string;
  publishedDate: string;
  author: string;
}

const DEFAULT_PROJECTS: Project[] = [
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
    mobileImageUrl: 'https://vgotyou.com/assets/vesahomes-min.png',
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
  },
  {
    id: '5',
    title: 'E-commerce Platform',
    category: 'Next.js / Shopify',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop',
    description: 'A cutting-edge e-commerce site with a focus on user experience and seamless checkout.',
    isFeatured: false
  },
  {
    id: '6',
    title: 'Creative Agency Portfolio',
    category: 'React / GSAP',
    imageUrl: 'https://images.unsplash.com/photo-1559028006-44a13e147e32?q=80&w=1974&auto=format&fit=crop',
    description: 'A visually stunning portfolio website featuring complex animations.',
    isFeatured: false
  }
];

const DEFAULT_BLOGS: BlogPost[] = [
    {
        slug: 'blog-post/arctic-textiles',
        category: 'Case Study',
        title: 'How Our Web Design Helped Arctic Textiles Reach Global Markets',
        excerpt: 'See how a modern, SEO-optimized website design helped Arctic Textiles expand globally.',
        imageUrl: 'https://vgotyou.com/assets/arctic_home-1F48Ee0h.png',
        publishedDate: '2023-10-26',
        author: 'VGot You'
    },
    {
        slug: 'blog-post/vesa-homes',
        category: 'E-commerce',
        title: 'Crafting an Elegant E-commerce Experience for Vesa Homes',
        excerpt: 'A deep dive into building a direct-to-consumer brand for a premium home textile company.',
        imageUrl: 'https://vgotyou.com/assets/vesa-Cf2lvZK9.png',
        publishedDate: '2023-11-05',
        author: 'VGot You'
    },
    {
        slug: 'blog-post/branding-identity',
        category: 'Branding',
        title: 'Beyond the Logo: How Strategic Branding Builds Lasting Impressions',
        excerpt: 'Discover how we helped brands like Arctic Textiles and Bloomgreen Developers craft powerful identities.',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop',
        publishedDate: '2023-11-12',
        author: 'VGot You'
    }
];

class DataStore {
    private projects: Project[];
    private blogs: BlogPost[];

    constructor() {
        this.projects = [...DEFAULT_PROJECTS];
        this.blogs = [...DEFAULT_BLOGS];
        this.load();
    }

    private load() {
        if (typeof window !== 'undefined') {
            try {
                const p = localStorage.getItem('vgot_projects');
                if (p) this.projects = JSON.parse(p);
                const b = localStorage.getItem('vgot_blogs');
                if (b) this.blogs = JSON.parse(b);
            } catch (e) {
                console.error("Failed to load data", e);
            }
        }
    }

    private save() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('vgot_projects', JSON.stringify(this.projects));
            localStorage.setItem('vgot_blogs', JSON.stringify(this.blogs));
        }
    }

    getProjects() {
        return [...this.projects];
    }

    getBlogs() {
        return [...this.blogs];
    }

    saveProject(project: Project) {
        const index = this.projects.findIndex(p => p.id === project.id);
        if (index >= 0) {
            this.projects[index] = project;
        } else {
            this.projects.push(project);
        }
        this.save();
    }

    deleteProject(id: string) {
        this.projects = this.projects.filter(p => p.id !== id);
        this.save();
    }

    saveBlog(blog: BlogPost) {
        const index = this.blogs.findIndex(b => b.slug === blog.slug);
        if (index >= 0) {
            this.blogs[index] = blog;
        } else {
            this.blogs.push(blog);
        }
        this.save();
    }

    deleteBlog(slug: string) {
        this.blogs = this.blogs.filter(b => b.slug !== slug);
        this.save();
    }
}

export const dataStore = new DataStore();
export const projects = dataStore.getProjects();
export const blogs = dataStore.getBlogs();
