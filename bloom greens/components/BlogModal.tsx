import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface Post {
    date: string;
    title: string;
    excerpt: string;
    img: string;
    content: string;
}

interface BlogModalProps {
  post: Post;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4" 
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <img src={post.img.replace('600/400', '1200/800')} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-8">
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <h2 className="text-3xl font-playfair font-bold text-brand-dark mb-4">{post.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-brand-dark bg-white/70 rounded-full p-2 z-10 hover:bg-white transition-all"
          aria-label="Close post"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BlogModal;