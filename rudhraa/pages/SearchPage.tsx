import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import PageHeader from '../components/PageHeader';
import useAnimateOnScroll from '../components/useAnimateOnScroll';

// Re-using components from CategoryPage for consistency.
// In a larger app, these would be shared components.

const ProductCard: React.FC<{ product: Product; onViewDetails: () => void; index: number }> = ({ product, onViewDetails, index }) => {
    const [ref, isVisible] = useAnimateOnScroll(0.05);
    
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onViewDetails();
        }
    };

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            onClick={onViewDetails}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className={`scroll-animate group bg-white rounded-lg border border-highlight overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-2 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            <div className="relative h-60 overflow-hidden">
                <img 
                    src={product.imageUrl} 
                    alt={`High-quality ${product.name} for export`} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <span className="px-6 py-2 bg-accent text-white font-semibold rounded-full transform transition-transform duration-300 ease-in-out scale-90 group-hover:scale-100">
                        View Details
                    </span>
                </div>
            </div>
            <div className="p-4 text-center">
                <h3 className="text-lg font-bold font-lora text-text-main truncate">{product.name}</h3>
            </div>
        </div>
    );
};

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-highlight animate-pulse">
        <div className="h-60 bg-highlight"></div>
        <div className="p-4">
            <div className="h-6 bg-highlight rounded w-3/4 mx-auto"></div>
        </div>
    </div>
);

const ProductModal: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!product) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
        >
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full text-text-alt hover:bg-bg-alt hover:text-text-main z-10 transition-colors">
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-full">
                         <img src={product.imageUrl} alt={`Detailed view of ${product.name}`} className="w-full h-full object-cover md:rounded-l-lg" />
                    </div>
                    <div className="p-8">
                        <h2 id="product-modal-title" className="text-3xl font-bold font-lora text-text-main mb-4">{product.name}</h2>
                        <p className="text-text-alt mb-6">{product.description}</p>
                        <div className="space-y-4 text-sm">
                            {product.origin && (
                                <div>
                                    <h4 className="font-semibold text-text-main uppercase text-xs tracking-wider">Origin</h4>
                                    <p className="text-text-alt">{product.origin}</p>
                                </div>
                            )}
                            {product.uses && (
                                <div>
                                    <h4 className="font-semibold text-text-main uppercase text-xs tracking-wider">Typical Uses</h4>
                                    <p className="text-text-alt">{product.uses}</p>
                                </div>
                            )}
                            {product.nutrition && (
                                <div>
                                    <h4 className="font-semibold text-text-main uppercase text-xs tracking-wider">Nutritional Value</h4>
                                    <p className="text-text-alt">{product.nutrition}</p>
                                </div>
                            )}
                            <div>
                                <h4 className="font-semibold text-text-main uppercase text-xs tracking-wider">Specifications</h4>
                                <p className="text-text-alt">{product.specs}</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link to="/contact" className="w-full block text-center px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-sm hover:shadow-md">
                                Send Enquiry
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const searchResults = useMemo(() => {
        if (!query) return [];
        return PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }, [query]);
    
    const pageTitle = `Search Results for "${query}"`;
    const subtitle = `${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} found.`;

    useEffect(() => {
        document.title = `${query ? `"${query}" Search Results` : 'Search'} | Rudhraa Exports`;
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300); // Simulate network delay

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProduct]);

    return (
        <div>
            <PageHeader 
                title={pageTitle}
                subtitle={!loading ? subtitle : 'Searching for products...'}
                imageUrl={'https://images.unsplash.com/photo-1576045057995-568f588f2f20?w=1200&q=80'}
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Search', path: '#' }]}
            />
            <div className="py-16 lg:py-24 bg-bg-alt bg-dot-pattern">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {searchResults.map((product, index) => (
                                <ProductCard 
                                    key={product.name} 
                                    product={product} 
                                    onViewDetails={() => setSelectedProduct(product)} 
                                    index={index} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-text-alt py-16">
                            <h2 className="text-2xl font-lora font-semibold text-text-main">No Results Found</h2>
                            <p className="mt-2">Sorry, we couldn't find any products matching your search for "{query}".</p>
                            <p className="mt-1">Try checking your spelling or searching for a different product.</p>
                            <Link to="/" className="inline-block mt-6 px-6 py-2 bg-accent text-white font-semibold rounded-full hover:bg-accent-hover transition-colors">
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
    );
};

export default SearchPage;
