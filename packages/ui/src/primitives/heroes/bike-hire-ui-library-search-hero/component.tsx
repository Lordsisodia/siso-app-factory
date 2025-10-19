import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SearchHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  badge?: string;
  heading: string;
  description?: string;
  backgroundImage?: string;
  placeholder?: string;
  showCurvedBottom?: boolean;
  backgroundColor?: string;
  className?: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchTerm,
  setSearchTerm,
  badge = 'Premium Selection',
  heading,
  description,
  backgroundImage,
  placeholder = 'Search by brand or model...',
  showCurvedBottom = true,
  backgroundColor = 'bg-gradient-to-r from-primary/90 to-primary',
  className = ''
}) => {
  return (
    <section className={`pt-24 pb-16 ${backgroundColor} text-primary-foreground relative overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="inline-block bg-accent/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {heading}
          </h1>
          {description && (
            <p className="text-primary-foreground/80 text-lg mb-8">
              {description}
            </p>
          )}

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <Input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:ring-accent focus:border-accent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          </div>
        </motion.div>
      </div>

      {/* Curved shape at bottom */}
      {showCurvedBottom && (
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute -bottom-1 left-0 w-full">
            <path fill="rgb(248 248 248)" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      )}
    </section>
  );
};

export default SearchHero;
