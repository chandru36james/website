import React from 'react';
import { Link } from 'react-router-dom';
import useAnimateOnScroll from './useAnimateOnScroll';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  breadcrumbs?: { name: string; path: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imageUrl, breadcrumbs }) => {
    const [ref, isVisible] = useAnimateOnScroll();
    
    return (
        <section 
            ref={ref as React.RefObject<HTMLDivElement>}
            className="relative h-72 bg-cover bg-center" 
            style={{ backgroundImage: `url('${imageUrl}')` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {breadcrumbs && (
                    <div className="text-sm text-white/80 mb-2">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={crumb.path}>
                                {index > 0 && <span className="mx-2">/</span>}
                                <Link to={crumb.path} className="hover:text-white">{crumb.name}</Link>
                            </React.Fragment>
                        ))}
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold font-lora leading-tight">{title}</h1>
                {subtitle && <p className="text-lg md:text-xl font-light mt-2">{subtitle}</p>}
            </div>
        </section>
    );
};

export default PageHeader;