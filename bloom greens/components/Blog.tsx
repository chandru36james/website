import React, { useState } from 'react';
import BlogModal from './BlogModal';

interface BlogProps {
  isVisible?: boolean;
  isMobile?: boolean;
}

const blogPosts = [
  {
    date: 'July 28, 2024',
    title: 'Building Your Dream: Key Phases of a Construction Project',
    excerpt: 'From blueprints to the final walkthrough, understand the essential stages of any successful construction project.',
    img: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=600&h=400&fit=crop',
    content: `Embarking on a construction project is exciting. Understanding the process can make it smoother. It typically starts with the **Design & Planning Phase**, where architects create blueprints and secure permits. Next is the **Pre-construction Phase**, involving site analysis, budgeting, and assembling the project team. The **Procurement Phase** is where materials and equipment are ordered. Then, the **Construction Phase** begins, which includes site preparation, foundation, framing, and installing utilities. This is the longest phase where your vision physically takes shape. Finally, the **Post-construction Phase** involves the final inspection, walkthrough with the client, and official handover of the completed building. Each step is crucial for a successful build.`
  },
  {
    date: 'July 25, 2024',
    title: 'Top 10 Interior Design Trends for This Fall',
    excerpt: 'Discover the latest trends that will transform your space into a cozy and stylish autumn retreat.',
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&h=400&fit=crop',
    content: `Fall is a time of transformation, and your home's interior should be no exception. This season, we're seeing a return to nature-inspired palettes, with warm earth tones like terracotta, rust, and olive green taking center stage. 
    
Textural fabrics are also key; think bouclé, velvet, and chunky knits to add a layer of coziness. Another major trend is sustainable and artisanal decor. Handcrafted pottery, reclaimed wood furniture, and vintage pieces not only add character but also tell a story. Don't be afraid to mix and match patterns, but keep the color scheme consistent for a cohesive look. Finally, lighting plays a crucial role. Opt for soft, warm lighting to create an inviting and relaxing ambiance perfect for the shorter days ahead.`
  },
  {
    date: 'July 18, 2024',
    title: 'The Art of Choosing the Perfect Color Palette',
    excerpt: 'Color can dramatically affect mood and perception. Learn how to select the right colors for your home.',
    img: 'https://images.unsplash.com/photo-1596205252494-b044c388a1b5?q=80&w=600&h=400&fit=crop',
    content: `Choosing a color palette is one of the most impactful decisions in interior design. It sets the tone for the entire space. Start by considering the mood you want to create. Soft, cool colors like blues and greens evoke calmness, while warm colors like reds and yellows bring energy.
    
A good rule of thumb is the 60-30-10 rule: 60% of the room should be a dominant color (like the walls), 30% a secondary color (furniture), and 10% an accent color (pillows, art). Use a color wheel to find harmonious combinations, such as complementary (opposite on the wheel) or analogous (next to each other) schemes. Always test paint samples on your walls at different times of the day to see how the light affects them before committing.`
  }
];

const Blog: React.FC<BlogProps> = ({ isVisible, isMobile }) => {
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null);

  const handleReadMore = (post: (typeof blogPosts)[0]) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const titleWords = "Latest News".split(' ');

  return (
    <section className={`w-full bg-white flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'py-24' : 'h-full'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:pr-24 lg:pl-24 lg:pr-24 py-10">
        <div className={`text-center mb-16`}>
          <h3 className={`text-brand-gold font-semibold tracking-widest uppercase mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>FROM OUR BLOG</h3>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            {titleWords.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-3">
                <span
                  className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h4 className="text-xl font-playfair font-bold text-brand-dark mb-3 ">{post.title}</h4>
                <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                <button onClick={() => handleReadMore(post)} className="font-bold text-brand-gold hover:underline self-start transition-transform duration-300 transform hover:translate-x-1">Read More &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && <BlogModal post={selectedPost} onClose={handleCloseModal} />}
    </section>
  );
};

export default Blog;