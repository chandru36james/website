
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
import { PRODUCTS, ICONS } from '../constants';
import { SearchResult } from '../types';

const SearchModal: React.FC = () => {
    const { isOpen, closeModal } = useSearch();
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Map products to a common search result format
    const allSearchableItems: SearchResult[] = useMemo(() => [
        ...PRODUCTS.map(p => ({
            type: 'Product' as const,
            title: p.name,
            path: `/category/${p.category}`,
            category: p.category.replace('-', ' '),
            imageUrl: p.imageUrl,
        })),
    ], []);

    // Filter results based on the query
    const results = useMemo(() => {
        if (query.length < 2) return [];
        const lowerCaseQuery = query.toLowerCase();
        return allSearchableItems.filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.category.toLowerCase().includes(lowerCaseQuery)
        );
    }, [query, allSearchableItems]);

    // Reset state when modal opens or closes
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Auto-focus input with a slight delay
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = '';
            setQuery('');
            setActiveIndex(-1);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
            } else if (e.key === 'Enter') {
                if (activeIndex >= 0 && results[activeIndex]) {
                    e.preventDefault();
                    navigate(results[activeIndex].path);
                    closeModal();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activeIndex, results, navigate, closeModal]);

    // Scroll active item into view
     useEffect(() => {
        if (activeIndex >= 0 && resultsRef.current) {
            const activeElement = resultsRef.current.children[activeIndex] as HTMLElement;
            activeElement?.scrollIntoView({ block: 'nearest' });
        }
    }, [activeIndex]);

    const handleResultClick = (path: string) => {
        navigate(path);
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-alt">
                        {ICONS.search}
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products..."
                        className="w-full py-4 pl-12 pr-4 text-lg border-b border-highlight focus:outline-none focus:ring-0 focus:border-accent"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Results */}
                {query.length > 1 && (
                    <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto">
                        {results.length > 0 ? (
                            <ul>
                                {results.map((item, index) => (
                                    <li key={`${item.path}-${item.title}`}>
                                        <Link
                                            to={item.path}
                                            onClick={closeModal}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            className={`flex items-center gap-4 p-4 text-left transition-colors duration-150 ${
                                                index === activeIndex ? 'bg-accent/10' : 'hover:bg-highlight'
                                            }`}
                                        >
                                            <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0"/>
                                            <div className="flex-grow overflow-hidden">
                                                <p className={`font-semibold truncate ${index === activeIndex ? 'text-accent' : 'text-text-main'}`}>{item.title}</p>
                                                <p className="text-sm text-text-alt capitalize">{item.category}</p>
                                            </div>
                                            <span className="flex-shrink-0 text-xs font-semibold text-text-alt bg-highlight px-2 py-1 rounded-full">{item.type}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-8 text-center text-text-alt">
                                <p>No results found for "{query}"</p>
                            </div>
                        )}
                    </div>
                )}
                {/* Footer hint */}
                 <div className="bg-bg-alt px-4 py-2 text-xs text-text-alt text-right">
                    Press <kbd className="font-mono bg-highlight px-1.5 py-0.5 rounded">ESC</kbd> to close
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
